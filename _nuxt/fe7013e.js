(window.webpackJsonp=window.webpackJsonp||[]).push([[8,13,14,16,18,26],{351:function(t,e,n){"use strict";n.d(e,"a",(function(){return d})),n.d(e,"c",(function(){return l})),n.d(e,"b",(function(){return f}));n(76),n(14),n(96),n(33),n(234),n(77);var r=n(352),c=n.n(r),o=n(126);function d(t){return c()(t).format("YYYY.MM.DD")}function l(t){if(t){var e=t.offsetTop-o.d;setTimeout((function(){window.scrollTo({top:e,behavior:"smooth"})}))}}function f(t){var e=/st|nd|rd|th/,n=(t=t.toString()).match(e);t=t.replace(e,"");var r=o.f[t];if(!r)throw new Error("Undefined number: ".concat(t));return n?"第".concat(r):r}},352:function(t,e,n){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",c="week",o="month",d="quarter",l="year",f="date",h="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},w=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:w,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+w(r,2,"0")+":"+w(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,o),s=n-i<0,u=e.clone().add(r+(s?-1:1),o);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:l,w:c,d:a,D:f,h:u,m:s,s:i,ms:r,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",$={};$[y]=_;var p=function(t){return t instanceof M},x=function t(e,n,r){var i;if(!e)return y;if("string"==typeof e){var s=e.toLowerCase();$[s]&&(i=s),n&&($[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;$[a]=e,i=a}return!r&&i&&(y=i),i||!r&&y},A=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new M(n)},O=g;O.l=x,O.i=p,O.w=function(t,e){return A(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var M=function(){function _(t){this.$L=x(t.locale,null,!0),this.parse(t)}var w=_.prototype;return w.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(m);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},w.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},w.$utils=function(){return O},w.isValid=function(){return!(this.$d.toString()===h)},w.isSame=function(t,e){var n=A(t);return this.startOf(e)<=n&&n<=this.endOf(e)},w.isAfter=function(t,e){return A(t)<this.startOf(e)},w.isBefore=function(t,e){return this.endOf(e)<A(t)},w.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},w.unix=function(){return Math.floor(this.valueOf()/1e3)},w.valueOf=function(){return this.$d.getTime()},w.startOf=function(t,e){var n=this,r=!!O.u(e)||e,d=O.p(t),h=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},m=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,_=this.$M,w=this.$D,g="set"+(this.$u?"UTC":"");switch(d){case l:return r?h(1,0):h(31,11);case o:return r?h(1,_):h(0,_+1);case c:var y=this.$locale().weekStart||0,$=(v<y?v+7:v)-y;return h(r?w-$:w+(6-$),_);case a:case f:return m(g+"Hours",0);case u:return m(g+"Minutes",1);case s:return m(g+"Seconds",2);case i:return m(g+"Milliseconds",3);default:return this.clone()}},w.endOf=function(t){return this.startOf(t,!1)},w.$set=function(t,e){var n,c=O.p(t),d="set"+(this.$u?"UTC":""),h=(n={},n[a]=d+"Date",n[f]=d+"Date",n[o]=d+"Month",n[l]=d+"FullYear",n[u]=d+"Hours",n[s]=d+"Minutes",n[i]=d+"Seconds",n[r]=d+"Milliseconds",n)[c],m=c===a?this.$D+(e-this.$W):e;if(c===o||c===l){var v=this.clone().set(f,1);v.$d[h](m),v.init(),this.$d=v.set(f,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},w.set=function(t,e){return this.clone().$set(t,e)},w.get=function(t){return this[O.p(t)]()},w.add=function(r,d){var f,h=this;r=Number(r);var m=O.p(d),v=function(t){var e=A(h);return O.w(e.date(e.date()+Math.round(t*r)),h)};if(m===o)return this.set(o,this.$M+r);if(m===l)return this.set(l,this.$y+r);if(m===a)return v(1);if(m===c)return v(7);var _=(f={},f[s]=e,f[u]=n,f[i]=t,f)[m]||1,w=this.$d.getTime()+r*_;return O.w(w,this)},w.subtract=function(t,e){return this.add(-1*t,e)},w.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,c=n.weekdays,o=n.months,d=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},l=function(t){return O.s(s%12||12,t,"0")},f=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:d(n.monthsShort,a,o,3),MMMM:d(o,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,c,2),ddd:d(n.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(s),HH:O.s(s,2,"0"),h:l(1),hh:l(2),a:f(s,u,!0),A:f(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(v,(function(t,e){return e||m[t]||i.replace(":","")}))},w.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},w.diff=function(r,f,h){var m,v=O.p(f),_=A(r),w=(_.utcOffset()-this.utcOffset())*e,g=this-_,y=O.m(this,_);return y=(m={},m[l]=y/12,m[o]=y,m[d]=y/3,m[c]=(g-w)/6048e5,m[a]=(g-w)/864e5,m[u]=g/n,m[s]=g/e,m[i]=g/t,m)[v]||g,h?y:O.a(y)},w.daysInMonth=function(){return this.endOf(o).$D},w.$locale=function(){return $[this.$L]},w.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=x(t,e,!0);return r&&(n.$L=r),n},w.clone=function(){return O.w(this.$d,this)},w.toDate=function(){return new Date(this.valueOf())},w.toJSON=function(){return this.isValid()?this.toISOString():null},w.toISOString=function(){return this.$d.toISOString()},w.toString=function(){return this.$d.toUTCString()},_}(),C=M.prototype;return A.prototype=C,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",o],["$y",l],["$D",f]].forEach((function(t){C[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),A.extend=function(t,e){return t.$i||(t(e,M,A),t.$i=!0),A},A.locale=x,A.isDayjs=p,A.unix=function(t){return A(1e3*t)},A.en=$[y],A.Ls=$,A.p={},A}()},353:function(t,e,n){var content=n(362);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("55cd804b",content,!0,{sourceMap:!1})},356:function(t,e,n){var content=n(375);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("178f4f2c",content,!0,{sourceMap:!1})},361:function(t,e,n){"use strict";n(353)},362:function(t,e,n){var r=n(44)(!1);r.push([t.i,".districtText[data-v-0f3954be]{color:#00000f;text-decoration:none}.districtText--multiEle .districtText__name[data-v-0f3954be],.districtText--multiEle .districtText__town[data-v-0f3954be]{text-decoration:underline}.districtText--active[data-v-0f3954be]{color:#49b0d5;-webkit-text-decoration-color:#49b0d5;text-decoration-color:#49b0d5}.districtText__square[data-v-0f3954be]{background-color:#49b0d5;height:.625rem;width:.625rem}.districtText__town--active[data-v-0f3954be]{color:#49b0d5;-webkit-text-decoration-color:#49b0d5;text-decoration-color:#49b0d5}",""]),t.exports=r},365:function(t,e,n){var content=n(389);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("3b031ede",content,!0,{sourceMap:!1})},366:function(t,e,n){var content=n(391);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("1d4f393c",content,!0,{sourceMap:!1})},367:function(t,e,n){var content=n(393);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("31d9bb46",content,!0,{sourceMap:!1})},370:function(t,e,n){"use strict";n.r(e);var r=n(20);n(62),n(235),n(36),n(34),n(42),n(14),n(50),n(35),n(51);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function o(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={props:{district:{type:Object,required:!0},isSingleElement:{type:Boolean,default:!1},activeArea:{default:null,validator:function(area){return!area||["district","town"].includes(area.type)&&area.id}},isQuotaVisible:{type:Boolean,default:!1}},data:function(){return{localActiveArea:this.activeArea}},computed:{isDistrictActive:function(){var t=this.activeArea;return t&&"district"===t.type&&t.id===this.district.districtId},townLabelList:function(){var t=this.district.townList,e=t[t.length-1];return e.endsWith("區")||(t[t.length-1]="".concat(e,"區")),t}},watch:{activeArea:function(t){(t||this.localActiveArea)&&(t?this.localActiveArea&&t.type===this.localActiveArea.type&&t.id===this.localActiveArea.id||(this.localActiveArea=o({},t)):this.localActiveArea=null)}},methods:{isTownActive:function(t){var e=this.activeArea;return t=t.endsWith("區")?t:"".concat(t,"區"),e&&"town"===e.type&&e.id===t},activateArea:function(t,e){"town"===t&&(e=e.endsWith("區")?e:"".concat(e,"區")),this.localActiveArea={type:t,id:e},this.$emit("update:activeArea",this.localActiveArea)},deactivateArea:function(){this.localActiveArea=null,this.$emit("update:activeArea",null)}}},l=(n(361),n(32)),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"districtText fw3 f6",class:{"districtText--multiEle":!t.isSingleElement,"districtText--active":t.isDistrictActive}},[n("div",{staticClass:"districtText__square dn dib-ns mr1"}),n("div",{staticClass:"districtText__name db di-ns mr2",on:{mouseover:function(e){return t.activateArea("district",t.district.districtId)},mouseleave:t.deactivateArea}},[n("div",{staticClass:"di f5 f6-ns"},[t._v(t._s(t.district.districtTitle))]),t.isQuotaVisible?n("div",{staticClass:"f7 di ml4"},[t._v(t._s(t.district.districtQuota)+" 席")]):t._e()]),n("div",{staticClass:"db di-ns mt3 mt0-l"},[t.isSingleElement?n("span",[t._v(t._s(t.townLabelList.join(".")))]):t._l(t.townLabelList,(function(e){return n("span",{key:e,staticClass:"districtText__town mr1",class:{"districtText__town--active":t.isTownActive(e)},on:{mouseover:function(n){return t.activateArea("town",e)},mouseleave:t.deactivateArea}},[t._v(t._s(e))])}))],2)])}),[],!1,null,"0f3954be",null);e.default=component.exports},374:function(t,e,n){"use strict";n(356)},375:function(t,e,n){var r=n(44)(!1);r.push([t.i,'.ccc[data-v-2a1ca7e7]{border:1px solid #d8d8d8;border-top:8px solid #8dee72}.ccc__areaList span+span[data-v-2a1ca7e7]:before{content:"."}.ccc__councilorList[data-v-2a1ca7e7]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:1.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem;grid-row-gap:.5rem;row-gap:.5rem;justify-content:space-between}.ccc__councilorList--1[data-v-2a1ca7e7]{grid-template-columns:1fr}.ccc--minified[data-v-2a1ca7e7]{border-top:1px solid #d8d8d8}@media(hover:hover){.ccc--minified .ccc__councilorList[data-v-2a1ca7e7]{display:none;margin-top:0}.ccc--minified:hover .ccc__areaList[data-v-2a1ca7e7],.ccc--minified:hover .ccc__constituency[data-v-2a1ca7e7]{display:none}.ccc--minified:hover .ccc__councilorList[data-v-2a1ca7e7]{display:grid}}.councilor[data-v-2a1ca7e7]{color:#00000f;text-decoration:none}@media screen and (min-width:60em){.councilor[data-v-2a1ca7e7]{text-decoration:underline}}',""]),t.exports=r},384:function(t,e,n){"use strict";n.r(e);var r={props:{data:{type:Object,required:!0},minified:{type:Boolean,default:!1},round:{type:String,required:!0}},computed:{},methods:{councilorLink:function(t){return{name:"round-councilor-councilor",params:{round:this.round,councilor:t.id}}}}},c=(n(374),n(32)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ccc br1 pa3",class:{"ccc--minified":t.minified}},[n("div",{staticClass:"ccc__constituency fw5 f4"},[t._v(t._s(t.data.districtTitle))]),n("div",{staticClass:"ccc__areaList fw5 mt2"},t._l(t.data.townList,(function(area){return n("span",{key:area},[t._v(t._s(area))])})),0),n("div",{staticClass:"ccc__councilorList mt3",class:["ccc__councilorList--"+t.data.councilors.length]},t._l(t.data.councilors,(function(e){return n("nuxt-link",{key:e.id,staticClass:"councilor f5 f7-l",attrs:{to:t.councilorLink(e)}},[n("span",[t._v(t._s(e.name)+"  /  ")]),n("span",[t._v(t._s(e.party))])])})),1)])}),[],!1,null,"2a1ca7e7",null);e.default=component.exports},388:function(t,e,n){"use strict";n(365)},389:function(t,e,n){var r=n(44)(!1);r.push([t.i,'.tcwTitle[data-v-6ff7cedc]{position:relative;margin:3rem 0 1rem}@media screen and (min-width:60em){.tcwTitle[data-v-6ff7cedc]{margin:10rem 0 2.5rem}}.tcwTitle[data-v-6ff7cedc]:before{content:" ";height:0;position:absolute;left:0;right:0;top:50%;border:1px solid #7a7c7d}',""]),t.exports=r},390:function(t,e,n){"use strict";n(366)},391:function(t,e,n){var r=n(44)(!1);r.push([t.i,"@media screen and (min-width:60em){.districtLanding[data-v-4cebcdaa]{display:grid;grid-template-columns:20rem 1fr;align-items:center}}@media screen and (min-width:30em)and (max-width:60em){.districtLanding__list[data-v-4cebcdaa]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:2rem;-moz-column-gap:2rem;column-gap:2rem;grid-row-gap:1rem;row-gap:1rem}}@media screen and (min-width:30em)and (max-width:60em){.districtLanding__map[data-v-4cebcdaa]{max-width:50vh;margin:2rem auto 0}}.district+.district[data-v-4cebcdaa]{margin-top:.5rem}@media screen and (min-width:30em)and (max-width:60em){.district+.district[data-v-4cebcdaa]{margin:0}}@media screen and (min-width:60em){.district+.district[data-v-4cebcdaa]{margin-top:1.25rem}}.district__card[data-v-4cebcdaa]{border:1px solid #d8d8d8;border-top:6px solid #8dee72}",""]),t.exports=r},392:function(t,e,n){"use strict";n(367)},393:function(t,e,n){var r=n(44)(!1);r.push([t.i,".ccl__toggle[data-v-5d5cf892]{border:1px solid #8dee72;background:none}.ccl__ccc[data-v-5d5cf892]{margin-bottom:.75rem}@media screen and (min-width:60em){.ccl__list[data-v-5d5cf892]{display:grid;grid-template-columns:repeat(4,1fr);grid-column-gap:1rem;-moz-column-gap:1rem;column-gap:1rem;grid-row-gap:1.5rem;row-gap:1.5rem;align-items:stretch}}.ccl--minified .ccl__ccc[data-v-5d5cf892]{margin:0}",""]),t.exports=r},401:function(t,e,n){"use strict";n.r(e);var r={props:{level:{type:String,default:"h1"},id:{type:String,default:""}}},c=(n(388),n(32)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.level,{tag:"component",staticClass:"tcwTitle f3 f2-l fw5",attrs:{id:t.id}},[n("div",{staticClass:"relative bg-white pr3 dib"},[t._t("default")],2)])}),[],!1,null,"6ff7cedc",null);e.default=component.exports},402:function(t,e,n){"use strict";n.r(e);n(235),n(76),n(62),n(79),n(52);var r=n(360),defs=n(126),c={props:{map:{type:Object,required:!0},round:{type:String,required:!0},target:{type:String,default:""}},data:function(){return{focusedArea:null,isFocusedAreaDirty:!1}},computed:{districtList:function(){return defs.c}},methods:{mouseoverTown:function(t){t.endsWith("區")||(t="".concat(t,"區")),this.setFocusedArea("town",t)},mouseleaveTown:function(){this.resetFocusedArea()},mouseoverDistrict:Object(r.debounce)((function(t){this.setFocusedArea("district",Object(defs.g)(t))}),100),mouseleaveDistrict:function(){this.resetFocusedArea()},setFocusedArea:function(t,e){this.isFocusedAreaDirty=!1,this.focusedArea={type:t,id:e}},resetFocusedArea:function(){var t=this;this.isFocusedAreaDirty=!0,setTimeout((function(){t.isFocusedAreaDirty&&t.focusedArea&&(t.focusedArea=null)}),200)},isDistrictActive:function(t){return this.focusedArea&&"district"===this.focusedArea.type&&this.focusedArea.id.includes(t)},isTownActive:function(t){return this.focusedArea&&"town"===this.focusedArea.type&&this.focusedArea.id.includes(t)},districtLink:function(t){return{name:"round-district-district",params:{round:this.round,district:Object(defs.g)(t)}}},districtId:function(t){return"district-".concat(t)},districtMeta:function(t){return this.map[Object(defs.g)(t)]}}},o=(n(390),n(32)),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"districtLanding"},[n("div",{staticClass:"districtLanding__list"},t._l(t.districtList,(function(e){return n("div",{staticClass:"district"},[n("nuxt-link",{staticClass:"district__card db dn-ns pa3",attrs:{to:t.districtLink(e),id:t.districtId(e)}},[n("district-text",{attrs:{district:t.districtMeta(e),"active-area":t.focusedArea,"is-single-element":!0,"is-quota-visible":!0},on:{"update:activeArea":function(e){t.focusedArea=e},"update:active-area":function(e){t.focusedArea=e}}})],1),n("nuxt-link",{staticClass:"district__interact dn db-ns",attrs:{to:t.districtLink(e),id:t.districtId(e)}},[n("district-text",{attrs:{district:t.districtMeta(e),"active-area":t.focusedArea},on:{"update:activeArea":function(e){t.focusedArea=e},"update:active-area":function(e){t.focusedArea=e}}})],1),t.target&&t.target===e?n("div",{staticClass:"db dn-ns"},[t._t("default")],2):t._e()],1)})),0),n("div",{staticClass:"districtLanding__map dn db-ns"},[n("district-map",{attrs:{map:t.map,focus:t.focusedArea},on:{"hover-town":t.mouseoverTown,"out-town":t.mouseleaveTown,"hover-district":t.mouseoverDistrict,"out-district":t.mouseleaveDistrict}})],1)])}),[],!1,null,"4cebcdaa",null);e.default=component.exports;installComponents(component,{DistrictText:n(370).default,DistrictMap:n(422).default})},403:function(t,e,n){"use strict";n.r(e);var defs=n(126),r={props:{map:{type:Object,required:!0},round:{type:String,required:!0},minified:{type:Boolean,default:!1}},data:function(){return{isOpened:!this.minified}},computed:{consList:function(){return defs.b}},watch:{$route:function(){this.closeList()}},methods:{toggleList:function(){this.isOpened=!this.isOpened},closeList:function(){this.isOpened=!1}}},c=(n(392),n(32)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ccl",class:{"ccl--minified":t.minified}},[t.minified?n("button",{staticClass:"ccl__toggle pointer flex items-center justify-between pa2 mb3 w-100 db dn-l",on:{click:t.toggleList}},[n("span",[t._v("查看選區議員")]),n("i",{directives:[{name:"show",rawName:"v-show",value:!t.isOpened,expression:"!isOpened"}],staticClass:"fa-solid fa-chevron-down"}),n("i",{directives:[{name:"show",rawName:"v-show",value:t.isOpened,expression:"isOpened"}],staticClass:"fa-solid fa-chevron-up"})]):t._e(),n("div",{staticClass:"db-l",class:{dn:!t.isOpened}},[n("div",{staticClass:"ccl__list"},t._l(t.consList,(function(e){return n("div",{key:e,staticClass:"ccl__ccc"},[n("con-con-card",{staticClass:"h-100-l",attrs:{data:t.map[e],round:t.round,minified:t.minified}})],1)})),0)])])}),[],!1,null,"5d5cf892",null);e.default=component.exports;installComponents(component,{ConConCard:n(384).default})},445:function(t,e,n){var content=n(524);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("672357d8",content,!0,{sourceMap:!1})},523:function(t,e,n){"use strict";n(445)},524:function(t,e,n){var r=n(44)(!1);r.push([t.i,".landing__header[data-v-045d327e]{height:calc(100vh - 14rem);max-height:40vh}@media screen and (min-width:60em){.landing__header[data-v-045d327e]{max-height:35vw}}.landing__navLinks a[data-v-045d327e]{color:#49b0d5;text-decoration:none}",""]),t.exports=r},554:function(t,e,n){"use strict";n.r(e);var r=n(12),c=(n(33),n(158),n(63),n(360)),o=n(351),defs=n(126),d={asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,c,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.params,t.redirect,c=r.round||defs.a,e.next=4,n("council",c,"district-map").fetch();case 4:return o=e.sent,e.abrupt("return",{consMap:o,round:c});case 6:case"end":return e.stop()}}),e)})))()},computed:{navLinks:function(){return defs.e}},methods:{genNavLink:function(link){return"搜質詢"!==link.label?"#".concat(link.label):link.route(this.round)},handleNavClick:function(t){var e=Object(c.get)(t,"target.attributes.href.value","").split("#");if(!(e.length<=1)){var n=decodeURIComponent(e[1]),r=this.$refs[n];r&&(Object(o.c)(r.$el),t.preventDefault())}}}},l=(n(523),n(32)),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"landing mw8 ph3 center"},[n("div",{staticClass:"landing__entry mt5"},[t._m(0),n("div",{staticClass:"landing__navLinks flex justify-between mw6 center mt4 mt5-l"},t._l(t.navLinks,(function(link){return n("nuxt-link",{key:link.label,staticClass:"f4 f3-l",attrs:{to:t.genNavLink(link)},nativeOn:{click:function(e){return t.handleNavClick.apply(null,arguments)}}},[t._v(t._s(link.label))])})),1)]),n("tcw-title",{ref:"看選區",attrs:{level:"h2",id:"看選區"}},[t._v("看選區")]),n("div",{staticClass:"mt5 mt3-l"},[n("district-landing",{attrs:{map:t.consMap,round:t.round}})],1),n("tcw-title",{ref:"找議員",attrs:{level:"h2",id:"找議員"}},[t._v("找議員")]),n("div",{staticClass:"mt5 mt3-l"},[n("con-con-landing",{attrs:{map:t.consMap,round:t.round}})],1),n("tcw-title",{ref:"讀分析",attrs:{level:"h2",id:"讀分析"}},[t._v("讀分析")]),n("div",{staticClass:"pa3 bg-moon-gray h3 pa4 flex items-center justify-center mt5 mt3-l w-100"},[t._v("施工中")])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"landing__header relative flex items-center justify-center"},[n("div",{staticClass:"absolute top-0 left-0 w4 h4 bw2 bl bt b--light-yellow"}),n("div",{staticClass:"absolute bottom-0 right-0 w4 h4 bw2 bb br b--light-yellow"}),n("h1",{staticClass:"f2 f1-l fw5"},[t._v("台南市議會觀測站")])])}],!1,null,"045d327e",null);e.default=component.exports;installComponents(component,{TcwTitle:n(401).default,DistrictLanding:n(402).default,ConConLanding:n(403).default})}}]);