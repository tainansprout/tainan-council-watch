(window.webpackJsonp=window.webpackJsonp||[]).push([[8,17,18,19,32],{376:function(t,e,r){var content=r(382);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("1b03501f",content,!0,{sourceMap:!1})},381:function(t,e,r){"use strict";r(376)},382:function(t,e,r){var n=r(32)(!1);n.push([t.i,".districtText[data-v-6f29000c]{color:#00000f;text-decoration:none;line-height:normal;font-weight:400}.districtText--multiEle[data-v-6f29000c]{font-weight:300}.districtText--multiEle .districtText__name[data-v-6f29000c],.districtText--multiEle .districtText__town[data-v-6f29000c]{text-decoration:underline}.districtText--active[data-v-6f29000c]{color:#49b0d5;font-weight:400;-webkit-text-decoration-color:#49b0d5;text-decoration-color:#49b0d5}.districtText__square[data-v-6f29000c]{background-color:#49b0d5;height:.625rem;width:.625rem}.districtText__town--active[data-v-6f29000c]{color:#49b0d5;-webkit-text-decoration-color:#49b0d5;text-decoration-color:#49b0d5;font-weight:400}",""]),t.exports=n},384:function(t,e,r){"use strict";r.r(e);var n=r(19);r(51),r(244),r(38),r(36),r(44),r(13),r(53),r(37),r(54);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var o={props:{district:{type:Object,required:!0},isSingleElement:{type:Boolean,default:!1},activeArea:{default:null,validator:function(area){return!area||["district","town"].includes(area.type)&&area.id}},isQuotaVisible:{type:Boolean,default:!1}},data:function(){return{localActiveArea:this.activeArea}},computed:{isDistrictActive:function(){var t=this.activeArea;return t&&"district"===t.type&&t.id===this.district.districtId},townLabelList:function(){var t=this.district.townList;if(!t.length)return[];var e=t[t.length-1];return e.endsWith("區")||(t[t.length-1]="".concat(e,"區")),t}},watch:{activeArea:function(t){(t||this.localActiveArea)&&(t?this.localActiveArea&&t.type===this.localActiveArea.type&&t.id===this.localActiveArea.id||(this.localActiveArea=d({},t)):this.localActiveArea=null)}},methods:{isTownActive:function(t){var e=this.activeArea;return t=t.endsWith("區")?t:"".concat(t,"區"),e&&"town"===e.type&&e.id===t},activateArea:function(t,e){"town"===t&&(e=e.endsWith("區")?e:"".concat(e,"區")),this.localActiveArea={type:t,id:e},this.$emit("update:activeArea",this.localActiveArea)},deactivateArea:function(){this.localActiveArea=null,this.$emit("update:activeArea",null)}}},l=(r(381),r(27)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"districtText fw3 f6 ls2",class:{"districtText--multiEle":!t.isSingleElement,"districtText--active":t.isDistrictActive}},[t.isSingleElement?t._e():r("div",{staticClass:"districtText__square dn dib-ns mr1"}),r("div",{staticClass:"districtText__name db di-ns mr2",on:{mouseover:function(e){return t.activateArea("district",t.district.districtId)},mouseleave:t.deactivateArea}},[r("div",{staticClass:"di f5 f6-ns"},[t._v(t._s(t.district.districtTitle))]),t.isQuotaVisible?r("div",{staticClass:"f7 di ml4"},[t._v(t._s(t.district.districtQuota)+" 席")]):t._e()]),r("div",{staticClass:"districtText__townList db di-ns mt2 mt0-l"},[t.isSingleElement?r("span",[t._v(t._s(t.townLabelList.join(".")))]):t._l(t.townLabelList,(function(e){return r("span",{key:e,staticClass:"districtText__town mr1",class:{"districtText__town--active":t.isTownActive(e)},on:{mouseover:function(r){return t.activateArea("town",e)},mouseleave:t.deactivateArea}},[t._v(t._s(e))])}))],2)])}),[],!1,null,"6f29000c",null);e.default=component.exports},391:function(t,e,r){var content=r(414);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("482e6218",content,!0,{sourceMap:!1})},392:function(t,e,r){var content=r(416);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("5df1aa9a",content,!0,{sourceMap:!1})},413:function(t,e,r){"use strict";r(391)},414:function(t,e,r){var n=r(32)(!1);n.push([t.i,'.tcwTitle[data-v-b9ab4568]{position:relative;margin:3rem 0 1rem}@media screen and (min-width:60em){.tcwTitle[data-v-b9ab4568]{margin:10rem 0 2.5rem}}.tcwTitle[data-v-b9ab4568]:before{content:" ";height:0;position:absolute;left:0;right:0;top:50%;border:1px solid #d8d8d8}.tcwTitle__content[data-v-b9ab4568]{padding-right:.75rem;letter-spacing:3px}',""]),t.exports=n},415:function(t,e,r){"use strict";r(392)},416:function(t,e,r){var n=r(32)(!1);n.push([t.i,"@media screen and (min-width:30em)and (max-width:60em){.districtLanding__list[data-v-f54d9db6]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:2rem;-moz-column-gap:2rem;column-gap:2rem;grid-row-gap:1rem;row-gap:1rem}.districtLanding__map[data-v-f54d9db6]{max-width:50vh;margin:2rem auto 0}}@media screen and (min-width:30em)and (max-width:60em)and (orientation:landscape){.districtLanding[data-v-f54d9db6]{display:grid;grid-template-columns:20rem 1fr;align-items:center}.districtLanding__list[data-v-f54d9db6]{display:block}.districtLanding__map[data-v-f54d9db6]{max-width:100vh;width:calc(96vw - 20rem);margin:0 auto}}@media screen and (min-width:60em){.districtLanding[data-v-f54d9db6]{display:grid;grid-template-columns:20rem 1fr;align-items:center}}.district+.district[data-v-f54d9db6]{margin-top:.5rem}@media screen and (min-width:30em)and (max-width:60em){.district+.district[data-v-f54d9db6]{margin:0}}@media screen and (min-width:30em)and (max-width:60em)and (orientation:landscape){.district+.district[data-v-f54d9db6]{margin-top:.5rem}}@media screen and (min-width:60em){.district+.district[data-v-f54d9db6]{margin-top:1.25rem}}.district__card[data-v-f54d9db6]{border:1px solid #d8d8d8;border-top:6px solid #8dee72}",""]),t.exports=n},427:function(t,e,r){var content=r(461);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("2716f794",content,!0,{sourceMap:!1})},434:function(t,e,r){"use strict";r.r(e);var n={props:{level:{type:String,default:"h1"},id:{type:String,default:""}}},c=(r(413),r(27)),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(t.level,{tag:"component",staticClass:"tcwTitle f3 f2-l fw5",attrs:{id:t.id}},[r("div",{staticClass:"tcwTitle__content relative bg-white dib"},[t._t("default")],2)])}),[],!1,null,"b9ab4568",null);e.default=component.exports},435:function(t,e,r){"use strict";r.r(e);r(244),r(64),r(51),r(83),r(52);var n=r(380),defs=r(99),c={props:{map:{type:Object,required:!0},round:{type:String,required:!0},target:{type:String,default:""}},data:function(){return{focusedArea:null,isFocusedAreaDirty:!1}},computed:{districtList:function(){return defs.d}},methods:{mouseoverTown:function(t){t.endsWith("區")||(t="".concat(t,"區")),this.setFocusedArea("town",t)},mouseleaveTown:function(){this.resetFocusedArea()},mouseoverDistrict:Object(n.debounce)((function(t){this.setFocusedArea("district",Object(defs.h)(t))}),100),mouseleaveDistrict:function(){this.resetFocusedArea()},setFocusedArea:function(t,e){this.isFocusedAreaDirty=!1,this.focusedArea={type:t,id:e}},resetFocusedArea:function(){var t=this;this.isFocusedAreaDirty=!0,setTimeout((function(){t.isFocusedAreaDirty&&t.focusedArea&&(t.focusedArea=null)}),200)},isDistrictActive:function(t){return this.focusedArea&&"district"===this.focusedArea.type&&this.focusedArea.id.includes(t)},isTownActive:function(t){return this.focusedArea&&"town"===this.focusedArea.type&&this.focusedArea.id.includes(t)},districtLink:function(t){return{name:"round-district-district",params:{round:this.round,district:Object(defs.h)(t)}}},districtId:function(t){return"district-".concat(t)},districtMeta:function(t){return this.map[Object(defs.h)(t)]}}},d=(r(415),r(27)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"districtLanding"},[r("div",{staticClass:"districtLanding__list"},t._l(t.districtList,(function(e){return r("div",{staticClass:"district"},[r("nuxt-link",{staticClass:"district__card db dn-ns pa3 relative",attrs:{to:t.districtLink(e),id:t.districtId(e)}},[r("district-text",{attrs:{district:t.districtMeta(e),"active-area":t.focusedArea,"is-single-element":!0,"is-quota-visible":!0},on:{"update:activeArea":function(e){t.focusedArea=e},"update:active-area":function(e){t.focusedArea=e}}}),r("tcw-icon",{staticClass:"absolute top-0 right-0 mt3 mr3",attrs:{icon:"chevron-down-gray"}})],1),r("nuxt-link",{staticClass:"district__interact dn db-ns",attrs:{to:t.districtLink(e),id:t.districtId(e)}},[r("district-text",{attrs:{district:t.districtMeta(e),"active-area":t.focusedArea},on:{"update:activeArea":function(e){t.focusedArea=e},"update:active-area":function(e){t.focusedArea=e}}})],1),t.target&&t.target===e?r("div",{staticClass:"db dn-ns"},[t._t("default")],2):t._e()],1)})),0),r("div",{staticClass:"districtLanding__map dn db-ns"},[r("district-map",{attrs:{map:t.map,focus:t.focusedArea},on:{"hover-town":t.mouseoverTown,"out-town":t.mouseleaveTown,"hover-district":t.mouseoverDistrict,"out-district":t.mouseleaveDistrict}})],1)])}),[],!1,null,"f54d9db6",null);e.default=component.exports;installComponents(component,{DistrictText:r(384).default,TcwIcon:r(246).default,DistrictMap:r(465).default})},460:function(t,e,r){"use strict";r(427)},461:function(t,e,r){var n=r(32)(!1);n.push([t.i,".districtSum[data-v-12bb2e8e]{padding:0 .75rem}.districtSum h2[data-v-12bb2e8e]{font-size:1.25rem;letter-spacing:1.66px;margin-top:.75rem}.districtSum h2[data-v-12bb2e8e]:not(:last-child){margin-top:2.25rem}.districtSum__statsList[data-v-12bb2e8e]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:.5rem;-moz-column-gap:.5rem;column-gap:.5rem;grid-row-gap:.5rem;row-gap:.5rem}.districtSum__statsList .orgTag[data-v-12bb2e8e]:nth-child(n+7){display:none}.districtSum__statsList--all .orgTag[data-v-12bb2e8e]:nth-child(n+7){display:flex}.districtSum__statsList--all .districtSum__showMore[data-v-12bb2e8e]{display:none}.districtSum__showMore[data-v-12bb2e8e]{position:absolute;bottom:0;left:0;right:0;border:none;width:100%;padding-top:2rem;font-size:.875rem;color:#11111e;text-decoration:underline;-webkit-text-decoration-color:#11111e;text-decoration-color:#11111e;background:linear-gradient(180deg,rgba(255,255,254,0),#fffffe 50%)}.districtSum__article[data-v-12bb2e8e] {line-height:normal;letter-spacing:1.33px}.districtSum__article[data-v-12bb2e8e]  ul{margin:0;padding:0}.districtSum__article[data-v-12bb2e8e]  ul li{list-style:none;line-height:1.5}@media screen and (min-width:30em){.districtSum[data-v-12bb2e8e]{padding:0;display:grid;grid-template-columns:12rem 1fr;grid-column-gap:2rem;-moz-column-gap:2rem;column-gap:2rem;grid-row-gap:2rem;row-gap:2rem;align-items:flex-start}.districtSum h2[data-v-12bb2e8e]{border-bottom:1px solid #979797;padding-bottom:1rem;margin-top:0;letter-spacing:2.33px;display:inline-block}.districtSum h2[data-v-12bb2e8e]:not(:last-child){margin-top:0}.districtSum__statsList[data-v-12bb2e8e]{grid-template-columns:repeat(3,1fr);grid-column-gap:1.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem;grid-row-gap:1rem;row-gap:1rem}}@media screen and (min-width:60em){.districtSum[data-v-12bb2e8e]{grid-template-columns:13rem 1fr;grid-column-gap:5rem;-moz-column-gap:5rem;column-gap:5rem}.districtSum h2[data-v-12bb2e8e]{font-size:1.75rem;padding-bottom:1.5rem}.districtSum__statsList[data-v-12bb2e8e]{grid-template-columns:repeat(4,1fr)}.districtSum__statsList .orgTag[data-v-12bb2e8e]:nth-child(n+7){display:flex}.districtSum__statsList .orgTag[data-v-12bb2e8e]:nth-child(n+13){display:none}.districtSum__statsList--all .orgTag[data-v-12bb2e8e]:nth-child(n+13){display:flex}}.counSum[data-v-12bb2e8e]{margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid #d8d8d8}.counSum h2[data-v-12bb2e8e]{margin-bottom:1.25rem}@media screen and (min-width:30em){.counSum[data-v-12bb2e8e]{margin-top:3rem;padding-top:3rem}.counSum h2[data-v-12bb2e8e]{margin-bottom:3.5rem}.counSum__list[data-v-12bb2e8e]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:3rem;-moz-column-gap:3rem;column-gap:3rem;grid-row-gap:2rem;row-gap:2rem}}@media screen and (min-width:60em){.counSum__list[data-v-12bb2e8e]{grid-column-gap:6rem;-moz-column-gap:6rem;column-gap:6rem;grid-row-gap:3.5rem;row-gap:3.5rem}}",""]),t.exports=n},495:function(t,e,r){var content=r(594);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("77b7e17a",content,!0,{sourceMap:!1})},504:function(t,e,r){"use strict";r.r(e);var n=r(380),c={props:{meta:{type:Object,required:!0},relatedStats:{type:Object,required:!0},round:{type:String,required:!0}},data:function(){return{isShowingAllStats:!1}},computed:{intro:function(){return this.meta.intro}},methods:{showAllStats:function(){this.isShowingAllStats=!0},orgInterpellationLink:function(t){return{name:"round-interpellation",params:{round:this.round},query:{district:this.meta.districtId,catType:"org",catValue:t}}},councilorStats:function(t){return Object(n.get)(this.relatedStats,"".concat(t.id,".org"),[])}}},d=(r(460),r(27)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"districtSumWrapper"},[r("div",{staticClass:"districtSum"},[t._m(0),r("div",{staticClass:"districtSum__article"},[t.intro.body?r("nuxt-content",{attrs:{document:t.intro}}):r("div",{staticClass:"o-50"},[t._v("待撰寫")])],1),t._m(1),r("div",{staticClass:"districtSum__statsList relative mt3 mt0-ns",class:{"districtSum__statsList--all":t.isShowingAllStats}},[t._l(t.relatedStats.total.org,(function(e){return r("org-stats-tag",{key:e.name,attrs:{stats:e,to:t.orgInterpellationLink(e.name)}})})),r("button",{staticClass:"districtSum__showMore pointer",on:{click:t.showAllStats}},[t._v("顯示所有局處")])],2)]),r("div",{staticClass:"counSum"},[r("h2",{staticClass:"fw5 f3 f2-l ls4 lh-normal"},[t._v("應屆議員")]),r("div",{staticClass:"counSum__list"},t._l(t.meta.councilors,(function(e){return r("councilor-card",{key:e.id,staticClass:"mb2 mb0-ns",attrs:{person:e,round:t.round,"related-org-stats":t.councilorStats(e)}})})),1)])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h2",{staticClass:"f4 f3-ns nowrap"},[t._v("選區情報")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h2",{staticClass:"f4 f3-ns nowrap"},[t._v("質詢相關局處")])])}],!1,null,"12bb2e8e",null);e.default=component.exports;installComponents(component,{OrgStatsTag:r(438).default,CouncilorCard:r(505).default})},593:function(t,e,r){"use strict";r(495)},594:function(t,e,r){var n=r(32)(!1);n.push([t.i,".district[data-v-1595e475]{margin-top:1.5rem}.district h1.tcwTitle[data-v-1595e475]{margin-bottom:.75rem}.district__town[data-v-1595e475]{margin-bottom:3rem}@media screen and (min-width:30em){.district[data-v-1595e475]{margin-top:3rem}}@media screen and (min-width:60em){.district[data-v-1595e475]{margin-top:5.25rem}}",""]),t.exports=n},619:function(t,e,r){"use strict";r.r(e);r(38),r(36),r(44),r(53),r(37),r(54);var n=r(19),c=r(12),d=(r(65),r(52),r(13),r(66),r(131)),defs=r(99),o=r(373);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={asyncData:function(t){return Object(c.a)(regeneratorRuntime.mark((function e(){var r,n,c,d,o,l,meta,f,v,h,_,w;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,n=t.params,c=t.redirect,d=n.round||defs.b,o=n.district,e.next=5,r("council",d,"district-map").fetch();case 5:return l=e.sent,meta=l[o],f={},e.prev=8,e.next=11,r("council",d,"meta-".concat(meta.districtTitle)).fetch();case 11:f=e.sent,e.next=16;break;case 14:e.prev=14,e.t0=e.catch(8);case 16:if(meta||!o){e.next=19;break}return c("/".concat(d)),e.abrupt("return");case 19:if(meta&&f&&(meta=m(m({},meta),{},{intro:{body:f.body}})),v={},!meta){e.next=30;break}return h=meta.councilors.map((function(t){return t.id})),e.next=25,r("council",d,"sayit/stats").fetch();case 25:return _=e.sent,e.next=28,r("council",d,"sayit").where({id:{$in:h}}).fetch();case 28:w=e.sent,v=w.reduce((function(t,e){return t[e.id]=e.stats,t}),{total:_[o]});case 30:return e.abrupt("return",{districtMap:l,round:d,meta:meta,stats:v});case 31:case"end":return e.stop()}}),e,null,[[8,14]])})))()},head:Object(d.b)({title:function(){return this.meta?"".concat(Object(o.c)(this.meta.districtId),"選區 - ").concat(Object(o.e)(this.meta.townList)):"看選區"}}),computed:{target:function(){return this.meta?this.meta.districtTitle:""}},mounted:function(){if(this.meta){var t="#district-".concat(this.meta.districtTitle),e=this.$refs.landing.$el,main=this.$refs.main;main.offsetTop?Object(o.d)(main):Object(o.d)(e.querySelector(t))}}},v=(r(593),r(27)),component=Object(v.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"pageContainer"},[r("div",{staticClass:"district"},[r("district-landing",{ref:"landing",attrs:{map:t.districtMap,round:t.round,target:t.target}},[t.meta?r("district-summary",{attrs:{meta:t.meta,round:t.round,"related-stats":t.stats}}):t._e()],1),t.meta?r("div",{ref:"main",staticClass:"dn db-ns"},[r("tcw-title",[t._v(t._s(t.meta.districtTitle))]),r("div",{staticClass:"district__town f4 f3-l ls4"},[t._v(t._s(t.meta.townList.join(".")))]),r("district-summary",{attrs:{meta:t.meta,round:t.round,"related-stats":t.stats}})],1):t._e()],1)])}),[],!1,null,"1595e475",null);e.default=component.exports;installComponents(component,{DistrictSummary:r(504).default,DistrictLanding:r(435).default,TcwTitle:r(434).default})}}]);