(window.webpackJsonp=window.webpackJsonp||[]).push([[8,7],{325:function(e,c,t){var content=t(340);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(44).default)("9bc657c8",content,!0,{sourceMap:!1})},335:function(e,c,t){var content=t(352);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(44).default)("df85f096",content,!0,{sourceMap:!1})},339:function(e,c,t){"use strict";t(325)},340:function(e,c,t){var n=t(43)(!1);n.push([e.i,'.ccc[data-v-04b2e5e8]{border:1px solid #d8d8d8;border-top:8px solid #8dee72}.ccc__areaList span+span[data-v-04b2e5e8]:before{content:"."}.ccc__councilorList[data-v-04b2e5e8]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:1.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem;grid-row-gap:.5rem;row-gap:.5rem;justify-content:space-between}.ccc__councilorList--1[data-v-04b2e5e8]{grid-template-columns:1fr}.ccc--minified[data-v-04b2e5e8]{border-top:1px solid #d8d8d8}@media(hover:hover){.ccc--minified .ccc__councilorList[data-v-04b2e5e8]{display:none;margin-top:0}.ccc--minified:hover .ccc__areaList[data-v-04b2e5e8],.ccc--minified:hover .ccc__constituency[data-v-04b2e5e8]{display:none}.ccc--minified:hover .ccc__councilorList[data-v-04b2e5e8]{display:grid}}.councilor[data-v-04b2e5e8]{color:#00000f;text-decoration:none}@media screen and (min-width:60em){.councilor[data-v-04b2e5e8]{text-decoration:underline}}',""]),e.exports=n},345:function(e,c,t){"use strict";t.r(c);var n={props:{data:{type:Object,required:!0},minified:{type:Boolean,default:!1},round:{type:String,required:!0}},computed:{},methods:{councilorLink:function(e){return{name:"round-議員-councilor",params:{round:this.round,councilor:e.id}}}}},o=(t(339),t(35)),component=Object(o.a)(n,(function(){var e=this,c=e.$createElement,t=e._self._c||c;return t("div",{staticClass:"ccc br1 pa3",class:{"ccc--minified":e.minified}},[t("div",{staticClass:"ccc__constituency fw5 f4"},[e._v(e._s(e.data.areaTitle))]),t("div",{staticClass:"ccc__areaList fw5 mt2"},e._l(e.data.areaList,(function(area){return t("span",{key:area},[e._v(e._s(area))])})),0),t("div",{staticClass:"ccc__councilorList mt3",class:["ccc__councilorList--"+e.data.councilors.length]},e._l(e.data.councilors,(function(c){return t("nuxt-link",{key:c.id,staticClass:"councilor f5 f7-l",attrs:{to:e.councilorLink(c)}},[t("span",[e._v(e._s(c.name)+"  /  ")]),t("span",[e._v(e._s(c.party))])])})),1)])}),[],!1,null,"04b2e5e8",null);c.default=component.exports},351:function(e,c,t){"use strict";t(335)},352:function(e,c,t){var n=t(43)(!1);n.push([e.i,".ccl__toggle[data-v-fd23c74a]{border:1px solid #8dee72;background:none}.ccl__ccc[data-v-fd23c74a]{margin-bottom:.75rem}@media screen and (min-width:60em){.ccl__list[data-v-fd23c74a]{display:grid;grid-template-columns:repeat(4,1fr);grid-column-gap:1rem;-moz-column-gap:1rem;column-gap:1rem;grid-row-gap:1.5rem;row-gap:1.5rem;align-items:stretch}}.ccl--minified .ccl__ccc[data-v-fd23c74a]{margin:0}",""]),e.exports=n},360:function(e,c,t){"use strict";t.r(c);var defs=t(144),n={props:{map:{type:Object,required:!0},round:{type:String,required:!0},minified:{type:Boolean,default:!1}},data:function(){return{isOpened:!this.minified}},computed:{consList:function(){return defs.a}},watch:{$route:function(){this.closeList()}},methods:{toggleList:function(){this.isOpened=!this.isOpened},closeList:function(){this.isOpened=!1}}},o=(t(351),t(35)),component=Object(o.a)(n,(function(){var e=this,c=e.$createElement,t=e._self._c||c;return t("div",{staticClass:"ccl",class:{"ccl--minified":e.minified}},[e.minified?t("button",{staticClass:"ccl__toggle pointer flex items-center justify-between pa2 mb3 w-100 db dn-l",on:{click:e.toggleList}},[t("span",[e._v("查看選區議員")]),t("i",{directives:[{name:"show",rawName:"v-show",value:!e.isOpened,expression:"!isOpened"}],staticClass:"fa-solid fa-chevron-down"}),t("i",{directives:[{name:"show",rawName:"v-show",value:e.isOpened,expression:"isOpened"}],staticClass:"fa-solid fa-chevron-up"})]):e._e(),t("div",{staticClass:"db-l",class:{dn:!e.isOpened}},[t("div",{staticClass:"ccl__list"},e._l(e.consList,(function(c){return t("div",{key:c,staticClass:"ccl__ccc"},[t("con-con-card",{staticClass:"h-100-l",attrs:{data:e.map[c],round:e.round,minified:e.minified}})],1)})),0)])])}),[],!1,null,"fd23c74a",null);c.default=component.exports;installComponents(component,{ConConCard:t(345).default})}}]);