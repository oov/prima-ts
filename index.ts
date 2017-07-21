import * as pattern from './src/pattern';
import * as decomposer from './src/decomposer';
import * as primar from './src/primar';

export default async function generate(
    tileSize: number,
    caption: pattern.Caption,
    patternSet: pattern.Set,
    render: (patternParts: number[]) => Promise<HTMLImageElement | HTMLCanvasElement>,
    renderSolo: (patternParts: number[]) => Promise<HTMLImageElement | HTMLCanvasElement>,
    progress: (phase: number, cur: number, total: number) => Promise<void>,
): Promise<Blob> {
    const image = await decomposer.decompose(
        tileSize,
        patternSet,
        pattern => render(pattern),
        pattern => renderSolo(pattern),
        progress,
    );
    return primar.generate(image, patternSet, (cur, total) => progress(2, cur, total));
}
