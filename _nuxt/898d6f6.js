(window.webpackJsonp=window.webpackJsonp||[]).push([[6,15,17,22,25,27,28],{361:function(t,e,r){"use strict";r.d(e,"e",(function(){return m})),r.d(e,"b",(function(){return f})),r.d(e,"a",(function(){return h})),r.d(e,"d",(function(){return v})),r.d(e,"c",(function(){return _}));r(14),r(32),r(127),r(237),r(238),r(61),r(97),r(35),r(240),r(77);var n=r(362),o=r.n(n),c=r(96),d=r(363),l=d.a.reduce((function(t,e){return t[e.abbr||e.name]=e,t}),{});function m(t){var e=t.join(".");return e.endsWith("區")||(e+="區"),e}function f(t){if(t){if(t.name&&t.avatar)return t;var e=l[t];if(e||(e=d.a.find((function(p){return p.name===t}))),!e)throw new Error("Undefined party: ".concat(t));return e}}function h(t){return o()(t).format("YYYY.MM.DD")}function v(t){if(t){var e=t.offsetTop-c.e;setTimeout((function(){window.scrollTo({top:e,behavior:"smooth"})}))}}function _(t){var e=/st|nd|rd|th/,r=(t=t.toString()).match(e);t=t.replace(e,"");var n=c.g[t];if(!n)throw new Error("Undefined number: ".concat(t));return r?"第".concat(n):n}},362:function(t,e,r){t.exports=function(){"use strict";var t=1e3,e=6e4,r=36e5,n="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",d="quarter",l="year",m="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},y=function(t,e,r){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(r)+t},g={s:y,z:function(t){var e=-t.utcOffset(),r=Math.abs(e),n=Math.floor(r/60),i=r%60;return(e<=0?"+":"-")+y(n,2,"0")+":"+y(i,2,"0")},m:function t(e,r){if(e.date()<r.date())return-t(r,e);var n=12*(r.year()-e.year())+(r.month()-e.month()),i=e.clone().add(n,c),s=r-i<0,u=e.clone().add(n+(s?-1:1),c);return+(-(n+(r-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:l,w:o,d:a,D:m,h:u,m:s,s:i,ms:n,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},S="en",$={};$[S]=_;var p=function(t){return t instanceof C},w=function t(e,r,n){var i;if(!e)return S;if("string"==typeof e){var s=e.toLowerCase();$[s]&&(i=s),r&&($[s]=r,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;$[a]=e,i=a}return!n&&i&&(S=i),i||!n&&S},x=function(t,e){if(p(t))return t.clone();var r="object"==typeof e?e:{};return r.date=t,r.args=arguments,new C(r)},M=g;M.l=w,M.i=p,M.w=function(t,e){return x(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var C=function(){function _(t){this.$L=w(t.locale,null,!0),this.parse(t)}var y=_.prototype;return y.parse=function(t){this.$d=function(t){var e=t.date,r=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(h);if(n){var i=n[2]-1||0,s=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)):new Date(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},y.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},y.$utils=function(){return M},y.isValid=function(){return!(this.$d.toString()===f)},y.isSame=function(t,e){var r=x(t);return this.startOf(e)<=r&&r<=this.endOf(e)},y.isAfter=function(t,e){return x(t)<this.startOf(e)},y.isBefore=function(t,e){return this.endOf(e)<x(t)},y.$g=function(t,e,r){return M.u(t)?this[e]:this.set(r,t)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(t,e){var r=this,n=!!M.u(e)||e,d=M.p(t),f=function(t,e){var i=M.w(r.$u?Date.UTC(r.$y,e,t):new Date(r.$y,e,t),r);return n?i:i.endOf(a)},h=function(t,e){return M.w(r.toDate()[t].apply(r.toDate("s"),(n?[0,0,0,0]:[23,59,59,999]).slice(e)),r)},v=this.$W,_=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(d){case l:return n?f(1,0):f(31,11);case c:return n?f(1,_):f(0,_+1);case o:var S=this.$locale().weekStart||0,$=(v<S?v+7:v)-S;return f(n?y-$:y+(6-$),_);case a:case m:return h(g+"Hours",0);case u:return h(g+"Minutes",1);case s:return h(g+"Seconds",2);case i:return h(g+"Milliseconds",3);default:return this.clone()}},y.endOf=function(t){return this.startOf(t,!1)},y.$set=function(t,e){var r,o=M.p(t),d="set"+(this.$u?"UTC":""),f=(r={},r[a]=d+"Date",r[m]=d+"Date",r[c]=d+"Month",r[l]=d+"FullYear",r[u]=d+"Hours",r[s]=d+"Minutes",r[i]=d+"Seconds",r[n]=d+"Milliseconds",r)[o],h=o===a?this.$D+(e-this.$W):e;if(o===c||o===l){var v=this.clone().set(m,1);v.$d[f](h),v.init(),this.$d=v.set(m,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},y.set=function(t,e){return this.clone().$set(t,e)},y.get=function(t){return this[M.p(t)]()},y.add=function(n,d){var m,f=this;n=Number(n);var h=M.p(d),v=function(t){var e=x(f);return M.w(e.date(e.date()+Math.round(t*n)),f)};if(h===c)return this.set(c,this.$M+n);if(h===l)return this.set(l,this.$y+n);if(h===a)return v(1);if(h===o)return v(7);var _=(m={},m[s]=e,m[u]=r,m[i]=t,m)[h]||1,y=this.$d.getTime()+n*_;return M.w(y,this)},y.subtract=function(t,e){return this.add(-1*t,e)},y.format=function(t){var e=this,r=this.$locale();if(!this.isValid())return r.invalidDate||f;var n=t||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),s=this.$H,u=this.$m,a=this.$M,o=r.weekdays,c=r.months,d=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].slice(0,s)},l=function(t){return M.s(s%12||12,t,"0")},m=r.meridiem||function(t,e,r){var n=t<12?"AM":"PM";return r?n.toLowerCase():n},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:M.s(a+1,2,"0"),MMM:d(r.monthsShort,a,c,3),MMMM:d(c,a),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:d(r.weekdaysMin,this.$W,o,2),ddd:d(r.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:M.s(s,2,"0"),h:l(1),hh:l(2),a:m(s,u,!0),A:m(s,u,!1),m:String(u),mm:M.s(u,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:i};return n.replace(v,(function(t,e){return e||h[t]||i.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(n,m,f){var h,v=M.p(m),_=x(n),y=(_.utcOffset()-this.utcOffset())*e,g=this-_,S=M.m(this,_);return S=(h={},h[l]=S/12,h[c]=S,h[d]=S/3,h[o]=(g-y)/6048e5,h[a]=(g-y)/864e5,h[u]=g/r,h[s]=g/e,h[i]=g/t,h)[v]||g,f?S:M.a(S)},y.daysInMonth=function(){return this.endOf(c).$D},y.$locale=function(){return $[this.$L]},y.locale=function(t,e){if(!t)return this.$L;var r=this.clone(),n=w(t,e,!0);return n&&(r.$L=n),r},y.clone=function(){return M.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},_}(),T=C.prototype;return x.prototype=T,[["$ms",n],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",l],["$D",m]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),x.extend=function(t,e){return t.$i||(t(e,C,x),t.$i=!0),x},x.locale=w,x.isDayjs=p,x.unix=function(t){return x(1e3*t)},x.en=$[S],x.Ls=$,x.p={},x}()},363:function(t){t.exports=JSON.parse('{"a":[{"name":"中國國民黨","abbr":"國民黨","avatar":"/content-img/party-國.png"},{"name":"民主進步黨","abbr":"民進黨","avatar":"/content-img/party-民.png"},{"name":"台灣團結聯盟","avatar":"/content-img/party-台.png"},{"name":"無黨籍","avatar":"/content-img/party-無.png"},{"name":"台灣基進","avatar":"/content-img/party-基.png"},{"name":"時代力量","avatar":"/content-img/party-時.png"},{"name":"新黨","avatar":"/content-img/party-新.png"},{"name":"台灣民眾黨","avatar":"/content-img/party-眾.png"},{"name":"綠黨","avatar":"/content-img/party-綠.png"}]}')},365:function(t,e,r){var content=r(371);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("26446e9a",content,!0,{sourceMap:!1})},366:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(361),o={props:{party:{type:[String,Object],required:!0}},computed:{meta:function(){return Object(n.b)(this.party)}}}},370:function(t,e,r){"use strict";r(365)},371:function(t,e,r){var n=r(33)(!1);n.push([t.i,".partyIcon[data-v-21cfc20d]{height:calc(1em + .25rem);width:calc(1em + .25rem);-o-object-fit:contain;object-fit:contain;border-radius:100%}",""]),t.exports=n},372:function(t,e,r){var content=r(382);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("3b7e64c5",content,!0,{sourceMap:!1})},374:function(t,e,r){"use strict";r.r(e);var n={mixins:[r(366).a]},o=(r(370),r(26)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("img",{staticClass:"partyIcon",attrs:{src:t.meta.avatar,alt:t.meta.name}})}),[],!1,null,"21cfc20d",null);e.default=component.exports},380:function(t,e,r){var content=r(407);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("05331742",content,!0,{sourceMap:!1})},381:function(t,e,r){"use strict";r(372)},382:function(t,e,r){var n=r(33)(!1);n.push([t.i,".partyLabel[data-v-0fc70bf4]{letter-spacing:.083em}",""]),t.exports=n},383:function(t,e,r){"use strict";r.r(e);var n={mixins:[r(366).a]},o=(r(381),r(26)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"partyLabel flex items-center"},[r("party-icon",{staticClass:"mr2",attrs:{party:t.meta}}),r("div",{staticClass:"nowrap"},[t._v(t._s(t.meta.name))])],1)}),[],!1,null,"0fc70bf4",null);e.default=component.exports;installComponents(component,{PartyIcon:r(374).default})},405:function(t){t.exports=JSON.parse('{"departmentBrief":[{"abbr":"工務局","brief":"工務局工務局工務局工務局簡短說明 簡短說明 "},{"abbr":"教育局","brief":"教育局教育局教育局簡短說明 簡短說明 簡短說明 "},{"abbr":"文化局","brief":"文化局文化局文化局簡短說明 簡短說明 "}]}')},406:function(t,e,r){"use strict";r(380)},407:function(t,e,r){var n=r(33)(!1);n.push([t.i,".orgTag[data-v-a1227378]{border:1px solid #d8d8d8;border-top:4px solid #49b0d5;height:3.5rem;padding:0 1.25rem;min-width:0}.orgTag--plain[data-v-a1227378]{border:none;height:auto;padding:0;text-decoration:underline}.orgTag__info[data-v-a1227378]{display:block;font-size:1.25rem}.orgTag__info--hover[data-v-a1227378]{display:none}.orgTag[data-v-a1227378]:hover{color:#49b0d5;font-weight:400}.orgTag:hover .orgTag__info[data-v-a1227378]{display:none}.orgTag:hover .orgTag__info--hover[data-v-a1227378]{display:block}.orgTag .plainButton[data-v-a1227378]{position:absolute;right:-1rem;top:-1.625rem;width:3.25rem;height:3.25rem}.orgTag[data-v-a1227378]  .tooltip-content{text-align:left}",""]),t.exports=n},408:function(t,e,r){var content=r(439);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("74ea4a2e",content,!0,{sourceMap:!1})},410:function(t,e,r){"use strict";r.r(e);r(14),r(32);var n=r(405).departmentBrief.reduce((function(t,e){return t[e.abbr]=e.brief,t}),{}),o={props:{stats:{type:Object,required:!0},plainText:{type:Boolean,default:!1},to:{type:[Object,String],default:""}},computed:{brief:function(){return n[this.stats.name]}}},c=(r(406),r(26)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("nuxt-link",{staticClass:"orgTag flex items-center justify-between mw-100 pointer relative",class:{"orgTag--plain":t.plainText},attrs:{to:t.to}},[r("div",{staticClass:"orgTag__label underline ls2 truncate"},[t._v(t._s(t.stats.name)+" "+t._s(t.stats.count))]),!t.plainText&&t.brief?r("b-tooltip",{staticClass:"flex-none",attrs:{label:t.brief,type:"is-white",square:!0,multilined:!0,triggers:["focus","hover"]}},[r("button",{staticClass:"plainButton flex items-center justify-center",attrs:{tabindex:"-1"},on:{click:function(t){t.stopPropagation(),t.preventDefault()}}},[r("tcw-icon",{staticClass:"orgTag__info",attrs:{icon:"info-black"}}),r("tcw-icon",{staticClass:"orgTag__info orgTag__info--hover",attrs:{icon:"info-blue"}})],1)]):t._e()],1)}),[],!1,null,"a1227378",null);e.default=component.exports;installComponents(component,{TcwIcon:r(239).default})},438:function(t,e,r){"use strict";r(408)},439:function(t,e,r){var n=r(33)(!1);n.push([t.i,".counCard[data-v-090f4042]{border:1px solid #d8d8d8;border-top:8px solid #8dee72;padding:2.25rem .5rem}.counCard__main[data-v-090f4042]{padding:0 .75rem 1.5rem;margin-bottom:1rem;border-bottom:1px solid #d8d8d8;display:grid;grid-template-columns:6rem 1fr;grid-column-gap:1.5rem;-moz-column-gap:1.5rem;column-gap:1.5rem;align-items:center;color:#00000f}.counCard__main img[data-v-090f4042]{-o-object-fit:cover;object-fit:cover;height:100%;width:100%}.counCard__statsList[data-v-090f4042]{padding:0 .75rem}.counCard__statsList .orgTag[data-v-090f4042]{margin-right:1.5rem;margin-bottom:.75rem}@media screen and (min-width:60em){.counCard[data-v-090f4042]{padding:2.5rem 1.5rem}.counCard__main[data-v-090f4042]{padding:0 .75rem 3rem;margin-bottom:1.5rem;grid-column-gap:2.5rem;-moz-column-gap:2.5rem;column-gap:2.5rem;grid-template-columns:8.5rem 1fr}.counCard__statsList[data-v-090f4042]{padding:0}}",""]),t.exports=n},469:function(t,e,r){var content=r(566);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("2716f794",content,!0,{sourceMap:!1})},478:function(t,e,r){"use strict";r.r(e);var n={props:{person:{type:Object,required:!0},relatedOrgStats:{type:Array,required:!0},round:{type:String,required:!0}},computed:{councilorLink:function(){return{name:"round-councilor-councilor",params:{round:this.round,councilor:this.person.id}}}},methods:{interpellationLink:function(t,e){return{name:"round-councilor-councilor",params:{round:this.round,councilor:this.person.id},query:{catType:t,catValue:e}}}}},o=(r(438),r(26)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"counCard"},[r("nuxt-link",{staticClass:"counCard__main",attrs:{to:t.councilorLink}},[r("div",{staticClass:"aspect-ratio aspect-ratio--1x1"},[r("div",{staticClass:"aspect-ratio--object br-100 overflow-hidden"},[r("img",{attrs:{src:t.person.bgUrl,alt:t.person.name}})])]),r("div",[r("div",{staticClass:"f5 f4-l fw5"},[t._v(t._s(t.person.name))]),r("party-label",{staticClass:"f5 f4-l pt2 mt1 mt2-l",attrs:{party:t.person.party}})],1)]),r("div",{staticClass:"counCard__statsList"},[r("div",{staticClass:"f4 mb2 ls3 fw5"},[t._v("質詢相關局處")]),r("div",{staticClass:"flex flex-wrap"},[t.relatedOrgStats.length?t._l(t.relatedOrgStats,(function(e){return r("org-stats-tag",{key:e.name,attrs:{stats:e,"plain-text":!0,to:t.interpellationLink("org",e.name)}})})):r("span",[t._v("尚無質詢")])],2)])],1)}),[],!1,null,"090f4042",null);e.default=component.exports;installComponents(component,{PartyLabel:r(383).default,OrgStatsTag:r(410).default})},565:function(t,e,r){"use strict";r(469)},566:function(t,e,r){var n=r(33)(!1);n.push([t.i,".districtSum[data-v-12bb2e8e]{padding:0 .75rem}.districtSum h2[data-v-12bb2e8e]{font-size:1.25rem;letter-spacing:1.66px;margin-top:.75rem}.districtSum h2[data-v-12bb2e8e]:not(:last-child){margin-top:2.25rem}.districtSum__statsList[data-v-12bb2e8e]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:.5rem;-moz-column-gap:.5rem;column-gap:.5rem;grid-row-gap:.5rem;row-gap:.5rem}.districtSum__statsList .orgTag[data-v-12bb2e8e]:nth-child(n+7){display:none}.districtSum__statsList--all .orgTag[data-v-12bb2e8e]:nth-child(n+7){display:flex}.districtSum__statsList--all .districtSum__showMore[data-v-12bb2e8e]{display:none}.districtSum__showMore[data-v-12bb2e8e]{position:absolute;bottom:0;left:0;right:0;border:none;width:100%;padding-top:2rem;font-size:.875rem;color:#11111e;text-decoration:underline;-webkit-text-decoration-color:#11111e;text-decoration-color:#11111e;background:linear-gradient(180deg,rgba(255,255,254,0),#fffffe 50%)}.districtSum__article[data-v-12bb2e8e] {line-height:normal;letter-spacing:1.33px}.districtSum__article[data-v-12bb2e8e]  ul{margin:0;padding:0}.districtSum__article[data-v-12bb2e8e]  ul li{list-style:none;line-height:1.5}@media screen and (min-width:30em){.districtSum[data-v-12bb2e8e]{padding:0;display:grid;grid-template-columns:12rem 1fr;grid-column-gap:2rem;-moz-column-gap:2rem;column-gap:2rem;grid-row-gap:2rem;row-gap:2rem;align-items:flex-start}.districtSum h2[data-v-12bb2e8e]{border-bottom:1px solid #979797;padding-bottom:1rem;margin-top:0;letter-spacing:2.33px;display:inline-block}.districtSum h2[data-v-12bb2e8e]:not(:last-child){margin-top:0}.districtSum__statsList[data-v-12bb2e8e]{grid-template-columns:repeat(3,1fr);grid-column-gap:1.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem;grid-row-gap:1rem;row-gap:1rem}}@media screen and (min-width:60em){.districtSum[data-v-12bb2e8e]{grid-template-columns:13rem 1fr;grid-column-gap:5rem;-moz-column-gap:5rem;column-gap:5rem}.districtSum h2[data-v-12bb2e8e]{font-size:1.75rem;padding-bottom:1.5rem}.districtSum__statsList[data-v-12bb2e8e]{grid-template-columns:repeat(4,1fr)}.districtSum__statsList .orgTag[data-v-12bb2e8e]:nth-child(n+7){display:flex}.districtSum__statsList .orgTag[data-v-12bb2e8e]:nth-child(n+13){display:none}.districtSum__statsList--all .orgTag[data-v-12bb2e8e]:nth-child(n+13){display:flex}}.counSum[data-v-12bb2e8e]{margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid #d8d8d8}.counSum h2[data-v-12bb2e8e]{margin-bottom:1.25rem}@media screen and (min-width:30em){.counSum[data-v-12bb2e8e]{margin-top:3rem;padding-top:3rem}.counSum h2[data-v-12bb2e8e]{margin-bottom:3.5rem}.counSum__list[data-v-12bb2e8e]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:3rem;-moz-column-gap:3rem;column-gap:3rem;grid-row-gap:2rem;row-gap:2rem}}@media screen and (min-width:60em){.counSum__list[data-v-12bb2e8e]{grid-column-gap:6rem;-moz-column-gap:6rem;column-gap:6rem;grid-row-gap:3.5rem;row-gap:3.5rem}}",""]),t.exports=n},583:function(t,e,r){"use strict";r.r(e);var n=r(376),o={props:{meta:{type:Object,required:!0},relatedStats:{type:Object,required:!0},round:{type:String,required:!0}},data:function(){return{isShowingAllStats:!1}},computed:{intro:function(){return this.meta.intro}},methods:{showAllStats:function(){this.isShowingAllStats=!0},orgInterpellationLink:function(t){return{name:"round-interpellation",params:{round:this.round},query:{district:this.meta.districtId,catType:"org",catValue:t}}},councilorStats:function(t){return Object(n.get)(this.relatedStats,"".concat(t.id,".org"),[])}}},c=(r(565),r(26)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"districtSumWrapper"},[r("div",{staticClass:"districtSum"},[t._m(0),r("div",{staticClass:"districtSum__article"},[t.intro.body?r("nuxt-content",{attrs:{document:t.intro}}):r("div",{staticClass:"o-50"},[t._v("待撰寫")])],1),t._m(1),r("div",{staticClass:"districtSum__statsList relative mt3 mt0-ns",class:{"districtSum__statsList--all":t.isShowingAllStats}},[t._l(t.relatedStats.total.org,(function(e){return r("org-stats-tag",{key:e.name,attrs:{stats:e,to:t.orgInterpellationLink(e.name)}})})),r("button",{staticClass:"districtSum__showMore pointer",on:{click:t.showAllStats}},[t._v("顯示所有局處")])],2)]),r("div",{staticClass:"counSum"},[r("h2",{staticClass:"fw5 f3 f2-l ls4 lh-normal"},[t._v("應屆議員")]),r("div",{staticClass:"counSum__list"},t._l(t.meta.councilors,(function(e){return r("councilor-card",{key:e.id,staticClass:"mb2 mb0-ns",attrs:{person:e,round:t.round,"related-org-stats":t.councilorStats(e)}})})),1)])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h2",{staticClass:"f4 f3-ns nowrap"},[t._v("選區情報")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h2",{staticClass:"f4 f3-ns nowrap"},[t._v("質詢相關局處")])])}],!1,null,"12bb2e8e",null);e.default=component.exports;installComponents(component,{OrgStatsTag:r(410).default,CouncilorCard:r(478).default})}}]);