!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Prima=t():e.Prima=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,r){"use strict";function n(e){return e&&3===e.length&&"number"==typeof e[0]&&"string"==typeof e[1]}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e){var t=this;this.callbacks=[],this.taskIdCounter=0,this.tasks=new Map,this.worker=new Worker(e),this.worker.onmessage=function(e){if(e.data&&n(e.data)){var r=e.data,i=r[0],o=r[1],a=r[2],u=t.tasks.get(i);if(u){var s=u[o];s&&s(a)}}else{var f=t.callbacks.shift();f&&(f[0](e.data),isNaN(f[2])||t.tasks.delete(f[2]))}},this.worker.onerror=function(e){var r=t.callbacks.shift();r&&(r[1](e),isNaN(r[2])||t.tasks.delete(r[2]))}}return e.prototype.postMessage=function(e,t){var r=this;return new Promise(function(n,i){r.callbacks.push([n,i,NaN]),r.worker.postMessage([NaN,e],t)})},e.prototype.postMessageWithEvent=function(e,t,r){var n=this;return new Promise(function(i,o){var a=++n.taskIdCounter;n.callbacks.push([i,o,a]),n.tasks.set(a,t),n.worker.postMessage([a,e],r)})},Object.defineProperty(e.prototype,"waits",{get:function(){return this.callbacks.length},enumerable:!0,configurable:!0}),e}();t.PromiseWorker=i;var o=function(){function e(e,t,r){this.queueMax=r,this.workers=[];for(var n=0;n<t;++n)this.workers.push(new i(e))}return e.prototype.postMessage=function(e,t){var r=this;return new Promise(function(n,i){var o=function(){for(var a=-1,u=r.queueMax,s=0;s<r.workers.length;++s)r.workers[s].waits<u&&(a=s,u=r.workers[s].waits);if(u<r.queueMax)return void r.workers[a].postMessage(e,t).then(n,i);setTimeout(o,40)};o()})},Object.defineProperty(e.prototype,"waits",{get:function(){return this.workers.map(function(e){return e.waits}).reduce(function(e,t){return e+t})},enumerable:!0,configurable:!0}),e}();t.ThrottlePromiseWorker=o},function(e,t,r){"use strict";function n(e){return e+31>>>5}function i(e,t,r){var n=t>>>5,i=t-(n<<5);r?e[n]|=1<<i:e[n]&=~(1<<i)}function o(e,t){var r=t>>>5,n=t-(r<<5);return 0!=(e[r]&1<<n)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){if(e instanceof ArrayBuffer)return this.buffer=new Uint32Array(e),void(this.length=t||this.buffer.length<<5);this.buffer=new Uint32Array(n(e)),this.length=e}return e.prototype.set=function(e,t){var r=e>>>5,n=e-(r<<5);t?this.buffer[r]|=1<<n:this.buffer[r]&=~(1<<n)},e.prototype.get=function(e){var t=e>>>5,r=e-(t<<5);return 0!=(this.buffer[t]&1<<r)},e}();t.BitArray=a,t.bufferLength=n,t.set=i,t.get=o},function(e,t,r){"use strict";function n(e){var t=new Array(33),r=e.length/32|0;t[0]=0;for(var n=0,i=0,o=0,a=0;n<e.length;++n)o+=e[n],++i===r&&(t[++a]=o,i=0,o=0);for(var u=0,n=1;n<t.length;++n)u=u<<1|(t[n]>t[n-1]?1:0);return u}function i(e){function t(e){return e=(1431655765&e)+(e>>>1&1431655765),e=(858993459&e)+(e>>>2&858993459),e=(252645135&e)+(e>>>4&252645135),(65535&(e=(16711935&e)+(e>>>8&16711935)))+(e>>>16&65535)}return function(r,n){return r===n?0:t(r^e)>t(n^e)?1:-1}}Object.defineProperty(t,"__esModule",{value:!0}),t.calcHash=n,t.getComparer=i},function(e,t,r){"use strict";function n(e,t,r,n,s,f){return i(this,void 0,void 0,function(){var t;return o(this,function(i){switch(i.label){case 0:return[4,a.decompose(e,r,function(e){return n(e)},function(e){return s(e)},f)];case 1:return t=i.sent(),[2,u.generate(t,r,function(e,t){return f(2,e,t)})]}})})}var i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function a(e){try{s(n.next(e))}catch(e){o(e)}}function u(e){try{s(n.throw(e))}catch(e){o(e)}}function s(e){e.done?i(e.value):new r(function(t){t(e.value)}).then(a,u)}s((n=n.apply(e,t||[])).next())})},o=this&&this.__generator||function(e,t){function r(e){return function(t){return n([e,t])}}function n(r){if(i)throw new TypeError("Generator is already executing.");for(;s;)try{if(i=1,o&&(a=o[2&r[0]?"return":r[0]?"throw":"next"])&&!(a=a.call(o,r[1])).done)return a;switch(o=0,a&&(r=[0,a.value]),r[0]){case 0:case 1:a=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,o=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(a=s.trys,!(a=a.length>0&&a[a.length-1])&&(6===r[0]||2===r[0])){s=0;continue}if(3===r[0]&&(!a||r[1]>a[0]&&r[1]<a[3])){s.label=r[1];break}if(6===r[0]&&s.label<a[1]){s.label=a[1],a=r;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(r);break}a[2]&&s.ops.pop(),s.trys.pop();continue}r=t.call(e,s)}catch(e){r=[6,e],o=0}finally{i=a=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}var i,o,a,u,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return u={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u};Object.defineProperty(t,"__esModule",{value:!0});var a=r(4),u=r(10);t.default=n},function(e,t,r){"use strict";function n(e,t,r,n,i){return l.decompose(e,t,r,n,i)}var i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function a(e){try{s(n.next(e))}catch(e){o(e)}}function u(e){try{s(n.throw(e))}catch(e){o(e)}}function s(e){e.done?i(e.value):new r(function(t){t(e.value)}).then(a,u)}s((n=n.apply(e,t||[])).next())})},o=this&&this.__generator||function(e,t){function r(e){return function(t){return n([e,t])}}function n(r){if(i)throw new TypeError("Generator is already executing.");for(;s;)try{if(i=1,o&&(a=o[2&r[0]?"return":r[0]?"throw":"next"])&&!(a=a.call(o,r[1])).done)return a;switch(o=0,a&&(r=[0,a.value]),r[0]){case 0:case 1:a=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,o=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(a=s.trys,!(a=a.length>0&&a[a.length-1])&&(6===r[0]||2===r[0])){s=0;continue}if(3===r[0]&&(!a||r[1]>a[0]&&r[1]<a[3])){s.label=r[1];break}if(6===r[0]&&s.label<a[1]){s.label=a[1],a=r;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(r);break}a[2]&&s.ops.pop(),s.trys.pop();continue}r=t.call(e,s)}catch(e){r=[6,e],o=0}finally{i=a=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}var i,o,a,u,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return u={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u};Object.defineProperty(t,"__esModule",{value:!0});var a=r(5),u=r(6),s=r(1),f=r(8),c=r(2),h=r(9),l=function(){function e(e,t,r,n){this.tileSize=e,this.patternSet=t,this.renderFunc=r,this.renderSoloFunc=n,this.slicer=new u.Slicer(this.tileSize),this.hashesMap=new Map,this.chipMap=new Map,this.width=NaN,this.height=NaN,this.numTiles=NaN}return e.decompose=function(t,r,n,a,u){return i(this,void 0,void 0,function(){var i,s,f,c,h;return o(this,function(o){switch(o.label){case 0:return i=new e(t,r,n,a),[4,i.buildAreaMap(function(e,t){return u(0,e,t)})];case 1:return s=o.sent(),[4,i.buildHashes(s,function(e,t){return u(1,e,t)})];case 2:return f=o.sent(),c=f[0],h=f[1],[4,new p(i.width,i.height,i.tileSize,i.chipMap,h,c)];case 3:return[2,o.sent()]}})})},e.prototype.render=function(e,t,r){return i(this,void 0,void 0,function(){var n,i,a,u,s,f,c,h,l,p=this;return o(this,function(o){switch(o.label){case 0:return[4,this.renderFunc(t)];case 1:return n=o.sent(),[4,this.slicer.slice(n)];case 2:for(i=o.sent(),a=i[0],u=i[1],s=new Uint32Array(a,4),f=this.hashesMap.get(e),f||(f=new Map,this.hashesMap.set(e,f)),c=0,h=r;c<h.length;c++)l=h[c],f.set(l,s[l]);return u.forEach(function(e,t){var r=p.chipMap.get(t);if(!r)return void p.chipMap.set(t,e);var n=new Uint32Array(e),i=new Uint32Array(r);i[0]>n[0]&&(i[0]=n[0])}),[2]}})})},e.prototype.renderSolo=function(e){return this.renderSoloFunc(e)},e.prototype.buildAreaMap=function(e){return i(this,void 0,void 0,function(){var t,r,n,i,u,c,h,l,p=this;return o(this,function(o){switch(o.label){case 0:return t=this.patternSet.map(function(e){return e.length}).reduce(function(e,t){return e+t}),r=0,[4,this.renderSolo(this.patternSet.map(function(){return-1}))];case 1:return n=o.sent(),this.width=n.width,this.height=n.height,i=this.tileSize,this.numTiles=((n.width+i-1)/i|0)*((n.height+i-1)/i|0),u=new a.default(i),c=new Map,c.set(0,new s.BitArray(this.numTiles).buffer.buffer),h=this.patternSet,l=[],h.forEach(function(n,i){for(var o=0;o<n.length;++o)!function(n){var o=h.map(function(e,t){return t!==i?-1:n});l.push(p.renderSolo(o).then(function(e){return u.generate(e)}).then(function(e){return c.set(f.toIndexIncludingNone(o,h),e.buffer.buffer)}).then(function(){return e(++r,t)}))}(o)}),[4,Promise.all(l)];case 2:return o.sent(),[2,c]}})})},e.prototype.buildHashes=function(e,t){return i(this,void 0,void 0,function(){var r,n,i,a,u,l,p,w,d,v,b,g,y,m,k=this;return o(this,function(U){switch(U.label){case 0:return[4,h.default.create("prima-hashes",!0)];case 1:r=U.sent(),n=r.bulkWriter(104857600/(4*(this.numTiles+1))|0),i=this.patternSet,a=this.hashesMap,u=f.number(i),l=new Uint32Array(u),p=0,w=0,d=0,v=!1,b=0,g=function(){var h,g,m,U,x,A,P,M,_,S,L,D,O,j,R;return o(this,function(o){switch(o.label){case 0:return p>=u?(y.hashesMap.clear(),[4,n.flush()]):[3,2];case 1:return o.sent(),[2,{value:[r,l]}];case 2:for(h=f.fromIndex(p,i),g=h.map(function(t,r){var n=f.toIndexIncludingNone(h.map(function(e,n){return r===n?t:-1}),i),o=e.get(n);if(!o)throw new Error("#"+n+" AreaMap not found.");return new Uint32Array(o)}),m=y.numTiles,U=new Map,x=new Uint32Array(m+1),A=g.length,P=0;P<m;++P){for(M=new Array(A),_=0;_<A;++_)M[_]=s.get(g[_],P)?h[_]:-1;S=f.toIndexIncludingNone(M,i),L=a.get(S),L&&void 0!==(D=L.get(P))?x[P+1]=D:(O=U.get(S),O?O[1].push(P):U.set(S,[M,[P]]))}return U.size>0?(j=[],U.forEach(function(e,t){var r=e[0],n=e[1];return j.push(k.render(t,r,n))}),v=!0,[4,Promise.all(j)]):[3,4];case 3:return o.sent(),[2,"continue"];case 4:return x[0]=c.calcHash(new Uint32Array(x.buffer,4)),l[p]=x[0],v?++d:++w,v=!1,[4,n.set(p,x.buffer)];case 5:return o.sent(),(++p,(R=Date.now())-b>400)?(b=R,[4,t(p,u)]):[3,7];case 6:o.sent(),o.label=7;case 7:return[2]}})},y=this,U.label=2;case 2:return[5,g()];case 3:if("object"==typeof(m=U.sent()))return[2,m.value];U.label=4;case 4:return[3,2];case 5:return[2]}})})},e}();t.decompose=n;var p=function(){function e(e,t,r,n,i,o){if(this.width=e,this.height=t,this.tileSize=r,this.chipMap=n,this.patternDiffHashes=i,this.abstore=o,e<=0||t<=0)throw new Error("invalid image size: "+e+"x"+t)}return Object.defineProperty(e.prototype,"length",{get:function(){return this.patternDiffHashes.length},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"memory",{get:function(){var e=this.tileSize;return this.chipMap.size*(4+e*e*4+8)+this.patternDiffHashes.length*(((this.width+e-1)/e|0)*((this.height+e-1)/e|0)*4+4+8)},enumerable:!0,configurable:!0}),e.prototype.getPatternHashes=function(e){return i(this,void 0,void 0,function(){var t;return o(this,function(r){switch(r.label){case 0:return[4,this.abstore.get(e)];case 1:return t=r.sent(),[2,new Uint32Array(t,4)]}})})},e.prototype.popPatternHashes=function(e){return i(this,void 0,void 0,function(){var t;return o(this,function(r){switch(r.label){case 0:return[4,this.abstore.pop(e)];case 1:return t=r.sent(),[2,new Uint32Array(t,4)]}})})},e.prototype.render=function(e){return i(this,void 0,void 0,function(){var t,r,n,i,a,u,s,f,c,h;return o(this,function(o){switch(o.label){case 0:return[4,this.abstore.get(e)];case 1:if(t=o.sent(),r=new Uint32Array(t,4),n=this.width,i=this.height,a=this.tileSize,u=document.createElement("canvas"),u.width=n,u.height=i,!((s=u.getContext("2d"))instanceof CanvasRenderingContext2D))throw new Error("could not get CanvasRenderingContext2D");for(f=0,c=0;f<i;f+=a)for(h=0;h<n;h+=a)s.putImageData(this.getChipImage(r[c++]),h,f);return[2,u]}})})},e.prototype.getChipImage=function(e){var t=this.chipMap.get(e);if(!t)throw new Error("chip #"+("00000000"+e.toString(16)).slice(-8)+" is not found");for(var r=new ImageData(this.tileSize,this.tileSize),n=new Uint8Array(t,4),i=new Uint8Array(r.data.buffer),o=n.length,a=0;a<o;++a)i[a]=n[a];return r},e.prototype.getChipIndices=function(){var e=this.chipMap,t=new Uint32Array(e.size),r=0;e.forEach(function(e,n){return t[r++]=n}),t.sort(function(t,r){var n=new Uint32Array(e.get(t))[0],i=new Uint32Array(e.get(r))[0];return n!==i?n<i?-1:1:t===r?0:t<r?-1:1});for(var n=new Map,i=t.length,o=0;o<i;++o)n.set(t[o],o);return[t,n]},e.prototype.getPatternIndices=function(){for(var e=this.patternDiffHashes,t=e.length,r=new Uint32Array(t),n=0;n<t;++n)r[n]=n;var i=c.getComparer(e[0]);return r.sort(function(t,r){var n=e[t],o=e[r],a=i(n,o);return 0!==a?a:n<o?-1:1}),r},e}();t.DecomposedImage=p},function(e,t,r){"use strict";function n(e,t,r){if(t===e.width&&r===e.height&&e instanceof HTMLCanvasElement){var n=e.getContext("2d");if(!(n instanceof CanvasRenderingContext2D))throw new Error("could not get CanvasRenderingContext2D");return n.getImageData(0,0,t,r)}var i=document.createElement("canvas");i.width=t,i.height=r;var o=i.getContext("2d");if(!(o instanceof CanvasRenderingContext2D))throw new Error("could not get CanvasRenderingContext2D");return o.drawImage(e,0,0),o.getImageData(0,0,i.width,i.height)}Object.defineProperty(t,"__esModule",{value:!0});var i=r(0),o=r(1),a=function(){function e(t){this.tileSize=t,this.worker=new i.PromiseWorker(e.createWorkerURL())}return e.prototype.generate=function(e){var t=this.tileSize,r=((e.width+t-1)/t|0)*t,i=((e.height+t-1)/t|0)*t,a=n(e,r,i);return this.worker.postMessage({image:a.data.buffer,width:r,height:i,tileSize:t},[a.data.buffer]).then(function(e){return new o.BitArray(e.buffer,e.length)})},Object.defineProperty(e.prototype,"tasks",{get:function(){return this.worker.waits},enumerable:!0,configurable:!0}),e._findRegion=function(e,t,r,n){for(var i,o,a,u=new Uint8Array(e),s=t/n|0,f=r/n|0,c=s*f,h=new Uint32Array(c+31>>>5),l=0;l<f;++l)for(var p=l*n,w=0;w<s;++w)e:for(var d=0;d<n;++d)for(var v=4*((p+d)*t+w*n),b=0;b<n;++b,v+=4)if(u[v+3]>0){i=l*s+w,o=i>>>5,a=i-(o<<5),h[o]|=1<<a;break e}return[h.buffer,c]},e.createWorkerURL=function(){return e.workerURL?e.workerURL:(e.workerURL=URL.createObjectURL(new Blob(["\n'use strict';\nvar findRegion = "+e._findRegion.toString()+";\nonmessage = function(e){\n    var d = e.data[1];\n    var ret = findRegion(d.image, d.width, d.height, d.tileSize);\n    postMessage({buffer: ret[0], length: ret[1]}, [ret[0]]);\n};"],{type:"text/javascript"})),e.workerURL)},e}();t.default=a},function(e,t,r){"use strict";function n(e,t,r){if(t===e.width&&r===e.height&&e instanceof HTMLCanvasElement){var n=e.getContext("2d");if(!(n instanceof CanvasRenderingContext2D))throw new Error("could not get CanvasRenderingContext2D");return n.getImageData(0,0,t,r)}var i=document.createElement("canvas");i.width=t,i.height=r;var o=i.getContext("2d");if(!(o instanceof CanvasRenderingContext2D))throw new Error("could not get CanvasRenderingContext2D");return o.drawImage(e,0,0),o.getImageData(0,0,i.width,i.height)}Object.defineProperty(t,"__esModule",{value:!0});var i=r(7),o=r(2),a=r(0),u=function(){function e(t){this.tileSize=t,this.worker=new a.PromiseWorker(e.createWorkerURL())}return e.prototype.slice=function(e){var t=this.tileSize,r=((e.width+t-1)/t|0)*t,i=((e.height+t-1)/t|0)*t,o=n(e,r,i);return this.worker.postMessage({imageData:o.data.buffer,width:r,height:i,tileSize:t},[o.data.buffer])},Object.defineProperty(e.prototype,"tasks",{get:function(){return this.worker.waits},enumerable:!0,configurable:!0}),e._slice=function(e,t,r,n,i,o,a){var u=[],s=new Map,f=new Uint8Array(e),c=t/n|0,h=r/n|0,l=new Uint32Array(1+c*h),p=new ArrayBuffer(4+4*n*n),w=new Uint8Array(p,4);s.set(i(w,o),p.slice(0));for(var d=0;d<h;++d)for(var v=d*n,b=0;b<c;++b){for(var g=0;g<n;++g)for(var y=4*((v+g)*t+b*n),m=g*n*4,k=0;k<n;++k)w[m++]=f[y++],w[m++]=f[y++],w[m++]=f[y++],w[m++]=f[y++];var U=i(w,o),x=d*c+b;if(!s.has(U)){var A=p.slice(0);new Uint32Array(A)[0]=x+1,u.push(A),s.set(U,A)}l[x+1]=U}return l[0]=a(new Uint32Array(l.buffer,4)),u.push(l.buffer),[l.buffer,s,u]},e.createWorkerURL=function(){return e.workerURL?e.workerURL:(e.workerURL=URL.createObjectURL(new Blob(["\n'use strict';\nvar crcTable = new Uint32Array("+JSON.stringify(Array.from(new Int32Array(i.crcTable.buffer)))+");\nvar crc32 = "+i.crc32.toString()+";\nvar calcHash = "+o.calcHash.toString()+";\nvar slice = "+e._slice.toString()+";\nonmessage = function(e){\n    var d = e.data[1];\n    var ret = slice(d.imageData, d.width, d.height, d.tileSize, crc32, crcTable, calcHash);\n    postMessage([ret[0], ret[1]], ret[2]);\n};"],{type:"text/javascript"})),e.workerURL)},e}();t.Slicer=u},function(e,t,r){"use strict";function n(e,r){r||(r=t.crcTable);for(var n=-1,i=0;i<e.length;i++)n=n>>>8^r[255&(n^e[i])];return(-1^n)>>>0}Object.defineProperty(t,"__esModule",{value:!0}),t.crcTable=new Uint32Array([0,1996959894,-301047508,-1727442502,124634137,1886057615,-379345611,-1637575261,249268274,2044508324,-522852066,-1747789432,162941995,2125561021,-407360249,-1866523247,498536548,1789927666,-205950648,-2067906082,450548861,1843258603,-187386543,-2083289657,325883990,1684777152,-43845254,-1973040660,335633487,1661365465,-99664541,-1928851979,997073096,1281953886,-715111964,-1570279054,1006888145,1258607687,-770865667,-1526024853,901097722,1119000684,-608450090,-1396901568,853044451,1172266101,-589951537,-1412350631,651767980,1373503546,-925412992,-1076862698,565507253,1454621731,-809855591,-1195530993,671266974,1594198024,-972236366,-1324619484,795835527,1483230225,-1050600021,-1234817731,1994146192,31158534,-1731059524,-271249366,1907459465,112637215,-1614814043,-390540237,2013776290,251722036,-1777751922,-519137256,2137656763,141376813,-1855689577,-429695999,1802195444,476864866,-2056965928,-228458418,1812370925,453092731,-2113342271,-183516073,1706088902,314042704,-1950435094,-54949764,1658658271,366619977,-1932296973,-69972891,1303535960,984961486,-1547960204,-725929758,1256170817,1037604311,-1529756563,-740887301,1131014506,879679996,-1385723834,-631195440,1141124467,855842277,-1442165665,-586318647,1342533948,654459306,-1106571248,-921952122,1466479909,544179635,-1184443383,-832445281,1591671054,702138776,-1328506846,-942167884,1504918807,783551873,-1212326853,-1061524307,-306674912,-1698712650,62317068,1957810842,-355121351,-1647151185,81470997,1943803523,-480048366,-1805370492,225274430,2053790376,-468791541,-1828061283,167816743,2097651377,-267414716,-2029476910,503444072,1762050814,-144550051,-2140837941,426522225,1852507879,-19653770,-1982649376,282753626,1742555852,-105259153,-1900089351,397917763,1622183637,-690576408,-1580100738,953729732,1340076626,-776247311,-1497606297,1068828381,1219638859,-670225446,-1358292148,906185462,1090812512,-547295293,-1469587627,829329135,1181335161,-882789492,-1134132454,628085408,1382605366,-871598187,-1156888829,570562233,1426400815,-977650754,-1296233688,733239954,1555261956,-1026031705,-1244606671,752459403,1541320221,-1687895376,-328994266,1969922972,40735498,-1677130071,-351390145,1913087877,83908371,-1782625662,-491226604,2075208622,213261112,-1831694693,-438977011,2094854071,198958881,-2032938284,-237706686,1759359992,534414190,-2118248755,-155638181,1873836001,414664567,-2012718362,-15766928,1711684554,285281116,-1889165569,-127750551,1634467795,376229701,-1609899400,-686959890,1308918612,956543938,-1486412191,-799009033,1231636301,1047427035,-1362007478,-640263460,1088359270,936918e3,-1447252397,-558129467,1202900863,817233897,-1111625188,-893730166,1404277552,615818150,-1160759803,-841546093,1423857449,601450431,-1285129682,-1000256840,1567103746,711928724,-1274298825,-1022587231,1510334235,755167117]),t.crc32=n},function(e,t,r){"use strict";function n(e){var t=e.length;if(0===t)return 0;for(var r=1,n=t-1;n>=0;--n)r*=e[n].length;if(r>Number.MAX_SAFE_INTEGER)throw new Error("too many patterns");return r}function i(e,t){for(var r=t.length,n=0,i=1,o=r-1;o>=0;--o){if(e[o]>=t[o].length)throw new Error("parts index out of range");n+=e[o]*i,i*=t[o].length}return n}function o(e,t){if(e>=n(t))throw new Error("pattern index out of range");for(var r=t.length,i=new Array(r),o=r-1,a=void 0,u=void 0;o>=0;--o)a=t[o].length,u=e/a|0,i[o]=e-u*a,e=u;return i}function a(e,t){for(var r=t.length,n=0,i=1,o=r-1,a=void 0,u=void 0;o>=0;--o){if(a=t[o].length+1,(u=e[o]+1)>=a)throw new Error("parts index out of range");n+=u*i,i*=a}return n}function u(e,t){if(e>=n(t))throw new Error("pattern index out of range");for(var r=t.length,i=new Array(r),o=r-1,a=void 0,u=void 0;o>=0;--o)a=t[o].length+1,u=e/a|0,i[o]=e-u*a-1,e=u;return i}Object.defineProperty(t,"__esModule",{value:!0}),t.number=n,t.toIndex=i,t.fromIndex=o,t.toIndexIncludingNone=a,t.fromIndexIncludingNone=u},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){}return e.deleteDatabase=function(e){return new Promise(function(t){var r=indexedDB.deleteDatabase(e);r.onerror=function(e){return t()},r.onsuccess=function(e){return t()}})},e.openDatabase=function(e){var t=this;return new Promise(function(r,n){var i=indexedDB.open(e,1);i.onerror=function(e){return n(e)},i.onsuccess=function(e){return i.result instanceof IDBDatabase?r(i.result):n(new Error("could not get IDBDatabase"))},i.onupgradeneeded=function(e){if(!(i.result instanceof IDBDatabase))return n(new Error("could not get IDBDatabase"));var r=i.result;try{r.deleteObjectStore(t.storeName)}catch(e){}r.createObjectStore(t.storeName)}})},e.transactionReadOnly=function(e){return e.transaction(this.storeName,"readonly")},e.transactionReadWrite=function(e){return e.transaction(this.storeName,"readwrite")},e.delete=function(e,t){var r=this;return new Promise(function(n,i){var o=e.objectStore(r.storeName).delete(t);o.onsuccess=function(e){return n()},o.onerror=function(e){return i(e)}})},e.set=function(e,t,r){var n=this;return new Promise(function(i,o){var a=e.objectStore(n.storeName).put(r,t);a.onsuccess=function(e){return i()},a.onerror=function(e){return o(e)}})},e.get=function(e,t){var r=this;return new Promise(function(n,i){var o=e.objectStore(r.storeName).get(t);o.onsuccess=function(e){return n(o.result)},o.onerror=function(e){return i(e)}})},e.clean=function(e){var t=this;return new Promise(function(r,n){var i=e.objectStore(t.storeName),o=i.openKeyCursor();o.onsuccess=function(e){if(!(o.result instanceof IDBCursor))return r();i.delete(o.result.key),o.result.continue()},o.onerror=function(e){return n(e)}})},e.storeName="file",e}(),i=function(){function e(e){var t=this;this.tx=e,this.get=function(e){return n.get(t.tx,e)}}return e}(),o=function(){function e(e){var t=this;this.tx=e,this.get=function(e){return n.get(t.tx,e)},this.set=function(e,r){return n.set(t.tx,e,r)},this.delete=function(e){return n.delete(t.tx,e)},this.pop=function(e){return t.get(e).then(function(r){return t.delete(e).then(function(){return r})})},this.clean=function(){return n.clean(t.tx)}}return e}(),a=function(){function e(e,t){this.abstore=e,this.bufferSize=t,this.buffer=[]}return e.prototype.set=function(e,t){return this.buffer.push([e,t]),this.buffer.length<this.bufferSize?Promise.resolve():this.flush()},e.prototype.flush=function(){var e=this.abstore.transactionReadWrite(),t=Promise.all(this.buffer.map(function(t){var r=t[0],n=t[1];return e.set(r,n)})).then(function(){});return this.buffer=[],t},e}(),u=function(){function e(e){var t=this;this.db=e,this.set=function(e,r){return t.transactionReadWrite().set(e,r)},this.delete=function(e){return t.transactionReadWrite().delete(e)},this.get=function(e){return t.transactionReadOnly().get(e)},this.pop=function(e){return t.transactionReadWrite().pop(e)},this.clean=function(){return t.transactionReadWrite().clean()},this.transactionReadOnly=function(){return new i(n.transactionReadOnly(t.db))},this.transactionReadWrite=function(){return new o(n.transactionReadWrite(t.db))},this.bulkWriter=function(e){return new a(t,e)}}return e.create=function(t,r){return(r?n.deleteDatabase(t):Promise.resolve()).then(function(){return n.openDatabase(t)}).then(function(t){return new e(t)})},e}();t.default=u},function(e,t,r){"use strict";function n(e,t){for(var r=t*e*e,n=64;n<=1024;n+=n)if(r<=n*n)return n;return 1024}function i(e,t,r){for(var i=4*e,o=[],a=t.length,u=0;a>0;){for(var s=n(e,a),f=new Uint8Array(s*s*4),c=s/e|0,h=Math.min(c*c,a),l=0;l<h;++l,++u)for(var p=l/c|0,w=l-p*c,d=new Uint8Array(r.get(t[u]),4),v=0,b=p*s*i,g=b+s*i;b<g;b+=4*s)for(var y=b+w*i,m=y+i;y<m;++y,++v)f[y]=d[v];o.push([f,s,s]),a-=h}return o}function o(e){for(var t=e.length,r=0,n=0,i=0,o=0,a=0;r<t;)e[r]-=n,n+=e[r++],e[r]-=i,i+=e[r++],e[r]-=o,o+=e[r++],e[r]-=a,a+=e[r++];return e}function a(e,t,r){return new Promise(function(n){var i=new s.default(1024*(e.width*e.height<16777216?1:4)*1024),o=e.patternDiffHashes.length,a=e.getPatternIndices(),u=new DataView(new ArrayBuffer(4*o)),f=0,c=0,h=function(){if(c>=o)return e.abstore.clean().then(function(){return n([u.buffer,i])});u.setUint32(4*a[c],c,!0),e.getPatternHashes(a[c]).then(function(e){var n=new Uint32Array(e.length);e.forEach(function(e,r){return n[r]=t.get(e)+1}),i.addInt32Array(n).then(function(){++c;var e=Date.now();return e-f>400?(f=e,r(c,o)):Promise.resolve()}).then(h)})};h()})}function u(e,t,r){var n=e.getChipIndices(),u=n[0],f=n[1];return a(e,f,r).then(function(r){var n=r[0],a=r[1];return Promise.all([Promise.resolve().then(function(){var t=new DataView(new ArrayBuffer(18));return t.setUint32(0,1095650884,!0),t.setUint32(4,10,!0),t.setUint32(8,e.width,!0),t.setUint32(12,e.height,!0),t.setUint16(16,e.tileSize,!0),[[t.buffer],t.byteLength]}),Promise.all(i(e.tileSize,u,e.chipMap).map(function(e){var t=e[0],r=e[1],n=e[2],i=new s.default(4194304);return i.addUint8Array(o(t)),i.finish().then(function(e){var t=e[0],i=e[1],o=new DataView(new ArrayBuffer(16));return o.setUint32(0,541543753,!0),o.setUint32(4,8+i,!0),o.setUint32(8,r,!0),o.setUint32(12,n,!0),t.unshift(o.buffer),[t,o.byteLength+i]})})),Promise.resolve().then(function(){var e=new Blob([JSON.stringify(t)],{type:"application/json; charset=utf-8"}),r=new DataView(new ArrayBuffer(8));return r.setUint32(0,1314018384,!0),r.setUint32(4,e.size,!0),[[r.buffer,e],r.byteLength+e.size]}),Promise.resolve().then(function(){var e=new DataView(new ArrayBuffer(8));return e.setUint32(0,1347241033,!0),e.setUint32(4,n.byteLength,!0),[[e.buffer,n],e.byteLength+n.byteLength]}),a.finish().then(function(e){var t=e[0],r=e[1],n=new s.default(4194304);return t.forEach(function(e){return n.addUint8Array(new Uint8Array(e))}),n.finish().then(function(e){var t=e[0],n=e[1],i=new DataView(new ArrayBuffer(12));return i.setUint32(0,1162627412,!0),i.setUint32(4,4+n,!0),i.setUint32(8,r,!0),t.unshift(i.buffer),[t,i.byteLength+n]})})]).then(function(e){var t=e[0],r=t[0],n=t[1],i=e[1],o=e[2],a=o[0],u=o[1],s=e[3],f=s[0],c=s[1],h=e[4],l=h[0],p=h[1],w=[],d=new DataView(new ArrayBuffer(8));return d.setUint32(0,1179011410,!0),d.setUint32(4,n+i.map(function(e){return e[1]}).reduce(function(e,t){return e+t})+u+c+p,!0),w.push(d.buffer),r.forEach(function(e){return w.push(e)}),i.forEach(function(e){return e[0].forEach(function(e){return w.push(e)})}),a.forEach(function(e){return w.push(e)}),f.forEach(function(e){return w.push(e)}),l.forEach(function(e){return w.push(e)}),new Blob(w,{type:"application/octet-binary"})})})}Object.defineProperty(t,"__esModule",{value:!0});var s=r(11);t.generate=u},function(e,t,r){"use strict";function n(e,t,r,n,i){for(var o=0;o<i;++o)e[r++]=t[n++]}function i(e,t,r,n,i){for(var o=new DataView(e.buffer),a=r+i;r<a;r+=4,++n)o.setInt32(r,t[n],!0)}function o(e,t,r){for(var n=0;n<r;++n)e[t++]=0}var a=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function a(e){try{s(n.next(e))}catch(e){o(e)}}function u(e){try{s(n.throw(e))}catch(e){o(e)}}function s(e){e.done?i(e.value):new r(function(t){t(e.value)}).then(a,u)}s((n=n.apply(e,t||[])).next())})},u=this&&this.__generator||function(e,t){function r(e){return function(t){return n([e,t])}}function n(r){if(i)throw new TypeError("Generator is already executing.");for(;s;)try{if(i=1,o&&(a=o[2&r[0]?"return":r[0]?"throw":"next"])&&!(a=a.call(o,r[1])).done)return a;switch(o=0,a&&(r=[0,a.value]),r[0]){case 0:case 1:a=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,o=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(a=s.trys,!(a=a.length>0&&a[a.length-1])&&(6===r[0]||2===r[0])){s=0;continue}if(3===r[0]&&(!a||r[1]>a[0]&&r[1]<a[3])){s.label=r[1];break}if(6===r[0]&&s.label<a[1]){s.label=a[1],a=r;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(r);break}a[2]&&s.ops.pop(),s.trys.pop();continue}r=t.call(e,s)}catch(e){r=[6,e],o=0}finally{i=a=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}var i,o,a,u,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return u={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u};Object.defineProperty(t,"__esModule",{value:!0});var s=r(0),f=r(12),c=function(){function e(){this.worker=new s.ThrottlePromiseWorker(e.createWorkerURL(),2,3)}return Object.defineProperty(e.prototype,"tasks",{get:function(){return this.worker.waits},enumerable:!0,configurable:!0}),e.prototype.compressHC=function(e){return this.worker.postMessage({buffer:e},[e])},e._compress=function(e,t,r){var n=r.compressBlockBound(e.byteLength);(!t||t.byteLength<n)&&(t=new Uint8Array(n));var i=r.compressBlockHC(new Uint8Array(e),t);return i>e.byteLength?[void 0,t]:[t.slice(0,i).buffer,t]},e.createWorkerURL=function(){return e.workerURL?e.workerURL:(e.workerURL=URL.createObjectURL(new Blob(["\n'use strict';\n"+f+"\nvar compBuffer = undefined;\nvar compress = "+e._compress.toString()+";\nonmessage = function(e){\n    var r = compress(e.data[1].buffer, compBuffer, LZ4);\n    if (r[0]) {\n        postMessage([r[0], true], [r[0]]);\n    } else {\n        postMessage([e.data[1].buffer, false], [e.data[1].buffer]);\n    }\n    compBuffer = r[1];\n};"],{type:"text/javascript"})),e.workerURL)},e}(),h=new c,l=function(){function e(e){if(this.bufferSize=e,this.buffers=[],this.buffer=new Uint8Array(this.bufferSize),this.used=0,1048576!==e&&4194304!==e)throw new Error("unsupported buffer size: "+e)}return e.prototype.compress=function(e){e&&o(this.buffer,e,this.buffer.length-e);var t=this.buffer.buffer;this.buffer=new Uint8Array(this.bufferSize),this.used=0;var r=h.compressHC(t);return this.buffers.push(r),r},e.prototype.addInt32Array=function(e){for(var t=[];;){if(this.bufferSize-this.used>=e.byteLength)return i(this.buffer,e,this.used,0,e.byteLength),this.used+=e.byteLength,Promise.all(t);var r=this.bufferSize-this.used;i(this.buffer,e,this.used,0,r),e=new Int32Array(e.buffer,e.byteOffset+r,e.byteLength-r>>2),t.push(this.compress())}},e.prototype.addUint8Array=function(e){for(var t=[];;){if(this.bufferSize-this.used>=e.byteLength)return n(this.buffer,e,this.used,0,e.byteLength),this.used+=e.byteLength,Promise.all(t);var r=this.bufferSize-this.used;n(this.buffer,e,this.used,0,r),e=new Uint8Array(e.buffer,e.byteOffset+r,e.byteLength-r),t.push(this.compress())}},e.prototype.finish=function(){return a(this,void 0,void 0,function(){var e,t,r,n,i,o,a,s,f,c,h;return u(this,function(u){switch(u.label){case 0:return 0!==this.used&&this.compress(this.used),[4,Promise.all(this.buffers)];case 1:switch(e=u.sent(),t=[],r=0,n=new ArrayBuffer(7),i=new DataView(n),i.setUint32(0,407708164,!0),this.bufferSize){case 1048576:i.setUint8(4,96),i.setUint8(5,96),i.setUint8(6,81);break;case 4194304:i.setUint8(4,96),i.setUint8(5,112),i.setUint8(6,115)}for(t.push(n),r+=n.byteLength,o=0,a=e;o<a.length;o++)s=a[o],f=s[0],c=s[1],h=new ArrayBuffer(4),new DataView(h).setUint32(0,f.byteLength|(c?0:2147483648),!0),t.push(h,f),r+=h.byteLength+f.byteLength;return t.push(new ArrayBuffer(4)),r+=4,[2,[t,r]]}})})},e}();t.default=l},function(e,t){e.exports='!function(r,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.LZ4=t():r.LZ4=t()}(this,function(){return function(r){function t(f){if(o[f])return o[f].exports;var e=o[f]={i:f,l:!1,exports:{}};return r[f].call(e.exports,e,e.exports,t),e.l=!0,e.exports}var o={};return t.m=r,t.c=o,t.d=function(r,o,f){t.o(r,o)||Object.defineProperty(r,o,{configurable:!1,enumerable:!0,get:f})},t.n=function(r){var o=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(o,"a",o),o},t.o=function(r,t){return Object.prototype.hasOwnProperty.call(r,t)},t.p="",t(t.s=0)}([function(r,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(r){for(var o in r)t.hasOwnProperty(o)||(t[o]=r[o])}(o(1))},function(r,t,o){"use strict";function f(r,t){var o=r>>>16&65535,f=65535&r,e=t>>>16&65535,i=65535&t;return f*i+(o*i+f*e<<16>>>0)|0}function e(r,t){return r[t+3]|r[t+2]<<8|r[t+1]<<16|r[t]<<24}function i(r,t,o,f,e){for(var i=0;i<e;++i)r[o++]=t[f++]}function n(r){var t=r.length;if(0===t)return 0;for(var o=0,f=0;;){var e=r[o]>>4,i=15&r[o];if(++o===t)throw w;if(e>0){if(15===e){for(;255===r[o];)if(e+=255,++o===t)throw w;if(e+=r[o],++o===t)throw w}if(f+=e,(o+=e)>=t)return f}if((o+=2)>=t)throw w;var n=r[o-2]|r[o-1]<<8;if(f-n<0||0===n)throw w;if(15===i){for(;255===r[o];)if(i+=255,++o===t)throw w;if(i+=r[o],++o===t)throw w}for(i+=4;i>=n;i-=n)f+=n;f+=i}}function u(r,t){var o=r.length,f=t.length;if(0===o)return 0;for(var e=0,n=0;;){var u=r[e]>>4,a=15&r[e];if(++e===o)throw w;if(u>0){if(15===u){for(;255===r[e];)if(u+=255,++e===o)throw w;if(u+=r[e],++e===o)throw w}if(f-n<u||e+u>o)throw l;if(i(t,r,n,e,u),n+=u,(e+=u)>=o)return n}if((e+=2)>=o)throw w;var h=r[e-2]|r[e-1]<<8;if(n-h<0||0===h)throw w;if(15===a){for(;255===r[e];)if(a+=255,++e===o)throw w;if(a+=r[e],++e===o)throw w}if(a+=4,f-n<=a)throw l;for(;a>=h;a-=h)i(t,t,n,n-h,h),n+=h;i(t,t,n,n-h,a),n+=a}}function a(r){return r+(r/255|0)+16}function h(r,t,o){var f=r.length-m,n=t.length;if(f<=0||0===n||o>=f)return 0;for(var u=0,a=0,h=new Uint32Array(g);u<o;){var c=j(e(r,u),x)>>>y;h[c]=++u}for(var w=u,p=1<<b;u<f-v;){var c=j(e(r,u),x)>>>y,d=h[c]-1;if(h[c]=u+1,d<0||u-d>>s>0||r[d]!==r[u]||r[d+1]!==r[u+1]||r[d+2]!==r[u+2]||r[d+3]!==r[u+3])u+=p>>b,++p;else{p=1<<b;var O=u-w,_=u-d;u+=v;for(var k=u;u<=f&&r[u]===r[u-_];)u++;if(k=u-k,t[a]=k<15?k:15,O<15)t[a]|=O<<4;else{if(t[a]|=240,++a===n)throw l;for(var B=O-15;B>=255;B-=255)if(t[a]=255,++a===n)throw l;t[a]=255&B}if(++a===n)throw l;if(a+O>=n)throw l;if(i(t,r,a,w,O),a+=O,w=u,(a+=2)>=n)throw l;if(t[a-2]=_,t[a-1]=_>>8,k>=15){for(k-=15;k>=255;k-=255)if(t[a]=255,++a===n)throw l;if(t[a]=k,++a===n)throw l}}}if(0===w)return 0;var M=r.length-w;if(M<15)t[a]=M<<4;else{if(t[a]=240,++a===n)throw l;for(M-=15;M>=255;M-=255)if(t[a]=255,++a===n)throw l;t[a]=M}if(++a===n)throw l;var P=r.length-w,U=a+P;if(U>n)throw l;return U>=f?0:(i(t,r,a,w,P),a+=P)}function c(r,t,o){var f=r.length-m,n=t.length;if(f<=0||0===n||o>=f)return 0;for(var u=0,a=0,h=new Uint32Array(g),c=new Uint32Array(p);u<o;){var w=j(e(r,u),x)>>>y;c[u&d]=h[w],h[w]=++u}for(var s=u;u<f-v;){for(var w=j(e(r,u),x)>>>y,b=0,O=0,_=h[w]-1;_>0&&_>u-p;_=c[_&d]-1)if(r[_+b]===r[u+b])for(var k=0;;++k)if(r[_+k]!==r[u+k]||u+k>f){b<k&&k>=v&&(b=k,O=u-_);break}if(c[u&d]=h[w],h[w]=u+1,0!==b){for(var B=u+1,k=u+b;B<k;){var M=j(e(r,B),x)>>>y;c[B&d]=h[M],h[M]=++B}var P=u-s;if(u+=b,b-=v,t[a]=b<15?b:15,P<15)t[a]|=P<<4;else{if(t[a]|=240,++a===n)throw l;for(var U=P-15;U>=255;U-=255)if(t[a]=255,++a===n)throw l;t[a]=255&U}if(++a===n)throw l;if(a+P>=n)throw l;if(i(t,r,a,s,P),a+=P,s=u,(a+=2)>=n)throw l;if(t[a-2]=O,t[a-1]=O>>8,b>=15){for(b-=15;b>=255;b-=255)if(t[a]=255,++a===n)throw l;if(t[a]=b,++a===n)throw l}}else++u}if(0===s)return 0;var A=r.length-s;if(A<15)t[a]=A<<4;else{if(t[a]=240,++a===n)throw l;for(A-=15;A>=255;A-=255)if(t[a]=255,++a===n)throw l;t[a]=A}if(++a===n)throw l;var L=r.length-s,E=a+L;if(E>n)throw l;return E>=f?0:(i(t,r,a,s,L),a+=L)}Object.defineProperty(t,"__esModule",{value:!0});var w=new Error("invalid source"),l=new Error("short buffer"),v=4,s=16,p=1<<s,d=p-1,g=65536,y=8*v-16,m=8+v,b=6,x=-1640531535,j=Math.imul?Math.imul:f;t.calcUncompressedLen=n,t.uncompressBlock=u,t.compressBlockBound=a,t.compressBlock=h,t.compressBlockHC=c}])});'}])});