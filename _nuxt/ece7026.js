(window.webpackJsonp=window.webpackJsonp||[]).push([[6,16,20,26,28,29],{368:function(t,e,n){"use strict";n.d(e,"e",(function(){return l})),n.d(e,"b",(function(){return m})),n.d(e,"a",(function(){return h})),n.d(e,"d",(function(){return v})),n.d(e,"c",(function(){return y}));n(14),n(32),n(128),n(240),n(241),n(63),n(97),n(36),n(243),n(79);var r=n(369),o=n.n(r),c=n(96),f=n(370),d=f.a.reduce((function(t,e){return t[e.abbr||e.name]=e,t}),{});function l(t){var e=t.join(".");return e.endsWith("區")||(e+="區"),e}function m(t){if(t){if(t.name&&t.avatar)return t;var e=d[t];if(e||(e=f.a.find((function(p){return p.name===t}))),!e)throw new Error("Undefined party: ".concat(t));return e}}function h(t){return o()(t).format("YYYY.MM.DD")}function v(t){if(t){var e=t.offsetTop-c.e;setTimeout((function(){window.scrollTo({top:e,behavior:"smooth"})}))}}function y(t){var e=/st|nd|rd|th/,n=(t=t.toString()).match(e);t=t.replace(e,"");var r=c.g[t];if(!r)throw new Error("Undefined number: ".concat(t));return n?"第".concat(r):r}},369:function(t,e,n){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",d="year",l="date",m="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,y={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:d,w:o,d:a,D:l,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},_="en",w={};w[_]=y;var p=function(t){return t instanceof C},M=function t(e,n,r){var i;if(!e)return _;if("string"==typeof e){var s=e.toLowerCase();w[s]&&(i=s),n&&(w[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;w[a]=e,i=a}return!r&&i&&(_=i),i||!r&&_},x=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new C(n)},S=g;S.l=M,S.i=p,S.w=function(t,e){return x(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var C=function(){function y(t){this.$L=M(t.locale,null,!0),this.parse(t)}var $=y.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return S},$.isValid=function(){return!(this.$d.toString()===m)},$.isSame=function(t,e){var n=x(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return x(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<x(t)},$.$g=function(t,e,n){return S.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,e){var n=this,r=!!S.u(e)||e,f=S.p(t),m=function(t,e){var i=S.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},h=function(t,e){return S.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,y=this.$M,$=this.$D,g="set"+(this.$u?"UTC":"");switch(f){case d:return r?m(1,0):m(31,11);case c:return r?m(1,y):m(0,y+1);case o:var _=this.$locale().weekStart||0,w=(v<_?v+7:v)-_;return m(r?$-w:$+(6-w),y);case a:case l:return h(g+"Hours",0);case u:return h(g+"Minutes",1);case s:return h(g+"Seconds",2);case i:return h(g+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(t,e){var n,o=S.p(t),f="set"+(this.$u?"UTC":""),m=(n={},n[a]=f+"Date",n[l]=f+"Date",n[c]=f+"Month",n[d]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],h=o===a?this.$D+(e-this.$W):e;if(o===c||o===d){var v=this.clone().set(l,1);v.$d[m](h),v.init(),this.$d=v.set(l,Math.min(this.$D,v.daysInMonth())).$d}else m&&this.$d[m](h);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[S.p(t)]()},$.add=function(r,f){var l,m=this;r=Number(r);var h=S.p(f),v=function(t){var e=x(m);return S.w(e.date(e.date()+Math.round(t*r)),m)};if(h===c)return this.set(c,this.$M+r);if(h===d)return this.set(d,this.$y+r);if(h===a)return v(1);if(h===o)return v(7);var y=(l={},l[s]=e,l[u]=n,l[i]=t,l)[h]||1,$=this.$d.getTime()+r*y;return S.w($,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||m;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=S.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return S.s(s%12||12,t,"0")},l=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:S.s(a+1,2,"0"),MMM:f(n.monthsShort,a,c,3),MMMM:f(c,a),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:f(n.weekdaysMin,this.$W,o,2),ddd:f(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:S.s(s,2,"0"),h:d(1),hh:d(2),a:l(s,u,!0),A:l(s,u,!1),m:String(u),mm:S.s(u,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:i};return r.replace(v,(function(t,e){return e||h[t]||i.replace(":","")}))},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(r,l,m){var h,v=S.p(l),y=x(r),$=(y.utcOffset()-this.utcOffset())*e,g=this-y,_=S.m(this,y);return _=(h={},h[d]=_/12,h[c]=_,h[f]=_/3,h[o]=(g-$)/6048e5,h[a]=(g-$)/864e5,h[u]=g/n,h[s]=g/e,h[i]=g/t,h)[v]||g,m?_:S.a(_)},$.daysInMonth=function(){return this.endOf(c).$D},$.$locale=function(){return w[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=M(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return S.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},y}(),D=C.prototype;return x.prototype=D,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",d],["$D",l]].forEach((function(t){D[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),x.extend=function(t,e){return t.$i||(t(e,C,x),t.$i=!0),x},x.locale=M,x.isDayjs=p,x.unix=function(t){return x(1e3*t)},x.en=w[_],x.Ls=w,x.p={},x}()},370:function(t){t.exports=JSON.parse('{"a":[{"name":"中國國民黨","abbr":"國民黨","avatar":"/content-img/party-國.png"},{"name":"民主進步黨","abbr":"民進黨","avatar":"/content-img/party-民.png"},{"name":"台灣團結聯盟","avatar":"/content-img/party-台.png"},{"name":"無黨籍","avatar":"/content-img/party-無.png"},{"name":"台灣基進","avatar":"/content-img/party-基.png"},{"name":"時代力量","avatar":"/content-img/party-時.png"},{"name":"新黨","avatar":"/content-img/party-新.png"},{"name":"台灣民眾黨","avatar":"/content-img/party-眾.png"},{"name":"綠黨","avatar":"/content-img/party-綠.png"}]}')},372:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return c}));var r=n(368),o={props:{party:{type:[String,Object],required:!0}},computed:{meta:function(){return Object(r.b)(this.party)}}},c={beforeDestroy:function(){var html=document.querySelector("html");html.classList.contains("is-clipped-touch")&&html.classList.remove("is-clipped-touch")}}},374:function(t,e,n){var content=n(385);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("26446e9a",content,!0,{sourceMap:!1})},384:function(t,e,n){"use strict";n(374)},385:function(t,e,n){var r=n(33)(!1);r.push([t.i,".partyIcon[data-v-21cfc20d]{height:calc(1em + .25rem);width:calc(1em + .25rem);-o-object-fit:contain;object-fit:contain;border-radius:100%}",""]),t.exports=r},386:function(t,e,n){"use strict";n.r(e);var r={mixins:[n(372).b]},o=(n(384),n(27)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("img",{staticClass:"partyIcon",attrs:{src:t.meta.avatar,alt:t.meta.name}})}),[],!1,null,"21cfc20d",null);e.default=component.exports},389:function(t,e,n){var content=n(415);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("3b7e64c5",content,!0,{sourceMap:!1})},414:function(t,e,n){"use strict";n(389)},415:function(t,e,n){var r=n(33)(!1);r.push([t.i,".partyLabel[data-v-0fc70bf4]{letter-spacing:.083em}",""]),t.exports=r},424:function(t,e,n){var content=n(460);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("05331742",content,!0,{sourceMap:!1})},425:function(t,e,n){"use strict";n.r(e);var r={mixins:[n(372).b]},o=(n(414),n(27)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"partyLabel flex items-center"},[n("party-icon",{staticClass:"mr2",attrs:{party:t.meta}}),n("div",{staticClass:"nowrap"},[t._v(t._s(t.meta.name))])],1)}),[],!1,null,"0fc70bf4",null);e.default=component.exports;installComponents(component,{PartyIcon:n(386).default})},434:function(t,e,n){"use strict";n.r(e);n(14),n(32);var r=n(458).departmentBrief.reduce((function(t,e){return t[e.abbr]=e.brief,t}),{}),o={props:{stats:{type:Object,required:!0},plainText:{type:Boolean,default:!1},to:{type:[Object,String],default:""}},computed:{brief:function(){return r[this.stats.name]}}},c=(n(459),n(27)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nuxt-link",{staticClass:"orgTag flex items-center justify-between mw-100 pointer relative",class:{"orgTag--plain":t.plainText},attrs:{to:t.to}},[n("div",{staticClass:"orgTag__label underline ls2 truncate"},[t._v(t._s(t.stats.name)+" "+t._s(t.stats.count))]),!t.plainText&&t.brief?n("b-tooltip",{staticClass:"flex-none",attrs:{label:t.brief,type:"is-white",square:!0,multilined:!0,triggers:["focus","hover"]}},[n("button",{staticClass:"plainButton flex items-center justify-center",attrs:{tabindex:"-1"},on:{click:function(t){t.stopPropagation(),t.preventDefault()}}},[n("tcw-icon",{staticClass:"orgTag__info",attrs:{icon:"info-black"}}),n("tcw-icon",{staticClass:"orgTag__info orgTag__info--hover",attrs:{icon:"info-blue"}})],1)]):t._e()],1)}),[],!1,null,"a1227378",null);e.default=component.exports;installComponents(component,{TcwIcon:n(242).default})},458:function(t){t.exports=JSON.parse('{"departmentBrief":[{"abbr":"都發局","brief":"都市發展局"},{"abbr":"原民會","brief":"原住民族事務委員會，2020年10月成立"},{"brief":"客家事務委員會","abbr":"客委會"},{"abbr":"新聞處","brief":"新聞及國際關係處"},{"abbr":"研考會","brief":"研究發展考核委員會"},{"abbr":"經發局","brief":"經濟發展局"},{"abbr":"觀旅局","brief":"觀光旅遊局"},{"abbr":"環保局","brief":"環境保護局"},{"abbr":"財稅局","brief":"財政稅務局"},{"abbr":"災防辦","brief":"災害防救辦公室"},{"abbr":"工策會","brief":"工商發展投資策進會"}]}')},459:function(t,e,n){"use strict";n(424)},460:function(t,e,n){var r=n(33)(!1);r.push([t.i,".orgTag[data-v-a1227378]{border:1px solid #d8d8d8;border-top:4px solid #49b0d5;height:3.5rem;padding:0 1.25rem;min-width:0}.orgTag--plain[data-v-a1227378]{border:none;height:auto;padding:0;text-decoration:underline}.orgTag__info[data-v-a1227378]{display:block;font-size:1.25rem}.orgTag__info--hover[data-v-a1227378]{display:none}.orgTag[data-v-a1227378]:hover{color:#49b0d5;font-weight:400}.orgTag:hover .orgTag__info[data-v-a1227378]{display:none}.orgTag:hover .orgTag__info--hover[data-v-a1227378]{display:block}.orgTag .plainButton[data-v-a1227378]{position:absolute;right:-1rem;top:-1.625rem;width:3.25rem;height:3.25rem}.orgTag[data-v-a1227378]  .tooltip-content{text-align:left}",""]),t.exports=r},491:function(t,e,n){var content=n(589);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("74ea4a2e",content,!0,{sourceMap:!1})},500:function(t,e,n){"use strict";n.r(e);var r={props:{person:{type:Object,required:!0},relatedOrgStats:{type:Array,required:!0},round:{type:String,required:!0}},computed:{councilorLink:function(){return{name:"round-councilor-councilor",params:{round:this.round,councilor:this.person.id}}}},methods:{interpellationLink:function(t,e){return{name:"round-councilor-councilor",params:{round:this.round,councilor:this.person.id},query:{catType:t,catValue:e}}}}},o=(n(588),n(27)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"counCard"},[n("nuxt-link",{staticClass:"counCard__main",attrs:{to:t.councilorLink}},[n("div",{staticClass:"aspect-ratio aspect-ratio--1x1"},[n("div",{staticClass:"aspect-ratio--object br-100 overflow-hidden"},[n("img",{attrs:{src:t.person.bgUrl,alt:t.person.name}})])]),n("div",[n("div",{staticClass:"f5 f4-l fw5"},[t._v(t._s(t.person.name))]),n("party-label",{staticClass:"f5 f4-l pt2 mt1 mt2-l",attrs:{party:t.person.party}})],1)]),n("div",{staticClass:"counCard__statsList"},[n("div",{staticClass:"f4 mb2 ls3 fw5"},[t._v("質詢相關局處")]),n("div",{staticClass:"flex flex-wrap"},[t.relatedOrgStats.length?t._l(t.relatedOrgStats,(function(e){return n("org-stats-tag",{key:e.name,attrs:{stats:e,"plain-text":!0,to:t.interpellationLink("org",e.name)}})})):n("span",[t._v("尚無質詢")])],2)])],1)}),[],!1,null,"090f4042",null);e.default=component.exports;installComponents(component,{PartyLabel:n(425).default,OrgStatsTag:n(434).default})},588:function(t,e,n){"use strict";n(491)},589:function(t,e,n){var r=n(33)(!1);r.push([t.i,".counCard[data-v-090f4042]{border:1px solid #d8d8d8;border-top:8px solid #8dee72;padding:2.25rem .5rem}.counCard__main[data-v-090f4042]{padding:0 .75rem 1.5rem;margin-bottom:1rem;border-bottom:1px solid #d8d8d8;display:grid;grid-template-columns:6rem 1fr;grid-column-gap:1.5rem;-moz-column-gap:1.5rem;column-gap:1.5rem;align-items:center;color:#00000f}.counCard__main img[data-v-090f4042]{-o-object-fit:cover;object-fit:cover;height:100%;width:100%}.counCard__statsList[data-v-090f4042]{padding:0 .75rem}.counCard__statsList .orgTag[data-v-090f4042]{margin-right:1.5rem;margin-bottom:.75rem}@media screen and (min-width:60em){.counCard[data-v-090f4042]{padding:2.5rem 1.5rem}.counCard__main[data-v-090f4042]{padding:0 .75rem 3rem;margin-bottom:1.5rem;grid-column-gap:2.5rem;-moz-column-gap:2.5rem;column-gap:2.5rem;grid-template-columns:8.5rem 1fr}.counCard__statsList[data-v-090f4042]{padding:0}}",""]),t.exports=r}}]);