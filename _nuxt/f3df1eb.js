(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{381:function(e,t,r){"use strict";var n=r(15),o=r(7),c=r(5),l=r(130),f=r(22),h=r(17),d=r(246),v=r(56),N=r(99),m=r(245),S=r(6),w=r(100).f,I=r(47).f,E=r(21).f,_=r(393),y=r(244).trim,P="Number",k=o.Number,F=k.prototype,A=o.TypeError,V=c("".slice),x=c("".charCodeAt),C=function(e){var t=m(e,"number");return"bigint"==typeof t?t:T(t)},T=function(e){var t,r,n,o,c,l,f,code,h=m(e,"number");if(N(h))throw A("Cannot convert a Symbol value to a number");if("string"==typeof h&&h.length>2)if(h=y(h),43===(t=x(h,0))||45===t){if(88===(r=x(h,2))||120===r)return NaN}else if(48===t){switch(x(h,1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+h}for(l=(c=V(h,2)).length,f=0;f<l;f++)if((code=x(c,f))<48||code>o)return NaN;return parseInt(c,n)}return+h};if(l(P,!k(" 0o1")||!k("0b1")||k("+0x1"))){for(var M,O=function(e){var t=arguments.length<1?0:k(C(e)),r=this;return v(F,r)&&S((function(){_(r)}))?d(Object(t),r,O):t},B=n?w(k):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),D=0;B.length>D;D++)h(k,M=B[D])&&!h(O,M)&&E(O,M,I(k,M));O.prototype=F,F.constructor=O,f(o,P,O,{constructor:!0})}},391:function(e,t,r){var content=r(422);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(34).default)("83b0c7d8",content,!0,{sourceMap:!1})},393:function(e,t,r){var n=r(5);e.exports=n(1..valueOf)},421:function(e,t,r){"use strict";r(391)},422:function(e,t,r){var n=r(33)(!1);n.push([e.i,".sip[data-v-7ed7fb02]  .pdfViewer .page{box-sizing:content-box}",""]),e.exports=n},433:function(e,t,r){"use strict";r.r(t);r(381);var n={props:{document:{type:Object,required:!0},page:{type:Number,required:!0},highlight:{type:String,default:""},noScroll:{type:Boolean,default:!0}},mounted:function(){this.renderPdf()},methods:{renderPdf:function(){var e=this,t=window.pdfjsViewer,r=new t.EventBus,n={container:this.$refs.page.parentElement,viewer:this.$refs.page,eventBus:r};n.linkService=new t.PDFLinkService({eventBus:r}),this.highlight&&(n.findController=new t.PDFFindController({eventBus:r,linkService:n.linkService}));var o=new t.PDFSinglePageViewer(n);n.linkService.setViewer(o),r.on("pagesinit",(function(){o._setScale(.95,e.noScroll),e.highlight?r.dispatch("find",{type:"",query:e.highlight,phraseSearch:!0,highlightAll:!0}):o._setCurrentPageNumber(e.page,!e.noScroll),e.$emit("loaded")})),r.on("updatetextlayermatches",(function(){o.currentPageNumber!==e.page&&o._setCurrentPageNumber(e.page,!e.noScroll)})),o.setDocument(this.document),n.linkService.setDocument(this.document,null)}}},o=(r(421),r(27)),component=Object(o.a)(n,(function(){var e=this.$createElement;return(this._self._c||e)("div",{ref:"page",staticClass:"sip pdfViewer"})}),[],!1,null,"7ed7fb02",null);t.default=component.exports}}]);