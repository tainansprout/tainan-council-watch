(window.webpackJsonp=window.webpackJsonp||[]).push([[15,13,19],{354:function(t,e,r){var content=r(379);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(49).default)("17f4a63a",content,!0,{sourceMap:!1})},367:function(t,e,r){var content=r(403);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(49).default)("2c1515a6",content,!0,{sourceMap:!1})},368:function(t,e,r){"use strict";r.r(e);var n={props:{stats:{type:Object,required:!0},plainText:{type:Boolean,default:!1}}},o=(r(378),r(43)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"orgTag flex items-center justify-between",class:{"orgTag--plain":t.plainText}},[r("div",{staticClass:"orgTag__label"},[t._v(t._s(t.stats.name)+" "+t._s(t.stats.count))]),r("span",{class:{dn:t.plainText}},[r("i",{staticClass:"fa-solid fa-info-circle"})])])}),[],!1,null,"9e4db270",null);e.default=component.exports},378:function(t,e,r){"use strict";r(354)},379:function(t,e,r){var n=r(48)(!1);n.push([t.i,".orgTag[data-v-9e4db270]{border:1px solid #d8d8d8;border-top:3px solid #49b0d5;height:3.5rem;padding:0 1.25rem}.orgTag--plain[data-v-9e4db270]{border:none;height:auto;padding:0;text-decoration:underline}",""]),t.exports=n},401:function(t,e,r){var content=r(432);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(49).default)("4317bcb2",content,!0,{sourceMap:!1})},402:function(t,e,r){"use strict";r(367)},403:function(t,e,r){var n=r(48)(!1);n.push([t.i,".counCard[data-v-428c57e2]{border:1px solid #d8d8d8;border-top:.5rem solid #8dee72;padding:2rem 1.25rem}@media screen and (min-width:60em){.counCard[data-v-428c57e2]{padding:3rem 1.5rem}}.counCard__main[data-v-428c57e2]{display:grid;grid-template-columns:3fr 4fr;grid-column-gap:4rem;-moz-column-gap:4rem;column-gap:4rem;align-items:center;color:#00000f}.counCard__main img[data-v-428c57e2]{-o-object-fit:cover;object-fit:cover;height:100%;width:100%}@media screen and (min-width:60em){.counCard__main[data-v-428c57e2]{grid-column-gap:4rem;-moz-column-gap:4rem;column-gap:4rem;grid-template-columns:3fr 4fr}}.counCard__statsList .orgTag[data-v-428c57e2]{margin-right:1.5rem;margin-top:.75rem}",""]),t.exports=n},418:function(t,e,r){"use strict";r.r(e);var n={props:{person:{type:Object,required:!0},relatedOrgStats:{type:Array,required:!0},round:{type:String,required:!0}},computed:{councilorLink:function(){return{name:"round-councilor-councilor",params:{round:this.round,councilor:this.person.id}}}}},o=(r(402),r(43)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"counCard br1"},[r("nuxt-link",{staticClass:"counCard__main bb b--moon-gray pb3 pb4-l",attrs:{to:t.councilorLink}},[r("div",{staticClass:"aspect-ratio aspect-ratio--1x1"},[r("div",{staticClass:"aspect-ratio--object br-100 overflow-hidden"},[r("img",{attrs:{src:t.person.bgUrl,alt:t.person.name}})])]),r("div",[r("div",{staticClass:"f5 f4-l"},[t._v(t._s(t.person.name))]),r("div",{staticClass:"f5 f4-l mt3 mt4-l"},[t._v(t._s(t.person.party))])])]),r("div",{staticClass:"counCard__statsList"},[r("div",{staticClass:"f5 f4-l mt3 mb2 fw5"},[t._v("關注議題")]),r("div",{staticClass:"flex flex-wrap"},t._l(t.relatedOrgStats,(function(t){return r("org-stats-tag",{key:t.name,attrs:{stats:t,"plain-text":!0}})})),1)])],1)}),[],!1,null,"428c57e2",null);e.default=component.exports;installComponents(component,{OrgStatsTag:r(368).default})},431:function(t,e,r){"use strict";r(401)},432:function(t,e,r){var n=r(48)(!1);n.push([t.i,"@media screen and (min-width:60em){.districtSum[data-v-29fe8582]{display:grid;grid-template-columns:13rem 1fr;grid-column-gap:5rem;-moz-column-gap:5rem;column-gap:5rem;grid-row-gap:2rem;row-gap:2rem}}.districtSum__statsList[data-v-29fe8582]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:.5rem;-moz-column-gap:.5rem;column-gap:.5rem;grid-row-gap:.5rem;row-gap:.5rem}@media screen and (min-width:60em){.districtSum__statsList[data-v-29fe8582]{grid-template-columns:repeat(4,1fr);grid-column-gap:1.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem;grid-row-gap:1rem;row-gap:1rem}}.districtSum__article[data-v-29fe8582]  ul{margin:0;padding:0}.districtSum__article[data-v-29fe8582]  ul li{list-style:none;line-height:1.5}@media screen and (min-width:60em){.counSum__list[data-v-29fe8582]{display:grid;grid-template-columns:1fr 1fr;grid-column-gap:6rem;-moz-column-gap:6rem;column-gap:6rem;grid-row-gap:3.5rem;row-gap:3.5rem}}",""]),t.exports=n},481:function(t,e,r){"use strict";r.r(e);var n={props:{meta:{type:Object,required:!0},relatedStats:{type:Object,required:!0},round:{type:String,required:!0}},computed:{intro:function(){return this.meta.intro}}},o=(r(431),r(43)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"districtSumWrapper"},[r("div",{staticClass:"districtSum"},[r("h2",{staticClass:"fw4 f4 f3-l mt3 mt0-l"},[t._v("選區情報")]),r("div",{staticClass:"districtSum__article"},[t.intro?r("nuxt-content",{attrs:{document:t.intro}}):r("div",{staticClass:"o-50"},[t._v("待撰寫")])],1),r("h2",{staticClass:"fw4 f4 f3-l mt4 mt0-l"},[t._v("議員質詢相關局處")]),r("div",{staticClass:"districtSum__statsList mt3 mt0-l"},t._l(t.relatedStats.total.org,(function(t){return r("org-stats-tag",{key:t.name,attrs:{stats:t}})})),1)]),r("div",{staticClass:"counSum mt3 pt3 mt5-l pt5-l bt b--moon-gray"},[r("h2",{staticClass:"fw4 f4 f3-l"},[t._v("應屆議員")]),r("div",{staticClass:"counSum__list mt3 mt4-l"},t._l(t.meta.councilors,(function(e){return r("councilor-card",{key:e.id,staticClass:"mt2 mt0-l",attrs:{person:e,round:t.round,"related-org-stats":t.relatedStats[e.id].org||[]}})})),1)])])}),[],!1,null,"29fe8582",null);e.default=component.exports;installComponents(component,{OrgStatsTag:r(368).default,CouncilorCard:r(418).default})}}]);