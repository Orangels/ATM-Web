webpackJsonp([24],{1241:function(e,t,n){var A=n(1242);"string"===typeof A&&(A=[[e.i,A,""]]);var o={hmr:!1};o.transform=void 0;n(847)(A,o);A.locals&&(e.exports=A.locals)},1242:function(e,t,n){t=e.exports=n(846)(!0),t.push([e.i,'.home .ant-carousel .slick-slide{height:calc(100vh - 64px);overflow:hidden}.home .size{height:calc(100vh - 64px);width:100%;background-size:cover}.home .ant-carousel .slick-slider .slick-arrow{width:20px;height:60px;margin-top:-30px;opacity:.7}.ant-carousel .slick-slider .slick-prev{z-index:99;left:0}.ant-carousel .slick-slider .slick-next{z-index:99;right:0}.ant-carousel .slick-slider .slick-prev:before{content:" ";position:absolute;width:2px;height:15px;background:#fff;display:block;-webkit-transform:rotate(40deg);-ms-transform:rotate(40deg);transform:rotate(40deg);top:18px;left:10px}.ant-carousel .slick-slider .slick-prev:after{bottom:17px}.ant-carousel .slick-slider .slick-next:before,.ant-carousel .slick-slider .slick-prev:after{content:" ";position:absolute;width:2px;height:15px;background:#fff;display:block;-webkit-transform:rotate(-40deg);-ms-transform:rotate(-40deg);transform:rotate(-40deg);left:10px}.ant-carousel .slick-slider .slick-next:before{top:18px}.ant-carousel .slick-slider .slick-next:after{content:" ";position:absolute;width:2px;height:15px;background:#fff;display:block;-webkit-transform:rotate(40deg);-ms-transform:rotate(40deg);transform:rotate(40deg);bottom:17px;left:10px}.ant-carousel .slider-item{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;height:200px;overflow:hidden;color:#fff;font-size:12px;text-align:center}.ant-carousel .slider-item h3,.ant-carousel .slider-item p{display:none}.ant-carousel .slick-slide h3{font-size:32px;color:#fff;margin-bottom:0}.ant-carousel .slider-item .slider-active{display:block}',"",{version:3,sources:["/Users/liusen/Documents/JavaScript/react-demo/ATM_Web/src/routes/Home/style.css"],names:[],mappings:"AACA,iCACI,0BAA2B,AAE3B,eAAiB,CACpB,AACD,YACI,0BAA2B,AAC3B,WAAY,AACZ,qBAAuB,CAC1B,AACD,+CACI,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,UAAa,CAEhB,AACD,wCACI,WAAW,AACZ,MAAO,CACT,AACD,wCACI,WAAW,AACX,OAAQ,CACX,AACD,+CACI,YAAa,AACb,kBAAmB,AACnB,UAAW,AACX,YAAa,AACb,gBAAiB,AACjB,cAAe,AACf,gCAAiC,AAC7B,4BAA6B,AACzB,wBAAyB,AACjC,SAAU,AACV,SAAW,CACd,AACD,8CAUI,WAAa,CAEhB,AACD,6FAZI,YAAa,AACb,kBAAmB,AACnB,UAAW,AACX,YAAa,AACb,gBAAiB,AACjB,cAAe,AACf,iCAAkC,AAC9B,6BAA8B,AAC1B,yBAA0B,AAElC,SAAW,CAcd,AAZD,+CAUI,QAAU,CAEb,AACD,8CACI,YAAa,AACb,kBAAmB,AACnB,UAAW,AACX,YAAa,AACb,gBAAiB,AACjB,cAAe,AACf,gCAAiC,AAC7B,4BAA6B,AACzB,wBAAyB,AACjC,YAAa,AACb,SAAW,CACd,AACD,2BACI,oBAAqB,AACrB,aAAc,AACd,0BAA2B,AACvB,sBAAuB,AAC3B,qBAAsB,AAClB,uBAAwB,AAC5B,aAAc,AACd,gBAAiB,AACjB,WAAY,AACZ,eAAgB,AAChB,iBAAmB,CACtB,AAID,2DACI,YAAc,CACjB,AACD,8BACI,eAAgB,AAChB,WAAY,AACZ,eAAiB,CACpB,AACD,0CACI,aAAe,CAClB",file:"style.css",sourcesContent:["\n.home .ant-carousel .slick-slide {\n    height: calc(100vh - 64px);\n    /*background: #364d79;*/\n    overflow: hidden;\n}\n.home .size{\n    height: calc(100vh - 64px);\n    width: 100%;\n    background-size: cover;\n}\n.home .ant-carousel .slick-slider .slick-arrow{\n    width: 20px;\n    height: 60px;\n    margin-top: -30px;\n    opacity: 0.7;\n    /*background: rgba(0, 0, 0, 0.3);*/\n}\n.ant-carousel .slick-slider .slick-prev{\n    z-index:99;\n   left:0;\n}\n.ant-carousel .slick-slider .slick-next{\n    z-index:99;\n    right:0;\n}\n.ant-carousel .slick-slider .slick-prev::before{\n    content: ' ';\n    position: absolute;\n    width: 2px;\n    height: 15px;\n    background: #fff;\n    display: block;\n    -webkit-transform: rotate(40deg);\n        -ms-transform: rotate(40deg);\n            transform: rotate(40deg);\n    top: 18px;\n    left: 10px;\n}\n.ant-carousel .slick-slider .slick-prev::after{\n    content: ' ';\n    position: absolute;\n    width: 2px;\n    height: 15px;\n    background: #fff;\n    display: block;\n    -webkit-transform: rotate(-40deg);\n        -ms-transform: rotate(-40deg);\n            transform: rotate(-40deg);\n    bottom: 17px;\n    left: 10px;\n}\n.ant-carousel .slick-slider .slick-next::before{\n    content: ' ';\n    position: absolute;\n    width: 2px;\n    height: 15px;\n    background: #fff;\n    display: block;\n    -webkit-transform: rotate(-40deg);\n        -ms-transform: rotate(-40deg);\n            transform: rotate(-40deg);\n    top: 18px;\n    left: 10px;\n}\n.ant-carousel .slick-slider .slick-next::after{\n    content: ' ';\n    position: absolute;\n    width: 2px;\n    height: 15px;\n    background: #fff;\n    display: block;\n    -webkit-transform: rotate(40deg);\n        -ms-transform: rotate(40deg);\n            transform: rotate(40deg);\n    bottom: 17px;\n    left: 10px;\n}\n.ant-carousel .slider-item{\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -ms-flex-pack: center;\n        justify-content: center;\n    height: 200px;\n    overflow: hidden;\n    color: #fff;\n    font-size: 12px;\n    text-align: center;\n}\n.ant-carousel .slider-item h3{\n    display: none;\n}\n.ant-carousel .slider-item p{\n    display: none;\n}\n.ant-carousel .slick-slide h3 {\n    font-size: 32px;\n    color: #fff;\n    margin-bottom: 0;\n}\n.ant-carousel .slider-item .slider-active{\n    display: block;\n}"],sourceRoot:""}])},848:function(e,t,n){"use strict";function A(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),s=n.n(i),a=n(1241),l=(n.n(a),function(){function e(e,t){for(var n=0;n<t.length;n++){var A=t[n];A.enumerable=A.enumerable||!1,A.configurable=!0,"value"in A&&(A.writable=!0),Object.defineProperty(e,A.key,A)}}return function(t,n,A){return n&&e(t.prototype,n),A&&e(t,A),t}}()),c=function(e){function t(){return A(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),l(t,[{key:"render",value:function(){return s.a.createElement("div",{style:f.bg,className:"home"})}}]),t}(s.a.Component),f={bg:{position:"absolute",top:0,left:0,width:"100%",height:"calc(100vh - 64px)"}};t.default=c}});
//# sourceMappingURL=24.c92913ce.chunk.js.map