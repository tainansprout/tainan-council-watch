(window.webpackJsonp=window.webpackJsonp||[]).push([[17,16],{345:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"a",(function(){return c}));e(76),e(14),e(96),e(35),e(232),e(77);var r=e(126);function o(t){if(t){var n=t.offsetTop-r.d;setTimeout((function(){window.scrollTo({top:n,behavior:"smooth"})}))}}function c(t){var n=/st|nd|rd|th/,e=(t=t.toString()).match(n);t=t.replace(n,"");var o=r.f[t];if(!o)throw new Error("Undefined number: ".concat(t));return e?"第".concat(o):o}},347:function(t,n,e){var content=e(356);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(49).default)("55ba80e6",content,!0,{sourceMap:!1})},349:function(t,n,e){var content=e(367);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(49).default)("7d388273",content,!0,{sourceMap:!1})},351:function(t,n,e){"use strict";e.r(n);e(79),e(127);var defs=e(126),r=e(345),o={props:{councilorMap:{type:Object,required:!0},sayit:{type:Object,required:!0}},computed:{councilor:function(){return this.councilorMap[this.sayit.councilorId]},district:function(){return"".concat(this.councilor.districtTitle," | ").concat(this.councilor.townList.join("."))},roundLabel:function(){var t=Object(r.a)(this.sayit.councilorRound||defs.a),n=Object(r.a)(this.sayit.round);return"".concat(t,"屆第").concat(n,"次").concat(this.sayit.type)}}},c=(e(355),e(43)),component=Object(c.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"intCard pb3 bb b--moon-gray mb3"},[e("div",{staticClass:"flex-l flex-row-reverse justify-between mb3"},[e("div",{staticClass:"f6 gray"},[t._v(t._s(t.sayit.date))]),e("div",{staticClass:"mt3 mt0-l"},[e("div",{staticClass:"f6 gray mb1"},[t._v("質詢議員： "+t._s(t.councilor.name))]),e("div",{staticClass:"f6 gray"},[t._v("選舉區域： "+t._s(t.district))])])]),e("h2",{staticClass:"f4 f3-l fw6"},[t._v(t._s(t.sayit.summary))]),e("p",[t._v(t._s(t.sayit.say))]),e("div",{staticClass:"flex-l justify-between"},[e("div",{staticClass:"f6"},[t._v("來源出處： "+t._s(t.roundLabel))]),e("div",{staticClass:"dn light-blue f6"},[t._v("閱讀更多")])])])}),[],!1,null,"37314b42",null);n.default=component.exports},355:function(t,n,e){"use strict";e(347)},356:function(t,n,e){var r=e(48)(!1);r.push([t.i,"",""]),t.exports=r},366:function(t,n,e){"use strict";e(349)},367:function(t,n,e){var r=e(48)(!1);r.push([t.i,".intCat__more[data-v-46f5463d]{outline:none;border:none;background:none}",""]),t.exports=r},373:function(t,n,e){"use strict";e.r(n);e(14);var r={props:{councilorMap:{type:Object,required:!0},name:{type:String,required:!0},sayList:{type:Array,required:!0,validator:function(t){return t.every((function(t){return t.councilorId&&t.summary}))}},hasMore:{type:Boolean,default:!1}},methods:{showMore:function(){this.$emit("more")}}},o=(e(366),e(43)),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"intCat"},[t.hasMore?e("div",{staticClass:"tr"},[e("button",{staticClass:"intCat__more pv2 mb3 pointer",on:{click:t.showMore}},[t._v("閱讀全部 >")])]):t._e(),e("div",{staticClass:"intCat__title f3 fw5 pb3 mb4 bb b--gray bw2"},[t._v("/ "+t._s(t.name))]),t._l(t.sayList,(function(n,r){return e("interpellation-card",{key:r,attrs:{"councilor-map":t.councilorMap,sayit:n}})}))],2)}),[],!1,null,"46f5463d",null);n.default=component.exports;installComponents(component,{InterpellationCard:e(351).default})}}]);