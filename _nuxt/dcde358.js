(window.webpackJsonp=window.webpackJsonp||[]).push([[13,12],{326:function(t,n,r){var content=r(342);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(44).default)("2b1530f8",content,!0,{sourceMap:!1})},328:function(t,n,r){"use strict";r.d(n,"a",(function(){return e})),r.d(n,"b",(function(){return o}));r(14),r(32),r(329),r(36),r(38),r(71);function e(){for(var t={},n=arguments.length,r=new Array(n),e=0;e<n;e++)r[e]=arguments[e];r.forEach((function(n){n.sayit.forEach((function(n){n.relatedOrgs.forEach((function(n){t[n]||(t[n]=0),t[n]+=1}))}))}));var o=Object.keys(t).map((function(n){return{name:n,count:t[n]}})).sort((function(a,b){return b.count-a.count}));return o}function o(t){if(t){var n=t.offsetTop-60;setTimeout((function(){window.scrollTo({top:n,behavior:"smooth"})}))}}},329:function(t,n,r){"use strict";var e=r(3),o=r(4),c=r(45),l=r(27),f=r(37),d=r(11),v=r(5),m=r(214),_=r(145),y=r(330),h=r(331),C=r(88),w=r(332),x=[],k=o(x.sort),j=o(x.push),O=v((function(){x.sort(void 0)})),L=v((function(){x.sort(null)})),M=_("sort"),E=!v((function(){if(C)return C<70;if(!(y&&y>3)){if(h)return!0;if(w)return w<603;var code,t,n,r,e="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:n=3;break;case 68:case 71:n=4;break;default:n=2}for(r=0;r<47;r++)x.push({k:t+r,v:n})}for(x.sort((function(a,b){return b.v-a.v})),r=0;r<x.length;r++)t=x[r].k.charAt(0),e.charAt(e.length-1)!==t&&(e+=t);return"DGBEFHACIJK"!==e}}));e({target:"Array",proto:!0,forced:O||!L||!M||!E},{sort:function(t){void 0!==t&&c(t);var n=l(this);if(E)return void 0===t?k(n):k(n,t);var r,e,o=[],v=f(n);for(e=0;e<v;e++)e in n&&j(o,n[e]);for(m(o,function(t){return function(n,r){return void 0===r?-1:void 0===n?1:void 0!==t?+t(n,r)||0:d(n)>d(r)?1:-1}}(t)),r=o.length,e=0;e<r;)n[e]=o[e++];for(;e<v;)delete n[e++];return n}})},330:function(t,n,r){var e=r(70).match(/firefox\/(\d+)/i);t.exports=!!e&&+e[1]},331:function(t,n,r){var e=r(70);t.exports=/MSIE|Trident/.test(e)},332:function(t,n,r){var e=r(70).match(/AppleWebKit\/(\d+)\./);t.exports=!!e&&+e[1]},336:function(t,n,r){var content=r(354);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(44).default)("bc669556",content,!0,{sourceMap:!1})},341:function(t,n,r){"use strict";r(326)},342:function(t,n,r){var e=r(43)(!1);e.push([t.i,"",""]),t.exports=e},346:function(t,n,r){"use strict";r.r(n);r(72),r(115);var e={props:{councilorMap:{type:Object,required:!0},sayit:{type:Object,required:!0}},computed:{councilor:function(){return this.councilorMap[this.sayit.councilorId]},constituency:function(){return"".concat(this.councilor.areaTitle," | ").concat(this.councilor.areaList.join("."))}}},o=(r(341),r(35)),component=Object(o.a)(e,(function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"intCard pb3 bb b--moon-gray mb3"},[r("div",{staticClass:"flex-l flex-row-reverse justify-between mb3"},[r("div",{staticClass:"f6 gray"},[t._v(t._s(t.sayit.date))]),r("div",{staticClass:"mt3 mt0-l"},[r("div",{staticClass:"f6 gray mb1"},[t._v("質詢議員： "+t._s(t.councilor.name))]),r("div",{staticClass:"f6 gray"},[t._v("選舉區域： "+t._s(t.constituency))])])]),r("h2",{staticClass:"f4 f3-l fw6"},[t._v(t._s(t.sayit.summary))]),r("p",[t._v(t._s(t.sayit.say))]),t._m(0)])}),[function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"flex-l justify-between"},[r("div",{staticClass:"f6"},[t._v("來源出處：第三屆第？次臨時會")]),r("div",{staticClass:"dn light-blue f6"},[t._v("閱讀更多")])])}],!1,null,"49315d16",null);n.default=component.exports},353:function(t,n,r){"use strict";r(336)},354:function(t,n,r){var e=r(43)(!1);e.push([t.i,"@media screen and (min-width:60em){.intLanding[data-v-5e64c962]{display:grid;grid-template-columns:14rem 1fr;grid-column-gap:5rem;-moz-column-gap:5rem;column-gap:5rem;align-items:start}.intLanding__stats[data-v-5e64c962]{position:-webkit-sticky;position:sticky;top:4rem}}.stats__item[data-v-5e64c962]{background:none}@media screen and (min-width:60em){.stats__item[data-v-5e64c962]{border-width:0 0 1px}}",""]),t.exports=e},361:function(t,n,r){"use strict";r.r(n);r(14);var e=r(328),o={props:{councilorMap:{type:Object,required:!0},sayList:{type:Array,required:!0,validator:function(t){return t.every((function(t){return t.councilorId&&t.summary}))}}},computed:{relatedOrgs:function(){return Object(e.a)({sayit:this.sayList})}}},c=(r(353),r(35)),component=Object(c.a)(o,(function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"intLanding"},[r("div",{staticClass:"intLanding__stats stats"},[r("h2",{staticClass:"f4 f3-l mb3"},[t._v("質詢局處")]),t._l(t.relatedOrgs,(function(n){return r("button",{key:n.name,staticClass:"stats__item ba b--moon-gray flex-l justify-between f5 f4-l w-100-l pa2 pv3-l ph0-l mr2 mb2 ma0-l"},[r("span",{staticClass:"mr2 mr0-l"},[t._v(t._s(n.name))]),r("span",[t._v(t._s(n.count))])])}))],2),r("div",{staticClass:"intLanding__main mt3"},t._l(t.sayList,(function(n,e){return r("interpellation-card",{key:e,attrs:{"councilor-map":t.councilorMap,sayit:n}})})),1)])}),[],!1,null,"5e64c962",null);n.default=component.exports;installComponents(component,{InterpellationCard:r(346).default})}}]);