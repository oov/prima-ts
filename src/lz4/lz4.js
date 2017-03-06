!function(r,f){"object"==typeof exports&&"object"==typeof module?module.exports=f():"function"==typeof define&&define.amd?define([],f):"object"==typeof exports?exports.LZ4=f():r.LZ4=f()}(this,function(){return function(r){function f(t){if(o[t])return o[t].exports;var i=o[t]={exports:{},id:t,loaded:!1};return r[t].call(i.exports,i,i.exports,f),i.loaded=!0,i.exports}var o={};return f.m=r,f.c=o,f.p="",f(0)}([function(r,f){
// lz4-ts @license BSD-3-Clause / Copyright (c) 2015, Pierre Curto / 2016, oov. All rights reserved.
"use strict";function o(r,f){var o=r>>>16&65535,t=65535&r,i=f>>>16&65535,e=65535&f;return t*e+(o*e+t*i<<16>>>0)|0}function t(r,f){return r[f+3]|r[f+2]<<8|r[f+1]<<16|r[f]<<24}function i(r,f,o,t,i){for(var e=0;e<i;++e)r[o++]=f[t++]}function e(r){var f=r.length;if(0===f)return 0;for(var o=0,t=0;;){var i=r[o]>>4,e=15&r[o];if(++o===f)throw u;if(i>0){if(15===i){for(;255===r[o];)if(i+=255,++o===f)throw u;if(i+=r[o],++o===f)throw u}if(t+=i,o+=i,o>=f)return t}if(o+=2,o>=f)throw u;var n=r[o-2]|r[o-1]<<8;if(t-n<0||0===n)throw u;if(15===e){for(;255===r[o];)if(e+=255,++o===f)throw u;if(e+=r[o],++o===f)throw u}for(e+=4;e>=n;e-=n)t+=n;t+=e}}function n(r,f){var o=r.length,t=f.length;if(0===o)return 0;for(var e=0,n=0;;){var h=r[e]>>4,a=15&r[e];if(++e===o)throw u;if(h>0){if(15===h){for(;255===r[e];)if(h+=255,++e===o)throw u;if(h+=r[e],++e===o)throw u}if(t-n<h||e+h>o)throw v;if(i(f,r,n,e,h),n+=h,e+=h,e>=o)return n}if(e+=2,e>=o)throw u;var w=r[e-2]|r[e-1]<<8;if(n-w<0||0===w)throw u;if(15===a){for(;255===r[e];)if(a+=255,++e===o)throw u;if(a+=r[e],++e===o)throw u}if(a+=4,t-n<=a)throw v;for(;a>=w;a-=w)i(f,f,n,n-w,w),n+=w;i(f,f,n,n-w,a),n+=a}}function h(r){return r+(r/255|0)+16}function a(r,f,o){var e=r.length-x,n=f.length;if(e<=0||0===n||o>=e)return 0;for(var h=0,a=0,w=new Uint32Array(g);h<o;){var u=k(t(r,h),b)>>>m;w[u]=++h}for(var s=h,p=1<<y;h<e-c;){var u=k(t(r,h),b)>>>m,d=w[u]-1;if(w[u]=h+1,d<0||h-d>>l>0||r[d]!==r[h]||r[d+1]!==r[h+1]||r[d+2]!==r[h+2]||r[d+3]!==r[h+3])h+=p>>y,++p;else{p=1<<y;var B=h-s,U=h-d;h+=c;for(var j=h;h<=e&&r[h]===r[h-U];)h++;if(j=h-j,j<15?f[a]=j:f[a]=15,B<15)f[a]|=B<<4;else{if(f[a]|=240,++a===n)throw v;for(var A=B-15;A>=255;A-=255)if(f[a]=255,++a===n)throw v;f[a]=255&A}if(++a===n)throw v;if(a+B>=n)throw v;if(i(f,r,a,s,B),a+=B,s=h,a+=2,a>=n)throw v;if(f[a-2]=U,f[a-1]=U>>8,j>=15){for(j-=15;j>=255;j-=255)if(f[a]=255,++a===n)throw v;if(f[a]=j,++a===n)throw v}}}if(0===s)return 0;var L=r.length-s;if(L<15)f[a]=L<<4;else{if(f[a]=240,++a===n)throw v;for(L-=15;L>=255;L-=255)if(f[a]=255,++a===n)throw v;f[a]=L}if(++a===n)throw v;var E=r.length-s,M=a+E;if(M>n)throw v;return M>=e?0:(i(f,r,a,s,E),a+=E)}function w(r,f,o){var e=r.length-x,n=f.length;if(e<=0||0===n||o>=e)return 0;for(var h=0,a=0,w=new Uint32Array(g),u=new Uint32Array(s);h<o;){var l=k(t(r,h),b)>>>m;u[h&p]=w[l],w[l]=++h}for(var d=h;h<e-c;){for(var l=k(t(r,h),b)>>>m,y=0,B=0,U=w[l]-1;U>0&&U>h-s;U=u[U&p]-1)if(r[U+y]===r[h+y])for(var j=0;;++j)if(r[U+j]!==r[h+j]||h+j>e){y<j&&j>=c&&(y=j,B=h-U);break}if(u[h&p]=w[l],w[l]=h+1,0!==y){for(var A=h+1,j=h+y;A<j;){var L=k(t(r,A),b)>>>m;u[A&p]=w[L],w[L]=++A}var E=h-d;if(h+=y,y-=c,y<15?f[a]=y:f[a]=15,E<15)f[a]|=E<<4;else{if(f[a]|=240,++a===n)throw v;for(var M=E-15;M>=255;M-=255)if(f[a]=255,++a===n)throw v;f[a]=255&M}if(++a===n)throw v;if(a+E>=n)throw v;if(i(f,r,a,d,E),a+=E,d=h,a+=2,a>=n)throw v;if(f[a-2]=B,f[a-1]=B>>8,y>=15){for(y-=15;y>=255;y-=255)if(f[a]=255,++a===n)throw v;if(f[a]=y,++a===n)throw v}}else++h}if(0===d)return 0;var Z=r.length-d;if(Z<15)f[a]=Z<<4;else{if(f[a]=240,++a===n)throw v;for(Z-=15;Z>=255;Z-=255)if(f[a]=255,++a===n)throw v;f[a]=Z}if(++a===n)throw v;var C=r.length-d,H=a+C;if(H>n)throw v;return H>=e?0:(i(f,r,a,d,C),a+=C)}var u=new Error("invalid source"),v=new Error("short buffer"),c=4,l=16,s=1<<l,p=s-1,d=16,g=1<<d,m=8*c-d,x=8+c,y=6,b=-1640531535,k=Math.imul?Math.imul:o;f.calcUncompressedLen=e,f.uncompressBlock=n,f.compressBlockBound=h,f.compressBlock=a,f.compressBlockHC=w}])});