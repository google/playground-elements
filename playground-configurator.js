var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)};function t(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+r+" is not a constructor or null");function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}var r=function(){return r=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},r.apply(this,arguments)};function o(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a}function i(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],o=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n=window,a=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),s=new WeakMap;let d=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(a&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&s.set(t,e))}return e}toString(){return this.cssText}};const c=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,r,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[o+1]),e[0]);return new d(r,e,l)},u=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return(e=>new d("string"==typeof e?e:e+"",void 0,l))(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var p;const h=window,g=h.trustedTypes,m=g?g.emptyScript:"",f=h.reactiveElementPolyfillSupport,b={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},y=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},x="finalized";let w=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,r)=>{const o=this._$Ep(r,t);void 0!==o&&(this._$Ev.set(o,r),e.push(o))})),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const i=this[e];this[t]=o,this.requestUpdate(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty(x))return!1;this[x]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of t)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(u(e))}else void 0!==e&&t.push(u(e));return t}static _$Ep(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,r;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(r=e.hostConnected)||void 0===r||r.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{a?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const r=document.createElement("style"),o=n.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=t.cssText,e.appendChild(r)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$EO(e,t,r=v){var o;const i=this.constructor._$Ep(e,r);if(void 0!==i&&!0===r.reflect){const n=(void 0!==(null===(o=r.converter)||void 0===o?void 0:o.toAttribute)?r.converter:b).toAttribute(t,r.type);this._$El=e,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$El=null}}_$AK(e,t){var r;const o=this.constructor,i=o._$Ev.get(e);if(void 0!==i&&this._$El!==i){const e=o.getPropertyOptions(i),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(r=e.converter)||void 0===r?void 0:r.fromAttribute)?e.converter:b;this._$El=i,this[i]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,r){let o=!0;void 0!==e&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||y)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===r.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,r))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(r)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var k;w[x]=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:w}),(null!==(p=h.reactiveElementVersions)&&void 0!==p?p:h.reactiveElementVersions=[]).push("1.6.3");const _=window,C=_.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",T=`lit$${(Math.random()+"").slice(9)}$`,A="?"+T,O=`<${A}>`,L=document,M=()=>L.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,F="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,D=/>/g,P=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,U=/"/g,B=/^(?:script|style|textarea|title)$/i,W=(e,...t)=>({_$litType$:1,strings:e,values:t}),K=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),V=new WeakMap,q=L.createTreeWalker(L,129,null,!1);function Z(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const G=(e,t)=>{const r=e.length-1,o=[];let i,n=2===t?"<svg>":"",a=N;for(let t=0;t<r;t++){const r=e[t];let l,s,d=-1,c=0;for(;c<r.length&&(a.lastIndex=c,s=a.exec(r),null!==s);)c=a.lastIndex,a===N?"!--"===s[1]?a=z:void 0!==s[1]?a=D:void 0!==s[2]?(B.test(s[2])&&(i=RegExp("</"+s[2],"g")),a=P):void 0!==s[3]&&(a=P):a===P?">"===s[0]?(a=null!=i?i:N,d=-1):void 0===s[1]?d=-2:(d=a.lastIndex-s[2].length,l=s[1],a=void 0===s[3]?P:'"'===s[3]?U:H):a===U||a===H?a=P:a===z||a===D?a=N:(a=P,i=void 0);const u=a===P&&e[t+1].startsWith("/>")?" ":"";n+=a===N?r+O:d>=0?(o.push(l),r.slice(0,d)+E+r.slice(d)+T+u):r+T+(-2===d?(o.push(void 0),t):u)}return[Z(e,n+(e[r]||"<?>")+(2===t?"</svg>":"")),o]};class J{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let i=0,n=0;const a=e.length-1,l=this.parts,[s,d]=G(e,t);if(this.el=J.createElement(s,r),q.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=q.nextNode())&&l.length<a;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith(E)||t.startsWith(T)){const r=d[n++];if(e.push(t),void 0!==r){const e=o.getAttribute(r.toLowerCase()+E).split(T),t=/([.?@])?(.*)/.exec(r);l.push({type:1,index:i,name:t[2],strings:e,ctor:"."===t[1]?ee:"?"===t[1]?re:"@"===t[1]?oe:$})}else l.push({type:6,index:i})}for(const t of e)o.removeAttribute(t)}if(B.test(o.tagName)){const e=o.textContent.split(T),t=e.length-1;if(t>0){o.textContent=C?C.emptyScript:"";for(let r=0;r<t;r++)o.append(e[r],M()),q.nextNode(),l.push({type:2,index:++i});o.append(e[t],M())}}}else if(8===o.nodeType)if(o.data===A)l.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(T,e+1));)l.push({type:7,index:i}),e+=T.length-1}i++}}static createElement(e,t){const r=L.createElement("template");return r.innerHTML=e,r}}function Q(e,t,r=e,o){var i,n,a,l;if(t===K)return t;let s=void 0!==o?null===(i=r._$Co)||void 0===i?void 0:i[o]:r._$Cl;const d=I(t)?void 0:t._$litDirective$;return(null==s?void 0:s.constructor)!==d&&(null===(n=null==s?void 0:s._$AO)||void 0===n||n.call(s,!1),void 0===d?s=void 0:(s=new d(e),s._$AT(e,r,o)),void 0!==o?(null!==(a=(l=r)._$Co)&&void 0!==a?a:l._$Co=[])[o]=s:r._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,o)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:r},parts:o}=this._$AD,i=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:L).importNode(r,!0);q.currentNode=i;let n=q.nextNode(),a=0,l=0,s=o[0];for(;void 0!==s;){if(a===s.index){let t;2===s.type?t=new X(n,n.nextSibling,this,e):1===s.type?t=new s.ctor(n,s.name,s.strings,this,e):6===s.type&&(t=new ie(n,this,e)),this._$AV.push(t),s=o[++l]}a!==(null==s?void 0:s.index)&&(n=q.nextNode(),a++)}return q.currentNode=L,i}v(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class X{constructor(e,t,r,o){var i;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cp=null===(i=null==o?void 0:o.isConnected)||void 0===i||i}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),I(e)?e===j||null==e||""===e?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>R(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==j&&I(this._$AH)?this._$AA.nextSibling.data=e:this.$(L.createTextNode(e)),this._$AH=e}g(e){var t;const{values:r,_$litType$:o}=e,i="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=J.createElement(Z(o.h,o.h[0]),this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===i)this._$AH.v(r);else{const e=new Y(i,this),t=e.u(this.options);e.v(r),this.$(t),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new J(e)),t}T(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,o=0;for(const i of e)o===t.length?t.push(r=new X(this.k(M()),this.k(M()),this,this.options)):r=t[o],r._$AI(i),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class ${constructor(e,t,r,o,i){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,o){const i=this.strings;let n=!1;if(void 0===i)e=Q(this,e,t,0),n=!I(e)||e!==this._$AH&&e!==K,n&&(this._$AH=e);else{const o=e;let a,l;for(e=i[0],a=0;a<i.length-1;a++)l=Q(this,o[r+a],t,a),l===K&&(l=this._$AH[a]),n||(n=!I(l)||l!==this._$AH[a]),l===j?e=j:e!==j&&(e+=(null!=l?l:"")+i[a+1]),this._$AH[a]=l}n&&!o&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class ee extends ${constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}}const te=C?C.emptyScript:"";class re extends ${constructor(){super(...arguments),this.type=4}j(e){e&&e!==j?this.element.setAttribute(this.name,te):this.element.removeAttribute(this.name)}}class oe extends ${constructor(e,t,r,o,i){super(e,t,r,o,i),this.type=5}_$AI(e,t=this){var r;if((e=null!==(r=Q(this,e,t,0))&&void 0!==r?r:j)===K)return;const o=this._$AH,i=e===j&&o!==j||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==j&&(o===j||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==r?r:this.element,e):this._$AH.handleEvent(e)}}class ie{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ne=_.litHtmlPolyfillSupport;null==ne||ne(J,X),(null!==(k=_.litHtmlVersions)&&void 0!==k?k:_.litHtmlVersions=[]).push("2.8.0");const ae=(e,t,r)=>{var o,i;const n=null!==(o=null==r?void 0:r.renderBefore)&&void 0!==o?o:t;let a=n._$litPart$;if(void 0===a){const e=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:null;n._$litPart$=a=new X(t.insertBefore(M(),e),e,void 0,null!=r?r:{})}return a._$AI(e),a
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */};var le,se;let de=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return K}};de.finalized=!0,de._$litElement$=!0,null===(le=globalThis.litElementHydrateSupport)||void 0===le||le.call(globalThis,{LitElement:de});const ce=globalThis.litElementPolyfillSupport;null==ce||ce({LitElement:de}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:r,elements:o}=t;return{kind:r,elements:o,finisher(t){customElements.define(e,t)}}})(e,t)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,pe=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(r){r.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}},he=(e,t,r)=>{t.constructor.createProperty(r,e)};function ge(e){return(t,r)=>void 0!==r?he(e,t,r):pe(e,t)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function me(e){return ge({...e,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fe=({finisher:e,descriptor:t})=>(r,o)=>{var i;if(void 0===o){const o=null!==(i=r.originalKey)&&void 0!==i?i:r.key,n=null!=t?{kind:"method",placement:"prototype",key:o,descriptor:t(r.key)}:{...r,key:o};return null!=e&&(n.finisher=function(t){e(t,o)}),n}{const i=r.constructor;void 0!==t&&Object.defineProperty(r,o,t(o)),null==e||e(i,o)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function be(e){return fe({finisher:(t,r)=>{Object.assign(t.prototype[r],e)}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ye(e,t){return fe({descriptor:r=>{const o={get(){var t,r;return null!==(r=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==r?r:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof r?Symbol():"__"+r;o.get=function(){var r,o;return void 0===this[t]&&(this[t]=null!==(o=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(e))&&void 0!==o?o:null),this[t]}}return o}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ve(e){return fe({descriptor:t=>({async get(){var t;return await this.updateComplete,null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e)},enumerable:!0,configurable:!0})})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var xe;const we=null!=(null===(xe=window.HTMLSlotElement)||void 0===xe?void 0:xe.prototype.assignedElements)?(e,t)=>e.assignedElements(t):(e,t)=>e.assignedNodes(t).filter((e=>e.nodeType===Node.ELEMENT_NODE));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ke(e,t,r){let o,i=e;return"object"==typeof e?(i=e.slot,o=e):o={flatten:t},r?function(e){const{slot:t,selector:r}=null!=e?e:{};return fe({descriptor:o=>({get(){var o;const i="slot"+(t?`[name=${t}]`:":not([name])"),n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i),a=null!=n?we(n,e):[];return r?a.filter((e=>e.matches(r))):a},enumerable:!0,configurable:!0})})}({slot:i,flatten:t,selector:r}):fe({descriptor:e=>({get(){var e,t;const r="slot"+(i?`[name=${i}]`:":not([name])"),n=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(r);return null!==(t=null==n?void 0:n.assignedNodes(o))&&void 0!==t?t:[]},enumerable:!0,configurable:!0})})}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const _e=Symbol("Comlink.proxy"),Ce=Symbol("Comlink.endpoint"),Se=Symbol("Comlink.releaseProxy"),Ee=Symbol("Comlink.finalizer"),Te=Symbol("Comlink.thrown"),Ae=e=>"object"==typeof e&&null!==e||"function"==typeof e,Oe=new Map([["proxy",{canHandle:e=>Ae(e)&&e[_e],serialize(e){const{port1:t,port2:r}=new MessageChannel;return Le(e,t),[r,[r]]},deserialize:e=>(e.start(),Ie(e))}],["throw",{canHandle:e=>Ae(e)&&Te in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(Error(e.value.message),e.value);throw e.value}}]]);function Le(e,t=globalThis,r=["*"]){t.addEventListener("message",(function o(i){if(!i||!i.data)return;if(!function(e,t){for(const r of e){if(t===r||"*"===r)return!0;if(r instanceof RegExp&&r.test(t))return!0}return!1}(r,i.origin))return void console.warn(`Invalid origin '${i.origin}' for comlink proxy`);const{id:n,type:a,path:l}=Object.assign({path:[]},i.data),s=(i.data.argumentList||[]).map(We);let d;try{const t=l.slice(0,-1).reduce(((e,t)=>e[t]),e),r=l.reduce(((e,t)=>e[t]),e);switch(a){case"GET":d=r;break;case"SET":t[l.slice(-1)[0]]=We(i.data.value),d=!0;break;case"APPLY":d=r.apply(t,s);break;case"CONSTRUCT":d=Ue(new r(...s));break;case"ENDPOINT":{const{port1:t,port2:r}=new MessageChannel;Le(e,r),d=function(e,t){return He.set(e,t),e}(t,[t])}break;case"RELEASE":d=void 0;break;default:return}}catch(e){d={value:e,[Te]:0}}Promise.resolve(d).catch((e=>({value:e,[Te]:0}))).then((r=>{const[i,l]=Be(r);t.postMessage(Object.assign(Object.assign({},i),{id:n}),l),"RELEASE"===a&&(t.removeEventListener("message",o),Me(t),Ee in e&&"function"==typeof e[Ee]&&e[Ee]())})).catch((e=>{const[r,o]=Be({value:new TypeError("Unserializable return value"),[Te]:0});t.postMessage(Object.assign(Object.assign({},r),{id:n}),o)}))})),t.start&&t.start()}function Me(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function Ie(e,t){return De(e,[],t)}function Re(e){if(e)throw Error("Proxy has been released and is not useable")}function Fe(e){return Ke(e,{type:"RELEASE"}).then((()=>{Me(e)}))}const Ne=new WeakMap,ze="FinalizationRegistry"in globalThis&&new FinalizationRegistry((e=>{const t=(Ne.get(e)||0)-1;Ne.set(e,t),0===t&&Fe(e)}));function De(e,t=[],r=function(){}){let o=!1;const i=new Proxy(r,{get(r,n){if(Re(o),n===Se)return()=>{!function(e){ze&&ze.unregister(e)}(i),Fe(e),o=!0};if("then"===n){if(0===t.length)return{then:()=>i};const r=Ke(e,{type:"GET",path:t.map((e=>e.toString()))}).then(We);return r.then.bind(r)}return De(e,[...t,n])},set(r,i,n){Re(o);const[a,l]=Be(n);return Ke(e,{type:"SET",path:[...t,i].map((e=>e.toString())),value:a},l).then(We)},apply(r,i,n){Re(o);const a=t[t.length-1];if(a===Ce)return Ke(e,{type:"ENDPOINT"}).then(We);if("bind"===a)return De(e,t.slice(0,-1));const[l,s]=Pe(n);return Ke(e,{type:"APPLY",path:t.map((e=>e.toString())),argumentList:l},s).then(We)},construct(r,i){Re(o);const[n,a]=Pe(i);return Ke(e,{type:"CONSTRUCT",path:t.map((e=>e.toString())),argumentList:n},a).then(We)}});return function(e,t){const r=(Ne.get(t)||0)+1;Ne.set(t,r),ze&&ze.register(e,t,e)}(i,e),i}function Pe(e){const t=e.map(Be);return[t.map((e=>e[0])),(r=t.map((e=>e[1])),Array.prototype.concat.apply([],r))];var r}const He=new WeakMap;function Ue(e){return Object.assign(e,{[_e]:!0})}function Be(e){for(const[t,r]of Oe)if(r.canHandle(e)){const[o,i]=r.serialize(e);return[{type:"HANDLER",name:t,value:o},i]}return[{type:"RAW",value:e},He.get(e)||[]]}function We(e){switch(e.type){case"HANDLER":return Oe.get(e.name).deserialize(e.value);case"RAW":return e.value}}function Ke(e,t,r){return new Promise((o=>{const i=[,,,,].fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(r){r.data&&r.data.id&&r.data.id===i&&(e.removeEventListener("message",t),o(r.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:i},t),r)}))}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je=e=>e.endsWith("/")?e:e+"/";function Ve(e){return Array.isArray?Array.isArray(e):"[object Array]"===Ye(e)}function qe(e){return"string"==typeof e}function Ze(e){return"number"==typeof e}function Ge(e){return"object"==typeof e}function Je(e){return null!=e}function Qe(e){return!e.trim().length}function Ye(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const Xe=e=>`Missing ${e} property in key`,$e=e=>`Property 'weight' in key '${e}' must be a positive integer`,et=Object.prototype.hasOwnProperty;class tt{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach((e=>{let r=rt(e);this._keys.push(r),this._keyMap[r.id]=r,t+=r.weight})),this._keys.forEach((e=>{e.weight/=t}))}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function rt(e){let t=null,r=null,o=null,i=1,n=null;if(qe(e)||Ve(e))o=e,t=ot(e),r=it(e);else{if(!et.call(e,"name"))throw Error(Xe("name"));const a=e.name;if(o=a,et.call(e,"weight")&&(i=e.weight,i<=0))throw Error($e(a));t=ot(a),r=it(a),n=e.getFn}return{path:t,id:r,weight:i,src:o,getFn:n}}function ot(e){return Ve(e)?e:e.split(".")}function it(e){return Ve(e)?e.join("."):e}const nt={useExtendedSearch:!1,getFn:function(e,t){let r=[],o=!1;const i=(e,t,n)=>{if(Je(e))if(t[n]){const a=e[t[n]];if(!Je(a))return;if(n===t.length-1&&(qe(a)||Ze(a)||function(e){return!0===e||!1===e||function(e){return Ge(e)&&null!==e}(e)&&"[object Boolean]"==Ye(e)}(a)))r.push(function(e){return null==e?"":function(e){if("string"==typeof e)return e;let t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(e)}(a));else if(Ve(a)){o=!0;for(let e=0,r=a.length;e<r;e+=1)i(a[e],t,n+1)}else t.length&&i(a,t,n+1)}else r.push(e)};return i(e,qe(t)?t.split("."):t,0),o?r:r[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var at={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,...nt};const lt=/[^ ]+/g;class st{constructor({getFn:e=at.getFn,fieldNormWeight:t=at.fieldNormWeight}={}){this.norm=function(e=1,t=3){const r=new Map,o=Math.pow(10,t);return{get(t){const i=t.match(lt).length;if(r.has(i))return r.get(i);const n=parseFloat(Math.round(1/Math.pow(i,.5*e)*o)/o);return r.set(i,n),n},clear(){r.clear()}}}(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach(((e,t)=>{this._keysMap[e.id]=t}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,qe(this.docs[0])?this.docs.forEach(((e,t)=>{this._addString(e,t)})):this.docs.forEach(((e,t)=>{this._addObject(e,t)})),this.norm.clear())}add(e){const t=this.size();qe(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,r=this.size();t<r;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!Je(e)||Qe(e))return;let r={v:e,i:t,n:this.norm.get(e)};this.records.push(r)}_addObject(e,t){let r={i:t,$:{}};this.keys.forEach(((t,o)=>{let i=t.getFn?t.getFn(e):this.getFn(e,t.path);if(Je(i))if(Ve(i)){let e=[];const t=[{nestedArrIndex:-1,value:i}];for(;t.length;){const{nestedArrIndex:r,value:o}=t.pop();if(Je(o))if(qe(o)&&!Qe(o)){let t={v:o,i:r,n:this.norm.get(o)};e.push(t)}else Ve(o)&&o.forEach(((e,r)=>{t.push({nestedArrIndex:r,value:e})}))}r.$[o]=e}else if(qe(i)&&!Qe(i)){let e={v:i,n:this.norm.get(i)};r.$[o]=e}})),this.records.push(r)}toJSON(){return{keys:this.keys,records:this.records}}}function dt(e,t,{getFn:r=at.getFn,fieldNormWeight:o=at.fieldNormWeight}={}){const i=new st({getFn:r,fieldNormWeight:o});return i.setKeys(e.map(rt)),i.setSources(t),i.create(),i}function ct(e,{errors:t=0,currentLocation:r=0,expectedLocation:o=0,distance:i=at.distance,ignoreLocation:n=at.ignoreLocation}={}){const a=t/e.length;if(n)return a;const l=Math.abs(o-r);return i?a+l/i:l?1:a}const ut=32;function pt(e){let t={};for(let r=0,o=e.length;r<o;r+=1){const i=e.charAt(r);t[i]=(t[i]||0)|1<<o-r-1}return t}class ht{constructor(e,{location:t=at.location,threshold:r=at.threshold,distance:o=at.distance,includeMatches:i=at.includeMatches,findAllMatches:n=at.findAllMatches,minMatchCharLength:a=at.minMatchCharLength,isCaseSensitive:l=at.isCaseSensitive,ignoreLocation:s=at.ignoreLocation}={}){if(this.options={location:t,threshold:r,distance:o,includeMatches:i,findAllMatches:n,minMatchCharLength:a,isCaseSensitive:l,ignoreLocation:s},this.pattern=l?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const d=(e,t)=>{this.chunks.push({pattern:e,alphabet:pt(e),startIndex:t})},c=this.pattern.length;if(c>ut){let e=0;const t=c%ut,r=c-t;for(;e<r;)d(this.pattern.substr(e,ut),e),e+=ut;if(t){const e=c-ut;d(this.pattern.substr(e),e)}}else d(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:r}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let t={isMatch:!0,score:0};return r&&(t.indices=[[0,e.length-1]]),t}const{location:o,distance:i,threshold:n,findAllMatches:a,minMatchCharLength:l,ignoreLocation:s}=this.options;let d=[],c=0,u=!1;this.chunks.forEach((({pattern:t,alphabet:p,startIndex:h})=>{const{isMatch:g,score:m,indices:f}=function(e,t,r,{location:o=at.location,distance:i=at.distance,threshold:n=at.threshold,findAllMatches:a=at.findAllMatches,minMatchCharLength:l=at.minMatchCharLength,includeMatches:s=at.includeMatches,ignoreLocation:d=at.ignoreLocation}={}){if(t.length>ut)throw Error("Pattern length exceeds max of 32.");const c=t.length,u=e.length,p=Math.max(0,Math.min(o,u));let h=n,g=p;const m=l>1||s,f=m?Array(u):[];let b;for(;(b=e.indexOf(t,g))>-1;){let e=ct(t,{currentLocation:b,expectedLocation:p,distance:i,ignoreLocation:d});if(h=Math.min(e,h),g=b+c,m){let e=0;for(;e<c;)f[b+e]=1,e+=1}}g=-1;let y=[],v=1,x=c+u;const w=1<<c-1;for(let o=0;o<c;o+=1){let n=0,l=x;for(;n<l;)ct(t,{errors:o,currentLocation:p+l,expectedLocation:p,distance:i,ignoreLocation:d})<=h?n=l:x=l,l=Math.floor((x-n)/2+n);x=l;let s=Math.max(1,p-l+1),b=a?u:Math.min(p+l,u)+c,k=Array(b+2);k[b+1]=(1<<o)-1;for(let n=b;n>=s;n-=1){let a=n-1,l=r[e.charAt(a)];if(m&&(f[a]=+!!l),k[n]=(k[n+1]<<1|1)&l,o&&(k[n]|=(y[n+1]|y[n])<<1|1|y[n+1]),k[n]&w&&(v=ct(t,{errors:o,currentLocation:a,expectedLocation:p,distance:i,ignoreLocation:d}),v<=h)){if(h=v,g=a,g<=p)break;s=Math.max(1,2*p-g)}}if(ct(t,{errors:o+1,currentLocation:p,expectedLocation:p,distance:i,ignoreLocation:d})>h)break;y=k}const k={isMatch:g>=0,score:Math.max(.001,v)};if(m){const e=function(e=[],t=at.minMatchCharLength){let r=[],o=-1,i=-1,n=0;for(let a=e.length;n<a;n+=1){let a=e[n];a&&-1===o?o=n:a||-1===o||(i=n-1,i-o+1>=t&&r.push([o,i]),o=-1)}return e[n-1]&&n-o>=t&&r.push([o,n-1]),r}(f,l);e.length?s&&(k.indices=e):k.isMatch=!1}return k}(e,t,p,{location:o+h,distance:i,threshold:n,findAllMatches:a,minMatchCharLength:l,includeMatches:r,ignoreLocation:s});g&&(u=!0),c+=m,g&&f&&(d=[...d,...f])}));let p={isMatch:u,score:u?c/this.chunks.length:1};return u&&r&&(p.indices=d),p}}class gt{constructor(e){this.pattern=e}static isMultiMatch(e){return mt(e,this.multiRegex)}static isSingleMatch(e){return mt(e,this.singleRegex)}search(){}}function mt(e,t){const r=e.match(t);return r?r[1]:null}class ft extends gt{constructor(e,{location:t=at.location,threshold:r=at.threshold,distance:o=at.distance,includeMatches:i=at.includeMatches,findAllMatches:n=at.findAllMatches,minMatchCharLength:a=at.minMatchCharLength,isCaseSensitive:l=at.isCaseSensitive,ignoreLocation:s=at.ignoreLocation}={}){super(e),this._bitapSearch=new ht(e,{location:t,threshold:r,distance:o,includeMatches:i,findAllMatches:n,minMatchCharLength:a,isCaseSensitive:l,ignoreLocation:s})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class bt extends gt{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t,r=0;const o=[],i=this.pattern.length;for(;(t=e.indexOf(this.pattern,r))>-1;)r=t+i,o.push([t,r-1]);const n=!!o.length;return{isMatch:n,score:n?0:1,indices:o}}}const yt=[class extends gt{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},bt,class extends gt{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},class extends gt{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends gt{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends gt{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},class extends gt{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const t=-1===e.indexOf(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},ft],vt=yt.length,xt=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,wt=new Set([ft.type,bt.type]);const kt=[];function _t(e,t){for(let r=0,o=kt.length;r<o;r+=1){let o=kt[r];if(o.condition(e,t))return new o(e,t)}return new ht(e,t)}const Ct="$and",St="$path",Et=e=>!(!e[Ct]&&!e.$or),Tt=e=>({[Ct]:Object.keys(e).map((t=>({[t]:e[t]})))});function At(e,t,{auto:r=!0}={}){const o=e=>{let i=Object.keys(e);const n=(e=>!!e[St])(e);if(!n&&i.length>1&&!Et(e))return o(Tt(e));if((e=>!Ve(e)&&Ge(e)&&!Et(e))(e)){const o=n?e[St]:i[0],a=n?e.$val:e[o];if(!qe(a))throw Error((e=>"Invalid value for key "+e)(o));const l={keyId:it(o),pattern:a};return r&&(l.searcher=_t(a,t)),l}let a={children:[],operator:i[0]};return i.forEach((t=>{const r=e[t];Ve(r)&&r.forEach((e=>{a.children.push(o(e))}))})),a};return Et(e)||(e=Tt(e)),o(e)}function Ot(e,t){const r=e.matches;t.matches=[],Je(r)&&r.forEach((e=>{if(!Je(e.indices)||!e.indices.length)return;const{indices:r,value:o}=e;let i={indices:r,value:o};e.key&&(i.key=e.key.src),e.idx>-1&&(i.refIndex=e.idx),t.matches.push(i)}))}function Lt(e,t){t.score=e.score}class Mt{constructor(e,t={},r){this.options={...at,...t},this.options.useExtendedSearch,this._keyStore=new tt(this.options.keys),this.setCollection(e,r)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof st))throw Error("Incorrect 'index' type");this._myIndex=t||dt(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){Je(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=(()=>!1)){const t=[];for(let r=0,o=this._docs.length;r<o;r+=1){const i=this._docs[r];e(i,r)&&(this.removeAt(r),r-=1,o-=1,t.push(i))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:r,includeScore:o,shouldSort:i,sortFn:n,ignoreFieldNorm:a}=this.options;let l=qe(e)?qe(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(e,{ignoreFieldNorm:t=at.ignoreFieldNorm}){e.forEach((e=>{let r=1;e.matches.forEach((({key:e,norm:o,score:i})=>{const n=e?e.weight:null;r*=Math.pow(0===i&&n?Number.EPSILON:i,(n||1)*(t?1:o))})),e.score=r}))}(l,{ignoreFieldNorm:a}),i&&l.sort(n),Ze(t)&&t>-1&&(l=l.slice(0,t)),function(e,t,{includeMatches:r=at.includeMatches,includeScore:o=at.includeScore}={}){const i=[];return r&&i.push(Ot),o&&i.push(Lt),e.map((e=>{const{idx:r}=e,o={item:t[r],refIndex:r};return i.length&&i.forEach((t=>{t(e,o)})),o}))}(l,this._docs,{includeMatches:r,includeScore:o})}_searchStringList(e){const t=_t(e,this.options),{records:r}=this._myIndex,o=[];return r.forEach((({v:e,i:r,n:i})=>{if(!Je(e))return;const{isMatch:n,score:a,indices:l}=t.searchIn(e);n&&o.push({item:e,idx:r,matches:[{score:a,value:e,norm:i,indices:l}]})})),o}_searchLogical(e){const t=At(e,this.options),r=(e,t,o)=>{if(!e.children){const{keyId:r,searcher:i}=e,n=this._findMatches({key:this._keyStore.get(r),value:this._myIndex.getValueForItemAtKeyId(t,r),searcher:i});return n&&n.length?[{idx:o,item:t,matches:n}]:[]}const i=[];for(let n=0,a=e.children.length;n<a;n+=1){const a=e.children[n],l=r(a,t,o);if(l.length)i.push(...l);else if(e.operator===Ct)return[]}return i},o=this._myIndex.records,i={},n=[];return o.forEach((({$:e,i:o})=>{if(Je(e)){let a=r(t,e,o);a.length&&(i[o]||(i[o]={idx:o,item:e,matches:[]},n.push(i[o])),a.forEach((({matches:e})=>{i[o].matches.push(...e)})))}})),n}_searchObjectList(e){const t=_t(e,this.options),{keys:r,records:o}=this._myIndex,i=[];return o.forEach((({$:e,i:o})=>{if(!Je(e))return;let n=[];r.forEach(((r,o)=>{n.push(...this._findMatches({key:r,value:e[o],searcher:t}))})),n.length&&i.push({idx:o,item:e,matches:n})})),i}_findMatches({key:e,value:t,searcher:r}){if(!Je(t))return[];let o=[];if(Ve(t))t.forEach((({v:t,i,n})=>{if(!Je(t))return;const{isMatch:a,score:l,indices:s}=r.searchIn(t);a&&o.push({score:l,key:e,value:t,idx:i,norm:n,indices:s})}));else{const{v:i,n}=t,{isMatch:a,score:l,indices:s}=r.searchIn(i);a&&o.push({score:l,key:e,value:i,norm:n,indices:s})}return o}}Mt.version="7.0.0",Mt.createIndex=dt,Mt.parseIndex=function(e,{getFn:t=at.getFn,fieldNormWeight:r=at.fieldNormWeight}={}){const{keys:o,records:i}=e,n=new st({getFn:t,fieldNormWeight:r});return n.setKeys(o),n.setIndexRecords(i),n},Mt.config=at,Mt.parseQuery=At,function(...e){kt.push(...e)}(class{constructor(e,{isCaseSensitive:t=at.isCaseSensitive,includeMatches:r=at.includeMatches,minMatchCharLength:o=at.minMatchCharLength,ignoreLocation:i=at.ignoreLocation,findAllMatches:n=at.findAllMatches,location:a=at.location,threshold:l=at.threshold,distance:s=at.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:r,minMatchCharLength:o,findAllMatches:n,ignoreLocation:i,location:a,threshold:l,distance:s},this.pattern=t?e:e.toLowerCase(),this.query=function(e,t={}){return e.split("|").map((e=>{let r=e.trim().split(xt).filter((e=>e&&!!e.trim())),o=[];for(let e=0,i=r.length;e<i;e+=1){const i=r[e];let n=!1,a=-1;for(;!n&&++a<vt;){const e=yt[a];let r=e.isMultiMatch(i);r&&(o.push(new e(r,t)),n=!0)}if(!n)for(a=-1;++a<vt;){const e=yt[a];let r=e.isSingleMatch(i);if(r){o.push(new e(r,t));break}}}return o}))}(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:r,isCaseSensitive:o}=this.options;e=o?e:e.toLowerCase();let i=0,n=[],a=0;for(let o=0,l=t.length;o<l;o+=1){const l=t[o];n.length=0,i=0;for(let t=0,o=l.length;t<o;t+=1){const o=l[t],{isMatch:s,indices:d,score:c}=o.search(e);if(!s){a=0,i=0,n.length=0;break}if(i+=1,a+=c,r){const e=o.constructor.type;wt.has(e)?n=[...n,...d]:n.push(d)}}if(i){let e={isMatch:!0,score:a/i};return r&&(e.indices=n),e}}return{isMatch:!1,score:1}}});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It="0.19.0",Rt="09cd6a4e";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Ft{constructor(){this.settled=!1,this.promise=new Promise(((e,t)=>{this._resolve=e,this._reject=t}))}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt={status:404,body:"Playground file not found"},zt={status:503,body:"Playground build cancelled"};class Dt{constructor(e){this.diagnostics=new Map,this._state="active",this._stateChange=new Ft,this._files=new Map,this._diagnosticsCallback=e}state(){return this._state}get stateChange(){return this._stateChange.promise}cancel(){this._errorPendingFileRequests(zt),this._changeState("cancelled")}async getFile(e){let t=this._files.get(e);if(void 0===t){if("done"===this._state)return Nt;if("cancelled"===this._state)return zt;t=new Ft,this._files.set(e,t)}return t.promise}onOutput(e){if("active"===this._state)if("file"===e.kind)this._onFile(e);else if("diagnostic"===e.kind)this._onDiagnostic(e);else{if("done"!==e.kind)throw Error("Unexpected BuildOutput kind: "+e.kind);this._onDone()}}_changeState(e){this._state=e,this._stateChange.resolve(),this._stateChange=new Ft}_onFile(e){let t=this._files.get(e.file.name);void 0===t&&(t=new Ft,this._files.set(e.file.name,t)),t.resolve(e.file)}_onDiagnostic(e){let t=this.diagnostics.get(e.filename);void 0===t&&(t=[],this.diagnostics.set(e.filename,t)),t.push(e.diagnostic),void 0===this._diagnosticsDebounceId&&(this._diagnosticsDebounceId=requestAnimationFrame((()=>{"cancelled"!==this._state&&(this._diagnosticsDebounceId=void 0,this._diagnosticsCallback())})))}_onDone(){this._errorPendingFileRequests(Nt),this._changeState("done")}_errorPendingFileRequests(e){for(const t of this._files.values())t.settled||t.resolve(e)}}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=new Set;class Ht extends Event{constructor(e=!1){super("filesChanged"),this.projectLoaded=e}}let Ut=class extends de{constructor(){super(...arguments),this._source={type:"none"},this.sandboxBaseUrl=`https://unpkg.com/playground-elements@${It}/`,this.sandboxScope=`__playground_swfs_${Rt}/`,this._modified=!1,this._sessionId=(()=>{let e;do{e=crypto.getRandomValues(new Uint32Array(1))[0].toString(32)}while(Pt.has(e));return Pt.add(e),e})(),this._deferredTypeScriptWorkerApi=new Ft,this._validImportMap={},this.lastSave=Promise.resolve(),this.savePending=!1}get projectSrc(){if("url"===this._source.type)return this._source.url}set projectSrc(e){e?"url"===this._source.type&&this._source.url===e||(this._source={type:"url",url:e}):"url"===this._source.type&&(this._source={type:"none"})}get config(){var e;return{files:Object.fromEntries((null!==(e=this._files)&&void 0!==e?e:[]).map((e=>[e.name,{...e,name:void 0}]))),importMap:this._validImportMap}}set config(e){e?this._source={type:"direct",config:e}:"direct"===this._source.type&&(this._source={type:"none"})}get files(){return this._files}get diagnostics(){var e;return null===(e=this._build)||void 0===e?void 0:e.diagnostics}get modified(){return void 0===this._modified&&(void 0===this._files&&void 0===this._pristineFiles?this._modified=!1:void 0===this._files||void 0===this._pristineFiles?this._modified=!0:this._modified=!Zt(this._files,this._pristineFiles)),this._modified}set _importMap(e){const t=Vt(e);if(t.length>0){for(const e of t)console.error(e);this._validImportMap={}}else this._validImportMap=e}get _importMap(){return this._validImportMap}get _normalizedSandboxBaseUrl(){const e=new URL(this.sandboxBaseUrl,import.meta.url);return e.pathname=je(e.pathname),e}get baseUrl(){if(void 0!==this._serviceWorkerAPI&&void 0!==this._files)return new URL(`${je(this.sandboxScope)}${this._sessionId}/`,this._normalizedSandboxBaseUrl).href}get _serviceWorkerProxyIframeUrl(){return new URL("playground-service-worker-proxy.html#playground-session-id="+this._sessionId,this._normalizedSandboxBaseUrl).href}async update(e){e.has("_source")&&this._loadProjectFromSource(),(e.has("sandboxScope")||e.has("sandboxBaseUrl")||e.has("_serviceWorkerAPI"))&&this.dispatchEvent(new CustomEvent("urlChanged")),super.update(e)}async _loadProjectFromSource(){const e=this._source;switch(e.type){case"none":this._files=void 0,this._importMap={};break;case"direct":{const{files:t,importMap:r}=await Wt(e.config,document.baseURI);if(e!==this._source)return;this._files=t,this._importMap=r}break;case"slot":this._files=e.files,this._importMap=e.importMap;break;case"url":{const{files:t,importMap:r}=await Bt(new URL(e.url,document.baseURI).href);if(e!==this._source)return;this._files=t,this._importMap=r}}this._pristineFiles=this._files&&JSON.parse(JSON.stringify(this._files)),this._modified=!1,this.dispatchEvent(new Ht(!0)),this.save()}render(){return W`
      <slot @slotchange=${this._slotChange}></slot>
      <iframe
        src=${this._serviceWorkerProxyIframeUrl}
        @load=${this._onServiceWorkerProxyIframeLoad}
      ></iframe>
    `}_slotChange(){var e;const{type:t}=this._source;if("none"!==t&&"slot"!==t)return;const r=[];let o;for(const t of this._slot.assignedElements({flatten:!0})){const i=t.getAttribute("type");if(!(null==i?void 0:i.startsWith("sample/")))continue;const n=i.substring(7);let a=null!==(e=t.textContent)&&void 0!==e?e:"";if("html"===n&&(a=a.replace(/&lt;\//g,"</")),t.hasAttribute("preserve-whitespace")||(a=qt(a)),"importmap"===n)try{o=JSON.parse(a)}catch{console.error("Invalid import map JSON",t)}else{const e=t.getAttribute("filename");if(!e)continue;const o=t.getAttribute("label")||void 0,i=t.hasAttribute("selected"),l=jt(n);r.push({name:e,label:o,hidden:t.hasAttribute("hidden"),content:a,contentType:l,selected:i})}}(r.length>0||void 0!==o)&&(this._source={type:"slot",files:r,importMap:null!=o?o:{}})}async firstUpdated(){const e=("cdn.skypack.dev"===(t=new URL("./playground-typescript-worker.js",import.meta.url)).hostname&&(t.pathname=t.pathname.replace(/mode=imports\/(un)?optimized/,"mode=raw")),t);var t;let r;if(e.origin===window.location.origin)r=new Worker(e,{type:"module"});else{const t=await fetch(e.href),o=await t.text(),i=URL.createObjectURL(new Blob([o],{type:"application/javascript"}));r=new Worker(i),URL.revokeObjectURL(i)}this._deferredTypeScriptWorkerApi.resolve(Ie(r))}_onServiceWorkerProxyIframeLoad(){const{port1:e,port2:t}=new MessageChannel;e.addEventListener("message",(e=>{3===e.data.type&&this._onNewServiceWorkerPort(e.data.port)})),e.start(),this._postMessageToServiceWorkerProxyIframe({type:1,scope:this.sandboxScope,port:t},[t])}_onNewServiceWorkerPort(e){const t=r=>{4===r.data.type&&(e.removeEventListener("message",t),r.data.version===Rt?(this._serviceWorkerAPI=Ie(e),this._serviceWorkerAPI.setFileAPI(Ue({getFile:e=>this._getFile(e)}),this._sessionId)):(console.info(`Playground service worker is outdated. Want ${Rt} but got ${r.data.version}. Waiting for update.`),this._postMessageToServiceWorkerProxyIframe({type:6})))};e.addEventListener("message",t),e.start()}_postMessageToServiceWorkerProxyIframe(e,t){const r=this._serviceWorkerProxyIframe.contentWindow;if(!r)throw Error("Unexpected internal error: <playground-project> service worker proxy iframe had no contentWindow");r.postMessage(e,"*",t)}async _getFile(e){return void 0===this._build?{status:503,body:"Playground build not started"}:this._build.getFile(e)}async save(){var e,t;null===(e=this._build)||void 0===e||e.cancel();const r=new Dt((()=>{this.dispatchEvent(new CustomEvent("diagnosticsChanged"))}));this._build=r,this.dispatchEvent(new CustomEvent("compileStart"));const o=await this._deferredTypeScriptWorkerApi.promise;"active"===r.state()&&(o.compileProject(null!==(t=this._files)&&void 0!==t?t:[],{importMap:this._importMap},Ue((e=>r.onOutput(e)))),await r.stateChange,"done"===r.state()&&this.dispatchEvent(new CustomEvent("compileDone")))}async getCompletions(e){var t,r,o;const i=e.tokenUnderCursor.trim();if(!e.isRefinement){const t=await this._deferredTypeScriptWorkerApi.promise,r=await t.getCompletions(e.fileName,e.fileContent,i,e.cursorIndex,{importMap:this._importMap});if(r){const t=this._getCompletionDetails.bind(this);this._completionInfo=function(e,t,r,o){const i=e;return i.entries=null==e?void 0:e.entries.map((e=>({...e,_details:void 0,get details(){return this._details||(this._details=o(t,r,e.name)),this._details}}))),i}(r,e.fileName,e.cursorIndex,t)}}let n=[];return n="."===e.tokenUnderCursor||""===e.tokenUnderCursor?function(e,t=""){var r;return null!==(r=null==e?void 0:e.map((e=>({text:t+e.name,displayText:e.name,score:Number.parseInt(e.sortText),get details(){return e.details}}))))&&void 0!==r?r:[]}(null===(t=this._completionInfo)||void 0===t?void 0:t.entries,e.tokenUnderCursor):
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(e,t){if(!e)return[];const r=new Mt(null!=e?e:[],{threshold:.3,shouldSort:!0,isCaseSensitive:!0,includeScore:!0,includeMatches:!0,keys:["name"],minMatchCharLength:Math.max(t.length/1.2,1)}).search(t).map((e=>{var t;return{text:e.item.name,displayText:e.item.name,score:null!==(t=e.score)&&void 0!==t?t:0,matches:e.matches,get details(){return e.item.details}}})).sort(((e,t)=>e.score===t.score?e.text.localeCompare(t.text):e.score-t.score));return r}(null===(r=this._completionInfo)||void 0===r?void 0:r.entries,i),null===(o=n[0])||void 0===o||o.details,n}async _getCompletionDetails(e,t,r){const o=await this._deferredTypeScriptWorkerApi.promise;return await o.getCompletionItemDetails(e,t,{importMap:this._importMap},r)}async saveDebounced(){this.savePending||(this.savePending=!0,await this.lastSave,this.savePending=!1,this.lastSave=this.save())}isValidNewFilename(e){var t;if(!e)return!1;const r=null===(t=this._files)||void 0===t?void 0:t.find((t=>t.name===e));return void 0===r||!0===r.hidden}editFile(e,t){e.content=t,this._modified=void 0,this.saveDebounced()}addFile(e){var t;if(!this._files||!this.isValidNewFilename(e))return;const r=null===(t=this._files)||void 0===t?void 0:t.find((t=>t.name===e));!0===(null==r?void 0:r.hidden)?r.hidden=!1:this._files.push({name:e,content:"",contentType:Kt(e)}),this._modified=void 0,this.requestUpdate(),this.dispatchEvent(new Ht),this.save()}deleteFile(e){if(!this._files)return;const t=this._files.findIndex((t=>t.name===e));t<0||(this._files=[...this._files.slice(0,t),...this._files.slice(t+1)],this._modified=void 0,this.dispatchEvent(new Ht),this.save())}renameFile(e,t){if(!e||!this._files)return;if(!this.isValidNewFilename(t))return;const r=this._files.find((t=>t.name===e));r&&(r.name=t,r.contentType=Kt(t),this._files=[...this._files],this._modified=void 0,this.dispatchEvent(new Ht),this.save())}};Ut.styles=c`
    iframe {
      display: none;
    }
  `,o([ge({attribute:"project-src",hasChanged:()=>!1})],Ut.prototype,"projectSrc",null),o([ge({attribute:!1,hasChanged:()=>!1})],Ut.prototype,"config",null),o([me()],Ut.prototype,"_source",void 0),o([ge({attribute:"sandbox-base-url"})],Ut.prototype,"sandboxBaseUrl",void 0),o([ge({attribute:"sandbox-scope"})],Ut.prototype,"sandboxScope",void 0),o([me()],Ut.prototype,"_serviceWorkerAPI",void 0),o([ye("slot")],Ut.prototype,"_slot",void 0),o([ye("iframe")],Ut.prototype,"_serviceWorkerProxyIframe",void 0),Ut=o([ue("playground-project")],Ut);const Bt=async(e,t=new Set,r=new Set)=>{if(r.has(e))throw Error("Circular project config extends: "+[...r.values(),e].join(" extends "));r.add(e);const o=await fetch(e);if(200!==o.status)throw Error(`Error ${o.status} fetching project config from ${e}: ${await o.text()}`);let i;try{i=await o.json()}catch(t){throw Error(`Error parsing project config JSON from ${e}: ${t.message}`)}return await Wt(i,e,t,r)},Wt=async(e,t,r=new Set,o=new Set)=>{var i,n,a,l,s;const d=[];for(const[o,l]of Object.entries(null!==(i=e.files)&&void 0!==i?i:{}))r.has(o)||(r.add(o),void 0===l.content?d.push((async()=>{var e,r;const i=await fetch(new URL(o,t).href);return{...l,name:o,content:await i.text(),contentType:null!==(r=null===(e=i.headers.get("Content-Type"))||void 0===e?void 0:e.toLowerCase())&&void 0!==r?r:"text/plain"}})()):d.push(Promise.resolve({...l,name:o,content:null!==(n=l.content)&&void 0!==n?n:"",contentType:null!==(a=Kt(o))&&void 0!==a?a:"text/plain"})));const c=e.extends?Bt(new URL(e.extends,t).href,r,o):void 0,u=await Promise.all(d),p=null!==(l=e.importMap)&&void 0!==l?l:{};if(c){const e=await c;u.push(...e.files),p.imports={...null===(s=e.importMap)||void 0===s?void 0:s.imports,...p.imports}}return{files:u,importMap:p}},Kt=e=>{const t=e.lastIndexOf(".");if(-1===t||t===e.length-1)return;const r=e.slice(t+1);return jt(r)},jt=e=>{if(void 0!==e)switch(e){case"ts":return"video/mp2t";case"js":return"application/javascript; charset=utf-8";case"json":return"application/json; charset=utf-8";case"jsx":return"text/jsx; charset=utf-8";case"tsx":return"text/typescript-jsx; charset=utf-8";case"html":return"text/html; charset=utf-8";case"css":return"text/css; charset=utf-8";case"svg":return"image/svg+xml";case"png":return"image/png";case"gif":return"image/gif";case"jpeg":case"jpg":return"image/jpeg";case"ico":return"image/vnd.microsoft.icon";case"webp":return"image/webp";case"webm":return"video/webm";case"mid":case"midi":return"audio/midi";case"mp3":return"audio/mpeg";case"weba":return"audio/webm"}},Vt=e=>{const t=[];if("object"!=typeof e||null===e)return t.push(`Import map is invalid because it must be an object, but it was ${null===e?"null":typeof e}.`),t;const r=Object.keys(e).filter((e=>"imports"!==e));r.length>0&&t.push(`Invalid import map properties: ${[...r].join(", ")}. Only "imports" are currently supported.`);const o=e.imports;if(void 0===o)return t;if("object"!=typeof o||null===o)return t.push(`Import map "imports" property is invalid because it must be an object, but it was ${null===o?"null":typeof o}.`),t;for(const[e,r]of Object.entries(o))if("string"==typeof r){e.endsWith("/")&&!r.endsWith("/")&&t.push(`Import map key "${e}" is invalid because address "${r}" must end in a forward-slash.`);try{new URL(r)}catch{t.push(`Import map key "${e}" is invalid because address "${r}" is not a valid URL.`)}}else t.push(`Import map key "${e}" is invalid because address must be a string, but was `+(null===r?"null":typeof r));return t},qt=e=>{let t;e=e.replace(/(^[\n\s]*\n)|(\n[\n\s]*$)/g,"");for(const r of e.split(/\n/g)){const e=r.match(/^\s*/)[0].length;(void 0===t||e<t)&&(t=e)}return e.replace(RegExp(`^\\s{${null!=t?t:0}}`,"gm"),"")},Zt=(e,t)=>{if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++){const o=e[r],i=t[r];if(o.name!==i.name||o.contentType!==i.contentType||o.hidden!==i.hidden||o.label!==i.label)return!1}for(let r=0;r<e.length;r++){const o=e[r],i=t[r];if(o.content!==i.content)return!1}return!0};function Gt(e,t){return(e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Jt(e){return{addClass:t=>{e.classList.add(t)},removeClass:t=>{e.classList.remove(t)},hasClass:t=>e.classList.contains(t)}}const Qt=()=>{},Yt={get passive(){return!1}};document.addEventListener("x",Qt,Yt),document.removeEventListener("x",Qt);const Xt=(e=window.document)=>{let t=e.activeElement;const r=[];if(!t)return r;for(;t&&(r.push(t),t.shadowRoot);)t=t.shadowRoot.activeElement;return r},$t=e=>{const t=Xt();if(!t.length)return!1;const r=t[t.length-1],o=new Event("check-if-focused",{bubbles:!0,composed:!0});let i=[];const n=e=>{i=e.composedPath()};return document.body.addEventListener("check-if-focused",n),r.dispatchEvent(o),document.body.removeEventListener("check-if-focused",n),-1!==i.indexOf(e)};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class er extends de{click(){if(this.mdcRoot)return this.mdcRoot.focus(),void this.mdcRoot.click();super.click()}createFoundation(){void 0!==this.mdcFoundation&&this.mdcFoundation.destroy(),this.mdcFoundationClass&&(this.mdcFoundation=new this.mdcFoundationClass(this.createAdapter()),this.mdcFoundation.init())}firstUpdated(){this.createFoundation()}}
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
 */var tr=function(){function e(e){void 0===e&&(e={}),this.adapter=e}return Object.defineProperty(e,"cssClasses",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{}},enumerable:!1,configurable:!0}),e.prototype.init=function(){},e.prototype.destroy=function(){},e}(),rr={BG_FOCUSED:"mdc-ripple-upgraded--background-focused",FG_ACTIVATION:"mdc-ripple-upgraded--foreground-activation",FG_DEACTIVATION:"mdc-ripple-upgraded--foreground-deactivation",ROOT:"mdc-ripple-upgraded",UNBOUNDED:"mdc-ripple-upgraded--unbounded"},or={VAR_FG_SCALE:"--mdc-ripple-fg-scale",VAR_FG_SIZE:"--mdc-ripple-fg-size",VAR_FG_TRANSLATE_END:"--mdc-ripple-fg-translate-end",VAR_FG_TRANSLATE_START:"--mdc-ripple-fg-translate-start",VAR_LEFT:"--mdc-ripple-left",VAR_TOP:"--mdc-ripple-top"},ir={DEACTIVATION_TIMEOUT_MS:225,FG_DEACTIVATION_MS:150,INITIAL_ORIGIN_SCALE:.6,PADDING:10,TAP_DELAY_MS:300},nr=["touchstart","pointerdown","mousedown","keydown"],ar=["touchend","pointerup","mouseup","contextmenu"],lr=[],sr=function(e){function o(t){var i=e.call(this,r(r({},o.defaultAdapter),t))||this;return i.activationAnimationHasEnded=!1,i.activationTimer=0,i.fgDeactivationRemovalTimer=0,i.fgScale="0",i.frame={width:0,height:0},i.initialSize=0,i.layoutFrame=0,i.maxRadius=0,i.unboundedCoords={left:0,top:0},i.activationState=i.defaultActivationState(),i.activationTimerCallback=function(){i.activationAnimationHasEnded=!0,i.runDeactivationUXLogicIfReady()},i.activateHandler=function(e){i.activateImpl(e)},i.deactivateHandler=function(){i.deactivateImpl()},i.focusHandler=function(){i.handleFocus()},i.blurHandler=function(){i.handleBlur()},i.resizeHandler=function(){i.layout()},i}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return rr},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return or},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return ir},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},browserSupportsCssVars:function(){return!0},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},containsEventTarget:function(){return!0},deregisterDocumentInteractionHandler:function(){},deregisterInteractionHandler:function(){},deregisterResizeHandler:function(){},getWindowPageOffset:function(){return{x:0,y:0}},isSurfaceActive:function(){return!0},isSurfaceDisabled:function(){return!0},isUnbounded:function(){return!0},registerDocumentInteractionHandler:function(){},registerInteractionHandler:function(){},registerResizeHandler:function(){},removeClass:function(){},updateCssVariable:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){var e=this,t=this.supportsPressRipple();if(this.registerRootHandlers(t),t){var r=o.cssClasses,i=r.ROOT,n=r.UNBOUNDED;requestAnimationFrame((function(){e.adapter.addClass(i),e.adapter.isUnbounded()&&(e.adapter.addClass(n),e.layoutInternal())}))}},o.prototype.destroy=function(){var e=this;if(this.supportsPressRipple()){this.activationTimer&&(clearTimeout(this.activationTimer),this.activationTimer=0,this.adapter.removeClass(o.cssClasses.FG_ACTIVATION)),this.fgDeactivationRemovalTimer&&(clearTimeout(this.fgDeactivationRemovalTimer),this.fgDeactivationRemovalTimer=0,this.adapter.removeClass(o.cssClasses.FG_DEACTIVATION));var t=o.cssClasses,r=t.ROOT,i=t.UNBOUNDED;requestAnimationFrame((function(){e.adapter.removeClass(r),e.adapter.removeClass(i),e.removeCssVars()}))}this.deregisterRootHandlers(),this.deregisterDeactivationHandlers()},o.prototype.activate=function(e){this.activateImpl(e)},o.prototype.deactivate=function(){this.deactivateImpl()},o.prototype.layout=function(){var e=this;this.layoutFrame&&cancelAnimationFrame(this.layoutFrame),this.layoutFrame=requestAnimationFrame((function(){e.layoutInternal(),e.layoutFrame=0}))},o.prototype.setUnbounded=function(e){var t=o.cssClasses.UNBOUNDED;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.handleFocus=function(){var e=this;requestAnimationFrame((function(){return e.adapter.addClass(o.cssClasses.BG_FOCUSED)}))},o.prototype.handleBlur=function(){var e=this;requestAnimationFrame((function(){return e.adapter.removeClass(o.cssClasses.BG_FOCUSED)}))},o.prototype.supportsPressRipple=function(){return this.adapter.browserSupportsCssVars()},o.prototype.defaultActivationState=function(){return{activationEvent:void 0,hasDeactivationUXRun:!1,isActivated:!1,isProgrammatic:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1}},o.prototype.registerRootHandlers=function(e){var t,r;if(e){try{for(var o=i(nr),n=o.next();!n.done;n=o.next()){var a=n.value;this.adapter.registerInteractionHandler(a,this.activateHandler)}}catch(e){t={error:e}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}this.adapter.isUnbounded()&&this.adapter.registerResizeHandler(this.resizeHandler)}this.adapter.registerInteractionHandler("focus",this.focusHandler),this.adapter.registerInteractionHandler("blur",this.blurHandler)},o.prototype.registerDeactivationHandlers=function(e){var t,r;if("keydown"===e.type)this.adapter.registerInteractionHandler("keyup",this.deactivateHandler);else try{for(var o=i(ar),n=o.next();!n.done;n=o.next()){var a=n.value;this.adapter.registerDocumentInteractionHandler(a,this.deactivateHandler)}}catch(e){t={error:e}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}},o.prototype.deregisterRootHandlers=function(){var e,t;try{for(var r=i(nr),o=r.next();!o.done;o=r.next()){var n=o.value;this.adapter.deregisterInteractionHandler(n,this.activateHandler)}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}this.adapter.deregisterInteractionHandler("focus",this.focusHandler),this.adapter.deregisterInteractionHandler("blur",this.blurHandler),this.adapter.isUnbounded()&&this.adapter.deregisterResizeHandler(this.resizeHandler)},o.prototype.deregisterDeactivationHandlers=function(){var e,t;this.adapter.deregisterInteractionHandler("keyup",this.deactivateHandler);try{for(var r=i(ar),o=r.next();!o.done;o=r.next()){var n=o.value;this.adapter.deregisterDocumentInteractionHandler(n,this.deactivateHandler)}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}},o.prototype.removeCssVars=function(){var e=this,t=o.strings;Object.keys(t).forEach((function(r){0===r.indexOf("VAR_")&&e.adapter.updateCssVariable(t[r],null)}))},o.prototype.activateImpl=function(e){var t=this;if(!this.adapter.isSurfaceDisabled()){var r=this.activationState;if(!r.isActivated){var o=this.previousActivationEvent;o&&void 0!==e&&o.type!==e.type||(r.isActivated=!0,r.isProgrammatic=void 0===e,r.activationEvent=e,r.wasActivatedByPointer=!r.isProgrammatic&&void 0!==e&&("mousedown"===e.type||"touchstart"===e.type||"pointerdown"===e.type),void 0!==e&&lr.length>0&&lr.some((function(e){return t.adapter.containsEventTarget(e)}))?this.resetActivationState():(void 0!==e&&(lr.push(e.target),this.registerDeactivationHandlers(e)),r.wasElementMadeActive=this.checkElementMadeActive(e),r.wasElementMadeActive&&this.animateActivation(),requestAnimationFrame((function(){lr=[],r.wasElementMadeActive||void 0===e||" "!==e.key&&32!==e.keyCode||(r.wasElementMadeActive=t.checkElementMadeActive(e),r.wasElementMadeActive&&t.animateActivation()),r.wasElementMadeActive||(t.activationState=t.defaultActivationState())}))))}}},o.prototype.checkElementMadeActive=function(e){return void 0===e||"keydown"!==e.type||this.adapter.isSurfaceActive()},o.prototype.animateActivation=function(){var e=this,t=o.strings,r=t.VAR_FG_TRANSLATE_START,i=t.VAR_FG_TRANSLATE_END,n=o.cssClasses,a=n.FG_DEACTIVATION,l=n.FG_ACTIVATION,s=o.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal();var d="",c="";if(!this.adapter.isUnbounded()){var u=this.getFgTranslationCoordinates(),p=u.startPoint,h=u.endPoint;d=p.x+"px, "+p.y+"px",c=h.x+"px, "+h.y+"px"}this.adapter.updateCssVariable(r,d),this.adapter.updateCssVariable(i,c),clearTimeout(this.activationTimer),clearTimeout(this.fgDeactivationRemovalTimer),this.rmBoundedActivationClasses(),this.adapter.removeClass(a),this.adapter.computeBoundingRect(),this.adapter.addClass(l),this.activationTimer=setTimeout((function(){e.activationTimerCallback()}),s)},o.prototype.getFgTranslationCoordinates=function(){var e,t=this.activationState,r=t.activationEvent;return e=t.wasActivatedByPointer?function(e,t,r){if(!e)return{x:0,y:0};var o,i,n=t.x,a=t.y,l=n+r.left,s=a+r.top;if("touchstart"===e.type){var d=e;o=d.changedTouches[0].pageX-l,i=d.changedTouches[0].pageY-s}else{var c=e;o=c.pageX-l,i=c.pageY-s}return{x:o,y:i}}
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
 */(r,this.adapter.getWindowPageOffset(),this.adapter.computeBoundingRect()):{x:this.frame.width/2,y:this.frame.height/2},{startPoint:e={x:e.x-this.initialSize/2,y:e.y-this.initialSize/2},endPoint:{x:this.frame.width/2-this.initialSize/2,y:this.frame.height/2-this.initialSize/2}}},o.prototype.runDeactivationUXLogicIfReady=function(){var e=this,t=o.cssClasses.FG_DEACTIVATION,r=this.activationState,i=r.hasDeactivationUXRun,n=r.isActivated;(i||!n)&&this.activationAnimationHasEnded&&(this.rmBoundedActivationClasses(),this.adapter.addClass(t),this.fgDeactivationRemovalTimer=setTimeout((function(){e.adapter.removeClass(t)}),ir.FG_DEACTIVATION_MS))},o.prototype.rmBoundedActivationClasses=function(){var e=o.cssClasses.FG_ACTIVATION;this.adapter.removeClass(e),this.activationAnimationHasEnded=!1,this.adapter.computeBoundingRect()},o.prototype.resetActivationState=function(){var e=this;this.previousActivationEvent=this.activationState.activationEvent,this.activationState=this.defaultActivationState(),setTimeout((function(){return e.previousActivationEvent=void 0}),o.numbers.TAP_DELAY_MS)},o.prototype.deactivateImpl=function(){var e=this,t=this.activationState;if(t.isActivated){var o=r({},t);t.isProgrammatic?(requestAnimationFrame((function(){e.animateDeactivation(o)})),this.resetActivationState()):(this.deregisterDeactivationHandlers(),requestAnimationFrame((function(){e.activationState.hasDeactivationUXRun=!0,e.animateDeactivation(o),e.resetActivationState()})))}},o.prototype.animateDeactivation=function(e){var t=e.wasActivatedByPointer,r=e.wasElementMadeActive;(t||r)&&this.runDeactivationUXLogicIfReady()},o.prototype.layoutInternal=function(){this.frame=this.adapter.computeBoundingRect();var e=Math.max(this.frame.height,this.frame.width);this.maxRadius=this.adapter.isUnbounded()?e:Math.sqrt(Math.pow(this.frame.width,2)+Math.pow(this.frame.height,2))+o.numbers.PADDING;var t=Math.floor(e*o.numbers.INITIAL_ORIGIN_SCALE);this.adapter.isUnbounded()&&t%2!=0?this.initialSize=t-1:this.initialSize=t,this.fgScale=""+this.maxRadius/this.initialSize,this.updateLayoutCssVars()},o.prototype.updateLayoutCssVars=function(){var e=o.strings,t=e.VAR_FG_SIZE,r=e.VAR_LEFT,i=e.VAR_TOP,n=e.VAR_FG_SCALE;this.adapter.updateCssVariable(t,this.initialSize+"px"),this.adapter.updateCssVariable(n,this.fgScale),this.adapter.isUnbounded()&&(this.unboundedCoords={left:Math.round(this.frame.width/2-this.initialSize/2),top:Math.round(this.frame.height/2-this.initialSize/2)},this.adapter.updateCssVariable(r,this.unboundedCoords.left+"px"),this.adapter.updateCssVariable(i,this.unboundedCoords.top+"px"))},o}(tr),dr=sr;
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
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const cr=e=>(...t)=>({_$litDirective$:e,values:t});let ur=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pr=cr(class extends ur{constructor(e){var t;if(super(e),1!==e.type||"class"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){var r,o;if(void 0===this.it){this.it=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((e=>""!==e))));for(const e in t)t[e]&&!(null===(r=this.nt)||void 0===r?void 0:r.has(e))&&this.it.add(e);return this.render(t)}const i=e.element.classList;this.it.forEach((e=>{e in t||(i.remove(e),this.it.delete(e))}));for(const e in t){const r=!!t[e];r===this.it.has(e)||(null===(o=this.nt)||void 0===o?void 0:o.has(e))||(r?(i.add(e),this.it.add(e)):(i.remove(e),this.it.delete(e)))}return K}}),hr="important",gr=" !"+hr,mr=cr(class extends ur{constructor(e){var t;if(super(e),1!==e.type||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,r)=>{const o=e[r];return null==o?t:t+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(e,[t]){const{style:r}=e.element;if(void 0===this.ht){this.ht=new Set;for(const e in t)this.ht.add(e);return this.render(t)}this.ht.forEach((e=>{null==t[e]&&(this.ht.delete(e),e.includes("-")?r.removeProperty(e):r[e]="")}));for(const e in t){const o=t[e];if(null!=o){this.ht.add(e);const t="string"==typeof o&&o.endsWith(gr);e.includes("-")||t?r.setProperty(e,t?o.slice(0,-11):o,t?hr:""):r[e]=o}}return K}});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class fr extends er{constructor(){super(...arguments),this.primary=!1,this.accent=!1,this.unbounded=!1,this.disabled=!1,this.activated=!1,this.selected=!1,this.internalUseStateLayerCustomProperties=!1,this.hovering=!1,this.bgFocused=!1,this.fgActivation=!1,this.fgDeactivation=!1,this.fgScale="",this.fgSize="",this.translateStart="",this.translateEnd="",this.leftPos="",this.topPos="",this.mdcFoundationClass=dr}get isActive(){return Gt(this.parentElement||this,":active")}createAdapter(){return{browserSupportsCssVars:()=>!0,isUnbounded:()=>this.unbounded,isSurfaceActive:()=>this.isActive,isSurfaceDisabled:()=>this.disabled,addClass:e=>{switch(e){case"mdc-ripple-upgraded--background-focused":this.bgFocused=!0;break;case"mdc-ripple-upgraded--foreground-activation":this.fgActivation=!0;break;case"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation=!0}},removeClass:e=>{switch(e){case"mdc-ripple-upgraded--background-focused":this.bgFocused=!1;break;case"mdc-ripple-upgraded--foreground-activation":this.fgActivation=!1;break;case"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation=!1}},containsEventTarget:()=>!0,registerInteractionHandler:()=>{},deregisterInteractionHandler:()=>{},registerDocumentInteractionHandler:()=>{},deregisterDocumentInteractionHandler:()=>{},registerResizeHandler:()=>{},deregisterResizeHandler:()=>{},updateCssVariable:(e,t)=>{switch(e){case"--mdc-ripple-fg-scale":this.fgScale=t;break;case"--mdc-ripple-fg-size":this.fgSize=t;break;case"--mdc-ripple-fg-translate-end":this.translateEnd=t;break;case"--mdc-ripple-fg-translate-start":this.translateStart=t;break;case"--mdc-ripple-left":this.leftPos=t;break;case"--mdc-ripple-top":this.topPos=t}},computeBoundingRect:()=>(this.parentElement||this).getBoundingClientRect(),getWindowPageOffset:()=>({x:window.pageXOffset,y:window.pageYOffset})}}startPress(e){this.waitForFoundation((()=>{this.mdcFoundation.activate(e)}))}endPress(){this.waitForFoundation((()=>{this.mdcFoundation.deactivate()}))}startFocus(){this.waitForFoundation((()=>{this.mdcFoundation.handleFocus()}))}endFocus(){this.waitForFoundation((()=>{this.mdcFoundation.handleBlur()}))}startHover(){this.hovering=!0}endHover(){this.hovering=!1}waitForFoundation(e){this.mdcFoundation?e():this.updateComplete.then(e)}update(e){e.has("disabled")&&this.disabled&&this.endHover(),super.update(e)}render(){const e=this.activated&&(this.primary||!this.accent),t=this.selected&&(this.primary||!this.accent),r={"mdc-ripple-surface--accent":this.accent,"mdc-ripple-surface--primary--activated":e,"mdc-ripple-surface--accent--activated":this.accent&&this.activated,"mdc-ripple-surface--primary--selected":t,"mdc-ripple-surface--accent--selected":this.accent&&this.selected,"mdc-ripple-surface--disabled":this.disabled,"mdc-ripple-surface--hover":this.hovering,"mdc-ripple-surface--primary":this.primary,"mdc-ripple-surface--selected":this.selected,"mdc-ripple-upgraded--background-focused":this.bgFocused,"mdc-ripple-upgraded--foreground-activation":this.fgActivation,"mdc-ripple-upgraded--foreground-deactivation":this.fgDeactivation,"mdc-ripple-upgraded--unbounded":this.unbounded,"mdc-ripple-surface--internal-use-state-layer-custom-properties":this.internalUseStateLayerCustomProperties};return W`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${pr(r)}"
          style="${mr({"--mdc-ripple-fg-scale":this.fgScale,"--mdc-ripple-fg-size":this.fgSize,"--mdc-ripple-fg-translate-end":this.translateEnd,"--mdc-ripple-fg-translate-start":this.translateStart,"--mdc-ripple-left":this.leftPos,"--mdc-ripple-top":this.topPos})}"></div>`}}o([ye(".mdc-ripple-surface")],fr.prototype,"mdcRoot",void 0),o([ge({type:Boolean})],fr.prototype,"primary",void 0),o([ge({type:Boolean})],fr.prototype,"accent",void 0),o([ge({type:Boolean})],fr.prototype,"unbounded",void 0),o([ge({type:Boolean})],fr.prototype,"disabled",void 0),o([ge({type:Boolean})],fr.prototype,"activated",void 0),o([ge({type:Boolean})],fr.prototype,"selected",void 0),o([ge({type:Boolean})],fr.prototype,"internalUseStateLayerCustomProperties",void 0),o([me()],fr.prototype,"hovering",void 0),o([me()],fr.prototype,"bgFocused",void 0),o([me()],fr.prototype,"fgActivation",void 0),o([me()],fr.prototype,"fgDeactivation",void 0),o([me()],fr.prototype,"fgScale",void 0),o([me()],fr.prototype,"fgSize",void 0),o([me()],fr.prototype,"translateStart",void 0),o([me()],fr.prototype,"translateEnd",void 0),o([me()],fr.prototype,"leftPos",void 0),o([me()],fr.prototype,"topPos",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const br=c`.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface:hover::before,.mdc-ripple-surface.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}:host .mdc-ripple-surface{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;will-change:unset}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary:hover::before,.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before,.mdc-ripple-surface--primary--activated::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--activated:hover::before,.mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--primary--selected::before,.mdc-ripple-surface--primary--selected::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--selected:hover::before,.mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent:hover::before,.mdc-ripple-surface--accent.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before,.mdc-ripple-surface--accent--activated::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--activated:hover::before,.mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--accent--selected::before,.mdc-ripple-surface--accent--selected::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--selected:hover::before,.mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--disabled{opacity:0}.mdc-ripple-surface--internal-use-state-layer-custom-properties::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties::after{background-color:#000;background-color:var(--mdc-ripple-hover-state-layer-color, #000)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:hover::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-state-layer-opacity, 0.04)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}`
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let yr=class extends fr{};function vr(e,t,r){if(void 0!==t)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
return function(e,t,r){const o=e.constructor;if(!r){const e="__"+t;if(!(r=o.getPropertyDescriptor(t,e)))throw Error("@ariaProperty must be used after a @property decorator")}const i=r;let n="";if(!i.set)throw Error("@ariaProperty requires a setter for "+t);if(e.dispatchWizEvent)return r;const a={configurable:!0,enumerable:!0,set(e){if(""===n){const e=o.getPropertyOptions(t);n="string"==typeof e.attribute?e.attribute:t}this.hasAttribute(n)&&this.removeAttribute(n),i.set.call(this,e)}};return i.get&&(a.get=function(){return i.get.call(this)}),a}(e,t,r);throw Error("@ariaProperty only supports TypeScript Decorators")}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */yr.styles=[br],yr=o([ue("mwc-ripple")],yr);class xr{constructor(e){this.startPress=t=>{e().then((e=>{e&&e.startPress(t)}))},this.endPress=()=>{e().then((e=>{e&&e.endPress()}))},this.startFocus=()=>{e().then((e=>{e&&e.startFocus()}))},this.endFocus=()=>{e().then((e=>{e&&e.endFocus()}))},this.startHover=()=>{e().then((e=>{e&&e.startHover()}))},this.endHover=()=>{e().then((e=>{e&&e.endHover()}))}}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wr=e=>null!=e?e:j
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;class kr extends de{constructor(){super(...arguments),this.disabled=!1,this.icon="",this.shouldRenderRipple=!1,this.rippleHandlers=new xr((()=>(this.shouldRenderRipple=!0,this.ripple)))}renderRipple(){return this.shouldRenderRipple?W`
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>`:""}focus(){const e=this.buttonElement;e&&(this.rippleHandlers.startFocus(),e.focus())}blur(){const e=this.buttonElement;e&&(this.rippleHandlers.endFocus(),e.blur())}render(){return W`<button
        class="mdc-icon-button mdc-icon-button--display-flex"
        aria-label="${this.ariaLabel||this.icon}"
        aria-haspopup="${wr(this.ariaHasPopup)}"
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
    ${this.icon?W`<i class="material-icons">${this.icon}</i>`:""}
    <span
      ><slot></slot
    ></span>
  </button>`}handleRippleMouseDown(e){const t=()=>{window.removeEventListener("mouseup",t),this.handleRippleDeactivate()};window.addEventListener("mouseup",t),this.rippleHandlers.startPress(e)}handleRippleTouchStart(e){this.rippleHandlers.startPress(e)}handleRippleDeactivate(){this.rippleHandlers.endPress()}handleRippleMouseEnter(){this.rippleHandlers.startHover()}handleRippleMouseLeave(){this.rippleHandlers.endHover()}handleRippleFocus(){this.rippleHandlers.startFocus()}handleRippleBlur(){this.rippleHandlers.endFocus()}}o([ge({type:Boolean,reflect:!0})],kr.prototype,"disabled",void 0),o([ge({type:String})],kr.prototype,"icon",void 0),o([vr,ge({type:String,attribute:"aria-label"})],kr.prototype,"ariaLabel",void 0),o([vr,ge({type:String,attribute:"aria-haspopup"})],kr.prototype,"ariaHasPopup",void 0),o([ye("button")],kr.prototype,"buttonElement",void 0),o([ve("mwc-ripple")],kr.prototype,"ripple",void 0),o([me()],kr.prototype,"shouldRenderRipple",void 0),o([be({passive:!0})],kr.prototype,"handleRippleMouseDown",null),o([be({passive:!0})],kr.prototype,"handleRippleTouchStart",null);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const _r=c`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button .mdc-icon-button__focus-ring{display:none}.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{display:block;max-height:48px;max-width:48px}@media screen and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring::after,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring::after{content:"";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring::after,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring::after{border-color:CanvasText}}.mdc-icon-button.mdc-icon-button--reduced-size .mdc-icon-button__ripple{width:40px;height:40px;margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-icon-button.mdc-icon-button--reduced-size.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button.mdc-icon-button--reduced-size:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{max-height:40px;max-width:40px}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button__link{height:100%;left:0;outline:none;position:absolute;top:0;width:100%}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button__link{height:100%;left:0;outline:none;position:absolute;top:0;width:100%}:host{display:inline-block;outline:none}:host([disabled]){pointer-events:none}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block}:host{--mdc-ripple-color: currentcolor;-webkit-tap-highlight-color:transparent}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc( (var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2 )}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let Cr=class extends kr{};Cr.styles=[_r],Cr=o([ue("mwc-icon-button")],Cr);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Sr=class extends de{constructor(){super(...arguments),this._tabs=[],this._active=void 0}get active(){return this._active}set active(e){const t=this._active;e!==t&&(this._active=e,void 0!==t&&(t.active=!1),void 0!==e?e.active=!0:this.dispatchEvent(new CustomEvent("tabchange",{detail:{tab:void 0},bubbles:!0})))}render(){return W`
      <div role="tablist" aria-label=${wr(this.label)}>
        <slot
          @slotchange=${this._onSlotchange}
          @click=${this._activateTab}
          @keydown=${this._onKeydown}
          @tabchange=${this._activateTab}
        ></slot>
      </div>
    `}_onSlotchange(e){let t;this._tabs=e.target.assignedElements();for(let e=0;e<this._tabs.length;e++){const r=this._tabs[e];r.index=e,void 0!==t?r.active=!1:(r.active||r.hasAttribute("active"))&&(t=r)}this.active=t}_activateTab(e){const t=this._findEventTab(e);void 0!==t&&(this.active=t,this._scrollTabIntoViewIfNeeded(t))}_scrollTabIntoViewIfNeeded(e){const t=this.getBoundingClientRect(),r=e.getBoundingClientRect();if(r.left-48<t.left||r.right+48>t.right){const e=r.left-t.left+this.scrollLeft-t.width/2+r.width/2;this.scroll({left:e,behavior:"smooth"})}}async _onKeydown(e){var t,r;const o=null!==(r=null===(t=this.active)||void 0===t?void 0:t.index)&&void 0!==r?r:0,i=this._tabs.length-1;let n=o;switch(e.key){case"ArrowLeft":0===o?n=i:n--;break;case"ArrowRight":o===i?n=0:n++;break;case"Home":n=0;break;case"End":n=i}if(n!==o){e.preventDefault();const t=this._tabs[n];this.active=t,await t.updateComplete,t.focus()}}_findEventTab(e){const t=e.target;if("playground-internal-tab"===(null==t?void 0:t.localName))return e.target;for(const t of e.composedPath())if("playground-internal-tab"===(null==t?void 0:t.localName))return t}};Sr.styles=c`
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
  `,o([ge()],Sr.prototype,"label",void 0),Sr=o([ue("playground-internal-tab-bar")],Sr);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Er=class extends de{constructor(){super(...arguments),this.active=!1,this.index=0}render(){return W`<button
      role="tab"
      part="button"
      aria-selected=${this.active?"true":"false"}
      tabindex=${this.active?"0":"-1"}
    >
      <slot></slot>
    </button>`}updated(e){e.has("active")&&this.active&&this.dispatchEvent(new CustomEvent("tabchange",{detail:{tab:this},bubbles:!0}))}focus(){this._button.focus()}};Er.styles=c`
    :host {
      display: flex;
    }

    button {
      flex: 1;
      border: none;
      font-size: inherit;
      font-family: inherit;
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

    :host([active]) > button::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: var(
        --playground-tab-bar-indicator-color,
        var(--playground-highlight-color, #6200ee)
      );
    }
  `,o([ge({type:Boolean,reflect:!0})],Er.prototype,"active",void 0),o([ye("button")],Er.prototype,"_button",void 0),Er=o([ue("playground-internal-tab")],Er);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Tr=e=>(t,r)=>{if(t.constructor._observers){if(!t.constructor.hasOwnProperty("_observers")){const e=t.constructor._observers;t.constructor._observers=new Map,e.forEach(((e,r)=>t.constructor._observers.set(r,e)))}}else{t.constructor._observers=new Map;const e=t.updated;t.updated=function(t){e.call(this,t),t.forEach(((e,t)=>{const r=this.constructor._observers.get(t);void 0!==r&&r.call(this,this[t],e)}))}}t.constructor._observers.set(r,e)}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;class Ar extends de{constructor(){super(...arguments),this.value="",this.group=null,this.tabindex=-1,this.disabled=!1,this.twoline=!1,this.activated=!1,this.graphic=null,this.multipleGraphics=!1,this.hasMeta=!1,this.noninteractive=!1,this.selected=!1,this.shouldRenderRipple=!1,this._managingList=null,this.boundOnClick=this.onClick.bind(this),this._firstChanged=!0,this._skipPropRequest=!1,this.rippleHandlers=new xr((()=>(this.shouldRenderRipple=!0,this.ripple))),this.listeners=[{target:this,eventNames:["click"],cb:()=>{this.onClick()}},{target:this,eventNames:["mouseenter"],cb:this.rippleHandlers.startHover},{target:this,eventNames:["mouseleave"],cb:this.rippleHandlers.endHover},{target:this,eventNames:["focus"],cb:this.rippleHandlers.startFocus},{target:this,eventNames:["blur"],cb:this.rippleHandlers.endFocus},{target:this,eventNames:["mousedown","touchstart"],cb:e=>{const t=e.type;this.onDown("mousedown"===t?"mouseup":"touchend",e)}}]}get text(){const e=this.textContent;return e?e.trim():""}render(){const e=this.renderText(),t=this.graphic?this.renderGraphic():W``,r=this.hasMeta?this.renderMeta():W``;return W`
      ${this.renderRipple()}
      ${t}
      ${e}
      ${r}`}renderRipple(){return this.shouldRenderRipple?W`
      <mwc-ripple
        .activated=${this.activated}>
      </mwc-ripple>`:this.activated?W`<div class="fake-activated-ripple"></div>`:""}renderGraphic(){const e={multi:this.multipleGraphics};return W`
      <span class="mdc-deprecated-list-item__graphic material-icons ${pr(e)}">
        <slot name="graphic"></slot>
      </span>`}renderMeta(){return W`
      <span class="mdc-deprecated-list-item__meta material-icons">
        <slot name="meta"></slot>
      </span>`}renderText(){const e=this.twoline?this.renderTwoline():this.renderSingleLine();return W`
      <span class="mdc-deprecated-list-item__text">
        ${e}
      </span>`}renderSingleLine(){return W`<slot></slot>`}renderTwoline(){return W`
      <span class="mdc-deprecated-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="mdc-deprecated-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `}onClick(){this.fireRequestSelected(!this.selected,"interaction")}onDown(e,t){const r=()=>{window.removeEventListener(e,r),this.rippleHandlers.endPress()};window.addEventListener(e,r),this.rippleHandlers.startPress(t)}fireRequestSelected(e,t){if(this.noninteractive)return;const r=new CustomEvent("request-selected",{bubbles:!0,composed:!0,detail:{source:t,selected:e}});this.dispatchEvent(r)}connectedCallback(){super.connectedCallback(),this.noninteractive||this.setAttribute("mwc-list-item","");for(const e of this.listeners)for(const t of e.eventNames)e.target.addEventListener(t,e.cb,{passive:!0})}disconnectedCallback(){super.disconnectedCallback();for(const e of this.listeners)for(const t of e.eventNames)e.target.removeEventListener(t,e.cb);this._managingList&&(this._managingList.debouncedLayout?this._managingList.debouncedLayout(!0):this._managingList.layout(!0))}firstUpdated(){const e=new Event("list-item-rendered",{bubbles:!0,composed:!0});this.dispatchEvent(e)}}o([ye("slot")],Ar.prototype,"slotElement",void 0),o([ve("mwc-ripple")],Ar.prototype,"ripple",void 0),o([ge({type:String})],Ar.prototype,"value",void 0),o([ge({type:String,reflect:!0})],Ar.prototype,"group",void 0),o([ge({type:Number,reflect:!0})],Ar.prototype,"tabindex",void 0),o([ge({type:Boolean,reflect:!0}),Tr((function(e){e?this.setAttribute("aria-disabled","true"):this.setAttribute("aria-disabled","false")}))],Ar.prototype,"disabled",void 0),o([ge({type:Boolean,reflect:!0})],Ar.prototype,"twoline",void 0),o([ge({type:Boolean,reflect:!0})],Ar.prototype,"activated",void 0),o([ge({type:String,reflect:!0})],Ar.prototype,"graphic",void 0),o([ge({type:Boolean})],Ar.prototype,"multipleGraphics",void 0),o([ge({type:Boolean})],Ar.prototype,"hasMeta",void 0),o([ge({type:Boolean,reflect:!0}),Tr((function(e){e?(this.removeAttribute("aria-checked"),this.removeAttribute("mwc-list-item"),this.selected=!1,this.activated=!1,this.tabIndex=-1):this.setAttribute("mwc-list-item","")}))],Ar.prototype,"noninteractive",void 0),o([ge({type:Boolean,reflect:!0}),Tr((function(e){const t=this.getAttribute("role"),r="gridcell"===t||"option"===t||"row"===t||"tab"===t;r&&e?this.setAttribute("aria-selected","true"):r&&this.setAttribute("aria-selected","false"),this._firstChanged?this._firstChanged=!1:this._skipPropRequest||this.fireRequestSelected(e,"property")}))],Ar.prototype,"selected",void 0),o([me()],Ar.prototype,"shouldRenderRipple",void 0),o([me()],Ar.prototype,"_managingList",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const Or=c`:host{cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;height:48px;display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mdc-list-side-padding, 16px);padding-right:var(--mdc-list-side-padding, 16px);outline:none;height:48px;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host:focus{outline:none}:host([activated]){color:#6200ee;color:var(--mdc-theme-primary, #6200ee);--mdc-ripple-color: var( --mdc-theme-primary, #6200ee )}:host([activated]) .mdc-deprecated-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host([activated]) .fake-activated-ripple::before{position:absolute;display:block;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;z-index:1;content:"";opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12);background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;display:inline-flex}.mdc-deprecated-list-item__graphic ::slotted(*){flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;width:100%;height:100%;text-align:center}.mdc-deprecated-list-item__meta{width:var(--mdc-list-item-meta-size, 24px);height:var(--mdc-list-item-meta-size, 24px);margin-left:auto;margin-right:0;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta.multi{width:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:var(--mdc-list-item-meta-size, 24px);line-height:var(--mdc-list-item-meta-size, 24px)}.mdc-deprecated-list-item__meta ::slotted(.material-icons),.mdc-deprecated-list-item__meta ::slotted(mwc-icon){line-height:var(--mdc-list-item-meta-size, 24px) !important}.mdc-deprecated-list-item__meta ::slotted(:not(.material-icons):not(mwc-icon)){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}[dir=rtl] .mdc-deprecated-list-item__meta,.mdc-deprecated-list-item__meta[dir=rtl]{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:100%;height:100%}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text ::slotted([for]),.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;display:block}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}* ::slotted(a),a{color:inherit;text-decoration:none}:host([twoline]){height:72px}:host([twoline]) .mdc-deprecated-list-item__text{align-self:flex-start}:host([disabled]),:host([noninteractive]){cursor:default;pointer-events:none}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*){opacity:.38}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__primary-text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__secondary-text ::slotted(*){color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item__secondary-text ::slotted(*){color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic ::slotted(*){background-color:transparent;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader ::slotted(*){color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 40px);height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 40px);line-height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 40px) !important}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){border-radius:50%}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 16px)}[dir=rtl] :host([graphic=avatar]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=medium]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=large]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=control]) .mdc-deprecated-list-item__graphic,:host([graphic=avatar]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=medium]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=large]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=control]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 16px);margin-right:0}:host([graphic=icon]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 24px);height:var(--mdc-list-item-graphic-size, 24px);margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 32px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 24px);line-height:var(--mdc-list-item-graphic-size, 24px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 24px) !important}[dir=rtl] :host([graphic=icon]) .mdc-deprecated-list-item__graphic,:host([graphic=icon]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 32px);margin-right:0}:host([graphic=avatar]:not([twoLine])),:host([graphic=icon]:not([twoLine])){height:56px}:host([graphic=medium]:not([twoLine])),:host([graphic=large]:not([twoLine])){height:72px}:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 56px);height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic.multi,:host([graphic=large]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(*),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 56px);line-height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 56px) !important}:host([graphic=large]){padding-left:0px}`
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let Lr=class extends Ar{};Lr.styles=[Or],Lr=o([ue("mwc-list-item")],Lr);
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
var Mr="Backspace",Ir="Enter",Rr="Spacebar",Fr="PageUp",Nr="PageDown",zr="End",Dr="Home",Pr="ArrowLeft",Hr="ArrowUp",Ur="ArrowRight",Br="ArrowDown",Wr="Delete",Kr="Escape",jr=new Set;jr.add(Mr),jr.add(Ir),jr.add(Rr),jr.add(Fr),jr.add(Nr),jr.add(zr),jr.add(Dr),jr.add(Pr),jr.add(Hr),jr.add(Ur),jr.add(Br),jr.add(Wr),jr.add(Kr),jr.add("Tab");var Vr=new Map;Vr.set(8,Mr),Vr.set(13,Ir),Vr.set(32,Rr),Vr.set(33,Fr),Vr.set(34,Nr),Vr.set(35,zr),Vr.set(36,Dr),Vr.set(37,Pr),Vr.set(38,Hr),Vr.set(39,Ur),Vr.set(40,Br),Vr.set(46,Wr),Vr.set(27,Kr),Vr.set(9,"Tab");var qr,Zr,Gr=new Set;function Jr(e){var t=e.key;return jr.has(t)?t:Vr.get(e.keyCode)||"Unknown"}
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
 */Gr.add(Fr),Gr.add(Nr),Gr.add(zr),Gr.add(Dr),Gr.add(Pr),Gr.add(Hr),Gr.add(Ur),Gr.add(Br);var Qr="mdc-list-item--activated",Yr="mdc-list-item",Xr="mdc-list-item--disabled",$r="mdc-list-item--selected",eo="mdc-list-item__primary-text",to="mdc-list";(qr={})[""+Qr]="mdc-list-item--activated",qr[""+Yr]="mdc-list-item",qr[""+Xr]="mdc-list-item--disabled",qr[""+$r]="mdc-list-item--selected",qr[""+eo]="mdc-list-item__primary-text",qr[""+to]="mdc-list";var ro=((Zr={})[""+Qr]="mdc-deprecated-list-item--activated",Zr[""+Yr]="mdc-deprecated-list-item",Zr[""+Xr]="mdc-deprecated-list-item--disabled",Zr[""+$r]="mdc-deprecated-list-item--selected",Zr["mdc-list-item__text"]="mdc-deprecated-list-item__text",Zr[""+eo]="mdc-deprecated-list-item__primary-text",Zr[""+to]="mdc-deprecated-list",Zr),oo={ACTION_EVENT:"MDCList:action",SELECTION_CHANGE_EVENT:"MDCList:selectionChange",ARIA_CHECKED:"aria-checked",ARIA_CHECKED_CHECKBOX_SELECTOR:'[role="checkbox"][aria-checked="true"]',ARIA_CHECKED_RADIO_SELECTOR:'[role="radio"][aria-checked="true"]',ARIA_CURRENT:"aria-current",ARIA_DISABLED:"aria-disabled",ARIA_ORIENTATION:"aria-orientation",ARIA_ORIENTATION_HORIZONTAL:"horizontal",ARIA_ROLE_CHECKBOX_SELECTOR:'[role="checkbox"]',ARIA_SELECTED:"aria-selected",ARIA_INTERACTIVE_ROLES_SELECTOR:'[role="listbox"], [role="menu"]',ARIA_MULTI_SELECTABLE_SELECTOR:'[aria-multiselectable="true"]',CHECKBOX_RADIO_SELECTOR:'input[type="checkbox"], input[type="radio"]',CHECKBOX_SELECTOR:'input[type="checkbox"]',CHILD_ELEMENTS_TO_TOGGLE_TABINDEX:"\n    ."+Yr+" button:not(:disabled),\n    ."+Yr+" a,\n    ."+ro[Yr]+" button:not(:disabled),\n    ."+ro[Yr]+" a\n  ",DEPRECATED_SELECTOR:".mdc-deprecated-list",FOCUSABLE_CHILD_ELEMENTS:"\n    ."+Yr+" button:not(:disabled),\n    ."+Yr+" a,\n    ."+Yr+' input[type="radio"]:not(:disabled),\n    .'+Yr+' input[type="checkbox"]:not(:disabled),\n    .'+ro[Yr]+" button:not(:disabled),\n    ."+ro[Yr]+" a,\n    ."+ro[Yr]+' input[type="radio"]:not(:disabled),\n    .'+ro[Yr]+' input[type="checkbox"]:not(:disabled)\n  ',RADIO_SELECTOR:'input[type="radio"]',SELECTED_ITEM_SELECTOR:'[aria-selected="true"], [aria-current="true"]'},io={UNSET_INDEX:-1,TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS:300};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const no=(e,t)=>e-t,ao=["input","button","textarea","select"];function lo(e){return e instanceof Set}const so=e=>{const t=e===io.UNSET_INDEX?new Set:e;return lo(t)?new Set(t):new Set([t])};class co extends tr{constructor(e){super(Object.assign(Object.assign({},co.defaultAdapter),e)),this.isMulti_=!1,this.wrapFocus_=!1,this.isVertical_=!0,this.selectedIndex_=io.UNSET_INDEX,this.focusedItemIndex_=io.UNSET_INDEX,this.useActivatedClass_=!1,this.ariaCurrentAttrValue_=null}static get strings(){return oo}static get numbers(){return io}static get defaultAdapter(){return{focusItemAtIndex:()=>{},getFocusedElementIndex:()=>0,getListItemCount:()=>0,isFocusInsideList:()=>!1,isRootFocused:()=>!1,notifyAction:()=>{},notifySelected:()=>{},getSelectedStateForElementIndex:()=>!1,setDisabledStateForElementIndex:()=>{},getDisabledStateForElementIndex:()=>!1,setSelectedStateForElementIndex:()=>{},setActivatedStateForElementIndex:()=>{},setTabIndexForElementIndex:()=>{},setAttributeForElementIndex:()=>{},getAttributeForElementIndex:()=>null}}setWrapFocus(e){this.wrapFocus_=e}setMulti(e){this.isMulti_=e;const t=this.selectedIndex_;if(e){if(!lo(t)){const e=t===io.UNSET_INDEX;this.selectedIndex_=e?new Set:new Set([t])}}else if(lo(t))if(t.size){const e=Array.from(t).sort(no);this.selectedIndex_=e[0]}else this.selectedIndex_=io.UNSET_INDEX}setVerticalOrientation(e){this.isVertical_=e}setUseActivatedClass(e){this.useActivatedClass_=e}getSelectedIndex(){return this.selectedIndex_}setSelectedIndex(e){this.isIndexValid_(e)&&(this.isMulti_?this.setMultiSelectionAtIndex_(so(e)):this.setSingleSelectionAtIndex_(e))}handleFocusIn(e,t){t>=0&&this.adapter.setTabIndexForElementIndex(t,0)}handleFocusOut(e,t){t>=0&&this.adapter.setTabIndexForElementIndex(t,-1),setTimeout((()=>{this.adapter.isFocusInsideList()||this.setTabindexToFirstSelectedItem_()}),0)}handleKeydown(e,t,r){const o="ArrowLeft"===Jr(e),i="ArrowUp"===Jr(e),n="ArrowRight"===Jr(e),a="ArrowDown"===Jr(e),l="Home"===Jr(e),s="End"===Jr(e),d="Enter"===Jr(e),c="Spacebar"===Jr(e);if(this.adapter.isRootFocused())return void(i||s?(e.preventDefault(),this.focusLastElement()):(a||l)&&(e.preventDefault(),this.focusFirstElement()));let u,p=this.adapter.getFocusedElementIndex();if(!(-1===p&&(p=r,p<0))){if(this.isVertical_&&a||!this.isVertical_&&n)this.preventDefaultEvent(e),u=this.focusNextElement(p);else if(this.isVertical_&&i||!this.isVertical_&&o)this.preventDefaultEvent(e),u=this.focusPrevElement(p);else if(l)this.preventDefaultEvent(e),u=this.focusFirstElement();else if(s)this.preventDefaultEvent(e),u=this.focusLastElement();else if((d||c)&&t){const t=e.target;if(t&&"A"===t.tagName&&d)return;this.preventDefaultEvent(e),this.setSelectedIndexOnAction_(p,!0)}this.focusedItemIndex_=p,void 0!==u&&(this.setTabindexAtIndex_(u),this.focusedItemIndex_=u)}}handleSingleSelection(e,t,r){e!==io.UNSET_INDEX&&(this.setSelectedIndexOnAction_(e,t,r),this.setTabindexAtIndex_(e),this.focusedItemIndex_=e)}focusNextElement(e){let t=e+1;if(t>=this.adapter.getListItemCount()){if(!this.wrapFocus_)return e;t=0}return this.adapter.focusItemAtIndex(t),t}focusPrevElement(e){let t=e-1;if(t<0){if(!this.wrapFocus_)return e;t=this.adapter.getListItemCount()-1}return this.adapter.focusItemAtIndex(t),t}focusFirstElement(){return this.adapter.focusItemAtIndex(0),0}focusLastElement(){const e=this.adapter.getListItemCount()-1;return this.adapter.focusItemAtIndex(e),e}setEnabled(e,t){this.isIndexValid_(e)&&this.adapter.setDisabledStateForElementIndex(e,!t)}preventDefaultEvent(e){const t=(""+e.target.tagName).toLowerCase();-1===ao.indexOf(t)&&e.preventDefault()}setSingleSelectionAtIndex_(e,t=!0){this.selectedIndex_!==e&&(this.selectedIndex_!==io.UNSET_INDEX&&(this.adapter.setSelectedStateForElementIndex(this.selectedIndex_,!1),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(this.selectedIndex_,!1)),t&&this.adapter.setSelectedStateForElementIndex(e,!0),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(e,!0),this.setAriaForSingleSelectionAtIndex_(e),this.selectedIndex_=e,this.adapter.notifySelected(e))}setMultiSelectionAtIndex_(e,t=!0){const r=((e,t)=>{const r=Array.from(e),o=Array.from(t),i={added:[],removed:[]},n=r.sort(no),a=o.sort(no);let l=0,s=0;for(;l<n.length||s<a.length;){const e=n[l],t=a[s];e!==t?void 0!==e&&(void 0===t||e<t)?(i.removed.push(e),l++):void 0!==t&&(void 0===e||t<e)&&(i.added.push(t),s++):(l++,s++)}return i})(so(this.selectedIndex_),e);if(r.removed.length||r.added.length){for(const e of r.removed)t&&this.adapter.setSelectedStateForElementIndex(e,!1),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(e,!1);for(const e of r.added)t&&this.adapter.setSelectedStateForElementIndex(e,!0),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(e,!0);this.selectedIndex_=e,this.adapter.notifySelected(e,r)}}setAriaForSingleSelectionAtIndex_(e){this.selectedIndex_===io.UNSET_INDEX&&(this.ariaCurrentAttrValue_=this.adapter.getAttributeForElementIndex(e,oo.ARIA_CURRENT));const t=null!==this.ariaCurrentAttrValue_,r=t?oo.ARIA_CURRENT:oo.ARIA_SELECTED;this.selectedIndex_!==io.UNSET_INDEX&&this.adapter.setAttributeForElementIndex(this.selectedIndex_,r,"false");const o=t?this.ariaCurrentAttrValue_:"true";this.adapter.setAttributeForElementIndex(e,r,o)}setTabindexAtIndex_(e){this.focusedItemIndex_===io.UNSET_INDEX&&0!==e?this.adapter.setTabIndexForElementIndex(0,-1):this.focusedItemIndex_>=0&&this.focusedItemIndex_!==e&&this.adapter.setTabIndexForElementIndex(this.focusedItemIndex_,-1),this.adapter.setTabIndexForElementIndex(e,0)}setTabindexToFirstSelectedItem_(){let e=0;"number"==typeof this.selectedIndex_&&this.selectedIndex_!==io.UNSET_INDEX?e=this.selectedIndex_:lo(this.selectedIndex_)&&this.selectedIndex_.size>0&&(e=Math.min(...this.selectedIndex_)),this.setTabindexAtIndex_(e)}isIndexValid_(e){if(e instanceof Set){if(!this.isMulti_)throw Error("MDCListFoundation: Array of index is only supported for checkbox based list");if(0===e.size)return!0;{let t=!1;for(const r of e)if(t=this.isIndexInRange_(r),t)break;return t}}if("number"==typeof e){if(this.isMulti_)throw Error("MDCListFoundation: Expected array of index for checkbox based list but got number: "+e);return e===io.UNSET_INDEX||this.isIndexInRange_(e)}return!1}isIndexInRange_(e){const t=this.adapter.getListItemCount();return e>=0&&e<t}setSelectedIndexOnAction_(e,t,r){if(this.adapter.getDisabledStateForElementIndex(e))return;let o=e;this.isMulti_&&(o=new Set([e])),this.isIndexValid_(o)&&(this.isMulti_?this.toggleMultiAtIndex(e,r,t):t||r?this.setSingleSelectionAtIndex_(e,t):this.selectedIndex_===e&&this.setSingleSelectionAtIndex_(io.UNSET_INDEX),t&&this.adapter.notifyAction(e))}toggleMultiAtIndex(e,t,r=!0){let o=!1;o=void 0===t?!this.adapter.getSelectedStateForElementIndex(e):t;const i=so(this.selectedIndex_);o?i.add(e):i.delete(e),this.setMultiSelectionAtIndex_(i,r)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const uo=e=>e.hasAttribute("mwc-list-item");function po(){const e=this.itemsReadyResolver;this.itemsReady=new Promise((e=>this.itemsReadyResolver=e)),e()}class ho extends er{constructor(){super(),this.mdcAdapter=null,this.mdcFoundationClass=co,this.activatable=!1,this.multi=!1,this.wrapFocus=!1,this.itemRoles=null,this.innerRole=null,this.innerAriaLabel=null,this.rootTabbable=!1,this.previousTabindex=null,this.noninteractive=!1,this.itemsReadyResolver=()=>{},this.itemsReady=Promise.resolve([]),this.items_=[];const e=function(e,t=50){let r;return function(o=!0){clearTimeout(r),r=setTimeout((()=>{e(o)}),t)}}(this.layout.bind(this));this.debouncedLayout=(t=!0)=>{po.call(this),e(t)}}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.itemsReady,e}get items(){return this.items_}updateItems(){var e;const t=null!==(e=this.assignedElements)&&void 0!==e?e:[],r=[];for(const e of t)uo(e)&&(r.push(e),e._managingList=this),e.hasAttribute("divider")&&!e.hasAttribute("role")&&e.setAttribute("role","separator");this.items_=r;const o=new Set;if(this.items_.forEach(((e,t)=>{this.itemRoles?e.setAttribute("role",this.itemRoles):e.removeAttribute("role"),e.selected&&o.add(t)})),this.multi)this.select(o);else{const e=o.size?o.entries().next().value[1]:-1;this.select(e)}const i=new Event("items-updated",{bubbles:!0,composed:!0});this.dispatchEvent(i)}get selected(){const e=this.index;if(!lo(e))return-1===e?null:this.items[e];const t=[];for(const r of e)t.push(this.items[r]);return t}get index(){return this.mdcFoundation?this.mdcFoundation.getSelectedIndex():-1}render(){const e=null===this.innerRole?void 0:this.innerRole,t=null===this.innerAriaLabel?void 0:this.innerAriaLabel,r=this.rootTabbable?"0":"-1";return W`
      <!-- @ts-ignore -->
      <ul
          tabindex=${r}
          role="${wr(e)}"
          aria-label="${wr(t)}"
          class="mdc-deprecated-list"
          @keydown=${this.onKeydown}
          @focusin=${this.onFocusIn}
          @focusout=${this.onFocusOut}
          @request-selected=${this.onRequestSelected}
          @list-item-rendered=${this.onListItemConnected}>
        <slot></slot>
        ${this.renderPlaceholder()}
      </ul>
    `}renderPlaceholder(){var e;const t=null!==(e=this.assignedElements)&&void 0!==e?e:[];return void 0!==this.emptyMessage&&0===t.length?W`
        <mwc-list-item noninteractive>${this.emptyMessage}</mwc-list-item>
      `:null}firstUpdated(){super.firstUpdated(),this.items.length||(this.mdcFoundation.setMulti(this.multi),this.layout())}onFocusIn(e){if(this.mdcFoundation&&this.mdcRoot){const t=this.getIndexOfTarget(e);this.mdcFoundation.handleFocusIn(e,t)}}onFocusOut(e){if(this.mdcFoundation&&this.mdcRoot){const t=this.getIndexOfTarget(e);this.mdcFoundation.handleFocusOut(e,t)}}onKeydown(e){if(this.mdcFoundation&&this.mdcRoot){const t=this.getIndexOfTarget(e),r=e.target,o=uo(r);this.mdcFoundation.handleKeydown(e,o,t)}}onRequestSelected(e){if(this.mdcFoundation){let t=this.getIndexOfTarget(e);if(-1===t&&(this.layout(),t=this.getIndexOfTarget(e),-1===t))return;if(this.items[t].disabled)return;const r=e.detail.selected,o=e.detail.source;this.mdcFoundation.handleSingleSelection(t,"interaction"===o,r),e.stopPropagation()}}getIndexOfTarget(e){const t=this.items,r=e.composedPath();for(const e of r){let r=-1;if(e.nodeType===Node.ELEMENT_NODE&&uo(e)&&(r=t.indexOf(e)),-1!==r)return r}return-1}createAdapter(){return this.mdcAdapter={getListItemCount:()=>this.mdcRoot?this.items.length:0,getFocusedElementIndex:this.getFocusedItemIndex,getAttributeForElementIndex:(e,t)=>{if(!this.mdcRoot)return"";const r=this.items[e];return r?r.getAttribute(t):""},setAttributeForElementIndex:(e,t,r)=>{if(!this.mdcRoot)return;const o=this.items[e];o&&o.setAttribute(t,r)},focusItemAtIndex:e=>{const t=this.items[e];t&&t.focus()},setTabIndexForElementIndex:(e,t)=>{const r=this.items[e];r&&(r.tabindex=t)},notifyAction:e=>{const t={bubbles:!0,composed:!0};t.detail={index:e};const r=new CustomEvent("action",t);this.dispatchEvent(r)},notifySelected:(e,t)=>{const r={bubbles:!0,composed:!0};r.detail={index:e,diff:t};const o=new CustomEvent("selected",r);this.dispatchEvent(o)},isFocusInsideList:()=>$t(this),isRootFocused:()=>{const e=this.mdcRoot;return e.getRootNode().activeElement===e},setDisabledStateForElementIndex:(e,t)=>{const r=this.items[e];r&&(r.disabled=t)},getDisabledStateForElementIndex:e=>{const t=this.items[e];return!!t&&t.disabled},setSelectedStateForElementIndex:(e,t)=>{const r=this.items[e];r&&(r.selected=t)},getSelectedStateForElementIndex:e=>{const t=this.items[e];return!!t&&t.selected},setActivatedStateForElementIndex:(e,t)=>{const r=this.items[e];r&&(r.activated=t)}},this.mdcAdapter}selectUi(e,t=!1){const r=this.items[e];r&&(r.selected=!0,r.activated=t)}deselectUi(e){const t=this.items[e];t&&(t.selected=!1,t.activated=!1)}select(e){this.mdcFoundation&&this.mdcFoundation.setSelectedIndex(e)}toggle(e,t){this.multi&&this.mdcFoundation.toggleMultiAtIndex(e,t)}onListItemConnected(e){const t=e.target;this.layout(-1===this.items.indexOf(t))}layout(e=!0){e&&this.updateItems();const t=this.items[0];for(const e of this.items)e.tabindex=-1;t&&(this.noninteractive?this.previousTabindex||(this.previousTabindex=t):t.tabindex=0),this.itemsReadyResolver()}getFocusedItemIndex(){if(!this.mdcRoot)return-1;if(!this.items.length)return-1;const e=Xt();if(!e.length)return-1;for(let t=e.length-1;t>=0;t--){const r=e[t];if(uo(r))return this.items.indexOf(r)}return-1}focusItemAtIndex(e){for(const e of this.items)if(0===e.tabindex){e.tabindex=-1;break}this.items[e].tabindex=0,this.items[e].focus()}focus(){const e=this.mdcRoot;e&&e.focus()}blur(){const e=this.mdcRoot;e&&e.blur()}}o([ge({type:String})],ho.prototype,"emptyMessage",void 0),o([ye(".mdc-deprecated-list")],ho.prototype,"mdcRoot",void 0),o([ke("",!0,"*")],ho.prototype,"assignedElements",void 0),o([ke("",!0,'[tabindex="0"]')],ho.prototype,"tabbableElements",void 0),o([ge({type:Boolean}),Tr((function(e){this.mdcFoundation&&this.mdcFoundation.setUseActivatedClass(e)}))],ho.prototype,"activatable",void 0),o([ge({type:Boolean}),Tr((function(e,t){this.mdcFoundation&&this.mdcFoundation.setMulti(e),void 0!==t&&this.layout()}))],ho.prototype,"multi",void 0),o([ge({type:Boolean}),Tr((function(e){this.mdcFoundation&&this.mdcFoundation.setWrapFocus(e)}))],ho.prototype,"wrapFocus",void 0),o([ge({type:String}),Tr((function(e,t){void 0!==t&&this.updateItems()}))],ho.prototype,"itemRoles",void 0),o([ge({type:String})],ho.prototype,"innerRole",void 0),o([ge({type:String})],ho.prototype,"innerAriaLabel",void 0),o([ge({type:Boolean})],ho.prototype,"rootTabbable",void 0),o([ge({type:Boolean,reflect:!0}),Tr((function(e){var t,r;if(e){const e=null!==(r=null===(t=this.tabbableElements)||void 0===t?void 0:t[0])&&void 0!==r?r:null;this.previousTabindex=e,e&&e.setAttribute("tabindex","-1")}else!e&&this.previousTabindex&&(this.previousTabindex.setAttribute("tabindex","0"),this.previousTabindex=null)}))],ho.prototype,"noninteractive",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const go=c`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block}.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));padding:var(--mdc-list-vertical-padding, 8px) 0}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-deprecated-list ::slotted([divider]){height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list ::slotted([divider][padded]){margin:0 var(--mdc-list-side-padding, 16px)}.mdc-deprecated-list ::slotted([divider][inset]){margin-left:var(--mdc-list-inset-margin, 72px);margin-right:0;width:calc( 100% - var(--mdc-list-inset-margin, 72px) )}[dir=rtl] .mdc-deprecated-list ::slotted([divider][inset]),.mdc-deprecated-list ::slotted([divider][inset][dir=rtl]){margin-left:0;margin-right:var(--mdc-list-inset-margin, 72px)}.mdc-deprecated-list ::slotted([divider][inset][padded]){width:calc( 100% - var(--mdc-list-inset-margin, 72px) - var(--mdc-list-side-padding, 16px) )}.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:40px}.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 20px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense ::slotted([mwc-list-item]),.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 36px}:host([noninteractive]){pointer-events:none;cursor:default}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text){display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}`
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let mo=class extends ho{};mo.styles=[go],mo=o([ue("mwc-list")],mo);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const fo=c`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let bo=class extends de{render(){return W`<span><slot></slot></span>`}};bo.styles=[fo],bo=o([ue("mwc-icon")],bo);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class yo extends de{constructor(){super(...arguments),this.raised=!1,this.unelevated=!1,this.outlined=!1,this.dense=!1,this.disabled=!1,this.trailingIcon=!1,this.fullwidth=!1,this.icon="",this.label="",this.expandContent=!1,this.shouldRenderRipple=!1,this.rippleHandlers=new xr((()=>(this.shouldRenderRipple=!0,this.ripple)))}renderOverlay(){return W``}renderRipple(){const e=this.raised||this.unelevated;return this.shouldRenderRipple?W`<mwc-ripple class="ripple" .primary="${!e}" .disabled="${this.disabled}"></mwc-ripple>`:""}focus(){const e=this.buttonElement;e&&(this.rippleHandlers.startFocus(),e.focus())}blur(){const e=this.buttonElement;e&&(this.rippleHandlers.endFocus(),e.blur())}getRenderClasses(){return{"mdc-button--raised":this.raised,"mdc-button--unelevated":this.unelevated,"mdc-button--outlined":this.outlined,"mdc-button--dense":this.dense}}render(){return W`
      <button
          id="button"
          class="mdc-button ${pr(this.getRenderClasses())}"
          ?disabled="${this.disabled}"
          aria-label="${this.label||this.icon}"
          aria-haspopup="${wr(this.ariaHasPopup)}"
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
        <span class="slot-container ${pr({flex:this.expandContent})}">
          <slot></slot>
        </span>
        <span class="trailing-icon">
          <slot name="trailingIcon">
            ${this.icon&&this.trailingIcon?this.renderIcon():""}
          </slot>
        </span>
      </button>`}renderIcon(){return W`
    <mwc-icon class="mdc-button__icon">
      ${this.icon}
    </mwc-icon>`}handleRippleActivate(e){const t=()=>{window.removeEventListener("mouseup",t),this.handleRippleDeactivate()};window.addEventListener("mouseup",t),this.rippleHandlers.startPress(e)}handleRippleDeactivate(){this.rippleHandlers.endPress()}handleRippleMouseEnter(){this.rippleHandlers.startHover()}handleRippleMouseLeave(){this.rippleHandlers.endHover()}handleRippleFocus(){this.rippleHandlers.startFocus()}handleRippleBlur(){this.rippleHandlers.endFocus()}}yo.shadowRootOptions={mode:"open",delegatesFocus:!0},o([vr,ge({type:String,attribute:"aria-haspopup"})],yo.prototype,"ariaHasPopup",void 0),o([ge({type:Boolean,reflect:!0})],yo.prototype,"raised",void 0),o([ge({type:Boolean,reflect:!0})],yo.prototype,"unelevated",void 0),o([ge({type:Boolean,reflect:!0})],yo.prototype,"outlined",void 0),o([ge({type:Boolean})],yo.prototype,"dense",void 0),o([ge({type:Boolean,reflect:!0})],yo.prototype,"disabled",void 0),o([ge({type:Boolean,attribute:"trailingicon"})],yo.prototype,"trailingIcon",void 0),o([ge({type:Boolean,reflect:!0})],yo.prototype,"fullwidth",void 0),o([ge({type:String})],yo.prototype,"icon",void 0),o([ge({type:String})],yo.prototype,"label",void 0),o([ge({type:Boolean})],yo.prototype,"expandContent",void 0),o([ye("#button")],yo.prototype,"buttonElement",void 0),o([ve("mwc-ripple")],yo.prototype,"ripple",void 0),o([me()],yo.prototype,"shouldRenderRipple",void 0),o([be({passive:!0})],yo.prototype,"handleRippleActivate",null);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const vo=c`.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase)}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:transparent}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__focus-ring{display:none}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc( 100% + 4px );width:calc( 100% + 4px );display:block}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring::after,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring::after{content:"";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring::after,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring::after{border-color:CanvasText}}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:transparent}.mdc-button{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised,.mdc-button--unelevated{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0, 0, 0, 0.12)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--raised .mdc-button__ripple,.mdc-button--unelevated .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button--outlined:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--outlined .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--outlined .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined:disabled{border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined.mdc-button--icon-trailing{padding:0 11px 0 15px}.mdc-button--outlined.mdc-button--icon-leading{padding:0 15px 0 11px}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:1px}.mdc-button--outlined .mdc-button__touch{left:calc(-1 * 1px);width:calc(100% + 2 * 1px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:transparent;vertical-align:top}:host([fullwidth]){width:100%}:host([raised]),:host([unelevated]){--mdc-ripple-color:#fff;--mdc-ripple-focus-opacity:0.24;--mdc-ripple-hover-opacity:0.08;--mdc-ripple-press-opacity:0.24}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon,.leading-icon ::slotted(*),.leading-icon .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}[dir=rtl] .trailing-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,[dir=rtl] .leading-icon ::slotted(*),[dir=rtl] .leading-icon .mdc-button__icon,.trailing-icon ::slotted(*[dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl],.leading-icon ::slotted(*[dir=rtl]),.leading-icon .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .trailing-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon ::slotted(*[dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}.slot-container{display:inline-flex;align-items:center;justify-content:center}.slot-container.flex{flex:auto}.mdc-button{flex:auto;overflow:hidden;padding-left:8px;padding-left:var(--mdc-button-horizontal-padding, 8px);padding-right:8px;padding-right:var(--mdc-button-horizontal-padding, 8px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-focus, var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)))}.mdc-button--raised:hover{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-active, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-disabled, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised,.mdc-button--unelevated{padding-left:16px;padding-left:var(--mdc-button-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mdc-button-horizontal-padding, 16px)}.mdc-button--outlined{border-width:1px;border-width:var(--mdc-button-outline-width, 1px);padding-left:calc(16px - 1px);padding-left:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));padding-right:calc(16px - 1px);padding-right:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px))}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-outline-color, rgba(0, 0, 0, 0.12))}.mdc-button--outlined .ripple{top:calc(-1 * 1px);top:calc(-1 * var(--mdc-button-outline-width, 1px));left:calc(-1 * 1px);left:calc(-1 * var(--mdc-button-outline-width, 1px));right:initial;right:initial;border-width:1px;border-width:var(--mdc-button-outline-width, 1px);border-style:solid;border-color:transparent}[dir=rtl] .mdc-button--outlined .ripple,.mdc-button--outlined .ripple[dir=rtl]{left:initial;left:initial;right:calc(-1 * 1px);right:calc(-1 * var(--mdc-button-outline-width, 1px))}.mdc-button--dense{height:28px;margin-top:0;margin-bottom:0}.mdc-button--dense .mdc-button__touch{height:100%}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-button{color:rgba(0, 0, 0, 0.38);color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button--raised,:host([disabled]) .mdc-button--unelevated{background-color:rgba(0, 0, 0, 0.12);background-color:var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12))}:host([disabled]) .mdc-button--outlined{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-disabled-outline-color, rgba(0, 0, 0, 0.12))}`
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let xo=class extends yo{};xo.styles=[vo],xo=o([ue("mwc-button")],xo);
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
var wo={NOTCH_ELEMENT_SELECTOR:".mdc-notched-outline__notch"},ko={NOTCH_ELEMENT_PADDING:8},_o={NO_LABEL:"mdc-notched-outline--no-label",OUTLINE_NOTCHED:"mdc-notched-outline--notched",OUTLINE_UPGRADED:"mdc-notched-outline--upgraded"},Co=function(e){function o(t){return e.call(this,r(r({},o.defaultAdapter),t))||this}return t(o,e),Object.defineProperty(o,"strings",{get:function(){return wo},enumerable:!1,configurable:!0}),Object.defineProperty(o,"cssClasses",{get:function(){return _o},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return ko},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},setNotchWidthProperty:function(){},removeNotchWidthProperty:function(){}}},enumerable:!1,configurable:!0}),o.prototype.notch=function(e){var t=o.cssClasses.OUTLINE_NOTCHED;e>0&&(e+=ko.NOTCH_ELEMENT_PADDING),this.adapter.setNotchWidthProperty(e),this.adapter.addClass(t)},o.prototype.closeNotch=function(){var e=o.cssClasses.OUTLINE_NOTCHED;this.adapter.removeClass(e),this.adapter.removeNotchWidthProperty()},o}(tr);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class So extends er{constructor(){super(...arguments),this.mdcFoundationClass=Co,this.width=0,this.open=!1,this.lastOpen=this.open}createAdapter(){return{addClass:e=>this.mdcRoot.classList.add(e),removeClass:e=>this.mdcRoot.classList.remove(e),setNotchWidthProperty:e=>this.notchElement.style.setProperty("width",e+"px"),removeNotchWidthProperty:()=>this.notchElement.style.removeProperty("width")}}openOrClose(e,t){this.mdcFoundation&&(e&&void 0!==t?this.mdcFoundation.notch(t):this.mdcFoundation.closeNotch())}render(){this.openOrClose(this.open,this.width);const e=pr({"mdc-notched-outline--notched":this.open});return W`
      <span class="mdc-notched-outline ${e}">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
          <slot></slot>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>`}}o([ye(".mdc-notched-outline")],So.prototype,"mdcRoot",void 0),o([ge({type:Number})],So.prototype,"width",void 0),o([ge({type:Boolean,reflect:!0})],So.prototype,"open",void 0),o([ye(".mdc-notched-outline__notch")],So.prototype,"notchElement",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const Eo=c`.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}:host{display:block;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] :host,:host([dir=rtl]){text-align:right}::slotted(.mdc-floating-label){display:inline-block;position:relative;top:17px;bottom:auto;max-width:100%}::slotted(.mdc-floating-label--float-above){text-overflow:clip}.mdc-notched-outline--upgraded ::slotted(.mdc-floating-label--float-above){max-width:calc(100% / 0.75)}.mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-notched-outline .mdc-notched-outline__leading,.mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-color:var(--mdc-notched-outline-border-color, var(--mdc-theme-primary, #6200ee));border-width:1px;border-width:var(--mdc-notched-outline-stroke-width, 1px)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0;padding-top:var(--mdc-notched-outline-notch-offset, 0)}`
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let To=class extends So{};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var Ao,Oo;To.styles=[Eo],To=o([ue("mwc-notched-outline")],To);const Lo=null!==(Oo=null===(Ao=window.ShadyDOM)||void 0===Ao?void 0:Ao.inUse)&&void 0!==Oo&&Oo;class Mo extends er{constructor(){super(...arguments),this.disabled=!1,this.containingForm=null,this.formDataListener=e=>{this.disabled||this.setFormData(e.formData)}}findFormElement(){if(!this.shadowRoot||Lo)return null;const e=this.getRootNode().querySelectorAll("form");for(const t of Array.from(e))if(t.contains(this))return t;return null}connectedCallback(){var e;super.connectedCallback(),this.containingForm=this.findFormElement(),null===(e=this.containingForm)||void 0===e||e.addEventListener("formdata",this.formDataListener)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this.containingForm)||void 0===e||e.removeEventListener("formdata",this.formDataListener),this.containingForm=null}click(){this.formElement&&!this.disabled&&(this.formElement.focus(),this.formElement.click())}firstUpdated(){super.firstUpdated(),this.shadowRoot&&this.mdcRoot.addEventListener("change",(e=>{this.dispatchEvent(new Event("change",e))}))}}Mo.shadowRootOptions={mode:"open",delegatesFocus:!0},o([ge({type:Boolean})],Mo.prototype,"disabled",void 0);
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
var Io={LABEL_FLOAT_ABOVE:"mdc-floating-label--float-above",LABEL_REQUIRED:"mdc-floating-label--required",LABEL_SHAKE:"mdc-floating-label--shake",ROOT:"mdc-floating-label"},Ro=function(e){function o(t){var i=e.call(this,r(r({},o.defaultAdapter),t))||this;return i.shakeAnimationEndHandler=function(){i.handleShakeAnimationEnd()},i}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return Io},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},getWidth:function(){return 0},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.registerInteractionHandler("animationend",this.shakeAnimationEndHandler)},o.prototype.destroy=function(){this.adapter.deregisterInteractionHandler("animationend",this.shakeAnimationEndHandler)},o.prototype.getWidth=function(){return this.adapter.getWidth()},o.prototype.shake=function(e){var t=o.cssClasses.LABEL_SHAKE;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.float=function(e){var t=o.cssClasses,r=t.LABEL_FLOAT_ABOVE,i=t.LABEL_SHAKE;e?this.adapter.addClass(r):(this.adapter.removeClass(r),this.adapter.removeClass(i))},o.prototype.setRequired=function(e){var t=o.cssClasses.LABEL_REQUIRED;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.handleShakeAnimationEnd=function(){var e=o.cssClasses.LABEL_SHAKE;this.adapter.removeClass(e)},o}(tr);
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
 */const Fo=cr(class extends ur{constructor(e){switch(super(e),this.foundation=null,this.previousPart=null,e.type){case 1:case 3:break;default:throw Error("FloatingLabel directive only support attribute and property parts")}}update(e,[t]){if(e!==this.previousPart){this.foundation&&this.foundation.destroy(),this.previousPart=e;const t=e.element;t.classList.add("mdc-floating-label");const r=(e=>({addClass:t=>e.classList.add(t),removeClass:t=>e.classList.remove(t),getWidth:()=>e.scrollWidth,registerInteractionHandler:(t,r)=>{e.addEventListener(t,r)},deregisterInteractionHandler:(t,r)=>{e.removeEventListener(t,r)}}))(t);this.foundation=new Ro(r),this.foundation.init()}return this.render(t)}render(e){return this.foundation}});
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
 */var No={LINE_RIPPLE_ACTIVE:"mdc-line-ripple--active",LINE_RIPPLE_DEACTIVATING:"mdc-line-ripple--deactivating"},zo=function(e){function o(t){var i=e.call(this,r(r({},o.defaultAdapter),t))||this;return i.transitionEndHandler=function(e){i.handleTransitionEnd(e)},i}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return No},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setStyle:function(){},registerEventHandler:function(){},deregisterEventHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.registerEventHandler("transitionend",this.transitionEndHandler)},o.prototype.destroy=function(){this.adapter.deregisterEventHandler("transitionend",this.transitionEndHandler)},o.prototype.activate=function(){this.adapter.removeClass(No.LINE_RIPPLE_DEACTIVATING),this.adapter.addClass(No.LINE_RIPPLE_ACTIVE)},o.prototype.setRippleCenter=function(e){this.adapter.setStyle("transform-origin",e+"px center")},o.prototype.deactivate=function(){this.adapter.addClass(No.LINE_RIPPLE_DEACTIVATING)},o.prototype.handleTransitionEnd=function(e){var t=this.adapter.hasClass(No.LINE_RIPPLE_DEACTIVATING);"opacity"===e.propertyName&&t&&(this.adapter.removeClass(No.LINE_RIPPLE_ACTIVE),this.adapter.removeClass(No.LINE_RIPPLE_DEACTIVATING))},o}(tr);
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
 */const Do=cr(class extends ur{constructor(e){switch(super(e),this.previousPart=null,this.foundation=null,e.type){case 1:case 3:return;default:throw Error("LineRipple only support attribute and property parts.")}}update(e,t){if(this.previousPart!==e){this.foundation&&this.foundation.destroy(),this.previousPart=e;const t=e.element;t.classList.add("mdc-line-ripple");const r=(e=>({addClass:t=>e.classList.add(t),removeClass:t=>e.classList.remove(t),hasClass:t=>e.classList.contains(t),setStyle:(t,r)=>e.style.setProperty(t,r),registerEventHandler:(t,r)=>{e.addEventListener(t,r)},deregisterEventHandler:(t,r)=>{e.removeEventListener(t,r)}}))(t);this.foundation=new zo(r),this.foundation.init()}return this.render()}render(){return this.foundation}});
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
 */var Po={ARIA_CONTROLS:"aria-controls",ARIA_DESCRIBEDBY:"aria-describedby",INPUT_SELECTOR:".mdc-text-field__input",LABEL_SELECTOR:".mdc-floating-label",LEADING_ICON_SELECTOR:".mdc-text-field__icon--leading",LINE_RIPPLE_SELECTOR:".mdc-line-ripple",OUTLINE_SELECTOR:".mdc-notched-outline",PREFIX_SELECTOR:".mdc-text-field__affix--prefix",SUFFIX_SELECTOR:".mdc-text-field__affix--suffix",TRAILING_ICON_SELECTOR:".mdc-text-field__icon--trailing"},Ho={DISABLED:"mdc-text-field--disabled",FOCUSED:"mdc-text-field--focused",HELPER_LINE:"mdc-text-field-helper-line",INVALID:"mdc-text-field--invalid",LABEL_FLOATING:"mdc-text-field--label-floating",NO_LABEL:"mdc-text-field--no-label",OUTLINED:"mdc-text-field--outlined",ROOT:"mdc-text-field",TEXTAREA:"mdc-text-field--textarea",WITH_LEADING_ICON:"mdc-text-field--with-leading-icon",WITH_TRAILING_ICON:"mdc-text-field--with-trailing-icon",WITH_INTERNAL_COUNTER:"mdc-text-field--with-internal-counter"},Uo={LABEL_SCALE:.75},Bo=["pattern","min","max","required","step","minlength","maxlength"],Wo=["color","date","datetime-local","month","range","time","week"],Ko=["mousedown","touchstart"],jo=["click","keydown"],Vo=function(e){function o(t,i){void 0===i&&(i={});var n=e.call(this,r(r({},o.defaultAdapter),t))||this;return n.isFocused=!1,n.receivedUserInput=!1,n.valid=!0,n.useNativeValidation=!0,n.validateOnValueChange=!0,n.helperText=i.helperText,n.characterCounter=i.characterCounter,n.leadingIcon=i.leadingIcon,n.trailingIcon=i.trailingIcon,n.inputFocusHandler=function(){n.activateFocus()},n.inputBlurHandler=function(){n.deactivateFocus()},n.inputInputHandler=function(){n.handleInput()},n.setPointerXOffset=function(e){n.setTransformOrigin(e)},n.textFieldInteractionHandler=function(){n.handleTextFieldInteraction()},n.validationAttributeChangeHandler=function(e){n.handleValidationAttributeChange(e)},n}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return Ho},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return Po},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return Uo},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"shouldAlwaysFloat",{get:function(){var e=this.getNativeInput().type;return Wo.indexOf(e)>=0},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"shouldFloat",{get:function(){return this.shouldAlwaysFloat||this.isFocused||!!this.getValue()||this.isBadInput()},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"shouldShake",{get:function(){return!this.isFocused&&!this.isValid()&&!!this.getValue()},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!0},setInputAttr:function(){},removeInputAttr:function(){},registerTextFieldInteractionHandler:function(){},deregisterTextFieldInteractionHandler:function(){},registerInputInteractionHandler:function(){},deregisterInputInteractionHandler:function(){},registerValidationAttributeChangeHandler:function(){return new MutationObserver((function(){}))},deregisterValidationAttributeChangeHandler:function(){},getNativeInput:function(){return null},isFocused:function(){return!1},activateLineRipple:function(){},deactivateLineRipple:function(){},setLineRippleTransformOrigin:function(){},shakeLabel:function(){},floatLabel:function(){},setLabelRequired:function(){},hasLabel:function(){return!1},getLabelWidth:function(){return 0},hasOutline:function(){return!1},notchOutline:function(){},closeOutline:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){var e,t,r,o;this.adapter.hasLabel()&&this.getNativeInput().required&&this.adapter.setLabelRequired(!0),this.adapter.isFocused()?this.inputFocusHandler():this.adapter.hasLabel()&&this.shouldFloat&&(this.notchOutline(!0),this.adapter.floatLabel(!0),this.styleFloating(!0)),this.adapter.registerInputInteractionHandler("focus",this.inputFocusHandler),this.adapter.registerInputInteractionHandler("blur",this.inputBlurHandler),this.adapter.registerInputInteractionHandler("input",this.inputInputHandler);try{for(var n=i(Ko),a=n.next();!a.done;a=n.next()){var l=a.value;this.adapter.registerInputInteractionHandler(l,this.setPointerXOffset)}}catch(t){e={error:t}}finally{try{a&&!a.done&&(t=n.return)&&t.call(n)}finally{if(e)throw e.error}}try{for(var s=i(jo),d=s.next();!d.done;d=s.next())l=d.value,this.adapter.registerTextFieldInteractionHandler(l,this.textFieldInteractionHandler)}catch(e){r={error:e}}finally{try{d&&!d.done&&(o=s.return)&&o.call(s)}finally{if(r)throw r.error}}this.validationObserver=this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler),this.setcharacterCounter(this.getValue().length)},o.prototype.destroy=function(){var e,t,r,o;this.adapter.deregisterInputInteractionHandler("focus",this.inputFocusHandler),this.adapter.deregisterInputInteractionHandler("blur",this.inputBlurHandler),this.adapter.deregisterInputInteractionHandler("input",this.inputInputHandler);try{for(var n=i(Ko),a=n.next();!a.done;a=n.next()){var l=a.value;this.adapter.deregisterInputInteractionHandler(l,this.setPointerXOffset)}}catch(t){e={error:t}}finally{try{a&&!a.done&&(t=n.return)&&t.call(n)}finally{if(e)throw e.error}}try{for(var s=i(jo),d=s.next();!d.done;d=s.next())l=d.value,this.adapter.deregisterTextFieldInteractionHandler(l,this.textFieldInteractionHandler)}catch(e){r={error:e}}finally{try{d&&!d.done&&(o=s.return)&&o.call(s)}finally{if(r)throw r.error}}this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver)},o.prototype.handleTextFieldInteraction=function(){var e=this.adapter.getNativeInput();e&&e.disabled||(this.receivedUserInput=!0)},o.prototype.handleValidationAttributeChange=function(e){var t=this;e.some((function(e){return Bo.indexOf(e)>-1&&(t.styleValidity(!0),t.adapter.setLabelRequired(t.getNativeInput().required),!0)})),e.indexOf("maxlength")>-1&&this.setcharacterCounter(this.getValue().length)},o.prototype.notchOutline=function(e){if(this.adapter.hasOutline()&&this.adapter.hasLabel())if(e){var t=this.adapter.getLabelWidth()*Uo.LABEL_SCALE;this.adapter.notchOutline(t)}else this.adapter.closeOutline()},o.prototype.activateFocus=function(){this.isFocused=!0,this.styleFocused(this.isFocused),this.adapter.activateLineRipple(),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake)),!this.helperText||!this.helperText.isPersistent()&&this.helperText.isValidation()&&this.valid||this.helperText.showToScreenReader()},o.prototype.setTransformOrigin=function(e){if(!this.isDisabled()&&!this.adapter.hasOutline()){var t=e.touches,r=t?t[0]:e,o=r.target.getBoundingClientRect(),i=r.clientX-o.left;this.adapter.setLineRippleTransformOrigin(i)}},o.prototype.handleInput=function(){this.autoCompleteFocus(),this.setcharacterCounter(this.getValue().length)},o.prototype.autoCompleteFocus=function(){this.receivedUserInput||this.activateFocus()},o.prototype.deactivateFocus=function(){this.isFocused=!1,this.adapter.deactivateLineRipple();var e=this.isValid();this.styleValidity(e),this.styleFocused(this.isFocused),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake)),this.shouldFloat||(this.receivedUserInput=!1)},o.prototype.getValue=function(){return this.getNativeInput().value},o.prototype.setValue=function(e){if(this.getValue()!==e&&(this.getNativeInput().value=e),this.setcharacterCounter(e.length),this.validateOnValueChange){var t=this.isValid();this.styleValidity(t)}this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating(this.shouldFloat),this.validateOnValueChange&&this.adapter.shakeLabel(this.shouldShake))},o.prototype.isValid=function(){return this.useNativeValidation?this.isNativeInputValid():this.valid},o.prototype.setValid=function(e){this.valid=e,this.styleValidity(e);var t=!e&&!this.isFocused&&!!this.getValue();this.adapter.hasLabel()&&this.adapter.shakeLabel(t)},o.prototype.setValidateOnValueChange=function(e){this.validateOnValueChange=e},o.prototype.getValidateOnValueChange=function(){return this.validateOnValueChange},o.prototype.setUseNativeValidation=function(e){this.useNativeValidation=e},o.prototype.isDisabled=function(){return this.getNativeInput().disabled},o.prototype.setDisabled=function(e){this.getNativeInput().disabled=e,this.styleDisabled(e)},o.prototype.setHelperTextContent=function(e){this.helperText&&this.helperText.setContent(e)},o.prototype.setLeadingIconAriaLabel=function(e){this.leadingIcon&&this.leadingIcon.setAriaLabel(e)},o.prototype.setLeadingIconContent=function(e){this.leadingIcon&&this.leadingIcon.setContent(e)},o.prototype.setTrailingIconAriaLabel=function(e){this.trailingIcon&&this.trailingIcon.setAriaLabel(e)},o.prototype.setTrailingIconContent=function(e){this.trailingIcon&&this.trailingIcon.setContent(e)},o.prototype.setcharacterCounter=function(e){if(this.characterCounter){var t=this.getNativeInput().maxLength;if(-1===t)throw Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");this.characterCounter.setCounterValue(e,t)}},o.prototype.isBadInput=function(){return this.getNativeInput().validity.badInput||!1},o.prototype.isNativeInputValid=function(){return this.getNativeInput().validity.valid},o.prototype.styleValidity=function(e){var t=o.cssClasses.INVALID;if(e?this.adapter.removeClass(t):this.adapter.addClass(t),this.helperText){if(this.helperText.setValidity(e),!this.helperText.isValidation())return;var r=this.helperText.isVisible(),i=this.helperText.getId();r&&i?this.adapter.setInputAttr(Po.ARIA_DESCRIBEDBY,i):this.adapter.removeInputAttr(Po.ARIA_DESCRIBEDBY)}},o.prototype.styleFocused=function(e){var t=o.cssClasses.FOCUSED;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.styleDisabled=function(e){var t=o.cssClasses,r=t.DISABLED,i=t.INVALID;e?(this.adapter.addClass(r),this.adapter.removeClass(i)):this.adapter.removeClass(r),this.leadingIcon&&this.leadingIcon.setDisabled(e),this.trailingIcon&&this.trailingIcon.setDisabled(e)},o.prototype.styleFloating=function(e){var t=o.cssClasses.LABEL_FLOATING;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.getNativeInput=function(){return(this.adapter?this.adapter.getNativeInput():null)||{disabled:!1,maxLength:-1,required:!1,type:"input",validity:{badInput:!1,valid:!0},value:""}},o}(tr),qo=Vo;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zo={},Go=cr(class extends ur{constructor(e){if(super(e),3!==e.type&&1!==e.type&&4!==e.type)throw Error("The `live` directive is not allowed on child or event bindings");if(!(e=>void 0===e.strings)(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===K||t===j)return t;const r=e.element,o=e.name;if(3===e.type){if(t===r[o])return K}else if(4===e.type){if(!!t===r.hasAttribute(o))return K}else if(1===e.type&&r.getAttribute(o)===t+"")return K;return((e,t=Zo)=>{e._$AH=t;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(e),t}}),Jo=["touchstart","touchmove","scroll","mousewheel"],Qo=(e={})=>{const t={};for(const r in e)t[r]=e[r];return Object.assign({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1},t)};class Yo extends Mo{constructor(){super(...arguments),this.mdcFoundationClass=qo,this.value="",this.type="text",this.placeholder="",this.label="",this.icon="",this.iconTrailing="",this.disabled=!1,this.required=!1,this.minLength=-1,this.maxLength=-1,this.outlined=!1,this.helper="",this.validateOnInitialRender=!1,this.validationMessage="",this.autoValidate=!1,this.pattern="",this.min="",this.max="",this.step=null,this.size=null,this.helperPersistent=!1,this.charCounter=!1,this.endAligned=!1,this.prefix="",this.suffix="",this.name="",this.readOnly=!1,this.autocapitalize="",this.outlineOpen=!1,this.outlineWidth=0,this.isUiValid=!0,this.focused=!1,this._validity=Qo(),this.validityTransform=null}get validity(){return this._checkValidity(this.value),this._validity}get willValidate(){return this.formElement.willValidate}get selectionStart(){return this.formElement.selectionStart}get selectionEnd(){return this.formElement.selectionEnd}focus(){const e=new CustomEvent("focus");this.formElement.dispatchEvent(e),this.formElement.focus()}blur(){const e=new CustomEvent("blur");this.formElement.dispatchEvent(e),this.formElement.blur()}select(){this.formElement.select()}setSelectionRange(e,t,r){this.formElement.setSelectionRange(e,t,r)}update(e){e.has("autoValidate")&&this.mdcFoundation&&this.mdcFoundation.setValidateOnValueChange(this.autoValidate),e.has("value")&&"string"!=typeof this.value&&(this.value=""+this.value),super.update(e)}setFormData(e){this.name&&e.append(this.name,this.value)}render(){const e=this.charCounter&&-1!==this.maxLength,t=!!this.helper||!!this.validationMessage||e,r={"mdc-text-field--disabled":this.disabled,"mdc-text-field--no-label":!this.label,"mdc-text-field--filled":!this.outlined,"mdc-text-field--outlined":this.outlined,"mdc-text-field--with-leading-icon":this.icon,"mdc-text-field--with-trailing-icon":this.iconTrailing,"mdc-text-field--end-aligned":this.endAligned};return W`
      <label class="mdc-text-field ${pr(r)}">
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
    `}updated(e){e.has("value")&&void 0!==e.get("value")&&(this.mdcFoundation.setValue(this.value),this.autoValidate&&this.reportValidity())}renderRipple(){return this.outlined?"":W`
      <span class="mdc-text-field__ripple"></span>
    `}renderOutline(){return this.outlined?W`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>`:""}renderLabel(){return this.label?W`
      <span
          .floatingLabelFoundation=${Fo(this.label)}
          id="label">${this.label}</span>
    `:""}renderLeadingIcon(){return this.icon?this.renderIcon(this.icon):""}renderTrailingIcon(){return this.iconTrailing?this.renderIcon(this.iconTrailing,!0):""}renderIcon(e,t=!1){return W`<i class="material-icons mdc-text-field__icon ${pr({"mdc-text-field__icon--leading":!t,"mdc-text-field__icon--trailing":t})}">${e}</i>`}renderPrefix(){return this.prefix?this.renderAffix(this.prefix):""}renderSuffix(){return this.suffix?this.renderAffix(this.suffix,!0):""}renderAffix(e,t=!1){return W`<span class="mdc-text-field__affix ${pr({"mdc-text-field__affix--prefix":!t,"mdc-text-field__affix--suffix":t})}">
        ${e}</span>`}renderInput(e){const t=-1===this.minLength?void 0:this.minLength,r=-1===this.maxLength?void 0:this.maxLength,o=this.autocapitalize?this.autocapitalize:void 0,i=this.validationMessage&&!this.isUiValid,n=this.label?"label":void 0,a=e?"helper-text":void 0,l=this.focused||this.helperPersistent||i?"helper-text":void 0;return W`
      <input
          aria-labelledby=${wr(n)}
          aria-controls="${wr(a)}"
          aria-describedby="${wr(l)}"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${Go(this.value)}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          minlength="${wr(t)}"
          maxlength="${wr(r)}"
          pattern="${wr(this.pattern?this.pattern:void 0)}"
          min="${wr(""===this.min?void 0:this.min)}"
          max="${wr(""===this.max?void 0:this.max)}"
          step="${wr(null===this.step?void 0:this.step)}"
          size="${wr(null===this.size?void 0:this.size)}"
          name="${wr(""===this.name?void 0:this.name)}"
          inputmode="${wr(this.inputMode)}"
          autocapitalize="${wr(o)}"
          @input="${this.handleInputChange}"
          @focus="${this.onInputFocus}"
          @blur="${this.onInputBlur}">`}renderLineRipple(){return this.outlined?"":W`
      <span .lineRippleFoundation=${Do()}></span>
    `}renderHelperText(e,t){const r=this.validationMessage&&!this.isUiValid,o={"mdc-text-field-helper-text--persistent":this.helperPersistent,"mdc-text-field-helper-text--validation-msg":r},i=this.focused||this.helperPersistent||r?void 0:"true",n=r?this.validationMessage:this.helper;return e?W`
      <div class="mdc-text-field-helper-line">
        <div id="helper-text"
             aria-hidden="${wr(i)}"
             class="mdc-text-field-helper-text ${pr(o)}"
             >${n}</div>
        ${this.renderCharCounter(t)}
      </div>`:""}renderCharCounter(e){const t=Math.min(this.value.length,this.maxLength);return e?W`
      <span class="mdc-text-field-character-counter"
            >${t} / ${this.maxLength}</span>`:""}onInputFocus(){this.focused=!0}onInputBlur(){this.focused=!1,this.reportValidity()}checkValidity(){const e=this._checkValidity(this.value);if(!e){const e=new Event("invalid",{bubbles:!1,cancelable:!0});this.dispatchEvent(e)}return e}reportValidity(){const e=this.checkValidity();return this.mdcFoundation.setValid(e),this.isUiValid=e,e}_checkValidity(e){const t=this.formElement.validity;let r=Qo(t);if(this.validityTransform){const t=this.validityTransform(e,r);r=Object.assign(Object.assign({},r),t),this.mdcFoundation.setUseNativeValidation(!1)}else this.mdcFoundation.setUseNativeValidation(!0);return this._validity=r,this._validity.valid}setCustomValidity(e){this.validationMessage=e,this.formElement.setCustomValidity(e)}handleInputChange(){this.value=this.formElement.value}createAdapter(){return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},this.getRootAdapterMethods()),this.getInputAdapterMethods()),this.getLabelAdapterMethods()),this.getLineRippleAdapterMethods()),this.getOutlineAdapterMethods())}getRootAdapterMethods(){return Object.assign({registerTextFieldInteractionHandler:(e,t)=>this.addEventListener(e,t),deregisterTextFieldInteractionHandler:(e,t)=>this.removeEventListener(e,t),registerValidationAttributeChangeHandler:e=>{const t=new MutationObserver((t=>{e((e=>e.map((e=>e.attributeName)).filter((e=>e)))(t))}));return t.observe(this.formElement,{attributes:!0}),t},deregisterValidationAttributeChangeHandler:e=>e.disconnect()},Jt(this.mdcRoot))}getInputAdapterMethods(){return{getNativeInput:()=>this.formElement,setInputAttr:()=>{},removeInputAttr:()=>{},isFocused:()=>!!this.shadowRoot&&this.shadowRoot.activeElement===this.formElement,registerInputInteractionHandler:(e,t)=>this.formElement.addEventListener(e,t,{passive:e in Jo}),deregisterInputInteractionHandler:(e,t)=>this.formElement.removeEventListener(e,t)}}getLabelAdapterMethods(){return{floatLabel:e=>this.labelElement&&this.labelElement.floatingLabelFoundation.float(e),getLabelWidth:()=>this.labelElement?this.labelElement.floatingLabelFoundation.getWidth():0,hasLabel:()=>!!this.labelElement,shakeLabel:e=>this.labelElement&&this.labelElement.floatingLabelFoundation.shake(e),setLabelRequired:e=>{this.labelElement&&this.labelElement.floatingLabelFoundation.setRequired(e)}}}getLineRippleAdapterMethods(){return{activateLineRipple:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.activate()},deactivateLineRipple:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.deactivate()},setLineRippleTransformOrigin:e=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.setRippleCenter(e)}}}async getUpdateComplete(){var e;const t=await super.getUpdateComplete();return await(null===(e=this.outlineElement)||void 0===e?void 0:e.updateComplete),t}firstUpdated(){var e;super.firstUpdated(),this.mdcFoundation.setValidateOnValueChange(this.autoValidate),this.validateOnInitialRender&&this.reportValidity(),null===(e=this.outlineElement)||void 0===e||e.updateComplete.then((()=>{var e;this.outlineWidth=(null===(e=this.labelElement)||void 0===e?void 0:e.floatingLabelFoundation.getWidth())||0}))}getOutlineAdapterMethods(){return{closeOutline:()=>this.outlineElement&&(this.outlineOpen=!1),hasOutline:()=>!!this.outlineElement,notchOutline:e=>{this.outlineElement&&!this.outlineOpen&&(this.outlineWidth=e,this.outlineOpen=!0)}}}async layout(){await this.updateComplete;const e=this.labelElement;if(!e)return void(this.outlineOpen=!1);const t=!!this.label&&!!this.value;if(e.floatingLabelFoundation.float(t),!this.outlined)return;this.outlineOpen=t,await this.updateComplete;const r=e.floatingLabelFoundation.getWidth();this.outlineOpen&&(this.outlineWidth=r,await this.updateComplete)}}o([ye(".mdc-text-field")],Yo.prototype,"mdcRoot",void 0),o([ye("input")],Yo.prototype,"formElement",void 0),o([ye(".mdc-floating-label")],Yo.prototype,"labelElement",void 0),o([ye(".mdc-line-ripple")],Yo.prototype,"lineRippleElement",void 0),o([ye("mwc-notched-outline")],Yo.prototype,"outlineElement",void 0),o([ye(".mdc-notched-outline__notch")],Yo.prototype,"notchElement",void 0),o([ge({type:String})],Yo.prototype,"value",void 0),o([ge({type:String})],Yo.prototype,"type",void 0),o([ge({type:String})],Yo.prototype,"placeholder",void 0),o([ge({type:String}),Tr((function(e,t){void 0!==t&&this.label!==t&&this.layout()}))],Yo.prototype,"label",void 0),o([ge({type:String})],Yo.prototype,"icon",void 0),o([ge({type:String})],Yo.prototype,"iconTrailing",void 0),o([ge({type:Boolean,reflect:!0})],Yo.prototype,"disabled",void 0),o([ge({type:Boolean})],Yo.prototype,"required",void 0),o([ge({type:Number})],Yo.prototype,"minLength",void 0),o([ge({type:Number})],Yo.prototype,"maxLength",void 0),o([ge({type:Boolean,reflect:!0}),Tr((function(e,t){void 0!==t&&this.outlined!==t&&this.layout()}))],Yo.prototype,"outlined",void 0),o([ge({type:String})],Yo.prototype,"helper",void 0),o([ge({type:Boolean})],Yo.prototype,"validateOnInitialRender",void 0),o([ge({type:String})],Yo.prototype,"validationMessage",void 0),o([ge({type:Boolean})],Yo.prototype,"autoValidate",void 0),o([ge({type:String})],Yo.prototype,"pattern",void 0),o([ge({type:String})],Yo.prototype,"min",void 0),o([ge({type:String})],Yo.prototype,"max",void 0),o([ge({type:String})],Yo.prototype,"step",void 0),o([ge({type:Number})],Yo.prototype,"size",void 0),o([ge({type:Boolean})],Yo.prototype,"helperPersistent",void 0),o([ge({type:Boolean})],Yo.prototype,"charCounter",void 0),o([ge({type:Boolean})],Yo.prototype,"endAligned",void 0),o([ge({type:String})],Yo.prototype,"prefix",void 0),o([ge({type:String})],Yo.prototype,"suffix",void 0),o([ge({type:String})],Yo.prototype,"name",void 0),o([ge({type:String})],Yo.prototype,"inputMode",void 0),o([ge({type:Boolean})],Yo.prototype,"readOnly",void 0),o([ge({type:String})],Yo.prototype,"autocapitalize",void 0),o([me()],Yo.prototype,"outlineOpen",void 0),o([me()],Yo.prototype,"outlineWidth",void 0),o([me()],Yo.prototype,"isUiValid",void 0),o([me()],Yo.prototype,"focused",void 0),o([be({passive:!0})],Yo.prototype,"handleInputChange",null);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const Xo=c`.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-text-field--filled{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-text-field--filled .mdc-text-field__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-text-field--filled .mdc-text-field__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-text-field--filled.mdc-ripple-upgraded--unbounded .mdc-text-field__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-activation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-deactivation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-text-field__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{color:rgba(0, 0, 0, 0.87)}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.54)}}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.54)}}.mdc-text-field .mdc-text-field__input{caret-color:#6200ee;caret-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field-character-counter,.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}.mdc-text-field__affix{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{background-color:rgba(0, 0, 0, 0.87);background-color:var(--mdc-ripple-color, rgba(0, 0, 0, 0.87))}.mdc-text-field--filled:hover .mdc-text-field__ripple::before,.mdc-text-field--filled.mdc-ripple-surface--hover .mdc-text-field__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:whitesmoke}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42)}.mdc-text-field--filled:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.38)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px, var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-text-field__ripple::before,.mdc-text-field--outlined .mdc-text-field__ripple::after{background-color:transparent;background-color:var(--mdc-ripple-color, transparent)}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:transparent}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0;transition:none}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px;line-height:1.5rem}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(98, 0, 238, 0.87)}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid .mdc-text-field__input{caret-color:#b00020;caret-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-text-field__input{color:rgba(0, 0, 0, 0.38)}@media all{.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.38)}}@media all{.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.38)}}.mdc-text-field--disabled .mdc-floating-label{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06)}.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.06)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-floating-label{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--leading{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:GrayText}}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled{background-color:#fafafa}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-text-field-helper-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;opacity:0;will-change:opacity;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-text-field-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-text-field-helper-text--persistent{transition:none;opacity:1;will-change:initial}.mdc-text-field-character-counter{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-left:auto;margin-right:0;padding-left:16px;padding-right:0;white-space:nowrap}.mdc-text-field-character-counter::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field__icon{align-self:center;cursor:pointer}.mdc-text-field__icon:not([tabindex]),.mdc-text-field__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-text-field__icon svg{display:block}.mdc-text-field__icon--leading{margin-left:16px;margin-right:8px}[dir=rtl] .mdc-text-field__icon--leading,.mdc-text-field__icon--leading[dir=rtl]{margin-left:8px;margin-right:16px}.mdc-text-field__icon--trailing{padding:12px;margin-left:0px;margin-right:0px}[dir=rtl] .mdc-text-field__icon--trailing,.mdc-text-field__icon--trailing[dir=rtl]{margin-left:0px;margin-right:0px}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-flex;flex-direction:column;outline:none}.mdc-text-field{width:100%}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42);border-bottom-color:var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42))}.mdc-text-field:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87);border-bottom-color:var(--mdc-text-field-hover-line-color, rgba(0, 0, 0, 0.87))}.mdc-text-field.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06);border-bottom-color:var(--mdc-text-field-disabled-line-color, rgba(0, 0, 0, 0.06))}.mdc-text-field.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field__input{direction:inherit}mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-idle-border-color, rgba(0, 0, 0, 0.38) )}:host(:not([disabled]):hover) :not(.mdc-text-field--invalid):not(.mdc-text-field--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-hover-border-color, rgba(0, 0, 0, 0.87) )}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-error-color, var(--mdc-theme-error, #b00020) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-character-counter,:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid .mdc-text-field__icon{color:var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input{color:var(--mdc-text-field-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg),:host(:not([disabled])) .mdc-text-field-helper-line:not(.mdc-text-field--invalid) .mdc-text-field-character-counter{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-text-field.mdc-text-field--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-disabled-border-color, rgba(0, 0, 0, 0.06) )}:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field .mdc-text-field__input,:host([disabled]) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-helper-text,:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-character-counter{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}`
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let $o=class extends Yo{};$o.styles=[Xo],$o=o([ue("mwc-textfield")],$o);
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
var ei,ti,ri={ANCHOR:"mdc-menu-surface--anchor",ANIMATING_CLOSED:"mdc-menu-surface--animating-closed",ANIMATING_OPEN:"mdc-menu-surface--animating-open",FIXED:"mdc-menu-surface--fixed",IS_OPEN_BELOW:"mdc-menu-surface--is-open-below",OPEN:"mdc-menu-surface--open",ROOT:"mdc-menu-surface"},oi={CLOSED_EVENT:"MDCMenuSurface:closed",CLOSING_EVENT:"MDCMenuSurface:closing",OPENED_EVENT:"MDCMenuSurface:opened",OPENING_EVENT:"MDCMenuSurface:opening",FOCUSABLE_ELEMENTS:'button:not(:disabled), [href]:not([aria-disabled="true"]), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'},ii={TRANSITION_OPEN_DURATION:120,TRANSITION_CLOSE_DURATION:75,MARGIN_TO_EDGE:32,ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO:.67,TOUCH_EVENT_WAIT_MS:30};!function(e){e[e.BOTTOM=1]="BOTTOM",e[e.CENTER=2]="CENTER",e[e.RIGHT=4]="RIGHT",e[e.FLIP_RTL=8]="FLIP_RTL"}(ei||(ei={})),function(e){e[e.TOP_LEFT=0]="TOP_LEFT",e[e.TOP_RIGHT=4]="TOP_RIGHT",e[e.BOTTOM_LEFT=1]="BOTTOM_LEFT",e[e.BOTTOM_RIGHT=5]="BOTTOM_RIGHT",e[e.TOP_START=8]="TOP_START",e[e.TOP_END=12]="TOP_END",e[e.BOTTOM_START=9]="BOTTOM_START",e[e.BOTTOM_END=13]="BOTTOM_END"}(ti||(ti={}));
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
var ni=function(e){function o(t){var i=e.call(this,r(r({},o.defaultAdapter),t))||this;return i.isSurfaceOpen=!1,i.isQuickOpen=!1,i.isHoistedElement=!1,i.isFixedPosition=!1,i.isHorizontallyCenteredOnViewport=!1,i.maxHeight=0,i.openBottomBias=0,i.openAnimationEndTimerId=0,i.closeAnimationEndTimerId=0,i.animationRequestId=0,i.anchorCorner=ti.TOP_START,i.originCorner=ti.TOP_START,i.anchorMargin={top:0,right:0,bottom:0,left:0},i.position={x:0,y:0},i}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return ri},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return oi},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return ii},enumerable:!1,configurable:!0}),Object.defineProperty(o,"Corner",{get:function(){return ti},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},hasAnchor:function(){return!1},isElementInContainer:function(){return!1},isFocused:function(){return!1},isRtl:function(){return!1},getInnerDimensions:function(){return{height:0,width:0}},getAnchorDimensions:function(){return null},getWindowDimensions:function(){return{height:0,width:0}},getBodyDimensions:function(){return{height:0,width:0}},getWindowScroll:function(){return{x:0,y:0}},setPosition:function(){},setMaxHeight:function(){},setTransformOrigin:function(){},saveFocus:function(){},restoreFocus:function(){},notifyClose:function(){},notifyClosing:function(){},notifyOpen:function(){},notifyOpening:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){var e=o.cssClasses,t=e.ROOT,r=e.OPEN;if(!this.adapter.hasClass(t))throw Error(t+" class required in root element.");this.adapter.hasClass(r)&&(this.isSurfaceOpen=!0)},o.prototype.destroy=function(){clearTimeout(this.openAnimationEndTimerId),clearTimeout(this.closeAnimationEndTimerId),cancelAnimationFrame(this.animationRequestId)},o.prototype.setAnchorCorner=function(e){this.anchorCorner=e},o.prototype.flipCornerHorizontally=function(){this.originCorner=this.originCorner^ei.RIGHT},o.prototype.setAnchorMargin=function(e){this.anchorMargin.top=e.top||0,this.anchorMargin.right=e.right||0,this.anchorMargin.bottom=e.bottom||0,this.anchorMargin.left=e.left||0},o.prototype.setIsHoisted=function(e){this.isHoistedElement=e},o.prototype.setFixedPosition=function(e){this.isFixedPosition=e},o.prototype.isFixed=function(){return this.isFixedPosition},o.prototype.setAbsolutePosition=function(e,t){this.position.x=this.isFinite(e)?e:0,this.position.y=this.isFinite(t)?t:0},o.prototype.setIsHorizontallyCenteredOnViewport=function(e){this.isHorizontallyCenteredOnViewport=e},o.prototype.setQuickOpen=function(e){this.isQuickOpen=e},o.prototype.setMaxHeight=function(e){this.maxHeight=e},o.prototype.setOpenBottomBias=function(e){this.openBottomBias=e},o.prototype.isOpen=function(){return this.isSurfaceOpen},o.prototype.open=function(){var e=this;this.isSurfaceOpen||(this.adapter.notifyOpening(),this.adapter.saveFocus(),this.isQuickOpen?(this.isSurfaceOpen=!0,this.adapter.addClass(o.cssClasses.OPEN),this.dimensions=this.adapter.getInnerDimensions(),this.autoposition(),this.adapter.notifyOpen()):(this.adapter.addClass(o.cssClasses.ANIMATING_OPEN),this.animationRequestId=requestAnimationFrame((function(){e.dimensions=e.adapter.getInnerDimensions(),e.autoposition(),e.adapter.addClass(o.cssClasses.OPEN),e.openAnimationEndTimerId=setTimeout((function(){e.openAnimationEndTimerId=0,e.adapter.removeClass(o.cssClasses.ANIMATING_OPEN),e.adapter.notifyOpen()}),ii.TRANSITION_OPEN_DURATION)})),this.isSurfaceOpen=!0))},o.prototype.close=function(e){var t=this;if(void 0===e&&(e=!1),this.isSurfaceOpen){if(this.adapter.notifyClosing(),this.isQuickOpen)return this.isSurfaceOpen=!1,e||this.maybeRestoreFocus(),this.adapter.removeClass(o.cssClasses.OPEN),this.adapter.removeClass(o.cssClasses.IS_OPEN_BELOW),void this.adapter.notifyClose();this.adapter.addClass(o.cssClasses.ANIMATING_CLOSED),requestAnimationFrame((function(){t.adapter.removeClass(o.cssClasses.OPEN),t.adapter.removeClass(o.cssClasses.IS_OPEN_BELOW),t.closeAnimationEndTimerId=setTimeout((function(){t.closeAnimationEndTimerId=0,t.adapter.removeClass(o.cssClasses.ANIMATING_CLOSED),t.adapter.notifyClose()}),ii.TRANSITION_CLOSE_DURATION)})),this.isSurfaceOpen=!1,e||this.maybeRestoreFocus()}},o.prototype.handleBodyClick=function(e){var t=e.target;this.adapter.isElementInContainer(t)||this.close()},o.prototype.handleKeydown=function(e){var t=e.keyCode;("Escape"===e.key||27===t)&&this.close()},o.prototype.autoposition=function(){var e;this.measurements=this.getAutoLayoutmeasurements();var t=this.getoriginCorner(),r=this.getMenuSurfaceMaxHeight(t),i=this.hasBit(t,ei.BOTTOM)?"bottom":"top",n=this.hasBit(t,ei.RIGHT)?"right":"left",a=this.getHorizontalOriginOffset(t),l=this.getVerticalOriginOffset(t),s=this.measurements,d=s.anchorSize,c=s.surfaceSize,u=((e={})[n]=a,e[i]=l,e);d.width/c.width>ii.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO&&(n="center"),(this.isHoistedElement||this.isFixedPosition)&&this.adjustPositionForHoistedElement(u),this.adapter.setTransformOrigin(n+" "+i),this.adapter.setPosition(u),this.adapter.setMaxHeight(r?r+"px":""),this.hasBit(t,ei.BOTTOM)||this.adapter.addClass(o.cssClasses.IS_OPEN_BELOW)},o.prototype.getAutoLayoutmeasurements=function(){var e=this.adapter.getAnchorDimensions(),t=this.adapter.getBodyDimensions(),r=this.adapter.getWindowDimensions(),o=this.adapter.getWindowScroll();return e||(e={top:this.position.y,right:this.position.x,bottom:this.position.y,left:this.position.x,width:0,height:0}),{anchorSize:e,bodySize:t,surfaceSize:this.dimensions,viewportDistance:{top:e.top,right:r.width-e.right,bottom:r.height-e.bottom,left:e.left},viewportSize:r,windowScroll:o}},o.prototype.getoriginCorner=function(){var e,t,r=this.originCorner,i=this.measurements,n=i.viewportDistance,a=i.anchorSize,l=i.surfaceSize,s=o.numbers.MARGIN_TO_EDGE;this.hasBit(this.anchorCorner,ei.BOTTOM)?(e=n.top-s+this.anchorMargin.bottom,t=n.bottom-s-this.anchorMargin.bottom):(e=n.top-s+this.anchorMargin.top,t=n.bottom-s+a.height-this.anchorMargin.top),!(t-l.height>0)&&e>t+this.openBottomBias&&(r=this.setBit(r,ei.BOTTOM));var d,c,u,p=this.adapter.isRtl(),h=this.hasBit(this.anchorCorner,ei.FLIP_RTL),g=this.hasBit(this.anchorCorner,ei.RIGHT)||this.hasBit(r,ei.RIGHT);(u=p&&h?!g:g)?(d=n.left+a.width+this.anchorMargin.right,c=n.right-this.anchorMargin.right):(d=n.left+this.anchorMargin.left,c=n.right+a.width-this.anchorMargin.left);var m=d-l.width>0,f=c-l.width>0,b=this.hasBit(r,ei.FLIP_RTL)&&this.hasBit(r,ei.RIGHT);return f&&b&&p||!m&&b?r=this.unsetBit(r,ei.RIGHT):(m&&u&&p||m&&!u&&g||!f&&d>=c)&&(r=this.setBit(r,ei.RIGHT)),r},o.prototype.getMenuSurfaceMaxHeight=function(e){if(this.maxHeight>0)return this.maxHeight;var t=this.measurements.viewportDistance,r=0,i=this.hasBit(e,ei.BOTTOM),n=this.hasBit(this.anchorCorner,ei.BOTTOM),a=o.numbers.MARGIN_TO_EDGE;return i?(r=t.top+this.anchorMargin.top-a,n||(r+=this.measurements.anchorSize.height)):(r=t.bottom-this.anchorMargin.bottom+this.measurements.anchorSize.height-a,n&&(r-=this.measurements.anchorSize.height)),r},o.prototype.getHorizontalOriginOffset=function(e){var t=this.measurements.anchorSize,r=this.hasBit(e,ei.RIGHT),o=this.hasBit(this.anchorCorner,ei.RIGHT);if(r){var i=o?t.width-this.anchorMargin.left:this.anchorMargin.right;return this.isHoistedElement||this.isFixedPosition?i-(this.measurements.viewportSize.width-this.measurements.bodySize.width):i}return o?t.width-this.anchorMargin.right:this.anchorMargin.left},o.prototype.getVerticalOriginOffset=function(e){var t=this.measurements.anchorSize,r=this.hasBit(e,ei.BOTTOM),o=this.hasBit(this.anchorCorner,ei.BOTTOM);return r?o?t.height-this.anchorMargin.top:-this.anchorMargin.bottom:o?t.height+this.anchorMargin.bottom:this.anchorMargin.top},o.prototype.adjustPositionForHoistedElement=function(e){var t,r,o=this.measurements,n=o.windowScroll,a=o.viewportDistance,l=o.surfaceSize,s=o.viewportSize,d=Object.keys(e);try{for(var c=i(d),u=c.next();!u.done;u=c.next()){var p=u.value,h=e[p]||0;!this.isHorizontallyCenteredOnViewport||"left"!==p&&"right"!==p?(h+=a[p],this.isFixedPosition||("top"===p?h+=n.y:"bottom"===p?h-=n.y:"left"===p?h+=n.x:h-=n.x),e[p]=h):e[p]=(s.width-l.width)/2}}catch(e){t={error:e}}finally{try{u&&!u.done&&(r=c.return)&&r.call(c)}finally{if(t)throw t.error}}},o.prototype.maybeRestoreFocus=function(){var e=this,t=this.adapter.isFocused(),r=this.adapter.getOwnerDocument?this.adapter.getOwnerDocument():document,o=r.activeElement&&this.adapter.isElementInContainer(r.activeElement);(t||o)&&setTimeout((function(){e.adapter.restoreFocus()}),ii.TOUCH_EVENT_WAIT_MS)},o.prototype.hasBit=function(e,t){return!!(e&t)},o.prototype.setBit=function(e,t){return e|t},o.prototype.unsetBit=function(e,t){return e^t},o.prototype.isFinite=function(e){return"number"==typeof e&&isFinite(e)},o}(tr),ai=ni;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const li={TOP_LEFT:ti.TOP_LEFT,TOP_RIGHT:ti.TOP_RIGHT,BOTTOM_LEFT:ti.BOTTOM_LEFT,BOTTOM_RIGHT:ti.BOTTOM_RIGHT,TOP_START:ti.TOP_START,TOP_END:ti.TOP_END,BOTTOM_START:ti.BOTTOM_START,BOTTOM_END:ti.BOTTOM_END};class si extends er{constructor(){super(...arguments),this.mdcFoundationClass=ai,this.absolute=!1,this.fullwidth=!1,this.fixed=!1,this.x=null,this.y=null,this.quick=!1,this.open=!1,this.stayOpenOnBodyClick=!1,this.bitwiseCorner=ti.TOP_START,this.previousMenuCorner=null,this.menuCorner="START",this.corner="TOP_START",this.styleTop="",this.styleLeft="",this.styleRight="",this.styleBottom="",this.styleMaxHeight="",this.styleTransformOrigin="",this.anchor=null,this.previouslyFocused=null,this.previousAnchor=null,this.onBodyClickBound=()=>{}}render(){return this.renderSurface()}renderSurface(){const e=this.getRootClasses(),t=this.getRootStyles();return W`
      <div
          class=${pr(e)}
          style="${mr(t)}"
          @keydown=${this.onKeydown}
          @opened=${this.registerBodyClick}
          @closed=${this.deregisterBodyClick}>
        ${this.renderContent()}
      </div>`}getRootClasses(){return{"mdc-menu-surface":!0,"mdc-menu-surface--fixed":this.fixed,"mdc-menu-surface--fullwidth":this.fullwidth}}getRootStyles(){return{top:this.styleTop,left:this.styleLeft,right:this.styleRight,bottom:this.styleBottom,"max-height":this.styleMaxHeight,"transform-origin":this.styleTransformOrigin}}renderContent(){return W`<slot></slot>`}createAdapter(){return Object.assign(Object.assign({},Jt(this.mdcRoot)),{hasAnchor:()=>!!this.anchor,notifyClose:()=>{const e=new CustomEvent("closed",{bubbles:!0,composed:!0});this.open=!1,this.mdcRoot.dispatchEvent(e)},notifyClosing:()=>{const e=new CustomEvent("closing",{bubbles:!0,composed:!0});this.mdcRoot.dispatchEvent(e)},notifyOpen:()=>{const e=new CustomEvent("opened",{bubbles:!0,composed:!0});this.open=!0,this.mdcRoot.dispatchEvent(e)},notifyOpening:()=>{const e=new CustomEvent("opening",{bubbles:!0,composed:!0});this.mdcRoot.dispatchEvent(e)},isElementInContainer:()=>!1,isRtl:()=>!!this.mdcRoot&&"rtl"===getComputedStyle(this.mdcRoot).direction,setTransformOrigin:e=>{this.mdcRoot&&(this.styleTransformOrigin=e)},isFocused:()=>$t(this),saveFocus:()=>{const e=Xt(),t=e.length;t||(this.previouslyFocused=null),this.previouslyFocused=e[t-1]},restoreFocus:()=>{this.previouslyFocused&&"focus"in this.previouslyFocused&&this.previouslyFocused.focus()},getInnerDimensions:()=>{const e=this.mdcRoot;return e?{width:e.offsetWidth,height:e.offsetHeight}:{width:0,height:0}},getAnchorDimensions:()=>{const e=this.anchor;return e?e.getBoundingClientRect():null},getBodyDimensions:()=>({width:document.body.clientWidth,height:document.body.clientHeight}),getWindowDimensions:()=>({width:window.innerWidth,height:window.innerHeight}),getWindowScroll:()=>({x:window.pageXOffset,y:window.pageYOffset}),setPosition:e=>{this.mdcRoot&&(this.styleLeft="left"in e?e.left+"px":"",this.styleRight="right"in e?e.right+"px":"",this.styleTop="top"in e?e.top+"px":"",this.styleBottom="bottom"in e?e.bottom+"px":"")},setMaxHeight:async e=>{this.mdcRoot&&(this.styleMaxHeight=e,await this.updateComplete,this.styleMaxHeight=`var(--mdc-menu-max-height, ${e})`)}})}onKeydown(e){this.mdcFoundation&&this.mdcFoundation.handleKeydown(e)}onBodyClick(e){this.stayOpenOnBodyClick||-1===e.composedPath().indexOf(this)&&this.close()}registerBodyClick(){this.onBodyClickBound=this.onBodyClick.bind(this),document.body.addEventListener("click",this.onBodyClickBound,{passive:!0,capture:!0})}deregisterBodyClick(){document.body.removeEventListener("click",this.onBodyClickBound,{capture:!0})}onOpenChanged(e,t){this.mdcFoundation&&(e?this.mdcFoundation.open():void 0!==t&&this.mdcFoundation.close())}close(){this.open=!1}show(){this.open=!0}}o([ye(".mdc-menu-surface")],si.prototype,"mdcRoot",void 0),o([ye("slot")],si.prototype,"slotElement",void 0),o([ge({type:Boolean}),Tr((function(e){this.mdcFoundation&&!this.fixed&&this.mdcFoundation.setIsHoisted(e)}))],si.prototype,"absolute",void 0),o([ge({type:Boolean})],si.prototype,"fullwidth",void 0),o([ge({type:Boolean}),Tr((function(e){this.mdcFoundation&&!this.absolute&&this.mdcFoundation.setFixedPosition(e)}))],si.prototype,"fixed",void 0),o([ge({type:Number}),Tr((function(e){this.mdcFoundation&&null!==this.y&&null!==e&&(this.mdcFoundation.setAbsolutePosition(e,this.y),this.mdcFoundation.setAnchorMargin({left:e,top:this.y,right:-e,bottom:this.y}))}))],si.prototype,"x",void 0),o([ge({type:Number}),Tr((function(e){this.mdcFoundation&&null!==this.x&&null!==e&&(this.mdcFoundation.setAbsolutePosition(this.x,e),this.mdcFoundation.setAnchorMargin({left:this.x,top:e,right:-this.x,bottom:e}))}))],si.prototype,"y",void 0),o([ge({type:Boolean}),Tr((function(e){this.mdcFoundation&&this.mdcFoundation.setQuickOpen(e)}))],si.prototype,"quick",void 0),o([ge({type:Boolean,reflect:!0}),Tr((function(e,t){this.onOpenChanged(e,t)}))],si.prototype,"open",void 0),o([ge({type:Boolean})],si.prototype,"stayOpenOnBodyClick",void 0),o([me(),Tr((function(e){this.mdcFoundation&&this.mdcFoundation.setAnchorCorner(e)}))],si.prototype,"bitwiseCorner",void 0),o([ge({type:String}),Tr((function(e){if(this.mdcFoundation){const t="START"===e||"END"===e,r=null===this.previousMenuCorner,o=!r&&e!==this.previousMenuCorner;t&&(o||r&&"END"===e)&&(this.bitwiseCorner=this.bitwiseCorner^ei.RIGHT,this.mdcFoundation.flipCornerHorizontally(),this.previousMenuCorner=e)}}))],si.prototype,"menuCorner",void 0),o([ge({type:String}),Tr((function(e){if(this.mdcFoundation&&e){let t=li[e];"END"===this.menuCorner&&(t^=ei.RIGHT),this.bitwiseCorner=t}}))],si.prototype,"corner",void 0),o([me()],si.prototype,"styleTop",void 0),o([me()],si.prototype,"styleLeft",void 0),o([me()],si.prototype,"styleRight",void 0),o([me()],si.prototype,"styleBottom",void 0),o([me()],si.prototype,"styleMaxHeight",void 0),o([me()],si.prototype,"styleTransformOrigin",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const di=c`.mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-width:var(--mdc-menu-max-width, calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px));margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0, 0, 0.2, 1),height 250ms cubic-bezier(0, 0, 0.2, 1);box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);color:#000;color:var(--mdc-theme-on-surface, #000);border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity .075s linear}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}:host(:not([open])){display:none}.mdc-menu-surface{z-index:8;z-index:var(--mdc-menu-z-index, 8);min-width:112px;min-width:var(--mdc-menu-min-width, 112px)}`
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let ci=class extends si{};ci.styles=[di],ci=o([ue("mwc-menu-surface")],ci);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ui extends de{set project(e){"string"==typeof e?requestAnimationFrame((()=>{var t;const r=this.getRootNode();this._project=null!==(t=r.getElementById(e))&&void 0!==t?t:void 0})):this._project=e}}o([ge()],ui.prototype,"project",null),o([me()],ui.prototype,"_project",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let pi=class extends ui{constructor(){super(...arguments),this.state="closed",this._postStateChangeRenderDone=!1}update(e){e.has("state")&&(this._postStateChangeRenderDone=!1),super.update(e)}render(){var e;return W`<mwc-menu-surface
      fixed
      quick
      .open=${"closed"!==this.state}
      .anchor=${null!==(e=this.anchorElement)&&void 0!==e?e:null}
      corner="BOTTOM_START"
      class="${this.state}"
      @closed=${this._onSurfaceClosed}
      ><div class="wrapper">${this._surfaceContents}</div></mwc-menu-surface
    >`}async updated(){if(!this._postStateChangeRenderDone){if("menu"===this.state){const e=this._menuList;e&&(await e.updateComplete,e.focusItemAtIndex(0))}else if("rename"===this.state||"newfile"===this.state){const e=this._filenameInput;e&&(await e.updateComplete,e.focus(),"rename"===this.state&&e.setSelectionRange(0,e.value.lastIndexOf(".")))}this._postStateChangeRenderDone=!0}}get _surfaceContents(){switch(this.state){case"closed":return j;case"menu":return this._menu;case"rename":return this._rename;case"newfile":return this._newFile}}get _menu(){return W`
      <mwc-list class="menu-list" @action=${this._onMenuAction}>
        <mwc-list-item graphic="icon" id="renameButton">
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
        <mwc-list-item graphic="icon" id="deleteButton">
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
    `}get _rename(){return W`
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
    `}get _newFile(){return W`
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
    `}_onSurfaceClosed(){this.state="closed"}_onClickCancel(){this._surface.close()}_onMenuAction(e){switch(e.detail.index){case 0:return this._onMenuSelectRename();case 1:return this._onMenuSelectDelete()}}_onMenuSelectRename(){this.state="rename"}_onMenuSelectDelete(){this._surface.close(),this._project&&this.filename&&this._project.deleteFile(this.filename)}_onFilenameInputChange(){this.requestUpdate()}get _filenameInputValid(){return!!(this._project&&this._filenameInput&&this._project.isValidNewFilename(this._filenameInput.value))}_onFilenameInputKeydown(e){var t;"Enter"===e.key&&!1===(null===(t=this._submitButton)||void 0===t?void 0:t.disabled)&&(e.preventDefault(),this._submitButton.click())}_onSubmitRename(){var e;this._surface.close();const t=this.filename,r=null===(e=this._filenameInput)||void 0===e?void 0:e.value;this._project&&t&&r&&this._project.renameFile(t,r)}_onSubmitNewFile(){var e;this._surface.close();const t=null===(e=this._filenameInput)||void 0===e?void 0:e.value;this._project&&t&&(this._project.addFile(t),this.dispatchEvent(new CustomEvent("newFile",{detail:{filename:t}})))}};pi.styles=c`
    mwc-menu-surface {
      --mdc-theme-primary: var(
        --playground-floating-controls-color,
        var(--playground-highlight-color, #6200ee)
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
  `,o([ge({attribute:!1})],pi.prototype,"anchorElement",void 0),o([ge()],pi.prototype,"state",void 0),o([ge()],pi.prototype,"filename",void 0),o([ye("mwc-menu-surface")],pi.prototype,"_surface",void 0),o([ye(".menu-list")],pi.prototype,"_menuList",void 0),o([ye(".filename-input")],pi.prototype,"_filenameInput",void 0),o([ye(".submit-button")],pi.prototype,"_submitButton",void 0),pi=o([ue("playground-file-system-controls")],pi);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let hi=class extends ui{constructor(){super(...arguments),this.editableFileSystem=!1,this._activeFileName="",this._activeFileIndex=0,this._onProjectFilesChanged=e=>{this._handleFilesChanged(e.projectLoaded)}}set editor(e){"string"==typeof e?requestAnimationFrame((()=>{var t;const r=this.getRootNode();this._editor=null!==(t=r.getElementById(e))&&void 0!==t?t:void 0})):this._editor=e}get _visibleFiles(){var e,t;return(null!==(t=null===(e=this._project)||void 0===e?void 0:e.files)&&void 0!==t?t:[]).filter((({hidden:e})=>!e))}update(e){if(e.has("_project")){const t=e.get("_project");t&&t.removeEventListener("filesChanged",this._onProjectFilesChanged),this._project&&(this._handleFilesChanged(!0),this._project.addEventListener("filesChanged",this._onProjectFilesChanged))}e.has("_activeFileName")&&this._editor&&(this._editor.filename=this._activeFileName,this._setNewActiveFile()),super.update(e)}render(){return W`
      <playground-internal-tab-bar
        @tabchange=${this._onTabchange}
        label="File selector"
      >
        ${this._visibleFiles.map((({name:e,label:t})=>W`<playground-internal-tab
              .active=${e===this._activeFileName}
              data-filename=${e}
            >
              ${t||e}
              ${this.editableFileSystem?W`<mwc-icon-button
                    aria-label="File menu"
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
                  </mwc-icon-button>`:j}
            </playground-internal-tab>`))}
      </playground-internal-tab-bar>

      ${this.editableFileSystem?W`
            <mwc-icon-button
              class="add-file-button"
              aria-label="New file"
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
          `:j}
    `}_handleFilesChanged(e=!1){var t;if(e){const e=null===(t=this._visibleFiles.find((e=>e.selected)))||void 0===t?void 0:t.name;void 0!==e&&(this._activeFileName=e)}this._setNewActiveFile(),this.requestUpdate()}_onTabchange(e){const t=e.detail.tab;if(!t)return;const r=t.dataset.filename,o=t.index;r!==this._activeFileName&&(this._activeFileName=r,this._activeFileIndex=o)}_onOpenMenu(e){const t=this._fileSystemControls;if(t){t.state="menu";for(const r of e.composedPath())if(r instanceof HTMLElement&&r.dataset.filename){t.filename=r.dataset.filename;break}t.anchorElement=e.target,e.stopPropagation()}}_onClickAddFile(e){const t=this._fileSystemControls;t&&(t.state="newfile",t.anchorElement=e.target)}_onNewFile(e){this._activeFileName=e.detail.filename}_setNewActiveFile(){if(this._activeFileName){const e=this._visibleFiles.findIndex((e=>e.name===this._activeFileName));if(e>=0)return void(this._activeFileIndex=e)}for(let e=this._activeFileIndex;e>=0;e--){const t=this._visibleFiles[e];if(t&&!t.hidden)return void(this._activeFileName=t.name)}this._activeFileIndex=0,this._activeFileName=""}};
/* @license CodeMirror, copyright (c) by Marijn Haverbeke and others
Distributed under an MIT license: https://codemirror.net/LICENSE */
var gi;function mi(e,t,r,o,i,n){this.name=e,this.tokenType=t,this.depth=r,this.parent=o,this.startLine=i,this.startPos=n}function fi(){this.stream=null,this.line=this.startPos=0,this.string=this.startLine="",this.copyInstance=null}hi.styles=c`
    :host {
      display: flex;
      font-size: var(--playground-tab-bar-font-size, 14px);
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
    }

    playground-internal-tab[active] {
      color: var(
        --playground-tab-bar-active-color,
        var(--playground-highlight-color, #6200ee)
      );
      background: var(--playground-tab-bar-active-background, transparent);
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
  `,o([ge({type:Boolean,attribute:"editable-file-system",reflect:!0})],hi.prototype,"editableFileSystem",void 0),o([me()],hi.prototype,"_activeFileName",void 0),o([me()],hi.prototype,"_activeFileIndex",void 0),o([ye("playground-file-system-controls")],hi.prototype,"_fileSystemControls",void 0),o([me()],hi.prototype,"_editor",void 0),o([ge()],hi.prototype,"editor",null),hi=o([ue("playground-tab-bar")],hi),gi=function(){var e=navigator.userAgent,t=navigator.platform,r=/gecko\/\d/i.test(e),o=/MSIE \d/.test(e),i=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),n=/Edge\/(\d+)/.exec(e),a=o||i||n,l=a&&(o?document.documentMode||6:+(n||i)[1]),s=!n&&/WebKit\//.test(e),d=s&&/Qt\/\d+\.\d+/.test(e),c=!n&&/Chrome\/(\d+)/.exec(e),u=c&&+c[1],p=/Opera\//.test(e),h=/Apple Computer/.test(navigator.vendor),g=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),m=/PhantomJS/.test(e),f=h&&(/Mobile\/\w+/.test(e)||navigator.maxTouchPoints>2),b=/Android/.test(e),y=f||b||/webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),v=f||/Mac/.test(t),x=/\bCrOS\b/.test(e),w=/win/i.test(t),k=p&&e.match(/Version\/(\d*\.\d*)/);k&&(k=Number(k[1])),k&&k>=15&&(p=!1,s=!0);var _=v&&(d||p&&(null==k||k<12.11)),C=r||a&&l>=9;function S(e){return RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}var E,T=function(e,t){var r=e.className,o=S(t).exec(r);if(o){var i=r.slice(o.index+o[0].length);e.className=r.slice(0,o.index)+(i?o[1]+i:"")}};function A(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild);return e}function O(e,t){return A(e).appendChild(t)}function L(e,t,r,o){var i=document.createElement(e);if(r&&(i.className=r),o&&(i.style.cssText=o),"string"==typeof t)i.appendChild(document.createTextNode(t));else if(t)for(var n=0;n<t.length;++n)i.appendChild(t[n]);return i}function M(e,t,r,o){var i=L(e,t,r,o);return i.setAttribute("role","presentation"),i}function I(e,t){if(3==t.nodeType&&(t=t.parentNode),e.contains)return e.contains(t);do{if(11==t.nodeType&&(t=t.host),t==e)return!0}while(t=t.parentNode)}function R(e){var t,r=e.ownerDocument||e;try{t=e.activeElement}catch(e){t=r.body||null}for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}function F(e,t){var r=e.className;S(t).test(r)||(e.className+=(r?" ":"")+t)}function N(e,t){for(var r=e.split(" "),o=0;o<r.length;o++)r[o]&&!S(r[o]).test(t)&&(t+=" "+r[o]);return t}E=document.createRange?function(e,t,r,o){var i=document.createRange();return i.setEnd(o||e,r),i.setStart(e,t),i}:function(e,t,r){var o=document.body.createTextRange();try{o.moveToElementText(e.parentNode)}catch(e){return o}return o.collapse(!0),o.moveEnd("character",r),o.moveStart("character",t),o};var z=function(e){e.select()};function D(e){return e.display.wrapper.ownerDocument}function P(e){return H(e.display.wrapper)}function H(e){return e.getRootNode?e.getRootNode():e.ownerDocument}function U(e){return D(e).defaultView}function B(e){var t=Array.prototype.slice.call(arguments,1);return function(){return e.apply(null,t)}}function W(e,t,r){for(var o in t||(t={}),e)!e.hasOwnProperty(o)||!1===r&&t.hasOwnProperty(o)||(t[o]=e[o]);return t}function K(e,t,r,o,i){null==t&&-1==(t=e.search(/[^\s\u00a0]/))&&(t=e.length);for(var n=o||0,a=i||0;;){var l=e.indexOf("\t",n);if(l<0||l>=t)return a+(t-n);a+=l-n,a+=r-a%r,n=l+1}}f?z=function(e){e.selectionStart=0,e.selectionEnd=e.value.length}:a&&(z=function(e){try{e.select()}catch(e){}});var j=function(){this.id=null,this.f=null,this.time=0,this.handler=B(this.onTimeout,this)};function V(e,t){for(var r=0;r<e.length;++r)if(e[r]==t)return r;return-1}j.prototype.onTimeout=function(e){e.id=0,e.time<=+new Date?e.f():setTimeout(e.handler,e.time-+new Date)},j.prototype.set=function(e,t){this.f=t;var r=+new Date+e;(!this.id||r<this.time)&&(clearTimeout(this.id),this.id=setTimeout(this.handler,e),this.time=r)};var q=50,Z={toString:function(){return"CodeMirror.Pass"}},G={scroll:!1},J={origin:"*mouse"},Q={origin:"+move"};function Y(e,t,r){for(var o=0,i=0;;){var n=e.indexOf("\t",o);-1==n&&(n=e.length);var a=n-o;if(n==e.length||i+a>=t)return o+Math.min(a,t-i);if(i+=n-o,o=n+1,(i+=r-i%r)>=t)return o}}var X=[""];function $(e){for(;X.length<=e;)X.push(ee(X)+" ");return X[e]}function ee(e){return e[e.length-1]}function te(e,t){for(var r=[],o=0;o<e.length;o++)r[o]=t(e[o],o);return r}function re(){}function oe(e,t){var r;return Object.create?r=Object.create(e):(re.prototype=e,r=new re),t&&W(t,r),r}var ie=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;function ne(e){return/\w/.test(e)||e>""&&(e.toUpperCase()!=e.toLowerCase()||ie.test(e))}function ae(e,t){return t?!!(t.source.indexOf("\\w")>-1&&ne(e))||t.test(e):ne(e)}function le(e){for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!1;return!0}var se=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;function de(e){return e.charCodeAt(0)>=768&&se.test(e)}function ce(e,t,r){for(;(r<0?t>0:t<e.length)&&de(e.charAt(t));)t+=r;return t}function ue(e,t,r){for(var o=t>r?-1:1;;){if(t==r)return t;var i=(t+r)/2,n=o<0?Math.ceil(i):Math.floor(i);if(n==t)return e(n)?t:r;e(n)?r=n:t=n+o}}var pe=null;function he(e,t,r){var o;pe=null;for(var i=0;i<e.length;++i){var n=e[i];if(n.from<t&&n.to>t)return i;n.to==t&&(n.from!=n.to&&"before"==r?o=i:pe=i),n.from==t&&(n.from!=n.to&&"before"!=r?o=i:pe=i)}return null!=o?o:pe}var ge=function(){var e=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,t=/[stwN]/,r=/[LRr]/,o=/[Lb1n]/,i=/[1n]/;function n(e,t,r){this.level=e,this.from=t,this.to=r}return function(a,l){var s="ltr"==l?"L":"R";if(0==a.length||"ltr"==l&&!e.test(a))return!1;for(var d,c=a.length,u=[],p=0;p<c;++p)u.push((d=a.charCodeAt(p))<=247?"bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(d):1424<=d&&d<=1524?"R":1536<=d&&d<=1785?"nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(d-1536):1774<=d&&d<=2220?"r":8192<=d&&d<=8203?"w":8204==d?"b":"L");for(var h=0,g=s;h<c;++h){var m=u[h];"m"==m?u[h]=g:g=m}for(var f=0,b=s;f<c;++f){var y=u[f];"1"==y&&"r"==b?u[f]="n":r.test(y)&&(b=y,"r"==y&&(u[f]="R"))}for(var v=1,x=u[0];v<c-1;++v){var w=u[v];"+"==w&&"1"==x&&"1"==u[v+1]?u[v]="1":","!=w||x!=u[v+1]||"1"!=x&&"n"!=x||(u[v]=x),x=w}for(var k=0;k<c;++k){var _=u[k];if(","==_)u[k]="N";else if("%"==_){var C=void 0;for(C=k+1;C<c&&"%"==u[C];++C);for(var S=k&&"!"==u[k-1]||C<c&&"1"==u[C]?"1":"N",E=k;E<C;++E)u[E]=S;k=C-1}}for(var T=0,A=s;T<c;++T){var O=u[T];"L"==A&&"1"==O?u[T]="L":r.test(O)&&(A=O)}for(var L=0;L<c;++L)if(t.test(u[L])){var M=void 0;for(M=L+1;M<c&&t.test(u[M]);++M);for(var I="L"==(L?u[L-1]:s),R=I==("L"==(M<c?u[M]:s))?I?"L":"R":s,F=L;F<M;++F)u[F]=R;L=M-1}for(var N,z=[],D=0;D<c;)if(o.test(u[D])){var P=D;for(++D;D<c&&o.test(u[D]);++D);z.push(new n(0,P,D))}else{var H=D,U=z.length,B="rtl"==l?1:0;for(++D;D<c&&"L"!=u[D];++D);for(var W=H;W<D;)if(i.test(u[W])){H<W&&(z.splice(U,0,new n(1,H,W)),U+=B);var K=W;for(++W;W<D&&i.test(u[W]);++W);z.splice(U,0,new n(2,K,W)),U+=B,H=W}else++W;H<D&&z.splice(U,0,new n(1,H,D))}return"ltr"==l&&(1==z[0].level&&(N=a.match(/^\s+/))&&(z[0].from=N[0].length,z.unshift(new n(0,0,N[0].length))),1==ee(z).level&&(N=a.match(/\s+$/))&&(ee(z).to-=N[0].length,z.push(new n(0,c-N[0].length,c)))),"rtl"==l?z.reverse():z}}();function me(e,t){var r=e.order;return null==r&&(r=e.order=ge(e.text,t)),r}var fe=[],be=function(e,t,r){if(e.addEventListener)e.addEventListener(t,r,!1);else if(e.attachEvent)e.attachEvent("on"+t,r);else{var o=e._handlers||(e._handlers={});o[t]=(o[t]||fe).concat(r)}};function ye(e,t){return e._handlers&&e._handlers[t]||fe}function ve(e,t,r){if(e.removeEventListener)e.removeEventListener(t,r,!1);else if(e.detachEvent)e.detachEvent("on"+t,r);else{var o=e._handlers,i=o&&o[t];if(i){var n=V(i,r);n>-1&&(o[t]=i.slice(0,n).concat(i.slice(n+1)))}}}function xe(e,t){var r=ye(e,t);if(r.length)for(var o=Array.prototype.slice.call(arguments,2),i=0;i<r.length;++i)r[i].apply(null,o)}function we(e,t,r){return"string"==typeof t&&(t={type:t,preventDefault:function(){this.defaultPrevented=!0}}),xe(e,r||t.type,e,t),Te(t)||t.codemirrorIgnore}function ke(e){var t=e._handlers&&e._handlers.cursorActivity;if(t)for(var r=e.curOp.cursorActivityHandlers||(e.curOp.cursorActivityHandlers=[]),o=0;o<t.length;++o)-1==V(r,t[o])&&r.push(t[o])}function _e(e,t){return ye(e,t).length>0}function Ce(e){e.prototype.on=function(e,t){be(this,e,t)},e.prototype.off=function(e,t){ve(this,e,t)}}function Se(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function Ee(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}function Te(e){return null!=e.defaultPrevented?e.defaultPrevented:0==e.returnValue}function Ae(e){Se(e),Ee(e)}function Oe(e){return e.target||e.srcElement}function Le(e){var t=e.which;return null==t&&(1&e.button?t=1:2&e.button?t=3:4&e.button&&(t=2)),v&&e.ctrlKey&&1==t&&(t=3),t}var Me,Ie,Re=function(){if(a&&l<9)return!1;var e=L("div");return"draggable"in e||"dragDrop"in e}();function Fe(e){if(null==Me){var t=L("span","​");O(e,L("span",[t,document.createTextNode("x")])),0!=e.firstChild.offsetHeight&&(Me=t.offsetWidth<=1&&t.offsetHeight>2&&!(a&&l<8))}var r=Me?L("span","​"):L("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px");return r.setAttribute("cm-text",""),r}function Ne(e){if(null!=Ie)return Ie;var t=O(e,document.createTextNode("AخA")),r=E(t,0,1).getBoundingClientRect(),o=E(t,1,2).getBoundingClientRect();return A(e),!(!r||r.left==r.right)&&(Ie=o.right-r.right<3)}var ze,De=function(e){return e.split(/\r\n?|\n/)},Pe=window.getSelection?function(e){try{return e.selectionStart!=e.selectionEnd}catch(e){return!1}}:function(e){var t;try{t=e.ownerDocument.selection.createRange()}catch(e){}return!(!t||t.parentElement()!=e)&&0!=t.compareEndPoints("StartToEnd",t)},He="oncopy"in(ze=L("div"))||(ze.setAttribute("oncopy","return;"),"function"==typeof ze.oncopy),Ue=null,Be={},We={};function Ke(e,t){arguments.length>2&&(t.dependencies=Array.prototype.slice.call(arguments,2)),Be[e]=t}function je(e){if("string"==typeof e&&We.hasOwnProperty(e))e=We[e];else if(e&&"string"==typeof e.name&&We.hasOwnProperty(e.name)){var t=We[e.name];"string"==typeof t&&(t={name:t}),(e=oe(t,e)).name=t.name}else{if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+xml$/.test(e))return je("application/xml");if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+json$/.test(e))return je("application/json")}return"string"==typeof e?{name:e}:e||{name:"null"}}function Ve(e,t){t=je(t);var r=Be[t.name];if(!r)return Ve(e,"text/plain");var o=r(e,t);if(qe.hasOwnProperty(t.name)){var i=qe[t.name];for(var n in i)i.hasOwnProperty(n)&&(o.hasOwnProperty(n)&&(o["_"+n]=o[n]),o[n]=i[n])}if(o.name=t.name,t.helperType&&(o.helperType=t.helperType),t.modeProps)for(var a in t.modeProps)o[a]=t.modeProps[a];return o}var qe={};function Ze(e,t){W(t,qe.hasOwnProperty(e)?qe[e]:qe[e]={})}function Ge(e,t){if(!0===t)return t;if(e.copyState)return e.copyState(t);var r={};for(var o in t){var i=t[o];i instanceof Array&&(i=i.concat([])),r[o]=i}return r}function Je(e,t){for(var r;e.innerMode&&(r=e.innerMode(t))&&r.mode!=e;)t=r.state,e=r.mode;return r||{mode:e,state:t}}function Qe(e,t,r){return!e.startState||e.startState(t,r)}var Ye=function(e,t,r){this.pos=this.start=0,this.string=e,this.tabSize=t||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0,this.lineOracle=r};function Xe(e,t){if((t-=e.first)<0||t>=e.size)throw Error("There is no line "+(t+e.first)+" in the document.");for(var r=e;!r.lines;)for(var o=0;;++o){var i=r.children[o],n=i.chunkSize();if(t<n){r=i;break}t-=n}return r.lines[t]}function $e(e,t,r){var o=[],i=t.line;return e.iter(t.line,r.line+1,(function(e){var n=e.text;i==r.line&&(n=n.slice(0,r.ch)),i==t.line&&(n=n.slice(t.ch)),o.push(n),++i})),o}function et(e,t,r){var o=[];return e.iter(t,r,(function(e){o.push(e.text)})),o}function tt(e,t){var r=t-e.height;if(r)for(var o=e;o;o=o.parent)o.height+=r}function rt(e){if(null==e.parent)return null;for(var t=e.parent,r=V(t.lines,e),o=t.parent;o;t=o,o=o.parent)for(var i=0;o.children[i]!=t;++i)r+=o.children[i].chunkSize();return r+t.first}function ot(e,t){var r=e.first;e:do{for(var o=0;o<e.children.length;++o){var i=e.children[o],n=i.height;if(t<n){e=i;continue e}t-=n,r+=i.chunkSize()}return r}while(!e.lines);for(var a=0;a<e.lines.length;++a){var l=e.lines[a].height;if(t<l)break;t-=l}return r+a}function it(e,t){return t>=e.first&&t<e.first+e.size}function nt(e,t){return e.lineNumberFormatter(t+e.firstLineNumber)+""}function at(e,t,r){if(void 0===r&&(r=null),!(this instanceof at))return new at(e,t,r);this.line=e,this.ch=t,this.sticky=r}function lt(e,t){return e.line-t.line||e.ch-t.ch}function st(e,t){return e.sticky==t.sticky&&0==lt(e,t)}function dt(e){return at(e.line,e.ch)}function ct(e,t){return lt(e,t)<0?t:e}function ut(e,t){return lt(e,t)<0?e:t}function pt(e,t){return Math.max(e.first,Math.min(t,e.first+e.size-1))}function ht(e,t){if(t.line<e.first)return at(e.first,0);var r=e.first+e.size-1;return t.line>r?at(r,Xe(e,r).text.length):function(e,t){var r=e.ch;return null==r||r>t?at(e.line,t):r<0?at(e.line,0):e}(t,Xe(e,t.line).text.length)}function gt(e,t){for(var r=[],o=0;o<t.length;o++)r[o]=ht(e,t[o]);return r}Ye.prototype.eol=function(){return this.pos>=this.string.length},Ye.prototype.sol=function(){return this.pos==this.lineStart},Ye.prototype.peek=function(){return this.string.charAt(this.pos)||void 0},Ye.prototype.next=function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},Ye.prototype.eat=function(e){var t=this.string.charAt(this.pos);if("string"==typeof e?t==e:t&&(e.test?e.test(t):e(t)))return++this.pos,t},Ye.prototype.eatWhile=function(e){for(var t=this.pos;this.eat(e););return this.pos>t},Ye.prototype.eatSpace=function(){for(var e=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e},Ye.prototype.skipToEnd=function(){this.pos=this.string.length},Ye.prototype.skipTo=function(e){var t=this.string.indexOf(e,this.pos);if(t>-1)return this.pos=t,!0},Ye.prototype.backUp=function(e){this.pos-=e},Ye.prototype.column=function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=K(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?K(this.string,this.lineStart,this.tabSize):0)},Ye.prototype.indentation=function(){return K(this.string,null,this.tabSize)-(this.lineStart?K(this.string,this.lineStart,this.tabSize):0)},Ye.prototype.match=function(e,t,r){if("string"!=typeof e){var o=this.string.slice(this.pos).match(e);return o&&o.index>0?null:(o&&!1!==t&&(this.pos+=o[0].length),o)}var i=function(e){return r?e.toLowerCase():e};if(i(this.string.substr(this.pos,e.length))==i(e))return!1!==t&&(this.pos+=e.length),!0},Ye.prototype.current=function(){return this.string.slice(this.start,this.pos)},Ye.prototype.hideFirstChars=function(e,t){this.lineStart+=e;try{return t()}finally{this.lineStart-=e}},Ye.prototype.lookAhead=function(e){var t=this.lineOracle;return t&&t.lookAhead(e)},Ye.prototype.baseToken=function(){var e=this.lineOracle;return e&&e.baseToken(this.pos)};var mt=function(e,t){this.state=e,this.lookAhead=t},ft=function(e,t,r,o){this.state=t,this.doc=e,this.line=r,this.maxLookAhead=o||0,this.baseTokens=null,this.baseTokenPos=1};function bt(e,t,r,o){var i=[e.state.modeGen],n={};Et(e,t.text,e.doc.mode,r,(function(e,t){return i.push(e,t)}),n,o);for(var a=r.state,l=function(o){r.baseTokens=i;var l=e.state.overlays[o],s=1,d=0;r.state=!0,Et(e,t.text,l.mode,r,(function(e,t){for(var r=s;d<e;){var o=i[s];o>e&&i.splice(s,1,e,i[s+1],o),s+=2,d=Math.min(e,o)}if(t)if(l.opaque)i.splice(r,s-r,e,"overlay "+t),s=r+2;else for(;r<s;r+=2){var n=i[r+1];i[r+1]=(n?n+" ":"")+"overlay "+t}}),n),r.state=a,r.baseTokens=null,r.baseTokenPos=1},s=0;s<e.state.overlays.length;++s)l(s);return{styles:i,classes:n.bgClass||n.textClass?n:null}}function yt(e,t,r){if(!t.styles||t.styles[0]!=e.state.modeGen){var o=vt(e,rt(t)),i=t.text.length>e.options.maxHighlightLength&&Ge(e.doc.mode,o.state),n=bt(e,t,o);i&&(o.state=i),t.stateAfter=o.save(!i),t.styles=n.styles,n.classes?t.styleClasses=n.classes:t.styleClasses&&(t.styleClasses=null),r===e.doc.highlightFrontier&&(e.doc.modeFrontier=Math.max(e.doc.modeFrontier,++e.doc.highlightFrontier))}return t.styles}function vt(e,t,r){var o=e.doc,i=e.display;if(!o.mode.startState)return new ft(o,!0,t);var n=function(e,t,r){for(var o,i,n=e.doc,a=r?-1:t-(e.doc.mode.innerMode?1e3:100),l=t;l>a;--l){if(l<=n.first)return n.first;var s=Xe(n,l-1),d=s.stateAfter;if(d&&(!r||l+(d instanceof mt?d.lookAhead:0)<=n.modeFrontier))return l;var c=K(s.text,null,e.options.tabSize);(null==i||o>c)&&(i=l-1,o=c)}return i}(e,t,r),a=n>o.first&&Xe(o,n-1).stateAfter,l=a?ft.fromSaved(o,a,n):new ft(o,Qe(o.mode),n);return o.iter(n,t,(function(r){xt(e,r.text,l);var o=l.line;r.stateAfter=o==t-1||o%5==0||o>=i.viewFrom&&o<i.viewTo?l.save():null,l.nextLine()})),r&&(o.modeFrontier=l.line),l}function xt(e,t,r,o){var i=e.doc.mode,n=new Ye(t,e.options.tabSize,r);for(n.start=n.pos=o||0,""==t&&wt(i,r.state);!n.eol();)kt(i,n,r.state),n.start=n.pos}function wt(e,t){if(e.blankLine)return e.blankLine(t);if(e.innerMode){var r=Je(e,t);return r.mode.blankLine?r.mode.blankLine(r.state):void 0}}function kt(e,t,r,o){for(var i=0;i<10;i++){o&&(o[0]=Je(e,r).mode);var n=e.token(t,r);if(t.pos>t.start)return n}throw Error("Mode "+e.name+" failed to advance stream.")}ft.prototype.lookAhead=function(e){var t=this.doc.getLine(this.line+e);return null!=t&&e>this.maxLookAhead&&(this.maxLookAhead=e),t},ft.prototype.baseToken=function(e){if(!this.baseTokens)return null;for(;this.baseTokens[this.baseTokenPos]<=e;)this.baseTokenPos+=2;var t=this.baseTokens[this.baseTokenPos+1];return{type:t&&t.replace(/( |^)overlay .*/,""),size:this.baseTokens[this.baseTokenPos]-e}},ft.prototype.nextLine=function(){this.line++,this.maxLookAhead>0&&this.maxLookAhead--},ft.fromSaved=function(e,t,r){return t instanceof mt?new ft(e,Ge(e.mode,t.state),r,t.lookAhead):new ft(e,Ge(e.mode,t),r)},ft.prototype.save=function(e){var t=!1!==e?Ge(this.doc.mode,this.state):this.state;return this.maxLookAhead>0?new mt(t,this.maxLookAhead):t};var _t=function(e,t,r){this.start=e.start,this.end=e.pos,this.string=e.current(),this.type=t||null,this.state=r};function Ct(e,t,r,o){var i,n,a=e.doc,l=a.mode,s=Xe(a,(t=ht(a,t)).line),d=vt(e,t.line,r),c=new Ye(s.text,e.options.tabSize,d);for(o&&(n=[]);(o||c.pos<t.ch)&&!c.eol();)c.start=c.pos,i=kt(l,c,d.state),o&&n.push(new _t(c,i,Ge(a.mode,d.state)));return o?n:new _t(c,i,d.state)}function St(e,t){if(e)for(;;){var r=e.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!r)break;e=e.slice(0,r.index)+e.slice(r.index+r[0].length);var o=r[1]?"bgClass":"textClass";null==t[o]?t[o]=r[2]:RegExp("(?:^|\\s)"+r[2]+"(?:$|\\s)").test(t[o])||(t[o]+=" "+r[2])}return e}function Et(e,t,r,o,i,n,a){var l=r.flattenSpans;null==l&&(l=e.options.flattenSpans);var s,d=0,c=null,u=new Ye(t,e.options.tabSize,o),p=e.options.addModeClass&&[null];for(""==t&&St(wt(r,o.state),n);!u.eol();){if(u.pos>e.options.maxHighlightLength?(l=!1,a&&xt(e,t,o,u.pos),u.pos=t.length,s=null):s=St(kt(r,u,o.state,p),n),p){var h=p[0].name;h&&(s="m-"+(s?h+" "+s:h))}if(!l||c!=s){for(;d<u.start;)i(d=Math.min(u.start,d+5e3),c);c=s}u.start=u.pos}for(;d<u.pos;){var g=Math.min(u.pos,d+5e3);i(g,c),d=g}}var Tt=!1,At=!1;function Ot(e,t,r){this.marker=e,this.from=t,this.to=r}function Lt(e,t){if(e)for(var r=0;r<e.length;++r){var o=e[r];if(o.marker==t)return o}}function Mt(e,t){for(var r,o=0;o<e.length;++o)e[o]!=t&&(r||(r=[])).push(e[o]);return r}function It(e,t){if(t.full)return null;var r=it(e,t.from.line)&&Xe(e,t.from.line).markedSpans,o=it(e,t.to.line)&&Xe(e,t.to.line).markedSpans;if(!r&&!o)return null;var i=t.from.ch,n=t.to.ch,a=0==lt(t.from,t.to),l=function(e,t,r){var o;if(e)for(var i=0;i<e.length;++i){var n=e[i],a=n.marker;if(null==n.from||(a.inclusiveLeft?n.from<=t:n.from<t)||n.from==t&&"bookmark"==a.type&&(!r||!n.marker.insertLeft)){var l=null==n.to||(a.inclusiveRight?n.to>=t:n.to>t);(o||(o=[])).push(new Ot(a,n.from,l?null:n.to))}}return o}(r,i,a),s=function(e,t,r){var o;if(e)for(var i=0;i<e.length;++i){var n=e[i],a=n.marker;if(null==n.to||(a.inclusiveRight?n.to>=t:n.to>t)||n.from==t&&"bookmark"==a.type&&(!r||n.marker.insertLeft)){var l=null==n.from||(a.inclusiveLeft?n.from<=t:n.from<t);(o||(o=[])).push(new Ot(a,l?null:n.from-t,null==n.to?null:n.to-t))}}return o}(o,n,a),d=1==t.text.length,c=ee(t.text).length+(d?i:0);if(l)for(var u=0;u<l.length;++u){var p=l[u];if(null==p.to){var h=Lt(s,p.marker);h?d&&(p.to=null==h.to?null:h.to+c):p.to=i}}if(s)for(var g=0;g<s.length;++g){var m=s[g];null!=m.to&&(m.to+=c),null==m.from?Lt(l,m.marker)||(m.from=c,d&&(l||(l=[])).push(m)):(m.from+=c,d&&(l||(l=[])).push(m))}l&&(l=Rt(l)),s&&s!=l&&(s=Rt(s));var f=[l];if(!d){var b,y=t.text.length-2;if(y>0&&l)for(var v=0;v<l.length;++v)null==l[v].to&&(b||(b=[])).push(new Ot(l[v].marker,null,null));for(var x=0;x<y;++x)f.push(b);f.push(s)}return f}function Rt(e){for(var t=0;t<e.length;++t){var r=e[t];null!=r.from&&r.from==r.to&&!1!==r.marker.clearWhenEmpty&&e.splice(t--,1)}return e.length?e:null}function Ft(e){var t=e.markedSpans;if(t){for(var r=0;r<t.length;++r)t[r].marker.detachLine(e);e.markedSpans=null}}function Nt(e,t){if(t){for(var r=0;r<t.length;++r)t[r].marker.attachLine(e);e.markedSpans=t}}function zt(e){return e.inclusiveLeft?-1:0}function Dt(e){return e.inclusiveRight?1:0}function Pt(e,t){var r=e.lines.length-t.lines.length;if(0!=r)return r;var o=e.find(),i=t.find(),n=lt(o.from,i.from)||zt(e)-zt(t);return n?-n:lt(o.to,i.to)||Dt(e)-Dt(t)||t.id-e.id}function Ht(e,t){var r,o=At&&e.markedSpans;if(o)for(var i=void 0,n=0;n<o.length;++n)(i=o[n]).marker.collapsed&&null==(t?i.from:i.to)&&(!r||Pt(r,i.marker)<0)&&(r=i.marker);return r}function Ut(e){return Ht(e,!0)}function Bt(e){return Ht(e,!1)}function Wt(e,t){var r,o=At&&e.markedSpans;if(o)for(var i=0;i<o.length;++i){var n=o[i];n.marker.collapsed&&(null==n.from||n.from<t)&&(null==n.to||n.to>t)&&(!r||Pt(r,n.marker)<0)&&(r=n.marker)}return r}function Kt(e,t,r,o,i){var n=Xe(e,t),a=At&&n.markedSpans;if(a)for(var l=0;l<a.length;++l){var s=a[l];if(s.marker.collapsed){var d=s.marker.find(0),c=lt(d.from,r)||zt(s.marker)-zt(i),u=lt(d.to,o)||Dt(s.marker)-Dt(i);if(!(c>=0&&u<=0||c<=0&&u>=0)&&(c<=0&&(s.marker.inclusiveRight&&i.inclusiveLeft?lt(d.to,r)>=0:lt(d.to,r)>0)||c>=0&&(s.marker.inclusiveRight&&i.inclusiveLeft?lt(d.from,o)<=0:lt(d.from,o)<0)))return!0}}}function jt(e){for(var t;t=Ut(e);)e=t.find(-1,!0).line;return e}function Vt(e,t){var r=Xe(e,t),o=jt(r);return r==o?t:rt(o)}function qt(e,t){if(t>e.lastLine())return t;var r,o=Xe(e,t);if(!Zt(e,o))return t;for(;r=Bt(o);)o=r.find(1,!0).line;return rt(o)+1}function Zt(e,t){var r=At&&t.markedSpans;if(r)for(var o=void 0,i=0;i<r.length;++i)if((o=r[i]).marker.collapsed){if(null==o.from)return!0;if(!o.marker.widgetNode&&0==o.from&&o.marker.inclusiveLeft&&Gt(e,t,o))return!0}}function Gt(e,t,r){if(null==r.to){var o=r.marker.find(1,!0);return Gt(e,o.line,Lt(o.line.markedSpans,r.marker))}if(r.marker.inclusiveRight&&r.to==t.text.length)return!0;for(var i=void 0,n=0;n<t.markedSpans.length;++n)if((i=t.markedSpans[n]).marker.collapsed&&!i.marker.widgetNode&&i.from==r.to&&(null==i.to||i.to!=r.from)&&(i.marker.inclusiveLeft||r.marker.inclusiveRight)&&Gt(e,t,i))return!0}function Jt(e){for(var t=0,r=(e=jt(e)).parent,o=0;o<r.lines.length;++o){var i=r.lines[o];if(i==e)break;t+=i.height}for(var n=r.parent;n;n=(r=n).parent)for(var a=0;a<n.children.length;++a){var l=n.children[a];if(l==r)break;t+=l.height}return t}function Qt(e){if(0==e.height)return 0;for(var t,r=e.text.length,o=e;t=Ut(o);){var i=t.find(0,!0);o=i.from.line,r+=i.from.ch-i.to.ch}for(o=e;t=Bt(o);){var n=t.find(0,!0);r-=o.text.length-n.from.ch,r+=(o=n.to.line).text.length-n.to.ch}return r}function Yt(e){var t=e.display,r=e.doc;t.maxLine=Xe(r,r.first),t.maxLineLength=Qt(t.maxLine),t.maxLineChanged=!0,r.iter((function(e){var r=Qt(e);r>t.maxLineLength&&(t.maxLineLength=r,t.maxLine=e)}))}var Xt=function(e,t,r){this.text=e,Nt(this,t),this.height=r?r(this):1};function $t(e){e.parent=null,Ft(e)}Xt.prototype.lineNo=function(){return rt(this)},Ce(Xt);var er={},tr={};function rr(e,t){if(!e||/^\s*$/.test(e))return null;var r=t.addModeClass?tr:er;return r[e]||(r[e]=e.replace(/\S+/g,"cm-$&"))}function or(e,t){var r=M("span",null,null,s?"padding-right: .1px":null),o={pre:M("pre",[r],"CodeMirror-line"),content:r,col:0,pos:0,cm:e,trailingSpace:!1,splitSpaces:e.getOption("lineWrapping")};t.measure={};for(var i=0;i<=(t.rest?t.rest.length:0);i++){var n=i?t.rest[i-1]:t.line,a=void 0;o.pos=0,o.addToken=nr,Ne(e.display.measure)&&(a=me(n,e.doc.direction))&&(o.addToken=ar(o.addToken,a)),o.map=[],sr(n,o,yt(e,n,t!=e.display.externalMeasured&&rt(n))),n.styleClasses&&(n.styleClasses.bgClass&&(o.bgClass=N(n.styleClasses.bgClass,o.bgClass||"")),n.styleClasses.textClass&&(o.textClass=N(n.styleClasses.textClass,o.textClass||""))),0==o.map.length&&o.map.push(0,0,o.content.appendChild(Fe(e.display.measure))),0==i?(t.measure.map=o.map,t.measure.cache={}):((t.measure.maps||(t.measure.maps=[])).push(o.map),(t.measure.caches||(t.measure.caches=[])).push({}))}if(s){var l=o.content.lastChild;(/\bcm-tab\b/.test(l.className)||l.querySelector&&l.querySelector(".cm-tab"))&&(o.content.className="cm-tab-wrap-hack")}return xe(e,"renderLine",e,t.line,o.pre),o.pre.className&&(o.textClass=N(o.pre.className,o.textClass||"")),o}function ir(e){var t=L("span","•","cm-invalidchar");return t.title="\\u"+e.charCodeAt(0).toString(16),t.setAttribute("aria-label",t.title),t}function nr(e,t,r,o,i,n,s){if(t){var d,c=e.splitSpaces?function(e,t){if(e.length>1&&!/  /.test(e))return e;for(var r=t,o="",i=0;i<e.length;i++){var n=e.charAt(i);" "!=n||!r||i!=e.length-1&&32!=e.charCodeAt(i+1)||(n=" "),o+=n,r=" "==n}return o}(t,e.trailingSpace):t,u=e.cm.state.specialChars,p=!1;if(u.test(t)){d=document.createDocumentFragment();for(var h=0;;){u.lastIndex=h;var g=u.exec(t),m=g?g.index-h:t.length-h;if(m){var f=document.createTextNode(c.slice(h,h+m));a&&l<9?d.appendChild(L("span",[f])):d.appendChild(f),e.map.push(e.pos,e.pos+m,f),e.col+=m,e.pos+=m}if(!g)break;h+=m+1;var b=void 0;if("\t"==g[0]){var y=e.cm.options.tabSize,v=y-e.col%y;(b=d.appendChild(L("span",$(v),"cm-tab"))).setAttribute("role","presentation"),b.setAttribute("cm-text","\t"),e.col+=v}else"\r"==g[0]||"\n"==g[0]?((b=d.appendChild(L("span","\r"==g[0]?"␍":"␤","cm-invalidchar"))).setAttribute("cm-text",g[0]),e.col+=1):((b=e.cm.options.specialCharPlaceholder(g[0])).setAttribute("cm-text",g[0]),a&&l<9?d.appendChild(L("span",[b])):d.appendChild(b),e.col+=1);e.map.push(e.pos,e.pos+1,b),e.pos++}}else e.col+=t.length,d=document.createTextNode(c),e.map.push(e.pos,e.pos+t.length,d),a&&l<9&&(p=!0),e.pos+=t.length;if(e.trailingSpace=32==c.charCodeAt(t.length-1),r||o||i||p||n||s){var x=r||"";o&&(x+=o),i&&(x+=i);var w=L("span",[d],x,n);if(s)for(var k in s)s.hasOwnProperty(k)&&"style"!=k&&"class"!=k&&w.setAttribute(k,s[k]);return e.content.appendChild(w)}e.content.appendChild(d)}}function ar(e,t){return function(r,o,i,n,a,l,s){i=i?i+" cm-force-border":"cm-force-border";for(var d=r.pos,c=d+o.length;;){for(var u=void 0,p=0;p<t.length&&!((u=t[p]).to>d&&u.from<=d);p++);if(u.to>=c)return e(r,o,i,n,a,l,s);e(r,o.slice(0,u.to-d),i,n,null,l,s),n=null,o=o.slice(u.to-d),d=u.to}}}function lr(e,t,r,o){var i=!o&&r.widgetNode;i&&e.map.push(e.pos,e.pos+t,i),!o&&e.cm.display.input.needsContentAttribute&&(i||(i=e.content.appendChild(document.createElement("span"))),i.setAttribute("cm-marker",r.id)),i&&(e.cm.display.input.setUneditable(i),e.content.appendChild(i)),e.pos+=t,e.trailingSpace=!1}function sr(e,t,r){var o=e.markedSpans,i=e.text,n=0;if(o)for(var a,l,s,d,c,u,p,h=i.length,g=0,m=1,f="",b=0;;){if(b==g){s=d=c=l="",p=null,u=null,b=1/0;for(var y=[],v=void 0,x=0;x<o.length;++x){var w=o[x],k=w.marker;if("bookmark"==k.type&&w.from==g&&k.widgetNode)y.push(k);else if(w.from<=g&&(null==w.to||w.to>g||k.collapsed&&w.to==g&&w.from==g)){if(null!=w.to&&w.to!=g&&b>w.to&&(b=w.to,d=""),k.className&&(s+=" "+k.className),k.css&&(l=(l?l+";":"")+k.css),k.startStyle&&w.from==g&&(c+=" "+k.startStyle),k.endStyle&&w.to==b&&(v||(v=[])).push(k.endStyle,w.to),k.title&&((p||(p={})).title=k.title),k.attributes)for(var _ in k.attributes)(p||(p={}))[_]=k.attributes[_];k.collapsed&&(!u||Pt(u.marker,k)<0)&&(u=w)}else w.from>g&&b>w.from&&(b=w.from)}if(v)for(var C=0;C<v.length;C+=2)v[C+1]==b&&(d+=" "+v[C]);if(!u||u.from==g)for(var S=0;S<y.length;++S)lr(t,0,y[S]);if(u&&(u.from||0)==g){if(lr(t,(null==u.to?h+1:u.to)-g,u.marker,null==u.from),null==u.to)return;u.to==g&&(u=!1)}}if(g>=h)break;for(var E=Math.min(h,b);;){if(f){var T=g+f.length;if(!u){var A=T>E?f.slice(0,E-g):f;t.addToken(t,A,a?a+s:s,c,g+A.length==b?d:"",l,p)}if(T>=E){f=f.slice(E-g),g=E;break}g=T,c=""}f=i.slice(n,n=r[m++]),a=rr(r[m++],t.cm.options)}}else for(var O=1;O<r.length;O+=2)t.addToken(t,i.slice(n,n=r[O]),rr(r[O+1],t.cm.options))}function dr(e,t,r){this.line=t,this.rest=function(e){for(var t,r;t=Bt(e);)e=t.find(1,!0).line,(r||(r=[])).push(e);return r}(t),this.size=this.rest?rt(ee(this.rest))-r+1:1,this.node=this.text=null,this.hidden=Zt(e,t)}function cr(e,t,r){for(var o,i=[],n=t;n<r;n=o){var a=new dr(e.doc,Xe(e.doc,n),n);o=n+a.size,i.push(a)}return i}var ur=null,pr=null;function hr(e,t){var r=ye(e,t);if(r.length){var o,i=Array.prototype.slice.call(arguments,2);ur?o=ur.delayedCallbacks:pr?o=pr:(o=pr=[],setTimeout(gr,0));for(var n=function(e){o.push((function(){return r[e].apply(null,i)}))},a=0;a<r.length;++a)n(a)}}function gr(){var e=pr;pr=null;for(var t=0;t<e.length;++t)e[t]()}function mr(e,t,r,o){for(var i=0;i<t.changes.length;i++){var n=t.changes[i];"text"==n?yr(e,t):"gutter"==n?xr(e,t,r,o):"class"==n?vr(e,t):"widget"==n&&wr(e,t,o)}t.changes=null}function fr(e){return e.node==e.text&&(e.node=L("div",null,null,"position: relative"),e.text.parentNode&&e.text.parentNode.replaceChild(e.node,e.text),e.node.appendChild(e.text),a&&l<8&&(e.node.style.zIndex=2)),e.node}function br(e,t){var r=e.display.externalMeasured;return r&&r.line==t.line?(e.display.externalMeasured=null,t.measure=r.measure,r.built):or(e,t)}function yr(e,t){var r=t.text.className,o=br(e,t);t.text==t.node&&(t.node=o.pre),t.text.parentNode.replaceChild(o.pre,t.text),t.text=o.pre,o.bgClass!=t.bgClass||o.textClass!=t.textClass?(t.bgClass=o.bgClass,t.textClass=o.textClass,vr(e,t)):r&&(t.text.className=r)}function vr(e,t){!function(e,t){var r=t.bgClass?t.bgClass+" "+(t.line.bgClass||""):t.line.bgClass;if(r&&(r+=" CodeMirror-linebackground"),t.background)r?t.background.className=r:(t.background.parentNode.removeChild(t.background),t.background=null);else if(r){var o=fr(t);t.background=o.insertBefore(L("div",null,r),o.firstChild),e.display.input.setUneditable(t.background)}}(e,t),t.line.wrapClass?fr(t).className=t.line.wrapClass:t.node!=t.text&&(t.node.className="");var r=t.textClass?t.textClass+" "+(t.line.textClass||""):t.line.textClass;t.text.className=r||""}function xr(e,t,r,o){if(t.gutter&&(t.node.removeChild(t.gutter),t.gutter=null),t.gutterBackground&&(t.node.removeChild(t.gutterBackground),t.gutterBackground=null),t.line.gutterClass){var i=fr(t);t.gutterBackground=L("div",null,"CodeMirror-gutter-background "+t.line.gutterClass,"left: "+(e.options.fixedGutter?o.fixedPos:-o.gutterTotalWidth)+"px; width: "+o.gutterTotalWidth+"px"),e.display.input.setUneditable(t.gutterBackground),i.insertBefore(t.gutterBackground,t.text)}var n=t.line.gutterMarkers;if(e.options.lineNumbers||n){var a=fr(t),l=t.gutter=L("div",null,"CodeMirror-gutter-wrapper","left: "+(e.options.fixedGutter?o.fixedPos:-o.gutterTotalWidth)+"px");if(l.setAttribute("aria-hidden","true"),e.display.input.setUneditable(l),a.insertBefore(l,t.text),t.line.gutterClass&&(l.className+=" "+t.line.gutterClass),!e.options.lineNumbers||n&&n["CodeMirror-linenumbers"]||(t.lineNumber=l.appendChild(L("div",nt(e.options,r),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+o.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+e.display.lineNumInnerWidth+"px"))),n)for(var s=0;s<e.display.gutterSpecs.length;++s){var d=e.display.gutterSpecs[s].className,c=n.hasOwnProperty(d)&&n[d];c&&l.appendChild(L("div",[c],"CodeMirror-gutter-elt","left: "+o.gutterLeft[d]+"px; width: "+o.gutterWidth[d]+"px"))}}}function wr(e,t,r){t.alignable&&(t.alignable=null);for(var o=S("CodeMirror-linewidget"),i=t.node.firstChild,n=void 0;i;i=n)n=i.nextSibling,o.test(i.className)&&t.node.removeChild(i);_r(e,t,r)}function kr(e,t,r,o){var i=br(e,t);return t.text=t.node=i.pre,i.bgClass&&(t.bgClass=i.bgClass),i.textClass&&(t.textClass=i.textClass),vr(e,t),xr(e,t,r,o),_r(e,t,o),t.node}function _r(e,t,r){if(Cr(e,t.line,t,r,!0),t.rest)for(var o=0;o<t.rest.length;o++)Cr(e,t.rest[o],t,r,!1)}function Cr(e,t,r,o,i){if(t.widgets)for(var n=fr(r),a=0,l=t.widgets;a<l.length;++a){var s=l[a],d=L("div",[s.node],"CodeMirror-linewidget"+(s.className?" "+s.className:""));s.handleMouseEvents||d.setAttribute("cm-ignore-events","true"),Sr(s,d,r,o),e.display.input.setUneditable(d),i&&s.above?n.insertBefore(d,r.gutter||r.text):n.appendChild(d),hr(s,"redraw")}}function Sr(e,t,r,o){if(e.noHScroll){(r.alignable||(r.alignable=[])).push(t);var i=o.wrapperWidth;t.style.left=o.fixedPos+"px",e.coverGutter||(i-=o.gutterTotalWidth,t.style.paddingLeft=o.gutterTotalWidth+"px"),t.style.width=i+"px"}e.coverGutter&&(t.style.zIndex=5,t.style.position="relative",e.noHScroll||(t.style.marginLeft=-o.gutterTotalWidth+"px"))}function Er(e){if(null!=e.height)return e.height;var t=e.doc.cm;if(!t)return 0;if(!I(document.body,e.node)){var r="position: relative;";e.coverGutter&&(r+="margin-left: -"+t.display.gutters.offsetWidth+"px;"),e.noHScroll&&(r+="width: "+t.display.wrapper.clientWidth+"px;"),O(t.display.measure,L("div",[e.node],null,r))}return e.height=e.node.parentNode.offsetHeight}function Tr(e,t){for(var r=Oe(t);r!=e.wrapper;r=r.parentNode)if(!r||1==r.nodeType&&"true"==r.getAttribute("cm-ignore-events")||r.parentNode==e.sizer&&r!=e.mover)return!0}function Ar(e){return e.lineSpace.offsetTop}function Or(e){return e.mover.offsetHeight-e.lineSpace.offsetHeight}function Lr(e){if(e.cachedPaddingH)return e.cachedPaddingH;var t=O(e.measure,L("pre","x","CodeMirror-line-like")),r=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,o={left:parseInt(r.paddingLeft),right:parseInt(r.paddingRight)};return isNaN(o.left)||isNaN(o.right)||(e.cachedPaddingH=o),o}function Mr(e){return q-e.display.nativeBarWidth}function Ir(e){return e.display.scroller.clientWidth-Mr(e)-e.display.barWidth}function Rr(e){return e.display.scroller.clientHeight-Mr(e)-e.display.barHeight}function Fr(e,t,r){if(e.line==t)return{map:e.measure.map,cache:e.measure.cache};if(e.rest){for(var o=0;o<e.rest.length;o++)if(e.rest[o]==t)return{map:e.measure.maps[o],cache:e.measure.caches[o]};for(var i=0;i<e.rest.length;i++)if(rt(e.rest[i])>r)return{map:e.measure.maps[i],cache:e.measure.caches[i],before:!0}}}function Nr(e,t,r,o){return Pr(e,Dr(e,t),r,o)}function zr(e,t){if(t>=e.display.viewFrom&&t<e.display.viewTo)return e.display.view[fo(e,t)];var r=e.display.externalMeasured;return r&&t>=r.lineN&&t<r.lineN+r.size?r:void 0}function Dr(e,t){var r=rt(t),o=zr(e,r);o&&!o.text?o=null:o&&o.changes&&(mr(e,o,r,uo(e)),e.curOp.forceUpdate=!0),o||(o=function(e,t){var r=rt(t=jt(t)),o=e.display.externalMeasured=new dr(e.doc,t,r);o.lineN=r;var i=o.built=or(e,o);return o.text=i.pre,O(e.display.lineMeasure,i.pre),o}(e,t));var i=Fr(o,t,r);return{line:t,view:o,rect:null,map:i.map,cache:i.cache,before:i.before,hasHeights:!1}}function Pr(e,t,r,o,i){t.before&&(r=-1);var n,s=r+(o||"");return t.cache.hasOwnProperty(s)?n=t.cache[s]:(t.rect||(t.rect=t.view.text.getBoundingClientRect()),t.hasHeights||(function(e,t,r){var o=e.options.lineWrapping,i=o&&Ir(e);if(!t.measure.heights||o&&t.measure.width!=i){var n=t.measure.heights=[];if(o){t.measure.width=i;for(var a=t.text.firstChild.getClientRects(),l=0;l<a.length-1;l++){var s=a[l],d=a[l+1];Math.abs(s.bottom-d.bottom)>2&&n.push((s.bottom+d.top)/2-r.top)}}n.push(r.bottom-r.top)}}(e,t.view,t.rect),t.hasHeights=!0),n=function(e,t,r,o){var i,n=Br(t.map,r,o),s=n.node,d=n.start,c=n.end,u=n.collapse;if(3==s.nodeType){for(var p=0;p<4;p++){for(;d&&de(t.line.text.charAt(n.coverStart+d));)--d;for(;n.coverStart+c<n.coverEnd&&de(t.line.text.charAt(n.coverStart+c));)++c;if((i=a&&l<9&&0==d&&c==n.coverEnd-n.coverStart?s.parentNode.getBoundingClientRect():Wr(E(s,d,c).getClientRects(),o)).left||i.right||0==d)break;c=d,d-=1,u="right"}a&&l<11&&(i=function(e,t){if(!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!function(e){if(null!=Ue)return Ue;var t=O(e,L("span","x")),r=t.getBoundingClientRect(),o=E(t,0,1).getBoundingClientRect();return Ue=Math.abs(r.left-o.left)>1}(e))return t;var r=screen.logicalXDPI/screen.deviceXDPI,o=screen.logicalYDPI/screen.deviceYDPI;return{left:t.left*r,right:t.right*r,top:t.top*o,bottom:t.bottom*o}}(e.display.measure,i))}else{var h;d>0&&(u=o="right"),i=e.options.lineWrapping&&(h=s.getClientRects()).length>1?h["right"==o?h.length-1:0]:s.getBoundingClientRect()}if(a&&l<9&&!d&&(!i||!i.left&&!i.right)){var g=s.parentNode.getClientRects()[0];i=g?{left:g.left,right:g.left+co(e.display),top:g.top,bottom:g.bottom}:Ur}for(var m=i.top-t.rect.top,f=i.bottom-t.rect.top,b=(m+f)/2,y=t.view.measure.heights,v=0;v<y.length-1&&!(b<y[v]);v++);var x=v?y[v-1]:0,w=y[v],k={left:("right"==u?i.right:i.left)-t.rect.left,right:("left"==u?i.left:i.right)-t.rect.left,top:x,bottom:w};return i.left||i.right||(k.bogus=!0),e.options.singleCursorHeightPerLine||(k.rtop=m,k.rbottom=f),k}(e,t,r,o),n.bogus||(t.cache[s]=n)),{left:n.left,right:n.right,top:i?n.rtop:n.top,bottom:i?n.rbottom:n.bottom}}var Hr,Ur={left:0,right:0,top:0,bottom:0};function Br(e,t,r){for(var o,i,n,a,l,s,d=0;d<e.length;d+=3)if(l=e[d],s=e[d+1],t<l?(i=0,n=1,a="left"):t<s?n=1+(i=t-l):(d==e.length-3||t==s&&e[d+3]>t)&&(i=(n=s-l)-1,t>=s&&(a="right")),null!=i){if(o=e[d+2],l==s&&r==(o.insertLeft?"left":"right")&&(a=r),"left"==r&&0==i)for(;d&&e[d-2]==e[d-3]&&e[d-1].insertLeft;)o=e[2+(d-=3)],a="left";if("right"==r&&i==s-l)for(;d<e.length-3&&e[d+3]==e[d+4]&&!e[d+5].insertLeft;)o=e[(d+=3)+2],a="right";break}return{node:o,start:i,end:n,collapse:a,coverStart:l,coverEnd:s}}function Wr(e,t){var r=Ur;if("left"==t)for(var o=0;o<e.length&&(r=e[o]).left==r.right;o++);else for(var i=e.length-1;i>=0&&(r=e[i]).left==r.right;i--);return r}function Kr(e){if(e.measure&&(e.measure.cache={},e.measure.heights=null,e.rest))for(var t=0;t<e.rest.length;t++)e.measure.caches[t]={}}function jr(e){e.display.externalMeasure=null,A(e.display.lineMeasure);for(var t=0;t<e.display.view.length;t++)Kr(e.display.view[t])}function Vr(e){jr(e),e.display.cachedCharWidth=e.display.cachedTextHeight=e.display.cachedPaddingH=null,e.options.lineWrapping||(e.display.maxLineChanged=!0),e.display.lineNumChars=null}function qr(e){return c&&b?-(e.body.getBoundingClientRect().left-parseInt(getComputedStyle(e.body).marginLeft)):e.defaultView.pageXOffset||(e.documentElement||e.body).scrollLeft}function Zr(e){return c&&b?-(e.body.getBoundingClientRect().top-parseInt(getComputedStyle(e.body).marginTop)):e.defaultView.pageYOffset||(e.documentElement||e.body).scrollTop}function Gr(e){var t=jt(e).widgets,r=0;if(t)for(var o=0;o<t.length;++o)t[o].above&&(r+=Er(t[o]));return r}function Jr(e,t,r,o,i){if(!i){var n=Gr(t);r.top+=n,r.bottom+=n}if("line"==o)return r;o||(o="local");var a=Jt(t);if("local"==o?a+=Ar(e.display):a-=e.display.viewOffset,"page"==o||"window"==o){var l=e.display.lineSpace.getBoundingClientRect();a+=l.top+("window"==o?0:Zr(D(e)));var s=l.left+("window"==o?0:qr(D(e)));r.left+=s,r.right+=s}return r.top+=a,r.bottom+=a,r}function Qr(e,t,r){if("div"==r)return t;var o=t.left,i=t.top;if("page"==r)o-=qr(D(e)),i-=Zr(D(e));else if("local"==r||!r){var n=e.display.sizer.getBoundingClientRect();o+=n.left,i+=n.top}var a=e.display.lineSpace.getBoundingClientRect();return{left:o-a.left,top:i-a.top}}function Yr(e,t,r,o,i){return o||(o=Xe(e.doc,t.line)),Jr(e,o,Nr(e,o,t.ch,i),r)}function Xr(e,t,r,o,i,n){function a(t,a){var l=Pr(e,i,t,a?"right":"left",n);return a?l.left=l.right:l.right=l.left,Jr(e,o,l,r)}o=o||Xe(e.doc,t.line),i||(i=Dr(e,o));var l=me(o,e.doc.direction),s=t.ch,d=t.sticky;if(s>=o.text.length?(s=o.text.length,d="before"):s<=0&&(s=0,d="after"),!l)return a("before"==d?s-1:s,"before"==d);function c(e,t,r){return a(r?e-1:e,1==l[t].level!=r)}var u=he(l,s,d),p=pe,h=c(s,u,"before"==d);return null!=p&&(h.other=c(s,p,"before"!=d)),h}function $r(e,t){var r=0;t=ht(e.doc,t),e.options.lineWrapping||(r=co(e.display)*t.ch);var o=Xe(e.doc,t.line),i=Jt(o)+Ar(e.display);return{left:r,right:r,top:i,bottom:i+o.height}}function eo(e,t,r,o,i){var n=at(e,t,r);return n.xRel=i,o&&(n.outside=o),n}function to(e,t,r){var o=e.doc;if((r+=e.display.viewOffset)<0)return eo(o.first,0,null,-1,-1);var i=ot(o,r),n=o.first+o.size-1;if(i>n)return eo(o.first+o.size-1,Xe(o,n).text.length,null,1,1);t<0&&(t=0);for(var a=Xe(o,i);;){var l=no(e,a,i,t,r),s=Wt(a,l.ch+(l.xRel>0||l.outside>0?1:0));if(!s)return l;var d=s.find(1);if(d.line==i)return d;a=Xe(o,i=d.line)}}function ro(e,t,r,o){o-=Gr(t);var i=t.text.length,n=ue((function(t){return Pr(e,r,t-1).bottom<=o}),i,0);return{begin:n,end:i=ue((function(t){return Pr(e,r,t).top>o}),n,i)}}function oo(e,t,r,o){return r||(r=Dr(e,t)),ro(e,t,r,Jr(e,t,Pr(e,r,o),"line").top)}function io(e,t,r,o){return!(e.bottom<=r)&&(e.top>r||(o?e.left:e.right)>t)}function no(e,t,r,o,i){i-=Jt(t);var n=Dr(e,t),a=Gr(t),l=0,s=t.text.length,d=!0,c=me(t,e.doc.direction);if(c){var u=(e.options.lineWrapping?lo:ao)(e,t,r,n,c,o,i);l=(d=1!=u.level)?u.from:u.to-1,s=d?u.to:u.from-1}var p,h,g=null,m=null,f=ue((function(t){var r=Pr(e,n,t);return r.top+=a,r.bottom+=a,!!io(r,o,i,!1)&&(r.top<=i&&r.left<=o&&(g=t,m=r),!0)}),l,s),b=!1;if(m){var y=o-m.left<m.right-o,v=y==d;f=g+(v?0:1),h=v?"after":"before",p=y?m.left:m.right}else{d||f!=s&&f!=l||f++,h=0==f?"after":f==t.text.length?"before":Pr(e,n,f-(d?1:0)).bottom+a<=i==d?"after":"before";var x=Xr(e,at(r,f,h),"line",t,n);p=x.left,b=i<x.top?-1:i>=x.bottom?1:0}return eo(r,f=ce(t.text,f,1),h,b,o-p)}function ao(e,t,r,o,i,n,a){var l=ue((function(l){var s=i[l],d=1!=s.level;return io(Xr(e,at(r,d?s.to:s.from,d?"before":"after"),"line",t,o),n,a,!0)}),0,i.length-1),s=i[l];if(l>0){var d=1!=s.level,c=Xr(e,at(r,d?s.from:s.to,d?"after":"before"),"line",t,o);io(c,n,a,!0)&&c.top>a&&(s=i[l-1])}return s}function lo(e,t,r,o,i,n,a){var l=ro(e,t,o,a),s=l.begin,d=l.end;/\s/.test(t.text.charAt(d-1))&&d--;for(var c=null,u=null,p=0;p<i.length;p++){var h=i[p];if(!(h.from>=d||h.to<=s)){var g=Pr(e,o,1!=h.level?Math.min(d,h.to)-1:Math.max(s,h.from)).right,m=g<n?n-g+1e9:g-n;(!c||u>m)&&(c=h,u=m)}}return c||(c=i[i.length-1]),c.from<s&&(c={from:s,to:c.to,level:c.level}),c.to>d&&(c={from:c.from,to:d,level:c.level}),c}function so(e){if(null!=e.cachedTextHeight)return e.cachedTextHeight;if(null==Hr){Hr=L("pre",null,"CodeMirror-line-like");for(var t=0;t<49;++t)Hr.appendChild(document.createTextNode("x")),Hr.appendChild(L("br"));Hr.appendChild(document.createTextNode("x"))}O(e.measure,Hr);var r=Hr.offsetHeight/50;return r>3&&(e.cachedTextHeight=r),A(e.measure),r||1}function co(e){if(null!=e.cachedCharWidth)return e.cachedCharWidth;var t=L("span","xxxxxxxxxx"),r=L("pre",[t],"CodeMirror-line-like");O(e.measure,r);var o=t.getBoundingClientRect(),i=(o.right-o.left)/10;return i>2&&(e.cachedCharWidth=i),i||10}function uo(e){for(var t=e.display,r={},o={},i=t.gutters.clientLeft,n=t.gutters.firstChild,a=0;n;n=n.nextSibling,++a){var l=e.display.gutterSpecs[a].className;r[l]=n.offsetLeft+n.clientLeft+i,o[l]=n.clientWidth}return{fixedPos:po(t),gutterTotalWidth:t.gutters.offsetWidth,gutterLeft:r,gutterWidth:o,wrapperWidth:t.wrapper.clientWidth}}function po(e){return e.scroller.getBoundingClientRect().left-e.sizer.getBoundingClientRect().left}function ho(e){var t=so(e.display),r=e.options.lineWrapping,o=r&&Math.max(5,e.display.scroller.clientWidth/co(e.display)-3);return function(i){if(Zt(e.doc,i))return 0;var n=0;if(i.widgets)for(var a=0;a<i.widgets.length;a++)i.widgets[a].height&&(n+=i.widgets[a].height);return r?n+(Math.ceil(i.text.length/o)||1)*t:n+t}}function go(e){var t=e.doc,r=ho(e);t.iter((function(e){var t=r(e);t!=e.height&&tt(e,t)}))}function mo(e,t,r,o){var i=e.display;if(!r&&"true"==Oe(t).getAttribute("cm-not-content"))return null;var n,a,l=i.lineSpace.getBoundingClientRect();try{n=t.clientX-l.left,a=t.clientY-l.top}catch(e){return null}var s,d=to(e,n,a);if(o&&d.xRel>0&&(s=Xe(e.doc,d.line).text).length==d.ch){var c=K(s,s.length,e.options.tabSize)-s.length;d=at(d.line,Math.max(0,Math.round((n-Lr(e.display).left)/co(e.display))-c))}return d}function fo(e,t){if(t>=e.display.viewTo)return null;if((t-=e.display.viewFrom)<0)return null;for(var r=e.display.view,o=0;o<r.length;o++)if((t-=r[o].size)<0)return o}function bo(e,t,r,o){null==t&&(t=e.doc.first),null==r&&(r=e.doc.first+e.doc.size),o||(o=0);var i=e.display;if(o&&r<i.viewTo&&(null==i.updateLineNumbers||i.updateLineNumbers>t)&&(i.updateLineNumbers=t),e.curOp.viewChanged=!0,t>=i.viewTo)At&&Vt(e.doc,t)<i.viewTo&&vo(e);else if(r<=i.viewFrom)At&&qt(e.doc,r+o)>i.viewFrom?vo(e):(i.viewFrom+=o,i.viewTo+=o);else if(t<=i.viewFrom&&r>=i.viewTo)vo(e);else if(t<=i.viewFrom){var n=xo(e,r,r+o,1);n?(i.view=i.view.slice(n.index),i.viewFrom=n.lineN,i.viewTo+=o):vo(e)}else if(r>=i.viewTo){var a=xo(e,t,t,-1);a?(i.view=i.view.slice(0,a.index),i.viewTo=a.lineN):vo(e)}else{var l=xo(e,t,t,-1),s=xo(e,r,r+o,1);l&&s?(i.view=i.view.slice(0,l.index).concat(cr(e,l.lineN,s.lineN)).concat(i.view.slice(s.index)),i.viewTo+=o):vo(e)}var d=i.externalMeasured;d&&(r<d.lineN?d.lineN+=o:t<d.lineN+d.size&&(i.externalMeasured=null))}function yo(e,t,r){e.curOp.viewChanged=!0;var o=e.display,i=e.display.externalMeasured;if(i&&t>=i.lineN&&t<i.lineN+i.size&&(o.externalMeasured=null),!(t<o.viewFrom||t>=o.viewTo)){var n=o.view[fo(e,t)];if(null!=n.node){var a=n.changes||(n.changes=[]);-1==V(a,r)&&a.push(r)}}}function vo(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0}function xo(e,t,r,o){var i,n=fo(e,t),a=e.display.view;if(!At||r==e.doc.first+e.doc.size)return{index:n,lineN:r};for(var l=e.display.viewFrom,s=0;s<n;s++)l+=a[s].size;if(l!=t){if(o>0){if(n==a.length-1)return null;i=l+a[n].size-t,n++}else i=l-t;t+=i,r+=i}for(;Vt(e.doc,r)!=r;){if(n==(o<0?0:a.length-1))return null;r+=o*a[n-(o<0?1:0)].size,n+=o}return{index:n,lineN:r}}function wo(e){for(var t=e.display.view,r=0,o=0;o<t.length;o++){var i=t[o];i.hidden||i.node&&!i.changes||++r}return r}function ko(e){e.display.input.showSelection(e.display.input.prepareSelection())}function _o(e,t){void 0===t&&(t=!0);var r=e.doc,o={},i=o.cursors=document.createDocumentFragment(),n=o.selection=document.createDocumentFragment(),a=e.options.$customCursor;a&&(t=!0);for(var l=0;l<r.sel.ranges.length;l++)if(t||l!=r.sel.primIndex){var s=r.sel.ranges[l];if(!(s.from().line>=e.display.viewTo||s.to().line<e.display.viewFrom)){var d=s.empty();if(a){var c=a(e,s);c&&Co(e,c,i)}else(d||e.options.showCursorWhenSelecting)&&Co(e,s.head,i);d||Eo(e,s,n)}}return o}function Co(e,t,r){var o=Xr(e,t,"div",null,null,!e.options.singleCursorHeightPerLine),i=r.appendChild(L("div"," ","CodeMirror-cursor"));if(i.style.left=o.left+"px",i.style.top=o.top+"px",i.style.height=Math.max(0,o.bottom-o.top)*e.options.cursorHeight+"px",/\bcm-fat-cursor\b/.test(e.getWrapperElement().className)){var n=Yr(e,t,"div",null,null),a=n.right-n.left;i.style.width=(a>0?a:e.defaultCharWidth())+"px"}if(o.other){var l=r.appendChild(L("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"));l.style.display="",l.style.left=o.other.left+"px",l.style.top=o.other.top+"px",l.style.height=.85*(o.other.bottom-o.other.top)+"px"}}function So(e,t){return e.top-t.top||e.left-t.left}function Eo(e,t,r){var o=e.display,i=e.doc,n=document.createDocumentFragment(),a=Lr(e.display),l=a.left,s=Math.max(o.sizerWidth,Ir(e)-o.sizer.offsetLeft)-a.right,d="ltr"==i.direction;function c(e,t,r,o){t<0&&(t=0),t=Math.round(t),o=Math.round(o),n.appendChild(L("div",null,"CodeMirror-selected","position: absolute; left: "+e+"px;\n                             top: "+t+"px; width: "+(null==r?s-e:r)+"px;\n                             height: "+(o-t)+"px"))}function u(t,r,o){var n,a,u=Xe(i,t),p=u.text.length;function h(r,o){return Yr(e,at(t,r),"div",u,o)}function g(t,r,o){var i=oo(e,u,null,t),n="ltr"==r==("after"==o)?"left":"right";return h("after"==o?i.begin:i.end-(/\s/.test(u.text.charAt(i.end-1))?2:1),n)[n]}var m=me(u,i.direction);return function(e,t,r,o){if(!e)return o(t,r,"ltr",0);for(var i=!1,n=0;n<e.length;++n){var a=e[n];(a.from<r&&a.to>t||t==r&&a.to==t)&&(o(Math.max(a.from,t),Math.min(a.to,r),1==a.level?"rtl":"ltr",n),i=!0)}i||o(t,r,"ltr")}(m,r||0,null==o?p:o,(function(e,t,i,u){var f="ltr"==i,b=h(e,f?"left":"right"),y=h(t-1,f?"right":"left"),v=null==r&&0==e,x=null==o&&t==p,w=0==u,k=!m||u==m.length-1;if(y.top-b.top<=3){var _=(d?x:v)&&k,C=(d?v:x)&&w?l:(f?b:y).left,S=_?s:(f?y:b).right;c(C,b.top,S-C,b.bottom)}else{var E,T,A,O;f?(E=d&&v&&w?l:b.left,T=d?s:g(e,i,"before"),A=d?l:g(t,i,"after"),O=d&&x&&k?s:y.right):(E=d?g(e,i,"before"):l,T=!d&&v&&w?s:b.right,A=!d&&x&&k?l:y.left,O=d?g(t,i,"after"):s),c(E,b.top,T-E,b.bottom),b.bottom<y.top&&c(l,b.bottom,null,y.top),c(A,y.top,O-A,y.bottom)}(!n||So(b,n)<0)&&(n=b),So(y,n)<0&&(n=y),(!a||So(b,a)<0)&&(a=b),So(y,a)<0&&(a=y)})),{start:n,end:a}}var p=t.from(),h=t.to();if(p.line==h.line)u(p.line,p.ch,h.ch);else{var g=Xe(i,p.line),m=Xe(i,h.line),f=jt(g)==jt(m),b=u(p.line,p.ch,f?g.text.length+1:null).end,y=u(h.line,f?0:null,h.ch).start;f&&(b.top<y.top-2?(c(b.right,b.top,null,b.bottom),c(l,y.top,y.left,y.bottom)):c(b.right,b.top,y.left-b.right,b.bottom)),b.bottom<y.top&&c(l,b.bottom,null,y.top)}r.appendChild(n)}function To(e){if(e.state.focused){var t=e.display;clearInterval(t.blinker);var r=!0;t.cursorDiv.style.visibility="",e.options.cursorBlinkRate>0?t.blinker=setInterval((function(){e.hasFocus()||Mo(e),t.cursorDiv.style.visibility=(r=!r)?"":"hidden"}),e.options.cursorBlinkRate):e.options.cursorBlinkRate<0&&(t.cursorDiv.style.visibility="hidden")}}function Ao(e){e.hasFocus()||(e.display.input.focus(),e.state.focused||Lo(e))}function Oo(e){e.state.delayingBlurEvent=!0,setTimeout((function(){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1,e.state.focused&&Mo(e))}),100)}function Lo(e,t){e.state.delayingBlurEvent&&!e.state.draggingText&&(e.state.delayingBlurEvent=!1),"nocursor"!=e.options.readOnly&&(e.state.focused||(xe(e,"focus",e,t),e.state.focused=!0,F(e.display.wrapper,"CodeMirror-focused"),e.curOp||e.display.selForContextMenu==e.doc.sel||(e.display.input.reset(),s&&setTimeout((function(){return e.display.input.reset(!0)}),20)),e.display.input.receivedFocus()),To(e))}function Mo(e,t){e.state.delayingBlurEvent||(e.state.focused&&(xe(e,"blur",e,t),e.state.focused=!1,T(e.display.wrapper,"CodeMirror-focused")),clearInterval(e.display.blinker),setTimeout((function(){e.state.focused||(e.display.shift=!1)}),150))}function Io(e){for(var t=e.display,r=t.lineDiv.offsetTop,o=Math.max(0,t.scroller.getBoundingClientRect().top),i=t.lineDiv.getBoundingClientRect().top,n=0,s=0;s<t.view.length;s++){var d=t.view[s],c=e.options.lineWrapping,u=void 0,p=0;if(!d.hidden){if(i+=d.line.height,a&&l<8){var h=d.node.offsetTop+d.node.offsetHeight;u=h-r,r=h}else{var g=d.node.getBoundingClientRect();u=g.bottom-g.top,!c&&d.text.firstChild&&(p=d.text.firstChild.getBoundingClientRect().right-g.left-1)}var m=d.line.height-u;if((m>.005||m<-.005)&&(i<o&&(n-=m),tt(d.line,u),Ro(d.line),d.rest))for(var f=0;f<d.rest.length;f++)Ro(d.rest[f]);if(p>e.display.sizerWidth){var b=Math.ceil(p/co(e.display));b>e.display.maxLineLength&&(e.display.maxLineLength=b,e.display.maxLine=d.line,e.display.maxLineChanged=!0)}}}Math.abs(n)>2&&(t.scroller.scrollTop+=n)}function Ro(e){if(e.widgets)for(var t=0;t<e.widgets.length;++t){var r=e.widgets[t],o=r.node.parentNode;o&&(r.height=o.offsetHeight)}}function Fo(e,t,r){var o=r&&null!=r.top?Math.max(0,r.top):e.scroller.scrollTop;o=Math.floor(o-Ar(e));var i=r&&null!=r.bottom?r.bottom:o+e.wrapper.clientHeight,n=ot(t,o),a=ot(t,i);if(r&&r.ensure){var l=r.ensure.from.line,s=r.ensure.to.line;l<n?(n=l,a=ot(t,Jt(Xe(t,l))+e.wrapper.clientHeight)):Math.min(s,t.lastLine())>=a&&(n=ot(t,Jt(Xe(t,s))-e.wrapper.clientHeight),a=s)}return{from:n,to:Math.max(a,n+1)}}function No(e,t){var r=e.display,o=so(e.display);t.top<0&&(t.top=0);var i=e.curOp&&null!=e.curOp.scrollTop?e.curOp.scrollTop:r.scroller.scrollTop,n=Rr(e),a={};t.bottom-t.top>n&&(t.bottom=t.top+n);var l=e.doc.height+Or(r),s=t.top<o,d=t.bottom>l-o;if(t.top<i)a.scrollTop=s?0:t.top;else if(t.bottom>i+n){var c=Math.min(t.top,(d?l:t.bottom)-n);c!=i&&(a.scrollTop=c)}var u=e.options.fixedGutter?0:r.gutters.offsetWidth,p=e.curOp&&null!=e.curOp.scrollLeft?e.curOp.scrollLeft:r.scroller.scrollLeft-u,h=Ir(e)-r.gutters.offsetWidth,g=t.right-t.left>h;return g&&(t.right=t.left+h),t.left<10?a.scrollLeft=0:t.left<p?a.scrollLeft=Math.max(0,t.left+u-(g?0:10)):t.right>h+p-3&&(a.scrollLeft=t.right+(g?0:10)-h),a}function zo(e,t){null!=t&&(Ho(e),e.curOp.scrollTop=(null==e.curOp.scrollTop?e.doc.scrollTop:e.curOp.scrollTop)+t)}function Do(e){Ho(e);var t=e.getCursor();e.curOp.scrollToPos={from:t,to:t,margin:e.options.cursorScrollMargin}}function Po(e,t,r){null==t&&null==r||Ho(e),null!=t&&(e.curOp.scrollLeft=t),null!=r&&(e.curOp.scrollTop=r)}function Ho(e){var t=e.curOp.scrollToPos;t&&(e.curOp.scrollToPos=null,Uo(e,$r(e,t.from),$r(e,t.to),t.margin))}function Uo(e,t,r,o){var i=No(e,{left:Math.min(t.left,r.left),top:Math.min(t.top,r.top)-o,right:Math.max(t.right,r.right),bottom:Math.max(t.bottom,r.bottom)+o});Po(e,i.scrollLeft,i.scrollTop)}function Bo(e,t){Math.abs(e.doc.scrollTop-t)<2||(r||gi(e,{top:t}),Wo(e,t,!0),r&&gi(e),di(e,100))}function Wo(e,t,r){t=Math.max(0,Math.min(e.display.scroller.scrollHeight-e.display.scroller.clientHeight,t)),(e.display.scroller.scrollTop!=t||r)&&(e.doc.scrollTop=t,e.display.scrollbars.setScrollTop(t),e.display.scroller.scrollTop!=t&&(e.display.scroller.scrollTop=t))}function Ko(e,t,r,o){t=Math.max(0,Math.min(t,e.display.scroller.scrollWidth-e.display.scroller.clientWidth)),(r?t==e.doc.scrollLeft:Math.abs(e.doc.scrollLeft-t)<2)&&!o||(e.doc.scrollLeft=t,bi(e),e.display.scroller.scrollLeft!=t&&(e.display.scroller.scrollLeft=t),e.display.scrollbars.setScrollLeft(t))}function jo(e){var t=e.display,r=t.gutters.offsetWidth,o=Math.round(e.doc.height+Or(e.display));return{clientHeight:t.scroller.clientHeight,viewHeight:t.wrapper.clientHeight,scrollWidth:t.scroller.scrollWidth,clientWidth:t.scroller.clientWidth,viewWidth:t.wrapper.clientWidth,barLeft:e.options.fixedGutter?r:0,docHeight:o,scrollHeight:o+Mr(e)+t.barHeight,nativeBarWidth:t.nativeBarWidth,gutterWidth:r}}var Vo=function(e,t,r){this.cm=r;var o=this.vert=L("div",[L("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),i=this.horiz=L("div",[L("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar");o.tabIndex=i.tabIndex=-1,e(o),e(i),be(o,"scroll",(function(){o.clientHeight&&t(o.scrollTop,"vertical")})),be(i,"scroll",(function(){i.clientWidth&&t(i.scrollLeft,"horizontal")})),this.checkedZeroWidth=!1,a&&l<8&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")};Vo.prototype.update=function(e){var t=e.scrollWidth>e.clientWidth+1,r=e.scrollHeight>e.clientHeight+1,o=e.nativeBarWidth;if(r){this.vert.style.display="block",this.vert.style.bottom=t?o+"px":"0";var i=e.viewHeight-(t?o:0);this.vert.firstChild.style.height=Math.max(0,e.scrollHeight-e.clientHeight+i)+"px"}else this.vert.scrollTop=0,this.vert.style.display="",this.vert.firstChild.style.height="0";if(t){this.horiz.style.display="block",this.horiz.style.right=r?o+"px":"0",this.horiz.style.left=e.barLeft+"px";var n=e.viewWidth-e.barLeft-(r?o:0);this.horiz.firstChild.style.width=Math.max(0,e.scrollWidth-e.clientWidth+n)+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0";return!this.checkedZeroWidth&&e.clientHeight>0&&(0==o&&this.zeroWidthHack(),this.checkedZeroWidth=!0),{right:r?o:0,bottom:t?o:0}},Vo.prototype.setScrollLeft=function(e){this.horiz.scrollLeft!=e&&(this.horiz.scrollLeft=e),this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz,"horiz")},Vo.prototype.setScrollTop=function(e){this.vert.scrollTop!=e&&(this.vert.scrollTop=e),this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert,"vert")},Vo.prototype.zeroWidthHack=function(){var e=v&&!g?"12px":"18px";this.horiz.style.height=this.vert.style.width=e,this.horiz.style.visibility=this.vert.style.visibility="hidden",this.disableHoriz=new j,this.disableVert=new j},Vo.prototype.enableZeroWidthBar=function(e,t,r){e.style.visibility="",t.set(1e3,(function o(){var i=e.getBoundingClientRect();("vert"==r?document.elementFromPoint(i.right-1,(i.top+i.bottom)/2):document.elementFromPoint((i.right+i.left)/2,i.bottom-1))!=e?e.style.visibility="hidden":t.set(1e3,o)}))},Vo.prototype.clear=function(){var e=this.horiz.parentNode;e.removeChild(this.horiz),e.removeChild(this.vert)};var qo=function(){};function Zo(e,t){t||(t=jo(e));var r=e.display.barWidth,o=e.display.barHeight;Go(e,t);for(var i=0;i<4&&r!=e.display.barWidth||o!=e.display.barHeight;i++)r!=e.display.barWidth&&e.options.lineWrapping&&Io(e),Go(e,jo(e)),r=e.display.barWidth,o=e.display.barHeight}function Go(e,t){var r=e.display,o=r.scrollbars.update(t);r.sizer.style.paddingRight=(r.barWidth=o.right)+"px",r.sizer.style.paddingBottom=(r.barHeight=o.bottom)+"px",r.heightForcer.style.borderBottom=o.bottom+"px solid transparent",o.right&&o.bottom?(r.scrollbarFiller.style.display="block",r.scrollbarFiller.style.height=o.bottom+"px",r.scrollbarFiller.style.width=o.right+"px"):r.scrollbarFiller.style.display="",o.bottom&&e.options.coverGutterNextToScrollbar&&e.options.fixedGutter?(r.gutterFiller.style.display="block",r.gutterFiller.style.height=o.bottom+"px",r.gutterFiller.style.width=t.gutterWidth+"px"):r.gutterFiller.style.display=""}qo.prototype.update=function(){return{bottom:0,right:0}},qo.prototype.setScrollLeft=function(){},qo.prototype.setScrollTop=function(){},qo.prototype.clear=function(){};var Jo={native:Vo,null:qo};function Qo(e){e.display.scrollbars&&(e.display.scrollbars.clear(),e.display.scrollbars.addClass&&T(e.display.wrapper,e.display.scrollbars.addClass)),e.display.scrollbars=new Jo[e.options.scrollbarStyle]((function(t){e.display.wrapper.insertBefore(t,e.display.scrollbarFiller),be(t,"mousedown",(function(){e.state.focused&&setTimeout((function(){return e.display.input.focus()}),0)})),t.setAttribute("cm-not-content","true")}),(function(t,r){"horizontal"==r?Ko(e,t):Bo(e,t)}),e),e.display.scrollbars.addClass&&F(e.display.wrapper,e.display.scrollbars.addClass)}var Yo=0;function Xo(e){var t;e.curOp={cm:e,viewChanged:!1,startHeight:e.doc.height,forceUpdate:!1,updateInput:0,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++Yo,markArrays:null},t=e.curOp,ur?ur.ops.push(t):t.ownsGroup=ur={ops:[t],delayedCallbacks:[]}}function $o(e){var t=e.curOp;t&&function(e,t){var r=e.ownsGroup;if(r)try{!function(e){var t=e.delayedCallbacks,r=0;do{for(;r<t.length;r++)t[r].call(null);for(var o=0;o<e.ops.length;o++){var i=e.ops[o];if(i.cursorActivityHandlers)for(;i.cursorActivityCalled<i.cursorActivityHandlers.length;)i.cursorActivityHandlers[i.cursorActivityCalled++].call(null,i.cm)}}while(r<t.length)}(r)}finally{ur=null,function(e){for(var t=0;t<e.ops.length;t++)e.ops[t].cm.curOp=null;!function(e){for(var t=e.ops,r=0;r<t.length;r++)ei(t[r]);for(var o=0;o<t.length;o++)ti(t[o]);for(var i=0;i<t.length;i++)ri(t[i]);for(var n=0;n<t.length;n++)oi(t[n]);for(var a=0;a<t.length;a++)ii(t[a])}(e)}(r)}}(t)}function ei(e){var t=e.cm,r=t.display;!function(e){var t=e.display;!t.scrollbarsClipped&&t.scroller.offsetWidth&&(t.nativeBarWidth=t.scroller.offsetWidth-t.scroller.clientWidth,t.heightForcer.style.height=Mr(e)+"px",t.sizer.style.marginBottom=-t.nativeBarWidth+"px",t.sizer.style.borderRightWidth=Mr(e)+"px",t.scrollbarsClipped=!0)}(t),e.updateMaxLine&&Yt(t),e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<r.viewFrom||e.scrollToPos.to.line>=r.viewTo)||r.maxLineChanged&&t.options.lineWrapping,e.update=e.mustUpdate&&new ui(t,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}function ti(e){e.updatedDisplay=e.mustUpdate&&pi(e.cm,e.update)}function ri(e){var t=e.cm,r=t.display;e.updatedDisplay&&Io(t),e.barMeasure=jo(t),r.maxLineChanged&&!t.options.lineWrapping&&(e.adjustWidthTo=Nr(t,r.maxLine,r.maxLine.text.length).left+3,t.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(r.scroller.clientWidth,r.sizer.offsetLeft+e.adjustWidthTo+Mr(t)+t.display.barWidth),e.maxScrollLeft=Math.max(0,r.sizer.offsetLeft+e.adjustWidthTo-Ir(t))),(e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=r.input.prepareSelection())}function oi(e){var t=e.cm;null!=e.adjustWidthTo&&(t.display.sizer.style.minWidth=e.adjustWidthTo+"px",e.maxScrollLeft<t.doc.scrollLeft&&Ko(t,Math.min(t.display.scroller.scrollLeft,e.maxScrollLeft),!0),t.display.maxLineChanged=!1);var r=e.focus&&e.focus==R(P(t));e.preparedSelection&&t.display.input.showSelection(e.preparedSelection,r),(e.updatedDisplay||e.startHeight!=t.doc.height)&&Zo(t,e.barMeasure),e.updatedDisplay&&fi(t,e.barMeasure),e.selectionChanged&&To(t),t.state.focused&&e.updateInput&&t.display.input.reset(e.typing),r&&Ao(e.cm)}function ii(e){var t=e.cm,r=t.display,o=t.doc;if(e.updatedDisplay&&hi(t,e.update),null==r.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(r.wheelStartX=r.wheelStartY=null),null!=e.scrollTop&&Wo(t,e.scrollTop,e.forceScroll),null!=e.scrollLeft&&Ko(t,e.scrollLeft,!0,!0),e.scrollToPos){var i=function(e,t,r,o){var i;null==o&&(o=0),e.options.lineWrapping||t!=r||(r="before"==t.sticky?at(t.line,t.ch+1,"before"):t,t=t.ch?at(t.line,"before"==t.sticky?t.ch-1:t.ch,"after"):t);for(var n=0;n<5;n++){var a=!1,l=Xr(e,t),s=r&&r!=t?Xr(e,r):l,d=No(e,i={left:Math.min(l.left,s.left),top:Math.min(l.top,s.top)-o,right:Math.max(l.left,s.left),bottom:Math.max(l.bottom,s.bottom)+o}),c=e.doc.scrollTop,u=e.doc.scrollLeft;if(null!=d.scrollTop&&(Bo(e,d.scrollTop),Math.abs(e.doc.scrollTop-c)>1&&(a=!0)),null!=d.scrollLeft&&(Ko(e,d.scrollLeft),Math.abs(e.doc.scrollLeft-u)>1&&(a=!0)),!a)break}return i}(t,ht(o,e.scrollToPos.from),ht(o,e.scrollToPos.to),e.scrollToPos.margin);!function(e,t){if(!we(e,"scrollCursorIntoView")){var r=e.display,o=r.sizer.getBoundingClientRect(),i=null,n=r.wrapper.ownerDocument;if(t.top+o.top<0?i=!0:t.bottom+o.top>(n.defaultView.innerHeight||n.documentElement.clientHeight)&&(i=!1),null!=i&&!m){var a=L("div","​",null,"position: absolute;\n                         top: "+(t.top-r.viewOffset-Ar(e.display))+"px;\n                         height: "+(t.bottom-t.top+Mr(e)+r.barHeight)+"px;\n                         left: "+t.left+"px; width: "+Math.max(2,t.right-t.left)+"px;");e.display.lineSpace.appendChild(a),a.scrollIntoView(i),e.display.lineSpace.removeChild(a)}}}(t,i)}var n=e.maybeHiddenMarkers,a=e.maybeUnhiddenMarkers;if(n)for(var l=0;l<n.length;++l)n[l].lines.length||xe(n[l],"hide");if(a)for(var s=0;s<a.length;++s)a[s].lines.length&&xe(a[s],"unhide");r.wrapper.offsetHeight&&(o.scrollTop=t.display.scroller.scrollTop),e.changeObjs&&xe(t,"changes",t,e.changeObjs),e.update&&e.update.finish()}function ni(e,t){if(e.curOp)return t();Xo(e);try{return t()}finally{$o(e)}}function ai(e,t){return function(){if(e.curOp)return t.apply(e,arguments);Xo(e);try{return t.apply(e,arguments)}finally{$o(e)}}}function li(e){return function(){if(this.curOp)return e.apply(this,arguments);Xo(this);try{return e.apply(this,arguments)}finally{$o(this)}}}function si(e){return function(){var t=this.cm;if(!t||t.curOp)return e.apply(this,arguments);Xo(t);try{return e.apply(this,arguments)}finally{$o(t)}}}function di(e,t){e.doc.highlightFrontier<e.display.viewTo&&e.state.highlight.set(t,B(ci,e))}function ci(e){var t=e.doc;if(!(t.highlightFrontier>=e.display.viewTo)){var r=+new Date+e.options.workTime,o=vt(e,t.highlightFrontier),i=[];t.iter(o.line,Math.min(t.first+t.size,e.display.viewTo+500),(function(n){if(o.line>=e.display.viewFrom){var a=n.styles,l=n.text.length>e.options.maxHighlightLength?Ge(t.mode,o.state):null,s=bt(e,n,o,!0);l&&(o.state=l),n.styles=s.styles;var d=n.styleClasses,c=s.classes;c?n.styleClasses=c:d&&(n.styleClasses=null);for(var u=!a||a.length!=n.styles.length||d!=c&&(!d||!c||d.bgClass!=c.bgClass||d.textClass!=c.textClass),p=0;!u&&p<a.length;++p)u=a[p]!=n.styles[p];u&&i.push(o.line),n.stateAfter=o.save(),o.nextLine()}else n.text.length<=e.options.maxHighlightLength&&xt(e,n.text,o),n.stateAfter=o.line%5==0?o.save():null,o.nextLine();if(+new Date>r)return di(e,e.options.workDelay),!0})),t.highlightFrontier=o.line,t.modeFrontier=Math.max(t.modeFrontier,o.line),i.length&&ni(e,(function(){for(var t=0;t<i.length;t++)yo(e,i[t],"text")}))}}var ui=function(e,t,r){var o=e.display;this.viewport=t,this.visible=Fo(o,e.doc,t),this.editorIsHidden=!o.wrapper.offsetWidth,this.wrapperHeight=o.wrapper.clientHeight,this.wrapperWidth=o.wrapper.clientWidth,this.oldDisplayWidth=Ir(e),this.force=r,this.dims=uo(e),this.events=[]};function pi(e,t){var r=e.display,o=e.doc;if(t.editorIsHidden)return vo(e),!1;if(!t.force&&t.visible.from>=r.viewFrom&&t.visible.to<=r.viewTo&&(null==r.updateLineNumbers||r.updateLineNumbers>=r.viewTo)&&r.renderedView==r.view&&0==wo(e))return!1;yi(e)&&(vo(e),t.dims=uo(e));var i=o.first+o.size,n=Math.max(t.visible.from-e.options.viewportMargin,o.first),a=Math.min(i,t.visible.to+e.options.viewportMargin);r.viewFrom<n&&n-r.viewFrom<20&&(n=Math.max(o.first,r.viewFrom)),r.viewTo>a&&r.viewTo-a<20&&(a=Math.min(i,r.viewTo)),At&&(n=Vt(e.doc,n),a=qt(e.doc,a));var l=n!=r.viewFrom||a!=r.viewTo||r.lastWrapHeight!=t.wrapperHeight||r.lastWrapWidth!=t.wrapperWidth;!function(e,t,r){var o=e.display;0==o.view.length||t>=o.viewTo||r<=o.viewFrom?(o.view=cr(e,t,r),o.viewFrom=t):(o.viewFrom>t?o.view=cr(e,t,o.viewFrom).concat(o.view):o.viewFrom<t&&(o.view=o.view.slice(fo(e,t))),o.viewFrom=t,o.viewTo<r?o.view=o.view.concat(cr(e,o.viewTo,r)):o.viewTo>r&&(o.view=o.view.slice(0,fo(e,r)))),o.viewTo=r}(e,n,a),r.viewOffset=Jt(Xe(e.doc,r.viewFrom)),e.display.mover.style.top=r.viewOffset+"px";var d=wo(e);if(!l&&0==d&&!t.force&&r.renderedView==r.view&&(null==r.updateLineNumbers||r.updateLineNumbers>=r.viewTo))return!1;var c=function(e){if(e.hasFocus())return null;var t=R(P(e));if(!t||!I(e.display.lineDiv,t))return null;var r={activeElt:t};if(window.getSelection){var o=U(e).getSelection();o.anchorNode&&o.extend&&I(e.display.lineDiv,o.anchorNode)&&(r.anchorNode=o.anchorNode,r.anchorOffset=o.anchorOffset,r.focusNode=o.focusNode,r.focusOffset=o.focusOffset)}return r}(e);return d>4&&(r.lineDiv.style.display="none"),function(e,t,r){var o=e.display,i=e.options.lineNumbers,n=o.lineDiv,a=n.firstChild;function l(t){var r=t.nextSibling;return s&&v&&e.display.currentWheelTarget==t?t.style.display="none":t.parentNode.removeChild(t),r}for(var d=o.view,c=o.viewFrom,u=0;u<d.length;u++){var p=d[u];if(p.hidden);else if(p.node&&p.node.parentNode==n){for(;a!=p.node;)a=l(a);var h=i&&null!=t&&t<=c&&p.lineNumber;p.changes&&(V(p.changes,"gutter")>-1&&(h=!1),mr(e,p,c,r)),h&&(A(p.lineNumber),p.lineNumber.appendChild(document.createTextNode(nt(e.options,c)))),a=p.node.nextSibling}else{var g=kr(e,p,c,r);n.insertBefore(g,a)}c+=p.size}for(;a;)a=l(a)}(e,r.updateLineNumbers,t.dims),d>4&&(r.lineDiv.style.display=""),r.renderedView=r.view,function(e){if(e&&e.activeElt&&e.activeElt!=R(H(e.activeElt))&&(e.activeElt.focus(),!/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName)&&e.anchorNode&&I(document.body,e.anchorNode)&&I(document.body,e.focusNode))){var t=e.activeElt.ownerDocument,r=t.defaultView.getSelection(),o=t.createRange();o.setEnd(e.anchorNode,e.anchorOffset),o.collapse(!1),r.removeAllRanges(),r.addRange(o),r.extend(e.focusNode,e.focusOffset)}}(c),A(r.cursorDiv),A(r.selectionDiv),r.gutters.style.height=r.sizer.style.minHeight=0,l&&(r.lastWrapHeight=t.wrapperHeight,r.lastWrapWidth=t.wrapperWidth,di(e,400)),r.updateLineNumbers=null,!0}function hi(e,t){for(var r=t.viewport,o=!0;;o=!1){if(o&&e.options.lineWrapping&&t.oldDisplayWidth!=Ir(e))o&&(t.visible=Fo(e.display,e.doc,r));else if(r&&null!=r.top&&(r={top:Math.min(e.doc.height+Or(e.display)-Rr(e),r.top)}),t.visible=Fo(e.display,e.doc,r),t.visible.from>=e.display.viewFrom&&t.visible.to<=e.display.viewTo)break;if(!pi(e,t))break;Io(e);var i=jo(e);ko(e),Zo(e,i),fi(e,i),t.force=!1}t.signal(e,"update",e),e.display.viewFrom==e.display.reportedViewFrom&&e.display.viewTo==e.display.reportedViewTo||(t.signal(e,"viewportChange",e,e.display.viewFrom,e.display.viewTo),e.display.reportedViewFrom=e.display.viewFrom,e.display.reportedViewTo=e.display.viewTo)}function gi(e,t){var r=new ui(e,t);if(pi(e,r)){Io(e),hi(e,r);var o=jo(e);ko(e),Zo(e,o),fi(e,o),r.finish()}}function mi(e){var t=e.gutters.offsetWidth;e.sizer.style.marginLeft=t+"px",hr(e,"gutterChanged",e)}function fi(e,t){e.display.sizer.style.minHeight=t.docHeight+"px",e.display.heightForcer.style.top=t.docHeight+"px",e.display.gutters.style.height=t.docHeight+e.display.barHeight+Mr(e)+"px"}function bi(e){var t=e.display,r=t.view;if(t.alignWidgets||t.gutters.firstChild&&e.options.fixedGutter){for(var o=po(t)-t.scroller.scrollLeft+e.doc.scrollLeft,i=t.gutters.offsetWidth,n=o+"px",a=0;a<r.length;a++)if(!r[a].hidden){e.options.fixedGutter&&(r[a].gutter&&(r[a].gutter.style.left=n),r[a].gutterBackground&&(r[a].gutterBackground.style.left=n));var l=r[a].alignable;if(l)for(var s=0;s<l.length;s++)l[s].style.left=n}e.options.fixedGutter&&(t.gutters.style.left=o+i+"px")}}function yi(e){if(!e.options.lineNumbers)return!1;var t=e.doc,r=nt(e.options,t.first+t.size-1),o=e.display;if(r.length!=o.lineNumChars){var i=o.measure.appendChild(L("div",[L("div",r)],"CodeMirror-linenumber CodeMirror-gutter-elt")),n=i.firstChild.offsetWidth,a=i.offsetWidth-n;return o.lineGutter.style.width="",o.lineNumInnerWidth=Math.max(n,o.lineGutter.offsetWidth-a)+1,o.lineNumWidth=o.lineNumInnerWidth+a,o.lineNumChars=o.lineNumInnerWidth?r.length:-1,o.lineGutter.style.width=o.lineNumWidth+"px",mi(e.display),!0}return!1}function vi(e,t){for(var r=[],o=!1,i=0;i<e.length;i++){var n=e[i],a=null;if("string"!=typeof n&&(a=n.style,n=n.className),"CodeMirror-linenumbers"==n){if(!t)continue;o=!0}r.push({className:n,style:a})}return t&&!o&&r.push({className:"CodeMirror-linenumbers",style:null}),r}function xi(e){var t=e.gutters,r=e.gutterSpecs;A(t),e.lineGutter=null;for(var o=0;o<r.length;++o){var i=r[o],n=i.className,a=i.style,l=t.appendChild(L("div",null,"CodeMirror-gutter "+n));a&&(l.style.cssText=a),"CodeMirror-linenumbers"==n&&(e.lineGutter=l,l.style.width=(e.lineNumWidth||1)+"px")}t.style.display=r.length?"":"none",mi(e)}function wi(e){xi(e.display),bo(e),bi(e)}function ki(e,t,o,i){var n=this;this.input=o,n.scrollbarFiller=L("div",null,"CodeMirror-scrollbar-filler"),n.scrollbarFiller.setAttribute("cm-not-content","true"),n.gutterFiller=L("div",null,"CodeMirror-gutter-filler"),n.gutterFiller.setAttribute("cm-not-content","true"),n.lineDiv=M("div",null,"CodeMirror-code"),n.selectionDiv=L("div",null,null,"position: relative; z-index: 1"),n.cursorDiv=L("div",null,"CodeMirror-cursors"),n.measure=L("div",null,"CodeMirror-measure"),n.lineMeasure=L("div",null,"CodeMirror-measure"),n.lineSpace=M("div",[n.measure,n.lineMeasure,n.selectionDiv,n.cursorDiv,n.lineDiv],null,"position: relative; outline: none");var d=M("div",[n.lineSpace],"CodeMirror-lines");n.mover=L("div",[d],null,"position: relative"),n.sizer=L("div",[n.mover],"CodeMirror-sizer"),n.sizerWidth=null,n.heightForcer=L("div",null,null,"position: absolute; height: "+q+"px; width: 1px;"),n.gutters=L("div",null,"CodeMirror-gutters"),n.lineGutter=null,n.scroller=L("div",[n.sizer,n.heightForcer,n.gutters],"CodeMirror-scroll"),n.scroller.setAttribute("tabIndex","-1"),n.wrapper=L("div",[n.scrollbarFiller,n.gutterFiller,n.scroller],"CodeMirror"),c&&u>=105&&(n.wrapper.style.clipPath="inset(0px)"),n.wrapper.setAttribute("translate","no"),a&&l<8&&(n.gutters.style.zIndex=-1,n.scroller.style.paddingRight=0),s||r&&y||(n.scroller.draggable=!0),e&&(e.appendChild?e.appendChild(n.wrapper):e(n.wrapper)),n.viewFrom=n.viewTo=t.first,n.reportedViewFrom=n.reportedViewTo=t.first,n.view=[],n.renderedView=null,n.externalMeasured=null,n.viewOffset=0,n.lastWrapHeight=n.lastWrapWidth=0,n.updateLineNumbers=null,n.nativeBarWidth=n.barHeight=n.barWidth=0,n.scrollbarsClipped=!1,n.lineNumWidth=n.lineNumInnerWidth=n.lineNumChars=null,n.alignWidgets=!1,n.cachedCharWidth=n.cachedTextHeight=n.cachedPaddingH=null,n.maxLine=null,n.maxLineLength=0,n.maxLineChanged=!1,n.wheelDX=n.wheelDY=n.wheelStartX=n.wheelStartY=null,n.shift=!1,n.selForContextMenu=null,n.activeTouch=null,n.gutterSpecs=vi(i.gutters,i.lineNumbers),xi(n),o.init(n)}ui.prototype.signal=function(e,t){_e(e,t)&&this.events.push(arguments)},ui.prototype.finish=function(){for(var e=0;e<this.events.length;e++)xe.apply(null,this.events[e])};var _i=0,Ci=null;function Si(e){var t=e.wheelDeltaX,r=e.wheelDeltaY;return null==t&&e.detail&&e.axis==e.HORIZONTAL_AXIS&&(t=e.detail),null==r&&e.detail&&e.axis==e.VERTICAL_AXIS?r=e.detail:null==r&&(r=e.wheelDelta),{x:t,y:r}}function Ei(e){var t=Si(e);return t.x*=Ci,t.y*=Ci,t}function Ti(e,t){c&&102==u&&(null==e.display.chromeScrollHack?e.display.sizer.style.pointerEvents="none":clearTimeout(e.display.chromeScrollHack),e.display.chromeScrollHack=setTimeout((function(){e.display.chromeScrollHack=null,e.display.sizer.style.pointerEvents=""}),100));var o=Si(t),i=o.x,n=o.y,a=Ci;0===t.deltaMode&&(i=t.deltaX,n=t.deltaY,a=1);var l=e.display,d=l.scroller,h=d.scrollWidth>d.clientWidth,g=d.scrollHeight>d.clientHeight;if(i&&h||n&&g){if(n&&v&&s)e:for(var m=t.target,f=l.view;m!=d;m=m.parentNode)for(var b=0;b<f.length;b++)if(f[b].node==m){e.display.currentWheelTarget=m;break e}if(i&&!r&&!p&&null!=a)return n&&g&&Bo(e,Math.max(0,d.scrollTop+n*a)),Ko(e,Math.max(0,d.scrollLeft+i*a)),(!n||n&&g)&&Se(t),void(l.wheelStartX=null);if(n&&null!=a){var y=n*a,x=e.doc.scrollTop,w=x+l.wrapper.clientHeight;y<0?x=Math.max(0,x+y-50):w=Math.min(e.doc.height,w+y+50),gi(e,{top:x,bottom:w})}_i<20&&0!==t.deltaMode&&(null==l.wheelStartX?(l.wheelStartX=d.scrollLeft,l.wheelStartY=d.scrollTop,l.wheelDX=i,l.wheelDY=n,setTimeout((function(){if(null!=l.wheelStartX){var e=d.scrollLeft-l.wheelStartX,t=d.scrollTop-l.wheelStartY,r=t&&l.wheelDY&&t/l.wheelDY||e&&l.wheelDX&&e/l.wheelDX;l.wheelStartX=l.wheelStartY=null,r&&(Ci=(Ci*_i+r)/(_i+1),++_i)}}),200)):(l.wheelDX+=i,l.wheelDY+=n))}}a?Ci=-.53:r?Ci=15:c?Ci=-.7:h&&(Ci=-1/3);var Ai=function(e,t){this.ranges=e,this.primIndex=t};Ai.prototype.primary=function(){return this.ranges[this.primIndex]},Ai.prototype.equals=function(e){if(e==this)return!0;if(e.primIndex!=this.primIndex||e.ranges.length!=this.ranges.length)return!1;for(var t=0;t<this.ranges.length;t++){var r=this.ranges[t],o=e.ranges[t];if(!st(r.anchor,o.anchor)||!st(r.head,o.head))return!1}return!0},Ai.prototype.deepCopy=function(){for(var e=[],t=0;t<this.ranges.length;t++)e[t]=new Oi(dt(this.ranges[t].anchor),dt(this.ranges[t].head));return new Ai(e,this.primIndex)},Ai.prototype.somethingSelected=function(){for(var e=0;e<this.ranges.length;e++)if(!this.ranges[e].empty())return!0;return!1},Ai.prototype.contains=function(e,t){t||(t=e);for(var r=0;r<this.ranges.length;r++){var o=this.ranges[r];if(lt(t,o.from())>=0&&lt(e,o.to())<=0)return r}return-1};var Oi=function(e,t){this.anchor=e,this.head=t};function Li(e,t,r){var o=e&&e.options.selectionsMayTouch,i=t[r];t.sort((function(e,t){return lt(e.from(),t.from())})),r=V(t,i);for(var n=1;n<t.length;n++){var a=t[n],l=t[n-1],s=lt(l.to(),a.from());if(o&&!a.empty()?s>0:s>=0){var d=ut(l.from(),a.from()),c=ct(l.to(),a.to()),u=l.empty()?a.from()==a.head:l.from()==l.head;n<=r&&--r,t.splice(--n,2,new Oi(u?c:d,u?d:c))}}return new Ai(t,r)}function Mi(e,t){return new Ai([new Oi(e,t||e)],0)}function Ii(e){return e.text?at(e.from.line+e.text.length-1,ee(e.text).length+(1==e.text.length?e.from.ch:0)):e.to}function Ri(e,t){if(lt(e,t.from)<0)return e;if(lt(e,t.to)<=0)return Ii(t);var r=e.line+t.text.length-(t.to.line-t.from.line)-1,o=e.ch;return e.line==t.to.line&&(o+=Ii(t).ch-t.to.ch),at(r,o)}function Fi(e,t){for(var r=[],o=0;o<e.sel.ranges.length;o++){var i=e.sel.ranges[o];r.push(new Oi(Ri(i.anchor,t),Ri(i.head,t)))}return Li(e.cm,r,e.sel.primIndex)}function Ni(e,t,r){return e.line==t.line?at(r.line,e.ch-t.ch+r.ch):at(r.line+(e.line-t.line),e.ch)}function zi(e){e.doc.mode=Ve(e.options,e.doc.modeOption),Di(e)}function Di(e){e.doc.iter((function(e){e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null)})),e.doc.modeFrontier=e.doc.highlightFrontier=e.doc.first,di(e,100),e.state.modeGen++,e.curOp&&bo(e)}function Pi(e,t){return 0==t.from.ch&&0==t.to.ch&&""==ee(t.text)&&(!e.cm||e.cm.options.wholeLineUpdateBefore)}function Hi(e,t,r,o){function i(e){return r?r[e]:null}function n(e,r,i){!function(e,t,r,o){e.text=t,e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null),null!=e.order&&(e.order=null),Ft(e),Nt(e,r);var i=o?o(e):1;i!=e.height&&tt(e,i)}(e,r,i,o),hr(e,"change",e,t)}function a(e,t){for(var r=[],n=e;n<t;++n)r.push(new Xt(d[n],i(n),o));return r}var l=t.from,s=t.to,d=t.text,c=Xe(e,l.line),u=Xe(e,s.line),p=ee(d),h=i(d.length-1),g=s.line-l.line;if(t.full)e.insert(0,a(0,d.length)),e.remove(d.length,e.size-d.length);else if(Pi(e,t)){var m=a(0,d.length-1);n(u,u.text,h),g&&e.remove(l.line,g),m.length&&e.insert(l.line,m)}else if(c==u)if(1==d.length)n(c,c.text.slice(0,l.ch)+p+c.text.slice(s.ch),h);else{var f=a(1,d.length-1);f.push(new Xt(p+c.text.slice(s.ch),h,o)),n(c,c.text.slice(0,l.ch)+d[0],i(0)),e.insert(l.line+1,f)}else if(1==d.length)n(c,c.text.slice(0,l.ch)+d[0]+u.text.slice(s.ch),i(0)),e.remove(l.line+1,g);else{n(c,c.text.slice(0,l.ch)+d[0],i(0)),n(u,p+u.text.slice(s.ch),h);var b=a(1,d.length-1);g>1&&e.remove(l.line+1,g-1),e.insert(l.line+1,b)}hr(e,"change",e,t)}function Ui(e,t,r){!function e(o,i,n){if(o.linked)for(var a=0;a<o.linked.length;++a){var l=o.linked[a];if(l.doc!=i){var s=n&&l.sharedHist;r&&!s||(t(l.doc,s),e(l.doc,o,s))}}}(e,null,!0)}function Bi(e,t){if(t.cm)throw Error("This document is already in use.");e.doc=t,t.cm=e,go(e),zi(e),Wi(e),e.options.direction=t.direction,e.options.lineWrapping||Yt(e),e.options.mode=t.modeOption,bo(e)}function Wi(e){("rtl"==e.doc.direction?F:T)(e.display.lineDiv,"CodeMirror-rtl")}function Ki(e){this.done=[],this.undone=[],this.undoDepth=e?e.undoDepth:1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=e?e.maxGeneration:1}function ji(e,t){var r={from:dt(t.from),to:Ii(t),text:$e(e,t.from,t.to)};return Gi(e,r,t.from.line,t.to.line+1),Ui(e,(function(e){return Gi(e,r,t.from.line,t.to.line+1)}),!0),r}function Vi(e){for(;e.length&&ee(e).ranges;)e.pop()}function qi(e,t,r,o){var i=e.history;i.undone.length=0;var n,a,l=+new Date;if((i.lastOp==o||i.lastOrigin==t.origin&&t.origin&&("+"==t.origin.charAt(0)&&i.lastModTime>l-(e.cm?e.cm.options.historyEventDelay:500)||"*"==t.origin.charAt(0)))&&(n=function(e,t){return t?(Vi(e.done),ee(e.done)):e.done.length&&!ee(e.done).ranges?ee(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(),ee(e.done)):void 0}(i,i.lastOp==o)))a=ee(n.changes),0==lt(t.from,t.to)&&0==lt(t.from,a.to)?a.to=Ii(t):n.changes.push(ji(e,t));else{var s=ee(i.done);for(s&&s.ranges||Zi(e.sel,i.done),n={changes:[ji(e,t)],generation:i.generation},i.done.push(n);i.done.length>i.undoDepth;)i.done.shift(),i.done[0].ranges||i.done.shift()}i.done.push(r),i.generation=++i.maxGeneration,i.lastModTime=i.lastSelTime=l,i.lastOp=i.lastSelOp=o,i.lastOrigin=i.lastSelOrigin=t.origin,a||xe(e,"historyAdded")}function Zi(e,t){var r=ee(t);r&&r.ranges&&r.equals(e)||t.push(e)}function Gi(e,t,r,o){var i=t["spans_"+e.id],n=0;e.iter(Math.max(e.first,r),Math.min(e.first+e.size,o),(function(r){r.markedSpans&&((i||(i=t["spans_"+e.id]={}))[n]=r.markedSpans),++n}))}function Ji(e){if(!e)return null;for(var t,r=0;r<e.length;++r)e[r].marker.explicitlyCleared?t||(t=e.slice(0,r)):t&&t.push(e[r]);return t?t.length?t:null:e}function Qi(e,t){var r=function(e,t){var r=t["spans_"+e.id];if(!r)return null;for(var o=[],i=0;i<t.text.length;++i)o.push(Ji(r[i]));return o}(e,t),o=It(e,t);if(!r)return o;if(!o)return r;for(var i=0;i<r.length;++i){var n=r[i],a=o[i];if(n&&a)e:for(var l=0;l<a.length;++l){for(var s=a[l],d=0;d<n.length;++d)if(n[d].marker==s.marker)continue e;n.push(s)}else a&&(r[i]=a)}return r}function Yi(e,t,r){for(var o=[],i=0;i<e.length;++i){var n=e[i];if(n.ranges)o.push(r?Ai.prototype.deepCopy.call(n):n);else{var a=n.changes,l=[];o.push({changes:l});for(var s=0;s<a.length;++s){var d=a[s],c=void 0;if(l.push({from:d.from,to:d.to,text:d.text}),t)for(var u in d)(c=u.match(/^spans_(\d+)$/))&&V(t,Number(c[1]))>-1&&(ee(l)[u]=d[u],delete d[u])}}}return o}function Xi(e,t,r,o){if(o){var i=e.anchor;if(r){var n=lt(t,i)<0;n!=lt(r,i)<0?(i=t,t=r):n!=lt(t,r)<0&&(t=r)}return new Oi(i,t)}return new Oi(r||t,t)}function $i(e,t,r,o,i){null==i&&(i=e.cm&&(e.cm.display.shift||e.extend)),nn(e,new Ai([Xi(e.sel.primary(),t,r,i)],0),o)}function en(e,t,r){for(var o=[],i=e.cm&&(e.cm.display.shift||e.extend),n=0;n<e.sel.ranges.length;n++)o[n]=Xi(e.sel.ranges[n],t[n],null,i);nn(e,Li(e.cm,o,e.sel.primIndex),r)}function tn(e,t,r,o){var i=e.sel.ranges.slice(0);i[t]=r,nn(e,Li(e.cm,i,e.sel.primIndex),o)}function rn(e,t,r,o){nn(e,Mi(t,r),o)}function on(e,t,r){var o=e.history.done,i=ee(o);i&&i.ranges?(o[o.length-1]=t,an(e,t,r)):nn(e,t,r)}function nn(e,t,r){an(e,t,r),function(e,t,r,o){var i=e.history,n=o&&o.origin;r==i.lastSelOp||n&&i.lastSelOrigin==n&&(i.lastModTime==i.lastSelTime&&i.lastOrigin==n||function(e,t,r,o){var i=t.charAt(0);return"*"==i||"+"==i&&r.ranges.length==o.ranges.length&&r.somethingSelected()==o.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500)}(e,n,ee(i.done),t))?i.done[i.done.length-1]=t:Zi(t,i.done),i.lastSelTime=+new Date,i.lastSelOrigin=n,i.lastSelOp=r,o&&!1!==o.clearRedo&&Vi(i.undone)}(e,e.sel,e.cm?e.cm.curOp.id:NaN,r)}function an(e,t,r){(_e(e,"beforeSelectionChange")||e.cm&&_e(e.cm,"beforeSelectionChange"))&&(t=function(e,t,r){var o={ranges:t.ranges,update:function(t){this.ranges=[];for(var r=0;r<t.length;r++)this.ranges[r]=new Oi(ht(e,t[r].anchor),ht(e,t[r].head))},origin:r&&r.origin};return xe(e,"beforeSelectionChange",e,o),e.cm&&xe(e.cm,"beforeSelectionChange",e.cm,o),o.ranges!=t.ranges?Li(e.cm,o.ranges,o.ranges.length-1):t}(e,t,r));var o=r&&r.bias||(lt(t.primary().head,e.sel.primary().head)<0?-1:1);ln(e,dn(e,t,o,!0)),r&&!1===r.scroll||!e.cm||"nocursor"==e.cm.getOption("readOnly")||Do(e.cm)}function ln(e,t){t.equals(e.sel)||(e.sel=t,e.cm&&(e.cm.curOp.updateInput=1,e.cm.curOp.selectionChanged=!0,ke(e.cm)),hr(e,"cursorActivity",e))}function sn(e){ln(e,dn(e,e.sel,null,!1))}function dn(e,t,r,o){for(var i,n=0;n<t.ranges.length;n++){var a=t.ranges[n],l=t.ranges.length==e.sel.ranges.length&&e.sel.ranges[n],s=un(e,a.anchor,l&&l.anchor,r,o),d=a.head==a.anchor?s:un(e,a.head,l&&l.head,r,o);(i||s!=a.anchor||d!=a.head)&&(i||(i=t.ranges.slice(0,n)),i[n]=new Oi(s,d))}return i?Li(e.cm,i,t.primIndex):t}function cn(e,t,r,o,i){var n=Xe(e,t.line);if(n.markedSpans)for(var a=0;a<n.markedSpans.length;++a){var l=n.markedSpans[a],s=l.marker,d="selectLeft"in s?!s.selectLeft:s.inclusiveLeft,c="selectRight"in s?!s.selectRight:s.inclusiveRight;if((null==l.from||(d?l.from<=t.ch:l.from<t.ch))&&(null==l.to||(c?l.to>=t.ch:l.to>t.ch))){if(i&&(xe(s,"beforeCursorEnter"),s.explicitlyCleared)){if(n.markedSpans){--a;continue}break}if(!s.atomic)continue;if(r){var u=s.find(o<0?1:-1),p=void 0;if((o<0?c:d)&&(u=pn(e,u,-o,u&&u.line==t.line?n:null)),u&&u.line==t.line&&(p=lt(u,r))&&(o<0?p<0:p>0))return cn(e,u,t,o,i)}var h=s.find(o<0?-1:1);return(o<0?d:c)&&(h=pn(e,h,o,h.line==t.line?n:null)),h?cn(e,h,t,o,i):null}}return t}function un(e,t,r,o,i){var n=o||1;return cn(e,t,r,n,i)||!i&&cn(e,t,r,n,!0)||cn(e,t,r,-n,i)||!i&&cn(e,t,r,-n,!0)||(e.cantEdit=!0,at(e.first,0))}function pn(e,t,r,o){return r<0&&0==t.ch?t.line>e.first?ht(e,at(t.line-1)):null:r>0&&t.ch==(o||Xe(e,t.line)).text.length?t.line<e.first+e.size-1?at(t.line+1,0):null:new at(t.line,t.ch+r)}function hn(e){e.setSelection(at(e.firstLine(),0),at(e.lastLine()),G)}function gn(e,t,r){var o={canceled:!1,from:t.from,to:t.to,text:t.text,origin:t.origin,cancel:function(){return o.canceled=!0}};return r&&(o.update=function(t,r,i,n){t&&(o.from=ht(e,t)),r&&(o.to=ht(e,r)),i&&(o.text=i),void 0!==n&&(o.origin=n)}),xe(e,"beforeChange",e,o),e.cm&&xe(e.cm,"beforeChange",e.cm,o),o.canceled?(e.cm&&(e.cm.curOp.updateInput=2),null):{from:o.from,to:o.to,text:o.text,origin:o.origin}}function mn(e,t,r){if(e.cm){if(!e.cm.curOp)return ai(e.cm,mn)(e,t,r);if(e.cm.state.suppressEdits)return}if(!(_e(e,"beforeChange")||e.cm&&_e(e.cm,"beforeChange"))||(t=gn(e,t,!0))){var o=Tt&&!r&&function(e,t,r){var o=null;if(e.iter(t.line,r.line+1,(function(e){if(e.markedSpans)for(var t=0;t<e.markedSpans.length;++t){var r=e.markedSpans[t].marker;!r.readOnly||o&&-1!=V(o,r)||(o||(o=[])).push(r)}})),!o)return null;for(var i=[{from:t,to:r}],n=0;n<o.length;++n)for(var a=o[n],l=a.find(0),s=0;s<i.length;++s){var d=i[s];if(!(lt(d.to,l.from)<0||lt(d.from,l.to)>0)){var c=[s,1],u=lt(d.from,l.from),p=lt(d.to,l.to);(u<0||!a.inclusiveLeft&&!u)&&c.push({from:d.from,to:l.from}),(p>0||!a.inclusiveRight&&!p)&&c.push({from:l.to,to:d.to}),i.splice.apply(i,c),s+=c.length-3}}return i}(e,t.from,t.to);if(o)for(var i=o.length-1;i>=0;--i)fn(e,{from:o[i].from,to:o[i].to,text:i?[""]:t.text,origin:t.origin});else fn(e,t)}}function fn(e,t){if(1!=t.text.length||""!=t.text[0]||0!=lt(t.from,t.to)){var r=Fi(e,t);qi(e,t,r,e.cm?e.cm.curOp.id:NaN),vn(e,t,r,It(e,t));var o=[];Ui(e,(function(e,r){r||-1!=V(o,e.history)||(_n(e.history,t),o.push(e.history)),vn(e,t,null,It(e,t))}))}}function bn(e,t,r){var o=e.cm&&e.cm.state.suppressEdits;if(!o||r){for(var i,n=e.history,a=e.sel,l="undo"==t?n.done:n.undone,s="undo"==t?n.undone:n.done,d=0;d<l.length&&(i=l[d],r?!i.ranges||i.equals(e.sel):i.ranges);d++);if(d!=l.length){for(n.lastOrigin=n.lastSelOrigin=null;;){if(!(i=l.pop()).ranges){if(o)return void l.push(i);break}if(Zi(i,s),r&&!i.equals(e.sel))return void nn(e,i,{clearRedo:!1});a=i}var c=[];Zi(a,s),s.push({changes:c,generation:n.generation}),n.generation=i.generation||++n.maxGeneration;for(var u=_e(e,"beforeChange")||e.cm&&_e(e.cm,"beforeChange"),p=function(r){var o=i.changes[r];if(o.origin=t,u&&!gn(e,o,!1))return l.length=0,{};c.push(ji(e,o));var n=r?Fi(e,o):ee(l);vn(e,o,n,Qi(e,o)),!r&&e.cm&&e.cm.scrollIntoView({from:o.from,to:Ii(o)});var a=[];Ui(e,(function(e,t){t||-1!=V(a,e.history)||(_n(e.history,o),a.push(e.history)),vn(e,o,null,Qi(e,o))}))},h=i.changes.length-1;h>=0;--h){var g=p(h);if(g)return g.v}}}}function yn(e,t){if(0!=t&&(e.first+=t,e.sel=new Ai(te(e.sel.ranges,(function(e){return new Oi(at(e.anchor.line+t,e.anchor.ch),at(e.head.line+t,e.head.ch))})),e.sel.primIndex),e.cm)){bo(e.cm,e.first,e.first-t,t);for(var r=e.cm.display,o=r.viewFrom;o<r.viewTo;o++)yo(e.cm,o,"gutter")}}function vn(e,t,r,o){if(e.cm&&!e.cm.curOp)return ai(e.cm,vn)(e,t,r,o);if(t.to.line<e.first)yn(e,t.text.length-1-(t.to.line-t.from.line));else if(!(t.from.line>e.lastLine())){if(t.from.line<e.first){var i=t.text.length-1-(e.first-t.from.line);yn(e,i),t={from:at(e.first,0),to:at(t.to.line+i,t.to.ch),text:[ee(t.text)],origin:t.origin}}var n=e.lastLine();t.to.line>n&&(t={from:t.from,to:at(n,Xe(e,n).text.length),text:[t.text[0]],origin:t.origin}),t.removed=$e(e,t.from,t.to),r||(r=Fi(e,t)),e.cm?function(e,t,r){var o=e.doc,i=e.display,n=t.from,a=t.to,l=!1,s=n.line;e.options.lineWrapping||(s=rt(jt(Xe(o,n.line))),o.iter(s,a.line+1,(function(e){if(e==i.maxLine)return l=!0,!0}))),o.sel.contains(t.from,t.to)>-1&&ke(e),Hi(o,t,r,ho(e)),e.options.lineWrapping||(o.iter(s,n.line+t.text.length,(function(e){var t=Qt(e);t>i.maxLineLength&&(i.maxLine=e,i.maxLineLength=t,i.maxLineChanged=!0,l=!1)})),l&&(e.curOp.updateMaxLine=!0)),function(e,t){if(e.modeFrontier=Math.min(e.modeFrontier,t),!(e.highlightFrontier<t-10)){for(var r=e.first,o=t-1;o>r;o--){var i=Xe(e,o).stateAfter;if(i&&(!(i instanceof mt)||o+i.lookAhead<t)){r=o+1;break}}e.highlightFrontier=Math.min(e.highlightFrontier,r)}}(o,n.line),di(e,400);var d=t.text.length-(a.line-n.line)-1;t.full?bo(e):n.line!=a.line||1!=t.text.length||Pi(e.doc,t)?bo(e,n.line,a.line+1,d):yo(e,n.line,"text");var c=_e(e,"changes"),u=_e(e,"change");if(u||c){var p={from:n,to:a,text:t.text,removed:t.removed,origin:t.origin};u&&hr(e,"change",e,p),c&&(e.curOp.changeObjs||(e.curOp.changeObjs=[])).push(p)}e.display.selForContextMenu=null}(e.cm,t,o):Hi(e,t,o),an(e,r,G),e.cantEdit&&un(e,at(e.firstLine(),0))&&(e.cantEdit=!1)}}function xn(e,t,r,o,i){var n;o||(o=r),lt(o,r)<0&&(r=(n=[o,r])[0],o=n[1]),"string"==typeof t&&(t=e.splitLines(t)),mn(e,{from:r,to:o,text:t,origin:i})}function wn(e,t,r,o){r<e.line?e.line+=o:t<e.line&&(e.line=t,e.ch=0)}function kn(e,t,r,o){for(var i=0;i<e.length;++i){var n=e[i],a=!0;if(n.ranges){n.copied||((n=e[i]=n.deepCopy()).copied=!0);for(var l=0;l<n.ranges.length;l++)wn(n.ranges[l].anchor,t,r,o),wn(n.ranges[l].head,t,r,o)}else{for(var s=0;s<n.changes.length;++s){var d=n.changes[s];if(r<d.from.line)d.from=at(d.from.line+o,d.from.ch),d.to=at(d.to.line+o,d.to.ch);else if(t<=d.to.line){a=!1;break}}a||(e.splice(0,i+1),i=0)}}}function _n(e,t){var r=t.from.line,o=t.to.line,i=t.text.length-(o-r)-1;kn(e.done,r,o,i),kn(e.undone,r,o,i)}function Cn(e,t,r,o){var i=t,n=t;return"number"==typeof t?n=Xe(e,pt(e,t)):i=rt(t),null==i?null:(o(n,i)&&e.cm&&yo(e.cm,i,r),n)}function Sn(e){this.lines=e,this.parent=null;for(var t=0,r=0;r<e.length;++r)e[r].parent=this,t+=e[r].height;this.height=t}function En(e){this.children=e;for(var t=0,r=0,o=0;o<e.length;++o){var i=e[o];t+=i.chunkSize(),r+=i.height,i.parent=this}this.size=t,this.height=r,this.parent=null}Oi.prototype.from=function(){return ut(this.anchor,this.head)},Oi.prototype.to=function(){return ct(this.anchor,this.head)},Oi.prototype.empty=function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch},Sn.prototype={chunkSize:function(){return this.lines.length},removeInner:function(e,t){for(var r=e,o=e+t;r<o;++r){var i=this.lines[r];this.height-=i.height,$t(i),hr(i,"delete")}this.lines.splice(e,t)},collapse:function(e){e.push.apply(e,this.lines)},insertInner:function(e,t,r){this.height+=r,this.lines=this.lines.slice(0,e).concat(t).concat(this.lines.slice(e));for(var o=0;o<t.length;++o)t[o].parent=this},iterN:function(e,t,r){for(var o=e+t;e<o;++e)if(r(this.lines[e]))return!0}},En.prototype={chunkSize:function(){return this.size},removeInner:function(e,t){this.size-=t;for(var r=0;r<this.children.length;++r){var o=this.children[r],i=o.chunkSize();if(e<i){var n=Math.min(t,i-e),a=o.height;if(o.removeInner(e,n),this.height-=a-o.height,i==n&&(this.children.splice(r--,1),o.parent=null),0==(t-=n))break;e=0}else e-=i}if(this.size-t<25&&(this.children.length>1||!(this.children[0]instanceof Sn))){var l=[];this.collapse(l),this.children=[new Sn(l)],this.children[0].parent=this}},collapse:function(e){for(var t=0;t<this.children.length;++t)this.children[t].collapse(e)},insertInner:function(e,t,r){this.size+=t.length,this.height+=r;for(var o=0;o<this.children.length;++o){var i=this.children[o],n=i.chunkSize();if(e<=n){if(i.insertInner(e,t,r),i.lines&&i.lines.length>50){for(var a=i.lines.length%25+25,l=a;l<i.lines.length;){var s=new Sn(i.lines.slice(l,l+=25));i.height-=s.height,this.children.splice(++o,0,s),s.parent=this}i.lines=i.lines.slice(0,a),this.maybeSpill()}break}e-=n}},maybeSpill:function(){if(!(this.children.length<=10)){var e=this;do{var t=new En(e.children.splice(e.children.length-5,5));if(e.parent){e.size-=t.size,e.height-=t.height;var r=V(e.parent.children,e);e.parent.children.splice(r+1,0,t)}else{var o=new En(e.children);o.parent=e,e.children=[o,t],e=o}t.parent=e.parent}while(e.children.length>10);e.parent.maybeSpill()}},iterN:function(e,t,r){for(var o=0;o<this.children.length;++o){var i=this.children[o],n=i.chunkSize();if(e<n){var a=Math.min(t,n-e);if(i.iterN(e,a,r))return!0;if(0==(t-=a))break;e=0}else e-=n}}};var Tn=function(e,t,r){if(r)for(var o in r)r.hasOwnProperty(o)&&(this[o]=r[o]);this.doc=e,this.node=t};function An(e,t,r){Jt(t)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&zo(e,r)}Tn.prototype.clear=function(){var e=this.doc.cm,t=this.line.widgets,r=this.line,o=rt(r);if(null!=o&&t){for(var i=0;i<t.length;++i)t[i]==this&&t.splice(i--,1);t.length||(r.widgets=null);var n=Er(this);tt(r,Math.max(0,r.height-n)),e&&(ni(e,(function(){An(e,r,-n),yo(e,o,"widget")})),hr(e,"lineWidgetCleared",e,this,o))}},Tn.prototype.changed=function(){var e=this,t=this.height,r=this.doc.cm,o=this.line;this.height=null;var i=Er(this)-t;i&&(Zt(this.doc,o)||tt(o,o.height+i),r&&ni(r,(function(){r.curOp.forceUpdate=!0,An(r,o,i),hr(r,"lineWidgetChanged",r,e,rt(o))})))},Ce(Tn);var On=0,Ln=function(e,t){this.lines=[],this.type=t,this.doc=e,this.id=++On};function Mn(e,t,r,o,i){if(o&&o.shared)return function(e,t,r,o,i){(o=W(o)).shared=!1;var n=[Mn(e,t,r,o,i)],a=n[0],l=o.widgetNode;return Ui(e,(function(e){l&&(o.widgetNode=l.cloneNode(!0)),n.push(Mn(e,ht(e,t),ht(e,r),o,i));for(var s=0;s<e.linked.length;++s)if(e.linked[s].isParent)return;a=ee(n)})),new In(n,a)}(e,t,r,o,i);if(e.cm&&!e.cm.curOp)return ai(e.cm,Mn)(e,t,r,o,i);var n=new Ln(e,i),a=lt(t,r);if(o&&W(o,n,!1),a>0||0==a&&!1!==n.clearWhenEmpty)return n;if(n.replacedWith&&(n.collapsed=!0,n.widgetNode=M("span",[n.replacedWith],"CodeMirror-widget"),o.handleMouseEvents||n.widgetNode.setAttribute("cm-ignore-events","true"),o.insertLeft&&(n.widgetNode.insertLeft=!0)),n.collapsed){if(Kt(e,t.line,t,r,n)||t.line!=r.line&&Kt(e,r.line,t,r,n))throw Error("Inserting collapsed marker partially overlapping an existing one");At=!0}n.addToHistory&&qi(e,{from:t,to:r,origin:"markText"},e.sel,NaN);var l,s=t.line,d=e.cm;if(e.iter(s,r.line+1,(function(o){d&&n.collapsed&&!d.options.lineWrapping&&jt(o)==d.display.maxLine&&(l=!0),n.collapsed&&s!=t.line&&tt(o,0),function(e,t,r){var o=r&&window.WeakSet&&(r.markedSpans||(r.markedSpans=new WeakSet));o&&e.markedSpans&&o.has(e.markedSpans)?e.markedSpans.push(t):(e.markedSpans=e.markedSpans?e.markedSpans.concat([t]):[t],o&&o.add(e.markedSpans)),t.marker.attachLine(e)}(o,new Ot(n,s==t.line?t.ch:null,s==r.line?r.ch:null),e.cm&&e.cm.curOp),++s})),n.collapsed&&e.iter(t.line,r.line+1,(function(t){Zt(e,t)&&tt(t,0)})),n.clearOnEnter&&be(n,"beforeCursorEnter",(function(){return n.clear()})),n.readOnly&&(Tt=!0,(e.history.done.length||e.history.undone.length)&&e.clearHistory()),n.collapsed&&(n.id=++On,n.atomic=!0),d){if(l&&(d.curOp.updateMaxLine=!0),n.collapsed)bo(d,t.line,r.line+1);else if(n.className||n.startStyle||n.endStyle||n.css||n.attributes||n.title)for(var c=t.line;c<=r.line;c++)yo(d,c,"text");n.atomic&&sn(d.doc),hr(d,"markerAdded",d,n)}return n}Ln.prototype.clear=function(){if(!this.explicitlyCleared){var e=this.doc.cm,t=e&&!e.curOp;if(t&&Xo(e),_e(this,"clear")){var r=this.find();r&&hr(this,"clear",r.from,r.to)}for(var o=null,i=null,n=0;n<this.lines.length;++n){var a=this.lines[n],l=Lt(a.markedSpans,this);e&&!this.collapsed?yo(e,rt(a),"text"):e&&(null!=l.to&&(i=rt(a)),null!=l.from&&(o=rt(a))),a.markedSpans=Mt(a.markedSpans,l),null==l.from&&this.collapsed&&!Zt(this.doc,a)&&e&&tt(a,so(e.display))}if(e&&this.collapsed&&!e.options.lineWrapping)for(var s=0;s<this.lines.length;++s){var d=jt(this.lines[s]),c=Qt(d);c>e.display.maxLineLength&&(e.display.maxLine=d,e.display.maxLineLength=c,e.display.maxLineChanged=!0)}null!=o&&e&&this.collapsed&&bo(e,o,i+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,e&&sn(e.doc)),e&&hr(e,"markerCleared",e,this,o,i),t&&$o(e),this.parent&&this.parent.clear()}},Ln.prototype.find=function(e,t){var r,o;null==e&&"bookmark"==this.type&&(e=1);for(var i=0;i<this.lines.length;++i){var n=this.lines[i],a=Lt(n.markedSpans,this);if(null!=a.from&&(r=at(t?n:rt(n),a.from),-1==e))return r;if(null!=a.to&&(o=at(t?n:rt(n),a.to),1==e))return o}return r&&{from:r,to:o}},Ln.prototype.changed=function(){var e=this,t=this.find(-1,!0),r=this,o=this.doc.cm;t&&o&&ni(o,(function(){var i=t.line,n=rt(t.line),a=zr(o,n);if(a&&(Kr(a),o.curOp.selectionChanged=o.curOp.forceUpdate=!0),o.curOp.updateMaxLine=!0,!Zt(r.doc,i)&&null!=r.height){var l=r.height;r.height=null;var s=Er(r)-l;s&&tt(i,i.height+s)}hr(o,"markerChanged",o,e)}))},Ln.prototype.attachLine=function(e){if(!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;t.maybeHiddenMarkers&&-1!=V(t.maybeHiddenMarkers,this)||(t.maybeUnhiddenMarkers||(t.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(e)},Ln.prototype.detachLine=function(e){if(this.lines.splice(V(this.lines,e),1),!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;(t.maybeHiddenMarkers||(t.maybeHiddenMarkers=[])).push(this)}},Ce(Ln);var In=function(e,t){this.markers=e,this.primary=t;for(var r=0;r<e.length;++r)e[r].parent=this};function Rn(e){return e.findMarks(at(e.first,0),e.clipPos(at(e.lastLine())),(function(e){return e.parent}))}function Fn(e){for(var t=function(t){var r=e[t],o=[r.primary.doc];Ui(r.primary.doc,(function(e){return o.push(e)}));for(var i=0;i<r.markers.length;i++){var n=r.markers[i];-1==V(o,n.doc)&&(n.parent=null,r.markers.splice(i--,1))}},r=0;r<e.length;r++)t(r)}In.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=!0;for(var e=0;e<this.markers.length;++e)this.markers[e].clear();hr(this,"clear")}},In.prototype.find=function(e,t){return this.primary.find(e,t)},Ce(In);var Nn=0,zn=function(e,t,r,o,i){if(!(this instanceof zn))return new zn(e,t,r,o,i);null==r&&(r=0),En.call(this,[new Sn([new Xt("",null)])]),this.first=r,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.modeFrontier=this.highlightFrontier=r;var n=at(r,0);this.sel=Mi(n),this.history=new Ki(null),this.id=++Nn,this.modeOption=t,this.lineSep=o,this.direction="rtl"==i?"rtl":"ltr",this.extend=!1,"string"==typeof e&&(e=this.splitLines(e)),Hi(this,{from:n,to:n,text:e}),nn(this,Mi(n),G)};zn.prototype=oe(En.prototype,{constructor:zn,iter:function(e,t,r){r?this.iterN(e-this.first,t-e,r):this.iterN(this.first,this.first+this.size,e)},insert:function(e,t){for(var r=0,o=0;o<t.length;++o)r+=t[o].height;this.insertInner(e-this.first,t,r)},remove:function(e,t){this.removeInner(e-this.first,t)},getValue:function(e){var t=et(this,this.first,this.first+this.size);return!1===e?t:t.join(e||this.lineSeparator())},setValue:si((function(e){var t=at(this.first,0),r=this.first+this.size-1;mn(this,{from:t,to:at(r,Xe(this,r).text.length),text:this.splitLines(e),origin:"setValue",full:!0},!0),this.cm&&Po(this.cm,0,0),nn(this,Mi(t),G)})),replaceRange:function(e,t,r,o){xn(this,e,t=ht(this,t),r=r?ht(this,r):t,o)},getRange:function(e,t,r){var o=$e(this,ht(this,e),ht(this,t));return!1===r?o:""===r?o.join(""):o.join(r||this.lineSeparator())},getLine:function(e){var t=this.getLineHandle(e);return t&&t.text},getLineHandle:function(e){if(it(this,e))return Xe(this,e)},getLineNumber:function(e){return rt(e)},getLineHandleVisualStart:function(e){return"number"==typeof e&&(e=Xe(this,e)),jt(e)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(e){return ht(this,e)},getCursor:function(e){var t=this.sel.primary();return null==e||"head"==e?t.head:"anchor"==e?t.anchor:"end"==e||"to"==e||!1===e?t.to():t.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:si((function(e,t,r){rn(this,ht(this,"number"==typeof e?at(e,t||0):e),null,r)})),setSelection:si((function(e,t,r){rn(this,ht(this,e),ht(this,t||e),r)})),extendSelection:si((function(e,t,r){$i(this,ht(this,e),t&&ht(this,t),r)})),extendSelections:si((function(e,t){en(this,gt(this,e),t)})),extendSelectionsBy:si((function(e,t){en(this,gt(this,te(this.sel.ranges,e)),t)})),setSelections:si((function(e,t,r){if(e.length){for(var o=[],i=0;i<e.length;i++)o[i]=new Oi(ht(this,e[i].anchor),ht(this,e[i].head||e[i].anchor));null==t&&(t=Math.min(e.length-1,this.sel.primIndex)),nn(this,Li(this.cm,o,t),r)}})),addSelection:si((function(e,t,r){var o=this.sel.ranges.slice(0);o.push(new Oi(ht(this,e),ht(this,t||e))),nn(this,Li(this.cm,o,o.length-1),r)})),getSelection:function(e){for(var t,r=this.sel.ranges,o=0;o<r.length;o++){var i=$e(this,r[o].from(),r[o].to());t=t?t.concat(i):i}return!1===e?t:t.join(e||this.lineSeparator())},getSelections:function(e){for(var t=[],r=this.sel.ranges,o=0;o<r.length;o++){var i=$e(this,r[o].from(),r[o].to());!1!==e&&(i=i.join(e||this.lineSeparator())),t[o]=i}return t},replaceSelection:function(e,t,r){for(var o=[],i=0;i<this.sel.ranges.length;i++)o[i]=e;this.replaceSelections(o,t,r||"+input")},replaceSelections:si((function(e,t,r){for(var o=[],i=this.sel,n=0;n<i.ranges.length;n++){var a=i.ranges[n];o[n]={from:a.from(),to:a.to(),text:this.splitLines(e[n]),origin:r}}for(var l=t&&"end"!=t&&function(e,t,r){for(var o=[],i=at(e.first,0),n=i,a=0;a<t.length;a++){var l=t[a],s=Ni(l.from,i,n),d=Ni(Ii(l),i,n);if(i=l.to,n=d,"around"==r){var c=e.sel.ranges[a],u=lt(c.head,c.anchor)<0;o[a]=new Oi(u?d:s,u?s:d)}else o[a]=new Oi(s,s)}return new Ai(o,e.sel.primIndex)}(this,o,t),s=o.length-1;s>=0;s--)mn(this,o[s]);l?on(this,l):this.cm&&Do(this.cm)})),undo:si((function(){bn(this,"undo")})),redo:si((function(){bn(this,"redo")})),undoSelection:si((function(){bn(this,"undo",!0)})),redoSelection:si((function(){bn(this,"redo",!0)})),setExtending:function(e){this.extend=e},getExtending:function(){return this.extend},historySize:function(){for(var e=this.history,t=0,r=0,o=0;o<e.done.length;o++)e.done[o].ranges||++t;for(var i=0;i<e.undone.length;i++)e.undone[i].ranges||++r;return{undo:t,redo:r}},clearHistory:function(){var e=this;this.history=new Ki(this.history),Ui(this,(function(t){return t.history=e.history}),!0)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(e){return e&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(e){return this.history.generation==(e||this.cleanGeneration)},getHistory:function(){return{done:Yi(this.history.done),undone:Yi(this.history.undone)}},setHistory:function(e){var t=this.history=new Ki(this.history);t.done=Yi(e.done.slice(0),null,!0),t.undone=Yi(e.undone.slice(0),null,!0)},setGutterMarker:si((function(e,t,r){return Cn(this,e,"gutter",(function(e){var o=e.gutterMarkers||(e.gutterMarkers={});return o[t]=r,!r&&le(o)&&(e.gutterMarkers=null),!0}))})),clearGutter:si((function(e){var t=this;this.iter((function(r){r.gutterMarkers&&r.gutterMarkers[e]&&Cn(t,r,"gutter",(function(){return r.gutterMarkers[e]=null,le(r.gutterMarkers)&&(r.gutterMarkers=null),!0}))}))})),lineInfo:function(e){var t;if("number"==typeof e){if(!it(this,e))return null;if(t=e,!(e=Xe(this,e)))return null}else if(null==(t=rt(e)))return null;return{line:t,handle:e,text:e.text,gutterMarkers:e.gutterMarkers,textClass:e.textClass,bgClass:e.bgClass,wrapClass:e.wrapClass,widgets:e.widgets}},addLineClass:si((function(e,t,r){return Cn(this,e,"gutter"==t?"gutter":"class",(function(e){var o="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass";if(e[o]){if(S(r).test(e[o]))return!1;e[o]+=" "+r}else e[o]=r;return!0}))})),removeLineClass:si((function(e,t,r){return Cn(this,e,"gutter"==t?"gutter":"class",(function(e){var o="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass",i=e[o];if(!i)return!1;if(null==r)e[o]=null;else{var n=i.match(S(r));if(!n)return!1;var a=n.index+n[0].length;e[o]=i.slice(0,n.index)+(n.index&&a!=i.length?" ":"")+i.slice(a)||null}return!0}))})),addLineWidget:si((function(e,t,r){return function(e,t,r,o){var i=new Tn(e,r,o),n=e.cm;return n&&i.noHScroll&&(n.display.alignWidgets=!0),Cn(e,t,"widget",(function(t){var r=t.widgets||(t.widgets=[]);if(null==i.insertAt?r.push(i):r.splice(Math.min(r.length,Math.max(0,i.insertAt)),0,i),i.line=t,n&&!Zt(e,t)){var o=Jt(t)<e.scrollTop;tt(t,t.height+Er(i)),o&&zo(n,i.height),n.curOp.forceUpdate=!0}return!0})),n&&hr(n,"lineWidgetAdded",n,i,"number"==typeof t?t:rt(t)),i}(this,e,t,r)})),removeLineWidget:function(e){e.clear()},markText:function(e,t,r){return Mn(this,ht(this,e),ht(this,t),r,r&&r.type||"range")},setBookmark:function(e,t){var r={replacedWith:t&&(null==t.nodeType?t.widget:t),insertLeft:t&&t.insertLeft,clearWhenEmpty:!1,shared:t&&t.shared,handleMouseEvents:t&&t.handleMouseEvents};return Mn(this,e=ht(this,e),e,r,"bookmark")},findMarksAt:function(e){var t=[],r=Xe(this,(e=ht(this,e)).line).markedSpans;if(r)for(var o=0;o<r.length;++o){var i=r[o];(null==i.from||i.from<=e.ch)&&(null==i.to||i.to>=e.ch)&&t.push(i.marker.parent||i.marker)}return t},findMarks:function(e,t,r){e=ht(this,e),t=ht(this,t);var o=[],i=e.line;return this.iter(e.line,t.line+1,(function(n){var a=n.markedSpans;if(a)for(var l=0;l<a.length;l++){var s=a[l];null!=s.to&&i==e.line&&e.ch>=s.to||null==s.from&&i!=e.line||null!=s.from&&i==t.line&&s.from>=t.ch||r&&!r(s.marker)||o.push(s.marker.parent||s.marker)}++i})),o},getAllMarks:function(){var e=[];return this.iter((function(t){var r=t.markedSpans;if(r)for(var o=0;o<r.length;++o)null!=r[o].from&&e.push(r[o].marker)})),e},posFromIndex:function(e){var t,r=this.first,o=this.lineSeparator().length;return this.iter((function(i){var n=i.text.length+o;if(n>e)return t=e,!0;e-=n,++r})),ht(this,at(r,t))},indexFromPos:function(e){var t=(e=ht(this,e)).ch;if(e.line<this.first||e.ch<0)return 0;var r=this.lineSeparator().length;return this.iter(this.first,e.line,(function(e){t+=e.text.length+r})),t},copy:function(e){var t=new zn(et(this,this.first,this.first+this.size),this.modeOption,this.first,this.lineSep,this.direction);return t.scrollTop=this.scrollTop,t.scrollLeft=this.scrollLeft,t.sel=this.sel,t.extend=!1,e&&(t.history.undoDepth=this.history.undoDepth,t.setHistory(this.getHistory())),t},linkedDoc:function(e){e||(e={});var t=this.first,r=this.first+this.size;null!=e.from&&e.from>t&&(t=e.from),null!=e.to&&e.to<r&&(r=e.to);var o=new zn(et(this,t,r),e.mode||this.modeOption,t,this.lineSep,this.direction);return e.sharedHist&&(o.history=this.history),(this.linked||(this.linked=[])).push({doc:o,sharedHist:e.sharedHist}),o.linked=[{doc:this,isParent:!0,sharedHist:e.sharedHist}],function(e,t){for(var r=0;r<t.length;r++){var o=t[r],i=o.find(),n=e.clipPos(i.from),a=e.clipPos(i.to);if(lt(n,a)){var l=Mn(e,n,a,o.primary,o.primary.type);o.markers.push(l),l.parent=o}}}(o,Rn(this)),o},unlinkDoc:function(e){if(e instanceof Ma&&(e=e.doc),this.linked)for(var t=0;t<this.linked.length;++t)if(this.linked[t].doc==e){this.linked.splice(t,1),e.unlinkDoc(this),Fn(Rn(this));break}if(e.history==this.history){var r=[e.id];Ui(e,(function(e){return r.push(e.id)}),!0),e.history=new Ki(null),e.history.done=Yi(this.history.done,r),e.history.undone=Yi(this.history.undone,r)}},iterLinkedDocs:function(e){Ui(this,e)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(e){return this.lineSep?e.split(this.lineSep):De(e)},lineSeparator:function(){return this.lineSep||"\n"},setDirection:si((function(e){var t;"rtl"!=e&&(e="ltr"),e!=this.direction&&(this.direction=e,this.iter((function(e){return e.order=null})),this.cm&&ni(t=this.cm,(function(){Wi(t),bo(t)})))}))}),zn.prototype.eachLine=zn.prototype.iter;var Dn=0;function Pn(e){var t=this;if(Hn(t),!we(t,e)&&!Tr(t.display,e)){Se(e),a&&(Dn=+new Date);var r=mo(t,e,!0),o=e.dataTransfer.files;if(r&&!t.isReadOnly())if(o&&o.length&&window.FileReader&&window.File)for(var i=o.length,n=Array(i),l=0,s=function(){++l==i&&ai(t,(function(){var e={from:r=ht(t.doc,r),to:r,text:t.doc.splitLines(n.filter((function(e){return null!=e})).join(t.doc.lineSeparator())),origin:"paste"};mn(t.doc,e),on(t.doc,Mi(ht(t.doc,r),ht(t.doc,Ii(e))))}))()},d=function(e,r){if(t.options.allowDropFileTypes&&-1==V(t.options.allowDropFileTypes,e.type))s();else{var o=new FileReader;o.onerror=function(){return s()},o.onload=function(){var e=o.result;/[\x00-\x08\x0e-\x1f]{2}/.test(e)||(n[r]=e),s()},o.readAsText(e)}},c=0;c<o.length;c++)d(o[c],c);else{if(t.state.draggingText&&t.doc.sel.contains(r)>-1)return t.state.draggingText(e),void setTimeout((function(){return t.display.input.focus()}),20);try{var u=e.dataTransfer.getData("Text");if(u){var p;if(t.state.draggingText&&!t.state.draggingText.copy&&(p=t.listSelections()),an(t.doc,Mi(r,r)),p)for(var h=0;h<p.length;++h)xn(t.doc,"",p[h].anchor,p[h].head,"drag");t.replaceSelection(u,"around","paste"),t.display.input.focus()}}catch(e){}}}}function Hn(e){e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor),e.display.dragCursor=null)}function Un(e){if(document.getElementsByClassName){for(var t=document.getElementsByClassName("CodeMirror"),r=[],o=0;o<t.length;o++){var i=t[o].CodeMirror;i&&r.push(i)}r.length&&r[0].operation((function(){for(var t=0;t<r.length;t++)e(r[t])}))}}var Bn=!1;function Wn(e){var t=e.display;t.cachedCharWidth=t.cachedTextHeight=t.cachedPaddingH=null,t.scrollbarsClipped=!1,e.setSize()}for(var Kn={3:"Pause",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"=",109:"-",110:".",111:"/",145:"ScrollLock",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",224:"Mod",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"},jn=0;jn<10;jn++)Kn[jn+48]=Kn[jn+96]=jn+"";for(var Vn=65;Vn<=90;Vn++)Kn[Vn]=String.fromCharCode(Vn);for(var qn=1;qn<=12;qn++)Kn[qn+111]=Kn[qn+63235]="F"+qn;var Zn={};function Gn(e){var t,r,o,i,n=e.split(/-(?!$)/);e=n[n.length-1];for(var a=0;a<n.length-1;a++){var l=n[a];if(/^(cmd|meta|m)$/i.test(l))i=!0;else if(/^a(lt)?$/i.test(l))t=!0;else if(/^(c|ctrl|control)$/i.test(l))r=!0;else{if(!/^s(hift)?$/i.test(l))throw Error("Unrecognized modifier name: "+l);o=!0}}return t&&(e="Alt-"+e),r&&(e="Ctrl-"+e),i&&(e="Cmd-"+e),o&&(e="Shift-"+e),e}function Jn(e){var t={};for(var r in e)if(e.hasOwnProperty(r)){var o=e[r];if(/^(name|fallthrough|(de|at)tach)$/.test(r))continue;if("..."==o){delete e[r];continue}for(var i=te(r.split(" "),Gn),n=0;n<i.length;n++){var a=void 0,l=void 0;n==i.length-1?(l=i.join(" "),a=o):(l=i.slice(0,n+1).join(" "),a="...");var s=t[l];if(s){if(s!=a)throw Error("Inconsistent bindings for "+l)}else t[l]=a}delete e[r]}for(var d in t)e[d]=t[d];return e}function Qn(e,t,r,o){var i=(t=ea(t)).call?t.call(e,o):t[e];if(!1===i)return"nothing";if("..."===i)return"multi";if(null!=i&&r(i))return"handled";if(t.fallthrough){if("[object Array]"!=Object.prototype.toString.call(t.fallthrough))return Qn(e,t.fallthrough,r,o);for(var n=0;n<t.fallthrough.length;n++){var a=Qn(e,t.fallthrough[n],r,o);if(a)return a}}}function Yn(e){var t="string"==typeof e?e:Kn[e.keyCode];return"Ctrl"==t||"Alt"==t||"Shift"==t||"Mod"==t}function Xn(e,t,r){var o=e;return t.altKey&&"Alt"!=o&&(e="Alt-"+e),(_?t.metaKey:t.ctrlKey)&&"Ctrl"!=o&&(e="Ctrl-"+e),(_?t.ctrlKey:t.metaKey)&&"Mod"!=o&&(e="Cmd-"+e),!r&&t.shiftKey&&"Shift"!=o&&(e="Shift-"+e),e}function $n(e,t){if(p&&34==e.keyCode&&e.char)return!1;var r=Kn[e.keyCode];return null!=r&&!e.altGraphKey&&(3==e.keyCode&&e.code&&(r=e.code),Xn(r,e,t))}function ea(e){return"string"==typeof e?Zn[e]:e}function ta(e,t){for(var r=e.doc.sel.ranges,o=[],i=0;i<r.length;i++){for(var n=t(r[i]);o.length&&lt(n.from,ee(o).to)<=0;){var a=o.pop();if(lt(a.from,n.from)<0){n.from=a.from;break}}o.push(n)}ni(e,(function(){for(var t=o.length-1;t>=0;t--)xn(e.doc,"",o[t].from,o[t].to,"+delete");Do(e)}))}function ra(e,t,r){var o=ce(e.text,t+r,r);return o<0||o>e.text.length?null:o}function oa(e,t,r){var o=ra(e,t.ch,r);return null==o?null:new at(t.line,o,r<0?"after":"before")}function ia(e,t,r,o,i){if(e){"rtl"==t.doc.direction&&(i=-i);var n=me(r,t.doc.direction);if(n){var a,l=i<0?ee(n):n[0],s=i<0==(1==l.level)?"after":"before";if(l.level>0||"rtl"==t.doc.direction){var d=Dr(t,r);a=i<0?r.text.length-1:0;var c=Pr(t,d,a).top;a=ue((function(e){return Pr(t,d,e).top==c}),i<0==(1==l.level)?l.from:l.to-1,a),"before"==s&&(a=ra(r,a,1))}else a=i<0?l.to:l.from;return new at(o,a,s)}}return new at(o,i<0?r.text.length:0,i<0?"before":"after")}Zn.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},Zn.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},Zn.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars","Ctrl-O":"openLine"},Zn.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},Zn.default=v?Zn.macDefault:Zn.pcDefault;var na={selectAll:hn,singleSelection:function(e){return e.setSelection(e.getCursor("anchor"),e.getCursor("head"),G)},killLine:function(e){return ta(e,(function(t){if(t.empty()){var r=Xe(e.doc,t.head.line).text.length;return t.head.ch==r&&t.head.line<e.lastLine()?{from:t.head,to:at(t.head.line+1,0)}:{from:t.head,to:at(t.head.line,r)}}return{from:t.from(),to:t.to()}}))},deleteLine:function(e){return ta(e,(function(t){return{from:at(t.from().line,0),to:ht(e.doc,at(t.to().line+1,0))}}))},delLineLeft:function(e){return ta(e,(function(e){return{from:at(e.from().line,0),to:e.from()}}))},delWrappedLineLeft:function(e){return ta(e,(function(t){var r=e.charCoords(t.head,"div").top+5;return{from:e.coordsChar({left:0,top:r},"div"),to:t.from()}}))},delWrappedLineRight:function(e){return ta(e,(function(t){var r=e.charCoords(t.head,"div").top+5,o=e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div");return{from:t.from(),to:o}}))},undo:function(e){return e.undo()},redo:function(e){return e.redo()},undoSelection:function(e){return e.undoSelection()},redoSelection:function(e){return e.redoSelection()},goDocStart:function(e){return e.extendSelection(at(e.firstLine(),0))},goDocEnd:function(e){return e.extendSelection(at(e.lastLine()))},goLineStart:function(e){return e.extendSelectionsBy((function(t){return aa(e,t.head.line)}),{origin:"+move",bias:1})},goLineStartSmart:function(e){return e.extendSelectionsBy((function(t){return la(e,t.head)}),{origin:"+move",bias:1})},goLineEnd:function(e){return e.extendSelectionsBy((function(t){return function(e,t){var r=Xe(e.doc,t),o=function(e){for(var t;t=Bt(e);)e=t.find(1,!0).line;return e}(r);return o!=r&&(t=rt(o)),ia(!0,e,r,t,-1)}(e,t.head.line)}),{origin:"+move",bias:-1})},goLineRight:function(e){return e.extendSelectionsBy((function(t){var r=e.cursorCoords(t.head,"div").top+5;return e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div")}),Q)},goLineLeft:function(e){return e.extendSelectionsBy((function(t){var r=e.cursorCoords(t.head,"div").top+5;return e.coordsChar({left:0,top:r},"div")}),Q)},goLineLeftSmart:function(e){return e.extendSelectionsBy((function(t){var r=e.cursorCoords(t.head,"div").top+5,o=e.coordsChar({left:0,top:r},"div");return o.ch<e.getLine(o.line).search(/\S/)?la(e,t.head):o}),Q)},goLineUp:function(e){return e.moveV(-1,"line")},goLineDown:function(e){return e.moveV(1,"line")},goPageUp:function(e){return e.moveV(-1,"page")},goPageDown:function(e){return e.moveV(1,"page")},goCharLeft:function(e){return e.moveH(-1,"char")},goCharRight:function(e){return e.moveH(1,"char")},goColumnLeft:function(e){return e.moveH(-1,"column")},goColumnRight:function(e){return e.moveH(1,"column")},goWordLeft:function(e){return e.moveH(-1,"word")},goGroupRight:function(e){return e.moveH(1,"group")},goGroupLeft:function(e){return e.moveH(-1,"group")},goWordRight:function(e){return e.moveH(1,"word")},delCharBefore:function(e){return e.deleteH(-1,"codepoint")},delCharAfter:function(e){return e.deleteH(1,"char")},delWordBefore:function(e){return e.deleteH(-1,"word")},delWordAfter:function(e){return e.deleteH(1,"word")},delGroupBefore:function(e){return e.deleteH(-1,"group")},delGroupAfter:function(e){return e.deleteH(1,"group")},indentAuto:function(e){return e.indentSelection("smart")},indentMore:function(e){return e.indentSelection("add")},indentLess:function(e){return e.indentSelection("subtract")},insertTab:function(e){return e.replaceSelection("\t")},insertSoftTab:function(e){for(var t=[],r=e.listSelections(),o=e.options.tabSize,i=0;i<r.length;i++){var n=r[i].from(),a=K(e.getLine(n.line),n.ch,o);t.push($(o-a%o))}e.replaceSelections(t)},defaultTab:function(e){e.somethingSelected()?e.indentSelection("add"):e.execCommand("insertTab")},transposeChars:function(e){return ni(e,(function(){for(var t=e.listSelections(),r=[],o=0;o<t.length;o++)if(t[o].empty()){var i=t[o].head,n=Xe(e.doc,i.line).text;if(n)if(i.ch==n.length&&(i=new at(i.line,i.ch-1)),i.ch>0)i=new at(i.line,i.ch+1),e.replaceRange(n.charAt(i.ch-1)+n.charAt(i.ch-2),at(i.line,i.ch-2),i,"+transpose");else if(i.line>e.doc.first){var a=Xe(e.doc,i.line-1).text;a&&(i=new at(i.line,1),e.replaceRange(n.charAt(0)+e.doc.lineSeparator()+a.charAt(a.length-1),at(i.line-1,a.length-1),i,"+transpose"))}r.push(new Oi(i,i))}e.setSelections(r)}))},newlineAndIndent:function(e){return ni(e,(function(){for(var t=e.listSelections(),r=t.length-1;r>=0;r--)e.replaceRange(e.doc.lineSeparator(),t[r].anchor,t[r].head,"+input");t=e.listSelections();for(var o=0;o<t.length;o++)e.indentLine(t[o].from().line,null,!0);Do(e)}))},openLine:function(e){return e.replaceSelection("\n","start")},toggleOverwrite:function(e){return e.toggleOverwrite()}};function aa(e,t){var r=Xe(e.doc,t),o=jt(r);return o!=r&&(t=rt(o)),ia(!0,e,o,t,1)}function la(e,t){var r=aa(e,t.line),o=Xe(e.doc,r.line),i=me(o,e.doc.direction);if(!i||0==i[0].level){var n=Math.max(r.ch,o.text.search(/\S/)),a=t.line==r.line&&t.ch<=n&&t.ch;return at(r.line,a?0:n,r.sticky)}return r}function sa(e,t,r){if("string"==typeof t&&!(t=na[t]))return!1;e.display.input.ensurePolled();var o=e.display.shift,i=!1;try{e.isReadOnly()&&(e.state.suppressEdits=!0),r&&(e.display.shift=!1),i=t(e)!=Z}finally{e.display.shift=o,e.state.suppressEdits=!1}return i}var da=new j;function ca(e,t,r,o){var i=e.state.keySeq;if(i){if(Yn(t))return"handled";if(/\'$/.test(t)?e.state.keySeq=null:da.set(50,(function(){e.state.keySeq==i&&(e.state.keySeq=null,e.display.input.reset())})),ua(e,i+" "+t,r,o))return!0}return ua(e,t,r,o)}function ua(e,t,r,o){var i=function(e,t,r){for(var o=0;o<e.state.keyMaps.length;o++){var i=Qn(t,e.state.keyMaps[o],r,e);if(i)return i}return e.options.extraKeys&&Qn(t,e.options.extraKeys,r,e)||Qn(t,e.options.keyMap,r,e)}(e,t,o);return"multi"==i&&(e.state.keySeq=t),"handled"==i&&hr(e,"keyHandled",e,t,r),"handled"!=i&&"multi"!=i||(Se(r),To(e)),!!i}function pa(e,t){var r=$n(t,!0);return!!r&&(t.shiftKey&&!e.state.keySeq?ca(e,"Shift-"+r,t,(function(t){return sa(e,t,!0)}))||ca(e,r,t,(function(t){if("string"==typeof t?/^go[A-Z]/.test(t):t.motion)return sa(e,t)})):ca(e,r,t,(function(t){return sa(e,t)})))}var ha=null;function ga(e){var t=this;if(!(e.target&&e.target!=t.display.input.getField()||(t.curOp.focus=R(P(t)),we(t,e)))){a&&l<11&&27==e.keyCode&&(e.returnValue=!1);var o=e.keyCode;t.display.shift=16==o||e.shiftKey;var i=pa(t,e);p&&(ha=i?o:null,i||88!=o||He||!(v?e.metaKey:e.ctrlKey)||t.replaceSelection("",null,"cut")),r&&!v&&!i&&46==o&&e.shiftKey&&!e.ctrlKey&&document.execCommand&&document.execCommand("cut"),18!=o||/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className)||function(e){var t=e.display.lineDiv;function r(e){18!=e.keyCode&&e.altKey||(T(t,"CodeMirror-crosshair"),ve(document,"keyup",r),ve(document,"mouseover",r))}F(t,"CodeMirror-crosshair"),be(document,"keyup",r),be(document,"mouseover",r)}(t)}}function ma(e){16==e.keyCode&&(this.doc.sel.shift=!1),we(this,e)}function fa(e){var t=this;if(!(e.target&&e.target!=t.display.input.getField()||Tr(t.display,e)||we(t,e)||e.ctrlKey&&!e.altKey||v&&e.metaKey)){var r=e.keyCode,o=e.charCode;if(p&&r==ha)return ha=null,void Se(e);if(!p||e.which&&!(e.which<10)||!pa(t,e)){var i=String.fromCharCode(null==o?r:o);"\b"!=i&&(function(e,t,r){return ca(e,"'"+r+"'",t,(function(t){return sa(e,t,!0)}))}(t,e,i)||t.display.input.onKeyPress(e))}}}var ba,ya,va=function(e,t,r){this.time=e,this.pos=t,this.button=r};function xa(e){var t=this,r=t.display;if(!(we(t,e)||r.activeTouch&&r.input.supportsTouch()))if(r.input.ensurePolled(),r.shift=e.shiftKey,Tr(r,e))s||(r.scroller.draggable=!1,setTimeout((function(){return r.scroller.draggable=!0}),100));else if(!_a(t,e)){var o=mo(t,e),i=Le(e),n=o?function(e,t){var r=+new Date;return ya&&ya.compare(r,e,t)?(ba=ya=null,"triple"):ba&&ba.compare(r,e,t)?(ya=new va(r,e,t),ba=null,"double"):(ba=new va(r,e,t),ya=null,"single")}(o,i):"single";U(t).focus(),1==i&&t.state.selectingText&&t.state.selectingText(e),o&&function(e,t,r,o,i){var n="Click";return"double"==o?n="Double"+n:"triple"==o&&(n="Triple"+n),ca(e,Xn(n=(1==t?"Left":2==t?"Middle":"Right")+n,i),i,(function(t){if("string"==typeof t&&(t=na[t]),!t)return!1;var o=!1;try{e.isReadOnly()&&(e.state.suppressEdits=!0),o=t(e,r)!=Z}finally{e.state.suppressEdits=!1}return o}))}(t,i,o,n,e)||(1==i?o?function(e,t,r,o){a?setTimeout(B(Ao,e),0):e.curOp.focus=R(P(e));var i,n=function(e,t,r){var o=e.getOption("configureMouse"),i=o?o(e,t,r):{};if(null==i.unit){var n=x?r.shiftKey&&r.metaKey:r.altKey;i.unit=n?"rectangle":"single"==t?"char":"double"==t?"word":"line"}return(null==i.extend||e.doc.extend)&&(i.extend=e.doc.extend||r.shiftKey),null==i.addNew&&(i.addNew=v?r.metaKey:r.ctrlKey),null==i.moveOnDrag&&(i.moveOnDrag=!(v?r.altKey:r.ctrlKey)),i}(e,r,o),d=e.doc.sel;e.options.dragDrop&&Re&&!e.isReadOnly()&&"single"==r&&(i=d.contains(t))>-1&&(lt((i=d.ranges[i]).from(),t)<0||t.xRel>0)&&(lt(i.to(),t)>0||t.xRel<0)?function(e,t,r,o){var i=e.display,n=!1,d=ai(e,(function(t){s&&(i.scroller.draggable=!1),e.state.draggingText=!1,e.state.delayingBlurEvent&&(e.hasFocus()?e.state.delayingBlurEvent=!1:Oo(e)),ve(i.wrapper.ownerDocument,"mouseup",d),ve(i.wrapper.ownerDocument,"mousemove",c),ve(i.scroller,"dragstart",u),ve(i.scroller,"drop",d),n||(Se(t),o.addNew||$i(e.doc,r,null,null,o.extend),s&&!h||a&&9==l?setTimeout((function(){i.wrapper.ownerDocument.body.focus({preventScroll:!0}),i.input.focus()}),20):i.input.focus())})),c=function(e){n=n||Math.abs(t.clientX-e.clientX)+Math.abs(t.clientY-e.clientY)>=10},u=function(){return n=!0};s&&(i.scroller.draggable=!0),e.state.draggingText=d,d.copy=!o.moveOnDrag,be(i.wrapper.ownerDocument,"mouseup",d),be(i.wrapper.ownerDocument,"mousemove",c),be(i.scroller,"dragstart",u),be(i.scroller,"drop",d),e.state.delayingBlurEvent=!0,setTimeout((function(){return i.input.focus()}),20),i.scroller.dragDrop&&i.scroller.dragDrop()}(e,o,t,n):function(e,t,r,o){a&&Oo(e);var i=e.display,n=e.doc;Se(t);var l,s,d=n.sel,c=d.ranges;if(o.addNew&&!o.extend?(s=n.sel.contains(r),l=s>-1?c[s]:new Oi(r,r)):(l=n.sel.primary(),s=n.sel.primIndex),"rectangle"==o.unit)o.addNew||(l=new Oi(r,r)),r=mo(e,t,!0,!0),s=-1;else{var u=wa(e,r,o.unit);l=o.extend?Xi(l,u.anchor,u.head,o.extend):u}o.addNew?-1==s?(s=c.length,nn(n,Li(e,c.concat([l]),s),{scroll:!1,origin:"*mouse"})):c.length>1&&c[s].empty()&&"char"==o.unit&&!o.extend?(nn(n,Li(e,c.slice(0,s).concat(c.slice(s+1)),0),{scroll:!1,origin:"*mouse"}),d=n.sel):tn(n,s,l,J):(s=0,nn(n,new Ai([l],0),J),d=n.sel);var p=r,h=i.wrapper.getBoundingClientRect(),g=0;function m(t){var a=++g,c=mo(e,t,!0,"rectangle"==o.unit);if(c)if(0!=lt(c,p)){e.curOp.focus=R(P(e)),function(t){if(0!=lt(p,t))if(p=t,"rectangle"==o.unit){for(var i=[],a=e.options.tabSize,c=K(Xe(n,r.line).text,r.ch,a),u=K(Xe(n,t.line).text,t.ch,a),h=Math.min(c,u),g=Math.max(c,u),m=Math.min(r.line,t.line),f=Math.min(e.lastLine(),Math.max(r.line,t.line));m<=f;m++){var b=Xe(n,m).text,y=Y(b,h,a);h==g?i.push(new Oi(at(m,y),at(m,y))):b.length>y&&i.push(new Oi(at(m,y),at(m,Y(b,g,a))))}i.length||i.push(new Oi(r,r)),nn(n,Li(e,d.ranges.slice(0,s).concat(i),s),{origin:"*mouse",scroll:!1}),e.scrollIntoView(t)}else{var v,x=l,w=wa(e,t,o.unit),k=x.anchor;lt(w.anchor,k)>0?(v=w.head,k=ut(x.from(),w.anchor)):(v=w.anchor,k=ct(x.to(),w.head));var _=d.ranges.slice(0);_[s]=function(e,t){var r=t.anchor,o=t.head,i=Xe(e.doc,r.line);if(0==lt(r,o)&&r.sticky==o.sticky)return t;var n=me(i);if(!n)return t;var a=he(n,r.ch,r.sticky),l=n[a];if(l.from!=r.ch&&l.to!=r.ch)return t;var s,d=a+(l.from==r.ch==(1!=l.level)?0:1);if(0==d||d==n.length)return t;if(o.line!=r.line)s=(o.line-r.line)*("ltr"==e.doc.direction?1:-1)>0;else{var c=he(n,o.ch,o.sticky),u=c-a||(o.ch-r.ch)*(1==l.level?-1:1);s=c==d-1||c==d?u<0:u>0}var p=n[d+(s?-1:0)],h=s==(1==p.level),g=h?p.from:p.to,m=h?"after":"before";return r.ch==g&&r.sticky==m?t:new Oi(new at(r.line,g,m),o)}(e,new Oi(ht(n,k),v)),nn(n,Li(e,_,s),J)}}(c);var u=Fo(i,n);(c.line>=u.to||c.line<u.from)&&setTimeout(ai(e,(function(){g==a&&m(t)})),150)}else{var f=t.clientY<h.top?-20:t.clientY>h.bottom?20:0;f&&setTimeout(ai(e,(function(){g==a&&(i.scroller.scrollTop+=f,m(t))})),50)}}function f(t){e.state.selectingText=!1,g=1/0,t&&(Se(t),i.input.focus()),ve(i.wrapper.ownerDocument,"mousemove",b),ve(i.wrapper.ownerDocument,"mouseup",y),n.history.lastSelOrigin=null}var b=ai(e,(function(e){0!==e.buttons&&Le(e)?m(e):f(e)})),y=ai(e,f);e.state.selectingText=y,be(i.wrapper.ownerDocument,"mousemove",b),be(i.wrapper.ownerDocument,"mouseup",y)}(e,o,t,n)}(t,o,n,e):Oe(e)==r.scroller&&Se(e):2==i?(o&&$i(t.doc,o),setTimeout((function(){return r.input.focus()}),20)):3==i&&(C?t.display.input.onContextMenu(e):Oo(t)))}}function wa(e,t,r){if("char"==r)return new Oi(t,t);if("word"==r)return e.findWordAt(t);if("line"==r)return new Oi(at(t.line,0),ht(e.doc,at(t.line+1,0)));var o=r(e,t);return new Oi(o.from,o.to)}function ka(e,t,r,o){var i,n;if(t.touches)i=t.touches[0].clientX,n=t.touches[0].clientY;else try{i=t.clientX,n=t.clientY}catch(e){return!1}if(i>=Math.floor(e.display.gutters.getBoundingClientRect().right))return!1;o&&Se(t);var a=e.display,l=a.lineDiv.getBoundingClientRect();if(n>l.bottom||!_e(e,r))return Te(t);n-=l.top-a.viewOffset;for(var s=0;s<e.display.gutterSpecs.length;++s){var d=a.gutters.childNodes[s];if(d&&d.getBoundingClientRect().right>=i)return xe(e,r,e,ot(e.doc,n),e.display.gutterSpecs[s].className,t),Te(t)}}function _a(e,t){return ka(e,t,"gutterClick",!0)}function Ca(e,t){Tr(e.display,t)||function(e,t){return!!_e(e,"gutterContextMenu")&&ka(e,t,"gutterContextMenu",!1)}(e,t)||we(e,t,"contextmenu")||C||e.display.input.onContextMenu(t)}function Sa(e){e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+e.options.theme.replace(/(^|\s)\s*/g," cm-s-"),Vr(e)}va.prototype.compare=function(e,t,r){return this.time+400>e&&0==lt(t,this.pos)&&r==this.button};var Ea={toString:function(){return"CodeMirror.Init"}},Ta={},Aa={};function Oa(e,t,r){if(!t!=!(r&&r!=Ea)){var o=e.display.dragFunctions,i=t?be:ve;i(e.display.scroller,"dragstart",o.start),i(e.display.scroller,"dragenter",o.enter),i(e.display.scroller,"dragover",o.over),i(e.display.scroller,"dragleave",o.leave),i(e.display.scroller,"drop",o.drop)}}function La(e){e.options.lineWrapping?(F(e.display.wrapper,"CodeMirror-wrap"),e.display.sizer.style.minWidth="",e.display.sizerWidth=null):(T(e.display.wrapper,"CodeMirror-wrap"),Yt(e)),go(e),bo(e),Vr(e),setTimeout((function(){return Zo(e)}),100)}function Ma(e,t){var r=this;if(!(this instanceof Ma))return new Ma(e,t);this.options=t=t?W(t):{},W(Ta,t,!1);var o=t.value;"string"==typeof o?o=new zn(o,t.mode,null,t.lineSeparator,t.direction):t.mode&&(o.modeOption=t.mode),this.doc=o;var i=new Ma.inputStyles[t.inputStyle](this),n=this.display=new ki(e,o,i,t);for(var d in n.wrapper.CodeMirror=this,Sa(this),t.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),Qo(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:-1,cutIncoming:-1,selectingText:!1,draggingText:!1,highlight:new j,keySeq:null,specialChars:null},t.autofocus&&!y&&n.input.focus(),a&&l<11&&setTimeout((function(){return r.display.input.reset(!0)}),20),function(e){var t=e.display;be(t.scroller,"mousedown",ai(e,xa)),be(t.scroller,"dblclick",a&&l<11?ai(e,(function(t){if(!we(e,t)){var r=mo(e,t);if(r&&!_a(e,t)&&!Tr(e.display,t)){Se(t);var o=e.findWordAt(r);$i(e.doc,o.anchor,o.head)}}})):function(t){return we(e,t)||Se(t)}),be(t.scroller,"contextmenu",(function(t){return Ca(e,t)})),be(t.input.getField(),"contextmenu",(function(r){t.scroller.contains(r.target)||Ca(e,r)}));var r,o={end:0};function i(){t.activeTouch&&(r=setTimeout((function(){return t.activeTouch=null}),1e3),(o=t.activeTouch).end=+new Date)}function n(e,t){if(null==t.left)return!0;var r=t.left-e.left,o=t.top-e.top;return r*r+o*o>400}be(t.scroller,"touchstart",(function(i){if(!we(e,i)&&!function(e){if(1!=e.touches.length)return!1;var t=e.touches[0];return t.radiusX<=1&&t.radiusY<=1}(i)&&!_a(e,i)){t.input.ensurePolled(),clearTimeout(r);var n=+new Date;t.activeTouch={start:n,moved:!1,prev:n-o.end<=300?o:null},1==i.touches.length&&(t.activeTouch.left=i.touches[0].pageX,t.activeTouch.top=i.touches[0].pageY)}})),be(t.scroller,"touchmove",(function(){t.activeTouch&&(t.activeTouch.moved=!0)})),be(t.scroller,"touchend",(function(r){var o=t.activeTouch;if(o&&!Tr(t,r)&&null!=o.left&&!o.moved&&new Date-o.start<300){var a,l=e.coordsChar(t.activeTouch,"page");a=!o.prev||n(o,o.prev)?new Oi(l,l):!o.prev.prev||n(o,o.prev.prev)?e.findWordAt(l):new Oi(at(l.line,0),ht(e.doc,at(l.line+1,0))),e.setSelection(a.anchor,a.head),e.focus(),Se(r)}i()})),be(t.scroller,"touchcancel",i),be(t.scroller,"scroll",(function(){t.scroller.clientHeight&&(Bo(e,t.scroller.scrollTop),Ko(e,t.scroller.scrollLeft,!0),xe(e,"scroll",e))})),be(t.scroller,"mousewheel",(function(t){return Ti(e,t)})),be(t.scroller,"DOMMouseScroll",(function(t){return Ti(e,t)})),be(t.wrapper,"scroll",(function(){return t.wrapper.scrollTop=t.wrapper.scrollLeft=0})),t.dragFunctions={enter:function(t){we(e,t)||Ae(t)},over:function(t){we(e,t)||(function(e,t){var r=mo(e,t);if(r){var o=document.createDocumentFragment();Co(e,r,o),e.display.dragCursor||(e.display.dragCursor=L("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),e.display.lineSpace.insertBefore(e.display.dragCursor,e.display.cursorDiv)),O(e.display.dragCursor,o)}}(e,t),Ae(t))},start:function(t){return function(e,t){if(a&&(!e.state.draggingText||+new Date-Dn<100))Ae(t);else if(!we(e,t)&&!Tr(e.display,t)&&(t.dataTransfer.setData("Text",e.getSelection()),t.dataTransfer.effectAllowed="copyMove",t.dataTransfer.setDragImage&&!h)){var r=L("img",null,null,"position: fixed; left: 0; top: 0;");r.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",p&&(r.width=r.height=1,e.display.wrapper.appendChild(r),r._top=r.offsetTop),t.dataTransfer.setDragImage(r,0,0),p&&r.parentNode.removeChild(r)}}(e,t)},drop:ai(e,Pn),leave:function(t){we(e,t)||Hn(e)}};var s=t.input.getField();be(s,"keyup",(function(t){return ma.call(e,t)})),be(s,"keydown",ai(e,ga)),be(s,"keypress",ai(e,fa)),be(s,"focus",(function(t){return Lo(e,t)})),be(s,"blur",(function(t){return Mo(e,t)}))}(this),function(){var e;Bn||(be(window,"resize",(function(){null==e&&(e=setTimeout((function(){e=null,Un(Wn)}),100))})),be(window,"blur",(function(){return Un(Mo)})),Bn=!0)}(),Xo(this),this.curOp.forceUpdate=!0,Bi(this,o),t.autofocus&&!y||this.hasFocus()?setTimeout((function(){r.hasFocus()&&!r.state.focused&&Lo(r)}),20):Mo(this),Aa)Aa.hasOwnProperty(d)&&Aa[d](this,t[d],Ea);yi(this),t.finishInit&&t.finishInit(this);for(var c=0;c<Ia.length;++c)Ia[c](this);$o(this),s&&t.lineWrapping&&"optimizelegibility"==getComputedStyle(n.lineDiv).textRendering&&(n.lineDiv.style.textRendering="auto")}Ma.defaults=Ta,Ma.optionHandlers=Aa;var Ia=[];function Ra(e,t,r,o){var i,n=e.doc;null==r&&(r="add"),"smart"==r&&(n.mode.indent?i=vt(e,t).state:r="prev");var a=e.options.tabSize,l=Xe(n,t),s=K(l.text,null,a);l.stateAfter&&(l.stateAfter=null);var d,c=l.text.match(/^\s*/)[0];if(o||/\S/.test(l.text)){if("smart"==r&&((d=n.mode.indent(i,l.text.slice(c.length),l.text))==Z||d>150)){if(!o)return;r="prev"}}else d=0,r="not";"prev"==r?d=t>n.first?K(Xe(n,t-1).text,null,a):0:"add"==r?d=s+e.options.indentUnit:"subtract"==r?d=s-e.options.indentUnit:"number"==typeof r&&(d=s+r),d=Math.max(0,d);var u="",p=0;if(e.options.indentWithTabs)for(var h=Math.floor(d/a);h;--h)p+=a,u+="\t";if(p<d&&(u+=$(d-p)),u!=c)return xn(n,u,at(t,0),at(t,c.length),"+input"),l.stateAfter=null,!0;for(var g=0;g<n.sel.ranges.length;g++){var m=n.sel.ranges[g];if(m.head.line==t&&m.head.ch<c.length){var f=at(t,c.length);tn(n,g,new Oi(f,f));break}}}Ma.defineInitHook=function(e){return Ia.push(e)};var Fa=null;function Na(e){Fa=e}function za(e,t,r,o,i){var n=e.doc;e.display.shift=!1,o||(o=n.sel);var a=+new Date-200,l="paste"==i||e.state.pasteIncoming>a,s=De(t),d=null;if(l&&o.ranges.length>1)if(Fa&&Fa.text.join("\n")==t){if(o.ranges.length%Fa.text.length==0){d=[];for(var c=0;c<Fa.text.length;c++)d.push(n.splitLines(Fa.text[c]))}}else s.length==o.ranges.length&&e.options.pasteLinesPerSelection&&(d=te(s,(function(e){return[e]})));for(var u=e.curOp.updateInput,p=o.ranges.length-1;p>=0;p--){var h=o.ranges[p],g=h.from(),m=h.to();h.empty()&&(r&&r>0?g=at(g.line,g.ch-r):e.state.overwrite&&!l?m=at(m.line,Math.min(Xe(n,m.line).text.length,m.ch+ee(s).length)):l&&Fa&&Fa.lineWise&&Fa.text.join("\n")==s.join("\n")&&(g=m=at(g.line,0)));var f={from:g,to:m,text:d?d[p%d.length]:s,origin:i||(l?"paste":e.state.cutIncoming>a?"cut":"+input")};mn(e.doc,f),hr(e,"inputRead",e,f)}t&&!l&&Pa(e,t),Do(e),e.curOp.updateInput<2&&(e.curOp.updateInput=u),e.curOp.typing=!0,e.state.pasteIncoming=e.state.cutIncoming=-1}function Da(e,t){var r=e.clipboardData&&e.clipboardData.getData("Text");if(r)return e.preventDefault(),t.isReadOnly()||t.options.disableInput||!t.hasFocus()||ni(t,(function(){return za(t,r,0,null,"paste")})),!0}function Pa(e,t){if(e.options.electricChars&&e.options.smartIndent)for(var r=e.doc.sel,o=r.ranges.length-1;o>=0;o--){var i=r.ranges[o];if(!(i.head.ch>100||o&&r.ranges[o-1].head.line==i.head.line)){var n=e.getModeAt(i.head),a=!1;if(n.electricChars){for(var l=0;l<n.electricChars.length;l++)if(t.indexOf(n.electricChars.charAt(l))>-1){a=Ra(e,i.head.line,"smart");break}}else n.electricInput&&n.electricInput.test(Xe(e.doc,i.head.line).text.slice(0,i.head.ch))&&(a=Ra(e,i.head.line,"smart"));a&&hr(e,"electricInput",e,i.head.line)}}}function Ha(e){for(var t=[],r=[],o=0;o<e.doc.sel.ranges.length;o++){var i=e.doc.sel.ranges[o].head.line,n={anchor:at(i,0),head:at(i+1,0)};r.push(n),t.push(e.getRange(n.anchor,n.head))}return{text:t,ranges:r}}function Ua(e,t,r,o){e.setAttribute("autocorrect",r?"on":"off"),e.setAttribute("autocapitalize",o?"on":"off"),e.setAttribute("spellcheck",!!t)}function Ba(){var e=L("textarea",null,null,"position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"),t=L("div",[e],null,"overflow: hidden; position: relative; width: 3px; height: 0px;");return s?e.style.width="1000px":e.setAttribute("wrap","off"),f&&(e.style.border="1px solid black"),t}function Wa(e,t,r,o,i){var n=t,a=r,l=Xe(e,t.line),s=i&&"rtl"==e.direction?-r:r;function d(n){var a,d;if("codepoint"==o){var c=l.text.charCodeAt(t.ch+(r>0?0:-1));if(isNaN(c))a=null;else{var u=r>0?c>=55296&&c<56320:c>=56320&&c<57343;a=new at(t.line,Math.max(0,Math.min(l.text.length,t.ch+r*(u?2:1))),-r)}}else a=i?function(e,t,r,o){var i=me(t,e.doc.direction);if(!i)return oa(t,r,o);r.ch>=t.text.length?(r.ch=t.text.length,r.sticky="before"):r.ch<=0&&(r.ch=0,r.sticky="after");var n=he(i,r.ch,r.sticky),a=i[n];if("ltr"==e.doc.direction&&a.level%2==0&&(o>0?a.to>r.ch:a.from<r.ch))return oa(t,r,o);var l,s=function(e,r){return ra(t,e instanceof at?e.ch:e,r)},d=function(r){return e.options.lineWrapping?(l=l||Dr(e,t),oo(e,t,l,r)):{begin:0,end:t.text.length}},c=d("before"==r.sticky?s(r,-1):r.ch);if("rtl"==e.doc.direction||1==a.level){var u=1==a.level==o<0,p=s(r,u?1:-1);if(null!=p&&(u?p<=a.to&&p<=c.end:p>=a.from&&p>=c.begin)){var h=u?"before":"after";return new at(r.line,p,h)}}var g=function(e,t,o){for(var n=function(e,t){return t?new at(r.line,s(e,1),"before"):new at(r.line,e,"after")};e>=0&&e<i.length;e+=t){var a=i[e],l=t>0==(1!=a.level),d=l?o.begin:s(o.end,-1);if(a.from<=d&&d<a.to)return n(d,l);if(d=l?a.from:s(a.to,-1),o.begin<=d&&d<o.end)return n(d,l)}},m=g(n+o,o,c);if(m)return m;var f=o>0?c.end:s(c.begin,-1);return null==f||o>0&&f==t.text.length||!(m=g(o>0?0:i.length-1,o,d(f)))?null:m}(e.cm,l,t,r):oa(l,t,r);if(null==a){if(n||(d=t.line+s)<e.first||d>=e.first+e.size||(t=new at(d,t.ch,t.sticky),!(l=Xe(e,d))))return!1;t=ia(i,e.cm,l,t.line,s)}else t=a;return!0}if("char"==o||"codepoint"==o)d();else if("column"==o)d(!0);else if("word"==o||"group"==o)for(var c=null,u="group"==o,p=e.cm&&e.cm.getHelper(t,"wordChars"),h=!0;!(r<0)||d(!h);h=!1){var g=l.text.charAt(t.ch)||"\n",m=ae(g,p)?"w":u&&"\n"==g?"n":!u||/\s/.test(g)?null:"p";if(!u||h||m||(m="s"),c&&c!=m){r<0&&(r=1,d(),t.sticky="after");break}if(m&&(c=m),r>0&&!d(!h))break}var f=un(e,t,n,a,!0);return st(n,f)&&(f.hitSide=!0),f}function Ka(e,t,r,o){var i,n,a=e.doc,l=t.left;if("page"==o){var s=Math.min(e.display.wrapper.clientHeight,U(e).innerHeight||a(e).documentElement.clientHeight),d=Math.max(s-.5*so(e.display),3);i=(r>0?t.bottom:t.top)+r*d}else"line"==o&&(i=r>0?t.bottom+3:t.top-3);for(;(n=to(e,l,i)).outside;){if(r<0?i<=0:i>=a.height){n.hitSide=!0;break}i+=5*r}return n}var ja=function(e){this.cm=e,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new j,this.composing=null,this.gracePeriod=!1,this.readDOMTimeout=null};function Va(e,t){var r=zr(e,t.line);if(!r||r.hidden)return null;var o=Xe(e.doc,t.line),i=Fr(r,o,t.line),n=me(o,e.doc.direction),a="left";n&&(a=he(n,t.ch)%2?"right":"left");var l=Br(i.map,t.ch,a);return l.offset="right"==l.collapse?l.end:l.start,l}function qa(e,t){return t&&(e.bad=!0),e}function Za(e,t,r){var o;if(t==e.display.lineDiv){if(!(o=e.display.lineDiv.childNodes[r]))return qa(e.clipPos(at(e.display.viewTo-1)),!0);t=null,r=0}else for(o=t;;o=o.parentNode){if(!o||o==e.display.lineDiv)return null;if(o.parentNode&&o.parentNode==e.display.lineDiv)break}for(var i=0;i<e.display.view.length;i++){var n=e.display.view[i];if(n.node==o)return Ga(n,t,r)}}function Ga(e,t,r){var o=e.text.firstChild,i=!1;if(!t||!I(o,t))return qa(at(rt(e.line),0),!0);if(t==o&&(i=!0,t=o.childNodes[r],r=0,!t)){var n=e.rest?ee(e.rest):e.line;return qa(at(rt(n),n.text.length),i)}var a=3==t.nodeType?t:null,l=t;for(a||1!=t.childNodes.length||3!=t.firstChild.nodeType||(a=t.firstChild,r&&(r=a.nodeValue.length));l.parentNode!=o;)l=l.parentNode;var s=e.measure,d=s.maps;function c(t,r,o){for(var i=-1;i<(d?d.length:0);i++)for(var n=i<0?s.map:d[i],a=0;a<n.length;a+=3){var l=n[a+2];if(l==t||l==r){var c=rt(i<0?e.line:e.rest[i]),u=n[a]+o;return(o<0||l!=t)&&(u=n[a+(o?1:0)]),at(c,u)}}}var u=c(a,l,r);if(u)return qa(u,i);for(var p=l.nextSibling,h=a?a.nodeValue.length-r:0;p;p=p.nextSibling){if(u=c(p,p.firstChild,0))return qa(at(u.line,u.ch-h),i);h+=p.textContent.length}for(var g=l.previousSibling,m=r;g;g=g.previousSibling){if(u=c(g,g.firstChild,-1))return qa(at(u.line,u.ch+m),i);m+=g.textContent.length}}ja.prototype.init=function(e){var t=this,r=this,o=r.cm,i=r.div=e.lineDiv;function n(e){for(var t=e.target;t;t=t.parentNode){if(t==i)return!0;if(/\bCodeMirror-(?:line)?widget\b/.test(t.className))break}return!1}function a(e){if(n(e)&&!we(o,e)){if(o.somethingSelected())Na({lineWise:!1,text:o.getSelections()}),"cut"==e.type&&o.replaceSelection("",null,"cut");else{if(!o.options.lineWiseCopyCut)return;var t=Ha(o);Na({lineWise:!0,text:t.text}),"cut"==e.type&&o.operation((function(){o.setSelections(t.ranges,0,G),o.replaceSelection("",null,"cut")}))}if(e.clipboardData){e.clipboardData.clearData();var a=Fa.text.join("\n");if(e.clipboardData.setData("Text",a),e.clipboardData.getData("Text")==a)return void e.preventDefault()}var l=Ba(),s=l.firstChild;Ua(s),o.display.lineSpace.insertBefore(l,o.display.lineSpace.firstChild),s.value=Fa.text.join("\n");var d=R(H(i));z(s),setTimeout((function(){o.display.lineSpace.removeChild(l),d.focus(),d==i&&r.showPrimarySelection()}),50)}}i.contentEditable=!0,Ua(i,o.options.spellcheck,o.options.autocorrect,o.options.autocapitalize),be(i,"paste",(function(e){!n(e)||we(o,e)||Da(e,o)||l<=11&&setTimeout(ai(o,(function(){return t.updateFromDOM()})),20)})),be(i,"compositionstart",(function(e){t.composing={data:e.data,done:!1}})),be(i,"compositionupdate",(function(e){t.composing||(t.composing={data:e.data,done:!1})})),be(i,"compositionend",(function(e){t.composing&&(e.data!=t.composing.data&&t.readFromDOMSoon(),t.composing.done=!0)})),be(i,"touchstart",(function(){return r.forceCompositionEnd()})),be(i,"input",(function(){t.composing||t.readFromDOMSoon()})),be(i,"copy",a),be(i,"cut",a)},ja.prototype.screenReaderLabelChanged=function(e){e?this.div.setAttribute("aria-label",e):this.div.removeAttribute("aria-label")},ja.prototype.prepareSelection=function(){var e=_o(this.cm,!1);return e.focus=R(H(this.div))==this.div,e},ja.prototype.showSelection=function(e,t){e&&this.cm.display.view.length&&((e.focus||t)&&this.showPrimarySelection(),this.showMultipleSelections(e))},ja.prototype.getSelection=function(){return this.cm.display.wrapper.ownerDocument.getSelection()},ja.prototype.showPrimarySelection=function(){var e=this.getSelection(),t=this.cm,o=t.doc.sel.primary(),i=o.from(),n=o.to();if(t.display.viewTo==t.display.viewFrom||i.line>=t.display.viewTo||n.line<t.display.viewFrom)e.removeAllRanges();else{var a=Za(t,e.anchorNode,e.anchorOffset),l=Za(t,e.focusNode,e.focusOffset);if(!a||a.bad||!l||l.bad||0!=lt(ut(a,l),i)||0!=lt(ct(a,l),n)){var s=t.display.view,d=i.line>=t.display.viewFrom&&Va(t,i)||{node:s[0].measure.map[2],offset:0},c=n.line<t.display.viewTo&&Va(t,n);if(!c){var u=s[s.length-1].measure,p=u.maps?u.maps[u.maps.length-1]:u.map;c={node:p[p.length-1],offset:p[p.length-2]-p[p.length-3]}}if(d&&c){var h,g=e.rangeCount&&e.getRangeAt(0);try{h=E(d.node,d.offset,c.offset,c.node)}catch(e){}h&&(!r&&t.state.focused?(e.collapse(d.node,d.offset),h.collapsed||(e.removeAllRanges(),e.addRange(h))):(e.removeAllRanges(),e.addRange(h)),g&&null==e.anchorNode?e.addRange(g):r&&this.startGracePeriod()),this.rememberSelection()}else e.removeAllRanges()}}},ja.prototype.startGracePeriod=function(){var e=this;clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout((function(){e.gracePeriod=!1,e.selectionChanged()&&e.cm.operation((function(){return e.cm.curOp.selectionChanged=!0}))}),20)},ja.prototype.showMultipleSelections=function(e){O(this.cm.display.cursorDiv,e.cursors),O(this.cm.display.selectionDiv,e.selection)},ja.prototype.rememberSelection=function(){var e=this.getSelection();this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastFocusNode=e.focusNode,this.lastFocusOffset=e.focusOffset},ja.prototype.selectionInEditor=function(){var e=this.getSelection();if(!e.rangeCount)return!1;var t=e.getRangeAt(0).commonAncestorContainer;return I(this.div,t)},ja.prototype.focus=function(){"nocursor"!=this.cm.options.readOnly&&(this.selectionInEditor()&&R(H(this.div))==this.div||this.showSelection(this.prepareSelection(),!0),this.div.focus())},ja.prototype.blur=function(){this.div.blur()},ja.prototype.getField=function(){return this.div},ja.prototype.supportsTouch=function(){return!0},ja.prototype.receivedFocus=function(){var e=this,t=this;this.selectionInEditor()?setTimeout((function(){return e.pollSelection()}),20):ni(this.cm,(function(){return t.cm.curOp.selectionChanged=!0})),this.polling.set(this.cm.options.pollInterval,(function e(){t.cm.state.focused&&(t.pollSelection(),t.polling.set(t.cm.options.pollInterval,e))}))},ja.prototype.selectionChanged=function(){var e=this.getSelection();return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset},ja.prototype.pollSelection=function(){if(null==this.readDOMTimeout&&!this.gracePeriod&&this.selectionChanged()){var e=this.getSelection(),t=this.cm;if(b&&c&&this.cm.display.gutterSpecs.length&&function(e){for(var t=e;t;t=t.parentNode)if(/CodeMirror-gutter-wrapper/.test(t.className))return!0;return!1}(e.anchorNode))return this.cm.triggerOnKeyDown({type:"keydown",keyCode:8,preventDefault:Math.abs}),this.blur(),void this.focus();if(!this.composing){this.rememberSelection();var r=Za(t,e.anchorNode,e.anchorOffset),o=Za(t,e.focusNode,e.focusOffset);r&&o&&ni(t,(function(){nn(t.doc,Mi(r,o),G),(r.bad||o.bad)&&(t.curOp.selectionChanged=!0)}))}}},ja.prototype.pollContent=function(){null!=this.readDOMTimeout&&(clearTimeout(this.readDOMTimeout),this.readDOMTimeout=null);var e,t,r,o=this.cm,i=o.display,n=o.doc.sel.primary(),a=n.from(),l=n.to();if(0==a.ch&&a.line>o.firstLine()&&(a=at(a.line-1,Xe(o.doc,a.line-1).length)),l.ch==Xe(o.doc,l.line).text.length&&l.line<o.lastLine()&&(l=at(l.line+1,0)),a.line<i.viewFrom||l.line>i.viewTo-1)return!1;a.line==i.viewFrom||0==(e=fo(o,a.line))?(t=rt(i.view[0].line),r=i.view[0].node):(t=rt(i.view[e].line),r=i.view[e-1].node.nextSibling);var s,d,c=fo(o,l.line);if(c==i.view.length-1?(s=i.viewTo-1,d=i.lineDiv.lastChild):(s=rt(i.view[c+1].line)-1,d=i.view[c+1].node.previousSibling),!r)return!1;for(var u=o.doc.splitLines(function(e,t,r,o,i){var n="",a=!1,l=e.doc.lineSeparator(),s=!1;function d(){a&&(n+=l,s&&(n+=l),a=s=!1)}function c(e){e&&(d(),n+=e)}function u(t){if(1==t.nodeType){var r=t.getAttribute("cm-text");if(r)return void c(r);var n,p=t.getAttribute("cm-marker");if(p){var h=e.findMarks(at(o,0),at(i+1,0),(f=+p,function(e){return e.id==f}));return void(h.length&&(n=h[0].find(0))&&c($e(e.doc,n.from,n.to).join(l)))}if("false"==t.getAttribute("contenteditable"))return;var g=/^(pre|div|p|li|table|br)$/i.test(t.nodeName);if(!/^br$/i.test(t.nodeName)&&0==t.textContent.length)return;g&&d();for(var m=0;m<t.childNodes.length;m++)u(t.childNodes[m]);/^(pre|p)$/i.test(t.nodeName)&&(s=!0),g&&(a=!0)}else 3==t.nodeType&&c(t.nodeValue.replace(/\u200b/g,"").replace(/\u00a0/g," "));var f}for(;u(t),t!=r;)t=t.nextSibling,s=!1;return n}(o,r,d,t,s)),p=$e(o.doc,at(t,0),at(s,Xe(o.doc,s).text.length));u.length>1&&p.length>1;)if(ee(u)==ee(p))u.pop(),p.pop(),s--;else{if(u[0]!=p[0])break;u.shift(),p.shift(),t++}for(var h=0,g=0,m=u[0],f=p[0],b=Math.min(m.length,f.length);h<b&&m.charCodeAt(h)==f.charCodeAt(h);)++h;for(var y=ee(u),v=ee(p),x=Math.min(y.length-(1==u.length?h:0),v.length-(1==p.length?h:0));g<x&&y.charCodeAt(y.length-g-1)==v.charCodeAt(v.length-g-1);)++g;if(1==u.length&&1==p.length&&t==a.line)for(;h&&h>a.ch&&y.charCodeAt(y.length-g-1)==v.charCodeAt(v.length-g-1);)h--,g++;u[u.length-1]=y.slice(0,y.length-g).replace(/^\u200b+/,""),u[0]=u[0].slice(h).replace(/\u200b+$/,"");var w=at(t,h),k=at(s,p.length?ee(p).length-g:0);return u.length>1||u[0]||lt(w,k)?(xn(o.doc,u,w,k,"+input"),!0):void 0},ja.prototype.ensurePolled=function(){this.forceCompositionEnd()},ja.prototype.reset=function(){this.forceCompositionEnd()},ja.prototype.forceCompositionEnd=function(){this.composing&&(clearTimeout(this.readDOMTimeout),this.composing=null,this.updateFromDOM(),this.div.blur(),this.div.focus())},ja.prototype.readFromDOMSoon=function(){var e=this;null==this.readDOMTimeout&&(this.readDOMTimeout=setTimeout((function(){if(e.readDOMTimeout=null,e.composing){if(!e.composing.done)return;e.composing=null}e.updateFromDOM()}),80))},ja.prototype.updateFromDOM=function(){var e=this;!this.cm.isReadOnly()&&this.pollContent()||ni(this.cm,(function(){return bo(e.cm)}))},ja.prototype.setUneditable=function(e){e.contentEditable="false"},ja.prototype.onKeyPress=function(e){0==e.charCode||this.composing||(e.preventDefault(),this.cm.isReadOnly()||ai(this.cm,za)(this.cm,String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),0))},ja.prototype.readOnlyChanged=function(e){this.div.contentEditable=("nocursor"!=e)+""},ja.prototype.onContextMenu=function(){},ja.prototype.resetPosition=function(){},ja.prototype.needsContentAttribute=!0;var Ja=function(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new j,this.hasSelection=!1,this.composing=null,this.resetting=!1};Ja.prototype.init=function(e){var t=this,r=this,o=this.cm;this.createField(e);var i=this.textarea;function n(e){if(!we(o,e)){if(o.somethingSelected())Na({lineWise:!1,text:o.getSelections()});else{if(!o.options.lineWiseCopyCut)return;var t=Ha(o);Na({lineWise:!0,text:t.text}),"cut"==e.type?o.setSelections(t.ranges,null,G):(r.prevInput="",i.value=t.text.join("\n"),z(i))}"cut"==e.type&&(o.state.cutIncoming=+new Date)}}e.wrapper.insertBefore(this.wrapper,e.wrapper.firstChild),f&&(i.style.width="0px"),be(i,"input",(function(){a&&l>=9&&t.hasSelection&&(t.hasSelection=null),r.poll()})),be(i,"paste",(function(e){we(o,e)||Da(e,o)||(o.state.pasteIncoming=+new Date,r.fastPoll())})),be(i,"cut",n),be(i,"copy",n),be(e.scroller,"paste",(function(t){if(!Tr(e,t)&&!we(o,t)){if(!i.dispatchEvent)return o.state.pasteIncoming=+new Date,void r.focus();var n=new Event("paste");n.clipboardData=t.clipboardData,i.dispatchEvent(n)}})),be(e.lineSpace,"selectstart",(function(t){Tr(e,t)||Se(t)})),be(i,"compositionstart",(function(){var e=o.getCursor("from");r.composing&&r.composing.range.clear(),r.composing={start:e,range:o.markText(e,o.getCursor("to"),{className:"CodeMirror-composing"})}})),be(i,"compositionend",(function(){r.composing&&(r.poll(),r.composing.range.clear(),r.composing=null)}))},Ja.prototype.createField=function(e){this.wrapper=Ba(),this.textarea=this.wrapper.firstChild;var t=this.cm.options;Ua(this.textarea,t.spellcheck,t.autocorrect,t.autocapitalize)},Ja.prototype.screenReaderLabelChanged=function(e){e?this.textarea.setAttribute("aria-label",e):this.textarea.removeAttribute("aria-label")},Ja.prototype.prepareSelection=function(){var e=this.cm,t=e.display,r=e.doc,o=_o(e);if(e.options.moveInputWithCursor){var i=Xr(e,r.sel.primary().head,"div"),n=t.wrapper.getBoundingClientRect(),a=t.lineDiv.getBoundingClientRect();o.teTop=Math.max(0,Math.min(t.wrapper.clientHeight-10,i.top+a.top-n.top)),o.teLeft=Math.max(0,Math.min(t.wrapper.clientWidth-10,i.left+a.left-n.left))}return o},Ja.prototype.showSelection=function(e){var t=this.cm.display;O(t.cursorDiv,e.cursors),O(t.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")},Ja.prototype.reset=function(e){if(!(this.contextMenuPending||this.composing&&e)){var t=this.cm;if(this.resetting=!0,t.somethingSelected()){this.prevInput="";var r=t.getSelection();this.textarea.value=r,t.state.focused&&z(this.textarea),a&&l>=9&&(this.hasSelection=r)}else e||(this.prevInput=this.textarea.value="",a&&l>=9&&(this.hasSelection=null));this.resetting=!1}},Ja.prototype.getField=function(){return this.textarea},Ja.prototype.supportsTouch=function(){return!1},Ja.prototype.focus=function(){if("nocursor"!=this.cm.options.readOnly&&(!y||R(H(this.textarea))!=this.textarea))try{this.textarea.focus()}catch(e){}},Ja.prototype.blur=function(){this.textarea.blur()},Ja.prototype.resetPosition=function(){this.wrapper.style.top=this.wrapper.style.left=0},Ja.prototype.receivedFocus=function(){this.slowPoll()},Ja.prototype.slowPoll=function(){var e=this;this.pollingFast||this.polling.set(this.cm.options.pollInterval,(function(){e.poll(),e.cm.state.focused&&e.slowPoll()}))},Ja.prototype.fastPoll=function(){var e=!1,t=this;t.pollingFast=!0,t.polling.set(20,(function r(){t.poll()||e?(t.pollingFast=!1,t.slowPoll()):(e=!0,t.polling.set(60,r))}))},Ja.prototype.poll=function(){var e=this,t=this.cm,r=this.textarea,o=this.prevInput;if(this.contextMenuPending||this.resetting||!t.state.focused||Pe(r)&&!o&&!this.composing||t.isReadOnly()||t.options.disableInput||t.state.keySeq)return!1;var i=r.value;if(i==o&&!t.somethingSelected())return!1;if(a&&l>=9&&this.hasSelection===i||v&&/[\uf700-\uf7ff]/.test(i))return t.display.input.reset(),!1;if(t.doc.sel==t.display.selForContextMenu){var n=i.charCodeAt(0);if(8203!=n||o||(o="​"),8666==n)return this.reset(),this.cm.execCommand("undo")}for(var s=0,d=Math.min(o.length,i.length);s<d&&o.charCodeAt(s)==i.charCodeAt(s);)++s;return ni(t,(function(){za(t,i.slice(s),o.length-s,null,e.composing?"*compose":null),i.length>1e3||i.indexOf("\n")>-1?r.value=e.prevInput="":e.prevInput=i,e.composing&&(e.composing.range.clear(),e.composing.range=t.markText(e.composing.start,t.getCursor("to"),{className:"CodeMirror-composing"}))})),!0},Ja.prototype.ensurePolled=function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},Ja.prototype.onKeyPress=function(){a&&l>=9&&(this.hasSelection=null),this.fastPoll()},Ja.prototype.onContextMenu=function(e){var t=this,r=t.cm,o=r.display,i=t.textarea;t.contextMenuPending&&t.contextMenuPending();var n=mo(r,e),d=o.scroller.scrollTop;if(n&&!p){r.options.resetSelectionOnContextMenu&&-1==r.doc.sel.contains(n)&&ai(r,nn)(r.doc,Mi(n),G);var c,u=i.style.cssText,h=t.wrapper.style.cssText,g=t.wrapper.offsetParent.getBoundingClientRect();if(t.wrapper.style.cssText="position: static",i.style.cssText="position: absolute; width: 30px; height: 30px;\n      top: "+(e.clientY-g.top-5)+"px; left: "+(e.clientX-g.left-5)+"px;\n      z-index: 1000; background: "+(a?"rgba(255, 255, 255, .05)":"transparent")+";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",s&&(c=i.ownerDocument.defaultView.scrollY),o.input.focus(),s&&i.ownerDocument.defaultView.scrollTo(null,c),o.input.reset(),r.somethingSelected()||(i.value=t.prevInput=" "),t.contextMenuPending=b,o.selForContextMenu=r.doc.sel,clearTimeout(o.detectingSelectAll),a&&l>=9&&f(),C){Ae(e);var m=function(){ve(window,"mouseup",m),setTimeout(b,20)};be(window,"mouseup",m)}else setTimeout(b,50)}function f(){if(null!=i.selectionStart){var e=r.somethingSelected(),n="​"+(e?i.value:"");i.value="⇚",i.value=n,t.prevInput=e?"":"​",i.selectionStart=1,i.selectionEnd=n.length,o.selForContextMenu=r.doc.sel}}function b(){if(t.contextMenuPending==b&&(t.contextMenuPending=!1,t.wrapper.style.cssText=h,i.style.cssText=u,a&&l<9&&o.scrollbars.setScrollTop(o.scroller.scrollTop=d),null!=i.selectionStart)){(!a||a&&l<9)&&f();var e=0,n=function(){o.selForContextMenu==r.doc.sel&&0==i.selectionStart&&i.selectionEnd>0&&"​"==t.prevInput?ai(r,hn)(r):e++<10?o.detectingSelectAll=setTimeout(n,500):(o.selForContextMenu=null,o.input.reset())};o.detectingSelectAll=setTimeout(n,200)}}},Ja.prototype.readOnlyChanged=function(e){e||this.reset(),this.textarea.disabled="nocursor"==e,this.textarea.readOnly=!!e},Ja.prototype.setUneditable=function(){},Ja.prototype.needsContentAttribute=!1,function(e){var t=e.optionHandlers;function r(r,o,i,n){e.defaults[r]=o,i&&(t[r]=n?function(e,t,r){r!=Ea&&i(e,t,r)}:i)}e.defineOption=r,e.Init=Ea,r("value","",(function(e,t){return e.setValue(t)}),!0),r("mode",null,(function(e,t){e.doc.modeOption=t,zi(e)}),!0),r("indentUnit",2,zi,!0),r("indentWithTabs",!1),r("smartIndent",!0),r("tabSize",4,(function(e){Di(e),Vr(e),bo(e)}),!0),r("lineSeparator",null,(function(e,t){if(e.doc.lineSep=t,t){var r=[],o=e.doc.first;e.doc.iter((function(e){for(var i=0;;){var n=e.text.indexOf(t,i);if(-1==n)break;i=n+t.length,r.push(at(o,n))}o++}));for(var i=r.length-1;i>=0;i--)xn(e.doc,t,r[i],at(r[i].line,r[i].ch+t.length))}})),r("specialChars",/[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g,(function(e,t,r){e.state.specialChars=RegExp(t.source+(t.test("\t")?"":"|\t"),"g"),r!=Ea&&e.refresh()})),r("specialCharPlaceholder",ir,(function(e){return e.refresh()}),!0),r("electricChars",!0),r("inputStyle",y?"contenteditable":"textarea",(function(){throw Error("inputStyle can not (yet) be changed in a running editor")}),!0),r("spellcheck",!1,(function(e,t){return e.getInputField().spellcheck=t}),!0),r("autocorrect",!1,(function(e,t){return e.getInputField().autocorrect=t}),!0),r("autocapitalize",!1,(function(e,t){return e.getInputField().autocapitalize=t}),!0),r("rtlMoveVisually",!w),r("wholeLineUpdateBefore",!0),r("theme","default",(function(e){Sa(e),wi(e)}),!0),r("keyMap","default",(function(e,t,r){var o=ea(t),i=r!=Ea&&ea(r);i&&i.detach&&i.detach(e,o),o.attach&&o.attach(e,i||null)})),r("extraKeys",null),r("configureMouse",null),r("lineWrapping",!1,La,!0),r("gutters",[],(function(e,t){e.display.gutterSpecs=vi(t,e.options.lineNumbers),wi(e)}),!0),r("fixedGutter",!0,(function(e,t){e.display.gutters.style.left=t?po(e.display)+"px":"0",e.refresh()}),!0),r("coverGutterNextToScrollbar",!1,(function(e){return Zo(e)}),!0),r("scrollbarStyle","native",(function(e){Qo(e),Zo(e),e.display.scrollbars.setScrollTop(e.doc.scrollTop),e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)}),!0),r("lineNumbers",!1,(function(e,t){e.display.gutterSpecs=vi(e.options.gutters,t),wi(e)}),!0),r("firstLineNumber",1,wi,!0),r("lineNumberFormatter",(function(e){return e}),wi,!0),r("showCursorWhenSelecting",!1,ko,!0),r("resetSelectionOnContextMenu",!0),r("lineWiseCopyCut",!0),r("pasteLinesPerSelection",!0),r("selectionsMayTouch",!1),r("readOnly",!1,(function(e,t){"nocursor"==t&&(Mo(e),e.display.input.blur()),e.display.input.readOnlyChanged(t)})),r("screenReaderLabel",null,(function(e,t){t=""===t?null:t,e.display.input.screenReaderLabelChanged(t)})),r("disableInput",!1,(function(e,t){t||e.display.input.reset()}),!0),r("dragDrop",!0,Oa),r("allowDropFileTypes",null),r("cursorBlinkRate",530),r("cursorScrollMargin",0),r("cursorHeight",1,ko,!0),r("singleCursorHeightPerLine",!0,ko,!0),r("workTime",100),r("workDelay",100),r("flattenSpans",!0,Di,!0),r("addModeClass",!1,Di,!0),r("pollInterval",100),r("undoDepth",200,(function(e,t){return e.doc.history.undoDepth=t})),r("historyEventDelay",1250),r("viewportMargin",10,(function(e){return e.refresh()}),!0),r("maxHighlightLength",1e4,Di,!0),r("moveInputWithCursor",!0,(function(e,t){t||e.display.input.resetPosition()})),r("tabindex",null,(function(e,t){return e.display.input.getField().tabIndex=t||""})),r("autofocus",null),r("direction","ltr",(function(e,t){return e.doc.setDirection(t)}),!0),r("phrases",null)}(Ma),function(e){var t=e.optionHandlers,r=e.helpers={};e.prototype={constructor:e,focus:function(){U(this).focus(),this.display.input.focus()},setOption:function(e,r){var o=this.options,i=o[e];o[e]==r&&"mode"!=e||(o[e]=r,t.hasOwnProperty(e)&&ai(this,t[e])(this,r,i),xe(this,"optionChange",this,e))},getOption:function(e){return this.options[e]},getDoc:function(){return this.doc},addKeyMap:function(e,t){this.state.keyMaps[t?"push":"unshift"](ea(e))},removeKeyMap:function(e){for(var t=this.state.keyMaps,r=0;r<t.length;++r)if(t[r]==e||t[r].name==e)return t.splice(r,1),!0},addOverlay:li((function(t,r){var o=t.token?t:e.getMode(this.options,t);if(o.startState)throw Error("Overlays may not be stateful.");!function(e,t,r){for(var o=0,i=r(t);o<e.length&&r(e[o])<=i;)o++;e.splice(o,0,t)}(this.state.overlays,{mode:o,modeSpec:t,opaque:r&&r.opaque,priority:r&&r.priority||0},(function(e){return e.priority})),this.state.modeGen++,bo(this)})),removeOverlay:li((function(e){for(var t=this.state.overlays,r=0;r<t.length;++r){var o=t[r].modeSpec;if(o==e||"string"==typeof e&&o.name==e)return t.splice(r,1),this.state.modeGen++,void bo(this)}})),indentLine:li((function(e,t,r){"string"!=typeof t&&"number"!=typeof t&&(t=null==t?this.options.smartIndent?"smart":"prev":t?"add":"subtract"),it(this.doc,e)&&Ra(this,e,t,r)})),indentSelection:li((function(e){for(var t=this.doc.sel.ranges,r=-1,o=0;o<t.length;o++){var i=t[o];if(i.empty())i.head.line>r&&(Ra(this,i.head.line,e,!0),r=i.head.line,o==this.doc.sel.primIndex&&Do(this));else{var n=i.from(),a=i.to(),l=Math.max(r,n.line);r=Math.min(this.lastLine(),a.line-(a.ch?0:1))+1;for(var s=l;s<r;++s)Ra(this,s,e);var d=this.doc.sel.ranges;0==n.ch&&t.length==d.length&&d[o].from().ch>0&&tn(this.doc,o,new Oi(n,d[o].to()),G)}}})),getTokenAt:function(e,t){return Ct(this,e,t)},getLineTokens:function(e,t){return Ct(this,at(e),t,!0)},getTokenTypeAt:function(e){e=ht(this.doc,e);var t,r=yt(this,Xe(this.doc,e.line)),o=0,i=(r.length-1)/2,n=e.ch;if(0==n)t=r[2];else for(;;){var a=o+i>>1;if((a?r[2*a-1]:0)>=n)i=a;else{if(!(r[2*a+1]<n)){t=r[2*a+2];break}o=a+1}}var l=t?t.indexOf("overlay "):-1;return l<0?t:0==l?null:t.slice(0,l-1)},getModeAt:function(t){var r=this.doc.mode;return r.innerMode?e.innerMode(r,this.getTokenAt(t).state).mode:r},getHelper:function(e,t){return this.getHelpers(e,t)[0]},getHelpers:function(e,t){var o=[];if(!r.hasOwnProperty(t))return o;var i=r[t],n=this.getModeAt(e);if("string"==typeof n[t])i[n[t]]&&o.push(i[n[t]]);else if(n[t])for(var a=0;a<n[t].length;a++){var l=i[n[t][a]];l&&o.push(l)}else n.helperType&&i[n.helperType]?o.push(i[n.helperType]):i[n.name]&&o.push(i[n.name]);for(var s=0;s<i._global.length;s++){var d=i._global[s];d.pred(n,this)&&-1==V(o,d.val)&&o.push(d.val)}return o},getStateAfter:function(e,t){var r=this.doc;return vt(this,(e=pt(r,null==e?r.first+r.size-1:e))+1,t).state},cursorCoords:function(e,t){var r=this.doc.sel.primary();return Xr(this,null==e?r.head:"object"==typeof e?ht(this.doc,e):e?r.from():r.to(),t||"page")},charCoords:function(e,t){return Yr(this,ht(this.doc,e),t||"page")},coordsChar:function(e,t){return to(this,(e=Qr(this,e,t||"page")).left,e.top)},lineAtHeight:function(e,t){return e=Qr(this,{top:e,left:0},t||"page").top,ot(this.doc,e+this.display.viewOffset)},heightAtLine:function(e,t,r){var o,i=!1;if("number"==typeof e){var n=this.doc.first+this.doc.size-1;e<this.doc.first?e=this.doc.first:e>n&&(e=n,i=!0),o=Xe(this.doc,e)}else o=e;return Jr(this,o,{top:0,left:0},t||"page",r||i).top+(i?this.doc.height-Jt(o):0)},defaultTextHeight:function(){return so(this.display)},defaultCharWidth:function(){return co(this.display)},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(e,t,r,o,i){var n,a=this.display,l=(e=Xr(this,ht(this.doc,e))).bottom,s=e.left;if(t.style.position="absolute",t.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(t),a.sizer.appendChild(t),"over"==o)l=e.top;else if("above"==o||"near"==o){var d=Math.max(a.wrapper.clientHeight,this.doc.height),c=Math.max(a.sizer.clientWidth,a.lineSpace.clientWidth);("above"==o||e.bottom+t.offsetHeight>d)&&e.top>t.offsetHeight?l=e.top-t.offsetHeight:e.bottom+t.offsetHeight<=d&&(l=e.bottom),s+t.offsetWidth>c&&(s=c-t.offsetWidth)}t.style.top=l+"px",t.style.left=t.style.right="","right"==i?(s=a.sizer.clientWidth-t.offsetWidth,t.style.right="0px"):("left"==i?s=0:"middle"==i&&(s=(a.sizer.clientWidth-t.offsetWidth)/2),t.style.left=s+"px"),r&&(null!=(n=No(this,{left:s,top:l,right:s+t.offsetWidth,bottom:l+t.offsetHeight})).scrollTop&&Bo(this,n.scrollTop),null!=n.scrollLeft&&Ko(this,n.scrollLeft))},triggerOnKeyDown:li(ga),triggerOnKeyPress:li(fa),triggerOnKeyUp:ma,triggerOnMouseDown:li(xa),execCommand:function(e){if(na.hasOwnProperty(e))return na[e].call(null,this)},triggerElectric:li((function(e){Pa(this,e)})),findPosH:function(e,t,r,o){var i=1;t<0&&(i=-1,t=-t);for(var n=ht(this.doc,e),a=0;a<t&&!(n=Wa(this.doc,n,i,r,o)).hitSide;++a);return n},moveH:li((function(e,t){var r=this;this.extendSelectionsBy((function(o){return r.display.shift||r.doc.extend||o.empty()?Wa(r.doc,o.head,e,t,r.options.rtlMoveVisually):e<0?o.from():o.to()}),Q)})),deleteH:li((function(e,t){var r=this.doc.sel,o=this.doc;r.somethingSelected()?o.replaceSelection("",null,"+delete"):ta(this,(function(r){var i=Wa(o,r.head,e,t,!1);return e<0?{from:i,to:r.head}:{from:r.head,to:i}}))})),findPosV:function(e,t,r,o){var i=1,n=o;t<0&&(i=-1,t=-t);for(var a=ht(this.doc,e),l=0;l<t;++l){var s=Xr(this,a,"div");if(null==n?n=s.left:s.left=n,(a=Ka(this,s,i,r)).hitSide)break}return a},moveV:li((function(e,t){var r=this,o=this.doc,i=[],n=!this.display.shift&&!o.extend&&o.sel.somethingSelected();if(o.extendSelectionsBy((function(a){if(n)return e<0?a.from():a.to();var l=Xr(r,a.head,"div");null!=a.goalColumn&&(l.left=a.goalColumn),i.push(l.left);var s=Ka(r,l,e,t);return"page"==t&&a==o.sel.primary()&&zo(r,Yr(r,s,"div").top-l.top),s}),Q),i.length)for(var a=0;a<o.sel.ranges.length;a++)o.sel.ranges[a].goalColumn=i[a]})),findWordAt:function(e){var t=Xe(this.doc,e.line).text,r=e.ch,o=e.ch;if(t){var i=this.getHelper(e,"wordChars");"before"!=e.sticky&&o!=t.length||!r?++o:--r;for(var n=t.charAt(r),a=ae(n,i)?function(e){return ae(e,i)}:/\s/.test(n)?function(e){return/\s/.test(e)}:function(e){return!/\s/.test(e)&&!ae(e)};r>0&&a(t.charAt(r-1));)--r;for(;o<t.length&&a(t.charAt(o));)++o}return new Oi(at(e.line,r),at(e.line,o))},toggleOverwrite:function(e){null!=e&&e==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?F(this.display.cursorDiv,"CodeMirror-overwrite"):T(this.display.cursorDiv,"CodeMirror-overwrite"),xe(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==R(P(this))},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:li((function(e,t){Po(this,e,t)})),getScrollInfo:function(){var e=this.display.scroller;return{left:e.scrollLeft,top:e.scrollTop,height:e.scrollHeight-Mr(this)-this.display.barHeight,width:e.scrollWidth-Mr(this)-this.display.barWidth,clientHeight:Rr(this),clientWidth:Ir(this)}},scrollIntoView:li((function(e,t){null==e?(e={from:this.doc.sel.primary().head,to:null},null==t&&(t=this.options.cursorScrollMargin)):"number"==typeof e?e={from:at(e,0),to:null}:null==e.from&&(e={from:e,to:null}),e.to||(e.to=e.from),e.margin=t||0,null!=e.from.line?function(e,t){Ho(e),e.curOp.scrollToPos=t}(this,e):Uo(this,e.from,e.to,e.margin)})),setSize:li((function(e,t){var r=this,o=function(e){return"number"==typeof e||/^\d+$/.test(e+"")?e+"px":e};null!=e&&(this.display.wrapper.style.width=o(e)),null!=t&&(this.display.wrapper.style.height=o(t)),this.options.lineWrapping&&jr(this);var i=this.display.viewFrom;this.doc.iter(i,this.display.viewTo,(function(e){if(e.widgets)for(var t=0;t<e.widgets.length;t++)if(e.widgets[t].noHScroll){yo(r,i,"widget");break}++i})),this.curOp.forceUpdate=!0,xe(this,"refresh",this)})),operation:function(e){return ni(this,e)},startOperation:function(){return Xo(this)},endOperation:function(){return $o(this)},refresh:li((function(){var e=this.display.cachedTextHeight;bo(this),this.curOp.forceUpdate=!0,Vr(this),Po(this,this.doc.scrollLeft,this.doc.scrollTop),mi(this.display),(null==e||Math.abs(e-so(this.display))>.5||this.options.lineWrapping)&&go(this),xe(this,"refresh",this)})),swapDoc:li((function(e){var t=this.doc;return t.cm=null,this.state.selectingText&&this.state.selectingText(),Bi(this,e),Vr(this),this.display.input.reset(),Po(this,e.scrollLeft,e.scrollTop),this.curOp.forceScroll=!0,hr(this,"swapDoc",this,t),t})),phrase:function(e){var t=this.options.phrases;return t&&Object.prototype.hasOwnProperty.call(t,e)?t[e]:e},getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},Ce(e),e.registerHelper=function(t,o,i){r.hasOwnProperty(t)||(r[t]=e[t]={_global:[]}),r[t][o]=i},e.registerGlobalHelper=function(t,o,i,n){e.registerHelper(t,o,n),r[t]._global.push({pred:i,val:n})}}(Ma);var Qa="iter insert remove copy getEditor constructor".split(" ");for(var Ya in zn.prototype)zn.prototype.hasOwnProperty(Ya)&&V(Qa,Ya)<0&&(Ma.prototype[Ya]=function(e){return function(){return e.apply(this.doc,arguments)}}(zn.prototype[Ya]));return Ce(zn),Ma.inputStyles={textarea:Ja,contenteditable:ja},Ma.defineMode=function(e){Ma.defaults.mode||"null"==e||(Ma.defaults.mode=e),Ke.apply(this,arguments)},Ma.defineMIME=function(e,t){We[e]=t},Ma.defineMode("null",(function(){return{token:function(e){return e.skipToEnd()}}})),Ma.defineMIME("text/plain","null"),Ma.defineExtension=function(e,t){Ma.prototype[e]=t},Ma.defineDocExtension=function(e,t){zn.prototype[e]=t},Ma.fromTextArea=function(e,t){if((t=t?W(t):{}).value=e.value,!t.tabindex&&e.tabIndex&&(t.tabindex=e.tabIndex),!t.placeholder&&e.placeholder&&(t.placeholder=e.placeholder),null==t.autofocus){var r=R(H(e));t.autofocus=r==e||null!=e.getAttribute("autofocus")&&r==document.body}function o(){e.value=l.getValue()}var i;if(e.form&&(be(e.form,"submit",o),!t.leaveSubmitMethodAlone)){var n=e.form;i=n.submit;try{var a=n.submit=function(){o(),n.submit=i,n.submit(),n.submit=a}}catch(e){}}t.finishInit=function(r){r.save=o,r.getTextArea=function(){return e},r.toTextArea=function(){r.toTextArea=isNaN,o(),e.parentNode.removeChild(r.getWrapperElement()),e.style.display="",e.form&&(ve(e.form,"submit",o),t.leaveSubmitMethodAlone||"function"!=typeof e.form.submit||(e.form.submit=i))}},e.style.display="none";var l=Ma((function(t){return e.parentNode.insertBefore(t,e.nextSibling)}),t);return l},function(e){e.off=ve,e.on=be,e.wheelEventPixels=Ei,e.Doc=zn,e.splitLines=De,e.countColumn=K,e.findColumn=Y,e.isWordChar=ne,e.Pass=Z,e.signal=xe,e.Line=Xt,e.changeEnd=Ii,e.scrollbarModel=Jo,e.Pos=at,e.cmpPos=lt,e.modes=Be,e.mimeModes=We,e.resolveMode=je,e.getMode=Ve,e.modeExtensions=qe,e.extendMode=Ze,e.copyState=Ge,e.startState=Qe,e.innerMode=Je,e.commands=na,e.keyMap=Zn,e.keyName=$n,e.isModifierKey=Yn,e.lookupKey=Qn,e.normalizeKeyMap=Jn,e.StringStream=Ye,e.SharedTextMarker=In,e.TextMarker=Ln,e.LineWidget=Tn,e.e_preventDefault=Se,e.e_stopPropagation=Ee,e.e_stop=Ae,e.addClass=F,e.contains=I,e.rmClass=T,e.keyNames=Kn}(Ma),Ma.version="5.65.16",Ma},(window||self).CodeMirror=gi(),function(e){var t="CodeMirror-hint-active";function r(e,t){if(this.cm=e,this.options=t,this.widget=null,this.debounce=0,this.tick=0,this.startPos=this.cm.getCursor("start"),this.startLen=this.cm.getLine(this.startPos.line).length-this.cm.getSelection().length,this.options.updateOnCursorActivity){var r=this;e.on("cursorActivity",this.activityFunc=function(){r.cursorActivity()})}}e.showHint=function(e,t,r){if(!t)return e.showHint(r);r&&r.async&&(t.async=!0);var o={hint:t};if(r)for(var i in r)o[i]=r[i];return e.showHint(o)},e.defineExtension("showHint",(function(t){t=function(e,t,r){var o=e.options.hintOptions,i={};for(var n in d)i[n]=d[n];if(o)for(var n in o)void 0!==o[n]&&(i[n]=o[n]);if(r)for(var n in r)void 0!==r[n]&&(i[n]=r[n]);return i.hint.resolve&&(i.hint=i.hint.resolve(e,t)),i}(this,this.getCursor("start"),t);var o=this.listSelections();if(!(o.length>1)){if(this.somethingSelected()){if(!t.hint.supportsSelection)return;for(var i=0;i<o.length;i++)if(o[i].head.line!=o[i].anchor.line)return}this.state.completionActive&&this.state.completionActive.close();var n=this.state.completionActive=new r(this,t);n.options.hint&&(e.signal(this,"startCompletion",this),n.update(!0))}})),e.defineExtension("closeHint",(function(){this.state.completionActive&&this.state.completionActive.close()}));var o=window.requestAnimationFrame||function(e){return setTimeout(e,1e3/60)},i=window.cancelAnimationFrame||clearTimeout;function n(e){return"string"==typeof e?e:e.text}function a(e,t){for(;t&&t!=e;){if("LI"===t.nodeName.toUpperCase()&&t.parentNode==e)return t;t=t.parentNode}}function l(r,o){this.id="cm-complete-"+Math.floor(Math.random(1e6)),this.completion=r,this.data=o,this.picked=!1;var i=this,l=r.cm,s=l.getInputField().ownerDocument,d=s.defaultView||s.parentWindow,c=this.hints=s.createElement("ul");c.setAttribute("role","listbox"),c.setAttribute("aria-expanded","true"),c.id=this.id;var u=r.cm.options.theme;c.className="CodeMirror-hints "+u,this.selectedHint=o.selectedHint||0;for(var p=o.list,h=0;h<p.length;++h){var g=c.appendChild(s.createElement("li")),m=p[h],f="CodeMirror-hint"+(h!=this.selectedHint?"":" "+t);null!=m.className&&(f=m.className+" "+f),g.className=f,h==this.selectedHint&&g.setAttribute("aria-selected","true"),g.id=this.id+"-"+h,g.setAttribute("role","option"),m.render?m.render(g,o,m):g.appendChild(s.createTextNode(m.displayText||n(m))),g.hintId=h}var b=r.options.container||s.body,y=l.cursorCoords(r.options.alignWithWord?o.from:null),v=y.left,x=y.bottom,w=!0,k=0,_=0;if(b!==s.body){var C=-1!==["absolute","relative","fixed"].indexOf(d.getComputedStyle(b).position)?b:b.offsetParent,S=C.getBoundingClientRect(),E=s.body.getBoundingClientRect();k=S.left-E.left-C.scrollLeft,_=S.top-E.top-C.scrollTop}c.style.left=v-k+"px",c.style.top=x-_+"px";var T=d.innerWidth||Math.max(s.body.offsetWidth,s.documentElement.offsetWidth),A=d.innerHeight||Math.max(s.body.offsetHeight,s.documentElement.offsetHeight);b.appendChild(c),l.getInputField().setAttribute("aria-autocomplete","list"),l.getInputField().setAttribute("aria-owns",this.id),l.getInputField().setAttribute("aria-activedescendant",this.id+"-"+this.selectedHint);var O,L=r.options.moveOnOverlap?c.getBoundingClientRect():new DOMRect,M=!!r.options.paddingForScrollbar&&c.scrollHeight>c.clientHeight+1;if(setTimeout((function(){O=l.getScrollInfo()})),L.bottom-A>0){var I=L.bottom-L.top,R=L.top-(y.bottom-y.top)-2;A-L.top<R?(I>R&&(c.style.height=(I=R)+"px"),c.style.top=(x=y.top-I)+_+"px",w=!1):c.style.height=A-L.top-2+"px"}var F,N=L.right-T;if(M&&(N+=l.display.nativeBarWidth),N>0&&(L.right-L.left>T&&(c.style.width=T-5+"px",N-=L.right-L.left-T),c.style.left=(v=Math.max(y.left-N-k,0))+"px"),M)for(var z=c.firstChild;z;z=z.nextSibling)z.style.paddingRight=l.display.nativeBarWidth+"px";l.addKeyMap(this.keyMap=function(e,t){var r={Up:function(){t.moveFocus(-1)},Down:function(){t.moveFocus(1)},PageUp:function(){t.moveFocus(1-t.menuSize(),!0)},PageDown:function(){t.moveFocus(t.menuSize()-1,!0)},Home:function(){t.setFocus(0)},End:function(){t.setFocus(t.length-1)},Enter:t.pick,Tab:t.pick,Esc:t.close};/Mac/.test(navigator.platform)&&(r["Ctrl-P"]=function(){t.moveFocus(-1)},r["Ctrl-N"]=function(){t.moveFocus(1)});var o=e.options.customKeys,i=o?{}:r;function n(e,o){var n;n="string"!=typeof o?function(e){return o(e,t)}:r.hasOwnProperty(o)?r[o]:o,i[e]=n}if(o)for(var a in o)o.hasOwnProperty(a)&&n(a,o[a]);var l=e.options.extraKeys;if(l)for(var a in l)l.hasOwnProperty(a)&&n(a,l[a]);return i}(r,{moveFocus:function(e,t){i.changeActive(i.selectedHint+e,t)},setFocus:function(e){i.changeActive(e)},menuSize:function(){return i.screenAmount()},length:p.length,close:function(){r.close()},pick:function(){i.pick()},data:o})),r.options.closeOnUnfocus&&(l.on("blur",this.onBlur=function(){F=setTimeout((function(){r.close()}),100)}),l.on("focus",this.onFocus=function(){clearTimeout(F)})),l.on("scroll",this.onScroll=function(){var e=l.getScrollInfo(),t=l.getWrapperElement().getBoundingClientRect();O||(O=l.getScrollInfo());var o=x+O.top-e.top,i=o-(d.pageYOffset||(s.documentElement||s.body).scrollTop);if(w||(i+=c.offsetHeight),i<=t.top||i>=t.bottom)return r.close();c.style.top=o+"px",c.style.left=v+O.left-e.left+"px"}),e.on(c,"dblclick",(function(e){var t=a(c,e.target||e.srcElement);t&&null!=t.hintId&&(i.changeActive(t.hintId),i.pick())})),e.on(c,"click",(function(e){var t=a(c,e.target||e.srcElement);t&&null!=t.hintId&&(i.changeActive(t.hintId),r.options.completeOnSingleClick&&i.pick())})),e.on(c,"mousedown",(function(){setTimeout((function(){l.focus()}),20)}));var D=this.getSelectedHintRange();return 0===D.from&&0===D.to||this.scrollToActive(),e.signal(o,"select",p[this.selectedHint],c.childNodes[this.selectedHint]),!0}function s(e,t,r,o){if(e.async)e(t,o,r);else{var i=e(t,r);i&&i.then?i.then(o):o(i)}}r.prototype={close:function(){this.active()&&(this.cm.state.completionActive=null,this.tick=null,this.options.updateOnCursorActivity&&this.cm.off("cursorActivity",this.activityFunc),this.widget&&this.data&&e.signal(this.data,"close"),this.widget&&this.widget.close(),e.signal(this.cm,"endCompletion",this.cm))},active:function(){return this.cm.state.completionActive==this},pick:function(t,r){var o=t.list[r],i=this;this.cm.operation((function(){o.hint?o.hint(i.cm,t,o):i.cm.replaceRange(n(o),o.from||t.from,o.to||t.to,"complete"),e.signal(t,"pick",o),i.cm.scrollIntoView()})),this.options.closeOnPick&&this.close()},cursorActivity:function(){this.debounce&&(i(this.debounce),this.debounce=0);var e=this.startPos;this.data&&(e=this.data.from);var t=this.cm.getCursor(),r=this.cm.getLine(t.line);if(t.line!=this.startPos.line||r.length-t.ch!=this.startLen-this.startPos.ch||t.ch<e.ch||this.cm.somethingSelected()||!t.ch||this.options.closeCharacters.test(r.charAt(t.ch-1)))this.close();else{var n=this;this.debounce=o((function(){n.update()})),this.widget&&this.widget.disable()}},update:function(e){if(null!=this.tick){var t=this,r=++this.tick;s(this.options.hint,this.cm,this.options,(function(o){t.tick==r&&t.finishUpdate(o,e)}))}},finishUpdate:function(t,r){this.data&&e.signal(this.data,"update");var o=this.widget&&this.widget.picked||r&&this.options.completeSingle;this.widget&&this.widget.close(),this.data=t,t&&t.list.length&&(o&&1==t.list.length?this.pick(t,0):(this.widget=new l(this,t),e.signal(t,"shown")))}},l.prototype={close:function(){if(this.completion.widget==this){this.completion.widget=null,this.hints.parentNode&&this.hints.parentNode.removeChild(this.hints),this.completion.cm.removeKeyMap(this.keyMap);var e=this.completion.cm.getInputField();e.removeAttribute("aria-activedescendant"),e.removeAttribute("aria-owns");var t=this.completion.cm;this.completion.options.closeOnUnfocus&&(t.off("blur",this.onBlur),t.off("focus",this.onFocus)),t.off("scroll",this.onScroll)}},disable:function(){this.completion.cm.removeKeyMap(this.keyMap);var e=this;this.keyMap={Enter:function(){e.picked=!0}},this.completion.cm.addKeyMap(this.keyMap)},pick:function(){this.completion.pick(this.data,this.selectedHint)},changeActive:function(r,o){if(r>=this.data.list.length?r=o?this.data.list.length-1:0:r<0&&(r=o?0:this.data.list.length-1),this.selectedHint!=r){var i=this.hints.childNodes[this.selectedHint];i&&(i.className=i.className.replace(" "+t,""),i.removeAttribute("aria-selected")),(i=this.hints.childNodes[this.selectedHint=r]).className+=" "+t,i.setAttribute("aria-selected","true"),this.completion.cm.getInputField().setAttribute("aria-activedescendant",i.id),this.scrollToActive(),e.signal(this.data,"select",this.data.list[this.selectedHint],i)}},scrollToActive:function(){var e=this.getSelectedHintRange(),t=this.hints.childNodes[e.from],r=this.hints.childNodes[e.to],o=this.hints.firstChild;t.offsetTop<this.hints.scrollTop?this.hints.scrollTop=t.offsetTop-o.offsetTop:r.offsetTop+r.offsetHeight>this.hints.scrollTop+this.hints.clientHeight&&(this.hints.scrollTop=r.offsetTop+r.offsetHeight-this.hints.clientHeight+o.offsetTop)},screenAmount:function(){return Math.floor(this.hints.clientHeight/this.hints.firstChild.offsetHeight)||1},getSelectedHintRange:function(){var e=this.completion.options.scrollMargin||0;return{from:Math.max(0,this.selectedHint-e),to:Math.min(this.data.list.length-1,this.selectedHint+e)}}},e.registerHelper("hint","auto",{resolve:function(t,r){var o,i=t.getHelpers(r,"hint");if(i.length){var n=function(e,t,r){var o=function(e,t){if(!e.somethingSelected())return t;for(var r=[],o=0;o<t.length;o++)t[o].supportsSelection&&r.push(t[o]);return r}(e,i);!function i(n){if(n==o.length)return t(null);s(o[n],e,r,(function(e){e&&e.list.length>0?t(e):i(n+1)}))}(0)};return n.async=!0,n.supportsSelection=!0,n}return(o=t.getHelper(t.getCursor(),"hintWords"))?function(t){return e.hint.fromList(t,{words:o})}:e.hint.anyword?function(t,r){return e.hint.anyword(t,r)}:function(){}}}),e.registerHelper("hint","fromList",(function(t,r){var o,i=t.getCursor(),n=t.getTokenAt(i),a=e.Pos(i.line,n.start),l=i;n.start<i.ch&&/\w/.test(n.string.charAt(i.ch-n.start-1))?o=n.string.substr(0,i.ch-n.start):(o="",a=i);for(var s=[],d=0;d<r.words.length;d++){var c=r.words[d];c.slice(0,o.length)==o&&s.push(c)}if(s.length)return{list:s,from:a,to:l}})),e.commands.autocomplete=e.showHint;var d={hint:e.hint.auto,completeSingle:!0,alignWithWord:!0,closeCharacters:/[\s()\[\]{};:>,]/,closeOnPick:!0,closeOnUnfocus:!0,updateOnCursorActivity:!0,completeOnSingleClick:!0,container:null,customKeys:null,extraKeys:null,paddingForScrollbar:!0,moveOnOverlap:!0};e.defineOption("hintOptions",null)}(CodeMirror),function(e){function t(t,r,i,n){if(i&&i.call){var a=i;i=null}else a=o(t,i,"rangeFinder");"number"==typeof r&&(r=e.Pos(r,0));var l=o(t,i,"minFoldSize");function s(e){var o=a(t,r);if(!o||o.to.line-o.from.line<l)return null;if("fold"===n)return o;for(var i=t.findMarksAt(o.from),s=0;s<i.length;++s)if(i[s].__isFold){if(!e)return null;o.cleared=!0,i[s].clear()}return o}var d=s(!0);if(o(t,i,"scanUp"))for(;!d&&r.line>t.firstLine();)r=e.Pos(r.line-1,0),d=s(!1);if(d&&!d.cleared&&"unfold"!==n){var c=function(e,t,r){var i=o(e,t,"widget");if("function"==typeof i&&(i=i(r.from,r.to)),"string"==typeof i){var n=document.createTextNode(i);(i=document.createElement("span")).appendChild(n),i.className="CodeMirror-foldmarker"}else i&&(i=i.cloneNode(!0));return i}(t,i,d);e.on(c,"mousedown",(function(t){u.clear(),e.e_preventDefault(t)}));var u=t.markText(d.from,d.to,{replacedWith:c,clearOnEnter:o(t,i,"clearOnEnter"),__isFold:!0});u.on("clear",(function(r,o){e.signal(t,"unfold",t,r,o)})),e.signal(t,"fold",t,d.from,d.to)}}e.newFoldFunction=function(e,r){return function(o,i){t(o,i,{rangeFinder:e,widget:r})}},e.defineExtension("foldCode",(function(e,r,o){t(this,e,r,o)})),e.defineExtension("isFolded",(function(e){for(var t=this.findMarksAt(e),r=0;r<t.length;++r)if(t[r].__isFold)return!0})),e.commands.toggleFold=function(e){e.foldCode(e.getCursor())},e.commands.fold=function(e){e.foldCode(e.getCursor(),null,"fold")},e.commands.unfold=function(e){e.foldCode(e.getCursor(),{scanUp:!1},"unfold")},e.commands.foldAll=function(t){t.operation((function(){for(var r=t.firstLine(),o=t.lastLine();r<=o;r++)t.foldCode(e.Pos(r,0),{scanUp:!1},"fold")}))},e.commands.unfoldAll=function(t){t.operation((function(){for(var r=t.firstLine(),o=t.lastLine();r<=o;r++)t.foldCode(e.Pos(r,0),{scanUp:!1},"unfold")}))},e.registerHelper("fold","combine",(function(){var e=Array.prototype.slice.call(arguments,0);return function(t,r){for(var o=0;o<e.length;++o){var i=e[o](t,r);if(i)return i}}})),e.registerHelper("fold","auto",(function(e,t){for(var r=e.getHelpers(t,"fold"),o=0;o<r.length;o++){var i=r[o](e,t);if(i)return i}}));var r={rangeFinder:e.fold.auto,widget:"↔",minFoldSize:0,scanUp:!1,clearOnEnter:!0};function o(e,t,o){if(t&&void 0!==t[o])return t[o];var i=e.options.foldOptions;return i&&void 0!==i[o]?i[o]:r[o]}e.defineOption("foldOptions",null),e.defineExtension("foldOption",(function(e,t){return o(this,e,t)}))}(CodeMirror),function(e){var t={},r=/[^\s\u00a0]/,o=e.Pos,i=e.cmpPos;function n(e){var t=e.search(r);return-1==t?0:t}function a(e,t){var r=e.getMode();return!1!==r.useInnerComments&&r.innerMode?e.getModeAt(t):r}e.commands.toggleComment=function(e){e.toggleComment()},e.defineExtension("toggleComment",(function(e){e||(e=t);for(var r=this,i=1/0,n=this.listSelections(),a=null,l=n.length-1;l>=0;l--){var s=n[l].from(),d=n[l].to();s.line>=i||(d.line>=i&&(d=o(i,0)),i=s.line,null==a?r.uncomment(s,d,e)?a="un":(r.lineComment(s,d,e),a="line"):"un"==a?r.uncomment(s,d,e):r.lineComment(s,d,e))}})),e.defineExtension("lineComment",(function(e,i,l){l||(l=t);var s=this,d=a(s,e),c=s.getLine(e.line);if(null!=c&&(u=e,p=c,!/\bstring\b/.test(s.getTokenTypeAt(o(u.line,0)))||/^[\'\"\`]/.test(p))){var u,p,h=l.lineComment||d.lineComment;if(h){var g=Math.min(0!=i.ch||i.line==e.line?i.line+1:i.line,s.lastLine()+1),m=null==l.padding?" ":l.padding,f=l.commentBlankLines||e.line==i.line;s.operation((function(){if(l.indent){for(var t=null,i=e.line;i<g;++i){var a=-1===(d=s.getLine(i)).search(r)?d:d.slice(0,n(d));(null==t||t.length>a.length)&&(t=a)}for(i=e.line;i<g;++i){var d=s.getLine(i),c=t.length;(f||r.test(d))&&(d.slice(0,c)!=t&&(c=n(d)),s.replaceRange(t+h+m,o(i,0),o(i,c)))}}else for(i=e.line;i<g;++i)(f||r.test(s.getLine(i)))&&s.replaceRange(h+m,o(i,0))}))}else(l.blockCommentStart||d.blockCommentStart)&&(l.fullLines=!0,s.blockComment(e,i,l))}})),e.defineExtension("blockComment",(function(e,n,l){l||(l=t);var s=this,d=a(s,e),c=l.blockCommentStart||d.blockCommentStart,u=l.blockCommentEnd||d.blockCommentEnd;if(c&&u){if(!/\bcomment\b/.test(s.getTokenTypeAt(o(e.line,0)))){var p=Math.min(n.line,s.lastLine());p!=e.line&&0==n.ch&&r.test(s.getLine(p))&&--p;var h=null==l.padding?" ":l.padding;e.line>p||s.operation((function(){if(0!=l.fullLines){var t=r.test(s.getLine(p));s.replaceRange(h+u,o(p)),s.replaceRange(c+h,o(e.line,0));var a=l.blockCommentLead||d.blockCommentLead;if(null!=a)for(var g=e.line+1;g<=p;++g)(g!=p||t)&&s.replaceRange(a+h,o(g,0))}else{var m=0==i(s.getCursor("to"),n),f=!s.somethingSelected();s.replaceRange(u,n),m&&s.setSelection(f?n:s.getCursor("from"),n),s.replaceRange(c,e)}}))}}else(l.lineComment||d.lineComment)&&0!=l.fullLines&&s.lineComment(e,n,l)})),e.defineExtension("uncomment",(function(e,i,n){n||(n=t);var l,s=this,d=a(s,e),c=Math.min(0!=i.ch||i.line==e.line?i.line:i.line-1,s.lastLine()),u=Math.min(e.line,c),p=n.lineComment||d.lineComment,h=[],g=null==n.padding?" ":n.padding;e:if(p){for(var m=u;m<=c;++m){var f=s.getLine(m),b=f.indexOf(p);if(b>-1&&!/comment/.test(s.getTokenTypeAt(o(m,b+1)))&&(b=-1),-1==b&&r.test(f))break e;if(b>-1&&r.test(f.slice(0,b)))break e;h.push(f)}if(s.operation((function(){for(var e=u;e<=c;++e){var t=h[e-u],r=t.indexOf(p),i=r+p.length;r<0||(t.slice(i,i+g.length)==g&&(i+=g.length),l=!0,s.replaceRange("",o(e,r),o(e,i)))}})),l)return!0}var y=n.blockCommentStart||d.blockCommentStart,v=n.blockCommentEnd||d.blockCommentEnd;if(!y||!v)return!1;var x=n.blockCommentLead||d.blockCommentLead,w=s.getLine(u),k=w.indexOf(y);if(-1==k)return!1;var _=c==u?w:s.getLine(c),C=_.indexOf(v,c==u?k+y.length:0),S=o(u,k+1),E=o(c,C+1);if(-1==C||!/comment/.test(s.getTokenTypeAt(S))||!/comment/.test(s.getTokenTypeAt(E))||s.getRange(S,E,"\n").indexOf(v)>-1)return!1;var T=w.lastIndexOf(y,e.ch),A=-1==T?-1:w.slice(0,e.ch).indexOf(v,T+y.length);if(-1!=T&&-1!=A&&A+v.length!=e.ch)return!1;A=_.indexOf(v,i.ch);var O=_.slice(i.ch).lastIndexOf(y,A-i.ch);return T=-1==A||-1==O?-1:i.ch+O,(-1==A||-1==T||T==i.ch)&&(s.operation((function(){s.replaceRange("",o(c,C-(g&&_.slice(C-g.length,C)==g?g.length:0)),o(c,C+v.length));var e=k+y.length;if(g&&w.slice(e,e+g.length)==g&&(e+=g.length),s.replaceRange("",o(u,k),o(u,e)),x)for(var t=u+1;t<=c;++t){var i=s.getLine(t),n=i.indexOf(x);if(-1!=n&&!r.test(i.slice(0,n))){var a=n+x.length;g&&i.slice(a,a+g.length)==g&&(a+=g.length),s.replaceRange("",o(t,n),o(t,a))}}})),!0)}))}(CodeMirror),fi.prototype.start=function(e){return this.stream=e,this.line=0,this.string=e.string.slice(e.start),this.startLine=e.string,this.startPos=e.start,this},fi.prototype.startLinebreak=function(){return this.stream=null,this.line=this.startPos=0,this.string="\n",this.startLine="",this},fi.prototype.copy=function(){var e=this.copyInstance||(this.copyInstance=new fi);return e.stream=this.stream,e.startPos=this.startPos,e.line=this.line,e.startLine=this.startLine,e.string=this.string,e},fi.prototype.updateStart=function(){this.startLine=this.stream?0==this.line?this.stream.string:this.stream.lookAhead(this.line):"",this.startPos=this.startLine.length-(this.string.length-1)},fi.prototype.ahead=function(e){for(;;){if(e<=this.string.length)return!0;if(10!==this.string.charCodeAt(this.string.length-1))this.string+="\n";else{if(3===this.line||!this.stream||!this.stream.lookAhead)return!1;var t=this.stream.lookAhead(this.line+1);if(null==t)return!1;this.string+=t+"\n",this.line++}}};var bi=null;function yi(e,t){this.State=function(e,t){function r(e,t){this.stack=e,this.context=t}function o(){return null}return r.prototype.matchNext=function(t,r,o,i){for(var n=this.stack.length-1,a=this.stack[n],l=e.nodes[a],s=0;s<l.length;s++){var d,c,u=l[s];if(0===u)d=r,c=l[++s];else{if(1===u||2===u){var p=l[++s],h=l[++s];this.go(h);var g=this.context;if(2===u){var m=l[++s];this.context=new mi(m.name,m.token,this.stack.length,this.context,t.startLine,t.startPos)}this.stack.push(p);var f=this.matchNext(t,r,0,!1);if(f===r&&(f=this.matchNext(t,r,s==l.length-1?o:0,i)),f<0){this.stack.length=n+1,this.stack[n]=a,this.context=g;continue}return f}if(3===u){var b=l[++s];d=this.matchExpr(l[++s],t,r),c=l[++s],d>r&&(bi=b)}else d=this.matchExpr(u,t,r),c=l[++s]}if(d<0){if(!(o>0&&s==l.length-1))continue;o--,d=r}if(this.go(c),!i&&-1===c||0===this.stack.length)return d;if(d>r)return d;if((d=this.matchNext(t,r,s==l.length-1?o:0,i))>=0)return d;this.stack.length=n+1,this.stack[n]=a}return-1},r.prototype.go=function(e){for(this.stack.pop();this.context&&this.context.depth>this.stack.length;)this.context=this.context.parent;-1!==e&&this.stack.push(e)},r.prototype.runMaybe=function(e,t,r){return bi=null,this.matchNext(e,t,r,!0)},r.prototype.forward=function(t,r){var o=this.runMaybe(t,r,2);return o<0&&(this.stack.push(e.token),o=this.runMaybe(t,r,0)),o},r.prototype.lookahead=function(e,t,r){var o=bi,i=new this.constructor([r],null);for(e=e.copy();;){e.updateStart();var n=i.runMaybe(e,t,0);if(n<0)return bi=o,!1;if(0===i.stack.length)return bi=o,!0;t=n}},r.prototype.matchExpr=function(e,r,i){if("string"==typeof e){var n=i+e.length;return r.ahead(n)&&r.string.slice(i,n)===e?n:-1}if(e.exec){var a=r.ahead(i+1)&&e.exec(i>0?r.string.slice(i):r.string);return a?i+a[0].length:-1}var l,s=e[0];if(0===s){for(var d=1;d<e.length;d++)if((i=this.matchExpr(e[d],r,i))<0)return-1;return i}if(1===s){d=1;for(var c=e.length-1;;d++){var u=this.matchExpr(e[d],r,i);if(d===c||u>-1)return u}return-1}if(2!==s&&3!==s){if(4===s)return Math.max(this.matchExpr(e[1],r,i),i);if(5===s)return this.lookahead(r,i,e[1])?i:-1;if(6===s)return this.lookahead(r,i,e[1])?-1:i;if(7===s){var p,h,g=i?r.string.lastIndexOf("\n",i-1):-1;if(r.stream&&g<0)p=r.stream.string,h=i+r.stream.start;else{var m=r.string.indexOf("\n",i);p=r.string.slice(g+1,m<0?r.string.length:m),h=i-(g+1)}return t.predicates[e[1]](p,h,this.context,r.stream?(l=r.stream,function(e){return l.lookAhead(e)}):o)?i:-1}throw Error("Unknown match type "+e)}if(3===s&&(i=this.matchExpr(e[1],r,i))<0)return-1;for(;;){var f=this.matchExpr(e[1],r,i);if(-1==f)return i;i=f}},r.prototype.contextAt=function(e,t){var r=this.copy(),o=new fi,i=0,n=this.context;for(o.string=e+"\n",o.startLine=e;;){var a=r.runMaybe(o,i,0);if(-1==a)return r.context;if(a>t){var l=r.context;if(i==t)e:for(;l;){for(var s=n;s;s=s.parent)if(s===l)break e;l=l.parent}return l}i=a,n=r.context}},r.prototype.copy=function(){return new this.constructor(this.stack.slice(),this.context)},r.start=function(){return new this([e.start],null)},r}(e,t||{}),this.mcx=new fi}CodeMirror.GrammarMode=yi,yi.prototype.startState=function(){return this.State.start()},yi.prototype.copyState=function(e){return e.copy()},yi.prototype.token=function(e,t){e.pos+=t.forward(this.mcx.start(e),0);for(var r=bi,o=t.context;o;o=o.parent)o.tokenType&&(r=o.tokenType+(r?" "+r:""));return e.eol()&&t.forward(this.mcx,e.pos-e.start),r},yi.prototype.blankLine=function(e){e.forward(this.mcx.startLinebreak(),0)},function(e,t){!function(e){var t=function(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}(e),r=[/^(?:var|let|const)(?![a-zA-Z¡-￿_0-9_\$])/,/^while(?![a-zA-Z¡-￿_0-9_\$])/,/^with(?![a-zA-Z¡-￿_0-9_\$])/,/^do(?![a-zA-Z¡-￿_0-9_\$])/,/^debugger(?![a-zA-Z¡-￿_0-9_\$])/,/^if(?![a-zA-Z¡-￿_0-9_\$])/,/^function(?![a-zA-Z¡-￿_0-9_\$])/,/^for(?![a-zA-Z¡-￿_0-9_\$])/,/^default(?![a-zA-Z¡-￿_0-9_\$])/,/^case(?![a-zA-Z¡-￿_0-9_\$])/,/^return(?![a-zA-Z¡-￿_0-9_\$])/,/^throw(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:break|continue)(?![a-zA-Z¡-￿_0-9_\$])/,/^switch(?![a-zA-Z¡-￿_0-9_\$])/,/^try(?![a-zA-Z¡-￿_0-9_\$])/,/^class(?![a-zA-Z¡-￿_0-9_\$])/,/^export(?![a-zA-Z¡-￿_0-9_\$])/,/^import(?![a-zA-Z¡-￿_0-9_\$])/,[0,"async",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,114]],[1,";",/^(?=\})/,[7,"canInsertSemi"]],/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*/,/^extends(?![a-zA-Z¡-￿_0-9_\$])/,/^from(?![a-zA-Z¡-￿_0-9_\$])/,/^else(?![a-zA-Z¡-￿_0-9_\$])/,/^catch(?![a-zA-Z¡-￿_0-9_\$])/,/^finally(?![a-zA-Z¡-￿_0-9_\$])/,/^as(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:true|false|null|undefined|NaN|Infinity)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:super|this)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:delete|typeof|yield|await|void)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.|\!|\+\+?|\-\-?)/,/^(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:[0-9][0-9_]*(?:\.[0-9_]*)?|\.[0-9_]+)(?:[eE][\+\-]?[0-9_]+)?)/,/^\/(?![\/\*])(?:\\.|\[(?:(?!\]).)*\]|(?!\/).)+\/[gimyus]*/,/^(?:\+\+|\-\-)/,/^(?:(?:\+|\-|\%|\*|\/(?![\/\*])|\>\>?\>?|\<\<?|\=\=?|\&\&?|\|\|?|\^|\!\=)\=?|\?\?)/,/^(?:in|instanceof)(?![a-zA-Z¡-￿_0-9_\$])/,/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\()/,/^(?:\.|\?\.)/,[1,"\n","\t"," "],/^new(?![a-zA-Z¡-￿_0-9_\$])/],o=Object.freeze({__proto__:null,nodes:[[1,6,2],[/^[^]/,0],[1,6,3],[2,7,4,{name:"Statement"},0,1],[1,6,3],[3,"keyword",r[0],-1,3,"keyword",r[1],-1,3,"keyword",r[2],-1,3,"keyword",r[23],-1,3,"keyword",r[3],-1,3,"keyword",r[14],-1,3,"keyword",r[25],-1,3,"keyword",r[10],-1,3,"keyword",r[11],-1,3,"keyword",r[12],-1,3,"keyword",r[4],-1,3,"keyword",r[9],-1,3,"keyword",r[8],-1,3,"keyword",r[6],-1,3,"keyword",r[5],-1,3,"keyword",r[24],-1,3,"keyword",r[7],-1,3,"keyword",r[13],-1,3,"keyword",r[15],-1,3,"keyword",r[16],-1,3,"keyword",r[17],-1,3,"keyword",r[21],-1,3,"keyword",r[18],-1,3,"keyword",r[39],-1,3,"keyword",r[35],-1,3,"keyword",r[29],-1,3,"keyword",r[28],-1,3,"atom",r[27],-1,3,"variable",r[20],-1,3,"operator",r[30],-1,3,"operator",r[34],-1,3,"operator",r[33],-1,2,116,-1,{name:"string",token:"string"},3,"number",r[31],-1,2,121,-1,{name:"comment",token:"comment"},3,"string-2",r[32],-1,1,125,-1,/^[^]/,-1],[r[38],6,2,121,6,{name:"comment",token:"comment"},0,-1],[3,"keyword",r[0],8,3,"keyword",r[1],23,3,"keyword",r[2],23,3,"keyword",r[3],27,2,129,-1,{name:"Block"},";",-1,3,"keyword",r[4],-1,3,"keyword",r[5],35,3,"keyword",r[6],40,3,"keyword",r[7],46,3,"keyword",r[8],48,/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\:)/,48,3,"keyword",r[9],49,3,"keyword",r[10],52,3,"keyword",r[11],56,3,"keyword",r[12],60,3,"keyword",r[13],64,3,"keyword",r[14],68,3,"keyword",r[15],72,3,"keyword",r[16],80,3,"keyword",r[17],92,3,"keyword",r[18],108,"@",110,1,133,112],[1,6,9],[1,139,10],[1,6,11],[3,"operator","=",12,0,13],[1,6,14],[1,6,15],[1,142,13],[",",16,r[19],-1],[1,6,17],[1,139,18],[1,6,19],[3,"operator","=",20,0,21],[1,6,22],[1,6,15],[1,142,21],[1,6,24],[2,146,25,{name:"CondExpr"}],[1,6,26],[2,7,-1,{name:"Statement"}],[1,6,28],[2,7,29,{name:"Statement"}],[1,6,30],[3,"keyword",r[1],31,0,-1],[1,6,32],[2,146,33,{name:"CondExpr"}],[1,6,34],[r[19],-1],[1,6,36],[2,146,37,{name:"CondExpr"}],[1,6,38],[2,7,39,{name:"Statement"}],[2,151,-1,{name:"Alternative"}],[1,6,41],[3,"keyword","*",42,0,42],[1,6,43],[3,"def",r[20],44],[1,6,45],[2,155,-1,{name:"FunctionDef"}],[1,6,47],[2,158,-1,{name:"ForStatement"}],[1,6,50],[1,6,51],[":",-1],[1,133,48],[1,6,53],[r[19],-1,1,133,54],[1,6,55],[r[19],-1],[1,6,57],[1,133,58],[1,6,59],[r[19],-1],[1,6,61],[/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*)?/,62],[1,6,63],[r[19],-1],[1,6,65],[2,146,66,{name:"CondExpr"}],[1,6,67],[2,129,-1,{name:"Block"}],[1,6,69],[2,129,70,{name:"Block"}],[1,6,71],[2,161,-1,{name:"CatchFinally"}],[1,6,73],[3,"type def",r[20],74],[1,6,75],[3,"keyword",r[21],76,0,77],[1,6,78],[1,6,79],[1,133,77],[2,174,-1,{name:"ClassBody"}],[1,6,81],["*",82,3,"keyword",r[8],82,"{",83,2,7,-1,{name:"Statement"}],[1,6,84],[1,6,85],[3,"keyword",r[22],86,0,87],[1,182,88],[1,6,89],[1,6,90],[1,6,91],[2,116,87,{name:"string",token:"string"}],[r[19],-1],["}",82],[1,6,93],[2,116,94,{name:"string",token:"string"},3,"keyword","*",95,1,188,96,"{",97],[1,6,98],[1,6,99],[1,6,100],[1,6,101],[r[19],-1],[3,"keyword",r[26],102,0,96],[3,"keyword",r[22],103,0,94],[1,182,104],[1,6,105],[1,6,106],[1,6,107],[3,"def",r[20],96],[2,116,94,{name:"string",token:"string"}],["}",96],[1,6,109],[2,7,-1,{name:"Statement"}],[1,6,111],[1,133,-1],[1,6,113],[r[19],-1],[1,6,115],[3,"keyword",r[6],-1,/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*|\()/,-1],["'",117,'"',119],["\\",118,/^(?!\')./,117,"'",-1],[/^[^]/,117],["\\",120,/^(?!\")./,119,'"',-1],[/^[^]/,119],[/^\/\*\*(?!\/)/,122,"/*",124,/^\/\/.*/,-1],[1,193,122,0,123],[2,196,123,{name:"doccomment.tagGroup"},"*/",-1],[[0,/^(?!\*\/)/,/^[^]/],124,"*/",-1],[3,"string-2","`",126],[3,"string-2","${",127,2,198,126,{name:"str2",token:"string-2"},3,"string-2",/^(?:(?!\`|\$\{|\\).)+/,126,3,"string-2","`",-1],[1,133,128],[3,"string-2","}",126],["{",130],[1,6,131],[2,7,132,{name:"Statement"},"}",-1],[1,6,131],[1,200,134],[1,6,135],[",",136,1,218,137,0,-1],[1,6,138],[1,6,135],[1,142,137],[3,"operator","...",140,0,140],[1,6,141],[3,"def",r[20],-1,2,233,-1,{name:"ArrayPattern"},2,238,-1,{name:"ObjectPattern"}],[1,200,143],[1,6,144],[1,243,145,0,-1],[1,6,144],["(",147],[1,6,148],[1,133,149],[1,6,150],[")",-1],[1,6,152],[3,"keyword",r[23],153,0,-1],[1,6,154],[2,7,-1,{name:"Statement"}],[2,258,156,{name:"ParamList"}],[1,6,157],[2,129,-1,{name:"Block"}],[2,263,159,{name:"ForSpec"}],[1,6,160],[2,7,-1,{name:"Statement"}],[3,"keyword",r[24],162,0,170],[1,6,163],["(",164,0,165],[1,6,166],[1,6,167],[1,139,168],[2,129,170,{name:"Block"}],[1,6,169],[")",165],[1,6,171],[3,"keyword",r[25],172,0,-1],[1,6,173],[2,129,-1,{name:"Block"}],["{",175],[1,6,176],[3,"keyword",/^static(?![a-zA-Z¡-￿_0-9_\$])/,177,0,177,"@",178,"}",-1],[1,6,179],[1,6,180],[2,274,181,{name:"ObjectMember"}],[1,133,181],[1,6,176],[1,188,183,0,-1],[1,6,184],[",",185,0,-1],[1,6,186],[1,188,187,0,187],[1,6,184],[3,"variable",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= +as)/,189,3,"def",r[20],-1],[1,6,190],[3,"keyword",r[26],191],[1,6,192],[3,"def",r[20],-1],[0,194,2,289,-1,{name:"doccomment.braced"}],[[0,/^(?!\*\/|\@[a-zA-Z¡-￿_0-9]|\{)/,/^[^]/],195],[0,194,0,-1],[1,293,197],[1,193,197,0,-1],["\\",199,"\n",-1],[/^[^]/,-1],[3,"atom",r[27],-1,3,"keyword",r[28],-1,3,"keyword",r[29],201,3,"operator",r[30],201,3,"keyword",r[18],201,2,299,-1,{name:"NewExpression"},3,"keyword",r[6],203,3,"keyword",r[15],209,2,309,-1,{name:"ArrowFunc"},3,"variable callee",r[36],-1,3,"variable",r[20],-1,3,"number",r[31],-1,2,116,-1,{name:"string",token:"string"},3,"string-2",r[32],-1,1,125,-1,2,313,-1,{name:"ArrayLiteral"},2,318,-1,{name:"ObjectLiteral"},2,323,-1,{name:"ParenExpr"}],[1,6,202],[1,200,-1],[1,6,204],[3,"keyword","*",205,0,205],[1,6,206],[3,"def",r[20],207,0,207],[1,6,208],[2,155,-1,{name:"FunctionDef"}],[1,6,210],[[6,328],211,0,212],[3,"type def",r[20],212],[1,6,213],[3,"keyword",r[21],214,0,215],[1,6,216],[1,6,217],[1,133,215],[2,174,-1,{name:"ClassBody"}],[3,"operator",r[33],-1,3,"operator",r[34],219,3,"keyword",r[35],219,2,329,-1,{name:"ArgList"},1,125,-1,r[37],221,"[",223,3,"operator","?",227],[1,6,220],[1,133,-1],[1,6,222],[3,"property callee",r[36],-1,3,"property",r[20],-1],[1,6,224],[1,133,225],[1,6,226],["]",-1],[1,6,228],[1,133,229],[1,6,230],[3,"operator",":",231],[1,6,232],[1,133,-1],["[",234],[1,6,235],[1,334,236],[1,6,237],["]",-1],["{",239],[1,6,240],[1,340,241],[1,6,242],["}",-1],[3,"operator",r[33],-1,3,"operator",r[34],244,3,"keyword",r[35],244,2,329,-1,{name:"ArgList"},1,125,-1,r[37],246,"[",248,3,"operator","?",252],[1,6,245],[1,142,-1],[1,6,247],[3,"property callee",r[36],-1,3,"property",r[20],-1],[1,6,249],[1,133,250],[1,6,251],["]",-1],[1,6,253],[1,133,254],[1,6,255],[3,"operator",":",256],[1,6,257],[1,142,-1],["(",259],[1,6,260],[1,346,261],[1,6,262],[")",-1],["(",264],[1,6,265],[2,352,266,{name:"StatementMaybeOf"}],[1,6,267],[1,133,268,0,268,0,272],[1,6,269],[";",270],[1,6,271],[1,133,272,0,272],[1,6,273],[")",-1],[3,"keyword",/^(?:get|set|async)(?![a-zA-Z¡-￿_0-9_\$])(?! *[\,\}\:\(])/,275,0,275],[1,6,276],[3,"keyword","*",277,0,277],[1,6,278],[3,"def property",r[20],279,"[",280,3,"number",r[31],279,2,116,279,{name:"string",token:"string"},3,"operator","...",281],[1,6,282],[1,6,283],[1,6,284],[2,155,-1,{name:"FunctionDef"},":",285,0,-1],[1,133,286],[1,142,-1],[1,6,287],[1,6,288],[1,142,-1],["]",279],["{",290],[1,293,291,1,193,292],[[0,/^(?!\}|\*\/)/,/^[^]/],291,0,292],[/^(?:\}|(?=\*\/))/,-1],[3,"tag",/^\@(?:member|param|arg(?:ument)?|module|namespace|typedef)(?![a-zA-Z¡-￿_0-9])/,294,3,"tag",/^\@[a-zA-Z¡-￿_0-9]+/,-1],[r[38],294,"{",295,0,296,0,-1],[2,357,297,{name:"doccomment.type"}],[3,"def",/^[a-zA-Z¡-￿_0-9]+/,-1,0,-1],["}",298],[[1,"\n","\t"," ",/^\*(?!\/)/],298,0,296],[3,"keyword",r[39],300],[1,6,301],[".",302,1,200,303],[1,6,304],[1,6,305],[3,"keyword",/^target(?![a-zA-Z¡-￿_0-9_\$])/,-1],[2,329,306,{name:"ArgList"},".",307,0,-1],[1,6,305],[1,6,308],[3,"property callee",r[36],306,3,"property",r[20],306],[3,"def",[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,361]],311,[5,363],310],[2,258,311,{name:"ParamList"}],[1,6,312],[2,366,-1,{name:"ArrowRest"}],["[",314],[1,6,315],[1,369,316],[1,6,317],["]",-1],["{",319],[1,6,320],[1,375,321],[1,6,322],["}",-1],["(",324],[1,6,325],[1,133,326],[1,6,327],[")",-1],[3,"keyword",r[21],-1],["(",330],[1,6,331],[1,369,332],[1,6,333],[")",-1],[1,381,335,0,335,0,-1],[1,6,336],[",",337,0,-1],[1,6,338],[1,381,339,0,339,0,339],[1,6,336],[1,386,341,0,-1],[1,6,342],[",",343,0,-1],[1,6,344],[1,386,345,0,345],[1,6,342],[1,381,347,0,-1],[1,6,348],[",",349,0,-1],[1,6,350],[1,381,351,0,351],[1,6,348],[2,7,353,{name:"Statement"}],[1,6,354],[3,"keyword",/^of(?![a-zA-Z¡-￿_0-9_\$])/,355,0,-1],[1,6,356],[1,133,-1],[3,"type","{",358,3,"type",/^(?:(?!\{|\}|\*\/).)+/,357,"\n",359,0,-1],[2,357,360,{name:"doccomment.type"}],[/^[\t ]*(?:\*(?!\/)[\t ]*)?/,357],[/^(?=\*\/)/,357,3,"type","}",357],[1,6,362],["=>",-1],[2,258,364,{name:"ParamList"}],[1,6,365],["=>",-1],[3,"operator","=>",367],[1,6,368],[2,129,-1,{name:"Block"},1,142,-1],[1,142,370,0,-1],[1,6,371],[",",372,0,-1],[1,6,373],[1,142,374,0,374],[1,6,371],[2,274,376,{name:"ObjectMember"},0,-1],[1,6,377],[",",378,0,-1],[1,6,379],[2,274,380,{name:"ObjectMember"},0,380],[1,6,377],[1,139,382],[1,6,383],[3,"operator","=",384,0,-1],[1,6,385],[1,142,-1],[3,"def",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?![a-z]|[A-Z]|[¡-￿]|_|[0-9]|_|\$| *\:)/,387,3,"property",r[20],391,3,"number",r[31],391,2,116,391,{name:"string",token:"string"},3,"operator","...",395],[1,6,388],[3,"operator","=",389,0,-1],[1,6,390],[1,142,-1],[1,6,392],[":",393],[1,6,394],[1,381,-1],[1,6,396],[1,381,-1]],start:0,token:5}),i=/(^|\s)variable($|\s)/;function n(e){var t=/^(if|for|do|while|try)\b/.exec(e.startLine.slice(e.startPos));return t&&t[1]}var a={Block:"}",BlockOf:"}",ClassBody:"}",AnnotationTypeBody:"}",ObjectLiteral:"}",ObjectPattern:"}",EnumBody:"}",LambdaBlock:"}",WhenBody:"}",ObjType:"}",ArrayInitializer:"}",NamespaceBlock:"}",BraceTokens:"}",ArrayLiteral:"]",BracketTokens:"]",TupleType:"]",ParamList:")",SimpleParamList:")",ArgList:")",ParenExpr:")",CondExpr:")",ForSpec:")",ParenTokens:")",ParenthesizedExpression:")",ConstructorParamList:")",TypeParams:">",TypeArgs:">",TemplateArgs:">",TemplateParams:">"},l=["Block","NamespaceBlock","ClassBody","AnnotationTypeBody","BlockOf","EnumBody"],s=["Statement","ObjectMember","ClassItem","EnumConstant","AnnotationTypeItem","ArgExpr","StatementMaybeOf","NewExpr"];function d(e,r){for(var o=e.startLine;;e=e.parent){if("CondExpr"==e.name)return t.countColumn(e.startLine,e.startPos+1,r.tabSize);if(s.indexOf(e.name)>-1&&/(^\s*|[\(\{\[])$/.test(e.startLine.slice(0,e.startPos)))return t.countColumn(e.startLine,e.startPos,r.tabSize);if(!e.parent||e.parent.startLine!=o)return t.countColumn(e.startLine,null,r.tabSize)}}function c(e,r,o){if(!e)return 0;if("string"==e.name||"comment"==e.name)return t.Pass;var i,p,h=a[e.name],g=r&&r.charAt(0)==h;if(h&&!1!==o.align&&(!o.dontAlign||o.dontAlign.indexOf(e.name)<0)&&function(e){return!/^\s*((\/\/.*)?$|.*=>)/.test(e.startLine.slice(e.startPos+1))}(e))return t.countColumn(e.startLine,e.startPos,o.tabSize)+(g?0:1);if(h&&l.indexOf(e.name)>-1){var m=e.parent;m&&"Statement"==m.name&&m.parent&&"Statement"==m.parent.name&&n(m.parent)&&!n(m)&&(m=m.parent);var f=u(m,o);return g||"NamespaceBlock"==e.name?f:/^(public|private|protected)\s*:/.test(r)?f+1:!(p=e.parent)||"Statement"!=p.name||!/^switch\b/.test(p.startLine.slice(p.startPos))||(i=r)&&/^\s*(case|default)\b/.test(i)?f+o.indentUnit:f+2*o.indentUnit}var b=d(e,o);return h?g&&(o.dontCloseBrackets||"").indexOf(h)<0?b:b+o.indentUnit*((o.doubleIndentBrackets||"").indexOf(h)<0?1:2):s.indexOf(e.name)>-1?n(e)?b+o.indentUnit:b+2*o.indentUnit:"Alternative"==e.name||"CatchFinally"==e.name?(b=d(e.parent,o),!r||/^((else|catch|finally)\b|\/[\/\*])/.test(r)?b:b+o.indentUnit):"ArrowRest"==e.name?b+o.indentUnit:"NewExpression"==e.name&&e.startLine.length>e.startPos+5?t.countColumn(e.startLine,e.startPos,o.tabSize)+2*o.indentUnit:"InitializerList"==e.name?b+2:"ThrowsClause"!=e.name||/throws\s*$/.test(e.startLine.slice(e.startPos))?c(e.parent,r,o):b+2*o.indentUnit}function u(e,r){for(;;e=e.parent){if(!e)return 0;if(s.indexOf(e.name)>-1||e.parent&&a[e.parent.name])return t.countColumn(e.startLine,null,r.tabSize)}}function p(e,r,o,i){var n=e.context&&e.context.name;if("DeclType"==n||"BeforeStatement"==n||"AnnotationHead"==n||"Template"==n||"str"==n)return u(e.context,i);if(("doccomment.braced"==n||"doccomment.tagGroup"==n)&&!/^[@*]/.test(r))return t.countColumn(e.context.startLine,null,i.tabSize)+2*i.indentUnit;var a=i.forceContent&&/^\s*(\/\/.*)?$/.test(o)?"x":o;return c(e.contextAt(a,o.length-r.length),r,i)}function h(e,t){for(var r=t-1;r>=0;r--){var o=e.charCodeAt(r);if(10===o)break;if(32!==o&&9!==o)return!1}return!0}var g=function(e){this.config=e};g.prototype.startState=function(){return new m},g.prototype.copyState=function(e){return e.copy()},g.prototype.shouldInterceptTokenizing=function(e){var t=e.currentTemplateState;return void 0!==t&&null!==t.mode},g.prototype.interceptTokenizing=function(e,t){if(e.match("${")&&(e.backUp(2),!this.isEscaped(e,e.pos-2)))return{handled:!1};if("`"===e.peek()&&!this.isEscaped(e,e.pos))return{handled:!1};var r=t.currentTemplateState,o=r.mode,i=r.state,n=o.token(e,i);return this.backupIfEmbeddedTokenizerOvershot(e),{handled:!0,style:n}},g.prototype.trackState=function(e,t,r){if(e){var o=r.currentTemplateState;o&&"inline-expression"!==o.kind?this.trackStateInTemplate(e,t,r,o):this.trackStateNotInTemplate(e,t,r,o),r.previousVariable="variable"===e?t.current():null}},g.prototype.trackStateNotInTemplate=function(e,t,r,o){if(o&&"string-2"===e&&t.current().startsWith("}"))return r.templateStack.pop(),void t.backUp(t.current().length-1);if("string-2"===e&&t.current().startsWith("`")){var i=this.getModeForTemplateTag(r.previousVariable),n="template";i?(t.backUp(t.current().length-1),r.templateStack.push(new b(n,i,CodeMirror.startState(i)))):r.templateStack.push(new b(n,null,null))}},g.prototype.trackStateInTemplate=function(e,t,r,o){"string-2"!==e||!t.current().endsWith("`")||this.isEscaped(t.pos-1)?"string-2"!==e||!t.current().endsWith("${")||this.isEscaped(t.pos-2)||r.templateStack.push(new b("inline-expression",null,null)):r.templateStack.pop()},g.prototype.backupIfEmbeddedTokenizerOvershot=function(e){for(var t=e.current(),r=0;;){var o=t.slice(r).search(/`|\$\{/);if(-1===o)return;o+=r;var i=t.length-o,n=e.pos-i;if(!this.isEscaped(e,n))return void e.backUp(t.length-o);r=o+1}},g.prototype.isEscaped=function(e,t){for(var r=!1,o=t;o>0&&"\\"===e.string[o-1];)r=!r,o--;return r},g.prototype.getModeForTemplateTag=function(e){if(!e)return null;"htm"===e&&(e="html");for(var t=["google-"+e,""+e],r=0;r<t.length;r++){var o=CodeMirror.getMode(this.config,t[r]);if(o&&"null"!==o.name)return o}return null};var m=function(e,t){void 0===e&&(e=[]),void 0===t&&(t=null),this.templateStack=e,this.previousVariable=t},f={currentTemplateState:{configurable:!0}};m.prototype.copy=function(){return new m(this.templateStack.map((function(e){return e.copy()})),this.previousVariable)},f.currentTemplateState.get=function(){return this.templateStack[this.templateStack.length-1]},Object.defineProperties(m.prototype,f);var b=function(e,t,r){this.kind=e,this.mode=t,this.state=r};b.prototype.copy=function(){return this.mode?new b(this.kind,this.mode,CodeMirror.copyState(this.mode,this.state)):new b(this.kind,null,null)};var y=["Block","FunctionDef","ArrowFunc","ForStatement"],v=function(e){function t(t,r){e.call(this,o,{predicates:{canInsertSemi:!1===r.requireSemicolons?h:function(){return!1}}}),this.embeddedParser=new g(t),this.indentConf={doubleIndentBrackets:">)",dontCloseBrackets:")",tabSize:t.tabSize,indentUnit:t.indentUnit,forceContent:!0}}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.startState=function(){var t=e.prototype.startState.call(this);return t.embeddedParserState=this.embeddedParser.startState(),t},t.prototype.copyState=function(t){var r=e.prototype.copyState.call(this,t);return r.embeddedParserState=this.embeddedParser.copyState(t.embeddedParserState),r},t.prototype.token=function(t,r){var o=r.embeddedParserState;if(this.embeddedParser.shouldInterceptTokenizing(o)){var n=this.embeddedParser.interceptTokenizing(t,o),a=n.handled,l=n.style;if(a)return l}var s=e.prototype.token.call(this,t,r);return this.embeddedParser.trackState(s,t,o),function(e,t,r,o){if("def"==e){var n=function(e,t){for(var r=e;r;r=r.parent)if(t.indexOf(r.name)>-1)return r}(o.context,t),a=r.current();if(n&&(n.locals||(n.locals=[]),-1==n.locals.indexOf(a)&&n.locals.push(a),"funcName"!=o.context.name))return"def local"}else i.test(e)&&!/qualified/.test(e)&&function(e,t){for(var r=e;r;r=r.parent)if(r.locals&&r.locals.indexOf(t)>-1)return!0;return!1}(o.context,r.current())&&(e=e.replace(i,"$1variable-2$2"));return e}(s,y,t,r)},t.prototype.indent=function(e,t,r){return t||(t=r="x"),p(e,t,r,this.indentConf)},t}(t.GrammarMode),x={electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``"};for(var w in x)v.prototype[w]=x[w];t.registerHelper("wordChars","google-javascript",/[\w$]/),t.defineMode("google-javascript",(function(e,t){return new v(e,t)}))}((e="undefined"!=typeof globalThis?globalThis:e||self).CodeMirror)}(window),function(e,t){!function(e){var t=function(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}(e),r=[/^(?:var|let|const)(?![a-zA-Z¡-￿_0-9_\$])/,/^while(?![a-zA-Z¡-￿_0-9_\$])/,/^with(?![a-zA-Z¡-￿_0-9_\$])/,/^do(?![a-zA-Z¡-￿_0-9_\$])/,/^debugger(?![a-zA-Z¡-￿_0-9_\$])/,/^if(?![a-zA-Z¡-￿_0-9_\$])/,/^function(?![a-zA-Z¡-￿_0-9_\$])/,/^for(?![a-zA-Z¡-￿_0-9_\$])/,/^default(?![a-zA-Z¡-￿_0-9_\$])/,/^case(?![a-zA-Z¡-￿_0-9_\$])/,/^return(?![a-zA-Z¡-￿_0-9_\$])/,/^throw(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:break|continue)(?![a-zA-Z¡-￿_0-9_\$])/,/^switch(?![a-zA-Z¡-￿_0-9_\$])/,/^try(?![a-zA-Z¡-￿_0-9_\$])/,/^class(?![a-zA-Z¡-￿_0-9_\$])/,/^export(?![a-zA-Z¡-￿_0-9_\$])/,/^import(?![a-zA-Z¡-￿_0-9_\$])/,[0,"async",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,139]],/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*/,/^extends(?![a-zA-Z¡-￿_0-9_\$])/,/^enum(?![a-zA-Z¡-￿_0-9_\$])/,[1,";",/^(?=\})/,[7,"canInsertSemi"]],/^from(?![a-zA-Z¡-￿_0-9_\$])/,[1,"\n","\t"," "],/^[a-zA-Z¡-￿__\$]/,/^const(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:true|false|null|undefined|NaN|Infinity)(?![a-zA-Z¡-￿_0-9_\$])/,/^new(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:[0-9][0-9_]*(?:\.[0-9_]*)?|\.[0-9_]+)(?:[eE][\+\-]?[0-9_]+)?)/,/^else(?![a-zA-Z¡-￿_0-9_\$])/,/^catch(?![a-zA-Z¡-￿_0-9_\$])/,/^finally(?![a-zA-Z¡-￿_0-9_\$])/,/^as(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:super|this)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:delete|typeof|yield|await|void)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.|\!|\+\+?|\-\-?)/,/^\/(?![\/\*])(?:\\.|\[(?:(?!\]).)*\]|(?!\/).)+\/[gimyus]*/,[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,508]],/^(?:\+\+|\-\-)/,/^(?:(?:\+|\-|\%|\*|\/(?![\/\*])|\>\>?\>?|\<\<?|\=\=?|\&\&?|\|\|?|\^|\!\=)\=?|\?\?)/,/^(?:in|instanceof)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:public|private|protected|readonly|abstract|static)(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.|\?\.)/,[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,533]],/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\:)/,/^is(?![a-zA-Z¡-￿_0-9_\$])/,/^(?:\.\.\.)?/,/^(?:get|set|async)(?![a-zA-Z¡-￿_0-9_\$])(?! *[\,\}\:\(\<])/],o=Object.freeze({__proto__:null,nodes:[[1,6,2],[/^[^]/,0],[1,6,3],[2,7,4,{name:"Statement"},0,1],[1,6,3],[3,"keyword",r[0],-1,3,"keyword",r[1],-1,3,"keyword",r[2],-1,3,"keyword",r[30],-1,3,"keyword",r[3],-1,3,"keyword",r[14],-1,3,"keyword",r[32],-1,3,"keyword",r[10],-1,3,"keyword",r[11],-1,3,"keyword",r[12],-1,3,"keyword",r[4],-1,3,"keyword",r[9],-1,3,"keyword",r[8],-1,3,"keyword",r[6],-1,3,"keyword",r[5],-1,3,"keyword",r[31],-1,3,"keyword",r[7],-1,3,"keyword",r[13],-1,3,"keyword",r[15],-1,3,"keyword",r[16],-1,3,"keyword",r[17],-1,3,"keyword",r[20],-1,3,"keyword",r[18],-1,3,"keyword",r[28],-1,3,"keyword",r[41],-1,3,"keyword",r[35],-1,3,"keyword",r[34],-1,3,"atom",r[27],-1,3,"variable",r[19],-1,3,"operator",r[36],-1,3,"operator",r[40],-1,3,"operator",r[39],-1,2,141,-1,{name:"string",token:"string"},3,"number",r[29],-1,2,146,-1,{name:"comment",token:"comment"},3,"string-2",r[37],-1,1,150,-1,/^[^]/,-1],[r[24],6,2,146,6,{name:"comment",token:"comment"},0,-1],[3,"keyword",[0,"type",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,154]],8,3,"keyword",[0,"namespace",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,155]],18,3,"keyword",[0,"interface",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,156]],26,[5,157],36,3,"keyword",r[21],37,3,"keyword",[0,"declare",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,160]],43,3,"keyword",/^abstract(?![a-zA-Z¡-￿_0-9_\$])/,43,3,"keyword",r[0],45,3,"keyword",r[1],52,3,"keyword",r[2],52,3,"keyword",r[3],56,2,161,-1,{name:"Block"},";",-1,3,"keyword",r[4],-1,3,"keyword",r[5],64,3,"keyword",r[6],69,3,"keyword",r[7],75,3,"keyword",r[8],77,r[45],77,3,"keyword",r[9],78,3,"keyword",r[10],81,3,"keyword",r[11],85,3,"keyword",r[12],89,3,"keyword",r[13],93,3,"keyword",r[14],97,3,"keyword",r[15],101,3,"keyword",r[16],105,3,"keyword",r[17],117,3,"keyword",r[18],133,"@",135,1,165,137],[1,6,9],[3,"def type",r[19],10],[1,6,11],[2,171,12,{name:"TypeParams"},0,12],[1,6,13],[3,"operator","=",14],[1,6,15],[1,176,16],[1,6,17],[r[22],-1],[1,6,19],[[5,224],20,3,"def",r[19],21],[3,"variable",r[19],22],[1,6,23],[1,6,24],[2,161,-1,{name:"Block"}],[".",25],[1,6,19],[1,6,27],[3,"def type",r[19],28],[1,6,29],[2,171,30,{name:"TypeParams"},0,30],[1,6,31],[3,"keyword",r[20],32,0,33],[1,6,34],[1,6,35],[1,227,33],[2,233,-1,{name:"ObjType"}],[3,"keyword",r[26],38],[1,6,39],[1,6,40],[3,"def type",r[19],41],[3,"keyword",r[21],37],[1,6,42],[2,241,-1,{name:"EnumBody"}],[1,6,44],[2,7,-1,{name:"Statement"}],[1,6,46],[1,246,47],[1,6,48],[",",49,r[22],-1],[1,6,50],[1,246,51],[1,6,48],[1,6,53],[2,257,54,{name:"CondExpr"}],[1,6,55],[2,7,-1,{name:"Statement"}],[1,6,57],[2,7,58,{name:"Statement"}],[1,6,59],[3,"keyword",r[1],60,0,-1],[1,6,61],[2,257,62,{name:"CondExpr"}],[1,6,63],[r[22],-1],[1,6,65],[2,257,66,{name:"CondExpr"}],[1,6,67],[2,7,68,{name:"Statement"}],[2,262,-1,{name:"Alternative"}],[1,6,70],[3,"keyword","*",71,0,71],[1,6,72],[3,"def",r[19],73],[1,6,74],[2,266,-1,{name:"FunctionDef"}],[1,6,76],[2,275,-1,{name:"ForStatement"}],[1,6,79],[1,6,80],[":",-1],[1,165,77],[1,6,82],[r[22],-1,1,165,83],[1,6,84],[r[22],-1],[1,6,86],[1,165,87],[1,6,88],[r[22],-1],[1,6,90],[/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*)?/,91],[1,6,92],[r[22],-1],[1,6,94],[2,257,95,{name:"CondExpr"}],[1,6,96],[2,161,-1,{name:"Block"}],[1,6,98],[2,161,99,{name:"Block"}],[1,6,100],[2,278,-1,{name:"CatchFinally"}],[1,6,102],[3,"def type",r[19],103],[1,6,104],[1,291,-1],[1,6,106],["*",107,3,"keyword",r[8],107,"{",108,2,7,-1,{name:"Statement"}],[1,6,109],[1,6,110],[3,"keyword",r[23],111,0,112],[1,302,113],[1,6,114],[1,6,115],[1,6,116],[2,141,112,{name:"string",token:"string"}],[r[22],-1],["}",107],[1,6,118],[2,141,119,{name:"string",token:"string"},3,"keyword","*",120,1,308,121,"{",122],[1,6,123],[1,6,124],[1,6,125],[1,6,126],[r[22],-1],[3,"keyword",r[33],127,0,121],[3,"keyword",r[23],128,0,119],[1,302,129],[1,6,130],[1,6,131],[1,6,132],[3,"def",r[19],121],[2,141,119,{name:"string",token:"string"}],["}",121],[1,6,134],[2,7,-1,{name:"Statement"}],[1,6,136],[1,165,-1],[1,6,138],[r[22],-1],[1,6,140],[3,"keyword",r[6],-1,/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*|\()/,-1],["'",142,'"',144],["\\",143,/^(?!\')./,142,"'",-1],[/^[^]/,142],["\\",145,/^(?!\")./,144,'"',-1],[/^[^]/,144],[/^\/\*\*(?!\/)/,147,"/*",149,/^\/\/.*/,-1],[1,313,147,0,148],[2,316,148,{name:"doccomment.tagGroup"},"*/",-1],[[0,/^(?!\*\/)/,/^[^]/],149,"*/",-1],[3,"string-2","`",151],[3,"string-2","${",152,2,318,151,{name:"str2",token:"string-2"},3,"string-2",/^(?:(?!\`|\$\{|\\).)+/,151,3,"string-2","`",-1],[1,165,153],[3,"string-2","}",151],[r[24],154,r[25],-1],[r[24],155,r[25],-1],[r[24],156,r[25],-1],[3,"keyword",r[26],158],[1,6,159],[3,"keyword",r[21],-1],[r[24],160,r[25],-1],["{",162],[1,6,163],[2,7,164,{name:"Statement"},"}",-1],[1,6,163],[1,320,166],[1,6,167],[",",168,1,348,169,0,-1],[1,6,170],[1,6,167],[1,367,169],["<",172],[1,6,173],[1,371,174],[1,6,175],[">",-1],[3,"keyword",/^this(?![a-zA-Z¡-￿_0-9_\$])/,209,3,"atom",r[27],209,3,"keyword",/^typeof(?![a-zA-Z¡-￿_0-9_\$])/,177,3,"keyword",/^(?:keyof|readonly|unique)(?![a-zA-Z¡-￿_0-9_\$])/,178,[0,[5,393],"("],179,3,"keyword",r[28],180,0,180,0,181,2,396,209,{name:"TupleType"},2,233,209,{name:"ObjType"},2,141,209,{name:"string",token:"string"},3,"number",r[29],209],[1,6,182],[1,6,183],[1,6,184],[1,6,185],[[5,401],186,3,"type",r[19],187],[3,"variable",r[19],188],[1,176,209],[1,176,189],[2,171,190,{name:"TypeParams"},0,190],[3,"variable",r[19],191],[1,6,192],[1,6,193],[1,6,194],[1,6,195],[1,6,196],[2,404,209,{name:"TypeArgs"},0,209],[".",197,"[",198,0,209],[")",209],[2,409,199,{name:"ParamListSpec"}],[".",200],[1,6,201],[1,6,202],[1,6,203],[1,6,181],[3,"property",r[19],204],[1,165,205],[3,"operator","=>",206],[1,6,193],[1,6,207],[1,6,208],["]",204],[1,410,209],[1,6,210],[3,"operator",/^[\&\|]/,211,3,"keyword",r[20],211,"[",212,3,"operator","?",213,0,-1],[1,6,214],[1,6,215],[1,6,216],[1,176,217],[1,176,218,0,218],[1,176,219],[1,6,210],[1,6,220],[1,6,221],["]",217],[3,"operator",":",222],[1,6,223],[1,176,217],[r[19],225],[1,6,226],[".",-1],[1,176,228,0,-1],[1,6,229],[",",230,0,-1],[1,6,231],[1,176,232,0,232],[1,6,229],["{",234],[1,6,235],[1,416,236,0,236],[1,6,237],[/^[\,\;]/,238,"}",-1],[1,6,239],[1,416,240,0,240],[1,6,237],["{",242],[1,6,243],[1,449,244],[1,6,245],["}",-1],[1,463,247],[1,6,248],[3,"operator","!",249,0,249],[1,6,250],[":",251,0,253],[1,6,252],[1,176,253],[1,6,254],[3,"operator","=",255,0,-1],[1,6,256],[1,367,-1],["(",258],[1,6,259],[1,165,260],[1,6,261],[")",-1],[1,6,263],[3,"keyword",r[30],264,0,-1],[1,6,265],[2,7,-1,{name:"Statement"}],[2,171,267,{name:"TypeParams"},0,267],[1,6,268],[2,466,269,{name:"ParamList"}],[1,6,270],[":",271,0,273],[1,6,272],[1,410,273],[1,6,274],[2,161,-1,{name:"Block"},r[22],-1],[2,471,276,{name:"ForSpec"}],[1,6,277],[2,7,-1,{name:"Statement"}],[3,"keyword",r[31],279,0,287],[1,6,280],["(",281,0,282],[1,6,283],[1,6,284],[1,463,285],[2,161,287,{name:"Block"}],[1,6,286],[")",282],[1,6,288],[3,"keyword",r[32],289,0,-1],[1,6,290],[2,161,-1,{name:"Block"}],[2,171,292,{name:"TypeParams"},0,292],[1,6,293],[3,"keyword",r[20],294,0,296],[1,6,295],[1,176,296],[1,6,297],[3,"keyword",/^implements(?![a-zA-Z¡-￿_0-9_\$])/,298,0,300],[1,6,299],[1,227,300],[1,6,301],[2,482,-1,{name:"ClassBody"}],[1,308,303,0,-1],[1,6,304],[",",305,0,-1],[1,6,306],[1,308,307,0,307],[1,6,304],[3,"variable",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= +as)/,309,3,"def",r[19],-1],[1,6,310],[3,"keyword",r[33],311],[1,6,312],[3,"def",r[19],-1],[0,314,2,490,-1,{name:"doccomment.braced"}],[[0,/^(?!\*\/|\@[a-zA-Z¡-￿_0-9]|\{)/,/^[^]/],315],[0,314,0,-1],[1,494,317],[1,313,317,0,-1],["\\",319,"\n",-1],[/^[^]/,-1],["<",321,3,"atom",r[27],-1,3,"keyword",r[34],-1,3,"keyword",r[35],327,3,"operator",r[36],327,3,"keyword",r[18],327,3,"keyword",r[28],329,3,"keyword",r[6],335,3,"keyword",r[15],341,2,500,-1,{name:"ArrowFunc"},3,"variable callee",r[38],346,3,"variable",r[19],-1,3,"number",r[29],-1,2,141,-1,{name:"string",token:"string"},3,"string-2",r[37],-1,1,150,-1,2,512,-1,{name:"ArrayLiteral"},2,517,-1,{name:"ObjectLiteral"},2,522,-1,{name:"ParenExpr"}],[1,6,322],[1,176,323],[1,6,324],[">",325],[1,6,326],[1,320,-1],[1,6,328],[1,320,-1],[1,6,330],[".",331,3,"variable callee",r[38],332,1,320,-1],[1,6,333],[1,6,334],[3,"keyword",/^target(?![a-zA-Z¡-￿_0-9_\$])/,-1],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,336],[3,"keyword","*",337,0,337],[1,6,338],[3,"def",r[19],339,0,339],[1,6,340],[2,266,-1,{name:"FunctionDef"}],[1,6,342],[[6,527],343,0,344],[3,"def type",r[19],344],[1,6,345],[1,291,-1],[1,6,347],[2,404,-1,{name:"TypeArgs"},0,-1],[3,"keyword",r[33],349,3,"operator","!",-1,3,"operator",r[39],-1,3,"operator",r[40],351,3,"keyword",r[41],351,2,528,-1,{name:"ArgList"},1,150,-1,r[43],353,"[",357,3,"operator","?",361],[1,6,350],[1,176,-1],[1,6,352],[1,165,-1],[1,6,354],[3,"property callee",r[44],355,3,"property",r[19],-1],[1,6,356],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,358],[1,165,359],[1,6,360],["]",-1],[1,6,362],[1,165,363],[1,6,364],[3,"operator",":",365],[1,6,366],[1,165,-1],[1,320,368],[1,6,369],[1,537,370,0,-1],[1,6,369],[3,"def type",r[19],372,0,-1],[1,6,373],[3,"keyword",r[20],374,0,375],[1,6,376],[1,6,377],[1,176,375],[3,"operator","=",378,0,379],[1,6,380],[1,6,381],[1,176,379],[",",382,0,-1],[1,6,383],[3,"def type",r[19],384,0,385],[1,6,386],[1,6,381],[3,"keyword",r[20],387,0,388],[1,6,389],[1,6,390],[1,176,388],[3,"operator","=",391,0,385],[1,6,392],[1,176,385],["(",394],[1,6,395],[[6,556],-1],["[",397],[1,6,398],[1,559,399],[1,6,400],["]",-1],[r[19],402],[1,6,403],[".",-1],["<",405],[1,6,406],[1,227,407],[1,6,408],[">",-1],[2,466,-1,{name:"ParamList"}],[[5,573],411,0,414],[3,"variable",r[19],412],[1,6,413],[3,"keyword",r[46],414],[1,6,415],[1,176,-1],[3,"keyword",r[28],417,0,417,0,425],[1,6,418],[2,171,419,{name:"TypeParams"},0,419],[1,6,420],[2,466,421,{name:"ParamList"}],[1,6,422],[":",423,0,-1],[1,6,424],[1,410,-1],[3,"keyword",r[42],426,"[",427,3,"def property",r[19],428,2,141,428,{name:"string",token:"string"},3,"number",r[29],428],[1,6,425],[1,6,429],[1,6,430],[[0,[5,576],/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/],431,1,165,432],[/^\??/,433],[1,6,434],[1,6,435],[1,6,436],[":",437,3,"keyword",/^in(?![a-zA-Z¡-￿_0-9_\$])/,437],["]",438],[2,171,439,{name:"TypeParams"},0,439,0,440],[1,6,441],[1,6,442],[1,6,443],[1,6,444],[1,176,432],[":",445],[2,466,440,{name:"ParamList"}],[":",446,0,-1],[1,6,447],[1,6,448],[1,176,-1],[1,410,-1],[3,"def property",r[19],450,0,-1],[1,6,451],[3,"operator","=",452,0,453],[1,6,454],[1,6,455],[1,367,453],[",",456,0,-1],[1,6,457],[3,"def property",r[19],458,0,459],[1,6,460],[1,6,455],[3,"operator","=",461,0,459],[1,6,462],[1,367,459],[3,"operator","...",464,0,464],[1,6,465],[3,"def",r[19],-1,2,579,-1,{name:"ArrayPattern"},2,584,-1,{name:"ObjectPattern"}],["(",467],[1,6,468],[1,589,469],[1,6,470],[")",-1],["(",472],[1,6,473],[2,629,474,{name:"StatementMaybeOf"}],[1,6,475],[1,165,476,0,476,0,480],[1,6,477],[";",478],[1,6,479],[1,165,480,0,480],[1,6,481],[")",-1],["{",483],[1,6,484],[0,485,"@",486,"}",-1],[3,"keyword",r[42],487,3,"keyword",[0,"override",/^(?![a-zA-Z¡-￿_0-9_\$])/,[5,634]],487,2,635,488,{name:"ClassItem"}],[1,6,489],[1,6,485],[1,6,484],[1,165,488],["{",491],[1,494,492,1,313,493],[[0,/^(?!\}|\*\/)/,/^[^]/],492,0,493],[/^(?:\}|(?=\*\/))/,-1],[3,"tag",/^\@(?:member|param|arg(?:ument)?|module|namespace|typedef)(?![a-zA-Z¡-￿_0-9])/,495,3,"tag",/^\@[a-zA-Z¡-￿_0-9]+/,-1],[r[24],495,"{",496,0,497,0,-1],[2,656,498,{name:"doccomment.type"}],[3,"def",/^[a-zA-Z¡-￿_0-9]+/,-1,0,-1],["}",499],[[1,"\n","\t"," ",/^\*(?!\/)/],499,0,497],[3,"def",[0,/^[a-zA-Z¡-￿__\$]/,/^[a-zA-Z¡-￿_0-9_\$]*/,[5,660]],506,[5,666],501],[2,466,502,{name:"ParamList"}],[1,6,503],[":",504,0,506],[1,6,505],[1,410,506],[1,6,507],[2,673,-1,{name:"ArrowRest"}],[/^\<(?! )/,-1,/^ */,509],[1,678,510,0,511],[/^ */,511],["(",-1],["[",513],[1,6,514],[1,680,515],[1,6,516],["]",-1],["{",518],[1,6,519],[1,686,520],[1,6,521],["}",-1],["(",523],[1,6,524],[1,165,525],[1,6,526],[")",-1],[3,"keyword",r[20],-1],["(",529],[1,6,530],[1,680,531],[1,6,532],[")",-1],[/^ */,534],[1,678,535,0,536],[/^ */,536],["(",-1],[3,"keyword",r[33],538,3,"operator","!",-1,3,"operator",r[39],-1,3,"operator",r[40],540,3,"keyword",r[41],540,2,528,-1,{name:"ArgList"},1,150,-1,r[43],542,"[",546,3,"operator","?",550],[1,6,539],[1,176,-1],[1,6,541],[1,367,-1],[1,6,543],[3,"property callee",r[44],544,3,"property",r[19],-1],[1,6,545],[2,404,-1,{name:"TypeArgs"},0,-1],[1,6,547],[1,165,548],[1,6,549],["]",-1],[1,6,551],[1,165,552],[1,6,553],[3,"operator",":",554],[1,6,555],[1,367,-1],[/^(?:\)|\.\.\.)/,-1,r[19],557],[1,6,558],[/^[\?\:]/,-1],[r[45],560,0,561,0,-1],[1,6,562],[1,6,563],[":",561],[1,176,564],[1,6,565],[",",566,0,-1],[1,6,567],[r[45],568,0,569,0,570],[1,6,571],[1,6,572],[1,6,565],[":",569],[1,176,570],[r[19],574],[1,6,575],[3,"keyword",r[46],-1],[r[19],577],[1,6,578],[/^(?:\:|in)/,-1],["[",580],[1,6,581],[1,692,582],[1,6,583],["]",-1],["{",585],[1,6,586],[1,698,587],[1,6,588],["}",-1],["@",590,0,591,0,-1],[1,6,592],[3,"keyword",r[42],593,r[47],594],[1,165,595],[1,6,591],[1,6,596],[1,6,589],[1,463,597],[1,6,598],[/^\??/,599],[1,6,600],[":",601,0,602],[1,6,603],[1,6,604],[1,176,602],[3,"operator","=",605,0,606],[1,6,607],[1,6,608],[1,367,606],[",",609,0,-1],[1,6,610],["@",611,0,612,0,613],[1,6,614],[3,"keyword",r[42],615,r[47],616],[1,6,608],[1,165,617],[1,6,612],[1,6,618],[1,6,610],[1,463,619],[1,6,620],[/^\??/,621],[1,6,622],[":",623,0,624],[1,6,625],[1,6,626],[1,176,624],[3,"operator","=",627,0,613],[1,6,628],[1,367,613],[2,7,630,{name:"Statement"}],[1,6,631],[3,"keyword",/^of(?![a-zA-Z¡-￿_0-9_\$])/,632,0,-1],[1,6,633],[1,165,-1],[r[24],634,r[25],-1],[3,"keyword",r[48],636,0,636],[1,6,637],[3,"def property",r[19],642,"[",638,3,"number",r[29],642,2,141,642,{name:"string",token:"string"}],[1,6,639],[1,165,640],[1,6,641],["]",642],[1,6,643],[3,"keyword","*",644,0,644,/^[\!\?]?/,645],[1,6,646],[1,6,647],[2,266,-1,{name:"FunctionDef"}],[":",648,0,649],[1,6,650],[1,6,651],[1,176,649],[3,"operator","=",652,0,653],[1,6,654],[1,6,655],[1,165,653],[r[22],-1],[3,"type","{",657,3,"type",/^(?:(?!\{|\}|\*\/).)+/,656,"\n",658,0,-1],[2,656,659,{name:"doccomment.type"}],[/^[\t ]*(?:\*(?!\/)[\t ]*)?/,656],[/^(?=\*\/)/,656,3,"type","}",656],[1,6,661],[":",662,0,665],[1,6,663],[1,176,664],[1,6,665],["=>",-1],[2,466,667,{name:"ParamList"}],[1,6,668],[":",669,0,671],[1,6,670],[1,410,671],[1,6,672],["=>",-1],[3,"operator","=>",674],[1,6,675],[2,171,676,{name:"TypeParams"},0,676],[1,6,677],[2,161,-1,{name:"Block"},1,367,-1],["<",679],[1,678,679,[1,"=>",[0,/^(?!\>)/,/^[^]/]],679,">",-1],[1,367,681,0,-1],[1,6,682],[",",683,0,-1],[1,6,684],[1,367,685,0,685],[1,6,682],[2,704,687,{name:"ObjectMember"},0,-1],[1,6,688],[",",689,0,-1],[1,6,690],[2,704,691,{name:"ObjectMember"},0,691],[1,6,688],[1,719,693,0,693,0,-1],[1,6,694],[",",695,0,-1],[1,6,696],[1,719,697,0,697,0,697],[1,6,694],[1,724,699,0,-1],[1,6,700],[",",701,0,-1],[1,6,702],[1,724,703,0,703],[1,6,700],[3,"keyword",r[48],705,0,705],[1,6,706],[3,"keyword","*",707,0,707],[1,6,708],[3,"def property",r[19],709,"[",710,3,"number",r[29],709,2,141,709,{name:"string",token:"string"},3,"operator","...",711],[1,6,712],[1,6,713],[1,6,714],[2,266,-1,{name:"FunctionDef"},":",715,0,-1],[1,165,716],[1,367,-1],[1,6,717],[1,6,718],[1,367,-1],["]",709],[1,463,720],[1,6,721],[3,"operator","=",722,0,-1],[1,6,723],[1,367,-1],[3,"def",/^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?![a-z]|[A-Z]|[¡-￿]|_|[0-9]|_|\$| *\:)/,725,3,"property",r[19],729,3,"number",r[29],729,2,141,729,{name:"string",token:"string"},3,"operator","...",733],[1,6,726],[3,"operator","=",727,0,-1],[1,6,728],[1,367,-1],[1,6,730],[":",731],[1,6,732],[1,719,-1],[1,6,734],[1,719,-1]],start:0,token:5}),i=/(^|\s)variable($|\s)/;function n(e){var t=/^(if|for|do|while|try)\b/.exec(e.startLine.slice(e.startPos));return t&&t[1]}var a={Block:"}",BlockOf:"}",ClassBody:"}",AnnotationTypeBody:"}",ObjectLiteral:"}",ObjectPattern:"}",EnumBody:"}",LambdaBlock:"}",WhenBody:"}",ObjType:"}",ArrayInitializer:"}",NamespaceBlock:"}",BraceTokens:"}",ArrayLiteral:"]",BracketTokens:"]",TupleType:"]",ParamList:")",SimpleParamList:")",ArgList:")",ParenExpr:")",CondExpr:")",ForSpec:")",ParenTokens:")",ParenthesizedExpression:")",ConstructorParamList:")",TypeParams:">",TypeArgs:">",TemplateArgs:">",TemplateParams:">"},l=["Block","NamespaceBlock","ClassBody","AnnotationTypeBody","BlockOf","EnumBody"],s=["Statement","ObjectMember","ClassItem","EnumConstant","AnnotationTypeItem","ArgExpr","StatementMaybeOf","NewExpr"];function d(e,r){for(var o=e.startLine;;e=e.parent){if("CondExpr"==e.name)return t.countColumn(e.startLine,e.startPos+1,r.tabSize);if(s.indexOf(e.name)>-1&&/(^\s*|[\(\{\[])$/.test(e.startLine.slice(0,e.startPos)))return t.countColumn(e.startLine,e.startPos,r.tabSize);if(!e.parent||e.parent.startLine!=o)return t.countColumn(e.startLine,null,r.tabSize)}}function c(e,r,o){if(!e)return 0;if("string"==e.name||"comment"==e.name)return t.Pass;var i,p,h=a[e.name],g=r&&r.charAt(0)==h;if(h&&!1!==o.align&&(!o.dontAlign||o.dontAlign.indexOf(e.name)<0)&&function(e){return!/^\s*((\/\/.*)?$|.*=>)/.test(e.startLine.slice(e.startPos+1))}(e))return t.countColumn(e.startLine,e.startPos,o.tabSize)+(g?0:1);if(h&&l.indexOf(e.name)>-1){var m=e.parent;m&&"Statement"==m.name&&m.parent&&"Statement"==m.parent.name&&n(m.parent)&&!n(m)&&(m=m.parent);var f=u(m,o);return g||"NamespaceBlock"==e.name?f:/^(public|private|protected)\s*:/.test(r)?f+1:!(p=e.parent)||"Statement"!=p.name||!/^switch\b/.test(p.startLine.slice(p.startPos))||(i=r)&&/^\s*(case|default)\b/.test(i)?f+o.indentUnit:f+2*o.indentUnit}var b=d(e,o);return h?g&&(o.dontCloseBrackets||"").indexOf(h)<0?b:b+o.indentUnit*((o.doubleIndentBrackets||"").indexOf(h)<0?1:2):s.indexOf(e.name)>-1?n(e)?b+o.indentUnit:b+2*o.indentUnit:"Alternative"==e.name||"CatchFinally"==e.name?(b=d(e.parent,o),!r||/^((else|catch|finally)\b|\/[\/\*])/.test(r)?b:b+o.indentUnit):"ArrowRest"==e.name?b+o.indentUnit:"NewExpression"==e.name&&e.startLine.length>e.startPos+5?t.countColumn(e.startLine,e.startPos,o.tabSize)+2*o.indentUnit:"InitializerList"==e.name?b+2:"ThrowsClause"!=e.name||/throws\s*$/.test(e.startLine.slice(e.startPos))?c(e.parent,r,o):b+2*o.indentUnit}function u(e,r){for(;;e=e.parent){if(!e)return 0;if(s.indexOf(e.name)>-1||e.parent&&a[e.parent.name])return t.countColumn(e.startLine,null,r.tabSize)}}function p(e,r,o,i){var n=e.context&&e.context.name;if("DeclType"==n||"BeforeStatement"==n||"AnnotationHead"==n||"Template"==n||"str"==n)return u(e.context,i);if(("doccomment.braced"==n||"doccomment.tagGroup"==n)&&!/^[@*]/.test(r))return t.countColumn(e.context.startLine,null,i.tabSize)+2*i.indentUnit;var a=i.forceContent&&/^\s*(\/\/.*)?$/.test(o)?"x":o;return c(e.contextAt(a,o.length-r.length),r,i)}function h(e,t){for(var r=t-1;r>=0;r--){var o=e.charCodeAt(r);if(10===o)break;if(32!==o&&9!==o)return!1}return!0}var g=function(e){this.config=e};g.prototype.startState=function(){return new m},g.prototype.copyState=function(e){return e.copy()},g.prototype.shouldInterceptTokenizing=function(e){var t=e.currentTemplateState;return void 0!==t&&null!==t.mode},g.prototype.interceptTokenizing=function(e,t){if(e.match("${")&&(e.backUp(2),!this.isEscaped(e,e.pos-2)))return{handled:!1};if("`"===e.peek()&&!this.isEscaped(e,e.pos))return{handled:!1};var r=t.currentTemplateState,o=r.mode,i=r.state,n=o.token(e,i);return this.backupIfEmbeddedTokenizerOvershot(e),{handled:!0,style:n}},g.prototype.trackState=function(e,t,r){if(e){var o=r.currentTemplateState;o&&"inline-expression"!==o.kind?this.trackStateInTemplate(e,t,r,o):this.trackStateNotInTemplate(e,t,r,o),r.previousVariable="variable"===e?t.current():null}},g.prototype.trackStateNotInTemplate=function(e,t,r,o){if(o&&"string-2"===e&&t.current().startsWith("}"))return r.templateStack.pop(),void t.backUp(t.current().length-1);if("string-2"===e&&t.current().startsWith("`")){var i=this.getModeForTemplateTag(r.previousVariable),n="template";i?(t.backUp(t.current().length-1),r.templateStack.push(new b(n,i,CodeMirror.startState(i)))):r.templateStack.push(new b(n,null,null))}},g.prototype.trackStateInTemplate=function(e,t,r,o){"string-2"!==e||!t.current().endsWith("`")||this.isEscaped(t.pos-1)?"string-2"!==e||!t.current().endsWith("${")||this.isEscaped(t.pos-2)||r.templateStack.push(new b("inline-expression",null,null)):r.templateStack.pop()},g.prototype.backupIfEmbeddedTokenizerOvershot=function(e){for(var t=e.current(),r=0;;){var o=t.slice(r).search(/`|\$\{/);if(-1===o)return;o+=r;var i=t.length-o,n=e.pos-i;if(!this.isEscaped(e,n))return void e.backUp(t.length-o);r=o+1}},g.prototype.isEscaped=function(e,t){for(var r=!1,o=t;o>0&&"\\"===e.string[o-1];)r=!r,o--;return r},g.prototype.getModeForTemplateTag=function(e){if(!e)return null;"htm"===e&&(e="html");for(var t=["google-"+e,""+e],r=0;r<t.length;r++){var o=CodeMirror.getMode(this.config,t[r]);if(o&&"null"!==o.name)return o}return null};var m=function(e,t){void 0===e&&(e=[]),void 0===t&&(t=null),this.templateStack=e,this.previousVariable=t},f={currentTemplateState:{configurable:!0}};m.prototype.copy=function(){return new m(this.templateStack.map((function(e){return e.copy()})),this.previousVariable)},f.currentTemplateState.get=function(){return this.templateStack[this.templateStack.length-1]},Object.defineProperties(m.prototype,f);var b=function(e,t,r){this.kind=e,this.mode=t,this.state=r};b.prototype.copy=function(){return this.mode?new b(this.kind,this.mode,CodeMirror.copyState(this.mode,this.state)):new b(this.kind,null,null)};var y=["Block","FunctionDef","ArrowFunc","ForStatement","ParamListSpec"],v=function(e){function t(t,r){e.call(this,o,{predicates:{canInsertSemi:!1===r.requireSemicolons?h:function(){return!1}}}),this.templateTokenizer=new g(t),this.indentConf={doubleIndentBrackets:">)",dontCloseBrackets:")",tabSize:t.tabSize,indentUnit:t.indentUnit,forceContent:!0}}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.startState=function(){var t=e.prototype.startState.call(this);return t.embeddedParserState=this.templateTokenizer.startState(),t},t.prototype.copyState=function(t){var r=e.prototype.copyState.call(this,t);return r.embeddedParserState=this.templateTokenizer.copyState(t.embeddedParserState),r},t.prototype.token=function(t,r){var o=r.embeddedParserState;if(this.templateTokenizer.shouldInterceptTokenizing(o)){var n=this.templateTokenizer.interceptTokenizing(t,o),a=n.handled,l=n.style;if(a)return l}var s=e.prototype.token.call(this,t,r);return this.templateTokenizer.trackState(s,t,o),function(e,t,r,o){if("def"==e){var n=function(e,t){for(var r=e;r;r=r.parent)if(t.indexOf(r.name)>-1)return r}(o.context,t),a=r.current();if(n&&(n.locals||(n.locals=[]),-1==n.locals.indexOf(a)&&n.locals.push(a),"funcName"!=o.context.name))return"def local"}else i.test(e)&&!/qualified/.test(e)&&function(e,t){for(var r=e;r;r=r.parent)if(r.locals&&r.locals.indexOf(t)>-1)return!0;return!1}(o.context,r.current())&&(e=e.replace(i,"$1variable-2$2"));return e}(s,y,t,r)},t.prototype.indent=function(e,t,r){return t||(t=r="x"),p(e,t,r,this.indentConf)},t}(t.GrammarMode),x={electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``"};for(var w in x)v.prototype[w]=x[w];t.registerHelper("wordChars","google-typescript",/[\w$]/),t.defineMode("google-typescript",(function(e,t){return new v(e,t)}))}((e="undefined"!=typeof globalThis?globalThis:e||self).CodeMirror)}(window),function(e,t){!function(e){var t=function(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}(e),r=[[1,"\n","\t"," "],/^[a-zA-Z\-\.0-9_]+/],o=Object.freeze({__proto__:null,nodes:[[1,3,0,0,1],[/^[^]/,0],[/^[^]/,-1],[2,4,-1,{name:"comment",token:"comment"},2,6,-1,{name:"doctype",token:"meta"},2,8,-1,{name:"tag"},3,"atom",/^\&(?:(?![\;\n\t ]).)*\;/,-1,[1,"\n",/^(?:(?![\&\<]).)+/],-1],["\x3c!--",5],[[0,/^(?!\-\-\>)/,/^[^]/],5,"--\x3e",-1],[/^(?:\<\!doctype|\<\!DOCTYPE)(?![a-zA-Z\-\.0-9_])/,7],[[0,/^(?!\>)/,/^[^]/],7,">",-1],[2,14,9,{name:"openTag"}],[3,"tag","/>",-1,[7,"selfClosing"],10,3,"tag",">",11],[3,"tag",">",-1],[1,3,11,/^(?=\<\/)/,12],[[7,"matchingTag"],13,0,-1],[2,21,-1,{name:"closeTag"}],[3,"tag",[0,"<",[6,24]],15],[r[0],15,3,"tag",r[1],16],[r[0],16,0,17],[3,"attribute",r[1],18,0,-1],[r[0],18,"=",19,0,20],[r[0],19,2,25,20,{name:"attributeValue",token:"string"}],[r[0],20,0,17],[3,"tag","</",22],[r[0],22,3,"tag",r[1],23],[3,"tag",">",-1],[r[0],24,"/",-1],['"',26,"'",27,/^(?:(?![\n\t \>]).)*/,-1],[[0,/^(?!\")/,/^[^]/],26,'"',-1],[[0,/^(?!\')/,/^[^]/],27,"'",-1]],start:0,token:2});function i(e){var t=/^\s*([\w_\.-]+)/.exec(e);return t?t[1].toLowerCase():"x"}function n(e){return i(e.startLine.slice(e.startPos+1))}var a="area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "),l={selfClosing:function(e,t,r){return a.indexOf(n(r))>-1},matchingTag:function(e,t,r){return i(e.slice(t+2))==n(r)}},s=function(e){function t(t,r){e.call(this,o,{predicates:l}),this.conf=t}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.indent=function(e,t,r){return function(e,t,r,o){for(var i=e.contextAt(r,r.length-t.length),a=/^\s*<\/\s*([\w_\.-]+)/.exec(t);i;){if("tag"==i.name){var l=CodeMirror.countColumn(i.startLine,null,o.tabSize);return a&&a[1].toLowerCase()==n(i)?l:l+o.indentUnit}if("openTag"==i.name)return CodeMirror.countColumn(i.startLine,null,o.tabSize)+2*o.indentUnit;i=i.parent}return 0}(e,t,r,this.conf)},t}(t.GrammarMode),d=s.prototype;d.electricInput=/^\s*<\/.*?>/,d.blockCommentStart="\x3c!--",d.blockCommentEnd="--\x3e",d.fold="xml",function(e){e.xmlCurrentTag=function(e){var t=e.context;if(!t||"openTag"!=t.name&&"closeTag"!=t.name)return null;var r=/^<\/?\s*([\w\-\.]+)/.exec(t.startLine.slice(t.startPos));return r?{name:r[1],close:"closeTag"==t.name}:null},e.xmlCurrentContext=function(e){for(var t=[],r=e.context;r;r=r.parent)if("tag"==r.name){var o=/^<\s*([\w\-\.]+)/.exec(r.startLine.slice(r.startPos));o&&t.push(o[1])}return t.reverse()}}(d),t.defineMode("google-html",(function(e,t){return new s(e,t)}))}((e="undefined"!=typeof globalThis?globalThis:e||self).CodeMirror)}(window),function(e){function t(e){for(var t={},r=0;r<e.length;++r)t[e[r].toLowerCase()]=!0;return t}e.defineMode("css",(function(t,r){var o=r.inline;r.propertyKeywords||(r=e.resolveMode("text/css"));var i,n,a=t.indentUnit,l=r.tokenHooks,s=r.documentTypes||{},d=r.mediaTypes||{},c=r.mediaFeatures||{},u=r.mediaValueKeywords||{},p=r.propertyKeywords||{},h=r.nonStandardPropertyKeywords||{},g=r.fontProperties||{},m=r.counterDescriptors||{},f=r.colorKeywords||{},b=r.valueKeywords||{},y=r.allowNested,v=r.lineComment,x=!0===r.supportsAtComponent,w=!1!==t.highlightNonStandardPropertyKeywords;function k(e,t){return i=t,e}function _(e,t){var r=e.next();if(l[r]){var o=l[r](e,t);if(!1!==o)return o}return"@"==r?(e.eatWhile(/[\w\\\-]/),k("def",e.current())):"="==r||("~"==r||"|"==r)&&e.eat("=")?k(null,"compare"):'"'==r||"'"==r?(t.tokenize=C(r),t.tokenize(e,t)):"#"==r?(e.eatWhile(/[\w\\\-]/),k("atom","hash")):"!"==r?(e.match(/^\s*\w*/),k("keyword","important")):/\d/.test(r)||"."==r&&e.eat(/\d/)?(e.eatWhile(/[\w.%]/),k("number","unit")):"-"!==r?/[,+>*\/]/.test(r)?k(null,"select-op"):"."==r&&e.match(/^-?[_a-z][_a-z0-9-]*/i)?k("qualifier","qualifier"):/[:;{}\[\]\(\)]/.test(r)?k(null,r):e.match(/^[\w-.]+(?=\()/)?(/^(url(-prefix)?|domain|regexp)$/i.test(e.current())&&(t.tokenize=S),k("variable callee","variable")):/[\w\\\-]/.test(r)?(e.eatWhile(/[\w\\\-]/),k("property","word")):k(null,null):/[\d.]/.test(e.peek())?(e.eatWhile(/[\w.%]/),k("number","unit")):e.match(/^-[\w\\\-]*/)?(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?k("variable-2","variable-definition"):k("variable-2","variable")):e.match(/^\w+-/)?k("meta","meta"):void 0}function C(e){return function(t,r){for(var o,i=!1;null!=(o=t.next());){if(o==e&&!i){")"==e&&t.backUp(1);break}i=!i&&"\\"==o}return(o==e||!i&&")"!=e)&&(r.tokenize=null),k("string","string")}}function S(e,t){return e.next(),e.match(/^\s*[\"\')]/,!1)?t.tokenize=null:t.tokenize=C(")"),k(null,"(")}function E(e,t,r){this.type=e,this.indent=t,this.prev=r}function T(e,t,r,o){return e.context=new E(r,t.indentation()+(!1===o?0:a),e.context),r}function A(e){return e.context.prev&&(e.context=e.context.prev),e.context.type}function O(e,t,r){return I[r.context.type](e,t,r)}function L(e,t,r,o){for(var i=o||1;i>0;i--)r.context=r.context.prev;return O(e,t,r)}function M(e){var t=e.current().toLowerCase();n=b.hasOwnProperty(t)?"atom":f.hasOwnProperty(t)?"keyword":"variable"}var I={top:function(e,t,r){if("{"==e)return T(r,t,"block");if("}"==e&&r.context.prev)return A(r);if(x&&/@component/i.test(e))return T(r,t,"atComponentBlock");if(/^@(-moz-)?document$/i.test(e))return T(r,t,"documentTypes");if(/^@(media|supports|(-moz-)?document|import)$/i.test(e))return T(r,t,"atBlock");if(/^@(font-face|counter-style)/i.test(e))return r.stateArg=e,"restricted_atBlock_before";if(/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(e))return"keyframes";if(e&&"@"==e.charAt(0))return T(r,t,"at");if("hash"==e)n="builtin";else if("word"==e)n="tag";else{if("variable-definition"==e)return"maybeprop";if("interpolation"==e)return T(r,t,"interpolation");if(":"==e)return"pseudo";if(y&&"("==e)return T(r,t,"parens")}return r.context.type},block:function(e,t,r){if("word"==e){var o=t.current().toLowerCase();return p.hasOwnProperty(o)?(n="property","maybeprop"):h.hasOwnProperty(o)?(n=w?"string-2":"property","maybeprop"):y?(n=t.match(/^\s*:(?:\s|$)/,!1)?"property":"tag","block"):(n+=" error","maybeprop")}return"meta"==e?"block":y||"hash"!=e&&"qualifier"!=e?I.top(e,t,r):(n="error","block")},maybeprop:function(e,t,r){return":"==e?T(r,t,"prop"):O(e,t,r)},prop:function(e,t,r){if(";"==e)return A(r);if("{"==e&&y)return T(r,t,"propBlock");if("}"==e||"{"==e)return L(e,t,r);if("("==e)return T(r,t,"parens");if("hash"!=e||/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(t.current())){if("word"==e)M(t);else if("interpolation"==e)return T(r,t,"interpolation")}else n+=" error";return"prop"},propBlock:function(e,t,r){return"}"==e?A(r):"word"==e?(n="property","maybeprop"):r.context.type},parens:function(e,t,r){return"{"==e||"}"==e?L(e,t,r):")"==e?A(r):"("==e?T(r,t,"parens"):"interpolation"==e?T(r,t,"interpolation"):("word"==e&&M(t),"parens")},pseudo:function(e,t,r){return"meta"==e?"pseudo":"word"==e?(n="variable-3",r.context.type):O(e,t,r)},documentTypes:function(e,t,r){return"word"==e&&s.hasOwnProperty(t.current())?(n="tag",r.context.type):I.atBlock(e,t,r)},atBlock:function(e,t,r){if("("==e)return T(r,t,"atBlock_parens");if("}"==e||";"==e)return L(e,t,r);if("{"==e)return A(r)&&T(r,t,y?"block":"top");if("interpolation"==e)return T(r,t,"interpolation");if("word"==e){var o=t.current().toLowerCase();n="only"==o||"not"==o||"and"==o||"or"==o?"keyword":d.hasOwnProperty(o)?"attribute":c.hasOwnProperty(o)?"property":u.hasOwnProperty(o)?"keyword":p.hasOwnProperty(o)?"property":h.hasOwnProperty(o)?w?"string-2":"property":b.hasOwnProperty(o)?"atom":f.hasOwnProperty(o)?"keyword":"error"}return r.context.type},atComponentBlock:function(e,t,r){return"}"==e?L(e,t,r):"{"==e?A(r)&&T(r,t,y?"block":"top",!1):("word"==e&&(n="error"),r.context.type)},atBlock_parens:function(e,t,r){return")"==e?A(r):"{"==e||"}"==e?L(e,t,r,2):I.atBlock(e,t,r)},restricted_atBlock_before:function(e,t,r){return"{"==e?T(r,t,"restricted_atBlock"):"word"==e&&"@counter-style"==r.stateArg?(n="variable","restricted_atBlock_before"):O(e,t,r)},restricted_atBlock:function(e,t,r){return"}"==e?(r.stateArg=null,A(r)):"word"==e?(n="@font-face"==r.stateArg&&!g.hasOwnProperty(t.current().toLowerCase())||"@counter-style"==r.stateArg&&!m.hasOwnProperty(t.current().toLowerCase())?"error":"property","maybeprop"):"restricted_atBlock"},keyframes:function(e,t,r){return"word"==e?(n="variable","keyframes"):"{"==e?T(r,t,"top"):O(e,t,r)},at:function(e,t,r){return";"==e?A(r):"{"==e||"}"==e?L(e,t,r):("word"==e?n="tag":"hash"==e&&(n="builtin"),"at")},interpolation:function(e,t,r){return"}"==e?A(r):"{"==e||";"==e?L(e,t,r):("word"==e?n="variable":"variable"!=e&&"("!=e&&")"!=e&&(n="error"),"interpolation")}};return{startState:function(e){return{tokenize:null,state:o?"block":"top",stateArg:null,context:new E(o?"block":"top",e||0,null)}},token:function(e,t){if(!t.tokenize&&e.eatSpace())return null;var r=(t.tokenize||_)(e,t);return r&&"object"==typeof r&&(i=r[1],r=r[0]),n=r,"comment"!=i&&(t.state=I[t.state](i,e,t)),n},indent:function(e,t){var r=e.context,o=t&&t.charAt(0),i=r.indent;return"prop"!=r.type||"}"!=o&&")"!=o||(r=r.prev),r.prev&&("}"!=o||"block"!=r.type&&"top"!=r.type&&"interpolation"!=r.type&&"restricted_atBlock"!=r.type?(")"!=o||"parens"!=r.type&&"atBlock_parens"!=r.type)&&("{"!=o||"at"!=r.type&&"atBlock"!=r.type)||(i=Math.max(0,r.indent-a)):i=(r=r.prev).indent),i},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:v,fold:"brace"}}));var r=["domain","regexp","url","url-prefix"],o=t(r),i=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],n=t(i),a=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid","orientation","device-pixel-ratio","min-device-pixel-ratio","max-device-pixel-ratio","pointer","any-pointer","hover","any-hover","prefers-color-scheme","dynamic-range","video-dynamic-range"],l=t(a),s=["landscape","portrait","none","coarse","fine","on-demand","hover","interlace","progressive","dark","light","standard","high"],d=t(s),c=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","all","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","baseline-shift","binding","bleed","block-size","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-content","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","gap","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-gap","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-gap","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","inset","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","left","letter-spacing","line-break","line-height","line-height-step","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","place-content","place-items","place-self","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotate","rotation","rotation-point","row-gap","ruby-align","ruby-overhang","ruby-position","ruby-span","scale","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-type","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-orientation","text-outline","text-overflow","text-rendering","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","touch-action","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-select","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","paint-order","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode"],u=t(c),p=["accent-color","aspect-ratio","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","content-visibility","margin-block","margin-block-end","margin-block-start","margin-inline","margin-inline-end","margin-inline-start","overflow-anchor","overscroll-behavior","padding-block","padding-block-end","padding-block-start","padding-inline","padding-inline-end","padding-inline-start","scroll-snap-stop","scrollbar-3d-light-color","scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-track-color","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","shape-inside","zoom"],h=t(p),g=t(["font-display","font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"]),m=t(["additive-symbols","fallback","negative","pad","prefix","range","speak-as","suffix","symbols","system"]),f=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],b=t(f),y=["above","absolute","activeborder","additive","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","attr","auto","auto-flow","avoid","avoid-column","avoid-page","avoid-region","axis-pan","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","blur","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","brightness","bullets","button","buttonface","buttonhighlight","buttonshadow","buttontext","calc","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","color","color-burn","color-dodge","column","column-reverse","compact","condensed","conic-gradient","contain","content","contents","content-box","context-menu","continuous","contrast","copy","counter","counters","cover","crop","cross","crosshair","cubic-bezier","currentcolor","cursive","cyclic","darken","dashed","decimal","decimal-leading-zero","default","default-button","dense","destination-atop","destination-in","destination-out","destination-over","devanagari","difference","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","drop-shadow","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ethiopic-numeric","ew-resize","exclusion","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fill-box","fixed","flat","flex","flex-end","flex-start","footnotes","forwards","from","geometricPrecision","georgian","grayscale","graytext","grid","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hard-light","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","hue","hue-rotate","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-grid","inline-table","inset","inside","intrinsic","invert","italic","japanese-formal","japanese-informal","justify","kannada","katakana","katakana-iroha","keep-all","khmer","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","landscape","lao","large","larger","left","level","lighter","lighten","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","luminosity","malayalam","manipulation","match","matrix","matrix3d","media-play-button","media-slider","media-sliderthumb","media-volume-slider","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","multiple_mask_images","multiply","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","octal","opacity","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","perspective","pinch-zoom","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeating-conic-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row","row-resize","row-reverse","rtl","run-in","running","s-resize","sans-serif","saturate","saturation","scale","scale3d","scaleX","scaleY","scaleZ","screen","scroll","scrollbar","scroll-position","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","self-start","self-end","semi-condensed","semi-expanded","separate","sepia","serif","show","sidama","simp-chinese-formal","simp-chinese-informal","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","soft-light","solid","somali","source-atop","source-in","source-out","source-over","space","space-around","space-between","space-evenly","spell-out","square","square-button","start","static","status-bar","stretch","stroke","stroke-box","sub","subpixel-antialiased","svg_masks","super","sw-resize","symbolic","symbols","system-ui","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tamil","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","trad-chinese-formal","trad-chinese-informal","transform","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","unidirectional-pan","unset","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","var","vertical","vertical-text","view-box","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","wrap","wrap-reverse","x-large","x-small","xor","xx-large","xx-small"],v=t(y),x=r.concat(i).concat(a).concat(s).concat(c).concat(p).concat(f).concat(y);function w(e,t){for(var r,o=!1;null!=(r=e.next());){if(o&&"/"==r){t.tokenize=null;break}o="*"==r}return["comment","comment"]}e.registerHelper("hintWords","css",x),e.defineMIME("text/css",{documentTypes:o,mediaTypes:n,mediaFeatures:l,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:h,fontProperties:g,counterDescriptors:m,colorKeywords:b,valueKeywords:v,tokenHooks:{"/":function(e,t){return!!e.eat("*")&&(t.tokenize=w,w(e,t))}},name:"css"}),e.defineMIME("text/x-scss",{mediaTypes:n,mediaFeatures:l,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:h,colorKeywords:b,valueKeywords:v,fontProperties:g,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=w,w(e,t)):["operator","operator"]},":":function(e){return!!e.match(/^\s*\{/,!1)&&[null,null]},$:function(e){return e.match(/^[\w-]+/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"]},"#":function(e){return!!e.eat("{")&&[null,"interpolation"]}},name:"css",helperType:"scss"}),e.defineMIME("text/x-less",{mediaTypes:n,mediaFeatures:l,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:h,colorKeywords:b,valueKeywords:v,fontProperties:g,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=w,w(e,t)):["operator","operator"]},"@":function(e){return e.eat("{")?[null,"interpolation"]:!e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i,!1)&&(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"])},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"}),e.defineMIME("text/x-gss",{documentTypes:o,mediaTypes:n,mediaFeatures:l,propertyKeywords:u,nonStandardPropertyKeywords:h,fontProperties:g,counterDescriptors:m,colorKeywords:b,valueKeywords:v,supportsAtComponent:!0,tokenHooks:{"/":function(e,t){return!!e.eat("*")&&(t.tokenize=w,w(e,t))}},name:"css",helperType:"gss"})}(CodeMirror),function(e){e.defineMode("javascript",(function(t,r){var o,i,n=t.indentUnit,a=r.statementIndent,l=r.jsonld,s=r.json||l,d=!1!==r.trackScope,c=r.typescript,u=r.wordCharacters||/[\w$\xa1-\uffff]/,p=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),o=e("keyword c"),i=e("keyword d"),n=e("operator"),a={type:"atom",style:"atom"};return{if:e("if"),while:t,with:t,else:r,do:r,try:r,finally:r,return:i,break:i,continue:i,new:e("new"),delete:o,void:o,throw:o,debugger:e("debugger"),var:e("var"),const:e("var"),let:e("var"),function:e("function"),catch:e("catch"),for:e("for"),switch:e("switch"),case:e("case"),default:e("default"),in:n,typeof:n,instanceof:n,true:a,false:a,null:a,undefined:a,NaN:a,Infinity:a,this:e("this"),class:e("class"),super:e("atom"),yield:o,export:e("export"),import:e("import"),extends:o,await:o}}(),h=/[+\-*&%=<>!?|~^@]/,g=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function m(e,t,r){return o=e,i=r,t}function f(e,t){var r,o=e.next();if('"'==o||"'"==o)return t.tokenize=(r=o,function(e,t){var o,i=!1;if(l&&"@"==e.peek()&&e.match(g))return t.tokenize=f,m("jsonld-keyword","meta");for(;null!=(o=e.next())&&(o!=r||i);)i=!i&&"\\"==o;return i||(t.tokenize=f),m("string","string")}),t.tokenize(e,t);if("."==o&&e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return m("number","number");if("."==o&&e.match(".."))return m("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(o))return m(o);if("="==o&&e.eat(">"))return m("=>","operator");if("0"==o&&e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return m("number","number");if(/\d/.test(o))return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),m("number","number");if("/"==o)return e.eat("*")?(t.tokenize=b,b(e,t)):e.eat("/")?(e.skipToEnd(),m("comment","comment")):et(e,t,1)?(function(e){for(var t,r=!1,o=!1;null!=(t=e.next());){if(!r){if("/"==t&&!o)return;"["==t?o=!0:o&&"]"==t&&(o=!1)}r=!r&&"\\"==t}}(e),e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),m("regexp","string-2")):(e.eat("="),m("operator","operator",e.current()));if("`"==o)return t.tokenize=y,y(e,t);if("#"==o&&"!"==e.peek())return e.skipToEnd(),m("meta","meta");if("#"==o&&e.eatWhile(u))return m("variable","property");if("<"==o&&e.match("!--")||"-"==o&&e.match("->")&&!/\S/.test(e.string.slice(0,e.start)))return e.skipToEnd(),m("comment","comment");if(h.test(o))return">"==o&&t.lexical&&">"==t.lexical.type||(e.eat("=")?"!"!=o&&"="!=o||e.eat("="):/[<>*+\-|&?]/.test(o)&&(e.eat(o),">"==o&&e.eat(o))),"?"==o&&e.eat(".")?m("."):m("operator","operator",e.current());if(u.test(o)){e.eatWhile(u);var i=e.current();if("."!=t.lastType){if(p.propertyIsEnumerable(i)){var n=p[i];return m(n.type,n.style,i)}if("async"==i&&e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return m("async","keyword",i)}return m("variable","variable",i)}}function b(e,t){for(var r,o=!1;r=e.next();){if("/"==r&&o){t.tokenize=f;break}o="*"==r}return m("comment","comment")}function y(e,t){for(var r,o=!1;null!=(r=e.next());){if(!o&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=f;break}o=!o&&"\\"==r}return m("quasi","string-2",e.current())}var v="([{}])";function x(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){if(c){var o=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start,r));o&&(r=o.index)}for(var i=0,n=!1,a=r-1;a>=0;--a){var l=e.string.charAt(a),s=v.indexOf(l);if(s>=0&&s<3){if(!i){++a;break}if(0==--i){"("==l&&(n=!0);break}}else if(s>=3&&s<6)++i;else if(u.test(l))n=!0;else if(/["'\/`]/.test(l))for(;;--a){if(0==a)return;if(e.string.charAt(a-1)==l&&"\\"!=e.string.charAt(a-2)){a--;break}}else if(n&&!i){++a;break}}n&&!i&&(t.fatArrowAt=a)}}var w={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,import:!0,"jsonld-keyword":!0};function k(e,t,r,o,i,n){this.indented=e,this.column=t,this.type=r,this.prev=i,this.info=n,null!=o&&(this.align=o)}function _(e,t){if(!d)return!1;for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var o=e.context;o;o=o.prev)for(r=o.vars;r;r=r.next)if(r.name==t)return!0}function C(e,t,r,o,i){var n=e.cc;for(S.state=e,S.stream=i,S.marked=null,S.cc=n,S.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;)if((n.length?n.pop():s?K:B)(r,o)){for(;n.length&&n[n.length-1].lex;)n.pop()();return S.marked?S.marked:"variable"==r&&_(e,o)?"variable-2":t}}var S={state:null,column:null,marked:null,cc:null};function E(){for(var e=arguments.length-1;e>=0;e--)S.cc.push(arguments[e])}function T(){return E.apply(null,arguments),!0}function A(e,t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}function O(e){var t=S.state;if(S.marked="def",d){if(t.context)if("var"==t.lexical.info&&t.context&&t.context.block){var o=L(e,t.context);if(null!=o)return void(t.context=o)}else if(!A(e,t.localVars))return void(t.localVars=new R(e,t.localVars));r.globalVars&&!A(e,t.globalVars)&&(t.globalVars=new R(e,t.globalVars))}}function L(e,t){if(t){if(t.block){var r=L(e,t.prev);return r?r==t.prev?t:new I(r,t.vars,!0):null}return A(e,t.vars)?t:new I(t.prev,new R(e,t.vars),!1)}return null}function M(e){return"public"==e||"private"==e||"protected"==e||"abstract"==e||"readonly"==e}function I(e,t,r){this.prev=e,this.vars=t,this.block=r}function R(e,t){this.name=e,this.next=t}var F=new R("this",new R("arguments",null));function N(){S.state.context=new I(S.state.context,S.state.localVars,!1),S.state.localVars=F}function z(){S.state.context=new I(S.state.context,S.state.localVars,!0),S.state.localVars=null}function D(){S.state.localVars=S.state.context.vars,S.state.context=S.state.context.prev}function P(e,t){var r=function(){var r=S.state,o=r.indented;if("stat"==r.lexical.type)o=r.lexical.indented;else for(var i=r.lexical;i&&")"==i.type&&i.align;i=i.prev)o=i.indented;r.lexical=new k(o,S.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function H(){var e=S.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function U(e){return function t(r){return r==e?T():";"==e||"}"==r||")"==r||"]"==r?E():T(t)}}function B(e,t){return"var"==e?T(P("vardef",t),Se,U(";"),H):"keyword a"==e?T(P("form"),V,B,H):"keyword b"==e?T(P("form"),B,H):"keyword d"==e?S.stream.match(/^\s*$/,!1)?T():T(P("stat"),Z,U(";"),H):"debugger"==e?T(U(";")):"{"==e?T(P("}"),z,de,H,D):";"==e?T():"if"==e?("else"==S.state.lexical.info&&S.state.cc[S.state.cc.length-1]==H&&S.state.cc.pop()(),T(P("form"),V,B,H,Me)):"function"==e?T(Ne):"for"==e?T(P("form"),z,Ie,B,D,H):"class"==e||c&&"interface"==t?(S.marked="keyword",T(P("form","class"==e?e:t),Ue,H)):"variable"==e?c&&"declare"==t?(S.marked="keyword",T(B)):c&&("module"==t||"enum"==t||"type"==t)&&S.stream.match(/^\s*\w/,!1)?(S.marked="keyword","enum"==t?T(Xe):"type"==t?T(De,U("operator"),ge,U(";")):T(P("form"),Ee,U("{"),P("}"),de,H,H)):c&&"namespace"==t?(S.marked="keyword",T(P("form"),K,B,H)):c&&"abstract"==t?(S.marked="keyword",T(B)):T(P("stat"),re):"switch"==e?T(P("form"),V,U("{"),P("}","switch"),z,de,H,H,D):"case"==e?T(K,U(":")):"default"==e?T(U(":")):"catch"==e?T(P("form"),N,W,B,H,D):"export"==e?T(P("stat"),je,H):"import"==e?T(P("stat"),qe,H):"async"==e?T(B):"@"==t?T(K,B):E(P("stat"),K,U(";"),H)}function W(e){if("("==e)return T(Pe,U(")"))}function K(e,t){return q(e,t,!1)}function j(e,t){return q(e,t,!0)}function V(e){return"("!=e?E():T(P(")"),Z,U(")"),H)}function q(e,t,r){if(S.state.fatArrowAt==S.stream.start){var o=r?$:X;if("("==e)return T(N,P(")"),le(Pe,")"),H,U("=>"),o,D);if("variable"==e)return E(N,Ee,U("=>"),o,D)}var i=r?J:G;return w.hasOwnProperty(e)?T(i):"function"==e?T(Ne,i):"class"==e||c&&"interface"==t?(S.marked="keyword",T(P("form"),He,H)):"keyword c"==e||"async"==e?T(r?j:K):"("==e?T(P(")"),Z,U(")"),H,i):"operator"==e||"spread"==e?T(r?j:K):"["==e?T(P("]"),Ye,H,i):"{"==e?se(ie,"}",null,i):"quasi"==e?E(Q,i):"new"==e?T(function(e){return function(t){return"."==t?T(e?te:ee):"variable"==t&&c?T(ke,e?J:G):E(e?j:K)}}(r)):T()}function Z(e){return e.match(/[;\}\)\],]/)?E():E(K)}function G(e,t){return","==e?T(Z):J(e,t,!1)}function J(e,t,r){var o=0==r?G:J,i=0==r?K:j;return"=>"==e?T(N,r?$:X,D):"operator"==e?/\+\+|--/.test(t)||c&&"!"==t?T(o):c&&"<"==t&&S.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1)?T(P(">"),le(ge,">"),H,o):"?"==t?T(K,U(":"),i):T(i):"quasi"==e?E(Q,o):";"!=e?"("==e?se(j,")","call",o):"."==e?T(oe,o):"["==e?T(P("]"),Z,U("]"),H,o):c&&"as"==t?(S.marked="keyword",T(ge,o)):"regexp"==e?(S.state.lastType=S.marked="operator",S.stream.backUp(S.stream.pos-S.stream.start-1),T(i)):void 0:void 0}function Q(e,t){return"quasi"!=e?E():"${"!=t.slice(t.length-2)?T(Q):T(Z,Y)}function Y(e){if("}"==e)return S.marked="string-2",S.state.tokenize=y,T(Q)}function X(e){return x(S.stream,S.state),E("{"==e?B:K)}function $(e){return x(S.stream,S.state),E("{"==e?B:j)}function ee(e,t){if("target"==t)return S.marked="keyword",T(G)}function te(e,t){if("target"==t)return S.marked="keyword",T(J)}function re(e){return":"==e?T(H,B):E(G,U(";"),H)}function oe(e){if("variable"==e)return S.marked="property",T()}function ie(e,t){return"async"==e?(S.marked="property",T(ie)):"variable"==e||"keyword"==S.style?(S.marked="property","get"==t||"set"==t?T(ne):(c&&S.state.fatArrowAt==S.stream.start&&(r=S.stream.match(/^\s*:\s*/,!1))&&(S.state.fatArrowAt=S.stream.pos+r[0].length),T(ae))):"number"==e||"string"==e?(S.marked=l?"property":S.style+" property",T(ae)):"jsonld-keyword"==e?T(ae):c&&M(t)?(S.marked="keyword",T(ie)):"["==e?T(K,ce,U("]"),ae):"spread"==e?T(j,ae):"*"==t?(S.marked="keyword",T(ie)):":"==e?E(ae):void 0;var r}function ne(e){return"variable"!=e?E(ae):(S.marked="property",T(Ne))}function ae(e){return":"==e?T(j):"("==e?E(Ne):void 0}function le(e,t,r){function o(i,n){if(r?r.indexOf(i)>-1:","==i){var a=S.state.lexical;return"call"==a.info&&(a.pos=(a.pos||0)+1),T((function(r,o){return r==t||o==t?E():E(e)}),o)}return i==t||n==t?T():r&&r.indexOf(";")>-1?E(e):T(U(t))}return function(r,i){return r==t||i==t?T():E(e,o)}}function se(e,t,r){for(var o=3;o<arguments.length;o++)S.cc.push(arguments[o]);return T(P(t,r),le(e,t),H)}function de(e){return"}"==e?T():E(B,de)}function ce(e,t){if(c){if(":"==e)return T(ge);if("?"==t)return T(ce)}}function ue(e,t){if(c&&(":"==e||"in"==t))return T(ge)}function pe(e){if(c&&":"==e)return S.stream.match(/^\s*\w+\s+is\b/,!1)?T(K,he,ge):T(ge)}function he(e,t){if("is"==t)return S.marked="keyword",T()}function ge(e,t){return"keyof"==t||"typeof"==t||"infer"==t||"readonly"==t?(S.marked="keyword",T("typeof"==t?j:ge)):"variable"==e||"void"==t?(S.marked="type",T(we)):"|"==t||"&"==t?T(ge):"string"==e||"number"==e||"atom"==e?T(we):"["==e?T(P("]"),le(ge,"]",","),H,we):"{"==e?T(P("}"),fe,H,we):"("==e?T(le(xe,")"),me,we):"<"==e?T(le(ge,">"),ge):"quasi"==e?E(ye,we):void 0}function me(e){if("=>"==e)return T(ge)}function fe(e){return e.match(/[\}\)\]]/)?T():","==e||";"==e?T(fe):E(be,fe)}function be(e,t){return"variable"==e||"keyword"==S.style?(S.marked="property",T(be)):"?"==t||"number"==e||"string"==e?T(be):":"==e?T(ge):"["==e?T(U("variable"),ue,U("]"),be):"("==e?E(ze,be):e.match(/[;\}\)\],]/)?void 0:T()}function ye(e,t){return"quasi"!=e?E():"${"!=t.slice(t.length-2)?T(ye):T(ge,ve)}function ve(e){if("}"==e)return S.marked="string-2",S.state.tokenize=y,T(ye)}function xe(e,t){return"variable"==e&&S.stream.match(/^\s*[?:]/,!1)||"?"==t?T(xe):":"==e?T(ge):"spread"==e?T(xe):E(ge)}function we(e,t){return"<"==t?T(P(">"),le(ge,">"),H,we):"|"==t||"."==e||"&"==t?T(ge):"["==e?T(ge,U("]"),we):"extends"==t||"implements"==t?(S.marked="keyword",T(ge)):"?"==t?T(ge,U(":"),ge):void 0}function ke(e,t){if("<"==t)return T(P(">"),le(ge,">"),H,we)}function _e(){return E(ge,Ce)}function Ce(e,t){if("="==t)return T(ge)}function Se(e,t){return"enum"==t?(S.marked="keyword",T(Xe)):E(Ee,ce,Oe,Le)}function Ee(e,t){return c&&M(t)?(S.marked="keyword",T(Ee)):"variable"==e?(O(t),T()):"spread"==e?T(Ee):"["==e?se(Ae,"]"):"{"==e?se(Te,"}"):void 0}function Te(e,t){return"variable"!=e||S.stream.match(/^\s*:/,!1)?("variable"==e&&(S.marked="property"),"spread"==e?T(Ee):"}"==e?E():"["==e?T(K,U("]"),U(":"),Te):T(U(":"),Ee,Oe)):(O(t),T(Oe))}function Ae(){return E(Ee,Oe)}function Oe(e,t){if("="==t)return T(j)}function Le(e){if(","==e)return T(Se)}function Me(e,t){if("keyword b"==e&&"else"==t)return T(P("form","else"),B,H)}function Ie(e,t){return"await"==t?T(Ie):"("==e?T(P(")"),Re,H):void 0}function Re(e){return"var"==e?T(Se,Fe):"variable"==e?T(Fe):E(Fe)}function Fe(e,t){return")"==e?T():";"==e?T(Fe):"in"==t||"of"==t?(S.marked="keyword",T(K,Fe)):E(K,Fe)}function Ne(e,t){return"*"==t?(S.marked="keyword",T(Ne)):"variable"==e?(O(t),T(Ne)):"("==e?T(N,P(")"),le(Pe,")"),H,pe,B,D):c&&"<"==t?T(P(">"),le(_e,">"),H,Ne):void 0}function ze(e,t){return"*"==t?(S.marked="keyword",T(ze)):"variable"==e?(O(t),T(ze)):"("==e?T(N,P(")"),le(Pe,")"),H,pe,D):c&&"<"==t?T(P(">"),le(_e,">"),H,ze):void 0}function De(e,t){return"keyword"==e||"variable"==e?(S.marked="type",T(De)):"<"==t?T(P(">"),le(_e,">"),H):void 0}function Pe(e,t){return"@"==t&&T(K,Pe),"spread"==e?T(Pe):c&&M(t)?(S.marked="keyword",T(Pe)):c&&"this"==e?T(ce,Oe):E(Ee,ce,Oe)}function He(e,t){return"variable"==e?Ue(e,t):Be(e,t)}function Ue(e,t){if("variable"==e)return O(t),T(Be)}function Be(e,t){return"<"==t?T(P(">"),le(_e,">"),H,Be):"extends"==t||"implements"==t||c&&","==e?("implements"==t&&(S.marked="keyword"),T(c?ge:K,Be)):"{"==e?T(P("}"),We,H):void 0}function We(e,t){return"async"==e||"variable"==e&&("static"==t||"get"==t||"set"==t||c&&M(t))&&S.stream.match(/^\s+#?[\w$\xa1-\uffff]/,!1)?(S.marked="keyword",T(We)):"variable"==e||"keyword"==S.style?(S.marked="property",T(Ke,We)):"number"==e||"string"==e?T(Ke,We):"["==e?T(K,ce,U("]"),Ke,We):"*"==t?(S.marked="keyword",T(We)):c&&"("==e?E(ze,We):";"==e||","==e?T(We):"}"==e?T():"@"==t?T(K,We):void 0}function Ke(e,t){if("!"==t)return T(Ke);if("?"==t)return T(Ke);if(":"==e)return T(ge,Oe);if("="==t)return T(j);var r=S.state.lexical.prev;return E(r&&"interface"==r.info?ze:Ne)}function je(e,t){return"*"==t?(S.marked="keyword",T(Qe,U(";"))):"default"==t?(S.marked="keyword",T(K,U(";"))):"{"==e?T(le(Ve,"}"),Qe,U(";")):E(B)}function Ve(e,t){return"as"==t?(S.marked="keyword",T(U("variable"))):"variable"==e?E(j,Ve):void 0}function qe(e){return"string"==e?T():"("==e?E(K):"."==e?E(G):E(Ze,Ge,Qe)}function Ze(e,t){return"{"==e?se(Ze,"}"):("variable"==e&&O(t),"*"==t&&(S.marked="keyword"),T(Je))}function Ge(e){if(","==e)return T(Ze,Ge)}function Je(e,t){if("as"==t)return S.marked="keyword",T(Ze)}function Qe(e,t){if("from"==t)return S.marked="keyword",T(K)}function Ye(e){return"]"==e?T():E(le(j,"]"))}function Xe(){return E(P("form"),Ee,U("{"),P("}"),le($e,"}"),H,H)}function $e(){return E(Ee,Oe)}function et(e,t,r){return t.tokenize==f&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||"quasi"==t.lastType&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}return N.lex=z.lex=!0,D.lex=!0,H.lex=!0,{startState:function(e){var t={tokenize:f,lastType:"sof",cc:[],lexical:new k((e||0)-n,0,"block",!1),localVars:r.localVars,context:r.localVars&&new I(null,null,!1),indented:e||0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),x(e,t)),t.tokenize!=b&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==o?r:(t.lastType="operator"!=o||"++"!=i&&"--"!=i?o:"incdec",C(t,r,o,i,e))},indent:function(t,o){if(t.tokenize==b||t.tokenize==y)return e.Pass;if(t.tokenize!=f)return 0;var i,l=o&&o.charAt(0),s=t.lexical;if(!/^\s*else\b/.test(o))for(var d=t.cc.length-1;d>=0;--d){var c=t.cc[d];if(c==H)s=s.prev;else if(c!=Me&&c!=D)break}for(;("stat"==s.type||"form"==s.type)&&("}"==l||(i=t.cc[t.cc.length-1])&&(i==G||i==J)&&!/^[,\.=+\-*:?[\(]/.test(o));)s=s.prev;a&&")"==s.type&&"stat"==s.prev.type&&(s=s.prev);var u=s.type,p=l==u;return"vardef"==u?s.indented+("operator"==t.lastType||","==t.lastType?s.info.length+1:0):"form"==u&&"{"==l?s.indented:"form"==u?s.indented+n:"stat"==u?s.indented+(function(e,t){return"operator"==e.lastType||","==e.lastType||h.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}(t,o)?a||n:0):"switch"!=s.info||p||0==r.doubleIndentSwitch?s.align?s.column+(p?0:1):s.indented+(p?0:n):s.indented+(/^(?:case|default)\b/.test(o)?n:2*n)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:s?null:"/*",blockCommentEnd:s?null:"*/",blockCommentContinue:s?null:" * ",lineComment:s?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:s?"json":"javascript",jsonldMode:l,jsonMode:s,expressionAllowed:et,skipExpression:function(t){C(t,"atom","atom","true",new e.StringStream("",2,null))}}})),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/manifest+json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})}(CodeMirror),function(e){var t={autoSelfClosers:{area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},implicitlyClosed:{dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},contextGrabbers:{dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!0,caseFold:!0},r={autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1,allowMissingTagName:!1,caseFold:!1};e.defineMode("xml",(function(o,i){var n,a,l=o.indentUnit,s={},d=i.htmlMode?t:r;for(var c in d)s[c]=d[c];for(var c in i)s[c]=i[c];function u(e,t){function r(r){return t.tokenize=r,r(e,t)}var o=e.next();return"<"==o?e.eat("!")?e.eat("[")?e.match("CDATA[")?r(h("atom","]]>")):null:e.match("--")?r(h("comment","--\x3e")):e.match("DOCTYPE",!0,!0)?(e.eatWhile(/[\w\._\-]/),r(g(1))):null:e.eat("?")?(e.eatWhile(/[\w\._\-]/),t.tokenize=h("meta","?>"),"meta"):(n=e.eat("/")?"closeTag":"openTag",t.tokenize=p,"tag bracket"):"&"==o?(e.eat("#")?e.eat("x")?e.eatWhile(/[a-fA-F\d]/)&&e.eat(";"):e.eatWhile(/[\d]/)&&e.eat(";"):e.eatWhile(/[\w\.\-:]/)&&e.eat(";"))?"atom":"error":(e.eatWhile(/[^&<]/),null)}function p(e,t){var r,o,i=e.next();if(">"==i||"/"==i&&e.eat(">"))return t.tokenize=u,n=">"==i?"endTag":"selfcloseTag","tag bracket";if("="==i)return n="equals",null;if("<"==i){t.tokenize=u,t.state=v,t.tagName=t.tagStart=null;var a=t.tokenize(e,t);return a?a+" tag error":"tag error"}return/[\'\"]/.test(i)?(t.tokenize=(r=i,o=function(e,t){for(;!e.eol();)if(e.next()==r){t.tokenize=p;break}return"string"},o.isInAttribute=!0,o),t.stringStartCol=e.column(),t.tokenize(e,t)):(e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),"word")}function h(e,t){return function(r,o){for(;!r.eol();){if(r.match(t)){o.tokenize=u;break}r.next()}return e}}function g(e){return function(t,r){for(var o;null!=(o=t.next());){if("<"==o)return r.tokenize=g(e+1),r.tokenize(t,r);if(">"==o){if(1==e){r.tokenize=u;break}return r.tokenize=g(e-1),r.tokenize(t,r)}}return"meta"}}function m(e){return e&&e.toLowerCase()}function f(e,t,r){this.prev=e.context,this.tagName=t||"",this.indent=e.indented,this.startOfLine=r,(s.doNotIndent.hasOwnProperty(t)||e.context&&e.context.noIndent)&&(this.noIndent=!0)}function b(e){e.context&&(e.context=e.context.prev)}function y(e,t){for(var r;;){if(!e.context)return;if(r=e.context.tagName,!s.contextGrabbers.hasOwnProperty(m(r))||!s.contextGrabbers[m(r)].hasOwnProperty(m(t)))return;b(e)}}function v(e,t,r){return"openTag"==e?(r.tagStart=t.column(),x):"closeTag"==e?w:v}function x(e,t,r){return"word"==e?(r.tagName=t.current(),a="tag",C):s.allowMissingTagName&&"endTag"==e?(a="tag bracket",C(e,0,r)):(a="error",x)}function w(e,t,r){if("word"==e){var o=t.current();return r.context&&r.context.tagName!=o&&s.implicitlyClosed.hasOwnProperty(m(r.context.tagName))&&b(r),r.context&&r.context.tagName==o||!1===s.matchClosing?(a="tag",k):(a="tag error",_)}return s.allowMissingTagName&&"endTag"==e?(a="tag bracket",k(e,0,r)):(a="error",_)}function k(e,t,r){return"endTag"!=e?(a="error",k):(b(r),v)}function _(e,t,r){return a="error",k(e,0,r)}function C(e,t,r){if("word"==e)return a="attribute",S;if("endTag"==e||"selfcloseTag"==e){var o=r.tagName,i=r.tagStart;return r.tagName=r.tagStart=null,"selfcloseTag"==e||s.autoSelfClosers.hasOwnProperty(m(o))?y(r,o):(y(r,o),r.context=new f(r,o,i==r.indented)),v}return a="error",C}function S(e,t,r){return"equals"==e?E:(s.allowMissing||(a="error"),C(e,0,r))}function E(e,t,r){return"string"==e?T:"word"==e&&s.allowUnquoted?(a="string",C):(a="error",C(e,0,r))}function T(e,t,r){return"string"==e?T:C(e,0,r)}return u.isInText=!0,{startState:function(e){var t={tokenize:u,state:v,indented:e||0,tagName:null,tagStart:null,context:null};return null!=e&&(t.baseIndent=e),t},token:function(e,t){if(!t.tagName&&e.sol()&&(t.indented=e.indentation()),e.eatSpace())return null;n=null;var r=t.tokenize(e,t);return(r||n)&&"comment"!=r&&(a=null,t.state=t.state(n||r,e,t),a&&(r="error"==a?r+" error":a)),r},indent:function(t,r,o){var i=t.context;if(t.tokenize.isInAttribute)return t.tagStart==t.indented?t.stringStartCol+1:t.indented+l;if(i&&i.noIndent)return e.Pass;if(t.tokenize!=p&&t.tokenize!=u)return o?o.match(/^(\s*)/)[0].length:0;if(t.tagName)return!1!==s.multilineTagIndentPastTag?t.tagStart+t.tagName.length+2:t.tagStart+l*(s.multilineTagIndentFactor||1);if(s.alignCDATA&&/<!\[CDATA\[/.test(r))return 0;var n=r&&/^<(\/)?([\w_:\.-]*)/.exec(r);if(n&&n[1])for(;i;){if(i.tagName==n[2]){i=i.prev;break}if(!s.implicitlyClosed.hasOwnProperty(m(i.tagName)))break;i=i.prev}else if(n)for(;i;){var a=s.contextGrabbers[m(i.tagName)];if(!a||!a.hasOwnProperty(m(n[2])))break;i=i.prev}for(;i&&i.prev&&!i.startOfLine;)i=i.prev;return i?i.indent+l:t.baseIndent||0},electricInput:/<\/[\s\w:]+>$/,blockCommentStart:"\x3c!--",blockCommentEnd:"--\x3e",configuration:s.htmlMode?"html":"xml",helperType:s.htmlMode?"html":"xml",skipAttribute:function(e){e.state==E&&(e.state=C)},xmlCurrentTag:function(e){return e.tagName?{name:e.tagName,close:"closeTag"==e.type}:null},xmlCurrentContext:function(e){for(var t=[],r=e.context;r;r=r.prev)t.push(r.tagName);return t.reverse()}}})),e.defineMIME("text/xml","xml"),e.defineMIME("application/xml","xml"),e.mimeModes.hasOwnProperty("text/html")||e.defineMIME("text/html",{name:"xml",htmlMode:!0})}(CodeMirror),function(e){function t(e,t,r,o){this.state=e,this.mode=t,this.depth=r,this.prev=o}function r(o){return new t(e.copyState(o.mode,o.state),o.mode,o.depth,o.prev&&r(o.prev))}e.defineMode("jsx",(function(o,i){var n=e.getMode(o,{name:"xml",allowMissing:!0,multilineTagIndentPastTag:!1,allowMissingTagName:!0}),a=e.getMode(o,i&&i.base||"javascript");function l(e){var t=e.tagName;e.tagName=null;var r=n.indent(e,"","");return e.tagName=t,r}return{startState:function(){return{context:new t(e.startState(a),a)}},copyState:function(e){return{context:r(e.context)}},token:function r(i,s){return s.context.mode==n?function(i,s,d){if(2==d.depth)return i.match(/^.*?\*\//)?d.depth=1:i.skipToEnd(),"comment";if("{"==i.peek()){n.skipAttribute(d.state);var c=l(d.state),u=d.state.context;if(u&&i.match(/^[^>]*>\s*$/,!1)){for(;u.prev&&!u.startOfLine;)u=u.prev;u.startOfLine?c-=o.indentUnit:d.prev.state.lexical&&(c=d.prev.state.lexical.indented)}else 1==d.depth&&(c+=o.indentUnit);return s.context=new t(e.startState(a,c),a,0,s.context),null}if(1==d.depth){if("<"==i.peek())return n.skipAttribute(d.state),s.context=new t(e.startState(n,l(d.state)),n,0,s.context),null;if(i.match("//"))return i.skipToEnd(),"comment";if(i.match("/*"))return d.depth=2,r(i,s)}var p,h=n.token(i,d.state),g=i.current();return/\btag\b/.test(h)?/>$/.test(g)?d.state.context?d.depth=0:s.context=s.context.prev:/^</.test(g)&&(d.depth=1):!h&&(p=g.indexOf("{"))>-1&&i.backUp(g.length-p),h}(i,s,s.context):function(r,o,i){if("<"==r.peek()&&!r.match(/^<([^<>]|<[^>]*>)+,\s*>/,!1)&&a.expressionAllowed(r,i.state))return o.context=new t(e.startState(n,a.indent(i.state,"","")),n,0,o.context),a.skipExpression(i.state),null;var l=a.token(r,i.state);if(!l&&null!=i.depth){var s=r.current();"{"==s?i.depth++:"}"==s&&0==--i.depth&&(o.context=o.context.prev)}return l}(i,s,s.context)},indent:function(e,t,r){return e.context.mode.indent(e.context.state,t,r)},innerMode:function(e){return e.context}}}),"xml","javascript"),e.defineMIME("text/jsx","jsx"),e.defineMIME("text/typescript-jsx",{name:"jsx",base:{name:"javascript",typescript:!0}})}(CodeMirror);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vi=window.CodeMirror,xi=c`/**
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

/* Completions */

.CodeMirror-hints {
  position: absolute;
  z-index: 10;
  overflow: hidden;
  list-style: none;

  margin: 0;
  padding: 0;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px,
    rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
  border: 1px solid var(--playground-code-selection-background, silver);

  background: var(--playground-code-background, white);
  font-size: var(--playground-code-font-size, 14px);
  font-family: var(--playground-code-font-family, monospace);

  max-height: 20em;
  width: 600px;
  max-width: min(600px, 80vw);
  overflow-y: auto;
}

.CodeMirror-hint {
  margin: 0;
  padding: 0 6px;
  white-space: pre;
  color: var(--playground-code-cursor-color, black);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

@media (pointer: coarse) {
  .CodeMirror-hint {
    padding: 1em 6px;
  }
}

.CodeMirror-hint-active {
  background: var(--playground-code-background, rgba(0, 0, 0, 0.2));
  filter: brightness(1.2);
}

.CodeMirror-hint mark {
  background: inherit;
  color: var(--playground-code-qualifier-color, #555);
}

.CodeMirror-hint .hint-object-name {
  padding-right: 2em;
  white-space: nowrap;
}

.CodeMirror-hint .hint-object-details {
  flex-basis: 80%;
  font-size: calc(var(--playground-code-font-size, 14px) * 0.9);
  color: var(--playground-code-string-2-color, white);
  opacity: 0.8;
  text-align: right;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;let wi=class extends de{render(){return W`<div id="message"><slot></slot></div>`}};wi.styles=c`
    :host {
      position: absolute;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      z-index: 9;
      background: rgba(0, 0, 0, 0.32);
      overflow-y: auto;
    }

    #message {
      background: #fff;
      color: #000;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.3) 0 2px 10px;
    }
  `,wi=o([ue("playground-internal-overlay")],wi);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let ki=class extends de{constructor(){super(...arguments),this._docCache=new WeakMap,this.lineNumbers=!1,this.lineWrapping=!1,this.readonly=!1,this.noCompletions=!1,this._completionsOpen=!1,this._currentCompletionSelectionLabel="",this._currentCompletionRequestId=0,this.pragmas="on",this._showKeyboardHelp=!1,this._resizing=!1,this._valueChangingFromOutside=!1,this._diagnosticMarkers=[],this._diagnosticsMouseoverListenerActive=!1,this._onMouseOverWithDiagnostics=e=>{var t,r,o;if(!(null===(t=this.diagnostics)||void 0===t?void 0:t.length))return;const i=null===(r=e.target.className)||void 0===r?void 0:r.match(/diagnostic-(\d+)/);if(null===i)return void(this._tooltipDiagnostic=void 0);const n=Number(i[1]),a=this.diagnostics[n];if(a===(null===(o=this._tooltipDiagnostic)||void 0===o?void 0:o.diagnostic))return;let l="";const s=this.getBoundingClientRect(),d=e.target.getBoundingClientRect(),c=s.y+s.height/2;d.y<c?l+=`top:${d.y+d.height-s.y}px;`:l+=`bottom:${s.bottom-d.y}px;`;const u=s.x+s.width/2;d.left<u?l+=`left:${Math.max(0,d.x-s.x)}px`:l+=`right:${Math.max(0,s.right-d.right)}px`,this._tooltipDiagnostic={diagnostic:a,position:l}}}get cursorPosition(){var e;const t=null===(e=this._codemirror)||void 0===e?void 0:e.getCursor("start");return t?{ch:t.ch,line:t.line}:{ch:0,line:0}}get cursorIndex(){const e=this._codemirror;if(!e)return 0;const t=e.getCursor("start");return e.indexFromPos(t)}get tokenUnderCursor(){const e=this._codemirror;if(!e)return{start:0,end:0,string:""};const t=e.getCursor("start"),r=e.getTokenAt(t);return{start:r.start,end:r.end,string:r.string}}get value(){return this._value}set value(e){const t=this._value;this._value=e,this.requestUpdate("value",t)}update(e){var t,r,o,i,n,a;const l=this._codemirror;if(void 0===l)this._createView();else{const s=e;for(const e of s.keys())switch(e){case"documentKey":{const e=null!==(t=this.documentKey)&&void 0!==t?t:{};let i=this._docCache.get(e),n=!1;i?i.getValue()!==this.value&&i.setValue(null!==(o=this.value)&&void 0!==o?o:""):(i=new vi.Doc(null!==(r=this.value)&&void 0!==r?r:"",this._getLanguageMode()),this._docCache.set(e,i),n=!0),this._valueChangingFromOutside=!0,l.swapDoc(i),n&&this._applyHideAndFoldRegions(),this._valueChangingFromOutside=!1;break}case"value":if(s.has("documentKey"))break;this._valueChangingFromOutside=!0,l.setValue(null!==(i=this.value)&&void 0!==i?i:""),this._valueChangingFromOutside=!1;break;case"lineNumbers":l.setOption("lineNumbers",this.lineNumbers);break;case"lineWrapping":this.lineWrapping?l.on("renderLine",this._onRenderLine):l.off("renderLine",this._onRenderLine),l.setOption("lineWrapping",this.lineWrapping);break;case"type":l.setOption("mode",this._getLanguageMode());break;case"readonly":l.setOption("readOnly",this.readonly);break;case"pragmas":this._applyHideAndFoldRegions();break;case"diagnostics":this._showDiagnostics();break;case"cursorIndex":l.setCursor(null!==(n=this.cursorIndex)&&void 0!==n?n:0);break;case"cursorPosition":l.setCursor(null!==(a=this.cursorPosition)&&void 0!==a?a:{ch:0,line:0});break;case"_completions":this._showCompletions()}}super.update(e)}render(){var e,t;return this.readonly?this._cmDom:W`
      <div
        id="focusContainer"
        tabindex="0"
        @mousedown=${this._onMousedown}
        @focus=${this._onFocus}
        @blur=${this._onBlur}
        @keydown=${this._onKeyDown}
      >
        ${this._showKeyboardHelp?W`<playground-internal-overlay>
              <p id="keyboardHelp" part="dialog">
                Press <strong>Enter</strong> to start editing<br />
                Press <strong>Escape</strong> to exit editor
              </p>
            </playground-internal-overlay>`:j}
        ${this._cmDom}
        <div
          id="tooltip"
          ?hidden=${!this._tooltipDiagnostic}
          style=${wr(null===(e=this._tooltipDiagnostic)||void 0===e?void 0:e.position)}
        >
          <div part="diagnostic-tooltip">
            ${null===(t=this._tooltipDiagnostic)||void 0===t?void 0:t.diagnostic.message}
          </div>
        </div>
      </div>
    `}connectedCallback(){"function"==typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver((()=>{var e;this._resizing||(this._resizing=!0,null===(e=this._codemirror)||void 0===e||e.refresh(),this._resizing=!1)})),this._resizeObserver.observe(this)),super.connectedCallback()}disconnectedCallback(){var e;null===(e=this._resizeObserver)||void 0===e||e.disconnect(),this._resizeObserver=void 0,super.disconnectedCallback()}_createView(){var e;const t=vi((e=>{this._cmDom=e,this._resizing=!0,requestAnimationFrame((()=>{requestAnimationFrame((()=>{var e;null===(e=this._codemirror)||void 0===e||e.refresh(),this._resizing=!1}))}))}),{value:null!==(e=this.value)&&void 0!==e?e:"",lineNumbers:this.lineNumbers,lineWrapping:this.lineWrapping,mode:this._getLanguageMode(),readOnly:this.readonly,inputStyle:"contenteditable",tabindex:-1,extraKeys:{Tab:()=>{var e;t.replaceSelection(Array((null!==(e=t.getOption("indentUnit"))&&void 0!==e?e:2)+1).join(" "))},"Ctrl-Space":()=>{const e=this.tokenUnderCursor.string.trim();this._requestCompletions({isRefinement:!1,tokenUnderCursor:e})},"Ctrl-/":()=>t.toggleComment(),"Cmd-/":()=>t.toggleComment()}});t.on("change",((e,r)=>{this._value=t.getValue(),this._valueChangingFromOutside?(this._applyHideAndFoldRegions(),this._showDiagnostics()):(this.dispatchEvent(new Event("change")),this._requestCompletionsIfNeeded(r))})),this.lineWrapping&&t.on("renderLine",this._onRenderLine),this._codemirror=t}_onRenderLine(e,t,r){const o=e.getOption("lineNumbers")?"0.7em":"4px",i=e.getOption("tabSize")||4,n=vi.countColumn(t.text,null,i);n>0&&(r.style.textIndent=`-${n}ch`,r.style.paddingLeft=`calc(${o} + ${n}ch)`)}_requestCompletionsIfNeeded(e){if(this.noCompletions||!this._currentFiletypeSupportsCompletion()||!this._codemirror)return;const t=this._codemirror.getTokenAt(e.from),r=this.tokenUnderCursor.string.trim(),o=r.trim(),i="+input"===e.origin,n=(r.length>1||"."===t.string)&&i,a="complete"===e.origin;o.length<=0||(a?this._completions=[]:this._requestCompletions({isRefinement:n,tokenUnderCursor:r}))}_requestCompletions({isRefinement:e,tokenUnderCursor:t}){if(this.noCompletions||!this._currentFiletypeSupportsCompletion()||!this._codemirror)return;const r=++this._currentCompletionRequestId,o=this.cursorIndex;this.dispatchEvent(new CustomEvent("request-completions",{detail:{isRefinement:e,fileContent:this.value,tokenUnderCursor:t,cursorIndex:this.cursorIndex,provideCompletions:e=>this._onCompletionsProvided(r,e,o)}}))}_onCompletionsProvided(e,t,r){e===this._currentCompletionRequestId&&r===this.cursorIndex&&(this._completions=t)}_currentFiletypeSupportsCompletion(){return"ts"===this.type}focus(){var e;null===(e=this._codemirrorEditable)||void 0===e||e.focus()}_completionsAsHints(){var e,t;const r=this._codemirror,o=r.getCursor("start"),i=r.getTokenAt(o),n=o.line,a=null!==(t=null===(e=this._completions)||void 0===e?void 0:e.map(((e,t)=>({text:e.text,displayText:e.displayText,render:(r,o,i)=>{const n=i;this._renderHint(r,o,n,0===t?e.details:void 0)},get details(){return e.details}}))))&&void 0!==t?t:[],l={from:{line:n,ch:i.start},to:{line:n,ch:i.end},list:a};return vi.on(l,"select",(async(e,t)=>{var r;this._isCodeEditorHint(e)&&this._currentCompletionSelectionLabel!==e.text&&(null===(r=this._onCompletionSelectedChange)||void 0===r||r.call(this),this._renderHint(t,l,e,e.details))})),vi.on(l,"shown",(()=>{window.requestAnimationFrame((()=>{this._completionsOpen=!0}))})),vi.on(l,"close",(()=>{window.requestAnimationFrame((()=>{this._completionsOpen=!1}))})),l}_isCodeEditorHint(e){return"string"!=typeof e&&Object.prototype.hasOwnProperty.call(e,"details")}_renderHint(e,t,r,o){var i;if(!e)return;const n=t.list.indexOf(r),a=null===(i=this._completions)||void 0===i?void 0:i[n],l=this._buildHintObjectName(r.displayText,a);this._renderCompletionItem(l,e),void 0!==o&&o.then((o=>{this._renderCompletionItemWithDetails(l,o,e),this._onCompletionSelectedChange=()=>this._renderHint(e,t,r),this._currentCompletionSelectionLabel=r.text}))}_renderCompletionItem(e,t){ae(W`<span class="hint-object-name">${e}</span>`,t)}_renderCompletionItemWithDetails(e,t,r){ae(W`<span class="hint-object-name">${e}</span>
        <span class="hint-object-details">${t.text}</span> `,r)}_buildHintObjectName(e,t){var r;const o=null!=e?e:"",i=null!==(r=null==t?void 0:t.matches)&&void 0!==r?r:[];if(i.length<=0)return o;const n=i[0].indices[0],a=n[0],l=n[1],s=null==o?void 0:o.substring(0,a),d=null==o?void 0:o.substring(a,l+1),c=null==o?void 0:o.substring(l+1);return W`
      ${s}<mark>${d}</mark>${c}
    `}_showCompletions(){const e=this._codemirror;if(!e||!this._completions||this._completions.length<=0)return;const t={hint:this._completionsAsHints.bind(this),completeSingle:!1,closeOnPick:!0,closeOnUnfocus:!0,container:this._focusContainer,alignWithWord:!0};e.showHint(t)}_onMousedown(){var e;null===(e=this._codemirrorEditable)||void 0===e||e.focus()}_onFocus(){this._showKeyboardHelp=!0}_onBlur(){this._showKeyboardHelp=!1}_onKeyDown(e){var t,r;"Enter"===e.key&&e.target===this._focusContainer?(null===(t=this._codemirrorEditable)||void 0===t||t.focus(),e.preventDefault()):"Escape"===e.key&&(this._completionsOpen||null===(r=this._focusContainer)||void 0===r||r.focus())}async _applyHideAndFoldRegions(){const e=this._codemirror;if(!e)return;for(const t of e.getAllMarks())t.clear();if("off-visible"===this.pragmas)return;const t=this._maskPatternForLang();if(void 0===t)return;const r=e.getDoc(),o=(t,o)=>{e.foldCode(0,{widget:"…",rangeFinder:()=>({from:r.posFromIndex(t),to:r.posFromIndex(o)})})},i=(e,t,o)=>{r.markText(r.posFromIndex(e),r.posFromIndex(t),{collapsed:!0,readOnly:o})},n=e.getValue();for(const e of n.matchAll(t)){const[,t,r,a,l]=e,s=e.index;if(void 0===s)continue;const d=s+t.length;i(s,d,!1);const c=d;let u;a&&l?(u=c+a.length,i(u,u+l.length,!1)):u=n.length,"on"===this.pragmas&&("fold"===r?o(c,u):"hide"===r&&i(c,u,!0))}}_maskPatternForLang(){switch(this.type){case"js":case"ts":case"css":case"jsx":case"tsx":return/( *\/\* *playground-(?<kind>hide|fold) *\*\/\n?)(?:(.*?)( *\/\* *playground-\k<kind>-end *\*\/\n?))?/gs;case"html":return/( *<!-- *playground-(?<kind>hide|fold) *-->\n?)(?:(.*?)( *<!-- *playground-\k<kind>-end *-->\n?))?/gs;default:return}}_getLanguageMode(){switch(this.type){case"ts":return"google-typescript";case"js":case"json":return"google-javascript";case"html":return"google-html";case"css":return"css";case"jsx":case"tsx":return"jsx"}}_showDiagnostics(){const e=this._codemirror;void 0!==e&&e.operation((()=>{var t,r,o;for(this._tooltipDiagnostic=void 0;this._diagnosticMarkers.length>0;)this._diagnosticMarkers.pop().clear();if(null===(t=this.diagnostics)||void 0===t?void 0:t.length){this._diagnosticsMouseoverListenerActive||(null===(o=this._cmDom)||void 0===o||o.addEventListener("mouseover",this._onMouseOverWithDiagnostics),this._diagnosticsMouseoverListenerActive=!0);for(let t=0;t<this.diagnostics.length;t++){const r=this.diagnostics[t];this._diagnosticMarkers.push(e.markText({line:r.range.start.line,ch:r.range.start.character},{line:r.range.end.line,ch:r.range.end.character},{className:"diagnostic diagnostic-"+t}))}}else this._diagnosticsMouseoverListenerActive&&(null===(r=this._cmDom)||void 0===r||r.removeEventListener("mouseover",this._onMouseOverWithDiagnostics),this._diagnosticsMouseoverListenerActive=!1)}))}};ki.styles=[c`
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

      .CodeMirror-foldmarker {
        font-family: sans-serif;
      }
      .CodeMirror-foldmarker:hover {
        cursor: pointer;
        /* Pretty much any color from the theme is good enough. */
        color: var(--playground-code-keyword-color, #770088);
      }

      #keyboardHelp {
        font-size: 18px;
        font-family: sans-serif;
        padding: 10px 20px;
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
    `,xi],o([ge()],ki.prototype,"value",null),o([ge({attribute:!1})],ki.prototype,"documentKey",void 0),o([ge()],ki.prototype,"type",void 0),o([ge({type:Boolean,attribute:"line-numbers",reflect:!0})],ki.prototype,"lineNumbers",void 0),o([ge({type:Boolean,attribute:"line-wrapping",reflect:!0})],ki.prototype,"lineWrapping",void 0),o([ge({type:Boolean,reflect:!0})],ki.prototype,"readonly",void 0),o([ge({type:Boolean,attribute:"no-completions"})],ki.prototype,"noCompletions",void 0),o([ge({attribute:!1})],ki.prototype,"diagnostics",void 0),o([me()],ki.prototype,"_completions",void 0),o([me()],ki.prototype,"_completionsOpen",void 0),o([ge()],ki.prototype,"pragmas",void 0),o([me()],ki.prototype,"_tooltipDiagnostic",void 0),o([me()],ki.prototype,"_showKeyboardHelp",void 0),o([ye("#focusContainer")],ki.prototype,"_focusContainer",void 0),o([ye(".CodeMirror-code")],ki.prototype,"_codemirrorEditable",void 0),ki=o([ue("playground-code-editor")],ki);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let _i=class extends ui{constructor(){super(...arguments),this.lineNumbers=!1,this.lineWrapping=!1,this.pragmas="on",this.readonly=!1,this.noCompletions=!1,this._onProjectFilesChanged=()=>{var e,t;null!==(e=this.filename)&&void 0!==e||(this.filename=null===(t=this._files[0])||void 0===t?void 0:t.name),this.requestUpdate()},this._onCompileDone=()=>{this.requestUpdate()},this._onDiagnosticsChanged=()=>{this.requestUpdate()}}get _files(){var e,t;return null!==(t=null===(e=this._project)||void 0===e?void 0:e.files)&&void 0!==t?t:[]}get _currentFile(){return this.filename?this._files.find((e=>e.name===this.filename)):void 0}async update(e){if(e.has("_project")){const t=e.get("_project");t&&(t.removeEventListener("filesChanged",this._onProjectFilesChanged),t.removeEventListener("compileDone",this._onCompileDone),t.removeEventListener("diagnosticsChanged",this._onDiagnosticsChanged)),this._project&&(this._project.addEventListener("filesChanged",this._onProjectFilesChanged),this._project.addEventListener("compileDone",this._onCompileDone),this._project.addEventListener("diagnosticsChanged",this._onDiagnosticsChanged)),this._onProjectFilesChanged()}super.update(e)}render(){var e,t,r,o,i,n;return W`
      ${this._files?W`
            <playground-code-editor
              exportparts="diagnostic-tooltip, dialog"
              .value=${Go(null!==(t=null===(e=this._currentFile)||void 0===e?void 0:e.content)&&void 0!==t?t:"")}
              .documentKey=${this._currentFile}
              .type=${this._currentFile?Ci(this._currentFile.contentType):void 0}
              .lineNumbers=${this.lineNumbers}
              .lineWrapping=${this.lineWrapping}
              .readonly=${this.readonly||!this._currentFile}
              .pragmas=${this.pragmas}
              .diagnostics=${null===(o=null===(r=this._project)||void 0===r?void 0:r.diagnostics)||void 0===o?void 0:o.get(null!==(n=null===(i=this._currentFile)||void 0===i?void 0:i.name)&&void 0!==n?n:"")}
              .noCompletions=${this.noCompletions}
              @change=${this._onEdit}
              @request-completions=${this._onRequestCompletions}
            >
            </playground-code-editor>
          `:W`<slot></slot>`}
    `}_onEdit(){void 0!==this._project&&void 0!==this._currentFile&&void 0!==this._editor.value&&this._project.editFile(this._currentFile,this._editor.value)}async _onRequestCompletions(e){var t,r;const o=e.detail;o.fileName=null!==(t=this.filename)&&void 0!==t?t:"";const i=await(null===(r=this._project)||void 0===r?void 0:r.getCompletions(o));i&&o.provideCompletions(i)}};_i.styles=c`
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
  `,o([ye("playground-code-editor")],_i.prototype,"_editor",void 0),o([ge()],_i.prototype,"filename",void 0),o([ge({type:Boolean,attribute:"line-numbers"})],_i.prototype,"lineNumbers",void 0),o([ge({type:Boolean,attribute:"line-wrapping"})],_i.prototype,"lineWrapping",void 0),o([ge()],_i.prototype,"pragmas",void 0),o([ge({type:Boolean,reflect:!0})],_i.prototype,"readonly",void 0),o([ge({type:Boolean,attribute:"no-completions"})],_i.prototype,"noCompletions",void 0),_i=o([ue("playground-file-editor")],_i);const Ci=e=>{if(void 0===e)return;const t=e.indexOf(";");switch(-1!==t&&(e=e.substring(0,t)),e){case"video/mp2t":return"ts";case"text/javascript":case"application/javascript":return"js";case"text/jsx":return"jsx";case"text/typescript-jsx":return"tsx";case"application/json":return"json";case"text/html":return"html";case"text/css":return"css"}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Si extends de{constructor(){super(...arguments),this.indeterminate=!1,this.progress=0,this.buffer=1,this.reverse=!1,this.closed=!1,this.stylePrimaryHalf="",this.stylePrimaryFull="",this.styleSecondaryQuarter="",this.styleSecondaryHalf="",this.styleSecondaryFull="",this.animationReady=!0,this.closedAnimationOff=!1,this.resizeObserver=null}connectedCallback(){super.connectedCallback(),this.rootEl&&this.attachResizeObserver()}render(){const e={"mdc-linear-progress--closed":this.closed,"mdc-linear-progress--closed-animation-off":this.closedAnimationOff,"mdc-linear-progress--indeterminate":this.indeterminate,"mdc-linear-progress--animation-ready":this.animationReady},t={"--mdc-linear-progress-primary-half":this.stylePrimaryHalf,"--mdc-linear-progress-primary-half-neg":""!==this.stylePrimaryHalf?"-"+this.stylePrimaryHalf:"","--mdc-linear-progress-primary-full":this.stylePrimaryFull,"--mdc-linear-progress-primary-full-neg":""!==this.stylePrimaryFull?"-"+this.stylePrimaryFull:"","--mdc-linear-progress-secondary-quarter":this.styleSecondaryQuarter,"--mdc-linear-progress-secondary-quarter-neg":""!==this.styleSecondaryQuarter?"-"+this.styleSecondaryQuarter:"","--mdc-linear-progress-secondary-half":this.styleSecondaryHalf,"--mdc-linear-progress-secondary-half-neg":""!==this.styleSecondaryHalf?"-"+this.styleSecondaryHalf:"","--mdc-linear-progress-secondary-full":this.styleSecondaryFull,"--mdc-linear-progress-secondary-full-neg":""!==this.styleSecondaryFull?"-"+this.styleSecondaryFull:""},r={"flex-basis":this.indeterminate?"100%":100*this.buffer+"%"},o={transform:this.indeterminate?"scaleX(1)":`scaleX(${this.progress})`};return W`
      <div
          role="progressbar"
          class="mdc-linear-progress ${pr(e)}"
          style="${mr(t)}"
          dir="${wr(this.reverse?"rtl":void 0)}"
          aria-label="${wr(this.ariaLabel)}"
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow="${wr(this.indeterminate?void 0:this.progress)}"
        @transitionend="${this.syncClosedState}">
        <div class="mdc-linear-progress__buffer">
          <div
            class="mdc-linear-progress__buffer-bar"
            style=${mr(r)}>
          </div>
          <div class="mdc-linear-progress__buffer-dots"></div>
        </div>
        <div
            class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
            style=${mr(o)}>
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>`}update(e){!e.has("closed")||this.closed&&void 0!==e.get("closed")||this.syncClosedState(),super.update(e)}async firstUpdated(e){super.firstUpdated(e),this.attachResizeObserver()}syncClosedState(){this.closedAnimationOff=this.closed}updated(e){!e.has("indeterminate")&&e.has("reverse")&&this.indeterminate&&this.restartAnimation(),e.has("indeterminate")&&void 0!==e.get("indeterminate")&&this.indeterminate&&window.ResizeObserver&&this.calculateAndSetAnimationDimensions(this.rootEl.offsetWidth),super.updated(e)}disconnectedCallback(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),super.disconnectedCallback()}attachResizeObserver(){if(window.ResizeObserver)return this.resizeObserver=new window.ResizeObserver((e=>{if(this.indeterminate)for(const t of e)if(t.contentRect){const e=t.contentRect.width;this.calculateAndSetAnimationDimensions(e)}})),void this.resizeObserver.observe(this.rootEl);this.resizeObserver=null}calculateAndSetAnimationDimensions(e){const t=.8367142*e,r=2.00611057*e,o=.37651913*e,i=.84386165*e,n=1.60277782*e;this.stylePrimaryHalf=t+"px",this.stylePrimaryFull=r+"px",this.styleSecondaryQuarter=o+"px",this.styleSecondaryHalf=i+"px",this.styleSecondaryFull=n+"px",this.restartAnimation()}async restartAnimation(){this.animationReady=!1,await this.updateComplete,await new Promise(requestAnimationFrame),this.animationReady=!0,await this.updateComplete}open(){this.closed=!1}close(){this.closed=!0}}o([ye(".mdc-linear-progress")],Si.prototype,"rootEl",void 0),o([ge({type:Boolean,reflect:!0})],Si.prototype,"indeterminate",void 0),o([ge({type:Number})],Si.prototype,"progress",void 0),o([ge({type:Number})],Si.prototype,"buffer",void 0),o([ge({type:Boolean,reflect:!0})],Si.prototype,"reverse",void 0),o([ge({type:Boolean,reflect:!0})],Si.prototype,"closed",void 0),o([vr,ge({attribute:"aria-label"})],Si.prototype,"ariaLabel",void 0),o([me()],Si.prototype,"stylePrimaryHalf",void 0),o([me()],Si.prototype,"stylePrimaryFull",void 0),o([me()],Si.prototype,"styleSecondaryQuarter",void 0),o([me()],Si.prototype,"styleSecondaryHalf",void 0),o([me()],Si.prototype,"styleSecondaryFull",void 0),o([me()],Si.prototype,"animationReady",void 0),o([me()],Si.prototype,"closedAnimationOff",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const Ei=c`@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half, 83.67142%))}100%{transform:translateX(200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full, 200.611057%))}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter, 37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half, 84.386165%))}100%{transform:translateX(160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full, 160.277782%))}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(-10px)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half-neg, -83.67142%))}100%{transform:translateX(-200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full-neg, -200.611057%))}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter-neg, -37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half-neg, -84.386165%))}100%{transform:translateX(-160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full-neg, -160.277782%))}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid transparent;overflow:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}@media screen and (forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;width:100%;height:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid}.mdc-linear-progress__buffer{display:flex;position:absolute;width:100%;height:100%}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__bar{right:0;-webkit-transform-origin:center right;transform-origin:center right}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__buffer-dots,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}.mdc-linear-progress--closed{opacity:0}.mdc-linear-progress--closed-animation-off .mdc-linear-progress__buffer-dots{animation:none}.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar,.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar .mdc-linear-progress__bar-inner{animation:none}.mdc-linear-progress__bar-inner{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E")}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6}.mdc-linear-progress{height:4px}.mdc-linear-progress__bar-inner{border-top-width:4px}.mdc-linear-progress__buffer-dots{background-size:10px 4px}:host{display:block}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6;background-color:var(--mdc-linear-progress-buffer-color, #e6e6e6)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E");background-image:var(--mdc-linear-progress-buffering-dots-image, url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E"))}`
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let Ti=class extends Si{};Ti.styles=[Ei],Ti=o([ue("mwc-linear-progress")],Ti);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Ai=class extends ui{constructor(){super(),this.htmlFile="index.html",this.location="Result",this._loading=!0,this._showLoadingBar=!1,this._loadedAtLeastOnce=!1,this.reload=()=>{const e=this.iframe;if(!e)return;const{parentNode:t,nextSibling:r}=e;t&&e.remove(),e.src="",e.src=this._indexUrl,t&&t.insertBefore(e,r),this._loading=!0,this._showLoadingBar=!0},void 0===navigator.serviceWorker&&(this._error=W`<p>
          <b>Sorry!</b> Preview unavailable because this browser doesn't
          <a
            href="https://caniuse.com/serviceworkers"
            target="_blank"
            rel="noopener"
            >support</a
          >
          service workers.
        </p>
        <p>
          <i
            >Note: Firefox
            <a
              href="https://bugzilla.mozilla.org/show_bug.cgi?id=1320796"
              target="_blank"
              rel="noopener"
              >doesn't</a
            >
            support service workers in private browsing mode.</i
          >
        </p> `)}update(e){if(e.has("_project")){const t=e.get("_project");t&&(t.removeEventListener("urlChanged",this.reload),t.removeEventListener("compileStart",this.reload)),this._project&&(this._project.addEventListener("urlChanged",this.reload),this._project.addEventListener("compileStart",this.reload))}super.update(e)}get _indexUrl(){var e;const t=null===(e=this._project)||void 0===e?void 0:e.baseUrl;return t&&this.htmlFile?new URL(this.htmlFile,t).toString():""}render(){return W`
      <div id="toolbar" part="preview-toolbar">
        <span id="location" part="preview-location"> ${this.location}</span>
        <mwc-icon-button
          id="reload-button"
          aria-label="Reload preview"
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

      <div id="content" class=${pr({error:!!this._error})}>
        <mwc-linear-progress
          aria-hidden=${this._loading?"false":"true"}
          part="preview-loading-indicator"
          indeterminate
          ?closed=${!this._showLoadingBar}
        ></mwc-linear-progress>

        ${this._loadedAtLeastOnce?j:W`<slot></slot>`}

        <iframe
          title="Project preview"
          @load=${this._onIframeLoad}
          ?hidden=${!this._loadedAtLeastOnce}
        ></iframe>
      </div>

      ${this._error?W`
            <playground-internal-overlay id="error">
              ${this._error}</playground-internal-overlay
            >
          `:j}
    `}updated(){this.iframe&&this.iframe.src!==this._indexUrl&&(this.iframe.src=this._indexUrl)}async firstUpdated(){var e,t;this._loading&&!this._slotHasAnyVisibleChildren()&&(this._showLoadingBar=!0);const r=this.shadowRoot.querySelector("mwc-linear-progress");await r.updateComplete,null===(t=null===(e=r.shadowRoot)||void 0===e?void 0:e.querySelector("[role=progressbar]"))||void 0===t||t.setAttribute("aria-label","Preview is loading")}_slotHasAnyVisibleChildren(){var e;const t=null===(e=this._slot)||void 0===e?void 0:e.assignedNodes({flatten:!0});if(!t)return!1;for(const e of t)if(e.nodeType!==Node.COMMENT_NODE&&(e.nodeType!==Node.TEXT_NODE||""!==(e.textContent||"").trim()))return!0;return!1}_onIframeLoad(){this._indexUrl&&(this._loading=!1,this._loadedAtLeastOnce=!0,this._showLoadingBar=!1)}};Ai.styles=c`
    :host {
      display: flex;
      flex-direction: column;
      background: white;
      font-family: sans-serif;
      height: 350px;
      position: relative; /* for the error message overlay */
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

    #content.error {
      display: none;
    }

    #error {
      padding: 0 20px;
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
  `,o([ge({attribute:"html-file"})],Ai.prototype,"htmlFile",void 0),o([ge()],Ai.prototype,"location",void 0),o([ye("iframe",!0)],Ai.prototype,"iframe",void 0),o([ye("slot")],Ai.prototype,"_slot",void 0),o([me()],Ai.prototype,"_loading",void 0),o([me()],Ai.prototype,"_showLoadingBar",void 0),o([me()],Ai.prototype,"_loadedAtLeastOnce",void 0),o([me()],Ai.prototype,"_error",void 0),Ai=o([ue("playground-preview")],Ai);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Oi=class extends de{constructor(){super(...arguments),this.sandboxBaseUrl=`https://unpkg.com/playground-elements@${It}/`,this.sandboxScope=`__playground_swfs_${Rt}/`,this.editableFileSystem=!1,this.lineNumbers=!1,this.lineWrapping=!1,this.resizable=!1,this.pragmas="on",this.htmlFile="index.html",this.noCompletions=!1}get projectSrc(){var e,t;return null!==(t=null===(e=this._project)||void 0===e?void 0:e.projectSrc)&&void 0!==t?t:this._projectSrcSetBeforeRender}set projectSrc(e){const t=this._project;t?t.projectSrc=e:this._projectSrcSetBeforeRender=e}get config(){var e,t;return null!==(t=null===(e=this._project)||void 0===e?void 0:e.config)&&void 0!==t?t:this._configSetBeforeRender}set config(e){const t=this._project;t?t.config=e:this._configSetBeforeRender=e}get modified(){var e,t;return null!==(t=null===(e=this._project)||void 0===e?void 0:e.modified)&&void 0!==t&&t}render(){const e="project",t="editor";return W`
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
          .lineWrapping=${this.lineWrapping}
          .project=${e}
          .pragmas=${this.pragmas}
          .noCompletions=${this.noCompletions}
        >
        </playground-file-editor>
      </div>

      <div id="rhs">
        ${this.resizable?W`<div
              id="resizeBar"
              @pointerdown=${this._onResizeBarPointerdown}
            ></div>`:j}

        <playground-preview
          part="preview"
          exportparts="preview-toolbar,
                       preview-location,
                       preview-reload-button,
                       preview-loading-indicator,
                       diagnostic-tooltip,
                       dialog"
          .htmlFile=${this.htmlFile}
          .project=${e}
        ></playground-preview>
      </div>
    `}firstUpdated(){this._configSetBeforeRender&&(this._project.config=this._configSetBeforeRender,this._configSetBeforeRender=void 0),this._projectSrcSetBeforeRender&&(this._project.projectSrc=this._projectSrcSetBeforeRender,this._projectSrcSetBeforeRender=void 0)}async update(e){var t;e.has("resizable")&&!1===this.resizable&&(null===(t=this._rhs)||void 0===t||t.style.removeProperty("--playground-preview-width")),super.update(e)}_onResizeBarPointerdown({pointerId:e}){const t=this._resizeBar;t.setPointerCapture(e);const r=this._rhs.style,{left:o,right:i}=this.getBoundingClientRect(),n=i-o,a=n-100,l=e=>{const t=Math.min(a,Math.max(100,i-e.clientX))/n*100;r.setProperty("--playground-preview-width",t+"%")};t.addEventListener("pointermove",l);const s=()=>{t.releasePointerCapture(e),t.removeEventListener("pointermove",l),t.removeEventListener("pointerup",s)};t.addEventListener("pointerup",s)}};Oi.styles=c`
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
  `,o([ge({attribute:"project-src",hasChanged:()=>!1})],Oi.prototype,"projectSrc",null),o([ge({attribute:!1,hasChanged:()=>!1})],Oi.prototype,"config",null),o([ge({attribute:"sandbox-base-url"})],Oi.prototype,"sandboxBaseUrl",void 0),o([ge({attribute:"sandbox-scope"})],Oi.prototype,"sandboxScope",void 0),o([ge({type:Boolean,attribute:"editable-file-system"})],Oi.prototype,"editableFileSystem",void 0),o([ge({type:Boolean,attribute:"line-numbers"})],Oi.prototype,"lineNumbers",void 0),o([ge({type:Boolean,attribute:"line-wrapping"})],Oi.prototype,"lineWrapping",void 0),o([ge({type:Boolean})],Oi.prototype,"resizable",void 0),o([ge()],Oi.prototype,"pragmas",void 0),o([ge({attribute:"html-file"})],Oi.prototype,"htmlFile",void 0),o([ge({type:Boolean,attribute:"no-completions"})],Oi.prototype,"noCompletions",void 0),o([ye("playground-project")],Oi.prototype,"_project",void 0),o([ye("#resizeBar")],Oi.prototype,"_resizeBar",void 0),o([ye("#rhs")],Oi.prototype,"_rhs",void 0),Oi=o([ue("playground-ide")],Oi);const Li=[c`
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
`,c`
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
`,c`
.playground-theme-abbott {
  --playground-code-background: rgb(35, 28, 20);
  --playground-code-default-color: rgb(216, 255, 132);
  --playground-code-cursor-color: rgb(160, 234, 0);
  --playground-code-selection-background: rgb(39, 57, 0);
  --playground-code-gutter-background: rgb(35, 28, 20);
  --playground-code-gutter-border-right: 0px;
  --playground-code-linenumber-color: rgb(251, 236, 93);
  --playground-code-atom-color: rgb(254, 243, 180);
  --playground-code-attribute-color: rgb(36, 165, 7);
  --playground-code-builtin-color: rgb(63, 145, 241);
  --playground-code-comment-color: rgb(251, 179, 47);
  --playground-code-def-color: rgb(140, 205, 240);
  --playground-code-keyword-color: rgb(216, 4, 80);
  --playground-code-meta-color: rgb(236, 108, 153);
  --playground-code-number-color: rgb(246, 63, 5);
  --playground-code-operator-color: rgb(216, 255, 132);
  --playground-code-qualifier-color: rgb(63, 145, 241);
  --playground-code-string-color: rgb(230, 162, 243);
  --playground-code-string-2-color: rgb(230, 162, 243);
  --playground-code-tag-color: rgb(216, 4, 80);
  --playground-code-type-color: rgb(36, 165, 7);
  --playground-code-variable-color: rgb(140, 205, 240);
  --playground-code-variable-2-color: rgb(140, 205, 240);
  --playground-code-variable-3-color: rgb(140, 205, 240);
  --playground-code-callee-color: rgb(216, 255, 132);
  --playground-code-property-color: rgb(63, 145, 241)
}
`,c`
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
`,c`
.playground-theme-ambiance {
  --playground-code-background: rgb(32, 32, 32) url("data:image/png;base64,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") repeat scroll 0% 0%/auto padding-box border-box;
  --playground-code-default-color: rgb(230, 225, 220);
  --playground-code-cursor-color: rgb(121, 145, 232);
  --playground-code-selection-background: rgba(255, 255, 255, 0.15);
  --playground-code-gutter-background: rgb(61, 61, 61) url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAABFFUlEQVQYGbzBCeDVU/74/6fj9HIcx/FRHx9JCFmzMyGRURhLZIkUsoeRfUjS2FNDtr6WkMhO9sm+S8maJfu+Jcsg+/o/c+Z4z/t97/vezy3z+z8ekGlnYICG/o7gdk+wmSHZ1z4pJItqapjoKXWahm8NmV6eOTbWUOp6/6a/XIg6GQqmenJ2lDHyvCFZ2cBDbmtHA043VFhHwXxClWmeYAdLhV00Bd85go8VmaFCkbVkzlQENzfBDZ5gtN7HwF0KDrTwJ0dypSOzpaKCMwQHKTIreYIxlmhXTzTWkVm+LTynZhiSBT3RZQ7aGfjGEd3qyXQ1FDymqbKxpspERQN2MiRjNZlFFQXfCNFm9nM1zpAsoYjmtRTc5ajwuaXc5xrWskT97RaKzAGe5ARHhVUsDbjKklziiX5WROcJwSNCNI+9w1Jwv4Zb2r7lCMZ4oq5C0EdTx+2GzNuKpJ+iFf38JEWkHJn9DNF7mmBDITrWEg0VWL3pHU20tSZnuqWu+R3BtYa8XxV1HO7GyD32UkOpL/yDloINFTmvtId+nmAjxRw40VMwVKiwrKLE4bK5UOVntYwhOcSSXKrJHKPJedocpGjVz/ZMIbnYUPB10/eKCrs5apqpgVmWzBYWpmtKHecJPjaUuEgRDDaU0oZghCJ6zNMQ5ZhDYx05r5v2muQdM0EILtXUsaKiQX9WMEUotagQzFbUNN6NUPC2nm5pxEWGCjMc3GdJHjSU2kORLK/JGSrkfGEIjncU/CYUnOipoYemwj8tST9NsJmB7TUVXtbUtXATJVZXBMvYeTXJfobgJUPmGMP/yFaWonaa6BcFO3nqcIqCozSZoZoSr1g4zJOzuyGnxTEX3lUEJ7WcZgme8ddaWvWJo2AJR9DZU3CUIbhCSG6ybSwN6qtJVnCU2svDTP2ZInOw2cBTrqtQahtNZn9NcJ4l2NaSmSkkP1noZWnVwkLmdUPOwLZEwy2Z3S3R+4rIG9hcbpPXHFVWcQdZkn2FOta3cKWQnNRC5g1LsJah4GCzSVsKnCOY5OAFRTBekyyryeyilhFKva75r4Mc0aWanGEaThcy31s439KKxTzJYY5WTHPU1FtIHjQU3Oip4xlNzj/lBw23dYZVliQa7WAXf4shetcQfatI+jWRDBPmyNeW6A1P5kdDgyYJlba0BIM8BZu1JfrFwItyjcAMR3K0BWOIrtMEXyhyrlVEx3ui5dUBjmB/Q3CXW85R4mBD0s7B+4q5tKUjOlb9qqmhi5AZ6GFIC5HXtOobdYGlVdMVbNJ8toNTFcHxnoL+muBagcctjWnbNMuR00uI7nQESwg5q2qqrKWIfrNUmeQocY6HuyxJV02wj36w00yhpmUFenv4p6fUkZYqLyuinx2RGOjhCXYyJF84oiU00YMOOhhquNdfbOB7gU88pY4xJO8LVdp6/q2voeB4R04vIdhSE40xZObx1HGGJ/ja0LBthFInKaLPPFzuCaYaoj8JjPME8yoyxo6zlBqkiUZYgq00OYMswbWO5NGmq+xhipxHLRW29ARjNKXO0wRnear8XSg4XFPLKEPUS1GqvyLwiuBUoa7zpZ0l5xxFwWmWZC1H5h5FwU8eQ7K+g8UcVY6TMQreVQT/8uQ8Z+ALIXnSEa2pYZQneE9RZbSBNYXfWYJzW/h/4j4Dp1tYVcFIC5019Vyi4ThPqSFCzjGWaHQTBU8q6vrVwgxP9Lkm840imWKpcLCjYTtrKuwvsKSnrvHCXGkSMk9p6lhckfRpIeis+N2PiszT+mFLspyGleUhDwcLrZqmyeylxwjBcKHEapqkmyangyLZRVOijwOtCY5SsG5zL0OwlCJ4y5KznF3EUNDDrinwiyLZRzOXtlBbK5ITHFGLp8Q0R6ab6mS7enI2cFrxOyHvOCFaT1HThS1krjCwqWeurCkk+willhCC+RSZnRXBiZaC5RXRIZYKp2lyfrHwiKPKR0JDzrdU2EFgpidawlFDR6FgXUMNa+g1FY3bUQh2cLCwosRdnuQTS/S+JVrGLeWIvtQUvONJxlqSQYYKpwoN2kaocLjdVsis4Mk80ESF2YpSkzwldjHkjFCUutI/r+EHDU8oCs6yzL3PhWiEooZdFMkymlas4AcI3KmoMMNSQ3tHzjGWCrcJJdYyZC7QFGwjRL9p+MrRkAGWzIaWCn9W0F3TsK01c2ZvQw0byvxuQU0r1lM0qJO7wW0kRIMdDTtXEdzi4VIh+EoIHm0mWtAtpCixlabgn83fKTI7anJe9ST7WIK1DMGpQmYeA58ImV6ezOGOzK2Kgq01pd60cKWiUi9Lievb/0vIDPHQ05Kzt4ddPckQBQtoaurjyHnek/nKzpQLrVgKPjIkh2v4uyezpv+Xoo7fPFXaGFp1vaLKxQ4uUpQQS5VuQs7BCq4xRJv7fwpVvvFEB3j+620haOuocqMhWd6TTPAEx+mdFNGHdranFe95WrWmIvlY4F1Dle2ECgc6cto7SryuqGGGha0tFQ5V53migUKmg6XKAo4qS3mik+0OZpAhOLeZKicacgaYcyx5hypYQE02ZA4xi/pNhOQxR4klNKyqacj+mpxnLTnnGSo85++3ZCZq6lrZkXlGEX3o+C9FieccJbZWVFjC0Yo1FZnJhoYMFoI1hEZ9r6hwg75HwzBNhbZCdJEfJwTPGzJvaKImw1yYX1HDAmpXR+ZJQ/SmgqMNVQb5vgamGwLtt7VwvP7Qk1xpiM5x5Cyv93E06MZmgs0Nya2azIKOYKCGBQQW97RmhKNKF02JZqHEJ4o58qp7X5EcZmc56trXEqzjCBZ1MFGR87Ql2tSTs6CGxS05PTzRQorkbw7aKoKXFDXsYW42VJih/q+FP2BdTzDTwVqOYB13liM50vG7wy28qagyuIXMeQI/Oqq8bcn5wJI50xH00CRntyfpL1T4hydYpoXgNiFzoIUTDZnLNRzh4TBHwbYGDvZkxmlyJloyr6tRihpeUG94GnKtIznREF0tzJG/OOr73JBcrSh1k6WuTprgLU+mnSGnv6Zge0NNz+kTDdH8nuAuTdJDCNb21LCiIuqlYbqGzT3RAoZofQfjFazkqeNWdYaGvYTM001EW2oKPvVk1ldUGSgUtHFwjKM1h9jnFcmy5lChoLNaQMGGDsYbKixlaMBmmsx1QjCfflwTfO/gckW0ruZ3jugKR3R5W9hGUWqCgxuFgsuaCHorotGKzGaeZB9DMsaTnKCpMtwTvOzhYk0rdrArKCqcaWmVk1+F372ur1YkKxgatI8Qfe1gIX9wE9FgS8ESmuABIXnRUbCapcKe+nO7slClSZFzpV/LkLncEb1qiO42fS3R855Su2mCLh62t1SYZZYVmKwIHjREF2uihTzB20JOkz7dkxzYQnK0UOU494wh+VWRc6Un2kpTaVgLDFEkJ/uhzRcI0YKGgpGWOlocBU/a4fKoJ/pEaNV6jip3+Es9VXY078rGnmAdf7t9ylPXS34RBSuYPs1UecZTU78WanhBCHpZ5sAoTz0LGZKjPf9TRypqWEiTvOFglL1fCEY3wY/++rbk7C8bWebA6p6om6PgOL2kp44TFJlVNBXae2rqqdZztOJpT87GQsE9jqCPIe9VReZuQ/CIgacsyZdCpIScSYqcZk8r+nsyCzhyfhOqHGOIvrLknC8wTpFcaYiGC/RU1NRbUeUpocQOnkRpGOrIOcNRx+1uA0UrzhSSt+VyS3SJpnFWkzNDqOFGIWcfR86DnmARTQ1HKIL33ExPiemeOhYSSjzlSUZZuE4TveoJLnBUOFof6KiysCbnAEcZgcUNTDOwkqWu3RWtmGpZwlHhJENdZ3miGz0lJlsKnjbwqSHQjpxnFDlTLLwqJPMZMjd7KrzkSG7VsxXBZE+F8YZkb01Oe00yyRK9psh5SYh29ySPKBo2ylNht7ZkZnsKenjKNJu9PNEyZpaCHv4Kt6RQsLvAVp7M9kIimmCUwGeWqLMmGuIotYMmWNpSahkhZw9FqZsVnKJhsjAHvtHMsTM9fCI06Dx/u3vfUXCqfsKRc4oFY2jMsoo/7DJDwZ1CsIKnJu+J9ldkpmiCxQx1rWjI+T9FwcWWzOuaYH0Hj7klNRVWEQpmaqosakiGNTFHdjS/qnUdmf0NJW5xsL0HhimCCZZSRzmSPTXJQ4aaztAwtZnoabebJ+htCaZ7Cm535ByoqXKbX1WRc4Eh2MkRXWzImVc96Cj4VdOKVxR84VdQsIUM8Psoou2byVHyZFuq7O8otbSQ2UAoeEWTudATLGSpZzVLlXVkPU2Jc+27lsw2jmg5T5VhbeE3BT083K9WsTTkFU/Osi0rC5lRlpwRHUiesNS0sOvmqGML1aRbPAxTJD9ZKtxuob+hhl8cwYGWpJ8nub7t5p6coYbMovZ1BTdaKn1jYD6h4GFDNFyT/Kqe1XCXphXHOKLZmuRSRdBPEfVUXQzJm5YGPGGJdvAEr7hHNdGZnuBvrpciGmopOLf5N0uVMy0FfYToJk90uUCbJupaVpO53UJXR2bVpoU00V2KOo4zMFrBd0Jtz2pa0clT5Q5L8IpQ177mWQejPMEJhuQjS10ref6HHjdEhy1P1EYR7GtO0uSsKJQYLiTnG1rVScj5lyazpqWGl5uBbRWl7m6ixGOOnEsMJR7z8J0n6KMnCdxhiNYQCoZ6CmYLnO8omC3MkW3bktlPmEt/VQQHejL3+dOE5FlPdK/Mq8hZxxJtLyRrepLThYKbLZxkSb5W52vYxNOaOxUF0yxMUPwBTYqCzy01XayYK0sJyWBLqX0MwU5CzoymRzV0EjjeUeLgDpTo6ij42ZAzvD01dHUUTPLU96MdLbBME8nFBn7zJCMtJcZokn8YoqU0FS5WFKyniHobguMcmW8N0XkWZjkyN3hqOMtS08r+/xTBwpZSZ3qiVRX8SzMHHjfUNFjgHEPmY9PL3ykEzxkSre/1ZD6z/NuznuB0RcE1TWTm9zRgfUWVJiG6yrzgmWPXC8EAR4Wxhlad0ZbgQyEz3pG5RVEwwDJH2mgKpjcTiCOzn1lfUWANFbZ2BA8balnEweJC9J0iuaeZoI+ippFCztEKVvckR2iice1JvhVytrQwUAZpgsubCPaU7xUe9vWnaOpaSBEspalykhC9bUlOMpT42ZHca6hyrqKmw/wMR8H5ZmdFoBVJb03O4UL0tSNnvIeRmkrLWqrs78gcrEn2tpcboh0UPOW3UUR9PMk4T4nnNKWmCjlrefhCwxRNztfmIQVdDElvS4m1/WuOujoZCs5XVOjtKPGokJzsYCtFYoWonSPT21DheU/wWhM19FcElwqNGOsp9Q8N/cwXaiND1MmeL1Q5XROtYYgGeFq1aTMsoMmcrKjQrOFQTQ1fmBYhmW6o8Jkjc7iDJRTBIo5kgJD5yMEYA3srCg7VFKwiVJkmRCc5ohGOKhsYMn/XBLdo5taZjlb9YAlGWRimqbCsoY7HFAXLa5I1HPRxMMsQDHFkWtRNniqT9UEeNjcE7RUlrCJ4R2CSJuqlKHWvJXjAUNcITYkenuBRB84TbeepcqTj3zZyFJzgYQdHnqfgI0ddUwS6GqWpsKWhjq9cV0vBAEMN2znq+EBfIWT+pClYw5xsTlJU6GeIBsjGmmANTzJZiIYpgrM0Oa8ZMjd7NP87jxhqGOhJlnQtjuQpB+8aEE00wZFznSJPyHxgH3HkPOsJFvYk8zqCHzTs1BYOa4J3PFU+UVRZxlHDM4YavlNUuMoRveiZA2d7grMNc2g+RbSCEKzmgYsUmWmazFJyoiOZ4KnyhKOGRzWJa0+moyV4TVHDzn51Awtqaphfk/lRQ08FX1iiqxTB/kLwd0VynKfEvI6cd4XMV5bMhZ7gZUWVzYQ6Nm2BYzxJbw3bGthEUUMfgbGeorae6DxHtJoZ6alhZ0+ytiVoK1R4z5PTrOECT/SugseEOlb1MMNR4VRNcJy+V1Hg9ONClSZFZjdHlc6W6FBLdJja2MC5hhpu0DBYEY1TFGwiFAxRRCsYkiM9JRb0JNMVkW6CZYT/2EiTGWmo8k+h4FhDNE7BvppoTSFnmCV5xZKzvcCdDo7VVPnIU+I+Rc68juApC90MwcFCsJ5hDqxgScYKreruyQwTqrzoqDCmhWi4IbhB0Yrt3RGa6GfDv52rKXWhh28dyZaWUvcZeMTBaZoSGyiCtRU5J8iviioHaErs7Jkj61syVzTTgOcUOQ8buFBTYWdL5g3T4qlpe0+wvD63heAXRfCCIed9RbCsp2CiI7raUOYOTU13N8PNHvpaGvayo4a3LLT1lDrVEPT2zLUlheB1R+ZTRfKWJ+dcocLJfi11vyJ51lLqJ0WD7tRwryezjiV5W28uJO9qykzX8JDe2lHl/9oyBwa2UMfOngpXCixvKdXTk3wrsKmiVYdZIqsoWEERjbcUNDuiaQomGoIbFdEHmsyWnuR+IeriKDVLnlawlyNHKwKlSU631PKep8J4Q+ayjkSLKYLhalNHlYvttb6fHm0p6OApsZ4l2VfdqZkjuysy6ysKLlckf1KUutCTs39bmCgEyyoasIWlVaMF7mgmWtBT8Kol5xpH9IGllo8cJdopcvZ2sImlDmMIbtDk3KIpeNiS08lQw11NFPTwVFlPP6pJ2gvRfI7gQUfmNAtf6Gs0wQxDsKGlVBdF8rCa3jzdwMaGHOsItrZk7hAyOzpK9VS06j5F49b0VNGOOfKs3lDToMsMBe9ZWtHFEgxTJLs7qrygKZjUnmCYoeAqeU6jqWuLJup4WghOdvCYJnrSkSzoyRkm5M2StQwVltPkfCAk58tET/CSg+8MUecmotMEnhBKfWBIZsg2ihruMJQaoIm+tkTLKEqspMh00w95gvFCQRtDwTT1gVDDSEVdlwqZfxoQRbK0g+tbiBZxzKlpnpypejdDwTaeOvorMk/IJE10h9CqRe28hhLbe0pMsdSwv4ZbhKivo2BjDWfL8UKJgeavwlwb5KlwhyE4u4XkGE2ytZCznKLCDZZq42VzT8HLCrpruFbIfOIINmh/qCdZ1ZBc65kLHR1Bkyf5zn6pN3SvGKIlFNGplhrO9QSXanLOMQTLCa0YJCRrCZm/CZmrLTm7WzCK4GJDiWUdFeYx1LCFg3NMd0XmCuF3Y5rITLDUsYS9zoHVzwnJoYpSTQoObyEzr4cFBNqYTopoaU/wkyLZ2lPhX/5Y95ulxGTV7KjhWrOZgl8MyUUafjYraNjNU1N3IWcjT5WzWqjwtoarHSUObGYO3GCJZpsBlnJGPd6ZYLyl1GdCA2625IwwJDP8GUKymbzuyPlZlvTUsaUh5zFDhRWFzPKKZLAlWdcQbObgF9tOqOsmB1dqcqYJmWstFbZRRI9poolmqiLnU0POvxScpah2iSL5UJNzgScY5+AuIbpO0YD3NCW+dLMszFSdFCWGqG6eVq2uYVNDdICGD6W7EPRWZEY5gpsE9rUkS3mijzzJnm6UpUFXG1hCUeVoS5WfNcFpblELL2qqrCvMvRfd45oalvKU2tiQ6ePJOVMRXase9iTtLJztPxJKLWpo2CRDcJwn2sWSLKIO1WQWNTCvpVUvOZhgSC40JD0dOctaSqzkCRbXsKlb11Oip6PCJ0IwSJM31j3akRxlP7Rwn6aGaUL0qiLnJkvB3xWZ2+Q1TfCwpQH3G0o92UzmX4o/oJNQMMSQc547wVHhdk+VCw01DFYEnTxzZKAm74QmeNNR1w6WzEhNK15VJzuCdxQ53dRUDws5KvwgBMOEgpcVNe0hZI6RXT1Jd0cyj5nsaEAHgVmGaJIlWdsc5Ui2ElrRR6jrRAttNMEAIWrTDFubkZaok7/AkzfIwfuWVq0jHzuCK4QabtLUMVPB3kJ0oyHTSVFlqMALilJf2Rf8k5aaHtMfayocLBS8L89oKoxpJvnAkDPa0qp5DAUTHKWmCcnthlou8iCKaFFLHWcINd1nyIwXqrSxMNmSs6KmoL2QrKuWtlQ5V0120xQ5vRyZS1rgFkWwhiOwiuQbR0OOVhQM9iS3tiXp4RawRPMp5tDletOOBL95MpM01dZTBM9pkn5qF010rIeHFcFZhmSGpYpTsI6nwhqe5C9ynhlpp5ophuRb6WcJFldkVnVEwwxVfrVkvnWUuNLCg5bgboFHPDlDPDmnK7hUrWiIbjadDclujlZcaokOFup4Ri1kacV6jmrrK1hN9bGwpKEBQ4Q6DvIUXOmo6U5LqQM6EPyiKNjVkPnJkDPNEaxhiFay5ExW1NXVUGqcpYYdPcGiCq7z/TSlbhL4pplWXKd7NZO5QQFrefhRQW/NHOsqcIglc4UhWklR8K0QzbAw08CBDnpbgqXdeD/QUsM4RZXDFBW6WJKe/mFPdH0LtBgiq57wFLzlyQzz82qYx5D5WJP5yVJDW01BfyHnS6HKO/reZqId1WGa4Hkh2kWodJ8i6KoIPlAj2hPt76CzXsVR6koPRzWTfKqIentatYpQw2me4AA3y1Kind3SwoOKZDcFXTwl9tWU6mfgRk9d71sKtlNwrjnYw5tC5n5LdKiGry3JKNlHEd3oaMCFHrazBPMp/uNJ+V7IudcSbeOIdjUEdwl0VHCOZo5t6YluEuaC9mQeMgSfOyKnYGFHcIeQ84yQWbuJYJpZw5CzglDH7gKnWqqM9ZTaXcN0TeYhR84eQtJT76JJ1lREe7WnnvsMmRc9FQ7SBBM9mV3lCUdmHk/S2RAMt0QjFNFqQpWjDPQ01DXWUdDBkXziKPjGEP3VP+zIWU2t7im41FOloyWzn/L6dkUy3VLDaZ6appgDLHPjJEsyvJngWEPUyVBiAaHCTEXwrLvSEbV1e1gKJniicWorC1MUrVjB3uDhJE/wgSOzk1DXpk0k73qCM8xw2UvD5kJmDUfOomqMpWCkJRlvKXGmoeBm18USjVIk04SClxTB6YrgLAPLWYK9HLUt5cmc0vYES8GnTeRc6skZbQkWdxRsIcyBRzx1DbTk9FbU0caTPOgJHhJKnOGIVhQqvKmo0llRw9sabrZkDtdg3PqaKi9oatjY8B+G371paMg6+mZFNNtQ04mWBq3rYLOmtWWQp8KJnpy9DdFensyjdqZ+yY40VJlH8wcdLzC8PZnvHMFUTZUrDTkLyQaGus5X5LzpYAf3i+e/ZlhqGqWhh6Ou6xTR9Z6oi5AZZtp7Mj2EEm8oSpxiYZCHU/1fbGdNNNRRoZMhmilEb2gqHOEJDtXkHK/JnG6IrvbPCwV3NhONVdS1thBMs1T4QOBcTWa2IzhMk2nW5Kyn9tXUtpv9RsG2msxk+ZsQzRQacJncpgke0+T8y5Fzj8BiGo7XlJjaTIlpQs7KFjpqGnKuoyEPeIKnFMkZHvopgh81ySxNFWvJWcKRs70j2FOT012IllEEO1n4pD1513Yg2ssQPOThOkvyrqHUdEXOSEsihmBbTbKX1kLBPWqWkLOqJbjB3GBIZmoa8qWl4CG/iZ7oiA72ZL7TJNeZUY7kFQftDcHHluBzRbCegzMtrRjVQpX2lgoPKKLJAkcbMl01XK2p7yhL8pCBbQ3BN2avJgKvttcrWDK3CiUOVxQ8ZP+pqXKyIxnmBymCg5vJjNfkPK4+c8cIfK8ocVt7kmfd/I5SR1hKvCzUtb+lhgc00ZaO6CyhIQP1Uv4yIZjload72PXX0OIJvnFU+0Zf6MhsJwTfW0r0UwQfW4LNLZl5HK261JCZ4qnBaAreVAS3WrjV0LBnNDUNNDToCEeFfwgcb4gOEqLRhirWkexrCEYKVV711DLYEE1XBEsp5tpTGjorkomKYF9FDXv7fR3BGwbettSxnyL53MBPjsxDZjMh+VUW9NRxq1DhVk+FSxQcaGjV9Pawv6eGByw5qzoy7xk4RsOShqjJwWKe/1pEEfzkobeD/dQJmpqedcyBTy2sr4nGNRH0c0SPWTLrqAc0OQcb/gemKgqucQT7ySWKCn2EUotoCvpZct7RO2sy/QW0IWcXd7pQRQyZVwT2USRO87uhjioTLKV2brpMUcMQRbKH/N2T+UlTpaMls6cmc6CCNy3JdYYSUzzJQ4oSD3oKLncULOiJvjBEC2oqnCJkJluCYy2ZQ5so9YYlZ1VLlQU1mXEW1jZERwj/MUSRc24TdexlqLKfQBtDTScJUV8FszXBEY5ktpD5Ur9hYB4Nb1iikw3JoYpkKX+RodRKFt53MMuRnKSpY31PwYaGaILh3wxJGz9TkTPEETxoCWZrgvOlmyMzxFEwVJE5xZKzvyJ4WxEc16Gd4Xe3Weq4XH2jKRikqOkGQ87hQnC7wBmGYLAnesX3M+S87eFATauuN+Qcrh7xIxXJbUIdMw3JGE3ylCWzrieaqCn4zhGM19TQ3z1oH1AX+pWEqIc7wNGAkULBo/ZxRaV9NNyh4Br3rCHZzbzmSfawBL0dNRwpW1kK9mxPXR9povcdrGSZK9c2k0xwFGzjuniCtRSZCZ6ccZ7gaktmgAOtKbG/JnOkJrjcQTdFMsxRQ2cLY3WTIrlCw1eWKn8R6pvt4GFDso3QoL4a3nLk3G6JrtME3dSenpx7PNFTmga0EaJTLQ061sEeQoWXhSo9LTXsaSjoJQRXeZLtDclbCrYzfzHHeaKjHCVOUkQHO3JeEepr56mhiyaYYKjjNU+Fed1wS5VlhWSqI/hYUdDOkaxiKehoyOnrCV5yBHtbWFqTHCCwtpDcYolesVR5yUzTZBb3RNMd0d6WP+SvhuBmRcGxnuQzT95IC285cr41cLGQ6aJJhmi4TMGempxeimBRQw1tFKV+8jd6KuzoSTqqDxzRtpZkurvKEHxlqXKRIjjfUNNXQsNOsRScoWFLT+YeRZVD3GRN0MdQcKqQjHDMrdGGVu3iYJpQx3WGUvfbmxwFfR20WBq0oYY7LMFhhgYtr8jpaEnaOzjawWWaTP8mMr0t/EPDPoqcnxTBI5o58L7uoWnMrpoqPwgVrlAUWE+V+TQl9rawoyP6QGAlQw2TPRX+YSkxyBC8Z6jhHkXBgQL7WII3DVFnRfCrBfxewv9D6xsyjys4VkhWb9pUU627JllV0YDNHMku/ldNMMXDEo4aFnAkk4U6frNEU4XgZUPmEKHUl44KrzmYamjAbh0JFvGnaTLPu1s9jPCwjFpYiN7z1DTOk/nc07CfDFzmCf7i+bfNHXhDtLeBXzTBT5rkMvWOIxpl4EMh2LGJBu2syDnAEx2naEhHDWMMzPZEhygyS1mS5RTJr5ZkoKbEUoYqr2kqdDUE8ztK7OaIntJkFrIECwv8LJTaVx5XJE86go8dFeZ3FN3rjabCAYpoYEeC9zzJVULBbmZhDyd7ko09ydpNZ3nm2Kee4FPPXHnYEF1nqOFEC08LUVcDvYXkJHW8gTaKCk9YGOeIJhqiE4ToPEepdp7IWFjdwnWaufGMwJJCMtUTTBBK9BGCOy2tGGrJTHIwyEOzp6aPzNMOtlZkDvcEWpP5SVNhfkvDxhmSazTJXYrM9U1E0xwFVwqZQwzJxw6+kGGGUj2FglGGmnb1/G51udRSMNlTw6GGnCcUwVcOpmsqTHa06o72sw1RL02p9z0VbnMLOaIX3QKaYKSCFQzBKEUNHTSc48k53RH9wxGMtpQa5KjjW0W0n6XCCCG4yxNNdhQ4R4l1Ff+2sSd6UFHiIEOyqqFgT01mEUMD+joy75jPhOA+oVVLm309FR4yVOlp4RhLiScNmSmaYF5Pw0STrOIoWMSR2UkRXOMp+M4SHW8o8Zoi6OZgjKOaFar8zZDzkWzvKOjkKBjmCXby8JahhjXULY4KlzgKLvAwxVGhvyd4zxB1d9T0piazmKLCVZY5sKiD0y2ZSYrkUEPUbIk+dlQ4SJHTR50k1DPaUWIdTZW9NJwnJMOECgd7ou/MnppMJ02O1VT4Wsh85MnZzcFTngpXGKo84qmwgKbCL/orR/SzJ2crA+t6Mp94KvxJUeIbT3CQu1uIdlQEOzlKfS3UMcrTiFmOuroocrZrT2AcmamOKg8YomeEKm/rlT2sociMaybaUlFhuqHCM2qIJ+rg4EcDFymiDSxzaHdPcpE62pD5kyM5SBMoA1PaUtfIthS85ig1VPiPPYXgYEMNk4Qq7TXBgo7oT57gPUdwgCHzhIVFPFU6OYJzHAX9m5oNrVjeE61miDrqQ4VSa1oiURTsKHC0IfjNwU2WzK6eqK8jWln4g15TVBnqmDteCJ501PGAocJhhqjZdtBEB6lnhLreFJKxmlKbeGrqLiSThVIbCdGzloasa6lpMQXHCME2boLpJgT7yWaemu6wBONbqGNVRS0PKIL7LckbjmQtR7K8I5qtqel+T/ChJTNIKLjdUMNIRyvOEko9YYl2cwQveBikCNawJKcLBbc7+JM92mysNvd/Fqp8a0k6CNEe7cnZrxlW0wQXaXjaktnRwNOGZKYiONwS7a1JVheq3WgJHlQUGKHKmp4KAxXR/ULURcNgoa4zhKSLpZR3kxRRb0NmD0OFn+UCS7CzI1nbP6+o4x47QZE5xRCt3ZagnYcvmpYQktXdk5YKXTzBC57kKEe0VVuiSYqapssMS3C9p2CKkHOg8B8Pa8p5atrIw3qezIWanMGa5HRDNF6RM9wcacl0N+Q8Z8hsIkSnaIIdHRUOEebAPy1zbCkhM062FCJtif7PU+UtoVXzWKqM1PxXO8cfdruhFQ/a6x3JKYagvVDhQEtNiyiiSQ7OsuRsZUku0CRNDs4Sog6KKjsZgk2bYJqijgsEenoKeniinRXBn/U3lgpPdyDZynQx8IiioMnCep5Ky8mjGs6Wty0l1hUQTcNWswS3WRp2kCNZwJG8omG8JphPUaFbC8lEfabwP7VtM9yoaNCAjpR41VNhrD9LkbN722v0CoZMByFzhaW+MyzRYEWFDQwN2M4/JiT76PuljT3VU/A36eaIThb+R9oZGOAJ9tewkgGvqOMNRWYjT/Cwu99Q8LqDE4TgbLWxJ1jaDDAERsFOFrobgjUsBScaguXU8kKm2RL19tRypSHnHNlHiIZqgufs4opgQdVdwxBNNFBR6kVFqb8ogimOzB6a6HTzrlDHEpYaxjiiA4TMQobkDg2vejjfwJGWmnbVFAw3H3hq2NyQfG7hz4aC+w3BbwbesG0swYayvpAs6++Ri1Vfzx93mFChvyN5xVHTS+0p9aqCAxyZ6ZacZyw5+7uuQkFPR9DDk9NOiE7X1PCYJVjVUqq7JlrHwWALF5nfHNGjApdpqgzx5OwilDhCiDYTgnc9waGW4BdLNNUQvOtpzDOWHDH8D7TR/A/85KljEQu3NREc4Pl/6B1Hhc8Umb5CsKMmGC9EPcxoT2amwHNCmeOEnOPbklnMkbOgIvO5UMOpQrS9UGVdt6iH/fURjhI/WOpaW9OKLYRod6HCUEdOX000wpDZQ6hwg6LgZfOqo1RfT/CrJzjekXOGhpc1VW71ZLbXyyp+93ILbC1kPtIEYx0FIx1VDrLoVzXRKRYWk809yYlC9ImcrinxtabKnzRJk3lAU1OLEN1j2zrYzr2myHRXJFf4h4QKT1qSTzTB5+ZNTzTRkAxX8FcLV2uS8eoQQ2aAkFzvCM72sJIcJET3WPjRk5wi32uSS9rfZajpWEvj9hW42F4o5NytSXYy8IKHay10VYdrcl4SkqscrXpMwyGOgtkajheSxdQqmpxP1L3t4R5PqasFnrQEjytq6qgp9Y09Qx9o4S1FzhUCn1kyHSzBWLemoSGvOqLNhZyBjmCaAUYpMgt4Ck7wBBMMwWKWgjsUwTaGVsxWC1mYoKiyqqeGKYqonSIRQ3KIkHO0pmAxTdBHkbOvfllfr+AA+7gnc50huVKYK393FOyg7rbPO/izI7hE4CnHHHnJ0ogNPRUGeUpsrZZTBJcrovUcJe51BPsr6GkJdhCCsZ6aTtMEb2pqWkqeVtDXE/QVggsU/Nl86d9RMF3DxvZTA58agu810RWawCiSzzXBeU3MMW9oyJUedvNEvQyNu1f10BSMddR1vaLCYpYa/mGocLSiYDcLbQz8aMn5iyF4xBNMs1P0QEOV7o5gaWGuzSeLue4tt3ro7y4Tgm4G/mopdZgl6q0o6KzJWE3mMksNr3r+a6CbT8g5wZNzT9O7fi/zpaOmnz3BRoqos+tv9zMbdpxsqDBOEewtJLt7cg5wtKKbvldpSzRRCD43VFheCI7yZLppggMVBS/KMAdHODJvOwq2NQSbKKKPLdFWQs7Fqo+mpl01JXYRgq8dnGLhTiFzqmWsUMdpllZdbKlyvSdYxhI9YghOtxR8LgSLWHK62mGGVoxzBE8LNWzqH9CUesQzFy5RQzTc56mhi6fgXEWwpKfE5Z7M05ZgZUPmo6auiv8YKzDYwWBLMErIbKHJvOwIrvEdhOBcQ9JdU1NHQ7CXn2XIDFBKU2WAgcX9UAUzDXWd5alwuyJ41Z9rjKLCL4aCp4WarhPm2rH+SaHUYE001JDZ2ZAzXPjdMpZWvC9wmqIB2lLhQ01D5jO06hghWMndbM7yRJMsoCj1vYbnFQVrW9jak3OlEJ3s/96+p33dEPRV5GxiqaGjIthUU6FFEZyqCa5qJrpBdzSw95IUnOPIrCUUjRZQFrbw5PR0R1qiYx3cb6nrWUMrBmmiBQxVHtTew5ICP/ip6g4hed/Akob/32wvBHsIOX83cI8hGeNeNPCIkPmXe8fPKx84OMSRM1MTdXSwjCZ4S30jVGhvqTRak/OVhgGazHuOCud5onEO1lJr6ecVyaOK6H7zqlBlIaHE0oroCgfvGJIdPcmfLNGLjpz7hZwZQpUbFME0A1cIJa7VNORkgfsMBatbKgwwJM9bSvQXeNOvbIjelg6WWvo5kvbKaJJNHexkKNHL9xRyFlH8Ti2riB5wVPhUk7nGkJnoCe428LR/wRGdYIlmWebCyxou1rCk4g/ShugBDX0V0ZQWkh0dOVsagkM0yV6OoLd5ye+pRlsCr0n+KiQrGuq5yJDzrTAXHtLUMduTDBVKrSm3eHL+6ijxhFDX9Z5gVU/wliHYTMiMFpKLNMEywu80wd3meoFmt6VbRMPenhrOc6DVe4pgXU8DnnHakLOIIrlF4FZPIw6R+zxBP0dyq6OOZ4Q5sLKCcz084ok+VsMMyQhNZmmBgX5xIXOEJTmi7VsGTvMTNdHHhpzdbE8Du2oKxgvBqQKdDDnTFOylCFaxR1syz2iqrOI/FEpNc3C6f11/7+ASS6l2inq2ciTrCCzgyemrCL5SVPjQkdPZUmGy2c9Sw9FtR1sS30RmsKPCS4rkIC/2U0MduwucYolGaPjKEyhzmiPYXagyWbYz8LWBDdzRimAXzxx4z8K9hpzlhLq+NiQ97HuKorMUfK/OVvC2JfiHUPCQI/q7J2gjK+tTDNxkCc4TMssqCs4TGtLVwQihyoAWgj9bosU80XGW6Ac9TJGziaUh5+hnFcHOnlaM1iRn29NaqGENTTTSUHCH2tWTeV0osUhH6psuVLjRUmGWhm6OZEshGeNowABHcJ2Bpy2ZszRcKkRXd2QuKVEeXnbfaEq825FguqfgfE2whlChSRMdron+LATTPQ2Z369t4B9C5gs/ylzv+CMmepIDPclFQl13W0rspPd1JOcbghGOEutqCv5qacURQl3dDKyvyJlqKXGPgcM9FfawJAMVmdcspcYKOZc4GjDYkFlK05olNMHyHn4zFNykyOxt99RkHlfwmiHo60l2EKI+mhreEKp080Tbug08BVPcgoqC5zWt+NLDTZ7oNSF51N1qie7Va3uCCwyZbkINf/NED6jzOsBdZjFN8oqG3wxVunqCSYYKf3EdhJyf9YWGf7tRU2oH3VHgPr1fe5J9hOgHd7xQ0y7qBwXr23aGErP0cm64JVjZwsOGqL+mhNgZmhJLW2oY4UhedsyBgzrCKrq7BmcpNVhR6jBPq64Vgi+kn6XE68pp8J5/+0wRHGOpsKenQn9DZntPzjRLZpDAdD2fnSgkG9tmIXnUwQ6WVighs7Yi2MxQ0N3CqYaCXkJ0oyOztMDJjmSSpcpvlrk0RMMOjmArQ04PRV1DO1FwhCVaUVPpKUM03JK5SxPsIWRu8/CGHi8UHChiqGFDTbSRJWeYUDDcH6vJWUxR4k1FXbMUwV6e4AJFXS8oMqsZKqzvYQ9DDQdZckY4aGsIhtlubbd2r3j4QBMoTamdPZk7O/Bf62lacZwneNjQoGcdVU7zJOd7ghsUHOkosagic6cnWc8+4gg285R6zZP5s1/LUbCKIznTwK36PkdwlOrl4U1LwfdCCa+IrvFkmgw1PCAUXKWo0sURXWcI2muKJlgyFzhynCY4RBOsqCjoI1R5zREco0n2Vt09BQtYSizgKNHfUmUrQ5UOCh51BFcLmY7umhYqXKQomOop8bUnWNNQcIiBcYaC6xzMNOS8JQQfeqKBmmglB+97ok/lfk3ygaHSyZaCRTzRxQo6GzLfa2jWBPepw+UmT7SQEJyiyRkhBLMVOfcoMjcK0eZChfUNzFAUzCsEN5vP/X1uP/n/aoMX+K+nw/Hjr/9xOo7j7Pju61tLcgvJpTWXNbfN5jLpi6VfCOviTktKlFusQixdEKWmEBUKNaIpjZRSSOXSgzaaKLdabrm1/9nZ+/f+vd/vz/v9+Xy+zZ7PRorYoZqyLrCwQdEAixxVOEXNNnjX2nUSRlkqGmWowk8lxR50JPy9Bo6qJXaXwNvREBvnThPEPrewryLhcAnj5WE15Fqi8W7R1sAuEu86S4ENikItFN4xkv9Af4nXSnUVcLiA9xzesFpivRRVeFKtsMRaKBhuSbjOELnAUtlSQUpXgdfB4Z1oSbnFEetbQ0IrAe+Y+pqnDcEJFj6S8LDZzZHwY4e3XONNlARraomNEt2bkvGsosA3ioyHm+6jCMbI59wqt4eeara28IzEmyPgoRaUOEDhTVdEJhmCoTWfC0p8aNkCp0oYqih2iqGi4yXeMkOsn4LdLLnmKfh/YogjNsPebeFGR4m9BJHLzB61XQ3BtpISfS2FugsK9FAtLWX1dCRcrCnUp44CNzuCowUZmxSRgYaE6Za0W2u/E7CVXCiI/UOR8aAm1+OSyE3mOUcwyc1zBBeoX1kiKy0Zfxck1Gsyulti11i83QTBF5Kg3pDQThFMVHiPSlK+0cSedng/VaS8bOZbtsBcTcZAR8JP5KeqQ1OYKAi20njdNNRpgnsU//K+JnaXJaGTomr7aYIphoRn9aeShJWKEq9LcozSF7QleEfDI5LYm5bgVkFkRwVDBCVu0DDIkGupo8TZBq+/pMQURYErJQmPKGKjNDkWOLx7Jd5QizdUweIaKrlP7SwJDhZvONjLkOsBBX9UpGxnydhXkfBLQ8IxgojQbLFnJf81JytSljclYYyEFyx0kVBvKWOFJmONpshGAcsduQY5giVNCV51eOdJYo/pLhbvM0uDHSevNKRcrKZIqnCtJeEsO95RoqcgGK4ocZcho1tTYtcZvH41pNQ7vA0WrhIfOSraIIntIAi+NXWCErdbkvrWwjRLrt0NKUdL6KSOscTOdMSOUtBHwL6OLA0vNSdynaWQEnCpIvKaIrJJEbvHkmuNhn6OjM8VkSGSqn1uYJCGHnq9I3aLhNME3t6GjIkO7xrNFumpyTNX/NrwX7CrIRiqqWijI9JO4d1iieykyfiposQIQ8YjjsjlBh6oHWbwRjgYJQn2NgSnNycmJAk3NiXhx44Sxykihxm8ybUwT1OVKySc7vi3OXVkdBJ4AyXBeksDXG0IhgtYY0lY5ahCD0ehborIk5aUWRJviMA7Xt5kyRjonrXENkm8yYqgs8VzgrJmClK20uMM3jRJ0FiQICQF9hdETlLQWRIb5ki6WDfWRPobvO6a4GP5mcOrNzDFELtTkONLh9dXE8xypEg7z8A9jkhrQ6Fhjlg/QVktJXxt4WXzT/03Q8IaQWSqIuEvloQ2mqC9Jfi7wRul4RX3pSPlzpoVlmCtI2jvKHCFhjcM3sN6lqF6HxnKelLjXWbwrpR4xzuCrTUZx2qq9oAh8p6ixCUGr78g8oyjRAtB5CZFwi80VerVpI0h+IeBxa6Zg6kWvpDHaioYYuEsRbDC3eOmC2JvGYLeioxGknL2UATNJN6hmtj1DlpLvDVmocYbrGCVJKOrg4X6DgddLA203BKMFngdJJFtFd7vJLm6KEpc5yjQrkk7M80SGe34X24nSex1Ra5Omgb71JKyg8SrU3i/kARKwWpH0kOGhKkObyfd0ZGjvyXlAkVZ4xRbYJ2irFMkFY1SwyWxr2oo4zlNiV+7zmaweFpT4kR3kaDAFW6xpSqzJay05FtYR4HmZhc9UxKbbfF2V8RG1MBmSaE+kmC6JnaRXK9gsiXhJHl/U0qM0WTcbyhwkYIvFGwjSbjfwhiJt8ZSQU+Bd5+marPMOkVkD0muxYLIfEuhh60x/J92itguihJSEMySVPQnTewnEm+620rTQEMsOfo4/kP/0ARvWjitlpSX7GxBgcMEsd3EEeYWvdytd+Saawi6aCIj1CkGb6Aj9rwhx16Cf3vAwFy5pyLhVonXzy51FDpdEblbkdJbUcEPDEFzQ8qNmhzzLTmmKWKbFCXeEuRabp6rxbvAtLF442QjQ+wEA9eL1xSR7Q0JXzlSHjJ4exq89yR0laScJ/FW6z4a73pFMEfDiRZvuvijIt86RaSFOl01riV2mD1UEvxGk/Geg5aWwGki1zgKPG9J2U8PEg8qYvMsZeytiTRXBMslCU8JSlxi8EabjwUldlDNLfzTUmCgxWsjqWCOHavYAqsknKFIO0yQ61VL5AVFxk6WhEaCAkdJgt9aSkzXlKNX2jEa79waYuc7gq0N3GDJGCBhoiTXUEPsdknCUE1CK0fwsiaylSF2uiDyO4XX3pFhNd7R4itFGc0k/ElBZwWvq+GC6szVeEoS/MZ+qylwpKNKv9Z469UOjqCjwlusicyTxG6VpNxcQ8IncoR4RhLbR+NdpGGmJWOcIzJGUuKPGpQg8rrG21dOMqQssJQ4RxH5jaUqnZuQ0F4Q+cjxLwPtpZbIAk3QTJHQWBE5S1BokoVtDd6lhqr9UpHSUxMcIYl9pojsb8h4SBOsMQcqvOWC2E8EVehqiJ1hrrAEbQxeK0NGZ0Gkq+guSRgniM23bIHVkqwx4hiHd7smaOyglyIyQuM978j4VS08J/A2G1KeMBRo4fBaSNhKUEZfQewVQ/C1I+MgfbEleEzCUw7mKXI0M3hd1EESVji8x5uQ41nxs1q4RMJCCXs7Iq9acpxn22oSDnQ/sJTxsCbHIYZiLyhY05TY0ZLIOQrGaSJDDN4t8pVaIrsqqFdEegtizc1iTew5Q4ayBDMUsQMkXocaYkc0hZua412siZ1rSXlR460zRJ5SlHGe5j801RLMlJTxtaOM3Q1pvxJ45zUlWFD7rsAbpfEm1JHxG0eh8w2R7QQVzBUw28FhFp5QZzq8t2rx2joqulYTWSuJdTYfWwqMFMcovFmSyJPNyLhE4E10pHzYjOC3huArRa571ZsGajQpQx38SBP5pyZB6lMU3khDnp0MBV51BE9o2E+TY5Ml2E8S7C0o6w1xvCZjf0HkVEHCzFoyNmqC+9wdcqN+Tp7jSDheE9ws8Y5V0NJCn2bk2tqSY4okdrEhx1iDN8cSudwepWmAGXKcJXK65H9to8jYQRH7SBF01ESUJdd0TayVInaWhLkOjlXE5irKGOnI6GSWGCJa482zBI9rCr0jyTVcEuzriC1vcr6mwFGSiqy5zMwxBH/TJHwjSPhL8+01kaaSUuMFKTcLEvaUePcrSmwn8DZrgikWb7CGPxkSjhQwrRk57tctmxLsb9sZvL9LSlyuSLlWkqOjwduo8b6Uv1DkmudIeFF2dHCgxVtk8dpIvHpBxhEOdhKk7OLIUSdJ+cSRY57B+0DgGUUlNfpthTfGkauzxrvTsUUaCVhlKeteTXCoJDCa2NOKhOmC4G1H8JBd4OBZReSRGkqcb/CO1PyLJTLB4j1q8JYaIutEjSLX8YKM+a6phdMsdLFUoV5RTm9JSkuDN8WcIon0NZMNZWh1q8C7SJEwV5HxrmnnTrf3KoJBlmCYI2ilSLlfEvlE4011NNgjgthzEua0oKK7JLE7HZHlEl60BLMVFewg4EWNt0ThrVNEVkkiTwpKXSWJzdRENgvKGq4IhjsiezgSFtsfCUq8qki5S1LRQeYQQ4nemmCkImWMw3tFUoUBZk4NOeZYEp4XRKTGa6wJjrWNHBVJR4m3FCnbuD6aak2WsMTh3SZImGCIPKNgsDpVwnsa70K31lCFJZYcwwSMFcQulGTsZuEaSdBXkPGZhu0FsdUO73RHjq8MPGGIfaGIbVTk6iuI3GFgucHrIQkmWSJdBd7BBu+uOryWAhY7+Lki9rK5wtEQzWwvtbqGhIMFwWRJsElsY4m9IIg9L6lCX0VklaPAYkfkZEGDnOWowlBJjtMUkcGK4Lg6EtoZInMUBVYLgn0UsdmCyCz7gIGHFfk+k1QwTh5We7A9x+IdJ6CvIkEagms0hR50eH9UnTQJ+2oiKyVlLFUE+8gBGu8MQ3CppUHesnjTHN4QB/UGPhCTHLFPHMFrCqa73gqObUJGa03wgbhHkrCfpEpzNLE7JDS25FMKhlhKKWKfCgqstLCPu1zBXy0J2ztwjtixBu8UTRn9LVtkmCN2iyFhtME70JHRQ1KVZXqKI/KNIKYMCYs1GUMEKbM1bKOI9LDXC7zbHS+bt+1MTWS9odA9DtrYtpbImQJ2VHh/lisEwaHqUk1kjKTAKknkBEXkbkdMGwq0dnhzLJF3NJH3JVwrqOB4Sca2hti75nmJN0WzxS6UxDYoEpxpa4htVlRjkYE7DZGzJVU72uC9IyhQL4i8YfGWSYLLNcHXloyz7QhNifmKSE9JgfGmuyLhc403Xm9vqcp6gXe3xuuv8F6VJNxkyTHEkHG2g0aKXL0MsXc1bGfgas2//dCONXiNLCX+5mB7eZIl1kHh7ajwpikyzlUUWOVOsjSQlsS+M0R+pPje/dzBXRZGO0rMtgQrLLG9VSu9n6CMXS3BhwYmSoIBhsjNBmZbgusE9BCPCP5triU4VhNbJfE+swSP27aayE8tuTpYYjtrYjMVGZdp2NpS1s6aBnKSHDsbKuplKbHM4a0wMFd/5/DmGyKrJSUaW4IBrqUhx0vyfzTBBLPIUcnZdrAkNsKR0sWRspumSns6Ch0v/qqIbBYUWKvPU/CFoyrDJGwSNFhbA/MlzKqjrO80hRbpKx0Jewsi/STftwGSlKc1JZyAzx05dhLEdnfQvhZOqiHWWEAHC7+30FuRcZUgaO5gpaIK+xsiHRUsqaPElTV40xQZQ107Q9BZE1nryDVGU9ZSQ47bmhBpLcYpUt7S+xuK/FiT8qKjwXYw5ypS2iuCv7q1gtgjhuBuB8LCFY5cUuCNtsQOFcT+4Ih9JX+k8Ea6v0iCIRZOtCT0Et00JW5UeC85Cg0ScK0k411HcG1zKtre3SeITBRk7WfwDhEvaYLTHP9le0m8By0JDwn4TlLW/aJOvGHxdjYUes+ScZigCkYQdNdEOhkiezgShqkx8ueKjI8lDfK2oNiOFvrZH1hS+tk7NV7nOmLHicGWEgubkXKdwdtZknCLJXaCpkrjZBtLZFsDP9CdxWsSr05Sxl6CMmoFbCOgryX40uDtamB7SVmXW4Ihlgpmq+00tBKUUa83WbjLUNkzDmY7cow1JDygyPGlhgGKYKz4vcV7QBNbJIgM11TUqZaMdwTeSguH6rOaw1JRKzaaGyxVm2EJ/uCIrVWUcZUkcp2grMsEjK+DMwS59jQk3Kd6SEq1d0S6uVmO4Bc1lDXTUcHjluCXEq+1OlBDj1pi9zgiXxnKuE0SqTXwhqbETW6RggMEnGl/q49UT2iCzgJvRwVXS2K/d6+ZkyUl7jawSVLit46EwxVljDZwoSQ20sDBihztHfk2yA8NVZghiXwrYHQdfKAOtzsayjhY9bY0yE2CWEeJ9xfzO423xhL5syS2TFJofO2pboHob0nY4GiAgRrvGQEDa/FWSsoaaYl0syRsEt3kWoH3B01shCXhTUWe9w3Bt44SC9QCh3eShQctwbaK2ApLroGCMlZrYqvlY3qYhM0aXpFkPOuoqJ3Dm6fxXrGwVF9gCWZagjPqznfkuMKQ8DPTQRO8ZqG1hPGKEm9IgpGW4DZDgTNriTxvFiq+Lz+0cKfp4wj6OCK9JSnzNSn9LFU7UhKZZMnYwcJ8s8yRsECScK4j5UOB95HFO0CzhY4xJxuCix0lDlEUeMdS6EZBkTsUkZ4K74dugyTXS7aNgL8aqjDfkCE0ZbwkCXpaWCKhl8P7VD5jxykivSyxyZrYERbe168LYu9ZYh86IkscgVLE7tWPKmJv11CgoyJltMEbrohtVAQfO4ImltiHEroYEs7RxAarVpY8AwXMcMReFOTYWe5iiLRQxJ5Q8DtJ8LQhWOhIeFESPGsILhbNDRljNbHzNRlTFbk2S3L0NOS6V1KFJYKUbSTcIIhM0wQ/s2TM0SRMNcQmSap3jCH4yhJZKSkwyRHpYYgsFeQ4U7xoCB7VVOExhXepo9ABBsYbvGWKXPME3lyH95YioZ0gssQRWWbI+FaSMkXijZXwgiTlYdPdkNLaETxlyDVIwqeaEus0aTcYcg0RVOkpR3CSJqIddK+90JCxzsDVloyrFd5ZAr4TBKfaWa6boEA7C7s6EpYaeFPjveooY72mjIccLHJ9HUwVlDhKkmutJDJBwnp1rvulJZggKDRfbXAkvC/4l3ozQOG9a8lxjx0i7nV4jSXc7vhe3OwIxjgSHjdEhhsif9YkPGlus3iLFDnWOFhtCZbJg0UbQcIaR67JjthoCyMEZRwhiXWyxO5QxI6w5NhT4U1WsJvDO60J34fW9hwzwlKij6ZAW9ne4L0s8C6XeBMEkd/LQy1VucBRot6QMlbivaBhoBgjqGiCJNhsqVp/S2SsG6DIONCR0dXhvWbJ+MRRZJkkuEjgDXJjFQW6SSL7GXK8Z2CZg7cVsbWGoKmEpzQ5elpiy8Ryg7dMkLLUEauzeO86CuwlSOlgYLojZWeJ9xM3S1PWfEfKl5ISLQ0MEKR8YOB2QfCxJBjrKPCN4f9MkaSsqoVXJBmP7EpFZ9UQfOoOFwSzBN4MQ8LsGrymlipcJQhmy0GaQjPqCHaXRwuCZwRbqK2Fg9wlClZqYicrIgMdZfxTQ0c7TBIbrChxmuzoKG8XRaSrIhhiyNFJkrC7oIAWMEOQa5aBekPCRknCo4IKPrYkvCDI8aYmY7WFtprgekcJZ3oLIqssCSMtFbQTJKwXYy3BY5oCh2iKPCpJOE+zRdpYgi6O2KmOAgvVCYaU4ySRek1sgyFhJ403QFHiVEmJHwtybO1gs8Hr5+BETQX3War0qZngYGgtVZtoqd6vFSk/UwdZElYqyjrF4HXUeFspIi9IGKf4j92pKGAdCYMVsbcV3kRF0N+R8LUd5PCsIGWoxDtBkCI0nKofdJQxT+LtZflvuc8Q3CjwWkq8KwUpHzkK/NmSsclCL0nseQdj5FRH5CNHSgtLiW80Of5HU9Hhlsga9bnBq3fEVltKfO5IaSTmGjjc4J0otcP7QsJUSQM8pEj5/wCuUuC2DWz8AAAAAElFTkSuQmCC") repeat scroll 0% 0%/auto padding-box border-box;
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
.playground-theme-bespin {
  --playground-code-background: rgb(40, 33, 28);
  --playground-code-default-color: rgb(157, 155, 151);
  --playground-code-cursor-color: rgb(121, 121, 119);
  --playground-code-selection-background: rgb(89, 85, 79);
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
.playground-theme-eclipse {
  --playground-code-comment-color: rgb(63, 127, 95);
  --playground-code-keyword-color: rgb(127, 0, 85);
  --playground-code-meta-color: rgb(255, 23, 23);
  --playground-code-string-color: rgb(42, 0, 255);
  --playground-code-type-color: rgb(0, 0, 192);
  --playground-code-variable-2-color: rgb(0, 0, 192);
  --playground-code-variable-3-color: rgb(0, 0, 192)
}
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
.playground-theme-juejin {
  --playground-code-background: rgb(248, 249, 250);
  --playground-code-atom-color: rgb(0, 0, 0);
  --playground-code-attribute-color: rgb(253, 119, 65);
  --playground-code-builtin-color: rgb(187, 81, 184);
  --playground-code-comment-color: rgb(0, 158, 157);
  --playground-code-def-color: rgb(27, 162, 240);
  --playground-code-keyword-color: rgb(187, 81, 184);
  --playground-code-meta-color: rgb(0, 0, 0);
  --playground-code-number-color: rgb(0, 0, 0);
  --playground-code-qualifier-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(0, 0, 0);
  --playground-code-string-2-color: rgb(0, 0, 0);
  --playground-code-tag-color: rgb(16, 112, 0);
  --playground-code-type-color: rgb(0, 0, 0);
  --playground-code-variable-2-color: rgb(0, 80, 160);
  --playground-code-variable-3-color: rgb(0, 0, 0)
}
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
.playground-theme-ttcn {
  --playground-code-builtin-color: rgb(0, 0, 0);
  --playground-code-comment-color: rgb(51, 51, 51);
  --playground-code-keyword-color: rgb(0, 0, 0);
  --playground-code-number-color: rgb(0, 0, 0);
  --playground-code-string-color: rgb(0, 100, 0);
  --playground-code-variable-color: rgb(139, 34, 82)
}
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`,c`
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
`],Mi=[{id:"codeBackground",label:"Background",cssProperty:"--playground-code-background",defaultValue:"#ffffff"},{id:"synDefault",label:"Default",cssProperty:"--playground-code-default-color",cmClass:'.CodeMirror-line [role="presentation"]',defaultValue:"#000000"},{id:"synKeyword",label:"Keyword",cssProperty:"--playground-code-keyword-color",cmClass:"cm-keyword",defaultValue:"#770088"},{id:"synAtom",label:"Atom",cssProperty:"--playground-code-atom-color",cmClass:"cm-atom",defaultValue:"#221199"},{id:"synNumber",label:"Number",cssProperty:"--playground-code-number-color",cmClass:"cm-number",defaultValue:"#116644"},{id:"synDef",label:"Def",cssProperty:"--playground-code-def-color",cmClass:"cm-def",defaultValue:"#0000ff"},{id:"synVariable",label:"Variable",cssProperty:"--playground-code-variable-color",cmClass:"cm-variable",defaultValue:"#000000"},{id:"synProperty",label:"Property",cssProperty:"--playground-code-property-color",cmClass:"cm-property",defaultValue:"#000000"},{id:"synOperator",label:"Operator",cssProperty:"--playground-code-operator-color",cmClass:"cm-operator",defaultValue:"#000000"},{id:"synVariable2",label:"Variable 2",cssProperty:"--playground-code-variable-2-color",cmClass:"cm-variable-2",defaultValue:"#0055aa"},{id:"synVariable3",label:"Variable 3",cssProperty:"--playground-code-variable-3-color",cmClass:"cm-variable-3",defaultValue:"#008855"},{id:"synType",label:"Type",cssProperty:"--playground-code-type-color",cmClass:"cm-type",defaultValue:"#008855"},{id:"synComment",label:"Comment",cssProperty:"--playground-code-comment-color",cmClass:"cm-comment",defaultValue:"#aa5500"},{id:"synString",label:"String",cssProperty:"--playground-code-string-color",cmClass:"cm-string",defaultValue:"#aa1111"},{id:"synString2",label:"String 2",cssProperty:"--playground-code-string-2-color",cmClass:"cm-string-2",defaultValue:"#ff5500"},{id:"synMeta",label:"Meta",cssProperty:"--playground-code-meta-color",cmClass:"cm-meta",defaultValue:"#555555"},{id:"synQualifier",label:"Qualifier",cssProperty:"--playground-code-qualifier-color",cmClass:"cm-qualifier",defaultValue:"#555555"},{id:"synBuiltin",label:"Builtin",cssProperty:"--playground-code-builtin-color",cmClass:"cm-builtin",defaultValue:"#3300aa"},{id:"synTag",label:"Tag",cssProperty:"--playground-code-tag-color",cmClass:"cm-tag",defaultValue:"#117700"},{id:"synAttribute",label:"Attribute",cssProperty:"--playground-code-attribute-color",cmClass:"cm-attribute",defaultValue:"#0000cc"},{id:"synCallee",label:"Callee",cssProperty:"--playground-code-callee-color",cmClass:"cm-callee",defaultValue:"#000000"}];
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ii(e){return{type:"checkbox",...e}}function Ri(e){return{type:"slider",...e}}function Fi(e){return{type:"color",...e}}function Ni(e){return{type:"select",...e}}const zi=e=>e+"px",Di=[Ni({id:"theme",label:"Theme",section:"code",options:["default","3024-day","3024-night","abbott","abcdef","ambiance","ayu-dark","ayu-mirage","base16-dark","base16-light","bespin","blackboard","cobalt","colorforth","darcula","dracula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark","hopscotch","icecoder","idea","isotope","juejin","lesser-dark","liquibyte","lucario","material-darker","material-ocean","material-palenight","material","mbo","mdn-like","midnight","monokai","moxer","neat","neo","night","nord","oceanic-next","panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue","seti","shadowfox","solarized","ssms","the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight","vibrant-ink","xq-dark","xq-light","yeti","yonce","zenburn"],default:"default"}),Ri({id:"fontSize",label:"Font size",section:"code",cssProperty:"--playground-code-font-size",formatCss:zi,min:1,max:30,default:14}),Ni({id:"fontFamily",label:"Font",section:"code",cssProperty:"--playground-code-font-family",options:["monospace","Roboto Mono","Source Code Pro","Ubuntu Mono"],formatCss:e=>"monospace"!==e?e+", monospace":e,default:"monospace"}),...Mi.map((e=>{const{id:t,label:r,cssProperty:o,defaultValue:i}=e;return Fi({id:t,label:r,cssProperty:o,default:i,originalDefault:i,section:"code"})})),Ii({id:"resizable",label:"Resizable",section:"features",default:!1,htmlAttribute:"resizable"}),Ii({id:"editableFileSystem",label:"Editable filesystem",section:"features",default:!1,htmlAttribute:"editable-file-system"}),Ii({id:"lineNumbers",label:"Line numbers",section:"features",default:!1,htmlAttribute:"line-numbers"}),Ii({id:"lineWrapping",label:"Line wrapping",section:"features",default:!1,htmlAttribute:"line-wrapping"}),Ii({id:"noCompletions",label:"No completions",section:"features",default:!1,htmlAttribute:"no-completions"}),Fi({id:"highlight",label:"Highlight",cssProperty:"--playground-highlight-color",default:"#6200ee",section:"general appearance"}),Fi({id:"pageBackground",label:"Page background",default:"#cccccc",originalDefault:"#cccccc",section:"general appearance"}),Ri({id:"radius",label:"Radius",cssProperty:"border-radius",formatCss:zi,min:0,max:30,default:0,section:"general appearance"}),Ii({id:"borders",label:"Borders",cssProperty:"--playground-border",formatCss:e=>e?"1px solid #ddd":"none",default:!0,section:"general appearance"}),Fi({id:"tabBarBackground",label:"Background",cssProperty:"--playground-tab-bar-background",default:"#eaeaea",section:"tab bar"}),Fi({id:"tabBarForeground",label:"Foreground",cssProperty:"--playground-tab-bar-foreground-color",default:"#000000",section:"tab bar"}),Ri({id:"barHeight",label:"Bar height",cssProperty:"--playground-bar-height",formatCss:zi,min:10,max:100,default:40,section:"tab bar"}),Fi({id:"previewToolbarBackground",label:"Background",cssProperty:"--playground-preview-toolbar-background",default:"#ffffff",section:"preview"}),Fi({id:"previewToolbarForeground",label:"Foreground",cssProperty:"--playground-preview-toolbar-foreground-color",default:"#444444",section:"preview"}),Ri({id:"previewWidth",label:"Preview width",cssProperty:"--playground-preview-width",formatCss:e=>e+"%",min:0,max:100,default:30,section:"preview"})],Pi={},Hi={};for(const e of Di){Pi[e.id]=e;let t=Hi[e.section];void 0===t&&(t=Hi[e.section]=[]),t.push(e)}const Ui=Object.keys(Pi),Bi=Object.keys(Hi);class Wi{constructor(){this.values=new Map}getValue(e){return this.values.has(e)?this.values.get(e):Pi[e].default}setValue(e,t){this.values.set(e,t)}}
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
 */(()=>{var e,t,r;const o=Symbol(),i=Symbol(),n=Symbol(),a=Symbol(),l=Symbol(),s=Symbol(),d=Symbol(),c=Symbol(),u=Symbol(),p=Symbol(),h=Symbol(),g=Symbol(),m=Symbol();class f{constructor(){this[e]=[],this[t]=[],this[r]=new Set}destructor(){this[u](this[n]);const e=this;e[o]=null,e[n]=null,e[i]=null}get top(){const e=this[o];return e[e.length-1]||null}push(e){e&&e!==this.top&&(this.remove(e),this[s](e),this[o].push(e))}remove(e){const t=this[o].indexOf(e);return-1!==t&&(this[o].splice(t,1),t===this[o].length&&this[s](this.top),!0)}pop(){const e=this.top;return e&&this.remove(e),e}has(e){return-1!==this[o].indexOf(e)}[(e=o,t=n,r=i,s)](e){const t=this[i],r=this[n];if(!e)return this[u](r),t.clear(),void(this[n]=[]);const o=this[p](e);if(o[o.length-1].parentNode!==document.body)throw Error("Non-connected element cannot be a blocking element");this[n]=o;const a=this[h](e);if(!r.length)return void this[c](o,a,t);let l=r.length-1,s=o.length-1;for(;l>0&&s>0&&r[l]===o[s];)l--,s--;r[l]!==o[s]&&this[d](r[l],o[s]),l>0&&this[u](r.slice(0,l)),s>0&&this[c](o.slice(0,s),a,null)}[d](e,t){const r=e[a];this[g](e)&&!e.inert&&(e.inert=!0,r.add(e)),r.has(t)&&(t.inert=!1,r.delete(t)),t[l]=e[l],t[a]=r,e[l]=void 0,e[a]=void 0}[u](e){for(const t of e){t[l].disconnect(),t[l]=void 0;const e=t[a];for(const t of e)t.inert=!1;t[a]=void 0}}[c](e,t,r){for(const o of e){const e=o.parentNode,i=e.children,n=new Set;for(let e=0;e<i.length;e++){const a=i[e];a===o||!this[g](a)||t&&t.has(a)||(r&&a.inert?r.add(a):(a.inert=!0,n.add(a)))}o[a]=n;const s=new MutationObserver(this[m].bind(this));o[l]=s;let d=e;const c=d;c.__shady&&c.host&&(d=c.host),s.observe(d,{childList:!0})}}[m](e){const t=this[n],r=this[i];for(const o of e){const e=o.target.host||o.target,i=e===document.body?t.length:t.indexOf(e),n=t[i-1],l=n[a];for(let e=0;e<o.removedNodes.length;e++){const t=o.removedNodes[e];if(t===n)return console.info("Detected removal of the top Blocking Element."),void this.pop();l.has(t)&&(t.inert=!1,l.delete(t))}for(let e=0;e<o.addedNodes.length;e++){const t=o.addedNodes[e];this[g](t)&&(r&&t.inert?r.add(t):(t.inert=!0,l.add(t)))}}}[g](e){return!1===/^(style|template|script)$/.test(e.localName)}[p](e){const t=[];let r=e;for(;r&&r!==document.body;)if(r.nodeType===Node.ELEMENT_NODE&&t.push(r),r.assignedSlot){for(;r=r.assignedSlot;)t.push(r);r=t.pop()}else r=r.parentNode||r.host;return t}[h](e){const t=e.shadowRoot;if(!t)return null;const r=new Set;let o,i,n;const a=t.querySelectorAll("slot");if(a.length&&a[0].assignedNodes)for(o=0;o<a.length;o++)for(n=a[o].assignedNodes({flatten:!0}),i=0;i<n.length;i++)n[i].nodeType===Node.ELEMENT_NODE&&r.add(n[i]);return r}}document.$blockingElements=new f})();var Ki=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}();function ji(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}!function(){if("undefined"!=typeof window){var e=Array.prototype.slice,t=Element.prototype.matches||Element.prototype.msMatchesSelector,r="a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),details,summary,iframe,object,embed,[contenteditable]",o=function(){function o(e,t){ji(this,o),this._inertManager=t,this._rootElement=e,this._managedNodes=new Set,this._rootElement.hasAttribute("aria-hidden")?this._savedAriaHidden=this._rootElement.getAttribute("aria-hidden"):this._savedAriaHidden=null,this._rootElement.setAttribute("aria-hidden","true"),this._makeSubtreeUnfocusable(this._rootElement),this._observer=new MutationObserver(this._onMutation.bind(this)),this._observer.observe(this._rootElement,{attributes:!0,childList:!0,subtree:!0})}return Ki(o,[{key:"destructor",value:function(){this._observer.disconnect(),this._rootElement&&(null!==this._savedAriaHidden?this._rootElement.setAttribute("aria-hidden",this._savedAriaHidden):this._rootElement.removeAttribute("aria-hidden")),this._managedNodes.forEach((function(e){this._unmanageNode(e.node)}),this),this._observer=null,this._rootElement=null,this._managedNodes=null,this._inertManager=null}},{key:"_makeSubtreeUnfocusable",value:function(e){var t=this;l(e,(function(e){return t._visitNode(e)}));var r=document.activeElement;if(!document.body.contains(e)){for(var o=e,i=void 0;o;){if(o.nodeType===Node.DOCUMENT_FRAGMENT_NODE){i=o;break}o=o.parentNode}i&&(r=i.activeElement)}e.contains(r)&&(r.blur(),r===document.activeElement&&document.body.focus())}},{key:"_visitNode",value:function(e){if(e.nodeType===Node.ELEMENT_NODE){var o=e;o!==this._rootElement&&o.hasAttribute("inert")&&this._adoptInertRoot(o),(t.call(o,r)||o.hasAttribute("tabindex"))&&this._manageNode(o)}}},{key:"_manageNode",value:function(e){var t=this._inertManager.register(e,this);this._managedNodes.add(t)}},{key:"_unmanageNode",value:function(e){var t=this._inertManager.deregister(e,this);t&&this._managedNodes.delete(t)}},{key:"_unmanageSubtree",value:function(e){var t=this;l(e,(function(e){return t._unmanageNode(e)}))}},{key:"_adoptInertRoot",value:function(e){var t=this._inertManager.getInertRoot(e);t||(this._inertManager.setInert(e,!0),t=this._inertManager.getInertRoot(e)),t.managedNodes.forEach((function(e){this._manageNode(e.node)}),this)}},{key:"_onMutation",value:function(t,r){t.forEach((function(t){var r=t.target;if("childList"===t.type)e.call(t.addedNodes).forEach((function(e){this._makeSubtreeUnfocusable(e)}),this),e.call(t.removedNodes).forEach((function(e){this._unmanageSubtree(e)}),this);else if("attributes"===t.type)if("tabindex"===t.attributeName)this._manageNode(r);else if(r!==this._rootElement&&"inert"===t.attributeName&&r.hasAttribute("inert")){this._adoptInertRoot(r);var o=this._inertManager.getInertRoot(r);this._managedNodes.forEach((function(e){r.contains(e.node)&&o._manageNode(e.node)}))}}),this)}},{key:"managedNodes",get:function(){return new Set(this._managedNodes)}},{key:"hasSavedAriaHidden",get:function(){return null!==this._savedAriaHidden}},{key:"savedAriaHidden",set:function(e){this._savedAriaHidden=e},get:function(){return this._savedAriaHidden}}]),o}(),i=function(){function e(t,r){ji(this,e),this._node=t,this._overrodeFocusMethod=!1,this._inertRoots=new Set([r]),this._savedTabIndex=null,this._destroyed=!1,this.ensureUntabbable()}return Ki(e,[{key:"destructor",value:function(){if(this._throwIfDestroyed(),this._node&&this._node.nodeType===Node.ELEMENT_NODE){var e=this._node;null!==this._savedTabIndex?e.setAttribute("tabindex",this._savedTabIndex):e.removeAttribute("tabindex"),this._overrodeFocusMethod&&delete e.focus}this._node=null,this._inertRoots=null,this._destroyed=!0}},{key:"_throwIfDestroyed",value:function(){if(this.destroyed)throw Error("Trying to access destroyed InertNode")}},{key:"ensureUntabbable",value:function(){if(this.node.nodeType===Node.ELEMENT_NODE){var e=this.node;if(t.call(e,r)){if(-1===e.tabIndex&&this.hasSavedTabIndex)return;e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex),e.setAttribute("tabindex","-1"),e.nodeType===Node.ELEMENT_NODE&&(e.focus=function(){},this._overrodeFocusMethod=!0)}else e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex,e.removeAttribute("tabindex"))}}},{key:"addInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.add(e)}},{key:"removeInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.delete(e),0===this._inertRoots.size&&this.destructor()}},{key:"destroyed",get:function(){return this._destroyed}},{key:"hasSavedTabIndex",get:function(){return null!==this._savedTabIndex}},{key:"node",get:function(){return this._throwIfDestroyed(),this._node}},{key:"savedTabIndex",set:function(e){this._throwIfDestroyed(),this._savedTabIndex=e},get:function(){return this._throwIfDestroyed(),this._savedTabIndex}}]),e}(),n=function(){function r(e){if(ji(this,r),!e)throw Error("Missing required argument; InertManager needs to wrap a document.");this._document=e,this._managedNodes=new Map,this._inertRoots=new Map,this._observer=new MutationObserver(this._watchForInert.bind(this)),s(e.head||e.body||e.documentElement),"loading"===e.readyState?e.addEventListener("DOMContentLoaded",this._onDocumentLoaded.bind(this)):this._onDocumentLoaded()}return Ki(r,[{key:"setInert",value:function(e,t){if(t){if(this._inertRoots.has(e))return;var r=new o(e,this);if(e.setAttribute("inert",""),this._inertRoots.set(e,r),!this._document.body.contains(e))for(var i=e.parentNode;i;)11===i.nodeType&&s(i),i=i.parentNode}else{if(!this._inertRoots.has(e))return;this._inertRoots.get(e).destructor(),this._inertRoots.delete(e),e.removeAttribute("inert")}}},{key:"getInertRoot",value:function(e){return this._inertRoots.get(e)}},{key:"register",value:function(e,t){var r=this._managedNodes.get(e);return void 0!==r?r.addInertRoot(t):r=new i(e,t),this._managedNodes.set(e,r),r}},{key:"deregister",value:function(e,t){var r=this._managedNodes.get(e);return r?(r.removeInertRoot(t),r.destroyed&&this._managedNodes.delete(e),r):null}},{key:"_onDocumentLoaded",value:function(){e.call(this._document.querySelectorAll("[inert]")).forEach((function(e){this.setInert(e,!0)}),this),this._observer.observe(this._document.body||this._document.documentElement,{attributes:!0,subtree:!0,childList:!0})}},{key:"_watchForInert",value:function(r,o){var i=this;r.forEach((function(r){switch(r.type){case"childList":e.call(r.addedNodes).forEach((function(r){if(r.nodeType===Node.ELEMENT_NODE){var o=e.call(r.querySelectorAll("[inert]"));t.call(r,"[inert]")&&o.unshift(r),o.forEach((function(e){this.setInert(e,!0)}),i)}}),i);break;case"attributes":if("inert"!==r.attributeName)return;var o=r.target,n=o.hasAttribute("inert");i.setInert(o,n)}}),this)}}]),r}();if(!HTMLElement.prototype.hasOwnProperty("inert")){var a=new n(document);Object.defineProperty(HTMLElement.prototype,"inert",{enumerable:!0,get:function(){return this.hasAttribute("inert")},set:function(e){a.setInert(this,e)}})}}function l(e,t,r){if(e.nodeType==Node.ELEMENT_NODE){var o=e;t&&t(o);var i=o.shadowRoot;if(i)return void l(i,t);if("content"==o.localName){for(var n=o,a=n.getDistributedNodes?n.getDistributedNodes():[],s=0;s<a.length;s++)l(a[s],t);return}if("slot"==o.localName){for(var d=o,c=d.assignedNodes?d.assignedNodes({flatten:!0}):[],u=0;u<c.length;u++)l(c[u],t);return}}for(var p=e.firstChild;null!=p;)l(p,t),p=p.nextSibling}function s(e){if(!e.querySelector("style#inert-style, link#inert-style")){var t=document.createElement("style");t.setAttribute("id","inert-style"),t.textContent="\n[inert] {\n  pointer-events: none;\n  cursor: default;\n}\n\n[inert], [inert] * {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n",e.appendChild(t)}}}();
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
var Vi,qi={CLOSING:"mdc-dialog--closing",OPEN:"mdc-dialog--open",OPENING:"mdc-dialog--opening",SCROLLABLE:"mdc-dialog--scrollable",SCROLL_LOCK:"mdc-dialog-scroll-lock",STACKED:"mdc-dialog--stacked",FULLSCREEN:"mdc-dialog--fullscreen",SCROLL_DIVIDER_HEADER:"mdc-dialog-scroll-divider-header",SCROLL_DIVIDER_FOOTER:"mdc-dialog-scroll-divider-footer",SURFACE_SCRIM_SHOWN:"mdc-dialog__surface-scrim--shown",SURFACE_SCRIM_SHOWING:"mdc-dialog__surface-scrim--showing",SURFACE_SCRIM_HIDING:"mdc-dialog__surface-scrim--hiding",SCRIM_HIDDEN:"mdc-dialog__scrim--hidden"},Zi={ACTION_ATTRIBUTE:"data-mdc-dialog-action",BUTTON_DEFAULT_ATTRIBUTE:"data-mdc-dialog-button-default",BUTTON_SELECTOR:".mdc-dialog__button",CLOSED_EVENT:"MDCDialog:closed",CLOSE_ACTION:"close",CLOSING_EVENT:"MDCDialog:closing",CONTAINER_SELECTOR:".mdc-dialog__container",CONTENT_SELECTOR:".mdc-dialog__content",DESTROY_ACTION:"destroy",INITIAL_FOCUS_ATTRIBUTE:"data-mdc-dialog-initial-focus",OPENED_EVENT:"MDCDialog:opened",OPENING_EVENT:"MDCDialog:opening",SCRIM_SELECTOR:".mdc-dialog__scrim",SUPPRESS_DEFAULT_PRESS_SELECTOR:"textarea, .mdc-menu .mdc-list-item, .mdc-menu .mdc-deprecated-list-item",SURFACE_SELECTOR:".mdc-dialog__surface"},Gi={DIALOG_ANIMATION_CLOSE_TIME_MS:75,DIALOG_ANIMATION_OPEN_TIME_MS:150},Ji=function(){function e(){this.rafIDs=new Map}return e.prototype.request=function(e,t){var r=this;this.cancel(e);var o=requestAnimationFrame((function(o){r.rafIDs.delete(e),t(o)}));this.rafIDs.set(e,o)},e.prototype.cancel=function(e){var t=this.rafIDs.get(e);t&&(cancelAnimationFrame(t),this.rafIDs.delete(e))},e.prototype.cancelAll=function(){var e=this;this.rafIDs.forEach((function(t,r){e.cancel(r)}))},e.prototype.getQueue=function(){var e=[];return this.rafIDs.forEach((function(t,r){e.push(r)})),e},e}();!function(e){e.POLL_SCROLL_POS="poll_scroll_position",e.POLL_LAYOUT_CHANGE="poll_layout_change"}(Vi||(Vi={}));var Qi=function(e){function o(t){var i=e.call(this,r(r({},o.defaultAdapter),t))||this;return i.dialogOpen=!1,i.isFullscreen=!1,i.animationFrame=0,i.animationTimer=0,i.escapeKeyAction=Zi.CLOSE_ACTION,i.scrimClickAction=Zi.CLOSE_ACTION,i.autoStackButtons=!0,i.areButtonsStacked=!1,i.suppressDefaultPressSelector=Zi.SUPPRESS_DEFAULT_PRESS_SELECTOR,i.animFrame=new Ji,i.contentScrollHandler=function(){i.handleScrollEvent()},i.windowResizeHandler=function(){i.layout()},i.windowOrientationChangeHandler=function(){i.layout()},i}return t(o,e),Object.defineProperty(o,"cssClasses",{get:function(){return qi},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return Zi},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return Gi},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addBodyClass:function(){},addClass:function(){},areButtonsStacked:function(){return!1},clickDefaultButton:function(){},eventTargetMatches:function(){return!1},getActionFromEvent:function(){return""},getInitialFocusEl:function(){return null},hasClass:function(){return!1},isContentScrollable:function(){return!1},notifyClosed:function(){},notifyClosing:function(){},notifyOpened:function(){},notifyOpening:function(){},releaseFocus:function(){},removeBodyClass:function(){},removeClass:function(){},reverseButtons:function(){},trapFocus:function(){},registerContentEventHandler:function(){},deregisterContentEventHandler:function(){},isScrollableContentAtTop:function(){return!1},isScrollableContentAtBottom:function(){return!1},registerWindowEventHandler:function(){},deregisterWindowEventHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.hasClass(qi.STACKED)&&this.setAutoStackButtons(!1),this.isFullscreen=this.adapter.hasClass(qi.FULLSCREEN)},o.prototype.destroy=function(){this.animationTimer&&(clearTimeout(this.animationTimer),this.handleAnimationTimerEnd()),this.isFullscreen&&this.adapter.deregisterContentEventHandler("scroll",this.contentScrollHandler),this.animFrame.cancelAll(),this.adapter.deregisterWindowEventHandler("resize",this.windowResizeHandler),this.adapter.deregisterWindowEventHandler("orientationchange",this.windowOrientationChangeHandler)},o.prototype.open=function(e){var t=this;this.dialogOpen=!0,this.adapter.notifyOpening(),this.adapter.addClass(qi.OPENING),this.isFullscreen&&this.adapter.registerContentEventHandler("scroll",this.contentScrollHandler),e&&e.isAboveFullscreenDialog&&this.adapter.addClass(qi.SCRIM_HIDDEN),this.adapter.registerWindowEventHandler("resize",this.windowResizeHandler),this.adapter.registerWindowEventHandler("orientationchange",this.windowOrientationChangeHandler),this.runNextAnimationFrame((function(){t.adapter.addClass(qi.OPEN),t.adapter.addBodyClass(qi.SCROLL_LOCK),t.layout(),t.animationTimer=setTimeout((function(){t.handleAnimationTimerEnd(),t.adapter.trapFocus(t.adapter.getInitialFocusEl()),t.adapter.notifyOpened()}),Gi.DIALOG_ANIMATION_OPEN_TIME_MS)}))},o.prototype.close=function(e){var t=this;void 0===e&&(e=""),this.dialogOpen&&(this.dialogOpen=!1,this.adapter.notifyClosing(e),this.adapter.addClass(qi.CLOSING),this.adapter.removeClass(qi.OPEN),this.adapter.removeBodyClass(qi.SCROLL_LOCK),this.isFullscreen&&this.adapter.deregisterContentEventHandler("scroll",this.contentScrollHandler),this.adapter.deregisterWindowEventHandler("resize",this.windowResizeHandler),this.adapter.deregisterWindowEventHandler("orientationchange",this.windowOrientationChangeHandler),cancelAnimationFrame(this.animationFrame),this.animationFrame=0,clearTimeout(this.animationTimer),this.animationTimer=setTimeout((function(){t.adapter.releaseFocus(),t.handleAnimationTimerEnd(),t.adapter.notifyClosed(e)}),Gi.DIALOG_ANIMATION_CLOSE_TIME_MS))},o.prototype.showSurfaceScrim=function(){var e=this;this.adapter.addClass(qi.SURFACE_SCRIM_SHOWING),this.runNextAnimationFrame((function(){e.adapter.addClass(qi.SURFACE_SCRIM_SHOWN)}))},o.prototype.hideSurfaceScrim=function(){this.adapter.removeClass(qi.SURFACE_SCRIM_SHOWN),this.adapter.addClass(qi.SURFACE_SCRIM_HIDING)},o.prototype.handleSurfaceScrimTransitionEnd=function(){this.adapter.removeClass(qi.SURFACE_SCRIM_HIDING),this.adapter.removeClass(qi.SURFACE_SCRIM_SHOWING)},o.prototype.isOpen=function(){return this.dialogOpen},o.prototype.getEscapeKeyAction=function(){return this.escapeKeyAction},o.prototype.setEscapeKeyAction=function(e){this.escapeKeyAction=e},o.prototype.getScrimClickAction=function(){return this.scrimClickAction},o.prototype.setScrimClickAction=function(e){this.scrimClickAction=e},o.prototype.getAutoStackButtons=function(){return this.autoStackButtons},o.prototype.setAutoStackButtons=function(e){this.autoStackButtons=e},o.prototype.getSuppressDefaultPressSelector=function(){return this.suppressDefaultPressSelector},o.prototype.setSuppressDefaultPressSelector=function(e){this.suppressDefaultPressSelector=e},o.prototype.layout=function(){var e=this;this.animFrame.request(Vi.POLL_LAYOUT_CHANGE,(function(){e.layoutInternal()}))},o.prototype.handleClick=function(e){if(this.adapter.eventTargetMatches(e.target,Zi.SCRIM_SELECTOR)&&""!==this.scrimClickAction)this.close(this.scrimClickAction);else{var t=this.adapter.getActionFromEvent(e);t&&this.close(t)}},o.prototype.handleKeydown=function(e){var t="Enter"===e.key||13===e.keyCode;if(t&&!this.adapter.getActionFromEvent(e)){var r=e.composedPath?e.composedPath()[0]:e.target,o=!this.suppressDefaultPressSelector||!this.adapter.eventTargetMatches(r,this.suppressDefaultPressSelector);t&&o&&this.adapter.clickDefaultButton()}},o.prototype.handleDocumentKeydown=function(e){("Escape"===e.key||27===e.keyCode)&&""!==this.escapeKeyAction&&this.close(this.escapeKeyAction)},o.prototype.handleScrollEvent=function(){var e=this;this.animFrame.request(Vi.POLL_SCROLL_POS,(function(){e.toggleScrollDividerHeader(),e.toggleScrollDividerFooter()}))},o.prototype.layoutInternal=function(){this.autoStackButtons&&this.detectStackedButtons(),this.toggleScrollableClasses()},o.prototype.handleAnimationTimerEnd=function(){this.animationTimer=0,this.adapter.removeClass(qi.OPENING),this.adapter.removeClass(qi.CLOSING)},o.prototype.runNextAnimationFrame=function(e){var t=this;cancelAnimationFrame(this.animationFrame),this.animationFrame=requestAnimationFrame((function(){t.animationFrame=0,clearTimeout(t.animationTimer),t.animationTimer=setTimeout(e,0)}))},o.prototype.detectStackedButtons=function(){this.adapter.removeClass(qi.STACKED);var e=this.adapter.areButtonsStacked();e&&this.adapter.addClass(qi.STACKED),e!==this.areButtonsStacked&&(this.adapter.reverseButtons(),this.areButtonsStacked=e)},o.prototype.toggleScrollableClasses=function(){this.adapter.removeClass(qi.SCROLLABLE),this.adapter.isContentScrollable()&&(this.adapter.addClass(qi.SCROLLABLE),this.isFullscreen&&(this.toggleScrollDividerHeader(),this.toggleScrollDividerFooter()))},o.prototype.toggleScrollDividerHeader=function(){this.adapter.isScrollableContentAtTop()?this.adapter.hasClass(qi.SCROLL_DIVIDER_HEADER)&&this.adapter.removeClass(qi.SCROLL_DIVIDER_HEADER):this.adapter.addClass(qi.SCROLL_DIVIDER_HEADER)},o.prototype.toggleScrollDividerFooter=function(){this.adapter.isScrollableContentAtBottom()?this.adapter.hasClass(qi.SCROLL_DIVIDER_FOOTER)&&this.adapter.removeClass(qi.SCROLL_DIVIDER_FOOTER):this.adapter.addClass(qi.SCROLL_DIVIDER_FOOTER)},o}(tr);
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
 */
function Yi(e){return void 0===e&&(e=window),!!function(e){void 0===e&&(e=window);var t=!1;try{var r={get passive(){return t=!0,!1}},o=function(){};e.document.addEventListener("test",o,r),e.document.removeEventListener("test",o,r)}catch(e){t=!1}return t}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */(e)&&{passive:!0}}const Xi=document.$blockingElements;class $i extends er{constructor(){super(...arguments),this.hideActions=!1,this.stacked=!1,this.heading="",this.scrimClickAction="close",this.escapeKeyAction="close",this.open=!1,this.defaultAction="close",this.actionAttribute="dialogAction",this.initialFocusAttribute="dialogInitialFocus",this.initialSupressDefaultPressSelector="",this.mdcFoundationClass=Qi,this.boundHandleClick=null,this.boundHandleKeydown=null,this.boundHandleDocumentKeydown=null}set suppressDefaultPressSelector(e){this.mdcFoundation?this.mdcFoundation.setSuppressDefaultPressSelector(e):this.initialSupressDefaultPressSelector=e}get suppressDefaultPressSelector(){return this.mdcFoundation?this.mdcFoundation.getSuppressDefaultPressSelector():this.initialSupressDefaultPressSelector}get primaryButton(){let e=this.primarySlot.assignedNodes();e=e.filter((e=>e instanceof HTMLElement));return e[0]||null}emitNotification(e,t){const r=new CustomEvent(e,{detail:t?{action:t}:{}});this.dispatchEvent(r)}getInitialFocusEl(){const e=`[${this.initialFocusAttribute}]`,t=this.querySelector(e);if(t)return t;const r=this.primarySlot.assignedNodes({flatten:!0}),o=this.searchNodeTreesForAttribute(r,this.initialFocusAttribute);if(o)return o;const i=this.secondarySlot.assignedNodes({flatten:!0}),n=this.searchNodeTreesForAttribute(i,this.initialFocusAttribute);if(n)return n;const a=this.contentSlot.assignedNodes({flatten:!0});return this.searchNodeTreesForAttribute(a,this.initialFocusAttribute)}searchNodeTreesForAttribute(e,t){for(const r of e)if(r instanceof HTMLElement){if(r.hasAttribute(t))return r;{const e=r.querySelector(`[${t}]`);if(e)return e}}return null}createAdapter(){return Object.assign(Object.assign({},Jt(this.mdcRoot)),{addBodyClass:()=>document.body.style.overflow="hidden",removeBodyClass:()=>document.body.style.overflow="",areButtonsStacked:()=>this.stacked,clickDefaultButton:()=>{const e=this.primaryButton;e&&e.click()},eventTargetMatches:(e,t)=>!!e&&Gt(e,t),getActionFromEvent:e=>{if(!e.target)return"";const t=
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
function(e,t){if(e.closest)return e.closest(t);for(var r=e;r;){if(Gt(r,t))return r;r=r.parentElement}return null}(e.target,`[${this.actionAttribute}]`);return t&&t.getAttribute(this.actionAttribute)},getInitialFocusEl:()=>this.getInitialFocusEl(),isContentScrollable:()=>{const e=this.contentElement;return!!e&&e.scrollHeight>e.offsetHeight},notifyClosed:e=>this.emitNotification("closed",e),notifyClosing:e=>{this.closingDueToDisconnect||(this.open=!1),this.emitNotification("closing",e)},notifyOpened:()=>this.emitNotification("opened"),notifyOpening:()=>{this.open=!0,this.emitNotification("opening")},reverseButtons:()=>{},releaseFocus:()=>{Xi.remove(this)},trapFocus:e=>{this.isConnected&&(Xi.push(this),e&&e.focus())},registerContentEventHandler:(e,t)=>{this.contentElement.addEventListener(e,t)},deregisterContentEventHandler:(e,t)=>{this.contentElement.removeEventListener(e,t)},isScrollableContentAtTop:()=>{const e=this.contentElement;return!!e&&0===e.scrollTop},isScrollableContentAtBottom:()=>{const e=this.contentElement;return!!e&&Math.ceil(e.scrollHeight-e.scrollTop)===e.clientHeight},registerWindowEventHandler:(e,t)=>{window.addEventListener(e,t,Yi())},deregisterWindowEventHandler:(e,t)=>{window.removeEventListener(e,t,Yi())}})}render(){const e={[qi.STACKED]:this.stacked};let t=W``;this.heading&&(t=this.renderHeading());const r={"mdc-dialog__actions":!this.hideActions};return W`
    <div class="mdc-dialog ${pr(e)}"
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
              class="${pr(r)}">
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
    </div>`}renderHeading(){return W`
      <h2 id="title" class="mdc-dialog__title">${this.heading}</h2>`}firstUpdated(){super.firstUpdated(),this.mdcFoundation.setAutoStackButtons(!0),this.initialSupressDefaultPressSelector?this.suppressDefaultPressSelector=this.initialSupressDefaultPressSelector:this.suppressDefaultPressSelector=[this.suppressDefaultPressSelector,"mwc-textarea, mwc-menu mwc-list-item, mwc-select mwc-list-item"].join(", "),this.boundHandleClick=this.mdcFoundation.handleClick.bind(this.mdcFoundation),this.boundHandleKeydown=this.mdcFoundation.handleKeydown.bind(this.mdcFoundation),this.boundHandleDocumentKeydown=this.mdcFoundation.handleDocumentKeydown.bind(this.mdcFoundation)}connectedCallback(){super.connectedCallback(),this.open&&this.mdcFoundation&&!this.mdcFoundation.isOpen()&&(this.setEventListeners(),this.mdcFoundation.open())}disconnectedCallback(){super.disconnectedCallback(),this.open&&this.mdcFoundation&&(this.removeEventListeners(),this.closingDueToDisconnect=!0,this.mdcFoundation.close(this.currentAction||this.defaultAction),this.closingDueToDisconnect=!1,this.currentAction=void 0,Xi.remove(this))}forceLayout(){this.mdcFoundation.layout()}focus(){const e=this.getInitialFocusEl();e&&e.focus()}blur(){if(!this.shadowRoot)return;const e=this.shadowRoot.activeElement;if(e)e instanceof HTMLElement&&e.blur();else{const e=this.getRootNode(),t=e instanceof Document?e.activeElement:null;t instanceof HTMLElement&&t.blur()}}setEventListeners(){this.boundHandleClick&&this.mdcRoot.addEventListener("click",this.boundHandleClick),this.boundHandleKeydown&&this.mdcRoot.addEventListener("keydown",this.boundHandleKeydown,Yi()),this.boundHandleDocumentKeydown&&document.addEventListener("keydown",this.boundHandleDocumentKeydown,Yi())}removeEventListeners(){this.boundHandleClick&&this.mdcRoot.removeEventListener("click",this.boundHandleClick),this.boundHandleKeydown&&this.mdcRoot.removeEventListener("keydown",this.boundHandleKeydown),this.boundHandleDocumentKeydown&&document.removeEventListener("keydown",this.boundHandleDocumentKeydown)}close(){this.open=!1}show(){this.open=!0}}o([ye(".mdc-dialog")],$i.prototype,"mdcRoot",void 0),o([ye('slot[name="primaryAction"]')],$i.prototype,"primarySlot",void 0),o([ye('slot[name="secondaryAction"]')],$i.prototype,"secondarySlot",void 0),o([ye("#contentSlot")],$i.prototype,"contentSlot",void 0),o([ye(".mdc-dialog__content")],$i.prototype,"contentElement",void 0),o([ye(".mdc-container")],$i.prototype,"conatinerElement",void 0),o([ge({type:Boolean})],$i.prototype,"hideActions",void 0),o([ge({type:Boolean}),Tr((function(){this.forceLayout()}))],$i.prototype,"stacked",void 0),o([ge({type:String})],$i.prototype,"heading",void 0),o([ge({type:String}),Tr((function(e){this.mdcFoundation.setScrimClickAction(e)}))],$i.prototype,"scrimClickAction",void 0),o([ge({type:String}),Tr((function(e){this.mdcFoundation.setEscapeKeyAction(e)}))],$i.prototype,"escapeKeyAction",void 0),o([ge({type:Boolean,reflect:!0}),Tr((function(e){this.mdcFoundation&&this.isConnected&&(e?(this.setEventListeners(),this.mdcFoundation.open()):(this.removeEventListeners(),this.mdcFoundation.close(this.currentAction||this.defaultAction),this.currentAction=void 0))}))],$i.prototype,"open",void 0),o([ge()],$i.prototype,"defaultAction",void 0),o([ge()],$i.prototype,"actionAttribute",void 0),o([ge()],$i.prototype,"initialFocusAttribute",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const en=c`.mdc-dialog .mdc-dialog__surface{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__surface-scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87)}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6)}.mdc-dialog .mdc-dialog__close{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-dialog .mdc-dialog__close .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close .mdc-icon-button__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-dialog .mdc-dialog__close:hover .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close.mdc-ripple-surface--hover .mdc-icon-button__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded--background-focused .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):focus .mdc-icon-button__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded) .mdc-icon-button__ripple::after{transition:opacity 150ms linear}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):active .mdc-icon-button__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions,.mdc-dialog.mdc-dialog--scrollable.mdc-dialog-scroll-divider-footer .mdc-dialog__actions{border-color:rgba(0,0,0,.12)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:1px solid rgba(0,0,0,.12);margin-bottom:0}.mdc-dialog.mdc-dialog-scroll-divider-header.mdc-dialog--fullscreen .mdc-dialog__header{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}.mdc-dialog__surface{box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12)}.mdc-dialog__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit)}.mdc-dialog__content{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-body1-font-size, 1rem);line-height:1.5rem;line-height:var(--mdc-typography-body1-line-height, 1.5rem);font-weight:400;font-weight:var(--mdc-typography-body1-font-weight, 400);letter-spacing:0.03125em;letter-spacing:var(--mdc-typography-body1-letter-spacing, 0.03125em);text-decoration:inherit;text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body1-text-transform, inherit)}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:none}@media(max-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 112px)}}@media(max-width: 720px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:560px}}@media(max-width: 720px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(max-width: 600px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid transparent;border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-dialog__surface::before{border-color:CanvasText}}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{align-items:baseline;border-bottom:1px solid transparent;display:inline-flex;justify-content:space-between;padding:0 24px 9px;z-index:1}@media screen and (forced-colors: active){.mdc-dialog--fullscreen .mdc-dialog__header{border-bottom-color:CanvasText}}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid transparent}@media screen and (forced-colors: active){.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}@media screen and (forced-colors: active){.mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1;z-index:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}.mdc-dialog--no-content-padding .mdc-dialog__content{padding:0}.mdc-dialog--sheet .mdc-dialog__close{right:12px;top:9px;position:absolute;z-index:1}#actions:not(.mdc-dialog__actions){display:none}.mdc-dialog__surface{box-shadow:var(--mdc-dialog-box-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}@media(min-width: 560px){.mdc-dialog .mdc-dialog__surface{max-width:560px;max-width:var(--mdc-dialog-max-width, 560px)}}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0, 0, 0, 0.32);background-color:var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32))}.mdc-dialog .mdc-dialog__title{color:rgba(0, 0, 0, 0.87);color:var(--mdc-dialog-heading-ink-color, rgba(0, 0, 0, 0.87))}.mdc-dialog .mdc-dialog__content{color:rgba(0, 0, 0, 0.6);color:var(--mdc-dialog-content-ink-color, rgba(0, 0, 0, 0.6))}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-dialog-scroll-divider-color, rgba(0, 0, 0, 0.12))}.mdc-dialog .mdc-dialog__surface{min-width:280px;min-width:var(--mdc-dialog-min-width, 280px)}.mdc-dialog .mdc-dialog__surface{max-height:var(--mdc-dialog-max-height, calc(100% - 32px))}#actions ::slotted(*){margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*[dir=rtl]){margin-left:0;margin-right:8px}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*[dir=rtl]){text-align:left}.mdc-dialog--stacked #actions{flex-direction:column-reverse}.mdc-dialog--stacked #actions *:not(:last-child) ::slotted(*){flex-basis:.000000001px;margin-top:12px}`
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let tn=class extends $i{};tn.styles=[en],tn=o([ue("mwc-dialog")],tn);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let rn=class extends de{constructor(){super(...arguments),this._filetype="ts",this._iframeSrcdoc="",this._codeText="",this._propertyValues=new Map([["--playground-code-background",null],...Mi.map((({cssProperty:e})=>[e,null]))])}render(){return W`
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
        ${[...this._propertyValues].map((([e,t])=>W`<span
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
    `}async firstUpdated(){await this._playgroundWithUserText.updateComplete,this._playgroundWithUserText._codemirror.setOption("viewportMargin",1/0)}async _copySample(e){this._filetype=e,await navigator.clipboard.writeText(on[this._filetype])}async _onClickPasteButton(){const{html:e,text:t}=await this._readClipboard();e&&t&&(this._iframeSrcdoc="<style>body{margin:0}</style>"+e,this._codeText=t)}async _readClipboard(){let e="",t="";const r=await navigator.clipboard.read();for(const o of r)for(const r of o.types)if("text/html"===r){const t=await o.getType(r);e=await t.text()}else if("text/plain"===r){const e=await o.getType(r);t=await e.text()}return{html:e,text:t}}_extractStyles(){var e;if(!this._iframeSrcdoc)return;const t=new Map,r=document.createTreeWalker(this._playgroundWithUserText.shadowRoot,NodeFilter.SHOW_TEXT);for(;r.nextNode();){const e=r.currentNode,o=e.parentElement;if(null===o)continue;let i;const n=[...o.classList].filter((e=>e.startsWith("cm-")));if(n.length>0)i=`--playground-code-${n[n.length-1].slice(3)}-color`;else{if("presentation"!==o.getAttribute("role"))continue;i="--playground-code-default-color"}const a=e.textContent.replace(/^<\/?/,"").replace(/>$/,"");let l=t.get(a);l||(l=[],t.set(a,l)),l.push(i)}const o=this._iframeWithUserHtml.contentDocument,i=o.createTreeWalker(o.body,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let n=!1;for(;i.nextNode();){const r=i.currentNode;if(r.nodeType===Node.TEXT_NODE){const o=r.textContent.replace(/^<\/?/,"").replace(/>$/,""),i=null===(e=t.get(o))||void 0===e?void 0:e.shift();if(i&&null===this._propertyValues.get(i)){const e=window.getComputedStyle(r.parentElement).color;this._propertyValues.set(i,e)}}else if(!n&&r.nodeType===Node.ELEMENT_NODE){const e=window.getComputedStyle(r).backgroundColor;"rgba(0, 0, 0, 0)"!==e&&(n=!0,this._propertyValues.set("--playground-code-background",e))}}this.requestUpdate()}_onClickApply(){this.dispatchEvent(new CustomEvent("apply",{detail:{properties:this._propertyValues}}))}_onClickCancel(){this.dispatchEvent(new CustomEvent("cancel"))}};rn.styles=c`
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
  `,o([me()],rn.prototype,"_filetype",void 0),o([me()],rn.prototype,"_iframeSrcdoc",void 0),o([me()],rn.prototype,"_codeText",void 0),o([me()],rn.prototype,"_propertyValues",void 0),o([ye("iframe")],rn.prototype,"_iframeWithUserHtml",void 0),o([ye("playground-code-editor")],rn.prototype,"_playgroundWithUserText",void 0),rn=o([ue("playground-theme-detector")],rn);const on={ts:"// Playground Sample TypeScript file\n/* Another kind of comment */\nlet variable = 1 + 1 === 2 === true;\nconst fn = (param: number) => param;\nfn(3);\n'string1';\n`string2`;\n`string3 ${variable}`\nexport class Class {\n  property: string;\n}\nhtml`\n  \x3c!-- HTML comment --\x3e\n  <!DOCTYPE html>\n  <button attr=\"val\">text</button>\n`;\ncss`\n  /* CSS comment */\n  p, #id, .class, a, :hover {\n    color: red;\n    content: 'c';\n  }\n`;",html:'\x3c!-- Playground sample HTML file --\x3e\n<!DOCTYPE html>\n<button attr="val">text</button>',css:"/* Playground sample CSS file */\np, #id, .class, a, :hover {\n  color: red;\n  content: 'c';\n}"};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let nn=class extends de{constructor(){super(...arguments),this.values=new Wi,this._themeDetectorOpen=!1}connectedCallback(){super.connectedCallback(),this.readUrlParams(new URL(document.location.href).searchParams)}async setValue(e,t){await this.setValues(new Map([[e,t]]))}async setValues(e){const t=e.get("theme");t&&await this._applyTheme(t);for(const[t,r]of e)this.values.setValue(t,r);this.setUrlParams(),this.requestUpdate()}async _applyTheme(e){if(this.values.setValue("theme",e),"default"===e){for(const e of Mi){const t=Pi[e.id];t.originalDefault&&(t.default=t.originalDefault),this.values.setValue(t.id,t.default)}return this.setUrlParams(),void this.requestUpdate()}for(const e of Mi){const t=Pi[e.id];this.values.setValue(t.id,t.default)}this.requestUpdate(),await this.updateComplete;const t=window.getComputedStyle(this._ide);for(const e of Mi){const r=Pi[e.id];if(!r.cssProperty)continue;const o=t.getPropertyValue(r.cssProperty),i=sn(o);this.values.setValue(r.id,i),r.default=i}}readUrlParams(e){const t=new Map;for(const r of Ui){const o=e.get(r);if(null===o)continue;const i=Pi[r];switch(i.type){case"checkbox":t.set(i.id,"y"===o);break;case"color":t.set(i.id,"#"+o);break;case"slider":t.set(i.id,Number(o));break;case"select":t.set(i.id,o);break;default:an(0,"Unexpected knob type "+i.type)}}this.setValues(t)}setUrlParams(){const e=new URLSearchParams;for(const t of Di){const r=this.values.getValue(t.id);if(r!==t.default)switch(t.type){case"checkbox":e.set(t.id,r?"y":"n");break;case"color":e.set(t.id,r.substring(1));break;case"slider":e.set(t.id,r+"");break;case"select":e.set(t.id,r);break;default:an(0,"Unexpected knob type "+t.type)}}history.replaceState(null,"","?"+e.toString())}render(){return W`
      <style>
        ${this.cssText}
      </style>

      <mwc-dialog
        hideActions
        id="detectorDialog"
        .open=${this._themeDetectorOpen}
        @closed=${this._closeThemeDetector}
      >
        ${this._themeDetectorOpen?W`<playground-theme-detector
              @apply=${this._onThemeDetectorApply}
              @cancel=${this._closeThemeDetector}
            ></playground-theme-detector>`:j}
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
            .lineWrapping=${this.values.getValue("lineWrapping")}
            .resizable=${this.values.getValue("resizable")}
            .editableFileSystem=${this.values.getValue("editableFileSystem")}
            .noCompletions=${this.values.getValue("noCompletions")}
            project-src="./project/project.json"
            sandbox-base-url="."
          >
          </playground-ide>

          ${ln}
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
    `}get knobs(){return Bi.map((e=>W`<section>
          <h3 class="sectionLabel">${e}</h3>
          <div class="knobs">
            ${Hi[e].map((e=>this.knob(e)))}
          </div>
        </section>`))}get htmlText(){return`${this.themeImport}\n<playground-ide id="playground"${this.htmlTextAttributes}>\n</playground-ide>\n`}get themeImport(){const e=this.values.getValue("theme");return"default"===e?"":`<import rel="stylesheet"\n        src="/node_modules/playground-elements/themes/${e}.css">\n`}get htmlTextAttributes(){const e=[];for(const t of Ui){const r=Pi[t];if(!r.htmlAttribute)continue;const o=this.values.getValue(t);o!==r.default&&("checkbox"===r.type?o&&e.push("\n  "+r.htmlAttribute):e.push(`\n  ${r.htmlAttribute}="${o}"`))}const t=this.values.getValue("theme");return"default"!==t&&e.push(`\n  class="playground-theme-${t}"`),e.join("")}get cssText(){const e=[];for(const t of Ui){const r=Pi[t];if(!r.cssProperty)continue;const o=this.values.getValue(t);let i=`${r.cssProperty}: ${r.formatCss?r.formatCss(o):o};`;o!==r.default&&(i="  "+i,e.push(i))}return`\n#playground {\n${e.join("\n")}\n}\n    `}knob(e){let t;switch(e.type){case"select":t=this.selectKnob(e);break;case"slider":t=this.sliderKnob(e);break;case"color":t=this.colorKnob(e);break;case"checkbox":t=this.checkboxKnob(e)}if(!t)return j;const r=W`<label for=${e.id}>${e.label}</label>`;if("theme"===e.id){const e=W`<button
        id="openDetectorButton"
        @click=${this._openThemeDetector}
      >
        Import Theme
      </button>`;return[r,t,W`<span></span>`,e]}return[r,t]}selectKnob(e){const t=this.values.getValue(e.id);return W`
      <select
        id=${e.id}
        @input=${t=>{this.setValue(e.id,t.target.value)}}
      >
        ${e.options.map((e=>W`<option value=${e} ?selected=${e===t}>
              ${e}
            </option>`))}
      </select>
    `}sliderKnob(e){const t=this.values.getValue(e.id);return W`
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
    `}colorKnob(e){let t=this.values.getValue(e.id);return W`
      ${"unsetLabel"in e?W`
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
    `}checkboxKnob(e){const t=this.values.getValue(e.id);return W`
      <input
        id=${e.id}
        type="checkbox"
        ?checked=${t}
        @change=${t=>{this.setValue(e.id,t.target.checked)}}
      />
    `}_openThemeDetector(){this._themeDetectorOpen=!0}_closeThemeDetector(){this._themeDetectorOpen=!1}async _onThemeDetectorApply(e){const t=new Map;t.set("theme","default");const r=new Map;for(const[t,o]of e.detail.properties)r.set(t,o?sn(o):void 0);const o=Pi.synDefault,i=r.get(o.cssProperty)||o.default;for(const e of Di)if(e.cssProperty&&r.has(e.cssProperty)){const o=r.get(e.cssProperty)||i;t.set(e.id,o)}this.setValues(t),this._closeThemeDetector()}};function an(e,t){throw Error(t)}nn.styles=[...Li,c`
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
    `],o([me()],nn.prototype,"_themeDetectorOpen",void 0),o([ye("playground-ide")],nn.prototype,"_ide",void 0),nn=o([ue("playground-configurator")],nn);const ln=W`<a
    href="https://github.com/google/playground-elements"
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
  </style>`,sn=e=>{const t=e.match(/^\s*rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/);if(!t)return"";const[,r,o,i]=t,n=e=>Number(e).toString(16).padStart(2,"0");return`#${n(r)}${n(o)}${n(i)}`};export{nn as PlaygroundConfigurator};
