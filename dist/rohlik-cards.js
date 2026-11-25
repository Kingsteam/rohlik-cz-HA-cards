function e(e,t,i,r){var s,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(i,e,r)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(e,t)=>e,w={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},_=(e,t)=>!l(e,t),b={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const n=r?.call(this);s?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:w;this._$Em=r;const n=s.fromAttribute(t,e.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const n=this.constructor;if(!1===r&&(s=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??_)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,k=e=>e,S=$.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,z="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,I=`<${C}>`,O=document,D=()=>O.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,R="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,j=/>/g,U=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,F=/"/g,H=/^(?:script|style|textarea|title)$/i,q=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),B=q(1),K=q(2),Z=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,V=O.createTreeWalker(O,129);function Q(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}class Y{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,n=0;const o=e.length-1,a=this.parts,[l,c]=((e,t)=>{const i=e.length-1,r=[];let s,n=2===t?"<svg>":3===t?"<math>":"",o=M;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===M?"!--"===l[1]?o=P:void 0!==l[1]?o=j:void 0!==l[2]?(H.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=U):void 0!==l[3]&&(o=U):o===U?">"===l[0]?(o=s??M,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?U:'"'===l[3]?F:L):o===F||o===L?o=U:o===P||o===j?o=M:(o=U,s=void 0);const h=o===U&&e[t+1].startsWith("/>")?" ":"";n+=o===M?i+I:c>=0?(r.push(a),i.slice(0,c)+z+i.slice(c)+E+h):i+E+(-2===c?t:h)}return[Q(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]})(e,t);if(this.el=Y.createElement(l,i),V.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=V.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(z)){const t=c[n++],i=r.getAttribute(e).split(E),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?ie:"?"===o[1]?re:"@"===o[1]?se:te}),r.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:s}),r.removeAttribute(e));if(H.test(r.tagName)){const e=r.textContent.split(E),t=e.length-1;if(t>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],D()),V.nextNode(),a.push({type:2,index:++s});r.append(e[t],D())}}}else if(8===r.nodeType)if(r.data===C)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(E,e+1));)a.push({type:7,index:s}),e+=E.length-1}s++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,r){if(t===Z)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const n=N(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=J(e,s._$AS(e,t.values),s,r)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??O).importNode(t,!0);V.currentNode=r;let s=V.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new ee(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new ne(s,this,e)),this._$AV.push(t),a=i[++o]}n!==a?.index&&(s=V.nextNode(),n++)}return V.currentNode=O,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),N(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==Z&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new X(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new Y(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new ee(this.O(D()),this.O(D()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,r){const s=this.strings;let n=!1;if(void 0===s)e=J(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==Z,n&&(this._$AH=e);else{const r=e;let o,a;for(e=s[0],o=0;o<s.length-1;o++)a=J(this,r[i+o],t,o),a===Z&&(a=this._$AH[o]),n||=!N(a)||a!==this._$AH[o],a===W?e=W:e!==W&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!r&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class re extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends te{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??W)===Z)return;const i=this._$AH,r=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==W&&(i===W||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe={I:ee},ae=$.litHtmlPolyfillSupport;ae?.(Y,ee),($.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ce=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new ee(t.insertBefore(D(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:_},pe=(e=ue,t,i)=>{const{kind:r,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
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
const fe=1,ve=2,ye=e=>(...t)=>({_$litDirective$:e,values:t});let we=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=ye(class extends we{constructor(e){if(super(e),e.type!==fe||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const i=e.element.classList;for(const e of this.st)e in t||(i.remove(e),this.st.delete(e));for(const e in t){const r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return Z}}),be="important",xe=" !"+be,$e=ye(class extends we{constructor(e){if(super(e),e.type!==fe||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const r=e[i];return null==r?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(const e in t){const r=t[e];if(null!=r){this.ft.add(e);const t="string"==typeof r&&r.endsWith(xe);e.includes("-")||t?i.setProperty(e,t?r.slice(0,-11):r,t?be:""):i[e]=r}}return Z}}),ke="rohlikcz";
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Se(e){const t=new Set;for(const i of Object.values(e.entities??{}))i.platform===ke&&i.device_id&&t.add(i.device_id);const i=[];for(const r of t){const t=e.devices?.[r];t&&i.push(t)}return i}const Ae=new Map;function ze(e,t){const i=e.entities??{},r=Ae.get(t);if(r&&r.entitiesRef===i)return r.map;const s=new Map;for(const e of Object.values(i))e.platform===ke&&e.device_id===t&&e.translation_key&&s.set(e.translation_key,e.entity_id);return Ae.set(t,{entitiesRef:i,map:s}),s}function Ee(e){if(!e||"unknown"===e||"unavailable"===e)return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:t}function Ce(e){return e.locale?.language||e.language||"en"}function Ie(e,t,i="CZK"){const r=Ce(e);if("CZK"===i){return`${new Intl.NumberFormat(r,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)} Kč`}try{return new Intl.NumberFormat(r,{style:"currency",currency:i,currencyDisplay:"narrowSymbol"}).format(t)}catch{return`${new Intl.NumberFormat(r).format(t)} ${i}`}}function Oe(e,t){return new Intl.DateTimeFormat(Ce(e),{hour:"2-digit",minute:"2-digit",hour12:!1}).format(t)}function De(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function Ne(e,t,i){const r=Ce(e),s=Oe(e,t),n=new Date;if(De(t,n))return`${i.today} ${s}`;const o=new Date(n);if(o.setDate(n.getDate()+1),De(t,o))return`${i.tomorrow} ${s}`;return`${new Intl.DateTimeFormat(r,{weekday:"short",day:"numeric",month:"short"}).format(t)} ${s}`}const Te={en:{future:["in ",""],past:[""," ago"]},cs:{future:["za ",""],past:["před ",""]},de:{future:["in ",""],past:["vor ",""]}};function Re(e,t){const i=e.slice(0,2).toLowerCase();return(Te[i]??Te.en)[t]}function Me(e,t,i){const r=i.replace(/s$/,"");return new Intl.NumberFormat(e,{style:"unit",unit:r,unitDisplay:"short"}).format(t)}function Pe(e,t,i){return`${e}${t}${i}`}function je(e,t){const i=Ce(e),[r,s]=Re(i,"past"),n=Math.max(0,Math.round((Date.now()-t.getTime())/1e3)),o=Math.round(n/60);if(n<60)return Pe(r,Me(i,n,"seconds"),s);if(o<60)return Pe(r,Me(i,o,"minutes"),s);const a=Math.round(o/60);if(a<24)return Pe(r,Me(i,a,"hours"),s);return Pe(r,Me(i,Math.round(a/24),"days"),s)}const Ue={cz:{name:"Rohlík.cz",url:"https://www.rohlik.cz",checkoutUrl:"https://www.rohlik.cz/kosik",currency:"CZK"},de:{name:"Knuspr.de",url:"https://www.knuspr.de",checkoutUrl:"https://www.knuspr.de",currency:"EUR"},at:{name:"Gurkerl.at",url:"https://www.gurkerl.at",checkoutUrl:"https://www.gurkerl.at",currency:"EUR"},hu:{name:"Kifli.hu",url:"https://www.kifli.hu",checkoutUrl:"https://www.kifli.hu",currency:"HUF"},ro:{name:"Sezamo.ro",url:"https://www.sezamo.ro",checkoutUrl:"https://www.sezamo.ro",currency:"RON"}},Le=Ue.cz;function Fe(e){return e.normalize("NFD").replace(/[̀-ͯ]/g,"").trim().toLowerCase()}function He(e,t){const i=t?e?.devices?.[t]:void 0;return function(e){if(!e)return Le;const t=Fe(e);return Object.values(Ue).find(e=>Fe(e.name)===t)??Le}(i?.manufacturer)}function qe(e,t,i,r){const s=Ce(e).slice(0,2).toLowerCase(),n=t[s]?.[i]??t.en?.[i]??i;return r?n.replace(/\{(\w+)(?::([^{}]+))?\}/g,(e,t,i)=>Object.prototype.hasOwnProperty.call(r,t)?void 0===i?String(r[t]):function(e,t,i){if(t.length<2||Number.isNaN(i))return t[t.length-1]??"";const r=new Intl.PluralRules(e).select(i);return 2===t.length?"one"===r?t[0]:t[1]:"one"===r?t[0]:"few"===r?t[1]:t[t.length-1]}(s,i.split("|"),Number(r[t])):e):n}const Be={cs:{today:"Dnes",tomorrow:"Zítra",updated_ago:"Aktualizováno {time}",refresh:"Obnovit",unavailable:"Nedostupné",error_generic:"Něco se nepovedlo",show_all:"Zobrazit vše ({count})",show_less:"Zobrazit méně",items:"položek",items_count:"{count} {count:položka|položky|položek}",free:"zdarma"},en:{today:"Today",tomorrow:"Tomorrow",updated_ago:"Updated {time}",refresh:"Refresh",unavailable:"Unavailable",error_generic:"Something went wrong",show_all:"Show all ({count})",show_less:"Show less",items:"items",items_count:"{count} {count:item|items}",free:"free"},de:{today:"Heute",tomorrow:"Morgen",updated_ago:"Aktualisiert {time}",refresh:"Aktualisieren",unavailable:"Nicht verfügbar",error_generic:"Etwas ist schiefgelaufen",show_all:"Alle anzeigen ({count})",show_less:"Weniger anzeigen",items:"Artikel",items_count:"{count} {count:Artikel|Artikel}",free:"kostenlos"}},Ke=["cs","en","de"];function Ze(e,t){return t&&Ke.includes(t)?Ce(e).slice(0,2).toLowerCase()===t?e:{...e,language:t,locale:{...e.locale??{},language:t}}:e}const We=o`
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
`;class Ge extends ce{constructor(){super(...arguments),this.entities=new Map}get hass(){return this._localeHass??this._hass}set hass(e){const t=this.hass;this._hass=e,this._localeHass=this.applyLanguage(e),this.requestUpdate("hass",t)}get rawHass(){return this._hass}applyLanguage(e){if(!e||!this.config?.language||"auto"===this.config.language)return;const t=Ze(e,this.config.language);return t===e?void 0:t}setConfig(e){if(!e?.device)throw new Error("Rohlík card: 'device' is required — pick the Rohlík.cz device in the card editor.");this.config=e,this._localeHass=this.applyLanguage(this._hass),this.hass&&(this.entities=ze(this.hass,this.config.device))}willUpdate(e){e.has("hass")&&this.hass&&this.config&&(this.entities=ze(this.hass,this.config.device))}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:4,min_columns:6,min_rows:2}}static getStubConfig(e){const t=Se(e);return{device:t[0]?.id??""}}entityId(e){return this.entities.get(e)}state(e){const t=this.entityId(e);return t?this.hass?.states?.[t]:void 0}attr(e,t){return this.state(e)?.attributes?.[t]}isOn(e){return"on"===this.state(e)?.state}deviceName(){if(this.config?.name)return this.config.name;const e=this.hass?.devices?.[this.config?.device];return e?.name_by_user||e?.name||"Rohlík.cz"}shop(){return He(this.hass,this.config?.device)}money(e){return Ie(this.hass,e,this.shop().currency)}get accentStyle(){return this.config?.accent?{"--rohlik-accent":this.config.accent}:{}}t(e,t){return qe(this.hass,{...Be,...this.mergedStrings()},e,t)}mergedStrings(){const e={};for(const t of new Set([...Object.keys(Be),...Object.keys(this.strings)]))e[t]={...Be[t],...this.strings[t]};return e}renderFreshness(e="updated"){const t=Ee(this.state(e)?.state);if(!t)return W;const i=Date.now()-t.getTime()>12e5;return B`
      <div class="footer ${i?"stale":""}">
        ${this.t("updated_ago",{time:je(this.hass,t)})}
      </div>
    `}renderError(e){return B`<div class="error">${e}</div>`}}Ge.styles=We,e([me({attribute:!1})],Ge.prototype,"hass",null),e([ge()],Ge.prototype,"config",void 0),e([ge()],Ge.prototype,"entities",void 0);let Ve=!1;function Qe(){Ve||(Ve=!0,console.info("%c ROHLIK-CARDS %c v0.3.0 ","color: white; background: #d4145a; font-weight: 700;","color: #d4145a; background: white; font-weight: 700;"))}function Ye(e){Qe(),window.customCards=window.customCards??[],window.customCards.push({preview:!0,...e})}const Je=new Map;function Xe(e,t){const i=Je.get(t);if(i)return i;const r=e.callWS({type:"config/entity_registry/get",entity_id:t}).then(e=>e.config_entry_id).catch(e=>{throw Je.delete(t),e});return Je.set(t,r),r}async function et(e,t,i,r,s=!1){const n=await e.callService("rohlikcz",i,{config_entry_id:t,...r},void 0,!0,s);return s?n.response:void 0}function tt(e,t,i){const r=new CustomEvent(t,{detail:i,bubbles:!0,composed:!0});e.dispatchEvent(r)}function it(e,t){tt(e,"hass-more-info",{entityId:t})}function rt(e){return e.toString().padStart(2,"0")}function st(e){return`${rt(e.getHours())}:${rt(e.getMinutes())}`}function nt(e,t){const i=function(e,t){if(e.isOrdered)return e.since&&t.getTime()>=e.since.getTime()?"arriving":"ordered";const i=e.recentDelivery;if(i){const e=i.till??i.endedAt,r=Math.max(e.getTime(),i.endedAt.getTime());if(t.getTime()-r<=216e5)return"delivered"}return"none"}(e,t);let r=null;e.since&&e.till&&(r=`${st(e.since)}–${st(e.till)}`);let s=null;if("arriving"===i&&e.since&&e.till&&e.till.getTime()>e.since.getTime()){s=function(e){return Math.min(1,Math.max(0,e))}(((e.eta??t).getTime()-e.since.getTime())/(e.till.getTime()-e.since.getTime()))}const n="delivered"===i?e.lastOrderItems??null:e.orderData?.itemsCount??null,o="delivered"===i?e.lastOrderPrice??null:e.orderData?.priceComposition?.total?.amount??null,a=e.recentDelivery?e.recentDelivery.till??e.recentDelivery.endedAt:null,l=(e.slots??[]).filter(e=>null!=e.start).map(e=>({key:e.key,start:e.start,price:e.price??null}));return{state:i,since:e.since,till:e.till,eta:e.eta,progress:s,windowLabel:r,orderId:e.orderData?.id??null,summaryItems:n,summaryPrice:o,announcementText:e.announcementText??null,announcementExtra:e.announcementExtra??null,announcementUpdatedAt:e.announcementUpdatedAt??null,lastOrderAt:e.lastOrderAt??null,firstDeliveryText:e.firstDeliveryText??null,isReserved:e.isReserved,isExpressAvailable:e.isExpressAvailable,deliveredAt:a,slots:l}}const ot=/till|until|expir|end/i,at=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/;const lt=216e5;function ct(e){return`rohlik-delivery-last:${e}`}function dt(e,t){let i;try{i=e.getItem(ct(t))}catch{return null}if(!i)return null;try{const e=JSON.parse(i);return e&&"object"==typeof e?{orderId:e.orderId??null,till:"string"==typeof e.till?e.till:null,seenAt:"string"==typeof e.seenAt?e.seenAt:null,endedAt:"string"==typeof e.endedAt?e.endedAt:null}:null}catch{return null}}function ht(e,t,i){try{e.setItem(ct(t),JSON.stringify(i))}catch{}}function ut(e){if(!e.endedAt)return null;const t=new Date(e.endedAt);if(Number.isNaN(t.getTime()))return null;const i=e.till?new Date(e.till):null;return{orderId:e.orderId,till:i&&!Number.isNaN(i.getTime())?i:null,endedAt:t}}function pt(e,t,i,r=new Date){ht(e,t,{orderId:i.orderId,till:i.till?i.till.toISOString():null,seenAt:r.toISOString(),endedAt:null})}function mt(e,t){const i=dt(e,t);return i?ut(i):null}function gt(e,t,i){const r=dt(e,t);if(!r)return null;if(r.endedAt)return ut(r);if(function(e,t){const i=e.seenAt?new Date(e.seenAt):null;if(!i||Number.isNaN(i.getTime()))return!0;if(t.getTime()-i.getTime()>lt)return!0;const r=e.till?new Date(e.till):null;return!!(r&&!Number.isNaN(r.getTime())&&t.getTime()-r.getTime()>lt)}(r,i))return ft(e,t),null;const s={...r,endedAt:i.toISOString()};return ht(e,t,s),ut(s)}function ft(e,t){try{e.removeItem(ct(t))}catch{}}function vt(){try{if("undefined"!=typeof window&&window.localStorage)return window.localStorage}catch{}return{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}}const yt=o`
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
`,wt={cs:{title:"Příští rozvoz",chip_arriving:"Na cestě",chip_ordered:"Objednáno",chip_delivered:"Doručeno",chip_none:"Bez objednávky",chip_express:"Expres k dispozici",chip_reserved:"Rezervovaný termín",estimated:"odhad",by:"do",delivered_caption:"doručeno",nearest_slot:"Nejbližší termín",window:"Okno",order:"objednávka",announcement_updated:"Aktualizováno {time}",refresh_failed:"Obnovení se nezdařilo",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",reserved_until:"Rezervováno do {time}",shop_link:"Objednat znovu na {shop}",slot_express:"Expres",slot_standard:"Standard",slot_eco:"Eko"},en:{title:"Next delivery",chip_arriving:"Arriving",chip_ordered:"Ordered",chip_delivered:"Delivered",chip_none:"No order",chip_express:"Express available",chip_reserved:"Slot reserved",estimated:"estimated",by:"by",delivered_caption:"delivered",nearest_slot:"nearest slot",window:"Window",order:"order",announcement_updated:"Updated {time}",refresh_failed:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device",reserved_until:"Reserved until {time}",shop_link:"Order again on {shop}",slot_express:"Express",slot_standard:"Standard",slot_eco:"Eco"},de:{title:"Nächste Lieferung",chip_arriving:"Unterwegs",chip_ordered:"Bestellt",chip_delivered:"Geliefert",chip_none:"Keine Bestellung",chip_express:"Express verfügbar",chip_reserved:"Termin reserviert",estimated:"voraussichtlich",by:"bis",delivered_caption:"geliefert",nearest_slot:"nächster Termin",window:"Zeitfenster",order:"Bestellung",announcement_updated:"Aktualisiert {time}",refresh_failed:"Aktualisieren fehlgeschlagen",no_entities:"Auf diesem Gerät wurden keine Rohlík-Entitäten gefunden",reserved_until:"Reserviert bis {time}",shop_link:"Wieder bei {shop} bestellen",slot_express:"Express",slot_standard:"Standard",slot_eco:"Öko"}},_t={cs:{device:"Zařízení",name:"Vlastní název",show_announcement:"Zobrazit oznámení kurýra",show_order_summary:"Zobrazit shrnutí objednávky",show_express_chip:"Zobrazit chip Expres",show_refresh:"Zobrazit tlačítko Obnovit",show_slots:"Zobrazit termíny",show_shop_link:"Odkaz na obchod",compact:"Kompaktní zobrazení",show_items:"Zobrazit položky objednávky"},en:{device:"Device",name:"Custom name",show_announcement:"Show courier announcement",show_order_summary:"Show order summary",show_express_chip:"Show express chip",show_refresh:"Show refresh button",show_slots:"Show upcoming slots",show_shop_link:"Show shop link",compact:"Compact layout",show_items:"Show the order's items"},de:{device:"Gerät",name:"Eigener Name",show_announcement:"Meldung des Boten anzeigen",show_order_summary:"Zusammenfassung der Bestellung anzeigen",show_express_chip:"Hinweis „Express“ anzeigen",show_refresh:"Taste „Aktualisieren“ anzeigen",show_slots:"Liefertermine anzeigen",show_shop_link:"Link zum Shop anzeigen",show_items:"Artikel der Bestellung anzeigen",compact:"Kompakte Ansicht"}},bt=[{name:"device",required:!0,selector:{device:{integration:"rohlikcz"}}},{name:"name",selector:{text:{}}},{name:"language",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (Home Assistant)"},{value:"cs",label:"Čeština"},{value:"en",label:"English"},{value:"de",label:"Deutsch"}]}}}],xt={cs:{device:"Zařízení (účet Rohlík.cz)",name:"Vlastní název",language:"Jazyk karty"},en:{device:"Device (Rohlík.cz account)",name:"Custom name",language:"Card language"},de:{device:"Gerät (Rohlík-Konto)",name:"Eigener Name",language:"Sprache der Karte"}};class $t extends ce{constructor(){super(...arguments),this.defaults={},this.computeLabel=e=>{const t={};for(const e of new Set([...Object.keys(xt),...Object.keys(this.labels)]))t[e]={...xt[e],...this.labels[e]};return qe(this.hass,t,e.name)||e.name},this.onValueChanged=e=>{e.stopPropagation();const t={...this.config,...e.detail.value};"auto"!==t.language&&""!==t.language||delete t.language;for(const[e,i]of Object.entries(this.defaults))e in t&&t[e]===i&&delete t[e];tt(this,"config-changed",{config:t})}}setConfig(e){this.config=e}get schema(){return[...bt,...this.extraSchema()]}get formData(){return{language:"auto",...this.defaults,...this.config}}render(){return this.hass&&this.config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    `:W}}e([ge()],$t.prototype,"hass",void 0),e([ge()],$t.prototype,"config",void 0);let kt=class extends $t{constructor(){super(...arguments),this.labels=_t,this.defaults={show_announcement:!0,show_order_summary:!0,show_express_chip:!0,show_refresh:!0,show_slots:!0,show_shop_link:!0,show_items:!0,compact:!1}}extraSchema(){return[{name:"show_announcement",selector:{boolean:{}}},{name:"show_order_summary",selector:{boolean:{}}},{name:"show_express_chip",selector:{boolean:{}}},{name:"show_refresh",selector:{boolean:{}}},{name:"show_slots",selector:{boolean:{}}},{name:"show_shop_link",selector:{boolean:{}}},{name:"show_items",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}}]}};kt=e([he("rohlik-delivery-card-editor")],kt);const St={arriving:"ok",ordered:"neutral",delivered:"ok",none:"neutral"},At=["express","standard","eco"],zt={express:"mdi:lightning-bolt",standard:"mdi:truck-delivery",eco:"mdi:leaf"};let Et=class extends Ge{constructor(){super(...arguments),this.strings=wt,this.refreshing=!1,this.refreshError=null,this.itemsExpanded=!1,this.onHeaderTap=()=>{if(this.tapDisabled)return;const e=this.entityId("is_ordered");e&&it(this,e)},this.onHeaderKeydown=e=>{this.tapDisabled||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.onHeaderTap())},this.onRefresh=async e=>{if(e.stopPropagation(),this.refreshing)return;const t=this.entityId("is_ordered");if(t){this.refreshing=!0,this.refreshError=null;try{const e=await Xe(this.hass,t);if(!e)throw new Error("no config entry");const i=this.getView(),r="arriving"===i.state||"ordered"===i.state?"update_delivery_times":"refresh_slots";await et(this.hass,e,r)}catch{this.refreshError=this.t("refresh_failed")}finally{this.refreshing=!1}}}}static getConfigElement(){return document.createElement("rohlik-delivery-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-delivery-card"}}connectedCallback(){super.connectedCallback(),this.tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this.tickTimer&&(clearInterval(this.tickTimer),this.tickTimer=void 0)}getCardSize(){return this.config?.compact?2:4}getGridOptions(){return this.config?.compact?{columns:6,rows:2,min_columns:6,min_rows:2}:{columns:12,rows:6,min_columns:6,min_rows:3}}textState(e){const t=this.state(e)?.state;return t&&"unknown"!==t&&"unavailable"!==t?t:null}syncMemory(e){const t=this.config?.device;if(!t)return null;const i=vt(),r=this.state("is_ordered")?.state;if("on"!==r&&"off"!==r)return mt(i,t);if(this.isOn("is_ordered")){const r=e?.id??null,s=mt(i,t);return s&&null!=r&&s.orderId!==r&&ft(i,t),pt(i,t,{orderId:r,till:Ee(this.state("next_order_till")?.state)}),null}return gt(i,t,new Date)}buildInput(){const e=this.attr("is_ordered","order_data")??null;return{isOrdered:this.isOn("is_ordered"),since:Ee(this.state("next_order_since")?.state),till:Ee(this.state("next_order_till")?.state),eta:Ee(this.state("delivery_time")?.state),orderData:e,announcementText:this.textState("delivery_info"),announcementExtra:this.attr("delivery_info","Additional Content")??null,announcementUpdatedAt:Ee(this.attr("delivery_info","Updated At")),lastOrderAt:Ee(this.state("last_order")?.state),lastOrderItems:this.attr("last_order","Items")??null,lastOrderPrice:this.attr("last_order","Price")??null,firstDeliveryText:this.textState("first_delivery"),isReserved:this.isOn("is_reserved"),isExpressAvailable:this.isOn("is_express_available"),recentDelivery:this.syncMemory(e),slots:At.map(e=>({key:e,start:Ee(this.state(`${e}_slot`)?.state),price:this.attr(`${e}_slot`,"Price")??null}))}}getView(){return nt(this.buildInput(),new Date)}get tapDisabled(){const e=this.config?.tap_action;return"none"===e||!(!e||"object"!=typeof e||"none"!==e.action)}render(){if(!this.config)return W;if(!this.entityId("is_ordered"))return B`
        <ha-card style=${$e(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const e=this.getView();return B`
      <ha-card style=${$e(this.accentStyle)}>
        ${this.config.compact?this.renderCompact(e):this.renderFull(e)}
      </ha-card>
    `}renderChips(e){const t=!1!==this.config.show_express_chip&&e.isExpressAvailable,i="none"===e.state&&e.isReserved;return B`
      <div class="chips">
        <span class="chip ${St[e.state]}">${this.t(`chip_${e.state}`)}</span>
        ${t?B`<span class="chip warn">${this.t("chip_express")}</span>`:W}
        ${i?B`<span class="chip neutral">${this.t("chip_reserved")}</span>`:W}
      </div>
    `}renderCompact(e){return B`
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
        <span class="chip ${St[e.state]}">${this.t(`chip_${e.state}`)}</span>
      </div>
    `}renderFull(e){const t=!1!==this.config.show_announcement&&("arriving"===e.state||"ordered"===e.state)&&!!e.announcementText,i=!1!==this.config.show_order_summary&&null!=e.summaryItems,r=!1!==this.config.show_refresh,s=!("arriving"!==e.state&&"ordered"!==e.state||!e.since||!e.till),n=!1!==this.config.show_slots&&"none"===e.state&&e.slots.length>0,o=!1!==this.config.show_shop_link&&"delivered"===e.state,a=!1===this.config.show_items||"arriving"!==e.state&&"ordered"!==e.state?[]:function(e){if(!Array.isArray(e))return[];const t=[];for(const i of e){if(!i||"object"!=typeof i)continue;const e=i,r="string"==typeof e.name?e.name.trim():"";if(!r)continue;const s=Number(e.quantity),n={name:r,quantity:Number.isFinite(s)&&s>0?s:1};"string"==typeof e.textual_amount&&e.textual_amount.trim()&&(n.amount=e.textual_amount.trim()),"string"==typeof e.image&&/^https?:\/\//i.test(e.image)&&(n.image=e.image),t.push(n)}return t}(this.attr("is_ordered","items")),l=this.shop(),c="none"===e.state&&e.isReserved?function(e){if(!e)return null;for(const[t,i]of Object.entries(e)){if(!ot.test(t))continue;if("string"!=typeof i||!at.test(i))continue;const e=new Date(i);if(!Number.isNaN(e.getTime()))return e}return null}(this.state("is_reserved")?.attributes):null,d=this.headlineCaption(e);return B`
      <div
        class=${_e({header:!0,static:this.tapDisabled})}
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
      ${d?B`<div class="caption">${d}</div>`:W}

      ${s?B`<div class="sub">${this.renderSub(e)}</div>`:W}
      ${"arriving"===e.state?this.renderTrack(e):W}
      ${c?B`<div class="reserved-line">${this.t("reserved_until",{time:Oe(this.hass,c)})}</div>`:W}
      ${n?this.renderSlots(e):W}
      ${t?B`<div class="row">${this.renderAnnouncement(e)}</div>`:W}
      ${i?B`<div class="row">${this.renderSummary(e)}</div>`:W}
      ${a.length?this.renderItems(a):W}
      ${this.refreshError?B`<div class="error">${this.refreshError}</div>`:W}
      ${r||o?B`
            <div class="actions">
              ${o?B`
                    <a class="btn ghost" href=${l.url} target="_blank" rel="noopener">
                      ${this.t("shop_link",{shop:l.name})}
                    </a>
                  `:W}
              ${r?B`
                    <button class="btn ghost" ?disabled=${this.refreshing} @click=${this.onRefresh}>
                      <ha-icon
                        icon="mdi:refresh"
                        class=${_e({spin:this.refreshing})}
                      ></ha-icon>
                      ${this.t("refresh")}
                    </button>
                  `:W}
            </div>
          `:W}
      ${this.renderFreshness()}
    `}renderItems(e){const t=this.itemsExpanded?e:e.slice(0,5);return B`
      <div class="items">
        ${t.map(e=>B`
            <div class="row item-row">
              ${e.image?B`<img class="thumb" src=${e.image} alt="" loading="lazy" referrerpolicy="no-referrer" />`:B`<div class="thumb placeholder" aria-hidden="true"></div>`}
              <span class="item-qty">${e.quantity}×</span>
              <span class="item-name">${e.name}</span>
              ${e.amount?B`<span class="item-amount">${e.amount}</span>`:W}
            </div>
          `)}
      </div>
      ${e.length>5?B`
            <button class="btn ghost show-toggle" @click=${()=>this.itemsExpanded=!this.itemsExpanded}>
              ${this.itemsExpanded?this.t("show_less"):this.t("show_all",{count:e.length})}
            </button>
          `:W}
    `}renderSlots(e){return B`<div class="slots">${e.slots.map(e=>this.renderSlotRow(e))}</div>`}renderSlotRow(e){const t=Ne(this.hass,e.start,{today:this.t("today"),tomorrow:this.t("tomorrow")}),i=0===e.price?this.t("free"):null!=e.price?this.money(e.price):"";return B`
      <div class="slot-row">
        <ha-icon icon=${zt[e.key]}></ha-icon>
        <span class="slot-label">${this.t(`slot_${e.key}`)}</span>
        <span class="slot-day">${t}</span>
        <span class="slot-price">${i}</span>
      </div>
    `}headlineMain(e){switch(e.state){case"arriving":return e.eta?Oe(this.hass,e.eta):e.till?Oe(this.hass,e.till):"—";case"ordered":return e.since?Ne(this.hass,e.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}):"—";case"delivered":return e.deliveredAt?Oe(this.hass,e.deliveredAt):"—";default:return e.firstDeliveryText??"—"}}headlineCaption(e){switch(e.state){case"arriving":return this.t(e.eta?"estimated":"by");case"ordered":return e.since?function(e,t){const i=Ce(e),[r,s]=Re(i,"future"),n=Math.max(0,Math.round((t.getTime()-Date.now())/1e3)),o=Math.round(n/60);if(n<60)return Pe(r,Me(i,n,"seconds"),s);if(o<60)return Pe(r,Me(i,o,"minutes"),s);const a=Math.floor(o/60),l=o%60;if(a<24){const e=Me(i,a,"hours");return Pe(r,0===l?e:`${e} ${Me(i,l,"minutes")}`,s)}return Pe(r,Me(i,Math.round(o/60/24),"days"),s)}(this.hass,e.since):"";case"delivered":return this.t("delivered_caption");default:return this.t("nearest_slot")}}renderSub(e){if(!e.since||!e.till)return W;const t=Ne(this.hass,e.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}),i=[`${this.t("window")} ${t} – ${Oe(this.hass,e.till)}`];return null!=e.orderId&&i.push(`${this.t("order")} ${e.orderId}`),B`${i.join(" · ")}`}renderTrack(e){if(!e.since||!e.till||null==e.progress)return W;const t=new Date((e.since.getTime()+e.till.getTime())/2);return B`
      <div class="track-wrap">
        <div class="track">
          <div class="track-fill" style=${$e({width:100*e.progress+"%"})}></div>
          <div class="track-marker" style=${$e({left:100*e.progress+"%"})}></div>
        </div>
        <div class="ticks">
          <span>${Oe(this.hass,e.since)}</span>
          <span>${Oe(this.hass,t)}</span>
          <span>${Oe(this.hass,e.till)}</span>
        </div>
      </div>
    `}renderAnnouncement(e){return B`
      <div class="announce">
        <span class="text">${e.announcementText}</span>
        <span class="meta">
          ${e.announcementUpdatedAt?this.t("announcement_updated",{time:Oe(this.hass,e.announcementUpdatedAt)}):W}
          ${e.announcementExtra?` · ${e.announcementExtra}`:W}
        </span>
      </div>
    `}renderSummary(e){const t=this.t("items_count",{count:e.summaryItems??0}),i=null!=e.summaryPrice?this.money(e.summaryPrice):"";return B`<span>${[t,i].filter(Boolean).join(" · ")}</span>`}};Et.styles=[We,yt],e([ge()],Et.prototype,"refreshing",void 0),e([ge()],Et.prototype,"refreshError",void 0),e([ge()],Et.prototype,"itemsExpanded",void 0),Et=e([he("rohlik-delivery-card")],Et),Ye({type:"rohlik-delivery-card",name:"Rohlík.cz Next Delivery",description:"Shows the state of your next Rohlík.cz order: ordered, on its way, or delivered.",preview:!0});const Ct={cs:{device:"Zařízení",name:"Vlastní název",show_name:"Zobrazit název zařízení"},en:{device:"Device",name:"Custom name",show_name:"Show device name"},de:{device:"Gerät",name:"Eigener Name",show_name:"Gerätenamen anzeigen"}};let It=class extends $t{constructor(){super(...arguments),this.labels=Ct}extraSchema(){return[{name:"show_name",selector:{boolean:{}}}]}};It=e([he("rohlik-delivery-badge-editor")],It);let Ot=class extends ce{constructor(){super(...arguments),this.entities=new Map,this.onClick=()=>{const e=this.entityId("is_ordered");e&&it(this,e)},this.onKeydown=e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.onClick())}}get hass(){return this._localeHass??this._hass}set hass(e){const t=this.hass;this._hass=e,this._localeHass=this.applyLanguage(e),this.requestUpdate("hass",t)}applyLanguage(e){if(!e||!this.config?.language||"auto"===this.config.language)return;const t=Ze(e,this.config.language);return t===e?void 0:t}setConfig(e){if(!e?.device)throw new Error("Rohlík badge: 'device' is required — pick the Rohlík.cz device in the badge editor.");this.config=e,this._localeHass=this.applyLanguage(this._hass),this.hass&&(this.entities=ze(this.hass,this.config.device))}willUpdate(e){e.has("hass")&&this.hass&&this.config&&(this.entities=ze(this.hass,this.config.device))}static getConfigElement(){return document.createElement("rohlik-delivery-badge-editor")}static getStubConfig(e){const t=Se(e);return{device:t[0]?.id??""}}entityId(e){return this.entities.get(e)}entityState(e){const t=this.entityId(e);return t?this.hass?.states?.[t]:void 0}attr(e,t){return this.entityState(e)?.attributes?.[t]}isOn(e){return"on"===this.entityState(e)?.state}textState(e){const t=this.entityState(e)?.state;return t&&"unknown"!==t&&"unavailable"!==t?t:null}t(e,t){return qe(this.hass,{...Be,...wt},e,t)}deviceName(){if(this.config?.name)return this.config.name;const e=this.hass?.devices?.[this.config?.device];return e?.name_by_user||e?.name||"Rohlík.cz"}syncMemory(e){const t=this.config?.device;if(!t)return null;const i=vt(),r=this.entityState("is_ordered")?.state;if("on"!==r&&"off"!==r)return mt(i,t);if(this.isOn("is_ordered")){const r=e?.id??null,s=mt(i,t);return s&&null!=r&&s.orderId!==r&&ft(i,t),pt(i,t,{orderId:r,till:Ee(this.entityState("next_order_till")?.state)}),null}return gt(i,t,new Date)}buildInput(){const e=this.attr("is_ordered","order_data")??null;return{isOrdered:this.isOn("is_ordered"),since:Ee(this.entityState("next_order_since")?.state),till:Ee(this.entityState("next_order_till")?.state),eta:Ee(this.entityState("delivery_time")?.state),orderData:e,announcementText:this.textState("delivery_info"),announcementExtra:this.attr("delivery_info","Additional Content")??null,announcementUpdatedAt:Ee(this.attr("delivery_info","Updated At")),lastOrderAt:Ee(this.entityState("last_order")?.state),lastOrderItems:this.attr("last_order","Items")??null,lastOrderPrice:this.attr("last_order","Price")??null,firstDeliveryText:this.textState("first_delivery"),isReserved:this.isOn("is_reserved"),isExpressAvailable:this.isOn("is_express_available"),recentDelivery:this.syncMemory(e)}}render(){if(!this.config||!this.hass||!this.entityId("is_ordered"))return W;const e=nt(this.buildInput(),new Date),t="none"===e.state&&e.isExpressAvailable,i={...this.config.accent?{"--rohlik-accent":this.config.accent}:{},...t?{"--rohlik-icon-color":"var(--warning-color)"}:{}},r=this.config.show_name?`${this.deviceName()} · ${this.t(`chip_${e.state}`)}`:this.t(`chip_${e.state}`);return B`
      <div
        class="badge"
        style=${$e(i)}
        @click=${this.onClick}
        @keydown=${this.onKeydown}
        role="button"
        tabindex="0"
      >
        <div class="icon-circle">
          <ha-icon icon=${"delivered"===e.state?"mdi:check":"mdi:truck-delivery"}></ha-icon>
        </div>
        <div class="text">
          <span class="label">${r}</span>
          <span class="value">${this.value(e)}</span>
        </div>
      </div>
    `}value(e){switch(e.state){case"arriving":return e.eta?Oe(this.hass,e.eta):e.till?Oe(this.hass,e.till):"—";case"ordered":return e.since?Ne(this.hass,e.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}):"—";case"delivered":return e.deliveredAt?Oe(this.hass,e.deliveredAt):"—";default:return e.firstDeliveryText??"—"}}};var Dt;Ot.styles=o`
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
  `,e([me({attribute:!1})],Ot.prototype,"hass",null),e([ge()],Ot.prototype,"config",void 0),e([ge()],Ot.prototype,"entities",void 0),Ot=e([he("rohlik-delivery-badge")],Ot),Dt={type:"rohlik-delivery-badge",name:"Rohlík.cz Delivery Badge",description:"Compact status pill for your next Rohlík.cz delivery.",preview:!0},Qe(),window.customBadges=window.customBadges??[],window.customBadges.push({preview:!0,...Dt});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const{I:Nt}=oe,Tt=e=>e,Rt=()=>document.createComment(""),Mt=(e,t,i)=>{const r=e._$AA.parentNode,s=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=r.insertBefore(Rt(),s),n=r.insertBefore(Rt(),s);i=new Nt(t,n,e,e.options)}else{const t=i._$AB.nextSibling,n=i._$AM,o=n!==e;if(o){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==n._$AU&&i._$AP(t)}if(t!==s||o){let e=i._$AA;for(;e!==t;){const t=Tt(e).nextSibling;Tt(r).insertBefore(e,s),e=t}}}return i},Pt=(e,t,i=e)=>(e._$AI(t,i),e),jt={},Ut=(e,t=jt)=>e._$AH=t,Lt=e=>{e._$AR(),e._$AA.remove()},Ft=(e,t,i)=>{const r=new Map;for(let s=t;s<=i;s++)r.set(e[s],s);return r},Ht=ye(class extends we{constructor(e){if(super(e),e.type!==ve)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);const s=[],n=[];let o=0;for(const t of e)s[o]=r?r(t,o):o,n[o]=i(t,o),o++;return{values:n,keys:s}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,r]){const s=(e=>e._$AH)(e),{values:n,keys:o}=this.dt(t,i,r);if(!Array.isArray(s))return this.ut=o,n;const a=this.ut??=[],l=[];let c,d,h=0,u=s.length-1,p=0,m=n.length-1;for(;h<=u&&p<=m;)if(null===s[h])h++;else if(null===s[u])u--;else if(a[h]===o[p])l[p]=Pt(s[h],n[p]),h++,p++;else if(a[u]===o[m])l[m]=Pt(s[u],n[m]),u--,m--;else if(a[h]===o[m])l[m]=Pt(s[h],n[m]),Mt(e,l[m+1],s[h]),h++,m--;else if(a[u]===o[p])l[p]=Pt(s[u],n[p]),Mt(e,s[h],s[u]),u--,p++;else if(void 0===c&&(c=Ft(o,p,m),d=Ft(a,h,u)),c.has(a[h]))if(c.has(a[u])){const t=d.get(o[p]),i=void 0!==t?s[t]:null;if(null===i){const t=Mt(e,s[h]);Pt(t,n[p]),l[p]=t}else l[p]=Pt(i,n[p]),Mt(e,s[h],i),s[t]=null;p++}else Lt(s[u]),u--;else Lt(s[h]),h++;for(;p<=m;){const t=Mt(e,l[m+1]);Pt(t,n[p]),l[p++]=t}for(;h<=u;){const e=s[h++];null!==e&&Lt(e)}return this.ut=o,Ut(e,l),Z}}),qt=o`
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
`,Bt={cs:{title:"Nákupní košík",can_order:"Nad minimem",ready_to_order:"Připraveno k objednání",below_minimum:"Pod minimem",below_minimum_by:"Do minimální hodnoty objednávky chybí {amount}",empty_cart:"Košík je prázdný",last_order_hint:"Váš poslední nákup měl {count} {count:položku|položky|položek}",search_placeholder:"Hledat na Rohlíku…",favourite_only:"Jen oblíbené",add:"Přidat",remove:"Odebrat",uncategorised:"Bez kategorie",missing_entities:"Chybí entity nákupního košíku — zkontrolujte integraci HA-RohlikCZ.",load_error:"Nepodařilo se načíst obsah košíku.",action_error:"Akci se nepodařilo dokončit, zkuste to prosím znovu.",search_error:"Vyhledávání selhalo.",search_add_error:"Přidání do košíku selhalo.",no_results:"Žádné výsledky",adding:"Přidávám {name}…",order:"Objednat",below_minimum_order:"Pod minimální hodnotou objednávky",order_hint:"Otevře {shop} v novém okně"},en:{title:"Shopping cart",can_order:"Above minimum",ready_to_order:"Ready to order",below_minimum:"Below minimum",below_minimum_by:"{amount} short of the minimum order value",empty_cart:"Cart is empty",last_order_hint:"Your last order had {count} {count:item|items}",search_placeholder:"Search {shop}…",favourite_only:"Favourites only",add:"Add",remove:"Remove",uncategorised:"Uncategorised",missing_entities:"Shopping cart entities are missing — check the HA-RohlikCZ integration.",load_error:"Failed to load the cart contents.",action_error:"Couldn't complete that action, please try again.",search_error:"Search failed.",search_add_error:"Adding to cart failed.",no_results:"No results",adding:"Adding {name}…",order:"Order",below_minimum_order:"Below minimum order",order_hint:"Opens {shop} in a new tab"},de:{title:"Warenkorb",can_order:"Über dem Mindestwert",ready_to_order:"Bereit zum Bestellen",below_minimum:"Unter dem Mindestwert",below_minimum_by:"Bis zum Mindestbestellwert fehlen {amount}",empty_cart:"Der Warenkorb ist leer",last_order_hint:"Ihr letzter Einkauf hatte {count} {count:Artikel|Artikel}",search_placeholder:"Bei {shop} suchen…",favourite_only:"Nur Favoriten",add:"Hinzufügen",remove:"Entfernen",uncategorised:"Ohne Kategorie",missing_entities:"Entitäten des Warenkorbs fehlen. Bitte die Integration HA-RohlikCZ prüfen.",load_error:"Der Warenkorb konnte nicht geladen werden.",action_error:"Das hat nicht geklappt. Bitte noch einmal versuchen.",search_error:"Die Suche ist fehlgeschlagen.",search_add_error:"Hinzufügen zum Warenkorb fehlgeschlagen.",no_results:"Keine Treffer",adding:"{name} wird hinzugefügt…",order:"Bestellen",below_minimum_order:"Unter dem Mindestbestellwert",order_hint:"Öffnet {shop} in einem neuen Tab"}},Kt={cs:{device:"Zařízení",name:"Vlastní název",show_search:"Zobrazit vyhledávání",group_by_category:"Seskupit podle kategorie",show_brand:"Zobrazit značku",min_order:"Minimální hodnota objednávky (0 = neposuzovat)",list_max_height:"Max. výška seznamu (0 = bez omezení)",max_items:"Max. počet zobrazených položek",show_order_button:"Tlačítko Objednat",checkout_url:"Adresa košíku",show_images:"Zobrazit obrázky produktů"},en:{device:"Device",name:"Custom name",show_search:"Show search",group_by_category:"Group by category",show_brand:"Show brand",min_order:"Minimum order value (0 = do not judge)",list_max_height:"Max list height (0 = unlimited)",max_items:"Max. items shown",show_order_button:"Order button",checkout_url:"Checkout URL (empty = the account's shop)",show_images:"Show product pictures"},de:{device:"Gerät",name:"Eigener Name",show_search:"Suche anzeigen",group_by_category:"Nach Kategorie gruppieren",show_brand:"Marke anzeigen",show_images:"Produktbilder anzeigen",min_order:"Mindestbestellwert (0 = nicht prüfen)",list_max_height:"Max. Höhe der Liste (0 = unbegrenzt)",max_items:"Max. angezeigte Artikel",show_order_button:"Taste „Bestellen“",checkout_url:"Adresse für „Bestellen“ (leer = Shop des Kontos)"}},Zt=/^(.+)\s*\((\d+)\)\s*-\s*(\d+(?:[.,]\d+)?)\s*[^\d\s]*\s*$/;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Wt(e){if(!e||"string"!=typeof e.summary)return null;const t=Zt.exec(e.summary.trim());if(!t)return null;const[,i,r,s]=t,n=i.trim(),o=parseInt(r,10),a=parseFloat(s.replace(",","."));if(!n||!Number.isFinite(o)||!Number.isFinite(a))return null;const l={uid:e.uid,name:n,quantity:o,price:a},{category:c,brand:d,productId:h,image:u}=function(e){const t={};if(!e)return t;for(const i of e.split(/\r?\n/)){const e=i.indexOf(":");if(-1===e)continue;const r=i.slice(0,e).trim().toLowerCase().replace(/[^a-z0-9]/g,""),s=i.slice(e+1).trim();if(s)if("category"===r)t.category=s;else if("brand"===r)t.brand=s;else if("productid"===r){const e=parseInt(s,10);Number.isFinite(e)&&(t.productId=e)}else"image"===r&&/^https?:\/\//i.test(s)&&(t.image=s)}return t}(e.description);return void 0!==c&&(l.category=c),void 0!==d&&(l.brand=d),void 0!==h&&(l.productId=h),void 0!==u&&(l.image=u),l}const Gt=/^(\d+)\s+(.+)$/,Vt=/^(.+?)\s*\((\d+)\)\s*$/;function Qt(e){const t=(e??"").trim(),i=Gt.exec(t);if(i){const e=i[2].trim();if(e)return{quantity:parseInt(i[1],10),name:e}}const r=Vt.exec(t);if(r){const e=r[1].trim();if(e)return{quantity:parseInt(r[2],10),name:e}}return{quantity:1,name:t}}function Yt(e,t,i){if(i<=0)return-1;const r=e+t;return r<-1?-1:r>=i?i-1:r}let Jt=class extends $t{constructor(){super(...arguments),this.labels=Kt,this.defaults={show_search:!0,show_brand:!0,group_by_category:!1,max_items:0,list_max_height:360,min_order:0,show_order_button:!0,show_images:!1}}extraSchema(){return[{name:"show_search",selector:{boolean:{}}},{name:"group_by_category",selector:{boolean:{}}},{name:"show_brand",selector:{boolean:{}}},{name:"show_images",selector:{boolean:{}}},{name:"max_items",selector:{number:{min:0,max:50,mode:"box"}}},{name:"list_max_height",selector:{number:{min:0,max:2e3,step:10,mode:"box",unit_of_measurement:"px"}}},{name:"min_order",selector:{number:{min:0,max:5e3,step:10,mode:"box",unit_of_measurement:He(this.hass,this.config?.device).currency}}},{name:"show_order_button",selector:{boolean:{}}},{name:"checkout_url",selector:{text:{}}}]}};Jt=e([he("rohlik-cart-card-editor")],Jt);let Xt=class extends Ge{constructor(){super(...arguments),this.strings=Bt,this.lines=[],this.loading=!1,this.error=null,this.expanded=!1,this.searchQuery="",this.searchResults=[],this.searching=!1,this.searchError=null,this.searchAttempted=!1,this.favouriteOnly=!1,this.addingName=null,this.popoverOpen=!1,this.popoverRect=null,this.highlightedIndex=-1,this.pendingUids=new Set,this.reloadDeferred=!1,this.totalOverride=null,this.itemsOverride=null,this.searchSeq=0,this.loadSeq=0,this.popoverListenersAttached=!1,this.onWindowReposition=()=>{void 0===this.repositionRaf&&(this.repositionRaf=requestAnimationFrame(()=>{this.repositionRaf=void 0,this.positionPopover()}))},this.onDocumentPointerDown=e=>{e.composedPath().includes(this)||this.closePopover()},this.onSearchInput=e=>{const t=e.target.value;this.searchQuery=t,this.searchError=null,this.highlightedIndex=-1,this.searchDebounce&&clearTimeout(this.searchDebounce);const i=t.trim();if(i.length<2)return this.searchResults=[],this.searching=!1,this.searchAttempted=!1,void this.closePopover();this.openPopover(),this.searchDebounce=setTimeout(()=>{this.runSearch(i)},400)},this.onSearchFocus=()=>{this.searchQuery.trim().length>=2&&this.openPopover()},this.onSearchKeydown=e=>{if("Escape"===e.key)return this.popoverOpen&&e.preventDefault(),void this.clearSearch();if("ArrowDown"===e.key){if(!this.popoverOpen||!this.searchResults.length)return;return e.preventDefault(),void(this.highlightedIndex=Yt(this.highlightedIndex,1,this.searchResults.length))}if("ArrowUp"===e.key){if(!this.popoverOpen||!this.searchResults.length)return;return e.preventDefault(),void(this.highlightedIndex=Yt(this.highlightedIndex,-1,this.searchResults.length))}if("Enter"===e.key){e.preventDefault();const t=this.highlightedIndex>=0?this.searchResults[this.highlightedIndex]:void 0;if(t)return void this.addSearchResult(t);this.searchAndAdd()}},this.toggleFavouriteOnly=()=>{this.favouriteOnly=!this.favouriteOnly;const e=this.searchQuery.trim();e.length>=2&&this.runSearch(e)}}static getConfigElement(){return document.createElement("rohlik-cart-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-cart-card"}}getCardSize(){return 5}getGridOptions(){return{columns:12,rows:8,min_columns:6,min_rows:4}}disconnectedCallback(){super.disconnectedCallback(),this.searchDebounce&&clearTimeout(this.searchDebounce),this.detachPopoverListeners()}attachPopoverListeners(){this.popoverListenersAttached||(this.popoverListenersAttached=!0,window.addEventListener("scroll",this.onWindowReposition,!0),window.addEventListener("resize",this.onWindowReposition),document.addEventListener("pointerdown",this.onDocumentPointerDown))}detachPopoverListeners(){this.popoverListenersAttached&&(this.popoverListenersAttached=!1,window.removeEventListener("scroll",this.onWindowReposition,!0),window.removeEventListener("resize",this.onWindowReposition),document.removeEventListener("pointerdown",this.onDocumentPointerDown),void 0!==this.repositionRaf&&(cancelAnimationFrame(this.repositionRaf),this.repositionRaf=void 0))}positionPopover(){const e=this.searchBoxEl;if(!e)return;const t=e.getBoundingClientRect();this.popoverRect={left:t.left,top:t.bottom+4,width:t.width}}openPopover(){this.attachPopoverListeners(),this.popoverOpen=!0,this.positionPopover()}closePopover(){this.detachPopoverListeners(),(this.popoverOpen||-1!==this.highlightedIndex)&&(this.popoverOpen=!1,this.highlightedIndex=-1)}willUpdate(e){if(super.willUpdate(e),!e.has("hass")||!this.hass||!this.config)return;const t=this.state("shopping_cart"),i=this.state("cart_price");if(!t||!i)return;const r=`${t.state}|${t.last_updated}|${i.state}`;r!==this.loadedKey&&(this.loadedKey=r,this.pendingUids.size>0?this.reloadDeferred=!0:this.loadItems())}sensorTotal(){const e=parseFloat(this.state("cart_price")?.state??"");return Number.isFinite(e)?e:0}sensorItems(){const e=this.attr("cart_price","Total items");return"number"==typeof e?e:this.lines.length}finishEdit(e){const t=new Set(this.pendingUids);t.delete(e),this.pendingUids=t,0===t.size&&(this.totalOverride=null,this.itemsOverride=null,this.reloadDeferred&&(this.reloadDeferred=!1,this.loadItems()))}listMaxHeight(){const e=this.config.list_max_height??360;if(e<=0)return 0;try{if(window.matchMedia?.("(pointer: coarse)").matches)return 0}catch{}return e}async ensureConfigEntryId(){if(this.configEntryId)return this.configEntryId;const e=this.entityId("cart_price");return e?(this.configEntryId=await Xe(this.hass,e),this.configEntryId):void 0}async loadItems(){const e=this.entityId("shopping_cart");if(!e)return;const t=++this.loadSeq;this.loading=!0,this.error=null;try{const i=await this.hass.callWS({type:"todo/item/list",entity_id:e});if(t!==this.loadSeq)return;this.lines=(i.items??[]).map(e=>Wt(e)).filter(e=>null!==e)}catch{if(t!==this.loadSeq)return;this.error=this.t("load_error")}finally{t===this.loadSeq&&(this.loading=!1)}}async removeItem(e){const t=this.entityId("shopping_cart");if(!t||this.pendingUids.has(e))return;const i=this.lines,r=this.lines.find(t=>t.uid===e);this.pendingUids=new Set(this.pendingUids).add(e),this.lines=this.lines.filter(t=>t.uid!==e),this.totalOverride=Math.max(0,(this.totalOverride??this.sensorTotal())-(r?.price??0)),this.itemsOverride=Math.max(0,(this.itemsOverride??this.sensorItems())-1),this.error=null;try{await this.hass.callService("todo","remove_item",{item:e},{entity_id:t})}catch{this.lines=i,this.error=this.t("action_error")}finally{this.finishEdit(e)}}async changeQuantity(e,t){if(this.pendingUids.has(e.uid))return;if(t<=0)return void await this.removeItem(e.uid);const i=this.entityId("shopping_cart");if(!i||void 0===e.productId)return;const r=this.lines,s=e.quantity>0?e.price/e.quantity:0,n=Math.round(s*t*100)/100;this.pendingUids=new Set(this.pendingUids).add(e.uid),this.lines=this.lines.map(i=>i.uid===e.uid?{...i,quantity:t,price:n}:i),this.totalOverride=Math.max(0,(this.totalOverride??this.sensorTotal())+(n-e.price)),this.error=null;try{await this.hass.callService("todo","remove_item",{item:e.uid},{entity_id:i});const r=await this.ensureConfigEntryId();if(!r)throw new Error("no config_entry_id for shopping_cart device");await et(this.hass,r,"add_to_cart",{product_id:e.productId,quantity:t})}catch{this.lines=r,this.error=this.t("action_error")}finally{this.reloadDeferred=!0,this.finishEdit(e.uid)}}async runSearch(e){const t=await this.ensureConfigEntryId();if(!t)return;const i=++this.searchSeq;this.searching=!0;try{const r=await et(this.hass,t,"search_product",{product_name:e,limit:8,favourite:this.favouriteOnly},!0);if(i!==this.searchSeq)return;this.searchResults=r?.search_results??[],this.highlightedIndex=-1,this.searchAttempted=!0,this.searchQuery.trim().length>=2&&this.openPopover()}catch{if(i!==this.searchSeq)return;this.searchResults=[],this.searchError=this.t("search_error"),this.searchAttempted=!0,this.searchQuery.trim().length>=2&&this.openPopover()}finally{i===this.searchSeq&&(this.searching=!1)}}async searchAndAdd(){const e=this.searchQuery.trim();if(!e)return;const t=await this.ensureConfigEntryId();if(!t)return;const{quantity:i,name:r}=Qt(e);this.clearSearch(),this.addingName=r,this.error=null;try{const e=await et(this.hass,t,"search_and_add_to_cart",{product_name:r,quantity:i,favourite:this.favouriteOnly},!0);if(e&&!1===e.success)return void(this.error=e.message||this.t("search_add_error"));await this.loadItems()}catch{this.error=this.t("search_add_error")}finally{this.addingName=null}}async addSearchResult(e){const t=await this.ensureConfigEntryId();if(!t)return;const{quantity:i}=Qt(this.searchQuery.trim());this.clearSearch(),this.addingName=e.name??"",this.error=null;try{await et(this.hass,t,"add_to_cart",{product_id:e.id,quantity:i}),await this.loadItems()}catch{this.error=this.t("search_add_error")}finally{this.addingName=null}}clearSearch(){this.searchDebounce&&clearTimeout(this.searchDebounce),this.searchQuery="",this.searchResults=[],this.searchError=null,this.searching=!1,this.searchAttempted=!1,this.closePopover()}render(){if(!this.config)return W;const e=this.entityId("shopping_cart"),t=this.entityId("cart_price");if(!e||!t)return B`<ha-card>${this.renderError(this.t("missing_entities"))}</ha-card>`;const i=this.state("cart_price"),r=this.totalOverride??(i?parseFloat(i.state):0),s=Boolean(this.attr("cart_price","Can Order")),n=this.config.min_order??0,o=Number(this.state("no_limit")?.state)>0,a=n>0&&!o&&r<n,l=this.attr("cart_price","Total items"),c=this.itemsOverride??("number"==typeof l?l:this.lines.length),d=0===this.lines.length,h=!1!==this.config.show_search,u=!1!==this.config.show_brand,p=!0===this.config.group_by_category,m=this.config.max_items??0,g=!1!==this.config.show_order_button,f=!d;return B`
      <ha-card style=${$e(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:cart"></ha-icon>
          <span class="title">${this.config.name||this.t("title")}</span>
          ${d?W:s?B`<span class="chip ok">${this.t("ready_to_order")}</span>`:a?B`<span class="chip warn">${this.t("below_minimum")}</span>`:n>0?B`<span class="chip ok">${this.t("can_order")}</span>`:W}
        </div>

        <div class="big">${this.money(Number.isFinite(r)?r:0)}</div>
        <div class="caption">
          ${d?this.t("empty_cart"):this.t("items_count",{count:c})}
        </div>
        ${d?this.renderEmptyHint():W}
        ${a&&!d?B`<div class="hint minimum-hint">
              ${this.t("below_minimum_by",{amount:this.money(n-r)})}
            </div>`:W}
        ${this.error?B`<div class="error">${this.error}</div>`:W}
        ${h?this.renderSearch():W}
        ${null!==this.addingName?B`<div class="adding">${this.renderSpinner()} ${this.t("adding",{name:this.addingName})}</div>`:W}
        ${d?W:this.renderLines(p,u,m)}

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
    `}renderOrderButton(e){const t=this.shop(),i=function(e,t="https://www.rohlik.cz/kosik"){const i=e?.trim();return i||t}(this.config.checkout_url,t.checkoutUrl);return B`
      <a
        class=${_e({btn:!0,order:!0,disabled:!e})}
        href=${e?i:W}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled=${e?W:"true"}
        title=${e?this.t("order_hint",{shop:t.name}):this.t("empty_cart")}
      >
        <ha-icon icon="mdi:cart-arrow-right"></ha-icon>
        ${this.t("order")}
      </a>
    `}renderEmptyHint(){const e=this.attr("last_order","Items");return"number"!=typeof e?W:B`<div class="hint">${this.t("last_order_hint",{count:e})}</div>`}renderSearch(){return B`
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
            class=${_e({"icon-btn":!0,active:this.favouriteOnly})}
            title=${this.t("favourite_only")}
            @click=${this.toggleFavouriteOnly}
          >
            <ha-icon icon=${this.favouriteOnly?"mdi:heart":"mdi:heart-outline"}></ha-icon>
          </button>
        </div>
        ${this.popoverOpen?this.renderSearchPopover():W}
      </div>
    `}renderSearchPopover(){const e=this.popoverRect?{left:`${this.popoverRect.left}px`,top:`${this.popoverRect.top}px`,width:`${this.popoverRect.width}px`}:{display:"none"};return B`
      <div id="cart-search-listbox" class="search-popover" role="listbox" style=${$e(e)}>
        ${this.searchError?B`<div class="popover-error">${this.searchError}</div>`:this.searchResults.length?Ht(this.searchResults,e=>e.id,(e,t)=>this.renderSearchResult(e,t)):this.searchAttempted&&!this.searching?B`<div class="popover-empty">${this.t("no_results")}</div>`:W}
      </div>
    `}renderSpinner(){return customElements.get("ha-circular-progress")?B`<ha-circular-progress indeterminate size="small"></ha-circular-progress>`:B`<div class="spinner"></div>`}renderSearchResult(e,t){const i=[e.brand,e.amount].filter(Boolean).join(" · "),r=t===this.highlightedIndex;return B`
      <div
        id="cart-search-option-${t}"
        class=${_e({row:!0,"search-result":!0,highlighted:r})}
        role="option"
        aria-selected=${r?"true":"false"}
        @pointerenter=${()=>this.highlightedIndex=t}
      >
        ${this.renderThumb(e.image)}
        <div class="cell">
          <div class="name">${e.name}</div>
          ${i?B`<div class="secondary">${i}</div>`:W}
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
    `}renderThumb(e){return!0!==this.config.show_images?W:e?B`<img class="thumb" src=${e} alt="" loading="lazy" referrerpolicy="no-referrer" />`:B`<div class="thumb placeholder" aria-hidden="true"></div>`}renderLines(e,t,i){const r=i>0?i:this.lines.length,s=this.expanded?this.lines:this.lines.slice(0,r),n=this.lines.length>r,o=this.listMaxHeight();return B`
      <div class="lines" style=${$e(o>0?{maxHeight:`${o}px`}:{})}>
        ${e?Ht(function(e){const t=new Map,i=[];for(const r of e){if(!r.category){i.push(r);continue}const e=t.get(r.category);e?e.push(r):t.set(r.category,[r])}const r=Array.from(t.entries()).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>({category:e,lines:t}));return i.length&&r.push({category:void 0,lines:i}),r}(s),e=>e.category??"__uncategorised__",e=>B`
                <div class="category-header">${e.category??this.t("uncategorised")}</div>
                ${Ht(e.lines,e=>e.uid,e=>this.renderLine(e,t))}
              `):Ht(s,e=>e.uid,e=>this.renderLine(e,t))}
      </div>
      ${n?B`
            <button class="btn ghost show-toggle" @click=${()=>this.expanded=!this.expanded}>
              ${this.expanded?this.t("show_less"):this.t("show_all",{count:this.lines.length})}
            </button>
          `:W}
    `}renderLine(e,t){const i=this.pendingUids.has(e.uid),r=[e.category,t?e.brand:void 0].filter(e=>Boolean(e)).join(" · ");return B`
      <div class=${_e({row:!0,"cart-line":!0,pending:i})}>
        ${this.renderThumb(e.image)}
        <div class="cell">
          <div class="name">${e.name}</div>
          ${r?B`<div class="secondary">${r}</div>`:W}
        </div>
        <div class="line-end">
          <div class="stepper">
            <button
              class="step-btn"
              ?disabled=${i}
              title=${this.t("remove")}
              @click=${()=>{this.changeQuantity(e,e.quantity-1)}}
            >
              −
            </button>
            <span class="qty">${e.quantity}</span>
            <button
              class="step-btn"
              ?disabled=${i}
              @click=${()=>{this.changeQuantity(e,e.quantity+1)}}
            >
              +
            </button>
          </div>
          <div class="line-price">${this.money(e.price)}</div>
          <button
            class="icon-btn remove"
            ?disabled=${i}
            title=${this.t("remove")}
            @click=${()=>{this.removeItem(e.uid)}}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </div>
    `}};function ei(e){return"string"==typeof e?e.trim():""}function ti(e){return"number"==typeof e&&Number.isFinite(e)?e:null}function ii(e){return e.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().trim()}Xt.styles=[We,qt],e([ge()],Xt.prototype,"lines",void 0),e([ge()],Xt.prototype,"loading",void 0),e([ge()],Xt.prototype,"error",void 0),e([ge()],Xt.prototype,"expanded",void 0),e([ge()],Xt.prototype,"searchQuery",void 0),e([ge()],Xt.prototype,"searchResults",void 0),e([ge()],Xt.prototype,"searching",void 0),e([ge()],Xt.prototype,"searchError",void 0),e([ge()],Xt.prototype,"searchAttempted",void 0),e([ge()],Xt.prototype,"favouriteOnly",void 0),e([ge()],Xt.prototype,"addingName",void 0),e([ge()],Xt.prototype,"popoverOpen",void 0),e([ge()],Xt.prototype,"popoverRect",void 0),e([ge()],Xt.prototype,"highlightedIndex",void 0),e([ge()],Xt.prototype,"pendingUids",void 0),e([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(e){return(t,i,r)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}(".search-box")],Xt.prototype,"searchBoxEl",void 0),e([ge()],Xt.prototype,"totalOverride",void 0),e([ge()],Xt.prototype,"itemsOverride",void 0),Xt=e([he("rohlik-cart-card")],Xt),Ye({type:"rohlik-cart-card",name:"Rohlík.cz Shopping Cart",description:"Live cart contents, quantity steppers and product search for Rohlík.cz."});const ri=o`
  :host {
    --rohlik-thumb-size: 56px;
  }

  .header .count {
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    font-weight: 400;
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
  }

  .icon-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .search {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 48px;
    padding: 0 8px 0 12px;
    margin-bottom: 8px;
    border: 2px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--secondary-text-color);
  }

  .search:focus-within {
    border-color: var(--accent-color, var(--rohlik-accent));
  }

  .search input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--primary-text-color);
    font: inherit;
    font-size: 1rem;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 16px;
  }

  @container (min-width: 640px) {
    .list {
      grid-template-columns: 1fr 1fr;
    }
  }

  .fav {
    min-height: 72px;
    gap: 12px;
  }

  /* In two columns every row keeps its bottom line; the last two may both end. */
  .list .fav:last-child {
    border-bottom: 1px solid var(--divider-color);
  }

  .fav.out {
    color: var(--secondary-text-color);
  }

  .fav.out .thumb {
    opacity: 0.5;
  }

  .cell {
    flex: 1 1 auto;
    min-width: 0;
  }

  .name {
    color: var(--primary-text-color);
    font-size: 1rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .fav.out .name {
    color: var(--secondary-text-color);
  }

  .meta {
    margin-top: 2px;
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
  }

  .meta .sale {
    color: var(--warning-color, #ff9800);
    font-weight: 500;
  }

  .meta .in-cart {
    color: var(--success-color, #4caf50);
    font-weight: 500;
  }

  .add {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border: 2px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--rohlik-accent);
    cursor: pointer;
    --mdc-icon-size: 28px;
    transition: opacity 120ms;
  }

  .add.has {
    border-color: var(--success-color, #4caf50);
    color: var(--success-color, #4caf50);
  }

  .add:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .add:focus-visible {
    outline: 2px solid var(--accent-color, var(--rohlik-accent));
    outline-offset: 2px;
  }

  .hint {
    padding: 16px 4px;
    color: var(--secondary-text-color);
    font-size: 0.95rem;
  }

  .show-toggle {
    align-self: center;
    margin-top: 8px;
    min-height: 44px;
  }

  .toast {
    margin-top: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--success-color, #4caf50) 15%, transparent);
    font-size: 0.9rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .add {
      transition: none;
    }
  }
`,si={cs:{title:"Oblíbené",search_placeholder:"Hledat v oblíbených",add:"Přidat do košíku",added:"„{name}“ je v košíku",add_error:"Nepodařilo se přidat do košíku",in_cart:"{count}× v košíku",out_of_stock:"Není skladem",on_sale:"Akce",empty:"Zatím žádné oblíbené. Označte produkty v aplikaci srdíčkem, objeví se tady.",no_match:"Nic neodpovídá „{query}“",unavailable:"Oblíbené se nepodařilo načíst",needs_update:"Karta potřebuje HA-RohlikCZ 1.3 nebo novější (senzor Oblíbené).",show_all:"Zobrazit vše ({count})",show_less:"Zobrazit méně",refresh:"Načíst znovu",clear:"Smazat"},en:{title:"Favourites",search_placeholder:"Search favourites",add:"Add to cart",added:"“{name}” is in the cart",add_error:"Could not add to the cart",in_cart:"{count}× in cart",out_of_stock:"Out of stock",on_sale:"Sale",empty:"No favourites yet. Mark products with the heart in the shop's app and they show up here.",no_match:"Nothing matches “{query}”",unavailable:"Favourites could not be loaded",needs_update:"This card needs HA-RohlikCZ 1.3 or later (Favourites sensor).",show_all:"Show all ({count})",show_less:"Show less",refresh:"Reload",clear:"Clear"},de:{title:"Favoriten",search_placeholder:"In Favoriten suchen",add:"In den Warenkorb",added:"„{name}“ liegt im Warenkorb",add_error:"Konnte nicht in den Warenkorb legen",in_cart:"{count}× im Warenkorb",out_of_stock:"Nicht lieferbar",on_sale:"Aktion",empty:"Noch keine Favoriten. Markiere Produkte in der App mit dem Herz, dann erscheinen sie hier.",no_match:"Nichts passt zu „{query}“",unavailable:"Favoriten konnten nicht geladen werden",needs_update:"Diese Karte braucht HA-RohlikCZ 1.3 oder neuer (Sensor Favoriten).",show_all:"Alle zeigen ({count})",show_less:"Weniger zeigen",refresh:"Neu laden",clear:"Leeren"}},ni={cs:{show_search:"Zobrazit vyhledávání",show_price:"Zobrazit cenu",hide_out_of_stock:"Skrýt nedostupné",max_items:"Počet položek (0 = vše)"},en:{show_search:"Show search",show_price:"Show price",hide_out_of_stock:"Hide out-of-stock products",max_items:"Items shown (0 = all)"},de:{show_search:"Suchfeld zeigen",show_price:"Preis zeigen",hide_out_of_stock:"Nicht lieferbare ausblenden",max_items:"Anzahl Einträge (0 = alle)"}};let oi=class extends $t{constructor(){super(...arguments),this.labels=ni,this.defaults={show_search:!0,show_price:!0,hide_out_of_stock:!1,max_items:12}}extraSchema(){return[{name:"show_search",selector:{boolean:{}}},{name:"show_price",selector:{boolean:{}}},{name:"hide_out_of_stock",selector:{boolean:{}}},{name:"max_items",selector:{number:{min:0,max:200,mode:"box"}}}]}};oi=e([he("rohlik-favourites-card-editor")],oi);let ai=class extends Ge{constructor(){super(...arguments),this.strings=si,this.query="",this.expanded=!1,this.pending=new Set,this.optimistic=new Map,this.cartLines=[],this.toast=null,this.error=null,this.refreshing=!1,this.cartKey="",this.onInput=e=>{this.query=e.target.value},this.clearQuery=()=>{this.query=""}}static getConfigElement(){return document.createElement("rohlik-favourites-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-favourites-card"}}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}getCardSize(){return 8}disconnectedCallback(){super.disconnectedCallback(),this.toastTimer&&clearTimeout(this.toastTimer)}willUpdate(e){if(super.willUpdate(e),!e.has("hass")||!this.hass||!this.config)return;const t=this.state("shopping_cart");if(!t)return;const i=`${t.state}|${t.last_updated}`;i!==this.cartKey&&(this.cartKey=i,this.loadCart())}async loadCart(){const e=this.entityId("shopping_cart");if(e)try{const t=await this.hass.callWS({type:"todo/item/list",entity_id:e});this.cartLines=(t.items??[]).map(e=>Wt(e)).filter(e=>null!==e),this.optimistic=new Map}catch{}}async ensureConfigEntryId(){if(this.configEntryId)return this.configEntryId;const e=this.entityId("favourites")??this.entityId("cart_price");return e?(this.configEntryId=await Xe(this.hass,e),this.configEntryId):void 0}showToast(e){this.toast=e,this.toastTimer&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.toast=null,4e3)}async add(e){if(this.pending.has(e.id))return;const t=await this.ensureConfigEntryId();if(t){this.pending=new Set(this.pending).add(e.id),this.optimistic=new Map(this.optimistic).set(e.id,(this.optimistic.get(e.id)??0)+1),this.error=null;try{await et(this.hass,t,"add_to_cart",{product_id:e.id,quantity:1}),this.showToast(this.t("added",{name:e.name}))}catch{const t=new Map(this.optimistic),i=(t.get(e.id)??1)-1;i>0?t.set(e.id,i):t.delete(e.id),this.optimistic=t,this.error=this.t("add_error")}finally{const t=new Set(this.pending);t.delete(e.id),this.pending=t}}}async refresh(){const e=await this.ensureConfigEntryId();if(e&&!this.refreshing){this.refreshing=!0,this.error=null;try{await et(this.hass,e,"get_favourites",{},!0)}catch{this.error=this.t("unavailable")}finally{this.refreshing=!1}}}render(){if(!this.config)return W;const e=this.state("favourites"),t=$e(this.accentStyle);if(!this.entityId("favourites"))return B`<ha-card style=${t}>${this.renderHeader(null)}
        <div class="hint">${this.t("needs_update")}</div></ha-card>`;const i=function(e){const t=e?.attributes?.products;if(!Array.isArray(t))return[];const i=[];for(const e of t){if(!e||"object"!=typeof e)continue;const t=e,r=ti(t.id),s=ei(t.name);if(null===r||!s)continue;const n=ei(t.image);i.push({id:r,name:s,amount:ei(t.amount),price:ti(t.price),inStock:!1!==t.in_stock,onSale:!0===t.on_sale,image:/^https?:\/\//i.test(n)?n:null})}return i}(e).filter(e=>!(this.config.hide_out_of_stock&&!e.inStock)),r=!e||"unavailable"===e.state||"unknown"===e.state;return B`
      <ha-card style=${t}>
        ${this.renderHeader(r?null:i.length)}
        ${!1!==this.config.show_search&&i.length>0?this.renderSearch():W}
        ${this.error?this.renderError(this.error):W}
        ${r?this.renderError(this.t("unavailable")):this.renderBody(i)}
        ${this.toast?B`<div class="toast" role="status">${this.toast}</div>`:W}
      </ha-card>
    `}renderHeader(e){return B`
      <div class="header">
        <ha-icon icon="mdi:heart-outline"></ha-icon>
        <span class="title">${this.config.name||this.t("title")}</span>
        ${null!==e?B`<span class="count">${e}</span>`:W}
        <button
          class="icon-btn"
          title=${this.t("refresh")}
          aria-label=${this.t("refresh")}
          ?disabled=${this.refreshing}
          @click=${()=>{this.refresh()}}
        >
          <ha-icon icon="mdi:refresh"></ha-icon>
        </button>
      </div>
    `}renderSearch(){return B`
      <label class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          .value=${this.query}
          placeholder=${this.t("search_placeholder")}
          aria-label=${this.t("search_placeholder")}
          @input=${this.onInput}
        />
        ${this.query?B`<button class="icon-btn" title=${this.t("clear")} aria-label=${this.t("clear")}
              @click=${this.clearQuery}><ha-icon icon="mdi:close"></ha-icon></button>`:W}
      </label>
    `}renderBody(e){if(0===e.length)return B`<div class="hint">${this.t("empty")}</div>`;const t=function(e,t){const i=ii(t).split(/\s+/).filter(Boolean);return 0===i.length?e:e.filter(e=>{const t=ii(`${e.name} ${e.amount}`);return i.every(e=>t.includes(e))})}(e,this.query);if(0===t.length)return B`<div class="hint">${this.t("no_match",{query:this.query.trim()})}</div>`;const i=this.config.max_items??12,r=!this.query.trim()&&i>0&&!this.expanded?t.slice(0,i):t,s=function(e){const t=new Map;for(const i of e)void 0!==i.productId&&t.set(i.productId,(t.get(i.productId)??0)+i.quantity);return t}(this.cartLines);return B`
      <div class="list">
        ${Ht(r,e=>e.id,e=>this.renderRow(e,s))}
      </div>
      ${!this.query.trim()&&i>0&&t.length>i?B`<button class="btn ghost show-toggle" @click=${()=>this.expanded=!this.expanded}>
            ${this.expanded?this.t("show_less"):this.t("show_all",{count:t.length})}
          </button>`:W}
    `}renderRow(e,t){const i=(t.get(e.id)??0)+(this.optimistic.get(e.id)??0),r=this.pending.has(e.id),s=[];return e.amount&&s.push(B`<span>${e.amount}</span>`),!1!==this.config.show_price&&null!==e.price&&s.push(B`<span class=${e.onSale?"sale":""}>${this.money(e.price)}</span>`),e.inStock||s.push(B`<span>${this.t("out_of_stock")}</span>`),i>0&&s.push(B`<span class="in-cart">${this.t("in_cart",{count:i})}</span>`),B`
      <div class=${_e({row:!0,fav:!0,out:!e.inStock})}>
        ${e.image?B`<img class="thumb" src=${e.image} alt="" loading="lazy" referrerpolicy="no-referrer" />`:B`<div class="thumb placeholder" aria-hidden="true"></div>`}
        <div class="cell">
          <div class="name">${e.name}</div>
          <div class="meta">${s.map((e,t)=>B`${t?" · ":""}${e}`)}</div>
        </div>
        <button
          class=${_e({add:!0,has:i>0})}
          title=${this.t("add")}
          aria-label=${`${this.t("add")}: ${e.name}`}
          ?disabled=${r||!e.inStock}
          @click=${()=>{this.add(e)}}
        >
          <ha-icon icon=${r?"mdi:timer-sand":"mdi:plus"}></ha-icon>
        </button>
      </div>
    `}};ai.styles=[We,ri],e([ge()],ai.prototype,"query",void 0),e([ge()],ai.prototype,"expanded",void 0),e([ge()],ai.prototype,"pending",void 0),e([ge()],ai.prototype,"optimistic",void 0),e([ge()],ai.prototype,"cartLines",void 0),e([ge()],ai.prototype,"toast",void 0),e([ge()],ai.prototype,"error",void 0),e([ge()],ai.prototype,"refreshing",void 0),ai=e([he("rohlik-favourites-card")],ai),Ye({type:"rohlik-favourites-card",name:"Rohlík.cz Favourites",description:"Your favourite products with pictures and a large add-to-cart button.",preview:!0});const li=["express","standard","eco"],ci={express:"mdi:lightning-bolt",standard:"mdi:truck-delivery",eco:"mdi:leaf"};function di(e){if("number"==typeof e&&Number.isFinite(e))return e;if("string"==typeof e&&""!==e.trim()){const t=Number(e);if(Number.isFinite(t))return t}return null}function hi(e){return"string"==typeof e&&""!==e.trim()?e:null}function ui(e){return null==e||Number.isNaN(e)?0:Math.min(100,Math.max(0,e))}function pi(e){if("string"!=typeof e||!e)return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:t}function mi(e,t=0){return"number"==typeof e&&Number.isFinite(e)?e:t}function gi(e){const t=e=>String(e).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`}function fi(e,t){return(e?.windows??[]).filter(e=>e.free>0&&(void 0===t||e.minutes===t)).length}const vi=o`
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

  /* ---- All delivery windows (show_windows) ---- */
  .windows {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 12px;
  }

  .day-chips {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .day-chip,
  .seg {
    flex: none;
    min-height: 56px;
    padding: 6px 16px;
    border: 2px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font: inherit;
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2px;
  }

  .day-chip.on,
  .seg.on {
    border-color: var(--accent-color, var(--rohlik-accent));
    background: color-mix(in srgb, var(--accent-color, var(--rohlik-accent)) 12%, transparent);
  }

  .day-chip:focus-visible,
  .seg:focus-visible {
    outline: 2px solid var(--accent-color, var(--rohlik-accent));
    outline-offset: 2px;
  }

  .day-name {
    font-size: 1rem;
    font-weight: 500;
  }

  .day-free {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
  }

  .day-chip.none .day-name {
    color: var(--secondary-text-color);
  }

  .segmented {
    display: flex;
    gap: 8px;
  }

  .seg {
    flex: 1 1 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    font-size: 0.95rem;
  }

  .seg-count {
    margin-left: 6px;
    padding: 0 8px;
    border-radius: 12px;
    color: var(--secondary-text-color);
    background: color-mix(in srgb, var(--secondary-text-color) 15%, transparent);
    font-size: 0.8rem;
  }

  .window-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 8px;
  }

  .window-grid.quarter {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }

  .window {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-height: 56px;
    padding: 8px 12px;
    border: 2px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: 8px;
    background: var(--card-background-color);
    box-sizing: border-box;
  }

  .window.booked {
    border-style: dashed;
    color: var(--state-inactive-color, var(--secondary-text-color));
  }

  .window-time {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--primary-text-color);
    font-size: 1rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .window.booked .window-time {
    color: var(--state-inactive-color, var(--secondary-text-color));
    font-weight: 400;
  }

  .window-time .eco {
    --mdc-icon-size: 16px;
    color: var(--success-color, #4caf50);
  }

  .window-meta {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
  }

  .window .capacity-bar {
    margin-top: auto;
  }

  .windows-hint {
    padding: 8px 4px;
    color: var(--secondary-text-color);
    font-size: 0.9rem;
  }
`,yi={cs:{title:"Termíny rozvozu",slot_express:"Expres",slot_standard:"Standard",slot_eco:"Eko",express_available:"Expres k dispozici",no_express:"Bez expresu",watch_toggle:"Sledovat expres",watch_error:"Aktualizace se nezdařila",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",layout_auto:"Automaticky",layout_row:"Řádek",layout_column:"Sloupec",windows_days:"Dny",windows_length:"Délka okna",windows_hour:"1 hodina",windows_quarter:"15 minut",windows_free_count:"{count} volných",windows_free_percent:"{percent} % volno",windows_booked:"Obsazeno",windows_none_free:"V tento den už není nic volného.",windows_empty:"Žádná doručovací okna nejsou známa.",windows_needs_update:"Seznam oken potřebuje HA-RohlikCZ 1.3 nebo novější."},en:{title:"Delivery slots",slot_express:"Express",slot_standard:"Standard",slot_eco:"Eco",express_available:"Express available",no_express:"No express",watch_toggle:"Watch express",watch_error:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device",layout_auto:"Auto",layout_row:"Row",layout_column:"Column",windows_days:"Days",windows_length:"Window length",windows_hour:"1 hour",windows_quarter:"15 minutes",windows_free_count:"{count} free",windows_free_percent:"{percent} % free",windows_booked:"Booked out",windows_none_free:"Nothing left on this day.",windows_empty:"No delivery windows known.",windows_needs_update:"The window list needs HA-RohlikCZ 1.3 or later."},de:{title:"Liefertermine",slot_express:"Express",slot_standard:"Standard",slot_eco:"Öko",express_available:"Express verfügbar",no_express:"Kein Express",watch_toggle:"Express beobachten",watch_error:"Aktualisieren fehlgeschlagen",no_entities:"Auf diesem Gerät wurden keine Rohlík-Entitäten gefunden",layout_auto:"Automatisch",layout_row:"Zeile",layout_column:"Spalte",windows_days:"Tage",windows_length:"Fensterlänge",windows_hour:"1 Stunde",windows_quarter:"15 Minuten",windows_free_count:"{count} frei",windows_free_percent:"{percent} % frei",windows_booked:"Ausgebucht",windows_none_free:"An diesem Tag ist nichts mehr frei.",windows_empty:"Keine Lieferfenster bekannt.",windows_needs_update:"Die Liste der Lieferfenster braucht HA-RohlikCZ 1.3 oder neuer."}},wi={cs:{device:"Zařízení",name:"Vlastní název",slots:"Zobrazené sloty",layout:"Rozložení",show_price:"Zobrazit cenu",show_location:"Zobrazit adresu",watch_interval:"Interval sledování (s)",show_tiles:"Zobrazit dlaždice",show_windows:"Zobrazit všechna okna",hide_booked:"Skrýt obsazená okna"},en:{device:"Device",name:"Custom name",slots:"Slots shown",layout:"Layout",show_price:"Show price",show_location:"Show location",watch_interval:"Watch interval (s)",show_tiles:"Show tiles",show_windows:"Show all windows",hide_booked:"Hide booked-out windows"},de:{device:"Gerät",name:"Eigener Name",slots:"Angezeigte Termine",layout:"Anordnung",show_price:"Preis anzeigen",show_location:"Adresse anzeigen",watch_interval:"Intervall beim Beobachten (s)",show_tiles:"Kacheln zeigen",show_windows:"Alle Lieferfenster zeigen",hide_booked:"Ausgebuchte ausblenden"}};let _i=class extends $t{constructor(){super(...arguments),this.labels=wi,this.defaults={slots:["express","standard","eco"],show_price:!0,show_location:!0,watch_interval:15,layout:"auto",show_tiles:!0,show_windows:!1,hide_booked:!1}}extraSchema(){const e=e=>qe(this.hass,yi,e);return[{name:"slots",selector:{select:{multiple:!0,mode:"list",options:[{value:"express",label:e("slot_express")},{value:"standard",label:e("slot_standard")},{value:"eco",label:e("slot_eco")}]}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"auto",label:e("layout_auto")},{value:"row",label:e("layout_row")},{value:"column",label:e("layout_column")}]}}},{name:"show_tiles",selector:{boolean:{}}},{name:"show_windows",selector:{boolean:{}}},{name:"hide_booked",selector:{boolean:{}}},{name:"show_price",selector:{boolean:{}}},{name:"show_location",selector:{boolean:{}}},{name:"watch_interval",selector:{number:{mode:"box",min:10,max:300}}}]}};_i=e([he("rohlik-slots-card-editor")],_i);let bi=class extends Ge{constructor(){super(...arguments),this.strings=yi,this.watching=!1,this.pollError=null,this.selectedDay=null,this.selectedLength=60,this.onVisibilityChange=()=>this.syncPolling(),this.toggleWatch=()=>{this.watching=!this.watching,this.saveWatchFlag(this.watching),this.watching&&(this.pollError=null)}}static getConfigElement(){return document.createElement("rohlik-slots-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-slots-card"}}getGridOptions(){return this.config?.show_windows?{columns:12,rows:"auto",min_columns:6}:"column"===this.config?.layout?{columns:4,rows:6,min_columns:3,min_rows:4}:{columns:12,rows:3,min_columns:6,min_rows:2}}setConfig(e){super.setConfig(e),this.watching=this.loadWatchFlag();const t=this.loadChoice();this.selectedDay=t.day,this.selectedLength=t.length}choiceStorageKey(){const e=this.config?.device;return e?`rohlik-slots-choice:${e}`:null}loadChoice(){const e=this.choiceStorageKey();try{const t=e?localStorage.getItem(e):null,i=t?JSON.parse(t):{};return{day:"string"==typeof i.day?i.day:null,length:15===i.length?15:60}}catch{return{day:null,length:60}}}saveChoice(){const e=this.choiceStorageKey();if(e)try{localStorage.setItem(e,JSON.stringify({day:this.selectedDay,length:this.selectedLength}))}catch{}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibilityChange),this.syncPolling()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisibilityChange),this.stopPolling()}willUpdate(e){super.willUpdate(e),this.syncPolling()}watchStorageKey(){const e=this.config?.device;return e?`rohlik-slots-watch:${e}`:null}loadWatchFlag(){const e=this.watchStorageKey();if(!e)return!1;try{return"1"===localStorage.getItem(e)}catch{return!1}}saveWatchFlag(e){const t=this.watchStorageKey();if(t)try{localStorage.setItem(t,e?"1":"0")}catch{}}syncPolling(){const e=this.watching&&"visible"===document.visibilityState&&!!this.config,t=Math.max(10,this.config?.watch_interval??15);e?void 0!==this.pollTimer&&this.pollSeconds===t||(this.stopPolling(),this.pollTimer=setInterval(()=>{this.poll()},1e3*t),this.pollSeconds=t):this.stopPolling()}stopPolling(){void 0!==this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=void 0),this.pollSeconds=void 0}async poll(){const e=this.entityId("express_slot")??this.entityId("standard_slot")??this.entityId("eco_slot");if(e&&this.hass)try{const t=await Xe(this.hass,e);if(!t)throw new Error("no config entry");await et(this.hass,t,"refresh_slots"),this.pollError=null}catch{this.pollError=this.t("watch_error")}}slotsToShow(){const e=this.config?.slots;return e&&e.length>0?e:li}render(){if(!this.config)return W;if(0===this.entities.size)return B`
        <ha-card style=${$e(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const e=this.slotsToShow(),t=this.isOn("is_express_available"),i=!1!==this.config.show_location,r=this.attr("first_delivery","delivery_location"),s=this.config.layout??"auto";return B`
      <ha-card style=${$e(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span class="title">${this.config.name||this.t("title")}</span>
          <div class="header-actions">
            <button
              class=${_e({"icon-toggle":!0,on:this.watching})}
              @click=${this.toggleWatch}
              aria-pressed=${this.watching}
              aria-label=${this.t("watch_toggle")}
              title=${this.t("watch_toggle")}
            >
              <ha-icon icon=${this.watching?"mdi:eye":"mdi:eye-outline"}></ha-icon>
              ${this.watching?B`<span class="pulse-dot"></span>`:W}
            </button>
            <span class="chip ${t?"warn":"neutral"}">
              ${t?this.t("express_available"):this.t("no_express")}
            </span>
          </div>
        </div>

        ${i&&"string"==typeof r&&r?B`
              <div class="location">
                <ha-icon icon="mdi:map-marker"></ha-icon>
                <span>${r}</span>
              </div>
            `:W}
        ${this.pollError?this.renderError(this.pollError):W}

        ${!1===this.config.show_tiles?W:B`
              <div
                class=${_e({"slots-grid":!0,column:"column"===s,auto:"auto"===s})}
                style=${$e({"--rohlik-slot-count":String(e.length)})}
              >
                ${e.map(e=>this.renderTile(e))}
              </div>
            `}
        ${this.config.show_windows?this.renderWindows():W}

        ${this.renderFreshness()}
      </ha-card>
    `}selectDay(e){this.selectedDay=e,this.saveChoice()}selectLength(e){this.selectedLength=e,this.saveChoice()}dayLabel(e){const[t,i,r]=e.split("-").map(Number),s=new Date(t,(i??1)-1,r??1),n=new Date,o=new Date(n);o.setDate(n.getDate()+1);const a=(e,t)=>e.toDateString()===t.toDateString();return a(s,n)?this.t("today"):a(s,o)?this.t("tomorrow"):new Intl.DateTimeFormat(Ce(this.hass),{weekday:"short",day:"numeric",month:"numeric"}).format(s)}renderWindows(){if(!this.entityId("delivery_slots"))return B`<div class="windows-hint">${this.t("windows_needs_update")}</div>`;const e=function(e){const t=new Map;for(const i of e){const e=t.get(i.date);e?e.push(i):t.set(i.date,[i])}return[...t.entries()].sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>({date:e,windows:t}))}(function(e){const t=e?.attributes?.slots;if(!Array.isArray(t))return[];const i=[];for(const e of t){if(!e||"object"!=typeof e)continue;const t=e,r=pi(t.since);if(!r)continue;const s="string"==typeof t.date&&t.date?t.date:gi(r);i.push({id:"number"==typeof t.id?t.id:null,date:s,start:r,end:pi(t.till),minutes:15===mi(t.minutes,60)?15:60,free:Math.max(0,mi(t.free)),price:mi(t.price),premium:!0===t.premium,eco:!0===t.eco})}return i.sort((e,t)=>e.start.getTime()-t.start.getTime()||t.minutes-e.minutes),i}(this.state("delivery_slots")));if(0===e.length)return B`<div class="windows-hint">${this.t("windows_empty")}</div>`;const t=function(e,t){if(t){const i=e.find(e=>e.date===t);if(i)return i}return e.find(e=>fi(e)>0)??e[0]}(e,this.selectedDay),i=function(e){const t=new Set((e?.windows??[]).map(e=>e.minutes));return[60,15].filter(e=>t.has(e))}(t),r=i.includes(this.selectedLength)?this.selectedLength:i[0]??60,s=function(e,t,i=!1){return(e?.windows??[]).filter(e=>e.minutes===t&&(!i||e.free>0))}(t,r,!0===this.config.hide_booked);return B`
      <div class="windows">
        <div class="day-chips" role="tablist" aria-label=${this.t("windows_days")}>
          ${e.map(e=>this.renderDayChip(e,e.date===t?.date))}
        </div>
        ${i.length>1?B`
              <div class="segmented" role="group" aria-label=${this.t("windows_length")}>
                ${i.map(e=>B`
                    <button
                      class=${_e({seg:!0,on:e===r})}
                      aria-pressed=${e===r}
                      @click=${()=>this.selectLength(e)}
                    >
                      ${15===e?this.t("windows_quarter"):this.t("windows_hour")}
                      <span class="seg-count">${fi(t,e)}</span>
                    </button>
                  `)}
              </div>
            `:W}
        ${0===s.length?B`<div class="windows-hint">${this.t("windows_none_free")}</div>`:B`<div class=${_e({"window-grid":!0,quarter:15===r})}>
              ${s.map(e=>this.renderWindow(e))}
            </div>`}
      </div>
    `}renderDayChip(e,t){const i=fi(e);return B`
      <button
        class=${_e({"day-chip":!0,on:t,none:0===i})}
        role="tab"
        aria-selected=${t}
        @click=${()=>this.selectDay(e.date)}
      >
        <span class="day-name">${this.dayLabel(e.date)}</span>
        <span class="day-free">
          ${0===i?this.t("windows_booked"):this.t("windows_free_count",{count:i})}
        </span>
      </button>
    `}renderWindow(e){const t=e.free<=0,i=e.end?`${Oe(this.hass,e.start)} – ${Oe(this.hass,e.end)}`:Oe(this.hass,e.start),r=[];t?r.push(this.t("windows_booked")):r.push(this.t("windows_free_percent",{percent:Math.round(e.free)})),!t&&!1!==this.config.show_price&&e.price>0&&r.push(this.money(e.price));const s=t?"none":e.free>=50?"ok":"warn";return B`
      <div class=${_e({window:!0,booked:t})} title=${`${i} · ${r.join(" · ")}`}>
        <div class="window-time">
          ${i}
          ${e.eco&&!t?B`<ha-icon icon="mdi:leaf" class="eco"></ha-icon>`:W}
        </div>
        <div class="window-meta">${r.join(" · ")}</div>
        ${t?W:B`<div class="capacity-bar"><div
              class=${_e({"capacity-fill":!0,[s]:!0})}
              style=${$e({width:`${ui(e.free)}%`})}
            ></div></div>`}
      </div>
    `}renderTile(e){const t=function(e,t){const i=t?.attributes??{},r=Ee(t?.state);return{type:e,start:r,end:Ee(i["Delivery Slot End"]),price:di(i.Price),capacityPercent:di(i["Remaining Capacity Percent"]),capacityMessage:hi(i["Remaining Capacity Message"]),title:hi(i.Title),subtitle:hi(i.Subtitle),available:null!==r}}(e,this.state(`${e}_slot`)),i=ci[e],r=this.t(`slot_${e}`),s=t.capacityMessage??t.subtitle??"";return B`
      <div class="tile">
        <div class="tile-head"><ha-icon icon=${i}></ha-icon><span>${r}</span></div>
        ${this.renderTileTime(t)}
        <div class="tile-meta">${this.renderMeta(t)}</div>
        ${this.renderCapacityBar(t)}
        <div class="tile-msg">${s}</div>
      </div>
    `}renderTileTime(e){return e.available&&e.start?B`
      <div class="tile-time">
        ${Ne(this.hass,e.start,{today:this.t("today"),tomorrow:this.t("tomorrow")})}
      </div>
    `:B`<div class="tile-time muted">${this.t("unavailable")}</div>`}renderMeta(e){if(!e.available||!e.start)return"";const t=[],i=Oe(this.hass,e.start);return t.push(e.end?`${i} – ${Oe(this.hass,e.end)}`:i),!1!==this.config.show_price&&null!=e.price&&t.push(0===e.price?this.t("free"):this.money(e.price)),t.join(" · ")}renderCapacityBar(e){if(!e.available||null==e.capacityPercent)return B`
        <div class="capacity-bar empty"><div class="capacity-fill muted"></div></div>
      `;const t=null==(i=e.capacityPercent)||Number.isNaN(i)?"err":i>=50?"ok":i>=10?"warn":"err";var i;return B`
      <div class="capacity-bar">
        <div
          class=${_e({"capacity-fill":!0,[t]:!0})}
          style=${$e({width:`${ui(e.capacityPercent)}%`})}
        ></div>
      </div>
    `}};bi.styles=[We,vi],e([ge()],bi.prototype,"watching",void 0),e([ge()],bi.prototype,"pollError",void 0),e([ge()],bi.prototype,"selectedDay",void 0),e([ge()],bi.prototype,"selectedLength",void 0),bi=e([he("rohlik-slots-card")],bi),Ye({type:"rohlik-slots-card",name:"Rohlík.cz Delivery Slots",description:"Express, standard and eco delivery slot times, prices and remaining capacity.",preview:!0});const xi=o`
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
`,$i={cs:{title:"Účet",xtra_days:"Xtra · {days} {days:den|dny|dní}",no_xtra:"Bez Xtra",stat_credit:"Kredit",stat_bags:"Tašky",stat_no_limit:"Objednávky bez limitu",stat_free_express:"Expres zdarma",stat_parents_club:"Rodičovský klub",stat_reusable:"Vratné tašky",deposit_caption:"záloha {amount}",remaining:"zbývá {n}",yes:"Ano",no:"Ne",last_order:"Poslední objednávka",refresh_failed:"Aktualizace se nezdařila",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz"},en:{title:"Account",xtra_days:"Xtra · {days} {days:day|days}",no_xtra:"No Xtra",stat_credit:"Credit",stat_bags:"Bags",stat_no_limit:"Orders without limit",stat_free_express:"Free express",stat_parents_club:"Parents Club",stat_reusable:"Reusable bags",deposit_caption:"{amount} deposit",remaining:"{n} left",yes:"Yes",no:"No",last_order:"Last order",refresh_failed:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device"},de:{title:"Konto",xtra_days:"Xtra · {days} {days:Tag|Tage}",no_xtra:"Ohne Xtra",stat_credit:"Guthaben",stat_bags:"Taschen",stat_no_limit:"Bestellungen ohne Mindestwert",stat_free_express:"Express kostenlos",stat_parents_club:"Elternclub",stat_reusable:"Mehrwegtaschen",deposit_caption:"Pfand {amount}",remaining:"noch {n}",yes:"Ja",no:"Nein",last_order:"Letzte Bestellung",refresh_failed:"Aktualisieren fehlgeschlagen",no_entities:"Auf diesem Gerät wurden keine Rohlík-Entitäten gefunden"}},ki={cs:{device:"Zařízení",name:"Vlastní název",stats:"Zobrazené statistiky",show_footer:"Zobrazit patičku"},en:{device:"Device",name:"Custom name",stats:"Stats shown",show_footer:"Show footer"},de:{device:"Gerät",name:"Eigener Name",stats:"Angezeigte Werte",show_footer:"Fußzeile anzeigen"}};let Si=class extends $t{constructor(){super(...arguments),this.labels=ki,this.defaults={stats:["credit","bags","no_limit","free_express","parents_club","reusable"],show_footer:!0}}extraSchema(){const e=e=>qe(this.hass,$i,e);return[{name:"stats",selector:{select:{multiple:!0,mode:"list",options:[{value:"credit",label:e("stat_credit")},{value:"bags",label:e("stat_bags")},{value:"no_limit",label:e("stat_no_limit")},{value:"free_express",label:e("stat_free_express")},{value:"parents_club",label:e("stat_parents_club")},{value:"reusable",label:e("stat_reusable")}]}}},{name:"show_footer",selector:{boolean:{}}}]}};Si=e([he("rohlik-account-card-editor")],Si);const Ai=["credit","bags","no_limit","free_express","parents_club","reusable"];function zi(e){if(null==e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isNaN(t)?null:t}let Ei=class extends Ge{constructor(){super(...arguments),this.strings=$i,this.refreshing=!1,this.refreshError=null,this.onRefresh=async()=>{if(this.refreshing)return;const e=this.entityId("credit_amount");if(e&&this.hass){this.refreshing=!0,this.refreshError=null;try{const t=await Xe(this.hass,e);if(!t)throw new Error("no config entry");await et(this.hass,t,"update_data")}catch{this.refreshError=this.t("refresh_failed")}finally{this.refreshing=!1}}}}static getConfigElement(){return document.createElement("rohlik-account-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-account-card"}}getGridOptions(){return{columns:6,rows:5,min_columns:4,min_rows:3}}statsToShow(){const e=this.config?.stats;return e&&e.length>0?e:Ai}remainingDays(){const e=zi(this.state("premium_days")?.state);if(null!=e)return e;const t=this.attr("is_premium","remaining_days");return"number"==typeof t?t:null}statContent(e,t){switch(e){case"credit":{if(!this.entityId("credit_amount"))return null;const e=zi(this.state("credit_amount")?.state);return null==e?null:{icon:"mdi:cash-multiple",labelKey:"stat_credit",value:this.money(e)}}case"bags":{if(!this.entityId("bags_amount"))return null;const e=zi(this.state("bags_amount")?.state);if(null==e)return null;const t=this.attr("bags_amount","Max Bags"),i=this.attr("bags_amount","Deposit Amount"),r=this.attr("bags_amount","Deposit Currency"),s="number"==typeof t?`${e} / ${t}`:String(e);let n;if("number"==typeof i&&i>0){const e="string"==typeof r?r:this.shop().currency;n=this.t("deposit_caption",{amount:Ie(this.hass,i,e)})}return{icon:"mdi:shopping",labelKey:"stat_bags",value:s,caption:n}}case"no_limit":{if(!t||!this.entityId("no_limit"))return null;const e=zi(this.state("no_limit")?.state);return null==e?null:{icon:"mdi:cash-100",labelKey:"stat_no_limit",value:this.t("remaining",{n:e})}}case"free_express":{if(!t||!this.entityId("free_express"))return null;const e=zi(this.state("free_express")?.state);return null==e?null:{icon:"mdi:truck-fast",labelKey:"stat_free_express",value:this.t("remaining",{n:e})}}case"parents_club":return this.entityId("is_parent")?{icon:"mdi:human-male-female-child",labelKey:"stat_parents_club",value:this.isOn("is_parent")?this.t("yes"):this.t("no")}:null;case"reusable":return this.entityId("is_reusable")?{icon:"mdi:recycle",labelKey:"stat_reusable",value:this.isOn("is_reusable")?this.t("yes"):this.t("no")}:null;default:return null}}render(){if(!this.config)return W;if(0===this.entities.size)return B`
        <ha-card style=${$e(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const e=this.isOn("is_premium"),t=this.statsToShow();return B`
      <ha-card style=${$e(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:account-star"></ha-icon>
          <span class="title">${this.deviceName()}</span>
          ${this.renderHeaderChip(e)}
        </div>

        <div class="stats-grid">${t.map(t=>this.renderStat(t,e))}</div>

        ${!1!==this.config.show_footer?this.renderFooter():W}
      </ha-card>
    `}renderHeaderChip(e){if(!e)return B`<span class="chip neutral">${this.t("no_xtra")}</span>`;const t=this.remainingDays();return B`
      <span class="chip ${null!=t&&t<7?"warn":"ok"}">${this.t("xtra_days",{days:t??"—"})}</span>
    `}renderStat(e,t){const i=this.statContent(e,t);return i?B`
      <div class="stat">
        <div class="stat-icon"><ha-icon icon=${i.icon}></ha-icon></div>
        <div class="stat-body">
          <span class="stat-value">${i.value}</span>
          ${i.caption?B`<span class="stat-caption">${i.caption}</span>`:W}
          <span class="stat-label">${this.t(i.labelKey)}</span>
        </div>
      </div>
    `:W}renderFooter(){return B`
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
            <ha-icon icon="mdi:refresh" class=${_e({spin:this.refreshing})}></ha-icon>
          </button>
        </div>
      </div>
      ${this.refreshError?this.renderError(this.refreshError):W}
    `}renderLastOrderLine(){const e=Ee(this.state("last_order")?.state);if(!e)return W;const t=this.attr("last_order","Items"),i=this.attr("last_order","Price"),r=new Intl.DateTimeFormat(this.hass.locale?.language||"en",{day:"numeric",month:"short"}).format(e),s=[`${this.t("last_order")} ${r}`];return"number"==typeof t&&s.push(this.t("items_count",{count:t})),"number"==typeof i&&s.push(this.money(i)),B`<div class="last-order">${s.join(" · ")}</div>`}};Ei.styles=[We,xi],e([ge()],Ei.prototype,"refreshing",void 0),e([ge()],Ei.prototype,"refreshError",void 0),Ei=e([he("rohlik-account-card")],Ei),Ye({type:"rohlik-account-card",name:"Rohlík.cz Account",description:"Xtra membership status, credit, bags and account perks at a glance.",preview:!0});const Ci=["l0","l1","l2","l3","items"],Ii=["month","year","all"],Oi=["auto","years","months","none"];function Di(e){return"all"===e?"all":"year"}const Ni={l0:{year:"categories_l0_this_year",all:"categories_l0_all_time"},l1:{year:"categories_this_year",all:"categories_all_time"},l2:{year:"categories_l2_this_year",all:"categories_l2_all_time"},l3:{year:"categories_l3_this_year",all:"categories_l3_all_time"},items:{year:"items_this_year",all:"items_all_time"}};function Ti(e,t){return Ni[e][t]}function Ri(e){if("number"==typeof e&&Number.isFinite(e))return e;if("string"==typeof e&&""!==e.trim()){const t=Number(e);if(Number.isFinite(t))return t}}function Mi(e,t){if(!e||"object"!=typeof e)return[];const i=e[t];if(!Array.isArray(i))return[];const r=[];for(const e of i){if(!e||"object"!=typeof e)continue;const t=e,i=t.start,s="number"==typeof i||"string"==typeof i?new Date(i):null;if(!s||Number.isNaN(s.getTime()))continue;const n=Ri(t.state)??Ri(t.max)??Ri(t.mean);void 0!==n&&r.push({month:s,total:n})}return r.sort((e,t)=>e.month.getTime()-t.month.getTime()),r}function Pi(e){return`${e.getFullYear()}-${e.getMonth()}`}const ji={cs:{title:"Útraty",not_found:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",period_month:"Tento měsíc",period_year:"Letos",period_all:"Celkem",avg_order:"průměrná objednávka",orders_count:"{n} {n:objednávka|objednávky|objednávek}",level_l0:"Hlavní",level_l1:"Kategorie",level_l2:"Podrobné",level_l3:"Nejpodrobnější",level_items:"Položky",expand_row:"{units} ks · {avg} za kus",enable_hint:"Rozpis zobrazíte zapnutím Analýzy útrat v nastavení integrace.",enriched:"obohaceno {enriched} z {total} objednávek",breakdown_year_hint:"Rozpis za rok {year} (měsíční kategorie nejsou k dispozici)",monthly_history_hint:"Měsíční historie vyžaduje recorder"},en:{title:"Spending",not_found:"Rohlík.cz entities not found on this device",period_month:"This month",period_year:"This year",period_all:"All time",avg_order:"avg order",orders_count:"{n} {n:order|orders}",level_l0:"Top",level_l1:"Categories",level_l2:"Detailed",level_l3:"Specific",level_items:"Items",expand_row:"{units} units · {avg} per unit",enable_hint:"Enable Spending Analytics in the integration options to see a breakdown.",enriched:"{enriched} of {total} orders enriched",breakdown_year_hint:"Breakdown shown for {year} (per-month categories are not available)",monthly_history_hint:"Monthly history needs the recorder"},de:{title:"Ausgaben",not_found:"Auf diesem Gerät wurden keine Rohlík-Entitäten gefunden",period_month:"Diesen Monat",period_year:"Dieses Jahr",period_all:"Gesamt",avg_order:"Ø Bestellung",orders_count:"{n} {n:Bestellung|Bestellungen}",level_l0:"Hauptgruppen",level_l1:"Kategorien",level_l2:"Detailliert",level_l3:"Am genauesten",level_items:"Artikel",expand_row:"{units} Stück · {avg} pro Stück",enable_hint:"Für die Aufschlüsselung die Ausgabenanalyse in den Optionen der Integration einschalten.",enriched:"{enriched} von {total} Bestellungen ausgewertet",breakdown_year_hint:"Aufschlüsselung für {year} (keine Kategorien pro Monat verfügbar)",monthly_history_hint:"Der Monatsverlauf braucht den Recorder"}},Ui={cs:{device:"Zařízení",name:"Vlastní název",default_period:"Výchozí období",default_level:"Výchozí úroveň",top_n:"Počet položek",chart:"Graf",show_totals:"Zobrazit souhrn"},en:{device:"Device",name:"Custom name",default_period:"Default period",default_level:"Default level",top_n:"Row count",chart:"Chart",show_totals:"Show totals"},de:{device:"Gerät",name:"Eigener Name",default_period:"Standardzeitraum",default_level:"Standardebene",top_n:"Anzahl Zeilen",chart:"Diagramm",show_totals:"Summen anzeigen"}},Li=o`
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
`,Fi={cs:{month:"Tento měsíc",year:"Letos",all:"Celkem"},en:{month:"This month",year:"This year",all:"All time"},de:{month:"Diesen Monat",year:"Dieses Jahr",all:"Gesamt"}},Hi={cs:{l0:"Hlavní",l1:"Kategorie",l2:"Podrobné",l3:"Nejpodrobnější",items:"Položky"},en:{l0:"Top",l1:"Categories",l2:"Detailed",l3:"Specific",items:"Items"},de:{l0:"Hauptgruppen",l1:"Kategorien",l2:"Detailliert",l3:"Am genauesten",items:"Artikel"}},qi={cs:{auto:"Automaticky",years:"Roky",months:"Měsíce",none:"Žádný"},en:{auto:"Automatic",years:"Years",months:"Months",none:"None"},de:{auto:"Automatisch",years:"Jahre",months:"Monate",none:"Keins"}};let Bi=class extends $t{constructor(){super(...arguments),this.labels=Ui,this.defaults={default_period:"year",default_level:"l1",top_n:10,chart:"auto",show_totals:!0}}extraSchema(){return[{name:"default_period",selector:{select:{mode:"dropdown",options:Ii.map(e=>({value:e,label:qe(this.hass,Fi,e)}))}}},{name:"default_level",selector:{select:{mode:"dropdown",options:Ci.map(e=>({value:e,label:qe(this.hass,Hi,e)}))}}},{name:"top_n",selector:{number:{min:1,max:50,mode:"box"}}},{name:"chart",selector:{select:{mode:"dropdown",options:Oi.map(e=>({value:e,label:qe(this.hass,qi,e)}))}}},{name:"show_totals",selector:{boolean:{}}}]}};Bi=e([he("rohlik-spending-card-editor")],Bi);let Ki=class extends Ge{constructor(){super(...arguments),this.strings=ji,this.expanded=new Set,this.monthlyError=!1,this.hasSensor=e=>void 0!==this.entityId(e)}static getConfigElement(){return document.createElement("rohlik-spending-card-editor")}static getStubConfig(e){return{...Ge.getStubConfig(e),type:"custom:rohlik-spending-card"}}getCardSize(){return 6}getGridOptions(){return{columns:12,rows:12,min_columns:6,min_rows:5}}get effectivePeriod(){return this.period??this.config?.default_period??"year"}resolveChart(e){const t=this.config?.chart??"auto";return"auto"!==t?t:!1===this.config?.show_years?"none":"month"===e?"months":"years"}get levelsForCurrentPeriod(){return e=this.hasSensor,t=Di(this.effectivePeriod),Ci.filter(i=>e(Ti(i,t)));var e,t}get hasAnyAnalytics(){return Ci.some(e=>this.hasSensor(Ti(e,"year"))||this.hasSensor(Ti(e,"all")))}get effectiveLevel(){const e=this.levelsForCurrentPeriod;if(0===e.length)return;const t=this.level??this.config?.default_level??"l1";return e.includes(t)?t:e[0]}render(){if(!this.config)return W;if(!this.state("monthly_spent"))return B`<ha-card style=${$e(this.accentStyle)}>
        ${this.renderError(this.t("not_found"))}
      </ha-card>`;const e=this.effectivePeriod,t=!1!==this.config.show_totals,i=this.resolveChart(e);return B`
      <ha-card style=${$e(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
          <span class="title">${this.t("title")}</span>
          <div class="segmented">
            <button
              class=${_e({pill:!0,active:"month"===e})}
              type="button"
              @click=${()=>this.period="month"}
            >
              ${this.t("period_month")}
            </button>
            <button
              class=${_e({pill:!0,active:"year"===e})}
              type="button"
              @click=${()=>this.period="year"}
            >
              ${this.t("period_year")}
            </button>
            <button
              class=${_e({pill:!0,active:"all"===e})}
              type="button"
              @click=${()=>this.period="all"}
            >
              ${this.t("period_all")}
            </button>
          </div>
        </div>

        ${t?this.renderTotals(e):W}
        ${"years"===i?this.renderYearsChart():W}
        ${"months"===i?this.renderMonthsChart():W}
        ${this.renderBreakdown(e)}
        ${this.renderFreshness()}
      </ha-card>
    `}updated(e){super.updated(e),this.maybeFetchMonthly()}maybeFetchMonthly(){if(!this.config||!this.hass)return;if("months"!==this.resolveChart(this.effectivePeriod))return;const e=this.entityId("monthly_spent");if(!e)return;const t=new Date,i=`${t.getFullYear()}-${t.getMonth()}`,r=`${e}:${i}`;if(this.monthlyFetchKey===r)return;this.monthlyFetchKey=r;const s=new Date(t.getFullYear(),t.getMonth()-11,1);this.hass.callWS({type:"recorder/statistics_during_period",start_time:s.toISOString(),end_time:t.toISOString(),statistic_ids:[e],period:"month",units:{},types:["state"]}).then(t=>{this.monthly={entityId:e,monthKey:i,stats:Mi(t,e)},this.monthlyError=!1}).catch(()=>{this.monthlyError=!0})}renderTotals(e){const t=this.state("monthly_spent"),i=Number(t?.state),r=new Intl.DateTimeFormat(Ce(this.hass),"month"===e?{month:"long",year:"numeric"}:{month:"long"}).format(new Date),s=this.state("yearly_spent"),n=Number(s?.state),o=s?.attributes?.year,a=Number(s?.attributes?.order_count??0),l=void 0!==o?`${o} · ${this.t("orders_count",{n:a})}`:this.t("orders_count",{n:a});let c,d;if("year"===e)c=Number(s?.attributes?.average_order_value),d=this.t("avg_order");else{const e=this.state("alltime_spent");c=Number(e?.attributes?.average_order_value);const t=Number(e?.attributes?.order_count??0);d=this.t("orders_count",{n:t})}return B`
      <div class="totals">
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(i)?this.money(i):"–"}
          </div>
          <div class="totals-caption">${r}</div>
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
          <div class="totals-caption">${d}</div>
        </div>
      </div>
    `}renderYearsChart(){const e=function(e){if(!e||"object"!=typeof e)return[];const t=[];for(const[i,r]of Object.entries(e)){const e=Number(i);if(!Number.isFinite(e))continue;if(!r||"object"!=typeof r)continue;const s=r;t.push({year:e,total:Ri(s.total)??0,orderCount:Ri(s.order_count)??0})}return t.sort((e,t)=>e.year-t.year),t}(this.state("alltime_spent")?.attributes?.by_year);if(e.length<2)return W;const t=(new Date).getFullYear();return this.renderBarChart(e.map(e=>({key:String(e.year),label:String(e.year),total:e.total,highlighted:e.year===t})))}renderMonthsChart(){const e=this.entityId("monthly_spent");if(!e)return W;if(this.monthlyError)return B`<div class="chart-hint">${this.t("monthly_history_hint")}</div>`;if(!this.monthly||this.monthly.entityId!==e)return W;const t=new Date,i=Number(this.state("monthly_spent")?.state),r=function(e,t,i){const r=new Map;for(const t of e)r.set(Pi(t.month),t.total);const s=[];for(let e=11;e>=0;e--){const n=new Date(t.getFullYear(),t.getMonth()-e,1),o=0===e&&void 0!==i&&Number.isFinite(i)?i:r.get(Pi(n))??0;s.push({month:n,total:o})}return s}(this.monthly.stats,t,Number.isFinite(i)?i:void 0),s=new Intl.DateTimeFormat(Ce(this.hass),{month:"short"});return this.renderBarChart(r.map((e,t)=>({key:`${e.month.getFullYear()}-${e.month.getMonth()}`,label:s.format(e.month),total:e.total,highlighted:t===r.length-1})))}renderBarChart(e){if(e.length<2)return W;const t=e.reduce((e,t)=>Math.max(e,t.total),0)||1,i=40*e.length-12+12;return B`
      <svg
        class="chart-svg"
        viewBox="0 0 ${i} ${118}"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        ${Ht(e,e=>e.key,(e,i)=>{const r=Math.max(2,e.total/t*90),s=6+40*i,n=90-r+6,o=e.highlighted?"var(--rohlik-accent)":"color-mix(in srgb, var(--primary-text-color) 15%, transparent)";return K`
              <rect x=${s} y=${n} width=${28} height=${r} rx="4" fill=${o}>
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
    `}renderBreakdown(e){if(!this.hasAnyAnalytics)return B`<div class="breakdown-hint">${this.t("enable_hint")}</div>`;const t=Di(e),i=this.levelsForCurrentPeriod,r=this.effectiveLevel;if(!r)return W;const s=this.config.top_n??10,n=this.state(Ti(r,t)),{entries:o,enrichedOrders:a,totalOrders:l}=function(e,t){const i=e?.attributes??{},r=i.categories??i.items,s=Array.isArray(r)?r:[],n=[];for(const e of s){if(!e||"object"!=typeof e)continue;const t=e,i="string"==typeof t.name&&""!==t.name.trim()?t.name:void 0,r=Ri(t.spent);i&&void 0!==r&&n.push({name:i,spent:r,units:Ri(t.units)??0,avgUnitPrice:Ri(t.avg_unit_price)??0,id:"string"==typeof t.id||"number"==typeof t.id?t.id:void 0})}n.sort((e,t)=>t.spent-e.spent);const o=Ri(i.total_count)??n.length,a=Ri(i.enriched_orders),l=Ri(i.total_orders);return{entries:n.slice(0,Math.max(0,t)),totalCount:o,enrichedOrders:a,totalOrders:l}}(n,s),c=function(e){const t=e.reduce((e,t)=>Math.max(e,t.spent),0);return t<=0?e.map(()=>0):e.map(e=>Math.max(0,Math.min(100,e.spent/t*100)))}(o),d=this.state("yearly_spent")?.attributes?.year??(new Date).getFullYear();return B`
      ${"month"===e?B`<div class="breakdown-year-hint">
            ${this.t("breakdown_year_hint",{year:d})}
          </div>`:W}
      ${i.length>1?B`
            <div class="pills-row">
              ${Ht(i,e=>e,e=>B`
                  <button
                    class=${_e({pill:!0,active:r===e})}
                    type="button"
                    @click=${()=>this.level=e}
                  >
                    ${this.t(`level_${e}`)}
                  </button>
                `)}
            </div>
          `:W}
      ${Ht(o,e=>e.id??e.name,(e,t)=>this.renderBreakdownRow(e,c[t]))}
      ${void 0!==a&&void 0!==l?B`
            <div class="breakdown-footer">
              ${this.t("enriched",{enriched:a,total:l})}
            </div>
          `:W}
    `}renderBreakdownRow(e,t){const i=String(e.id??e.name),r=this.expanded.has(i);return B`
      <div
        class="breakdown-row"
        @click=${()=>this.toggleExpanded(i)}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.toggleExpanded(i))}}
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
        ${r?B`
              <div class="breakdown-expand">
                ${this.t("expand_row",{units:e.units,avg:this.money(e.avgUnitPrice)})}
              </div>
            `:W}
      </div>
    `}toggleExpanded(e){const t=new Set(this.expanded);t.has(e)?t.delete(e):t.add(e),this.expanded=t}};Ki.styles=[We,Li],e([ge()],Ki.prototype,"period",void 0),e([ge()],Ki.prototype,"level",void 0),e([ge()],Ki.prototype,"expanded",void 0),e([ge()],Ki.prototype,"monthly",void 0),e([ge()],Ki.prototype,"monthlyError",void 0),Ki=e([he("rohlik-spending-card")],Ki),Ye({type:"rohlik-spending-card",name:"Rohlík.cz Spending",description:"Monthly, yearly and all-time spending totals with a category breakdown."});
