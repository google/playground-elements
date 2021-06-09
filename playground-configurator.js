/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(t,r)};function t(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+r+" is not a constructor or null");function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}var r=function(){return(r=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function o(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const i="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(e,t,r=null)=>{for(;t!==r;){const r=t.nextSibling;e.removeChild(t),t=r}},a=`{{lit-${(Math.random()+"").slice(2)}}}`,s=`\x3c!--${a}--\x3e`,l=RegExp(`${a}|${s}`);class d{constructor(e,t){this.parts=[],this.element=t;const r=[],o=[],i=document.createTreeWalker(t.content,133,null,!1);let n=0,s=-1,d=0;const{strings:p,values:{length:g}}=e;for(;d<g;){const e=i.nextNode();if(null!==e){if(s++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:r}=t;let o=0;for(let e=0;e<r;e++)c(t[e].name,"$lit$")&&o++;for(;o-- >0;){const t=p[d],r=h.exec(t)[2],o=r.toLowerCase()+"$lit$",i=e.getAttribute(o);e.removeAttribute(o);const n=i.split(l);this.parts.push({type:"attribute",index:s,name:r,strings:n}),d+=n.length-1}}"TEMPLATE"===e.tagName&&(o.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const o=e.parentNode,i=t.split(l),n=i.length-1;for(let t=0;t<n;t++){let r,n=i[t];if(""===n)r=u();else{const e=h.exec(n);null!==e&&c(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),r=document.createTextNode(n)}o.insertBefore(r,e),this.parts.push({type:"node",index:++s})}""===i[n]?(o.insertBefore(u(),e),r.push(e)):e.data=i[n],d+=n}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&s!==n||(s++,t.insertBefore(u(),e)),n=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(r.push(e),s--),d++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1}),d++}}else i.currentNode=o.pop()}for(const e of r)e.parentNode.removeChild(e)}}const c=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},p=e=>-1!==e.index,u=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function g(e,t){const{element:{content:r},parts:o}=e,i=document.createTreeWalker(r,133,null,!1);let n=f(o),a=o[n],s=-1,l=0;const d=[];let c=null;for(;i.nextNode();){s++;const e=i.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==a&&a.index===s;)a.index=null!==c?-1:a.index-l,n=f(o,n),a=o[n]}d.forEach((e=>e.parentNode.removeChild(e)))}const m=e=>{let t=11===e.nodeType?0:1;const r=document.createTreeWalker(e,133,null,!1);for(;r.nextNode();)t++;return t},f=(e,t=-1)=>{for(let r=t+1;r<e.length;r++){const t=e[r];if(p(t))return r}return-1},y=new WeakMap,b=e=>(...t)=>{const r=e(...t);return y.set(r,!0),r},v=e=>"function"==typeof e&&y.has(e),x={},_={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
class w{constructor(e,t,r){this.__parts=[],this.template=e,this.processor=t,this.options=r}update(e){let t=0;for(const r of this.__parts)void 0!==r&&r.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],r=this.template.parts,o=document.createTreeWalker(e,133,null,!1);let n,a=0,s=0,l=o.nextNode();for(;a<r.length;)if(n=r[a],p(n)){for(;s<n.index;)s++,"TEMPLATE"===l.nodeName&&(t.push(l),o.currentNode=l.content),null===(l=o.nextNode())&&(o.currentNode=t.pop(),l=o.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,n.name,n.strings,this.options));a++}else this.__parts.push(void 0),a++;return i&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const S=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),C=` ${a} `;class k{constructor(e,t,r,o){this.strings=e,this.values=t,this.type=r,this.processor=o}getHTML(){const e=this.strings.length-1;let t="",r=!1;for(let o=0;o<e;o++){const e=this.strings[o],i=e.lastIndexOf("\x3c!--");r=(i>-1||r)&&-1===e.indexOf("--\x3e",i+1);const n=h.exec(e);t+=null===n?e+(r?C:s):e.substr(0,n.index)+n[1]+n[2]+"$lit$"+n[3]+a}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==S&&(t=S.createHTML(t)),e.innerHTML=t,e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const E=e=>null===e||!("object"==typeof e||"function"==typeof e),T=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class O{constructor(e,t,r){this.dirty=!0,this.element=e,this.name=t,this.strings=r,this.parts=[];for(let e=0;e<r.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new P(this)}_getValue(){const e=this.strings,t=e.length-1,r=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=r[0].value;if("symbol"==typeof e)return e+"";if("string"==typeof e||!T(e))return e}let o="";for(let i=0;i<t;i++){o+=e[i];const t=r[i];if(void 0!==t){const e=t.value;if(E(e)||!T(e))o+="string"==typeof e?e:e+"";else for(const t of e)o+="string"==typeof t?t:t+""}}return o+=e[t],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===x||E(e)&&e===this.value||(this.value=e,v(e)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const e=this.value;this.value=x,e(this)}this.value!==x&&this.committer.commit()}}class A{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(u()),this.endNode=e.appendChild(u())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=u()),e.__insert(this.endNode=u())}insertAfterPart(e){e.__insert(this.startNode=u()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=x,e(this)}const e=this.__pendingValue;e!==x&&(E(e)?e!==this.value&&this.__commitText(e):e instanceof k?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):T(e)?this.__commitIterable(e):e===_?(this.value=_,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,r="string"==typeof(e=null==e?"":e)?e:e+"";t===this.endNode.previousSibling&&3===t.nodeType?t.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof w&&this.value.template===t)this.value.update(e.values);else{const r=new w(t,e.processor,this.options),o=r._clone();r.update(e.values),this.__commitNode(o),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let r,o=0;for(const i of e)r=t[o],void 0===r&&(r=new A(this.options),t.push(r),0===o?r.appendIntoPart(this):r.insertAfterPart(t[o-1])),r.setValue(i),r.commit(),o++;o<t.length&&(t.length=o,this.clear(r&&r.endNode))}clear(e=this.startNode){n(this.startNode.parentNode,e.nextSibling,this.endNode)}}class R{constructor(e,t,r){if(this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=x,e(this)}if(this.__pendingValue===x)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=x}}class L extends O{constructor(e,t,r){super(e,t,r),this.single=2===r.length&&""===r[0]&&""===r[1]}_createPart(){return new I(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class I extends P{}let M=!1;(()=>{try{const e={get capture(){return M=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class N{constructor(e,t,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=r,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=x,e(this)}if(this.__pendingValue===x)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=z(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=x}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const z=e=>e&&(M?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function F(e){let t=U.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},U.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const o=e.strings.join(a);return r=t.keyString.get(o),void 0===r&&(r=new d(e,e.getTemplateElement()),t.keyString.set(o,r)),t.stringsArray.set(e.strings,r),r}const U=new Map,D=new WeakMap,H=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
class{handleAttributeExpressions(e,t,r,o){const i=t[0];return"."===i?new L(e,t.slice(1),r).parts:"@"===i?[new N(e,t.slice(1),o.eventContext)]:"?"===i?[new R(e,t.slice(1),r)]:new O(e,t,r).parts}handleTextExpression(e){return new A(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const B=(e,...t)=>new k(e,t,"html",H)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,V=(e,t)=>`${e}--${t}`;let W=!0;void 0===window.ShadyCSS?W=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),W=!1);const j=e=>t=>{const r=V(t.type,e);let o=U.get(r);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},U.set(r,o));let i=o.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(a);if(i=o.keyString.get(n),void 0===i){const r=t.getTemplateElement();W&&window.ShadyCSS.prepareTemplateDom(r,e),i=new d(t,r),o.keyString.set(n,i)}return o.stringsArray.set(t.strings,i),i},K=["html","svg"],q=new Set,J=(e,t,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw Error("The `scopeName` option is required.");const o=r.scopeName,i=D.has(t),a=W&&11===t.nodeType&&!!t.host,s=a&&!q.has(o),l=s?document.createDocumentFragment():t;if(((e,t,r)=>{let o=D.get(t);void 0===o&&(n(t,t.firstChild),D.set(t,o=new A(Object.assign({templateFactory:F},r))),o.appendInto(t)),o.setValue(e),o.commit()})(e,l,Object.assign({templateFactory:j(o)},r)),s){const e=D.get(l);D.delete(l);((e,t,r)=>{q.add(e);const o=r?r.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:n}=i;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(o,e);const a=document.createElement("style");for(let e=0;e<n;e++){const t=i[e];t.parentNode.removeChild(t),a.textContent+=t.textContent}(e=>{K.forEach((t=>{const r=U.get(V(t,e));void 0!==r&&r.keyString.forEach((e=>{const{element:{content:t}}=e,r=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{r.add(e)})),g(e,r)}))}))})(e);const s=o.content;r?function(e,t,r=null){const{element:{content:o},parts:i}=e;if(null==r)return void o.appendChild(t);const n=document.createTreeWalker(o,133,null,!1);let a=f(i),s=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===r&&(s=m(t),r.parentNode.insertBefore(t,r));-1!==a&&i[a].index===l;){if(s>0){for(;-1!==a;)i[a].index+=s,a=f(i,a);return}a=f(i,a)}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */(r,a,s.firstChild):s.insertBefore(a,s.firstChild),window.ShadyCSS.prepareTemplateStyles(o,e);const l=s.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(r){s.insertBefore(a,s.firstChild);const e=new Set;e.add(a),g(r,e)}})(o,l,e.value instanceof w?e.value.template:void 0),n(t,t.firstChild),t.appendChild(l),D.set(t,e)}!i&&a&&window.ShadyCSS.styleElement(t.host)};window.JSCompiler_renameProperty=(e,t)=>e;const Z={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},G=(e,t)=>t!==e&&(t==t||e==e),Q={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:G};class Y extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=Q){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Q}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=G){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||Z,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||Z.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=Q){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Y.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const X=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(t){window.customElements.define(e,t)}}})(e,t),$=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function ee(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):$(e,t)}function te(e){return ee({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}function re(e,t){return(r,o)=>{const i={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t=void 0!==o?o:r.key,n="symbol"==typeof t?Symbol():"__"+t;i.get=function(){return void 0===this[n]&&(this[n]=this.renderRoot.querySelector(e)),this[n]}}return void 0!==o?oe(i,r,o):ie(i,r)}}const oe=(e,t,r)=>{Object.defineProperty(t,r,e)},ie=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e})
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/,ne=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol();class se{constructor(e,t){if(t!==ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(ne?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const le=(e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof se)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new se(r,ae)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const de={};class ce extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!ne){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new se(t+"",ae)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ne?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==de&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return de}}ce.finalized=!0,ce.render=J,ce.shadowRootOptions={mode:"open"};const pe=Symbol("Comlink.proxy"),ue=Symbol("Comlink.endpoint"),he=Symbol("Comlink.releaseProxy"),ge=Symbol("Comlink.thrown"),me=e=>"object"==typeof e&&null!==e||"function"==typeof e,fe=new Map([["proxy",{canHandle:e=>me(e)&&e[pe],serialize(e){const{port1:t,port2:r}=new MessageChannel;return ye(e,t),[r,[r]]},deserialize:e=>(e.start(),ve(e))}],["throw",{canHandle:e=>me(e)&&ge in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(Error(e.value.message),e.value);throw e.value}}]]);function ye(e,t=self){t.addEventListener("message",(function r(o){if(!o||!o.data)return;const{id:i,type:n,path:a}=Object.assign({path:[]},o.data),s=(o.data.argumentList||[]).map(Ee);let l;try{const t=a.slice(0,-1).reduce(((e,t)=>e[t]),e),r=a.reduce(((e,t)=>e[t]),e);switch(n){case"GET":l=r;break;case"SET":t[a.slice(-1)[0]]=Ee(o.data.value),l=!0;break;case"APPLY":l=r.apply(t,s);break;case"CONSTRUCT":l=Ce(new r(...s));break;case"ENDPOINT":{const{port1:t,port2:r}=new MessageChannel;ye(e,r),l=function(e,t){return Se.set(e,t),e}(t,[t])}break;case"RELEASE":l=void 0;break;default:return}}catch(e){l={value:e,[ge]:0}}Promise.resolve(l).catch((e=>({value:e,[ge]:0}))).then((e=>{const[o,a]=ke(e);t.postMessage(Object.assign(Object.assign({},o),{id:i}),a),"RELEASE"===n&&(t.removeEventListener("message",r),be(t))}))})),t.start&&t.start()}function be(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function ve(e,t){return _e(e,[],t)}function xe(e){if(e)throw Error("Proxy has been released and is not useable")}function _e(e,t=[],r=function(){}){let o=!1;const i=new Proxy(r,{get(r,n){if(xe(o),n===he)return()=>Te(e,{type:"RELEASE",path:t.map((e=>e.toString()))}).then((()=>{be(e),o=!0}));if("then"===n){if(0===t.length)return{then:()=>i};const r=Te(e,{type:"GET",path:t.map((e=>e.toString()))}).then(Ee);return r.then.bind(r)}return _e(e,[...t,n])},set(r,i,n){xe(o);const[a,s]=ke(n);return Te(e,{type:"SET",path:[...t,i].map((e=>e.toString())),value:a},s).then(Ee)},apply(r,i,n){xe(o);const a=t[t.length-1];if(a===ue)return Te(e,{type:"ENDPOINT"}).then(Ee);if("bind"===a)return _e(e,t.slice(0,-1));const[s,l]=we(n);return Te(e,{type:"APPLY",path:t.map((e=>e.toString())),argumentList:s},l).then(Ee)},construct(r,i){xe(o);const[n,a]=we(i);return Te(e,{type:"CONSTRUCT",path:t.map((e=>e.toString())),argumentList:n},a).then(Ee)}});return i}function we(e){const t=e.map(ke);return[t.map((e=>e[0])),(r=t.map((e=>e[1])),Array.prototype.concat.apply([],r))];var r}const Se=new WeakMap;function Ce(e){return Object.assign(e,{[pe]:!0})}function ke(e){for(const[t,r]of fe)if(r.canHandle(e)){const[o,i]=r.serialize(e);return[{type:"HANDLER",name:t,value:o},i]}return[{type:"RAW",value:e},Se.get(e)||[]]}function Ee(e){switch(e.type){case"HANDLER":return fe.get(e.name).deserialize(e.value);case"RAW":return e.value}}function Te(e,t,r){return new Promise((o=>{const i=[,,,,].fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(r){r.data&&r.data.id&&r.data.id===i&&(e.removeEventListener("message",t),o(r.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:i},t),r)}))}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe=e=>e.endsWith("/")?e:e+"/";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Pe{constructor(){this.resolved=!1,this.promise=new Promise((e=>{this._resolve=e}))}resolve(e){this.resolved=!0,this._resolve(e)}}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ae=new Set;let Re=0,Le=class extends ce{constructor(){super(...arguments),this._source={type:"none"},this.sandboxBaseUrl="https://unpkg.com/playground-elements@0.9.4/",this.sandboxScope="playground-projects/",this._sessionId=(()=>{let e;do{e=crypto.getRandomValues(new Uint32Array(1))[0].toString(32)}while(Ae.has(e));return Ae.add(e),e})(),this._deferredTypeScriptWorkerApi=new Pe,this._compileResultPromise=Promise.resolve(void 0),this._validImportMap={},this._compileId=Re++,this._saveTimeoutId=void 0,this.lastSave=Promise.resolve(),this.savePending=!1}get projectSrc(){if("url"===this._source.type)return this._source.url}set projectSrc(e){e?"url"===this._source.type&&this._source.url===e||(this._source={type:"url",url:e}):"url"===this._source.type&&(this._source={type:"none"})}get config(){var e;return{files:Object.fromEntries((null!==(e=this._files)&&void 0!==e?e:[]).map((e=>[e.name,{...e,name:void 0}]))),importMap:this._validImportMap}}set config(e){e?this._source={type:"direct",config:e}:"direct"===this._source.type&&(this._source={type:"none"})}get files(){return this._files}get diagnostics(){return this._diagnostics}set _importMap(e){const t=Fe(e);if(t.length>0){for(const e of t)console.error(e);this._validImportMap={}}else this._validImportMap=e}get _importMap(){return this._validImportMap}get _normalizedSandboxBaseUrl(){const e=new URL(this.sandboxBaseUrl,document.location.href);return e.pathname=Oe(e.pathname),e}get baseUrl(){if(void 0!==this._serviceWorkerAPI&&void 0!==this._files)return new URL(`${Oe(this.sandboxScope)}${this._sessionId}/`,this._normalizedSandboxBaseUrl).href}get _serviceWorkerProxyIframeUrl(){return new URL("playground-service-worker-proxy.html#playground-session-id="+this._sessionId,this._normalizedSandboxBaseUrl).href}async update(e){e.has("_source")&&this._loadProjectFromSource(),(e.has("sandboxScope")||e.has("sandboxBaseUrl")||e.has("_serviceWorkerAPI"))&&this.dispatchEvent(new CustomEvent("urlChanged")),super.update(e)}async _loadProjectFromSource(){const e=this._source;switch(e.type){case"none":this._files=void 0,this._importMap={};break;case"direct":{const{files:t,importMap:r}=await Me(e.config,document.baseURI);if(e!==this._source)return;this._files=t,this._importMap=r}break;case"slot":this._files=e.files,this._importMap=e.importMap;break;case"url":{const{files:t,importMap:r}=await Ie(new URL(e.url,document.baseURI).href);if(e!==this._source)return;this._files=t,this._importMap=r}}this.dispatchEvent(new CustomEvent("filesChanged")),this.save()}render(){return B`
      <slot @slotchange=${this._slotChange}></slot>
      <iframe
        src=${this._serviceWorkerProxyIframeUrl}
        @load=${this._onServiceWorkerProxyIframeLoad}
      ></iframe>
    `}_slotChange(e){const{type:t}=this._source;if("none"!==t&&"slot"!==t)return;const r=[];let o;for(const e of this._slot.assignedElements({flatten:!0})){const t=e.getAttribute("type");if(!(null==t?void 0:t.startsWith("sample/")))continue;const i=t.substring(7);let n=e.textContent.replace("&lt;","<");if(e.hasAttribute("preserve-whitespace")||(n=Ue(n)),"importmap"===i)try{o=JSON.parse(n)}catch{console.error("Invalid import map JSON",e)}else{const t=e.getAttribute("filename");if(!t)continue;const o=e.getAttribute("label")||void 0,a=ze(i);r.push({name:t,label:o,hidden:e.hasAttribute("hidden"),content:n,contentType:a})}}(r.length>0||void 0!==o)&&(this._source={type:"slot",files:r,importMap:null!=o?o:{}})}async firstUpdated(){const e=("cdn.skypack.dev"===(t=new URL("./playground-typescript-worker.js",import.meta.url)).hostname&&(t.pathname=t.pathname.replace(/mode=imports\/(un)?optimized/,"mode=raw")),t);var t;let r;if(e.origin===window.location.origin)r=new Worker(e);else{const t=await fetch(e.href),o=await t.text(),i=URL.createObjectURL(new Blob([o],{type:"application/javascript"}));r=new Worker(i),URL.revokeObjectURL(i)}this._deferredTypeScriptWorkerApi.resolve(ve(r))}_onServiceWorkerProxyIframeLoad(){const e=this._iframe.contentWindow;if(!e)throw Error("Unexpected internal error: <playground-project> service worker proxy iframe had no contentWindow");const{port1:t,port2:r}=new MessageChannel;t.addEventListener("message",(e=>{3===e.data.type&&this._onNewServiceWorkerPort(e.data.port)})),t.start();const o={type:1,url:"playground-service-worker.js",scope:this.sandboxScope,port:r};e.postMessage(o,"*",[o.port])}_onNewServiceWorkerPort(e){const t=r=>{4===r.data.type&&(e.removeEventListener("message",t),this._serviceWorkerAPI=ve(e),this._serviceWorkerAPI.setFileAPI(Ce({getFile:e=>this._getFile(e)}),this._sessionId))};e.addEventListener("message",t),e.start()}async _getFile(e){var t,r,o,i;await this._compileResultPromise;const n=new URL(e,window.origin).href,a=null===(t=this._compiledFiles)||void 0===t?void 0:t.get(n);return void 0!==a?{name:e,label:null===(o=null===(r=this._files)||void 0===r?void 0:r.find((t=>t.name===e)))||void 0===o?void 0:o.label,content:a,contentType:"application/javascript"}:null===(i=this._files)||void 0===i?void 0:i.find((t=>t.name===e))}async save(){const e=Re++;this._compileId=e;const t=()=>e!==this._compileId;if(this._clearSaveTimeout(),this._compiledFiles=void 0,this.dispatchEvent(new CustomEvent("compileStart")),void 0!==this._files){const e=await this._deferredTypeScriptWorkerApi.promise;if(t())return;this._compileResultPromise=e.compileProject(this._files,this._importMap,Ce((e=>{t()||0===e.size||(this._diagnostics=void 0!==this._diagnostics?De(this._diagnostics,e):e,this.dispatchEvent(new CustomEvent("diagnosticsChanged")))})));const r=await this._compileResultPromise;if(t())return;this._compiledFiles=null==r?void 0:r.files,this._diagnostics=null==r?void 0:r.diagnostics}else this._compileResultPromise=Promise.resolve(void 0);this.dispatchEvent(new CustomEvent("compileDone")),this.dispatchEvent(new CustomEvent("diagnosticsChanged"))}_clearSaveTimeout(){void 0!==this._saveTimeoutId&&(clearTimeout(this._saveTimeoutId),this._saveTimeoutId=void 0)}async saveDebounced(){this.savePending||(this.savePending=!0,await this.lastSave,this.savePending=!1,this.lastSave=this.save())}isValidNewFilename(e){return!!e&&!!this._files&&!this._files.some((t=>t.name===e))}addFile(e){this._files&&this.isValidNewFilename(e)&&(this._files=[...this._files,{name:e,content:"",contentType:Ne(e)}],this.dispatchEvent(new CustomEvent("filesChanged")),this.save())}deleteFile(e){var t;this._files=null===(t=this._files)||void 0===t?void 0:t.filter((t=>t.name!==e)),this.dispatchEvent(new CustomEvent("filesChanged")),this.save()}renameFile(e,t){if(!e||!this._files)return;if(!this.isValidNewFilename(t))return;const r=this._files.find((t=>t.name===e));r&&(r.name=t,r.contentType=Ne(t),this._files=[...this._files],this.dispatchEvent(new CustomEvent("filesChanged")),this.save())}};Le.styles=le`
    iframe {
      display: none;
    }
  `,o([ee({attribute:"project-src",hasChanged:()=>!1})],Le.prototype,"projectSrc",null),o([ee({attribute:!1,hasChanged:()=>!1})],Le.prototype,"config",null),o([te()],Le.prototype,"_source",void 0),o([ee({attribute:"sandbox-base-url"})],Le.prototype,"sandboxBaseUrl",void 0),o([ee({attribute:"sandbox-scope"})],Le.prototype,"sandboxScope",void 0),o([te()],Le.prototype,"_serviceWorkerAPI",void 0),o([re("slot")],Le.prototype,"_slot",void 0),o([re("iframe")],Le.prototype,"_iframe",void 0),Le=o([X("playground-project")],Le);const Ie=async(e,t=new Set,r=new Set)=>{if(r.has(e))throw Error("Circular project config extends: "+[...r.values(),e].join(" extends "));r.add(e);const o=await fetch(e);if(200!==o.status)throw Error(`Error ${o.status} fetching project config from ${e}: ${await o.text()}`);let i;try{i=await o.json()}catch(t){throw Error(`Error parsing project config JSON from ${e}: ${t.message}`)}return await Me(i,e,t,r)},Me=async(e,t,r=new Set,o=new Set)=>{var i,n,a,s,l;const d=[];for(const[o,s]of Object.entries(null!==(i=e.files)&&void 0!==i?i:{}))r.has(o)||(r.add(o),void 0===s.content?d.push((async()=>{var e;const r=await fetch(new URL(o,t).href);return{...s,name:o,content:await r.text(),contentType:null!==(e=r.headers.get("Content-Type"))&&void 0!==e?e:"text/plain"}})()):d.push(Promise.resolve({...s,name:o,content:null!==(n=s.content)&&void 0!==n?n:"",contentType:null!==(a=Ne(o))&&void 0!==a?a:"text/plain"})));const c=e.extends?Ie(new URL(e.extends,t).href,r,o):void 0,p=await Promise.all(d),u=null!==(s=e.importMap)&&void 0!==s?s:{};if(c){const e=await c;p.push(...e.files),u.imports={...null===(l=e.importMap)||void 0===l?void 0:l.imports,...u.imports}}return{files:p,importMap:u}},Ne=e=>{const t=e.lastIndexOf(".");if(-1===t||t===e.length-1)return;const r=e.slice(t+1);return ze(r)},ze=e=>{if(void 0!==e)switch(e){case"ts":return"video/mp2t";case"js":return"application/javascript; charset=utf-8";case"json":return"application/json; charset=utf-8";case"html":return"text/html; charset=utf-8";case"css":return"text/css; charset=utf-8"}},Fe=e=>{const t=[];if("object"!=typeof e||null===e)return t.push(`Import map is invalid because it must be an object, but it was ${null===e?"null":typeof e}.`),t;const r=Object.keys(e).filter((e=>"imports"!==e));r.length>0&&t.push(`Invalid import map properties: ${[...r].join(", ")}. Only "imports" are currently supported.`);const o=e.imports;if(void 0===o)return t;if("object"!=typeof o||null===o)return t.push(`Import map "imports" property is invalid because it must be an object, but it was ${null===o?"null":typeof o}.`),t;for(const[e,r]of Object.entries(o))if("string"==typeof r){e.endsWith("/")&&!r.endsWith("/")&&t.push(`Import map key "${e}" is invalid because address "${r}" must end in a forward-slash.`);try{new URL(r)}catch{t.push(`Import map key "${e}" is invalid because address "${r}" is not a valid URL.`)}}else t.push(`Import map key "${e}" is invalid because address must be a string, but was `+(null===r?"null":typeof r));return t},Ue=e=>{let t;e=e.replace(/(^[\n\s]*\n)|(\n[\n\s]*$)/g,"");for(const r of e.split(/\n/g)){const e=r.match(/^\s*/)[0].length;(void 0===t||e<t)&&(t=e)}return e.replace(RegExp(`^\\s{${null!=t?t:0}}`,"gm"),"")},De=(...e)=>{const t=new Map;for(const r of e)for(const[e,o]of r){let r=t.get(e);void 0===r&&(r=[],t.set(e,r)),r.push(...o)}return t};window.JSCompiler_renameProperty=(e,t)=>e;const He={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},Be=(e,t)=>t!==e&&(t==t||e==e),Ve={attribute:!0,type:String,converter:He,reflect:!1,hasChanged:Be};class We extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=Ve){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Ve}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=Be){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||He,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||He.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=Ve){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}We.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const je=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function Ke(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):je(e,t)}const qe=(e,t,r)=>{Object.defineProperty(t,r,e)},Je=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e});function Ze(e){return(t,r)=>void 0!==r?((e,t,r)=>{Object.assign(t[r],e)})(e,t,r):((e,t)=>Object.assign(Object.assign({},t),{finisher(r){Object.assign(r.prototype[t.key],e)}}))(e,t)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const Ge=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Qe=Symbol();class Ye{constructor(e,t){if(t!==Qe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Ge?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Xe={};class $e extends We{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!Ge){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Ye(t+"",Qe)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Ge?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Xe&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Xe}}$e.finalized=!0,$e.render=J,window.JSCompiler_renameProperty=(e,t)=>e;const et={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},tt=(e,t)=>t!==e&&(t==t||e==e),rt={attribute:!0,type:String,converter:et,reflect:!1,hasChanged:tt};class ot extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=rt){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||rt}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=tt){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||et,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||et.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=rt){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}ot.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const it=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function nt(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):it(e,t)}function at(e){return nt({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}const st=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lt=Symbol();class dt{constructor(e,t){if(t!==lt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(st?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ct={};class pt extends ot{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!st){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new dt(t+"",lt)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?st?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ct&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return ct}}function ut(e,t){return(e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,t)}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */pt.finalized=!0,pt.render=J,window.JSCompiler_renameProperty=(e,t)=>e;const ht={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},gt=(e,t)=>t!==e&&(t==t||e==e),mt={attribute:!0,type:String,converter:ht,reflect:!1,hasChanged:gt};class ft extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=mt){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||mt}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=gt){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||ht,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||ht.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=mt){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}ft.finalized=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const yt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,bt=Symbol();class vt{constructor(e,t){if(t!==bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(yt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const xt={};class _t extends ft{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!yt){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new vt(t+"",bt)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?yt?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==xt&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return xt}}_t.finalized=!0,_t.render=J;
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const wt=e=>e.nodeType===Node.ELEMENT_NODE;function St(e){return{addClass:t=>{e.classList.add(t)},removeClass:t=>{e.classList.remove(t)},hasClass:t=>e.classList.contains(t)}}const Ct=()=>{},kt={get passive(){return!1}};document.addEventListener("x",Ct,kt),document.removeEventListener("x",Ct);const Et=(e=window.document)=>{let t=e.activeElement;const r=[];if(!t)return r;for(;t&&(r.push(t),t.shadowRoot);)t=t.shadowRoot.activeElement;return r},Tt=e=>{const t=Et();if(!t.length)return!1;const r=t[t.length-1],o=new Event("check-if-focused",{bubbles:!0,composed:!0});let i=[];const n=e=>{i=e.composedPath()};return document.body.addEventListener("check-if-focused",n),r.dispatchEvent(o),document.body.removeEventListener("check-if-focused",n),-1!==i.indexOf(e)};
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
class Ot extends _t{click(){if(this.mdcRoot)return this.mdcRoot.focus(),void this.mdcRoot.click();super.click()}createFoundation(){void 0!==this.mdcFoundation&&this.mdcFoundation.destroy(),this.mdcFoundationClass&&(this.mdcFoundation=new this.mdcFoundationClass(this.createAdapter()),this.mdcFoundation.init())}firstUpdated(){this.createFoundation()}}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var Pt=function(){function e(e){void 0===e&&(e={}),this.adapter=e}return Object.defineProperty(e,"cssClasses",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{}},enumerable:!1,configurable:!0}),e.prototype.init=function(){},e.prototype.destroy=function(){},e}(),At={BG_FOCUSED:"mdc-ripple-upgraded--background-focused",FG_ACTIVATION:"mdc-ripple-upgraded--foreground-activation",FG_DEACTIVATION:"mdc-ripple-upgraded--foreground-deactivation",ROOT:"mdc-ripple-upgraded",UNBOUNDED:"mdc-ripple-upgraded--unbounded"},Rt={VAR_FG_SCALE:"--mdc-ripple-fg-scale",VAR_FG_SIZE:"--mdc-ripple-fg-size",VAR_FG_TRANSLATE_END:"--mdc-ripple-fg-translate-end",VAR_FG_TRANSLATE_START:"--mdc-ripple-fg-translate-start",VAR_LEFT:"--mdc-ripple-left",VAR_TOP:"--mdc-ripple-top"},Lt={DEACTIVATION_TIMEOUT_MS:225,FG_DEACTIVATION_MS:150,INITIAL_ORIGIN_SCALE:.6,PADDING:10,TAP_DELAY_MS:300},It=["touchstart","pointerdown","mousedown","keydown"],Mt=["touchend","pointerup","mouseup","contextmenu"],Nt=[],zt=function(e){function o(t){var i=e.call(this,r(r({},o.defaultAdapter),t))||this;return i.activationAnimationHasEnded_=!1,i.activationTimer_=0,i.fgDeactivationRemovalTimer_=0,i.fgScale_="0",i.frame_={width:0,height:0},i.initialSize_=0,i.layoutFrame_=0,i.maxRadius_=0,i.unboundedCoords_={left:0,top:0},i.activationState_=i.defaultActivationState_(),i.activationTimerCallback_=function(){i.activationAnimationHasEnded_=!0,i.runDeactivationUXLogicIfReady_()},i.activateHandler_=function(e){return i.activate_(e)},i.deactivateHandler_=function(){return i.deactivate_()},i.focusHandler_=function(){return i.handleFocus()},i.blurHandler_=function(){return i.handleBlur()},i.resizeHandler_=function(){return i.layout()},i}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return At},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return Rt},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return Lt},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},browserSupportsCssVars:function(){return!0},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},containsEventTarget:function(){return!0},deregisterDocumentInteractionHandler:function(){},deregisterInteractionHandler:function(){},deregisterResizeHandler:function(){},getWindowPageOffset:function(){return{x:0,y:0}},isSurfaceActive:function(){return!0},isSurfaceDisabled:function(){return!0},isUnbounded:function(){return!0},registerDocumentInteractionHandler:function(){},registerInteractionHandler:function(){},registerResizeHandler:function(){},removeClass:function(){},updateCssVariable:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){var e=this,t=this.supportsPressRipple_();if(this.registerRootHandlers_(t),t){var r=o.cssClasses,i=r.ROOT,n=r.UNBOUNDED;requestAnimationFrame((function(){e.adapter.addClass(i),e.adapter.isUnbounded()&&(e.adapter.addClass(n),e.layoutInternal_())}))}},o.prototype.destroy=function(){var e=this;if(this.supportsPressRipple_()){this.activationTimer_&&(clearTimeout(this.activationTimer_),this.activationTimer_=0,this.adapter.removeClass(o.cssClasses.FG_ACTIVATION)),this.fgDeactivationRemovalTimer_&&(clearTimeout(this.fgDeactivationRemovalTimer_),this.fgDeactivationRemovalTimer_=0,this.adapter.removeClass(o.cssClasses.FG_DEACTIVATION));var t=o.cssClasses,r=t.ROOT,i=t.UNBOUNDED;requestAnimationFrame((function(){e.adapter.removeClass(r),e.adapter.removeClass(i),e.removeCssVars_()}))}this.deregisterRootHandlers_(),this.deregisterDeactivationHandlers_()},o.prototype.activate=function(e){this.activate_(e)},o.prototype.deactivate=function(){this.deactivate_()},o.prototype.layout=function(){var e=this;this.layoutFrame_&&cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=requestAnimationFrame((function(){e.layoutInternal_(),e.layoutFrame_=0}))},o.prototype.setUnbounded=function(e){var t=o.cssClasses.UNBOUNDED;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.handleFocus=function(){var e=this;requestAnimationFrame((function(){return e.adapter.addClass(o.cssClasses.BG_FOCUSED)}))},o.prototype.handleBlur=function(){var e=this;requestAnimationFrame((function(){return e.adapter.removeClass(o.cssClasses.BG_FOCUSED)}))},o.prototype.supportsPressRipple_=function(){return this.adapter.browserSupportsCssVars()},o.prototype.defaultActivationState_=function(){return{activationEvent:void 0,hasDeactivationUXRun:!1,isActivated:!1,isProgrammatic:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1}},o.prototype.registerRootHandlers_=function(e){var t=this;e&&(It.forEach((function(e){t.adapter.registerInteractionHandler(e,t.activateHandler_)})),this.adapter.isUnbounded()&&this.adapter.registerResizeHandler(this.resizeHandler_)),this.adapter.registerInteractionHandler("focus",this.focusHandler_),this.adapter.registerInteractionHandler("blur",this.blurHandler_)},o.prototype.registerDeactivationHandlers_=function(e){var t=this;"keydown"===e.type?this.adapter.registerInteractionHandler("keyup",this.deactivateHandler_):Mt.forEach((function(e){t.adapter.registerDocumentInteractionHandler(e,t.deactivateHandler_)}))},o.prototype.deregisterRootHandlers_=function(){var e=this;It.forEach((function(t){e.adapter.deregisterInteractionHandler(t,e.activateHandler_)})),this.adapter.deregisterInteractionHandler("focus",this.focusHandler_),this.adapter.deregisterInteractionHandler("blur",this.blurHandler_),this.adapter.isUnbounded()&&this.adapter.deregisterResizeHandler(this.resizeHandler_)},o.prototype.deregisterDeactivationHandlers_=function(){var e=this;this.adapter.deregisterInteractionHandler("keyup",this.deactivateHandler_),Mt.forEach((function(t){e.adapter.deregisterDocumentInteractionHandler(t,e.deactivateHandler_)}))},o.prototype.removeCssVars_=function(){var e=this,t=o.strings;Object.keys(t).forEach((function(r){0===r.indexOf("VAR_")&&e.adapter.updateCssVariable(t[r],null)}))},o.prototype.activate_=function(e){var t=this;if(!this.adapter.isSurfaceDisabled()){var r=this.activationState_;if(!r.isActivated){var o=this.previousActivationEvent_;o&&void 0!==e&&o.type!==e.type||(r.isActivated=!0,r.isProgrammatic=void 0===e,r.activationEvent=e,r.wasActivatedByPointer=!r.isProgrammatic&&void 0!==e&&("mousedown"===e.type||"touchstart"===e.type||"pointerdown"===e.type),void 0!==e&&Nt.length>0&&Nt.some((function(e){return t.adapter.containsEventTarget(e)}))?this.resetActivationState_():(void 0!==e&&(Nt.push(e.target),this.registerDeactivationHandlers_(e)),r.wasElementMadeActive=this.checkElementMadeActive_(e),r.wasElementMadeActive&&this.animateActivation_(),requestAnimationFrame((function(){Nt=[],r.wasElementMadeActive||void 0===e||" "!==e.key&&32!==e.keyCode||(r.wasElementMadeActive=t.checkElementMadeActive_(e),r.wasElementMadeActive&&t.animateActivation_()),r.wasElementMadeActive||(t.activationState_=t.defaultActivationState_())}))))}}},o.prototype.checkElementMadeActive_=function(e){return void 0===e||"keydown"!==e.type||this.adapter.isSurfaceActive()},o.prototype.animateActivation_=function(){var e=this,t=o.strings,r=t.VAR_FG_TRANSLATE_START,i=t.VAR_FG_TRANSLATE_END,n=o.cssClasses,a=n.FG_DEACTIVATION,s=n.FG_ACTIVATION,l=o.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal_();var d="",c="";if(!this.adapter.isUnbounded()){var p=this.getFgTranslationCoordinates_(),u=p.startPoint,h=p.endPoint;d=u.x+"px, "+u.y+"px",c=h.x+"px, "+h.y+"px"}this.adapter.updateCssVariable(r,d),this.adapter.updateCssVariable(i,c),clearTimeout(this.activationTimer_),clearTimeout(this.fgDeactivationRemovalTimer_),this.rmBoundedActivationClasses_(),this.adapter.removeClass(a),this.adapter.computeBoundingRect(),this.adapter.addClass(s),this.activationTimer_=setTimeout((function(){return e.activationTimerCallback_()}),l)},o.prototype.getFgTranslationCoordinates_=function(){var e,t=this.activationState_,r=t.activationEvent;return{startPoint:e={x:(e=t.wasActivatedByPointer?function(e,t,r){if(!e)return{x:0,y:0};var o,i,n=t.x,a=t.y,s=n+r.left,l=a+r.top;if("touchstart"===e.type){var d=e;o=d.changedTouches[0].pageX-s,i=d.changedTouches[0].pageY-l}else{var c=e;o=c.pageX-s,i=c.pageY-l}return{x:o,y:i}}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */(r,this.adapter.getWindowPageOffset(),this.adapter.computeBoundingRect()):{x:this.frame_.width/2,y:this.frame_.height/2}).x-this.initialSize_/2,y:e.y-this.initialSize_/2},endPoint:{x:this.frame_.width/2-this.initialSize_/2,y:this.frame_.height/2-this.initialSize_/2}}},o.prototype.runDeactivationUXLogicIfReady_=function(){var e=this,t=o.cssClasses.FG_DEACTIVATION,r=this.activationState_,i=r.hasDeactivationUXRun,n=r.isActivated;(i||!n)&&this.activationAnimationHasEnded_&&(this.rmBoundedActivationClasses_(),this.adapter.addClass(t),this.fgDeactivationRemovalTimer_=setTimeout((function(){e.adapter.removeClass(t)}),Lt.FG_DEACTIVATION_MS))},o.prototype.rmBoundedActivationClasses_=function(){var e=o.cssClasses.FG_ACTIVATION;this.adapter.removeClass(e),this.activationAnimationHasEnded_=!1,this.adapter.computeBoundingRect()},o.prototype.resetActivationState_=function(){var e=this;this.previousActivationEvent_=this.activationState_.activationEvent,this.activationState_=this.defaultActivationState_(),setTimeout((function(){return e.previousActivationEvent_=void 0}),o.numbers.TAP_DELAY_MS)},o.prototype.deactivate_=function(){var e=this,t=this.activationState_;if(t.isActivated){var o=r({},t);t.isProgrammatic?(requestAnimationFrame((function(){return e.animateDeactivation_(o)})),this.resetActivationState_()):(this.deregisterDeactivationHandlers_(),requestAnimationFrame((function(){e.activationState_.hasDeactivationUXRun=!0,e.animateDeactivation_(o),e.resetActivationState_()})))}},o.prototype.animateDeactivation_=function(e){var t=e.wasActivatedByPointer,r=e.wasElementMadeActive;(t||r)&&this.runDeactivationUXLogicIfReady_()},o.prototype.layoutInternal_=function(){this.frame_=this.adapter.computeBoundingRect();var e=Math.max(this.frame_.height,this.frame_.width);this.maxRadius_=this.adapter.isUnbounded()?e:Math.sqrt(Math.pow(this.frame_.width,2)+Math.pow(this.frame_.height,2))+o.numbers.PADDING;var t=Math.floor(e*o.numbers.INITIAL_ORIGIN_SCALE);this.adapter.isUnbounded()&&t%2!=0?this.initialSize_=t-1:this.initialSize_=t,this.fgScale_=""+this.maxRadius_/this.initialSize_,this.updateLayoutCssVars_()},o.prototype.updateLayoutCssVars_=function(){var e=o.strings,t=e.VAR_FG_SIZE,r=e.VAR_LEFT,i=e.VAR_TOP,n=e.VAR_FG_SCALE;this.adapter.updateCssVariable(t,this.initialSize_+"px"),this.adapter.updateCssVariable(n,this.fgScale_),this.adapter.isUnbounded()&&(this.unboundedCoords_={left:Math.round(this.frame_.width/2-this.initialSize_/2),top:Math.round(this.frame_.height/2-this.initialSize_/2)},this.adapter.updateCssVariable(r,this.unboundedCoords_.left+"px"),this.adapter.updateCssVariable(i,this.unboundedCoords_.top+"px"))},o}(Pt);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
class Ft{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach((t=>e+=t+" ")),this.element.setAttribute("class",e)}}}const Ut=new WeakMap,Dt=b((e=>t=>{if(!(t instanceof P)||t instanceof I||"class"!==t.committer.name||t.committer.parts.length>1)throw Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:r}=t,{element:o}=r;let i=Ut.get(t);void 0===i&&(o.setAttribute("class",r.strings.join(" ")),Ut.set(t,i=new Set));const n=o.classList||new Ft(o);i.forEach((t=>{t in e||(n.remove(t),i.delete(t))}));for(const t in e){const r=e[t];r!=i.has(t)&&(r?(n.add(t),i.add(t)):(n.remove(t),i.delete(t)))}"function"==typeof n.commit&&n.commit()})),Ht=new WeakMap,Bt=b((e=>t=>{if(!(t instanceof P)||t instanceof I||"style"!==t.committer.name||t.committer.parts.length>1)throw Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:r}=t,{style:o}=r.element;let i=Ht.get(t);void 0===i&&(o.cssText=r.strings.join(" "),Ht.set(t,i=new Set)),i.forEach((t=>{t in e||(i.delete(t),-1===t.indexOf("-")?o[t]=null:o.removeProperty(t))}));for(const t in e)i.add(t),-1===t.indexOf("-")?o[t]=e[t]:o.setProperty(t,e[t])}));class Vt extends Ot{constructor(){super(...arguments),this.primary=!1,this.accent=!1,this.unbounded=!1,this.disabled=!1,this.activated=!1,this.selected=!1,this.hovering=!1,this.bgFocused=!1,this.fgActivation=!1,this.fgDeactivation=!1,this.fgScale="",this.fgSize="",this.translateStart="",this.translateEnd="",this.leftPos="",this.topPos="",this.mdcFoundationClass=zt}get isActive(){return ut(this.parentElement||this,":active")}createAdapter(){return{browserSupportsCssVars:()=>!0,isUnbounded:()=>this.unbounded,isSurfaceActive:()=>this.isActive,isSurfaceDisabled:()=>this.disabled,addClass:e=>{switch(e){case"mdc-ripple-upgraded--background-focused":this.bgFocused=!0;break;case"mdc-ripple-upgraded--foreground-activation":this.fgActivation=!0;break;case"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation=!0}},removeClass:e=>{switch(e){case"mdc-ripple-upgraded--background-focused":this.bgFocused=!1;break;case"mdc-ripple-upgraded--foreground-activation":this.fgActivation=!1;break;case"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation=!1}},containsEventTarget:()=>!0,registerInteractionHandler:()=>{},deregisterInteractionHandler:()=>{},registerDocumentInteractionHandler:()=>{},deregisterDocumentInteractionHandler:()=>{},registerResizeHandler:()=>{},deregisterResizeHandler:()=>{},updateCssVariable:(e,t)=>{switch(e){case"--mdc-ripple-fg-scale":this.fgScale=t;break;case"--mdc-ripple-fg-size":this.fgSize=t;break;case"--mdc-ripple-fg-translate-end":this.translateEnd=t;break;case"--mdc-ripple-fg-translate-start":this.translateStart=t;break;case"--mdc-ripple-left":this.leftPos=t;break;case"--mdc-ripple-top":this.topPos=t}},computeBoundingRect:()=>(this.parentElement||this).getBoundingClientRect(),getWindowPageOffset:()=>({x:window.pageXOffset,y:window.pageYOffset})}}startPress(e){this.waitForFoundation((()=>{this.mdcFoundation.activate(e)}))}endPress(){this.waitForFoundation((()=>{this.mdcFoundation.deactivate()}))}startFocus(){this.waitForFoundation((()=>{this.mdcFoundation.handleFocus()}))}endFocus(){this.waitForFoundation((()=>{this.mdcFoundation.handleBlur()}))}startHover(){this.hovering=!0}endHover(){this.hovering=!1}waitForFoundation(e){this.mdcFoundation?e():this.updateComplete.then(e)}update(e){e.has("disabled")&&this.disabled&&this.endHover(),super.update(e)}render(){const e=this.activated&&(this.primary||!this.accent),t=this.selected&&(this.primary||!this.accent),r={"mdc-ripple-surface--accent":this.accent,"mdc-ripple-surface--primary--activated":e,"mdc-ripple-surface--accent--activated":this.accent&&this.activated,"mdc-ripple-surface--primary--selected":t,"mdc-ripple-surface--accent--selected":this.accent&&this.selected,"mdc-ripple-surface--disabled":this.disabled,"mdc-ripple-surface--hover":this.hovering,"mdc-ripple-surface--primary":this.primary,"mdc-ripple-surface--selected":this.selected,"mdc-ripple-upgraded--background-focused":this.bgFocused,"mdc-ripple-upgraded--foreground-activation":this.fgActivation,"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation,"mdc-ripple-upgraded--unbounded":this.unbounded};return B`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${Dt(r)}"
          style="${Bt({"--mdc-ripple-fg-scale":this.fgScale,"--mdc-ripple-fg-size":this.fgSize,"--mdc-ripple-fg-translate-end":this.translateEnd,"--mdc-ripple-fg-translate-start":this.translateStart,"--mdc-ripple-left":this.leftPos,"--mdc-ripple-top":this.topPos})}"></div>`}}o([(".mdc-ripple-surface",(e,t)=>{const r={get(){return this.renderRoot.querySelector(".mdc-ripple-surface")},enumerable:!0,configurable:!0};return void 0!==t?((e,t,r)=>{Object.defineProperty(t,r,e)})(r,e,t):((e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}))
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/(r,e)})],Vt.prototype,"mdcRoot",void 0),o([nt({type:Boolean})],Vt.prototype,"primary",void 0),o([nt({type:Boolean})],Vt.prototype,"accent",void 0),o([nt({type:Boolean})],Vt.prototype,"unbounded",void 0),o([nt({type:Boolean})],Vt.prototype,"disabled",void 0),o([nt({type:Boolean})],Vt.prototype,"activated",void 0),o([nt({type:Boolean})],Vt.prototype,"selected",void 0),o([at()],Vt.prototype,"hovering",void 0),o([at()],Vt.prototype,"bgFocused",void 0),o([at()],Vt.prototype,"fgActivation",void 0),o([at()],Vt.prototype,"fgDeactivation",void 0),o([at()],Vt.prototype,"fgScale",void 0),o([at()],Vt.prototype,"fgSize",void 0),o([at()],Vt.prototype,"translateStart",void 0),o([at()],Vt.prototype,"translateEnd",void 0),o([at()],Vt.prototype,"leftPos",void 0),o([at()],Vt.prototype,"topPos",void 0);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const Wt=((e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof dt)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new dt(r,lt)})`.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface:hover::before,.mdc-ripple-surface.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}:host .mdc-ripple-surface{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;will-change:unset}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary:hover::before,.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before,.mdc-ripple-surface--primary--activated::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--activated:hover::before,.mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--primary--selected::before,.mdc-ripple-surface--primary--selected::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--selected:hover::before,.mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent:hover::before,.mdc-ripple-surface--accent.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before,.mdc-ripple-surface--accent--activated::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--activated:hover::before,.mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--accent--selected::before,.mdc-ripple-surface--accent--selected::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--selected:hover::before,.mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--disabled{opacity:0}`;let jt=class extends Vt{};function Kt(e,t,r){if(void 0!==t)
/**
@license
Copyright 2021 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
return function(e,t,r){const o=e.constructor;if(!r){const e="__"+t;if(!(r=o.getPropertyDescriptor(t,e)))throw Error("@ariaProperty must be used after a @property decorator")}const i=r;let n="";if(!i.set)throw Error("@ariaProperty requires a setter for "+t);const a={configurable:!0,enumerable:!0,set(e){if(""===n){const e=o.getPropertyOptions(t);n=e.attribute}this.hasAttribute(n)&&this.removeAttribute(n),i.set.call(this,e)}};return i.get&&(a.get=function(){return i.get.call(this)}),a}(e,t,r);throw Error("@ariaProperty only supports TypeScript Decorators")}
/**
@license
Copyright 2020 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/jt.styles=Wt,jt=o([("mwc-ripple",e=>{return"function"==typeof e?(t=e,window.customElements.define("mwc-ripple",t),t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(e){window.customElements.define("mwc-ripple",e)}}})(0,e);var t})],jt);class qt{constructor(e){this.startPress=t=>{e().then((e=>{e&&e.startPress(t)}))},this.endPress=()=>{e().then((e=>{e&&e.endPress()}))},this.startFocus=()=>{e().then((e=>{e&&e.startFocus()}))},this.endFocus=()=>{e().then((e=>{e&&e.endFocus()}))},this.startHover=()=>{e().then((e=>{e&&e.startHover()}))},this.endHover=()=>{e().then((e=>{e&&e.endHover()}))}}}class Jt extends $e{constructor(){super(...arguments),this.disabled=!1,this.icon="",this.shouldRenderRipple=!1,this.rippleHandlers=new qt((()=>(this.shouldRenderRipple=!0,this.ripple)))}renderRipple(){return this.shouldRenderRipple?B`
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>`:""}focus(){const e=this.buttonElement;e&&(this.rippleHandlers.startFocus(),e.focus())}blur(){const e=this.buttonElement;e&&(this.rippleHandlers.endFocus(),e.blur())}render(){return B`<button
        class="mdc-icon-button"
        aria-label="${this.ariaLabel||this.icon}"
        ?disabled="${this.disabled}"
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
    >${this.renderRipple()}
    <i class="material-icons">${this.icon}</i>
    <span
      ><slot></slot
    ></span>
  </button>`}handleRippleMouseDown(e){const t=()=>{window.removeEventListener("mouseup",t),this.handleRippleDeactivate()};window.addEventListener("mouseup",t),this.rippleHandlers.startPress(e)}handleRippleTouchStart(e){this.rippleHandlers.startPress(e)}handleRippleDeactivate(){this.rippleHandlers.endPress()}handleRippleMouseEnter(){this.rippleHandlers.startHover()}handleRippleMouseLeave(){this.rippleHandlers.endHover()}handleRippleFocus(){this.rippleHandlers.startFocus()}handleRippleBlur(){this.rippleHandlers.endFocus()}}o([Ke({type:Boolean,reflect:!0})],Jt.prototype,"disabled",void 0),o([Ke({type:String})],Jt.prototype,"icon",void 0),o([Kt,Ke({type:String,attribute:"aria-label"})],Jt.prototype,"ariaLabel",void 0),o([function(e,t){return(t,r)=>{const o={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};return void 0!==r?qe(o,t,r):Je(o,t)}}("button")],Jt.prototype,"buttonElement",void 0),o([(e,t)=>{const r={async get(){return await this.updateComplete,this.renderRoot.querySelector("mwc-ripple")},enumerable:!0,configurable:!0};return void 0!==t?qe(r,e,t):Je(r,e)}],Jt.prototype,"ripple",void 0),o([Ke({attribute:!1,hasChanged:void 0})],Jt.prototype,"shouldRenderRipple",void 0),o([Ze({passive:!0})],Jt.prototype,"handleRippleMouseDown",null),o([Ze({passive:!0})],Jt.prototype,"handleRippleTouchStart",null);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const Zt=((e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof Ye)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new Ye(r,Qe)})`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}:host{display:inline-block;outline:none;--mdc-ripple-color: currentcolor;-webkit-tap-highlight-color:transparent}:host([disabled]){pointer-events:none}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc( (var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2 )}.mdc-icon-button>i{position:absolute;top:0;padding-top:inherit}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/;let Gt=class extends Jt{};Gt.styles=Zt,Gt=o([e=>{return"function"==typeof e?(t=e,window.customElements.define("mwc-icon-button",t),t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(e){window.customElements.define("mwc-icon-button",e)}}})(0,e);var t}],Gt);
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
const Qt=new WeakMap,Yt=b((e=>t=>{const r=Qt.get(t);if(void 0===e&&t instanceof P){if(void 0!==r||!Qt.has(t)){const e=t.committer.name;t.committer.element.removeAttribute(e)}}else e!==r&&t.setValue(e);Qt.set(t,e)}));
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Xt=class extends ce{constructor(){super(...arguments),this._tabs=[],this._active=void 0}get active(){return this._active}set active(e){const t=this._active;e!==t&&(this._active=e,void 0!==t&&(t.active=!1),void 0!==e?e.active=!0:this.dispatchEvent(new CustomEvent("tabchange",{detail:{tab:void 0},bubbles:!0})))}render(){return B`
      <div role="tablist" aria-label=${Yt(this.label)}>
        <slot
          @slotchange=${this._onSlotchange}
          @click=${this._activateTab}
          @keydown=${this._onKeydown}
          @tabchange=${this._activateTab}
        ></slot>
      </div>
    `}_onSlotchange(e){let t;this._tabs=e.target.assignedElements();for(let e=0;e<this._tabs.length;e++){const r=this._tabs[e];r.index=e,void 0!==t?r.active=!1:(r.active||r.hasAttribute("active"))&&(t=r)}this.active=t}_activateTab(e){const t=this._findEventTab(e);void 0!==t&&(this.active=t,this._scrollTabIntoViewIfNeeded(t))}_scrollTabIntoViewIfNeeded(e){const t=this.getBoundingClientRect(),r=e.getBoundingClientRect();if(r.left-48<t.left||r.right+48>t.right){const e=r.left-t.left+this.scrollLeft-t.width/2+r.width/2;this.scroll({left:e,behavior:"smooth"})}}async _onKeydown(e){var t,r;const o=null!==(r=null===(t=this.active)||void 0===t?void 0:t.index)&&void 0!==r?r:0,i=this._tabs.length-1;let n=o;switch(e.key){case"ArrowLeft":0===o?n=i:n--;break;case"ArrowRight":o===i?n=0:n++;break;case"Home":n=0;break;case"End":n=i}if(n!==o){e.preventDefault();const t=this._tabs[n];this.active=t,await t.updateComplete,t.focus()}}_findEventTab(e){var t;const r=e.target;if("playground-internal-tab"===(null==r?void 0:r.localName))return e.target;for(const r of e.composedPath())if("playground-internal-tab"===(null===(t=r)||void 0===t?void 0:t.localName))return r}};Xt.styles=le`
    :host {
      display: flex;
      overflow-x: auto;
    }

    :host::-webkit-scrollbar {
      display: none;
    }

    div {
      display: flex;
    }
  `,o([ee()],Xt.prototype,"label",void 0),Xt=o([X("playground-internal-tab-bar")],Xt);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let $t=class extends ce{constructor(){super(...arguments),this.active=!1,this.index=0}render(){return B`<button
      role="tab"
      part="button"
      aria-selected=${this.active?"true":"false"}
      tabindex=${this.active?"0":"-1"}
    >
      <slot></slot>
    </button>`}updated(e){e.has("active")&&this.active&&this.dispatchEvent(new CustomEvent("tabchange",{detail:{tab:this},bubbles:!0}))}focus(){this._button.focus()}};$t.styles=le`
    :host {
      display: flex;
    }

    button {
      flex: 1;
      border: none;
      color: inherit;
      background: transparent;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      outline: none;
    }

    button::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: currentcolor;
      opacity: 0;
      transition: opacity 150ms;
    }

    button:focus::before,
    button:hover::before {
      opacity: 10%;
    }

    button:active::before {
      opacity: 20%;
    }
  `,o([ee({type:Boolean,reflect:!0})],$t.prototype,"active",void 0),o([re("button")],$t.prototype,"_button",void 0),$t=o([X("playground-internal-tab")],$t),window.JSCompiler_renameProperty=(e,t)=>e;const er={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},tr=(e,t)=>t!==e&&(t==t||e==e),rr={attribute:!0,type:String,converter:er,reflect:!1,hasChanged:tr};class or extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=rr){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||rr}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=tr){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||er,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||er.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=rr){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}or.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const ir=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(t){window.customElements.define(e,t)}}})(e,t),nr=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function ar(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):nr(e,t)}function sr(e){return ar({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}function lr(e,t){return(r,o)=>{const i={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof o?Symbol():"__"+o;i.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==o?dr(i,r,o):cr(i,r)}}const dr=(e,t,r)=>{Object.defineProperty(t,r,e)},cr=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e})
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/,pr=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ur=Symbol();class hr{constructor(e,t){if(t!==ur)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(pr?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const gr=(e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof hr)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new hr(r,ur)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const mr={};class fr extends or{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!pr){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new hr(t+"",ur)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?pr?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==mr&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return mr}}fr.finalized=!0,fr.render=J;
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const yr=e=>(t,r)=>{if(t.constructor._observers){if(!t.constructor.hasOwnProperty("_observers")){const e=t.constructor._observers;t.constructor._observers=new Map,e.forEach(((e,r)=>t.constructor._observers.set(r,e)))}}else{t.constructor._observers=new Map;const e=t.updated;t.updated=function(t){e.call(this,t),t.forEach(((e,t)=>{const r=this.constructor._observers.get(t);void 0!==r&&r.call(this,this[t],e)}))}}t.constructor._observers.set(r,e)}
/**
 @license
 Copyright 2020 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */;class br extends fr{constructor(){super(...arguments),this.value="",this.group=null,this.tabindex=-1,this.disabled=!1,this.twoline=!1,this.activated=!1,this.graphic=null,this.multipleGraphics=!1,this.hasMeta=!1,this.noninteractive=!1,this.selected=!1,this.shouldRenderRipple=!1,this._managingList=null,this.boundOnClick=this.onClick.bind(this),this._firstChanged=!0,this._skipPropRequest=!1,this.rippleHandlers=new qt((()=>(this.shouldRenderRipple=!0,this.ripple))),this.listeners=[{target:this,eventNames:["click"],cb:()=>{this.onClick()}},{target:this,eventNames:["mouseenter"],cb:this.rippleHandlers.startHover},{target:this,eventNames:["mouseleave"],cb:this.rippleHandlers.endHover},{target:this,eventNames:["focus"],cb:this.rippleHandlers.startFocus},{target:this,eventNames:["blur"],cb:this.rippleHandlers.endFocus},{target:this,eventNames:["mousedown","touchstart"],cb:e=>{const t=e.type;this.onDown("mousedown"===t?"mouseup":"touchend",e)}}]}get text(){const e=this.textContent;return e?e.trim():""}render(){const e=this.renderText(),t=this.graphic?this.renderGraphic():B``,r=this.hasMeta?this.renderMeta():B``;return B`
      ${this.renderRipple()}
      ${t}
      ${e}
      ${r}`}renderRipple(){return this.shouldRenderRipple?B`
      <mwc-ripple
        .activated=${this.activated}>
      </mwc-ripple>`:this.activated?B`<div class="fake-activated-ripple"></div>`:""}renderGraphic(){const e={multi:this.multipleGraphics};return B`
      <span class="mdc-deprecated-list-item__graphic material-icons ${Dt(e)}">
        <slot name="graphic"></slot>
      </span>`}renderMeta(){return B`
      <span class="mdc-deprecated-list-item__meta material-icons">
        <slot name="meta"></slot>
      </span>`}renderText(){const e=this.twoline?this.renderTwoline():this.renderSingleLine();return B`
      <span class="mdc-deprecated-list-item__text">
        ${e}
      </span>`}renderSingleLine(){return B`<slot></slot>`}renderTwoline(){return B`
      <span class="mdc-deprecated-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="mdc-deprecated-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `}onClick(){this.fireRequestSelected(!this.selected,"interaction")}onDown(e,t){const r=()=>{window.removeEventListener(e,r),this.rippleHandlers.endPress()};window.addEventListener(e,r),this.rippleHandlers.startPress(t)}fireRequestSelected(e,t){if(this.noninteractive)return;const r=new CustomEvent("request-selected",{bubbles:!0,composed:!0,detail:{source:t,selected:e}});this.dispatchEvent(r)}connectedCallback(){super.connectedCallback(),this.noninteractive||this.setAttribute("mwc-list-item","");for(const e of this.listeners)for(const t of e.eventNames)e.target.addEventListener(t,e.cb,{passive:!0})}disconnectedCallback(){super.disconnectedCallback();for(const e of this.listeners)for(const t of e.eventNames)e.target.removeEventListener(t,e.cb);this._managingList&&(this._managingList.debouncedLayout?this._managingList.debouncedLayout(!0):this._managingList.layout(!0))}firstUpdated(){const e=new Event("list-item-rendered",{bubbles:!0,composed:!0});this.dispatchEvent(e)}}o([lr("slot")],br.prototype,"slotElement",void 0),o([(e,t)=>{const r={async get(){return await this.updateComplete,this.renderRoot.querySelector("mwc-ripple")},enumerable:!0,configurable:!0};return void 0!==t?dr(r,e,t):cr(r,e)}],br.prototype,"ripple",void 0),o([ar({type:String})],br.prototype,"value",void 0),o([ar({type:String,reflect:!0})],br.prototype,"group",void 0),o([ar({type:Number,reflect:!0})],br.prototype,"tabindex",void 0),o([ar({type:Boolean,reflect:!0}),yr((function(e){e?this.setAttribute("aria-disabled","true"):this.setAttribute("aria-disabled","false")}))],br.prototype,"disabled",void 0),o([ar({type:Boolean,reflect:!0})],br.prototype,"twoline",void 0),o([ar({type:Boolean,reflect:!0})],br.prototype,"activated",void 0),o([ar({type:String,reflect:!0})],br.prototype,"graphic",void 0),o([ar({type:Boolean})],br.prototype,"multipleGraphics",void 0),o([ar({type:Boolean})],br.prototype,"hasMeta",void 0),o([ar({type:Boolean,reflect:!0}),yr((function(e){e?(this.removeAttribute("aria-checked"),this.removeAttribute("mwc-list-item"),this.selected=!1,this.activated=!1,this.tabIndex=-1):this.setAttribute("mwc-list-item","")}))],br.prototype,"noninteractive",void 0),o([ar({type:Boolean,reflect:!0}),yr((function(e){const t=this.getAttribute("role"),r="gridcell"===t||"option"===t||"row"===t||"tab"===t;r&&e?this.setAttribute("aria-selected","true"):r&&this.setAttribute("aria-selected","false"),this._firstChanged?this._firstChanged=!1:this._skipPropRequest||this.fireRequestSelected(e,"property")}))],br.prototype,"selected",void 0),o([sr()],br.prototype,"shouldRenderRipple",void 0),o([sr()],br.prototype,"_managingList",void 0);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const vr=gr`:host{cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;height:48px;display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mdc-list-side-padding, 16px);padding-right:var(--mdc-list-side-padding, 16px);outline:none;height:48px;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host:focus{outline:none}:host([activated]){color:#6200ee;color:var(--mdc-theme-primary, #6200ee);--mdc-ripple-color: var( --mdc-theme-primary, #6200ee )}:host([activated]) .mdc-deprecated-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host([activated]) .fake-activated-ripple::before{position:absolute;display:block;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;z-index:1;content:"";opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12);background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;display:inline-flex}.mdc-deprecated-list-item__graphic ::slotted(*){flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;width:100%;height:100%;text-align:center}.mdc-deprecated-list-item__meta{width:var(--mdc-list-item-meta-size, 24px);height:var(--mdc-list-item-meta-size, 24px);margin-left:auto;margin-right:0;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta.multi{width:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:var(--mdc-list-item-meta-size, 24px);line-height:var(--mdc-list-item-meta-size, 24px)}.mdc-deprecated-list-item__meta ::slotted(.material-icons),.mdc-deprecated-list-item__meta ::slotted(mwc-icon){line-height:var(--mdc-list-item-meta-size, 24px) !important}.mdc-deprecated-list-item__meta ::slotted(:not(.material-icons):not(mwc-icon)){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}[dir=rtl] .mdc-deprecated-list-item__meta,.mdc-deprecated-list-item__meta[dir=rtl]{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:100%;height:100%}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text ::slotted([for]),.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;display:block}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}* ::slotted(a),a{color:inherit;text-decoration:none}:host([twoline]){height:72px}:host([twoline]) .mdc-deprecated-list-item__text{align-self:flex-start}:host([disabled]),:host([noninteractive]){cursor:default;pointer-events:none}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*){opacity:.38}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__primary-text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__secondary-text ::slotted(*){color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item__secondary-text ::slotted(*){color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic ::slotted(*){background-color:transparent;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader ::slotted(*){color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 40px);height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 40px);line-height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 40px) !important}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){border-radius:50%}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 16px)}[dir=rtl] :host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=avatar]) .mdc-deprecated-list-item__graphic[dir=rtl],[dir=rtl] :host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic[dir=rtl],[dir=rtl] :host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic[dir=rtl],[dir=rtl] :host([graphic=control]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 16px);margin-right:0}:host([graphic=icon]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 24px);height:var(--mdc-list-item-graphic-size, 24px);margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 32px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 24px);line-height:var(--mdc-list-item-graphic-size, 24px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 24px) !important}[dir=rtl] :host([graphic=icon]) .mdc-deprecated-list-item__graphic,:host([graphic=icon]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 32px);margin-right:0}:host([graphic=avatar]:not([twoLine])),:host([graphic=icon]:not([twoLine])){height:56px}:host([graphic=medium]:not([twoLine])),:host([graphic=large]:not([twoLine])){height:72px}:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 56px);height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic.multi,:host([graphic=large]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(*),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 56px);line-height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 56px) !important}:host([graphic=large]){padding-left:0px}`
/**
@license
Copyright 2020 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/;let xr=class extends br{};xr.styles=vr,xr=o([ir("mwc-list-item")],xr);
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var _r=new Set;_r.add("Backspace"),_r.add("Enter"),_r.add("Spacebar"),_r.add("PageUp"),_r.add("PageDown"),_r.add("End"),_r.add("Home"),_r.add("ArrowLeft"),_r.add("ArrowUp"),_r.add("ArrowRight"),_r.add("ArrowDown"),_r.add("Delete"),_r.add("Escape"),_r.add("Tab");var wr=new Map;wr.set(8,"Backspace"),wr.set(13,"Enter"),wr.set(32,"Spacebar"),wr.set(33,"PageUp"),wr.set(34,"PageDown"),wr.set(35,"End"),wr.set(36,"Home"),wr.set(37,"ArrowLeft"),wr.set(38,"ArrowUp"),wr.set(39,"ArrowRight"),wr.set(40,"ArrowDown"),wr.set(46,"Delete"),wr.set(27,"Escape"),wr.set(9,"Tab");var Sr,Cr,kr=new Set;function Er(e){var t=e.key;return _r.has(t)?t:wr.get(e.keyCode)||"Unknown"}
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */kr.add("PageUp"),kr.add("PageDown"),kr.add("End"),kr.add("Home"),kr.add("ArrowLeft"),kr.add("ArrowUp"),kr.add("ArrowRight"),kr.add("ArrowDown");(Sr={})["mdc-list-item--activated"]="mdc-list-item--activated",Sr["mdc-list-item"]="mdc-list-item",Sr["mdc-list-item--disabled"]="mdc-list-item--disabled",Sr["mdc-list-item--selected"]="mdc-list-item--selected",Sr["mdc-list-item__primary-text"]="mdc-list-item__primary-text",Sr["mdc-list"]="mdc-list";var Tr=((Cr={})["mdc-list-item--activated"]="mdc-deprecated-list-item--activated",Cr["mdc-list-item"]="mdc-deprecated-list-item",Cr["mdc-list-item--disabled"]="mdc-deprecated-list-item--disabled",Cr["mdc-list-item--selected"]="mdc-deprecated-list-item--selected",Cr["mdc-list-item__text"]="mdc-deprecated-list-item__text",Cr["mdc-list-item__primary-text"]="mdc-deprecated-list-item__primary-text",Cr["mdc-list"]="mdc-deprecated-list",Cr),Or={ACTION_EVENT:"MDCList:action",ARIA_CHECKED:"aria-checked",ARIA_CHECKED_CHECKBOX_SELECTOR:'[role="checkbox"][aria-checked="true"]',ARIA_CHECKED_RADIO_SELECTOR:'[role="radio"][aria-checked="true"]',ARIA_CURRENT:"aria-current",ARIA_DISABLED:"aria-disabled",ARIA_ORIENTATION:"aria-orientation",ARIA_ORIENTATION_HORIZONTAL:"horizontal",ARIA_ROLE_CHECKBOX_SELECTOR:'[role="checkbox"]',ARIA_SELECTED:"aria-selected",ARIA_INTERACTIVE_ROLES_SELECTOR:'[role="listbox"], [role="menu"]',ARIA_MULTI_SELECTABLE_SELECTOR:'[aria-multiselectable="true"]',CHECKBOX_RADIO_SELECTOR:'input[type="checkbox"], input[type="radio"]',CHECKBOX_SELECTOR:'input[type="checkbox"]',CHILD_ELEMENTS_TO_TOGGLE_TABINDEX:"\n    .mdc-list-item button:not(:disabled),\n    .mdc-list-item a,\n    ."+Tr["mdc-list-item"]+" button:not(:disabled),\n    ."+Tr["mdc-list-item"]+" a\n  ",DEPRECATED_SELECTOR:".mdc-deprecated-list",FOCUSABLE_CHILD_ELEMENTS:'\n    .mdc-list-item button:not(:disabled),\n    .mdc-list-item a,\n    .mdc-list-item input[type="radio"]:not(:disabled),\n    .mdc-list-item input[type="checkbox"]:not(:disabled),\n    .'+Tr["mdc-list-item"]+" button:not(:disabled),\n    ."+Tr["mdc-list-item"]+" a,\n    ."+Tr["mdc-list-item"]+' input[type="radio"]:not(:disabled),\n    .'+Tr["mdc-list-item"]+' input[type="checkbox"]:not(:disabled)\n  ',RADIO_SELECTOR:'input[type="radio"]',SELECTED_ITEM_SELECTOR:'[aria-selected="true"], [aria-current="true"]'},Pr={UNSET_INDEX:-1,TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS:300};
/**
 @license
 Copyright 2020 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
const Ar=(e,t)=>e-t,Rr=["input","button","textarea","select"];function Lr(e){return e instanceof Set}const Ir=e=>{const t=e===Pr.UNSET_INDEX?new Set:e;return Lr(t)?new Set(t):new Set([t])};class Mr extends Pt{constructor(e){super(Object.assign(Object.assign({},Mr.defaultAdapter),e)),this.isMulti_=!1,this.wrapFocus_=!1,this.isVertical_=!0,this.selectedIndex_=Pr.UNSET_INDEX,this.focusedItemIndex_=Pr.UNSET_INDEX,this.useActivatedClass_=!1,this.ariaCurrentAttrValue_=null}static get strings(){return Or}static get numbers(){return Pr}static get defaultAdapter(){return{focusItemAtIndex:()=>{},getFocusedElementIndex:()=>0,getListItemCount:()=>0,isFocusInsideList:()=>!1,isRootFocused:()=>!1,notifyAction:()=>{},notifySelected:()=>{},getSelectedStateForElementIndex:()=>!1,setDisabledStateForElementIndex:()=>{},getDisabledStateForElementIndex:()=>!1,setSelectedStateForElementIndex:()=>{},setActivatedStateForElementIndex:()=>{},setTabIndexForElementIndex:()=>{},setAttributeForElementIndex:()=>{},getAttributeForElementIndex:()=>null}}setWrapFocus(e){this.wrapFocus_=e}setMulti(e){this.isMulti_=e;const t=this.selectedIndex_;if(e){if(!Lr(t)){const e=t===Pr.UNSET_INDEX;this.selectedIndex_=e?new Set:new Set([t])}}else if(Lr(t))if(t.size){const e=Array.from(t).sort(Ar);this.selectedIndex_=e[0]}else this.selectedIndex_=Pr.UNSET_INDEX}setVerticalOrientation(e){this.isVertical_=e}setUseActivatedClass(e){this.useActivatedClass_=e}getSelectedIndex(){return this.selectedIndex_}setSelectedIndex(e){this.isIndexValid_(e)&&(this.isMulti_?this.setMultiSelectionAtIndex_(Ir(e)):this.setSingleSelectionAtIndex_(e))}handleFocusIn(e,t){t>=0&&this.adapter.setTabIndexForElementIndex(t,0)}handleFocusOut(e,t){t>=0&&this.adapter.setTabIndexForElementIndex(t,-1),setTimeout((()=>{this.adapter.isFocusInsideList()||this.setTabindexToFirstSelectedItem_()}),0)}handleKeydown(e,t,r){const o="ArrowLeft"===Er(e),i="ArrowUp"===Er(e),n="ArrowRight"===Er(e),a="ArrowDown"===Er(e),s="Home"===Er(e),l="End"===Er(e),d="Enter"===Er(e),c="Spacebar"===Er(e);if(this.adapter.isRootFocused())return void(i||l?(e.preventDefault(),this.focusLastElement()):(a||s)&&(e.preventDefault(),this.focusFirstElement()));let p,u=this.adapter.getFocusedElementIndex();if(!(-1===u&&(u=r,u<0))){if(this.isVertical_&&a||!this.isVertical_&&n)this.preventDefaultEvent(e),p=this.focusNextElement(u);else if(this.isVertical_&&i||!this.isVertical_&&o)this.preventDefaultEvent(e),p=this.focusPrevElement(u);else if(s)this.preventDefaultEvent(e),p=this.focusFirstElement();else if(l)this.preventDefaultEvent(e),p=this.focusLastElement();else if((d||c)&&t){const t=e.target;if(t&&"A"===t.tagName&&d)return;this.preventDefaultEvent(e),this.setSelectedIndexOnAction_(u,!0)}this.focusedItemIndex_=u,void 0!==p&&(this.setTabindexAtIndex_(p),this.focusedItemIndex_=p)}}handleSingleSelection(e,t,r){e!==Pr.UNSET_INDEX&&(this.setSelectedIndexOnAction_(e,t,r),this.setTabindexAtIndex_(e),this.focusedItemIndex_=e)}focusNextElement(e){let t=e+1;if(t>=this.adapter.getListItemCount()){if(!this.wrapFocus_)return e;t=0}return this.adapter.focusItemAtIndex(t),t}focusPrevElement(e){let t=e-1;if(t<0){if(!this.wrapFocus_)return e;t=this.adapter.getListItemCount()-1}return this.adapter.focusItemAtIndex(t),t}focusFirstElement(){return this.adapter.focusItemAtIndex(0),0}focusLastElement(){const e=this.adapter.getListItemCount()-1;return this.adapter.focusItemAtIndex(e),e}setEnabled(e,t){this.isIndexValid_(e)&&this.adapter.setDisabledStateForElementIndex(e,!t)}preventDefaultEvent(e){const t=(""+e.target.tagName).toLowerCase();-1===Rr.indexOf(t)&&e.preventDefault()}setSingleSelectionAtIndex_(e,t=!0){this.selectedIndex_!==e&&(this.selectedIndex_!==Pr.UNSET_INDEX&&(this.adapter.setSelectedStateForElementIndex(this.selectedIndex_,!1),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(this.selectedIndex_,!1)),t&&this.adapter.setSelectedStateForElementIndex(e,!0),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(e,!0),this.setAriaForSingleSelectionAtIndex_(e),this.selectedIndex_=e,this.adapter.notifySelected(e))}setMultiSelectionAtIndex_(e,t=!0){const r=((e,t)=>{const r=Array.from(e),o=Array.from(t),i={added:[],removed:[]},n=r.sort(Ar),a=o.sort(Ar);let s=0,l=0;for(;s<n.length||l<a.length;){const e=n[s],t=a[l];e!==t?void 0!==e&&(void 0===t||e<t)?(i.removed.push(e),s++):void 0!==t&&(void 0===e||t<e)&&(i.added.push(t),l++):(s++,l++)}return i})(Ir(this.selectedIndex_),e);if(r.removed.length||r.added.length){for(const e of r.removed)t&&this.adapter.setSelectedStateForElementIndex(e,!1),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(e,!1);for(const e of r.added)t&&this.adapter.setSelectedStateForElementIndex(e,!0),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(e,!0);this.selectedIndex_=e,this.adapter.notifySelected(e,r)}}setAriaForSingleSelectionAtIndex_(e){this.selectedIndex_===Pr.UNSET_INDEX&&(this.ariaCurrentAttrValue_=this.adapter.getAttributeForElementIndex(e,Or.ARIA_CURRENT));const t=null!==this.ariaCurrentAttrValue_,r=t?Or.ARIA_CURRENT:Or.ARIA_SELECTED;this.selectedIndex_!==Pr.UNSET_INDEX&&this.adapter.setAttributeForElementIndex(this.selectedIndex_,r,"false");const o=t?this.ariaCurrentAttrValue_:"true";this.adapter.setAttributeForElementIndex(e,r,o)}setTabindexAtIndex_(e){this.focusedItemIndex_===Pr.UNSET_INDEX&&0!==e?this.adapter.setTabIndexForElementIndex(0,-1):this.focusedItemIndex_>=0&&this.focusedItemIndex_!==e&&this.adapter.setTabIndexForElementIndex(this.focusedItemIndex_,-1),this.adapter.setTabIndexForElementIndex(e,0)}setTabindexToFirstSelectedItem_(){let e=0;"number"==typeof this.selectedIndex_&&this.selectedIndex_!==Pr.UNSET_INDEX?e=this.selectedIndex_:Lr(this.selectedIndex_)&&this.selectedIndex_.size>0&&(e=Math.min(...this.selectedIndex_)),this.setTabindexAtIndex_(e)}isIndexValid_(e){if(e instanceof Set){if(!this.isMulti_)throw Error("MDCListFoundation: Array of index is only supported for checkbox based list");if(0===e.size)return!0;{let t=!1;for(const r of e)if(t=this.isIndexInRange_(r),t)break;return t}}if("number"==typeof e){if(this.isMulti_)throw Error("MDCListFoundation: Expected array of index for checkbox based list but got number: "+e);return e===Pr.UNSET_INDEX||this.isIndexInRange_(e)}return!1}isIndexInRange_(e){const t=this.adapter.getListItemCount();return e>=0&&e<t}setSelectedIndexOnAction_(e,t,r){if(this.adapter.getDisabledStateForElementIndex(e))return;let o=e;this.isMulti_&&(o=new Set([e])),this.isIndexValid_(o)&&(this.isMulti_?this.toggleMultiAtIndex(e,r,t):t||r?this.setSingleSelectionAtIndex_(e,t):this.selectedIndex_===e&&this.setSingleSelectionAtIndex_(Pr.UNSET_INDEX),t&&this.adapter.notifyAction(e))}toggleMultiAtIndex(e,t,r=!0){let o=!1;o=void 0===t?!this.adapter.getSelectedStateForElementIndex(e):t;const i=Ir(this.selectedIndex_);o?i.add(e):i.delete(e),this.setMultiSelectionAtIndex_(i,r)}}const Nr=e=>e.hasAttribute("mwc-list-item");function zr(){const e=this.itemsReadyResolver;this.itemsReady=new Promise((e=>this.itemsReadyResolver=e)),e()}class Fr extends Ot{constructor(){super(),this.mdcAdapter=null,this.mdcFoundationClass=Mr,this.activatable=!1,this.multi=!1,this.wrapFocus=!1,this.itemRoles=null,this.innerRole=null,this.innerAriaLabel=null,this.rootTabbable=!1,this.previousTabindex=null,this.noninteractive=!1,this.itemsReadyResolver=()=>{},this.itemsReady=Promise.resolve([]),this.items_=[];const e=function(e,t=50){let r;return function(o=!0){clearTimeout(r),r=setTimeout((()=>{e(o)}),t)}}(this.layout.bind(this));this.debouncedLayout=(t=!0)=>{zr.call(this),e(t)}}async _getUpdateComplete(){let e=!1;return super._getUpdateComplete?await super._getUpdateComplete():e=await super.getUpdateComplete(),await this.itemsReady,e}async getUpdateComplete(){return this._getUpdateComplete()}get assignedElements(){const e=this.slotElement;return e?e.assignedNodes({flatten:!0}).filter(wt):[]}get items(){return this.items_}updateItems(){const e=this.assignedElements,t=[];for(const r of e)Nr(r)&&(t.push(r),r._managingList=this),r.hasAttribute("divider")&&!r.hasAttribute("role")&&r.setAttribute("role","separator");this.items_=t;const r=new Set;if(this.items_.forEach(((e,t)=>{this.itemRoles?e.setAttribute("role",this.itemRoles):e.removeAttribute("role"),e.selected&&r.add(t)})),this.multi)this.select(r);else{const e=r.size?r.entries().next().value[1]:-1;this.select(e)}const o=new Event("items-updated",{bubbles:!0,composed:!0});this.dispatchEvent(o)}get selected(){const e=this.index;if(!Lr(e))return-1===e?null:this.items[e];const t=[];for(const r of e)t.push(this.items[r]);return t}get index(){return this.mdcFoundation?this.mdcFoundation.getSelectedIndex():-1}render(){const e=null===this.innerRole?void 0:this.innerRole,t=null===this.innerAriaLabel?void 0:this.innerAriaLabel,r=this.rootTabbable?"0":"-1";return B`
      <!-- @ts-ignore -->
      <ul
          tabindex=${r}
          role="${Yt(e)}"
          aria-label="${Yt(t)}"
          class="mdc-deprecated-list"
          @keydown=${this.onKeydown}
          @focusin=${this.onFocusIn}
          @focusout=${this.onFocusOut}
          @request-selected=${this.onRequestSelected}
          @list-item-rendered=${this.onListItemConnected}>
        <slot></slot>
        ${this.renderPlaceholder()}
      </ul>
    `}renderPlaceholder(){return void 0!==this.emptyMessage&&0===this.assignedElements.length?B`
        <mwc-list-item noninteractive>${this.emptyMessage}</mwc-list-item>
      `:null}firstUpdated(){super.firstUpdated(),this.items.length||(this.mdcFoundation.setMulti(this.multi),this.layout())}onFocusIn(e){if(this.mdcFoundation&&this.mdcRoot){const t=this.getIndexOfTarget(e);this.mdcFoundation.handleFocusIn(e,t)}}onFocusOut(e){if(this.mdcFoundation&&this.mdcRoot){const t=this.getIndexOfTarget(e);this.mdcFoundation.handleFocusOut(e,t)}}onKeydown(e){if(this.mdcFoundation&&this.mdcRoot){const t=this.getIndexOfTarget(e),r=e.target,o=Nr(r);this.mdcFoundation.handleKeydown(e,o,t)}}onRequestSelected(e){if(this.mdcFoundation){let t=this.getIndexOfTarget(e);if(-1===t&&(this.layout(),t=this.getIndexOfTarget(e),-1===t))return;if(this.items[t].disabled)return;const r=e.detail.selected,o=e.detail.source;this.mdcFoundation.handleSingleSelection(t,"interaction"===o,r),e.stopPropagation()}}getIndexOfTarget(e){const t=this.items,r=e.composedPath();for(const e of r){let r=-1;if(wt(e)&&Nr(e)&&(r=t.indexOf(e)),-1!==r)return r}return-1}createAdapter(){return this.mdcAdapter={getListItemCount:()=>this.mdcRoot?this.items.length:0,getFocusedElementIndex:this.getFocusedItemIndex,getAttributeForElementIndex:(e,t)=>{if(!this.mdcRoot)return"";const r=this.items[e];return r?r.getAttribute(t):""},setAttributeForElementIndex:(e,t,r)=>{if(!this.mdcRoot)return;const o=this.items[e];o&&o.setAttribute(t,r)},focusItemAtIndex:e=>{const t=this.items[e];t&&t.focus()},setTabIndexForElementIndex:(e,t)=>{const r=this.items[e];r&&(r.tabindex=t)},notifyAction:e=>{const t={bubbles:!0,composed:!0};t.detail={index:e};const r=new CustomEvent("action",t);this.dispatchEvent(r)},notifySelected:(e,t)=>{const r={bubbles:!0,composed:!0};r.detail={index:e,diff:t};const o=new CustomEvent("selected",r);this.dispatchEvent(o)},isFocusInsideList:()=>Tt(this),isRootFocused:()=>{const e=this.mdcRoot;return e.getRootNode().activeElement===e},setDisabledStateForElementIndex:(e,t)=>{const r=this.items[e];r&&(r.disabled=t)},getDisabledStateForElementIndex:e=>{const t=this.items[e];return!!t&&t.disabled},setSelectedStateForElementIndex:(e,t)=>{const r=this.items[e];r&&(r.selected=t)},getSelectedStateForElementIndex:e=>{const t=this.items[e];return!!t&&t.selected},setActivatedStateForElementIndex:(e,t)=>{const r=this.items[e];r&&(r.activated=t)}},this.mdcAdapter}selectUi(e,t=!1){const r=this.items[e];r&&(r.selected=!0,r.activated=t)}deselectUi(e){const t=this.items[e];t&&(t.selected=!1,t.activated=!1)}select(e){this.mdcFoundation&&this.mdcFoundation.setSelectedIndex(e)}toggle(e,t){this.multi&&this.mdcFoundation.toggleMultiAtIndex(e,t)}onListItemConnected(e){const t=e.target;this.layout(-1===this.items.indexOf(t))}layout(e=!0){e&&this.updateItems();const t=this.items[0];for(const e of this.items)e.tabindex=-1;t&&(this.noninteractive?this.previousTabindex||(this.previousTabindex=t):t.tabindex=0),this.itemsReadyResolver()}getFocusedItemIndex(){if(!this.mdcRoot)return-1;if(!this.items.length)return-1;const e=Et();if(!e.length)return-1;for(let t=e.length-1;t>=0;t--){const r=e[t];if(Nr(r))return this.items.indexOf(r)}return-1}focusItemAtIndex(e){for(const e of this.items)if(0===e.tabindex){e.tabindex=-1;break}this.items[e].tabindex=0,this.items[e].focus()}focus(){const e=this.mdcRoot;e&&e.focus()}blur(){const e=this.mdcRoot;e&&e.blur()}}o([ar({type:String})],Fr.prototype,"emptyMessage",void 0),o([lr(".mdc-deprecated-list")],Fr.prototype,"mdcRoot",void 0),o([lr("slot")],Fr.prototype,"slotElement",void 0),o([ar({type:Boolean}),yr((function(e){this.mdcFoundation&&this.mdcFoundation.setUseActivatedClass(e)}))],Fr.prototype,"activatable",void 0),o([ar({type:Boolean}),yr((function(e,t){this.mdcFoundation&&this.mdcFoundation.setMulti(e),void 0!==t&&this.layout()}))],Fr.prototype,"multi",void 0),o([ar({type:Boolean}),yr((function(e){this.mdcFoundation&&this.mdcFoundation.setWrapFocus(e)}))],Fr.prototype,"wrapFocus",void 0),o([ar({type:String}),yr((function(e,t){void 0!==t&&this.updateItems()}))],Fr.prototype,"itemRoles",void 0),o([ar({type:String})],Fr.prototype,"innerRole",void 0),o([ar({type:String})],Fr.prototype,"innerAriaLabel",void 0),o([ar({type:Boolean})],Fr.prototype,"rootTabbable",void 0),o([ar({type:Boolean,reflect:!0}),yr((function(e){const t=this.slotElement;if(e&&t){const e=function(e,t){for(const t of e.assignedNodes({flatten:!0}))if(wt(t)){const e=t;if(ut(e,'[tabindex="0"]'))return e}return null}(t);this.previousTabindex=e,e&&e.setAttribute("tabindex","-1")}else!e&&this.previousTabindex&&(this.previousTabindex.setAttribute("tabindex","0"),this.previousTabindex=null)}))],Fr.prototype,"noninteractive",void 0);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const Ur=gr`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block}.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));padding:var(--mdc-list-vertical-padding, 8px) 0}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-deprecated-list ::slotted([divider]){height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list ::slotted([divider][padded]){margin:0 var(--mdc-list-side-padding, 16px)}.mdc-deprecated-list ::slotted([divider][inset]){margin-left:var(--mdc-list-inset-margin, 72px);margin-right:0;width:calc( 100% - var(--mdc-list-inset-margin, 72px) )}[dir=rtl] .mdc-deprecated-list ::slotted([divider][inset]),.mdc-deprecated-list ::slotted([divider][inset])[dir=rtl]{margin-left:0;margin-right:var(--mdc-list-inset-margin, 72px)}.mdc-deprecated-list ::slotted([divider][inset][padded]){width:calc( 100% - var(--mdc-list-inset-margin, 72px) - var(--mdc-list-side-padding, 16px) )}.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:40px}.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 20px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense ::slotted([mwc-list-item]),.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 36px}:host([noninteractive]){pointer-events:none;cursor:default}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text){display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}`
/**
@license
Copyright 2020 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/;let Dr=class extends Fr{};Dr.styles=Ur,Dr=o([ir("mwc-list")],Dr),window.JSCompiler_renameProperty=(e,t)=>e;const Hr={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},Br=(e,t)=>t!==e&&(t==t||e==e),Vr={attribute:!0,type:String,converter:Hr,reflect:!1,hasChanged:Br};class Wr extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=Vr){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Vr}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=Br){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||Hr,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||Hr.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=Vr){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Wr.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const jr=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function Kr(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):jr(e,t)}const qr=(e,t,r)=>{Object.defineProperty(t,r,e)},Jr=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),Zr=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Gr=Symbol();class Qr{constructor(e,t){if(t!==Gr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Zr?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Yr={};class Xr extends Wr{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!Zr){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Qr(t+"",Gr)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Zr?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Yr&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Yr}}Xr.finalized=!0,Xr.render=J,window.JSCompiler_renameProperty=(e,t)=>e;const $r={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},eo=(e,t)=>t!==e&&(t==t||e==e),to={attribute:!0,type:String,converter:$r,reflect:!1,hasChanged:eo};class ro extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=to){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||to}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=eo){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||$r,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||$r.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=to){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}ro.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const oo=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,io=Symbol();class no{constructor(e,t){if(t!==io)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(oo?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ao={};class so extends ro{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!oo){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new no(t+"",io)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?oo?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ao&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return ao}}so.finalized=!0,so.render=J;
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const lo=((e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof no)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new no(r,io)})`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;let co=class extends so{render(){return B`<slot></slot>`}};co.styles=lo,co=o([e=>{return"function"==typeof e?(t=e,window.customElements.define("mwc-icon",t),t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(e){window.customElements.define("mwc-icon",e)}}})(0,e);
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var t}],co);class po extends Xr{constructor(){super(...arguments),this.raised=!1,this.unelevated=!1,this.outlined=!1,this.dense=!1,this.disabled=!1,this.trailingIcon=!1,this.fullwidth=!1,this.icon="",this.label="",this.expandContent=!1,this.shouldRenderRipple=!1,this.rippleHandlers=new qt((()=>(this.shouldRenderRipple=!0,this.ripple)))}renderOverlay(){return B``}renderRipple(){const e=this.raised||this.unelevated;return this.shouldRenderRipple?B`<mwc-ripple class="ripple" .primary="${!e}" .disabled="${this.disabled}"></mwc-ripple>`:""}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}focus(){const e=this.buttonElement;e&&(this.rippleHandlers.startFocus(),e.focus())}blur(){const e=this.buttonElement;e&&(this.rippleHandlers.endFocus(),e.blur())}getRenderClasses(){return Dt({"mdc-button--raised":this.raised,"mdc-button--unelevated":this.unelevated,"mdc-button--outlined":this.outlined,"mdc-button--dense":this.dense})}render(){return B`
      <button
          id="button"
          class="mdc-button ${this.getRenderClasses()}"
          ?disabled="${this.disabled}"
          aria-label="${this.label||this.icon}"
          @focus="${this.handleRippleFocus}"
          @blur="${this.handleRippleBlur}"
          @mousedown="${this.handleRippleActivate}"
          @mouseenter="${this.handleRippleMouseEnter}"
          @mouseleave="${this.handleRippleMouseLeave}"
          @touchstart="${this.handleRippleActivate}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}">
        ${this.renderOverlay()}
        ${this.renderRipple()}
        <span class="leading-icon">
          <slot name="icon">
            ${this.icon&&!this.trailingIcon?this.renderIcon():""}
          </slot>
        </span>
        <span class="mdc-button__label">${this.label}</span>
        <span class="slot-container ${Dt({flex:this.expandContent})}">
          <slot></slot>
        </span>
        <span class="trailing-icon">
          <slot name="trailingIcon">
            ${this.icon&&this.trailingIcon?this.renderIcon():""}
          </slot>
        </span>
      </button>`}renderIcon(){return B`
    <mwc-icon class="mdc-button__icon">
      ${this.icon}
    </mwc-icon>`}handleRippleActivate(e){const t=()=>{window.removeEventListener("mouseup",t),this.handleRippleDeactivate()};window.addEventListener("mouseup",t),this.rippleHandlers.startPress(e)}handleRippleDeactivate(){this.rippleHandlers.endPress()}handleRippleMouseEnter(){this.rippleHandlers.startHover()}handleRippleMouseLeave(){this.rippleHandlers.endHover()}handleRippleFocus(){this.rippleHandlers.startFocus()}handleRippleBlur(){this.rippleHandlers.endFocus()}}o([Kr({type:Boolean,reflect:!0})],po.prototype,"raised",void 0),o([Kr({type:Boolean,reflect:!0})],po.prototype,"unelevated",void 0),o([Kr({type:Boolean,reflect:!0})],po.prototype,"outlined",void 0),o([Kr({type:Boolean})],po.prototype,"dense",void 0),o([Kr({type:Boolean,reflect:!0})],po.prototype,"disabled",void 0),o([Kr({type:Boolean,attribute:"trailingicon"})],po.prototype,"trailingIcon",void 0),o([Kr({type:Boolean,reflect:!0})],po.prototype,"fullwidth",void 0),o([Kr({type:String})],po.prototype,"icon",void 0),o([Kr({type:String})],po.prototype,"label",void 0),o([Kr({type:Boolean})],po.prototype,"expandContent",void 0),o([function(e,t){return(t,r)=>{const o={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};return void 0!==r?qr(o,t,r):Jr(o,t)}}("#button")],po.prototype,"buttonElement",void 0),o([(e,t)=>{const r={async get(){return await this.updateComplete,this.renderRoot.querySelector("mwc-ripple")},enumerable:!0,configurable:!0};return void 0!==t?qr(r,e,t):Jr(r,e)}],po.prototype,"ripple",void 0),o([Kr({attribute:!1,hasChanged:void 0})],po.prototype,"shouldRenderRipple",void 0),o([function(e){return(t,r)=>void 0!==r?((e,t,r)=>{Object.assign(t[r],e)})(e,t,r):((e,t)=>Object.assign(Object.assign({},t),{finisher(r){Object.assign(r.prototype[t.key],e)}}))(e,t)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/({passive:!0})],po.prototype,"handleRippleActivate",null);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const uo=((e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof Qr)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new Qr(r,Gr)})`.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;font-size:1.125rem;height:1.125rem;vertical-align:top;width:1.125rem}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}.mdc-button--outlined{border-style:solid}.mdc-button{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 8px 0 8px}.mdc-button:not(:disabled){background-color:transparent}.mdc-button:disabled{background-color:transparent}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px;height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0, 0, 0, 0.12)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--raised .mdc-button__ripple,.mdc-button--unelevated .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined:not(:disabled){background-color:transparent}.mdc-button--outlined:disabled{background-color:transparent}.mdc-button--outlined:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button--outlined:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--outlined .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined:disabled{border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined.mdc-button--icon-trailing{padding:0 11px 0 15px}.mdc-button--outlined.mdc-button--icon-leading{padding:0 15px 0 11px}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined .mdc-button__touch{left:-1px;width:calc(100% + 2 * 1px)}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:transparent;vertical-align:top}:host([fullwidth]){width:100%}:host([raised]),:host([unelevated]){--mdc-ripple-color:#fff;--mdc-ripple-focus-opacity:0.24;--mdc-ripple-hover-opacity:0.08;--mdc-ripple-press-opacity:0.24}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon,.leading-icon ::slotted(*),.leading-icon .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;font-size:1.125rem;height:1.125rem;vertical-align:top;width:1.125rem}[dir=rtl] .trailing-icon ::slotted(*),.trailing-icon ::slotted(*)[dir=rtl],[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon .mdc-button__icon[dir=rtl],[dir=rtl] .leading-icon ::slotted(*),.leading-icon ::slotted(*)[dir=rtl],[dir=rtl] .leading-icon .mdc-button__icon,.leading-icon .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .trailing-icon ::slotted(*),.trailing-icon ::slotted(*)[dir=rtl],[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon .mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}.slot-container{display:inline-flex;align-items:center;justify-content:center}.slot-container.flex{flex:auto}.mdc-button{flex:auto;overflow:hidden;padding-left:8px;padding-left:var(--mdc-button-horizontal-padding, 8px);padding-right:8px;padding-right:var(--mdc-button-horizontal-padding, 8px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-focus, var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)))}.mdc-button--raised:hover{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-active, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-disabled, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised,.mdc-button--unelevated{padding-left:16px;padding-left:var(--mdc-button-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mdc-button-horizontal-padding, 16px)}.mdc-button--outlined{border-width:1px;border-width:var(--mdc-button-outline-width, 1px);padding-left:calc(16px - 1px);padding-left:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));padding-right:calc(16px - 1px);padding-right:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px))}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-outline-color, rgba(0, 0, 0, 0.12))}.mdc-button--outlined .ripple{top:calc(-1 * 1px);top:calc(-1 * var(--mdc-button-outline-width, 1px));left:calc(-1 * 1px);left:calc(-1 * var(--mdc-button-outline-width, 1px));right:initial;right:initial;border-width:1px;border-width:var(--mdc-button-outline-width, 1px);border-style:solid;border-color:transparent}[dir=rtl] .mdc-button--outlined .ripple,.mdc-button--outlined .ripple[dir=rtl]{left:initial;left:initial;right:calc(-1 * 1px);right:calc(-1 * var(--mdc-button-outline-width, 1px))}.mdc-button--dense{height:28px;margin-top:0;margin-bottom:0}.mdc-button--dense .mdc-button__touch{display:none}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-button{color:rgba(0, 0, 0, 0.38);color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button--raised,:host([disabled]) .mdc-button--unelevated{background-color:rgba(0, 0, 0, 0.12);background-color:var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12))}:host([disabled]) .mdc-button--outlined{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-disabled-outline-color, rgba(0, 0, 0, 0.12))}`;let ho=class extends po{};ho.styles=uo,ho=o([e=>{return"function"==typeof e?(t=e,window.customElements.define("mwc-button",t),t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(e){window.customElements.define("mwc-button",e)}}})(0,e);var t}],ho),window.JSCompiler_renameProperty=(e,t)=>e;const go={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},mo=(e,t)=>t!==e&&(t==t||e==e),fo={attribute:!0,type:String,converter:go,reflect:!1,hasChanged:mo};class yo extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=fo){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||fo}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=mo){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||go,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||go.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=fo){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}yo.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const bo=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function vo(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):bo(e,t)}function xo(e){return vo({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}function _o(e,t){return(r,o)=>{const i={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof o?Symbol():"__"+o;i.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==o?wo(i,r,o):So(i,r)}}const wo=(e,t,r)=>{Object.defineProperty(t,r,e)},So=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),Co=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ko=Symbol();class Eo{constructor(e,t){if(t!==ko)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Co?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const To={};class Oo extends yo{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!Co){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Eo(t+"",ko)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Co?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==To&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return To}}Oo.finalized=!0,Oo.render=J,window.JSCompiler_renameProperty=(e,t)=>e;const Po={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},Ao=(e,t)=>t!==e&&(t==t||e==e),Ro={attribute:!0,type:String,converter:Po,reflect:!1,hasChanged:Ao};class Lo extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=Ro){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Ro}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=Ao){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||Po,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||Po.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=Ro){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Lo.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const Io=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function Mo(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):Io(e,t)}function No(e,t){return(r,o)=>{const i={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof o?Symbol():"__"+o;i.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==o?zo(i,r,o):Fo(i,r)}}const zo=(e,t,r)=>{Object.defineProperty(t,r,e)},Fo=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e})
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/,Uo=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Do=Symbol();class Ho{constructor(e,t){if(t!==Do)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Uo?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Bo={};class Vo extends Lo{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!Uo){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Ho(t+"",Do)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Uo?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Bo&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Bo}}Vo.finalized=!0,Vo.render=J;
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Wo={NOTCH_ELEMENT_SELECTOR:".mdc-notched-outline__notch"},jo={NOTCH_ELEMENT_PADDING:8},Ko={NO_LABEL:"mdc-notched-outline--no-label",OUTLINE_NOTCHED:"mdc-notched-outline--notched",OUTLINE_UPGRADED:"mdc-notched-outline--upgraded"},qo=function(e){function o(t){return e.call(this,r(r({},o.defaultAdapter),t))||this}return t(o,e),Object.defineProperty(o,"strings",{get:function(){return Wo},enumerable:!1,configurable:!0}),Object.defineProperty(o,"cssClasses",{get:function(){return Ko},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return jo},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},setNotchWidthProperty:function(){},removeNotchWidthProperty:function(){}}},enumerable:!1,configurable:!0}),o.prototype.notch=function(e){var t=o.cssClasses.OUTLINE_NOTCHED;e>0&&(e+=jo.NOTCH_ELEMENT_PADDING),this.adapter.setNotchWidthProperty(e),this.adapter.addClass(t)},o.prototype.closeNotch=function(){var e=o.cssClasses.OUTLINE_NOTCHED;this.adapter.removeClass(e),this.adapter.removeNotchWidthProperty()},o}(Pt);class Jo extends Ot{constructor(){super(...arguments),this.mdcFoundationClass=qo,this.width=0,this.open=!1,this.lastOpen=this.open}createAdapter(){return{addClass:e=>this.mdcRoot.classList.add(e),removeClass:e=>this.mdcRoot.classList.remove(e),setNotchWidthProperty:e=>this.notchElement.style.setProperty("width",e+"px"),removeNotchWidthProperty:()=>this.notchElement.style.removeProperty("width")}}openOrClose(e,t){this.mdcFoundation&&(e&&void 0!==t?this.mdcFoundation.notch(t):this.mdcFoundation.closeNotch())}render(){this.openOrClose(this.open,this.width);const e=Dt({"mdc-notched-outline--notched":this.open});return B`
      <span class="mdc-notched-outline ${e}">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
          <slot></slot>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>`}}o([No(".mdc-notched-outline")],Jo.prototype,"mdcRoot",void 0),o([Mo({type:Number})],Jo.prototype,"width",void 0),o([Mo({type:Boolean,reflect:!0})],Jo.prototype,"open",void 0),o([No(".mdc-notched-outline__notch")],Jo.prototype,"notchElement",void 0);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const Zo=((e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof Ho)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new Ho(r,Do)})`.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}:host{display:block;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] :host,:host[dir=rtl]{text-align:right}::slotted(.mdc-floating-label){display:inline-block;position:relative;top:17px;bottom:auto;max-width:100%}::slotted(.mdc-floating-label--float-above){text-overflow:clip}.mdc-notched-outline--upgraded ::slotted(.mdc-floating-label--float-above){max-width:calc(100% / 0.75)}.mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-notched-outline .mdc-notched-outline__leading,.mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-color:var(--mdc-notched-outline-border-color, var(--mdc-theme-primary, #6200ee));border-width:1px;border-width:var(--mdc-notched-outline-stroke-width, 1px)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0;padding-top:var(--mdc-notched-outline-notch-offset, 0)}`;let Go=class extends Jo{};Go.styles=Zo,Go=o([e=>{return"function"==typeof e?(t=e,window.customElements.define("mwc-notched-outline",t),t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(e){window.customElements.define("mwc-notched-outline",e)}}})(0,e);var t}],Go);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
class Qo extends Ot{createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}click(){this.formElement&&(this.formElement.focus(),this.formElement.click())}setAriaLabel(e){this.formElement&&this.formElement.setAttribute("aria-label",e)}firstUpdated(){super.firstUpdated(),this.shadowRoot&&this.mdcRoot.addEventListener("change",(e=>{this.dispatchEvent(new Event("change",e))}))}}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var Yo={LABEL_FLOAT_ABOVE:"mdc-floating-label--float-above",LABEL_REQUIRED:"mdc-floating-label--required",LABEL_SHAKE:"mdc-floating-label--shake",ROOT:"mdc-floating-label"},Xo=function(e){function o(t){var i=e.call(this,r(r({},o.defaultAdapter),t))||this;return i.shakeAnimationEndHandler_=function(){return i.handleShakeAnimationEnd_()},i}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return Yo},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},getWidth:function(){return 0},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.registerInteractionHandler("animationend",this.shakeAnimationEndHandler_)},o.prototype.destroy=function(){this.adapter.deregisterInteractionHandler("animationend",this.shakeAnimationEndHandler_)},o.prototype.getWidth=function(){return this.adapter.getWidth()},o.prototype.shake=function(e){var t=o.cssClasses.LABEL_SHAKE;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.float=function(e){var t=o.cssClasses,r=t.LABEL_FLOAT_ABOVE,i=t.LABEL_SHAKE;e?this.adapter.addClass(r):(this.adapter.removeClass(r),this.adapter.removeClass(i))},o.prototype.setRequired=function(e){var t=o.cssClasses.LABEL_REQUIRED;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.handleShakeAnimationEnd_=function(){var e=o.cssClasses.LABEL_SHAKE;this.adapter.removeClass(e)},o}(Pt);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */const $o=new WeakMap,ei=b((e=>t=>{if(!$o.get(t)){const r=t.committer.element;r.classList.add("mdc-floating-label");const o=(e=>({addClass:t=>e.classList.add(t),removeClass:t=>e.classList.remove(t),getWidth:()=>e.scrollWidth,registerInteractionHandler:(t,r)=>{e.addEventListener(t,r)},deregisterInteractionHandler:(t,r)=>{e.removeEventListener(t,r)}}))(r),i=new Xo(o);i.init(),t.setValue(i),$o.set(t,{label:e,foundation:i})}}));
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ti={LINE_RIPPLE_ACTIVE:"mdc-line-ripple--active",LINE_RIPPLE_DEACTIVATING:"mdc-line-ripple--deactivating"},ri=function(e){function o(t){var i=e.call(this,r(r({},o.defaultAdapter),t))||this;return i.transitionEndHandler_=function(e){return i.handleTransitionEnd(e)},i}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return ti},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setStyle:function(){},registerEventHandler:function(){},deregisterEventHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.registerEventHandler("transitionend",this.transitionEndHandler_)},o.prototype.destroy=function(){this.adapter.deregisterEventHandler("transitionend",this.transitionEndHandler_)},o.prototype.activate=function(){this.adapter.removeClass(ti.LINE_RIPPLE_DEACTIVATING),this.adapter.addClass(ti.LINE_RIPPLE_ACTIVE)},o.prototype.setRippleCenter=function(e){this.adapter.setStyle("transform-origin",e+"px center")},o.prototype.deactivate=function(){this.adapter.addClass(ti.LINE_RIPPLE_DEACTIVATING)},o.prototype.handleTransitionEnd=function(e){var t=this.adapter.hasClass(ti.LINE_RIPPLE_DEACTIVATING);"opacity"===e.propertyName&&t&&(this.adapter.removeClass(ti.LINE_RIPPLE_ACTIVE),this.adapter.removeClass(ti.LINE_RIPPLE_DEACTIVATING))},o}(Pt);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */const oi=new WeakMap,ii=b((()=>e=>{if(!oi.get(e)){const t=e.committer.element;t.classList.add("mdc-line-ripple");const r=(e=>({addClass:t=>e.classList.add(t),removeClass:t=>e.classList.remove(t),hasClass:t=>e.classList.contains(t),setStyle:(t,r)=>e.style.setProperty(t,r),registerEventHandler:(t,r)=>{e.addEventListener(t,r)},deregisterEventHandler:(t,r)=>{e.removeEventListener(t,r)}}))(t),o=new ri(r);o.init(),e.setValue(o),oi.set(e,o)}}));
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ni={ARIA_CONTROLS:"aria-controls",ARIA_DESCRIBEDBY:"aria-describedby",INPUT_SELECTOR:".mdc-text-field__input",LABEL_SELECTOR:".mdc-floating-label",LEADING_ICON_SELECTOR:".mdc-text-field__icon--leading",LINE_RIPPLE_SELECTOR:".mdc-line-ripple",OUTLINE_SELECTOR:".mdc-notched-outline",PREFIX_SELECTOR:".mdc-text-field__affix--prefix",SUFFIX_SELECTOR:".mdc-text-field__affix--suffix",TRAILING_ICON_SELECTOR:".mdc-text-field__icon--trailing"},ai={DISABLED:"mdc-text-field--disabled",FOCUSED:"mdc-text-field--focused",HELPER_LINE:"mdc-text-field-helper-line",INVALID:"mdc-text-field--invalid",LABEL_FLOATING:"mdc-text-field--label-floating",NO_LABEL:"mdc-text-field--no-label",OUTLINED:"mdc-text-field--outlined",ROOT:"mdc-text-field",TEXTAREA:"mdc-text-field--textarea",WITH_LEADING_ICON:"mdc-text-field--with-leading-icon",WITH_TRAILING_ICON:"mdc-text-field--with-trailing-icon"},si={LABEL_SCALE:.75},li=["pattern","min","max","required","step","minlength","maxlength"],di=["color","date","datetime-local","month","range","time","week"],ci=["mousedown","touchstart"],pi=["click","keydown"],ui=function(e){function o(t,i){void 0===i&&(i={});var n=e.call(this,r(r({},o.defaultAdapter),t))||this;return n.isFocused_=!1,n.receivedUserInput_=!1,n.isValid_=!0,n.useNativeValidation_=!0,n.validateOnValueChange_=!0,n.helperText_=i.helperText,n.characterCounter_=i.characterCounter,n.leadingIcon_=i.leadingIcon,n.trailingIcon_=i.trailingIcon,n.inputFocusHandler_=function(){return n.activateFocus()},n.inputBlurHandler_=function(){return n.deactivateFocus()},n.inputInputHandler_=function(){return n.handleInput()},n.setPointerXOffset_=function(e){return n.setTransformOrigin(e)},n.textFieldInteractionHandler_=function(){return n.handleTextFieldInteraction()},n.validationAttributeChangeHandler_=function(e){return n.handleValidationAttributeChange(e)},n}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return ai},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return ni},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return si},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"shouldAlwaysFloat_",{get:function(){var e=this.getNativeInput_().type;return di.indexOf(e)>=0},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"shouldFloat",{get:function(){return this.shouldAlwaysFloat_||this.isFocused_||!!this.getValue()||this.isBadInput_()},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"shouldShake",{get:function(){return!this.isFocused_&&!this.isValid()&&!!this.getValue()},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!0},setInputAttr:function(){},removeInputAttr:function(){},registerTextFieldInteractionHandler:function(){},deregisterTextFieldInteractionHandler:function(){},registerInputInteractionHandler:function(){},deregisterInputInteractionHandler:function(){},registerValidationAttributeChangeHandler:function(){return new MutationObserver((function(){}))},deregisterValidationAttributeChangeHandler:function(){},getNativeInput:function(){return null},isFocused:function(){return!1},activateLineRipple:function(){},deactivateLineRipple:function(){},setLineRippleTransformOrigin:function(){},shakeLabel:function(){},floatLabel:function(){},setLabelRequired:function(){},hasLabel:function(){return!1},getLabelWidth:function(){return 0},hasOutline:function(){return!1},notchOutline:function(){},closeOutline:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){var e=this;this.adapter.hasLabel()&&this.getNativeInput_().required&&this.adapter.setLabelRequired(!0),this.adapter.isFocused()?this.inputFocusHandler_():this.adapter.hasLabel()&&this.shouldFloat&&(this.notchOutline(!0),this.adapter.floatLabel(!0),this.styleFloating_(!0)),this.adapter.registerInputInteractionHandler("focus",this.inputFocusHandler_),this.adapter.registerInputInteractionHandler("blur",this.inputBlurHandler_),this.adapter.registerInputInteractionHandler("input",this.inputInputHandler_),ci.forEach((function(t){e.adapter.registerInputInteractionHandler(t,e.setPointerXOffset_)})),pi.forEach((function(t){e.adapter.registerTextFieldInteractionHandler(t,e.textFieldInteractionHandler_)})),this.validationObserver_=this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_),this.setCharacterCounter_(this.getValue().length)},o.prototype.destroy=function(){var e=this;this.adapter.deregisterInputInteractionHandler("focus",this.inputFocusHandler_),this.adapter.deregisterInputInteractionHandler("blur",this.inputBlurHandler_),this.adapter.deregisterInputInteractionHandler("input",this.inputInputHandler_),ci.forEach((function(t){e.adapter.deregisterInputInteractionHandler(t,e.setPointerXOffset_)})),pi.forEach((function(t){e.adapter.deregisterTextFieldInteractionHandler(t,e.textFieldInteractionHandler_)})),this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver_)},o.prototype.handleTextFieldInteraction=function(){var e=this.adapter.getNativeInput();e&&e.disabled||(this.receivedUserInput_=!0)},o.prototype.handleValidationAttributeChange=function(e){var t=this;e.some((function(e){return li.indexOf(e)>-1&&(t.styleValidity_(!0),t.adapter.setLabelRequired(t.getNativeInput_().required),!0)})),e.indexOf("maxlength")>-1&&this.setCharacterCounter_(this.getValue().length)},o.prototype.notchOutline=function(e){if(this.adapter.hasOutline()&&this.adapter.hasLabel())if(e){var t=this.adapter.getLabelWidth()*si.LABEL_SCALE;this.adapter.notchOutline(t)}else this.adapter.closeOutline()},o.prototype.activateFocus=function(){this.isFocused_=!0,this.styleFocused_(this.isFocused_),this.adapter.activateLineRipple(),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating_(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake)),!this.helperText_||!this.helperText_.isPersistent()&&this.helperText_.isValidation()&&this.isValid_||this.helperText_.showToScreenReader()},o.prototype.setTransformOrigin=function(e){if(!this.isDisabled()&&!this.adapter.hasOutline()){var t=e.touches,r=t?t[0]:e,o=r.target.getBoundingClientRect(),i=r.clientX-o.left;this.adapter.setLineRippleTransformOrigin(i)}},o.prototype.handleInput=function(){this.autoCompleteFocus(),this.setCharacterCounter_(this.getValue().length)},o.prototype.autoCompleteFocus=function(){this.receivedUserInput_||this.activateFocus()},o.prototype.deactivateFocus=function(){this.isFocused_=!1,this.adapter.deactivateLineRipple();var e=this.isValid();this.styleValidity_(e),this.styleFocused_(this.isFocused_),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating_(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake)),this.shouldFloat||(this.receivedUserInput_=!1)},o.prototype.getValue=function(){return this.getNativeInput_().value},o.prototype.setValue=function(e){if(this.getValue()!==e&&(this.getNativeInput_().value=e),this.setCharacterCounter_(e.length),this.validateOnValueChange_){var t=this.isValid();this.styleValidity_(t)}this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating_(this.shouldFloat),this.validateOnValueChange_&&this.adapter.shakeLabel(this.shouldShake))},o.prototype.isValid=function(){return this.useNativeValidation_?this.isNativeInputValid_():this.isValid_},o.prototype.setValid=function(e){this.isValid_=e,this.styleValidity_(e);var t=!e&&!this.isFocused_&&!!this.getValue();this.adapter.hasLabel()&&this.adapter.shakeLabel(t)},o.prototype.setValidateOnValueChange=function(e){this.validateOnValueChange_=e},o.prototype.getValidateOnValueChange=function(){return this.validateOnValueChange_},o.prototype.setUseNativeValidation=function(e){this.useNativeValidation_=e},o.prototype.isDisabled=function(){return this.getNativeInput_().disabled},o.prototype.setDisabled=function(e){this.getNativeInput_().disabled=e,this.styleDisabled_(e)},o.prototype.setHelperTextContent=function(e){this.helperText_&&this.helperText_.setContent(e)},o.prototype.setLeadingIconAriaLabel=function(e){this.leadingIcon_&&this.leadingIcon_.setAriaLabel(e)},o.prototype.setLeadingIconContent=function(e){this.leadingIcon_&&this.leadingIcon_.setContent(e)},o.prototype.setTrailingIconAriaLabel=function(e){this.trailingIcon_&&this.trailingIcon_.setAriaLabel(e)},o.prototype.setTrailingIconContent=function(e){this.trailingIcon_&&this.trailingIcon_.setContent(e)},o.prototype.setCharacterCounter_=function(e){if(this.characterCounter_){var t=this.getNativeInput_().maxLength;if(-1===t)throw Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");this.characterCounter_.setCounterValue(e,t)}},o.prototype.isBadInput_=function(){return this.getNativeInput_().validity.badInput||!1},o.prototype.isNativeInputValid_=function(){return this.getNativeInput_().validity.valid},o.prototype.styleValidity_=function(e){var t=o.cssClasses.INVALID;if(e?this.adapter.removeClass(t):this.adapter.addClass(t),this.helperText_){if(this.helperText_.setValidity(e),!this.helperText_.isValidation())return;var r=this.helperText_.isVisible(),i=this.helperText_.getId();r&&i?this.adapter.setInputAttr(ni.ARIA_DESCRIBEDBY,i):this.adapter.removeInputAttr(ni.ARIA_DESCRIBEDBY)}},o.prototype.styleFocused_=function(e){var t=o.cssClasses.FOCUSED;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.styleDisabled_=function(e){var t=o.cssClasses,r=t.DISABLED,i=t.INVALID;e?(this.adapter.addClass(r),this.adapter.removeClass(i)):this.adapter.removeClass(r),this.leadingIcon_&&this.leadingIcon_.setDisabled(e),this.trailingIcon_&&this.trailingIcon_.setDisabled(e)},o.prototype.styleFloating_=function(e){var t=o.cssClasses.LABEL_FLOATING;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.getNativeInput_=function(){return(this.adapter?this.adapter.getNativeInput():null)||{disabled:!1,maxLength:-1,required:!1,type:"input",validity:{badInput:!1,valid:!0},value:""}},o}(Pt);
/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
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
const hi=b((e=>t=>{let r;if(t instanceof N||t instanceof A)throw Error("The `live` directive is not allowed on text or event bindings");if(t instanceof R)gi(t.strings),r=t.element.hasAttribute(t.name),t.value=r;else{const{element:o,name:i,strings:n}=t.committer;if(gi(n),t instanceof I){if(r=o[i],r===e)return}else t instanceof P&&(r=o.getAttribute(i));if(r===e+"")return}t.setValue(e)})),gi=e=>{if(2!==e.length||""!==e[0]||""!==e[1])throw Error("`live` bindings can only contain a single expression")},mi=["touchstart","touchmove","scroll","mousewheel"],fi=(e={})=>{const t={};for(const r in e)t[r]=e[r];return Object.assign({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1},t)};class yi extends Qo{constructor(){super(...arguments),this.mdcFoundationClass=ui,this.value="",this.type="text",this.placeholder="",this.label="",this.icon="",this.iconTrailing="",this.disabled=!1,this.required=!1,this.minLength=-1,this.maxLength=-1,this.outlined=!1,this.helper="",this.validateOnInitialRender=!1,this.validationMessage="",this.autoValidate=!1,this.pattern="",this.min="",this.max="",this.step=null,this.size=null,this.helperPersistent=!1,this.charCounter=!1,this.endAligned=!1,this.prefix="",this.suffix="",this.name="",this.readOnly=!1,this.autocapitalize="",this.outlineOpen=!1,this.outlineWidth=0,this.isUiValid=!0,this.focused=!1,this._validity=fi(),this._outlineUpdateComplete=null,this.validityTransform=null}get validity(){return this._checkValidity(this.value),this._validity}get willValidate(){return this.formElement.willValidate}get selectionStart(){return this.formElement.selectionStart}get selectionEnd(){return this.formElement.selectionEnd}focus(){const e=new CustomEvent("focus");this.formElement.dispatchEvent(e),this.formElement.focus()}blur(){const e=new CustomEvent("blur");this.formElement.dispatchEvent(e),this.formElement.blur()}select(){this.formElement.select()}setSelectionRange(e,t,r){this.formElement.setSelectionRange(e,t,r)}update(e){e.has("autoValidate")&&this.mdcFoundation&&this.mdcFoundation.setValidateOnValueChange(this.autoValidate),e.has("value")&&"string"!=typeof this.value&&(this.value=""+this.value),super.update(e)}render(){const e=this.charCounter&&-1!==this.maxLength,t=!!this.helper||!!this.validationMessage||e,r={"mdc-text-field--disabled":this.disabled,"mdc-text-field--no-label":!this.label,"mdc-text-field--filled":!this.outlined,"mdc-text-field--outlined":this.outlined,"mdc-text-field--with-leading-icon":this.icon,"mdc-text-field--with-trailing-icon":this.iconTrailing,"mdc-text-field--end-aligned":this.endAligned};return B`
      <label class="mdc-text-field ${Dt(r)}">
        ${this.renderRipple()}
        ${this.outlined?this.renderOutline():this.renderLabel()}
        ${this.renderLeadingIcon()}
        ${this.renderPrefix()}
        ${this.renderInput(t)}
        ${this.renderSuffix()}
        ${this.renderTrailingIcon()}
        ${this.renderLineRipple()}
      </label>
      ${this.renderHelperText(t,e)}
    `}updated(e){e.has("value")&&void 0!==e.get("value")&&(this.mdcFoundation.setValue(this.value),this.autoValidate&&this.reportValidity())}renderRipple(){return this.outlined?"":B`
      <span class="mdc-text-field__ripple"></span>
    `}renderOutline(){return this.outlined?B`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>`:""}renderLabel(){return this.label?B`
      <span
          .floatingLabelFoundation=${ei(this.label)}
          id="label">${this.label}</span>
    `:""}renderLeadingIcon(){return this.icon?this.renderIcon(this.icon):""}renderTrailingIcon(){return this.iconTrailing?this.renderIcon(this.iconTrailing,!0):""}renderIcon(e,t=!1){return B`<i class="material-icons mdc-text-field__icon ${Dt({"mdc-text-field__icon--leading":!t,"mdc-text-field__icon--trailing":t})}">${e}</i>`}renderPrefix(){return this.prefix?this.renderAffix(this.prefix):""}renderSuffix(){return this.suffix?this.renderAffix(this.suffix,!0):""}renderAffix(e,t=!1){return B`<span class="mdc-text-field__affix ${Dt({"mdc-text-field__affix--prefix":!t,"mdc-text-field__affix--suffix":t})}">
        ${e}</span>`}renderInput(e){const t=-1===this.minLength?void 0:this.minLength,r=-1===this.maxLength?void 0:this.maxLength,o=this.autocapitalize?this.autocapitalize:void 0,i=this.validationMessage&&!this.isUiValid,n=e?"helper-text":void 0,a=this.focused||this.helperPersistent||i?"helper-text":void 0,s=i?"helper-text":void 0;return B`
      <input
          aria-labelledby="label"
          aria-controls="${Yt(n)}"
          aria-describedby="${Yt(a)}"
          aria-errortext="${Yt(s)}"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${hi(this.value)}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          minlength="${Yt(t)}"
          maxlength="${Yt(r)}"
          pattern="${Yt(this.pattern?this.pattern:void 0)}"
          min="${Yt(""===this.min?void 0:this.min)}"
          max="${Yt(""===this.max?void 0:this.max)}"
          step="${Yt(null===this.step?void 0:this.step)}"
          size="${Yt(null===this.size?void 0:this.size)}"
          name="${Yt(""===this.name?void 0:this.name)}"
          inputmode="${Yt(this.inputMode)}"
          autocapitalize="${Yt(o)}"
          @input="${this.handleInputChange}"
          @focus="${this.onInputFocus}"
          @blur="${this.onInputBlur}">`}renderLineRipple(){return this.outlined?"":B`
      <span .lineRippleFoundation=${ii()}></span>
    `}renderHelperText(e,t){const r=this.validationMessage&&!this.isUiValid,o={"mdc-text-field-helper-text--persistent":this.helperPersistent,"mdc-text-field-helper-text--validation-msg":r},i=this.focused||this.helperPersistent||r?void 0:"true",n=r?this.validationMessage:this.helper;return e?B`
      <div class="mdc-text-field-helper-line">
        <div id="helper-text"
             aria-hidden="${Yt(i)}"
             class="mdc-text-field-helper-text ${Dt(o)}"
             >${n}</div>
        ${this.renderCharCounter(t)}
      </div>`:""}renderCharCounter(e){const t=Math.min(this.value.length,this.maxLength);return e?B`
      <span class="mdc-text-field-character-counter"
            >${t} / ${this.maxLength}</span>`:""}onInputFocus(){this.focused=!0}onInputBlur(){this.focused=!1,this.reportValidity()}checkValidity(){const e=this._checkValidity(this.value);if(!e){const e=new Event("invalid",{bubbles:!1,cancelable:!0});this.dispatchEvent(e)}return e}reportValidity(){const e=this.checkValidity();return this.mdcFoundation.setValid(e),this.isUiValid=e,e}_checkValidity(e){const t=this.formElement.validity;let r=fi(t);if(this.validityTransform){const t=this.validityTransform(e,r);r=Object.assign(Object.assign({},r),t),this.mdcFoundation.setUseNativeValidation(!1)}else this.mdcFoundation.setUseNativeValidation(!0);return this._validity=r,this._validity.valid}setCustomValidity(e){this.validationMessage=e,this.formElement.setCustomValidity(e)}handleInputChange(){this.value=this.formElement.value}createFoundation(){void 0!==this.mdcFoundation&&this.mdcFoundation.destroy(),this.mdcFoundation=new this.mdcFoundationClass(this.createAdapter()),this.mdcFoundation.init()}createAdapter(){return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},this.getRootAdapterMethods()),this.getInputAdapterMethods()),this.getLabelAdapterMethods()),this.getLineRippleAdapterMethods()),this.getOutlineAdapterMethods())}getRootAdapterMethods(){return Object.assign({registerTextFieldInteractionHandler:(e,t)=>this.addEventListener(e,t),deregisterTextFieldInteractionHandler:(e,t)=>this.removeEventListener(e,t),registerValidationAttributeChangeHandler:e=>{const t=new MutationObserver((t=>{e((e=>e.map((e=>e.attributeName)).filter((e=>e)))(t))}));return t.observe(this.formElement,{attributes:!0}),t},deregisterValidationAttributeChangeHandler:e=>e.disconnect()},St(this.mdcRoot))}getInputAdapterMethods(){return{getNativeInput:()=>this.formElement,setInputAttr:()=>{},removeInputAttr:()=>{},isFocused:()=>!!this.shadowRoot&&this.shadowRoot.activeElement===this.formElement,registerInputInteractionHandler:(e,t)=>this.formElement.addEventListener(e,t,{passive:e in mi}),deregisterInputInteractionHandler:(e,t)=>this.formElement.removeEventListener(e,t)}}getLabelAdapterMethods(){return{floatLabel:e=>this.labelElement&&this.labelElement.floatingLabelFoundation.float(e),getLabelWidth:()=>this.labelElement?this.labelElement.floatingLabelFoundation.getWidth():0,hasLabel:()=>!!this.labelElement,shakeLabel:e=>this.labelElement&&this.labelElement.floatingLabelFoundation.shake(e),setLabelRequired:e=>{this.labelElement&&this.labelElement.floatingLabelFoundation.setRequired(e)}}}getLineRippleAdapterMethods(){return{activateLineRipple:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.activate()},deactivateLineRipple:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.deactivate()},setLineRippleTransformOrigin:e=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.setRippleCenter(e)}}}async _getUpdateComplete(){let e=!1;return super._getUpdateComplete?await super._getUpdateComplete():e=await super.getUpdateComplete(),await this._outlineUpdateComplete,e}async getUpdateComplete(){return this._getUpdateComplete()}async firstUpdated(){const e=this.outlineElement;e&&(this._outlineUpdateComplete=e.updateComplete,await this._outlineUpdateComplete),super.firstUpdated(),this.mdcFoundation.setValidateOnValueChange(this.autoValidate),this.validateOnInitialRender&&this.reportValidity()}getOutlineAdapterMethods(){return{closeOutline:()=>this.outlineElement&&(this.outlineOpen=!1),hasOutline:()=>!!this.outlineElement,notchOutline:e=>{this.outlineElement&&!this.outlineOpen&&(this.outlineWidth=e,this.outlineOpen=!0)}}}async layout(){await this.updateComplete;const e=this.labelElement;if(!e)return void(this.outlineOpen=!1);const t=!!this.label&&!!this.value;if(e.floatingLabelFoundation.float(t),!this.outlined)return;this.outlineOpen=t,await this.updateComplete;const r=e.floatingLabelFoundation.getWidth();this.outlineOpen&&(this.outlineWidth=r)}}o([_o(".mdc-text-field")],yi.prototype,"mdcRoot",void 0),o([_o("input")],yi.prototype,"formElement",void 0),o([_o(".mdc-floating-label")],yi.prototype,"labelElement",void 0),o([_o(".mdc-line-ripple")],yi.prototype,"lineRippleElement",void 0),o([_o("mwc-notched-outline")],yi.prototype,"outlineElement",void 0),o([_o(".mdc-notched-outline__notch")],yi.prototype,"notchElement",void 0),o([vo({type:String})],yi.prototype,"value",void 0),o([vo({type:String})],yi.prototype,"type",void 0),o([vo({type:String})],yi.prototype,"placeholder",void 0),o([vo({type:String}),yr((function(e,t){void 0!==t&&this.label!==t&&this.layout()}))],yi.prototype,"label",void 0),o([vo({type:String})],yi.prototype,"icon",void 0),o([vo({type:String})],yi.prototype,"iconTrailing",void 0),o([vo({type:Boolean,reflect:!0})],yi.prototype,"disabled",void 0),o([vo({type:Boolean})],yi.prototype,"required",void 0),o([vo({type:Number})],yi.prototype,"minLength",void 0),o([vo({type:Number})],yi.prototype,"maxLength",void 0),o([vo({type:Boolean,reflect:!0}),yr((function(e,t){void 0!==t&&this.outlined!==t&&this.layout()}))],yi.prototype,"outlined",void 0),o([vo({type:String})],yi.prototype,"helper",void 0),o([vo({type:Boolean})],yi.prototype,"validateOnInitialRender",void 0),o([vo({type:String})],yi.prototype,"validationMessage",void 0),o([vo({type:Boolean})],yi.prototype,"autoValidate",void 0),o([vo({type:String})],yi.prototype,"pattern",void 0),o([vo({type:String})],yi.prototype,"min",void 0),o([vo({type:String})],yi.prototype,"max",void 0),o([vo({type:Number})],yi.prototype,"step",void 0),o([vo({type:Number})],yi.prototype,"size",void 0),o([vo({type:Boolean})],yi.prototype,"helperPersistent",void 0),o([vo({type:Boolean})],yi.prototype,"charCounter",void 0),o([vo({type:Boolean})],yi.prototype,"endAligned",void 0),o([vo({type:String})],yi.prototype,"prefix",void 0),o([vo({type:String})],yi.prototype,"suffix",void 0),o([vo({type:String})],yi.prototype,"name",void 0),o([vo({type:String})],yi.prototype,"inputMode",void 0),o([vo({type:Boolean})],yi.prototype,"readOnly",void 0),o([vo({type:String})],yi.prototype,"autocapitalize",void 0),o([xo()],yi.prototype,"outlineOpen",void 0),o([xo()],yi.prototype,"outlineWidth",void 0),o([xo()],yi.prototype,"isUiValid",void 0),o([xo()],yi.prototype,"focused",void 0),o([function(e){return(t,r)=>void 0!==r?((e,t,r)=>{Object.assign(t[r],e)})(e,t,r):((e,t)=>Object.assign(Object.assign({},t),{finisher(r){Object.assign(r.prototype[t.key],e)}}))(e,t)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/({passive:!0})],yi.prototype,"handleInputChange",null);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const bi=((e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof Eo)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new Eo(r,ko)})`.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px;z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-text-field--filled{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-text-field--filled .mdc-text-field__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-text-field--filled .mdc-text-field__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-text-field--filled.mdc-ripple-upgraded--unbounded .mdc-text-field__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-activation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-deactivation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-text-field__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{color:rgba(0, 0, 0, 0.87)}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.54)}}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.54)}}.mdc-text-field .mdc-text-field__input{caret-color:#6200ee;caret-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field-character-counter,.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}.mdc-text-field__affix{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{background-color:rgba(0, 0, 0, 0.87);background-color:var(--mdc-ripple-color, rgba(0, 0, 0, 0.87))}.mdc-text-field--filled:hover .mdc-text-field__ripple::before,.mdc-text-field--filled.mdc-ripple-surface--hover .mdc-text-field__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:whitesmoke}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42)}.mdc-text-field--filled:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.38)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px, var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-text-field__ripple::before,.mdc-text-field--outlined .mdc-text-field__ripple::after{content:none}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:transparent}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0;transition:none}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px;line-height:1.5rem}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(98, 0, 238, 0.87)}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid .mdc-text-field__input{caret-color:#b00020;caret-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-text-field__input{color:rgba(0, 0, 0, 0.38)}@media all{.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.38)}}@media all{.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.38)}}.mdc-text-field--disabled .mdc-floating-label{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06)}.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.06)}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-floating-label{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--leading{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:GrayText}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled{background-color:#fafafa}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-text-field-helper-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;opacity:0;will-change:opacity;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-text-field-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-text-field-helper-text--persistent{transition:none;opacity:1;will-change:initial}.mdc-text-field-character-counter{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-left:auto;margin-right:0;padding-left:16px;padding-right:0;white-space:nowrap}.mdc-text-field-character-counter::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field__icon{align-self:center;cursor:pointer}.mdc-text-field__icon:not([tabindex]),.mdc-text-field__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-text-field__icon svg{display:block}.mdc-text-field__icon--leading{margin-left:16px;margin-right:8px}[dir=rtl] .mdc-text-field__icon--leading,.mdc-text-field__icon--leading[dir=rtl]{margin-left:8px;margin-right:16px}.mdc-text-field__icon--trailing{padding:12px;margin-left:0px;margin-right:0px}[dir=rtl] .mdc-text-field__icon--trailing,.mdc-text-field__icon--trailing[dir=rtl]{margin-left:0px;margin-right:0px}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-flex;flex-direction:column;outline:none}.mdc-text-field{width:100%}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42);border-bottom-color:var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42))}.mdc-text-field:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87);border-bottom-color:var(--mdc-text-field-hover-line-color, rgba(0, 0, 0, 0.87))}.mdc-text-field.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06);border-bottom-color:var(--mdc-text-field-disabled-line-color, rgba(0, 0, 0, 0.06))}.mdc-text-field.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-idle-border-color, rgba(0, 0, 0, 0.38) )}:host(:not([disabled]):hover) :not(.mdc-text-field--invalid):not(.mdc-text-field--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-hover-border-color, rgba(0, 0, 0, 0.87) )}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-error-color, var(--mdc-theme-error, #b00020) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-character-counter,:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid .mdc-text-field__icon{color:var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input{color:var(--mdc-text-field-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg),:host(:not([disabled])) .mdc-text-field-helper-line:not(.mdc-text-field--invalid) .mdc-text-field-character-counter{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-text-field.mdc-text-field--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-disabled-border-color, rgba(0, 0, 0, 0.06) )}:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field .mdc-text-field__input,:host([disabled]) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-helper-text,:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-character-counter{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}`
/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/;let vi=class extends yi{};vi.styles=bi,vi=o([e=>{return"function"==typeof e?(t=e,window.customElements.define("mwc-textfield",t),t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(e){window.customElements.define("mwc-textfield",e)}}})(0,e);var t}],vi),window.JSCompiler_renameProperty=(e,t)=>e;const xi={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},_i=(e,t)=>t!==e&&(t==t||e==e),wi={attribute:!0,type:String,converter:xi,reflect:!1,hasChanged:_i};class Si extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=wi){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||wi}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=_i){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||xi,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||xi.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=wi){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Si.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const Ci=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function ki(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):Ci(e,t)}function Ei(e){return ki({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}function Ti(e,t){return(r,o)=>{const i={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof o?Symbol():"__"+o;i.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==o?Oi(i,r,o):Pi(i,r)}}const Oi=(e,t,r)=>{Object.defineProperty(t,r,e)},Pi=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e})
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/,Ai=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ri=Symbol();class Li{constructor(e,t){if(t!==Ri)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Ai?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Ii={};class Mi extends Si{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!Ai){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Li(t+"",Ri)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Ai?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Ii&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Ii}}Mi.finalized=!0,Mi.render=J;
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Ni,zi,Fi={ANCHOR:"mdc-menu-surface--anchor",ANIMATING_CLOSED:"mdc-menu-surface--animating-closed",ANIMATING_OPEN:"mdc-menu-surface--animating-open",FIXED:"mdc-menu-surface--fixed",IS_OPEN_BELOW:"mdc-menu-surface--is-open-below",OPEN:"mdc-menu-surface--open",ROOT:"mdc-menu-surface"},Ui={CLOSED_EVENT:"MDCMenuSurface:closed",CLOSING_EVENT:"MDCMenuSurface:closing",OPENED_EVENT:"MDCMenuSurface:opened",FOCUSABLE_ELEMENTS:'button:not(:disabled), [href]:not([aria-disabled="true"]), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'},Di={TRANSITION_OPEN_DURATION:120,TRANSITION_CLOSE_DURATION:75,MARGIN_TO_EDGE:32,ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO:.67};!function(e){e[e.BOTTOM=1]="BOTTOM",e[e.CENTER=2]="CENTER",e[e.RIGHT=4]="RIGHT",e[e.FLIP_RTL=8]="FLIP_RTL"}(Ni||(Ni={})),function(e){e[e.TOP_LEFT=0]="TOP_LEFT",e[e.TOP_RIGHT=4]="TOP_RIGHT",e[e.BOTTOM_LEFT=1]="BOTTOM_LEFT",e[e.BOTTOM_RIGHT=5]="BOTTOM_RIGHT",e[e.TOP_START=8]="TOP_START",e[e.TOP_END=12]="TOP_END",e[e.BOTTOM_START=9]="BOTTOM_START",e[e.BOTTOM_END=13]="BOTTOM_END"}(zi||(zi={}));
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Hi=function(e){function o(t){var i=e.call(this,r(r({},o.defaultAdapter),t))||this;return i.isSurfaceOpen=!1,i.isQuickOpen=!1,i.isHoistedElement=!1,i.isFixedPosition=!1,i.isHorizontallyCenteredOnViewport=!1,i.maxHeight=0,i.openAnimationEndTimerId=0,i.closeAnimationEndTimerId=0,i.animationRequestId=0,i.anchorCorner=zi.TOP_START,i.originCorner=zi.TOP_START,i.anchorMargin={top:0,right:0,bottom:0,left:0},i.position={x:0,y:0},i}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return Fi},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return Ui},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return Di},enumerable:!1,configurable:!0}),Object.defineProperty(o,"Corner",{get:function(){return zi},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},hasAnchor:function(){return!1},isElementInContainer:function(){return!1},isFocused:function(){return!1},isRtl:function(){return!1},getInnerDimensions:function(){return{height:0,width:0}},getAnchorDimensions:function(){return null},getWindowDimensions:function(){return{height:0,width:0}},getBodyDimensions:function(){return{height:0,width:0}},getWindowScroll:function(){return{x:0,y:0}},setPosition:function(){},setMaxHeight:function(){},setTransformOrigin:function(){},saveFocus:function(){},restoreFocus:function(){},notifyClose:function(){},notifyOpen:function(){},notifyClosing:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){var e=o.cssClasses,t=e.ROOT,r=e.OPEN;if(!this.adapter.hasClass(t))throw Error(t+" class required in root element.");this.adapter.hasClass(r)&&(this.isSurfaceOpen=!0)},o.prototype.destroy=function(){clearTimeout(this.openAnimationEndTimerId),clearTimeout(this.closeAnimationEndTimerId),cancelAnimationFrame(this.animationRequestId)},o.prototype.setAnchorCorner=function(e){this.anchorCorner=e},o.prototype.flipCornerHorizontally=function(){this.originCorner=this.originCorner^Ni.RIGHT},o.prototype.setAnchorMargin=function(e){this.anchorMargin.top=e.top||0,this.anchorMargin.right=e.right||0,this.anchorMargin.bottom=e.bottom||0,this.anchorMargin.left=e.left||0},o.prototype.setIsHoisted=function(e){this.isHoistedElement=e},o.prototype.setFixedPosition=function(e){this.isFixedPosition=e},o.prototype.setAbsolutePosition=function(e,t){this.position.x=this.isFinite(e)?e:0,this.position.y=this.isFinite(t)?t:0},o.prototype.setIsHorizontallyCenteredOnViewport=function(e){this.isHorizontallyCenteredOnViewport=e},o.prototype.setQuickOpen=function(e){this.isQuickOpen=e},o.prototype.setMaxHeight=function(e){this.maxHeight=e},o.prototype.isOpen=function(){return this.isSurfaceOpen},o.prototype.open=function(){var e=this;this.isSurfaceOpen||(this.adapter.saveFocus(),this.isQuickOpen?(this.isSurfaceOpen=!0,this.adapter.addClass(o.cssClasses.OPEN),this.dimensions=this.adapter.getInnerDimensions(),this.autoposition(),this.adapter.notifyOpen()):(this.adapter.addClass(o.cssClasses.ANIMATING_OPEN),this.animationRequestId=requestAnimationFrame((function(){e.adapter.addClass(o.cssClasses.OPEN),e.dimensions=e.adapter.getInnerDimensions(),e.autoposition(),e.openAnimationEndTimerId=setTimeout((function(){e.openAnimationEndTimerId=0,e.adapter.removeClass(o.cssClasses.ANIMATING_OPEN),e.adapter.notifyOpen()}),Di.TRANSITION_OPEN_DURATION)})),this.isSurfaceOpen=!0))},o.prototype.close=function(e){var t=this;if(void 0===e&&(e=!1),this.isSurfaceOpen){if(this.adapter.notifyClosing(),this.isQuickOpen)return this.isSurfaceOpen=!1,e||this.maybeRestoreFocus(),this.adapter.removeClass(o.cssClasses.OPEN),this.adapter.removeClass(o.cssClasses.IS_OPEN_BELOW),void this.adapter.notifyClose();this.adapter.addClass(o.cssClasses.ANIMATING_CLOSED),requestAnimationFrame((function(){t.adapter.removeClass(o.cssClasses.OPEN),t.adapter.removeClass(o.cssClasses.IS_OPEN_BELOW),t.closeAnimationEndTimerId=setTimeout((function(){t.closeAnimationEndTimerId=0,t.adapter.removeClass(o.cssClasses.ANIMATING_CLOSED),t.adapter.notifyClose()}),Di.TRANSITION_CLOSE_DURATION)})),this.isSurfaceOpen=!1,e||this.maybeRestoreFocus()}},o.prototype.handleBodyClick=function(e){var t=e.target;this.adapter.isElementInContainer(t)||this.close()},o.prototype.handleKeydown=function(e){var t=e.keyCode;("Escape"===e.key||27===t)&&this.close()},o.prototype.autoposition=function(){var e;this.measurements=this.getAutoLayoutmeasurements();var t=this.getoriginCorner(),r=this.getMenuSurfaceMaxHeight(t),i=this.hasBit(t,Ni.BOTTOM)?"bottom":"top",n=this.hasBit(t,Ni.RIGHT)?"right":"left",a=this.getHorizontalOriginOffset(t),s=this.getVerticalOriginOffset(t),l=this.measurements,d=l.anchorSize,c=l.surfaceSize,p=((e={})[n]=a,e[i]=s,e);d.width/c.width>Di.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO&&(n="center"),(this.isHoistedElement||this.isFixedPosition)&&this.adjustPositionForHoistedElement(p),this.adapter.setTransformOrigin(n+" "+i),this.adapter.setPosition(p),this.adapter.setMaxHeight(r?r+"px":""),this.hasBit(t,Ni.BOTTOM)||this.adapter.addClass(o.cssClasses.IS_OPEN_BELOW)},o.prototype.getAutoLayoutmeasurements=function(){var e=this.adapter.getAnchorDimensions(),t=this.adapter.getBodyDimensions(),r=this.adapter.getWindowDimensions(),o=this.adapter.getWindowScroll();return e||(e={top:this.position.y,right:this.position.x,bottom:this.position.y,left:this.position.x,width:0,height:0}),{anchorSize:e,bodySize:t,surfaceSize:this.dimensions,viewportDistance:{top:e.top,right:r.width-e.right,bottom:r.height-e.bottom,left:e.left},viewportSize:r,windowScroll:o}},o.prototype.getoriginCorner=function(){var e,t,r=this.originCorner,i=this.measurements,n=i.viewportDistance,a=i.anchorSize,s=i.surfaceSize,l=o.numbers.MARGIN_TO_EDGE;this.hasBit(this.anchorCorner,Ni.BOTTOM)?(e=n.top-l+this.anchorMargin.bottom,t=n.bottom-l-this.anchorMargin.bottom):(e=n.top-l+this.anchorMargin.top,t=n.bottom-l+a.height-this.anchorMargin.top),!(t-s.height>0)&&e>t&&(r=this.setBit(r,Ni.BOTTOM));var d,c,p,u=this.adapter.isRtl(),h=this.hasBit(this.anchorCorner,Ni.FLIP_RTL),g=this.hasBit(this.anchorCorner,Ni.RIGHT)||this.hasBit(r,Ni.RIGHT);(p=u&&h?!g:g)?(d=n.left+a.width+this.anchorMargin.right,c=n.right-this.anchorMargin.right):(d=n.left+this.anchorMargin.left,c=n.right+a.width-this.anchorMargin.left);var m=d-s.width>0,f=c-s.width>0,y=this.hasBit(r,Ni.FLIP_RTL)&&this.hasBit(r,Ni.RIGHT);return f&&y&&u||!m&&y?r=this.unsetBit(r,Ni.RIGHT):(m&&p&&u||m&&!p&&g||!f&&d>=c)&&(r=this.setBit(r,Ni.RIGHT)),r},o.prototype.getMenuSurfaceMaxHeight=function(e){if(this.maxHeight>0)return this.maxHeight;var t=this.measurements.viewportDistance,r=0,i=this.hasBit(e,Ni.BOTTOM),n=this.hasBit(this.anchorCorner,Ni.BOTTOM),a=o.numbers.MARGIN_TO_EDGE;return i?(r=t.top+this.anchorMargin.top-a,n||(r+=this.measurements.anchorSize.height)):(r=t.bottom-this.anchorMargin.bottom+this.measurements.anchorSize.height-a,n&&(r-=this.measurements.anchorSize.height)),r},o.prototype.getHorizontalOriginOffset=function(e){var t=this.measurements.anchorSize,r=this.hasBit(e,Ni.RIGHT),o=this.hasBit(this.anchorCorner,Ni.RIGHT);if(r){var i=o?t.width-this.anchorMargin.left:this.anchorMargin.right;return this.isHoistedElement||this.isFixedPosition?i-(this.measurements.viewportSize.width-this.measurements.bodySize.width):i}return o?t.width-this.anchorMargin.right:this.anchorMargin.left},o.prototype.getVerticalOriginOffset=function(e){var t=this.measurements.anchorSize,r=this.hasBit(e,Ni.BOTTOM),o=this.hasBit(this.anchorCorner,Ni.BOTTOM);return r?o?t.height-this.anchorMargin.top:-this.anchorMargin.bottom:o?t.height+this.anchorMargin.bottom:this.anchorMargin.top},o.prototype.adjustPositionForHoistedElement=function(e){var t,r,o=this.measurements,i=o.windowScroll,n=o.viewportDistance,a=o.surfaceSize,s=o.viewportSize,l=Object.keys(e);try{for(var d=function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],o=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}(l),c=d.next();!c.done;c=d.next()){var p=c.value,u=e[p]||0;!this.isHorizontallyCenteredOnViewport||"left"!==p&&"right"!==p?(u+=n[p],this.isFixedPosition||("top"===p?u+=i.y:"bottom"===p?u-=i.y:"left"===p?u+=i.x:u-=i.x),e[p]=u):e[p]=(s.width-a.width)/2}}catch(e){t={error:e}}finally{try{c&&!c.done&&(r=d.return)&&r.call(d)}finally{if(t)throw t.error}}},o.prototype.maybeRestoreFocus=function(){var e=this.adapter.isFocused(),t=document.activeElement&&this.adapter.isElementInContainer(document.activeElement);(e||t)&&this.adapter.restoreFocus()},o.prototype.hasBit=function(e,t){return!!(e&t)},o.prototype.setBit=function(e,t){return e|t},o.prototype.unsetBit=function(e,t){return e^t},o.prototype.isFinite=function(e){return"number"==typeof e&&isFinite(e)},o}(Pt);const Bi={TOP_LEFT:zi.TOP_LEFT,TOP_RIGHT:zi.TOP_RIGHT,BOTTOM_LEFT:zi.BOTTOM_LEFT,BOTTOM_RIGHT:zi.BOTTOM_RIGHT,TOP_START:zi.TOP_START,TOP_END:zi.TOP_END,BOTTOM_START:zi.BOTTOM_START,BOTTOM_END:zi.BOTTOM_END};class Vi extends Ot{constructor(){super(...arguments),this.mdcFoundationClass=Hi,this.absolute=!1,this.fullwidth=!1,this.fixed=!1,this.x=null,this.y=null,this.quick=!1,this.open=!1,this.stayOpenOnBodyClick=!1,this.bitwiseCorner=zi.TOP_START,this.previousMenuCorner=null,this.menuCorner="START",this.corner="TOP_START",this.styleTop="",this.styleLeft="",this.styleRight="",this.styleBottom="",this.styleMaxHeight="",this.styleTransformOrigin="",this.anchor=null,this.previouslyFocused=null,this.previousAnchor=null,this.onBodyClickBound=()=>{}}render(){const e={"mdc-menu-surface--fixed":this.fixed,"mdc-menu-surface--fullwidth":this.fullwidth},t={top:this.styleTop,left:this.styleLeft,right:this.styleRight,bottom:this.styleBottom,"max-height":this.styleMaxHeight,"transform-origin":this.styleTransformOrigin};return B`
      <div
          class="mdc-menu-surface ${Dt(e)}"
          style="${Bt(t)}"
          @keydown=${this.onKeydown}
          @opened=${this.registerBodyClick}
          @closed=${this.deregisterBodyClick}>
        <slot></slot>
      </div>`}createAdapter(){return Object.assign(Object.assign({},St(this.mdcRoot)),{hasAnchor:()=>!!this.anchor,notifyClose:()=>{const e=new CustomEvent("closed",{bubbles:!0,composed:!0});this.open=!1,this.mdcRoot.dispatchEvent(e)},notifyClosing:()=>{const e=new CustomEvent("closing",{bubbles:!0,composed:!0});this.mdcRoot.dispatchEvent(e)},notifyOpen:()=>{const e=new CustomEvent("opened",{bubbles:!0,composed:!0});this.open=!0,this.mdcRoot.dispatchEvent(e)},isElementInContainer:()=>!1,isRtl:()=>!!this.mdcRoot&&"rtl"===getComputedStyle(this.mdcRoot).direction,setTransformOrigin:e=>{this.mdcRoot&&(this.styleTransformOrigin=e)},isFocused:()=>Tt(this),saveFocus:()=>{const e=Et(),t=e.length;t||(this.previouslyFocused=null),this.previouslyFocused=e[t-1]},restoreFocus:()=>{this.previouslyFocused&&"focus"in this.previouslyFocused&&this.previouslyFocused.focus()},getInnerDimensions:()=>{const e=this.mdcRoot;return e?{width:e.offsetWidth,height:e.offsetHeight}:{width:0,height:0}},getAnchorDimensions:()=>{const e=this.anchor;return e?e.getBoundingClientRect():null},getBodyDimensions:()=>({width:document.body.clientWidth,height:document.body.clientHeight}),getWindowDimensions:()=>({width:window.innerWidth,height:window.innerHeight}),getWindowScroll:()=>({x:window.pageXOffset,y:window.pageYOffset}),setPosition:e=>{this.mdcRoot&&(this.styleLeft="left"in e?e.left+"px":"",this.styleRight="right"in e?e.right+"px":"",this.styleTop="top"in e?e.top+"px":"",this.styleBottom="bottom"in e?e.bottom+"px":"")},setMaxHeight:async e=>{this.mdcRoot&&(this.styleMaxHeight=e,await this.updateComplete,this.styleMaxHeight=`var(--mdc-menu-max-height, ${e})`)}})}onKeydown(e){this.mdcFoundation&&this.mdcFoundation.handleKeydown(e)}onBodyClick(e){this.stayOpenOnBodyClick||-1===e.composedPath().indexOf(this)&&this.close()}registerBodyClick(){this.onBodyClickBound=this.onBodyClick.bind(this),document.body.addEventListener("click",this.onBodyClickBound,{passive:!0,capture:!0})}deregisterBodyClick(){document.body.removeEventListener("click",this.onBodyClickBound,{capture:!0})}close(){this.open=!1}show(){this.open=!0}}o([Ti(".mdc-menu-surface")],Vi.prototype,"mdcRoot",void 0),o([Ti("slot")],Vi.prototype,"slotElement",void 0),o([ki({type:Boolean}),yr((function(e){this.mdcFoundation&&!this.fixed&&this.mdcFoundation.setIsHoisted(e)}))],Vi.prototype,"absolute",void 0),o([ki({type:Boolean})],Vi.prototype,"fullwidth",void 0),o([ki({type:Boolean}),yr((function(e){this.mdcFoundation&&!this.absolute&&this.mdcFoundation.setFixedPosition(e)}))],Vi.prototype,"fixed",void 0),o([ki({type:Number}),yr((function(e){this.mdcFoundation&&null!==this.y&&null!==e&&(this.mdcFoundation.setAbsolutePosition(e,this.y),this.mdcFoundation.setAnchorMargin({left:e,top:this.y,right:-e,bottom:this.y}))}))],Vi.prototype,"x",void 0),o([ki({type:Number}),yr((function(e){this.mdcFoundation&&null!==this.x&&null!==e&&(this.mdcFoundation.setAbsolutePosition(this.x,e),this.mdcFoundation.setAnchorMargin({left:this.x,top:e,right:-this.x,bottom:e}))}))],Vi.prototype,"y",void 0),o([ki({type:Boolean}),yr((function(e){this.mdcFoundation&&this.mdcFoundation.setQuickOpen(e)}))],Vi.prototype,"quick",void 0),o([ki({type:Boolean,reflect:!0}),yr((function(e,t){this.mdcFoundation&&(e?this.mdcFoundation.open():void 0!==t&&this.mdcFoundation.close())}))],Vi.prototype,"open",void 0),o([ki({type:Boolean})],Vi.prototype,"stayOpenOnBodyClick",void 0),o([Ei(),yr((function(e){this.mdcFoundation&&this.mdcFoundation.setAnchorCorner(e)}))],Vi.prototype,"bitwiseCorner",void 0),o([ki({type:String}),yr((function(e){if(this.mdcFoundation){const t="START"===e||"END"===e,r=null===this.previousMenuCorner,o=!r&&e!==this.previousMenuCorner,i=r&&"END"===e;t&&(o||i)&&(this.bitwiseCorner=this.bitwiseCorner^Ni.RIGHT,this.mdcFoundation.flipCornerHorizontally(),this.previousMenuCorner=e)}}))],Vi.prototype,"menuCorner",void 0),o([ki({type:String}),yr((function(e){if(this.mdcFoundation&&e){let t=Bi[e];"END"===this.menuCorner&&(t^=Ni.RIGHT),this.bitwiseCorner=t}}))],Vi.prototype,"corner",void 0),o([Ei()],Vi.prototype,"styleTop",void 0),o([Ei()],Vi.prototype,"styleLeft",void 0),o([Ei()],Vi.prototype,"styleRight",void 0),o([Ei()],Vi.prototype,"styleBottom",void 0),o([Ei()],Vi.prototype,"styleMaxHeight",void 0),o([Ei()],Vi.prototype,"styleTransformOrigin",void 0);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const Wi=((e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof Li)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new Li(r,Ri)})`.mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-width:var(--mdc-menu-max-width, calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px));margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0, 0, 0.2, 1),height 250ms cubic-bezier(0, 0, 0.2, 1);box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);color:#000;color:var(--mdc-theme-on-surface, #000);border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity .075s linear}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}:host(:not([open])){display:none}.mdc-menu-surface{z-index:8;z-index:var(--mdc-menu-z-index, 8);min-width:112px;min-width:var(--mdc-menu-min-width, 112px)}`
/**
@license
Copyright 2020 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/;let ji=class extends Vi{};ji.styles=Wi,ji=o([e=>{return"function"==typeof e?(t=e,window.customElements.define("mwc-menu-surface",t),t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(e){window.customElements.define("mwc-menu-surface",e)}}})(0,e);var t}],ji);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Ki extends ce{set project(e){"string"==typeof e?requestAnimationFrame((()=>{var t;const r=this.getRootNode();this._project=null!==(t=r.getElementById(e))&&void 0!==t?t:void 0})):this._project=e}}o([ee()],Ki.prototype,"project",null),o([te()],Ki.prototype,"_project",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let qi=class extends Ki{constructor(){super(...arguments),this.state="closed",this._postStateChangeRenderDone=!1}update(e){e.has("state")&&(this._postStateChangeRenderDone=!1),super.update(e)}render(){return B`<mwc-menu-surface
      fixed
      quick
      .open=${"closed"!==this.state}
      .anchor=${this.anchorElement}
      corner="BOTTOM_START"
      .classList=${this.state}
      @closed=${this._onSurfaceClosed}
      ><div class="wrapper">${this._surfaceContents}</div></mwc-menu-surface
    >`}async updated(){if(!this._postStateChangeRenderDone){if("menu"===this.state){const e=this._menuList;e&&(await e.updateComplete,e.focusItemAtIndex(0))}else if("rename"===this.state||"newfile"===this.state){const e=this._filenameInput;e&&(await e.updateComplete,e.focus(),"rename"===this.state&&e.setSelectionRange(0,e.value.lastIndexOf(".")))}this._postStateChangeRenderDone=!0}}get _surfaceContents(){switch(this.state){case"closed":return _;case"menu":return this._menu;case"rename":return this._rename;case"newfile":return this._newFile}}get _menu(){return B`
      <mwc-list class="menu-list" @action=${this._onMenuAction}>
        <mwc-list-item graphic="icon">
          Rename
          <svg
            slot="graphic"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="currentcolor"
          >
            <path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
          </svg>
        </mwc-list-item>
        <mwc-list-item graphic="icon">
          Delete
          <svg
            slot="graphic"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentcolor"
          >
            <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
        </mwc-list-item>
      </mwc-list>
    `}get _rename(){return B`
      <mwc-textfield
        class="filename-input"
        label="Filename"
        .value=${this.filename||""}
        @input=${this._onFilenameInputChange}
        @keydown=${this._onFilenameInputKeydown}
      ></mwc-textfield>
      <div class="actions">
        <mwc-button outlined @click=${this._onClickCancel}>Cancel</mwc-button>
        <mwc-button
          raised
          class="submit-button"
          .disabled=${!this._filenameInputValid}
          @click=${this._onSubmitRename}
          >Rename</mwc-button
        >
      </div>
    `}get _newFile(){return B`
      <mwc-textfield
        class="filename-input"
        label="Filename"
        @input=${this._onFilenameInputChange}
        @keydown=${this._onFilenameInputKeydown}
      ></mwc-textfield>
      <div class="actions">
        <mwc-button outlined @click=${this._onClickCancel}>Cancel</mwc-button>
        <mwc-button
          raised
          class="submit-button"
          .disabled=${!this._filenameInputValid}
          @click=${this._onSubmitNewFile}
          >Create</mwc-button
        >
      </div>
    `}_onSurfaceClosed(){this.state="closed"}_onClickCancel(){this._surface.close()}_onMenuAction(e){switch(e.detail.index){case 0:return this._onMenuSelectRename();case 1:return this._onMenuSelectDelete()}}_onMenuSelectRename(){this.state="rename"}_onMenuSelectDelete(){this._surface.close(),this._project&&this.filename&&this._project.deleteFile(this.filename)}_onFilenameInputChange(){this.requestUpdate()}get _filenameInputValid(){return!!(this._project&&this._filenameInput&&this._project.isValidNewFilename(this._filenameInput.value))}_onFilenameInputKeydown(e){var t;"Enter"===e.key&&!1===(null===(t=this._submitButton)||void 0===t?void 0:t.disabled)&&(e.preventDefault(),this._submitButton.click())}_onSubmitRename(){var e;this._surface.close();const t=this.filename,r=null===(e=this._filenameInput)||void 0===e?void 0:e.value;this._project&&t&&r&&this._project.renameFile(t,r)}_onSubmitNewFile(){var e;this._surface.close();const t=null===(e=this._filenameInput)||void 0===e?void 0:e.value;this._project&&t&&(this._project.addFile(t),this.dispatchEvent(new CustomEvent("newFile",{detail:{filename:t}})))}};qi.styles=le`
    mwc-menu-surface {
      --mdc-theme-primary: var(
        var(
          --playground-floating-controls-color,
          var(--playground-highlight-color, #6200ee)
        )
      );
    }

    mwc-menu-surface.menu {
      --mdc-typography-subtitle1-font-size: 13px;
      --mdc-list-item-graphic-margin: 14px;
    }

    mwc-list-item {
      min-width: 100px;
      height: 40px;
    }

    mwc-menu-surface.rename > .wrapper,
    mwc-menu-surface.newfile > .wrapper {
      padding: 18px;
    }

    .actions {
      margin-top: 18px;
      display: flex;
      justify-content: flex-end;
    }

    .actions > * {
      margin-left: 12px;
    }
  `,o([ee({attribute:!1})],qi.prototype,"anchorElement",void 0),o([ee()],qi.prototype,"state",void 0),o([ee()],qi.prototype,"filename",void 0),o([re("mwc-menu-surface")],qi.prototype,"_surface",void 0),o([re(".menu-list")],qi.prototype,"_menuList",void 0),o([re(".filename-input")],qi.prototype,"_filenameInput",void 0),o([re(".submit-button")],qi.prototype,"_submitButton",void 0),qi=o([X("playground-file-system-controls")],qi);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Ji=class extends Ki{constructor(){super(...arguments),this.editableFileSystem=!1,this._activeFileName="",this._activeFileIndex=0,this._onProjectFilesChanged=()=>{this._setNewActiveFile(),this.requestUpdate()}}set editor(e){"string"==typeof e?requestAnimationFrame((()=>{var t;const r=this.getRootNode();this._editor=null!==(t=r.getElementById(e))&&void 0!==t?t:void 0})):this._editor=e}get _visibleFiles(){var e,t;return(null!==(t=null===(e=this._project)||void 0===e?void 0:e.files)&&void 0!==t?t:[]).filter((({hidden:e})=>!e))}update(e){if(e.has("_project")){const t=e.get("_project");t&&t.removeEventListener("filesChanged",this._onProjectFilesChanged),this._project&&(this._onProjectFilesChanged(),this._project.addEventListener("filesChanged",this._onProjectFilesChanged))}e.has("_activeFileName")&&this._editor&&(this._editor.filename=this._activeFileName,this._setNewActiveFile()),super.update(e)}render(){return B`
      <playground-internal-tab-bar
        @tabchange=${this._onTabchange}
        label="File selector"
      >
        ${this._visibleFiles.map((({name:e,label:t})=>B`<playground-internal-tab
              .active=${e===this._activeFileName}
              data-filename=${e}
            >
              ${t||e}
              ${this.editableFileSystem?B`<mwc-icon-button
                    label="File menu"
                    class="menu-button"
                    @click=${this._onOpenMenu}
                  >
                    <!-- Source: https://material.io/resources/icons/?icon=menu&style=baseline -->
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentcolor"
                    >
                      <path
                        d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                      />
                    </svg>
                  </mwc-icon-button>`:_}
            </playground-internal-tab>`))}
      </playground-internal-tab-bar>

      ${this.editableFileSystem?B`
            <mwc-icon-button
              class="add-file-button"
              label="New file"
              @click=${this._onClickAddFile}
            >
              <!-- Source: https://material.io/resources/icons/?icon=add&style=baseline -->
              <svg
                fill="currentcolor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                shape-rendering="crispEdges"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </mwc-icon-button>

            <playground-file-system-controls
              .project=${this._project}
              @newFile=${this._onNewFile}
            >
            </playground-file-system-controls>
          `:_}
    `}_onTabchange(e){const t=e.detail.tab;if(!t)return;const r=t.dataset.filename,o=t.index;r!==this._activeFileName&&(this._activeFileName=r,this._activeFileIndex=o)}_onOpenMenu(e){const t=this._fileSystemControls;t&&(t.state="menu",t.filename=e.target.parentElement.dataset.filename,t.anchorElement=e.target,e.stopPropagation())}_onClickAddFile(e){const t=this._fileSystemControls;t&&(t.state="newfile",t.anchorElement=e.target)}_onNewFile(e){this._activeFileName=e.detail.filename}_setNewActiveFile(){if(this._activeFileName){const e=this._visibleFiles.findIndex((e=>e.name===this._activeFileName));if(e>=0)return void(this._activeFileIndex=e)}for(let e=this._activeFileIndex;e>=0;e--){const t=this._visibleFiles[e];if(t&&!t.hidden)return void(this._activeFileName=t.name)}this._activeFileIndex=0,this._activeFileName=""}};
/* @license CodeMirror, copyright (c) by Marijn Haverbeke and others
Distributed under an MIT license: https://codemirror.net/LICENSE */
var Zi;function Gi(e,t,r,o,i,n){this.name=e,this.tokenType=t,this.depth=r,this.parent=o,this.startLine=i,this.startPos=n}function Qi(){this.stream=null,this.line=this.startPos=0,this.string=this.startLine="",this.copyInstance=null}Ji.styles=le`
    :host {
      display: flex;
      height: var(--playground-bar-height, 40px);
      background: var(--playground-tab-bar-background, #eaeaea);
      align-items: center;
    }

    playground-internal-tab-bar {
      height: var(--playground-bar-height, 40px);
    }

    playground-internal-tab::part(button) {
      box-sizing: border-box;
      padding: 2px 24px 0 24px;
    }

    playground-internal-tab {
      color: var(--playground-tab-bar-foreground-color, #000);
      font-size: var(--playground-tab-bar-font-size, 0.85em);
      border-bottom: 2px solid transparent;
      transition: border 150ms;
    }

    playground-internal-tab[active] {
      color: var(
        --playground-tab-bar-active-color,
        var(--playground-highlight-color, #6200ee)
      );
      background: var(--playground-tab-bar-active-background, transparent);
      border-color: var(
        --playground-tab-bar-indicator-color,
        var(--playground-highlight-color, #6200ee)
      );
    }

    :host([editable-file-system]) playground-internal-tab::part(button) {
      /* The 24px menu button with opacity 0 now serves as padding-right. */
      padding-right: 0;
    }

    .menu-button {
      visibility: hidden;
      --mdc-icon-button-size: 24px;
      --mdc-icon-size: 16px;
    }

    playground-internal-tab:hover > .menu-button,
    playground-internal-tab:focus-within > .menu-button {
      visibility: visible;
    }

    mwc-icon-button {
      color: var(--playground-tab-bar-foreground-color);
    }

    .add-file-button {
      margin: 0 4px;
      opacity: 70%;
      --mdc-icon-button-size: 24px;
      --mdc-icon-size: 24px;
    }

    .add-file-button:hover {
      opacity: 1;
    }
  `,o([ee({type:Boolean,attribute:"editable-file-system",reflect:!0})],Ji.prototype,"editableFileSystem",void 0),o([te()],Ji.prototype,"_activeFileName",void 0),o([te()],Ji.prototype,"_activeFileIndex",void 0),o([re("playground-file-system-controls")],Ji.prototype,"_fileSystemControls",void 0),o([te()],Ji.prototype,"_editor",void 0),o([ee()],Ji.prototype,"editor",null),Ji=o([X("playground-tab-bar")],Ji),Zi=function(){var e=navigator.userAgent,t=navigator.platform,r=/gecko\/\d/i.test(e),o=/MSIE \d/.test(e),i=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),n=/Edge\/(\d+)/.exec(e),a=o||i||n,s=a&&(o?document.documentMode||6:+(n||i)[1]),l=!n&&/WebKit\//.test(e),d=l&&/Qt\/\d+\.\d+/.test(e),c=!n&&/Chrome\//.test(e),p=/Opera\//.test(e),u=/Apple Computer/.test(navigator.vendor),h=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),g=/PhantomJS/.test(e),m=u&&(/Mobile\/\w+/.test(e)||navigator.maxTouchPoints>2),f=/Android/.test(e),y=m||f||/webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),b=m||/Mac/.test(t),v=/\bCrOS\b/.test(e),x=/win/i.test(t),_=p&&e.match(/Version\/(\d*\.\d*)/);_&&(_=Number(_[1])),_&&_>=15&&(p=!1,l=!0);var w=b&&(d||p&&(null==_||_<12.11)),S=r||a&&s>=9;function C(e){return RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}var k,E=function(e,t){var r=e.className,o=C(t).exec(r);if(o){var i=r.slice(o.index+o[0].length);e.className=r.slice(0,o.index)+(i?o[1]+i:"")}};function T(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild);return e}function O(e,t){return T(e).appendChild(t)}function P(e,t,r,o){var i=document.createElement(e);if(r&&(i.className=r),o&&(i.style.cssText=o),"string"==typeof t)i.appendChild(document.createTextNode(t));else if(t)for(var n=0;n<t.length;++n)i.appendChild(t[n]);return i}function A(e,t,r,o){var i=P(e,t,r,o);return i.setAttribute("role","presentation"),i}function R(e,t){if(3==t.nodeType&&(t=t.parentNode),e.contains)return e.contains(t);do{if(11==t.nodeType&&(t=t.host),t==e)return!0}while(t=t.parentNode)}function L(){var e;try{e=document.activeElement}catch(t){e=document.body||null}for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function I(e,t){var r=e.className;C(t).test(r)||(e.className+=(r?" ":"")+t)}function M(e,t){for(var r=e.split(" "),o=0;o<r.length;o++)r[o]&&!C(r[o]).test(t)&&(t+=" "+r[o]);return t}k=document.createRange?function(e,t,r,o){var i=document.createRange();return i.setEnd(o||e,r),i.setStart(e,t),i}:function(e,t,r){var o=document.body.createTextRange();try{o.moveToElementText(e.parentNode)}catch(e){return o}return o.collapse(!0),o.moveEnd("character",r),o.moveStart("character",t),o};var N=function(e){e.select()};function z(e){var t=Array.prototype.slice.call(arguments,1);return function(){return e.apply(null,t)}}function F(e,t,r){for(var o in t||(t={}),e)!e.hasOwnProperty(o)||!1===r&&t.hasOwnProperty(o)||(t[o]=e[o]);return t}function U(e,t,r,o,i){null==t&&-1==(t=e.search(/[^\s\u00a0]/))&&(t=e.length);for(var n=o||0,a=i||0;;){var s=e.indexOf("\t",n);if(s<0||s>=t)return a+(t-n);a+=s-n,a+=r-a%r,n=s+1}}m?N=function(e){e.selectionStart=0,e.selectionEnd=e.value.length}:a&&(N=function(e){try{e.select()}catch(e){}});var D=function(){this.id=null,this.f=null,this.time=0,this.handler=z(this.onTimeout,this)};function H(e,t){for(var r=0;r<e.length;++r)if(e[r]==t)return r;return-1}D.prototype.onTimeout=function(e){e.id=0,e.time<=+new Date?e.f():setTimeout(e.handler,e.time-+new Date)},D.prototype.set=function(e,t){this.f=t;var r=+new Date+e;(!this.id||r<this.time)&&(clearTimeout(this.id),this.id=setTimeout(this.handler,e),this.time=r)};var B={toString:function(){return"CodeMirror.Pass"}},V={scroll:!1},W={origin:"*mouse"},j={origin:"+move"};function K(e,t,r){for(var o=0,i=0;;){var n=e.indexOf("\t",o);-1==n&&(n=e.length);var a=n-o;if(n==e.length||i+a>=t)return o+Math.min(a,t-i);if(i+=n-o,o=n+1,(i+=r-i%r)>=t)return o}}var q=[""];function J(e){for(;q.length<=e;)q.push(Z(q)+" ");return q[e]}function Z(e){return e[e.length-1]}function G(e,t){for(var r=[],o=0;o<e.length;o++)r[o]=t(e[o],o);return r}function Q(){}function Y(e,t){var r;return Object.create?r=Object.create(e):(Q.prototype=e,r=new Q),t&&F(t,r),r}var X=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;function $(e){return/\w/.test(e)||e>""&&(e.toUpperCase()!=e.toLowerCase()||X.test(e))}function ee(e,t){return t?!!(t.source.indexOf("\\w")>-1&&$(e))||t.test(e):$(e)}function te(e){for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!1;return!0}var re=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;function oe(e){return e.charCodeAt(0)>=768&&re.test(e)}function ie(e,t,r){for(;(r<0?t>0:t<e.length)&&oe(e.charAt(t));)t+=r;return t}function ne(e,t,r){for(var o=t>r?-1:1;;){if(t==r)return t;var i=(t+r)/2,n=o<0?Math.ceil(i):Math.floor(i);if(n==t)return e(n)?t:r;e(n)?r=n:t=n+o}}var ae=null;function se(e,t,r){var o;ae=null;for(var i=0;i<e.length;++i){var n=e[i];if(n.from<t&&n.to>t)return i;n.to==t&&(n.from!=n.to&&"before"==r?o=i:ae=i),n.from==t&&(n.from!=n.to&&"before"!=r?o=i:ae=i)}return null!=o?o:ae}var le=function(){var e=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,t=/[stwN]/,r=/[LRr]/,o=/[Lb1n]/,i=/[1n]/;function n(e,t,r){this.level=e,this.from=t,this.to=r}return function(a,s){var l="ltr"==s?"L":"R";if(0==a.length||"ltr"==s&&!e.test(a))return!1;for(var d,c=a.length,p=[],u=0;u<c;++u)p.push((d=a.charCodeAt(u))<=247?"bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(d):1424<=d&&d<=1524?"R":1536<=d&&d<=1785?"nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(d-1536):1774<=d&&d<=2220?"r":8192<=d&&d<=8203?"w":8204==d?"b":"L");for(var h=0,g=l;h<c;++h){var m=p[h];"m"==m?p[h]=g:g=m}for(var f=0,y=l;f<c;++f){var b=p[f];"1"==b&&"r"==y?p[f]="n":r.test(b)&&(y=b,"r"==b&&(p[f]="R"))}for(var v=1,x=p[0];v<c-1;++v){var _=p[v];"+"==_&&"1"==x&&"1"==p[v+1]?p[v]="1":","!=_||x!=p[v+1]||"1"!=x&&"n"!=x||(p[v]=x),x=_}for(var w=0;w<c;++w){var S=p[w];if(","==S)p[w]="N";else if("%"==S){var C=void 0;for(C=w+1;C<c&&"%"==p[C];++C);for(var k=w&&"!"==p[w-1]||C<c&&"1"==p[C]?"1":"N",E=w;E<C;++E)p[E]=k;w=C-1}}for(var T=0,O=l;T<c;++T){var P=p[T];"L"==O&&"1"==P?p[T]="L":r.test(P)&&(O=P)}for(var A=0;A<c;++A)if(t.test(p[A])){var R=void 0;for(R=A+1;R<c&&t.test(p[R]);++R);for(var L="L"==(A?p[A-1]:l),I=L==("L"==(R<c?p[R]:l))?L?"L":"R":l,M=A;M<R;++M)p[M]=I;A=R-1}for(var N,z=[],F=0;F<c;)if(o.test(p[F])){var U=F;for(++F;F<c&&o.test(p[F]);++F);z.push(new n(0,U,F))}else{var D=F,H=z.length,B="rtl"==s?1:0;for(++F;F<c&&"L"!=p[F];++F);for(var V=D;V<F;)if(i.test(p[V])){D<V&&(z.splice(H,0,new n(1,D,V)),H+=B);var W=V;for(++V;V<F&&i.test(p[V]);++V);z.splice(H,0,new n(2,W,V)),H+=B,D=V}else++V;D<F&&z.splice(H,0,new n(1,D,F))}return"ltr"==s&&(1==z[0].level&&(N=a.match(/^\s+/))&&(z[0].from=N[0].length,z.unshift(new n(0,0,N[0].length))),1==Z(z).level&&(N=a.match(/\s+$/))&&(Z(z).to-=N[0].length,z.push(new n(0,c-N[0].length,c)))),"rtl"==s?z.reverse():z}}();function de(e,t){var r=e.order;return null==r&&(r=e.order=le(e.text,t)),r}var ce=[],pe=function(e,t,r){if(e.addEventListener)e.addEventListener(t,r,!1);else if(e.attachEvent)e.attachEvent("on"+t,r);else{var o=e._handlers||(e._handlers={});o[t]=(o[t]||ce).concat(r)}};function ue(e,t){return e._handlers&&e._handlers[t]||ce}function he(e,t,r){if(e.removeEventListener)e.removeEventListener(t,r,!1);else if(e.detachEvent)e.detachEvent("on"+t,r);else{var o=e._handlers,i=o&&o[t];if(i){var n=H(i,r);n>-1&&(o[t]=i.slice(0,n).concat(i.slice(n+1)))}}}function ge(e,t){var r=ue(e,t);if(r.length)for(var o=Array.prototype.slice.call(arguments,2),i=0;i<r.length;++i)r[i].apply(null,o)}function me(e,t,r){return"string"==typeof t&&(t={type:t,preventDefault:function(){this.defaultPrevented=!0}}),ge(e,r||t.type,e,t),_e(t)||t.codemirrorIgnore}function fe(e){var t=e._handlers&&e._handlers.cursorActivity;if(t)for(var r=e.curOp.cursorActivityHandlers||(e.curOp.cursorActivityHandlers=[]),o=0;o<t.length;++o)-1==H(r,t[o])&&r.push(t[o])}function ye(e,t){return ue(e,t).length>0}function be(e){e.prototype.on=function(e,t){pe(this,e,t)},e.prototype.off=function(e,t){he(this,e,t)}}function ve(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function xe(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}function _e(e){return null!=e.defaultPrevented?e.defaultPrevented:0==e.returnValue}function we(e){ve(e),xe(e)}function Se(e){return e.target||e.srcElement}function Ce(e){var t=e.which;return null==t&&(1&e.button?t=1:2&e.button?t=3:4&e.button&&(t=2)),b&&e.ctrlKey&&1==t&&(t=3),t}var ke,Ee,Te=function(){if(a&&s<9)return!1;var e=P("div");return"draggable"in e||"dragDrop"in e}();function Oe(e){if(null==ke){var t=P("span","​");O(e,P("span",[t,document.createTextNode("x")])),0!=e.firstChild.offsetHeight&&(ke=t.offsetWidth<=1&&t.offsetHeight>2&&!(a&&s<8))}var r=ke?P("span","​"):P("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px");return r.setAttribute("cm-text",""),r}function Pe(e){if(null!=Ee)return Ee;var t=O(e,document.createTextNode("AخA")),r=k(t,0,1).getBoundingClientRect(),o=k(t,1,2).getBoundingClientRect();return T(e),!(!r||r.left==r.right)&&(Ee=o.right-r.right<3)}var Ae,Re=function(e){return e.split(/\r\n?|\n/)},Le=window.getSelection?function(e){try{return e.selectionStart!=e.selectionEnd}catch(e){return!1}}:function(e){var t;try{t=e.ownerDocument.selection.createRange()}catch(e){}return!(!t||t.parentElement()!=e)&&0!=t.compareEndPoints("StartToEnd",t)},Ie="oncopy"in(Ae=P("div"))||(Ae.setAttribute("oncopy","return;"),"function"==typeof Ae.oncopy),Me=null,Ne={},ze={};function Fe(e,t){arguments.length>2&&(t.dependencies=Array.prototype.slice.call(arguments,2)),Ne[e]=t}function Ue(e){if("string"==typeof e&&ze.hasOwnProperty(e))e=ze[e];else if(e&&"string"==typeof e.name&&ze.hasOwnProperty(e.name)){var t=ze[e.name];"string"==typeof t&&(t={name:t}),(e=Y(t,e)).name=t.name}else{if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+xml$/.test(e))return Ue("application/xml");if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+json$/.test(e))return Ue("application/json")}return"string"==typeof e?{name:e}:e||{name:"null"}}function De(e,t){t=Ue(t);var r=Ne[t.name];if(!r)return De(e,"text/plain");var o=r(e,t);if(He.hasOwnProperty(t.name)){var i=He[t.name];for(var n in i)i.hasOwnProperty(n)&&(o.hasOwnProperty(n)&&(o["_"+n]=o[n]),o[n]=i[n])}if(o.name=t.name,t.helperType&&(o.helperType=t.helperType),t.modeProps)for(var a in t.modeProps)o[a]=t.modeProps[a];return o}var He={};function Be(e,t){F(t,He.hasOwnProperty(e)?He[e]:He[e]={})}function Ve(e,t){if(!0===t)return t;if(e.copyState)return e.copyState(t);var r={};for(var o in t){var i=t[o];i instanceof Array&&(i=i.concat([])),r[o]=i}return r}function We(e,t){for(var r;e.innerMode&&(r=e.innerMode(t))&&r.mode!=e;)t=r.state,e=r.mode;return r||{mode:e,state:t}}function je(e,t,r){return!e.startState||e.startState(t,r)}var Ke=function(e,t,r){this.pos=this.start=0,this.string=e,this.tabSize=t||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0,this.lineOracle=r};function qe(e,t){if((t-=e.first)<0||t>=e.size)throw Error("There is no line "+(t+e.first)+" in the document.");for(var r=e;!r.lines;)for(var o=0;;++o){var i=r.children[o],n=i.chunkSize();if(t<n){r=i;break}t-=n}return r.lines[t]}function Je(e,t,r){var o=[],i=t.line;return e.iter(t.line,r.line+1,(function(e){var n=e.text;i==r.line&&(n=n.slice(0,r.ch)),i==t.line&&(n=n.slice(t.ch)),o.push(n),++i})),o}function Ze(e,t,r){var o=[];return e.iter(t,r,(function(e){o.push(e.text)})),o}function Ge(e,t){var r=t-e.height;if(r)for(var o=e;o;o=o.parent)o.height+=r}function Qe(e){if(null==e.parent)return null;for(var t=e.parent,r=H(t.lines,e),o=t.parent;o;t=o,o=o.parent)for(var i=0;o.children[i]!=t;++i)r+=o.children[i].chunkSize();return r+t.first}function Ye(e,t){var r=e.first;e:do{for(var o=0;o<e.children.length;++o){var i=e.children[o],n=i.height;if(t<n){e=i;continue e}t-=n,r+=i.chunkSize()}return r}while(!e.lines);for(var a=0;a<e.lines.length;++a){var s=e.lines[a].height;if(t<s)break;t-=s}return r+a}function Xe(e,t){return t>=e.first&&t<e.first+e.size}function $e(e,t){return e.lineNumberFormatter(t+e.firstLineNumber)+""}function et(e,t,r){if(void 0===r&&(r=null),!(this instanceof et))return new et(e,t,r);this.line=e,this.ch=t,this.sticky=r}function tt(e,t){return e.line-t.line||e.ch-t.ch}function rt(e,t){return e.sticky==t.sticky&&0==tt(e,t)}function ot(e){return et(e.line,e.ch)}function it(e,t){return tt(e,t)<0?t:e}function nt(e,t){return tt(e,t)<0?e:t}function at(e,t){return Math.max(e.first,Math.min(t,e.first+e.size-1))}function st(e,t){if(t.line<e.first)return et(e.first,0);var r=e.first+e.size-1;return t.line>r?et(r,qe(e,r).text.length):function(e,t){var r=e.ch;return null==r||r>t?et(e.line,t):r<0?et(e.line,0):e}(t,qe(e,t.line).text.length)}function lt(e,t){for(var r=[],o=0;o<t.length;o++)r[o]=st(e,t[o]);return r}Ke.prototype.eol=function(){return this.pos>=this.string.length},Ke.prototype.sol=function(){return this.pos==this.lineStart},Ke.prototype.peek=function(){return this.string.charAt(this.pos)||void 0},Ke.prototype.next=function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},Ke.prototype.eat=function(e){var t=this.string.charAt(this.pos);if("string"==typeof e?t==e:t&&(e.test?e.test(t):e(t)))return++this.pos,t},Ke.prototype.eatWhile=function(e){for(var t=this.pos;this.eat(e););return this.pos>t},Ke.prototype.eatSpace=function(){for(var e=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e},Ke.prototype.skipToEnd=function(){this.pos=this.string.length},Ke.prototype.skipTo=function(e){var t=this.string.indexOf(e,this.pos);if(t>-1)return this.pos=t,!0},Ke.prototype.backUp=function(e){this.pos-=e},Ke.prototype.column=function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=U(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?U(this.string,this.lineStart,this.tabSize):0)},Ke.prototype.indentation=function(){return U(this.string,null,this.tabSize)-(this.lineStart?U(this.string,this.lineStart,this.tabSize):0)},Ke.prototype.match=function(e,t,r){if("string"!=typeof e){var o=this.string.slice(this.pos).match(e);return o&&o.index>0?null:(o&&!1!==t&&(this.pos+=o[0].length),o)}var i=function(e){return r?e.toLowerCase():e};if(i(this.string.substr(this.pos,e.length))==i(e))return!1!==t&&(this.pos+=e.length),!0},Ke.prototype.current=function(){return this.string.slice(this.start,this.pos)},Ke.prototype.hideFirstChars=function(e,t){this.lineStart+=e;try{return t()}finally{this.lineStart-=e}},Ke.prototype.lookAhead=function(e){var t=this.lineOracle;return t&&t.lookAhead(e)},Ke.prototype.baseToken=function(){var e=this.lineOracle;return e&&e.baseToken(this.pos)};var dt=function(e,t){this.state=e,this.lookAhead=t},ct=function(e,t,r,o){this.state=t,this.doc=e,this.line=r,this.maxLookAhead=o||0,this.baseTokens=null,this.baseTokenPos=1};function pt(e,t,r,o){var i=[e.state.modeGen],n={};xt(e,t.text,e.doc.mode,r,(function(e,t){return i.push(e,t)}),n,o);for(var a=r.state,s=function(o){r.baseTokens=i;var s=e.state.overlays[o],l=1,d=0;r.state=!0,xt(e,t.text,s.mode,r,(function(e,t){for(var r=l;d<e;){var o=i[l];o>e&&i.splice(l,1,e,i[l+1],o),l+=2,d=Math.min(e,o)}if(t)if(s.opaque)i.splice(r,l-r,e,"overlay "+t),l=r+2;else for(;r<l;r+=2){var n=i[r+1];i[r+1]=(n?n+" ":"")+"overlay "+t}}),n),r.state=a,r.baseTokens=null,r.baseTokenPos=1},l=0;l<e.state.overlays.length;++l)s(l);return{styles:i,classes:n.bgClass||n.textClass?n:null}}function ut(e,t,r){if(!t.styles||t.styles[0]!=e.state.modeGen){var o=ht(e,Qe(t)),i=t.text.length>e.options.maxHighlightLength&&Ve(e.doc.mode,o.state),n=pt(e,t,o);i&&(o.state=i),t.stateAfter=o.save(!i),t.styles=n.styles,n.classes?t.styleClasses=n.classes:t.styleClasses&&(t.styleClasses=null),r===e.doc.highlightFrontier&&(e.doc.modeFrontier=Math.max(e.doc.modeFrontier,++e.doc.highlightFrontier))}return t.styles}function ht(e,t,r){var o=e.doc,i=e.display;if(!o.mode.startState)return new ct(o,!0,t);var n=function(e,t,r){for(var o,i,n=e.doc,a=r?-1:t-(e.doc.mode.innerMode?1e3:100),s=t;s>a;--s){if(s<=n.first)return n.first;var l=qe(n,s-1),d=l.stateAfter;if(d&&(!r||s+(d instanceof dt?d.lookAhead:0)<=n.modeFrontier))return s;var c=U(l.text,null,e.options.tabSize);(null==i||o>c)&&(i=s-1,o=c)}return i}(e,t,r),a=n>o.first&&qe(o,n-1).stateAfter,s=a?ct.fromSaved(o,a,n):new ct(o,je(o.mode),n);return o.iter(n,t,(function(r){gt(e,r.text,s);var o=s.line;r.stateAfter=o==t-1||o%5==0||o>=i.viewFrom&&o<i.viewTo?s.save():null,s.nextLine()})),r&&(o.modeFrontier=s.line),s}function gt(e,t,r,o){var i=e.doc.mode,n=new Ke(t,e.options.tabSize,r);for(n.start=n.pos=o||0,""==t&&mt(i,r.state);!n.eol();)ft(i,n,r.state),n.start=n.pos}function mt(e,t){if(e.blankLine)return e.blankLine(t);if(e.innerMode){var r=We(e,t);return r.mode.blankLine?r.mode.blankLine(r.state):void 0}}function ft(e,t,r,o){for(var i=0;i<10;i++){o&&(o[0]=We(e,r).mode);var n=e.token(t,r);if(t.pos>t.start)return n}throw Error("Mode "+e.name+" failed to advance stream.")}ct.prototype.lookAhead=function(e){var t=this.doc.getLine(this.line+e);return null!=t&&e>this.maxLookAhead&&(this.maxLookAhead=e),t},ct.prototype.baseToken=function(e){if(!this.baseTokens)return null;for(;this.baseTokens[this.baseTokenPos]<=e;)this.baseTokenPos+=2;var t=this.baseTokens[this.baseTokenPos+1];return{type:t&&t.replace(/( |^)overlay .*/,""),size:this.baseTokens[this.baseTokenPos]-e}},ct.prototype.nextLine=function(){this.line++,this.maxLookAhead>0&&this.maxLookAhead--},ct.fromSaved=function(e,t,r){return t instanceof dt?new ct(e,Ve(e.mode,t.state),r,t.lookAhead):new ct(e,Ve(e.mode,t),r)},ct.prototype.save=function(e){var t=!1!==e?Ve(this.doc.mode,this.state):this.state;return this.maxLookAhead>0?new dt(t,this.maxLookAhead):t};var yt=function(e,t,r){this.start=e.start,this.end=e.pos,this.string=e.current(),this.type=t||null,this.state=r};function bt(e,t,r,o){var i,n,a=e.doc,s=a.mode,l=qe(a,(t=st(a,t)).line),d=ht(e,t.line,r),c=new Ke(l.text,e.options.tabSize,d);for(o&&(n=[]);(o||c.pos<t.ch)&&!c.eol();)c.start=c.pos,i=ft(s,c,d.state),o&&n.push(new yt(c,i,Ve(a.mode,d.state)));return o?n:new yt(c,i,d.state)}function vt(e,t){if(e)for(;;){var r=e.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!r)break;e=e.slice(0,r.index)+e.slice(r.index+r[0].length);var o=r[1]?"bgClass":"textClass";null==t[o]?t[o]=r[2]:RegExp("(?:^|\\s)"+r[2]+"(?:$|\\s)").test(t[o])||(t[o]+=" "+r[2])}return e}function xt(e,t,r,o,i,n,a){var s=r.flattenSpans;null==s&&(s=e.options.flattenSpans);var l,d=0,c=null,p=new Ke(t,e.options.tabSize,o),u=e.options.addModeClass&&[null];for(""==t&&vt(mt(r,o.state),n);!p.eol();){if(p.pos>e.options.maxHighlightLength?(s=!1,a&&gt(e,t,o,p.pos),p.pos=t.length,l=null):l=vt(ft(r,p,o.state,u),n),u){var h=u[0].name;h&&(l="m-"+(l?h+" "+l:h))}if(!s||c!=l){for(;d<p.start;)i(d=Math.min(p.start,d+5e3),c);c=l}p.start=p.pos}for(;d<p.pos;){var g=Math.min(p.pos,d+5e3);i(g,c),d=g}}var _t=!1,wt=!1;function St(e,t,r){this.marker=e,this.from=t,this.to=r}function Ct(e,t){if(e)for(var r=0;r<e.length;++r){var o=e[r];if(o.marker==t)return o}}function kt(e,t){for(var r,o=0;o<e.length;++o)e[o]!=t&&(r||(r=[])).push(e[o]);return r}function Et(e,t){if(t.full)return null;var r=Xe(e,t.from.line)&&qe(e,t.from.line).markedSpans,o=Xe(e,t.to.line)&&qe(e,t.to.line).markedSpans;if(!r&&!o)return null;var i=t.from.ch,n=t.to.ch,a=0==tt(t.from,t.to),s=function(e,t,r){var o;if(e)for(var i=0;i<e.length;++i){var n=e[i],a=n.marker;if(null==n.from||(a.inclusiveLeft?n.from<=t:n.from<t)||n.from==t&&"bookmark"==a.type&&(!r||!n.marker.insertLeft)){var s=null==n.to||(a.inclusiveRight?n.to>=t:n.to>t);(o||(o=[])).push(new St(a,n.from,s?null:n.to))}}return o}(r,i,a),l=function(e,t,r){var o;if(e)for(var i=0;i<e.length;++i){var n=e[i],a=n.marker;if(null==n.to||(a.inclusiveRight?n.to>=t:n.to>t)||n.from==t&&"bookmark"==a.type&&(!r||n.marker.insertLeft)){var s=null==n.from||(a.inclusiveLeft?n.from<=t:n.from<t);(o||(o=[])).push(new St(a,s?null:n.from-t,null==n.to?null:n.to-t))}}return o}(o,n,a),d=1==t.text.length,c=Z(t.text).length+(d?i:0);if(s)for(var p=0;p<s.length;++p){var u=s[p];if(null==u.to){var h=Ct(l,u.marker);h?d&&(u.to=null==h.to?null:h.to+c):u.to=i}}if(l)for(var g=0;g<l.length;++g){var m=l[g];null!=m.to&&(m.to+=c),null==m.from?Ct(s,m.marker)||(m.from=c,d&&(s||(s=[])).push(m)):(m.from+=c,d&&(s||(s=[])).push(m))}s&&(s=Tt(s)),l&&l!=s&&(l=Tt(l));var f=[s];if(!d){var y,b=t.text.length-2;if(b>0&&s)for(var v=0;v<s.length;++v)null==s[v].to&&(y||(y=[])).push(new St(s[v].marker,null,null));for(var x=0;x<b;++x)f.push(y);f.push(l)}return f}function Tt(e){for(var t=0;t<e.length;++t){var r=e[t];null!=r.from&&r.from==r.to&&!1!==r.marker.clearWhenEmpty&&e.splice(t--,1)}return e.length?e:null}function Ot(e){var t=e.markedSpans;if(t){for(var r=0;r<t.length;++r)t[r].marker.detachLine(e);e.markedSpans=null}}function Pt(e,t){if(t){for(var r=0;r<t.length;++r)t[r].marker.attachLine(e);e.markedSpans=t}}function At(e){return e.inclusiveLeft?-1:0}function Rt(e){return e.inclusiveRight?1:0}function Lt(e,t){var r=e.lines.length-t.lines.length;if(0!=r)return r;var o=e.find(),i=t.find(),n=tt(o.from,i.from)||At(e)-At(t);return n?-n:tt(o.to,i.to)||Rt(e)-Rt(t)||t.id-e.id}function It(e,t){var r,o=wt&&e.markedSpans;if(o)for(var i=void 0,n=0;n<o.length;++n)(i=o[n]).marker.collapsed&&null==(t?i.from:i.to)&&(!r||Lt(r,i.marker)<0)&&(r=i.marker);return r}function Mt(e){return It(e,!0)}function Nt(e){return It(e,!1)}function zt(e,t){var r,o=wt&&e.markedSpans;if(o)for(var i=0;i<o.length;++i){var n=o[i];n.marker.collapsed&&(null==n.from||n.from<t)&&(null==n.to||n.to>t)&&(!r||Lt(r,n.marker)<0)&&(r=n.marker)}return r}function Ft(e,t,r,o,i){var n=qe(e,t),a=wt&&n.markedSpans;if(a)for(var s=0;s<a.length;++s){var l=a[s];if(l.marker.collapsed){var d=l.marker.find(0),c=tt(d.from,r)||At(l.marker)-At(i),p=tt(d.to,o)||Rt(l.marker)-Rt(i);if(!(c>=0&&p<=0||c<=0&&p>=0)&&(c<=0&&(l.marker.inclusiveRight&&i.inclusiveLeft?tt(d.to,r)>=0:tt(d.to,r)>0)||c>=0&&(l.marker.inclusiveRight&&i.inclusiveLeft?tt(d.from,o)<=0:tt(d.from,o)<0)))return!0}}}function Ut(e){for(var t;t=Mt(e);)e=t.find(-1,!0).line;return e}function Dt(e,t){var r=qe(e,t),o=Ut(r);return r==o?t:Qe(o)}function Ht(e,t){if(t>e.lastLine())return t;var r,o=qe(e,t);if(!Bt(e,o))return t;for(;r=Nt(o);)o=r.find(1,!0).line;return Qe(o)+1}function Bt(e,t){var r=wt&&t.markedSpans;if(r)for(var o=void 0,i=0;i<r.length;++i)if((o=r[i]).marker.collapsed){if(null==o.from)return!0;if(!o.marker.widgetNode&&0==o.from&&o.marker.inclusiveLeft&&Vt(e,t,o))return!0}}function Vt(e,t,r){if(null==r.to){var o=r.marker.find(1,!0);return Vt(e,o.line,Ct(o.line.markedSpans,r.marker))}if(r.marker.inclusiveRight&&r.to==t.text.length)return!0;for(var i=void 0,n=0;n<t.markedSpans.length;++n)if((i=t.markedSpans[n]).marker.collapsed&&!i.marker.widgetNode&&i.from==r.to&&(null==i.to||i.to!=r.from)&&(i.marker.inclusiveLeft||r.marker.inclusiveRight)&&Vt(e,t,i))return!0}function Wt(e){for(var t=0,r=(e=Ut(e)).parent,o=0;o<r.lines.length;++o){var i=r.lines[o];if(i==e)break;t+=i.height}for(var n=r.parent;n;n=(r=n).parent)for(var a=0;a<n.children.length;++a){var s=n.children[a];if(s==r)break;t+=s.height}return t}function jt(e){if(0==e.height)return 0;for(var t,r=e.text.length,o=e;t=Mt(o);){var i=t.find(0,!0);o=i.from.line,r+=i.from.ch-i.to.ch}for(o=e;t=Nt(o);){var n=t.find(0,!0);r-=o.text.length-n.from.ch,r+=(o=n.to.line).text.length-n.to.ch}return r}function Kt(e){var t=e.display,r=e.doc;t.maxLine=qe(r,r.first),t.maxLineLength=jt(t.maxLine),t.maxLineChanged=!0,r.iter((function(e){var r=jt(e);r>t.maxLineLength&&(t.maxLineLength=r,t.maxLine=e)}))}var qt=function(e,t,r){this.text=e,Pt(this,t),this.height=r?r(this):1};function Jt(e){e.parent=null,Ot(e)}qt.prototype.lineNo=function(){return Qe(this)},be(qt);var Zt={},Gt={};function Qt(e,t){if(!e||/^\s*$/.test(e))return null;var r=t.addModeClass?Gt:Zt;return r[e]||(r[e]=e.replace(/\S+/g,"cm-$&"))}function Yt(e,t){var r=A("span",null,null,l?"padding-right: .1px":null),o={pre:A("pre",[r],"CodeMirror-line"),content:r,col:0,pos:0,cm:e,trailingSpace:!1,splitSpaces:e.getOption("lineWrapping")};t.measure={};for(var i=0;i<=(t.rest?t.rest.length:0);i++){var n=i?t.rest[i-1]:t.line,a=void 0;o.pos=0,o.addToken=$t,Pe(e.display.measure)&&(a=de(n,e.doc.direction))&&(o.addToken=er(o.addToken,a)),o.map=[],rr(n,o,ut(e,n,t!=e.display.externalMeasured&&Qe(n))),n.styleClasses&&(n.styleClasses.bgClass&&(o.bgClass=M(n.styleClasses.bgClass,o.bgClass||"")),n.styleClasses.textClass&&(o.textClass=M(n.styleClasses.textClass,o.textClass||""))),0==o.map.length&&o.map.push(0,0,o.content.appendChild(Oe(e.display.measure))),0==i?(t.measure.map=o.map,t.measure.cache={}):((t.measure.maps||(t.measure.maps=[])).push(o.map),(t.measure.caches||(t.measure.caches=[])).push({}))}if(l){var s=o.content.lastChild;(/\bcm-tab\b/.test(s.className)||s.querySelector&&s.querySelector(".cm-tab"))&&(o.content.className="cm-tab-wrap-hack")}return ge(e,"renderLine",e,t.line,o.pre),o.pre.className&&(o.textClass=M(o.pre.className,o.textClass||"")),o}function Xt(e){var t=P("span","•","cm-invalidchar");return t.title="\\u"+e.charCodeAt(0).toString(16),t.setAttribute("aria-label",t.title),t}function $t(e,t,r,o,i,n,l){if(t){var d,c=e.splitSpaces?function(e,t){if(e.length>1&&!/  /.test(e))return e;for(var r=t,o="",i=0;i<e.length;i++){var n=e.charAt(i);" "!=n||!r||i!=e.length-1&&32!=e.charCodeAt(i+1)||(n=" "),o+=n,r=" "==n}return o}(t,e.trailingSpace):t,p=e.cm.state.specialChars,u=!1;if(p.test(t)){d=document.createDocumentFragment();for(var h=0;;){p.lastIndex=h;var g=p.exec(t),m=g?g.index-h:t.length-h;if(m){var f=document.createTextNode(c.slice(h,h+m));a&&s<9?d.appendChild(P("span",[f])):d.appendChild(f),e.map.push(e.pos,e.pos+m,f),e.col+=m,e.pos+=m}if(!g)break;h+=m+1;var y=void 0;if("\t"==g[0]){var b=e.cm.options.tabSize,v=b-e.col%b;(y=d.appendChild(P("span",J(v),"cm-tab"))).setAttribute("role","presentation"),y.setAttribute("cm-text","\t"),e.col+=v}else"\r"==g[0]||"\n"==g[0]?((y=d.appendChild(P("span","\r"==g[0]?"␍":"␤","cm-invalidchar"))).setAttribute("cm-text",g[0]),e.col+=1):((y=e.cm.options.specialCharPlaceholder(g[0])).setAttribute("cm-text",g[0]),a&&s<9?d.appendChild(P("span",[y])):d.appendChild(y),e.col+=1);e.map.push(e.pos,e.pos+1,y),e.pos++}}else e.col+=t.length,d=document.createTextNode(c),e.map.push(e.pos,e.pos+t.length,d),a&&s<9&&(u=!0),e.pos+=t.length;if(e.trailingSpace=32==c.charCodeAt(t.length-1),r||o||i||u||n||l){var x=r||"";o&&(x+=o),i&&(x+=i);var _=P("span",[d],x,n);if(l)for(var w in l)l.hasOwnProperty(w)&&"style"!=w&&"class"!=w&&_.setAttribute(w,l[w]);return e.content.appendChild(_)}e.content.appendChild(d)}}function er(e,t){return function(r,o,i,n,a,s,l){i=i?i+" cm-force-border":"cm-force-border";for(var d=r.pos,c=d+o.length;;){for(var p=void 0,u=0;u<t.length&&!((p=t[u]).to>d&&p.from<=d);u++);if(p.to>=c)return e(r,o,i,n,a,s,l);e(r,o.slice(0,p.to-d),i,n,null,s,l),n=null,o=o.slice(p.to-d),d=p.to}}}function tr(e,t,r,o){var i=!o&&r.widgetNode;i&&e.map.push(e.pos,e.pos+t,i),!o&&e.cm.display.input.needsContentAttribute&&(i||(i=e.content.appendChild(document.createElement("span"))),i.setAttribute("cm-marker",r.id)),i&&(e.cm.display.input.setUneditable(i),e.content.appendChild(i)),e.pos+=t,e.trailingSpace=!1}function rr(e,t,r){var o=e.markedSpans,i=e.text,n=0;if(o)for(var a,s,l,d,c,p,u,h=i.length,g=0,m=1,f="",y=0;;){if(y==g){l=d=c=s="",u=null,p=null,y=1/0;for(var b=[],v=void 0,x=0;x<o.length;++x){var _=o[x],w=_.marker;if("bookmark"==w.type&&_.from==g&&w.widgetNode)b.push(w);else if(_.from<=g&&(null==_.to||_.to>g||w.collapsed&&_.to==g&&_.from==g)){if(null!=_.to&&_.to!=g&&y>_.to&&(y=_.to,d=""),w.className&&(l+=" "+w.className),w.css&&(s=(s?s+";":"")+w.css),w.startStyle&&_.from==g&&(c+=" "+w.startStyle),w.endStyle&&_.to==y&&(v||(v=[])).push(w.endStyle,_.to),w.title&&((u||(u={})).title=w.title),w.attributes)for(var S in w.attributes)(u||(u={}))[S]=w.attributes[S];w.collapsed&&(!p||Lt(p.marker,w)<0)&&(p=_)}else _.from>g&&y>_.from&&(y=_.from)}if(v)for(var C=0;C<v.length;C+=2)v[C+1]==y&&(d+=" "+v[C]);if(!p||p.from==g)for(var k=0;k<b.length;++k)tr(t,0,b[k]);if(p&&(p.from||0)==g){if(tr(t,(null==p.to?h+1:p.to)-g,p.marker,null==p.from),null==p.to)return;p.to==g&&(p=!1)}}if(g>=h)break;for(var E=Math.min(h,y);;){if(f){var T=g+f.length;if(!p){var O=T>E?f.slice(0,E-g):f;t.addToken(t,O,a?a+l:l,c,g+O.length==y?d:"",s,u)}if(T>=E){f=f.slice(E-g),g=E;break}g=T,c=""}f=i.slice(n,n=r[m++]),a=Qt(r[m++],t.cm.options)}}else for(var P=1;P<r.length;P+=2)t.addToken(t,i.slice(n,n=r[P]),Qt(r[P+1],t.cm.options))}function or(e,t,r){this.line=t,this.rest=function(e){for(var t,r;t=Nt(e);)e=t.find(1,!0).line,(r||(r=[])).push(e);return r}(t),this.size=this.rest?Qe(Z(this.rest))-r+1:1,this.node=this.text=null,this.hidden=Bt(e,t)}function ir(e,t,r){for(var o,i=[],n=t;n<r;n=o){var a=new or(e.doc,qe(e.doc,n),n);o=n+a.size,i.push(a)}return i}var nr=null,ar=null;function sr(e,t){var r=ue(e,t);if(r.length){var o,i=Array.prototype.slice.call(arguments,2);nr?o=nr.delayedCallbacks:ar?o=ar:(o=ar=[],setTimeout(lr,0));for(var n=function(e){o.push((function(){return r[e].apply(null,i)}))},a=0;a<r.length;++a)n(a)}}function lr(){var e=ar;ar=null;for(var t=0;t<e.length;++t)e[t]()}function dr(e,t,r,o){for(var i=0;i<t.changes.length;i++){var n=t.changes[i];"text"==n?ur(e,t):"gutter"==n?gr(e,t,r,o):"class"==n?hr(e,t):"widget"==n&&mr(e,t,o)}t.changes=null}function cr(e){return e.node==e.text&&(e.node=P("div",null,null,"position: relative"),e.text.parentNode&&e.text.parentNode.replaceChild(e.node,e.text),e.node.appendChild(e.text),a&&s<8&&(e.node.style.zIndex=2)),e.node}function pr(e,t){var r=e.display.externalMeasured;return r&&r.line==t.line?(e.display.externalMeasured=null,t.measure=r.measure,r.built):Yt(e,t)}function ur(e,t){var r=t.text.className,o=pr(e,t);t.text==t.node&&(t.node=o.pre),t.text.parentNode.replaceChild(o.pre,t.text),t.text=o.pre,o.bgClass!=t.bgClass||o.textClass!=t.textClass?(t.bgClass=o.bgClass,t.textClass=o.textClass,hr(e,t)):r&&(t.text.className=r)}function hr(e,t){!function(e,t){var r=t.bgClass?t.bgClass+" "+(t.line.bgClass||""):t.line.bgClass;if(r&&(r+=" CodeMirror-linebackground"),t.background)r?t.background.className=r:(t.background.parentNode.removeChild(t.background),t.background=null);else if(r){var o=cr(t);t.background=o.insertBefore(P("div",null,r),o.firstChild),e.display.input.setUneditable(t.background)}}(e,t),t.line.wrapClass?cr(t).className=t.line.wrapClass:t.node!=t.text&&(t.node.className="");var r=t.textClass?t.textClass+" "+(t.line.textClass||""):t.line.textClass;t.text.className=r||""}function gr(e,t,r,o){if(t.gutter&&(t.node.removeChild(t.gutter),t.gutter=null),t.gutterBackground&&(t.node.removeChild(t.gutterBackground),t.gutterBackground=null),t.line.gutterClass){var i=cr(t);t.gutterBackground=P("div",null,"CodeMirror-gutter-background "+t.line.gutterClass,"left: "+(e.options.fixedGutter?o.fixedPos:-o.gutterTotalWidth)+"px; width: "+o.gutterTotalWidth+"px"),e.display.input.setUneditable(t.gutterBackground),i.insertBefore(t.gutterBackground,t.text)}var n=t.line.gutterMarkers;if(e.options.lineNumbers||n){var a=cr(t),s=t.gutter=P("div",null,"CodeMirror-gutter-wrapper","left: "+(e.options.fixedGutter?o.fixedPos:-o.gutterTotalWidth)+"px");if(s.setAttribute("aria-hidden","true"),e.display.input.setUneditable(s),a.insertBefore(s,t.text),t.line.gutterClass&&(s.className+=" "+t.line.gutterClass),!e.options.lineNumbers||n&&n["CodeMirror-linenumbers"]||(t.lineNumber=s.appendChild(P("div",$e(e.options,r),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+o.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+e.display.lineNumInnerWidth+"px"))),n)for(var l=0;l<e.display.gutterSpecs.length;++l){var d=e.display.gutterSpecs[l].className,c=n.hasOwnProperty(d)&&n[d];c&&s.appendChild(P("div",[c],"CodeMirror-gutter-elt","left: "+o.gutterLeft[d]+"px; width: "+o.gutterWidth[d]+"px"))}}}function mr(e,t,r){t.alignable&&(t.alignable=null);for(var o=C("CodeMirror-linewidget"),i=t.node.firstChild,n=void 0;i;i=n)n=i.nextSibling,o.test(i.className)&&t.node.removeChild(i);yr(e,t,r)}function fr(e,t,r,o){var i=pr(e,t);return t.text=t.node=i.pre,i.bgClass&&(t.bgClass=i.bgClass),i.textClass&&(t.textClass=i.textClass),hr(e,t),gr(e,t,r,o),yr(e,t,o),t.node}function yr(e,t,r){if(br(e,t.line,t,r,!0),t.rest)for(var o=0;o<t.rest.length;o++)br(e,t.rest[o],t,r,!1)}function br(e,t,r,o,i){if(t.widgets)for(var n=cr(r),a=0,s=t.widgets;a<s.length;++a){var l=s[a],d=P("div",[l.node],"CodeMirror-linewidget"+(l.className?" "+l.className:""));l.handleMouseEvents||d.setAttribute("cm-ignore-events","true"),vr(l,d,r,o),e.display.input.setUneditable(d),i&&l.above?n.insertBefore(d,r.gutter||r.text):n.appendChild(d),sr(l,"redraw")}}function vr(e,t,r,o){if(e.noHScroll){(r.alignable||(r.alignable=[])).push(t);var i=o.wrapperWidth;t.style.left=o.fixedPos+"px",e.coverGutter||(i-=o.gutterTotalWidth,t.style.paddingLeft=o.gutterTotalWidth+"px"),t.style.width=i+"px"}e.coverGutter&&(t.style.zIndex=5,t.style.position="relative",e.noHScroll||(t.style.marginLeft=-o.gutterTotalWidth+"px"))}function xr(e){if(null!=e.height)return e.height;var t=e.doc.cm;if(!t)return 0;if(!R(document.body,e.node)){var r="position: relative;";e.coverGutter&&(r+="margin-left: -"+t.display.gutters.offsetWidth+"px;"),e.noHScroll&&(r+="width: "+t.display.wrapper.clientWidth+"px;"),O(t.display.measure,P("div",[e.node],null,r))}return e.height=e.node.parentNode.offsetHeight}function _r(e,t){for(var r=Se(t);r!=e.wrapper;r=r.parentNode)if(!r||1==r.nodeType&&"true"==r.getAttribute("cm-ignore-events")||r.parentNode==e.sizer&&r!=e.mover)return!0}function wr(e){return e.lineSpace.offsetTop}function Sr(e){return e.mover.offsetHeight-e.lineSpace.offsetHeight}function Cr(e){if(e.cachedPaddingH)return e.cachedPaddingH;var t=O(e.measure,P("pre","x","CodeMirror-line-like")),r=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,o={left:parseInt(r.paddingLeft),right:parseInt(r.paddingRight)};return isNaN(o.left)||isNaN(o.right)||(e.cachedPaddingH=o),o}function kr(e){return 50-e.display.nativeBarWidth}function Er(e){return e.display.scroller.clientWidth-kr(e)-e.display.barWidth}function Tr(e){return e.display.scroller.clientHeight-kr(e)-e.display.barHeight}function Or(e,t,r){if(e.line==t)return{map:e.measure.map,cache:e.measure.cache};for(var o=0;o<e.rest.length;o++)if(e.rest[o]==t)return{map:e.measure.maps[o],cache:e.measure.caches[o]};for(var i=0;i<e.rest.length;i++)if(Qe(e.rest[i])>r)return{map:e.measure.maps[i],cache:e.measure.caches[i],before:!0}}function Pr(e,t,r,o){return Lr(e,Rr(e,t),r,o)}function Ar(e,t){if(t>=e.display.viewFrom&&t<e.display.viewTo)return e.display.view[co(e,t)];var r=e.display.externalMeasured;return r&&t>=r.lineN&&t<r.lineN+r.size?r:void 0}function Rr(e,t){var r=Qe(t),o=Ar(e,r);o&&!o.text?o=null:o&&o.changes&&(dr(e,o,r,io(e)),e.curOp.forceUpdate=!0),o||(o=function(e,t){var r=Qe(t=Ut(t)),o=e.display.externalMeasured=new or(e.doc,t,r);o.lineN=r;var i=o.built=Yt(e,o);return o.text=i.pre,O(e.display.lineMeasure,i.pre),o}(e,t));var i=Or(o,t,r);return{line:t,view:o,rect:null,map:i.map,cache:i.cache,before:i.before,hasHeights:!1}}function Lr(e,t,r,o,i){t.before&&(r=-1);var n,l=r+(o||"");return t.cache.hasOwnProperty(l)?n=t.cache[l]:(t.rect||(t.rect=t.view.text.getBoundingClientRect()),t.hasHeights||(function(e,t,r){var o=e.options.lineWrapping,i=o&&Er(e);if(!t.measure.heights||o&&t.measure.width!=i){var n=t.measure.heights=[];if(o){t.measure.width=i;for(var a=t.text.firstChild.getClientRects(),s=0;s<a.length-1;s++){var l=a[s],d=a[s+1];Math.abs(l.bottom-d.bottom)>2&&n.push((l.bottom+d.top)/2-r.top)}}n.push(r.bottom-r.top)}}(e,t.view,t.rect),t.hasHeights=!0),(n=function(e,t,r,o){var i,n=Nr(t.map,r,o),l=n.node,d=n.start,c=n.end,p=n.collapse;if(3==l.nodeType){for(var u=0;u<4;u++){for(;d&&oe(t.line.text.charAt(n.coverStart+d));)--d;for(;n.coverStart+c<n.coverEnd&&oe(t.line.text.charAt(n.coverStart+c));)++c;if((i=a&&s<9&&0==d&&c==n.coverEnd-n.coverStart?l.parentNode.getBoundingClientRect():zr(k(l,d,c).getClientRects(),o)).left||i.right||0==d)break;c=d,d-=1,p="right"}a&&s<11&&(i=function(e,t){if(!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!function(e){if(null!=Me)return Me;var t=O(e,P("span","x")),r=t.getBoundingClientRect(),o=k(t,0,1).getBoundingClientRect();return Me=Math.abs(r.left-o.left)>1}(e))return t;var r=screen.logicalXDPI/screen.deviceXDPI,o=screen.logicalYDPI/screen.deviceYDPI;return{left:t.left*r,right:t.right*r,top:t.top*o,bottom:t.bottom*o}}(e.display.measure,i))}else{var h;d>0&&(p=o="right"),i=e.options.lineWrapping&&(h=l.getClientRects()).length>1?h["right"==o?h.length-1:0]:l.getBoundingClientRect()}if(a&&s<9&&!d&&(!i||!i.left&&!i.right)){var g=l.parentNode.getClientRects()[0];i=g?{left:g.left,right:g.left+oo(e.display),top:g.top,bottom:g.bottom}:Mr}for(var m=i.top-t.rect.top,f=i.bottom-t.rect.top,y=(m+f)/2,b=t.view.measure.heights,v=0;v<b.length-1&&!(y<b[v]);v++);var x=v?b[v-1]:0,_=b[v],w={left:("right"==p?i.right:i.left)-t.rect.left,right:("left"==p?i.left:i.right)-t.rect.left,top:x,bottom:_};return i.left||i.right||(w.bogus=!0),e.options.singleCursorHeightPerLine||(w.rtop=m,w.rbottom=f),w}(e,t,r,o)).bogus||(t.cache[l]=n)),{left:n.left,right:n.right,top:i?n.rtop:n.top,bottom:i?n.rbottom:n.bottom}}var Ir,Mr={left:0,right:0,top:0,bottom:0};function Nr(e,t,r){for(var o,i,n,a,s,l,d=0;d<e.length;d+=3)if(s=e[d],l=e[d+1],t<s?(i=0,n=1,a="left"):t<l?n=1+(i=t-s):(d==e.length-3||t==l&&e[d+3]>t)&&(i=(n=l-s)-1,t>=l&&(a="right")),null!=i){if(o=e[d+2],s==l&&r==(o.insertLeft?"left":"right")&&(a=r),"left"==r&&0==i)for(;d&&e[d-2]==e[d-3]&&e[d-1].insertLeft;)o=e[2+(d-=3)],a="left";if("right"==r&&i==l-s)for(;d<e.length-3&&e[d+3]==e[d+4]&&!e[d+5].insertLeft;)o=e[(d+=3)+2],a="right";break}return{node:o,start:i,end:n,collapse:a,coverStart:s,coverEnd:l}}function zr(e,t){var r=Mr;if("left"==t)for(var o=0;o<e.length&&(r=e[o]).left==r.right;o++);else for(var i=e.length-1;i>=0&&(r=e[i]).left==r.right;i--);return r}function Fr(e){if(e.measure&&(e.measure.cache={},e.measure.heights=null,e.rest))for(var t=0;t<e.rest.length;t++)e.measure.caches[t]={}}function Ur(e){e.display.externalMeasure=null,T(e.display.lineMeasure);for(var t=0;t<e.display.view.length;t++)Fr(e.display.view[t])}function Dr(e){Ur(e),e.display.cachedCharWidth=e.display.cachedTextHeight=e.display.cachedPaddingH=null,e.options.lineWrapping||(e.display.maxLineChanged=!0),e.display.lineNumChars=null}function Hr(){return c&&f?-(document.body.getBoundingClientRect().left-parseInt(getComputedStyle(document.body).marginLeft)):window.pageXOffset||(document.documentElement||document.body).scrollLeft}function Br(){return c&&f?-(document.body.getBoundingClientRect().top-parseInt(getComputedStyle(document.body).marginTop)):window.pageYOffset||(document.documentElement||document.body).scrollTop}function Vr(e){var t=0;if(e.widgets)for(var r=0;r<e.widgets.length;++r)e.widgets[r].above&&(t+=xr(e.widgets[r]));return t}function Wr(e,t,r,o,i){if(!i){var n=Vr(t);r.top+=n,r.bottom+=n}if("line"==o)return r;o||(o="local");var a=Wt(t);if("local"==o?a+=wr(e.display):a-=e.display.viewOffset,"page"==o||"window"==o){var s=e.display.lineSpace.getBoundingClientRect();a+=s.top+("window"==o?0:Br());var l=s.left+("window"==o?0:Hr());r.left+=l,r.right+=l}return r.top+=a,r.bottom+=a,r}function jr(e,t,r){if("div"==r)return t;var o=t.left,i=t.top;if("page"==r)o-=Hr(),i-=Br();else if("local"==r||!r){var n=e.display.sizer.getBoundingClientRect();o+=n.left,i+=n.top}var a=e.display.lineSpace.getBoundingClientRect();return{left:o-a.left,top:i-a.top}}function Kr(e,t,r,o,i){return o||(o=qe(e.doc,t.line)),Wr(e,o,Pr(e,o,t.ch,i),r)}function qr(e,t,r,o,i,n){function a(t,a){var s=Lr(e,i,t,a?"right":"left",n);return a?s.left=s.right:s.right=s.left,Wr(e,o,s,r)}o=o||qe(e.doc,t.line),i||(i=Rr(e,o));var s=de(o,e.doc.direction),l=t.ch,d=t.sticky;if(l>=o.text.length?(l=o.text.length,d="before"):l<=0&&(l=0,d="after"),!s)return a("before"==d?l-1:l,"before"==d);function c(e,t,r){return a(r?e-1:e,1==s[t].level!=r)}var p=se(s,l,d),u=ae,h=c(l,p,"before"==d);return null!=u&&(h.other=c(l,u,"before"!=d)),h}function Jr(e,t){var r=0;t=st(e.doc,t),e.options.lineWrapping||(r=oo(e.display)*t.ch);var o=qe(e.doc,t.line),i=Wt(o)+wr(e.display);return{left:r,right:r,top:i,bottom:i+o.height}}function Zr(e,t,r,o,i){var n=et(e,t,r);return n.xRel=i,o&&(n.outside=o),n}function Gr(e,t,r){var o=e.doc;if((r+=e.display.viewOffset)<0)return Zr(o.first,0,null,-1,-1);var i=Ye(o,r),n=o.first+o.size-1;if(i>n)return Zr(o.first+o.size-1,qe(o,n).text.length,null,1,1);t<0&&(t=0);for(var a=qe(o,i);;){var s=$r(e,a,i,t,r),l=zt(a,s.ch+(s.xRel>0||s.outside>0?1:0));if(!l)return s;var d=l.find(1);if(d.line==i)return d;a=qe(o,i=d.line)}}function Qr(e,t,r,o){o-=Vr(t);var i=t.text.length,n=ne((function(t){return Lr(e,r,t-1).bottom<=o}),i,0);return{begin:n,end:i=ne((function(t){return Lr(e,r,t).top>o}),n,i)}}function Yr(e,t,r,o){return r||(r=Rr(e,t)),Qr(e,t,r,Wr(e,t,Lr(e,r,o),"line").top)}function Xr(e,t,r,o){return!(e.bottom<=r)&&(e.top>r||(o?e.left:e.right)>t)}function $r(e,t,r,o,i){i-=Wt(t);var n=Rr(e,t),a=Vr(t),s=0,l=t.text.length,d=!0,c=de(t,e.doc.direction);if(c){var p=(e.options.lineWrapping?to:eo)(e,t,r,n,c,o,i);s=(d=1!=p.level)?p.from:p.to-1,l=d?p.to:p.from-1}var u,h,g=null,m=null,f=ne((function(t){var r=Lr(e,n,t);return r.top+=a,r.bottom+=a,!!Xr(r,o,i,!1)&&(r.top<=i&&r.left<=o&&(g=t,m=r),!0)}),s,l),y=!1;if(m){var b=o-m.left<m.right-o,v=b==d;f=g+(v?0:1),h=v?"after":"before",u=b?m.left:m.right}else{d||f!=l&&f!=s||f++,h=0==f?"after":f==t.text.length?"before":Lr(e,n,f-(d?1:0)).bottom+a<=i==d?"after":"before";var x=qr(e,et(r,f,h),"line",t,n);u=x.left,y=i<x.top?-1:i>=x.bottom?1:0}return Zr(r,f=ie(t.text,f,1),h,y,o-u)}function eo(e,t,r,o,i,n,a){var s=ne((function(s){var l=i[s],d=1!=l.level;return Xr(qr(e,et(r,d?l.to:l.from,d?"before":"after"),"line",t,o),n,a,!0)}),0,i.length-1),l=i[s];if(s>0){var d=1!=l.level,c=qr(e,et(r,d?l.from:l.to,d?"after":"before"),"line",t,o);Xr(c,n,a,!0)&&c.top>a&&(l=i[s-1])}return l}function to(e,t,r,o,i,n,a){var s=Qr(e,t,o,a),l=s.begin,d=s.end;/\s/.test(t.text.charAt(d-1))&&d--;for(var c=null,p=null,u=0;u<i.length;u++){var h=i[u];if(!(h.from>=d||h.to<=l)){var g=Lr(e,o,1!=h.level?Math.min(d,h.to)-1:Math.max(l,h.from)).right,m=g<n?n-g+1e9:g-n;(!c||p>m)&&(c=h,p=m)}}return c||(c=i[i.length-1]),c.from<l&&(c={from:l,to:c.to,level:c.level}),c.to>d&&(c={from:c.from,to:d,level:c.level}),c}function ro(e){if(null!=e.cachedTextHeight)return e.cachedTextHeight;if(null==Ir){Ir=P("pre",null,"CodeMirror-line-like");for(var t=0;t<49;++t)Ir.appendChild(document.createTextNode("x")),Ir.appendChild(P("br"));Ir.appendChild(document.createTextNode("x"))}O(e.measure,Ir);var r=Ir.offsetHeight/50;return r>3&&(e.cachedTextHeight=r),T(e.measure),r||1}function oo(e){if(null!=e.cachedCharWidth)return e.cachedCharWidth;var t=P("span","xxxxxxxxxx"),r=P("pre",[t],"CodeMirror-line-like");O(e.measure,r);var o=t.getBoundingClientRect(),i=(o.right-o.left)/10;return i>2&&(e.cachedCharWidth=i),i||10}function io(e){for(var t=e.display,r={},o={},i=t.gutters.clientLeft,n=t.gutters.firstChild,a=0;n;n=n.nextSibling,++a){var s=e.display.gutterSpecs[a].className;r[s]=n.offsetLeft+n.clientLeft+i,o[s]=n.clientWidth}return{fixedPos:no(t),gutterTotalWidth:t.gutters.offsetWidth,gutterLeft:r,gutterWidth:o,wrapperWidth:t.wrapper.clientWidth}}function no(e){return e.scroller.getBoundingClientRect().left-e.sizer.getBoundingClientRect().left}function ao(e){var t=ro(e.display),r=e.options.lineWrapping,o=r&&Math.max(5,e.display.scroller.clientWidth/oo(e.display)-3);return function(i){if(Bt(e.doc,i))return 0;var n=0;if(i.widgets)for(var a=0;a<i.widgets.length;a++)i.widgets[a].height&&(n+=i.widgets[a].height);return r?n+(Math.ceil(i.text.length/o)||1)*t:n+t}}function so(e){var t=e.doc,r=ao(e);t.iter((function(e){var t=r(e);t!=e.height&&Ge(e,t)}))}function lo(e,t,r,o){var i=e.display;if(!r&&"true"==Se(t).getAttribute("cm-not-content"))return null;var n,a,s=i.lineSpace.getBoundingClientRect();try{n=t.clientX-s.left,a=t.clientY-s.top}catch(e){return null}var l,d=Gr(e,n,a);if(o&&d.xRel>0&&(l=qe(e.doc,d.line).text).length==d.ch){var c=U(l,l.length,e.options.tabSize)-l.length;d=et(d.line,Math.max(0,Math.round((n-Cr(e.display).left)/oo(e.display))-c))}return d}function co(e,t){if(t>=e.display.viewTo)return null;if((t-=e.display.viewFrom)<0)return null;for(var r=e.display.view,o=0;o<r.length;o++)if((t-=r[o].size)<0)return o}function po(e,t,r,o){null==t&&(t=e.doc.first),null==r&&(r=e.doc.first+e.doc.size),o||(o=0);var i=e.display;if(o&&r<i.viewTo&&(null==i.updateLineNumbers||i.updateLineNumbers>t)&&(i.updateLineNumbers=t),e.curOp.viewChanged=!0,t>=i.viewTo)wt&&Dt(e.doc,t)<i.viewTo&&ho(e);else if(r<=i.viewFrom)wt&&Ht(e.doc,r+o)>i.viewFrom?ho(e):(i.viewFrom+=o,i.viewTo+=o);else if(t<=i.viewFrom&&r>=i.viewTo)ho(e);else if(t<=i.viewFrom){var n=go(e,r,r+o,1);n?(i.view=i.view.slice(n.index),i.viewFrom=n.lineN,i.viewTo+=o):ho(e)}else if(r>=i.viewTo){var a=go(e,t,t,-1);a?(i.view=i.view.slice(0,a.index),i.viewTo=a.lineN):ho(e)}else{var s=go(e,t,t,-1),l=go(e,r,r+o,1);s&&l?(i.view=i.view.slice(0,s.index).concat(ir(e,s.lineN,l.lineN)).concat(i.view.slice(l.index)),i.viewTo+=o):ho(e)}var d=i.externalMeasured;d&&(r<d.lineN?d.lineN+=o:t<d.lineN+d.size&&(i.externalMeasured=null))}function uo(e,t,r){e.curOp.viewChanged=!0;var o=e.display,i=e.display.externalMeasured;if(i&&t>=i.lineN&&t<i.lineN+i.size&&(o.externalMeasured=null),!(t<o.viewFrom||t>=o.viewTo)){var n=o.view[co(e,t)];if(null!=n.node){var a=n.changes||(n.changes=[]);-1==H(a,r)&&a.push(r)}}}function ho(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0}function go(e,t,r,o){var i,n=co(e,t),a=e.display.view;if(!wt||r==e.doc.first+e.doc.size)return{index:n,lineN:r};for(var s=e.display.viewFrom,l=0;l<n;l++)s+=a[l].size;if(s!=t){if(o>0){if(n==a.length-1)return null;i=s+a[n].size-t,n++}else i=s-t;t+=i,r+=i}for(;Dt(e.doc,r)!=r;){if(n==(o<0?0:a.length-1))return null;r+=o*a[n-(o<0?1:0)].size,n+=o}return{index:n,lineN:r}}function mo(e){for(var t=e.display.view,r=0,o=0;o<t.length;o++){var i=t[o];i.hidden||i.node&&!i.changes||++r}return r}function fo(e){e.display.input.showSelection(e.display.input.prepareSelection())}function yo(e,t){void 0===t&&(t=!0);for(var r=e.doc,o={},i=o.cursors=document.createDocumentFragment(),n=o.selection=document.createDocumentFragment(),a=0;a<r.sel.ranges.length;a++)if(t||a!=r.sel.primIndex){var s=r.sel.ranges[a];if(!(s.from().line>=e.display.viewTo||s.to().line<e.display.viewFrom)){var l=s.empty();(l||e.options.showCursorWhenSelecting)&&bo(e,s.head,i),l||xo(e,s,n)}}return o}function bo(e,t,r){var o=qr(e,t,"div",null,null,!e.options.singleCursorHeightPerLine),i=r.appendChild(P("div"," ","CodeMirror-cursor"));if(i.style.left=o.left+"px",i.style.top=o.top+"px",i.style.height=Math.max(0,o.bottom-o.top)*e.options.cursorHeight+"px",o.other){var n=r.appendChild(P("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"));n.style.display="",n.style.left=o.other.left+"px",n.style.top=o.other.top+"px",n.style.height=.85*(o.other.bottom-o.other.top)+"px"}}function vo(e,t){return e.top-t.top||e.left-t.left}function xo(e,t,r){var o=e.display,i=e.doc,n=document.createDocumentFragment(),a=Cr(e.display),s=a.left,l=Math.max(o.sizerWidth,Er(e)-o.sizer.offsetLeft)-a.right,d="ltr"==i.direction;function c(e,t,r,o){t<0&&(t=0),t=Math.round(t),o=Math.round(o),n.appendChild(P("div",null,"CodeMirror-selected","position: absolute; left: "+e+"px;\n                             top: "+t+"px; width: "+(null==r?l-e:r)+"px;\n                             height: "+(o-t)+"px"))}function p(t,r,o){var n,a,p=qe(i,t),u=p.text.length;function h(r,o){return Kr(e,et(t,r),"div",p,o)}function g(t,r,o){var i=Yr(e,p,null,t),n="ltr"==r==("after"==o)?"left":"right";return h("after"==o?i.begin:i.end-(/\s/.test(p.text.charAt(i.end-1))?2:1),n)[n]}var m=de(p,i.direction);return function(e,t,r,o){if(!e)return o(t,r,"ltr",0);for(var i=!1,n=0;n<e.length;++n){var a=e[n];(a.from<r&&a.to>t||t==r&&a.to==t)&&(o(Math.max(a.from,t),Math.min(a.to,r),1==a.level?"rtl":"ltr",n),i=!0)}i||o(t,r,"ltr")}(m,r||0,null==o?u:o,(function(e,t,i,p){var f="ltr"==i,y=h(e,f?"left":"right"),b=h(t-1,f?"right":"left"),v=null==r&&0==e,x=null==o&&t==u,_=0==p,w=!m||p==m.length-1;if(b.top-y.top<=3){var S=(d?x:v)&&w,C=(d?v:x)&&_?s:(f?y:b).left,k=S?l:(f?b:y).right;c(C,y.top,k-C,y.bottom)}else{var E,T,O,P;f?(E=d&&v&&_?s:y.left,T=d?l:g(e,i,"before"),O=d?s:g(t,i,"after"),P=d&&x&&w?l:b.right):(E=d?g(e,i,"before"):s,T=!d&&v&&_?l:y.right,O=!d&&x&&w?s:b.left,P=d?g(t,i,"after"):l),c(E,y.top,T-E,y.bottom),y.bottom<b.top&&c(s,y.bottom,null,b.top),c(O,b.top,P-O,b.bottom)}(!n||vo(y,n)<0)&&(n=y),vo(b,n)<0&&(n=b),(!a||vo(y,a)<0)&&(a=y),vo(b,a)<0&&(a=b)})),{start:n,end:a}}var u=t.from(),h=t.to();if(u.line==h.line)p(u.line,u.ch,h.ch);else{var g=qe(i,u.line),m=qe(i,h.line),f=Ut(g)==Ut(m),y=p(u.line,u.ch,f?g.text.length+1:null).end,b=p(h.line,f?0:null,h.ch).start;f&&(y.top<b.top-2?(c(y.right,y.top,null,y.bottom),c(s,b.top,b.left,b.bottom)):c(y.right,y.top,b.left-y.right,y.bottom)),y.bottom<b.top&&c(s,y.bottom,null,b.top)}r.appendChild(n)}function _o(e){if(e.state.focused){var t=e.display;clearInterval(t.blinker);var r=!0;t.cursorDiv.style.visibility="",e.options.cursorBlinkRate>0?t.blinker=setInterval((function(){e.hasFocus()||ko(e),t.cursorDiv.style.visibility=(r=!r)?"":"hidden"}),e.options.cursorBlinkRate):e.options.cursorBlinkRate<0&&(t.cursorDiv.style.visibility="hidden")}}function wo(e){e.hasFocus()||(e.display.input.focus(),e.state.focused||Co(e))}function So(e){e.state.delayingBlurEvent=!0,setTimeout((function(){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1,e.state.focused&&ko(e))}),100)}function Co(e,t){e.state.delayingBlurEvent&&!e.state.draggingText&&(e.state.delayingBlurEvent=!1),"nocursor"!=e.options.readOnly&&(e.state.focused||(ge(e,"focus",e,t),e.state.focused=!0,I(e.display.wrapper,"CodeMirror-focused"),e.curOp||e.display.selForContextMenu==e.doc.sel||(e.display.input.reset(),l&&setTimeout((function(){return e.display.input.reset(!0)}),20)),e.display.input.receivedFocus()),_o(e))}function ko(e,t){e.state.delayingBlurEvent||(e.state.focused&&(ge(e,"blur",e,t),e.state.focused=!1,E(e.display.wrapper,"CodeMirror-focused")),clearInterval(e.display.blinker),setTimeout((function(){e.state.focused||(e.display.shift=!1)}),150))}function Eo(e){for(var t=e.display,r=t.lineDiv.offsetTop,o=0;o<t.view.length;o++){var i=t.view[o],n=e.options.lineWrapping,l=void 0,d=0;if(!i.hidden){if(a&&s<8){var c=i.node.offsetTop+i.node.offsetHeight;l=c-r,r=c}else{var p=i.node.getBoundingClientRect();l=p.bottom-p.top,!n&&i.text.firstChild&&(d=i.text.firstChild.getBoundingClientRect().right-p.left-1)}var u=i.line.height-l;if((u>.005||u<-.005)&&(Ge(i.line,l),To(i.line),i.rest))for(var h=0;h<i.rest.length;h++)To(i.rest[h]);if(d>e.display.sizerWidth){var g=Math.ceil(d/oo(e.display));g>e.display.maxLineLength&&(e.display.maxLineLength=g,e.display.maxLine=i.line,e.display.maxLineChanged=!0)}}}}function To(e){if(e.widgets)for(var t=0;t<e.widgets.length;++t){var r=e.widgets[t],o=r.node.parentNode;o&&(r.height=o.offsetHeight)}}function Oo(e,t,r){var o=r&&null!=r.top?Math.max(0,r.top):e.scroller.scrollTop;o=Math.floor(o-wr(e));var i=r&&null!=r.bottom?r.bottom:o+e.wrapper.clientHeight,n=Ye(t,o),a=Ye(t,i);if(r&&r.ensure){var s=r.ensure.from.line,l=r.ensure.to.line;s<n?(n=s,a=Ye(t,Wt(qe(t,s))+e.wrapper.clientHeight)):Math.min(l,t.lastLine())>=a&&(n=Ye(t,Wt(qe(t,l))-e.wrapper.clientHeight),a=l)}return{from:n,to:Math.max(a,n+1)}}function Po(e,t){var r=e.display,o=ro(e.display);t.top<0&&(t.top=0);var i=e.curOp&&null!=e.curOp.scrollTop?e.curOp.scrollTop:r.scroller.scrollTop,n=Tr(e),a={};t.bottom-t.top>n&&(t.bottom=t.top+n);var s=e.doc.height+Sr(r),l=t.top<o,d=t.bottom>s-o;if(t.top<i)a.scrollTop=l?0:t.top;else if(t.bottom>i+n){var c=Math.min(t.top,(d?s:t.bottom)-n);c!=i&&(a.scrollTop=c)}var p=e.options.fixedGutter?0:r.gutters.offsetWidth,u=e.curOp&&null!=e.curOp.scrollLeft?e.curOp.scrollLeft:r.scroller.scrollLeft-p,h=Er(e)-r.gutters.offsetWidth,g=t.right-t.left>h;return g&&(t.right=t.left+h),t.left<10?a.scrollLeft=0:t.left<u?a.scrollLeft=Math.max(0,t.left+p-(g?0:10)):t.right>h+u-3&&(a.scrollLeft=t.right+(g?0:10)-h),a}function Ao(e,t){null!=t&&(Io(e),e.curOp.scrollTop=(null==e.curOp.scrollTop?e.doc.scrollTop:e.curOp.scrollTop)+t)}function Ro(e){Io(e);var t=e.getCursor();e.curOp.scrollToPos={from:t,to:t,margin:e.options.cursorScrollMargin}}function Lo(e,t,r){null==t&&null==r||Io(e),null!=t&&(e.curOp.scrollLeft=t),null!=r&&(e.curOp.scrollTop=r)}function Io(e){var t=e.curOp.scrollToPos;t&&(e.curOp.scrollToPos=null,Mo(e,Jr(e,t.from),Jr(e,t.to),t.margin))}function Mo(e,t,r,o){var i=Po(e,{left:Math.min(t.left,r.left),top:Math.min(t.top,r.top)-o,right:Math.max(t.right,r.right),bottom:Math.max(t.bottom,r.bottom)+o});Lo(e,i.scrollLeft,i.scrollTop)}function No(e,t){Math.abs(e.doc.scrollTop-t)<2||(r||li(e,{top:t}),zo(e,t,!0),r&&li(e),oi(e,100))}function zo(e,t,r){t=Math.max(0,Math.min(e.display.scroller.scrollHeight-e.display.scroller.clientHeight,t)),(e.display.scroller.scrollTop!=t||r)&&(e.doc.scrollTop=t,e.display.scrollbars.setScrollTop(t),e.display.scroller.scrollTop!=t&&(e.display.scroller.scrollTop=t))}function Fo(e,t,r,o){t=Math.max(0,Math.min(t,e.display.scroller.scrollWidth-e.display.scroller.clientWidth)),(r?t==e.doc.scrollLeft:Math.abs(e.doc.scrollLeft-t)<2)&&!o||(e.doc.scrollLeft=t,pi(e),e.display.scroller.scrollLeft!=t&&(e.display.scroller.scrollLeft=t),e.display.scrollbars.setScrollLeft(t))}function Uo(e){var t=e.display,r=t.gutters.offsetWidth,o=Math.round(e.doc.height+Sr(e.display));return{clientHeight:t.scroller.clientHeight,viewHeight:t.wrapper.clientHeight,scrollWidth:t.scroller.scrollWidth,clientWidth:t.scroller.clientWidth,viewWidth:t.wrapper.clientWidth,barLeft:e.options.fixedGutter?r:0,docHeight:o,scrollHeight:o+kr(e)+t.barHeight,nativeBarWidth:t.nativeBarWidth,gutterWidth:r}}var Do=function(e,t,r){this.cm=r;var o=this.vert=P("div",[P("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),i=this.horiz=P("div",[P("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar");o.tabIndex=i.tabIndex=-1,e(o),e(i),pe(o,"scroll",(function(){o.clientHeight&&t(o.scrollTop,"vertical")})),pe(i,"scroll",(function(){i.clientWidth&&t(i.scrollLeft,"horizontal")})),this.checkedZeroWidth=!1,a&&s<8&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")};Do.prototype.update=function(e){var t=e.scrollWidth>e.clientWidth+1,r=e.scrollHeight>e.clientHeight+1,o=e.nativeBarWidth;if(r){this.vert.style.display="block",this.vert.style.bottom=t?o+"px":"0";var i=e.viewHeight-(t?o:0);this.vert.firstChild.style.height=Math.max(0,e.scrollHeight-e.clientHeight+i)+"px"}else this.vert.style.display="",this.vert.firstChild.style.height="0";if(t){this.horiz.style.display="block",this.horiz.style.right=r?o+"px":"0",this.horiz.style.left=e.barLeft+"px";var n=e.viewWidth-e.barLeft-(r?o:0);this.horiz.firstChild.style.width=Math.max(0,e.scrollWidth-e.clientWidth+n)+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0";return!this.checkedZeroWidth&&e.clientHeight>0&&(0==o&&this.zeroWidthHack(),this.checkedZeroWidth=!0),{right:r?o:0,bottom:t?o:0}},Do.prototype.setScrollLeft=function(e){this.horiz.scrollLeft!=e&&(this.horiz.scrollLeft=e),this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz,"horiz")},Do.prototype.setScrollTop=function(e){this.vert.scrollTop!=e&&(this.vert.scrollTop=e),this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert,"vert")},Do.prototype.zeroWidthHack=function(){var e=b&&!h?"12px":"18px";this.horiz.style.height=this.vert.style.width=e,this.horiz.style.pointerEvents=this.vert.style.pointerEvents="none",this.disableHoriz=new D,this.disableVert=new D},Do.prototype.enableZeroWidthBar=function(e,t,r){e.style.pointerEvents="auto",t.set(1e3,(function o(){var i=e.getBoundingClientRect();("vert"==r?document.elementFromPoint(i.right-1,(i.top+i.bottom)/2):document.elementFromPoint((i.right+i.left)/2,i.bottom-1))!=e?e.style.pointerEvents="none":t.set(1e3,o)}))},Do.prototype.clear=function(){var e=this.horiz.parentNode;e.removeChild(this.horiz),e.removeChild(this.vert)};var Ho=function(){};function Bo(e,t){t||(t=Uo(e));var r=e.display.barWidth,o=e.display.barHeight;Vo(e,t);for(var i=0;i<4&&r!=e.display.barWidth||o!=e.display.barHeight;i++)r!=e.display.barWidth&&e.options.lineWrapping&&Eo(e),Vo(e,Uo(e)),r=e.display.barWidth,o=e.display.barHeight}function Vo(e,t){var r=e.display,o=r.scrollbars.update(t);r.sizer.style.paddingRight=(r.barWidth=o.right)+"px",r.sizer.style.paddingBottom=(r.barHeight=o.bottom)+"px",r.heightForcer.style.borderBottom=o.bottom+"px solid transparent",o.right&&o.bottom?(r.scrollbarFiller.style.display="block",r.scrollbarFiller.style.height=o.bottom+"px",r.scrollbarFiller.style.width=o.right+"px"):r.scrollbarFiller.style.display="",o.bottom&&e.options.coverGutterNextToScrollbar&&e.options.fixedGutter?(r.gutterFiller.style.display="block",r.gutterFiller.style.height=o.bottom+"px",r.gutterFiller.style.width=t.gutterWidth+"px"):r.gutterFiller.style.display=""}Ho.prototype.update=function(){return{bottom:0,right:0}},Ho.prototype.setScrollLeft=function(){},Ho.prototype.setScrollTop=function(){},Ho.prototype.clear=function(){};var Wo={native:Do,null:Ho};function jo(e){e.display.scrollbars&&(e.display.scrollbars.clear(),e.display.scrollbars.addClass&&E(e.display.wrapper,e.display.scrollbars.addClass)),e.display.scrollbars=new Wo[e.options.scrollbarStyle]((function(t){e.display.wrapper.insertBefore(t,e.display.scrollbarFiller),pe(t,"mousedown",(function(){e.state.focused&&setTimeout((function(){return e.display.input.focus()}),0)})),t.setAttribute("cm-not-content","true")}),(function(t,r){"horizontal"==r?Fo(e,t):No(e,t)}),e),e.display.scrollbars.addClass&&I(e.display.wrapper,e.display.scrollbars.addClass)}var Ko=0;function qo(e){var t;e.curOp={cm:e,viewChanged:!1,startHeight:e.doc.height,forceUpdate:!1,updateInput:0,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++Ko},t=e.curOp,nr?nr.ops.push(t):t.ownsGroup=nr={ops:[t],delayedCallbacks:[]}}function Jo(e){var t=e.curOp;t&&function(e,t){var r=e.ownsGroup;if(r)try{!function(e){var t=e.delayedCallbacks,r=0;do{for(;r<t.length;r++)t[r].call(null);for(var o=0;o<e.ops.length;o++){var i=e.ops[o];if(i.cursorActivityHandlers)for(;i.cursorActivityCalled<i.cursorActivityHandlers.length;)i.cursorActivityHandlers[i.cursorActivityCalled++].call(null,i.cm)}}while(r<t.length)}(r)}finally{nr=null,function(e){for(var t=0;t<e.ops.length;t++)e.ops[t].cm.curOp=null;!function(e){for(var t=e.ops,r=0;r<t.length;r++)Zo(t[r]);for(var o=0;o<t.length;o++)Go(t[o]);for(var i=0;i<t.length;i++)Qo(t[i]);for(var n=0;n<t.length;n++)Yo(t[n]);for(var a=0;a<t.length;a++)Xo(t[a])}(e)}(r)}}(t)}function Zo(e){var t=e.cm,r=t.display;!function(e){var t=e.display;!t.scrollbarsClipped&&t.scroller.offsetWidth&&(t.nativeBarWidth=t.scroller.offsetWidth-t.scroller.clientWidth,t.heightForcer.style.height=kr(e)+"px",t.sizer.style.marginBottom=-t.nativeBarWidth+"px",t.sizer.style.borderRightWidth=kr(e)+"px",t.scrollbarsClipped=!0)}(t),e.updateMaxLine&&Kt(t),e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<r.viewFrom||e.scrollToPos.to.line>=r.viewTo)||r.maxLineChanged&&t.options.lineWrapping,e.update=e.mustUpdate&&new ni(t,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}function Go(e){e.updatedDisplay=e.mustUpdate&&ai(e.cm,e.update)}function Qo(e){var t=e.cm,r=t.display;e.updatedDisplay&&Eo(t),e.barMeasure=Uo(t),r.maxLineChanged&&!t.options.lineWrapping&&(e.adjustWidthTo=Pr(t,r.maxLine,r.maxLine.text.length).left+3,t.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(r.scroller.clientWidth,r.sizer.offsetLeft+e.adjustWidthTo+kr(t)+t.display.barWidth),e.maxScrollLeft=Math.max(0,r.sizer.offsetLeft+e.adjustWidthTo-Er(t))),(e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=r.input.prepareSelection())}function Yo(e){var t=e.cm;null!=e.adjustWidthTo&&(t.display.sizer.style.minWidth=e.adjustWidthTo+"px",e.maxScrollLeft<t.doc.scrollLeft&&Fo(t,Math.min(t.display.scroller.scrollLeft,e.maxScrollLeft),!0),t.display.maxLineChanged=!1);var r=e.focus&&e.focus==L();e.preparedSelection&&t.display.input.showSelection(e.preparedSelection,r),(e.updatedDisplay||e.startHeight!=t.doc.height)&&Bo(t,e.barMeasure),e.updatedDisplay&&ci(t,e.barMeasure),e.selectionChanged&&_o(t),t.state.focused&&e.updateInput&&t.display.input.reset(e.typing),r&&wo(e.cm)}function Xo(e){var t=e.cm,r=t.display,o=t.doc;e.updatedDisplay&&si(t,e.update),null==r.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(r.wheelStartX=r.wheelStartY=null),null!=e.scrollTop&&zo(t,e.scrollTop,e.forceScroll),null!=e.scrollLeft&&Fo(t,e.scrollLeft,!0,!0),e.scrollToPos&&function(e,t){if(!me(e,"scrollCursorIntoView")){var r=e.display,o=r.sizer.getBoundingClientRect(),i=null;if(t.top+o.top<0?i=!0:t.bottom+o.top>(window.innerHeight||document.documentElement.clientHeight)&&(i=!1),null!=i&&!g){var n=P("div","​",null,"position: absolute;\n                         top: "+(t.top-r.viewOffset-wr(e.display))+"px;\n                         height: "+(t.bottom-t.top+kr(e)+r.barHeight)+"px;\n                         left: "+t.left+"px; width: "+Math.max(2,t.right-t.left)+"px;");e.display.lineSpace.appendChild(n),n.scrollIntoView(i),e.display.lineSpace.removeChild(n)}}}(t,function(e,t,r,o){var i;null==o&&(o=0),e.options.lineWrapping||t!=r||(r="before"==(t=t.ch?et(t.line,"before"==t.sticky?t.ch-1:t.ch,"after"):t).sticky?et(t.line,t.ch+1,"before"):t);for(var n=0;n<5;n++){var a=!1,s=qr(e,t),l=r&&r!=t?qr(e,r):s,d=Po(e,i={left:Math.min(s.left,l.left),top:Math.min(s.top,l.top)-o,right:Math.max(s.left,l.left),bottom:Math.max(s.bottom,l.bottom)+o}),c=e.doc.scrollTop,p=e.doc.scrollLeft;if(null!=d.scrollTop&&(No(e,d.scrollTop),Math.abs(e.doc.scrollTop-c)>1&&(a=!0)),null!=d.scrollLeft&&(Fo(e,d.scrollLeft),Math.abs(e.doc.scrollLeft-p)>1&&(a=!0)),!a)break}return i}(t,st(o,e.scrollToPos.from),st(o,e.scrollToPos.to),e.scrollToPos.margin));var i=e.maybeHiddenMarkers,n=e.maybeUnhiddenMarkers;if(i)for(var a=0;a<i.length;++a)i[a].lines.length||ge(i[a],"hide");if(n)for(var s=0;s<n.length;++s)n[s].lines.length&&ge(n[s],"unhide");r.wrapper.offsetHeight&&(o.scrollTop=t.display.scroller.scrollTop),e.changeObjs&&ge(t,"changes",t,e.changeObjs),e.update&&e.update.finish()}function $o(e,t){if(e.curOp)return t();qo(e);try{return t()}finally{Jo(e)}}function ei(e,t){return function(){if(e.curOp)return t.apply(e,arguments);qo(e);try{return t.apply(e,arguments)}finally{Jo(e)}}}function ti(e){return function(){if(this.curOp)return e.apply(this,arguments);qo(this);try{return e.apply(this,arguments)}finally{Jo(this)}}}function ri(e){return function(){var t=this.cm;if(!t||t.curOp)return e.apply(this,arguments);qo(t);try{return e.apply(this,arguments)}finally{Jo(t)}}}function oi(e,t){e.doc.highlightFrontier<e.display.viewTo&&e.state.highlight.set(t,z(ii,e))}function ii(e){var t=e.doc;if(!(t.highlightFrontier>=e.display.viewTo)){var r=+new Date+e.options.workTime,o=ht(e,t.highlightFrontier),i=[];t.iter(o.line,Math.min(t.first+t.size,e.display.viewTo+500),(function(n){if(o.line>=e.display.viewFrom){var a=n.styles,s=n.text.length>e.options.maxHighlightLength?Ve(t.mode,o.state):null,l=pt(e,n,o,!0);s&&(o.state=s),n.styles=l.styles;var d=n.styleClasses,c=l.classes;c?n.styleClasses=c:d&&(n.styleClasses=null);for(var p=!a||a.length!=n.styles.length||d!=c&&(!d||!c||d.bgClass!=c.bgClass||d.textClass!=c.textClass),u=0;!p&&u<a.length;++u)p=a[u]!=n.styles[u];p&&i.push(o.line),n.stateAfter=o.save(),o.nextLine()}else n.text.length<=e.options.maxHighlightLength&&gt(e,n.text,o),n.stateAfter=o.line%5==0?o.save():null,o.nextLine();if(+new Date>r)return oi(e,e.options.workDelay),!0})),t.highlightFrontier=o.line,t.modeFrontier=Math.max(t.modeFrontier,o.line),i.length&&$o(e,(function(){for(var t=0;t<i.length;t++)uo(e,i[t],"text")}))}}var ni=function(e,t,r){var o=e.display;this.viewport=t,this.visible=Oo(o,e.doc,t),this.editorIsHidden=!o.wrapper.offsetWidth,this.wrapperHeight=o.wrapper.clientHeight,this.wrapperWidth=o.wrapper.clientWidth,this.oldDisplayWidth=Er(e),this.force=r,this.dims=io(e),this.events=[]};function ai(e,t){var r=e.display,o=e.doc;if(t.editorIsHidden)return ho(e),!1;if(!t.force&&t.visible.from>=r.viewFrom&&t.visible.to<=r.viewTo&&(null==r.updateLineNumbers||r.updateLineNumbers>=r.viewTo)&&r.renderedView==r.view&&0==mo(e))return!1;ui(e)&&(ho(e),t.dims=io(e));var i=o.first+o.size,n=Math.max(t.visible.from-e.options.viewportMargin,o.first),a=Math.min(i,t.visible.to+e.options.viewportMargin);r.viewFrom<n&&n-r.viewFrom<20&&(n=Math.max(o.first,r.viewFrom)),r.viewTo>a&&r.viewTo-a<20&&(a=Math.min(i,r.viewTo)),wt&&(n=Dt(e.doc,n),a=Ht(e.doc,a));var s=n!=r.viewFrom||a!=r.viewTo||r.lastWrapHeight!=t.wrapperHeight||r.lastWrapWidth!=t.wrapperWidth;!function(e,t,r){var o=e.display;0==o.view.length||t>=o.viewTo||r<=o.viewFrom?(o.view=ir(e,t,r),o.viewFrom=t):(o.viewFrom>t?o.view=ir(e,t,o.viewFrom).concat(o.view):o.viewFrom<t&&(o.view=o.view.slice(co(e,t))),o.viewFrom=t,o.viewTo<r?o.view=o.view.concat(ir(e,o.viewTo,r)):o.viewTo>r&&(o.view=o.view.slice(0,co(e,r)))),o.viewTo=r}(e,n,a),r.viewOffset=Wt(qe(e.doc,r.viewFrom)),e.display.mover.style.top=r.viewOffset+"px";var d=mo(e);if(!s&&0==d&&!t.force&&r.renderedView==r.view&&(null==r.updateLineNumbers||r.updateLineNumbers>=r.viewTo))return!1;var c=function(e){if(e.hasFocus())return null;var t=L();if(!t||!R(e.display.lineDiv,t))return null;var r={activeElt:t};if(window.getSelection){var o=window.getSelection();o.anchorNode&&o.extend&&R(e.display.lineDiv,o.anchorNode)&&(r.anchorNode=o.anchorNode,r.anchorOffset=o.anchorOffset,r.focusNode=o.focusNode,r.focusOffset=o.focusOffset)}return r}(e);return d>4&&(r.lineDiv.style.display="none"),function(e,t,r){var o=e.display,i=e.options.lineNumbers,n=o.lineDiv,a=n.firstChild;function s(t){var r=t.nextSibling;return l&&b&&e.display.currentWheelTarget==t?t.style.display="none":t.parentNode.removeChild(t),r}for(var d=o.view,c=o.viewFrom,p=0;p<d.length;p++){var u=d[p];if(u.hidden);else if(u.node&&u.node.parentNode==n){for(;a!=u.node;)a=s(a);var h=i&&null!=t&&t<=c&&u.lineNumber;u.changes&&(H(u.changes,"gutter")>-1&&(h=!1),dr(e,u,c,r)),h&&(T(u.lineNumber),u.lineNumber.appendChild(document.createTextNode($e(e.options,c)))),a=u.node.nextSibling}else{var g=fr(e,u,c,r);n.insertBefore(g,a)}c+=u.size}for(;a;)a=s(a)}(e,r.updateLineNumbers,t.dims),d>4&&(r.lineDiv.style.display=""),r.renderedView=r.view,function(e){if(e&&e.activeElt&&e.activeElt!=L()&&(e.activeElt.focus(),!/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName)&&e.anchorNode&&R(document.body,e.anchorNode)&&R(document.body,e.focusNode))){var t=window.getSelection(),r=document.createRange();r.setEnd(e.anchorNode,e.anchorOffset),r.collapse(!1),t.removeAllRanges(),t.addRange(r),t.extend(e.focusNode,e.focusOffset)}}(c),T(r.cursorDiv),T(r.selectionDiv),r.gutters.style.height=r.sizer.style.minHeight=0,s&&(r.lastWrapHeight=t.wrapperHeight,r.lastWrapWidth=t.wrapperWidth,oi(e,400)),r.updateLineNumbers=null,!0}function si(e,t){for(var r=t.viewport,o=!0;;o=!1){if(o&&e.options.lineWrapping&&t.oldDisplayWidth!=Er(e))o&&(t.visible=Oo(e.display,e.doc,r));else if(r&&null!=r.top&&(r={top:Math.min(e.doc.height+Sr(e.display)-Tr(e),r.top)}),t.visible=Oo(e.display,e.doc,r),t.visible.from>=e.display.viewFrom&&t.visible.to<=e.display.viewTo)break;if(!ai(e,t))break;Eo(e);var i=Uo(e);fo(e),Bo(e,i),ci(e,i),t.force=!1}t.signal(e,"update",e),e.display.viewFrom==e.display.reportedViewFrom&&e.display.viewTo==e.display.reportedViewTo||(t.signal(e,"viewportChange",e,e.display.viewFrom,e.display.viewTo),e.display.reportedViewFrom=e.display.viewFrom,e.display.reportedViewTo=e.display.viewTo)}function li(e,t){var r=new ni(e,t);if(ai(e,r)){Eo(e),si(e,r);var o=Uo(e);fo(e),Bo(e,o),ci(e,o),r.finish()}}function di(e){var t=e.gutters.offsetWidth;e.sizer.style.marginLeft=t+"px"}function ci(e,t){e.display.sizer.style.minHeight=t.docHeight+"px",e.display.heightForcer.style.top=t.docHeight+"px",e.display.gutters.style.height=t.docHeight+e.display.barHeight+kr(e)+"px"}function pi(e){var t=e.display,r=t.view;if(t.alignWidgets||t.gutters.firstChild&&e.options.fixedGutter){for(var o=no(t)-t.scroller.scrollLeft+e.doc.scrollLeft,i=t.gutters.offsetWidth,n=o+"px",a=0;a<r.length;a++)if(!r[a].hidden){e.options.fixedGutter&&(r[a].gutter&&(r[a].gutter.style.left=n),r[a].gutterBackground&&(r[a].gutterBackground.style.left=n));var s=r[a].alignable;if(s)for(var l=0;l<s.length;l++)s[l].style.left=n}e.options.fixedGutter&&(t.gutters.style.left=o+i+"px")}}function ui(e){if(!e.options.lineNumbers)return!1;var t=e.doc,r=$e(e.options,t.first+t.size-1),o=e.display;if(r.length!=o.lineNumChars){var i=o.measure.appendChild(P("div",[P("div",r)],"CodeMirror-linenumber CodeMirror-gutter-elt")),n=i.firstChild.offsetWidth,a=i.offsetWidth-n;return o.lineGutter.style.width="",o.lineNumInnerWidth=Math.max(n,o.lineGutter.offsetWidth-a)+1,o.lineNumWidth=o.lineNumInnerWidth+a,o.lineNumChars=o.lineNumInnerWidth?r.length:-1,o.lineGutter.style.width=o.lineNumWidth+"px",di(e.display),!0}return!1}function hi(e,t){for(var r=[],o=!1,i=0;i<e.length;i++){var n=e[i],a=null;if("string"!=typeof n&&(a=n.style,n=n.className),"CodeMirror-linenumbers"==n){if(!t)continue;o=!0}r.push({className:n,style:a})}return t&&!o&&r.push({className:"CodeMirror-linenumbers",style:null}),r}function gi(e){var t=e.gutters,r=e.gutterSpecs;T(t),e.lineGutter=null;for(var o=0;o<r.length;++o){var i=r[o],n=i.className,a=i.style,s=t.appendChild(P("div",null,"CodeMirror-gutter "+n));a&&(s.style.cssText=a),"CodeMirror-linenumbers"==n&&(e.lineGutter=s,s.style.width=(e.lineNumWidth||1)+"px")}t.style.display=r.length?"":"none",di(e)}function mi(e){gi(e.display),po(e),pi(e)}function fi(e,t,o,i){var n=this;this.input=o,n.scrollbarFiller=P("div",null,"CodeMirror-scrollbar-filler"),n.scrollbarFiller.setAttribute("cm-not-content","true"),n.gutterFiller=P("div",null,"CodeMirror-gutter-filler"),n.gutterFiller.setAttribute("cm-not-content","true"),n.lineDiv=A("div",null,"CodeMirror-code"),n.selectionDiv=P("div",null,null,"position: relative; z-index: 1"),n.cursorDiv=P("div",null,"CodeMirror-cursors"),n.measure=P("div",null,"CodeMirror-measure"),n.lineMeasure=P("div",null,"CodeMirror-measure"),n.lineSpace=A("div",[n.measure,n.lineMeasure,n.selectionDiv,n.cursorDiv,n.lineDiv],null,"position: relative; outline: none");var d=A("div",[n.lineSpace],"CodeMirror-lines");n.mover=P("div",[d],null,"position: relative"),n.sizer=P("div",[n.mover],"CodeMirror-sizer"),n.sizerWidth=null,n.heightForcer=P("div",null,null,"position: absolute; height: 50px; width: 1px;"),n.gutters=P("div",null,"CodeMirror-gutters"),n.lineGutter=null,n.scroller=P("div",[n.sizer,n.heightForcer,n.gutters],"CodeMirror-scroll"),n.scroller.setAttribute("tabIndex","-1"),n.wrapper=P("div",[n.scrollbarFiller,n.gutterFiller,n.scroller],"CodeMirror"),a&&s<8&&(n.gutters.style.zIndex=-1,n.scroller.style.paddingRight=0),l||r&&y||(n.scroller.draggable=!0),e&&(e.appendChild?e.appendChild(n.wrapper):e(n.wrapper)),n.viewFrom=n.viewTo=t.first,n.reportedViewFrom=n.reportedViewTo=t.first,n.view=[],n.renderedView=null,n.externalMeasured=null,n.viewOffset=0,n.lastWrapHeight=n.lastWrapWidth=0,n.updateLineNumbers=null,n.nativeBarWidth=n.barHeight=n.barWidth=0,n.scrollbarsClipped=!1,n.lineNumWidth=n.lineNumInnerWidth=n.lineNumChars=null,n.alignWidgets=!1,n.cachedCharWidth=n.cachedTextHeight=n.cachedPaddingH=null,n.maxLine=null,n.maxLineLength=0,n.maxLineChanged=!1,n.wheelDX=n.wheelDY=n.wheelStartX=n.wheelStartY=null,n.shift=!1,n.selForContextMenu=null,n.activeTouch=null,n.gutterSpecs=hi(i.gutters,i.lineNumbers),gi(n),o.init(n)}ni.prototype.signal=function(e,t){ye(e,t)&&this.events.push(arguments)},ni.prototype.finish=function(){for(var e=0;e<this.events.length;e++)ge.apply(null,this.events[e])};var yi=0,bi=null;function vi(e){var t=e.wheelDeltaX,r=e.wheelDeltaY;return null==t&&e.detail&&e.axis==e.HORIZONTAL_AXIS&&(t=e.detail),null==r&&e.detail&&e.axis==e.VERTICAL_AXIS?r=e.detail:null==r&&(r=e.wheelDelta),{x:t,y:r}}function xi(e){var t=vi(e);return t.x*=bi,t.y*=bi,t}function _i(e,t){var o=vi(t),i=o.x,n=o.y,a=e.display,s=a.scroller,d=s.scrollWidth>s.clientWidth,c=s.scrollHeight>s.clientHeight;if(i&&d||n&&c){if(n&&b&&l)e:for(var u=t.target,h=a.view;u!=s;u=u.parentNode)for(var g=0;g<h.length;g++)if(h[g].node==u){e.display.currentWheelTarget=u;break e}if(i&&!r&&!p&&null!=bi)return n&&c&&No(e,Math.max(0,s.scrollTop+n*bi)),Fo(e,Math.max(0,s.scrollLeft+i*bi)),(!n||n&&c)&&ve(t),void(a.wheelStartX=null);if(n&&null!=bi){var m=n*bi,f=e.doc.scrollTop,y=f+a.wrapper.clientHeight;m<0?f=Math.max(0,f+m-50):y=Math.min(e.doc.height,y+m+50),li(e,{top:f,bottom:y})}yi<20&&(null==a.wheelStartX?(a.wheelStartX=s.scrollLeft,a.wheelStartY=s.scrollTop,a.wheelDX=i,a.wheelDY=n,setTimeout((function(){if(null!=a.wheelStartX){var e=s.scrollLeft-a.wheelStartX,t=s.scrollTop-a.wheelStartY,r=t&&a.wheelDY&&t/a.wheelDY||e&&a.wheelDX&&e/a.wheelDX;a.wheelStartX=a.wheelStartY=null,r&&(bi=(bi*yi+r)/(yi+1),++yi)}}),200)):(a.wheelDX+=i,a.wheelDY+=n))}}a?bi=-.53:r?bi=15:c?bi=-.7:u&&(bi=-1/3);var wi=function(e,t){this.ranges=e,this.primIndex=t};wi.prototype.primary=function(){return this.ranges[this.primIndex]},wi.prototype.equals=function(e){if(e==this)return!0;if(e.primIndex!=this.primIndex||e.ranges.length!=this.ranges.length)return!1;for(var t=0;t<this.ranges.length;t++){var r=this.ranges[t],o=e.ranges[t];if(!rt(r.anchor,o.anchor)||!rt(r.head,o.head))return!1}return!0},wi.prototype.deepCopy=function(){for(var e=[],t=0;t<this.ranges.length;t++)e[t]=new Si(ot(this.ranges[t].anchor),ot(this.ranges[t].head));return new wi(e,this.primIndex)},wi.prototype.somethingSelected=function(){for(var e=0;e<this.ranges.length;e++)if(!this.ranges[e].empty())return!0;return!1},wi.prototype.contains=function(e,t){t||(t=e);for(var r=0;r<this.ranges.length;r++){var o=this.ranges[r];if(tt(t,o.from())>=0&&tt(e,o.to())<=0)return r}return-1};var Si=function(e,t){this.anchor=e,this.head=t};function Ci(e,t,r){var o=e&&e.options.selectionsMayTouch,i=t[r];t.sort((function(e,t){return tt(e.from(),t.from())})),r=H(t,i);for(var n=1;n<t.length;n++){var a=t[n],s=t[n-1],l=tt(s.to(),a.from());if(o&&!a.empty()?l>0:l>=0){var d=nt(s.from(),a.from()),c=it(s.to(),a.to()),p=s.empty()?a.from()==a.head:s.from()==s.head;n<=r&&--r,t.splice(--n,2,new Si(p?c:d,p?d:c))}}return new wi(t,r)}function ki(e,t){return new wi([new Si(e,t||e)],0)}function Ei(e){return e.text?et(e.from.line+e.text.length-1,Z(e.text).length+(1==e.text.length?e.from.ch:0)):e.to}function Ti(e,t){if(tt(e,t.from)<0)return e;if(tt(e,t.to)<=0)return Ei(t);var r=e.line+t.text.length-(t.to.line-t.from.line)-1,o=e.ch;return e.line==t.to.line&&(o+=Ei(t).ch-t.to.ch),et(r,o)}function Oi(e,t){for(var r=[],o=0;o<e.sel.ranges.length;o++){var i=e.sel.ranges[o];r.push(new Si(Ti(i.anchor,t),Ti(i.head,t)))}return Ci(e.cm,r,e.sel.primIndex)}function Pi(e,t,r){return e.line==t.line?et(r.line,e.ch-t.ch+r.ch):et(r.line+(e.line-t.line),e.ch)}function Ai(e){e.doc.mode=De(e.options,e.doc.modeOption),Ri(e)}function Ri(e){e.doc.iter((function(e){e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null)})),e.doc.modeFrontier=e.doc.highlightFrontier=e.doc.first,oi(e,100),e.state.modeGen++,e.curOp&&po(e)}function Li(e,t){return 0==t.from.ch&&0==t.to.ch&&""==Z(t.text)&&(!e.cm||e.cm.options.wholeLineUpdateBefore)}function Ii(e,t,r,o){function i(e){return r?r[e]:null}function n(e,r,i){!function(e,t,r,o){e.text=t,e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null),null!=e.order&&(e.order=null),Ot(e),Pt(e,r);var i=o?o(e):1;i!=e.height&&Ge(e,i)}(e,r,i,o),sr(e,"change",e,t)}function a(e,t){for(var r=[],n=e;n<t;++n)r.push(new qt(d[n],i(n),o));return r}var s=t.from,l=t.to,d=t.text,c=qe(e,s.line),p=qe(e,l.line),u=Z(d),h=i(d.length-1),g=l.line-s.line;if(t.full)e.insert(0,a(0,d.length)),e.remove(d.length,e.size-d.length);else if(Li(e,t)){var m=a(0,d.length-1);n(p,p.text,h),g&&e.remove(s.line,g),m.length&&e.insert(s.line,m)}else if(c==p)if(1==d.length)n(c,c.text.slice(0,s.ch)+u+c.text.slice(l.ch),h);else{var f=a(1,d.length-1);f.push(new qt(u+c.text.slice(l.ch),h,o)),n(c,c.text.slice(0,s.ch)+d[0],i(0)),e.insert(s.line+1,f)}else if(1==d.length)n(c,c.text.slice(0,s.ch)+d[0]+p.text.slice(l.ch),i(0)),e.remove(s.line+1,g);else{n(c,c.text.slice(0,s.ch)+d[0],i(0)),n(p,u+p.text.slice(l.ch),h);var y=a(1,d.length-1);g>1&&e.remove(s.line+1,g-1),e.insert(s.line+1,y)}sr(e,"change",e,t)}function Mi(e,t,r){!function e(o,i,n){if(o.linked)for(var a=0;a<o.linked.length;++a){var s=o.linked[a];if(s.doc!=i){var l=n&&s.sharedHist;r&&!l||(t(s.doc,l),e(s.doc,o,l))}}}(e,null,!0)}function Ni(e,t){if(t.cm)throw Error("This document is already in use.");e.doc=t,t.cm=e,so(e),Ai(e),zi(e),e.options.lineWrapping||Kt(e),e.options.mode=t.modeOption,po(e)}function zi(e){("rtl"==e.doc.direction?I:E)(e.display.lineDiv,"CodeMirror-rtl")}function Fi(e){this.done=[],this.undone=[],this.undoDepth=e?e.undoDepth:1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=e?e.maxGeneration:1}function Ui(e,t){var r={from:ot(t.from),to:Ei(t),text:Je(e,t.from,t.to)};return Vi(e,r,t.from.line,t.to.line+1),Mi(e,(function(e){return Vi(e,r,t.from.line,t.to.line+1)}),!0),r}function Di(e){for(;e.length&&Z(e).ranges;)e.pop()}function Hi(e,t,r,o){var i=e.history;i.undone.length=0;var n,a,s=+new Date;if((i.lastOp==o||i.lastOrigin==t.origin&&t.origin&&("+"==t.origin.charAt(0)&&i.lastModTime>s-(e.cm?e.cm.options.historyEventDelay:500)||"*"==t.origin.charAt(0)))&&(n=function(e,t){return t?(Di(e.done),Z(e.done)):e.done.length&&!Z(e.done).ranges?Z(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(),Z(e.done)):void 0}(i,i.lastOp==o)))a=Z(n.changes),0==tt(t.from,t.to)&&0==tt(t.from,a.to)?a.to=Ei(t):n.changes.push(Ui(e,t));else{var l=Z(i.done);for(l&&l.ranges||Bi(e.sel,i.done),n={changes:[Ui(e,t)],generation:i.generation},i.done.push(n);i.done.length>i.undoDepth;)i.done.shift(),i.done[0].ranges||i.done.shift()}i.done.push(r),i.generation=++i.maxGeneration,i.lastModTime=i.lastSelTime=s,i.lastOp=i.lastSelOp=o,i.lastOrigin=i.lastSelOrigin=t.origin,a||ge(e,"historyAdded")}function Bi(e,t){var r=Z(t);r&&r.ranges&&r.equals(e)||t.push(e)}function Vi(e,t,r,o){var i=t["spans_"+e.id],n=0;e.iter(Math.max(e.first,r),Math.min(e.first+e.size,o),(function(r){r.markedSpans&&((i||(i=t["spans_"+e.id]={}))[n]=r.markedSpans),++n}))}function Wi(e){if(!e)return null;for(var t,r=0;r<e.length;++r)e[r].marker.explicitlyCleared?t||(t=e.slice(0,r)):t&&t.push(e[r]);return t?t.length?t:null:e}function ji(e,t){var r=function(e,t){var r=t["spans_"+e.id];if(!r)return null;for(var o=[],i=0;i<t.text.length;++i)o.push(Wi(r[i]));return o}(e,t),o=Et(e,t);if(!r)return o;if(!o)return r;for(var i=0;i<r.length;++i){var n=r[i],a=o[i];if(n&&a)e:for(var s=0;s<a.length;++s){for(var l=a[s],d=0;d<n.length;++d)if(n[d].marker==l.marker)continue e;n.push(l)}else a&&(r[i]=a)}return r}function Ki(e,t,r){for(var o=[],i=0;i<e.length;++i){var n=e[i];if(n.ranges)o.push(r?wi.prototype.deepCopy.call(n):n);else{var a=n.changes,s=[];o.push({changes:s});for(var l=0;l<a.length;++l){var d=a[l],c=void 0;if(s.push({from:d.from,to:d.to,text:d.text}),t)for(var p in d)(c=p.match(/^spans_(\d+)$/))&&H(t,Number(c[1]))>-1&&(Z(s)[p]=d[p],delete d[p])}}}return o}function qi(e,t,r,o){if(o){var i=e.anchor;if(r){var n=tt(t,i)<0;n!=tt(r,i)<0?(i=t,t=r):n!=tt(t,r)<0&&(t=r)}return new Si(i,t)}return new Si(r||t,t)}function Ji(e,t,r,o,i){null==i&&(i=e.cm&&(e.cm.display.shift||e.extend)),Xi(e,new wi([qi(e.sel.primary(),t,r,i)],0),o)}function Zi(e,t,r){for(var o=[],i=e.cm&&(e.cm.display.shift||e.extend),n=0;n<e.sel.ranges.length;n++)o[n]=qi(e.sel.ranges[n],t[n],null,i);Xi(e,Ci(e.cm,o,e.sel.primIndex),r)}function Gi(e,t,r,o){var i=e.sel.ranges.slice(0);i[t]=r,Xi(e,Ci(e.cm,i,e.sel.primIndex),o)}function Qi(e,t,r,o){Xi(e,ki(t,r),o)}function Yi(e,t,r){var o=e.history.done,i=Z(o);i&&i.ranges?(o[o.length-1]=t,$i(e,t,r)):Xi(e,t,r)}function Xi(e,t,r){$i(e,t,r),function(e,t,r,o){var i=e.history,n=o&&o.origin;r==i.lastSelOp||n&&i.lastSelOrigin==n&&(i.lastModTime==i.lastSelTime&&i.lastOrigin==n||function(e,t,r,o){var i=t.charAt(0);return"*"==i||"+"==i&&r.ranges.length==o.ranges.length&&r.somethingSelected()==o.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500)}(e,n,Z(i.done),t))?i.done[i.done.length-1]=t:Bi(t,i.done),i.lastSelTime=+new Date,i.lastSelOrigin=n,i.lastSelOp=r,o&&!1!==o.clearRedo&&Di(i.undone)}(e,e.sel,e.cm?e.cm.curOp.id:NaN,r)}function $i(e,t,r){(ye(e,"beforeSelectionChange")||e.cm&&ye(e.cm,"beforeSelectionChange"))&&(t=function(e,t,r){var o={ranges:t.ranges,update:function(t){this.ranges=[];for(var r=0;r<t.length;r++)this.ranges[r]=new Si(st(e,t[r].anchor),st(e,t[r].head))},origin:r&&r.origin};return ge(e,"beforeSelectionChange",e,o),e.cm&&ge(e.cm,"beforeSelectionChange",e.cm,o),o.ranges!=t.ranges?Ci(e.cm,o.ranges,o.ranges.length-1):t}(e,t,r));var o=r&&r.bias||(tt(t.primary().head,e.sel.primary().head)<0?-1:1);en(e,rn(e,t,o,!0)),r&&!1===r.scroll||!e.cm||"nocursor"==e.cm.getOption("readOnly")||Ro(e.cm)}function en(e,t){t.equals(e.sel)||(e.sel=t,e.cm&&(e.cm.curOp.updateInput=1,e.cm.curOp.selectionChanged=!0,fe(e.cm)),sr(e,"cursorActivity",e))}function tn(e){en(e,rn(e,e.sel,null,!1))}function rn(e,t,r,o){for(var i,n=0;n<t.ranges.length;n++){var a=t.ranges[n],s=t.ranges.length==e.sel.ranges.length&&e.sel.ranges[n],l=nn(e,a.anchor,s&&s.anchor,r,o),d=nn(e,a.head,s&&s.head,r,o);(i||l!=a.anchor||d!=a.head)&&(i||(i=t.ranges.slice(0,n)),i[n]=new Si(l,d))}return i?Ci(e.cm,i,t.primIndex):t}function on(e,t,r,o,i){var n=qe(e,t.line);if(n.markedSpans)for(var a=0;a<n.markedSpans.length;++a){var s=n.markedSpans[a],l=s.marker,d="selectLeft"in l?!l.selectLeft:l.inclusiveLeft,c="selectRight"in l?!l.selectRight:l.inclusiveRight;if((null==s.from||(d?s.from<=t.ch:s.from<t.ch))&&(null==s.to||(c?s.to>=t.ch:s.to>t.ch))){if(i&&(ge(l,"beforeCursorEnter"),l.explicitlyCleared)){if(n.markedSpans){--a;continue}break}if(!l.atomic)continue;if(r){var p=l.find(o<0?1:-1),u=void 0;if((o<0?c:d)&&(p=an(e,p,-o,p&&p.line==t.line?n:null)),p&&p.line==t.line&&(u=tt(p,r))&&(o<0?u<0:u>0))return on(e,p,t,o,i)}var h=l.find(o<0?-1:1);return(o<0?d:c)&&(h=an(e,h,o,h.line==t.line?n:null)),h?on(e,h,t,o,i):null}}return t}function nn(e,t,r,o,i){var n=o||1;return on(e,t,r,n,i)||!i&&on(e,t,r,n,!0)||on(e,t,r,-n,i)||!i&&on(e,t,r,-n,!0)||(e.cantEdit=!0,et(e.first,0))}function an(e,t,r,o){return r<0&&0==t.ch?t.line>e.first?st(e,et(t.line-1)):null:r>0&&t.ch==(o||qe(e,t.line)).text.length?t.line<e.first+e.size-1?et(t.line+1,0):null:new et(t.line,t.ch+r)}function sn(e){e.setSelection(et(e.firstLine(),0),et(e.lastLine()),V)}function ln(e,t,r){var o={canceled:!1,from:t.from,to:t.to,text:t.text,origin:t.origin,cancel:function(){return o.canceled=!0}};return r&&(o.update=function(t,r,i,n){t&&(o.from=st(e,t)),r&&(o.to=st(e,r)),i&&(o.text=i),void 0!==n&&(o.origin=n)}),ge(e,"beforeChange",e,o),e.cm&&ge(e.cm,"beforeChange",e.cm,o),o.canceled?(e.cm&&(e.cm.curOp.updateInput=2),null):{from:o.from,to:o.to,text:o.text,origin:o.origin}}function dn(e,t,r){if(e.cm){if(!e.cm.curOp)return ei(e.cm,dn)(e,t,r);if(e.cm.state.suppressEdits)return}if(!(ye(e,"beforeChange")||e.cm&&ye(e.cm,"beforeChange"))||(t=ln(e,t,!0))){var o=_t&&!r&&function(e,t,r){var o=null;if(e.iter(t.line,r.line+1,(function(e){if(e.markedSpans)for(var t=0;t<e.markedSpans.length;++t){var r=e.markedSpans[t].marker;!r.readOnly||o&&-1!=H(o,r)||(o||(o=[])).push(r)}})),!o)return null;for(var i=[{from:t,to:r}],n=0;n<o.length;++n)for(var a=o[n],s=a.find(0),l=0;l<i.length;++l){var d=i[l];if(!(tt(d.to,s.from)<0||tt(d.from,s.to)>0)){var c=[l,1],p=tt(d.from,s.from),u=tt(d.to,s.to);(p<0||!a.inclusiveLeft&&!p)&&c.push({from:d.from,to:s.from}),(u>0||!a.inclusiveRight&&!u)&&c.push({from:s.to,to:d.to}),i.splice.apply(i,c),l+=c.length-3}}return i}(e,t.from,t.to);if(o)for(var i=o.length-1;i>=0;--i)cn(e,{from:o[i].from,to:o[i].to,text:i?[""]:t.text,origin:t.origin});else cn(e,t)}}function cn(e,t){if(1!=t.text.length||""!=t.text[0]||0!=tt(t.from,t.to)){var r=Oi(e,t);Hi(e,t,r,e.cm?e.cm.curOp.id:NaN),hn(e,t,r,Et(e,t));var o=[];Mi(e,(function(e,r){r||-1!=H(o,e.history)||(yn(e.history,t),o.push(e.history)),hn(e,t,null,Et(e,t))}))}}function pn(e,t,r){var o=e.cm&&e.cm.state.suppressEdits;if(!o||r){for(var i,n=e.history,a=e.sel,s="undo"==t?n.done:n.undone,l="undo"==t?n.undone:n.done,d=0;d<s.length&&(i=s[d],r?!i.ranges||i.equals(e.sel):i.ranges);d++);if(d!=s.length){for(n.lastOrigin=n.lastSelOrigin=null;;){if(!(i=s.pop()).ranges){if(o)return void s.push(i);break}if(Bi(i,l),r&&!i.equals(e.sel))return void Xi(e,i,{clearRedo:!1});a=i}var c=[];Bi(a,l),l.push({changes:c,generation:n.generation}),n.generation=i.generation||++n.maxGeneration;for(var p=ye(e,"beforeChange")||e.cm&&ye(e.cm,"beforeChange"),u=function(r){var o=i.changes[r];if(o.origin=t,p&&!ln(e,o,!1))return s.length=0,{};c.push(Ui(e,o));var n=r?Oi(e,o):Z(s);hn(e,o,n,ji(e,o)),!r&&e.cm&&e.cm.scrollIntoView({from:o.from,to:Ei(o)});var a=[];Mi(e,(function(e,t){t||-1!=H(a,e.history)||(yn(e.history,o),a.push(e.history)),hn(e,o,null,ji(e,o))}))},h=i.changes.length-1;h>=0;--h){var g=u(h);if(g)return g.v}}}}function un(e,t){if(0!=t&&(e.first+=t,e.sel=new wi(G(e.sel.ranges,(function(e){return new Si(et(e.anchor.line+t,e.anchor.ch),et(e.head.line+t,e.head.ch))})),e.sel.primIndex),e.cm)){po(e.cm,e.first,e.first-t,t);for(var r=e.cm.display,o=r.viewFrom;o<r.viewTo;o++)uo(e.cm,o,"gutter")}}function hn(e,t,r,o){if(e.cm&&!e.cm.curOp)return ei(e.cm,hn)(e,t,r,o);if(t.to.line<e.first)un(e,t.text.length-1-(t.to.line-t.from.line));else if(!(t.from.line>e.lastLine())){if(t.from.line<e.first){var i=t.text.length-1-(e.first-t.from.line);un(e,i),t={from:et(e.first,0),to:et(t.to.line+i,t.to.ch),text:[Z(t.text)],origin:t.origin}}var n=e.lastLine();t.to.line>n&&(t={from:t.from,to:et(n,qe(e,n).text.length),text:[t.text[0]],origin:t.origin}),t.removed=Je(e,t.from,t.to),r||(r=Oi(e,t)),e.cm?function(e,t,r){var o=e.doc,i=e.display,n=t.from,a=t.to,s=!1,l=n.line;e.options.lineWrapping||(l=Qe(Ut(qe(o,n.line))),o.iter(l,a.line+1,(function(e){if(e==i.maxLine)return s=!0,!0}))),o.sel.contains(t.from,t.to)>-1&&fe(e),Ii(o,t,r,ao(e)),e.options.lineWrapping||(o.iter(l,n.line+t.text.length,(function(e){var t=jt(e);t>i.maxLineLength&&(i.maxLine=e,i.maxLineLength=t,i.maxLineChanged=!0,s=!1)})),s&&(e.curOp.updateMaxLine=!0)),function(e,t){if(e.modeFrontier=Math.min(e.modeFrontier,t),!(e.highlightFrontier<t-10)){for(var r=e.first,o=t-1;o>r;o--){var i=qe(e,o).stateAfter;if(i&&(!(i instanceof dt)||o+i.lookAhead<t)){r=o+1;break}}e.highlightFrontier=Math.min(e.highlightFrontier,r)}}(o,n.line),oi(e,400);var d=t.text.length-(a.line-n.line)-1;t.full?po(e):n.line!=a.line||1!=t.text.length||Li(e.doc,t)?po(e,n.line,a.line+1,d):uo(e,n.line,"text");var c=ye(e,"changes"),p=ye(e,"change");if(p||c){var u={from:n,to:a,text:t.text,removed:t.removed,origin:t.origin};p&&sr(e,"change",e,u),c&&(e.curOp.changeObjs||(e.curOp.changeObjs=[])).push(u)}e.display.selForContextMenu=null}(e.cm,t,o):Ii(e,t,o),$i(e,r,V),e.cantEdit&&nn(e,et(e.firstLine(),0))&&(e.cantEdit=!1)}}function gn(e,t,r,o,i){var n;o||(o=r),tt(o,r)<0&&(r=(n=[o,r])[0],o=n[1]),"string"==typeof t&&(t=e.splitLines(t)),dn(e,{from:r,to:o,text:t,origin:i})}function mn(e,t,r,o){r<e.line?e.line+=o:t<e.line&&(e.line=t,e.ch=0)}function fn(e,t,r,o){for(var i=0;i<e.length;++i){var n=e[i],a=!0;if(n.ranges){n.copied||((n=e[i]=n.deepCopy()).copied=!0);for(var s=0;s<n.ranges.length;s++)mn(n.ranges[s].anchor,t,r,o),mn(n.ranges[s].head,t,r,o)}else{for(var l=0;l<n.changes.length;++l){var d=n.changes[l];if(r<d.from.line)d.from=et(d.from.line+o,d.from.ch),d.to=et(d.to.line+o,d.to.ch);else if(t<=d.to.line){a=!1;break}}a||(e.splice(0,i+1),i=0)}}}function yn(e,t){var r=t.from.line,o=t.to.line,i=t.text.length-(o-r)-1;fn(e.done,r,o,i),fn(e.undone,r,o,i)}function bn(e,t,r,o){var i=t,n=t;return"number"==typeof t?n=qe(e,at(e,t)):i=Qe(t),null==i?null:(o(n,i)&&e.cm&&uo(e.cm,i,r),n)}function vn(e){this.lines=e,this.parent=null;for(var t=0,r=0;r<e.length;++r)e[r].parent=this,t+=e[r].height;this.height=t}function xn(e){this.children=e;for(var t=0,r=0,o=0;o<e.length;++o){var i=e[o];t+=i.chunkSize(),r+=i.height,i.parent=this}this.size=t,this.height=r,this.parent=null}Si.prototype.from=function(){return nt(this.anchor,this.head)},Si.prototype.to=function(){return it(this.anchor,this.head)},Si.prototype.empty=function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch},vn.prototype={chunkSize:function(){return this.lines.length},removeInner:function(e,t){for(var r=e,o=e+t;r<o;++r){var i=this.lines[r];this.height-=i.height,Jt(i),sr(i,"delete")}this.lines.splice(e,t)},collapse:function(e){e.push.apply(e,this.lines)},insertInner:function(e,t,r){this.height+=r,this.lines=this.lines.slice(0,e).concat(t).concat(this.lines.slice(e));for(var o=0;o<t.length;++o)t[o].parent=this},iterN:function(e,t,r){for(var o=e+t;e<o;++e)if(r(this.lines[e]))return!0}},xn.prototype={chunkSize:function(){return this.size},removeInner:function(e,t){this.size-=t;for(var r=0;r<this.children.length;++r){var o=this.children[r],i=o.chunkSize();if(e<i){var n=Math.min(t,i-e),a=o.height;if(o.removeInner(e,n),this.height-=a-o.height,i==n&&(this.children.splice(r--,1),o.parent=null),0==(t-=n))break;e=0}else e-=i}if(this.size-t<25&&(this.children.length>1||!(this.children[0]instanceof vn))){var s=[];this.collapse(s),this.children=[new vn(s)],this.children[0].parent=this}},collapse:function(e){for(var t=0;t<this.children.length;++t)this.children[t].collapse(e)},insertInner:function(e,t,r){this.size+=t.length,this.height+=r;for(var o=0;o<this.children.length;++o){var i=this.children[o],n=i.chunkSize();if(e<=n){if(i.insertInner(e,t,r),i.lines&&i.lines.length>50){for(var a=i.lines.length%25+25,s=a;s<i.lines.length;){var l=new vn(i.lines.slice(s,s+=25));i.height-=l.height,this.children.splice(++o,0,l),l.parent=this}i.lines=i.lines.slice(0,a),this.maybeSpill()}break}e-=n}},maybeSpill:function(){if(!(this.children.length<=10)){var e=this;do{var t=new xn(e.children.splice(e.children.length-5,5));if(e.parent){e.size-=t.size,e.height-=t.height;var r=H(e.parent.children,e);e.parent.children.splice(r+1,0,t)}else{var o=new xn(e.children);o.parent=e,e.children=[o,t],e=o}t.parent=e.parent}while(e.children.length>10);e.parent.maybeSpill()}},iterN:function(e,t,r){for(var o=0;o<this.children.length;++o){var i=this.children[o],n=i.chunkSize();if(e<n){var a=Math.min(t,n-e);if(i.iterN(e,a,r))return!0;if(0==(t-=a))break;e=0}else e-=n}}};var _n=function(e,t,r){if(r)for(var o in r)r.hasOwnProperty(o)&&(this[o]=r[o]);this.doc=e,this.node=t};function wn(e,t,r){Wt(t)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&Ao(e,r)}_n.prototype.clear=function(){var e=this.doc.cm,t=this.line.widgets,r=this.line,o=Qe(r);if(null!=o&&t){for(var i=0;i<t.length;++i)t[i]==this&&t.splice(i--,1);t.length||(r.widgets=null);var n=xr(this);Ge(r,Math.max(0,r.height-n)),e&&($o(e,(function(){wn(e,r,-n),uo(e,o,"widget")})),sr(e,"lineWidgetCleared",e,this,o))}},_n.prototype.changed=function(){var e=this,t=this.height,r=this.doc.cm,o=this.line;this.height=null;var i=xr(this)-t;i&&(Bt(this.doc,o)||Ge(o,o.height+i),r&&$o(r,(function(){r.curOp.forceUpdate=!0,wn(r,o,i),sr(r,"lineWidgetChanged",r,e,Qe(o))})))},be(_n);var Sn=0,Cn=function(e,t){this.lines=[],this.type=t,this.doc=e,this.id=++Sn};function kn(e,t,r,o,i){if(o&&o.shared)return function(e,t,r,o,i){(o=F(o)).shared=!1;var n=[kn(e,t,r,o,i)],a=n[0],s=o.widgetNode;return Mi(e,(function(e){s&&(o.widgetNode=s.cloneNode(!0)),n.push(kn(e,st(e,t),st(e,r),o,i));for(var l=0;l<e.linked.length;++l)if(e.linked[l].isParent)return;a=Z(n)})),new En(n,a)}(e,t,r,o,i);if(e.cm&&!e.cm.curOp)return ei(e.cm,kn)(e,t,r,o,i);var n=new Cn(e,i),a=tt(t,r);if(o&&F(o,n,!1),a>0||0==a&&!1!==n.clearWhenEmpty)return n;if(n.replacedWith&&(n.collapsed=!0,n.widgetNode=A("span",[n.replacedWith],"CodeMirror-widget"),o.handleMouseEvents||n.widgetNode.setAttribute("cm-ignore-events","true"),o.insertLeft&&(n.widgetNode.insertLeft=!0)),n.collapsed){if(Ft(e,t.line,t,r,n)||t.line!=r.line&&Ft(e,r.line,t,r,n))throw Error("Inserting collapsed marker partially overlapping an existing one");wt=!0}n.addToHistory&&Hi(e,{from:t,to:r,origin:"markText"},e.sel,NaN);var s,l=t.line,d=e.cm;if(e.iter(l,r.line+1,(function(e){d&&n.collapsed&&!d.options.lineWrapping&&Ut(e)==d.display.maxLine&&(s=!0),n.collapsed&&l!=t.line&&Ge(e,0),function(e,t){e.markedSpans=e.markedSpans?e.markedSpans.concat([t]):[t],t.marker.attachLine(e)}(e,new St(n,l==t.line?t.ch:null,l==r.line?r.ch:null)),++l})),n.collapsed&&e.iter(t.line,r.line+1,(function(t){Bt(e,t)&&Ge(t,0)})),n.clearOnEnter&&pe(n,"beforeCursorEnter",(function(){return n.clear()})),n.readOnly&&(_t=!0,(e.history.done.length||e.history.undone.length)&&e.clearHistory()),n.collapsed&&(n.id=++Sn,n.atomic=!0),d){if(s&&(d.curOp.updateMaxLine=!0),n.collapsed)po(d,t.line,r.line+1);else if(n.className||n.startStyle||n.endStyle||n.css||n.attributes||n.title)for(var c=t.line;c<=r.line;c++)uo(d,c,"text");n.atomic&&tn(d.doc),sr(d,"markerAdded",d,n)}return n}Cn.prototype.clear=function(){if(!this.explicitlyCleared){var e=this.doc.cm,t=e&&!e.curOp;if(t&&qo(e),ye(this,"clear")){var r=this.find();r&&sr(this,"clear",r.from,r.to)}for(var o=null,i=null,n=0;n<this.lines.length;++n){var a=this.lines[n],s=Ct(a.markedSpans,this);e&&!this.collapsed?uo(e,Qe(a),"text"):e&&(null!=s.to&&(i=Qe(a)),null!=s.from&&(o=Qe(a))),a.markedSpans=kt(a.markedSpans,s),null==s.from&&this.collapsed&&!Bt(this.doc,a)&&e&&Ge(a,ro(e.display))}if(e&&this.collapsed&&!e.options.lineWrapping)for(var l=0;l<this.lines.length;++l){var d=Ut(this.lines[l]),c=jt(d);c>e.display.maxLineLength&&(e.display.maxLine=d,e.display.maxLineLength=c,e.display.maxLineChanged=!0)}null!=o&&e&&this.collapsed&&po(e,o,i+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,e&&tn(e.doc)),e&&sr(e,"markerCleared",e,this,o,i),t&&Jo(e),this.parent&&this.parent.clear()}},Cn.prototype.find=function(e,t){var r,o;null==e&&"bookmark"==this.type&&(e=1);for(var i=0;i<this.lines.length;++i){var n=this.lines[i],a=Ct(n.markedSpans,this);if(null!=a.from&&(r=et(t?n:Qe(n),a.from),-1==e))return r;if(null!=a.to&&(o=et(t?n:Qe(n),a.to),1==e))return o}return r&&{from:r,to:o}},Cn.prototype.changed=function(){var e=this,t=this.find(-1,!0),r=this,o=this.doc.cm;t&&o&&$o(o,(function(){var i=t.line,n=Qe(t.line),a=Ar(o,n);if(a&&(Fr(a),o.curOp.selectionChanged=o.curOp.forceUpdate=!0),o.curOp.updateMaxLine=!0,!Bt(r.doc,i)&&null!=r.height){var s=r.height;r.height=null;var l=xr(r)-s;l&&Ge(i,i.height+l)}sr(o,"markerChanged",o,e)}))},Cn.prototype.attachLine=function(e){if(!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;t.maybeHiddenMarkers&&-1!=H(t.maybeHiddenMarkers,this)||(t.maybeUnhiddenMarkers||(t.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(e)},Cn.prototype.detachLine=function(e){if(this.lines.splice(H(this.lines,e),1),!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;(t.maybeHiddenMarkers||(t.maybeHiddenMarkers=[])).push(this)}},be(Cn);var En=function(e,t){this.markers=e,this.primary=t;for(var r=0;r<e.length;++r)e[r].parent=this};function Tn(e){return e.findMarks(et(e.first,0),e.clipPos(et(e.lastLine())),(function(e){return e.parent}))}function On(e){for(var t=function(t){var r=e[t],o=[r.primary.doc];Mi(r.primary.doc,(function(e){return o.push(e)}));for(var i=0;i<r.markers.length;i++){var n=r.markers[i];-1==H(o,n.doc)&&(n.parent=null,r.markers.splice(i--,1))}},r=0;r<e.length;r++)t(r)}En.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=!0;for(var e=0;e<this.markers.length;++e)this.markers[e].clear();sr(this,"clear")}},En.prototype.find=function(e,t){return this.primary.find(e,t)},be(En);var Pn=0,An=function(e,t,r,o,i){if(!(this instanceof An))return new An(e,t,r,o,i);null==r&&(r=0),xn.call(this,[new vn([new qt("",null)])]),this.first=r,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.modeFrontier=this.highlightFrontier=r;var n=et(r,0);this.sel=ki(n),this.history=new Fi(null),this.id=++Pn,this.modeOption=t,this.lineSep=o,this.direction="rtl"==i?"rtl":"ltr",this.extend=!1,"string"==typeof e&&(e=this.splitLines(e)),Ii(this,{from:n,to:n,text:e}),Xi(this,ki(n),V)};An.prototype=Y(xn.prototype,{constructor:An,iter:function(e,t,r){r?this.iterN(e-this.first,t-e,r):this.iterN(this.first,this.first+this.size,e)},insert:function(e,t){for(var r=0,o=0;o<t.length;++o)r+=t[o].height;this.insertInner(e-this.first,t,r)},remove:function(e,t){this.removeInner(e-this.first,t)},getValue:function(e){var t=Ze(this,this.first,this.first+this.size);return!1===e?t:t.join(e||this.lineSeparator())},setValue:ri((function(e){var t=et(this.first,0),r=this.first+this.size-1;dn(this,{from:t,to:et(r,qe(this,r).text.length),text:this.splitLines(e),origin:"setValue",full:!0},!0),this.cm&&Lo(this.cm,0,0),Xi(this,ki(t),V)})),replaceRange:function(e,t,r,o){gn(this,e,t=st(this,t),r=r?st(this,r):t,o)},getRange:function(e,t,r){var o=Je(this,st(this,e),st(this,t));return!1===r?o:o.join(r||this.lineSeparator())},getLine:function(e){var t=this.getLineHandle(e);return t&&t.text},getLineHandle:function(e){if(Xe(this,e))return qe(this,e)},getLineNumber:function(e){return Qe(e)},getLineHandleVisualStart:function(e){return"number"==typeof e&&(e=qe(this,e)),Ut(e)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(e){return st(this,e)},getCursor:function(e){var t=this.sel.primary();return null==e||"head"==e?t.head:"anchor"==e?t.anchor:"end"==e||"to"==e||!1===e?t.to():t.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:ri((function(e,t,r){Qi(this,st(this,"number"==typeof e?et(e,t||0):e),null,r)})),setSelection:ri((function(e,t,r){Qi(this,st(this,e),st(this,t||e),r)})),extendSelection:ri((function(e,t,r){Ji(this,st(this,e),t&&st(this,t),r)})),extendSelections:ri((function(e,t){Zi(this,lt(this,e),t)})),extendSelectionsBy:ri((function(e,t){Zi(this,lt(this,G(this.sel.ranges,e)),t)})),setSelections:ri((function(e,t,r){if(e.length){for(var o=[],i=0;i<e.length;i++)o[i]=new Si(st(this,e[i].anchor),st(this,e[i].head||e[i].anchor));null==t&&(t=Math.min(e.length-1,this.sel.primIndex)),Xi(this,Ci(this.cm,o,t),r)}})),addSelection:ri((function(e,t,r){var o=this.sel.ranges.slice(0);o.push(new Si(st(this,e),st(this,t||e))),Xi(this,Ci(this.cm,o,o.length-1),r)})),getSelection:function(e){for(var t,r=this.sel.ranges,o=0;o<r.length;o++){var i=Je(this,r[o].from(),r[o].to());t=t?t.concat(i):i}return!1===e?t:t.join(e||this.lineSeparator())},getSelections:function(e){for(var t=[],r=this.sel.ranges,o=0;o<r.length;o++){var i=Je(this,r[o].from(),r[o].to());!1!==e&&(i=i.join(e||this.lineSeparator())),t[o]=i}return t},replaceSelection:function(e,t,r){for(var o=[],i=0;i<this.sel.ranges.length;i++)o[i]=e;this.replaceSelections(o,t,r||"+input")},replaceSelections:ri((function(e,t,r){for(var o=[],i=this.sel,n=0;n<i.ranges.length;n++){var a=i.ranges[n];o[n]={from:a.from(),to:a.to(),text:this.splitLines(e[n]),origin:r}}for(var s=t&&"end"!=t&&function(e,t,r){for(var o=[],i=et(e.first,0),n=i,a=0;a<t.length;a++){var s=t[a],l=Pi(s.from,i,n),d=Pi(Ei(s),i,n);if(i=s.to,n=d,"around"==r){var c=e.sel.ranges[a],p=tt(c.head,c.anchor)<0;o[a]=new Si(p?d:l,p?l:d)}else o[a]=new Si(l,l)}return new wi(o,e.sel.primIndex)}(this,o,t),l=o.length-1;l>=0;l--)dn(this,o[l]);s?Yi(this,s):this.cm&&Ro(this.cm)})),undo:ri((function(){pn(this,"undo")})),redo:ri((function(){pn(this,"redo")})),undoSelection:ri((function(){pn(this,"undo",!0)})),redoSelection:ri((function(){pn(this,"redo",!0)})),setExtending:function(e){this.extend=e},getExtending:function(){return this.extend},historySize:function(){for(var e=this.history,t=0,r=0,o=0;o<e.done.length;o++)e.done[o].ranges||++t;for(var i=0;i<e.undone.length;i++)e.undone[i].ranges||++r;return{undo:t,redo:r}},clearHistory:function(){var e=this;this.history=new Fi(this.history),Mi(this,(function(t){return t.history=e.history}),!0)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(e){return e&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(e){return this.history.generation==(e||this.cleanGeneration)},getHistory:function(){return{done:Ki(this.history.done),undone:Ki(this.history.undone)}},setHistory:function(e){var t=this.history=new Fi(this.history);t.done=Ki(e.done.slice(0),null,!0),t.undone=Ki(e.undone.slice(0),null,!0)},setGutterMarker:ri((function(e,t,r){return bn(this,e,"gutter",(function(e){var o=e.gutterMarkers||(e.gutterMarkers={});return o[t]=r,!r&&te(o)&&(e.gutterMarkers=null),!0}))})),clearGutter:ri((function(e){var t=this;this.iter((function(r){r.gutterMarkers&&r.gutterMarkers[e]&&bn(t,r,"gutter",(function(){return r.gutterMarkers[e]=null,te(r.gutterMarkers)&&(r.gutterMarkers=null),!0}))}))})),lineInfo:function(e){var t;if("number"==typeof e){if(!Xe(this,e))return null;if(t=e,!(e=qe(this,e)))return null}else if(null==(t=Qe(e)))return null;return{line:t,handle:e,text:e.text,gutterMarkers:e.gutterMarkers,textClass:e.textClass,bgClass:e.bgClass,wrapClass:e.wrapClass,widgets:e.widgets}},addLineClass:ri((function(e,t,r){return bn(this,e,"gutter"==t?"gutter":"class",(function(e){var o="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass";if(e[o]){if(C(r).test(e[o]))return!1;e[o]+=" "+r}else e[o]=r;return!0}))})),removeLineClass:ri((function(e,t,r){return bn(this,e,"gutter"==t?"gutter":"class",(function(e){var o="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass",i=e[o];if(!i)return!1;if(null==r)e[o]=null;else{var n=i.match(C(r));if(!n)return!1;var a=n.index+n[0].length;e[o]=i.slice(0,n.index)+(n.index&&a!=i.length?" ":"")+i.slice(a)||null}return!0}))})),addLineWidget:ri((function(e,t,r){return function(e,t,r,o){var i=new _n(e,r,o),n=e.cm;return n&&i.noHScroll&&(n.display.alignWidgets=!0),bn(e,t,"widget",(function(t){var r=t.widgets||(t.widgets=[]);if(null==i.insertAt?r.push(i):r.splice(Math.min(r.length,Math.max(0,i.insertAt)),0,i),i.line=t,n&&!Bt(e,t)){var o=Wt(t)<e.scrollTop;Ge(t,t.height+xr(i)),o&&Ao(n,i.height),n.curOp.forceUpdate=!0}return!0})),n&&sr(n,"lineWidgetAdded",n,i,"number"==typeof t?t:Qe(t)),i}(this,e,t,r)})),removeLineWidget:function(e){e.clear()},markText:function(e,t,r){return kn(this,st(this,e),st(this,t),r,r&&r.type||"range")},setBookmark:function(e,t){var r={replacedWith:t&&(null==t.nodeType?t.widget:t),insertLeft:t&&t.insertLeft,clearWhenEmpty:!1,shared:t&&t.shared,handleMouseEvents:t&&t.handleMouseEvents};return kn(this,e=st(this,e),e,r,"bookmark")},findMarksAt:function(e){var t=[],r=qe(this,(e=st(this,e)).line).markedSpans;if(r)for(var o=0;o<r.length;++o){var i=r[o];(null==i.from||i.from<=e.ch)&&(null==i.to||i.to>=e.ch)&&t.push(i.marker.parent||i.marker)}return t},findMarks:function(e,t,r){e=st(this,e),t=st(this,t);var o=[],i=e.line;return this.iter(e.line,t.line+1,(function(n){var a=n.markedSpans;if(a)for(var s=0;s<a.length;s++){var l=a[s];null!=l.to&&i==e.line&&e.ch>=l.to||null==l.from&&i!=e.line||null!=l.from&&i==t.line&&l.from>=t.ch||r&&!r(l.marker)||o.push(l.marker.parent||l.marker)}++i})),o},getAllMarks:function(){var e=[];return this.iter((function(t){var r=t.markedSpans;if(r)for(var o=0;o<r.length;++o)null!=r[o].from&&e.push(r[o].marker)})),e},posFromIndex:function(e){var t,r=this.first,o=this.lineSeparator().length;return this.iter((function(i){var n=i.text.length+o;if(n>e)return t=e,!0;e-=n,++r})),st(this,et(r,t))},indexFromPos:function(e){var t=(e=st(this,e)).ch;if(e.line<this.first||e.ch<0)return 0;var r=this.lineSeparator().length;return this.iter(this.first,e.line,(function(e){t+=e.text.length+r})),t},copy:function(e){var t=new An(Ze(this,this.first,this.first+this.size),this.modeOption,this.first,this.lineSep,this.direction);return t.scrollTop=this.scrollTop,t.scrollLeft=this.scrollLeft,t.sel=this.sel,t.extend=!1,e&&(t.history.undoDepth=this.history.undoDepth,t.setHistory(this.getHistory())),t},linkedDoc:function(e){e||(e={});var t=this.first,r=this.first+this.size;null!=e.from&&e.from>t&&(t=e.from),null!=e.to&&e.to<r&&(r=e.to);var o=new An(Ze(this,t,r),e.mode||this.modeOption,t,this.lineSep,this.direction);return e.sharedHist&&(o.history=this.history),(this.linked||(this.linked=[])).push({doc:o,sharedHist:e.sharedHist}),o.linked=[{doc:this,isParent:!0,sharedHist:e.sharedHist}],function(e,t){for(var r=0;r<t.length;r++){var o=t[r],i=o.find(),n=e.clipPos(i.from),a=e.clipPos(i.to);if(tt(n,a)){var s=kn(e,n,a,o.primary,o.primary.type);o.markers.push(s),s.parent=o}}}(o,Tn(this)),o},unlinkDoc:function(e){if(e instanceof ka&&(e=e.doc),this.linked)for(var t=0;t<this.linked.length;++t)if(this.linked[t].doc==e){this.linked.splice(t,1),e.unlinkDoc(this),On(Tn(this));break}if(e.history==this.history){var r=[e.id];Mi(e,(function(e){return r.push(e.id)}),!0),e.history=new Fi(null),e.history.done=Ki(this.history.done,r),e.history.undone=Ki(this.history.undone,r)}},iterLinkedDocs:function(e){Mi(this,e)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(e){return this.lineSep?e.split(this.lineSep):Re(e)},lineSeparator:function(){return this.lineSep||"\n"},setDirection:ri((function(e){var t;"rtl"!=e&&(e="ltr"),e!=this.direction&&(this.direction=e,this.iter((function(e){return e.order=null})),this.cm&&$o(t=this.cm,(function(){zi(t),po(t)})))}))}),An.prototype.eachLine=An.prototype.iter;var Rn=0;function Ln(e){var t=this;if(In(t),!me(t,e)&&!_r(t.display,e)){ve(e),a&&(Rn=+new Date);var r=lo(t,e,!0),o=e.dataTransfer.files;if(r&&!t.isReadOnly())if(o&&o.length&&window.FileReader&&window.File)for(var i=o.length,n=Array(i),s=0,l=function(){++s==i&&ei(t,(function(){var e={from:r=st(t.doc,r),to:r,text:t.doc.splitLines(n.filter((function(e){return null!=e})).join(t.doc.lineSeparator())),origin:"paste"};dn(t.doc,e),Yi(t.doc,ki(st(t.doc,r),st(t.doc,Ei(e))))}))()},d=function(e,r){if(t.options.allowDropFileTypes&&-1==H(t.options.allowDropFileTypes,e.type))l();else{var o=new FileReader;o.onerror=function(){return l()},o.onload=function(){var e=o.result;/[\x00-\x08\x0e-\x1f]{2}/.test(e)||(n[r]=e),l()},o.readAsText(e)}},c=0;c<o.length;c++)d(o[c],c);else{if(t.state.draggingText&&t.doc.sel.contains(r)>-1)return t.state.draggingText(e),void setTimeout((function(){return t.display.input.focus()}),20);try{var p=e.dataTransfer.getData("Text");if(p){var u;if(t.state.draggingText&&!t.state.draggingText.copy&&(u=t.listSelections()),$i(t.doc,ki(r,r)),u)for(var h=0;h<u.length;++h)gn(t.doc,"",u[h].anchor,u[h].head,"drag");t.replaceSelection(p,"around","paste"),t.display.input.focus()}}catch(e){}}}}function In(e){e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor),e.display.dragCursor=null)}function Mn(e){if(document.getElementsByClassName){for(var t=document.getElementsByClassName("CodeMirror"),r=[],o=0;o<t.length;o++){var i=t[o].CodeMirror;i&&r.push(i)}r.length&&r[0].operation((function(){for(var t=0;t<r.length;t++)e(r[t])}))}}var Nn=!1;function zn(e){var t=e.display;t.cachedCharWidth=t.cachedTextHeight=t.cachedPaddingH=null,t.scrollbarsClipped=!1,e.setSize()}for(var Fn={3:"Pause",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"=",109:"-",110:".",111:"/",145:"ScrollLock",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",224:"Mod",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"},Un=0;Un<10;Un++)Fn[Un+48]=Fn[Un+96]=Un+"";for(var Dn=65;Dn<=90;Dn++)Fn[Dn]=String.fromCharCode(Dn);for(var Hn=1;Hn<=12;Hn++)Fn[Hn+111]=Fn[Hn+63235]="F"+Hn;var Bn={};function Vn(e){var t,r,o,i,n=e.split(/-(?!$)/);e=n[n.length-1];for(var a=0;a<n.length-1;a++){var s=n[a];if(/^(cmd|meta|m)$/i.test(s))i=!0;else if(/^a(lt)?$/i.test(s))t=!0;else if(/^(c|ctrl|control)$/i.test(s))r=!0;else{if(!/^s(hift)?$/i.test(s))throw Error("Unrecognized modifier name: "+s);o=!0}}return t&&(e="Alt-"+e),r&&(e="Ctrl-"+e),i&&(e="Cmd-"+e),o&&(e="Shift-"+e),e}function Wn(e){var t={};for(var r in e)if(e.hasOwnProperty(r)){var o=e[r];if(/^(name|fallthrough|(de|at)tach)$/.test(r))continue;if("..."==o){delete e[r];continue}for(var i=G(r.split(" "),Vn),n=0;n<i.length;n++){var a=void 0,s=void 0;n==i.length-1?(s=i.join(" "),a=o):(s=i.slice(0,n+1).join(" "),a="...");var l=t[s];if(l){if(l!=a)throw Error("Inconsistent bindings for "+s)}else t[s]=a}delete e[r]}for(var d in t)e[d]=t[d];return e}function jn(e,t,r,o){var i=(t=Zn(t)).call?t.call(e,o):t[e];if(!1===i)return"nothing";if("..."===i)return"multi";if(null!=i&&r(i))return"handled";if(t.fallthrough){if("[object Array]"!=Object.prototype.toString.call(t.fallthrough))return jn(e,t.fallthrough,r,o);for(var n=0;n<t.fallthrough.length;n++){var a=jn(e,t.fallthrough[n],r,o);if(a)return a}}}function Kn(e){var t="string"==typeof e?e:Fn[e.keyCode];return"Ctrl"==t||"Alt"==t||"Shift"==t||"Mod"==t}function qn(e,t,r){var o=e;return t.altKey&&"Alt"!=o&&(e="Alt-"+e),(w?t.metaKey:t.ctrlKey)&&"Ctrl"!=o&&(e="Ctrl-"+e),(w?t.ctrlKey:t.metaKey)&&"Mod"!=o&&(e="Cmd-"+e),!r&&t.shiftKey&&"Shift"!=o&&(e="Shift-"+e),e}function Jn(e,t){if(p&&34==e.keyCode&&e.char)return!1;var r=Fn[e.keyCode];return null!=r&&!e.altGraphKey&&(3==e.keyCode&&e.code&&(r=e.code),qn(r,e,t))}function Zn(e){return"string"==typeof e?Bn[e]:e}function Gn(e,t){for(var r=e.doc.sel.ranges,o=[],i=0;i<r.length;i++){for(var n=t(r[i]);o.length&&tt(n.from,Z(o).to)<=0;){var a=o.pop();if(tt(a.from,n.from)<0){n.from=a.from;break}}o.push(n)}$o(e,(function(){for(var t=o.length-1;t>=0;t--)gn(e.doc,"",o[t].from,o[t].to,"+delete");Ro(e)}))}function Qn(e,t,r){var o=ie(e.text,t+r,r);return o<0||o>e.text.length?null:o}function Yn(e,t,r){var o=Qn(e,t.ch,r);return null==o?null:new et(t.line,o,r<0?"after":"before")}function Xn(e,t,r,o,i){if(e){"rtl"==t.doc.direction&&(i=-i);var n=de(r,t.doc.direction);if(n){var a,s=i<0?Z(n):n[0],l=i<0==(1==s.level)?"after":"before";if(s.level>0||"rtl"==t.doc.direction){var d=Rr(t,r);a=i<0?r.text.length-1:0;var c=Lr(t,d,a).top;a=ne((function(e){return Lr(t,d,e).top==c}),i<0==(1==s.level)?s.from:s.to-1,a),"before"==l&&(a=Qn(r,a,1))}else a=i<0?s.to:s.from;return new et(o,a,l)}}return new et(o,i<0?r.text.length:0,i<0?"before":"after")}Bn.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},Bn.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},Bn.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars","Ctrl-O":"openLine"},Bn.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},Bn.default=b?Bn.macDefault:Bn.pcDefault;var $n={selectAll:sn,singleSelection:function(e){return e.setSelection(e.getCursor("anchor"),e.getCursor("head"),V)},killLine:function(e){return Gn(e,(function(t){if(t.empty()){var r=qe(e.doc,t.head.line).text.length;return t.head.ch==r&&t.head.line<e.lastLine()?{from:t.head,to:et(t.head.line+1,0)}:{from:t.head,to:et(t.head.line,r)}}return{from:t.from(),to:t.to()}}))},deleteLine:function(e){return Gn(e,(function(t){return{from:et(t.from().line,0),to:st(e.doc,et(t.to().line+1,0))}}))},delLineLeft:function(e){return Gn(e,(function(e){return{from:et(e.from().line,0),to:e.from()}}))},delWrappedLineLeft:function(e){return Gn(e,(function(t){var r=e.charCoords(t.head,"div").top+5;return{from:e.coordsChar({left:0,top:r},"div"),to:t.from()}}))},delWrappedLineRight:function(e){return Gn(e,(function(t){var r=e.charCoords(t.head,"div").top+5,o=e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div");return{from:t.from(),to:o}}))},undo:function(e){return e.undo()},redo:function(e){return e.redo()},undoSelection:function(e){return e.undoSelection()},redoSelection:function(e){return e.redoSelection()},goDocStart:function(e){return e.extendSelection(et(e.firstLine(),0))},goDocEnd:function(e){return e.extendSelection(et(e.lastLine()))},goLineStart:function(e){return e.extendSelectionsBy((function(t){return ea(e,t.head.line)}),{origin:"+move",bias:1})},goLineStartSmart:function(e){return e.extendSelectionsBy((function(t){return ta(e,t.head)}),{origin:"+move",bias:1})},goLineEnd:function(e){return e.extendSelectionsBy((function(t){return function(e,t){var r=qe(e.doc,t),o=function(e){for(var t;t=Nt(e);)e=t.find(1,!0).line;return e}(r);return o!=r&&(t=Qe(o)),Xn(!0,e,r,t,-1)}(e,t.head.line)}),{origin:"+move",bias:-1})},goLineRight:function(e){return e.extendSelectionsBy((function(t){var r=e.cursorCoords(t.head,"div").top+5;return e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div")}),j)},goLineLeft:function(e){return e.extendSelectionsBy((function(t){var r=e.cursorCoords(t.head,"div").top+5;return e.coordsChar({left:0,top:r},"div")}),j)},goLineLeftSmart:function(e){return e.extendSelectionsBy((function(t){var r=e.cursorCoords(t.head,"div").top+5,o=e.coordsChar({left:0,top:r},"div");return o.ch<e.getLine(o.line).search(/\S/)?ta(e,t.head):o}),j)},goLineUp:function(e){return e.moveV(-1,"line")},goLineDown:function(e){return e.moveV(1,"line")},goPageUp:function(e){return e.moveV(-1,"page")},goPageDown:function(e){return e.moveV(1,"page")},goCharLeft:function(e){return e.moveH(-1,"char")},goCharRight:function(e){return e.moveH(1,"char")},goColumnLeft:function(e){return e.moveH(-1,"column")},goColumnRight:function(e){return e.moveH(1,"column")},goWordLeft:function(e){return e.moveH(-1,"word")},goGroupRight:function(e){return e.moveH(1,"group")},goGroupLeft:function(e){return e.moveH(-1,"group")},goWordRight:function(e){return e.moveH(1,"word")},delCharBefore:function(e){return e.deleteH(-1,"codepoint")},delCharAfter:function(e){return e.deleteH(1,"char")},delWordBefore:function(e){return e.deleteH(-1,"word")},delWordAfter:function(e){return e.deleteH(1,"word")},delGroupBefore:function(e){return e.deleteH(-1,"group")},delGroupAfter:function(e){return e.deleteH(1,"group")},indentAuto:function(e){return e.indentSelection("smart")},indentMore:function(e){return e.indentSelection("add")},indentLess:function(e){return e.indentSelection("subtract")},insertTab:function(e){return e.replaceSelection("\t")},insertSoftTab:function(e){for(var t=[],r=e.listSelections(),o=e.options.tabSize,i=0;i<r.length;i++){var n=r[i].from(),a=U(e.getLine(n.line),n.ch,o);t.push(J(o-a%o))}e.replaceSelections(t)},defaultTab:function(e){e.somethingSelected()?e.indentSelection("add"):e.execCommand("insertTab")},transposeChars:function(e){return $o(e,(function(){for(var t=e.listSelections(),r=[],o=0;o<t.length;o++)if(t[o].empty()){var i=t[o].head,n=qe(e.doc,i.line).text;if(n)if(i.ch==n.length&&(i=new et(i.line,i.ch-1)),i.ch>0)i=new et(i.line,i.ch+1),e.replaceRange(n.charAt(i.ch-1)+n.charAt(i.ch-2),et(i.line,i.ch-2),i,"+transpose");else if(i.line>e.doc.first){var a=qe(e.doc,i.line-1).text;a&&(i=new et(i.line,1),e.replaceRange(n.charAt(0)+e.doc.lineSeparator()+a.charAt(a.length-1),et(i.line-1,a.length-1),i,"+transpose"))}r.push(new Si(i,i))}e.setSelections(r)}))},newlineAndIndent:function(e){return $o(e,(function(){for(var t=e.listSelections(),r=t.length-1;r>=0;r--)e.replaceRange(e.doc.lineSeparator(),t[r].anchor,t[r].head,"+input");t=e.listSelections();for(var o=0;o<t.length;o++)e.indentLine(t[o].from().line,null,!0);Ro(e)}))},openLine:function(e){return e.replaceSelection("\n","start")},toggleOverwrite:function(e){return e.toggleOverwrite()}};function ea(e,t){var r=qe(e.doc,t),o=Ut(r);return o!=r&&(t=Qe(o)),Xn(!0,e,o,t,1)}function ta(e,t){var r=ea(e,t.line),o=qe(e.doc,r.line),i=de(o,e.doc.direction);if(!i||0==i[0].level){var n=Math.max(r.ch,o.text.search(/\S/)),a=t.line==r.line&&t.ch<=n&&t.ch;return et(r.line,a?0:n,r.sticky)}return r}function ra(e,t,r){if("string"==typeof t&&!(t=$n[t]))return!1;e.display.input.ensurePolled();var o=e.display.shift,i=!1;try{e.isReadOnly()&&(e.state.suppressEdits=!0),r&&(e.display.shift=!1),i=t(e)!=B}finally{e.display.shift=o,e.state.suppressEdits=!1}return i}var oa=new D;function ia(e,t,r,o){var i=e.state.keySeq;if(i){if(Kn(t))return"handled";if(/\'$/.test(t)?e.state.keySeq=null:oa.set(50,(function(){e.state.keySeq==i&&(e.state.keySeq=null,e.display.input.reset())})),na(e,i+" "+t,r,o))return!0}return na(e,t,r,o)}function na(e,t,r,o){var i=function(e,t,r){for(var o=0;o<e.state.keyMaps.length;o++){var i=jn(t,e.state.keyMaps[o],r,e);if(i)return i}return e.options.extraKeys&&jn(t,e.options.extraKeys,r,e)||jn(t,e.options.keyMap,r,e)}(e,t,o);return"multi"==i&&(e.state.keySeq=t),"handled"==i&&sr(e,"keyHandled",e,t,r),"handled"!=i&&"multi"!=i||(ve(r),_o(e)),!!i}function aa(e,t){var r=Jn(t,!0);return!!r&&(t.shiftKey&&!e.state.keySeq?ia(e,"Shift-"+r,t,(function(t){return ra(e,t,!0)}))||ia(e,r,t,(function(t){if("string"==typeof t?/^go[A-Z]/.test(t):t.motion)return ra(e,t)})):ia(e,r,t,(function(t){return ra(e,t)})))}var sa=null;function la(e){var t=this;if(!(e.target&&e.target!=t.display.input.getField()||(t.curOp.focus=L(),me(t,e)))){a&&s<11&&27==e.keyCode&&(e.returnValue=!1);var o=e.keyCode;t.display.shift=16==o||e.shiftKey;var i=aa(t,e);p&&(sa=i?o:null,i||88!=o||Ie||!(b?e.metaKey:e.ctrlKey)||t.replaceSelection("",null,"cut")),r&&!b&&!i&&46==o&&e.shiftKey&&!e.ctrlKey&&document.execCommand&&document.execCommand("cut"),18!=o||/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className)||function(e){var t=e.display.lineDiv;function r(e){18!=e.keyCode&&e.altKey||(E(t,"CodeMirror-crosshair"),he(document,"keyup",r),he(document,"mouseover",r))}I(t,"CodeMirror-crosshair"),pe(document,"keyup",r),pe(document,"mouseover",r)}(t)}}function da(e){16==e.keyCode&&(this.doc.sel.shift=!1),me(this,e)}function ca(e){var t=this;if(!(e.target&&e.target!=t.display.input.getField()||_r(t.display,e)||me(t,e)||e.ctrlKey&&!e.altKey||b&&e.metaKey)){var r=e.keyCode,o=e.charCode;if(p&&r==sa)return sa=null,void ve(e);if(!p||e.which&&!(e.which<10)||!aa(t,e)){var i=String.fromCharCode(null==o?r:o);"\b"!=i&&(function(e,t,r){return ia(e,"'"+r+"'",t,(function(t){return ra(e,t,!0)}))}(t,e,i)||t.display.input.onKeyPress(e))}}}var pa,ua,ha=function(e,t,r){this.time=e,this.pos=t,this.button=r};function ga(e){var t=this,r=t.display;if(!(me(t,e)||r.activeTouch&&r.input.supportsTouch()))if(r.input.ensurePolled(),r.shift=e.shiftKey,_r(r,e))l||(r.scroller.draggable=!1,setTimeout((function(){return r.scroller.draggable=!0}),100));else if(!ya(t,e)){var o=lo(t,e),i=Ce(e),n=o?function(e,t){var r=+new Date;return ua&&ua.compare(r,e,t)?(pa=ua=null,"triple"):pa&&pa.compare(r,e,t)?(ua=new ha(r,e,t),pa=null,"double"):(pa=new ha(r,e,t),ua=null,"single")}(o,i):"single";window.focus(),1==i&&t.state.selectingText&&t.state.selectingText(e),o&&function(e,t,r,o,i){var n="Click";return"double"==o?n="Double"+n:"triple"==o&&(n="Triple"+n),ia(e,qn(n=(1==t?"Left":2==t?"Middle":"Right")+n,i),i,(function(t){if("string"==typeof t&&(t=$n[t]),!t)return!1;var o=!1;try{e.isReadOnly()&&(e.state.suppressEdits=!0),o=t(e,r)!=B}finally{e.state.suppressEdits=!1}return o}))}(t,i,o,n,e)||(1==i?o?function(e,t,r,o){a?setTimeout(z(wo,e),0):e.curOp.focus=L();var i,n=function(e,t,r){var o=e.getOption("configureMouse"),i=o?o(e,t,r):{};if(null==i.unit){var n=v?r.shiftKey&&r.metaKey:r.altKey;i.unit=n?"rectangle":"single"==t?"char":"double"==t?"word":"line"}return(null==i.extend||e.doc.extend)&&(i.extend=e.doc.extend||r.shiftKey),null==i.addNew&&(i.addNew=b?r.metaKey:r.ctrlKey),null==i.moveOnDrag&&(i.moveOnDrag=!(b?r.altKey:r.ctrlKey)),i}(e,r,o),d=e.doc.sel;e.options.dragDrop&&Te&&!e.isReadOnly()&&"single"==r&&(i=d.contains(t))>-1&&(tt((i=d.ranges[i]).from(),t)<0||t.xRel>0)&&(tt(i.to(),t)>0||t.xRel<0)?function(e,t,r,o){var i=e.display,n=!1,d=ei(e,(function(t){l&&(i.scroller.draggable=!1),e.state.draggingText=!1,e.state.delayingBlurEvent&&(e.hasFocus()?e.state.delayingBlurEvent=!1:So(e)),he(i.wrapper.ownerDocument,"mouseup",d),he(i.wrapper.ownerDocument,"mousemove",c),he(i.scroller,"dragstart",p),he(i.scroller,"drop",d),n||(ve(t),o.addNew||Ji(e.doc,r,null,null,o.extend),l&&!u||a&&9==s?setTimeout((function(){i.wrapper.ownerDocument.body.focus({preventScroll:!0}),i.input.focus()}),20):i.input.focus())})),c=function(e){n=n||Math.abs(t.clientX-e.clientX)+Math.abs(t.clientY-e.clientY)>=10},p=function(){return n=!0};l&&(i.scroller.draggable=!0),e.state.draggingText=d,d.copy=!o.moveOnDrag,pe(i.wrapper.ownerDocument,"mouseup",d),pe(i.wrapper.ownerDocument,"mousemove",c),pe(i.scroller,"dragstart",p),pe(i.scroller,"drop",d),e.state.delayingBlurEvent=!0,setTimeout((function(){return i.input.focus()}),20),i.scroller.dragDrop&&i.scroller.dragDrop()}(e,o,t,n):function(e,t,r,o){a&&So(e);var i=e.display,n=e.doc;ve(t);var s,l,d=n.sel,c=d.ranges;if(o.addNew&&!o.extend?(l=n.sel.contains(r),s=l>-1?c[l]:new Si(r,r)):(s=n.sel.primary(),l=n.sel.primIndex),"rectangle"==o.unit)o.addNew||(s=new Si(r,r)),r=lo(e,t,!0,!0),l=-1;else{var p=ma(e,r,o.unit);s=o.extend?qi(s,p.anchor,p.head,o.extend):p}o.addNew?-1==l?(l=c.length,Xi(n,Ci(e,c.concat([s]),l),{scroll:!1,origin:"*mouse"})):c.length>1&&c[l].empty()&&"char"==o.unit&&!o.extend?(Xi(n,Ci(e,c.slice(0,l).concat(c.slice(l+1)),0),{scroll:!1,origin:"*mouse"}),d=n.sel):Gi(n,l,s,W):(l=0,Xi(n,new wi([s],0),W),d=n.sel);var u=r,h=i.wrapper.getBoundingClientRect(),g=0;function m(t){var a=++g,c=lo(e,t,!0,"rectangle"==o.unit);if(c)if(0!=tt(c,u)){e.curOp.focus=L(),function(t){if(0!=tt(u,t))if(u=t,"rectangle"==o.unit){for(var i=[],a=e.options.tabSize,c=U(qe(n,r.line).text,r.ch,a),p=U(qe(n,t.line).text,t.ch,a),h=Math.min(c,p),g=Math.max(c,p),m=Math.min(r.line,t.line),f=Math.min(e.lastLine(),Math.max(r.line,t.line));m<=f;m++){var y=qe(n,m).text,b=K(y,h,a);h==g?i.push(new Si(et(m,b),et(m,b))):y.length>b&&i.push(new Si(et(m,b),et(m,K(y,g,a))))}i.length||i.push(new Si(r,r)),Xi(n,Ci(e,d.ranges.slice(0,l).concat(i),l),{origin:"*mouse",scroll:!1}),e.scrollIntoView(t)}else{var v,x=s,_=ma(e,t,o.unit),w=x.anchor;tt(_.anchor,w)>0?(v=_.head,w=nt(x.from(),_.anchor)):(v=_.anchor,w=it(x.to(),_.head));var S=d.ranges.slice(0);S[l]=function(e,t){var r=t.anchor,o=t.head,i=qe(e.doc,r.line);if(0==tt(r,o)&&r.sticky==o.sticky)return t;var n=de(i);if(!n)return t;var a=se(n,r.ch,r.sticky),s=n[a];if(s.from!=r.ch&&s.to!=r.ch)return t;var l,d=a+(s.from==r.ch==(1!=s.level)?0:1);if(0==d||d==n.length)return t;if(o.line!=r.line)l=(o.line-r.line)*("ltr"==e.doc.direction?1:-1)>0;else{var c=se(n,o.ch,o.sticky),p=c-a||(o.ch-r.ch)*(1==s.level?-1:1);l=c==d-1||c==d?p<0:p>0}var u=n[d+(l?-1:0)],h=l==(1==u.level),g=h?u.from:u.to,m=h?"after":"before";return r.ch==g&&r.sticky==m?t:new Si(new et(r.line,g,m),o)}(e,new Si(st(n,w),v)),Xi(n,Ci(e,S,l),W)}}(c);var p=Oo(i,n);(c.line>=p.to||c.line<p.from)&&setTimeout(ei(e,(function(){g==a&&m(t)})),150)}else{var f=t.clientY<h.top?-20:t.clientY>h.bottom?20:0;f&&setTimeout(ei(e,(function(){g==a&&(i.scroller.scrollTop+=f,m(t))})),50)}}function f(t){e.state.selectingText=!1,g=1/0,t&&(ve(t),i.input.focus()),he(i.wrapper.ownerDocument,"mousemove",y),he(i.wrapper.ownerDocument,"mouseup",b),n.history.lastSelOrigin=null}var y=ei(e,(function(e){0!==e.buttons&&Ce(e)?m(e):f(e)})),b=ei(e,f);e.state.selectingText=b,pe(i.wrapper.ownerDocument,"mousemove",y),pe(i.wrapper.ownerDocument,"mouseup",b)}(e,o,t,n)}(t,o,n,e):Se(e)==r.scroller&&ve(e):2==i?(o&&Ji(t.doc,o),setTimeout((function(){return r.input.focus()}),20)):3==i&&(S?t.display.input.onContextMenu(e):So(t)))}}function ma(e,t,r){if("char"==r)return new Si(t,t);if("word"==r)return e.findWordAt(t);if("line"==r)return new Si(et(t.line,0),st(e.doc,et(t.line+1,0)));var o=r(e,t);return new Si(o.from,o.to)}function fa(e,t,r,o){var i,n;if(t.touches)i=t.touches[0].clientX,n=t.touches[0].clientY;else try{i=t.clientX,n=t.clientY}catch(e){return!1}if(i>=Math.floor(e.display.gutters.getBoundingClientRect().right))return!1;o&&ve(t);var a=e.display,s=a.lineDiv.getBoundingClientRect();if(n>s.bottom||!ye(e,r))return _e(t);n-=s.top-a.viewOffset;for(var l=0;l<e.display.gutterSpecs.length;++l){var d=a.gutters.childNodes[l];if(d&&d.getBoundingClientRect().right>=i)return ge(e,r,e,Ye(e.doc,n),e.display.gutterSpecs[l].className,t),_e(t)}}function ya(e,t){return fa(e,t,"gutterClick",!0)}function ba(e,t){_r(e.display,t)||function(e,t){return!!ye(e,"gutterContextMenu")&&fa(e,t,"gutterContextMenu",!1)}(e,t)||me(e,t,"contextmenu")||S||e.display.input.onContextMenu(t)}function va(e){e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+e.options.theme.replace(/(^|\s)\s*/g," cm-s-"),Dr(e)}ha.prototype.compare=function(e,t,r){return this.time+400>e&&0==tt(t,this.pos)&&r==this.button};var xa={toString:function(){return"CodeMirror.Init"}},_a={},wa={};function Sa(e,t,r){if(!t!=!(r&&r!=xa)){var o=e.display.dragFunctions,i=t?pe:he;i(e.display.scroller,"dragstart",o.start),i(e.display.scroller,"dragenter",o.enter),i(e.display.scroller,"dragover",o.over),i(e.display.scroller,"dragleave",o.leave),i(e.display.scroller,"drop",o.drop)}}function Ca(e){e.options.lineWrapping?(I(e.display.wrapper,"CodeMirror-wrap"),e.display.sizer.style.minWidth="",e.display.sizerWidth=null):(E(e.display.wrapper,"CodeMirror-wrap"),Kt(e)),so(e),po(e),Dr(e),setTimeout((function(){return Bo(e)}),100)}function ka(e,t){var r=this;if(!(this instanceof ka))return new ka(e,t);this.options=t=t?F(t):{},F(_a,t,!1);var o=t.value;"string"==typeof o?o=new An(o,t.mode,null,t.lineSeparator,t.direction):t.mode&&(o.modeOption=t.mode),this.doc=o;var i=new ka.inputStyles[t.inputStyle](this),n=this.display=new fi(e,o,i,t);for(var d in n.wrapper.CodeMirror=this,va(this),t.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),jo(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:-1,cutIncoming:-1,selectingText:!1,draggingText:!1,highlight:new D,keySeq:null,specialChars:null},t.autofocus&&!y&&n.input.focus(),a&&s<11&&setTimeout((function(){return r.display.input.reset(!0)}),20),function(e){var t=e.display;pe(t.scroller,"mousedown",ei(e,ga)),pe(t.scroller,"dblclick",a&&s<11?ei(e,(function(t){if(!me(e,t)){var r=lo(e,t);if(r&&!ya(e,t)&&!_r(e.display,t)){ve(t);var o=e.findWordAt(r);Ji(e.doc,o.anchor,o.head)}}})):function(t){return me(e,t)||ve(t)}),pe(t.scroller,"contextmenu",(function(t){return ba(e,t)})),pe(t.input.getField(),"contextmenu",(function(r){t.scroller.contains(r.target)||ba(e,r)}));var r,o={end:0};function i(){t.activeTouch&&(r=setTimeout((function(){return t.activeTouch=null}),1e3),(o=t.activeTouch).end=+new Date)}function n(e,t){if(null==t.left)return!0;var r=t.left-e.left,o=t.top-e.top;return r*r+o*o>400}pe(t.scroller,"touchstart",(function(i){if(!me(e,i)&&!function(e){if(1!=e.touches.length)return!1;var t=e.touches[0];return t.radiusX<=1&&t.radiusY<=1}(i)&&!ya(e,i)){t.input.ensurePolled(),clearTimeout(r);var n=+new Date;t.activeTouch={start:n,moved:!1,prev:n-o.end<=300?o:null},1==i.touches.length&&(t.activeTouch.left=i.touches[0].pageX,t.activeTouch.top=i.touches[0].pageY)}})),pe(t.scroller,"touchmove",(function(){t.activeTouch&&(t.activeTouch.moved=!0)})),pe(t.scroller,"touchend",(function(r){var o=t.activeTouch;if(o&&!_r(t,r)&&null!=o.left&&!o.moved&&new Date-o.start<300){var a,s=e.coordsChar(t.activeTouch,"page");a=!o.prev||n(o,o.prev)?new Si(s,s):!o.prev.prev||n(o,o.prev.prev)?e.findWordAt(s):new Si(et(s.line,0),st(e.doc,et(s.line+1,0))),e.setSelection(a.anchor,a.head),e.focus(),ve(r)}i()})),pe(t.scroller,"touchcancel",i),pe(t.scroller,"scroll",(function(){t.scroller.clientHeight&&(No(e,t.scroller.scrollTop),Fo(e,t.scroller.scrollLeft,!0),ge(e,"scroll",e))})),pe(t.scroller,"mousewheel",(function(t){return _i(e,t)})),pe(t.scroller,"DOMMouseScroll",(function(t){return _i(e,t)})),pe(t.wrapper,"scroll",(function(){return t.wrapper.scrollTop=t.wrapper.scrollLeft=0})),t.dragFunctions={enter:function(t){me(e,t)||we(t)},over:function(t){me(e,t)||(function(e,t){var r=lo(e,t);if(r){var o=document.createDocumentFragment();bo(e,r,o),e.display.dragCursor||(e.display.dragCursor=P("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),e.display.lineSpace.insertBefore(e.display.dragCursor,e.display.cursorDiv)),O(e.display.dragCursor,o)}}(e,t),we(t))},start:function(t){return function(e,t){if(a&&(!e.state.draggingText||+new Date-Rn<100))we(t);else if(!me(e,t)&&!_r(e.display,t)&&(t.dataTransfer.setData("Text",e.getSelection()),t.dataTransfer.effectAllowed="copyMove",t.dataTransfer.setDragImage&&!u)){var r=P("img",null,null,"position: fixed; left: 0; top: 0;");r.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",p&&(r.width=r.height=1,e.display.wrapper.appendChild(r),r._top=r.offsetTop),t.dataTransfer.setDragImage(r,0,0),p&&r.parentNode.removeChild(r)}}(e,t)},drop:ei(e,Ln),leave:function(t){me(e,t)||In(e)}};var l=t.input.getField();pe(l,"keyup",(function(t){return da.call(e,t)})),pe(l,"keydown",ei(e,la)),pe(l,"keypress",ei(e,ca)),pe(l,"focus",(function(t){return Co(e,t)})),pe(l,"blur",(function(t){return ko(e,t)}))}(this),function(){var e;Nn||(pe(window,"resize",(function(){null==e&&(e=setTimeout((function(){e=null,Mn(zn)}),100))})),pe(window,"blur",(function(){return Mn(ko)})),Nn=!0)}(),qo(this),this.curOp.forceUpdate=!0,Ni(this,o),t.autofocus&&!y||this.hasFocus()?setTimeout((function(){r.hasFocus()&&!r.state.focused&&Co(r)}),20):ko(this),wa)wa.hasOwnProperty(d)&&wa[d](this,t[d],xa);ui(this),t.finishInit&&t.finishInit(this);for(var c=0;c<Ea.length;++c)Ea[c](this);Jo(this),l&&t.lineWrapping&&"optimizelegibility"==getComputedStyle(n.lineDiv).textRendering&&(n.lineDiv.style.textRendering="auto")}ka.defaults=_a,ka.optionHandlers=wa;var Ea=[];function Ta(e,t,r,o){var i,n=e.doc;null==r&&(r="add"),"smart"==r&&(n.mode.indent?i=ht(e,t).state:r="prev");var a=e.options.tabSize,s=qe(n,t),l=U(s.text,null,a);s.stateAfter&&(s.stateAfter=null);var d,c=s.text.match(/^\s*/)[0];if(o||/\S/.test(s.text)){if("smart"==r&&((d=n.mode.indent(i,s.text.slice(c.length),s.text))==B||d>150)){if(!o)return;r="prev"}}else d=0,r="not";"prev"==r?d=t>n.first?U(qe(n,t-1).text,null,a):0:"add"==r?d=l+e.options.indentUnit:"subtract"==r?d=l-e.options.indentUnit:"number"==typeof r&&(d=l+r),d=Math.max(0,d);var p="",u=0;if(e.options.indentWithTabs)for(var h=Math.floor(d/a);h;--h)u+=a,p+="\t";if(u<d&&(p+=J(d-u)),p!=c)return gn(n,p,et(t,0),et(t,c.length),"+input"),s.stateAfter=null,!0;for(var g=0;g<n.sel.ranges.length;g++){var m=n.sel.ranges[g];if(m.head.line==t&&m.head.ch<c.length){var f=et(t,c.length);Gi(n,g,new Si(f,f));break}}}ka.defineInitHook=function(e){return Ea.push(e)};var Oa=null;function Pa(e){Oa=e}function Aa(e,t,r,o,i){var n=e.doc;e.display.shift=!1,o||(o=n.sel);var a=+new Date-200,s="paste"==i||e.state.pasteIncoming>a,l=Re(t),d=null;if(s&&o.ranges.length>1)if(Oa&&Oa.text.join("\n")==t){if(o.ranges.length%Oa.text.length==0){d=[];for(var c=0;c<Oa.text.length;c++)d.push(n.splitLines(Oa.text[c]))}}else l.length==o.ranges.length&&e.options.pasteLinesPerSelection&&(d=G(l,(function(e){return[e]})));for(var p=e.curOp.updateInput,u=o.ranges.length-1;u>=0;u--){var h=o.ranges[u],g=h.from(),m=h.to();h.empty()&&(r&&r>0?g=et(g.line,g.ch-r):e.state.overwrite&&!s?m=et(m.line,Math.min(qe(n,m.line).text.length,m.ch+Z(l).length)):s&&Oa&&Oa.lineWise&&Oa.text.join("\n")==l.join("\n")&&(g=m=et(g.line,0)));var f={from:g,to:m,text:d?d[u%d.length]:l,origin:i||(s?"paste":e.state.cutIncoming>a?"cut":"+input")};dn(e.doc,f),sr(e,"inputRead",e,f)}t&&!s&&La(e,t),Ro(e),e.curOp.updateInput<2&&(e.curOp.updateInput=p),e.curOp.typing=!0,e.state.pasteIncoming=e.state.cutIncoming=-1}function Ra(e,t){var r=e.clipboardData&&e.clipboardData.getData("Text");if(r)return e.preventDefault(),t.isReadOnly()||t.options.disableInput||$o(t,(function(){return Aa(t,r,0,null,"paste")})),!0}function La(e,t){if(e.options.electricChars&&e.options.smartIndent)for(var r=e.doc.sel,o=r.ranges.length-1;o>=0;o--){var i=r.ranges[o];if(!(i.head.ch>100||o&&r.ranges[o-1].head.line==i.head.line)){var n=e.getModeAt(i.head),a=!1;if(n.electricChars){for(var s=0;s<n.electricChars.length;s++)if(t.indexOf(n.electricChars.charAt(s))>-1){a=Ta(e,i.head.line,"smart");break}}else n.electricInput&&n.electricInput.test(qe(e.doc,i.head.line).text.slice(0,i.head.ch))&&(a=Ta(e,i.head.line,"smart"));a&&sr(e,"electricInput",e,i.head.line)}}}function Ia(e){for(var t=[],r=[],o=0;o<e.doc.sel.ranges.length;o++){var i=e.doc.sel.ranges[o].head.line,n={anchor:et(i,0),head:et(i+1,0)};r.push(n),t.push(e.getRange(n.anchor,n.head))}return{text:t,ranges:r}}function Ma(e,t,r,o){e.setAttribute("autocorrect",r?"":"off"),e.setAttribute("autocapitalize",o?"":"off"),e.setAttribute("spellcheck",!!t)}function Na(){var e=P("textarea",null,null,"position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),t=P("div",[e],null,"overflow: hidden; position: relative; width: 3px; height: 0px;");return l?e.style.width="1000px":e.setAttribute("wrap","off"),m&&(e.style.border="1px solid black"),Ma(e),t}function za(e,t,r,o,i){var n=t,a=r,s=qe(e,t.line),l=i&&"rtl"==e.direction?-r:r;function d(n){var a,d;if("codepoint"==o){var c=s.text.charCodeAt(t.ch+(r>0?0:-1));if(isNaN(c))a=null;else{var p=r>0?c>=55296&&c<56320:c>=56320&&c<57343;a=new et(t.line,Math.max(0,Math.min(s.text.length,t.ch+r*(p?2:1))),-r)}}else a=i?function(e,t,r,o){var i=de(t,e.doc.direction);if(!i)return Yn(t,r,o);r.ch>=t.text.length?(r.ch=t.text.length,r.sticky="before"):r.ch<=0&&(r.ch=0,r.sticky="after");var n=se(i,r.ch,r.sticky),a=i[n];if("ltr"==e.doc.direction&&a.level%2==0&&(o>0?a.to>r.ch:a.from<r.ch))return Yn(t,r,o);var s,l=function(e,r){return Qn(t,e instanceof et?e.ch:e,r)},d=function(r){return e.options.lineWrapping?(s=s||Rr(e,t),Yr(e,t,s,r)):{begin:0,end:t.text.length}},c=d("before"==r.sticky?l(r,-1):r.ch);if("rtl"==e.doc.direction||1==a.level){var p=1==a.level==o<0,u=l(r,p?1:-1);if(null!=u&&(p?u<=a.to&&u<=c.end:u>=a.from&&u>=c.begin)){var h=p?"before":"after";return new et(r.line,u,h)}}var g=function(e,t,o){for(var n=function(e,t){return t?new et(r.line,l(e,1),"before"):new et(r.line,e,"after")};e>=0&&e<i.length;e+=t){var a=i[e],s=t>0==(1!=a.level),d=s?o.begin:l(o.end,-1);if(a.from<=d&&d<a.to)return n(d,s);if(d=s?a.from:l(a.to,-1),o.begin<=d&&d<o.end)return n(d,s)}},m=g(n+o,o,c);if(m)return m;var f=o>0?c.end:l(c.begin,-1);return null==f||o>0&&f==t.text.length||!(m=g(o>0?0:i.length-1,o,d(f)))?null:m}(e.cm,s,t,r):Yn(s,t,r);if(null==a){if(n||(d=t.line+l)<e.first||d>=e.first+e.size||(t=new et(d,t.ch,t.sticky),!(s=qe(e,d))))return!1;t=Xn(i,e.cm,s,t.line,l)}else t=a;return!0}if("char"==o||"codepoint"==o)d();else if("column"==o)d(!0);else if("word"==o||"group"==o)for(var c=null,p="group"==o,u=e.cm&&e.cm.getHelper(t,"wordChars"),h=!0;!(r<0)||d(!h);h=!1){var g=s.text.charAt(t.ch)||"\n",m=ee(g,u)?"w":p&&"\n"==g?"n":!p||/\s/.test(g)?null:"p";if(!p||h||m||(m="s"),c&&c!=m){r<0&&(r=1,d(),t.sticky="after");break}if(m&&(c=m),r>0&&!d(!h))break}var f=nn(e,t,n,a,!0);return rt(n,f)&&(f.hitSide=!0),f}function Fa(e,t,r,o){var i,n,a=e.doc,s=t.left;if("page"==o){var l=Math.min(e.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight),d=Math.max(l-.5*ro(e.display),3);i=(r>0?t.bottom:t.top)+r*d}else"line"==o&&(i=r>0?t.bottom+3:t.top-3);for(;(n=Gr(e,s,i)).outside;){if(r<0?i<=0:i>=a.height){n.hitSide=!0;break}i+=5*r}return n}var Ua=function(e){this.cm=e,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new D,this.composing=null,this.gracePeriod=!1,this.readDOMTimeout=null};function Da(e,t){var r=Ar(e,t.line);if(!r||r.hidden)return null;var o=qe(e.doc,t.line),i=Or(r,o,t.line),n=de(o,e.doc.direction),a="left";n&&(a=se(n,t.ch)%2?"right":"left");var s=Nr(i.map,t.ch,a);return s.offset="right"==s.collapse?s.end:s.start,s}function Ha(e,t){return t&&(e.bad=!0),e}function Ba(e,t,r){var o;if(t==e.display.lineDiv){if(!(o=e.display.lineDiv.childNodes[r]))return Ha(e.clipPos(et(e.display.viewTo-1)),!0);t=null,r=0}else for(o=t;;o=o.parentNode){if(!o||o==e.display.lineDiv)return null;if(o.parentNode&&o.parentNode==e.display.lineDiv)break}for(var i=0;i<e.display.view.length;i++){var n=e.display.view[i];if(n.node==o)return Va(n,t,r)}}function Va(e,t,r){var o=e.text.firstChild,i=!1;if(!t||!R(o,t))return Ha(et(Qe(e.line),0),!0);if(t==o&&(i=!0,t=o.childNodes[r],r=0,!t)){var n=e.rest?Z(e.rest):e.line;return Ha(et(Qe(n),n.text.length),i)}var a=3==t.nodeType?t:null,s=t;for(a||1!=t.childNodes.length||3!=t.firstChild.nodeType||(a=t.firstChild,r&&(r=a.nodeValue.length));s.parentNode!=o;)s=s.parentNode;var l=e.measure,d=l.maps;function c(t,r,o){for(var i=-1;i<(d?d.length:0);i++)for(var n=i<0?l.map:d[i],a=0;a<n.length;a+=3){var s=n[a+2];if(s==t||s==r){var c=Qe(i<0?e.line:e.rest[i]),p=n[a]+o;return(o<0||s!=t)&&(p=n[a+(o?1:0)]),et(c,p)}}}var p=c(a,s,r);if(p)return Ha(p,i);for(var u=s.nextSibling,h=a?a.nodeValue.length-r:0;u;u=u.nextSibling){if(p=c(u,u.firstChild,0))return Ha(et(p.line,p.ch-h),i);h+=u.textContent.length}for(var g=s.previousSibling,m=r;g;g=g.previousSibling){if(p=c(g,g.firstChild,-1))return Ha(et(p.line,p.ch+m),i);m+=g.textContent.length}}Ua.prototype.init=function(e){var t=this,r=this,o=r.cm,i=r.div=e.lineDiv;function n(e){for(var t=e.target;t;t=t.parentNode){if(t==i)return!0;if(/\bCodeMirror-(?:line)?widget\b/.test(t.className))break}return!1}function a(e){if(n(e)&&!me(o,e)){if(o.somethingSelected())Pa({lineWise:!1,text:o.getSelections()}),"cut"==e.type&&o.replaceSelection("",null,"cut");else{if(!o.options.lineWiseCopyCut)return;var t=Ia(o);Pa({lineWise:!0,text:t.text}),"cut"==e.type&&o.operation((function(){o.setSelections(t.ranges,0,V),o.replaceSelection("",null,"cut")}))}if(e.clipboardData){e.clipboardData.clearData();var a=Oa.text.join("\n");if(e.clipboardData.setData("Text",a),e.clipboardData.getData("Text")==a)return void e.preventDefault()}var s=Na(),l=s.firstChild;o.display.lineSpace.insertBefore(s,o.display.lineSpace.firstChild),l.value=Oa.text.join("\n");var d=L();N(l),setTimeout((function(){o.display.lineSpace.removeChild(s),d.focus(),d==i&&r.showPrimarySelection()}),50)}}i.contentEditable=!0,Ma(i,o.options.spellcheck,o.options.autocorrect,o.options.autocapitalize),pe(i,"paste",(function(e){!n(e)||me(o,e)||Ra(e,o)||s<=11&&setTimeout(ei(o,(function(){return t.updateFromDOM()})),20)})),pe(i,"compositionstart",(function(e){t.composing={data:e.data,done:!1}})),pe(i,"compositionupdate",(function(e){t.composing||(t.composing={data:e.data,done:!1})})),pe(i,"compositionend",(function(e){t.composing&&(e.data!=t.composing.data&&t.readFromDOMSoon(),t.composing.done=!0)})),pe(i,"touchstart",(function(){return r.forceCompositionEnd()})),pe(i,"input",(function(){t.composing||t.readFromDOMSoon()})),pe(i,"copy",a),pe(i,"cut",a)},Ua.prototype.screenReaderLabelChanged=function(e){e?this.div.setAttribute("aria-label",e):this.div.removeAttribute("aria-label")},Ua.prototype.prepareSelection=function(){var e=yo(this.cm,!1);return e.focus=L()==this.div,e},Ua.prototype.showSelection=function(e,t){e&&this.cm.display.view.length&&((e.focus||t)&&this.showPrimarySelection(),this.showMultipleSelections(e))},Ua.prototype.getSelection=function(){return this.cm.display.wrapper.ownerDocument.getSelection()},Ua.prototype.showPrimarySelection=function(){var e=this.getSelection(),t=this.cm,o=t.doc.sel.primary(),i=o.from(),n=o.to();if(t.display.viewTo==t.display.viewFrom||i.line>=t.display.viewTo||n.line<t.display.viewFrom)e.removeAllRanges();else{var a=Ba(t,e.anchorNode,e.anchorOffset),s=Ba(t,e.focusNode,e.focusOffset);if(!a||a.bad||!s||s.bad||0!=tt(nt(a,s),i)||0!=tt(it(a,s),n)){var l=t.display.view,d=i.line>=t.display.viewFrom&&Da(t,i)||{node:l[0].measure.map[2],offset:0},c=n.line<t.display.viewTo&&Da(t,n);if(!c){var p=l[l.length-1].measure,u=p.maps?p.maps[p.maps.length-1]:p.map;c={node:u[u.length-1],offset:u[u.length-2]-u[u.length-3]}}if(d&&c){var h,g=e.rangeCount&&e.getRangeAt(0);try{h=k(d.node,d.offset,c.offset,c.node)}catch(e){}h&&(!r&&t.state.focused?(e.collapse(d.node,d.offset),h.collapsed||(e.removeAllRanges(),e.addRange(h))):(e.removeAllRanges(),e.addRange(h)),g&&null==e.anchorNode?e.addRange(g):r&&this.startGracePeriod()),this.rememberSelection()}else e.removeAllRanges()}}},Ua.prototype.startGracePeriod=function(){var e=this;clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout((function(){e.gracePeriod=!1,e.selectionChanged()&&e.cm.operation((function(){return e.cm.curOp.selectionChanged=!0}))}),20)},Ua.prototype.showMultipleSelections=function(e){O(this.cm.display.cursorDiv,e.cursors),O(this.cm.display.selectionDiv,e.selection)},Ua.prototype.rememberSelection=function(){var e=this.getSelection();this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastFocusNode=e.focusNode,this.lastFocusOffset=e.focusOffset},Ua.prototype.selectionInEditor=function(){var e=this.getSelection();if(!e.rangeCount)return!1;var t=e.getRangeAt(0).commonAncestorContainer;return R(this.div,t)},Ua.prototype.focus=function(){"nocursor"!=this.cm.options.readOnly&&(this.selectionInEditor()&&L()==this.div||this.showSelection(this.prepareSelection(),!0),this.div.focus())},Ua.prototype.blur=function(){this.div.blur()},Ua.prototype.getField=function(){return this.div},Ua.prototype.supportsTouch=function(){return!0},Ua.prototype.receivedFocus=function(){var e=this;this.selectionInEditor()?this.pollSelection():$o(this.cm,(function(){return e.cm.curOp.selectionChanged=!0})),this.polling.set(this.cm.options.pollInterval,(function t(){e.cm.state.focused&&(e.pollSelection(),e.polling.set(e.cm.options.pollInterval,t))}))},Ua.prototype.selectionChanged=function(){var e=this.getSelection();return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset},Ua.prototype.pollSelection=function(){if(null==this.readDOMTimeout&&!this.gracePeriod&&this.selectionChanged()){var e=this.getSelection(),t=this.cm;if(f&&c&&this.cm.display.gutterSpecs.length&&function(e){for(var t=e;t;t=t.parentNode)if(/CodeMirror-gutter-wrapper/.test(t.className))return!0;return!1}(e.anchorNode))return this.cm.triggerOnKeyDown({type:"keydown",keyCode:8,preventDefault:Math.abs}),this.blur(),void this.focus();if(!this.composing){this.rememberSelection();var r=Ba(t,e.anchorNode,e.anchorOffset),o=Ba(t,e.focusNode,e.focusOffset);r&&o&&$o(t,(function(){Xi(t.doc,ki(r,o),V),(r.bad||o.bad)&&(t.curOp.selectionChanged=!0)}))}}},Ua.prototype.pollContent=function(){null!=this.readDOMTimeout&&(clearTimeout(this.readDOMTimeout),this.readDOMTimeout=null);var e,t,r,o=this.cm,i=o.display,n=o.doc.sel.primary(),a=n.from(),s=n.to();if(0==a.ch&&a.line>o.firstLine()&&(a=et(a.line-1,qe(o.doc,a.line-1).length)),s.ch==qe(o.doc,s.line).text.length&&s.line<o.lastLine()&&(s=et(s.line+1,0)),a.line<i.viewFrom||s.line>i.viewTo-1)return!1;a.line==i.viewFrom||0==(e=co(o,a.line))?(t=Qe(i.view[0].line),r=i.view[0].node):(t=Qe(i.view[e].line),r=i.view[e-1].node.nextSibling);var l,d,c=co(o,s.line);if(c==i.view.length-1?(l=i.viewTo-1,d=i.lineDiv.lastChild):(l=Qe(i.view[c+1].line)-1,d=i.view[c+1].node.previousSibling),!r)return!1;for(var p=o.doc.splitLines(function(e,t,r,o,i){var n="",a=!1,s=e.doc.lineSeparator(),l=!1;function d(){a&&(n+=s,l&&(n+=s),a=l=!1)}function c(e){e&&(d(),n+=e)}function p(t){if(1==t.nodeType){var r=t.getAttribute("cm-text");if(r)return void c(r);var n,u=t.getAttribute("cm-marker");if(u){var h=e.findMarks(et(o,0),et(i+1,0),(f=+u,function(e){return e.id==f}));return void(h.length&&(n=h[0].find(0))&&c(Je(e.doc,n.from,n.to).join(s)))}if("false"==t.getAttribute("contenteditable"))return;var g=/^(pre|div|p|li|table|br)$/i.test(t.nodeName);if(!/^br$/i.test(t.nodeName)&&0==t.textContent.length)return;g&&d();for(var m=0;m<t.childNodes.length;m++)p(t.childNodes[m]);/^(pre|p)$/i.test(t.nodeName)&&(l=!0),g&&(a=!0)}else 3==t.nodeType&&c(t.nodeValue.replace(/\u200b/g,"").replace(/\u00a0/g," "));var f}for(;p(t),t!=r;)t=t.nextSibling,l=!1;return n}(o,r,d,t,l)),u=Je(o.doc,et(t,0),et(l,qe(o.doc,l).text.length));p.length>1&&u.length>1;)if(Z(p)==Z(u))p.pop(),u.pop(),l--;else{if(p[0]!=u[0])break;p.shift(),u.shift(),t++}for(var h=0,g=0,m=p[0],f=u[0],y=Math.min(m.length,f.length);h<y&&m.charCodeAt(h)==f.charCodeAt(h);)++h;for(var b=Z(p),v=Z(u),x=Math.min(b.length-(1==p.length?h:0),v.length-(1==u.length?h:0));g<x&&b.charCodeAt(b.length-g-1)==v.charCodeAt(v.length-g-1);)++g;if(1==p.length&&1==u.length&&t==a.line)for(;h&&h>a.ch&&b.charCodeAt(b.length-g-1)==v.charCodeAt(v.length-g-1);)h--,g++;p[p.length-1]=b.slice(0,b.length-g).replace(/^\u200b+/,""),p[0]=p[0].slice(h).replace(/\u200b+$/,"");var _=et(t,h),w=et(l,u.length?Z(u).length-g:0);return p.length>1||p[0]||tt(_,w)?(gn(o.doc,p,_,w,"+input"),!0):void 0},Ua.prototype.ensurePolled=function(){this.forceCompositionEnd()},Ua.prototype.reset=function(){this.forceCompositionEnd()},Ua.prototype.forceCompositionEnd=function(){this.composing&&(clearTimeout(this.readDOMTimeout),this.composing=null,this.updateFromDOM(),this.div.blur(),this.div.focus())},Ua.prototype.readFromDOMSoon=function(){var e=this;null==this.readDOMTimeout&&(this.readDOMTimeout=setTimeout((function(){if(e.readDOMTimeout=null,e.composing){if(!e.composing.done)return;e.composing=null}e.updateFromDOM()}),80))},Ua.prototype.updateFromDOM=function(){var e=this;!this.cm.isReadOnly()&&this.pollContent()||$o(this.cm,(function(){return po(e.cm)}))},Ua.prototype.setUneditable=function(e){e.contentEditable="false"},Ua.prototype.onKeyPress=function(e){0==e.charCode||this.composing||(e.preventDefault(),this.cm.isReadOnly()||ei(this.cm,Aa)(this.cm,String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),0))},Ua.prototype.readOnlyChanged=function(e){this.div.contentEditable=("nocursor"!=e)+""},Ua.prototype.onContextMenu=function(){},Ua.prototype.resetPosition=function(){},Ua.prototype.needsContentAttribute=!0;var Wa=function(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new D,this.hasSelection=!1,this.composing=null};Wa.prototype.init=function(e){var t=this,r=this,o=this.cm;this.createField(e);var i=this.textarea;function n(e){if(!me(o,e)){if(o.somethingSelected())Pa({lineWise:!1,text:o.getSelections()});else{if(!o.options.lineWiseCopyCut)return;var t=Ia(o);Pa({lineWise:!0,text:t.text}),"cut"==e.type?o.setSelections(t.ranges,null,V):(r.prevInput="",i.value=t.text.join("\n"),N(i))}"cut"==e.type&&(o.state.cutIncoming=+new Date)}}e.wrapper.insertBefore(this.wrapper,e.wrapper.firstChild),m&&(i.style.width="0px"),pe(i,"input",(function(){a&&s>=9&&t.hasSelection&&(t.hasSelection=null),r.poll()})),pe(i,"paste",(function(e){me(o,e)||Ra(e,o)||(o.state.pasteIncoming=+new Date,r.fastPoll())})),pe(i,"cut",n),pe(i,"copy",n),pe(e.scroller,"paste",(function(t){if(!_r(e,t)&&!me(o,t)){if(!i.dispatchEvent)return o.state.pasteIncoming=+new Date,void r.focus();var n=new Event("paste");n.clipboardData=t.clipboardData,i.dispatchEvent(n)}})),pe(e.lineSpace,"selectstart",(function(t){_r(e,t)||ve(t)})),pe(i,"compositionstart",(function(){var e=o.getCursor("from");r.composing&&r.composing.range.clear(),r.composing={start:e,range:o.markText(e,o.getCursor("to"),{className:"CodeMirror-composing"})}})),pe(i,"compositionend",(function(){r.composing&&(r.poll(),r.composing.range.clear(),r.composing=null)}))},Wa.prototype.createField=function(e){this.wrapper=Na(),this.textarea=this.wrapper.firstChild},Wa.prototype.screenReaderLabelChanged=function(e){e?this.textarea.setAttribute("aria-label",e):this.textarea.removeAttribute("aria-label")},Wa.prototype.prepareSelection=function(){var e=this.cm,t=e.display,r=e.doc,o=yo(e);if(e.options.moveInputWithCursor){var i=qr(e,r.sel.primary().head,"div"),n=t.wrapper.getBoundingClientRect(),a=t.lineDiv.getBoundingClientRect();o.teTop=Math.max(0,Math.min(t.wrapper.clientHeight-10,i.top+a.top-n.top)),o.teLeft=Math.max(0,Math.min(t.wrapper.clientWidth-10,i.left+a.left-n.left))}return o},Wa.prototype.showSelection=function(e){var t=this.cm.display;O(t.cursorDiv,e.cursors),O(t.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")},Wa.prototype.reset=function(e){if(!this.contextMenuPending&&!this.composing){var t=this.cm;if(t.somethingSelected()){this.prevInput="";var r=t.getSelection();this.textarea.value=r,t.state.focused&&N(this.textarea),a&&s>=9&&(this.hasSelection=r)}else e||(this.prevInput=this.textarea.value="",a&&s>=9&&(this.hasSelection=null))}},Wa.prototype.getField=function(){return this.textarea},Wa.prototype.supportsTouch=function(){return!1},Wa.prototype.focus=function(){if("nocursor"!=this.cm.options.readOnly&&(!y||L()!=this.textarea))try{this.textarea.focus()}catch(e){}},Wa.prototype.blur=function(){this.textarea.blur()},Wa.prototype.resetPosition=function(){this.wrapper.style.top=this.wrapper.style.left=0},Wa.prototype.receivedFocus=function(){this.slowPoll()},Wa.prototype.slowPoll=function(){var e=this;this.pollingFast||this.polling.set(this.cm.options.pollInterval,(function(){e.poll(),e.cm.state.focused&&e.slowPoll()}))},Wa.prototype.fastPoll=function(){var e=!1,t=this;t.pollingFast=!0,t.polling.set(20,(function r(){t.poll()||e?(t.pollingFast=!1,t.slowPoll()):(e=!0,t.polling.set(60,r))}))},Wa.prototype.poll=function(){var e=this,t=this.cm,r=this.textarea,o=this.prevInput;if(this.contextMenuPending||!t.state.focused||Le(r)&&!o&&!this.composing||t.isReadOnly()||t.options.disableInput||t.state.keySeq)return!1;var i=r.value;if(i==o&&!t.somethingSelected())return!1;if(a&&s>=9&&this.hasSelection===i||b&&/[\uf700-\uf7ff]/.test(i))return t.display.input.reset(),!1;if(t.doc.sel==t.display.selForContextMenu){var n=i.charCodeAt(0);if(8203!=n||o||(o="​"),8666==n)return this.reset(),this.cm.execCommand("undo")}for(var l=0,d=Math.min(o.length,i.length);l<d&&o.charCodeAt(l)==i.charCodeAt(l);)++l;return $o(t,(function(){Aa(t,i.slice(l),o.length-l,null,e.composing?"*compose":null),i.length>1e3||i.indexOf("\n")>-1?r.value=e.prevInput="":e.prevInput=i,e.composing&&(e.composing.range.clear(),e.composing.range=t.markText(e.composing.start,t.getCursor("to"),{className:"CodeMirror-composing"}))})),!0},Wa.prototype.ensurePolled=function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},Wa.prototype.onKeyPress=function(){a&&s>=9&&(this.hasSelection=null),this.fastPoll()},Wa.prototype.onContextMenu=function(e){var t=this,r=t.cm,o=r.display,i=t.textarea;t.contextMenuPending&&t.contextMenuPending();var n=lo(r,e),d=o.scroller.scrollTop;if(n&&!p){r.options.resetSelectionOnContextMenu&&-1==r.doc.sel.contains(n)&&ei(r,Xi)(r.doc,ki(n),V);var c,u=i.style.cssText,h=t.wrapper.style.cssText,g=t.wrapper.offsetParent.getBoundingClientRect();if(t.wrapper.style.cssText="position: static",i.style.cssText="position: absolute; width: 30px; height: 30px;\n      top: "+(e.clientY-g.top-5)+"px; left: "+(e.clientX-g.left-5)+"px;\n      z-index: 1000; background: "+(a?"rgba(255, 255, 255, .05)":"transparent")+";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",l&&(c=window.scrollY),o.input.focus(),l&&window.scrollTo(null,c),o.input.reset(),r.somethingSelected()||(i.value=t.prevInput=" "),t.contextMenuPending=y,o.selForContextMenu=r.doc.sel,clearTimeout(o.detectingSelectAll),a&&s>=9&&f(),S){we(e);var m=function(){he(window,"mouseup",m),setTimeout(y,20)};pe(window,"mouseup",m)}else setTimeout(y,50)}function f(){if(null!=i.selectionStart){var e=r.somethingSelected(),n="​"+(e?i.value:"");i.value="⇚",i.value=n,t.prevInput=e?"":"​",i.selectionStart=1,i.selectionEnd=n.length,o.selForContextMenu=r.doc.sel}}function y(){if(t.contextMenuPending==y&&(t.contextMenuPending=!1,t.wrapper.style.cssText=h,i.style.cssText=u,a&&s<9&&o.scrollbars.setScrollTop(o.scroller.scrollTop=d),null!=i.selectionStart)){(!a||a&&s<9)&&f();var e=0,n=function(){o.selForContextMenu==r.doc.sel&&0==i.selectionStart&&i.selectionEnd>0&&"​"==t.prevInput?ei(r,sn)(r):e++<10?o.detectingSelectAll=setTimeout(n,500):(o.selForContextMenu=null,o.input.reset())};o.detectingSelectAll=setTimeout(n,200)}}},Wa.prototype.readOnlyChanged=function(e){e||this.reset(),this.textarea.disabled="nocursor"==e,this.textarea.readOnly=!!e},Wa.prototype.setUneditable=function(){},Wa.prototype.needsContentAttribute=!1,function(e){var t=e.optionHandlers;function r(r,o,i,n){e.defaults[r]=o,i&&(t[r]=n?function(e,t,r){r!=xa&&i(e,t,r)}:i)}e.defineOption=r,e.Init=xa,r("value","",(function(e,t){return e.setValue(t)}),!0),r("mode",null,(function(e,t){e.doc.modeOption=t,Ai(e)}),!0),r("indentUnit",2,Ai,!0),r("indentWithTabs",!1),r("smartIndent",!0),r("tabSize",4,(function(e){Ri(e),Dr(e),po(e)}),!0),r("lineSeparator",null,(function(e,t){if(e.doc.lineSep=t,t){var r=[],o=e.doc.first;e.doc.iter((function(e){for(var i=0;;){var n=e.text.indexOf(t,i);if(-1==n)break;i=n+t.length,r.push(et(o,n))}o++}));for(var i=r.length-1;i>=0;i--)gn(e.doc,t,r[i],et(r[i].line,r[i].ch+t.length))}})),r("specialChars",/[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g,(function(e,t,r){e.state.specialChars=RegExp(t.source+(t.test("\t")?"":"|\t"),"g"),r!=xa&&e.refresh()})),r("specialCharPlaceholder",Xt,(function(e){return e.refresh()}),!0),r("electricChars",!0),r("inputStyle",y?"contenteditable":"textarea",(function(){throw Error("inputStyle can not (yet) be changed in a running editor")}),!0),r("spellcheck",!1,(function(e,t){return e.getInputField().spellcheck=t}),!0),r("autocorrect",!1,(function(e,t){return e.getInputField().autocorrect=t}),!0),r("autocapitalize",!1,(function(e,t){return e.getInputField().autocapitalize=t}),!0),r("rtlMoveVisually",!x),r("wholeLineUpdateBefore",!0),r("theme","default",(function(e){va(e),mi(e)}),!0),r("keyMap","default",(function(e,t,r){var o=Zn(t),i=r!=xa&&Zn(r);i&&i.detach&&i.detach(e,o),o.attach&&o.attach(e,i||null)})),r("extraKeys",null),r("configureMouse",null),r("lineWrapping",!1,Ca,!0),r("gutters",[],(function(e,t){e.display.gutterSpecs=hi(t,e.options.lineNumbers),mi(e)}),!0),r("fixedGutter",!0,(function(e,t){e.display.gutters.style.left=t?no(e.display)+"px":"0",e.refresh()}),!0),r("coverGutterNextToScrollbar",!1,(function(e){return Bo(e)}),!0),r("scrollbarStyle","native",(function(e){jo(e),Bo(e),e.display.scrollbars.setScrollTop(e.doc.scrollTop),e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)}),!0),r("lineNumbers",!1,(function(e,t){e.display.gutterSpecs=hi(e.options.gutters,t),mi(e)}),!0),r("firstLineNumber",1,mi,!0),r("lineNumberFormatter",(function(e){return e}),mi,!0),r("showCursorWhenSelecting",!1,fo,!0),r("resetSelectionOnContextMenu",!0),r("lineWiseCopyCut",!0),r("pasteLinesPerSelection",!0),r("selectionsMayTouch",!1),r("readOnly",!1,(function(e,t){"nocursor"==t&&(ko(e),e.display.input.blur()),e.display.input.readOnlyChanged(t)})),r("screenReaderLabel",null,(function(e,t){t=""===t?null:t,e.display.input.screenReaderLabelChanged(t)})),r("disableInput",!1,(function(e,t){t||e.display.input.reset()}),!0),r("dragDrop",!0,Sa),r("allowDropFileTypes",null),r("cursorBlinkRate",530),r("cursorScrollMargin",0),r("cursorHeight",1,fo,!0),r("singleCursorHeightPerLine",!0,fo,!0),r("workTime",100),r("workDelay",100),r("flattenSpans",!0,Ri,!0),r("addModeClass",!1,Ri,!0),r("pollInterval",100),r("undoDepth",200,(function(e,t){return e.doc.history.undoDepth=t})),r("historyEventDelay",1250),r("viewportMargin",10,(function(e){return e.refresh()}),!0),r("maxHighlightLength",1e4,Ri,!0),r("moveInputWithCursor",!0,(function(e,t){t||e.display.input.resetPosition()})),r("tabindex",null,(function(e,t){return e.display.input.getField().tabIndex=t||""})),r("autofocus",null),r("direction","ltr",(function(e,t){return e.doc.setDirection(t)}),!0),r("phrases",null)}(ka),function(e){var t=e.optionHandlers,r=e.helpers={};e.prototype={constructor:e,focus:function(){window.focus(),this.display.input.focus()},setOption:function(e,r){var o=this.options,i=o[e];o[e]==r&&"mode"!=e||(o[e]=r,t.hasOwnProperty(e)&&ei(this,t[e])(this,r,i),ge(this,"optionChange",this,e))},getOption:function(e){return this.options[e]},getDoc:function(){return this.doc},addKeyMap:function(e,t){this.state.keyMaps[t?"push":"unshift"](Zn(e))},removeKeyMap:function(e){for(var t=this.state.keyMaps,r=0;r<t.length;++r)if(t[r]==e||t[r].name==e)return t.splice(r,1),!0},addOverlay:ti((function(t,r){var o=t.token?t:e.getMode(this.options,t);if(o.startState)throw Error("Overlays may not be stateful.");!function(e,t,r){for(var o=0,i=r(t);o<e.length&&r(e[o])<=i;)o++;e.splice(o,0,t)}(this.state.overlays,{mode:o,modeSpec:t,opaque:r&&r.opaque,priority:r&&r.priority||0},(function(e){return e.priority})),this.state.modeGen++,po(this)})),removeOverlay:ti((function(e){for(var t=this.state.overlays,r=0;r<t.length;++r){var o=t[r].modeSpec;if(o==e||"string"==typeof e&&o.name==e)return t.splice(r,1),this.state.modeGen++,void po(this)}})),indentLine:ti((function(e,t,r){"string"!=typeof t&&"number"!=typeof t&&(t=null==t?this.options.smartIndent?"smart":"prev":t?"add":"subtract"),Xe(this.doc,e)&&Ta(this,e,t,r)})),indentSelection:ti((function(e){for(var t=this.doc.sel.ranges,r=-1,o=0;o<t.length;o++){var i=t[o];if(i.empty())i.head.line>r&&(Ta(this,i.head.line,e,!0),r=i.head.line,o==this.doc.sel.primIndex&&Ro(this));else{var n=i.from(),a=i.to(),s=Math.max(r,n.line);r=Math.min(this.lastLine(),a.line-(a.ch?0:1))+1;for(var l=s;l<r;++l)Ta(this,l,e);var d=this.doc.sel.ranges;0==n.ch&&t.length==d.length&&d[o].from().ch>0&&Gi(this.doc,o,new Si(n,d[o].to()),V)}}})),getTokenAt:function(e,t){return bt(this,e,t)},getLineTokens:function(e,t){return bt(this,et(e),t,!0)},getTokenTypeAt:function(e){e=st(this.doc,e);var t,r=ut(this,qe(this.doc,e.line)),o=0,i=(r.length-1)/2,n=e.ch;if(0==n)t=r[2];else for(;;){var a=o+i>>1;if((a?r[2*a-1]:0)>=n)i=a;else{if(!(r[2*a+1]<n)){t=r[2*a+2];break}o=a+1}}var s=t?t.indexOf("overlay "):-1;return s<0?t:0==s?null:t.slice(0,s-1)},getModeAt:function(t){var r=this.doc.mode;return r.innerMode?e.innerMode(r,this.getTokenAt(t).state).mode:r},getHelper:function(e,t){return this.getHelpers(e,t)[0]},getHelpers:function(e,t){var o=[];if(!r.hasOwnProperty(t))return o;var i=r[t],n=this.getModeAt(e);if("string"==typeof n[t])i[n[t]]&&o.push(i[n[t]]);else if(n[t])for(var a=0;a<n[t].length;a++){var s=i[n[t][a]];s&&o.push(s)}else n.helperType&&i[n.helperType]?o.push(i[n.helperType]):i[n.name]&&o.push(i[n.name]);for(var l=0;l<i._global.length;l++){var d=i._global[l];d.pred(n,this)&&-1==H(o,d.val)&&o.push(d.val)}return o},getStateAfter:function(e,t){var r=this.doc;return ht(this,(e=at(r,null==e?r.first+r.size-1:e))+1,t).state},cursorCoords:function(e,t){var r=this.doc.sel.primary();return qr(this,null==e?r.head:"object"==typeof e?st(this.doc,e):e?r.from():r.to(),t||"page")},charCoords:function(e,t){return Kr(this,st(this.doc,e),t||"page")},coordsChar:function(e,t){return Gr(this,(e=jr(this,e,t||"page")).left,e.top)},lineAtHeight:function(e,t){return e=jr(this,{top:e,left:0},t||"page").top,Ye(this.doc,e+this.display.viewOffset)},heightAtLine:function(e,t,r){var o,i=!1;if("number"==typeof e){var n=this.doc.first+this.doc.size-1;e<this.doc.first?e=this.doc.first:e>n&&(e=n,i=!0),o=qe(this.doc,e)}else o=e;return Wr(this,o,{top:0,left:0},t||"page",r||i).top+(i?this.doc.height-Wt(o):0)},defaultTextHeight:function(){return ro(this.display)},defaultCharWidth:function(){return oo(this.display)},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(e,t,r,o,i){var n,a=this.display,s=(e=qr(this,st(this.doc,e))).bottom,l=e.left;if(t.style.position="absolute",t.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(t),a.sizer.appendChild(t),"over"==o)s=e.top;else if("above"==o||"near"==o){var d=Math.max(a.wrapper.clientHeight,this.doc.height),c=Math.max(a.sizer.clientWidth,a.lineSpace.clientWidth);("above"==o||e.bottom+t.offsetHeight>d)&&e.top>t.offsetHeight?s=e.top-t.offsetHeight:e.bottom+t.offsetHeight<=d&&(s=e.bottom),l+t.offsetWidth>c&&(l=c-t.offsetWidth)}t.style.top=s+"px",t.style.left=t.style.right="","right"==i?(l=a.sizer.clientWidth-t.offsetWidth,t.style.right="0px"):("left"==i?l=0:"middle"==i&&(l=(a.sizer.clientWidth-t.offsetWidth)/2),t.style.left=l+"px"),r&&(null!=(n=Po(this,{left:l,top:s,right:l+t.offsetWidth,bottom:s+t.offsetHeight})).scrollTop&&No(this,n.scrollTop),null!=n.scrollLeft&&Fo(this,n.scrollLeft))},triggerOnKeyDown:ti(la),triggerOnKeyPress:ti(ca),triggerOnKeyUp:da,triggerOnMouseDown:ti(ga),execCommand:function(e){if($n.hasOwnProperty(e))return $n[e].call(null,this)},triggerElectric:ti((function(e){La(this,e)})),findPosH:function(e,t,r,o){var i=1;t<0&&(i=-1,t=-t);for(var n=st(this.doc,e),a=0;a<t&&!(n=za(this.doc,n,i,r,o)).hitSide;++a);return n},moveH:ti((function(e,t){var r=this;this.extendSelectionsBy((function(o){return r.display.shift||r.doc.extend||o.empty()?za(r.doc,o.head,e,t,r.options.rtlMoveVisually):e<0?o.from():o.to()}),j)})),deleteH:ti((function(e,t){var r=this.doc.sel,o=this.doc;r.somethingSelected()?o.replaceSelection("",null,"+delete"):Gn(this,(function(r){var i=za(o,r.head,e,t,!1);return e<0?{from:i,to:r.head}:{from:r.head,to:i}}))})),findPosV:function(e,t,r,o){var i=1,n=o;t<0&&(i=-1,t=-t);for(var a=st(this.doc,e),s=0;s<t;++s){var l=qr(this,a,"div");if(null==n?n=l.left:l.left=n,(a=Fa(this,l,i,r)).hitSide)break}return a},moveV:ti((function(e,t){var r=this,o=this.doc,i=[],n=!this.display.shift&&!o.extend&&o.sel.somethingSelected();if(o.extendSelectionsBy((function(a){if(n)return e<0?a.from():a.to();var s=qr(r,a.head,"div");null!=a.goalColumn&&(s.left=a.goalColumn),i.push(s.left);var l=Fa(r,s,e,t);return"page"==t&&a==o.sel.primary()&&Ao(r,Kr(r,l,"div").top-s.top),l}),j),i.length)for(var a=0;a<o.sel.ranges.length;a++)o.sel.ranges[a].goalColumn=i[a]})),findWordAt:function(e){var t=qe(this.doc,e.line).text,r=e.ch,o=e.ch;if(t){var i=this.getHelper(e,"wordChars");"before"!=e.sticky&&o!=t.length||!r?++o:--r;for(var n=t.charAt(r),a=ee(n,i)?function(e){return ee(e,i)}:/\s/.test(n)?function(e){return/\s/.test(e)}:function(e){return!/\s/.test(e)&&!ee(e)};r>0&&a(t.charAt(r-1));)--r;for(;o<t.length&&a(t.charAt(o));)++o}return new Si(et(e.line,r),et(e.line,o))},toggleOverwrite:function(e){null!=e&&e==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?I(this.display.cursorDiv,"CodeMirror-overwrite"):E(this.display.cursorDiv,"CodeMirror-overwrite"),ge(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==L()},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:ti((function(e,t){Lo(this,e,t)})),getScrollInfo:function(){var e=this.display.scroller;return{left:e.scrollLeft,top:e.scrollTop,height:e.scrollHeight-kr(this)-this.display.barHeight,width:e.scrollWidth-kr(this)-this.display.barWidth,clientHeight:Tr(this),clientWidth:Er(this)}},scrollIntoView:ti((function(e,t){null==e?(e={from:this.doc.sel.primary().head,to:null},null==t&&(t=this.options.cursorScrollMargin)):"number"==typeof e?e={from:et(e,0),to:null}:null==e.from&&(e={from:e,to:null}),e.to||(e.to=e.from),e.margin=t||0,null!=e.from.line?function(e,t){Io(e),e.curOp.scrollToPos=t}(this,e):Mo(this,e.from,e.to,e.margin)})),setSize:ti((function(e,t){var r=this,o=function(e){return"number"==typeof e||/^\d+$/.test(e+"")?e+"px":e};null!=e&&(this.display.wrapper.style.width=o(e)),null!=t&&(this.display.wrapper.style.height=o(t)),this.options.lineWrapping&&Ur(this);var i=this.display.viewFrom;this.doc.iter(i,this.display.viewTo,(function(e){if(e.widgets)for(var t=0;t<e.widgets.length;t++)if(e.widgets[t].noHScroll){uo(r,i,"widget");break}++i})),this.curOp.forceUpdate=!0,ge(this,"refresh",this)})),operation:function(e){return $o(this,e)},startOperation:function(){return qo(this)},endOperation:function(){return Jo(this)},refresh:ti((function(){var e=this.display.cachedTextHeight;po(this),this.curOp.forceUpdate=!0,Dr(this),Lo(this,this.doc.scrollLeft,this.doc.scrollTop),di(this.display),(null==e||Math.abs(e-ro(this.display))>.5||this.options.lineWrapping)&&so(this),ge(this,"refresh",this)})),swapDoc:ti((function(e){var t=this.doc;return t.cm=null,this.state.selectingText&&this.state.selectingText(),Ni(this,e),Dr(this),this.display.input.reset(),Lo(this,e.scrollLeft,e.scrollTop),this.curOp.forceScroll=!0,sr(this,"swapDoc",this,t),t})),phrase:function(e){var t=this.options.phrases;return t&&Object.prototype.hasOwnProperty.call(t,e)?t[e]:e},getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},be(e),e.registerHelper=function(t,o,i){r.hasOwnProperty(t)||(r[t]=e[t]={_global:[]}),r[t][o]=i},e.registerGlobalHelper=function(t,o,i,n){e.registerHelper(t,o,n),r[t]._global.push({pred:i,val:n})}}(ka);var ja="iter insert remove copy getEditor constructor".split(" ");for(var Ka in An.prototype)An.prototype.hasOwnProperty(Ka)&&H(ja,Ka)<0&&(ka.prototype[Ka]=function(e){return function(){return e.apply(this.doc,arguments)}}(An.prototype[Ka]));return be(An),ka.inputStyles={textarea:Wa,contenteditable:Ua},ka.defineMode=function(e){ka.defaults.mode||"null"==e||(ka.defaults.mode=e),Fe.apply(this,arguments)},ka.defineMIME=function(e,t){ze[e]=t},ka.defineMode("null",(function(){return{token:function(e){return e.skipToEnd()}}})),ka.defineMIME("text/plain","null"),ka.defineExtension=function(e,t){ka.prototype[e]=t},ka.defineDocExtension=function(e,t){An.prototype[e]=t},ka.fromTextArea=function(e,t){if((t=t?F(t):{}).value=e.value,!t.tabindex&&e.tabIndex&&(t.tabindex=e.tabIndex),!t.placeholder&&e.placeholder&&(t.placeholder=e.placeholder),null==t.autofocus){var r=L();t.autofocus=r==e||null!=e.getAttribute("autofocus")&&r==document.body}function o(){e.value=s.getValue()}var i;if(e.form&&(pe(e.form,"submit",o),!t.leaveSubmitMethodAlone)){var n=e.form;i=n.submit;try{var a=n.submit=function(){o(),n.submit=i,n.submit(),n.submit=a}}catch(e){}}t.finishInit=function(r){r.save=o,r.getTextArea=function(){return e},r.toTextArea=function(){r.toTextArea=isNaN,o(),e.parentNode.removeChild(r.getWrapperElement()),e.style.display="",e.form&&(he(e.form,"submit",o),t.leaveSubmitMethodAlone||"function"!=typeof e.form.submit||(e.form.submit=i))}},e.style.display="none";var s=ka((function(t){return e.parentNode.insertBefore(t,e.nextSibling)}),t);return s},function(e){e.off=he,e.on=pe,e.wheelEventPixels=xi,e.Doc=An,e.splitLines=Re,e.countColumn=U,e.findColumn=K,e.isWordChar=$,e.Pass=B,e.signal=ge,e.Line=qt,e.changeEnd=Ei,e.scrollbarModel=Wo,e.Pos=et,e.cmpPos=tt,e.modes=Ne,e.mimeModes=ze,e.resolveMode=Ue,e.getMode=De,e.modeExtensions=He,e.extendMode=Be,e.copyState=Ve,e.startState=je,e.innerMode=We,e.commands=$n,e.keyMap=Bn,e.keyName=Jn,e.isModifierKey=Kn,e.lookupKey=jn,e.normalizeKeyMap=Wn,e.StringStream=Ke,e.SharedTextMarker=En,e.TextMarker=Cn,e.LineWidget=_n,e.e_preventDefault=ve,e.e_stopPropagation=xe,e.e_stop=we,e.addClass=I,e.contains=R,e.rmClass=E,e.keyNames=Fn}(ka),ka.version="5.60.0",ka},(window||self).CodeMirror=Zi(),function(e){function t(t,r,i,n){if(i&&i.call){var a=i;i=null}else a=o(t,i,"rangeFinder");"number"==typeof r&&(r=e.Pos(r,0));var s=o(t,i,"minFoldSize");function l(e){var o=a(t,r);if(!o||o.to.line-o.from.line<s)return null;for(var i=t.findMarksAt(o.from),l=0;l<i.length;++l)if(i[l].__isFold&&"fold"!==n){if(!e)return null;o.cleared=!0,i[l].clear()}return o}var d=l(!0);if(o(t,i,"scanUp"))for(;!d&&r.line>t.firstLine();)r=e.Pos(r.line-1,0),d=l(!1);if(d&&!d.cleared&&"unfold"!==n){var c=function(e,t,r){var i=o(e,t,"widget");if("function"==typeof i&&(i=i(r.from,r.to)),"string"==typeof i){var n=document.createTextNode(i);(i=document.createElement("span")).appendChild(n),i.className="CodeMirror-foldmarker"}else i&&(i=i.cloneNode(!0));return i}(t,i,d);e.on(c,"mousedown",(function(t){p.clear(),e.e_preventDefault(t)}));var p=t.markText(d.from,d.to,{replacedWith:c,clearOnEnter:o(t,i,"clearOnEnter"),__isFold:!0});p.on("clear",(function(r,o){e.signal(t,"unfold",t,r,o)})),e.signal(t,"fold",t,d.from,d.to)}}e.newFoldFunction=function(e,r){return function(o,i){t(o,i,{rangeFinder:e,widget:r})}},e.defineExtension("foldCode",(function(e,r,o){t(this,e,r,o)})),e.defineExtension("isFolded",(function(e){for(var t=this.findMarksAt(e),r=0;r<t.length;++r)if(t[r].__isFold)return!0})),e.commands.toggleFold=function(e){e.foldCode(e.getCursor())},e.commands.fold=function(e){e.foldCode(e.getCursor(),null,"fold")},e.commands.unfold=function(e){e.foldCode(e.getCursor(),null,"unfold")},e.commands.foldAll=function(t){t.operation((function(){for(var r=t.firstLine(),o=t.lastLine();r<=o;r++)t.foldCode(e.Pos(r,0),null,"fold")}))},e.commands.unfoldAll=function(t){t.operation((function(){for(var r=t.firstLine(),o=t.lastLine();r<=o;r++)t.foldCode(e.Pos(r,0),null,"unfold")}))},e.registerHelper("fold","combine",(function(){var e=Array.prototype.slice.call(arguments,0);return function(t,r){for(var o=0;o<e.length;++o){var i=e[o](t,r);if(i)return i}}})),e.registerHelper("fold","auto",(function(e,t){for(var r=e.getHelpers(t,"fold"),o=0;o<r.length;o++){var i=r[o](e,t);if(i)return i}}));var r={rangeFinder:e.fold.auto,widget:"↔",minFoldSize:0,scanUp:!1,clearOnEnter:!0};function o(e,t,o){if(t&&void 0!==t[o])return t[o];var i=e.options.foldOptions;return i&&void 0!==i[o]?i[o]:r[o]}e.defineOption("foldOptions",null),e.defineExtension("foldOption",(function(e,t){return o(this,e,t)}))}(CodeMirror),Qi.prototype.start=function(e){return this.stream=e,this.line=0,this.string=e.string.slice(e.start),this.startLine=e.string,this.startPos=e.start,this},Qi.prototype.startLinebreak=function(){return this.stream=null,this.line=this.startPos=0,this.string="\n",this.startLine="",this},Qi.prototype.copy=function(){var e=this.copyInstance||(this.copyInstance=new Qi);return e.stream=this.stream,e.startPos=this.startPos,e.line=this.line,e.startLine=this.startLine,e.string=this.string,e},Qi.prototype.updateStart=function(){this.startLine=this.stream?0==this.line?this.stream.string:this.stream.lookAhead(this.line):"",this.startPos=this.startLine.length-(this.string.length-1)},Qi.prototype.ahead=function(e){for(;;){if(e<=this.string.length)return!0;if(10!==this.string.charCodeAt(this.string.length-1))this.string+="\n";else{if(3===this.line||!this.stream||!this.stream.lookAhead)return!1;var t=this.stream.lookAhead(this.line+1);if(null==t)return!1;this.string+=t+"\n",this.line++}}};var Yi=null;function Xi(e,t){this.State=function(e,t){function r(e,t){this.stack=e,this.context=t}function o(){return null}return r.prototype.matchNext=function(t,r,o,i){for(var n=this.stack.length-1,a=this.stack[n],s=e.nodes[a],l=0;l<s.length;l++){var d,c,p=s[l];if(0===p)d=r,c=s[++l];else{if(1===p||2===p){var u=s[++l],h=s[++l];this.go(h);var g=this.context;if(2===p){var m=s[++l];this.context=new Gi(m.name,m.token,this.stack.length,this.context,t.startLine,t.startPos)}this.stack.push(u);var f=this.matchNext(t,r,0,!1);if(f===r&&(f=this.matchNext(t,r,l==s.length-1?o:0,i)),f<0){this.stack.length=n+1,this.stack[n]=a,this.context=g;continue}return f}if(3===p){var y=s[++l];d=this.matchExpr(s[++l],t,r),c=s[++l],d>r&&(Yi=y)}else d=this.matchExpr(p,t,r),c=s[++l]}if(d<0){if(!(o>0&&l==s.length-1))continue;o--,d=r}if(this.go(c),!i&&-1===c||0===this.stack.length)return d;if(d>r)return d;if((d=this.matchNext(t,r,l==s.length-1?o:0,i))>=0)return d;this.stack.length=n+1,this.stack[n]=a}return-1},r.prototype.go=function(e){for(this.stack.pop();this.context&&this.context.depth>this.stack.length;)this.context=this.context.parent;-1!==e&&this.stack.push(e)},r.prototype.runMaybe=function(e,t,r){return Yi=null,this.matchNext(e,t,r,!0)},r.prototype.forward=function(t,r){var o=this.runMaybe(t,r,2);return o<0&&(this.stack.push(e.token),o=this.runMaybe(t,r,0)),o},r.prototype.lookahead=function(e,t,r){var o=Yi,i=new this.constructor([r],null);for(e=e.copy();;){e.updateStart();var n=i.runMaybe(e,t,0);if(n<0)return Yi=o,!1;if(0===i.stack.length)return Yi=o,!0;t=n}},r.prototype.matchExpr=function(e,r,i){if("string"==typeof e){var n=i+e.length;return r.ahead(n)&&r.string.slice(i,n)===e?n:-1}if(e.exec){var a=r.ahead(i+1)&&e.exec(i>0?r.string.slice(i):r.string);return a?i+a[0].length:-1}var s,l=e[0];if(0===l){for(var d=1;d<e.length;d++)if((i=this.matchExpr(e[d],r,i))<0)return-1;return i}if(1===l){d=1;for(var c=e.length-1;;d++){var p=this.matchExpr(e[d],r,i);if(d===c||p>-1)return p}return-1}if(2!==l&&3!==l){if(4===l)return Math.max(this.matchExpr(e[1],r,i),i);if(5===l)return this.lookahead(r,i,e[1])?i:-1;if(6===l)return this.lookahead(r,i,e[1])?-1:i;if(7===l){var u,h,g=i?r.string.lastIndexOf("\n",i-1):-1;if(r.stream&&g<0)u=r.stream.string,h=i+r.stream.start;else{var m=r.string.indexOf("\n",i);u=r.string.slice(g+1,m<0?r.string.length:m),h=i-(g+1)}return t.predicates[e[1]](u,h,this.context,r.stream?(s=r.stream,function(e){return s.lookAhead(e)}):o)?i:-1}throw Error("Unknown match type "+e)}if(3===l&&(i=this.matchExpr(e[1],r,i))<0)return-1;for(;;){var f=this.matchExpr(e[1],r,i);if(-1==f)return i;i=f}},r.prototype.contextAt=function(e,t){var r=this.copy(),o=new Qi,i=0,n=this.context;for(o.string=e+"\n",o.startLine=e;;){var a=r.runMaybe(o,i,0);if(-1==a)return r.context;if(a>t){var s=r.context;if(i==t)e:for(;s;){for(var l=n;l;l=l.parent)if(l===s)break e;s=s.parent}return s}i=a,n=r.context}},r.prototype.copy=function(){return new this.constructor(this.stack.slice(),this.context)},r.start=function(){return new this([e.start],null)},r}(e,t||{}),this.mcx=new Qi}CodeMirror.GrammarMode=Xi,Xi.prototype.startState=function(){return this.State.start()},Xi.prototype.copyState=function(e){return e.copy()},Xi.prototype.token=function(e,t){e.pos+=t.forward(this.mcx.start(e),0);for(var r=Yi,o=t.context;o;o=o.parent)o.tokenType&&(r=o.tokenType+(r?" "+r:""));return e.eol()&&t.forward(this.mcx,e.pos-e.start),r},Xi.prototype.blankLine=function(e){e.forward(this.mcx.startLinebreak(),0)},function(e){var t=[/^(?:var|let|const)(?![a-zA-Z¡-￿_0-9_\$])/,/^while(?![a-zA-Z¡-￿_0-9_\$])/,/^with(?![a-zA-Z¡-￿_0-9_\$])/,/^do(?![a-zA-Z¡-￿_0-9_\$])/,/^debugger(?![a-zA-Z¡-￿_0-9_\$])/,/^if(?![a-zA-Z¡-￿_0-9_\$])/,/^function(?![a-zA-Z¡-￿_0-9_\$])/,/^for(?![a-zA-Z¡-￿_0-9_\$])/,/^default(?![a-zA-Z¡-￿_0-9_\$])/,/^case(?![a-zA-Z¡-￿_0-9_\$])/,/^return(?![a-zA-Z¡-￿_0-9_\$])/,/^throw(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:break|continue)(?![a-zA-Z¡-￿_0-9_\$])/,/^switch(?![a-zA-Z¡-￿_0-9_\$])/,/^try(?![a-zA-Z¡-￿_0-9_\$])/,/^class(?![a-zA-Z¡-￿_0-9_\$])/,/^export(?![a-zA-Z¡-￿_0-9_\$])/,/^import(?![a-zA-Z¡-￿_0-9_\$])/,[0,"async",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,114]],[1,";",/^(?=\})/,[7,"canInsertSemi"]],/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*/,/^extends(?![a-zA-Z¡-￿_0-9_\$])/,/^from(?![a-zA-Z¡-￿_0-9_\$])/,/^else(?![a-zA-Z¡-￿_0-9_\$])/,/^catch(?![a-zA-Z¡-￿_0-9_\$])/,/^finally(?![a-zA-Z¡-￿_0-9_\$])/,/^as(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:true|false|null|undefined|NaN|Infinity)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:super|this)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:delete|typeof|yield|await|void)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.|\!|\+\+?|\-\-?)/,/^(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:[0-9][0-9_]*(?:\.[0-9_]*)?|\.[0-9_]+)(?:[eE][\+\-]?[0-9_]+)?)/,/^\/(?![\/\*])(?:\\.|\[(?:(?!\]).)*\]|(?!\/).)+\/[gimyus]*/,/^(?:\+\+|\-\-)/,/^(?:(?:\+|\-|\%|\*|\/(?![\/\*])|\>\>?\>?|\<\<?|\=\=?|\&\&?|\|\|?|\^|\!\=)\=?|\?\?)/,/^(?:in|instanceof)(?![a-zA-Z¡-￿_0-9_\$])/,/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\()/,/^(?:\.|\?\.)/,[1,"\n","\t"," "],/^new(?![a-zA-Z¡-￿_0-9_\$])/],r=Object.freeze({nodes:[[1,6,2],[/^[^]/,0],[1,6,3],[2,7,4,{name:"Statement"},0,1],[1,6,3],[3,"keyword",t[0],-1,3,"keyword",t[1],-1,3,"keyword",t[2],-1,3,"keyword",t[23],-1,3,"keyword",t[3],-1,3,"keyword",t[14],-1,3,"keyword",t[25],-1,3,"keyword",t[10],-1,3,"keyword",t[11],-1,3,"keyword",t[12],-1,3,"keyword",t[4],-1,3,"keyword",t[9],-1,3,"keyword",t[8],-1,3,"keyword",t[6],-1,3,"keyword",t[5],-1,3,"keyword",t[24],-1,3,"keyword",t[7],-1,3,"keyword",t[13],-1,3,"keyword",t[15],-1,3,"keyword",t[16],-1,3,"keyword",t[17],-1,3,"keyword",t[21],-1,3,"keyword",t[18],-1,3,"keyword",t[39],-1,3,"keyword",t[35],-1,3,"keyword",t[29],-1,3,"keyword",t[28],-1,3,"atom",t[27],-1,3,"variable",t[20],-1,3,"operator",t[30],-1,3,"operator",t[34],-1,3,"operator",t[33],-1,2,116,-1,{name:"string",token:"string"},3,"number",t[31],-1,2,121,-1,{name:"comment",token:"comment"},3,"string-2",t[32],-1,1,125,-1,/^[^]/,-1],[t[38],6,2,121,6,{name:"comment",token:"comment"},0,-1],[3,"keyword",t[0],8,3,"keyword",t[1],23,3,"keyword",t[2],23,3,"keyword",t[3],27,2,129,-1,{name:"Block"},";",-1,3,"keyword",t[4],-1,3,"keyword",t[5],35,3,"keyword",t[6],40,3,"keyword",t[7],46,3,"keyword",t[8],48,/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\:)/,48,3,"keyword",t[9],49,3,"keyword",t[10],52,3,"keyword",t[11],56,3,"keyword",t[12],60,3,"keyword",t[13],64,3,"keyword",t[14],68,3,"keyword",t[15],72,3,"keyword",t[16],80,3,"keyword",t[17],92,3,"keyword",t[18],108,"@",110,1,133,112],[1,6,9],[1,139,10],[1,6,11],[3,"operator","=",12,0,13],[1,6,14],[1,6,15],[1,142,13],[",",16,t[19],-1],[1,6,17],[1,139,18],[1,6,19],[3,"operator","=",20,0,21],[1,6,22],[1,6,15],[1,142,21],[1,6,24],[2,146,25,{name:"CondExpr"}],[1,6,26],[2,7,-1,{name:"Statement"}],[1,6,28],[2,7,29,{name:"Statement"}],[1,6,30],[3,"keyword",t[1],31,0,-1],[1,6,32],[2,146,33,{name:"CondExpr"}],[1,6,34],[t[19],-1],[1,6,36],[2,146,37,{name:"CondExpr"}],[1,6,38],[2,7,39,{name:"Statement"}],[2,151,-1,{name:"Alternative"}],[1,6,41],[3,"keyword","*",42,0,42],[1,6,43],[3,"def",t[20],44],[1,6,45],[2,155,-1,{name:"FunctionDef"}],[1,6,47],[2,158,-1,{name:"ForStatement"}],[1,6,50],[1,6,51],[":",-1],[1,133,48],[1,6,53],[t[19],-1,1,133,54],[1,6,55],[t[19],-1],[1,6,57],[1,133,58],[1,6,59],[t[19],-1],[1,6,61],[/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*)?/,62],[1,6,63],[t[19],-1],[1,6,65],[2,146,66,{name:"CondExpr"}],[1,6,67],[2,129,-1,{name:"Block"}],[1,6,69],[2,129,70,{name:"Block"}],[1,6,71],[2,161,-1,{name:"CatchFinally"}],[1,6,73],[3,"type def",t[20],74],[1,6,75],[3,"keyword",t[21],76,0,77],[1,6,78],[1,6,79],[1,133,77],[2,174,-1,{name:"ClassBody"}],[1,6,81],["*",82,3,"keyword",t[8],82,"{",83,2,7,-1,{name:"Statement"}],[1,6,84],[1,6,85],[3,"keyword",t[22],86,0,87],[1,182,88],[1,6,89],[1,6,90],[1,6,91],[2,116,87,{name:"string",token:"string"}],[t[19],-1],["}",82],[1,6,93],[2,116,94,{name:"string",token:"string"},3,"keyword","*",95,1,188,96,"{",97],[1,6,98],[1,6,99],[1,6,100],[1,6,101],[t[19],-1],[3,"keyword",t[26],102,0,96],[3,"keyword",t[22],103,0,94],[1,182,104],[1,6,105],[1,6,106],[1,6,107],[3,"def",t[20],96],[2,116,94,{name:"string",token:"string"}],["}",96],[1,6,109],[2,7,-1,{name:"Statement"}],[1,6,111],[1,133,-1],[1,6,113],[t[19],-1],[1,6,115],[3,"keyword",t[6],-1,/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*|\()/,-1],["'",117,'"',119],["\\",118,/^(?!\')./,117,"'",-1],[/^[^]/,117],["\\",120,/^(?!\")./,119,'"',-1],[/^[^]/,119],[/^\/\*\*(?!\/)/,122,"/*",124,/^\/\/.*/,-1],[1,193,122,0,123],[2,196,123,{name:"doccomment.tagGroup"},"*/",-1],[[0,/^(?!\*\/)/,/^[^]/],124,"*/",-1],[3,"string-2","`",126],[3,"string-2","${",127,2,198,126,{name:"str2",token:"string-2"},3,"string-2",/^(?:(?!\`|\$\{|\\).)+/,126,3,"string-2","`",-1],[1,133,128],[3,"string-2","}",126],["{",130],[1,6,131],[2,7,132,{name:"Statement"},"}",-1],[1,6,131],[1,200,134],[1,6,135],[",",136,1,218,137,0,-1],[1,6,138],[1,6,135],[1,142,137],[3,"operator","...",140,0,140],[1,6,141],[3,"def",t[20],-1,2,233,-1,{name:"ArrayPattern"},2,238,-1,{name:"ObjectPattern"}],[1,200,143],[1,6,144],[1,243,145,0,-1],[1,6,144],["(",147],[1,6,148],[1,133,149],[1,6,150],[")",-1],[1,6,152],[3,"keyword",t[23],153,0,-1],[1,6,154],[2,7,-1,{name:"Statement"}],[2,258,156,{name:"ParamList"}],[1,6,157],[2,129,-1,{name:"Block"}],[2,263,159,{name:"ForSpec"}],[1,6,160],[2,7,-1,{name:"Statement"}],[3,"keyword",t[24],162,0,170],[1,6,163],["(",164,0,165],[1,6,166],[1,6,167],[1,139,168],[2,129,170,{name:"Block"}],[1,6,169],[")",165],[1,6,171],[3,"keyword",t[25],172,0,-1],[1,6,173],[2,129,-1,{name:"Block"}],["{",175],[1,6,176],[3,"keyword",/^static(?![a-zA-Z¡-￿_0-9_\$])/,177,0,177,"@",178,"}",-1],[1,6,179],[1,6,180],[2,274,181,{name:"ObjectMember"}],[1,133,181],[1,6,176],[1,188,183,0,-1],[1,6,184],[",",185,0,-1],[1,6,186],[1,188,187,0,187],[1,6,184],[3,"variable",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= +as)/,189,3,"def",t[20],-1],[1,6,190],[3,"keyword",t[26],191],[1,6,192],[3,"def",t[20],-1],[0,194,2,289,-1,{name:"doccomment.braced"}],[[0,/^(?!\*\/|\@[a-zA-Z¡-￿_0-9]|\{)/,/^[^]/],195],[0,194,0,-1],[1,293,197],[1,193,197,0,-1],["\\",199,"\n",-1],[/^[^]/,-1],[3,"atom",t[27],-1,3,"keyword",t[28],-1,3,"keyword",t[29],201,3,"operator",t[30],201,3,"keyword",t[18],201,2,299,-1,{name:"NewExpression"},3,"keyword",t[6],203,3,"keyword",t[15],209,2,309,-1,{name:"ArrowFunc"},3,"variable callee",t[36],-1,3,"variable",t[20],-1,3,"number",t[31],-1,2,116,-1,{name:"string",token:"string"},3,"string-2",t[32],-1,1,125,-1,2,313,-1,{name:"ArrayLiteral"},2,318,-1,{name:"ObjectLiteral"},2,323,-1,{name:"ParenExpr"}],[1,6,202],[1,200,-1],[1,6,204],[3,"keyword","*",205,0,205],[1,6,206],[3,"def",t[20],207,0,207],[1,6,208],[2,155,-1,{name:"FunctionDef"}],[1,6,210],[[6,328],211,0,212],[3,"type def",t[20],212],[1,6,213],[3,"keyword",t[21],214,0,215],[1,6,216],[1,6,217],[1,133,215],[2,174,-1,{name:"ClassBody"}],[3,"operator",t[33],-1,3,"operator",t[34],219,3,"keyword",t[35],219,2,329,-1,{name:"ArgList"},1,125,-1,t[37],221,"[",223,3,"operator","?",227],[1,6,220],[1,133,-1],[1,6,222],[3,"property callee",t[36],-1,3,"property",t[20],-1],[1,6,224],[1,133,225],[1,6,226],["]",-1],[1,6,228],[1,133,229],[1,6,230],[3,"operator",":",231],[1,6,232],[1,133,-1],["[",234],[1,6,235],[1,334,236],[1,6,237],["]",-1],["{",239],[1,6,240],[1,340,241],[1,6,242],["}",-1],[3,"operator",t[33],-1,3,"operator",t[34],244,3,"keyword",t[35],244,2,329,-1,{name:"ArgList"},1,125,-1,t[37],246,"[",248,3,"operator","?",252],[1,6,245],[1,142,-1],[1,6,247],[3,"property callee",t[36],-1,3,"property",t[20],-1],[1,6,249],[1,133,250],[1,6,251],["]",-1],[1,6,253],[1,133,254],[1,6,255],[3,"operator",":",256],[1,6,257],[1,142,-1],["(",259],[1,6,260],[1,346,261],[1,6,262],[")",-1],["(",264],[1,6,265],[2,352,266,{name:"StatementMaybeOf"}],[1,6,267],[1,133,268,0,268,0,272],[1,6,269],[";",270],[1,6,271],[1,133,272,0,272],[1,6,273],[")",-1],[3,"keyword",/^(?:get|set|async)(?![a-zA-Z¡-￿_0-9_\$])(?! *[\,\}\:\(])/,275,0,275],[1,6,276],[3,"keyword","*",277,0,277],[1,6,278],[3,"def property",t[20],279,"[",280,3,"number",t[31],279,2,116,279,{name:"string",token:"string"},3,"operator","...",281],[1,6,282],[1,6,283],[1,6,284],[2,155,-1,{name:"FunctionDef"},":",285,0,-1],[1,133,286],[1,142,-1],[1,6,287],[1,6,288],[1,142,-1],["]",279],["{",290],[1,293,291,1,193,292],[[0,/^(?!\}|\*\/)/,/^[^]/],291,0,292],[/^(?:\}|(?=\*\/))/,-1],[3,"tag",/^\@(?:member|param|arg(?:ument)?|module|namespace|typedef)(?![a-zA-Z¡-￿_0-9])/,294,3,"tag",/^\@[a-zA-Z¡-￿_0-9]+/,-1],[t[38],294,"{",295,0,296,0,-1],[2,357,297,{name:"doccomment.type"}],[3,"def",/^[a-zA-Z¡-￿_0-9]+/,-1,0,-1],["}",298],[[1,"\n","\t"," ",/^\*(?!\/)/],298,0,296],[3,"keyword",t[39],300],[1,6,301],[".",302,1,200,303],[1,6,304],[1,6,305],[3,"keyword",/^target(?![a-zA-Z¡-￿_0-9_\$])/,-1],[2,329,306,{name:"ArgList"},".",307,0,-1],[1,6,305],[1,6,308],[3,"property callee",t[36],306,3,"property",t[20],306],[3,"def",[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,361]],311,[5,363],310],[2,258,311,{name:"ParamList"}],[1,6,312],[2,366,-1,{name:"ArrowRest"}],["[",314],[1,6,315],[1,369,316],[1,6,317],["]",-1],["{",319],[1,6,320],[1,375,321],[1,6,322],["}",-1],["(",324],[1,6,325],[1,133,326],[1,6,327],[")",-1],[3,"keyword",t[21],-1],["(",330],[1,6,331],[1,369,332],[1,6,333],[")",-1],[1,381,335,0,335,0,-1],[1,6,336],[",",337,0,-1],[1,6,338],[1,381,339,0,339,0,339],[1,6,336],[1,386,341,0,-1],[1,6,342],[",",343,0,-1],[1,6,344],[1,386,345,0,345],[1,6,342],[1,381,347,0,-1],[1,6,348],[",",349,0,-1],[1,6,350],[1,381,351,0,351],[1,6,348],[2,7,353,{name:"Statement"}],[1,6,354],[3,"keyword",/^of(?![a-zA-Z¡-￿_0-9_\$])/,355,0,-1],[1,6,356],[1,133,-1],[3,"type","{",358,3,"type",/^(?:(?!\{|\}|\*\/).)+/,357,"\n",359,0,-1],[2,357,360,{name:"doccomment.type"}],[/^[\t ]*(?:\*(?!\/)[\t ]*)?/,357],[/^(?=\*\/)/,357,3,"type","}",357],[1,6,362],["=>",-1],[2,258,364,{name:"ParamList"}],[1,6,365],["=>",-1],[3,"operator","=>",367],[1,6,368],[2,129,-1,{name:"Block"},1,142,-1],[1,142,370,0,-1],[1,6,371],[",",372,0,-1],[1,6,373],[1,142,374,0,374],[1,6,371],[2,274,376,{name:"ObjectMember"},0,-1],[1,6,377],[",",378,0,-1],[1,6,379],[2,274,380,{name:"ObjectMember"},0,380],[1,6,377],[1,139,382],[1,6,383],[3,"operator","=",384,0,-1],[1,6,385],[1,142,-1],[3,"def",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?![a-z]|[A-Z]|[¡-￿]|_|[0-9]|_|\$| *\:)/,387,3,"property",t[20],391,3,"number",t[31],391,2,116,391,{name:"string",token:"string"},3,"operator","...",395],[1,6,388],[3,"operator","=",389,0,-1],[1,6,390],[1,142,-1],[1,6,392],[":",393],[1,6,394],[1,381,-1],[1,6,396],[1,381,-1]],start:0,token:5}),o=/(^|\s)variable($|\s)/;function i(e){var t=/^(if|for|do|while|try)\b/.exec(e.startLine.slice(e.startPos));return t&&t[1]}var n={Block:"}",BlockOf:"}",ClassBody:"}",AnnotationTypeBody:"}",ObjectLiteral:"}",ObjectPattern:"}",EnumBody:"}",LambdaBlock:"}",WhenBody:"}",ObjType:"}",ArrayInitializer:"}",NamespaceBlock:"}",BraceTokens:"}",ArrayLiteral:"]",BracketTokens:"]",TupleType:"]",ParamList:")",SimpleParamList:")",ArgList:")",ParenExpr:")",CondExpr:")",ForSpec:")",ParenTokens:")",ParenthesizedExpression:")",ConstructorParamList:")",TypeParams:">",TypeArgs:">",TemplateArgs:">",TemplateParams:">"},a=["Block","NamespaceBlock","ClassBody","AnnotationTypeBody","BlockOf","EnumBody"],s=["Statement","ObjectMember","ClassItem","EnumConstant","AnnotationTypeItem","ArgExpr","StatementMaybeOf","NewExpr"];function l(t,r){for(var o=t.startLine;;t=t.parent){if("CondExpr"==t.name)return e.countColumn(t.startLine,t.startPos+1,r.tabSize);if(s.indexOf(t.name)>-1&&/(^\s*|[\(\{\[])$/.test(t.startLine.slice(0,t.startPos)))return e.countColumn(t.startLine,t.startPos,r.tabSize);if(!t.parent||t.parent.startLine!=o)return e.countColumn(t.startLine,null,r.tabSize)}}function d(t,r,o){if(!t)return 0;if("string"==t.name||"comment"==t.name)return e.Pass;var p,u,h=n[t.name],g=r&&r.charAt(0)==h;if(h&&!1!==o.align&&(!o.dontAlign||o.dontAlign.indexOf(t.name)<0)&&function(e){return!/^\s*((\/\/.*)?$|.*=>)/.test(e.startLine.slice(e.startPos+1))}(t))return e.countColumn(t.startLine,t.startPos,o.tabSize)+(g?0:1);if(h&&a.indexOf(t.name)>-1){var m=t.parent;m&&"Statement"==m.name&&m.parent&&"Statement"==m.parent.name&&i(m.parent)&&!i(m)&&(m=m.parent);var f=c(m,o);return g||"NamespaceBlock"==t.name?f:/^(public|private|protected)\s*:/.test(r)?f+1:!(u=t.parent)||"Statement"!=u.name||!/^switch\b/.test(u.startLine.slice(u.startPos))||(p=r)&&/^\s*(case|default)\b/.test(p)?f+o.indentUnit:f+2*o.indentUnit}var y=l(t,o.tabSize);return h?g&&(o.dontCloseBrackets||"").indexOf(h)<0?y:y+o.indentUnit*((o.doubleIndentBrackets||"").indexOf(h)<0?1:2):s.indexOf(t.name)>-1?i(t)?y+o.indentUnit:y+2*o.indentUnit:"Alternative"==t.name||"CatchFinally"==t.name?(y=l(t.parent,o.tabSize),!r||/^((else|catch|finally)\b|\/[\/\*])/.test(r)?y:y+o.indentUnit):"ArrowRest"==t.name?y+o.indentUnit:"NewExpression"==t.name&&t.startLine.length>t.startPos+5?e.countColumn(t.startLine,t.startPos,o.tabSize)+2*o.indentUnit:"InitializerList"==t.name?y+2:"ThrowsClause"!=t.name||/throws\s*$/.test(t.startLine.slice(t.startPos))?d(t.parent,r,o):y+2*o.indentUnit}function c(t,r){for(;;t=t.parent){if(!t)return 0;if(s.indexOf(t.name)>-1||t.parent&&n[t.parent.name])return e.countColumn(t.startLine,null,r.tabSize)}}function p(t,r,o,i){var n=t.context&&t.context.name;if("DeclType"==n||"BeforeStatement"==n||"AnnotationHead"==n||"Template"==n||"str"==n)return c(t.context,i);if(("doccomment.braced"==n||"doccomment.tagGroup"==n)&&!/^[@*]/.test(r))return e.countColumn(t.context.startLine,null,i.tabSize)+2*i.indentUnit;var a=i.forceContent&&/^\s*(\/\/.*)?$/.test(o)?"x":o;return d(t.contextAt(a,o.length-r.length),r,i)}function u(e,t){for(var r=t-1;r>=0;r--){var o=e.charCodeAt(r);if(10===o)break;if(32!==o&&9!==o)return!1}return!0}var h=function(e){this.config=e};h.prototype.startState=function(){return new g},h.prototype.copyState=function(e){return e.copy()},h.prototype.shouldInterceptTokenizing=function(e){var t=e.currentTemplateState;return void 0!==t&&null!==t.mode},h.prototype.interceptTokenizing=function(e,t){if(e.match("${")&&(e.backUp(2),!this.isEscaped(e,e.pos-2)))return{handled:!1};if("`"===e.peek()&&!this.isEscaped(e,e.pos))return{handled:!1};var r=t.currentTemplateState,o=r.mode,i=r.state,n=o.token(e,i);return this.backupIfEmbeddedTokenizerOvershot(e),{handled:!0,style:n}},h.prototype.trackState=function(e,t,r){if(e){var o=r.currentTemplateState;o&&"inline-expression"!==o.kind?this.trackStateInTemplate(e,t,r,o):this.trackStateNotInTemplate(e,t,r,o),r.previousVariable="variable"===e?t.current():null}},h.prototype.trackStateNotInTemplate=function(e,t,r,o){if(o&&"string-2"===e&&t.current().startsWith("}"))return r.templateStack.pop(),void t.backUp(t.current().length-1);if("string-2"===e&&t.current().startsWith("`")){var i=this.getModeForTemplateTag(r.previousVariable),n="template";i?(t.backUp(t.current().length-1),r.templateStack.push(new f(n,i,CodeMirror.startState(i)))):r.templateStack.push(new f(n,null,null))}},h.prototype.trackStateInTemplate=function(e,t,r,o){"string-2"!==e||!t.current().endsWith("`")||this.isEscaped(t.pos-1)?"string-2"!==e||!t.current().endsWith("${")||this.isEscaped(t.pos-2)||r.templateStack.push(new f("inline-expression",null,null)):r.templateStack.pop()},h.prototype.backupIfEmbeddedTokenizerOvershot=function(e){for(var t=e.current(),r=0;;){var o=t.slice(r).search(/`|\$\{/);if(-1===o)return;o+=r;var i=t.length-o,n=e.pos-i;if(!this.isEscaped(e,n))return void e.backUp(t.length-o);r=o+1}},h.prototype.isEscaped=function(e,t){for(var r=!1,o=t;o>0&&"\\"===e.string[o-1];)r=!r,o--;return r},h.prototype.getModeForTemplateTag=function(e){if(!e)return null;"htm"===e&&(e="html");for(var t=["google-"+e,""+e],r=0;r<t.length;r++){var o=CodeMirror.getMode(this.config,t[r]);if(o&&"null"!==o.name)return o}return null};var g=function(e,t){void 0===e&&(e=[]),void 0===t&&(t=null),this.templateStack=e,this.previousVariable=t},m={currentTemplateState:{configurable:!0}};g.prototype.copy=function(){return new g(this.templateStack.map((function(e){return e.copy()})),this.previousVariable)},m.currentTemplateState.get=function(){return this.templateStack[this.templateStack.length-1]},Object.defineProperties(g.prototype,m);var f=function(e,t,r){this.kind=e,this.mode=t,this.state=r};f.prototype.copy=function(){return this.mode?new f(this.kind,this.mode,CodeMirror.copyState(this.mode,this.state)):new f(this.kind,null,null)};var y=["Block","FunctionDef","ArrowFunc","ForStatement"],b=function(e){function t(t,o){e.call(this,r,{predicates:{canInsertSemi:!1===o.requireSemicolons?u:function(){return!1}}}),this.embeddedParser=new h(t),this.indentConf={doubleIndentBrackets:">)",dontCloseBrackets:")",tabSize:t.tabSize,indentUnit:t.indentUnit,forceContent:!0}}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.startState=function(){var t=e.prototype.startState.call(this);return t.embeddedParserState=this.embeddedParser.startState(),t},t.prototype.copyState=function(t){var r=e.prototype.copyState.call(this,t);return r.embeddedParserState=this.embeddedParser.copyState(t.embeddedParserState),r},t.prototype.token=function(t,r){var i=r.embeddedParserState;if(this.embeddedParser.shouldInterceptTokenizing(i)){var n=this.embeddedParser.interceptTokenizing(t,i),a=n.handled,s=n.style;if(a)return s}var l=e.prototype.token.call(this,t,r);return this.embeddedParser.trackState(l,t,i),function(e,t,r,i){if("def"==e){var n=function(e,t){for(var r=e;r;r=r.parent)if(t.indexOf(r.name)>-1)return r}(i.context,t),a=r.current();if(n&&(n.locals||(n.locals=[]),-1==n.locals.indexOf(a)&&n.locals.push(a),"funcName"!=i.context.name))return"def local"}else o.test(e)&&!/qualified/.test(e)&&function(e,t){for(var r=e;r;r=r.parent)if(r.locals&&r.locals.indexOf(t)>-1)return!0;return!1}(i.context,r.current())&&(e=e.replace(o,"$1variable-2$2"));return e}(l,y,t,r)},t.prototype.indent=function(e,t,r){return t||(t=r="x"),p(e,t,r,this.indentConf)},t}(e.GrammarMode),v={electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``"};for(var x in v)b.prototype[x]=v[x];e.registerHelper("wordChars","google-javascript",/[\w$]/),e.defineMode("google-javascript",(function(e,t){return new b(e,t)}))}(window.CodeMirror),function(e){var t=[/^(?:var|let|const)(?![a-zA-Z¡-￿_0-9_\$])/,/^while(?![a-zA-Z¡-￿_0-9_\$])/,/^with(?![a-zA-Z¡-￿_0-9_\$])/,/^do(?![a-zA-Z¡-￿_0-9_\$])/,/^debugger(?![a-zA-Z¡-￿_0-9_\$])/,/^if(?![a-zA-Z¡-￿_0-9_\$])/,/^function(?![a-zA-Z¡-￿_0-9_\$])/,/^for(?![a-zA-Z¡-￿_0-9_\$])/,/^default(?![a-zA-Z¡-￿_0-9_\$])/,/^case(?![a-zA-Z¡-￿_0-9_\$])/,/^return(?![a-zA-Z¡-￿_0-9_\$])/,/^throw(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:break|continue)(?![a-zA-Z¡-￿_0-9_\$])/,/^switch(?![a-zA-Z¡-￿_0-9_\$])/,/^try(?![a-zA-Z¡-￿_0-9_\$])/,/^class(?![a-zA-Z¡-￿_0-9_\$])/,/^export(?![a-zA-Z¡-￿_0-9_\$])/,/^import(?![a-zA-Z¡-￿_0-9_\$])/,[0,"async",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,139]],/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*/,/^extends(?![a-zA-Z¡-￿_0-9_\$])/,/^enum(?![a-zA-Z¡-￿_0-9_\$])/,[1,";",/^(?=\})/,[7,"canInsertSemi"]],/^from(?![a-zA-Z¡-￿_0-9_\$])/,[1,"\n","\t"," "],/^[a-zA-Z¡-￿__\$]/,/^const(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:true|false|null|undefined|NaN|Infinity)(?![a-zA-Z¡-￿_0-9_\$])/,/^new(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:[0-9][0-9_]*(?:\.[0-9_]*)?|\.[0-9_]+)(?:[eE][\+\-]?[0-9_]+)?)/,/^else(?![a-zA-Z¡-￿_0-9_\$])/,/^catch(?![a-zA-Z¡-￿_0-9_\$])/,/^finally(?![a-zA-Z¡-￿_0-9_\$])/,/^as(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:super|this)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:delete|typeof|yield|await|void)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.|\!|\+\+?|\-\-?)/,/^\/(?![\/\*])(?:\\.|\[(?:(?!\]).)*\]|(?!\/).)+\/[gimyus]*/,[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,508]],/^(?:\+\+|\-\-)/,/^(?:(?:\+|\-|\%|\*|\/(?![\/\*])|\>\>?\>?|\<\<?|\=\=?|\&\&?|\|\|?|\^|\!\=)\=?|\?\?)/,/^(?:in|instanceof)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:public|private|protected|readonly|abstract|static)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.|\?\.)/,[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,533]],/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\:)/,/^is(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.)?/,/^(?:get|set|async)(?![a-zA-Z¡-￿_0-9_\$])(?! *[\,\}\:\(\<])/],r=Object.freeze({nodes:[[1,6,2],[/^[^]/,0],[1,6,3],[2,7,4,{name:"Statement"},0,1],[1,6,3],[3,"keyword",t[0],-1,3,"keyword",t[1],-1,3,"keyword",t[2],-1,3,"keyword",t[30],-1,3,"keyword",t[3],-1,3,"keyword",t[14],-1,3,"keyword",t[32],-1,3,"keyword",t[10],-1,3,"keyword",t[11],-1,3,"keyword",t[12],-1,3,"keyword",t[4],-1,3,"keyword",t[9],-1,3,"keyword",t[8],-1,3,"keyword",t[6],-1,3,"keyword",t[5],-1,3,"keyword",t[31],-1,3,"keyword",t[7],-1,3,"keyword",t[13],-1,3,"keyword",t[15],-1,3,"keyword",t[16],-1,3,"keyword",t[17],-1,3,"keyword",t[20],-1,3,"keyword",t[18],-1,3,"keyword",t[28],-1,3,"keyword",t[41],-1,3,"keyword",t[35],-1,3,"keyword",t[34],-1,3,"atom",t[27],-1,3,"variable",t[19],-1,3,"operator",t[36],-1,3,"operator",t[40],-1,3,"operator",t[39],-1,2,141,-1,{name:"string",token:"string"},3,"number",t[29],-1,2,146,-1,{name:"comment",token:"comment"},3,"string-2",t[37],-1,1,150,-1,/^[^]/,-1],[t[24],6,2,146,6,{name:"comment",token:"comment"},0,-1],[3,"keyword",[0,"type",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,154]],8,3,"keyword",[0,"namespace",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,155]],18,3,"keyword",[0,"interface",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,156]],26,[5,157],36,3,"keyword",t[21],37,3,"keyword",[0,"declare",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,160]],43,3,"keyword",/^abstract(?![a-zA-Z¡-￿_0-9_\$])/,43,3,"keyword",t[0],45,3,"keyword",t[1],52,3,"keyword",t[2],52,3,"keyword",t[3],56,2,161,-1,{name:"Block"},";",-1,3,"keyword",t[4],-1,3,"keyword",t[5],64,3,"keyword",t[6],69,3,"keyword",t[7],75,3,"keyword",t[8],77,t[45],77,3,"keyword",t[9],78,3,"keyword",t[10],81,3,"keyword",t[11],85,3,"keyword",t[12],89,3,"keyword",t[13],93,3,"keyword",t[14],97,3,"keyword",t[15],101,3,"keyword",t[16],105,3,"keyword",t[17],117,3,"keyword",t[18],133,"@",135,1,165,137],[1,6,9],[3,"def type",t[19],10],[1,6,11],[2,171,12,{name:"TypeParams"},0,12],[1,6,13],[3,"operator","=",14],[1,6,15],[1,176,16],[1,6,17],[t[22],-1],[1,6,19],[[5,224],20,3,"def",t[19],21],[3,"variable",t[19],22],[1,6,23],[1,6,24],[2,161,-1,{name:"Block"}],[".",25],[1,6,19],[1,6,27],[3,"def type",t[19],28],[1,6,29],[2,171,30,{name:"TypeParams"},0,30],[1,6,31],[3,"keyword",t[20],32,0,33],[1,6,34],[1,6,35],[1,227,33],[2,233,-1,{name:"ObjType"}],[3,"keyword",t[26],38],[1,6,39],[1,6,40],[3,"def type",t[19],41],[3,"keyword",t[21],37],[1,6,42],[2,241,-1,{name:"EnumBody"}],[1,6,44],[2,7,-1,{name:"Statement"}],[1,6,46],[1,246,47],[1,6,48],[",",49,t[22],-1],[1,6,50],[1,246,51],[1,6,48],[1,6,53],[2,257,54,{name:"CondExpr"}],[1,6,55],[2,7,-1,{name:"Statement"}],[1,6,57],[2,7,58,{name:"Statement"}],[1,6,59],[3,"keyword",t[1],60,0,-1],[1,6,61],[2,257,62,{name:"CondExpr"}],[1,6,63],[t[22],-1],[1,6,65],[2,257,66,{name:"CondExpr"}],[1,6,67],[2,7,68,{name:"Statement"}],[2,262,-1,{name:"Alternative"}],[1,6,70],[3,"keyword","*",71,0,71],[1,6,72],[3,"def",t[19],73],[1,6,74],[2,266,-1,{name:"FunctionDef"}],[1,6,76],[2,275,-1,{name:"ForStatement"}],[1,6,79],[1,6,80],[":",-1],[1,165,77],[1,6,82],[t[22],-1,1,165,83],[1,6,84],[t[22],-1],[1,6,86],[1,165,87],[1,6,88],[t[22],-1],[1,6,90],[/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*)?/,91],[1,6,92],[t[22],-1],[1,6,94],[2,257,95,{name:"CondExpr"}],[1,6,96],[2,161,-1,{name:"Block"}],[1,6,98],[2,161,99,{name:"Block"}],[1,6,100],[2,278,-1,{name:"CatchFinally"}],[1,6,102],[3,"def type",t[19],103],[1,6,104],[1,291,-1],[1,6,106],["*",107,3,"keyword",t[8],107,"{",108,2,7,-1,{name:"Statement"}],[1,6,109],[1,6,110],[3,"keyword",t[23],111,0,112],[1,302,113],[1,6,114],[1,6,115],[1,6,116],[2,141,112,{name:"string",token:"string"}],[t[22],-1],["}",107],[1,6,118],[2,141,119,{name:"string",token:"string"},3,"keyword","*",120,1,308,121,"{",122],[1,6,123],[1,6,124],[1,6,125],[1,6,126],[t[22],-1],[3,"keyword",t[33],127,0,121],[3,"keyword",t[23],128,0,119],[1,302,129],[1,6,130],[1,6,131],[1,6,132],[3,"def",t[19],121],[2,141,119,{name:"string",token:"string"}],["}",121],[1,6,134],[2,7,-1,{name:"Statement"}],[1,6,136],[1,165,-1],[1,6,138],[t[22],-1],[1,6,140],[3,"keyword",t[6],-1,/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*|\()/,-1],["'",142,'"',144],["\\",143,/^(?!\')./,142,"'",-1],[/^[^]/,142],["\\",145,/^(?!\")./,144,'"',-1],[/^[^]/,144],[/^\/\*\*(?!\/)/,147,"/*",149,/^\/\/.*/,-1],[1,313,147,0,148],[2,316,148,{name:"doccomment.tagGroup"},"*/",-1],[[0,/^(?!\*\/)/,/^[^]/],149,"*/",-1],[3,"string-2","`",151],[3,"string-2","${",152,2,318,151,{name:"str2",token:"string-2"},3,"string-2",/^(?:(?!\`|\$\{|\\).)+/,151,3,"string-2","`",-1],[1,165,153],[3,"string-2","}",151],[t[24],154,t[25],-1],[t[24],155,t[25],-1],[t[24],156,t[25],-1],[3,"keyword",t[26],158],[1,6,159],[3,"keyword",t[21],-1],[t[24],160,t[25],-1],["{",162],[1,6,163],[2,7,164,{name:"Statement"},"}",-1],[1,6,163],[1,320,166],[1,6,167],[",",168,1,348,169,0,-1],[1,6,170],[1,6,167],[1,367,169],["<",172],[1,6,173],[1,371,174],[1,6,175],[">",-1],[3,"keyword",/^this(?![a-zA-Z¡-￿_0-9_\$])/,209,3,"atom",t[27],209,3,"keyword",/^typeof(?![a-zA-Z¡-￿_0-9_\$])/,177,3,"keyword",/^(?:keyof|readonly|unique)(?![a-zA-Z¡-￿_0-9_\$])/,178,[0,[5,393],"("],179,3,"keyword",t[28],180,0,180,0,181,2,396,209,{name:"TupleType"},2,233,209,{name:"ObjType"},2,141,209,{name:"string",token:"string"},3,"number",t[29],209],[1,6,182],[1,6,183],[1,6,184],[1,6,185],[[5,401],186,3,"type",t[19],187],[3,"variable",t[19],188],[1,176,209],[1,176,189],[2,171,190,{name:"TypeParams"},0,190],[3,"variable",t[19],191],[1,6,192],[1,6,193],[1,6,194],[1,6,195],[1,6,196],[2,404,209,{name:"TypeArgs"},0,209],[".",197,"[",198,0,209],[")",209],[2,409,199,{name:"ParamListSpec"}],[".",200],[1,6,201],[1,6,202],[1,6,203],[1,6,181],[3,"property",t[19],204],[1,165,205],[3,"operator","=>",206],[1,6,193],[1,6,207],[1,6,208],["]",204],[1,410,209],[1,6,210],[3,"operator",/^[\&\|]/,211,3,"keyword",t[20],211,"[",212,3,"operator","?",213,0,-1],[1,6,214],[1,6,215],[1,6,216],[1,176,217],[1,176,218,0,218],[1,176,219],[1,6,210],[1,6,220],[1,6,221],["]",217],[3,"operator",":",222],[1,6,223],[1,176,217],[t[19],225],[1,6,226],[".",-1],[1,176,228,0,-1],[1,6,229],[",",230,0,-1],[1,6,231],[1,176,232,0,232],[1,6,229],["{",234],[1,6,235],[1,416,236,0,236],[1,6,237],[/^[\,\;]/,238,"}",-1],[1,6,239],[1,416,240,0,240],[1,6,237],["{",242],[1,6,243],[1,449,244],[1,6,245],["}",-1],[1,463,247],[1,6,248],[3,"operator","!",249,0,249],[1,6,250],[":",251,0,253],[1,6,252],[1,176,253],[1,6,254],[3,"operator","=",255,0,-1],[1,6,256],[1,367,-1],["(",258],[1,6,259],[1,165,260],[1,6,261],[")",-1],[1,6,263],[3,"keyword",t[30],264,0,-1],[1,6,265],[2,7,-1,{name:"Statement"}],[2,171,267,{name:"TypeParams"},0,267],[1,6,268],[2,466,269,{name:"ParamList"}],[1,6,270],[":",271,0,273],[1,6,272],[1,410,273],[1,6,274],[2,161,-1,{name:"Block"},t[22],-1],[2,471,276,{name:"ForSpec"}],[1,6,277],[2,7,-1,{name:"Statement"}],[3,"keyword",t[31],279,0,287],[1,6,280],["(",281,0,282],[1,6,283],[1,6,284],[1,463,285],[2,161,287,{name:"Block"}],[1,6,286],[")",282],[1,6,288],[3,"keyword",t[32],289,0,-1],[1,6,290],[2,161,-1,{name:"Block"}],[2,171,292,{name:"TypeParams"},0,292],[1,6,293],[3,"keyword",t[20],294,0,296],[1,6,295],[1,176,296],[1,6,297],[3,"keyword",/^implements(?![a-zA-Z¡-￿_0-9_\$])/,298,0,300],[1,6,299],[1,227,300],[1,6,301],[2,482,-1,{name:"ClassBody"}],[1,308,303,0,-1],[1,6,304],[",",305,0,-1],[1,6,306],[1,308,307,0,307],[1,6,304],[3,"variable",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= +as)/,309,3,"def",t[19],-1],[1,6,310],[3,"keyword",t[33],311],[1,6,312],[3,"def",t[19],-1],[0,314,2,490,-1,{name:"doccomment.braced"}],[[0,/^(?!\*\/|\@[a-zA-Z¡-￿_0-9]|\{)/,/^[^]/],315],[0,314,0,-1],[1,494,317],[1,313,317,0,-1],["\\",319,"\n",-1],[/^[^]/,-1],["<",321,3,"atom",t[27],-1,3,"keyword",t[34],-1,3,"keyword",t[35],327,3,"operator",t[36],327,3,"keyword",t[18],327,3,"keyword",t[28],329,3,"keyword",t[6],335,3,"keyword",t[15],341,2,500,-1,{name:"ArrowFunc"},3,"variable callee",t[38],346,3,"variable",t[19],-1,3,"number",t[29],-1,2,141,-1,{name:"string",token:"string"},3,"string-2",t[37],-1,1,150,-1,2,512,-1,{name:"ArrayLiteral"},2,517,-1,{name:"ObjectLiteral"},2,522,-1,{name:"ParenExpr"}],[1,6,322],[1,176,323],[1,6,324],[">",325],[1,6,326],[1,320,-1],[1,6,328],[1,320,-1],[1,6,330],[".",331,3,"variable callee",t[38],332,1,320,-1],[1,6,333],[1,6,334],[3,"keyword",/^target(?![a-zA-Z¡-￿_0-9_\$])/,-1],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,336],[3,"keyword","*",337,0,337],[1,6,338],[3,"def",t[19],339,0,339],[1,6,340],[2,266,-1,{name:"FunctionDef"}],[1,6,342],[[6,527],343,0,344],[3,"def type",t[19],344],[1,6,345],[1,291,-1],[1,6,347],[2,404,-1,{name:"TypeArgs"},0,-1],[3,"keyword",t[33],349,3,"operator","!",-1,3,"operator",t[39],-1,3,"operator",t[40],351,3,"keyword",t[41],351,2,528,-1,{name:"ArgList"},1,150,-1,t[43],353,"[",357,3,"operator","?",361],[1,6,350],[1,176,-1],[1,6,352],[1,165,-1],[1,6,354],[3,"property callee",t[44],355,3,"property",t[19],-1],[1,6,356],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,358],[1,165,359],[1,6,360],["]",-1],[1,6,362],[1,165,363],[1,6,364],[3,"operator",":",365],[1,6,366],[1,165,-1],[1,320,368],[1,6,369],[1,537,370,0,-1],[1,6,369],[3,"def type",t[19],372,0,-1],[1,6,373],[3,"keyword",t[20],374,0,375],[1,6,376],[1,6,377],[1,176,375],[3,"operator","=",378,0,379],[1,6,380],[1,6,381],[1,176,379],[",",382,0,-1],[1,6,383],[3,"def type",t[19],384,0,385],[1,6,386],[1,6,381],[3,"keyword",t[20],387,0,388],[1,6,389],[1,6,390],[1,176,388],[3,"operator","=",391,0,385],[1,6,392],[1,176,385],["(",394],[1,6,395],[[6,556],-1],["[",397],[1,6,398],[1,559,399],[1,6,400],["]",-1],[t[19],402],[1,6,403],[".",-1],["<",405],[1,6,406],[1,227,407],[1,6,408],[">",-1],[2,466,-1,{name:"ParamList"}],[[5,573],411,0,414],[3,"variable",t[19],412],[1,6,413],[3,"keyword",t[46],414],[1,6,415],[1,176,-1],[3,"keyword",t[28],417,0,417,0,425],[1,6,418],[2,171,419,{name:"TypeParams"},0,419],[1,6,420],[2,466,421,{name:"ParamList"}],[1,6,422],[":",423,0,-1],[1,6,424],[1,410,-1],[3,"keyword",t[42],426,"[",427,3,"def property",t[19],428,2,141,428,{name:"string",token:"string"},3,"number",t[29],428],[1,6,425],[1,6,429],[1,6,430],[[0,[5,576],/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/],431,1,165,432],[/^\??/,433],[1,6,434],[1,6,435],[1,6,436],[":",437,3,"keyword",/^in(?![a-zA-Z¡-￿_0-9_\$])/,437],["]",438],[2,171,439,{name:"TypeParams"},0,439,0,440],[1,6,441],[1,6,442],[1,6,443],[1,6,444],[1,176,432],[":",445],[2,466,440,{name:"ParamList"}],[":",446,0,-1],[1,6,447],[1,6,448],[1,176,-1],[1,410,-1],[3,"def property",t[19],450,0,-1],[1,6,451],[3,"operator","=",452,0,453],[1,6,454],[1,6,455],[1,367,453],[",",456,0,-1],[1,6,457],[3,"def property",t[19],458,0,459],[1,6,460],[1,6,455],[3,"operator","=",461,0,459],[1,6,462],[1,367,459],[3,"operator","...",464,0,464],[1,6,465],[3,"def",t[19],-1,2,579,-1,{name:"ArrayPattern"},2,584,-1,{name:"ObjectPattern"}],["(",467],[1,6,468],[1,589,469],[1,6,470],[")",-1],["(",472],[1,6,473],[2,629,474,{name:"StatementMaybeOf"}],[1,6,475],[1,165,476,0,476,0,480],[1,6,477],[";",478],[1,6,479],[1,165,480,0,480],[1,6,481],[")",-1],["{",483],[1,6,484],[0,485,"@",486,"}",-1],[3,"keyword",t[42],487,2,634,488,{name:"ClassItem"}],[1,6,489],[1,6,485],[1,6,484],[1,165,488],["{",491],[1,494,492,1,313,493],[[0,/^(?!\}|\*\/)/,/^[^]/],492,0,493],[/^(?:\}|(?=\*\/))/,-1],[3,"tag",/^\@(?:member|param|arg(?:ument)?|module|namespace|typedef)(?![a-zA-Z¡-￿_0-9])/,495,3,"tag",/^\@[a-zA-Z¡-￿_0-9]+/,-1],[t[24],495,"{",496,0,497,0,-1],[2,655,498,{name:"doccomment.type"}],[3,"def",/^[a-zA-Z¡-￿_0-9]+/,-1,0,-1],["}",499],[[1,"\n","\t"," ",/^\*(?!\/)/],499,0,497],[3,"def",[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,659]],506,[5,665],501],[2,466,502,{name:"ParamList"}],[1,6,503],[":",504,0,506],[1,6,505],[1,410,506],[1,6,507],[2,672,-1,{name:"ArrowRest"}],[/^\<(?! )/,-1,/^ */,509],[1,677,510,0,511],[/^ */,511],["(",-1],["[",513],[1,6,514],[1,679,515],[1,6,516],["]",-1],["{",518],[1,6,519],[1,685,520],[1,6,521],["}",-1],["(",523],[1,6,524],[1,165,525],[1,6,526],[")",-1],[3,"keyword",t[20],-1],["(",529],[1,6,530],[1,679,531],[1,6,532],[")",-1],[/^ */,534],[1,677,535,0,536],[/^ */,536],["(",-1],[3,"keyword",t[33],538,3,"operator","!",-1,3,"operator",t[39],-1,3,"operator",t[40],540,3,"keyword",t[41],540,2,528,-1,{name:"ArgList"},1,150,-1,t[43],542,"[",546,3,"operator","?",550],[1,6,539],[1,176,-1],[1,6,541],[1,367,-1],[1,6,543],[3,"property callee",t[44],544,3,"property",t[19],-1],[1,6,545],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,547],[1,165,548],[1,6,549],["]",-1],[1,6,551],[1,165,552],[1,6,553],[3,"operator",":",554],[1,6,555],[1,367,-1],[/^(?:\)|\.\.\.)/,-1,t[19],557],[1,6,558],[/^[\?\:]/,-1],[t[45],560,0,561,0,-1],[1,6,562],[1,6,563],[":",561],[1,176,564],[1,6,565],[",",566,0,-1],[1,6,567],[t[45],568,0,569,0,570],[1,6,571],[1,6,572],[1,6,565],[":",569],[1,176,570],[t[19],574],[1,6,575],[3,"keyword",t[46],-1],[t[19],577],[1,6,578],[/^(?:\:|in)/,-1],["[",580],[1,6,581],[1,691,582],[1,6,583],["]",-1],["{",585],[1,6,586],[1,697,587],[1,6,588],["}",-1],["@",590,0,591,0,-1],[1,6,592],[3,"keyword",t[42],593,t[47],594],[1,165,595],[1,6,591],[1,6,596],[1,6,589],[1,463,597],[1,6,598],[/^\??/,599],[1,6,600],[":",601,0,602],[1,6,603],[1,6,604],[1,176,602],[3,"operator","=",605,0,606],[1,6,607],[1,6,608],[1,367,606],[",",609,0,-1],[1,6,610],["@",611,0,612,0,613],[1,6,614],[3,"keyword",t[42],615,t[47],616],[1,6,608],[1,165,617],[1,6,612],[1,6,618],[1,6,610],[1,463,619],[1,6,620],[/^\??/,621],[1,6,622],[":",623,0,624],[1,6,625],[1,6,626],[1,176,624],[3,"operator","=",627,0,613],[1,6,628],[1,367,613],[2,7,630,{name:"Statement"}],[1,6,631],[3,"keyword",/^of(?![a-zA-Z¡-￿_0-9_\$])/,632,0,-1],[1,6,633],[1,165,-1],[3,"keyword",t[48],635,0,635],[1,6,636],[3,"def property",t[19],641,"[",637,3,"number",t[29],641,2,141,641,{name:"string",token:"string"}],[1,6,638],[1,165,639],[1,6,640],["]",641],[1,6,642],[3,"keyword","*",643,0,643,/^[\!\?]?/,644],[1,6,645],[1,6,646],[2,266,-1,{name:"FunctionDef"}],[":",647,0,648],[1,6,649],[1,6,650],[1,176,648],[3,"operator","=",651,0,652],[1,6,653],[1,6,654],[1,165,652],[t[22],-1],[3,"type","{",656,3,"type",/^(?:(?!\{|\}|\*\/).)+/,655,"\n",657,0,-1],[2,655,658,{name:"doccomment.type"}],[/^[\t ]*(?:\*(?!\/)[\t ]*)?/,655],[/^(?=\*\/)/,655,3,"type","}",655],[1,6,660],[":",661,0,664],[1,6,662],[1,176,663],[1,6,664],["=>",-1],[2,466,666,{name:"ParamList"}],[1,6,667],[":",668,0,670],[1,6,669],[1,410,670],[1,6,671],["=>",-1],[3,"operator","=>",673],[1,6,674],[2,171,675,{name:"TypeParams"},0,675],[1,6,676],[2,161,-1,{name:"Block"},1,367,-1],["<",678],[1,677,678,[1,"=>",[0,/^(?!\>)/,/^[^]/]],678,">",-1],[1,367,680,0,-1],[1,6,681],[",",682,0,-1],[1,6,683],[1,367,684,0,684],[1,6,681],[2,703,686,{name:"ObjectMember"},0,-1],[1,6,687],[",",688,0,-1],[1,6,689],[2,703,690,{name:"ObjectMember"},0,690],[1,6,687],[1,718,692,0,692,0,-1],[1,6,693],[",",694,0,-1],[1,6,695],[1,718,696,0,696,0,696],[1,6,693],[1,723,698,0,-1],[1,6,699],[",",700,0,-1],[1,6,701],[1,723,702,0,702],[1,6,699],[3,"keyword",t[48],704,0,704],[1,6,705],[3,"keyword","*",706,0,706],[1,6,707],[3,"def property",t[19],708,"[",709,3,"number",t[29],708,2,141,708,{name:"string",token:"string"},3,"operator","...",710],[1,6,711],[1,6,712],[1,6,713],[2,266,-1,{name:"FunctionDef"},":",714,0,-1],[1,165,715],[1,367,-1],[1,6,716],[1,6,717],[1,367,-1],["]",708],[1,463,719],[1,6,720],[3,"operator","=",721,0,-1],[1,6,722],[1,367,-1],[3,"def",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?![a-z]|[A-Z]|[¡-￿]|_|[0-9]|_|\$| *\:)/,724,3,"property",t[19],728,3,"number",t[29],728,2,141,728,{name:"string",token:"string"},3,"operator","...",732],[1,6,725],[3,"operator","=",726,0,-1],[1,6,727],[1,367,-1],[1,6,729],[":",730],[1,6,731],[1,718,-1],[1,6,733],[1,718,-1]],start:0,token:5}),o=/(^|\s)variable($|\s)/;function i(e){var t=/^(if|for|do|while|try)\b/.exec(e.startLine.slice(e.startPos));return t&&t[1]}var n={Block:"}",BlockOf:"}",ClassBody:"}",AnnotationTypeBody:"}",ObjectLiteral:"}",ObjectPattern:"}",EnumBody:"}",LambdaBlock:"}",WhenBody:"}",ObjType:"}",ArrayInitializer:"}",NamespaceBlock:"}",BraceTokens:"}",ArrayLiteral:"]",BracketTokens:"]",TupleType:"]",ParamList:")",SimpleParamList:")",ArgList:")",ParenExpr:")",CondExpr:")",ForSpec:")",ParenTokens:")",ParenthesizedExpression:")",ConstructorParamList:")",TypeParams:">",TypeArgs:">",TemplateArgs:">",TemplateParams:">"},a=["Block","NamespaceBlock","ClassBody","AnnotationTypeBody","BlockOf","EnumBody"],s=["Statement","ObjectMember","ClassItem","EnumConstant","AnnotationTypeItem","ArgExpr","StatementMaybeOf","NewExpr"];function l(t,r){for(var o=t.startLine;;t=t.parent){if("CondExpr"==t.name)return e.countColumn(t.startLine,t.startPos+1,r.tabSize);if(s.indexOf(t.name)>-1&&/(^\s*|[\(\{\[])$/.test(t.startLine.slice(0,t.startPos)))return e.countColumn(t.startLine,t.startPos,r.tabSize);if(!t.parent||t.parent.startLine!=o)return e.countColumn(t.startLine,null,r.tabSize)}}function d(t,r,o){if(!t)return 0;if("string"==t.name||"comment"==t.name)return e.Pass;var p,u,h=n[t.name],g=r&&r.charAt(0)==h;if(h&&!1!==o.align&&(!o.dontAlign||o.dontAlign.indexOf(t.name)<0)&&function(e){return!/^\s*((\/\/.*)?$|.*=>)/.test(e.startLine.slice(e.startPos+1))}(t))return e.countColumn(t.startLine,t.startPos,o.tabSize)+(g?0:1);if(h&&a.indexOf(t.name)>-1){var m=t.parent;m&&"Statement"==m.name&&m.parent&&"Statement"==m.parent.name&&i(m.parent)&&!i(m)&&(m=m.parent);var f=c(m,o);return g||"NamespaceBlock"==t.name?f:/^(public|private|protected)\s*:/.test(r)?f+1:!(u=t.parent)||"Statement"!=u.name||!/^switch\b/.test(u.startLine.slice(u.startPos))||(p=r)&&/^\s*(case|default)\b/.test(p)?f+o.indentUnit:f+2*o.indentUnit}var y=l(t,o.tabSize);return h?g&&(o.dontCloseBrackets||"").indexOf(h)<0?y:y+o.indentUnit*((o.doubleIndentBrackets||"").indexOf(h)<0?1:2):s.indexOf(t.name)>-1?i(t)?y+o.indentUnit:y+2*o.indentUnit:"Alternative"==t.name||"CatchFinally"==t.name?(y=l(t.parent,o.tabSize),!r||/^((else|catch|finally)\b|\/[\/\*])/.test(r)?y:y+o.indentUnit):"ArrowRest"==t.name?y+o.indentUnit:"NewExpression"==t.name&&t.startLine.length>t.startPos+5?e.countColumn(t.startLine,t.startPos,o.tabSize)+2*o.indentUnit:"InitializerList"==t.name?y+2:"ThrowsClause"!=t.name||/throws\s*$/.test(t.startLine.slice(t.startPos))?d(t.parent,r,o):y+2*o.indentUnit}function c(t,r){for(;;t=t.parent){if(!t)return 0;if(s.indexOf(t.name)>-1||t.parent&&n[t.parent.name])return e.countColumn(t.startLine,null,r.tabSize)}}function p(t,r,o,i){var n=t.context&&t.context.name;if("DeclType"==n||"BeforeStatement"==n||"AnnotationHead"==n||"Template"==n||"str"==n)return c(t.context,i);if(("doccomment.braced"==n||"doccomment.tagGroup"==n)&&!/^[@*]/.test(r))return e.countColumn(t.context.startLine,null,i.tabSize)+2*i.indentUnit;var a=i.forceContent&&/^\s*(\/\/.*)?$/.test(o)?"x":o;return d(t.contextAt(a,o.length-r.length),r,i)}function u(e,t){for(var r=t-1;r>=0;r--){var o=e.charCodeAt(r);if(10===o)break;if(32!==o&&9!==o)return!1}return!0}var h=function(e){this.config=e};h.prototype.startState=function(){return new g},h.prototype.copyState=function(e){return e.copy()},h.prototype.shouldInterceptTokenizing=function(e){var t=e.currentTemplateState;return void 0!==t&&null!==t.mode},h.prototype.interceptTokenizing=function(e,t){if(e.match("${")&&(e.backUp(2),!this.isEscaped(e,e.pos-2)))return{handled:!1};if("`"===e.peek()&&!this.isEscaped(e,e.pos))return{handled:!1};var r=t.currentTemplateState,o=r.mode,i=r.state,n=o.token(e,i);return this.backupIfEmbeddedTokenizerOvershot(e),{handled:!0,style:n}},h.prototype.trackState=function(e,t,r){if(e){var o=r.currentTemplateState;o&&"inline-expression"!==o.kind?this.trackStateInTemplate(e,t,r,o):this.trackStateNotInTemplate(e,t,r,o),r.previousVariable="variable"===e?t.current():null}},h.prototype.trackStateNotInTemplate=function(e,t,r,o){if(o&&"string-2"===e&&t.current().startsWith("}"))return r.templateStack.pop(),void t.backUp(t.current().length-1);if("string-2"===e&&t.current().startsWith("`")){var i=this.getModeForTemplateTag(r.previousVariable),n="template";i?(t.backUp(t.current().length-1),r.templateStack.push(new f(n,i,CodeMirror.startState(i)))):r.templateStack.push(new f(n,null,null))}},h.prototype.trackStateInTemplate=function(e,t,r,o){"string-2"!==e||!t.current().endsWith("`")||this.isEscaped(t.pos-1)?"string-2"!==e||!t.current().endsWith("${")||this.isEscaped(t.pos-2)||r.templateStack.push(new f("inline-expression",null,null)):r.templateStack.pop()},h.prototype.backupIfEmbeddedTokenizerOvershot=function(e){for(var t=e.current(),r=0;;){var o=t.slice(r).search(/`|\$\{/);if(-1===o)return;o+=r;var i=t.length-o,n=e.pos-i;if(!this.isEscaped(e,n))return void e.backUp(t.length-o);r=o+1}},h.prototype.isEscaped=function(e,t){for(var r=!1,o=t;o>0&&"\\"===e.string[o-1];)r=!r,o--;return r},h.prototype.getModeForTemplateTag=function(e){if(!e)return null;"htm"===e&&(e="html");for(var t=["google-"+e,""+e],r=0;r<t.length;r++){var o=CodeMirror.getMode(this.config,t[r]);if(o&&"null"!==o.name)return o}return null};var g=function(e,t){void 0===e&&(e=[]),void 0===t&&(t=null),this.templateStack=e,this.previousVariable=t},m={currentTemplateState:{configurable:!0}};g.prototype.copy=function(){return new g(this.templateStack.map((function(e){return e.copy()})),this.previousVariable)},m.currentTemplateState.get=function(){return this.templateStack[this.templateStack.length-1]},Object.defineProperties(g.prototype,m);var f=function(e,t,r){this.kind=e,this.mode=t,this.state=r};f.prototype.copy=function(){return this.mode?new f(this.kind,this.mode,CodeMirror.copyState(this.mode,this.state)):new f(this.kind,null,null)};var y=["Block","FunctionDef","ArrowFunc","ForStatement","ParamListSpec"],b=function(e){function t(t,o){e.call(this,r,{predicates:{canInsertSemi:!1===o.requireSemicolons?u:function(){return!1}}}),this.templateTokenizer=new h(t),this.indentConf={doubleIndentBrackets:">)",dontCloseBrackets:")",tabSize:t.tabSize,indentUnit:t.indentUnit,forceContent:!0}}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.startState=function(){var t=e.prototype.startState.call(this);return t.embeddedParserState=this.templateTokenizer.startState(),t},t.prototype.copyState=function(t){var r=e.prototype.copyState.call(this,t);return r.embeddedParserState=this.templateTokenizer.copyState(t.embeddedParserState),r},t.prototype.token=function(t,r){var i=r.embeddedParserState;if(this.templateTokenizer.shouldInterceptTokenizing(i)){var n=this.templateTokenizer.interceptTokenizing(t,i),a=n.handled,s=n.style;if(a)return s}var l=e.prototype.token.call(this,t,r);return this.templateTokenizer.trackState(l,t,i),function(e,t,r,i){if("def"==e){var n=function(e,t){for(var r=e;r;r=r.parent)if(t.indexOf(r.name)>-1)return r}(i.context,t),a=r.current();if(n&&(n.locals||(n.locals=[]),-1==n.locals.indexOf(a)&&n.locals.push(a),"funcName"!=i.context.name))return"def local"}else o.test(e)&&!/qualified/.test(e)&&function(e,t){for(var r=e;r;r=r.parent)if(r.locals&&r.locals.indexOf(t)>-1)return!0;return!1}(i.context,r.current())&&(e=e.replace(o,"$1variable-2$2"));return e}(l,y,t,r)},t.prototype.indent=function(e,t,r){return t||(t=r="x"),p(e,t,r,this.indentConf)},t}(e.GrammarMode),v={electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``"};for(var x in v)b.prototype[x]=v[x];e.registerHelper("wordChars","google-typescript",/[\w$]/),e.defineMode("google-typescript",(function(e,t){return new b(e,t)}))}(window.CodeMirror),function(e){var t=[[1,"\n","\t"," "],/^[a-zA-Z\-\.0-9_]+/],r=Object.freeze({nodes:[[1,3,0,0,1],[/^[^]/,0],[/^[^]/,-1],[2,4,-1,{name:"comment",token:"comment"},2,6,-1,{name:"doctype",token:"meta"},2,8,-1,{name:"tag"},3,"atom",/^\&(?:(?![\;\n\t ]).)*\;/,-1,[1,"\n",/^(?:(?![\&\<]).)+/],-1],["\x3c!--",5],[[0,/^(?!\-\-\>)/,/^[^]/],5,"--\x3e",-1],[/^(?:\<\!doctype|\<\!DOCTYPE)(?![a-zA-Z\-\.0-9_])/,7],[[0,/^(?!\>)/,/^[^]/],7,">",-1],[2,14,9,{name:"openTag"}],[3,"tag","/>",-1,[7,"selfClosing"],10,3,"tag",">",11],[3,"tag",">",-1],[1,3,11,/^(?=\<\/)/,12],[[7,"matchingTag"],13,0,-1],[2,21,-1,{name:"closeTag"}],[3,"tag",[0,"<",[6,24]],15],[t[0],15,3,"tag",t[1],16],[t[0],16,0,17],[3,"attribute",t[1],18,0,-1],[t[0],18,"=",19,0,20],[t[0],19,2,25,20,{name:"attributeValue",token:"string"}],[t[0],20,0,17],[3,"tag","</",22],[t[0],22,3,"tag",t[1],23],[3,"tag",">",-1],[t[0],24,"/",-1],['"',26,"'",27,/^(?:(?![\n\t \>]).)*/,-1],[[0,/^(?!\")/,/^[^]/],26,'"',-1],[[0,/^(?!\')/,/^[^]/],27,"'",-1]],start:0,token:2});function o(e){var t=/^\s*([\w_\.-]+)/.exec(e);return t?t[1].toLowerCase():"x"}function i(e){return o(e.startLine.slice(e.startPos+1))}var n="area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "),a={selfClosing:function(e,t,r){return n.indexOf(i(r))>-1},matchingTag:function(e,t,r){return o(e.slice(t+2))==i(r)}},s=function(e){function t(t,o){e.call(this,r,{predicates:a}),this.conf=t}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.indent=function(e,t,r){return function(e,t,r,o){for(var n=e.contextAt(r,r.length-t.length),a=/^\s*<\/\s*([\w_\.-]+)/.exec(t);n;){if("tag"==n.name){var s=CodeMirror.countColumn(n.startLine,null,o.tabSize);return a&&a[1].toLowerCase()==i(n)?s:s+o.indentUnit}if("openTag"==n.name)return CodeMirror.countColumn(n.startLine,null,o.tabSize)+2*o.indentUnit;n=n.parent}return 0}(e,t,r,this.conf)},t}(e.GrammarMode),l=s.prototype;l.electricInput=/^\s*<\/.*?>/,l.blockCommentStart="\x3c!--",l.blockCommentEnd="--\x3e",l.fold="xml",function(e){e.xmlCurrentTag=function(e){var t=e.context;if(!t||"openTag"!=t.name&&"closeTag"!=t.name)return null;var r=/^<\/?\s*([\w\-\.]+)/.exec(t.startLine.slice(t.startPos));return r?{name:r[1],close:"closeTag"==t.name}:null},e.xmlCurrentContext=function(e){for(var t=[],r=e.context;r;r=r.parent)if("tag"==r.name){var o=/^<\s*([\w\-\.]+)/.exec(r.startLine.slice(r.startPos));o&&t.push(o[1])}return t.reverse()}}(l),e.defineMode("google-html",(function(e,t){return new s(e,t)}))}(window.CodeMirror),function(e){function t(e){for(var t={},r=0;r<e.length;++r)t[e[r].toLowerCase()]=!0;return t}e.defineMode("css",(function(t,r){var o=r.inline;r.propertyKeywords||(r=e.resolveMode("text/css"));var i,n,a=t.indentUnit,s=r.tokenHooks,l=r.documentTypes||{},d=r.mediaTypes||{},c=r.mediaFeatures||{},p=r.mediaValueKeywords||{},u=r.propertyKeywords||{},h=r.nonStandardPropertyKeywords||{},g=r.fontProperties||{},m=r.counterDescriptors||{},f=r.colorKeywords||{},y=r.valueKeywords||{},b=r.allowNested,v=r.lineComment,x=!0===r.supportsAtComponent,_=!1!==t.highlightNonStandardPropertyKeywords;function w(e,t){return i=t,e}function S(e,t){var r=e.next();if(s[r]){var o=s[r](e,t);if(!1!==o)return o}return"@"==r?(e.eatWhile(/[\w\\\-]/),w("def",e.current())):"="==r||("~"==r||"|"==r)&&e.eat("=")?w(null,"compare"):'"'==r||"'"==r?(t.tokenize=C(r),t.tokenize(e,t)):"#"==r?(e.eatWhile(/[\w\\\-]/),w("atom","hash")):"!"==r?(e.match(/^\s*\w*/),w("keyword","important")):/\d/.test(r)||"."==r&&e.eat(/\d/)?(e.eatWhile(/[\w.%]/),w("number","unit")):"-"!==r?/[,+>*\/]/.test(r)?w(null,"select-op"):"."==r&&e.match(/^-?[_a-z][_a-z0-9-]*/i)?w("qualifier","qualifier"):/[:;{}\[\]\(\)]/.test(r)?w(null,r):e.match(/^[\w-.]+(?=\()/)?(/^(url(-prefix)?|domain|regexp)$/i.test(e.current())&&(t.tokenize=k),w("variable callee","variable")):/[\w\\\-]/.test(r)?(e.eatWhile(/[\w\\\-]/),w("property","word")):w(null,null):/[\d.]/.test(e.peek())?(e.eatWhile(/[\w.%]/),w("number","unit")):e.match(/^-[\w\\\-]*/)?(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?w("variable-2","variable-definition"):w("variable-2","variable")):e.match(/^\w+-/)?w("meta","meta"):void 0}function C(e){return function(t,r){for(var o,i=!1;null!=(o=t.next());){if(o==e&&!i){")"==e&&t.backUp(1);break}i=!i&&"\\"==o}return(o==e||!i&&")"!=e)&&(r.tokenize=null),w("string","string")}}function k(e,t){return e.next(),e.match(/^\s*[\"\')]/,!1)?t.tokenize=null:t.tokenize=C(")"),w(null,"(")}function E(e,t,r){this.type=e,this.indent=t,this.prev=r}function T(e,t,r,o){return e.context=new E(r,t.indentation()+(!1===o?0:a),e.context),r}function O(e){return e.context.prev&&(e.context=e.context.prev),e.context.type}function P(e,t,r){return L[r.context.type](e,t,r)}function A(e,t,r,o){for(var i=o||1;i>0;i--)r.context=r.context.prev;return P(e,t,r)}function R(e){var t=e.current().toLowerCase();n=y.hasOwnProperty(t)?"atom":f.hasOwnProperty(t)?"keyword":"variable"}var L={top:function(e,t,r){if("{"==e)return T(r,t,"block");if("}"==e&&r.context.prev)return O(r);if(x&&/@component/i.test(e))return T(r,t,"atComponentBlock");if(/^@(-moz-)?document$/i.test(e))return T(r,t,"documentTypes");if(/^@(media|supports|(-moz-)?document|import)$/i.test(e))return T(r,t,"atBlock");if(/^@(font-face|counter-style)/i.test(e))return r.stateArg=e,"restricted_atBlock_before";if(/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(e))return"keyframes";if(e&&"@"==e.charAt(0))return T(r,t,"at");if("hash"==e)n="builtin";else if("word"==e)n="tag";else{if("variable-definition"==e)return"maybeprop";if("interpolation"==e)return T(r,t,"interpolation");if(":"==e)return"pseudo";if(b&&"("==e)return T(r,t,"parens")}return r.context.type},block:function(e,t,r){if("word"==e){var o=t.current().toLowerCase();return u.hasOwnProperty(o)?(n="property","maybeprop"):h.hasOwnProperty(o)?(n=_?"string-2":"property","maybeprop"):b?(n=t.match(/^\s*:(?:\s|$)/,!1)?"property":"tag","block"):(n+=" error","maybeprop")}return"meta"==e?"block":b||"hash"!=e&&"qualifier"!=e?L.top(e,t,r):(n="error","block")},maybeprop:function(e,t,r){return":"==e?T(r,t,"prop"):P(e,t,r)},prop:function(e,t,r){if(";"==e)return O(r);if("{"==e&&b)return T(r,t,"propBlock");if("}"==e||"{"==e)return A(e,t,r);if("("==e)return T(r,t,"parens");if("hash"!=e||/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())){if("word"==e)R(t);else if("interpolation"==e)return T(r,t,"interpolation")}else n+=" error";return"prop"},propBlock:function(e,t,r){return"}"==e?O(r):"word"==e?(n="property","maybeprop"):r.context.type},parens:function(e,t,r){return"{"==e||"}"==e?A(e,t,r):")"==e?O(r):"("==e?T(r,t,"parens"):"interpolation"==e?T(r,t,"interpolation"):("word"==e&&R(t),"parens")},pseudo:function(e,t,r){return"meta"==e?"pseudo":"word"==e?(n="variable-3",r.context.type):P(e,t,r)},documentTypes:function(e,t,r){return"word"==e&&l.hasOwnProperty(t.current())?(n="tag",r.context.type):L.atBlock(e,t,r)},atBlock:function(e,t,r){if("("==e)return T(r,t,"atBlock_parens");if("}"==e||";"==e)return A(e,t,r);if("{"==e)return O(r)&&T(r,t,b?"block":"top");if("interpolation"==e)return T(r,t,"interpolation");if("word"==e){var o=t.current().toLowerCase();n="only"==o||"not"==o||"and"==o||"or"==o?"keyword":d.hasOwnProperty(o)?"attribute":c.hasOwnProperty(o)?"property":p.hasOwnProperty(o)?"keyword":u.hasOwnProperty(o)?"property":h.hasOwnProperty(o)?_?"string-2":"property":y.hasOwnProperty(o)?"atom":f.hasOwnProperty(o)?"keyword":"error"}return r.context.type},atComponentBlock:function(e,t,r){return"}"==e?A(e,t,r):"{"==e?O(r)&&T(r,t,b?"block":"top",!1):("word"==e&&(n="error"),r.context.type)},atBlock_parens:function(e,t,r){return")"==e?O(r):"{"==e||"}"==e?A(e,t,r,2):L.atBlock(e,t,r)},restricted_atBlock_before:function(e,t,r){return"{"==e?T(r,t,"restricted_atBlock"):"word"==e&&"@counter-style"==r.stateArg?(n="variable","restricted_atBlock_before"):P(e,t,r)},restricted_atBlock:function(e,t,r){return"}"==e?(r.stateArg=null,O(r)):"word"==e?(n="@font-face"==r.stateArg&&!g.hasOwnProperty(t.current().toLowerCase())||"@counter-style"==r.stateArg&&!m.hasOwnProperty(t.current().toLowerCase())?"error":"property","maybeprop"):"restricted_atBlock"},keyframes:function(e,t,r){return"word"==e?(n="variable","keyframes"):"{"==e?T(r,t,"top"):P(e,t,r)},at:function(e,t,r){return";"==e?O(r):"{"==e||"}"==e?A(e,t,r):("word"==e?n="tag":"hash"==e&&(n="builtin"),"at")},interpolation:function(e,t,r){return"}"==e?O(r):"{"==e||";"==e?A(e,t,r):("word"==e?n="variable":"variable"!=e&&"("!=e&&")"!=e&&(n="error"),"interpolation")}};return{startState:function(e){return{tokenize:null,state:o?"block":"top",stateArg:null,context:new E(o?"block":"top",e||0,null)}},token:function(e,t){if(!t.tokenize&&e.eatSpace())return null;var r=(t.tokenize||S)(e,t);return r&&"object"==typeof r&&(i=r[1],r=r[0]),n=r,"comment"!=i&&(t.state=L[t.state](i,e,t)),n},indent:function(e,t){var r=e.context,o=t&&t.charAt(0),i=r.indent;return"prop"!=r.type||"}"!=o&&")"!=o||(r=r.prev),r.prev&&("}"!=o||"block"!=r.type&&"top"!=r.type&&"interpolation"!=r.type&&"restricted_atBlock"!=r.type?(")"!=o||"parens"!=r.type&&"atBlock_parens"!=r.type)&&("{"!=o||"at"!=r.type&&"atBlock"!=r.type)||(i=Math.max(0,r.indent-a)):i=(r=r.prev).indent),i},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:v,fold:"brace"}}));var r=["domain","regexp","url","url-prefix"],o=t(r),i=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],n=t(i),a=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid","orientation","device-pixel-ratio","min-device-pixel-ratio","max-device-pixel-ratio","pointer","any-pointer","hover","any-hover","prefers-color-scheme"],s=t(a),l=["landscape","portrait","none","coarse","fine","on-demand","hover","interlace","progressive","dark","light"],d=t(l),c=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","all","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","baseline-shift","binding","bleed","block-size","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","gap","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-gap","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-gap","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","inset","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","left","letter-spacing","line-break","line-height","line-height-step","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","place-content","place-items","place-self","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotate","rotation","rotation-point","row-gap","ruby-align","ruby-overhang","ruby-position","ruby-span","scale","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-type","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-orientation","text-outline","text-overflow","text-rendering","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","touch-action","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-select","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","paint-order","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode"],p=t(c),u=["border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","margin-block","margin-block-end","margin-block-start","margin-inline","margin-inline-end","margin-inline-start","padding-block","padding-block-end","padding-block-start","padding-inline","padding-inline-end","padding-inline-start","scroll-snap-stop","scrollbar-3d-light-color","scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-track-color","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","shape-inside","zoom"],h=t(u),g=t(["font-display","font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"]),m=t(["additive-symbols","fallback","negative","pad","prefix","range","speak-as","suffix","symbols","system"]),f=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],y=t(f),b=["above","absolute","activeborder","additive","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","attr","auto","auto-flow","avoid","avoid-column","avoid-page","avoid-region","axis-pan","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","bullets","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","calc","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","color","color-burn","color-dodge","column","column-reverse","compact","condensed","contain","content","contents","content-box","context-menu","continuous","copy","counter","counters","cover","crop","cross","crosshair","currentcolor","cursive","cyclic","darken","dashed","decimal","decimal-leading-zero","default","default-button","dense","destination-atop","destination-in","destination-out","destination-over","devanagari","difference","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ethiopic-numeric","ew-resize","exclusion","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fill-box","fixed","flat","flex","flex-end","flex-start","footnotes","forwards","from","geometricPrecision","georgian","graytext","grid","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hard-light","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","hue","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-grid","inline-table","inset","inside","intrinsic","invert","italic","japanese-formal","japanese-informal","justify","kannada","katakana","katakana-iroha","keep-all","khmer","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","landscape","lao","large","larger","left","level","lighter","lighten","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","luminosity","malayalam","manipulation","match","matrix","matrix3d","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","multiple_mask_images","multiply","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","octal","opacity","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","perspective","pinch-zoom","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row","row-resize","row-reverse","rtl","run-in","running","s-resize","sans-serif","saturation","scale","scale3d","scaleX","scaleY","scaleZ","screen","scroll","scrollbar","scroll-position","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","self-start","self-end","semi-condensed","semi-expanded","separate","serif","show","sidama","simp-chinese-formal","simp-chinese-informal","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","soft-light","solid","somali","source-atop","source-in","source-out","source-over","space","space-around","space-between","space-evenly","spell-out","square","square-button","start","static","status-bar","stretch","stroke","stroke-box","sub","subpixel-antialiased","svg_masks","super","sw-resize","symbolic","symbols","system-ui","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tamil","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","trad-chinese-formal","trad-chinese-informal","transform","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","unidirectional-pan","unset","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","var","vertical","vertical-text","view-box","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","wrap","wrap-reverse","x-large","x-small","xor","xx-large","xx-small"],v=t(b),x=r.concat(i).concat(a).concat(l).concat(c).concat(u).concat(f).concat(b);function _(e,t){for(var r,o=!1;null!=(r=e.next());){if(o&&"/"==r){t.tokenize=null;break}o="*"==r}return["comment","comment"]}e.registerHelper("hintWords","css",x),e.defineMIME("text/css",{documentTypes:o,mediaTypes:n,mediaFeatures:s,mediaValueKeywords:d,propertyKeywords:p,nonStandardPropertyKeywords:h,fontProperties:g,counterDescriptors:m,colorKeywords:y,valueKeywords:v,tokenHooks:{"/":function(e,t){return!!e.eat("*")&&(t.tokenize=_,_(e,t))}},name:"css"}),e.defineMIME("text/x-scss",{mediaTypes:n,mediaFeatures:s,mediaValueKeywords:d,propertyKeywords:p,nonStandardPropertyKeywords:h,colorKeywords:y,valueKeywords:v,fontProperties:g,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=_,_(e,t)):["operator","operator"]},":":function(e){return!!e.match(/^\s*\{/,!1)&&[null,null]},$:function(e){return e.match(/^[\w-]+/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"]},"#":function(e){return!!e.eat("{")&&[null,"interpolation"]}},name:"css",helperType:"scss"}),e.defineMIME("text/x-less",{mediaTypes:n,mediaFeatures:s,mediaValueKeywords:d,propertyKeywords:p,nonStandardPropertyKeywords:h,colorKeywords:y,valueKeywords:v,fontProperties:g,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=_,_(e,t)):["operator","operator"]},"@":function(e){return e.eat("{")?[null,"interpolation"]:!e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i,!1)&&(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"])},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"}),e.defineMIME("text/x-gss",{documentTypes:o,mediaTypes:n,mediaFeatures:s,propertyKeywords:p,nonStandardPropertyKeywords:h,fontProperties:g,counterDescriptors:m,colorKeywords:y,valueKeywords:v,supportsAtComponent:!0,tokenHooks:{"/":function(e,t){return!!e.eat("*")&&(t.tokenize=_,_(e,t))}},name:"css",helperType:"gss"})}(CodeMirror);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $i=window.CodeMirror;var en=le`/**
 * This file is derived from \`code-mirror/lib/codemirror.css\`, modified in the
 * following ways:
 *
 * - CSS custom properties added.
 * - Rules for unused features and addons removed.
 * - Unnecessary vendor prefixes removed.
 * - \`.cm-s-default\` class selectors removed.
 * - Empty rules removed.
 */

/* BASICS */

.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: var(--playground-code-font-family, monospace);
  font-size: var(--playground-code-font-size, 14px);
  padding: var(--playground-code-padding, 0);
  height: 350px;
  color: var(--playground-code-default-color, #000);
  background: var(--playground-code-background, #fff);
  direction: ltr;
  /* CodeMirror uses z-indexes up to 6 to e.g. place scrollbars above the code
     area. However, this can create undesirable stacking effects with the rest
     of the page. Force a new stacking context. */
  isolation: isolate;
  line-height: var(--playground-code-line-height, 1.4em);
}

/* PADDING */

.CodeMirror-lines {
  padding: 4px 0; /* Vertical padding around content */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  padding: var(
    --playground-code-line-padding,
    0 4px
  ); /* Horizontal padding of content */
}

.CodeMirror-scrollbar-filler,
.CodeMirror-gutter-filler {
  background: var(
    --playground-code-background,
    #fff
  ); /* The little square between H and V scrollbars */
}

/* GUTTER */

.CodeMirror-gutters {
  border-right: var(--playground-code-gutter-border-right, none);
  background: var(
    --playground-code-gutter-background,
    var(--playground-code-background, #fff)
  );
  box-shadow: var(--playground-code-gutter-box-shadow, none);
  white-space: nowrap;
}
.CodeMirror-linenumber {
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  color: var(--playground-code-linenumber-color, #767676);
  white-space: nowrap;
  margin-right: 1em;
}
.CodeMirror-code > div > .CodeMirror-line {
  /* Some extra room between the line number gutter and the line */
  padding-left: 0.7em;
}

/* CURSOR */

.CodeMirror-cursor {
  border-left: 2px solid
    var(
      --playground-code-cursor-color,
      var(--playground-code-default-color, #000)
    );
  border-right: none;
  width: 0;
}

@keyframes blink {
  0% {
  }
  50% {
    background: transparent;
  }
  100% {
  }
}

/* DEFAULT THEME */

.cm-header,
.cm-strong {
  font-weight: bold;
}
.cm-em {
  font-style: italic;
}
.cm-link {
  text-decoration: underline;
}
.cm-strikethrough {
  text-decoration: line-through;
}

.cm-keyword {
  color: var(--playground-code-keyword-color, #708);
}
.cm-atom {
  color: var(--playground-code-atom-color, #219);
}
.cm-number {
  color: var(--playground-code-number-color, #164);
}
.cm-def {
  color: var(--playground-code-def-color, #00f);
}
.cm-variable {
  color: var(--playground-code-variable-color, #000);
}
.cm-property {
  color: var(--playground-code-property-color, #000);
}
.cm-operator {
  color: var(--playground-code-operator-color, #000);
}
.cm-variable-2 {
  color: var(--playground-code-variable-2-color, #05a);
}
.cm-variable-3 {
  color: var(--playground-code-variable-3-color, #085);
}
.cm-type {
  color: var(--playground-code-type-color, #085);
}
.cm-comment {
  color: var(--playground-code-comment-color, #a50);
}
.cm-string {
  color: var(--playground-code-string-color, #a11);
}
.cm-string-2 {
  color: var(--playground-code-string-2-color, #f50);
}
.cm-meta {
  color: var(--playground-code-meta-color, #555);
}
.cm-qualifier {
  color: var(--playground-code-qualifier-color, #555);
}
.cm-builtin {
  color: var(--playground-code-builtin-color, #30a);
}
.cm-tag {
  color: var(--playground-code-tag-color, #170);
}
.cm-attribute {
  color: var(--playground-code-attribute-color, #00c);
}
.cm-callee {
  color: var(--playground-code-callee-color, #000);
}

.CodeMirror-composing {
  border-bottom: 2px solid;
}

/* STOP */

/* The rest of this file contains styles related to the mechanics of
   the editor. You probably shouldn't touch them. */

.CodeMirror {
  position: relative;
  overflow: hidden;
}

.CodeMirror-scroll {
  overflow: scroll !important; /* Things will break if this is overridden */
  /* 50px is the magic margin used to hide the element's real scrollbars */
  /* See overflow: hidden in .CodeMirror */
  margin-bottom: -50px;
  margin-right: -50px;
  padding-bottom: 50px;
  height: 100%;
  outline: none; /* Prevent dragging from highlighting the element */
  position: relative;
}
.CodeMirror-sizer {
  position: relative;
  border-right: 50px solid transparent;
}

/* The fake, visible scrollbars. Used to force redraw during scrolling
   before actual scrolling happens, thus preventing shaking and
   flickering artifacts. */
.CodeMirror-vscrollbar,
.CodeMirror-hscrollbar,
.CodeMirror-scrollbar-filler,
.CodeMirror-gutter-filler {
  position: absolute;
  z-index: 6;
  display: none;
  outline: none;
}
.CodeMirror-vscrollbar {
  right: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.CodeMirror-hscrollbar {
  bottom: 0;
  left: 0;
  overflow-y: hidden;
  overflow-x: scroll;
}
.CodeMirror-scrollbar-filler {
  right: 0;
  bottom: 0;
}
.CodeMirror-gutter-filler {
  left: 0;
  bottom: 0;
}

.CodeMirror-gutters {
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100%;
  z-index: 3;
}
.CodeMirror-gutter {
  white-space: normal;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  margin-bottom: -50px;
}
.CodeMirror-gutter-wrapper {
  position: absolute;
  z-index: 4;
  background: none !important;
  border: none !important;
}
.CodeMirror-gutter-background {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 4;
}
.CodeMirror-gutter-elt {
  position: absolute;
  cursor: default;
  z-index: 4;
}
.CodeMirror-gutter-wrapper ::selection {
  background: transparent;
}

.CodeMirror-lines {
  cursor: text;
  min-height: 1px; /* prevents collapsing before first draw */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  /* Reset some styles that the rest of the page might have set */
  border-radius: 0;
  border-width: 0;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  white-space: pre;
  word-wrap: normal;
  line-height: inherit;
  color: inherit;
  z-index: 2;
  position: relative;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  font-variant-ligatures: contextual;
}
.CodeMirror-wrap pre.CodeMirror-line,
.CodeMirror-wrap pre.CodeMirror-line-like {
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal;
}

.CodeMirror-linebackground {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
}

.CodeMirror-linewidget {
  position: relative;
  z-index: 2;
  padding: 0.1px; /* Force widget margins to stay inside of the container */
}

.CodeMirror-rtl pre {
  direction: rtl;
}

.CodeMirror-code {
  outline: none;
}

/* Force content-box sizing for the elements where we expect it */
.CodeMirror-scroll,
.CodeMirror-sizer,
.CodeMirror-gutter,
.CodeMirror-gutters,
.CodeMirror-linenumber {
  box-sizing: content-box;
}

.CodeMirror-measure {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.CodeMirror-cursor {
  position: absolute;
  pointer-events: none;
}
.CodeMirror-measure pre {
  position: static;
}

div.CodeMirror-cursors {
  visibility: hidden;
  position: relative;
  z-index: 3;
}
div.CodeMirror-dragcursors {
  visibility: visible;
}

.CodeMirror-focused div.CodeMirror-cursors {
  visibility: visible;
}

.CodeMirror-selected {
  background: var(--playground-code-selection-background, #d7d4f0);
}
.CodeMirror-focused .CodeMirror-selected {
  background: var(--playground-code-selection-background, #d7d4f0);
}
.CodeMirror-crosshair {
  cursor: crosshair;
}
.CodeMirror-line::selection,
.CodeMirror-line > span::selection,
.CodeMirror-line > span > span::selection {
  background: var(--playground-code-selection-background, #d7d4f0);
}

/* Used to force a border model for a node */
.cm-force-border {
  padding-right: 0.1px;
}

@media print {
  /* Hide the cursor when printing */
  .CodeMirror div.CodeMirror-cursors {
    visibility: hidden;
  }
}

/* See issue #2901 */
.cm-tab-wrap-hack:after {
  content: '';
}

/* Help users use markselection to safely style text background */
span.CodeMirror-selectedtext {
  background: none;
}
`
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;let tn=class extends ce{constructor(){super(...arguments),this.lineNumbers=!1,this.readonly=!1,this.pragmas="on",this._showKeyboardHelp=!1,this._resizing=!1,this._valueChangingFromOutside=!1,this._ignoreValueChange=!1,this._hideOrFoldRegionsActive=!1,this._diagnosticMarkers=[],this._diagnosticsMouseoverListenerActive=!1,this._onMouseOverWithDiagnostics=e=>{var t,r,o;if(!(null===(t=this.diagnostics)||void 0===t?void 0:t.length))return;const i=null===(r=e.target.className)||void 0===r?void 0:r.match(/diagnostic-(\d+)/);if(null===i)return void(this._tooltipDiagnostic=void 0);const n=Number(i[1]),a=this.diagnostics[n];if(a===(null===(o=this._tooltipDiagnostic)||void 0===o?void 0:o.diagnostic))return;let s="";const l=this.getBoundingClientRect(),d=e.target.getBoundingClientRect(),c=l.y+l.height/2;d.y<c?s+=`top:${d.y+d.height-l.y}px;`:s+=`bottom:${l.bottom-d.y}px;`;const p=l.x+l.width/2;d.left<p?s+=`left:${Math.max(0,d.x-l.x)}px`:s+=`right:${Math.max(0,l.right-d.right)}px`,this._tooltipDiagnostic={diagnostic:a,position:s}}}get value(){return this._value}set value(e){const t=this._value;this._value=e,this.requestUpdate("value",t)}update(e){var t;const r=this._codemirror;if(void 0===r)this._createView();else{const o=e;for(const e of o.keys())switch(e){case"value":this._valueChangingFromOutside=!0,r.setValue(null!==(t=this.value)&&void 0!==t?t:""),this._valueChangingFromOutside=!1;break;case"lineNumbers":r.setOption("lineNumbers",this.lineNumbers);break;case"type":r.setOption("mode",this._getLanguageMode());break;case"readonly":r.setOption("readOnly",this.readonly);break;case"pragmas":this._applyHideAndFoldRegions();break;case"diagnostics":this._showDiagnostics()}}super.update(e)}render(){var e,t;return this.readonly?this._cmDom:B`
      <div
        id="focusContainer"
        tabindex="0"
        @mousedown=${this._onMousedown}
        @focus=${this._onFocus}
        @blur=${this._onBlur}
        @keydown=${this._onKeyDown}
      >
        ${this._showKeyboardHelp?B`<div id="keyboardHelpScrim">
              <p id="keyboardHelp" part="dialog">
                Press <strong>Enter</strong> to start editing<br />
                Press <strong>Escape</strong> to exit editor
              </p>
            </div>`:_}
        ${this._cmDom}
        <div
          id="tooltip"
          ?hidden=${!this._tooltipDiagnostic}
          style=${Yt(null===(e=this._tooltipDiagnostic)||void 0===e?void 0:e.position)}
        >
          <div part="diagnostic-tooltip">
            ${null===(t=this._tooltipDiagnostic)||void 0===t?void 0:t.diagnostic.message}
          </div>
        </div>
      </div>
    `}connectedCallback(){"function"==typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver((()=>{var e;this._resizing||(this._resizing=!0,null===(e=this._codemirror)||void 0===e||e.refresh(),this._resizing=!1)})),this._resizeObserver.observe(this)),super.connectedCallback()}disconnectedCallback(){var e;null===(e=this._resizeObserver)||void 0===e||e.disconnect(),this._resizeObserver=void 0,super.disconnectedCallback()}_createView(){var e;const t=$i((e=>{this._cmDom=e,this._resizing=!0,requestAnimationFrame((()=>{requestAnimationFrame((()=>{var e;null===(e=this._codemirror)||void 0===e||e.refresh(),this._resizing=!1}))}))}),{value:null!==(e=this.value)&&void 0!==e?e:"",lineNumbers:this.lineNumbers,mode:this._getLanguageMode(),readOnly:this.readonly,inputStyle:"contenteditable",tabindex:-1,extraKeys:{Tab:()=>{var e;t.replaceSelection(Array(null!==(e=t.getOption("indentUnit"))&&void 0!==e?e:2).join(" "))}}});t.on("change",(()=>{this._ignoreValueChange||(this._value=t.getValue(),this._valueChangingFromOutside?(this._applyHideAndFoldRegions(),this._showDiagnostics()):this.dispatchEvent(new Event("change")))})),this._codemirror=t}_onMousedown(){var e;null===(e=this._codemirrorEditable)||void 0===e||e.focus()}_onFocus(){this._showKeyboardHelp=!0}_onBlur(){this._showKeyboardHelp=!1}_onKeyDown(e){var t,r;"Enter"===e.key&&e.target===this._focusContainer?(null===(t=this._codemirrorEditable)||void 0===t||t.focus(),e.preventDefault()):"Escape"===e.key&&(null===(r=this._focusContainer)||void 0===r||r.focus())}async _applyHideAndFoldRegions(){const e=this._codemirror;if(!e)return;const t=e.getValue();if(this._hideOrFoldRegionsActive&&(await null,this._ignoreValueChange=!0,e.setValue(""),e.setValue(t),this._ignoreValueChange=!1),this._hideOrFoldRegionsActive=!1,"off-visible"===this.pragmas)return;const r=this._maskPatternForLang();if(void 0===r)return;const o=e.getDoc(),i=(t,r)=>{e.foldCode(0,{widget:"…",rangeFinder:()=>({from:o.posFromIndex(t),to:o.posFromIndex(r)})}),this._hideOrFoldRegionsActive=!0},n=(e,t)=>{o.markText(o.posFromIndex(e),o.posFromIndex(t),{collapsed:!0}),this._hideOrFoldRegionsActive=!0};for(const e of t.matchAll(r)){const[,r,o,a,s]=e,l=e.index;if(void 0===l)continue;const d=l+r.length;n(l,d);const c=d;let p;a&&s?(p=c+a.length,n(p,p+s.length)):p=t.length,"on"===this.pragmas&&("fold"===o?i(c,p):"hide"===o&&n(c,p))}}_maskPatternForLang(){switch(this.type){case"js":case"ts":case"css":return/( *\/\* *playground-(?<kind>hide|fold) *\*\/\n?)(?:(.*?)( *\/\* *playground-\k<kind>-end *\*\/\n?))?/gs;case"html":return/( *<!-- *playground-(?<kind>hide|fold) *-->\n?)(?:(.*?)( *<!-- *playground-\k<kind>-end *-->\n?))?/gs;default:return}}_getLanguageMode(){switch(this.type){case"ts":return"google-typescript";case"js":case"json":return"google-javascript";case"html":return"google-html";case"css":return"css"}}_showDiagnostics(){const e=this._codemirror;void 0!==e&&e.operation((()=>{var t,r,o;for(this._tooltipDiagnostic=void 0;this._diagnosticMarkers.length>0;)this._diagnosticMarkers.pop().clear();if(null===(t=this.diagnostics)||void 0===t?void 0:t.length){this._diagnosticsMouseoverListenerActive||(null===(o=this._cmDom)||void 0===o||o.addEventListener("mouseover",this._onMouseOverWithDiagnostics),this._diagnosticsMouseoverListenerActive=!0);for(let t=0;t<this.diagnostics.length;t++){const r=this.diagnostics[t];this._diagnosticMarkers.push(e.markText({line:r.range.start.line,ch:r.range.start.character},{line:r.range.end.line,ch:r.range.end.character},{className:"diagnostic diagnostic-"+t}))}}else this._diagnosticsMouseoverListenerActive&&(null===(r=this._cmDom)||void 0===r||r.removeEventListener("mouseover",this._onMouseOverWithDiagnostics),this._diagnosticsMouseoverListenerActive=!1)}))}};tn.styles=[le`
      :host {
        display: block;
      }

      #focusContainer {
        height: 100%;
        position: relative;
      }
      #focusContainer:focus {
        outline: none;
      }

      .CodeMirror {
        height: 100% !important;
        border-radius: inherit;
      }

      #keyboardHelpScrim {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        z-index: 9;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.32);
      }

      #keyboardHelp {
        background: #fff;
        color: #000;
        padding: 20px 40px;
        border-radius: 5px;
        font-family: sans-serif;
        font-size: 18px;
        line-height: 32px;
        box-shadow: rgba(0, 0, 0, 0.3) 0 2px 10px;
      }

      .CodeMirror-foldmarker {
        font-family: sans-serif;
      }
      .CodeMirror-foldmarker:hover {
        cursor: pointer;
        /* Pretty much any color from the theme is good enough. */
        color: var(--playground-code-keyword-color, #770088);
      }

      .diagnostic {
        position: relative;
      }

      .diagnostic::before {
        /* It would be nice to use "text-decoration: red wavy underline" here,
           but unfortunately it renders nothing at all for single characters.
           See https://bugs.chromium.org/p/chromium/issues/detail?id=668042. */
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==');
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }

      #tooltip {
        position: absolute;
        padding: 7px;
        z-index: 4;
        font-family: var(--playground-code-font-family, monospace);
      }

      #tooltip > div {
        background: var(--playground-code-background, #fff);
        color: var(--playground-code-default-color, #000);
        /* Kind of hacky... line number color tends to work out as a good
           default border, because it's usually visible on top of the
           background, but slightly muted. */
        border: 1px solid var(--playground-code-linenumber-color, #ccc);
        padding: 5px;
      }
    `,en],o([ee()],tn.prototype,"type",void 0),o([ee({type:Boolean,attribute:"line-numbers",reflect:!0})],tn.prototype,"lineNumbers",void 0),o([ee({type:Boolean,reflect:!0})],tn.prototype,"readonly",void 0),o([ee({attribute:!1})],tn.prototype,"diagnostics",void 0),o([ee()],tn.prototype,"pragmas",void 0),o([te()],tn.prototype,"_tooltipDiagnostic",void 0),o([te()],tn.prototype,"_showKeyboardHelp",void 0),o([re("#focusContainer")],tn.prototype,"_focusContainer",void 0),o([re(".CodeMirror-code")],tn.prototype,"_codemirrorEditable",void 0),tn=o([X("playground-code-editor")],tn);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let rn=class extends Ki{constructor(){super(...arguments),this.lineNumbers=!1,this.pragmas="on",this.readonly=!1,this._onProjectFilesChanged=()=>{var e,t;null!==(e=this.filename)&&void 0!==e||(this.filename=null===(t=this._files[0])||void 0===t?void 0:t.name),this.requestUpdate()},this._onCompileDone=()=>{this.requestUpdate()},this._onDiagnosticsChanged=()=>{this.requestUpdate()}}get _files(){var e,t;return null!==(t=null===(e=this._project)||void 0===e?void 0:e.files)&&void 0!==t?t:[]}get _currentFile(){return this.filename?this._files.find((e=>e.name===this.filename)):void 0}async update(e){if(e.has("_project")){const t=e.get("_project");t&&(t.removeEventListener("filesChanged",this._onProjectFilesChanged),t.removeEventListener("compileDone",this._onCompileDone),t.removeEventListener("diagnosticsChanged",this._onDiagnosticsChanged)),this._project&&(this._project.addEventListener("filesChanged",this._onProjectFilesChanged),this._project.addEventListener("compileDone",this._onCompileDone),this._project.addEventListener("diagnosticsChanged",this._onDiagnosticsChanged)),this._onProjectFilesChanged()}super.update(e)}render(){var e,t,r,o,i,n;return B`
      ${this._files?B`
            <playground-code-editor
              exportparts="diagnostic-tooltip, dialog"
              .value=${hi(null!==(t=null===(e=this._currentFile)||void 0===e?void 0:e.content)&&void 0!==t?t:"")}
              .type=${this._currentFile?on(this._currentFile.contentType):void 0}
              .lineNumbers=${this.lineNumbers}
              .readonly=${this.readonly||!this._currentFile}
              .pragmas=${this.pragmas}
              .diagnostics=${null===(o=null===(r=this._project)||void 0===r?void 0:r.diagnostics)||void 0===o?void 0:o.get(null!==(n=null===(i=this._currentFile)||void 0===i?void 0:i.name)&&void 0!==n?n:"")}
              @change=${this._onEdit}
            >
            </playground-code-editor>
          `:B`<slot></slot>`}
    `}_onEdit(){var e;const t=this._editor.value;this._currentFile&&(this._currentFile.content=t,null===(e=this._project)||void 0===e||e.saveDebounced())}};rn.styles=le`
    :host {
      display: block;
      /* Prevents scrollbars from changing container size and shifting layout
      slightly. */
      box-sizing: border-box;
      height: 350px;
    }

    slot {
      height: 100%;
      display: block;
      background: var(--playground-code-background, unset);
    }

    playground-code-editor {
      height: 100%;
      border-radius: inherit;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  `,o([re("playground-code-editor")],rn.prototype,"_editor",void 0),o([ee()],rn.prototype,"filename",void 0),o([ee({type:Boolean,attribute:"line-numbers"})],rn.prototype,"lineNumbers",void 0),o([ee()],rn.prototype,"pragmas",void 0),o([ee({type:Boolean,reflect:!0})],rn.prototype,"readonly",void 0),rn=o([X("playground-file-editor")],rn);const on=e=>{if(void 0===e)return;const t=e.indexOf(";");switch(-1!==t&&(e=e.substring(0,t)),e){case"video/mp2t":return"ts";case"text/javascript":case"application/javascript":return"js";case"application/json":return"json";case"text/html":return"html";case"text/css":return"css"}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */window.JSCompiler_renameProperty=(e,t)=>e;const nn={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},an=(e,t)=>t!==e&&(t==t||e==e),sn={attribute:!0,type:String,converter:nn,reflect:!1,hasChanged:an};class ln extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=sn){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||sn}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=an){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||nn,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||nn.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=sn){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}ln.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const dn=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function cn(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):dn(e,t)}function pn(e){return cn({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}const un=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,hn=Symbol();class gn{constructor(e,t){if(t!==hn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(un?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const mn={};class fn extends ln{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!un){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new gn(t+"",hn)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?un?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==mn&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return mn}}fn.finalized=!0,fn.render=J;class yn extends fn{constructor(){super(...arguments),this.indeterminate=!1,this.progress=0,this.buffer=1,this.reverse=!1,this.closed=!1,this.stylePrimaryHalf="",this.stylePrimaryFull="",this.styleSecondaryQuarter="",this.styleSecondaryHalf="",this.styleSecondaryFull="",this.animationReady=!0,this.closedAnimationOff=!1,this.resizeObserver=null}connectedCallback(){super.connectedCallback(),this.rootEl&&this.attachResizeObserver()}render(){const e={"mdc-linear-progress--closed":this.closed,"mdc-linear-progress--closed-animation-off":this.closedAnimationOff,"mdc-linear-progress--indeterminate":this.indeterminate,"mdc-linear-progress--animation-ready":this.animationReady},t={"--mdc-linear-progress-primary-half":this.stylePrimaryHalf,"--mdc-linear-progress-primary-half-neg":""!==this.stylePrimaryHalf?"-"+this.stylePrimaryHalf:"","--mdc-linear-progress-primary-full":this.stylePrimaryFull,"--mdc-linear-progress-primary-full-neg":""!==this.stylePrimaryFull?"-"+this.stylePrimaryFull:"","--mdc-linear-progress-secondary-quarter":this.styleSecondaryQuarter,"--mdc-linear-progress-secondary-quarter-neg":""!==this.styleSecondaryQuarter?"-"+this.styleSecondaryQuarter:"","--mdc-linear-progress-secondary-half":this.styleSecondaryHalf,"--mdc-linear-progress-secondary-half-neg":""!==this.styleSecondaryHalf?"-"+this.styleSecondaryHalf:"","--mdc-linear-progress-secondary-full":this.styleSecondaryFull,"--mdc-linear-progress-secondary-full-neg":""!==this.styleSecondaryFull?"-"+this.styleSecondaryFull:""},r={"flex-basis":this.indeterminate?"100%":100*this.buffer+"%"},o={transform:this.indeterminate?"scaleX(1)":`scaleX(${this.progress})`};return B`
      <div
          role="progressbar"
          class="mdc-linear-progress ${Dt(e)}"
          style="${Bt(t)}"
          dir="${Yt(this.reverse?"rtl":void 0)}"
          aria-label="${Yt(this.ariaLabel)}"
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow="${Yt(this.indeterminate?void 0:this.progress)}"
        @transitionend="${this.syncClosedState}">
        <div class="mdc-linear-progress__buffer">
          <div
            class="mdc-linear-progress__buffer-bar"
            style=${Bt(r)}>
          </div>
          <div class="mdc-linear-progress__buffer-dots"></div>
        </div>
        <div
            class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
            style=${Bt(o)}>
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>`}update(e){!e.has("closed")||this.closed&&void 0!==e.get("closed")||this.syncClosedState(),super.update(e)}async firstUpdated(e){super.firstUpdated(e),this.attachResizeObserver()}syncClosedState(){this.closedAnimationOff=this.closed}updated(e){!e.has("indeterminate")&&e.has("reverse")&&this.indeterminate&&this.restartAnimation(),e.has("indeterminate")&&void 0!==e.get("indeterminate")&&this.indeterminate&&window.ResizeObserver&&this.calculateAndSetAnimationDimensions(this.rootEl.offsetWidth),super.updated(e)}disconnectedCallback(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),super.disconnectedCallback()}attachResizeObserver(){if(window.ResizeObserver)return this.resizeObserver=new window.ResizeObserver((e=>{if(this.indeterminate)for(const t of e)if(t.contentRect){const e=t.contentRect.width;this.calculateAndSetAnimationDimensions(e)}})),void this.resizeObserver.observe(this.rootEl);this.resizeObserver=null}calculateAndSetAnimationDimensions(e){const t=.8367142*e,r=2.00611057*e,o=.37651913*e,i=.84386165*e,n=1.60277782*e;this.stylePrimaryHalf=t+"px",this.stylePrimaryFull=r+"px",this.styleSecondaryQuarter=o+"px",this.styleSecondaryHalf=i+"px",this.styleSecondaryFull=n+"px",this.restartAnimation()}async restartAnimation(){this.animationReady=!1,await this.updateComplete,await new Promise(requestAnimationFrame),this.animationReady=!0,await this.updateComplete}open(){this.closed=!1}close(){this.closed=!0}}o([function(e,t){return(t,r)=>{const o={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};return void 0!==r?((e,t,r)=>{Object.defineProperty(t,r,e)})(o,t,r):((e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}))
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/(o,t)}}(".mdc-linear-progress")],yn.prototype,"rootEl",void 0),o([cn({type:Boolean,reflect:!0})],yn.prototype,"indeterminate",void 0),o([cn({type:Number})],yn.prototype,"progress",void 0),o([cn({type:Number})],yn.prototype,"buffer",void 0),o([cn({type:Boolean,reflect:!0})],yn.prototype,"reverse",void 0),o([cn({type:Boolean,reflect:!0})],yn.prototype,"closed",void 0),o([Kt,cn({attribute:"aria-label"})],yn.prototype,"ariaLabel",void 0),o([pn()],yn.prototype,"stylePrimaryHalf",void 0),o([pn()],yn.prototype,"stylePrimaryFull",void 0),o([pn()],yn.prototype,"styleSecondaryQuarter",void 0),o([pn()],yn.prototype,"styleSecondaryHalf",void 0),o([pn()],yn.prototype,"styleSecondaryFull",void 0),o([pn()],yn.prototype,"animationReady",void 0),o([pn()],yn.prototype,"closedAnimationOff",void 0);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const bn=((e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof gn)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new gn(r,hn)})`@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half, 83.67142%))}100%{transform:translateX(200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full, 200.611057%))}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter, 37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half, 84.386165%))}100%{transform:translateX(160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full, 160.277782%))}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(-10px)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half-neg, -83.67142%))}100%{transform:translateX(-200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full-neg, -200.611057%))}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter-neg, -37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half-neg, -84.386165%))}100%{transform:translateX(-160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full-neg, -160.277782%))}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}.mdc-linear-progress{position:relative;width:100%;height:4px;transform:translateZ(0);outline:1px solid transparent;overflow:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar{position:absolute;width:100%;height:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top:4px solid}.mdc-linear-progress__buffer{display:flex;position:absolute;width:100%;height:100%}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;background-size:10px 4px;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{visibility:hidden}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;visibility:visible}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__bar{right:0;-webkit-transform-origin:center right;transform-origin:center right}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__buffer-dots,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}.mdc-linear-progress--closed{opacity:0}.mdc-linear-progress--closed-animation-off .mdc-linear-progress__buffer-dots{animation:none}.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar,.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar .mdc-linear-progress__bar-inner{animation:none}.mdc-linear-progress__bar-inner{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E")}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6}:host{display:block}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6;background-color:var(--mdc-linear-progress-buffer-color, #e6e6e6)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E");background-image:var(--mdc-linear-progress-buffering-dots-image, url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E"))}`;let vn=class extends yn{};vn.styles=bn,vn=o([e=>{return"function"==typeof e?(t=e,window.customElements.define("mwc-linear-progress",t),t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(e){window.customElements.define("mwc-linear-progress",e)}}})(0,e);var t}],vn);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let xn=class extends Ki{constructor(){super(...arguments),this.location="Result",this._loading=!0,this._showLoadingBar=!1,this._loadedAtLeastOnce=!1,this.reload=()=>{this._iframe&&(this._iframe.src="",this._iframe.src=this._indexUrl,this._loading=!0,this._showLoadingBar=!0)}}update(e){if(e.has("_project")){const t=e.get("_project");t&&(t.removeEventListener("urlChanged",this.reload),t.removeEventListener("compileStart",this.reload)),this._project&&(this._project.addEventListener("urlChanged",this.reload),this._project.addEventListener("compileStart",this.reload))}super.update(e)}get _indexUrl(){var e;const t=null===(e=this._project)||void 0===e?void 0:e.baseUrl;return t?new URL("index.html",t).toString():""}render(){return B`
      <div id="toolbar" part="preview-toolbar">
        <span id="location" part="preview-location"> ${this.location}</span>
        <mwc-icon-button
          id="reload-button"
          label="Reload preview"
          part="preview-reload-button"
          ?disabled=${!this._indexUrl}
          @click=${this.reload}
        >
          <!-- Source: https://material.io/resources/icons/?icon=refresh&style=baseline -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentcolor"
            width="18px"
            height="18px"
          >
            <path
              d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            />
          </svg>
        </mwc-icon-button>
      </div>

      <div id="content">
        <mwc-linear-progress
          aria-hidden=${this._loading?"false":"true"}
          part="preview-loading-indicator"
          indeterminate
          ?closed=${!this._showLoadingBar}
        ></mwc-linear-progress>

        ${this._loadedAtLeastOnce?_:B`<slot></slot>`}

        <iframe
          title="Project preview"
          @load=${this._onIframeLoad}
          ?hidden=${!this._loadedAtLeastOnce}
        ></iframe>
      </div>
    `}updated(){var e;(null===(e=this._iframe)||void 0===e?void 0:e.src)!==this._indexUrl&&(this._iframe.src=this._indexUrl)}async firstUpdated(){var e,t;this._loading&&!this._slotHasAnyVisibleChildren()&&(this._showLoadingBar=!0);const r=this.shadowRoot.querySelector("mwc-linear-progress");await r.updateComplete,null===(t=null===(e=r.shadowRoot)||void 0===e?void 0:e.querySelector("[role=progressbar]"))||void 0===t||t.setAttribute("aria-label","Preview is loading")}_slotHasAnyVisibleChildren(){var e;const t=null===(e=this._slot)||void 0===e?void 0:e.assignedNodes({flatten:!0});if(!t)return!1;for(const e of t)if(e.nodeType!==Node.COMMENT_NODE&&(e.nodeType!==Node.TEXT_NODE||""!==(e.textContent||"").trim()))return!0;return!1}_onIframeLoad(){this._indexUrl&&(this._loading=!1,this._loadedAtLeastOnce=!0,this._showLoadingBar=!1)}};xn.styles=le`
    :host {
      display: flex;
      flex-direction: column;
      background: white;
      font-family: sans-serif;
      height: 350px;
    }

    #toolbar {
      flex: 0 0 var(--playground-bar-height, 40px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: var(--playground-border, solid 1px #ddd);
      font-size: 15px;
      color: var(--playground-preview-toolbar-foreground-color, #444);
      border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background: var(--playground-preview-toolbar-background, white);
    }

    #location {
      margin: 0 10px;
    }

    #reload-button {
      --mdc-icon-button-size: 30px;
      --mdc-icon-size: 18px;
    }

    #content {
      max-height: 100%;
      position: relative;
      flex: 1;
    }

    mwc-linear-progress {
      /* There is no way to directly specify the height of a linear progress
      bar, but zooming works well enough. It's 4px by default, and we want it to
      be 2px to match the tab bar indicator.*/
      zoom: 0.5;
      --mdc-linear-progress-buffer-color: transparent;
      position: absolute;
      top: -6px;
      width: 100%;
      --mdc-theme-primary: var(--playground-highlight-color, #6200ee);
    }

    iframe,
    slot {
      width: 100%;
      height: 100%;
    }

    iframe {
      border: none;
    }

    [hidden] {
      display: none;
    }
  `,o([ee()],xn.prototype,"location",void 0),o([re("iframe")],xn.prototype,"_iframe",void 0),o([re("slot")],xn.prototype,"_slot",void 0),o([te()],xn.prototype,"_loading",void 0),o([te()],xn.prototype,"_showLoadingBar",void 0),o([te()],xn.prototype,"_loadedAtLeastOnce",void 0),xn=o([X("playground-preview")],xn);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let _n=class extends ce{constructor(){super(...arguments),this.sandboxBaseUrl="https://unpkg.com/playground-elements@0.9.4/",this.sandboxScope="playground-projects/",this.editableFileSystem=!1,this.lineNumbers=!1,this.resizable=!1,this.pragmas="on"}get projectSrc(){var e,t;return null!==(t=null===(e=this._project)||void 0===e?void 0:e.projectSrc)&&void 0!==t?t:this._projectSrcSetBeforeRender}set projectSrc(e){const t=this._project;t?t.projectSrc=e:this._projectSrcSetBeforeRender=e}get config(){var e,t;return null!==(t=null===(e=this._project)||void 0===e?void 0:e.config)&&void 0!==t?t:this._configSetBeforeRender}set config(e){const t=this._project;t?t.config=e:this._configSetBeforeRender=e}render(){const e="project",t="editor";return B`
      <playground-project
        id=${e}
        .sandboxBaseUrl=${this.sandboxBaseUrl}
        .sandboxScope=${this.sandboxScope}
      >
        <slot></slot>
      </playground-project>

      <div id="lhs">
        <playground-tab-bar
          part="tab-bar"
          .project=${e}
          .editor=${t}
          .editableFileSystem=${this.editableFileSystem}
        >
        </playground-tab-bar>

        <playground-file-editor
          id=${t}
          part="editor"
          .lineNumbers=${this.lineNumbers}
          .project=${e}
          .pragmas=${this.pragmas}
        >
        </playground-file-editor>
      </div>

      <div id="rhs">
        ${this.resizable?B`<div
              id="resizeBar"
              @pointerdown=${this._onResizeBarPointerdown}
            ></div>`:_}

        <playground-preview
          part="preview"
          exportparts="preview-toolbar,
                       preview-location,
                       preview-reload-button,
                       preview-loading-indicator,
                       diagnostic-tooltip,
                       dialog"
          .project=${e}
        ></playground-preview>
      </div>
    `}firstUpdated(){this._configSetBeforeRender&&(this._project.config=this._configSetBeforeRender,this._configSetBeforeRender=void 0),this._projectSrcSetBeforeRender&&(this._project.projectSrc=this._projectSrcSetBeforeRender,this._projectSrcSetBeforeRender=void 0)}async update(e){var t;e.has("resizable")&&!1===this.resizable&&(null===(t=this._rhs)||void 0===t||t.style.removeProperty("--playground-preview-width")),super.update(e)}_onResizeBarPointerdown({pointerId:e}){const t=this._resizeBar;t.setPointerCapture(e);const r=this._rhs.style,{left:o,right:i}=this.getBoundingClientRect(),n=i-o,a=n-100,s=e=>{const t=Math.min(a,Math.max(100,i-e.clientX))/n*100;r.setProperty("--playground-preview-width",t+"%")};t.addEventListener("pointermove",s);const l=()=>{t.releasePointerCapture(e),t.removeEventListener("pointermove",s),t.removeEventListener("pointerup",l)};t.addEventListener("pointerup",l)}};_n.styles=le`
    :host {
      display: flex;
      height: 350px;
      min-width: 200px;
      border: var(--playground-border, solid 1px #ddd);
      /* The invisible resize bar has a high z-index so that it's above
      CodeMirror. But we don't want it also above other elements on the page.
      Force a new stacking context. */
      isolation: isolate;
    }

    #lhs {
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1;
      min-width: 100px;
      overflow: hidden;
      border-radius: inherit;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: var(--playground-border, solid 1px #ddd);
    }

    playground-tab-bar {
      flex-shrink: 0;
    }

    playground-file-editor {
      flex: 1;
      height: calc(100% - var(--playground-bar-height, 40px));
    }

    #rhs {
      height: 100%;
      width: max(100px, var(--playground-preview-width, 30%));
      position: relative;
      border-radius: inherit;
    }

    playground-preview {
      height: 100%;
      width: 100%;
      border-radius: inherit;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    slot {
      display: none;
    }

    #resizeBar {
      position: absolute;
      top: 0;
      left: -5px;
      width: 10px;
      height: 100%;
      z-index: 9;
      cursor: col-resize;
    }

    #resizeOverlay {
      display: none;
    }
    #resizeOverlay.resizing {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99999;
      cursor: col-resize;
    }
  `,o([ee({attribute:"project-src",hasChanged:()=>!1})],_n.prototype,"projectSrc",null),o([ee({attribute:!1,hasChanged:()=>!1})],_n.prototype,"config",null),o([ee({attribute:"sandbox-base-url"})],_n.prototype,"sandboxBaseUrl",void 0),o([ee({attribute:"sandbox-scope"})],_n.prototype,"sandboxScope",void 0),o([ee({type:Boolean,attribute:"editable-file-system"})],_n.prototype,"editableFileSystem",void 0),o([ee({type:Boolean,attribute:"line-numbers"})],_n.prototype,"lineNumbers",void 0),o([ee({type:Boolean})],_n.prototype,"resizable",void 0),o([ee()],_n.prototype,"pragmas",void 0),o([re("playground-project")],_n.prototype,"_project",void 0),o([re("#resizeBar")],_n.prototype,"_resizeBar",void 0),o([re("#rhs")],_n.prototype,"_rhs",void 0),_n=o([X("playground-ide")],_n);const wn=[le`
.playground-theme-3024-day {
  --playground-code-background: rgb(247, 247, 247);
  --playground-code-default-color: rgb(58, 52, 50);
  --playground-code-cursor-color: rgb(92, 88, 85);
  --playground-code-selection-background: rgb(214, 213, 212);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(128, 125, 124);
  --playground-code-atom-color: rgb(161, 106, 148);
  --playground-code-attribute-color: rgb(1, 162, 82);
  --playground-code-builtin-color: rgb(58, 52, 50);
  --playground-code-comment-color: rgb(205, 171, 83);
  --playground-code-def-color: rgb(232, 187, 208);
  --playground-code-keyword-color: rgb(219, 45, 32);
  --playground-code-meta-color: rgb(58, 52, 50);
  --playground-code-number-color: rgb(161, 106, 148);
  --playground-code-operator-color: rgb(58, 52, 50);
  --playground-code-qualifier-color: rgb(58, 52, 50);
  --playground-code-string-color: rgb(253, 237, 2);
  --playground-code-string-2-color: rgb(58, 52, 50);
  --playground-code-tag-color: rgb(219, 45, 32);
  --playground-code-type-color: rgb(58, 52, 50);
  --playground-code-variable-color: rgb(1, 162, 82);
  --playground-code-variable-2-color: rgb(1, 160, 228);
  --playground-code-variable-3-color: rgb(58, 52, 50);
  --playground-code-callee-color: rgb(58, 52, 50);
  --playground-code-property-color: rgb(1, 162, 82)
}
`,le`
.playground-theme-3024-night {
  --playground-code-background: rgb(9, 3, 0);
  --playground-code-default-color: rgb(214, 213, 212);
  --playground-code-cursor-color: rgb(128, 125, 124);
  --playground-code-selection-background: rgb(58, 52, 50);
  --playground-code-gutter-background: rgb(9, 3, 0);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(92, 88, 85);
  --playground-code-atom-color: rgb(161, 106, 148);
  --playground-code-attribute-color: rgb(1, 162, 82);
  --playground-code-builtin-color: rgb(214, 213, 212);
  --playground-code-comment-color: rgb(205, 171, 83);
  --playground-code-def-color: rgb(232, 187, 208);
  --playground-code-keyword-color: rgb(219, 45, 32);
  --playground-code-meta-color: rgb(214, 213, 212);
  --playground-code-number-color: rgb(161, 106, 148);
  --playground-code-operator-color: rgb(214, 213, 212);
  --playground-code-qualifier-color: rgb(214, 213, 212);
  --playground-code-string-color: rgb(253, 237, 2);
  --playground-code-string-2-color: rgb(214, 213, 212);
  --playground-code-tag-color: rgb(219, 45, 32);
  --playground-code-type-color: rgb(214, 213, 212);
  --playground-code-variable-color: rgb(1, 162, 82);
  --playground-code-variable-2-color: rgb(1, 160, 228);
  --playground-code-variable-3-color: rgb(214, 213, 212);
  --playground-code-callee-color: rgb(214, 213, 212);
  --playground-code-property-color: rgb(1, 162, 82)
}
`,le`
.playground-theme-abcdef {
  --playground-code-background: rgb(15, 15, 15);
  --playground-code-default-color: rgb(222, 253, 239);
  --playground-code-cursor-color: rgb(0, 255, 0);
  --playground-code-selection-background: rgb(81, 81, 81);
  --playground-code-gutter-background: rgb(85, 85, 85);
  --playground-code-gutter-border-right: 2px solid rgb(49, 65, 81);
  --playground-code-linenumber-color: rgb(255, 255, 255);
  --playground-code-atom-color: rgb(119, 119, 255);
  --playground-code-attribute-color: rgb(221, 255, 0);
  --playground-code-builtin-color: rgb(48, 170, 188);
  --playground-code-comment-color: rgb(122, 123, 124);
  --playground-code-def-color: rgb(255, 250, 188);
  --playground-code-keyword-color: rgb(184, 134, 11);
  --playground-code-meta-color: rgb(204, 153, 255);
  --playground-code-number-color: rgb(238, 130, 238);
  --playground-code-operator-color: rgb(255, 255, 0);
  --playground-code-qualifier-color: rgb(255, 247, 0);
  --playground-code-string-color: rgb(34, 187, 68);
  --playground-code-string-2-color: rgb(222, 253, 239);
  --playground-code-tag-color: rgb(255, 221, 68);
  --playground-code-type-color: rgb(221, 238, 255);
  --playground-code-variable-color: rgb(171, 205, 239);
  --playground-code-variable-2-color: rgb(202, 203, 204);
  --playground-code-variable-3-color: rgb(221, 238, 255);
  --playground-code-callee-color: rgb(222, 253, 239);
  --playground-code-property-color: rgb(254, 220, 186)
}
`,le`
.playground-theme-ambiance {
  --playground-code-background: rgb(32, 32, 32) url("data:image/png;base64,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") repeat scroll 0% 0%/auto padding-box border-box;
  --playground-code-default-color: rgb(230, 225, 220);
  --playground-code-cursor-color: rgb(121, 145, 232);
  --playground-code-selection-background: rgba(255, 255, 255, 0.15);
  --playground-code-gutter-background: rgb(61, 61, 61) url("data:image/png;base64,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") repeat scroll 0% 0%/auto padding-box border-box;
  --playground-code-gutter-border-right: 1px solid rgb(77, 77, 77);
  --playground-code-gutter-box-shadow: rgb(0, 0, 0) 0px 10px 20px 0px;
  --playground-code-linenumber-color: rgb(17, 17, 17);
  --playground-code-atom-color: rgb(207, 126, 169);
  --playground-code-attribute-color: rgb(155, 133, 157);
  --playground-code-builtin-color: rgb(153, 153, 204);
  --playground-code-comment-color: rgb(85, 85, 85);
  --playground-code-def-color: rgb(170, 198, 227);
  --playground-code-keyword-color: rgb(205, 168, 105);
  --playground-code-meta-color: rgb(210, 168, 161);
  --playground-code-number-color: rgb(120, 207, 138);
  --playground-code-operator-color: rgb(250, 141, 106);
  --playground-code-qualifier-color: rgb(255, 255, 0);
  --playground-code-string-color: rgb(143, 157, 106);
  --playground-code-string-2-color: rgb(157, 147, 124);
  --playground-code-tag-color: rgb(254, 228, 255);
  --playground-code-type-color: rgb(250, 222, 211);
  --playground-code-variable-color: rgb(255, 183, 149);
  --playground-code-variable-2-color: rgb(238, 209, 179);
  --playground-code-variable-3-color: rgb(250, 222, 211);
  --playground-code-callee-color: rgb(230, 225, 220);
  --playground-code-property-color: rgb(238, 209, 179)
}
`,le`
.playground-theme-ayu-dark {
  --playground-code-background: rgb(10, 14, 20);
  --playground-code-default-color: rgb(179, 177, 173);
  --playground-code-cursor-color: rgb(230, 180, 80);
  --playground-code-selection-background: rgb(39, 55, 71);
  --playground-code-gutter-background: rgb(10, 14, 20);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(61, 66, 77);
  --playground-code-atom-color: rgb(174, 129, 255);
  --playground-code-attribute-color: rgb(255, 180, 84);
  --playground-code-builtin-color: rgb(230, 180, 80);
  --playground-code-comment-color: rgb(98, 106, 115);
  --playground-code-def-color: rgb(255, 238, 153);
  --playground-code-keyword-color: rgb(255, 143, 64);
  --playground-code-meta-color: rgb(179, 177, 173);
  --playground-code-number-color: rgb(230, 180, 80);
  --playground-code-operator-color: rgb(179, 177, 173);
  --playground-code-qualifier-color: rgb(179, 177, 173);
  --playground-code-string-color: rgb(194, 217, 76);
  --playground-code-string-2-color: rgb(179, 177, 173);
  --playground-code-tag-color: rgb(57, 186, 230);
  --playground-code-type-color: rgb(255, 143, 64);
  --playground-code-variable-color: rgb(179, 177, 173);
  --playground-code-variable-2-color: rgb(240, 113, 120);
  --playground-code-variable-3-color: rgb(57, 186, 230);
  --playground-code-callee-color: rgb(179, 177, 173);
  --playground-code-property-color: rgb(255, 180, 84)
}
`,le`
.playground-theme-ayu-mirage {
  --playground-code-background: rgb(31, 36, 48);
  --playground-code-default-color: rgb(203, 204, 198);
  --playground-code-cursor-color: rgb(255, 204, 102);
  --playground-code-selection-background: rgb(52, 69, 90);
  --playground-code-gutter-background: rgb(31, 36, 48);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(61, 66, 77);
  --playground-code-atom-color: rgb(174, 129, 255);
  --playground-code-attribute-color: rgb(255, 213, 128);
  --playground-code-builtin-color: rgb(255, 204, 102);
  --playground-code-comment-color: rgb(92, 103, 115);
  --playground-code-def-color: rgb(255, 213, 128);
  --playground-code-keyword-color: rgb(255, 167, 89);
  --playground-code-meta-color: rgb(203, 204, 198);
  --playground-code-number-color: rgb(255, 204, 102);
  --playground-code-operator-color: rgb(203, 204, 198);
  --playground-code-qualifier-color: rgb(203, 204, 198);
  --playground-code-string-color: rgb(186, 230, 126);
  --playground-code-string-2-color: rgb(203, 204, 198);
  --playground-code-tag-color: rgb(92, 207, 230);
  --playground-code-type-color: rgb(255, 167, 89);
  --playground-code-variable-color: rgb(203, 204, 198);
  --playground-code-variable-2-color: rgb(242, 135, 121);
  --playground-code-variable-3-color: rgb(92, 207, 230);
  --playground-code-callee-color: rgb(203, 204, 198);
  --playground-code-property-color: rgb(242, 158, 116)
}
`,le`
.playground-theme-base16-dark {
  --playground-code-background: rgb(21, 21, 21);
  --playground-code-default-color: rgb(224, 224, 224);
  --playground-code-cursor-color: rgb(176, 176, 176);
  --playground-code-selection-background: rgb(48, 48, 48);
  --playground-code-gutter-background: rgb(21, 21, 21);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(80, 80, 80);
  --playground-code-atom-color: rgb(170, 117, 159);
  --playground-code-attribute-color: rgb(144, 169, 89);
  --playground-code-builtin-color: rgb(224, 224, 224);
  --playground-code-comment-color: rgb(143, 85, 54);
  --playground-code-def-color: rgb(210, 132, 69);
  --playground-code-keyword-color: rgb(172, 65, 66);
  --playground-code-meta-color: rgb(224, 224, 224);
  --playground-code-number-color: rgb(170, 117, 159);
  --playground-code-operator-color: rgb(224, 224, 224);
  --playground-code-qualifier-color: rgb(224, 224, 224);
  --playground-code-string-color: rgb(244, 191, 117);
  --playground-code-string-2-color: rgb(224, 224, 224);
  --playground-code-tag-color: rgb(172, 65, 66);
  --playground-code-type-color: rgb(224, 224, 224);
  --playground-code-variable-color: rgb(144, 169, 89);
  --playground-code-variable-2-color: rgb(106, 159, 181);
  --playground-code-variable-3-color: rgb(224, 224, 224);
  --playground-code-callee-color: rgb(224, 224, 224);
  --playground-code-property-color: rgb(144, 169, 89)
}
`,le`
.playground-theme-base16-light {
  --playground-code-background: rgb(245, 245, 245);
  --playground-code-default-color: rgb(32, 32, 32);
  --playground-code-cursor-color: rgb(80, 80, 80);
  --playground-code-selection-background: rgb(224, 224, 224);
  --playground-code-gutter-background: rgb(245, 245, 245);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(176, 176, 176);
  --playground-code-atom-color: rgb(170, 117, 159);
  --playground-code-attribute-color: rgb(144, 169, 89);
  --playground-code-builtin-color: rgb(32, 32, 32);
  --playground-code-comment-color: rgb(143, 85, 54);
  --playground-code-def-color: rgb(210, 132, 69);
  --playground-code-keyword-color: rgb(172, 65, 66);
  --playground-code-meta-color: rgb(32, 32, 32);
  --playground-code-number-color: rgb(170, 117, 159);
  --playground-code-operator-color: rgb(32, 32, 32);
  --playground-code-qualifier-color: rgb(32, 32, 32);
  --playground-code-string-color: rgb(244, 191, 117);
  --playground-code-string-2-color: rgb(32, 32, 32);
  --playground-code-tag-color: rgb(172, 65, 66);
  --playground-code-type-color: rgb(32, 32, 32);
  --playground-code-variable-color: rgb(144, 169, 89);
  --playground-code-variable-2-color: rgb(106, 159, 181);
  --playground-code-variable-3-color: rgb(32, 32, 32);
  --playground-code-callee-color: rgb(32, 32, 32);
  --playground-code-property-color: rgb(144, 169, 89)
}
`,le`
.playground-theme-bespin {
  --playground-code-background: rgb(40, 33, 28);
  --playground-code-default-color: rgb(157, 155, 151);
  --playground-code-cursor-color: rgb(121, 121, 119);
  --playground-code-selection-background: rgb(54, 49, 46);
  --playground-code-gutter-background: rgb(40, 33, 28);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(102, 102, 102);
  --playground-code-atom-color: rgb(155, 133, 157);
  --playground-code-attribute-color: rgb(84, 190, 13);
  --playground-code-builtin-color: rgb(157, 155, 151);
  --playground-code-comment-color: rgb(147, 113, 33);
  --playground-code-def-color: rgb(207, 125, 52);
  --playground-code-keyword-color: rgb(207, 106, 76);
  --playground-code-meta-color: rgb(157, 155, 151);
  --playground-code-number-color: rgb(155, 133, 157);
  --playground-code-operator-color: rgb(157, 155, 151);
  --playground-code-qualifier-color: rgb(157, 155, 151);
  --playground-code-string-color: rgb(249, 238, 152);
  --playground-code-string-2-color: rgb(157, 155, 151);
  --playground-code-tag-color: rgb(207, 106, 76);
  --playground-code-type-color: rgb(157, 155, 151);
  --playground-code-variable-color: rgb(84, 190, 13);
  --playground-code-variable-2-color: rgb(94, 166, 234);
  --playground-code-variable-3-color: rgb(157, 155, 151);
  --playground-code-callee-color: rgb(157, 155, 151);
  --playground-code-property-color: rgb(84, 190, 13)
}
`,le`
.playground-theme-blackboard {
  --playground-code-background: rgb(12, 16, 33);
  --playground-code-default-color: rgb(248, 248, 248);
  --playground-code-cursor-color: rgb(167, 167, 167);
  --playground-code-selection-background: rgb(37, 59, 118);
  --playground-code-gutter-background: rgb(12, 16, 33);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(136, 136, 136);
  --playground-code-atom-color: rgb(216, 250, 60);
  --playground-code-attribute-color: rgb(141, 166, 206);
  --playground-code-builtin-color: rgb(141, 166, 206);
  --playground-code-comment-color: rgb(174, 174, 174);
  --playground-code-def-color: rgb(141, 166, 206);
  --playground-code-keyword-color: rgb(251, 222, 45);
  --playground-code-meta-color: rgb(216, 250, 60);
  --playground-code-number-color: rgb(216, 250, 60);
  --playground-code-operator-color: rgb(251, 222, 45);
  --playground-code-qualifier-color: rgb(248, 248, 248);
  --playground-code-string-color: rgb(97, 206, 60);
  --playground-code-string-2-color: rgb(97, 206, 60);
  --playground-code-tag-color: rgb(141, 166, 206);
  --playground-code-type-color: rgb(248, 248, 248);
  --playground-code-variable-color: rgb(255, 100, 0);
  --playground-code-variable-2-color: rgb(248, 248, 248);
  --playground-code-variable-3-color: rgb(248, 248, 248);
  --playground-code-callee-color: rgb(248, 248, 248);
  --playground-code-property-color: rgb(248, 248, 248)
}
`,le`
.playground-theme-cobalt {
  --playground-code-background: rgb(0, 34, 64);
  --playground-code-default-color: rgb(255, 255, 255);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(179, 101, 57);
  --playground-code-gutter-background: rgb(0, 34, 64);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(132, 93, 196);
  --playground-code-attribute-color: rgb(255, 128, 225);
  --playground-code-builtin-color: rgb(255, 158, 89);
  --playground-code-comment-color: rgb(0, 136, 255);
  --playground-code-def-color: rgb(255, 255, 255);
  --playground-code-keyword-color: rgb(255, 238, 128);
  --playground-code-meta-color: rgb(255, 157, 0);
  --playground-code-number-color: rgb(255, 128, 225);
  --playground-code-operator-color: rgb(255, 255, 255);
  --playground-code-qualifier-color: rgb(255, 255, 255);
  --playground-code-string-color: rgb(58, 217, 0);
  --playground-code-string-2-color: rgb(255, 255, 255);
  --playground-code-tag-color: rgb(158, 255, 255);
  --playground-code-type-color: rgb(255, 255, 255);
  --playground-code-variable-color: rgb(255, 255, 255);
  --playground-code-variable-2-color: rgb(158, 255, 255);
  --playground-code-variable-3-color: rgb(255, 255, 255);
  --playground-code-callee-color: rgb(255, 255, 255);
  --playground-code-property-color: rgb(255, 255, 255)
}
`,le`
.playground-theme-colorforth {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-default-color: rgb(248, 248, 248);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(51, 61, 83);
  --playground-code-gutter-background: rgb(10, 0, 31);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(186, 186, 186);
  --playground-code-atom-color: rgb(96, 96, 96);
  --playground-code-attribute-color: rgb(255, 247, 0);
  --playground-code-builtin-color: rgb(0, 217, 90);
  --playground-code-comment-color: rgb(237, 237, 237);
  --playground-code-def-color: rgb(255, 28, 28);
  --playground-code-keyword-color: rgb(255, 217, 0);
  --playground-code-meta-color: rgb(255, 255, 0);
  --playground-code-number-color: rgb(0, 196, 255);
  --playground-code-operator-color: rgb(248, 248, 248);
  --playground-code-qualifier-color: rgb(255, 247, 0);
  --playground-code-string-color: rgb(0, 123, 255);
  --playground-code-string-2-color: rgb(248, 248, 248);
  --playground-code-tag-color: rgb(255, 189, 64);
  --playground-code-type-color: rgb(221, 221, 221);
  --playground-code-variable-color: rgb(115, 255, 0);
  --playground-code-variable-2-color: rgb(238, 238, 238);
  --playground-code-variable-3-color: rgb(221, 221, 221);
  --playground-code-callee-color: rgb(248, 248, 248);
  --playground-code-property-color: rgb(248, 248, 248)
}
`,le`
.playground-theme-darcula {
  --playground-code-background: rgb(43, 43, 43);
  --playground-code-default-color: rgb(169, 183, 198);
  --playground-code-cursor-color: rgb(169, 183, 198);
  --playground-code-selection-background: rgb(33, 66, 131);
  --playground-code-gutter-background: rgb(49, 51, 53);
  --playground-code-gutter-border-right: 1px solid rgb(49, 51, 53);
  --playground-code-atom-color: rgb(204, 120, 50);
  --playground-code-attribute-color: rgb(104, 151, 187);
  --playground-code-builtin-color: rgb(255, 158, 89);
  --playground-code-comment-color: rgb(97, 161, 81);
  --playground-code-def-color: rgb(169, 183, 198);
  --playground-code-keyword-color: rgb(204, 120, 50);
  --playground-code-meta-color: rgb(187, 181, 41);
  --playground-code-number-color: rgb(104, 151, 187);
  --playground-code-operator-color: rgb(169, 183, 198);
  --playground-code-qualifier-color: rgb(106, 135, 89);
  --playground-code-string-color: rgb(106, 135, 89);
  --playground-code-string-2-color: rgb(106, 135, 89);
  --playground-code-tag-color: rgb(98, 151, 85);
  --playground-code-type-color: rgb(170, 187, 204);
  --playground-code-variable-color: rgb(169, 183, 198);
  --playground-code-variable-2-color: rgb(169, 183, 198);
  --playground-code-variable-3-color: rgb(152, 118, 170);
  --playground-code-callee-color: rgb(169, 183, 198);
  --playground-code-property-color: rgb(255, 198, 109)
}
`,le`
.playground-theme-dracula {
  --playground-code-background: rgb(40, 42, 54);
  --playground-code-default-color: rgb(248, 248, 242);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-selection-background: rgba(255, 255, 255, 0.1);
  --playground-code-gutter-background: rgb(40, 42, 54);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(109, 138, 136);
  --playground-code-atom-color: rgb(189, 147, 249);
  --playground-code-attribute-color: rgb(80, 250, 123);
  --playground-code-builtin-color: rgb(80, 250, 123);
  --playground-code-comment-color: rgb(98, 114, 164);
  --playground-code-def-color: rgb(80, 250, 123);
  --playground-code-keyword-color: rgb(255, 121, 198);
  --playground-code-meta-color: rgb(248, 248, 242);
  --playground-code-number-color: rgb(189, 147, 249);
  --playground-code-operator-color: rgb(255, 121, 198);
  --playground-code-qualifier-color: rgb(80, 250, 123);
  --playground-code-string-color: rgb(241, 250, 140);
  --playground-code-string-2-color: rgb(241, 250, 140);
  --playground-code-tag-color: rgb(255, 121, 198);
  --playground-code-type-color: rgb(255, 184, 108);
  --playground-code-variable-color: rgb(80, 250, 123);
  --playground-code-variable-2-color: rgb(255, 255, 255);
  --playground-code-variable-3-color: rgb(255, 184, 108);
  --playground-code-callee-color: rgb(248, 248, 242);
  --playground-code-property-color: rgb(102, 217, 239)
}
`,le`
.playground-theme-duotone-dark {
  --playground-code-background: rgb(42, 39, 52);
  --playground-code-default-color: rgb(108, 103, 131);
  --playground-code-cursor-color: rgb(255, 173, 92);
  --playground-code-selection-background: rgb(84, 81, 103);
  --playground-code-gutter-background: rgb(42, 39, 52);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(84, 81, 103);
  --playground-code-atom-color: rgb(255, 204, 153);
  --playground-code-attribute-color: rgb(255, 204, 153);
  --playground-code-builtin-color: rgb(238, 235, 255);
  --playground-code-comment-color: rgb(108, 103, 131);
  --playground-code-def-color: rgb(238, 235, 255);
  --playground-code-keyword-color: rgb(255, 204, 153);
  --playground-code-meta-color: rgb(108, 103, 131);
  --playground-code-number-color: rgb(255, 204, 153);
  --playground-code-operator-color: rgb(255, 173, 92);
  --playground-code-qualifier-color: rgb(238, 235, 255);
  --playground-code-string-color: rgb(255, 184, 112);
  --playground-code-string-2-color: rgb(122, 99, 238);
  --playground-code-tag-color: rgb(238, 235, 255);
  --playground-code-type-color: rgb(122, 99, 238);
  --playground-code-variable-color: rgb(255, 204, 153);
  --playground-code-variable-2-color: rgb(122, 99, 238);
  --playground-code-variable-3-color: rgb(122, 99, 238);
  --playground-code-callee-color: rgb(108, 103, 131);
  --playground-code-property-color: rgb(154, 134, 253)
}
`,le`
.playground-theme-duotone-light {
  --playground-code-background: rgb(250, 248, 245);
  --playground-code-default-color: rgb(178, 151, 98);
  --playground-code-cursor-color: rgb(147, 171, 220);
  --playground-code-selection-background: rgb(227, 220, 206);
  --playground-code-gutter-background: rgb(250, 248, 245);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(205, 196, 177);
  --playground-code-atom-color: rgb(6, 50, 137);
  --playground-code-attribute-color: rgb(6, 50, 137);
  --playground-code-builtin-color: rgb(45, 32, 6);
  --playground-code-comment-color: rgb(182, 173, 154);
  --playground-code-def-color: rgb(45, 32, 6);
  --playground-code-keyword-color: rgb(6, 50, 137);
  --playground-code-meta-color: rgb(178, 151, 98);
  --playground-code-number-color: rgb(6, 50, 137);
  --playground-code-operator-color: rgb(22, 89, 223);
  --playground-code-qualifier-color: rgb(45, 32, 6);
  --playground-code-string-color: rgb(22, 89, 223);
  --playground-code-string-2-color: rgb(137, 103, 36);
  --playground-code-tag-color: rgb(45, 32, 6);
  --playground-code-type-color: rgb(137, 103, 36);
  --playground-code-variable-color: rgb(6, 50, 137);
  --playground-code-variable-2-color: rgb(137, 103, 36);
  --playground-code-variable-3-color: rgb(137, 103, 36);
  --playground-code-callee-color: rgb(178, 151, 98);
  --playground-code-property-color: rgb(178, 151, 98)
}
`,le`
.playground-theme-eclipse {
  --playground-code-comment-color: rgb(63, 127, 95);
  --playground-code-keyword-color: rgb(127, 0, 85);
  --playground-code-meta-color: rgb(255, 23, 23);
  --playground-code-string-color: rgb(42, 0, 255);
  --playground-code-type-color: rgb(0, 0, 192);
  --playground-code-variable-2-color: rgb(0, 0, 192);
  --playground-code-variable-3-color: rgb(0, 0, 192)
}
`,le`
.playground-theme-elegant {
  --playground-code-atom-color: rgb(119, 102, 34);
  --playground-code-attribute-color: rgb(0, 0, 0);
  --playground-code-comment-color: rgb(34, 102, 34);
  --playground-code-def-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(119, 51, 0);
  --playground-code-number-color: rgb(119, 102, 34);
  --playground-code-string-color: rgb(119, 102, 34);
  --playground-code-string-2-color: rgb(0, 0, 0);
  --playground-code-tag-color: rgb(0, 0, 0);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(187, 17, 17);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,le`
.playground-theme-erlang-dark {
  --playground-code-background: rgb(0, 34, 64);
  --playground-code-default-color: rgb(255, 255, 255);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(179, 101, 57);
  --playground-code-gutter-background: rgb(0, 34, 64);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(241, 51, 241);
  --playground-code-attribute-color: rgb(255, 128, 225);
  --playground-code-builtin-color: rgb(238, 170, 170);
  --playground-code-comment-color: rgb(119, 119, 255);
  --playground-code-def-color: rgb(238, 119, 170);
  --playground-code-keyword-color: rgb(255, 238, 128);
  --playground-code-meta-color: rgb(80, 254, 254);
  --playground-code-number-color: rgb(255, 208, 208);
  --playground-code-operator-color: rgb(221, 85, 85);
  --playground-code-qualifier-color: rgb(204, 204, 204);
  --playground-code-string-color: rgb(58, 217, 0);
  --playground-code-string-2-color: rgb(204, 204, 204);
  --playground-code-tag-color: rgb(158, 255, 255);
  --playground-code-type-color: rgb(204, 204, 204);
  --playground-code-variable-color: rgb(80, 254, 80);
  --playground-code-variable-2-color: rgb(238, 0, 238);
  --playground-code-variable-3-color: rgb(204, 204, 204);
  --playground-code-callee-color: rgb(255, 255, 255);
  --playground-code-property-color: rgb(204, 204, 204)
}
`,le`
.playground-theme-gruvbox-dark {
  --playground-code-background: rgb(40, 40, 40);
  --playground-code-default-color: rgb(189, 174, 147);
  --playground-code-cursor-color: rgb(235, 219, 178);
  --playground-code-selection-background: rgb(146, 131, 116);
  --playground-code-gutter-background: rgb(40, 40, 40);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(124, 111, 100);
  --playground-code-atom-color: rgb(211, 134, 155);
  --playground-code-attribute-color: rgb(142, 192, 124);
  --playground-code-builtin-color: rgb(254, 128, 25);
  --playground-code-comment-color: rgb(146, 131, 116);
  --playground-code-def-color: rgb(235, 219, 178);
  --playground-code-keyword-color: rgb(248, 73, 52);
  --playground-code-meta-color: rgb(131, 165, 152);
  --playground-code-number-color: rgb(211, 134, 155);
  --playground-code-operator-color: rgb(235, 219, 178);
  --playground-code-qualifier-color: rgb(142, 192, 124);
  --playground-code-string-color: rgb(184, 187, 38);
  --playground-code-string-2-color: rgb(142, 192, 124);
  --playground-code-tag-color: rgb(254, 128, 25);
  --playground-code-type-color: rgb(250, 189, 47);
  --playground-code-variable-color: rgb(235, 219, 178);
  --playground-code-variable-2-color: rgb(235, 219, 178);
  --playground-code-variable-3-color: rgb(250, 189, 47);
  --playground-code-callee-color: rgb(235, 219, 178);
  --playground-code-property-color: rgb(235, 219, 178)
}
`,le`
.playground-theme-hopscotch {
  --playground-code-background: rgb(50, 41, 49);
  --playground-code-default-color: rgb(213, 211, 213);
  --playground-code-cursor-color: rgb(152, 148, 152);
  --playground-code-selection-background: rgb(67, 59, 66);
  --playground-code-gutter-background: rgb(50, 41, 49);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(121, 115, 121);
  --playground-code-atom-color: rgb(200, 94, 124);
  --playground-code-attribute-color: rgb(143, 193, 62);
  --playground-code-builtin-color: rgb(213, 211, 213);
  --playground-code-comment-color: rgb(179, 53, 8);
  --playground-code-def-color: rgb(253, 139, 25);
  --playground-code-keyword-color: rgb(221, 70, 76);
  --playground-code-meta-color: rgb(213, 211, 213);
  --playground-code-number-color: rgb(200, 94, 124);
  --playground-code-operator-color: rgb(213, 211, 213);
  --playground-code-qualifier-color: rgb(213, 211, 213);
  --playground-code-string-color: rgb(253, 204, 89);
  --playground-code-string-2-color: rgb(213, 211, 213);
  --playground-code-tag-color: rgb(221, 70, 76);
  --playground-code-type-color: rgb(213, 211, 213);
  --playground-code-variable-color: rgb(143, 193, 62);
  --playground-code-variable-2-color: rgb(18, 144, 191);
  --playground-code-variable-3-color: rgb(213, 211, 213);
  --playground-code-callee-color: rgb(213, 211, 213);
  --playground-code-property-color: rgb(143, 193, 62)
}
`,le`
.playground-theme-icecoder {
  --playground-code-background: rgb(29, 29, 27);
  --playground-code-default-color: rgb(102, 102, 102);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(0, 51, 119);
  --playground-code-gutter-background: rgb(29, 29, 27);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(85, 85, 85);
  --playground-code-atom-color: rgb(225, 199, 110);
  --playground-code-attribute-color: rgb(0, 153, 153);
  --playground-code-builtin-color: rgb(33, 78, 123);
  --playground-code-comment-color: rgb(151, 163, 170);
  --playground-code-def-color: rgb(185, 202, 74);
  --playground-code-keyword-color: rgb(238, 238, 238);
  --playground-code-number-color: rgb(108, 181, 217);
  --playground-code-operator-color: rgb(145, 121, 187);
  --playground-code-string-color: rgb(185, 202, 74);
  --playground-code-string-2-color: rgb(108, 181, 217);
  --playground-code-tag-color: rgb(232, 232, 232);
  --playground-code-type-color: rgb(249, 96, 44);
  --playground-code-variable-color: rgb(108, 181, 217);
  --playground-code-variable-2-color: rgb(204, 30, 92);
  --playground-code-variable-3-color: rgb(249, 96, 44);
  --playground-code-callee-color: rgb(102, 102, 102);
  --playground-code-property-color: rgb(238, 238, 238)
}
`,le`
.playground-theme-idea {
  --playground-code-atom-color: rgb(0, 0, 128);
  --playground-code-attribute-color: rgb(0, 0, 255);
  --playground-code-comment-color: rgb(128, 128, 128);
  --playground-code-def-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(0, 0, 128);
  --playground-code-meta-color: rgb(128, 128, 0);
  --playground-code-number-color: rgb(0, 0, 255);
  --playground-code-string-color: rgb(0, 128, 0);
  --playground-code-string-2-color: rgb(0, 128, 0);
  --playground-code-tag-color: rgb(0, 0, 128);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(0, 0, 0);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,le`
.playground-theme-isotope {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-default-color: rgb(224, 224, 224);
  --playground-code-cursor-color: rgb(192, 192, 192);
  --playground-code-selection-background: rgb(64, 64, 64);
  --playground-code-gutter-background: rgb(0, 0, 0);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(128, 128, 128);
  --playground-code-atom-color: rgb(204, 0, 255);
  --playground-code-attribute-color: rgb(51, 255, 0);
  --playground-code-builtin-color: rgb(224, 224, 224);
  --playground-code-comment-color: rgb(51, 0, 255);
  --playground-code-def-color: rgb(255, 153, 0);
  --playground-code-keyword-color: rgb(255, 0, 0);
  --playground-code-meta-color: rgb(224, 224, 224);
  --playground-code-number-color: rgb(204, 0, 255);
  --playground-code-operator-color: rgb(224, 224, 224);
  --playground-code-qualifier-color: rgb(224, 224, 224);
  --playground-code-string-color: rgb(255, 0, 153);
  --playground-code-string-2-color: rgb(224, 224, 224);
  --playground-code-tag-color: rgb(255, 0, 0);
  --playground-code-type-color: rgb(224, 224, 224);
  --playground-code-variable-color: rgb(51, 255, 0);
  --playground-code-variable-2-color: rgb(0, 102, 255);
  --playground-code-variable-3-color: rgb(224, 224, 224);
  --playground-code-callee-color: rgb(224, 224, 224);
  --playground-code-property-color: rgb(51, 255, 0)
}
`,le`
.playground-theme-lesser-dark {
  --playground-code-background: rgb(38, 38, 38);
  --playground-code-default-color: rgb(235, 239, 231);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(69, 68, 59);
  --playground-code-gutter-background: rgb(38, 38, 38);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(119, 119, 119);
  --playground-code-atom-color: rgb(194, 180, 112);
  --playground-code-attribute-color: rgb(129, 164, 213);
  --playground-code-builtin-color: rgb(255, 158, 89);
  --playground-code-comment-color: rgb(102, 102, 102);
  --playground-code-def-color: rgb(255, 255, 255);
  --playground-code-keyword-color: rgb(89, 158, 255);
  --playground-code-meta-color: rgb(115, 140, 115);
  --playground-code-number-color: rgb(179, 94, 77);
  --playground-code-operator-color: rgb(146, 167, 92);
  --playground-code-string-color: rgb(188, 210, 121);
  --playground-code-tag-color: rgb(102, 145, 153);
  --playground-code-type-color: rgb(255, 255, 255);
  --playground-code-variable-color: rgb(217, 191, 140);
  --playground-code-variable-2-color: rgb(102, 145, 153);
  --playground-code-variable-3-color: rgb(255, 255, 255);
  --playground-code-callee-color: rgb(235, 239, 231);
  --playground-code-property-color: rgb(146, 167, 92)
}
`,le`
.playground-theme-liquibyte {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-default-color: rgb(255, 255, 255);
  --playground-code-cursor-color: rgb(238, 238, 238);
  --playground-code-selection-background: rgba(255, 0, 0, 0.25);
  --playground-code-gutter-background: rgb(38, 38, 38);
  --playground-code-gutter-border-right: 1px solid rgb(80, 80, 80);
  --playground-code-linenumber-color: rgb(96, 96, 96);
  --playground-code-atom-color: rgb(191, 48, 48);
  --playground-code-attribute-color: rgb(192, 128, 255);
  --playground-code-builtin-color: rgb(255, 175, 64);
  --playground-code-comment-color: rgb(0, 128, 0);
  --playground-code-def-color: rgb(255, 175, 64);
  --playground-code-keyword-color: rgb(192, 128, 255);
  --playground-code-meta-color: rgb(0, 255, 0);
  --playground-code-number-color: rgb(0, 255, 0);
  --playground-code-operator-color: rgb(255, 255, 255);
  --playground-code-qualifier-color: rgb(255, 247, 0);
  --playground-code-string-color: rgb(255, 128, 0);
  --playground-code-string-2-color: rgb(255, 255, 255);
  --playground-code-tag-color: rgb(255, 255, 0);
  --playground-code-type-color: rgb(192, 128, 255);
  --playground-code-variable-color: rgb(89, 103, 255);
  --playground-code-variable-2-color: rgb(0, 127, 127);
  --playground-code-variable-3-color: rgb(192, 128, 255);
  --playground-code-callee-color: rgb(255, 255, 255);
  --playground-code-property-color: rgb(153, 153, 153)
}
`,le`
.playground-theme-lucario {
  --playground-code-background: rgb(43, 62, 80);
  --playground-code-default-color: rgb(248, 248, 242);
  --playground-code-cursor-color: rgb(230, 200, 69);
  --playground-code-selection-background: rgb(36, 52, 67);
  --playground-code-gutter-background: rgb(43, 62, 80);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(248, 248, 242);
  --playground-code-atom-color: rgb(189, 147, 249);
  --playground-code-attribute-color: rgb(102, 217, 239);
  --playground-code-builtin-color: rgb(114, 192, 93);
  --playground-code-comment-color: rgb(92, 152, 205);
  --playground-code-def-color: rgb(114, 192, 93);
  --playground-code-keyword-color: rgb(255, 101, 65);
  --playground-code-meta-color: rgb(248, 248, 242);
  --playground-code-number-color: rgb(202, 148, 255);
  --playground-code-operator-color: rgb(102, 217, 239);
  --playground-code-qualifier-color: rgb(114, 192, 93);
  --playground-code-string-color: rgb(230, 219, 116);
  --playground-code-string-2-color: rgb(230, 219, 116);
  --playground-code-tag-color: rgb(255, 101, 65);
  --playground-code-type-color: rgb(255, 184, 108);
  --playground-code-variable-color: rgb(248, 248, 242);
  --playground-code-variable-2-color: rgb(248, 248, 242);
  --playground-code-variable-3-color: rgb(255, 184, 108);
  --playground-code-callee-color: rgb(248, 248, 242);
  --playground-code-property-color: rgb(248, 248, 242)
}
`,le`
.playground-theme-material-darker {
  --playground-code-background: rgb(33, 33, 33);
  --playground-code-default-color: rgb(238, 255, 255);
  --playground-code-cursor-color: rgb(255, 204, 0);
  --playground-code-selection-background: rgba(97, 97, 97, 0.2);
  --playground-code-gutter-background: rgb(33, 33, 33);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(84, 84, 84);
  --playground-code-atom-color: rgb(247, 140, 108);
  --playground-code-attribute-color: rgb(199, 146, 234);
  --playground-code-builtin-color: rgb(255, 203, 107);
  --playground-code-comment-color: rgb(84, 84, 84);
  --playground-code-def-color: rgb(130, 170, 255);
  --playground-code-keyword-color: rgb(199, 146, 234);
  --playground-code-meta-color: rgb(255, 203, 107);
  --playground-code-number-color: rgb(255, 83, 112);
  --playground-code-operator-color: rgb(137, 221, 255);
  --playground-code-qualifier-color: rgb(222, 203, 107);
  --playground-code-string-color: rgb(195, 232, 141);
  --playground-code-string-2-color: rgb(240, 113, 120);
  --playground-code-tag-color: rgb(255, 83, 112);
  --playground-code-type-color: rgb(222, 203, 107);
  --playground-code-variable-color: rgb(240, 113, 120);
  --playground-code-variable-2-color: rgb(238, 255, 255);
  --playground-code-variable-3-color: rgb(222, 203, 107);
  --playground-code-callee-color: rgb(238, 255, 255);
  --playground-code-property-color: rgb(199, 146, 234)
}
`,le`
.playground-theme-material-ocean {
  --playground-code-background: rgb(15, 17, 26);
  --playground-code-default-color: rgb(143, 147, 162);
  --playground-code-cursor-color: rgb(255, 204, 0);
  --playground-code-selection-background: rgba(113, 124, 180, 0.2);
  --playground-code-gutter-background: rgb(15, 17, 26);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(70, 75, 93);
  --playground-code-atom-color: rgb(247, 140, 108);
  --playground-code-attribute-color: rgb(199, 146, 234);
  --playground-code-builtin-color: rgb(255, 203, 107);
  --playground-code-comment-color: rgb(70, 75, 93);
  --playground-code-def-color: rgb(130, 170, 255);
  --playground-code-keyword-color: rgb(199, 146, 234);
  --playground-code-meta-color: rgb(255, 203, 107);
  --playground-code-number-color: rgb(255, 83, 112);
  --playground-code-operator-color: rgb(137, 221, 255);
  --playground-code-qualifier-color: rgb(222, 203, 107);
  --playground-code-string-color: rgb(195, 232, 141);
  --playground-code-string-2-color: rgb(240, 113, 120);
  --playground-code-tag-color: rgb(255, 83, 112);
  --playground-code-type-color: rgb(222, 203, 107);
  --playground-code-variable-color: rgb(240, 113, 120);
  --playground-code-variable-2-color: rgb(238, 255, 255);
  --playground-code-variable-3-color: rgb(222, 203, 107);
  --playground-code-callee-color: rgb(143, 147, 162);
  --playground-code-property-color: rgb(199, 146, 234)
}
`,le`
.playground-theme-material-palenight {
  --playground-code-background: rgb(41, 45, 62);
  --playground-code-default-color: rgb(166, 172, 205);
  --playground-code-cursor-color: rgb(255, 204, 0);
  --playground-code-selection-background: rgba(113, 124, 180, 0.2);
  --playground-code-gutter-background: rgb(41, 45, 62);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(103, 110, 149);
  --playground-code-atom-color: rgb(247, 140, 108);
  --playground-code-attribute-color: rgb(199, 146, 234);
  --playground-code-builtin-color: rgb(255, 203, 107);
  --playground-code-comment-color: rgb(103, 110, 149);
  --playground-code-def-color: rgb(130, 170, 255);
  --playground-code-keyword-color: rgb(199, 146, 234);
  --playground-code-meta-color: rgb(255, 203, 107);
  --playground-code-number-color: rgb(255, 83, 112);
  --playground-code-operator-color: rgb(137, 221, 255);
  --playground-code-qualifier-color: rgb(222, 203, 107);
  --playground-code-string-color: rgb(195, 232, 141);
  --playground-code-string-2-color: rgb(240, 113, 120);
  --playground-code-tag-color: rgb(255, 83, 112);
  --playground-code-type-color: rgb(222, 203, 107);
  --playground-code-variable-color: rgb(240, 113, 120);
  --playground-code-variable-2-color: rgb(238, 255, 255);
  --playground-code-variable-3-color: rgb(222, 203, 107);
  --playground-code-callee-color: rgb(166, 172, 205);
  --playground-code-property-color: rgb(199, 146, 234)
}
`,le`
.playground-theme-material {
  --playground-code-background: rgb(38, 50, 56);
  --playground-code-default-color: rgb(238, 255, 255);
  --playground-code-cursor-color: rgb(255, 204, 0);
  --playground-code-selection-background: rgba(128, 203, 196, 0.2);
  --playground-code-gutter-background: rgb(38, 50, 56);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(84, 110, 122);
  --playground-code-atom-color: rgb(247, 140, 108);
  --playground-code-attribute-color: rgb(199, 146, 234);
  --playground-code-builtin-color: rgb(255, 203, 107);
  --playground-code-comment-color: rgb(84, 110, 122);
  --playground-code-def-color: rgb(130, 170, 255);
  --playground-code-keyword-color: rgb(199, 146, 234);
  --playground-code-meta-color: rgb(255, 203, 107);
  --playground-code-number-color: rgb(255, 83, 112);
  --playground-code-operator-color: rgb(137, 221, 255);
  --playground-code-qualifier-color: rgb(222, 203, 107);
  --playground-code-string-color: rgb(195, 232, 141);
  --playground-code-string-2-color: rgb(240, 113, 120);
  --playground-code-tag-color: rgb(255, 83, 112);
  --playground-code-type-color: rgb(222, 203, 107);
  --playground-code-variable-color: rgb(240, 113, 120);
  --playground-code-variable-2-color: rgb(238, 255, 255);
  --playground-code-variable-3-color: rgb(222, 203, 107);
  --playground-code-callee-color: rgb(238, 255, 255);
  --playground-code-property-color: rgb(199, 146, 234)
}
`,le`
.playground-theme-mbo {
  --playground-code-background: rgb(44, 44, 44);
  --playground-code-default-color: rgb(255, 255, 236);
  --playground-code-cursor-color: rgb(255, 255, 236);
  --playground-code-selection-background: rgb(113, 108, 98);
  --playground-code-gutter-background: rgb(78, 78, 78);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(218, 218, 218);
  --playground-code-atom-color: rgb(0, 168, 198);
  --playground-code-attribute-color: rgb(157, 223, 233);
  --playground-code-builtin-color: rgb(255, 255, 236);
  --playground-code-comment-color: rgb(149, 149, 138);
  --playground-code-def-color: rgb(255, 255, 236);
  --playground-code-keyword-color: rgb(255, 185, 40);
  --playground-code-meta-color: rgb(255, 255, 236);
  --playground-code-number-color: rgb(0, 168, 198);
  --playground-code-operator-color: rgb(255, 255, 236);
  --playground-code-qualifier-color: rgb(255, 255, 236);
  --playground-code-string-color: rgb(255, 207, 108);
  --playground-code-string-2-color: rgb(255, 255, 236);
  --playground-code-tag-color: rgb(157, 223, 233);
  --playground-code-type-color: rgb(255, 255, 236);
  --playground-code-variable-color: rgb(255, 255, 236);
  --playground-code-variable-2-color: rgb(0, 168, 198);
  --playground-code-variable-3-color: rgb(255, 255, 236);
  --playground-code-callee-color: rgb(255, 255, 236);
  --playground-code-property-color: rgb(157, 223, 233)
}
`,le`
.playground-theme-mdn-like {
  --playground-code-background: rgb(255, 255, 255) url("data:image/png;base64,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") repeat scroll 0% 0%/auto padding-box border-box;
  --playground-code-default-color: rgb(153, 153, 153);
  --playground-code-cursor-color: rgb(34, 34, 34);
  --playground-code-selection-background: rgb(204, 255, 204);
  --playground-code-gutter-background: rgb(248, 248, 248);
  --playground-code-linenumber-color: rgb(170, 170, 170);
  --playground-code-atom-color: rgb(255, 153, 0);
  --playground-code-attribute-color: rgb(214, 187, 109);
  --playground-code-builtin-color: rgb(155, 117, 54);
  --playground-code-comment-color: rgb(119, 119, 119);
  --playground-code-def-color: rgb(0, 119, 170);
  --playground-code-keyword-color: rgb(98, 98, 255);
  --playground-code-meta-color: rgb(0, 0, 0);
  --playground-code-number-color: rgb(202, 120, 65);
  --playground-code-operator-color: rgb(205, 168, 105);
  --playground-code-qualifier-color: rgb(102, 153, 0);
  --playground-code-string-color: rgb(0, 119, 170);
  --playground-code-string-2-color: rgb(189, 107, 24);
  --playground-code-tag-color: rgb(102, 153, 0);
  --playground-code-type-color: rgb(0, 119, 170);
  --playground-code-variable-color: rgb(0, 119, 170);
  --playground-code-variable-2-color: rgb(102, 153, 0);
  --playground-code-variable-3-color: rgb(0, 119, 170);
  --playground-code-callee-color: rgb(153, 153, 153);
  --playground-code-property-color: rgb(153, 0, 85)
}
`,le`
.playground-theme-midnight {
  --playground-code-background: rgb(15, 25, 42);
  --playground-code-default-color: rgb(209, 237, 255);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-selection-background: rgb(49, 77, 103);
  --playground-code-gutter-background: rgb(15, 25, 42);
  --playground-code-gutter-border-right: 1px solid rgb(209, 237, 255);
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(174, 129, 255);
  --playground-code-attribute-color: rgb(166, 226, 46);
  --playground-code-builtin-color: rgb(209, 237, 255);
  --playground-code-comment-color: rgb(66, 139, 221);
  --playground-code-def-color: rgb(68, 221, 221);
  --playground-code-keyword-color: rgb(232, 55, 55);
  --playground-code-meta-color: rgb(209, 237, 255);
  --playground-code-number-color: rgb(209, 237, 255);
  --playground-code-operator-color: rgb(209, 237, 255);
  --playground-code-qualifier-color: rgb(209, 237, 255);
  --playground-code-string-color: rgb(29, 193, 22);
  --playground-code-string-2-color: rgb(209, 237, 255);
  --playground-code-tag-color: rgb(68, 68, 153);
  --playground-code-type-color: rgb(209, 237, 255);
  --playground-code-variable-color: rgb(255, 170, 62);
  --playground-code-variable-2-color: rgb(255, 170, 62);
  --playground-code-variable-3-color: rgb(209, 237, 255);
  --playground-code-callee-color: rgb(209, 237, 255);
  --playground-code-property-color: rgb(166, 226, 46)
}
`,le`
.playground-theme-monokai {
  --playground-code-background: rgb(39, 40, 34);
  --playground-code-default-color: rgb(248, 248, 242);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-selection-background: rgb(73, 72, 62);
  --playground-code-gutter-background: rgb(39, 40, 34);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(174, 129, 255);
  --playground-code-attribute-color: rgb(166, 226, 46);
  --playground-code-builtin-color: rgb(102, 217, 239);
  --playground-code-comment-color: rgb(117, 113, 94);
  --playground-code-def-color: rgb(253, 151, 31);
  --playground-code-keyword-color: rgb(249, 38, 114);
  --playground-code-meta-color: rgb(248, 248, 242);
  --playground-code-number-color: rgb(174, 129, 255);
  --playground-code-operator-color: rgb(248, 248, 242);
  --playground-code-qualifier-color: rgb(248, 248, 242);
  --playground-code-string-color: rgb(230, 219, 116);
  --playground-code-string-2-color: rgb(248, 248, 242);
  --playground-code-tag-color: rgb(249, 38, 114);
  --playground-code-type-color: rgb(102, 217, 239);
  --playground-code-variable-color: rgb(248, 248, 242);
  --playground-code-variable-2-color: rgb(158, 255, 255);
  --playground-code-variable-3-color: rgb(102, 217, 239);
  --playground-code-callee-color: rgb(248, 248, 242);
  --playground-code-property-color: rgb(166, 226, 46)
}
`,le`
.playground-theme-moxer {
  --playground-code-background: rgb(9, 10, 15);
  --playground-code-default-color: rgb(142, 149, 180);
  --playground-code-cursor-color: rgb(255, 204, 0);
  --playground-code-selection-background: rgba(128, 203, 196, 0.2);
  --playground-code-gutter-background: rgb(9, 10, 15);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(53, 57, 75);
  --playground-code-atom-color: rgb(169, 155, 226);
  --playground-code-attribute-color: rgb(199, 146, 234);
  --playground-code-builtin-color: rgb(255, 203, 107);
  --playground-code-comment-color: rgb(63, 68, 90);
  --playground-code-def-color: rgb(245, 223, 165);
  --playground-code-keyword-color: rgb(212, 108, 108);
  --playground-code-meta-color: rgb(255, 203, 107);
  --playground-code-number-color: rgb(124, 164, 192);
  --playground-code-operator-color: rgb(212, 108, 108);
  --playground-code-qualifier-color: rgb(222, 203, 107);
  --playground-code-string-color: rgb(178, 228, 174);
  --playground-code-string-2-color: rgb(240, 113, 120);
  --playground-code-tag-color: rgb(255, 83, 112);
  --playground-code-type-color: rgb(222, 203, 107);
  --playground-code-variable-color: rgb(142, 149, 180);
  --playground-code-variable-2-color: rgb(129, 197, 218);
  --playground-code-variable-3-color: rgb(222, 203, 107);
  --playground-code-callee-color: rgb(142, 149, 180);
  --playground-code-property-color: rgb(129, 197, 218)
}
`,le`
.playground-theme-neat {
  --playground-code-atom-color: rgb(51, 170, 51);
  --playground-code-attribute-color: rgb(0, 0, 0);
  --playground-code-builtin-color: rgb(0, 119, 119);
  --playground-code-comment-color: rgb(170, 136, 102);
  --playground-code-def-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(0, 0, 255);
  --playground-code-number-color: rgb(51, 170, 51);
  --playground-code-qualifier-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(170, 34, 34);
  --playground-code-string-2-color: rgb(0, 0, 0);
  --playground-code-tag-color: rgb(0, 0, 0);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(0, 0, 0);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,le`
.playground-theme-neo {
  --playground-code-default-color: rgb(46, 56, 60);
  --playground-code-cursor-color: rgb(46, 56, 60);
  --playground-code-gutter-background: rgba(0, 0, 0, 0);
  --playground-code-gutter-border-right: 10px solid rgba(0, 0, 0, 0);
  --playground-code-linenumber-color: rgb(224, 226, 229);
  --playground-code-atom-color: rgb(117, 67, 138);
  --playground-code-attribute-color: rgb(46, 56, 60);
  --playground-code-builtin-color: rgb(46, 56, 60);
  --playground-code-comment-color: rgb(117, 120, 123);
  --playground-code-def-color: rgb(46, 56, 60);
  --playground-code-keyword-color: rgb(29, 117, 179);
  --playground-code-meta-color: rgb(46, 56, 60);
  --playground-code-number-color: rgb(117, 67, 138);
  --playground-code-operator-color: rgb(46, 56, 60);
  --playground-code-qualifier-color: rgb(4, 125, 101);
  --playground-code-string-color: rgb(179, 94, 20);
  --playground-code-string-2-color: rgb(46, 56, 60);
  --playground-code-tag-color: rgb(156, 51, 40);
  --playground-code-type-color: rgb(46, 56, 60);
  --playground-code-variable-color: rgb(4, 125, 101);
  --playground-code-variable-2-color: rgb(46, 56, 60);
  --playground-code-variable-3-color: rgb(46, 56, 60);
  --playground-code-callee-color: rgb(46, 56, 60);
  --playground-code-property-color: rgb(29, 117, 179)
}
`,le`
.playground-theme-night {
  --playground-code-background: rgb(10, 0, 31);
  --playground-code-default-color: rgb(248, 248, 248);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(68, 68, 119);
  --playground-code-gutter-background: rgb(10, 0, 31);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(248, 248, 248);
  --playground-code-atom-color: rgb(132, 93, 196);
  --playground-code-attribute-color: rgb(255, 213, 0);
  --playground-code-builtin-color: rgb(255, 158, 89);
  --playground-code-comment-color: rgb(137, 0, 209);
  --playground-code-def-color: rgb(255, 255, 255);
  --playground-code-keyword-color: rgb(89, 158, 255);
  --playground-code-meta-color: rgb(118, 120, 226);
  --playground-code-number-color: rgb(255, 213, 0);
  --playground-code-operator-color: rgb(248, 248, 248);
  --playground-code-qualifier-color: rgb(248, 248, 248);
  --playground-code-string-color: rgb(55, 241, 74);
  --playground-code-string-2-color: rgb(248, 248, 248);
  --playground-code-tag-color: rgb(153, 178, 255);
  --playground-code-type-color: rgb(255, 255, 255);
  --playground-code-variable-color: rgb(248, 248, 248);
  --playground-code-variable-2-color: rgb(153, 178, 255);
  --playground-code-variable-3-color: rgb(255, 255, 255);
  --playground-code-callee-color: rgb(248, 248, 248);
  --playground-code-property-color: rgb(248, 248, 248)
}
`,le`
.playground-theme-nord {
  --playground-code-background: rgb(46, 52, 64);
  --playground-code-default-color: rgb(216, 222, 233);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-selection-background: rgb(67, 76, 94);
  --playground-code-gutter-background: rgb(46, 52, 64);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(76, 86, 106);
  --playground-code-atom-color: rgb(180, 142, 173);
  --playground-code-attribute-color: rgb(143, 188, 187);
  --playground-code-builtin-color: rgb(129, 161, 193);
  --playground-code-comment-color: rgb(76, 86, 106);
  --playground-code-def-color: rgb(143, 188, 187);
  --playground-code-keyword-color: rgb(129, 161, 193);
  --playground-code-meta-color: rgb(216, 222, 233);
  --playground-code-number-color: rgb(180, 142, 173);
  --playground-code-operator-color: rgb(216, 222, 233);
  --playground-code-qualifier-color: rgb(216, 222, 233);
  --playground-code-string-color: rgb(163, 190, 140);
  --playground-code-string-2-color: rgb(216, 222, 233);
  --playground-code-tag-color: rgb(191, 97, 106);
  --playground-code-type-color: rgb(216, 222, 233);
  --playground-code-variable-color: rgb(216, 222, 233);
  --playground-code-variable-2-color: rgb(216, 222, 233);
  --playground-code-variable-3-color: rgb(216, 222, 233);
  --playground-code-callee-color: rgb(216, 222, 233);
  --playground-code-property-color: rgb(143, 188, 187)
}
`,le`
.playground-theme-oceanic-next {
  --playground-code-background: rgb(48, 65, 72);
  --playground-code-default-color: rgb(248, 248, 242);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-selection-background: rgba(101, 115, 126, 0.33);
  --playground-code-gutter-background: rgb(48, 65, 72);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(197, 148, 197);
  --playground-code-attribute-color: rgb(197, 148, 197);
  --playground-code-builtin-color: rgb(102, 217, 239);
  --playground-code-comment-color: rgb(101, 115, 126);
  --playground-code-def-color: rgb(102, 153, 204);
  --playground-code-keyword-color: rgb(197, 148, 197);
  --playground-code-meta-color: rgb(248, 248, 242);
  --playground-code-number-color: rgb(249, 145, 87);
  --playground-code-operator-color: rgb(248, 248, 242);
  --playground-code-qualifier-color: rgb(248, 248, 242);
  --playground-code-string-color: rgb(153, 199, 148);
  --playground-code-string-2-color: rgb(248, 248, 242);
  --playground-code-tag-color: rgb(197, 148, 197);
  --playground-code-type-color: rgb(248, 248, 242);
  --playground-code-variable-color: rgb(248, 248, 242);
  --playground-code-variable-2-color: rgb(248, 248, 242);
  --playground-code-variable-3-color: rgb(248, 248, 242);
  --playground-code-callee-color: rgb(248, 248, 242);
  --playground-code-property-color: rgb(153, 199, 148)
}
`,le`
.playground-theme-panda-syntax {
  --playground-code-background: rgb(41, 42, 43);
  --playground-code-default-color: rgb(230, 230, 230);
  --playground-code-cursor-color: rgb(255, 44, 109);
  --playground-code-selection-background: rgb(255, 255, 255);
  --playground-code-gutter-background: rgb(41, 42, 43);
  --playground-code-gutter-border-right: 1px solid rgba(255, 255, 255, 0.1);
  --playground-code-linenumber-color: rgb(230, 230, 230);
  --playground-code-atom-color: rgb(255, 44, 109);
  --playground-code-attribute-color: rgb(255, 184, 108);
  --playground-code-builtin-color: rgb(230, 230, 230);
  --playground-code-comment-color: rgb(103, 107, 121);
  --playground-code-def-color: rgb(230, 230, 230);
  --playground-code-keyword-color: rgb(255, 117, 181);
  --playground-code-meta-color: rgb(176, 132, 235);
  --playground-code-number-color: rgb(255, 184, 108);
  --playground-code-operator-color: rgb(243, 243, 243);
  --playground-code-qualifier-color: rgb(230, 230, 230);
  --playground-code-string-color: rgb(25, 249, 216);
  --playground-code-string-2-color: rgb(255, 184, 108);
  --playground-code-tag-color: rgb(255, 44, 109);
  --playground-code-type-color: rgb(255, 154, 193);
  --playground-code-variable-color: rgb(255, 184, 108);
  --playground-code-variable-2-color: rgb(255, 154, 193);
  --playground-code-variable-3-color: rgb(255, 154, 193);
  --playground-code-callee-color: rgb(230, 230, 230);
  --playground-code-property-color: rgb(243, 243, 243)
}
`,le`
.playground-theme-paraiso-dark {
  --playground-code-background: rgb(47, 30, 46);
  --playground-code-default-color: rgb(185, 182, 176);
  --playground-code-cursor-color: rgb(141, 134, 135);
  --playground-code-selection-background: rgb(65, 50, 63);
  --playground-code-gutter-background: rgb(47, 30, 46);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(119, 110, 113);
  --playground-code-atom-color: rgb(129, 91, 164);
  --playground-code-attribute-color: rgb(72, 182, 133);
  --playground-code-builtin-color: rgb(185, 182, 176);
  --playground-code-comment-color: rgb(233, 107, 168);
  --playground-code-def-color: rgb(249, 155, 21);
  --playground-code-keyword-color: rgb(239, 97, 85);
  --playground-code-meta-color: rgb(185, 182, 176);
  --playground-code-number-color: rgb(129, 91, 164);
  --playground-code-operator-color: rgb(185, 182, 176);
  --playground-code-qualifier-color: rgb(185, 182, 176);
  --playground-code-string-color: rgb(254, 196, 24);
  --playground-code-string-2-color: rgb(185, 182, 176);
  --playground-code-tag-color: rgb(239, 97, 85);
  --playground-code-type-color: rgb(185, 182, 176);
  --playground-code-variable-color: rgb(72, 182, 133);
  --playground-code-variable-2-color: rgb(6, 182, 239);
  --playground-code-variable-3-color: rgb(185, 182, 176);
  --playground-code-callee-color: rgb(185, 182, 176);
  --playground-code-property-color: rgb(72, 182, 133)
}
`,le`
.playground-theme-paraiso-light {
  --playground-code-background: rgb(231, 233, 219);
  --playground-code-default-color: rgb(65, 50, 63);
  --playground-code-cursor-color: rgb(119, 110, 113);
  --playground-code-selection-background: rgb(185, 182, 176);
  --playground-code-gutter-background: rgb(231, 233, 219);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(141, 134, 135);
  --playground-code-atom-color: rgb(129, 91, 164);
  --playground-code-attribute-color: rgb(72, 182, 133);
  --playground-code-builtin-color: rgb(65, 50, 63);
  --playground-code-comment-color: rgb(233, 107, 168);
  --playground-code-def-color: rgb(249, 155, 21);
  --playground-code-keyword-color: rgb(239, 97, 85);
  --playground-code-meta-color: rgb(65, 50, 63);
  --playground-code-number-color: rgb(129, 91, 164);
  --playground-code-operator-color: rgb(65, 50, 63);
  --playground-code-qualifier-color: rgb(65, 50, 63);
  --playground-code-string-color: rgb(254, 196, 24);
  --playground-code-string-2-color: rgb(65, 50, 63);
  --playground-code-tag-color: rgb(239, 97, 85);
  --playground-code-type-color: rgb(65, 50, 63);
  --playground-code-variable-color: rgb(72, 182, 133);
  --playground-code-variable-2-color: rgb(6, 182, 239);
  --playground-code-variable-3-color: rgb(65, 50, 63);
  --playground-code-callee-color: rgb(65, 50, 63);
  --playground-code-property-color: rgb(72, 182, 133)
}
`,le`
.playground-theme-pastel-on-dark {
  --playground-code-background: rgb(44, 40, 39);
  --playground-code-default-color: rgb(143, 147, 143);
  --playground-code-cursor-color: rgb(167, 167, 167);
  --playground-code-selection-background: rgba(221, 240, 255, 0.2);
  --playground-code-gutter-background: rgb(52, 48, 47);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(143, 147, 143);
  --playground-code-atom-color: rgb(222, 142, 48);
  --playground-code-attribute-color: rgb(166, 226, 46);
  --playground-code-builtin-color: rgb(193, 193, 68);
  --playground-code-comment-color: rgb(166, 198, 255);
  --playground-code-def-color: rgb(117, 122, 216);
  --playground-code-keyword-color: rgb(174, 178, 248);
  --playground-code-meta-color: rgb(143, 147, 143);
  --playground-code-number-color: rgb(204, 204, 204);
  --playground-code-operator-color: rgb(143, 147, 143);
  --playground-code-qualifier-color: rgb(193, 193, 68);
  --playground-code-string-color: rgb(102, 169, 104);
  --playground-code-string-2-color: rgb(143, 147, 143);
  --playground-code-tag-color: rgb(193, 193, 68);
  --playground-code-type-color: rgb(222, 142, 48);
  --playground-code-variable-color: rgb(174, 178, 248);
  --playground-code-variable-2-color: rgb(190, 191, 85);
  --playground-code-variable-3-color: rgb(222, 142, 48);
  --playground-code-callee-color: rgb(143, 147, 143);
  --playground-code-property-color: rgb(143, 147, 143)
}
`,le`
.playground-theme-railscasts {
  --playground-code-background: rgb(43, 43, 43);
  --playground-code-default-color: rgb(244, 241, 237);
  --playground-code-cursor-color: rgb(212, 207, 201);
  --playground-code-selection-background: rgb(39, 41, 53);
  --playground-code-gutter-background: rgb(43, 43, 43);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(90, 100, 126);
  --playground-code-atom-color: rgb(182, 179, 235);
  --playground-code-attribute-color: rgb(165, 194, 97);
  --playground-code-builtin-color: rgb(244, 241, 237);
  --playground-code-comment-color: rgb(188, 148, 88);
  --playground-code-def-color: rgb(204, 120, 51);
  --playground-code-keyword-color: rgb(218, 73, 57);
  --playground-code-meta-color: rgb(244, 241, 237);
  --playground-code-number-color: rgb(182, 179, 235);
  --playground-code-operator-color: rgb(244, 241, 237);
  --playground-code-qualifier-color: rgb(244, 241, 237);
  --playground-code-string-color: rgb(255, 198, 109);
  --playground-code-string-2-color: rgb(244, 241, 237);
  --playground-code-tag-color: rgb(218, 73, 57);
  --playground-code-type-color: rgb(244, 241, 237);
  --playground-code-variable-color: rgb(165, 194, 97);
  --playground-code-variable-2-color: rgb(109, 156, 190);
  --playground-code-variable-3-color: rgb(244, 241, 237);
  --playground-code-callee-color: rgb(244, 241, 237);
  --playground-code-property-color: rgb(165, 194, 97)
}
`,le`
.playground-theme-rubyblue {
  --playground-code-background: rgb(17, 36, 53);
  --playground-code-default-color: rgb(255, 255, 255);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(56, 86, 111);
  --playground-code-gutter-background: rgb(31, 70, 97);
  --playground-code-gutter-border-right: 7px solid rgb(62, 112, 135);
  --playground-code-linenumber-color: rgb(255, 255, 255);
  --playground-code-atom-color: rgb(244, 194, 11);
  --playground-code-attribute-color: rgb(130, 198, 224);
  --playground-code-builtin-color: rgb(255, 157, 0);
  --playground-code-comment-color: rgb(153, 153, 153);
  --playground-code-def-color: rgb(255, 255, 255);
  --playground-code-keyword-color: rgb(255, 0, 255);
  --playground-code-meta-color: rgb(255, 0, 255);
  --playground-code-number-color: rgb(130, 198, 224);
  --playground-code-operator-color: rgb(255, 255, 255);
  --playground-code-qualifier-color: rgb(255, 255, 255);
  --playground-code-string-color: rgb(240, 128, 71);
  --playground-code-string-2-color: rgb(255, 255, 255);
  --playground-code-tag-color: rgb(123, 216, 39);
  --playground-code-type-color: rgb(255, 255, 255);
  --playground-code-variable-color: rgb(255, 255, 255);
  --playground-code-variable-2-color: rgb(123, 216, 39);
  --playground-code-variable-3-color: rgb(255, 255, 255);
  --playground-code-callee-color: rgb(255, 255, 255);
  --playground-code-property-color: rgb(255, 255, 255)
}
`,le`
.playground-theme-seti {
  --playground-code-background: rgb(21, 23, 24);
  --playground-code-default-color: rgb(207, 210, 209);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-gutter-background: rgb(14, 17, 18);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(109, 138, 136);
  --playground-code-atom-color: rgb(205, 63, 69);
  --playground-code-attribute-color: rgb(159, 202, 86);
  --playground-code-builtin-color: rgb(159, 202, 86);
  --playground-code-comment-color: rgb(65, 83, 91);
  --playground-code-def-color: rgb(85, 181, 219);
  --playground-code-keyword-color: rgb(230, 205, 105);
  --playground-code-meta-color: rgb(85, 181, 219);
  --playground-code-number-color: rgb(205, 63, 69);
  --playground-code-operator-color: rgb(159, 202, 86);
  --playground-code-qualifier-color: rgb(159, 202, 86);
  --playground-code-string-color: rgb(85, 181, 219);
  --playground-code-string-2-color: rgb(85, 181, 219);
  --playground-code-tag-color: rgb(85, 181, 219);
  --playground-code-type-color: rgb(159, 202, 86);
  --playground-code-variable-color: rgb(85, 181, 219);
  --playground-code-variable-2-color: rgb(160, 116, 196);
  --playground-code-variable-3-color: rgb(159, 202, 86);
  --playground-code-callee-color: rgb(207, 210, 209);
  --playground-code-property-color: rgb(160, 116, 196)
}
`,le`
.playground-theme-shadowfox {
  --playground-code-background: rgb(42, 42, 46);
  --playground-code-default-color: rgb(177, 177, 179);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(53, 59, 72);
  --playground-code-gutter-background: rgb(12, 12, 13);
  --playground-code-gutter-border-right: 1px solid rgb(12, 12, 13);
  --playground-code-linenumber-color: rgb(147, 147, 147);
  --playground-code-atom-color: rgb(255, 125, 233);
  --playground-code-attribute-color: rgb(255, 125, 233);
  --playground-code-builtin-color: rgb(255, 125, 233);
  --playground-code-comment-color: rgb(147, 147, 147);
  --playground-code-def-color: rgb(117, 191, 255);
  --playground-code-keyword-color: rgb(255, 125, 233);
  --playground-code-meta-color: rgb(147, 147, 147);
  --playground-code-number-color: rgb(107, 137, 255);
  --playground-code-operator-color: rgb(177, 177, 179);
  --playground-code-qualifier-color: rgb(117, 191, 255);
  --playground-code-string-color: rgb(107, 137, 255);
  --playground-code-string-2-color: rgb(107, 137, 255);
  --playground-code-tag-color: rgb(117, 191, 255);
  --playground-code-type-color: rgb(177, 177, 179);
  --playground-code-variable-color: rgb(185, 142, 255);
  --playground-code-variable-2-color: rgb(117, 191, 255);
  --playground-code-variable-3-color: rgb(215, 215, 219);
  --playground-code-callee-color: rgb(177, 177, 179);
  --playground-code-property-color: rgb(134, 222, 116)
}
`,le`
.playground-theme-solarized {
  --playground-code-cursor-color: rgb(129, 144, 144);
  --playground-code-gutter-border-right: 0px;
  --playground-code-atom-color: rgb(211, 54, 130);
  --playground-code-attribute-color: rgb(42, 161, 152);
  --playground-code-builtin-color: rgb(211, 54, 130);
  --playground-code-comment-color: rgb(88, 110, 117);
  --playground-code-def-color: rgb(42, 161, 152);
  --playground-code-keyword-color: rgb(203, 75, 22);
  --playground-code-meta-color: rgb(133, 153, 0);
  --playground-code-number-color: rgb(211, 54, 130);
  --playground-code-operator-color: rgb(108, 113, 196);
  --playground-code-qualifier-color: rgb(181, 137, 0);
  --playground-code-string-color: rgb(133, 153, 0);
  --playground-code-string-2-color: rgb(181, 137, 0);
  --playground-code-tag-color: rgb(147, 161, 161);
  --playground-code-type-color: rgb(108, 113, 196);
  --playground-code-variable-color: rgb(131, 148, 150);
  --playground-code-variable-2-color: rgb(181, 137, 0);
  --playground-code-variable-3-color: rgb(108, 113, 196);
  --playground-code-property-color: rgb(42, 161, 152)
}
`,le`
.playground-theme-ssms {
  --playground-code-selection-background: rgb(173, 214, 255);
  --playground-code-gutter-background: rgb(255, 255, 255);
  --playground-code-gutter-border-right: 3px solid rgb(255, 238, 98);
  --playground-code-linenumber-color: rgb(0, 128, 128);
  --playground-code-atom-color: rgb(169, 169, 169);
  --playground-code-attribute-color: rgb(0, 0, 0);
  --playground-code-builtin-color: rgb(0, 0, 0);
  --playground-code-comment-color: rgb(0, 100, 0);
  --playground-code-def-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(0, 0, 255);
  --playground-code-meta-color: rgb(0, 0, 0);
  --playground-code-number-color: rgb(0, 0, 0);
  --playground-code-operator-color: rgb(169, 169, 169);
  --playground-code-qualifier-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(255, 0, 0);
  --playground-code-string-2-color: rgb(255, 0, 255);
  --playground-code-tag-color: rgb(0, 0, 0);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(0, 0, 0);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,le`
.playground-theme-the-matrix {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-default-color: rgb(0, 255, 0);
  --playground-code-cursor-color: rgb(0, 255, 0);
  --playground-code-selection-background: rgb(45, 45, 45);
  --playground-code-gutter-background: rgb(0, 102, 0);
  --playground-code-gutter-border-right: 2px solid rgb(0, 255, 0);
  --playground-code-linenumber-color: rgb(255, 255, 255);
  --playground-code-atom-color: rgb(51, 255, 255);
  --playground-code-attribute-color: rgb(255, 247, 0);
  --playground-code-comment-color: rgb(204, 204, 204);
  --playground-code-def-color: rgb(153, 153, 204);
  --playground-code-keyword-color: rgb(0, 136, 3);
  --playground-code-meta-color: rgb(204, 153, 255);
  --playground-code-number-color: rgb(255, 185, 79);
  --playground-code-operator-color: rgb(153, 153, 153);
  --playground-code-qualifier-color: rgb(255, 247, 0);
  --playground-code-string-color: rgb(51, 153, 204);
  --playground-code-string-2-color: rgb(0, 255, 0);
  --playground-code-tag-color: rgb(255, 189, 64);
  --playground-code-type-color: rgb(153, 102, 255);
  --playground-code-variable-color: rgb(255, 102, 204);
  --playground-code-variable-2-color: rgb(204, 102, 255);
  --playground-code-variable-3-color: rgb(153, 102, 255);
  --playground-code-callee-color: rgb(0, 255, 0);
  --playground-code-property-color: rgb(98, 255, 160)
}
`,le`
.playground-theme-tomorrow-night-bright {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-default-color: rgb(234, 234, 234);
  --playground-code-cursor-color: rgb(106, 106, 106);
  --playground-code-selection-background: rgb(66, 66, 66);
  --playground-code-gutter-background: rgb(0, 0, 0);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(66, 66, 66);
  --playground-code-atom-color: rgb(161, 106, 148);
  --playground-code-attribute-color: rgb(153, 204, 153);
  --playground-code-builtin-color: rgb(234, 234, 234);
  --playground-code-comment-color: rgb(210, 123, 83);
  --playground-code-def-color: rgb(231, 140, 69);
  --playground-code-keyword-color: rgb(213, 78, 83);
  --playground-code-meta-color: rgb(234, 234, 234);
  --playground-code-number-color: rgb(161, 106, 148);
  --playground-code-operator-color: rgb(234, 234, 234);
  --playground-code-qualifier-color: rgb(234, 234, 234);
  --playground-code-string-color: rgb(231, 197, 71);
  --playground-code-string-2-color: rgb(234, 234, 234);
  --playground-code-tag-color: rgb(213, 78, 83);
  --playground-code-type-color: rgb(234, 234, 234);
  --playground-code-variable-color: rgb(185, 202, 74);
  --playground-code-variable-2-color: rgb(122, 166, 218);
  --playground-code-variable-3-color: rgb(234, 234, 234);
  --playground-code-callee-color: rgb(234, 234, 234);
  --playground-code-property-color: rgb(153, 204, 153)
}
`,le`
.playground-theme-tomorrow-night-eighties {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-default-color: rgb(204, 204, 204);
  --playground-code-cursor-color: rgb(106, 106, 106);
  --playground-code-selection-background: rgb(45, 45, 45);
  --playground-code-gutter-background: rgb(0, 0, 0);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(81, 81, 81);
  --playground-code-atom-color: rgb(161, 106, 148);
  --playground-code-attribute-color: rgb(153, 204, 153);
  --playground-code-builtin-color: rgb(204, 204, 204);
  --playground-code-comment-color: rgb(210, 123, 83);
  --playground-code-def-color: rgb(249, 145, 87);
  --playground-code-keyword-color: rgb(242, 119, 122);
  --playground-code-meta-color: rgb(204, 204, 204);
  --playground-code-number-color: rgb(161, 106, 148);
  --playground-code-operator-color: rgb(204, 204, 204);
  --playground-code-qualifier-color: rgb(204, 204, 204);
  --playground-code-string-color: rgb(255, 204, 102);
  --playground-code-string-2-color: rgb(204, 204, 204);
  --playground-code-tag-color: rgb(242, 119, 122);
  --playground-code-type-color: rgb(204, 204, 204);
  --playground-code-variable-color: rgb(153, 204, 153);
  --playground-code-variable-2-color: rgb(102, 153, 204);
  --playground-code-variable-3-color: rgb(204, 204, 204);
  --playground-code-callee-color: rgb(204, 204, 204);
  --playground-code-property-color: rgb(153, 204, 153)
}
`,le`
.playground-theme-ttcn {
  --playground-code-builtin-color: rgb(0, 0, 0);
  --playground-code-comment-color: rgb(51, 51, 51);
  --playground-code-keyword-color: rgb(0, 0, 0);
  --playground-code-number-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(0, 100, 0);
  --playground-code-variable-color: rgb(139, 34, 82)
}
`,le`
.playground-theme-twilight {
  --playground-code-background: rgb(20, 20, 20);
  --playground-code-default-color: rgb(247, 247, 247);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(50, 50, 50);
  --playground-code-gutter-background: rgb(34, 34, 34);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(170, 170, 170);
  --playground-code-atom-color: rgb(255, 204, 0);
  --playground-code-attribute-color: rgb(214, 187, 109);
  --playground-code-builtin-color: rgb(205, 168, 105);
  --playground-code-comment-color: rgb(119, 119, 119);
  --playground-code-def-color: rgb(96, 115, 146);
  --playground-code-keyword-color: rgb(249, 238, 152);
  --playground-code-meta-color: rgb(247, 247, 247);
  --playground-code-number-color: rgb(202, 120, 65);
  --playground-code-operator-color: rgb(205, 168, 105);
  --playground-code-qualifier-color: rgb(247, 247, 247);
  --playground-code-string-color: rgb(143, 157, 106);
  --playground-code-string-2-color: rgb(189, 107, 24);
  --playground-code-tag-color: rgb(96, 115, 146);
  --playground-code-type-color: rgb(96, 115, 146);
  --playground-code-variable-color: rgb(247, 247, 247);
  --playground-code-variable-2-color: rgb(96, 115, 146);
  --playground-code-variable-3-color: rgb(96, 115, 146);
  --playground-code-callee-color: rgb(247, 247, 247);
  --playground-code-property-color: rgb(247, 247, 247)
}
`,le`
.playground-theme-vibrant-ink {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-default-color: rgb(255, 255, 255);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(53, 73, 60);
  --playground-code-gutter-background: rgb(0, 34, 64);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(255, 204, 0);
  --playground-code-attribute-color: rgb(141, 166, 206);
  --playground-code-builtin-color: rgb(141, 166, 206);
  --playground-code-comment-color: rgb(128, 128, 128);
  --playground-code-def-color: rgb(141, 166, 206);
  --playground-code-keyword-color: rgb(204, 120, 50);
  --playground-code-meta-color: rgb(216, 250, 60);
  --playground-code-number-color: rgb(255, 238, 152);
  --playground-code-operator-color: rgb(136, 136, 136);
  --playground-code-qualifier-color: rgb(255, 255, 255);
  --playground-code-string-color: rgb(165, 194, 92);
  --playground-code-string-2-color: rgb(255, 0, 0);
  --playground-code-tag-color: rgb(141, 166, 206);
  --playground-code-type-color: rgb(255, 255, 255);
  --playground-code-variable-color: rgb(255, 255, 255);
  --playground-code-variable-2-color: rgb(255, 198, 109);
  --playground-code-variable-3-color: rgb(255, 198, 109);
  --playground-code-callee-color: rgb(255, 255, 255);
  --playground-code-property-color: rgb(255, 255, 255)
}
`,le`
.playground-theme-xq-dark {
  --playground-code-background: rgb(10, 0, 31);
  --playground-code-default-color: rgb(248, 248, 248);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(39, 0, 122);
  --playground-code-gutter-background: rgb(10, 0, 31);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(248, 248, 248);
  --playground-code-atom-color: rgb(108, 140, 213);
  --playground-code-attribute-color: rgb(255, 247, 0);
  --playground-code-comment-color: rgb(128, 128, 128);
  --playground-code-def-color: rgb(255, 255, 255);
  --playground-code-keyword-color: rgb(255, 189, 64);
  --playground-code-meta-color: rgb(255, 255, 0);
  --playground-code-operator-color: rgb(248, 248, 248);
  --playground-code-qualifier-color: rgb(255, 247, 0);
  --playground-code-string-color: rgb(159, 238, 0);
  --playground-code-string-2-color: rgb(248, 248, 248);
  --playground-code-tag-color: rgb(255, 189, 64);
  --playground-code-type-color: rgb(221, 221, 221);
  --playground-code-variable-color: rgb(255, 255, 255);
  --playground-code-variable-2-color: rgb(238, 238, 238);
  --playground-code-variable-3-color: rgb(221, 221, 221);
  --playground-code-callee-color: rgb(248, 248, 248);
  --playground-code-property-color: rgb(248, 248, 248)
}
`,le`
.playground-theme-xq-light {
  --playground-code-atom-color: rgb(108, 140, 213);
  --playground-code-attribute-color: rgb(127, 0, 127);
  --playground-code-builtin-color: rgb(126, 166, 86);
  --playground-code-comment-color: rgb(0, 128, 255);
  --playground-code-def-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(90, 92, 173);
  --playground-code-meta-color: rgb(255, 255, 0);
  --playground-code-qualifier-color: rgb(128, 128, 128);
  --playground-code-string-color: rgb(255, 0, 0);
  --playground-code-string-2-color: rgb(0, 0, 0);
  --playground-code-tag-color: rgb(63, 127, 127);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(0, 0, 0);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,le`
.playground-theme-yeti {
  --playground-code-background: rgb(236, 234, 232);
  --playground-code-default-color: rgb(209, 201, 192);
  --playground-code-cursor-color: rgb(209, 201, 192);
  --playground-code-gutter-background: rgb(229, 225, 219);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(173, 171, 166);
  --playground-code-atom-color: rgb(160, 116, 196);
  --playground-code-attribute-color: rgb(159, 185, 110);
  --playground-code-builtin-color: rgb(160, 116, 196);
  --playground-code-comment-color: rgb(212, 200, 190);
  --playground-code-def-color: rgb(85, 181, 219);
  --playground-code-keyword-color: rgb(159, 185, 110);
  --playground-code-meta-color: rgb(150, 192, 216);
  --playground-code-number-color: rgb(160, 116, 196);
  --playground-code-operator-color: rgb(159, 185, 110);
  --playground-code-qualifier-color: rgb(150, 192, 216);
  --playground-code-string-color: rgb(150, 192, 216);
  --playground-code-string-2-color: rgb(150, 192, 216);
  --playground-code-tag-color: rgb(150, 192, 216);
  --playground-code-type-color: rgb(150, 192, 216);
  --playground-code-variable-color: rgb(85, 181, 219);
  --playground-code-variable-2-color: rgb(160, 116, 196);
  --playground-code-variable-3-color: rgb(150, 192, 216);
  --playground-code-callee-color: rgb(209, 201, 192);
  --playground-code-property-color: rgb(160, 116, 196)
}
`,le`
.playground-theme-yonce {
  --playground-code-background: rgb(28, 28, 28);
  --playground-code-default-color: rgb(212, 212, 212);
  --playground-code-cursor-color: rgb(252, 67, 132);
  --playground-code-selection-background: rgba(252, 69, 133, 0.48);
  --playground-code-gutter-background: rgb(28, 28, 28);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(119, 119, 119);
  --playground-code-atom-color: rgb(243, 155, 53);
  --playground-code-attribute-color: rgb(160, 111, 202);
  --playground-code-builtin-color: rgb(252, 67, 132);
  --playground-code-comment-color: rgb(105, 109, 112);
  --playground-code-def-color: rgb(152, 227, 66);
  --playground-code-keyword-color: rgb(0, 167, 170);
  --playground-code-meta-color: rgb(212, 212, 212);
  --playground-code-number-color: rgb(160, 111, 202);
  --playground-code-operator-color: rgb(252, 67, 132);
  --playground-code-qualifier-color: rgb(252, 67, 132);
  --playground-code-string-color: rgb(230, 219, 116);
  --playground-code-string-2-color: rgb(243, 155, 53);
  --playground-code-tag-color: rgb(252, 67, 132);
  --playground-code-type-color: rgb(160, 111, 202);
  --playground-code-variable-color: rgb(212, 212, 212);
  --playground-code-variable-2-color: rgb(218, 125, 174);
  --playground-code-variable-3-color: rgb(160, 111, 202);
  --playground-code-callee-color: rgb(252, 67, 132);
  --playground-code-property-color: rgb(212, 212, 212)
}
`,le`
.playground-theme-zenburn {
  --playground-code-background: rgb(63, 63, 63);
  --playground-code-default-color: rgb(220, 220, 204);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selection-background: rgb(84, 84, 84);
  --playground-code-gutter-background: rgb(63, 63, 63);
  --playground-code-atom-color: rgb(191, 235, 191);
  --playground-code-attribute-color: rgb(223, 175, 143);
  --playground-code-builtin-color: rgb(220, 220, 204);
  --playground-code-comment-color: rgb(127, 159, 127);
  --playground-code-def-color: rgb(220, 220, 204);
  --playground-code-keyword-color: rgb(240, 223, 175);
  --playground-code-meta-color: rgb(240, 223, 175);
  --playground-code-number-color: rgb(220, 220, 204);
  --playground-code-operator-color: rgb(240, 239, 208);
  --playground-code-qualifier-color: rgb(124, 184, 187);
  --playground-code-string-color: rgb(204, 147, 147);
  --playground-code-string-2-color: rgb(204, 147, 147);
  --playground-code-tag-color: rgb(147, 224, 227);
  --playground-code-type-color: rgb(220, 220, 204);
  --playground-code-variable-color: rgb(223, 175, 143);
  --playground-code-variable-2-color: rgb(220, 220, 204);
  --playground-code-variable-3-color: rgb(220, 220, 204);
  --playground-code-callee-color: rgb(220, 220, 204);
  --playground-code-property-color: rgb(223, 175, 143)
}
`],Sn=[{id:"codeBackground",label:"Background",cssProperty:"--playground-code-background",defaultValue:"#ffffff"},{id:"synDefault",label:"Default",cssProperty:"--playground-code-default-color",cmClass:'.CodeMirror-line [role="presentation"]',defaultValue:"#000000"},{id:"synKeyword",label:"Keyword",cssProperty:"--playground-code-keyword-color",cmClass:"cm-keyword",defaultValue:"#770088"},{id:"synAtom",label:"Atom",cssProperty:"--playground-code-atom-color",cmClass:"cm-atom",defaultValue:"#221199"},{id:"synNumber",label:"Number",cssProperty:"--playground-code-number-color",cmClass:"cm-number",defaultValue:"#116644"},{id:"synDef",label:"Def",cssProperty:"--playground-code-def-color",cmClass:"cm-def",defaultValue:"#0000ff"},{id:"synVariable",label:"Variable",cssProperty:"--playground-code-variable-color",cmClass:"cm-variable",defaultValue:"#000000"},{id:"synProperty",label:"Property",cssProperty:"--playground-code-property-color",cmClass:"cm-property",defaultValue:"#000000"},{id:"synOperator",label:"Operator",cssProperty:"--playground-code-operator-color",cmClass:"cm-operator",defaultValue:"#000000"},{id:"synVariable2",label:"Variable 2",cssProperty:"--playground-code-variable-2-color",cmClass:"cm-variable-2",defaultValue:"#0055aa"},{id:"synVariable3",label:"Variable 3",cssProperty:"--playground-code-variable-3-color",cmClass:"cm-variable-3",defaultValue:"#008855"},{id:"synType",label:"Type",cssProperty:"--playground-code-type-color",cmClass:"cm-type",defaultValue:"#008855"},{id:"synComment",label:"Comment",cssProperty:"--playground-code-comment-color",cmClass:"cm-comment",defaultValue:"#aa5500"},{id:"synString",label:"String",cssProperty:"--playground-code-string-color",cmClass:"cm-string",defaultValue:"#aa1111"},{id:"synString2",label:"String 2",cssProperty:"--playground-code-string-2-color",cmClass:"cm-string-2",defaultValue:"#ff5500"},{id:"synMeta",label:"Meta",cssProperty:"--playground-code-meta-color",cmClass:"cm-meta",defaultValue:"#555555"},{id:"synQualifier",label:"Qualifier",cssProperty:"--playground-code-qualifier-color",cmClass:"cm-qualifier",defaultValue:"#555555"},{id:"synBuiltin",label:"Builtin",cssProperty:"--playground-code-builtin-color",cmClass:"cm-builtin",defaultValue:"#3300aa"},{id:"synTag",label:"Tag",cssProperty:"--playground-code-tag-color",cmClass:"cm-tag",defaultValue:"#117700"},{id:"synAttribute",label:"Attribute",cssProperty:"--playground-code-attribute-color",cmClass:"cm-attribute",defaultValue:"#0000cc"},{id:"synCallee",label:"Callee",cssProperty:"--playground-code-callee-color",cmClass:"cm-callee",defaultValue:"#000000"}];
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Cn(e){return{type:"checkbox",...e}}function kn(e){return{type:"slider",...e}}function En(e){return{type:"color",...e}}function Tn(e){return{type:"select",...e}}const On=e=>e+"px",Pn=[Tn({id:"theme",label:"Theme",section:"code",options:["default","3024-day","3024-night","abcdef","ambiance","ayu-dark","ayu-mirage","base16-dark","base16-light","bespin","blackboard","cobalt","colorforth","darcula","dracula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark","hopscotch","icecoder","idea","isotope","lesser-dark","liquibyte","lucario","material-darker","material-ocean","material-palenight","material","mbo","mdn-like","midnight","monokai","moxer","neat","neo","night","nord","oceanic-next","panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue","seti","shadowfox","solarized","ssms","the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight","vibrant-ink","xq-dark","xq-light","yeti","yonce","zenburn"],default:"default"}),kn({id:"fontSize",label:"Font size",section:"code",cssProperty:"--playground-code-font-size",formatCss:On,min:1,max:30,default:14}),Tn({id:"fontFamily",label:"Font",section:"code",cssProperty:"--playground-code-font-family",options:["monospace","Roboto Mono","Source Code Pro","Ubuntu Mono"],formatCss:e=>"monospace"!==e?e+", monospace":e,default:"monospace"}),...Sn.map((e=>{const{id:t,label:r,cssProperty:o,defaultValue:i}=e;return En({id:t,label:r,cssProperty:o,default:i,originalDefault:i,section:"code"})})),Cn({id:"resizable",label:"Resizable",section:"features",default:!1,htmlAttribute:"resizable"}),Cn({id:"editableFileSystem",label:"Editable filesystem",section:"features",default:!1,htmlAttribute:"editable-file-system"}),Cn({id:"lineNumbers",label:"Line numbers",section:"features",default:!1,htmlAttribute:"line-numbers"}),En({id:"highlight",label:"Highlight",cssProperty:"--playground-highlight-color",default:"#6200ee",section:"general appearance"}),En({id:"pageBackground",label:"Page background",default:"#cccccc",originalDefault:"#cccccc",section:"general appearance"}),kn({id:"radius",label:"Radius",cssProperty:"border-radius",formatCss:On,min:0,max:30,default:0,section:"general appearance"}),Cn({id:"borders",label:"Borders",cssProperty:"--playground-border",formatCss:e=>e?"1px solid #ddd":"none",default:!0,section:"general appearance"}),En({id:"tabBarBackground",label:"Background",cssProperty:"--playground-tab-bar-background",default:"#eaeaea",section:"tab bar"}),En({id:"tabBarForeground",label:"Foreground",cssProperty:"--playground-tab-bar-foreground-color",default:"#000000",section:"tab bar"}),kn({id:"barHeight",label:"Bar height",cssProperty:"--playground-bar-height",formatCss:On,min:10,max:100,default:40,section:"tab bar"}),En({id:"previewToolbarBackground",label:"Background",cssProperty:"--playground-preview-toolbar-background",default:"#ffffff",section:"preview"}),En({id:"previewToolbarForeground",label:"Foreground",cssProperty:"--playground-preview-toolbar-foreground-color",default:"#444444",section:"preview"}),kn({id:"previewWidth",label:"Preview width",cssProperty:"--playground-preview-width",formatCss:e=>e+"%",min:0,max:100,default:30,section:"preview"})],An={},Rn={};for(const e of Pn){An[e.id]=e;let t=Rn[e.section];void 0===t&&(t=Rn[e.section]=[]),t.push(e)}const Ln=Object.keys(An),In=Object.keys(Rn);class Mn{constructor(){this.values=new Map}getValue(e){return this.values.has(e)?this.values.get(e):An[e].default}setValue(e,t){this.values.set(e,t)}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */window.JSCompiler_renameProperty=(e,t)=>e;const Nn={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},zn=(e,t)=>t!==e&&(t==t||e==e),Fn={attribute:!0,type:String,converter:Nn,reflect:!1,hasChanged:zn};class Un extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=Fn){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Fn}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=zn){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||Nn,i="function"==typeof o?o:o.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||Nn.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=Fn){const o=this.constructor,i=o._attributeNameForProperty(e,r);if(void 0!==i){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Un.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
const Dn=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function Hn(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):Dn(e,t)}function Bn(e,t){return(r,o)=>{const i={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof o?Symbol():"__"+o;i.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==o?Vn(i,r,o):Wn(i,r)}}const Vn=(e,t,r)=>{Object.defineProperty(t,r,e)},Wn=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e})
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/,jn=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Kn=Symbol();class qn{constructor(e,t){if(t!==Kn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(jn?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Jn={};class Zn extends Un{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!jn){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new qn(t+"",Kn)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?jn?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Jn&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Jn}}Zn.finalized=!0,Zn.render=J,
/**
 * @license
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(()=>{var e,t,r;const o=Symbol(),i=Symbol(),n=Symbol(),a=Symbol(),s=Symbol(),l=Symbol(),d=Symbol(),c=Symbol(),p=Symbol(),u=Symbol(),h=Symbol(),g=Symbol(),m=Symbol();class f{constructor(){this[e]=[],this[t]=[],this[r]=new Set}destructor(){this[p](this[n]);const e=this;e[o]=null,e[n]=null,e[i]=null}get top(){const e=this[o];return e[e.length-1]||null}push(e){e&&e!==this.top&&(this.remove(e),this[l](e),this[o].push(e))}remove(e){const t=this[o].indexOf(e);return-1!==t&&(this[o].splice(t,1),t===this[o].length&&this[l](this.top),!0)}pop(){const e=this.top;return e&&this.remove(e),e}has(e){return-1!==this[o].indexOf(e)}[(e=o,t=n,r=i,l)](e){const t=this[i],r=this[n];if(!e)return this[p](r),t.clear(),void(this[n]=[]);const o=this[u](e);if(o[o.length-1].parentNode!==document.body)throw Error("Non-connected element cannot be a blocking element");this[n]=o;const a=this[h](e);if(!r.length)return void this[c](o,a,t);let s=r.length-1,l=o.length-1;for(;s>0&&l>0&&r[s]===o[l];)s--,l--;r[s]!==o[l]&&this[d](r[s],o[l]),s>0&&this[p](r.slice(0,s)),l>0&&this[c](o.slice(0,l),a,null)}[d](e,t){const r=e[a];this[g](e)&&!e.inert&&(e.inert=!0,r.add(e)),r.has(t)&&(t.inert=!1,r.delete(t)),t[s]=e[s],t[a]=r,e[s]=void 0,e[a]=void 0}[p](e){for(const t of e){t[s].disconnect(),t[s]=void 0;const e=t[a];for(const t of e)t.inert=!1;t[a]=void 0}}[c](e,t,r){for(const o of e){const e=o.parentNode,i=e.children,n=new Set;for(let e=0;e<i.length;e++){const a=i[e];a===o||!this[g](a)||t&&t.has(a)||(r&&a.inert?r.add(a):(a.inert=!0,n.add(a)))}o[a]=n;const l=new MutationObserver(this[m].bind(this));o[s]=l;let d=e;const c=d;c.__shady&&c.host&&(d=c.host),l.observe(d,{childList:!0})}}[m](e){const t=this[n],r=this[i];for(const o of e){const e=o.target.host||o.target,i=e===document.body?t.length:t.indexOf(e),n=t[i-1],s=n[a];for(let e=0;e<o.removedNodes.length;e++){const t=o.removedNodes[e];if(t===n)return console.info("Detected removal of the top Blocking Element."),void this.pop();s.has(t)&&(t.inert=!1,s.delete(t))}for(let e=0;e<o.addedNodes.length;e++){const t=o.addedNodes[e];this[g](t)&&(r&&t.inert?r.add(t):(t.inert=!0,s.add(t)))}}}[g](e){return!1===/^(style|template|script)$/.test(e.localName)}[u](e){const t=[];let r=e;for(;r&&r!==document.body;)if(r.nodeType===Node.ELEMENT_NODE&&t.push(r),r.assignedSlot){for(;r=r.assignedSlot;)t.push(r);r=t.pop()}else r=r.parentNode||r.host;return t}[h](e){const t=e.shadowRoot;if(!t)return null;const r=new Set;let o,i,n;const a=t.querySelectorAll("slot");if(a.length&&a[0].assignedNodes)for(o=0;o<a.length;o++)for(n=a[o].assignedNodes({flatten:!0}),i=0;i<n.length;i++)n[i].nodeType===Node.ELEMENT_NODE&&r.add(n[i]);return r}}document.$blockingElements=new f})();var Gn=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}();function Qn(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}!function(){if("undefined"!=typeof window){var e=Array.prototype.slice,t=Element.prototype.matches||Element.prototype.msMatchesSelector,r="a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),details,summary,iframe,object,embed,[contenteditable]",o=function(){function o(e,t){Qn(this,o),this._inertManager=t,this._rootElement=e,this._managedNodes=new Set,this._rootElement.hasAttribute("aria-hidden")?this._savedAriaHidden=this._rootElement.getAttribute("aria-hidden"):this._savedAriaHidden=null,this._rootElement.setAttribute("aria-hidden","true"),this._makeSubtreeUnfocusable(this._rootElement),this._observer=new MutationObserver(this._onMutation.bind(this)),this._observer.observe(this._rootElement,{attributes:!0,childList:!0,subtree:!0})}return Gn(o,[{key:"destructor",value:function(){this._observer.disconnect(),this._rootElement&&(null!==this._savedAriaHidden?this._rootElement.setAttribute("aria-hidden",this._savedAriaHidden):this._rootElement.removeAttribute("aria-hidden")),this._managedNodes.forEach((function(e){this._unmanageNode(e.node)}),this),this._observer=null,this._rootElement=null,this._managedNodes=null,this._inertManager=null}},{key:"_makeSubtreeUnfocusable",value:function(e){var t=this;s(e,(function(e){return t._visitNode(e)}));var r=document.activeElement;if(!document.body.contains(e)){for(var o=e,i=void 0;o;){if(o.nodeType===Node.DOCUMENT_FRAGMENT_NODE){i=o;break}o=o.parentNode}i&&(r=i.activeElement)}e.contains(r)&&(r.blur(),r===document.activeElement&&document.body.focus())}},{key:"_visitNode",value:function(e){if(e.nodeType===Node.ELEMENT_NODE){var o=e;o!==this._rootElement&&o.hasAttribute("inert")&&this._adoptInertRoot(o),(t.call(o,r)||o.hasAttribute("tabindex"))&&this._manageNode(o)}}},{key:"_manageNode",value:function(e){var t=this._inertManager.register(e,this);this._managedNodes.add(t)}},{key:"_unmanageNode",value:function(e){var t=this._inertManager.deregister(e,this);t&&this._managedNodes.delete(t)}},{key:"_unmanageSubtree",value:function(e){var t=this;s(e,(function(e){return t._unmanageNode(e)}))}},{key:"_adoptInertRoot",value:function(e){var t=this._inertManager.getInertRoot(e);t||(this._inertManager.setInert(e,!0),t=this._inertManager.getInertRoot(e)),t.managedNodes.forEach((function(e){this._manageNode(e.node)}),this)}},{key:"_onMutation",value:function(t,r){t.forEach((function(t){var r=t.target;if("childList"===t.type)e.call(t.addedNodes).forEach((function(e){this._makeSubtreeUnfocusable(e)}),this),e.call(t.removedNodes).forEach((function(e){this._unmanageSubtree(e)}),this);else if("attributes"===t.type)if("tabindex"===t.attributeName)this._manageNode(r);else if(r!==this._rootElement&&"inert"===t.attributeName&&r.hasAttribute("inert")){this._adoptInertRoot(r);var o=this._inertManager.getInertRoot(r);this._managedNodes.forEach((function(e){r.contains(e.node)&&o._manageNode(e.node)}))}}),this)}},{key:"managedNodes",get:function(){return new Set(this._managedNodes)}},{key:"hasSavedAriaHidden",get:function(){return null!==this._savedAriaHidden}},{key:"savedAriaHidden",set:function(e){this._savedAriaHidden=e},get:function(){return this._savedAriaHidden}}]),o}(),i=function(){function e(t,r){Qn(this,e),this._node=t,this._overrodeFocusMethod=!1,this._inertRoots=new Set([r]),this._savedTabIndex=null,this._destroyed=!1,this.ensureUntabbable()}return Gn(e,[{key:"destructor",value:function(){if(this._throwIfDestroyed(),this._node&&this._node.nodeType===Node.ELEMENT_NODE){var e=this._node;null!==this._savedTabIndex?e.setAttribute("tabindex",this._savedTabIndex):e.removeAttribute("tabindex"),this._overrodeFocusMethod&&delete e.focus}this._node=null,this._inertRoots=null,this._destroyed=!0}},{key:"_throwIfDestroyed",value:function(){if(this.destroyed)throw Error("Trying to access destroyed InertNode")}},{key:"ensureUntabbable",value:function(){if(this.node.nodeType===Node.ELEMENT_NODE){var e=this.node;if(t.call(e,r)){if(-1===e.tabIndex&&this.hasSavedTabIndex)return;e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex),e.setAttribute("tabindex","-1"),e.nodeType===Node.ELEMENT_NODE&&(e.focus=function(){},this._overrodeFocusMethod=!0)}else e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex,e.removeAttribute("tabindex"))}}},{key:"addInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.add(e)}},{key:"removeInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.delete(e),0===this._inertRoots.size&&this.destructor()}},{key:"destroyed",get:function(){return this._destroyed}},{key:"hasSavedTabIndex",get:function(){return null!==this._savedTabIndex}},{key:"node",get:function(){return this._throwIfDestroyed(),this._node}},{key:"savedTabIndex",set:function(e){this._throwIfDestroyed(),this._savedTabIndex=e},get:function(){return this._throwIfDestroyed(),this._savedTabIndex}}]),e}(),n=function(){function r(e){if(Qn(this,r),!e)throw Error("Missing required argument; InertManager needs to wrap a document.");this._document=e,this._managedNodes=new Map,this._inertRoots=new Map,this._observer=new MutationObserver(this._watchForInert.bind(this)),l(e.head||e.body||e.documentElement),"loading"===e.readyState?e.addEventListener("DOMContentLoaded",this._onDocumentLoaded.bind(this)):this._onDocumentLoaded()}return Gn(r,[{key:"setInert",value:function(e,t){if(t){if(this._inertRoots.has(e))return;var r=new o(e,this);if(e.setAttribute("inert",""),this._inertRoots.set(e,r),!this._document.body.contains(e))for(var i=e.parentNode;i;)11===i.nodeType&&l(i),i=i.parentNode}else{if(!this._inertRoots.has(e))return;this._inertRoots.get(e).destructor(),this._inertRoots.delete(e),e.removeAttribute("inert")}}},{key:"getInertRoot",value:function(e){return this._inertRoots.get(e)}},{key:"register",value:function(e,t){var r=this._managedNodes.get(e);return void 0!==r?r.addInertRoot(t):r=new i(e,t),this._managedNodes.set(e,r),r}},{key:"deregister",value:function(e,t){var r=this._managedNodes.get(e);return r?(r.removeInertRoot(t),r.destroyed&&this._managedNodes.delete(e),r):null}},{key:"_onDocumentLoaded",value:function(){e.call(this._document.querySelectorAll("[inert]")).forEach((function(e){this.setInert(e,!0)}),this),this._observer.observe(this._document.body||this._document.documentElement,{attributes:!0,subtree:!0,childList:!0})}},{key:"_watchForInert",value:function(r,o){var i=this;r.forEach((function(r){switch(r.type){case"childList":e.call(r.addedNodes).forEach((function(r){if(r.nodeType===Node.ELEMENT_NODE){var o=e.call(r.querySelectorAll("[inert]"));t.call(r,"[inert]")&&o.unshift(r),o.forEach((function(e){this.setInert(e,!0)}),i)}}),i);break;case"attributes":if("inert"!==r.attributeName)return;var o=r.target,n=o.hasAttribute("inert");i.setInert(o,n)}}),this)}}]),r}();if(!Element.prototype.hasOwnProperty("inert")){var a=new n(document);Object.defineProperty(Element.prototype,"inert",{enumerable:!0,get:function(){return this.hasAttribute("inert")},set:function(e){a.setInert(this,e)}})}}function s(e,t,r){if(e.nodeType==Node.ELEMENT_NODE){var o=e;t&&t(o);var i=o.shadowRoot;if(i)return void s(i,t);if("content"==o.localName){for(var n=o,a=n.getDistributedNodes?n.getDistributedNodes():[],l=0;l<a.length;l++)s(a[l],t);return}if("slot"==o.localName){for(var d=o,c=d.assignedNodes?d.assignedNodes({flatten:!0}):[],p=0;p<c.length;p++)s(c[p],t);return}}for(var u=e.firstChild;null!=u;)s(u,t),u=u.nextSibling}function l(e){if(!e.querySelector("style#inert-style, link#inert-style")){var t=document.createElement("style");t.setAttribute("id","inert-style"),t.textContent="\n[inert] {\n  pointer-events: none;\n  cursor: default;\n}\n\n[inert], [inert] * {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n",e.appendChild(t)}}}();
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Yn,Xn={CLOSING:"mdc-dialog--closing",OPEN:"mdc-dialog--open",OPENING:"mdc-dialog--opening",SCROLLABLE:"mdc-dialog--scrollable",SCROLL_LOCK:"mdc-dialog-scroll-lock",STACKED:"mdc-dialog--stacked",FULLSCREEN:"mdc-dialog--fullscreen",SCROLL_DIVIDER_HEADER:"mdc-dialog-scroll-divider-header",SCROLL_DIVIDER_FOOTER:"mdc-dialog-scroll-divider-footer",SURFACE_SCRIM_SHOWN:"mdc-dialog__surface-scrim--shown",SURFACE_SCRIM_SHOWING:"mdc-dialog__surface-scrim--showing",SURFACE_SCRIM_HIDING:"mdc-dialog__surface-scrim--hiding",SCRIM_HIDDEN:"mdc-dialog__scrim--hidden"},$n={ACTION_ATTRIBUTE:"data-mdc-dialog-action",BUTTON_DEFAULT_ATTRIBUTE:"data-mdc-dialog-button-default",BUTTON_SELECTOR:".mdc-dialog__button",CLOSED_EVENT:"MDCDialog:closed",CLOSE_ACTION:"close",CLOSING_EVENT:"MDCDialog:closing",CONTAINER_SELECTOR:".mdc-dialog__container",CONTENT_SELECTOR:".mdc-dialog__content",DESTROY_ACTION:"destroy",INITIAL_FOCUS_ATTRIBUTE:"data-mdc-dialog-initial-focus",OPENED_EVENT:"MDCDialog:opened",OPENING_EVENT:"MDCDialog:opening",SCRIM_SELECTOR:".mdc-dialog__scrim",SUPPRESS_DEFAULT_PRESS_SELECTOR:"textarea, .mdc-menu .mdc-list-item, .mdc-menu .mdc-deprecated-list-item",SURFACE_SELECTOR:".mdc-dialog__surface"},ea={DIALOG_ANIMATION_CLOSE_TIME_MS:75,DIALOG_ANIMATION_OPEN_TIME_MS:150},ta=function(){function e(){this.rafIDs=new Map}return e.prototype.request=function(e,t){var r=this;this.cancel(e);var o=requestAnimationFrame((function(o){r.rafIDs.delete(e),t(o)}));this.rafIDs.set(e,o)},e.prototype.cancel=function(e){var t=this.rafIDs.get(e);t&&(cancelAnimationFrame(t),this.rafIDs.delete(e))},e.prototype.cancelAll=function(){var e=this;this.rafIDs.forEach((function(t,r){e.cancel(r)}))},e.prototype.getQueue=function(){var e=[];return this.rafIDs.forEach((function(t,r){e.push(r)})),e},e}();!function(e){e.POLL_SCROLL_POS="poll_scroll_position",e.POLL_LAYOUT_CHANGE="poll_layout_change"}(Yn||(Yn={}));var ra=function(e){function o(t){var i=e.call(this,r(r({},o.defaultAdapter),t))||this;return i.dialogOpen=!1,i.isFullscreen=!1,i.animationFrame=0,i.animationTimer=0,i.escapeKeyAction=$n.CLOSE_ACTION,i.scrimClickAction=$n.CLOSE_ACTION,i.autoStackButtons=!0,i.areButtonsStacked=!1,i.suppressDefaultPressSelector=$n.SUPPRESS_DEFAULT_PRESS_SELECTOR,i.animFrame=new ta,i.contentScrollHandler=function(){i.handleScrollEvent()},i.windowResizeHandler=function(){i.layout()},i.windowOrientationChangeHandler=function(){i.layout()},i}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return Xn},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return $n},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return ea},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addBodyClass:function(){},addClass:function(){},areButtonsStacked:function(){return!1},clickDefaultButton:function(){},eventTargetMatches:function(){return!1},getActionFromEvent:function(){return""},getInitialFocusEl:function(){return null},hasClass:function(){return!1},isContentScrollable:function(){return!1},notifyClosed:function(){},notifyClosing:function(){},notifyOpened:function(){},notifyOpening:function(){},releaseFocus:function(){},removeBodyClass:function(){},removeClass:function(){},reverseButtons:function(){},trapFocus:function(){},registerContentEventHandler:function(){},deregisterContentEventHandler:function(){},isScrollableContentAtTop:function(){return!1},isScrollableContentAtBottom:function(){return!1},registerWindowEventHandler:function(){},deregisterWindowEventHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.hasClass(Xn.STACKED)&&this.setAutoStackButtons(!1),this.isFullscreen=this.adapter.hasClass(Xn.FULLSCREEN)},o.prototype.destroy=function(){this.animationTimer&&(clearTimeout(this.animationTimer),this.handleAnimationTimerEnd()),this.isFullscreen&&this.adapter.deregisterContentEventHandler("scroll",this.contentScrollHandler),this.animFrame.cancelAll(),this.adapter.deregisterWindowEventHandler("resize",this.windowResizeHandler),this.adapter.deregisterWindowEventHandler("orientationchange",this.windowOrientationChangeHandler)},o.prototype.open=function(e){var t=this;this.dialogOpen=!0,this.adapter.notifyOpening(),this.adapter.addClass(Xn.OPENING),this.isFullscreen&&this.adapter.registerContentEventHandler("scroll",this.contentScrollHandler),e&&e.isAboveFullscreenDialog&&this.adapter.addClass(Xn.SCRIM_HIDDEN),this.adapter.registerWindowEventHandler("resize",this.windowResizeHandler),this.adapter.registerWindowEventHandler("orientationchange",this.windowOrientationChangeHandler),this.runNextAnimationFrame((function(){t.adapter.addClass(Xn.OPEN),t.adapter.addBodyClass(Xn.SCROLL_LOCK),t.layout(),t.animationTimer=setTimeout((function(){t.handleAnimationTimerEnd(),t.adapter.trapFocus(t.adapter.getInitialFocusEl()),t.adapter.notifyOpened()}),ea.DIALOG_ANIMATION_OPEN_TIME_MS)}))},o.prototype.close=function(e){var t=this;void 0===e&&(e=""),this.dialogOpen&&(this.dialogOpen=!1,this.adapter.notifyClosing(e),this.adapter.addClass(Xn.CLOSING),this.adapter.removeClass(Xn.OPEN),this.adapter.removeBodyClass(Xn.SCROLL_LOCK),this.isFullscreen&&this.adapter.deregisterContentEventHandler("scroll",this.contentScrollHandler),this.adapter.deregisterWindowEventHandler("resize",this.windowResizeHandler),this.adapter.deregisterWindowEventHandler("orientationchange",this.windowOrientationChangeHandler),cancelAnimationFrame(this.animationFrame),this.animationFrame=0,clearTimeout(this.animationTimer),this.animationTimer=setTimeout((function(){t.adapter.releaseFocus(),t.handleAnimationTimerEnd(),t.adapter.notifyClosed(e)}),ea.DIALOG_ANIMATION_CLOSE_TIME_MS))},o.prototype.showSurfaceScrim=function(){var e=this;this.adapter.addClass(Xn.SURFACE_SCRIM_SHOWING),this.runNextAnimationFrame((function(){e.adapter.addClass(Xn.SURFACE_SCRIM_SHOWN)}))},o.prototype.hideSurfaceScrim=function(){this.adapter.removeClass(Xn.SURFACE_SCRIM_SHOWN),this.adapter.addClass(Xn.SURFACE_SCRIM_HIDING)},o.prototype.handleSurfaceScrimTransitionEnd=function(){this.adapter.removeClass(Xn.SURFACE_SCRIM_HIDING),this.adapter.removeClass(Xn.SURFACE_SCRIM_SHOWING)},o.prototype.isOpen=function(){return this.dialogOpen},o.prototype.getEscapeKeyAction=function(){return this.escapeKeyAction},o.prototype.setEscapeKeyAction=function(e){this.escapeKeyAction=e},o.prototype.getScrimClickAction=function(){return this.scrimClickAction},o.prototype.setScrimClickAction=function(e){this.scrimClickAction=e},o.prototype.getAutoStackButtons=function(){return this.autoStackButtons},o.prototype.setAutoStackButtons=function(e){this.autoStackButtons=e},o.prototype.getSuppressDefaultPressSelector=function(){return this.suppressDefaultPressSelector},o.prototype.setSuppressDefaultPressSelector=function(e){this.suppressDefaultPressSelector=e},o.prototype.layout=function(){var e=this;this.animFrame.request(Yn.POLL_LAYOUT_CHANGE,(function(){e.layoutInternal()}))},o.prototype.handleClick=function(e){if(this.adapter.eventTargetMatches(e.target,$n.SCRIM_SELECTOR)&&""!==this.scrimClickAction)this.close(this.scrimClickAction);else{var t=this.adapter.getActionFromEvent(e);t&&this.close(t)}},o.prototype.handleKeydown=function(e){var t="Enter"===e.key||13===e.keyCode;if(t&&!this.adapter.getActionFromEvent(e)){var r=e.composedPath?e.composedPath()[0]:e.target,o=!this.suppressDefaultPressSelector||!this.adapter.eventTargetMatches(r,this.suppressDefaultPressSelector);t&&o&&this.adapter.clickDefaultButton()}},o.prototype.handleDocumentKeydown=function(e){("Escape"===e.key||27===e.keyCode)&&""!==this.escapeKeyAction&&this.close(this.escapeKeyAction)},o.prototype.handleScrollEvent=function(){var e=this;this.animFrame.request(Yn.POLL_SCROLL_POS,(function(){e.toggleScrollDividerHeader(),e.toggleScrollDividerFooter()}))},o.prototype.layoutInternal=function(){this.autoStackButtons&&this.detectStackedButtons(),this.toggleScrollableClasses()},o.prototype.handleAnimationTimerEnd=function(){this.animationTimer=0,this.adapter.removeClass(Xn.OPENING),this.adapter.removeClass(Xn.CLOSING)},o.prototype.runNextAnimationFrame=function(e){var t=this;cancelAnimationFrame(this.animationFrame),this.animationFrame=requestAnimationFrame((function(){t.animationFrame=0,clearTimeout(t.animationTimer),t.animationTimer=setTimeout(e,0)}))},o.prototype.detectStackedButtons=function(){this.adapter.removeClass(Xn.STACKED);var e=this.adapter.areButtonsStacked();e&&this.adapter.addClass(Xn.STACKED),e!==this.areButtonsStacked&&(this.adapter.reverseButtons(),this.areButtonsStacked=e)},o.prototype.toggleScrollableClasses=function(){this.adapter.removeClass(Xn.SCROLLABLE),this.adapter.isContentScrollable()&&(this.adapter.addClass(Xn.SCROLLABLE),this.isFullscreen&&(this.toggleScrollDividerHeader(),this.toggleScrollDividerFooter()))},o.prototype.toggleScrollDividerHeader=function(){this.adapter.isScrollableContentAtTop()?this.adapter.hasClass(Xn.SCROLL_DIVIDER_HEADER)&&this.adapter.removeClass(Xn.SCROLL_DIVIDER_HEADER):this.adapter.addClass(Xn.SCROLL_DIVIDER_HEADER)},o.prototype.toggleScrollDividerFooter=function(){this.adapter.isScrollableContentAtBottom()?this.adapter.hasClass(Xn.SCROLL_DIVIDER_FOOTER)&&this.adapter.removeClass(Xn.SCROLL_DIVIDER_FOOTER):this.adapter.addClass(Xn.SCROLL_DIVIDER_FOOTER)},o}(Pt);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */function oa(e){return void 0===e&&(e=window),!!function(e){void 0===e&&(e=window);var t=!1;try{var r={get passive(){return t=!0,!1}},o=function(){};e.document.addEventListener("test",o,r),e.document.removeEventListener("test",o,r)}catch(e){t=!1}return t}(e)&&{passive:!0}}const ia=document.$blockingElements;class na extends Ot{constructor(){super(...arguments),this.hideActions=!1,this.stacked=!1,this.heading="",this.scrimClickAction="close",this.escapeKeyAction="close",this.open=!1,this.defaultAction="close",this.actionAttribute="dialogAction",this.initialFocusAttribute="dialogInitialFocus",this.initialSupressDefaultPressSelector="",this.mdcFoundationClass=ra,this.boundHandleClick=null,this.boundHandleKeydown=null,this.boundHandleDocumentKeydown=null}set suppressDefaultPressSelector(e){this.mdcFoundation?this.mdcFoundation.setSuppressDefaultPressSelector(e):this.initialSupressDefaultPressSelector=e}get suppressDefaultPressSelector(){return this.mdcFoundation?this.mdcFoundation.getSuppressDefaultPressSelector():this.initialSupressDefaultPressSelector}get primaryButton(){let e=this.primarySlot.assignedNodes();e=e.filter((e=>e instanceof HTMLElement));return e[0]||null}emitNotification(e,t){const r=new CustomEvent(e,{detail:t?{action:t}:{}});this.dispatchEvent(r)}getInitialFocusEl(){const e=`[${this.initialFocusAttribute}]`,t=this.querySelector(e);if(t)return t;const r=this.primarySlot.assignedNodes({flatten:!0}),o=this.searchNodeTreesForAttribute(r,this.initialFocusAttribute);if(o)return o;const i=this.secondarySlot.assignedNodes({flatten:!0}),n=this.searchNodeTreesForAttribute(i,this.initialFocusAttribute);if(n)return n;const a=this.contentSlot.assignedNodes({flatten:!0});return this.searchNodeTreesForAttribute(a,this.initialFocusAttribute)}searchNodeTreesForAttribute(e,t){for(const r of e)if(r instanceof HTMLElement){if(r.hasAttribute(t))return r;{const e=r.querySelector(`[${t}]`);if(e)return e}}return null}createAdapter(){return Object.assign(Object.assign({},St(this.mdcRoot)),{addBodyClass:()=>document.body.style.overflow="hidden",removeBodyClass:()=>document.body.style.overflow="",areButtonsStacked:()=>this.stacked,clickDefaultButton:()=>{const e=this.primaryButton;e&&e.click()},eventTargetMatches:(e,t)=>!!e&&ut(e,t),getActionFromEvent:e=>{if(!e.target)return"";const t=
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function(e,t){if(e.closest)return e.closest(t);for(var r=e;r;){if(ut(r,t))return r;r=r.parentElement}return null}(e.target,`[${this.actionAttribute}]`);return t&&t.getAttribute(this.actionAttribute)},getInitialFocusEl:()=>this.getInitialFocusEl(),isContentScrollable:()=>{const e=this.contentElement;return!!e&&e.scrollHeight>e.offsetHeight},notifyClosed:e=>this.emitNotification("closed",e),notifyClosing:e=>{this.closingDueToDisconnect||(this.open=!1),this.emitNotification("closing",e)},notifyOpened:()=>this.emitNotification("opened"),notifyOpening:()=>{this.open=!0,this.emitNotification("opening")},reverseButtons:()=>{},releaseFocus:()=>{ia.remove(this)},trapFocus:e=>{this.isConnected&&(ia.push(this),e&&e.focus())},registerContentEventHandler:(e,t)=>{this.contentElement.addEventListener(e,t)},deregisterContentEventHandler:(e,t)=>{this.contentElement.removeEventListener(e,t)},isScrollableContentAtTop:()=>{const e=this.contentElement;return!!e&&0===e.scrollTop},isScrollableContentAtBottom:()=>{const e=this.contentElement;return!!e&&Math.ceil(e.scrollHeight-e.scrollTop)===e.clientHeight},registerWindowEventHandler:(e,t)=>{window.addEventListener(e,t,oa())},deregisterWindowEventHandler:(e,t)=>{window.removeEventListener(e,t,oa())}})}render(){const e={[Xn.STACKED]:this.stacked};let t=B``;this.heading&&(t=this.renderHeading());const r={"mdc-dialog__actions":!this.hideActions};return B`
    <div class="mdc-dialog ${Dt(e)}"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="title"
        aria-describedby="content">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          ${t}
          <div id="content" class="mdc-dialog__content">
            <slot id="contentSlot"></slot>
          </div>
          <footer
              id="actions"
              class="${Dt(r)}">
            <span>
              <slot name="secondaryAction"></slot>
            </span>
            <span>
             <slot name="primaryAction"></slot>
            </span>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>`}renderHeading(){return B`
      <h2 id="title" class="mdc-dialog__title">${this.heading}</h2>`}firstUpdated(){super.firstUpdated(),this.mdcFoundation.setAutoStackButtons(!0),this.initialSupressDefaultPressSelector?this.suppressDefaultPressSelector=this.initialSupressDefaultPressSelector:this.suppressDefaultPressSelector=[this.suppressDefaultPressSelector,"mwc-textarea, mwc-menu mwc-list-item, mwc-select mwc-list-item"].join(", "),this.boundHandleClick=this.mdcFoundation.handleClick.bind(this.mdcFoundation),this.boundHandleKeydown=this.mdcFoundation.handleKeydown.bind(this.mdcFoundation),this.boundHandleDocumentKeydown=this.mdcFoundation.handleDocumentKeydown.bind(this.mdcFoundation)}connectedCallback(){super.connectedCallback(),this.open&&this.mdcFoundation&&!this.mdcFoundation.isOpen()&&(this.setEventListeners(),this.mdcFoundation.open())}disconnectedCallback(){super.disconnectedCallback(),this.open&&this.mdcFoundation&&(this.removeEventListeners(),this.closingDueToDisconnect=!0,this.mdcFoundation.close(this.currentAction||this.defaultAction),this.closingDueToDisconnect=!1,this.currentAction=void 0,ia.remove(this))}forceLayout(){this.mdcFoundation.layout()}focus(){const e=this.getInitialFocusEl();e&&e.focus()}blur(){if(!this.shadowRoot)return;const e=this.shadowRoot.activeElement;if(e)e instanceof HTMLElement&&e.blur();else{const e=this.getRootNode(),t=e instanceof Document?e.activeElement:null;t instanceof HTMLElement&&t.blur()}}setEventListeners(){this.boundHandleClick&&this.mdcRoot.addEventListener("click",this.boundHandleClick),this.boundHandleKeydown&&this.mdcRoot.addEventListener("keydown",this.boundHandleKeydown,oa()),this.boundHandleDocumentKeydown&&document.addEventListener("keydown",this.boundHandleDocumentKeydown,oa())}removeEventListeners(){this.boundHandleClick&&this.mdcRoot.removeEventListener("click",this.boundHandleClick),this.boundHandleKeydown&&this.mdcRoot.removeEventListener("keydown",this.boundHandleKeydown),this.boundHandleDocumentKeydown&&document.removeEventListener("keydown",this.boundHandleDocumentKeydown)}close(){this.open=!1}show(){this.open=!0}}o([Bn(".mdc-dialog")],na.prototype,"mdcRoot",void 0),o([Bn('slot[name="primaryAction"]')],na.prototype,"primarySlot",void 0),o([Bn('slot[name="secondaryAction"]')],na.prototype,"secondarySlot",void 0),o([Bn("#contentSlot")],na.prototype,"contentSlot",void 0),o([Bn(".mdc-dialog__content")],na.prototype,"contentElement",void 0),o([Bn(".mdc-container")],na.prototype,"conatinerElement",void 0),o([Hn({type:Boolean})],na.prototype,"hideActions",void 0),o([Hn({type:Boolean}),yr((function(){this.forceLayout()}))],na.prototype,"stacked",void 0),o([Hn({type:String})],na.prototype,"heading",void 0),o([Hn({type:String}),yr((function(e){this.mdcFoundation.setScrimClickAction(e)}))],na.prototype,"scrimClickAction",void 0),o([Hn({type:String}),yr((function(e){this.mdcFoundation.setEscapeKeyAction(e)}))],na.prototype,"escapeKeyAction",void 0),o([Hn({type:Boolean,reflect:!0}),yr((function(e){this.mdcFoundation&&this.isConnected&&(e?(this.setEventListeners(),this.mdcFoundation.open()):(this.removeEventListeners(),this.mdcFoundation.close(this.currentAction||this.defaultAction),this.currentAction=void 0))}))],na.prototype,"open",void 0),o([Hn()],na.prototype,"defaultAction",void 0),o([Hn()],na.prototype,"actionAttribute",void 0),o([Hn()],na.prototype,"initialFocusAttribute",void 0);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const aa=((e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof qn)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new qn(r,Kn)})`.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__surface{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__surface-scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87)}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6)}.mdc-dialog .mdc-dialog__close{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-dialog .mdc-dialog__close::before,.mdc-dialog .mdc-dialog__close::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-dialog .mdc-dialog__close:hover::before,.mdc-dialog .mdc-dialog__close.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded--background-focused::before,.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions,.mdc-dialog.mdc-dialog--scrollable.mdc-dialog-scroll-divider-footer .mdc-dialog__actions{border-color:rgba(0,0,0,.12)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:1px solid rgba(0,0,0,.12);margin-bottom:0}.mdc-dialog.mdc-dialog-scroll-divider-header.mdc-dialog--fullscreen .mdc-dialog__header{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}@media(max-width: 960px)and (max-height: 1440px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;max-width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 1023px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:calc(100vw - 112px)}}@media(max-width: 720px)and (max-height: 1023px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:560px}}@media(max-width: 720px)and (max-height: 1023px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (max-height: 1023px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px)and (max-height: 1023px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100%;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(max-width: 600px)and (max-height: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100%;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px)and (min-height: 1440px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12);display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid transparent;border-radius:inherit;content:"";pointer-events:none}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;line-height:normal;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{display:inline-flex;padding:0 24px 9px;border-bottom:1px solid transparent;justify-content:space-between;align-items:baseline}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid transparent}.mdc-dialog__content{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-body1-font-size, 1rem);line-height:1.5rem;line-height:var(--mdc-typography-body1-line-height, 1.5rem);font-weight:400;font-weight:var(--mdc-typography-body1-font-weight, 400);letter-spacing:0.03125em;letter-spacing:var(--mdc-typography-body1-letter-spacing, 0.03125em);text-decoration:inherit;text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body1-text-transform, inherit);flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1;z-index:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}#actions:not(.mdc-dialog__actions){display:none}.mdc-dialog__surface{box-shadow:var(--mdc-dialog-box-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}@media(min-width: 560px){.mdc-dialog .mdc-dialog__surface{max-width:560px;max-width:var(--mdc-dialog-max-width, 560px)}}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0, 0, 0, 0.32);background-color:var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32))}.mdc-dialog .mdc-dialog__title{color:rgba(0, 0, 0, 0.87);color:var(--mdc-dialog-heading-ink-color, rgba(0, 0, 0, 0.87))}.mdc-dialog .mdc-dialog__content{color:rgba(0, 0, 0, 0.6);color:var(--mdc-dialog-content-ink-color, rgba(0, 0, 0, 0.6))}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-dialog-scroll-divider-color, rgba(0, 0, 0, 0.12))}.mdc-dialog .mdc-dialog__surface{min-width:280px;min-width:var(--mdc-dialog-min-width, 280px)}.mdc-dialog .mdc-dialog__surface{max-height:var(--mdc-dialog-max-height, calc(100% - 32px))}#actions ::slotted(*){margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*)[dir=rtl]{margin-left:0;margin-right:8px}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*)[dir=rtl]{text-align:left}.mdc-dialog--stacked #actions{flex-direction:column-reverse}.mdc-dialog--stacked #actions *:not(:last-child) ::slotted(*){flex-basis:1e-9px;margin-top:12px}`;let sa=class extends na{};sa.styles=aa,sa=o([e=>{return"function"==typeof e?(t=e,window.customElements.define("mwc-dialog",t),t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(e){window.customElements.define("mwc-dialog",e)}}})(0,e);var t}],sa);
/**
 * @license
 * Copyright (c) 2021 The Polymer Project Authors. All rights reserved.
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
let la=class extends ce{constructor(){super(...arguments),this._filetype="ts",this._iframeSrcdoc="",this._codeText="",this._propertyValues=new Map([["--playground-code-background",null],...Sn.map((({cssProperty:e})=>[e,null]))])}render(){return B`
      <h2>Theme detector</h2>

      <ol>
        <li>
          Pick a theme in VSCode<br />
          or any editor that copies as styled HTML
        </li>

        <li>
          Open a file with a variety of syntax<br />
          or click to copy a sample to paste:
          <br />
          <button @click=${()=>this._copySample("ts")}>TypeScript</button>
          <button @click=${()=>this._copySample("html")}>HTML</button>
          <button @click=${()=>this._copySample("css")}>CSS</button>
        </li>

        <li>Select All and Copy</li>

        <li>
          Confirm the filetype:
          <br />
          <label
            ><input
              type="radio"
              name="type"
              value="ts"
              .checked=${"ts"===this._filetype}
            />TypeScript</label
          >
          <label
            ><input
              type="radio"
              name="type"
              value="html"
              .checked=${"html"===this._filetype}
            />HTML</label
          >
          <label
            ><input
              type="radio"
              name="type"
              value="css"
              .checked=${"css"===this._filetype}
            />CSS</label
          >
        </li>
        <li>Click in the box below to paste and extract:</li>
      </ol>

      <div id="pasteArea" @click=${this._onClickPasteButton}>
        <iframe
          sandbox="allow-same-origin"
          srcdoc=${this._iframeSrcdoc}
          @load=${this._extractStyles}
        ></iframe>
      </div>

      <playground-code-editor
        .type=${this._filetype}
        .value=${this._codeText}
      ></playground-code-editor>

      <div id="palette">
        ${[...this._propertyValues].map((([e,t])=>B`<span
              class="color"
              title=${e}
              style="background:${null!=t?t:"transparent"}"
            ></span>`))}
      </div>

      <div id="buttons">
        <button
          @click=${this._onClickApply}
          .disabled=${![...this._propertyValues.values()].some((e=>null!==e))}
        >
          Apply
        </button>
        <button @click=${this._onClickCancel}>Cancel</button>
      </div>
    `}async firstUpdated(){await this._playgroundWithUserText.updateComplete,this._playgroundWithUserText._codemirror.setOption("viewportMargin",1/0)}async _copySample(e){this._filetype=e,await navigator.clipboard.writeText(da[this._filetype])}async _onClickPasteButton(){const{html:e,text:t}=await this._readClipboard();e&&t&&(this._iframeSrcdoc="<style>body{margin:0}</style>"+e,this._codeText=t)}async _readClipboard(){let e="",t="";const r=await navigator.clipboard.read();for(const o of r)for(const r of o.types)if("text/html"===r){const t=await o.getType(r);e=await t.text()}else if("text/plain"===r){const e=await o.getType(r);t=await e.text()}return{html:e,text:t}}_extractStyles(){var e;if(!this._iframeSrcdoc)return;const t=new Map,r=document.createTreeWalker(this._playgroundWithUserText.shadowRoot,NodeFilter.SHOW_TEXT);for(;r.nextNode();){const e=r.currentNode,o=e.parentElement;if(null===o)continue;let i;const n=[...o.classList].filter((e=>e.startsWith("cm-")));if(n.length>0)i=`--playground-code-${n[n.length-1].slice(3)}-color`;else{if("presentation"!==o.getAttribute("role"))continue;i="--playground-code-default-color"}const a=e.textContent.replace(/^<\/?/,"").replace(/>$/,"");let s=t.get(a);s||(s=[],t.set(a,s)),s.push(i)}const o=this._iframeWithUserHtml.contentDocument,i=o.createTreeWalker(o.body,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let n=!1;for(;i.nextNode();){const r=i.currentNode;if(r.nodeType===Node.TEXT_NODE){const o=r.textContent.replace(/^<\/?/,"").replace(/>$/,""),i=null===(e=t.get(o))||void 0===e?void 0:e.shift();if(i&&null===this._propertyValues.get(i)){const e=window.getComputedStyle(r.parentElement).color;this._propertyValues.set(i,e)}}else if(!n&&r.nodeType===Node.ELEMENT_NODE){const e=window.getComputedStyle(r).backgroundColor;"rgba(0, 0, 0, 0)"!==e&&(n=!0,this._propertyValues.set("--playground-code-background",e))}}this.requestUpdate()}_onClickApply(){this.dispatchEvent(new CustomEvent("apply",{detail:{properties:this._propertyValues}}))}_onClickCancel(){this.dispatchEvent(new CustomEvent("cancel"))}};la.styles=le`
    ol {
      padding-left: 24px;
    }

    li {
      margin-bottom: 1em;
    }

    button,
    label {
      cursor: pointer;
    }

    #pasteArea {
      cursor: pointer;
    }

    iframe {
      width: 100%;
      pointer-events: none;
      margin-bottom: 1em;
    }

    playground-code-editor {
      position: absolute;
      visibility: hidden;
      width: 1px;
      height: 1px;
    }

    #palette {
      display: flex;
      margin-bottom: 2em;
    }

    .color {
      height: 25px;
      flex: 1;
    }

    #buttons {
      display: flex;
      justify-content: flex-end;
    }

    #buttons > button {
      margin-left: 1em;
      font-size: 18px;
    }
  `,o([te()],la.prototype,"_filetype",void 0),o([te()],la.prototype,"_iframeSrcdoc",void 0),o([te()],la.prototype,"_codeText",void 0),o([te()],la.prototype,"_propertyValues",void 0),o([re("iframe")],la.prototype,"_iframeWithUserHtml",void 0),o([re("playground-code-editor")],la.prototype,"_playgroundWithUserText",void 0),la=o([X("playground-theme-detector")],la);const da={ts:"// Playground Sample TypeScript file\n/* Another kind of comment */\nlet variable = 1 + 1 === 2 === true;\nconst fn = (param: number) => param;\nfn(3);\n'string1';\n`string2`;\n`string3 ${variable}`\nexport class Class {\n  property: string;\n}\nhtml`\n  \x3c!-- HTML comment --\x3e\n  <!DOCTYPE html>\n  <button attr=\"val\">text</button>\n`;\ncss`\n  /* CSS comment */\n  p, #id, .class, a, :hover {\n    color: red;\n    content: 'c';\n  }\n`;",html:'\x3c!-- Playground sample HTML file --\x3e\n<!DOCTYPE html>\n<button attr="val">text</button>',css:"/* Playground sample CSS file */\np, #id, .class, a, :hover {\n  color: red;\n  content: 'c';\n}"};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ca=class extends ce{constructor(){super(...arguments),this.values=new Mn,this._themeDetectorOpen=!1}connectedCallback(){super.connectedCallback(),this.readUrlParams(new URL(document.location.href).searchParams)}async setValue(e,t){await this.setValues(new Map([[e,t]]))}async setValues(e){const t=e.get("theme");t&&await this._applyTheme(t);for(const[t,r]of e)this.values.setValue(t,r);this.setUrlParams(),this.requestUpdate()}async _applyTheme(e){if(this.values.setValue("theme",e),"default"===e){for(const e of Sn){const t=An[e.id];t.originalDefault&&(t.default=t.originalDefault),this.values.setValue(t.id,t.default)}return this.setUrlParams(),void this.requestUpdate()}for(const e of Sn){const t=An[e.id];this.values.setValue(t.id,t.default)}this.requestUpdate(),await this.updateComplete;const t=window.getComputedStyle(this._ide);for(const e of Sn){const r=An[e.id];if(!r.cssProperty)continue;const o=t.getPropertyValue(r.cssProperty),i=ha(o);this.values.setValue(r.id,i),r.default=i}}readUrlParams(e){const t=new Map;for(const r of Ln){let o=e.get(r);if(null===o)continue;const i=An[r];switch(i.type){case"checkbox":t.set(i.id,"y"===o);break;case"color":t.set(i.id,"#"+o);break;case"slider":t.set(i.id,Number(o));break;case"select":t.set(i.id,o);break;default:pa(0,"Unexpected knob type "+i.type)}}this.setValues(t)}setUrlParams(){const e=new URLSearchParams;for(const t of Pn){let r=this.values.getValue(t.id);if(r!==t.default)switch(t.type){case"checkbox":e.set(t.id,r?"y":"n");break;case"color":e.set(t.id,r.substring(1));break;case"slider":e.set(t.id,r+"");break;case"select":e.set(t.id,r);break;default:pa(0,"Unexpected knob type "+t.type)}}history.replaceState(null,"","?"+e.toString())}render(){return B`
      <style>
        ${this.cssText}
      </style>

      <mwc-dialog
        hideActions
        id="detectorDialog"
        .open=${this._themeDetectorOpen}
        @closed=${this._closeThemeDetector}
      >
        ${this._themeDetectorOpen?B`<playground-theme-detector
              @apply=${this._onThemeDetectorApply}
              @cancel=${this._closeThemeDetector}
            ></playground-theme-detector>`:_}
      </mwc-dialog>

      <div id="lhs">${this.knobs}</div>

      <div id="rhs">
        <div
          id="container"
          style="background-color:${this.values.getValue("pageBackground")}"
        >
          <playground-ide
            id="playground"
            class="playground-theme-${this.values.getValue("theme")}"
            .lineNumbers=${this.values.getValue("lineNumbers")}
            .resizable=${this.values.getValue("resizable")}
            .editableFileSystem=${this.values.getValue("editableFileSystem")}
            project-src="./project/project.json"
          >
          </playground-ide>

          ${ua}
        </div>

        <div id="code">
          <div>
            <h3>CSS</h3>
            <playground-code-editor .value=${this.cssText} type="css" readonly>
            </playground-code-editor>
          </div>

          <div>
            <h3>HTML</h3>
            <playground-code-editor
              .value=${this.htmlText}
              type="html"
              readonly
            >
            </playground-code-editor>
          </div>
        </div>
      </div>
    `}get knobs(){return In.map((e=>B`<section>
          <h3 class="sectionLabel">${e}</h3>
          <div class="knobs">
            ${Rn[e].map((e=>this.knob(e)))}
          </div>
        </section>`))}get htmlText(){return`${this.themeImport}\n<playground-ide id="playground"${this.htmlTextAttributes}>\n</playground-ide>\n`}get themeImport(){const e=this.values.getValue("theme");return"default"===e?"":`<import rel="stylesheet"\n        src="/node_modules/playground-elements/themes/${e}.css">\n`}get htmlTextAttributes(){const e=[];for(const t of Ln){const r=An[t];if(!r.htmlAttribute)continue;const o=this.values.getValue(t);if(o!==r.default)switch(r.type){case"checkbox":o&&e.push("\n  "+r.htmlAttribute);break;default:e.push(`\n  ${r.htmlAttribute}="${o}"`)}}const t=this.values.getValue("theme");return"default"!==t&&e.push(`\n  class="playground-theme-${t}"`),e.join("")}get cssText(){const e=[];for(const t of Ln){const r=An[t];if(!r.cssProperty)continue;const o=this.values.getValue(t);let i=`${r.cssProperty}: ${r.formatCss?r.formatCss(o):o};`;o!==r.default&&(i="  "+i,e.push(i))}return`\n#playground {\n${e.join("\n")}\n}\n    `}knob(e){let t;switch(e.type){case"select":t=this.selectKnob(e);break;case"slider":t=this.sliderKnob(e);break;case"color":t=this.colorKnob(e);break;case"checkbox":t=this.checkboxKnob(e)}if(!t)return _;const r=B`<label for=${e.id}>${e.label}</label>`;if("theme"===e.id){const e=B`<button
        id="openDetectorButton"
        @click=${this._openThemeDetector}
      >
        Import Theme
      </button>`;return[r,t,B`<span></span>`,e]}return[r,t]}selectKnob(e){const t=this.values.getValue(e.id);return B`
      <select
        id=${e.id}
        @input=${t=>{this.setValue(e.id,t.target.value)}}
      >
        ${e.options.map((e=>B`<option value=${e} ?selected=${e===t}>
              ${e}
            </option>`))}
      </select>
    `}sliderKnob(e){const t=this.values.getValue(e.id);return B`
      <span class="sliderAndValue">
        <input
          id=${e.id}
          type="range"
          min=${e.min}
          max=${e.max}
          value=${t}
          @input=${t=>{this.setValue(e.id,Number(t.target.value))}}
        />
        <span class="sliderValue"
          >${e.formatCss?e.formatCss(t):t}</span
        >
      </span>
    `}colorKnob(e){let t=this.values.getValue(e.id);return B`
      ${"unsetLabel"in e?B`
            <div style="margin-bottom: 5px">
              <input
                id=${e.id+"-unset"}
                type="checkbox"
                ?checked=${""===t}
                @input=${r=>{t=r.target.checked?"":"#ffffff",this.setValue(e.id,t)}}
              />
              <label for=${e.id+"-unset"}> ${e.unsetLabel}</label>
            </div>
            <span></span>
          `:""}
      <input
        id=${e.id}
        type="color"
        .value=${""===t?"#ffffff":t+""}
        @input=${t=>{this.setValue(e.id,t.target.value)}}
      />
    `}checkboxKnob(e){let t=this.values.getValue(e.id);return B`
      <input
        id=${e.id}
        type="checkbox"
        ?checked=${t}
        @change=${t=>{this.setValue(e.id,t.target.checked)}}
      />
    `}_openThemeDetector(){this._themeDetectorOpen=!0}_closeThemeDetector(){this._themeDetectorOpen=!1}async _onThemeDetectorApply(e){const t=new Map;t.set("theme","default");const r=new Map;for(const[t,o]of e.detail.properties)r.set(t,o?ha(o):void 0);const o=An.synDefault,i=r.get(o.cssProperty)||o.default;for(const e of Pn)if(e.cssProperty&&r.has(e.cssProperty)){const o=r.get(e.cssProperty)||i;t.set(e.id,o)}this.setValues(t),this._closeThemeDetector()}};function pa(e,t){throw Error(t)}ca.styles=[...wn,le`
      :host {
        display: flex;
        font-family: Roboto, Arial, Helvetica, sans-serif;
      }

      #lhs {
        overflow-y: auto;
        width: 300px;
        border-right: 1px solid #ccc;
        box-shadow: -2px 0 6px 0px rgb(0 0 0 / 50%);
        z-index: 1;
        color: #424242;
        font-size: 13px;
      }

      #rhs {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: auto;
      }

      #container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        /* To position the GitHub cat corner. */
        position: relative;
      }

      playground-ide {
        flex: 1;
        margin: 50px;
        max-width: 900px;
      }

      #code {
        display: flex;
        flex-wrap: wrap;
        border-top: 1px solid #ccc;
        height: 30%;
        overflow-y: auto;
        padding: 10px;
        --playground-code-font-family: 'Roboto Mono', monospace;
        --playground-code-font-size: 12px;
        --playground-code-background: transparent;
        background-color: #f7f7f7;
      }

      #code > div {
        min-width: 50%;
      }

      h3 {
        color: #949494;
        font-weight: 400;
        text-transform: uppercase;
      }

      #code h3 {
        margin: 0;
      }

      #lhs section {
        padding: 15px;
        border-bottom: 1px solid #ccc;
      }

      .sectionLabel {
        margin-top: 5px;
      }

      .knobs {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        row-gap: 15px;
        column-gap: 10px;
        align-items: center;
      }

      input[type='color'] {
        width: 30px;
      }

      .knobs label {
        text-align: right;
        cursor: pointer;
      }

      #container {
        flex: 1;
      }

      .knobs select {
        grid-column: 2 / -1;
      }

      .sliderAndValue {
        display: flex;
        align-items: center;
        grid-column: 2 / -1;
      }

      .sliderValue {
        margin-left: 5px;
      }

      #openDetectorButton {
        background: #0075ff;
        opacity: 0.8;
        color: white;
        padding: 5px;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        font-size: 14px;
        grid-column-start: 2;
        grid-column-end: -1;
      }

      #openDetectorButton:hover {
        opacity: 1;
      }
    `],o([te()],ca.prototype,"_themeDetectorOpen",void 0),o([re("playground-ide")],ca.prototype,"_ide",void 0),ca=o([X("playground-configurator")],ca);const ua=B`<a
    href="https://github.com/PolymerLabs/playground-elements"
    class="github-corner"
    aria-label="View source on GitHub"
    ><svg
      width="80"
      height="80"
      viewBox="0 0 250 250"
      style="fill:#00000033; color:#fff; position: absolute; top: 0; border: 0; right: 0;"
      aria-hidden="true"
    >
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
      <path
        d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
        fill="currentColor"
        style="transform-origin: 130px 106px;"
        class="octo-arm"
      ></path>
      <path
        d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
        fill="currentColor"
        class="octo-body"
      ></path></svg></a
  ><style>
    .github-corner:hover .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
    @keyframes octocat-wave {
      0%,
      100% {
        transform: rotate(0);
      }
      20%,
      60% {
        transform: rotate(-25deg);
      }
      40%,
      80% {
        transform: rotate(10deg);
      }
    }
    @media (max-width: 500px) {
      .github-corner:hover .octo-arm {
        animation: none;
      }
      .github-corner .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
      }
    }
  </style>`,ha=e=>{const t=e.match(/^\s*rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/);if(!t)return"";const[,r,o,i]=t,n=e=>Number(e).toString(16).padStart(2,"0");return`#${n(r)}${n(o)}${n(i)}`};export{ca as PlaygroundConfigurator};
