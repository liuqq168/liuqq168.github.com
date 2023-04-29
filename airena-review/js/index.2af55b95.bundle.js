(()=>{"use strict";var e,t,n,r={323:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(8222),o=n.n(r),a=n(7606),s=n.n(a),i=n(7294),l=n(2902);class c extends i.PureComponent{constructor(e){super(e),console.log("BaseComponent")}setState(e,t){let n;e.constructor===Object?n=t=>{const n=o()(e);s()(n).call(n,(n=>{t[n]=e[n]}))}:e.constructor===Function&&(n=e),super.setState((0,l.ZP)(n),(()=>{t&&t()}))}componentDidCatch(e,t){return console.log("错误信息==",this.constructor.name,"=组件出错:",e,t),!1}render(){return i.createElement("div",null)}}},2969:(e,t,n)=>{var r=n(7294),o=n(3935),a=n(6171);const s={routes:[{exact:!0,path:"/",isDynamic:!0,component:r.lazy((()=>Promise.all([n.e(592),n.e(177)]).then(n.bind(n,7750))))},{exact:!0,path:"/product",isDynamic:!0,component:r.lazy((()=>Promise.all([n.e(592),n.e(18)]).then(n.bind(n,3419))))},{exact:!0,path:"/download",isDynamic:!0,component:r.lazy((()=>Promise.all([n.e(592),n.e(895)]).then(n.bind(n,955))))}]};var i=n(7606),l=n.n(i),c=n(323),d=n(9656);const u=()=>r.createElement("div",null,"No Match");class m extends c.Z{constructor(){var e;super(...arguments),e=this,(0,a.Z)(this,"renderRouter",(function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return l()(t).call(t,(t=>{let{path:n,exact:o}=t;return r.createElement(d.AW,{key:n,path:n,exact:!!o,render:()=>e.renderPage(t)})}))})),(0,a.Z)(this,"renderPage",(e=>{const{component:t,path:n,loadingFallback:o}=e,a=t;return r.createElement(r.Suspense,{fallback:o||"正在加载中...",key:n},r.createElement(a,null))}))}render(){const{routers:e}=this.props;return r.createElement(d.rs,null,this.renderRouter(e),r.createElement(d.AW,{component:u}))}}const p=(0,d.EN)(m);n(3126);const h=(f={},r.createContext(f));var f;const g=h,{Consumer:v}=h,{Provider:y}=h;document.title="airena";class E extends r.Component{constructor(){super(...arguments),(0,a.Z)(this,"a",2),(0,a.Z)(this,"getLiveContextValue",(()=>({token:"123",uid:1233,test:this.test}))),(0,a.Z)(this,"test",(()=>{console.log("aa=2=",this.a)}))}render(){return console.log("abc331"),r.createElement(r.Fragment,null,r.createElement(g.Provider,{value:this.getLiveContextValue()},r.createElement(p,{routers:s.routes})))}}const w=E;var b=n(7424),C=n(4282),O=n.n(C),k=n(282),P=n(2902),S=n(6641);let D=(0,k.createHashHistory)();const T=D,A=e=>{if(e&&e.query)return e;const t=e&&e.search;if("string"!=typeof t||0===t.length)return{...e,query:{}};const n=t.substring(1).split("&"),r=O()(n).call(n,((e,t)=>{const[n,r]=t.split("=");return{...e,[n]:r}}),{});return{...e,query:r}},N={location:A(D.location),action:D.action},_=(0,P.ZP)(((e,t)=>{if(t.type===S.nk){const{location:n,action:r}=t.payload;return e.action=r,e.location=A(n),e}return e}),N);var I=n(5281);const x={token:null,SSOToken:null,status:function(e){return e.none="none",e.done="done",e.error="error",e.requesting="requesting",e}({}).none,nickName:"",userId:0,headId:0},j=(0,P.ZP)(((e,t)=>{switch(t.type){case"UPDATE_USER_ID":return console.log("当前的用户信息==UPDATE_USER_ID=",t.payload),e.userId=t.payload,e;case"UPDATE_SSO_TOKEN":return console.log("当前的用户信息==UPDATE_SSO_TOKEN=",t.payload),e.token=t.payload,e;case"UPDATE_USER_NAME_HEAD_ID":return e.nickName=t.payload.name,e.headId=t.payload.headId,e;default:return e}}),x),B=(0,I.UY)({router:_,user:j});let M=null;function F(e){const t=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||I.qC;return M=(0,I.MT)(B,e,t((0,I.md)((0,S.zk)(T)))),console.log("process.env.ENV ===","prod"),M}var W=n(2357),Z=n.n(W);let z=function(e){return e.PC="pc",e.MOBILE="mobile",e.TV="tv",e}({});class U{static getDesign(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z.MOBILE;return U.DesignScreen[e]}}(0,a.Z)(U,"DesignScreen",{[z.PC]:{WIDTH:845,RATIO:100},[z.MOBILE]:{WIDTH:750,RATIO:100},[z.TV]:{WIDTH:1920,RATIO:100}});class q extends r.Component{constructor(){super(...arguments),(0,a.Z)(this,"resize",(()=>{const e=U.getDesign(),t=document.documentElement,n=()=>Z()(window.getComputedStyle(t,null)["font-size"]),r=this.props.WIDTH||e.WIDTH,o=(()=>{let e=0;try{const t=document.documentElement;e=Math.max(t.offsetWidth||0,t.clientWidth||0,t.getBoundingClientRect().width||0),(!e||e<=0)&&(180==window.orientation||0==window.orientation?e=window.innerWidth||window.screen&&window.screen.width||window.screen&&window.screen.availWidth||0:90!=window.orientation&&-90!=window.orientation||(e=window.innerHeight||window.screen&&window.screen.height||window.screen&&window.screen.availHeight||0))}catch(e){console.log("获取屏幕宽度出错")}return 0|e})(),a=n();let s=e.RATIO/r*o;o>750&&(s=o/1920*100),t.style.fontSize="".concat(s,"px"),a!==s&&Math.abs(a-s)>2&&(t.style.fontSize="100px",t.style.fontSize="".concat(100/n()*s,"px"))}))}componentDidMount(){this.resize(),window.onresize=this.resize}render(){return this.props.children}}var H=n(5407),L=n(3253),R=n.n(L);const K=e=>{e.preventDefault(),window.location.href=window.location.href.split("#")[0]},V=e=>{let{message:t,isDialog:n}=e;return!1===n?r.createElement("div",{className:"error-custom-style"},r.createElement("div",{className:"error-boundary"},t,r.createElement("span",{className:"reload",onClick:K},"刷新"))):r.createElement(R(),{isOpen:!0,className:(0,H.AK)("error-boundary"),overlayClassName:(0,H.AK)("error-boundary-modal-overlay","error-custom-modal-style"),appElement:document.body},r.createElement("div",null,t,r.createElement("span",{className:"reload",onClick:K},"刷新")))};V.defaultProps={message:"页面崩溃啦！"};const Q=V,X=e=>{e.preventDefault(),window.location.href=window.location.href.split("#")[0]},G=e=>{let{message:t}=e;return r.createElement("div",{className:"error-custom-style-page"},r.createElement("div",{className:"error-custom-style-mantle-page"},r.createElement("div",{className:"error-boundary-page"},t,r.createElement("span",{className:"reload-page",onClick:X},"刷新"))))};G.defaultProps={message:"加载失败,请重试!"};const J=G;class Y extends r.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){console.log("ErrorBoundary",e,t),this.setState({error:e})}getErrorComponent(e){return"view"===e?J:Q}renderErrorComponent(){return r.createElement("div",null,"123")}render(){return this.state.hasError?this.renderErrorComponent():this.props.children}}(0,a.Z)(Y,"defaultProps",{type:"global",message:"页面崩溃啦！",isDialog:!1});try{const e=F({}),t=document.getElementById("root");R().setAppElement(t),o.render(r.createElement(q,null,r.createElement(Y,null,r.createElement(b.Provider,{store:e},r.createElement(S.xI,{history:T},r.createElement(w,null))))),document.getElementById("root"))}catch(e){console.log("e")}},5407:(e,t,n)=>{n.d(t,{AK:()=>u,iK:()=>p,tq:()=>m});var r=n(8309),o=n.n(r),a=n(86),s=n.n(a),i=n(8222),l=n.n(i),c=n(7198),d=n.n(c);function u(){const e=[];for(let n=0;n<arguments.length;n+=1){const r=n<0||arguments.length<=n?void 0:arguments[n];if(r){const n=typeof r;if("string"===n||"number"===n)e.push(this&&this[r]||r);else if(o()(r))e.push(u(...r));else if("object"===n){var t;const n={}.hasOwnProperty;s()(t=l()(r)).call(t,(t=>{n.call(r,t)&&r[t]&&e.push(this&&this[t]||t)}))}}}return e.join(" ")}function m(){return!!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)}function p(e,t){const n=d()(e,t);return()=>{window.clearTimeout(n)}}n(7293)}},o={};function a(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={id:e,loaded:!1,exports:{}};return r[e](n,n.exports,a),n.loaded=!0,n.exports}a.m=r,e=[],a.O=(t,n,r,o)=>{if(!n){var s=1/0;for(d=0;d<e.length;d++){for(var[n,r,o]=e[d],i=!0,l=0;l<n.length;l++)(!1&o||s>=o)&&Object.keys(a.O).every((e=>a.O[e](n[l])))?n.splice(l--,1):(i=!1,o<s&&(s=o));if(i){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,r,o]},a.F={},a.E=e=>{Object.keys(a.F).map((t=>{a.F[t](e)}))},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,n)=>(a.f[n](e,t),t)),[])),a.u=e=>"js/"+{18:"product",177:"home",592:"common",895:"download"}[e]+"."+{18:"dfea08fa",177:"c0e8bd0a",592:"a97d5bc3",895:"33648234"}[e]+".chunk.js",a.miniCssF=e=>"css/"+{18:"product",177:"home",592:"common",895:"download"}[e]+"."+{18:"5c0d049f",177:"44b90828",592:"651e2d82",895:"ee86caa6"}[e]+".chunk.css",a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),t={},n="airena-main:",a.l=(e,r,o,s)=>{if(t[e])t[e].push(r);else{var i,l;if(void 0!==o)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==n+o){i=u;break}}i||(l=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",n+o),i.src=e),t[e]=[r];var m=(n,r)=>{i.onerror=i.onload=null,clearTimeout(p);var o=t[e];if(delete t[e],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((e=>e(r))),n)return n(r)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=m.bind(null,i.onerror),i.onload=m.bind(null,i.onload),l&&document.head.appendChild(i)}},a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),a.p="https://liuqq168.github.io/airena-review/",(()=>{if("undefined"!=typeof document){var e={826:0};a.f.miniCss=(t,n)=>{e[t]?n.push(e[t]):0!==e[t]&&{18:1,177:1,592:1,895:1}[t]&&n.push(e[t]=(e=>new Promise(((t,n)=>{var r=a.miniCssF(e),o=a.p+r;if(((e,t)=>{for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=(s=n[r]).getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(o===e||o===t))return s}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){var s;if((o=(s=a[r]).getAttribute("data-href"))===e||o===t)return s}})(r,o))return t();((e,t,n,r,o)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",a.onerror=a.onload=n=>{if(a.onerror=a.onload=null,"load"===n.type)r();else{var s=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=i,a.parentNode&&a.parentNode.removeChild(a),o(l)}},a.href=t,document.head.appendChild(a)})(e,o,0,t,n)})))(t).then((()=>{e[t]=0}),(n=>{throw delete e[t],n})))}}})(),(()=>{var e={826:0};a.f.j=(t,n)=>{var r=a.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var o=new Promise(((n,o)=>r=e[t]=[n,o]));n.push(r[2]=o);var s=a.p+a.u(t),i=new Error;a.l(s,(n=>{if(a.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",i.name="ChunkLoadError",i.type=o,i.request=s,r[1](i)}}),"chunk-"+t,t)}},a.F.j=t=>{if(!a.o(e,t)||void 0===e[t]){e[t]=null;var n=document.createElement("link");a.nc&&n.setAttribute("nonce",a.nc),n.rel="prefetch",n.as="script",n.href=a.p+a.u(t),document.head.appendChild(n)}},a.O.j=t=>0===e[t];var t=(t,n)=>{var r,o,[s,i,l]=n,c=0;if(s.some((t=>0!==e[t]))){for(r in i)a.o(i,r)&&(a.m[r]=i[r]);if(l)var d=l(a)}for(t&&t(n);c<s.length;c++)o=s[c],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(d)},n=this.webpackChunkairena_main=this.webpackChunkairena_main||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),a.O(0,[826],(()=>{[592,177,18,895].map(a.E)}),5);var s=a.O(void 0,[216],(()=>a(2969)));s=a.O(s)})();