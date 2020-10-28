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
function e(e,r,t,o){var n,i=arguments.length,a=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,r,t,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(r,t,a):n(r,t))||a);return i>3&&a&&Object.defineProperty(r,t,a),a
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
 */}const r="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,r,t=null)=>{for(;r!==t;){const t=r.nextSibling;e.removeChild(r),r=t}},o=`{{lit-${(Math.random()+"").slice(2)}}}`,n=`\x3c!--${o}--\x3e`,i=RegExp(`${o}|${n}`);class a{constructor(e,r){this.parts=[],this.element=r;const t=[],n=[],a=document.createTreeWalker(r.content,133,null,!1);let c=0,u=-1,p=0;const{strings:g,values:{length:h}}=e;for(;p<h;){const e=a.nextNode();if(null!==e){if(u++,1===e.nodeType){if(e.hasAttributes()){const r=e.attributes,{length:t}=r;let o=0;for(let e=0;e<t;e++)l(r[e].name,"$lit$")&&o++;for(;o-- >0;){const r=g[p],t=s.exec(r)[2],o=t.toLowerCase()+"$lit$",n=e.getAttribute(o);e.removeAttribute(o);const a=n.split(i);this.parts.push({type:"attribute",index:u,name:t,strings:a}),p+=a.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),a.currentNode=e.content)}else if(3===e.nodeType){const r=e.data;if(r.indexOf(o)>=0){const o=e.parentNode,n=r.split(i),a=n.length-1;for(let r=0;r<a;r++){let t,i=n[r];if(""===i)t=d();else{const e=s.exec(i);null!==e&&l(e[2],"$lit$")&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),t=document.createTextNode(i)}o.insertBefore(t,e),this.parts.push({type:"node",index:++u})}""===n[a]?(o.insertBefore(d(),e),t.push(e)):e.data=n[a],p+=a}}else if(8===e.nodeType)if(e.data===o){const r=e.parentNode;null!==e.previousSibling&&u!==c||(u++,r.insertBefore(d(),e)),c=u,this.parts.push({type:"node",index:u}),null===e.nextSibling?e.data="":(t.push(e),u--),p++}else{let r=-1;for(;-1!==(r=e.data.indexOf(o,r+1));)this.parts.push({type:"node",index:-1}),p++}}else a.currentNode=n.pop()}for(const e of t)e.parentNode.removeChild(e)}}const l=(e,r)=>{const t=e.length-r.length;return t>=0&&e.slice(t)===r},c=e=>-1!==e.index,d=()=>document.createComment(""),s=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,r){const{element:{content:t},parts:o}=e,n=document.createTreeWalker(t,133,null,!1);let i=g(o),a=o[i],l=-1,c=0;const d=[];let s=null;for(;n.nextNode();){l++;const e=n.currentNode;for(e.previousSibling===s&&(s=null),r.has(e)&&(d.push(e),null===s&&(s=e)),null!==s&&c++;void 0!==a&&a.index===l;)a.index=null!==s?-1:a.index-c,i=g(o,i),a=o[i]}d.forEach((e=>e.parentNode.removeChild(e)))}const p=e=>{let r=11===e.nodeType?0:1;const t=document.createTreeWalker(e,133,null,!1);for(;t.nextNode();)r++;return r},g=(e,r=-1)=>{for(let t=r+1;t<e.length;t++){const r=e[t];if(c(r))return t}return-1},h=new WeakMap,f=e=>(...r)=>{const t=e(...r);return h.set(t,!0),t},b=e=>"function"==typeof e&&h.has(e),m={},y={};
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
class v{constructor(e,r,t){this.__parts=[],this.template=e,this.processor=r,this.options=t}update(e){let r=0;for(const t of this.__parts)void 0!==t&&t.setValue(e[r]),r++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],o=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let i,a=0,l=0,d=n.nextNode();for(;a<o.length;)if(i=o[a],c(i)){for(;l<i.index;)l++,"TEMPLATE"===d.nodeName&&(t.push(d),n.currentNode=d.content),null===(d=n.nextNode())&&(n.currentNode=t.pop(),d=n.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,i.name,i.strings,this.options));a++}else this.__parts.push(void 0),a++;return r&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const k=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),w=` ${o} `;class C{constructor(e,r,t,o){this.strings=e,this.values=r,this.type=t,this.processor=o}getHTML(){const e=this.strings.length-1;let r="",t=!1;for(let i=0;i<e;i++){const e=this.strings[i],a=e.lastIndexOf("\x3c!--");t=(a>-1||t)&&-1===e.indexOf("--\x3e",a+1);const l=s.exec(e);r+=null===l?e+(t?w:n):e.substr(0,l.index)+l[1]+l[2]+"$lit$"+l[3]+o}return r+=this.strings[e],r}getTemplateElement(){const e=document.createElement("template");let r=this.getHTML();return void 0!==k&&(r=k.createHTML(r)),e.innerHTML=r,e}}
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
 */const x=e=>null===e||!("object"==typeof e||"function"==typeof e),S=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class T{constructor(e,r,t){this.dirty=!0,this.element=e,this.name=r,this.strings=t,this.parts=[];for(let e=0;e<t.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new L(this)}_getValue(){const e=this.strings,r=e.length-1,t=this.parts;if(1===r&&""===e[0]&&""===e[1]){const e=t[0].value;if("symbol"==typeof e)return e+"";if("string"==typeof e||!S(e))return e}let o="";for(let n=0;n<r;n++){o+=e[n];const r=t[n];if(void 0!==r){const e=r.value;if(x(e)||!S(e))o+="string"==typeof e?e:e+"";else for(const r of e)o+="string"==typeof r?r:r+""}}return o+=e[r],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class L{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===m||x(e)&&e===this.value||(this.value=e,b(e)||(this.committer.dirty=!0))}commit(){for(;b(this.value);){const e=this.value;this.value=m,e(this)}this.value!==m&&this.committer.commit()}}class E{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;b(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=m,e(this)}const e=this.__pendingValue;e!==m&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof C?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):S(e)?this.__commitIterable(e):e===y?(this.value=y,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const r=this.startNode.nextSibling,t="string"==typeof(e=null==e?"":e)?e:e+"";r===this.endNode.previousSibling&&3===r.nodeType?r.data=t:this.__commitNode(document.createTextNode(t)),this.value=e}__commitTemplateResult(e){const r=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===r)this.value.update(e.values);else{const t=new v(r,e.processor,this.options),o=t._clone();t.update(e.values),this.__commitNode(o),this.value=t}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const r=this.value;let t,o=0;for(const n of e)t=r[o],void 0===t&&(t=new E(this.options),r.push(t),0===o?t.appendIntoPart(this):t.insertAfterPart(r[o-1])),t.setValue(n),t.commit(),o++;o<r.length&&(r.length=o,this.clear(t&&t.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class O{constructor(e,r,t){if(this.value=void 0,this.__pendingValue=void 0,2!==t.length||""!==t[0]||""!==t[1])throw Error("Boolean attributes can only contain a single expression");this.element=e,this.name=r,this.strings=t}setValue(e){this.__pendingValue=e}commit(){for(;b(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=m,e(this)}if(this.__pendingValue===m)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=m}}class A extends T{constructor(e,r,t){super(e,r,t),this.single=2===t.length&&""===t[0]&&""===t[1]}_createPart(){return new _(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class _ extends L{}let M=!1;(()=>{try{const e={get capture(){return M=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class R{constructor(e,r,t){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=r,this.eventContext=t,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;b(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=m,e(this)}if(this.__pendingValue===m)return;const e=this.__pendingValue,r=this.value,t=null==e||null!=r&&(e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive),o=null!=e&&(null==r||t);t&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=z(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=m}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const z=e=>e&&(M?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
 */;function N(e){let r=F.get(e.type);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},F.set(e.type,r));let t=r.stringsArray.get(e.strings);if(void 0!==t)return t;const n=e.strings.join(o);return t=r.keyString.get(n),void 0===t&&(t=new a(e,e.getTemplateElement()),r.keyString.set(n,t)),r.stringsArray.set(e.strings,t),t}const F=new Map,I=new WeakMap,W=new
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
class{handleAttributeExpressions(e,r,t,o){const n=r[0];return"."===n?new A(e,r.slice(1),t).parts:"@"===n?[new R(e,r.slice(1),o.eventContext)]:"?"===n?[new O(e,r.slice(1),t)]:new T(e,r,t).parts}handleTextExpression(e){return new E(e)}};
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const P=(e,...r)=>new C(e,r,"html",W)
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
 */,K=(e,r)=>`${e}--${r}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const B=e=>r=>{const t=K(r.type,e);let n=F.get(t);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},F.set(t,n));let i=n.stringsArray.get(r.strings);if(void 0!==i)return i;const l=r.strings.join(o);if(i=n.keyString.get(l),void 0===i){const t=r.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(t,e),i=new a(r,t),n.keyString.set(l,i)}return n.stringsArray.set(r.strings,i),i},D=["html","svg"],j=new Set;window.JSCompiler_renameProperty=(e,r)=>e;const H={toAttribute(e,r){switch(r){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,r){switch(r){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},V=(e,r)=>r!==e&&(r==r||e==e),Z={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:V};class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((r,t)=>{const o=this._attributeNameForProperty(t,r);void 0!==o&&(this._attributeToPropertyMap.set(o,t),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,r)=>this._classProperties.set(r,e)))}}static createProperty(e,r=Z){if(this._ensureClassProperties(),this._classProperties.set(e,r),r.noAccessor||this.prototype.hasOwnProperty(e))return;const t="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,t,r);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,r,t){return{get(){return this[r]},set(o){const n=this[e];this[r]=o,this.requestUpdateInternal(e,n,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Z}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,r=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const t of r)this.createProperty(t,e[t])}}static _attributeNameForProperty(e,r){const t=r.attribute;return!1===t?void 0:"string"==typeof t?t:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,r,t=V){return t(e,r)}static _propertyValueFromAttribute(e,r){const t=r.type,o=r.converter||H,n="function"==typeof o?o:o.fromAttribute;return n?n(e,t):e}static _propertyValueToAttribute(e,r){if(void 0===r.reflect)return;const t=r.type,o=r.converter;return(o&&o.toAttribute||H.toAttribute)(e,t)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,r)=>{if(this.hasOwnProperty(r)){const e=this[r];delete this[r],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(r,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,r)=>this[r]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,r,t){r!==t&&this._attributeToProperty(e,t)}_propertyToAttribute(e,r,t=Z){const o=this.constructor,n=o._attributeNameForProperty(e,t);if(void 0!==n){const e=o._propertyValueToAttribute(r,t);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,r){if(8&this._updateState)return;const t=this.constructor,o=t._attributeToPropertyMap.get(e);if(void 0!==o){const e=t.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=t._propertyValueFromAttribute(r,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,r,t){let o=!0;if(void 0!==e){const n=this.constructor;t=t||n.getPropertyOptions(e),n._valueHasChanged(this[e],r,t.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,r),!0!==t.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,t))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,r){return this.requestUpdateInternal(e,r),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const r=this._changedProperties;try{e=this.shouldUpdate(r),e?this.update(r):this._markUpdated()}catch(r){throw e=!1,this._markUpdated(),r}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(r)),this.updated(r))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,r)=>this._propertyToAttribute(r,this[r],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}J.finalized=!0;
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
const q=e=>r=>"function"==typeof r?((e,r)=>(window.customElements.define(e,r),r))(e,r):((e,r)=>{const{kind:t,elements:o}=r;return{kind:t,elements:o,finisher(r){window.customElements.define(e,r)}}})(e,r),G=(e,r)=>"method"===r.kind&&r.descriptor&&!("value"in r.descriptor)?Object.assign(Object.assign({},r),{finisher(t){t.createProperty(r.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof r.initializer&&(this[r.key]=r.initializer.call(this))},finisher(t){t.createProperty(r.key,e)}};function Q(e){return(r,t)=>void 0!==t?((e,r,t)=>{r.constructor.createProperty(t,e)})(e,r,t):G(e,r)}function Y(e){return Q({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}function X(e,r){return(t,o)=>{const n={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(r){const r="symbol"==typeof o?Symbol():"__"+o;n.get=function(){return void 0===this[r]&&(this[r]=this.renderRoot.querySelector(e)),this[r]}}return void 0!==o?$(n,t,o):ee(n,t)}}const $=(e,r,t)=>{Object.defineProperty(r,t,e)},ee=(e,r)=>({kind:"method",placement:"prototype",key:r.key,descriptor:e});function re(e){return(r,t)=>void 0!==t?((e,r,t)=>{Object.assign(r[t],e)})(e,r,t):((e,r)=>Object.assign(Object.assign({},r),{finisher(t){Object.assign(t.prototype[r.key],e)}}))(e,r)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const te=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol();class ne{constructor(e,r){if(r!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(te?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ie=(e,...r)=>{const t=r.reduce(((r,t,o)=>r+(e=>{if(e instanceof ne)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(t)+e[o+1]),e[0]);return new ne(t,oe)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ae={};class le extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const r=(e,t)=>e.reduceRight(((e,t)=>Array.isArray(t)?r(t,e):(e.add(t),e)),t),t=r(e,new Set),o=[];t.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!te){const r=Array.prototype.slice.call(e.cssRules).reduce(((e,r)=>e+r.cssText),"");return new ne(r+"",oe)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?te?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const r=this.render();super.update(e),r!==ae&&this.constructor.render(r,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const r=document.createElement("style");r.textContent=e.cssText,this.renderRoot.appendChild(r)})))}render(){return ae}}le.finalized=!0,le.render=(e,r,o)=>{if(!o||"object"!=typeof o||!o.scopeName)throw Error("The `scopeName` option is required.");const n=o.scopeName,i=I.has(r),a=U&&11===r.nodeType&&!!r.host,l=a&&!j.has(n),c=l?document.createDocumentFragment():r;if(((e,r,o)=>{let n=I.get(r);void 0===n&&(t(r,r.firstChild),I.set(r,n=new E(Object.assign({templateFactory:N},o))),n.appendInto(r)),n.setValue(e),n.commit()})(e,c,Object.assign({templateFactory:B(n)},o)),l){const e=I.get(c);I.delete(c);((e,r,t)=>{j.add(e);const o=t?t.element:document.createElement("template"),n=r.querySelectorAll("style"),{length:i}=n;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(o,e);const a=document.createElement("style");for(let e=0;e<i;e++){const r=n[e];r.parentNode.removeChild(r),a.textContent+=r.textContent}(e=>{D.forEach((r=>{const t=F.get(K(r,e));void 0!==t&&t.keyString.forEach((e=>{const{element:{content:r}}=e,t=new Set;Array.from(r.querySelectorAll("style")).forEach((e=>{t.add(e)})),u(e,t)}))}))})(e);const l=o.content;t?function(e,r,t=null){const{element:{content:o},parts:n}=e;if(null==t)return void o.appendChild(r);const i=document.createTreeWalker(o,133,null,!1);let a=g(n),l=0,c=-1;for(;i.nextNode();)for(c++,i.currentNode===t&&(l=p(r),t.parentNode.insertBefore(r,t));-1!==a&&n[a].index===c;){if(l>0){for(;-1!==a;)n[a].index+=l,a=g(n,a);return}a=g(n,a)}}
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
 */(t,a,l.firstChild):l.insertBefore(a,l.firstChild),window.ShadyCSS.prepareTemplateStyles(o,e);const c=l.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)r.insertBefore(c.cloneNode(!0),r.firstChild);else if(t){l.insertBefore(a,l.firstChild);const e=new Set;e.add(a),u(t,e)}})(n,c,e.value instanceof v?e.value.template:void 0),t(r,r.firstChild),r.appendChild(c),I.set(r,e)}!i&&a&&window.ShadyCSS.styleElement(r.host)};const ce=Symbol("Comlink.proxy"),de=Symbol("Comlink.endpoint"),se=Symbol("Comlink.releaseProxy"),ue=Symbol("Comlink.thrown"),pe=e=>"object"==typeof e&&null!==e||"function"==typeof e,ge=new Map([["proxy",{canHandle:e=>pe(e)&&e[ce],serialize(e){const{port1:r,port2:t}=new MessageChannel;return he(e,r),[t,[t]]},deserialize:e=>(e.start(),be(e))}],["throw",{canHandle:e=>pe(e)&&ue in e,serialize({value:e}){let r;return r=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[r,[]]},deserialize(e){if(e.isError)throw Object.assign(Error(e.value.message),e.value);throw e.value}}]]);function he(e,r=self){r.addEventListener("message",(function t(o){if(!o||!o.data)return;const{id:n,type:i,path:a}=Object.assign({path:[]},o.data),l=(o.data.argumentList||[]).map(xe);let c;try{const r=a.slice(0,-1).reduce(((e,r)=>e[r]),e),t=a.reduce(((e,r)=>e[r]),e);switch(i){case 0:c=t;break;case 1:r[a.slice(-1)[0]]=xe(o.data.value),c=!0;break;case 2:c=t.apply(r,l);break;case 3:c=we(new t(...l));break;case 4:{const{port1:r,port2:t}=new MessageChannel;he(e,t),c=function(e,r){return ke.set(e,r),e}(r,[r])}break;case 5:c=void 0}}catch(e){c={value:e,[ue]:0}}Promise.resolve(c).catch((e=>({value:e,[ue]:0}))).then((e=>{const[o,a]=Ce(e);r.postMessage(Object.assign(Object.assign({},o),{id:n}),a),5===i&&(r.removeEventListener("message",t),fe(r))}))})),r.start&&r.start()}function fe(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function be(e,r){return ye(e,[],r)}function me(e){if(e)throw Error("Proxy has been released and is not useable")}function ye(e,r=[],t=function(){}){let o=!1;const n=new Proxy(t,{get(t,i){if(me(o),i===se)return()=>Se(e,{type:5,path:r.map((e=>e.toString()))}).then((()=>{fe(e),o=!0}));if("then"===i){if(0===r.length)return{then:()=>n};const t=Se(e,{type:0,path:r.map((e=>e.toString()))}).then(xe);return t.then.bind(t)}return ye(e,[...r,i])},set(t,n,i){me(o);const[a,l]=Ce(i);return Se(e,{type:1,path:[...r,n].map((e=>e.toString())),value:a},l).then(xe)},apply(t,n,i){me(o);const a=r[r.length-1];if(a===de)return Se(e,{type:4}).then(xe);if("bind"===a)return ye(e,r.slice(0,-1));const[l,c]=ve(i);return Se(e,{type:2,path:r.map((e=>e.toString())),argumentList:l},c).then(xe)},construct(t,n){me(o);const[i,a]=ve(n);return Se(e,{type:3,path:r.map((e=>e.toString())),argumentList:i},a).then(xe)}});return n}function ve(e){const r=e.map(Ce);return[r.map((e=>e[0])),(t=r.map((e=>e[1])),Array.prototype.concat.apply([],t))];var t}const ke=new WeakMap;function we(e){return Object.assign(e,{[ce]:!0})}function Ce(e){for(const[r,t]of ge)if(t.canHandle(e)){const[o,n]=t.serialize(e);return[{type:3,name:r,value:o},n]}return[{type:0,value:e},ke.get(e)||[]]}function xe(e){switch(e.type){case 3:return ge.get(e.name).deserialize(e.value);case 0:return e.value}}function Se(e,r,t){return new Promise((o=>{const n=[,,,,].fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function r(t){t.data&&t.data.id&&t.data.id===n&&(e.removeEventListener("message",r),o(t.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:n},r),t)}))}
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
function Te(e,r,t,o){var n,i=arguments.length,a=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,r,t,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(r,t,a):n(r,t))||a);return i>3&&a&&Object.defineProperty(r,t,a),a
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
***************************************************************************** */}function Le(e,r,t,o){var n,i=arguments.length,a=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,r,t,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(r,t,a):n(r,t))||a);return i>3&&a&&Object.defineProperty(r,t,a),a
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
***************************************************************************** */}function Ee(e,r,t,o){var n,i=arguments.length,a=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,r,t,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(r,t,a):n(r,t))||a);return i>3&&a&&Object.defineProperty(r,t,a),a
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
 */}function Oe(e,r){return(e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,r)}
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
*/function Ae(e){return{addClass:r=>{e.classList.add(r)},removeClass:r=>{e.classList.remove(r)},hasClass:r=>e.classList.contains(r)}}const _e=()=>{},Me={get passive(){return!1}};document.addEventListener("x",_e,Me),document.removeEventListener("x",_e);
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
class Re extends le{click(){if(this.mdcRoot)return this.mdcRoot.focus(),void this.mdcRoot.click();super.click()}createFoundation(){void 0!==this.mdcFoundation&&this.mdcFoundation.destroy(),this.mdcFoundationClass&&(this.mdcFoundation=new this.mdcFoundationClass(this.createAdapter()),this.mdcFoundation.init())}firstUpdated(){this.createFoundation()}}
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
***************************************************************************** */var ze=function(e,r){return(ze=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(e,r)};function Ne(e,r){function t(){this.constructor=e}ze(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}var Fe=function(){return(Fe=Object.assign||function(e){for(var r,t=1,o=arguments.length;t<o;t++)for(var n in r=arguments[t])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)},Ie=function(){function e(e){void 0===e&&(e={}),this.adapter=e}return Object.defineProperty(e,"cssClasses",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{}},enumerable:!0,configurable:!0}),e.prototype.init=function(){},e.prototype.destroy=function(){},e}(),We={ACTIVE:"mdc-tab-indicator--active",FADE:"mdc-tab-indicator--fade",NO_TRANSITION:"mdc-tab-indicator--no-transition"},Pe={CONTENT_SELECTOR:".mdc-tab-indicator__content"},Ke=function(e){function r(t){return e.call(this,Fe(Fe({},r.defaultAdapter),t))||this}return Ne(r,e),Object.defineProperty(r,"cssClasses",{get:function(){return We},enumerable:!0,configurable:!0}),Object.defineProperty(r,"strings",{get:function(){return Pe},enumerable:!0,configurable:!0}),Object.defineProperty(r,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},computeContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},setContentStyleProperty:function(){}}},enumerable:!0,configurable:!0}),r.prototype.computeContentClientRect=function(){return this.adapter.computeContentClientRect()},r}(Ie),Ue=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return Ne(r,e),r.prototype.activate=function(){this.adapter.addClass(Ke.cssClasses.ACTIVE)},r.prototype.deactivate=function(){this.adapter.removeClass(Ke.cssClasses.ACTIVE)},r}(Ke),Be=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return Ne(r,e),r.prototype.activate=function(e){if(e){var r=this.computeContentClientRect(),t=e.width/r.width,o=e.left-r.left;this.adapter.addClass(Ke.cssClasses.NO_TRANSITION),this.adapter.setContentStyleProperty("transform","translateX("+o+"px) scaleX("+t+")"),this.computeContentClientRect(),this.adapter.removeClass(Ke.cssClasses.NO_TRANSITION),this.adapter.addClass(Ke.cssClasses.ACTIVE),this.adapter.setContentStyleProperty("transform","")}else this.adapter.addClass(Ke.cssClasses.ACTIVE)},r.prototype.deactivate=function(){this.adapter.removeClass(Ke.cssClasses.ACTIVE)},r}(Ke);
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
class De{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const r=(e.getAttribute("class")||"").split(/\s+/);for(const e of r)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach((r=>e+=r+" ")),this.element.setAttribute("class",e)}}}const je=new WeakMap,He=f((e=>r=>{if(!(r instanceof L)||r instanceof _||"class"!==r.committer.name||r.committer.parts.length>1)throw Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:t}=r,{element:o}=t;let n=je.get(r);void 0===n&&(o.setAttribute("class",t.strings.join(" ")),je.set(r,n=new Set));const i=o.classList||new De(o);n.forEach((r=>{r in e||(i.remove(r),n.delete(r))}));for(const r in e){const t=e[r];t!=n.has(r)&&(t?(i.add(r),n.add(r)):(i.remove(r),n.delete(r)))}"function"==typeof i.commit&&i.commit()}));class Ve extends Re{constructor(){super(...arguments),this.icon="",this.fade=!1}get mdcFoundationClass(){return this.fade?Ue:Be}render(){const e={"mdc-tab-indicator__content--icon":this.icon,"material-icons":this.icon,"mdc-tab-indicator__content--underline":!this.icon};return P`
      <span class="mdc-tab-indicator ${He({"mdc-tab-indicator--fade":this.fade})}">
        <span class="mdc-tab-indicator__content ${He(e)}">${this.icon}</span>
      </span>
      `}updated(e){e.has("fade")&&this.createFoundation()}createAdapter(){return Object.assign(Object.assign({},Ae(this.mdcRoot)),{computeContentClientRect:()=>this.contentElement.getBoundingClientRect(),setContentStyleProperty:(e,r)=>this.contentElement.style.setProperty(e,r)})}computeContentClientRect(){return this.mdcFoundation.computeContentClientRect()}activate(e){this.mdcFoundation.activate(e)}deactivate(){this.mdcFoundation.deactivate()}}Ee([X(".mdc-tab-indicator")],Ve.prototype,"mdcRoot",void 0),Ee([X(".mdc-tab-indicator__content")],Ve.prototype,"contentElement",void 0),Ee([Q()],Ve.prototype,"icon",void 0),Ee([Q({type:Boolean})],Ve.prototype,"fade",void 0);
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
const Ze=ie`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-tab-indicator .mdc-tab-indicator__content--icon{color:#018786;color:var(--mdc-theme-secondary, #018786)}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}`;let Je=class extends Ve{};Je.styles=Ze,Je=Ee([q("mwc-tab-indicator")],Je);
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
const qe=e=>(r,t)=>{if(r.constructor._observers){if(!r.constructor.hasOwnProperty("_observers")){const e=r.constructor._observers;r.constructor._observers=new Map,e.forEach(((e,t)=>r.constructor._observers.set(t,e)))}}else{r.constructor._observers=new Map;const e=r.updated;r.updated=function(r){e.call(this,r),r.forEach(((e,r)=>{const t=this.constructor._observers.get(r);void 0!==t&&t.call(this,this[r],e)}))}}r.constructor._observers.set(t,e)}
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
 */;function Ge(e){return void 0===e&&(e=window),!!function(e){void 0===e&&(e=window);var r=!1;try{var t={get passive(){return r=!0,!1}},o=function(){};e.document.addEventListener("test",o,t),e.document.removeEventListener("test",o,t)}catch(e){r=!1}return r}
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
***************************************************************************** */(e)&&{passive:!0}}var Qe,Ye=function(e,r){return(Ye=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(e,r)},Xe=function(){return(Xe=Object.assign||function(e){for(var r,t=1,o=arguments.length;t<o;t++)for(var n in r=arguments[t])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)},$e={BG_FOCUSED:"mdc-ripple-upgraded--background-focused",FG_ACTIVATION:"mdc-ripple-upgraded--foreground-activation",FG_DEACTIVATION:"mdc-ripple-upgraded--foreground-deactivation",ROOT:"mdc-ripple-upgraded",UNBOUNDED:"mdc-ripple-upgraded--unbounded"},er={VAR_FG_SCALE:"--mdc-ripple-fg-scale",VAR_FG_SIZE:"--mdc-ripple-fg-size",VAR_FG_TRANSLATE_END:"--mdc-ripple-fg-translate-end",VAR_FG_TRANSLATE_START:"--mdc-ripple-fg-translate-start",VAR_LEFT:"--mdc-ripple-left",VAR_TOP:"--mdc-ripple-top"},rr={DEACTIVATION_TIMEOUT_MS:225,FG_DEACTIVATION_MS:150,INITIAL_ORIGIN_SCALE:.6,PADDING:10,TAP_DELAY_MS:300},tr=["touchstart","pointerdown","mousedown","keydown"],or=["touchend","pointerup","mouseup","contextmenu"],nr=[],ir=function(e){function r(t){var o=e.call(this,Xe(Xe({},r.defaultAdapter),t))||this;return o.activationAnimationHasEnded_=!1,o.activationTimer_=0,o.fgDeactivationRemovalTimer_=0,o.fgScale_="0",o.frame_={width:0,height:0},o.initialSize_=0,o.layoutFrame_=0,o.maxRadius_=0,o.unboundedCoords_={left:0,top:0},o.activationState_=o.defaultActivationState_(),o.activationTimerCallback_=function(){o.activationAnimationHasEnded_=!0,o.runDeactivationUXLogicIfReady_()},o.activateHandler_=function(e){return o.activate_(e)},o.deactivateHandler_=function(){return o.deactivate_()},o.focusHandler_=function(){return o.handleFocus()},o.blurHandler_=function(){return o.handleBlur()},o.resizeHandler_=function(){return o.layout()},o}return function(e,r){function t(){this.constructor=e}Ye(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}(r,e),Object.defineProperty(r,"cssClasses",{get:function(){return $e},enumerable:!0,configurable:!0}),Object.defineProperty(r,"strings",{get:function(){return er},enumerable:!0,configurable:!0}),Object.defineProperty(r,"numbers",{get:function(){return rr},enumerable:!0,configurable:!0}),Object.defineProperty(r,"defaultAdapter",{get:function(){return{addClass:function(){},browserSupportsCssVars:function(){return!0},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},containsEventTarget:function(){return!0},deregisterDocumentInteractionHandler:function(){},deregisterInteractionHandler:function(){},deregisterResizeHandler:function(){},getWindowPageOffset:function(){return{x:0,y:0}},isSurfaceActive:function(){return!0},isSurfaceDisabled:function(){return!0},isUnbounded:function(){return!0},registerDocumentInteractionHandler:function(){},registerInteractionHandler:function(){},registerResizeHandler:function(){},removeClass:function(){},updateCssVariable:function(){}}},enumerable:!0,configurable:!0}),r.prototype.init=function(){var e=this,t=this.supportsPressRipple_();if(this.registerRootHandlers_(t),t){var o=r.cssClasses,n=o.ROOT,i=o.UNBOUNDED;requestAnimationFrame((function(){e.adapter.addClass(n),e.adapter.isUnbounded()&&(e.adapter.addClass(i),e.layoutInternal_())}))}},r.prototype.destroy=function(){var e=this;if(this.supportsPressRipple_()){this.activationTimer_&&(clearTimeout(this.activationTimer_),this.activationTimer_=0,this.adapter.removeClass(r.cssClasses.FG_ACTIVATION)),this.fgDeactivationRemovalTimer_&&(clearTimeout(this.fgDeactivationRemovalTimer_),this.fgDeactivationRemovalTimer_=0,this.adapter.removeClass(r.cssClasses.FG_DEACTIVATION));var t=r.cssClasses,o=t.ROOT,n=t.UNBOUNDED;requestAnimationFrame((function(){e.adapter.removeClass(o),e.adapter.removeClass(n),e.removeCssVars_()}))}this.deregisterRootHandlers_(),this.deregisterDeactivationHandlers_()},r.prototype.activate=function(e){this.activate_(e)},r.prototype.deactivate=function(){this.deactivate_()},r.prototype.layout=function(){var e=this;this.layoutFrame_&&cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=requestAnimationFrame((function(){e.layoutInternal_(),e.layoutFrame_=0}))},r.prototype.setUnbounded=function(e){var t=r.cssClasses.UNBOUNDED;e?this.adapter.addClass(t):this.adapter.removeClass(t)},r.prototype.handleFocus=function(){var e=this;requestAnimationFrame((function(){return e.adapter.addClass(r.cssClasses.BG_FOCUSED)}))},r.prototype.handleBlur=function(){var e=this;requestAnimationFrame((function(){return e.adapter.removeClass(r.cssClasses.BG_FOCUSED)}))},r.prototype.supportsPressRipple_=function(){return this.adapter.browserSupportsCssVars()},r.prototype.defaultActivationState_=function(){return{activationEvent:void 0,hasDeactivationUXRun:!1,isActivated:!1,isProgrammatic:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1}},r.prototype.registerRootHandlers_=function(e){var r=this;e&&(tr.forEach((function(e){r.adapter.registerInteractionHandler(e,r.activateHandler_)})),this.adapter.isUnbounded()&&this.adapter.registerResizeHandler(this.resizeHandler_)),this.adapter.registerInteractionHandler("focus",this.focusHandler_),this.adapter.registerInteractionHandler("blur",this.blurHandler_)},r.prototype.registerDeactivationHandlers_=function(e){var r=this;"keydown"===e.type?this.adapter.registerInteractionHandler("keyup",this.deactivateHandler_):or.forEach((function(e){r.adapter.registerDocumentInteractionHandler(e,r.deactivateHandler_)}))},r.prototype.deregisterRootHandlers_=function(){var e=this;tr.forEach((function(r){e.adapter.deregisterInteractionHandler(r,e.activateHandler_)})),this.adapter.deregisterInteractionHandler("focus",this.focusHandler_),this.adapter.deregisterInteractionHandler("blur",this.blurHandler_),this.adapter.isUnbounded()&&this.adapter.deregisterResizeHandler(this.resizeHandler_)},r.prototype.deregisterDeactivationHandlers_=function(){var e=this;this.adapter.deregisterInteractionHandler("keyup",this.deactivateHandler_),or.forEach((function(r){e.adapter.deregisterDocumentInteractionHandler(r,e.deactivateHandler_)}))},r.prototype.removeCssVars_=function(){var e=this,t=r.strings;Object.keys(t).forEach((function(r){0===r.indexOf("VAR_")&&e.adapter.updateCssVariable(t[r],null)}))},r.prototype.activate_=function(e){var r=this;if(!this.adapter.isSurfaceDisabled()){var t=this.activationState_;if(!t.isActivated){var o=this.previousActivationEvent_;o&&void 0!==e&&o.type!==e.type||(t.isActivated=!0,t.isProgrammatic=void 0===e,t.activationEvent=e,t.wasActivatedByPointer=!t.isProgrammatic&&void 0!==e&&("mousedown"===e.type||"touchstart"===e.type||"pointerdown"===e.type),void 0!==e&&nr.length>0&&nr.some((function(e){return r.adapter.containsEventTarget(e)}))?this.resetActivationState_():(void 0!==e&&(nr.push(e.target),this.registerDeactivationHandlers_(e)),t.wasElementMadeActive=this.checkElementMadeActive_(e),t.wasElementMadeActive&&this.animateActivation_(),requestAnimationFrame((function(){nr=[],t.wasElementMadeActive||void 0===e||" "!==e.key&&32!==e.keyCode||(t.wasElementMadeActive=r.checkElementMadeActive_(e),t.wasElementMadeActive&&r.animateActivation_()),t.wasElementMadeActive||(r.activationState_=r.defaultActivationState_())}))))}}},r.prototype.checkElementMadeActive_=function(e){return void 0===e||"keydown"!==e.type||this.adapter.isSurfaceActive()},r.prototype.animateActivation_=function(){var e=this,t=r.strings,o=t.VAR_FG_TRANSLATE_START,n=t.VAR_FG_TRANSLATE_END,i=r.cssClasses,a=i.FG_DEACTIVATION,l=i.FG_ACTIVATION,c=r.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal_();var d="",s="";if(!this.adapter.isUnbounded()){var u=this.getFgTranslationCoordinates_(),p=u.startPoint,g=u.endPoint;d=p.x+"px, "+p.y+"px",s=g.x+"px, "+g.y+"px"}this.adapter.updateCssVariable(o,d),this.adapter.updateCssVariable(n,s),clearTimeout(this.activationTimer_),clearTimeout(this.fgDeactivationRemovalTimer_),this.rmBoundedActivationClasses_(),this.adapter.removeClass(a),this.adapter.computeBoundingRect(),this.adapter.addClass(l),this.activationTimer_=setTimeout((function(){return e.activationTimerCallback_()}),c)},r.prototype.getFgTranslationCoordinates_=function(){var e,r=this.activationState_,t=r.activationEvent;return{startPoint:e={x:(e=r.wasActivatedByPointer?function(e,r,t){if(!e)return{x:0,y:0};var o,n,i=r.x,a=r.y,l=i+t.left,c=a+t.top;if("touchstart"===e.type){var d=e;o=d.changedTouches[0].pageX-l,n=d.changedTouches[0].pageY-c}else{var s=e;o=s.pageX-l,n=s.pageY-c}return{x:o,y:n}}
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
 */(t,this.adapter.getWindowPageOffset(),this.adapter.computeBoundingRect()):{x:this.frame_.width/2,y:this.frame_.height/2}).x-this.initialSize_/2,y:e.y-this.initialSize_/2},endPoint:{x:this.frame_.width/2-this.initialSize_/2,y:this.frame_.height/2-this.initialSize_/2}}},r.prototype.runDeactivationUXLogicIfReady_=function(){var e=this,t=r.cssClasses.FG_DEACTIVATION,o=this.activationState_,n=o.hasDeactivationUXRun,i=o.isActivated;(n||!i)&&this.activationAnimationHasEnded_&&(this.rmBoundedActivationClasses_(),this.adapter.addClass(t),this.fgDeactivationRemovalTimer_=setTimeout((function(){e.adapter.removeClass(t)}),rr.FG_DEACTIVATION_MS))},r.prototype.rmBoundedActivationClasses_=function(){var e=r.cssClasses.FG_ACTIVATION;this.adapter.removeClass(e),this.activationAnimationHasEnded_=!1,this.adapter.computeBoundingRect()},r.prototype.resetActivationState_=function(){var e=this;this.previousActivationEvent_=this.activationState_.activationEvent,this.activationState_=this.defaultActivationState_(),setTimeout((function(){return e.previousActivationEvent_=void 0}),r.numbers.TAP_DELAY_MS)},r.prototype.deactivate_=function(){var e=this,r=this.activationState_;if(r.isActivated){var t=Xe({},r);r.isProgrammatic?(requestAnimationFrame((function(){return e.animateDeactivation_(t)})),this.resetActivationState_()):(this.deregisterDeactivationHandlers_(),requestAnimationFrame((function(){e.activationState_.hasDeactivationUXRun=!0,e.animateDeactivation_(t),e.resetActivationState_()})))}},r.prototype.animateDeactivation_=function(e){var r=e.wasActivatedByPointer,t=e.wasElementMadeActive;(r||t)&&this.runDeactivationUXLogicIfReady_()},r.prototype.layoutInternal_=function(){this.frame_=this.adapter.computeBoundingRect();var e=Math.max(this.frame_.height,this.frame_.width);this.maxRadius_=this.adapter.isUnbounded()?e:Math.sqrt(Math.pow(this.frame_.width,2)+Math.pow(this.frame_.height,2))+r.numbers.PADDING;var t=Math.floor(e*r.numbers.INITIAL_ORIGIN_SCALE);this.adapter.isUnbounded()&&t%2!=0?this.initialSize_=t-1:this.initialSize_=t,this.fgScale_=""+this.maxRadius_/this.initialSize_,this.updateLayoutCssVars_()},r.prototype.updateLayoutCssVars_=function(){var e=r.strings,t=e.VAR_FG_SIZE,o=e.VAR_LEFT,n=e.VAR_TOP,i=e.VAR_FG_SCALE;this.adapter.updateCssVariable(t,this.initialSize_+"px"),this.adapter.updateCssVariable(i,this.fgScale_),this.adapter.isUnbounded()&&(this.unboundedCoords_={left:Math.round(this.frame_.width/2-this.initialSize_/2),top:Math.round(this.frame_.height/2-this.initialSize_/2)},this.adapter.updateCssVariable(o,this.unboundedCoords_.left+"px"),this.adapter.updateCssVariable(n,this.unboundedCoords_.top+"px"))},r}(Ie);
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
const ar=ie`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}`
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
*/,lr=function(e,r){void 0===r&&(r=!1);var t,o=window.CSS;if("boolean"==typeof Qe&&!r)return Qe;if(!o||"function"!=typeof o.supports)return!1;var n=o.supports("--css-vars","yes"),i=o.supports("(--css-vars: yes)")&&o.supports("color","#00000000");return t=n||i,r||(Qe=t),t}();class cr{constructor(e){this.foundation=e}startPress(){this.foundation.activate()}endPress(){this.foundation.deactivate()}startFocus(){this.foundation.handleFocus()}endFocus(){this.foundation.handleBlur()}destroy(){this.foundation.destroy()}setUnbounded(e){this.foundation.setUnbounded(e)}}const dr=navigator.userAgent.match(/Safari/);let sr=!1;const ur=new WeakMap,pr=f(((e={})=>r=>{const t=r.committer.element,o=e.interactionNode||t;let n=r.value;const i=ur.get(n);void 0!==i&&i!==o&&(n.destroy(),n=m),n===m?(n=(e=>{dr&&!sr&&(()=>{sr=!0;const e=document.createElement("style"),r=new E({templateFactory:N});r.appendInto(e),r.setValue(ar),r.commit(),document.head.appendChild(e)})();const r=e.surfaceNode,t=e.interactionNode||r;t.getRootNode()!==r.getRootNode()&&""===t.style.position&&(t.style.position="relative");const o=new ir({browserSupportsCssVars:()=>lr,isUnbounded:()=>void 0===e.unbounded||e.unbounded,isSurfaceActive:()=>Oe(t,":active"),isSurfaceDisabled:()=>!!t.hasAttribute("disabled"),addClass:e=>r.classList.add(e),removeClass:e=>r.classList.remove(e),containsEventTarget:e=>t.contains(e),registerInteractionHandler:(e,r)=>t.addEventListener(e,r,Ge()),deregisterInteractionHandler:(e,r)=>t.removeEventListener(e,r,Ge()),registerDocumentInteractionHandler:(e,r)=>document.documentElement.addEventListener(e,r,Ge()),deregisterDocumentInteractionHandler:(e,r)=>document.documentElement.removeEventListener(e,r,Ge()),registerResizeHandler:e=>window.addEventListener("resize",e),deregisterResizeHandler:e=>window.removeEventListener("resize",e),updateCssVariable:(e,t)=>r.style.setProperty(e,t),computeBoundingRect:()=>r.getBoundingClientRect(),getWindowPageOffset:()=>({x:window.pageXOffset,y:window.pageYOffset})});return o.init(),new cr(o)})(Object.assign({},e,{surfaceNode:t})),ur.set(n,o),r.setValue(n)):(void 0!==e.unbounded&&n.setUnbounded(e.unbounded),void 0!==e.disabled&&n.setUnbounded(e.disabled)),!0===e.active?n.startPress():!1===e.active&&n.endPress()}));
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
var gr=function(e,r){return(gr=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(e,r)},hr=function(){return(hr=Object.assign||function(e){for(var r,t=1,o=arguments.length;t<o;t++)for(var n in r=arguments[t])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)},fr={ACTIVE:"mdc-tab--active"},br={ARIA_SELECTED:"aria-selected",CONTENT_SELECTOR:".mdc-tab__content",INTERACTED_EVENT:"MDCTab:interacted",RIPPLE_SELECTOR:".mdc-tab__ripple",TABINDEX:"tabIndex",TAB_INDICATOR_SELECTOR:".mdc-tab-indicator"},mr=function(e){function r(t){var o=e.call(this,hr(hr({},r.defaultAdapter),t))||this;return o.focusOnActivate_=!0,o}return function(e,r){function t(){this.constructor=e}gr(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}(r,e),Object.defineProperty(r,"cssClasses",{get:function(){return fr},enumerable:!0,configurable:!0}),Object.defineProperty(r,"strings",{get:function(){return br},enumerable:!0,configurable:!0}),Object.defineProperty(r,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setAttr:function(){},activateIndicator:function(){},deactivateIndicator:function(){},notifyInteracted:function(){},getOffsetLeft:function(){return 0},getOffsetWidth:function(){return 0},getContentOffsetLeft:function(){return 0},getContentOffsetWidth:function(){return 0},focus:function(){}}},enumerable:!0,configurable:!0}),r.prototype.handleClick=function(){this.adapter.notifyInteracted()},r.prototype.isActive=function(){return this.adapter.hasClass(fr.ACTIVE)},r.prototype.setFocusOnActivate=function(e){this.focusOnActivate_=e},r.prototype.activate=function(e){this.adapter.addClass(fr.ACTIVE),this.adapter.setAttr(br.ARIA_SELECTED,"true"),this.adapter.setAttr(br.TABINDEX,"0"),this.adapter.activateIndicator(e),this.focusOnActivate_&&this.adapter.focus()},r.prototype.deactivate=function(){this.isActive()&&(this.adapter.removeClass(fr.ACTIVE),this.adapter.setAttr(br.ARIA_SELECTED,"false"),this.adapter.setAttr(br.TABINDEX,"-1"),this.adapter.deactivateIndicator())},r.prototype.computeDimensions=function(){var e=this.adapter.getOffsetWidth(),r=this.adapter.getOffsetLeft(),t=this.adapter.getContentOffsetWidth(),o=this.adapter.getContentOffsetLeft();return{contentLeft:r+o,contentRight:r+o+t,rootLeft:r,rootRight:r+e}},r}(Ie);let yr=0;class vr extends Re{constructor(){super(...arguments),this.mdcFoundationClass=mr,this.label="",this.icon="",this.hasImageIcon=!1,this.isFadingIndicator=!1,this.minWidth=!1,this.isMinWidthIndicator=!1,this.indicatorIcon="",this.stacked=!1,this.focusOnActivate=!0,this._active=!1,this.initFocus=!1}get active(){return this._active}_handleClick(){this.mdcFoundation.handleClick()}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){this.dir=document.dir,super.connectedCallback()}firstUpdated(){super.firstUpdated(),this.id=this.id||"mdc-tab-"+ ++yr}render(){const e={"mdc-tab--min-width":this.minWidth,"mdc-tab--stacked":this.stacked};let r=P``;(this.hasImageIcon||this.icon)&&(r=P`
        <span class="mdc-tab__icon material-icons"><slot name="icon">${this.icon}</slot></span>`);let t=P``;this.label&&(t=P`
        <span class="mdc-tab__text-label">${this.label}</span>`);const o=pr({interactionNode:this,unbounded:!1});return P`
      <button
        @click="${this._handleClick}"
        class="mdc-tab ${He(e)}"
        role="tab"
        aria-selected="false"
        tabindex="-1">
        <span class="mdc-tab__content">
          ${r}
          ${t}
          ${this.isMinWidthIndicator?this.renderIndicator():""}
        </span>
        ${this.isMinWidthIndicator?"":this.renderIndicator()}
        <span class="mdc-tab__ripple" .ripple="${o}"></span>
      </button>`}renderIndicator(){return P`<mwc-tab-indicator
        .icon="${this.indicatorIcon}"
        .fade="${this.isFadingIndicator}"></mwc-tab-indicator>`}createAdapter(){return Object.assign(Object.assign({},Ae(this.mdcRoot)),{setAttr:(e,r)=>this.mdcRoot.setAttribute(e,r),activateIndicator:async e=>{await this.tabIndicator.updateComplete,this.tabIndicator.activate(e)},deactivateIndicator:async()=>{await this.tabIndicator.updateComplete,this.tabIndicator.deactivate()},notifyInteracted:()=>this.dispatchEvent(new CustomEvent(mr.strings.INTERACTED_EVENT,{detail:{tabId:this.id},bubbles:!0,composed:!0,cancelable:!0})),getOffsetLeft:()=>this.offsetLeft,getOffsetWidth:()=>this.mdcRoot.offsetWidth,getContentOffsetLeft:()=>this._contentElement.offsetLeft,getContentOffsetWidth:()=>this._contentElement.offsetWidth,focus:()=>{this.initFocus?this.initFocus=!1:this.mdcRoot.focus()}})}activate(e){e||(this.initFocus=!0),this.mdcFoundation.activate(e),this.setActive(this.mdcFoundation.isActive())}deactivate(){this.mdcFoundation.deactivate(),this.setActive(this.mdcFoundation.isActive())}setActive(e){const r=this.active;r!==e&&(this._active=e,this.requestUpdate("active",r))}computeDimensions(){return this.mdcFoundation.computeDimensions()}computeIndicatorClientRect(){return this.tabIndicator.computeContentClientRect()}focus(){this.mdcRoot.focus()}}Le([X(".mdc-tab")],vr.prototype,"mdcRoot",void 0),Le([X("mwc-tab-indicator")],vr.prototype,"tabIndicator",void 0),Le([Q()],vr.prototype,"label",void 0),Le([Q()],vr.prototype,"icon",void 0),Le([Q({type:Boolean})],vr.prototype,"hasImageIcon",void 0),Le([Q({type:Boolean})],vr.prototype,"isFadingIndicator",void 0),Le([Q({type:Boolean})],vr.prototype,"minWidth",void 0),Le([Q({type:Boolean})],vr.prototype,"isMinWidthIndicator",void 0),Le([Q({type:Boolean,reflect:!0,attribute:"active"})],vr.prototype,"active",null),Le([Q()],vr.prototype,"indicatorIcon",void 0),Le([Q({type:Boolean})],vr.prototype,"stacked",void 0),Le([qe((async function(e){await this.updateComplete,this.mdcFoundation.setFocusOnActivate(e)})),Q({type:Boolean})],vr.prototype,"focusOnActivate",void 0),Le([X(".mdc-tab__content")],vr.prototype,"_contentElement",void 0);
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
const kr=ie`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-tab{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);padding-right:24px;padding-left:24px;position:relative;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;background:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab .mdc-tab__text-label{color:rgba(0, 0, 0, 0.6)}.mdc-tab .mdc-tab__icon{color:rgba(0, 0, 0, 0.54);fill:currentColor}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{position:relative;display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;width:24px;height:24px;font-size:24px;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-tab--active .mdc-tab__icon{color:#6200ee;color:var(--mdc-theme-primary, #6200ee);fill:currentColor}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-tab__ripple{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden}.mdc-tab__ripple::before,.mdc-tab__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-tab__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-tab__ripple.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-tab__ripple.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-tab__ripple.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-tab__ripple.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-tab__ripple.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-tab__ripple::before,.mdc-tab__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-tab__ripple.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-tab__ripple::before,.mdc-tab__ripple::after{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-tab__ripple:hover::before{opacity:.04}.mdc-tab__ripple.mdc-ripple-upgraded--background-focused::before,.mdc-tab__ripple:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-tab__ripple:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-tab__ripple:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-tab__ripple.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}:host{outline:none;flex:1 0 auto;display:flex;justify-content:center}.mdc-tab{height:var(--mdc-tab-height, 48px);margin-left:0;margin-right:0;padding-right:var(--mdc-tab-horizontal-padding, 24px);padding-left:var(--mdc-tab-horizontal-padding, 24px)}.mdc-tab--stacked{height:var(--mdc-tab-stacked-height, 72px)}.mdc-tab::-moz-focus-inner{border:0}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mdc-tab-text-label-color-default, rgba(0, 0, 0, 0.6))}.mdc-tab:not(.mdc-tab--active) .mdc-tab__icon{color:var(--mdc-tab-color-default, rgba(0, 0, 0, 0.54))}`;let wr=class extends vr{};
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
function Cr(e,r,t,o){var n,i=arguments.length,a=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,r,t,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(r,t,a):n(r,t))||a);return i>3&&a&&Object.defineProperty(r,t,a),a
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
***************************************************************************** */}wr.styles=kr,wr=Le([q("mwc-tab")],wr);var xr=function(e,r){return(xr=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(e,r)};function Sr(e,r){function t(){this.constructor=e}xr(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}var Tr=function(){return(Tr=Object.assign||function(e){for(var r,t=1,o=arguments.length;t<o;t++)for(var n in r=arguments[t])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)},Lr={ANIMATING:"mdc-tab-scroller--animating",SCROLL_AREA_SCROLL:"mdc-tab-scroller__scroll-area--scroll",SCROLL_TEST:"mdc-tab-scroller__test"},Er={AREA_SELECTOR:".mdc-tab-scroller__scroll-area",CONTENT_SELECTOR:".mdc-tab-scroller__scroll-content"},Or=function(e){this.adapter=e},Ar=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return Sr(r,e),r.prototype.getScrollPositionRTL=function(){var e=this.adapter.getScrollAreaScrollLeft(),r=this.calculateScrollEdges_().right;return Math.round(r-e)},r.prototype.scrollToRTL=function(e){var r=this.calculateScrollEdges_(),t=this.adapter.getScrollAreaScrollLeft(),o=this.clampScrollValue_(r.right-e);return{finalScrollPosition:o,scrollDelta:o-t}},r.prototype.incrementScrollRTL=function(e){var r=this.adapter.getScrollAreaScrollLeft(),t=this.clampScrollValue_(r-e);return{finalScrollPosition:t,scrollDelta:t-r}},r.prototype.getAnimatingScrollPosition=function(e){return e},r.prototype.calculateScrollEdges_=function(){return{left:0,right:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth()}},r.prototype.clampScrollValue_=function(e){var r=this.calculateScrollEdges_();return Math.min(Math.max(r.left,e),r.right)},r}(Or),_r=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return Sr(r,e),r.prototype.getScrollPositionRTL=function(e){var r=this.adapter.getScrollAreaScrollLeft();return Math.round(e-r)},r.prototype.scrollToRTL=function(e){var r=this.adapter.getScrollAreaScrollLeft(),t=this.clampScrollValue_(-e);return{finalScrollPosition:t,scrollDelta:t-r}},r.prototype.incrementScrollRTL=function(e){var r=this.adapter.getScrollAreaScrollLeft(),t=this.clampScrollValue_(r-e);return{finalScrollPosition:t,scrollDelta:t-r}},r.prototype.getAnimatingScrollPosition=function(e,r){return e-r},r.prototype.calculateScrollEdges_=function(){var e=this.adapter.getScrollContentOffsetWidth();return{left:this.adapter.getScrollAreaOffsetWidth()-e,right:0}},r.prototype.clampScrollValue_=function(e){var r=this.calculateScrollEdges_();return Math.max(Math.min(r.right,e),r.left)},r}(Or),Mr=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return Sr(r,e),r.prototype.getScrollPositionRTL=function(e){var r=this.adapter.getScrollAreaScrollLeft();return Math.round(r-e)},r.prototype.scrollToRTL=function(e){var r=this.adapter.getScrollAreaScrollLeft(),t=this.clampScrollValue_(e);return{finalScrollPosition:t,scrollDelta:r-t}},r.prototype.incrementScrollRTL=function(e){var r=this.adapter.getScrollAreaScrollLeft(),t=this.clampScrollValue_(r+e);return{finalScrollPosition:t,scrollDelta:r-t}},r.prototype.getAnimatingScrollPosition=function(e,r){return e+r},r.prototype.calculateScrollEdges_=function(){return{left:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth(),right:0}},r.prototype.clampScrollValue_=function(e){var r=this.calculateScrollEdges_();return Math.min(Math.max(r.right,e),r.left)},r}(Or),Rr=function(e){function r(t){var o=e.call(this,Tr(Tr({},r.defaultAdapter),t))||this;return o.isAnimating_=!1,o}return Sr(r,e),Object.defineProperty(r,"cssClasses",{get:function(){return Lr},enumerable:!0,configurable:!0}),Object.defineProperty(r,"strings",{get:function(){return Er},enumerable:!0,configurable:!0}),Object.defineProperty(r,"defaultAdapter",{get:function(){return{eventTargetMatchesSelector:function(){return!1},addClass:function(){},removeClass:function(){},addScrollAreaClass:function(){},setScrollAreaStyleProperty:function(){},setScrollContentStyleProperty:function(){},getScrollContentStyleValue:function(){return""},setScrollAreaScrollLeft:function(){},getScrollAreaScrollLeft:function(){return 0},getScrollContentOffsetWidth:function(){return 0},getScrollAreaOffsetWidth:function(){return 0},computeScrollAreaClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeScrollContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeHorizontalScrollbarHeight:function(){return 0}}},enumerable:!0,configurable:!0}),r.prototype.init=function(){var e=this.adapter.computeHorizontalScrollbarHeight();this.adapter.setScrollAreaStyleProperty("margin-bottom",-e+"px"),this.adapter.addScrollAreaClass(r.cssClasses.SCROLL_AREA_SCROLL)},r.prototype.getScrollPosition=function(){if(this.isRTL_())return this.computeCurrentScrollPositionRTL_();var e=this.calculateCurrentTranslateX_();return this.adapter.getScrollAreaScrollLeft()-e},r.prototype.handleInteraction=function(){this.isAnimating_&&this.stopScrollAnimation_()},r.prototype.handleTransitionEnd=function(e){var t=e.target;this.isAnimating_&&this.adapter.eventTargetMatchesSelector(t,r.strings.CONTENT_SELECTOR)&&(this.isAnimating_=!1,this.adapter.removeClass(r.cssClasses.ANIMATING))},r.prototype.incrementScroll=function(e){0!==e&&this.animate_(this.getIncrementScrollOperation_(e))},r.prototype.incrementScrollImmediate=function(e){if(0!==e){var r=this.getIncrementScrollOperation_(e);0!==r.scrollDelta&&(this.stopScrollAnimation_(),this.adapter.setScrollAreaScrollLeft(r.finalScrollPosition))}},r.prototype.scrollTo=function(e){if(this.isRTL_())return this.scrollToRTL_(e);this.scrollTo_(e)},r.prototype.getRTLScroller=function(){return this.rtlScrollerInstance_||(this.rtlScrollerInstance_=this.rtlScrollerFactory_()),this.rtlScrollerInstance_},r.prototype.calculateCurrentTranslateX_=function(){var e=this.adapter.getScrollContentStyleValue("transform");if("none"===e)return 0;var r=/\((.+?)\)/.exec(e);if(!r)return 0;var t=function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var o,n,i=t.call(e),a=[];try{for(;(void 0===r||r-- >0)&&!(o=i.next()).done;)a.push(o.value)}catch(e){n={error:e}}finally{try{o&&!o.done&&(t=i.return)&&t.call(i)}finally{if(n)throw n.error}}return a}
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
 */(r[1].split(","),6),o=(t[0],t[1],t[2],t[3],t[4]);return t[5],parseFloat(o)},r.prototype.clampScrollValue_=function(e){var r=this.calculateScrollEdges_();return Math.min(Math.max(r.left,e),r.right)},r.prototype.computeCurrentScrollPositionRTL_=function(){var e=this.calculateCurrentTranslateX_();return this.getRTLScroller().getScrollPositionRTL(e)},r.prototype.calculateScrollEdges_=function(){return{left:0,right:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth()}},r.prototype.scrollTo_=function(e){var r=this.getScrollPosition(),t=this.clampScrollValue_(e),o=t-r;this.animate_({finalScrollPosition:t,scrollDelta:o})},r.prototype.scrollToRTL_=function(e){var r=this.getRTLScroller().scrollToRTL(e);this.animate_(r)},r.prototype.getIncrementScrollOperation_=function(e){if(this.isRTL_())return this.getRTLScroller().incrementScrollRTL(e);var r=this.getScrollPosition(),t=e+r,o=this.clampScrollValue_(t);return{finalScrollPosition:o,scrollDelta:o-r}},r.prototype.animate_=function(e){var t=this;0!==e.scrollDelta&&(this.stopScrollAnimation_(),this.adapter.setScrollAreaScrollLeft(e.finalScrollPosition),this.adapter.setScrollContentStyleProperty("transform","translateX("+e.scrollDelta+"px)"),this.adapter.computeScrollAreaClientRect(),requestAnimationFrame((function(){t.adapter.addClass(r.cssClasses.ANIMATING),t.adapter.setScrollContentStyleProperty("transform","none")})),this.isAnimating_=!0)},r.prototype.stopScrollAnimation_=function(){this.isAnimating_=!1;var e=this.getAnimatingScrollPosition_();this.adapter.removeClass(r.cssClasses.ANIMATING),this.adapter.setScrollContentStyleProperty("transform","translateX(0px)"),this.adapter.setScrollAreaScrollLeft(e)},r.prototype.getAnimatingScrollPosition_=function(){var e=this.calculateCurrentTranslateX_(),r=this.adapter.getScrollAreaScrollLeft();return this.isRTL_()?this.getRTLScroller().getAnimatingScrollPosition(r,e):r-e},r.prototype.rtlScrollerFactory_=function(){var e=this.adapter.getScrollAreaScrollLeft();this.adapter.setScrollAreaScrollLeft(e-1);var r=this.adapter.getScrollAreaScrollLeft();if(r<0)return this.adapter.setScrollAreaScrollLeft(e),new _r(this.adapter);var t=this.adapter.computeScrollAreaClientRect(),o=this.adapter.computeScrollContentClientRect(),n=Math.round(o.right-t.right);return this.adapter.setScrollAreaScrollLeft(e),n===r?new Mr(this.adapter):new Ar(this.adapter)},r.prototype.isRTL_=function(){return"rtl"===this.adapter.getScrollContentStyleValue("direction")},r}(Ie);class zr extends Re{constructor(){super(...arguments),this.mdcFoundationClass=Rr,this._scrollbarHeight=-1}_handleInteraction(){this.mdcFoundation.handleInteraction()}_handleTransitionEnd(e){this.mdcFoundation.handleTransitionEnd(e)}render(){return P`
      <div class="mdc-tab-scroller">
        <div class="mdc-tab-scroller__scroll-area"
            @wheel="${this._handleInteraction}"
            @touchstart="${this._handleInteraction}"
            @pointerdown="${this._handleInteraction}"
            @mousedown="${this._handleInteraction}"
            @keydown="${this._handleInteraction}"
            @transitionend="${this._handleTransitionEnd}">
          <div class="mdc-tab-scroller__scroll-content"><slot></slot></div>
        </div>
      </div>
      `}createAdapter(){return Object.assign(Object.assign({},Ae(this.mdcRoot)),{eventTargetMatchesSelector:(e,r)=>Oe(e,r),addScrollAreaClass:e=>this.scrollAreaElement.classList.add(e),setScrollAreaStyleProperty:(e,r)=>this.scrollAreaElement.style.setProperty(e,r),setScrollContentStyleProperty:(e,r)=>this.scrollContentElement.style.setProperty(e,r),getScrollContentStyleValue:e=>window.getComputedStyle(this.scrollContentElement).getPropertyValue(e),setScrollAreaScrollLeft:e=>this.scrollAreaElement.scrollLeft=e,getScrollAreaScrollLeft:()=>this.scrollAreaElement.scrollLeft,getScrollContentOffsetWidth:()=>this.scrollContentElement.offsetWidth,getScrollAreaOffsetWidth:()=>this.scrollAreaElement.offsetWidth,computeScrollAreaClientRect:()=>this.scrollAreaElement.getBoundingClientRect(),computeScrollContentClientRect:()=>this.scrollContentElement.getBoundingClientRect(),computeHorizontalScrollbarHeight:()=>(-1===this._scrollbarHeight&&(this.scrollAreaElement.style.overflowX="scroll",this._scrollbarHeight=this.scrollAreaElement.offsetHeight-this.scrollAreaElement.clientHeight,this.scrollAreaElement.style.overflowX=""),this._scrollbarHeight)})}getScrollPosition(){return this.mdcFoundation.getScrollPosition()}getScrollContentWidth(){return this.scrollContentElement.offsetWidth}incrementScrollPosition(e){this.mdcFoundation.incrementScroll(e)}scrollToPosition(e){this.mdcFoundation.scrollTo(e)}}Cr([X(".mdc-tab-scroller")],zr.prototype,"mdcRoot",void 0),Cr([X(".mdc-tab-scroller__scroll-area")],zr.prototype,"scrollAreaElement",void 0),Cr([X(".mdc-tab-scroller__scroll-content")],zr.prototype,"scrollContentElement",void 0),Cr([re({passive:!0})],zr.prototype,"_handleInteraction",null);
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
const Nr=ie`.mdc-tab-scroller{overflow-y:hidden}.mdc-tab-scroller.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-scroller__test{position:absolute;top:-9999px;width:100px;height:100px;overflow-x:scroll}.mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:touch;display:flex;overflow-x:hidden}.mdc-tab-scroller__scroll-area::-webkit-scrollbar,.mdc-tab-scroller__test::-webkit-scrollbar{display:none}.mdc-tab-scroller__scroll-area--scroll{overflow-x:scroll}.mdc-tab-scroller__scroll-content{position:relative;display:flex;flex:1 0 auto;transform:none;will-change:transform}.mdc-tab-scroller--align-start .mdc-tab-scroller__scroll-content{justify-content:flex-start}.mdc-tab-scroller--align-end .mdc-tab-scroller__scroll-content{justify-content:flex-end}.mdc-tab-scroller--align-center .mdc-tab-scroller__scroll-content{justify-content:center}.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:auto}:host{display:flex}.mdc-tab-scroller{flex:1}`;let Fr=class extends zr{};Fr.styles=Nr,Fr=Cr([q("mwc-tab-scroller")],Fr);
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
var Ir=function(e,r){return(Ir=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(e,r)},Wr=function(){return(Wr=Object.assign||function(e){for(var r,t=1,o=arguments.length;t<o;t++)for(var n in r=arguments[t])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)},Pr={ARROW_LEFT_KEY:"ArrowLeft",ARROW_RIGHT_KEY:"ArrowRight",END_KEY:"End",ENTER_KEY:"Enter",HOME_KEY:"Home",SPACE_KEY:"Space",TAB_ACTIVATED_EVENT:"MDCTabBar:activated",TAB_SCROLLER_SELECTOR:".mdc-tab-scroller",TAB_SELECTOR:".mdc-tab"},Kr={ARROW_LEFT_KEYCODE:37,ARROW_RIGHT_KEYCODE:39,END_KEYCODE:35,ENTER_KEYCODE:13,EXTRA_SCROLL_AMOUNT:20,HOME_KEYCODE:36,SPACE_KEYCODE:32},Ur=new Set;Ur.add(Pr.ARROW_LEFT_KEY),Ur.add(Pr.ARROW_RIGHT_KEY),Ur.add(Pr.END_KEY),Ur.add(Pr.HOME_KEY),Ur.add(Pr.ENTER_KEY),Ur.add(Pr.SPACE_KEY);var Br=new Map;Br.set(Kr.ARROW_LEFT_KEYCODE,Pr.ARROW_LEFT_KEY),Br.set(Kr.ARROW_RIGHT_KEYCODE,Pr.ARROW_RIGHT_KEY),Br.set(Kr.END_KEYCODE,Pr.END_KEY),Br.set(Kr.HOME_KEYCODE,Pr.HOME_KEY),Br.set(Kr.ENTER_KEYCODE,Pr.ENTER_KEY),Br.set(Kr.SPACE_KEYCODE,Pr.SPACE_KEY);var Dr=function(e){function r(t){var o=e.call(this,Wr(Wr({},r.defaultAdapter),t))||this;return o.useAutomaticActivation_=!1,o}return function(e,r){function t(){this.constructor=e}Ir(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}(r,e),Object.defineProperty(r,"strings",{get:function(){return Pr},enumerable:!0,configurable:!0}),Object.defineProperty(r,"numbers",{get:function(){return Kr},enumerable:!0,configurable:!0}),Object.defineProperty(r,"defaultAdapter",{get:function(){return{scrollTo:function(){},incrementScroll:function(){},getScrollPosition:function(){return 0},getScrollContentWidth:function(){return 0},getOffsetWidth:function(){return 0},isRTL:function(){return!1},setActiveTab:function(){},activateTabAtIndex:function(){},deactivateTabAtIndex:function(){},focusTabAtIndex:function(){},getTabIndicatorClientRectAtIndex:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},getTabDimensionsAtIndex:function(){return{rootLeft:0,rootRight:0,contentLeft:0,contentRight:0}},getPreviousActiveTabIndex:function(){return-1},getFocusedTabIndex:function(){return-1},getIndexOfTabById:function(){return-1},getTabListLength:function(){return 0},notifyTabActivated:function(){}}},enumerable:!0,configurable:!0}),r.prototype.setUseAutomaticActivation=function(e){this.useAutomaticActivation_=e},r.prototype.activateTab=function(e){var r,t=this.adapter.getPreviousActiveTabIndex();this.indexIsInRange_(e)&&e!==t&&(-1!==t&&(this.adapter.deactivateTabAtIndex(t),r=this.adapter.getTabIndicatorClientRectAtIndex(t)),this.adapter.activateTabAtIndex(e,r),this.scrollIntoView(e),this.adapter.notifyTabActivated(e))},r.prototype.handleKeyDown=function(e){var r=this.getKeyFromEvent_(e);if(void 0!==r)if(this.isActivationKey_(r)||e.preventDefault(),this.useAutomaticActivation_){if(this.isActivationKey_(r))return;var t=this.determineTargetFromKey_(this.adapter.getPreviousActiveTabIndex(),r);this.adapter.setActiveTab(t),this.scrollIntoView(t)}else{var o=this.adapter.getFocusedTabIndex();this.isActivationKey_(r)?this.adapter.setActiveTab(o):(t=this.determineTargetFromKey_(o,r),this.adapter.focusTabAtIndex(t),this.scrollIntoView(t))}},r.prototype.handleTabInteraction=function(e){this.adapter.setActiveTab(this.adapter.getIndexOfTabById(e.detail.tabId))},r.prototype.scrollIntoView=function(e){if(this.indexIsInRange_(e))return 0===e?this.adapter.scrollTo(0):e===this.adapter.getTabListLength()-1?this.adapter.scrollTo(this.adapter.getScrollContentWidth()):this.isRTL_()?this.scrollIntoViewRTL_(e):void this.scrollIntoView_(e)},r.prototype.determineTargetFromKey_=function(e,r){var t=this.isRTL_(),o=this.adapter.getTabListLength()-1,n=e;return r===Pr.END_KEY?n=o:r===Pr.ARROW_LEFT_KEY&&!t||r===Pr.ARROW_RIGHT_KEY&&t?n-=1:r===Pr.ARROW_RIGHT_KEY&&!t||r===Pr.ARROW_LEFT_KEY&&t?n+=1:n=0,n<0?n=o:n>o&&(n=0),n},r.prototype.calculateScrollIncrement_=function(e,r,t,o){var n=this.adapter.getTabDimensionsAtIndex(r),i=n.contentLeft-t-o,a=n.contentRight-t,l=i+Kr.EXTRA_SCROLL_AMOUNT;return r<e?Math.min(a-Kr.EXTRA_SCROLL_AMOUNT,0):Math.max(l,0)},r.prototype.calculateScrollIncrementRTL_=function(e,r,t,o,n){var i=this.adapter.getTabDimensionsAtIndex(r),a=n-i.contentLeft-t,l=n-i.contentRight-t-o,c=a-Kr.EXTRA_SCROLL_AMOUNT;return r>e?Math.max(l+Kr.EXTRA_SCROLL_AMOUNT,0):Math.min(c,0)},r.prototype.findAdjacentTabIndexClosestToEdge_=function(e,r,t,o){var n=r.rootLeft-t,i=r.rootRight-t-o,a=n+i;return n<0||a<0?e-1:i>0||a>0?e+1:-1},r.prototype.findAdjacentTabIndexClosestToEdgeRTL_=function(e,r,t,o,n){var i=n-r.rootLeft-o-t,a=n-r.rootRight-t,l=i+a;return i>0||l>0?e+1:a<0||l<0?e-1:-1},r.prototype.getKeyFromEvent_=function(e){return Ur.has(e.key)?e.key:Br.get(e.keyCode)},r.prototype.isActivationKey_=function(e){return e===Pr.SPACE_KEY||e===Pr.ENTER_KEY},r.prototype.indexIsInRange_=function(e){return e>=0&&e<this.adapter.getTabListLength()},r.prototype.isRTL_=function(){return this.adapter.isRTL()},r.prototype.scrollIntoView_=function(e){var r=this.adapter.getScrollPosition(),t=this.adapter.getOffsetWidth(),o=this.adapter.getTabDimensionsAtIndex(e),n=this.findAdjacentTabIndexClosestToEdge_(e,o,r,t);if(this.indexIsInRange_(n)){var i=this.calculateScrollIncrement_(e,n,r,t);this.adapter.incrementScroll(i)}},r.prototype.scrollIntoViewRTL_=function(e){var r=this.adapter.getScrollPosition(),t=this.adapter.getOffsetWidth(),o=this.adapter.getTabDimensionsAtIndex(e),n=this.adapter.getScrollContentWidth(),i=this.findAdjacentTabIndexClosestToEdgeRTL_(e,o,r,t,n);if(this.indexIsInRange_(i)){var a=this.calculateScrollIncrementRTL_(e,i,r,t,n);this.adapter.incrementScroll(a)}},r}(Ie);class jr extends Re{constructor(){super(...arguments),this.mdcFoundationClass=Dr,this.activeIndex=0,this._previousActiveIndex=-1}_handleTabInteraction(e){this.mdcFoundation.handleTabInteraction(e)}_handleKeydown(e){this.mdcFoundation.handleKeyDown(e)}render(){return P`
      <div class="mdc-tab-bar" role="tablist"
          @MDCTab:interacted="${this._handleTabInteraction}"
          @keydown="${this._handleKeydown}">
        <mwc-tab-scroller><slot></slot></mwc-tab-scroller>
      </div>
      `}_getTabs(){return this.tabsSlot.assignedNodes({flatten:!0}).filter((e=>e instanceof wr))}_getTab(e){return this._getTabs()[e]}createAdapter(){return{scrollTo:e=>this.scrollerElement.scrollToPosition(e),incrementScroll:e=>this.scrollerElement.incrementScrollPosition(e),getScrollPosition:()=>this.scrollerElement.getScrollPosition(),getScrollContentWidth:()=>this.scrollerElement.getScrollContentWidth(),getOffsetWidth:()=>this.mdcRoot.offsetWidth,isRTL:()=>"rtl"===window.getComputedStyle(this.mdcRoot).getPropertyValue("direction"),setActiveTab:e=>this.mdcFoundation.activateTab(e),activateTabAtIndex:(e,r)=>{const t=this._getTab(e);void 0!==t&&t.activate(r),this._previousActiveIndex=e},deactivateTabAtIndex:e=>{const r=this._getTab(e);void 0!==r&&r.deactivate()},focusTabAtIndex:e=>{const r=this._getTab(e);void 0!==r&&r.focus()},getTabIndicatorClientRectAtIndex:e=>{const r=this._getTab(e);return void 0!==r?r.computeIndicatorClientRect():new DOMRect},getTabDimensionsAtIndex:e=>{const r=this._getTab(e);return void 0!==r?r.computeDimensions():{rootLeft:0,rootRight:0,contentLeft:0,contentRight:0}},getPreviousActiveTabIndex:()=>this._previousActiveIndex,getFocusedTabIndex:()=>{const e=this._getTabs(),r=this.getRootNode().activeElement;return e.indexOf(r)},getIndexOfTabById:e=>{const r=this._getTabs();for(let t=0;t<r.length;t++)if(r[t].id===e)return t;return-1},getTabListLength:()=>this._getTabs().length,notifyTabActivated:e=>{this.activeIndex=e,this.dispatchEvent(new CustomEvent(Dr.strings.TAB_ACTIVATED_EVENT,{detail:{index:e},bubbles:!0,cancelable:!0}))}}}firstUpdated(){}_getUpdateComplete(){return super._getUpdateComplete().then((()=>this.scrollerElement.updateComplete)).then((()=>{void 0===this.mdcFoundation&&this.createFoundation()}))}scrollIndexIntoView(e){this.mdcFoundation.scrollIntoView(e)}}Te([X(".mdc-tab-bar")],jr.prototype,"mdcRoot",void 0),Te([X("mwc-tab-scroller")],jr.prototype,"scrollerElement",void 0),Te([X("slot")],jr.prototype,"tabsSlot",void 0),Te([qe((async function(){await this.updateComplete,this.activeIndex!==this._previousActiveIndex&&this.mdcFoundation.activateTab(this.activeIndex)})),Q({type:Number})],jr.prototype,"activeIndex",void 0);
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
const Hr=ie`.mdc-tab-bar{width:100%}.mdc-tab{height:48px}.mdc-tab--stacked{height:72px}:host{display:block}.mdc-tab-bar{flex:1}mwc-tab{--mdc-tab-height: 48px;--mdc-tab-stacked-height: 72px}`;let Vr=class extends jr{};
/* @license CodeMirror, copyright (c) by Marijn Haverbeke and others
Distributed under an MIT license: https://codemirror.net/LICENSE */
var Zr;function Jr(e,r,t,o,n,i){this.name=e,this.tokenType=r,this.depth=t,this.parent=o,this.startLine=n,this.startPos=i}function qr(){this.stream=null,this.line=this.startPos=0,this.string=this.startLine="",this.copyInstance=null}Vr.styles=Hr,Vr=Te([q("mwc-tab-bar")],Vr),Zr=function(){var e=navigator.userAgent,r=navigator.platform,t=/gecko\/\d/i.test(e),o=/MSIE \d/.test(e),n=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),i=/Edge\/(\d+)/.exec(e),a=o||n||i,l=a&&(o?document.documentMode||6:+(i||n)[1]),c=!i&&/WebKit\//.test(e),d=c&&/Qt\/\d+\.\d+/.test(e),s=!i&&/Chrome\//.test(e),u=/Opera\//.test(e),p=/Apple Computer/.test(navigator.vendor),g=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),h=/PhantomJS/.test(e),f=!i&&/AppleWebKit/.test(e)&&/Mobile\/\w+/.test(e),b=/Android/.test(e),m=f||b||/webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),y=f||/Mac/.test(r),v=/\bCrOS\b/.test(e),k=/win/i.test(r),w=u&&e.match(/Version\/(\d*\.\d*)/);w&&(w=Number(w[1])),w&&w>=15&&(u=!1,c=!0);var C=y&&(d||u&&(null==w||w<12.11)),x=t||a&&l>=9;function S(e){return RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}var T,L=function(e,r){var t=e.className,o=S(r).exec(t);if(o){var n=t.slice(o.index+o[0].length);e.className=t.slice(0,o.index)+(n?o[1]+n:"")}};function E(e){for(var r=e.childNodes.length;r>0;--r)e.removeChild(e.firstChild);return e}function O(e,r){return E(e).appendChild(r)}function A(e,r,t,o){var n=document.createElement(e);if(t&&(n.className=t),o&&(n.style.cssText=o),"string"==typeof r)n.appendChild(document.createTextNode(r));else if(r)for(var i=0;i<r.length;++i)n.appendChild(r[i]);return n}function _(e,r,t,o){var n=A(e,r,t,o);return n.setAttribute("role","presentation"),n}function M(e,r){if(3==r.nodeType&&(r=r.parentNode),e.contains)return e.contains(r);do{if(11==r.nodeType&&(r=r.host),r==e)return!0}while(r=r.parentNode)}function R(){var e;try{e=document.activeElement}catch(r){e=document.body||null}for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function z(e,r){var t=e.className;S(r).test(t)||(e.className+=(t?" ":"")+r)}function N(e,r){for(var t=e.split(" "),o=0;o<t.length;o++)t[o]&&!S(t[o]).test(r)&&(r+=" "+t[o]);return r}T=document.createRange?function(e,r,t,o){var n=document.createRange();return n.setEnd(o||e,t),n.setStart(e,r),n}:function(e,r,t){var o=document.body.createTextRange();try{o.moveToElementText(e.parentNode)}catch(e){return o}return o.collapse(!0),o.moveEnd("character",t),o.moveStart("character",r),o};var F=function(e){e.select()};function I(e){var r=Array.prototype.slice.call(arguments,1);return function(){return e.apply(null,r)}}function W(e,r,t){for(var o in r||(r={}),e)!e.hasOwnProperty(o)||!1===t&&r.hasOwnProperty(o)||(r[o]=e[o]);return r}function P(e,r,t,o,n){null==r&&-1==(r=e.search(/[^\s\u00a0]/))&&(r=e.length);for(var i=o||0,a=n||0;;){var l=e.indexOf("\t",i);if(l<0||l>=r)return a+(r-i);a+=l-i,a+=t-a%t,i=l+1}}f?F=function(e){e.selectionStart=0,e.selectionEnd=e.value.length}:a&&(F=function(e){try{e.select()}catch(e){}});var K=function(){this.id=null,this.f=null,this.time=0,this.handler=I(this.onTimeout,this)};function U(e,r){for(var t=0;t<e.length;++t)if(e[t]==r)return t;return-1}K.prototype.onTimeout=function(e){e.id=0,e.time<=+new Date?e.f():setTimeout(e.handler,e.time-+new Date)},K.prototype.set=function(e,r){this.f=r;var t=+new Date+e;(!this.id||t<this.time)&&(clearTimeout(this.id),this.id=setTimeout(this.handler,e),this.time=t)};var B={toString:function(){return"CodeMirror.Pass"}},D={scroll:!1},j={origin:"*mouse"},H={origin:"+move"};function V(e,r,t){for(var o=0,n=0;;){var i=e.indexOf("\t",o);-1==i&&(i=e.length);var a=i-o;if(i==e.length||n+a>=r)return o+Math.min(a,r-n);if(n+=i-o,o=i+1,(n+=t-n%t)>=r)return o}}var Z=[""];function J(e){for(;Z.length<=e;)Z.push(q(Z)+" ");return Z[e]}function q(e){return e[e.length-1]}function G(e,r){for(var t=[],o=0;o<e.length;o++)t[o]=r(e[o],o);return t}function Q(){}function Y(e,r){var t;return Object.create?t=Object.create(e):(Q.prototype=e,t=new Q),r&&W(r,t),t}var X=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;function $(e){return/\w/.test(e)||e>""&&(e.toUpperCase()!=e.toLowerCase()||X.test(e))}function ee(e,r){return r?!!(r.source.indexOf("\\w")>-1&&$(e))||r.test(e):$(e)}function re(e){for(var r in e)if(e.hasOwnProperty(r)&&e[r])return!1;return!0}var te=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;function oe(e){return e.charCodeAt(0)>=768&&te.test(e)}function ne(e,r,t){for(;(t<0?r>0:r<e.length)&&oe(e.charAt(r));)r+=t;return r}function ie(e,r,t){for(var o=r>t?-1:1;;){if(r==t)return r;var n=(r+t)/2,i=o<0?Math.ceil(n):Math.floor(n);if(i==r)return e(i)?r:t;e(i)?t=i:r=i+o}}var ae=null;function le(e,r,t){var o;ae=null;for(var n=0;n<e.length;++n){var i=e[n];if(i.from<r&&i.to>r)return n;i.to==r&&(i.from!=i.to&&"before"==t?o=n:ae=n),i.from==r&&(i.from!=i.to&&"before"!=t?o=n:ae=n)}return null!=o?o:ae}var ce=function(){var e=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,r=/[stwN]/,t=/[LRr]/,o=/[Lb1n]/,n=/[1n]/;function i(e,r,t){this.level=e,this.from=r,this.to=t}return function(a,l){var c="ltr"==l?"L":"R";if(0==a.length||"ltr"==l&&!e.test(a))return!1;for(var d,s=a.length,u=[],p=0;p<s;++p)u.push((d=a.charCodeAt(p))<=247?"bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(d):1424<=d&&d<=1524?"R":1536<=d&&d<=1785?"nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(d-1536):1774<=d&&d<=2220?"r":8192<=d&&d<=8203?"w":8204==d?"b":"L");for(var g=0,h=c;g<s;++g){var f=u[g];"m"==f?u[g]=h:h=f}for(var b=0,m=c;b<s;++b){var y=u[b];"1"==y&&"r"==m?u[b]="n":t.test(y)&&(m=y,"r"==y&&(u[b]="R"))}for(var v=1,k=u[0];v<s-1;++v){var w=u[v];"+"==w&&"1"==k&&"1"==u[v+1]?u[v]="1":","!=w||k!=u[v+1]||"1"!=k&&"n"!=k||(u[v]=k),k=w}for(var C=0;C<s;++C){var x=u[C];if(","==x)u[C]="N";else if("%"==x){var S=void 0;for(S=C+1;S<s&&"%"==u[S];++S);for(var T=C&&"!"==u[C-1]||S<s&&"1"==u[S]?"1":"N",L=C;L<S;++L)u[L]=T;C=S-1}}for(var E=0,O=c;E<s;++E){var A=u[E];"L"==O&&"1"==A?u[E]="L":t.test(A)&&(O=A)}for(var _=0;_<s;++_)if(r.test(u[_])){var M=void 0;for(M=_+1;M<s&&r.test(u[M]);++M);for(var R="L"==(_?u[_-1]:c),z=R==("L"==(M<s?u[M]:c))?R?"L":"R":c,N=_;N<M;++N)u[N]=z;_=M-1}for(var F,I=[],W=0;W<s;)if(o.test(u[W])){var P=W;for(++W;W<s&&o.test(u[W]);++W);I.push(new i(0,P,W))}else{var K=W,U=I.length,B="rtl"==l?1:0;for(++W;W<s&&"L"!=u[W];++W);for(var D=K;D<W;)if(n.test(u[D])){K<D&&(I.splice(U,0,new i(1,K,D)),U+=B);var j=D;for(++D;D<W&&n.test(u[D]);++D);I.splice(U,0,new i(2,j,D)),U+=B,K=D}else++D;K<W&&I.splice(U,0,new i(1,K,W))}return"ltr"==l&&(1==I[0].level&&(F=a.match(/^\s+/))&&(I[0].from=F[0].length,I.unshift(new i(0,0,F[0].length))),1==q(I).level&&(F=a.match(/\s+$/))&&(q(I).to-=F[0].length,I.push(new i(0,s-F[0].length,s)))),"rtl"==l?I.reverse():I}}();function de(e,r){var t=e.order;return null==t&&(t=e.order=ce(e.text,r)),t}var se=[],ue=function(e,r,t){if(e.addEventListener)e.addEventListener(r,t,!1);else if(e.attachEvent)e.attachEvent("on"+r,t);else{var o=e._handlers||(e._handlers={});o[r]=(o[r]||se).concat(t)}};function pe(e,r){return e._handlers&&e._handlers[r]||se}function ge(e,r,t){if(e.removeEventListener)e.removeEventListener(r,t,!1);else if(e.detachEvent)e.detachEvent("on"+r,t);else{var o=e._handlers,n=o&&o[r];if(n){var i=U(n,t);i>-1&&(o[r]=n.slice(0,i).concat(n.slice(i+1)))}}}function he(e,r){var t=pe(e,r);if(t.length)for(var o=Array.prototype.slice.call(arguments,2),n=0;n<t.length;++n)t[n].apply(null,o)}function fe(e,r,t){return"string"==typeof r&&(r={type:r,preventDefault:function(){this.defaultPrevented=!0}}),he(e,t||r.type,e,r),we(r)||r.codemirrorIgnore}function be(e){var r=e._handlers&&e._handlers.cursorActivity;if(r)for(var t=e.curOp.cursorActivityHandlers||(e.curOp.cursorActivityHandlers=[]),o=0;o<r.length;++o)-1==U(t,r[o])&&t.push(r[o])}function me(e,r){return pe(e,r).length>0}function ye(e){e.prototype.on=function(e,r){ue(this,e,r)},e.prototype.off=function(e,r){ge(this,e,r)}}function ve(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function ke(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}function we(e){return null!=e.defaultPrevented?e.defaultPrevented:0==e.returnValue}function Ce(e){ve(e),ke(e)}function xe(e){return e.target||e.srcElement}function Se(e){var r=e.which;return null==r&&(1&e.button?r=1:2&e.button?r=3:4&e.button&&(r=2)),y&&e.ctrlKey&&1==r&&(r=3),r}var Te,Le,Ee=function(){if(a&&l<9)return!1;var e=A("div");return"draggable"in e||"dragDrop"in e}();function Oe(e){if(null==Te){var r=A("span","​");O(e,A("span",[r,document.createTextNode("x")])),0!=e.firstChild.offsetHeight&&(Te=r.offsetWidth<=1&&r.offsetHeight>2&&!(a&&l<8))}var t=Te?A("span","​"):A("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px");return t.setAttribute("cm-text",""),t}function Ae(e){if(null!=Le)return Le;var r=O(e,document.createTextNode("AخA")),t=T(r,0,1).getBoundingClientRect(),o=T(r,1,2).getBoundingClientRect();return E(e),!(!t||t.left==t.right)&&(Le=o.right-t.right<3)}var _e,Me=function(e){return e.split(/\r\n?|\n/)},Re=window.getSelection?function(e){try{return e.selectionStart!=e.selectionEnd}catch(e){return!1}}:function(e){var r;try{r=e.ownerDocument.selection.createRange()}catch(e){}return!(!r||r.parentElement()!=e)&&0!=r.compareEndPoints("StartToEnd",r)},ze="oncopy"in(_e=A("div"))||(_e.setAttribute("oncopy","return;"),"function"==typeof _e.oncopy),Ne=null,Fe={},Ie={};function We(e,r){arguments.length>2&&(r.dependencies=Array.prototype.slice.call(arguments,2)),Fe[e]=r}function Pe(e){if("string"==typeof e&&Ie.hasOwnProperty(e))e=Ie[e];else if(e&&"string"==typeof e.name&&Ie.hasOwnProperty(e.name)){var r=Ie[e.name];"string"==typeof r&&(r={name:r}),(e=Y(r,e)).name=r.name}else{if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+xml$/.test(e))return Pe("application/xml");if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+json$/.test(e))return Pe("application/json")}return"string"==typeof e?{name:e}:e||{name:"null"}}function Ke(e,r){r=Pe(r);var t=Fe[r.name];if(!t)return Ke(e,"text/plain");var o=t(e,r);if(Ue.hasOwnProperty(r.name)){var n=Ue[r.name];for(var i in n)n.hasOwnProperty(i)&&(o.hasOwnProperty(i)&&(o["_"+i]=o[i]),o[i]=n[i])}if(o.name=r.name,r.helperType&&(o.helperType=r.helperType),r.modeProps)for(var a in r.modeProps)o[a]=r.modeProps[a];return o}var Ue={};function Be(e,r){W(r,Ue.hasOwnProperty(e)?Ue[e]:Ue[e]={})}function De(e,r){if(!0===r)return r;if(e.copyState)return e.copyState(r);var t={};for(var o in r){var n=r[o];n instanceof Array&&(n=n.concat([])),t[o]=n}return t}function je(e,r){for(var t;e.innerMode&&(t=e.innerMode(r))&&t.mode!=e;)r=t.state,e=t.mode;return t||{mode:e,state:r}}function He(e,r,t){return!e.startState||e.startState(r,t)}var Ve=function(e,r,t){this.pos=this.start=0,this.string=e,this.tabSize=r||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0,this.lineOracle=t};function Ze(e,r){if((r-=e.first)<0||r>=e.size)throw Error("There is no line "+(r+e.first)+" in the document.");for(var t=e;!t.lines;)for(var o=0;;++o){var n=t.children[o],i=n.chunkSize();if(r<i){t=n;break}r-=i}return t.lines[r]}function Je(e,r,t){var o=[],n=r.line;return e.iter(r.line,t.line+1,(function(e){var i=e.text;n==t.line&&(i=i.slice(0,t.ch)),n==r.line&&(i=i.slice(r.ch)),o.push(i),++n})),o}function qe(e,r,t){var o=[];return e.iter(r,t,(function(e){o.push(e.text)})),o}function Ge(e,r){var t=r-e.height;if(t)for(var o=e;o;o=o.parent)o.height+=t}function Qe(e){if(null==e.parent)return null;for(var r=e.parent,t=U(r.lines,e),o=r.parent;o;r=o,o=o.parent)for(var n=0;o.children[n]!=r;++n)t+=o.children[n].chunkSize();return t+r.first}function Ye(e,r){var t=e.first;e:do{for(var o=0;o<e.children.length;++o){var n=e.children[o],i=n.height;if(r<i){e=n;continue e}r-=i,t+=n.chunkSize()}return t}while(!e.lines);for(var a=0;a<e.lines.length;++a){var l=e.lines[a].height;if(r<l)break;r-=l}return t+a}function Xe(e,r){return r>=e.first&&r<e.first+e.size}function $e(e,r){return e.lineNumberFormatter(r+e.firstLineNumber)+""}function er(e,r,t){if(void 0===t&&(t=null),!(this instanceof er))return new er(e,r,t);this.line=e,this.ch=r,this.sticky=t}function rr(e,r){return e.line-r.line||e.ch-r.ch}function tr(e,r){return e.sticky==r.sticky&&0==rr(e,r)}function or(e){return er(e.line,e.ch)}function nr(e,r){return rr(e,r)<0?r:e}function ir(e,r){return rr(e,r)<0?e:r}function ar(e,r){return Math.max(e.first,Math.min(r,e.first+e.size-1))}function lr(e,r){if(r.line<e.first)return er(e.first,0);var t=e.first+e.size-1;return r.line>t?er(t,Ze(e,t).text.length):function(e,r){var t=e.ch;return null==t||t>r?er(e.line,r):t<0?er(e.line,0):e}(r,Ze(e,r.line).text.length)}function cr(e,r){for(var t=[],o=0;o<r.length;o++)t[o]=lr(e,r[o]);return t}Ve.prototype.eol=function(){return this.pos>=this.string.length},Ve.prototype.sol=function(){return this.pos==this.lineStart},Ve.prototype.peek=function(){return this.string.charAt(this.pos)||void 0},Ve.prototype.next=function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},Ve.prototype.eat=function(e){var r=this.string.charAt(this.pos);if("string"==typeof e?r==e:r&&(e.test?e.test(r):e(r)))return++this.pos,r},Ve.prototype.eatWhile=function(e){for(var r=this.pos;this.eat(e););return this.pos>r},Ve.prototype.eatSpace=function(){for(var e=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e},Ve.prototype.skipToEnd=function(){this.pos=this.string.length},Ve.prototype.skipTo=function(e){var r=this.string.indexOf(e,this.pos);if(r>-1)return this.pos=r,!0},Ve.prototype.backUp=function(e){this.pos-=e},Ve.prototype.column=function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=P(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?P(this.string,this.lineStart,this.tabSize):0)},Ve.prototype.indentation=function(){return P(this.string,null,this.tabSize)-(this.lineStart?P(this.string,this.lineStart,this.tabSize):0)},Ve.prototype.match=function(e,r,t){if("string"!=typeof e){var o=this.string.slice(this.pos).match(e);return o&&o.index>0?null:(o&&!1!==r&&(this.pos+=o[0].length),o)}var n=function(e){return t?e.toLowerCase():e};if(n(this.string.substr(this.pos,e.length))==n(e))return!1!==r&&(this.pos+=e.length),!0},Ve.prototype.current=function(){return this.string.slice(this.start,this.pos)},Ve.prototype.hideFirstChars=function(e,r){this.lineStart+=e;try{return r()}finally{this.lineStart-=e}},Ve.prototype.lookAhead=function(e){var r=this.lineOracle;return r&&r.lookAhead(e)},Ve.prototype.baseToken=function(){var e=this.lineOracle;return e&&e.baseToken(this.pos)};var dr=function(e,r){this.state=e,this.lookAhead=r},sr=function(e,r,t,o){this.state=r,this.doc=e,this.line=t,this.maxLookAhead=o||0,this.baseTokens=null,this.baseTokenPos=1};function ur(e,r,t,o){var n=[e.state.modeGen],i={};kr(e,r.text,e.doc.mode,t,(function(e,r){return n.push(e,r)}),i,o);for(var a=t.state,l=function(o){t.baseTokens=n;var l=e.state.overlays[o],c=1,d=0;t.state=!0,kr(e,r.text,l.mode,t,(function(e,r){for(var t=c;d<e;){var o=n[c];o>e&&n.splice(c,1,e,n[c+1],o),c+=2,d=Math.min(e,o)}if(r)if(l.opaque)n.splice(t,c-t,e,"overlay "+r),c=t+2;else for(;t<c;t+=2){var i=n[t+1];n[t+1]=(i?i+" ":"")+"overlay "+r}}),i),t.state=a,t.baseTokens=null,t.baseTokenPos=1},c=0;c<e.state.overlays.length;++c)l(c);return{styles:n,classes:i.bgClass||i.textClass?i:null}}function pr(e,r,t){if(!r.styles||r.styles[0]!=e.state.modeGen){var o=gr(e,Qe(r)),n=r.text.length>e.options.maxHighlightLength&&De(e.doc.mode,o.state),i=ur(e,r,o);n&&(o.state=n),r.stateAfter=o.save(!n),r.styles=i.styles,i.classes?r.styleClasses=i.classes:r.styleClasses&&(r.styleClasses=null),t===e.doc.highlightFrontier&&(e.doc.modeFrontier=Math.max(e.doc.modeFrontier,++e.doc.highlightFrontier))}return r.styles}function gr(e,r,t){var o=e.doc,n=e.display;if(!o.mode.startState)return new sr(o,!0,r);var i=function(e,r,t){for(var o,n,i=e.doc,a=t?-1:r-(e.doc.mode.innerMode?1e3:100),l=r;l>a;--l){if(l<=i.first)return i.first;var c=Ze(i,l-1),d=c.stateAfter;if(d&&(!t||l+(d instanceof dr?d.lookAhead:0)<=i.modeFrontier))return l;var s=P(c.text,null,e.options.tabSize);(null==n||o>s)&&(n=l-1,o=s)}return n}(e,r,t),a=i>o.first&&Ze(o,i-1).stateAfter,l=a?sr.fromSaved(o,a,i):new sr(o,He(o.mode),i);return o.iter(i,r,(function(t){hr(e,t.text,l);var o=l.line;t.stateAfter=o==r-1||o%5==0||o>=n.viewFrom&&o<n.viewTo?l.save():null,l.nextLine()})),t&&(o.modeFrontier=l.line),l}function hr(e,r,t,o){var n=e.doc.mode,i=new Ve(r,e.options.tabSize,t);for(i.start=i.pos=o||0,""==r&&fr(n,t.state);!i.eol();)br(n,i,t.state),i.start=i.pos}function fr(e,r){if(e.blankLine)return e.blankLine(r);if(e.innerMode){var t=je(e,r);return t.mode.blankLine?t.mode.blankLine(t.state):void 0}}function br(e,r,t,o){for(var n=0;n<10;n++){o&&(o[0]=je(e,t).mode);var i=e.token(r,t);if(r.pos>r.start)return i}throw Error("Mode "+e.name+" failed to advance stream.")}sr.prototype.lookAhead=function(e){var r=this.doc.getLine(this.line+e);return null!=r&&e>this.maxLookAhead&&(this.maxLookAhead=e),r},sr.prototype.baseToken=function(e){if(!this.baseTokens)return null;for(;this.baseTokens[this.baseTokenPos]<=e;)this.baseTokenPos+=2;var r=this.baseTokens[this.baseTokenPos+1];return{type:r&&r.replace(/( |^)overlay .*/,""),size:this.baseTokens[this.baseTokenPos]-e}},sr.prototype.nextLine=function(){this.line++,this.maxLookAhead>0&&this.maxLookAhead--},sr.fromSaved=function(e,r,t){return r instanceof dr?new sr(e,De(e.mode,r.state),t,r.lookAhead):new sr(e,De(e.mode,r),t)},sr.prototype.save=function(e){var r=!1!==e?De(this.doc.mode,this.state):this.state;return this.maxLookAhead>0?new dr(r,this.maxLookAhead):r};var mr=function(e,r,t){this.start=e.start,this.end=e.pos,this.string=e.current(),this.type=r||null,this.state=t};function yr(e,r,t,o){var n,i,a=e.doc,l=a.mode,c=Ze(a,(r=lr(a,r)).line),d=gr(e,r.line,t),s=new Ve(c.text,e.options.tabSize,d);for(o&&(i=[]);(o||s.pos<r.ch)&&!s.eol();)s.start=s.pos,n=br(l,s,d.state),o&&i.push(new mr(s,n,De(a.mode,d.state)));return o?i:new mr(s,n,d.state)}function vr(e,r){if(e)for(;;){var t=e.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!t)break;e=e.slice(0,t.index)+e.slice(t.index+t[0].length);var o=t[1]?"bgClass":"textClass";null==r[o]?r[o]=t[2]:RegExp("(?:^|\\s)"+t[2]+"(?:$|\\s)").test(r[o])||(r[o]+=" "+t[2])}return e}function kr(e,r,t,o,n,i,a){var l=t.flattenSpans;null==l&&(l=e.options.flattenSpans);var c,d=0,s=null,u=new Ve(r,e.options.tabSize,o),p=e.options.addModeClass&&[null];for(""==r&&vr(fr(t,o.state),i);!u.eol();){if(u.pos>e.options.maxHighlightLength?(l=!1,a&&hr(e,r,o,u.pos),u.pos=r.length,c=null):c=vr(br(t,u,o.state,p),i),p){var g=p[0].name;g&&(c="m-"+(c?g+" "+c:g))}if(!l||s!=c){for(;d<u.start;)n(d=Math.min(u.start,d+5e3),s);s=c}u.start=u.pos}for(;d<u.pos;){var h=Math.min(u.pos,d+5e3);n(h,s),d=h}}var wr=!1,Cr=!1;function xr(e,r,t){this.marker=e,this.from=r,this.to=t}function Sr(e,r){if(e)for(var t=0;t<e.length;++t){var o=e[t];if(o.marker==r)return o}}function Tr(e,r){for(var t,o=0;o<e.length;++o)e[o]!=r&&(t||(t=[])).push(e[o]);return t}function Lr(e,r){if(r.full)return null;var t=Xe(e,r.from.line)&&Ze(e,r.from.line).markedSpans,o=Xe(e,r.to.line)&&Ze(e,r.to.line).markedSpans;if(!t&&!o)return null;var n=r.from.ch,i=r.to.ch,a=0==rr(r.from,r.to),l=function(e,r,t){var o;if(e)for(var n=0;n<e.length;++n){var i=e[n],a=i.marker;if(null==i.from||(a.inclusiveLeft?i.from<=r:i.from<r)||i.from==r&&"bookmark"==a.type&&(!t||!i.marker.insertLeft)){var l=null==i.to||(a.inclusiveRight?i.to>=r:i.to>r);(o||(o=[])).push(new xr(a,i.from,l?null:i.to))}}return o}(t,n,a),c=function(e,r,t){var o;if(e)for(var n=0;n<e.length;++n){var i=e[n],a=i.marker;if(null==i.to||(a.inclusiveRight?i.to>=r:i.to>r)||i.from==r&&"bookmark"==a.type&&(!t||i.marker.insertLeft)){var l=null==i.from||(a.inclusiveLeft?i.from<=r:i.from<r);(o||(o=[])).push(new xr(a,l?null:i.from-r,null==i.to?null:i.to-r))}}return o}(o,i,a),d=1==r.text.length,s=q(r.text).length+(d?n:0);if(l)for(var u=0;u<l.length;++u){var p=l[u];if(null==p.to){var g=Sr(c,p.marker);g?d&&(p.to=null==g.to?null:g.to+s):p.to=n}}if(c)for(var h=0;h<c.length;++h){var f=c[h];null!=f.to&&(f.to+=s),null==f.from?Sr(l,f.marker)||(f.from=s,d&&(l||(l=[])).push(f)):(f.from+=s,d&&(l||(l=[])).push(f))}l&&(l=Er(l)),c&&c!=l&&(c=Er(c));var b=[l];if(!d){var m,y=r.text.length-2;if(y>0&&l)for(var v=0;v<l.length;++v)null==l[v].to&&(m||(m=[])).push(new xr(l[v].marker,null,null));for(var k=0;k<y;++k)b.push(m);b.push(c)}return b}function Er(e){for(var r=0;r<e.length;++r){var t=e[r];null!=t.from&&t.from==t.to&&!1!==t.marker.clearWhenEmpty&&e.splice(r--,1)}return e.length?e:null}function Or(e){var r=e.markedSpans;if(r){for(var t=0;t<r.length;++t)r[t].marker.detachLine(e);e.markedSpans=null}}function Ar(e,r){if(r){for(var t=0;t<r.length;++t)r[t].marker.attachLine(e);e.markedSpans=r}}function _r(e){return e.inclusiveLeft?-1:0}function Mr(e){return e.inclusiveRight?1:0}function Rr(e,r){var t=e.lines.length-r.lines.length;if(0!=t)return t;var o=e.find(),n=r.find(),i=rr(o.from,n.from)||_r(e)-_r(r);return i?-i:rr(o.to,n.to)||Mr(e)-Mr(r)||r.id-e.id}function zr(e,r){var t,o=Cr&&e.markedSpans;if(o)for(var n=void 0,i=0;i<o.length;++i)(n=o[i]).marker.collapsed&&null==(r?n.from:n.to)&&(!t||Rr(t,n.marker)<0)&&(t=n.marker);return t}function Nr(e){return zr(e,!0)}function Fr(e){return zr(e,!1)}function Ir(e,r){var t,o=Cr&&e.markedSpans;if(o)for(var n=0;n<o.length;++n){var i=o[n];i.marker.collapsed&&(null==i.from||i.from<r)&&(null==i.to||i.to>r)&&(!t||Rr(t,i.marker)<0)&&(t=i.marker)}return t}function Wr(e,r,t,o,n){var i=Ze(e,r),a=Cr&&i.markedSpans;if(a)for(var l=0;l<a.length;++l){var c=a[l];if(c.marker.collapsed){var d=c.marker.find(0),s=rr(d.from,t)||_r(c.marker)-_r(n),u=rr(d.to,o)||Mr(c.marker)-Mr(n);if(!(s>=0&&u<=0||s<=0&&u>=0)&&(s<=0&&(c.marker.inclusiveRight&&n.inclusiveLeft?rr(d.to,t)>=0:rr(d.to,t)>0)||s>=0&&(c.marker.inclusiveRight&&n.inclusiveLeft?rr(d.from,o)<=0:rr(d.from,o)<0)))return!0}}}function Pr(e){for(var r;r=Nr(e);)e=r.find(-1,!0).line;return e}function Kr(e,r){var t=Ze(e,r),o=Pr(t);return t==o?r:Qe(o)}function Ur(e,r){if(r>e.lastLine())return r;var t,o=Ze(e,r);if(!Br(e,o))return r;for(;t=Fr(o);)o=t.find(1,!0).line;return Qe(o)+1}function Br(e,r){var t=Cr&&r.markedSpans;if(t)for(var o=void 0,n=0;n<t.length;++n)if((o=t[n]).marker.collapsed){if(null==o.from)return!0;if(!o.marker.widgetNode&&0==o.from&&o.marker.inclusiveLeft&&Dr(e,r,o))return!0}}function Dr(e,r,t){if(null==t.to){var o=t.marker.find(1,!0);return Dr(e,o.line,Sr(o.line.markedSpans,t.marker))}if(t.marker.inclusiveRight&&t.to==r.text.length)return!0;for(var n=void 0,i=0;i<r.markedSpans.length;++i)if((n=r.markedSpans[i]).marker.collapsed&&!n.marker.widgetNode&&n.from==t.to&&(null==n.to||n.to!=t.from)&&(n.marker.inclusiveLeft||t.marker.inclusiveRight)&&Dr(e,r,n))return!0}function jr(e){for(var r=0,t=(e=Pr(e)).parent,o=0;o<t.lines.length;++o){var n=t.lines[o];if(n==e)break;r+=n.height}for(var i=t.parent;i;i=(t=i).parent)for(var a=0;a<i.children.length;++a){var l=i.children[a];if(l==t)break;r+=l.height}return r}function Hr(e){if(0==e.height)return 0;for(var r,t=e.text.length,o=e;r=Nr(o);){var n=r.find(0,!0);o=n.from.line,t+=n.from.ch-n.to.ch}for(o=e;r=Fr(o);){var i=r.find(0,!0);t-=o.text.length-i.from.ch,t+=(o=i.to.line).text.length-i.to.ch}return t}function Vr(e){var r=e.display,t=e.doc;r.maxLine=Ze(t,t.first),r.maxLineLength=Hr(r.maxLine),r.maxLineChanged=!0,t.iter((function(e){var t=Hr(e);t>r.maxLineLength&&(r.maxLineLength=t,r.maxLine=e)}))}var Zr=function(e,r,t){this.text=e,Ar(this,r),this.height=t?t(this):1};function Jr(e){e.parent=null,Or(e)}Zr.prototype.lineNo=function(){return Qe(this)},ye(Zr);var qr={},Gr={};function Qr(e,r){if(!e||/^\s*$/.test(e))return null;var t=r.addModeClass?Gr:qr;return t[e]||(t[e]=e.replace(/\S+/g,"cm-$&"))}function Yr(e,r){var t=_("span",null,null,c?"padding-right: .1px":null),o={pre:_("pre",[t],"CodeMirror-line"),content:t,col:0,pos:0,cm:e,trailingSpace:!1,splitSpaces:e.getOption("lineWrapping")};r.measure={};for(var n=0;n<=(r.rest?r.rest.length:0);n++){var i=n?r.rest[n-1]:r.line,a=void 0;o.pos=0,o.addToken=$r,Ae(e.display.measure)&&(a=de(i,e.doc.direction))&&(o.addToken=et(o.addToken,a)),o.map=[],tt(i,o,pr(e,i,r!=e.display.externalMeasured&&Qe(i))),i.styleClasses&&(i.styleClasses.bgClass&&(o.bgClass=N(i.styleClasses.bgClass,o.bgClass||"")),i.styleClasses.textClass&&(o.textClass=N(i.styleClasses.textClass,o.textClass||""))),0==o.map.length&&o.map.push(0,0,o.content.appendChild(Oe(e.display.measure))),0==n?(r.measure.map=o.map,r.measure.cache={}):((r.measure.maps||(r.measure.maps=[])).push(o.map),(r.measure.caches||(r.measure.caches=[])).push({}))}if(c){var l=o.content.lastChild;(/\bcm-tab\b/.test(l.className)||l.querySelector&&l.querySelector(".cm-tab"))&&(o.content.className="cm-tab-wrap-hack")}return he(e,"renderLine",e,r.line,o.pre),o.pre.className&&(o.textClass=N(o.pre.className,o.textClass||"")),o}function Xr(e){var r=A("span","•","cm-invalidchar");return r.title="\\u"+e.charCodeAt(0).toString(16),r.setAttribute("aria-label",r.title),r}function $r(e,r,t,o,n,i,c){if(r){var d,s=e.splitSpaces?function(e,r){if(e.length>1&&!/  /.test(e))return e;for(var t=r,o="",n=0;n<e.length;n++){var i=e.charAt(n);" "!=i||!t||n!=e.length-1&&32!=e.charCodeAt(n+1)||(i=" "),o+=i,t=" "==i}return o}(r,e.trailingSpace):r,u=e.cm.state.specialChars,p=!1;if(u.test(r)){d=document.createDocumentFragment();for(var g=0;;){u.lastIndex=g;var h=u.exec(r),f=h?h.index-g:r.length-g;if(f){var b=document.createTextNode(s.slice(g,g+f));a&&l<9?d.appendChild(A("span",[b])):d.appendChild(b),e.map.push(e.pos,e.pos+f,b),e.col+=f,e.pos+=f}if(!h)break;g+=f+1;var m=void 0;if("\t"==h[0]){var y=e.cm.options.tabSize,v=y-e.col%y;(m=d.appendChild(A("span",J(v),"cm-tab"))).setAttribute("role","presentation"),m.setAttribute("cm-text","\t"),e.col+=v}else"\r"==h[0]||"\n"==h[0]?((m=d.appendChild(A("span","\r"==h[0]?"␍":"␤","cm-invalidchar"))).setAttribute("cm-text",h[0]),e.col+=1):((m=e.cm.options.specialCharPlaceholder(h[0])).setAttribute("cm-text",h[0]),a&&l<9?d.appendChild(A("span",[m])):d.appendChild(m),e.col+=1);e.map.push(e.pos,e.pos+1,m),e.pos++}}else e.col+=r.length,d=document.createTextNode(s),e.map.push(e.pos,e.pos+r.length,d),a&&l<9&&(p=!0),e.pos+=r.length;if(e.trailingSpace=32==s.charCodeAt(r.length-1),t||o||n||p||i||c){var k=t||"";o&&(k+=o),n&&(k+=n);var w=A("span",[d],k,i);if(c)for(var C in c)c.hasOwnProperty(C)&&"style"!=C&&"class"!=C&&w.setAttribute(C,c[C]);return e.content.appendChild(w)}e.content.appendChild(d)}}function et(e,r){return function(t,o,n,i,a,l,c){n=n?n+" cm-force-border":"cm-force-border";for(var d=t.pos,s=d+o.length;;){for(var u=void 0,p=0;p<r.length&&!((u=r[p]).to>d&&u.from<=d);p++);if(u.to>=s)return e(t,o,n,i,a,l,c);e(t,o.slice(0,u.to-d),n,i,null,l,c),i=null,o=o.slice(u.to-d),d=u.to}}}function rt(e,r,t,o){var n=!o&&t.widgetNode;n&&e.map.push(e.pos,e.pos+r,n),!o&&e.cm.display.input.needsContentAttribute&&(n||(n=e.content.appendChild(document.createElement("span"))),n.setAttribute("cm-marker",t.id)),n&&(e.cm.display.input.setUneditable(n),e.content.appendChild(n)),e.pos+=r,e.trailingSpace=!1}function tt(e,r,t){var o=e.markedSpans,n=e.text,i=0;if(o)for(var a,l,c,d,s,u,p,g=n.length,h=0,f=1,b="",m=0;;){if(m==h){c=d=s=l="",p=null,u=null,m=1/0;for(var y=[],v=void 0,k=0;k<o.length;++k){var w=o[k],C=w.marker;if("bookmark"==C.type&&w.from==h&&C.widgetNode)y.push(C);else if(w.from<=h&&(null==w.to||w.to>h||C.collapsed&&w.to==h&&w.from==h)){if(null!=w.to&&w.to!=h&&m>w.to&&(m=w.to,d=""),C.className&&(c+=" "+C.className),C.css&&(l=(l?l+";":"")+C.css),C.startStyle&&w.from==h&&(s+=" "+C.startStyle),C.endStyle&&w.to==m&&(v||(v=[])).push(C.endStyle,w.to),C.title&&((p||(p={})).title=C.title),C.attributes)for(var x in C.attributes)(p||(p={}))[x]=C.attributes[x];C.collapsed&&(!u||Rr(u.marker,C)<0)&&(u=w)}else w.from>h&&m>w.from&&(m=w.from)}if(v)for(var S=0;S<v.length;S+=2)v[S+1]==m&&(d+=" "+v[S]);if(!u||u.from==h)for(var T=0;T<y.length;++T)rt(r,0,y[T]);if(u&&(u.from||0)==h){if(rt(r,(null==u.to?g+1:u.to)-h,u.marker,null==u.from),null==u.to)return;u.to==h&&(u=!1)}}if(h>=g)break;for(var L=Math.min(g,m);;){if(b){var E=h+b.length;if(!u){var O=E>L?b.slice(0,L-h):b;r.addToken(r,O,a?a+c:c,s,h+O.length==m?d:"",l,p)}if(E>=L){b=b.slice(L-h),h=L;break}h=E,s=""}b=n.slice(i,i=t[f++]),a=Qr(t[f++],r.cm.options)}}else for(var A=1;A<t.length;A+=2)r.addToken(r,n.slice(i,i=t[A]),Qr(t[A+1],r.cm.options))}function ot(e,r,t){this.line=r,this.rest=function(e){for(var r,t;r=Fr(e);)e=r.find(1,!0).line,(t||(t=[])).push(e);return t}(r),this.size=this.rest?Qe(q(this.rest))-t+1:1,this.node=this.text=null,this.hidden=Br(e,r)}function nt(e,r,t){for(var o,n=[],i=r;i<t;i=o){var a=new ot(e.doc,Ze(e.doc,i),i);o=i+a.size,n.push(a)}return n}var it=null,at=null;function lt(e,r){var t=pe(e,r);if(t.length){var o,n=Array.prototype.slice.call(arguments,2);it?o=it.delayedCallbacks:at?o=at:(o=at=[],setTimeout(ct,0));for(var i=function(e){o.push((function(){return t[e].apply(null,n)}))},a=0;a<t.length;++a)i(a)}}function ct(){var e=at;at=null;for(var r=0;r<e.length;++r)e[r]()}function dt(e,r,t,o){for(var n=0;n<r.changes.length;n++){var i=r.changes[n];"text"==i?pt(e,r):"gutter"==i?ht(e,r,t,o):"class"==i?gt(e,r):"widget"==i&&ft(e,r,o)}r.changes=null}function st(e){return e.node==e.text&&(e.node=A("div",null,null,"position: relative"),e.text.parentNode&&e.text.parentNode.replaceChild(e.node,e.text),e.node.appendChild(e.text),a&&l<8&&(e.node.style.zIndex=2)),e.node}function ut(e,r){var t=e.display.externalMeasured;return t&&t.line==r.line?(e.display.externalMeasured=null,r.measure=t.measure,t.built):Yr(e,r)}function pt(e,r){var t=r.text.className,o=ut(e,r);r.text==r.node&&(r.node=o.pre),r.text.parentNode.replaceChild(o.pre,r.text),r.text=o.pre,o.bgClass!=r.bgClass||o.textClass!=r.textClass?(r.bgClass=o.bgClass,r.textClass=o.textClass,gt(e,r)):t&&(r.text.className=t)}function gt(e,r){!function(e,r){var t=r.bgClass?r.bgClass+" "+(r.line.bgClass||""):r.line.bgClass;if(t&&(t+=" CodeMirror-linebackground"),r.background)t?r.background.className=t:(r.background.parentNode.removeChild(r.background),r.background=null);else if(t){var o=st(r);r.background=o.insertBefore(A("div",null,t),o.firstChild),e.display.input.setUneditable(r.background)}}(e,r),r.line.wrapClass?st(r).className=r.line.wrapClass:r.node!=r.text&&(r.node.className="");var t=r.textClass?r.textClass+" "+(r.line.textClass||""):r.line.textClass;r.text.className=t||""}function ht(e,r,t,o){if(r.gutter&&(r.node.removeChild(r.gutter),r.gutter=null),r.gutterBackground&&(r.node.removeChild(r.gutterBackground),r.gutterBackground=null),r.line.gutterClass){var n=st(r);r.gutterBackground=A("div",null,"CodeMirror-gutter-background "+r.line.gutterClass,"left: "+(e.options.fixedGutter?o.fixedPos:-o.gutterTotalWidth)+"px; width: "+o.gutterTotalWidth+"px"),e.display.input.setUneditable(r.gutterBackground),n.insertBefore(r.gutterBackground,r.text)}var i=r.line.gutterMarkers;if(e.options.lineNumbers||i){var a=st(r),l=r.gutter=A("div",null,"CodeMirror-gutter-wrapper","left: "+(e.options.fixedGutter?o.fixedPos:-o.gutterTotalWidth)+"px");if(e.display.input.setUneditable(l),a.insertBefore(l,r.text),r.line.gutterClass&&(l.className+=" "+r.line.gutterClass),!e.options.lineNumbers||i&&i["CodeMirror-linenumbers"]||(r.lineNumber=l.appendChild(A("div",$e(e.options,t),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+o.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+e.display.lineNumInnerWidth+"px"))),i)for(var c=0;c<e.display.gutterSpecs.length;++c){var d=e.display.gutterSpecs[c].className,s=i.hasOwnProperty(d)&&i[d];s&&l.appendChild(A("div",[s],"CodeMirror-gutter-elt","left: "+o.gutterLeft[d]+"px; width: "+o.gutterWidth[d]+"px"))}}}function ft(e,r,t){r.alignable&&(r.alignable=null);for(var o=S("CodeMirror-linewidget"),n=r.node.firstChild,i=void 0;n;n=i)i=n.nextSibling,o.test(n.className)&&r.node.removeChild(n);mt(e,r,t)}function bt(e,r,t,o){var n=ut(e,r);return r.text=r.node=n.pre,n.bgClass&&(r.bgClass=n.bgClass),n.textClass&&(r.textClass=n.textClass),gt(e,r),ht(e,r,t,o),mt(e,r,o),r.node}function mt(e,r,t){if(yt(e,r.line,r,t,!0),r.rest)for(var o=0;o<r.rest.length;o++)yt(e,r.rest[o],r,t,!1)}function yt(e,r,t,o,n){if(r.widgets)for(var i=st(t),a=0,l=r.widgets;a<l.length;++a){var c=l[a],d=A("div",[c.node],"CodeMirror-linewidget"+(c.className?" "+c.className:""));c.handleMouseEvents||d.setAttribute("cm-ignore-events","true"),vt(c,d,t,o),e.display.input.setUneditable(d),n&&c.above?i.insertBefore(d,t.gutter||t.text):i.appendChild(d),lt(c,"redraw")}}function vt(e,r,t,o){if(e.noHScroll){(t.alignable||(t.alignable=[])).push(r);var n=o.wrapperWidth;r.style.left=o.fixedPos+"px",e.coverGutter||(n-=o.gutterTotalWidth,r.style.paddingLeft=o.gutterTotalWidth+"px"),r.style.width=n+"px"}e.coverGutter&&(r.style.zIndex=5,r.style.position="relative",e.noHScroll||(r.style.marginLeft=-o.gutterTotalWidth+"px"))}function kt(e){if(null!=e.height)return e.height;var r=e.doc.cm;if(!r)return 0;if(!M(document.body,e.node)){var t="position: relative;";e.coverGutter&&(t+="margin-left: -"+r.display.gutters.offsetWidth+"px;"),e.noHScroll&&(t+="width: "+r.display.wrapper.clientWidth+"px;"),O(r.display.measure,A("div",[e.node],null,t))}return e.height=e.node.parentNode.offsetHeight}function wt(e,r){for(var t=xe(r);t!=e.wrapper;t=t.parentNode)if(!t||1==t.nodeType&&"true"==t.getAttribute("cm-ignore-events")||t.parentNode==e.sizer&&t!=e.mover)return!0}function Ct(e){return e.lineSpace.offsetTop}function xt(e){return e.mover.offsetHeight-e.lineSpace.offsetHeight}function St(e){if(e.cachedPaddingH)return e.cachedPaddingH;var r=O(e.measure,A("pre","x","CodeMirror-line-like")),t=window.getComputedStyle?window.getComputedStyle(r):r.currentStyle,o={left:parseInt(t.paddingLeft),right:parseInt(t.paddingRight)};return isNaN(o.left)||isNaN(o.right)||(e.cachedPaddingH=o),o}function Tt(e){return 50-e.display.nativeBarWidth}function Lt(e){return e.display.scroller.clientWidth-Tt(e)-e.display.barWidth}function Et(e){return e.display.scroller.clientHeight-Tt(e)-e.display.barHeight}function Ot(e,r,t){if(e.line==r)return{map:e.measure.map,cache:e.measure.cache};for(var o=0;o<e.rest.length;o++)if(e.rest[o]==r)return{map:e.measure.maps[o],cache:e.measure.caches[o]};for(var n=0;n<e.rest.length;n++)if(Qe(e.rest[n])>t)return{map:e.measure.maps[n],cache:e.measure.caches[n],before:!0}}function At(e,r,t,o){return Rt(e,Mt(e,r),t,o)}function _t(e,r){if(r>=e.display.viewFrom&&r<e.display.viewTo)return e.display.view[so(e,r)];var t=e.display.externalMeasured;return t&&r>=t.lineN&&r<t.lineN+t.size?t:void 0}function Mt(e,r){var t=Qe(r),o=_t(e,t);o&&!o.text?o=null:o&&o.changes&&(dt(e,o,t,no(e)),e.curOp.forceUpdate=!0),o||(o=function(e,r){var t=Qe(r=Pr(r)),o=e.display.externalMeasured=new ot(e.doc,r,t);o.lineN=t;var n=o.built=Yr(e,o);return o.text=n.pre,O(e.display.lineMeasure,n.pre),o}(e,r));var n=Ot(o,r,t);return{line:r,view:o,rect:null,map:n.map,cache:n.cache,before:n.before,hasHeights:!1}}function Rt(e,r,t,o,n){r.before&&(t=-1);var i,c=t+(o||"");return r.cache.hasOwnProperty(c)?i=r.cache[c]:(r.rect||(r.rect=r.view.text.getBoundingClientRect()),r.hasHeights||(function(e,r,t){var o=e.options.lineWrapping,n=o&&Lt(e);if(!r.measure.heights||o&&r.measure.width!=n){var i=r.measure.heights=[];if(o){r.measure.width=n;for(var a=r.text.firstChild.getClientRects(),l=0;l<a.length-1;l++){var c=a[l],d=a[l+1];Math.abs(c.bottom-d.bottom)>2&&i.push((c.bottom+d.top)/2-t.top)}}i.push(t.bottom-t.top)}}(e,r.view,r.rect),r.hasHeights=!0),(i=function(e,r,t,o){var n,i=Ft(r.map,t,o),c=i.node,d=i.start,s=i.end,u=i.collapse;if(3==c.nodeType){for(var p=0;p<4;p++){for(;d&&oe(r.line.text.charAt(i.coverStart+d));)--d;for(;i.coverStart+s<i.coverEnd&&oe(r.line.text.charAt(i.coverStart+s));)++s;if((n=a&&l<9&&0==d&&s==i.coverEnd-i.coverStart?c.parentNode.getBoundingClientRect():It(T(c,d,s).getClientRects(),o)).left||n.right||0==d)break;s=d,d-=1,u="right"}a&&l<11&&(n=function(e,r){if(!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!function(e){if(null!=Ne)return Ne;var r=O(e,A("span","x")),t=r.getBoundingClientRect(),o=T(r,0,1).getBoundingClientRect();return Ne=Math.abs(t.left-o.left)>1}(e))return r;var t=screen.logicalXDPI/screen.deviceXDPI,o=screen.logicalYDPI/screen.deviceYDPI;return{left:r.left*t,right:r.right*t,top:r.top*o,bottom:r.bottom*o}}(e.display.measure,n))}else{var g;d>0&&(u=o="right"),n=e.options.lineWrapping&&(g=c.getClientRects()).length>1?g["right"==o?g.length-1:0]:c.getBoundingClientRect()}if(a&&l<9&&!d&&(!n||!n.left&&!n.right)){var h=c.parentNode.getClientRects()[0];n=h?{left:h.left,right:h.left+oo(e.display),top:h.top,bottom:h.bottom}:Nt}for(var f=n.top-r.rect.top,b=n.bottom-r.rect.top,m=(f+b)/2,y=r.view.measure.heights,v=0;v<y.length-1&&!(m<y[v]);v++);var k=v?y[v-1]:0,w=y[v],C={left:("right"==u?n.right:n.left)-r.rect.left,right:("left"==u?n.left:n.right)-r.rect.left,top:k,bottom:w};return n.left||n.right||(C.bogus=!0),e.options.singleCursorHeightPerLine||(C.rtop=f,C.rbottom=b),C}(e,r,t,o)).bogus||(r.cache[c]=i)),{left:i.left,right:i.right,top:n?i.rtop:i.top,bottom:n?i.rbottom:i.bottom}}var zt,Nt={left:0,right:0,top:0,bottom:0};function Ft(e,r,t){for(var o,n,i,a,l,c,d=0;d<e.length;d+=3)if(l=e[d],c=e[d+1],r<l?(n=0,i=1,a="left"):r<c?i=1+(n=r-l):(d==e.length-3||r==c&&e[d+3]>r)&&(n=(i=c-l)-1,r>=c&&(a="right")),null!=n){if(o=e[d+2],l==c&&t==(o.insertLeft?"left":"right")&&(a=t),"left"==t&&0==n)for(;d&&e[d-2]==e[d-3]&&e[d-1].insertLeft;)o=e[2+(d-=3)],a="left";if("right"==t&&n==c-l)for(;d<e.length-3&&e[d+3]==e[d+4]&&!e[d+5].insertLeft;)o=e[(d+=3)+2],a="right";break}return{node:o,start:n,end:i,collapse:a,coverStart:l,coverEnd:c}}function It(e,r){var t=Nt;if("left"==r)for(var o=0;o<e.length&&(t=e[o]).left==t.right;o++);else for(var n=e.length-1;n>=0&&(t=e[n]).left==t.right;n--);return t}function Wt(e){if(e.measure&&(e.measure.cache={},e.measure.heights=null,e.rest))for(var r=0;r<e.rest.length;r++)e.measure.caches[r]={}}function Pt(e){e.display.externalMeasure=null,E(e.display.lineMeasure);for(var r=0;r<e.display.view.length;r++)Wt(e.display.view[r])}function Kt(e){Pt(e),e.display.cachedCharWidth=e.display.cachedTextHeight=e.display.cachedPaddingH=null,e.options.lineWrapping||(e.display.maxLineChanged=!0),e.display.lineNumChars=null}function Ut(){return s&&b?-(document.body.getBoundingClientRect().left-parseInt(getComputedStyle(document.body).marginLeft)):window.pageXOffset||(document.documentElement||document.body).scrollLeft}function Bt(){return s&&b?-(document.body.getBoundingClientRect().top-parseInt(getComputedStyle(document.body).marginTop)):window.pageYOffset||(document.documentElement||document.body).scrollTop}function Dt(e){var r=0;if(e.widgets)for(var t=0;t<e.widgets.length;++t)e.widgets[t].above&&(r+=kt(e.widgets[t]));return r}function jt(e,r,t,o,n){if(!n){var i=Dt(r);t.top+=i,t.bottom+=i}if("line"==o)return t;o||(o="local");var a=jr(r);if("local"==o?a+=Ct(e.display):a-=e.display.viewOffset,"page"==o||"window"==o){var l=e.display.lineSpace.getBoundingClientRect();a+=l.top+("window"==o?0:Bt());var c=l.left+("window"==o?0:Ut());t.left+=c,t.right+=c}return t.top+=a,t.bottom+=a,t}function Ht(e,r,t){if("div"==t)return r;var o=r.left,n=r.top;if("page"==t)o-=Ut(),n-=Bt();else if("local"==t||!t){var i=e.display.sizer.getBoundingClientRect();o+=i.left,n+=i.top}var a=e.display.lineSpace.getBoundingClientRect();return{left:o-a.left,top:n-a.top}}function Vt(e,r,t,o,n){return o||(o=Ze(e.doc,r.line)),jt(e,o,At(e,o,r.ch,n),t)}function Zt(e,r,t,o,n,i){function a(r,a){var l=Rt(e,n,r,a?"right":"left",i);return a?l.left=l.right:l.right=l.left,jt(e,o,l,t)}o=o||Ze(e.doc,r.line),n||(n=Mt(e,o));var l=de(o,e.doc.direction),c=r.ch,d=r.sticky;if(c>=o.text.length?(c=o.text.length,d="before"):c<=0&&(c=0,d="after"),!l)return a("before"==d?c-1:c,"before"==d);function s(e,r,t){return a(t?e-1:e,1==l[r].level!=t)}var u=le(l,c,d),p=ae,g=s(c,u,"before"==d);return null!=p&&(g.other=s(c,p,"before"!=d)),g}function Jt(e,r){var t=0;r=lr(e.doc,r),e.options.lineWrapping||(t=oo(e.display)*r.ch);var o=Ze(e.doc,r.line),n=jr(o)+Ct(e.display);return{left:t,right:t,top:n,bottom:n+o.height}}function qt(e,r,t,o,n){var i=er(e,r,t);return i.xRel=n,o&&(i.outside=o),i}function Gt(e,r,t){var o=e.doc;if((t+=e.display.viewOffset)<0)return qt(o.first,0,null,-1,-1);var n=Ye(o,t),i=o.first+o.size-1;if(n>i)return qt(o.first+o.size-1,Ze(o,i).text.length,null,1,1);r<0&&(r=0);for(var a=Ze(o,n);;){var l=$t(e,a,n,r,t),c=Ir(a,l.ch+(l.xRel>0||l.outside>0?1:0));if(!c)return l;var d=c.find(1);if(d.line==n)return d;a=Ze(o,n=d.line)}}function Qt(e,r,t,o){o-=Dt(r);var n=r.text.length,i=ie((function(r){return Rt(e,t,r-1).bottom<=o}),n,0);return{begin:i,end:n=ie((function(r){return Rt(e,t,r).top>o}),i,n)}}function Yt(e,r,t,o){return t||(t=Mt(e,r)),Qt(e,r,t,jt(e,r,Rt(e,t,o),"line").top)}function Xt(e,r,t,o){return!(e.bottom<=t)&&(e.top>t||(o?e.left:e.right)>r)}function $t(e,r,t,o,n){n-=jr(r);var i=Mt(e,r),a=Dt(r),l=0,c=r.text.length,d=!0,s=de(r,e.doc.direction);if(s){var u=(e.options.lineWrapping?ro:eo)(e,r,t,i,s,o,n);l=(d=1!=u.level)?u.from:u.to-1,c=d?u.to:u.from-1}var p,g,h=null,f=null,b=ie((function(r){var t=Rt(e,i,r);return t.top+=a,t.bottom+=a,!!Xt(t,o,n,!1)&&(t.top<=n&&t.left<=o&&(h=r,f=t),!0)}),l,c),m=!1;if(f){var y=o-f.left<f.right-o,v=y==d;b=h+(v?0:1),g=v?"after":"before",p=y?f.left:f.right}else{d||b!=c&&b!=l||b++,g=0==b?"after":b==r.text.length?"before":Rt(e,i,b-(d?1:0)).bottom+a<=n==d?"after":"before";var k=Zt(e,er(t,b,g),"line",r,i);p=k.left,m=n<k.top?-1:n>=k.bottom?1:0}return qt(t,b=ne(r.text,b,1),g,m,o-p)}function eo(e,r,t,o,n,i,a){var l=ie((function(l){var c=n[l],d=1!=c.level;return Xt(Zt(e,er(t,d?c.to:c.from,d?"before":"after"),"line",r,o),i,a,!0)}),0,n.length-1),c=n[l];if(l>0){var d=1!=c.level,s=Zt(e,er(t,d?c.from:c.to,d?"after":"before"),"line",r,o);Xt(s,i,a,!0)&&s.top>a&&(c=n[l-1])}return c}function ro(e,r,t,o,n,i,a){var l=Qt(e,r,o,a),c=l.begin,d=l.end;/\s/.test(r.text.charAt(d-1))&&d--;for(var s=null,u=null,p=0;p<n.length;p++){var g=n[p];if(!(g.from>=d||g.to<=c)){var h=Rt(e,o,1!=g.level?Math.min(d,g.to)-1:Math.max(c,g.from)).right,f=h<i?i-h+1e9:h-i;(!s||u>f)&&(s=g,u=f)}}return s||(s=n[n.length-1]),s.from<c&&(s={from:c,to:s.to,level:s.level}),s.to>d&&(s={from:s.from,to:d,level:s.level}),s}function to(e){if(null!=e.cachedTextHeight)return e.cachedTextHeight;if(null==zt){zt=A("pre",null,"CodeMirror-line-like");for(var r=0;r<49;++r)zt.appendChild(document.createTextNode("x")),zt.appendChild(A("br"));zt.appendChild(document.createTextNode("x"))}O(e.measure,zt);var t=zt.offsetHeight/50;return t>3&&(e.cachedTextHeight=t),E(e.measure),t||1}function oo(e){if(null!=e.cachedCharWidth)return e.cachedCharWidth;var r=A("span","xxxxxxxxxx"),t=A("pre",[r],"CodeMirror-line-like");O(e.measure,t);var o=r.getBoundingClientRect(),n=(o.right-o.left)/10;return n>2&&(e.cachedCharWidth=n),n||10}function no(e){for(var r=e.display,t={},o={},n=r.gutters.clientLeft,i=r.gutters.firstChild,a=0;i;i=i.nextSibling,++a){var l=e.display.gutterSpecs[a].className;t[l]=i.offsetLeft+i.clientLeft+n,o[l]=i.clientWidth}return{fixedPos:io(r),gutterTotalWidth:r.gutters.offsetWidth,gutterLeft:t,gutterWidth:o,wrapperWidth:r.wrapper.clientWidth}}function io(e){return e.scroller.getBoundingClientRect().left-e.sizer.getBoundingClientRect().left}function ao(e){var r=to(e.display),t=e.options.lineWrapping,o=t&&Math.max(5,e.display.scroller.clientWidth/oo(e.display)-3);return function(n){if(Br(e.doc,n))return 0;var i=0;if(n.widgets)for(var a=0;a<n.widgets.length;a++)n.widgets[a].height&&(i+=n.widgets[a].height);return t?i+(Math.ceil(n.text.length/o)||1)*r:i+r}}function lo(e){var r=e.doc,t=ao(e);r.iter((function(e){var r=t(e);r!=e.height&&Ge(e,r)}))}function co(e,r,t,o){var n=e.display;if(!t&&"true"==xe(r).getAttribute("cm-not-content"))return null;var i,a,l=n.lineSpace.getBoundingClientRect();try{i=r.clientX-l.left,a=r.clientY-l.top}catch(e){return null}var c,d=Gt(e,i,a);if(o&&d.xRel>0&&(c=Ze(e.doc,d.line).text).length==d.ch){var s=P(c,c.length,e.options.tabSize)-c.length;d=er(d.line,Math.max(0,Math.round((i-St(e.display).left)/oo(e.display))-s))}return d}function so(e,r){if(r>=e.display.viewTo)return null;if((r-=e.display.viewFrom)<0)return null;for(var t=e.display.view,o=0;o<t.length;o++)if((r-=t[o].size)<0)return o}function uo(e,r,t,o){null==r&&(r=e.doc.first),null==t&&(t=e.doc.first+e.doc.size),o||(o=0);var n=e.display;if(o&&t<n.viewTo&&(null==n.updateLineNumbers||n.updateLineNumbers>r)&&(n.updateLineNumbers=r),e.curOp.viewChanged=!0,r>=n.viewTo)Cr&&Kr(e.doc,r)<n.viewTo&&go(e);else if(t<=n.viewFrom)Cr&&Ur(e.doc,t+o)>n.viewFrom?go(e):(n.viewFrom+=o,n.viewTo+=o);else if(r<=n.viewFrom&&t>=n.viewTo)go(e);else if(r<=n.viewFrom){var i=ho(e,t,t+o,1);i?(n.view=n.view.slice(i.index),n.viewFrom=i.lineN,n.viewTo+=o):go(e)}else if(t>=n.viewTo){var a=ho(e,r,r,-1);a?(n.view=n.view.slice(0,a.index),n.viewTo=a.lineN):go(e)}else{var l=ho(e,r,r,-1),c=ho(e,t,t+o,1);l&&c?(n.view=n.view.slice(0,l.index).concat(nt(e,l.lineN,c.lineN)).concat(n.view.slice(c.index)),n.viewTo+=o):go(e)}var d=n.externalMeasured;d&&(t<d.lineN?d.lineN+=o:r<d.lineN+d.size&&(n.externalMeasured=null))}function po(e,r,t){e.curOp.viewChanged=!0;var o=e.display,n=e.display.externalMeasured;if(n&&r>=n.lineN&&r<n.lineN+n.size&&(o.externalMeasured=null),!(r<o.viewFrom||r>=o.viewTo)){var i=o.view[so(e,r)];if(null!=i.node){var a=i.changes||(i.changes=[]);-1==U(a,t)&&a.push(t)}}}function go(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0}function ho(e,r,t,o){var n,i=so(e,r),a=e.display.view;if(!Cr||t==e.doc.first+e.doc.size)return{index:i,lineN:t};for(var l=e.display.viewFrom,c=0;c<i;c++)l+=a[c].size;if(l!=r){if(o>0){if(i==a.length-1)return null;n=l+a[i].size-r,i++}else n=l-r;r+=n,t+=n}for(;Kr(e.doc,t)!=t;){if(i==(o<0?0:a.length-1))return null;t+=o*a[i-(o<0?1:0)].size,i+=o}return{index:i,lineN:t}}function fo(e){for(var r=e.display.view,t=0,o=0;o<r.length;o++){var n=r[o];n.hidden||n.node&&!n.changes||++t}return t}function bo(e){e.display.input.showSelection(e.display.input.prepareSelection())}function mo(e,r){void 0===r&&(r=!0);for(var t=e.doc,o={},n=o.cursors=document.createDocumentFragment(),i=o.selection=document.createDocumentFragment(),a=0;a<t.sel.ranges.length;a++)if(r||a!=t.sel.primIndex){var l=t.sel.ranges[a];if(!(l.from().line>=e.display.viewTo||l.to().line<e.display.viewFrom)){var c=l.empty();(c||e.options.showCursorWhenSelecting)&&yo(e,l.head,n),c||ko(e,l,i)}}return o}function yo(e,r,t){var o=Zt(e,r,"div",null,null,!e.options.singleCursorHeightPerLine),n=t.appendChild(A("div"," ","CodeMirror-cursor"));if(n.style.left=o.left+"px",n.style.top=o.top+"px",n.style.height=Math.max(0,o.bottom-o.top)*e.options.cursorHeight+"px",o.other){var i=t.appendChild(A("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"));i.style.display="",i.style.left=o.other.left+"px",i.style.top=o.other.top+"px",i.style.height=.85*(o.other.bottom-o.other.top)+"px"}}function vo(e,r){return e.top-r.top||e.left-r.left}function ko(e,r,t){var o=e.display,n=e.doc,i=document.createDocumentFragment(),a=St(e.display),l=a.left,c=Math.max(o.sizerWidth,Lt(e)-o.sizer.offsetLeft)-a.right,d="ltr"==n.direction;function s(e,r,t,o){r<0&&(r=0),r=Math.round(r),o=Math.round(o),i.appendChild(A("div",null,"CodeMirror-selected","position: absolute; left: "+e+"px;\n                             top: "+r+"px; width: "+(null==t?c-e:t)+"px;\n                             height: "+(o-r)+"px"))}function u(r,t,o){var i,a,u=Ze(n,r),p=u.text.length;function g(t,o){return Vt(e,er(r,t),"div",u,o)}function h(r,t,o){var n=Yt(e,u,null,r),i="ltr"==t==("after"==o)?"left":"right";return g("after"==o?n.begin:n.end-(/\s/.test(u.text.charAt(n.end-1))?2:1),i)[i]}var f=de(u,n.direction);return function(e,r,t,o){if(!e)return o(r,t,"ltr",0);for(var n=!1,i=0;i<e.length;++i){var a=e[i];(a.from<t&&a.to>r||r==t&&a.to==r)&&(o(Math.max(a.from,r),Math.min(a.to,t),1==a.level?"rtl":"ltr",i),n=!0)}n||o(r,t,"ltr")}(f,t||0,null==o?p:o,(function(e,r,n,u){var b="ltr"==n,m=g(e,b?"left":"right"),y=g(r-1,b?"right":"left"),v=null==t&&0==e,k=null==o&&r==p,w=0==u,C=!f||u==f.length-1;if(y.top-m.top<=3){var x=(d?k:v)&&C,S=(d?v:k)&&w?l:(b?m:y).left,T=x?c:(b?y:m).right;s(S,m.top,T-S,m.bottom)}else{var L,E,O,A;b?(L=d&&v&&w?l:m.left,E=d?c:h(e,n,"before"),O=d?l:h(r,n,"after"),A=d&&k&&C?c:y.right):(L=d?h(e,n,"before"):l,E=!d&&v&&w?c:m.right,O=!d&&k&&C?l:y.left,A=d?h(r,n,"after"):c),s(L,m.top,E-L,m.bottom),m.bottom<y.top&&s(l,m.bottom,null,y.top),s(O,y.top,A-O,y.bottom)}(!i||vo(m,i)<0)&&(i=m),vo(y,i)<0&&(i=y),(!a||vo(m,a)<0)&&(a=m),vo(y,a)<0&&(a=y)})),{start:i,end:a}}var p=r.from(),g=r.to();if(p.line==g.line)u(p.line,p.ch,g.ch);else{var h=Ze(n,p.line),f=Ze(n,g.line),b=Pr(h)==Pr(f),m=u(p.line,p.ch,b?h.text.length+1:null).end,y=u(g.line,b?0:null,g.ch).start;b&&(m.top<y.top-2?(s(m.right,m.top,null,m.bottom),s(l,y.top,y.left,y.bottom)):s(m.right,m.top,y.left-m.right,m.bottom)),m.bottom<y.top&&s(l,m.bottom,null,y.top)}t.appendChild(i)}function wo(e){if(e.state.focused){var r=e.display;clearInterval(r.blinker);var t=!0;r.cursorDiv.style.visibility="",e.options.cursorBlinkRate>0?r.blinker=setInterval((function(){e.hasFocus()||To(e),r.cursorDiv.style.visibility=(t=!t)?"":"hidden"}),e.options.cursorBlinkRate):e.options.cursorBlinkRate<0&&(r.cursorDiv.style.visibility="hidden")}}function Co(e){e.state.focused||(e.display.input.focus(),So(e))}function xo(e){e.state.delayingBlurEvent=!0,setTimeout((function(){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1,To(e))}),100)}function So(e,r){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1),"nocursor"!=e.options.readOnly&&(e.state.focused||(he(e,"focus",e,r),e.state.focused=!0,z(e.display.wrapper,"CodeMirror-focused"),e.curOp||e.display.selForContextMenu==e.doc.sel||(e.display.input.reset(),c&&setTimeout((function(){return e.display.input.reset(!0)}),20)),e.display.input.receivedFocus()),wo(e))}function To(e,r){e.state.delayingBlurEvent||(e.state.focused&&(he(e,"blur",e,r),e.state.focused=!1,L(e.display.wrapper,"CodeMirror-focused")),clearInterval(e.display.blinker),setTimeout((function(){e.state.focused||(e.display.shift=!1)}),150))}function Lo(e){for(var r=e.display,t=r.lineDiv.offsetTop,o=0;o<r.view.length;o++){var n=r.view[o],i=e.options.lineWrapping,c=void 0,d=0;if(!n.hidden){if(a&&l<8){var s=n.node.offsetTop+n.node.offsetHeight;c=s-t,t=s}else{var u=n.node.getBoundingClientRect();c=u.bottom-u.top,!i&&n.text.firstChild&&(d=n.text.firstChild.getBoundingClientRect().right-u.left-1)}var p=n.line.height-c;if((p>.005||p<-.005)&&(Ge(n.line,c),Eo(n.line),n.rest))for(var g=0;g<n.rest.length;g++)Eo(n.rest[g]);if(d>e.display.sizerWidth){var h=Math.ceil(d/oo(e.display));h>e.display.maxLineLength&&(e.display.maxLineLength=h,e.display.maxLine=n.line,e.display.maxLineChanged=!0)}}}}function Eo(e){if(e.widgets)for(var r=0;r<e.widgets.length;++r){var t=e.widgets[r],o=t.node.parentNode;o&&(t.height=o.offsetHeight)}}function Oo(e,r,t){var o=t&&null!=t.top?Math.max(0,t.top):e.scroller.scrollTop;o=Math.floor(o-Ct(e));var n=t&&null!=t.bottom?t.bottom:o+e.wrapper.clientHeight,i=Ye(r,o),a=Ye(r,n);if(t&&t.ensure){var l=t.ensure.from.line,c=t.ensure.to.line;l<i?(i=l,a=Ye(r,jr(Ze(r,l))+e.wrapper.clientHeight)):Math.min(c,r.lastLine())>=a&&(i=Ye(r,jr(Ze(r,c))-e.wrapper.clientHeight),a=c)}return{from:i,to:Math.max(a,i+1)}}function Ao(e,r){var t=e.display,o=to(e.display);r.top<0&&(r.top=0);var n=e.curOp&&null!=e.curOp.scrollTop?e.curOp.scrollTop:t.scroller.scrollTop,i=Et(e),a={};r.bottom-r.top>i&&(r.bottom=r.top+i);var l=e.doc.height+xt(t),c=r.top<o,d=r.bottom>l-o;if(r.top<n)a.scrollTop=c?0:r.top;else if(r.bottom>n+i){var s=Math.min(r.top,(d?l:r.bottom)-i);s!=n&&(a.scrollTop=s)}var u=e.options.fixedGutter?0:t.gutters.offsetWidth,p=e.curOp&&null!=e.curOp.scrollLeft?e.curOp.scrollLeft:t.scroller.scrollLeft-u,g=Lt(e)-t.gutters.offsetWidth,h=r.right-r.left>g;return h&&(r.right=r.left+g),r.left<10?a.scrollLeft=0:r.left<p?a.scrollLeft=Math.max(0,r.left+u-(h?0:10)):r.right>g+p-3&&(a.scrollLeft=r.right+(h?0:10)-g),a}function _o(e,r){null!=r&&(zo(e),e.curOp.scrollTop=(null==e.curOp.scrollTop?e.doc.scrollTop:e.curOp.scrollTop)+r)}function Mo(e){zo(e);var r=e.getCursor();e.curOp.scrollToPos={from:r,to:r,margin:e.options.cursorScrollMargin}}function Ro(e,r,t){null==r&&null==t||zo(e),null!=r&&(e.curOp.scrollLeft=r),null!=t&&(e.curOp.scrollTop=t)}function zo(e){var r=e.curOp.scrollToPos;r&&(e.curOp.scrollToPos=null,No(e,Jt(e,r.from),Jt(e,r.to),r.margin))}function No(e,r,t,o){var n=Ao(e,{left:Math.min(r.left,t.left),top:Math.min(r.top,t.top)-o,right:Math.max(r.right,t.right),bottom:Math.max(r.bottom,t.bottom)+o});Ro(e,n.scrollLeft,n.scrollTop)}function Fo(e,r){Math.abs(e.doc.scrollTop-r)<2||(t||dn(e,{top:r}),Io(e,r,!0),t&&dn(e),on(e,100))}function Io(e,r,t){r=Math.max(0,Math.min(e.display.scroller.scrollHeight-e.display.scroller.clientHeight,r)),(e.display.scroller.scrollTop!=r||t)&&(e.doc.scrollTop=r,e.display.scrollbars.setScrollTop(r),e.display.scroller.scrollTop!=r&&(e.display.scroller.scrollTop=r))}function Wo(e,r,t,o){r=Math.max(0,Math.min(r,e.display.scroller.scrollWidth-e.display.scroller.clientWidth)),(t?r==e.doc.scrollLeft:Math.abs(e.doc.scrollLeft-r)<2)&&!o||(e.doc.scrollLeft=r,pn(e),e.display.scroller.scrollLeft!=r&&(e.display.scroller.scrollLeft=r),e.display.scrollbars.setScrollLeft(r))}function Po(e){var r=e.display,t=r.gutters.offsetWidth,o=Math.round(e.doc.height+xt(e.display));return{clientHeight:r.scroller.clientHeight,viewHeight:r.wrapper.clientHeight,scrollWidth:r.scroller.scrollWidth,clientWidth:r.scroller.clientWidth,viewWidth:r.wrapper.clientWidth,barLeft:e.options.fixedGutter?t:0,docHeight:o,scrollHeight:o+Tt(e)+r.barHeight,nativeBarWidth:r.nativeBarWidth,gutterWidth:t}}var Ko=function(e,r,t){this.cm=t;var o=this.vert=A("div",[A("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),n=this.horiz=A("div",[A("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar");o.tabIndex=n.tabIndex=-1,e(o),e(n),ue(o,"scroll",(function(){o.clientHeight&&r(o.scrollTop,"vertical")})),ue(n,"scroll",(function(){n.clientWidth&&r(n.scrollLeft,"horizontal")})),this.checkedZeroWidth=!1,a&&l<8&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")};Ko.prototype.update=function(e){var r=e.scrollWidth>e.clientWidth+1,t=e.scrollHeight>e.clientHeight+1,o=e.nativeBarWidth;if(t){this.vert.style.display="block",this.vert.style.bottom=r?o+"px":"0";var n=e.viewHeight-(r?o:0);this.vert.firstChild.style.height=Math.max(0,e.scrollHeight-e.clientHeight+n)+"px"}else this.vert.style.display="",this.vert.firstChild.style.height="0";if(r){this.horiz.style.display="block",this.horiz.style.right=t?o+"px":"0",this.horiz.style.left=e.barLeft+"px";var i=e.viewWidth-e.barLeft-(t?o:0);this.horiz.firstChild.style.width=Math.max(0,e.scrollWidth-e.clientWidth+i)+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0";return!this.checkedZeroWidth&&e.clientHeight>0&&(0==o&&this.zeroWidthHack(),this.checkedZeroWidth=!0),{right:t?o:0,bottom:r?o:0}},Ko.prototype.setScrollLeft=function(e){this.horiz.scrollLeft!=e&&(this.horiz.scrollLeft=e),this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz,"horiz")},Ko.prototype.setScrollTop=function(e){this.vert.scrollTop!=e&&(this.vert.scrollTop=e),this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert,"vert")},Ko.prototype.zeroWidthHack=function(){var e=y&&!g?"12px":"18px";this.horiz.style.height=this.vert.style.width=e,this.horiz.style.pointerEvents=this.vert.style.pointerEvents="none",this.disableHoriz=new K,this.disableVert=new K},Ko.prototype.enableZeroWidthBar=function(e,r,t){e.style.pointerEvents="auto",r.set(1e3,(function o(){var n=e.getBoundingClientRect();("vert"==t?document.elementFromPoint(n.right-1,(n.top+n.bottom)/2):document.elementFromPoint((n.right+n.left)/2,n.bottom-1))!=e?e.style.pointerEvents="none":r.set(1e3,o)}))},Ko.prototype.clear=function(){var e=this.horiz.parentNode;e.removeChild(this.horiz),e.removeChild(this.vert)};var Uo=function(){};function Bo(e,r){r||(r=Po(e));var t=e.display.barWidth,o=e.display.barHeight;Do(e,r);for(var n=0;n<4&&t!=e.display.barWidth||o!=e.display.barHeight;n++)t!=e.display.barWidth&&e.options.lineWrapping&&Lo(e),Do(e,Po(e)),t=e.display.barWidth,o=e.display.barHeight}function Do(e,r){var t=e.display,o=t.scrollbars.update(r);t.sizer.style.paddingRight=(t.barWidth=o.right)+"px",t.sizer.style.paddingBottom=(t.barHeight=o.bottom)+"px",t.heightForcer.style.borderBottom=o.bottom+"px solid transparent",o.right&&o.bottom?(t.scrollbarFiller.style.display="block",t.scrollbarFiller.style.height=o.bottom+"px",t.scrollbarFiller.style.width=o.right+"px"):t.scrollbarFiller.style.display="",o.bottom&&e.options.coverGutterNextToScrollbar&&e.options.fixedGutter?(t.gutterFiller.style.display="block",t.gutterFiller.style.height=o.bottom+"px",t.gutterFiller.style.width=r.gutterWidth+"px"):t.gutterFiller.style.display=""}Uo.prototype.update=function(){return{bottom:0,right:0}},Uo.prototype.setScrollLeft=function(){},Uo.prototype.setScrollTop=function(){},Uo.prototype.clear=function(){};var jo={native:Ko,null:Uo};function Ho(e){e.display.scrollbars&&(e.display.scrollbars.clear(),e.display.scrollbars.addClass&&L(e.display.wrapper,e.display.scrollbars.addClass)),e.display.scrollbars=new jo[e.options.scrollbarStyle]((function(r){e.display.wrapper.insertBefore(r,e.display.scrollbarFiller),ue(r,"mousedown",(function(){e.state.focused&&setTimeout((function(){return e.display.input.focus()}),0)})),r.setAttribute("cm-not-content","true")}),(function(r,t){"horizontal"==t?Wo(e,r):Fo(e,r)}),e),e.display.scrollbars.addClass&&z(e.display.wrapper,e.display.scrollbars.addClass)}var Vo=0;function Zo(e){var r;e.curOp={cm:e,viewChanged:!1,startHeight:e.doc.height,forceUpdate:!1,updateInput:0,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++Vo},r=e.curOp,it?it.ops.push(r):r.ownsGroup=it={ops:[r],delayedCallbacks:[]}}function Jo(e){var r=e.curOp;r&&function(e,r){var t=e.ownsGroup;if(t)try{!function(e){var r=e.delayedCallbacks,t=0;do{for(;t<r.length;t++)r[t].call(null);for(var o=0;o<e.ops.length;o++){var n=e.ops[o];if(n.cursorActivityHandlers)for(;n.cursorActivityCalled<n.cursorActivityHandlers.length;)n.cursorActivityHandlers[n.cursorActivityCalled++].call(null,n.cm)}}while(t<r.length)}(t)}finally{it=null,function(e){for(var r=0;r<e.ops.length;r++)e.ops[r].cm.curOp=null;!function(e){for(var r=e.ops,t=0;t<r.length;t++)qo(r[t]);for(var o=0;o<r.length;o++)Go(r[o]);for(var n=0;n<r.length;n++)Qo(r[n]);for(var i=0;i<r.length;i++)Yo(r[i]);for(var a=0;a<r.length;a++)Xo(r[a])}(e)}(t)}}(r)}function qo(e){var r=e.cm,t=r.display;!function(e){var r=e.display;!r.scrollbarsClipped&&r.scroller.offsetWidth&&(r.nativeBarWidth=r.scroller.offsetWidth-r.scroller.clientWidth,r.heightForcer.style.height=Tt(e)+"px",r.sizer.style.marginBottom=-r.nativeBarWidth+"px",r.sizer.style.borderRightWidth=Tt(e)+"px",r.scrollbarsClipped=!0)}(r),e.updateMaxLine&&Vr(r),e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<t.viewFrom||e.scrollToPos.to.line>=t.viewTo)||t.maxLineChanged&&r.options.lineWrapping,e.update=e.mustUpdate&&new an(r,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}function Go(e){e.updatedDisplay=e.mustUpdate&&ln(e.cm,e.update)}function Qo(e){var r=e.cm,t=r.display;e.updatedDisplay&&Lo(r),e.barMeasure=Po(r),t.maxLineChanged&&!r.options.lineWrapping&&(e.adjustWidthTo=At(r,t.maxLine,t.maxLine.text.length).left+3,r.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(t.scroller.clientWidth,t.sizer.offsetLeft+e.adjustWidthTo+Tt(r)+r.display.barWidth),e.maxScrollLeft=Math.max(0,t.sizer.offsetLeft+e.adjustWidthTo-Lt(r))),(e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=t.input.prepareSelection())}function Yo(e){var r=e.cm;null!=e.adjustWidthTo&&(r.display.sizer.style.minWidth=e.adjustWidthTo+"px",e.maxScrollLeft<r.doc.scrollLeft&&Wo(r,Math.min(r.display.scroller.scrollLeft,e.maxScrollLeft),!0),r.display.maxLineChanged=!1);var t=e.focus&&e.focus==R();e.preparedSelection&&r.display.input.showSelection(e.preparedSelection,t),(e.updatedDisplay||e.startHeight!=r.doc.height)&&Bo(r,e.barMeasure),e.updatedDisplay&&un(r,e.barMeasure),e.selectionChanged&&wo(r),r.state.focused&&e.updateInput&&r.display.input.reset(e.typing),t&&Co(e.cm)}function Xo(e){var r=e.cm,t=r.display,o=r.doc;e.updatedDisplay&&cn(r,e.update),null==t.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(t.wheelStartX=t.wheelStartY=null),null!=e.scrollTop&&Io(r,e.scrollTop,e.forceScroll),null!=e.scrollLeft&&Wo(r,e.scrollLeft,!0,!0),e.scrollToPos&&function(e,r){if(!fe(e,"scrollCursorIntoView")){var t=e.display,o=t.sizer.getBoundingClientRect(),n=null;if(r.top+o.top<0?n=!0:r.bottom+o.top>(window.innerHeight||document.documentElement.clientHeight)&&(n=!1),null!=n&&!h){var i=A("div","​",null,"position: absolute;\n                         top: "+(r.top-t.viewOffset-Ct(e.display))+"px;\n                         height: "+(r.bottom-r.top+Tt(e)+t.barHeight)+"px;\n                         left: "+r.left+"px; width: "+Math.max(2,r.right-r.left)+"px;");e.display.lineSpace.appendChild(i),i.scrollIntoView(n),e.display.lineSpace.removeChild(i)}}}(r,function(e,r,t,o){var n;null==o&&(o=0),e.options.lineWrapping||r!=t||(t="before"==(r=r.ch?er(r.line,"before"==r.sticky?r.ch-1:r.ch,"after"):r).sticky?er(r.line,r.ch+1,"before"):r);for(var i=0;i<5;i++){var a=!1,l=Zt(e,r),c=t&&t!=r?Zt(e,t):l,d=Ao(e,n={left:Math.min(l.left,c.left),top:Math.min(l.top,c.top)-o,right:Math.max(l.left,c.left),bottom:Math.max(l.bottom,c.bottom)+o}),s=e.doc.scrollTop,u=e.doc.scrollLeft;if(null!=d.scrollTop&&(Fo(e,d.scrollTop),Math.abs(e.doc.scrollTop-s)>1&&(a=!0)),null!=d.scrollLeft&&(Wo(e,d.scrollLeft),Math.abs(e.doc.scrollLeft-u)>1&&(a=!0)),!a)break}return n}(r,lr(o,e.scrollToPos.from),lr(o,e.scrollToPos.to),e.scrollToPos.margin));var n=e.maybeHiddenMarkers,i=e.maybeUnhiddenMarkers;if(n)for(var a=0;a<n.length;++a)n[a].lines.length||he(n[a],"hide");if(i)for(var l=0;l<i.length;++l)i[l].lines.length&&he(i[l],"unhide");t.wrapper.offsetHeight&&(o.scrollTop=r.display.scroller.scrollTop),e.changeObjs&&he(r,"changes",r,e.changeObjs),e.update&&e.update.finish()}function $o(e,r){if(e.curOp)return r();Zo(e);try{return r()}finally{Jo(e)}}function en(e,r){return function(){if(e.curOp)return r.apply(e,arguments);Zo(e);try{return r.apply(e,arguments)}finally{Jo(e)}}}function rn(e){return function(){if(this.curOp)return e.apply(this,arguments);Zo(this);try{return e.apply(this,arguments)}finally{Jo(this)}}}function tn(e){return function(){var r=this.cm;if(!r||r.curOp)return e.apply(this,arguments);Zo(r);try{return e.apply(this,arguments)}finally{Jo(r)}}}function on(e,r){e.doc.highlightFrontier<e.display.viewTo&&e.state.highlight.set(r,I(nn,e))}function nn(e){var r=e.doc;if(!(r.highlightFrontier>=e.display.viewTo)){var t=+new Date+e.options.workTime,o=gr(e,r.highlightFrontier),n=[];r.iter(o.line,Math.min(r.first+r.size,e.display.viewTo+500),(function(i){if(o.line>=e.display.viewFrom){var a=i.styles,l=i.text.length>e.options.maxHighlightLength?De(r.mode,o.state):null,c=ur(e,i,o,!0);l&&(o.state=l),i.styles=c.styles;var d=i.styleClasses,s=c.classes;s?i.styleClasses=s:d&&(i.styleClasses=null);for(var u=!a||a.length!=i.styles.length||d!=s&&(!d||!s||d.bgClass!=s.bgClass||d.textClass!=s.textClass),p=0;!u&&p<a.length;++p)u=a[p]!=i.styles[p];u&&n.push(o.line),i.stateAfter=o.save(),o.nextLine()}else i.text.length<=e.options.maxHighlightLength&&hr(e,i.text,o),i.stateAfter=o.line%5==0?o.save():null,o.nextLine();if(+new Date>t)return on(e,e.options.workDelay),!0})),r.highlightFrontier=o.line,r.modeFrontier=Math.max(r.modeFrontier,o.line),n.length&&$o(e,(function(){for(var r=0;r<n.length;r++)po(e,n[r],"text")}))}}var an=function(e,r,t){var o=e.display;this.viewport=r,this.visible=Oo(o,e.doc,r),this.editorIsHidden=!o.wrapper.offsetWidth,this.wrapperHeight=o.wrapper.clientHeight,this.wrapperWidth=o.wrapper.clientWidth,this.oldDisplayWidth=Lt(e),this.force=t,this.dims=no(e),this.events=[]};function ln(e,r){var t=e.display,o=e.doc;if(r.editorIsHidden)return go(e),!1;if(!r.force&&r.visible.from>=t.viewFrom&&r.visible.to<=t.viewTo&&(null==t.updateLineNumbers||t.updateLineNumbers>=t.viewTo)&&t.renderedView==t.view&&0==fo(e))return!1;gn(e)&&(go(e),r.dims=no(e));var n=o.first+o.size,i=Math.max(r.visible.from-e.options.viewportMargin,o.first),a=Math.min(n,r.visible.to+e.options.viewportMargin);t.viewFrom<i&&i-t.viewFrom<20&&(i=Math.max(o.first,t.viewFrom)),t.viewTo>a&&t.viewTo-a<20&&(a=Math.min(n,t.viewTo)),Cr&&(i=Kr(e.doc,i),a=Ur(e.doc,a));var l=i!=t.viewFrom||a!=t.viewTo||t.lastWrapHeight!=r.wrapperHeight||t.lastWrapWidth!=r.wrapperWidth;!function(e,r,t){var o=e.display;0==o.view.length||r>=o.viewTo||t<=o.viewFrom?(o.view=nt(e,r,t),o.viewFrom=r):(o.viewFrom>r?o.view=nt(e,r,o.viewFrom).concat(o.view):o.viewFrom<r&&(o.view=o.view.slice(so(e,r))),o.viewFrom=r,o.viewTo<t?o.view=o.view.concat(nt(e,o.viewTo,t)):o.viewTo>t&&(o.view=o.view.slice(0,so(e,t)))),o.viewTo=t}(e,i,a),t.viewOffset=jr(Ze(e.doc,t.viewFrom)),e.display.mover.style.top=t.viewOffset+"px";var d=fo(e);if(!l&&0==d&&!r.force&&t.renderedView==t.view&&(null==t.updateLineNumbers||t.updateLineNumbers>=t.viewTo))return!1;var s=function(e){if(e.hasFocus())return null;var r=R();if(!r||!M(e.display.lineDiv,r))return null;var t={activeElt:r};if(window.getSelection){var o=window.getSelection();o.anchorNode&&o.extend&&M(e.display.lineDiv,o.anchorNode)&&(t.anchorNode=o.anchorNode,t.anchorOffset=o.anchorOffset,t.focusNode=o.focusNode,t.focusOffset=o.focusOffset)}return t}(e);return d>4&&(t.lineDiv.style.display="none"),function(e,r,t){var o=e.display,n=e.options.lineNumbers,i=o.lineDiv,a=i.firstChild;function l(r){var t=r.nextSibling;return c&&y&&e.display.currentWheelTarget==r?r.style.display="none":r.parentNode.removeChild(r),t}for(var d=o.view,s=o.viewFrom,u=0;u<d.length;u++){var p=d[u];if(p.hidden);else if(p.node&&p.node.parentNode==i){for(;a!=p.node;)a=l(a);var g=n&&null!=r&&r<=s&&p.lineNumber;p.changes&&(U(p.changes,"gutter")>-1&&(g=!1),dt(e,p,s,t)),g&&(E(p.lineNumber),p.lineNumber.appendChild(document.createTextNode($e(e.options,s)))),a=p.node.nextSibling}else{var h=bt(e,p,s,t);i.insertBefore(h,a)}s+=p.size}for(;a;)a=l(a)}(e,t.updateLineNumbers,r.dims),d>4&&(t.lineDiv.style.display=""),t.renderedView=t.view,function(e){if(e&&e.activeElt&&e.activeElt!=R()&&(e.activeElt.focus(),!/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName)&&e.anchorNode&&M(document.body,e.anchorNode)&&M(document.body,e.focusNode))){var r=window.getSelection(),t=document.createRange();t.setEnd(e.anchorNode,e.anchorOffset),t.collapse(!1),r.removeAllRanges(),r.addRange(t),r.extend(e.focusNode,e.focusOffset)}}(s),E(t.cursorDiv),E(t.selectionDiv),t.gutters.style.height=t.sizer.style.minHeight=0,l&&(t.lastWrapHeight=r.wrapperHeight,t.lastWrapWidth=r.wrapperWidth,on(e,400)),t.updateLineNumbers=null,!0}function cn(e,r){for(var t=r.viewport,o=!0;;o=!1){if(o&&e.options.lineWrapping&&r.oldDisplayWidth!=Lt(e))o&&(r.visible=Oo(e.display,e.doc,t));else if(t&&null!=t.top&&(t={top:Math.min(e.doc.height+xt(e.display)-Et(e),t.top)}),r.visible=Oo(e.display,e.doc,t),r.visible.from>=e.display.viewFrom&&r.visible.to<=e.display.viewTo)break;if(!ln(e,r))break;Lo(e);var n=Po(e);bo(e),Bo(e,n),un(e,n),r.force=!1}r.signal(e,"update",e),e.display.viewFrom==e.display.reportedViewFrom&&e.display.viewTo==e.display.reportedViewTo||(r.signal(e,"viewportChange",e,e.display.viewFrom,e.display.viewTo),e.display.reportedViewFrom=e.display.viewFrom,e.display.reportedViewTo=e.display.viewTo)}function dn(e,r){var t=new an(e,r);if(ln(e,t)){Lo(e),cn(e,t);var o=Po(e);bo(e),Bo(e,o),un(e,o),t.finish()}}function sn(e){var r=e.gutters.offsetWidth;e.sizer.style.marginLeft=r+"px"}function un(e,r){e.display.sizer.style.minHeight=r.docHeight+"px",e.display.heightForcer.style.top=r.docHeight+"px",e.display.gutters.style.height=r.docHeight+e.display.barHeight+Tt(e)+"px"}function pn(e){var r=e.display,t=r.view;if(r.alignWidgets||r.gutters.firstChild&&e.options.fixedGutter){for(var o=io(r)-r.scroller.scrollLeft+e.doc.scrollLeft,n=r.gutters.offsetWidth,i=o+"px",a=0;a<t.length;a++)if(!t[a].hidden){e.options.fixedGutter&&(t[a].gutter&&(t[a].gutter.style.left=i),t[a].gutterBackground&&(t[a].gutterBackground.style.left=i));var l=t[a].alignable;if(l)for(var c=0;c<l.length;c++)l[c].style.left=i}e.options.fixedGutter&&(r.gutters.style.left=o+n+"px")}}function gn(e){if(!e.options.lineNumbers)return!1;var r=e.doc,t=$e(e.options,r.first+r.size-1),o=e.display;if(t.length!=o.lineNumChars){var n=o.measure.appendChild(A("div",[A("div",t)],"CodeMirror-linenumber CodeMirror-gutter-elt")),i=n.firstChild.offsetWidth,a=n.offsetWidth-i;return o.lineGutter.style.width="",o.lineNumInnerWidth=Math.max(i,o.lineGutter.offsetWidth-a)+1,o.lineNumWidth=o.lineNumInnerWidth+a,o.lineNumChars=o.lineNumInnerWidth?t.length:-1,o.lineGutter.style.width=o.lineNumWidth+"px",sn(e.display),!0}return!1}function hn(e,r){for(var t=[],o=!1,n=0;n<e.length;n++){var i=e[n],a=null;if("string"!=typeof i&&(a=i.style,i=i.className),"CodeMirror-linenumbers"==i){if(!r)continue;o=!0}t.push({className:i,style:a})}return r&&!o&&t.push({className:"CodeMirror-linenumbers",style:null}),t}function fn(e){var r=e.gutters,t=e.gutterSpecs;E(r),e.lineGutter=null;for(var o=0;o<t.length;++o){var n=t[o],i=n.className,a=n.style,l=r.appendChild(A("div",null,"CodeMirror-gutter "+i));a&&(l.style.cssText=a),"CodeMirror-linenumbers"==i&&(e.lineGutter=l,l.style.width=(e.lineNumWidth||1)+"px")}r.style.display=t.length?"":"none",sn(e)}function bn(e){fn(e.display),uo(e),pn(e)}function mn(e,r,o,n){var i=this;this.input=o,i.scrollbarFiller=A("div",null,"CodeMirror-scrollbar-filler"),i.scrollbarFiller.setAttribute("cm-not-content","true"),i.gutterFiller=A("div",null,"CodeMirror-gutter-filler"),i.gutterFiller.setAttribute("cm-not-content","true"),i.lineDiv=_("div",null,"CodeMirror-code"),i.selectionDiv=A("div",null,null,"position: relative; z-index: 1"),i.cursorDiv=A("div",null,"CodeMirror-cursors"),i.measure=A("div",null,"CodeMirror-measure"),i.lineMeasure=A("div",null,"CodeMirror-measure"),i.lineSpace=_("div",[i.measure,i.lineMeasure,i.selectionDiv,i.cursorDiv,i.lineDiv],null,"position: relative; outline: none");var d=_("div",[i.lineSpace],"CodeMirror-lines");i.mover=A("div",[d],null,"position: relative"),i.sizer=A("div",[i.mover],"CodeMirror-sizer"),i.sizerWidth=null,i.heightForcer=A("div",null,null,"position: absolute; height: 50px; width: 1px;"),i.gutters=A("div",null,"CodeMirror-gutters"),i.lineGutter=null,i.scroller=A("div",[i.sizer,i.heightForcer,i.gutters],"CodeMirror-scroll"),i.scroller.setAttribute("tabIndex","-1"),i.wrapper=A("div",[i.scrollbarFiller,i.gutterFiller,i.scroller],"CodeMirror"),a&&l<8&&(i.gutters.style.zIndex=-1,i.scroller.style.paddingRight=0),c||t&&m||(i.scroller.draggable=!0),e&&(e.appendChild?e.appendChild(i.wrapper):e(i.wrapper)),i.viewFrom=i.viewTo=r.first,i.reportedViewFrom=i.reportedViewTo=r.first,i.view=[],i.renderedView=null,i.externalMeasured=null,i.viewOffset=0,i.lastWrapHeight=i.lastWrapWidth=0,i.updateLineNumbers=null,i.nativeBarWidth=i.barHeight=i.barWidth=0,i.scrollbarsClipped=!1,i.lineNumWidth=i.lineNumInnerWidth=i.lineNumChars=null,i.alignWidgets=!1,i.cachedCharWidth=i.cachedTextHeight=i.cachedPaddingH=null,i.maxLine=null,i.maxLineLength=0,i.maxLineChanged=!1,i.wheelDX=i.wheelDY=i.wheelStartX=i.wheelStartY=null,i.shift=!1,i.selForContextMenu=null,i.activeTouch=null,i.gutterSpecs=hn(n.gutters,n.lineNumbers),fn(i),o.init(i)}an.prototype.signal=function(e,r){me(e,r)&&this.events.push(arguments)},an.prototype.finish=function(){for(var e=0;e<this.events.length;e++)he.apply(null,this.events[e])};var yn=0,vn=null;function kn(e){var r=e.wheelDeltaX,t=e.wheelDeltaY;return null==r&&e.detail&&e.axis==e.HORIZONTAL_AXIS&&(r=e.detail),null==t&&e.detail&&e.axis==e.VERTICAL_AXIS?t=e.detail:null==t&&(t=e.wheelDelta),{x:r,y:t}}function wn(e){var r=kn(e);return r.x*=vn,r.y*=vn,r}function Cn(e,r){var o=kn(r),n=o.x,i=o.y,a=e.display,l=a.scroller,d=l.scrollWidth>l.clientWidth,s=l.scrollHeight>l.clientHeight;if(n&&d||i&&s){if(i&&y&&c)e:for(var p=r.target,g=a.view;p!=l;p=p.parentNode)for(var h=0;h<g.length;h++)if(g[h].node==p){e.display.currentWheelTarget=p;break e}if(n&&!t&&!u&&null!=vn)return i&&s&&Fo(e,Math.max(0,l.scrollTop+i*vn)),Wo(e,Math.max(0,l.scrollLeft+n*vn)),(!i||i&&s)&&ve(r),void(a.wheelStartX=null);if(i&&null!=vn){var f=i*vn,b=e.doc.scrollTop,m=b+a.wrapper.clientHeight;f<0?b=Math.max(0,b+f-50):m=Math.min(e.doc.height,m+f+50),dn(e,{top:b,bottom:m})}yn<20&&(null==a.wheelStartX?(a.wheelStartX=l.scrollLeft,a.wheelStartY=l.scrollTop,a.wheelDX=n,a.wheelDY=i,setTimeout((function(){if(null!=a.wheelStartX){var e=l.scrollLeft-a.wheelStartX,r=l.scrollTop-a.wheelStartY,t=r&&a.wheelDY&&r/a.wheelDY||e&&a.wheelDX&&e/a.wheelDX;a.wheelStartX=a.wheelStartY=null,t&&(vn=(vn*yn+t)/(yn+1),++yn)}}),200)):(a.wheelDX+=n,a.wheelDY+=i))}}a?vn=-.53:t?vn=15:s?vn=-.7:p&&(vn=-1/3);var xn=function(e,r){this.ranges=e,this.primIndex=r};xn.prototype.primary=function(){return this.ranges[this.primIndex]},xn.prototype.equals=function(e){if(e==this)return!0;if(e.primIndex!=this.primIndex||e.ranges.length!=this.ranges.length)return!1;for(var r=0;r<this.ranges.length;r++){var t=this.ranges[r],o=e.ranges[r];if(!tr(t.anchor,o.anchor)||!tr(t.head,o.head))return!1}return!0},xn.prototype.deepCopy=function(){for(var e=[],r=0;r<this.ranges.length;r++)e[r]=new Sn(or(this.ranges[r].anchor),or(this.ranges[r].head));return new xn(e,this.primIndex)},xn.prototype.somethingSelected=function(){for(var e=0;e<this.ranges.length;e++)if(!this.ranges[e].empty())return!0;return!1},xn.prototype.contains=function(e,r){r||(r=e);for(var t=0;t<this.ranges.length;t++){var o=this.ranges[t];if(rr(r,o.from())>=0&&rr(e,o.to())<=0)return t}return-1};var Sn=function(e,r){this.anchor=e,this.head=r};function Tn(e,r,t){var o=e&&e.options.selectionsMayTouch,n=r[t];r.sort((function(e,r){return rr(e.from(),r.from())})),t=U(r,n);for(var i=1;i<r.length;i++){var a=r[i],l=r[i-1],c=rr(l.to(),a.from());if(o&&!a.empty()?c>0:c>=0){var d=ir(l.from(),a.from()),s=nr(l.to(),a.to()),u=l.empty()?a.from()==a.head:l.from()==l.head;i<=t&&--t,r.splice(--i,2,new Sn(u?s:d,u?d:s))}}return new xn(r,t)}function Ln(e,r){return new xn([new Sn(e,r||e)],0)}function En(e){return e.text?er(e.from.line+e.text.length-1,q(e.text).length+(1==e.text.length?e.from.ch:0)):e.to}function On(e,r){if(rr(e,r.from)<0)return e;if(rr(e,r.to)<=0)return En(r);var t=e.line+r.text.length-(r.to.line-r.from.line)-1,o=e.ch;return e.line==r.to.line&&(o+=En(r).ch-r.to.ch),er(t,o)}function An(e,r){for(var t=[],o=0;o<e.sel.ranges.length;o++){var n=e.sel.ranges[o];t.push(new Sn(On(n.anchor,r),On(n.head,r)))}return Tn(e.cm,t,e.sel.primIndex)}function _n(e,r,t){return e.line==r.line?er(t.line,e.ch-r.ch+t.ch):er(t.line+(e.line-r.line),e.ch)}function Mn(e){e.doc.mode=Ke(e.options,e.doc.modeOption),Rn(e)}function Rn(e){e.doc.iter((function(e){e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null)})),e.doc.modeFrontier=e.doc.highlightFrontier=e.doc.first,on(e,100),e.state.modeGen++,e.curOp&&uo(e)}function zn(e,r){return 0==r.from.ch&&0==r.to.ch&&""==q(r.text)&&(!e.cm||e.cm.options.wholeLineUpdateBefore)}function Nn(e,r,t,o){function n(e){return t?t[e]:null}function i(e,t,n){!function(e,r,t,o){e.text=r,e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null),null!=e.order&&(e.order=null),Or(e),Ar(e,t);var n=o?o(e):1;n!=e.height&&Ge(e,n)}(e,t,n,o),lt(e,"change",e,r)}function a(e,r){for(var t=[],i=e;i<r;++i)t.push(new Zr(d[i],n(i),o));return t}var l=r.from,c=r.to,d=r.text,s=Ze(e,l.line),u=Ze(e,c.line),p=q(d),g=n(d.length-1),h=c.line-l.line;if(r.full)e.insert(0,a(0,d.length)),e.remove(d.length,e.size-d.length);else if(zn(e,r)){var f=a(0,d.length-1);i(u,u.text,g),h&&e.remove(l.line,h),f.length&&e.insert(l.line,f)}else if(s==u)if(1==d.length)i(s,s.text.slice(0,l.ch)+p+s.text.slice(c.ch),g);else{var b=a(1,d.length-1);b.push(new Zr(p+s.text.slice(c.ch),g,o)),i(s,s.text.slice(0,l.ch)+d[0],n(0)),e.insert(l.line+1,b)}else if(1==d.length)i(s,s.text.slice(0,l.ch)+d[0]+u.text.slice(c.ch),n(0)),e.remove(l.line+1,h);else{i(s,s.text.slice(0,l.ch)+d[0],n(0)),i(u,p+u.text.slice(c.ch),g);var m=a(1,d.length-1);h>1&&e.remove(l.line+1,h-1),e.insert(l.line+1,m)}lt(e,"change",e,r)}function Fn(e,r,t){!function e(o,n,i){if(o.linked)for(var a=0;a<o.linked.length;++a){var l=o.linked[a];if(l.doc!=n){var c=i&&l.sharedHist;t&&!c||(r(l.doc,c),e(l.doc,o,c))}}}(e,null,!0)}function In(e,r){if(r.cm)throw Error("This document is already in use.");e.doc=r,r.cm=e,lo(e),Mn(e),Wn(e),e.options.lineWrapping||Vr(e),e.options.mode=r.modeOption,uo(e)}function Wn(e){("rtl"==e.doc.direction?z:L)(e.display.lineDiv,"CodeMirror-rtl")}function Pn(e){this.done=[],this.undone=[],this.undoDepth=1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=e||1}function Kn(e,r){var t={from:or(r.from),to:En(r),text:Je(e,r.from,r.to)};return jn(e,t,r.from.line,r.to.line+1),Fn(e,(function(e){return jn(e,t,r.from.line,r.to.line+1)}),!0),t}function Un(e){for(;e.length&&q(e).ranges;)e.pop()}function Bn(e,r,t,o){var n=e.history;n.undone.length=0;var i,a,l=+new Date;if((n.lastOp==o||n.lastOrigin==r.origin&&r.origin&&("+"==r.origin.charAt(0)&&n.lastModTime>l-(e.cm?e.cm.options.historyEventDelay:500)||"*"==r.origin.charAt(0)))&&(i=function(e,r){return r?(Un(e.done),q(e.done)):e.done.length&&!q(e.done).ranges?q(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(),q(e.done)):void 0}(n,n.lastOp==o)))a=q(i.changes),0==rr(r.from,r.to)&&0==rr(r.from,a.to)?a.to=En(r):i.changes.push(Kn(e,r));else{var c=q(n.done);for(c&&c.ranges||Dn(e.sel,n.done),i={changes:[Kn(e,r)],generation:n.generation},n.done.push(i);n.done.length>n.undoDepth;)n.done.shift(),n.done[0].ranges||n.done.shift()}n.done.push(t),n.generation=++n.maxGeneration,n.lastModTime=n.lastSelTime=l,n.lastOp=n.lastSelOp=o,n.lastOrigin=n.lastSelOrigin=r.origin,a||he(e,"historyAdded")}function Dn(e,r){var t=q(r);t&&t.ranges&&t.equals(e)||r.push(e)}function jn(e,r,t,o){var n=r["spans_"+e.id],i=0;e.iter(Math.max(e.first,t),Math.min(e.first+e.size,o),(function(t){t.markedSpans&&((n||(n=r["spans_"+e.id]={}))[i]=t.markedSpans),++i}))}function Hn(e){if(!e)return null;for(var r,t=0;t<e.length;++t)e[t].marker.explicitlyCleared?r||(r=e.slice(0,t)):r&&r.push(e[t]);return r?r.length?r:null:e}function Vn(e,r){var t=function(e,r){var t=r["spans_"+e.id];if(!t)return null;for(var o=[],n=0;n<r.text.length;++n)o.push(Hn(t[n]));return o}(e,r),o=Lr(e,r);if(!t)return o;if(!o)return t;for(var n=0;n<t.length;++n){var i=t[n],a=o[n];if(i&&a)e:for(var l=0;l<a.length;++l){for(var c=a[l],d=0;d<i.length;++d)if(i[d].marker==c.marker)continue e;i.push(c)}else a&&(t[n]=a)}return t}function Zn(e,r,t){for(var o=[],n=0;n<e.length;++n){var i=e[n];if(i.ranges)o.push(t?xn.prototype.deepCopy.call(i):i);else{var a=i.changes,l=[];o.push({changes:l});for(var c=0;c<a.length;++c){var d=a[c],s=void 0;if(l.push({from:d.from,to:d.to,text:d.text}),r)for(var u in d)(s=u.match(/^spans_(\d+)$/))&&U(r,Number(s[1]))>-1&&(q(l)[u]=d[u],delete d[u])}}}return o}function Jn(e,r,t,o){if(o){var n=e.anchor;if(t){var i=rr(r,n)<0;i!=rr(t,n)<0?(n=r,r=t):i!=rr(r,t)<0&&(r=t)}return new Sn(n,r)}return new Sn(t||r,r)}function qn(e,r,t,o,n){null==n&&(n=e.cm&&(e.cm.display.shift||e.extend)),$n(e,new xn([Jn(e.sel.primary(),r,t,n)],0),o)}function Gn(e,r,t){for(var o=[],n=e.cm&&(e.cm.display.shift||e.extend),i=0;i<e.sel.ranges.length;i++)o[i]=Jn(e.sel.ranges[i],r[i],null,n);$n(e,Tn(e.cm,o,e.sel.primIndex),t)}function Qn(e,r,t,o){var n=e.sel.ranges.slice(0);n[r]=t,$n(e,Tn(e.cm,n,e.sel.primIndex),o)}function Yn(e,r,t,o){$n(e,Ln(r,t),o)}function Xn(e,r,t){var o=e.history.done,n=q(o);n&&n.ranges?(o[o.length-1]=r,ei(e,r,t)):$n(e,r,t)}function $n(e,r,t){ei(e,r,t),function(e,r,t,o){var n=e.history,i=o&&o.origin;t==n.lastSelOp||i&&n.lastSelOrigin==i&&(n.lastModTime==n.lastSelTime&&n.lastOrigin==i||function(e,r,t,o){var n=r.charAt(0);return"*"==n||"+"==n&&t.ranges.length==o.ranges.length&&t.somethingSelected()==o.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500)}(e,i,q(n.done),r))?n.done[n.done.length-1]=r:Dn(r,n.done),n.lastSelTime=+new Date,n.lastSelOrigin=i,n.lastSelOp=t,o&&!1!==o.clearRedo&&Un(n.undone)}(e,e.sel,e.cm?e.cm.curOp.id:NaN,t)}function ei(e,r,t){(me(e,"beforeSelectionChange")||e.cm&&me(e.cm,"beforeSelectionChange"))&&(r=function(e,r,t){var o={ranges:r.ranges,update:function(r){this.ranges=[];for(var t=0;t<r.length;t++)this.ranges[t]=new Sn(lr(e,r[t].anchor),lr(e,r[t].head))},origin:t&&t.origin};return he(e,"beforeSelectionChange",e,o),e.cm&&he(e.cm,"beforeSelectionChange",e.cm,o),o.ranges!=r.ranges?Tn(e.cm,o.ranges,o.ranges.length-1):r}(e,r,t));var o=t&&t.bias||(rr(r.primary().head,e.sel.primary().head)<0?-1:1);ri(e,oi(e,r,o,!0)),t&&!1===t.scroll||!e.cm||Mo(e.cm)}function ri(e,r){r.equals(e.sel)||(e.sel=r,e.cm&&(e.cm.curOp.updateInput=1,e.cm.curOp.selectionChanged=!0,be(e.cm)),lt(e,"cursorActivity",e))}function ti(e){ri(e,oi(e,e.sel,null,!1))}function oi(e,r,t,o){for(var n,i=0;i<r.ranges.length;i++){var a=r.ranges[i],l=r.ranges.length==e.sel.ranges.length&&e.sel.ranges[i],c=ii(e,a.anchor,l&&l.anchor,t,o),d=ii(e,a.head,l&&l.head,t,o);(n||c!=a.anchor||d!=a.head)&&(n||(n=r.ranges.slice(0,i)),n[i]=new Sn(c,d))}return n?Tn(e.cm,n,r.primIndex):r}function ni(e,r,t,o,n){var i=Ze(e,r.line);if(i.markedSpans)for(var a=0;a<i.markedSpans.length;++a){var l=i.markedSpans[a],c=l.marker,d="selectLeft"in c?!c.selectLeft:c.inclusiveLeft,s="selectRight"in c?!c.selectRight:c.inclusiveRight;if((null==l.from||(d?l.from<=r.ch:l.from<r.ch))&&(null==l.to||(s?l.to>=r.ch:l.to>r.ch))){if(n&&(he(c,"beforeCursorEnter"),c.explicitlyCleared)){if(i.markedSpans){--a;continue}break}if(!c.atomic)continue;if(t){var u=c.find(o<0?1:-1),p=void 0;if((o<0?s:d)&&(u=ai(e,u,-o,u&&u.line==r.line?i:null)),u&&u.line==r.line&&(p=rr(u,t))&&(o<0?p<0:p>0))return ni(e,u,r,o,n)}var g=c.find(o<0?-1:1);return(o<0?d:s)&&(g=ai(e,g,o,g.line==r.line?i:null)),g?ni(e,g,r,o,n):null}}return r}function ii(e,r,t,o,n){var i=o||1;return ni(e,r,t,i,n)||!n&&ni(e,r,t,i,!0)||ni(e,r,t,-i,n)||!n&&ni(e,r,t,-i,!0)||(e.cantEdit=!0,er(e.first,0))}function ai(e,r,t,o){return t<0&&0==r.ch?r.line>e.first?lr(e,er(r.line-1)):null:t>0&&r.ch==(o||Ze(e,r.line)).text.length?r.line<e.first+e.size-1?er(r.line+1,0):null:new er(r.line,r.ch+t)}function li(e){e.setSelection(er(e.firstLine(),0),er(e.lastLine()),D)}function ci(e,r,t){var o={canceled:!1,from:r.from,to:r.to,text:r.text,origin:r.origin,cancel:function(){return o.canceled=!0}};return t&&(o.update=function(r,t,n,i){r&&(o.from=lr(e,r)),t&&(o.to=lr(e,t)),n&&(o.text=n),void 0!==i&&(o.origin=i)}),he(e,"beforeChange",e,o),e.cm&&he(e.cm,"beforeChange",e.cm,o),o.canceled?(e.cm&&(e.cm.curOp.updateInput=2),null):{from:o.from,to:o.to,text:o.text,origin:o.origin}}function di(e,r,t){if(e.cm){if(!e.cm.curOp)return en(e.cm,di)(e,r,t);if(e.cm.state.suppressEdits)return}if(!(me(e,"beforeChange")||e.cm&&me(e.cm,"beforeChange"))||(r=ci(e,r,!0))){var o=wr&&!t&&function(e,r,t){var o=null;if(e.iter(r.line,t.line+1,(function(e){if(e.markedSpans)for(var r=0;r<e.markedSpans.length;++r){var t=e.markedSpans[r].marker;!t.readOnly||o&&-1!=U(o,t)||(o||(o=[])).push(t)}})),!o)return null;for(var n=[{from:r,to:t}],i=0;i<o.length;++i)for(var a=o[i],l=a.find(0),c=0;c<n.length;++c){var d=n[c];if(!(rr(d.to,l.from)<0||rr(d.from,l.to)>0)){var s=[c,1],u=rr(d.from,l.from),p=rr(d.to,l.to);(u<0||!a.inclusiveLeft&&!u)&&s.push({from:d.from,to:l.from}),(p>0||!a.inclusiveRight&&!p)&&s.push({from:l.to,to:d.to}),n.splice.apply(n,s),c+=s.length-3}}return n}(e,r.from,r.to);if(o)for(var n=o.length-1;n>=0;--n)si(e,{from:o[n].from,to:o[n].to,text:n?[""]:r.text,origin:r.origin});else si(e,r)}}function si(e,r){if(1!=r.text.length||""!=r.text[0]||0!=rr(r.from,r.to)){var t=An(e,r);Bn(e,r,t,e.cm?e.cm.curOp.id:NaN),gi(e,r,t,Lr(e,r));var o=[];Fn(e,(function(e,t){t||-1!=U(o,e.history)||(mi(e.history,r),o.push(e.history)),gi(e,r,null,Lr(e,r))}))}}function ui(e,r,t){var o=e.cm&&e.cm.state.suppressEdits;if(!o||t){for(var n,i=e.history,a=e.sel,l="undo"==r?i.done:i.undone,c="undo"==r?i.undone:i.done,d=0;d<l.length&&(n=l[d],t?!n.ranges||n.equals(e.sel):n.ranges);d++);if(d!=l.length){for(i.lastOrigin=i.lastSelOrigin=null;;){if(!(n=l.pop()).ranges){if(o)return void l.push(n);break}if(Dn(n,c),t&&!n.equals(e.sel))return void $n(e,n,{clearRedo:!1});a=n}var s=[];Dn(a,c),c.push({changes:s,generation:i.generation}),i.generation=n.generation||++i.maxGeneration;for(var u=me(e,"beforeChange")||e.cm&&me(e.cm,"beforeChange"),p=function(t){var o=n.changes[t];if(o.origin=r,u&&!ci(e,o,!1))return l.length=0,{};s.push(Kn(e,o));var i=t?An(e,o):q(l);gi(e,o,i,Vn(e,o)),!t&&e.cm&&e.cm.scrollIntoView({from:o.from,to:En(o)});var a=[];Fn(e,(function(e,r){r||-1!=U(a,e.history)||(mi(e.history,o),a.push(e.history)),gi(e,o,null,Vn(e,o))}))},g=n.changes.length-1;g>=0;--g){var h=p(g);if(h)return h.v}}}}function pi(e,r){if(0!=r&&(e.first+=r,e.sel=new xn(G(e.sel.ranges,(function(e){return new Sn(er(e.anchor.line+r,e.anchor.ch),er(e.head.line+r,e.head.ch))})),e.sel.primIndex),e.cm)){uo(e.cm,e.first,e.first-r,r);for(var t=e.cm.display,o=t.viewFrom;o<t.viewTo;o++)po(e.cm,o,"gutter")}}function gi(e,r,t,o){if(e.cm&&!e.cm.curOp)return en(e.cm,gi)(e,r,t,o);if(r.to.line<e.first)pi(e,r.text.length-1-(r.to.line-r.from.line));else if(!(r.from.line>e.lastLine())){if(r.from.line<e.first){var n=r.text.length-1-(e.first-r.from.line);pi(e,n),r={from:er(e.first,0),to:er(r.to.line+n,r.to.ch),text:[q(r.text)],origin:r.origin}}var i=e.lastLine();r.to.line>i&&(r={from:r.from,to:er(i,Ze(e,i).text.length),text:[r.text[0]],origin:r.origin}),r.removed=Je(e,r.from,r.to),t||(t=An(e,r)),e.cm?function(e,r,t){var o=e.doc,n=e.display,i=r.from,a=r.to,l=!1,c=i.line;e.options.lineWrapping||(c=Qe(Pr(Ze(o,i.line))),o.iter(c,a.line+1,(function(e){if(e==n.maxLine)return l=!0,!0}))),o.sel.contains(r.from,r.to)>-1&&be(e),Nn(o,r,t,ao(e)),e.options.lineWrapping||(o.iter(c,i.line+r.text.length,(function(e){var r=Hr(e);r>n.maxLineLength&&(n.maxLine=e,n.maxLineLength=r,n.maxLineChanged=!0,l=!1)})),l&&(e.curOp.updateMaxLine=!0)),function(e,r){if(e.modeFrontier=Math.min(e.modeFrontier,r),!(e.highlightFrontier<r-10)){for(var t=e.first,o=r-1;o>t;o--){var n=Ze(e,o).stateAfter;if(n&&(!(n instanceof dr)||o+n.lookAhead<r)){t=o+1;break}}e.highlightFrontier=Math.min(e.highlightFrontier,t)}}(o,i.line),on(e,400);var d=r.text.length-(a.line-i.line)-1;r.full?uo(e):i.line!=a.line||1!=r.text.length||zn(e.doc,r)?uo(e,i.line,a.line+1,d):po(e,i.line,"text");var s=me(e,"changes"),u=me(e,"change");if(u||s){var p={from:i,to:a,text:r.text,removed:r.removed,origin:r.origin};u&&lt(e,"change",e,p),s&&(e.curOp.changeObjs||(e.curOp.changeObjs=[])).push(p)}e.display.selForContextMenu=null}(e.cm,r,o):Nn(e,r,o),ei(e,t,D),e.cantEdit&&ii(e,er(e.firstLine(),0))&&(e.cantEdit=!1)}}function hi(e,r,t,o,n){var i;o||(o=t),rr(o,t)<0&&(t=(i=[o,t])[0],o=i[1]),"string"==typeof r&&(r=e.splitLines(r)),di(e,{from:t,to:o,text:r,origin:n})}function fi(e,r,t,o){t<e.line?e.line+=o:r<e.line&&(e.line=r,e.ch=0)}function bi(e,r,t,o){for(var n=0;n<e.length;++n){var i=e[n],a=!0;if(i.ranges){i.copied||((i=e[n]=i.deepCopy()).copied=!0);for(var l=0;l<i.ranges.length;l++)fi(i.ranges[l].anchor,r,t,o),fi(i.ranges[l].head,r,t,o)}else{for(var c=0;c<i.changes.length;++c){var d=i.changes[c];if(t<d.from.line)d.from=er(d.from.line+o,d.from.ch),d.to=er(d.to.line+o,d.to.ch);else if(r<=d.to.line){a=!1;break}}a||(e.splice(0,n+1),n=0)}}}function mi(e,r){var t=r.from.line,o=r.to.line,n=r.text.length-(o-t)-1;bi(e.done,t,o,n),bi(e.undone,t,o,n)}function yi(e,r,t,o){var n=r,i=r;return"number"==typeof r?i=Ze(e,ar(e,r)):n=Qe(r),null==n?null:(o(i,n)&&e.cm&&po(e.cm,n,t),i)}function vi(e){this.lines=e,this.parent=null;for(var r=0,t=0;t<e.length;++t)e[t].parent=this,r+=e[t].height;this.height=r}function ki(e){this.children=e;for(var r=0,t=0,o=0;o<e.length;++o){var n=e[o];r+=n.chunkSize(),t+=n.height,n.parent=this}this.size=r,this.height=t,this.parent=null}Sn.prototype.from=function(){return ir(this.anchor,this.head)},Sn.prototype.to=function(){return nr(this.anchor,this.head)},Sn.prototype.empty=function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch},vi.prototype={chunkSize:function(){return this.lines.length},removeInner:function(e,r){for(var t=e,o=e+r;t<o;++t){var n=this.lines[t];this.height-=n.height,Jr(n),lt(n,"delete")}this.lines.splice(e,r)},collapse:function(e){e.push.apply(e,this.lines)},insertInner:function(e,r,t){this.height+=t,this.lines=this.lines.slice(0,e).concat(r).concat(this.lines.slice(e));for(var o=0;o<r.length;++o)r[o].parent=this},iterN:function(e,r,t){for(var o=e+r;e<o;++e)if(t(this.lines[e]))return!0}},ki.prototype={chunkSize:function(){return this.size},removeInner:function(e,r){this.size-=r;for(var t=0;t<this.children.length;++t){var o=this.children[t],n=o.chunkSize();if(e<n){var i=Math.min(r,n-e),a=o.height;if(o.removeInner(e,i),this.height-=a-o.height,n==i&&(this.children.splice(t--,1),o.parent=null),0==(r-=i))break;e=0}else e-=n}if(this.size-r<25&&(this.children.length>1||!(this.children[0]instanceof vi))){var l=[];this.collapse(l),this.children=[new vi(l)],this.children[0].parent=this}},collapse:function(e){for(var r=0;r<this.children.length;++r)this.children[r].collapse(e)},insertInner:function(e,r,t){this.size+=r.length,this.height+=t;for(var o=0;o<this.children.length;++o){var n=this.children[o],i=n.chunkSize();if(e<=i){if(n.insertInner(e,r,t),n.lines&&n.lines.length>50){for(var a=n.lines.length%25+25,l=a;l<n.lines.length;){var c=new vi(n.lines.slice(l,l+=25));n.height-=c.height,this.children.splice(++o,0,c),c.parent=this}n.lines=n.lines.slice(0,a),this.maybeSpill()}break}e-=i}},maybeSpill:function(){if(!(this.children.length<=10)){var e=this;do{var r=new ki(e.children.splice(e.children.length-5,5));if(e.parent){e.size-=r.size,e.height-=r.height;var t=U(e.parent.children,e);e.parent.children.splice(t+1,0,r)}else{var o=new ki(e.children);o.parent=e,e.children=[o,r],e=o}r.parent=e.parent}while(e.children.length>10);e.parent.maybeSpill()}},iterN:function(e,r,t){for(var o=0;o<this.children.length;++o){var n=this.children[o],i=n.chunkSize();if(e<i){var a=Math.min(r,i-e);if(n.iterN(e,a,t))return!0;if(0==(r-=a))break;e=0}else e-=i}}};var wi=function(e,r,t){if(t)for(var o in t)t.hasOwnProperty(o)&&(this[o]=t[o]);this.doc=e,this.node=r};function Ci(e,r,t){jr(r)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&_o(e,t)}wi.prototype.clear=function(){var e=this.doc.cm,r=this.line.widgets,t=this.line,o=Qe(t);if(null!=o&&r){for(var n=0;n<r.length;++n)r[n]==this&&r.splice(n--,1);r.length||(t.widgets=null);var i=kt(this);Ge(t,Math.max(0,t.height-i)),e&&($o(e,(function(){Ci(e,t,-i),po(e,o,"widget")})),lt(e,"lineWidgetCleared",e,this,o))}},wi.prototype.changed=function(){var e=this,r=this.height,t=this.doc.cm,o=this.line;this.height=null;var n=kt(this)-r;n&&(Br(this.doc,o)||Ge(o,o.height+n),t&&$o(t,(function(){t.curOp.forceUpdate=!0,Ci(t,o,n),lt(t,"lineWidgetChanged",t,e,Qe(o))})))},ye(wi);var xi=0,Si=function(e,r){this.lines=[],this.type=r,this.doc=e,this.id=++xi};function Ti(e,r,t,o,n){if(o&&o.shared)return function(e,r,t,o,n){(o=W(o)).shared=!1;var i=[Ti(e,r,t,o,n)],a=i[0],l=o.widgetNode;return Fn(e,(function(e){l&&(o.widgetNode=l.cloneNode(!0)),i.push(Ti(e,lr(e,r),lr(e,t),o,n));for(var c=0;c<e.linked.length;++c)if(e.linked[c].isParent)return;a=q(i)})),new Li(i,a)}(e,r,t,o,n);if(e.cm&&!e.cm.curOp)return en(e.cm,Ti)(e,r,t,o,n);var i=new Si(e,n),a=rr(r,t);if(o&&W(o,i,!1),a>0||0==a&&!1!==i.clearWhenEmpty)return i;if(i.replacedWith&&(i.collapsed=!0,i.widgetNode=_("span",[i.replacedWith],"CodeMirror-widget"),o.handleMouseEvents||i.widgetNode.setAttribute("cm-ignore-events","true"),o.insertLeft&&(i.widgetNode.insertLeft=!0)),i.collapsed){if(Wr(e,r.line,r,t,i)||r.line!=t.line&&Wr(e,t.line,r,t,i))throw Error("Inserting collapsed marker partially overlapping an existing one");Cr=!0}i.addToHistory&&Bn(e,{from:r,to:t,origin:"markText"},e.sel,NaN);var l,c=r.line,d=e.cm;if(e.iter(c,t.line+1,(function(e){d&&i.collapsed&&!d.options.lineWrapping&&Pr(e)==d.display.maxLine&&(l=!0),i.collapsed&&c!=r.line&&Ge(e,0),function(e,r){e.markedSpans=e.markedSpans?e.markedSpans.concat([r]):[r],r.marker.attachLine(e)}(e,new xr(i,c==r.line?r.ch:null,c==t.line?t.ch:null)),++c})),i.collapsed&&e.iter(r.line,t.line+1,(function(r){Br(e,r)&&Ge(r,0)})),i.clearOnEnter&&ue(i,"beforeCursorEnter",(function(){return i.clear()})),i.readOnly&&(wr=!0,(e.history.done.length||e.history.undone.length)&&e.clearHistory()),i.collapsed&&(i.id=++xi,i.atomic=!0),d){if(l&&(d.curOp.updateMaxLine=!0),i.collapsed)uo(d,r.line,t.line+1);else if(i.className||i.startStyle||i.endStyle||i.css||i.attributes||i.title)for(var s=r.line;s<=t.line;s++)po(d,s,"text");i.atomic&&ti(d.doc),lt(d,"markerAdded",d,i)}return i}Si.prototype.clear=function(){if(!this.explicitlyCleared){var e=this.doc.cm,r=e&&!e.curOp;if(r&&Zo(e),me(this,"clear")){var t=this.find();t&&lt(this,"clear",t.from,t.to)}for(var o=null,n=null,i=0;i<this.lines.length;++i){var a=this.lines[i],l=Sr(a.markedSpans,this);e&&!this.collapsed?po(e,Qe(a),"text"):e&&(null!=l.to&&(n=Qe(a)),null!=l.from&&(o=Qe(a))),a.markedSpans=Tr(a.markedSpans,l),null==l.from&&this.collapsed&&!Br(this.doc,a)&&e&&Ge(a,to(e.display))}if(e&&this.collapsed&&!e.options.lineWrapping)for(var c=0;c<this.lines.length;++c){var d=Pr(this.lines[c]),s=Hr(d);s>e.display.maxLineLength&&(e.display.maxLine=d,e.display.maxLineLength=s,e.display.maxLineChanged=!0)}null!=o&&e&&this.collapsed&&uo(e,o,n+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,e&&ti(e.doc)),e&&lt(e,"markerCleared",e,this,o,n),r&&Jo(e),this.parent&&this.parent.clear()}},Si.prototype.find=function(e,r){var t,o;null==e&&"bookmark"==this.type&&(e=1);for(var n=0;n<this.lines.length;++n){var i=this.lines[n],a=Sr(i.markedSpans,this);if(null!=a.from&&(t=er(r?i:Qe(i),a.from),-1==e))return t;if(null!=a.to&&(o=er(r?i:Qe(i),a.to),1==e))return o}return t&&{from:t,to:o}},Si.prototype.changed=function(){var e=this,r=this.find(-1,!0),t=this,o=this.doc.cm;r&&o&&$o(o,(function(){var n=r.line,i=Qe(r.line),a=_t(o,i);if(a&&(Wt(a),o.curOp.selectionChanged=o.curOp.forceUpdate=!0),o.curOp.updateMaxLine=!0,!Br(t.doc,n)&&null!=t.height){var l=t.height;t.height=null;var c=kt(t)-l;c&&Ge(n,n.height+c)}lt(o,"markerChanged",o,e)}))},Si.prototype.attachLine=function(e){if(!this.lines.length&&this.doc.cm){var r=this.doc.cm.curOp;r.maybeHiddenMarkers&&-1!=U(r.maybeHiddenMarkers,this)||(r.maybeUnhiddenMarkers||(r.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(e)},Si.prototype.detachLine=function(e){if(this.lines.splice(U(this.lines,e),1),!this.lines.length&&this.doc.cm){var r=this.doc.cm.curOp;(r.maybeHiddenMarkers||(r.maybeHiddenMarkers=[])).push(this)}},ye(Si);var Li=function(e,r){this.markers=e,this.primary=r;for(var t=0;t<e.length;++t)e[t].parent=this};function Ei(e){return e.findMarks(er(e.first,0),e.clipPos(er(e.lastLine())),(function(e){return e.parent}))}function Oi(e){for(var r=function(r){var t=e[r],o=[t.primary.doc];Fn(t.primary.doc,(function(e){return o.push(e)}));for(var n=0;n<t.markers.length;n++){var i=t.markers[n];-1==U(o,i.doc)&&(i.parent=null,t.markers.splice(n--,1))}},t=0;t<e.length;t++)r(t)}Li.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=!0;for(var e=0;e<this.markers.length;++e)this.markers[e].clear();lt(this,"clear")}},Li.prototype.find=function(e,r){return this.primary.find(e,r)},ye(Li);var Ai=0,_i=function(e,r,t,o,n){if(!(this instanceof _i))return new _i(e,r,t,o,n);null==t&&(t=0),ki.call(this,[new vi([new Zr("",null)])]),this.first=t,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.modeFrontier=this.highlightFrontier=t;var i=er(t,0);this.sel=Ln(i),this.history=new Pn(null),this.id=++Ai,this.modeOption=r,this.lineSep=o,this.direction="rtl"==n?"rtl":"ltr",this.extend=!1,"string"==typeof e&&(e=this.splitLines(e)),Nn(this,{from:i,to:i,text:e}),$n(this,Ln(i),D)};_i.prototype=Y(ki.prototype,{constructor:_i,iter:function(e,r,t){t?this.iterN(e-this.first,r-e,t):this.iterN(this.first,this.first+this.size,e)},insert:function(e,r){for(var t=0,o=0;o<r.length;++o)t+=r[o].height;this.insertInner(e-this.first,r,t)},remove:function(e,r){this.removeInner(e-this.first,r)},getValue:function(e){var r=qe(this,this.first,this.first+this.size);return!1===e?r:r.join(e||this.lineSeparator())},setValue:tn((function(e){var r=er(this.first,0),t=this.first+this.size-1;di(this,{from:r,to:er(t,Ze(this,t).text.length),text:this.splitLines(e),origin:"setValue",full:!0},!0),this.cm&&Ro(this.cm,0,0),$n(this,Ln(r),D)})),replaceRange:function(e,r,t,o){hi(this,e,r=lr(this,r),t=t?lr(this,t):r,o)},getRange:function(e,r,t){var o=Je(this,lr(this,e),lr(this,r));return!1===t?o:o.join(t||this.lineSeparator())},getLine:function(e){var r=this.getLineHandle(e);return r&&r.text},getLineHandle:function(e){if(Xe(this,e))return Ze(this,e)},getLineNumber:function(e){return Qe(e)},getLineHandleVisualStart:function(e){return"number"==typeof e&&(e=Ze(this,e)),Pr(e)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(e){return lr(this,e)},getCursor:function(e){var r=this.sel.primary();return null==e||"head"==e?r.head:"anchor"==e?r.anchor:"end"==e||"to"==e||!1===e?r.to():r.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:tn((function(e,r,t){Yn(this,lr(this,"number"==typeof e?er(e,r||0):e),null,t)})),setSelection:tn((function(e,r,t){Yn(this,lr(this,e),lr(this,r||e),t)})),extendSelection:tn((function(e,r,t){qn(this,lr(this,e),r&&lr(this,r),t)})),extendSelections:tn((function(e,r){Gn(this,cr(this,e),r)})),extendSelectionsBy:tn((function(e,r){Gn(this,cr(this,G(this.sel.ranges,e)),r)})),setSelections:tn((function(e,r,t){if(e.length){for(var o=[],n=0;n<e.length;n++)o[n]=new Sn(lr(this,e[n].anchor),lr(this,e[n].head));null==r&&(r=Math.min(e.length-1,this.sel.primIndex)),$n(this,Tn(this.cm,o,r),t)}})),addSelection:tn((function(e,r,t){var o=this.sel.ranges.slice(0);o.push(new Sn(lr(this,e),lr(this,r||e))),$n(this,Tn(this.cm,o,o.length-1),t)})),getSelection:function(e){for(var r,t=this.sel.ranges,o=0;o<t.length;o++){var n=Je(this,t[o].from(),t[o].to());r=r?r.concat(n):n}return!1===e?r:r.join(e||this.lineSeparator())},getSelections:function(e){for(var r=[],t=this.sel.ranges,o=0;o<t.length;o++){var n=Je(this,t[o].from(),t[o].to());!1!==e&&(n=n.join(e||this.lineSeparator())),r[o]=n}return r},replaceSelection:function(e,r,t){for(var o=[],n=0;n<this.sel.ranges.length;n++)o[n]=e;this.replaceSelections(o,r,t||"+input")},replaceSelections:tn((function(e,r,t){for(var o=[],n=this.sel,i=0;i<n.ranges.length;i++){var a=n.ranges[i];o[i]={from:a.from(),to:a.to(),text:this.splitLines(e[i]),origin:t}}for(var l=r&&"end"!=r&&function(e,r,t){for(var o=[],n=er(e.first,0),i=n,a=0;a<r.length;a++){var l=r[a],c=_n(l.from,n,i),d=_n(En(l),n,i);if(n=l.to,i=d,"around"==t){var s=e.sel.ranges[a],u=rr(s.head,s.anchor)<0;o[a]=new Sn(u?d:c,u?c:d)}else o[a]=new Sn(c,c)}return new xn(o,e.sel.primIndex)}(this,o,r),c=o.length-1;c>=0;c--)di(this,o[c]);l?Xn(this,l):this.cm&&Mo(this.cm)})),undo:tn((function(){ui(this,"undo")})),redo:tn((function(){ui(this,"redo")})),undoSelection:tn((function(){ui(this,"undo",!0)})),redoSelection:tn((function(){ui(this,"redo",!0)})),setExtending:function(e){this.extend=e},getExtending:function(){return this.extend},historySize:function(){for(var e=this.history,r=0,t=0,o=0;o<e.done.length;o++)e.done[o].ranges||++r;for(var n=0;n<e.undone.length;n++)e.undone[n].ranges||++t;return{undo:r,redo:t}},clearHistory:function(){var e=this;this.history=new Pn(this.history.maxGeneration),Fn(this,(function(r){return r.history=e.history}),!0)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(e){return e&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(e){return this.history.generation==(e||this.cleanGeneration)},getHistory:function(){return{done:Zn(this.history.done),undone:Zn(this.history.undone)}},setHistory:function(e){var r=this.history=new Pn(this.history.maxGeneration);r.done=Zn(e.done.slice(0),null,!0),r.undone=Zn(e.undone.slice(0),null,!0)},setGutterMarker:tn((function(e,r,t){return yi(this,e,"gutter",(function(e){var o=e.gutterMarkers||(e.gutterMarkers={});return o[r]=t,!t&&re(o)&&(e.gutterMarkers=null),!0}))})),clearGutter:tn((function(e){var r=this;this.iter((function(t){t.gutterMarkers&&t.gutterMarkers[e]&&yi(r,t,"gutter",(function(){return t.gutterMarkers[e]=null,re(t.gutterMarkers)&&(t.gutterMarkers=null),!0}))}))})),lineInfo:function(e){var r;if("number"==typeof e){if(!Xe(this,e))return null;if(r=e,!(e=Ze(this,e)))return null}else if(null==(r=Qe(e)))return null;return{line:r,handle:e,text:e.text,gutterMarkers:e.gutterMarkers,textClass:e.textClass,bgClass:e.bgClass,wrapClass:e.wrapClass,widgets:e.widgets}},addLineClass:tn((function(e,r,t){return yi(this,e,"gutter"==r?"gutter":"class",(function(e){var o="text"==r?"textClass":"background"==r?"bgClass":"gutter"==r?"gutterClass":"wrapClass";if(e[o]){if(S(t).test(e[o]))return!1;e[o]+=" "+t}else e[o]=t;return!0}))})),removeLineClass:tn((function(e,r,t){return yi(this,e,"gutter"==r?"gutter":"class",(function(e){var o="text"==r?"textClass":"background"==r?"bgClass":"gutter"==r?"gutterClass":"wrapClass",n=e[o];if(!n)return!1;if(null==t)e[o]=null;else{var i=n.match(S(t));if(!i)return!1;var a=i.index+i[0].length;e[o]=n.slice(0,i.index)+(i.index&&a!=n.length?" ":"")+n.slice(a)||null}return!0}))})),addLineWidget:tn((function(e,r,t){return function(e,r,t,o){var n=new wi(e,t,o),i=e.cm;return i&&n.noHScroll&&(i.display.alignWidgets=!0),yi(e,r,"widget",(function(r){var t=r.widgets||(r.widgets=[]);if(null==n.insertAt?t.push(n):t.splice(Math.min(t.length-1,Math.max(0,n.insertAt)),0,n),n.line=r,i&&!Br(e,r)){var o=jr(r)<e.scrollTop;Ge(r,r.height+kt(n)),o&&_o(i,n.height),i.curOp.forceUpdate=!0}return!0})),i&&lt(i,"lineWidgetAdded",i,n,"number"==typeof r?r:Qe(r)),n}(this,e,r,t)})),removeLineWidget:function(e){e.clear()},markText:function(e,r,t){return Ti(this,lr(this,e),lr(this,r),t,t&&t.type||"range")},setBookmark:function(e,r){var t={replacedWith:r&&(null==r.nodeType?r.widget:r),insertLeft:r&&r.insertLeft,clearWhenEmpty:!1,shared:r&&r.shared,handleMouseEvents:r&&r.handleMouseEvents};return Ti(this,e=lr(this,e),e,t,"bookmark")},findMarksAt:function(e){var r=[],t=Ze(this,(e=lr(this,e)).line).markedSpans;if(t)for(var o=0;o<t.length;++o){var n=t[o];(null==n.from||n.from<=e.ch)&&(null==n.to||n.to>=e.ch)&&r.push(n.marker.parent||n.marker)}return r},findMarks:function(e,r,t){e=lr(this,e),r=lr(this,r);var o=[],n=e.line;return this.iter(e.line,r.line+1,(function(i){var a=i.markedSpans;if(a)for(var l=0;l<a.length;l++){var c=a[l];null!=c.to&&n==e.line&&e.ch>=c.to||null==c.from&&n!=e.line||null!=c.from&&n==r.line&&c.from>=r.ch||t&&!t(c.marker)||o.push(c.marker.parent||c.marker)}++n})),o},getAllMarks:function(){var e=[];return this.iter((function(r){var t=r.markedSpans;if(t)for(var o=0;o<t.length;++o)null!=t[o].from&&e.push(t[o].marker)})),e},posFromIndex:function(e){var r,t=this.first,o=this.lineSeparator().length;return this.iter((function(n){var i=n.text.length+o;if(i>e)return r=e,!0;e-=i,++t})),lr(this,er(t,r))},indexFromPos:function(e){var r=(e=lr(this,e)).ch;if(e.line<this.first||e.ch<0)return 0;var t=this.lineSeparator().length;return this.iter(this.first,e.line,(function(e){r+=e.text.length+t})),r},copy:function(e){var r=new _i(qe(this,this.first,this.first+this.size),this.modeOption,this.first,this.lineSep,this.direction);return r.scrollTop=this.scrollTop,r.scrollLeft=this.scrollLeft,r.sel=this.sel,r.extend=!1,e&&(r.history.undoDepth=this.history.undoDepth,r.setHistory(this.getHistory())),r},linkedDoc:function(e){e||(e={});var r=this.first,t=this.first+this.size;null!=e.from&&e.from>r&&(r=e.from),null!=e.to&&e.to<t&&(t=e.to);var o=new _i(qe(this,r,t),e.mode||this.modeOption,r,this.lineSep,this.direction);return e.sharedHist&&(o.history=this.history),(this.linked||(this.linked=[])).push({doc:o,sharedHist:e.sharedHist}),o.linked=[{doc:this,isParent:!0,sharedHist:e.sharedHist}],function(e,r){for(var t=0;t<r.length;t++){var o=r[t],n=o.find(),i=e.clipPos(n.from),a=e.clipPos(n.to);if(rr(i,a)){var l=Ti(e,i,a,o.primary,o.primary.type);o.markers.push(l),l.parent=o}}}(o,Ei(this)),o},unlinkDoc:function(e){if(e instanceof Ta&&(e=e.doc),this.linked)for(var r=0;r<this.linked.length;++r)if(this.linked[r].doc==e){this.linked.splice(r,1),e.unlinkDoc(this),Oi(Ei(this));break}if(e.history==this.history){var t=[e.id];Fn(e,(function(e){return t.push(e.id)}),!0),e.history=new Pn(null),e.history.done=Zn(this.history.done,t),e.history.undone=Zn(this.history.undone,t)}},iterLinkedDocs:function(e){Fn(this,e)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(e){return this.lineSep?e.split(this.lineSep):Me(e)},lineSeparator:function(){return this.lineSep||"\n"},setDirection:tn((function(e){var r;"rtl"!=e&&(e="ltr"),e!=this.direction&&(this.direction=e,this.iter((function(e){return e.order=null})),this.cm&&$o(r=this.cm,(function(){Wn(r),uo(r)})))}))}),_i.prototype.eachLine=_i.prototype.iter;var Mi=0;function Ri(e){var r=this;if(zi(r),!fe(r,e)&&!wt(r.display,e)){ve(e),a&&(Mi=+new Date);var t=co(r,e,!0),o=e.dataTransfer.files;if(t&&!r.isReadOnly())if(o&&o.length&&window.FileReader&&window.File)for(var n=o.length,i=Array(n),l=0,c=function(){++l==n&&en(r,(function(){var e={from:t=lr(r.doc,t),to:t,text:r.doc.splitLines(i.filter((function(e){return null!=e})).join(r.doc.lineSeparator())),origin:"paste"};di(r.doc,e),Xn(r.doc,Ln(lr(r.doc,t),lr(r.doc,En(e))))}))()},d=function(e,t){if(r.options.allowDropFileTypes&&-1==U(r.options.allowDropFileTypes,e.type))c();else{var o=new FileReader;o.onerror=function(){return c()},o.onload=function(){var e=o.result;/[\x00-\x08\x0e-\x1f]{2}/.test(e)||(i[t]=e),c()},o.readAsText(e)}},s=0;s<o.length;s++)d(o[s],s);else{if(r.state.draggingText&&r.doc.sel.contains(t)>-1)return r.state.draggingText(e),void setTimeout((function(){return r.display.input.focus()}),20);try{var u=e.dataTransfer.getData("Text");if(u){var p;if(r.state.draggingText&&!r.state.draggingText.copy&&(p=r.listSelections()),ei(r.doc,Ln(t,t)),p)for(var g=0;g<p.length;++g)hi(r.doc,"",p[g].anchor,p[g].head,"drag");r.replaceSelection(u,"around","paste"),r.display.input.focus()}}catch(e){}}}}function zi(e){e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor),e.display.dragCursor=null)}function Ni(e){if(document.getElementsByClassName){for(var r=document.getElementsByClassName("CodeMirror"),t=[],o=0;o<r.length;o++){var n=r[o].CodeMirror;n&&t.push(n)}t.length&&t[0].operation((function(){for(var r=0;r<t.length;r++)e(t[r])}))}}var Fi=!1;function Ii(e){var r=e.display;r.cachedCharWidth=r.cachedTextHeight=r.cachedPaddingH=null,r.scrollbarsClipped=!1,e.setSize()}for(var Wi={3:"Pause",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"=",109:"-",110:".",111:"/",145:"ScrollLock",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",224:"Mod",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"},Pi=0;Pi<10;Pi++)Wi[Pi+48]=Wi[Pi+96]=Pi+"";for(var Ki=65;Ki<=90;Ki++)Wi[Ki]=String.fromCharCode(Ki);for(var Ui=1;Ui<=12;Ui++)Wi[Ui+111]=Wi[Ui+63235]="F"+Ui;var Bi={};function Di(e){var r,t,o,n,i=e.split(/-(?!$)/);e=i[i.length-1];for(var a=0;a<i.length-1;a++){var l=i[a];if(/^(cmd|meta|m)$/i.test(l))n=!0;else if(/^a(lt)?$/i.test(l))r=!0;else if(/^(c|ctrl|control)$/i.test(l))t=!0;else{if(!/^s(hift)?$/i.test(l))throw Error("Unrecognized modifier name: "+l);o=!0}}return r&&(e="Alt-"+e),t&&(e="Ctrl-"+e),n&&(e="Cmd-"+e),o&&(e="Shift-"+e),e}function ji(e){var r={};for(var t in e)if(e.hasOwnProperty(t)){var o=e[t];if(/^(name|fallthrough|(de|at)tach)$/.test(t))continue;if("..."==o){delete e[t];continue}for(var n=G(t.split(" "),Di),i=0;i<n.length;i++){var a=void 0,l=void 0;i==n.length-1?(l=n.join(" "),a=o):(l=n.slice(0,i+1).join(" "),a="...");var c=r[l];if(c){if(c!=a)throw Error("Inconsistent bindings for "+l)}else r[l]=a}delete e[t]}for(var d in r)e[d]=r[d];return e}function Hi(e,r,t,o){var n=(r=qi(r)).call?r.call(e,o):r[e];if(!1===n)return"nothing";if("..."===n)return"multi";if(null!=n&&t(n))return"handled";if(r.fallthrough){if("[object Array]"!=Object.prototype.toString.call(r.fallthrough))return Hi(e,r.fallthrough,t,o);for(var i=0;i<r.fallthrough.length;i++){var a=Hi(e,r.fallthrough[i],t,o);if(a)return a}}}function Vi(e){var r="string"==typeof e?e:Wi[e.keyCode];return"Ctrl"==r||"Alt"==r||"Shift"==r||"Mod"==r}function Zi(e,r,t){var o=e;return r.altKey&&"Alt"!=o&&(e="Alt-"+e),(C?r.metaKey:r.ctrlKey)&&"Ctrl"!=o&&(e="Ctrl-"+e),(C?r.ctrlKey:r.metaKey)&&"Mod"!=o&&(e="Cmd-"+e),!t&&r.shiftKey&&"Shift"!=o&&(e="Shift-"+e),e}function Ji(e,r){if(u&&34==e.keyCode&&e.char)return!1;var t=Wi[e.keyCode];return null!=t&&!e.altGraphKey&&(3==e.keyCode&&e.code&&(t=e.code),Zi(t,e,r))}function qi(e){return"string"==typeof e?Bi[e]:e}function Gi(e,r){for(var t=e.doc.sel.ranges,o=[],n=0;n<t.length;n++){for(var i=r(t[n]);o.length&&rr(i.from,q(o).to)<=0;){var a=o.pop();if(rr(a.from,i.from)<0){i.from=a.from;break}}o.push(i)}$o(e,(function(){for(var r=o.length-1;r>=0;r--)hi(e.doc,"",o[r].from,o[r].to,"+delete");Mo(e)}))}function Qi(e,r,t){var o=ne(e.text,r+t,t);return o<0||o>e.text.length?null:o}function Yi(e,r,t){var o=Qi(e,r.ch,t);return null==o?null:new er(r.line,o,t<0?"after":"before")}function Xi(e,r,t,o,n){if(e){"rtl"==r.doc.direction&&(n=-n);var i=de(t,r.doc.direction);if(i){var a,l=n<0?q(i):i[0],c=n<0==(1==l.level)?"after":"before";if(l.level>0||"rtl"==r.doc.direction){var d=Mt(r,t);a=n<0?t.text.length-1:0;var s=Rt(r,d,a).top;a=ie((function(e){return Rt(r,d,e).top==s}),n<0==(1==l.level)?l.from:l.to-1,a),"before"==c&&(a=Qi(t,a,1))}else a=n<0?l.to:l.from;return new er(o,a,c)}}return new er(o,n<0?t.text.length:0,n<0?"before":"after")}Bi.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},Bi.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},Bi.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars","Ctrl-O":"openLine"},Bi.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},Bi.default=y?Bi.macDefault:Bi.pcDefault;var $i={selectAll:li,singleSelection:function(e){return e.setSelection(e.getCursor("anchor"),e.getCursor("head"),D)},killLine:function(e){return Gi(e,(function(r){if(r.empty()){var t=Ze(e.doc,r.head.line).text.length;return r.head.ch==t&&r.head.line<e.lastLine()?{from:r.head,to:er(r.head.line+1,0)}:{from:r.head,to:er(r.head.line,t)}}return{from:r.from(),to:r.to()}}))},deleteLine:function(e){return Gi(e,(function(r){return{from:er(r.from().line,0),to:lr(e.doc,er(r.to().line+1,0))}}))},delLineLeft:function(e){return Gi(e,(function(e){return{from:er(e.from().line,0),to:e.from()}}))},delWrappedLineLeft:function(e){return Gi(e,(function(r){var t=e.charCoords(r.head,"div").top+5;return{from:e.coordsChar({left:0,top:t},"div"),to:r.from()}}))},delWrappedLineRight:function(e){return Gi(e,(function(r){var t=e.charCoords(r.head,"div").top+5,o=e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:t},"div");return{from:r.from(),to:o}}))},undo:function(e){return e.undo()},redo:function(e){return e.redo()},undoSelection:function(e){return e.undoSelection()},redoSelection:function(e){return e.redoSelection()},goDocStart:function(e){return e.extendSelection(er(e.firstLine(),0))},goDocEnd:function(e){return e.extendSelection(er(e.lastLine()))},goLineStart:function(e){return e.extendSelectionsBy((function(r){return ea(e,r.head.line)}),{origin:"+move",bias:1})},goLineStartSmart:function(e){return e.extendSelectionsBy((function(r){return ra(e,r.head)}),{origin:"+move",bias:1})},goLineEnd:function(e){return e.extendSelectionsBy((function(r){return function(e,r){var t=Ze(e.doc,r),o=function(e){for(var r;r=Fr(e);)e=r.find(1,!0).line;return e}(t);return o!=t&&(r=Qe(o)),Xi(!0,e,t,r,-1)}(e,r.head.line)}),{origin:"+move",bias:-1})},goLineRight:function(e){return e.extendSelectionsBy((function(r){var t=e.cursorCoords(r.head,"div").top+5;return e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:t},"div")}),H)},goLineLeft:function(e){return e.extendSelectionsBy((function(r){var t=e.cursorCoords(r.head,"div").top+5;return e.coordsChar({left:0,top:t},"div")}),H)},goLineLeftSmart:function(e){return e.extendSelectionsBy((function(r){var t=e.cursorCoords(r.head,"div").top+5,o=e.coordsChar({left:0,top:t},"div");return o.ch<e.getLine(o.line).search(/\S/)?ra(e,r.head):o}),H)},goLineUp:function(e){return e.moveV(-1,"line")},goLineDown:function(e){return e.moveV(1,"line")},goPageUp:function(e){return e.moveV(-1,"page")},goPageDown:function(e){return e.moveV(1,"page")},goCharLeft:function(e){return e.moveH(-1,"char")},goCharRight:function(e){return e.moveH(1,"char")},goColumnLeft:function(e){return e.moveH(-1,"column")},goColumnRight:function(e){return e.moveH(1,"column")},goWordLeft:function(e){return e.moveH(-1,"word")},goGroupRight:function(e){return e.moveH(1,"group")},goGroupLeft:function(e){return e.moveH(-1,"group")},goWordRight:function(e){return e.moveH(1,"word")},delCharBefore:function(e){return e.deleteH(-1,"codepoint")},delCharAfter:function(e){return e.deleteH(1,"char")},delWordBefore:function(e){return e.deleteH(-1,"word")},delWordAfter:function(e){return e.deleteH(1,"word")},delGroupBefore:function(e){return e.deleteH(-1,"group")},delGroupAfter:function(e){return e.deleteH(1,"group")},indentAuto:function(e){return e.indentSelection("smart")},indentMore:function(e){return e.indentSelection("add")},indentLess:function(e){return e.indentSelection("subtract")},insertTab:function(e){return e.replaceSelection("\t")},insertSoftTab:function(e){for(var r=[],t=e.listSelections(),o=e.options.tabSize,n=0;n<t.length;n++){var i=t[n].from(),a=P(e.getLine(i.line),i.ch,o);r.push(J(o-a%o))}e.replaceSelections(r)},defaultTab:function(e){e.somethingSelected()?e.indentSelection("add"):e.execCommand("insertTab")},transposeChars:function(e){return $o(e,(function(){for(var r=e.listSelections(),t=[],o=0;o<r.length;o++)if(r[o].empty()){var n=r[o].head,i=Ze(e.doc,n.line).text;if(i)if(n.ch==i.length&&(n=new er(n.line,n.ch-1)),n.ch>0)n=new er(n.line,n.ch+1),e.replaceRange(i.charAt(n.ch-1)+i.charAt(n.ch-2),er(n.line,n.ch-2),n,"+transpose");else if(n.line>e.doc.first){var a=Ze(e.doc,n.line-1).text;a&&(n=new er(n.line,1),e.replaceRange(i.charAt(0)+e.doc.lineSeparator()+a.charAt(a.length-1),er(n.line-1,a.length-1),n,"+transpose"))}t.push(new Sn(n,n))}e.setSelections(t)}))},newlineAndIndent:function(e){return $o(e,(function(){for(var r=e.listSelections(),t=r.length-1;t>=0;t--)e.replaceRange(e.doc.lineSeparator(),r[t].anchor,r[t].head,"+input");r=e.listSelections();for(var o=0;o<r.length;o++)e.indentLine(r[o].from().line,null,!0);Mo(e)}))},openLine:function(e){return e.replaceSelection("\n","start")},toggleOverwrite:function(e){return e.toggleOverwrite()}};function ea(e,r){var t=Ze(e.doc,r),o=Pr(t);return o!=t&&(r=Qe(o)),Xi(!0,e,o,r,1)}function ra(e,r){var t=ea(e,r.line),o=Ze(e.doc,t.line),n=de(o,e.doc.direction);if(!n||0==n[0].level){var i=Math.max(t.ch,o.text.search(/\S/)),a=r.line==t.line&&r.ch<=i&&r.ch;return er(t.line,a?0:i,t.sticky)}return t}function ta(e,r,t){if("string"==typeof r&&!(r=$i[r]))return!1;e.display.input.ensurePolled();var o=e.display.shift,n=!1;try{e.isReadOnly()&&(e.state.suppressEdits=!0),t&&(e.display.shift=!1),n=r(e)!=B}finally{e.display.shift=o,e.state.suppressEdits=!1}return n}var oa=new K;function na(e,r,t,o){var n=e.state.keySeq;if(n){if(Vi(r))return"handled";if(/\'$/.test(r)?e.state.keySeq=null:oa.set(50,(function(){e.state.keySeq==n&&(e.state.keySeq=null,e.display.input.reset())})),ia(e,n+" "+r,t,o))return!0}return ia(e,r,t,o)}function ia(e,r,t,o){var n=function(e,r,t){for(var o=0;o<e.state.keyMaps.length;o++){var n=Hi(r,e.state.keyMaps[o],t,e);if(n)return n}return e.options.extraKeys&&Hi(r,e.options.extraKeys,t,e)||Hi(r,e.options.keyMap,t,e)}(e,r,o);return"multi"==n&&(e.state.keySeq=r),"handled"==n&&lt(e,"keyHandled",e,r,t),"handled"!=n&&"multi"!=n||(ve(t),wo(e)),!!n}function aa(e,r){var t=Ji(r,!0);return!!t&&(r.shiftKey&&!e.state.keySeq?na(e,"Shift-"+t,r,(function(r){return ta(e,r,!0)}))||na(e,t,r,(function(r){if("string"==typeof r?/^go[A-Z]/.test(r):r.motion)return ta(e,r)})):na(e,t,r,(function(r){return ta(e,r)})))}var la=null;function ca(e){var r=this;if(!(e.target&&e.target!=r.display.input.getField()||(r.curOp.focus=R(),fe(r,e)))){a&&l<11&&27==e.keyCode&&(e.returnValue=!1);var o=e.keyCode;r.display.shift=16==o||e.shiftKey;var n=aa(r,e);u&&(la=n?o:null,n||88!=o||ze||!(y?e.metaKey:e.ctrlKey)||r.replaceSelection("",null,"cut")),t&&!y&&!n&&46==o&&e.shiftKey&&!e.ctrlKey&&document.execCommand&&document.execCommand("cut"),18!=o||/\bCodeMirror-crosshair\b/.test(r.display.lineDiv.className)||function(e){var r=e.display.lineDiv;function t(e){18!=e.keyCode&&e.altKey||(L(r,"CodeMirror-crosshair"),ge(document,"keyup",t),ge(document,"mouseover",t))}z(r,"CodeMirror-crosshair"),ue(document,"keyup",t),ue(document,"mouseover",t)}(r)}}function da(e){16==e.keyCode&&(this.doc.sel.shift=!1),fe(this,e)}function sa(e){var r=this;if(!(e.target&&e.target!=r.display.input.getField()||wt(r.display,e)||fe(r,e)||e.ctrlKey&&!e.altKey||y&&e.metaKey)){var t=e.keyCode,o=e.charCode;if(u&&t==la)return la=null,void ve(e);if(!u||e.which&&!(e.which<10)||!aa(r,e)){var n=String.fromCharCode(null==o?t:o);"\b"!=n&&(function(e,r,t){return na(e,"'"+t+"'",r,(function(r){return ta(e,r,!0)}))}(r,e,n)||r.display.input.onKeyPress(e))}}}var ua,pa,ga=function(e,r,t){this.time=e,this.pos=r,this.button=t};function ha(e){var r=this,t=r.display;if(!(fe(r,e)||t.activeTouch&&t.input.supportsTouch()))if(t.input.ensurePolled(),t.shift=e.shiftKey,wt(t,e))c||(t.scroller.draggable=!1,setTimeout((function(){return t.scroller.draggable=!0}),100));else if(!ma(r,e)){var o=co(r,e),n=Se(e),i=o?function(e,r){var t=+new Date;return pa&&pa.compare(t,e,r)?(ua=pa=null,"triple"):ua&&ua.compare(t,e,r)?(pa=new ga(t,e,r),ua=null,"double"):(ua=new ga(t,e,r),pa=null,"single")}(o,n):"single";window.focus(),1==n&&r.state.selectingText&&r.state.selectingText(e),o&&function(e,r,t,o,n){var i="Click";return"double"==o?i="Double"+i:"triple"==o&&(i="Triple"+i),na(e,Zi(i=(1==r?"Left":2==r?"Middle":"Right")+i,n),n,(function(r){if("string"==typeof r&&(r=$i[r]),!r)return!1;var o=!1;try{e.isReadOnly()&&(e.state.suppressEdits=!0),o=r(e,t)!=B}finally{e.state.suppressEdits=!1}return o}))}(r,n,o,i,e)||(1==n?o?function(e,r,t,o){a?setTimeout(I(Co,e),0):e.curOp.focus=R();var n,i=function(e,r,t){var o=e.getOption("configureMouse"),n=o?o(e,r,t):{};if(null==n.unit){var i=v?t.shiftKey&&t.metaKey:t.altKey;n.unit=i?"rectangle":"single"==r?"char":"double"==r?"word":"line"}return(null==n.extend||e.doc.extend)&&(n.extend=e.doc.extend||t.shiftKey),null==n.addNew&&(n.addNew=y?t.metaKey:t.ctrlKey),null==n.moveOnDrag&&(n.moveOnDrag=!(y?t.altKey:t.ctrlKey)),n}(e,t,o),d=e.doc.sel;e.options.dragDrop&&Ee&&!e.isReadOnly()&&"single"==t&&(n=d.contains(r))>-1&&(rr((n=d.ranges[n]).from(),r)<0||r.xRel>0)&&(rr(n.to(),r)>0||r.xRel<0)?function(e,r,t,o){var n=e.display,i=!1,d=en(e,(function(r){c&&(n.scroller.draggable=!1),e.state.draggingText=!1,ge(n.wrapper.ownerDocument,"mouseup",d),ge(n.wrapper.ownerDocument,"mousemove",s),ge(n.scroller,"dragstart",u),ge(n.scroller,"drop",d),i||(ve(r),o.addNew||qn(e.doc,t,null,null,o.extend),c&&!p||a&&9==l?setTimeout((function(){n.wrapper.ownerDocument.body.focus({preventScroll:!0}),n.input.focus()}),20):n.input.focus())})),s=function(e){i=i||Math.abs(r.clientX-e.clientX)+Math.abs(r.clientY-e.clientY)>=10},u=function(){return i=!0};c&&(n.scroller.draggable=!0),e.state.draggingText=d,d.copy=!o.moveOnDrag,n.scroller.dragDrop&&n.scroller.dragDrop(),ue(n.wrapper.ownerDocument,"mouseup",d),ue(n.wrapper.ownerDocument,"mousemove",s),ue(n.scroller,"dragstart",u),ue(n.scroller,"drop",d),xo(e),setTimeout((function(){return n.input.focus()}),20)}(e,o,r,i):function(e,r,t,o){var n=e.display,i=e.doc;ve(r);var a,l,c=i.sel,d=c.ranges;if(o.addNew&&!o.extend?(l=i.sel.contains(t),a=l>-1?d[l]:new Sn(t,t)):(a=i.sel.primary(),l=i.sel.primIndex),"rectangle"==o.unit)o.addNew||(a=new Sn(t,t)),t=co(e,r,!0,!0),l=-1;else{var s=fa(e,t,o.unit);a=o.extend?Jn(a,s.anchor,s.head,o.extend):s}o.addNew?-1==l?(l=d.length,$n(i,Tn(e,d.concat([a]),l),{scroll:!1,origin:"*mouse"})):d.length>1&&d[l].empty()&&"char"==o.unit&&!o.extend?($n(i,Tn(e,d.slice(0,l).concat(d.slice(l+1)),0),{scroll:!1,origin:"*mouse"}),c=i.sel):Qn(i,l,a,j):(l=0,$n(i,new xn([a],0),j),c=i.sel);var u=t,p=n.wrapper.getBoundingClientRect(),g=0;function h(r){var d=++g,s=co(e,r,!0,"rectangle"==o.unit);if(s)if(0!=rr(s,u)){e.curOp.focus=R(),function(r){if(0!=rr(u,r))if(u=r,"rectangle"==o.unit){for(var n=[],d=e.options.tabSize,s=P(Ze(i,t.line).text,t.ch,d),p=P(Ze(i,r.line).text,r.ch,d),g=Math.min(s,p),h=Math.max(s,p),f=Math.min(t.line,r.line),b=Math.min(e.lastLine(),Math.max(t.line,r.line));f<=b;f++){var m=Ze(i,f).text,y=V(m,g,d);g==h?n.push(new Sn(er(f,y),er(f,y))):m.length>y&&n.push(new Sn(er(f,y),er(f,V(m,h,d))))}n.length||n.push(new Sn(t,t)),$n(i,Tn(e,c.ranges.slice(0,l).concat(n),l),{origin:"*mouse",scroll:!1}),e.scrollIntoView(r)}else{var v,k=a,w=fa(e,r,o.unit),C=k.anchor;rr(w.anchor,C)>0?(v=w.head,C=ir(k.from(),w.anchor)):(v=w.anchor,C=nr(k.to(),w.head));var x=c.ranges.slice(0);x[l]=function(e,r){var t=r.anchor,o=r.head,n=Ze(e.doc,t.line);if(0==rr(t,o)&&t.sticky==o.sticky)return r;var i=de(n);if(!i)return r;var a=le(i,t.ch,t.sticky),l=i[a];if(l.from!=t.ch&&l.to!=t.ch)return r;var c,d=a+(l.from==t.ch==(1!=l.level)?0:1);if(0==d||d==i.length)return r;if(o.line!=t.line)c=(o.line-t.line)*("ltr"==e.doc.direction?1:-1)>0;else{var s=le(i,o.ch,o.sticky),u=s-a||(o.ch-t.ch)*(1==l.level?-1:1);c=s==d-1||s==d?u<0:u>0}var p=i[d+(c?-1:0)],g=c==(1==p.level),h=g?p.from:p.to,f=g?"after":"before";return t.ch==h&&t.sticky==f?r:new Sn(new er(t.line,h,f),o)}(e,new Sn(lr(i,C),v)),$n(i,Tn(e,x,l),j)}}(s);var f=Oo(n,i);(s.line>=f.to||s.line<f.from)&&setTimeout(en(e,(function(){g==d&&h(r)})),150)}else{var b=r.clientY<p.top?-20:r.clientY>p.bottom?20:0;b&&setTimeout(en(e,(function(){g==d&&(n.scroller.scrollTop+=b,h(r))})),50)}}function f(r){e.state.selectingText=!1,g=1/0,r&&(ve(r),n.input.focus()),ge(n.wrapper.ownerDocument,"mousemove",b),ge(n.wrapper.ownerDocument,"mouseup",m),i.history.lastSelOrigin=null}var b=en(e,(function(e){0!==e.buttons&&Se(e)?h(e):f(e)})),m=en(e,f);e.state.selectingText=m,ue(n.wrapper.ownerDocument,"mousemove",b),ue(n.wrapper.ownerDocument,"mouseup",m)}(e,o,r,i)}(r,o,i,e):xe(e)==t.scroller&&ve(e):2==n?(o&&qn(r.doc,o),setTimeout((function(){return t.input.focus()}),20)):3==n&&(x?r.display.input.onContextMenu(e):xo(r)))}}function fa(e,r,t){if("char"==t)return new Sn(r,r);if("word"==t)return e.findWordAt(r);if("line"==t)return new Sn(er(r.line,0),lr(e.doc,er(r.line+1,0)));var o=t(e,r);return new Sn(o.from,o.to)}function ba(e,r,t,o){var n,i;if(r.touches)n=r.touches[0].clientX,i=r.touches[0].clientY;else try{n=r.clientX,i=r.clientY}catch(e){return!1}if(n>=Math.floor(e.display.gutters.getBoundingClientRect().right))return!1;o&&ve(r);var a=e.display,l=a.lineDiv.getBoundingClientRect();if(i>l.bottom||!me(e,t))return we(r);i-=l.top-a.viewOffset;for(var c=0;c<e.display.gutterSpecs.length;++c){var d=a.gutters.childNodes[c];if(d&&d.getBoundingClientRect().right>=n)return he(e,t,e,Ye(e.doc,i),e.display.gutterSpecs[c].className,r),we(r)}}function ma(e,r){return ba(e,r,"gutterClick",!0)}function ya(e,r){wt(e.display,r)||function(e,r){return!!me(e,"gutterContextMenu")&&ba(e,r,"gutterContextMenu",!1)}(e,r)||fe(e,r,"contextmenu")||x||e.display.input.onContextMenu(r)}function va(e){e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+e.options.theme.replace(/(^|\s)\s*/g," cm-s-"),Kt(e)}ga.prototype.compare=function(e,r,t){return this.time+400>e&&0==rr(r,this.pos)&&t==this.button};var ka={toString:function(){return"CodeMirror.Init"}},wa={},Ca={};function xa(e,r,t){if(!r!=!(t&&t!=ka)){var o=e.display.dragFunctions,n=r?ue:ge;n(e.display.scroller,"dragstart",o.start),n(e.display.scroller,"dragenter",o.enter),n(e.display.scroller,"dragover",o.over),n(e.display.scroller,"dragleave",o.leave),n(e.display.scroller,"drop",o.drop)}}function Sa(e){e.options.lineWrapping?(z(e.display.wrapper,"CodeMirror-wrap"),e.display.sizer.style.minWidth="",e.display.sizerWidth=null):(L(e.display.wrapper,"CodeMirror-wrap"),Vr(e)),lo(e),uo(e),Kt(e),setTimeout((function(){return Bo(e)}),100)}function Ta(e,r){var t=this;if(!(this instanceof Ta))return new Ta(e,r);this.options=r=r?W(r):{},W(wa,r,!1);var o=r.value;"string"==typeof o?o=new _i(o,r.mode,null,r.lineSeparator,r.direction):r.mode&&(o.modeOption=r.mode),this.doc=o;var n=new Ta.inputStyles[r.inputStyle](this),i=this.display=new mn(e,o,n,r);for(var d in i.wrapper.CodeMirror=this,va(this),r.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),Ho(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:-1,cutIncoming:-1,selectingText:!1,draggingText:!1,highlight:new K,keySeq:null,specialChars:null},r.autofocus&&!m&&i.input.focus(),a&&l<11&&setTimeout((function(){return t.display.input.reset(!0)}),20),function(e){var r=e.display;ue(r.scroller,"mousedown",en(e,ha)),ue(r.scroller,"dblclick",a&&l<11?en(e,(function(r){if(!fe(e,r)){var t=co(e,r);if(t&&!ma(e,r)&&!wt(e.display,r)){ve(r);var o=e.findWordAt(t);qn(e.doc,o.anchor,o.head)}}})):function(r){return fe(e,r)||ve(r)}),ue(r.scroller,"contextmenu",(function(r){return ya(e,r)})),ue(r.input.getField(),"contextmenu",(function(t){r.scroller.contains(t.target)||ya(e,t)}));var t,o={end:0};function n(){r.activeTouch&&(t=setTimeout((function(){return r.activeTouch=null}),1e3),(o=r.activeTouch).end=+new Date)}function i(e,r){if(null==r.left)return!0;var t=r.left-e.left,o=r.top-e.top;return t*t+o*o>400}ue(r.scroller,"touchstart",(function(n){if(!fe(e,n)&&!function(e){if(1!=e.touches.length)return!1;var r=e.touches[0];return r.radiusX<=1&&r.radiusY<=1}(n)&&!ma(e,n)){r.input.ensurePolled(),clearTimeout(t);var i=+new Date;r.activeTouch={start:i,moved:!1,prev:i-o.end<=300?o:null},1==n.touches.length&&(r.activeTouch.left=n.touches[0].pageX,r.activeTouch.top=n.touches[0].pageY)}})),ue(r.scroller,"touchmove",(function(){r.activeTouch&&(r.activeTouch.moved=!0)})),ue(r.scroller,"touchend",(function(t){var o=r.activeTouch;if(o&&!wt(r,t)&&null!=o.left&&!o.moved&&new Date-o.start<300){var a,l=e.coordsChar(r.activeTouch,"page");a=!o.prev||i(o,o.prev)?new Sn(l,l):!o.prev.prev||i(o,o.prev.prev)?e.findWordAt(l):new Sn(er(l.line,0),lr(e.doc,er(l.line+1,0))),e.setSelection(a.anchor,a.head),e.focus(),ve(t)}n()})),ue(r.scroller,"touchcancel",n),ue(r.scroller,"scroll",(function(){r.scroller.clientHeight&&(Fo(e,r.scroller.scrollTop),Wo(e,r.scroller.scrollLeft,!0),he(e,"scroll",e))})),ue(r.scroller,"mousewheel",(function(r){return Cn(e,r)})),ue(r.scroller,"DOMMouseScroll",(function(r){return Cn(e,r)})),ue(r.wrapper,"scroll",(function(){return r.wrapper.scrollTop=r.wrapper.scrollLeft=0})),r.dragFunctions={enter:function(r){fe(e,r)||Ce(r)},over:function(r){fe(e,r)||(function(e,r){var t=co(e,r);if(t){var o=document.createDocumentFragment();yo(e,t,o),e.display.dragCursor||(e.display.dragCursor=A("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),e.display.lineSpace.insertBefore(e.display.dragCursor,e.display.cursorDiv)),O(e.display.dragCursor,o)}}(e,r),Ce(r))},start:function(r){return function(e,r){if(a&&(!e.state.draggingText||+new Date-Mi<100))Ce(r);else if(!fe(e,r)&&!wt(e.display,r)&&(r.dataTransfer.setData("Text",e.getSelection()),r.dataTransfer.effectAllowed="copyMove",r.dataTransfer.setDragImage&&!p)){var t=A("img",null,null,"position: fixed; left: 0; top: 0;");t.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",u&&(t.width=t.height=1,e.display.wrapper.appendChild(t),t._top=t.offsetTop),r.dataTransfer.setDragImage(t,0,0),u&&t.parentNode.removeChild(t)}}(e,r)},drop:en(e,Ri),leave:function(r){fe(e,r)||zi(e)}};var c=r.input.getField();ue(c,"keyup",(function(r){return da.call(e,r)})),ue(c,"keydown",en(e,ca)),ue(c,"keypress",en(e,sa)),ue(c,"focus",(function(r){return So(e,r)})),ue(c,"blur",(function(r){return To(e,r)}))}(this),function(){var e;Fi||(ue(window,"resize",(function(){null==e&&(e=setTimeout((function(){e=null,Ni(Ii)}),100))})),ue(window,"blur",(function(){return Ni(To)})),Fi=!0)}(),Zo(this),this.curOp.forceUpdate=!0,In(this,o),r.autofocus&&!m||this.hasFocus()?setTimeout((function(){t.hasFocus()&&!t.state.focused&&So(t)}),20):To(this),Ca)Ca.hasOwnProperty(d)&&Ca[d](this,r[d],ka);gn(this),r.finishInit&&r.finishInit(this);for(var s=0;s<La.length;++s)La[s](this);Jo(this),c&&r.lineWrapping&&"optimizelegibility"==getComputedStyle(i.lineDiv).textRendering&&(i.lineDiv.style.textRendering="auto")}Ta.defaults=wa,Ta.optionHandlers=Ca;var La=[];function Ea(e,r,t,o){var n,i=e.doc;null==t&&(t="add"),"smart"==t&&(i.mode.indent?n=gr(e,r).state:t="prev");var a=e.options.tabSize,l=Ze(i,r),c=P(l.text,null,a);l.stateAfter&&(l.stateAfter=null);var d,s=l.text.match(/^\s*/)[0];if(o||/\S/.test(l.text)){if("smart"==t&&((d=i.mode.indent(n,l.text.slice(s.length),l.text))==B||d>150)){if(!o)return;t="prev"}}else d=0,t="not";"prev"==t?d=r>i.first?P(Ze(i,r-1).text,null,a):0:"add"==t?d=c+e.options.indentUnit:"subtract"==t?d=c-e.options.indentUnit:"number"==typeof t&&(d=c+t),d=Math.max(0,d);var u="",p=0;if(e.options.indentWithTabs)for(var g=Math.floor(d/a);g;--g)p+=a,u+="\t";if(p<d&&(u+=J(d-p)),u!=s)return hi(i,u,er(r,0),er(r,s.length),"+input"),l.stateAfter=null,!0;for(var h=0;h<i.sel.ranges.length;h++){var f=i.sel.ranges[h];if(f.head.line==r&&f.head.ch<s.length){var b=er(r,s.length);Qn(i,h,new Sn(b,b));break}}}Ta.defineInitHook=function(e){return La.push(e)};var Oa=null;function Aa(e){Oa=e}function _a(e,r,t,o,n){var i=e.doc;e.display.shift=!1,o||(o=i.sel);var a=+new Date-200,l="paste"==n||e.state.pasteIncoming>a,c=Me(r),d=null;if(l&&o.ranges.length>1)if(Oa&&Oa.text.join("\n")==r){if(o.ranges.length%Oa.text.length==0){d=[];for(var s=0;s<Oa.text.length;s++)d.push(i.splitLines(Oa.text[s]))}}else c.length==o.ranges.length&&e.options.pasteLinesPerSelection&&(d=G(c,(function(e){return[e]})));for(var u=e.curOp.updateInput,p=o.ranges.length-1;p>=0;p--){var g=o.ranges[p],h=g.from(),f=g.to();g.empty()&&(t&&t>0?h=er(h.line,h.ch-t):e.state.overwrite&&!l?f=er(f.line,Math.min(Ze(i,f.line).text.length,f.ch+q(c).length)):l&&Oa&&Oa.lineWise&&Oa.text.join("\n")==c.join("\n")&&(h=f=er(h.line,0)));var b={from:h,to:f,text:d?d[p%d.length]:c,origin:n||(l?"paste":e.state.cutIncoming>a?"cut":"+input")};di(e.doc,b),lt(e,"inputRead",e,b)}r&&!l&&Ra(e,r),Mo(e),e.curOp.updateInput<2&&(e.curOp.updateInput=u),e.curOp.typing=!0,e.state.pasteIncoming=e.state.cutIncoming=-1}function Ma(e,r){var t=e.clipboardData&&e.clipboardData.getData("Text");if(t)return e.preventDefault(),r.isReadOnly()||r.options.disableInput||$o(r,(function(){return _a(r,t,0,null,"paste")})),!0}function Ra(e,r){if(e.options.electricChars&&e.options.smartIndent)for(var t=e.doc.sel,o=t.ranges.length-1;o>=0;o--){var n=t.ranges[o];if(!(n.head.ch>100||o&&t.ranges[o-1].head.line==n.head.line)){var i=e.getModeAt(n.head),a=!1;if(i.electricChars){for(var l=0;l<i.electricChars.length;l++)if(r.indexOf(i.electricChars.charAt(l))>-1){a=Ea(e,n.head.line,"smart");break}}else i.electricInput&&i.electricInput.test(Ze(e.doc,n.head.line).text.slice(0,n.head.ch))&&(a=Ea(e,n.head.line,"smart"));a&&lt(e,"electricInput",e,n.head.line)}}}function za(e){for(var r=[],t=[],o=0;o<e.doc.sel.ranges.length;o++){var n=e.doc.sel.ranges[o].head.line,i={anchor:er(n,0),head:er(n+1,0)};t.push(i),r.push(e.getRange(i.anchor,i.head))}return{text:r,ranges:t}}function Na(e,r,t,o){e.setAttribute("autocorrect",t?"":"off"),e.setAttribute("autocapitalize",o?"":"off"),e.setAttribute("spellcheck",!!r)}function Fa(){var e=A("textarea",null,null,"position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),r=A("div",[e],null,"overflow: hidden; position: relative; width: 3px; height: 0px;");return c?e.style.width="1000px":e.setAttribute("wrap","off"),f&&(e.style.border="1px solid black"),Na(e),r}function Ia(e,r,t,o,n){var i=r,a=t,l=Ze(e,r.line),c=n&&"rtl"==e.direction?-t:t;function d(i){var a,d;if("codepoint"==o){var s=l.text.charCodeAt(r.ch+(o>0?0:-1));a=isNaN(s)?null:new er(r.line,Math.max(0,Math.min(l.text.length,r.ch+t*(s>=55296&&s<56320?2:1))),-t)}else a=n?function(e,r,t,o){var n=de(r,e.doc.direction);if(!n)return Yi(r,t,o);t.ch>=r.text.length?(t.ch=r.text.length,t.sticky="before"):t.ch<=0&&(t.ch=0,t.sticky="after");var i=le(n,t.ch,t.sticky),a=n[i];if("ltr"==e.doc.direction&&a.level%2==0&&(o>0?a.to>t.ch:a.from<t.ch))return Yi(r,t,o);var l,c=function(e,t){return Qi(r,e instanceof er?e.ch:e,t)},d=function(t){return e.options.lineWrapping?(l=l||Mt(e,r),Yt(e,r,l,t)):{begin:0,end:r.text.length}},s=d("before"==t.sticky?c(t,-1):t.ch);if("rtl"==e.doc.direction||1==a.level){var u=1==a.level==o<0,p=c(t,u?1:-1);if(null!=p&&(u?p<=a.to&&p<=s.end:p>=a.from&&p>=s.begin)){var g=u?"before":"after";return new er(t.line,p,g)}}var h=function(e,r,o){for(var i=function(e,r){return r?new er(t.line,c(e,1),"before"):new er(t.line,e,"after")};e>=0&&e<n.length;e+=r){var a=n[e],l=r>0==(1!=a.level),d=l?o.begin:c(o.end,-1);if(a.from<=d&&d<a.to)return i(d,l);if(d=l?a.from:c(a.to,-1),o.begin<=d&&d<o.end)return i(d,l)}},f=h(i+o,o,s);if(f)return f;var b=o>0?s.end:c(s.begin,-1);return null==b||o>0&&b==r.text.length||!(f=h(o>0?0:n.length-1,o,d(b)))?null:f}(e.cm,l,r,t):Yi(l,r,t);if(null==a){if(i||(d=r.line+c)<e.first||d>=e.first+e.size||(r=new er(d,r.ch,r.sticky),!(l=Ze(e,d))))return!1;r=Xi(n,e.cm,l,r.line,c)}else r=a;return!0}if("char"==o||"codepoint"==o)d();else if("column"==o)d(!0);else if("word"==o||"group"==o)for(var s=null,u="group"==o,p=e.cm&&e.cm.getHelper(r,"wordChars"),g=!0;!(t<0)||d(!g);g=!1){var h=l.text.charAt(r.ch)||"\n",f=ee(h,p)?"w":u&&"\n"==h?"n":!u||/\s/.test(h)?null:"p";if(!u||g||f||(f="s"),s&&s!=f){t<0&&(t=1,d(),r.sticky="after");break}if(f&&(s=f),t>0&&!d(!g))break}var b=ii(e,r,i,a,!0);return tr(i,b)&&(b.hitSide=!0),b}function Wa(e,r,t,o){var n,i,a=e.doc,l=r.left;if("page"==o){var c=Math.min(e.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight),d=Math.max(c-.5*to(e.display),3);n=(t>0?r.bottom:r.top)+t*d}else"line"==o&&(n=t>0?r.bottom+3:r.top-3);for(;(i=Gt(e,l,n)).outside;){if(t<0?n<=0:n>=a.height){i.hitSide=!0;break}n+=5*t}return i}var Pa=function(e){this.cm=e,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new K,this.composing=null,this.gracePeriod=!1,this.readDOMTimeout=null};function Ka(e,r){var t=_t(e,r.line);if(!t||t.hidden)return null;var o=Ze(e.doc,r.line),n=Ot(t,o,r.line),i=de(o,e.doc.direction),a="left";i&&(a=le(i,r.ch)%2?"right":"left");var l=Ft(n.map,r.ch,a);return l.offset="right"==l.collapse?l.end:l.start,l}function Ua(e,r){return r&&(e.bad=!0),e}function Ba(e,r,t){var o;if(r==e.display.lineDiv){if(!(o=e.display.lineDiv.childNodes[t]))return Ua(e.clipPos(er(e.display.viewTo-1)),!0);r=null,t=0}else for(o=r;;o=o.parentNode){if(!o||o==e.display.lineDiv)return null;if(o.parentNode&&o.parentNode==e.display.lineDiv)break}for(var n=0;n<e.display.view.length;n++){var i=e.display.view[n];if(i.node==o)return Da(i,r,t)}}function Da(e,r,t){var o=e.text.firstChild,n=!1;if(!r||!M(o,r))return Ua(er(Qe(e.line),0),!0);if(r==o&&(n=!0,r=o.childNodes[t],t=0,!r)){var i=e.rest?q(e.rest):e.line;return Ua(er(Qe(i),i.text.length),n)}var a=3==r.nodeType?r:null,l=r;for(a||1!=r.childNodes.length||3!=r.firstChild.nodeType||(a=r.firstChild,t&&(t=a.nodeValue.length));l.parentNode!=o;)l=l.parentNode;var c=e.measure,d=c.maps;function s(r,t,o){for(var n=-1;n<(d?d.length:0);n++)for(var i=n<0?c.map:d[n],a=0;a<i.length;a+=3){var l=i[a+2];if(l==r||l==t){var s=Qe(n<0?e.line:e.rest[n]),u=i[a]+o;return(o<0||l!=r)&&(u=i[a+(o?1:0)]),er(s,u)}}}var u=s(a,l,t);if(u)return Ua(u,n);for(var p=l.nextSibling,g=a?a.nodeValue.length-t:0;p;p=p.nextSibling){if(u=s(p,p.firstChild,0))return Ua(er(u.line,u.ch-g),n);g+=p.textContent.length}for(var h=l.previousSibling,f=t;h;h=h.previousSibling){if(u=s(h,h.firstChild,-1))return Ua(er(u.line,u.ch+f),n);f+=h.textContent.length}}Pa.prototype.init=function(e){var r=this,t=this,o=t.cm,n=t.div=e.lineDiv;function i(e){for(var r=e.target;r;r=r.parentNode){if(r==n)return!0;if(/\bCodeMirror-(?:line)?widget\b/.test(r.className))break}return!1}function a(e){if(i(e)&&!fe(o,e)){if(o.somethingSelected())Aa({lineWise:!1,text:o.getSelections()}),"cut"==e.type&&o.replaceSelection("",null,"cut");else{if(!o.options.lineWiseCopyCut)return;var r=za(o);Aa({lineWise:!0,text:r.text}),"cut"==e.type&&o.operation((function(){o.setSelections(r.ranges,0,D),o.replaceSelection("",null,"cut")}))}if(e.clipboardData){e.clipboardData.clearData();var a=Oa.text.join("\n");if(e.clipboardData.setData("Text",a),e.clipboardData.getData("Text")==a)return void e.preventDefault()}var l=Fa(),c=l.firstChild;o.display.lineSpace.insertBefore(l,o.display.lineSpace.firstChild),c.value=Oa.text.join("\n");var d=document.activeElement;F(c),setTimeout((function(){o.display.lineSpace.removeChild(l),d.focus(),d==n&&t.showPrimarySelection()}),50)}}Na(n,o.options.spellcheck,o.options.autocorrect,o.options.autocapitalize),ue(n,"paste",(function(e){!i(e)||fe(o,e)||Ma(e,o)||l<=11&&setTimeout(en(o,(function(){return r.updateFromDOM()})),20)})),ue(n,"compositionstart",(function(e){r.composing={data:e.data,done:!1}})),ue(n,"compositionupdate",(function(e){r.composing||(r.composing={data:e.data,done:!1})})),ue(n,"compositionend",(function(e){r.composing&&(e.data!=r.composing.data&&r.readFromDOMSoon(),r.composing.done=!0)})),ue(n,"touchstart",(function(){return t.forceCompositionEnd()})),ue(n,"input",(function(){r.composing||r.readFromDOMSoon()})),ue(n,"copy",a),ue(n,"cut",a)},Pa.prototype.screenReaderLabelChanged=function(e){e?this.div.setAttribute("aria-label",e):this.div.removeAttribute("aria-label")},Pa.prototype.prepareSelection=function(){var e=mo(this.cm,!1);return e.focus=document.activeElement==this.div,e},Pa.prototype.showSelection=function(e,r){e&&this.cm.display.view.length&&((e.focus||r)&&this.showPrimarySelection(),this.showMultipleSelections(e))},Pa.prototype.getSelection=function(){return this.cm.display.wrapper.ownerDocument.getSelection()},Pa.prototype.showPrimarySelection=function(){var e=this.getSelection(),r=this.cm,o=r.doc.sel.primary(),n=o.from(),i=o.to();if(r.display.viewTo==r.display.viewFrom||n.line>=r.display.viewTo||i.line<r.display.viewFrom)e.removeAllRanges();else{var a=Ba(r,e.anchorNode,e.anchorOffset),l=Ba(r,e.focusNode,e.focusOffset);if(!a||a.bad||!l||l.bad||0!=rr(ir(a,l),n)||0!=rr(nr(a,l),i)){var c=r.display.view,d=n.line>=r.display.viewFrom&&Ka(r,n)||{node:c[0].measure.map[2],offset:0},s=i.line<r.display.viewTo&&Ka(r,i);if(!s){var u=c[c.length-1].measure,p=u.maps?u.maps[u.maps.length-1]:u.map;s={node:p[p.length-1],offset:p[p.length-2]-p[p.length-3]}}if(d&&s){var g,h=e.rangeCount&&e.getRangeAt(0);try{g=T(d.node,d.offset,s.offset,s.node)}catch(e){}g&&(!t&&r.state.focused?(e.collapse(d.node,d.offset),g.collapsed||(e.removeAllRanges(),e.addRange(g))):(e.removeAllRanges(),e.addRange(g)),h&&null==e.anchorNode?e.addRange(h):t&&this.startGracePeriod()),this.rememberSelection()}else e.removeAllRanges()}}},Pa.prototype.startGracePeriod=function(){var e=this;clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout((function(){e.gracePeriod=!1,e.selectionChanged()&&e.cm.operation((function(){return e.cm.curOp.selectionChanged=!0}))}),20)},Pa.prototype.showMultipleSelections=function(e){O(this.cm.display.cursorDiv,e.cursors),O(this.cm.display.selectionDiv,e.selection)},Pa.prototype.rememberSelection=function(){var e=this.getSelection();this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastFocusNode=e.focusNode,this.lastFocusOffset=e.focusOffset},Pa.prototype.selectionInEditor=function(){var e=this.getSelection();if(!e.rangeCount)return!1;var r=e.getRangeAt(0).commonAncestorContainer;return M(this.div,r)},Pa.prototype.focus=function(){"nocursor"!=this.cm.options.readOnly&&(this.selectionInEditor()&&document.activeElement==this.div||this.showSelection(this.prepareSelection(),!0),this.div.focus())},Pa.prototype.blur=function(){this.div.blur()},Pa.prototype.getField=function(){return this.div},Pa.prototype.supportsTouch=function(){return!0},Pa.prototype.receivedFocus=function(){var e=this;this.selectionInEditor()?this.pollSelection():$o(this.cm,(function(){return e.cm.curOp.selectionChanged=!0})),this.polling.set(this.cm.options.pollInterval,(function r(){e.cm.state.focused&&(e.pollSelection(),e.polling.set(e.cm.options.pollInterval,r))}))},Pa.prototype.selectionChanged=function(){var e=this.getSelection();return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset},Pa.prototype.pollSelection=function(){if(null==this.readDOMTimeout&&!this.gracePeriod&&this.selectionChanged()){var e=this.getSelection(),r=this.cm;if(b&&s&&this.cm.display.gutterSpecs.length&&function(e){for(var r=e;r;r=r.parentNode)if(/CodeMirror-gutter-wrapper/.test(r.className))return!0;return!1}(e.anchorNode))return this.cm.triggerOnKeyDown({type:"keydown",keyCode:8,preventDefault:Math.abs}),this.blur(),void this.focus();if(!this.composing){this.rememberSelection();var t=Ba(r,e.anchorNode,e.anchorOffset),o=Ba(r,e.focusNode,e.focusOffset);t&&o&&$o(r,(function(){$n(r.doc,Ln(t,o),D),(t.bad||o.bad)&&(r.curOp.selectionChanged=!0)}))}}},Pa.prototype.pollContent=function(){null!=this.readDOMTimeout&&(clearTimeout(this.readDOMTimeout),this.readDOMTimeout=null);var e,r,t,o=this.cm,n=o.display,i=o.doc.sel.primary(),a=i.from(),l=i.to();if(0==a.ch&&a.line>o.firstLine()&&(a=er(a.line-1,Ze(o.doc,a.line-1).length)),l.ch==Ze(o.doc,l.line).text.length&&l.line<o.lastLine()&&(l=er(l.line+1,0)),a.line<n.viewFrom||l.line>n.viewTo-1)return!1;a.line==n.viewFrom||0==(e=so(o,a.line))?(r=Qe(n.view[0].line),t=n.view[0].node):(r=Qe(n.view[e].line),t=n.view[e-1].node.nextSibling);var c,d,s=so(o,l.line);if(s==n.view.length-1?(c=n.viewTo-1,d=n.lineDiv.lastChild):(c=Qe(n.view[s+1].line)-1,d=n.view[s+1].node.previousSibling),!t)return!1;for(var u=o.doc.splitLines(function(e,r,t,o,n){var i="",a=!1,l=e.doc.lineSeparator(),c=!1;function d(){a&&(i+=l,c&&(i+=l),a=c=!1)}function s(e){e&&(d(),i+=e)}function u(r){if(1==r.nodeType){var t=r.getAttribute("cm-text");if(t)return void s(t);var i,p=r.getAttribute("cm-marker");if(p){var g=e.findMarks(er(o,0),er(n+1,0),(b=+p,function(e){return e.id==b}));return void(g.length&&(i=g[0].find(0))&&s(Je(e.doc,i.from,i.to).join(l)))}if("false"==r.getAttribute("contenteditable"))return;var h=/^(pre|div|p|li|table|br)$/i.test(r.nodeName);if(!/^br$/i.test(r.nodeName)&&0==r.textContent.length)return;h&&d();for(var f=0;f<r.childNodes.length;f++)u(r.childNodes[f]);/^(pre|p)$/i.test(r.nodeName)&&(c=!0),h&&(a=!0)}else 3==r.nodeType&&s(r.nodeValue.replace(/\u200b/g,"").replace(/\u00a0/g," "));var b}for(;u(r),r!=t;)r=r.nextSibling,c=!1;return i}(o,t,d,r,c)),p=Je(o.doc,er(r,0),er(c,Ze(o.doc,c).text.length));u.length>1&&p.length>1;)if(q(u)==q(p))u.pop(),p.pop(),c--;else{if(u[0]!=p[0])break;u.shift(),p.shift(),r++}for(var g=0,h=0,f=u[0],b=p[0],m=Math.min(f.length,b.length);g<m&&f.charCodeAt(g)==b.charCodeAt(g);)++g;for(var y=q(u),v=q(p),k=Math.min(y.length-(1==u.length?g:0),v.length-(1==p.length?g:0));h<k&&y.charCodeAt(y.length-h-1)==v.charCodeAt(v.length-h-1);)++h;if(1==u.length&&1==p.length&&r==a.line)for(;g&&g>a.ch&&y.charCodeAt(y.length-h-1)==v.charCodeAt(v.length-h-1);)g--,h++;u[u.length-1]=y.slice(0,y.length-h).replace(/^\u200b+/,""),u[0]=u[0].slice(g).replace(/\u200b+$/,"");var w=er(r,g),C=er(c,p.length?q(p).length-h:0);return u.length>1||u[0]||rr(w,C)?(hi(o.doc,u,w,C,"+input"),!0):void 0},Pa.prototype.ensurePolled=function(){this.forceCompositionEnd()},Pa.prototype.reset=function(){this.forceCompositionEnd()},Pa.prototype.forceCompositionEnd=function(){this.composing&&(clearTimeout(this.readDOMTimeout),this.composing=null,this.updateFromDOM(),this.div.blur(),this.div.focus())},Pa.prototype.readFromDOMSoon=function(){var e=this;null==this.readDOMTimeout&&(this.readDOMTimeout=setTimeout((function(){if(e.readDOMTimeout=null,e.composing){if(!e.composing.done)return;e.composing=null}e.updateFromDOM()}),80))},Pa.prototype.updateFromDOM=function(){var e=this;!this.cm.isReadOnly()&&this.pollContent()||$o(this.cm,(function(){return uo(e.cm)}))},Pa.prototype.setUneditable=function(e){e.contentEditable="false"},Pa.prototype.onKeyPress=function(e){0==e.charCode||this.composing||(e.preventDefault(),this.cm.isReadOnly()||en(this.cm,_a)(this.cm,String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),0))},Pa.prototype.readOnlyChanged=function(e){this.div.contentEditable=("nocursor"!=e)+""},Pa.prototype.onContextMenu=function(){},Pa.prototype.resetPosition=function(){},Pa.prototype.needsContentAttribute=!0;var ja=function(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new K,this.hasSelection=!1,this.composing=null};ja.prototype.init=function(e){var r=this,t=this,o=this.cm;this.createField(e);var n=this.textarea;function i(e){if(!fe(o,e)){if(o.somethingSelected())Aa({lineWise:!1,text:o.getSelections()});else{if(!o.options.lineWiseCopyCut)return;var r=za(o);Aa({lineWise:!0,text:r.text}),"cut"==e.type?o.setSelections(r.ranges,null,D):(t.prevInput="",n.value=r.text.join("\n"),F(n))}"cut"==e.type&&(o.state.cutIncoming=+new Date)}}e.wrapper.insertBefore(this.wrapper,e.wrapper.firstChild),f&&(n.style.width="0px"),ue(n,"input",(function(){a&&l>=9&&r.hasSelection&&(r.hasSelection=null),t.poll()})),ue(n,"paste",(function(e){fe(o,e)||Ma(e,o)||(o.state.pasteIncoming=+new Date,t.fastPoll())})),ue(n,"cut",i),ue(n,"copy",i),ue(e.scroller,"paste",(function(r){if(!wt(e,r)&&!fe(o,r)){if(!n.dispatchEvent)return o.state.pasteIncoming=+new Date,void t.focus();var i=new Event("paste");i.clipboardData=r.clipboardData,n.dispatchEvent(i)}})),ue(e.lineSpace,"selectstart",(function(r){wt(e,r)||ve(r)})),ue(n,"compositionstart",(function(){var e=o.getCursor("from");t.composing&&t.composing.range.clear(),t.composing={start:e,range:o.markText(e,o.getCursor("to"),{className:"CodeMirror-composing"})}})),ue(n,"compositionend",(function(){t.composing&&(t.poll(),t.composing.range.clear(),t.composing=null)}))},ja.prototype.createField=function(e){this.wrapper=Fa(),this.textarea=this.wrapper.firstChild},ja.prototype.screenReaderLabelChanged=function(e){e?this.textarea.setAttribute("aria-label",e):this.textarea.removeAttribute("aria-label")},ja.prototype.prepareSelection=function(){var e=this.cm,r=e.display,t=e.doc,o=mo(e);if(e.options.moveInputWithCursor){var n=Zt(e,t.sel.primary().head,"div"),i=r.wrapper.getBoundingClientRect(),a=r.lineDiv.getBoundingClientRect();o.teTop=Math.max(0,Math.min(r.wrapper.clientHeight-10,n.top+a.top-i.top)),o.teLeft=Math.max(0,Math.min(r.wrapper.clientWidth-10,n.left+a.left-i.left))}return o},ja.prototype.showSelection=function(e){var r=this.cm.display;O(r.cursorDiv,e.cursors),O(r.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")},ja.prototype.reset=function(e){if(!this.contextMenuPending&&!this.composing){var r=this.cm;if(r.somethingSelected()){this.prevInput="";var t=r.getSelection();this.textarea.value=t,r.state.focused&&F(this.textarea),a&&l>=9&&(this.hasSelection=t)}else e||(this.prevInput=this.textarea.value="",a&&l>=9&&(this.hasSelection=null))}},ja.prototype.getField=function(){return this.textarea},ja.prototype.supportsTouch=function(){return!1},ja.prototype.focus=function(){if("nocursor"!=this.cm.options.readOnly&&(!m||R()!=this.textarea))try{this.textarea.focus()}catch(e){}},ja.prototype.blur=function(){this.textarea.blur()},ja.prototype.resetPosition=function(){this.wrapper.style.top=this.wrapper.style.left=0},ja.prototype.receivedFocus=function(){this.slowPoll()},ja.prototype.slowPoll=function(){var e=this;this.pollingFast||this.polling.set(this.cm.options.pollInterval,(function(){e.poll(),e.cm.state.focused&&e.slowPoll()}))},ja.prototype.fastPoll=function(){var e=!1,r=this;r.pollingFast=!0,r.polling.set(20,(function t(){r.poll()||e?(r.pollingFast=!1,r.slowPoll()):(e=!0,r.polling.set(60,t))}))},ja.prototype.poll=function(){var e=this,r=this.cm,t=this.textarea,o=this.prevInput;if(this.contextMenuPending||!r.state.focused||Re(t)&&!o&&!this.composing||r.isReadOnly()||r.options.disableInput||r.state.keySeq)return!1;var n=t.value;if(n==o&&!r.somethingSelected())return!1;if(a&&l>=9&&this.hasSelection===n||y&&/[\uf700-\uf7ff]/.test(n))return r.display.input.reset(),!1;if(r.doc.sel==r.display.selForContextMenu){var i=n.charCodeAt(0);if(8203!=i||o||(o="​"),8666==i)return this.reset(),this.cm.execCommand("undo")}for(var c=0,d=Math.min(o.length,n.length);c<d&&o.charCodeAt(c)==n.charCodeAt(c);)++c;return $o(r,(function(){_a(r,n.slice(c),o.length-c,null,e.composing?"*compose":null),n.length>1e3||n.indexOf("\n")>-1?t.value=e.prevInput="":e.prevInput=n,e.composing&&(e.composing.range.clear(),e.composing.range=r.markText(e.composing.start,r.getCursor("to"),{className:"CodeMirror-composing"}))})),!0},ja.prototype.ensurePolled=function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},ja.prototype.onKeyPress=function(){a&&l>=9&&(this.hasSelection=null),this.fastPoll()},ja.prototype.onContextMenu=function(e){var r=this,t=r.cm,o=t.display,n=r.textarea;r.contextMenuPending&&r.contextMenuPending();var i=co(t,e),d=o.scroller.scrollTop;if(i&&!u){t.options.resetSelectionOnContextMenu&&-1==t.doc.sel.contains(i)&&en(t,$n)(t.doc,Ln(i),D);var s,p=n.style.cssText,g=r.wrapper.style.cssText,h=r.wrapper.offsetParent.getBoundingClientRect();if(r.wrapper.style.cssText="position: static",n.style.cssText="position: absolute; width: 30px; height: 30px;\n      top: "+(e.clientY-h.top-5)+"px; left: "+(e.clientX-h.left-5)+"px;\n      z-index: 1000; background: "+(a?"rgba(255, 255, 255, .05)":"transparent")+";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",c&&(s=window.scrollY),o.input.focus(),c&&window.scrollTo(null,s),o.input.reset(),t.somethingSelected()||(n.value=r.prevInput=" "),r.contextMenuPending=m,o.selForContextMenu=t.doc.sel,clearTimeout(o.detectingSelectAll),a&&l>=9&&b(),x){Ce(e);var f=function(){ge(window,"mouseup",f),setTimeout(m,20)};ue(window,"mouseup",f)}else setTimeout(m,50)}function b(){if(null!=n.selectionStart){var e=t.somethingSelected(),i="​"+(e?n.value:"");n.value="⇚",n.value=i,r.prevInput=e?"":"​",n.selectionStart=1,n.selectionEnd=i.length,o.selForContextMenu=t.doc.sel}}function m(){if(r.contextMenuPending==m&&(r.contextMenuPending=!1,r.wrapper.style.cssText=g,n.style.cssText=p,a&&l<9&&o.scrollbars.setScrollTop(o.scroller.scrollTop=d),null!=n.selectionStart)){(!a||a&&l<9)&&b();var e=0,i=function(){o.selForContextMenu==t.doc.sel&&0==n.selectionStart&&n.selectionEnd>0&&"​"==r.prevInput?en(t,li)(t):e++<10?o.detectingSelectAll=setTimeout(i,500):(o.selForContextMenu=null,o.input.reset())};o.detectingSelectAll=setTimeout(i,200)}}},ja.prototype.readOnlyChanged=function(e){e||this.reset(),this.textarea.disabled="nocursor"==e,this.textarea.readOnly=!!e},ja.prototype.setUneditable=function(){},ja.prototype.needsContentAttribute=!1,function(e){var r=e.optionHandlers;function t(t,o,n,i){e.defaults[t]=o,n&&(r[t]=i?function(e,r,t){t!=ka&&n(e,r,t)}:n)}e.defineOption=t,e.Init=ka,t("value","",(function(e,r){return e.setValue(r)}),!0),t("mode",null,(function(e,r){e.doc.modeOption=r,Mn(e)}),!0),t("indentUnit",2,Mn,!0),t("indentWithTabs",!1),t("smartIndent",!0),t("tabSize",4,(function(e){Rn(e),Kt(e),uo(e)}),!0),t("lineSeparator",null,(function(e,r){if(e.doc.lineSep=r,r){var t=[],o=e.doc.first;e.doc.iter((function(e){for(var n=0;;){var i=e.text.indexOf(r,n);if(-1==i)break;n=i+r.length,t.push(er(o,i))}o++}));for(var n=t.length-1;n>=0;n--)hi(e.doc,r,t[n],er(t[n].line,t[n].ch+r.length))}})),t("specialChars",/[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200c\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g,(function(e,r,t){e.state.specialChars=RegExp(r.source+(r.test("\t")?"":"|\t"),"g"),t!=ka&&e.refresh()})),t("specialCharPlaceholder",Xr,(function(e){return e.refresh()}),!0),t("electricChars",!0),t("inputStyle",m?"contenteditable":"textarea",(function(){throw Error("inputStyle can not (yet) be changed in a running editor")}),!0),t("spellcheck",!1,(function(e,r){return e.getInputField().spellcheck=r}),!0),t("autocorrect",!1,(function(e,r){return e.getInputField().autocorrect=r}),!0),t("autocapitalize",!1,(function(e,r){return e.getInputField().autocapitalize=r}),!0),t("rtlMoveVisually",!k),t("wholeLineUpdateBefore",!0),t("theme","default",(function(e){va(e),bn(e)}),!0),t("keyMap","default",(function(e,r,t){var o=qi(r),n=t!=ka&&qi(t);n&&n.detach&&n.detach(e,o),o.attach&&o.attach(e,n||null)})),t("extraKeys",null),t("configureMouse",null),t("lineWrapping",!1,Sa,!0),t("gutters",[],(function(e,r){e.display.gutterSpecs=hn(r,e.options.lineNumbers),bn(e)}),!0),t("fixedGutter",!0,(function(e,r){e.display.gutters.style.left=r?io(e.display)+"px":"0",e.refresh()}),!0),t("coverGutterNextToScrollbar",!1,(function(e){return Bo(e)}),!0),t("scrollbarStyle","native",(function(e){Ho(e),Bo(e),e.display.scrollbars.setScrollTop(e.doc.scrollTop),e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)}),!0),t("lineNumbers",!1,(function(e,r){e.display.gutterSpecs=hn(e.options.gutters,r),bn(e)}),!0),t("firstLineNumber",1,bn,!0),t("lineNumberFormatter",(function(e){return e}),bn,!0),t("showCursorWhenSelecting",!1,bo,!0),t("resetSelectionOnContextMenu",!0),t("lineWiseCopyCut",!0),t("pasteLinesPerSelection",!0),t("selectionsMayTouch",!1),t("readOnly",!1,(function(e,r){"nocursor"==r&&(To(e),e.display.input.blur()),e.display.input.readOnlyChanged(r)})),t("screenReaderLabel",null,(function(e,r){r=""===r?null:r,e.display.input.screenReaderLabelChanged(r)})),t("disableInput",!1,(function(e,r){r||e.display.input.reset()}),!0),t("dragDrop",!0,xa),t("allowDropFileTypes",null),t("cursorBlinkRate",530),t("cursorScrollMargin",0),t("cursorHeight",1,bo,!0),t("singleCursorHeightPerLine",!0,bo,!0),t("workTime",100),t("workDelay",100),t("flattenSpans",!0,Rn,!0),t("addModeClass",!1,Rn,!0),t("pollInterval",100),t("undoDepth",200,(function(e,r){return e.doc.history.undoDepth=r})),t("historyEventDelay",1250),t("viewportMargin",10,(function(e){return e.refresh()}),!0),t("maxHighlightLength",1e4,Rn,!0),t("moveInputWithCursor",!0,(function(e,r){r||e.display.input.resetPosition()})),t("tabindex",null,(function(e,r){return e.display.input.getField().tabIndex=r||""})),t("autofocus",null),t("direction","ltr",(function(e,r){return e.doc.setDirection(r)}),!0),t("phrases",null)}(Ta),function(e){var r=e.optionHandlers,t=e.helpers={};e.prototype={constructor:e,focus:function(){window.focus(),this.display.input.focus()},setOption:function(e,t){var o=this.options,n=o[e];o[e]==t&&"mode"!=e||(o[e]=t,r.hasOwnProperty(e)&&en(this,r[e])(this,t,n),he(this,"optionChange",this,e))},getOption:function(e){return this.options[e]},getDoc:function(){return this.doc},addKeyMap:function(e,r){this.state.keyMaps[r?"push":"unshift"](qi(e))},removeKeyMap:function(e){for(var r=this.state.keyMaps,t=0;t<r.length;++t)if(r[t]==e||r[t].name==e)return r.splice(t,1),!0},addOverlay:rn((function(r,t){var o=r.token?r:e.getMode(this.options,r);if(o.startState)throw Error("Overlays may not be stateful.");!function(e,r,t){for(var o=0,n=t(r);o<e.length&&t(e[o])<=n;)o++;e.splice(o,0,r)}(this.state.overlays,{mode:o,modeSpec:r,opaque:t&&t.opaque,priority:t&&t.priority||0},(function(e){return e.priority})),this.state.modeGen++,uo(this)})),removeOverlay:rn((function(e){for(var r=this.state.overlays,t=0;t<r.length;++t){var o=r[t].modeSpec;if(o==e||"string"==typeof e&&o.name==e)return r.splice(t,1),this.state.modeGen++,void uo(this)}})),indentLine:rn((function(e,r,t){"string"!=typeof r&&"number"!=typeof r&&(r=null==r?this.options.smartIndent?"smart":"prev":r?"add":"subtract"),Xe(this.doc,e)&&Ea(this,e,r,t)})),indentSelection:rn((function(e){for(var r=this.doc.sel.ranges,t=-1,o=0;o<r.length;o++){var n=r[o];if(n.empty())n.head.line>t&&(Ea(this,n.head.line,e,!0),t=n.head.line,o==this.doc.sel.primIndex&&Mo(this));else{var i=n.from(),a=n.to(),l=Math.max(t,i.line);t=Math.min(this.lastLine(),a.line-(a.ch?0:1))+1;for(var c=l;c<t;++c)Ea(this,c,e);var d=this.doc.sel.ranges;0==i.ch&&r.length==d.length&&d[o].from().ch>0&&Qn(this.doc,o,new Sn(i,d[o].to()),D)}}})),getTokenAt:function(e,r){return yr(this,e,r)},getLineTokens:function(e,r){return yr(this,er(e),r,!0)},getTokenTypeAt:function(e){e=lr(this.doc,e);var r,t=pr(this,Ze(this.doc,e.line)),o=0,n=(t.length-1)/2,i=e.ch;if(0==i)r=t[2];else for(;;){var a=o+n>>1;if((a?t[2*a-1]:0)>=i)n=a;else{if(!(t[2*a+1]<i)){r=t[2*a+2];break}o=a+1}}var l=r?r.indexOf("overlay "):-1;return l<0?r:0==l?null:r.slice(0,l-1)},getModeAt:function(r){var t=this.doc.mode;return t.innerMode?e.innerMode(t,this.getTokenAt(r).state).mode:t},getHelper:function(e,r){return this.getHelpers(e,r)[0]},getHelpers:function(e,r){var o=[];if(!t.hasOwnProperty(r))return o;var n=t[r],i=this.getModeAt(e);if("string"==typeof i[r])n[i[r]]&&o.push(n[i[r]]);else if(i[r])for(var a=0;a<i[r].length;a++){var l=n[i[r][a]];l&&o.push(l)}else i.helperType&&n[i.helperType]?o.push(n[i.helperType]):n[i.name]&&o.push(n[i.name]);for(var c=0;c<n._global.length;c++){var d=n._global[c];d.pred(i,this)&&-1==U(o,d.val)&&o.push(d.val)}return o},getStateAfter:function(e,r){var t=this.doc;return gr(this,(e=ar(t,null==e?t.first+t.size-1:e))+1,r).state},cursorCoords:function(e,r){var t=this.doc.sel.primary();return Zt(this,null==e?t.head:"object"==typeof e?lr(this.doc,e):e?t.from():t.to(),r||"page")},charCoords:function(e,r){return Vt(this,lr(this.doc,e),r||"page")},coordsChar:function(e,r){return Gt(this,(e=Ht(this,e,r||"page")).left,e.top)},lineAtHeight:function(e,r){return e=Ht(this,{top:e,left:0},r||"page").top,Ye(this.doc,e+this.display.viewOffset)},heightAtLine:function(e,r,t){var o,n=!1;if("number"==typeof e){var i=this.doc.first+this.doc.size-1;e<this.doc.first?e=this.doc.first:e>i&&(e=i,n=!0),o=Ze(this.doc,e)}else o=e;return jt(this,o,{top:0,left:0},r||"page",t||n).top+(n?this.doc.height-jr(o):0)},defaultTextHeight:function(){return to(this.display)},defaultCharWidth:function(){return oo(this.display)},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(e,r,t,o,n){var i,a=this.display,l=(e=Zt(this,lr(this.doc,e))).bottom,c=e.left;if(r.style.position="absolute",r.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(r),a.sizer.appendChild(r),"over"==o)l=e.top;else if("above"==o||"near"==o){var d=Math.max(a.wrapper.clientHeight,this.doc.height),s=Math.max(a.sizer.clientWidth,a.lineSpace.clientWidth);("above"==o||e.bottom+r.offsetHeight>d)&&e.top>r.offsetHeight?l=e.top-r.offsetHeight:e.bottom+r.offsetHeight<=d&&(l=e.bottom),c+r.offsetWidth>s&&(c=s-r.offsetWidth)}r.style.top=l+"px",r.style.left=r.style.right="","right"==n?(c=a.sizer.clientWidth-r.offsetWidth,r.style.right="0px"):("left"==n?c=0:"middle"==n&&(c=(a.sizer.clientWidth-r.offsetWidth)/2),r.style.left=c+"px"),t&&(null!=(i=Ao(this,{left:c,top:l,right:c+r.offsetWidth,bottom:l+r.offsetHeight})).scrollTop&&Fo(this,i.scrollTop),null!=i.scrollLeft&&Wo(this,i.scrollLeft))},triggerOnKeyDown:rn(ca),triggerOnKeyPress:rn(sa),triggerOnKeyUp:da,triggerOnMouseDown:rn(ha),execCommand:function(e){if($i.hasOwnProperty(e))return $i[e].call(null,this)},triggerElectric:rn((function(e){Ra(this,e)})),findPosH:function(e,r,t,o){var n=1;r<0&&(n=-1,r=-r);for(var i=lr(this.doc,e),a=0;a<r&&!(i=Ia(this.doc,i,n,t,o)).hitSide;++a);return i},moveH:rn((function(e,r){var t=this;this.extendSelectionsBy((function(o){return t.display.shift||t.doc.extend||o.empty()?Ia(t.doc,o.head,e,r,t.options.rtlMoveVisually):e<0?o.from():o.to()}),H)})),deleteH:rn((function(e,r){var t=this.doc.sel,o=this.doc;t.somethingSelected()?o.replaceSelection("",null,"+delete"):Gi(this,(function(t){var n=Ia(o,t.head,e,r,!1);return e<0?{from:n,to:t.head}:{from:t.head,to:n}}))})),findPosV:function(e,r,t,o){var n=1,i=o;r<0&&(n=-1,r=-r);for(var a=lr(this.doc,e),l=0;l<r;++l){var c=Zt(this,a,"div");if(null==i?i=c.left:c.left=i,(a=Wa(this,c,n,t)).hitSide)break}return a},moveV:rn((function(e,r){var t=this,o=this.doc,n=[],i=!this.display.shift&&!o.extend&&o.sel.somethingSelected();if(o.extendSelectionsBy((function(a){if(i)return e<0?a.from():a.to();var l=Zt(t,a.head,"div");null!=a.goalColumn&&(l.left=a.goalColumn),n.push(l.left);var c=Wa(t,l,e,r);return"page"==r&&a==o.sel.primary()&&_o(t,Vt(t,c,"div").top-l.top),c}),H),n.length)for(var a=0;a<o.sel.ranges.length;a++)o.sel.ranges[a].goalColumn=n[a]})),findWordAt:function(e){var r=Ze(this.doc,e.line).text,t=e.ch,o=e.ch;if(r){var n=this.getHelper(e,"wordChars");"before"!=e.sticky&&o!=r.length||!t?++o:--t;for(var i=r.charAt(t),a=ee(i,n)?function(e){return ee(e,n)}:/\s/.test(i)?function(e){return/\s/.test(e)}:function(e){return!/\s/.test(e)&&!ee(e)};t>0&&a(r.charAt(t-1));)--t;for(;o<r.length&&a(r.charAt(o));)++o}return new Sn(er(e.line,t),er(e.line,o))},toggleOverwrite:function(e){null!=e&&e==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?z(this.display.cursorDiv,"CodeMirror-overwrite"):L(this.display.cursorDiv,"CodeMirror-overwrite"),he(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==R()},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:rn((function(e,r){Ro(this,e,r)})),getScrollInfo:function(){var e=this.display.scroller;return{left:e.scrollLeft,top:e.scrollTop,height:e.scrollHeight-Tt(this)-this.display.barHeight,width:e.scrollWidth-Tt(this)-this.display.barWidth,clientHeight:Et(this),clientWidth:Lt(this)}},scrollIntoView:rn((function(e,r){null==e?(e={from:this.doc.sel.primary().head,to:null},null==r&&(r=this.options.cursorScrollMargin)):"number"==typeof e?e={from:er(e,0),to:null}:null==e.from&&(e={from:e,to:null}),e.to||(e.to=e.from),e.margin=r||0,null!=e.from.line?function(e,r){zo(e),e.curOp.scrollToPos=r}(this,e):No(this,e.from,e.to,e.margin)})),setSize:rn((function(e,r){var t=this,o=function(e){return"number"==typeof e||/^\d+$/.test(e+"")?e+"px":e};null!=e&&(this.display.wrapper.style.width=o(e)),null!=r&&(this.display.wrapper.style.height=o(r)),this.options.lineWrapping&&Pt(this);var n=this.display.viewFrom;this.doc.iter(n,this.display.viewTo,(function(e){if(e.widgets)for(var r=0;r<e.widgets.length;r++)if(e.widgets[r].noHScroll){po(t,n,"widget");break}++n})),this.curOp.forceUpdate=!0,he(this,"refresh",this)})),operation:function(e){return $o(this,e)},startOperation:function(){return Zo(this)},endOperation:function(){return Jo(this)},refresh:rn((function(){var e=this.display.cachedTextHeight;uo(this),this.curOp.forceUpdate=!0,Kt(this),Ro(this,this.doc.scrollLeft,this.doc.scrollTop),sn(this.display),(null==e||Math.abs(e-to(this.display))>.5||this.options.lineWrapping)&&lo(this),he(this,"refresh",this)})),swapDoc:rn((function(e){var r=this.doc;return r.cm=null,this.state.selectingText&&this.state.selectingText(),In(this,e),Kt(this),this.display.input.reset(),Ro(this,e.scrollLeft,e.scrollTop),this.curOp.forceScroll=!0,lt(this,"swapDoc",this,r),r})),phrase:function(e){var r=this.options.phrases;return r&&Object.prototype.hasOwnProperty.call(r,e)?r[e]:e},getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},ye(e),e.registerHelper=function(r,o,n){t.hasOwnProperty(r)||(t[r]=e[r]={_global:[]}),t[r][o]=n},e.registerGlobalHelper=function(r,o,n,i){e.registerHelper(r,o,i),t[r]._global.push({pred:n,val:i})}}(Ta);var Ha="iter insert remove copy getEditor constructor".split(" ");for(var Va in _i.prototype)_i.prototype.hasOwnProperty(Va)&&U(Ha,Va)<0&&(Ta.prototype[Va]=function(e){return function(){return e.apply(this.doc,arguments)}}(_i.prototype[Va]));return ye(_i),Ta.inputStyles={textarea:ja,contenteditable:Pa},Ta.defineMode=function(e){Ta.defaults.mode||"null"==e||(Ta.defaults.mode=e),We.apply(this,arguments)},Ta.defineMIME=function(e,r){Ie[e]=r},Ta.defineMode("null",(function(){return{token:function(e){return e.skipToEnd()}}})),Ta.defineMIME("text/plain","null"),Ta.defineExtension=function(e,r){Ta.prototype[e]=r},Ta.defineDocExtension=function(e,r){_i.prototype[e]=r},Ta.fromTextArea=function(e,r){if((r=r?W(r):{}).value=e.value,!r.tabindex&&e.tabIndex&&(r.tabindex=e.tabIndex),!r.placeholder&&e.placeholder&&(r.placeholder=e.placeholder),null==r.autofocus){var t=R();r.autofocus=t==e||null!=e.getAttribute("autofocus")&&t==document.body}function o(){e.value=l.getValue()}var n;if(e.form&&(ue(e.form,"submit",o),!r.leaveSubmitMethodAlone)){var i=e.form;n=i.submit;try{var a=i.submit=function(){o(),i.submit=n,i.submit(),i.submit=a}}catch(e){}}r.finishInit=function(t){t.save=o,t.getTextArea=function(){return e},t.toTextArea=function(){t.toTextArea=isNaN,o(),e.parentNode.removeChild(t.getWrapperElement()),e.style.display="",e.form&&(ge(e.form,"submit",o),r.leaveSubmitMethodAlone||"function"!=typeof e.form.submit||(e.form.submit=n))}},e.style.display="none";var l=Ta((function(r){return e.parentNode.insertBefore(r,e.nextSibling)}),r);return l},function(e){e.off=ge,e.on=ue,e.wheelEventPixels=wn,e.Doc=_i,e.splitLines=Me,e.countColumn=P,e.findColumn=V,e.isWordChar=$,e.Pass=B,e.signal=he,e.Line=Zr,e.changeEnd=En,e.scrollbarModel=jo,e.Pos=er,e.cmpPos=rr,e.modes=Fe,e.mimeModes=Ie,e.resolveMode=Pe,e.getMode=Ke,e.modeExtensions=Ue,e.extendMode=Be,e.copyState=De,e.startState=He,e.innerMode=je,e.commands=$i,e.keyMap=Bi,e.keyName=Ji,e.isModifierKey=Vi,e.lookupKey=Hi,e.normalizeKeyMap=ji,e.StringStream=Ve,e.SharedTextMarker=Li,e.TextMarker=Si,e.LineWidget=wi,e.e_preventDefault=ve,e.e_stopPropagation=ke,e.e_stop=Ce,e.addClass=z,e.contains=M,e.rmClass=L,e.keyNames=Wi}(Ta),Ta.version="5.58.2",Ta},(window||self).CodeMirror=Zr(),qr.prototype.start=function(e){return this.stream=e,this.line=0,this.string=e.string.slice(e.start),this.startLine=e.string,this.startPos=e.start,this},qr.prototype.startLinebreak=function(){return this.stream=null,this.line=this.startPos=0,this.string="\n",this.startLine="",this},qr.prototype.copy=function(){var e=this.copyInstance||(this.copyInstance=new qr);return e.stream=this.stream,e.startPos=this.startPos,e.line=this.line,e.startLine=this.startLine,e.string=this.string,e},qr.prototype.updateStart=function(){this.startLine=this.stream?0==this.line?this.stream.string:this.stream.lookAhead(this.line):"",this.startPos=this.startLine.length-(this.string.length-1)},qr.prototype.ahead=function(e){for(;;){if(e<=this.string.length)return!0;if(10!==this.string.charCodeAt(this.string.length-1))this.string+="\n";else{if(3===this.line||!this.stream||!this.stream.lookAhead)return!1;var r=this.stream.lookAhead(this.line+1);if(null==r)return!1;this.string+=r+"\n",this.line++}}};var Gr=null;function Qr(e,r){this.State=function(e,r){function t(e,r){this.stack=e,this.context=r}function o(){return null}return t.prototype.matchNext=function(r,t,o,n){for(var i=this.stack.length-1,a=this.stack[i],l=e.nodes[a],c=0;c<l.length;c++){var d,s,u=l[c];if(0===u)d=t,s=l[++c];else{if(1===u||2===u){var p=l[++c],g=l[++c];this.go(g);var h=this.context;if(2===u){var f=l[++c];this.context=new Jr(f.name,f.token,this.stack.length,this.context,r.startLine,r.startPos)}this.stack.push(p);var b=this.matchNext(r,t,0,!1);if(b===t&&(b=this.matchNext(r,t,c==l.length-1?o:0,n)),b<0){this.stack.length=i+1,this.stack[i]=a,this.context=h;continue}return b}if(3===u){var m=l[++c];d=this.matchExpr(l[++c],r,t),s=l[++c],d>t&&(Gr=m)}else d=this.matchExpr(u,r,t),s=l[++c]}if(d<0){if(!(o>0&&c==l.length-1))continue;o--,d=t}if(this.go(s),!n&&-1===s||0===this.stack.length)return d;if(d>t)return d;if((d=this.matchNext(r,t,c==l.length-1?o:0,n))>=0)return d;this.stack.length=i+1,this.stack[i]=a}return-1},t.prototype.go=function(e){for(this.stack.pop();this.context&&this.context.depth>this.stack.length;)this.context=this.context.parent;-1!==e&&this.stack.push(e)},t.prototype.runMaybe=function(e,r,t){return Gr=null,this.matchNext(e,r,t,!0)},t.prototype.forward=function(r,t){var o=this.runMaybe(r,t,2);return o<0&&(this.stack.push(e.token),o=this.runMaybe(r,t,0)),o},t.prototype.lookahead=function(e,r,t){var o=Gr,n=new this.constructor([t],null);for(e=e.copy();;){e.updateStart();var i=n.runMaybe(e,r,0);if(i<0)return Gr=o,!1;if(0===n.stack.length)return Gr=o,!0;r=i}},t.prototype.matchExpr=function(e,t,n){if("string"==typeof e){var i=n+e.length;return t.ahead(i)&&t.string.slice(n,i)===e?i:-1}if(e.exec){var a=t.ahead(n+1)&&e.exec(n>0?t.string.slice(n):t.string);return a?n+a[0].length:-1}var l,c=e[0];if(0===c){for(var d=1;d<e.length;d++)if((n=this.matchExpr(e[d],t,n))<0)return-1;return n}if(1===c){d=1;for(var s=e.length-1;;d++){var u=this.matchExpr(e[d],t,n);if(d===s||u>-1)return u}return-1}if(2!==c&&3!==c){if(4===c)return Math.max(this.matchExpr(e[1],t,n),n);if(5===c)return this.lookahead(t,n,e[1])?n:-1;if(6===c)return this.lookahead(t,n,e[1])?-1:n;if(7===c){var p,g,h=n?t.string.lastIndexOf("\n",n-1):-1;if(t.stream&&h<0)p=t.stream.string,g=n+t.stream.start;else{var f=t.string.indexOf("\n",n);p=t.string.slice(h+1,f<0?t.string.length:f),g=n-(h+1)}return r.predicates[e[1]](p,g,this.context,t.stream?(l=t.stream,function(e){return l.lookAhead(e)}):o)?n:-1}throw Error("Unknown match type "+e)}if(3===c&&(n=this.matchExpr(e[1],t,n))<0)return-1;for(;;){var b=this.matchExpr(e[1],t,n);if(-1==b)return n;n=b}},t.prototype.contextAt=function(e,r){var t=this.copy(),o=new qr,n=0,i=this.context;for(o.string=e+"\n",o.startLine=e;;){var a=t.runMaybe(o,n,0);if(-1==a)return t.context;if(a>r){var l=t.context;if(n==r)e:for(;l;){for(var c=i;c;c=c.parent)if(c===l)break e;l=l.parent}return l}n=a,i=t.context}},t.prototype.copy=function(){return new this.constructor(this.stack.slice(),this.context)},t.start=function(){return new this([e.start],null)},t}(e,r||{}),this.mcx=new qr}CodeMirror.GrammarMode=Qr,Qr.prototype.startState=function(){return this.State.start()},Qr.prototype.copyState=function(e){return e.copy()},Qr.prototype.token=function(e,r){e.pos+=r.forward(this.mcx.start(e),0);for(var t=Gr,o=r.context;o;o=o.parent)o.tokenType&&(t=o.tokenType+(t?" "+t:""));return e.eol()&&r.forward(this.mcx,e.pos-e.start),t},Qr.prototype.blankLine=function(e){e.forward(this.mcx.startLinebreak(),0)},function(e){var r=[/^(?:var|let|const)(?![a-zA-Z¡-￿_0-9_\$])/,/^while(?![a-zA-Z¡-￿_0-9_\$])/,/^with(?![a-zA-Z¡-￿_0-9_\$])/,/^do(?![a-zA-Z¡-￿_0-9_\$])/,/^debugger(?![a-zA-Z¡-￿_0-9_\$])/,/^if(?![a-zA-Z¡-￿_0-9_\$])/,/^function(?![a-zA-Z¡-￿_0-9_\$])/,/^for(?![a-zA-Z¡-￿_0-9_\$])/,/^default(?![a-zA-Z¡-￿_0-9_\$])/,/^case(?![a-zA-Z¡-￿_0-9_\$])/,/^return(?![a-zA-Z¡-￿_0-9_\$])/,/^throw(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:break|continue)(?![a-zA-Z¡-￿_0-9_\$])/,/^switch(?![a-zA-Z¡-￿_0-9_\$])/,/^try(?![a-zA-Z¡-￿_0-9_\$])/,/^class(?![a-zA-Z¡-￿_0-9_\$])/,/^export(?![a-zA-Z¡-￿_0-9_\$])/,/^import(?![a-zA-Z¡-￿_0-9_\$])/,[0,"async",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,114]],[1,";",/^(?=\})/,[7,"canInsertSemi"]],/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*/,/^extends(?![a-zA-Z¡-￿_0-9_\$])/,/^from(?![a-zA-Z¡-￿_0-9_\$])/,/^else(?![a-zA-Z¡-￿_0-9_\$])/,/^catch(?![a-zA-Z¡-￿_0-9_\$])/,/^finally(?![a-zA-Z¡-￿_0-9_\$])/,/^as(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:true|false|null|undefined|NaN|Infinity)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:super|this)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:delete|typeof|yield|await|void)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.|\!|\+\+?|\-\-?)/,/^(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:[0-9][0-9_]*(?:\.[0-9_]*)?|\.[0-9_]+)(?:[eE][\+\-]?[0-9_]+)?)/,/^\/(?![\/\*])(?:\\.|\[(?:(?!\]).)*\]|(?!\/).)+\/[gimyus]*/,/^(?:\+\+|\-\-)/,/^(?:(?:\+|\-|\%|\*|\/(?![\/\*])|\>\>?\>?|\<\<?|\=\=?|\&\&?|\|\|?|\^|\!\=)\=?|\?\?)/,/^(?:in|instanceof)(?![a-zA-Z¡-￿_0-9_\$])/,/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\()/,/^(?:\.|\?\.)/,[1,"\n","\t"," "],/^new(?![a-zA-Z¡-￿_0-9_\$])/],t=Object.freeze({nodes:[[1,6,2],[/^[^]/,0],[1,6,3],[2,7,4,{name:"Statement"},0,1],[1,6,3],[3,"keyword",r[0],-1,3,"keyword",r[1],-1,3,"keyword",r[2],-1,3,"keyword",r[23],-1,3,"keyword",r[3],-1,3,"keyword",r[14],-1,3,"keyword",r[25],-1,3,"keyword",r[10],-1,3,"keyword",r[11],-1,3,"keyword",r[12],-1,3,"keyword",r[4],-1,3,"keyword",r[9],-1,3,"keyword",r[8],-1,3,"keyword",r[6],-1,3,"keyword",r[5],-1,3,"keyword",r[24],-1,3,"keyword",r[7],-1,3,"keyword",r[13],-1,3,"keyword",r[15],-1,3,"keyword",r[16],-1,3,"keyword",r[17],-1,3,"keyword",r[21],-1,3,"keyword",r[18],-1,3,"keyword",r[39],-1,3,"keyword",r[35],-1,3,"keyword",r[29],-1,3,"keyword",r[28],-1,3,"atom",r[27],-1,3,"variable",r[20],-1,3,"operator",r[30],-1,3,"operator",r[34],-1,3,"operator",r[33],-1,2,116,-1,{name:"string",token:"string"},3,"number",r[31],-1,2,121,-1,{name:"comment",token:"comment"},3,"string-2",r[32],-1,1,125,-1,/^[^]/,-1],[r[38],6,2,121,6,{name:"comment",token:"comment"},0,-1],[3,"keyword",r[0],8,3,"keyword",r[1],23,3,"keyword",r[2],23,3,"keyword",r[3],27,2,129,-1,{name:"Block"},";",-1,3,"keyword",r[4],-1,3,"keyword",r[5],35,3,"keyword",r[6],40,3,"keyword",r[7],46,3,"keyword",r[8],48,/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\:)/,48,3,"keyword",r[9],49,3,"keyword",r[10],52,3,"keyword",r[11],56,3,"keyword",r[12],60,3,"keyword",r[13],64,3,"keyword",r[14],68,3,"keyword",r[15],72,3,"keyword",r[16],80,3,"keyword",r[17],92,3,"keyword",r[18],108,"@",110,1,133,112],[1,6,9],[1,139,10],[1,6,11],[3,"operator","=",12,0,13],[1,6,14],[1,6,15],[1,142,13],[",",16,r[19],-1],[1,6,17],[1,139,18],[1,6,19],[3,"operator","=",20,0,21],[1,6,22],[1,6,15],[1,142,21],[1,6,24],[2,146,25,{name:"CondExpr"}],[1,6,26],[2,7,-1,{name:"Statement"}],[1,6,28],[2,7,29,{name:"Statement"}],[1,6,30],[3,"keyword",r[1],31,0,-1],[1,6,32],[2,146,33,{name:"CondExpr"}],[1,6,34],[r[19],-1],[1,6,36],[2,146,37,{name:"CondExpr"}],[1,6,38],[2,7,39,{name:"Statement"}],[2,151,-1,{name:"Alternative"}],[1,6,41],[3,"keyword","*",42,0,42],[1,6,43],[3,"def",r[20],44],[1,6,45],[2,155,-1,{name:"FunctionDef"}],[1,6,47],[2,158,-1,{name:"ForStatement"}],[1,6,50],[1,6,51],[":",-1],[1,133,48],[1,6,53],[r[19],-1,1,133,54],[1,6,55],[r[19],-1],[1,6,57],[1,133,58],[1,6,59],[r[19],-1],[1,6,61],[/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*)?/,62],[1,6,63],[r[19],-1],[1,6,65],[2,146,66,{name:"CondExpr"}],[1,6,67],[2,129,-1,{name:"Block"}],[1,6,69],[2,129,70,{name:"Block"}],[1,6,71],[2,161,-1,{name:"CatchFinally"}],[1,6,73],[3,"type def",r[20],74],[1,6,75],[3,"keyword",r[21],76,0,77],[1,6,78],[1,6,79],[1,133,77],[2,174,-1,{name:"ClassBody"}],[1,6,81],["*",82,3,"keyword",r[8],82,"{",83,2,7,-1,{name:"Statement"}],[1,6,84],[1,6,85],[3,"keyword",r[22],86,0,87],[1,182,88],[1,6,89],[1,6,90],[1,6,91],[2,116,87,{name:"string",token:"string"}],[r[19],-1],["}",82],[1,6,93],[2,116,94,{name:"string",token:"string"},3,"keyword","*",95,1,188,96,"{",97],[1,6,98],[1,6,99],[1,6,100],[1,6,101],[r[19],-1],[3,"keyword",r[26],102,0,96],[3,"keyword",r[22],103,0,94],[1,182,104],[1,6,105],[1,6,106],[1,6,107],[3,"def",r[20],96],[2,116,94,{name:"string",token:"string"}],["}",96],[1,6,109],[2,7,-1,{name:"Statement"}],[1,6,111],[1,133,-1],[1,6,113],[r[19],-1],[1,6,115],[3,"keyword",r[6],-1,/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*|\()/,-1],["'",117,'"',119],["\\",118,/^(?!\')./,117,"'",-1],[/^[^]/,117],["\\",120,/^(?!\")./,119,'"',-1],[/^[^]/,119],[/^\/\*\*(?!\/)/,122,"/*",124,/^\/\/.*/,-1],[1,193,122,0,123],[2,196,123,{name:"doccomment.tagGroup"},"*/",-1],[[0,/^(?!\*\/)/,/^[^]/],124,"*/",-1],[3,"string-2","`",126],[3,"string-2","${",127,2,198,126,{name:"str2",token:"string-2"},3,"string-2",/^(?:(?!\`|\$\{|\\).)+/,126,3,"string-2","`",-1],[1,133,128],[3,"string-2","}",126],["{",130],[1,6,131],[2,7,132,{name:"Statement"},"}",-1],[1,6,131],[1,200,134],[1,6,135],[",",136,1,218,137,0,-1],[1,6,138],[1,6,135],[1,142,137],[3,"operator","...",140,0,140],[1,6,141],[3,"def",r[20],-1,2,233,-1,{name:"ArrayPattern"},2,238,-1,{name:"ObjectPattern"}],[1,200,143],[1,6,144],[1,243,145,0,-1],[1,6,144],["(",147],[1,6,148],[1,133,149],[1,6,150],[")",-1],[1,6,152],[3,"keyword",r[23],153,0,-1],[1,6,154],[2,7,-1,{name:"Statement"}],[2,258,156,{name:"ParamList"}],[1,6,157],[2,129,-1,{name:"Block"}],[2,263,159,{name:"ForSpec"}],[1,6,160],[2,7,-1,{name:"Statement"}],[3,"keyword",r[24],162,0,170],[1,6,163],["(",164,0,165],[1,6,166],[1,6,167],[1,139,168],[2,129,170,{name:"Block"}],[1,6,169],[")",165],[1,6,171],[3,"keyword",r[25],172,0,-1],[1,6,173],[2,129,-1,{name:"Block"}],["{",175],[1,6,176],[3,"keyword",/^static(?![a-zA-Z¡-￿_0-9_\$])/,177,0,177,"@",178,"}",-1],[1,6,179],[1,6,180],[2,274,181,{name:"ObjectMember"}],[1,133,181],[1,6,176],[1,188,183,0,-1],[1,6,184],[",",185,0,-1],[1,6,186],[1,188,187,0,187],[1,6,184],[3,"variable",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= +as)/,189,3,"def",r[20],-1],[1,6,190],[3,"keyword",r[26],191],[1,6,192],[3,"def",r[20],-1],[0,194,2,289,-1,{name:"doccomment.braced"}],[[0,/^(?!\*\/|\@[a-zA-Z¡-￿_0-9]|\{)/,/^[^]/],195],[0,194,0,-1],[1,293,197],[1,193,197,0,-1],["\\",199,"\n",-1],[/^[^]/,-1],[3,"atom",r[27],-1,3,"keyword",r[28],-1,3,"keyword",r[29],201,3,"operator",r[30],201,3,"keyword",r[18],201,2,299,-1,{name:"NewExpression"},3,"keyword",r[6],203,3,"keyword",r[15],209,2,309,-1,{name:"ArrowFunc"},3,"variable callee",r[36],-1,3,"variable",r[20],-1,3,"number",r[31],-1,2,116,-1,{name:"string",token:"string"},3,"string-2",r[32],-1,1,125,-1,2,313,-1,{name:"ArrayLiteral"},2,318,-1,{name:"ObjectLiteral"},2,323,-1,{name:"ParenExpr"}],[1,6,202],[1,200,-1],[1,6,204],[3,"keyword","*",205,0,205],[1,6,206],[3,"def",r[20],207,0,207],[1,6,208],[2,155,-1,{name:"FunctionDef"}],[1,6,210],[[6,328],211,0,212],[3,"type def",r[20],212],[1,6,213],[3,"keyword",r[21],214,0,215],[1,6,216],[1,6,217],[1,133,215],[2,174,-1,{name:"ClassBody"}],[3,"operator",r[33],-1,3,"operator",r[34],219,3,"keyword",r[35],219,2,329,-1,{name:"ArgList"},1,125,-1,r[37],221,"[",223,3,"operator","?",227],[1,6,220],[1,133,-1],[1,6,222],[3,"property callee",r[36],-1,3,"property",r[20],-1],[1,6,224],[1,133,225],[1,6,226],["]",-1],[1,6,228],[1,133,229],[1,6,230],[3,"operator",":",231],[1,6,232],[1,133,-1],["[",234],[1,6,235],[1,334,236],[1,6,237],["]",-1],["{",239],[1,6,240],[1,340,241],[1,6,242],["}",-1],[3,"operator",r[33],-1,3,"operator",r[34],244,3,"keyword",r[35],244,2,329,-1,{name:"ArgList"},1,125,-1,r[37],246,"[",248,3,"operator","?",252],[1,6,245],[1,142,-1],[1,6,247],[3,"property callee",r[36],-1,3,"property",r[20],-1],[1,6,249],[1,133,250],[1,6,251],["]",-1],[1,6,253],[1,133,254],[1,6,255],[3,"operator",":",256],[1,6,257],[1,142,-1],["(",259],[1,6,260],[1,346,261],[1,6,262],[")",-1],["(",264],[1,6,265],[2,352,266,{name:"StatementMaybeOf"}],[1,6,267],[1,133,268,0,268,0,272],[1,6,269],[";",270],[1,6,271],[1,133,272,0,272],[1,6,273],[")",-1],[3,"keyword",/^(?:get|set|async)(?![a-zA-Z¡-￿_0-9_\$])(?! *[\,\}\:\(])/,275,0,275],[1,6,276],[3,"keyword","*",277,0,277],[1,6,278],[3,"def property",r[20],279,"[",280,3,"number",r[31],279,2,116,279,{name:"string",token:"string"},3,"operator","...",281],[1,6,282],[1,6,283],[1,6,284],[2,155,-1,{name:"FunctionDef"},":",285,0,-1],[1,133,286],[1,142,-1],[1,6,287],[1,6,288],[1,142,-1],["]",279],["{",290],[1,293,291,1,193,292],[[0,/^(?!\}|\*\/)/,/^[^]/],291,0,292],[/^(?:\}|(?=\*\/))/,-1],[3,"tag",/^\@(?:member|param|arg(?:ument)?|module|namespace|typedef)(?![a-zA-Z¡-￿_0-9])/,294,3,"tag",/^\@[a-zA-Z¡-￿_0-9]+/,-1],[r[38],294,"{",295,0,296,0,-1],[2,357,297,{name:"doccomment.type"}],[3,"def",/^[a-zA-Z¡-￿_0-9]+/,-1,0,-1],["}",298],[[1,"\n","\t"," ",/^\*(?!\/)/],298,0,296],[3,"keyword",r[39],300],[1,6,301],[".",302,1,200,303],[1,6,304],[1,6,305],[3,"keyword",/^target(?![a-zA-Z¡-￿_0-9_\$])/,-1],[2,329,306,{name:"ArgList"},".",307,0,-1],[1,6,305],[1,6,308],[3,"property callee",r[36],306,3,"property",r[20],306],[3,"def",[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,361]],311,[5,363],310],[2,258,311,{name:"ParamList"}],[1,6,312],[2,366,-1,{name:"ArrowRest"}],["[",314],[1,6,315],[1,369,316],[1,6,317],["]",-1],["{",319],[1,6,320],[1,375,321],[1,6,322],["}",-1],["(",324],[1,6,325],[1,133,326],[1,6,327],[")",-1],[3,"keyword",r[21],-1],["(",330],[1,6,331],[1,369,332],[1,6,333],[")",-1],[1,381,335,0,335,0,-1],[1,6,336],[",",337,0,-1],[1,6,338],[1,381,339,0,339,0,339],[1,6,336],[1,386,341,0,-1],[1,6,342],[",",343,0,-1],[1,6,344],[1,386,345,0,345],[1,6,342],[1,381,347,0,-1],[1,6,348],[",",349,0,-1],[1,6,350],[1,381,351,0,351],[1,6,348],[2,7,353,{name:"Statement"}],[1,6,354],[3,"keyword",/^of(?![a-zA-Z¡-￿_0-9_\$])/,355,0,-1],[1,6,356],[1,133,-1],[3,"type","{",358,3,"type",/^(?:(?!\{|\}|\*\/).)+/,357,"\n",359,0,-1],[2,357,360,{name:"doccomment.type"}],[/^[\t ]*(?:\*(?!\/)[\t ]*)?/,357],[/^(?=\*\/)/,357,3,"type","}",357],[1,6,362],["=>",-1],[2,258,364,{name:"ParamList"}],[1,6,365],["=>",-1],[3,"operator","=>",367],[1,6,368],[2,129,-1,{name:"Block"},1,142,-1],[1,142,370,0,-1],[1,6,371],[",",372,0,-1],[1,6,373],[1,142,374,0,374],[1,6,371],[2,274,376,{name:"ObjectMember"},0,-1],[1,6,377],[",",378,0,-1],[1,6,379],[2,274,380,{name:"ObjectMember"},0,380],[1,6,377],[1,139,382],[1,6,383],[3,"operator","=",384,0,-1],[1,6,385],[1,142,-1],[3,"def",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?![a-z]|[A-Z]|[¡-￿]|_|[0-9]|_|\$| *\:)/,387,3,"property",r[20],391,3,"number",r[31],391,2,116,391,{name:"string",token:"string"},3,"operator","...",395],[1,6,388],[3,"operator","=",389,0,-1],[1,6,390],[1,142,-1],[1,6,392],[":",393],[1,6,394],[1,381,-1],[1,6,396],[1,381,-1]],start:0,token:5}),o=/(^|\s)variable($|\s)/;function n(e){var r=/^(if|for|do|while|try)\b/.exec(e.startLine.slice(e.startPos));return r&&r[1]}var i={Block:"}",BlockOf:"}",ClassBody:"}",AnnotationTypeBody:"}",ObjectLiteral:"}",ObjectPattern:"}",EnumBody:"}",LambdaBlock:"}",WhenBody:"}",ObjType:"}",ArrayInitializer:"}",NamespaceBlock:"}",BraceTokens:"}",ArrayLiteral:"]",BracketTokens:"]",TupleType:"]",ParamList:")",SimpleParamList:")",ArgList:")",ParenExpr:")",CondExpr:")",ForSpec:")",ParenTokens:")",ParenthesizedExpression:")",ConstructorParamList:")",TypeParams:">",TypeArgs:">",TemplateArgs:">",TemplateParams:">"},a=["Block","NamespaceBlock","ClassBody","AnnotationTypeBody","BlockOf","EnumBody"],l=["Statement","ObjectMember","ClassItem","EnumConstant","AnnotationTypeItem","ArgExpr","StatementMaybeOf","NewExpr"];function c(r,t){for(var o=r.startLine;;r=r.parent){if("CondExpr"==r.name)return e.countColumn(r.startLine,r.startPos+1,t.tabSize);if(l.indexOf(r.name)>-1&&/(^\s*|[\(\{\[])$/.test(r.startLine.slice(0,r.startPos)))return e.countColumn(r.startLine,r.startPos,t.tabSize);if(!r.parent||r.parent.startLine!=o)return e.countColumn(r.startLine,null,t.tabSize)}}function d(r,t,o){if(!r)return 0;if("string"==r.name||"comment"==r.name)return e.Pass;var u,p,g=i[r.name],h=t&&t.charAt(0)==g;if(g&&!1!==o.align&&function(e){return!/^\s*((\/\/.*)?$|.*=>)/.test(e.startLine.slice(e.startPos+1))}(r))return e.countColumn(r.startLine,r.startPos,o.tabSize)+(h?0:1);if(g&&a.indexOf(r.name)>-1){var f=r.parent;f&&"Statement"==f.name&&f.parent&&"Statement"==f.parent.name&&n(f.parent)&&!n(f)&&(f=f.parent);var b=s(f,o);return h||"NamespaceBlock"==r.name?b:/^(public|private|protected)\s*:/.test(t)?b+1:!(p=r.parent)||"Statement"!=p.name||!/^switch\b/.test(p.startLine.slice(p.startPos))||(u=t)&&/^\s*(case|default)\b/.test(u)?b+o.indentUnit:b+2*o.indentUnit}var m=c(r,o.tabSize);return g?h&&(o.dontCloseBrackets||"").indexOf(g)<0?m:m+o.indentUnit*((o.doubleIndentBrackets||"").indexOf(g)<0?1:2):l.indexOf(r.name)>-1?n(r)?m+o.indentUnit:m+2*o.indentUnit:"Alternative"==r.name||"CatchFinally"==r.name?(m=c(r.parent,o.tabSize),!t||/^((else|catch|finally)\b|\/[\/\*])/.test(t)?m:m+o.indentUnit):"ArrowRest"==r.name?m+o.indentUnit:"NewExpression"==r.name&&r.startLine.length>r.startPos+5?e.countColumn(r.startLine,r.startPos,o.tabSize)+2*o.indentUnit:"InitializerList"==r.name?m+2:"ThrowsClause"!=r.name||/throws\s*$/.test(r.startLine.slice(r.startPos))?d(r.parent,t,o):m+2*o.indentUnit}function s(r,t){for(;;r=r.parent){if(!r)return 0;if(l.indexOf(r.name)>-1||r.parent&&i[r.parent.name])return e.countColumn(r.startLine,null,t.tabSize)}}function u(r,t,o,n){var i=r.context&&r.context.name;if("DeclType"==i||"BeforeStatement"==i||"AnnotationHead"==i||"Template"==i||"str"==i)return s(r.context,n);if(("doccomment.braced"==i||"doccomment.tagGroup"==i)&&!/^[@*]/.test(t))return e.countColumn(r.context.startLine,null,n.tabSize)+2*n.indentUnit;var a=n.forceContent&&/^\s*(\/\/.*)?$/.test(o)?"x":o;return d(r.contextAt(a,o.length-t.length),t,n)}function p(e,r){for(var t=r-1;t>=0;t--){var o=e.charCodeAt(t);if(10===o)break;if(32!==o&&9!==o)return!1}return!0}var g=function(e){this.config=e};g.prototype.startState=function(){return new h},g.prototype.copyState=function(e){return e.copy()},g.prototype.shouldInterceptTokenizing=function(e){var r=e.currentTemplateState;return void 0!==r&&null!==r.mode},g.prototype.interceptTokenizing=function(e,r){if(e.match("${")&&(e.backUp(2),!this.isEscaped(e,e.pos-2)))return{handled:!1};if("`"===e.peek()&&!this.isEscaped(e,e.pos))return{handled:!1};var t=r.currentTemplateState,o=t.mode,n=t.state,i=o.token(e,n);return this.backupIfEmbeddedTokenizerOvershot(e),{handled:!0,style:i}},g.prototype.trackState=function(e,r,t){if(e){var o=t.currentTemplateState;o&&"inline-expression"!==o.kind?this.trackStateInTemplate(e,r,t,o):this.trackStateNotInTemplate(e,r,t,o),t.previousVariable="variable"===e?r.current():null}},g.prototype.trackStateNotInTemplate=function(e,r,t,o){if(o&&"string-2"===e&&r.current().startsWith("}"))return t.templateStack.pop(),void r.backUp(r.current().length-1);if("string-2"===e&&r.current().startsWith("`")){var n=this.getModeForTemplateTag(t.previousVariable),i="template";n?(r.backUp(r.current().length-1),t.templateStack.push(new b(i,n,CodeMirror.startState(n)))):t.templateStack.push(new b(i,null,null))}},g.prototype.trackStateInTemplate=function(e,r,t,o){"string-2"!==e||!r.current().endsWith("`")||this.isEscaped(r.pos-1)?"string-2"!==e||!r.current().endsWith("${")||this.isEscaped(r.pos-2)||t.templateStack.push(new b("inline-expression",null,null)):t.templateStack.pop()},g.prototype.backupIfEmbeddedTokenizerOvershot=function(e){for(var r=e.current(),t=0;;){var o=r.slice(t).search(/`|\$\{/);if(-1===o)return;o+=t;var n=r.length-o,i=e.pos-n;if(!this.isEscaped(e,i))return void e.backUp(r.length-o);t=o+1}},g.prototype.isEscaped=function(e,r){for(var t=!1,o=r;o>0&&"\\"===e.string[o-1];)t=!t,o--;return t},g.prototype.getModeForTemplateTag=function(e){if(!e)return null;"htm"===e&&(e="html");for(var r=["google-"+e,""+e],t=0;t<r.length;t++){var o=CodeMirror.getMode(this.config,r[t]);if(o&&"null"!==o.name)return o}return null};var h=function(e,r){void 0===e&&(e=[]),void 0===r&&(r=null),this.templateStack=e,this.previousVariable=r},f={currentTemplateState:{configurable:!0}};h.prototype.copy=function(){return new h(this.templateStack.map((function(e){return e.copy()})),this.previousVariable)},f.currentTemplateState.get=function(){return this.templateStack[this.templateStack.length-1]},Object.defineProperties(h.prototype,f);var b=function(e,r,t){this.kind=e,this.mode=r,this.state=t};b.prototype.copy=function(){return this.mode?new b(this.kind,this.mode,CodeMirror.copyState(this.mode,this.state)):new b(this.kind,null,null)};var m=["Block","FunctionDef","ArrowFunc","ForStatement"],y=function(e){function r(r,o){e.call(this,t,{predicates:{canInsertSemi:!1===o.requireSemicolons?p:function(){return!1}}}),this.embeddedParser=new g(r),this.indentConf={doubleIndentBrackets:">)",dontCloseBrackets:")",tabSize:r.tabSize,indentUnit:r.indentUnit,forceContent:!0}}return e&&(r.__proto__=e),r.prototype=Object.create(e&&e.prototype),r.prototype.constructor=r,r.prototype.startState=function(){var r=e.prototype.startState.call(this);return r.embeddedParserState=this.embeddedParser.startState(),r},r.prototype.copyState=function(r){var t=e.prototype.copyState.call(this,r);return t.embeddedParserState=this.embeddedParser.copyState(r.embeddedParserState),t},r.prototype.token=function(r,t){var n=t.embeddedParserState;if(this.embeddedParser.shouldInterceptTokenizing(n)){var i=this.embeddedParser.interceptTokenizing(r,n),a=i.handled,l=i.style;if(a)return l}var c=e.prototype.token.call(this,r,t);return this.embeddedParser.trackState(c,r,n),function(e,r,t,n){if("def"==e){var i=function(e,r){for(var t=e;t;t=t.parent)if(r.indexOf(t.name)>-1)return t}(n.context,r),a=t.current();if(i&&(i.locals||(i.locals=[]),-1==i.locals.indexOf(a)&&i.locals.push(a),"funcName"!=n.context.name))return"def local"}else o.test(e)&&!/qualified/.test(e)&&function(e,r){for(var t=e;t;t=t.parent)if(t.locals&&t.locals.indexOf(r)>-1)return!0;return!1}(n.context,t.current())&&(e=e.replace(o,"$1variable-2$2"));return e}(c,m,r,t)},r.prototype.indent=function(e,r,t){return r||(r=t="x"),u(e,r,t,this.indentConf)},r}(e.GrammarMode),v={electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``"};for(var k in v)y.prototype[k]=v[k];e.registerHelper("wordChars","google-javascript",/[\w$]/),e.defineMode("google-javascript",(function(e,r){return new y(e,r)}))}(window.CodeMirror),function(e){var r=[/^(?:var|let|const)(?![a-zA-Z¡-￿_0-9_\$])/,/^while(?![a-zA-Z¡-￿_0-9_\$])/,/^with(?![a-zA-Z¡-￿_0-9_\$])/,/^do(?![a-zA-Z¡-￿_0-9_\$])/,/^debugger(?![a-zA-Z¡-￿_0-9_\$])/,/^if(?![a-zA-Z¡-￿_0-9_\$])/,/^function(?![a-zA-Z¡-￿_0-9_\$])/,/^for(?![a-zA-Z¡-￿_0-9_\$])/,/^default(?![a-zA-Z¡-￿_0-9_\$])/,/^case(?![a-zA-Z¡-￿_0-9_\$])/,/^return(?![a-zA-Z¡-￿_0-9_\$])/,/^throw(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:break|continue)(?![a-zA-Z¡-￿_0-9_\$])/,/^switch(?![a-zA-Z¡-￿_0-9_\$])/,/^try(?![a-zA-Z¡-￿_0-9_\$])/,/^class(?![a-zA-Z¡-￿_0-9_\$])/,/^export(?![a-zA-Z¡-￿_0-9_\$])/,/^import(?![a-zA-Z¡-￿_0-9_\$])/,[0,"async",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,139]],/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*/,/^extends(?![a-zA-Z¡-￿_0-9_\$])/,/^enum(?![a-zA-Z¡-￿_0-9_\$])/,[1,";",/^(?=\})/,[7,"canInsertSemi"]],/^from(?![a-zA-Z¡-￿_0-9_\$])/,[1,"\n","\t"," "],/^[a-zA-Z¡-￿__\$]/,/^const(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:true|false|null|undefined|NaN|Infinity)(?![a-zA-Z¡-￿_0-9_\$])/,/^new(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:[0-9][0-9_]*(?:\.[0-9_]*)?|\.[0-9_]+)(?:[eE][\+\-]?[0-9_]+)?)/,/^else(?![a-zA-Z¡-￿_0-9_\$])/,/^catch(?![a-zA-Z¡-￿_0-9_\$])/,/^finally(?![a-zA-Z¡-￿_0-9_\$])/,/^as(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:super|this)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:delete|typeof|yield|await|void)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.|\!|\+\+?|\-\-?)/,/^\/(?![\/\*])(?:\\.|\[(?:(?!\]).)*\]|(?!\/).)+\/[gimyus]*/,[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,508]],/^(?:\+\+|\-\-)/,/^(?:(?:\+|\-|\%|\*|\/(?![\/\*])|\>\>?\>?|\<\<?|\=\=?|\&\&?|\|\|?|\^|\!\=)\=?|\?\?)/,/^(?:in|instanceof)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:public|private|protected|readonly|abstract|static)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.|\?\.)/,[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,533]],/^is(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.)?/,/^(?:get|set|async)(?![a-zA-Z¡-￿_0-9_\$])(?! *[\,\}\:\(\<])/],t=Object.freeze({nodes:[[1,6,2],[/^[^]/,0],[1,6,3],[2,7,4,{name:"Statement"},0,1],[1,6,3],[3,"keyword",r[0],-1,3,"keyword",r[1],-1,3,"keyword",r[2],-1,3,"keyword",r[30],-1,3,"keyword",r[3],-1,3,"keyword",r[14],-1,3,"keyword",r[32],-1,3,"keyword",r[10],-1,3,"keyword",r[11],-1,3,"keyword",r[12],-1,3,"keyword",r[4],-1,3,"keyword",r[9],-1,3,"keyword",r[8],-1,3,"keyword",r[6],-1,3,"keyword",r[5],-1,3,"keyword",r[31],-1,3,"keyword",r[7],-1,3,"keyword",r[13],-1,3,"keyword",r[15],-1,3,"keyword",r[16],-1,3,"keyword",r[17],-1,3,"keyword",r[20],-1,3,"keyword",r[18],-1,3,"keyword",r[28],-1,3,"keyword",r[41],-1,3,"keyword",r[35],-1,3,"keyword",r[34],-1,3,"atom",r[27],-1,3,"variable",r[19],-1,3,"operator",r[36],-1,3,"operator",r[40],-1,3,"operator",r[39],-1,2,141,-1,{name:"string",token:"string"},3,"number",r[29],-1,2,146,-1,{name:"comment",token:"comment"},3,"string-2",r[37],-1,1,150,-1,/^[^]/,-1],[r[24],6,2,146,6,{name:"comment",token:"comment"},0,-1],[3,"keyword",[0,"type",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,154]],8,3,"keyword",[0,"namespace",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,155]],18,3,"keyword",[0,"interface",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,156]],26,[5,157],36,3,"keyword",r[21],37,3,"keyword",[0,"declare",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,160]],43,3,"keyword",/^abstract(?![a-zA-Z¡-￿_0-9_\$])/,43,3,"keyword",r[0],45,3,"keyword",r[1],52,3,"keyword",r[2],52,3,"keyword",r[3],56,2,161,-1,{name:"Block"},";",-1,3,"keyword",r[4],-1,3,"keyword",r[5],64,3,"keyword",r[6],69,3,"keyword",r[7],75,3,"keyword",r[8],77,/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\:)/,77,3,"keyword",r[9],78,3,"keyword",r[10],81,3,"keyword",r[11],85,3,"keyword",r[12],89,3,"keyword",r[13],93,3,"keyword",r[14],97,3,"keyword",r[15],101,3,"keyword",r[16],105,3,"keyword",r[17],117,3,"keyword",r[18],133,"@",135,1,165,137],[1,6,9],[3,"def type",r[19],10],[1,6,11],[2,171,12,{name:"TypeParams"},0,12],[1,6,13],[3,"operator","=",14],[1,6,15],[1,176,16],[1,6,17],[r[22],-1],[1,6,19],[[5,224],20,3,"def",r[19],21],[3,"variable",r[19],22],[1,6,23],[1,6,24],[2,161,-1,{name:"Block"}],[".",25],[1,6,19],[1,6,27],[3,"def type",r[19],28],[1,6,29],[2,171,30,{name:"TypeParams"},0,30],[1,6,31],[3,"keyword",r[20],32,0,33],[1,6,34],[1,6,35],[1,227,33],[2,233,-1,{name:"ObjType"}],[3,"keyword",r[26],38],[1,6,39],[1,6,40],[3,"def type",r[19],41],[3,"keyword",r[21],37],[1,6,42],[2,241,-1,{name:"EnumBody"}],[1,6,44],[2,7,-1,{name:"Statement"}],[1,6,46],[1,246,47],[1,6,48],[",",49,r[22],-1],[1,6,50],[1,246,51],[1,6,48],[1,6,53],[2,257,54,{name:"CondExpr"}],[1,6,55],[2,7,-1,{name:"Statement"}],[1,6,57],[2,7,58,{name:"Statement"}],[1,6,59],[3,"keyword",r[1],60,0,-1],[1,6,61],[2,257,62,{name:"CondExpr"}],[1,6,63],[r[22],-1],[1,6,65],[2,257,66,{name:"CondExpr"}],[1,6,67],[2,7,68,{name:"Statement"}],[2,262,-1,{name:"Alternative"}],[1,6,70],[3,"keyword","*",71,0,71],[1,6,72],[3,"def",r[19],73],[1,6,74],[2,266,-1,{name:"FunctionDef"}],[1,6,76],[2,275,-1,{name:"ForStatement"}],[1,6,79],[1,6,80],[":",-1],[1,165,77],[1,6,82],[r[22],-1,1,165,83],[1,6,84],[r[22],-1],[1,6,86],[1,165,87],[1,6,88],[r[22],-1],[1,6,90],[/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*)?/,91],[1,6,92],[r[22],-1],[1,6,94],[2,257,95,{name:"CondExpr"}],[1,6,96],[2,161,-1,{name:"Block"}],[1,6,98],[2,161,99,{name:"Block"}],[1,6,100],[2,278,-1,{name:"CatchFinally"}],[1,6,102],[3,"def type",r[19],103],[1,6,104],[1,291,-1],[1,6,106],["*",107,3,"keyword",r[8],107,"{",108,2,7,-1,{name:"Statement"}],[1,6,109],[1,6,110],[3,"keyword",r[23],111,0,112],[1,302,113],[1,6,114],[1,6,115],[1,6,116],[2,141,112,{name:"string",token:"string"}],[r[22],-1],["}",107],[1,6,118],[2,141,119,{name:"string",token:"string"},3,"keyword","*",120,1,308,121,"{",122],[1,6,123],[1,6,124],[1,6,125],[1,6,126],[r[22],-1],[3,"keyword",r[33],127,0,121],[3,"keyword",r[23],128,0,119],[1,302,129],[1,6,130],[1,6,131],[1,6,132],[3,"def",r[19],121],[2,141,119,{name:"string",token:"string"}],["}",121],[1,6,134],[2,7,-1,{name:"Statement"}],[1,6,136],[1,165,-1],[1,6,138],[r[22],-1],[1,6,140],[3,"keyword",r[6],-1,/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*|\()/,-1],["'",142,'"',144],["\\",143,/^(?!\')./,142,"'",-1],[/^[^]/,142],["\\",145,/^(?!\")./,144,'"',-1],[/^[^]/,144],[/^\/\*\*(?!\/)/,147,"/*",149,/^\/\/.*/,-1],[1,313,147,0,148],[2,316,148,{name:"doccomment.tagGroup"},"*/",-1],[[0,/^(?!\*\/)/,/^[^]/],149,"*/",-1],[3,"string-2","`",151],[3,"string-2","${",152,2,318,151,{name:"str2",token:"string-2"},3,"string-2",/^(?:(?!\`|\$\{|\\).)+/,151,3,"string-2","`",-1],[1,165,153],[3,"string-2","}",151],[r[24],154,r[25],-1],[r[24],155,r[25],-1],[r[24],156,r[25],-1],[3,"keyword",r[26],158],[1,6,159],[3,"keyword",r[21],-1],[r[24],160,r[25],-1],["{",162],[1,6,163],[2,7,164,{name:"Statement"},"}",-1],[1,6,163],[1,320,166],[1,6,167],[",",168,1,348,169,0,-1],[1,6,170],[1,6,167],[1,367,169],["<",172],[1,6,173],[1,371,174],[1,6,175],[">",-1],[3,"keyword",/^this(?![a-zA-Z¡-￿_0-9_\$])/,209,3,"atom",r[27],209,3,"keyword",/^typeof(?![a-zA-Z¡-￿_0-9_\$])/,177,3,"keyword",/^(?:keyof|readonly|unique)(?![a-zA-Z¡-￿_0-9_\$])/,178,[0,[5,393],"("],179,3,"keyword",r[28],180,0,180,0,181,2,396,209,{name:"TupleType"},2,233,209,{name:"ObjType"},2,141,209,{name:"string",token:"string"},3,"number",r[29],209],[1,6,182],[1,6,183],[1,6,184],[1,6,185],[[5,401],186,3,"type",r[19],187],[3,"variable",r[19],188],[1,176,209],[1,176,189],[2,171,190,{name:"TypeParams"},0,190],[3,"variable",r[19],191],[1,6,192],[1,6,193],[1,6,194],[1,6,195],[1,6,196],[2,404,209,{name:"TypeArgs"},0,209],[".",197,"[",198,0,209],[")",209],[2,409,199,{name:"ParamListSpec"}],[".",200],[1,6,201],[1,6,202],[1,6,203],[1,6,181],[3,"property",r[19],204],[1,165,205],[3,"operator","=>",206],[1,6,193],[1,6,207],[1,6,208],["]",204],[1,410,209],[1,6,210],[3,"operator",/^[\&\|]/,211,3,"keyword",/^(?:extends|implements)(?![a-zA-Z¡-￿_0-9_\$])/,211,"[",212,3,"operator","?",213,0,-1],[1,6,214],[1,6,215],[1,6,216],[1,176,217],[1,176,218,0,218],[1,176,219],[1,6,210],[1,6,220],[1,6,221],["]",217],[3,"operator",":",222],[1,6,223],[1,176,217],[r[19],225],[1,6,226],[".",-1],[1,176,228,0,-1],[1,6,229],[",",230,0,-1],[1,6,231],[1,176,232,0,232],[1,6,229],["{",234],[1,6,235],[1,416,236,0,236],[1,6,237],[/^[\,\;]/,238,"}",-1],[1,6,239],[1,416,240,0,240],[1,6,237],["{",242],[1,6,243],[1,449,244],[1,6,245],["}",-1],[1,463,247],[1,6,248],[3,"operator","!",249,0,249],[1,6,250],[":",251,0,253],[1,6,252],[1,176,253],[1,6,254],[3,"operator","=",255,0,-1],[1,6,256],[1,367,-1],["(",258],[1,6,259],[1,165,260],[1,6,261],[")",-1],[1,6,263],[3,"keyword",r[30],264,0,-1],[1,6,265],[2,7,-1,{name:"Statement"}],[2,171,267,{name:"TypeParams"},0,267],[1,6,268],[2,466,269,{name:"ParamList"}],[1,6,270],[":",271,0,273],[1,6,272],[1,410,273],[1,6,274],[2,161,-1,{name:"Block"},r[22],-1],[2,471,276,{name:"ForSpec"}],[1,6,277],[2,7,-1,{name:"Statement"}],[3,"keyword",r[31],279,0,287],[1,6,280],["(",281,0,282],[1,6,283],[1,6,284],[1,463,285],[2,161,287,{name:"Block"}],[1,6,286],[")",282],[1,6,288],[3,"keyword",r[32],289,0,-1],[1,6,290],[2,161,-1,{name:"Block"}],[2,171,292,{name:"TypeParams"},0,292],[1,6,293],[3,"keyword",r[20],294,0,296],[1,6,295],[1,176,296],[1,6,297],[3,"keyword",/^implements(?![a-zA-Z¡-￿_0-9_\$])/,298,0,300],[1,6,299],[1,227,300],[1,6,301],[2,482,-1,{name:"ClassBody"}],[1,308,303,0,-1],[1,6,304],[",",305,0,-1],[1,6,306],[1,308,307,0,307],[1,6,304],[3,"variable",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= +as)/,309,3,"def",r[19],-1],[1,6,310],[3,"keyword",r[33],311],[1,6,312],[3,"def",r[19],-1],[0,314,2,490,-1,{name:"doccomment.braced"}],[[0,/^(?!\*\/|\@[a-zA-Z¡-￿_0-9]|\{)/,/^[^]/],315],[0,314,0,-1],[1,494,317],[1,313,317,0,-1],["\\",319,"\n",-1],[/^[^]/,-1],["<",321,3,"atom",r[27],-1,3,"keyword",r[34],-1,3,"keyword",r[35],327,3,"operator",r[36],327,3,"keyword",r[18],327,3,"keyword",r[28],329,3,"keyword",r[6],335,3,"keyword",r[15],341,2,500,-1,{name:"ArrowFunc"},3,"variable callee",r[38],346,3,"variable",r[19],-1,3,"number",r[29],-1,2,141,-1,{name:"string",token:"string"},3,"string-2",r[37],-1,1,150,-1,2,512,-1,{name:"ArrayLiteral"},2,517,-1,{name:"ObjectLiteral"},2,522,-1,{name:"ParenExpr"}],[1,6,322],[1,176,323],[1,6,324],[">",325],[1,6,326],[1,320,-1],[1,6,328],[1,320,-1],[1,6,330],[".",331,3,"variable callee",r[38],332,1,320,-1],[1,6,333],[1,6,334],[3,"keyword",/^target(?![a-zA-Z¡-￿_0-9_\$])/,-1],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,336],[3,"keyword","*",337,0,337],[1,6,338],[3,"def",r[19],339,0,339],[1,6,340],[2,266,-1,{name:"FunctionDef"}],[1,6,342],[[6,527],343,0,344],[3,"def type",r[19],344],[1,6,345],[1,291,-1],[1,6,347],[2,404,-1,{name:"TypeArgs"},0,-1],[3,"keyword",r[33],349,3,"operator","!",-1,3,"operator",r[39],-1,3,"operator",r[40],351,3,"keyword",r[41],351,2,528,-1,{name:"ArgList"},1,150,-1,r[43],353,"[",357,3,"operator","?",361],[1,6,350],[1,176,-1],[1,6,352],[1,165,-1],[1,6,354],[3,"property callee",r[44],355,3,"property",r[19],-1],[1,6,356],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,358],[1,165,359],[1,6,360],["]",-1],[1,6,362],[1,165,363],[1,6,364],[3,"operator",":",365],[1,6,366],[1,165,-1],[1,320,368],[1,6,369],[1,537,370,0,-1],[1,6,369],[3,"def type",r[19],372,0,-1],[1,6,373],[3,"keyword",r[20],374,0,375],[1,6,376],[1,6,377],[1,176,375],[3,"operator","=",378,0,379],[1,6,380],[1,6,381],[1,176,379],[",",382,0,-1],[1,6,383],[3,"def type",r[19],384,0,385],[1,6,386],[1,6,381],[3,"keyword",r[20],387,0,388],[1,6,389],[1,6,390],[1,176,388],[3,"operator","=",391,0,385],[1,6,392],[1,176,385],["(",394],[1,6,395],[[6,556],-1],["[",397],[1,6,398],[1,227,399],[1,6,400],["]",-1],[r[19],402],[1,6,403],[".",-1],["<",405],[1,6,406],[1,227,407],[1,6,408],[">",-1],[2,466,-1,{name:"ParamList"}],[[5,559],411,0,414],[3,"variable",r[19],412],[1,6,413],[3,"keyword",r[45],414],[1,6,415],[1,176,-1],[3,"keyword",r[28],417,0,417,0,425],[1,6,418],[2,171,419,{name:"TypeParams"},0,419],[1,6,420],[2,466,421,{name:"ParamList"}],[1,6,422],[":",423,0,-1],[1,6,424],[1,410,-1],[3,"keyword",r[42],426,"[",427,3,"def property",r[19],428,2,141,428,{name:"string",token:"string"},3,"number",r[29],428],[1,6,425],[1,6,429],[1,6,430],[[0,[5,562],/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/],431,1,165,432],[/^\??/,433],[1,6,434],[1,6,435],[1,6,436],[":",437,3,"keyword",/^in(?![a-zA-Z¡-￿_0-9_\$])/,437],["]",438],[2,171,439,{name:"TypeParams"},0,439,0,440],[1,6,441],[1,6,442],[1,6,443],[1,6,444],[1,176,432],[":",445],[2,466,440,{name:"ParamList"}],[":",446,0,-1],[1,6,447],[1,6,448],[1,176,-1],[1,410,-1],[3,"def property",r[19],450,0,-1],[1,6,451],[3,"operator","=",452,0,453],[1,6,454],[1,6,455],[1,367,453],[",",456,0,-1],[1,6,457],[3,"def property",r[19],458,0,459],[1,6,460],[1,6,455],[3,"operator","=",461,0,459],[1,6,462],[1,367,459],[3,"operator","...",464,0,464],[1,6,465],[3,"def",r[19],-1,2,565,-1,{name:"ArrayPattern"},2,570,-1,{name:"ObjectPattern"}],["(",467],[1,6,468],[1,575,469],[1,6,470],[")",-1],["(",472],[1,6,473],[2,615,474,{name:"StatementMaybeOf"}],[1,6,475],[1,165,476,0,476,0,480],[1,6,477],[";",478],[1,6,479],[1,165,480,0,480],[1,6,481],[")",-1],["{",483],[1,6,484],[0,485,"@",486,"}",-1],[3,"keyword",r[42],487,2,620,488,{name:"ClassItem"}],[1,6,489],[1,6,485],[1,6,484],[1,165,488],["{",491],[1,494,492,1,313,493],[[0,/^(?!\}|\*\/)/,/^[^]/],492,0,493],[/^(?:\}|(?=\*\/))/,-1],[3,"tag",/^\@(?:member|param|arg(?:ument)?|module|namespace|typedef)(?![a-zA-Z¡-￿_0-9])/,495,3,"tag",/^\@[a-zA-Z¡-￿_0-9]+/,-1],[r[24],495,"{",496,0,497,0,-1],[2,641,498,{name:"doccomment.type"}],[3,"def",/^[a-zA-Z¡-￿_0-9]+/,-1,0,-1],["}",499],[[1,"\n","\t"," ",/^\*(?!\/)/],499,0,497],[3,"def",[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,645]],506,[5,651],501],[2,466,502,{name:"ParamList"}],[1,6,503],[":",504,0,506],[1,6,505],[1,410,506],[1,6,507],[2,658,-1,{name:"ArrowRest"}],[/^\<(?! )/,-1,/^ */,509],[1,663,510,0,511],[/^ */,511],["(",-1],["[",513],[1,6,514],[1,665,515],[1,6,516],["]",-1],["{",518],[1,6,519],[1,671,520],[1,6,521],["}",-1],["(",523],[1,6,524],[1,165,525],[1,6,526],[")",-1],[3,"keyword",r[20],-1],["(",529],[1,6,530],[1,665,531],[1,6,532],[")",-1],[/^ */,534],[1,663,535,0,536],[/^ */,536],["(",-1],[3,"keyword",r[33],538,3,"operator","!",-1,3,"operator",r[39],-1,3,"operator",r[40],540,3,"keyword",r[41],540,2,528,-1,{name:"ArgList"},1,150,-1,r[43],542,"[",546,3,"operator","?",550],[1,6,539],[1,176,-1],[1,6,541],[1,367,-1],[1,6,543],[3,"property callee",r[44],544,3,"property",r[19],-1],[1,6,545],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,547],[1,165,548],[1,6,549],["]",-1],[1,6,551],[1,165,552],[1,6,553],[3,"operator",":",554],[1,6,555],[1,367,-1],[/^(?:\)|\.\.\.)/,-1,r[19],557],[1,6,558],[/^[\?\:]/,-1],[r[19],560],[1,6,561],[3,"keyword",r[45],-1],[r[19],563],[1,6,564],[/^(?:\:|in)/,-1],["[",566],[1,6,567],[1,677,568],[1,6,569],["]",-1],["{",571],[1,6,572],[1,683,573],[1,6,574],["}",-1],["@",576,0,577,0,-1],[1,6,578],[3,"keyword",r[42],579,r[46],580],[1,165,581],[1,6,577],[1,6,582],[1,6,575],[1,463,583],[1,6,584],[/^\??/,585],[1,6,586],[":",587,0,588],[1,6,589],[1,6,590],[1,176,588],[3,"operator","=",591,0,592],[1,6,593],[1,6,594],[1,367,592],[",",595,0,-1],[1,6,596],["@",597,0,598,0,599],[1,6,600],[3,"keyword",r[42],601,r[46],602],[1,6,594],[1,165,603],[1,6,598],[1,6,604],[1,6,596],[1,463,605],[1,6,606],[/^\??/,607],[1,6,608],[":",609,0,610],[1,6,611],[1,6,612],[1,176,610],[3,"operator","=",613,0,599],[1,6,614],[1,367,599],[2,7,616,{name:"Statement"}],[1,6,617],[3,"keyword",/^of(?![a-zA-Z¡-￿_0-9_\$])/,618,0,-1],[1,6,619],[1,165,-1],[3,"keyword",r[47],621,0,621],[1,6,622],[3,"def property",r[19],627,"[",623,3,"number",r[29],627,2,141,627,{name:"string",token:"string"}],[1,6,624],[1,165,625],[1,6,626],["]",627],[1,6,628],[3,"keyword","*",629,0,629,/^[\!\?]?/,630],[1,6,631],[1,6,632],[2,266,-1,{name:"FunctionDef"}],[":",633,0,634],[1,6,635],[1,6,636],[1,176,634],[3,"operator","=",637,0,638],[1,6,639],[1,6,640],[1,165,638],[r[22],-1],[3,"type","{",642,3,"type",/^(?:(?!\{|\}|\*\/).)+/,641,"\n",643,0,-1],[2,641,644,{name:"doccomment.type"}],[/^[\t ]*(?:\*(?!\/)[\t ]*)?/,641],[/^(?=\*\/)/,641,3,"type","}",641],[1,6,646],[":",647,0,650],[1,6,648],[1,176,649],[1,6,650],["=>",-1],[2,466,652,{name:"ParamList"}],[1,6,653],[":",654,0,656],[1,6,655],[1,410,656],[1,6,657],["=>",-1],[3,"operator","=>",659],[1,6,660],[2,171,661,{name:"TypeParams"},0,661],[1,6,662],[2,161,-1,{name:"Block"},1,367,-1],["<",664],[1,663,664,[1,"=>",[0,/^(?!\>)/,/^[^]/]],664,">",-1],[1,367,666,0,-1],[1,6,667],[",",668,0,-1],[1,6,669],[1,367,670,0,670],[1,6,667],[2,689,672,{name:"ObjectMember"},0,-1],[1,6,673],[",",674,0,-1],[1,6,675],[2,689,676,{name:"ObjectMember"},0,676],[1,6,673],[1,704,678,0,678,0,-1],[1,6,679],[",",680,0,-1],[1,6,681],[1,704,682,0,682,0,682],[1,6,679],[1,709,684,0,-1],[1,6,685],[",",686,0,-1],[1,6,687],[1,709,688,0,688],[1,6,685],[3,"keyword",r[47],690,0,690],[1,6,691],[3,"keyword","*",692,0,692],[1,6,693],[3,"def property",r[19],694,"[",695,3,"number",r[29],694,2,141,694,{name:"string",token:"string"},3,"operator","...",696],[1,6,697],[1,6,698],[1,6,699],[2,266,-1,{name:"FunctionDef"},":",700,0,-1],[1,165,701],[1,367,-1],[1,6,702],[1,6,703],[1,367,-1],["]",694],[1,463,705],[1,6,706],[3,"operator","=",707,0,-1],[1,6,708],[1,367,-1],[3,"def",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?![a-z]|[A-Z]|[¡-￿]|_|[0-9]|_|\$| *\:)/,710,3,"property",r[19],714,3,"number",r[29],714,2,141,714,{name:"string",token:"string"},3,"operator","...",718],[1,6,711],[3,"operator","=",712,0,-1],[1,6,713],[1,367,-1],[1,6,715],[":",716],[1,6,717],[1,704,-1],[1,6,719],[1,704,-1]],start:0,token:5}),o=/(^|\s)variable($|\s)/;function n(e){var r=/^(if|for|do|while|try)\b/.exec(e.startLine.slice(e.startPos));return r&&r[1]}var i={Block:"}",BlockOf:"}",ClassBody:"}",AnnotationTypeBody:"}",ObjectLiteral:"}",ObjectPattern:"}",EnumBody:"}",LambdaBlock:"}",WhenBody:"}",ObjType:"}",ArrayInitializer:"}",NamespaceBlock:"}",BraceTokens:"}",ArrayLiteral:"]",BracketTokens:"]",TupleType:"]",ParamList:")",SimpleParamList:")",ArgList:")",ParenExpr:")",CondExpr:")",ForSpec:")",ParenTokens:")",ParenthesizedExpression:")",ConstructorParamList:")",TypeParams:">",TypeArgs:">",TemplateArgs:">",TemplateParams:">"},a=["Block","NamespaceBlock","ClassBody","AnnotationTypeBody","BlockOf","EnumBody"],l=["Statement","ObjectMember","ClassItem","EnumConstant","AnnotationTypeItem","ArgExpr","StatementMaybeOf","NewExpr"];function c(r,t){for(var o=r.startLine;;r=r.parent){if("CondExpr"==r.name)return e.countColumn(r.startLine,r.startPos+1,t.tabSize);if(l.indexOf(r.name)>-1&&/(^\s*|[\(\{\[])$/.test(r.startLine.slice(0,r.startPos)))return e.countColumn(r.startLine,r.startPos,t.tabSize);if(!r.parent||r.parent.startLine!=o)return e.countColumn(r.startLine,null,t.tabSize)}}function d(r,t,o){if(!r)return 0;if("string"==r.name||"comment"==r.name)return e.Pass;var u,p,g=i[r.name],h=t&&t.charAt(0)==g;if(g&&!1!==o.align&&function(e){return!/^\s*((\/\/.*)?$|.*=>)/.test(e.startLine.slice(e.startPos+1))}(r))return e.countColumn(r.startLine,r.startPos,o.tabSize)+(h?0:1);if(g&&a.indexOf(r.name)>-1){var f=r.parent;f&&"Statement"==f.name&&f.parent&&"Statement"==f.parent.name&&n(f.parent)&&!n(f)&&(f=f.parent);var b=s(f,o);return h||"NamespaceBlock"==r.name?b:/^(public|private|protected)\s*:/.test(t)?b+1:!(p=r.parent)||"Statement"!=p.name||!/^switch\b/.test(p.startLine.slice(p.startPos))||(u=t)&&/^\s*(case|default)\b/.test(u)?b+o.indentUnit:b+2*o.indentUnit}var m=c(r,o.tabSize);return g?h&&(o.dontCloseBrackets||"").indexOf(g)<0?m:m+o.indentUnit*((o.doubleIndentBrackets||"").indexOf(g)<0?1:2):l.indexOf(r.name)>-1?n(r)?m+o.indentUnit:m+2*o.indentUnit:"Alternative"==r.name||"CatchFinally"==r.name?(m=c(r.parent,o.tabSize),!t||/^((else|catch|finally)\b|\/[\/\*])/.test(t)?m:m+o.indentUnit):"ArrowRest"==r.name?m+o.indentUnit:"NewExpression"==r.name&&r.startLine.length>r.startPos+5?e.countColumn(r.startLine,r.startPos,o.tabSize)+2*o.indentUnit:"InitializerList"==r.name?m+2:"ThrowsClause"!=r.name||/throws\s*$/.test(r.startLine.slice(r.startPos))?d(r.parent,t,o):m+2*o.indentUnit}function s(r,t){for(;;r=r.parent){if(!r)return 0;if(l.indexOf(r.name)>-1||r.parent&&i[r.parent.name])return e.countColumn(r.startLine,null,t.tabSize)}}function u(r,t,o,n){var i=r.context&&r.context.name;if("DeclType"==i||"BeforeStatement"==i||"AnnotationHead"==i||"Template"==i||"str"==i)return s(r.context,n);if(("doccomment.braced"==i||"doccomment.tagGroup"==i)&&!/^[@*]/.test(t))return e.countColumn(r.context.startLine,null,n.tabSize)+2*n.indentUnit;var a=n.forceContent&&/^\s*(\/\/.*)?$/.test(o)?"x":o;return d(r.contextAt(a,o.length-t.length),t,n)}function p(e,r){for(var t=r-1;t>=0;t--){var o=e.charCodeAt(t);if(10===o)break;if(32!==o&&9!==o)return!1}return!0}var g=function(e){this.config=e};g.prototype.startState=function(){return new h},g.prototype.copyState=function(e){return e.copy()},g.prototype.shouldInterceptTokenizing=function(e){var r=e.currentTemplateState;return void 0!==r&&null!==r.mode},g.prototype.interceptTokenizing=function(e,r){if(e.match("${")&&(e.backUp(2),!this.isEscaped(e,e.pos-2)))return{handled:!1};if("`"===e.peek()&&!this.isEscaped(e,e.pos))return{handled:!1};var t=r.currentTemplateState,o=t.mode,n=t.state,i=o.token(e,n);return this.backupIfEmbeddedTokenizerOvershot(e),{handled:!0,style:i}},g.prototype.trackState=function(e,r,t){if(e){var o=t.currentTemplateState;o&&"inline-expression"!==o.kind?this.trackStateInTemplate(e,r,t,o):this.trackStateNotInTemplate(e,r,t,o),t.previousVariable="variable"===e?r.current():null}},g.prototype.trackStateNotInTemplate=function(e,r,t,o){if(o&&"string-2"===e&&r.current().startsWith("}"))return t.templateStack.pop(),void r.backUp(r.current().length-1);if("string-2"===e&&r.current().startsWith("`")){var n=this.getModeForTemplateTag(t.previousVariable),i="template";n?(r.backUp(r.current().length-1),t.templateStack.push(new b(i,n,CodeMirror.startState(n)))):t.templateStack.push(new b(i,null,null))}},g.prototype.trackStateInTemplate=function(e,r,t,o){"string-2"!==e||!r.current().endsWith("`")||this.isEscaped(r.pos-1)?"string-2"!==e||!r.current().endsWith("${")||this.isEscaped(r.pos-2)||t.templateStack.push(new b("inline-expression",null,null)):t.templateStack.pop()},g.prototype.backupIfEmbeddedTokenizerOvershot=function(e){for(var r=e.current(),t=0;;){var o=r.slice(t).search(/`|\$\{/);if(-1===o)return;o+=t;var n=r.length-o,i=e.pos-n;if(!this.isEscaped(e,i))return void e.backUp(r.length-o);t=o+1}},g.prototype.isEscaped=function(e,r){for(var t=!1,o=r;o>0&&"\\"===e.string[o-1];)t=!t,o--;return t},g.prototype.getModeForTemplateTag=function(e){if(!e)return null;"htm"===e&&(e="html");for(var r=["google-"+e,""+e],t=0;t<r.length;t++){var o=CodeMirror.getMode(this.config,r[t]);if(o&&"null"!==o.name)return o}return null};var h=function(e,r){void 0===e&&(e=[]),void 0===r&&(r=null),this.templateStack=e,this.previousVariable=r},f={currentTemplateState:{configurable:!0}};h.prototype.copy=function(){return new h(this.templateStack.map((function(e){return e.copy()})),this.previousVariable)},f.currentTemplateState.get=function(){return this.templateStack[this.templateStack.length-1]},Object.defineProperties(h.prototype,f);var b=function(e,r,t){this.kind=e,this.mode=r,this.state=t};b.prototype.copy=function(){return this.mode?new b(this.kind,this.mode,CodeMirror.copyState(this.mode,this.state)):new b(this.kind,null,null)};var m=["Block","FunctionDef","ArrowFunc","ForStatement","ParamListSpec"],y=function(e){function r(r,o){e.call(this,t,{predicates:{canInsertSemi:!1===o.requireSemicolons?p:function(){return!1}}}),this.templateTokenizer=new g(r),this.indentConf={doubleIndentBrackets:">)",dontCloseBrackets:")",tabSize:r.tabSize,indentUnit:r.indentUnit,forceContent:!0}}return e&&(r.__proto__=e),r.prototype=Object.create(e&&e.prototype),r.prototype.constructor=r,r.prototype.startState=function(){var r=e.prototype.startState.call(this);return r.embeddedParserState=this.templateTokenizer.startState(),r},r.prototype.copyState=function(r){var t=e.prototype.copyState.call(this,r);return t.embeddedParserState=this.templateTokenizer.copyState(r.embeddedParserState),t},r.prototype.token=function(r,t){var n=t.embeddedParserState;if(this.templateTokenizer.shouldInterceptTokenizing(n)){var i=this.templateTokenizer.interceptTokenizing(r,n),a=i.handled,l=i.style;if(a)return l}var c=e.prototype.token.call(this,r,t);return this.templateTokenizer.trackState(c,r,n),function(e,r,t,n){if("def"==e){var i=function(e,r){for(var t=e;t;t=t.parent)if(r.indexOf(t.name)>-1)return t}(n.context,r),a=t.current();if(i&&(i.locals||(i.locals=[]),-1==i.locals.indexOf(a)&&i.locals.push(a),"funcName"!=n.context.name))return"def local"}else o.test(e)&&!/qualified/.test(e)&&function(e,r){for(var t=e;t;t=t.parent)if(t.locals&&t.locals.indexOf(r)>-1)return!0;return!1}(n.context,t.current())&&(e=e.replace(o,"$1variable-2$2"));return e}(c,m,r,t)},r.prototype.indent=function(e,r,t){return r||(r=t="x"),u(e,r,t,this.indentConf)},r}(e.GrammarMode),v={electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``"};for(var k in v)y.prototype[k]=v[k];e.registerHelper("wordChars","google-typescript",/[\w$]/),e.defineMode("google-typescript",(function(e,r){return new y(e,r)}))}(window.CodeMirror),function(e){var r=[[1,"\n","\t"," "],/^[a-zA-Z\-\.0-9_]+/],t=Object.freeze({nodes:[[1,3,0,0,1],[/^[^]/,0],[/^[^]/,-1],[2,4,-1,{name:"comment",token:"comment"},2,6,-1,{name:"doctype",token:"meta"},2,8,-1,{name:"tag"},3,"atom",/^\&(?:(?![\;\n\t ]).)*\;/,-1,[1,"\n",/^(?:(?![\&\<]).)+/],-1],["\x3c!--",5],[[0,/^(?!\-\-\>)/,/^[^]/],5,"--\x3e",-1],[/^(?:\<\!doctype|\<\!DOCTYPE)(?![a-zA-Z\-\.0-9_])/,7],[[0,/^(?!\>)/,/^[^]/],7,">",-1],[2,14,9,{name:"openTag"}],[3,"tag","/>",-1,[7,"selfClosing"],10,3,"tag",">",11],[3,"tag",">",-1],[1,3,11,/^(?=\<\/)/,12],[[7,"matchingTag"],13,0,-1],[2,21,-1,{name:"closeTag"}],[3,"tag",[0,"<",[6,24]],15],[r[0],15,3,"tag",r[1],16],[r[0],16,0,17],[3,"attribute",r[1],18,0,-1],[r[0],18,"=",19,0,20],[r[0],19,2,25,20,{name:"attributeValue",token:"string"}],[r[0],20,0,17],[3,"tag","</",22],[r[0],22,3,"tag",r[1],23],[3,"tag",">",-1],[r[0],24,"/",-1],['"',26,"'",27,/^(?:(?![\n\t \>]).)*/,-1],[[0,/^(?!\")/,/^[^]/],26,'"',-1],[[0,/^(?!\')/,/^[^]/],27,"'",-1]],start:0,token:2});function o(e){var r=/^\s*([\w_\.-]+)/.exec(e);return r?r[1].toLowerCase():"x"}function n(e){return o(e.startLine.slice(e.startPos+1))}var i="area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "),a={selfClosing:function(e,r,t){return i.indexOf(n(t))>-1},matchingTag:function(e,r,t){return o(e.slice(r+2))==n(t)}},l=function(e){function r(r,o){e.call(this,t,{predicates:a}),this.conf=r}return e&&(r.__proto__=e),r.prototype=Object.create(e&&e.prototype),r.prototype.constructor=r,r.prototype.indent=function(e,r,t){return function(e,r,t,o){for(var i=e.contextAt(t,t.length-r.length),a=/^\s*<\/\s*([\w_\.-]+)/.exec(r);i;){if("tag"==i.name){var l=CodeMirror.countColumn(i.startLine,null,o.tabSize);return a&&a[1].toLowerCase()==n(i)?l:l+o.indentUnit}if("openTag"==i.name)return CodeMirror.countColumn(i.startLine,null,o.tabSize)+2*o.indentUnit;i=i.parent}return 0}(e,r,t,this.conf)},r}(e.GrammarMode),c=l.prototype;c.electricInput=/^\s*<\/.*?>/,c.blockCommentStart="\x3c!--",c.blockCommentEnd="--\x3e",c.fold="xml",function(e){e.xmlCurrentTag=function(e){var r=e.context;if(!r||"openTag"!=r.name&&"closeTag"!=r.name)return null;var t=/^<\/?\s*([\w\-\.]+)/.exec(r.startLine.slice(r.startPos));return t?{name:t[1],close:"closeTag"==r.name}:null},e.xmlCurrentContext=function(e){for(var r=[],t=e.context;t;t=t.parent)if("tag"==t.name){var o=/^<\s*([\w\-\.]+)/.exec(t.startLine.slice(t.startPos));o&&r.push(o[1])}return r.reverse()}}(c),e.defineMode("google-html",(function(e,r){return new l(e,r)}))}(window.CodeMirror),function(e){function r(e){for(var r={},t=0;t<e.length;++t)r[e[t].toLowerCase()]=!0;return r}e.defineMode("css",(function(r,t){var o=t.inline;t.propertyKeywords||(t=e.resolveMode("text/css"));var n,i,a=r.indentUnit,l=t.tokenHooks,c=t.documentTypes||{},d=t.mediaTypes||{},s=t.mediaFeatures||{},u=t.mediaValueKeywords||{},p=t.propertyKeywords||{},g=t.nonStandardPropertyKeywords||{},h=t.fontProperties||{},f=t.counterDescriptors||{},b=t.colorKeywords||{},m=t.valueKeywords||{},y=t.allowNested,v=t.lineComment,k=!0===t.supportsAtComponent,w=!1!==r.highlightNonStandardPropertyKeywords;function C(e,r){return n=r,e}function x(e,r){var t=e.next();if(l[t]){var o=l[t](e,r);if(!1!==o)return o}return"@"==t?(e.eatWhile(/[\w\\\-]/),C("def",e.current())):"="==t||("~"==t||"|"==t)&&e.eat("=")?C(null,"compare"):'"'==t||"'"==t?(r.tokenize=S(t),r.tokenize(e,r)):"#"==t?(e.eatWhile(/[\w\\\-]/),C("atom","hash")):"!"==t?(e.match(/^\s*\w*/),C("keyword","important")):/\d/.test(t)||"."==t&&e.eat(/\d/)?(e.eatWhile(/[\w.%]/),C("number","unit")):"-"!==t?/[,+>*\/]/.test(t)?C(null,"select-op"):"."==t&&e.match(/^-?[_a-z][_a-z0-9-]*/i)?C("qualifier","qualifier"):/[:;{}\[\]\(\)]/.test(t)?C(null,t):e.match(/[\w-.]+(?=\()/)?(/^(url(-prefix)?|domain|regexp)$/.test(e.current().toLowerCase())&&(r.tokenize=T),C("variable callee","variable")):/[\w\\\-]/.test(t)?(e.eatWhile(/[\w\\\-]/),C("property","word")):C(null,null):/[\d.]/.test(e.peek())?(e.eatWhile(/[\w.%]/),C("number","unit")):e.match(/^-[\w\\\-]*/)?(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?C("variable-2","variable-definition"):C("variable-2","variable")):e.match(/^\w+-/)?C("meta","meta"):void 0}function S(e){return function(r,t){for(var o,n=!1;null!=(o=r.next());){if(o==e&&!n){")"==e&&r.backUp(1);break}n=!n&&"\\"==o}return(o==e||!n&&")"!=e)&&(t.tokenize=null),C("string","string")}}function T(e,r){return e.next(),e.match(/\s*[\"\')]/,!1)?r.tokenize=null:r.tokenize=S(")"),C(null,"(")}function L(e,r,t){this.type=e,this.indent=r,this.prev=t}function E(e,r,t,o){return e.context=new L(t,r.indentation()+(!1===o?0:a),e.context),t}function O(e){return e.context.prev&&(e.context=e.context.prev),e.context.type}function A(e,r,t){return R[t.context.type](e,r,t)}function _(e,r,t,o){for(var n=o||1;n>0;n--)t.context=t.context.prev;return A(e,r,t)}function M(e){var r=e.current().toLowerCase();i=m.hasOwnProperty(r)?"atom":b.hasOwnProperty(r)?"keyword":"variable"}var R={top:function(e,r,t){if("{"==e)return E(t,r,"block");if("}"==e&&t.context.prev)return O(t);if(k&&/@component/i.test(e))return E(t,r,"atComponentBlock");if(/^@(-moz-)?document$/i.test(e))return E(t,r,"documentTypes");if(/^@(media|supports|(-moz-)?document|import)$/i.test(e))return E(t,r,"atBlock");if(/^@(font-face|counter-style)/i.test(e))return t.stateArg=e,"restricted_atBlock_before";if(/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(e))return"keyframes";if(e&&"@"==e.charAt(0))return E(t,r,"at");if("hash"==e)i="builtin";else if("word"==e)i="tag";else{if("variable-definition"==e)return"maybeprop";if("interpolation"==e)return E(t,r,"interpolation");if(":"==e)return"pseudo";if(y&&"("==e)return E(t,r,"parens")}return t.context.type},block:function(e,r,t){if("word"==e){var o=r.current().toLowerCase();return p.hasOwnProperty(o)?(i="property","maybeprop"):g.hasOwnProperty(o)?(i=w?"string-2":"property","maybeprop"):y?(i=r.match(/^\s*:(?:\s|$)/,!1)?"property":"tag","block"):(i+=" error","maybeprop")}return"meta"==e?"block":y||"hash"!=e&&"qualifier"!=e?R.top(e,r,t):(i="error","block")},maybeprop:function(e,r,t){return":"==e?E(t,r,"prop"):A(e,r,t)},prop:function(e,r,t){if(";"==e)return O(t);if("{"==e&&y)return E(t,r,"propBlock");if("}"==e||"{"==e)return _(e,r,t);if("("==e)return E(t,r,"parens");if("hash"!=e||/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(r.current())){if("word"==e)M(r);else if("interpolation"==e)return E(t,r,"interpolation")}else i+=" error";return"prop"},propBlock:function(e,r,t){return"}"==e?O(t):"word"==e?(i="property","maybeprop"):t.context.type},parens:function(e,r,t){return"{"==e||"}"==e?_(e,r,t):")"==e?O(t):"("==e?E(t,r,"parens"):"interpolation"==e?E(t,r,"interpolation"):("word"==e&&M(r),"parens")},pseudo:function(e,r,t){return"meta"==e?"pseudo":"word"==e?(i="variable-3",t.context.type):A(e,r,t)},documentTypes:function(e,r,t){return"word"==e&&c.hasOwnProperty(r.current())?(i="tag",t.context.type):R.atBlock(e,r,t)},atBlock:function(e,r,t){if("("==e)return E(t,r,"atBlock_parens");if("}"==e||";"==e)return _(e,r,t);if("{"==e)return O(t)&&E(t,r,y?"block":"top");if("interpolation"==e)return E(t,r,"interpolation");if("word"==e){var o=r.current().toLowerCase();i="only"==o||"not"==o||"and"==o||"or"==o?"keyword":d.hasOwnProperty(o)?"attribute":s.hasOwnProperty(o)?"property":u.hasOwnProperty(o)?"keyword":p.hasOwnProperty(o)?"property":g.hasOwnProperty(o)?w?"string-2":"property":m.hasOwnProperty(o)?"atom":b.hasOwnProperty(o)?"keyword":"error"}return t.context.type},atComponentBlock:function(e,r,t){return"}"==e?_(e,r,t):"{"==e?O(t)&&E(t,r,y?"block":"top",!1):("word"==e&&(i="error"),t.context.type)},atBlock_parens:function(e,r,t){return")"==e?O(t):"{"==e||"}"==e?_(e,r,t,2):R.atBlock(e,r,t)},restricted_atBlock_before:function(e,r,t){return"{"==e?E(t,r,"restricted_atBlock"):"word"==e&&"@counter-style"==t.stateArg?(i="variable","restricted_atBlock_before"):A(e,r,t)},restricted_atBlock:function(e,r,t){return"}"==e?(t.stateArg=null,O(t)):"word"==e?(i="@font-face"==t.stateArg&&!h.hasOwnProperty(r.current().toLowerCase())||"@counter-style"==t.stateArg&&!f.hasOwnProperty(r.current().toLowerCase())?"error":"property","maybeprop"):"restricted_atBlock"},keyframes:function(e,r,t){return"word"==e?(i="variable","keyframes"):"{"==e?E(t,r,"top"):A(e,r,t)},at:function(e,r,t){return";"==e?O(t):"{"==e||"}"==e?_(e,r,t):("word"==e?i="tag":"hash"==e&&(i="builtin"),"at")},interpolation:function(e,r,t){return"}"==e?O(t):"{"==e||";"==e?_(e,r,t):("word"==e?i="variable":"variable"!=e&&"("!=e&&")"!=e&&(i="error"),"interpolation")}};return{startState:function(e){return{tokenize:null,state:o?"block":"top",stateArg:null,context:new L(o?"block":"top",e||0,null)}},token:function(e,r){if(!r.tokenize&&e.eatSpace())return null;var t=(r.tokenize||x)(e,r);return t&&"object"==typeof t&&(n=t[1],t=t[0]),i=t,"comment"!=n&&(r.state=R[r.state](n,e,r)),i},indent:function(e,r){var t=e.context,o=r&&r.charAt(0),n=t.indent;return"prop"!=t.type||"}"!=o&&")"!=o||(t=t.prev),t.prev&&("}"!=o||"block"!=t.type&&"top"!=t.type&&"interpolation"!=t.type&&"restricted_atBlock"!=t.type?(")"!=o||"parens"!=t.type&&"atBlock_parens"!=t.type)&&("{"!=o||"at"!=t.type&&"atBlock"!=t.type)||(n=Math.max(0,t.indent-a)):n=(t=t.prev).indent),n},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:v,fold:"brace"}}));var t=["domain","regexp","url","url-prefix"],o=r(t),n=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],i=r(n),a=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid","orientation","device-pixel-ratio","min-device-pixel-ratio","max-device-pixel-ratio","pointer","any-pointer","hover","any-hover","prefers-color-scheme"],l=r(a),c=["landscape","portrait","none","coarse","fine","on-demand","hover","interlace","progressive","dark","light"],d=r(c),s=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","all","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","baseline-shift","binding","bleed","block-size","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","gap","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-gap","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-gap","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","inset","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","left","letter-spacing","line-break","line-height","line-height-step","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","place-content","place-items","place-self","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotate","rotation","rotation-point","row-gap","ruby-align","ruby-overhang","ruby-position","ruby-span","scale","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-type","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-orientation","text-outline","text-overflow","text-rendering","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","touch-action","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-select","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","paint-order","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode"],u=r(s),p=["border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","margin-block","margin-block-end","margin-block-start","margin-inline","margin-inline-end","margin-inline-start","padding-block","padding-block-end","padding-block-start","padding-inline","padding-inline-end","padding-inline-start","scroll-snap-stop","scrollbar-3d-light-color","scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-track-color","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","shape-inside","zoom"],g=r(p),h=r(["font-display","font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"]),f=r(["additive-symbols","fallback","negative","pad","prefix","range","speak-as","suffix","symbols","system"]),b=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],m=r(b),y=["above","absolute","activeborder","additive","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","attr","auto","auto-flow","avoid","avoid-column","avoid-page","avoid-region","axis-pan","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","bullets","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","calc","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","color","color-burn","color-dodge","column","column-reverse","compact","condensed","contain","content","contents","content-box","context-menu","continuous","copy","counter","counters","cover","crop","cross","crosshair","currentcolor","cursive","cyclic","darken","dashed","decimal","decimal-leading-zero","default","default-button","dense","destination-atop","destination-in","destination-out","destination-over","devanagari","difference","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ethiopic-numeric","ew-resize","exclusion","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fill-box","fixed","flat","flex","flex-end","flex-start","footnotes","forwards","from","geometricPrecision","georgian","graytext","grid","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hard-light","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","hue","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-grid","inline-table","inset","inside","intrinsic","invert","italic","japanese-formal","japanese-informal","justify","kannada","katakana","katakana-iroha","keep-all","khmer","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","landscape","lao","large","larger","left","level","lighter","lighten","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","luminosity","malayalam","manipulation","match","matrix","matrix3d","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","multiple_mask_images","multiply","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","octal","opacity","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","perspective","pinch-zoom","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row","row-resize","row-reverse","rtl","run-in","running","s-resize","sans-serif","saturation","scale","scale3d","scaleX","scaleY","scaleZ","screen","scroll","scrollbar","scroll-position","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","self-start","self-end","semi-condensed","semi-expanded","separate","serif","show","sidama","simp-chinese-formal","simp-chinese-informal","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","soft-light","solid","somali","source-atop","source-in","source-out","source-over","space","space-around","space-between","space-evenly","spell-out","square","square-button","start","static","status-bar","stretch","stroke","stroke-box","sub","subpixel-antialiased","svg_masks","super","sw-resize","symbolic","symbols","system-ui","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tamil","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","trad-chinese-formal","trad-chinese-informal","transform","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","unidirectional-pan","unset","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","var","vertical","vertical-text","view-box","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","wrap","wrap-reverse","x-large","x-small","xor","xx-large","xx-small"],v=r(y),k=t.concat(n).concat(a).concat(c).concat(s).concat(p).concat(b).concat(y);function w(e,r){for(var t,o=!1;null!=(t=e.next());){if(o&&"/"==t){r.tokenize=null;break}o="*"==t}return["comment","comment"]}e.registerHelper("hintWords","css",k),e.defineMIME("text/css",{documentTypes:o,mediaTypes:i,mediaFeatures:l,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:g,fontProperties:h,counterDescriptors:f,colorKeywords:m,valueKeywords:v,tokenHooks:{"/":function(e,r){return!!e.eat("*")&&(r.tokenize=w,w(e,r))}},name:"css"}),e.defineMIME("text/x-scss",{mediaTypes:i,mediaFeatures:l,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:g,colorKeywords:m,valueKeywords:v,fontProperties:h,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(e,r){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(r.tokenize=w,w(e,r)):["operator","operator"]},":":function(e){return!!e.match(/\s*\{/,!1)&&[null,null]},$:function(e){return e.match(/^[\w-]+/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"]},"#":function(e){return!!e.eat("{")&&[null,"interpolation"]}},name:"css",helperType:"scss"}),e.defineMIME("text/x-less",{mediaTypes:i,mediaFeatures:l,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:g,colorKeywords:m,valueKeywords:v,fontProperties:h,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(e,r){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(r.tokenize=w,w(e,r)):["operator","operator"]},"@":function(e){return e.eat("{")?[null,"interpolation"]:!e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i,!1)&&(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"])},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"}),e.defineMIME("text/x-gss",{documentTypes:o,mediaTypes:i,mediaFeatures:l,propertyKeywords:u,nonStandardPropertyKeywords:g,fontProperties:h,counterDescriptors:f,colorKeywords:m,valueKeywords:v,supportsAtComponent:!0,tokenHooks:{"/":function(e,r){return!!e.eat("*")&&(r.tokenize=w,w(e,r))}},name:"css",helperType:"gss"})}(CodeMirror);const Yr=ie`
.CodeMirror-lines {
  padding: 4px 0
}
.CodeMirror-gutter-filler,
.CodeMirror-scrollbar-filler {
  background-color: #fff
}
.CodeMirror-gutters {
  border-right: 1px solid #ddd;
  white-space: nowrap
}
.CodeMirror-linenumber {
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  white-space: nowrap
}
.CodeMirror-guttermarker {
  color: #000
}
.CodeMirror-guttermarker-subtle {
  color: #999
}
.CodeMirror-cursor {
  border-left: 1px solid #000;
  border-right: none;
  width: 0
}
.CodeMirror div.CodeMirror-secondarycursor {
  border-left: 1px solid silver
}
.cm-fat-cursor .CodeMirror-cursor {
  width: auto;
  border: 0!important;
  background: #7e7
}
.cm-fat-cursor div.CodeMirror-cursors {
  z-index: 1
}
.cm-fat-cursor-mark {
  background-color: rgba(20,255,20,.5);
  -webkit-animation: 1.06s steps(1) infinite blink;
  -moz-animation: 1.06s steps(1) infinite blink;
  animation: 1.06s steps(1) infinite blink
}
.cm-animate-fat-cursor {
  width: auto;
  border: 0;
  -webkit-animation: 1.06s steps(1) infinite blink;
  -moz-animation: 1.06s steps(1) infinite blink;
  animation: 1.06s steps(1) infinite blink;
  background-color: #7e7
}
@-moz-keyframes blink {
  50% {
    background-color: transparent
  }
}
@-webkit-keyframes blink {
  50% {
    background-color: transparent
  }
}
@keyframes blink {
  50% {
    background-color: transparent
  }
}
.cm-tab {
  display: inline-block;
  text-decoration: inherit
}
.CodeMirror-rulers {
  position: absolute;
  left: 0;
  right: 0;
  top: -50px;
  bottom: 0;
  overflow: hidden
}
.CodeMirror-ruler {
  border-left: 1px solid #ccc;
  top: 0;
  bottom: 0;
  position: absolute
}
.cm-negative {
  color: #d44
}
.cm-header,
.cm-strong {
  font-weight: 700
}
.cm-em {
  font-style: italic
}
.cm-link {
  text-decoration: underline
}
.cm-strikethrough {
  text-decoration: line-through
}
.CodeMirror-composing {
  border-bottom: 2px solid
}
div.CodeMirror span.CodeMirror-matchingbracket {
  color: #0b0
}
div.CodeMirror span.CodeMirror-nonmatchingbracket {
  color: #a22
}
.CodeMirror-matchingtag {
  background: rgba(255,150,0,.3)
}
.CodeMirror {
  font-family: monospace;
  height: 300px;
  direction: ltr;
  position: relative;
  overflow: hidden
}
.CodeMirror-scroll {
  overflow: scroll!important;
  margin-bottom: -50px;
  margin-right: -50px;
  padding-bottom: 50px;
  height: 100%;
  outline: 0;
  position: relative
}
.CodeMirror-sizer {
  position: relative;
  border-right: 50px solid transparent
}
.CodeMirror-gutter-filler,
.CodeMirror-hscrollbar,
.CodeMirror-scrollbar-filler,
.CodeMirror-vscrollbar {
  position: absolute;
  z-index: 6;
  display: none;
  outline: 0
}
.CodeMirror-vscrollbar {
  right: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: scroll
}
.CodeMirror-hscrollbar {
  bottom: 0;
  left: 0;
  overflow-y: hidden;
  overflow-x: scroll
}
.CodeMirror-scrollbar-filler {
  right: 0;
  bottom: 0
}
.CodeMirror-gutters {
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100%;
  z-index: 3
}
.CodeMirror-gutter {
  white-space: normal;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  margin-bottom: -50px
}
.CodeMirror-gutter-wrapper {
  position: absolute;
  z-index: 4;
  background: 0 0!important;
  border: none!important
}
.CodeMirror-gutter-background {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 4
}
.CodeMirror-gutter-elt {
  position: absolute;
  cursor: default;
  z-index: 4
}
.CodeMirror-gutter-wrapper ::selection {
  background-color: transparent
}
.CodeMirror-gutter-wrapper ::-moz-selection {
  background-color: transparent
}
.CodeMirror-lines {
  cursor: text;
  min-height: 1px
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  padding: 0 4px;
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
  border-width: 0;
  background: 0 0;
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
  -webkit-font-variant-ligatures: contextual;
  font-variant-ligatures: contextual
}
.CodeMirror-wrap pre.CodeMirror-line,
.CodeMirror-wrap pre.CodeMirror-line-like {
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal
}
.CodeMirror-linebackground {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0
}
.CodeMirror-linewidget {
  position: relative;
  z-index: 2;
  padding: .1px
}
.CodeMirror-rtl pre {
  direction: rtl
}
.CodeMirror-code {
  outline: 0
}
.CodeMirror-gutter,
.CodeMirror-gutters,
.CodeMirror-linenumber,
.CodeMirror-scroll,
.CodeMirror-sizer {
  -moz-box-sizing: content-box;
  box-sizing: content-box
}
.CodeMirror-measure {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden
}
.CodeMirror-cursor {
  position: absolute;
  pointer-events: none;
  border-left-color: var(--playground-code-cursor-color, rgb(0, 0, 0))
}
.CodeMirror-measure pre {
  position: static
}
div.CodeMirror-cursors {
  visibility: hidden;
  position: relative;
  z-index: 3
}
.CodeMirror-focused div.CodeMirror-cursors,
div.CodeMirror-dragcursors {
  visibility: visible
}
.CodeMirror-crosshair {
  cursor: crosshair
}
.CodeMirror-line > span > span::selection,
.CodeMirror-line > span::selection,
.CodeMirror-line::selection {
  background: #d7d4f0
}
.CodeMirror-line > span > span::-moz-selection,
.CodeMirror-line > span::-moz-selection,
.CodeMirror-line::-moz-selection {
  background: #d7d4f0
}
.cm-searching {
  background-color: rgba(255,255,0,.4)
}
.cm-force-border {
  padding-right: .1px
}
@media print {
  .CodeMirror div.CodeMirror-cursors {
    visibility: hidden
  }
}
.cm-tab-wrap-hack:after {
  content: ''
}
span.CodeMirror-selectedtext {
  background: 0 0
}
.CodeMirror {
  background: var(--playground-code-background, rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box);
  color: var(--playground-code-color, rgb(0, 0, 0))
}
.CodeMirror-selected {
  background: var(--playground-code-selected-background, rgb(217, 217, 217) none repeat scroll 0% 0% / auto padding-box border-box)
}
.CodeMirror-focused .CodeMirror-selected {
  background: var(--playground-code-focused-selected-background, rgb(217, 217, 217) none repeat scroll 0% 0% / auto padding-box border-box)
}
.CodeMirror-activeline-background {
  background: var(--playground-code-activeline-background, rgb(232, 242, 255) none repeat scroll 0% 0% / auto padding-box border-box)
}
.CodeMirror-line::selection {
  background: var(--playground-code-selection-background, rgb(215, 212, 240) none repeat scroll 0% 0% / auto padding-box border-box)
}
.CodeMirror-gutters {
  background: var(--playground-code-gutter-background, rgb(247, 247, 247) none repeat scroll 0% 0% / auto padding-box border-box);
  border-right: var(--playground-code-gutter-border-right, 1px solid rgb(221, 221, 221));
  box-shadow: var(--playground-code-gutter-box-shadow, none)
}
.CodeMirror-gutter-filler {
  left: 0;
  bottom: 0;
  background: var(--playground-code-gutter-filler-background, rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box)
}
.CodeMirror-linenumber {
  color: var(--playground-code-linenumber-color, rgb(153, 153, 153))
}
.cm-atom {
  color: var(--playground-code-atom-color, rgb(34, 17, 153))
}
.cm-attribute {
  color: var(--playground-code-attribute-color, rgb(0, 0, 204))
}
.cm-bracket {
  color: var(--playground-code-bracket-color, rgb(153, 153, 119))
}
.cm-builtin {
  color: var(--playground-code-builtin-color, rgb(51, 0, 170))
}
.cm-comment {
  color: var(--playground-code-comment-color, rgb(170, 85, 0))
}
.cm-def {
  color: var(--playground-code-def-color, rgb(0, 0, 255))
}
.cm-error {
  color: var(--playground-code-error-color, rgb(255, 0, 0))
}
.cm-header {
  color: var(--playground-code-header-color, rgb(0, 0, 255))
}
.cm-hr {
  color: var(--playground-code-hr-color, rgb(153, 153, 153))
}
.cm-invalidchar {
  color: var(--playground-code-invalidchar-color, rgb(255, 0, 0))
}
.cm-keyword {
  color: var(--playground-code-keyword-color, rgb(119, 0, 136))
}
.cm-link {
  color: var(--playground-code-link-color, rgb(0, 0, 204))
}
.cm-meta {
  color: var(--playground-code-meta-color, rgb(85, 85, 85))
}
.cm-number {
  color: var(--playground-code-number-color, rgb(17, 102, 68))
}
.cm-operator {
  color: var(--playground-code-operator-color, rgb(0, 0, 0))
}
.cm-positive {
  color: var(--playground-code-positive-color, rgb(34, 153, 34))
}
.cm-property {
  color: var(--playground-code-property-color, rgb(0, 0, 0))
}
.cm-qualifier {
  color: var(--playground-code-qualifier-color, rgb(85, 85, 85))
}
.cm-quote {
  color: var(--playground-code-quote-color, rgb(0, 153, 0))
}
.cm-string {
  color: var(--playground-code-string-color, rgb(170, 17, 17))
}
.cm-string-2 {
  color: var(--playground-code-string-2-color, rgb(255, 85, 0))
}
.cm-tag {
  color: var(--playground-code-tag-color, rgb(17, 119, 0))
}
.cm-type {
  color: var(--playground-code-type-color, rgb(0, 136, 85))
}
.cm-variable {
  color: var(--playground-code-variable-color, rgb(0, 0, 0))
}
.cm-variable-2 {
  color: var(--playground-code-variable-2-color, rgb(0, 85, 170))
}
.cm-variable-3 {
  color: var(--playground-code-variable-3-color, rgb(0, 136, 85))
}
`
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
 */;let Xr=class extends le{constructor(){super(...arguments),this.lineNumbers=!1,this.readonly=!1,this._valueChangingFromOutside=!1}get value(){return this._value}set value(e){const r=this._value;this._value=e,this.requestUpdate("value",r)}update(e){const r=this._codemirror;if(void 0===r)this._createView();else for(const t of e.keys())switch(t){case"value":this._valueChangingFromOutside=!0,r.setValue(this.value??""),this._valueChangingFromOutside=!1;break;case"lineNumbers":r.setOption("lineNumbers",this.lineNumbers);break;case"type":r.setOption("mode",this._getLanguageMode());break;case"readonly":r.setOption("readOnly",this.readonly)}super.update(e)}connectedCallback(){"function"==typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver((()=>{this._codemirror?.setSize()})),this._resizeObserver.observe(this)),super.connectedCallback()}disconnectedCallback(){this._resizeObserver?.disconnect(),super.disconnectedCallback()}_createView(){const e=CodeMirror((e=>{this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(e)}),{value:this.value??"",lineNumbers:this.lineNumbers,mode:this._getLanguageMode(),readOnly:this.readonly});e.on("change",(()=>{this._value=e.getValue(),this._valueChangingFromOutside||this.dispatchEvent(new Event("change"))})),this._codemirror=e}_getLanguageMode(){switch(this.type){case"ts":return"google-typescript";case"js":return"google-javascript";case"html":return"google-html";case"css":return"css"}return null}};
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
function $r(e,r,t,o){var n,i=arguments.length,a=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,r,t,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(r,t,a):n(r,t))||a);return i>3&&a&&Object.defineProperty(r,t,a),a
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
***************************************************************************** */}function et(e,r,t,o){var n,i=arguments.length,a=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,r,t,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(r,t,a):n(r,t))||a);return i>3&&a&&Object.defineProperty(r,t,a),a
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
 */}Xr.styles=[ie`
      :host {
        display: block;
        font-family: var(--playground-code-font-family, monospace);
        font-size: var(--playground-code-font-size, unset);
      }

      .CodeMirror {
        height: 100% !important;
        font-family: inherit !important;
        border-radius: inherit;
      }

      .CodeMirror-scroll {
        padding-left: 5px;
      }
    `,Yr],e([Q()],Xr.prototype,"type",void 0),e([Q({type:Boolean,attribute:"line-numbers",reflect:!0})],Xr.prototype,"lineNumbers",void 0),e([Q({type:Boolean,reflect:!0})],Xr.prototype,"readonly",void 0),Xr=e([q("playground-code-editor")],Xr);const rt=new WeakMap,tt=f((e=>r=>{if(!(r instanceof L)||r instanceof _||"style"!==r.committer.name||r.committer.parts.length>1)throw Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:t}=r,{style:o}=t.element;let n=rt.get(r);void 0===n&&(o.cssText=t.strings.join(" "),rt.set(r,n=new Set)),n.forEach((r=>{r in e||(n.delete(r),-1===r.indexOf("-")?o[r]=null:o.removeProperty(r))}));for(const r in e)n.add(r),-1===r.indexOf("-")?o[r]=e[r]:o.setProperty(r,e[r])}));class ot extends Re{constructor(){super(...arguments),this.primary=!1,this.accent=!1,this.unbounded=!1,this.disabled=!1,this.activated=!1,this.selected=!1,this.hovering=!1,this.bgFocused=!1,this.fgActivation=!1,this.fgDeactivation=!1,this.fgScale="",this.fgSize="",this.translateStart="",this.translateEnd="",this.leftPos="",this.topPos="",this.mdcFoundationClass=ir}get isActive(){return(this.parentElement||this).matches(":active")}createAdapter(){return{browserSupportsCssVars:()=>!0,isUnbounded:()=>this.unbounded,isSurfaceActive:()=>this.isActive,isSurfaceDisabled:()=>this.disabled,addClass:e=>{switch(e){case"mdc-ripple-upgraded--background-focused":this.bgFocused=!0;break;case"mdc-ripple-upgraded--foreground-activation":this.fgActivation=!0;break;case"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation=!0}},removeClass:e=>{switch(e){case"mdc-ripple-upgraded--background-focused":this.bgFocused=!1;break;case"mdc-ripple-upgraded--foreground-activation":this.fgActivation=!1;break;case"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation=!1}},containsEventTarget:()=>!0,registerInteractionHandler:()=>{},deregisterInteractionHandler:()=>{},registerDocumentInteractionHandler:()=>{},deregisterDocumentInteractionHandler:()=>{},registerResizeHandler:()=>{},deregisterResizeHandler:()=>{},updateCssVariable:(e,r)=>{switch(e){case"--mdc-ripple-fg-scale":this.fgScale=r;break;case"--mdc-ripple-fg-size":this.fgSize=r;break;case"--mdc-ripple-fg-translate-end":this.translateEnd=r;break;case"--mdc-ripple-fg-translate-start":this.translateStart=r;break;case"--mdc-ripple-left":this.leftPos=r;break;case"--mdc-ripple-top":this.topPos=r}},computeBoundingRect:()=>(this.parentElement||this).getBoundingClientRect(),getWindowPageOffset:()=>({x:window.pageXOffset,y:window.pageYOffset})}}startPress(e){this.waitForFoundation((()=>{this.mdcFoundation.activate(e)}))}endPress(){this.waitForFoundation((()=>{this.mdcFoundation.deactivate()}))}startFocus(){this.waitForFoundation((()=>{this.mdcFoundation.handleFocus()}))}endFocus(){this.waitForFoundation((()=>{this.mdcFoundation.handleBlur()}))}startHover(){this.hovering=!0}endHover(){this.hovering=!1}waitForFoundation(e){this.mdcFoundation?e():this.updateComplete.then(e)}render(){const e={"mdc-ripple-upgraded--unbounded":this.unbounded,"mdc-ripple-upgraded--background-focused":this.bgFocused,"mdc-ripple-upgraded--foreground-activation":this.fgActivation,"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation,hover:this.hovering,primary:this.primary,accent:this.accent,disabled:this.disabled,activated:this.activated,selected:this.selected};return P`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${He(e)}"
          style="${tt({"--mdc-ripple-fg-scale":this.fgScale,"--mdc-ripple-fg-size":this.fgSize,"--mdc-ripple-fg-translate-end":this.translateEnd,"--mdc-ripple-fg-translate-start":this.translateStart,"--mdc-ripple-left":this.leftPos,"--mdc-ripple-top":this.topPos})}"></div>`}}et([X(".mdc-ripple-surface")],ot.prototype,"mdcRoot",void 0),et([Q({type:Boolean})],ot.prototype,"primary",void 0),et([Q({type:Boolean})],ot.prototype,"accent",void 0),et([Q({type:Boolean})],ot.prototype,"unbounded",void 0),et([Q({type:Boolean})],ot.prototype,"disabled",void 0),et([Q({type:Boolean})],ot.prototype,"activated",void 0),et([Q({type:Boolean})],ot.prototype,"selected",void 0),et([Y()],ot.prototype,"hovering",void 0),et([Y()],ot.prototype,"bgFocused",void 0),et([Y()],ot.prototype,"fgActivation",void 0),et([Y()],ot.prototype,"fgDeactivation",void 0),et([Y()],ot.prototype,"fgScale",void 0),et([Y()],ot.prototype,"fgSize",void 0),et([Y()],ot.prototype,"translateStart",void 0),et([Y()],ot.prototype,"translateEnd",void 0),et([Y()],ot.prototype,"leftPos",void 0),et([Y()],ot.prototype,"topPos",void 0);
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
const nt=ie`:host{display:block;position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host .primary{--mdc-ripple-color: var(--mdc-theme-primary, #6200ee)}:host .accent{--mdc-ripple-color: var( --mdc-theme-secondary, #018786 )}:host .mdc-ripple-surface{top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden;--mdc-ripple-fg-opacity: var( --mdc-ripple-press-opacity, 0.12 )}:host .mdc-ripple-surface::before,:host .mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:host .mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:host .mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}:host .mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}:host .mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:host .mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}:host .mdc-ripple-surface::before,:host .mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:host .mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded{overflow:visible}:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded::before,:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:host .mdc-ripple-surface.hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}:host .mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before{opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}:host .mdc-ripple-surface::before,:host .mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}:host .mdc-ripple-surface.activated{--mdc-ripple-press-opacity: calc( var(--mdc-ripple-press-opacity, 0.12) + 0.12 )}:host .mdc-ripple-surface.activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}:host .mdc-ripple-surface.activated.hover::before{opacity:.16;opacity:calc( var(--mdc-ripple-hover-opacity, 0.04) + var(--mdc-ripple-activated-opacity, 0.12) )}:host .mdc-ripple-surface.activated.mdc-ripple-upgraded--background-focused::before{opacity:.24;opacity:calc( var(--mdc-ripple-focus-opacity, 0.12) + var(--mdc-ripple-activated-opacity, 0.12) )}:host .mdc-ripple-surface.selected{--mdc-ripple-press-opacity: calc( var(--mdc-ripple-press-opacity, 0.12) + 0.08 )}:host .mdc-ripple-surface.selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}:host .mdc-ripple-surface.selected.hover::before{opacity:.12;opacity:calc( var(--mdc-ripple-hover-opacity, 0.04) + var(--mdc-ripple-selected-opacity, 0.08) )}:host .mdc-ripple-surface.selected.mdc-ripple-upgraded--background-focused::before{opacity:.2;opacity:calc( var(--mdc-ripple-focus-opacity, 0.12) + var(--mdc-ripple-selected-opacity, 0.08) )}:host .mdc-ripple-surface.disabled{--mdc-ripple-color: transparent}:host .mdc-ripple-surface::before{z-index:1;z-index:var(--m-ripple-z-index, 1)}:host .mdc-ripple-surface::after{z-index:0;z-index:var(--m-ripple-z-index, 0)}`;let it=class extends ot{};it.styles=nt,it=et([q("mwc-ripple")],it);
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
class at{constructor(e){this.startPress=r=>{e().then((e=>{e&&e.startPress(r)}))},this.endPress=()=>{e().then((e=>{e&&e.endPress()}))},this.startFocus=()=>{e().then((e=>{e&&e.startFocus()}))},this.endFocus=()=>{e().then((e=>{e&&e.endFocus()}))},this.startHover=()=>{e().then((e=>{e&&e.startHover()}))},this.endHover=()=>{e().then((e=>{e&&e.endHover()}))}}}class lt extends le{constructor(){super(...arguments),this.disabled=!1,this.icon="",this.label="",this.shouldRenderRipple=!1,this.rippleHandlers=new at((()=>(this.shouldRenderRipple=!0,this.ripple)))}renderRipple(){return this.shouldRenderRipple?P`
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>`:""}focus(){const e=this.buttonElement;e&&(this.rippleHandlers.startFocus(),e.focus())}blur(){const e=this.buttonElement;e&&(this.rippleHandlers.endFocus(),e.blur())}render(){return P`<button
        class="mdc-icon-button"
        aria-label="${this.label||this.icon}"
        ?disabled="${this.disabled}"
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}">
      ${this.renderRipple()}
    <i class="material-icons">${this.icon}</i>
    <span class="default-slot-container">
        <slot></slot>
    </span>
  </button>`}handleRippleMouseDown(e){const r=()=>{window.removeEventListener("mouseup",r),this.handleRippleDeactivate()};window.addEventListener("mouseup",r),this.rippleHandlers.startPress(e)}handleRippleTouchStart(e){this.rippleHandlers.startPress(e)}handleRippleDeactivate(){this.rippleHandlers.endPress()}handleRippleMouseEnter(){this.rippleHandlers.startHover()}handleRippleMouseLeave(){this.rippleHandlers.endHover()}handleRippleFocus(){this.rippleHandlers.startFocus()}handleRippleBlur(){this.rippleHandlers.endFocus()}}$r([Q({type:Boolean,reflect:!0})],lt.prototype,"disabled",void 0),$r([Q({type:String})],lt.prototype,"icon",void 0),$r([Q({type:String})],lt.prototype,"label",void 0),$r([X("button")],lt.prototype,"buttonElement",void 0),$r([("mwc-ripple",(e,r)=>{const t={async get(){return await this.updateComplete,this.renderRoot.querySelector("mwc-ripple")},enumerable:!0,configurable:!0};return void 0!==r?$(t,e,r):ee(t,e)})],lt.prototype,"ripple",void 0),$r([Y()],lt.prototype,"shouldRenderRipple",void 0),$r([re({passive:!0})],lt.prototype,"handleRippleMouseDown",null),$r([re({passive:!0})],lt.prototype,"handleRippleTouchStart",null);
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
const ct=ie`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}:host{display:inline-block;outline:none;--mdc-ripple-color: currentcolor}:host([disabled]){pointer-events:none}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc((var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2)}.mdc-icon-button>i{position:absolute;top:0;padding-top:inherit}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`
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
*/;let dt=class extends lt{};dt.styles=ct,dt=$r([q("mwc-icon-button")],dt),
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
wr.prototype.createRenderRoot=function(){return this.attachShadow({mode:"open",delegatesFocus:!1})};let st=class extends le{constructor(){super(...arguments),this.enableAddFile=!1,this.noFilePicker=!1,this.lineNumbers=!1,this.project=void 0,this._project=void 0}get _currentFile(){return void 0===this._currentFileIndex?void 0:this.files?.[this._currentFileIndex]}async update(e){e.has("project")&&this._findProjectAndRegister(),(e.has("files")||e.has("filename"))&&(this._currentFileIndex=this.files&&this.filename?this.files.map((e=>e.name)).indexOf(this.filename):0,this._tabBar&&(await this._tabBar.updateComplete,this._tabBar.activeIndex=-1,this._tabBar.activeIndex=this._currentFileIndex)),super.update(e)}render(){return P`
      ${this.noFilePicker?y:P` <mwc-tab-bar
            part="file-picker"
            .activeIndex=${this._currentFileIndex??0}
            @MDCTabBar:activated=${this._tabActivated}
          >
            ${this.files?.map((e=>{const r=e.label||e.name.substring(e.name.lastIndexOf("/")+1);return P`<mwc-tab
                .isFadingIndicator=${!0}
                label=${r}
              ></mwc-tab>`}))}
            ${this.enableAddFile?P`<mwc-icon-button icon="add"></mwc-icon-button>`:y}
          </mwc-tab-bar>`}
      ${this._currentFile?P`
            <playground-code-editor
              .value=${this._currentFile.content}
              .type=${this._currentFile?ut(this._currentFile.contentType):void 0}
              .lineNumbers=${this.lineNumbers}
              @change=${this._onEdit}
            >
            </playground-code-editor>
          `:P`<slot></slot>`}
    `}_tabActivated(e){this._currentFileIndex=e.detail.index,this.filename=this.files?.[this._currentFileIndex].name}_findProjectAndRegister(){const e=this._project;this.project instanceof HTMLElement?this._project=this.project:"string"==typeof this.project?this._project=this.getRootNode().getElementById(this.project)||void 0:this._project=void 0,e!==this._project&&(e&&e._unregisterEditor(this),this._project&&this._project._registerEditor(this))}_onEdit(){const e=this._editor.value;this._currentFile&&(this._currentFile.content=e,this._project?.saveDebounced())}};st.styles=ie`
    :host {
      display: block;
      /* Prevents scrollbars from changing container size and shifting layout
      slightly. */
      box-sizing: border-box;
      height: 350px;
    }

    mwc-tab-bar {
      --mdc-tab-height: var(--playground-bar-height, 35px);
      /* The tab bar doesn't hold its height unless there are tabs inside it.
      Also setting height here prevents a resize flashes after the project file
      manifest loads. */
      height: var(--mdc-tab-height);
      color: blue;
      --mdc-typography-button-text-transform: none;
      --mdc-typography-button-font-weight: normal;
      --mdc-typography-button-font-size: 0.75rem;
      --mdc-typography-button-letter-spacing: normal;
      --mdc-icon-button-size: 36px;
      --mdc-icon-size: 18px;
      --mdc-theme-primary: var(--playground-highlight-color, #6200ee);
      --mdc-tab-text-label-color-default: var(
        --playground-file-picker-foreground-color,
        black
      );
      color: #444;
      border-bottom: var(--playground-border, solid 1px #ddd);
      background: var(--playground-file-picker-background, white);
      border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    mwc-tab {
      flex: 0;
    }

    slot {
      display: block;
    }

    playground-code-editor,
    slot {
      height: calc(100% - var(--playground-bar-height, 35px));
    }

    playground-code-editor {
      border-radius: inherit;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    slot {
      background: var(--playground-code-background, unset);
    }

    :host([no-file-picker]) playground-code-editor,
    slot {
      height: calc(100%);
    }
  `,e([Q({type:Boolean})],st.prototype,"enableAddFile",void 0),e([X("mwc-tab-bar")],st.prototype,"_tabBar",void 0),e([X("playground-code-editor")],st.prototype,"_editor",void 0),e([Q({attribute:!1})],st.prototype,"files",void 0),e([Q()],st.prototype,"filename",void 0),e([Q({type:Boolean,attribute:"no-file-picker"})],st.prototype,"noFilePicker",void 0),e([Q({type:Boolean,attribute:"line-numbers"})],st.prototype,"lineNumbers",void 0),e([Y()],st.prototype,"_currentFileIndex",void 0),e([Q()],st.prototype,"project",void 0),e([Q()],st.prototype,"type",void 0),st=e([q("playground-file-editor")],st);const ut=e=>{if(void 0===e)return;const r=e.indexOf(";");switch(-1!==r&&(e=e.substring(0,r)),e){case"video/mp2t":return"ts";case"text/javascript":case"application/javascript":return"js";case"text/html":return"html";case"text/css":return"css"}},pt=new WeakMap,gt=f((e=>r=>{const t=pt.get(r);if(void 0===e&&r instanceof L){if(void 0!==t||!pt.has(r)){const e=r.committer.name;r.committer.element.removeAttribute(e)}}else e!==t&&r.setValue(e);pt.set(r,e)}));
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
function ht(e,r,t,o){var n,i=arguments.length,a=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,r,t,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(r,t,a):n(r,t))||a);return i>3&&a&&Object.defineProperty(r,t,a),a}class ft extends le{constructor(){super(...arguments),this.indeterminate=!1,this.progress=0,this.buffer=1,this.reverse=!1,this.closed=!1,this.ariaLabel="",this.stylePrimaryHalf="",this.stylePrimaryFull="",this.styleSecondaryQuarter="",this.styleSecondaryHalf="",this.styleSecondaryFull="",this.animationReady=!0,this.closedAnimationOff=!1,this.resizeObserver=null}connectedCallback(){super.connectedCallback(),this.rootEl&&this.attachResizeObserver()}render(){const e={"mdc-linear-progress--closed":this.closed,"mdc-linear-progress--closed-animation-off":this.closedAnimationOff,"mdc-linear-progress--indeterminate":this.indeterminate,"mdc-linear-progress--reversed":this.reverse,"mdc-linear-progress--animation-ready":this.animationReady},r={"--mdc-linear-progress-primary-half":this.stylePrimaryHalf,"--mdc-linear-progress-primary-half-neg":""!==this.stylePrimaryHalf?"-"+this.stylePrimaryHalf:"","--mdc-linear-progress-primary-full":this.stylePrimaryFull,"--mdc-linear-progress-primary-full-neg":""!==this.stylePrimaryFull?"-"+this.stylePrimaryFull:"","--mdc-linear-progress-secondary-quarter":this.styleSecondaryQuarter,"--mdc-linear-progress-secondary-quarter-neg":""!==this.styleSecondaryQuarter?"-"+this.styleSecondaryQuarter:"","--mdc-linear-progress-secondary-half":this.styleSecondaryHalf,"--mdc-linear-progress-secondary-half-neg":""!==this.styleSecondaryHalf?"-"+this.styleSecondaryHalf:"","--mdc-linear-progress-secondary-full":this.styleSecondaryFull,"--mdc-linear-progress-secondary-full-neg":""!==this.styleSecondaryFull?"-"+this.styleSecondaryFull:""},t={"flex-basis":this.indeterminate?"100%":100*this.buffer+"%"},o={transform:this.indeterminate?"scaleX(1)":`scaleX(${this.progress})`};return P`
      <div
          role="progressbar"
          class="mdc-linear-progress ${He(e)}"
          style=${tt(r)}
          aria-label=${gt(this.ariaLabel?this.ariaLabel:void 0)}
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow=${gt(this.indeterminate?void 0:this.progress)}
        @transitionend=${this.syncClosedState}>
        <div class="mdc-linear-progress__buffer">
          <div
            class="mdc-linear-progress__buffer-bar"
            style=${tt(t)}>
          </div>
          <div class="mdc-linear-progress__buffer-dots"></div>
        </div>
        <div
            class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
            style=${tt(o)}>
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>`}update(e){!e.has("closed")||this.closed&&void 0!==e.get("closed")||this.syncClosedState(),super.update(e)}async firstUpdated(e){super.firstUpdated(e),this.attachResizeObserver()}syncClosedState(){this.closedAnimationOff=this.closed}updated(e){!e.has("indeterminate")&&e.has("reverse")&&this.indeterminate&&this.restartAnimation(),e.has("indeterminate")&&void 0!==e.get("indeterminate")&&this.indeterminate&&window.ResizeObserver&&this.calculateAndSetAnimationDimensions(this.rootEl.offsetWidth),super.updated(e)}disconnectedCallback(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),super.disconnectedCallback()}attachResizeObserver(){if(window.ResizeObserver)return this.resizeObserver=new ResizeObserver((e=>{if(this.indeterminate)for(const r of e)if(r.contentRect){const e=r.contentRect.width;this.calculateAndSetAnimationDimensions(e)}})),void this.resizeObserver.observe(this.rootEl);this.resizeObserver=null}calculateAndSetAnimationDimensions(e){const r=.8367142*e,t=2.00611057*e,o=.37651913*e,n=.84386165*e,i=1.60277782*e;this.stylePrimaryHalf=r+"px",this.stylePrimaryFull=t+"px",this.styleSecondaryQuarter=o+"px",this.styleSecondaryHalf=n+"px",this.styleSecondaryFull=i+"px",this.restartAnimation()}async restartAnimation(){this.animationReady=!1,await this.updateComplete,await new Promise(requestAnimationFrame),this.animationReady=!0,await this.updateComplete}open(){this.closed=!1}close(){this.closed=!0}}ht([X(".mdc-linear-progress")],ft.prototype,"rootEl",void 0),ht([Q({type:Boolean,reflect:!0})],ft.prototype,"indeterminate",void 0),ht([Q({type:Number})],ft.prototype,"progress",void 0),ht([Q({type:Number})],ft.prototype,"buffer",void 0),ht([Q({type:Boolean,reflect:!0})],ft.prototype,"reverse",void 0),ht([Q({type:Boolean,reflect:!0})],ft.prototype,"closed",void 0),ht([Q()],ft.prototype,"ariaLabel",void 0),ht([Y()],ft.prototype,"stylePrimaryHalf",void 0),ht([Y()],ft.prototype,"stylePrimaryFull",void 0),ht([Y()],ft.prototype,"styleSecondaryQuarter",void 0),ht([Y()],ft.prototype,"styleSecondaryHalf",void 0),ht([Y()],ft.prototype,"styleSecondaryFull",void 0),ht([Y()],ft.prototype,"animationReady",void 0),ht([Y()],ft.prototype,"closedAnimationOff",void 0);
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
const bt=ie`@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half, 83.67142%))}100%{transform:translateX(200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full, 200.611057%))}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter, 37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half, 84.386165%))}100%{transform:translateX(160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full, 160.277782%))}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(-10px)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half-neg, -83.67142%))}100%{transform:translateX(-200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full-neg, -200.611057%))}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter-neg, -37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half-neg, -84.386165%))}100%{transform:translateX(-160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full-neg, -160.277782%))}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}.mdc-linear-progress{position:relative;width:100%;height:4px;transform:translateZ(0);outline:1px solid transparent;overflow:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar{position:absolute;width:100%;height:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top:4px solid}.mdc-linear-progress__buffer{display:flex;position:absolute;width:100%;height:100%}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;background-size:10px 4px;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{visibility:hidden}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;visibility:visible}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--reversed .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress--reversed.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}.mdc-linear-progress--reversed.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}.mdc-linear-progress--reversed .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;order:0;transform:rotate(0)}.mdc-linear-progress--reversed .mdc-linear-progress__buffer-bar{order:1}.mdc-linear-progress--closed{opacity:0}.mdc-linear-progress--closed-animation-off .mdc-linear-progress__buffer-dots{animation:none}.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar,.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar .mdc-linear-progress__bar-inner{animation:none}.mdc-linear-progress__bar-inner{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E")}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6}.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}:host{display:block}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6;background-color:var(--mdc-linear-progress-buffer-color, #e6e6e6)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E");background-image:var(--mdc-linear-progress-buffering-dots-image, url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E"))}`;let mt=class extends ft{};mt.styles=bt,mt=ht([q("mwc-linear-progress")],mt);
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
let yt=class extends le{constructor(){super(...arguments),this.project=void 0,this._project=void 0,this._loading=!0,this._showLoadingBar=!1,this._loadedAtLeastOnce=!1,this._startLoadingBarTime=0}async update(e){e.has("project")&&this._findProjectAndRegister(),super.update(e)}render(){return P`
      <div id="toolbar" part="preview-toolbar">
        <span id="location" part="preview-location"> ${this.location}</span>
        <mwc-icon-button
          id="reload-button"
          part="preview-reload-button"
          icon="refresh"
          ?disabled=${!this.src}
          @click=${this._onReloadClick}
        ></mwc-icon-button>
      </div>

      <div id="content">
        <mwc-linear-progress
          part="preview-loading-indicator"
          indeterminate
          ?closed=${!this._showLoadingBar}
        ></mwc-linear-progress>

        ${this._loadedAtLeastOnce?y:P`<slot></slot>`}

        <iframe
          src=${gt(this.src)}
          @load=${this._onIframeLoad}
          ?hidden=${!this._loadedAtLeastOnce}
        ></iframe>
      </div>
    `}_findProjectAndRegister(){const e=this._project;this.project instanceof HTMLElement?this._project=this.project:"string"==typeof this.project?this._project=this.getRootNode().getElementById(this.project)||void 0:this._project=void 0,e!==this._project&&(e&&e._unregisterPreview(this),this._project&&this._project._registerPreview(this))}reload(){this._iframe.contentWindow?.location.reload(),this._loading=!0,this._startLoadingBar()}_startLoadingBar(){void 0!==this._stopLoadingBarTimerId&&(clearTimeout(this._stopLoadingBarTimerId),this._stopLoadingBarTimerId=void 0),!1===this._showLoadingBar&&(this._showLoadingBar=!0,this._startLoadingBarTime=performance.now())}_stopLoadingBar(){if(!1===this._showLoadingBar)return;const e=performance.now()-this._startLoadingBarTime,r=Math.max(0,500-e);this._stopLoadingBarTimerId=setTimeout((()=>{this._showLoadingBar=!1,this._stopLoadingBarTimerId=void 0}),r)}firstUpdated(){this._loading&&!this._slotHasAnyVisibleChildren()&&this._startLoadingBar()}_slotHasAnyVisibleChildren(){const e=this._slot?.assignedNodes({flatten:!0});if(!e)return!1;for(const r of e)if(r.nodeType!==Node.COMMENT_NODE&&(r.nodeType!==Node.TEXT_NODE||""!==(r.textContent||"").trim()))return!0;return!1}_onReloadClick(){this._loading=!0,this._startLoadingBar(),this._project?.save()}_onIframeLoad(){this.src&&(this._loading=!1,this._loadedAtLeastOnce=!0,this._stopLoadingBar())}};yt.styles=ie`
    :host {
      display: flex;
      flex-direction: column;
      background: white;
      font-family: sans-serif;
      height: 350px;
    }

    #toolbar {
      flex: 0 0 var(--playground-bar-height, 35px);
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
  `,e([Q()],yt.prototype,"src",void 0),e([Q()],yt.prototype,"location",void 0),e([X("iframe")],yt.prototype,"_iframe",void 0),e([X("slot")],yt.prototype,"_slot",void 0),e([Q()],yt.prototype,"project",void 0),e([Y()],yt.prototype,"_loading",void 0),e([Y()],yt.prototype,"_showLoadingBar",void 0),e([Y()],yt.prototype,"_loadedAtLeastOnce",void 0),yt=e([q("playground-preview")],yt);
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
const vt=new Set,kt=new URL("./service-worker.js",import.meta.url),wt=new URL("./typescript-worker.js",import.meta.url);let Ct=class extends le{constructor(){super(...arguments),this.sandboxScope="playground-projects",this._sessionId=(()=>{let e;do{e=crypto.getRandomValues(new Uint32Array(1))[0].toString(32)}while(vt.has(e));return vt.add(e),e})(),this._compiledFilesPromise=Promise.resolve(void 0),this._editors=new Set,this._previews=new Set,this._saveTimeoutId=void 0}get _previewSrc(){if(void 0!==this._serviceWorkerAPI&&void 0!==this._files)return new URL(`./${this._sessionId}/index.html`,this._scopeUrl).href}update(e){var r;if(e.has("sandboxScope")&&(this._scopeUrl=new URL("./"+(r=this.sandboxScope,r.endsWith("/")?r:r+"/"),import.meta.url).href,this._startWorkers()),e.has("projectSrc")&&this._fetchProject(),e.has("_files"))for(const e of this._editors)e.files=this._files;if(e.has("_serviceWorkerAPI")){const e=this._previewSrc;for(const r of this._previews)r.src=e}super.update(e)}render(){return P`<slot @slotchange=${this._slotChange}></slot>`}_slotChange(e){const r=this._slot.assignedElements({flatten:!0}).filter((e=>e.matches("script[type^=sample][filename]")));this._files=r.map((e=>{const r=e.getAttribute("type").substring(7);return{name:e.getAttribute("filename"),label:e.getAttribute("label")||void 0,content:e.textContent.trim().replace("&lt;","<"),contentType:xt(r)}})),this._compileProject()}_registerEditor(e){e.files=this._files,this._editors.add(e)}_unregisterEditor(e){this._editors.delete(e)}_registerPreview(e){e.src=this._previewSrc,this._previews.add(e)}_unregisterPreview(e){this._previews.delete(e)}async _fetchProject(){if(!this.projectSrc)return;const e=new URL(this.projectSrc,document.baseURI),r=await fetch(this.projectSrc),t=await r.json(),o=t.files?Object.keys(t.files):[];this._files=await Promise.all(o.map((async r=>{const o=new URL(r,e),n=await fetch(o.href);if(404===n.status)throw Error("Could not find file "+r);const i=n.headers.get("Content-Type")||void 0;return{name:r,label:t.files[r].label,content:await n.text(),contentType:i}}))),this._compileProject()}async _startWorkers(){await Promise.all([this._startTypeScriptWorker(),this._installServiceWorker()])}async _startTypeScriptWorker(){if(void 0===this._typescriptWorkerAPI){const e=new Worker(wt);this._typescriptWorkerAPI=be(e)}else console.debug("typescript-worker already started")}async _installServiceWorker(){if(!("serviceWorker"in navigator))return void console.warn("ServiceWorker support required for <playground-project>");const e=await navigator.serviceWorker.register(kt.href,{scope:this._scopeUrl});e.addEventListener("updatefound",(()=>{const r=e.installing;r&&this._connectServiceWorker(r)})),e.active?this._connectServiceWorker(e.active):console.warn("unhandled service worker registration state",e)}async _connectServiceWorker(e){return new Promise((r=>{const{port1:t,port2:o}=new MessageChannel,n=e=>{2===e.data.initComlink&&(t.removeEventListener("message",n),this._serviceWorkerAPI=be(t),this._serviceWorkerAPI.setFileAPI(we({getFile:e=>this._getFile(e)}),this._sessionId),r())};t.addEventListener("message",n),t.start(),e.postMessage({initComlink:1,port:o},[o])}))}async _getFile(e){await this._compiledFilesPromise;const r=new URL(e,window.origin).href,t=this._compiledFiles?.get(r);return void 0!==t?{name:e,label:this._files?.find((r=>r.name===e))?.label,content:t,contentType:"application/javascript"}:this._files?.find((r=>r.name===e))}async _compileProject(){void 0!==this._files&&(this._compiledFilesPromise=this._typescriptWorkerAPI.compileProject(this._files),this._compiledFiles=void 0,this._compiledFiles=await this._compiledFilesPromise)}_clearSaveTimeout(){void 0!==this._saveTimeoutId&&(clearTimeout(this._saveTimeoutId),this._saveTimeoutId=void 0)}saveDebounced(){this._clearSaveTimeout(),this._saveTimeoutId=setTimeout((()=>{this.save()}),500)}async save(){this._clearSaveTimeout(),await this._compileProject();for(const e of this._previews)e.reload()}};e([Q({attribute:"project-src"})],Ct.prototype,"projectSrc",void 0),e([Q({attribute:"sandbox-scope"})],Ct.prototype,"sandboxScope",void 0),e([Y()],Ct.prototype,"_files",void 0),e([Y()],Ct.prototype,"_serviceWorkerAPI",void 0),e([X("slot")],Ct.prototype,"_slot",void 0),Ct=e([q("playground-project")],Ct);const xt=e=>{if(void 0!==e)switch(e){case"ts":return"video/mp2t";case"js":return"application/javascript; charset=utf-8";case"html":return"text/html; charset=utf-8";case"css":return"text/css; charset=utf-8"}};
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
 */let St=class extends le{constructor(){super(...arguments),this.sandboxScope="playground-projects",this.enableAddFile=!1,this.lineNumbers=!1,this.resizable=!1}render(){const e="project";return P`
      <playground-project
        id=${e}
        .projectSrc=${this.projectSrc}
        .sandboxScope=${this.sandboxScope}
      >
        <slot></slot>
      </playground-project>

      <playground-file-editor
        part="editor"
        exportparts="file-picker"
        .lineNumbers=${this.lineNumbers}
        .project=${e}
        .enableAddFile=${this.enableAddFile}
      >
      </playground-file-editor>

      <div id="rhs">
        ${this.resizable?P`<div
              id="resizeBar"
              @pointerdown=${this.onResizeBarPointerdown}
            ></div>`:y}

        <playground-preview
          part="preview"
          exportparts="preview-toolbar,
                       preview-location,
                       preview-reload-button,
                       preview-loading-indicator"
          location="Result"
          .project=${e}
        ></playground-preview>
      </div>
    `}async update(e){e.has("resizable")&&!1===this.resizable&&this._rhs?.style.removeProperty("--playground-preview-width"),super.update(e)}onResizeBarPointerdown({pointerId:e}){const r=this._resizeBar;r.setPointerCapture(e);const t=this._rhs.style,{left:o,right:n}=this.getBoundingClientRect(),i=n-o,a=i-100,l=e=>{const r=Math.min(a,Math.max(100,n-e.clientX))/i*100;t.setProperty("--playground-preview-width",r+"%")};r.addEventListener("pointermove",l);const c=()=>{r.releasePointerCapture(e),r.removeEventListener("pointermove",l),r.removeEventListener("pointerup",c)};r.addEventListener("pointerup",c)}};St.styles=ie`
    :host {
      display: flex;
      height: 350px;
      min-width: 200px;
      border: var(--playground-border, solid 1px #ddd);
    }

    playground-file-editor {
      height: 100%;
      flex: 1;
      min-width: 100px;
      overflow: hidden;
      border-radius: inherit;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: var(--playground-border, solid 1px #ddd);
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
  `,e([Q({attribute:"project-src"})],St.prototype,"projectSrc",void 0),e([Q({attribute:"sandbox-scope"})],St.prototype,"sandboxScope",void 0),e([Q({type:Boolean})],St.prototype,"enableAddFile",void 0),e([Q({type:Boolean,attribute:"line-numbers"})],St.prototype,"lineNumbers",void 0),e([Q({type:Boolean})],St.prototype,"resizable",void 0),e([X("#resizeBar")],St.prototype,"_resizeBar",void 0),e([X("#rhs")],St.prototype,"_rhs",void 0),St=e([q("playground-ide")],St);const Tt=[ie`
.playground-theme-3024-day {
  --playground-code-background: rgb(247, 247, 247);
  --playground-code-color: rgb(58, 52, 50);
  --playground-code-cursor-color: rgb(92, 88, 85);
  --playground-code-selected-background: rgb(214, 213, 212);
  --playground-code-focused-selected-background: rgb(214, 213, 212);
  --playground-code-selection-background: rgb(214, 213, 212);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(128, 125, 124);
  --playground-code-atom-color: rgb(161, 106, 148);
  --playground-code-attribute-color: rgb(1, 162, 82);
  --playground-code-bracket-color: rgb(58, 52, 50);
  --playground-code-builtin-color: rgb(58, 52, 50);
  --playground-code-comment-color: rgb(205, 171, 83);
  --playground-code-def-color: rgb(232, 187, 208);
  --playground-code-error-color: rgb(92, 88, 85);
  --playground-code-header-color: rgb(58, 52, 50);
  --playground-code-hr-color: rgb(58, 52, 50);
  --playground-code-keyword-color: rgb(219, 45, 32);
  --playground-code-link-color: rgb(161, 106, 148);
  --playground-code-meta-color: rgb(58, 52, 50);
  --playground-code-number-color: rgb(161, 106, 148);
  --playground-code-operator-color: rgb(58, 52, 50);
  --playground-code-property-color: rgb(1, 162, 82);
  --playground-code-qualifier-color: rgb(58, 52, 50);
  --playground-code-quote-color: rgb(58, 52, 50);
  --playground-code-string-color: rgb(253, 237, 2);
  --playground-code-string-2-color: rgb(58, 52, 50);
  --playground-code-tag-color: rgb(219, 45, 32);
  --playground-code-type-color: rgb(58, 52, 50);
  --playground-code-variable-color: rgb(1, 162, 82);
  --playground-code-variable-2-color: rgb(1, 160, 228);
  --playground-code-variable-3-color: rgb(58, 52, 50)
}
`,ie`
.playground-theme-3024-night {
  --playground-code-background: rgb(9, 3, 0);
  --playground-code-color: rgb(214, 213, 212);
  --playground-code-cursor-color: rgb(128, 125, 124);
  --playground-code-selected-background: rgb(58, 52, 50);
  --playground-code-focused-selected-background: rgb(58, 52, 50);
  --playground-code-activeline-background: rgb(47, 47, 47);
  --playground-code-selection-background: rgba(58, 52, 50, 0.99);
  --playground-code-gutter-background: rgb(9, 3, 0);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(92, 88, 85);
  --playground-code-atom-color: rgb(161, 106, 148);
  --playground-code-attribute-color: rgb(1, 162, 82);
  --playground-code-bracket-color: rgb(214, 213, 212);
  --playground-code-builtin-color: rgb(214, 213, 212);
  --playground-code-comment-color: rgb(205, 171, 83);
  --playground-code-def-color: rgb(232, 187, 208);
  --playground-code-error-color: rgb(128, 125, 124);
  --playground-code-header-color: rgb(214, 213, 212);
  --playground-code-hr-color: rgb(214, 213, 212);
  --playground-code-keyword-color: rgb(219, 45, 32);
  --playground-code-link-color: rgb(161, 106, 148);
  --playground-code-meta-color: rgb(214, 213, 212);
  --playground-code-number-color: rgb(161, 106, 148);
  --playground-code-operator-color: rgb(214, 213, 212);
  --playground-code-property-color: rgb(1, 162, 82);
  --playground-code-qualifier-color: rgb(214, 213, 212);
  --playground-code-quote-color: rgb(214, 213, 212);
  --playground-code-string-color: rgb(253, 237, 2);
  --playground-code-string-2-color: rgb(214, 213, 212);
  --playground-code-tag-color: rgb(219, 45, 32);
  --playground-code-type-color: rgb(214, 213, 212);
  --playground-code-variable-color: rgb(1, 162, 82);
  --playground-code-variable-2-color: rgb(1, 160, 228);
  --playground-code-variable-3-color: rgb(214, 213, 212)
}
`,ie`
.playground-theme-abcdef {
  --playground-code-background: rgb(15, 15, 15);
  --playground-code-color: rgb(222, 253, 239);
  --playground-code-cursor-color: rgb(0, 255, 0);
  --playground-code-selected-background: rgb(81, 81, 81);
  --playground-code-focused-selected-background: rgb(81, 81, 81);
  --playground-code-activeline-background: rgb(49, 65, 81);
  --playground-code-selection-background: rgba(56, 56, 56, 0.99);
  --playground-code-gutter-background: rgb(85, 85, 85);
  --playground-code-gutter-border-right: 2px solid rgb(49, 65, 81);
  --playground-code-linenumber-color: rgb(255, 255, 255);
  --playground-code-atom-color: rgb(119, 119, 255);
  --playground-code-attribute-color: rgb(221, 255, 0);
  --playground-code-bracket-color: rgb(138, 138, 138);
  --playground-code-builtin-color: rgb(48, 170, 188);
  --playground-code-comment-color: rgb(122, 123, 124);
  --playground-code-def-color: rgb(255, 250, 188);
  --playground-code-header-color: rgb(127, 255, 212);
  --playground-code-hr-color: rgb(222, 253, 239);
  --playground-code-keyword-color: rgb(184, 134, 11);
  --playground-code-link-color: rgb(138, 43, 226);
  --playground-code-meta-color: rgb(204, 153, 255);
  --playground-code-number-color: rgb(238, 130, 238);
  --playground-code-operator-color: rgb(255, 255, 0);
  --playground-code-property-color: rgb(254, 220, 186);
  --playground-code-qualifier-color: rgb(255, 247, 0);
  --playground-code-quote-color: rgb(222, 253, 239);
  --playground-code-string-color: rgb(34, 187, 68);
  --playground-code-string-2-color: rgb(222, 253, 239);
  --playground-code-tag-color: rgb(255, 221, 68);
  --playground-code-type-color: rgb(221, 238, 255);
  --playground-code-variable-color: rgb(171, 205, 239);
  --playground-code-variable-2-color: rgb(202, 203, 204);
  --playground-code-variable-3-color: rgb(221, 238, 255)
}
`,ie`
.playground-theme-ambiance {
  --playground-code-background: rgb(32, 32, 32) url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAABFFUlEQVQYGbzBCeDVU/74/6fj9HIcx/FRHx9JCFmzMyGRURhLZIkUsoeRfUjS2FNDtr6WkMhO9sm+S8maJfu+Jcsg+/o/c+Z4z/t97/vezy3z+z8ekGlnYICG/o7gdk+wmSHZ1z4pJItqapjoKXWahm8NmV6eOTbWUOp6/6a/XIg6GQqmenJ2lDHyvCFZ2cBDbmtHA043VFhHwXxClWmeYAdLhV00Bd85go8VmaFCkbVkzlQENzfBDZ5gtN7HwF0KDrTwJ0dypSOzpaKCMwQHKTIreYIxlmhXTzTWkVm+LTynZhiSBT3RZQ7aGfjGEd3qyXQ1FDymqbKxpspERQN2MiRjNZlFFQXfCNFm9nM1zpAsoYjmtRTc5ajwuaXc5xrWskT97RaKzAGe5ARHhVUsDbjKklziiX5WROcJwSNCNI+9w1Jwv4Zb2r7lCMZ4oq5C0EdTx+2GzNuKpJ+iFf38JEWkHJn9DNF7mmBDITrWEg0VWL3pHU20tSZnuqWu+R3BtYa8XxV1HO7GyD32UkOpL/yDloINFTmvtId+nmAjxRw40VMwVKiwrKLE4bK5UOVntYwhOcSSXKrJHKPJedocpGjVz/ZMIbnYUPB10/eKCrs5apqpgVmWzBYWpmtKHecJPjaUuEgRDDaU0oZghCJ6zNMQ5ZhDYx05r5v2muQdM0EILtXUsaKiQX9WMEUotagQzFbUNN6NUPC2nm5pxEWGCjMc3GdJHjSU2kORLK/JGSrkfGEIjncU/CYUnOipoYemwj8tST9NsJmB7TUVXtbUtXATJVZXBMvYeTXJfobgJUPmGMP/yFaWonaa6BcFO3nqcIqCozSZoZoSr1g4zJOzuyGnxTEX3lUEJ7WcZgme8ddaWvWJo2AJR9DZU3CUIbhCSG6ybSwN6qtJVnCU2svDTP2ZInOw2cBTrqtQahtNZn9NcJ4l2NaSmSkkP1noZWnVwkLmdUPOwLZEwy2Z3S3R+4rIG9hcbpPXHFVWcQdZkn2FOta3cKWQnNRC5g1LsJah4GCzSVsKnCOY5OAFRTBekyyryeyilhFKva75r4Mc0aWanGEaThcy31s439KKxTzJYY5WTHPU1FtIHjQU3Oip4xlNzj/lBw23dYZVliQa7WAXf4shetcQfatI+jWRDBPmyNeW6A1P5kdDgyYJlba0BIM8BZu1JfrFwItyjcAMR3K0BWOIrtMEXyhyrlVEx3ui5dUBjmB/Q3CXW85R4mBD0s7B+4q5tKUjOlb9qqmhi5AZ6GFIC5HXtOobdYGlVdMVbNJ8toNTFcHxnoL+muBagcctjWnbNMuR00uI7nQESwg5q2qqrKWIfrNUmeQocY6HuyxJV02wj36w00yhpmUFenv4p6fUkZYqLyuinx2RGOjhCXYyJF84oiU00YMOOhhquNdfbOB7gU88pY4xJO8LVdp6/q2voeB4R04vIdhSE40xZObx1HGGJ/ja0LBthFInKaLPPFzuCaYaoj8JjPME8yoyxo6zlBqkiUZYgq00OYMswbWO5NGmq+xhipxHLRW29ARjNKXO0wRnear8XSg4XFPLKEPUS1GqvyLwiuBUoa7zpZ0l5xxFwWmWZC1H5h5FwU8eQ7K+g8UcVY6TMQreVQT/8uQ8Z+ALIXnSEa2pYZQneE9RZbSBNYXfWYJzW/h/4j4Dp1tYVcFIC5019Vyi4ThPqSFCzjGWaHQTBU8q6vrVwgxP9Lkm840imWKpcLCjYTtrKuwvsKSnrvHCXGkSMk9p6lhckfRpIeis+N2PiszT+mFLspyGleUhDwcLrZqmyeylxwjBcKHEapqkmyangyLZRVOijwOtCY5SsG5zL0OwlCJ4y5KznF3EUNDDrinwiyLZRzOXtlBbK5ITHFGLp8Q0R6ab6mS7enI2cFrxOyHvOCFaT1HThS1krjCwqWeurCkk+willhCC+RSZnRXBiZaC5RXRIZYKp2lyfrHwiKPKR0JDzrdU2EFgpidawlFDR6FgXUMNa+g1FY3bUQh2cLCwosRdnuQTS/S+JVrGLeWIvtQUvONJxlqSQYYKpwoN2kaocLjdVsis4Mk80ESF2YpSkzwldjHkjFCUutI/r+EHDU8oCs6yzL3PhWiEooZdFMkymlas4AcI3KmoMMNSQ3tHzjGWCrcJJdYyZC7QFGwjRL9p+MrRkAGWzIaWCn9W0F3TsK01c2ZvQw0byvxuQU0r1lM0qJO7wW0kRIMdDTtXEdzi4VIh+EoIHm0mWtAtpCixlabgn83fKTI7anJe9ST7WIK1DMGpQmYeA58ImV6ezOGOzK2Kgq01pd60cKWiUi9Lievb/0vIDPHQ05Kzt4ddPckQBQtoaurjyHnek/nKzpQLrVgKPjIkh2v4uyezpv+Xoo7fPFXaGFp1vaLKxQ4uUpQQS5VuQs7BCq4xRJv7fwpVvvFEB3j+620haOuocqMhWd6TTPAEx+mdFNGHdranFe95WrWmIvlY4F1Dle2ECgc6cto7SryuqGGGha0tFQ5V53migUKmg6XKAo4qS3mik+0OZpAhOLeZKicacgaYcyx5hypYQE02ZA4xi/pNhOQxR4klNKyqacj+mpxnLTnnGSo85++3ZCZq6lrZkXlGEX3o+C9FieccJbZWVFjC0Yo1FZnJhoYMFoI1hEZ9r6hwg75HwzBNhbZCdJEfJwTPGzJvaKImw1yYX1HDAmpXR+ZJQ/SmgqMNVQb5vgamGwLtt7VwvP7Qk1xpiM5x5Cyv93E06MZmgs0Nya2azIKOYKCGBQQW97RmhKNKF02JZqHEJ4o58qp7X5EcZmc56trXEqzjCBZ1MFGR87Ql2tSTs6CGxS05PTzRQorkbw7aKoKXFDXsYW42VJih/q+FP2BdTzDTwVqOYB13liM50vG7wy28qagyuIXMeQI/Oqq8bcn5wJI50xH00CRntyfpL1T4hydYpoXgNiFzoIUTDZnLNRzh4TBHwbYGDvZkxmlyJloyr6tRihpeUG94GnKtIznREF0tzJG/OOr73JBcrSh1k6WuTprgLU+mnSGnv6Zge0NNz+kTDdH8nuAuTdJDCNb21LCiIuqlYbqGzT3RAoZofQfjFazkqeNWdYaGvYTM001EW2oKPvVk1ldUGSgUtHFwjKM1h9jnFcmy5lChoLNaQMGGDsYbKixlaMBmmsx1QjCfflwTfO/gckW0ruZ3jugKR3R5W9hGUWqCgxuFgsuaCHorotGKzGaeZB9DMsaTnKCpMtwTvOzhYk0rdrArKCqcaWmVk1+F372ur1YkKxgatI8Qfe1gIX9wE9FgS8ESmuABIXnRUbCapcKe+nO7slClSZFzpV/LkLncEb1qiO42fS3R855Su2mCLh62t1SYZZYVmKwIHjREF2uihTzB20JOkz7dkxzYQnK0UOU494wh+VWRc6Un2kpTaVgLDFEkJ/uhzRcI0YKGgpGWOlocBU/a4fKoJ/pEaNV6jip3+Es9VXY078rGnmAdf7t9ylPXS34RBSuYPs1UecZTU78WanhBCHpZ5sAoTz0LGZKjPf9TRypqWEiTvOFglL1fCEY3wY/++rbk7C8bWebA6p6om6PgOL2kp44TFJlVNBXae2rqqdZztOJpT87GQsE9jqCPIe9VReZuQ/CIgacsyZdCpIScSYqcZk8r+nsyCzhyfhOqHGOIvrLknC8wTpFcaYiGC/RU1NRbUeUpocQOnkRpGOrIOcNRx+1uA0UrzhSSt+VyS3SJpnFWkzNDqOFGIWcfR86DnmARTQ1HKIL33ExPiemeOhYSSjzlSUZZuE4TveoJLnBUOFof6KiysCbnAEcZgcUNTDOwkqWu3RWtmGpZwlHhJENdZ3miGz0lJlsKnjbwqSHQjpxnFDlTLLwqJPMZMjd7KrzkSG7VsxXBZE+F8YZkb01Oe00yyRK9psh5SYh29ySPKBo2ylNht7ZkZnsKenjKNJu9PNEyZpaCHv4Kt6RQsLvAVp7M9kIimmCUwGeWqLMmGuIotYMmWNpSahkhZw9FqZsVnKJhsjAHvtHMsTM9fCI06Dx/u3vfUXCqfsKRc4oFY2jMsoo/7DJDwZ1CsIKnJu+J9ldkpmiCxQx1rWjI+T9FwcWWzOuaYH0Hj7klNRVWEQpmaqosakiGNTFHdjS/qnUdmf0NJW5xsL0HhimCCZZSRzmSPTXJQ4aaztAwtZnoabebJ+htCaZ7Cm535ByoqXKbX1WRc4Eh2MkRXWzImVc96Cj4VdOKVxR84VdQsIUM8Psoou2byVHyZFuq7O8otbSQ2UAoeEWTudATLGSpZzVLlXVkPU2Jc+27lsw2jmg5T5VhbeE3BT083K9WsTTkFU/Osi0rC5lRlpwRHUiesNS0sOvmqGML1aRbPAxTJD9ZKtxuob+hhl8cwYGWpJ8nub7t5p6coYbMovZ1BTdaKn1jYD6h4GFDNFyT/Kqe1XCXphXHOKLZmuRSRdBPEfVUXQzJm5YGPGGJdvAEr7hHNdGZnuBvrpciGmopOLf5N0uVMy0FfYToJk90uUCbJupaVpO53UJXR2bVpoU00V2KOo4zMFrBd0Jtz2pa0clT5Q5L8IpQ177mWQejPMEJhuQjS10ref6HHjdEhy1P1EYR7GtO0uSsKJQYLiTnG1rVScj5lyazpqWGl5uBbRWl7m6ixGOOnEsMJR7z8J0n6KMnCdxhiNYQCoZ6CmYLnO8omC3MkW3bktlPmEt/VQQHejL3+dOE5FlPdK/Mq8hZxxJtLyRrepLThYKbLZxkSb5W52vYxNOaOxUF0yxMUPwBTYqCzy01XayYK0sJyWBLqX0MwU5CzoymRzV0EjjeUeLgDpTo6ij42ZAzvD01dHUUTPLU96MdLbBME8nFBn7zJCMtJcZokn8YoqU0FS5WFKyniHobguMcmW8N0XkWZjkyN3hqOMtS08r+/xTBwpZSZ3qiVRX8SzMHHjfUNFjgHEPmY9PL3ykEzxkSre/1ZD6z/NuznuB0RcE1TWTm9zRgfUWVJiG6yrzgmWPXC8EAR4Wxhlad0ZbgQyEz3pG5RVEwwDJH2mgKpjcTiCOzn1lfUWANFbZ2BA8balnEweJC9J0iuaeZoI+ippFCztEKVvckR2iice1JvhVytrQwUAZpgsubCPaU7xUe9vWnaOpaSBEspalykhC9bUlOMpT42ZHca6hyrqKmw/wMR8H5ZmdFoBVJb03O4UL0tSNnvIeRmkrLWqrs78gcrEn2tpcboh0UPOW3UUR9PMk4T4nnNKWmCjlrefhCwxRNztfmIQVdDElvS4m1/WuOujoZCs5XVOjtKPGokJzsYCtFYoWonSPT21DheU/wWhM19FcElwqNGOsp9Q8N/cwXaiND1MmeL1Q5XROtYYgGeFq1aTMsoMmcrKjQrOFQTQ1fmBYhmW6o8Jkjc7iDJRTBIo5kgJD5yMEYA3srCg7VFKwiVJkmRCc5ohGOKhsYMn/XBLdo5taZjlb9YAlGWRimqbCsoY7HFAXLa5I1HPRxMMsQDHFkWtRNniqT9UEeNjcE7RUlrCJ4R2CSJuqlKHWvJXjAUNcITYkenuBRB84TbeepcqTj3zZyFJzgYQdHnqfgI0ddUwS6GqWpsKWhjq9cV0vBAEMN2znq+EBfIWT+pClYw5xsTlJU6GeIBsjGmmANTzJZiIYpgrM0Oa8ZMjd7NP87jxhqGOhJlnQtjuQpB+8aEE00wZFznSJPyHxgH3HkPOsJFvYk8zqCHzTs1BYOa4J3PFU+UVRZxlHDM4YavlNUuMoRveiZA2d7grMNc2g+RbSCEKzmgYsUmWmazFJyoiOZ4KnyhKOGRzWJa0+moyV4TVHDzn51Awtqaphfk/lRQ08FX1iiqxTB/kLwd0VynKfEvI6cd4XMV5bMhZ7gZUWVzYQ6Nm2BYzxJbw3bGthEUUMfgbGeorae6DxHtJoZ6alhZ0+ytiVoK1R4z5PTrOECT/SugseEOlb1MMNR4VRNcJy+V1Hg9ONClSZFZjdHlc6W6FBLdJja2MC5hhpu0DBYEY1TFGwiFAxRRCsYkiM9JRb0JNMVkW6CZYT/2EiTGWmo8k+h4FhDNE7BvppoTSFnmCV5xZKzvcCdDo7VVPnIU+I+Rc68juApC90MwcFCsJ5hDqxgScYKreruyQwTqrzoqDCmhWi4IbhB0Yrt3RGa6GfDv52rKXWhh28dyZaWUvcZeMTBaZoSGyiCtRU5J8iviioHaErs7Jkj61syVzTTgOcUOQ8buFBTYWdL5g3T4qlpe0+wvD63heAXRfCCIed9RbCsp2CiI7raUOYOTU13N8PNHvpaGvayo4a3LLT1lDrVEPT2zLUlheB1R+ZTRfKWJ+dcocLJfi11vyJ51lLqJ0WD7tRwryezjiV5W28uJO9qykzX8JDe2lHl/9oyBwa2UMfOngpXCixvKdXTk3wrsKmiVYdZIqsoWEERjbcUNDuiaQomGoIbFdEHmsyWnuR+IeriKDVLnlawlyNHKwKlSU631PKep8J4Q+ayjkSLKYLhalNHlYvttb6fHm0p6OApsZ4l2VfdqZkjuysy6ysKLlckf1KUutCTs39bmCgEyyoasIWlVaMF7mgmWtBT8Kol5xpH9IGllo8cJdopcvZ2sImlDmMIbtDk3KIpeNiS08lQw11NFPTwVFlPP6pJ2gvRfI7gQUfmNAtf6Gs0wQxDsKGlVBdF8rCa3jzdwMaGHOsItrZk7hAyOzpK9VS06j5F49b0VNGOOfKs3lDToMsMBe9ZWtHFEgxTJLs7qrygKZjUnmCYoeAqeU6jqWuLJup4WghOdvCYJnrSkSzoyRkm5M2StQwVltPkfCAk58tET/CSg+8MUecmotMEnhBKfWBIZsg2ihruMJQaoIm+tkTLKEqspMh00w95gvFCQRtDwTT1gVDDSEVdlwqZfxoQRbK0g+tbiBZxzKlpnpypejdDwTaeOvorMk/IJE10h9CqRe28hhLbe0pMsdSwv4ZbhKivo2BjDWfL8UKJgeavwlwb5KlwhyE4u4XkGE2ytZCznKLCDZZq42VzT8HLCrpruFbIfOIINmh/qCdZ1ZBc65kLHR1Bkyf5zn6pN3SvGKIlFNGplhrO9QSXanLOMQTLCa0YJCRrCZm/CZmrLTm7WzCK4GJDiWUdFeYx1LCFg3NMd0XmCuF3Y5rITLDUsYS9zoHVzwnJoYpSTQoObyEzr4cFBNqYTopoaU/wkyLZ2lPhX/5Y95ulxGTV7KjhWrOZgl8MyUUafjYraNjNU1N3IWcjT5WzWqjwtoarHSUObGYO3GCJZpsBlnJGPd6ZYLyl1GdCA2625IwwJDP8GUKymbzuyPlZlvTUsaUh5zFDhRWFzPKKZLAlWdcQbObgF9tOqOsmB1dqcqYJmWstFbZRRI9poolmqiLnU0POvxScpah2iSL5UJNzgScY5+AuIbpO0YD3NCW+dLMszFSdFCWGqG6eVq2uYVNDdICGD6W7EPRWZEY5gpsE9rUkS3mijzzJnm6UpUFXG1hCUeVoS5WfNcFpblELL2qqrCvMvRfd45oalvKU2tiQ6ePJOVMRXase9iTtLJztPxJKLWpo2CRDcJwn2sWSLKIO1WQWNTCvpVUvOZhgSC40JD0dOctaSqzkCRbXsKlb11Oip6PCJ0IwSJM31j3akRxlP7Rwn6aGaUL0qiLnJkvB3xWZ2+Q1TfCwpQH3G0o92UzmX4o/oJNQMMSQc547wVHhdk+VCw01DFYEnTxzZKAm74QmeNNR1w6WzEhNK15VJzuCdxQ53dRUDws5KvwgBMOEgpcVNe0hZI6RXT1Jd0cyj5nsaEAHgVmGaJIlWdsc5Ui2ElrRR6jrRAttNMEAIWrTDFubkZaok7/AkzfIwfuWVq0jHzuCK4QabtLUMVPB3kJ0oyHTSVFlqMALilJf2Rf8k5aaHtMfayocLBS8L89oKoxpJvnAkDPa0qp5DAUTHKWmCcnthlou8iCKaFFLHWcINd1nyIwXqrSxMNmSs6KmoL2QrKuWtlQ5V0120xQ5vRyZS1rgFkWwhiOwiuQbR0OOVhQM9iS3tiXp4RawRPMp5tDletOOBL95MpM01dZTBM9pkn5qF010rIeHFcFZhmSGpYpTsI6nwhqe5C9ynhlpp5ophuRb6WcJFldkVnVEwwxVfrVkvnWUuNLCg5bgboFHPDlDPDmnK7hUrWiIbjadDclujlZcaokOFup4Ri1kacV6jmrrK1hN9bGwpKEBQ4Q6DvIUXOmo6U5LqQM6EPyiKNjVkPnJkDPNEaxhiFay5ExW1NXVUGqcpYYdPcGiCq7z/TSlbhL4pplWXKd7NZO5QQFrefhRQW/NHOsqcIglc4UhWklR8K0QzbAw08CBDnpbgqXdeD/QUsM4RZXDFBW6WJKe/mFPdH0LtBgiq57wFLzlyQzz82qYx5D5WJP5yVJDW01BfyHnS6HKO/reZqId1WGa4Hkh2kWodJ8i6KoIPlAj2hPt76CzXsVR6koPRzWTfKqIentatYpQw2me4AA3y1Kind3SwoOKZDcFXTwl9tWU6mfgRk9d71sKtlNwrjnYw5tC5n5LdKiGry3JKNlHEd3oaMCFHrazBPMp/uNJ+V7IudcSbeOIdjUEdwl0VHCOZo5t6YluEuaC9mQeMgSfOyKnYGFHcIeQ84yQWbuJYJpZw5CzglDH7gKnWqqM9ZTaXcN0TeYhR84eQtJT76JJ1lREe7WnnvsMmRc9FQ7SBBM9mV3lCUdmHk/S2RAMt0QjFNFqQpWjDPQ01DXWUdDBkXziKPjGEP3VP+zIWU2t7im41FOloyWzn/L6dkUy3VLDaZ6appgDLHPjJEsyvJngWEPUyVBiAaHCTEXwrLvSEbV1e1gKJniicWorC1MUrVjB3uDhJE/wgSOzk1DXpk0k73qCM8xw2UvD5kJmDUfOomqMpWCkJRlvKXGmoeBm18USjVIk04SClxTB6YrgLAPLWYK9HLUt5cmc0vYES8GnTeRc6skZbQkWdxRsIcyBRzx1DbTk9FbU0caTPOgJHhJKnOGIVhQqvKmo0llRw9sabrZkDtdg3PqaKi9oatjY8B+G371paMg6+mZFNNtQ04mWBq3rYLOmtWWQp8KJnpy9DdFensyjdqZ+yY40VJlH8wcdLzC8PZnvHMFUTZUrDTkLyQaGus5X5LzpYAf3i+e/ZlhqGqWhh6Ou6xTR9Z6oi5AZZtp7Mj2EEm8oSpxiYZCHU/1fbGdNNNRRoZMhmilEb2gqHOEJDtXkHK/JnG6IrvbPCwV3NhONVdS1thBMs1T4QOBcTWa2IzhMk2nW5Kyn9tXUtpv9RsG2msxk+ZsQzRQacJncpgke0+T8y5Fzj8BiGo7XlJjaTIlpQs7KFjpqGnKuoyEPeIKnFMkZHvopgh81ySxNFWvJWcKRs70j2FOT012IllEEO1n4pD1513Yg2ssQPOThOkvyrqHUdEXOSEsihmBbTbKX1kLBPWqWkLOqJbjB3GBIZmoa8qWl4CG/iZ7oiA72ZL7TJNeZUY7kFQftDcHHluBzRbCegzMtrRjVQpX2lgoPKKLJAkcbMl01XK2p7yhL8pCBbQ3BN2avJgKvttcrWDK3CiUOVxQ8ZP+pqXKyIxnmBymCg5vJjNfkPK4+c8cIfK8ocVt7kmfd/I5SR1hKvCzUtb+lhgc00ZaO6CyhIQP1Uv4yIZjload72PXX0OIJvnFU+0Zf6MhsJwTfW0r0UwQfW4LNLZl5HK261JCZ4qnBaAreVAS3WrjV0LBnNDUNNDToCEeFfwgcb4gOEqLRhirWkexrCEYKVV711DLYEE1XBEsp5tpTGjorkomKYF9FDXv7fR3BGwbettSxnyL53MBPjsxDZjMh+VUW9NRxq1DhVk+FSxQcaGjV9Pawv6eGByw5qzoy7xk4RsOShqjJwWKe/1pEEfzkobeD/dQJmpqedcyBTy2sr4nGNRH0c0SPWTLrqAc0OQcb/gemKgqucQT7ySWKCn2EUotoCvpZct7RO2sy/QW0IWcXd7pQRQyZVwT2USRO87uhjioTLKV2brpMUcMQRbKH/N2T+UlTpaMls6cmc6CCNy3JdYYSUzzJQ4oSD3oKLncULOiJvjBEC2oqnCJkJluCYy2ZQ5so9YYlZ1VLlQU1mXEW1jZERwj/MUSRc24TdexlqLKfQBtDTScJUV8FszXBEY5ktpD5Ur9hYB4Nb1iikw3JoYpkKX+RodRKFt53MMuRnKSpY31PwYaGaILh3wxJGz9TkTPEETxoCWZrgvOlmyMzxFEwVJE5xZKzvyJ4WxEc16Gd4Xe3Weq4XH2jKRikqOkGQ87hQnC7wBmGYLAnesX3M+S87eFATauuN+Qcrh7xIxXJbUIdMw3JGE3ylCWzrieaqCn4zhGM19TQ3z1oH1AX+pWEqIc7wNGAkULBo/ZxRaV9NNyh4Br3rCHZzbzmSfawBL0dNRwpW1kK9mxPXR9povcdrGSZK9c2k0xwFGzjuniCtRSZCZ6ccZ7gaktmgAOtKbG/JnOkJrjcQTdFMsxRQ2cLY3WTIrlCw1eWKn8R6pvt4GFDso3QoL4a3nLk3G6JrtME3dSenpx7PNFTmga0EaJTLQ061sEeQoWXhSo9LTXsaSjoJQRXeZLtDclbCrYzfzHHeaKjHCVOUkQHO3JeEepr56mhiyaYYKjjNU+Fed1wS5VlhWSqI/hYUdDOkaxiKehoyOnrCV5yBHtbWFqTHCCwtpDcYolesVR5yUzTZBb3RNMd0d6WP+SvhuBmRcGxnuQzT95IC285cr41cLGQ6aJJhmi4TMGempxeimBRQw1tFKV+8jd6KuzoSTqqDxzRtpZkurvKEHxlqXKRIjjfUNNXQsNOsRScoWFLT+YeRZVD3GRN0MdQcKqQjHDMrdGGVu3iYJpQx3WGUvfbmxwFfR20WBq0oYY7LMFhhgYtr8jpaEnaOzjawWWaTP8mMr0t/EPDPoqcnxTBI5o58L7uoWnMrpoqPwgVrlAUWE+V+TQl9rawoyP6QGAlQw2TPRX+YSkxyBC8Z6jhHkXBgQL7WII3DVFnRfCrBfxewv9D6xsyjys4VkhWb9pUU627JllV0YDNHMku/ldNMMXDEo4aFnAkk4U6frNEU4XgZUPmEKHUl44KrzmYamjAbh0JFvGnaTLPu1s9jPCwjFpYiN7z1DTOk/nc07CfDFzmCf7i+bfNHXhDtLeBXzTBT5rkMvWOIxpl4EMh2LGJBu2syDnAEx2naEhHDWMMzPZEhygyS1mS5RTJr5ZkoKbEUoYqr2kqdDUE8ztK7OaIntJkFrIECwv8LJTaVx5XJE86go8dFeZ3FN3rjabCAYpoYEeC9zzJVULBbmZhDyd7ko09ydpNZ3nm2Kee4FPPXHnYEF1nqOFEC08LUVcDvYXkJHW8gTaKCk9YGOeIJhqiE4ToPEepdp7IWFjdwnWaufGMwJJCMtUTTBBK9BGCOy2tGGrJTHIwyEOzp6aPzNMOtlZkDvcEWpP5SVNhfkvDxhmSazTJXYrM9U1E0xwFVwqZQwzJxw6+kGGGUj2FglGGmnb1/G51udRSMNlTw6GGnCcUwVcOpmsqTHa06o72sw1RL02p9z0VbnMLOaIX3QKaYKSCFQzBKEUNHTSc48k53RH9wxGMtpQa5KjjW0W0n6XCCCG4yxNNdhQ4R4l1Ff+2sSd6UFHiIEOyqqFgT01mEUMD+joy75jPhOA+oVVLm309FR4yVOlp4RhLiScNmSmaYF5Pw0STrOIoWMSR2UkRXOMp+M4SHW8o8Zoi6OZgjKOaFar8zZDzkWzvKOjkKBjmCXby8JahhjXULY4KlzgKLvAwxVGhvyd4zxB1d9T0piazmKLCVZY5sKiD0y2ZSYrkUEPUbIk+dlQ4SJHTR50k1DPaUWIdTZW9NJwnJMOECgd7ou/MnppMJ02O1VT4Wsh85MnZzcFTngpXGKo84qmwgKbCL/orR/SzJ2crA+t6Mp94KvxJUeIbT3CQu1uIdlQEOzlKfS3UMcrTiFmOuroocrZrT2AcmamOKg8YomeEKm/rlT2sociMaybaUlFhuqHCM2qIJ+rg4EcDFymiDSxzaHdPcpE62pD5kyM5SBMoA1PaUtfIthS85ig1VPiPPYXgYEMNk4Qq7TXBgo7oT57gPUdwgCHzhIVFPFU6OYJzHAX9m5oNrVjeE61miDrqQ4VSa1oiURTsKHC0IfjNwU2WzK6eqK8jWln4g15TVBnqmDteCJ501PGAocJhhqjZdtBEB6lnhLreFJKxmlKbeGrqLiSThVIbCdGzloasa6lpMQXHCME2boLpJgT7yWaemu6wBONbqGNVRS0PKIL7LckbjmQtR7K8I5qtqel+T/ChJTNIKLjdUMNIRyvOEko9YYl2cwQveBikCNawJKcLBbc7+JM92mysNvd/Fqp8a0k6CNEe7cnZrxlW0wQXaXjaktnRwNOGZKYiONwS7a1JVheq3WgJHlQUGKHKmp4KAxXR/ULURcNgoa4zhKSLpZR3kxRRb0NmD0OFn+UCS7CzI1nbP6+o4x47QZE5xRCt3ZagnYcvmpYQktXdk5YKXTzBC57kKEe0VVuiSYqapssMS3C9p2CKkHOg8B8Pa8p5atrIw3qezIWanMGa5HRDNF6RM9wcacl0N+Q8Z8hsIkSnaIIdHRUOEebAPy1zbCkhM062FCJtif7PU+UtoVXzWKqM1PxXO8cfdruhFQ/a6x3JKYagvVDhQEtNiyiiSQ7OsuRsZUku0CRNDs4Sog6KKjsZgk2bYJqijgsEenoKeniinRXBn/U3lgpPdyDZynQx8IiioMnCep5Ky8mjGs6Wty0l1hUQTcNWswS3WRp2kCNZwJG8omG8JphPUaFbC8lEfabwP7VtM9yoaNCAjpR41VNhrD9LkbN722v0CoZMByFzhaW+MyzRYEWFDQwN2M4/JiT76PuljT3VU/A36eaIThb+R9oZGOAJ9tewkgGvqOMNRWYjT/Cwu99Q8LqDE4TgbLWxJ1jaDDAERsFOFrobgjUsBScaguXU8kKm2RL19tRypSHnHNlHiIZqgufs4opgQdVdwxBNNFBR6kVFqb8ogimOzB6a6HTzrlDHEpYaxjiiA4TMQobkDg2vejjfwJGWmnbVFAw3H3hq2NyQfG7hz4aC+w3BbwbesG0swYayvpAs6++Ri1Vfzx93mFChvyN5xVHTS+0p9aqCAxyZ6ZacZyw5+7uuQkFPR9DDk9NOiE7X1PCYJVjVUqq7JlrHwWALF5nfHNGjApdpqgzx5OwilDhCiDYTgnc9waGW4BdLNNUQvOtpzDOWHDH8D7TR/A/85KljEQu3NREc4Pl/6B1Hhc8Umb5CsKMmGC9EPcxoT2amwHNCmeOEnOPbklnMkbOgIvO5UMOpQrS9UGVdt6iH/fURjhI/WOpaW9OKLYRod6HCUEdOX000wpDZQ6hwg6LgZfOqo1RfT/CrJzjekXOGhpc1VW71ZLbXyyp+93ILbC1kPtIEYx0FIx1VDrLoVzXRKRYWk809yYlC9ImcrinxtabKnzRJk3lAU1OLEN1j2zrYzr2myHRXJFf4h4QKT1qSTzTB5+ZNTzTRkAxX8FcLV2uS8eoQQ2aAkFzvCM72sJIcJET3WPjRk5wi32uSS9rfZajpWEvj9hW42F4o5NytSXYy8IKHay10VYdrcl4SkqscrXpMwyGOgtkajheSxdQqmpxP1L3t4R5PqasFnrQEjytq6qgp9Y09Qx9o4S1FzhUCn1kyHSzBWLemoSGvOqLNhZyBjmCaAUYpMgt4Ck7wBBMMwWKWgjsUwTaGVsxWC1mYoKiyqqeGKYqonSIRQ3KIkHO0pmAxTdBHkbOvfllfr+AA+7gnc50huVKYK393FOyg7rbPO/izI7hE4CnHHHnJ0ogNPRUGeUpsrZZTBJcrovUcJe51BPsr6GkJdhCCsZ6aTtMEb2pqWkqeVtDXE/QVggsU/Nl86d9RMF3DxvZTA58agu810RWawCiSzzXBeU3MMW9oyJUedvNEvQyNu1f10BSMddR1vaLCYpYa/mGocLSiYDcLbQz8aMn5iyF4xBNMs1P0QEOV7o5gaWGuzSeLue4tt3ro7y4Tgm4G/mopdZgl6q0o6KzJWE3mMksNr3r+a6CbT8g5wZNzT9O7fi/zpaOmnz3BRoqos+tv9zMbdpxsqDBOEewtJLt7cg5wtKKbvldpSzRRCD43VFheCI7yZLppggMVBS/KMAdHODJvOwq2NQSbKKKPLdFWQs7Fqo+mpl01JXYRgq8dnGLhTiFzqmWsUMdpllZdbKlyvSdYxhI9YghOtxR8LgSLWHK62mGGVoxzBE8LNWzqH9CUesQzFy5RQzTc56mhi6fgXEWwpKfE5Z7M05ZgZUPmo6auiv8YKzDYwWBLMErIbKHJvOwIrvEdhOBcQ9JdU1NHQ7CXn2XIDFBKU2WAgcX9UAUzDXWd5alwuyJ41Z9rjKLCL4aCp4WarhPm2rH+SaHUYE001JDZ2ZAzXPjdMpZWvC9wmqIB2lLhQ01D5jO06hghWMndbM7yRJMsoCj1vYbnFQVrW9jak3OlEJ3s/96+p33dEPRV5GxiqaGjIthUU6FFEZyqCa5qJrpBdzSw95IUnOPIrCUUjRZQFrbw5PR0R1qiYx3cb6nrWUMrBmmiBQxVHtTew5ICP/ip6g4hed/Akob/32wvBHsIOX83cI8hGeNeNPCIkPmXe8fPKx84OMSRM1MTdXSwjCZ4S30jVGhvqTRak/OVhgGazHuOCud5onEO1lJr6ecVyaOK6H7zqlBlIaHE0oroCgfvGJIdPcmfLNGLjpz7hZwZQpUbFME0A1cIJa7VNORkgfsMBatbKgwwJM9bSvQXeNOvbIjelg6WWvo5kvbKaJJNHexkKNHL9xRyFlH8Ti2riB5wVPhUk7nGkJnoCe428LR/wRGdYIlmWebCyxou1rCk4g/ShugBDX0V0ZQWkh0dOVsagkM0yV6OoLd5ye+pRlsCr0n+KiQrGuq5yJDzrTAXHtLUMduTDBVKrSm3eHL+6ijxhFDX9Z5gVU/wliHYTMiMFpKLNMEywu80wd3meoFmt6VbRMPenhrOc6DVe4pgXU8DnnHakLOIIrlF4FZPIw6R+zxBP0dyq6OOZ4Q5sLKCcz084ok+VsMMyQhNZmmBgX5xIXOEJTmi7VsGTvMTNdHHhpzdbE8Du2oKxgvBqQKdDDnTFOylCFaxR1syz2iqrOI/FEpNc3C6f11/7+ASS6l2inq2ciTrCCzgyemrCL5SVPjQkdPZUmGy2c9Sw9FtR1sS30RmsKPCS4rkIC/2U0MduwucYolGaPjKEyhzmiPYXagyWbYz8LWBDdzRimAXzxx4z8K9hpzlhLq+NiQ97HuKorMUfK/OVvC2JfiHUPCQI/q7J2gjK+tTDNxkCc4TMssqCs4TGtLVwQihyoAWgj9bosU80XGW6Ac9TJGziaUh5+hnFcHOnlaM1iRn29NaqGENTTTSUHCH2tWTeV0osUhH6psuVLjRUmGWhm6OZEshGeNowABHcJ2Bpy2ZszRcKkRXd2QuKVEeXnbfaEq825FguqfgfE2whlChSRMdron+LATTPQ2Z369t4B9C5gs/ylzv+CMmepIDPclFQl13W0rspPd1JOcbghGOEutqCv5qacURQl3dDKyvyJlqKXGPgcM9FfawJAMVmdcspcYKOZc4GjDYkFlK05olNMHyHn4zFNykyOxt99RkHlfwmiHo60l2EKI+mhreEKp080Tbug08BVPcgoqC5zWt+NLDTZ7oNSF51N1qie7Va3uCCwyZbkINf/NED6jzOsBdZjFN8oqG3wxVunqCSYYKf3EdhJyf9YWGf7tRU2oH3VHgPr1fe5J9hOgHd7xQ0y7qBwXr23aGErP0cm64JVjZwsOGqL+mhNgZmhJLW2oY4UhedsyBgzrCKrq7BmcpNVhR6jBPq64Vgi+kn6XE68pp8J5/+0wRHGOpsKenQn9DZntPzjRLZpDAdD2fnSgkG9tmIXnUwQ6WVighs7Yi2MxQ0N3CqYaCXkJ0oyOztMDJjmSSpcpvlrk0RMMOjmArQ04PRV1DO1FwhCVaUVPpKUM03JK5SxPsIWRu8/CGHi8UHChiqGFDTbSRJWeYUDDcH6vJWUxR4k1FXbMUwV6e4AJFXS8oMqsZKqzvYQ9DDQdZckY4aGsIhtlubbd2r3j4QBMoTamdPZk7O/Bf62lacZwneNjQoGcdVU7zJOd7ghsUHOkosagic6cnWc8+4gg285R6zZP5s1/LUbCKIznTwK36PkdwlOrl4U1LwfdCCa+IrvFkmgw1PCAUXKWo0sURXWcI2muKJlgyFzhynCY4RBOsqCjoI1R5zREco0n2Vt09BQtYSizgKNHfUmUrQ5UOCh51BFcLmY7umhYqXKQomOop8bUnWNNQcIiBcYaC6xzMNOS8JQQfeqKBmmglB+97ok/lfk3ygaHSyZaCRTzRxQo6GzLfa2jWBPepw+UmT7SQEJyiyRkhBLMVOfcoMjcK0eZChfUNzFAUzCsEN5vP/X1uP/n/aoMX+K+nw/Hjr/9xOo7j7Pju61tLcgvJpTWXNbfN5jLpi6VfCOviTktKlFusQixdEKWmEBUKNaIpjZRSSOXSgzaaKLdabrm1/9nZ+/f+vd/vz/v9+Xy+zZ7PRorYoZqyLrCwQdEAixxVOEXNNnjX2nUSRlkqGmWowk8lxR50JPy9Bo6qJXaXwNvREBvnThPEPrewryLhcAnj5WE15Fqi8W7R1sAuEu86S4ENikItFN4xkv9Af4nXSnUVcLiA9xzesFpivRRVeFKtsMRaKBhuSbjOELnAUtlSQUpXgdfB4Z1oSbnFEetbQ0IrAe+Y+pqnDcEJFj6S8LDZzZHwY4e3XONNlARraomNEt2bkvGsosA3ioyHm+6jCMbI59wqt4eeara28IzEmyPgoRaUOEDhTVdEJhmCoTWfC0p8aNkCp0oYqih2iqGi4yXeMkOsn4LdLLnmKfh/YogjNsPebeFGR4m9BJHLzB61XQ3BtpISfS2FugsK9FAtLWX1dCRcrCnUp44CNzuCowUZmxSRgYaE6Za0W2u/E7CVXCiI/UOR8aAm1+OSyE3mOUcwyc1zBBeoX1kiKy0Zfxck1Gsyulti11i83QTBF5Kg3pDQThFMVHiPSlK+0cSedng/VaS8bOZbtsBcTcZAR8JP5KeqQ1OYKAi20njdNNRpgnsU//K+JnaXJaGTomr7aYIphoRn9aeShJWKEq9LcozSF7QleEfDI5LYm5bgVkFkRwVDBCVu0DDIkGupo8TZBq+/pMQURYErJQmPKGKjNDkWOLx7Jd5QizdUweIaKrlP7SwJDhZvONjLkOsBBX9UpGxnydhXkfBLQ8IxgojQbLFnJf81JytSljclYYyEFyx0kVBvKWOFJmONpshGAcsduQY5giVNCV51eOdJYo/pLhbvM0uDHSevNKRcrKZIqnCtJeEsO95RoqcgGK4ocZcho1tTYtcZvH41pNQ7vA0WrhIfOSraIIntIAi+NXWCErdbkvrWwjRLrt0NKUdL6KSOscTOdMSOUtBHwL6OLA0vNSdynaWQEnCpIvKaIrJJEbvHkmuNhn6OjM8VkSGSqn1uYJCGHnq9I3aLhNME3t6GjIkO7xrNFumpyTNX/NrwX7CrIRiqqWijI9JO4d1iieykyfiposQIQ8YjjsjlBh6oHWbwRjgYJQn2NgSnNycmJAk3NiXhx44Sxykihxm8ybUwT1OVKySc7vi3OXVkdBJ4AyXBeksDXG0IhgtYY0lY5ahCD0ehborIk5aUWRJviMA7Xt5kyRjonrXENkm8yYqgs8VzgrJmClK20uMM3jRJ0FiQICQF9hdETlLQWRIb5ki6WDfWRPobvO6a4GP5mcOrNzDFELtTkONLh9dXE8xypEg7z8A9jkhrQ6Fhjlg/QVktJXxt4WXzT/03Q8IaQWSqIuEvloQ2mqC9Jfi7wRul4RX3pSPlzpoVlmCtI2jvKHCFhjcM3sN6lqF6HxnKelLjXWbwrpR4xzuCrTUZx2qq9oAh8p6ixCUGr78g8oyjRAtB5CZFwi80VerVpI0h+IeBxa6Zg6kWvpDHaioYYuEsRbDC3eOmC2JvGYLeioxGknL2UATNJN6hmtj1DlpLvDVmocYbrGCVJKOrg4X6DgddLA203BKMFngdJJFtFd7vJLm6KEpc5yjQrkk7M80SGe34X24nSex1Ra5Omgb71JKyg8SrU3i/kARKwWpH0kOGhKkObyfd0ZGjvyXlAkVZ4xRbYJ2irFMkFY1SwyWxr2oo4zlNiV+7zmaweFpT4kR3kaDAFW6xpSqzJay05FtYR4HmZhc9UxKbbfF2V8RG1MBmSaE+kmC6JnaRXK9gsiXhJHl/U0qM0WTcbyhwkYIvFGwjSbjfwhiJt8ZSQU+Bd5+marPMOkVkD0muxYLIfEuhh60x/J92itguihJSEMySVPQnTewnEm+620rTQEMsOfo4/kP/0ARvWjitlpSX7GxBgcMEsd3EEeYWvdytd+Saawi6aCIj1CkGb6Aj9rwhx16Cf3vAwFy5pyLhVonXzy51FDpdEblbkdJbUcEPDEFzQ8qNmhzzLTmmKWKbFCXeEuRabp6rxbvAtLF442QjQ+wEA9eL1xSR7Q0JXzlSHjJ4exq89yR0laScJ/FW6z4a73pFMEfDiRZvuvijIt86RaSFOl01riV2mD1UEvxGk/Geg5aWwGki1zgKPG9J2U8PEg8qYvMsZeytiTRXBMslCU8JSlxi8EabjwUldlDNLfzTUmCgxWsjqWCOHavYAqsknKFIO0yQ61VL5AVFxk6WhEaCAkdJgt9aSkzXlKNX2jEa79waYuc7gq0N3GDJGCBhoiTXUEPsdknCUE1CK0fwsiaylSF2uiDyO4XX3pFhNd7R4itFGc0k/ElBZwWvq+GC6szVeEoS/MZ+qylwpKNKv9Z469UOjqCjwlusicyTxG6VpNxcQ8IncoR4RhLbR+NdpGGmJWOcIzJGUuKPGpQg8rrG21dOMqQssJQ4RxH5jaUqnZuQ0F4Q+cjxLwPtpZbIAk3QTJHQWBE5S1BokoVtDd6lhqr9UpHSUxMcIYl9pojsb8h4SBOsMQcqvOWC2E8EVehqiJ1hrrAEbQxeK0NGZ0Gkq+guSRgniM23bIHVkqwx4hiHd7smaOyglyIyQuM978j4VS08J/A2G1KeMBRo4fBaSNhKUEZfQewVQ/C1I+MgfbEleEzCUw7mKXI0M3hd1EESVji8x5uQ41nxs1q4RMJCCXs7Iq9acpxn22oSDnQ/sJTxsCbHIYZiLyhY05TY0ZLIOQrGaSJDDN4t8pVaIrsqqFdEegtizc1iTew5Q4ayBDMUsQMkXocaYkc0hZua412siZ1rSXlR460zRJ5SlHGe5j801RLMlJTxtaOM3Q1pvxJ45zUlWFD7rsAbpfEm1JHxG0eh8w2R7QQVzBUw28FhFp5QZzq8t2rx2joqulYTWSuJdTYfWwqMFMcovFmSyJPNyLhE4E10pHzYjOC3huArRa571ZsGajQpQx38SBP5pyZB6lMU3khDnp0MBV51BE9o2E+TY5Ml2E8S7C0o6w1xvCZjf0HkVEHCzFoyNmqC+9wdcqN+Tp7jSDheE9ws8Y5V0NJCn2bk2tqSY4okdrEhx1iDN8cSudwepWmAGXKcJXK65H9to8jYQRH7SBF01ESUJdd0TayVInaWhLkOjlXE5irKGOnI6GSWGCJa482zBI9rCr0jyTVcEuzriC1vcr6mwFGSiqy5zMwxBH/TJHwjSPhL8+01kaaSUuMFKTcLEvaUePcrSmwn8DZrgikWb7CGPxkSjhQwrRk57tctmxLsb9sZvL9LSlyuSLlWkqOjwduo8b6Uv1DkmudIeFF2dHCgxVtk8dpIvHpBxhEOdhKk7OLIUSdJ+cSRY57B+0DgGUUlNfpthTfGkauzxrvTsUUaCVhlKeteTXCoJDCa2NOKhOmC4G1H8JBd4OBZReSRGkqcb/CO1PyLJTLB4j1q8JYaIutEjSLX8YKM+a6phdMsdLFUoV5RTm9JSkuDN8WcIon0NZMNZWh1q8C7SJEwV5HxrmnnTrf3KoJBlmCYI2ilSLlfEvlE4011NNgjgthzEua0oKK7JLE7HZHlEl60BLMVFewg4EWNt0ThrVNEVkkiTwpKXSWJzdRENgvKGq4IhjsiezgSFtsfCUq8qki5S1LRQeYQQ4nemmCkImWMw3tFUoUBZk4NOeZYEp4XRKTGa6wJjrWNHBVJR4m3FCnbuD6aak2WsMTh3SZImGCIPKNgsDpVwnsa70K31lCFJZYcwwSMFcQulGTsZuEaSdBXkPGZhu0FsdUO73RHjq8MPGGIfaGIbVTk6iuI3GFgucHrIQkmWSJdBd7BBu+uOryWAhY7+Lki9rK5wtEQzWwvtbqGhIMFwWRJsElsY4m9IIg9L6lCX0VklaPAYkfkZEGDnOWowlBJjtMUkcGK4Lg6EtoZInMUBVYLgn0UsdmCyCz7gIGHFfk+k1QwTh5We7A9x+IdJ6CvIkEagms0hR50eH9UnTQJ+2oiKyVlLFUE+8gBGu8MQ3CppUHesnjTHN4QB/UGPhCTHLFPHMFrCqa73gqObUJGa03wgbhHkrCfpEpzNLE7JDS25FMKhlhKKWKfCgqstLCPu1zBXy0J2ztwjtixBu8UTRn9LVtkmCN2iyFhtME70JHRQ1KVZXqKI/KNIKYMCYs1GUMEKbM1bKOI9LDXC7zbHS+bt+1MTWS9odA9DtrYtpbImQJ2VHh/lisEwaHqUk1kjKTAKknkBEXkbkdMGwq0dnhzLJF3NJH3JVwrqOB4Sca2hti75nmJN0WzxS6UxDYoEpxpa4htVlRjkYE7DZGzJVU72uC9IyhQL4i8YfGWSYLLNcHXloyz7QhNifmKSE9JgfGmuyLhc403Xm9vqcp6gXe3xuuv8F6VJNxkyTHEkHG2g0aKXL0MsXc1bGfgas2//dCONXiNLCX+5mB7eZIl1kHh7ajwpikyzlUUWOVOsjSQlsS+M0R+pPje/dzBXRZGO0rMtgQrLLG9VSu9n6CMXS3BhwYmSoIBhsjNBmZbgusE9BCPCP5triU4VhNbJfE+swSP27aayE8tuTpYYjtrYjMVGZdp2NpS1s6aBnKSHDsbKuplKbHM4a0wMFd/5/DmGyKrJSUaW4IBrqUhx0vyfzTBBLPIUcnZdrAkNsKR0sWRspumSns6Ch0v/qqIbBYUWKvPU/CFoyrDJGwSNFhbA/MlzKqjrO80hRbpKx0Jewsi/STftwGSlKc1JZyAzx05dhLEdnfQvhZOqiHWWEAHC7+30FuRcZUgaO5gpaIK+xsiHRUsqaPElTV40xQZQ107Q9BZE1nryDVGU9ZSQ47bmhBpLcYpUt7S+xuK/FiT8qKjwXYw5ypS2iuCv7q1gtgjhuBuB8LCFY5cUuCNtsQOFcT+4Ih9JX+k8Ea6v0iCIRZOtCT0Et00JW5UeC85Cg0ScK0k411HcG1zKtre3SeITBRk7WfwDhEvaYLTHP9le0m8By0JDwn4TlLW/aJOvGHxdjYUes+ScZigCkYQdNdEOhkiezgShqkx8ueKjI8lDfK2oNiOFvrZH1hS+tk7NV7nOmLHicGWEgubkXKdwdtZknCLJXaCpkrjZBtLZFsDP9CdxWsSr05Sxl6CMmoFbCOgryX40uDtamB7SVmXW4Ihlgpmq+00tBKUUa83WbjLUNkzDmY7cow1JDygyPGlhgGKYKz4vcV7QBNbJIgM11TUqZaMdwTeSguH6rOaw1JRKzaaGyxVm2EJ/uCIrVWUcZUkcp2grMsEjK+DMwS59jQk3Kd6SEq1d0S6uVmO4Bc1lDXTUcHjluCXEq+1OlBDj1pi9zgiXxnKuE0SqTXwhqbETW6RggMEnGl/q49UT2iCzgJvRwVXS2K/d6+ZkyUl7jawSVLit46EwxVljDZwoSQ20sDBihztHfk2yA8NVZghiXwrYHQdfKAOtzsayjhY9bY0yE2CWEeJ9xfzO423xhL5syS2TFJofO2pboHob0nY4GiAgRrvGQEDa/FWSsoaaYl0syRsEt3kWoH3B01shCXhTUWe9w3Bt44SC9QCh3eShQctwbaK2ApLroGCMlZrYqvlY3qYhM0aXpFkPOuoqJ3Dm6fxXrGwVF9gCWZagjPqznfkuMKQ8DPTQRO8ZqG1hPGKEm9IgpGW4DZDgTNriTxvFiq+Lz+0cKfp4wj6OCK9JSnzNSn9LFU7UhKZZMnYwcJ8s8yRsECScK4j5UOB95HFO0CzhY4xJxuCix0lDlEUeMdS6EZBkTsUkZ4K74dugyTXS7aNgL8aqjDfkCE0ZbwkCXpaWCKhl8P7VD5jxykivSyxyZrYERbe168LYu9ZYh86IkscgVLE7tWPKmJv11CgoyJltMEbrohtVAQfO4ImltiHEroYEs7RxAarVpY8AwXMcMReFOTYWe5iiLRQxJ5Q8DtJ8LQhWOhIeFESPGsILhbNDRljNbHzNRlTFbk2S3L0NOS6V1KFJYKUbSTcIIhM0wQ/s2TM0SRMNcQmSap3jCH4yhJZKSkwyRHpYYgsFeQ4U7xoCB7VVOExhXepo9ABBsYbvGWKXPME3lyH95YioZ0gssQRWWbI+FaSMkXijZXwgiTlYdPdkNLaETxlyDVIwqeaEus0aTcYcg0RVOkpR3CSJqIddK+90JCxzsDVloyrFd5ZAr4TBKfaWa6boEA7C7s6EpYaeFPjveooY72mjIccLHJ9HUwVlDhKkmutJDJBwnp1rvulJZggKDRfbXAkvC/4l3ozQOG9a8lxjx0i7nV4jSXc7vhe3OwIxjgSHjdEhhsif9YkPGlus3iLFDnWOFhtCZbJg0UbQcIaR67JjthoCyMEZRwhiXWyxO5QxI6w5NhT4U1WsJvDO60J34fW9hwzwlKij6ZAW9ne4L0s8C6XeBMEkd/LQy1VucBRot6QMlbivaBhoBgjqGiCJNhsqVp/S2SsG6DIONCR0dXhvWbJ+MRRZJkkuEjgDXJjFQW6SSL7GXK8Z2CZg7cVsbWGoKmEpzQ5elpiy8Ryg7dMkLLUEauzeO86CuwlSOlgYLojZWeJ9xM3S1PWfEfKl5ISLQ0MEKR8YOB2QfCxJBjrKPCN4f9MkaSsqoVXJBmP7EpFZ9UQfOoOFwSzBN4MQ8LsGrymlipcJQhmy0GaQjPqCHaXRwuCZwRbqK2Fg9wlClZqYicrIgMdZfxTQ0c7TBIbrChxmuzoKG8XRaSrIhhiyNFJkrC7oIAWMEOQa5aBekPCRknCo4IKPrYkvCDI8aYmY7WFtprgekcJZ3oLIqssCSMtFbQTJKwXYy3BY5oCh2iKPCpJOE+zRdpYgi6O2KmOAgvVCYaU4ySRek1sgyFhJ403QFHiVEmJHwtybO1gs8Hr5+BETQX3War0qZngYGgtVZtoqd6vFSk/UwdZElYqyjrF4HXUeFspIi9IGKf4j92pKGAdCYMVsbcV3kRF0N+R8LUd5PCsIGWoxDtBkCI0nKofdJQxT+LtZflvuc8Q3CjwWkq8KwUpHzkK/NmSsclCL0nseQdj5FRH5CNHSgtLiW80Of5HU9Hhlsga9bnBq3fEVltKfO5IaSTmGjjc4J0otcP7QsJUSQM8pEj5/wCuUuC2DWz8AAAAAElFTkSuQmCC");
  --playground-code-color: rgb(230, 225, 220);
  --playground-code-cursor-color: rgb(121, 145, 232);
  --playground-code-selected-background: rgba(255, 255, 255, 0.15);
  --playground-code-focused-selected-background: rgba(255, 255, 255, 0.15);
  --playground-code-activeline-background: rgba(255, 255, 255, 0.03);
  --playground-code-selection-background: rgba(255, 255, 255, 0.1);
  --playground-code-gutter-background: rgb(61, 61, 61) url("data:image/png;base64,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");
  --playground-code-gutter-border-right: 1px solid rgb(77, 77, 77);
  --playground-code-gutter-box-shadow: rgb(0, 0, 0) 0px 10px 20px 0px;
  --playground-code-linenumber-color: rgb(17, 17, 17);
  --playground-code-atom-color: rgb(207, 126, 169);
  --playground-code-attribute-color: rgb(155, 133, 157);
  --playground-code-bracket-color: rgb(36, 194, 199);
  --playground-code-builtin-color: rgb(153, 153, 204);
  --playground-code-comment-color: rgb(85, 85, 85);
  --playground-code-def-color: rgb(170, 198, 227);
  --playground-code-error-color: rgb(175, 32, 24);
  --playground-code-hr-color: rgb(255, 192, 203);
  --playground-code-keyword-color: rgb(205, 168, 105);
  --playground-code-link-color: rgb(244, 194, 11);
  --playground-code-meta-color: rgb(210, 168, 161);
  --playground-code-number-color: rgb(120, 207, 138);
  --playground-code-operator-color: rgb(250, 141, 106);
  --playground-code-property-color: rgb(238, 209, 179);
  --playground-code-qualifier-color: rgb(255, 255, 0);
  --playground-code-quote-color: rgb(36, 194, 199);
  --playground-code-string-color: rgb(143, 157, 106);
  --playground-code-string-2-color: rgb(157, 147, 124);
  --playground-code-tag-color: rgb(254, 228, 255);
  --playground-code-type-color: rgb(250, 222, 211);
  --playground-code-variable-color: rgb(255, 183, 149);
  --playground-code-variable-2-color: rgb(238, 209, 179);
  --playground-code-variable-3-color: rgb(250, 222, 211)
}
`,ie`
.playground-theme-ayu-dark {
  --playground-code-background: rgb(10, 14, 20);
  --playground-code-color: rgb(179, 177, 173);
  --playground-code-cursor-color: rgb(230, 180, 80);
  --playground-code-selected-background: rgb(39, 55, 71);
  --playground-code-focused-selected-background: rgb(39, 55, 71);
  --playground-code-activeline-background: rgb(1, 6, 14);
  --playground-code-selection-background: rgb(39, 55, 71);
  --playground-code-gutter-background: rgb(10, 14, 20);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(61, 66, 77);
  --playground-code-atom-color: rgb(174, 129, 255);
  --playground-code-attribute-color: rgb(255, 180, 84);
  --playground-code-bracket-color: rgb(248, 248, 242);
  --playground-code-builtin-color: rgb(230, 180, 80);
  --playground-code-comment-color: rgb(98, 106, 115);
  --playground-code-def-color: rgb(255, 238, 153);
  --playground-code-error-color: rgb(255, 51, 51);
  --playground-code-header-color: rgb(194, 217, 76);
  --playground-code-hr-color: rgb(179, 177, 173);
  --playground-code-keyword-color: rgb(255, 143, 64);
  --playground-code-link-color: rgb(57, 186, 230);
  --playground-code-meta-color: rgb(179, 177, 173);
  --playground-code-number-color: rgb(230, 180, 80);
  --playground-code-operator-color: rgb(179, 177, 173);
  --playground-code-property-color: rgb(255, 180, 84);
  --playground-code-qualifier-color: rgb(179, 177, 173);
  --playground-code-quote-color: rgb(179, 177, 173);
  --playground-code-string-color: rgb(194, 217, 76);
  --playground-code-string-2-color: rgb(179, 177, 173);
  --playground-code-tag-color: rgb(57, 186, 230);
  --playground-code-type-color: rgb(255, 143, 64);
  --playground-code-variable-color: rgb(179, 177, 173);
  --playground-code-variable-2-color: rgb(240, 113, 120);
  --playground-code-variable-3-color: rgb(57, 186, 230)
}
`,ie`
.playground-theme-ayu-mirage {
  --playground-code-background: rgb(31, 36, 48);
  --playground-code-color: rgb(203, 204, 198);
  --playground-code-cursor-color: rgb(255, 204, 102);
  --playground-code-selected-background: rgb(52, 69, 90);
  --playground-code-focused-selected-background: rgb(52, 69, 90);
  --playground-code-activeline-background: rgb(25, 30, 42);
  --playground-code-selection-background: rgb(52, 69, 90);
  --playground-code-gutter-background: rgb(31, 36, 48);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(61, 66, 77);
  --playground-code-atom-color: rgb(174, 129, 255);
  --playground-code-attribute-color: rgb(255, 213, 128);
  --playground-code-bracket-color: rgb(92, 207, 230);
  --playground-code-builtin-color: rgb(255, 204, 102);
  --playground-code-comment-color: rgb(92, 103, 115);
  --playground-code-def-color: rgb(255, 213, 128);
  --playground-code-error-color: rgb(255, 51, 51);
  --playground-code-header-color: rgb(186, 230, 126);
  --playground-code-hr-color: rgb(203, 204, 198);
  --playground-code-keyword-color: rgb(255, 167, 89);
  --playground-code-link-color: rgb(92, 207, 230);
  --playground-code-meta-color: rgb(203, 204, 198);
  --playground-code-number-color: rgb(255, 204, 102);
  --playground-code-operator-color: rgb(203, 204, 198);
  --playground-code-property-color: rgb(242, 158, 116);
  --playground-code-qualifier-color: rgb(203, 204, 198);
  --playground-code-quote-color: rgb(203, 204, 198);
  --playground-code-string-color: rgb(186, 230, 126);
  --playground-code-string-2-color: rgb(203, 204, 198);
  --playground-code-tag-color: rgb(92, 207, 230);
  --playground-code-type-color: rgb(255, 167, 89);
  --playground-code-variable-color: rgb(203, 204, 198);
  --playground-code-variable-2-color: rgb(242, 135, 121);
  --playground-code-variable-3-color: rgb(92, 207, 230)
}
`,ie`
.playground-theme-base16-dark {
  --playground-code-background: rgb(21, 21, 21);
  --playground-code-color: rgb(224, 224, 224);
  --playground-code-cursor-color: rgb(176, 176, 176);
  --playground-code-selected-background: rgb(48, 48, 48);
  --playground-code-focused-selected-background: rgb(48, 48, 48);
  --playground-code-activeline-background: rgb(32, 32, 32);
  --playground-code-selection-background: rgba(48, 48, 48, 0.99);
  --playground-code-gutter-background: rgb(21, 21, 21);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(80, 80, 80);
  --playground-code-atom-color: rgb(170, 117, 159);
  --playground-code-attribute-color: rgb(144, 169, 89);
  --playground-code-bracket-color: rgb(224, 224, 224);
  --playground-code-builtin-color: rgb(224, 224, 224);
  --playground-code-comment-color: rgb(143, 85, 54);
  --playground-code-def-color: rgb(210, 132, 69);
  --playground-code-error-color: rgb(176, 176, 176);
  --playground-code-header-color: rgb(224, 224, 224);
  --playground-code-hr-color: rgb(224, 224, 224);
  --playground-code-keyword-color: rgb(172, 65, 66);
  --playground-code-link-color: rgb(170, 117, 159);
  --playground-code-meta-color: rgb(224, 224, 224);
  --playground-code-number-color: rgb(170, 117, 159);
  --playground-code-operator-color: rgb(224, 224, 224);
  --playground-code-property-color: rgb(144, 169, 89);
  --playground-code-qualifier-color: rgb(224, 224, 224);
  --playground-code-quote-color: rgb(224, 224, 224);
  --playground-code-string-color: rgb(244, 191, 117);
  --playground-code-string-2-color: rgb(224, 224, 224);
  --playground-code-tag-color: rgb(172, 65, 66);
  --playground-code-type-color: rgb(224, 224, 224);
  --playground-code-variable-color: rgb(144, 169, 89);
  --playground-code-variable-2-color: rgb(106, 159, 181);
  --playground-code-variable-3-color: rgb(224, 224, 224)
}
`,ie`
.playground-theme-base16-light {
  --playground-code-background: rgb(245, 245, 245);
  --playground-code-color: rgb(32, 32, 32);
  --playground-code-cursor-color: rgb(80, 80, 80);
  --playground-code-selected-background: rgb(224, 224, 224);
  --playground-code-focused-selected-background: rgb(224, 224, 224);
  --playground-code-activeline-background: rgb(221, 220, 220);
  --playground-code-selection-background: rgb(224, 224, 224);
  --playground-code-gutter-background: rgb(245, 245, 245);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(176, 176, 176);
  --playground-code-atom-color: rgb(170, 117, 159);
  --playground-code-attribute-color: rgb(144, 169, 89);
  --playground-code-bracket-color: rgb(32, 32, 32);
  --playground-code-builtin-color: rgb(32, 32, 32);
  --playground-code-comment-color: rgb(143, 85, 54);
  --playground-code-def-color: rgb(210, 132, 69);
  --playground-code-error-color: rgb(80, 80, 80);
  --playground-code-header-color: rgb(32, 32, 32);
  --playground-code-hr-color: rgb(32, 32, 32);
  --playground-code-keyword-color: rgb(172, 65, 66);
  --playground-code-link-color: rgb(170, 117, 159);
  --playground-code-meta-color: rgb(32, 32, 32);
  --playground-code-number-color: rgb(170, 117, 159);
  --playground-code-operator-color: rgb(32, 32, 32);
  --playground-code-property-color: rgb(144, 169, 89);
  --playground-code-qualifier-color: rgb(32, 32, 32);
  --playground-code-quote-color: rgb(32, 32, 32);
  --playground-code-string-color: rgb(244, 191, 117);
  --playground-code-string-2-color: rgb(32, 32, 32);
  --playground-code-tag-color: rgb(172, 65, 66);
  --playground-code-type-color: rgb(32, 32, 32);
  --playground-code-variable-color: rgb(144, 169, 89);
  --playground-code-variable-2-color: rgb(106, 159, 181);
  --playground-code-variable-3-color: rgb(32, 32, 32)
}
`,ie`
.playground-theme-bespin {
  --playground-code-background: rgb(40, 33, 28);
  --playground-code-color: rgb(157, 155, 151);
  --playground-code-cursor-color: rgb(121, 121, 119);
  --playground-code-selected-background: rgb(54, 49, 46);
  --playground-code-focused-selected-background: rgb(54, 49, 46);
  --playground-code-activeline-background: rgb(64, 64, 64);
  --playground-code-gutter-background: rgb(40, 33, 28);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(102, 102, 102);
  --playground-code-atom-color: rgb(155, 133, 157);
  --playground-code-attribute-color: rgb(84, 190, 13);
  --playground-code-bracket-color: rgb(157, 155, 151);
  --playground-code-builtin-color: rgb(157, 155, 151);
  --playground-code-comment-color: rgb(147, 113, 33);
  --playground-code-def-color: rgb(207, 125, 52);
  --playground-code-error-color: rgb(121, 121, 119);
  --playground-code-header-color: rgb(157, 155, 151);
  --playground-code-hr-color: rgb(157, 155, 151);
  --playground-code-keyword-color: rgb(207, 106, 76);
  --playground-code-link-color: rgb(155, 133, 157);
  --playground-code-meta-color: rgb(157, 155, 151);
  --playground-code-number-color: rgb(155, 133, 157);
  --playground-code-operator-color: rgb(157, 155, 151);
  --playground-code-property-color: rgb(84, 190, 13);
  --playground-code-qualifier-color: rgb(157, 155, 151);
  --playground-code-quote-color: rgb(157, 155, 151);
  --playground-code-string-color: rgb(249, 238, 152);
  --playground-code-string-2-color: rgb(157, 155, 151);
  --playground-code-tag-color: rgb(207, 106, 76);
  --playground-code-type-color: rgb(157, 155, 151);
  --playground-code-variable-color: rgb(84, 190, 13);
  --playground-code-variable-2-color: rgb(94, 166, 234);
  --playground-code-variable-3-color: rgb(157, 155, 151)
}
`,ie`
.playground-theme-blackboard {
  --playground-code-background: rgb(12, 16, 33);
  --playground-code-color: rgb(248, 248, 248);
  --playground-code-cursor-color: rgb(167, 167, 167);
  --playground-code-selected-background: rgb(37, 59, 118);
  --playground-code-focused-selected-background: rgb(37, 59, 118);
  --playground-code-activeline-background: rgb(60, 54, 54);
  --playground-code-selection-background: rgba(37, 59, 118, 0.99);
  --playground-code-gutter-background: rgb(12, 16, 33);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(136, 136, 136);
  --playground-code-atom-color: rgb(216, 250, 60);
  --playground-code-attribute-color: rgb(141, 166, 206);
  --playground-code-bracket-color: rgb(248, 248, 248);
  --playground-code-builtin-color: rgb(141, 166, 206);
  --playground-code-comment-color: rgb(174, 174, 174);
  --playground-code-def-color: rgb(141, 166, 206);
  --playground-code-error-color: rgb(248, 248, 248);
  --playground-code-header-color: rgb(255, 100, 0);
  --playground-code-hr-color: rgb(174, 174, 174);
  --playground-code-keyword-color: rgb(251, 222, 45);
  --playground-code-link-color: rgb(141, 166, 206);
  --playground-code-meta-color: rgb(216, 250, 60);
  --playground-code-number-color: rgb(216, 250, 60);
  --playground-code-operator-color: rgb(251, 222, 45);
  --playground-code-property-color: rgb(248, 248, 248);
  --playground-code-qualifier-color: rgb(248, 248, 248);
  --playground-code-quote-color: rgb(248, 248, 248);
  --playground-code-string-color: rgb(97, 206, 60);
  --playground-code-string-2-color: rgb(97, 206, 60);
  --playground-code-tag-color: rgb(141, 166, 206);
  --playground-code-type-color: rgb(248, 248, 248);
  --playground-code-variable-color: rgb(255, 100, 0);
  --playground-code-variable-2-color: rgb(248, 248, 248);
  --playground-code-variable-3-color: rgb(248, 248, 248)
}
`,ie`
.playground-theme-cobalt {
  --playground-code-background: rgb(0, 34, 64);
  --playground-code-color: rgb(255, 255, 255);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(179, 101, 57);
  --playground-code-focused-selected-background: rgb(179, 101, 57);
  --playground-code-activeline-background: rgb(0, 45, 87);
  --playground-code-selection-background: rgba(179, 101, 57, 0.99);
  --playground-code-gutter-background: rgb(0, 34, 64);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(132, 93, 196);
  --playground-code-attribute-color: rgb(255, 128, 225);
  --playground-code-bracket-color: rgb(216, 216, 216);
  --playground-code-builtin-color: rgb(255, 158, 89);
  --playground-code-comment-color: rgb(0, 136, 255);
  --playground-code-def-color: rgb(255, 255, 255);
  --playground-code-error-color: rgb(157, 30, 21);
  --playground-code-header-color: rgb(255, 255, 255);
  --playground-code-hr-color: rgb(255, 255, 255);
  --playground-code-keyword-color: rgb(255, 238, 128);
  --playground-code-link-color: rgb(132, 93, 196);
  --playground-code-meta-color: rgb(255, 157, 0);
  --playground-code-number-color: rgb(255, 128, 225);
  --playground-code-operator-color: rgb(255, 255, 255);
  --playground-code-property-color: rgb(255, 255, 255);
  --playground-code-qualifier-color: rgb(255, 255, 255);
  --playground-code-quote-color: rgb(255, 255, 255);
  --playground-code-string-color: rgb(58, 217, 0);
  --playground-code-string-2-color: rgb(255, 255, 255);
  --playground-code-tag-color: rgb(158, 255, 255);
  --playground-code-type-color: rgb(255, 255, 255);
  --playground-code-variable-color: rgb(255, 255, 255);
  --playground-code-variable-2-color: rgb(158, 255, 255);
  --playground-code-variable-3-color: rgb(255, 255, 255)
}
`,ie`
.playground-theme-colorforth {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-color: rgb(248, 248, 248);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(51, 61, 83);
  --playground-code-focused-selected-background: rgb(51, 61, 83);
  --playground-code-activeline-background: rgb(37, 53, 64);
  --playground-code-gutter-background: rgb(10, 0, 31);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(186, 186, 186);
  --playground-code-atom-color: rgb(96, 96, 96);
  --playground-code-attribute-color: rgb(255, 247, 0);
  --playground-code-bracket-color: rgb(204, 204, 119);
  --playground-code-builtin-color: rgb(0, 217, 90);
  --playground-code-comment-color: rgb(237, 237, 237);
  --playground-code-def-color: rgb(255, 28, 28);
  --playground-code-header-color: rgb(248, 248, 248);
  --playground-code-hr-color: rgb(248, 248, 248);
  --playground-code-keyword-color: rgb(255, 217, 0);
  --playground-code-link-color: rgb(248, 248, 248);
  --playground-code-meta-color: rgb(255, 255, 0);
  --playground-code-number-color: rgb(0, 196, 255);
  --playground-code-operator-color: rgb(248, 248, 248);
  --playground-code-property-color: rgb(248, 248, 248);
  --playground-code-qualifier-color: rgb(255, 247, 0);
  --playground-code-quote-color: rgb(248, 248, 248);
  --playground-code-string-color: rgb(0, 123, 255);
  --playground-code-string-2-color: rgb(248, 248, 248);
  --playground-code-tag-color: rgb(255, 189, 64);
  --playground-code-type-color: rgb(221, 221, 221);
  --playground-code-variable-color: rgb(115, 255, 0);
  --playground-code-variable-2-color: rgb(238, 238, 238);
  --playground-code-variable-3-color: rgb(221, 221, 221)
}
`,ie`
.playground-theme-darcula {
  --playground-code-background: rgb(43, 43, 43);
  --playground-code-color: rgb(169, 183, 198);
  --playground-code-cursor-color: rgb(169, 183, 198);
  --playground-code-selected-background: rgb(33, 66, 131);
  --playground-code-focused-selected-background: rgb(33, 66, 131);
  --playground-code-activeline-background: rgb(50, 50, 50);
  --playground-code-gutter-background: rgb(49, 51, 53);
  --playground-code-gutter-border-right: 1px solid rgb(49, 51, 53);
  --playground-code-atom-color: rgb(204, 120, 50);
  --playground-code-attribute-color: rgb(104, 151, 187);
  --playground-code-bracket-color: rgb(169, 183, 198);
  --playground-code-builtin-color: rgb(255, 158, 89);
  --playground-code-comment-color: rgb(97, 161, 81);
  --playground-code-def-color: rgb(169, 183, 198);
  --playground-code-error-color: rgb(188, 63, 60);
  --playground-code-header-color: rgb(169, 183, 198);
  --playground-code-hr-color: rgb(169, 183, 198);
  --playground-code-keyword-color: rgb(204, 120, 50);
  --playground-code-link-color: rgb(204, 120, 50);
  --playground-code-meta-color: rgb(187, 181, 41);
  --playground-code-number-color: rgb(104, 151, 187);
  --playground-code-operator-color: rgb(169, 183, 198);
  --playground-code-property-color: rgb(255, 198, 109);
  --playground-code-qualifier-color: rgb(106, 135, 89);
  --playground-code-quote-color: rgb(169, 183, 198);
  --playground-code-string-color: rgb(106, 135, 89);
  --playground-code-string-2-color: rgb(106, 135, 89);
  --playground-code-tag-color: rgb(98, 151, 85);
  --playground-code-type-color: rgb(170, 187, 204);
  --playground-code-variable-color: rgb(169, 183, 198);
  --playground-code-variable-2-color: rgb(169, 183, 198);
  --playground-code-variable-3-color: rgb(152, 118, 170)
}
`,ie`
.playground-theme-dracula {
  --playground-code-background: rgb(40, 42, 54);
  --playground-code-color: rgb(248, 248, 242);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-selected-background: rgba(255, 255, 255, 0.1);
  --playground-code-focused-selected-background: rgba(255, 255, 255, 0.1);
  --playground-code-activeline-background: rgba(255, 255, 255, 0.1);
  --playground-code-selection-background: rgba(255, 255, 255, 0.1);
  --playground-code-gutter-background: rgb(40, 42, 54);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(109, 138, 136);
  --playground-code-atom-color: rgb(189, 147, 249);
  --playground-code-attribute-color: rgb(80, 250, 123);
  --playground-code-bracket-color: rgb(248, 248, 242);
  --playground-code-builtin-color: rgb(80, 250, 123);
  --playground-code-comment-color: rgb(98, 114, 164);
  --playground-code-def-color: rgb(80, 250, 123);
  --playground-code-error-color: rgb(248, 248, 242);
  --playground-code-header-color: rgb(248, 248, 242);
  --playground-code-hr-color: rgb(248, 248, 242);
  --playground-code-keyword-color: rgb(255, 121, 198);
  --playground-code-link-color: rgb(248, 248, 242);
  --playground-code-meta-color: rgb(248, 248, 242);
  --playground-code-number-color: rgb(189, 147, 249);
  --playground-code-operator-color: rgb(255, 121, 198);
  --playground-code-property-color: rgb(102, 217, 239);
  --playground-code-qualifier-color: rgb(80, 250, 123);
  --playground-code-quote-color: rgb(248, 248, 242);
  --playground-code-string-color: rgb(241, 250, 140);
  --playground-code-string-2-color: rgb(241, 250, 140);
  --playground-code-tag-color: rgb(255, 121, 198);
  --playground-code-type-color: rgb(255, 184, 108);
  --playground-code-variable-color: rgb(80, 250, 123);
  --playground-code-variable-2-color: rgb(255, 255, 255);
  --playground-code-variable-3-color: rgb(255, 184, 108)
}
`,ie`
.playground-theme-duotone-dark {
  --playground-code-background: rgb(42, 39, 52);
  --playground-code-color: rgb(108, 103, 131);
  --playground-code-cursor-color: rgb(255, 173, 92);
  --playground-code-selected-background: rgb(84, 81, 103);
  --playground-code-focused-selected-background: rgb(84, 81, 103);
  --playground-code-activeline-background: rgb(54, 51, 66);
  --playground-code-gutter-background: rgb(42, 39, 52);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(84, 81, 103);
  --playground-code-atom-color: rgb(255, 204, 153);
  --playground-code-attribute-color: rgb(255, 204, 153);
  --playground-code-bracket-color: rgb(108, 103, 131);
  --playground-code-builtin-color: rgb(238, 235, 255);
  --playground-code-comment-color: rgb(108, 103, 131);
  --playground-code-def-color: rgb(238, 235, 255);
  --playground-code-header-color: rgb(238, 235, 255);
  --playground-code-hr-color: rgb(255, 204, 153);
  --playground-code-keyword-color: rgb(255, 204, 153);
  --playground-code-link-color: rgb(255, 204, 153);
  --playground-code-meta-color: rgb(108, 103, 131);
  --playground-code-number-color: rgb(255, 204, 153);
  --playground-code-operator-color: rgb(255, 173, 92);
  --playground-code-positive-color: rgb(106, 81, 230);
  --playground-code-property-color: rgb(154, 134, 253);
  --playground-code-qualifier-color: rgb(238, 235, 255);
  --playground-code-quote-color: rgb(255, 204, 153);
  --playground-code-string-color: rgb(255, 184, 112);
  --playground-code-string-2-color: rgb(122, 99, 238);
  --playground-code-tag-color: rgb(238, 235, 255);
  --playground-code-type-color: rgb(122, 99, 238);
  --playground-code-variable-color: rgb(255, 204, 153);
  --playground-code-variable-2-color: rgb(122, 99, 238);
  --playground-code-variable-3-color: rgb(122, 99, 238)
}
`,ie`
.playground-theme-duotone-light {
  --playground-code-background: rgb(250, 248, 245);
  --playground-code-color: rgb(178, 151, 98);
  --playground-code-cursor-color: rgb(147, 171, 220);
  --playground-code-selected-background: rgb(227, 220, 206);
  --playground-code-focused-selected-background: rgb(227, 220, 206);
  --playground-code-activeline-background: rgb(227, 220, 206);
  --playground-code-gutter-background: rgb(250, 248, 245);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(205, 196, 177);
  --playground-code-atom-color: rgb(6, 50, 137);
  --playground-code-attribute-color: rgb(6, 50, 137);
  --playground-code-bracket-color: rgb(182, 173, 154);
  --playground-code-builtin-color: rgb(45, 32, 6);
  --playground-code-comment-color: rgb(182, 173, 154);
  --playground-code-def-color: rgb(45, 32, 6);
  --playground-code-header-color: rgb(45, 32, 6);
  --playground-code-hr-color: rgb(178, 151, 98);
  --playground-code-keyword-color: rgb(6, 50, 137);
  --playground-code-link-color: rgb(178, 151, 98);
  --playground-code-meta-color: rgb(178, 151, 98);
  --playground-code-number-color: rgb(6, 50, 137);
  --playground-code-operator-color: rgb(22, 89, 223);
  --playground-code-positive-color: rgb(137, 103, 36);
  --playground-code-property-color: rgb(178, 151, 98);
  --playground-code-qualifier-color: rgb(45, 32, 6);
  --playground-code-quote-color: rgb(6, 50, 137);
  --playground-code-string-color: rgb(22, 89, 223);
  --playground-code-string-2-color: rgb(137, 103, 36);
  --playground-code-tag-color: rgb(45, 32, 6);
  --playground-code-type-color: rgb(137, 103, 36);
  --playground-code-variable-color: rgb(6, 50, 137);
  --playground-code-variable-2-color: rgb(137, 103, 36);
  --playground-code-variable-3-color: rgb(137, 103, 36)
}
`,ie`
.playground-theme-eclipse {
  --playground-code-bracket-color: rgb(204, 204, 119);
  --playground-code-comment-color: rgb(63, 127, 95);
  --playground-code-header-color: rgb(0, 0, 0);
  --playground-code-hr-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(127, 0, 85);
  --playground-code-link-color: rgb(34, 17, 153);
  --playground-code-meta-color: rgb(255, 23, 23);
  --playground-code-quote-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(42, 0, 255);
  --playground-code-type-color: rgb(0, 0, 192);
  --playground-code-variable-2-color: rgb(0, 0, 192);
  --playground-code-variable-3-color: rgb(0, 0, 192)
}
`,ie`
.playground-theme-elegant {
  --playground-code-atom-color: rgb(119, 102, 34);
  --playground-code-attribute-color: rgb(0, 0, 0);
  --playground-code-bracket-color: rgb(0, 0, 0);
  --playground-code-comment-color: rgb(34, 102, 34);
  --playground-code-def-color: rgb(0, 0, 0);
  --playground-code-error-color: rgb(0, 0, 0);
  --playground-code-header-color: rgb(0, 0, 0);
  --playground-code-hr-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(119, 51, 0);
  --playground-code-link-color: rgb(119, 102, 34);
  --playground-code-number-color: rgb(119, 102, 34);
  --playground-code-quote-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(119, 102, 34);
  --playground-code-string-2-color: rgb(0, 0, 0);
  --playground-code-tag-color: rgb(0, 0, 0);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(187, 17, 17);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,ie`
.playground-theme-erlang-dark {
  --playground-code-background: rgb(0, 34, 64);
  --playground-code-color: rgb(255, 255, 255);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(179, 101, 57);
  --playground-code-focused-selected-background: rgb(179, 101, 57);
  --playground-code-activeline-background: rgb(1, 52, 97);
  --playground-code-selection-background: rgba(179, 101, 57, 0.99);
  --playground-code-gutter-background: rgb(0, 34, 64);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(241, 51, 241);
  --playground-code-attribute-color: rgb(255, 128, 225);
  --playground-code-bracket-color: rgb(255, 157, 0);
  --playground-code-builtin-color: rgb(238, 170, 170);
  --playground-code-comment-color: rgb(119, 119, 255);
  --playground-code-def-color: rgb(238, 119, 170);
  --playground-code-error-color: rgb(157, 30, 21);
  --playground-code-header-color: rgb(255, 255, 255);
  --playground-code-hr-color: rgb(255, 255, 255);
  --playground-code-keyword-color: rgb(255, 238, 128);
  --playground-code-link-color: rgb(255, 255, 255);
  --playground-code-meta-color: rgb(80, 254, 254);
  --playground-code-number-color: rgb(255, 208, 208);
  --playground-code-operator-color: rgb(221, 85, 85);
  --playground-code-property-color: rgb(204, 204, 204);
  --playground-code-qualifier-color: rgb(204, 204, 204);
  --playground-code-quote-color: rgb(204, 204, 204);
  --playground-code-string-color: rgb(58, 217, 0);
  --playground-code-string-2-color: rgb(204, 204, 204);
  --playground-code-tag-color: rgb(158, 255, 255);
  --playground-code-type-color: rgb(204, 204, 204);
  --playground-code-variable-color: rgb(80, 254, 80);
  --playground-code-variable-2-color: rgb(238, 0, 238);
  --playground-code-variable-3-color: rgb(204, 204, 204)
}
`,ie`
.playground-theme-gruvbox-dark {
  --playground-code-background: rgb(40, 40, 40);
  --playground-code-color: rgb(189, 174, 147);
  --playground-code-cursor-color: rgb(235, 219, 178);
  --playground-code-selected-background: rgb(146, 131, 116);
  --playground-code-focused-selected-background: rgb(146, 131, 116);
  --playground-code-activeline-background: rgb(60, 56, 54);
  --playground-code-gutter-background: rgb(40, 40, 40);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(124, 111, 100);
  --playground-code-atom-color: rgb(211, 134, 155);
  --playground-code-attribute-color: rgb(142, 192, 124);
  --playground-code-bracket-color: rgb(189, 174, 147);
  --playground-code-builtin-color: rgb(254, 128, 25);
  --playground-code-comment-color: rgb(146, 131, 116);
  --playground-code-def-color: rgb(235, 219, 178);
  --playground-code-error-color: rgb(189, 174, 147);
  --playground-code-header-color: rgb(189, 174, 147);
  --playground-code-hr-color: rgb(189, 174, 147);
  --playground-code-keyword-color: rgb(248, 73, 52);
  --playground-code-link-color: rgb(189, 174, 147);
  --playground-code-meta-color: rgb(131, 165, 152);
  --playground-code-number-color: rgb(211, 134, 155);
  --playground-code-operator-color: rgb(235, 219, 178);
  --playground-code-property-color: rgb(235, 219, 178);
  --playground-code-qualifier-color: rgb(142, 192, 124);
  --playground-code-quote-color: rgb(189, 174, 147);
  --playground-code-string-color: rgb(184, 187, 38);
  --playground-code-string-2-color: rgb(142, 192, 124);
  --playground-code-tag-color: rgb(254, 128, 25);
  --playground-code-type-color: rgb(250, 189, 47);
  --playground-code-variable-color: rgb(235, 219, 178);
  --playground-code-variable-2-color: rgb(235, 219, 178);
  --playground-code-variable-3-color: rgb(250, 189, 47)
}
`,ie`
.playground-theme-hopscotch {
  --playground-code-background: rgb(50, 41, 49);
  --playground-code-color: rgb(213, 211, 213);
  --playground-code-cursor-color: rgb(152, 148, 152);
  --playground-code-selected-background: rgb(67, 59, 66);
  --playground-code-focused-selected-background: rgb(67, 59, 66);
  --playground-code-activeline-background: rgb(48, 32, 32);
  --playground-code-gutter-background: rgb(50, 41, 49);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(121, 115, 121);
  --playground-code-atom-color: rgb(200, 94, 124);
  --playground-code-attribute-color: rgb(143, 193, 62);
  --playground-code-bracket-color: rgb(213, 211, 213);
  --playground-code-builtin-color: rgb(213, 211, 213);
  --playground-code-comment-color: rgb(179, 53, 8);
  --playground-code-def-color: rgb(253, 139, 25);
  --playground-code-error-color: rgb(152, 148, 152);
  --playground-code-header-color: rgb(213, 211, 213);
  --playground-code-hr-color: rgb(213, 211, 213);
  --playground-code-keyword-color: rgb(221, 70, 76);
  --playground-code-link-color: rgb(200, 94, 124);
  --playground-code-meta-color: rgb(213, 211, 213);
  --playground-code-number-color: rgb(200, 94, 124);
  --playground-code-operator-color: rgb(213, 211, 213);
  --playground-code-property-color: rgb(143, 193, 62);
  --playground-code-qualifier-color: rgb(213, 211, 213);
  --playground-code-quote-color: rgb(213, 211, 213);
  --playground-code-string-color: rgb(253, 204, 89);
  --playground-code-string-2-color: rgb(213, 211, 213);
  --playground-code-tag-color: rgb(221, 70, 76);
  --playground-code-type-color: rgb(213, 211, 213);
  --playground-code-variable-color: rgb(143, 193, 62);
  --playground-code-variable-2-color: rgb(18, 144, 191);
  --playground-code-variable-3-color: rgb(213, 211, 213)
}
`,ie`
.playground-theme-icecoder {
  --playground-code-background: rgb(29, 29, 27);
  --playground-code-color: rgb(102, 102, 102);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(0, 51, 119);
  --playground-code-focused-selected-background: rgb(0, 51, 119);
  --playground-code-activeline-background: rgb(0, 0, 0);
  --playground-code-gutter-background: rgb(29, 29, 27);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(85, 85, 85);
  --playground-code-atom-color: rgb(225, 199, 110);
  --playground-code-attribute-color: rgb(0, 153, 153);
  --playground-code-bracket-color: rgb(204, 204, 119);
  --playground-code-builtin-color: rgb(33, 78, 123);
  --playground-code-comment-color: rgb(151, 163, 170);
  --playground-code-def-color: rgb(185, 202, 74);
  --playground-code-error-color: rgb(221, 0, 0);
  --playground-code-header-color: rgb(106, 13, 106);
  --playground-code-hr-color: rgb(136, 136, 136);
  --playground-code-keyword-color: rgb(238, 238, 238);
  --playground-code-link-color: rgb(225, 199, 110);
  --playground-code-number-color: rgb(108, 181, 217);
  --playground-code-operator-color: rgb(145, 121, 187);
  --playground-code-property-color: rgb(238, 238, 238);
  --playground-code-quote-color: rgb(24, 103, 24);
  --playground-code-string-color: rgb(185, 202, 74);
  --playground-code-string-2-color: rgb(108, 181, 217);
  --playground-code-tag-color: rgb(232, 232, 232);
  --playground-code-type-color: rgb(249, 96, 44);
  --playground-code-variable-color: rgb(108, 181, 217);
  --playground-code-variable-2-color: rgb(204, 30, 92);
  --playground-code-variable-3-color: rgb(249, 96, 44)
}
`,ie`
.playground-theme-idea {
  --playground-code-activeline-background: rgb(255, 250, 227);
  --playground-code-atom-color: rgb(0, 0, 128);
  --playground-code-attribute-color: rgb(0, 0, 255);
  --playground-code-bracket-color: rgb(204, 204, 119);
  --playground-code-comment-color: rgb(128, 128, 128);
  --playground-code-def-color: rgb(0, 0, 0);
  --playground-code-header-color: rgb(0, 0, 0);
  --playground-code-hr-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(0, 0, 128);
  --playground-code-link-color: rgb(0, 0, 255);
  --playground-code-meta-color: rgb(128, 128, 0);
  --playground-code-number-color: rgb(0, 0, 255);
  --playground-code-quote-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(0, 128, 0);
  --playground-code-string-2-color: rgb(0, 128, 0);
  --playground-code-tag-color: rgb(0, 0, 128);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(0, 0, 0);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,ie`
.playground-theme-isotope {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-color: rgb(224, 224, 224);
  --playground-code-cursor-color: rgb(192, 192, 192);
  --playground-code-selected-background: rgb(64, 64, 64);
  --playground-code-focused-selected-background: rgb(64, 64, 64);
  --playground-code-activeline-background: rgb(32, 32, 32);
  --playground-code-gutter-background: rgb(0, 0, 0);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(128, 128, 128);
  --playground-code-atom-color: rgb(204, 0, 255);
  --playground-code-attribute-color: rgb(51, 255, 0);
  --playground-code-bracket-color: rgb(224, 224, 224);
  --playground-code-builtin-color: rgb(224, 224, 224);
  --playground-code-comment-color: rgb(51, 0, 255);
  --playground-code-def-color: rgb(255, 153, 0);
  --playground-code-error-color: rgb(192, 192, 192);
  --playground-code-header-color: rgb(224, 224, 224);
  --playground-code-hr-color: rgb(224, 224, 224);
  --playground-code-keyword-color: rgb(255, 0, 0);
  --playground-code-link-color: rgb(204, 0, 255);
  --playground-code-meta-color: rgb(224, 224, 224);
  --playground-code-number-color: rgb(204, 0, 255);
  --playground-code-operator-color: rgb(224, 224, 224);
  --playground-code-property-color: rgb(51, 255, 0);
  --playground-code-qualifier-color: rgb(224, 224, 224);
  --playground-code-quote-color: rgb(224, 224, 224);
  --playground-code-string-color: rgb(255, 0, 153);
  --playground-code-string-2-color: rgb(224, 224, 224);
  --playground-code-tag-color: rgb(255, 0, 0);
  --playground-code-type-color: rgb(224, 224, 224);
  --playground-code-variable-color: rgb(51, 255, 0);
  --playground-code-variable-2-color: rgb(0, 102, 255);
  --playground-code-variable-3-color: rgb(224, 224, 224)
}
`,ie`
.playground-theme-lesser-dark {
  --playground-code-background: rgb(38, 38, 38);
  --playground-code-color: rgb(235, 239, 231);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(69, 68, 59);
  --playground-code-focused-selected-background: rgb(69, 68, 59);
  --playground-code-activeline-background: rgb(60, 58, 58);
  --playground-code-selection-background: rgba(69, 68, 59, 0.99);
  --playground-code-gutter-background: rgb(38, 38, 38);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(119, 119, 119);
  --playground-code-atom-color: rgb(194, 180, 112);
  --playground-code-attribute-color: rgb(129, 164, 213);
  --playground-code-bracket-color: rgb(235, 239, 231);
  --playground-code-builtin-color: rgb(255, 158, 89);
  --playground-code-comment-color: rgb(102, 102, 102);
  --playground-code-def-color: rgb(255, 255, 255);
  --playground-code-error-color: rgb(157, 30, 21);
  --playground-code-header-color: rgb(170, 0, 170);
  --playground-code-keyword-color: rgb(89, 158, 255);
  --playground-code-link-color: rgb(112, 112, 230);
  --playground-code-meta-color: rgb(115, 140, 115);
  --playground-code-number-color: rgb(179, 94, 77);
  --playground-code-operator-color: rgb(146, 167, 92);
  --playground-code-property-color: rgb(146, 167, 92);
  --playground-code-string-color: rgb(188, 210, 121);
  --playground-code-tag-color: rgb(102, 145, 153);
  --playground-code-type-color: rgb(255, 255, 255);
  --playground-code-variable-color: rgb(217, 191, 140);
  --playground-code-variable-2-color: rgb(102, 145, 153);
  --playground-code-variable-3-color: rgb(255, 255, 255)
}
`,ie`
.playground-theme-liquibyte {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-color: rgb(255, 255, 255);
  --playground-code-cursor-color: rgb(238, 238, 238);
  --playground-code-selected-background: rgba(255, 0, 0, 0.25);
  --playground-code-focused-selected-background: rgba(255, 0, 0, 0.25);
  --playground-code-activeline-background: rgba(0, 255, 0, 0.15);
  --playground-code-gutter-background: rgb(38, 38, 38);
  --playground-code-gutter-border-right: 1px solid rgb(80, 80, 80);
  --playground-code-linenumber-color: rgb(96, 96, 96);
  --playground-code-atom-color: rgb(191, 48, 48);
  --playground-code-attribute-color: rgb(192, 128, 255);
  --playground-code-bracket-color: rgb(204, 204, 119);
  --playground-code-builtin-color: rgb(255, 175, 64);
  --playground-code-comment-color: rgb(0, 128, 0);
  --playground-code-def-color: rgb(255, 175, 64);
  --playground-code-header-color: rgb(255, 255, 255);
  --playground-code-hr-color: rgb(255, 255, 255);
  --playground-code-keyword-color: rgb(192, 128, 255);
  --playground-code-link-color: rgb(255, 255, 255);
  --playground-code-meta-color: rgb(0, 255, 0);
  --playground-code-number-color: rgb(0, 255, 0);
  --playground-code-operator-color: rgb(255, 255, 255);
  --playground-code-property-color: rgb(153, 153, 153);
  --playground-code-qualifier-color: rgb(255, 247, 0);
  --playground-code-quote-color: rgb(255, 255, 255);
  --playground-code-string-color: rgb(255, 128, 0);
  --playground-code-string-2-color: rgb(255, 255, 255);
  --playground-code-tag-color: rgb(255, 255, 0);
  --playground-code-type-color: rgb(192, 128, 255);
  --playground-code-variable-color: rgb(89, 103, 255);
  --playground-code-variable-2-color: rgb(0, 127, 127);
  --playground-code-variable-3-color: rgb(192, 128, 255)
}
`,ie`
.playground-theme-lucario {
  --playground-code-background: rgb(43, 62, 80);
  --playground-code-color: rgb(248, 248, 242);
  --playground-code-cursor-color: rgb(230, 200, 69);
  --playground-code-selected-background: rgb(36, 52, 67);
  --playground-code-focused-selected-background: rgb(36, 52, 67);
  --playground-code-activeline-background: rgb(36, 52, 67);
  --playground-code-selection-background: rgb(36, 52, 67);
  --playground-code-gutter-background: rgb(43, 62, 80);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(248, 248, 242);
  --playground-code-atom-color: rgb(189, 147, 249);
  --playground-code-attribute-color: rgb(102, 217, 239);
  --playground-code-bracket-color: rgb(248, 248, 242);
  --playground-code-builtin-color: rgb(114, 192, 93);
  --playground-code-comment-color: rgb(92, 152, 205);
  --playground-code-def-color: rgb(114, 192, 93);
  --playground-code-error-color: rgb(248, 248, 242);
  --playground-code-header-color: rgb(248, 248, 242);
  --playground-code-hr-color: rgb(248, 248, 242);
  --playground-code-keyword-color: rgb(255, 101, 65);
  --playground-code-link-color: rgb(248, 248, 242);
  --playground-code-meta-color: rgb(248, 248, 242);
  --playground-code-number-color: rgb(202, 148, 255);
  --playground-code-operator-color: rgb(102, 217, 239);
  --playground-code-property-color: rgb(248, 248, 242);
  --playground-code-qualifier-color: rgb(114, 192, 93);
  --playground-code-quote-color: rgb(248, 248, 242);
  --playground-code-string-color: rgb(230, 219, 116);
  --playground-code-string-2-color: rgb(230, 219, 116);
  --playground-code-tag-color: rgb(255, 101, 65);
  --playground-code-type-color: rgb(255, 184, 108);
  --playground-code-variable-color: rgb(248, 248, 242);
  --playground-code-variable-2-color: rgb(248, 248, 242);
  --playground-code-variable-3-color: rgb(255, 184, 108)
}
`,ie`
.playground-theme-material-darker {
  --playground-code-background: rgb(33, 33, 33);
  --playground-code-color: rgb(238, 255, 255);
  --playground-code-cursor-color: rgb(255, 204, 0);
  --playground-code-selected-background: rgba(97, 97, 97, 0.2);
  --playground-code-focused-selected-background: rgba(97, 97, 97, 0.2);
  --playground-code-activeline-background: rgba(0, 0, 0, 0.5);
  --playground-code-selection-background: rgba(128, 203, 196, 0.2);
  --playground-code-gutter-background: rgb(33, 33, 33);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(84, 84, 84);
  --playground-code-atom-color: rgb(247, 140, 108);
  --playground-code-attribute-color: rgb(199, 146, 234);
  --playground-code-bracket-color: rgb(238, 255, 255);
  --playground-code-builtin-color: rgb(255, 203, 107);
  --playground-code-comment-color: rgb(84, 84, 84);
  --playground-code-def-color: rgb(130, 170, 255);
  --playground-code-error-color: rgb(255, 255, 255);
  --playground-code-header-color: rgb(238, 255, 255);
  --playground-code-hr-color: rgb(238, 255, 255);
  --playground-code-keyword-color: rgb(199, 146, 234);
  --playground-code-link-color: rgb(238, 255, 255);
  --playground-code-meta-color: rgb(255, 203, 107);
  --playground-code-number-color: rgb(255, 83, 112);
  --playground-code-operator-color: rgb(137, 221, 255);
  --playground-code-property-color: rgb(199, 146, 234);
  --playground-code-qualifier-color: rgb(222, 203, 107);
  --playground-code-quote-color: rgb(238, 255, 255);
  --playground-code-string-color: rgb(195, 232, 141);
  --playground-code-string-2-color: rgb(240, 113, 120);
  --playground-code-tag-color: rgb(255, 83, 112);
  --playground-code-type-color: rgb(222, 203, 107);
  --playground-code-variable-color: rgb(240, 113, 120);
  --playground-code-variable-2-color: rgb(238, 255, 255);
  --playground-code-variable-3-color: rgb(222, 203, 107)
}
`,ie`
.playground-theme-material-ocean {
  --playground-code-background: rgb(15, 17, 26);
  --playground-code-color: rgb(143, 147, 162);
  --playground-code-cursor-color: rgb(255, 204, 0);
  --playground-code-selected-background: rgba(113, 124, 180, 0.2);
  --playground-code-focused-selected-background: rgba(113, 124, 180, 0.2);
  --playground-code-activeline-background: rgba(0, 0, 0, 0.5);
  --playground-code-selection-background: rgba(128, 203, 196, 0.2);
  --playground-code-gutter-background: rgb(15, 17, 26);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(70, 75, 93);
  --playground-code-atom-color: rgb(247, 140, 108);
  --playground-code-attribute-color: rgb(199, 146, 234);
  --playground-code-bracket-color: rgb(143, 147, 162);
  --playground-code-builtin-color: rgb(255, 203, 107);
  --playground-code-comment-color: rgb(70, 75, 93);
  --playground-code-def-color: rgb(130, 170, 255);
  --playground-code-error-color: rgb(255, 255, 255);
  --playground-code-header-color: rgb(143, 147, 162);
  --playground-code-hr-color: rgb(143, 147, 162);
  --playground-code-keyword-color: rgb(199, 146, 234);
  --playground-code-link-color: rgb(143, 147, 162);
  --playground-code-meta-color: rgb(255, 203, 107);
  --playground-code-number-color: rgb(255, 83, 112);
  --playground-code-operator-color: rgb(137, 221, 255);
  --playground-code-property-color: rgb(199, 146, 234);
  --playground-code-qualifier-color: rgb(222, 203, 107);
  --playground-code-quote-color: rgb(143, 147, 162);
  --playground-code-string-color: rgb(195, 232, 141);
  --playground-code-string-2-color: rgb(240, 113, 120);
  --playground-code-tag-color: rgb(255, 83, 112);
  --playground-code-type-color: rgb(222, 203, 107);
  --playground-code-variable-color: rgb(240, 113, 120);
  --playground-code-variable-2-color: rgb(238, 255, 255);
  --playground-code-variable-3-color: rgb(222, 203, 107)
}
`,ie`
.playground-theme-material-palenight {
  --playground-code-background: rgb(41, 45, 62);
  --playground-code-color: rgb(166, 172, 205);
  --playground-code-cursor-color: rgb(255, 204, 0);
  --playground-code-selected-background: rgba(113, 124, 180, 0.2);
  --playground-code-focused-selected-background: rgba(113, 124, 180, 0.2);
  --playground-code-activeline-background: rgba(0, 0, 0, 0.5);
  --playground-code-selection-background: rgba(128, 203, 196, 0.2);
  --playground-code-gutter-background: rgb(41, 45, 62);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(103, 110, 149);
  --playground-code-atom-color: rgb(247, 140, 108);
  --playground-code-attribute-color: rgb(199, 146, 234);
  --playground-code-bracket-color: rgb(166, 172, 205);
  --playground-code-builtin-color: rgb(255, 203, 107);
  --playground-code-comment-color: rgb(103, 110, 149);
  --playground-code-def-color: rgb(130, 170, 255);
  --playground-code-error-color: rgb(255, 255, 255);
  --playground-code-header-color: rgb(166, 172, 205);
  --playground-code-hr-color: rgb(166, 172, 205);
  --playground-code-keyword-color: rgb(199, 146, 234);
  --playground-code-link-color: rgb(166, 172, 205);
  --playground-code-meta-color: rgb(255, 203, 107);
  --playground-code-number-color: rgb(255, 83, 112);
  --playground-code-operator-color: rgb(137, 221, 255);
  --playground-code-property-color: rgb(199, 146, 234);
  --playground-code-qualifier-color: rgb(222, 203, 107);
  --playground-code-quote-color: rgb(166, 172, 205);
  --playground-code-string-color: rgb(195, 232, 141);
  --playground-code-string-2-color: rgb(240, 113, 120);
  --playground-code-tag-color: rgb(255, 83, 112);
  --playground-code-type-color: rgb(222, 203, 107);
  --playground-code-variable-color: rgb(240, 113, 120);
  --playground-code-variable-2-color: rgb(238, 255, 255);
  --playground-code-variable-3-color: rgb(222, 203, 107)
}
`,ie`
.playground-theme-material {
  --playground-code-background: rgb(38, 50, 56);
  --playground-code-color: rgb(238, 255, 255);
  --playground-code-cursor-color: rgb(255, 204, 0);
  --playground-code-selected-background: rgba(128, 203, 196, 0.2);
  --playground-code-focused-selected-background: rgba(128, 203, 196, 0.2);
  --playground-code-activeline-background: rgba(0, 0, 0, 0.5);
  --playground-code-selection-background: rgba(128, 203, 196, 0.2);
  --playground-code-gutter-background: rgb(38, 50, 56);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(84, 110, 122);
  --playground-code-atom-color: rgb(247, 140, 108);
  --playground-code-attribute-color: rgb(199, 146, 234);
  --playground-code-bracket-color: rgb(238, 255, 255);
  --playground-code-builtin-color: rgb(255, 203, 107);
  --playground-code-comment-color: rgb(84, 110, 122);
  --playground-code-def-color: rgb(130, 170, 255);
  --playground-code-error-color: rgb(255, 255, 255);
  --playground-code-header-color: rgb(238, 255, 255);
  --playground-code-hr-color: rgb(238, 255, 255);
  --playground-code-keyword-color: rgb(199, 146, 234);
  --playground-code-link-color: rgb(238, 255, 255);
  --playground-code-meta-color: rgb(255, 203, 107);
  --playground-code-number-color: rgb(255, 83, 112);
  --playground-code-operator-color: rgb(137, 221, 255);
  --playground-code-property-color: rgb(199, 146, 234);
  --playground-code-qualifier-color: rgb(222, 203, 107);
  --playground-code-quote-color: rgb(238, 255, 255);
  --playground-code-string-color: rgb(195, 232, 141);
  --playground-code-string-2-color: rgb(240, 113, 120);
  --playground-code-tag-color: rgb(255, 83, 112);
  --playground-code-type-color: rgb(222, 203, 107);
  --playground-code-variable-color: rgb(240, 113, 120);
  --playground-code-variable-2-color: rgb(238, 255, 255);
  --playground-code-variable-3-color: rgb(222, 203, 107)
}
`,ie`
.playground-theme-mbo {
  --playground-code-background: rgb(44, 44, 44);
  --playground-code-color: rgb(255, 255, 236);
  --playground-code-cursor-color: rgb(255, 255, 236);
  --playground-code-selected-background: rgb(113, 108, 98);
  --playground-code-focused-selected-background: rgb(113, 108, 98);
  --playground-code-activeline-background: rgb(73, 75, 65);
  --playground-code-selection-background: rgba(113, 108, 98, 0.99);
  --playground-code-gutter-background: rgb(78, 78, 78);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(218, 218, 218);
  --playground-code-atom-color: rgb(0, 168, 198);
  --playground-code-attribute-color: rgb(157, 223, 233);
  --playground-code-bracket-color: rgb(255, 255, 252);
  --playground-code-builtin-color: rgb(255, 255, 236);
  --playground-code-comment-color: rgb(149, 149, 138);
  --playground-code-def-color: rgb(255, 255, 236);
  --playground-code-error-color: rgb(255, 255, 236);
  --playground-code-header-color: rgb(255, 255, 236);
  --playground-code-hr-color: rgb(255, 255, 236);
  --playground-code-keyword-color: rgb(255, 185, 40);
  --playground-code-link-color: rgb(245, 75, 7);
  --playground-code-meta-color: rgb(255, 255, 236);
  --playground-code-number-color: rgb(0, 168, 198);
  --playground-code-operator-color: rgb(255, 255, 236);
  --playground-code-property-color: rgb(157, 223, 233);
  --playground-code-qualifier-color: rgb(255, 255, 236);
  --playground-code-quote-color: rgb(255, 255, 236);
  --playground-code-string-color: rgb(255, 207, 108);
  --playground-code-string-2-color: rgb(255, 255, 236);
  --playground-code-tag-color: rgb(157, 223, 233);
  --playground-code-type-color: rgb(255, 255, 236);
  --playground-code-variable-color: rgb(255, 255, 236);
  --playground-code-variable-2-color: rgb(0, 168, 198);
  --playground-code-variable-3-color: rgb(255, 255, 236)
}
`,ie`
.playground-theme-mdn-like {
  --playground-code-background: rgb(255, 255, 255) url("data:image/png;base64,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");
  --playground-code-color: rgb(153, 153, 153);
  --playground-code-cursor-color: rgb(34, 34, 34);
  --playground-code-selected-background: rgb(204, 255, 204);
  --playground-code-focused-selected-background: rgb(204, 255, 204);
  --playground-code-activeline-background: rgb(239, 239, 255);
  --playground-code-selection-background: rgb(204, 255, 204);
  --playground-code-gutter-background: rgb(248, 248, 248);
  --playground-code-linenumber-color: rgb(170, 170, 170);
  --playground-code-atom-color: rgb(255, 153, 0);
  --playground-code-attribute-color: rgb(214, 187, 109);
  --playground-code-bracket-color: rgb(153, 153, 153);
  --playground-code-builtin-color: rgb(155, 117, 54);
  --playground-code-comment-color: rgb(119, 119, 119);
  --playground-code-def-color: rgb(0, 119, 170);
  --playground-code-error-color: rgb(153, 153, 153);
  --playground-code-header-color: rgb(255, 100, 0);
  --playground-code-hr-color: rgb(174, 174, 174);
  --playground-code-keyword-color: rgb(98, 98, 255);
  --playground-code-link-color: rgb(173, 147, 97);
  --playground-code-meta-color: rgb(0, 0, 0);
  --playground-code-number-color: rgb(202, 120, 65);
  --playground-code-operator-color: rgb(205, 168, 105);
  --playground-code-property-color: rgb(153, 0, 85);
  --playground-code-qualifier-color: rgb(102, 153, 0);
  --playground-code-quote-color: rgb(153, 153, 153);
  --playground-code-string-color: rgb(0, 119, 170);
  --playground-code-string-2-color: rgb(189, 107, 24);
  --playground-code-tag-color: rgb(102, 153, 0);
  --playground-code-type-color: rgb(0, 119, 170);
  --playground-code-variable-color: rgb(0, 119, 170);
  --playground-code-variable-2-color: rgb(102, 153, 0);
  --playground-code-variable-3-color: rgb(0, 119, 170)
}
`,ie`
.playground-theme-midnight {
  --playground-code-background: rgb(15, 25, 42);
  --playground-code-color: rgb(209, 237, 255);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-selected-background: rgb(49, 77, 103);
  --playground-code-focused-selected-background: rgb(49, 77, 103);
  --playground-code-activeline-background: rgb(37, 53, 64);
  --playground-code-selection-background: rgba(49, 77, 103, 0.99);
  --playground-code-gutter-background: rgb(15, 25, 42);
  --playground-code-gutter-border-right: 1px solid rgb(209, 237, 255);
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(174, 129, 255);
  --playground-code-attribute-color: rgb(166, 226, 46);
  --playground-code-bracket-color: rgb(209, 237, 255);
  --playground-code-builtin-color: rgb(209, 237, 255);
  --playground-code-comment-color: rgb(66, 139, 221);
  --playground-code-def-color: rgb(68, 221, 221);
  --playground-code-error-color: rgb(248, 248, 240);
  --playground-code-header-color: rgb(209, 237, 255);
  --playground-code-hr-color: rgb(209, 237, 255);
  --playground-code-keyword-color: rgb(232, 55, 55);
  --playground-code-link-color: rgb(174, 129, 255);
  --playground-code-meta-color: rgb(209, 237, 255);
  --playground-code-number-color: rgb(209, 237, 255);
  --playground-code-operator-color: rgb(209, 237, 255);
  --playground-code-property-color: rgb(166, 226, 46);
  --playground-code-qualifier-color: rgb(209, 237, 255);
  --playground-code-quote-color: rgb(209, 237, 255);
  --playground-code-string-color: rgb(29, 193, 22);
  --playground-code-string-2-color: rgb(209, 237, 255);
  --playground-code-tag-color: rgb(68, 68, 153);
  --playground-code-type-color: rgb(209, 237, 255);
  --playground-code-variable-color: rgb(255, 170, 62);
  --playground-code-variable-2-color: rgb(255, 170, 62);
  --playground-code-variable-3-color: rgb(209, 237, 255)
}
`,ie`
.playground-theme-monokai {
  --playground-code-background: rgb(39, 40, 34);
  --playground-code-color: rgb(248, 248, 242);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-selected-background: rgb(73, 72, 62);
  --playground-code-focused-selected-background: rgb(73, 72, 62);
  --playground-code-activeline-background: rgb(55, 56, 49);
  --playground-code-selection-background: rgba(73, 72, 62, 0.99);
  --playground-code-gutter-background: rgb(39, 40, 34);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(174, 129, 255);
  --playground-code-attribute-color: rgb(166, 226, 46);
  --playground-code-bracket-color: rgb(248, 248, 242);
  --playground-code-builtin-color: rgb(102, 217, 239);
  --playground-code-comment-color: rgb(117, 113, 94);
  --playground-code-def-color: rgb(253, 151, 31);
  --playground-code-error-color: rgb(248, 248, 240);
  --playground-code-header-color: rgb(174, 129, 255);
  --playground-code-hr-color: rgb(248, 248, 242);
  --playground-code-keyword-color: rgb(249, 38, 114);
  --playground-code-link-color: rgb(174, 129, 255);
  --playground-code-meta-color: rgb(248, 248, 242);
  --playground-code-number-color: rgb(174, 129, 255);
  --playground-code-operator-color: rgb(248, 248, 242);
  --playground-code-property-color: rgb(166, 226, 46);
  --playground-code-qualifier-color: rgb(248, 248, 242);
  --playground-code-quote-color: rgb(248, 248, 242);
  --playground-code-string-color: rgb(230, 219, 116);
  --playground-code-string-2-color: rgb(248, 248, 242);
  --playground-code-tag-color: rgb(249, 38, 114);
  --playground-code-type-color: rgb(102, 217, 239);
  --playground-code-variable-color: rgb(248, 248, 242);
  --playground-code-variable-2-color: rgb(158, 255, 255);
  --playground-code-variable-3-color: rgb(102, 217, 239)
}
`,ie`
.playground-theme-moxer {
  --playground-code-background: rgb(9, 10, 15);
  --playground-code-color: rgb(142, 149, 180);
  --playground-code-cursor-color: rgb(255, 204, 0);
  --playground-code-selected-background: rgba(128, 203, 196, 0.2);
  --playground-code-focused-selected-background: rgba(128, 203, 196, 0.2);
  --playground-code-activeline-background: rgba(33, 36, 49, 0.5);
  --playground-code-selection-background: rgb(33, 36, 49);
  --playground-code-gutter-background: rgb(9, 10, 15);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(53, 57, 75);
  --playground-code-atom-color: rgb(169, 155, 226);
  --playground-code-attribute-color: rgb(199, 146, 234);
  --playground-code-bracket-color: rgb(142, 149, 180);
  --playground-code-builtin-color: rgb(255, 203, 107);
  --playground-code-comment-color: rgb(63, 68, 90);
  --playground-code-def-color: rgb(245, 223, 165);
  --playground-code-error-color: rgb(255, 255, 255);
  --playground-code-header-color: rgb(142, 149, 180);
  --playground-code-hr-color: rgb(142, 149, 180);
  --playground-code-keyword-color: rgb(212, 108, 108);
  --playground-code-link-color: rgb(142, 149, 180);
  --playground-code-meta-color: rgb(255, 203, 107);
  --playground-code-number-color: rgb(124, 164, 192);
  --playground-code-operator-color: rgb(212, 108, 108);
  --playground-code-property-color: rgb(129, 197, 218);
  --playground-code-qualifier-color: rgb(222, 203, 107);
  --playground-code-quote-color: rgb(142, 149, 180);
  --playground-code-string-color: rgb(178, 228, 174);
  --playground-code-string-2-color: rgb(240, 113, 120);
  --playground-code-tag-color: rgb(255, 83, 112);
  --playground-code-type-color: rgb(222, 203, 107);
  --playground-code-variable-color: rgb(142, 149, 180);
  --playground-code-variable-2-color: rgb(129, 197, 218);
  --playground-code-variable-3-color: rgb(222, 203, 107)
}
`,ie`
.playground-theme-neat {
  --playground-code-atom-color: rgb(51, 170, 51);
  --playground-code-attribute-color: rgb(0, 0, 0);
  --playground-code-bracket-color: rgb(0, 0, 0);
  --playground-code-builtin-color: rgb(0, 119, 119);
  --playground-code-comment-color: rgb(170, 136, 102);
  --playground-code-def-color: rgb(0, 0, 0);
  --playground-code-error-color: rgb(0, 0, 0);
  --playground-code-header-color: rgb(0, 0, 0);
  --playground-code-hr-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(0, 0, 255);
  --playground-code-link-color: rgb(51, 170, 51);
  --playground-code-number-color: rgb(51, 170, 51);
  --playground-code-qualifier-color: rgb(0, 0, 0);
  --playground-code-quote-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(170, 34, 34);
  --playground-code-string-2-color: rgb(0, 0, 0);
  --playground-code-tag-color: rgb(0, 0, 0);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(0, 0, 0);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,ie`
.playground-theme-neo {
  --playground-code-color: rgb(46, 56, 60);
  --playground-code-cursor-color: rgb(46, 56, 60);
  --playground-code-gutter-background: rgba(0, 0, 0, 0);
  --playground-code-gutter-border-right: 10px solid rgba(0, 0, 0, 0);
  --playground-code-linenumber-color: rgb(224, 226, 229);
  --playground-code-atom-color: rgb(117, 67, 138);
  --playground-code-attribute-color: rgb(46, 56, 60);
  --playground-code-bracket-color: rgb(46, 56, 60);
  --playground-code-builtin-color: rgb(46, 56, 60);
  --playground-code-comment-color: rgb(117, 120, 123);
  --playground-code-def-color: rgb(46, 56, 60);
  --playground-code-error-color: rgb(46, 56, 60);
  --playground-code-header-color: rgb(46, 56, 60);
  --playground-code-hr-color: rgb(46, 56, 60);
  --playground-code-keyword-color: rgb(29, 117, 179);
  --playground-code-link-color: rgb(46, 56, 60);
  --playground-code-meta-color: rgb(46, 56, 60);
  --playground-code-number-color: rgb(117, 67, 138);
  --playground-code-operator-color: rgb(46, 56, 60);
  --playground-code-property-color: rgb(29, 117, 179);
  --playground-code-qualifier-color: rgb(4, 125, 101);
  --playground-code-quote-color: rgb(46, 56, 60);
  --playground-code-string-color: rgb(179, 94, 20);
  --playground-code-string-2-color: rgb(46, 56, 60);
  --playground-code-tag-color: rgb(156, 51, 40);
  --playground-code-type-color: rgb(46, 56, 60);
  --playground-code-variable-color: rgb(4, 125, 101);
  --playground-code-variable-2-color: rgb(46, 56, 60);
  --playground-code-variable-3-color: rgb(46, 56, 60)
}
`,ie`
.playground-theme-night {
  --playground-code-background: rgb(10, 0, 31);
  --playground-code-color: rgb(248, 248, 248);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(68, 68, 119);
  --playground-code-focused-selected-background: rgb(68, 68, 119);
  --playground-code-activeline-background: rgb(28, 0, 90);
  --playground-code-selection-background: rgba(68, 68, 119, 0.99);
  --playground-code-gutter-background: rgb(10, 0, 31);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(248, 248, 248);
  --playground-code-atom-color: rgb(132, 93, 196);
  --playground-code-attribute-color: rgb(255, 213, 0);
  --playground-code-bracket-color: rgb(141, 166, 206);
  --playground-code-builtin-color: rgb(255, 158, 89);
  --playground-code-comment-color: rgb(137, 0, 209);
  --playground-code-def-color: rgb(255, 255, 255);
  --playground-code-error-color: rgb(157, 30, 21);
  --playground-code-header-color: rgb(248, 248, 248);
  --playground-code-hr-color: rgb(248, 248, 248);
  --playground-code-keyword-color: rgb(89, 158, 255);
  --playground-code-link-color: rgb(132, 93, 196);
  --playground-code-meta-color: rgb(118, 120, 226);
  --playground-code-number-color: rgb(255, 213, 0);
  --playground-code-operator-color: rgb(248, 248, 248);
  --playground-code-property-color: rgb(248, 248, 248);
  --playground-code-qualifier-color: rgb(248, 248, 248);
  --playground-code-quote-color: rgb(248, 248, 248);
  --playground-code-string-color: rgb(55, 241, 74);
  --playground-code-string-2-color: rgb(248, 248, 248);
  --playground-code-tag-color: rgb(153, 178, 255);
  --playground-code-type-color: rgb(255, 255, 255);
  --playground-code-variable-color: rgb(248, 248, 248);
  --playground-code-variable-2-color: rgb(153, 178, 255);
  --playground-code-variable-3-color: rgb(255, 255, 255)
}
`,ie`
.playground-theme-nord {
  --playground-code-background: rgb(46, 52, 64);
  --playground-code-color: rgb(216, 222, 233);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-selected-background: rgb(67, 76, 94);
  --playground-code-focused-selected-background: rgb(67, 76, 94);
  --playground-code-activeline-background: rgb(59, 66, 82);
  --playground-code-selection-background: rgb(59, 66, 82);
  --playground-code-gutter-background: rgb(46, 52, 64);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(76, 86, 106);
  --playground-code-atom-color: rgb(180, 142, 173);
  --playground-code-attribute-color: rgb(143, 188, 187);
  --playground-code-bracket-color: rgb(129, 161, 193);
  --playground-code-builtin-color: rgb(129, 161, 193);
  --playground-code-comment-color: rgb(76, 86, 106);
  --playground-code-def-color: rgb(143, 188, 187);
  --playground-code-error-color: rgb(248, 248, 240);
  --playground-code-header-color: rgb(180, 142, 173);
  --playground-code-hr-color: rgb(216, 222, 233);
  --playground-code-keyword-color: rgb(129, 161, 193);
  --playground-code-link-color: rgb(180, 142, 173);
  --playground-code-meta-color: rgb(216, 222, 233);
  --playground-code-number-color: rgb(180, 142, 173);
  --playground-code-operator-color: rgb(216, 222, 233);
  --playground-code-property-color: rgb(143, 188, 187);
  --playground-code-qualifier-color: rgb(216, 222, 233);
  --playground-code-quote-color: rgb(216, 222, 233);
  --playground-code-string-color: rgb(163, 190, 140);
  --playground-code-string-2-color: rgb(216, 222, 233);
  --playground-code-tag-color: rgb(191, 97, 106);
  --playground-code-type-color: rgb(216, 222, 233);
  --playground-code-variable-color: rgb(216, 222, 233);
  --playground-code-variable-2-color: rgb(216, 222, 233);
  --playground-code-variable-3-color: rgb(216, 222, 233)
}
`,ie`
.playground-theme-oceanic-next {
  --playground-code-background: rgb(48, 65, 72);
  --playground-code-color: rgb(248, 248, 242);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-selected-background: rgba(101, 115, 126, 0.33);
  --playground-code-focused-selected-background: rgba(101, 115, 126, 0.33);
  --playground-code-activeline-background: rgba(101, 115, 126, 0.33);
  --playground-code-selection-background: rgba(101, 115, 126, 0.33);
  --playground-code-gutter-background: rgb(48, 65, 72);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(197, 148, 197);
  --playground-code-attribute-color: rgb(197, 148, 197);
  --playground-code-bracket-color: rgb(95, 179, 179);
  --playground-code-builtin-color: rgb(102, 217, 239);
  --playground-code-comment-color: rgb(101, 115, 126);
  --playground-code-def-color: rgb(102, 153, 204);
  --playground-code-error-color: rgb(248, 248, 240);
  --playground-code-header-color: rgb(197, 148, 197);
  --playground-code-hr-color: rgb(248, 248, 242);
  --playground-code-keyword-color: rgb(197, 148, 197);
  --playground-code-link-color: rgb(197, 148, 197);
  --playground-code-meta-color: rgb(248, 248, 242);
  --playground-code-number-color: rgb(249, 145, 87);
  --playground-code-operator-color: rgb(248, 248, 242);
  --playground-code-property-color: rgb(153, 199, 148);
  --playground-code-qualifier-color: rgb(248, 248, 242);
  --playground-code-quote-color: rgb(248, 248, 242);
  --playground-code-string-color: rgb(153, 199, 148);
  --playground-code-string-2-color: rgb(248, 248, 242);
  --playground-code-tag-color: rgb(197, 148, 197);
  --playground-code-type-color: rgb(248, 248, 242);
  --playground-code-variable-color: rgb(248, 248, 242);
  --playground-code-variable-2-color: rgb(248, 248, 242);
  --playground-code-variable-3-color: rgb(248, 248, 242)
}
`,ie`
.playground-theme-panda-syntax {
  --playground-code-background: rgb(41, 42, 43);
  --playground-code-color: rgb(230, 230, 230);
  --playground-code-cursor-color: rgb(255, 44, 109);
  --playground-code-selected-background: rgb(255, 255, 255);
  --playground-code-focused-selected-background: rgb(255, 255, 255);
  --playground-code-activeline-background: rgba(99, 123, 156, 0.1);
  --playground-code-gutter-background: rgb(41, 42, 43);
  --playground-code-gutter-border-right: 1px solid rgba(255, 255, 255, 0.1);
  --playground-code-linenumber-color: rgb(230, 230, 230);
  --playground-code-atom-color: rgb(255, 44, 109);
  --playground-code-attribute-color: rgb(255, 184, 108);
  --playground-code-bracket-color: rgb(230, 230, 230);
  --playground-code-builtin-color: rgb(230, 230, 230);
  --playground-code-comment-color: rgb(103, 107, 121);
  --playground-code-def-color: rgb(230, 230, 230);
  --playground-code-error-color: rgb(230, 230, 230);
  --playground-code-header-color: rgb(230, 230, 230);
  --playground-code-hr-color: rgb(230, 230, 230);
  --playground-code-keyword-color: rgb(255, 117, 181);
  --playground-code-link-color: rgb(230, 230, 230);
  --playground-code-meta-color: rgb(176, 132, 235);
  --playground-code-number-color: rgb(255, 184, 108);
  --playground-code-operator-color: rgb(243, 243, 243);
  --playground-code-property-color: rgb(243, 243, 243);
  --playground-code-qualifier-color: rgb(230, 230, 230);
  --playground-code-quote-color: rgb(230, 230, 230);
  --playground-code-string-color: rgb(25, 249, 216);
  --playground-code-string-2-color: rgb(255, 184, 108);
  --playground-code-tag-color: rgb(255, 44, 109);
  --playground-code-type-color: rgb(255, 154, 193);
  --playground-code-variable-color: rgb(255, 184, 108);
  --playground-code-variable-2-color: rgb(255, 154, 193);
  --playground-code-variable-3-color: rgb(255, 154, 193)
}
`,ie`
.playground-theme-paraiso-dark {
  --playground-code-background: rgb(47, 30, 46);
  --playground-code-color: rgb(185, 182, 176);
  --playground-code-cursor-color: rgb(141, 134, 135);
  --playground-code-selected-background: rgb(65, 50, 63);
  --playground-code-focused-selected-background: rgb(65, 50, 63);
  --playground-code-activeline-background: rgb(77, 52, 74);
  --playground-code-selection-background: rgba(65, 50, 63, 0.99);
  --playground-code-gutter-background: rgb(47, 30, 46);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(119, 110, 113);
  --playground-code-atom-color: rgb(129, 91, 164);
  --playground-code-attribute-color: rgb(72, 182, 133);
  --playground-code-bracket-color: rgb(185, 182, 176);
  --playground-code-builtin-color: rgb(185, 182, 176);
  --playground-code-comment-color: rgb(233, 107, 168);
  --playground-code-def-color: rgb(249, 155, 21);
  --playground-code-error-color: rgb(141, 134, 135);
  --playground-code-header-color: rgb(185, 182, 176);
  --playground-code-hr-color: rgb(185, 182, 176);
  --playground-code-keyword-color: rgb(239, 97, 85);
  --playground-code-link-color: rgb(129, 91, 164);
  --playground-code-meta-color: rgb(185, 182, 176);
  --playground-code-number-color: rgb(129, 91, 164);
  --playground-code-operator-color: rgb(185, 182, 176);
  --playground-code-property-color: rgb(72, 182, 133);
  --playground-code-qualifier-color: rgb(185, 182, 176);
  --playground-code-quote-color: rgb(185, 182, 176);
  --playground-code-string-color: rgb(254, 196, 24);
  --playground-code-string-2-color: rgb(185, 182, 176);
  --playground-code-tag-color: rgb(239, 97, 85);
  --playground-code-type-color: rgb(185, 182, 176);
  --playground-code-variable-color: rgb(72, 182, 133);
  --playground-code-variable-2-color: rgb(6, 182, 239);
  --playground-code-variable-3-color: rgb(185, 182, 176)
}
`,ie`
.playground-theme-paraiso-light {
  --playground-code-background: rgb(231, 233, 219);
  --playground-code-color: rgb(65, 50, 63);
  --playground-code-cursor-color: rgb(119, 110, 113);
  --playground-code-selected-background: rgb(185, 182, 176);
  --playground-code-focused-selected-background: rgb(185, 182, 176);
  --playground-code-activeline-background: rgb(207, 209, 196);
  --playground-code-selection-background: rgb(185, 182, 176);
  --playground-code-gutter-background: rgb(231, 233, 219);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(141, 134, 135);
  --playground-code-atom-color: rgb(129, 91, 164);
  --playground-code-attribute-color: rgb(72, 182, 133);
  --playground-code-bracket-color: rgb(65, 50, 63);
  --playground-code-builtin-color: rgb(65, 50, 63);
  --playground-code-comment-color: rgb(233, 107, 168);
  --playground-code-def-color: rgb(249, 155, 21);
  --playground-code-error-color: rgb(119, 110, 113);
  --playground-code-header-color: rgb(65, 50, 63);
  --playground-code-hr-color: rgb(65, 50, 63);
  --playground-code-keyword-color: rgb(239, 97, 85);
  --playground-code-link-color: rgb(129, 91, 164);
  --playground-code-meta-color: rgb(65, 50, 63);
  --playground-code-number-color: rgb(129, 91, 164);
  --playground-code-operator-color: rgb(65, 50, 63);
  --playground-code-property-color: rgb(72, 182, 133);
  --playground-code-qualifier-color: rgb(65, 50, 63);
  --playground-code-quote-color: rgb(65, 50, 63);
  --playground-code-string-color: rgb(254, 196, 24);
  --playground-code-string-2-color: rgb(65, 50, 63);
  --playground-code-tag-color: rgb(239, 97, 85);
  --playground-code-type-color: rgb(65, 50, 63);
  --playground-code-variable-color: rgb(72, 182, 133);
  --playground-code-variable-2-color: rgb(6, 182, 239);
  --playground-code-variable-3-color: rgb(65, 50, 63)
}
`,ie`
.playground-theme-pastel-on-dark {
  --playground-code-background: rgb(44, 40, 39);
  --playground-code-color: rgb(143, 147, 143);
  --playground-code-cursor-color: rgb(167, 167, 167);
  --playground-code-selected-background: rgba(221, 240, 255, 0.2);
  --playground-code-focused-selected-background: rgba(221, 240, 255, 0.2);
  --playground-code-activeline-background: rgba(255, 255, 255, 0.03);
  --playground-code-selection-background: rgba(221, 240, 255, 0.2);
  --playground-code-gutter-background: rgb(52, 48, 47);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(143, 147, 143);
  --playground-code-atom-color: rgb(222, 142, 48);
  --playground-code-attribute-color: rgb(166, 226, 46);
  --playground-code-bracket-color: rgb(248, 248, 242);
  --playground-code-builtin-color: rgb(193, 193, 68);
  --playground-code-comment-color: rgb(166, 198, 255);
  --playground-code-def-color: rgb(117, 122, 216);
  --playground-code-error-color: rgb(248, 248, 240);
  --playground-code-header-color: rgb(143, 147, 143);
  --playground-code-hr-color: rgb(143, 147, 143);
  --playground-code-keyword-color: rgb(174, 178, 248);
  --playground-code-link-color: rgb(174, 129, 255);
  --playground-code-meta-color: rgb(143, 147, 143);
  --playground-code-number-color: rgb(204, 204, 204);
  --playground-code-operator-color: rgb(143, 147, 143);
  --playground-code-property-color: rgb(143, 147, 143);
  --playground-code-qualifier-color: rgb(193, 193, 68);
  --playground-code-quote-color: rgb(143, 147, 143);
  --playground-code-string-color: rgb(102, 169, 104);
  --playground-code-string-2-color: rgb(143, 147, 143);
  --playground-code-tag-color: rgb(193, 193, 68);
  --playground-code-type-color: rgb(222, 142, 48);
  --playground-code-variable-color: rgb(174, 178, 248);
  --playground-code-variable-2-color: rgb(190, 191, 85);
  --playground-code-variable-3-color: rgb(222, 142, 48)
}
`,ie`
.playground-theme-railscasts {
  --playground-code-background: rgb(43, 43, 43);
  --playground-code-color: rgb(244, 241, 237);
  --playground-code-cursor-color: rgb(212, 207, 201);
  --playground-code-selected-background: rgb(39, 41, 53);
  --playground-code-focused-selected-background: rgb(39, 41, 53);
  --playground-code-activeline-background: rgb(48, 48, 64);
  --playground-code-gutter-background: rgb(43, 43, 43);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(90, 100, 126);
  --playground-code-atom-color: rgb(182, 179, 235);
  --playground-code-attribute-color: rgb(165, 194, 97);
  --playground-code-bracket-color: rgb(244, 241, 237);
  --playground-code-builtin-color: rgb(244, 241, 237);
  --playground-code-comment-color: rgb(188, 148, 88);
  --playground-code-def-color: rgb(204, 120, 51);
  --playground-code-error-color: rgb(212, 207, 201);
  --playground-code-header-color: rgb(244, 241, 237);
  --playground-code-hr-color: rgb(244, 241, 237);
  --playground-code-keyword-color: rgb(218, 73, 57);
  --playground-code-link-color: rgb(182, 179, 235);
  --playground-code-meta-color: rgb(244, 241, 237);
  --playground-code-number-color: rgb(182, 179, 235);
  --playground-code-operator-color: rgb(244, 241, 237);
  --playground-code-property-color: rgb(165, 194, 97);
  --playground-code-qualifier-color: rgb(244, 241, 237);
  --playground-code-quote-color: rgb(244, 241, 237);
  --playground-code-string-color: rgb(255, 198, 109);
  --playground-code-string-2-color: rgb(244, 241, 237);
  --playground-code-tag-color: rgb(218, 73, 57);
  --playground-code-type-color: rgb(244, 241, 237);
  --playground-code-variable-color: rgb(165, 194, 97);
  --playground-code-variable-2-color: rgb(109, 156, 190);
  --playground-code-variable-3-color: rgb(244, 241, 237)
}
`,ie`
.playground-theme-rubyblue {
  --playground-code-background: rgb(17, 36, 53);
  --playground-code-color: rgb(255, 255, 255);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(56, 86, 111);
  --playground-code-focused-selected-background: rgb(56, 86, 111);
  --playground-code-activeline-background: rgb(23, 48, 71);
  --playground-code-selection-background: rgba(56, 86, 111, 0.99);
  --playground-code-gutter-background: rgb(31, 70, 97);
  --playground-code-gutter-border-right: 7px solid rgb(62, 112, 135);
  --playground-code-linenumber-color: rgb(255, 255, 255);
  --playground-code-atom-color: rgb(244, 194, 11);
  --playground-code-attribute-color: rgb(130, 198, 224);
  --playground-code-bracket-color: rgb(255, 0, 255);
  --playground-code-builtin-color: rgb(255, 157, 0);
  --playground-code-comment-color: rgb(153, 153, 153);
  --playground-code-def-color: rgb(255, 255, 255);
  --playground-code-error-color: rgb(175, 32, 24);
  --playground-code-header-color: rgb(255, 255, 255);
  --playground-code-hr-color: rgb(255, 255, 255);
  --playground-code-keyword-color: rgb(255, 0, 255);
  --playground-code-link-color: rgb(244, 194, 11);
  --playground-code-meta-color: rgb(255, 0, 255);
  --playground-code-number-color: rgb(130, 198, 224);
  --playground-code-operator-color: rgb(255, 255, 255);
  --playground-code-property-color: rgb(255, 255, 255);
  --playground-code-qualifier-color: rgb(255, 255, 255);
  --playground-code-quote-color: rgb(255, 255, 255);
  --playground-code-string-color: rgb(240, 128, 71);
  --playground-code-string-2-color: rgb(255, 255, 255);
  --playground-code-tag-color: rgb(123, 216, 39);
  --playground-code-type-color: rgb(255, 255, 255);
  --playground-code-variable-color: rgb(255, 255, 255);
  --playground-code-variable-2-color: rgb(123, 216, 39);
  --playground-code-variable-3-color: rgb(255, 255, 255)
}
`,ie`
.playground-theme-seti {
  --playground-code-background: rgb(21, 23, 24);
  --playground-code-color: rgb(207, 210, 209);
  --playground-code-cursor-color: rgb(248, 248, 240);
  --playground-code-activeline-background: rgb(16, 18, 19);
  --playground-code-selection-background: rgba(255, 255, 255, 0.1);
  --playground-code-gutter-background: rgb(14, 17, 18);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(109, 138, 136);
  --playground-code-atom-color: rgb(205, 63, 69);
  --playground-code-attribute-color: rgb(159, 202, 86);
  --playground-code-bracket-color: rgb(207, 210, 209);
  --playground-code-builtin-color: rgb(159, 202, 86);
  --playground-code-comment-color: rgb(65, 83, 91);
  --playground-code-def-color: rgb(85, 181, 219);
  --playground-code-error-color: rgb(207, 210, 209);
  --playground-code-header-color: rgb(207, 210, 209);
  --playground-code-hr-color: rgb(207, 210, 209);
  --playground-code-keyword-color: rgb(230, 205, 105);
  --playground-code-link-color: rgb(207, 210, 209);
  --playground-code-meta-color: rgb(85, 181, 219);
  --playground-code-number-color: rgb(205, 63, 69);
  --playground-code-operator-color: rgb(159, 202, 86);
  --playground-code-property-color: rgb(160, 116, 196);
  --playground-code-qualifier-color: rgb(159, 202, 86);
  --playground-code-quote-color: rgb(207, 210, 209);
  --playground-code-string-color: rgb(85, 181, 219);
  --playground-code-string-2-color: rgb(85, 181, 219);
  --playground-code-tag-color: rgb(85, 181, 219);
  --playground-code-type-color: rgb(159, 202, 86);
  --playground-code-variable-color: rgb(85, 181, 219);
  --playground-code-variable-2-color: rgb(160, 116, 196);
  --playground-code-variable-3-color: rgb(159, 202, 86)
}
`,ie`
.playground-theme-shadowfox {
  --playground-code-background: rgb(42, 42, 46);
  --playground-code-color: rgb(177, 177, 179);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(53, 59, 72);
  --playground-code-focused-selected-background: rgb(53, 59, 72);
  --playground-code-activeline-background: rgba(185, 215, 253, 0.15);
  --playground-code-selection-background: rgb(53, 59, 72);
  --playground-code-gutter-background: rgb(12, 12, 13);
  --playground-code-gutter-border-right: 1px solid rgb(12, 12, 13);
  --playground-code-linenumber-color: rgb(147, 147, 147);
  --playground-code-atom-color: rgb(255, 125, 233);
  --playground-code-attribute-color: rgb(255, 125, 233);
  --playground-code-bracket-color: rgb(117, 191, 255);
  --playground-code-builtin-color: rgb(255, 125, 233);
  --playground-code-comment-color: rgb(147, 147, 147);
  --playground-code-def-color: rgb(117, 191, 255);
  --playground-code-error-color: rgb(255, 125, 233);
  --playground-code-header-color: rgb(117, 191, 255);
  --playground-code-hr-color: rgb(147, 147, 147);
  --playground-code-keyword-color: rgb(255, 125, 233);
  --playground-code-link-color: rgb(115, 115, 115);
  --playground-code-meta-color: rgb(147, 147, 147);
  --playground-code-number-color: rgb(107, 137, 255);
  --playground-code-operator-color: rgb(177, 177, 179);
  --playground-code-property-color: rgb(134, 222, 116);
  --playground-code-qualifier-color: rgb(117, 191, 255);
  --playground-code-quote-color: rgb(255, 125, 233);
  --playground-code-string-color: rgb(107, 137, 255);
  --playground-code-string-2-color: rgb(107, 137, 255);
  --playground-code-tag-color: rgb(117, 191, 255);
  --playground-code-type-color: rgb(177, 177, 179);
  --playground-code-variable-color: rgb(185, 142, 255);
  --playground-code-variable-2-color: rgb(117, 191, 255);
  --playground-code-variable-3-color: rgb(215, 215, 219)
}
`,ie`
.playground-theme-solarized {
  --playground-code-cursor-color: rgb(129, 144, 144);
  --playground-code-gutter-border-right: 0px;
  --playground-code-atom-color: rgb(211, 54, 130);
  --playground-code-attribute-color: rgb(42, 161, 152);
  --playground-code-bracket-color: rgb(203, 75, 22);
  --playground-code-builtin-color: rgb(211, 54, 130);
  --playground-code-comment-color: rgb(88, 110, 117);
  --playground-code-def-color: rgb(42, 161, 152);
  --playground-code-error-color: rgb(88, 110, 117);
  --playground-code-header-color: rgb(88, 110, 117);
  --playground-code-hr-color: rgba(0, 0, 0, 0);
  --playground-code-invalidchar-color: rgb(88, 110, 117);
  --playground-code-keyword-color: rgb(203, 75, 22);
  --playground-code-link-color: rgb(147, 161, 161);
  --playground-code-meta-color: rgb(133, 153, 0);
  --playground-code-number-color: rgb(211, 54, 130);
  --playground-code-operator-color: rgb(108, 113, 196);
  --playground-code-property-color: rgb(42, 161, 152);
  --playground-code-qualifier-color: rgb(181, 137, 0);
  --playground-code-quote-color: rgb(147, 161, 161);
  --playground-code-string-color: rgb(133, 153, 0);
  --playground-code-string-2-color: rgb(181, 137, 0);
  --playground-code-tag-color: rgb(147, 161, 161);
  --playground-code-type-color: rgb(108, 113, 196);
  --playground-code-variable-color: rgb(131, 148, 150);
  --playground-code-variable-2-color: rgb(181, 137, 0);
  --playground-code-variable-3-color: rgb(108, 113, 196)
}
`,ie`
.playground-theme-ssms {
  --playground-code-selected-background: rgb(173, 214, 255);
  --playground-code-focused-selected-background: rgb(173, 214, 255);
  --playground-code-activeline-background: rgb(255, 255, 255);
  --playground-code-gutter-background: rgb(255, 255, 255);
  --playground-code-gutter-border-right: 3px solid rgb(255, 238, 98);
  --playground-code-linenumber-color: rgb(0, 128, 128);
  --playground-code-atom-color: rgb(169, 169, 169);
  --playground-code-attribute-color: rgb(0, 0, 0);
  --playground-code-bracket-color: rgb(169, 169, 169);
  --playground-code-builtin-color: rgb(0, 0, 0);
  --playground-code-comment-color: rgb(0, 100, 0);
  --playground-code-def-color: rgb(0, 0, 0);
  --playground-code-error-color: rgb(0, 0, 0);
  --playground-code-header-color: rgb(0, 0, 0);
  --playground-code-hr-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(0, 0, 255);
  --playground-code-link-color: rgb(0, 0, 0);
  --playground-code-meta-color: rgb(0, 0, 0);
  --playground-code-number-color: rgb(0, 0, 0);
  --playground-code-operator-color: rgb(169, 169, 169);
  --playground-code-qualifier-color: rgb(0, 0, 0);
  --playground-code-quote-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(255, 0, 0);
  --playground-code-string-2-color: rgb(255, 0, 255);
  --playground-code-tag-color: rgb(0, 0, 0);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(0, 0, 0);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,ie`
.playground-theme-the-matrix {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-color: rgb(0, 255, 0);
  --playground-code-cursor-color: rgb(0, 255, 0);
  --playground-code-selected-background: rgb(45, 45, 45);
  --playground-code-focused-selected-background: rgb(45, 45, 45);
  --playground-code-activeline-background: rgb(0, 68, 0);
  --playground-code-selection-background: rgba(45, 45, 45, 0.99);
  --playground-code-gutter-background: rgb(0, 102, 0);
  --playground-code-gutter-border-right: 2px solid rgb(0, 255, 0);
  --playground-code-linenumber-color: rgb(255, 255, 255);
  --playground-code-atom-color: rgb(51, 255, 255);
  --playground-code-attribute-color: rgb(255, 247, 0);
  --playground-code-bracket-color: rgb(204, 204, 119);
  --playground-code-comment-color: rgb(204, 204, 204);
  --playground-code-def-color: rgb(153, 153, 204);
  --playground-code-header-color: rgb(0, 255, 0);
  --playground-code-hr-color: rgb(0, 255, 0);
  --playground-code-keyword-color: rgb(0, 136, 3);
  --playground-code-link-color: rgb(0, 255, 0);
  --playground-code-meta-color: rgb(204, 153, 255);
  --playground-code-number-color: rgb(255, 185, 79);
  --playground-code-operator-color: rgb(153, 153, 153);
  --playground-code-property-color: rgb(98, 255, 160);
  --playground-code-qualifier-color: rgb(255, 247, 0);
  --playground-code-quote-color: rgb(0, 255, 0);
  --playground-code-string-color: rgb(51, 153, 204);
  --playground-code-string-2-color: rgb(0, 255, 0);
  --playground-code-tag-color: rgb(255, 189, 64);
  --playground-code-type-color: rgb(153, 102, 255);
  --playground-code-variable-color: rgb(255, 102, 204);
  --playground-code-variable-2-color: rgb(204, 102, 255);
  --playground-code-variable-3-color: rgb(153, 102, 255)
}
`,ie`
.playground-theme-tomorrow-night-bright {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-color: rgb(234, 234, 234);
  --playground-code-cursor-color: rgb(106, 106, 106);
  --playground-code-selected-background: rgb(66, 66, 66);
  --playground-code-focused-selected-background: rgb(66, 66, 66);
  --playground-code-activeline-background: rgb(42, 42, 42);
  --playground-code-gutter-background: rgb(0, 0, 0);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(66, 66, 66);
  --playground-code-atom-color: rgb(161, 106, 148);
  --playground-code-attribute-color: rgb(153, 204, 153);
  --playground-code-bracket-color: rgb(234, 234, 234);
  --playground-code-builtin-color: rgb(234, 234, 234);
  --playground-code-comment-color: rgb(210, 123, 83);
  --playground-code-def-color: rgb(231, 140, 69);
  --playground-code-error-color: rgb(106, 106, 106);
  --playground-code-header-color: rgb(234, 234, 234);
  --playground-code-hr-color: rgb(234, 234, 234);
  --playground-code-keyword-color: rgb(213, 78, 83);
  --playground-code-link-color: rgb(161, 106, 148);
  --playground-code-meta-color: rgb(234, 234, 234);
  --playground-code-number-color: rgb(161, 106, 148);
  --playground-code-operator-color: rgb(234, 234, 234);
  --playground-code-property-color: rgb(153, 204, 153);
  --playground-code-qualifier-color: rgb(234, 234, 234);
  --playground-code-quote-color: rgb(234, 234, 234);
  --playground-code-string-color: rgb(231, 197, 71);
  --playground-code-string-2-color: rgb(234, 234, 234);
  --playground-code-tag-color: rgb(213, 78, 83);
  --playground-code-type-color: rgb(234, 234, 234);
  --playground-code-variable-color: rgb(185, 202, 74);
  --playground-code-variable-2-color: rgb(122, 166, 218);
  --playground-code-variable-3-color: rgb(234, 234, 234)
}
`,ie`
.playground-theme-tomorrow-night-eighties {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-color: rgb(204, 204, 204);
  --playground-code-cursor-color: rgb(106, 106, 106);
  --playground-code-selected-background: rgb(45, 45, 45);
  --playground-code-focused-selected-background: rgb(45, 45, 45);
  --playground-code-activeline-background: rgb(52, 54, 0);
  --playground-code-selection-background: rgba(45, 45, 45, 0.99);
  --playground-code-gutter-background: rgb(0, 0, 0);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(81, 81, 81);
  --playground-code-atom-color: rgb(161, 106, 148);
  --playground-code-attribute-color: rgb(153, 204, 153);
  --playground-code-bracket-color: rgb(204, 204, 204);
  --playground-code-builtin-color: rgb(204, 204, 204);
  --playground-code-comment-color: rgb(210, 123, 83);
  --playground-code-def-color: rgb(249, 145, 87);
  --playground-code-error-color: rgb(106, 106, 106);
  --playground-code-header-color: rgb(204, 204, 204);
  --playground-code-hr-color: rgb(204, 204, 204);
  --playground-code-keyword-color: rgb(242, 119, 122);
  --playground-code-link-color: rgb(161, 106, 148);
  --playground-code-meta-color: rgb(204, 204, 204);
  --playground-code-number-color: rgb(161, 106, 148);
  --playground-code-operator-color: rgb(204, 204, 204);
  --playground-code-property-color: rgb(153, 204, 153);
  --playground-code-qualifier-color: rgb(204, 204, 204);
  --playground-code-quote-color: rgb(204, 204, 204);
  --playground-code-string-color: rgb(255, 204, 102);
  --playground-code-string-2-color: rgb(204, 204, 204);
  --playground-code-tag-color: rgb(242, 119, 122);
  --playground-code-type-color: rgb(204, 204, 204);
  --playground-code-variable-color: rgb(153, 204, 153);
  --playground-code-variable-2-color: rgb(102, 153, 204);
  --playground-code-variable-3-color: rgb(204, 204, 204)
}
`,ie`
.playground-theme-ttcn {
  --playground-code-builtin-color: rgb(0, 0, 0);
  --playground-code-comment-color: rgb(51, 51, 51);
  --playground-code-keyword-color: rgb(0, 0, 0);
  --playground-code-number-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(0, 100, 0);
  --playground-code-variable-color: rgb(139, 34, 82)
}
`,ie`
.playground-theme-twilight {
  --playground-code-background: rgb(20, 20, 20);
  --playground-code-color: rgb(247, 247, 247);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(50, 50, 50);
  --playground-code-focused-selected-background: rgb(50, 50, 50);
  --playground-code-activeline-background: rgb(39, 40, 46);
  --playground-code-selection-background: rgba(50, 50, 50, 0.99);
  --playground-code-gutter-background: rgb(34, 34, 34);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(170, 170, 170);
  --playground-code-atom-color: rgb(255, 204, 0);
  --playground-code-attribute-color: rgb(214, 187, 109);
  --playground-code-bracket-color: rgb(247, 247, 247);
  --playground-code-builtin-color: rgb(205, 168, 105);
  --playground-code-comment-color: rgb(119, 119, 119);
  --playground-code-def-color: rgb(96, 115, 146);
  --playground-code-error-color: rgb(247, 247, 247);
  --playground-code-header-color: rgb(255, 100, 0);
  --playground-code-hr-color: rgb(174, 174, 174);
  --playground-code-keyword-color: rgb(249, 238, 152);
  --playground-code-link-color: rgb(173, 147, 97);
  --playground-code-meta-color: rgb(247, 247, 247);
  --playground-code-number-color: rgb(202, 120, 65);
  --playground-code-operator-color: rgb(205, 168, 105);
  --playground-code-property-color: rgb(247, 247, 247);
  --playground-code-qualifier-color: rgb(247, 247, 247);
  --playground-code-quote-color: rgb(247, 247, 247);
  --playground-code-string-color: rgb(143, 157, 106);
  --playground-code-string-2-color: rgb(189, 107, 24);
  --playground-code-tag-color: rgb(96, 115, 146);
  --playground-code-type-color: rgb(96, 115, 146);
  --playground-code-variable-color: rgb(247, 247, 247);
  --playground-code-variable-2-color: rgb(96, 115, 146);
  --playground-code-variable-3-color: rgb(96, 115, 146)
}
`,ie`
.playground-theme-vibrant-ink {
  --playground-code-background: rgb(0, 0, 0);
  --playground-code-color: rgb(255, 255, 255);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(53, 73, 60);
  --playground-code-focused-selected-background: rgb(53, 73, 60);
  --playground-code-activeline-background: rgb(39, 40, 46);
  --playground-code-selection-background: rgba(53, 73, 60, 0.99);
  --playground-code-gutter-background: rgb(0, 34, 64);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(208, 208, 208);
  --playground-code-atom-color: rgb(255, 204, 0);
  --playground-code-attribute-color: rgb(141, 166, 206);
  --playground-code-bracket-color: rgb(255, 255, 255);
  --playground-code-builtin-color: rgb(141, 166, 206);
  --playground-code-comment-color: rgb(128, 128, 128);
  --playground-code-def-color: rgb(141, 166, 206);
  --playground-code-error-color: rgb(255, 255, 255);
  --playground-code-header-color: rgb(255, 100, 0);
  --playground-code-hr-color: rgb(174, 174, 174);
  --playground-code-keyword-color: rgb(204, 120, 50);
  --playground-code-link-color: rgb(86, 86, 243);
  --playground-code-meta-color: rgb(216, 250, 60);
  --playground-code-number-color: rgb(255, 238, 152);
  --playground-code-operator-color: rgb(136, 136, 136);
  --playground-code-property-color: rgb(255, 255, 255);
  --playground-code-qualifier-color: rgb(255, 255, 255);
  --playground-code-quote-color: rgb(255, 255, 255);
  --playground-code-string-color: rgb(165, 194, 92);
  --playground-code-string-2-color: rgb(255, 0, 0);
  --playground-code-tag-color: rgb(141, 166, 206);
  --playground-code-type-color: rgb(255, 255, 255);
  --playground-code-variable-color: rgb(255, 255, 255);
  --playground-code-variable-2-color: rgb(255, 198, 109);
  --playground-code-variable-3-color: rgb(255, 198, 109)
}
`,ie`
.playground-theme-xq-dark {
  --playground-code-background: rgb(10, 0, 31);
  --playground-code-color: rgb(248, 248, 248);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(39, 0, 122);
  --playground-code-focused-selected-background: rgb(39, 0, 122);
  --playground-code-activeline-background: rgb(39, 40, 46);
  --playground-code-selection-background: rgba(39, 0, 122, 0.99);
  --playground-code-gutter-background: rgb(10, 0, 31);
  --playground-code-gutter-border-right: 1px solid rgb(170, 170, 170);
  --playground-code-linenumber-color: rgb(248, 248, 248);
  --playground-code-atom-color: rgb(108, 140, 213);
  --playground-code-attribute-color: rgb(255, 247, 0);
  --playground-code-bracket-color: rgb(204, 204, 119);
  --playground-code-comment-color: rgb(128, 128, 128);
  --playground-code-def-color: rgb(255, 255, 255);
  --playground-code-header-color: rgb(248, 248, 248);
  --playground-code-hr-color: rgb(248, 248, 248);
  --playground-code-keyword-color: rgb(255, 189, 64);
  --playground-code-link-color: rgb(248, 248, 248);
  --playground-code-meta-color: rgb(255, 255, 0);
  --playground-code-operator-color: rgb(248, 248, 248);
  --playground-code-property-color: rgb(248, 248, 248);
  --playground-code-qualifier-color: rgb(255, 247, 0);
  --playground-code-quote-color: rgb(248, 248, 248);
  --playground-code-string-color: rgb(159, 238, 0);
  --playground-code-string-2-color: rgb(248, 248, 248);
  --playground-code-tag-color: rgb(255, 189, 64);
  --playground-code-type-color: rgb(221, 221, 221);
  --playground-code-variable-color: rgb(255, 255, 255);
  --playground-code-variable-2-color: rgb(238, 238, 238);
  --playground-code-variable-3-color: rgb(221, 221, 221)
}
`,ie`
.playground-theme-xq-light {
  --playground-code-atom-color: rgb(108, 140, 213);
  --playground-code-attribute-color: rgb(127, 0, 127);
  --playground-code-bracket-color: rgb(204, 204, 119);
  --playground-code-builtin-color: rgb(126, 166, 86);
  --playground-code-comment-color: rgb(0, 128, 255);
  --playground-code-def-color: rgb(0, 0, 0);
  --playground-code-header-color: rgb(0, 0, 0);
  --playground-code-hr-color: rgb(0, 0, 0);
  --playground-code-keyword-color: rgb(90, 92, 173);
  --playground-code-link-color: rgb(0, 0, 0);
  --playground-code-meta-color: rgb(255, 255, 0);
  --playground-code-qualifier-color: rgb(128, 128, 128);
  --playground-code-quote-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(255, 0, 0);
  --playground-code-string-2-color: rgb(0, 0, 0);
  --playground-code-tag-color: rgb(63, 127, 127);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(0, 0, 0);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,ie`
.playground-theme-yeti {
  --playground-code-background: rgb(236, 234, 232);
  --playground-code-color: rgb(209, 201, 192);
  --playground-code-cursor-color: rgb(209, 201, 192);
  --playground-code-activeline-background: rgb(231, 228, 224);
  --playground-code-selection-background: rgb(220, 216, 210);
  --playground-code-gutter-background: rgb(229, 225, 219);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(173, 171, 166);
  --playground-code-atom-color: rgb(160, 116, 196);
  --playground-code-attribute-color: rgb(159, 185, 110);
  --playground-code-bracket-color: rgb(209, 201, 192);
  --playground-code-builtin-color: rgb(160, 116, 196);
  --playground-code-comment-color: rgb(212, 200, 190);
  --playground-code-def-color: rgb(85, 181, 219);
  --playground-code-error-color: rgb(209, 201, 192);
  --playground-code-header-color: rgb(209, 201, 192);
  --playground-code-hr-color: rgb(209, 201, 192);
  --playground-code-keyword-color: rgb(159, 185, 110);
  --playground-code-link-color: rgb(209, 201, 192);
  --playground-code-meta-color: rgb(150, 192, 216);
  --playground-code-number-color: rgb(160, 116, 196);
  --playground-code-operator-color: rgb(159, 185, 110);
  --playground-code-property-color: rgb(160, 116, 196);
  --playground-code-qualifier-color: rgb(150, 192, 216);
  --playground-code-quote-color: rgb(209, 201, 192);
  --playground-code-string-color: rgb(150, 192, 216);
  --playground-code-string-2-color: rgb(150, 192, 216);
  --playground-code-tag-color: rgb(150, 192, 216);
  --playground-code-type-color: rgb(150, 192, 216);
  --playground-code-variable-color: rgb(85, 181, 219);
  --playground-code-variable-2-color: rgb(160, 116, 196);
  --playground-code-variable-3-color: rgb(150, 192, 216)
}
`,ie`
.playground-theme-yonce {
  --playground-code-background: rgb(28, 28, 28);
  --playground-code-color: rgb(212, 212, 212);
  --playground-code-cursor-color: rgb(252, 67, 132);
  --playground-code-selected-background: rgba(252, 69, 133, 0.48);
  --playground-code-focused-selected-background: rgba(252, 69, 133, 0.48);
  --playground-code-activeline-background: rgb(39, 39, 39);
  --playground-code-gutter-background: rgb(28, 28, 28);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(119, 119, 119);
  --playground-code-atom-color: rgb(243, 155, 53);
  --playground-code-attribute-color: rgb(160, 111, 202);
  --playground-code-bracket-color: rgb(212, 212, 212);
  --playground-code-builtin-color: rgb(252, 67, 132);
  --playground-code-comment-color: rgb(105, 109, 112);
  --playground-code-def-color: rgb(152, 227, 66);
  --playground-code-error-color: rgb(212, 212, 212);
  --playground-code-header-color: rgb(218, 125, 174);
  --playground-code-hr-color: rgb(152, 227, 66);
  --playground-code-keyword-color: rgb(0, 167, 170);
  --playground-code-link-color: rgb(105, 109, 112);
  --playground-code-meta-color: rgb(212, 212, 212);
  --playground-code-number-color: rgb(160, 111, 202);
  --playground-code-operator-color: rgb(252, 67, 132);
  --playground-code-property-color: rgb(212, 212, 212);
  --playground-code-qualifier-color: rgb(252, 67, 132);
  --playground-code-quote-color: rgb(212, 212, 212);
  --playground-code-string-color: rgb(230, 219, 116);
  --playground-code-string-2-color: rgb(243, 155, 53);
  --playground-code-tag-color: rgb(252, 67, 132);
  --playground-code-type-color: rgb(160, 111, 202);
  --playground-code-variable-color: rgb(212, 212, 212);
  --playground-code-variable-2-color: rgb(218, 125, 174);
  --playground-code-variable-3-color: rgb(160, 111, 202)
}
`,ie`
.playground-theme-zenburn {
  --playground-code-background: rgb(63, 63, 63);
  --playground-code-color: rgb(220, 220, 204);
  --playground-code-cursor-color: rgb(255, 255, 255);
  --playground-code-selected-background: rgb(84, 84, 84);
  --playground-code-focused-selected-background: rgb(84, 84, 84);
  --playground-code-activeline-background: rgb(0, 0, 0);
  --playground-code-gutter-background: rgb(63, 63, 63);
  --playground-code-atom-color: rgb(191, 235, 191);
  --playground-code-attribute-color: rgb(223, 175, 143);
  --playground-code-bracket-color: rgb(220, 220, 204);
  --playground-code-builtin-color: rgb(220, 220, 204);
  --playground-code-comment-color: rgb(127, 159, 127);
  --playground-code-def-color: rgb(220, 220, 204);
  --playground-code-error-color: rgb(220, 220, 204);
  --playground-code-header-color: rgb(240, 239, 208);
  --playground-code-hr-color: rgb(220, 220, 204);
  --playground-code-keyword-color: rgb(240, 223, 175);
  --playground-code-link-color: rgb(220, 220, 204);
  --playground-code-meta-color: rgb(240, 223, 175);
  --playground-code-number-color: rgb(220, 220, 204);
  --playground-code-operator-color: rgb(240, 239, 208);
  --playground-code-property-color: rgb(223, 175, 143);
  --playground-code-qualifier-color: rgb(124, 184, 187);
  --playground-code-quote-color: rgb(220, 220, 204);
  --playground-code-string-color: rgb(204, 147, 147);
  --playground-code-string-2-color: rgb(204, 147, 147);
  --playground-code-tag-color: rgb(147, 224, 227);
  --playground-code-type-color: rgb(220, 220, 204);
  --playground-code-variable-color: rgb(223, 175, 143);
  --playground-code-variable-2-color: rgb(220, 220, 204);
  --playground-code-variable-3-color: rgb(220, 220, 204)
}
`];
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
function Lt(e){return{type:"checkbox",...e}}function Et(e){return{type:"slider",...e}}function Ot(e){return{type:"color",...e}}function At(e){return{type:"select",...e}}const _t=e=>e+"px",Mt=[At({id:"theme",label:"Theme",section:"code editor",options:["default","3024-day","3024-night","abcdef","ambiance","ayu-dark","ayu-mirage","base16-dark","base16-light","bespin","blackboard","cobalt","colorforth","darcula","dracula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark","hopscotch","icecoder","idea","isotope","lesser-dark","liquibyte","lucario","material-darker","material-ocean","material-palenight","material","mbo","mdn-like","midnight","monokai","moxer","neat","neo","night","nord","oceanic-next","panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue","seti","shadowfox","solarized","ssms","the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight","vibrant-ink","xq-dark","xq-light","yeti","yonce","zenburn"],default:"default"}),At({id:"fontFamily",label:"Font",section:"code editor",cssProperty:"--playground-code-font-family",options:["monospace","Roboto Mono","Source Code Pro","Ubuntu Mono"],formatCss:e=>"monospace"!==e?e+", monospace":e,default:"monospace"}),Et({id:"fontSize",label:"Font size",section:"code editor",cssProperty:"--playground-code-font-size",formatCss:_t,min:1,max:30,default:14}),Lt({id:"lineNumbers",label:"Line numbers",section:"code editor",default:!1,htmlAttribute:"line-numbers"}),Ot({id:"editorBackground",label:"Background",section:"code editor",cssProperty:"--playground-code-background",formatCss:e=>e+" !important",default:"",unsetLabel:"From theme"}),Ot({id:"filePickerBackground",label:"Background",cssProperty:"--playground-file-picker-background",default:"#ffffff",section:"file picker"}),Ot({id:"filePickerForeground",label:"Foreground",cssProperty:"--playground-file-picker-foreground-color",default:"#000000",section:"file picker"}),Ot({id:"previewToolbarBackground",label:"Toolbar background",cssProperty:"--playground-preview-toolbar-background",default:"#ffffff",section:"preview"}),Ot({id:"previewToolbarForeground",label:"Toolbar foreground",cssProperty:"--playground-preview-toolbar-foreground-color",default:"#444444",section:"preview"}),Ot({id:"iframeBackground",label:"Iframe background",cssProperty:"--playground-preview-background",default:"#000",section:"preview"}),Lt({id:"borders",label:"Borders",cssProperty:"--playground-border",formatCss:e=>e?"1px solid #ddd":"none",default:!0,section:"general"}),Lt({id:"resizable",label:"Resizable",section:"general",default:!1,htmlAttribute:"resizable"}),Ot({id:"highlight",label:"Highlight",cssProperty:"--playground-highlight-color",default:"#6200ee",section:"general"}),Et({id:"previewWidth",label:"Preview width",cssProperty:"--playground-preview-width",formatCss:e=>e+"%",min:0,max:100,default:30,section:"general"}),Et({id:"radius",label:"Radius",cssProperty:"border-radius",formatCss:_t,min:0,max:30,default:0,section:"general"}),Et({id:"barHeight",label:"Bar height",cssProperty:"--playground-bar-height",formatCss:_t,min:10,max:100,default:35,section:"general"}),Ot({id:"pageBackground",label:"Page background",default:"#cccccc",section:"general"})],Rt={},zt={};for(const e of Mt){Rt[e.id]=e;let r=zt[e.section];void 0===r&&(r=zt[e.section]=[]),r.push(e)}const Nt=Object.keys(Rt),Ft=Object.keys(zt);class It{constructor(){this.values=new Map}getValue(e){return this.values.has(e)?this.values.get(e):Rt[e].default}setValue(e,r){this.values.set(e,r)}}
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
 */let Wt=class extends le{constructor(){super(...arguments),this.values=new It}connectedCallback(){super.connectedCallback(),this.readUrlParams(new URL(document.location.href).searchParams)}setValue(e,r){this.values.setValue(e,r),this.setUrlParams(),this.requestUpdate()}readUrlParams(e){for(const r of Nt){let t=e.get(r);if(null===t)continue;const o=Rt[r];switch(o.type){case"checkbox":this.setValue(o.id,"y"===t);break;case"color":this.setValue(o.id,"#"+t);break;case"slider":this.setValue(o.id,Number(t));break;case"select":this.setValue(o.id,t);break;default:Pt(0,"Unexpected knob type "+o.type)}}}setUrlParams(){const e=new URLSearchParams;for(const r of Mt){let t=this.values.getValue(r.id);if(t!==r.default)switch(r.type){case"checkbox":e.set(r.id,t?"y":"n");break;case"color":e.set(r.id,t.substring(1));break;case"slider":e.set(r.id,t+"");break;case"select":e.set(r.id,t);break;default:Pt(0,"Unexpected knob type "+r.type)}}history.replaceState(null,"","?"+e.toString())}render(){return P`
      <style>
        ${this.cssText}
      </style>

      <div id="lhs">${this.knobs}</div>

      <div id="rhs">
        <div
          id="container"
          style="background-color:${this.values.getValue("pageBackground")}"
        >
          <playground-ide
            class="playground-theme-${this.values.getValue("theme")}"
            .lineNumbers=${this.values.getValue("lineNumbers")}
            .resizable=${this.values.getValue("resizable")}
            project-src="./project/project.json"
          >
          </playground-ide>

          ${Kt}
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
    `}get knobs(){return Ft.map((e=>P`<section>
          <h3 class="sectionLabel">${e}</h3>
          <div class="knobs">
            ${zt[e].map((e=>this.knob(e)))}
          </div>
        </section>`))}get htmlText(){return`${this.themeImport}\n<playground-ide${this.htmlTextAttributes}>\n</playground-ide>\n`}get themeImport(){const e=this.values.getValue("theme");return"default"===e?"":`<import rel="stylesheet"\n        src="/node_modules/playground-elements/themes/${e}.css">\n`}get htmlTextAttributes(){const e=[];for(const r of Nt){const t=Rt[r];if(!t.htmlAttribute)continue;const o=this.values.getValue(r);if(o!==t.default)switch(t.type){case"checkbox":o&&e.push(" "+t.htmlAttribute);break;default:e.push(` ${t.htmlAttribute}="${o}"`)}}const r=this.values.getValue("theme");return"default"!==r&&e.push(` class="playground-theme-${r}"`),e.join("")}get cssText(){const e=[];for(const r of Nt){const t=Rt[r];if(!t.cssProperty)continue;const o=this.values.getValue(r);let n=`${t.cssProperty}: ${t.formatCss?t.formatCss(o):o};`;n=o===t.default?`/*${n}*/`:"  "+n,e.push(n)}return`\nplayground-ide {\n${e.join("\n")}\n}\n    `}knob(e){const r=P`<label for=${e.id}>${e.label}</label>`;switch(e.type){case"select":return[r,this.selectKnob(e)];case"slider":return[r,this.sliderKnob(e)];case"color":return[r,this.colorKnob(e)];case"checkbox":return[r,this.checkboxKnob(e)]}return""}selectKnob(e){const r=this.values.getValue(e.id);return P`
      <select
        id=${e.id}
        @input=${r=>{this.setValue(e.id,r.target.value)}}
      >
        ${e.options.map((e=>P`<option value=${e} ?selected=${e===r}>
              ${e}
            </option>`))}
      </select>
    `}sliderKnob(e){const r=this.values.getValue(e.id);return P`
      <span class="sliderAndValue">
        <input
          id=${e.id}
          type="range"
          min=${e.min}
          max=${e.max}
          value=${r}
          @input=${r=>{this.setValue(e.id,Number(r.target.value))}}
        />
        <span class="sliderValue"
          >${e.formatCss?e.formatCss(r):r}</span
        >
      </span>
    `}colorKnob(e){let r=this.values.getValue(e.id);return P`
      ${"unsetLabel"in e?P`
            <div style="margin-bottom: 5px">
              <input
                id=${e.id+"-unset"}
                type="checkbox"
                ?checked=${""===r}
                @input=${t=>{r=t.target.checked?"":"#ffffff",this.setValue(e.id,r)}}
              />
              <label for=${e.id+"-unset"}> ${e.unsetLabel}</label>
            </div>
            <span></span>
          `:""}
      <input
        id=${e.id}
        type="color"
        .value=${""===r?"#ffffff":r+""}
        ?disabled=${""===r}
        @input=${r=>{this.setValue(e.id,r.target.value)}}
      />
    `}checkboxKnob(e){let r=this.values.getValue(e.id);return P`
      <input
        id=${e.id}
        type="checkbox"
        ?checked=${r}
        @change=${r=>{this.setValue(e.id,r.target.checked)}}
      />
    `}};function Pt(e,r){throw Error(r)}Wt.styles=[...Tt,ie`
      :host {
        display: flex;
        font-family: Roboto, Arial, Helvetica, sans-serif;
      }

      #lhs {
        width: 285px;
        overflow-y: auto;
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
        padding: 10px;
        --playground-code-font-family: 'Roboto Mono', monospace;
        --playground-code-font-size: 12px;
        --playground-code-background: transparent;
        background-color: #f7f7f7;
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
        grid-template-columns: 70px 1fr;
        max-width: 400px;
        row-gap: 15px;
        column-gap: 10px;
        align-items: center;
      }

      input[type='range'] {
        width: 120px;
      }

      .knobs label {
        text-align: right;
        cursor: pointer;
      }

      #container {
        flex: 1;
      }

      .sliderAndValue {
        display: flex;
        align-items: center;
      }

      .sliderValue {
        margin-left: 5px;
      }
    `],Wt=e([q("playground-configurator")],Wt);const Kt=P`<a
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
  </style>`;export{Wt as PlaygroundConfigurator};
