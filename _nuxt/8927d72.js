(window.webpackJsonp=window.webpackJsonp||[]).push([[8,7],{327:function(t,e,c){var content=c(340);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,c(44).default)("03a6d0c2",content,!0,{sourceMap:!1})},338:function(t,e,c){var content=c(354);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,c(44).default)("971262b6",content,!0,{sourceMap:!1})},339:function(t,e,c){"use strict";c(327)},340:function(t,e,c){var r=c(43)(!1);r.push([t.i,'.ccc[data-v-1f5a43a2]{border:1px solid #d8d8d8;border-top:8px solid #8dee72}.ccc__areaList span+span[data-v-1f5a43a2]:before{content:"."}.ccc__councilorList[data-v-1f5a43a2]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:1.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem;grid-row-gap:.5rem;row-gap:.5rem;justify-content:space-between}.councilor[data-v-1f5a43a2]{color:#00000f;text-decoration:none}@media screen and (min-width:60em){.councilor[data-v-1f5a43a2]{text-decoration:underline}}',""]),t.exports=r},348:function(t,e,c){"use strict";c.r(e);var r={props:{data:{type:Object,required:!0},isMin:{type:Boolean,default:!1},round:{type:String,required:!0}},computed:{},methods:{councilorLink:function(t){return{name:"round-議員-councilor",params:{round:this.round,councilor:t.id}}}}},n=(c(339),c(35)),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"ccc br1 pa3"},[c("div",{staticClass:"ccc__constituency fw5 f4"},[t._v(t._s(t.data.areaTitle))]),c("div",{staticClass:"ccc__areaList fw5 mt2"},t._l(t.data.areaList,(function(area){return c("span",{key:area},[t._v(t._s(area))])})),0),c("div",{staticClass:"ccc__councilorList mt3"},t._l(t.data.councilors,(function(e){return c("nuxt-link",{key:e.id,staticClass:"councilor f5 f7-l",attrs:{to:t.councilorLink(e)}},[c("span",[t._v(t._s(e.name)+"  /  ")]),c("span",[t._v(t._s(e.party))])])})),1)])}),[],!1,null,"1f5a43a2",null);e.default=component.exports},353:function(t,e,c){"use strict";c(338)},354:function(t,e,c){var r=c(43)(!1);r.push([t.i,".ccl__ccc[data-v-056796e2]{margin-bottom:.75rem}@media screen and (min-width:60em){.ccl[data-v-056796e2]{display:grid;grid-template-columns:repeat(4,1fr);grid-column-gap:1rem;-moz-column-gap:1rem;column-gap:1rem;grid-row-gap:1.5rem;row-gap:1.5rem;align-items:stretch}}",""]),t.exports=r},360:function(t,e,c){"use strict";c.r(e);var defs=c(144),r={props:{map:{type:Object,required:!0},round:{type:String,required:!0}},computed:{consList:function(){return defs.a}}},n=(c(353),c(35)),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"ccl"},t._l(t.consList,(function(e){return c("div",{key:e,staticClass:"ccl__ccc"},[c("con-con-card",{staticClass:"h-100-l",attrs:{data:t.map[e],round:t.round}})],1)})),0)}),[],!1,null,"056796e2",null);e.default=component.exports;installComponents(component,{ConConCard:c(348).default})}}]);