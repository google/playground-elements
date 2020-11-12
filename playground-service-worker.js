!function(){"use strict";
/**
     * @license
     * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const e=Symbol("Comlink.proxy"),t=Symbol("Comlink.endpoint"),n=Symbol("Comlink.releaseProxy"),s=Symbol("Comlink.thrown"),a=e=>"object"==typeof e&&null!==e||"function"==typeof e,r=new Map([["proxy",{canHandle:t=>a(t)&&t[e],serialize(e){const{port1:t,port2:n}=new MessageChannel;return i(e,t),[n,[n]]},deserialize:e=>(e.start(),l(e,[],undefined))}],["throw",{canHandle:e=>a(e)&&s in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(Error(e.value.message),e.value);throw e.value}}]]);function i(t,n=self){n.addEventListener("message",(function a(r){if(!r||!r.data)return;const{id:c,type:l,path:u}=Object.assign({path:[]},r.data),m=(r.data.argumentList||[]).map(f);let g;try{const n=u.slice(0,-1).reduce(((e,t)=>e[t]),t),s=u.reduce(((e,t)=>e[t]),t);switch(l){case 0:g=s;break;case 1:n[u.slice(-1)[0]]=f(r.data.value),g=!0;break;case 2:g=s.apply(n,m);break;case 3:g=function(t){return Object.assign(t,{[e]:!0})}(new s(...m));break;case 4:{const{port1:e,port2:n}=new MessageChannel;i(t,n),g=function(e,t){return p.set(e,t),e}(e,[e])}break;case 5:g=void 0}}catch(e){g={value:e,[s]:0}}Promise.resolve(g).catch((e=>({value:e,[s]:0}))).then((e=>{const[t,s]=d(e);n.postMessage(Object.assign(Object.assign({},t),{id:c}),s),5===l&&(n.removeEventListener("message",a),o(n))}))})),n.start&&n.start()}function o(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function c(e){if(e)throw Error("Proxy has been released and is not useable")}function l(e,s=[],a=function(){}){let r=!1;const i=new Proxy(a,{get(t,a){if(c(r),a===n)return()=>m(e,{type:5,path:s.map((e=>e.toString()))}).then((()=>{o(e),r=!0}));if("then"===a){if(0===s.length)return{then:()=>i};const t=m(e,{type:0,path:s.map((e=>e.toString()))}).then(f);return t.then.bind(t)}return l(e,[...s,a])},set(t,n,a){c(r);const[i,o]=d(a);return m(e,{type:1,path:[...s,n].map((e=>e.toString())),value:i},o).then(f)},apply(n,a,i){c(r);const o=s[s.length-1];if(o===t)return m(e,{type:4}).then(f);if("bind"===o)return l(e,s.slice(0,-1));const[p,d]=u(i);return m(e,{type:2,path:s.map((e=>e.toString())),argumentList:p},d).then(f)},construct(t,n){c(r);const[a,i]=u(n);return m(e,{type:3,path:s.map((e=>e.toString())),argumentList:a},i).then(f)}});return i}function u(e){const t=e.map(d);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const p=new WeakMap;function d(e){for(const[t,n]of r)if(n.canHandle(e)){const[s,a]=n.serialize(e);return[{type:3,name:t,value:s},a]}return[{type:0,value:e},p.get(e)||[]]}function f(e){switch(e.type){case 3:return r.get(e.name).deserialize(e.value);case 0:return e.value}}function m(e,t,n){return new Promise((s=>{const a=[,,,,].fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===a&&(e.removeEventListener("message",t),s(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:a},t),n)}))}
/**
     * @license
     * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const g={setFileAPI(e,t){h.set(t,e)}},h=new Map;self.addEventListener("fetch",(e=>{const t=e.request.url;if(t.startsWith(self.registration.scope)){const{filePath:n,sessionId:s}=(e=>{const t=self.registration.scope,n=e.substring(t.length),s=n.indexOf("/");let a,r;return-1===s?console.warn("Invalid sample file URL: "+e):(a=n.slice(0,s),r=n.slice(s+1)),{sessionId:a,filePath:r}})(t);void 0!==s&&e.respondWith((async(e,t,n)=>{const s=h.get(n);if(s){const e=await s.getFile(t);if(e){const t=e.contentType?{"Content-Type":e.contentType}:void 0;return new Response(e.content,{headers:t})}}else console.warn("No FileAPI for session "+n);return fetch(e.request)})(e,n,s))}})),self.addEventListener("activate",(e=>{e.waitUntil(self.clients.claim())})),self.addEventListener("install",(()=>{self.skipWaiting()})),self.addEventListener("message",(e=>{1===e.data.initComlink&&(e.data.port.postMessage({initComlink:2}),i(g,e.data.port))}))}();
