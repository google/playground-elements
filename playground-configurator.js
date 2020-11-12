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
function e(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(t,r,a):n(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a
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
 */}const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(e,t,r=null)=>{for(;t!==r;){const r=t.nextSibling;e.removeChild(t),t=r}},o=`{{lit-${(Math.random()+"").slice(2)}}}`,n=`\x3c!--${o}--\x3e`,i=RegExp(`${o}|${n}`);class a{constructor(e,t){this.parts=[],this.element=t;const r=[],n=[],a=document.createTreeWalker(t.content,133,null,!1);let c=0,u=-1,p=0;const{strings:g,values:{length:h}}=e;for(;p<h;){const e=a.nextNode();if(null!==e){if(u++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:r}=t;let o=0;for(let e=0;e<r;e++)l(t[e].name,"$lit$")&&o++;for(;o-- >0;){const t=g[p],r=d.exec(t)[2],o=r.toLowerCase()+"$lit$",n=e.getAttribute(o);e.removeAttribute(o);const a=n.split(i);this.parts.push({type:"attribute",index:u,name:r,strings:a}),p+=a.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),a.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(o)>=0){const o=e.parentNode,n=t.split(i),a=n.length-1;for(let t=0;t<a;t++){let r,i=n[t];if(""===i)r=s();else{const e=d.exec(i);null!==e&&l(e[2],"$lit$")&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),r=document.createTextNode(i)}o.insertBefore(r,e),this.parts.push({type:"node",index:++u})}""===n[a]?(o.insertBefore(s(),e),r.push(e)):e.data=n[a],p+=a}}else if(8===e.nodeType)if(e.data===o){const t=e.parentNode;null!==e.previousSibling&&u!==c||(u++,t.insertBefore(s(),e)),c=u,this.parts.push({type:"node",index:u}),null===e.nextSibling?e.data="":(r.push(e),u--),p++}else{let t=-1;for(;-1!==(t=e.data.indexOf(o,t+1));)this.parts.push({type:"node",index:-1}),p++}}else a.currentNode=n.pop()}for(const e of r)e.parentNode.removeChild(e)}}const l=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},c=e=>-1!==e.index,s=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,t){const{element:{content:r},parts:o}=e,n=document.createTreeWalker(r,133,null,!1);let i=g(o),a=o[i],l=-1,c=0;const s=[];let d=null;for(;n.nextNode();){l++;const e=n.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(s.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==a&&a.index===l;)a.index=null!==d?-1:a.index-c,i=g(o,i),a=o[i]}s.forEach((e=>e.parentNode.removeChild(e)))}const p=e=>{let t=11===e.nodeType?0:1;const r=document.createTreeWalker(e,133,null,!1);for(;r.nextNode();)t++;return t},g=(e,t=-1)=>{for(let r=t+1;r<e.length;r++){const t=e[r];if(c(t))return r}return-1},h=new WeakMap,f=e=>(...t)=>{const r=e(...t);return h.set(r,!0),r},m=e=>"function"==typeof e&&h.has(e),y={},b={};
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
class v{constructor(e,t,r){this.__parts=[],this.template=e,this.processor=t,this.options=r}update(e){let t=0;for(const r of this.__parts)void 0!==r&&r.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),r=[],o=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let i,a=0,l=0,s=n.nextNode();for(;a<o.length;)if(i=o[a],c(i)){for(;l<i.index;)l++,"TEMPLATE"===s.nodeName&&(r.push(s),n.currentNode=s.content),null===(s=n.nextNode())&&(n.currentNode=r.pop(),s=n.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(s.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(s,i.name,i.strings,this.options));a++}else this.__parts.push(void 0),a++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),k=` ${o} `;class C{constructor(e,t,r,o){this.strings=e,this.values=t,this.type=r,this.processor=o}getHTML(){const e=this.strings.length-1;let t="",r=!1;for(let i=0;i<e;i++){const e=this.strings[i],a=e.lastIndexOf("\x3c!--");r=(a>-1||r)&&-1===e.indexOf("--\x3e",a+1);const l=d.exec(e);t+=null===l?e+(r?k:n):e.substr(0,l.index)+l[1]+l[2]+"$lit$"+l[3]+o}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==w&&(t=w.createHTML(t)),e.innerHTML=t,e}}
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
 */const x=e=>null===e||!("object"==typeof e||"function"==typeof e),S=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class T{constructor(e,t,r){this.dirty=!0,this.element=e,this.name=t,this.strings=r,this.parts=[];for(let e=0;e<r.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new L(this)}_getValue(){const e=this.strings,t=e.length-1,r=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=r[0].value;if("symbol"==typeof e)return e+"";if("string"==typeof e||!S(e))return e}let o="";for(let n=0;n<t;n++){o+=e[n];const t=r[n];if(void 0!==t){const e=t.value;if(x(e)||!S(e))o+="string"==typeof e?e:e+"";else for(const t of e)o+="string"==typeof t?t:t+""}}return o+=e[t],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class L{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===y||x(e)&&e===this.value||(this.value=e,m(e)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const e=this.value;this.value=y,e(this)}this.value!==y&&this.committer.commit()}}class E{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(s()),this.endNode=e.appendChild(s())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=s()),e.__insert(this.endNode=s())}insertAfterPart(e){e.__insert(this.startNode=s()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}const e=this.__pendingValue;e!==y&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof C?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):S(e)?this.__commitIterable(e):e===b?(this.value=b,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,r="string"==typeof(e=null==e?"":e)?e:e+"";t===this.endNode.previousSibling&&3===t.nodeType?t.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const r=new v(t,e.processor,this.options),o=r._clone();r.update(e.values),this.__commitNode(o),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let r,o=0;for(const n of e)r=t[o],void 0===r&&(r=new E(this.options),t.push(r),0===o?r.appendIntoPart(this):r.insertAfterPart(t[o-1])),r.setValue(n),r.commit(),o++;o<t.length&&(t.length=o,this.clear(r&&r.endNode))}clear(e=this.startNode){r(this.startNode.parentNode,e.nextSibling,this.endNode)}}class O{constructor(e,t,r){if(this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}if(this.__pendingValue===y)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=y}}class A extends T{constructor(e,t,r){super(e,t,r),this.single=2===r.length&&""===r[0]&&""===r[1]}_createPart(){return new _(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class _ extends L{}let M=!1;(()=>{try{const e={get capture(){return M=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class R{constructor(e,t,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=r,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}if(this.__pendingValue===y)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=z(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=y}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const z=e=>e&&(M?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
 */;function N(e){let t=F.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},F.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const n=e.strings.join(o);return r=t.keyString.get(n),void 0===r&&(r=new a(e,e.getTemplateElement()),t.keyString.set(n,r)),t.stringsArray.set(e.strings,r),r}const F=new Map,I=new WeakMap,W=new
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
class{handleAttributeExpressions(e,t,r,o){const n=t[0];return"."===n?new A(e,t.slice(1),r).parts:"@"===n?[new R(e,t.slice(1),o.eventContext)]:"?"===n?[new O(e,t.slice(1),r)]:new T(e,t,r).parts}handleTextExpression(e){return new E(e)}};
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const P=(e,...t)=>new C(e,t,"html",W)
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
 */,K=(e,t)=>`${e}--${t}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const B=e=>t=>{const r=K(t.type,e);let n=F.get(r);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},F.set(r,n));let i=n.stringsArray.get(t.strings);if(void 0!==i)return i;const l=t.strings.join(o);if(i=n.keyString.get(l),void 0===i){const r=t.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(r,e),i=new a(t,r),n.keyString.set(l,i)}return n.stringsArray.set(t.strings,i),i},D=["html","svg"],j=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const H={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},V=(e,t)=>t!==e&&(t==t||e==e),Z={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:V};class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const o=this._attributeNameForProperty(r,t);void 0!==o&&(this._attributeToPropertyMap.set(o,r),e.push(o))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=Z){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const n=this[e];this[t]=o,this.requestUpdateInternal(e,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Z}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=V){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,o=t.converter||H,n="function"==typeof o?o:o.fromAttribute;return n?n(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,o=t.converter;return(o&&o.toAttribute||H.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=Z){const o=this.constructor,n=o._attributeNameForProperty(e,r);if(void 0!==n){const e=o._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,o=r._attributeToPropertyMap.get(e);if(void 0!==o){const e=r.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let o=!0;if(void 0!==e){const n=this.constructor;r=r||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}J.finalized=!0;
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
const q=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(t){window.customElements.define(e,t)}}})(e,t),G=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function Q(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):G(e,t)}function Y(e){return Q({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}function X(e,t){return(r,o)=>{const n={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof o?Symbol():"__"+o;n.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==o?$(n,r,o):ee(n,r)}}const $=(e,t,r)=>{Object.defineProperty(t,r,e)},ee=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e});function te(e){return(t,r)=>void 0!==r?((e,t,r)=>{Object.assign(t[r],e)})(e,t,r):((e,t)=>Object.assign(Object.assign({},t),{finisher(r){Object.assign(r.prototype[t.key],e)}}))(e,t)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const re=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol();class ne{constructor(e,t){if(t!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(re?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ie=(e,...t)=>{const r=t.reduce(((t,r,o)=>t+(e=>{if(e instanceof ne)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[o+1]),e[0]);return new ne(r,oe)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ae={};class le extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),o=[];r.forEach((e=>o.unshift(e))),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!re){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new ne(t+"",oe)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?re?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ae&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return ae}}le.finalized=!0,le.render=(e,t,o)=>{if(!o||"object"!=typeof o||!o.scopeName)throw Error("The `scopeName` option is required.");const n=o.scopeName,i=I.has(t),a=U&&11===t.nodeType&&!!t.host,l=a&&!j.has(n),c=l?document.createDocumentFragment():t;if(((e,t,o)=>{let n=I.get(t);void 0===n&&(r(t,t.firstChild),I.set(t,n=new E(Object.assign({templateFactory:N},o))),n.appendInto(t)),n.setValue(e),n.commit()})(e,c,Object.assign({templateFactory:B(n)},o)),l){const e=I.get(c);I.delete(c);((e,t,r)=>{j.add(e);const o=r?r.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:i}=n;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(o,e);const a=document.createElement("style");for(let e=0;e<i;e++){const t=n[e];t.parentNode.removeChild(t),a.textContent+=t.textContent}(e=>{D.forEach((t=>{const r=F.get(K(t,e));void 0!==r&&r.keyString.forEach((e=>{const{element:{content:t}}=e,r=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{r.add(e)})),u(e,r)}))}))})(e);const l=o.content;r?function(e,t,r=null){const{element:{content:o},parts:n}=e;if(null==r)return void o.appendChild(t);const i=document.createTreeWalker(o,133,null,!1);let a=g(n),l=0,c=-1;for(;i.nextNode();)for(c++,i.currentNode===r&&(l=p(t),r.parentNode.insertBefore(t,r));-1!==a&&n[a].index===c;){if(l>0){for(;-1!==a;)n[a].index+=l,a=g(n,a);return}a=g(n,a)}}
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
 */(r,a,l.firstChild):l.insertBefore(a,l.firstChild),window.ShadyCSS.prepareTemplateStyles(o,e);const c=l.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(r){l.insertBefore(a,l.firstChild);const e=new Set;e.add(a),u(r,e)}})(n,c,e.value instanceof v?e.value.template:void 0),r(t,t.firstChild),t.appendChild(c),I.set(t,e)}!i&&a&&window.ShadyCSS.styleElement(t.host)};const ce=Symbol("Comlink.proxy"),se=Symbol("Comlink.endpoint"),de=Symbol("Comlink.releaseProxy"),ue=Symbol("Comlink.thrown"),pe=e=>"object"==typeof e&&null!==e||"function"==typeof e,ge=new Map([["proxy",{canHandle:e=>pe(e)&&e[ce],serialize(e){const{port1:t,port2:r}=new MessageChannel;return he(e,t),[r,[r]]},deserialize:e=>(e.start(),me(e))}],["throw",{canHandle:e=>pe(e)&&ue in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(Error(e.value.message),e.value);throw e.value}}]]);function he(e,t=self){t.addEventListener("message",(function r(o){if(!o||!o.data)return;const{id:n,type:i,path:a}=Object.assign({path:[]},o.data),l=(o.data.argumentList||[]).map(xe);let c;try{const t=a.slice(0,-1).reduce(((e,t)=>e[t]),e),r=a.reduce(((e,t)=>e[t]),e);switch(i){case 0:c=r;break;case 1:t[a.slice(-1)[0]]=xe(o.data.value),c=!0;break;case 2:c=r.apply(t,l);break;case 3:c=ke(new r(...l));break;case 4:{const{port1:t,port2:r}=new MessageChannel;he(e,r),c=function(e,t){return we.set(e,t),e}(t,[t])}break;case 5:c=void 0}}catch(e){c={value:e,[ue]:0}}Promise.resolve(c).catch((e=>({value:e,[ue]:0}))).then((e=>{const[o,a]=Ce(e);t.postMessage(Object.assign(Object.assign({},o),{id:n}),a),5===i&&(t.removeEventListener("message",r),fe(t))}))})),t.start&&t.start()}function fe(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function me(e,t){return be(e,[],t)}function ye(e){if(e)throw Error("Proxy has been released and is not useable")}function be(e,t=[],r=function(){}){let o=!1;const n=new Proxy(r,{get(r,i){if(ye(o),i===de)return()=>Se(e,{type:5,path:t.map((e=>e.toString()))}).then((()=>{fe(e),o=!0}));if("then"===i){if(0===t.length)return{then:()=>n};const r=Se(e,{type:0,path:t.map((e=>e.toString()))}).then(xe);return r.then.bind(r)}return be(e,[...t,i])},set(r,n,i){ye(o);const[a,l]=Ce(i);return Se(e,{type:1,path:[...t,n].map((e=>e.toString())),value:a},l).then(xe)},apply(r,n,i){ye(o);const a=t[t.length-1];if(a===se)return Se(e,{type:4}).then(xe);if("bind"===a)return be(e,t.slice(0,-1));const[l,c]=ve(i);return Se(e,{type:2,path:t.map((e=>e.toString())),argumentList:l},c).then(xe)},construct(r,n){ye(o);const[i,a]=ve(n);return Se(e,{type:3,path:t.map((e=>e.toString())),argumentList:i},a).then(xe)}});return n}function ve(e){const t=e.map(Ce);return[t.map((e=>e[0])),(r=t.map((e=>e[1])),Array.prototype.concat.apply([],r))];var r}const we=new WeakMap;function ke(e){return Object.assign(e,{[ce]:!0})}function Ce(e){for(const[t,r]of ge)if(r.canHandle(e)){const[o,n]=r.serialize(e);return[{type:3,name:t,value:o},n]}return[{type:0,value:e},we.get(e)||[]]}function xe(e){switch(e.type){case 3:return ge.get(e.name).deserialize(e.value);case 0:return e.value}}function Se(e,t,r){return new Promise((o=>{const n=[,,,,].fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(r){r.data&&r.data.id&&r.data.id===n&&(e.removeEventListener("message",t),o(r.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:n},t),r)}))}
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
const Te=e=>e.endsWith("/")?e:e+"/";
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
function Le(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(t,r,a):n(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a
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
***************************************************************************** */}function Ee(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(t,r,a):n(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a
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
***************************************************************************** */}function Oe(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(t,r,a):n(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a
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
 */}function Ae(e,t){return(e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,t)}
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
*/function _e(e){return{addClass:t=>{e.classList.add(t)},removeClass:t=>{e.classList.remove(t)},hasClass:t=>e.classList.contains(t)}}const Me=()=>{},Re={get passive(){return!1}};document.addEventListener("x",Me,Re),document.removeEventListener("x",Me);
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
class ze extends le{click(){if(this.mdcRoot)return this.mdcRoot.focus(),void this.mdcRoot.click();super.click()}createFoundation(){void 0!==this.mdcFoundation&&this.mdcFoundation.destroy(),this.mdcFoundationClass&&(this.mdcFoundation=new this.mdcFoundationClass(this.createAdapter()),this.mdcFoundation.init())}firstUpdated(){this.createFoundation()}}
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
***************************************************************************** */var Ne=function(e,t){return(Ne=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};function Fe(e,t){function r(){this.constructor=e}Ne(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var Ie=function(){return(Ie=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},We=function(){function e(e){void 0===e&&(e={}),this.adapter=e}return Object.defineProperty(e,"cssClasses",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{}},enumerable:!0,configurable:!0}),e.prototype.init=function(){},e.prototype.destroy=function(){},e}(),Pe={ACTIVE:"mdc-tab-indicator--active",FADE:"mdc-tab-indicator--fade",NO_TRANSITION:"mdc-tab-indicator--no-transition"},Ke={CONTENT_SELECTOR:".mdc-tab-indicator__content"},Ue=function(e){function t(r){return e.call(this,Ie(Ie({},t.defaultAdapter),r))||this}return Fe(t,e),Object.defineProperty(t,"cssClasses",{get:function(){return Pe},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return Ke},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},computeContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},setContentStyleProperty:function(){}}},enumerable:!0,configurable:!0}),t.prototype.computeContentClientRect=function(){return this.adapter.computeContentClientRect()},t}(We),Be=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return Fe(t,e),t.prototype.activate=function(){this.adapter.addClass(Ue.cssClasses.ACTIVE)},t.prototype.deactivate=function(){this.adapter.removeClass(Ue.cssClasses.ACTIVE)},t}(Ue),De=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return Fe(t,e),t.prototype.activate=function(e){if(e){var t=this.computeContentClientRect(),r=e.width/t.width,o=e.left-t.left;this.adapter.addClass(Ue.cssClasses.NO_TRANSITION),this.adapter.setContentStyleProperty("transform","translateX("+o+"px) scaleX("+r+")"),this.computeContentClientRect(),this.adapter.removeClass(Ue.cssClasses.NO_TRANSITION),this.adapter.addClass(Ue.cssClasses.ACTIVE),this.adapter.setContentStyleProperty("transform","")}else this.adapter.addClass(Ue.cssClasses.ACTIVE)},t.prototype.deactivate=function(){this.adapter.removeClass(Ue.cssClasses.ACTIVE)},t}(Ue);
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
class je{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach((t=>e+=t+" ")),this.element.setAttribute("class",e)}}}const He=new WeakMap,Ve=f((e=>t=>{if(!(t instanceof L)||t instanceof _||"class"!==t.committer.name||t.committer.parts.length>1)throw Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:r}=t,{element:o}=r;let n=He.get(t);void 0===n&&(o.setAttribute("class",r.strings.join(" ")),He.set(t,n=new Set));const i=o.classList||new je(o);n.forEach((t=>{t in e||(i.remove(t),n.delete(t))}));for(const t in e){const r=e[t];r!=n.has(t)&&(r?(i.add(t),n.add(t)):(i.remove(t),n.delete(t)))}"function"==typeof i.commit&&i.commit()}));class Ze extends ze{constructor(){super(...arguments),this.icon="",this.fade=!1}get mdcFoundationClass(){return this.fade?Be:De}render(){const e={"mdc-tab-indicator__content--icon":this.icon,"material-icons":this.icon,"mdc-tab-indicator__content--underline":!this.icon};return P`
      <span class="mdc-tab-indicator ${Ve({"mdc-tab-indicator--fade":this.fade})}">
        <span class="mdc-tab-indicator__content ${Ve(e)}">${this.icon}</span>
      </span>
      `}updated(e){e.has("fade")&&this.createFoundation()}createAdapter(){return Object.assign(Object.assign({},_e(this.mdcRoot)),{computeContentClientRect:()=>this.contentElement.getBoundingClientRect(),setContentStyleProperty:(e,t)=>this.contentElement.style.setProperty(e,t)})}computeContentClientRect(){return this.mdcFoundation.computeContentClientRect()}activate(e){this.mdcFoundation.activate(e)}deactivate(){this.mdcFoundation.deactivate()}}Oe([X(".mdc-tab-indicator")],Ze.prototype,"mdcRoot",void 0),Oe([X(".mdc-tab-indicator__content")],Ze.prototype,"contentElement",void 0),Oe([Q()],Ze.prototype,"icon",void 0),Oe([Q({type:Boolean})],Ze.prototype,"fade",void 0);
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
const Je=ie`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-tab-indicator .mdc-tab-indicator__content--icon{color:#018786;color:var(--mdc-theme-secondary, #018786)}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}`;let qe=class extends Ze{};qe.styles=Je,qe=Oe([q("mwc-tab-indicator")],qe);
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
const Ge=e=>(t,r)=>{if(t.constructor._observers){if(!t.constructor.hasOwnProperty("_observers")){const e=t.constructor._observers;t.constructor._observers=new Map,e.forEach(((e,r)=>t.constructor._observers.set(r,e)))}}else{t.constructor._observers=new Map;const e=t.updated;t.updated=function(t){e.call(this,t),t.forEach(((e,t)=>{const r=this.constructor._observers.get(t);void 0!==r&&r.call(this,this[t],e)}))}}t.constructor._observers.set(r,e)}
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
 */;function Qe(e){return void 0===e&&(e=window),!!function(e){void 0===e&&(e=window);var t=!1;try{var r={get passive(){return t=!0,!1}},o=function(){};e.document.addEventListener("test",o,r),e.document.removeEventListener("test",o,r)}catch(e){t=!1}return t}
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
***************************************************************************** */(e)&&{passive:!0}}var Ye,Xe=function(e,t){return(Xe=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},$e=function(){return($e=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},et={BG_FOCUSED:"mdc-ripple-upgraded--background-focused",FG_ACTIVATION:"mdc-ripple-upgraded--foreground-activation",FG_DEACTIVATION:"mdc-ripple-upgraded--foreground-deactivation",ROOT:"mdc-ripple-upgraded",UNBOUNDED:"mdc-ripple-upgraded--unbounded"},tt={VAR_FG_SCALE:"--mdc-ripple-fg-scale",VAR_FG_SIZE:"--mdc-ripple-fg-size",VAR_FG_TRANSLATE_END:"--mdc-ripple-fg-translate-end",VAR_FG_TRANSLATE_START:"--mdc-ripple-fg-translate-start",VAR_LEFT:"--mdc-ripple-left",VAR_TOP:"--mdc-ripple-top"},rt={DEACTIVATION_TIMEOUT_MS:225,FG_DEACTIVATION_MS:150,INITIAL_ORIGIN_SCALE:.6,PADDING:10,TAP_DELAY_MS:300},ot=["touchstart","pointerdown","mousedown","keydown"],nt=["touchend","pointerup","mouseup","contextmenu"],it=[],at=function(e){function t(r){var o=e.call(this,$e($e({},t.defaultAdapter),r))||this;return o.activationAnimationHasEnded_=!1,o.activationTimer_=0,o.fgDeactivationRemovalTimer_=0,o.fgScale_="0",o.frame_={width:0,height:0},o.initialSize_=0,o.layoutFrame_=0,o.maxRadius_=0,o.unboundedCoords_={left:0,top:0},o.activationState_=o.defaultActivationState_(),o.activationTimerCallback_=function(){o.activationAnimationHasEnded_=!0,o.runDeactivationUXLogicIfReady_()},o.activateHandler_=function(e){return o.activate_(e)},o.deactivateHandler_=function(){return o.deactivate_()},o.focusHandler_=function(){return o.handleFocus()},o.blurHandler_=function(){return o.handleBlur()},o.resizeHandler_=function(){return o.layout()},o}return function(e,t){function r(){this.constructor=e}Xe(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(t,e),Object.defineProperty(t,"cssClasses",{get:function(){return et},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return tt},enumerable:!0,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return rt},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{addClass:function(){},browserSupportsCssVars:function(){return!0},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},containsEventTarget:function(){return!0},deregisterDocumentInteractionHandler:function(){},deregisterInteractionHandler:function(){},deregisterResizeHandler:function(){},getWindowPageOffset:function(){return{x:0,y:0}},isSurfaceActive:function(){return!0},isSurfaceDisabled:function(){return!0},isUnbounded:function(){return!0},registerDocumentInteractionHandler:function(){},registerInteractionHandler:function(){},registerResizeHandler:function(){},removeClass:function(){},updateCssVariable:function(){}}},enumerable:!0,configurable:!0}),t.prototype.init=function(){var e=this,r=this.supportsPressRipple_();if(this.registerRootHandlers_(r),r){var o=t.cssClasses,n=o.ROOT,i=o.UNBOUNDED;requestAnimationFrame((function(){e.adapter.addClass(n),e.adapter.isUnbounded()&&(e.adapter.addClass(i),e.layoutInternal_())}))}},t.prototype.destroy=function(){var e=this;if(this.supportsPressRipple_()){this.activationTimer_&&(clearTimeout(this.activationTimer_),this.activationTimer_=0,this.adapter.removeClass(t.cssClasses.FG_ACTIVATION)),this.fgDeactivationRemovalTimer_&&(clearTimeout(this.fgDeactivationRemovalTimer_),this.fgDeactivationRemovalTimer_=0,this.adapter.removeClass(t.cssClasses.FG_DEACTIVATION));var r=t.cssClasses,o=r.ROOT,n=r.UNBOUNDED;requestAnimationFrame((function(){e.adapter.removeClass(o),e.adapter.removeClass(n),e.removeCssVars_()}))}this.deregisterRootHandlers_(),this.deregisterDeactivationHandlers_()},t.prototype.activate=function(e){this.activate_(e)},t.prototype.deactivate=function(){this.deactivate_()},t.prototype.layout=function(){var e=this;this.layoutFrame_&&cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=requestAnimationFrame((function(){e.layoutInternal_(),e.layoutFrame_=0}))},t.prototype.setUnbounded=function(e){var r=t.cssClasses.UNBOUNDED;e?this.adapter.addClass(r):this.adapter.removeClass(r)},t.prototype.handleFocus=function(){var e=this;requestAnimationFrame((function(){return e.adapter.addClass(t.cssClasses.BG_FOCUSED)}))},t.prototype.handleBlur=function(){var e=this;requestAnimationFrame((function(){return e.adapter.removeClass(t.cssClasses.BG_FOCUSED)}))},t.prototype.supportsPressRipple_=function(){return this.adapter.browserSupportsCssVars()},t.prototype.defaultActivationState_=function(){return{activationEvent:void 0,hasDeactivationUXRun:!1,isActivated:!1,isProgrammatic:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1}},t.prototype.registerRootHandlers_=function(e){var t=this;e&&(ot.forEach((function(e){t.adapter.registerInteractionHandler(e,t.activateHandler_)})),this.adapter.isUnbounded()&&this.adapter.registerResizeHandler(this.resizeHandler_)),this.adapter.registerInteractionHandler("focus",this.focusHandler_),this.adapter.registerInteractionHandler("blur",this.blurHandler_)},t.prototype.registerDeactivationHandlers_=function(e){var t=this;"keydown"===e.type?this.adapter.registerInteractionHandler("keyup",this.deactivateHandler_):nt.forEach((function(e){t.adapter.registerDocumentInteractionHandler(e,t.deactivateHandler_)}))},t.prototype.deregisterRootHandlers_=function(){var e=this;ot.forEach((function(t){e.adapter.deregisterInteractionHandler(t,e.activateHandler_)})),this.adapter.deregisterInteractionHandler("focus",this.focusHandler_),this.adapter.deregisterInteractionHandler("blur",this.blurHandler_),this.adapter.isUnbounded()&&this.adapter.deregisterResizeHandler(this.resizeHandler_)},t.prototype.deregisterDeactivationHandlers_=function(){var e=this;this.adapter.deregisterInteractionHandler("keyup",this.deactivateHandler_),nt.forEach((function(t){e.adapter.deregisterDocumentInteractionHandler(t,e.deactivateHandler_)}))},t.prototype.removeCssVars_=function(){var e=this,r=t.strings;Object.keys(r).forEach((function(t){0===t.indexOf("VAR_")&&e.adapter.updateCssVariable(r[t],null)}))},t.prototype.activate_=function(e){var t=this;if(!this.adapter.isSurfaceDisabled()){var r=this.activationState_;if(!r.isActivated){var o=this.previousActivationEvent_;o&&void 0!==e&&o.type!==e.type||(r.isActivated=!0,r.isProgrammatic=void 0===e,r.activationEvent=e,r.wasActivatedByPointer=!r.isProgrammatic&&void 0!==e&&("mousedown"===e.type||"touchstart"===e.type||"pointerdown"===e.type),void 0!==e&&it.length>0&&it.some((function(e){return t.adapter.containsEventTarget(e)}))?this.resetActivationState_():(void 0!==e&&(it.push(e.target),this.registerDeactivationHandlers_(e)),r.wasElementMadeActive=this.checkElementMadeActive_(e),r.wasElementMadeActive&&this.animateActivation_(),requestAnimationFrame((function(){it=[],r.wasElementMadeActive||void 0===e||" "!==e.key&&32!==e.keyCode||(r.wasElementMadeActive=t.checkElementMadeActive_(e),r.wasElementMadeActive&&t.animateActivation_()),r.wasElementMadeActive||(t.activationState_=t.defaultActivationState_())}))))}}},t.prototype.checkElementMadeActive_=function(e){return void 0===e||"keydown"!==e.type||this.adapter.isSurfaceActive()},t.prototype.animateActivation_=function(){var e=this,r=t.strings,o=r.VAR_FG_TRANSLATE_START,n=r.VAR_FG_TRANSLATE_END,i=t.cssClasses,a=i.FG_DEACTIVATION,l=i.FG_ACTIVATION,c=t.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal_();var s="",d="";if(!this.adapter.isUnbounded()){var u=this.getFgTranslationCoordinates_(),p=u.startPoint,g=u.endPoint;s=p.x+"px, "+p.y+"px",d=g.x+"px, "+g.y+"px"}this.adapter.updateCssVariable(o,s),this.adapter.updateCssVariable(n,d),clearTimeout(this.activationTimer_),clearTimeout(this.fgDeactivationRemovalTimer_),this.rmBoundedActivationClasses_(),this.adapter.removeClass(a),this.adapter.computeBoundingRect(),this.adapter.addClass(l),this.activationTimer_=setTimeout((function(){return e.activationTimerCallback_()}),c)},t.prototype.getFgTranslationCoordinates_=function(){var e,t=this.activationState_,r=t.activationEvent;return{startPoint:e={x:(e=t.wasActivatedByPointer?function(e,t,r){if(!e)return{x:0,y:0};var o,n,i=t.x,a=t.y,l=i+r.left,c=a+r.top;if("touchstart"===e.type){var s=e;o=s.changedTouches[0].pageX-l,n=s.changedTouches[0].pageY-c}else{var d=e;o=d.pageX-l,n=d.pageY-c}return{x:o,y:n}}
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
 */(r,this.adapter.getWindowPageOffset(),this.adapter.computeBoundingRect()):{x:this.frame_.width/2,y:this.frame_.height/2}).x-this.initialSize_/2,y:e.y-this.initialSize_/2},endPoint:{x:this.frame_.width/2-this.initialSize_/2,y:this.frame_.height/2-this.initialSize_/2}}},t.prototype.runDeactivationUXLogicIfReady_=function(){var e=this,r=t.cssClasses.FG_DEACTIVATION,o=this.activationState_,n=o.hasDeactivationUXRun,i=o.isActivated;(n||!i)&&this.activationAnimationHasEnded_&&(this.rmBoundedActivationClasses_(),this.adapter.addClass(r),this.fgDeactivationRemovalTimer_=setTimeout((function(){e.adapter.removeClass(r)}),rt.FG_DEACTIVATION_MS))},t.prototype.rmBoundedActivationClasses_=function(){var e=t.cssClasses.FG_ACTIVATION;this.adapter.removeClass(e),this.activationAnimationHasEnded_=!1,this.adapter.computeBoundingRect()},t.prototype.resetActivationState_=function(){var e=this;this.previousActivationEvent_=this.activationState_.activationEvent,this.activationState_=this.defaultActivationState_(),setTimeout((function(){return e.previousActivationEvent_=void 0}),t.numbers.TAP_DELAY_MS)},t.prototype.deactivate_=function(){var e=this,t=this.activationState_;if(t.isActivated){var r=$e({},t);t.isProgrammatic?(requestAnimationFrame((function(){return e.animateDeactivation_(r)})),this.resetActivationState_()):(this.deregisterDeactivationHandlers_(),requestAnimationFrame((function(){e.activationState_.hasDeactivationUXRun=!0,e.animateDeactivation_(r),e.resetActivationState_()})))}},t.prototype.animateDeactivation_=function(e){var t=e.wasActivatedByPointer,r=e.wasElementMadeActive;(t||r)&&this.runDeactivationUXLogicIfReady_()},t.prototype.layoutInternal_=function(){this.frame_=this.adapter.computeBoundingRect();var e=Math.max(this.frame_.height,this.frame_.width);this.maxRadius_=this.adapter.isUnbounded()?e:Math.sqrt(Math.pow(this.frame_.width,2)+Math.pow(this.frame_.height,2))+t.numbers.PADDING;var r=Math.floor(e*t.numbers.INITIAL_ORIGIN_SCALE);this.adapter.isUnbounded()&&r%2!=0?this.initialSize_=r-1:this.initialSize_=r,this.fgScale_=""+this.maxRadius_/this.initialSize_,this.updateLayoutCssVars_()},t.prototype.updateLayoutCssVars_=function(){var e=t.strings,r=e.VAR_FG_SIZE,o=e.VAR_LEFT,n=e.VAR_TOP,i=e.VAR_FG_SCALE;this.adapter.updateCssVariable(r,this.initialSize_+"px"),this.adapter.updateCssVariable(i,this.fgScale_),this.adapter.isUnbounded()&&(this.unboundedCoords_={left:Math.round(this.frame_.width/2-this.initialSize_/2),top:Math.round(this.frame_.height/2-this.initialSize_/2)},this.adapter.updateCssVariable(o,this.unboundedCoords_.left+"px"),this.adapter.updateCssVariable(n,this.unboundedCoords_.top+"px"))},t}(We);
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
const lt=ie`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}`
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
*/,ct=function(e,t){void 0===t&&(t=!1);var r,o=window.CSS;if("boolean"==typeof Ye&&!t)return Ye;if(!o||"function"!=typeof o.supports)return!1;var n=o.supports("--css-vars","yes"),i=o.supports("(--css-vars: yes)")&&o.supports("color","#00000000");return r=n||i,t||(Ye=r),r}();class st{constructor(e){this.foundation=e}startPress(){this.foundation.activate()}endPress(){this.foundation.deactivate()}startFocus(){this.foundation.handleFocus()}endFocus(){this.foundation.handleBlur()}destroy(){this.foundation.destroy()}setUnbounded(e){this.foundation.setUnbounded(e)}}const dt=navigator.userAgent.match(/Safari/);let ut=!1;const pt=new WeakMap,gt=f(((e={})=>t=>{const r=t.committer.element,o=e.interactionNode||r;let n=t.value;const i=pt.get(n);void 0!==i&&i!==o&&(n.destroy(),n=y),n===y?(n=(e=>{dt&&!ut&&(()=>{ut=!0;const e=document.createElement("style"),t=new E({templateFactory:N});t.appendInto(e),t.setValue(lt),t.commit(),document.head.appendChild(e)})();const t=e.surfaceNode,r=e.interactionNode||t;r.getRootNode()!==t.getRootNode()&&""===r.style.position&&(r.style.position="relative");const o=new at({browserSupportsCssVars:()=>ct,isUnbounded:()=>void 0===e.unbounded||e.unbounded,isSurfaceActive:()=>Ae(r,":active"),isSurfaceDisabled:()=>!!r.hasAttribute("disabled"),addClass:e=>t.classList.add(e),removeClass:e=>t.classList.remove(e),containsEventTarget:e=>r.contains(e),registerInteractionHandler:(e,t)=>r.addEventListener(e,t,Qe()),deregisterInteractionHandler:(e,t)=>r.removeEventListener(e,t,Qe()),registerDocumentInteractionHandler:(e,t)=>document.documentElement.addEventListener(e,t,Qe()),deregisterDocumentInteractionHandler:(e,t)=>document.documentElement.removeEventListener(e,t,Qe()),registerResizeHandler:e=>window.addEventListener("resize",e),deregisterResizeHandler:e=>window.removeEventListener("resize",e),updateCssVariable:(e,r)=>t.style.setProperty(e,r),computeBoundingRect:()=>t.getBoundingClientRect(),getWindowPageOffset:()=>({x:window.pageXOffset,y:window.pageYOffset})});return o.init(),new st(o)})(Object.assign({},e,{surfaceNode:r})),pt.set(n,o),t.setValue(n)):(void 0!==e.unbounded&&n.setUnbounded(e.unbounded),void 0!==e.disabled&&n.setUnbounded(e.disabled)),!0===e.active?n.startPress():!1===e.active&&n.endPress()}));
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
var ht=function(e,t){return(ht=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},ft=function(){return(ft=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},mt={ACTIVE:"mdc-tab--active"},yt={ARIA_SELECTED:"aria-selected",CONTENT_SELECTOR:".mdc-tab__content",INTERACTED_EVENT:"MDCTab:interacted",RIPPLE_SELECTOR:".mdc-tab__ripple",TABINDEX:"tabIndex",TAB_INDICATOR_SELECTOR:".mdc-tab-indicator"},bt=function(e){function t(r){var o=e.call(this,ft(ft({},t.defaultAdapter),r))||this;return o.focusOnActivate_=!0,o}return function(e,t){function r(){this.constructor=e}ht(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(t,e),Object.defineProperty(t,"cssClasses",{get:function(){return mt},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return yt},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setAttr:function(){},activateIndicator:function(){},deactivateIndicator:function(){},notifyInteracted:function(){},getOffsetLeft:function(){return 0},getOffsetWidth:function(){return 0},getContentOffsetLeft:function(){return 0},getContentOffsetWidth:function(){return 0},focus:function(){}}},enumerable:!0,configurable:!0}),t.prototype.handleClick=function(){this.adapter.notifyInteracted()},t.prototype.isActive=function(){return this.adapter.hasClass(mt.ACTIVE)},t.prototype.setFocusOnActivate=function(e){this.focusOnActivate_=e},t.prototype.activate=function(e){this.adapter.addClass(mt.ACTIVE),this.adapter.setAttr(yt.ARIA_SELECTED,"true"),this.adapter.setAttr(yt.TABINDEX,"0"),this.adapter.activateIndicator(e),this.focusOnActivate_&&this.adapter.focus()},t.prototype.deactivate=function(){this.isActive()&&(this.adapter.removeClass(mt.ACTIVE),this.adapter.setAttr(yt.ARIA_SELECTED,"false"),this.adapter.setAttr(yt.TABINDEX,"-1"),this.adapter.deactivateIndicator())},t.prototype.computeDimensions=function(){var e=this.adapter.getOffsetWidth(),t=this.adapter.getOffsetLeft(),r=this.adapter.getContentOffsetWidth(),o=this.adapter.getContentOffsetLeft();return{contentLeft:t+o,contentRight:t+o+r,rootLeft:t,rootRight:t+e}},t}(We);let vt=0;class wt extends ze{constructor(){super(...arguments),this.mdcFoundationClass=bt,this.label="",this.icon="",this.hasImageIcon=!1,this.isFadingIndicator=!1,this.minWidth=!1,this.isMinWidthIndicator=!1,this.indicatorIcon="",this.stacked=!1,this.focusOnActivate=!0,this._active=!1,this.initFocus=!1}get active(){return this._active}_handleClick(){this.mdcFoundation.handleClick()}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){this.dir=document.dir,super.connectedCallback()}firstUpdated(){super.firstUpdated(),this.id=this.id||"mdc-tab-"+ ++vt}render(){const e={"mdc-tab--min-width":this.minWidth,"mdc-tab--stacked":this.stacked};let t=P``;(this.hasImageIcon||this.icon)&&(t=P`
        <span class="mdc-tab__icon material-icons"><slot name="icon">${this.icon}</slot></span>`);let r=P``;this.label&&(r=P`
        <span class="mdc-tab__text-label">${this.label}</span>`);const o=gt({interactionNode:this,unbounded:!1});return P`
      <button
        @click="${this._handleClick}"
        class="mdc-tab ${Ve(e)}"
        role="tab"
        aria-selected="false"
        tabindex="-1">
        <span class="mdc-tab__content">
          ${t}
          ${r}
          ${this.isMinWidthIndicator?this.renderIndicator():""}
        </span>
        ${this.isMinWidthIndicator?"":this.renderIndicator()}
        <span class="mdc-tab__ripple" .ripple="${o}"></span>
      </button>`}renderIndicator(){return P`<mwc-tab-indicator
        .icon="${this.indicatorIcon}"
        .fade="${this.isFadingIndicator}"></mwc-tab-indicator>`}createAdapter(){return Object.assign(Object.assign({},_e(this.mdcRoot)),{setAttr:(e,t)=>this.mdcRoot.setAttribute(e,t),activateIndicator:async e=>{await this.tabIndicator.updateComplete,this.tabIndicator.activate(e)},deactivateIndicator:async()=>{await this.tabIndicator.updateComplete,this.tabIndicator.deactivate()},notifyInteracted:()=>this.dispatchEvent(new CustomEvent(bt.strings.INTERACTED_EVENT,{detail:{tabId:this.id},bubbles:!0,composed:!0,cancelable:!0})),getOffsetLeft:()=>this.offsetLeft,getOffsetWidth:()=>this.mdcRoot.offsetWidth,getContentOffsetLeft:()=>this._contentElement.offsetLeft,getContentOffsetWidth:()=>this._contentElement.offsetWidth,focus:()=>{this.initFocus?this.initFocus=!1:this.mdcRoot.focus()}})}activate(e){e||(this.initFocus=!0),this.mdcFoundation.activate(e),this.setActive(this.mdcFoundation.isActive())}deactivate(){this.mdcFoundation.deactivate(),this.setActive(this.mdcFoundation.isActive())}setActive(e){const t=this.active;t!==e&&(this._active=e,this.requestUpdate("active",t))}computeDimensions(){return this.mdcFoundation.computeDimensions()}computeIndicatorClientRect(){return this.tabIndicator.computeContentClientRect()}focus(){this.mdcRoot.focus()}}Ee([X(".mdc-tab")],wt.prototype,"mdcRoot",void 0),Ee([X("mwc-tab-indicator")],wt.prototype,"tabIndicator",void 0),Ee([Q()],wt.prototype,"label",void 0),Ee([Q()],wt.prototype,"icon",void 0),Ee([Q({type:Boolean})],wt.prototype,"hasImageIcon",void 0),Ee([Q({type:Boolean})],wt.prototype,"isFadingIndicator",void 0),Ee([Q({type:Boolean})],wt.prototype,"minWidth",void 0),Ee([Q({type:Boolean})],wt.prototype,"isMinWidthIndicator",void 0),Ee([Q({type:Boolean,reflect:!0,attribute:"active"})],wt.prototype,"active",null),Ee([Q()],wt.prototype,"indicatorIcon",void 0),Ee([Q({type:Boolean})],wt.prototype,"stacked",void 0),Ee([Ge((async function(e){await this.updateComplete,this.mdcFoundation.setFocusOnActivate(e)})),Q({type:Boolean})],wt.prototype,"focusOnActivate",void 0),Ee([X(".mdc-tab__content")],wt.prototype,"_contentElement",void 0);
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
const kt=ie`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-tab{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);padding-right:24px;padding-left:24px;position:relative;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;background:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab .mdc-tab__text-label{color:rgba(0, 0, 0, 0.6)}.mdc-tab .mdc-tab__icon{color:rgba(0, 0, 0, 0.54);fill:currentColor}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{position:relative;display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;width:24px;height:24px;font-size:24px;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-tab--active .mdc-tab__icon{color:#6200ee;color:var(--mdc-theme-primary, #6200ee);fill:currentColor}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-tab__ripple{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden}.mdc-tab__ripple::before,.mdc-tab__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-tab__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-tab__ripple.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-tab__ripple.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-tab__ripple.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-tab__ripple.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-tab__ripple.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-tab__ripple::before,.mdc-tab__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-tab__ripple.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-tab__ripple::before,.mdc-tab__ripple::after{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-tab__ripple:hover::before{opacity:.04}.mdc-tab__ripple.mdc-ripple-upgraded--background-focused::before,.mdc-tab__ripple:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-tab__ripple:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-tab__ripple:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-tab__ripple.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}:host{outline:none;flex:1 0 auto;display:flex;justify-content:center}.mdc-tab{height:var(--mdc-tab-height, 48px);margin-left:0;margin-right:0;padding-right:var(--mdc-tab-horizontal-padding, 24px);padding-left:var(--mdc-tab-horizontal-padding, 24px)}.mdc-tab--stacked{height:var(--mdc-tab-stacked-height, 72px)}.mdc-tab::-moz-focus-inner{border:0}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mdc-tab-text-label-color-default, rgba(0, 0, 0, 0.6))}.mdc-tab:not(.mdc-tab--active) .mdc-tab__icon{color:var(--mdc-tab-color-default, rgba(0, 0, 0, 0.54))}`;let Ct=class extends wt{};
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
function xt(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(t,r,a):n(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a
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
***************************************************************************** */}Ct.styles=kt,Ct=Ee([q("mwc-tab")],Ct);var St=function(e,t){return(St=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};function Tt(e,t){function r(){this.constructor=e}St(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var Lt=function(){return(Lt=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},Et={ANIMATING:"mdc-tab-scroller--animating",SCROLL_AREA_SCROLL:"mdc-tab-scroller__scroll-area--scroll",SCROLL_TEST:"mdc-tab-scroller__test"},Ot={AREA_SELECTOR:".mdc-tab-scroller__scroll-area",CONTENT_SELECTOR:".mdc-tab-scroller__scroll-content"},At=function(e){this.adapter=e},_t=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return Tt(t,e),t.prototype.getScrollPositionRTL=function(){var e=this.adapter.getScrollAreaScrollLeft(),t=this.calculateScrollEdges_().right;return Math.round(t-e)},t.prototype.scrollToRTL=function(e){var t=this.calculateScrollEdges_(),r=this.adapter.getScrollAreaScrollLeft(),o=this.clampScrollValue_(t.right-e);return{finalScrollPosition:o,scrollDelta:o-r}},t.prototype.incrementScrollRTL=function(e){var t=this.adapter.getScrollAreaScrollLeft(),r=this.clampScrollValue_(t-e);return{finalScrollPosition:r,scrollDelta:r-t}},t.prototype.getAnimatingScrollPosition=function(e){return e},t.prototype.calculateScrollEdges_=function(){return{left:0,right:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth()}},t.prototype.clampScrollValue_=function(e){var t=this.calculateScrollEdges_();return Math.min(Math.max(t.left,e),t.right)},t}(At),Mt=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return Tt(t,e),t.prototype.getScrollPositionRTL=function(e){var t=this.adapter.getScrollAreaScrollLeft();return Math.round(e-t)},t.prototype.scrollToRTL=function(e){var t=this.adapter.getScrollAreaScrollLeft(),r=this.clampScrollValue_(-e);return{finalScrollPosition:r,scrollDelta:r-t}},t.prototype.incrementScrollRTL=function(e){var t=this.adapter.getScrollAreaScrollLeft(),r=this.clampScrollValue_(t-e);return{finalScrollPosition:r,scrollDelta:r-t}},t.prototype.getAnimatingScrollPosition=function(e,t){return e-t},t.prototype.calculateScrollEdges_=function(){var e=this.adapter.getScrollContentOffsetWidth();return{left:this.adapter.getScrollAreaOffsetWidth()-e,right:0}},t.prototype.clampScrollValue_=function(e){var t=this.calculateScrollEdges_();return Math.max(Math.min(t.right,e),t.left)},t}(At),Rt=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return Tt(t,e),t.prototype.getScrollPositionRTL=function(e){var t=this.adapter.getScrollAreaScrollLeft();return Math.round(t-e)},t.prototype.scrollToRTL=function(e){var t=this.adapter.getScrollAreaScrollLeft(),r=this.clampScrollValue_(e);return{finalScrollPosition:r,scrollDelta:t-r}},t.prototype.incrementScrollRTL=function(e){var t=this.adapter.getScrollAreaScrollLeft(),r=this.clampScrollValue_(t+e);return{finalScrollPosition:r,scrollDelta:t-r}},t.prototype.getAnimatingScrollPosition=function(e,t){return e+t},t.prototype.calculateScrollEdges_=function(){return{left:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth(),right:0}},t.prototype.clampScrollValue_=function(e){var t=this.calculateScrollEdges_();return Math.min(Math.max(t.right,e),t.left)},t}(At),zt=function(e){function t(r){var o=e.call(this,Lt(Lt({},t.defaultAdapter),r))||this;return o.isAnimating_=!1,o}return Tt(t,e),Object.defineProperty(t,"cssClasses",{get:function(){return Et},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return Ot},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{eventTargetMatchesSelector:function(){return!1},addClass:function(){},removeClass:function(){},addScrollAreaClass:function(){},setScrollAreaStyleProperty:function(){},setScrollContentStyleProperty:function(){},getScrollContentStyleValue:function(){return""},setScrollAreaScrollLeft:function(){},getScrollAreaScrollLeft:function(){return 0},getScrollContentOffsetWidth:function(){return 0},getScrollAreaOffsetWidth:function(){return 0},computeScrollAreaClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeScrollContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeHorizontalScrollbarHeight:function(){return 0}}},enumerable:!0,configurable:!0}),t.prototype.init=function(){var e=this.adapter.computeHorizontalScrollbarHeight();this.adapter.setScrollAreaStyleProperty("margin-bottom",-e+"px"),this.adapter.addScrollAreaClass(t.cssClasses.SCROLL_AREA_SCROLL)},t.prototype.getScrollPosition=function(){if(this.isRTL_())return this.computeCurrentScrollPositionRTL_();var e=this.calculateCurrentTranslateX_();return this.adapter.getScrollAreaScrollLeft()-e},t.prototype.handleInteraction=function(){this.isAnimating_&&this.stopScrollAnimation_()},t.prototype.handleTransitionEnd=function(e){var r=e.target;this.isAnimating_&&this.adapter.eventTargetMatchesSelector(r,t.strings.CONTENT_SELECTOR)&&(this.isAnimating_=!1,this.adapter.removeClass(t.cssClasses.ANIMATING))},t.prototype.incrementScroll=function(e){0!==e&&this.animate_(this.getIncrementScrollOperation_(e))},t.prototype.incrementScrollImmediate=function(e){if(0!==e){var t=this.getIncrementScrollOperation_(e);0!==t.scrollDelta&&(this.stopScrollAnimation_(),this.adapter.setScrollAreaScrollLeft(t.finalScrollPosition))}},t.prototype.scrollTo=function(e){if(this.isRTL_())return this.scrollToRTL_(e);this.scrollTo_(e)},t.prototype.getRTLScroller=function(){return this.rtlScrollerInstance_||(this.rtlScrollerInstance_=this.rtlScrollerFactory_()),this.rtlScrollerInstance_},t.prototype.calculateCurrentTranslateX_=function(){var e=this.adapter.getScrollContentStyleValue("transform");if("none"===e)return 0;var t=/\((.+?)\)/.exec(e);if(!t)return 0;var r=function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var o,n,i=r.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(o=i.next()).done;)a.push(o.value)}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}return a}
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
 */(t[1].split(","),6),o=(r[0],r[1],r[2],r[3],r[4]);return r[5],parseFloat(o)},t.prototype.clampScrollValue_=function(e){var t=this.calculateScrollEdges_();return Math.min(Math.max(t.left,e),t.right)},t.prototype.computeCurrentScrollPositionRTL_=function(){var e=this.calculateCurrentTranslateX_();return this.getRTLScroller().getScrollPositionRTL(e)},t.prototype.calculateScrollEdges_=function(){return{left:0,right:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth()}},t.prototype.scrollTo_=function(e){var t=this.getScrollPosition(),r=this.clampScrollValue_(e),o=r-t;this.animate_({finalScrollPosition:r,scrollDelta:o})},t.prototype.scrollToRTL_=function(e){var t=this.getRTLScroller().scrollToRTL(e);this.animate_(t)},t.prototype.getIncrementScrollOperation_=function(e){if(this.isRTL_())return this.getRTLScroller().incrementScrollRTL(e);var t=this.getScrollPosition(),r=e+t,o=this.clampScrollValue_(r);return{finalScrollPosition:o,scrollDelta:o-t}},t.prototype.animate_=function(e){var r=this;0!==e.scrollDelta&&(this.stopScrollAnimation_(),this.adapter.setScrollAreaScrollLeft(e.finalScrollPosition),this.adapter.setScrollContentStyleProperty("transform","translateX("+e.scrollDelta+"px)"),this.adapter.computeScrollAreaClientRect(),requestAnimationFrame((function(){r.adapter.addClass(t.cssClasses.ANIMATING),r.adapter.setScrollContentStyleProperty("transform","none")})),this.isAnimating_=!0)},t.prototype.stopScrollAnimation_=function(){this.isAnimating_=!1;var e=this.getAnimatingScrollPosition_();this.adapter.removeClass(t.cssClasses.ANIMATING),this.adapter.setScrollContentStyleProperty("transform","translateX(0px)"),this.adapter.setScrollAreaScrollLeft(e)},t.prototype.getAnimatingScrollPosition_=function(){var e=this.calculateCurrentTranslateX_(),t=this.adapter.getScrollAreaScrollLeft();return this.isRTL_()?this.getRTLScroller().getAnimatingScrollPosition(t,e):t-e},t.prototype.rtlScrollerFactory_=function(){var e=this.adapter.getScrollAreaScrollLeft();this.adapter.setScrollAreaScrollLeft(e-1);var t=this.adapter.getScrollAreaScrollLeft();if(t<0)return this.adapter.setScrollAreaScrollLeft(e),new Mt(this.adapter);var r=this.adapter.computeScrollAreaClientRect(),o=this.adapter.computeScrollContentClientRect(),n=Math.round(o.right-r.right);return this.adapter.setScrollAreaScrollLeft(e),n===t?new Rt(this.adapter):new _t(this.adapter)},t.prototype.isRTL_=function(){return"rtl"===this.adapter.getScrollContentStyleValue("direction")},t}(We);class Nt extends ze{constructor(){super(...arguments),this.mdcFoundationClass=zt,this._scrollbarHeight=-1}_handleInteraction(){this.mdcFoundation.handleInteraction()}_handleTransitionEnd(e){this.mdcFoundation.handleTransitionEnd(e)}render(){return P`
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
      `}createAdapter(){return Object.assign(Object.assign({},_e(this.mdcRoot)),{eventTargetMatchesSelector:(e,t)=>Ae(e,t),addScrollAreaClass:e=>this.scrollAreaElement.classList.add(e),setScrollAreaStyleProperty:(e,t)=>this.scrollAreaElement.style.setProperty(e,t),setScrollContentStyleProperty:(e,t)=>this.scrollContentElement.style.setProperty(e,t),getScrollContentStyleValue:e=>window.getComputedStyle(this.scrollContentElement).getPropertyValue(e),setScrollAreaScrollLeft:e=>this.scrollAreaElement.scrollLeft=e,getScrollAreaScrollLeft:()=>this.scrollAreaElement.scrollLeft,getScrollContentOffsetWidth:()=>this.scrollContentElement.offsetWidth,getScrollAreaOffsetWidth:()=>this.scrollAreaElement.offsetWidth,computeScrollAreaClientRect:()=>this.scrollAreaElement.getBoundingClientRect(),computeScrollContentClientRect:()=>this.scrollContentElement.getBoundingClientRect(),computeHorizontalScrollbarHeight:()=>(-1===this._scrollbarHeight&&(this.scrollAreaElement.style.overflowX="scroll",this._scrollbarHeight=this.scrollAreaElement.offsetHeight-this.scrollAreaElement.clientHeight,this.scrollAreaElement.style.overflowX=""),this._scrollbarHeight)})}getScrollPosition(){return this.mdcFoundation.getScrollPosition()}getScrollContentWidth(){return this.scrollContentElement.offsetWidth}incrementScrollPosition(e){this.mdcFoundation.incrementScroll(e)}scrollToPosition(e){this.mdcFoundation.scrollTo(e)}}xt([X(".mdc-tab-scroller")],Nt.prototype,"mdcRoot",void 0),xt([X(".mdc-tab-scroller__scroll-area")],Nt.prototype,"scrollAreaElement",void 0),xt([X(".mdc-tab-scroller__scroll-content")],Nt.prototype,"scrollContentElement",void 0),xt([te({passive:!0})],Nt.prototype,"_handleInteraction",null);
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
const Ft=ie`.mdc-tab-scroller{overflow-y:hidden}.mdc-tab-scroller.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-scroller__test{position:absolute;top:-9999px;width:100px;height:100px;overflow-x:scroll}.mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:touch;display:flex;overflow-x:hidden}.mdc-tab-scroller__scroll-area::-webkit-scrollbar,.mdc-tab-scroller__test::-webkit-scrollbar{display:none}.mdc-tab-scroller__scroll-area--scroll{overflow-x:scroll}.mdc-tab-scroller__scroll-content{position:relative;display:flex;flex:1 0 auto;transform:none;will-change:transform}.mdc-tab-scroller--align-start .mdc-tab-scroller__scroll-content{justify-content:flex-start}.mdc-tab-scroller--align-end .mdc-tab-scroller__scroll-content{justify-content:flex-end}.mdc-tab-scroller--align-center .mdc-tab-scroller__scroll-content{justify-content:center}.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:auto}:host{display:flex}.mdc-tab-scroller{flex:1}`;let It=class extends Nt{};It.styles=Ft,It=xt([q("mwc-tab-scroller")],It);
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
var Wt=function(e,t){return(Wt=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},Pt=function(){return(Pt=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},Kt={ARROW_LEFT_KEY:"ArrowLeft",ARROW_RIGHT_KEY:"ArrowRight",END_KEY:"End",ENTER_KEY:"Enter",HOME_KEY:"Home",SPACE_KEY:"Space",TAB_ACTIVATED_EVENT:"MDCTabBar:activated",TAB_SCROLLER_SELECTOR:".mdc-tab-scroller",TAB_SELECTOR:".mdc-tab"},Ut={ARROW_LEFT_KEYCODE:37,ARROW_RIGHT_KEYCODE:39,END_KEYCODE:35,ENTER_KEYCODE:13,EXTRA_SCROLL_AMOUNT:20,HOME_KEYCODE:36,SPACE_KEYCODE:32},Bt=new Set;Bt.add(Kt.ARROW_LEFT_KEY),Bt.add(Kt.ARROW_RIGHT_KEY),Bt.add(Kt.END_KEY),Bt.add(Kt.HOME_KEY),Bt.add(Kt.ENTER_KEY),Bt.add(Kt.SPACE_KEY);var Dt=new Map;Dt.set(Ut.ARROW_LEFT_KEYCODE,Kt.ARROW_LEFT_KEY),Dt.set(Ut.ARROW_RIGHT_KEYCODE,Kt.ARROW_RIGHT_KEY),Dt.set(Ut.END_KEYCODE,Kt.END_KEY),Dt.set(Ut.HOME_KEYCODE,Kt.HOME_KEY),Dt.set(Ut.ENTER_KEYCODE,Kt.ENTER_KEY),Dt.set(Ut.SPACE_KEYCODE,Kt.SPACE_KEY);var jt=function(e){function t(r){var o=e.call(this,Pt(Pt({},t.defaultAdapter),r))||this;return o.useAutomaticActivation_=!1,o}return function(e,t){function r(){this.constructor=e}Wt(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(t,e),Object.defineProperty(t,"strings",{get:function(){return Kt},enumerable:!0,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return Ut},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{scrollTo:function(){},incrementScroll:function(){},getScrollPosition:function(){return 0},getScrollContentWidth:function(){return 0},getOffsetWidth:function(){return 0},isRTL:function(){return!1},setActiveTab:function(){},activateTabAtIndex:function(){},deactivateTabAtIndex:function(){},focusTabAtIndex:function(){},getTabIndicatorClientRectAtIndex:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},getTabDimensionsAtIndex:function(){return{rootLeft:0,rootRight:0,contentLeft:0,contentRight:0}},getPreviousActiveTabIndex:function(){return-1},getFocusedTabIndex:function(){return-1},getIndexOfTabById:function(){return-1},getTabListLength:function(){return 0},notifyTabActivated:function(){}}},enumerable:!0,configurable:!0}),t.prototype.setUseAutomaticActivation=function(e){this.useAutomaticActivation_=e},t.prototype.activateTab=function(e){var t,r=this.adapter.getPreviousActiveTabIndex();this.indexIsInRange_(e)&&e!==r&&(-1!==r&&(this.adapter.deactivateTabAtIndex(r),t=this.adapter.getTabIndicatorClientRectAtIndex(r)),this.adapter.activateTabAtIndex(e,t),this.scrollIntoView(e),this.adapter.notifyTabActivated(e))},t.prototype.handleKeyDown=function(e){var t=this.getKeyFromEvent_(e);if(void 0!==t)if(this.isActivationKey_(t)||e.preventDefault(),this.useAutomaticActivation_){if(this.isActivationKey_(t))return;var r=this.determineTargetFromKey_(this.adapter.getPreviousActiveTabIndex(),t);this.adapter.setActiveTab(r),this.scrollIntoView(r)}else{var o=this.adapter.getFocusedTabIndex();this.isActivationKey_(t)?this.adapter.setActiveTab(o):(r=this.determineTargetFromKey_(o,t),this.adapter.focusTabAtIndex(r),this.scrollIntoView(r))}},t.prototype.handleTabInteraction=function(e){this.adapter.setActiveTab(this.adapter.getIndexOfTabById(e.detail.tabId))},t.prototype.scrollIntoView=function(e){if(this.indexIsInRange_(e))return 0===e?this.adapter.scrollTo(0):e===this.adapter.getTabListLength()-1?this.adapter.scrollTo(this.adapter.getScrollContentWidth()):this.isRTL_()?this.scrollIntoViewRTL_(e):void this.scrollIntoView_(e)},t.prototype.determineTargetFromKey_=function(e,t){var r=this.isRTL_(),o=this.adapter.getTabListLength()-1,n=e;return t===Kt.END_KEY?n=o:t===Kt.ARROW_LEFT_KEY&&!r||t===Kt.ARROW_RIGHT_KEY&&r?n-=1:t===Kt.ARROW_RIGHT_KEY&&!r||t===Kt.ARROW_LEFT_KEY&&r?n+=1:n=0,n<0?n=o:n>o&&(n=0),n},t.prototype.calculateScrollIncrement_=function(e,t,r,o){var n=this.adapter.getTabDimensionsAtIndex(t),i=n.contentLeft-r-o,a=n.contentRight-r,l=i+Ut.EXTRA_SCROLL_AMOUNT;return t<e?Math.min(a-Ut.EXTRA_SCROLL_AMOUNT,0):Math.max(l,0)},t.prototype.calculateScrollIncrementRTL_=function(e,t,r,o,n){var i=this.adapter.getTabDimensionsAtIndex(t),a=n-i.contentLeft-r,l=n-i.contentRight-r-o,c=a-Ut.EXTRA_SCROLL_AMOUNT;return t>e?Math.max(l+Ut.EXTRA_SCROLL_AMOUNT,0):Math.min(c,0)},t.prototype.findAdjacentTabIndexClosestToEdge_=function(e,t,r,o){var n=t.rootLeft-r,i=t.rootRight-r-o,a=n+i;return n<0||a<0?e-1:i>0||a>0?e+1:-1},t.prototype.findAdjacentTabIndexClosestToEdgeRTL_=function(e,t,r,o,n){var i=n-t.rootLeft-o-r,a=n-t.rootRight-r,l=i+a;return i>0||l>0?e+1:a<0||l<0?e-1:-1},t.prototype.getKeyFromEvent_=function(e){return Bt.has(e.key)?e.key:Dt.get(e.keyCode)},t.prototype.isActivationKey_=function(e){return e===Kt.SPACE_KEY||e===Kt.ENTER_KEY},t.prototype.indexIsInRange_=function(e){return e>=0&&e<this.adapter.getTabListLength()},t.prototype.isRTL_=function(){return this.adapter.isRTL()},t.prototype.scrollIntoView_=function(e){var t=this.adapter.getScrollPosition(),r=this.adapter.getOffsetWidth(),o=this.adapter.getTabDimensionsAtIndex(e),n=this.findAdjacentTabIndexClosestToEdge_(e,o,t,r);if(this.indexIsInRange_(n)){var i=this.calculateScrollIncrement_(e,n,t,r);this.adapter.incrementScroll(i)}},t.prototype.scrollIntoViewRTL_=function(e){var t=this.adapter.getScrollPosition(),r=this.adapter.getOffsetWidth(),o=this.adapter.getTabDimensionsAtIndex(e),n=this.adapter.getScrollContentWidth(),i=this.findAdjacentTabIndexClosestToEdgeRTL_(e,o,t,r,n);if(this.indexIsInRange_(i)){var a=this.calculateScrollIncrementRTL_(e,i,t,r,n);this.adapter.incrementScroll(a)}},t}(We);class Ht extends ze{constructor(){super(...arguments),this.mdcFoundationClass=jt,this.activeIndex=0,this._previousActiveIndex=-1}_handleTabInteraction(e){this.mdcFoundation.handleTabInteraction(e)}_handleKeydown(e){this.mdcFoundation.handleKeyDown(e)}render(){return P`
      <div class="mdc-tab-bar" role="tablist"
          @MDCTab:interacted="${this._handleTabInteraction}"
          @keydown="${this._handleKeydown}">
        <mwc-tab-scroller><slot></slot></mwc-tab-scroller>
      </div>
      `}_getTabs(){return this.tabsSlot.assignedNodes({flatten:!0}).filter((e=>e instanceof Ct))}_getTab(e){return this._getTabs()[e]}createAdapter(){return{scrollTo:e=>this.scrollerElement.scrollToPosition(e),incrementScroll:e=>this.scrollerElement.incrementScrollPosition(e),getScrollPosition:()=>this.scrollerElement.getScrollPosition(),getScrollContentWidth:()=>this.scrollerElement.getScrollContentWidth(),getOffsetWidth:()=>this.mdcRoot.offsetWidth,isRTL:()=>"rtl"===window.getComputedStyle(this.mdcRoot).getPropertyValue("direction"),setActiveTab:e=>this.mdcFoundation.activateTab(e),activateTabAtIndex:(e,t)=>{const r=this._getTab(e);void 0!==r&&r.activate(t),this._previousActiveIndex=e},deactivateTabAtIndex:e=>{const t=this._getTab(e);void 0!==t&&t.deactivate()},focusTabAtIndex:e=>{const t=this._getTab(e);void 0!==t&&t.focus()},getTabIndicatorClientRectAtIndex:e=>{const t=this._getTab(e);return void 0!==t?t.computeIndicatorClientRect():new DOMRect},getTabDimensionsAtIndex:e=>{const t=this._getTab(e);return void 0!==t?t.computeDimensions():{rootLeft:0,rootRight:0,contentLeft:0,contentRight:0}},getPreviousActiveTabIndex:()=>this._previousActiveIndex,getFocusedTabIndex:()=>{const e=this._getTabs(),t=this.getRootNode().activeElement;return e.indexOf(t)},getIndexOfTabById:e=>{const t=this._getTabs();for(let r=0;r<t.length;r++)if(t[r].id===e)return r;return-1},getTabListLength:()=>this._getTabs().length,notifyTabActivated:e=>{this.activeIndex=e,this.dispatchEvent(new CustomEvent(jt.strings.TAB_ACTIVATED_EVENT,{detail:{index:e},bubbles:!0,cancelable:!0}))}}}firstUpdated(){}_getUpdateComplete(){return super._getUpdateComplete().then((()=>this.scrollerElement.updateComplete)).then((()=>{void 0===this.mdcFoundation&&this.createFoundation()}))}scrollIndexIntoView(e){this.mdcFoundation.scrollIntoView(e)}}Le([X(".mdc-tab-bar")],Ht.prototype,"mdcRoot",void 0),Le([X("mwc-tab-scroller")],Ht.prototype,"scrollerElement",void 0),Le([X("slot")],Ht.prototype,"tabsSlot",void 0),Le([Ge((async function(){await this.updateComplete,this.activeIndex!==this._previousActiveIndex&&this.mdcFoundation.activateTab(this.activeIndex)})),Q({type:Number})],Ht.prototype,"activeIndex",void 0);
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
const Vt=ie`.mdc-tab-bar{width:100%}.mdc-tab{height:48px}.mdc-tab--stacked{height:72px}:host{display:block}.mdc-tab-bar{flex:1}mwc-tab{--mdc-tab-height: 48px;--mdc-tab-stacked-height: 72px}`;let Zt=class extends Ht{};
/* @license CodeMirror, copyright (c) by Marijn Haverbeke and others
Distributed under an MIT license: https://codemirror.net/LICENSE */
var Jt;function qt(e,t,r,o,n,i){this.name=e,this.tokenType=t,this.depth=r,this.parent=o,this.startLine=n,this.startPos=i}function Gt(){this.stream=null,this.line=this.startPos=0,this.string=this.startLine="",this.copyInstance=null}Zt.styles=Vt,Zt=Le([q("mwc-tab-bar")],Zt),Jt=function(){var e=navigator.userAgent,t=navigator.platform,r=/gecko\/\d/i.test(e),o=/MSIE \d/.test(e),n=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),i=/Edge\/(\d+)/.exec(e),a=o||n||i,l=a&&(o?document.documentMode||6:+(i||n)[1]),c=!i&&/WebKit\//.test(e),s=c&&/Qt\/\d+\.\d+/.test(e),d=!i&&/Chrome\//.test(e),u=/Opera\//.test(e),p=/Apple Computer/.test(navigator.vendor),g=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),h=/PhantomJS/.test(e),f=!i&&/AppleWebKit/.test(e)&&/Mobile\/\w+/.test(e),m=/Android/.test(e),y=f||m||/webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),b=f||/Mac/.test(t),v=/\bCrOS\b/.test(e),w=/win/i.test(t),k=u&&e.match(/Version\/(\d*\.\d*)/);k&&(k=Number(k[1])),k&&k>=15&&(u=!1,c=!0);var C=b&&(s||u&&(null==k||k<12.11)),x=r||a&&l>=9;function S(e){return RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}var T,L=function(e,t){var r=e.className,o=S(t).exec(r);if(o){var n=r.slice(o.index+o[0].length);e.className=r.slice(0,o.index)+(n?o[1]+n:"")}};function E(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild);return e}function O(e,t){return E(e).appendChild(t)}function A(e,t,r,o){var n=document.createElement(e);if(r&&(n.className=r),o&&(n.style.cssText=o),"string"==typeof t)n.appendChild(document.createTextNode(t));else if(t)for(var i=0;i<t.length;++i)n.appendChild(t[i]);return n}function _(e,t,r,o){var n=A(e,t,r,o);return n.setAttribute("role","presentation"),n}function M(e,t){if(3==t.nodeType&&(t=t.parentNode),e.contains)return e.contains(t);do{if(11==t.nodeType&&(t=t.host),t==e)return!0}while(t=t.parentNode)}function R(){var e;try{e=document.activeElement}catch(t){e=document.body||null}for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function z(e,t){var r=e.className;S(t).test(r)||(e.className+=(r?" ":"")+t)}function N(e,t){for(var r=e.split(" "),o=0;o<r.length;o++)r[o]&&!S(r[o]).test(t)&&(t+=" "+r[o]);return t}T=document.createRange?function(e,t,r,o){var n=document.createRange();return n.setEnd(o||e,r),n.setStart(e,t),n}:function(e,t,r){var o=document.body.createTextRange();try{o.moveToElementText(e.parentNode)}catch(e){return o}return o.collapse(!0),o.moveEnd("character",r),o.moveStart("character",t),o};var F=function(e){e.select()};function I(e){var t=Array.prototype.slice.call(arguments,1);return function(){return e.apply(null,t)}}function W(e,t,r){for(var o in t||(t={}),e)!e.hasOwnProperty(o)||!1===r&&t.hasOwnProperty(o)||(t[o]=e[o]);return t}function P(e,t,r,o,n){null==t&&-1==(t=e.search(/[^\s\u00a0]/))&&(t=e.length);for(var i=o||0,a=n||0;;){var l=e.indexOf("\t",i);if(l<0||l>=t)return a+(t-i);a+=l-i,a+=r-a%r,i=l+1}}f?F=function(e){e.selectionStart=0,e.selectionEnd=e.value.length}:a&&(F=function(e){try{e.select()}catch(e){}});var K=function(){this.id=null,this.f=null,this.time=0,this.handler=I(this.onTimeout,this)};function U(e,t){for(var r=0;r<e.length;++r)if(e[r]==t)return r;return-1}K.prototype.onTimeout=function(e){e.id=0,e.time<=+new Date?e.f():setTimeout(e.handler,e.time-+new Date)},K.prototype.set=function(e,t){this.f=t;var r=+new Date+e;(!this.id||r<this.time)&&(clearTimeout(this.id),this.id=setTimeout(this.handler,e),this.time=r)};var B={toString:function(){return"CodeMirror.Pass"}},D={scroll:!1},j={origin:"*mouse"},H={origin:"+move"};function V(e,t,r){for(var o=0,n=0;;){var i=e.indexOf("\t",o);-1==i&&(i=e.length);var a=i-o;if(i==e.length||n+a>=t)return o+Math.min(a,t-n);if(n+=i-o,o=i+1,(n+=r-n%r)>=t)return o}}var Z=[""];function J(e){for(;Z.length<=e;)Z.push(q(Z)+" ");return Z[e]}function q(e){return e[e.length-1]}function G(e,t){for(var r=[],o=0;o<e.length;o++)r[o]=t(e[o],o);return r}function Q(){}function Y(e,t){var r;return Object.create?r=Object.create(e):(Q.prototype=e,r=new Q),t&&W(t,r),r}var X=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;function $(e){return/\w/.test(e)||e>""&&(e.toUpperCase()!=e.toLowerCase()||X.test(e))}function ee(e,t){return t?!!(t.source.indexOf("\\w")>-1&&$(e))||t.test(e):$(e)}function te(e){for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!1;return!0}var re=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;function oe(e){return e.charCodeAt(0)>=768&&re.test(e)}function ne(e,t,r){for(;(r<0?t>0:t<e.length)&&oe(e.charAt(t));)t+=r;return t}function ie(e,t,r){for(var o=t>r?-1:1;;){if(t==r)return t;var n=(t+r)/2,i=o<0?Math.ceil(n):Math.floor(n);if(i==t)return e(i)?t:r;e(i)?r=i:t=i+o}}var ae=null;function le(e,t,r){var o;ae=null;for(var n=0;n<e.length;++n){var i=e[n];if(i.from<t&&i.to>t)return n;i.to==t&&(i.from!=i.to&&"before"==r?o=n:ae=n),i.from==t&&(i.from!=i.to&&"before"!=r?o=n:ae=n)}return null!=o?o:ae}var ce=function(){var e=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,t=/[stwN]/,r=/[LRr]/,o=/[Lb1n]/,n=/[1n]/;function i(e,t,r){this.level=e,this.from=t,this.to=r}return function(a,l){var c="ltr"==l?"L":"R";if(0==a.length||"ltr"==l&&!e.test(a))return!1;for(var s,d=a.length,u=[],p=0;p<d;++p)u.push((s=a.charCodeAt(p))<=247?"bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(s):1424<=s&&s<=1524?"R":1536<=s&&s<=1785?"nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(s-1536):1774<=s&&s<=2220?"r":8192<=s&&s<=8203?"w":8204==s?"b":"L");for(var g=0,h=c;g<d;++g){var f=u[g];"m"==f?u[g]=h:h=f}for(var m=0,y=c;m<d;++m){var b=u[m];"1"==b&&"r"==y?u[m]="n":r.test(b)&&(y=b,"r"==b&&(u[m]="R"))}for(var v=1,w=u[0];v<d-1;++v){var k=u[v];"+"==k&&"1"==w&&"1"==u[v+1]?u[v]="1":","!=k||w!=u[v+1]||"1"!=w&&"n"!=w||(u[v]=w),w=k}for(var C=0;C<d;++C){var x=u[C];if(","==x)u[C]="N";else if("%"==x){var S=void 0;for(S=C+1;S<d&&"%"==u[S];++S);for(var T=C&&"!"==u[C-1]||S<d&&"1"==u[S]?"1":"N",L=C;L<S;++L)u[L]=T;C=S-1}}for(var E=0,O=c;E<d;++E){var A=u[E];"L"==O&&"1"==A?u[E]="L":r.test(A)&&(O=A)}for(var _=0;_<d;++_)if(t.test(u[_])){var M=void 0;for(M=_+1;M<d&&t.test(u[M]);++M);for(var R="L"==(_?u[_-1]:c),z=R==("L"==(M<d?u[M]:c))?R?"L":"R":c,N=_;N<M;++N)u[N]=z;_=M-1}for(var F,I=[],W=0;W<d;)if(o.test(u[W])){var P=W;for(++W;W<d&&o.test(u[W]);++W);I.push(new i(0,P,W))}else{var K=W,U=I.length,B="rtl"==l?1:0;for(++W;W<d&&"L"!=u[W];++W);for(var D=K;D<W;)if(n.test(u[D])){K<D&&(I.splice(U,0,new i(1,K,D)),U+=B);var j=D;for(++D;D<W&&n.test(u[D]);++D);I.splice(U,0,new i(2,j,D)),U+=B,K=D}else++D;K<W&&I.splice(U,0,new i(1,K,W))}return"ltr"==l&&(1==I[0].level&&(F=a.match(/^\s+/))&&(I[0].from=F[0].length,I.unshift(new i(0,0,F[0].length))),1==q(I).level&&(F=a.match(/\s+$/))&&(q(I).to-=F[0].length,I.push(new i(0,d-F[0].length,d)))),"rtl"==l?I.reverse():I}}();function se(e,t){var r=e.order;return null==r&&(r=e.order=ce(e.text,t)),r}var de=[],ue=function(e,t,r){if(e.addEventListener)e.addEventListener(t,r,!1);else if(e.attachEvent)e.attachEvent("on"+t,r);else{var o=e._handlers||(e._handlers={});o[t]=(o[t]||de).concat(r)}};function pe(e,t){return e._handlers&&e._handlers[t]||de}function ge(e,t,r){if(e.removeEventListener)e.removeEventListener(t,r,!1);else if(e.detachEvent)e.detachEvent("on"+t,r);else{var o=e._handlers,n=o&&o[t];if(n){var i=U(n,r);i>-1&&(o[t]=n.slice(0,i).concat(n.slice(i+1)))}}}function he(e,t){var r=pe(e,t);if(r.length)for(var o=Array.prototype.slice.call(arguments,2),n=0;n<r.length;++n)r[n].apply(null,o)}function fe(e,t,r){return"string"==typeof t&&(t={type:t,preventDefault:function(){this.defaultPrevented=!0}}),he(e,r||t.type,e,t),ke(t)||t.codemirrorIgnore}function me(e){var t=e._handlers&&e._handlers.cursorActivity;if(t)for(var r=e.curOp.cursorActivityHandlers||(e.curOp.cursorActivityHandlers=[]),o=0;o<t.length;++o)-1==U(r,t[o])&&r.push(t[o])}function ye(e,t){return pe(e,t).length>0}function be(e){e.prototype.on=function(e,t){ue(this,e,t)},e.prototype.off=function(e,t){ge(this,e,t)}}function ve(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function we(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}function ke(e){return null!=e.defaultPrevented?e.defaultPrevented:0==e.returnValue}function Ce(e){ve(e),we(e)}function xe(e){return e.target||e.srcElement}function Se(e){var t=e.which;return null==t&&(1&e.button?t=1:2&e.button?t=3:4&e.button&&(t=2)),b&&e.ctrlKey&&1==t&&(t=3),t}var Te,Le,Ee=function(){if(a&&l<9)return!1;var e=A("div");return"draggable"in e||"dragDrop"in e}();function Oe(e){if(null==Te){var t=A("span","​");O(e,A("span",[t,document.createTextNode("x")])),0!=e.firstChild.offsetHeight&&(Te=t.offsetWidth<=1&&t.offsetHeight>2&&!(a&&l<8))}var r=Te?A("span","​"):A("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px");return r.setAttribute("cm-text",""),r}function Ae(e){if(null!=Le)return Le;var t=O(e,document.createTextNode("AخA")),r=T(t,0,1).getBoundingClientRect(),o=T(t,1,2).getBoundingClientRect();return E(e),!(!r||r.left==r.right)&&(Le=o.right-r.right<3)}var _e,Me=function(e){return e.split(/\r\n?|\n/)},Re=window.getSelection?function(e){try{return e.selectionStart!=e.selectionEnd}catch(e){return!1}}:function(e){var t;try{t=e.ownerDocument.selection.createRange()}catch(e){}return!(!t||t.parentElement()!=e)&&0!=t.compareEndPoints("StartToEnd",t)},ze="oncopy"in(_e=A("div"))||(_e.setAttribute("oncopy","return;"),"function"==typeof _e.oncopy),Ne=null,Fe={},Ie={};function We(e,t){arguments.length>2&&(t.dependencies=Array.prototype.slice.call(arguments,2)),Fe[e]=t}function Pe(e){if("string"==typeof e&&Ie.hasOwnProperty(e))e=Ie[e];else if(e&&"string"==typeof e.name&&Ie.hasOwnProperty(e.name)){var t=Ie[e.name];"string"==typeof t&&(t={name:t}),(e=Y(t,e)).name=t.name}else{if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+xml$/.test(e))return Pe("application/xml");if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+json$/.test(e))return Pe("application/json")}return"string"==typeof e?{name:e}:e||{name:"null"}}function Ke(e,t){t=Pe(t);var r=Fe[t.name];if(!r)return Ke(e,"text/plain");var o=r(e,t);if(Ue.hasOwnProperty(t.name)){var n=Ue[t.name];for(var i in n)n.hasOwnProperty(i)&&(o.hasOwnProperty(i)&&(o["_"+i]=o[i]),o[i]=n[i])}if(o.name=t.name,t.helperType&&(o.helperType=t.helperType),t.modeProps)for(var a in t.modeProps)o[a]=t.modeProps[a];return o}var Ue={};function Be(e,t){W(t,Ue.hasOwnProperty(e)?Ue[e]:Ue[e]={})}function De(e,t){if(!0===t)return t;if(e.copyState)return e.copyState(t);var r={};for(var o in t){var n=t[o];n instanceof Array&&(n=n.concat([])),r[o]=n}return r}function je(e,t){for(var r;e.innerMode&&(r=e.innerMode(t))&&r.mode!=e;)t=r.state,e=r.mode;return r||{mode:e,state:t}}function He(e,t,r){return!e.startState||e.startState(t,r)}var Ve=function(e,t,r){this.pos=this.start=0,this.string=e,this.tabSize=t||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0,this.lineOracle=r};function Ze(e,t){if((t-=e.first)<0||t>=e.size)throw Error("There is no line "+(t+e.first)+" in the document.");for(var r=e;!r.lines;)for(var o=0;;++o){var n=r.children[o],i=n.chunkSize();if(t<i){r=n;break}t-=i}return r.lines[t]}function Je(e,t,r){var o=[],n=t.line;return e.iter(t.line,r.line+1,(function(e){var i=e.text;n==r.line&&(i=i.slice(0,r.ch)),n==t.line&&(i=i.slice(t.ch)),o.push(i),++n})),o}function qe(e,t,r){var o=[];return e.iter(t,r,(function(e){o.push(e.text)})),o}function Ge(e,t){var r=t-e.height;if(r)for(var o=e;o;o=o.parent)o.height+=r}function Qe(e){if(null==e.parent)return null;for(var t=e.parent,r=U(t.lines,e),o=t.parent;o;t=o,o=o.parent)for(var n=0;o.children[n]!=t;++n)r+=o.children[n].chunkSize();return r+t.first}function Ye(e,t){var r=e.first;e:do{for(var o=0;o<e.children.length;++o){var n=e.children[o],i=n.height;if(t<i){e=n;continue e}t-=i,r+=n.chunkSize()}return r}while(!e.lines);for(var a=0;a<e.lines.length;++a){var l=e.lines[a].height;if(t<l)break;t-=l}return r+a}function Xe(e,t){return t>=e.first&&t<e.first+e.size}function $e(e,t){return e.lineNumberFormatter(t+e.firstLineNumber)+""}function et(e,t,r){if(void 0===r&&(r=null),!(this instanceof et))return new et(e,t,r);this.line=e,this.ch=t,this.sticky=r}function tt(e,t){return e.line-t.line||e.ch-t.ch}function rt(e,t){return e.sticky==t.sticky&&0==tt(e,t)}function ot(e){return et(e.line,e.ch)}function nt(e,t){return tt(e,t)<0?t:e}function it(e,t){return tt(e,t)<0?e:t}function at(e,t){return Math.max(e.first,Math.min(t,e.first+e.size-1))}function lt(e,t){if(t.line<e.first)return et(e.first,0);var r=e.first+e.size-1;return t.line>r?et(r,Ze(e,r).text.length):function(e,t){var r=e.ch;return null==r||r>t?et(e.line,t):r<0?et(e.line,0):e}(t,Ze(e,t.line).text.length)}function ct(e,t){for(var r=[],o=0;o<t.length;o++)r[o]=lt(e,t[o]);return r}Ve.prototype.eol=function(){return this.pos>=this.string.length},Ve.prototype.sol=function(){return this.pos==this.lineStart},Ve.prototype.peek=function(){return this.string.charAt(this.pos)||void 0},Ve.prototype.next=function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},Ve.prototype.eat=function(e){var t=this.string.charAt(this.pos);if("string"==typeof e?t==e:t&&(e.test?e.test(t):e(t)))return++this.pos,t},Ve.prototype.eatWhile=function(e){for(var t=this.pos;this.eat(e););return this.pos>t},Ve.prototype.eatSpace=function(){for(var e=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e},Ve.prototype.skipToEnd=function(){this.pos=this.string.length},Ve.prototype.skipTo=function(e){var t=this.string.indexOf(e,this.pos);if(t>-1)return this.pos=t,!0},Ve.prototype.backUp=function(e){this.pos-=e},Ve.prototype.column=function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=P(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?P(this.string,this.lineStart,this.tabSize):0)},Ve.prototype.indentation=function(){return P(this.string,null,this.tabSize)-(this.lineStart?P(this.string,this.lineStart,this.tabSize):0)},Ve.prototype.match=function(e,t,r){if("string"!=typeof e){var o=this.string.slice(this.pos).match(e);return o&&o.index>0?null:(o&&!1!==t&&(this.pos+=o[0].length),o)}var n=function(e){return r?e.toLowerCase():e};if(n(this.string.substr(this.pos,e.length))==n(e))return!1!==t&&(this.pos+=e.length),!0},Ve.prototype.current=function(){return this.string.slice(this.start,this.pos)},Ve.prototype.hideFirstChars=function(e,t){this.lineStart+=e;try{return t()}finally{this.lineStart-=e}},Ve.prototype.lookAhead=function(e){var t=this.lineOracle;return t&&t.lookAhead(e)},Ve.prototype.baseToken=function(){var e=this.lineOracle;return e&&e.baseToken(this.pos)};var st=function(e,t){this.state=e,this.lookAhead=t},dt=function(e,t,r,o){this.state=t,this.doc=e,this.line=r,this.maxLookAhead=o||0,this.baseTokens=null,this.baseTokenPos=1};function ut(e,t,r,o){var n=[e.state.modeGen],i={};wt(e,t.text,e.doc.mode,r,(function(e,t){return n.push(e,t)}),i,o);for(var a=r.state,l=function(o){r.baseTokens=n;var l=e.state.overlays[o],c=1,s=0;r.state=!0,wt(e,t.text,l.mode,r,(function(e,t){for(var r=c;s<e;){var o=n[c];o>e&&n.splice(c,1,e,n[c+1],o),c+=2,s=Math.min(e,o)}if(t)if(l.opaque)n.splice(r,c-r,e,"overlay "+t),c=r+2;else for(;r<c;r+=2){var i=n[r+1];n[r+1]=(i?i+" ":"")+"overlay "+t}}),i),r.state=a,r.baseTokens=null,r.baseTokenPos=1},c=0;c<e.state.overlays.length;++c)l(c);return{styles:n,classes:i.bgClass||i.textClass?i:null}}function pt(e,t,r){if(!t.styles||t.styles[0]!=e.state.modeGen){var o=gt(e,Qe(t)),n=t.text.length>e.options.maxHighlightLength&&De(e.doc.mode,o.state),i=ut(e,t,o);n&&(o.state=n),t.stateAfter=o.save(!n),t.styles=i.styles,i.classes?t.styleClasses=i.classes:t.styleClasses&&(t.styleClasses=null),r===e.doc.highlightFrontier&&(e.doc.modeFrontier=Math.max(e.doc.modeFrontier,++e.doc.highlightFrontier))}return t.styles}function gt(e,t,r){var o=e.doc,n=e.display;if(!o.mode.startState)return new dt(o,!0,t);var i=function(e,t,r){for(var o,n,i=e.doc,a=r?-1:t-(e.doc.mode.innerMode?1e3:100),l=t;l>a;--l){if(l<=i.first)return i.first;var c=Ze(i,l-1),s=c.stateAfter;if(s&&(!r||l+(s instanceof st?s.lookAhead:0)<=i.modeFrontier))return l;var d=P(c.text,null,e.options.tabSize);(null==n||o>d)&&(n=l-1,o=d)}return n}(e,t,r),a=i>o.first&&Ze(o,i-1).stateAfter,l=a?dt.fromSaved(o,a,i):new dt(o,He(o.mode),i);return o.iter(i,t,(function(r){ht(e,r.text,l);var o=l.line;r.stateAfter=o==t-1||o%5==0||o>=n.viewFrom&&o<n.viewTo?l.save():null,l.nextLine()})),r&&(o.modeFrontier=l.line),l}function ht(e,t,r,o){var n=e.doc.mode,i=new Ve(t,e.options.tabSize,r);for(i.start=i.pos=o||0,""==t&&ft(n,r.state);!i.eol();)mt(n,i,r.state),i.start=i.pos}function ft(e,t){if(e.blankLine)return e.blankLine(t);if(e.innerMode){var r=je(e,t);return r.mode.blankLine?r.mode.blankLine(r.state):void 0}}function mt(e,t,r,o){for(var n=0;n<10;n++){o&&(o[0]=je(e,r).mode);var i=e.token(t,r);if(t.pos>t.start)return i}throw Error("Mode "+e.name+" failed to advance stream.")}dt.prototype.lookAhead=function(e){var t=this.doc.getLine(this.line+e);return null!=t&&e>this.maxLookAhead&&(this.maxLookAhead=e),t},dt.prototype.baseToken=function(e){if(!this.baseTokens)return null;for(;this.baseTokens[this.baseTokenPos]<=e;)this.baseTokenPos+=2;var t=this.baseTokens[this.baseTokenPos+1];return{type:t&&t.replace(/( |^)overlay .*/,""),size:this.baseTokens[this.baseTokenPos]-e}},dt.prototype.nextLine=function(){this.line++,this.maxLookAhead>0&&this.maxLookAhead--},dt.fromSaved=function(e,t,r){return t instanceof st?new dt(e,De(e.mode,t.state),r,t.lookAhead):new dt(e,De(e.mode,t),r)},dt.prototype.save=function(e){var t=!1!==e?De(this.doc.mode,this.state):this.state;return this.maxLookAhead>0?new st(t,this.maxLookAhead):t};var yt=function(e,t,r){this.start=e.start,this.end=e.pos,this.string=e.current(),this.type=t||null,this.state=r};function bt(e,t,r,o){var n,i,a=e.doc,l=a.mode,c=Ze(a,(t=lt(a,t)).line),s=gt(e,t.line,r),d=new Ve(c.text,e.options.tabSize,s);for(o&&(i=[]);(o||d.pos<t.ch)&&!d.eol();)d.start=d.pos,n=mt(l,d,s.state),o&&i.push(new yt(d,n,De(a.mode,s.state)));return o?i:new yt(d,n,s.state)}function vt(e,t){if(e)for(;;){var r=e.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!r)break;e=e.slice(0,r.index)+e.slice(r.index+r[0].length);var o=r[1]?"bgClass":"textClass";null==t[o]?t[o]=r[2]:RegExp("(?:^|\\s)"+r[2]+"(?:$|\\s)").test(t[o])||(t[o]+=" "+r[2])}return e}function wt(e,t,r,o,n,i,a){var l=r.flattenSpans;null==l&&(l=e.options.flattenSpans);var c,s=0,d=null,u=new Ve(t,e.options.tabSize,o),p=e.options.addModeClass&&[null];for(""==t&&vt(ft(r,o.state),i);!u.eol();){if(u.pos>e.options.maxHighlightLength?(l=!1,a&&ht(e,t,o,u.pos),u.pos=t.length,c=null):c=vt(mt(r,u,o.state,p),i),p){var g=p[0].name;g&&(c="m-"+(c?g+" "+c:g))}if(!l||d!=c){for(;s<u.start;)n(s=Math.min(u.start,s+5e3),d);d=c}u.start=u.pos}for(;s<u.pos;){var h=Math.min(u.pos,s+5e3);n(h,d),s=h}}var kt=!1,Ct=!1;function xt(e,t,r){this.marker=e,this.from=t,this.to=r}function St(e,t){if(e)for(var r=0;r<e.length;++r){var o=e[r];if(o.marker==t)return o}}function Tt(e,t){for(var r,o=0;o<e.length;++o)e[o]!=t&&(r||(r=[])).push(e[o]);return r}function Lt(e,t){if(t.full)return null;var r=Xe(e,t.from.line)&&Ze(e,t.from.line).markedSpans,o=Xe(e,t.to.line)&&Ze(e,t.to.line).markedSpans;if(!r&&!o)return null;var n=t.from.ch,i=t.to.ch,a=0==tt(t.from,t.to),l=function(e,t,r){var o;if(e)for(var n=0;n<e.length;++n){var i=e[n],a=i.marker;if(null==i.from||(a.inclusiveLeft?i.from<=t:i.from<t)||i.from==t&&"bookmark"==a.type&&(!r||!i.marker.insertLeft)){var l=null==i.to||(a.inclusiveRight?i.to>=t:i.to>t);(o||(o=[])).push(new xt(a,i.from,l?null:i.to))}}return o}(r,n,a),c=function(e,t,r){var o;if(e)for(var n=0;n<e.length;++n){var i=e[n],a=i.marker;if(null==i.to||(a.inclusiveRight?i.to>=t:i.to>t)||i.from==t&&"bookmark"==a.type&&(!r||i.marker.insertLeft)){var l=null==i.from||(a.inclusiveLeft?i.from<=t:i.from<t);(o||(o=[])).push(new xt(a,l?null:i.from-t,null==i.to?null:i.to-t))}}return o}(o,i,a),s=1==t.text.length,d=q(t.text).length+(s?n:0);if(l)for(var u=0;u<l.length;++u){var p=l[u];if(null==p.to){var g=St(c,p.marker);g?s&&(p.to=null==g.to?null:g.to+d):p.to=n}}if(c)for(var h=0;h<c.length;++h){var f=c[h];null!=f.to&&(f.to+=d),null==f.from?St(l,f.marker)||(f.from=d,s&&(l||(l=[])).push(f)):(f.from+=d,s&&(l||(l=[])).push(f))}l&&(l=Et(l)),c&&c!=l&&(c=Et(c));var m=[l];if(!s){var y,b=t.text.length-2;if(b>0&&l)for(var v=0;v<l.length;++v)null==l[v].to&&(y||(y=[])).push(new xt(l[v].marker,null,null));for(var w=0;w<b;++w)m.push(y);m.push(c)}return m}function Et(e){for(var t=0;t<e.length;++t){var r=e[t];null!=r.from&&r.from==r.to&&!1!==r.marker.clearWhenEmpty&&e.splice(t--,1)}return e.length?e:null}function Ot(e){var t=e.markedSpans;if(t){for(var r=0;r<t.length;++r)t[r].marker.detachLine(e);e.markedSpans=null}}function At(e,t){if(t){for(var r=0;r<t.length;++r)t[r].marker.attachLine(e);e.markedSpans=t}}function _t(e){return e.inclusiveLeft?-1:0}function Mt(e){return e.inclusiveRight?1:0}function Rt(e,t){var r=e.lines.length-t.lines.length;if(0!=r)return r;var o=e.find(),n=t.find(),i=tt(o.from,n.from)||_t(e)-_t(t);return i?-i:tt(o.to,n.to)||Mt(e)-Mt(t)||t.id-e.id}function zt(e,t){var r,o=Ct&&e.markedSpans;if(o)for(var n=void 0,i=0;i<o.length;++i)(n=o[i]).marker.collapsed&&null==(t?n.from:n.to)&&(!r||Rt(r,n.marker)<0)&&(r=n.marker);return r}function Nt(e){return zt(e,!0)}function Ft(e){return zt(e,!1)}function It(e,t){var r,o=Ct&&e.markedSpans;if(o)for(var n=0;n<o.length;++n){var i=o[n];i.marker.collapsed&&(null==i.from||i.from<t)&&(null==i.to||i.to>t)&&(!r||Rt(r,i.marker)<0)&&(r=i.marker)}return r}function Wt(e,t,r,o,n){var i=Ze(e,t),a=Ct&&i.markedSpans;if(a)for(var l=0;l<a.length;++l){var c=a[l];if(c.marker.collapsed){var s=c.marker.find(0),d=tt(s.from,r)||_t(c.marker)-_t(n),u=tt(s.to,o)||Mt(c.marker)-Mt(n);if(!(d>=0&&u<=0||d<=0&&u>=0)&&(d<=0&&(c.marker.inclusiveRight&&n.inclusiveLeft?tt(s.to,r)>=0:tt(s.to,r)>0)||d>=0&&(c.marker.inclusiveRight&&n.inclusiveLeft?tt(s.from,o)<=0:tt(s.from,o)<0)))return!0}}}function Pt(e){for(var t;t=Nt(e);)e=t.find(-1,!0).line;return e}function Kt(e,t){var r=Ze(e,t),o=Pt(r);return r==o?t:Qe(o)}function Ut(e,t){if(t>e.lastLine())return t;var r,o=Ze(e,t);if(!Bt(e,o))return t;for(;r=Ft(o);)o=r.find(1,!0).line;return Qe(o)+1}function Bt(e,t){var r=Ct&&t.markedSpans;if(r)for(var o=void 0,n=0;n<r.length;++n)if((o=r[n]).marker.collapsed){if(null==o.from)return!0;if(!o.marker.widgetNode&&0==o.from&&o.marker.inclusiveLeft&&Dt(e,t,o))return!0}}function Dt(e,t,r){if(null==r.to){var o=r.marker.find(1,!0);return Dt(e,o.line,St(o.line.markedSpans,r.marker))}if(r.marker.inclusiveRight&&r.to==t.text.length)return!0;for(var n=void 0,i=0;i<t.markedSpans.length;++i)if((n=t.markedSpans[i]).marker.collapsed&&!n.marker.widgetNode&&n.from==r.to&&(null==n.to||n.to!=r.from)&&(n.marker.inclusiveLeft||r.marker.inclusiveRight)&&Dt(e,t,n))return!0}function jt(e){for(var t=0,r=(e=Pt(e)).parent,o=0;o<r.lines.length;++o){var n=r.lines[o];if(n==e)break;t+=n.height}for(var i=r.parent;i;i=(r=i).parent)for(var a=0;a<i.children.length;++a){var l=i.children[a];if(l==r)break;t+=l.height}return t}function Ht(e){if(0==e.height)return 0;for(var t,r=e.text.length,o=e;t=Nt(o);){var n=t.find(0,!0);o=n.from.line,r+=n.from.ch-n.to.ch}for(o=e;t=Ft(o);){var i=t.find(0,!0);r-=o.text.length-i.from.ch,r+=(o=i.to.line).text.length-i.to.ch}return r}function Vt(e){var t=e.display,r=e.doc;t.maxLine=Ze(r,r.first),t.maxLineLength=Ht(t.maxLine),t.maxLineChanged=!0,r.iter((function(e){var r=Ht(e);r>t.maxLineLength&&(t.maxLineLength=r,t.maxLine=e)}))}var Zt=function(e,t,r){this.text=e,At(this,t),this.height=r?r(this):1};function Jt(e){e.parent=null,Ot(e)}Zt.prototype.lineNo=function(){return Qe(this)},be(Zt);var qt={},Gt={};function Qt(e,t){if(!e||/^\s*$/.test(e))return null;var r=t.addModeClass?Gt:qt;return r[e]||(r[e]=e.replace(/\S+/g,"cm-$&"))}function Yt(e,t){var r=_("span",null,null,c?"padding-right: .1px":null),o={pre:_("pre",[r],"CodeMirror-line"),content:r,col:0,pos:0,cm:e,trailingSpace:!1,splitSpaces:e.getOption("lineWrapping")};t.measure={};for(var n=0;n<=(t.rest?t.rest.length:0);n++){var i=n?t.rest[n-1]:t.line,a=void 0;o.pos=0,o.addToken=$t,Ae(e.display.measure)&&(a=se(i,e.doc.direction))&&(o.addToken=er(o.addToken,a)),o.map=[],rr(i,o,pt(e,i,t!=e.display.externalMeasured&&Qe(i))),i.styleClasses&&(i.styleClasses.bgClass&&(o.bgClass=N(i.styleClasses.bgClass,o.bgClass||"")),i.styleClasses.textClass&&(o.textClass=N(i.styleClasses.textClass,o.textClass||""))),0==o.map.length&&o.map.push(0,0,o.content.appendChild(Oe(e.display.measure))),0==n?(t.measure.map=o.map,t.measure.cache={}):((t.measure.maps||(t.measure.maps=[])).push(o.map),(t.measure.caches||(t.measure.caches=[])).push({}))}if(c){var l=o.content.lastChild;(/\bcm-tab\b/.test(l.className)||l.querySelector&&l.querySelector(".cm-tab"))&&(o.content.className="cm-tab-wrap-hack")}return he(e,"renderLine",e,t.line,o.pre),o.pre.className&&(o.textClass=N(o.pre.className,o.textClass||"")),o}function Xt(e){var t=A("span","•","cm-invalidchar");return t.title="\\u"+e.charCodeAt(0).toString(16),t.setAttribute("aria-label",t.title),t}function $t(e,t,r,o,n,i,c){if(t){var s,d=e.splitSpaces?function(e,t){if(e.length>1&&!/  /.test(e))return e;for(var r=t,o="",n=0;n<e.length;n++){var i=e.charAt(n);" "!=i||!r||n!=e.length-1&&32!=e.charCodeAt(n+1)||(i=" "),o+=i,r=" "==i}return o}(t,e.trailingSpace):t,u=e.cm.state.specialChars,p=!1;if(u.test(t)){s=document.createDocumentFragment();for(var g=0;;){u.lastIndex=g;var h=u.exec(t),f=h?h.index-g:t.length-g;if(f){var m=document.createTextNode(d.slice(g,g+f));a&&l<9?s.appendChild(A("span",[m])):s.appendChild(m),e.map.push(e.pos,e.pos+f,m),e.col+=f,e.pos+=f}if(!h)break;g+=f+1;var y=void 0;if("\t"==h[0]){var b=e.cm.options.tabSize,v=b-e.col%b;(y=s.appendChild(A("span",J(v),"cm-tab"))).setAttribute("role","presentation"),y.setAttribute("cm-text","\t"),e.col+=v}else"\r"==h[0]||"\n"==h[0]?((y=s.appendChild(A("span","\r"==h[0]?"␍":"␤","cm-invalidchar"))).setAttribute("cm-text",h[0]),e.col+=1):((y=e.cm.options.specialCharPlaceholder(h[0])).setAttribute("cm-text",h[0]),a&&l<9?s.appendChild(A("span",[y])):s.appendChild(y),e.col+=1);e.map.push(e.pos,e.pos+1,y),e.pos++}}else e.col+=t.length,s=document.createTextNode(d),e.map.push(e.pos,e.pos+t.length,s),a&&l<9&&(p=!0),e.pos+=t.length;if(e.trailingSpace=32==d.charCodeAt(t.length-1),r||o||n||p||i||c){var w=r||"";o&&(w+=o),n&&(w+=n);var k=A("span",[s],w,i);if(c)for(var C in c)c.hasOwnProperty(C)&&"style"!=C&&"class"!=C&&k.setAttribute(C,c[C]);return e.content.appendChild(k)}e.content.appendChild(s)}}function er(e,t){return function(r,o,n,i,a,l,c){n=n?n+" cm-force-border":"cm-force-border";for(var s=r.pos,d=s+o.length;;){for(var u=void 0,p=0;p<t.length&&!((u=t[p]).to>s&&u.from<=s);p++);if(u.to>=d)return e(r,o,n,i,a,l,c);e(r,o.slice(0,u.to-s),n,i,null,l,c),i=null,o=o.slice(u.to-s),s=u.to}}}function tr(e,t,r,o){var n=!o&&r.widgetNode;n&&e.map.push(e.pos,e.pos+t,n),!o&&e.cm.display.input.needsContentAttribute&&(n||(n=e.content.appendChild(document.createElement("span"))),n.setAttribute("cm-marker",r.id)),n&&(e.cm.display.input.setUneditable(n),e.content.appendChild(n)),e.pos+=t,e.trailingSpace=!1}function rr(e,t,r){var o=e.markedSpans,n=e.text,i=0;if(o)for(var a,l,c,s,d,u,p,g=n.length,h=0,f=1,m="",y=0;;){if(y==h){c=s=d=l="",p=null,u=null,y=1/0;for(var b=[],v=void 0,w=0;w<o.length;++w){var k=o[w],C=k.marker;if("bookmark"==C.type&&k.from==h&&C.widgetNode)b.push(C);else if(k.from<=h&&(null==k.to||k.to>h||C.collapsed&&k.to==h&&k.from==h)){if(null!=k.to&&k.to!=h&&y>k.to&&(y=k.to,s=""),C.className&&(c+=" "+C.className),C.css&&(l=(l?l+";":"")+C.css),C.startStyle&&k.from==h&&(d+=" "+C.startStyle),C.endStyle&&k.to==y&&(v||(v=[])).push(C.endStyle,k.to),C.title&&((p||(p={})).title=C.title),C.attributes)for(var x in C.attributes)(p||(p={}))[x]=C.attributes[x];C.collapsed&&(!u||Rt(u.marker,C)<0)&&(u=k)}else k.from>h&&y>k.from&&(y=k.from)}if(v)for(var S=0;S<v.length;S+=2)v[S+1]==y&&(s+=" "+v[S]);if(!u||u.from==h)for(var T=0;T<b.length;++T)tr(t,0,b[T]);if(u&&(u.from||0)==h){if(tr(t,(null==u.to?g+1:u.to)-h,u.marker,null==u.from),null==u.to)return;u.to==h&&(u=!1)}}if(h>=g)break;for(var L=Math.min(g,y);;){if(m){var E=h+m.length;if(!u){var O=E>L?m.slice(0,L-h):m;t.addToken(t,O,a?a+c:c,d,h+O.length==y?s:"",l,p)}if(E>=L){m=m.slice(L-h),h=L;break}h=E,d=""}m=n.slice(i,i=r[f++]),a=Qt(r[f++],t.cm.options)}}else for(var A=1;A<r.length;A+=2)t.addToken(t,n.slice(i,i=r[A]),Qt(r[A+1],t.cm.options))}function or(e,t,r){this.line=t,this.rest=function(e){for(var t,r;t=Ft(e);)e=t.find(1,!0).line,(r||(r=[])).push(e);return r}(t),this.size=this.rest?Qe(q(this.rest))-r+1:1,this.node=this.text=null,this.hidden=Bt(e,t)}function nr(e,t,r){for(var o,n=[],i=t;i<r;i=o){var a=new or(e.doc,Ze(e.doc,i),i);o=i+a.size,n.push(a)}return n}var ir=null,ar=null;function lr(e,t){var r=pe(e,t);if(r.length){var o,n=Array.prototype.slice.call(arguments,2);ir?o=ir.delayedCallbacks:ar?o=ar:(o=ar=[],setTimeout(cr,0));for(var i=function(e){o.push((function(){return r[e].apply(null,n)}))},a=0;a<r.length;++a)i(a)}}function cr(){var e=ar;ar=null;for(var t=0;t<e.length;++t)e[t]()}function sr(e,t,r,o){for(var n=0;n<t.changes.length;n++){var i=t.changes[n];"text"==i?pr(e,t):"gutter"==i?hr(e,t,r,o):"class"==i?gr(e,t):"widget"==i&&fr(e,t,o)}t.changes=null}function dr(e){return e.node==e.text&&(e.node=A("div",null,null,"position: relative"),e.text.parentNode&&e.text.parentNode.replaceChild(e.node,e.text),e.node.appendChild(e.text),a&&l<8&&(e.node.style.zIndex=2)),e.node}function ur(e,t){var r=e.display.externalMeasured;return r&&r.line==t.line?(e.display.externalMeasured=null,t.measure=r.measure,r.built):Yt(e,t)}function pr(e,t){var r=t.text.className,o=ur(e,t);t.text==t.node&&(t.node=o.pre),t.text.parentNode.replaceChild(o.pre,t.text),t.text=o.pre,o.bgClass!=t.bgClass||o.textClass!=t.textClass?(t.bgClass=o.bgClass,t.textClass=o.textClass,gr(e,t)):r&&(t.text.className=r)}function gr(e,t){!function(e,t){var r=t.bgClass?t.bgClass+" "+(t.line.bgClass||""):t.line.bgClass;if(r&&(r+=" CodeMirror-linebackground"),t.background)r?t.background.className=r:(t.background.parentNode.removeChild(t.background),t.background=null);else if(r){var o=dr(t);t.background=o.insertBefore(A("div",null,r),o.firstChild),e.display.input.setUneditable(t.background)}}(e,t),t.line.wrapClass?dr(t).className=t.line.wrapClass:t.node!=t.text&&(t.node.className="");var r=t.textClass?t.textClass+" "+(t.line.textClass||""):t.line.textClass;t.text.className=r||""}function hr(e,t,r,o){if(t.gutter&&(t.node.removeChild(t.gutter),t.gutter=null),t.gutterBackground&&(t.node.removeChild(t.gutterBackground),t.gutterBackground=null),t.line.gutterClass){var n=dr(t);t.gutterBackground=A("div",null,"CodeMirror-gutter-background "+t.line.gutterClass,"left: "+(e.options.fixedGutter?o.fixedPos:-o.gutterTotalWidth)+"px; width: "+o.gutterTotalWidth+"px"),e.display.input.setUneditable(t.gutterBackground),n.insertBefore(t.gutterBackground,t.text)}var i=t.line.gutterMarkers;if(e.options.lineNumbers||i){var a=dr(t),l=t.gutter=A("div",null,"CodeMirror-gutter-wrapper","left: "+(e.options.fixedGutter?o.fixedPos:-o.gutterTotalWidth)+"px");if(e.display.input.setUneditable(l),a.insertBefore(l,t.text),t.line.gutterClass&&(l.className+=" "+t.line.gutterClass),!e.options.lineNumbers||i&&i["CodeMirror-linenumbers"]||(t.lineNumber=l.appendChild(A("div",$e(e.options,r),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+o.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+e.display.lineNumInnerWidth+"px"))),i)for(var c=0;c<e.display.gutterSpecs.length;++c){var s=e.display.gutterSpecs[c].className,d=i.hasOwnProperty(s)&&i[s];d&&l.appendChild(A("div",[d],"CodeMirror-gutter-elt","left: "+o.gutterLeft[s]+"px; width: "+o.gutterWidth[s]+"px"))}}}function fr(e,t,r){t.alignable&&(t.alignable=null);for(var o=S("CodeMirror-linewidget"),n=t.node.firstChild,i=void 0;n;n=i)i=n.nextSibling,o.test(n.className)&&t.node.removeChild(n);yr(e,t,r)}function mr(e,t,r,o){var n=ur(e,t);return t.text=t.node=n.pre,n.bgClass&&(t.bgClass=n.bgClass),n.textClass&&(t.textClass=n.textClass),gr(e,t),hr(e,t,r,o),yr(e,t,o),t.node}function yr(e,t,r){if(br(e,t.line,t,r,!0),t.rest)for(var o=0;o<t.rest.length;o++)br(e,t.rest[o],t,r,!1)}function br(e,t,r,o,n){if(t.widgets)for(var i=dr(r),a=0,l=t.widgets;a<l.length;++a){var c=l[a],s=A("div",[c.node],"CodeMirror-linewidget"+(c.className?" "+c.className:""));c.handleMouseEvents||s.setAttribute("cm-ignore-events","true"),vr(c,s,r,o),e.display.input.setUneditable(s),n&&c.above?i.insertBefore(s,r.gutter||r.text):i.appendChild(s),lr(c,"redraw")}}function vr(e,t,r,o){if(e.noHScroll){(r.alignable||(r.alignable=[])).push(t);var n=o.wrapperWidth;t.style.left=o.fixedPos+"px",e.coverGutter||(n-=o.gutterTotalWidth,t.style.paddingLeft=o.gutterTotalWidth+"px"),t.style.width=n+"px"}e.coverGutter&&(t.style.zIndex=5,t.style.position="relative",e.noHScroll||(t.style.marginLeft=-o.gutterTotalWidth+"px"))}function wr(e){if(null!=e.height)return e.height;var t=e.doc.cm;if(!t)return 0;if(!M(document.body,e.node)){var r="position: relative;";e.coverGutter&&(r+="margin-left: -"+t.display.gutters.offsetWidth+"px;"),e.noHScroll&&(r+="width: "+t.display.wrapper.clientWidth+"px;"),O(t.display.measure,A("div",[e.node],null,r))}return e.height=e.node.parentNode.offsetHeight}function kr(e,t){for(var r=xe(t);r!=e.wrapper;r=r.parentNode)if(!r||1==r.nodeType&&"true"==r.getAttribute("cm-ignore-events")||r.parentNode==e.sizer&&r!=e.mover)return!0}function Cr(e){return e.lineSpace.offsetTop}function xr(e){return e.mover.offsetHeight-e.lineSpace.offsetHeight}function Sr(e){if(e.cachedPaddingH)return e.cachedPaddingH;var t=O(e.measure,A("pre","x","CodeMirror-line-like")),r=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,o={left:parseInt(r.paddingLeft),right:parseInt(r.paddingRight)};return isNaN(o.left)||isNaN(o.right)||(e.cachedPaddingH=o),o}function Tr(e){return 50-e.display.nativeBarWidth}function Lr(e){return e.display.scroller.clientWidth-Tr(e)-e.display.barWidth}function Er(e){return e.display.scroller.clientHeight-Tr(e)-e.display.barHeight}function Or(e,t,r){if(e.line==t)return{map:e.measure.map,cache:e.measure.cache};for(var o=0;o<e.rest.length;o++)if(e.rest[o]==t)return{map:e.measure.maps[o],cache:e.measure.caches[o]};for(var n=0;n<e.rest.length;n++)if(Qe(e.rest[n])>r)return{map:e.measure.maps[n],cache:e.measure.caches[n],before:!0}}function Ar(e,t,r,o){return Rr(e,Mr(e,t),r,o)}function _r(e,t){if(t>=e.display.viewFrom&&t<e.display.viewTo)return e.display.view[so(e,t)];var r=e.display.externalMeasured;return r&&t>=r.lineN&&t<r.lineN+r.size?r:void 0}function Mr(e,t){var r=Qe(t),o=_r(e,r);o&&!o.text?o=null:o&&o.changes&&(sr(e,o,r,no(e)),e.curOp.forceUpdate=!0),o||(o=function(e,t){var r=Qe(t=Pt(t)),o=e.display.externalMeasured=new or(e.doc,t,r);o.lineN=r;var n=o.built=Yt(e,o);return o.text=n.pre,O(e.display.lineMeasure,n.pre),o}(e,t));var n=Or(o,t,r);return{line:t,view:o,rect:null,map:n.map,cache:n.cache,before:n.before,hasHeights:!1}}function Rr(e,t,r,o,n){t.before&&(r=-1);var i,c=r+(o||"");return t.cache.hasOwnProperty(c)?i=t.cache[c]:(t.rect||(t.rect=t.view.text.getBoundingClientRect()),t.hasHeights||(function(e,t,r){var o=e.options.lineWrapping,n=o&&Lr(e);if(!t.measure.heights||o&&t.measure.width!=n){var i=t.measure.heights=[];if(o){t.measure.width=n;for(var a=t.text.firstChild.getClientRects(),l=0;l<a.length-1;l++){var c=a[l],s=a[l+1];Math.abs(c.bottom-s.bottom)>2&&i.push((c.bottom+s.top)/2-r.top)}}i.push(r.bottom-r.top)}}(e,t.view,t.rect),t.hasHeights=!0),(i=function(e,t,r,o){var n,i=Fr(t.map,r,o),c=i.node,s=i.start,d=i.end,u=i.collapse;if(3==c.nodeType){for(var p=0;p<4;p++){for(;s&&oe(t.line.text.charAt(i.coverStart+s));)--s;for(;i.coverStart+d<i.coverEnd&&oe(t.line.text.charAt(i.coverStart+d));)++d;if((n=a&&l<9&&0==s&&d==i.coverEnd-i.coverStart?c.parentNode.getBoundingClientRect():Ir(T(c,s,d).getClientRects(),o)).left||n.right||0==s)break;d=s,s-=1,u="right"}a&&l<11&&(n=function(e,t){if(!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!function(e){if(null!=Ne)return Ne;var t=O(e,A("span","x")),r=t.getBoundingClientRect(),o=T(t,0,1).getBoundingClientRect();return Ne=Math.abs(r.left-o.left)>1}(e))return t;var r=screen.logicalXDPI/screen.deviceXDPI,o=screen.logicalYDPI/screen.deviceYDPI;return{left:t.left*r,right:t.right*r,top:t.top*o,bottom:t.bottom*o}}(e.display.measure,n))}else{var g;s>0&&(u=o="right"),n=e.options.lineWrapping&&(g=c.getClientRects()).length>1?g["right"==o?g.length-1:0]:c.getBoundingClientRect()}if(a&&l<9&&!s&&(!n||!n.left&&!n.right)){var h=c.parentNode.getClientRects()[0];n=h?{left:h.left,right:h.left+oo(e.display),top:h.top,bottom:h.bottom}:Nr}for(var f=n.top-t.rect.top,m=n.bottom-t.rect.top,y=(f+m)/2,b=t.view.measure.heights,v=0;v<b.length-1&&!(y<b[v]);v++);var w=v?b[v-1]:0,k=b[v],C={left:("right"==u?n.right:n.left)-t.rect.left,right:("left"==u?n.left:n.right)-t.rect.left,top:w,bottom:k};return n.left||n.right||(C.bogus=!0),e.options.singleCursorHeightPerLine||(C.rtop=f,C.rbottom=m),C}(e,t,r,o)).bogus||(t.cache[c]=i)),{left:i.left,right:i.right,top:n?i.rtop:i.top,bottom:n?i.rbottom:i.bottom}}var zr,Nr={left:0,right:0,top:0,bottom:0};function Fr(e,t,r){for(var o,n,i,a,l,c,s=0;s<e.length;s+=3)if(l=e[s],c=e[s+1],t<l?(n=0,i=1,a="left"):t<c?i=1+(n=t-l):(s==e.length-3||t==c&&e[s+3]>t)&&(n=(i=c-l)-1,t>=c&&(a="right")),null!=n){if(o=e[s+2],l==c&&r==(o.insertLeft?"left":"right")&&(a=r),"left"==r&&0==n)for(;s&&e[s-2]==e[s-3]&&e[s-1].insertLeft;)o=e[2+(s-=3)],a="left";if("right"==r&&n==c-l)for(;s<e.length-3&&e[s+3]==e[s+4]&&!e[s+5].insertLeft;)o=e[(s+=3)+2],a="right";break}return{node:o,start:n,end:i,collapse:a,coverStart:l,coverEnd:c}}function Ir(e,t){var r=Nr;if("left"==t)for(var o=0;o<e.length&&(r=e[o]).left==r.right;o++);else for(var n=e.length-1;n>=0&&(r=e[n]).left==r.right;n--);return r}function Wr(e){if(e.measure&&(e.measure.cache={},e.measure.heights=null,e.rest))for(var t=0;t<e.rest.length;t++)e.measure.caches[t]={}}function Pr(e){e.display.externalMeasure=null,E(e.display.lineMeasure);for(var t=0;t<e.display.view.length;t++)Wr(e.display.view[t])}function Kr(e){Pr(e),e.display.cachedCharWidth=e.display.cachedTextHeight=e.display.cachedPaddingH=null,e.options.lineWrapping||(e.display.maxLineChanged=!0),e.display.lineNumChars=null}function Ur(){return d&&m?-(document.body.getBoundingClientRect().left-parseInt(getComputedStyle(document.body).marginLeft)):window.pageXOffset||(document.documentElement||document.body).scrollLeft}function Br(){return d&&m?-(document.body.getBoundingClientRect().top-parseInt(getComputedStyle(document.body).marginTop)):window.pageYOffset||(document.documentElement||document.body).scrollTop}function Dr(e){var t=0;if(e.widgets)for(var r=0;r<e.widgets.length;++r)e.widgets[r].above&&(t+=wr(e.widgets[r]));return t}function jr(e,t,r,o,n){if(!n){var i=Dr(t);r.top+=i,r.bottom+=i}if("line"==o)return r;o||(o="local");var a=jt(t);if("local"==o?a+=Cr(e.display):a-=e.display.viewOffset,"page"==o||"window"==o){var l=e.display.lineSpace.getBoundingClientRect();a+=l.top+("window"==o?0:Br());var c=l.left+("window"==o?0:Ur());r.left+=c,r.right+=c}return r.top+=a,r.bottom+=a,r}function Hr(e,t,r){if("div"==r)return t;var o=t.left,n=t.top;if("page"==r)o-=Ur(),n-=Br();else if("local"==r||!r){var i=e.display.sizer.getBoundingClientRect();o+=i.left,n+=i.top}var a=e.display.lineSpace.getBoundingClientRect();return{left:o-a.left,top:n-a.top}}function Vr(e,t,r,o,n){return o||(o=Ze(e.doc,t.line)),jr(e,o,Ar(e,o,t.ch,n),r)}function Zr(e,t,r,o,n,i){function a(t,a){var l=Rr(e,n,t,a?"right":"left",i);return a?l.left=l.right:l.right=l.left,jr(e,o,l,r)}o=o||Ze(e.doc,t.line),n||(n=Mr(e,o));var l=se(o,e.doc.direction),c=t.ch,s=t.sticky;if(c>=o.text.length?(c=o.text.length,s="before"):c<=0&&(c=0,s="after"),!l)return a("before"==s?c-1:c,"before"==s);function d(e,t,r){return a(r?e-1:e,1==l[t].level!=r)}var u=le(l,c,s),p=ae,g=d(c,u,"before"==s);return null!=p&&(g.other=d(c,p,"before"!=s)),g}function Jr(e,t){var r=0;t=lt(e.doc,t),e.options.lineWrapping||(r=oo(e.display)*t.ch);var o=Ze(e.doc,t.line),n=jt(o)+Cr(e.display);return{left:r,right:r,top:n,bottom:n+o.height}}function qr(e,t,r,o,n){var i=et(e,t,r);return i.xRel=n,o&&(i.outside=o),i}function Gr(e,t,r){var o=e.doc;if((r+=e.display.viewOffset)<0)return qr(o.first,0,null,-1,-1);var n=Ye(o,r),i=o.first+o.size-1;if(n>i)return qr(o.first+o.size-1,Ze(o,i).text.length,null,1,1);t<0&&(t=0);for(var a=Ze(o,n);;){var l=$r(e,a,n,t,r),c=It(a,l.ch+(l.xRel>0||l.outside>0?1:0));if(!c)return l;var s=c.find(1);if(s.line==n)return s;a=Ze(o,n=s.line)}}function Qr(e,t,r,o){o-=Dr(t);var n=t.text.length,i=ie((function(t){return Rr(e,r,t-1).bottom<=o}),n,0);return{begin:i,end:n=ie((function(t){return Rr(e,r,t).top>o}),i,n)}}function Yr(e,t,r,o){return r||(r=Mr(e,t)),Qr(e,t,r,jr(e,t,Rr(e,r,o),"line").top)}function Xr(e,t,r,o){return!(e.bottom<=r)&&(e.top>r||(o?e.left:e.right)>t)}function $r(e,t,r,o,n){n-=jt(t);var i=Mr(e,t),a=Dr(t),l=0,c=t.text.length,s=!0,d=se(t,e.doc.direction);if(d){var u=(e.options.lineWrapping?to:eo)(e,t,r,i,d,o,n);l=(s=1!=u.level)?u.from:u.to-1,c=s?u.to:u.from-1}var p,g,h=null,f=null,m=ie((function(t){var r=Rr(e,i,t);return r.top+=a,r.bottom+=a,!!Xr(r,o,n,!1)&&(r.top<=n&&r.left<=o&&(h=t,f=r),!0)}),l,c),y=!1;if(f){var b=o-f.left<f.right-o,v=b==s;m=h+(v?0:1),g=v?"after":"before",p=b?f.left:f.right}else{s||m!=c&&m!=l||m++,g=0==m?"after":m==t.text.length?"before":Rr(e,i,m-(s?1:0)).bottom+a<=n==s?"after":"before";var w=Zr(e,et(r,m,g),"line",t,i);p=w.left,y=n<w.top?-1:n>=w.bottom?1:0}return qr(r,m=ne(t.text,m,1),g,y,o-p)}function eo(e,t,r,o,n,i,a){var l=ie((function(l){var c=n[l],s=1!=c.level;return Xr(Zr(e,et(r,s?c.to:c.from,s?"before":"after"),"line",t,o),i,a,!0)}),0,n.length-1),c=n[l];if(l>0){var s=1!=c.level,d=Zr(e,et(r,s?c.from:c.to,s?"after":"before"),"line",t,o);Xr(d,i,a,!0)&&d.top>a&&(c=n[l-1])}return c}function to(e,t,r,o,n,i,a){var l=Qr(e,t,o,a),c=l.begin,s=l.end;/\s/.test(t.text.charAt(s-1))&&s--;for(var d=null,u=null,p=0;p<n.length;p++){var g=n[p];if(!(g.from>=s||g.to<=c)){var h=Rr(e,o,1!=g.level?Math.min(s,g.to)-1:Math.max(c,g.from)).right,f=h<i?i-h+1e9:h-i;(!d||u>f)&&(d=g,u=f)}}return d||(d=n[n.length-1]),d.from<c&&(d={from:c,to:d.to,level:d.level}),d.to>s&&(d={from:d.from,to:s,level:d.level}),d}function ro(e){if(null!=e.cachedTextHeight)return e.cachedTextHeight;if(null==zr){zr=A("pre",null,"CodeMirror-line-like");for(var t=0;t<49;++t)zr.appendChild(document.createTextNode("x")),zr.appendChild(A("br"));zr.appendChild(document.createTextNode("x"))}O(e.measure,zr);var r=zr.offsetHeight/50;return r>3&&(e.cachedTextHeight=r),E(e.measure),r||1}function oo(e){if(null!=e.cachedCharWidth)return e.cachedCharWidth;var t=A("span","xxxxxxxxxx"),r=A("pre",[t],"CodeMirror-line-like");O(e.measure,r);var o=t.getBoundingClientRect(),n=(o.right-o.left)/10;return n>2&&(e.cachedCharWidth=n),n||10}function no(e){for(var t=e.display,r={},o={},n=t.gutters.clientLeft,i=t.gutters.firstChild,a=0;i;i=i.nextSibling,++a){var l=e.display.gutterSpecs[a].className;r[l]=i.offsetLeft+i.clientLeft+n,o[l]=i.clientWidth}return{fixedPos:io(t),gutterTotalWidth:t.gutters.offsetWidth,gutterLeft:r,gutterWidth:o,wrapperWidth:t.wrapper.clientWidth}}function io(e){return e.scroller.getBoundingClientRect().left-e.sizer.getBoundingClientRect().left}function ao(e){var t=ro(e.display),r=e.options.lineWrapping,o=r&&Math.max(5,e.display.scroller.clientWidth/oo(e.display)-3);return function(n){if(Bt(e.doc,n))return 0;var i=0;if(n.widgets)for(var a=0;a<n.widgets.length;a++)n.widgets[a].height&&(i+=n.widgets[a].height);return r?i+(Math.ceil(n.text.length/o)||1)*t:i+t}}function lo(e){var t=e.doc,r=ao(e);t.iter((function(e){var t=r(e);t!=e.height&&Ge(e,t)}))}function co(e,t,r,o){var n=e.display;if(!r&&"true"==xe(t).getAttribute("cm-not-content"))return null;var i,a,l=n.lineSpace.getBoundingClientRect();try{i=t.clientX-l.left,a=t.clientY-l.top}catch(e){return null}var c,s=Gr(e,i,a);if(o&&s.xRel>0&&(c=Ze(e.doc,s.line).text).length==s.ch){var d=P(c,c.length,e.options.tabSize)-c.length;s=et(s.line,Math.max(0,Math.round((i-Sr(e.display).left)/oo(e.display))-d))}return s}function so(e,t){if(t>=e.display.viewTo)return null;if((t-=e.display.viewFrom)<0)return null;for(var r=e.display.view,o=0;o<r.length;o++)if((t-=r[o].size)<0)return o}function uo(e,t,r,o){null==t&&(t=e.doc.first),null==r&&(r=e.doc.first+e.doc.size),o||(o=0);var n=e.display;if(o&&r<n.viewTo&&(null==n.updateLineNumbers||n.updateLineNumbers>t)&&(n.updateLineNumbers=t),e.curOp.viewChanged=!0,t>=n.viewTo)Ct&&Kt(e.doc,t)<n.viewTo&&go(e);else if(r<=n.viewFrom)Ct&&Ut(e.doc,r+o)>n.viewFrom?go(e):(n.viewFrom+=o,n.viewTo+=o);else if(t<=n.viewFrom&&r>=n.viewTo)go(e);else if(t<=n.viewFrom){var i=ho(e,r,r+o,1);i?(n.view=n.view.slice(i.index),n.viewFrom=i.lineN,n.viewTo+=o):go(e)}else if(r>=n.viewTo){var a=ho(e,t,t,-1);a?(n.view=n.view.slice(0,a.index),n.viewTo=a.lineN):go(e)}else{var l=ho(e,t,t,-1),c=ho(e,r,r+o,1);l&&c?(n.view=n.view.slice(0,l.index).concat(nr(e,l.lineN,c.lineN)).concat(n.view.slice(c.index)),n.viewTo+=o):go(e)}var s=n.externalMeasured;s&&(r<s.lineN?s.lineN+=o:t<s.lineN+s.size&&(n.externalMeasured=null))}function po(e,t,r){e.curOp.viewChanged=!0;var o=e.display,n=e.display.externalMeasured;if(n&&t>=n.lineN&&t<n.lineN+n.size&&(o.externalMeasured=null),!(t<o.viewFrom||t>=o.viewTo)){var i=o.view[so(e,t)];if(null!=i.node){var a=i.changes||(i.changes=[]);-1==U(a,r)&&a.push(r)}}}function go(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0}function ho(e,t,r,o){var n,i=so(e,t),a=e.display.view;if(!Ct||r==e.doc.first+e.doc.size)return{index:i,lineN:r};for(var l=e.display.viewFrom,c=0;c<i;c++)l+=a[c].size;if(l!=t){if(o>0){if(i==a.length-1)return null;n=l+a[i].size-t,i++}else n=l-t;t+=n,r+=n}for(;Kt(e.doc,r)!=r;){if(i==(o<0?0:a.length-1))return null;r+=o*a[i-(o<0?1:0)].size,i+=o}return{index:i,lineN:r}}function fo(e){for(var t=e.display.view,r=0,o=0;o<t.length;o++){var n=t[o];n.hidden||n.node&&!n.changes||++r}return r}function mo(e){e.display.input.showSelection(e.display.input.prepareSelection())}function yo(e,t){void 0===t&&(t=!0);for(var r=e.doc,o={},n=o.cursors=document.createDocumentFragment(),i=o.selection=document.createDocumentFragment(),a=0;a<r.sel.ranges.length;a++)if(t||a!=r.sel.primIndex){var l=r.sel.ranges[a];if(!(l.from().line>=e.display.viewTo||l.to().line<e.display.viewFrom)){var c=l.empty();(c||e.options.showCursorWhenSelecting)&&bo(e,l.head,n),c||wo(e,l,i)}}return o}function bo(e,t,r){var o=Zr(e,t,"div",null,null,!e.options.singleCursorHeightPerLine),n=r.appendChild(A("div"," ","CodeMirror-cursor"));if(n.style.left=o.left+"px",n.style.top=o.top+"px",n.style.height=Math.max(0,o.bottom-o.top)*e.options.cursorHeight+"px",o.other){var i=r.appendChild(A("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"));i.style.display="",i.style.left=o.other.left+"px",i.style.top=o.other.top+"px",i.style.height=.85*(o.other.bottom-o.other.top)+"px"}}function vo(e,t){return e.top-t.top||e.left-t.left}function wo(e,t,r){var o=e.display,n=e.doc,i=document.createDocumentFragment(),a=Sr(e.display),l=a.left,c=Math.max(o.sizerWidth,Lr(e)-o.sizer.offsetLeft)-a.right,s="ltr"==n.direction;function d(e,t,r,o){t<0&&(t=0),t=Math.round(t),o=Math.round(o),i.appendChild(A("div",null,"CodeMirror-selected","position: absolute; left: "+e+"px;\n                             top: "+t+"px; width: "+(null==r?c-e:r)+"px;\n                             height: "+(o-t)+"px"))}function u(t,r,o){var i,a,u=Ze(n,t),p=u.text.length;function g(r,o){return Vr(e,et(t,r),"div",u,o)}function h(t,r,o){var n=Yr(e,u,null,t),i="ltr"==r==("after"==o)?"left":"right";return g("after"==o?n.begin:n.end-(/\s/.test(u.text.charAt(n.end-1))?2:1),i)[i]}var f=se(u,n.direction);return function(e,t,r,o){if(!e)return o(t,r,"ltr",0);for(var n=!1,i=0;i<e.length;++i){var a=e[i];(a.from<r&&a.to>t||t==r&&a.to==t)&&(o(Math.max(a.from,t),Math.min(a.to,r),1==a.level?"rtl":"ltr",i),n=!0)}n||o(t,r,"ltr")}(f,r||0,null==o?p:o,(function(e,t,n,u){var m="ltr"==n,y=g(e,m?"left":"right"),b=g(t-1,m?"right":"left"),v=null==r&&0==e,w=null==o&&t==p,k=0==u,C=!f||u==f.length-1;if(b.top-y.top<=3){var x=(s?w:v)&&C,S=(s?v:w)&&k?l:(m?y:b).left,T=x?c:(m?b:y).right;d(S,y.top,T-S,y.bottom)}else{var L,E,O,A;m?(L=s&&v&&k?l:y.left,E=s?c:h(e,n,"before"),O=s?l:h(t,n,"after"),A=s&&w&&C?c:b.right):(L=s?h(e,n,"before"):l,E=!s&&v&&k?c:y.right,O=!s&&w&&C?l:b.left,A=s?h(t,n,"after"):c),d(L,y.top,E-L,y.bottom),y.bottom<b.top&&d(l,y.bottom,null,b.top),d(O,b.top,A-O,b.bottom)}(!i||vo(y,i)<0)&&(i=y),vo(b,i)<0&&(i=b),(!a||vo(y,a)<0)&&(a=y),vo(b,a)<0&&(a=b)})),{start:i,end:a}}var p=t.from(),g=t.to();if(p.line==g.line)u(p.line,p.ch,g.ch);else{var h=Ze(n,p.line),f=Ze(n,g.line),m=Pt(h)==Pt(f),y=u(p.line,p.ch,m?h.text.length+1:null).end,b=u(g.line,m?0:null,g.ch).start;m&&(y.top<b.top-2?(d(y.right,y.top,null,y.bottom),d(l,b.top,b.left,b.bottom)):d(y.right,y.top,b.left-y.right,y.bottom)),y.bottom<b.top&&d(l,y.bottom,null,b.top)}r.appendChild(i)}function ko(e){if(e.state.focused){var t=e.display;clearInterval(t.blinker);var r=!0;t.cursorDiv.style.visibility="",e.options.cursorBlinkRate>0?t.blinker=setInterval((function(){e.hasFocus()||To(e),t.cursorDiv.style.visibility=(r=!r)?"":"hidden"}),e.options.cursorBlinkRate):e.options.cursorBlinkRate<0&&(t.cursorDiv.style.visibility="hidden")}}function Co(e){e.state.focused||(e.display.input.focus(),So(e))}function xo(e){e.state.delayingBlurEvent=!0,setTimeout((function(){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1,To(e))}),100)}function So(e,t){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1),"nocursor"!=e.options.readOnly&&(e.state.focused||(he(e,"focus",e,t),e.state.focused=!0,z(e.display.wrapper,"CodeMirror-focused"),e.curOp||e.display.selForContextMenu==e.doc.sel||(e.display.input.reset(),c&&setTimeout((function(){return e.display.input.reset(!0)}),20)),e.display.input.receivedFocus()),ko(e))}function To(e,t){e.state.delayingBlurEvent||(e.state.focused&&(he(e,"blur",e,t),e.state.focused=!1,L(e.display.wrapper,"CodeMirror-focused")),clearInterval(e.display.blinker),setTimeout((function(){e.state.focused||(e.display.shift=!1)}),150))}function Lo(e){for(var t=e.display,r=t.lineDiv.offsetTop,o=0;o<t.view.length;o++){var n=t.view[o],i=e.options.lineWrapping,c=void 0,s=0;if(!n.hidden){if(a&&l<8){var d=n.node.offsetTop+n.node.offsetHeight;c=d-r,r=d}else{var u=n.node.getBoundingClientRect();c=u.bottom-u.top,!i&&n.text.firstChild&&(s=n.text.firstChild.getBoundingClientRect().right-u.left-1)}var p=n.line.height-c;if((p>.005||p<-.005)&&(Ge(n.line,c),Eo(n.line),n.rest))for(var g=0;g<n.rest.length;g++)Eo(n.rest[g]);if(s>e.display.sizerWidth){var h=Math.ceil(s/oo(e.display));h>e.display.maxLineLength&&(e.display.maxLineLength=h,e.display.maxLine=n.line,e.display.maxLineChanged=!0)}}}}function Eo(e){if(e.widgets)for(var t=0;t<e.widgets.length;++t){var r=e.widgets[t],o=r.node.parentNode;o&&(r.height=o.offsetHeight)}}function Oo(e,t,r){var o=r&&null!=r.top?Math.max(0,r.top):e.scroller.scrollTop;o=Math.floor(o-Cr(e));var n=r&&null!=r.bottom?r.bottom:o+e.wrapper.clientHeight,i=Ye(t,o),a=Ye(t,n);if(r&&r.ensure){var l=r.ensure.from.line,c=r.ensure.to.line;l<i?(i=l,a=Ye(t,jt(Ze(t,l))+e.wrapper.clientHeight)):Math.min(c,t.lastLine())>=a&&(i=Ye(t,jt(Ze(t,c))-e.wrapper.clientHeight),a=c)}return{from:i,to:Math.max(a,i+1)}}function Ao(e,t){var r=e.display,o=ro(e.display);t.top<0&&(t.top=0);var n=e.curOp&&null!=e.curOp.scrollTop?e.curOp.scrollTop:r.scroller.scrollTop,i=Er(e),a={};t.bottom-t.top>i&&(t.bottom=t.top+i);var l=e.doc.height+xr(r),c=t.top<o,s=t.bottom>l-o;if(t.top<n)a.scrollTop=c?0:t.top;else if(t.bottom>n+i){var d=Math.min(t.top,(s?l:t.bottom)-i);d!=n&&(a.scrollTop=d)}var u=e.options.fixedGutter?0:r.gutters.offsetWidth,p=e.curOp&&null!=e.curOp.scrollLeft?e.curOp.scrollLeft:r.scroller.scrollLeft-u,g=Lr(e)-r.gutters.offsetWidth,h=t.right-t.left>g;return h&&(t.right=t.left+g),t.left<10?a.scrollLeft=0:t.left<p?a.scrollLeft=Math.max(0,t.left+u-(h?0:10)):t.right>g+p-3&&(a.scrollLeft=t.right+(h?0:10)-g),a}function _o(e,t){null!=t&&(zo(e),e.curOp.scrollTop=(null==e.curOp.scrollTop?e.doc.scrollTop:e.curOp.scrollTop)+t)}function Mo(e){zo(e);var t=e.getCursor();e.curOp.scrollToPos={from:t,to:t,margin:e.options.cursorScrollMargin}}function Ro(e,t,r){null==t&&null==r||zo(e),null!=t&&(e.curOp.scrollLeft=t),null!=r&&(e.curOp.scrollTop=r)}function zo(e){var t=e.curOp.scrollToPos;t&&(e.curOp.scrollToPos=null,No(e,Jr(e,t.from),Jr(e,t.to),t.margin))}function No(e,t,r,o){var n=Ao(e,{left:Math.min(t.left,r.left),top:Math.min(t.top,r.top)-o,right:Math.max(t.right,r.right),bottom:Math.max(t.bottom,r.bottom)+o});Ro(e,n.scrollLeft,n.scrollTop)}function Fo(e,t){Math.abs(e.doc.scrollTop-t)<2||(r||sn(e,{top:t}),Io(e,t,!0),r&&sn(e),on(e,100))}function Io(e,t,r){t=Math.max(0,Math.min(e.display.scroller.scrollHeight-e.display.scroller.clientHeight,t)),(e.display.scroller.scrollTop!=t||r)&&(e.doc.scrollTop=t,e.display.scrollbars.setScrollTop(t),e.display.scroller.scrollTop!=t&&(e.display.scroller.scrollTop=t))}function Wo(e,t,r,o){t=Math.max(0,Math.min(t,e.display.scroller.scrollWidth-e.display.scroller.clientWidth)),(r?t==e.doc.scrollLeft:Math.abs(e.doc.scrollLeft-t)<2)&&!o||(e.doc.scrollLeft=t,pn(e),e.display.scroller.scrollLeft!=t&&(e.display.scroller.scrollLeft=t),e.display.scrollbars.setScrollLeft(t))}function Po(e){var t=e.display,r=t.gutters.offsetWidth,o=Math.round(e.doc.height+xr(e.display));return{clientHeight:t.scroller.clientHeight,viewHeight:t.wrapper.clientHeight,scrollWidth:t.scroller.scrollWidth,clientWidth:t.scroller.clientWidth,viewWidth:t.wrapper.clientWidth,barLeft:e.options.fixedGutter?r:0,docHeight:o,scrollHeight:o+Tr(e)+t.barHeight,nativeBarWidth:t.nativeBarWidth,gutterWidth:r}}var Ko=function(e,t,r){this.cm=r;var o=this.vert=A("div",[A("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),n=this.horiz=A("div",[A("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar");o.tabIndex=n.tabIndex=-1,e(o),e(n),ue(o,"scroll",(function(){o.clientHeight&&t(o.scrollTop,"vertical")})),ue(n,"scroll",(function(){n.clientWidth&&t(n.scrollLeft,"horizontal")})),this.checkedZeroWidth=!1,a&&l<8&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")};Ko.prototype.update=function(e){var t=e.scrollWidth>e.clientWidth+1,r=e.scrollHeight>e.clientHeight+1,o=e.nativeBarWidth;if(r){this.vert.style.display="block",this.vert.style.bottom=t?o+"px":"0";var n=e.viewHeight-(t?o:0);this.vert.firstChild.style.height=Math.max(0,e.scrollHeight-e.clientHeight+n)+"px"}else this.vert.style.display="",this.vert.firstChild.style.height="0";if(t){this.horiz.style.display="block",this.horiz.style.right=r?o+"px":"0",this.horiz.style.left=e.barLeft+"px";var i=e.viewWidth-e.barLeft-(r?o:0);this.horiz.firstChild.style.width=Math.max(0,e.scrollWidth-e.clientWidth+i)+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0";return!this.checkedZeroWidth&&e.clientHeight>0&&(0==o&&this.zeroWidthHack(),this.checkedZeroWidth=!0),{right:r?o:0,bottom:t?o:0}},Ko.prototype.setScrollLeft=function(e){this.horiz.scrollLeft!=e&&(this.horiz.scrollLeft=e),this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz,"horiz")},Ko.prototype.setScrollTop=function(e){this.vert.scrollTop!=e&&(this.vert.scrollTop=e),this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert,"vert")},Ko.prototype.zeroWidthHack=function(){var e=b&&!g?"12px":"18px";this.horiz.style.height=this.vert.style.width=e,this.horiz.style.pointerEvents=this.vert.style.pointerEvents="none",this.disableHoriz=new K,this.disableVert=new K},Ko.prototype.enableZeroWidthBar=function(e,t,r){e.style.pointerEvents="auto",t.set(1e3,(function o(){var n=e.getBoundingClientRect();("vert"==r?document.elementFromPoint(n.right-1,(n.top+n.bottom)/2):document.elementFromPoint((n.right+n.left)/2,n.bottom-1))!=e?e.style.pointerEvents="none":t.set(1e3,o)}))},Ko.prototype.clear=function(){var e=this.horiz.parentNode;e.removeChild(this.horiz),e.removeChild(this.vert)};var Uo=function(){};function Bo(e,t){t||(t=Po(e));var r=e.display.barWidth,o=e.display.barHeight;Do(e,t);for(var n=0;n<4&&r!=e.display.barWidth||o!=e.display.barHeight;n++)r!=e.display.barWidth&&e.options.lineWrapping&&Lo(e),Do(e,Po(e)),r=e.display.barWidth,o=e.display.barHeight}function Do(e,t){var r=e.display,o=r.scrollbars.update(t);r.sizer.style.paddingRight=(r.barWidth=o.right)+"px",r.sizer.style.paddingBottom=(r.barHeight=o.bottom)+"px",r.heightForcer.style.borderBottom=o.bottom+"px solid transparent",o.right&&o.bottom?(r.scrollbarFiller.style.display="block",r.scrollbarFiller.style.height=o.bottom+"px",r.scrollbarFiller.style.width=o.right+"px"):r.scrollbarFiller.style.display="",o.bottom&&e.options.coverGutterNextToScrollbar&&e.options.fixedGutter?(r.gutterFiller.style.display="block",r.gutterFiller.style.height=o.bottom+"px",r.gutterFiller.style.width=t.gutterWidth+"px"):r.gutterFiller.style.display=""}Uo.prototype.update=function(){return{bottom:0,right:0}},Uo.prototype.setScrollLeft=function(){},Uo.prototype.setScrollTop=function(){},Uo.prototype.clear=function(){};var jo={native:Ko,null:Uo};function Ho(e){e.display.scrollbars&&(e.display.scrollbars.clear(),e.display.scrollbars.addClass&&L(e.display.wrapper,e.display.scrollbars.addClass)),e.display.scrollbars=new jo[e.options.scrollbarStyle]((function(t){e.display.wrapper.insertBefore(t,e.display.scrollbarFiller),ue(t,"mousedown",(function(){e.state.focused&&setTimeout((function(){return e.display.input.focus()}),0)})),t.setAttribute("cm-not-content","true")}),(function(t,r){"horizontal"==r?Wo(e,t):Fo(e,t)}),e),e.display.scrollbars.addClass&&z(e.display.wrapper,e.display.scrollbars.addClass)}var Vo=0;function Zo(e){var t;e.curOp={cm:e,viewChanged:!1,startHeight:e.doc.height,forceUpdate:!1,updateInput:0,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++Vo},t=e.curOp,ir?ir.ops.push(t):t.ownsGroup=ir={ops:[t],delayedCallbacks:[]}}function Jo(e){var t=e.curOp;t&&function(e,t){var r=e.ownsGroup;if(r)try{!function(e){var t=e.delayedCallbacks,r=0;do{for(;r<t.length;r++)t[r].call(null);for(var o=0;o<e.ops.length;o++){var n=e.ops[o];if(n.cursorActivityHandlers)for(;n.cursorActivityCalled<n.cursorActivityHandlers.length;)n.cursorActivityHandlers[n.cursorActivityCalled++].call(null,n.cm)}}while(r<t.length)}(r)}finally{ir=null,function(e){for(var t=0;t<e.ops.length;t++)e.ops[t].cm.curOp=null;!function(e){for(var t=e.ops,r=0;r<t.length;r++)qo(t[r]);for(var o=0;o<t.length;o++)Go(t[o]);for(var n=0;n<t.length;n++)Qo(t[n]);for(var i=0;i<t.length;i++)Yo(t[i]);for(var a=0;a<t.length;a++)Xo(t[a])}(e)}(r)}}(t)}function qo(e){var t=e.cm,r=t.display;!function(e){var t=e.display;!t.scrollbarsClipped&&t.scroller.offsetWidth&&(t.nativeBarWidth=t.scroller.offsetWidth-t.scroller.clientWidth,t.heightForcer.style.height=Tr(e)+"px",t.sizer.style.marginBottom=-t.nativeBarWidth+"px",t.sizer.style.borderRightWidth=Tr(e)+"px",t.scrollbarsClipped=!0)}(t),e.updateMaxLine&&Vt(t),e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<r.viewFrom||e.scrollToPos.to.line>=r.viewTo)||r.maxLineChanged&&t.options.lineWrapping,e.update=e.mustUpdate&&new an(t,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}function Go(e){e.updatedDisplay=e.mustUpdate&&ln(e.cm,e.update)}function Qo(e){var t=e.cm,r=t.display;e.updatedDisplay&&Lo(t),e.barMeasure=Po(t),r.maxLineChanged&&!t.options.lineWrapping&&(e.adjustWidthTo=Ar(t,r.maxLine,r.maxLine.text.length).left+3,t.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(r.scroller.clientWidth,r.sizer.offsetLeft+e.adjustWidthTo+Tr(t)+t.display.barWidth),e.maxScrollLeft=Math.max(0,r.sizer.offsetLeft+e.adjustWidthTo-Lr(t))),(e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=r.input.prepareSelection())}function Yo(e){var t=e.cm;null!=e.adjustWidthTo&&(t.display.sizer.style.minWidth=e.adjustWidthTo+"px",e.maxScrollLeft<t.doc.scrollLeft&&Wo(t,Math.min(t.display.scroller.scrollLeft,e.maxScrollLeft),!0),t.display.maxLineChanged=!1);var r=e.focus&&e.focus==R();e.preparedSelection&&t.display.input.showSelection(e.preparedSelection,r),(e.updatedDisplay||e.startHeight!=t.doc.height)&&Bo(t,e.barMeasure),e.updatedDisplay&&un(t,e.barMeasure),e.selectionChanged&&ko(t),t.state.focused&&e.updateInput&&t.display.input.reset(e.typing),r&&Co(e.cm)}function Xo(e){var t=e.cm,r=t.display,o=t.doc;e.updatedDisplay&&cn(t,e.update),null==r.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(r.wheelStartX=r.wheelStartY=null),null!=e.scrollTop&&Io(t,e.scrollTop,e.forceScroll),null!=e.scrollLeft&&Wo(t,e.scrollLeft,!0,!0),e.scrollToPos&&function(e,t){if(!fe(e,"scrollCursorIntoView")){var r=e.display,o=r.sizer.getBoundingClientRect(),n=null;if(t.top+o.top<0?n=!0:t.bottom+o.top>(window.innerHeight||document.documentElement.clientHeight)&&(n=!1),null!=n&&!h){var i=A("div","​",null,"position: absolute;\n                         top: "+(t.top-r.viewOffset-Cr(e.display))+"px;\n                         height: "+(t.bottom-t.top+Tr(e)+r.barHeight)+"px;\n                         left: "+t.left+"px; width: "+Math.max(2,t.right-t.left)+"px;");e.display.lineSpace.appendChild(i),i.scrollIntoView(n),e.display.lineSpace.removeChild(i)}}}(t,function(e,t,r,o){var n;null==o&&(o=0),e.options.lineWrapping||t!=r||(r="before"==(t=t.ch?et(t.line,"before"==t.sticky?t.ch-1:t.ch,"after"):t).sticky?et(t.line,t.ch+1,"before"):t);for(var i=0;i<5;i++){var a=!1,l=Zr(e,t),c=r&&r!=t?Zr(e,r):l,s=Ao(e,n={left:Math.min(l.left,c.left),top:Math.min(l.top,c.top)-o,right:Math.max(l.left,c.left),bottom:Math.max(l.bottom,c.bottom)+o}),d=e.doc.scrollTop,u=e.doc.scrollLeft;if(null!=s.scrollTop&&(Fo(e,s.scrollTop),Math.abs(e.doc.scrollTop-d)>1&&(a=!0)),null!=s.scrollLeft&&(Wo(e,s.scrollLeft),Math.abs(e.doc.scrollLeft-u)>1&&(a=!0)),!a)break}return n}(t,lt(o,e.scrollToPos.from),lt(o,e.scrollToPos.to),e.scrollToPos.margin));var n=e.maybeHiddenMarkers,i=e.maybeUnhiddenMarkers;if(n)for(var a=0;a<n.length;++a)n[a].lines.length||he(n[a],"hide");if(i)for(var l=0;l<i.length;++l)i[l].lines.length&&he(i[l],"unhide");r.wrapper.offsetHeight&&(o.scrollTop=t.display.scroller.scrollTop),e.changeObjs&&he(t,"changes",t,e.changeObjs),e.update&&e.update.finish()}function $o(e,t){if(e.curOp)return t();Zo(e);try{return t()}finally{Jo(e)}}function en(e,t){return function(){if(e.curOp)return t.apply(e,arguments);Zo(e);try{return t.apply(e,arguments)}finally{Jo(e)}}}function tn(e){return function(){if(this.curOp)return e.apply(this,arguments);Zo(this);try{return e.apply(this,arguments)}finally{Jo(this)}}}function rn(e){return function(){var t=this.cm;if(!t||t.curOp)return e.apply(this,arguments);Zo(t);try{return e.apply(this,arguments)}finally{Jo(t)}}}function on(e,t){e.doc.highlightFrontier<e.display.viewTo&&e.state.highlight.set(t,I(nn,e))}function nn(e){var t=e.doc;if(!(t.highlightFrontier>=e.display.viewTo)){var r=+new Date+e.options.workTime,o=gt(e,t.highlightFrontier),n=[];t.iter(o.line,Math.min(t.first+t.size,e.display.viewTo+500),(function(i){if(o.line>=e.display.viewFrom){var a=i.styles,l=i.text.length>e.options.maxHighlightLength?De(t.mode,o.state):null,c=ut(e,i,o,!0);l&&(o.state=l),i.styles=c.styles;var s=i.styleClasses,d=c.classes;d?i.styleClasses=d:s&&(i.styleClasses=null);for(var u=!a||a.length!=i.styles.length||s!=d&&(!s||!d||s.bgClass!=d.bgClass||s.textClass!=d.textClass),p=0;!u&&p<a.length;++p)u=a[p]!=i.styles[p];u&&n.push(o.line),i.stateAfter=o.save(),o.nextLine()}else i.text.length<=e.options.maxHighlightLength&&ht(e,i.text,o),i.stateAfter=o.line%5==0?o.save():null,o.nextLine();if(+new Date>r)return on(e,e.options.workDelay),!0})),t.highlightFrontier=o.line,t.modeFrontier=Math.max(t.modeFrontier,o.line),n.length&&$o(e,(function(){for(var t=0;t<n.length;t++)po(e,n[t],"text")}))}}var an=function(e,t,r){var o=e.display;this.viewport=t,this.visible=Oo(o,e.doc,t),this.editorIsHidden=!o.wrapper.offsetWidth,this.wrapperHeight=o.wrapper.clientHeight,this.wrapperWidth=o.wrapper.clientWidth,this.oldDisplayWidth=Lr(e),this.force=r,this.dims=no(e),this.events=[]};function ln(e,t){var r=e.display,o=e.doc;if(t.editorIsHidden)return go(e),!1;if(!t.force&&t.visible.from>=r.viewFrom&&t.visible.to<=r.viewTo&&(null==r.updateLineNumbers||r.updateLineNumbers>=r.viewTo)&&r.renderedView==r.view&&0==fo(e))return!1;gn(e)&&(go(e),t.dims=no(e));var n=o.first+o.size,i=Math.max(t.visible.from-e.options.viewportMargin,o.first),a=Math.min(n,t.visible.to+e.options.viewportMargin);r.viewFrom<i&&i-r.viewFrom<20&&(i=Math.max(o.first,r.viewFrom)),r.viewTo>a&&r.viewTo-a<20&&(a=Math.min(n,r.viewTo)),Ct&&(i=Kt(e.doc,i),a=Ut(e.doc,a));var l=i!=r.viewFrom||a!=r.viewTo||r.lastWrapHeight!=t.wrapperHeight||r.lastWrapWidth!=t.wrapperWidth;!function(e,t,r){var o=e.display;0==o.view.length||t>=o.viewTo||r<=o.viewFrom?(o.view=nr(e,t,r),o.viewFrom=t):(o.viewFrom>t?o.view=nr(e,t,o.viewFrom).concat(o.view):o.viewFrom<t&&(o.view=o.view.slice(so(e,t))),o.viewFrom=t,o.viewTo<r?o.view=o.view.concat(nr(e,o.viewTo,r)):o.viewTo>r&&(o.view=o.view.slice(0,so(e,r)))),o.viewTo=r}(e,i,a),r.viewOffset=jt(Ze(e.doc,r.viewFrom)),e.display.mover.style.top=r.viewOffset+"px";var s=fo(e);if(!l&&0==s&&!t.force&&r.renderedView==r.view&&(null==r.updateLineNumbers||r.updateLineNumbers>=r.viewTo))return!1;var d=function(e){if(e.hasFocus())return null;var t=R();if(!t||!M(e.display.lineDiv,t))return null;var r={activeElt:t};if(window.getSelection){var o=window.getSelection();o.anchorNode&&o.extend&&M(e.display.lineDiv,o.anchorNode)&&(r.anchorNode=o.anchorNode,r.anchorOffset=o.anchorOffset,r.focusNode=o.focusNode,r.focusOffset=o.focusOffset)}return r}(e);return s>4&&(r.lineDiv.style.display="none"),function(e,t,r){var o=e.display,n=e.options.lineNumbers,i=o.lineDiv,a=i.firstChild;function l(t){var r=t.nextSibling;return c&&b&&e.display.currentWheelTarget==t?t.style.display="none":t.parentNode.removeChild(t),r}for(var s=o.view,d=o.viewFrom,u=0;u<s.length;u++){var p=s[u];if(p.hidden);else if(p.node&&p.node.parentNode==i){for(;a!=p.node;)a=l(a);var g=n&&null!=t&&t<=d&&p.lineNumber;p.changes&&(U(p.changes,"gutter")>-1&&(g=!1),sr(e,p,d,r)),g&&(E(p.lineNumber),p.lineNumber.appendChild(document.createTextNode($e(e.options,d)))),a=p.node.nextSibling}else{var h=mr(e,p,d,r);i.insertBefore(h,a)}d+=p.size}for(;a;)a=l(a)}(e,r.updateLineNumbers,t.dims),s>4&&(r.lineDiv.style.display=""),r.renderedView=r.view,function(e){if(e&&e.activeElt&&e.activeElt!=R()&&(e.activeElt.focus(),!/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName)&&e.anchorNode&&M(document.body,e.anchorNode)&&M(document.body,e.focusNode))){var t=window.getSelection(),r=document.createRange();r.setEnd(e.anchorNode,e.anchorOffset),r.collapse(!1),t.removeAllRanges(),t.addRange(r),t.extend(e.focusNode,e.focusOffset)}}(d),E(r.cursorDiv),E(r.selectionDiv),r.gutters.style.height=r.sizer.style.minHeight=0,l&&(r.lastWrapHeight=t.wrapperHeight,r.lastWrapWidth=t.wrapperWidth,on(e,400)),r.updateLineNumbers=null,!0}function cn(e,t){for(var r=t.viewport,o=!0;;o=!1){if(o&&e.options.lineWrapping&&t.oldDisplayWidth!=Lr(e))o&&(t.visible=Oo(e.display,e.doc,r));else if(r&&null!=r.top&&(r={top:Math.min(e.doc.height+xr(e.display)-Er(e),r.top)}),t.visible=Oo(e.display,e.doc,r),t.visible.from>=e.display.viewFrom&&t.visible.to<=e.display.viewTo)break;if(!ln(e,t))break;Lo(e);var n=Po(e);mo(e),Bo(e,n),un(e,n),t.force=!1}t.signal(e,"update",e),e.display.viewFrom==e.display.reportedViewFrom&&e.display.viewTo==e.display.reportedViewTo||(t.signal(e,"viewportChange",e,e.display.viewFrom,e.display.viewTo),e.display.reportedViewFrom=e.display.viewFrom,e.display.reportedViewTo=e.display.viewTo)}function sn(e,t){var r=new an(e,t);if(ln(e,r)){Lo(e),cn(e,r);var o=Po(e);mo(e),Bo(e,o),un(e,o),r.finish()}}function dn(e){var t=e.gutters.offsetWidth;e.sizer.style.marginLeft=t+"px"}function un(e,t){e.display.sizer.style.minHeight=t.docHeight+"px",e.display.heightForcer.style.top=t.docHeight+"px",e.display.gutters.style.height=t.docHeight+e.display.barHeight+Tr(e)+"px"}function pn(e){var t=e.display,r=t.view;if(t.alignWidgets||t.gutters.firstChild&&e.options.fixedGutter){for(var o=io(t)-t.scroller.scrollLeft+e.doc.scrollLeft,n=t.gutters.offsetWidth,i=o+"px",a=0;a<r.length;a++)if(!r[a].hidden){e.options.fixedGutter&&(r[a].gutter&&(r[a].gutter.style.left=i),r[a].gutterBackground&&(r[a].gutterBackground.style.left=i));var l=r[a].alignable;if(l)for(var c=0;c<l.length;c++)l[c].style.left=i}e.options.fixedGutter&&(t.gutters.style.left=o+n+"px")}}function gn(e){if(!e.options.lineNumbers)return!1;var t=e.doc,r=$e(e.options,t.first+t.size-1),o=e.display;if(r.length!=o.lineNumChars){var n=o.measure.appendChild(A("div",[A("div",r)],"CodeMirror-linenumber CodeMirror-gutter-elt")),i=n.firstChild.offsetWidth,a=n.offsetWidth-i;return o.lineGutter.style.width="",o.lineNumInnerWidth=Math.max(i,o.lineGutter.offsetWidth-a)+1,o.lineNumWidth=o.lineNumInnerWidth+a,o.lineNumChars=o.lineNumInnerWidth?r.length:-1,o.lineGutter.style.width=o.lineNumWidth+"px",dn(e.display),!0}return!1}function hn(e,t){for(var r=[],o=!1,n=0;n<e.length;n++){var i=e[n],a=null;if("string"!=typeof i&&(a=i.style,i=i.className),"CodeMirror-linenumbers"==i){if(!t)continue;o=!0}r.push({className:i,style:a})}return t&&!o&&r.push({className:"CodeMirror-linenumbers",style:null}),r}function fn(e){var t=e.gutters,r=e.gutterSpecs;E(t),e.lineGutter=null;for(var o=0;o<r.length;++o){var n=r[o],i=n.className,a=n.style,l=t.appendChild(A("div",null,"CodeMirror-gutter "+i));a&&(l.style.cssText=a),"CodeMirror-linenumbers"==i&&(e.lineGutter=l,l.style.width=(e.lineNumWidth||1)+"px")}t.style.display=r.length?"":"none",dn(e)}function mn(e){fn(e.display),uo(e),pn(e)}function yn(e,t,o,n){var i=this;this.input=o,i.scrollbarFiller=A("div",null,"CodeMirror-scrollbar-filler"),i.scrollbarFiller.setAttribute("cm-not-content","true"),i.gutterFiller=A("div",null,"CodeMirror-gutter-filler"),i.gutterFiller.setAttribute("cm-not-content","true"),i.lineDiv=_("div",null,"CodeMirror-code"),i.selectionDiv=A("div",null,null,"position: relative; z-index: 1"),i.cursorDiv=A("div",null,"CodeMirror-cursors"),i.measure=A("div",null,"CodeMirror-measure"),i.lineMeasure=A("div",null,"CodeMirror-measure"),i.lineSpace=_("div",[i.measure,i.lineMeasure,i.selectionDiv,i.cursorDiv,i.lineDiv],null,"position: relative; outline: none");var s=_("div",[i.lineSpace],"CodeMirror-lines");i.mover=A("div",[s],null,"position: relative"),i.sizer=A("div",[i.mover],"CodeMirror-sizer"),i.sizerWidth=null,i.heightForcer=A("div",null,null,"position: absolute; height: 50px; width: 1px;"),i.gutters=A("div",null,"CodeMirror-gutters"),i.lineGutter=null,i.scroller=A("div",[i.sizer,i.heightForcer,i.gutters],"CodeMirror-scroll"),i.scroller.setAttribute("tabIndex","-1"),i.wrapper=A("div",[i.scrollbarFiller,i.gutterFiller,i.scroller],"CodeMirror"),a&&l<8&&(i.gutters.style.zIndex=-1,i.scroller.style.paddingRight=0),c||r&&y||(i.scroller.draggable=!0),e&&(e.appendChild?e.appendChild(i.wrapper):e(i.wrapper)),i.viewFrom=i.viewTo=t.first,i.reportedViewFrom=i.reportedViewTo=t.first,i.view=[],i.renderedView=null,i.externalMeasured=null,i.viewOffset=0,i.lastWrapHeight=i.lastWrapWidth=0,i.updateLineNumbers=null,i.nativeBarWidth=i.barHeight=i.barWidth=0,i.scrollbarsClipped=!1,i.lineNumWidth=i.lineNumInnerWidth=i.lineNumChars=null,i.alignWidgets=!1,i.cachedCharWidth=i.cachedTextHeight=i.cachedPaddingH=null,i.maxLine=null,i.maxLineLength=0,i.maxLineChanged=!1,i.wheelDX=i.wheelDY=i.wheelStartX=i.wheelStartY=null,i.shift=!1,i.selForContextMenu=null,i.activeTouch=null,i.gutterSpecs=hn(n.gutters,n.lineNumbers),fn(i),o.init(i)}an.prototype.signal=function(e,t){ye(e,t)&&this.events.push(arguments)},an.prototype.finish=function(){for(var e=0;e<this.events.length;e++)he.apply(null,this.events[e])};var bn=0,vn=null;function wn(e){var t=e.wheelDeltaX,r=e.wheelDeltaY;return null==t&&e.detail&&e.axis==e.HORIZONTAL_AXIS&&(t=e.detail),null==r&&e.detail&&e.axis==e.VERTICAL_AXIS?r=e.detail:null==r&&(r=e.wheelDelta),{x:t,y:r}}function kn(e){var t=wn(e);return t.x*=vn,t.y*=vn,t}function Cn(e,t){var o=wn(t),n=o.x,i=o.y,a=e.display,l=a.scroller,s=l.scrollWidth>l.clientWidth,d=l.scrollHeight>l.clientHeight;if(n&&s||i&&d){if(i&&b&&c)e:for(var p=t.target,g=a.view;p!=l;p=p.parentNode)for(var h=0;h<g.length;h++)if(g[h].node==p){e.display.currentWheelTarget=p;break e}if(n&&!r&&!u&&null!=vn)return i&&d&&Fo(e,Math.max(0,l.scrollTop+i*vn)),Wo(e,Math.max(0,l.scrollLeft+n*vn)),(!i||i&&d)&&ve(t),void(a.wheelStartX=null);if(i&&null!=vn){var f=i*vn,m=e.doc.scrollTop,y=m+a.wrapper.clientHeight;f<0?m=Math.max(0,m+f-50):y=Math.min(e.doc.height,y+f+50),sn(e,{top:m,bottom:y})}bn<20&&(null==a.wheelStartX?(a.wheelStartX=l.scrollLeft,a.wheelStartY=l.scrollTop,a.wheelDX=n,a.wheelDY=i,setTimeout((function(){if(null!=a.wheelStartX){var e=l.scrollLeft-a.wheelStartX,t=l.scrollTop-a.wheelStartY,r=t&&a.wheelDY&&t/a.wheelDY||e&&a.wheelDX&&e/a.wheelDX;a.wheelStartX=a.wheelStartY=null,r&&(vn=(vn*bn+r)/(bn+1),++bn)}}),200)):(a.wheelDX+=n,a.wheelDY+=i))}}a?vn=-.53:r?vn=15:d?vn=-.7:p&&(vn=-1/3);var xn=function(e,t){this.ranges=e,this.primIndex=t};xn.prototype.primary=function(){return this.ranges[this.primIndex]},xn.prototype.equals=function(e){if(e==this)return!0;if(e.primIndex!=this.primIndex||e.ranges.length!=this.ranges.length)return!1;for(var t=0;t<this.ranges.length;t++){var r=this.ranges[t],o=e.ranges[t];if(!rt(r.anchor,o.anchor)||!rt(r.head,o.head))return!1}return!0},xn.prototype.deepCopy=function(){for(var e=[],t=0;t<this.ranges.length;t++)e[t]=new Sn(ot(this.ranges[t].anchor),ot(this.ranges[t].head));return new xn(e,this.primIndex)},xn.prototype.somethingSelected=function(){for(var e=0;e<this.ranges.length;e++)if(!this.ranges[e].empty())return!0;return!1},xn.prototype.contains=function(e,t){t||(t=e);for(var r=0;r<this.ranges.length;r++){var o=this.ranges[r];if(tt(t,o.from())>=0&&tt(e,o.to())<=0)return r}return-1};var Sn=function(e,t){this.anchor=e,this.head=t};function Tn(e,t,r){var o=e&&e.options.selectionsMayTouch,n=t[r];t.sort((function(e,t){return tt(e.from(),t.from())})),r=U(t,n);for(var i=1;i<t.length;i++){var a=t[i],l=t[i-1],c=tt(l.to(),a.from());if(o&&!a.empty()?c>0:c>=0){var s=it(l.from(),a.from()),d=nt(l.to(),a.to()),u=l.empty()?a.from()==a.head:l.from()==l.head;i<=r&&--r,t.splice(--i,2,new Sn(u?d:s,u?s:d))}}return new xn(t,r)}function Ln(e,t){return new xn([new Sn(e,t||e)],0)}function En(e){return e.text?et(e.from.line+e.text.length-1,q(e.text).length+(1==e.text.length?e.from.ch:0)):e.to}function On(e,t){if(tt(e,t.from)<0)return e;if(tt(e,t.to)<=0)return En(t);var r=e.line+t.text.length-(t.to.line-t.from.line)-1,o=e.ch;return e.line==t.to.line&&(o+=En(t).ch-t.to.ch),et(r,o)}function An(e,t){for(var r=[],o=0;o<e.sel.ranges.length;o++){var n=e.sel.ranges[o];r.push(new Sn(On(n.anchor,t),On(n.head,t)))}return Tn(e.cm,r,e.sel.primIndex)}function _n(e,t,r){return e.line==t.line?et(r.line,e.ch-t.ch+r.ch):et(r.line+(e.line-t.line),e.ch)}function Mn(e){e.doc.mode=Ke(e.options,e.doc.modeOption),Rn(e)}function Rn(e){e.doc.iter((function(e){e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null)})),e.doc.modeFrontier=e.doc.highlightFrontier=e.doc.first,on(e,100),e.state.modeGen++,e.curOp&&uo(e)}function zn(e,t){return 0==t.from.ch&&0==t.to.ch&&""==q(t.text)&&(!e.cm||e.cm.options.wholeLineUpdateBefore)}function Nn(e,t,r,o){function n(e){return r?r[e]:null}function i(e,r,n){!function(e,t,r,o){e.text=t,e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null),null!=e.order&&(e.order=null),Ot(e),At(e,r);var n=o?o(e):1;n!=e.height&&Ge(e,n)}(e,r,n,o),lr(e,"change",e,t)}function a(e,t){for(var r=[],i=e;i<t;++i)r.push(new Zt(s[i],n(i),o));return r}var l=t.from,c=t.to,s=t.text,d=Ze(e,l.line),u=Ze(e,c.line),p=q(s),g=n(s.length-1),h=c.line-l.line;if(t.full)e.insert(0,a(0,s.length)),e.remove(s.length,e.size-s.length);else if(zn(e,t)){var f=a(0,s.length-1);i(u,u.text,g),h&&e.remove(l.line,h),f.length&&e.insert(l.line,f)}else if(d==u)if(1==s.length)i(d,d.text.slice(0,l.ch)+p+d.text.slice(c.ch),g);else{var m=a(1,s.length-1);m.push(new Zt(p+d.text.slice(c.ch),g,o)),i(d,d.text.slice(0,l.ch)+s[0],n(0)),e.insert(l.line+1,m)}else if(1==s.length)i(d,d.text.slice(0,l.ch)+s[0]+u.text.slice(c.ch),n(0)),e.remove(l.line+1,h);else{i(d,d.text.slice(0,l.ch)+s[0],n(0)),i(u,p+u.text.slice(c.ch),g);var y=a(1,s.length-1);h>1&&e.remove(l.line+1,h-1),e.insert(l.line+1,y)}lr(e,"change",e,t)}function Fn(e,t,r){!function e(o,n,i){if(o.linked)for(var a=0;a<o.linked.length;++a){var l=o.linked[a];if(l.doc!=n){var c=i&&l.sharedHist;r&&!c||(t(l.doc,c),e(l.doc,o,c))}}}(e,null,!0)}function In(e,t){if(t.cm)throw Error("This document is already in use.");e.doc=t,t.cm=e,lo(e),Mn(e),Wn(e),e.options.lineWrapping||Vt(e),e.options.mode=t.modeOption,uo(e)}function Wn(e){("rtl"==e.doc.direction?z:L)(e.display.lineDiv,"CodeMirror-rtl")}function Pn(e){this.done=[],this.undone=[],this.undoDepth=1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=e||1}function Kn(e,t){var r={from:ot(t.from),to:En(t),text:Je(e,t.from,t.to)};return jn(e,r,t.from.line,t.to.line+1),Fn(e,(function(e){return jn(e,r,t.from.line,t.to.line+1)}),!0),r}function Un(e){for(;e.length&&q(e).ranges;)e.pop()}function Bn(e,t,r,o){var n=e.history;n.undone.length=0;var i,a,l=+new Date;if((n.lastOp==o||n.lastOrigin==t.origin&&t.origin&&("+"==t.origin.charAt(0)&&n.lastModTime>l-(e.cm?e.cm.options.historyEventDelay:500)||"*"==t.origin.charAt(0)))&&(i=function(e,t){return t?(Un(e.done),q(e.done)):e.done.length&&!q(e.done).ranges?q(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(),q(e.done)):void 0}(n,n.lastOp==o)))a=q(i.changes),0==tt(t.from,t.to)&&0==tt(t.from,a.to)?a.to=En(t):i.changes.push(Kn(e,t));else{var c=q(n.done);for(c&&c.ranges||Dn(e.sel,n.done),i={changes:[Kn(e,t)],generation:n.generation},n.done.push(i);n.done.length>n.undoDepth;)n.done.shift(),n.done[0].ranges||n.done.shift()}n.done.push(r),n.generation=++n.maxGeneration,n.lastModTime=n.lastSelTime=l,n.lastOp=n.lastSelOp=o,n.lastOrigin=n.lastSelOrigin=t.origin,a||he(e,"historyAdded")}function Dn(e,t){var r=q(t);r&&r.ranges&&r.equals(e)||t.push(e)}function jn(e,t,r,o){var n=t["spans_"+e.id],i=0;e.iter(Math.max(e.first,r),Math.min(e.first+e.size,o),(function(r){r.markedSpans&&((n||(n=t["spans_"+e.id]={}))[i]=r.markedSpans),++i}))}function Hn(e){if(!e)return null;for(var t,r=0;r<e.length;++r)e[r].marker.explicitlyCleared?t||(t=e.slice(0,r)):t&&t.push(e[r]);return t?t.length?t:null:e}function Vn(e,t){var r=function(e,t){var r=t["spans_"+e.id];if(!r)return null;for(var o=[],n=0;n<t.text.length;++n)o.push(Hn(r[n]));return o}(e,t),o=Lt(e,t);if(!r)return o;if(!o)return r;for(var n=0;n<r.length;++n){var i=r[n],a=o[n];if(i&&a)e:for(var l=0;l<a.length;++l){for(var c=a[l],s=0;s<i.length;++s)if(i[s].marker==c.marker)continue e;i.push(c)}else a&&(r[n]=a)}return r}function Zn(e,t,r){for(var o=[],n=0;n<e.length;++n){var i=e[n];if(i.ranges)o.push(r?xn.prototype.deepCopy.call(i):i);else{var a=i.changes,l=[];o.push({changes:l});for(var c=0;c<a.length;++c){var s=a[c],d=void 0;if(l.push({from:s.from,to:s.to,text:s.text}),t)for(var u in s)(d=u.match(/^spans_(\d+)$/))&&U(t,Number(d[1]))>-1&&(q(l)[u]=s[u],delete s[u])}}}return o}function Jn(e,t,r,o){if(o){var n=e.anchor;if(r){var i=tt(t,n)<0;i!=tt(r,n)<0?(n=t,t=r):i!=tt(t,r)<0&&(t=r)}return new Sn(n,t)}return new Sn(r||t,t)}function qn(e,t,r,o,n){null==n&&(n=e.cm&&(e.cm.display.shift||e.extend)),$n(e,new xn([Jn(e.sel.primary(),t,r,n)],0),o)}function Gn(e,t,r){for(var o=[],n=e.cm&&(e.cm.display.shift||e.extend),i=0;i<e.sel.ranges.length;i++)o[i]=Jn(e.sel.ranges[i],t[i],null,n);$n(e,Tn(e.cm,o,e.sel.primIndex),r)}function Qn(e,t,r,o){var n=e.sel.ranges.slice(0);n[t]=r,$n(e,Tn(e.cm,n,e.sel.primIndex),o)}function Yn(e,t,r,o){$n(e,Ln(t,r),o)}function Xn(e,t,r){var o=e.history.done,n=q(o);n&&n.ranges?(o[o.length-1]=t,ei(e,t,r)):$n(e,t,r)}function $n(e,t,r){ei(e,t,r),function(e,t,r,o){var n=e.history,i=o&&o.origin;r==n.lastSelOp||i&&n.lastSelOrigin==i&&(n.lastModTime==n.lastSelTime&&n.lastOrigin==i||function(e,t,r,o){var n=t.charAt(0);return"*"==n||"+"==n&&r.ranges.length==o.ranges.length&&r.somethingSelected()==o.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500)}(e,i,q(n.done),t))?n.done[n.done.length-1]=t:Dn(t,n.done),n.lastSelTime=+new Date,n.lastSelOrigin=i,n.lastSelOp=r,o&&!1!==o.clearRedo&&Un(n.undone)}(e,e.sel,e.cm?e.cm.curOp.id:NaN,r)}function ei(e,t,r){(ye(e,"beforeSelectionChange")||e.cm&&ye(e.cm,"beforeSelectionChange"))&&(t=function(e,t,r){var o={ranges:t.ranges,update:function(t){this.ranges=[];for(var r=0;r<t.length;r++)this.ranges[r]=new Sn(lt(e,t[r].anchor),lt(e,t[r].head))},origin:r&&r.origin};return he(e,"beforeSelectionChange",e,o),e.cm&&he(e.cm,"beforeSelectionChange",e.cm,o),o.ranges!=t.ranges?Tn(e.cm,o.ranges,o.ranges.length-1):t}(e,t,r));var o=r&&r.bias||(tt(t.primary().head,e.sel.primary().head)<0?-1:1);ti(e,oi(e,t,o,!0)),r&&!1===r.scroll||!e.cm||Mo(e.cm)}function ti(e,t){t.equals(e.sel)||(e.sel=t,e.cm&&(e.cm.curOp.updateInput=1,e.cm.curOp.selectionChanged=!0,me(e.cm)),lr(e,"cursorActivity",e))}function ri(e){ti(e,oi(e,e.sel,null,!1))}function oi(e,t,r,o){for(var n,i=0;i<t.ranges.length;i++){var a=t.ranges[i],l=t.ranges.length==e.sel.ranges.length&&e.sel.ranges[i],c=ii(e,a.anchor,l&&l.anchor,r,o),s=ii(e,a.head,l&&l.head,r,o);(n||c!=a.anchor||s!=a.head)&&(n||(n=t.ranges.slice(0,i)),n[i]=new Sn(c,s))}return n?Tn(e.cm,n,t.primIndex):t}function ni(e,t,r,o,n){var i=Ze(e,t.line);if(i.markedSpans)for(var a=0;a<i.markedSpans.length;++a){var l=i.markedSpans[a],c=l.marker,s="selectLeft"in c?!c.selectLeft:c.inclusiveLeft,d="selectRight"in c?!c.selectRight:c.inclusiveRight;if((null==l.from||(s?l.from<=t.ch:l.from<t.ch))&&(null==l.to||(d?l.to>=t.ch:l.to>t.ch))){if(n&&(he(c,"beforeCursorEnter"),c.explicitlyCleared)){if(i.markedSpans){--a;continue}break}if(!c.atomic)continue;if(r){var u=c.find(o<0?1:-1),p=void 0;if((o<0?d:s)&&(u=ai(e,u,-o,u&&u.line==t.line?i:null)),u&&u.line==t.line&&(p=tt(u,r))&&(o<0?p<0:p>0))return ni(e,u,t,o,n)}var g=c.find(o<0?-1:1);return(o<0?s:d)&&(g=ai(e,g,o,g.line==t.line?i:null)),g?ni(e,g,t,o,n):null}}return t}function ii(e,t,r,o,n){var i=o||1;return ni(e,t,r,i,n)||!n&&ni(e,t,r,i,!0)||ni(e,t,r,-i,n)||!n&&ni(e,t,r,-i,!0)||(e.cantEdit=!0,et(e.first,0))}function ai(e,t,r,o){return r<0&&0==t.ch?t.line>e.first?lt(e,et(t.line-1)):null:r>0&&t.ch==(o||Ze(e,t.line)).text.length?t.line<e.first+e.size-1?et(t.line+1,0):null:new et(t.line,t.ch+r)}function li(e){e.setSelection(et(e.firstLine(),0),et(e.lastLine()),D)}function ci(e,t,r){var o={canceled:!1,from:t.from,to:t.to,text:t.text,origin:t.origin,cancel:function(){return o.canceled=!0}};return r&&(o.update=function(t,r,n,i){t&&(o.from=lt(e,t)),r&&(o.to=lt(e,r)),n&&(o.text=n),void 0!==i&&(o.origin=i)}),he(e,"beforeChange",e,o),e.cm&&he(e.cm,"beforeChange",e.cm,o),o.canceled?(e.cm&&(e.cm.curOp.updateInput=2),null):{from:o.from,to:o.to,text:o.text,origin:o.origin}}function si(e,t,r){if(e.cm){if(!e.cm.curOp)return en(e.cm,si)(e,t,r);if(e.cm.state.suppressEdits)return}if(!(ye(e,"beforeChange")||e.cm&&ye(e.cm,"beforeChange"))||(t=ci(e,t,!0))){var o=kt&&!r&&function(e,t,r){var o=null;if(e.iter(t.line,r.line+1,(function(e){if(e.markedSpans)for(var t=0;t<e.markedSpans.length;++t){var r=e.markedSpans[t].marker;!r.readOnly||o&&-1!=U(o,r)||(o||(o=[])).push(r)}})),!o)return null;for(var n=[{from:t,to:r}],i=0;i<o.length;++i)for(var a=o[i],l=a.find(0),c=0;c<n.length;++c){var s=n[c];if(!(tt(s.to,l.from)<0||tt(s.from,l.to)>0)){var d=[c,1],u=tt(s.from,l.from),p=tt(s.to,l.to);(u<0||!a.inclusiveLeft&&!u)&&d.push({from:s.from,to:l.from}),(p>0||!a.inclusiveRight&&!p)&&d.push({from:l.to,to:s.to}),n.splice.apply(n,d),c+=d.length-3}}return n}(e,t.from,t.to);if(o)for(var n=o.length-1;n>=0;--n)di(e,{from:o[n].from,to:o[n].to,text:n?[""]:t.text,origin:t.origin});else di(e,t)}}function di(e,t){if(1!=t.text.length||""!=t.text[0]||0!=tt(t.from,t.to)){var r=An(e,t);Bn(e,t,r,e.cm?e.cm.curOp.id:NaN),gi(e,t,r,Lt(e,t));var o=[];Fn(e,(function(e,r){r||-1!=U(o,e.history)||(yi(e.history,t),o.push(e.history)),gi(e,t,null,Lt(e,t))}))}}function ui(e,t,r){var o=e.cm&&e.cm.state.suppressEdits;if(!o||r){for(var n,i=e.history,a=e.sel,l="undo"==t?i.done:i.undone,c="undo"==t?i.undone:i.done,s=0;s<l.length&&(n=l[s],r?!n.ranges||n.equals(e.sel):n.ranges);s++);if(s!=l.length){for(i.lastOrigin=i.lastSelOrigin=null;;){if(!(n=l.pop()).ranges){if(o)return void l.push(n);break}if(Dn(n,c),r&&!n.equals(e.sel))return void $n(e,n,{clearRedo:!1});a=n}var d=[];Dn(a,c),c.push({changes:d,generation:i.generation}),i.generation=n.generation||++i.maxGeneration;for(var u=ye(e,"beforeChange")||e.cm&&ye(e.cm,"beforeChange"),p=function(r){var o=n.changes[r];if(o.origin=t,u&&!ci(e,o,!1))return l.length=0,{};d.push(Kn(e,o));var i=r?An(e,o):q(l);gi(e,o,i,Vn(e,o)),!r&&e.cm&&e.cm.scrollIntoView({from:o.from,to:En(o)});var a=[];Fn(e,(function(e,t){t||-1!=U(a,e.history)||(yi(e.history,o),a.push(e.history)),gi(e,o,null,Vn(e,o))}))},g=n.changes.length-1;g>=0;--g){var h=p(g);if(h)return h.v}}}}function pi(e,t){if(0!=t&&(e.first+=t,e.sel=new xn(G(e.sel.ranges,(function(e){return new Sn(et(e.anchor.line+t,e.anchor.ch),et(e.head.line+t,e.head.ch))})),e.sel.primIndex),e.cm)){uo(e.cm,e.first,e.first-t,t);for(var r=e.cm.display,o=r.viewFrom;o<r.viewTo;o++)po(e.cm,o,"gutter")}}function gi(e,t,r,o){if(e.cm&&!e.cm.curOp)return en(e.cm,gi)(e,t,r,o);if(t.to.line<e.first)pi(e,t.text.length-1-(t.to.line-t.from.line));else if(!(t.from.line>e.lastLine())){if(t.from.line<e.first){var n=t.text.length-1-(e.first-t.from.line);pi(e,n),t={from:et(e.first,0),to:et(t.to.line+n,t.to.ch),text:[q(t.text)],origin:t.origin}}var i=e.lastLine();t.to.line>i&&(t={from:t.from,to:et(i,Ze(e,i).text.length),text:[t.text[0]],origin:t.origin}),t.removed=Je(e,t.from,t.to),r||(r=An(e,t)),e.cm?function(e,t,r){var o=e.doc,n=e.display,i=t.from,a=t.to,l=!1,c=i.line;e.options.lineWrapping||(c=Qe(Pt(Ze(o,i.line))),o.iter(c,a.line+1,(function(e){if(e==n.maxLine)return l=!0,!0}))),o.sel.contains(t.from,t.to)>-1&&me(e),Nn(o,t,r,ao(e)),e.options.lineWrapping||(o.iter(c,i.line+t.text.length,(function(e){var t=Ht(e);t>n.maxLineLength&&(n.maxLine=e,n.maxLineLength=t,n.maxLineChanged=!0,l=!1)})),l&&(e.curOp.updateMaxLine=!0)),function(e,t){if(e.modeFrontier=Math.min(e.modeFrontier,t),!(e.highlightFrontier<t-10)){for(var r=e.first,o=t-1;o>r;o--){var n=Ze(e,o).stateAfter;if(n&&(!(n instanceof st)||o+n.lookAhead<t)){r=o+1;break}}e.highlightFrontier=Math.min(e.highlightFrontier,r)}}(o,i.line),on(e,400);var s=t.text.length-(a.line-i.line)-1;t.full?uo(e):i.line!=a.line||1!=t.text.length||zn(e.doc,t)?uo(e,i.line,a.line+1,s):po(e,i.line,"text");var d=ye(e,"changes"),u=ye(e,"change");if(u||d){var p={from:i,to:a,text:t.text,removed:t.removed,origin:t.origin};u&&lr(e,"change",e,p),d&&(e.curOp.changeObjs||(e.curOp.changeObjs=[])).push(p)}e.display.selForContextMenu=null}(e.cm,t,o):Nn(e,t,o),ei(e,r,D),e.cantEdit&&ii(e,et(e.firstLine(),0))&&(e.cantEdit=!1)}}function hi(e,t,r,o,n){var i;o||(o=r),tt(o,r)<0&&(r=(i=[o,r])[0],o=i[1]),"string"==typeof t&&(t=e.splitLines(t)),si(e,{from:r,to:o,text:t,origin:n})}function fi(e,t,r,o){r<e.line?e.line+=o:t<e.line&&(e.line=t,e.ch=0)}function mi(e,t,r,o){for(var n=0;n<e.length;++n){var i=e[n],a=!0;if(i.ranges){i.copied||((i=e[n]=i.deepCopy()).copied=!0);for(var l=0;l<i.ranges.length;l++)fi(i.ranges[l].anchor,t,r,o),fi(i.ranges[l].head,t,r,o)}else{for(var c=0;c<i.changes.length;++c){var s=i.changes[c];if(r<s.from.line)s.from=et(s.from.line+o,s.from.ch),s.to=et(s.to.line+o,s.to.ch);else if(t<=s.to.line){a=!1;break}}a||(e.splice(0,n+1),n=0)}}}function yi(e,t){var r=t.from.line,o=t.to.line,n=t.text.length-(o-r)-1;mi(e.done,r,o,n),mi(e.undone,r,o,n)}function bi(e,t,r,o){var n=t,i=t;return"number"==typeof t?i=Ze(e,at(e,t)):n=Qe(t),null==n?null:(o(i,n)&&e.cm&&po(e.cm,n,r),i)}function vi(e){this.lines=e,this.parent=null;for(var t=0,r=0;r<e.length;++r)e[r].parent=this,t+=e[r].height;this.height=t}function wi(e){this.children=e;for(var t=0,r=0,o=0;o<e.length;++o){var n=e[o];t+=n.chunkSize(),r+=n.height,n.parent=this}this.size=t,this.height=r,this.parent=null}Sn.prototype.from=function(){return it(this.anchor,this.head)},Sn.prototype.to=function(){return nt(this.anchor,this.head)},Sn.prototype.empty=function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch},vi.prototype={chunkSize:function(){return this.lines.length},removeInner:function(e,t){for(var r=e,o=e+t;r<o;++r){var n=this.lines[r];this.height-=n.height,Jt(n),lr(n,"delete")}this.lines.splice(e,t)},collapse:function(e){e.push.apply(e,this.lines)},insertInner:function(e,t,r){this.height+=r,this.lines=this.lines.slice(0,e).concat(t).concat(this.lines.slice(e));for(var o=0;o<t.length;++o)t[o].parent=this},iterN:function(e,t,r){for(var o=e+t;e<o;++e)if(r(this.lines[e]))return!0}},wi.prototype={chunkSize:function(){return this.size},removeInner:function(e,t){this.size-=t;for(var r=0;r<this.children.length;++r){var o=this.children[r],n=o.chunkSize();if(e<n){var i=Math.min(t,n-e),a=o.height;if(o.removeInner(e,i),this.height-=a-o.height,n==i&&(this.children.splice(r--,1),o.parent=null),0==(t-=i))break;e=0}else e-=n}if(this.size-t<25&&(this.children.length>1||!(this.children[0]instanceof vi))){var l=[];this.collapse(l),this.children=[new vi(l)],this.children[0].parent=this}},collapse:function(e){for(var t=0;t<this.children.length;++t)this.children[t].collapse(e)},insertInner:function(e,t,r){this.size+=t.length,this.height+=r;for(var o=0;o<this.children.length;++o){var n=this.children[o],i=n.chunkSize();if(e<=i){if(n.insertInner(e,t,r),n.lines&&n.lines.length>50){for(var a=n.lines.length%25+25,l=a;l<n.lines.length;){var c=new vi(n.lines.slice(l,l+=25));n.height-=c.height,this.children.splice(++o,0,c),c.parent=this}n.lines=n.lines.slice(0,a),this.maybeSpill()}break}e-=i}},maybeSpill:function(){if(!(this.children.length<=10)){var e=this;do{var t=new wi(e.children.splice(e.children.length-5,5));if(e.parent){e.size-=t.size,e.height-=t.height;var r=U(e.parent.children,e);e.parent.children.splice(r+1,0,t)}else{var o=new wi(e.children);o.parent=e,e.children=[o,t],e=o}t.parent=e.parent}while(e.children.length>10);e.parent.maybeSpill()}},iterN:function(e,t,r){for(var o=0;o<this.children.length;++o){var n=this.children[o],i=n.chunkSize();if(e<i){var a=Math.min(t,i-e);if(n.iterN(e,a,r))return!0;if(0==(t-=a))break;e=0}else e-=i}}};var ki=function(e,t,r){if(r)for(var o in r)r.hasOwnProperty(o)&&(this[o]=r[o]);this.doc=e,this.node=t};function Ci(e,t,r){jt(t)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&_o(e,r)}ki.prototype.clear=function(){var e=this.doc.cm,t=this.line.widgets,r=this.line,o=Qe(r);if(null!=o&&t){for(var n=0;n<t.length;++n)t[n]==this&&t.splice(n--,1);t.length||(r.widgets=null);var i=wr(this);Ge(r,Math.max(0,r.height-i)),e&&($o(e,(function(){Ci(e,r,-i),po(e,o,"widget")})),lr(e,"lineWidgetCleared",e,this,o))}},ki.prototype.changed=function(){var e=this,t=this.height,r=this.doc.cm,o=this.line;this.height=null;var n=wr(this)-t;n&&(Bt(this.doc,o)||Ge(o,o.height+n),r&&$o(r,(function(){r.curOp.forceUpdate=!0,Ci(r,o,n),lr(r,"lineWidgetChanged",r,e,Qe(o))})))},be(ki);var xi=0,Si=function(e,t){this.lines=[],this.type=t,this.doc=e,this.id=++xi};function Ti(e,t,r,o,n){if(o&&o.shared)return function(e,t,r,o,n){(o=W(o)).shared=!1;var i=[Ti(e,t,r,o,n)],a=i[0],l=o.widgetNode;return Fn(e,(function(e){l&&(o.widgetNode=l.cloneNode(!0)),i.push(Ti(e,lt(e,t),lt(e,r),o,n));for(var c=0;c<e.linked.length;++c)if(e.linked[c].isParent)return;a=q(i)})),new Li(i,a)}(e,t,r,o,n);if(e.cm&&!e.cm.curOp)return en(e.cm,Ti)(e,t,r,o,n);var i=new Si(e,n),a=tt(t,r);if(o&&W(o,i,!1),a>0||0==a&&!1!==i.clearWhenEmpty)return i;if(i.replacedWith&&(i.collapsed=!0,i.widgetNode=_("span",[i.replacedWith],"CodeMirror-widget"),o.handleMouseEvents||i.widgetNode.setAttribute("cm-ignore-events","true"),o.insertLeft&&(i.widgetNode.insertLeft=!0)),i.collapsed){if(Wt(e,t.line,t,r,i)||t.line!=r.line&&Wt(e,r.line,t,r,i))throw Error("Inserting collapsed marker partially overlapping an existing one");Ct=!0}i.addToHistory&&Bn(e,{from:t,to:r,origin:"markText"},e.sel,NaN);var l,c=t.line,s=e.cm;if(e.iter(c,r.line+1,(function(e){s&&i.collapsed&&!s.options.lineWrapping&&Pt(e)==s.display.maxLine&&(l=!0),i.collapsed&&c!=t.line&&Ge(e,0),function(e,t){e.markedSpans=e.markedSpans?e.markedSpans.concat([t]):[t],t.marker.attachLine(e)}(e,new xt(i,c==t.line?t.ch:null,c==r.line?r.ch:null)),++c})),i.collapsed&&e.iter(t.line,r.line+1,(function(t){Bt(e,t)&&Ge(t,0)})),i.clearOnEnter&&ue(i,"beforeCursorEnter",(function(){return i.clear()})),i.readOnly&&(kt=!0,(e.history.done.length||e.history.undone.length)&&e.clearHistory()),i.collapsed&&(i.id=++xi,i.atomic=!0),s){if(l&&(s.curOp.updateMaxLine=!0),i.collapsed)uo(s,t.line,r.line+1);else if(i.className||i.startStyle||i.endStyle||i.css||i.attributes||i.title)for(var d=t.line;d<=r.line;d++)po(s,d,"text");i.atomic&&ri(s.doc),lr(s,"markerAdded",s,i)}return i}Si.prototype.clear=function(){if(!this.explicitlyCleared){var e=this.doc.cm,t=e&&!e.curOp;if(t&&Zo(e),ye(this,"clear")){var r=this.find();r&&lr(this,"clear",r.from,r.to)}for(var o=null,n=null,i=0;i<this.lines.length;++i){var a=this.lines[i],l=St(a.markedSpans,this);e&&!this.collapsed?po(e,Qe(a),"text"):e&&(null!=l.to&&(n=Qe(a)),null!=l.from&&(o=Qe(a))),a.markedSpans=Tt(a.markedSpans,l),null==l.from&&this.collapsed&&!Bt(this.doc,a)&&e&&Ge(a,ro(e.display))}if(e&&this.collapsed&&!e.options.lineWrapping)for(var c=0;c<this.lines.length;++c){var s=Pt(this.lines[c]),d=Ht(s);d>e.display.maxLineLength&&(e.display.maxLine=s,e.display.maxLineLength=d,e.display.maxLineChanged=!0)}null!=o&&e&&this.collapsed&&uo(e,o,n+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,e&&ri(e.doc)),e&&lr(e,"markerCleared",e,this,o,n),t&&Jo(e),this.parent&&this.parent.clear()}},Si.prototype.find=function(e,t){var r,o;null==e&&"bookmark"==this.type&&(e=1);for(var n=0;n<this.lines.length;++n){var i=this.lines[n],a=St(i.markedSpans,this);if(null!=a.from&&(r=et(t?i:Qe(i),a.from),-1==e))return r;if(null!=a.to&&(o=et(t?i:Qe(i),a.to),1==e))return o}return r&&{from:r,to:o}},Si.prototype.changed=function(){var e=this,t=this.find(-1,!0),r=this,o=this.doc.cm;t&&o&&$o(o,(function(){var n=t.line,i=Qe(t.line),a=_r(o,i);if(a&&(Wr(a),o.curOp.selectionChanged=o.curOp.forceUpdate=!0),o.curOp.updateMaxLine=!0,!Bt(r.doc,n)&&null!=r.height){var l=r.height;r.height=null;var c=wr(r)-l;c&&Ge(n,n.height+c)}lr(o,"markerChanged",o,e)}))},Si.prototype.attachLine=function(e){if(!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;t.maybeHiddenMarkers&&-1!=U(t.maybeHiddenMarkers,this)||(t.maybeUnhiddenMarkers||(t.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(e)},Si.prototype.detachLine=function(e){if(this.lines.splice(U(this.lines,e),1),!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;(t.maybeHiddenMarkers||(t.maybeHiddenMarkers=[])).push(this)}},be(Si);var Li=function(e,t){this.markers=e,this.primary=t;for(var r=0;r<e.length;++r)e[r].parent=this};function Ei(e){return e.findMarks(et(e.first,0),e.clipPos(et(e.lastLine())),(function(e){return e.parent}))}function Oi(e){for(var t=function(t){var r=e[t],o=[r.primary.doc];Fn(r.primary.doc,(function(e){return o.push(e)}));for(var n=0;n<r.markers.length;n++){var i=r.markers[n];-1==U(o,i.doc)&&(i.parent=null,r.markers.splice(n--,1))}},r=0;r<e.length;r++)t(r)}Li.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=!0;for(var e=0;e<this.markers.length;++e)this.markers[e].clear();lr(this,"clear")}},Li.prototype.find=function(e,t){return this.primary.find(e,t)},be(Li);var Ai=0,_i=function(e,t,r,o,n){if(!(this instanceof _i))return new _i(e,t,r,o,n);null==r&&(r=0),wi.call(this,[new vi([new Zt("",null)])]),this.first=r,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.modeFrontier=this.highlightFrontier=r;var i=et(r,0);this.sel=Ln(i),this.history=new Pn(null),this.id=++Ai,this.modeOption=t,this.lineSep=o,this.direction="rtl"==n?"rtl":"ltr",this.extend=!1,"string"==typeof e&&(e=this.splitLines(e)),Nn(this,{from:i,to:i,text:e}),$n(this,Ln(i),D)};_i.prototype=Y(wi.prototype,{constructor:_i,iter:function(e,t,r){r?this.iterN(e-this.first,t-e,r):this.iterN(this.first,this.first+this.size,e)},insert:function(e,t){for(var r=0,o=0;o<t.length;++o)r+=t[o].height;this.insertInner(e-this.first,t,r)},remove:function(e,t){this.removeInner(e-this.first,t)},getValue:function(e){var t=qe(this,this.first,this.first+this.size);return!1===e?t:t.join(e||this.lineSeparator())},setValue:rn((function(e){var t=et(this.first,0),r=this.first+this.size-1;si(this,{from:t,to:et(r,Ze(this,r).text.length),text:this.splitLines(e),origin:"setValue",full:!0},!0),this.cm&&Ro(this.cm,0,0),$n(this,Ln(t),D)})),replaceRange:function(e,t,r,o){hi(this,e,t=lt(this,t),r=r?lt(this,r):t,o)},getRange:function(e,t,r){var o=Je(this,lt(this,e),lt(this,t));return!1===r?o:o.join(r||this.lineSeparator())},getLine:function(e){var t=this.getLineHandle(e);return t&&t.text},getLineHandle:function(e){if(Xe(this,e))return Ze(this,e)},getLineNumber:function(e){return Qe(e)},getLineHandleVisualStart:function(e){return"number"==typeof e&&(e=Ze(this,e)),Pt(e)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(e){return lt(this,e)},getCursor:function(e){var t=this.sel.primary();return null==e||"head"==e?t.head:"anchor"==e?t.anchor:"end"==e||"to"==e||!1===e?t.to():t.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:rn((function(e,t,r){Yn(this,lt(this,"number"==typeof e?et(e,t||0):e),null,r)})),setSelection:rn((function(e,t,r){Yn(this,lt(this,e),lt(this,t||e),r)})),extendSelection:rn((function(e,t,r){qn(this,lt(this,e),t&&lt(this,t),r)})),extendSelections:rn((function(e,t){Gn(this,ct(this,e),t)})),extendSelectionsBy:rn((function(e,t){Gn(this,ct(this,G(this.sel.ranges,e)),t)})),setSelections:rn((function(e,t,r){if(e.length){for(var o=[],n=0;n<e.length;n++)o[n]=new Sn(lt(this,e[n].anchor),lt(this,e[n].head));null==t&&(t=Math.min(e.length-1,this.sel.primIndex)),$n(this,Tn(this.cm,o,t),r)}})),addSelection:rn((function(e,t,r){var o=this.sel.ranges.slice(0);o.push(new Sn(lt(this,e),lt(this,t||e))),$n(this,Tn(this.cm,o,o.length-1),r)})),getSelection:function(e){for(var t,r=this.sel.ranges,o=0;o<r.length;o++){var n=Je(this,r[o].from(),r[o].to());t=t?t.concat(n):n}return!1===e?t:t.join(e||this.lineSeparator())},getSelections:function(e){for(var t=[],r=this.sel.ranges,o=0;o<r.length;o++){var n=Je(this,r[o].from(),r[o].to());!1!==e&&(n=n.join(e||this.lineSeparator())),t[o]=n}return t},replaceSelection:function(e,t,r){for(var o=[],n=0;n<this.sel.ranges.length;n++)o[n]=e;this.replaceSelections(o,t,r||"+input")},replaceSelections:rn((function(e,t,r){for(var o=[],n=this.sel,i=0;i<n.ranges.length;i++){var a=n.ranges[i];o[i]={from:a.from(),to:a.to(),text:this.splitLines(e[i]),origin:r}}for(var l=t&&"end"!=t&&function(e,t,r){for(var o=[],n=et(e.first,0),i=n,a=0;a<t.length;a++){var l=t[a],c=_n(l.from,n,i),s=_n(En(l),n,i);if(n=l.to,i=s,"around"==r){var d=e.sel.ranges[a],u=tt(d.head,d.anchor)<0;o[a]=new Sn(u?s:c,u?c:s)}else o[a]=new Sn(c,c)}return new xn(o,e.sel.primIndex)}(this,o,t),c=o.length-1;c>=0;c--)si(this,o[c]);l?Xn(this,l):this.cm&&Mo(this.cm)})),undo:rn((function(){ui(this,"undo")})),redo:rn((function(){ui(this,"redo")})),undoSelection:rn((function(){ui(this,"undo",!0)})),redoSelection:rn((function(){ui(this,"redo",!0)})),setExtending:function(e){this.extend=e},getExtending:function(){return this.extend},historySize:function(){for(var e=this.history,t=0,r=0,o=0;o<e.done.length;o++)e.done[o].ranges||++t;for(var n=0;n<e.undone.length;n++)e.undone[n].ranges||++r;return{undo:t,redo:r}},clearHistory:function(){var e=this;this.history=new Pn(this.history.maxGeneration),Fn(this,(function(t){return t.history=e.history}),!0)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(e){return e&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(e){return this.history.generation==(e||this.cleanGeneration)},getHistory:function(){return{done:Zn(this.history.done),undone:Zn(this.history.undone)}},setHistory:function(e){var t=this.history=new Pn(this.history.maxGeneration);t.done=Zn(e.done.slice(0),null,!0),t.undone=Zn(e.undone.slice(0),null,!0)},setGutterMarker:rn((function(e,t,r){return bi(this,e,"gutter",(function(e){var o=e.gutterMarkers||(e.gutterMarkers={});return o[t]=r,!r&&te(o)&&(e.gutterMarkers=null),!0}))})),clearGutter:rn((function(e){var t=this;this.iter((function(r){r.gutterMarkers&&r.gutterMarkers[e]&&bi(t,r,"gutter",(function(){return r.gutterMarkers[e]=null,te(r.gutterMarkers)&&(r.gutterMarkers=null),!0}))}))})),lineInfo:function(e){var t;if("number"==typeof e){if(!Xe(this,e))return null;if(t=e,!(e=Ze(this,e)))return null}else if(null==(t=Qe(e)))return null;return{line:t,handle:e,text:e.text,gutterMarkers:e.gutterMarkers,textClass:e.textClass,bgClass:e.bgClass,wrapClass:e.wrapClass,widgets:e.widgets}},addLineClass:rn((function(e,t,r){return bi(this,e,"gutter"==t?"gutter":"class",(function(e){var o="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass";if(e[o]){if(S(r).test(e[o]))return!1;e[o]+=" "+r}else e[o]=r;return!0}))})),removeLineClass:rn((function(e,t,r){return bi(this,e,"gutter"==t?"gutter":"class",(function(e){var o="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass",n=e[o];if(!n)return!1;if(null==r)e[o]=null;else{var i=n.match(S(r));if(!i)return!1;var a=i.index+i[0].length;e[o]=n.slice(0,i.index)+(i.index&&a!=n.length?" ":"")+n.slice(a)||null}return!0}))})),addLineWidget:rn((function(e,t,r){return function(e,t,r,o){var n=new ki(e,r,o),i=e.cm;return i&&n.noHScroll&&(i.display.alignWidgets=!0),bi(e,t,"widget",(function(t){var r=t.widgets||(t.widgets=[]);if(null==n.insertAt?r.push(n):r.splice(Math.min(r.length-1,Math.max(0,n.insertAt)),0,n),n.line=t,i&&!Bt(e,t)){var o=jt(t)<e.scrollTop;Ge(t,t.height+wr(n)),o&&_o(i,n.height),i.curOp.forceUpdate=!0}return!0})),i&&lr(i,"lineWidgetAdded",i,n,"number"==typeof t?t:Qe(t)),n}(this,e,t,r)})),removeLineWidget:function(e){e.clear()},markText:function(e,t,r){return Ti(this,lt(this,e),lt(this,t),r,r&&r.type||"range")},setBookmark:function(e,t){var r={replacedWith:t&&(null==t.nodeType?t.widget:t),insertLeft:t&&t.insertLeft,clearWhenEmpty:!1,shared:t&&t.shared,handleMouseEvents:t&&t.handleMouseEvents};return Ti(this,e=lt(this,e),e,r,"bookmark")},findMarksAt:function(e){var t=[],r=Ze(this,(e=lt(this,e)).line).markedSpans;if(r)for(var o=0;o<r.length;++o){var n=r[o];(null==n.from||n.from<=e.ch)&&(null==n.to||n.to>=e.ch)&&t.push(n.marker.parent||n.marker)}return t},findMarks:function(e,t,r){e=lt(this,e),t=lt(this,t);var o=[],n=e.line;return this.iter(e.line,t.line+1,(function(i){var a=i.markedSpans;if(a)for(var l=0;l<a.length;l++){var c=a[l];null!=c.to&&n==e.line&&e.ch>=c.to||null==c.from&&n!=e.line||null!=c.from&&n==t.line&&c.from>=t.ch||r&&!r(c.marker)||o.push(c.marker.parent||c.marker)}++n})),o},getAllMarks:function(){var e=[];return this.iter((function(t){var r=t.markedSpans;if(r)for(var o=0;o<r.length;++o)null!=r[o].from&&e.push(r[o].marker)})),e},posFromIndex:function(e){var t,r=this.first,o=this.lineSeparator().length;return this.iter((function(n){var i=n.text.length+o;if(i>e)return t=e,!0;e-=i,++r})),lt(this,et(r,t))},indexFromPos:function(e){var t=(e=lt(this,e)).ch;if(e.line<this.first||e.ch<0)return 0;var r=this.lineSeparator().length;return this.iter(this.first,e.line,(function(e){t+=e.text.length+r})),t},copy:function(e){var t=new _i(qe(this,this.first,this.first+this.size),this.modeOption,this.first,this.lineSep,this.direction);return t.scrollTop=this.scrollTop,t.scrollLeft=this.scrollLeft,t.sel=this.sel,t.extend=!1,e&&(t.history.undoDepth=this.history.undoDepth,t.setHistory(this.getHistory())),t},linkedDoc:function(e){e||(e={});var t=this.first,r=this.first+this.size;null!=e.from&&e.from>t&&(t=e.from),null!=e.to&&e.to<r&&(r=e.to);var o=new _i(qe(this,t,r),e.mode||this.modeOption,t,this.lineSep,this.direction);return e.sharedHist&&(o.history=this.history),(this.linked||(this.linked=[])).push({doc:o,sharedHist:e.sharedHist}),o.linked=[{doc:this,isParent:!0,sharedHist:e.sharedHist}],function(e,t){for(var r=0;r<t.length;r++){var o=t[r],n=o.find(),i=e.clipPos(n.from),a=e.clipPos(n.to);if(tt(i,a)){var l=Ti(e,i,a,o.primary,o.primary.type);o.markers.push(l),l.parent=o}}}(o,Ei(this)),o},unlinkDoc:function(e){if(e instanceof Ta&&(e=e.doc),this.linked)for(var t=0;t<this.linked.length;++t)if(this.linked[t].doc==e){this.linked.splice(t,1),e.unlinkDoc(this),Oi(Ei(this));break}if(e.history==this.history){var r=[e.id];Fn(e,(function(e){return r.push(e.id)}),!0),e.history=new Pn(null),e.history.done=Zn(this.history.done,r),e.history.undone=Zn(this.history.undone,r)}},iterLinkedDocs:function(e){Fn(this,e)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(e){return this.lineSep?e.split(this.lineSep):Me(e)},lineSeparator:function(){return this.lineSep||"\n"},setDirection:rn((function(e){var t;"rtl"!=e&&(e="ltr"),e!=this.direction&&(this.direction=e,this.iter((function(e){return e.order=null})),this.cm&&$o(t=this.cm,(function(){Wn(t),uo(t)})))}))}),_i.prototype.eachLine=_i.prototype.iter;var Mi=0;function Ri(e){var t=this;if(zi(t),!fe(t,e)&&!kr(t.display,e)){ve(e),a&&(Mi=+new Date);var r=co(t,e,!0),o=e.dataTransfer.files;if(r&&!t.isReadOnly())if(o&&o.length&&window.FileReader&&window.File)for(var n=o.length,i=Array(n),l=0,c=function(){++l==n&&en(t,(function(){var e={from:r=lt(t.doc,r),to:r,text:t.doc.splitLines(i.filter((function(e){return null!=e})).join(t.doc.lineSeparator())),origin:"paste"};si(t.doc,e),Xn(t.doc,Ln(lt(t.doc,r),lt(t.doc,En(e))))}))()},s=function(e,r){if(t.options.allowDropFileTypes&&-1==U(t.options.allowDropFileTypes,e.type))c();else{var o=new FileReader;o.onerror=function(){return c()},o.onload=function(){var e=o.result;/[\x00-\x08\x0e-\x1f]{2}/.test(e)||(i[r]=e),c()},o.readAsText(e)}},d=0;d<o.length;d++)s(o[d],d);else{if(t.state.draggingText&&t.doc.sel.contains(r)>-1)return t.state.draggingText(e),void setTimeout((function(){return t.display.input.focus()}),20);try{var u=e.dataTransfer.getData("Text");if(u){var p;if(t.state.draggingText&&!t.state.draggingText.copy&&(p=t.listSelections()),ei(t.doc,Ln(r,r)),p)for(var g=0;g<p.length;++g)hi(t.doc,"",p[g].anchor,p[g].head,"drag");t.replaceSelection(u,"around","paste"),t.display.input.focus()}}catch(e){}}}}function zi(e){e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor),e.display.dragCursor=null)}function Ni(e){if(document.getElementsByClassName){for(var t=document.getElementsByClassName("CodeMirror"),r=[],o=0;o<t.length;o++){var n=t[o].CodeMirror;n&&r.push(n)}r.length&&r[0].operation((function(){for(var t=0;t<r.length;t++)e(r[t])}))}}var Fi=!1;function Ii(e){var t=e.display;t.cachedCharWidth=t.cachedTextHeight=t.cachedPaddingH=null,t.scrollbarsClipped=!1,e.setSize()}for(var Wi={3:"Pause",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"=",109:"-",110:".",111:"/",145:"ScrollLock",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",224:"Mod",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"},Pi=0;Pi<10;Pi++)Wi[Pi+48]=Wi[Pi+96]=Pi+"";for(var Ki=65;Ki<=90;Ki++)Wi[Ki]=String.fromCharCode(Ki);for(var Ui=1;Ui<=12;Ui++)Wi[Ui+111]=Wi[Ui+63235]="F"+Ui;var Bi={};function Di(e){var t,r,o,n,i=e.split(/-(?!$)/);e=i[i.length-1];for(var a=0;a<i.length-1;a++){var l=i[a];if(/^(cmd|meta|m)$/i.test(l))n=!0;else if(/^a(lt)?$/i.test(l))t=!0;else if(/^(c|ctrl|control)$/i.test(l))r=!0;else{if(!/^s(hift)?$/i.test(l))throw Error("Unrecognized modifier name: "+l);o=!0}}return t&&(e="Alt-"+e),r&&(e="Ctrl-"+e),n&&(e="Cmd-"+e),o&&(e="Shift-"+e),e}function ji(e){var t={};for(var r in e)if(e.hasOwnProperty(r)){var o=e[r];if(/^(name|fallthrough|(de|at)tach)$/.test(r))continue;if("..."==o){delete e[r];continue}for(var n=G(r.split(" "),Di),i=0;i<n.length;i++){var a=void 0,l=void 0;i==n.length-1?(l=n.join(" "),a=o):(l=n.slice(0,i+1).join(" "),a="...");var c=t[l];if(c){if(c!=a)throw Error("Inconsistent bindings for "+l)}else t[l]=a}delete e[r]}for(var s in t)e[s]=t[s];return e}function Hi(e,t,r,o){var n=(t=qi(t)).call?t.call(e,o):t[e];if(!1===n)return"nothing";if("..."===n)return"multi";if(null!=n&&r(n))return"handled";if(t.fallthrough){if("[object Array]"!=Object.prototype.toString.call(t.fallthrough))return Hi(e,t.fallthrough,r,o);for(var i=0;i<t.fallthrough.length;i++){var a=Hi(e,t.fallthrough[i],r,o);if(a)return a}}}function Vi(e){var t="string"==typeof e?e:Wi[e.keyCode];return"Ctrl"==t||"Alt"==t||"Shift"==t||"Mod"==t}function Zi(e,t,r){var o=e;return t.altKey&&"Alt"!=o&&(e="Alt-"+e),(C?t.metaKey:t.ctrlKey)&&"Ctrl"!=o&&(e="Ctrl-"+e),(C?t.ctrlKey:t.metaKey)&&"Mod"!=o&&(e="Cmd-"+e),!r&&t.shiftKey&&"Shift"!=o&&(e="Shift-"+e),e}function Ji(e,t){if(u&&34==e.keyCode&&e.char)return!1;var r=Wi[e.keyCode];return null!=r&&!e.altGraphKey&&(3==e.keyCode&&e.code&&(r=e.code),Zi(r,e,t))}function qi(e){return"string"==typeof e?Bi[e]:e}function Gi(e,t){for(var r=e.doc.sel.ranges,o=[],n=0;n<r.length;n++){for(var i=t(r[n]);o.length&&tt(i.from,q(o).to)<=0;){var a=o.pop();if(tt(a.from,i.from)<0){i.from=a.from;break}}o.push(i)}$o(e,(function(){for(var t=o.length-1;t>=0;t--)hi(e.doc,"",o[t].from,o[t].to,"+delete");Mo(e)}))}function Qi(e,t,r){var o=ne(e.text,t+r,r);return o<0||o>e.text.length?null:o}function Yi(e,t,r){var o=Qi(e,t.ch,r);return null==o?null:new et(t.line,o,r<0?"after":"before")}function Xi(e,t,r,o,n){if(e){"rtl"==t.doc.direction&&(n=-n);var i=se(r,t.doc.direction);if(i){var a,l=n<0?q(i):i[0],c=n<0==(1==l.level)?"after":"before";if(l.level>0||"rtl"==t.doc.direction){var s=Mr(t,r);a=n<0?r.text.length-1:0;var d=Rr(t,s,a).top;a=ie((function(e){return Rr(t,s,e).top==d}),n<0==(1==l.level)?l.from:l.to-1,a),"before"==c&&(a=Qi(r,a,1))}else a=n<0?l.to:l.from;return new et(o,a,c)}}return new et(o,n<0?r.text.length:0,n<0?"before":"after")}Bi.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},Bi.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},Bi.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars","Ctrl-O":"openLine"},Bi.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},Bi.default=b?Bi.macDefault:Bi.pcDefault;var $i={selectAll:li,singleSelection:function(e){return e.setSelection(e.getCursor("anchor"),e.getCursor("head"),D)},killLine:function(e){return Gi(e,(function(t){if(t.empty()){var r=Ze(e.doc,t.head.line).text.length;return t.head.ch==r&&t.head.line<e.lastLine()?{from:t.head,to:et(t.head.line+1,0)}:{from:t.head,to:et(t.head.line,r)}}return{from:t.from(),to:t.to()}}))},deleteLine:function(e){return Gi(e,(function(t){return{from:et(t.from().line,0),to:lt(e.doc,et(t.to().line+1,0))}}))},delLineLeft:function(e){return Gi(e,(function(e){return{from:et(e.from().line,0),to:e.from()}}))},delWrappedLineLeft:function(e){return Gi(e,(function(t){var r=e.charCoords(t.head,"div").top+5;return{from:e.coordsChar({left:0,top:r},"div"),to:t.from()}}))},delWrappedLineRight:function(e){return Gi(e,(function(t){var r=e.charCoords(t.head,"div").top+5,o=e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div");return{from:t.from(),to:o}}))},undo:function(e){return e.undo()},redo:function(e){return e.redo()},undoSelection:function(e){return e.undoSelection()},redoSelection:function(e){return e.redoSelection()},goDocStart:function(e){return e.extendSelection(et(e.firstLine(),0))},goDocEnd:function(e){return e.extendSelection(et(e.lastLine()))},goLineStart:function(e){return e.extendSelectionsBy((function(t){return ea(e,t.head.line)}),{origin:"+move",bias:1})},goLineStartSmart:function(e){return e.extendSelectionsBy((function(t){return ta(e,t.head)}),{origin:"+move",bias:1})},goLineEnd:function(e){return e.extendSelectionsBy((function(t){return function(e,t){var r=Ze(e.doc,t),o=function(e){for(var t;t=Ft(e);)e=t.find(1,!0).line;return e}(r);return o!=r&&(t=Qe(o)),Xi(!0,e,r,t,-1)}(e,t.head.line)}),{origin:"+move",bias:-1})},goLineRight:function(e){return e.extendSelectionsBy((function(t){var r=e.cursorCoords(t.head,"div").top+5;return e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div")}),H)},goLineLeft:function(e){return e.extendSelectionsBy((function(t){var r=e.cursorCoords(t.head,"div").top+5;return e.coordsChar({left:0,top:r},"div")}),H)},goLineLeftSmart:function(e){return e.extendSelectionsBy((function(t){var r=e.cursorCoords(t.head,"div").top+5,o=e.coordsChar({left:0,top:r},"div");return o.ch<e.getLine(o.line).search(/\S/)?ta(e,t.head):o}),H)},goLineUp:function(e){return e.moveV(-1,"line")},goLineDown:function(e){return e.moveV(1,"line")},goPageUp:function(e){return e.moveV(-1,"page")},goPageDown:function(e){return e.moveV(1,"page")},goCharLeft:function(e){return e.moveH(-1,"char")},goCharRight:function(e){return e.moveH(1,"char")},goColumnLeft:function(e){return e.moveH(-1,"column")},goColumnRight:function(e){return e.moveH(1,"column")},goWordLeft:function(e){return e.moveH(-1,"word")},goGroupRight:function(e){return e.moveH(1,"group")},goGroupLeft:function(e){return e.moveH(-1,"group")},goWordRight:function(e){return e.moveH(1,"word")},delCharBefore:function(e){return e.deleteH(-1,"codepoint")},delCharAfter:function(e){return e.deleteH(1,"char")},delWordBefore:function(e){return e.deleteH(-1,"word")},delWordAfter:function(e){return e.deleteH(1,"word")},delGroupBefore:function(e){return e.deleteH(-1,"group")},delGroupAfter:function(e){return e.deleteH(1,"group")},indentAuto:function(e){return e.indentSelection("smart")},indentMore:function(e){return e.indentSelection("add")},indentLess:function(e){return e.indentSelection("subtract")},insertTab:function(e){return e.replaceSelection("\t")},insertSoftTab:function(e){for(var t=[],r=e.listSelections(),o=e.options.tabSize,n=0;n<r.length;n++){var i=r[n].from(),a=P(e.getLine(i.line),i.ch,o);t.push(J(o-a%o))}e.replaceSelections(t)},defaultTab:function(e){e.somethingSelected()?e.indentSelection("add"):e.execCommand("insertTab")},transposeChars:function(e){return $o(e,(function(){for(var t=e.listSelections(),r=[],o=0;o<t.length;o++)if(t[o].empty()){var n=t[o].head,i=Ze(e.doc,n.line).text;if(i)if(n.ch==i.length&&(n=new et(n.line,n.ch-1)),n.ch>0)n=new et(n.line,n.ch+1),e.replaceRange(i.charAt(n.ch-1)+i.charAt(n.ch-2),et(n.line,n.ch-2),n,"+transpose");else if(n.line>e.doc.first){var a=Ze(e.doc,n.line-1).text;a&&(n=new et(n.line,1),e.replaceRange(i.charAt(0)+e.doc.lineSeparator()+a.charAt(a.length-1),et(n.line-1,a.length-1),n,"+transpose"))}r.push(new Sn(n,n))}e.setSelections(r)}))},newlineAndIndent:function(e){return $o(e,(function(){for(var t=e.listSelections(),r=t.length-1;r>=0;r--)e.replaceRange(e.doc.lineSeparator(),t[r].anchor,t[r].head,"+input");t=e.listSelections();for(var o=0;o<t.length;o++)e.indentLine(t[o].from().line,null,!0);Mo(e)}))},openLine:function(e){return e.replaceSelection("\n","start")},toggleOverwrite:function(e){return e.toggleOverwrite()}};function ea(e,t){var r=Ze(e.doc,t),o=Pt(r);return o!=r&&(t=Qe(o)),Xi(!0,e,o,t,1)}function ta(e,t){var r=ea(e,t.line),o=Ze(e.doc,r.line),n=se(o,e.doc.direction);if(!n||0==n[0].level){var i=Math.max(r.ch,o.text.search(/\S/)),a=t.line==r.line&&t.ch<=i&&t.ch;return et(r.line,a?0:i,r.sticky)}return r}function ra(e,t,r){if("string"==typeof t&&!(t=$i[t]))return!1;e.display.input.ensurePolled();var o=e.display.shift,n=!1;try{e.isReadOnly()&&(e.state.suppressEdits=!0),r&&(e.display.shift=!1),n=t(e)!=B}finally{e.display.shift=o,e.state.suppressEdits=!1}return n}var oa=new K;function na(e,t,r,o){var n=e.state.keySeq;if(n){if(Vi(t))return"handled";if(/\'$/.test(t)?e.state.keySeq=null:oa.set(50,(function(){e.state.keySeq==n&&(e.state.keySeq=null,e.display.input.reset())})),ia(e,n+" "+t,r,o))return!0}return ia(e,t,r,o)}function ia(e,t,r,o){var n=function(e,t,r){for(var o=0;o<e.state.keyMaps.length;o++){var n=Hi(t,e.state.keyMaps[o],r,e);if(n)return n}return e.options.extraKeys&&Hi(t,e.options.extraKeys,r,e)||Hi(t,e.options.keyMap,r,e)}(e,t,o);return"multi"==n&&(e.state.keySeq=t),"handled"==n&&lr(e,"keyHandled",e,t,r),"handled"!=n&&"multi"!=n||(ve(r),ko(e)),!!n}function aa(e,t){var r=Ji(t,!0);return!!r&&(t.shiftKey&&!e.state.keySeq?na(e,"Shift-"+r,t,(function(t){return ra(e,t,!0)}))||na(e,r,t,(function(t){if("string"==typeof t?/^go[A-Z]/.test(t):t.motion)return ra(e,t)})):na(e,r,t,(function(t){return ra(e,t)})))}var la=null;function ca(e){var t=this;if(!(e.target&&e.target!=t.display.input.getField()||(t.curOp.focus=R(),fe(t,e)))){a&&l<11&&27==e.keyCode&&(e.returnValue=!1);var o=e.keyCode;t.display.shift=16==o||e.shiftKey;var n=aa(t,e);u&&(la=n?o:null,n||88!=o||ze||!(b?e.metaKey:e.ctrlKey)||t.replaceSelection("",null,"cut")),r&&!b&&!n&&46==o&&e.shiftKey&&!e.ctrlKey&&document.execCommand&&document.execCommand("cut"),18!=o||/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className)||function(e){var t=e.display.lineDiv;function r(e){18!=e.keyCode&&e.altKey||(L(t,"CodeMirror-crosshair"),ge(document,"keyup",r),ge(document,"mouseover",r))}z(t,"CodeMirror-crosshair"),ue(document,"keyup",r),ue(document,"mouseover",r)}(t)}}function sa(e){16==e.keyCode&&(this.doc.sel.shift=!1),fe(this,e)}function da(e){var t=this;if(!(e.target&&e.target!=t.display.input.getField()||kr(t.display,e)||fe(t,e)||e.ctrlKey&&!e.altKey||b&&e.metaKey)){var r=e.keyCode,o=e.charCode;if(u&&r==la)return la=null,void ve(e);if(!u||e.which&&!(e.which<10)||!aa(t,e)){var n=String.fromCharCode(null==o?r:o);"\b"!=n&&(function(e,t,r){return na(e,"'"+r+"'",t,(function(t){return ra(e,t,!0)}))}(t,e,n)||t.display.input.onKeyPress(e))}}}var ua,pa,ga=function(e,t,r){this.time=e,this.pos=t,this.button=r};function ha(e){var t=this,r=t.display;if(!(fe(t,e)||r.activeTouch&&r.input.supportsTouch()))if(r.input.ensurePolled(),r.shift=e.shiftKey,kr(r,e))c||(r.scroller.draggable=!1,setTimeout((function(){return r.scroller.draggable=!0}),100));else if(!ya(t,e)){var o=co(t,e),n=Se(e),i=o?function(e,t){var r=+new Date;return pa&&pa.compare(r,e,t)?(ua=pa=null,"triple"):ua&&ua.compare(r,e,t)?(pa=new ga(r,e,t),ua=null,"double"):(ua=new ga(r,e,t),pa=null,"single")}(o,n):"single";window.focus(),1==n&&t.state.selectingText&&t.state.selectingText(e),o&&function(e,t,r,o,n){var i="Click";return"double"==o?i="Double"+i:"triple"==o&&(i="Triple"+i),na(e,Zi(i=(1==t?"Left":2==t?"Middle":"Right")+i,n),n,(function(t){if("string"==typeof t&&(t=$i[t]),!t)return!1;var o=!1;try{e.isReadOnly()&&(e.state.suppressEdits=!0),o=t(e,r)!=B}finally{e.state.suppressEdits=!1}return o}))}(t,n,o,i,e)||(1==n?o?function(e,t,r,o){a?setTimeout(I(Co,e),0):e.curOp.focus=R();var n,i=function(e,t,r){var o=e.getOption("configureMouse"),n=o?o(e,t,r):{};if(null==n.unit){var i=v?r.shiftKey&&r.metaKey:r.altKey;n.unit=i?"rectangle":"single"==t?"char":"double"==t?"word":"line"}return(null==n.extend||e.doc.extend)&&(n.extend=e.doc.extend||r.shiftKey),null==n.addNew&&(n.addNew=b?r.metaKey:r.ctrlKey),null==n.moveOnDrag&&(n.moveOnDrag=!(b?r.altKey:r.ctrlKey)),n}(e,r,o),s=e.doc.sel;e.options.dragDrop&&Ee&&!e.isReadOnly()&&"single"==r&&(n=s.contains(t))>-1&&(tt((n=s.ranges[n]).from(),t)<0||t.xRel>0)&&(tt(n.to(),t)>0||t.xRel<0)?function(e,t,r,o){var n=e.display,i=!1,s=en(e,(function(t){c&&(n.scroller.draggable=!1),e.state.draggingText=!1,ge(n.wrapper.ownerDocument,"mouseup",s),ge(n.wrapper.ownerDocument,"mousemove",d),ge(n.scroller,"dragstart",u),ge(n.scroller,"drop",s),i||(ve(t),o.addNew||qn(e.doc,r,null,null,o.extend),c&&!p||a&&9==l?setTimeout((function(){n.wrapper.ownerDocument.body.focus({preventScroll:!0}),n.input.focus()}),20):n.input.focus())})),d=function(e){i=i||Math.abs(t.clientX-e.clientX)+Math.abs(t.clientY-e.clientY)>=10},u=function(){return i=!0};c&&(n.scroller.draggable=!0),e.state.draggingText=s,s.copy=!o.moveOnDrag,n.scroller.dragDrop&&n.scroller.dragDrop(),ue(n.wrapper.ownerDocument,"mouseup",s),ue(n.wrapper.ownerDocument,"mousemove",d),ue(n.scroller,"dragstart",u),ue(n.scroller,"drop",s),xo(e),setTimeout((function(){return n.input.focus()}),20)}(e,o,t,i):function(e,t,r,o){var n=e.display,i=e.doc;ve(t);var a,l,c=i.sel,s=c.ranges;if(o.addNew&&!o.extend?(l=i.sel.contains(r),a=l>-1?s[l]:new Sn(r,r)):(a=i.sel.primary(),l=i.sel.primIndex),"rectangle"==o.unit)o.addNew||(a=new Sn(r,r)),r=co(e,t,!0,!0),l=-1;else{var d=fa(e,r,o.unit);a=o.extend?Jn(a,d.anchor,d.head,o.extend):d}o.addNew?-1==l?(l=s.length,$n(i,Tn(e,s.concat([a]),l),{scroll:!1,origin:"*mouse"})):s.length>1&&s[l].empty()&&"char"==o.unit&&!o.extend?($n(i,Tn(e,s.slice(0,l).concat(s.slice(l+1)),0),{scroll:!1,origin:"*mouse"}),c=i.sel):Qn(i,l,a,j):(l=0,$n(i,new xn([a],0),j),c=i.sel);var u=r,p=n.wrapper.getBoundingClientRect(),g=0;function h(t){var s=++g,d=co(e,t,!0,"rectangle"==o.unit);if(d)if(0!=tt(d,u)){e.curOp.focus=R(),function(t){if(0!=tt(u,t))if(u=t,"rectangle"==o.unit){for(var n=[],s=e.options.tabSize,d=P(Ze(i,r.line).text,r.ch,s),p=P(Ze(i,t.line).text,t.ch,s),g=Math.min(d,p),h=Math.max(d,p),f=Math.min(r.line,t.line),m=Math.min(e.lastLine(),Math.max(r.line,t.line));f<=m;f++){var y=Ze(i,f).text,b=V(y,g,s);g==h?n.push(new Sn(et(f,b),et(f,b))):y.length>b&&n.push(new Sn(et(f,b),et(f,V(y,h,s))))}n.length||n.push(new Sn(r,r)),$n(i,Tn(e,c.ranges.slice(0,l).concat(n),l),{origin:"*mouse",scroll:!1}),e.scrollIntoView(t)}else{var v,w=a,k=fa(e,t,o.unit),C=w.anchor;tt(k.anchor,C)>0?(v=k.head,C=it(w.from(),k.anchor)):(v=k.anchor,C=nt(w.to(),k.head));var x=c.ranges.slice(0);x[l]=function(e,t){var r=t.anchor,o=t.head,n=Ze(e.doc,r.line);if(0==tt(r,o)&&r.sticky==o.sticky)return t;var i=se(n);if(!i)return t;var a=le(i,r.ch,r.sticky),l=i[a];if(l.from!=r.ch&&l.to!=r.ch)return t;var c,s=a+(l.from==r.ch==(1!=l.level)?0:1);if(0==s||s==i.length)return t;if(o.line!=r.line)c=(o.line-r.line)*("ltr"==e.doc.direction?1:-1)>0;else{var d=le(i,o.ch,o.sticky),u=d-a||(o.ch-r.ch)*(1==l.level?-1:1);c=d==s-1||d==s?u<0:u>0}var p=i[s+(c?-1:0)],g=c==(1==p.level),h=g?p.from:p.to,f=g?"after":"before";return r.ch==h&&r.sticky==f?t:new Sn(new et(r.line,h,f),o)}(e,new Sn(lt(i,C),v)),$n(i,Tn(e,x,l),j)}}(d);var f=Oo(n,i);(d.line>=f.to||d.line<f.from)&&setTimeout(en(e,(function(){g==s&&h(t)})),150)}else{var m=t.clientY<p.top?-20:t.clientY>p.bottom?20:0;m&&setTimeout(en(e,(function(){g==s&&(n.scroller.scrollTop+=m,h(t))})),50)}}function f(t){e.state.selectingText=!1,g=1/0,t&&(ve(t),n.input.focus()),ge(n.wrapper.ownerDocument,"mousemove",m),ge(n.wrapper.ownerDocument,"mouseup",y),i.history.lastSelOrigin=null}var m=en(e,(function(e){0!==e.buttons&&Se(e)?h(e):f(e)})),y=en(e,f);e.state.selectingText=y,ue(n.wrapper.ownerDocument,"mousemove",m),ue(n.wrapper.ownerDocument,"mouseup",y)}(e,o,t,i)}(t,o,i,e):xe(e)==r.scroller&&ve(e):2==n?(o&&qn(t.doc,o),setTimeout((function(){return r.input.focus()}),20)):3==n&&(x?t.display.input.onContextMenu(e):xo(t)))}}function fa(e,t,r){if("char"==r)return new Sn(t,t);if("word"==r)return e.findWordAt(t);if("line"==r)return new Sn(et(t.line,0),lt(e.doc,et(t.line+1,0)));var o=r(e,t);return new Sn(o.from,o.to)}function ma(e,t,r,o){var n,i;if(t.touches)n=t.touches[0].clientX,i=t.touches[0].clientY;else try{n=t.clientX,i=t.clientY}catch(e){return!1}if(n>=Math.floor(e.display.gutters.getBoundingClientRect().right))return!1;o&&ve(t);var a=e.display,l=a.lineDiv.getBoundingClientRect();if(i>l.bottom||!ye(e,r))return ke(t);i-=l.top-a.viewOffset;for(var c=0;c<e.display.gutterSpecs.length;++c){var s=a.gutters.childNodes[c];if(s&&s.getBoundingClientRect().right>=n)return he(e,r,e,Ye(e.doc,i),e.display.gutterSpecs[c].className,t),ke(t)}}function ya(e,t){return ma(e,t,"gutterClick",!0)}function ba(e,t){kr(e.display,t)||function(e,t){return!!ye(e,"gutterContextMenu")&&ma(e,t,"gutterContextMenu",!1)}(e,t)||fe(e,t,"contextmenu")||x||e.display.input.onContextMenu(t)}function va(e){e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+e.options.theme.replace(/(^|\s)\s*/g," cm-s-"),Kr(e)}ga.prototype.compare=function(e,t,r){return this.time+400>e&&0==tt(t,this.pos)&&r==this.button};var wa={toString:function(){return"CodeMirror.Init"}},ka={},Ca={};function xa(e,t,r){if(!t!=!(r&&r!=wa)){var o=e.display.dragFunctions,n=t?ue:ge;n(e.display.scroller,"dragstart",o.start),n(e.display.scroller,"dragenter",o.enter),n(e.display.scroller,"dragover",o.over),n(e.display.scroller,"dragleave",o.leave),n(e.display.scroller,"drop",o.drop)}}function Sa(e){e.options.lineWrapping?(z(e.display.wrapper,"CodeMirror-wrap"),e.display.sizer.style.minWidth="",e.display.sizerWidth=null):(L(e.display.wrapper,"CodeMirror-wrap"),Vt(e)),lo(e),uo(e),Kr(e),setTimeout((function(){return Bo(e)}),100)}function Ta(e,t){var r=this;if(!(this instanceof Ta))return new Ta(e,t);this.options=t=t?W(t):{},W(ka,t,!1);var o=t.value;"string"==typeof o?o=new _i(o,t.mode,null,t.lineSeparator,t.direction):t.mode&&(o.modeOption=t.mode),this.doc=o;var n=new Ta.inputStyles[t.inputStyle](this),i=this.display=new yn(e,o,n,t);for(var s in i.wrapper.CodeMirror=this,va(this),t.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),Ho(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:-1,cutIncoming:-1,selectingText:!1,draggingText:!1,highlight:new K,keySeq:null,specialChars:null},t.autofocus&&!y&&i.input.focus(),a&&l<11&&setTimeout((function(){return r.display.input.reset(!0)}),20),function(e){var t=e.display;ue(t.scroller,"mousedown",en(e,ha)),ue(t.scroller,"dblclick",a&&l<11?en(e,(function(t){if(!fe(e,t)){var r=co(e,t);if(r&&!ya(e,t)&&!kr(e.display,t)){ve(t);var o=e.findWordAt(r);qn(e.doc,o.anchor,o.head)}}})):function(t){return fe(e,t)||ve(t)}),ue(t.scroller,"contextmenu",(function(t){return ba(e,t)})),ue(t.input.getField(),"contextmenu",(function(r){t.scroller.contains(r.target)||ba(e,r)}));var r,o={end:0};function n(){t.activeTouch&&(r=setTimeout((function(){return t.activeTouch=null}),1e3),(o=t.activeTouch).end=+new Date)}function i(e,t){if(null==t.left)return!0;var r=t.left-e.left,o=t.top-e.top;return r*r+o*o>400}ue(t.scroller,"touchstart",(function(n){if(!fe(e,n)&&!function(e){if(1!=e.touches.length)return!1;var t=e.touches[0];return t.radiusX<=1&&t.radiusY<=1}(n)&&!ya(e,n)){t.input.ensurePolled(),clearTimeout(r);var i=+new Date;t.activeTouch={start:i,moved:!1,prev:i-o.end<=300?o:null},1==n.touches.length&&(t.activeTouch.left=n.touches[0].pageX,t.activeTouch.top=n.touches[0].pageY)}})),ue(t.scroller,"touchmove",(function(){t.activeTouch&&(t.activeTouch.moved=!0)})),ue(t.scroller,"touchend",(function(r){var o=t.activeTouch;if(o&&!kr(t,r)&&null!=o.left&&!o.moved&&new Date-o.start<300){var a,l=e.coordsChar(t.activeTouch,"page");a=!o.prev||i(o,o.prev)?new Sn(l,l):!o.prev.prev||i(o,o.prev.prev)?e.findWordAt(l):new Sn(et(l.line,0),lt(e.doc,et(l.line+1,0))),e.setSelection(a.anchor,a.head),e.focus(),ve(r)}n()})),ue(t.scroller,"touchcancel",n),ue(t.scroller,"scroll",(function(){t.scroller.clientHeight&&(Fo(e,t.scroller.scrollTop),Wo(e,t.scroller.scrollLeft,!0),he(e,"scroll",e))})),ue(t.scroller,"mousewheel",(function(t){return Cn(e,t)})),ue(t.scroller,"DOMMouseScroll",(function(t){return Cn(e,t)})),ue(t.wrapper,"scroll",(function(){return t.wrapper.scrollTop=t.wrapper.scrollLeft=0})),t.dragFunctions={enter:function(t){fe(e,t)||Ce(t)},over:function(t){fe(e,t)||(function(e,t){var r=co(e,t);if(r){var o=document.createDocumentFragment();bo(e,r,o),e.display.dragCursor||(e.display.dragCursor=A("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),e.display.lineSpace.insertBefore(e.display.dragCursor,e.display.cursorDiv)),O(e.display.dragCursor,o)}}(e,t),Ce(t))},start:function(t){return function(e,t){if(a&&(!e.state.draggingText||+new Date-Mi<100))Ce(t);else if(!fe(e,t)&&!kr(e.display,t)&&(t.dataTransfer.setData("Text",e.getSelection()),t.dataTransfer.effectAllowed="copyMove",t.dataTransfer.setDragImage&&!p)){var r=A("img",null,null,"position: fixed; left: 0; top: 0;");r.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",u&&(r.width=r.height=1,e.display.wrapper.appendChild(r),r._top=r.offsetTop),t.dataTransfer.setDragImage(r,0,0),u&&r.parentNode.removeChild(r)}}(e,t)},drop:en(e,Ri),leave:function(t){fe(e,t)||zi(e)}};var c=t.input.getField();ue(c,"keyup",(function(t){return sa.call(e,t)})),ue(c,"keydown",en(e,ca)),ue(c,"keypress",en(e,da)),ue(c,"focus",(function(t){return So(e,t)})),ue(c,"blur",(function(t){return To(e,t)}))}(this),function(){var e;Fi||(ue(window,"resize",(function(){null==e&&(e=setTimeout((function(){e=null,Ni(Ii)}),100))})),ue(window,"blur",(function(){return Ni(To)})),Fi=!0)}(),Zo(this),this.curOp.forceUpdate=!0,In(this,o),t.autofocus&&!y||this.hasFocus()?setTimeout((function(){r.hasFocus()&&!r.state.focused&&So(r)}),20):To(this),Ca)Ca.hasOwnProperty(s)&&Ca[s](this,t[s],wa);gn(this),t.finishInit&&t.finishInit(this);for(var d=0;d<La.length;++d)La[d](this);Jo(this),c&&t.lineWrapping&&"optimizelegibility"==getComputedStyle(i.lineDiv).textRendering&&(i.lineDiv.style.textRendering="auto")}Ta.defaults=ka,Ta.optionHandlers=Ca;var La=[];function Ea(e,t,r,o){var n,i=e.doc;null==r&&(r="add"),"smart"==r&&(i.mode.indent?n=gt(e,t).state:r="prev");var a=e.options.tabSize,l=Ze(i,t),c=P(l.text,null,a);l.stateAfter&&(l.stateAfter=null);var s,d=l.text.match(/^\s*/)[0];if(o||/\S/.test(l.text)){if("smart"==r&&((s=i.mode.indent(n,l.text.slice(d.length),l.text))==B||s>150)){if(!o)return;r="prev"}}else s=0,r="not";"prev"==r?s=t>i.first?P(Ze(i,t-1).text,null,a):0:"add"==r?s=c+e.options.indentUnit:"subtract"==r?s=c-e.options.indentUnit:"number"==typeof r&&(s=c+r),s=Math.max(0,s);var u="",p=0;if(e.options.indentWithTabs)for(var g=Math.floor(s/a);g;--g)p+=a,u+="\t";if(p<s&&(u+=J(s-p)),u!=d)return hi(i,u,et(t,0),et(t,d.length),"+input"),l.stateAfter=null,!0;for(var h=0;h<i.sel.ranges.length;h++){var f=i.sel.ranges[h];if(f.head.line==t&&f.head.ch<d.length){var m=et(t,d.length);Qn(i,h,new Sn(m,m));break}}}Ta.defineInitHook=function(e){return La.push(e)};var Oa=null;function Aa(e){Oa=e}function _a(e,t,r,o,n){var i=e.doc;e.display.shift=!1,o||(o=i.sel);var a=+new Date-200,l="paste"==n||e.state.pasteIncoming>a,c=Me(t),s=null;if(l&&o.ranges.length>1)if(Oa&&Oa.text.join("\n")==t){if(o.ranges.length%Oa.text.length==0){s=[];for(var d=0;d<Oa.text.length;d++)s.push(i.splitLines(Oa.text[d]))}}else c.length==o.ranges.length&&e.options.pasteLinesPerSelection&&(s=G(c,(function(e){return[e]})));for(var u=e.curOp.updateInput,p=o.ranges.length-1;p>=0;p--){var g=o.ranges[p],h=g.from(),f=g.to();g.empty()&&(r&&r>0?h=et(h.line,h.ch-r):e.state.overwrite&&!l?f=et(f.line,Math.min(Ze(i,f.line).text.length,f.ch+q(c).length)):l&&Oa&&Oa.lineWise&&Oa.text.join("\n")==c.join("\n")&&(h=f=et(h.line,0)));var m={from:h,to:f,text:s?s[p%s.length]:c,origin:n||(l?"paste":e.state.cutIncoming>a?"cut":"+input")};si(e.doc,m),lr(e,"inputRead",e,m)}t&&!l&&Ra(e,t),Mo(e),e.curOp.updateInput<2&&(e.curOp.updateInput=u),e.curOp.typing=!0,e.state.pasteIncoming=e.state.cutIncoming=-1}function Ma(e,t){var r=e.clipboardData&&e.clipboardData.getData("Text");if(r)return e.preventDefault(),t.isReadOnly()||t.options.disableInput||$o(t,(function(){return _a(t,r,0,null,"paste")})),!0}function Ra(e,t){if(e.options.electricChars&&e.options.smartIndent)for(var r=e.doc.sel,o=r.ranges.length-1;o>=0;o--){var n=r.ranges[o];if(!(n.head.ch>100||o&&r.ranges[o-1].head.line==n.head.line)){var i=e.getModeAt(n.head),a=!1;if(i.electricChars){for(var l=0;l<i.electricChars.length;l++)if(t.indexOf(i.electricChars.charAt(l))>-1){a=Ea(e,n.head.line,"smart");break}}else i.electricInput&&i.electricInput.test(Ze(e.doc,n.head.line).text.slice(0,n.head.ch))&&(a=Ea(e,n.head.line,"smart"));a&&lr(e,"electricInput",e,n.head.line)}}}function za(e){for(var t=[],r=[],o=0;o<e.doc.sel.ranges.length;o++){var n=e.doc.sel.ranges[o].head.line,i={anchor:et(n,0),head:et(n+1,0)};r.push(i),t.push(e.getRange(i.anchor,i.head))}return{text:t,ranges:r}}function Na(e,t,r,o){e.setAttribute("autocorrect",r?"":"off"),e.setAttribute("autocapitalize",o?"":"off"),e.setAttribute("spellcheck",!!t)}function Fa(){var e=A("textarea",null,null,"position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),t=A("div",[e],null,"overflow: hidden; position: relative; width: 3px; height: 0px;");return c?e.style.width="1000px":e.setAttribute("wrap","off"),f&&(e.style.border="1px solid black"),Na(e),t}function Ia(e,t,r,o,n){var i=t,a=r,l=Ze(e,t.line),c=n&&"rtl"==e.direction?-r:r;function s(i){var a,s;if("codepoint"==o){var d=l.text.charCodeAt(t.ch+(o>0?0:-1));a=isNaN(d)?null:new et(t.line,Math.max(0,Math.min(l.text.length,t.ch+r*(d>=55296&&d<56320?2:1))),-r)}else a=n?function(e,t,r,o){var n=se(t,e.doc.direction);if(!n)return Yi(t,r,o);r.ch>=t.text.length?(r.ch=t.text.length,r.sticky="before"):r.ch<=0&&(r.ch=0,r.sticky="after");var i=le(n,r.ch,r.sticky),a=n[i];if("ltr"==e.doc.direction&&a.level%2==0&&(o>0?a.to>r.ch:a.from<r.ch))return Yi(t,r,o);var l,c=function(e,r){return Qi(t,e instanceof et?e.ch:e,r)},s=function(r){return e.options.lineWrapping?(l=l||Mr(e,t),Yr(e,t,l,r)):{begin:0,end:t.text.length}},d=s("before"==r.sticky?c(r,-1):r.ch);if("rtl"==e.doc.direction||1==a.level){var u=1==a.level==o<0,p=c(r,u?1:-1);if(null!=p&&(u?p<=a.to&&p<=d.end:p>=a.from&&p>=d.begin)){var g=u?"before":"after";return new et(r.line,p,g)}}var h=function(e,t,o){for(var i=function(e,t){return t?new et(r.line,c(e,1),"before"):new et(r.line,e,"after")};e>=0&&e<n.length;e+=t){var a=n[e],l=t>0==(1!=a.level),s=l?o.begin:c(o.end,-1);if(a.from<=s&&s<a.to)return i(s,l);if(s=l?a.from:c(a.to,-1),o.begin<=s&&s<o.end)return i(s,l)}},f=h(i+o,o,d);if(f)return f;var m=o>0?d.end:c(d.begin,-1);return null==m||o>0&&m==t.text.length||!(f=h(o>0?0:n.length-1,o,s(m)))?null:f}(e.cm,l,t,r):Yi(l,t,r);if(null==a){if(i||(s=t.line+c)<e.first||s>=e.first+e.size||(t=new et(s,t.ch,t.sticky),!(l=Ze(e,s))))return!1;t=Xi(n,e.cm,l,t.line,c)}else t=a;return!0}if("char"==o||"codepoint"==o)s();else if("column"==o)s(!0);else if("word"==o||"group"==o)for(var d=null,u="group"==o,p=e.cm&&e.cm.getHelper(t,"wordChars"),g=!0;!(r<0)||s(!g);g=!1){var h=l.text.charAt(t.ch)||"\n",f=ee(h,p)?"w":u&&"\n"==h?"n":!u||/\s/.test(h)?null:"p";if(!u||g||f||(f="s"),d&&d!=f){r<0&&(r=1,s(),t.sticky="after");break}if(f&&(d=f),r>0&&!s(!g))break}var m=ii(e,t,i,a,!0);return rt(i,m)&&(m.hitSide=!0),m}function Wa(e,t,r,o){var n,i,a=e.doc,l=t.left;if("page"==o){var c=Math.min(e.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight),s=Math.max(c-.5*ro(e.display),3);n=(r>0?t.bottom:t.top)+r*s}else"line"==o&&(n=r>0?t.bottom+3:t.top-3);for(;(i=Gr(e,l,n)).outside;){if(r<0?n<=0:n>=a.height){i.hitSide=!0;break}n+=5*r}return i}var Pa=function(e){this.cm=e,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new K,this.composing=null,this.gracePeriod=!1,this.readDOMTimeout=null};function Ka(e,t){var r=_r(e,t.line);if(!r||r.hidden)return null;var o=Ze(e.doc,t.line),n=Or(r,o,t.line),i=se(o,e.doc.direction),a="left";i&&(a=le(i,t.ch)%2?"right":"left");var l=Fr(n.map,t.ch,a);return l.offset="right"==l.collapse?l.end:l.start,l}function Ua(e,t){return t&&(e.bad=!0),e}function Ba(e,t,r){var o;if(t==e.display.lineDiv){if(!(o=e.display.lineDiv.childNodes[r]))return Ua(e.clipPos(et(e.display.viewTo-1)),!0);t=null,r=0}else for(o=t;;o=o.parentNode){if(!o||o==e.display.lineDiv)return null;if(o.parentNode&&o.parentNode==e.display.lineDiv)break}for(var n=0;n<e.display.view.length;n++){var i=e.display.view[n];if(i.node==o)return Da(i,t,r)}}function Da(e,t,r){var o=e.text.firstChild,n=!1;if(!t||!M(o,t))return Ua(et(Qe(e.line),0),!0);if(t==o&&(n=!0,t=o.childNodes[r],r=0,!t)){var i=e.rest?q(e.rest):e.line;return Ua(et(Qe(i),i.text.length),n)}var a=3==t.nodeType?t:null,l=t;for(a||1!=t.childNodes.length||3!=t.firstChild.nodeType||(a=t.firstChild,r&&(r=a.nodeValue.length));l.parentNode!=o;)l=l.parentNode;var c=e.measure,s=c.maps;function d(t,r,o){for(var n=-1;n<(s?s.length:0);n++)for(var i=n<0?c.map:s[n],a=0;a<i.length;a+=3){var l=i[a+2];if(l==t||l==r){var d=Qe(n<0?e.line:e.rest[n]),u=i[a]+o;return(o<0||l!=t)&&(u=i[a+(o?1:0)]),et(d,u)}}}var u=d(a,l,r);if(u)return Ua(u,n);for(var p=l.nextSibling,g=a?a.nodeValue.length-r:0;p;p=p.nextSibling){if(u=d(p,p.firstChild,0))return Ua(et(u.line,u.ch-g),n);g+=p.textContent.length}for(var h=l.previousSibling,f=r;h;h=h.previousSibling){if(u=d(h,h.firstChild,-1))return Ua(et(u.line,u.ch+f),n);f+=h.textContent.length}}Pa.prototype.init=function(e){var t=this,r=this,o=r.cm,n=r.div=e.lineDiv;function i(e){for(var t=e.target;t;t=t.parentNode){if(t==n)return!0;if(/\bCodeMirror-(?:line)?widget\b/.test(t.className))break}return!1}function a(e){if(i(e)&&!fe(o,e)){if(o.somethingSelected())Aa({lineWise:!1,text:o.getSelections()}),"cut"==e.type&&o.replaceSelection("",null,"cut");else{if(!o.options.lineWiseCopyCut)return;var t=za(o);Aa({lineWise:!0,text:t.text}),"cut"==e.type&&o.operation((function(){o.setSelections(t.ranges,0,D),o.replaceSelection("",null,"cut")}))}if(e.clipboardData){e.clipboardData.clearData();var a=Oa.text.join("\n");if(e.clipboardData.setData("Text",a),e.clipboardData.getData("Text")==a)return void e.preventDefault()}var l=Fa(),c=l.firstChild;o.display.lineSpace.insertBefore(l,o.display.lineSpace.firstChild),c.value=Oa.text.join("\n");var s=document.activeElement;F(c),setTimeout((function(){o.display.lineSpace.removeChild(l),s.focus(),s==n&&r.showPrimarySelection()}),50)}}Na(n,o.options.spellcheck,o.options.autocorrect,o.options.autocapitalize),ue(n,"paste",(function(e){!i(e)||fe(o,e)||Ma(e,o)||l<=11&&setTimeout(en(o,(function(){return t.updateFromDOM()})),20)})),ue(n,"compositionstart",(function(e){t.composing={data:e.data,done:!1}})),ue(n,"compositionupdate",(function(e){t.composing||(t.composing={data:e.data,done:!1})})),ue(n,"compositionend",(function(e){t.composing&&(e.data!=t.composing.data&&t.readFromDOMSoon(),t.composing.done=!0)})),ue(n,"touchstart",(function(){return r.forceCompositionEnd()})),ue(n,"input",(function(){t.composing||t.readFromDOMSoon()})),ue(n,"copy",a),ue(n,"cut",a)},Pa.prototype.screenReaderLabelChanged=function(e){e?this.div.setAttribute("aria-label",e):this.div.removeAttribute("aria-label")},Pa.prototype.prepareSelection=function(){var e=yo(this.cm,!1);return e.focus=document.activeElement==this.div,e},Pa.prototype.showSelection=function(e,t){e&&this.cm.display.view.length&&((e.focus||t)&&this.showPrimarySelection(),this.showMultipleSelections(e))},Pa.prototype.getSelection=function(){return this.cm.display.wrapper.ownerDocument.getSelection()},Pa.prototype.showPrimarySelection=function(){var e=this.getSelection(),t=this.cm,o=t.doc.sel.primary(),n=o.from(),i=o.to();if(t.display.viewTo==t.display.viewFrom||n.line>=t.display.viewTo||i.line<t.display.viewFrom)e.removeAllRanges();else{var a=Ba(t,e.anchorNode,e.anchorOffset),l=Ba(t,e.focusNode,e.focusOffset);if(!a||a.bad||!l||l.bad||0!=tt(it(a,l),n)||0!=tt(nt(a,l),i)){var c=t.display.view,s=n.line>=t.display.viewFrom&&Ka(t,n)||{node:c[0].measure.map[2],offset:0},d=i.line<t.display.viewTo&&Ka(t,i);if(!d){var u=c[c.length-1].measure,p=u.maps?u.maps[u.maps.length-1]:u.map;d={node:p[p.length-1],offset:p[p.length-2]-p[p.length-3]}}if(s&&d){var g,h=e.rangeCount&&e.getRangeAt(0);try{g=T(s.node,s.offset,d.offset,d.node)}catch(e){}g&&(!r&&t.state.focused?(e.collapse(s.node,s.offset),g.collapsed||(e.removeAllRanges(),e.addRange(g))):(e.removeAllRanges(),e.addRange(g)),h&&null==e.anchorNode?e.addRange(h):r&&this.startGracePeriod()),this.rememberSelection()}else e.removeAllRanges()}}},Pa.prototype.startGracePeriod=function(){var e=this;clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout((function(){e.gracePeriod=!1,e.selectionChanged()&&e.cm.operation((function(){return e.cm.curOp.selectionChanged=!0}))}),20)},Pa.prototype.showMultipleSelections=function(e){O(this.cm.display.cursorDiv,e.cursors),O(this.cm.display.selectionDiv,e.selection)},Pa.prototype.rememberSelection=function(){var e=this.getSelection();this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastFocusNode=e.focusNode,this.lastFocusOffset=e.focusOffset},Pa.prototype.selectionInEditor=function(){var e=this.getSelection();if(!e.rangeCount)return!1;var t=e.getRangeAt(0).commonAncestorContainer;return M(this.div,t)},Pa.prototype.focus=function(){"nocursor"!=this.cm.options.readOnly&&(this.selectionInEditor()&&document.activeElement==this.div||this.showSelection(this.prepareSelection(),!0),this.div.focus())},Pa.prototype.blur=function(){this.div.blur()},Pa.prototype.getField=function(){return this.div},Pa.prototype.supportsTouch=function(){return!0},Pa.prototype.receivedFocus=function(){var e=this;this.selectionInEditor()?this.pollSelection():$o(this.cm,(function(){return e.cm.curOp.selectionChanged=!0})),this.polling.set(this.cm.options.pollInterval,(function t(){e.cm.state.focused&&(e.pollSelection(),e.polling.set(e.cm.options.pollInterval,t))}))},Pa.prototype.selectionChanged=function(){var e=this.getSelection();return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset},Pa.prototype.pollSelection=function(){if(null==this.readDOMTimeout&&!this.gracePeriod&&this.selectionChanged()){var e=this.getSelection(),t=this.cm;if(m&&d&&this.cm.display.gutterSpecs.length&&function(e){for(var t=e;t;t=t.parentNode)if(/CodeMirror-gutter-wrapper/.test(t.className))return!0;return!1}(e.anchorNode))return this.cm.triggerOnKeyDown({type:"keydown",keyCode:8,preventDefault:Math.abs}),this.blur(),void this.focus();if(!this.composing){this.rememberSelection();var r=Ba(t,e.anchorNode,e.anchorOffset),o=Ba(t,e.focusNode,e.focusOffset);r&&o&&$o(t,(function(){$n(t.doc,Ln(r,o),D),(r.bad||o.bad)&&(t.curOp.selectionChanged=!0)}))}}},Pa.prototype.pollContent=function(){null!=this.readDOMTimeout&&(clearTimeout(this.readDOMTimeout),this.readDOMTimeout=null);var e,t,r,o=this.cm,n=o.display,i=o.doc.sel.primary(),a=i.from(),l=i.to();if(0==a.ch&&a.line>o.firstLine()&&(a=et(a.line-1,Ze(o.doc,a.line-1).length)),l.ch==Ze(o.doc,l.line).text.length&&l.line<o.lastLine()&&(l=et(l.line+1,0)),a.line<n.viewFrom||l.line>n.viewTo-1)return!1;a.line==n.viewFrom||0==(e=so(o,a.line))?(t=Qe(n.view[0].line),r=n.view[0].node):(t=Qe(n.view[e].line),r=n.view[e-1].node.nextSibling);var c,s,d=so(o,l.line);if(d==n.view.length-1?(c=n.viewTo-1,s=n.lineDiv.lastChild):(c=Qe(n.view[d+1].line)-1,s=n.view[d+1].node.previousSibling),!r)return!1;for(var u=o.doc.splitLines(function(e,t,r,o,n){var i="",a=!1,l=e.doc.lineSeparator(),c=!1;function s(){a&&(i+=l,c&&(i+=l),a=c=!1)}function d(e){e&&(s(),i+=e)}function u(t){if(1==t.nodeType){var r=t.getAttribute("cm-text");if(r)return void d(r);var i,p=t.getAttribute("cm-marker");if(p){var g=e.findMarks(et(o,0),et(n+1,0),(m=+p,function(e){return e.id==m}));return void(g.length&&(i=g[0].find(0))&&d(Je(e.doc,i.from,i.to).join(l)))}if("false"==t.getAttribute("contenteditable"))return;var h=/^(pre|div|p|li|table|br)$/i.test(t.nodeName);if(!/^br$/i.test(t.nodeName)&&0==t.textContent.length)return;h&&s();for(var f=0;f<t.childNodes.length;f++)u(t.childNodes[f]);/^(pre|p)$/i.test(t.nodeName)&&(c=!0),h&&(a=!0)}else 3==t.nodeType&&d(t.nodeValue.replace(/\u200b/g,"").replace(/\u00a0/g," "));var m}for(;u(t),t!=r;)t=t.nextSibling,c=!1;return i}(o,r,s,t,c)),p=Je(o.doc,et(t,0),et(c,Ze(o.doc,c).text.length));u.length>1&&p.length>1;)if(q(u)==q(p))u.pop(),p.pop(),c--;else{if(u[0]!=p[0])break;u.shift(),p.shift(),t++}for(var g=0,h=0,f=u[0],m=p[0],y=Math.min(f.length,m.length);g<y&&f.charCodeAt(g)==m.charCodeAt(g);)++g;for(var b=q(u),v=q(p),w=Math.min(b.length-(1==u.length?g:0),v.length-(1==p.length?g:0));h<w&&b.charCodeAt(b.length-h-1)==v.charCodeAt(v.length-h-1);)++h;if(1==u.length&&1==p.length&&t==a.line)for(;g&&g>a.ch&&b.charCodeAt(b.length-h-1)==v.charCodeAt(v.length-h-1);)g--,h++;u[u.length-1]=b.slice(0,b.length-h).replace(/^\u200b+/,""),u[0]=u[0].slice(g).replace(/\u200b+$/,"");var k=et(t,g),C=et(c,p.length?q(p).length-h:0);return u.length>1||u[0]||tt(k,C)?(hi(o.doc,u,k,C,"+input"),!0):void 0},Pa.prototype.ensurePolled=function(){this.forceCompositionEnd()},Pa.prototype.reset=function(){this.forceCompositionEnd()},Pa.prototype.forceCompositionEnd=function(){this.composing&&(clearTimeout(this.readDOMTimeout),this.composing=null,this.updateFromDOM(),this.div.blur(),this.div.focus())},Pa.prototype.readFromDOMSoon=function(){var e=this;null==this.readDOMTimeout&&(this.readDOMTimeout=setTimeout((function(){if(e.readDOMTimeout=null,e.composing){if(!e.composing.done)return;e.composing=null}e.updateFromDOM()}),80))},Pa.prototype.updateFromDOM=function(){var e=this;!this.cm.isReadOnly()&&this.pollContent()||$o(this.cm,(function(){return uo(e.cm)}))},Pa.prototype.setUneditable=function(e){e.contentEditable="false"},Pa.prototype.onKeyPress=function(e){0==e.charCode||this.composing||(e.preventDefault(),this.cm.isReadOnly()||en(this.cm,_a)(this.cm,String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),0))},Pa.prototype.readOnlyChanged=function(e){this.div.contentEditable=("nocursor"!=e)+""},Pa.prototype.onContextMenu=function(){},Pa.prototype.resetPosition=function(){},Pa.prototype.needsContentAttribute=!0;var ja=function(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new K,this.hasSelection=!1,this.composing=null};ja.prototype.init=function(e){var t=this,r=this,o=this.cm;this.createField(e);var n=this.textarea;function i(e){if(!fe(o,e)){if(o.somethingSelected())Aa({lineWise:!1,text:o.getSelections()});else{if(!o.options.lineWiseCopyCut)return;var t=za(o);Aa({lineWise:!0,text:t.text}),"cut"==e.type?o.setSelections(t.ranges,null,D):(r.prevInput="",n.value=t.text.join("\n"),F(n))}"cut"==e.type&&(o.state.cutIncoming=+new Date)}}e.wrapper.insertBefore(this.wrapper,e.wrapper.firstChild),f&&(n.style.width="0px"),ue(n,"input",(function(){a&&l>=9&&t.hasSelection&&(t.hasSelection=null),r.poll()})),ue(n,"paste",(function(e){fe(o,e)||Ma(e,o)||(o.state.pasteIncoming=+new Date,r.fastPoll())})),ue(n,"cut",i),ue(n,"copy",i),ue(e.scroller,"paste",(function(t){if(!kr(e,t)&&!fe(o,t)){if(!n.dispatchEvent)return o.state.pasteIncoming=+new Date,void r.focus();var i=new Event("paste");i.clipboardData=t.clipboardData,n.dispatchEvent(i)}})),ue(e.lineSpace,"selectstart",(function(t){kr(e,t)||ve(t)})),ue(n,"compositionstart",(function(){var e=o.getCursor("from");r.composing&&r.composing.range.clear(),r.composing={start:e,range:o.markText(e,o.getCursor("to"),{className:"CodeMirror-composing"})}})),ue(n,"compositionend",(function(){r.composing&&(r.poll(),r.composing.range.clear(),r.composing=null)}))},ja.prototype.createField=function(e){this.wrapper=Fa(),this.textarea=this.wrapper.firstChild},ja.prototype.screenReaderLabelChanged=function(e){e?this.textarea.setAttribute("aria-label",e):this.textarea.removeAttribute("aria-label")},ja.prototype.prepareSelection=function(){var e=this.cm,t=e.display,r=e.doc,o=yo(e);if(e.options.moveInputWithCursor){var n=Zr(e,r.sel.primary().head,"div"),i=t.wrapper.getBoundingClientRect(),a=t.lineDiv.getBoundingClientRect();o.teTop=Math.max(0,Math.min(t.wrapper.clientHeight-10,n.top+a.top-i.top)),o.teLeft=Math.max(0,Math.min(t.wrapper.clientWidth-10,n.left+a.left-i.left))}return o},ja.prototype.showSelection=function(e){var t=this.cm.display;O(t.cursorDiv,e.cursors),O(t.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")},ja.prototype.reset=function(e){if(!this.contextMenuPending&&!this.composing){var t=this.cm;if(t.somethingSelected()){this.prevInput="";var r=t.getSelection();this.textarea.value=r,t.state.focused&&F(this.textarea),a&&l>=9&&(this.hasSelection=r)}else e||(this.prevInput=this.textarea.value="",a&&l>=9&&(this.hasSelection=null))}},ja.prototype.getField=function(){return this.textarea},ja.prototype.supportsTouch=function(){return!1},ja.prototype.focus=function(){if("nocursor"!=this.cm.options.readOnly&&(!y||R()!=this.textarea))try{this.textarea.focus()}catch(e){}},ja.prototype.blur=function(){this.textarea.blur()},ja.prototype.resetPosition=function(){this.wrapper.style.top=this.wrapper.style.left=0},ja.prototype.receivedFocus=function(){this.slowPoll()},ja.prototype.slowPoll=function(){var e=this;this.pollingFast||this.polling.set(this.cm.options.pollInterval,(function(){e.poll(),e.cm.state.focused&&e.slowPoll()}))},ja.prototype.fastPoll=function(){var e=!1,t=this;t.pollingFast=!0,t.polling.set(20,(function r(){t.poll()||e?(t.pollingFast=!1,t.slowPoll()):(e=!0,t.polling.set(60,r))}))},ja.prototype.poll=function(){var e=this,t=this.cm,r=this.textarea,o=this.prevInput;if(this.contextMenuPending||!t.state.focused||Re(r)&&!o&&!this.composing||t.isReadOnly()||t.options.disableInput||t.state.keySeq)return!1;var n=r.value;if(n==o&&!t.somethingSelected())return!1;if(a&&l>=9&&this.hasSelection===n||b&&/[\uf700-\uf7ff]/.test(n))return t.display.input.reset(),!1;if(t.doc.sel==t.display.selForContextMenu){var i=n.charCodeAt(0);if(8203!=i||o||(o="​"),8666==i)return this.reset(),this.cm.execCommand("undo")}for(var c=0,s=Math.min(o.length,n.length);c<s&&o.charCodeAt(c)==n.charCodeAt(c);)++c;return $o(t,(function(){_a(t,n.slice(c),o.length-c,null,e.composing?"*compose":null),n.length>1e3||n.indexOf("\n")>-1?r.value=e.prevInput="":e.prevInput=n,e.composing&&(e.composing.range.clear(),e.composing.range=t.markText(e.composing.start,t.getCursor("to"),{className:"CodeMirror-composing"}))})),!0},ja.prototype.ensurePolled=function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},ja.prototype.onKeyPress=function(){a&&l>=9&&(this.hasSelection=null),this.fastPoll()},ja.prototype.onContextMenu=function(e){var t=this,r=t.cm,o=r.display,n=t.textarea;t.contextMenuPending&&t.contextMenuPending();var i=co(r,e),s=o.scroller.scrollTop;if(i&&!u){r.options.resetSelectionOnContextMenu&&-1==r.doc.sel.contains(i)&&en(r,$n)(r.doc,Ln(i),D);var d,p=n.style.cssText,g=t.wrapper.style.cssText,h=t.wrapper.offsetParent.getBoundingClientRect();if(t.wrapper.style.cssText="position: static",n.style.cssText="position: absolute; width: 30px; height: 30px;\n      top: "+(e.clientY-h.top-5)+"px; left: "+(e.clientX-h.left-5)+"px;\n      z-index: 1000; background: "+(a?"rgba(255, 255, 255, .05)":"transparent")+";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",c&&(d=window.scrollY),o.input.focus(),c&&window.scrollTo(null,d),o.input.reset(),r.somethingSelected()||(n.value=t.prevInput=" "),t.contextMenuPending=y,o.selForContextMenu=r.doc.sel,clearTimeout(o.detectingSelectAll),a&&l>=9&&m(),x){Ce(e);var f=function(){ge(window,"mouseup",f),setTimeout(y,20)};ue(window,"mouseup",f)}else setTimeout(y,50)}function m(){if(null!=n.selectionStart){var e=r.somethingSelected(),i="​"+(e?n.value:"");n.value="⇚",n.value=i,t.prevInput=e?"":"​",n.selectionStart=1,n.selectionEnd=i.length,o.selForContextMenu=r.doc.sel}}function y(){if(t.contextMenuPending==y&&(t.contextMenuPending=!1,t.wrapper.style.cssText=g,n.style.cssText=p,a&&l<9&&o.scrollbars.setScrollTop(o.scroller.scrollTop=s),null!=n.selectionStart)){(!a||a&&l<9)&&m();var e=0,i=function(){o.selForContextMenu==r.doc.sel&&0==n.selectionStart&&n.selectionEnd>0&&"​"==t.prevInput?en(r,li)(r):e++<10?o.detectingSelectAll=setTimeout(i,500):(o.selForContextMenu=null,o.input.reset())};o.detectingSelectAll=setTimeout(i,200)}}},ja.prototype.readOnlyChanged=function(e){e||this.reset(),this.textarea.disabled="nocursor"==e,this.textarea.readOnly=!!e},ja.prototype.setUneditable=function(){},ja.prototype.needsContentAttribute=!1,function(e){var t=e.optionHandlers;function r(r,o,n,i){e.defaults[r]=o,n&&(t[r]=i?function(e,t,r){r!=wa&&n(e,t,r)}:n)}e.defineOption=r,e.Init=wa,r("value","",(function(e,t){return e.setValue(t)}),!0),r("mode",null,(function(e,t){e.doc.modeOption=t,Mn(e)}),!0),r("indentUnit",2,Mn,!0),r("indentWithTabs",!1),r("smartIndent",!0),r("tabSize",4,(function(e){Rn(e),Kr(e),uo(e)}),!0),r("lineSeparator",null,(function(e,t){if(e.doc.lineSep=t,t){var r=[],o=e.doc.first;e.doc.iter((function(e){for(var n=0;;){var i=e.text.indexOf(t,n);if(-1==i)break;n=i+t.length,r.push(et(o,i))}o++}));for(var n=r.length-1;n>=0;n--)hi(e.doc,t,r[n],et(r[n].line,r[n].ch+t.length))}})),r("specialChars",/[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200c\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g,(function(e,t,r){e.state.specialChars=RegExp(t.source+(t.test("\t")?"":"|\t"),"g"),r!=wa&&e.refresh()})),r("specialCharPlaceholder",Xt,(function(e){return e.refresh()}),!0),r("electricChars",!0),r("inputStyle",y?"contenteditable":"textarea",(function(){throw Error("inputStyle can not (yet) be changed in a running editor")}),!0),r("spellcheck",!1,(function(e,t){return e.getInputField().spellcheck=t}),!0),r("autocorrect",!1,(function(e,t){return e.getInputField().autocorrect=t}),!0),r("autocapitalize",!1,(function(e,t){return e.getInputField().autocapitalize=t}),!0),r("rtlMoveVisually",!w),r("wholeLineUpdateBefore",!0),r("theme","default",(function(e){va(e),mn(e)}),!0),r("keyMap","default",(function(e,t,r){var o=qi(t),n=r!=wa&&qi(r);n&&n.detach&&n.detach(e,o),o.attach&&o.attach(e,n||null)})),r("extraKeys",null),r("configureMouse",null),r("lineWrapping",!1,Sa,!0),r("gutters",[],(function(e,t){e.display.gutterSpecs=hn(t,e.options.lineNumbers),mn(e)}),!0),r("fixedGutter",!0,(function(e,t){e.display.gutters.style.left=t?io(e.display)+"px":"0",e.refresh()}),!0),r("coverGutterNextToScrollbar",!1,(function(e){return Bo(e)}),!0),r("scrollbarStyle","native",(function(e){Ho(e),Bo(e),e.display.scrollbars.setScrollTop(e.doc.scrollTop),e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)}),!0),r("lineNumbers",!1,(function(e,t){e.display.gutterSpecs=hn(e.options.gutters,t),mn(e)}),!0),r("firstLineNumber",1,mn,!0),r("lineNumberFormatter",(function(e){return e}),mn,!0),r("showCursorWhenSelecting",!1,mo,!0),r("resetSelectionOnContextMenu",!0),r("lineWiseCopyCut",!0),r("pasteLinesPerSelection",!0),r("selectionsMayTouch",!1),r("readOnly",!1,(function(e,t){"nocursor"==t&&(To(e),e.display.input.blur()),e.display.input.readOnlyChanged(t)})),r("screenReaderLabel",null,(function(e,t){t=""===t?null:t,e.display.input.screenReaderLabelChanged(t)})),r("disableInput",!1,(function(e,t){t||e.display.input.reset()}),!0),r("dragDrop",!0,xa),r("allowDropFileTypes",null),r("cursorBlinkRate",530),r("cursorScrollMargin",0),r("cursorHeight",1,mo,!0),r("singleCursorHeightPerLine",!0,mo,!0),r("workTime",100),r("workDelay",100),r("flattenSpans",!0,Rn,!0),r("addModeClass",!1,Rn,!0),r("pollInterval",100),r("undoDepth",200,(function(e,t){return e.doc.history.undoDepth=t})),r("historyEventDelay",1250),r("viewportMargin",10,(function(e){return e.refresh()}),!0),r("maxHighlightLength",1e4,Rn,!0),r("moveInputWithCursor",!0,(function(e,t){t||e.display.input.resetPosition()})),r("tabindex",null,(function(e,t){return e.display.input.getField().tabIndex=t||""})),r("autofocus",null),r("direction","ltr",(function(e,t){return e.doc.setDirection(t)}),!0),r("phrases",null)}(Ta),function(e){var t=e.optionHandlers,r=e.helpers={};e.prototype={constructor:e,focus:function(){window.focus(),this.display.input.focus()},setOption:function(e,r){var o=this.options,n=o[e];o[e]==r&&"mode"!=e||(o[e]=r,t.hasOwnProperty(e)&&en(this,t[e])(this,r,n),he(this,"optionChange",this,e))},getOption:function(e){return this.options[e]},getDoc:function(){return this.doc},addKeyMap:function(e,t){this.state.keyMaps[t?"push":"unshift"](qi(e))},removeKeyMap:function(e){for(var t=this.state.keyMaps,r=0;r<t.length;++r)if(t[r]==e||t[r].name==e)return t.splice(r,1),!0},addOverlay:tn((function(t,r){var o=t.token?t:e.getMode(this.options,t);if(o.startState)throw Error("Overlays may not be stateful.");!function(e,t,r){for(var o=0,n=r(t);o<e.length&&r(e[o])<=n;)o++;e.splice(o,0,t)}(this.state.overlays,{mode:o,modeSpec:t,opaque:r&&r.opaque,priority:r&&r.priority||0},(function(e){return e.priority})),this.state.modeGen++,uo(this)})),removeOverlay:tn((function(e){for(var t=this.state.overlays,r=0;r<t.length;++r){var o=t[r].modeSpec;if(o==e||"string"==typeof e&&o.name==e)return t.splice(r,1),this.state.modeGen++,void uo(this)}})),indentLine:tn((function(e,t,r){"string"!=typeof t&&"number"!=typeof t&&(t=null==t?this.options.smartIndent?"smart":"prev":t?"add":"subtract"),Xe(this.doc,e)&&Ea(this,e,t,r)})),indentSelection:tn((function(e){for(var t=this.doc.sel.ranges,r=-1,o=0;o<t.length;o++){var n=t[o];if(n.empty())n.head.line>r&&(Ea(this,n.head.line,e,!0),r=n.head.line,o==this.doc.sel.primIndex&&Mo(this));else{var i=n.from(),a=n.to(),l=Math.max(r,i.line);r=Math.min(this.lastLine(),a.line-(a.ch?0:1))+1;for(var c=l;c<r;++c)Ea(this,c,e);var s=this.doc.sel.ranges;0==i.ch&&t.length==s.length&&s[o].from().ch>0&&Qn(this.doc,o,new Sn(i,s[o].to()),D)}}})),getTokenAt:function(e,t){return bt(this,e,t)},getLineTokens:function(e,t){return bt(this,et(e),t,!0)},getTokenTypeAt:function(e){e=lt(this.doc,e);var t,r=pt(this,Ze(this.doc,e.line)),o=0,n=(r.length-1)/2,i=e.ch;if(0==i)t=r[2];else for(;;){var a=o+n>>1;if((a?r[2*a-1]:0)>=i)n=a;else{if(!(r[2*a+1]<i)){t=r[2*a+2];break}o=a+1}}var l=t?t.indexOf("overlay "):-1;return l<0?t:0==l?null:t.slice(0,l-1)},getModeAt:function(t){var r=this.doc.mode;return r.innerMode?e.innerMode(r,this.getTokenAt(t).state).mode:r},getHelper:function(e,t){return this.getHelpers(e,t)[0]},getHelpers:function(e,t){var o=[];if(!r.hasOwnProperty(t))return o;var n=r[t],i=this.getModeAt(e);if("string"==typeof i[t])n[i[t]]&&o.push(n[i[t]]);else if(i[t])for(var a=0;a<i[t].length;a++){var l=n[i[t][a]];l&&o.push(l)}else i.helperType&&n[i.helperType]?o.push(n[i.helperType]):n[i.name]&&o.push(n[i.name]);for(var c=0;c<n._global.length;c++){var s=n._global[c];s.pred(i,this)&&-1==U(o,s.val)&&o.push(s.val)}return o},getStateAfter:function(e,t){var r=this.doc;return gt(this,(e=at(r,null==e?r.first+r.size-1:e))+1,t).state},cursorCoords:function(e,t){var r=this.doc.sel.primary();return Zr(this,null==e?r.head:"object"==typeof e?lt(this.doc,e):e?r.from():r.to(),t||"page")},charCoords:function(e,t){return Vr(this,lt(this.doc,e),t||"page")},coordsChar:function(e,t){return Gr(this,(e=Hr(this,e,t||"page")).left,e.top)},lineAtHeight:function(e,t){return e=Hr(this,{top:e,left:0},t||"page").top,Ye(this.doc,e+this.display.viewOffset)},heightAtLine:function(e,t,r){var o,n=!1;if("number"==typeof e){var i=this.doc.first+this.doc.size-1;e<this.doc.first?e=this.doc.first:e>i&&(e=i,n=!0),o=Ze(this.doc,e)}else o=e;return jr(this,o,{top:0,left:0},t||"page",r||n).top+(n?this.doc.height-jt(o):0)},defaultTextHeight:function(){return ro(this.display)},defaultCharWidth:function(){return oo(this.display)},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(e,t,r,o,n){var i,a=this.display,l=(e=Zr(this,lt(this.doc,e))).bottom,c=e.left;if(t.style.position="absolute",t.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(t),a.sizer.appendChild(t),"over"==o)l=e.top;else if("above"==o||"near"==o){var s=Math.max(a.wrapper.clientHeight,this.doc.height),d=Math.max(a.sizer.clientWidth,a.lineSpace.clientWidth);("above"==o||e.bottom+t.offsetHeight>s)&&e.top>t.offsetHeight?l=e.top-t.offsetHeight:e.bottom+t.offsetHeight<=s&&(l=e.bottom),c+t.offsetWidth>d&&(c=d-t.offsetWidth)}t.style.top=l+"px",t.style.left=t.style.right="","right"==n?(c=a.sizer.clientWidth-t.offsetWidth,t.style.right="0px"):("left"==n?c=0:"middle"==n&&(c=(a.sizer.clientWidth-t.offsetWidth)/2),t.style.left=c+"px"),r&&(null!=(i=Ao(this,{left:c,top:l,right:c+t.offsetWidth,bottom:l+t.offsetHeight})).scrollTop&&Fo(this,i.scrollTop),null!=i.scrollLeft&&Wo(this,i.scrollLeft))},triggerOnKeyDown:tn(ca),triggerOnKeyPress:tn(da),triggerOnKeyUp:sa,triggerOnMouseDown:tn(ha),execCommand:function(e){if($i.hasOwnProperty(e))return $i[e].call(null,this)},triggerElectric:tn((function(e){Ra(this,e)})),findPosH:function(e,t,r,o){var n=1;t<0&&(n=-1,t=-t);for(var i=lt(this.doc,e),a=0;a<t&&!(i=Ia(this.doc,i,n,r,o)).hitSide;++a);return i},moveH:tn((function(e,t){var r=this;this.extendSelectionsBy((function(o){return r.display.shift||r.doc.extend||o.empty()?Ia(r.doc,o.head,e,t,r.options.rtlMoveVisually):e<0?o.from():o.to()}),H)})),deleteH:tn((function(e,t){var r=this.doc.sel,o=this.doc;r.somethingSelected()?o.replaceSelection("",null,"+delete"):Gi(this,(function(r){var n=Ia(o,r.head,e,t,!1);return e<0?{from:n,to:r.head}:{from:r.head,to:n}}))})),findPosV:function(e,t,r,o){var n=1,i=o;t<0&&(n=-1,t=-t);for(var a=lt(this.doc,e),l=0;l<t;++l){var c=Zr(this,a,"div");if(null==i?i=c.left:c.left=i,(a=Wa(this,c,n,r)).hitSide)break}return a},moveV:tn((function(e,t){var r=this,o=this.doc,n=[],i=!this.display.shift&&!o.extend&&o.sel.somethingSelected();if(o.extendSelectionsBy((function(a){if(i)return e<0?a.from():a.to();var l=Zr(r,a.head,"div");null!=a.goalColumn&&(l.left=a.goalColumn),n.push(l.left);var c=Wa(r,l,e,t);return"page"==t&&a==o.sel.primary()&&_o(r,Vr(r,c,"div").top-l.top),c}),H),n.length)for(var a=0;a<o.sel.ranges.length;a++)o.sel.ranges[a].goalColumn=n[a]})),findWordAt:function(e){var t=Ze(this.doc,e.line).text,r=e.ch,o=e.ch;if(t){var n=this.getHelper(e,"wordChars");"before"!=e.sticky&&o!=t.length||!r?++o:--r;for(var i=t.charAt(r),a=ee(i,n)?function(e){return ee(e,n)}:/\s/.test(i)?function(e){return/\s/.test(e)}:function(e){return!/\s/.test(e)&&!ee(e)};r>0&&a(t.charAt(r-1));)--r;for(;o<t.length&&a(t.charAt(o));)++o}return new Sn(et(e.line,r),et(e.line,o))},toggleOverwrite:function(e){null!=e&&e==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?z(this.display.cursorDiv,"CodeMirror-overwrite"):L(this.display.cursorDiv,"CodeMirror-overwrite"),he(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==R()},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:tn((function(e,t){Ro(this,e,t)})),getScrollInfo:function(){var e=this.display.scroller;return{left:e.scrollLeft,top:e.scrollTop,height:e.scrollHeight-Tr(this)-this.display.barHeight,width:e.scrollWidth-Tr(this)-this.display.barWidth,clientHeight:Er(this),clientWidth:Lr(this)}},scrollIntoView:tn((function(e,t){null==e?(e={from:this.doc.sel.primary().head,to:null},null==t&&(t=this.options.cursorScrollMargin)):"number"==typeof e?e={from:et(e,0),to:null}:null==e.from&&(e={from:e,to:null}),e.to||(e.to=e.from),e.margin=t||0,null!=e.from.line?function(e,t){zo(e),e.curOp.scrollToPos=t}(this,e):No(this,e.from,e.to,e.margin)})),setSize:tn((function(e,t){var r=this,o=function(e){return"number"==typeof e||/^\d+$/.test(e+"")?e+"px":e};null!=e&&(this.display.wrapper.style.width=o(e)),null!=t&&(this.display.wrapper.style.height=o(t)),this.options.lineWrapping&&Pr(this);var n=this.display.viewFrom;this.doc.iter(n,this.display.viewTo,(function(e){if(e.widgets)for(var t=0;t<e.widgets.length;t++)if(e.widgets[t].noHScroll){po(r,n,"widget");break}++n})),this.curOp.forceUpdate=!0,he(this,"refresh",this)})),operation:function(e){return $o(this,e)},startOperation:function(){return Zo(this)},endOperation:function(){return Jo(this)},refresh:tn((function(){var e=this.display.cachedTextHeight;uo(this),this.curOp.forceUpdate=!0,Kr(this),Ro(this,this.doc.scrollLeft,this.doc.scrollTop),dn(this.display),(null==e||Math.abs(e-ro(this.display))>.5||this.options.lineWrapping)&&lo(this),he(this,"refresh",this)})),swapDoc:tn((function(e){var t=this.doc;return t.cm=null,this.state.selectingText&&this.state.selectingText(),In(this,e),Kr(this),this.display.input.reset(),Ro(this,e.scrollLeft,e.scrollTop),this.curOp.forceScroll=!0,lr(this,"swapDoc",this,t),t})),phrase:function(e){var t=this.options.phrases;return t&&Object.prototype.hasOwnProperty.call(t,e)?t[e]:e},getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},be(e),e.registerHelper=function(t,o,n){r.hasOwnProperty(t)||(r[t]=e[t]={_global:[]}),r[t][o]=n},e.registerGlobalHelper=function(t,o,n,i){e.registerHelper(t,o,i),r[t]._global.push({pred:n,val:i})}}(Ta);var Ha="iter insert remove copy getEditor constructor".split(" ");for(var Va in _i.prototype)_i.prototype.hasOwnProperty(Va)&&U(Ha,Va)<0&&(Ta.prototype[Va]=function(e){return function(){return e.apply(this.doc,arguments)}}(_i.prototype[Va]));return be(_i),Ta.inputStyles={textarea:ja,contenteditable:Pa},Ta.defineMode=function(e){Ta.defaults.mode||"null"==e||(Ta.defaults.mode=e),We.apply(this,arguments)},Ta.defineMIME=function(e,t){Ie[e]=t},Ta.defineMode("null",(function(){return{token:function(e){return e.skipToEnd()}}})),Ta.defineMIME("text/plain","null"),Ta.defineExtension=function(e,t){Ta.prototype[e]=t},Ta.defineDocExtension=function(e,t){_i.prototype[e]=t},Ta.fromTextArea=function(e,t){if((t=t?W(t):{}).value=e.value,!t.tabindex&&e.tabIndex&&(t.tabindex=e.tabIndex),!t.placeholder&&e.placeholder&&(t.placeholder=e.placeholder),null==t.autofocus){var r=R();t.autofocus=r==e||null!=e.getAttribute("autofocus")&&r==document.body}function o(){e.value=l.getValue()}var n;if(e.form&&(ue(e.form,"submit",o),!t.leaveSubmitMethodAlone)){var i=e.form;n=i.submit;try{var a=i.submit=function(){o(),i.submit=n,i.submit(),i.submit=a}}catch(e){}}t.finishInit=function(r){r.save=o,r.getTextArea=function(){return e},r.toTextArea=function(){r.toTextArea=isNaN,o(),e.parentNode.removeChild(r.getWrapperElement()),e.style.display="",e.form&&(ge(e.form,"submit",o),t.leaveSubmitMethodAlone||"function"!=typeof e.form.submit||(e.form.submit=n))}},e.style.display="none";var l=Ta((function(t){return e.parentNode.insertBefore(t,e.nextSibling)}),t);return l},function(e){e.off=ge,e.on=ue,e.wheelEventPixels=kn,e.Doc=_i,e.splitLines=Me,e.countColumn=P,e.findColumn=V,e.isWordChar=$,e.Pass=B,e.signal=he,e.Line=Zt,e.changeEnd=En,e.scrollbarModel=jo,e.Pos=et,e.cmpPos=tt,e.modes=Fe,e.mimeModes=Ie,e.resolveMode=Pe,e.getMode=Ke,e.modeExtensions=Ue,e.extendMode=Be,e.copyState=De,e.startState=He,e.innerMode=je,e.commands=$i,e.keyMap=Bi,e.keyName=Ji,e.isModifierKey=Vi,e.lookupKey=Hi,e.normalizeKeyMap=ji,e.StringStream=Ve,e.SharedTextMarker=Li,e.TextMarker=Si,e.LineWidget=ki,e.e_preventDefault=ve,e.e_stopPropagation=we,e.e_stop=Ce,e.addClass=z,e.contains=M,e.rmClass=L,e.keyNames=Wi}(Ta),Ta.version="5.58.2",Ta},(window||self).CodeMirror=Jt(),Gt.prototype.start=function(e){return this.stream=e,this.line=0,this.string=e.string.slice(e.start),this.startLine=e.string,this.startPos=e.start,this},Gt.prototype.startLinebreak=function(){return this.stream=null,this.line=this.startPos=0,this.string="\n",this.startLine="",this},Gt.prototype.copy=function(){var e=this.copyInstance||(this.copyInstance=new Gt);return e.stream=this.stream,e.startPos=this.startPos,e.line=this.line,e.startLine=this.startLine,e.string=this.string,e},Gt.prototype.updateStart=function(){this.startLine=this.stream?0==this.line?this.stream.string:this.stream.lookAhead(this.line):"",this.startPos=this.startLine.length-(this.string.length-1)},Gt.prototype.ahead=function(e){for(;;){if(e<=this.string.length)return!0;if(10!==this.string.charCodeAt(this.string.length-1))this.string+="\n";else{if(3===this.line||!this.stream||!this.stream.lookAhead)return!1;var t=this.stream.lookAhead(this.line+1);if(null==t)return!1;this.string+=t+"\n",this.line++}}};var Qt=null;function Yt(e,t){this.State=function(e,t){function r(e,t){this.stack=e,this.context=t}function o(){return null}return r.prototype.matchNext=function(t,r,o,n){for(var i=this.stack.length-1,a=this.stack[i],l=e.nodes[a],c=0;c<l.length;c++){var s,d,u=l[c];if(0===u)s=r,d=l[++c];else{if(1===u||2===u){var p=l[++c],g=l[++c];this.go(g);var h=this.context;if(2===u){var f=l[++c];this.context=new qt(f.name,f.token,this.stack.length,this.context,t.startLine,t.startPos)}this.stack.push(p);var m=this.matchNext(t,r,0,!1);if(m===r&&(m=this.matchNext(t,r,c==l.length-1?o:0,n)),m<0){this.stack.length=i+1,this.stack[i]=a,this.context=h;continue}return m}if(3===u){var y=l[++c];s=this.matchExpr(l[++c],t,r),d=l[++c],s>r&&(Qt=y)}else s=this.matchExpr(u,t,r),d=l[++c]}if(s<0){if(!(o>0&&c==l.length-1))continue;o--,s=r}if(this.go(d),!n&&-1===d||0===this.stack.length)return s;if(s>r)return s;if((s=this.matchNext(t,r,c==l.length-1?o:0,n))>=0)return s;this.stack.length=i+1,this.stack[i]=a}return-1},r.prototype.go=function(e){for(this.stack.pop();this.context&&this.context.depth>this.stack.length;)this.context=this.context.parent;-1!==e&&this.stack.push(e)},r.prototype.runMaybe=function(e,t,r){return Qt=null,this.matchNext(e,t,r,!0)},r.prototype.forward=function(t,r){var o=this.runMaybe(t,r,2);return o<0&&(this.stack.push(e.token),o=this.runMaybe(t,r,0)),o},r.prototype.lookahead=function(e,t,r){var o=Qt,n=new this.constructor([r],null);for(e=e.copy();;){e.updateStart();var i=n.runMaybe(e,t,0);if(i<0)return Qt=o,!1;if(0===n.stack.length)return Qt=o,!0;t=i}},r.prototype.matchExpr=function(e,r,n){if("string"==typeof e){var i=n+e.length;return r.ahead(i)&&r.string.slice(n,i)===e?i:-1}if(e.exec){var a=r.ahead(n+1)&&e.exec(n>0?r.string.slice(n):r.string);return a?n+a[0].length:-1}var l,c=e[0];if(0===c){for(var s=1;s<e.length;s++)if((n=this.matchExpr(e[s],r,n))<0)return-1;return n}if(1===c){s=1;for(var d=e.length-1;;s++){var u=this.matchExpr(e[s],r,n);if(s===d||u>-1)return u}return-1}if(2!==c&&3!==c){if(4===c)return Math.max(this.matchExpr(e[1],r,n),n);if(5===c)return this.lookahead(r,n,e[1])?n:-1;if(6===c)return this.lookahead(r,n,e[1])?-1:n;if(7===c){var p,g,h=n?r.string.lastIndexOf("\n",n-1):-1;if(r.stream&&h<0)p=r.stream.string,g=n+r.stream.start;else{var f=r.string.indexOf("\n",n);p=r.string.slice(h+1,f<0?r.string.length:f),g=n-(h+1)}return t.predicates[e[1]](p,g,this.context,r.stream?(l=r.stream,function(e){return l.lookAhead(e)}):o)?n:-1}throw Error("Unknown match type "+e)}if(3===c&&(n=this.matchExpr(e[1],r,n))<0)return-1;for(;;){var m=this.matchExpr(e[1],r,n);if(-1==m)return n;n=m}},r.prototype.contextAt=function(e,t){var r=this.copy(),o=new Gt,n=0,i=this.context;for(o.string=e+"\n",o.startLine=e;;){var a=r.runMaybe(o,n,0);if(-1==a)return r.context;if(a>t){var l=r.context;if(n==t)e:for(;l;){for(var c=i;c;c=c.parent)if(c===l)break e;l=l.parent}return l}n=a,i=r.context}},r.prototype.copy=function(){return new this.constructor(this.stack.slice(),this.context)},r.start=function(){return new this([e.start],null)},r}(e,t||{}),this.mcx=new Gt}CodeMirror.GrammarMode=Yt,Yt.prototype.startState=function(){return this.State.start()},Yt.prototype.copyState=function(e){return e.copy()},Yt.prototype.token=function(e,t){e.pos+=t.forward(this.mcx.start(e),0);for(var r=Qt,o=t.context;o;o=o.parent)o.tokenType&&(r=o.tokenType+(r?" "+r:""));return e.eol()&&t.forward(this.mcx,e.pos-e.start),r},Yt.prototype.blankLine=function(e){e.forward(this.mcx.startLinebreak(),0)},function(e){var t=[/^(?:var|let|const)(?![a-zA-Z¡-￿_0-9_\$])/,/^while(?![a-zA-Z¡-￿_0-9_\$])/,/^with(?![a-zA-Z¡-￿_0-9_\$])/,/^do(?![a-zA-Z¡-￿_0-9_\$])/,/^debugger(?![a-zA-Z¡-￿_0-9_\$])/,/^if(?![a-zA-Z¡-￿_0-9_\$])/,/^function(?![a-zA-Z¡-￿_0-9_\$])/,/^for(?![a-zA-Z¡-￿_0-9_\$])/,/^default(?![a-zA-Z¡-￿_0-9_\$])/,/^case(?![a-zA-Z¡-￿_0-9_\$])/,/^return(?![a-zA-Z¡-￿_0-9_\$])/,/^throw(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:break|continue)(?![a-zA-Z¡-￿_0-9_\$])/,/^switch(?![a-zA-Z¡-￿_0-9_\$])/,/^try(?![a-zA-Z¡-￿_0-9_\$])/,/^class(?![a-zA-Z¡-￿_0-9_\$])/,/^export(?![a-zA-Z¡-￿_0-9_\$])/,/^import(?![a-zA-Z¡-￿_0-9_\$])/,[0,"async",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,114]],[1,";",/^(?=\})/,[7,"canInsertSemi"]],/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*/,/^extends(?![a-zA-Z¡-￿_0-9_\$])/,/^from(?![a-zA-Z¡-￿_0-9_\$])/,/^else(?![a-zA-Z¡-￿_0-9_\$])/,/^catch(?![a-zA-Z¡-￿_0-9_\$])/,/^finally(?![a-zA-Z¡-￿_0-9_\$])/,/^as(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:true|false|null|undefined|NaN|Infinity)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:super|this)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:delete|typeof|yield|await|void)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.|\!|\+\+?|\-\-?)/,/^(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:[0-9][0-9_]*(?:\.[0-9_]*)?|\.[0-9_]+)(?:[eE][\+\-]?[0-9_]+)?)/,/^\/(?![\/\*])(?:\\.|\[(?:(?!\]).)*\]|(?!\/).)+\/[gimyus]*/,/^(?:\+\+|\-\-)/,/^(?:(?:\+|\-|\%|\*|\/(?![\/\*])|\>\>?\>?|\<\<?|\=\=?|\&\&?|\|\|?|\^|\!\=)\=?|\?\?)/,/^(?:in|instanceof)(?![a-zA-Z¡-￿_0-9_\$])/,/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\()/,/^(?:\.|\?\.)/,[1,"\n","\t"," "],/^new(?![a-zA-Z¡-￿_0-9_\$])/],r=Object.freeze({nodes:[[1,6,2],[/^[^]/,0],[1,6,3],[2,7,4,{name:"Statement"},0,1],[1,6,3],[3,"keyword",t[0],-1,3,"keyword",t[1],-1,3,"keyword",t[2],-1,3,"keyword",t[23],-1,3,"keyword",t[3],-1,3,"keyword",t[14],-1,3,"keyword",t[25],-1,3,"keyword",t[10],-1,3,"keyword",t[11],-1,3,"keyword",t[12],-1,3,"keyword",t[4],-1,3,"keyword",t[9],-1,3,"keyword",t[8],-1,3,"keyword",t[6],-1,3,"keyword",t[5],-1,3,"keyword",t[24],-1,3,"keyword",t[7],-1,3,"keyword",t[13],-1,3,"keyword",t[15],-1,3,"keyword",t[16],-1,3,"keyword",t[17],-1,3,"keyword",t[21],-1,3,"keyword",t[18],-1,3,"keyword",t[39],-1,3,"keyword",t[35],-1,3,"keyword",t[29],-1,3,"keyword",t[28],-1,3,"atom",t[27],-1,3,"variable",t[20],-1,3,"operator",t[30],-1,3,"operator",t[34],-1,3,"operator",t[33],-1,2,116,-1,{name:"string",token:"string"},3,"number",t[31],-1,2,121,-1,{name:"comment",token:"comment"},3,"string-2",t[32],-1,1,125,-1,/^[^]/,-1],[t[38],6,2,121,6,{name:"comment",token:"comment"},0,-1],[3,"keyword",t[0],8,3,"keyword",t[1],23,3,"keyword",t[2],23,3,"keyword",t[3],27,2,129,-1,{name:"Block"},";",-1,3,"keyword",t[4],-1,3,"keyword",t[5],35,3,"keyword",t[6],40,3,"keyword",t[7],46,3,"keyword",t[8],48,/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\:)/,48,3,"keyword",t[9],49,3,"keyword",t[10],52,3,"keyword",t[11],56,3,"keyword",t[12],60,3,"keyword",t[13],64,3,"keyword",t[14],68,3,"keyword",t[15],72,3,"keyword",t[16],80,3,"keyword",t[17],92,3,"keyword",t[18],108,"@",110,1,133,112],[1,6,9],[1,139,10],[1,6,11],[3,"operator","=",12,0,13],[1,6,14],[1,6,15],[1,142,13],[",",16,t[19],-1],[1,6,17],[1,139,18],[1,6,19],[3,"operator","=",20,0,21],[1,6,22],[1,6,15],[1,142,21],[1,6,24],[2,146,25,{name:"CondExpr"}],[1,6,26],[2,7,-1,{name:"Statement"}],[1,6,28],[2,7,29,{name:"Statement"}],[1,6,30],[3,"keyword",t[1],31,0,-1],[1,6,32],[2,146,33,{name:"CondExpr"}],[1,6,34],[t[19],-1],[1,6,36],[2,146,37,{name:"CondExpr"}],[1,6,38],[2,7,39,{name:"Statement"}],[2,151,-1,{name:"Alternative"}],[1,6,41],[3,"keyword","*",42,0,42],[1,6,43],[3,"def",t[20],44],[1,6,45],[2,155,-1,{name:"FunctionDef"}],[1,6,47],[2,158,-1,{name:"ForStatement"}],[1,6,50],[1,6,51],[":",-1],[1,133,48],[1,6,53],[t[19],-1,1,133,54],[1,6,55],[t[19],-1],[1,6,57],[1,133,58],[1,6,59],[t[19],-1],[1,6,61],[/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*)?/,62],[1,6,63],[t[19],-1],[1,6,65],[2,146,66,{name:"CondExpr"}],[1,6,67],[2,129,-1,{name:"Block"}],[1,6,69],[2,129,70,{name:"Block"}],[1,6,71],[2,161,-1,{name:"CatchFinally"}],[1,6,73],[3,"type def",t[20],74],[1,6,75],[3,"keyword",t[21],76,0,77],[1,6,78],[1,6,79],[1,133,77],[2,174,-1,{name:"ClassBody"}],[1,6,81],["*",82,3,"keyword",t[8],82,"{",83,2,7,-1,{name:"Statement"}],[1,6,84],[1,6,85],[3,"keyword",t[22],86,0,87],[1,182,88],[1,6,89],[1,6,90],[1,6,91],[2,116,87,{name:"string",token:"string"}],[t[19],-1],["}",82],[1,6,93],[2,116,94,{name:"string",token:"string"},3,"keyword","*",95,1,188,96,"{",97],[1,6,98],[1,6,99],[1,6,100],[1,6,101],[t[19],-1],[3,"keyword",t[26],102,0,96],[3,"keyword",t[22],103,0,94],[1,182,104],[1,6,105],[1,6,106],[1,6,107],[3,"def",t[20],96],[2,116,94,{name:"string",token:"string"}],["}",96],[1,6,109],[2,7,-1,{name:"Statement"}],[1,6,111],[1,133,-1],[1,6,113],[t[19],-1],[1,6,115],[3,"keyword",t[6],-1,/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*|\()/,-1],["'",117,'"',119],["\\",118,/^(?!\')./,117,"'",-1],[/^[^]/,117],["\\",120,/^(?!\")./,119,'"',-1],[/^[^]/,119],[/^\/\*\*(?!\/)/,122,"/*",124,/^\/\/.*/,-1],[1,193,122,0,123],[2,196,123,{name:"doccomment.tagGroup"},"*/",-1],[[0,/^(?!\*\/)/,/^[^]/],124,"*/",-1],[3,"string-2","`",126],[3,"string-2","${",127,2,198,126,{name:"str2",token:"string-2"},3,"string-2",/^(?:(?!\`|\$\{|\\).)+/,126,3,"string-2","`",-1],[1,133,128],[3,"string-2","}",126],["{",130],[1,6,131],[2,7,132,{name:"Statement"},"}",-1],[1,6,131],[1,200,134],[1,6,135],[",",136,1,218,137,0,-1],[1,6,138],[1,6,135],[1,142,137],[3,"operator","...",140,0,140],[1,6,141],[3,"def",t[20],-1,2,233,-1,{name:"ArrayPattern"},2,238,-1,{name:"ObjectPattern"}],[1,200,143],[1,6,144],[1,243,145,0,-1],[1,6,144],["(",147],[1,6,148],[1,133,149],[1,6,150],[")",-1],[1,6,152],[3,"keyword",t[23],153,0,-1],[1,6,154],[2,7,-1,{name:"Statement"}],[2,258,156,{name:"ParamList"}],[1,6,157],[2,129,-1,{name:"Block"}],[2,263,159,{name:"ForSpec"}],[1,6,160],[2,7,-1,{name:"Statement"}],[3,"keyword",t[24],162,0,170],[1,6,163],["(",164,0,165],[1,6,166],[1,6,167],[1,139,168],[2,129,170,{name:"Block"}],[1,6,169],[")",165],[1,6,171],[3,"keyword",t[25],172,0,-1],[1,6,173],[2,129,-1,{name:"Block"}],["{",175],[1,6,176],[3,"keyword",/^static(?![a-zA-Z¡-￿_0-9_\$])/,177,0,177,"@",178,"}",-1],[1,6,179],[1,6,180],[2,274,181,{name:"ObjectMember"}],[1,133,181],[1,6,176],[1,188,183,0,-1],[1,6,184],[",",185,0,-1],[1,6,186],[1,188,187,0,187],[1,6,184],[3,"variable",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= +as)/,189,3,"def",t[20],-1],[1,6,190],[3,"keyword",t[26],191],[1,6,192],[3,"def",t[20],-1],[0,194,2,289,-1,{name:"doccomment.braced"}],[[0,/^(?!\*\/|\@[a-zA-Z¡-￿_0-9]|\{)/,/^[^]/],195],[0,194,0,-1],[1,293,197],[1,193,197,0,-1],["\\",199,"\n",-1],[/^[^]/,-1],[3,"atom",t[27],-1,3,"keyword",t[28],-1,3,"keyword",t[29],201,3,"operator",t[30],201,3,"keyword",t[18],201,2,299,-1,{name:"NewExpression"},3,"keyword",t[6],203,3,"keyword",t[15],209,2,309,-1,{name:"ArrowFunc"},3,"variable callee",t[36],-1,3,"variable",t[20],-1,3,"number",t[31],-1,2,116,-1,{name:"string",token:"string"},3,"string-2",t[32],-1,1,125,-1,2,313,-1,{name:"ArrayLiteral"},2,318,-1,{name:"ObjectLiteral"},2,323,-1,{name:"ParenExpr"}],[1,6,202],[1,200,-1],[1,6,204],[3,"keyword","*",205,0,205],[1,6,206],[3,"def",t[20],207,0,207],[1,6,208],[2,155,-1,{name:"FunctionDef"}],[1,6,210],[[6,328],211,0,212],[3,"type def",t[20],212],[1,6,213],[3,"keyword",t[21],214,0,215],[1,6,216],[1,6,217],[1,133,215],[2,174,-1,{name:"ClassBody"}],[3,"operator",t[33],-1,3,"operator",t[34],219,3,"keyword",t[35],219,2,329,-1,{name:"ArgList"},1,125,-1,t[37],221,"[",223,3,"operator","?",227],[1,6,220],[1,133,-1],[1,6,222],[3,"property callee",t[36],-1,3,"property",t[20],-1],[1,6,224],[1,133,225],[1,6,226],["]",-1],[1,6,228],[1,133,229],[1,6,230],[3,"operator",":",231],[1,6,232],[1,133,-1],["[",234],[1,6,235],[1,334,236],[1,6,237],["]",-1],["{",239],[1,6,240],[1,340,241],[1,6,242],["}",-1],[3,"operator",t[33],-1,3,"operator",t[34],244,3,"keyword",t[35],244,2,329,-1,{name:"ArgList"},1,125,-1,t[37],246,"[",248,3,"operator","?",252],[1,6,245],[1,142,-1],[1,6,247],[3,"property callee",t[36],-1,3,"property",t[20],-1],[1,6,249],[1,133,250],[1,6,251],["]",-1],[1,6,253],[1,133,254],[1,6,255],[3,"operator",":",256],[1,6,257],[1,142,-1],["(",259],[1,6,260],[1,346,261],[1,6,262],[")",-1],["(",264],[1,6,265],[2,352,266,{name:"StatementMaybeOf"}],[1,6,267],[1,133,268,0,268,0,272],[1,6,269],[";",270],[1,6,271],[1,133,272,0,272],[1,6,273],[")",-1],[3,"keyword",/^(?:get|set|async)(?![a-zA-Z¡-￿_0-9_\$])(?! *[\,\}\:\(])/,275,0,275],[1,6,276],[3,"keyword","*",277,0,277],[1,6,278],[3,"def property",t[20],279,"[",280,3,"number",t[31],279,2,116,279,{name:"string",token:"string"},3,"operator","...",281],[1,6,282],[1,6,283],[1,6,284],[2,155,-1,{name:"FunctionDef"},":",285,0,-1],[1,133,286],[1,142,-1],[1,6,287],[1,6,288],[1,142,-1],["]",279],["{",290],[1,293,291,1,193,292],[[0,/^(?!\}|\*\/)/,/^[^]/],291,0,292],[/^(?:\}|(?=\*\/))/,-1],[3,"tag",/^\@(?:member|param|arg(?:ument)?|module|namespace|typedef)(?![a-zA-Z¡-￿_0-9])/,294,3,"tag",/^\@[a-zA-Z¡-￿_0-9]+/,-1],[t[38],294,"{",295,0,296,0,-1],[2,357,297,{name:"doccomment.type"}],[3,"def",/^[a-zA-Z¡-￿_0-9]+/,-1,0,-1],["}",298],[[1,"\n","\t"," ",/^\*(?!\/)/],298,0,296],[3,"keyword",t[39],300],[1,6,301],[".",302,1,200,303],[1,6,304],[1,6,305],[3,"keyword",/^target(?![a-zA-Z¡-￿_0-9_\$])/,-1],[2,329,306,{name:"ArgList"},".",307,0,-1],[1,6,305],[1,6,308],[3,"property callee",t[36],306,3,"property",t[20],306],[3,"def",[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,361]],311,[5,363],310],[2,258,311,{name:"ParamList"}],[1,6,312],[2,366,-1,{name:"ArrowRest"}],["[",314],[1,6,315],[1,369,316],[1,6,317],["]",-1],["{",319],[1,6,320],[1,375,321],[1,6,322],["}",-1],["(",324],[1,6,325],[1,133,326],[1,6,327],[")",-1],[3,"keyword",t[21],-1],["(",330],[1,6,331],[1,369,332],[1,6,333],[")",-1],[1,381,335,0,335,0,-1],[1,6,336],[",",337,0,-1],[1,6,338],[1,381,339,0,339,0,339],[1,6,336],[1,386,341,0,-1],[1,6,342],[",",343,0,-1],[1,6,344],[1,386,345,0,345],[1,6,342],[1,381,347,0,-1],[1,6,348],[",",349,0,-1],[1,6,350],[1,381,351,0,351],[1,6,348],[2,7,353,{name:"Statement"}],[1,6,354],[3,"keyword",/^of(?![a-zA-Z¡-￿_0-9_\$])/,355,0,-1],[1,6,356],[1,133,-1],[3,"type","{",358,3,"type",/^(?:(?!\{|\}|\*\/).)+/,357,"\n",359,0,-1],[2,357,360,{name:"doccomment.type"}],[/^[\t ]*(?:\*(?!\/)[\t ]*)?/,357],[/^(?=\*\/)/,357,3,"type","}",357],[1,6,362],["=>",-1],[2,258,364,{name:"ParamList"}],[1,6,365],["=>",-1],[3,"operator","=>",367],[1,6,368],[2,129,-1,{name:"Block"},1,142,-1],[1,142,370,0,-1],[1,6,371],[",",372,0,-1],[1,6,373],[1,142,374,0,374],[1,6,371],[2,274,376,{name:"ObjectMember"},0,-1],[1,6,377],[",",378,0,-1],[1,6,379],[2,274,380,{name:"ObjectMember"},0,380],[1,6,377],[1,139,382],[1,6,383],[3,"operator","=",384,0,-1],[1,6,385],[1,142,-1],[3,"def",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?![a-z]|[A-Z]|[¡-￿]|_|[0-9]|_|\$| *\:)/,387,3,"property",t[20],391,3,"number",t[31],391,2,116,391,{name:"string",token:"string"},3,"operator","...",395],[1,6,388],[3,"operator","=",389,0,-1],[1,6,390],[1,142,-1],[1,6,392],[":",393],[1,6,394],[1,381,-1],[1,6,396],[1,381,-1]],start:0,token:5}),o=/(^|\s)variable($|\s)/;function n(e){var t=/^(if|for|do|while|try)\b/.exec(e.startLine.slice(e.startPos));return t&&t[1]}var i={Block:"}",BlockOf:"}",ClassBody:"}",AnnotationTypeBody:"}",ObjectLiteral:"}",ObjectPattern:"}",EnumBody:"}",LambdaBlock:"}",WhenBody:"}",ObjType:"}",ArrayInitializer:"}",NamespaceBlock:"}",BraceTokens:"}",ArrayLiteral:"]",BracketTokens:"]",TupleType:"]",ParamList:")",SimpleParamList:")",ArgList:")",ParenExpr:")",CondExpr:")",ForSpec:")",ParenTokens:")",ParenthesizedExpression:")",ConstructorParamList:")",TypeParams:">",TypeArgs:">",TemplateArgs:">",TemplateParams:">"},a=["Block","NamespaceBlock","ClassBody","AnnotationTypeBody","BlockOf","EnumBody"],l=["Statement","ObjectMember","ClassItem","EnumConstant","AnnotationTypeItem","ArgExpr","StatementMaybeOf","NewExpr"];function c(t,r){for(var o=t.startLine;;t=t.parent){if("CondExpr"==t.name)return e.countColumn(t.startLine,t.startPos+1,r.tabSize);if(l.indexOf(t.name)>-1&&/(^\s*|[\(\{\[])$/.test(t.startLine.slice(0,t.startPos)))return e.countColumn(t.startLine,t.startPos,r.tabSize);if(!t.parent||t.parent.startLine!=o)return e.countColumn(t.startLine,null,r.tabSize)}}function s(t,r,o){if(!t)return 0;if("string"==t.name||"comment"==t.name)return e.Pass;var u,p,g=i[t.name],h=r&&r.charAt(0)==g;if(g&&!1!==o.align&&function(e){return!/^\s*((\/\/.*)?$|.*=>)/.test(e.startLine.slice(e.startPos+1))}(t))return e.countColumn(t.startLine,t.startPos,o.tabSize)+(h?0:1);if(g&&a.indexOf(t.name)>-1){var f=t.parent;f&&"Statement"==f.name&&f.parent&&"Statement"==f.parent.name&&n(f.parent)&&!n(f)&&(f=f.parent);var m=d(f,o);return h||"NamespaceBlock"==t.name?m:/^(public|private|protected)\s*:/.test(r)?m+1:!(p=t.parent)||"Statement"!=p.name||!/^switch\b/.test(p.startLine.slice(p.startPos))||(u=r)&&/^\s*(case|default)\b/.test(u)?m+o.indentUnit:m+2*o.indentUnit}var y=c(t,o.tabSize);return g?h&&(o.dontCloseBrackets||"").indexOf(g)<0?y:y+o.indentUnit*((o.doubleIndentBrackets||"").indexOf(g)<0?1:2):l.indexOf(t.name)>-1?n(t)?y+o.indentUnit:y+2*o.indentUnit:"Alternative"==t.name||"CatchFinally"==t.name?(y=c(t.parent,o.tabSize),!r||/^((else|catch|finally)\b|\/[\/\*])/.test(r)?y:y+o.indentUnit):"ArrowRest"==t.name?y+o.indentUnit:"NewExpression"==t.name&&t.startLine.length>t.startPos+5?e.countColumn(t.startLine,t.startPos,o.tabSize)+2*o.indentUnit:"InitializerList"==t.name?y+2:"ThrowsClause"!=t.name||/throws\s*$/.test(t.startLine.slice(t.startPos))?s(t.parent,r,o):y+2*o.indentUnit}function d(t,r){for(;;t=t.parent){if(!t)return 0;if(l.indexOf(t.name)>-1||t.parent&&i[t.parent.name])return e.countColumn(t.startLine,null,r.tabSize)}}function u(t,r,o,n){var i=t.context&&t.context.name;if("DeclType"==i||"BeforeStatement"==i||"AnnotationHead"==i||"Template"==i||"str"==i)return d(t.context,n);if(("doccomment.braced"==i||"doccomment.tagGroup"==i)&&!/^[@*]/.test(r))return e.countColumn(t.context.startLine,null,n.tabSize)+2*n.indentUnit;var a=n.forceContent&&/^\s*(\/\/.*)?$/.test(o)?"x":o;return s(t.contextAt(a,o.length-r.length),r,n)}function p(e,t){for(var r=t-1;r>=0;r--){var o=e.charCodeAt(r);if(10===o)break;if(32!==o&&9!==o)return!1}return!0}var g=function(e){this.config=e};g.prototype.startState=function(){return new h},g.prototype.copyState=function(e){return e.copy()},g.prototype.shouldInterceptTokenizing=function(e){var t=e.currentTemplateState;return void 0!==t&&null!==t.mode},g.prototype.interceptTokenizing=function(e,t){if(e.match("${")&&(e.backUp(2),!this.isEscaped(e,e.pos-2)))return{handled:!1};if("`"===e.peek()&&!this.isEscaped(e,e.pos))return{handled:!1};var r=t.currentTemplateState,o=r.mode,n=r.state,i=o.token(e,n);return this.backupIfEmbeddedTokenizerOvershot(e),{handled:!0,style:i}},g.prototype.trackState=function(e,t,r){if(e){var o=r.currentTemplateState;o&&"inline-expression"!==o.kind?this.trackStateInTemplate(e,t,r,o):this.trackStateNotInTemplate(e,t,r,o),r.previousVariable="variable"===e?t.current():null}},g.prototype.trackStateNotInTemplate=function(e,t,r,o){if(o&&"string-2"===e&&t.current().startsWith("}"))return r.templateStack.pop(),void t.backUp(t.current().length-1);if("string-2"===e&&t.current().startsWith("`")){var n=this.getModeForTemplateTag(r.previousVariable),i="template";n?(t.backUp(t.current().length-1),r.templateStack.push(new m(i,n,CodeMirror.startState(n)))):r.templateStack.push(new m(i,null,null))}},g.prototype.trackStateInTemplate=function(e,t,r,o){"string-2"!==e||!t.current().endsWith("`")||this.isEscaped(t.pos-1)?"string-2"!==e||!t.current().endsWith("${")||this.isEscaped(t.pos-2)||r.templateStack.push(new m("inline-expression",null,null)):r.templateStack.pop()},g.prototype.backupIfEmbeddedTokenizerOvershot=function(e){for(var t=e.current(),r=0;;){var o=t.slice(r).search(/`|\$\{/);if(-1===o)return;o+=r;var n=t.length-o,i=e.pos-n;if(!this.isEscaped(e,i))return void e.backUp(t.length-o);r=o+1}},g.prototype.isEscaped=function(e,t){for(var r=!1,o=t;o>0&&"\\"===e.string[o-1];)r=!r,o--;return r},g.prototype.getModeForTemplateTag=function(e){if(!e)return null;"htm"===e&&(e="html");for(var t=["google-"+e,""+e],r=0;r<t.length;r++){var o=CodeMirror.getMode(this.config,t[r]);if(o&&"null"!==o.name)return o}return null};var h=function(e,t){void 0===e&&(e=[]),void 0===t&&(t=null),this.templateStack=e,this.previousVariable=t},f={currentTemplateState:{configurable:!0}};h.prototype.copy=function(){return new h(this.templateStack.map((function(e){return e.copy()})),this.previousVariable)},f.currentTemplateState.get=function(){return this.templateStack[this.templateStack.length-1]},Object.defineProperties(h.prototype,f);var m=function(e,t,r){this.kind=e,this.mode=t,this.state=r};m.prototype.copy=function(){return this.mode?new m(this.kind,this.mode,CodeMirror.copyState(this.mode,this.state)):new m(this.kind,null,null)};var y=["Block","FunctionDef","ArrowFunc","ForStatement"],b=function(e){function t(t,o){e.call(this,r,{predicates:{canInsertSemi:!1===o.requireSemicolons?p:function(){return!1}}}),this.embeddedParser=new g(t),this.indentConf={doubleIndentBrackets:">)",dontCloseBrackets:")",tabSize:t.tabSize,indentUnit:t.indentUnit,forceContent:!0}}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.startState=function(){var t=e.prototype.startState.call(this);return t.embeddedParserState=this.embeddedParser.startState(),t},t.prototype.copyState=function(t){var r=e.prototype.copyState.call(this,t);return r.embeddedParserState=this.embeddedParser.copyState(t.embeddedParserState),r},t.prototype.token=function(t,r){var n=r.embeddedParserState;if(this.embeddedParser.shouldInterceptTokenizing(n)){var i=this.embeddedParser.interceptTokenizing(t,n),a=i.handled,l=i.style;if(a)return l}var c=e.prototype.token.call(this,t,r);return this.embeddedParser.trackState(c,t,n),function(e,t,r,n){if("def"==e){var i=function(e,t){for(var r=e;r;r=r.parent)if(t.indexOf(r.name)>-1)return r}(n.context,t),a=r.current();if(i&&(i.locals||(i.locals=[]),-1==i.locals.indexOf(a)&&i.locals.push(a),"funcName"!=n.context.name))return"def local"}else o.test(e)&&!/qualified/.test(e)&&function(e,t){for(var r=e;r;r=r.parent)if(r.locals&&r.locals.indexOf(t)>-1)return!0;return!1}(n.context,r.current())&&(e=e.replace(o,"$1variable-2$2"));return e}(c,y,t,r)},t.prototype.indent=function(e,t,r){return t||(t=r="x"),u(e,t,r,this.indentConf)},t}(e.GrammarMode),v={electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``"};for(var w in v)b.prototype[w]=v[w];e.registerHelper("wordChars","google-javascript",/[\w$]/),e.defineMode("google-javascript",(function(e,t){return new b(e,t)}))}(window.CodeMirror),function(e){var t=[/^(?:var|let|const)(?![a-zA-Z¡-￿_0-9_\$])/,/^while(?![a-zA-Z¡-￿_0-9_\$])/,/^with(?![a-zA-Z¡-￿_0-9_\$])/,/^do(?![a-zA-Z¡-￿_0-9_\$])/,/^debugger(?![a-zA-Z¡-￿_0-9_\$])/,/^if(?![a-zA-Z¡-￿_0-9_\$])/,/^function(?![a-zA-Z¡-￿_0-9_\$])/,/^for(?![a-zA-Z¡-￿_0-9_\$])/,/^default(?![a-zA-Z¡-￿_0-9_\$])/,/^case(?![a-zA-Z¡-￿_0-9_\$])/,/^return(?![a-zA-Z¡-￿_0-9_\$])/,/^throw(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:break|continue)(?![a-zA-Z¡-￿_0-9_\$])/,/^switch(?![a-zA-Z¡-￿_0-9_\$])/,/^try(?![a-zA-Z¡-￿_0-9_\$])/,/^class(?![a-zA-Z¡-￿_0-9_\$])/,/^export(?![a-zA-Z¡-￿_0-9_\$])/,/^import(?![a-zA-Z¡-￿_0-9_\$])/,[0,"async",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,139]],/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*/,/^extends(?![a-zA-Z¡-￿_0-9_\$])/,/^enum(?![a-zA-Z¡-￿_0-9_\$])/,[1,";",/^(?=\})/,[7,"canInsertSemi"]],/^from(?![a-zA-Z¡-￿_0-9_\$])/,[1,"\n","\t"," "],/^[a-zA-Z¡-￿__\$]/,/^const(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:true|false|null|undefined|NaN|Infinity)(?![a-zA-Z¡-￿_0-9_\$])/,/^new(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:[0-9][0-9_]*(?:\.[0-9_]*)?|\.[0-9_]+)(?:[eE][\+\-]?[0-9_]+)?)/,/^else(?![a-zA-Z¡-￿_0-9_\$])/,/^catch(?![a-zA-Z¡-￿_0-9_\$])/,/^finally(?![a-zA-Z¡-￿_0-9_\$])/,/^as(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:super|this)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:delete|typeof|yield|await|void)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.|\!|\+\+?|\-\-?)/,/^\/(?![\/\*])(?:\\.|\[(?:(?!\]).)*\]|(?!\/).)+\/[gimyus]*/,[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,508]],/^(?:\+\+|\-\-)/,/^(?:(?:\+|\-|\%|\*|\/(?![\/\*])|\>\>?\>?|\<\<?|\=\=?|\&\&?|\|\|?|\^|\!\=)\=?|\?\?)/,/^(?:in|instanceof)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:public|private|protected|readonly|abstract|static)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.|\?\.)/,[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,533]],/^is(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.)?/,/^(?:get|set|async)(?![a-zA-Z¡-￿_0-9_\$])(?! *[\,\}\:\(\<])/],r=Object.freeze({nodes:[[1,6,2],[/^[^]/,0],[1,6,3],[2,7,4,{name:"Statement"},0,1],[1,6,3],[3,"keyword",t[0],-1,3,"keyword",t[1],-1,3,"keyword",t[2],-1,3,"keyword",t[30],-1,3,"keyword",t[3],-1,3,"keyword",t[14],-1,3,"keyword",t[32],-1,3,"keyword",t[10],-1,3,"keyword",t[11],-1,3,"keyword",t[12],-1,3,"keyword",t[4],-1,3,"keyword",t[9],-1,3,"keyword",t[8],-1,3,"keyword",t[6],-1,3,"keyword",t[5],-1,3,"keyword",t[31],-1,3,"keyword",t[7],-1,3,"keyword",t[13],-1,3,"keyword",t[15],-1,3,"keyword",t[16],-1,3,"keyword",t[17],-1,3,"keyword",t[20],-1,3,"keyword",t[18],-1,3,"keyword",t[28],-1,3,"keyword",t[41],-1,3,"keyword",t[35],-1,3,"keyword",t[34],-1,3,"atom",t[27],-1,3,"variable",t[19],-1,3,"operator",t[36],-1,3,"operator",t[40],-1,3,"operator",t[39],-1,2,141,-1,{name:"string",token:"string"},3,"number",t[29],-1,2,146,-1,{name:"comment",token:"comment"},3,"string-2",t[37],-1,1,150,-1,/^[^]/,-1],[t[24],6,2,146,6,{name:"comment",token:"comment"},0,-1],[3,"keyword",[0,"type",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,154]],8,3,"keyword",[0,"namespace",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,155]],18,3,"keyword",[0,"interface",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,156]],26,[5,157],36,3,"keyword",t[21],37,3,"keyword",[0,"declare",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,160]],43,3,"keyword",/^abstract(?![a-zA-Z¡-￿_0-9_\$])/,43,3,"keyword",t[0],45,3,"keyword",t[1],52,3,"keyword",t[2],52,3,"keyword",t[3],56,2,161,-1,{name:"Block"},";",-1,3,"keyword",t[4],-1,3,"keyword",t[5],64,3,"keyword",t[6],69,3,"keyword",t[7],75,3,"keyword",t[8],77,/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\:)/,77,3,"keyword",t[9],78,3,"keyword",t[10],81,3,"keyword",t[11],85,3,"keyword",t[12],89,3,"keyword",t[13],93,3,"keyword",t[14],97,3,"keyword",t[15],101,3,"keyword",t[16],105,3,"keyword",t[17],117,3,"keyword",t[18],133,"@",135,1,165,137],[1,6,9],[3,"def type",t[19],10],[1,6,11],[2,171,12,{name:"TypeParams"},0,12],[1,6,13],[3,"operator","=",14],[1,6,15],[1,176,16],[1,6,17],[t[22],-1],[1,6,19],[[5,224],20,3,"def",t[19],21],[3,"variable",t[19],22],[1,6,23],[1,6,24],[2,161,-1,{name:"Block"}],[".",25],[1,6,19],[1,6,27],[3,"def type",t[19],28],[1,6,29],[2,171,30,{name:"TypeParams"},0,30],[1,6,31],[3,"keyword",t[20],32,0,33],[1,6,34],[1,6,35],[1,227,33],[2,233,-1,{name:"ObjType"}],[3,"keyword",t[26],38],[1,6,39],[1,6,40],[3,"def type",t[19],41],[3,"keyword",t[21],37],[1,6,42],[2,241,-1,{name:"EnumBody"}],[1,6,44],[2,7,-1,{name:"Statement"}],[1,6,46],[1,246,47],[1,6,48],[",",49,t[22],-1],[1,6,50],[1,246,51],[1,6,48],[1,6,53],[2,257,54,{name:"CondExpr"}],[1,6,55],[2,7,-1,{name:"Statement"}],[1,6,57],[2,7,58,{name:"Statement"}],[1,6,59],[3,"keyword",t[1],60,0,-1],[1,6,61],[2,257,62,{name:"CondExpr"}],[1,6,63],[t[22],-1],[1,6,65],[2,257,66,{name:"CondExpr"}],[1,6,67],[2,7,68,{name:"Statement"}],[2,262,-1,{name:"Alternative"}],[1,6,70],[3,"keyword","*",71,0,71],[1,6,72],[3,"def",t[19],73],[1,6,74],[2,266,-1,{name:"FunctionDef"}],[1,6,76],[2,275,-1,{name:"ForStatement"}],[1,6,79],[1,6,80],[":",-1],[1,165,77],[1,6,82],[t[22],-1,1,165,83],[1,6,84],[t[22],-1],[1,6,86],[1,165,87],[1,6,88],[t[22],-1],[1,6,90],[/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*)?/,91],[1,6,92],[t[22],-1],[1,6,94],[2,257,95,{name:"CondExpr"}],[1,6,96],[2,161,-1,{name:"Block"}],[1,6,98],[2,161,99,{name:"Block"}],[1,6,100],[2,278,-1,{name:"CatchFinally"}],[1,6,102],[3,"def type",t[19],103],[1,6,104],[1,291,-1],[1,6,106],["*",107,3,"keyword",t[8],107,"{",108,2,7,-1,{name:"Statement"}],[1,6,109],[1,6,110],[3,"keyword",t[23],111,0,112],[1,302,113],[1,6,114],[1,6,115],[1,6,116],[2,141,112,{name:"string",token:"string"}],[t[22],-1],["}",107],[1,6,118],[2,141,119,{name:"string",token:"string"},3,"keyword","*",120,1,308,121,"{",122],[1,6,123],[1,6,124],[1,6,125],[1,6,126],[t[22],-1],[3,"keyword",t[33],127,0,121],[3,"keyword",t[23],128,0,119],[1,302,129],[1,6,130],[1,6,131],[1,6,132],[3,"def",t[19],121],[2,141,119,{name:"string",token:"string"}],["}",121],[1,6,134],[2,7,-1,{name:"Statement"}],[1,6,136],[1,165,-1],[1,6,138],[t[22],-1],[1,6,140],[3,"keyword",t[6],-1,/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*|\()/,-1],["'",142,'"',144],["\\",143,/^(?!\')./,142,"'",-1],[/^[^]/,142],["\\",145,/^(?!\")./,144,'"',-1],[/^[^]/,144],[/^\/\*\*(?!\/)/,147,"/*",149,/^\/\/.*/,-1],[1,313,147,0,148],[2,316,148,{name:"doccomment.tagGroup"},"*/",-1],[[0,/^(?!\*\/)/,/^[^]/],149,"*/",-1],[3,"string-2","`",151],[3,"string-2","${",152,2,318,151,{name:"str2",token:"string-2"},3,"string-2",/^(?:(?!\`|\$\{|\\).)+/,151,3,"string-2","`",-1],[1,165,153],[3,"string-2","}",151],[t[24],154,t[25],-1],[t[24],155,t[25],-1],[t[24],156,t[25],-1],[3,"keyword",t[26],158],[1,6,159],[3,"keyword",t[21],-1],[t[24],160,t[25],-1],["{",162],[1,6,163],[2,7,164,{name:"Statement"},"}",-1],[1,6,163],[1,320,166],[1,6,167],[",",168,1,348,169,0,-1],[1,6,170],[1,6,167],[1,367,169],["<",172],[1,6,173],[1,371,174],[1,6,175],[">",-1],[3,"keyword",/^this(?![a-zA-Z¡-￿_0-9_\$])/,209,3,"atom",t[27],209,3,"keyword",/^typeof(?![a-zA-Z¡-￿_0-9_\$])/,177,3,"keyword",/^(?:keyof|readonly|unique)(?![a-zA-Z¡-￿_0-9_\$])/,178,[0,[5,393],"("],179,3,"keyword",t[28],180,0,180,0,181,2,396,209,{name:"TupleType"},2,233,209,{name:"ObjType"},2,141,209,{name:"string",token:"string"},3,"number",t[29],209],[1,6,182],[1,6,183],[1,6,184],[1,6,185],[[5,401],186,3,"type",t[19],187],[3,"variable",t[19],188],[1,176,209],[1,176,189],[2,171,190,{name:"TypeParams"},0,190],[3,"variable",t[19],191],[1,6,192],[1,6,193],[1,6,194],[1,6,195],[1,6,196],[2,404,209,{name:"TypeArgs"},0,209],[".",197,"[",198,0,209],[")",209],[2,409,199,{name:"ParamListSpec"}],[".",200],[1,6,201],[1,6,202],[1,6,203],[1,6,181],[3,"property",t[19],204],[1,165,205],[3,"operator","=>",206],[1,6,193],[1,6,207],[1,6,208],["]",204],[1,410,209],[1,6,210],[3,"operator",/^[\&\|]/,211,3,"keyword",/^(?:extends|implements)(?![a-zA-Z¡-￿_0-9_\$])/,211,"[",212,3,"operator","?",213,0,-1],[1,6,214],[1,6,215],[1,6,216],[1,176,217],[1,176,218,0,218],[1,176,219],[1,6,210],[1,6,220],[1,6,221],["]",217],[3,"operator",":",222],[1,6,223],[1,176,217],[t[19],225],[1,6,226],[".",-1],[1,176,228,0,-1],[1,6,229],[",",230,0,-1],[1,6,231],[1,176,232,0,232],[1,6,229],["{",234],[1,6,235],[1,416,236,0,236],[1,6,237],[/^[\,\;]/,238,"}",-1],[1,6,239],[1,416,240,0,240],[1,6,237],["{",242],[1,6,243],[1,449,244],[1,6,245],["}",-1],[1,463,247],[1,6,248],[3,"operator","!",249,0,249],[1,6,250],[":",251,0,253],[1,6,252],[1,176,253],[1,6,254],[3,"operator","=",255,0,-1],[1,6,256],[1,367,-1],["(",258],[1,6,259],[1,165,260],[1,6,261],[")",-1],[1,6,263],[3,"keyword",t[30],264,0,-1],[1,6,265],[2,7,-1,{name:"Statement"}],[2,171,267,{name:"TypeParams"},0,267],[1,6,268],[2,466,269,{name:"ParamList"}],[1,6,270],[":",271,0,273],[1,6,272],[1,410,273],[1,6,274],[2,161,-1,{name:"Block"},t[22],-1],[2,471,276,{name:"ForSpec"}],[1,6,277],[2,7,-1,{name:"Statement"}],[3,"keyword",t[31],279,0,287],[1,6,280],["(",281,0,282],[1,6,283],[1,6,284],[1,463,285],[2,161,287,{name:"Block"}],[1,6,286],[")",282],[1,6,288],[3,"keyword",t[32],289,0,-1],[1,6,290],[2,161,-1,{name:"Block"}],[2,171,292,{name:"TypeParams"},0,292],[1,6,293],[3,"keyword",t[20],294,0,296],[1,6,295],[1,176,296],[1,6,297],[3,"keyword",/^implements(?![a-zA-Z¡-￿_0-9_\$])/,298,0,300],[1,6,299],[1,227,300],[1,6,301],[2,482,-1,{name:"ClassBody"}],[1,308,303,0,-1],[1,6,304],[",",305,0,-1],[1,6,306],[1,308,307,0,307],[1,6,304],[3,"variable",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= +as)/,309,3,"def",t[19],-1],[1,6,310],[3,"keyword",t[33],311],[1,6,312],[3,"def",t[19],-1],[0,314,2,490,-1,{name:"doccomment.braced"}],[[0,/^(?!\*\/|\@[a-zA-Z¡-￿_0-9]|\{)/,/^[^]/],315],[0,314,0,-1],[1,494,317],[1,313,317,0,-1],["\\",319,"\n",-1],[/^[^]/,-1],["<",321,3,"atom",t[27],-1,3,"keyword",t[34],-1,3,"keyword",t[35],327,3,"operator",t[36],327,3,"keyword",t[18],327,3,"keyword",t[28],329,3,"keyword",t[6],335,3,"keyword",t[15],341,2,500,-1,{name:"ArrowFunc"},3,"variable callee",t[38],346,3,"variable",t[19],-1,3,"number",t[29],-1,2,141,-1,{name:"string",token:"string"},3,"string-2",t[37],-1,1,150,-1,2,512,-1,{name:"ArrayLiteral"},2,517,-1,{name:"ObjectLiteral"},2,522,-1,{name:"ParenExpr"}],[1,6,322],[1,176,323],[1,6,324],[">",325],[1,6,326],[1,320,-1],[1,6,328],[1,320,-1],[1,6,330],[".",331,3,"variable callee",t[38],332,1,320,-1],[1,6,333],[1,6,334],[3,"keyword",/^target(?![a-zA-Z¡-￿_0-9_\$])/,-1],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,336],[3,"keyword","*",337,0,337],[1,6,338],[3,"def",t[19],339,0,339],[1,6,340],[2,266,-1,{name:"FunctionDef"}],[1,6,342],[[6,527],343,0,344],[3,"def type",t[19],344],[1,6,345],[1,291,-1],[1,6,347],[2,404,-1,{name:"TypeArgs"},0,-1],[3,"keyword",t[33],349,3,"operator","!",-1,3,"operator",t[39],-1,3,"operator",t[40],351,3,"keyword",t[41],351,2,528,-1,{name:"ArgList"},1,150,-1,t[43],353,"[",357,3,"operator","?",361],[1,6,350],[1,176,-1],[1,6,352],[1,165,-1],[1,6,354],[3,"property callee",t[44],355,3,"property",t[19],-1],[1,6,356],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,358],[1,165,359],[1,6,360],["]",-1],[1,6,362],[1,165,363],[1,6,364],[3,"operator",":",365],[1,6,366],[1,165,-1],[1,320,368],[1,6,369],[1,537,370,0,-1],[1,6,369],[3,"def type",t[19],372,0,-1],[1,6,373],[3,"keyword",t[20],374,0,375],[1,6,376],[1,6,377],[1,176,375],[3,"operator","=",378,0,379],[1,6,380],[1,6,381],[1,176,379],[",",382,0,-1],[1,6,383],[3,"def type",t[19],384,0,385],[1,6,386],[1,6,381],[3,"keyword",t[20],387,0,388],[1,6,389],[1,6,390],[1,176,388],[3,"operator","=",391,0,385],[1,6,392],[1,176,385],["(",394],[1,6,395],[[6,556],-1],["[",397],[1,6,398],[1,227,399],[1,6,400],["]",-1],[t[19],402],[1,6,403],[".",-1],["<",405],[1,6,406],[1,227,407],[1,6,408],[">",-1],[2,466,-1,{name:"ParamList"}],[[5,559],411,0,414],[3,"variable",t[19],412],[1,6,413],[3,"keyword",t[45],414],[1,6,415],[1,176,-1],[3,"keyword",t[28],417,0,417,0,425],[1,6,418],[2,171,419,{name:"TypeParams"},0,419],[1,6,420],[2,466,421,{name:"ParamList"}],[1,6,422],[":",423,0,-1],[1,6,424],[1,410,-1],[3,"keyword",t[42],426,"[",427,3,"def property",t[19],428,2,141,428,{name:"string",token:"string"},3,"number",t[29],428],[1,6,425],[1,6,429],[1,6,430],[[0,[5,562],/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/],431,1,165,432],[/^\??/,433],[1,6,434],[1,6,435],[1,6,436],[":",437,3,"keyword",/^in(?![a-zA-Z¡-￿_0-9_\$])/,437],["]",438],[2,171,439,{name:"TypeParams"},0,439,0,440],[1,6,441],[1,6,442],[1,6,443],[1,6,444],[1,176,432],[":",445],[2,466,440,{name:"ParamList"}],[":",446,0,-1],[1,6,447],[1,6,448],[1,176,-1],[1,410,-1],[3,"def property",t[19],450,0,-1],[1,6,451],[3,"operator","=",452,0,453],[1,6,454],[1,6,455],[1,367,453],[",",456,0,-1],[1,6,457],[3,"def property",t[19],458,0,459],[1,6,460],[1,6,455],[3,"operator","=",461,0,459],[1,6,462],[1,367,459],[3,"operator","...",464,0,464],[1,6,465],[3,"def",t[19],-1,2,565,-1,{name:"ArrayPattern"},2,570,-1,{name:"ObjectPattern"}],["(",467],[1,6,468],[1,575,469],[1,6,470],[")",-1],["(",472],[1,6,473],[2,615,474,{name:"StatementMaybeOf"}],[1,6,475],[1,165,476,0,476,0,480],[1,6,477],[";",478],[1,6,479],[1,165,480,0,480],[1,6,481],[")",-1],["{",483],[1,6,484],[0,485,"@",486,"}",-1],[3,"keyword",t[42],487,2,620,488,{name:"ClassItem"}],[1,6,489],[1,6,485],[1,6,484],[1,165,488],["{",491],[1,494,492,1,313,493],[[0,/^(?!\}|\*\/)/,/^[^]/],492,0,493],[/^(?:\}|(?=\*\/))/,-1],[3,"tag",/^\@(?:member|param|arg(?:ument)?|module|namespace|typedef)(?![a-zA-Z¡-￿_0-9])/,495,3,"tag",/^\@[a-zA-Z¡-￿_0-9]+/,-1],[t[24],495,"{",496,0,497,0,-1],[2,641,498,{name:"doccomment.type"}],[3,"def",/^[a-zA-Z¡-￿_0-9]+/,-1,0,-1],["}",499],[[1,"\n","\t"," ",/^\*(?!\/)/],499,0,497],[3,"def",[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,645]],506,[5,651],501],[2,466,502,{name:"ParamList"}],[1,6,503],[":",504,0,506],[1,6,505],[1,410,506],[1,6,507],[2,658,-1,{name:"ArrowRest"}],[/^\<(?! )/,-1,/^ */,509],[1,663,510,0,511],[/^ */,511],["(",-1],["[",513],[1,6,514],[1,665,515],[1,6,516],["]",-1],["{",518],[1,6,519],[1,671,520],[1,6,521],["}",-1],["(",523],[1,6,524],[1,165,525],[1,6,526],[")",-1],[3,"keyword",t[20],-1],["(",529],[1,6,530],[1,665,531],[1,6,532],[")",-1],[/^ */,534],[1,663,535,0,536],[/^ */,536],["(",-1],[3,"keyword",t[33],538,3,"operator","!",-1,3,"operator",t[39],-1,3,"operator",t[40],540,3,"keyword",t[41],540,2,528,-1,{name:"ArgList"},1,150,-1,t[43],542,"[",546,3,"operator","?",550],[1,6,539],[1,176,-1],[1,6,541],[1,367,-1],[1,6,543],[3,"property callee",t[44],544,3,"property",t[19],-1],[1,6,545],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,547],[1,165,548],[1,6,549],["]",-1],[1,6,551],[1,165,552],[1,6,553],[3,"operator",":",554],[1,6,555],[1,367,-1],[/^(?:\)|\.\.\.)/,-1,t[19],557],[1,6,558],[/^[\?\:]/,-1],[t[19],560],[1,6,561],[3,"keyword",t[45],-1],[t[19],563],[1,6,564],[/^(?:\:|in)/,-1],["[",566],[1,6,567],[1,677,568],[1,6,569],["]",-1],["{",571],[1,6,572],[1,683,573],[1,6,574],["}",-1],["@",576,0,577,0,-1],[1,6,578],[3,"keyword",t[42],579,t[46],580],[1,165,581],[1,6,577],[1,6,582],[1,6,575],[1,463,583],[1,6,584],[/^\??/,585],[1,6,586],[":",587,0,588],[1,6,589],[1,6,590],[1,176,588],[3,"operator","=",591,0,592],[1,6,593],[1,6,594],[1,367,592],[",",595,0,-1],[1,6,596],["@",597,0,598,0,599],[1,6,600],[3,"keyword",t[42],601,t[46],602],[1,6,594],[1,165,603],[1,6,598],[1,6,604],[1,6,596],[1,463,605],[1,6,606],[/^\??/,607],[1,6,608],[":",609,0,610],[1,6,611],[1,6,612],[1,176,610],[3,"operator","=",613,0,599],[1,6,614],[1,367,599],[2,7,616,{name:"Statement"}],[1,6,617],[3,"keyword",/^of(?![a-zA-Z¡-￿_0-9_\$])/,618,0,-1],[1,6,619],[1,165,-1],[3,"keyword",t[47],621,0,621],[1,6,622],[3,"def property",t[19],627,"[",623,3,"number",t[29],627,2,141,627,{name:"string",token:"string"}],[1,6,624],[1,165,625],[1,6,626],["]",627],[1,6,628],[3,"keyword","*",629,0,629,/^[\!\?]?/,630],[1,6,631],[1,6,632],[2,266,-1,{name:"FunctionDef"}],[":",633,0,634],[1,6,635],[1,6,636],[1,176,634],[3,"operator","=",637,0,638],[1,6,639],[1,6,640],[1,165,638],[t[22],-1],[3,"type","{",642,3,"type",/^(?:(?!\{|\}|\*\/).)+/,641,"\n",643,0,-1],[2,641,644,{name:"doccomment.type"}],[/^[\t ]*(?:\*(?!\/)[\t ]*)?/,641],[/^(?=\*\/)/,641,3,"type","}",641],[1,6,646],[":",647,0,650],[1,6,648],[1,176,649],[1,6,650],["=>",-1],[2,466,652,{name:"ParamList"}],[1,6,653],[":",654,0,656],[1,6,655],[1,410,656],[1,6,657],["=>",-1],[3,"operator","=>",659],[1,6,660],[2,171,661,{name:"TypeParams"},0,661],[1,6,662],[2,161,-1,{name:"Block"},1,367,-1],["<",664],[1,663,664,[1,"=>",[0,/^(?!\>)/,/^[^]/]],664,">",-1],[1,367,666,0,-1],[1,6,667],[",",668,0,-1],[1,6,669],[1,367,670,0,670],[1,6,667],[2,689,672,{name:"ObjectMember"},0,-1],[1,6,673],[",",674,0,-1],[1,6,675],[2,689,676,{name:"ObjectMember"},0,676],[1,6,673],[1,704,678,0,678,0,-1],[1,6,679],[",",680,0,-1],[1,6,681],[1,704,682,0,682,0,682],[1,6,679],[1,709,684,0,-1],[1,6,685],[",",686,0,-1],[1,6,687],[1,709,688,0,688],[1,6,685],[3,"keyword",t[47],690,0,690],[1,6,691],[3,"keyword","*",692,0,692],[1,6,693],[3,"def property",t[19],694,"[",695,3,"number",t[29],694,2,141,694,{name:"string",token:"string"},3,"operator","...",696],[1,6,697],[1,6,698],[1,6,699],[2,266,-1,{name:"FunctionDef"},":",700,0,-1],[1,165,701],[1,367,-1],[1,6,702],[1,6,703],[1,367,-1],["]",694],[1,463,705],[1,6,706],[3,"operator","=",707,0,-1],[1,6,708],[1,367,-1],[3,"def",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?![a-z]|[A-Z]|[¡-￿]|_|[0-9]|_|\$| *\:)/,710,3,"property",t[19],714,3,"number",t[29],714,2,141,714,{name:"string",token:"string"},3,"operator","...",718],[1,6,711],[3,"operator","=",712,0,-1],[1,6,713],[1,367,-1],[1,6,715],[":",716],[1,6,717],[1,704,-1],[1,6,719],[1,704,-1]],start:0,token:5}),o=/(^|\s)variable($|\s)/;function n(e){var t=/^(if|for|do|while|try)\b/.exec(e.startLine.slice(e.startPos));return t&&t[1]}var i={Block:"}",BlockOf:"}",ClassBody:"}",AnnotationTypeBody:"}",ObjectLiteral:"}",ObjectPattern:"}",EnumBody:"}",LambdaBlock:"}",WhenBody:"}",ObjType:"}",ArrayInitializer:"}",NamespaceBlock:"}",BraceTokens:"}",ArrayLiteral:"]",BracketTokens:"]",TupleType:"]",ParamList:")",SimpleParamList:")",ArgList:")",ParenExpr:")",CondExpr:")",ForSpec:")",ParenTokens:")",ParenthesizedExpression:")",ConstructorParamList:")",TypeParams:">",TypeArgs:">",TemplateArgs:">",TemplateParams:">"},a=["Block","NamespaceBlock","ClassBody","AnnotationTypeBody","BlockOf","EnumBody"],l=["Statement","ObjectMember","ClassItem","EnumConstant","AnnotationTypeItem","ArgExpr","StatementMaybeOf","NewExpr"];function c(t,r){for(var o=t.startLine;;t=t.parent){if("CondExpr"==t.name)return e.countColumn(t.startLine,t.startPos+1,r.tabSize);if(l.indexOf(t.name)>-1&&/(^\s*|[\(\{\[])$/.test(t.startLine.slice(0,t.startPos)))return e.countColumn(t.startLine,t.startPos,r.tabSize);if(!t.parent||t.parent.startLine!=o)return e.countColumn(t.startLine,null,r.tabSize)}}function s(t,r,o){if(!t)return 0;if("string"==t.name||"comment"==t.name)return e.Pass;var u,p,g=i[t.name],h=r&&r.charAt(0)==g;if(g&&!1!==o.align&&function(e){return!/^\s*((\/\/.*)?$|.*=>)/.test(e.startLine.slice(e.startPos+1))}(t))return e.countColumn(t.startLine,t.startPos,o.tabSize)+(h?0:1);if(g&&a.indexOf(t.name)>-1){var f=t.parent;f&&"Statement"==f.name&&f.parent&&"Statement"==f.parent.name&&n(f.parent)&&!n(f)&&(f=f.parent);var m=d(f,o);return h||"NamespaceBlock"==t.name?m:/^(public|private|protected)\s*:/.test(r)?m+1:!(p=t.parent)||"Statement"!=p.name||!/^switch\b/.test(p.startLine.slice(p.startPos))||(u=r)&&/^\s*(case|default)\b/.test(u)?m+o.indentUnit:m+2*o.indentUnit}var y=c(t,o.tabSize);return g?h&&(o.dontCloseBrackets||"").indexOf(g)<0?y:y+o.indentUnit*((o.doubleIndentBrackets||"").indexOf(g)<0?1:2):l.indexOf(t.name)>-1?n(t)?y+o.indentUnit:y+2*o.indentUnit:"Alternative"==t.name||"CatchFinally"==t.name?(y=c(t.parent,o.tabSize),!r||/^((else|catch|finally)\b|\/[\/\*])/.test(r)?y:y+o.indentUnit):"ArrowRest"==t.name?y+o.indentUnit:"NewExpression"==t.name&&t.startLine.length>t.startPos+5?e.countColumn(t.startLine,t.startPos,o.tabSize)+2*o.indentUnit:"InitializerList"==t.name?y+2:"ThrowsClause"!=t.name||/throws\s*$/.test(t.startLine.slice(t.startPos))?s(t.parent,r,o):y+2*o.indentUnit}function d(t,r){for(;;t=t.parent){if(!t)return 0;if(l.indexOf(t.name)>-1||t.parent&&i[t.parent.name])return e.countColumn(t.startLine,null,r.tabSize)}}function u(t,r,o,n){var i=t.context&&t.context.name;if("DeclType"==i||"BeforeStatement"==i||"AnnotationHead"==i||"Template"==i||"str"==i)return d(t.context,n);if(("doccomment.braced"==i||"doccomment.tagGroup"==i)&&!/^[@*]/.test(r))return e.countColumn(t.context.startLine,null,n.tabSize)+2*n.indentUnit;var a=n.forceContent&&/^\s*(\/\/.*)?$/.test(o)?"x":o;return s(t.contextAt(a,o.length-r.length),r,n)}function p(e,t){for(var r=t-1;r>=0;r--){var o=e.charCodeAt(r);if(10===o)break;if(32!==o&&9!==o)return!1}return!0}var g=function(e){this.config=e};g.prototype.startState=function(){return new h},g.prototype.copyState=function(e){return e.copy()},g.prototype.shouldInterceptTokenizing=function(e){var t=e.currentTemplateState;return void 0!==t&&null!==t.mode},g.prototype.interceptTokenizing=function(e,t){if(e.match("${")&&(e.backUp(2),!this.isEscaped(e,e.pos-2)))return{handled:!1};if("`"===e.peek()&&!this.isEscaped(e,e.pos))return{handled:!1};var r=t.currentTemplateState,o=r.mode,n=r.state,i=o.token(e,n);return this.backupIfEmbeddedTokenizerOvershot(e),{handled:!0,style:i}},g.prototype.trackState=function(e,t,r){if(e){var o=r.currentTemplateState;o&&"inline-expression"!==o.kind?this.trackStateInTemplate(e,t,r,o):this.trackStateNotInTemplate(e,t,r,o),r.previousVariable="variable"===e?t.current():null}},g.prototype.trackStateNotInTemplate=function(e,t,r,o){if(o&&"string-2"===e&&t.current().startsWith("}"))return r.templateStack.pop(),void t.backUp(t.current().length-1);if("string-2"===e&&t.current().startsWith("`")){var n=this.getModeForTemplateTag(r.previousVariable),i="template";n?(t.backUp(t.current().length-1),r.templateStack.push(new m(i,n,CodeMirror.startState(n)))):r.templateStack.push(new m(i,null,null))}},g.prototype.trackStateInTemplate=function(e,t,r,o){"string-2"!==e||!t.current().endsWith("`")||this.isEscaped(t.pos-1)?"string-2"!==e||!t.current().endsWith("${")||this.isEscaped(t.pos-2)||r.templateStack.push(new m("inline-expression",null,null)):r.templateStack.pop()},g.prototype.backupIfEmbeddedTokenizerOvershot=function(e){for(var t=e.current(),r=0;;){var o=t.slice(r).search(/`|\$\{/);if(-1===o)return;o+=r;var n=t.length-o,i=e.pos-n;if(!this.isEscaped(e,i))return void e.backUp(t.length-o);r=o+1}},g.prototype.isEscaped=function(e,t){for(var r=!1,o=t;o>0&&"\\"===e.string[o-1];)r=!r,o--;return r},g.prototype.getModeForTemplateTag=function(e){if(!e)return null;"htm"===e&&(e="html");for(var t=["google-"+e,""+e],r=0;r<t.length;r++){var o=CodeMirror.getMode(this.config,t[r]);if(o&&"null"!==o.name)return o}return null};var h=function(e,t){void 0===e&&(e=[]),void 0===t&&(t=null),this.templateStack=e,this.previousVariable=t},f={currentTemplateState:{configurable:!0}};h.prototype.copy=function(){return new h(this.templateStack.map((function(e){return e.copy()})),this.previousVariable)},f.currentTemplateState.get=function(){return this.templateStack[this.templateStack.length-1]},Object.defineProperties(h.prototype,f);var m=function(e,t,r){this.kind=e,this.mode=t,this.state=r};m.prototype.copy=function(){return this.mode?new m(this.kind,this.mode,CodeMirror.copyState(this.mode,this.state)):new m(this.kind,null,null)};var y=["Block","FunctionDef","ArrowFunc","ForStatement","ParamListSpec"],b=function(e){function t(t,o){e.call(this,r,{predicates:{canInsertSemi:!1===o.requireSemicolons?p:function(){return!1}}}),this.templateTokenizer=new g(t),this.indentConf={doubleIndentBrackets:">)",dontCloseBrackets:")",tabSize:t.tabSize,indentUnit:t.indentUnit,forceContent:!0}}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.startState=function(){var t=e.prototype.startState.call(this);return t.embeddedParserState=this.templateTokenizer.startState(),t},t.prototype.copyState=function(t){var r=e.prototype.copyState.call(this,t);return r.embeddedParserState=this.templateTokenizer.copyState(t.embeddedParserState),r},t.prototype.token=function(t,r){var n=r.embeddedParserState;if(this.templateTokenizer.shouldInterceptTokenizing(n)){var i=this.templateTokenizer.interceptTokenizing(t,n),a=i.handled,l=i.style;if(a)return l}var c=e.prototype.token.call(this,t,r);return this.templateTokenizer.trackState(c,t,n),function(e,t,r,n){if("def"==e){var i=function(e,t){for(var r=e;r;r=r.parent)if(t.indexOf(r.name)>-1)return r}(n.context,t),a=r.current();if(i&&(i.locals||(i.locals=[]),-1==i.locals.indexOf(a)&&i.locals.push(a),"funcName"!=n.context.name))return"def local"}else o.test(e)&&!/qualified/.test(e)&&function(e,t){for(var r=e;r;r=r.parent)if(r.locals&&r.locals.indexOf(t)>-1)return!0;return!1}(n.context,r.current())&&(e=e.replace(o,"$1variable-2$2"));return e}(c,y,t,r)},t.prototype.indent=function(e,t,r){return t||(t=r="x"),u(e,t,r,this.indentConf)},t}(e.GrammarMode),v={electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``"};for(var w in v)b.prototype[w]=v[w];e.registerHelper("wordChars","google-typescript",/[\w$]/),e.defineMode("google-typescript",(function(e,t){return new b(e,t)}))}(window.CodeMirror),function(e){var t=[[1,"\n","\t"," "],/^[a-zA-Z\-\.0-9_]+/],r=Object.freeze({nodes:[[1,3,0,0,1],[/^[^]/,0],[/^[^]/,-1],[2,4,-1,{name:"comment",token:"comment"},2,6,-1,{name:"doctype",token:"meta"},2,8,-1,{name:"tag"},3,"atom",/^\&(?:(?![\;\n\t ]).)*\;/,-1,[1,"\n",/^(?:(?![\&\<]).)+/],-1],["\x3c!--",5],[[0,/^(?!\-\-\>)/,/^[^]/],5,"--\x3e",-1],[/^(?:\<\!doctype|\<\!DOCTYPE)(?![a-zA-Z\-\.0-9_])/,7],[[0,/^(?!\>)/,/^[^]/],7,">",-1],[2,14,9,{name:"openTag"}],[3,"tag","/>",-1,[7,"selfClosing"],10,3,"tag",">",11],[3,"tag",">",-1],[1,3,11,/^(?=\<\/)/,12],[[7,"matchingTag"],13,0,-1],[2,21,-1,{name:"closeTag"}],[3,"tag",[0,"<",[6,24]],15],[t[0],15,3,"tag",t[1],16],[t[0],16,0,17],[3,"attribute",t[1],18,0,-1],[t[0],18,"=",19,0,20],[t[0],19,2,25,20,{name:"attributeValue",token:"string"}],[t[0],20,0,17],[3,"tag","</",22],[t[0],22,3,"tag",t[1],23],[3,"tag",">",-1],[t[0],24,"/",-1],['"',26,"'",27,/^(?:(?![\n\t \>]).)*/,-1],[[0,/^(?!\")/,/^[^]/],26,'"',-1],[[0,/^(?!\')/,/^[^]/],27,"'",-1]],start:0,token:2});function o(e){var t=/^\s*([\w_\.-]+)/.exec(e);return t?t[1].toLowerCase():"x"}function n(e){return o(e.startLine.slice(e.startPos+1))}var i="area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "),a={selfClosing:function(e,t,r){return i.indexOf(n(r))>-1},matchingTag:function(e,t,r){return o(e.slice(t+2))==n(r)}},l=function(e){function t(t,o){e.call(this,r,{predicates:a}),this.conf=t}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.indent=function(e,t,r){return function(e,t,r,o){for(var i=e.contextAt(r,r.length-t.length),a=/^\s*<\/\s*([\w_\.-]+)/.exec(t);i;){if("tag"==i.name){var l=CodeMirror.countColumn(i.startLine,null,o.tabSize);return a&&a[1].toLowerCase()==n(i)?l:l+o.indentUnit}if("openTag"==i.name)return CodeMirror.countColumn(i.startLine,null,o.tabSize)+2*o.indentUnit;i=i.parent}return 0}(e,t,r,this.conf)},t}(e.GrammarMode),c=l.prototype;c.electricInput=/^\s*<\/.*?>/,c.blockCommentStart="\x3c!--",c.blockCommentEnd="--\x3e",c.fold="xml",function(e){e.xmlCurrentTag=function(e){var t=e.context;if(!t||"openTag"!=t.name&&"closeTag"!=t.name)return null;var r=/^<\/?\s*([\w\-\.]+)/.exec(t.startLine.slice(t.startPos));return r?{name:r[1],close:"closeTag"==t.name}:null},e.xmlCurrentContext=function(e){for(var t=[],r=e.context;r;r=r.parent)if("tag"==r.name){var o=/^<\s*([\w\-\.]+)/.exec(r.startLine.slice(r.startPos));o&&t.push(o[1])}return t.reverse()}}(c),e.defineMode("google-html",(function(e,t){return new l(e,t)}))}(window.CodeMirror),function(e){function t(e){for(var t={},r=0;r<e.length;++r)t[e[r].toLowerCase()]=!0;return t}e.defineMode("css",(function(t,r){var o=r.inline;r.propertyKeywords||(r=e.resolveMode("text/css"));var n,i,a=t.indentUnit,l=r.tokenHooks,c=r.documentTypes||{},s=r.mediaTypes||{},d=r.mediaFeatures||{},u=r.mediaValueKeywords||{},p=r.propertyKeywords||{},g=r.nonStandardPropertyKeywords||{},h=r.fontProperties||{},f=r.counterDescriptors||{},m=r.colorKeywords||{},y=r.valueKeywords||{},b=r.allowNested,v=r.lineComment,w=!0===r.supportsAtComponent,k=!1!==t.highlightNonStandardPropertyKeywords;function C(e,t){return n=t,e}function x(e,t){var r=e.next();if(l[r]){var o=l[r](e,t);if(!1!==o)return o}return"@"==r?(e.eatWhile(/[\w\\\-]/),C("def",e.current())):"="==r||("~"==r||"|"==r)&&e.eat("=")?C(null,"compare"):'"'==r||"'"==r?(t.tokenize=S(r),t.tokenize(e,t)):"#"==r?(e.eatWhile(/[\w\\\-]/),C("atom","hash")):"!"==r?(e.match(/^\s*\w*/),C("keyword","important")):/\d/.test(r)||"."==r&&e.eat(/\d/)?(e.eatWhile(/[\w.%]/),C("number","unit")):"-"!==r?/[,+>*\/]/.test(r)?C(null,"select-op"):"."==r&&e.match(/^-?[_a-z][_a-z0-9-]*/i)?C("qualifier","qualifier"):/[:;{}\[\]\(\)]/.test(r)?C(null,r):e.match(/[\w-.]+(?=\()/)?(/^(url(-prefix)?|domain|regexp)$/.test(e.current().toLowerCase())&&(t.tokenize=T),C("variable callee","variable")):/[\w\\\-]/.test(r)?(e.eatWhile(/[\w\\\-]/),C("property","word")):C(null,null):/[\d.]/.test(e.peek())?(e.eatWhile(/[\w.%]/),C("number","unit")):e.match(/^-[\w\\\-]*/)?(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?C("variable-2","variable-definition"):C("variable-2","variable")):e.match(/^\w+-/)?C("meta","meta"):void 0}function S(e){return function(t,r){for(var o,n=!1;null!=(o=t.next());){if(o==e&&!n){")"==e&&t.backUp(1);break}n=!n&&"\\"==o}return(o==e||!n&&")"!=e)&&(r.tokenize=null),C("string","string")}}function T(e,t){return e.next(),e.match(/\s*[\"\')]/,!1)?t.tokenize=null:t.tokenize=S(")"),C(null,"(")}function L(e,t,r){this.type=e,this.indent=t,this.prev=r}function E(e,t,r,o){return e.context=new L(r,t.indentation()+(!1===o?0:a),e.context),r}function O(e){return e.context.prev&&(e.context=e.context.prev),e.context.type}function A(e,t,r){return R[r.context.type](e,t,r)}function _(e,t,r,o){for(var n=o||1;n>0;n--)r.context=r.context.prev;return A(e,t,r)}function M(e){var t=e.current().toLowerCase();i=y.hasOwnProperty(t)?"atom":m.hasOwnProperty(t)?"keyword":"variable"}var R={top:function(e,t,r){if("{"==e)return E(r,t,"block");if("}"==e&&r.context.prev)return O(r);if(w&&/@component/i.test(e))return E(r,t,"atComponentBlock");if(/^@(-moz-)?document$/i.test(e))return E(r,t,"documentTypes");if(/^@(media|supports|(-moz-)?document|import)$/i.test(e))return E(r,t,"atBlock");if(/^@(font-face|counter-style)/i.test(e))return r.stateArg=e,"restricted_atBlock_before";if(/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(e))return"keyframes";if(e&&"@"==e.charAt(0))return E(r,t,"at");if("hash"==e)i="builtin";else if("word"==e)i="tag";else{if("variable-definition"==e)return"maybeprop";if("interpolation"==e)return E(r,t,"interpolation");if(":"==e)return"pseudo";if(b&&"("==e)return E(r,t,"parens")}return r.context.type},block:function(e,t,r){if("word"==e){var o=t.current().toLowerCase();return p.hasOwnProperty(o)?(i="property","maybeprop"):g.hasOwnProperty(o)?(i=k?"string-2":"property","maybeprop"):b?(i=t.match(/^\s*:(?:\s|$)/,!1)?"property":"tag","block"):(i+=" error","maybeprop")}return"meta"==e?"block":b||"hash"!=e&&"qualifier"!=e?R.top(e,t,r):(i="error","block")},maybeprop:function(e,t,r){return":"==e?E(r,t,"prop"):A(e,t,r)},prop:function(e,t,r){if(";"==e)return O(r);if("{"==e&&b)return E(r,t,"propBlock");if("}"==e||"{"==e)return _(e,t,r);if("("==e)return E(r,t,"parens");if("hash"!=e||/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())){if("word"==e)M(t);else if("interpolation"==e)return E(r,t,"interpolation")}else i+=" error";return"prop"},propBlock:function(e,t,r){return"}"==e?O(r):"word"==e?(i="property","maybeprop"):r.context.type},parens:function(e,t,r){return"{"==e||"}"==e?_(e,t,r):")"==e?O(r):"("==e?E(r,t,"parens"):"interpolation"==e?E(r,t,"interpolation"):("word"==e&&M(t),"parens")},pseudo:function(e,t,r){return"meta"==e?"pseudo":"word"==e?(i="variable-3",r.context.type):A(e,t,r)},documentTypes:function(e,t,r){return"word"==e&&c.hasOwnProperty(t.current())?(i="tag",r.context.type):R.atBlock(e,t,r)},atBlock:function(e,t,r){if("("==e)return E(r,t,"atBlock_parens");if("}"==e||";"==e)return _(e,t,r);if("{"==e)return O(r)&&E(r,t,b?"block":"top");if("interpolation"==e)return E(r,t,"interpolation");if("word"==e){var o=t.current().toLowerCase();i="only"==o||"not"==o||"and"==o||"or"==o?"keyword":s.hasOwnProperty(o)?"attribute":d.hasOwnProperty(o)?"property":u.hasOwnProperty(o)?"keyword":p.hasOwnProperty(o)?"property":g.hasOwnProperty(o)?k?"string-2":"property":y.hasOwnProperty(o)?"atom":m.hasOwnProperty(o)?"keyword":"error"}return r.context.type},atComponentBlock:function(e,t,r){return"}"==e?_(e,t,r):"{"==e?O(r)&&E(r,t,b?"block":"top",!1):("word"==e&&(i="error"),r.context.type)},atBlock_parens:function(e,t,r){return")"==e?O(r):"{"==e||"}"==e?_(e,t,r,2):R.atBlock(e,t,r)},restricted_atBlock_before:function(e,t,r){return"{"==e?E(r,t,"restricted_atBlock"):"word"==e&&"@counter-style"==r.stateArg?(i="variable","restricted_atBlock_before"):A(e,t,r)},restricted_atBlock:function(e,t,r){return"}"==e?(r.stateArg=null,O(r)):"word"==e?(i="@font-face"==r.stateArg&&!h.hasOwnProperty(t.current().toLowerCase())||"@counter-style"==r.stateArg&&!f.hasOwnProperty(t.current().toLowerCase())?"error":"property","maybeprop"):"restricted_atBlock"},keyframes:function(e,t,r){return"word"==e?(i="variable","keyframes"):"{"==e?E(r,t,"top"):A(e,t,r)},at:function(e,t,r){return";"==e?O(r):"{"==e||"}"==e?_(e,t,r):("word"==e?i="tag":"hash"==e&&(i="builtin"),"at")},interpolation:function(e,t,r){return"}"==e?O(r):"{"==e||";"==e?_(e,t,r):("word"==e?i="variable":"variable"!=e&&"("!=e&&")"!=e&&(i="error"),"interpolation")}};return{startState:function(e){return{tokenize:null,state:o?"block":"top",stateArg:null,context:new L(o?"block":"top",e||0,null)}},token:function(e,t){if(!t.tokenize&&e.eatSpace())return null;var r=(t.tokenize||x)(e,t);return r&&"object"==typeof r&&(n=r[1],r=r[0]),i=r,"comment"!=n&&(t.state=R[t.state](n,e,t)),i},indent:function(e,t){var r=e.context,o=t&&t.charAt(0),n=r.indent;return"prop"!=r.type||"}"!=o&&")"!=o||(r=r.prev),r.prev&&("}"!=o||"block"!=r.type&&"top"!=r.type&&"interpolation"!=r.type&&"restricted_atBlock"!=r.type?(")"!=o||"parens"!=r.type&&"atBlock_parens"!=r.type)&&("{"!=o||"at"!=r.type&&"atBlock"!=r.type)||(n=Math.max(0,r.indent-a)):n=(r=r.prev).indent),n},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:v,fold:"brace"}}));var r=["domain","regexp","url","url-prefix"],o=t(r),n=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],i=t(n),a=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid","orientation","device-pixel-ratio","min-device-pixel-ratio","max-device-pixel-ratio","pointer","any-pointer","hover","any-hover","prefers-color-scheme"],l=t(a),c=["landscape","portrait","none","coarse","fine","on-demand","hover","interlace","progressive","dark","light"],s=t(c),d=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","all","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","baseline-shift","binding","bleed","block-size","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","gap","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-gap","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-gap","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","inset","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","left","letter-spacing","line-break","line-height","line-height-step","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","place-content","place-items","place-self","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotate","rotation","rotation-point","row-gap","ruby-align","ruby-overhang","ruby-position","ruby-span","scale","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-type","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-orientation","text-outline","text-overflow","text-rendering","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","touch-action","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-select","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","paint-order","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode"],u=t(d),p=["border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","margin-block","margin-block-end","margin-block-start","margin-inline","margin-inline-end","margin-inline-start","padding-block","padding-block-end","padding-block-start","padding-inline","padding-inline-end","padding-inline-start","scroll-snap-stop","scrollbar-3d-light-color","scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-track-color","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","shape-inside","zoom"],g=t(p),h=t(["font-display","font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"]),f=t(["additive-symbols","fallback","negative","pad","prefix","range","speak-as","suffix","symbols","system"]),m=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],y=t(m),b=["above","absolute","activeborder","additive","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","attr","auto","auto-flow","avoid","avoid-column","avoid-page","avoid-region","axis-pan","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","bullets","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","calc","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","color","color-burn","color-dodge","column","column-reverse","compact","condensed","contain","content","contents","content-box","context-menu","continuous","copy","counter","counters","cover","crop","cross","crosshair","currentcolor","cursive","cyclic","darken","dashed","decimal","decimal-leading-zero","default","default-button","dense","destination-atop","destination-in","destination-out","destination-over","devanagari","difference","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ethiopic-numeric","ew-resize","exclusion","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fill-box","fixed","flat","flex","flex-end","flex-start","footnotes","forwards","from","geometricPrecision","georgian","graytext","grid","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hard-light","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","hue","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-grid","inline-table","inset","inside","intrinsic","invert","italic","japanese-formal","japanese-informal","justify","kannada","katakana","katakana-iroha","keep-all","khmer","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","landscape","lao","large","larger","left","level","lighter","lighten","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","luminosity","malayalam","manipulation","match","matrix","matrix3d","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","multiple_mask_images","multiply","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","octal","opacity","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","perspective","pinch-zoom","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row","row-resize","row-reverse","rtl","run-in","running","s-resize","sans-serif","saturation","scale","scale3d","scaleX","scaleY","scaleZ","screen","scroll","scrollbar","scroll-position","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","self-start","self-end","semi-condensed","semi-expanded","separate","serif","show","sidama","simp-chinese-formal","simp-chinese-informal","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","soft-light","solid","somali","source-atop","source-in","source-out","source-over","space","space-around","space-between","space-evenly","spell-out","square","square-button","start","static","status-bar","stretch","stroke","stroke-box","sub","subpixel-antialiased","svg_masks","super","sw-resize","symbolic","symbols","system-ui","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tamil","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","trad-chinese-formal","trad-chinese-informal","transform","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","unidirectional-pan","unset","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","var","vertical","vertical-text","view-box","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","wrap","wrap-reverse","x-large","x-small","xor","xx-large","xx-small"],v=t(b),w=r.concat(n).concat(a).concat(c).concat(d).concat(p).concat(m).concat(b);function k(e,t){for(var r,o=!1;null!=(r=e.next());){if(o&&"/"==r){t.tokenize=null;break}o="*"==r}return["comment","comment"]}e.registerHelper("hintWords","css",w),e.defineMIME("text/css",{documentTypes:o,mediaTypes:i,mediaFeatures:l,mediaValueKeywords:s,propertyKeywords:u,nonStandardPropertyKeywords:g,fontProperties:h,counterDescriptors:f,colorKeywords:y,valueKeywords:v,tokenHooks:{"/":function(e,t){return!!e.eat("*")&&(t.tokenize=k,k(e,t))}},name:"css"}),e.defineMIME("text/x-scss",{mediaTypes:i,mediaFeatures:l,mediaValueKeywords:s,propertyKeywords:u,nonStandardPropertyKeywords:g,colorKeywords:y,valueKeywords:v,fontProperties:h,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=k,k(e,t)):["operator","operator"]},":":function(e){return!!e.match(/\s*\{/,!1)&&[null,null]},$:function(e){return e.match(/^[\w-]+/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"]},"#":function(e){return!!e.eat("{")&&[null,"interpolation"]}},name:"css",helperType:"scss"}),e.defineMIME("text/x-less",{mediaTypes:i,mediaFeatures:l,mediaValueKeywords:s,propertyKeywords:u,nonStandardPropertyKeywords:g,colorKeywords:y,valueKeywords:v,fontProperties:h,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=k,k(e,t)):["operator","operator"]},"@":function(e){return e.eat("{")?[null,"interpolation"]:!e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i,!1)&&(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"])},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"}),e.defineMIME("text/x-gss",{documentTypes:o,mediaTypes:i,mediaFeatures:l,propertyKeywords:u,nonStandardPropertyKeywords:g,fontProperties:h,counterDescriptors:f,colorKeywords:y,valueKeywords:v,supportsAtComponent:!0,tokenHooks:{"/":function(e,t){return!!e.eat("*")&&(t.tokenize=k,k(e,t))}},name:"css",helperType:"gss"})}(CodeMirror);const Xt=ie`
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
.CodeMirror-guttermarker-subtle,
.cm-hr {
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
.cm-header {
  color: #00f
}
.cm-quote {
  color: #090
}
.cm-negative {
  color: #d44
}
.cm-positive {
  color: #292
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
.cm-bracket {
  color: #997
}
.cm-link {
  color: #00c
}
.cm-error,
.cm-invalidchar {
  color: red
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
.CodeMirror-activeline-background {
  background: #e8f2ff
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
.CodeMirror-selected {
  background: #d9d9d9
}
.CodeMirror-focused .CodeMirror-selected {
  background: #d7d4f0
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
  background: var(--playground-code-background, rgb(255, 255, 255));
  color: var(--playground-code-default-color, rgb(0, 0, 0))
}
.CodeMirror-focused .CodeMirror-selected,
.CodeMirror-line > span > span::selection,
.CodeMirror-line > span::selection,
.CodeMirror-line::selection,
.CodeMirror-selected {
  background: var(--playground-code-selection-background, rgb(217, 217, 217))
}
.CodeMirror-gutters {
  background: var(--playground-code-gutter-background, rgb(247, 247, 247));
  border-right: var(--playground-code-gutter-border-right, 1px solid rgb(221, 221, 221));
  box-shadow: var(--playground-code-gutter-box-shadow, none)
}
.CodeMirror-gutter-filler {
  left: 0;
  bottom: 0;
  background: var(--playground-code-gutter-filler-background, rgb(255, 255, 255))
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
.cm-builtin {
  color: var(--playground-code-builtin-color, rgb(51, 0, 170))
}
.cm-comment {
  color: var(--playground-code-comment-color, rgb(170, 85, 0))
}
.cm-def {
  color: var(--playground-code-def-color, rgb(0, 0, 255))
}
.cm-keyword {
  color: var(--playground-code-keyword-color, rgb(119, 0, 136))
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
.cm-qualifier {
  color: var(--playground-code-qualifier-color, rgb(85, 85, 85))
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
.cm-callee {
  color: var(--playground-code-callee-color, rgb(0, 0, 0))
}
.cm-property {
  color: var(--playground-code-property-color, rgb(0, 0, 0))
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
 */;let $t=class extends le{constructor(){super(...arguments),this.lineNumbers=!1,this.readonly=!1,this._valueChangingFromOutside=!1}get value(){return this._value}set value(e){const t=this._value;this._value=e,this.requestUpdate("value",t)}update(e){const t=this._codemirror;if(void 0===t)this._createView();else for(const r of e.keys())switch(r){case"value":this._valueChangingFromOutside=!0,t.setValue(this.value??""),this._valueChangingFromOutside=!1;break;case"lineNumbers":t.setOption("lineNumbers",this.lineNumbers);break;case"type":t.setOption("mode",this._getLanguageMode());break;case"readonly":t.setOption("readOnly",this.readonly)}super.update(e)}connectedCallback(){"function"==typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver((()=>{this._codemirror?.setSize()})),this._resizeObserver.observe(this)),super.connectedCallback()}disconnectedCallback(){this._resizeObserver?.disconnect(),super.disconnectedCallback()}_createView(){const e=CodeMirror((e=>{this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(e)}),{value:this.value??"",lineNumbers:this.lineNumbers,mode:this._getLanguageMode(),readOnly:this.readonly});e.on("change",(()=>{this._value=e.getValue(),this._valueChangingFromOutside||this.dispatchEvent(new Event("change"))})),this._codemirror=e}_getLanguageMode(){switch(this.type){case"ts":return"google-typescript";case"js":return"google-javascript";case"html":return"google-html";case"css":return"css"}return null}};
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
function er(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(t,r,a):n(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a
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
***************************************************************************** */}function tr(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(t,r,a):n(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a
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
 */}$t.styles=[ie`
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
    `,Xt],e([Q()],$t.prototype,"type",void 0),e([Q({type:Boolean,attribute:"line-numbers",reflect:!0})],$t.prototype,"lineNumbers",void 0),e([Q({type:Boolean,reflect:!0})],$t.prototype,"readonly",void 0),$t=e([q("playground-code-editor")],$t);const rr=new WeakMap,or=f((e=>t=>{if(!(t instanceof L)||t instanceof _||"style"!==t.committer.name||t.committer.parts.length>1)throw Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:r}=t,{style:o}=r.element;let n=rr.get(t);void 0===n&&(o.cssText=r.strings.join(" "),rr.set(t,n=new Set)),n.forEach((t=>{t in e||(n.delete(t),-1===t.indexOf("-")?o[t]=null:o.removeProperty(t))}));for(const t in e)n.add(t),-1===t.indexOf("-")?o[t]=e[t]:o.setProperty(t,e[t])}));class nr extends ze{constructor(){super(...arguments),this.primary=!1,this.accent=!1,this.unbounded=!1,this.disabled=!1,this.activated=!1,this.selected=!1,this.hovering=!1,this.bgFocused=!1,this.fgActivation=!1,this.fgDeactivation=!1,this.fgScale="",this.fgSize="",this.translateStart="",this.translateEnd="",this.leftPos="",this.topPos="",this.mdcFoundationClass=at}get isActive(){return(this.parentElement||this).matches(":active")}createAdapter(){return{browserSupportsCssVars:()=>!0,isUnbounded:()=>this.unbounded,isSurfaceActive:()=>this.isActive,isSurfaceDisabled:()=>this.disabled,addClass:e=>{switch(e){case"mdc-ripple-upgraded--background-focused":this.bgFocused=!0;break;case"mdc-ripple-upgraded--foreground-activation":this.fgActivation=!0;break;case"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation=!0}},removeClass:e=>{switch(e){case"mdc-ripple-upgraded--background-focused":this.bgFocused=!1;break;case"mdc-ripple-upgraded--foreground-activation":this.fgActivation=!1;break;case"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation=!1}},containsEventTarget:()=>!0,registerInteractionHandler:()=>{},deregisterInteractionHandler:()=>{},registerDocumentInteractionHandler:()=>{},deregisterDocumentInteractionHandler:()=>{},registerResizeHandler:()=>{},deregisterResizeHandler:()=>{},updateCssVariable:(e,t)=>{switch(e){case"--mdc-ripple-fg-scale":this.fgScale=t;break;case"--mdc-ripple-fg-size":this.fgSize=t;break;case"--mdc-ripple-fg-translate-end":this.translateEnd=t;break;case"--mdc-ripple-fg-translate-start":this.translateStart=t;break;case"--mdc-ripple-left":this.leftPos=t;break;case"--mdc-ripple-top":this.topPos=t}},computeBoundingRect:()=>(this.parentElement||this).getBoundingClientRect(),getWindowPageOffset:()=>({x:window.pageXOffset,y:window.pageYOffset})}}startPress(e){this.waitForFoundation((()=>{this.mdcFoundation.activate(e)}))}endPress(){this.waitForFoundation((()=>{this.mdcFoundation.deactivate()}))}startFocus(){this.waitForFoundation((()=>{this.mdcFoundation.handleFocus()}))}endFocus(){this.waitForFoundation((()=>{this.mdcFoundation.handleBlur()}))}startHover(){this.hovering=!0}endHover(){this.hovering=!1}waitForFoundation(e){this.mdcFoundation?e():this.updateComplete.then(e)}render(){const e={"mdc-ripple-upgraded--unbounded":this.unbounded,"mdc-ripple-upgraded--background-focused":this.bgFocused,"mdc-ripple-upgraded--foreground-activation":this.fgActivation,"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation,hover:this.hovering,primary:this.primary,accent:this.accent,disabled:this.disabled,activated:this.activated,selected:this.selected};return P`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${Ve(e)}"
          style="${or({"--mdc-ripple-fg-scale":this.fgScale,"--mdc-ripple-fg-size":this.fgSize,"--mdc-ripple-fg-translate-end":this.translateEnd,"--mdc-ripple-fg-translate-start":this.translateStart,"--mdc-ripple-left":this.leftPos,"--mdc-ripple-top":this.topPos})}"></div>`}}tr([X(".mdc-ripple-surface")],nr.prototype,"mdcRoot",void 0),tr([Q({type:Boolean})],nr.prototype,"primary",void 0),tr([Q({type:Boolean})],nr.prototype,"accent",void 0),tr([Q({type:Boolean})],nr.prototype,"unbounded",void 0),tr([Q({type:Boolean})],nr.prototype,"disabled",void 0),tr([Q({type:Boolean})],nr.prototype,"activated",void 0),tr([Q({type:Boolean})],nr.prototype,"selected",void 0),tr([Y()],nr.prototype,"hovering",void 0),tr([Y()],nr.prototype,"bgFocused",void 0),tr([Y()],nr.prototype,"fgActivation",void 0),tr([Y()],nr.prototype,"fgDeactivation",void 0),tr([Y()],nr.prototype,"fgScale",void 0),tr([Y()],nr.prototype,"fgSize",void 0),tr([Y()],nr.prototype,"translateStart",void 0),tr([Y()],nr.prototype,"translateEnd",void 0),tr([Y()],nr.prototype,"leftPos",void 0),tr([Y()],nr.prototype,"topPos",void 0);
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
const ir=ie`:host{display:block;position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host .primary{--mdc-ripple-color: var(--mdc-theme-primary, #6200ee)}:host .accent{--mdc-ripple-color: var( --mdc-theme-secondary, #018786 )}:host .mdc-ripple-surface{top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden;--mdc-ripple-fg-opacity: var( --mdc-ripple-press-opacity, 0.12 )}:host .mdc-ripple-surface::before,:host .mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:host .mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:host .mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}:host .mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}:host .mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:host .mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}:host .mdc-ripple-surface::before,:host .mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:host .mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded{overflow:visible}:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded::before,:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:host .mdc-ripple-surface.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:host .mdc-ripple-surface.hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}:host .mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before{opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}:host .mdc-ripple-surface::before,:host .mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}:host .mdc-ripple-surface.activated{--mdc-ripple-press-opacity: calc( var(--mdc-ripple-press-opacity, 0.12) + 0.12 )}:host .mdc-ripple-surface.activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}:host .mdc-ripple-surface.activated.hover::before{opacity:.16;opacity:calc( var(--mdc-ripple-hover-opacity, 0.04) + var(--mdc-ripple-activated-opacity, 0.12) )}:host .mdc-ripple-surface.activated.mdc-ripple-upgraded--background-focused::before{opacity:.24;opacity:calc( var(--mdc-ripple-focus-opacity, 0.12) + var(--mdc-ripple-activated-opacity, 0.12) )}:host .mdc-ripple-surface.selected{--mdc-ripple-press-opacity: calc( var(--mdc-ripple-press-opacity, 0.12) + 0.08 )}:host .mdc-ripple-surface.selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}:host .mdc-ripple-surface.selected.hover::before{opacity:.12;opacity:calc( var(--mdc-ripple-hover-opacity, 0.04) + var(--mdc-ripple-selected-opacity, 0.08) )}:host .mdc-ripple-surface.selected.mdc-ripple-upgraded--background-focused::before{opacity:.2;opacity:calc( var(--mdc-ripple-focus-opacity, 0.12) + var(--mdc-ripple-selected-opacity, 0.08) )}:host .mdc-ripple-surface.disabled{--mdc-ripple-color: transparent}:host .mdc-ripple-surface::before{z-index:1;z-index:var(--m-ripple-z-index, 1)}:host .mdc-ripple-surface::after{z-index:0;z-index:var(--m-ripple-z-index, 0)}`;let ar=class extends nr{};ar.styles=ir,ar=tr([q("mwc-ripple")],ar);
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
class lr{constructor(e){this.startPress=t=>{e().then((e=>{e&&e.startPress(t)}))},this.endPress=()=>{e().then((e=>{e&&e.endPress()}))},this.startFocus=()=>{e().then((e=>{e&&e.startFocus()}))},this.endFocus=()=>{e().then((e=>{e&&e.endFocus()}))},this.startHover=()=>{e().then((e=>{e&&e.startHover()}))},this.endHover=()=>{e().then((e=>{e&&e.endHover()}))}}}class cr extends le{constructor(){super(...arguments),this.disabled=!1,this.icon="",this.label="",this.shouldRenderRipple=!1,this.rippleHandlers=new lr((()=>(this.shouldRenderRipple=!0,this.ripple)))}renderRipple(){return this.shouldRenderRipple?P`
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
  </button>`}handleRippleMouseDown(e){const t=()=>{window.removeEventListener("mouseup",t),this.handleRippleDeactivate()};window.addEventListener("mouseup",t),this.rippleHandlers.startPress(e)}handleRippleTouchStart(e){this.rippleHandlers.startPress(e)}handleRippleDeactivate(){this.rippleHandlers.endPress()}handleRippleMouseEnter(){this.rippleHandlers.startHover()}handleRippleMouseLeave(){this.rippleHandlers.endHover()}handleRippleFocus(){this.rippleHandlers.startFocus()}handleRippleBlur(){this.rippleHandlers.endFocus()}}er([Q({type:Boolean,reflect:!0})],cr.prototype,"disabled",void 0),er([Q({type:String})],cr.prototype,"icon",void 0),er([Q({type:String})],cr.prototype,"label",void 0),er([X("button")],cr.prototype,"buttonElement",void 0),er([("mwc-ripple",(e,t)=>{const r={async get(){return await this.updateComplete,this.renderRoot.querySelector("mwc-ripple")},enumerable:!0,configurable:!0};return void 0!==t?$(r,e,t):ee(r,e)})],cr.prototype,"ripple",void 0),er([Y()],cr.prototype,"shouldRenderRipple",void 0),er([te({passive:!0})],cr.prototype,"handleRippleMouseDown",null),er([te({passive:!0})],cr.prototype,"handleRippleTouchStart",null);
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
const sr=ie`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}:host{display:inline-block;outline:none;--mdc-ripple-color: currentcolor}:host([disabled]){pointer-events:none}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc((var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2)}.mdc-icon-button>i{position:absolute;top:0;padding-top:inherit}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`
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
*/;let dr=class extends cr{};dr.styles=sr,dr=er([q("mwc-icon-button")],dr),
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
Ct.prototype.createRenderRoot=function(){return this.attachShadow({mode:"open",delegatesFocus:!1})};let ur=class extends le{constructor(){super(...arguments),this.enableAddFile=!1,this.noFilePicker=!1,this.lineNumbers=!1,this.project=void 0,this._project=void 0}get _currentFile(){return void 0===this._currentFileIndex?void 0:this.files?.[this._currentFileIndex]}async update(e){e.has("project")&&this._findProjectAndRegister(),(e.has("files")||e.has("filename"))&&(this._currentFileIndex=this.files&&this.filename?this.files.map((e=>e.name)).indexOf(this.filename):0,this._tabBar&&(await this._tabBar.updateComplete,this._tabBar.activeIndex=-1,this._tabBar.activeIndex=this._currentFileIndex)),super.update(e)}render(){return P`
      ${this.noFilePicker?b:P` <mwc-tab-bar
            part="file-picker"
            .activeIndex=${this._currentFileIndex??0}
            @MDCTabBar:activated=${this._tabActivated}
          >
            ${this.files?.map((e=>{const t=e.label||e.name.substring(e.name.lastIndexOf("/")+1);return P`<mwc-tab
                .isFadingIndicator=${!0}
                label=${t}
              ></mwc-tab>`}))}
            ${this.enableAddFile?P`<mwc-icon-button icon="add"></mwc-icon-button>`:b}
          </mwc-tab-bar>`}
      ${this._currentFile?P`
            <playground-code-editor
              .value=${this._currentFile.content}
              .type=${this._currentFile?pr(this._currentFile.contentType):void 0}
              .lineNumbers=${this.lineNumbers}
              @change=${this._onEdit}
            >
            </playground-code-editor>
          `:P`<slot></slot>`}
    `}_tabActivated(e){this._currentFileIndex=e.detail.index,this.filename=this.files?.[this._currentFileIndex].name}_findProjectAndRegister(){const e=this._project;this.project instanceof HTMLElement?this._project=this.project:"string"==typeof this.project?this._project=this.getRootNode().getElementById(this.project)||void 0:this._project=void 0,e!==this._project&&(e&&e._unregisterEditor(this),this._project&&this._project._registerEditor(this))}_onEdit(){const e=this._editor.value;this._currentFile&&(this._currentFile.content=e,this._project?.saveDebounced())}};ur.styles=ie`
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
  `,e([Q({type:Boolean})],ur.prototype,"enableAddFile",void 0),e([X("mwc-tab-bar")],ur.prototype,"_tabBar",void 0),e([X("playground-code-editor")],ur.prototype,"_editor",void 0),e([Q({attribute:!1})],ur.prototype,"files",void 0),e([Q()],ur.prototype,"filename",void 0),e([Q({type:Boolean,attribute:"no-file-picker"})],ur.prototype,"noFilePicker",void 0),e([Q({type:Boolean,attribute:"line-numbers"})],ur.prototype,"lineNumbers",void 0),e([Y()],ur.prototype,"_currentFileIndex",void 0),e([Q()],ur.prototype,"project",void 0),e([Q()],ur.prototype,"type",void 0),ur=e([q("playground-file-editor")],ur);const pr=e=>{if(void 0===e)return;const t=e.indexOf(";");switch(-1!==t&&(e=e.substring(0,t)),e){case"video/mp2t":return"ts";case"text/javascript":case"application/javascript":return"js";case"text/html":return"html";case"text/css":return"css"}},gr=new WeakMap,hr=f((e=>t=>{const r=gr.get(t);if(void 0===e&&t instanceof L){if(void 0!==r||!gr.has(t)){const e=t.committer.name;t.committer.element.removeAttribute(e)}}else e!==r&&t.setValue(e);gr.set(t,e)}));
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
function fr(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(i<3?n(a):i>3?n(t,r,a):n(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a}class mr extends le{constructor(){super(...arguments),this.indeterminate=!1,this.progress=0,this.buffer=1,this.reverse=!1,this.closed=!1,this.ariaLabel="",this.stylePrimaryHalf="",this.stylePrimaryFull="",this.styleSecondaryQuarter="",this.styleSecondaryHalf="",this.styleSecondaryFull="",this.animationReady=!0,this.closedAnimationOff=!1,this.resizeObserver=null}connectedCallback(){super.connectedCallback(),this.rootEl&&this.attachResizeObserver()}render(){const e={"mdc-linear-progress--closed":this.closed,"mdc-linear-progress--closed-animation-off":this.closedAnimationOff,"mdc-linear-progress--indeterminate":this.indeterminate,"mdc-linear-progress--reversed":this.reverse,"mdc-linear-progress--animation-ready":this.animationReady},t={"--mdc-linear-progress-primary-half":this.stylePrimaryHalf,"--mdc-linear-progress-primary-half-neg":""!==this.stylePrimaryHalf?"-"+this.stylePrimaryHalf:"","--mdc-linear-progress-primary-full":this.stylePrimaryFull,"--mdc-linear-progress-primary-full-neg":""!==this.stylePrimaryFull?"-"+this.stylePrimaryFull:"","--mdc-linear-progress-secondary-quarter":this.styleSecondaryQuarter,"--mdc-linear-progress-secondary-quarter-neg":""!==this.styleSecondaryQuarter?"-"+this.styleSecondaryQuarter:"","--mdc-linear-progress-secondary-half":this.styleSecondaryHalf,"--mdc-linear-progress-secondary-half-neg":""!==this.styleSecondaryHalf?"-"+this.styleSecondaryHalf:"","--mdc-linear-progress-secondary-full":this.styleSecondaryFull,"--mdc-linear-progress-secondary-full-neg":""!==this.styleSecondaryFull?"-"+this.styleSecondaryFull:""},r={"flex-basis":this.indeterminate?"100%":100*this.buffer+"%"},o={transform:this.indeterminate?"scaleX(1)":`scaleX(${this.progress})`};return P`
      <div
          role="progressbar"
          class="mdc-linear-progress ${Ve(e)}"
          style=${or(t)}
          aria-label=${hr(this.ariaLabel?this.ariaLabel:void 0)}
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow=${hr(this.indeterminate?void 0:this.progress)}
        @transitionend=${this.syncClosedState}>
        <div class="mdc-linear-progress__buffer">
          <div
            class="mdc-linear-progress__buffer-bar"
            style=${or(r)}>
          </div>
          <div class="mdc-linear-progress__buffer-dots"></div>
        </div>
        <div
            class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
            style=${or(o)}>
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>`}update(e){!e.has("closed")||this.closed&&void 0!==e.get("closed")||this.syncClosedState(),super.update(e)}async firstUpdated(e){super.firstUpdated(e),this.attachResizeObserver()}syncClosedState(){this.closedAnimationOff=this.closed}updated(e){!e.has("indeterminate")&&e.has("reverse")&&this.indeterminate&&this.restartAnimation(),e.has("indeterminate")&&void 0!==e.get("indeterminate")&&this.indeterminate&&window.ResizeObserver&&this.calculateAndSetAnimationDimensions(this.rootEl.offsetWidth),super.updated(e)}disconnectedCallback(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),super.disconnectedCallback()}attachResizeObserver(){if(window.ResizeObserver)return this.resizeObserver=new ResizeObserver((e=>{if(this.indeterminate)for(const t of e)if(t.contentRect){const e=t.contentRect.width;this.calculateAndSetAnimationDimensions(e)}})),void this.resizeObserver.observe(this.rootEl);this.resizeObserver=null}calculateAndSetAnimationDimensions(e){const t=.8367142*e,r=2.00611057*e,o=.37651913*e,n=.84386165*e,i=1.60277782*e;this.stylePrimaryHalf=t+"px",this.stylePrimaryFull=r+"px",this.styleSecondaryQuarter=o+"px",this.styleSecondaryHalf=n+"px",this.styleSecondaryFull=i+"px",this.restartAnimation()}async restartAnimation(){this.animationReady=!1,await this.updateComplete,await new Promise(requestAnimationFrame),this.animationReady=!0,await this.updateComplete}open(){this.closed=!1}close(){this.closed=!0}}fr([X(".mdc-linear-progress")],mr.prototype,"rootEl",void 0),fr([Q({type:Boolean,reflect:!0})],mr.prototype,"indeterminate",void 0),fr([Q({type:Number})],mr.prototype,"progress",void 0),fr([Q({type:Number})],mr.prototype,"buffer",void 0),fr([Q({type:Boolean,reflect:!0})],mr.prototype,"reverse",void 0),fr([Q({type:Boolean,reflect:!0})],mr.prototype,"closed",void 0),fr([Q()],mr.prototype,"ariaLabel",void 0),fr([Y()],mr.prototype,"stylePrimaryHalf",void 0),fr([Y()],mr.prototype,"stylePrimaryFull",void 0),fr([Y()],mr.prototype,"styleSecondaryQuarter",void 0),fr([Y()],mr.prototype,"styleSecondaryHalf",void 0),fr([Y()],mr.prototype,"styleSecondaryFull",void 0),fr([Y()],mr.prototype,"animationReady",void 0),fr([Y()],mr.prototype,"closedAnimationOff",void 0);
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
const yr=ie`@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half, 83.67142%))}100%{transform:translateX(200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full, 200.611057%))}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter, 37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half, 84.386165%))}100%{transform:translateX(160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full, 160.277782%))}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(-10px)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half-neg, -83.67142%))}100%{transform:translateX(-200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full-neg, -200.611057%))}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter-neg, -37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half-neg, -84.386165%))}100%{transform:translateX(-160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full-neg, -160.277782%))}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}.mdc-linear-progress{position:relative;width:100%;height:4px;transform:translateZ(0);outline:1px solid transparent;overflow:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar{position:absolute;width:100%;height:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top:4px solid}.mdc-linear-progress__buffer{display:flex;position:absolute;width:100%;height:100%}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;background-size:10px 4px;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{visibility:hidden}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;visibility:visible}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--reversed .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress--reversed.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}.mdc-linear-progress--reversed.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}.mdc-linear-progress--reversed .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;order:0;transform:rotate(0)}.mdc-linear-progress--reversed .mdc-linear-progress__buffer-bar{order:1}.mdc-linear-progress--closed{opacity:0}.mdc-linear-progress--closed-animation-off .mdc-linear-progress__buffer-dots{animation:none}.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar,.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar .mdc-linear-progress__bar-inner{animation:none}.mdc-linear-progress__bar-inner{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E")}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6}.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}:host{display:block}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6;background-color:var(--mdc-linear-progress-buffer-color, #e6e6e6)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E");background-image:var(--mdc-linear-progress-buffering-dots-image, url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E"))}`;let br=class extends mr{};br.styles=yr,br=fr([q("mwc-linear-progress")],br);
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
let vr=class extends le{constructor(){super(...arguments),this.project=void 0,this._project=void 0,this._loading=!0,this._showLoadingBar=!1,this._loadedAtLeastOnce=!1,this._startLoadingBarTime=0}async update(e){e.has("project")&&this._findProjectAndRegister(),super.update(e)}render(){return P`
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

        ${this._loadedAtLeastOnce?b:P`<slot></slot>`}

        <iframe
          src=${hr(this.src)}
          @load=${this._onIframeLoad}
          ?hidden=${!this._loadedAtLeastOnce}
        ></iframe>
      </div>
    `}_findProjectAndRegister(){const e=this._project;this.project instanceof HTMLElement?this._project=this.project:"string"==typeof this.project?this._project=this.getRootNode().getElementById(this.project)||void 0:this._project=void 0,e!==this._project&&(e&&e._unregisterPreview(this),this._project&&this._project._registerPreview(this))}reload(){this._iframe.src="",this._iframe.src=this.src,this._loading=!0,this._startLoadingBar()}_startLoadingBar(){void 0!==this._stopLoadingBarTimerId&&(clearTimeout(this._stopLoadingBarTimerId),this._stopLoadingBarTimerId=void 0),!1===this._showLoadingBar&&(this._showLoadingBar=!0,this._startLoadingBarTime=performance.now())}_stopLoadingBar(){if(!1===this._showLoadingBar)return;const e=performance.now()-this._startLoadingBarTime,t=Math.max(0,500-e);this._stopLoadingBarTimerId=setTimeout((()=>{this._showLoadingBar=!1,this._stopLoadingBarTimerId=void 0}),t)}firstUpdated(){this._loading&&!this._slotHasAnyVisibleChildren()&&this._startLoadingBar()}_slotHasAnyVisibleChildren(){const e=this._slot?.assignedNodes({flatten:!0});if(!e)return!1;for(const t of e)if(t.nodeType!==Node.COMMENT_NODE&&(t.nodeType!==Node.TEXT_NODE||""!==(t.textContent||"").trim()))return!0;return!1}_onReloadClick(){this._loading=!0,this._startLoadingBar(),this._project?.save()}_onIframeLoad(){this.src&&(this._loading=!1,this._loadedAtLeastOnce=!0,this._stopLoadingBar())}};vr.styles=ie`
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
  `,e([Q()],vr.prototype,"src",void 0),e([Q()],vr.prototype,"location",void 0),e([X("iframe")],vr.prototype,"_iframe",void 0),e([X("slot")],vr.prototype,"_slot",void 0),e([Q()],vr.prototype,"project",void 0),e([Y()],vr.prototype,"_loading",void 0),e([Y()],vr.prototype,"_showLoadingBar",void 0),e([Y()],vr.prototype,"_loadedAtLeastOnce",void 0),vr=e([q("playground-preview")],vr);
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
const wr=new Set,kr=new URL("./playground-typescript-worker.js",import.meta.url);let Cr=class extends le{constructor(){super(...arguments),this.sandboxBaseUrl=new URL(".",import.meta.url).href,this.sandboxScope="playground-projects/",this._sessionId=(()=>{let e;do{e=crypto.getRandomValues(new Uint32Array(1))[0].toString(32)}while(wr.has(e));return wr.add(e),e})(),this._compiledFilesPromise=Promise.resolve(void 0),this._editors=new Set,this._previews=new Set,this._saveTimeoutId=void 0}get _normalizedSandboxBaseUrl(){const e=new URL(this.sandboxBaseUrl,document.location.href);return e.pathname=Te(e.pathname),e}get _previewSrc(){if(void 0!==this._serviceWorkerAPI&&void 0!==this._files)return new URL(`${Te(this.sandboxScope)}${this._sessionId}/index.html`,this._normalizedSandboxBaseUrl).href}get _serviceWorkerProxyIframeUrl(){return new URL("playground-service-worker-proxy.html",this._normalizedSandboxBaseUrl).href}update(e){if(e.has("projectSrc")&&this._fetchProject(),e.has("_files"))for(const e of this._editors)e.files=this._files;if(e.has("_serviceWorkerAPI")){const e=this._previewSrc;for(const t of this._previews)t.src=e}super.update(e)}render(){return P`
      <slot @slotchange=${this._slotChange}></slot>
      <iframe
        src=${this._serviceWorkerProxyIframeUrl}
        @load=${this._onServiceWorkerProxyIframeLoad}
      ></iframe>
    `}_slotChange(e){const t=this._slot.assignedElements({flatten:!0}).filter((e=>e.matches("script[type^=sample][filename]")));this._files=t.map((e=>{const t=e.getAttribute("type").substring(7);return{name:e.getAttribute("filename"),label:e.getAttribute("label")||void 0,content:e.textContent.trim().replace("&lt;","<"),contentType:xr(t)}})),this._compileProject()}_registerEditor(e){e.files=this._files,this._editors.add(e)}_unregisterEditor(e){this._editors.delete(e)}_registerPreview(e){e.src=this._previewSrc,this._previews.add(e)}_unregisterPreview(e){this._previews.delete(e)}async _fetchProject(){if(!this.projectSrc)return;const e=new URL(this.projectSrc,document.baseURI),t=await fetch(this.projectSrc),r=await t.json(),o=r.files?Object.keys(r.files):[];this._files=await Promise.all(o.map((async t=>{const o=new URL(t,e),n=await fetch(o.href);if(404===n.status)throw Error("Could not find file "+t);const i=n.headers.get("Content-Type")||void 0;return{name:t,label:r.files[t].label,content:await n.text(),contentType:i}}))),this._compileProject()}firstUpdated(){const e=new Worker(kr);this._typescriptWorkerAPI=me(e)}_onServiceWorkerProxyIframeLoad(){const e=this._iframe.contentWindow;if(!e)throw Error("Unexpected internal error: <playground-project> service worker proxy iframe had no contentWindow");const{port1:t,port2:r}=new MessageChannel;t.addEventListener("message",(e=>this._onNewServiceWorkerPort(e.data))),t.start();const o={port:r,url:"playground-service-worker.js",scope:this.sandboxScope};console.log(this._iframe.src,this._normalizedSandboxBaseUrl.origin),e.postMessage(o,"*",[o.port])}_onNewServiceWorkerPort(e){const t=r=>{2===r.data.initComlink&&(e.removeEventListener("message",t),this._serviceWorkerAPI=me(e),this._serviceWorkerAPI.setFileAPI(ke({getFile:e=>this._getFile(e)}),this._sessionId))};e.addEventListener("message",t),e.start()}async _getFile(e){await this._compiledFilesPromise;const t=new URL(e,window.origin).href,r=this._compiledFiles?.get(t);return void 0!==r?{name:e,label:this._files?.find((t=>t.name===e))?.label,content:r,contentType:"application/javascript"}:this._files?.find((t=>t.name===e))}async _compileProject(){void 0!==this._files&&(this._compiledFilesPromise=this._typescriptWorkerAPI.compileProject(this._files),this._compiledFiles=void 0,this._compiledFiles=await this._compiledFilesPromise)}_clearSaveTimeout(){void 0!==this._saveTimeoutId&&(clearTimeout(this._saveTimeoutId),this._saveTimeoutId=void 0)}saveDebounced(){this._clearSaveTimeout(),this._saveTimeoutId=setTimeout((()=>{this.save()}),500)}async save(){this._clearSaveTimeout(),await this._compileProject();for(const e of this._previews)e.reload()}};Cr.styles=ie`
    iframe {
      display: none;
    }
  `,e([Q({attribute:"project-src"})],Cr.prototype,"projectSrc",void 0),e([Q({attribute:"sandbox-base-url"})],Cr.prototype,"sandboxBaseUrl",void 0),e([Q({attribute:"sandbox-scope"})],Cr.prototype,"sandboxScope",void 0),e([Y()],Cr.prototype,"_files",void 0),e([Y()],Cr.prototype,"_serviceWorkerAPI",void 0),e([X("slot")],Cr.prototype,"_slot",void 0),e([X("iframe")],Cr.prototype,"_iframe",void 0),Cr=e([q("playground-project")],Cr);const xr=e=>{if(void 0!==e)switch(e){case"ts":return"video/mp2t";case"js":return"application/javascript; charset=utf-8";case"html":return"text/html; charset=utf-8";case"css":return"text/css; charset=utf-8"}};
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
 */let Sr=class extends le{constructor(){super(...arguments),this.sandboxBaseUrl=new URL(".",import.meta.url).href,this.sandboxScope="playground-projects/",this.enableAddFile=!1,this.lineNumbers=!1,this.resizable=!1}render(){const e="project";return P`
      <playground-project
        id=${e}
        .projectSrc=${this.projectSrc}
        .sandboxBaseUrl=${this.sandboxBaseUrl}
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
            ></div>`:b}

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
    `}async update(e){e.has("resizable")&&!1===this.resizable&&this._rhs?.style.removeProperty("--playground-preview-width"),super.update(e)}onResizeBarPointerdown({pointerId:e}){const t=this._resizeBar;t.setPointerCapture(e);const r=this._rhs.style,{left:o,right:n}=this.getBoundingClientRect(),i=n-o,a=i-100,l=e=>{const t=Math.min(a,Math.max(100,n-e.clientX))/i*100;r.setProperty("--playground-preview-width",t+"%")};t.addEventListener("pointermove",l);const c=()=>{t.releasePointerCapture(e),t.removeEventListener("pointermove",l),t.removeEventListener("pointerup",c)};t.addEventListener("pointerup",c)}};Sr.styles=ie`
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
  `,e([Q({attribute:"project-src"})],Sr.prototype,"projectSrc",void 0),e([Q({attribute:"sandbox-base-url"})],Sr.prototype,"sandboxBaseUrl",void 0),e([Q({attribute:"sandbox-scope"})],Sr.prototype,"sandboxScope",void 0),e([Q({type:Boolean})],Sr.prototype,"enableAddFile",void 0),e([Q({type:Boolean,attribute:"line-numbers"})],Sr.prototype,"lineNumbers",void 0),e([Q({type:Boolean})],Sr.prototype,"resizable",void 0),e([X("#resizeBar")],Sr.prototype,"_resizeBar",void 0),e([X("#rhs")],Sr.prototype,"_rhs",void 0),Sr=e([q("playground-ide")],Sr);const Tr=[ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
.playground-theme-eclipse {
  --playground-code-comment-color: rgb(63, 127, 95);
  --playground-code-keyword-color: rgb(127, 0, 85);
  --playground-code-meta-color: rgb(255, 23, 23);
  --playground-code-string-color: rgb(42, 0, 255);
  --playground-code-type-color: rgb(0, 0, 192);
  --playground-code-variable-2-color: rgb(0, 0, 192);
  --playground-code-variable-3-color: rgb(0, 0, 192)
}
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
`,ie`
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
function Lr(e){return{type:"checkbox",...e}}function Er(e){return{type:"slider",...e}}function Or(e){return{type:"color",...e}}function Ar(e){return{type:"select",...e}}const _r=e=>e+"px",Mr=[Ar({id:"theme",label:"Theme",section:"code editor",options:["default","3024-day","3024-night","abcdef","ambiance","ayu-dark","ayu-mirage","base16-dark","base16-light","bespin","blackboard","cobalt","colorforth","darcula","dracula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark","hopscotch","icecoder","idea","isotope","lesser-dark","liquibyte","lucario","material-darker","material-ocean","material-palenight","material","mbo","mdn-like","midnight","monokai","moxer","neat","neo","night","nord","oceanic-next","panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue","seti","shadowfox","solarized","ssms","the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight","vibrant-ink","xq-dark","xq-light","yeti","yonce","zenburn"],default:"default"}),Ar({id:"fontFamily",label:"Font",section:"code editor",cssProperty:"--playground-code-font-family",options:["monospace","Roboto Mono","Source Code Pro","Ubuntu Mono"],formatCss:e=>"monospace"!==e?e+", monospace":e,default:"monospace"}),Er({id:"fontSize",label:"Font size",section:"code editor",cssProperty:"--playground-code-font-size",formatCss:_r,min:1,max:30,default:14}),Lr({id:"lineNumbers",label:"Line numbers",section:"code editor",default:!1,htmlAttribute:"line-numbers"}),Or({id:"editorBackground",label:"Background",section:"code editor",cssProperty:"--playground-code-background",formatCss:e=>e+" !important",default:"",unsetLabel:"From theme"}),Or({id:"filePickerBackground",label:"Background",cssProperty:"--playground-file-picker-background",default:"#ffffff",section:"file picker"}),Or({id:"filePickerForeground",label:"Foreground",cssProperty:"--playground-file-picker-foreground-color",default:"#000000",section:"file picker"}),Or({id:"previewToolbarBackground",label:"Background",cssProperty:"--playground-preview-toolbar-background",default:"#ffffff",section:"preview toolbar"}),Or({id:"previewToolbarForeground",label:"Foreground",cssProperty:"--playground-preview-toolbar-foreground-color",default:"#444444",section:"preview toolbar"}),Lr({id:"borders",label:"Borders",cssProperty:"--playground-border",formatCss:e=>e?"1px solid #ddd":"none",default:!0,section:"general"}),Lr({id:"resizable",label:"Resizable",section:"general",default:!1,htmlAttribute:"resizable"}),Or({id:"highlight",label:"Highlight",cssProperty:"--playground-highlight-color",default:"#6200ee",section:"general"}),Er({id:"previewWidth",label:"Preview width",cssProperty:"--playground-preview-width",formatCss:e=>e+"%",min:0,max:100,default:30,section:"general"}),Er({id:"radius",label:"Radius",cssProperty:"border-radius",formatCss:_r,min:0,max:30,default:0,section:"general"}),Er({id:"barHeight",label:"Bar height",cssProperty:"--playground-bar-height",formatCss:_r,min:10,max:100,default:35,section:"general"}),Or({id:"pageBackground",label:"Page background",default:"#cccccc",section:"general"})],Rr={},zr={};for(const e of Mr){Rr[e.id]=e;let t=zr[e.section];void 0===t&&(t=zr[e.section]=[]),t.push(e)}const Nr=Object.keys(Rr),Fr=Object.keys(zr);class Ir{constructor(){this.values=new Map}getValue(e){return this.values.has(e)?this.values.get(e):Rr[e].default}setValue(e,t){this.values.set(e,t)}}
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
 */let Wr=class extends le{constructor(){super(...arguments),this.values=new Ir}connectedCallback(){super.connectedCallback(),this.readUrlParams(new URL(document.location.href).searchParams)}setValue(e,t){this.values.setValue(e,t),this.setUrlParams(),this.requestUpdate()}readUrlParams(e){for(const t of Nr){let r=e.get(t);if(null===r)continue;const o=Rr[t];switch(o.type){case"checkbox":this.setValue(o.id,"y"===r);break;case"color":this.setValue(o.id,"#"+r);break;case"slider":this.setValue(o.id,Number(r));break;case"select":this.setValue(o.id,r);break;default:Pr(0,"Unexpected knob type "+o.type)}}}setUrlParams(){const e=new URLSearchParams;for(const t of Mr){let r=this.values.getValue(t.id);if(r!==t.default)switch(t.type){case"checkbox":e.set(t.id,r?"y":"n");break;case"color":e.set(t.id,r.substring(1));break;case"slider":e.set(t.id,r+"");break;case"select":e.set(t.id,r);break;default:Pr(0,"Unexpected knob type "+t.type)}}history.replaceState(null,"","?"+e.toString())}render(){return P`
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

          ${Kr}
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
    `}get knobs(){return Fr.map((e=>P`<section>
          <h3 class="sectionLabel">${e}</h3>
          <div class="knobs">
            ${zr[e].map((e=>this.knob(e)))}
          </div>
        </section>`))}get htmlText(){return`${this.themeImport}\n<playground-ide${this.htmlTextAttributes}>\n</playground-ide>\n`}get themeImport(){const e=this.values.getValue("theme");return"default"===e?"":`<import rel="stylesheet"\n        src="/node_modules/playground-elements/themes/${e}.css">\n`}get htmlTextAttributes(){const e=[];for(const t of Nr){const r=Rr[t];if(!r.htmlAttribute)continue;const o=this.values.getValue(t);if(o!==r.default)switch(r.type){case"checkbox":o&&e.push(" "+r.htmlAttribute);break;default:e.push(` ${r.htmlAttribute}="${o}"`)}}const t=this.values.getValue("theme");return"default"!==t&&e.push(` class="playground-theme-${t}"`),e.join("")}get cssText(){const e=[];for(const t of Nr){const r=Rr[t];if(!r.cssProperty)continue;const o=this.values.getValue(t);let n=`${r.cssProperty}: ${r.formatCss?r.formatCss(o):o};`;n=o===r.default?`/*${n}*/`:"  "+n,e.push(n)}return`\nplayground-ide {\n${e.join("\n")}\n}\n    `}knob(e){const t=P`<label for=${e.id}>${e.label}</label>`;switch(e.type){case"select":return[t,this.selectKnob(e)];case"slider":return[t,this.sliderKnob(e)];case"color":return[t,this.colorKnob(e)];case"checkbox":return[t,this.checkboxKnob(e)]}return""}selectKnob(e){const t=this.values.getValue(e.id);return P`
      <select
        id=${e.id}
        @input=${t=>{this.setValue(e.id,t.target.value)}}
      >
        ${e.options.map((e=>P`<option value=${e} ?selected=${e===t}>
              ${e}
            </option>`))}
      </select>
    `}sliderKnob(e){const t=this.values.getValue(e.id);return P`
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
    `}colorKnob(e){let t=this.values.getValue(e.id);return P`
      ${"unsetLabel"in e?P`
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
        ?disabled=${""===t}
        @input=${t=>{this.setValue(e.id,t.target.value)}}
      />
    `}checkboxKnob(e){let t=this.values.getValue(e.id);return P`
      <input
        id=${e.id}
        type="checkbox"
        ?checked=${t}
        @change=${t=>{this.setValue(e.id,t.target.checked)}}
      />
    `}};function Pr(e,t){throw Error(t)}Wr.styles=[...Tr,ie`
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
    `],Wr=e([q("playground-configurator")],Wr);const Kr=P`<a
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
  </style>`;export{Wr as PlaygroundConfigurator};
