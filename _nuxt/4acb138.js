(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7,8,9,15],{325:function(t,e,n){var content=n(340);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(44).default)("9bc657c8",content,!0,{sourceMap:!1})},328:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return r}));n(14),n(32),n(329),n(36),n(38),n(71);function c(){for(var t={},e=arguments.length,n=new Array(e),c=0;c<e;c++)n[c]=arguments[c];n.forEach((function(e){e.sayit.forEach((function(e){e.relatedOrgs.forEach((function(e){t[e]||(t[e]=0),t[e]+=1}))}))}));var r=Object.keys(t).map((function(e){return{name:e,count:t[e]}})).sort((function(a,b){return b.count-a.count}));return r}function r(t){if(t){var e=t.offsetTop-60;setTimeout((function(){window.scrollTo({top:e,behavior:"smooth"})}))}}},333:function(t,e,n){var content=n(348);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(44).default)("7ba2aa3a",content,!0,{sourceMap:!1})},334:function(t,e,n){var content=n(350);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(44).default)("7abc6d9a",content,!0,{sourceMap:!1})},335:function(t,e,n){var content=n(352);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(44).default)("df85f096",content,!0,{sourceMap:!1})},339:function(t,e,n){"use strict";n(325)},340:function(t,e,n){var c=n(43)(!1);c.push([t.i,'.ccc[data-v-04b2e5e8]{border:1px solid #d8d8d8;border-top:8px solid #8dee72}.ccc__areaList span+span[data-v-04b2e5e8]:before{content:"."}.ccc__councilorList[data-v-04b2e5e8]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:1.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem;grid-row-gap:.5rem;row-gap:.5rem;justify-content:space-between}.ccc__councilorList--1[data-v-04b2e5e8]{grid-template-columns:1fr}.ccc--minified[data-v-04b2e5e8]{border-top:1px solid #d8d8d8}@media(hover:hover){.ccc--minified .ccc__councilorList[data-v-04b2e5e8]{display:none;margin-top:0}.ccc--minified:hover .ccc__areaList[data-v-04b2e5e8],.ccc--minified:hover .ccc__constituency[data-v-04b2e5e8]{display:none}.ccc--minified:hover .ccc__councilorList[data-v-04b2e5e8]{display:grid}}.councilor[data-v-04b2e5e8]{color:#00000f;text-decoration:none}@media screen and (min-width:60em){.councilor[data-v-04b2e5e8]{text-decoration:underline}}',""]),t.exports=c},345:function(t,e,n){"use strict";n.r(e);var c={props:{data:{type:Object,required:!0},minified:{type:Boolean,default:!1},round:{type:String,required:!0}},computed:{},methods:{councilorLink:function(t){return{name:"round-議員-councilor",params:{round:this.round,councilor:t.id}}}}},r=(n(339),n(35)),component=Object(r.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ccc br1 pa3",class:{"ccc--minified":t.minified}},[n("div",{staticClass:"ccc__constituency fw5 f4"},[t._v(t._s(t.data.areaTitle))]),n("div",{staticClass:"ccc__areaList fw5 mt2"},t._l(t.data.areaList,(function(area){return n("span",{key:area},[t._v(t._s(area))])})),0),n("div",{staticClass:"ccc__councilorList mt3",class:["ccc__councilorList--"+t.data.councilors.length]},t._l(t.data.councilors,(function(e){return n("nuxt-link",{key:e.id,staticClass:"councilor f5 f7-l",attrs:{to:t.councilorLink(e)}},[n("span",[t._v(t._s(e.name)+"  /  ")]),n("span",[t._v(t._s(e.party))])])})),1)])}),[],!1,null,"04b2e5e8",null);e.default=component.exports},347:function(t,e,n){"use strict";n(333)},348:function(t,e,n){var c=n(43)(!1);c.push([t.i,'.tcwTitle[data-v-a1f3275c]{position:relative;margin:3rem 0 1rem}@media screen and (min-width:60em){.tcwTitle[data-v-a1f3275c]{margin:10rem 0 2.5rem}}.tcwTitle[data-v-a1f3275c]:before{content:" ";height:0;position:absolute;left:0;right:0;top:50%;border:1px solid #7a7c7d}',""]),t.exports=c},349:function(t,e,n){"use strict";n(334)},350:function(t,e,n){var c=n(43)(!1);c.push([t.i,'@media screen and (min-width:60em){.consLanding__list[data-v-80fbea0e]{display:grid;grid-template-columns:repeat(3,1fr);grid-column-gap:2rem;-moz-column-gap:2rem;column-gap:2rem;grid-row-gap:.5rem;row-gap:.5rem}}.cons[data-v-80fbea0e]{border:1px solid #d8d8d8;border-top:4px solid #fbf1a9;color:#00000f;text-decoration:none}@media screen and (min-width:60em){.cons[data-v-80fbea0e]{border:none;text-decoration:underline}}.cons__area[data-v-80fbea0e]:not(:last-child):after{content:"."}@media screen and (min-width:60em){.cons__area[data-v-80fbea0e]:not(:last-child):after{display:none}}',""]),t.exports=c},351:function(t,e,n){"use strict";n(335)},352:function(t,e,n){var c=n(43)(!1);c.push([t.i,".ccl__toggle[data-v-fd23c74a]{border:1px solid #8dee72;background:none}.ccl__ccc[data-v-fd23c74a]{margin-bottom:.75rem}@media screen and (min-width:60em){.ccl__list[data-v-fd23c74a]{display:grid;grid-template-columns:repeat(4,1fr);grid-column-gap:1rem;-moz-column-gap:1rem;column-gap:1rem;grid-row-gap:1.5rem;row-gap:1.5rem;align-items:stretch}}.ccl--minified .ccl__ccc[data-v-fd23c74a]{margin:0}",""]),t.exports=c},358:function(t,e,n){"use strict";n.r(e);var c={props:{level:{type:String,default:"h1"},id:{type:String,default:""}}},r=(n(347),n(35)),component=Object(r.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.level,{tag:"component",staticClass:"tcwTitle f3 f2-l fw5",attrs:{id:t.id}},[n("div",{staticClass:"relative bg-white pr3 dib"},[t._t("default")],2)])}),[],!1,null,"a1f3275c",null);e.default=component.exports},359:function(t,e,n){"use strict";n.r(e);var defs=n(144),c={props:{map:{type:Object,required:!0},round:{type:String,required:!0},target:{type:String,default:""}},computed:{consList:function(){return defs.a}},methods:{consLink:function(t){return{name:"round-選區-constituency",params:{round:this.round,constituency:t}}},consId:function(t){return"const-".concat(t)}}},r=(n(349),n(35)),component=Object(r.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"consLanding"},[n("div",{staticClass:"consLanding__list"},[t._l(t.consList,(function(e){return[n("nuxt-link",{staticClass:"cons f6 db pa3 pa0-l mt3 mt0-l",attrs:{to:t.consLink(e),id:t.consId(e)}},[n("div",{staticClass:"dn dib-l mr1"},[n("i",{staticClass:"fa-solid fa-square"})]),n("div",{staticClass:"db di-l mr2"},[n("div",{staticClass:"di f5 f6-l"},[t._v(t._s(e))]),n("div",{staticClass:"f7 di dn-l ml3"},[t._v(t._s(t.map[e].areaQuota)+" 席")])]),n("div",{staticClass:"db di-l mt3 mt0-l"},t._l(t.map[e].areaList,(function(area){return n("span",{key:area,staticClass:"cons__area mr1-l"},[t._v(t._s(area))])})),0)]),t.target&&t.target===e?n("div",{staticClass:"db dn-l"},[t._t("default")],2):t._e()]}))],2)])}),[],!1,null,"80fbea0e",null);e.default=component.exports},360:function(t,e,n){"use strict";n.r(e);var defs=n(144),c={props:{map:{type:Object,required:!0},round:{type:String,required:!0},minified:{type:Boolean,default:!1}},data:function(){return{isOpened:!this.minified}},computed:{consList:function(){return defs.a}},watch:{$route:function(){this.closeList()}},methods:{toggleList:function(){this.isOpened=!this.isOpened},closeList:function(){this.isOpened=!1}}},r=(n(351),n(35)),component=Object(r.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ccl",class:{"ccl--minified":t.minified}},[t.minified?n("button",{staticClass:"ccl__toggle pointer flex items-center justify-between pa2 mb3 w-100 db dn-l",on:{click:t.toggleList}},[n("span",[t._v("查看選區議員")]),n("i",{directives:[{name:"show",rawName:"v-show",value:!t.isOpened,expression:"!isOpened"}],staticClass:"fa-solid fa-chevron-down"}),n("i",{directives:[{name:"show",rawName:"v-show",value:t.isOpened,expression:"isOpened"}],staticClass:"fa-solid fa-chevron-up"})]):t._e(),n("div",{staticClass:"db-l",class:{dn:!t.isOpened}},[n("div",{staticClass:"ccl__list"},t._l(t.consList,(function(e){return n("div",{key:e,staticClass:"ccl__ccc"},[n("con-con-card",{staticClass:"h-100-l",attrs:{data:t.map[e],round:t.round,minified:t.minified}})],1)})),0)])])}),[],!1,null,"fd23c74a",null);e.default=component.exports;installComponents(component,{ConConCard:n(345).default})},365:function(t,e,n){var content=n(372);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(44).default)("198debbc",content,!0,{sourceMap:!1})},371:function(t,e,n){"use strict";n(365)},372:function(t,e,n){var c=n(43)(!1);c.push([t.i,".landing__header[data-v-0f729974]{height:calc(100vh - 14rem);max-height:40vh}@media screen and (min-width:60em){.landing__header[data-v-0f729974]{max-height:35vw}}.landing__navLinks a[data-v-0f729974]{color:#49b0d5;text-decoration:none}",""]),t.exports=c},392:function(t,e,n){"use strict";n.r(e);var c=n(9),r=(n(28),n(146),n(54),n(369)),o=n(328),defs=n(144),l={asyncData:function(t){return Object(c.a)(regeneratorRuntime.mark((function e(){var n,c,r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,c=t.params,t.redirect,r=c.round||"第三屆",e.next=4,n(r,"area-list").fetch();case 4:return o=e.sent,e.abrupt("return",{consMap:o,round:r});case 6:case"end":return e.stop()}}),e)})))()},computed:{navLinks:function(){return defs.b}},methods:{genNavLink:function(link){return"搜質詢"!==link.label?"#".concat(link.label):link.route(this.round)},handleNavClick:function(t){var e=Object(r.get)(t,"target.attributes.href.value","").split("#");if(!(e.length<=1)){var n=decodeURIComponent(e[1]),c=this.$refs[n];c&&(Object(o.b)(c.$el),t.preventDefault())}}}},d=(n(371),n(35)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"landing mw8 ph3 center"},[n("div",{staticClass:"landing__entry mt5"},[t._m(0),n("div",{staticClass:"landing__navLinks flex justify-between mw6 center mt4 mt5-l"},t._l(t.navLinks,(function(link){return n("nuxt-link",{key:link.label,staticClass:"f4 f3-l",attrs:{to:t.genNavLink(link)},nativeOn:{click:function(e){return t.handleNavClick.apply(null,arguments)}}},[t._v(t._s(link.label))])})),1)]),n("tcw-title",{ref:"看選區",attrs:{level:"h2",id:"看選區"}},[t._v("看選區")]),n("div",{staticClass:"mt5 mt3-l"},[n("constituency-landing",{attrs:{map:t.consMap,round:t.round}})],1),n("tcw-title",{ref:"找議員",attrs:{level:"h2",id:"找議員"}},[t._v("找議員")]),n("div",{staticClass:"mt5 mt3-l"},[n("con-con-landing",{attrs:{map:t.consMap,round:t.round}})],1),n("tcw-title",{ref:"讀分析",attrs:{level:"h2",id:"讀分析"}},[t._v("讀分析")]),n("div",{staticClass:"pa3 bg-moon-gray h3 pa4 flex items-center justify-center mt5 mt3-l w-100"},[t._v("施工中")])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"landing__header relative flex items-center justify-center"},[n("div",{staticClass:"absolute top-0 left-0 w4 h4 bw2 bl bt b--light-yellow"}),n("div",{staticClass:"absolute bottom-0 right-0 w4 h4 bw2 bb br b--light-yellow"}),n("h1",{staticClass:"f2 f1-l fw5"},[t._v("台南市議會觀測站")])])}],!1,null,"0f729974",null);e.default=component.exports;installComponents(component,{TcwTitle:n(358).default,ConstituencyLanding:n(359).default,ConConLanding:n(360).default})}}]);