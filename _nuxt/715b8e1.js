(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{144:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"a",(function(){return r}));e(36);var o=[{label:"看選區",route:function(t){return"/".concat(t,"/選區")}},{label:"找議員",route:function(t){return"/".concat(t,"/議員")}},{label:"搜質詢",route:function(t){return"/".concat(t,"/質詢")}}],r=["一","二","三","四","五","六","七","八","九","十","十一","十二","十三"].map((function(i){return"第".concat(i,"選區")}))},186:function(t,n,e){var content=e(296);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(44).default)("3d7da814",content,!0,{sourceMap:!1})},213:function(t,n,e){"use strict";var o={name:"TcwDefault"},r=e(35),component=Object(r.a)(o,(function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"tcw mb5"},[n("tcw-navbar"),n("main",[n("nuxt")],1)],1)}),[],!1,null,null,null);n.a=component.exports;installComponents(component,{TcwNavbar:e(324).default})},218:function(t,n,e){e(219),t.exports=e(220)},291:function(t,n,e){var content=e(292);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(44).default)("383355a5",content,!0,{sourceMap:!1})},292:function(t,n,e){var o=e(43)(!1);o.push([t.i,'html{color:#00000f}body,button,input,optgroup,select,textarea{font-family:"Noto Sans TC",serif}',""]),t.exports=o},295:function(t,n,e){"use strict";e(186)},296:function(t,n,e){var o=e(43)(!1);o.push([t.i,".navWrapper[data-v-69b256e0]{position:-webkit-sticky;position:sticky;top:0;z-index:999}.navWrapper--opened[data-v-69b256e0]{min-height:100vh;position:fixed;top:0;bottom:0;left:0;right:0}.nav__linkList a[data-v-69b256e0]{color:#40404a;text-decoration:none}.nav__linkList a+a[data-v-69b256e0]{margin-top:1.25rem}.nav__linkList--desktop a[data-v-69b256e0]{color:#282828}.nav__linkList--desktop a+a[data-v-69b256e0]{margin-left:3.75rem}.nav__toggle[data-v-69b256e0]{outline:none;background:none;border:none;cursor:pointer}",""]),t.exports=o},324:function(t,n,e){"use strict";e.r(n);var defs=e(144),o={data:function(){return{menuOpened:!1}},computed:{navLinks:function(){return defs.b},round:function(){return this.$route.params.round||"第三屆"}},watch:{$route:function(){this.menuOpened=!1}},methods:{toggleMenu:function(){this.menuOpened=!this.menuOpened}}},r=(e(295),e(35)),component=Object(r.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"navWrapper mt3 ph3 ph4-l bg-white",class:{"navWrapper--opened":t.menuOpened}},[e("div",{staticClass:"pv3 bb-l b--moon-gray"},[e("div",{staticClass:"nav mw8 center flex items-center justify-between"},[e("nuxt-link",{staticClass:"black fw6",attrs:{to:"/"+t.round}},[t._v("台南新芽")]),e("div",{staticClass:"nav__linkList nav__linkList--desktop dn db-l"},t._l(t.navLinks,(function(link){return e("nuxt-link",{key:link.label,attrs:{to:link.route(t.round)}},[t._v(t._s(link.label))])})),1),t._m(0),e("button",{staticClass:"nav__toggle db dn-l button-reset",on:{click:t.toggleMenu}},[e("i",{directives:[{name:"show",rawName:"v-show",value:t.menuOpened,expression:"menuOpened"}],staticClass:"fa-solid fa-xmark"}),e("i",{directives:[{name:"show",rawName:"v-show",value:!t.menuOpened,expression:"!menuOpened"}],staticClass:"fa-solid fa-bars"})])],1),e("div",{directives:[{name:"show",rawName:"v-show",value:t.menuOpened,expression:"menuOpened"}],staticClass:"navMenu"},[e("div",{staticClass:"nav__linkList nav__linkList--mobile mt4"},t._l(t.navLinks,(function(link){return e("nuxt-link",{key:link.label,staticClass:"db",attrs:{to:link.route(t.round)}},[t._v(t._s(link.label))])})),1)])])])}),[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"dn db-l"},[n("i",{staticClass:"fa-solid fa-magnifying-glass"})])}],!1,null,"69b256e0",null);n.default=component.exports}},[[218,16,6,17]]]);