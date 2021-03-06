import Regioner from './regioner';
import { Slicer, ChipMap } from './slicer';
import * as bitarray from './bitarray';
import * as pattern from './pattern';
import * as crc32 from './crc32';
import * as difference from './difference';
import ArrayBufferStore from './arraybufferstore';

type RenderedImage = HTMLImageElement | HTMLCanvasElement;

type RenderFunc = (pattern: pattern.Pattern) => Promise<RenderedImage>;

type HashesMap = Map<pattern.Index, Map<number, crc32.Hash>>;

type ChipIndexMap = Map<crc32.Hash, number>;

type AreaMap = Map<pattern.Index, ArrayBuffer>;

class Decomposer {
    private readonly slicer = new Slicer(this.tileSize);

    private readonly hashesMap: HashesMap = new Map();
    private readonly chipMap: ChipMap = new Map();

    private width = NaN;
    private height = NaN;
    private numTiles = NaN;

    private constructor(
        private readonly tileSize: number,
        private readonly patternSet: pattern.Set,
        private readonly renderFunc: RenderFunc,
        private readonly renderSoloFunc: RenderFunc,
    ) { }

    // TODO: supports multiple patternSet?
    static async decompose(
        tileSize: number,
        patternSet: pattern.Set,
        renderFunc: RenderFunc,
        renderSoloFunc: RenderFunc,
        progress: (curPhase: number, cur: number, total: number) => Promise<void>,
    ): Promise<DecomposedImage> {
        const d = new Decomposer(tileSize, patternSet, renderFunc, renderSoloFunc);
        const areaMap = await d.buildAreaMap((cur, total) => progress(0, cur, total));
        const [abstore, hashes] = await d.buildHashes(areaMap, (cur, total) => progress(1, cur, total));
        return await new DecomposedImage(d.width, d.height, d.tileSize, d.chipMap, hashes, abstore);
    }

    private async render(index: pattern.Index, parts: pattern.Pattern, indices: number[]): Promise<void> {
        const image = await this.renderFunc(parts);
        const [hashes, partialChipMap] = await this.slicer.slice(image);
        const h = new Uint32Array(hashes, 4);
        let s = this.hashesMap.get(index);
        if (!s) {
            s = new Map<number, number>();
            this.hashesMap.set(index, s);
        }
        for (const i of indices) {
            s.set(i, h[i]);
        }
        partialChipMap.forEach((v, i) => {
            const stored = this.chipMap.get(i);
            if (!stored) {
                this.chipMap.set(i, v);
                return;
            }
            const s = new Uint32Array(v);
            const d = new Uint32Array(stored);
            if (d[0] > s[0]) {
                d[0] = s[0];
            }
        });
    }

    private renderSolo(parts: pattern.Pattern): Promise<RenderedImage> {
        return this.renderSoloFunc(parts);
    }

    private async buildAreaMap(
        progress: (cur: number, total: number) => Promise<void>,
    ): Promise<AreaMap> {
        const numPatterns = this.patternSet.map(v => v.length).reduce((a, b) => a + b);
        let processed = 0;

        const image = await this.renderSolo(this.patternSet.map(() => -1));
        this.width = image.width;
        this.height = image.height;
        const tileSize = this.tileSize;
        this.numTiles =
            ((image.width + tileSize - 1) / tileSize | 0)
            * ((image.height + tileSize - 1) / tileSize | 0);
        const regioner = new Regioner(tileSize);
        const areaMap: AreaMap = new Map();
        // Add the empty map to simplify latar processing.
        areaMap.set(0, new bitarray.BitArray(this.numTiles).buffer.buffer);

        const patternSet = this.patternSet;
        const promises: Promise<void>[] = [];
        patternSet.forEach((partsGroup, groupIndex) => {
            for (let i = 0; i < partsGroup.length; ++i) {
                const patternParts = patternSet.map((_, j) => j !== groupIndex ? -1 : i);
                promises.push(
                    this.renderSolo(patternParts)
                        .then(image => regioner.generate(image))
                        .then(diff => areaMap.set(pattern.toIndexIncludingNone(patternParts, patternSet), diff.buffer.buffer))
                        .then(() => progress(++processed, numPatterns))
                );
            }
        });
        await Promise.all(promises);
        return areaMap;
    }

