(window.webpackJsonp=window.webpackJsonp||[]).push([[6,23],{366:function(t,e,r){var content=r(379);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("b0164840",content,!0,{sourceMap:!1})},367:function(t,e,r){var content=r(381);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("0e96ee7f",content,!0,{sourceMap:!1})},373:function(t,e,r){var content=r(390);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("6d416196",content,!0,{sourceMap:!1})},376:function(t,e,r){"use strict";r.r(e);r(78),r(127);var defs=r(96),n=r(360),o={props:{councilorMap:{type:Object,required:!0},sayit:{type:Object,required:!0}},computed:{councilor:function(){return this.councilorMap[this.sayit.councilorId]},district:function(){return"".concat(this.councilor.districtTitle," | ").concat(this.councilor.townList.join("."))},roundLabel:function(){var t=Object(n.c)(this.sayit.councilorRound||defs.b),e=Object(n.c)(this.sayit.round);return"".concat(t,"屆第").concat(e,"次").concat(this.sayit.type)}},methods:{gotoPdf:function(){alert("待做")}}},c=(r(380),r(27)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"intCard"},[r("div",{staticClass:"intCard__meta flex-ns flex-row-reverse justify-between ls3"},[r("div",{staticClass:"f6 gray"},[t._v(t._s(t.sayit.date))]),r("div",{staticClass:"mt3 mt0-ns"},[r("div",{staticClass:"f6 gray mb1"},[t._v("質詢議員： "+t._s(t.councilor.name))]),r("div",{staticClass:"f6 gray"},[t._v("選舉區域： "+t._s(t.district))])])]),r("h2",{staticClass:"f4 f3-ns fw5 ls4"},[t._v(t._s(t.sayit.summary))]),r("p",{staticClass:"ls2"},[t._v(t._s(t.sayit.say)+"...")]),r("button",{staticClass:"intCard__src plainButton pointer flex justify-between w-100",on:{click:t.gotoPdf}},[r("div",{staticClass:"f6 ls1"},[t._v("來源出處： "+t._s(t.roundLabel))]),r("div",{staticClass:"flex ls2"},[r("div",{staticClass:"intCard__more underline dn db-ns"},[t._v("閱讀更多")]),r("tcw-icon",{staticClass:"ml2",attrs:{icon:"chevron-right-gray"}})],1)])])}),[],!1,null,"0904268c",null);e.default=component.exports;installComponents(component,{TcwIcon:r(238).default})},378:function(t,e,r){"use strict";r(366)},379:function(t,e,r){var n=r(33)(!1);n.push([t.i,".longMenu[data-v-e1544464]{--menu-height:2.5rem;overflow:hidden;position:relative;width:calc(100% + 1rem);height:var(--menu-height)}.longMenu__container[data-v-e1544464]{display:flex;width:100%;padding-bottom:17px;box-sizing:content-box;overflow-x:scroll}@media screen and (min-width:60em){.longMenu[data-v-e1544464]{width:auto;height:auto}.longMenu__container[data-v-e1544464]{flex-direction:column;width:auto;padding-bottom:0;box-sizing:border-box;overflow-x:auto}}",""]),t.exports=n},380:function(t,e,r){"use strict";r(367)},381:function(t,e,r){var n=r(33)(!1);n.push([t.i,".intCard[data-v-0904268c]{border-bottom:1px solid #979797;padding-bottom:1.25rem;margin-bottom:1.25rem}.intCard__meta[data-v-0904268c]{margin-bottom:.75rem}.intCard p[data-v-0904268c]{margin:.75rem 0 1.25rem}@media screen and (min-width:30em){.intCard[data-v-0904268c]{padding-bottom:4rem;margin-bottom:4rem}.intCard__meta[data-v-0904268c]{margin-bottom:1.25rem}.intCard p[data-v-0904268c]{margin:1rem 0 2.25rem}.intCard__src:hover .intCard__more[data-v-0904268c]{color:#49b0d5;-webkit-text-decoration-color:#49b0d5;text-decoration-color:#49b0d5}}",""]),t.exports=n},384:function(t,e,r){var content=r(410);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("bd981464",content,!0,{sourceMap:!1})},386:function(t,e,r){"use strict";r.r(e);var n={props:{height:{type:String,default:"2.5rem"}},mounted:function(){this.$refs.menu.style.setProperty("--menu-height",this.height)}},o=(r(378),r(27)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"menu",staticClass:"longMenu"},[r("div",{staticClass:"longMenu__container"},[t._t("default")],2)])}),[],!1,null,"e1544464",null);e.default=component.exports},389:function(t,e,r){"use strict";r(373)},390:function(t,e,r){var n=r(33)(!1);n.push([t.i,".intCat__title[data-v-1c1bfd44]{padding-bottom:1.5rem;border-bottom:4px solid #979797;margin-bottom:3.5rem}",""]),t.exports=n},395:function(t,e,r){"use strict";r.r(e);r(14);var n={props:{councilorMap:{type:Object,required:!0},name:{type:String,required:!0},sayList:{type:Array,required:!0,validator:function(t){return t.every((function(t){return t.councilorId&&t.summary}))}},hasMore:{type:Boolean,default:!1}},methods:{showMore:function(){this.$emit("more")}}},o=(r(389),r(27)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"intCat"},[r("div",{staticClass:"intCat__title flex justify-between items-center"},[r("div",{staticClass:"f3 fw5"},[t._v("/ "+t._s(t.name))]),t.hasMore?r("button",{staticClass:"intCat__more pv2 plainButton underline pointer flex items-center",on:{click:t.showMore}},[t._v("局處所有質詢"),r("tcw-icon",{staticClass:"ml2",attrs:{icon:"chevron-right-gray"}})],1):t._e()]),t._l(t.sayList,(function(e,n){return r("interpellation-card",{key:n,attrs:{"councilor-map":t.councilorMap,sayit:e}})}))],2)}),[],!1,null,"1c1bfd44",null);e.default=component.exports;installComponents(component,{TcwIcon:r(238).default,InterpellationCard:r(376).default})},409:function(t,e,r){"use strict";r(384)},410:function(t,e,r){var n=r(33)(!1);n.push([t.i,".intLanding__main[data-v-27698a08]{margin-top:2.25rem}@media screen and (min-width:60em){.intLanding[data-v-27698a08]{display:grid;grid-template-columns:14rem 1fr;grid-column-gap:5rem;-moz-column-gap:5rem;column-gap:5rem;align-items:start}.intLanding__main[data-v-27698a08]{margin-top:0}.intLanding__stats[data-v-27698a08]{position:-webkit-sticky;position:sticky;top:6rem;max-height:calc(100vh - 10rem);overflow-y:scroll}}.stats__switch[data-v-27698a08]{padding:0 .625rem .75rem;border-bottom:2px solid #979797}.stats__switch+.stats__switch[data-v-27698a08]{margin-left:2rem}.stats__item[data-v-27698a08]{background:none;border:1px solid #afafb0;padding:.5rem .75rem;margin:0 .5rem .75rem 0;line-height:1.125;text-align:left}@media screen and (min-width:60em){.stats__item[data-v-27698a08]{border-width:0 0 1px;margin:0 0 .25rem;padding:1rem .75rem 1rem 0}}.stats__item--active[data-v-27698a08]{color:#49b0d5}",""]),t.exports=n},422:function(t,e,r){"use strict";r.r(e);var n=r(20),o=(r(14),r(50),r(44),r(80),r(55),r(37),r(51),r(32),r(38),r(36),r(52),r(53),r(377)),c=r(441),l=r.n(c),defs=r(96),d=r(360);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={components:{InfiniteLoading:l.a},props:{councilorMap:{type:Object,required:!0},sayList:{type:Array,required:!0,validator:function(t){return t.every((function(t){return t.councilorId&&t.summary}))}},stats:{type:Object,required:!0,validator:function(t){return t.org}},category:{default:void 0,validator:function(t){return!t||["org"].includes(t.type)&&t.value}},isStatic:{type:Boolean,default:!0}},data:function(){return{cursor:10,targetCategory:this.category,infiniteId:0}},computed:{targetSayList:function(){var t=this;return this.isStatic&&this.targetCategory&&"org"===this.targetCategory.type?this.sayList.filter((function(e){return e.relatedOrgs.includes(t.targetCategory.value)})):this.sayList},visibleSayList:function(){return this.targetSayList.slice(0,this.cursor)},isShowingAllCategory:function(){return this.targetCategory&&"all"===this.targetCategory.value},perCategorySayList:function(){if(!this.isShowingAllCategory)return[];if("org"!==this.targetCategory.type)return[];var t=this.sayList.reduce((function(t,e){return e.relatedOrgs.forEach((function(r){t[r]||(t[r]=[]),t[r].length<=3&&t[r].push(e)})),t}),{});return this.stats.org.filter((function(e){return t[e.name]})).map((function(e){return f(f({},e),{},{sayList:t[e.name].slice(0,3),hasMore:t[e.name].length>3})}))}},watch:{infiniteId:function(){var t=this;this.$nextTick((function(){t.scrollToMain()}))},category:function(t){if(t||this.targetCategory){var e=!1;t?this.targetCategory&&t.type===this.targetCategory.type&&t.value===this.targetCategory.value||(this.targetCategory=f({},t),e=!0):(this.targetCategory=void 0,e=!0),e&&this.resetInfiniteLoading()}}},methods:{resetInfiniteLoading:Object(o.debounce)((function(){this.cursor=10,this.infiniteId+=1}),200),isCatActive:function(t,e){return this.targetCategory&&this.targetCategory.type===t&&this.targetCategory.value===e},toggleCategory:function(t,e){var r=this.targetCategory;r&&r.type===t&&r.value===e?this.filterCategory(t,"all"):this.filterCategory(t,e)},filterCategory:function(t,e){this.targetCategory={type:t,value:e},this.resetInfiniteLoading(),this.$emit("update:category",this.targetCategory)},loadMoreSayList:function(t){if(this.visibleSayList.length<this.targetSayList.length)return this.cursor+=10,void this.$nextTick((function(){t.loaded()}));this.isStatic?t.complete():this.$emit("infinite",t)},scrollToMain:function(){var main=this.$refs.main;if(main){var t=main.getBoundingClientRect(),e=t.y+120>window.innerHeight;(t.y<defs.e||e)&&Object(d.d)(main)}}}},y=(r(409),r(27)),component=Object(y.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"intLanding"},[r("div",{staticClass:"intLanding__stats stats"},[t._m(0),r("h2",{staticClass:"f4 f3-l mb3 dn db-l"},[t._v("質詢局處")]),r("long-menu",{attrs:{height:"2.25rem"}},t._l(t.stats.org,(function(e){return r("button",{key:e.name,staticClass:"stats__item flex-none flex-l justify-between f5 f4-l w-100-l pointer ls2",class:{"stats__item--active":t.isCatActive("org",e.name)},on:{click:function(r){return t.toggleCategory("org",e.name)}}},[r("span",{staticClass:"mr2 mr0-l"},[t._v(t._s(e.name))]),r("span",[t._v(t._s(e.count.toLocaleString()))])])})),0)],1),r("div",{ref:"main",staticClass:"intLanding__main"},[t.isShowingAllCategory?t._l(t.perCategorySayList,(function(e){return r("interpellation-category",{key:e.name,staticClass:"mb6",attrs:{name:e.name,"councilor-map":t.councilorMap,"say-list":e.sayList,"has-more":e.hasMore},on:{more:function(r){return t.toggleCategory("org",e.name)}}})})):[t._l(t.visibleSayList,(function(e,n){return r("interpellation-card",{key:e.objectID||n,attrs:{"councilor-map":t.councilorMap,sayit:e}})})),r("client-only",[r("infinite-loading",{attrs:{identifier:t.infiniteId},on:{infinite:t.loadMoreSayList}},[r("div",{staticClass:"f6 gray",attrs:{slot:"no-more"},slot:"no-more"},[t._v("已顯示所有搜尋結果")]),r("div",{staticClass:"f6 gray",attrs:{slot:"no-results"},slot:"no-results"},[t.isShowingAllCategory?r("span",[t._v("找不到任何結果，或許換個關鍵字試試？")]):r("div",{staticClass:"pointer",on:{click:function(e){return t.filterCategory("org","all")}}},[t._v("找不到任何結果，或許看看"),r("div",{staticClass:"di underline"},[t._v("所有局處？")])])])])],1)]],2)])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flex items-center dn-l pb1 mb3"},[r("button",{staticClass:"plainButton stats__switch f4 ls3"},[t._v("質詢局處")])])}],!1,null,"27698a08",null);e.default=component.exports;installComponents(component,{LongMenu:r(386).default,InterpellationCategory:r(395).default,InterpellationCard:r(376).default})},470:function(t,e,r){var content=r(560);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("7501293c",content,!0,{sourceMap:!1})},559:function(t,e,r){"use strict";r(470)},560:function(t,e,r){var n=r(33)(!1);n.push([t.i,".councilor[data-v-2162ed8f]{padding:1.75rem 0}.councilor__head[data-v-2162ed8f]{margin-top:2.5rem;padding-top:1.5rem}.councilor h1[data-v-2162ed8f]{font-size:1.5rem;letter-spacing:2px;line-height:normal}.councilor h1 span[data-v-2162ed8f]:first-child{margin-bottom:.25rem}.councilor__person[data-v-2162ed8f]{margin:1.5rem 0 2.25rem;padding-bottom:1.75rem}.councilor__basic[data-v-2162ed8f]{display:grid;grid-template-columns:6rem 1fr;grid-column-gap:2.25rem;-moz-column-gap:2.25rem;column-gap:2.25rem;align-items:center;line-height:normal}.councilor__personMeta[data-v-2162ed8f]{margin-top:1.25rem;line-height:normal}.councilor__personMeta h2[data-v-2162ed8f]{margin:0 0 .5rem}@media screen and (min-width:30em){.councilor[data-v-2162ed8f]{padding:3.5rem 0}.councilor__head[data-v-2162ed8f]{margin-top:3.5rem;padding-top:3.5rem}.councilor h1[data-v-2162ed8f]{font-size:1.75rem;letter-spacing:2.33px}.councilor h1 span[data-v-2162ed8f]:first-child{margin:0 3rem 0 0}.councilor__person[data-v-2162ed8f]{margin:3.5rem 1rem 8.5rem;padding:0;display:grid;grid-template-columns:22rem 1fr}.councilor__basic[data-v-2162ed8f]{grid-template-columns:8.5rem 1fr;grid-column-gap:1.75rem;-moz-column-gap:1.75rem;column-gap:1.75rem;padding:1.5rem 1rem 1.5rem 0}.councilor__personMeta[data-v-2162ed8f]{margin-top:0;padding:1.5rem 2.25rem}.councilor__person--misc[data-v-2162ed8f]{grid-template-columns:19.5rem 1fr 1fr}.councilor__person--misc .councilor__personMeta[data-v-2162ed8f]{padding:1.5rem 1.75rem}}",""]),t.exports=n},585:function(t,e,r){"use strict";r.r(e);r(38),r(36),r(44),r(52),r(37),r(53);var n=r(20),o=r(12),c=(r(237),r(14),r(32),r(240),r(127),r(51),r(35),r(160),r(64),r(377)),defs=r(96),l=r(360);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r,n,o,c,l,d,f,h,y;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,n=t.params,t.redirect,o=n.round||defs.b,e.next=4,r("council",o,"district-map").fetch();case 4:return c=e.sent,e.next=7,r("council",o,"councilor-map").fetch();case 7:return l=e.sent,d=n.councilor,f=l[d],e.prev=10,e.next=13,r("council",o,"sayit",d).fetch();case 13:h=e.sent,e.next=18;break;case 16:e.prev=16,e.t0=e.catch(10);case 18:return e.prev=18,e.next=21,r("council",o,"meta-".concat(f.districtTitle)).fetch();case 21:y=e.sent,f=m(m({},f),y["councilor-".concat(d)]),e.next=27;break;case 25:e.prev=25,e.t1=e.catch(18);case 27:return e.abrupt("return",{districtMap:c,round:o,councilor:f,counsMap:l,sayit:h});case 28:case"end":return e.stop()}}),e,null,[[10,16],[18,25]])})))()},computed:{interpellationCategory:{get:function(){var t=this.$route.query.catType,e=this.$route.query.catValue;return t&&e&&this.sayitStats[t]&&this.sayitStats[t].find((function(t){return t.name===e}))?{type:t,value:e}:m({},defs.a)},set:function(t){this.$router.push({name:this.$route.name,params:this.$route.params,query:{catType:t.type,catValue:t.value}})}},townLabel:function(){if(!this.councilor)return"";var t=this.councilor.townList,e=t[t.length-1];return e.endsWith("區")||(t[t.length-1]="".concat(e,"區")),t.join(".")},sayitStats:function(){return Object(c.get)(this,"sayit.stats",{org:[]})},sayList:function(){var t=this;return Object(c.get)(this,"sayit.sayit",[]).map((function(e){return m(m({},e),{},{councilorId:t.sayit.id,councilRound:t.round})}))},jobHistory:function(){return(this.councilor["job-history"]||"待撰寫").split("\n")},miscColumn:function(){var title=this.councilor["misc-title"],content=this.councilor["misc-content"];if(title&&content)return{title:title,content:content}}},mounted:function(){this.councilor&&Object(l.d)(this.$refs.head)}},h=(r(559),r(27)),component=Object(h.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"pageContainer"},[r("div",{staticClass:"councilor"},[t.districtMap?r("councilor-landing",{attrs:{map:t.districtMap,round:t.round,minified:!!t.councilor}}):t._e(),t.councilor?[r("div",{ref:"head",staticClass:"councilor__head bt b--gray-d"},[r("h1",{staticClass:"fw5 flex flex-column flex-row-ns"},[r("span",[t._v(t._s(t.councilor.districtTitle))]),r("span",[t._v(t._s(t.townLabel))])])]),r("div",{staticClass:"councilor__person bb bt-ns b--gray-d b--gray-9-ns",class:{"councilor__person--misc":t.miscColumn}},[r("div",{staticClass:"councilor__basic br-ns b--gray-9"},[r("div",{staticClass:"aspect-ratio aspect-ratio--1x1"},[r("div",{staticClass:"aspect-ratio--object br-100 overflow-hidden"},[r("img",{attrs:{src:t.councilor.bgUrl,alt:t.councilor.name}})])]),r("div",[r("div",{staticClass:"f5 f4-ns fw5 ls3"},[t._v(t._s(t.councilor.name))]),r("div",{staticClass:"f5 pt2-ns mt3"},[r("party-label",{attrs:{party:t.councilor.party}})],1)])]),r("div",{staticClass:"councilor__personMeta"},[r("h2",{staticClass:"f3"},[t._v("公職經歷")]),t._l(t.jobHistory,(function(line){return r("p",{key:line,staticClass:"ls2"},[t._v(t._s(line))])}))],2),t.miscColumn?r("div",{staticClass:"councilor__personMeta bl-ns b--gray-9"},[r("h2",{staticClass:"f3"},[t._v(t._s(t.miscColumn.title))]),r("p",{staticClass:"ls2"},[t._v(t._s(t.miscColumn.content))])]):t._e()]),r("div",{staticClass:"councilor__sayit"},[r("interpellation-landing",{attrs:{"councilor-map":t.counsMap,"say-list":t.sayList,stats:t.sayitStats,category:t.interpellationCategory},on:{"update:category":function(e){t.interpellationCategory=e}}})],1)]:t._e()],2)])}),[],!1,null,"2162ed8f",null);e.default=component.exports;installComponents(component,{CouncilorLanding:r(476).default,PartyLabel:r(391).default,InterpellationLanding:r(422).default})}}]);