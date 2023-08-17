!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("vue")):"function"==typeof define&&define.amd?define(["vue"],n):(e="undefined"!=typeof globalThis?globalThis:e||self).WKToast=n(e.Vue)}(this,(function(e){"use strict";function n(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function r(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}var i=e.defineComponent({name:"wk-toast",props:{id:String,className:String,horizontalPosition:String,verticalPosition:String,transition:String,duration:Number,message:String,closeable:Boolean},setup(n){const t=n;let o=null;const r=e.reactive({option:{},showing:!1,timer:null}),i=e.computed((()=>{let e=[],n=t.className,o=t.horizontalPosition,r=t.verticalPosition,i=t.closeable;return n&&("string"==typeof n&&e.push(n),Array.isArray(n)&&(e=e.concat(n))),o&&e.push(`wk-${o}`),i&&e.push("wk-closeable"),r&&e.push(`wk-${r}`),e.join(" ")}));let s=e.ref(!1);e.onMounted((()=>{A(),r.showing=!0})),e.onUnmounted((()=>{clearTimeout(r.timer)}));const A=()=>{t.duration>0&&(r.timer=setTimeout((()=>{s.value||c()}),t.duration))},c=()=>{s.value=!0,r.timer=null},a=()=>{r.showing=!1,document.body.removeChild(document.getElementById(n.id)),o.removeEventListener("transitionend",a,!1)};return e.watch(s,(e=>{e&&(r.showing=!1,o.addEventListener("transitionend",a,!1))})),{setRefNode:e=>{o=e},close:c,closed:s,classes:i,options:t,...e.toRefs(r)}}});const s=e.createVNode("img",{src:"data:image/png;base64,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",width:"100%"},null,-1);i.render=function(n,t,o,r,i,A){return e.openBlock(),e.createBlock(e.Transition,{name:n.options.transition},{default:e.withCtx((()=>[e.withDirectives(e.createVNode("div",{class:["wk-wrapper",n.classes],ref:n.setRefNode},[e.createVNode("span",{class:"wk-content",innerHTML:n.options.message},null,8,["innerHTML"]),n.options.closeable?(e.openBlock(),e.createBlock("a",{key:0,class:"wk-close",onClick:t[1]||(t[1]=e=>n.close())},[s])):e.createCommentVNode("v-if",!0)],2),[[e.vShow,n.showing]])])),_:1},8,["name"])},i.__file="src/index.vue";var A={className:"",horizontalPosition:"center",verticalPosition:"bottom",transition:"slide-down",duration:3e3,message:"",closeable:!1},c=1,a=function(){function t(e){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),A=Object.assign({},A,e)}var o,s,a;return o=t,(s=[{key:"show",value:function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=null,s=null,a="wk-toast_"+c++;(o=document.createElement("div")).id=a,s=e.createVNode(i,r(r(r({},A),t),{},{message:n,id:a}),null),e.render(s,o),document.body.appendChild(o)}}])&&n(o.prototype,s),a&&n(o,a),t}();return a.install=function(e,n){var t=new a(n).show;e.config.globalProperties.$wkToast=t,e.provide("WKToast",t),e.component("WKToast",a)},a}));