    // TODO: This may take a very long time, so it need move to the worker.
    // For that, I'm already using ArrayBuffer instead of TypedArray in the everywhere.
    private async buildHashes(
        areaMap: AreaMap,
        progress: (cur: number, total: number) => Promise<void>,
    ): Promise<[ArrayBufferStore, Uint32Array]> {
        const abstore = await ArrayBufferStore.create('prima-hashes', true);
        const writer = abstore.bulkWriter(100 * 1024 * 1024 / ((this.numTiles + 1) * 4) | 0);
        const patternSet = this.patternSet;
        const hashesMap = this.hashesMap;
        const patternLength = pattern.number(patternSet);
        const patternDiffHashes = new Uint32Array(patternLength);
        let patternIndex = 0;
        let byCache = 0, generated = 0;
        let retried = false;
        let lastReportTime = 0;
        for (; ; ) {
            if (patternIndex >= patternLength) {
                // report statistics
                // console.log(`generatedByCache: ${byCache} / rendered: ${generated}`);
                this.hashesMap.clear();
                await writer.flush();
                return [abstore, patternDiffHashes];
            }
            const parts = pattern.fromIndex(patternIndex, patternSet);
            const patternAreaMap = parts.map((itemIndex, groupIndex) => {
                const index = pattern.toIndexIncludingNone(parts.map((_, i) => groupIndex === i ? itemIndex : -1), patternSet);
                const ab = areaMap.get(index);
                if (!ab) {
                    throw new Error(`#${index} AreaMap not found.`);
                }
                return new Uint32Array(ab);
            });

            const numTiles = this.numTiles;
            const requiredTiles = new Map<number, [pattern.Pattern, number[]]>();
            const hashes = new Uint32Array(numTiles + 1 /* hash */);
            const partsLength = patternAreaMap.length;
            for (let i = 0; i < numTiles; ++i) {
                const sourceParts: number[] = new Array(partsLength);
                for (let j = 0; j < partsLength; ++j) {
                    sourceParts[j] = bitarray.get(patternAreaMap[j], i) ? parts[j] : -1;
                }
                const sourceIndex = pattern.toIndexIncludingNone(sourceParts, patternSet);
                const refHashes = hashesMap.get(sourceIndex);
                if (refHashes) {
                    const h = refHashes.get(i);
                    if (h !== undefined) {
                        hashes[i + 1] = h;
                        continue;
                    }
                }
                const req = requiredTiles.get(sourceIndex);
                if (req) {
                    req[1].push(i);
                    continue;
                }
                requiredTiles.set(sourceIndex, [sourceParts, [i]]);
            }
            if (requiredTiles.size > 0) {
                const promises: Promise<void>[] = [];
                requiredTiles.forEach(([parts, indices], pIndex) => promises.push(this.render(pIndex, parts, indices)));
                retried = true;
                await Promise.all(promises);
                continue;
            }
            hashes[0] = difference.calcHash(new Uint32Array(hashes.buffer, 4));
            patternDiffHashes[patternIndex] = hashes[0];
            retried ? ++generated : ++byCache;
            retried = false;
            await writer.set(patternIndex, hashes.buffer);
            ++patternIndex;
            const n = Date.now();
            if (n - lastReportTime > 400) {
                lastReportTime = n;
                await progress(patternIndex, patternLength);
            }
        }
    }
}

export function decompose(
    tileSize: number,
    patternSet: pattern.Set,
    render: RenderFunc,
    renderSolo: RenderFunc,
    progress: (phase: number, cur: number, total: number) => Promise<void>,
): Promise<DecomposedImage> {
    return Decomposer.decompose(tileSize, patternSet, render, renderSolo, progress);
}

