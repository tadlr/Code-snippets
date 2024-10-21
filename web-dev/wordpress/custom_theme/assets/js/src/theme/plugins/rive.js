(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rive"] = factory();
	else
		root["rive"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var Rive = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(Rive) {
  Rive = Rive || {};


null;var k;k||(k=typeof Rive !== 'undefined' ? Rive : {});var aa,ba;k.ready=new Promise(function(b,a){aa=b;ba=a});
function ca(){function b(n){const g=d;c=a=0;d=new Map;g.forEach(l=>{try{l(n)}catch(h){console.error(h)}});this.Pa();e&&e.ib()}let a=0,c=0,d=new Map,e=null,f=null;this.requestAnimationFrame=function(n){a||(a=window.requestAnimationFrame(b.bind(this)));const g=++c;d.set(g,n);return g};this.cancelAnimationFrame=function(n){d.delete(n);a&&0==d.size&&(window.cancelAnimationFrame(a),a=0)};this.gb=function(n){f&&(document.body.remove(f),f=null);n||(f=document.createElement("div"),f.style.backgroundColor=
"black",f.style.position="fixed",f.style.right=0,f.style.top=0,f.style.color="white",f.style.padding="4px",f.innerHTML="RIVE FPS",n=function(g){f.innerHTML="RIVE FPS "+g.toFixed(1)},document.body.appendChild(f));e=new function(){let g=0,l=0;this.ib=function(){var h=performance.now();l?(++g,h-=l,1E3<h&&(n(1E3*g/h),g=l=0)):(l=h,g=0)}}};this.cb=function(){f&&(document.body.remove(f),f=null);e=null};this.Pa=function(){}}
function ea(b){console.assert(!0);const a=new Map;let c=-Infinity;this.push=function(d){d=d+((1<<b)-1)>>b;a.has(d)&&clearTimeout(a.get(d));a.set(d,setTimeout(function(){a.delete(d);0==a.length?c=-Infinity:d==c&&(c=Math.max(...a.keys()),console.assert(c<d))},1E3));c=Math.max(d,c);return c<<b}}
const fa=new function(){function b(){if(!a){var r=document.createElement("canvas"),x={alpha:1,depth:0,stencil:0,antialias:0,premultipliedAlpha:1,preserveDrawingBuffer:0,preferLowPowerToHighPerformance:0,failIfMajorPerformanceCaveat:0,enableExtensionsByDefault:1,explicitSwapControl:1,renderViaOffscreenBackBuffer:1};let q=r.getContext("webgl2",x);if(q)c=2;else if(q=r.getContext("webgl",x))c=1;else return console.log("No WebGL support. Image mesh will not be drawn."),!1;d=Math.min(q.getParameter(q.MAX_RENDERBUFFER_SIZE),
q.getParameter(q.MAX_TEXTURE_SIZE));function F(G,v,A){v=q.createShader(v);q.shaderSource(v,A);q.compileShader(v);A=q.getShaderInfoLog(v);if(0<A.length)throw A;q.attachShader(G,v)}r=q.createProgram();F(r,q.VERTEX_SHADER,"attribute vec2 vertex;\n                attribute vec2 uv;\n                uniform vec4 mat;\n                uniform vec2 translate;\n                varying vec2 st;\n                void main() {\n                    st = uv;\n                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);\n                }");
F(r,q.FRAGMENT_SHADER,"precision highp float;\n                uniform sampler2D image;\n                varying vec2 st;\n                void main() {\n                    gl_FragColor = texture2D(image, st);\n                }");q.bindAttribLocation(r,0,"vertex");q.bindAttribLocation(r,1,"uv");q.linkProgram(r);x=q.getProgramInfoLog(r);if(0<x.length)throw x;e=q.getUniformLocation(r,"mat");f=q.getUniformLocation(r,"translate");q.useProgram(r);q.bindBuffer(q.ARRAY_BUFFER,q.createBuffer());q.enableVertexAttribArray(0);
q.enableVertexAttribArray(1);q.bindBuffer(q.ELEMENT_ARRAY_BUFFER,q.createBuffer());q.uniform1i(q.getUniformLocation(r,"image"),0);q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0);a=q}return!0}let a=null,c=0,d=0,e=null,f=null,n=0,g=0;this.rb=function(){b();return d};this.bb=function(r){if(!b())return null;const x=a.createTexture();a.bindTexture(a.TEXTURE_2D,x);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,r);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,
a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);2==c?(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.generateMipmap(a.TEXTURE_2D)):a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);return x};const l=new ea(8),h=new ea(8),p=new ea(10),t=new ea(10);this.fb=function(r,x,q,F,G){if(b()){var v=l.push(r),A=h.push(x);if(a.canvas.width!=v||a.canvas.height!=A)a.canvas.width=v,a.canvas.height=A;a.viewport(0,A-x,r,x);a.disable(a.SCISSOR_TEST);
a.clearColor(0,0,0,0);a.clear(a.COLOR_BUFFER_BIT);a.enable(a.SCISSOR_TEST);q.sort((z,m)=>m.Sa-z.Sa);v=p.push(F);n!=v&&(a.bufferData(a.ARRAY_BUFFER,8*v,a.DYNAMIC_DRAW),n=v);v=0;for(var E of q)a.bufferSubData(a.ARRAY_BUFFER,v,E.Ea),v+=4*E.Ea.length;console.assert(v==4*F);for(var M of q)a.bufferSubData(a.ARRAY_BUFFER,v,M.Va),v+=4*M.Va.length;console.assert(v==8*F);v=t.push(G);g!=v&&(a.bufferData(a.ELEMENT_ARRAY_BUFFER,2*v,a.DYNAMIC_DRAW),g=v);E=0;for(var W of q)a.bufferSubData(a.ELEMENT_ARRAY_BUFFER,
E,W.ra),E+=2*W.ra.length;console.assert(E==2*G);W=0;M=!0;v=E=0;for(const z of q){z.image.ya!=W&&(a.bindTexture(a.TEXTURE_2D,z.image.Za||null),W=z.image.ya);z.ub?(a.scissor(z.Ia,A-z.Ja-z.Oa,z.Bb,z.Oa),M=!0):M&&(a.scissor(0,A-x,r,x),M=!1);q=2/r;const m=-2/x;a.uniform4f(e,z.na[0]*q*z.ua,z.na[1]*m*z.va,z.na[2]*q*z.ua,z.na[3]*m*z.va);a.uniform2f(f,z.na[4]*q*z.ua+q*(z.Ia-z.sb*z.ua)-1,z.na[5]*m*z.va+m*(z.Ja-z.tb*z.va)+1);a.vertexAttribPointer(0,2,a.FLOAT,!1,0,v);a.vertexAttribPointer(1,2,a.FLOAT,!1,0,v+
4*F);a.drawElements(a.TRIANGLES,z.ra.length,a.UNSIGNED_SHORT,E);v+=4*z.Ea.length;E+=2*z.ra.length}console.assert(v==4*F);console.assert(E==2*G)}};this.canvas=function(){return b()&&a.canvas}};
Rive.onRuntimeInitialized=function(){function b(m){switch(m){case h.srcOver:return"source-over";case h.screen:return"screen";case h.overlay:return"overlay";case h.darken:return"darken";case h.lighten:return"lighten";case h.colorDodge:return"color-dodge";case h.colorBurn:return"color-burn";case h.hardLight:return"hard-light";case h.softLight:return"soft-light";case h.difference:return"difference";case h.exclusion:return"exclusion";case h.multiply:return"multiply";case h.hue:return"hue";case h.saturation:return"saturation";
case h.color:return"color";case h.luminosity:return"luminosity"}}function a(m){return"rgba("+((16711680&m)>>>16)+","+((65280&m)>>>8)+","+((255&m)>>>0)+","+((4278190080&m)>>>24)/255+")"}function c(){0<E.length&&(fa.fb(A.drawWidth(),A.drawHeight(),E,M,W),E=[],W=M=0,A.reset(512,512));for(const m of v){for(const u of m.fa)u();m.fa=[]}v.clear()}var d=Rive.RenderPaintStyle;const e=Rive.RenderPath,f=Rive.RenderPaint,n=Rive.Renderer,g=Rive.StrokeCap,l=Rive.StrokeJoin,h=Rive.BlendMode,p=d.fill,t=d.stroke,
r=Rive.FillRule.evenOdd;let x=1;var q=Rive.RenderImage.extend("CanvasRenderImage",{__construct:function(){this.__parent.__construct.call(this);this.ya=x;x=x+1&2147483647||1},decode:function(m){var u=this,y=new Image;y.src=URL.createObjectURL(new Blob([m],{type:"image/png"}));y.onload=function(){u.Xa=y;u.Za=fa.bb(y);u.size(y.width,y.height)}}}),F=e.extend("CanvasRenderPath",{__construct:function(){this.__parent.__construct.call(this);this.ga=new Path2D},reset:function(){this.ga=new Path2D},addPath:function(m,
u){var y=this.ga,B=y.addPath;m=m.ga;const C=new DOMMatrix;C.a=u.xx;C.b=u.xy;C.c=u.yx;C.d=u.yy;C.e=u.tx;C.f=u.ty;B.call(y,m,C)},fillRule:function(m){this.Ga=m},moveTo:function(m,u){this.ga.moveTo(m,u)},lineTo:function(m,u){this.ga.lineTo(m,u)},cubicTo:function(m,u,y,B,C,J){this.ga.bezierCurveTo(m,u,y,B,C,J)},close:function(){this.ga.closePath()}}),G=f.extend("CanvasRenderPaint",{color:function(m){this.Ha=a(m)},thickness:function(m){this.$a=m},join:function(m){switch(m){case l.miter:this.xa="miter";
break;case l.round:this.xa="round";break;case l.bevel:this.xa="bevel"}},cap:function(m){switch(m){case g.butt:this.wa="butt";break;case g.round:this.wa="round";break;case g.square:this.wa="square"}},style:function(m){this.Ya=m},blendMode:function(m){this.Wa=b(m)},linearGradient:function(m,u,y,B){this.qa={Ta:m,Ua:u,La:y,Ma:B,Da:[]}},radialGradient:function(m,u,y,B){this.qa={Ta:m,Ua:u,La:y,Ma:B,Da:[],pb:!0}},addStop:function(m,u){this.qa.Da.push({color:m,stop:u})},completeGradient:function(){},draw:function(m,
u){let y=this.Ya;var B=this.Ha,C=this.qa;m.globalCompositeOperation=this.Wa;if(null!=C){B=C.Ta;var J=C.Ua;const X=C.La;var S=C.Ma;const T=C.Da;C.pb?(C=X-B,S-=J,B=m.createRadialGradient(B,J,0,B,J,Math.sqrt(C*C+S*S))):B=m.createLinearGradient(B,J,X,S);for(let O=0,da=T.length;O<da;O++)J=T[O],B.addColorStop(J.stop,a(J.color));this.Ha=B;this.qa=null}switch(y){case t:m.strokeStyle=B;m.lineWidth=this.$a;m.lineCap=this.wa;m.lineJoin=this.xa;m.stroke(u.ga);break;case p:m.fillStyle=B,m.fill(u.ga,u.Ga===r?"evenodd":
"nonzero")}}});const v=new Set;let A=null,E=[],M=0,W=0;var z=Rive.CanvasRenderer=n.extend("Renderer",{__construct:function(m){this.__parent.__construct.call(this);this.ia=[1,0,0,1,0,0];this.$=m.getContext("2d");this.Fa=m;this.fa=[]},save:function(){this.ia.push(...this.ia.slice(this.ia.length-6));this.fa.push(this.$.save.bind(this.$))},restore:function(){const m=this.ia.length-6;if(6>m)throw"restore() called without matching save().";this.ia.splice(m);this.fa.push(this.$.restore.bind(this.$))},transform:function(m){const u=
this.ia,y=u.length-6;u.splice(y,6,u[y]*m.xx+u[y+2]*m.xy,u[y+1]*m.xx+u[y+3]*m.xy,u[y]*m.yx+u[y+2]*m.yy,u[y+1]*m.yx+u[y+3]*m.yy,u[y]*m.tx+u[y+2]*m.ty+u[y+4],u[y+1]*m.tx+u[y+3]*m.ty+u[y+5]);this.fa.push(this.$.transform.bind(this.$,m.xx,m.xy,m.yx,m.yy,m.tx,m.ty))},_drawPath:function(m,u){this.fa.push(u.draw.bind(u,this.$,m))},_drawImage:function(m,u,y){var B=m.Xa;if(B){var C=this.$,J=b(u);this.fa.push(function(){C.globalCompositeOperation=J;C.globalAlpha=y;C.drawImage(B,0,0);C.globalAlpha=1})}},_getMatrix:function(m){const u=
this.ia,y=u.length-6;for(let B=0;6>B;++B)m[B]=u[y+B]},_drawImageMesh:function(m,u,y,B,C,J,S,X,T,O){var da=this.$.canvas.width,H=this.$.canvas.height;const ub=T-S,vb=O-X;S=Math.max(S,0);X=Math.max(X,0);T=Math.min(T,da);O=Math.min(O,H);const va=T-S,wa=O-X;console.assert(va<=Math.min(ub,da));console.assert(wa<=Math.min(vb,H));if(!(0>=va||0>=wa)){T=va<ub||wa<vb;da=O=1;var ia=Math.ceil(va*O),ja=Math.ceil(wa*da);H=fa.rb();ia>H&&(O*=H/ia,ia=H);ja>H&&(da*=H/ja,ja=H);A||(A=new k.DynamicRectanizer(H),A.reset(512,
512));H=A.addRect(ia,ja);0>H&&(c(),v.add(this),H=A.addRect(ia,ja),console.assert(0<=H));var wb=H&65535,xb=H>>16;E.push({na:this.ia.slice(this.ia.length-6),image:m,Ia:wb,Ja:xb,sb:S,tb:X,Bb:ia,Oa:ja,ua:O,va:da,Ea:new Float32Array(B),Va:new Float32Array(C),ra:new Uint16Array(J),ub:T,Sa:m.ya<<1|(T?1:0)});M+=B.length;W+=J.length;var na=this.$,ac=b(u);this.fa.push(function(){na.save();na.resetTransform();na.globalCompositeOperation=ac;na.globalAlpha=y;na.drawImage(fa.canvas(),wb,xb,ia,ja,S,X,va,wa);na.restore()})}},
_clipPath:function(m){this.fa.push(this.$.clip.bind(this.$,m.ga,m.Ga===r?"evenodd":"nonzero"))},clear:function(){v.add(this);this.fa.push(this.$.clearRect.bind(this.$,0,0,this.Fa.width,this.Fa.height))},flush:function(){}});Rive.makeRenderer=function(m){return new z(m)};Rive.renderFactory={makeRenderPaint:function(){return new G},makeRenderPath:function(){return new F},makeRenderImage:function(){return new q}};d=new ca;Rive.requestAnimationFrame=d.requestAnimationFrame.bind(d);Rive.cancelAnimationFrame=
d.cancelAnimationFrame.bind(d);Rive.enableFPSCounter=d.gb.bind(d);Rive.disableFPSCounter=d.cb;d.Pa=c};var ha={},ka;for(ka in k)k.hasOwnProperty(ka)&&(ha[ka]=k[ka]);var la="object"===typeof window,ma="function"===typeof importScripts,w="",oa,pa,qa,ra,sa;
if("object"===typeof process&&"object"===typeof process.versions&&"string"===typeof process.versions.node)w=ma?require("path").dirname(w)+"/":__dirname+"/",oa=function(b,a){ra||(ra=require("fs"));sa||(sa=require("path"));b=sa.normalize(b);return ra.readFileSync(b,a?null:"utf8")},qa=function(b){b=oa(b,!0);b.buffer||(b=new Uint8Array(b));b.buffer||ta("Assertion failed: undefined");return b},pa=function(b,a,c){ra||(ra=require("fs"));sa||(sa=require("path"));b=sa.normalize(b);ra.readFile(b,function(d,
e){d?c(d):a(e.buffer)})},1<process.argv.length&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(b){throw b;}),process.on("unhandledRejection",function(b){throw b;}),k.inspect=function(){return"[Emscripten Module object]"};else if(la||ma)ma?w=self.location.href:"undefined"!==typeof document&&document.currentScript&&(w=document.currentScript.src),_scriptDir&&(w=_scriptDir),0!==w.indexOf("blob:")?w=w.substr(0,w.replace(/[?#].*/,"").lastIndexOf("/")+1):
w="",oa=function(b){var a=new XMLHttpRequest;a.open("GET",b,!1);a.send(null);return a.responseText},ma&&(qa=function(b){var a=new XMLHttpRequest;a.open("GET",b,!1);a.responseType="arraybuffer";a.send(null);return new Uint8Array(a.response)}),pa=function(b,a,c){var d=new XMLHttpRequest;d.open("GET",b,!0);d.responseType="arraybuffer";d.onload=function(){200==d.status||0==d.status&&d.response?a(d.response):c()};d.onerror=c;d.send(null)};var ua=k.print||console.log.bind(console),xa=k.printErr||console.warn.bind(console);
for(ka in ha)ha.hasOwnProperty(ka)&&(k[ka]=ha[ka]);ha=null;var ya;k.wasmBinary&&(ya=k.wasmBinary);var noExitRuntime=k.noExitRuntime||!0;"object"!==typeof WebAssembly&&ta("no native wasm support detected");var za,Aa=!1,Ba="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;
function Ca(b,a,c){var d=a+c;for(c=a;b[c]&&!(c>=d);)++c;if(16<c-a&&b.subarray&&Ba)return Ba.decode(b.subarray(a,c));for(d="";a<c;){var e=b[a++];if(e&128){var f=b[a++]&63;if(192==(e&224))d+=String.fromCharCode((e&31)<<6|f);else{var n=b[a++]&63;e=224==(e&240)?(e&15)<<12|f<<6|n:(e&7)<<18|f<<12|n<<6|b[a++]&63;65536>e?d+=String.fromCharCode(e):(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023))}}else d+=String.fromCharCode(e)}return d}
function Da(b,a,c){var d=D;if(0<c){c=a+c-1;for(var e=0;e<b.length;++e){var f=b.charCodeAt(e);if(55296<=f&&57343>=f){var n=b.charCodeAt(++e);f=65536+((f&1023)<<10)|n&1023}if(127>=f){if(a>=c)break;d[a++]=f}else{if(2047>=f){if(a+1>=c)break;d[a++]=192|f>>6}else{if(65535>=f){if(a+2>=c)break;d[a++]=224|f>>12}else{if(a+3>=c)break;d[a++]=240|f>>18;d[a++]=128|f>>12&63}d[a++]=128|f>>6&63}d[a++]=128|f&63}}d[a]=0}}var Ea="undefined"!==typeof TextDecoder?new TextDecoder("utf-16le"):void 0;
function Fa(b,a){var c=b>>1;for(var d=c+a/2;!(c>=d)&&Ga[c];)++c;c<<=1;if(32<c-b&&Ea)return Ea.decode(D.subarray(b,c));c="";for(d=0;!(d>=a/2);++d){var e=Ha[b+2*d>>1];if(0==e)break;c+=String.fromCharCode(e)}return c}function Ia(b,a,c){void 0===c&&(c=2147483647);if(2>c)return 0;c-=2;var d=a;c=c<2*b.length?c/2:b.length;for(var e=0;e<c;++e)Ha[a>>1]=b.charCodeAt(e),a+=2;Ha[a>>1]=0;return a-d}function Ja(b){return 2*b.length}
function Ka(b,a){for(var c=0,d="";!(c>=a/4);){var e=I[b+4*c>>2];if(0==e)break;++c;65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023)):d+=String.fromCharCode(e)}return d}function La(b,a,c){void 0===c&&(c=2147483647);if(4>c)return 0;var d=a;c=d+c-4;for(var e=0;e<b.length;++e){var f=b.charCodeAt(e);if(55296<=f&&57343>=f){var n=b.charCodeAt(++e);f=65536+((f&1023)<<10)|n&1023}I[a>>2]=f;a+=4;if(a+4>c)break}I[a>>2]=0;return a-d}
function Ma(b){for(var a=0,c=0;c<b.length;++c){var d=b.charCodeAt(c);55296<=d&&57343>=d&&++c;a+=4}return a}var Na,Oa,D,Ha,Ga,I,K,Pa,Qa;function Ra(){var b=za.buffer;Na=b;k.HEAP8=Oa=new Int8Array(b);k.HEAP16=Ha=new Int16Array(b);k.HEAP32=I=new Int32Array(b);k.HEAPU8=D=new Uint8Array(b);k.HEAPU16=Ga=new Uint16Array(b);k.HEAPU32=K=new Uint32Array(b);k.HEAPF32=Pa=new Float32Array(b);k.HEAPF64=Qa=new Float64Array(b)}var Sa,Ta=[],Ua=[],Va=[];function Wa(){var b=k.preRun.shift();Ta.unshift(b)}
var Xa=0,Ya=null,Za=null;k.preloadedImages={};k.preloadedAudios={};function ta(b){if(k.onAbort)k.onAbort(b);b="Aborted("+b+")";xa(b);Aa=!0;b=new WebAssembly.RuntimeError(b+". Build with -s ASSERTIONS=1 for more info.");ba(b);throw b;}function $a(){return L.startsWith("data:application/octet-stream;base64,")}var L;L="canvas_advanced.wasm";if(!$a()){var ab=L;L=k.locateFile?k.locateFile(ab,w):w+ab}
function bb(){var b=L;try{if(b==L&&ya)return new Uint8Array(ya);if(qa)return qa(b);throw"both async and sync fetching of the wasm failed";}catch(a){ta(a)}}
function cb(){if(!ya&&(la||ma)){if("function"===typeof fetch&&!L.startsWith("file://"))return fetch(L,{credentials:"same-origin"}).then(function(b){if(!b.ok)throw"failed to load wasm binary file at '"+L+"'";return b.arrayBuffer()}).catch(function(){return bb()});if(pa)return new Promise(function(b,a){pa(L,function(c){b(new Uint8Array(c))},a)})}return Promise.resolve().then(function(){return bb()})}
function db(b){for(;0<b.length;){var a=b.shift();if("function"==typeof a)a(k);else{var c=a.Cb;"number"===typeof c?void 0===a.za?Sa.get(c)():Sa.get(c)(a.za):c(void 0===a.za?null:a.za)}}}function eb(b){if(void 0===b)return"_unknown";b=b.replace(/[^a-zA-Z0-9_]/g,"$");var a=b.charCodeAt(0);return 48<=a&&57>=a?"_"+b:b}function fb(b,a){b=eb(b);return(new Function("body","return function "+b+'() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(a)}
var N=[{},{value:void 0},{value:null},{value:!0},{value:!1}],gb=[];function hb(b){var a=Error,c=fb(b,function(d){this.name=b;this.message=d;d=Error(d).stack;void 0!==d&&(this.stack=this.toString()+"\n"+d.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(a.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message};return c}var ib=void 0;function P(b){throw new ib(b);}
function jb(b){b||P("Cannot use deleted val. handle = "+b);return N[b].value}function Q(b){switch(b){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:var a=gb.length?gb.pop():N.length;N[a]={Ca:1,value:b};return a}}var kb=void 0,lb=void 0;function R(b){for(var a="";D[b];)a+=lb[D[b++]];return a}var mb=[];function nb(){for(;mb.length;){var b=mb.pop();b.V.ma=!1;b["delete"]()}}var ob=void 0,U={};
function pb(b,a){for(void 0===a&&P("ptr should not be undefined");b.aa;)a=b.pa(a),b=b.aa;return a}var qb={};function rb(b){b=sb(b);var a=R(b);tb(b);return a}function yb(b,a){var c=qb[b];void 0===c&&P(a+" has unknown type "+rb(b));return c}function zb(){}var Ab=!1;function Bb(b){--b.count.value;0===b.count.value&&(b.ba?b.ea.ja(b.ba):b.Y.W.ja(b.X))}
function Cb(b){if("undefined"===typeof FinalizationGroup)return Cb=function(a){return a},b;Ab=new FinalizationGroup(function(a){for(var c=a.next();!c.done;c=a.next())c=c.value,c.X?Bb(c):console.warn("object already deleted: "+c.X)});Cb=function(a){Ab.register(a,a.V,a.V);return a};zb=function(a){Ab.unregister(a.V)};return Cb(b)}var Db={};function Eb(b){for(;b.length;){var a=b.pop();b.pop()(a)}}function Fb(b){return this.fromWireType(K[b>>2])}var Gb={},Hb={},Ib=void 0;
function Jb(b){throw new Ib(b);}function V(b,a,c){function d(g){g=c(g);g.length!==b.length&&Jb("Mismatched type converter count");for(var l=0;l<b.length;++l)Y(b[l],g[l])}b.forEach(function(g){Hb[g]=a});var e=Array(a.length),f=[],n=0;a.forEach(function(g,l){qb.hasOwnProperty(g)?e[l]=qb[g]:(f.push(g),Gb.hasOwnProperty(g)||(Gb[g]=[]),Gb[g].push(function(){e[l]=qb[g];++n;n===f.length&&d(e)}))});0===f.length&&d(e)}
function Kb(b){switch(b){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+b);}}
function Y(b,a,c){c=c||{};if(!("argPackAdvance"in a))throw new TypeError("registerType registeredInstance requires argPackAdvance");var d=a.name;b||P('type "'+d+'" must have a positive integer typeid pointer');if(qb.hasOwnProperty(b)){if(c.ob)return;P("Cannot register type '"+d+"' twice")}qb[b]=a;delete Hb[b];Gb.hasOwnProperty(b)&&(a=Gb[b],delete Gb[b],a.forEach(function(e){e()}))}function Lb(b){P(b.V.Y.W.name+" instance already deleted")}function Mb(){}var Nb={};
function Ob(b,a,c){if(void 0===b[a].Z){var d=b[a];b[a]=function(){b[a].Z.hasOwnProperty(arguments.length)||P("Function '"+c+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+b[a].Z+")!");return b[a].Z[arguments.length].apply(this,arguments)};b[a].Z=[];b[a].Z[d.la]=d}}
function Pb(b,a,c){k.hasOwnProperty(b)?((void 0===c||void 0!==k[b].Z&&void 0!==k[b].Z[c])&&P("Cannot register public name '"+b+"' twice"),Ob(k,b,b),k.hasOwnProperty(c)&&P("Cannot register multiple overloads of a function with the same number of arguments ("+c+")!"),k[b].Z[c]=a):(k[b]=a,void 0!==c&&(k[b].Db=c))}function Qb(b,a,c,d,e,f,n,g){this.name=b;this.constructor=a;this.ha=c;this.ja=d;this.aa=e;this.jb=f;this.pa=n;this.eb=g;this.Qa=[]}
function Rb(b,a,c){for(;a!==c;)a.pa||P("Expected null or instance of "+c.name+", got an instance of "+a.name),b=a.pa(b),a=a.aa;return b}function Sb(b,a){if(null===a)return this.Aa&&P("null is not a valid "+this.name),0;a.V||P('Cannot pass "'+Tb(a)+'" as a '+this.name);a.V.X||P("Cannot pass deleted object as a pointer of type "+this.name);return Rb(a.V.X,a.V.Y.W,this.W)}
function Ub(b,a){if(null===a){this.Aa&&P("null is not a valid "+this.name);if(this.ta){var c=this.Ba();null!==b&&b.push(this.ja,c);return c}return 0}a.V||P('Cannot pass "'+Tb(a)+'" as a '+this.name);a.V.X||P("Cannot pass deleted object as a pointer of type "+this.name);!this.sa&&a.V.Y.sa&&P("Cannot convert argument of type "+(a.V.ea?a.V.ea.name:a.V.Y.name)+" to parameter type "+this.name);c=Rb(a.V.X,a.V.Y.W,this.W);if(this.ta)switch(void 0===a.V.ba&&P("Passing raw pointer to smart pointer is illegal"),
this.Ab){case 0:a.V.ea===this?c=a.V.ba:P("Cannot convert argument of type "+(a.V.ea?a.V.ea.name:a.V.Y.name)+" to parameter type "+this.name);break;case 1:c=a.V.ba;break;case 2:if(a.V.ea===this)c=a.V.ba;else{var d=a.clone();c=this.wb(c,Q(function(){d["delete"]()}));null!==b&&b.push(this.ja,c)}break;default:P("Unsupporting sharing policy")}return c}
function Vb(b,a){if(null===a)return this.Aa&&P("null is not a valid "+this.name),0;a.V||P('Cannot pass "'+Tb(a)+'" as a '+this.name);a.V.X||P("Cannot pass deleted object as a pointer of type "+this.name);a.V.Y.sa&&P("Cannot convert argument of type "+a.V.Y.name+" to parameter type "+this.name);return Rb(a.V.X,a.V.Y.W,this.W)}function Wb(b,a,c){if(a===c)return b;if(void 0===c.aa)return null;b=Wb(b,a,c.aa);return null===b?null:c.eb(b)}function Xb(b,a){a=pb(b,a);return U[a]}
function Yb(b,a){a.Y&&a.X||Jb("makeClassHandle requires ptr and ptrType");!!a.ea!==!!a.ba&&Jb("Both smartPtrType and smartPtr must be specified");a.count={value:1};return Cb(Object.create(b,{V:{value:a}}))}function Zb(b,a,c,d){this.name=b;this.W=a;this.Aa=c;this.sa=d;this.ta=!1;this.ja=this.wb=this.Ba=this.Ra=this.Ab=this.vb=void 0;void 0!==a.aa?this.toWireType=Ub:(this.toWireType=d?Sb:Vb,this.da=null)}
function $b(b,a,c){k.hasOwnProperty(b)||Jb("Replacing nonexistant public symbol");void 0!==k[b].Z&&void 0!==c?k[b].Z[c]=a:(k[b]=a,k[b].la=c)}function bc(b,a){var c=[];return function(){c.length=arguments.length;for(var d=0;d<arguments.length;d++)c[d]=arguments[d];b.includes("j")?(d=k["dynCall_"+b],d=c&&c.length?d.apply(null,[a].concat(c)):d.call(null,a)):d=Sa.get(a).apply(null,c);return d}}
function Z(b,a){b=R(b);var c=b.includes("j")?bc(b,a):Sa.get(a);"function"!==typeof c&&P("unknown function pointer with signature "+b+": "+a);return c}var cc=void 0;function dc(b,a){function c(f){e[f]||qb[f]||(Hb[f]?Hb[f].forEach(c):(d.push(f),e[f]=!0))}var d=[],e={};a.forEach(c);throw new cc(b+": "+d.map(rb).join([", "]));}
function ec(b){var a=Function;if(!(a instanceof Function))throw new TypeError("new_ called with constructor type "+typeof a+" which is not a function");var c=fb(a.name||"unknownFunctionName",function(){});c.prototype=a.prototype;c=new c;b=a.apply(c,b);return b instanceof Object?b:c}
function fc(b,a,c,d,e){var f=a.length;2>f&&P("argTypes array size mismatch! Must at least get return value and 'this' types!");var n=null!==a[1]&&null!==c,g=!1;for(c=1;c<a.length;++c)if(null!==a[c]&&void 0===a[c].da){g=!0;break}var l="void"!==a[0].name,h="",p="";for(c=0;c<f-2;++c)h+=(0!==c?", ":"")+"arg"+c,p+=(0!==c?", ":"")+"arg"+c+"Wired";b="return function "+eb(b)+"("+h+") {\nif (arguments.length !== "+(f-2)+") {\nthrowBindingError('function "+b+" called with ' + arguments.length + ' arguments, expected "+
(f-2)+" args!');\n}\n";g&&(b+="var destructors = [];\n");var t=g?"destructors":"null";h="throwBindingError invoker fn runDestructors retType classParam".split(" ");d=[P,d,e,Eb,a[0],a[1]];n&&(b+="var thisWired = classParam.toWireType("+t+", this);\n");for(c=0;c<f-2;++c)b+="var arg"+c+"Wired = argType"+c+".toWireType("+t+", arg"+c+"); // "+a[c+2].name+"\n",h.push("argType"+c),d.push(a[c+2]);n&&(p="thisWired"+(0<p.length?", ":"")+p);b+=(l?"var rv = ":"")+"invoker(fn"+(0<p.length?", ":"")+p+");\n";if(g)b+=
"runDestructors(destructors);\n";else for(c=n?1:2;c<a.length;++c)f=1===c?"thisWired":"arg"+(c-2)+"Wired",null!==a[c].da&&(b+=f+"_dtor("+f+"); // "+a[c].name+"\n",h.push(f+"_dtor"),d.push(a[c].da));l&&(b+="var ret = retType.fromWireType(rv);\nreturn ret;\n");h.push(b+"}\n");return ec(h).apply(null,d)}function gc(b,a){for(var c=[],d=0;d<b;d++)c.push(I[(a>>2)+d]);return c}
function hc(b,a,c){b instanceof Object||P(c+' with invalid "this": '+b);b instanceof a.W.constructor||P(c+' incompatible with "this" of type '+b.constructor.name);b.V.X||P("cannot call emscripten binding method "+c+" on deleted object");return Rb(b.V.X,b.V.Y.W,a.W)}function ic(b){4<b&&0===--N[b].Ca&&(N[b]=void 0,gb.push(b))}
function jc(b,a,c){switch(a){case 0:return function(d){return this.fromWireType((c?Oa:D)[d])};case 1:return function(d){return this.fromWireType((c?Ha:Ga)[d>>1])};case 2:return function(d){return this.fromWireType((c?I:K)[d>>2])};default:throw new TypeError("Unknown integer type: "+b);}}function Tb(b){if(null===b)return"null";var a=typeof b;return"object"===a||"array"===a||"function"===a?b.toString():""+b}
function kc(b,a){switch(a){case 2:return function(c){return this.fromWireType(Pa[c>>2])};case 3:return function(c){return this.fromWireType(Qa[c>>3])};default:throw new TypeError("Unknown float type: "+b);}}
function lc(b,a,c){switch(a){case 0:return c?function(d){return Oa[d]}:function(d){return D[d]};case 1:return c?function(d){return Ha[d>>1]}:function(d){return Ga[d>>1]};case 2:return c?function(d){return I[d>>2]}:function(d){return K[d>>2]};default:throw new TypeError("Unknown integer type: "+b);}}var mc={};function nc(b){var a=mc[b];return void 0===a?R(b):a}var oc=[];function pc(b){var a=oc.length;oc.push(b);return a}
function qc(b,a){for(var c=Array(b),d=0;d<b;++d)c[d]=yb(I[(a>>2)+d],"parameter "+d);return c}var rc=[],sc=[null,[],[]];ib=k.BindingError=hb("BindingError");k.count_emval_handles=function(){for(var b=0,a=5;a<N.length;++a)void 0!==N[a]&&++b;return b};k.get_first_emval=function(){for(var b=5;b<N.length;++b)if(void 0!==N[b])return N[b];return null};kb=k.PureVirtualError=hb("PureVirtualError");for(var tc=Array(256),uc=0;256>uc;++uc)tc[uc]=String.fromCharCode(uc);lb=tc;k.getInheritedInstanceCount=function(){return Object.keys(U).length};
k.getLiveInheritedInstances=function(){var b=[],a;for(a in U)U.hasOwnProperty(a)&&b.push(U[a]);return b};k.flushPendingDeletes=nb;k.setDelayFunction=function(b){ob=b;mb.length&&ob&&ob(nb)};Ib=k.InternalError=hb("InternalError");Mb.prototype.isAliasOf=function(b){if(!(this instanceof Mb&&b instanceof Mb))return!1;var a=this.V.Y.W,c=this.V.X,d=b.V.Y.W;for(b=b.V.X;a.aa;)c=a.pa(c),a=a.aa;for(;d.aa;)b=d.pa(b),d=d.aa;return a===d&&c===b};
Mb.prototype.clone=function(){this.V.X||Lb(this);if(this.V.oa)return this.V.count.value+=1,this;var b=Cb,a=Object,c=a.create,d=Object.getPrototypeOf(this),e=this.V;b=b(c.call(a,d,{V:{value:{count:e.count,ma:e.ma,oa:e.oa,X:e.X,Y:e.Y,ba:e.ba,ea:e.ea}}}));b.V.count.value+=1;b.V.ma=!1;return b};Mb.prototype["delete"]=function(){this.V.X||Lb(this);this.V.ma&&!this.V.oa&&P("Object already scheduled for deletion");zb(this);Bb(this.V);this.V.oa||(this.V.ba=void 0,this.V.X=void 0)};
Mb.prototype.isDeleted=function(){return!this.V.X};Mb.prototype.deleteLater=function(){this.V.X||Lb(this);this.V.ma&&!this.V.oa&&P("Object already scheduled for deletion");mb.push(this);1===mb.length&&ob&&ob(nb);this.V.ma=!0;return this};Zb.prototype.kb=function(b){this.Ra&&(b=this.Ra(b));return b};Zb.prototype.Ka=function(b){this.ja&&this.ja(b)};Zb.prototype.argPackAdvance=8;Zb.prototype.readValueFromPointer=Fb;Zb.prototype.deleteObject=function(b){if(null!==b)b["delete"]()};
Zb.prototype.fromWireType=function(b){function a(){return this.ta?Yb(this.W.ha,{Y:this.vb,X:c,ea:this,ba:b}):Yb(this.W.ha,{Y:this,X:b})}var c=this.kb(b);if(!c)return this.Ka(b),null;var d=Xb(this.W,c);if(void 0!==d){if(0===d.V.count.value)return d.V.X=c,d.V.ba=b,d.clone();d=d.clone();this.Ka(b);return d}d=this.W.jb(c);d=Nb[d];if(!d)return a.call(this);d=this.sa?d.ab:d.pointerType;var e=Wb(c,this.W,d.W);return null===e?a.call(this):this.ta?Yb(d.W.ha,{Y:d,X:e,ea:this,ba:b}):Yb(d.W.ha,{Y:d,X:e})};
cc=k.UnboundTypeError=hb("UnboundTypeError");
var wc={n:function(b,a,c){b=R(b);a=yb(a,"wrapper");c=jb(c);var d=[].slice,e=a.W,f=e.ha,n=e.aa.ha,g=e.aa.constructor;b=fb(b,function(){e.aa.Qa.forEach(function(h){if(this[h]===n[h])throw new kb("Pure virtual function "+h+" must be implemented in JavaScript");}.bind(this));Object.defineProperty(this,"__parent",{value:f});this.__construct.apply(this,d.call(arguments))});f.__construct=function(){this===f&&P("Pass correct 'this' to __construct");var h=g.implement.apply(void 0,[this].concat(d.call(arguments)));
zb(h);var p=h.V;h.notifyOnDestruction();p.oa=!0;Object.defineProperties(this,{V:{value:p}});Cb(this);h=p.X;h=pb(e,h);U.hasOwnProperty(h)?P("Tried to register registered instance: "+h):U[h]=this};f.__destruct=function(){this===f&&P("Pass correct 'this' to __destruct");zb(this);var h=this.V.X;h=pb(e,h);U.hasOwnProperty(h)?delete U[h]:P("Tried to unregister unregistered instance: "+h)};b.prototype=Object.create(f);for(var l in c)b.prototype[l]=c[l];return Q(b)},G:function(b){var a=Db[b];delete Db[b];
var c=a.Ba,d=a.ja,e=a.Na,f=e.map(function(n){return n.nb}).concat(e.map(function(n){return n.yb}));V([b],f,function(n){var g={};e.forEach(function(l,h){var p=n[h],t=l.lb,r=l.mb,x=n[h+e.length],q=l.xb,F=l.zb;g[l.hb]={read:function(G){return p.fromWireType(t(r,G))},write:function(G,v){var A=[];q(F,G,x.toWireType(A,v));Eb(A)}}});return[{name:a.name,fromWireType:function(l){var h={},p;for(p in g)h[p]=g[p].read(l);d(l);return h},toWireType:function(l,h){for(var p in g)if(!(p in h))throw new TypeError('Missing field:  "'+
p+'"');var t=c();for(p in g)g[p].write(t,h[p]);null!==l&&l.push(d,t);return t},argPackAdvance:8,readValueFromPointer:Fb,da:d}]})},y:function(){},D:function(b,a,c,d,e){var f=Kb(c);a=R(a);Y(b,{name:a,fromWireType:function(n){return!!n},toWireType:function(n,g){return g?d:e},argPackAdvance:8,readValueFromPointer:function(n){if(1===c)var g=Oa;else if(2===c)g=Ha;else if(4===c)g=I;else throw new TypeError("Unknown boolean type size: "+a);return this.fromWireType(g[n>>f])},da:null})},c:function(b,a,c,d,
e,f,n,g,l,h,p,t,r){p=R(p);f=Z(e,f);g&&(g=Z(n,g));h&&(h=Z(l,h));r=Z(t,r);var x=eb(p);Pb(x,function(){dc("Cannot construct "+p+" due to unbound types",[d])});V([b,a,c],d?[d]:[],function(q){q=q[0];if(d){var F=q.W;var G=F.ha}else G=Mb.prototype;q=fb(x,function(){if(Object.getPrototypeOf(this)!==v)throw new ib("Use 'new' to construct "+p);if(void 0===A.ka)throw new ib(p+" has no accessible constructor");var M=A.ka[arguments.length];if(void 0===M)throw new ib("Tried to invoke ctor of "+p+" with invalid number of parameters ("+
arguments.length+") - expected ("+Object.keys(A.ka).toString()+") parameters instead!");return M.apply(this,arguments)});var v=Object.create(G,{constructor:{value:q}});q.prototype=v;var A=new Qb(p,q,v,r,F,f,g,h);F=new Zb(p,A,!0,!1);G=new Zb(p+"*",A,!1,!1);var E=new Zb(p+" const*",A,!1,!0);Nb[b]={pointerType:G,ab:E};$b(x,q);return[F,G,E]})},i:function(b,a,c,d,e,f,n){var g=gc(c,d);a=R(a);f=Z(e,f);V([],[b],function(l){function h(){dc("Cannot call "+p+" due to unbound types",g)}l=l[0];var p=l.name+"."+
a;a.startsWith("@@")&&(a=Symbol[a.substring(2)]);var t=l.W.constructor;void 0===t[a]?(h.la=c-1,t[a]=h):(Ob(t,a,p),t[a].Z[c-1]=h);V([],g,function(r){r=[r[0],null].concat(r.slice(1));r=fc(p,r,null,f,n);void 0===t[a].Z?(r.la=c-1,t[a]=r):t[a].Z[c-1]=r;return[]});return[]})},f:function(b,a,c,d,e,f,n,g){a=R(a);f=Z(e,f);V([],[b],function(l){l=l[0];var h=l.name+"."+a,p={get:function(){dc("Cannot access "+h+" due to unbound types",[c])},enumerable:!0,configurable:!0};p.set=g?function(){dc("Cannot access "+
h+" due to unbound types",[c])}:function(){P(h+" is a read-only property")};Object.defineProperty(l.W.constructor,a,p);V([],[c],function(t){t=t[0];var r={get:function(){return t.fromWireType(f(d))},enumerable:!0};g&&(g=Z(n,g),r.set=function(x){var q=[];g(d,t.toWireType(q,x));Eb(q)});Object.defineProperty(l.W.constructor,a,r);return[]});return[]})},m:function(b,a,c,d,e,f){0<a||ta("Assertion failed: undefined");var n=gc(a,c);e=Z(d,e);V([],[b],function(g){g=g[0];var l="constructor "+g.name;void 0===
g.W.ka&&(g.W.ka=[]);if(void 0!==g.W.ka[a-1])throw new ib("Cannot register multiple constructors with identical number of parameters ("+(a-1)+") for class '"+g.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");g.W.ka[a-1]=function(){dc("Cannot construct "+g.name+" due to unbound types",n)};V([],n,function(h){h.splice(1,0,null);g.W.ka[a-1]=fc(l,h,null,e,f);return[]});return[]})},a:function(b,a,c,d,e,f,n,g){var l=gc(c,d);a=R(a);f=Z(e,f);V([],
[b],function(h){function p(){dc("Cannot call "+t+" due to unbound types",l)}h=h[0];var t=h.name+"."+a;a.startsWith("@@")&&(a=Symbol[a.substring(2)]);g&&h.W.Qa.push(a);var r=h.W.ha,x=r[a];void 0===x||void 0===x.Z&&x.className!==h.name&&x.la===c-2?(p.la=c-2,p.className=h.name,r[a]=p):(Ob(r,a,t),r[a].Z[c-2]=p);V([],l,function(q){q=fc(t,q,h,f,n);void 0===r[a].Z?(q.la=c-2,r[a]=q):r[a].Z[c-2]=q;return[]});return[]})},b:function(b,a,c,d,e,f,n,g,l,h){a=R(a);e=Z(d,e);V([],[b],function(p){p=p[0];var t=p.name+
"."+a,r={get:function(){dc("Cannot access "+t+" due to unbound types",[c,n])},enumerable:!0,configurable:!0};r.set=l?function(){dc("Cannot access "+t+" due to unbound types",[c,n])}:function(){P(t+" is a read-only property")};Object.defineProperty(p.W.ha,a,r);V([],l?[c,n]:[c],function(x){var q=x[0],F={get:function(){var v=hc(this,p,t+" getter");return q.fromWireType(e(f,v))},enumerable:!0};if(l){l=Z(g,l);var G=x[1];F.set=function(v){var A=hc(this,p,t+" setter"),E=[];l(h,A,G.toWireType(E,v));Eb(E)}}Object.defineProperty(p.W.ha,
a,F);return[]});return[]})},C:function(b,a){a=R(a);Y(b,{name:a,fromWireType:function(c){var d=jb(c);ic(c);return d},toWireType:function(c,d){return Q(d)},argPackAdvance:8,readValueFromPointer:Fb,da:null})},k:function(b,a,c,d){function e(){}c=Kb(c);a=R(a);e.values={};Y(b,{name:a,constructor:e,fromWireType:function(f){return this.constructor.values[f]},toWireType:function(f,n){return n.value},argPackAdvance:8,readValueFromPointer:jc(a,c,d),da:null});Pb(a,e)},j:function(b,a,c){var d=yb(b,"enum");a=R(a);
b=d.constructor;d=Object.create(d.constructor.prototype,{value:{value:c},constructor:{value:fb(d.name+"_"+a,function(){})}});b.values[c]=d;b[a]=d},s:function(b,a,c){c=Kb(c);a=R(a);Y(b,{name:a,fromWireType:function(d){return d},toWireType:function(d,e){return e},argPackAdvance:8,readValueFromPointer:kc(a,c),da:null})},J:function(b,a,c,d,e,f){var n=gc(a,c);b=R(b);e=Z(d,e);Pb(b,function(){dc("Cannot call "+b+" due to unbound types",n)},a-1);V([],n,function(g){g=[g[0],null].concat(g.slice(1));$b(b,fc(b,
g,null,e,f),a-1);return[]})},h:function(b,a,c,d,e){function f(h){return h}a=R(a);-1===e&&(e=4294967295);var n=Kb(c);if(0===d){var g=32-8*c;f=function(h){return h<<g>>>g}}var l=a.includes("unsigned");Y(b,{name:a,fromWireType:f,toWireType:function(h,p){if("number"!==typeof p&&"boolean"!==typeof p)throw new TypeError('Cannot convert "'+Tb(p)+'" to '+this.name);if(p<d||p>e)throw new TypeError('Passing a number "'+Tb(p)+'" from JS side to C/C++ side to an argument of type "'+a+'", which is outside the valid range ['+
d+", "+e+"]!");return l?p>>>0:p|0},argPackAdvance:8,readValueFromPointer:lc(a,n,0!==d),da:null})},g:function(b,a,c){function d(f){f>>=2;var n=K;return new e(Na,n[f+1],n[f])}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][a];c=R(c);Y(b,{name:c,fromWireType:d,argPackAdvance:8,readValueFromPointer:d},{ob:!0})},t:function(b,a){a=R(a);var c="std::string"===a;Y(b,{name:a,fromWireType:function(d){var e=K[d>>2];if(c)for(var f=d+4,n=0;n<=e;++n){var g=d+
4+n;if(n==e||0==D[g]){f=f?Ca(D,f,g-f):"";if(void 0===l)var l=f;else l+=String.fromCharCode(0),l+=f;f=g+1}}else{l=Array(e);for(n=0;n<e;++n)l[n]=String.fromCharCode(D[d+4+n]);l=l.join("")}tb(d);return l},toWireType:function(d,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var f="string"===typeof e;f||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int8Array||P("Cannot pass non-string to std::string");var n=(c&&f?function(){for(var h=0,p=0;p<e.length;++p){var t=e.charCodeAt(p);
55296<=t&&57343>=t&&(t=65536+((t&1023)<<10)|e.charCodeAt(++p)&1023);127>=t?++h:h=2047>=t?h+2:65535>=t?h+3:h+4}return h}:function(){return e.length})(),g=vc(4+n+1);K[g>>2]=n;if(c&&f)Da(e,g+4,n+1);else if(f)for(f=0;f<n;++f){var l=e.charCodeAt(f);255<l&&(tb(g),P("String has UTF-16 code units that do not fit in 8 bits"));D[g+4+f]=l}else for(f=0;f<n;++f)D[g+4+f]=e[f];null!==d&&d.push(tb,g);return g},argPackAdvance:8,readValueFromPointer:Fb,da:function(d){tb(d)}})},q:function(b,a,c){c=R(c);if(2===a){var d=
Fa;var e=Ia;var f=Ja;var n=function(){return Ga};var g=1}else 4===a&&(d=Ka,e=La,f=Ma,n=function(){return K},g=2);Y(b,{name:c,fromWireType:function(l){for(var h=K[l>>2],p=n(),t,r=l+4,x=0;x<=h;++x){var q=l+4+x*a;if(x==h||0==p[q>>g])r=d(r,q-r),void 0===t?t=r:(t+=String.fromCharCode(0),t+=r),r=q+a}tb(l);return t},toWireType:function(l,h){"string"!==typeof h&&P("Cannot pass non-string to C++ string type "+c);var p=f(h),t=vc(4+p+a);K[t>>2]=p>>g;e(h,t+4,p+a);null!==l&&l.push(tb,t);return t},argPackAdvance:8,
readValueFromPointer:Fb,da:function(l){tb(l)}})},H:function(b,a,c,d,e,f){Db[b]={name:R(a),Ba:Z(c,d),ja:Z(e,f),Na:[]}},F:function(b,a,c,d,e,f,n,g,l,h){Db[b].Na.push({hb:R(a),nb:c,lb:Z(d,e),mb:f,yb:n,xb:Z(g,l),zb:h})},E:function(b,a){a=R(a);Y(b,{qb:!0,name:a,argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},l:function(b,a,c){b=jb(b);a=yb(a,"emval::as");var d=[],e=Q(d);I[c>>2]=e;return a.toWireType(d,b)},r:function(b,a,c,d,e){b=oc[b];a=jb(a);c=nc(c);var f=[];I[d>>2]=Q(f);return b(a,
c,f,e)},e:function(b,a,c,d){b=oc[b];a=jb(a);c=nc(c);b(a,c,null,d)},I:ic,d:function(b,a){var c=qc(b,a),d=c[0];a=d.name+"_$"+c.slice(1).map(function(p){return p.name}).join("_")+"$";var e=rc[a];if(void 0!==e)return e;e=["retType"];for(var f=[d],n="",g=0;g<b-1;++g)n+=(0!==g?", ":"")+"arg"+g,e.push("argType"+g),f.push(c[1+g]);var l="return function "+eb("methodCaller_"+a)+"(handle, name, destructors, args) {\n",h=0;for(g=0;g<b-1;++g)l+="    var arg"+g+" = argType"+g+".readValueFromPointer(args"+(h?"+"+
h:"")+");\n",h+=c[g+1].argPackAdvance;l+="    var rv = handle[name]("+n+");\n";for(g=0;g<b-1;++g)c[g+1].deleteObject&&(l+="    argType"+g+".deleteObject(arg"+g+");\n");d.qb||(l+="    return retType.toWireType(destructors, rv);\n");e.push(l+"};\n");b=ec(e).apply(null,f);e=pc(b);return rc[a]=e},M:function(b){b=nc(b);return Q(k[b])},v:function(b,a){b=jb(b);a=jb(a);return Q(b[a])},K:function(b){4<b&&(N[b].Ca+=1)},L:function(b){return Q(nc(b))},w:function(b){var a=jb(b);Eb(a);ic(b)},o:function(b,a){b=
yb(b,"_emval_take_value");b=b.readValueFromPointer(a);return Q(b)},u:function(){ta("")},p:function(b){var a=D.length;b>>>=0;if(2147483648<b)return!1;for(var c=1;4>=c;c*=2){var d=a*(1+.2/c);d=Math.min(d,b+100663296);d=Math.max(b,d);0<d%65536&&(d+=65536-d%65536);a:{try{za.grow(Math.min(2147483648,d)-Na.byteLength+65535>>>16);Ra();var e=1;break a}catch(f){}e=void 0}if(e)return!0}return!1},A:function(){return 0},x:function(){},B:function(b,a,c,d){for(var e=0,f=0;f<c;f++){var n=I[a>>2],g=I[a+4>>2];a+=
8;for(var l=0;l<g;l++){var h=D[n+l],p=sc[b];0===h||10===h?((1===b?ua:xa)(Ca(p,0)),p.length=0):p.push(h)}e+=g}I[d>>2]=e;return 0},z:function(){}};
(function(){function b(e){k.asm=e.exports;za=k.asm.N;Ra();Sa=k.asm.T;Ua.unshift(k.asm.O);Xa--;k.monitorRunDependencies&&k.monitorRunDependencies(Xa);0==Xa&&(null!==Ya&&(clearInterval(Ya),Ya=null),Za&&(e=Za,Za=null,e()))}function a(e){b(e.instance)}function c(e){return cb().then(function(f){return WebAssembly.instantiate(f,d)}).then(function(f){return f}).then(e,function(f){xa("failed to asynchronously prepare wasm: "+f);ta(f)})}var d={a:wc};Xa++;k.monitorRunDependencies&&k.monitorRunDependencies(Xa);
if(k.instantiateWasm)try{return k.instantiateWasm(d,b)}catch(e){return xa("Module.instantiateWasm callback failed with error: "+e),!1}(function(){return ya||"function"!==typeof WebAssembly.instantiateStreaming||$a()||L.startsWith("file://")||"function"!==typeof fetch?c(a):fetch(L,{credentials:"same-origin"}).then(function(e){return WebAssembly.instantiateStreaming(e,d).then(a,function(f){xa("wasm streaming compile failed: "+f);xa("falling back to ArrayBuffer instantiation");return c(a)})})})().catch(ba);
return{}})();k.___wasm_call_ctors=function(){return(k.___wasm_call_ctors=k.asm.O).apply(null,arguments)};var tb=k._free=function(){return(tb=k._free=k.asm.P).apply(null,arguments)},vc=k._malloc=function(){return(vc=k._malloc=k.asm.Q).apply(null,arguments)},sb=k.___getTypeName=function(){return(sb=k.___getTypeName=k.asm.R).apply(null,arguments)};k.___embind_register_native_and_builtin_types=function(){return(k.___embind_register_native_and_builtin_types=k.asm.S).apply(null,arguments)};
k.dynCall_jiji=function(){return(k.dynCall_jiji=k.asm.U).apply(null,arguments)};var xc;Za=function yc(){xc||zc();xc||(Za=yc)};
function zc(){function b(){if(!xc&&(xc=!0,k.calledRun=!0,!Aa)){db(Ua);aa(k);if(k.onRuntimeInitialized)k.onRuntimeInitialized();if(k.postRun)for("function"==typeof k.postRun&&(k.postRun=[k.postRun]);k.postRun.length;){var a=k.postRun.shift();Va.unshift(a)}db(Va)}}if(!(0<Xa)){if(k.preRun)for("function"==typeof k.preRun&&(k.preRun=[k.preRun]);k.preRun.length;)Wa();db(Ta);0<Xa||(k.setStatus?(k.setStatus("Running..."),setTimeout(function(){setTimeout(function(){k.setStatus("")},1);b()},1)):b())}}
k.run=zc;if(k.preInit)for("function"==typeof k.preInit&&(k.preInit=[k.preInit]);0<k.preInit.length;)k.preInit.pop()();zc();


  return Rive.ready
}
);
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rive);

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@rive-app/canvas","version":"1.0.47","description":"Rive\'s canvas based web api.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)"],"license":"MIT","files":["rive.js","rive.js.map","rive.wasm","rive.d.ts","rive_advanced.mjs.d.ts"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}');

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fit": () => (/* binding */ Fit),
/* harmony export */   "Alignment": () => (/* binding */ Alignment),
/* harmony export */   "Layout": () => (/* binding */ Layout),
/* harmony export */   "RuntimeLoader": () => (/* binding */ RuntimeLoader),
/* harmony export */   "StateMachineInputType": () => (/* binding */ StateMachineInputType),
/* harmony export */   "StateMachineInput": () => (/* binding */ StateMachineInput),
/* harmony export */   "EventType": () => (/* binding */ EventType),
/* harmony export */   "LoopType": () => (/* binding */ LoopType),
/* harmony export */   "Rive": () => (/* binding */ Rive),
/* harmony export */   "Testing": () => (/* binding */ Testing)
/* harmony export */ });
/* harmony import */ var _rive_advanced_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var package_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


// Tracks playback states; numbers map to the runtime's numerical values
// i.e. play: 0, pause: 1, stop: 2
var PlaybackState;
(function (PlaybackState) {
    PlaybackState[PlaybackState["Play"] = 0] = "Play";
    PlaybackState[PlaybackState["Pause"] = 1] = "Pause";
    PlaybackState[PlaybackState["Stop"] = 2] = "Stop";
})(PlaybackState || (PlaybackState = {}));
// #region layout
// Fit options for the canvas
var Fit;
(function (Fit) {
    Fit["Cover"] = "cover";
    Fit["Contain"] = "contain";
    Fit["Fill"] = "fill";
    Fit["FitWidth"] = "fitWidth";
    Fit["FitHeight"] = "fitHeight";
    Fit["None"] = "none";
    Fit["ScaleDown"] = "scaleDown";
})(Fit || (Fit = {}));
// Alignment options for the canvas
var Alignment;
(function (Alignment) {
    Alignment["Center"] = "center";
    Alignment["TopLeft"] = "topLeft";
    Alignment["TopCenter"] = "topCenter";
    Alignment["TopRight"] = "topRight";
    Alignment["CenterLeft"] = "centerLeft";
    Alignment["CenterRight"] = "centerRight";
    Alignment["BottomLeft"] = "bottomLeft";
    Alignment["BottomCenter"] = "bottomCenter";
    Alignment["BottomRight"] = "bottomRight";
})(Alignment || (Alignment = {}));
// Alignment options for Rive animations in a HTML canvas
var Layout = /** @class */ (function () {
    function Layout(params) {
        var _a, _b, _c, _d, _e, _f;
        this.fit = (_a = params === null || params === void 0 ? void 0 : params.fit) !== null && _a !== void 0 ? _a : Fit.Contain;
        this.alignment = (_b = params === null || params === void 0 ? void 0 : params.alignment) !== null && _b !== void 0 ? _b : Alignment.Center;
        this.minX = (_c = params === null || params === void 0 ? void 0 : params.minX) !== null && _c !== void 0 ? _c : 0;
        this.minY = (_d = params === null || params === void 0 ? void 0 : params.minY) !== null && _d !== void 0 ? _d : 0;
        this.maxX = (_e = params === null || params === void 0 ? void 0 : params.maxX) !== null && _e !== void 0 ? _e : 0;
        this.maxY = (_f = params === null || params === void 0 ? void 0 : params.maxY) !== null && _f !== void 0 ? _f : 0;
    }
    // Alternative constructor to build a Layout from an interface/object
    Layout.new = function (_a) {
        var fit = _a.fit, alignment = _a.alignment, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        console.warn('This function is deprecated: please use `new Layout({})` instead');
        return new Layout({ fit: fit, alignment: alignment, minX: minX, minY: minY, maxX: maxX, maxY: maxY });
    };
    /**
     * Makes a copy of the layout, replacing any specified parameters
     */
    Layout.prototype.copyWith = function (_a) {
        var fit = _a.fit, alignment = _a.alignment, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        return new Layout({
            fit: fit !== null && fit !== void 0 ? fit : this.fit,
            alignment: alignment !== null && alignment !== void 0 ? alignment : this.alignment,
            minX: minX !== null && minX !== void 0 ? minX : this.minX,
            minY: minY !== null && minY !== void 0 ? minY : this.minY,
            maxX: maxX !== null && maxX !== void 0 ? maxX : this.maxX,
            maxY: maxY !== null && maxY !== void 0 ? maxY : this.maxY
        });
    };
    // Returns fit for the Wasm runtime format
    Layout.prototype.runtimeFit = function (rive) {
        if (this.cachedRuntimeFit)
            return this.cachedRuntimeFit;
        var fit;
        if (this.fit === Fit.Cover)
            fit = rive.Fit.cover;
        else if (this.fit === Fit.Contain)
            fit = rive.Fit.contain;
        else if (this.fit === Fit.Fill)
            fit = rive.Fit.fill;
        else if (this.fit === Fit.FitWidth)
            fit = rive.Fit.fitWidth;
        else if (this.fit === Fit.FitHeight)
            fit = rive.Fit.fitHeight;
        else if (this.fit === Fit.ScaleDown)
            fit = rive.Fit.scaleDown;
        else
            fit = rive.Fit.none;
        this.cachedRuntimeFit = fit;
        return fit;
    };
    // Returns alignment for the Wasm runtime format
    Layout.prototype.runtimeAlignment = function (rive) {
        if (this.cachedRuntimeAlignment)
            return this.cachedRuntimeAlignment;
        var alignment;
        if (this.alignment === Alignment.TopLeft)
            alignment = rive.Alignment.topLeft;
        else if (this.alignment === Alignment.TopCenter)
            alignment = rive.Alignment.topCenter;
        else if (this.alignment === Alignment.TopRight)
            alignment = rive.Alignment.topRight;
        else if (this.alignment === Alignment.CenterLeft)
            alignment = rive.Alignment.centerLeft;
        else if (this.alignment === Alignment.CenterRight)
            alignment = rive.Alignment.centerRight;
        else if (this.alignment === Alignment.BottomLeft)
            alignment = rive.Alignment.bottomLeft;
        else if (this.alignment === Alignment.BottomCenter)
            alignment = rive.Alignment.bottomCenter;
        else if (this.alignment === Alignment.BottomRight)
            alignment = rive.Alignment.bottomRight;
        else
            alignment = rive.Alignment.center;
        this.cachedRuntimeAlignment = alignment;
        return alignment;
    };
    return Layout;
}());

// Runtime singleton; use getInstance to provide a callback that returns the
// Rive runtime
var RuntimeLoader = /** @class */ (function () {
    // Class is never instantiated
    function RuntimeLoader() {
    }
    // Loads the runtime
    RuntimeLoader.loadRuntime = function () {
        _rive_advanced_mjs__WEBPACK_IMPORTED_MODULE_0__.default({
            // Loads Wasm bundle
            locateFile: function (_) { return RuntimeLoader.wasmURL; }
        }).then(function (rive) {
            var _a;
            RuntimeLoader.runtime = rive;
            // Fire all the callbacks
            while (RuntimeLoader.callBackQueue.length > 0) {
                (_a = RuntimeLoader.callBackQueue.shift()) === null || _a === void 0 ? void 0 : _a(RuntimeLoader.runtime);
            }
        });
    };
    // Provides a runtime instance via a callback
    RuntimeLoader.getInstance = function (callback) {
        // If it's not loading, start loading runtime
        if (!RuntimeLoader.isLoading) {
            RuntimeLoader.isLoading = true;
            RuntimeLoader.loadRuntime();
        }
        if (!RuntimeLoader.runtime) {
            RuntimeLoader.callBackQueue.push(callback);
        }
        else {
            callback(RuntimeLoader.runtime);
        }
    };
    // Provides a runtime instance via a promise
    RuntimeLoader.awaitInstance = function () {
        return new Promise(function (resolve, reject) {
            return RuntimeLoader.getInstance(function (rive) { return resolve(rive); });
        });
    };
    // Manually sets the wasm url
    RuntimeLoader.setWasmUrl = function (url) {
        RuntimeLoader.wasmURL = url;
    };
    // Flag to indicate that loading has started/completed
    RuntimeLoader.isLoading = false;
    // List of callbacks for the runtime that come in while loading
    RuntimeLoader.callBackQueue = [];
    // Path to the Wasm file; default path works for testing only;
    // if embedded wasm is used then this is never used.
    RuntimeLoader.wasmURL = "https://unpkg.com/" + package_json__WEBPACK_IMPORTED_MODULE_1__.name + "@" + package_json__WEBPACK_IMPORTED_MODULE_1__.version + "/rive.wasm";
    return RuntimeLoader;
}());

// #endregion
// #region animations
// Wraps animations and instances from the runtime and keeps track of playback
// state
var Animation = /** @class */ (function () {
    /**
     * Constructs a new animation
     * @constructor
     * @param {any} animation: runtime animation object
     * @param {any} instance: runtime animation instance object
     */
    function Animation(animation, artboard, runtime, playing) {
        this.animation = animation;
        this.artboard = artboard;
        this.playing = playing;
        this.loopCount = 0;
        // Time to which the animation should move to on the next render
        this.scrubTo = null;
        this.instance = new runtime.LinearAnimationInstance(animation, artboard);
    }
    Object.defineProperty(Animation.prototype, "name", {
        // Returns the animation's name
        get: function () {
            return this.animation.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "time", {
        // Returns the animation's current time
        get: function () {
            return this.instance.time;
        },
        // Sets the animation's current time
        set: function (value) {
            this.instance.time = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "loopValue", {
        // Returns the animation's loop type
        get: function () {
            return this.animation.loopValue;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Advances the animation by the give time. If the animation needs scrubbing,
     * time is ignored and the stored scrub value is used.
     * @param time the time to advance the animation by if no scrubbing required
     */
    Animation.prototype.advance = function (time) {
        if (this.scrubTo === null) {
            this.instance.advance(time);
        }
        else {
            this.instance.time = 0;
            this.instance.advance(this.scrubTo);
            this.scrubTo = null;
        }
    };
    Object.defineProperty(Animation.prototype, "needsScrub", {
        get: function () {
            return this.scrubTo !== null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Deletes the backing Wasm animation instance; once this is called, this
     * animation is no more.
     */
    Animation.prototype.cleanup = function () {
        this.instance.delete();
    };
    return Animation;
}());
// #endregion
// #region state machines
var StateMachineInputType;
(function (StateMachineInputType) {
    StateMachineInputType[StateMachineInputType["Number"] = 56] = "Number";
    StateMachineInputType[StateMachineInputType["Trigger"] = 58] = "Trigger";
    StateMachineInputType[StateMachineInputType["Boolean"] = 59] = "Boolean";
})(StateMachineInputType || (StateMachineInputType = {}));
/**
 * An input for a state machine
 */
var StateMachineInput = /** @class */ (function () {
    function StateMachineInput(type, runtimeInput) {
        this.type = type;
        this.runtimeInput = runtimeInput;
    }
    Object.defineProperty(StateMachineInput.prototype, "name", {
        /**
         * Returns the name of the input
         */
        get: function () {
            return this.runtimeInput.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateMachineInput.prototype, "value", {
        /**
         * Returns the current value of the input
         */
        get: function () {
            return this.runtimeInput.value;
        },
        /**
         * Sets the value of the input
         */
        set: function (value) {
            this.runtimeInput.value = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Fires a trigger; does nothing on Number or Boolean input types
     */
    StateMachineInput.prototype.fire = function () {
        if (this.type === StateMachineInputType.Trigger) {
            this.runtimeInput.fire();
        }
    };
    return StateMachineInput;
}());

var StateMachine = /** @class */ (function () {
    /**
     * @constructor
     * @param stateMachine runtime state machine object
     * @param instance runtime state machine instance object
     */
    function StateMachine(stateMachine, runtime, playing, artboard) {
        this.stateMachine = stateMachine;
        this.playing = playing;
        this.artboard = artboard;
        /**
         * Caches the inputs from the runtime
         */
        this.inputs = [];
        this.instance = new runtime.StateMachineInstance(stateMachine, artboard);
        this.initInputs(runtime);
    }
    Object.defineProperty(StateMachine.prototype, "name", {
        get: function () {
            return this.stateMachine.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateMachine.prototype, "statesChanged", {
        /**
         * Returns a list of state names that have changed on this frame
         */
        get: function () {
            var names = [];
            for (var i = 0; i < this.instance.stateChangedCount(); i++) {
                names.push(this.instance.stateChangedNameByIndex(i));
            }
            return names;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Fetches references to the state machine's inputs and caches them
     * @param runtime an instance of the runtime; needed for the SMIInput types
     */
    StateMachine.prototype.initInputs = function (runtime) {
        // Fetch the inputs from the runtime if we don't have them
        for (var i = 0; i < this.instance.inputCount(); i++) {
            var input = this.instance.input(i);
            this.inputs.push(this.mapRuntimeInput(input, runtime));
        }
    };
    /**
     * Maps a runtime input to it's appropriate type
     * @param input
     */
    StateMachine.prototype.mapRuntimeInput = function (input, runtime) {
        if (input.type === runtime.SMIInput.bool) {
            return new StateMachineInput(StateMachineInputType.Boolean, input.asBool());
        }
        else if (input.type === runtime.SMIInput.number) {
            return new StateMachineInput(StateMachineInputType.Number, input.asNumber());
        }
        else if (input.type === runtime.SMIInput.trigger) {
            return new StateMachineInput(StateMachineInputType.Trigger, input.asTrigger());
        }
    };
    /**
     * Deletes the backing Wasm state machine instance; once this is called, this
     * state machine is no more.
     */
    StateMachine.prototype.cleanup = function () {
        this.instance.delete();
    };
    return StateMachine;
}());
// #endregion
// #region animator
/**
 * Manages animation
 */
var Animator = /** @class */ (function () {
    /**
     * Constructs a new animator
     * @constructor
     * @param runtime Rive runtime; needed to instance animations & state machines
     * @param artboard the artboard that holds all animations and state machines
     * @param animations optional list of animations
     * @param stateMachines optional list of state machines
     */
    function Animator(runtime, artboard, eventManager, animations, stateMachines) {
        if (animations === void 0) { animations = []; }
        if (stateMachines === void 0) { stateMachines = []; }
        this.runtime = runtime;
        this.artboard = artboard;
        this.eventManager = eventManager;
        this.animations = animations;
        this.stateMachines = stateMachines;
    }
    /**
     * Adds animations and state machines by their names. If names are shared
     * between animations & state machines, then the first one found will be
     * created. Best not to use the same names for these in your Rive file.
     * @param animatable the name(s) of animations and state machines to add
     * @returns a list of names of the playing animations and state machines
     */
    Animator.prototype.add = function (animatables, playing, fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        animatables = mapToStringArray(animatables);
        // If animatables is empty, play or pause everything
        if (animatables.length === 0) {
            this.animations.forEach(function (a) { return a.playing = playing; });
            this.stateMachines.forEach(function (m) { return m.playing = playing; });
        }
        else {
            // Play/pause already instanced items, or create new instances
            var instancedAnimationNames = this.animations.map(function (a) { return a.name; });
            var instancedMachineNames = this.stateMachines.map(function (m) { return m.name; });
            for (var i in animatables) {
                var aIndex = instancedAnimationNames.indexOf(animatables[i]);
                var mIndex = instancedMachineNames.indexOf(animatables[i]);
                if (aIndex >= 0 || mIndex >= 0) {
                    if (aIndex >= 0) {
                        // Animation is instanced, play/pause it
                        this.animations[aIndex].playing = playing;
                    }
                    else {
                        // State machine is instanced, play/pause it
                        this.stateMachines[mIndex].playing = playing;
                    }
                }
                else {
                    // Try to create a new animation instance
                    var anim = this.artboard.animationByName(animatables[i]);
                    if (anim) {
                        this.animations.push(new Animation(anim, this.artboard, this.runtime, playing));
                    }
                    else {
                        // Try to create a new state machine instance
                        var sm = this.artboard.stateMachineByName(animatables[i]);
                        if (sm) {
                            this.stateMachines.push(new StateMachine(sm, this.runtime, playing, this.artboard));
                        }
                    }
                }
            }
        }
        // Fire play/paused events for animations
        if (fireEvent) {
            if (playing) {
                this.eventManager.fire({
                    type: EventType.Play,
                    data: this.playing,
                });
            }
            else {
                this.eventManager.fire({
                    type: EventType.Pause,
                    data: this.paused,
                });
            }
        }
        return playing ? this.playing : this.paused;
    };
    /**
     * Play the named animations/state machines
     * @param animatables the names of the animations/machines to play; plays all if empty
     * @returns a list of the playing items
     */
    Animator.prototype.play = function (animatables) {
        return this.add(animatables, true);
    };
    /**
   * Pauses named animations and state machines, or everything if nothing is
   * specified
   * @param animatables names of the animations and state machines to pause
   * @returns a list of names of the animations and state machines paused
   */
    Animator.prototype.pause = function (animatables) {
        return this.add(animatables, false);
    };
    /**
     * Set time of named animations
     * @param animations names of the animations to scrub
     * @param value time scrub value, a floating point number to which the playhead is jumped
     * @returns a list of names of the animations that were scrubbed
     */
    Animator.prototype.scrub = function (animatables, value) {
        var forScrubbing = this.animations.filter(function (a) { return animatables.includes(a.name); });
        forScrubbing.forEach(function (a) { return a.scrubTo = value; });
        return forScrubbing.map(function (a) { return a.name; });
    };
    Object.defineProperty(Animator.prototype, "playing", {
        /**
         * Returns a list of names of all animations and state machines currently
         * playing
         */
        get: function () {
            return this.animations.filter(function (a) { return a.playing; }).map(function (a) { return a.name; }).concat(this.stateMachines.filter(function (m) { return m.playing; }).map(function (m) { return m.name; }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animator.prototype, "paused", {
        /**
         * Returns a list of names of all animations and state machines currently
         * paused
         */
        get: function () {
            return this.animations.filter(function (a) { return !a.playing; }).map(function (a) { return a.name; }).concat(this.stateMachines.filter(function (m) { return !m.playing; }).map(function (m) { return m.name; }));
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Stops and removes all named animations and state machines
     * @param animatables animations and state machines to remove
     * @returns a list of names of removed items
     */
    Animator.prototype.stop = function (animatables) {
        var _this = this;
        animatables = mapToStringArray(animatables);
        // If nothing's specified, wipe them out, all of them
        var removedNames = [];
        // Stop everything
        if (animatables.length === 0) {
            removedNames = this.animations.map(function (a) { return a.name; }).concat(this.stateMachines.map(function (m) { return m.name; }));
            // Clean up before emptying the arrays
            this.animations.forEach(function (a) { return a.cleanup(); });
            this.stateMachines.forEach(function (m) { return m.cleanup(); });
            // Empty out the arrays
            this.animations.splice(0, this.animations.length);
            this.stateMachines.splice(0, this.stateMachines.length);
        }
        else {
            // Remove only the named animations/state machines
            var animationsToRemove = this.animations.filter(function (a) { return animatables.includes(a.name); });
            animationsToRemove.forEach(function (a) {
                a.cleanup();
                _this.animations.splice(_this.animations.indexOf(a), 1);
            });
            var machinesToRemove = this.stateMachines.filter(function (m) { return animatables.includes(m.name); });
            machinesToRemove.forEach(function (m) {
                m.cleanup();
                _this.stateMachines.splice(_this.stateMachines.indexOf(m), 1);
            });
            removedNames = animationsToRemove.map(function (a) { return a.name; }).concat(machinesToRemove.map(function (m) { return m.name; }));
        }
        this.eventManager.fire({
            type: EventType.Stop,
            data: removedNames,
        });
        // Return the list of animations removed
        return removedNames;
    };
    Object.defineProperty(Animator.prototype, "isPlaying", {
        /**
         * Returns true if at least one animation is active
         */
        get: function () {
            return this.animations.reduce(function (acc, curr) { return acc || curr.playing; }, false)
                || this.stateMachines.reduce(function (acc, curr) { return acc || curr.playing; }, false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animator.prototype, "isPaused", {
        /**
         * Returns true if all animations are paused and there's at least one animation
         */
        get: function () {
            return !this.isPlaying &&
                (this.animations.length > 0 || this.stateMachines.length > 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animator.prototype, "isStopped", {
        /**
         * Returns true if there are no playing or paused animations/state machines
         */
        get: function () {
            return this.animations.length === 0 && this.stateMachines.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * If there are no animations or state machines, add the first one found
     * @returns the name of the animation or state machine instanced
     */
    Animator.prototype.atLeastOne = function (playing, fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        var instancedName;
        if (this.animations.length === 0 && this.stateMachines.length === 0) {
            if (this.artboard.animationCount() > 0) {
                // Add the first animation
                this.add([instancedName = this.artboard.animationByIndex(0).name], playing, fireEvent);
            }
            else if (this.artboard.stateMachineCount() > 0) {
                // Add the first state machine
                this.add([instancedName = this.artboard.stateMachineByIndex(0).name], playing, fireEvent);
            }
        }
        return instancedName;
    };
    /**
     * Checks if any animations have looped and if so, fire the appropriate event
     */
    Animator.prototype.handleLooping = function () {
        for (var _i = 0, _a = this.animations.filter(function (a) { return a.playing; }); _i < _a.length; _i++) {
            var animation = _a[_i];
            // Emit if the animation looped
            if (animation.loopValue === 0 && animation.loopCount) {
                animation.loopCount = 0;
                // This is a one-shot; if it has ended, delete the instance
                this.stop(animation.name);
            }
            else if (animation.loopValue === 1 && animation.loopCount) {
                this.eventManager.fire({
                    type: EventType.Loop,
                    data: { animation: animation.name, type: LoopType.Loop }
                });
                animation.loopCount = 0;
            }
            // Wasm indicates a loop at each time the animation
            // changes direction, so a full loop/lap occurs every
            // two loop counts
            else if (animation.loopValue === 2 && animation.loopCount > 1) {
                this.eventManager.fire({
                    type: EventType.Loop,
                    data: { animation: animation.name, type: LoopType.PingPong }
                });
                animation.loopCount = 0;
            }
        }
    };
    /**
     * Checks if states have changed in state machines and fires a statechange
     * event
     */
    Animator.prototype.handleStateChanges = function () {
        var statesChanged = [];
        for (var _i = 0, _a = this.stateMachines.filter(function (sm) { return sm.playing; }); _i < _a.length; _i++) {
            var stateMachine = _a[_i];
            statesChanged.push.apply(statesChanged, stateMachine.statesChanged);
        }
        if (statesChanged.length > 0) {
            this.eventManager.fire({
                type: EventType.StateChange,
                data: statesChanged,
            });
        }
    };
    return Animator;
}());
// #endregion
// #region events
/**
 * Supported event types triggered in Rive
 */
var EventType;
(function (EventType) {
    EventType["Load"] = "load";
    EventType["LoadError"] = "loaderror";
    EventType["Play"] = "play";
    EventType["Pause"] = "pause";
    EventType["Stop"] = "stop";
    EventType["Loop"] = "loop";
    EventType["Draw"] = "draw";
    EventType["StateChange"] = "statechange";
})(EventType || (EventType = {}));
/**
 * Looping types: one-shot, loop, and ping-pong
 */
var LoopType;
(function (LoopType) {
    LoopType["OneShot"] = "oneshot";
    LoopType["Loop"] = "loop";
    LoopType["PingPong"] = "pingpong"; // has value 2 in runtime
})(LoopType || (LoopType = {}));
// Manages Rive events and listeners
var EventManager = /** @class */ (function () {
    function EventManager(listeners) {
        if (listeners === void 0) { listeners = []; }
        this.listeners = listeners;
    }
    // Gets listeners of specified type
    EventManager.prototype.getListeners = function (type) {
        return this.listeners.filter(function (e) { return e.type === type; });
    };
    // Adds a listener
    EventManager.prototype.add = function (listener) {
        if (!this.listeners.includes(listener)) {
            this.listeners.push(listener);
        }
    };
    /**
     * Removes a listener
     * @param listener the listener with the callback to be removed
     */
    EventManager.prototype.remove = function (listener) {
        // We can't simply look for the listener as it'll be a different instance to
        // one originally subscribed. Find all the listeners of the right type and
        // then check their callbacks which should match.
        for (var i = 0; i < this.listeners.length; i++) {
            var currentListener = this.listeners[i];
            if (currentListener.type === listener.type) {
                if (currentListener.callback === listener.callback) {
                    this.listeners.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * Clears all listeners of specified type, or every listener if no type is
     * specified
     * @param type the type of listeners to clear, or all listeners if not
     * specified
     */
    EventManager.prototype.removeAll = function (type) {
        var _this = this;
        if (!type) {
            this.listeners.splice(0, this.listeners.length);
        }
        else {
            this.listeners
                .filter(function (l) { return l.type === type; })
                .forEach(function (l) { return _this.remove(l); });
        }
    };
    // Fires an event
    EventManager.prototype.fire = function (event) {
        var eventListeners = this.getListeners(event.type);
        eventListeners.forEach(function (listener) { return listener.callback(event); });
    };
    return EventManager;
}());
// Manages a queue of tasks
var TaskQueueManager = /** @class */ (function () {
    function TaskQueueManager(eventManager) {
        this.eventManager = eventManager;
        this.queue = [];
    }
    // Adds a task top the queue
    TaskQueueManager.prototype.add = function (task) {
        this.queue.push(task);
    };
    // Processes all tasks in the queue
    TaskQueueManager.prototype.process = function () {
        while (this.queue.length > 0) {
            var task = this.queue.shift();
            task === null || task === void 0 ? void 0 : task.action();
            if (task === null || task === void 0 ? void 0 : task.event) {
                this.eventManager.fire(task.event);
            }
        }
    };
    return TaskQueueManager;
}());
var Rive = /** @class */ (function () {
    function Rive(params) {
        var _a;
        // Flag to indicate if the layout has changed; used by the renderer to know
        // when to align
        this._updateLayout = true;
        /**
         * Flag to active/deactivate renderer
         */
        this.isRendererActive = true;
        // Tracks if a Rive file is loaded
        this.loaded = false;
        /**
         * Tracks if a Rive file is loaded; we need this in addition to loaded as some
         * commands (e.g. contents) can be called as soon as the file is loaded.
         * However, playback commands need to be queued and run in order once initial
         * animations and autoplay has been sorted out. This applies to play, pause,
         * and start.
         */
        this.readyForPlaying = false;
        // Runtime artboard
        this.artboard = null;
        // Durations to generate a frame for the last second. Used for performance profiling.
        this.durations = [];
        this.frameTimes = [];
        this.frameCount = 0;
        /**
         * Used be draw to track when a second of active rendering time has passed. Used for debugging purposes
         */
        this.renderSecondTimer = 0;
        this.canvas = params.canvas;
        this.src = params.src;
        this.buffer = params.buffer;
        this.layout = (_a = params.layout) !== null && _a !== void 0 ? _a : new Layout();
        // New event management system
        this.eventManager = new EventManager();
        if (params.onLoad)
            this.on(EventType.Load, params.onLoad);
        if (params.onLoadError)
            this.on(EventType.LoadError, params.onLoadError);
        if (params.onPlay)
            this.on(EventType.Play, params.onPlay);
        if (params.onPause)
            this.on(EventType.Pause, params.onPause);
        if (params.onStop)
            this.on(EventType.Stop, params.onStop);
        if (params.onLoop)
            this.on(EventType.Loop, params.onLoop);
        if (params.onStateChange)
            this.on(EventType.StateChange, params.onStateChange);
        /**
         * @deprecated Use camelCase'd versions instead.
         */
        if (params.onload && !params.onLoad)
            this.on(EventType.Load, params.onload);
        if (params.onloaderror && !params.onLoadError)
            this.on(EventType.LoadError, params.onloaderror);
        if (params.onplay && !params.onPlay)
            this.on(EventType.Play, params.onplay);
        if (params.onpause && !params.onPause)
            this.on(EventType.Pause, params.onpause);
        if (params.onstop && !params.onStop)
            this.on(EventType.Stop, params.onstop);
        if (params.onloop && !params.onLoop)
            this.on(EventType.Loop, params.onloop);
        if (params.onstatechange && !params.onStateChange)
            this.on(EventType.StateChange, params.onstatechange);
        // Hook up the task queue
        this.taskQueue = new TaskQueueManager(this.eventManager);
        this.init({
            src: this.src,
            buffer: this.buffer,
            autoplay: params.autoplay,
            animations: params.animations,
            stateMachines: params.stateMachines,
            artboard: params.artboard,
            useOffscreenRenderer: params.useOffscreenRenderer,
        });
    }
    // Alternative constructor to build a Rive instance from an interface/object
    Rive.new = function (params) {
        console.warn('This function is deprecated: please use `new Rive({})` instead');
        return new Rive(params);
    };
    // Initializes the Rive object either from constructor or load()
    Rive.prototype.init = function (_a) {
        var _this = this;
        var src = _a.src, buffer = _a.buffer, animations = _a.animations, stateMachines = _a.stateMachines, artboard = _a.artboard, _b = _a.autoplay, autoplay = _b === void 0 ? false : _b, _c = _a.useOffscreenRenderer, useOffscreenRenderer = _c === void 0 ? false : _c;
        this.src = src;
        this.buffer = buffer;
        // If no source file url specified, it's a bust
        if (!this.src && !this.buffer) {
            throw new Error(Rive.missingErrorMessage);
        }
        // List of animations that should be initialized.
        var startingAnimationNames = mapToStringArray(animations);
        // List of state machines that should be initialized
        var startingStateMachineNames = mapToStringArray(stateMachines);
        // Ensure loaded is marked as false if loading new file
        this.loaded = false;
        this.readyForPlaying = false;
        // Ensure the runtime is loaded
        RuntimeLoader.awaitInstance().then(function (runtime) {
            _this.runtime = runtime;
            // Get the canvas where you want to render the animation and create a renderer
            _this.renderer = _this.runtime.makeRenderer(_this.canvas, useOffscreenRenderer);
            // Initial size adjustment based on devicePixelRatio if no width/height are specified explicitly
            if (!(_this.canvas.width || _this.canvas.height)) {
                _this.resizeDrawingSurfaceToCanvas();
            }
            // Load Rive data from a source uri or a data buffer
            _this.initData(artboard, startingAnimationNames, startingStateMachineNames, autoplay).catch(function (e) {
                console.error(e);
            });
        }).catch(function (e) {
            console.error(e);
        });
    };
    // Initializes runtime with Rive data and preps for playing
    Rive.prototype.initData = function (artboardName, animationNames, stateMachineNames, autoplay) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, msg;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.src) return [3 /*break*/, 2];
                        _b = this;
                        return [4 /*yield*/, loadRiveFile(this.src)];
                    case 1:
                        _b.buffer = _d.sent();
                        _d.label = 2;
                    case 2:
                        // Load the Rive file
                        _c = this;
                        return [4 /*yield*/, this.runtime.load(new Uint8Array(this.buffer))];
                    case 3:
                        // Load the Rive file
                        _c.file = _d.sent();
                        if (this.file) {
                            // Initialize and draw frame
                            this.initArtboard(artboardName, animationNames, stateMachineNames, autoplay);
                            // Everything's set up, emit a load event
                            this.loaded = true;
                            this.eventManager.fire({
                                type: EventType.Load,
                                data: (_a = this.src) !== null && _a !== void 0 ? _a : 'buffer'
                            });
                            // Flag ready for playback commands and clear the task queue; this order
                            // is important or it may infinitely recurse
                            this.readyForPlaying = true;
                            this.taskQueue.process();
                            this.drawFrame();
                            return [2 /*return*/, Promise.resolve()];
                        }
                        else {
                            msg = 'Problem loading file; may be corrupt!';
                            console.warn(msg);
                            this.eventManager.fire({ type: EventType.LoadError, data: msg });
                            return [2 /*return*/, Promise.reject(msg)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Initialize for playback
    Rive.prototype.initArtboard = function (artboardName, animationNames, stateMachineNames, autoplay) {
        // Fetch the artboard
        var rootArtboard = artboardName ?
            this.file.artboardByName(artboardName) :
            this.file.defaultArtboard();
        // Check we have a working artboard
        if (!rootArtboard) {
            var msg = 'Invalid artboard name or no default artboard';
            console.warn(msg);
            this.eventManager.fire({ type: EventType.LoadError, data: msg });
            return;
        }
        // Instance the artboard
        this.artboard = rootArtboard.instance();
        // Check that the artboard has at least 1 animation
        if (this.artboard.animationCount() < 1) {
            var msg = 'Artboard has no animations';
            this.eventManager.fire({ type: EventType.LoadError, data: msg });
            throw msg;
        }
        // Initialize the animator
        this.animator = new Animator(this.runtime, this.artboard, this.eventManager);
        // Initialize the animations; as loaded hasn't happened yet, we need to
        // suppress firing the play/pause events until the load event has fired. To
        // do this we tell the animator to suppress firing events, and add event
        // firing to the task queue.
        var instanceNames;
        if (animationNames.length > 0 || stateMachineNames.length > 0) {
            instanceNames = animationNames.concat(stateMachineNames);
            this.animator.add(instanceNames, autoplay, false);
        }
        else {
            instanceNames = [this.animator.atLeastOne(autoplay, false)];
        }
        // Queue up firing the playback events
        this.taskQueue.add({
            action: function () { },
            event: {
                type: autoplay ? EventType.Play : EventType.Pause,
                data: instanceNames,
            }
        });
    };
    // Draws the current artboard frame
    Rive.prototype.drawFrame = function () {
        this.startRendering();
    };
    /**
     * Draw rendering loop; renders animation frames at the correct time interval.
     * @param time the time at which to render a frame
     */
    Rive.prototype.draw = function (time, onSecond) {
        var before = performance.now();
        // Clear the frameRequestId, as we're now rendering a fresh frame
        this.frameRequestId = null;
        // On the first pass, make sure lastTime has a valid value
        if (!this.lastRenderTime) {
            this.lastRenderTime = time;
        }
        // Handle the onSecond callback
        this.renderSecondTimer += (time - this.lastRenderTime);
        if (this.renderSecondTimer > 5000) {
            this.renderSecondTimer = 0;
            onSecond === null || onSecond === void 0 ? void 0 : onSecond();
        }
        // Calculate the elapsed time between frames in seconds
        var elapsedTime = (time - this.lastRenderTime) / 1000;
        this.lastRenderTime = time;
        // Advance non-paused animations by the elapsed number of seconds
        // Also advance any animations that require scrubbing
        var activeAnimations = this.animator.animations.filter(function (a) { return a.playing || a.needsScrub; })
            // The scrubbed animations must be applied first to prevent weird artifacts
            // if the playing animations conflict with the scrubbed animating attribuates.
            .sort(function (first, second) { return first.needsScrub ? -1 : 1; });
        for (var _i = 0, activeAnimations_1 = activeAnimations; _i < activeAnimations_1.length; _i++) {
            var animation = activeAnimations_1[_i];
            animation.advance(elapsedTime);
            if (animation.instance.didLoop) {
                animation.loopCount += 1;
            }
            animation.instance.apply(1.0);
        }
        // Advance non-paused state machines by the elapsed number of seconds
        var activeStateMachines = this.animator.stateMachines.filter(function (a) { return a.playing; });
        for (var _a = 0, activeStateMachines_1 = activeStateMachines; _a < activeStateMachines_1.length; _a++) {
            var stateMachine = activeStateMachines_1[_a];
            stateMachine.instance.advance(elapsedTime);
            // stateMachine.instance.apply(this.artboard);
        }
        // Once the animations have been applied to the artboard, advance it
        // by the elapsed time.
        this.artboard.advance(elapsedTime);
        var renderer = this.renderer;
        // Canvas must be wiped to prevent artifacts
        renderer.clear();
        renderer.save();
        // Update the renderer alignment if necessary
        this.alignRenderer();
        this.artboard.draw(renderer);
        renderer.restore();
        renderer.flush();
        // Check for any animations that looped
        this.animator.handleLooping();
        // Check for any state machines that had a state change
        this.animator.handleStateChanges();
        // Add duration to create frame to durations array
        this.frameCount++;
        var after = performance.now();
        this.frameTimes.push(after);
        this.durations.push(after - before);
        while (this.frameTimes[0] <= after - 1000) {
            this.frameTimes.shift();
            this.durations.shift();
        }
        // Calling requestAnimationFrame will rerun draw() at the correct rate:
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
        if (this.animator.isPlaying) {
            // Request a new rendering frame
            this.startRendering();
        }
        else if (this.animator.isPaused) {
            // Reset the end time so on playback it starts at the correct frame
            this.lastRenderTime = 0;
        }
        else if (this.animator.isStopped) {
            // Reset animation instances, artboard and time
            // TODO: implement this properly when we have instancing
            // this.initArtboard();
            // this.drawFrame();
            this.lastRenderTime = 0;
        }
    };
    /**
     * Align the renderer
     */
    Rive.prototype.alignRenderer = function () {
        var _a = this, renderer = _a.renderer, runtime = _a.runtime, _layout = _a._layout, artboard = _a.artboard;
        // Align things up safe in the knowledge we can restore if changed
        renderer.align(_layout.runtimeFit(runtime), _layout.runtimeAlignment(runtime), {
            minX: _layout.minX,
            minY: _layout.minY,
            maxX: _layout.maxX,
            maxY: _layout.maxY
        }, artboard.bounds);
    };
    Object.defineProperty(Rive.prototype, "fps", {
        get: function () {
            return this.durations.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "frameTime", {
        get: function () {
            if (this.durations.length === 0) {
                return 0;
            }
            return (this.durations.reduce(function (a, b) { return a + b; }, 0) / this.durations.length).toFixed(4);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Cleans up any Wasm-generated objects that need to be manually destroyed:
     * artboard instances, animation instances, state machine instances.
     *
     * Once this is called, things will need to be reinitialized or bad things
     * might happen.
     */
    Rive.prototype.cleanup = function () {
        this.artboard.delete();
        // TODO: delete animation and state machine instances
    };
    // Plays specified animations; if none specified, it unpauses everything.
    Rive.prototype.play = function (animationNames, autoplay) {
        var _this = this;
        animationNames = mapToStringArray(animationNames);
        // If the file's not loaded, queue up the play
        if (!this.readyForPlaying) {
            this.taskQueue.add({
                action: function () { return _this.play(animationNames, autoplay); },
            });
            return;
        }
        this.animator.play(animationNames);
        this.startRendering();
    };
    // Pauses specified animations; if none specified, pauses all.
    Rive.prototype.pause = function (animationNames) {
        var _this = this;
        animationNames = mapToStringArray(animationNames);
        // If the file's not loaded, early out, nothing to pause
        if (!this.readyForPlaying) {
            this.taskQueue.add({
                action: function () { return _this.pause(animationNames); },
            });
            return;
        }
        this.animator.pause(animationNames);
    };
    Rive.prototype.scrub = function (animationNames, value) {
        var _this = this;
        animationNames = mapToStringArray(animationNames);
        // If the file's not loaded, early out, nothing to pause
        if (!this.readyForPlaying) {
            this.taskQueue.add({
                action: function () { return _this.scrub(animationNames, value); },
            });
            return;
        }
        // Scrub the animation time; we draw a single frame here so that if
        // nothing's currently playing, the scrubbed animation is still rendered/
        this.animator.scrub(animationNames, value || 0);
        this.drawFrame();
    };
    // Stops specified animations; if none specifies, stops them all.
    Rive.prototype.stop = function (animationNames) {
        var _this = this;
        animationNames = mapToStringArray(animationNames);
        // If the file's not loaded, early out, nothing to pause
        if (!this.readyForPlaying) {
            this.taskQueue.add({
                action: function () { return _this.stop(animationNames); },
            });
            return;
        }
        this.animator.stop(animationNames);
    };
    /**
     * Resets the animation
     * @param artboard the name of the artboard, or default if none given
     * @param animations the names of animations for playback
     * @param stateMachines the names of state machines for playback
     * @param autoplay whether to autoplay when reset, defaults to false
     *
     */
    Rive.prototype.reset = function (params) {
        var _a;
        // Get the current artboard, animations, state machines, and playback states
        var artBoardName = params === null || params === void 0 ? void 0 : params.artboard;
        var animationNames = mapToStringArray(params === null || params === void 0 ? void 0 : params.animations);
        var stateMachineNames = mapToStringArray(params === null || params === void 0 ? void 0 : params.stateMachines);
        var autoplay = (_a = params === null || params === void 0 ? void 0 : params.autoplay) !== null && _a !== void 0 ? _a : false;
        // Stop everything and clean up
        this.stop();
        this.cleanup();
        // Reinitialize an artboard instance with the state
        this.initArtboard(artBoardName, animationNames, stateMachineNames, autoplay);
    };
    // Loads a new Rive file, keeping listeners in place
    Rive.prototype.load = function (params) {
        // Stop all animations
        this.stop();
        // Reinitialize
        this.init(params);
    };
    Object.defineProperty(Rive.prototype, "layout", {
        /**
         * Returns the current layout. Note that layout should be treated as
         * immutable. If you want to change the layout, create a new one use the
         * layout setter
         */
        get: function () {
            return this._layout;
        },
        // Sets a new layout
        set: function (layout) {
            this._layout = layout;
            // If the maxX or maxY are 0, then set them to the canvas width and height
            if (!layout.maxX || !layout.maxY) {
                this.resizeToCanvas();
            }
            if (this.loaded && !this.animator.isPlaying) {
                this.drawFrame();
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets the layout bounds to the current canvas size; this is typically called
     * when the canvas is resized
     */
    Rive.prototype.resizeToCanvas = function () {
        this._layout = this.layout.copyWith({
            minX: 0,
            minY: 0,
            maxX: this.canvas.width,
            maxY: this.canvas.height
        });
    };
    /**
     * Accounts for devicePixelRatio as a multiplier to render the size of the canvas drawing surface.
     * Uses the size of the backing canvas to set new width/height attributes. Need to re-render
     * and resize the layout to match the new drawing surface afterwards. Useful function for consumers
     * to include in a window resize listener
     */
    Rive.prototype.resizeDrawingSurfaceToCanvas = function () {
        if (this.canvas instanceof HTMLCanvasElement && !!window) {
            var _a = this.canvas.getBoundingClientRect(), width = _a.width, height = _a.height;
            var dpr = window.devicePixelRatio || 1;
            this.canvas.width = dpr * width;
            this.canvas.height = dpr * height;
            this.startRendering();
            this.resizeToCanvas();
        }
    };
    Object.defineProperty(Rive.prototype, "source", {
        // Returns the animation source, which may be undefined
        get: function () {
            return this.src;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "activeArtboard", {
        /**
         * Returns the name of the active artboard
         */
        get: function () {
            return this.artboard.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "animationNames", {
        // Returns a list of animation names on the chosen artboard
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded) {
                return [];
            }
            var animationNames = [];
            for (var i = 0; i < this.artboard.animationCount(); i++) {
                animationNames.push(this.artboard.animationByIndex(i).name);
            }
            return animationNames;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "stateMachineNames", {
        /**
         * Returns a list of state machine names from the current artboard
         */
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded) {
                return [];
            }
            var stateMachineNames = [];
            for (var i = 0; i < this.artboard.stateMachineCount(); i++) {
                stateMachineNames.push(this.artboard.stateMachineByIndex(i).name);
            }
            return stateMachineNames;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the inputs for the specified instanced state machine, or an empty
     * list if the name is invalid or the state machine is not instanced
     * @param name the state machine name
     * @returns the inputs for the named state machine
     */
    Rive.prototype.stateMachineInputs = function (name) {
        // If the file's not loaded, early out, nothing to pause
        if (!this.loaded) {
            return;
        }
        var stateMachine = this.animator.stateMachines.find(function (m) { return m.name === name; });
        return stateMachine === null || stateMachine === void 0 ? void 0 : stateMachine.inputs;
    };
    Object.defineProperty(Rive.prototype, "playingStateMachineNames", {
        // Returns a list of playing machine names
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded) {
                return [];
            }
            return this.animator.stateMachines
                .filter(function (m) { return m.playing; })
                .map(function (m) { return m.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "playingAnimationNames", {
        // Returns a list of playing animation names
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded) {
                return [];
            }
            return this.animator.animations
                .filter(function (a) { return a.playing; })
                .map(function (a) { return a.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "pausedAnimationNames", {
        // Returns a list of paused animation names
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded) {
                return [];
            }
            return this.animator.animations
                .filter(function (a) { return !a.playing; })
                .map(function (a) { return a.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "pausedStateMachineNames", {
        /**
         *  Returns a list of paused machine names
         * @returns a list of state machine names that are paused
         */
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded) {
                return [];
            }
            return this.animator.stateMachines
                .filter(function (m) { return !m.playing; })
                .map(function (m) { return m.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "isPlaying", {
        /**
         * @returns true if any animation is playing
         */
        get: function () {
            return this.animator.isPlaying;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "isPaused", {
        /**
         * @returns true if all instanced animations are paused
         */
        get: function () {
            return this.animator.isPaused;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "isStopped", {
        /**
         * @returns true if no animations are playing or paused
         */
        get: function () {
            return this.animator.isStopped;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "bounds", {
        /**
         * @returns the bounds of the current artboard, or undefined if the artboard
         * isn't loaded yet.
         */
        get: function () {
            return this.artboard ? this.artboard.bounds : undefined;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Subscribe to Rive-generated events
     * @param type the type of event to subscribe to
     * @param callback callback to fire when the event occurs
     */
    Rive.prototype.on = function (type, callback) {
        this.eventManager.add({
            type: type,
            callback: callback,
        });
    };
    /**
     * Unsubscribes from a Rive-generated event
     * @param callback the callback to unsubscribe from
     */
    Rive.prototype.unsubscribe = function (type, callback) {
        this.eventManager.remove({
            type: type,
            callback: callback,
        });
    };
    /**
     * Unsubscribes all listeners from an event type, or everything if no type is
     * given
     * @param type the type of event to unsubscribe from, or all types if
     * undefined
     */
    Rive.prototype.unsubscribeAll = function (type) {
        this.eventManager.removeAll(type);
    };
    /**
     * Stops the rendering loop; this is different from pausing in that it doesn't
     * change the state of any animation. It stops rendering from occurring. This
     * is designed for situations such as when Rive isn't visible.
     *
     * The only way to start rendering again is to call `startRendering`.
     * Animations that are marked as playing will start from the position that
     * they would have been at if rendering had not been stopped.
     */
    Rive.prototype.stopRendering = function () {
        if (this.loaded && this.frameRequestId) {
            if (this.runtime.cancelAnimationFrame) {
                this.runtime.cancelAnimationFrame(this.frameRequestId);
            }
            else {
                cancelAnimationFrame(this.frameRequestId);
            }
            this.frameRequestId = null;
        }
    };
    /**
     * Starts the rendering loop if it has been previously stopped. If the
     * renderer is already active, then this will have zero effect.
     */
    Rive.prototype.startRendering = function () {
        if (this.loaded && !this.frameRequestId) {
            if (this.runtime.requestAnimationFrame) {
                this.frameRequestId = this.runtime.requestAnimationFrame(this.draw.bind(this));
            }
            else {
                this.frameRequestId = requestAnimationFrame(this.draw.bind(this));
            }
        }
    };
    /**
     * Enables frames-per-second (FPS) reporting for the runtime
     * If no callback is provided, Rive will append a fixed-position div at the top-right corner of the page with the FPS reading
     * @param fpsCallback - Callback from the runtime during the RAF loop that supplies the FPS value
     */
    Rive.prototype.enableFPSCounter = function (fpsCallback) {
        this.runtime.enableFPSCounter(fpsCallback);
    };
    /**
     * Disables frames-per-second (FPS) reporting for the runtime
     */
    Rive.prototype.disableFPSCounter = function () {
        this.runtime.disableFPSCounter();
    };
    Object.defineProperty(Rive.prototype, "contents", {
        /**
         * Returns the contents of a Rive file: the artboards, animations, and state machines
         */
        get: function () {
            if (!this.loaded) {
                return undefined;
            }
            var riveContents = {
                artboards: [],
            };
            for (var i = 0; i < this.file.artboardCount(); i++) {
                var artboard = this.file.artboardByIndex(i);
                var artboardContents = {
                    name: artboard.name,
                    animations: [],
                    stateMachines: [],
                };
                for (var j = 0; j < artboard.animationCount(); j++) {
                    var animation = artboard.animationByIndex(j);
                    artboardContents.animations.push(animation.name);
                }
                for (var k = 0; k < artboard.stateMachineCount(); k++) {
                    var stateMachine = artboard.stateMachineByIndex(k);
                    var name_1 = stateMachine.name;
                    var instance = new this.runtime.StateMachineInstance(stateMachine, artboard);
                    var inputContents = [];
                    for (var l = 0; l < instance.inputCount(); l++) {
                        var input = instance.input(l);
                        inputContents.push({ name: input.name, type: input.type });
                    }
                    artboardContents.stateMachines.push({ name: name_1, inputs: inputContents });
                }
                riveContents.artboards.push(artboardContents);
            }
            return riveContents;
        },
        enumerable: false,
        configurable: true
    });
    // Error message for missing source or buffer
    Rive.missingErrorMessage = 'Rive source file or data buffer required';
    return Rive;
}());

// Loads Rive data from a URI via fetch.
var loadRiveFile = function (src) { return __awaiter(void 0, void 0, void 0, function () {
    var req, res, buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = new Request(src);
                return [4 /*yield*/, fetch(req)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.arrayBuffer()];
            case 2:
                buffer = _a.sent();
                return [2 /*return*/, buffer];
        }
    });
}); };
// #endregion
// #region utility functions
/*
 * Utility function to ensure an object is a string array
 */
var mapToStringArray = function (obj) {
    if (typeof obj === 'string') {
        return [obj];
    }
    else if (obj instanceof Array) {
        return obj;
    }
    // If obj is undefined, return empty array
    return [];
};
// #endregion
// #region testing utilities
// Exports to only be used for tests
var Testing = {
    EventManager: EventManager,
    TaskQueueManager: TaskQueueManager,
};
// #endregion

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=rive.js.map