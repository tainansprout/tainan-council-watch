(window.webpackJsonp=window.webpackJsonp||[]).push([[21,23],{360:function(t,e,n){"use strict";n.d(e,"b",(function(){return f})),n.d(e,"a",(function(){return m})),n.d(e,"d",(function(){return y})),n.d(e,"c",(function(){return v}));n(14),n(32),n(237),n(63),n(97),n(35),n(239),n(77);var r=n(361),o=n.n(r),c=n(96),l=n(362),d=l.a.reduce((function(t,e){return t[e.abbr||e.name]=e,t}),{});function f(t){if(t){if(t.name&&t.avatar)return t;var e=d[t];if(e||(e=l.a.find((function(p){return p.name===t}))),!e)throw new Error("Undefined party: ".concat(t));return e}}function m(t){return o()(t).format("YYYY.MM.DD")}function y(t){if(t){var e=t.offsetTop-c.e;setTimeout((function(){window.scrollTo({top:e,behavior:"smooth"})}))}}function v(t){var e=/st|nd|rd|th/,n=(t=t.toString()).match(e);t=t.replace(e,"");var r=c.g[t];if(!r)throw new Error("Undefined number: ".concat(t));return n?"第".concat(r):r}},362:function(t){t.exports=JSON.parse('{"a":[{"name":"中國國民黨","abbr":"國民黨","avatar":"/content-img/party-國.png"},{"name":"民主進步黨","abbr":"民進黨","avatar":"/content-img/party-民.png"},{"name":"台灣團結聯盟","avatar":"/content-img/party-台.png"},{"name":"無黨籍","avatar":"/content-img/party-無.png"},{"name":"台灣基進","avatar":"/content-img/party-基.png"},{"name":"時代力量","avatar":"/content-img/party-時.png"},{"name":"新黨","avatar":"/content-img/party-新.png"},{"name":"台灣民眾黨","avatar":"/content-img/party-眾.png"},{"name":"綠黨","avatar":"/content-img/party-綠.png"}]}')},366:function(t,e,n){var content=n(379);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("b0164840",content,!0,{sourceMap:!1})},367:function(t,e,n){var content=n(381);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("0e96ee7f",content,!0,{sourceMap:!1})},373:function(t,e,n){var content=n(390);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("6d416196",content,!0,{sourceMap:!1})},376:function(t,e,n){"use strict";n.r(e);n(78),n(127);var defs=n(96),r=n(360),o={props:{councilorMap:{type:Object,required:!0},sayit:{type:Object,required:!0}},computed:{councilor:function(){return this.councilorMap[this.sayit.councilorId]},district:function(){return"".concat(this.councilor.districtTitle," | ").concat(this.councilor.townList.join("."))},roundLabel:function(){var t=Object(r.c)(this.sayit.councilorRound||defs.b),e=Object(r.c)(this.sayit.round);return"".concat(t,"屆第").concat(e,"次").concat(this.sayit.type)}},methods:{gotoPdf:function(){alert("待做")}}},c=(n(380),n(27)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"intCard"},[n("div",{staticClass:"intCard__meta flex-ns flex-row-reverse justify-between ls3"},[n("div",{staticClass:"f6 gray"},[t._v(t._s(t.sayit.date))]),n("div",{staticClass:"mt3 mt0-ns"},[n("div",{staticClass:"f6 gray mb1"},[t._v("質詢議員： "+t._s(t.councilor.name))]),n("div",{staticClass:"f6 gray"},[t._v("選舉區域： "+t._s(t.district))])])]),n("h2",{staticClass:"f4 f3-ns fw5 ls4"},[t._v(t._s(t.sayit.summary))]),n("p",{staticClass:"ls2"},[t._v(t._s(t.sayit.say)+"...")]),n("button",{staticClass:"intCard__src plainButton pointer flex justify-between w-100",on:{click:t.gotoPdf}},[n("div",{staticClass:"f6 ls1"},[t._v("來源出處： "+t._s(t.roundLabel))]),n("div",{staticClass:"flex ls2"},[n("div",{staticClass:"intCard__more underline dn db-ns"},[t._v("閱讀更多")]),n("tcw-icon",{staticClass:"ml2",attrs:{icon:"chevron-right-gray"}})],1)])])}),[],!1,null,"0904268c",null);e.default=component.exports;installComponents(component,{TcwIcon:n(238).default})},378:function(t,e,n){"use strict";n(366)},379:function(t,e,n){var r=n(33)(!1);r.push([t.i,".longMenu[data-v-e1544464]{--menu-height:2.5rem;overflow:hidden;position:relative;width:calc(100% + 1rem);height:var(--menu-height)}.longMenu__container[data-v-e1544464]{display:flex;width:100%;padding-bottom:17px;box-sizing:content-box;overflow-x:scroll}@media screen and (min-width:60em){.longMenu[data-v-e1544464]{width:auto;height:auto}.longMenu__container[data-v-e1544464]{flex-direction:column;width:auto;padding-bottom:0;box-sizing:border-box;overflow-x:auto}}",""]),t.exports=r},380:function(t,e,n){"use strict";n(367)},381:function(t,e,n){var r=n(33)(!1);r.push([t.i,".intCard[data-v-0904268c]{border-bottom:1px solid #979797;padding-bottom:1.25rem;margin-bottom:1.25rem}.intCard__meta[data-v-0904268c]{margin-bottom:.75rem}.intCard p[data-v-0904268c]{margin:.75rem 0 1.25rem}@media screen and (min-width:30em){.intCard[data-v-0904268c]{padding-bottom:4rem;margin-bottom:4rem}.intCard__meta[data-v-0904268c]{margin-bottom:1.25rem}.intCard p[data-v-0904268c]{margin:1rem 0 2.25rem}.intCard__src:hover .intCard__more[data-v-0904268c]{color:#49b0d5;-webkit-text-decoration-color:#49b0d5;text-decoration-color:#49b0d5}}",""]),t.exports=r},384:function(t,e,n){var content=n(410);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("bd981464",content,!0,{sourceMap:!1})},386:function(t,e,n){"use strict";n.r(e);var r={props:{height:{type:String,default:"2.5rem"}},mounted:function(){this.$refs.menu.style.setProperty("--menu-height",this.height)}},o=(n(378),n(27)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"menu",staticClass:"longMenu"},[n("div",{staticClass:"longMenu__container"},[t._t("default")],2)])}),[],!1,null,"e1544464",null);e.default=component.exports},389:function(t,e,n){"use strict";n(373)},390:function(t,e,n){var r=n(33)(!1);r.push([t.i,".intCat__title[data-v-1c1bfd44]{padding-bottom:1.5rem;border-bottom:4px solid #979797;margin-bottom:3.5rem}",""]),t.exports=r},395:function(t,e,n){"use strict";n.r(e);n(14);var r={props:{councilorMap:{type:Object,required:!0},name:{type:String,required:!0},sayList:{type:Array,required:!0,validator:function(t){return t.every((function(t){return t.councilorId&&t.summary}))}},hasMore:{type:Boolean,default:!1}},methods:{showMore:function(){this.$emit("more")}}},o=(n(389),n(27)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"intCat"},[n("div",{staticClass:"intCat__title flex justify-between items-center"},[n("div",{staticClass:"f3 fw5"},[t._v("/ "+t._s(t.name))]),t.hasMore?n("button",{staticClass:"intCat__more pv2 plainButton underline pointer flex items-center",on:{click:t.showMore}},[t._v("局處所有質詢"),n("tcw-icon",{staticClass:"ml2",attrs:{icon:"chevron-right-gray"}})],1):t._e()]),t._l(t.sayList,(function(e,r){return n("interpellation-card",{key:r,attrs:{"councilor-map":t.councilorMap,sayit:e}})}))],2)}),[],!1,null,"1c1bfd44",null);e.default=component.exports;installComponents(component,{TcwIcon:n(238).default,InterpellationCard:n(376).default})},409:function(t,e,n){"use strict";n(384)},410:function(t,e,n){var r=n(33)(!1);r.push([t.i,".intLanding__main[data-v-27698a08]{margin-top:2.25rem}@media screen and (min-width:60em){.intLanding[data-v-27698a08]{display:grid;grid-template-columns:14rem 1fr;grid-column-gap:5rem;-moz-column-gap:5rem;column-gap:5rem;align-items:start}.intLanding__main[data-v-27698a08]{margin-top:0}.intLanding__stats[data-v-27698a08]{position:-webkit-sticky;position:sticky;top:6rem;max-height:calc(100vh - 10rem);overflow-y:scroll}}.stats__switch[data-v-27698a08]{padding:0 .625rem .75rem;border-bottom:2px solid #979797}.stats__switch+.stats__switch[data-v-27698a08]{margin-left:2rem}.stats__item[data-v-27698a08]{background:none;border:1px solid #afafb0;padding:.5rem .75rem;margin:0 .5rem .75rem 0;line-height:1.125;text-align:left}@media screen and (min-width:60em){.stats__item[data-v-27698a08]{border-width:0 0 1px;margin:0 0 .25rem;padding:1rem .75rem 1rem 0}}.stats__item--active[data-v-27698a08]{color:#49b0d5}",""]),t.exports=r},422:function(t,e,n){"use strict";n.r(e);var r=n(20),o=(n(14),n(50),n(44),n(80),n(55),n(37),n(51),n(32),n(38),n(36),n(52),n(53),n(377)),c=n(441),l=n.n(c),defs=n(96),d=n(360);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var y={components:{InfiniteLoading:l.a},props:{councilorMap:{type:Object,required:!0},sayList:{type:Array,required:!0,validator:function(t){return t.every((function(t){return t.councilorId&&t.summary}))}},stats:{type:Object,required:!0,validator:function(t){return t.org}},category:{default:void 0,validator:function(t){return!t||["org"].includes(t.type)&&t.value}},isStatic:{type:Boolean,default:!0}},data:function(){return{cursor:10,targetCategory:this.category,infiniteId:0}},computed:{targetSayList:function(){var t=this;return this.isStatic&&this.targetCategory&&"org"===this.targetCategory.type?this.sayList.filter((function(e){return e.relatedOrgs.includes(t.targetCategory.value)})):this.sayList},visibleSayList:function(){return this.targetSayList.slice(0,this.cursor)},isShowingAllCategory:function(){return this.targetCategory&&"all"===this.targetCategory.value},perCategorySayList:function(){if(!this.isShowingAllCategory)return[];if("org"!==this.targetCategory.type)return[];var t=this.sayList.reduce((function(t,e){return e.relatedOrgs.forEach((function(n){t[n]||(t[n]=[]),t[n].length<=3&&t[n].push(e)})),t}),{});return this.stats.org.filter((function(e){return t[e.name]})).map((function(e){return m(m({},e),{},{sayList:t[e.name].slice(0,3),hasMore:t[e.name].length>3})}))}},watch:{infiniteId:function(){var t=this;this.$nextTick((function(){t.scrollToMain()}))},category:function(t){if(t||this.targetCategory){var e=!1;t?this.targetCategory&&t.type===this.targetCategory.type&&t.value===this.targetCategory.value||(this.targetCategory=m({},t),e=!0):(this.targetCategory=void 0,e=!0),e&&this.resetInfiniteLoading()}}},methods:{resetInfiniteLoading:Object(o.debounce)((function(){this.cursor=10,this.infiniteId+=1}),200),isCatActive:function(t,e){return this.targetCategory&&this.targetCategory.type===t&&this.targetCategory.value===e},toggleCategory:function(t,e){var n=this.targetCategory;n&&n.type===t&&n.value===e?this.filterCategory(t,"all"):this.filterCategory(t,e)},filterCategory:function(t,e){this.targetCategory={type:t,value:e},this.resetInfiniteLoading(),this.$emit("update:category",this.targetCategory)},loadMoreSayList:function(t){if(this.visibleSayList.length<this.targetSayList.length)return this.cursor+=10,void this.$nextTick((function(){t.loaded()}));this.isStatic?t.complete():this.$emit("infinite",t)},scrollToMain:function(){var main=this.$refs.main;if(main){var t=main.getBoundingClientRect(),e=t.y+120>window.innerHeight;(t.y<defs.e||e)&&Object(d.d)(main)}}}},v=(n(409),n(27)),component=Object(v.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"intLanding"},[n("div",{staticClass:"intLanding__stats stats"},[t._m(0),n("h2",{staticClass:"f4 f3-l mb3 dn db-l"},[t._v("質詢局處")]),n("long-menu",{attrs:{height:"2.25rem"}},t._l(t.stats.org,(function(e){return n("button",{key:e.name,staticClass:"stats__item flex-none flex-l justify-between f5 f4-l w-100-l pointer ls2",class:{"stats__item--active":t.isCatActive("org",e.name)},on:{click:function(n){return t.toggleCategory("org",e.name)}}},[n("span",{staticClass:"mr2 mr0-l"},[t._v(t._s(e.name))]),n("span",[t._v(t._s(e.count.toLocaleString()))])])})),0)],1),n("div",{ref:"main",staticClass:"intLanding__main"},[t.isShowingAllCategory?t._l(t.perCategorySayList,(function(e){return n("interpellation-category",{key:e.name,staticClass:"mb6",attrs:{name:e.name,"councilor-map":t.councilorMap,"say-list":e.sayList,"has-more":e.hasMore},on:{more:function(n){return t.toggleCategory("org",e.name)}}})})):[t._l(t.visibleSayList,(function(e,r){return n("interpellation-card",{key:e.objectID||r,attrs:{"councilor-map":t.councilorMap,sayit:e}})})),n("client-only",[n("infinite-loading",{attrs:{identifier:t.infiniteId},on:{infinite:t.loadMoreSayList}},[n("div",{staticClass:"f6 gray",attrs:{slot:"no-more"},slot:"no-more"},[t._v("已顯示所有搜尋結果")]),n("div",{staticClass:"f6 gray",attrs:{slot:"no-results"},slot:"no-results"},[t.isShowingAllCategory?n("span",[t._v("找不到任何結果，或許換個關鍵字試試？")]):n("div",{staticClass:"pointer",on:{click:function(e){return t.filterCategory("org","all")}}},[t._v("找不到任何結果，或許看看"),n("div",{staticClass:"di underline"},[t._v("所有局處？")])])])])],1)]],2)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex items-center dn-l pb1 mb3"},[n("button",{staticClass:"plainButton stats__switch f4 ls3"},[t._v("質詢局處")])])}],!1,null,"27698a08",null);e.default=component.exports;installComponents(component,{LongMenu:n(386).default,InterpellationCategory:n(395).default,InterpellationCard:n(376).default})}}]);