export class DecomposedImage {
    get length(): number {
        return this.patternDiffHashes.length;
    }

    get memory(): number {
        const tileSize = this.tileSize;
        const chipSize = this.chipMap.size * (
            4 /* chip location index */
            + tileSize * tileSize * 4 /* chip(RGBA) */
            + 8 /* map key */
        );
        const hashSize = this.patternDiffHashes.length * (
            ((this.width + tileSize - 1) / tileSize | 0)
            * ((this.height + tileSize - 1) / tileSize | 0)
            * 4 /* Uint32 */ + 4 /* hash */ + 8 /* map key */
        );
        return chipSize + hashSize;
    }

    constructor(
        public readonly width: number,
        public readonly height: number,
        public readonly tileSize: number,
        public readonly chipMap: ChipMap,
        public readonly patternDiffHashes: Uint32Array,
        public readonly abstore: ArrayBufferStore,
    ) {
        if (width <= 0 || height <= 0) {
            throw new Error(`invalid image size: ${width}x${height}`);
        }
    }

    async getPatternHashes(patternIndex: pattern.Index): Promise<Uint32Array> {
        const b = await this.abstore.get(patternIndex);
        return new Uint32Array(b, 4);
    }

    async popPatternHashes(patternIndex: pattern.Index): Promise<Uint32Array> {
        const b = await this.abstore.pop(patternIndex);
        return new Uint32Array(b, 4);
    }
    // useful for debugging
    async render(patternIndex: pattern.Index): Promise<HTMLCanvasElement> {
        const hashesBuffer = await this.abstore.get(patternIndex);
        const hashes = new Uint32Array(hashesBuffer, 4);
        const width = this.width, height = this.height, tileSize = this.tileSize;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!(ctx instanceof CanvasRenderingContext2D)) {
            throw new Error('could not get CanvasRenderingContext2D');
        }
        for (let y = 0, i = 0; y < height; y += tileSize) {
            for (let x = 0; x < width; x += tileSize) {
                ctx.putImageData(this.getChipImage(hashes[i++]), x, y);
            }
        }
        return canvas;
    }

    getChipImage(hash: crc32.Hash): ImageData {
        const ab = this.chipMap.get(hash);
        if (!ab) {
            throw new Error(`chip #${('00000000' + hash.toString(16)).slice(-8)} is not found`);
        }
        const r = new ImageData(this.tileSize, this.tileSize);
        const src = new Uint8Array(ab, 4);
        const dest = new Uint8Array(r.data.buffer);
        const length = src.length;
        for (let i = 0; i < length; ++i) {
            dest[i] = src[i];
        }
        return r;
    }

    getChipIndices(): [Uint32Array, ChipIndexMap] {
        const chipMap = this.chipMap;
        const chipIndices = new Uint32Array(chipMap.size);
        {
            let i = 0;
            chipMap.forEach((_, key) => chipIndices[i++] = key);
        }
        chipIndices.sort((a, b) => {
            const av = new Uint32Array(chipMap.get(a)!)[0];
            const bv = new Uint32Array(chipMap.get(b)!)[0];
            if (av !== bv) {
                return av < bv ? -1 : 1;
            }
            return a === b ? 0 : a < b ? -1 : 1;
        });
        const r: ChipIndexMap = new Map<number, number>();
        const length = chipIndices.length;
        for (let i = 0; i < length; ++i) {
            r.set(chipIndices[i], i);
        }
        return [chipIndices, r];
    }

    getPatternIndices(): Uint32Array {
        const hashes = this.patternDiffHashes;
        const length = hashes.length;
        const a = new Uint32Array(length);
        for (let i = 0; i < length; ++i) {
            a[i] = i;
        }
        const comparer = difference.getComparer(hashes[0]);
        a.sort((a, b) => {
            const ha = hashes[a], hb = hashes[b];
            const r = comparer(ha, hb);
            if (r !== 0) {
                return r;
            }
            return ha < hb ? -1 : 1;
        });
        return a;
    }
}
