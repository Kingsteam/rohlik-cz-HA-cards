function e(e,t,r,i){var s,n=arguments.length,o=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(n<3?s(o):n>3?s(t,r,o):s(t,r))||o);return n>3&&o&&Object.defineProperty(t,r,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,r=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&s.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,r,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[i+1],e[0]);return new n(r,e,i)},a=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},b=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){const{get:i,set:s}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);s?.call(this,t),this.requestUpdate(e,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...d(e),...u(e)];for(const r of t)this.createProperty(r,e[r])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,r]of t)this.elementProperties.set(e,r)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const r=this._$Eu(e,t);void 0!==r&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(r)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const r of i){const i=document.createElement("style"),s=t.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=r.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(void 0!==i&&!0===r.reflect){const s=(void 0!==r.converter?.toAttribute?r.converter:_).toAttribute(t,r.type);this._$Em=e,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){const r=this.constructor,i=r._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=r.getPropertyOptions(i),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=i;const n=s.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,r,i=!1,s){if(void 0!==e){const n=this.constructor;if(!1===i&&(s=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??b)(s,t)||r.useDefault&&r.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:s},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,r]of e){const{wrapped:e}=r,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,r,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,k=e=>e,A=$.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,z="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,O=`<${C}>`,I=document,R=()=>I.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,T="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,U=/>/g,j=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,L=/"/g,H=/^(?:script|style|textarea|title)$/i,B=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),q=B(1),K=B(2),Z=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,V=I.createTreeWalker(I,129);function Q(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class Y{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let s=0,n=0;const o=e.length-1,a=this.parts,[l,c]=((e,t)=>{const r=e.length-1,i=[];let s,n=2===t?"<svg>":3===t?"<math>":"",o=P;for(let t=0;t<r;t++){const r=e[t];let a,l,c=-1,h=0;for(;h<r.length&&(o.lastIndex=h,l=o.exec(r),null!==l);)h=o.lastIndex,o===P?"!--"===l[1]?o=M:void 0!==l[1]?o=U:void 0!==l[2]?(H.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=s??P,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?L:F):o===L||o===F?o=j:o===M||o===U?o=P:(o=j,s=void 0);const d=o===j&&e[t+1].startsWith("/>")?" ":"";n+=o===P?r+O:c>=0?(i.push(a),r.slice(0,c)+z+r.slice(c)+E+d):r+E+(-2===c?t:d)}return[Q(e,n+(e[r]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]})(e,t);if(this.el=Y.createElement(l,r),V.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=V.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(z)){const t=c[n++],r=i.getAttribute(e).split(E),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:o[2],strings:r,ctor:"."===o[1]?re:"?"===o[1]?ie:"@"===o[1]?se:te}),i.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:s}),i.removeAttribute(e));if(H.test(i.tagName)){const e=i.textContent.split(E),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let r=0;r<t;r++)i.append(e[r],R()),V.nextNode(),a.push({type:2,index:++s});i.append(e[t],R())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf(E,e+1));)a.push({type:7,index:s}),e+=E.length-1}s++}}static createElement(e,t){const r=I.createElement("template");return r.innerHTML=e,r}}function J(e,t,r=e,i){if(t===Z)return t;let s=void 0!==i?r._$Co?.[i]:r._$Cl;const n=N(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,r,i)),void 0!==i?(r._$Co??=[])[i]=s:r._$Cl=s),void 0!==s&&(t=J(e,s._$AS(e,t.values),s,i)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,i=(e?.creationScope??I).importNode(t,!0);V.currentNode=i;let s=V.nextNode(),n=0,o=0,a=r[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new ee(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new ne(s,this,e)),this._$AV.push(t),a=r[++o]}n!==a?.index&&(s=V.nextNode(),n++)}return V.currentNode=I,i}p(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),N(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==Z&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(I.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:r}=e,i="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=Y.createElement(Q(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new X(i,this),r=e.u(this.options);e.p(t),this.T(r),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new Y(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const s of e)i===t.length?t.push(r=new ee(this.O(R()),this.O(R()),this,this.options)):r=t[i],r._$AI(s),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=W}_$AI(e,t=this,r,i){const s=this.strings;let n=!1;if(void 0===s)e=J(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==Z,n&&(this._$AH=e);else{const i=e;let o,a;for(e=s[0],o=0;o<s.length-1;o++)a=J(this,i[r+o],t,o),a===Z&&(a=this._$AH[o]),n||=!N(a)||a!==this._$AH[o],a===W?e=W:e!==W&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!i&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends te{constructor(e,t,r,i,s){super(e,t,r,i,s),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??W)===Z)return;const r=this._$AH,i=e===W&&r!==W||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==W&&(r===W||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe={I:ee},ae=$.litHtmlPolyfillSupport;ae?.(Y,ee),($.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ce=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,r)=>{const i=r?.renderBefore??t;let s=i._$litPart$;if(void 0===s){const e=r?.renderBefore??null;i._$litPart$=s=new ee(t.insertBefore(R(),e),e,void 0,r??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const he=le.litElementPolyfillSupport;he?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de=e=>(t,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:b},pe=(e=ue,t,r)=>{const{kind:i,metadata:s}=r;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),n.set(r.name,e),"accessor"===i){const{name:i}=r;return{set(r){const s=t.get.call(this);t.set.call(this,r),this.requestUpdate(i,s,e,!0,r)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=r;return function(r){const s=this[i];t.call(this,r),this.requestUpdate(i,s,e,!0,r)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(e){return(t,r)=>"object"==typeof r?pe(e,t,r):((e,t,r)=>{const i=t.hasOwnProperty(r);return t.constructor.createProperty(r,e),i?Object.getOwnPropertyDescriptor(t,r):void 0})(e,t,r)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ge(e){return me({...e,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe=1,ve=2,ye=e=>(...t)=>({_$litDirective$:e,values:t});let _e=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const be=ye(class extends _e{constructor(e){if(super(e),e.type!==fe||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const r=e.element.classList;for(const e of this.st)e in t||(r.remove(e),this.st.delete(e));for(const e in t){const i=!!t[e];i===this.st.has(e)||this.nt?.has(e)||(i?(r.add(e),this.st.add(e)):(r.remove(e),this.st.delete(e)))}return Z}}),we="important",xe=" !"+we,$e=ye(class extends _e{constructor(e){if(super(e),e.type!==fe||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,r)=>{const i=e[r];return null==i?t:t+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(e,[t]){const{style:r}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?r.removeProperty(e):r[e]=null);for(const e in t){const i=t[e];if(null!=i){this.ft.add(e);const t="string"==typeof i&&i.endsWith(xe);e.includes("-")||t?r.setProperty(e,t?i.slice(0,-11):i,t?we:""):r[e]=i}}return Z}}),ke="rohlikcz";
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ae(e){const t=new Set;for(const r of Object.values(e.entities??{}))r.platform===ke&&r.device_id&&t.add(r.device_id);const r=[];for(const i of t){const t=e.devices?.[i];t&&r.push(t)}return r}const Se=new Map;function ze(e,t){const r=e.entities??{},i=Se.get(t);if(i&&i.entitiesRef===r)return i.map;const s=new Map;for(const e of Object.values(r))e.platform===ke&&e.device_id===t&&e.translation_key&&s.set(e.translation_key,e.entity_id);return Se.set(t,{entitiesRef:r,map:s}),s}function Ee(e){if(!e||"unknown"===e||"unavailable"===e)return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:t}function Ce(e){return e.locale?.language||e.language||"en"}function Oe(e,t,r="CZK"){const i=Ce(e);if("CZK"===r){return`${new Intl.NumberFormat(i,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)} Kč`}try{return new Intl.NumberFormat(i,{style:"currency",currency:r,currencyDisplay:"narrowSymbol"}).format(t)}catch{return`${new Intl.NumberFormat(i).format(t)} ${r}`}}function Ie(e,t){return new Intl.DateTimeFormat(Ce(e),{hour:"2-digit",minute:"2-digit",hour12:!1}).format(t)}function Re(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function Ne(e,t,r){const i=Ce(e),s=Ie(e,t),n=new Date;if(Re(t,n))return`${r.today} ${s}`;const o=new Date(n);if(o.setDate(n.getDate()+1),Re(t,o))return`${r.tomorrow} ${s}`;return`${new Intl.DateTimeFormat(i,{weekday:"short",day:"numeric",month:"short"}).format(t)} ${s}`}const De={en:{future:["in ",""],past:[""," ago"]},cs:{future:["za ",""],past:["před ",""]},de:{future:["in ",""],past:["vor ",""]}};function Te(e,t){const r=e.slice(0,2).toLowerCase();return(De[r]??De.en)[t]}function Pe(e,t,r){const i=r.replace(/s$/,"");return new Intl.NumberFormat(e,{style:"unit",unit:i,unitDisplay:"short"}).format(t)}function Me(e,t,r){return`${e}${t}${r}`}function Ue(e,t){const r=Ce(e),[i,s]=Te(r,"past"),n=Math.max(0,Math.round((Date.now()-t.getTime())/1e3)),o=Math.round(n/60);if(n<60)return Me(i,Pe(r,n,"seconds"),s);if(o<60)return Me(i,Pe(r,o,"minutes"),s);const a=Math.round(o/60);if(a<24)return Me(i,Pe(r,a,"hours"),s);return Me(i,Pe(r,Math.round(a/24),"days"),s)}const je={cz:{name:"Rohlík.cz",url:"https://www.rohlik.cz",checkoutUrl:"https://www.rohlik.cz/kosik",currency:"CZK"},de:{name:"Knuspr.de",url:"https://www.knuspr.de",checkoutUrl:"https://www.knuspr.de",currency:"EUR"},at:{name:"Gurkerl.at",url:"https://www.gurkerl.at",checkoutUrl:"https://www.gurkerl.at",currency:"EUR"},hu:{name:"Kifli.hu",url:"https://www.kifli.hu",checkoutUrl:"https://www.kifli.hu",currency:"HUF"},ro:{name:"Sezamo.ro",url:"https://www.sezamo.ro",checkoutUrl:"https://www.sezamo.ro",currency:"RON"}},Fe=je.cz;function Le(e){return e.normalize("NFD").replace(/[̀-ͯ]/g,"").trim().toLowerCase()}function He(e,t){const r=t?e?.devices?.[t]:void 0;return function(e){if(!e)return Fe;const t=Le(e);return Object.values(je).find(e=>Le(e.name)===t)??Fe}(r?.manufacturer)}function Be(e,t,r,i){const s=Ce(e).slice(0,2).toLowerCase(),n=t[s]?.[r]??t.en?.[r]??r;return i?n.replace(/\{(\w+)(?::([^{}]+))?\}/g,(e,t,r)=>Object.prototype.hasOwnProperty.call(i,t)?void 0===r?String(i[t]):function(e,t,r){if(t.length<2||Number.isNaN(r))return t[t.length-1]??"";const i=new Intl.PluralRules(e).select(r);return 2===t.length?"one"===i?t[0]:t[1]:"one"===i?t[0]:"few"===i?t[1]:t[t.length-1]}(s,r.split("|"),Number(i[t])):e):n}const qe={cs:{today:"Dnes",tomorrow:"Zítra",updated_ago:"Aktualizováno {time}",refresh:"Obnovit",unavailable:"Nedostupné",error_generic:"Něco se nepovedlo",show_all:"Zobrazit vše ({count})",show_less:"Zobrazit méně",items:"položek",items_count:"{count} {count:položka|položky|položek}",free:"zdarma"},en:{today:"Today",tomorrow:"Tomorrow",updated_ago:"Updated {time}",refresh:"Refresh",unavailable:"Unavailable",error_generic:"Something went wrong",show_all:"Show all ({count})",show_less:"Show less",items:"items",items_count:"{count} {count:item|items}",free:"free"},de:{today:"Heute",tomorrow:"Morgen",updated_ago:"Aktualisiert {time}",refresh:"Aktualisieren",unavailable:"Nicht verfügbar",error_generic:"Etwas ist schiefgelaufen",show_all:"Alle anzeigen ({count})",show_less:"Weniger anzeigen",items:"Artikel",items_count:"{count} {count:Artikel|Artikel}",free:"kostenlos"}},Ke=["cs","en","de"];function Ze(e,t){return t&&Ke.includes(t)?Ce(e).slice(0,2).toLowerCase()===t?e:{...e,language:t,locale:{...e.locale??{},language:t}}:e}const We=o`
  :host {
    --rohlik-accent: var(--primary-color);
    display: block;
    /* Lets cards adapt to their own width with @container queries. */
    container-type: inline-size;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    /* Deliberately NOT a scroll container. On touch, a scrollable card eats
       the swipe before the dashboard view gets it, so the page stops
       scrolling. Cards size themselves through getGridOptions() instead. */
  }

  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--primary-text-color);
    margin-bottom: 8px;
  }

  .header ha-icon,
  .header ha-svg-icon {
    color: var(--rohlik-accent);
    --mdc-icon-size: 24px;
  }

  .header .title {
    flex: 1 1 auto;
    min-width: 4em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.6;
    white-space: nowrap;
  }

  .chip.ok {
    color: var(--success-color, #4caf50);
    background: color-mix(in srgb, var(--success-color, #4caf50) 15%, transparent);
  }

  .chip.warn {
    color: var(--warning-color, #ff9800);
    background: color-mix(in srgb, var(--warning-color, #ff9800) 15%, transparent);
  }

  .chip.err {
    color: var(--error-color, #db4437);
    background: color-mix(in srgb, var(--error-color, #db4437) 15%, transparent);
  }

  .chip.neutral {
    color: var(--secondary-text-color);
    background: color-mix(in srgb, var(--secondary-text-color) 15%, transparent);
  }

  .big {
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-text-color);
    line-height: 1.2;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--divider-color);
  }

  .row:last-child {
    border-bottom: none;
  }

  /* Product picture (cart lines, search results, delivery items). Product
     shots are cut out on white, so a white tile keeps them readable in the
     dark theme too. */
  .thumb {
    flex: none;
    width: var(--rohlik-thumb-size, 40px);
    height: var(--rohlik-thumb-size, 40px);
    border-radius: 6px;
    object-fit: contain;
    background: #fff;
  }

  .thumb.placeholder {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 6px 14px;
    border-radius: var(--ha-card-border-radius, 12px);
    border: none;
    background: var(--rohlik-accent);
    color: var(--text-primary-color, #fff);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .btn.ghost {
    background: transparent;
    color: var(--rohlik-accent);
    border: 1px solid var(--rohlik-accent);
  }

  .footer {
    /* Sticks to the bottom of the card when the grid gives it extra height. */
    margin-top: auto;
    padding-top: 8px;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .footer.stale {
    color: var(--warning-color, #ff9800);
  }

  .error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    color: var(--error-color, #db4437);
    background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
    font-size: 0.85rem;
  }
`;class Ge extends ce{constructor(){super(...arguments),this.entities=new Map}get hass(){return this._localeHass??this._hass}set hass(e){const t=this.hass;this._hass=e,this._localeHass=this.applyLanguage(e),this.requestUpdate("hass",t)}get rawHass(){return this._hass}applyLanguage(e){if(!e||!this.config?.language||"auto"===this.config.language)return;const t=Ze(e,this.config.language);return t===e?void 0:t}setConfig(e){if(!e?.device)throw new Error("Rohlík card: 'device' is required — pick the Rohlík.cz device in the card editor.");this.config=e,this._localeHass=this.applyLanguage(this._hass),this.hass&&(this.entities=ze(this.hass,this.config.device))}willUpdate(e){e.has("hass")&&this.hass&&this.config&&(this.entities=ze(this.hass,this.config.device))}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:4,min_columns:6,min_rows:2}}static getStubConfig(e){const t=Ae(e);return{device:t[0]?.id??""}}entityId(e){return this.entities.get(e)}state(e){const t=this.entityId(e);return t?this.hass?.states?.[t]:void 0}attr(e,t){return this.state(e)?.attributes?.[t]}isOn(e){return"on"===this.state(e)?.state}deviceName(){if(this.config?.name)return this.config.name;const e=this.hass?.devices?.[this.config?.device];return e?.name_by_user||e?.name||"Rohlík.cz"}shop(){return He(this.hass,this.config?.device)}money(e){return Oe(this.hass,e,this.shop().currency)}get accentStyle(){return this.config?.accent?{"--rohlik-accent":this.config.accent}:{}}t(e,t){return Be(this.hass,{...qe,...this.mergedStrings()},e,t)}mergedStrings(){const e={};for(const t of new Set([...Object.keys(qe),...Object.keys(this.strings)]))e[t]={...qe[t],...this.strings[t]};return e}renderFreshness(e="updated"){const t=Ee(this.state(e)?.state);if(!t)return W;const r=Date.now()-t.getTime()>12e5;return q`
      <div class="footer ${r?"stale":""}">
        ${this.t("updated_ago",{time:Ue(this.hass,t)})}
      </div>
    `}renderError(e){return q`<div class="error">${e}</div>`}}Ge.styles=We,e([me({attribute:!1})],Ge.prototype,"hass",null),e([ge()],Ge.prototype,"config",void 0),e([ge()],Ge.prototype,"entities",void 0);let Ve=!1;function Qe(){Ve||(Ve=!0,console.info("%c ROHLIK-CARDS %c v0.2.0 ","color: white; background: #d4145a; font-weight: 700;","color: #d4145a; background: white; font-weight: 700;"))}function Ye(e){Qe(),window.customCards=window.customCards??[],window.customCards.push({preview:!0,...e})}const Je=new Map;function Xe(e,t){const r=Je.get(t);if(r)return r;const i=e.callWS({type:"config/entity_registry/get",entity_id:t}).then(e=>e.config_entry_id).catch(e=>{throw Je.delete(t),e});return Je.set(t,i),i}async function et(e,t,r,i,s=!1){const n=await e.callService("rohlikcz",r,{config_entry_id:t,...i},void 0,!0,s);return s?n.response:void 0}function tt(e,t,r){const i=new CustomEvent(t,{detail:r,bubbles:!0,composed:!0});e.dispatchEvent(i)}function rt(e,t){tt(e,"hass-more-info",{entityId:t})}function it(e){return e.toString().padStart(2,"0")}function st(e){return`${it(e.getHours())}:${it(e.getMinutes())}`}function nt(e,t){const r=function(e,t){if(e.isOrdered)return e.since&&t.getTime()>=e.since.getTime()?"arriving":"ordered";const r=e.recentDelivery;if(r){const e=r.till??r.endedAt,i=Math.max(e.getTime(),r.endedAt.getTime());if(t.getTime()-i<=216e5)return"delivered"}return"none"}(e,t);let i=null;e.since&&e.till&&(i=`${st(e.since)}–${st(e.till)}`);let s=null;if("arriving"===r&&e.since&&e.till&&e.till.getTime()>e.since.getTime()){s=function(e){return Math.min(1,Math.max(0,e))}(((e.eta??t).getTime()-e.since.getTime())/(e.till.getTime()-e.since.getTime()))}const n="delivered"===r?e.lastOrderItems??null:e.orderData?.itemsCount??null,o="delivered"===r?e.lastOrderPrice??null:e.orderData?.priceComposition?.total?.amount??null,a=e.recentDelivery?e.recentDelivery.till??e.recentDelivery.endedAt:null,l=(e.slots??[]).filter(e=>null!=e.start).map(e=>({key:e.key,start:e.start,price:e.price??null}));return{state:r,since:e.since,till:e.till,eta:e.eta,progress:s,windowLabel:i,orderId:e.orderData?.id??null,summaryItems:n,summaryPrice:o,announcementText:e.announcementText??null,announcementExtra:e.announcementExtra??null,announcementUpdatedAt:e.announcementUpdatedAt??null,lastOrderAt:e.lastOrderAt??null,firstDeliveryText:e.firstDeliveryText??null,isReserved:e.isReserved,isExpressAvailable:e.isExpressAvailable,deliveredAt:a,slots:l}}const ot=/till|until|expir|end/i,at=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/;const lt=216e5;function ct(e){return`rohlik-delivery-last:${e}`}function ht(e,t){let r;try{r=e.getItem(ct(t))}catch{return null}if(!r)return null;try{const e=JSON.parse(r);return e&&"object"==typeof e?{orderId:e.orderId??null,till:"string"==typeof e.till?e.till:null,seenAt:"string"==typeof e.seenAt?e.seenAt:null,endedAt:"string"==typeof e.endedAt?e.endedAt:null}:null}catch{return null}}function dt(e,t,r){try{e.setItem(ct(t),JSON.stringify(r))}catch{}}function ut(e){if(!e.endedAt)return null;const t=new Date(e.endedAt);if(Number.isNaN(t.getTime()))return null;const r=e.till?new Date(e.till):null;return{orderId:e.orderId,till:r&&!Number.isNaN(r.getTime())?r:null,endedAt:t}}function pt(e,t,r,i=new Date){dt(e,t,{orderId:r.orderId,till:r.till?r.till.toISOString():null,seenAt:i.toISOString(),endedAt:null})}function mt(e,t){const r=ht(e,t);return r?ut(r):null}function gt(e,t,r){const i=ht(e,t);if(!i)return null;if(i.endedAt)return ut(i);if(function(e,t){const r=e.seenAt?new Date(e.seenAt):null;if(!r||Number.isNaN(r.getTime()))return!0;if(t.getTime()-r.getTime()>lt)return!0;const i=e.till?new Date(e.till):null;return!!(i&&!Number.isNaN(i.getTime())&&t.getTime()-i.getTime()>lt)}(i,r))return ft(e,t),null;const s={...i,endedAt:r.toISOString()};return dt(e,t,s),ut(s)}function ft(e,t){try{e.removeItem(ct(t))}catch{}}function vt(){try{if("undefined"!=typeof window&&window.localStorage)return window.localStorage}catch{}return{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}}const yt=o`
  .header {
    cursor: pointer;
  }

  .header.static {
    cursor: default;
  }

  .header:focus-visible,
  .compact-row:focus-visible {
    outline: 2px solid var(--rohlik-accent, var(--primary-color));
    outline-offset: 2px;
  }

  /* The title keeps a floor and the chips shrink (wrapping) first, so three
     chips can never squeeze the title to zero width in a mid-width card. */
  .header .title {
    flex: 1 1 auto;
    min-width: 5em;
  }

  .chips {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    flex: 0 1 auto;
    min-width: 0;
    flex-wrap: wrap;
  }

  .headline {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin: 4px 0 2px;
  }

  .caption {
    display: block;
    color: var(--secondary-text-color);
    font-size: 13px;
    margin: 0 0 4px;
  }

  .sub {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    margin-bottom: 4px;
  }

  .track-wrap {
    margin: 16px 0 6px;
  }

  .track {
    position: relative;
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color);
    overflow: visible;
  }

  .track-fill {
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    border-radius: 3px;
    background: var(--rohlik-accent, var(--primary-color));
  }

  .track-marker {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--rohlik-accent, var(--primary-color));
    border: 2px solid var(--card-background-color, #fff);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 1px var(--rohlik-accent, var(--primary-color));
  }

  .ticks {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    color: var(--secondary-text-color);
    font-size: 0.7rem;
  }

  .announce {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .announce .text {
    color: var(--primary-text-color);
  }

  .announce .meta {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  /* Flexbox won't let a flex child's text wrap unless it can shrink below
     its content width — the announcement row is inside .row (a flex
     container from core/styles.ts), so give it a floor of 0 explicitly. */
  .row .announce {
    min-width: 0;
    flex: 1;
  }

  .reserved-line {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    margin-bottom: 4px;
  }

  .slots {
    display: flex;
    flex-direction: column;
    margin: 4px 0;
  }

  .slot-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid var(--divider-color);
    font-size: 0.85rem;
  }

  .slot-row:last-child {
    border-bottom: none;
  }

  .slot-row ha-icon {
    color: var(--rohlik-accent, var(--primary-color));
    --mdc-icon-size: 18px;
    flex-shrink: 0;
  }

  .slot-label {
    flex: 1;
    min-width: 0;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .slot-day {
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .slot-price {
    font-weight: 500;
    color: var(--primary-text-color);
    min-width: 60px;
    text-align: right;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .actions a.btn {
    text-decoration: none;
  }

  ha-icon.spin {
    animation: rohlik-spin 1s linear infinite;
  }

  @keyframes rohlik-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .compact-row {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  .compact-row ha-icon {
    color: var(--rohlik-accent, var(--primary-color));
    --mdc-icon-size: 24px;
    flex-shrink: 0;
  }

  .compact-row .headline {
    flex: 1;
    margin: 0;
    overflow: hidden;
  }

  .compact-row .big {
    font-size: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* :host sets container-type: inline-size (core/styles.ts) — this queries
     the card's own rendered width, not the viewport, so it also kicks in
     for a narrow column in a dashboard grid, not just a phone screen. */
  .items {
    --rohlik-thumb-size: 36px;
    margin-top: 4px;
  }

  .item-row {
    padding: 6px 0;
  }

  .item-qty {
    flex: none;
    min-width: 2.2em;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
  }

  .item-name {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-amount {
    flex: none;
    color: var(--secondary-text-color);
    font-size: 0.85rem;
  }

  .show-toggle {
    display: block;
    margin: 8px auto 0;
  }

  @container (max-width: 520px) {
    .header {
      flex-wrap: wrap;
      row-gap: 6px;
    }

    .header .chips {
      /* Forces a wrap point right before the chips, so they always land on
         their own line under the title instead of just shrinking it. */
      flex-basis: 100%;
    }

    .big {
      font-size: 26px;
    }

    .track-wrap {
      overflow: hidden;
    }

    .announce .text {
      overflow-wrap: break-word;
      word-break: break-word;
    }

    .slot-label {
      white-space: normal;
    }

    .actions {
      flex-direction: column;
      align-items: stretch;
    }

    .actions .btn {
      width: 100%;
    }
  }
`,_t={cs:{title:"Příští rozvoz",chip_arriving:"Na cestě",chip_ordered:"Objednáno",chip_delivered:"Doručeno",chip_none:"Bez objednávky",chip_express:"Expres k dispozici",chip_reserved:"Rezervovaný termín",estimated:"odhad",by:"do",delivered_caption:"doručeno",nearest_slot:"Nejbližší termín",window:"Okno",order:"objednávka",announcement_updated:"Aktualizováno {time}",refresh_failed:"Obnovení se nezdařilo",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",reserved_until:"Rezervováno do {time}",shop_link:"Objednat znovu na {shop}",slot_express:"Expres",slot_standard:"Standard",slot_eco:"Eko"},en:{title:"Next delivery",chip_arriving:"Arriving",chip_ordered:"Ordered",chip_delivered:"Delivered",chip_none:"No order",chip_express:"Express available",chip_reserved:"Slot reserved",estimated:"estimated",by:"by",delivered_caption:"delivered",nearest_slot:"nearest slot",window:"Window",order:"order",announcement_updated:"Updated {time}",refresh_failed:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device",reserved_until:"Reserved until {time}",shop_link:"Order again on {shop}",slot_express:"Express",slot_standard:"Standard",slot_eco:"Eco"},de:{title:"Nächste Lieferung",chip_arriving:"Unterwegs",chip_ordered:"Bestellt",chip_delivered:"Geliefert",chip_none:"Keine Bestellung",chip_express:"Express verfügbar",chip_reserved:"Termin reserviert",estimated:"voraussichtlich",by:"bis",delivered_caption:"geliefert",nearest_slot:"nächster Termin",window:"Zeitfenster",order:"Bestellung",announcement_updated:"Aktualisiert {time}",refresh_failed:"Aktualisieren fehlgeschlagen",no_entities:"Auf diesem Gerät wurden keine Rohlík-Entitäten gefunden",reserved_until:"Reserviert bis {time}",shop_link:"Wieder bei {shop} bestellen",slot_express:"Express",slot_standard:"Standard",slot_eco:"Öko"}},bt={cs:{device:"Zařízení",name:"Vlastní název",show_announcement:"Zobrazit oznámení kurýra",show_order_summary:"Zobrazit shrnutí objednávky",show_express_chip:"Zobrazit chip Expres",show_refresh:"Zobrazit tlačítko Obnovit",show_slots:"Zobrazit termíny",show_shop_link:"Odkaz na obchod",compact:"Kompaktní zobrazení",show_items:"Zobrazit položky objednávky"},en:{device:"Device",name:"Custom name",show_announcement:"Show courier announcement",show_order_summary:"Show order summary",show_express_chip:"Show express chip",show_refresh:"Show refresh button",show_slots:"Show upcoming slots",show_shop_link:"Show shop link",compact:"Compact layout",show_items:"Show the order's items"},de:{device:"Gerät",name:"Eigener Name",show_announcement:"Meldung des Boten anzeigen",show_order_summary:"Zusammenfassung der Bestellung anzeigen",show_express_chip:"Hinweis „Express“ anzeigen",show_refresh:"Taste „Aktualisieren“ anzeigen",show_slots:"Liefertermine anzeigen",show_shop_link:"Link zum Shop anzeigen",show_items:"Artikel der Bestellung anzeigen",compact:"Kompakte Ansicht"}},wt=[{name:"device",required:!0,selector:{device:{integration:"rohlikcz"}}},{name:"name",selector:{text:{}}},{name:"language",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (Home Assistant)"},{value:"cs",label:"Čeština"},{value:"en",label:"English"},{value:"de",label:"Deutsch"}]}}}],xt={cs:{device:"Zařízení (účet Rohlík.cz)",name:"Vlastní název",language:"Jazyk karty"},en:{device:"Device (Rohlík.cz account)",name:"Custom name",language:"Card language"},de:{device:"Gerät (Rohlík-Konto)",name:"Eigener Name",language:"Sprache der Karte"}};class $t extends ce{constructor(){super(...arguments),this.defaults={},this.computeLabel=e=>{const t={};for(const e of new Set([...Object.keys(xt),...Object.keys(this.labels)]))t[e]={...xt[e],...this.labels[e]};return Be(this.hass,t,e.name)||e.name},this.onValueChanged=e=>{e.stopPropagation();const t={...this.config,...e.detail.value};"auto"!==t.language&&""!==t.language||delete t.language;for(const[e,r]of Object.entries(this.defaults))e in t&&t[e]===r&&delete t[e];tt(this,"config-changed",{config:t})}}setConfig(e){this.config=e}get schema(){return[...wt,...this.extraSchema()]}get formData(){return{language:"auto",...this.defaults,...this.config}}render(){return this.hass&&this.config?q`
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    `:W}}e([ge()],$t.prototype,"hass",void 0),e([ge()],$t.prototype,"config",void 0);let kt=class extends $t{constructor(){super(...arguments),this.labels=bt,this.defaults={show_announcement:!0,show_order_summary:!0,show_express_chip:!0,show_refresh:!0,show_slots:!0,show_shop_link:!0,show_items:!0,compact:!1}}extraSchema(){return[{name:"show_announcement",selector:{boolean:{}}},{name:"show_order_summary",selector:{boolean:{}}},{name:"show_express_chip",selector:{boolean:{}}},{name:"show_refresh",selector:{boolean:{}}},{name:"show_slots",selector:{boolean:{}}},{name:"show_shop_link",selector:{boolean:{}}},{name:"show_items",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}}]}};kt=e([de("rohlik-delivery-card-editor")],kt);const At={arriving:"ok",ordered:"neutral",delivered:"ok",none:"neutral"},St=["express","standard","eco"],zt={express:"mdi:lightning-bolt",standard:"mdi:truck-delivery",eco:"mdi:leaf"};let Et=class extends Ge{constructor(){super(...arguments),this.strings=_t,this.refreshing=!1,this.refreshError=null,this.itemsExpanded=!1,this.onHeaderTap=()=>{if(this.tapDisabled)return;const e=this.entityId("is_ordered");e&&rt(this,e)},this.onHeaderKeydown=e=>{this.tapDisabled||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.onHeaderTap())},this.onRefresh=async e=>{if(e.stopPropagation(),this.refreshing)return;const t=this.entityId("is_ordered");if(t){this.refreshing=!0,this.refreshError=null;try{const e=await Xe(this.hass,t);if(!e)throw new Error("no config entry");const r=this.getView(),i="arriving"===r.state||"ordered"===r.state?"update_delivery_times":"refresh_slots";await et(this.hass,e,i)}catch{this.refreshError=this.t("refresh_failed")}finally{this.refreshing=!1}}}}static getConfigElement(){return document.createElement("rohlik-delivery-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-delivery-card"}}connectedCallback(){super.connectedCallback(),this.tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this.tickTimer&&(clearInterval(this.tickTimer),this.tickTimer=void 0)}getCardSize(){return this.config?.compact?2:4}getGridOptions(){return this.config?.compact?{columns:6,rows:2,min_columns:6,min_rows:2}:{columns:12,rows:6,min_columns:6,min_rows:3}}textState(e){const t=this.state(e)?.state;return t&&"unknown"!==t&&"unavailable"!==t?t:null}syncMemory(e){const t=this.config?.device;if(!t)return null;const r=vt(),i=this.state("is_ordered")?.state;if("on"!==i&&"off"!==i)return mt(r,t);if(this.isOn("is_ordered")){const i=e?.id??null,s=mt(r,t);return s&&null!=i&&s.orderId!==i&&ft(r,t),pt(r,t,{orderId:i,till:Ee(this.state("next_order_till")?.state)}),null}return gt(r,t,new Date)}buildInput(){const e=this.attr("is_ordered","order_data")??null;return{isOrdered:this.isOn("is_ordered"),since:Ee(this.state("next_order_since")?.state),till:Ee(this.state("next_order_till")?.state),eta:Ee(this.state("delivery_time")?.state),orderData:e,announcementText:this.textState("delivery_info"),announcementExtra:this.attr("delivery_info","Additional Content")??null,announcementUpdatedAt:Ee(this.attr("delivery_info","Updated At")),lastOrderAt:Ee(this.state("last_order")?.state),lastOrderItems:this.attr("last_order","Items")??null,lastOrderPrice:this.attr("last_order","Price")??null,firstDeliveryText:this.textState("first_delivery"),isReserved:this.isOn("is_reserved"),isExpressAvailable:this.isOn("is_express_available"),recentDelivery:this.syncMemory(e),slots:St.map(e=>({key:e,start:Ee(this.state(`${e}_slot`)?.state),price:this.attr(`${e}_slot`,"Price")??null}))}}getView(){return nt(this.buildInput(),new Date)}get tapDisabled(){const e=this.config?.tap_action;return"none"===e||!(!e||"object"!=typeof e||"none"!==e.action)}render(){if(!this.config)return W;if(!this.entityId("is_ordered"))return q`
        <ha-card style=${$e(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const e=this.getView();return q`
      <ha-card style=${$e(this.accentStyle)}>
        ${this.config.compact?this.renderCompact(e):this.renderFull(e)}
      </ha-card>
    `}renderChips(e){const t=!1!==this.config.show_express_chip&&e.isExpressAvailable,r="none"===e.state&&e.isReserved;return q`
      <div class="chips">
        <span class="chip ${At[e.state]}">${this.t(`chip_${e.state}`)}</span>
        ${t?q`<span class="chip warn">${this.t("chip_express")}</span>`:W}
        ${r?q`<span class="chip neutral">${this.t("chip_reserved")}</span>`:W}
      </div>
    `}renderCompact(e){return q`
      <div
        class="compact-row"
        @click=${this.onHeaderTap}
        @keydown=${this.onHeaderKeydown}
        role=${this.tapDisabled?W:"button"}
        tabindex=${this.tapDisabled?W:"0"}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <div class="headline">
          <span class="big">${this.headlineMain(e)}</span>
        </div>
        <span class="chip ${At[e.state]}">${this.t(`chip_${e.state}`)}</span>
      </div>
    `}renderFull(e){const t=!1!==this.config.show_announcement&&("arriving"===e.state||"ordered"===e.state)&&!!e.announcementText,r=!1!==this.config.show_order_summary&&null!=e.summaryItems,i=!1!==this.config.show_refresh,s=!("arriving"!==e.state&&"ordered"!==e.state||!e.since||!e.till),n=!1!==this.config.show_slots&&"none"===e.state&&e.slots.length>0,o=!1!==this.config.show_shop_link&&"delivered"===e.state,a=!1===this.config.show_items||"arriving"!==e.state&&"ordered"!==e.state?[]:function(e){if(!Array.isArray(e))return[];const t=[];for(const r of e){if(!r||"object"!=typeof r)continue;const e=r,i="string"==typeof e.name?e.name.trim():"";if(!i)continue;const s=Number(e.quantity),n={name:i,quantity:Number.isFinite(s)&&s>0?s:1};"string"==typeof e.textual_amount&&e.textual_amount.trim()&&(n.amount=e.textual_amount.trim()),"string"==typeof e.image&&/^https?:\/\//i.test(e.image)&&(n.image=e.image),t.push(n)}return t}(this.attr("is_ordered","items")),l=this.shop(),c="none"===e.state&&e.isReserved?function(e){if(!e)return null;for(const[t,r]of Object.entries(e)){if(!ot.test(t))continue;if("string"!=typeof r||!at.test(r))continue;const e=new Date(r);if(!Number.isNaN(e.getTime()))return e}return null}(this.state("is_reserved")?.attributes):null,h=this.headlineCaption(e);return q`
      <div
        class=${be({header:!0,static:this.tapDisabled})}
        @click=${this.onHeaderTap}
        @keydown=${this.onHeaderKeydown}
        role=${this.tapDisabled?W:"button"}
        tabindex=${this.tapDisabled?W:"0"}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <span class="title">${this.config.name||this.t("title")}</span>
        ${this.renderChips(e)}
      </div>

      <div class="headline">
        <span class="big">${this.headlineMain(e)}</span>
      </div>
      ${h?q`<div class="caption">${h}</div>`:W}

      ${s?q`<div class="sub">${this.renderSub(e)}</div>`:W}
      ${"arriving"===e.state?this.renderTrack(e):W}
      ${c?q`<div class="reserved-line">${this.t("reserved_until",{time:Ie(this.hass,c)})}</div>`:W}
      ${n?this.renderSlots(e):W}
      ${t?q`<div class="row">${this.renderAnnouncement(e)}</div>`:W}
      ${r?q`<div class="row">${this.renderSummary(e)}</div>`:W}
      ${a.length?this.renderItems(a):W}
      ${this.refreshError?q`<div class="error">${this.refreshError}</div>`:W}
      ${i||o?q`
            <div class="actions">
              ${o?q`
                    <a class="btn ghost" href=${l.url} target="_blank" rel="noopener">
                      ${this.t("shop_link",{shop:l.name})}
                    </a>
                  `:W}
              ${i?q`
                    <button class="btn ghost" ?disabled=${this.refreshing} @click=${this.onRefresh}>
                      <ha-icon
                        icon="mdi:refresh"
                        class=${be({spin:this.refreshing})}
                      ></ha-icon>
                      ${this.t("refresh")}
                    </button>
                  `:W}
            </div>
          `:W}
      ${this.renderFreshness()}
    `}renderItems(e){const t=this.itemsExpanded?e:e.slice(0,5);return q`
      <div class="items">
        ${t.map(e=>q`
            <div class="row item-row">
              ${e.image?q`<img class="thumb" src=${e.image} alt="" loading="lazy" referrerpolicy="no-referrer" />`:q`<div class="thumb placeholder" aria-hidden="true"></div>`}
              <span class="item-qty">${e.quantity}×</span>
              <span class="item-name">${e.name}</span>
              ${e.amount?q`<span class="item-amount">${e.amount}</span>`:W}
            </div>
          `)}
      </div>
      ${e.length>5?q`
            <button class="btn ghost show-toggle" @click=${()=>this.itemsExpanded=!this.itemsExpanded}>
              ${this.itemsExpanded?this.t("show_less"):this.t("show_all",{count:e.length})}
            </button>
          `:W}
    `}renderSlots(e){return q`<div class="slots">${e.slots.map(e=>this.renderSlotRow(e))}</div>`}renderSlotRow(e){const t=Ne(this.hass,e.start,{today:this.t("today"),tomorrow:this.t("tomorrow")}),r=0===e.price?this.t("free"):null!=e.price?this.money(e.price):"";return q`
      <div class="slot-row">
        <ha-icon icon=${zt[e.key]}></ha-icon>
        <span class="slot-label">${this.t(`slot_${e.key}`)}</span>
        <span class="slot-day">${t}</span>
        <span class="slot-price">${r}</span>
      </div>
    `}headlineMain(e){switch(e.state){case"arriving":return e.eta?Ie(this.hass,e.eta):e.till?Ie(this.hass,e.till):"—";case"ordered":return e.since?Ne(this.hass,e.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}):"—";case"delivered":return e.deliveredAt?Ie(this.hass,e.deliveredAt):"—";default:return e.firstDeliveryText??"—"}}headlineCaption(e){switch(e.state){case"arriving":return this.t(e.eta?"estimated":"by");case"ordered":return e.since?function(e,t){const r=Ce(e),[i,s]=Te(r,"future"),n=Math.max(0,Math.round((t.getTime()-Date.now())/1e3)),o=Math.round(n/60);if(n<60)return Me(i,Pe(r,n,"seconds"),s);if(o<60)return Me(i,Pe(r,o,"minutes"),s);const a=Math.floor(o/60),l=o%60;if(a<24){const e=Pe(r,a,"hours");return Me(i,0===l?e:`${e} ${Pe(r,l,"minutes")}`,s)}return Me(i,Pe(r,Math.round(o/60/24),"days"),s)}(this.hass,e.since):"";case"delivered":return this.t("delivered_caption");default:return this.t("nearest_slot")}}renderSub(e){if(!e.since||!e.till)return W;const t=Ne(this.hass,e.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}),r=[`${this.t("window")} ${t} – ${Ie(this.hass,e.till)}`];return null!=e.orderId&&r.push(`${this.t("order")} ${e.orderId}`),q`${r.join(" · ")}`}renderTrack(e){if(!e.since||!e.till||null==e.progress)return W;const t=new Date((e.since.getTime()+e.till.getTime())/2);return q`
      <div class="track-wrap">
        <div class="track">
          <div class="track-fill" style=${$e({width:100*e.progress+"%"})}></div>
          <div class="track-marker" style=${$e({left:100*e.progress+"%"})}></div>
        </div>
        <div class="ticks">
          <span>${Ie(this.hass,e.since)}</span>
          <span>${Ie(this.hass,t)}</span>
          <span>${Ie(this.hass,e.till)}</span>
        </div>
      </div>
    `}renderAnnouncement(e){return q`
      <div class="announce">
        <span class="text">${e.announcementText}</span>
        <span class="meta">
          ${e.announcementUpdatedAt?this.t("announcement_updated",{time:Ie(this.hass,e.announcementUpdatedAt)}):W}
          ${e.announcementExtra?` · ${e.announcementExtra}`:W}
        </span>
      </div>
    `}renderSummary(e){const t=this.t("items_count",{count:e.summaryItems??0}),r=null!=e.summaryPrice?this.money(e.summaryPrice):"";return q`<span>${[t,r].filter(Boolean).join(" · ")}</span>`}};Et.styles=[We,yt],e([ge()],Et.prototype,"refreshing",void 0),e([ge()],Et.prototype,"refreshError",void 0),e([ge()],Et.prototype,"itemsExpanded",void 0),Et=e([de("rohlik-delivery-card")],Et),Ye({type:"rohlik-delivery-card",name:"Rohlík.cz Next Delivery",description:"Shows the state of your next Rohlík.cz order: ordered, on its way, or delivered.",preview:!0});const Ct={cs:{device:"Zařízení",name:"Vlastní název",show_name:"Zobrazit název zařízení"},en:{device:"Device",name:"Custom name",show_name:"Show device name"},de:{device:"Gerät",name:"Eigener Name",show_name:"Gerätenamen anzeigen"}};let Ot=class extends $t{constructor(){super(...arguments),this.labels=Ct}extraSchema(){return[{name:"show_name",selector:{boolean:{}}}]}};Ot=e([de("rohlik-delivery-badge-editor")],Ot);let It=class extends ce{constructor(){super(...arguments),this.entities=new Map,this.onClick=()=>{const e=this.entityId("is_ordered");e&&rt(this,e)},this.onKeydown=e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.onClick())}}get hass(){return this._localeHass??this._hass}set hass(e){const t=this.hass;this._hass=e,this._localeHass=this.applyLanguage(e),this.requestUpdate("hass",t)}applyLanguage(e){if(!e||!this.config?.language||"auto"===this.config.language)return;const t=Ze(e,this.config.language);return t===e?void 0:t}setConfig(e){if(!e?.device)throw new Error("Rohlík badge: 'device' is required — pick the Rohlík.cz device in the badge editor.");this.config=e,this._localeHass=this.applyLanguage(this._hass),this.hass&&(this.entities=ze(this.hass,this.config.device))}willUpdate(e){e.has("hass")&&this.hass&&this.config&&(this.entities=ze(this.hass,this.config.device))}static getConfigElement(){return document.createElement("rohlik-delivery-badge-editor")}static getStubConfig(e){const t=Ae(e);return{device:t[0]?.id??""}}entityId(e){return this.entities.get(e)}entityState(e){const t=this.entityId(e);return t?this.hass?.states?.[t]:void 0}attr(e,t){return this.entityState(e)?.attributes?.[t]}isOn(e){return"on"===this.entityState(e)?.state}textState(e){const t=this.entityState(e)?.state;return t&&"unknown"!==t&&"unavailable"!==t?t:null}t(e,t){return Be(this.hass,{...qe,..._t},e,t)}deviceName(){if(this.config?.name)return this.config.name;const e=this.hass?.devices?.[this.config?.device];return e?.name_by_user||e?.name||"Rohlík.cz"}syncMemory(e){const t=this.config?.device;if(!t)return null;const r=vt(),i=this.entityState("is_ordered")?.state;if("on"!==i&&"off"!==i)return mt(r,t);if(this.isOn("is_ordered")){const i=e?.id??null,s=mt(r,t);return s&&null!=i&&s.orderId!==i&&ft(r,t),pt(r,t,{orderId:i,till:Ee(this.entityState("next_order_till")?.state)}),null}return gt(r,t,new Date)}buildInput(){const e=this.attr("is_ordered","order_data")??null;return{isOrdered:this.isOn("is_ordered"),since:Ee(this.entityState("next_order_since")?.state),till:Ee(this.entityState("next_order_till")?.state),eta:Ee(this.entityState("delivery_time")?.state),orderData:e,announcementText:this.textState("delivery_info"),announcementExtra:this.attr("delivery_info","Additional Content")??null,announcementUpdatedAt:Ee(this.attr("delivery_info","Updated At")),lastOrderAt:Ee(this.entityState("last_order")?.state),lastOrderItems:this.attr("last_order","Items")??null,lastOrderPrice:this.attr("last_order","Price")??null,firstDeliveryText:this.textState("first_delivery"),isReserved:this.isOn("is_reserved"),isExpressAvailable:this.isOn("is_express_available"),recentDelivery:this.syncMemory(e)}}render(){if(!this.config||!this.hass||!this.entityId("is_ordered"))return W;const e=nt(this.buildInput(),new Date),t="none"===e.state&&e.isExpressAvailable,r={...this.config.accent?{"--rohlik-accent":this.config.accent}:{},...t?{"--rohlik-icon-color":"var(--warning-color)"}:{}},i=this.config.show_name?`${this.deviceName()} · ${this.t(`chip_${e.state}`)}`:this.t(`chip_${e.state}`);return q`
      <div
        class="badge"
        style=${$e(r)}
        @click=${this.onClick}
        @keydown=${this.onKeydown}
        role="button"
        tabindex="0"
      >
        <div class="icon-circle">
          <ha-icon icon=${"delivered"===e.state?"mdi:check":"mdi:truck-delivery"}></ha-icon>
        </div>
        <div class="text">
          <span class="label">${i}</span>
          <span class="value">${this.value(e)}</span>
        </div>
      </div>
    `}value(e){switch(e.state){case"arriving":return e.eta?Ie(this.hass,e.eta):e.till?Ie(this.hass,e.till):"—";case"ordered":return e.since?Ne(this.hass,e.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}):"—";case"delivered":return e.deliveredAt?Ie(this.hass,e.deliveredAt):"—";default:return e.firstDeliveryText??"—"}}};var Rt;It.styles=o`
    :host {
      --rohlik-accent: var(--primary-color);
      display: inline-flex;
      max-width: 100%;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 36px;
      padding: 0 12px 0 6px;
      box-sizing: border-box;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--ha-card-background, var(--card-background-color));
      cursor: pointer;
      max-width: 100%;
    }

    .badge:focus-visible {
      outline: 2px solid var(--rohlik-accent);
      outline-offset: 2px;
    }

    .icon-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      flex-shrink: 0;
      background: color-mix(in srgb, var(--rohlik-icon-color, var(--rohlik-accent)) 15%, transparent);
    }

    ha-icon {
      color: var(--rohlik-icon-color, var(--rohlik-accent));
      --mdc-icon-size: 16px;
    }

    .text {
      display: flex;
      flex: 1;
      min-width: 0;
      flex-direction: column;
      overflow: hidden;
      line-height: 1.2;
    }

    .label {
      color: var(--secondary-text-color);
      font-size: 0.65rem;
      text-transform: uppercase;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .value {
      color: var(--primary-text-color);
      font-size: 0.8rem;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,e([me({attribute:!1})],It.prototype,"hass",null),e([ge()],It.prototype,"config",void 0),e([ge()],It.prototype,"entities",void 0),It=e([de("rohlik-delivery-badge")],It),Rt={type:"rohlik-delivery-badge",name:"Rohlík.cz Delivery Badge",description:"Compact status pill for your next Rohlík.cz delivery.",preview:!0},Qe(),window.customBadges=window.customBadges??[],window.customBadges.push({preview:!0,...Rt});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const{I:Nt}=oe,Dt=e=>e,Tt=()=>document.createComment(""),Pt=(e,t,r)=>{const i=e._$AA.parentNode,s=void 0===t?e._$AB:t._$AA;if(void 0===r){const t=i.insertBefore(Tt(),s),n=i.insertBefore(Tt(),s);r=new Nt(t,n,e,e.options)}else{const t=r._$AB.nextSibling,n=r._$AM,o=n!==e;if(o){let t;r._$AQ?.(e),r._$AM=e,void 0!==r._$AP&&(t=e._$AU)!==n._$AU&&r._$AP(t)}if(t!==s||o){let e=r._$AA;for(;e!==t;){const t=Dt(e).nextSibling;Dt(i).insertBefore(e,s),e=t}}}return r},Mt=(e,t,r=e)=>(e._$AI(t,r),e),Ut={},jt=(e,t=Ut)=>e._$AH=t,Ft=e=>{e._$AR(),e._$AA.remove()},Lt=(e,t,r)=>{const i=new Map;for(let s=t;s<=r;s++)i.set(e[s],s);return i},Ht=ye(class extends _e{constructor(e){if(super(e),e.type!==ve)throw Error("repeat() can only be used in text expressions")}dt(e,t,r){let i;void 0===r?r=t:void 0!==t&&(i=t);const s=[],n=[];let o=0;for(const t of e)s[o]=i?i(t,o):o,n[o]=r(t,o),o++;return{values:n,keys:s}}render(e,t,r){return this.dt(e,t,r).values}update(e,[t,r,i]){const s=(e=>e._$AH)(e),{values:n,keys:o}=this.dt(t,r,i);if(!Array.isArray(s))return this.ut=o,n;const a=this.ut??=[],l=[];let c,h,d=0,u=s.length-1,p=0,m=n.length-1;for(;d<=u&&p<=m;)if(null===s[d])d++;else if(null===s[u])u--;else if(a[d]===o[p])l[p]=Mt(s[d],n[p]),d++,p++;else if(a[u]===o[m])l[m]=Mt(s[u],n[m]),u--,m--;else if(a[d]===o[m])l[m]=Mt(s[d],n[m]),Pt(e,l[m+1],s[d]),d++,m--;else if(a[u]===o[p])l[p]=Mt(s[u],n[p]),Pt(e,s[d],s[u]),u--,p++;else if(void 0===c&&(c=Lt(o,p,m),h=Lt(a,d,u)),c.has(a[d]))if(c.has(a[u])){const t=h.get(o[p]),r=void 0!==t?s[t]:null;if(null===r){const t=Pt(e,s[d]);Mt(t,n[p]),l[p]=t}else l[p]=Mt(r,n[p]),Pt(e,s[d],r),s[t]=null;p++}else Ft(s[u]),u--;else Ft(s[d]),d++;for(;p<=m;){const t=Pt(e,l[m+1]);Mt(t,n[p]),l[p++]=t}for(;d<=u;){const e=s[d++];null!==e&&Ft(e)}return this.ut=o,jt(e,l),Z}}),Bt=o`
  .adding {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0 4px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }

  /* Scrolls only when list_max_height applies (pointer-fine devices, see
     listMaxHeight() in cart-card.ts). No overscroll-behavior: once the list
     reaches its end the scroll must chain to the dashboard view. */
  .lines {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
  }

  .caption {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    margin-top: 2px;
  }

  .hint {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    margin-top: 4px;
  }

  .search {
    position: relative;
    margin: 12px 0;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: var(--ha-card-border-radius, 12px);
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
  }

  .search-box ha-icon {
    color: var(--secondary-text-color);
    --mdc-icon-size: 20px;
  }

  .search-box input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    color: var(--primary-text-color);
    font-size: 0.9rem;
    font-family: inherit;
    padding: 6px 0;
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .icon-btn:hover:not(:disabled) {
    background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent);
  }

  .icon-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .icon-btn.active {
    color: var(--rohlik-accent);
  }

  .icon-btn.remove:hover:not(:disabled) {
    color: var(--error-color, #db4437);
  }

  .spinner {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    border: 2px solid color-mix(in srgb, var(--rohlik-accent) 30%, transparent);
    border-top-color: var(--rohlik-accent);
    border-radius: 50%;
    animation: rohlik-spin 0.8s linear infinite;
  }

  @keyframes rohlik-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /*
   * Floats over the page instead of pushing the card's own layout: fixed
   * positioning computed from the search box's own rect (see
   * positionPopover() in cart-card.ts), so it works even inside a dialog.
   */
  .search-popover {
    position: fixed;
    max-height: min(320px, 60vh);
    overflow-y: auto;
    z-index: 1000;
    box-sizing: border-box;
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  }

  .search-popover .row {
    padding: 8px 10px;
  }

  .search-popover .row.highlighted {
    background: color-mix(in srgb, var(--rohlik-accent) 14%, transparent);
  }

  .popover-error,
  .popover-empty {
    padding: 10px 12px;
    font-size: 0.85rem;
  }

  .popover-error {
    color: var(--error-color, #db4437);
  }

  .popover-empty {
    color: var(--secondary-text-color);
  }

  .row.search-result .cell {
    min-width: 0;
  }

  .row.search-result .price {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .category-header {
    margin-top: 12px;
    padding-bottom: 2px;
    color: var(--secondary-text-color);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .category-header:first-child {
    margin-top: 0;
  }

  .cell {
    flex: 1;
    min-width: 0;
  }

  .cell .name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    overflow-wrap: anywhere;
    color: var(--primary-text-color);
  }

  .cell .secondary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--secondary-text-color);
    font-size: 0.8rem;
  }

  /* Groups the stepper/price/remove controls so they can be pulled onto
     their own right-aligned row under the narrow container query below. */
  .line-end {
    display: contents;
  }

  .stepper {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
    flex-shrink: 0;
  }

  .step-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--primary-text-color);
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
  }

  .step-btn:hover:not(:disabled) {
    background: color-mix(in srgb, var(--rohlik-accent) 20%, transparent);
  }

  .step-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .qty {
    min-width: 1.4em;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .line-price {
    min-width: 4.5em;
    text-align: right;
    font-size: 0.9rem;
    color: var(--primary-text-color);
    flex-shrink: 0;
  }

  .row.pending {
    opacity: 0.6;
  }

  .show-toggle {
    align-self: center;
    margin-top: 8px;
  }

  .minimum-hint {
    color: var(--warning-color, #ff9800);
  }

  .footer-row {
    margin-top: auto;
    padding-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .footer-row .footer {
    margin-top: 0;
  }

  .footer-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .btn.order {
    text-decoration: none;
  }

  .btn.order.disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  @container (max-width: 420px) {
    .header {
      flex-wrap: wrap;
      row-gap: 4px;
    }

    .big {
      font-size: 26px;
    }

    .cart-line {
      flex-wrap: wrap;
      row-gap: 6px;
    }

    .cart-line .cell {
      flex-basis: 100%;
    }

    .line-end {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-basis: 100%;
      justify-content: flex-end;
    }

    .footer-row {
      flex-wrap: wrap;
    }

    .footer-row .footer {
      flex-basis: 100%;
    }

    .footer-actions {
      flex-basis: 100%;
      width: 100%;
    }

    .footer-actions .btn {
      flex: 1;
    }
  }
`,qt={cs:{title:"Nákupní košík",can_order:"Nad minimem",ready_to_order:"Připraveno k objednání",below_minimum:"Pod minimem",below_minimum_by:"Do minimální hodnoty objednávky chybí {amount}",empty_cart:"Košík je prázdný",last_order_hint:"Váš poslední nákup měl {count} {count:položku|položky|položek}",search_placeholder:"Hledat na Rohlíku…",favourite_only:"Jen oblíbené",add:"Přidat",remove:"Odebrat",uncategorised:"Bez kategorie",missing_entities:"Chybí entity nákupního košíku — zkontrolujte integraci HA-RohlikCZ.",load_error:"Nepodařilo se načíst obsah košíku.",action_error:"Akci se nepodařilo dokončit, zkuste to prosím znovu.",search_error:"Vyhledávání selhalo.",search_add_error:"Přidání do košíku selhalo.",no_results:"Žádné výsledky",adding:"Přidávám {name}…",order:"Objednat",below_minimum_order:"Pod minimální hodnotou objednávky",order_hint:"Otevře {shop} v novém okně"},en:{title:"Shopping cart",can_order:"Above minimum",ready_to_order:"Ready to order",below_minimum:"Below minimum",below_minimum_by:"{amount} short of the minimum order value",empty_cart:"Cart is empty",last_order_hint:"Your last order had {count} {count:item|items}",search_placeholder:"Search {shop}…",favourite_only:"Favourites only",add:"Add",remove:"Remove",uncategorised:"Uncategorised",missing_entities:"Shopping cart entities are missing — check the HA-RohlikCZ integration.",load_error:"Failed to load the cart contents.",action_error:"Couldn't complete that action, please try again.",search_error:"Search failed.",search_add_error:"Adding to cart failed.",no_results:"No results",adding:"Adding {name}…",order:"Order",below_minimum_order:"Below minimum order",order_hint:"Opens {shop} in a new tab"},de:{title:"Warenkorb",can_order:"Über dem Mindestwert",ready_to_order:"Bereit zum Bestellen",below_minimum:"Unter dem Mindestwert",below_minimum_by:"Bis zum Mindestbestellwert fehlen {amount}",empty_cart:"Der Warenkorb ist leer",last_order_hint:"Ihr letzter Einkauf hatte {count} {count:Artikel|Artikel}",search_placeholder:"Bei {shop} suchen…",favourite_only:"Nur Favoriten",add:"Hinzufügen",remove:"Entfernen",uncategorised:"Ohne Kategorie",missing_entities:"Entitäten des Warenkorbs fehlen. Bitte die Integration HA-RohlikCZ prüfen.",load_error:"Der Warenkorb konnte nicht geladen werden.",action_error:"Das hat nicht geklappt. Bitte noch einmal versuchen.",search_error:"Die Suche ist fehlgeschlagen.",search_add_error:"Hinzufügen zum Warenkorb fehlgeschlagen.",no_results:"Keine Treffer",adding:"{name} wird hinzugefügt…",order:"Bestellen",below_minimum_order:"Unter dem Mindestbestellwert",order_hint:"Öffnet {shop} in einem neuen Tab"}},Kt={cs:{device:"Zařízení",name:"Vlastní název",show_search:"Zobrazit vyhledávání",group_by_category:"Seskupit podle kategorie",show_brand:"Zobrazit značku",min_order:"Minimální hodnota objednávky (0 = neposuzovat)",list_max_height:"Max. výška seznamu (0 = bez omezení)",max_items:"Max. počet zobrazených položek",show_order_button:"Tlačítko Objednat",checkout_url:"Adresa košíku",show_images:"Zobrazit obrázky produktů"},en:{device:"Device",name:"Custom name",show_search:"Show search",group_by_category:"Group by category",show_brand:"Show brand",min_order:"Minimum order value (0 = do not judge)",list_max_height:"Max list height (0 = unlimited)",max_items:"Max. items shown",show_order_button:"Order button",checkout_url:"Checkout URL (empty = the account's shop)",show_images:"Show product pictures"},de:{device:"Gerät",name:"Eigener Name",show_search:"Suche anzeigen",group_by_category:"Nach Kategorie gruppieren",show_brand:"Marke anzeigen",show_images:"Produktbilder anzeigen",min_order:"Mindestbestellwert (0 = nicht prüfen)",list_max_height:"Max. Höhe der Liste (0 = unbegrenzt)",max_items:"Max. angezeigte Artikel",show_order_button:"Taste „Bestellen“",checkout_url:"Adresse für „Bestellen“ (leer = Shop des Kontos)"}},Zt=/^(.+)\s*\((\d+)\)\s*-\s*(\d+(?:[.,]\d+)?)\s*[^\d\s]*\s*$/;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Wt(e){if(!e||"string"!=typeof e.summary)return null;const t=Zt.exec(e.summary.trim());if(!t)return null;const[,r,i,s]=t,n=r.trim(),o=parseInt(i,10),a=parseFloat(s.replace(",","."));if(!n||!Number.isFinite(o)||!Number.isFinite(a))return null;const l={uid:e.uid,name:n,quantity:o,price:a},{category:c,brand:h,productId:d,image:u}=function(e){const t={};if(!e)return t;for(const r of e.split(/\r?\n/)){const e=r.indexOf(":");if(-1===e)continue;const i=r.slice(0,e).trim().toLowerCase().replace(/[^a-z0-9]/g,""),s=r.slice(e+1).trim();if(s)if("category"===i)t.category=s;else if("brand"===i)t.brand=s;else if("productid"===i){const e=parseInt(s,10);Number.isFinite(e)&&(t.productId=e)}else"image"===i&&/^https?:\/\//i.test(s)&&(t.image=s)}return t}(e.description);return void 0!==c&&(l.category=c),void 0!==h&&(l.brand=h),void 0!==d&&(l.productId=d),void 0!==u&&(l.image=u),l}const Gt=/^(\d+)\s+(.+)$/,Vt=/^(.+?)\s*\((\d+)\)\s*$/;function Qt(e){const t=(e??"").trim(),r=Gt.exec(t);if(r){const e=r[2].trim();if(e)return{quantity:parseInt(r[1],10),name:e}}const i=Vt.exec(t);if(i){const e=i[1].trim();if(e)return{quantity:parseInt(i[2],10),name:e}}return{quantity:1,name:t}}function Yt(e,t,r){if(r<=0)return-1;const i=e+t;return i<-1?-1:i>=r?r-1:i}let Jt=class extends $t{constructor(){super(...arguments),this.labels=Kt,this.defaults={show_search:!0,show_brand:!0,group_by_category:!1,max_items:0,list_max_height:360,min_order:0,show_order_button:!0,show_images:!1}}extraSchema(){return[{name:"show_search",selector:{boolean:{}}},{name:"group_by_category",selector:{boolean:{}}},{name:"show_brand",selector:{boolean:{}}},{name:"show_images",selector:{boolean:{}}},{name:"max_items",selector:{number:{min:0,max:50,mode:"box"}}},{name:"list_max_height",selector:{number:{min:0,max:2e3,step:10,mode:"box",unit_of_measurement:"px"}}},{name:"min_order",selector:{number:{min:0,max:5e3,step:10,mode:"box",unit_of_measurement:He(this.hass,this.config?.device).currency}}},{name:"show_order_button",selector:{boolean:{}}},{name:"checkout_url",selector:{text:{}}}]}};Jt=e([de("rohlik-cart-card-editor")],Jt);let Xt=class extends Ge{constructor(){super(...arguments),this.strings=qt,this.lines=[],this.loading=!1,this.error=null,this.expanded=!1,this.searchQuery="",this.searchResults=[],this.searching=!1,this.searchError=null,this.searchAttempted=!1,this.favouriteOnly=!1,this.addingName=null,this.popoverOpen=!1,this.popoverRect=null,this.highlightedIndex=-1,this.pendingUids=new Set,this.reloadDeferred=!1,this.totalOverride=null,this.itemsOverride=null,this.searchSeq=0,this.loadSeq=0,this.popoverListenersAttached=!1,this.onWindowReposition=()=>{void 0===this.repositionRaf&&(this.repositionRaf=requestAnimationFrame(()=>{this.repositionRaf=void 0,this.positionPopover()}))},this.onDocumentPointerDown=e=>{e.composedPath().includes(this)||this.closePopover()},this.onSearchInput=e=>{const t=e.target.value;this.searchQuery=t,this.searchError=null,this.highlightedIndex=-1,this.searchDebounce&&clearTimeout(this.searchDebounce);const r=t.trim();if(r.length<2)return this.searchResults=[],this.searching=!1,this.searchAttempted=!1,void this.closePopover();this.openPopover(),this.searchDebounce=setTimeout(()=>{this.runSearch(r)},400)},this.onSearchFocus=()=>{this.searchQuery.trim().length>=2&&this.openPopover()},this.onSearchKeydown=e=>{if("Escape"===e.key)return this.popoverOpen&&e.preventDefault(),void this.clearSearch();if("ArrowDown"===e.key){if(!this.popoverOpen||!this.searchResults.length)return;return e.preventDefault(),void(this.highlightedIndex=Yt(this.highlightedIndex,1,this.searchResults.length))}if("ArrowUp"===e.key){if(!this.popoverOpen||!this.searchResults.length)return;return e.preventDefault(),void(this.highlightedIndex=Yt(this.highlightedIndex,-1,this.searchResults.length))}if("Enter"===e.key){e.preventDefault();const t=this.highlightedIndex>=0?this.searchResults[this.highlightedIndex]:void 0;if(t)return void this.addSearchResult(t);this.searchAndAdd()}},this.toggleFavouriteOnly=()=>{this.favouriteOnly=!this.favouriteOnly;const e=this.searchQuery.trim();e.length>=2&&this.runSearch(e)}}static getConfigElement(){return document.createElement("rohlik-cart-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-cart-card"}}getCardSize(){return 5}getGridOptions(){return{columns:12,rows:8,min_columns:6,min_rows:4}}disconnectedCallback(){super.disconnectedCallback(),this.searchDebounce&&clearTimeout(this.searchDebounce),this.detachPopoverListeners()}attachPopoverListeners(){this.popoverListenersAttached||(this.popoverListenersAttached=!0,window.addEventListener("scroll",this.onWindowReposition,!0),window.addEventListener("resize",this.onWindowReposition),document.addEventListener("pointerdown",this.onDocumentPointerDown))}detachPopoverListeners(){this.popoverListenersAttached&&(this.popoverListenersAttached=!1,window.removeEventListener("scroll",this.onWindowReposition,!0),window.removeEventListener("resize",this.onWindowReposition),document.removeEventListener("pointerdown",this.onDocumentPointerDown),void 0!==this.repositionRaf&&(cancelAnimationFrame(this.repositionRaf),this.repositionRaf=void 0))}positionPopover(){const e=this.searchBoxEl;if(!e)return;const t=e.getBoundingClientRect();this.popoverRect={left:t.left,top:t.bottom+4,width:t.width}}openPopover(){this.attachPopoverListeners(),this.popoverOpen=!0,this.positionPopover()}closePopover(){this.detachPopoverListeners(),(this.popoverOpen||-1!==this.highlightedIndex)&&(this.popoverOpen=!1,this.highlightedIndex=-1)}willUpdate(e){if(super.willUpdate(e),!e.has("hass")||!this.hass||!this.config)return;const t=this.state("shopping_cart"),r=this.state("cart_price");if(!t||!r)return;const i=`${t.state}|${t.last_updated}|${r.state}`;i!==this.loadedKey&&(this.loadedKey=i,this.pendingUids.size>0?this.reloadDeferred=!0:this.loadItems())}sensorTotal(){const e=parseFloat(this.state("cart_price")?.state??"");return Number.isFinite(e)?e:0}sensorItems(){const e=this.attr("cart_price","Total items");return"number"==typeof e?e:this.lines.length}finishEdit(e){const t=new Set(this.pendingUids);t.delete(e),this.pendingUids=t,0===t.size&&(this.totalOverride=null,this.itemsOverride=null,this.reloadDeferred&&(this.reloadDeferred=!1,this.loadItems()))}listMaxHeight(){const e=this.config.list_max_height??360;if(e<=0)return 0;try{if(window.matchMedia?.("(pointer: coarse)").matches)return 0}catch{}return e}async ensureConfigEntryId(){if(this.configEntryId)return this.configEntryId;const e=this.entityId("cart_price");return e?(this.configEntryId=await Xe(this.hass,e),this.configEntryId):void 0}async loadItems(){const e=this.entityId("shopping_cart");if(!e)return;const t=++this.loadSeq;this.loading=!0,this.error=null;try{const r=await this.hass.callWS({type:"todo/item/list",entity_id:e});if(t!==this.loadSeq)return;this.lines=(r.items??[]).map(e=>Wt(e)).filter(e=>null!==e)}catch{if(t!==this.loadSeq)return;this.error=this.t("load_error")}finally{t===this.loadSeq&&(this.loading=!1)}}async removeItem(e){const t=this.entityId("shopping_cart");if(!t||this.pendingUids.has(e))return;const r=this.lines,i=this.lines.find(t=>t.uid===e);this.pendingUids=new Set(this.pendingUids).add(e),this.lines=this.lines.filter(t=>t.uid!==e),this.totalOverride=Math.max(0,(this.totalOverride??this.sensorTotal())-(i?.price??0)),this.itemsOverride=Math.max(0,(this.itemsOverride??this.sensorItems())-1),this.error=null;try{await this.hass.callService("todo","remove_item",{item:e},{entity_id:t})}catch{this.lines=r,this.error=this.t("action_error")}finally{this.finishEdit(e)}}async changeQuantity(e,t){if(this.pendingUids.has(e.uid))return;if(t<=0)return void await this.removeItem(e.uid);const r=this.entityId("shopping_cart");if(!r||void 0===e.productId)return;const i=this.lines,s=e.quantity>0?e.price/e.quantity:0,n=Math.round(s*t*100)/100;this.pendingUids=new Set(this.pendingUids).add(e.uid),this.lines=this.lines.map(r=>r.uid===e.uid?{...r,quantity:t,price:n}:r),this.totalOverride=Math.max(0,(this.totalOverride??this.sensorTotal())+(n-e.price)),this.error=null;try{await this.hass.callService("todo","remove_item",{item:e.uid},{entity_id:r});const i=await this.ensureConfigEntryId();if(!i)throw new Error("no config_entry_id for shopping_cart device");await et(this.hass,i,"add_to_cart",{product_id:e.productId,quantity:t})}catch{this.lines=i,this.error=this.t("action_error")}finally{this.reloadDeferred=!0,this.finishEdit(e.uid)}}async runSearch(e){const t=await this.ensureConfigEntryId();if(!t)return;const r=++this.searchSeq;this.searching=!0;try{const i=await et(this.hass,t,"search_product",{product_name:e,limit:8,favourite:this.favouriteOnly},!0);if(r!==this.searchSeq)return;this.searchResults=i?.search_results??[],this.highlightedIndex=-1,this.searchAttempted=!0,this.searchQuery.trim().length>=2&&this.openPopover()}catch{if(r!==this.searchSeq)return;this.searchResults=[],this.searchError=this.t("search_error"),this.searchAttempted=!0,this.searchQuery.trim().length>=2&&this.openPopover()}finally{r===this.searchSeq&&(this.searching=!1)}}async searchAndAdd(){const e=this.searchQuery.trim();if(!e)return;const t=await this.ensureConfigEntryId();if(!t)return;const{quantity:r,name:i}=Qt(e);this.clearSearch(),this.addingName=i,this.error=null;try{const e=await et(this.hass,t,"search_and_add_to_cart",{product_name:i,quantity:r,favourite:this.favouriteOnly},!0);if(e&&!1===e.success)return void(this.error=e.message||this.t("search_add_error"));await this.loadItems()}catch{this.error=this.t("search_add_error")}finally{this.addingName=null}}async addSearchResult(e){const t=await this.ensureConfigEntryId();if(!t)return;const{quantity:r}=Qt(this.searchQuery.trim());this.clearSearch(),this.addingName=e.name??"",this.error=null;try{await et(this.hass,t,"add_to_cart",{product_id:e.id,quantity:r}),await this.loadItems()}catch{this.error=this.t("search_add_error")}finally{this.addingName=null}}clearSearch(){this.searchDebounce&&clearTimeout(this.searchDebounce),this.searchQuery="",this.searchResults=[],this.searchError=null,this.searching=!1,this.searchAttempted=!1,this.closePopover()}render(){if(!this.config)return W;const e=this.entityId("shopping_cart"),t=this.entityId("cart_price");if(!e||!t)return q`<ha-card>${this.renderError(this.t("missing_entities"))}</ha-card>`;const r=this.state("cart_price"),i=this.totalOverride??(r?parseFloat(r.state):0),s=Boolean(this.attr("cart_price","Can Order")),n=this.config.min_order??0,o=Number(this.state("no_limit")?.state)>0,a=n>0&&!o&&i<n,l=this.attr("cart_price","Total items"),c=this.itemsOverride??("number"==typeof l?l:this.lines.length),h=0===this.lines.length,d=!1!==this.config.show_search,u=!1!==this.config.show_brand,p=!0===this.config.group_by_category,m=this.config.max_items??0,g=!1!==this.config.show_order_button,f=!h;return q`
      <ha-card style=${$e(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:cart"></ha-icon>
          <span class="title">${this.config.name||this.t("title")}</span>
          ${h?W:s?q`<span class="chip ok">${this.t("ready_to_order")}</span>`:a?q`<span class="chip warn">${this.t("below_minimum")}</span>`:n>0?q`<span class="chip ok">${this.t("can_order")}</span>`:W}
        </div>

        <div class="big">${this.money(Number.isFinite(i)?i:0)}</div>
        <div class="caption">
          ${h?this.t("empty_cart"):this.t("items_count",{count:c})}
        </div>
        ${h?this.renderEmptyHint():W}
        ${a&&!h?q`<div class="hint minimum-hint">
              ${this.t("below_minimum_by",{amount:this.money(n-i)})}
            </div>`:W}
        ${this.error?q`<div class="error">${this.error}</div>`:W}
        ${d?this.renderSearch():W}
        ${null!==this.addingName?q`<div class="adding">${this.renderSpinner()} ${this.t("adding",{name:this.addingName})}</div>`:W}
        ${h?W:this.renderLines(p,u,m)}

        <div class="footer-row">
          ${this.renderFreshness()}
          <div class="footer-actions">
            <button
              class="btn ghost"
              ?disabled=${this.loading}
              @click=${()=>{this.loadItems()}}
            >
              ${this.t("refresh")}
            </button>
            ${g?this.renderOrderButton(f):W}
          </div>
        </div>
      </ha-card>
    `}renderOrderButton(e){const t=this.shop(),r=function(e,t="https://www.rohlik.cz/kosik"){const r=e?.trim();return r||t}(this.config.checkout_url,t.checkoutUrl);return q`
      <a
        class=${be({btn:!0,order:!0,disabled:!e})}
        href=${e?r:W}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled=${e?W:"true"}
        title=${e?this.t("order_hint",{shop:t.name}):this.t("empty_cart")}
      >
        <ha-icon icon="mdi:cart-arrow-right"></ha-icon>
        ${this.t("order")}
      </a>
    `}renderEmptyHint(){const e=this.attr("last_order","Items");return"number"!=typeof e?W:q`<div class="hint">${this.t("last_order_hint",{count:e})}</div>`}renderSearch(){return q`
      <div class="search">
        <div class="search-box">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            role="combobox"
            aria-expanded=${this.popoverOpen?"true":"false"}
            aria-controls="cart-search-listbox"
            aria-autocomplete="list"
            aria-activedescendant=${this.highlightedIndex>=0?`cart-search-option-${this.highlightedIndex}`:W}
            .value=${this.searchQuery}
            placeholder=${this.t("search_placeholder",{shop:this.shop().name})}
            @input=${this.onSearchInput}
            @keydown=${this.onSearchKeydown}
            @focus=${this.onSearchFocus}
          />
          ${this.searching?this.renderSpinner():W}
          <button
            class=${be({"icon-btn":!0,active:this.favouriteOnly})}
            title=${this.t("favourite_only")}
            @click=${this.toggleFavouriteOnly}
          >
            <ha-icon icon=${this.favouriteOnly?"mdi:heart":"mdi:heart-outline"}></ha-icon>
          </button>
        </div>
        ${this.popoverOpen?this.renderSearchPopover():W}
      </div>
    `}renderSearchPopover(){const e=this.popoverRect?{left:`${this.popoverRect.left}px`,top:`${this.popoverRect.top}px`,width:`${this.popoverRect.width}px`}:{display:"none"};return q`
      <div id="cart-search-listbox" class="search-popover" role="listbox" style=${$e(e)}>
        ${this.searchError?q`<div class="popover-error">${this.searchError}</div>`:this.searchResults.length?Ht(this.searchResults,e=>e.id,(e,t)=>this.renderSearchResult(e,t)):this.searchAttempted&&!this.searching?q`<div class="popover-empty">${this.t("no_results")}</div>`:W}
      </div>
    `}renderSpinner(){return customElements.get("ha-circular-progress")?q`<ha-circular-progress indeterminate size="small"></ha-circular-progress>`:q`<div class="spinner"></div>`}renderSearchResult(e,t){const r=[e.brand,e.amount].filter(Boolean).join(" · "),i=t===this.highlightedIndex;return q`
      <div
        id="cart-search-option-${t}"
        class=${be({row:!0,"search-result":!0,highlighted:i})}
        role="option"
        aria-selected=${i?"true":"false"}
        @pointerenter=${()=>this.highlightedIndex=t}
      >
        ${this.renderThumb(e.image)}
        <div class="cell">
          <div class="name">${e.name}</div>
          ${r?q`<div class="secondary">${r}</div>`:W}
        </div>
        <div class="price">${e.price}</div>
        <button
          class="icon-btn"
          title=${this.t("add")}
          @click=${()=>{this.addSearchResult(e)}}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
    `}renderThumb(e){return!0!==this.config.show_images?W:e?q`<img class="thumb" src=${e} alt="" loading="lazy" referrerpolicy="no-referrer" />`:q`<div class="thumb placeholder" aria-hidden="true"></div>`}renderLines(e,t,r){const i=r>0?r:this.lines.length,s=this.expanded?this.lines:this.lines.slice(0,i),n=this.lines.length>i,o=this.listMaxHeight();return q`
      <div class="lines" style=${$e(o>0?{maxHeight:`${o}px`}:{})}>
        ${e?Ht(function(e){const t=new Map,r=[];for(const i of e){if(!i.category){r.push(i);continue}const e=t.get(i.category);e?e.push(i):t.set(i.category,[i])}const i=Array.from(t.entries()).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>({category:e,lines:t}));return r.length&&i.push({category:void 0,lines:r}),i}(s),e=>e.category??"__uncategorised__",e=>q`
                <div class="category-header">${e.category??this.t("uncategorised")}</div>
                ${Ht(e.lines,e=>e.uid,e=>this.renderLine(e,t))}
              `):Ht(s,e=>e.uid,e=>this.renderLine(e,t))}
      </div>
      ${n?q`
            <button class="btn ghost show-toggle" @click=${()=>this.expanded=!this.expanded}>
              ${this.expanded?this.t("show_less"):this.t("show_all",{count:this.lines.length})}
            </button>
          `:W}
    `}renderLine(e,t){const r=this.pendingUids.has(e.uid),i=[e.category,t?e.brand:void 0].filter(e=>Boolean(e)).join(" · ");return q`
      <div class=${be({row:!0,"cart-line":!0,pending:r})}>
        ${this.renderThumb(e.image)}
        <div class="cell">
          <div class="name">${e.name}</div>
          ${i?q`<div class="secondary">${i}</div>`:W}
        </div>
        <div class="line-end">
          <div class="stepper">
            <button
              class="step-btn"
              ?disabled=${r}
              title=${this.t("remove")}
              @click=${()=>{this.changeQuantity(e,e.quantity-1)}}
            >
              −
            </button>
            <span class="qty">${e.quantity}</span>
            <button
              class="step-btn"
              ?disabled=${r}
              @click=${()=>{this.changeQuantity(e,e.quantity+1)}}
            >
              +
            </button>
          </div>
          <div class="line-price">${this.money(e.price)}</div>
          <button
            class="icon-btn remove"
            ?disabled=${r}
            title=${this.t("remove")}
            @click=${()=>{this.removeItem(e.uid)}}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </div>
    `}};Xt.styles=[We,Bt],e([ge()],Xt.prototype,"lines",void 0),e([ge()],Xt.prototype,"loading",void 0),e([ge()],Xt.prototype,"error",void 0),e([ge()],Xt.prototype,"expanded",void 0),e([ge()],Xt.prototype,"searchQuery",void 0),e([ge()],Xt.prototype,"searchResults",void 0),e([ge()],Xt.prototype,"searching",void 0),e([ge()],Xt.prototype,"searchError",void 0),e([ge()],Xt.prototype,"searchAttempted",void 0),e([ge()],Xt.prototype,"favouriteOnly",void 0),e([ge()],Xt.prototype,"addingName",void 0),e([ge()],Xt.prototype,"popoverOpen",void 0),e([ge()],Xt.prototype,"popoverRect",void 0),e([ge()],Xt.prototype,"highlightedIndex",void 0),e([ge()],Xt.prototype,"pendingUids",void 0),e([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(e){return(t,r,i)=>((e,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,r),r))(t,r,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}(".search-box")],Xt.prototype,"searchBoxEl",void 0),e([ge()],Xt.prototype,"totalOverride",void 0),e([ge()],Xt.prototype,"itemsOverride",void 0),Xt=e([de("rohlik-cart-card")],Xt),Ye({type:"rohlik-cart-card",name:"Rohlík.cz Shopping Cart",description:"Live cart contents, quantity steppers and product search for Rohlík.cz."});const er=["express","standard","eco"],tr={express:"mdi:lightning-bolt",standard:"mdi:truck-delivery",eco:"mdi:leaf"};function rr(e){if("number"==typeof e&&Number.isFinite(e))return e;if("string"==typeof e&&""!==e.trim()){const t=Number(e);if(Number.isFinite(t))return t}return null}function ir(e){return"string"==typeof e&&""!==e.trim()?e:null}function sr(e){return null==e||Number.isNaN(e)?0:Math.min(100,Math.max(0,e))}const nr=o`
  :host {
    container-type: inline-size;
    container-name: rohlik-slots;
  }

  .header {
    flex-wrap: wrap;
    row-gap: 6px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 1 auto;
    min-width: 0;
    flex-wrap: wrap;
    margin-left: auto;
  }

  /* Below ~420px the actions drop under the title instead of squeezing it. */
  @container rohlik-slots (max-width: 420px) {
    .header-actions {
      flex-basis: 100%;
      justify-content: flex-end;
      margin-left: 0;
    }
  }

  .icon-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
  }

  .icon-toggle ha-icon {
    --mdc-icon-size: 20px;
  }

  .icon-toggle.on {
    color: var(--rohlik-accent);
    background: color-mix(in srgb, var(--rohlik-accent) 15%, transparent);
  }

  .pulse-dot {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: rohlik-pulse 1.4s ease-in-out infinite;
  }

  @keyframes rohlik-pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.35;
      transform: scale(1.4);
    }
  }

  .location {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    margin-bottom: 8px;
  }

  .location ha-icon {
    --mdc-icon-size: 14px;
  }

  .slots-grid {
    display: grid;
    grid-template-columns: repeat(var(--rohlik-slot-count, 3), 1fr);
    gap: 12px;
  }

  .slots-grid.column,
  .slots-grid.auto {
    grid-template-columns: 1fr;
  }

  /* "auto": side by side once the card has room, one per row below that. */
  @container rohlik-slots (min-width: 480px) {
    .slots-grid.auto {
      grid-template-columns: repeat(var(--rohlik-slot-count, 3), 1fr);
    }
  }

  @media (min-width: 480px) {
    .slots-grid.auto {
      grid-template-columns: repeat(var(--rohlik-slot-count, 3), 1fr);
    }
  }

  /* Explicit "row" still collapses to one column at very narrow widths. */
  @container rohlik-slots (max-width: 359px) {
    .slots-grid:not(.column):not(.auto) {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 359px) {
    .slots-grid:not(.column):not(.auto) {
      grid-template-columns: 1fr;
    }
  }

  /*
   * Identical anatomy for every tile, available or not, top-aligned so an
   * "Unavailable" tile never grows taller than its neighbours: icon+label,
   * big time, exact-window meta line, capacity bar, capacity message.
   */
  .tile {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
    grid-template-areas: "head" "time" "meta" "bar" "msg";
    align-content: start;
    gap: 4px;
    padding: 10px 12px;
    border-radius: var(--ha-card-border-radius, 12px);
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    min-width: 0;
    min-height: 96px;
  }

  .tile-head {
    grid-area: head;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    font-weight: 500;
  }

  .tile-head ha-icon {
    --mdc-icon-size: 16px;
    color: var(--rohlik-accent);
  }

  .tile-time {
    grid-area: time;
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.25;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tile-time.muted {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--secondary-text-color);
  }

  .tile-meta {
    grid-area: meta;
    min-height: 1em;
    color: var(--secondary-text-color);
    font-size: 0.78rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .capacity-bar {
    grid-area: bar;
    height: 4px;
    border-radius: 2px;
    background: var(--divider-color);
    overflow: hidden;
  }

  .capacity-fill {
    height: 100%;
    border-radius: 2px;
    background: var(--rohlik-accent);
  }

  .capacity-fill.warn {
    background: var(--warning-color, #ff9800);
  }

  .capacity-fill.err {
    background: var(--error-color, #db4437);
  }

  .capacity-fill.muted {
    width: 100%;
    background: var(--divider-color);
  }

  .capacity-bar.empty {
    opacity: 0.6;
  }

  .tile-msg {
    grid-area: msg;
    min-height: 1em;
    color: var(--secondary-text-color);
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /*
   * "auto" layout once it drops to one tile per row: a compact list row
   * instead of a tall tile — icon+label on the left, time+meta in the
   * middle, the capacity bar spanning the full width underneath.
   */
  @container rohlik-slots (max-width: 479px) {
    .slots-grid.auto .tile {
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto auto auto;
      grid-template-areas: "head time" "head meta" "bar bar" "msg msg";
      align-items: center;
      min-height: 0;
    }

    .slots-grid.auto .tile-head {
      align-self: center;
    }
  }

  @media (max-width: 479px) {
    .slots-grid.auto .tile {
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto auto auto;
      grid-template-areas: "head time" "head meta" "bar bar" "msg msg";
      align-items: center;
      min-height: 0;
    }

    .slots-grid.auto .tile-head {
      align-self: center;
    }
  }
`,or={cs:{title:"Termíny rozvozu",slot_express:"Expres",slot_standard:"Standard",slot_eco:"Eko",express_available:"Expres k dispozici",no_express:"Bez expresu",watch_toggle:"Sledovat expres",watch_error:"Aktualizace se nezdařila",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",layout_auto:"Automaticky",layout_row:"Řádek",layout_column:"Sloupec"},en:{title:"Delivery slots",slot_express:"Express",slot_standard:"Standard",slot_eco:"Eco",express_available:"Express available",no_express:"No express",watch_toggle:"Watch express",watch_error:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device",layout_auto:"Auto",layout_row:"Row",layout_column:"Column"},de:{title:"Liefertermine",slot_express:"Express",slot_standard:"Standard",slot_eco:"Öko",express_available:"Express verfügbar",no_express:"Kein Express",watch_toggle:"Express beobachten",watch_error:"Aktualisieren fehlgeschlagen",no_entities:"Auf diesem Gerät wurden keine Rohlík-Entitäten gefunden",layout_auto:"Automatisch",layout_row:"Zeile",layout_column:"Spalte"}},ar={cs:{device:"Zařízení",name:"Vlastní název",slots:"Zobrazené sloty",layout:"Rozložení",show_price:"Zobrazit cenu",show_location:"Zobrazit adresu",watch_interval:"Interval sledování (s)"},en:{device:"Device",name:"Custom name",slots:"Slots shown",layout:"Layout",show_price:"Show price",show_location:"Show location",watch_interval:"Watch interval (s)"},de:{device:"Gerät",name:"Eigener Name",slots:"Angezeigte Termine",layout:"Anordnung",show_price:"Preis anzeigen",show_location:"Adresse anzeigen",watch_interval:"Intervall beim Beobachten (s)"}};let lr=class extends $t{constructor(){super(...arguments),this.labels=ar,this.defaults={slots:["express","standard","eco"],show_price:!0,show_location:!0,watch_interval:15,layout:"auto"}}extraSchema(){const e=e=>Be(this.hass,or,e);return[{name:"slots",selector:{select:{multiple:!0,mode:"list",options:[{value:"express",label:e("slot_express")},{value:"standard",label:e("slot_standard")},{value:"eco",label:e("slot_eco")}]}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"auto",label:e("layout_auto")},{value:"row",label:e("layout_row")},{value:"column",label:e("layout_column")}]}}},{name:"show_price",selector:{boolean:{}}},{name:"show_location",selector:{boolean:{}}},{name:"watch_interval",selector:{number:{mode:"box",min:10,max:300}}}]}};lr=e([de("rohlik-slots-card-editor")],lr);let cr=class extends Ge{constructor(){super(...arguments),this.strings=or,this.watching=!1,this.pollError=null,this.onVisibilityChange=()=>this.syncPolling(),this.toggleWatch=()=>{this.watching=!this.watching,this.saveWatchFlag(this.watching),this.watching&&(this.pollError=null)}}static getConfigElement(){return document.createElement("rohlik-slots-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-slots-card"}}getGridOptions(){return"column"===this.config?.layout?{columns:4,rows:6,min_columns:3,min_rows:4}:{columns:12,rows:3,min_columns:6,min_rows:2}}setConfig(e){super.setConfig(e),this.watching=this.loadWatchFlag()}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibilityChange),this.syncPolling()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisibilityChange),this.stopPolling()}willUpdate(e){super.willUpdate(e),this.syncPolling()}watchStorageKey(){const e=this.config?.device;return e?`rohlik-slots-watch:${e}`:null}loadWatchFlag(){const e=this.watchStorageKey();if(!e)return!1;try{return"1"===localStorage.getItem(e)}catch{return!1}}saveWatchFlag(e){const t=this.watchStorageKey();if(t)try{localStorage.setItem(t,e?"1":"0")}catch{}}syncPolling(){const e=this.watching&&"visible"===document.visibilityState&&!!this.config,t=Math.max(10,this.config?.watch_interval??15);e?void 0!==this.pollTimer&&this.pollSeconds===t||(this.stopPolling(),this.pollTimer=setInterval(()=>{this.poll()},1e3*t),this.pollSeconds=t):this.stopPolling()}stopPolling(){void 0!==this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=void 0),this.pollSeconds=void 0}async poll(){const e=this.entityId("express_slot")??this.entityId("standard_slot")??this.entityId("eco_slot");if(e&&this.hass)try{const t=await Xe(this.hass,e);if(!t)throw new Error("no config entry");await et(this.hass,t,"refresh_slots"),this.pollError=null}catch{this.pollError=this.t("watch_error")}}slotsToShow(){const e=this.config?.slots;return e&&e.length>0?e:er}render(){if(!this.config)return W;if(0===this.entities.size)return q`
        <ha-card style=${$e(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const e=this.slotsToShow(),t=this.isOn("is_express_available"),r=!1!==this.config.show_location,i=this.attr("first_delivery","delivery_location"),s=this.config.layout??"auto";return q`
      <ha-card style=${$e(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span class="title">${this.config.name||this.t("title")}</span>
          <div class="header-actions">
            <button
              class=${be({"icon-toggle":!0,on:this.watching})}
              @click=${this.toggleWatch}
              aria-pressed=${this.watching}
              aria-label=${this.t("watch_toggle")}
              title=${this.t("watch_toggle")}
            >
              <ha-icon icon=${this.watching?"mdi:eye":"mdi:eye-outline"}></ha-icon>
              ${this.watching?q`<span class="pulse-dot"></span>`:W}
            </button>
            <span class="chip ${t?"warn":"neutral"}">
              ${t?this.t("express_available"):this.t("no_express")}
            </span>
          </div>
        </div>

        ${r&&"string"==typeof i&&i?q`
              <div class="location">
                <ha-icon icon="mdi:map-marker"></ha-icon>
                <span>${i}</span>
              </div>
            `:W}
        ${this.pollError?this.renderError(this.pollError):W}

        <div
          class=${be({"slots-grid":!0,column:"column"===s,auto:"auto"===s})}
          style=${$e({"--rohlik-slot-count":String(e.length)})}
        >
          ${e.map(e=>this.renderTile(e))}
        </div>

        ${this.renderFreshness()}
      </ha-card>
    `}renderTile(e){const t=function(e,t){const r=t?.attributes??{},i=Ee(t?.state);return{type:e,start:i,end:Ee(r["Delivery Slot End"]),price:rr(r.Price),capacityPercent:rr(r["Remaining Capacity Percent"]),capacityMessage:ir(r["Remaining Capacity Message"]),title:ir(r.Title),subtitle:ir(r.Subtitle),available:null!==i}}(e,this.state(`${e}_slot`)),r=tr[e],i=this.t(`slot_${e}`),s=t.capacityMessage??t.subtitle??"";return q`
      <div class="tile">
        <div class="tile-head"><ha-icon icon=${r}></ha-icon><span>${i}</span></div>
        ${this.renderTileTime(t)}
        <div class="tile-meta">${this.renderMeta(t)}</div>
        ${this.renderCapacityBar(t)}
        <div class="tile-msg">${s}</div>
      </div>
    `}renderTileTime(e){return e.available&&e.start?q`
      <div class="tile-time">
        ${Ne(this.hass,e.start,{today:this.t("today"),tomorrow:this.t("tomorrow")})}
      </div>
    `:q`<div class="tile-time muted">${this.t("unavailable")}</div>`}renderMeta(e){if(!e.available||!e.start)return"";const t=[],r=Ie(this.hass,e.start);return t.push(e.end?`${r} – ${Ie(this.hass,e.end)}`:r),!1!==this.config.show_price&&null!=e.price&&t.push(0===e.price?this.t("free"):this.money(e.price)),t.join(" · ")}renderCapacityBar(e){if(!e.available||null==e.capacityPercent)return q`
        <div class="capacity-bar empty"><div class="capacity-fill muted"></div></div>
      `;const t=null==(r=e.capacityPercent)||Number.isNaN(r)?"err":r>=50?"ok":r>=10?"warn":"err";var r;return q`
      <div class="capacity-bar">
        <div
          class=${be({"capacity-fill":!0,[t]:!0})}
          style=${$e({width:`${sr(e.capacityPercent)}%`})}
        ></div>
      </div>
    `}};cr.styles=[We,nr],e([ge()],cr.prototype,"watching",void 0),e([ge()],cr.prototype,"pollError",void 0),cr=e([de("rohlik-slots-card")],cr),Ye({type:"rohlik-slots-card",name:"Rohlík.cz Delivery Slots",description:"Express, standard and eco delivery slot times, prices and remaining capacity.",preview:!0});const hr=o`
  :host {
    container-type: inline-size;
    container-name: rohlik-account;
  }

  .header {
    flex-wrap: wrap;
    row-gap: 4px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 4px;
  }

  @container rohlik-account (max-width: 360px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 360px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 10px;
    background: color-mix(in srgb, var(--rohlik-accent) 15%, transparent);
  }

  .stat-icon ha-icon {
    color: var(--rohlik-accent);
    --mdc-icon-size: 20px;
  }

  .stat-body {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .stat-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .stat-caption {
    color: var(--secondary-text-color);
    font-size: 0.72rem;
  }

  .stat-label {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .account-footer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid var(--divider-color);
  }

  .last-order {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .footer-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  .footer-row .footer {
    margin-top: 0;
  }

  .icon-btn {
    padding: 4px;
    width: 28px;
    height: 28px;
  }

  ha-icon.spin {
    animation: rohlik-account-spin 1s linear infinite;
  }

  @keyframes rohlik-account-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`,dr={cs:{title:"Účet",xtra_days:"Xtra · {days} {days:den|dny|dní}",no_xtra:"Bez Xtra",stat_credit:"Kredit",stat_bags:"Tašky",stat_no_limit:"Objednávky bez limitu",stat_free_express:"Expres zdarma",stat_parents_club:"Rodičovský klub",stat_reusable:"Vratné tašky",deposit_caption:"záloha {amount}",remaining:"zbývá {n}",yes:"Ano",no:"Ne",last_order:"Poslední objednávka",refresh_failed:"Aktualizace se nezdařila",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz"},en:{title:"Account",xtra_days:"Xtra · {days} {days:day|days}",no_xtra:"No Xtra",stat_credit:"Credit",stat_bags:"Bags",stat_no_limit:"Orders without limit",stat_free_express:"Free express",stat_parents_club:"Parents Club",stat_reusable:"Reusable bags",deposit_caption:"{amount} deposit",remaining:"{n} left",yes:"Yes",no:"No",last_order:"Last order",refresh_failed:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device"},de:{title:"Konto",xtra_days:"Xtra · {days} {days:Tag|Tage}",no_xtra:"Ohne Xtra",stat_credit:"Guthaben",stat_bags:"Taschen",stat_no_limit:"Bestellungen ohne Mindestwert",stat_free_express:"Express kostenlos",stat_parents_club:"Elternclub",stat_reusable:"Mehrwegtaschen",deposit_caption:"Pfand {amount}",remaining:"noch {n}",yes:"Ja",no:"Nein",last_order:"Letzte Bestellung",refresh_failed:"Aktualisieren fehlgeschlagen",no_entities:"Auf diesem Gerät wurden keine Rohlík-Entitäten gefunden"}},ur={cs:{device:"Zařízení",name:"Vlastní název",stats:"Zobrazené statistiky",show_footer:"Zobrazit patičku"},en:{device:"Device",name:"Custom name",stats:"Stats shown",show_footer:"Show footer"},de:{device:"Gerät",name:"Eigener Name",stats:"Angezeigte Werte",show_footer:"Fußzeile anzeigen"}};let pr=class extends $t{constructor(){super(...arguments),this.labels=ur,this.defaults={stats:["credit","bags","no_limit","free_express","parents_club","reusable"],show_footer:!0}}extraSchema(){const e=e=>Be(this.hass,dr,e);return[{name:"stats",selector:{select:{multiple:!0,mode:"list",options:[{value:"credit",label:e("stat_credit")},{value:"bags",label:e("stat_bags")},{value:"no_limit",label:e("stat_no_limit")},{value:"free_express",label:e("stat_free_express")},{value:"parents_club",label:e("stat_parents_club")},{value:"reusable",label:e("stat_reusable")}]}}},{name:"show_footer",selector:{boolean:{}}}]}};pr=e([de("rohlik-account-card-editor")],pr);const mr=["credit","bags","no_limit","free_express","parents_club","reusable"];function gr(e){if(null==e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isNaN(t)?null:t}let fr=class extends Ge{constructor(){super(...arguments),this.strings=dr,this.refreshing=!1,this.refreshError=null,this.onRefresh=async()=>{if(this.refreshing)return;const e=this.entityId("credit_amount");if(e&&this.hass){this.refreshing=!0,this.refreshError=null;try{const t=await Xe(this.hass,e);if(!t)throw new Error("no config entry");await et(this.hass,t,"update_data")}catch{this.refreshError=this.t("refresh_failed")}finally{this.refreshing=!1}}}}static getConfigElement(){return document.createElement("rohlik-account-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-account-card"}}getGridOptions(){return{columns:6,rows:5,min_columns:4,min_rows:3}}statsToShow(){const e=this.config?.stats;return e&&e.length>0?e:mr}remainingDays(){const e=gr(this.state("premium_days")?.state);if(null!=e)return e;const t=this.attr("is_premium","remaining_days");return"number"==typeof t?t:null}statContent(e,t){switch(e){case"credit":{if(!this.entityId("credit_amount"))return null;const e=gr(this.state("credit_amount")?.state);return null==e?null:{icon:"mdi:cash-multiple",labelKey:"stat_credit",value:this.money(e)}}case"bags":{if(!this.entityId("bags_amount"))return null;const e=gr(this.state("bags_amount")?.state);if(null==e)return null;const t=this.attr("bags_amount","Max Bags"),r=this.attr("bags_amount","Deposit Amount"),i=this.attr("bags_amount","Deposit Currency"),s="number"==typeof t?`${e} / ${t}`:String(e);let n;if("number"==typeof r&&r>0){const e="string"==typeof i?i:this.shop().currency;n=this.t("deposit_caption",{amount:Oe(this.hass,r,e)})}return{icon:"mdi:shopping",labelKey:"stat_bags",value:s,caption:n}}case"no_limit":{if(!t||!this.entityId("no_limit"))return null;const e=gr(this.state("no_limit")?.state);return null==e?null:{icon:"mdi:cash-100",labelKey:"stat_no_limit",value:this.t("remaining",{n:e})}}case"free_express":{if(!t||!this.entityId("free_express"))return null;const e=gr(this.state("free_express")?.state);return null==e?null:{icon:"mdi:truck-fast",labelKey:"stat_free_express",value:this.t("remaining",{n:e})}}case"parents_club":return this.entityId("is_parent")?{icon:"mdi:human-male-female-child",labelKey:"stat_parents_club",value:this.isOn("is_parent")?this.t("yes"):this.t("no")}:null;case"reusable":return this.entityId("is_reusable")?{icon:"mdi:recycle",labelKey:"stat_reusable",value:this.isOn("is_reusable")?this.t("yes"):this.t("no")}:null;default:return null}}render(){if(!this.config)return W;if(0===this.entities.size)return q`
        <ha-card style=${$e(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const e=this.isOn("is_premium"),t=this.statsToShow();return q`
      <ha-card style=${$e(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:account-star"></ha-icon>
          <span class="title">${this.deviceName()}</span>
          ${this.renderHeaderChip(e)}
        </div>

        <div class="stats-grid">${t.map(t=>this.renderStat(t,e))}</div>

        ${!1!==this.config.show_footer?this.renderFooter():W}
      </ha-card>
    `}renderHeaderChip(e){if(!e)return q`<span class="chip neutral">${this.t("no_xtra")}</span>`;const t=this.remainingDays();return q`
      <span class="chip ${null!=t&&t<7?"warn":"ok"}">${this.t("xtra_days",{days:t??"—"})}</span>
    `}renderStat(e,t){const r=this.statContent(e,t);return r?q`
      <div class="stat">
        <div class="stat-icon"><ha-icon icon=${r.icon}></ha-icon></div>
        <div class="stat-body">
          <span class="stat-value">${r.value}</span>
          ${r.caption?q`<span class="stat-caption">${r.caption}</span>`:W}
          <span class="stat-label">${this.t(r.labelKey)}</span>
        </div>
      </div>
    `:W}renderFooter(){return q`
      <div class="account-footer">
        ${this.renderLastOrderLine()}
        <div class="footer-row">
          ${this.renderFreshness()}
          <button
            class="btn ghost icon-btn"
            ?disabled=${this.refreshing}
            @click=${this.onRefresh}
            title=${this.t("refresh")}
          >
            <ha-icon icon="mdi:refresh" class=${be({spin:this.refreshing})}></ha-icon>
          </button>
        </div>
      </div>
      ${this.refreshError?this.renderError(this.refreshError):W}
    `}renderLastOrderLine(){const e=Ee(this.state("last_order")?.state);if(!e)return W;const t=this.attr("last_order","Items"),r=this.attr("last_order","Price"),i=new Intl.DateTimeFormat(this.hass.locale?.language||"en",{day:"numeric",month:"short"}).format(e),s=[`${this.t("last_order")} ${i}`];return"number"==typeof t&&s.push(this.t("items_count",{count:t})),"number"==typeof r&&s.push(this.money(r)),q`<div class="last-order">${s.join(" · ")}</div>`}};fr.styles=[We,hr],e([ge()],fr.prototype,"refreshing",void 0),e([ge()],fr.prototype,"refreshError",void 0),fr=e([de("rohlik-account-card")],fr),Ye({type:"rohlik-account-card",name:"Rohlík.cz Account",description:"Xtra membership status, credit, bags and account perks at a glance.",preview:!0});const vr=["l0","l1","l2","l3","items"],yr=["month","year","all"],_r=["auto","years","months","none"];function br(e){return"all"===e?"all":"year"}const wr={l0:{year:"categories_l0_this_year",all:"categories_l0_all_time"},l1:{year:"categories_this_year",all:"categories_all_time"},l2:{year:"categories_l2_this_year",all:"categories_l2_all_time"},l3:{year:"categories_l3_this_year",all:"categories_l3_all_time"},items:{year:"items_this_year",all:"items_all_time"}};function xr(e,t){return wr[e][t]}function $r(e){if("number"==typeof e&&Number.isFinite(e))return e;if("string"==typeof e&&""!==e.trim()){const t=Number(e);if(Number.isFinite(t))return t}}function kr(e,t){if(!e||"object"!=typeof e)return[];const r=e[t];if(!Array.isArray(r))return[];const i=[];for(const e of r){if(!e||"object"!=typeof e)continue;const t=e,r=t.start,s="number"==typeof r||"string"==typeof r?new Date(r):null;if(!s||Number.isNaN(s.getTime()))continue;const n=$r(t.state)??$r(t.max)??$r(t.mean);void 0!==n&&i.push({month:s,total:n})}return i.sort((e,t)=>e.month.getTime()-t.month.getTime()),i}function Ar(e){return`${e.getFullYear()}-${e.getMonth()}`}const Sr={cs:{title:"Útraty",not_found:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",period_month:"Tento měsíc",period_year:"Letos",period_all:"Celkem",avg_order:"průměrná objednávka",orders_count:"{n} {n:objednávka|objednávky|objednávek}",level_l0:"Hlavní",level_l1:"Kategorie",level_l2:"Podrobné",level_l3:"Nejpodrobnější",level_items:"Položky",expand_row:"{units} ks · {avg} za kus",enable_hint:"Rozpis zobrazíte zapnutím Analýzy útrat v nastavení integrace.",enriched:"obohaceno {enriched} z {total} objednávek",breakdown_year_hint:"Rozpis za rok {year} (měsíční kategorie nejsou k dispozici)",monthly_history_hint:"Měsíční historie vyžaduje recorder"},en:{title:"Spending",not_found:"Rohlík.cz entities not found on this device",period_month:"This month",period_year:"This year",period_all:"All time",avg_order:"avg order",orders_count:"{n} {n:order|orders}",level_l0:"Top",level_l1:"Categories",level_l2:"Detailed",level_l3:"Specific",level_items:"Items",expand_row:"{units} units · {avg} per unit",enable_hint:"Enable Spending Analytics in the integration options to see a breakdown.",enriched:"{enriched} of {total} orders enriched",breakdown_year_hint:"Breakdown shown for {year} (per-month categories are not available)",monthly_history_hint:"Monthly history needs the recorder"},de:{title:"Ausgaben",not_found:"Auf diesem Gerät wurden keine Rohlík-Entitäten gefunden",period_month:"Diesen Monat",period_year:"Dieses Jahr",period_all:"Gesamt",avg_order:"Ø Bestellung",orders_count:"{n} {n:Bestellung|Bestellungen}",level_l0:"Hauptgruppen",level_l1:"Kategorien",level_l2:"Detailliert",level_l3:"Am genauesten",level_items:"Artikel",expand_row:"{units} Stück · {avg} pro Stück",enable_hint:"Für die Aufschlüsselung die Ausgabenanalyse in den Optionen der Integration einschalten.",enriched:"{enriched} von {total} Bestellungen ausgewertet",breakdown_year_hint:"Aufschlüsselung für {year} (keine Kategorien pro Monat verfügbar)",monthly_history_hint:"Der Monatsverlauf braucht den Recorder"}},zr={cs:{device:"Zařízení",name:"Vlastní název",default_period:"Výchozí období",default_level:"Výchozí úroveň",top_n:"Počet položek",chart:"Graf",show_totals:"Zobrazit souhrn"},en:{device:"Device",name:"Custom name",default_period:"Default period",default_level:"Default level",top_n:"Row count",chart:"Chart",show_totals:"Show totals"},de:{device:"Gerät",name:"Eigener Name",default_period:"Standardzeitraum",default_level:"Standardebene",top_n:"Anzahl Zeilen",chart:"Diagramm",show_totals:"Summen anzeigen"}},Er=o`
  :host {
    container-type: inline-size;
    container-name: rohlik-spending;
  }

  /* Let the period pills drop under the title instead of squeezing it. */
  .header {
    flex-wrap: wrap;
  }

  .header .title {
    flex: 1 1 auto;
    min-width: 0;
  }

  @container rohlik-spending (max-width: 480px) {
    .header .segmented {
      flex-basis: 100%;
    }
  }

  @media (max-width: 480px) {
    .header .segmented {
      flex-basis: 100%;
    }
  }

  .segmented {
    display: inline-flex;
    padding: 2px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    gap: 2px;
  }

  .pill {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.78rem;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
    font-family: inherit;
    flex: 0 0 auto;
  }

  .pill.active {
    background: var(--rohlik-accent);
    color: var(--text-primary-color, #fff);
  }

  /* Level pills (L0..L3/Items) can outgrow the card — scroll rather than
     wrap into an awkward multi-row block. */
  .pills-row {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 6px;
    margin-bottom: 10px;
    scrollbar-width: thin;
  }

  .totals {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }

  @container rohlik-spending (max-width: 420px) {
    .totals {
      grid-template-columns: repeat(2, 1fr);
    }

    .totals-cell:last-child {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 420px) {
    .totals {
      grid-template-columns: repeat(2, 1fr);
    }

    .totals-cell:last-child {
      grid-column: 1 / -1;
    }
  }

  @container rohlik-spending (max-width: 280px) {
    .totals {
      grid-template-columns: 1fr;
    }

    .totals-cell:last-child {
      grid-column: auto;
    }
  }

  @media (max-width: 280px) {
    .totals {
      grid-template-columns: 1fr;
    }

    .totals-cell:last-child {
      grid-column: auto;
    }
  }

  .totals-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .totals-value {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .totals-caption {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chart-svg {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 118px;
    max-height: 118px;
    margin-bottom: 16px;
    overflow: visible;
  }

  .chart-svg text {
    font-family: inherit;
  }

  .chart-hint {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    padding: 4px 0 12px;
  }

  .breakdown-hint {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    padding: 8px 0;
  }

  .breakdown-year-hint {
    color: var(--secondary-text-color);
    font-size: 0.72rem;
    margin-bottom: 8px;
  }

  .breakdown-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 7px 0;
    border-bottom: 1px solid var(--divider-color);
    cursor: pointer;
  }

  .breakdown-row:last-child {
    border-bottom: none;
  }

  /* Fixed proportions rather than a shrink-to-fit flex row, so long names
     wrap onto a second line instead of being cut off mid-word. */
  .breakdown-main {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr) auto;
    grid-template-areas: "name bar amount";
    align-items: center;
    gap: 10px;
  }

  @container rohlik-spending (max-width: 420px) {
    .breakdown-main {
      grid-template-columns: 1fr auto;
      grid-template-areas:
        "name name"
        "bar amount";
      row-gap: 4px;
    }
  }

  @media (max-width: 420px) {
    .breakdown-main {
      grid-template-columns: 1fr auto;
      grid-template-areas:
        "name name"
        "bar amount";
      row-gap: 4px;
    }
  }

  .breakdown-name {
    grid-area: name;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--primary-text-color);
    font-size: 0.88rem;
    line-height: 1.25;
  }

  .breakdown-bar-track {
    grid-area: bar;
    height: 10px;
    border-radius: 5px;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    overflow: hidden;
  }

  .breakdown-bar-fill {
    display: block;
    height: 100%;
    border-radius: 5px;
    background: var(--rohlik-accent);
    opacity: 0.9;
  }

  .breakdown-spent {
    grid-area: amount;
    min-width: 64px;
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: var(--primary-text-color);
    font-size: 0.88rem;
  }

  .breakdown-expand {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .breakdown-footer {
    margin-top: 4px;
    color: var(--secondary-text-color);
    font-size: 0.72rem;
  }
`,Cr={cs:{month:"Tento měsíc",year:"Letos",all:"Celkem"},en:{month:"This month",year:"This year",all:"All time"},de:{month:"Diesen Monat",year:"Dieses Jahr",all:"Gesamt"}},Or={cs:{l0:"Hlavní",l1:"Kategorie",l2:"Podrobné",l3:"Nejpodrobnější",items:"Položky"},en:{l0:"Top",l1:"Categories",l2:"Detailed",l3:"Specific",items:"Items"},de:{l0:"Hauptgruppen",l1:"Kategorien",l2:"Detailliert",l3:"Am genauesten",items:"Artikel"}},Ir={cs:{auto:"Automaticky",years:"Roky",months:"Měsíce",none:"Žádný"},en:{auto:"Automatic",years:"Years",months:"Months",none:"None"},de:{auto:"Automatisch",years:"Jahre",months:"Monate",none:"Keins"}};let Rr=class extends $t{constructor(){super(...arguments),this.labels=zr,this.defaults={default_period:"year",default_level:"l1",top_n:10,chart:"auto",show_totals:!0}}extraSchema(){return[{name:"default_period",selector:{select:{mode:"dropdown",options:yr.map(e=>({value:e,label:Be(this.hass,Cr,e)}))}}},{name:"default_level",selector:{select:{mode:"dropdown",options:vr.map(e=>({value:e,label:Be(this.hass,Or,e)}))}}},{name:"top_n",selector:{number:{min:1,max:50,mode:"box"}}},{name:"chart",selector:{select:{mode:"dropdown",options:_r.map(e=>({value:e,label:Be(this.hass,Ir,e)}))}}},{name:"show_totals",selector:{boolean:{}}}]}};Rr=e([de("rohlik-spending-card-editor")],Rr);let Nr=class extends Ge{constructor(){super(...arguments),this.strings=Sr,this.expanded=new Set,this.monthlyError=!1,this.hasSensor=e=>void 0!==this.entityId(e)}static getConfigElement(){return document.createElement("rohlik-spending-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-spending-card"}}getCardSize(){return 6}getGridOptions(){return{columns:12,rows:12,min_columns:6,min_rows:5}}get effectivePeriod(){return this.period??this.config?.default_period??"year"}resolveChart(e){const t=this.config?.chart??"auto";return"auto"!==t?t:!1===this.config?.show_years?"none":"month"===e?"months":"years"}get levelsForCurrentPeriod(){return e=this.hasSensor,t=br(this.effectivePeriod),vr.filter(r=>e(xr(r,t)));var e,t}get hasAnyAnalytics(){return vr.some(e=>this.hasSensor(xr(e,"year"))||this.hasSensor(xr(e,"all")))}get effectiveLevel(){const e=this.levelsForCurrentPeriod;if(0===e.length)return;const t=this.level??this.config?.default_level??"l1";return e.includes(t)?t:e[0]}render(){if(!this.config)return W;if(!this.state("monthly_spent"))return q`<ha-card style=${$e(this.accentStyle)}>
        ${this.renderError(this.t("not_found"))}
      </ha-card>`;const e=this.effectivePeriod,t=!1!==this.config.show_totals,r=this.resolveChart(e);return q`
      <ha-card style=${$e(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
          <span class="title">${this.t("title")}</span>
          <div class="segmented">
            <button
              class=${be({pill:!0,active:"month"===e})}
              type="button"
              @click=${()=>this.period="month"}
            >
              ${this.t("period_month")}
            </button>
            <button
              class=${be({pill:!0,active:"year"===e})}
              type="button"
              @click=${()=>this.period="year"}
            >
              ${this.t("period_year")}
            </button>
            <button
              class=${be({pill:!0,active:"all"===e})}
              type="button"
              @click=${()=>this.period="all"}
            >
              ${this.t("period_all")}
            </button>
          </div>
        </div>

        ${t?this.renderTotals(e):W}
        ${"years"===r?this.renderYearsChart():W}
        ${"months"===r?this.renderMonthsChart():W}
        ${this.renderBreakdown(e)}
        ${this.renderFreshness()}
      </ha-card>
    `}updated(e){super.updated(e),this.maybeFetchMonthly()}maybeFetchMonthly(){if(!this.config||!this.hass)return;if("months"!==this.resolveChart(this.effectivePeriod))return;const e=this.entityId("monthly_spent");if(!e)return;const t=new Date,r=`${t.getFullYear()}-${t.getMonth()}`,i=`${e}:${r}`;if(this.monthlyFetchKey===i)return;this.monthlyFetchKey=i;const s=new Date(t.getFullYear(),t.getMonth()-11,1);this.hass.callWS({type:"recorder/statistics_during_period",start_time:s.toISOString(),end_time:t.toISOString(),statistic_ids:[e],period:"month",units:{},types:["state"]}).then(t=>{this.monthly={entityId:e,monthKey:r,stats:kr(t,e)},this.monthlyError=!1}).catch(()=>{this.monthlyError=!0})}renderTotals(e){const t=this.state("monthly_spent"),r=Number(t?.state),i=new Intl.DateTimeFormat(Ce(this.hass),"month"===e?{month:"long",year:"numeric"}:{month:"long"}).format(new Date),s=this.state("yearly_spent"),n=Number(s?.state),o=s?.attributes?.year,a=Number(s?.attributes?.order_count??0),l=void 0!==o?`${o} · ${this.t("orders_count",{n:a})}`:this.t("orders_count",{n:a});let c,h;if("year"===e)c=Number(s?.attributes?.average_order_value),h=this.t("avg_order");else{const e=this.state("alltime_spent");c=Number(e?.attributes?.average_order_value);const t=Number(e?.attributes?.order_count??0);h=this.t("orders_count",{n:t})}return q`
      <div class="totals">
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(r)?this.money(r):"–"}
          </div>
          <div class="totals-caption">${i}</div>
        </div>
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(n)?this.money(n):"–"}
          </div>
          <div class="totals-caption">${l}</div>
        </div>
        <div class="totals-cell">
          <div class="totals-value">
            ${void 0!==c&&Number.isFinite(c)?this.money(c):"–"}
          </div>
          <div class="totals-caption">${h}</div>
        </div>
      </div>
    `}renderYearsChart(){const e=function(e){if(!e||"object"!=typeof e)return[];const t=[];for(const[r,i]of Object.entries(e)){const e=Number(r);if(!Number.isFinite(e))continue;if(!i||"object"!=typeof i)continue;const s=i;t.push({year:e,total:$r(s.total)??0,orderCount:$r(s.order_count)??0})}return t.sort((e,t)=>e.year-t.year),t}(this.state("alltime_spent")?.attributes?.by_year);if(e.length<2)return W;const t=(new Date).getFullYear();return this.renderBarChart(e.map(e=>({key:String(e.year),label:String(e.year),total:e.total,highlighted:e.year===t})))}renderMonthsChart(){const e=this.entityId("monthly_spent");if(!e)return W;if(this.monthlyError)return q`<div class="chart-hint">${this.t("monthly_history_hint")}</div>`;if(!this.monthly||this.monthly.entityId!==e)return W;const t=new Date,r=Number(this.state("monthly_spent")?.state),i=function(e,t,r){const i=new Map;for(const t of e)i.set(Ar(t.month),t.total);const s=[];for(let e=11;e>=0;e--){const n=new Date(t.getFullYear(),t.getMonth()-e,1),o=0===e&&void 0!==r&&Number.isFinite(r)?r:i.get(Ar(n))??0;s.push({month:n,total:o})}return s}(this.monthly.stats,t,Number.isFinite(r)?r:void 0),s=new Intl.DateTimeFormat(Ce(this.hass),{month:"short"});return this.renderBarChart(i.map((e,t)=>({key:`${e.month.getFullYear()}-${e.month.getMonth()}`,label:s.format(e.month),total:e.total,highlighted:t===i.length-1})))}renderBarChart(e){if(e.length<2)return W;const t=e.reduce((e,t)=>Math.max(e,t.total),0)||1,r=40*e.length-12+12;return q`
      <svg
        class="chart-svg"
        viewBox="0 0 ${r} ${118}"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        ${Ht(e,e=>e.key,(e,r)=>{const i=Math.max(2,e.total/t*90),s=6+40*r,n=90-i+6,o=e.highlighted?"var(--rohlik-accent)":"color-mix(in srgb, var(--primary-text-color) 15%, transparent)";return K`
              <rect x=${s} y=${n} width=${28} height=${i} rx="4" fill=${o}>
                <title>${this.money(e.total)}</title>
              </rect>
              <text
                x=${s+14}
                y=${112}
                text-anchor="middle"
                font-size="10.5"
                fill="var(--secondary-text-color)"
              >
                ${e.label}
              </text>
            `})}
      </svg>
    `}renderBreakdown(e){if(!this.hasAnyAnalytics)return q`<div class="breakdown-hint">${this.t("enable_hint")}</div>`;const t=br(e),r=this.levelsForCurrentPeriod,i=this.effectiveLevel;if(!i)return W;const s=this.config.top_n??10,n=this.state(xr(i,t)),{entries:o,enrichedOrders:a,totalOrders:l}=function(e,t){const r=e?.attributes??{},i=r.categories??r.items,s=Array.isArray(i)?i:[],n=[];for(const e of s){if(!e||"object"!=typeof e)continue;const t=e,r="string"==typeof t.name&&""!==t.name.trim()?t.name:void 0,i=$r(t.spent);r&&void 0!==i&&n.push({name:r,spent:i,units:$r(t.units)??0,avgUnitPrice:$r(t.avg_unit_price)??0,id:"string"==typeof t.id||"number"==typeof t.id?t.id:void 0})}n.sort((e,t)=>t.spent-e.spent);const o=$r(r.total_count)??n.length,a=$r(r.enriched_orders),l=$r(r.total_orders);return{entries:n.slice(0,Math.max(0,t)),totalCount:o,enrichedOrders:a,totalOrders:l}}(n,s),c=function(e){const t=e.reduce((e,t)=>Math.max(e,t.spent),0);return t<=0?e.map(()=>0):e.map(e=>Math.max(0,Math.min(100,e.spent/t*100)))}(o),h=this.state("yearly_spent")?.attributes?.year??(new Date).getFullYear();return q`
      ${"month"===e?q`<div class="breakdown-year-hint">
            ${this.t("breakdown_year_hint",{year:h})}
          </div>`:W}
      ${r.length>1?q`
            <div class="pills-row">
              ${Ht(r,e=>e,e=>q`
                  <button
                    class=${be({pill:!0,active:i===e})}
                    type="button"
                    @click=${()=>this.level=e}
                  >
                    ${this.t(`level_${e}`)}
                  </button>
                `)}
            </div>
          `:W}
      ${Ht(o,e=>e.id??e.name,(e,t)=>this.renderBreakdownRow(e,c[t]))}
      ${void 0!==a&&void 0!==l?q`
            <div class="breakdown-footer">
              ${this.t("enriched",{enriched:a,total:l})}
            </div>
          `:W}
    `}renderBreakdownRow(e,t){const r=String(e.id??e.name),i=this.expanded.has(r);return q`
      <div
        class="breakdown-row"
        @click=${()=>this.toggleExpanded(r)}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.toggleExpanded(r))}}
        role="button"
        tabindex="0"
      >
        <div class="breakdown-main">
          <span class="breakdown-name">${e.name}</span>
          <span class="breakdown-bar-track">
            <span
              class="breakdown-bar-fill"
              style=${$e({width:`${t}%`})}
            ></span>
          </span>
          <span class="breakdown-spent">${this.money(e.spent)}</span>
        </div>
        ${i?q`
              <div class="breakdown-expand">
                ${this.t("expand_row",{units:e.units,avg:this.money(e.avgUnitPrice)})}
              </div>
            `:W}
      </div>
    `}toggleExpanded(e){const t=new Set(this.expanded);t.has(e)?t.delete(e):t.add(e),this.expanded=t}};Nr.styles=[We,Er],e([ge()],Nr.prototype,"period",void 0),e([ge()],Nr.prototype,"level",void 0),e([ge()],Nr.prototype,"expanded",void 0),e([ge()],Nr.prototype,"monthly",void 0),e([ge()],Nr.prototype,"monthlyError",void 0),Nr=e([de("rohlik-spending-card")],Nr),Ye({type:"rohlik-spending-card",name:"Rohlík.cz Spending",description:"Monthly, yearly and all-time spending totals with a category breakdown."});
