"use strict";(this.webpackChunkairena_main=this.webpackChunkairena_main||[]).push([[592],{9421:(e,t,s)=>{s.d(t,{Z:()=>l});var i=s(7294),a=s(323),o=s(9954);class l extends a.Z{constructor(e){super(e)}render(){return i.createElement("section",{className:"base-foot"},i.createElement("div",{className:"flex-col5 box-foot"},i.createElement("img",{className:"logo",src:o,alt:""}),i.createElement("div",{className:"copy"},"COPYRIGHT 2023 BY AIRENA. ALL RIGHTS RESERVED.")))}}},2783:(e,t,s)=>{s.d(t,{Z:()=>m});var i=s(6171),a=s(7294),o=s(323);function l(e,t){return!!e&&e.contains(t)}var c=s(3126);var n=s(5407);class r extends o.Z{constructor(e){super(e),(0,i.Z)(this,"state",{clicked:!1}),(0,i.Z)(this,"onItemClick",(e=>{const{stopPropagation:t,disabled:s,delayTime:i,onClick:a}=this.props;if(t&&(e.nativeEvent.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault()),this.buttonCheck.check())try{if(!0===s)return;this.curTimeout=(0,n.iK)((()=>{this.setState({clicked:!0})}),10),this.timeout&&this.timeout(),this.timeout=(0,n.iK)((()=>{this.setState({clicked:!1})}),i||200),a&&a(e)}catch(e){console.log(e)}})),(0,i.Z)(this,"componentWillUnmount",(()=>{this.curTimeout&&this.curTimeout(),this.timeout&&this.timeout()})),this.buttonCheck=new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:300;this.timeDelay=e,this.time=null}setTimeDelay(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:300;this.timeDelay=e}check(){const e=(new Date).valueOf();return!(this.time&&e-this.time<=this.timeDelay||(this.time=e,0))}}(e.delayTime),this.isMob=(0,n.tq)()}render(){const{className:e,style:t,statId:s,clickId:i,disabled:o,...l}=this.props,{clicked:r}=this.state,h=o||this.isMob?t:{cursor:"pointer",...t};return a.createElement("div",(0,c.Z)({},l,{className:(0,n.AK)(r?"clicked":"",o?"disabled":"",e),style:h,onClick:this.onItemClick}),this.props.children)}}(0,i.Z)(r,"defaultProps",{disabled:!1});var h=s(9954);class m extends o.Z{constructor(e){super(e),(0,i.Z)(this,"domListener",null),(0,i.Z)(this,"popupRef",null),(0,i.Z)(this,"setListener",(()=>{const e=this.getRootDomNode();var t,s,i;this.cancelListener(),this.domListener=(s="click",i=e=>{const{target:t}=e,s=this.getRootDomNode(),i=this.getPopupDomNode();l(s,t)&&!l(i,t)&&(console.log("直接关闭===",t,l(i,t)),this.hidePop())},!0,(t=e).addEventListener&&t.addEventListener(s,i,true),{remove:()=>{t.removeEventListener&&t.removeEventListener(s,i)}})})),(0,i.Z)(this,"cancelListener",(()=>{var e;this.domListener&&(null===(e=this.domListener)||void 0===e||e.remove(),this.domListener=null)})),(0,i.Z)(this,"getRootDomNode",(()=>{const{getRootDomNode:e}=this.props;return e?e():window.document.body})),(0,i.Z)(this,"showPop",(()=>{const{showPop:e}=this.state;console.log("点击===",e),e?this.setState({showPop:!1}):this.setState({showPop:!0})})),(0,i.Z)(this,"hidePop",(()=>{this.setState({showPop:!1})})),this.state={showPop:!1},this.popupRef=a.createRef()}componentDidUpdate(e,t){!t.showPop&&this.state.showPop?this.setListener():t.showPop&&!this.state.showPop&&this.cancelListener()}getPopupDomNode(){return this.popupRef.current||null}render(){const{active:e}=this.props,{showPop:t}=this.state;return a.createElement("div",{className:"base-head row-out col-out"},a.createElement("a",{className:"hvr-pic flex-in",href:"/"},a.createElement("img",{className:"logo",src:h,alt:""})),a.createElement("div",{className:"row-end col-out box-end"},a.createElement("div",{className:"nav-list flex-in fit-pc"},a.createElement("div",{className:"line-col hide"}),a.createElement("a",{className:"nav-item flex-in"+(1===e?" active":""),href:"#/",target:""}," HOME "),a.createElement("div",{className:"line-col "}),a.createElement("a",{className:"nav-item flex-in"+(2===e?" active":""),href:"#/product",target:""}," Product "),a.createElement("div",{className:"line-col "}),a.createElement("a",{className:"nav-item flex-in",href:"https://kverso.gitbook.io/airena-dapp-lightpaper-en/",target:"_blank"}," Light Paper "),a.createElement("div",{className:"line-col "}),a.createElement("a",{className:"nav-item flex-in"+(4===e?" active":""),href:"#/download",target:""}," Download "))),a.createElement("div",{className:"tip-pop fit-h5",ref:this.popupRef},a.createElement(r,{className:"tip-pop-btn",onClick:this.showPop},a.createElement("svg",{className:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"200",height:"200"},a.createElement("path",{d:"M85.333333 256V170.666667h853.333334v85.333333H85.333333z m0 597.333333v-85.333333h853.333334v85.333333H85.333333z m0-298.666666v-85.333334h853.333334v85.333334H85.333333z",fill:"#FFFFFF"}))),t?a.createElement("div",{className:"tip_pop-content"},a.createElement("ul",{className:"base-navi"},a.createElement("li",{className:"row-out col-in box-head"},a.createElement("div",{className:"btn-back",onClick:this.hidePop},a.createElement("svg",{className:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1729",width:"200",height:"200"},a.createElement("path",{d:"M703.36 175.95c11.58 13.35 10.14 33.56-3.22 45.14l-331.38 282.1c-4.61 4-4.6 11.17 0.04 15.14l331.39 284.48c13.41 11.51 14.95 31.71 3.44 45.12-11.51 13.41-31.71 14.95-45.12 3.44L279.62 526.12c-9.27-7.96-9.3-22.29-0.07-30.29l378.68-323.1c13.35-11.57 33.56-10.13 45.13 3.22z","p-id":"1730",fill:"#777777"}))),a.createElement("div",{className:"btn-close",onClick:this.hidePop},a.createElement("svg",{className:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"279081",width:"200",height:"200"},a.createElement("path",{d:"M217.33 176.54c-8.19 0-16.38 3.12-22.63 9.37-12.5 12.5-12.5 32.76 0 45.25L783.74 820.2c6.25 6.25 14.44 9.37 22.63 9.37s16.38-3.12 22.63-9.37c12.5-12.5 12.5-32.76 0-45.25L239.95 185.92c-6.24-6.25-14.43-9.38-22.62-9.38z","p-id":"279082",fill:"#777777"}),a.createElement("path",{d:"M806.36 176.54c-8.19 0-16.38 3.12-22.63 9.37L194.7 774.95c-12.5 12.5-12.5 32.76 0 45.25 6.25 6.25 14.44 9.37 22.63 9.37s16.38-3.12 22.63-9.37L829 231.16c12.5-12.5 12.5-32.76 0-45.25a31.98 31.98 0 0 0-22.64-9.37z","p-id":"279083",fill:"#777777"})))),a.createElement("li",{className:"row-out col-in"},a.createElement("a",{href:"#/"},"HOME")),a.createElement("li",{className:"row-out col-in"},a.createElement("a",{href:"#/product"},"PRODUCT")),a.createElement("li",{className:"row-out col-in"},a.createElement("a",{href:"https://kverso.gitbook.io/airena-dapp-lightpaper-en/",target:"_blank"},"LIGHT PAPER")),a.createElement("li",{className:"row-out col-in"},a.createElement("a",{href:"#/download"},"DOWNLOAD")))):null))}}},5116:(e,t,s)=>{s.d(t,{Z:()=>l});var i=s(7294),a=s(323);class o extends a.Z{constructor(e){super(e),console.log("page")}render(){return i.createElement("div",null)}}const l=o},9954:e=>{e.exports=".././assets/images/6a5ede519b164c78341e.png"}}]);