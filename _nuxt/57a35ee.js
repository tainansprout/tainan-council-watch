(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{391:function(e,t,r){"use strict";var n=r(14),o=r(6),c=r(7),l=r(134),f=r(23),d=r(17),h=r(254),v=r(59),m=r(102),N=r(253),w=r(5),S=r(103).f,I=r(47).f,E=r(22).f,y=r(403),_=r(252).trim,P="Number",k=o.Number,F=k.prototype,A=o.TypeError,T=c("".slice),V=c("".charCodeAt),x=function(e){var t=N(e,"number");return"bigint"==typeof t?t:C(t)},C=function(e){var t,r,n,o,c,l,f,code,d=N(e,"number");if(m(d))throw A("Cannot convert a Symbol value to a number");if("string"==typeof d&&d.length>2)if(d=_(d),43===(t=V(d,0))||45===t){if(88===(r=V(d,2))||120===r)return NaN}else if(48===t){switch(V(d,1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+d}for(l=(c=T(d,2)).length,f=0;f<l;f++)if((code=V(c,f))<48||code>o)return NaN;return parseInt(c,n)}return+d};if(l(P,!k(" 0o1")||!k("0b1")||k("+0x1"))){for(var M,O=function(e){var t=arguments.length<1?0:k(x(e)),r=this;return v(F,r)&&w((function(){y(r)}))?h(Object(t),r,O):t},B=n?S(k):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),D=0;B.length>D;D++)d(k,M=B[D])&&!d(O,M)&&E(O,M,I(k,M));O.prototype=F,F.constructor=O,f(o,P,O,{constructor:!0})}},401:function(e,t,r){var content=r(432);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(33).default)("4ac103e3",content,!0,{sourceMap:!1})},403:function(e,t,r){var n=r(7);e.exports=n(1..valueOf)},431:function(e,t,r){"use strict";r(401)},432:function(e,t,r){var n=r(32)(!1);n.push([e.i,".sip[data-v-4dc5e1d9] .pdfViewer .page{box-sizing:content-box}",""]),e.exports=n},443:function(e,t,r){"use strict";r.r(t);r(391);var n={props:{document:{type:Object,required:!0},page:{type:Number,required:!0},highlight:{type:String,default:""},noScroll:{type:Boolean,default:!0}},mounted:function(){this.renderPdf()},methods:{renderPdf:function(){var e=this,t=window.pdfjsViewer,r=new t.EventBus,n={container:this.$refs.page.parentElement,viewer:this.$refs.page,eventBus:r};n.linkService=new t.PDFLinkService({eventBus:r}),this.highlight&&(n.findController=new t.PDFFindController({eventBus:r,linkService:n.linkService}));var o=new t.PDFSinglePageViewer(n);n.linkService.setViewer(o),r.on("pagesinit",(function(){if(o._setScale(.95,e.noScroll),e.highlight)r.dispatch("find",{type:"",query:e.highlight,phraseSearch:!0,highlightAll:!0});else{var t=o.container.parentElement.scrollTop;o.currentPageNumber=e.page,o.container.parentElement.scrollTo({top:t})}e.$emit("loaded")})),r.on("updatetextlayermatches",(function(){o.currentPageNumber!==e.page&&o._setCurrentPageNumber(e.page,!e.noScroll)})),o.setDocument(this.document),n.linkService.setDocument(this.document,null)}}},o=(r(431),r(27)),component=Object(o.a)(n,(function(){return(0,this._self._c)("div",{ref:"page",staticClass:"sip pdfViewer"})}),[],!1,null,"4dc5e1d9",null);t.default=component.exports}}]);