!function(e){function t(t){for(var r,o,u=t[0],i=t[1],s=t[2],p=0,m=[];p<u.length;p++)o=u[p],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&m.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(l&&l(t);m.length;)m.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,u=1;u<n.length;u++){var i=n[u];0!==a[i]&&(r=!1)}r&&(c.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={0:0},c=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var u=window.webpackJsonp=window.webpackJsonp||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var s=0;s<u.length;s++)t(u[s]);var l=i;c.push([57,1]),n()}({23:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(3),o=n.n(c),u=(n(23),n(0)),i=n.n(u),s=n(19),l=n.n(s),p=n(2),m=n.n(p),f=n(20),y=n.n(f),v=Object(u.createContext)(null),d=function(){var e=o()(a.a.mark((function e(t){var n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"./public",e.prev=1,e.next=4,y.a.get("".concat("./public","/").concat(t));case 4:return n=e.sent,r=n.data,e.abrupt("return",r);case 9:e.prev=9,e.t0=e.catch(1);case 12:return e.abrupt("return",null);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),h=function(e){var t=e.children,n=Object(u.useState)(),r=m()(n,2),c=r[0],s=r[1],l=function(){var e=o()(a.a.mark((function e(){var t,n,r,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d("unemployment-states-paths.json");case 3:return t=e.sent,e.next=6,d("unemployment-counties-paths.json");case 6:return n=e.sent,e.next=9,d("unemployment-national-paths.json");case 9:return r=e.sent,e.next=12,d("unemployment-data.json");case 12:c=e.sent,s({unemploymentDataPathsStates:t,unemploymentDataPathsCounties:n,unemploymentDataPathsUS:r,unemploymentDataByFIPS:c}),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(){return e.apply(this,arguments)}}();return i.a.useEffect((function(){l()}),[]),i.a.createElement(v.Provider,{value:c},c?t:null)},b=n(5),S=function(e){var t=e.webmapId,n=e.children,r=i.a.useRef(),c=i.a.useState(null),u=m()(c,2),s=u[0],l=u[1],p=function(){var e=o()(a.a.mark((function e(){var n,c,o,u,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(b.loadModules)(["esri/views/MapView","esri/WebMap"]);case 3:n=e.sent,c=m()(n,2),o=c[0],u=c[1],(i=new o({container:r.current,map:new u({portalItem:{id:t}})})).when((function(){l(i)})),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=o()(a.a.mark((function e(){var t,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(b.loadModules)(["esri/core/watchUtils"]);case 3:t=e.sent,n=m()(t,1),n[0].whenTrue(s,"stationary",(function(){s.zoom})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();return i.a.useEffect((function(){Object(b.loadCss)(),p()}),[]),i.a.useEffect((function(){s&&f()}),[s]),i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"},ref:r}),s?i.a.Children.map(n,(function(e){return i.a.cloneElement(e,{mapView:s})})):null)},w={min:99999999,max:3e6},x={min:3e6,max:0},P=[255,128,0,255],g=[21,106,164,255],k=function(){var e=Object(u.useContext)(v),t=e.unemploymentDataPathsStates,n=e.unemploymentDataPathsCounties,r=e.unemploymentDataPathsUS,a=e.unemploymentDataByFIPS,c=Object(u.useState)(),o=m()(c,2),s=o[0],l=o[1],p=Object(u.useState)(!1),f=m()(p,2),y=f[0],d=f[1];return Object(u.useEffect)((function(){}),[s]),i.a.createElement(i.a.Fragment,null,i.a.createElement(S,{webmapId:"8054e038927a48419ee0dddb86006ad6"},i.a.createElement(F,{showDeviation:y,nationalLevelData:r,data:t,visibleScale:w,color:P,referenceLineColor:g}),i.a.createElement(F,{showDeviation:y,nationalLevelData:r,data:n,visibleScale:x,color:P,referenceLineColor:g}),i.a.createElement(M,{key:"query-4-US-Counties",url:"https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Counties_Generalized/FeatureServer/0",outFields:["FIPS"],visibleScale:x,onSelect:function(e){var t=e?e.attributes.FIPS:void 0;l(a[t])}}),i.a.createElement(M,{key:"query-4-US-States",url:"https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_States_Generalized/FeatureServer/0",outFields:["STATE_FIPS"],visibleScale:w,onSelect:function(e){var t=e?e.attributes.STATE_FIPS:void 0;l(a[t])}})),i.a.createElement(U,{showDeviation:y,onChange:d.bind(void 0,!y)}))},M=function(e){var t=e.url,n=e.outFields,r=e.mapView,c=e.visibleScale,i=e.onSelect,s=Object(u.useRef)(),l=Object(u.useRef)(),p=function(){var e=o()(a.a.mark((function e(){var o,u,i,p;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(b.loadModules)(["esri/layers/FeatureLayer"]);case 3:o=e.sent,u=m()(o,1),i=u[0],p=new i({url:t,minScale:c&&c.min,maxScale:c&&c.max,visible:!0,popupEnabled:!1,outFields:n,opacity:0}),r.map.add(p),r.whenLayerView(p).then((function(e){s.current=p,l.current=e,y()})),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=o()(a.a.mark((function e(t){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r.scale<s.current.minScale&&r.scale>s.current.maxScale)){e.next=6;break}return e.next=4,l.current.queryFeatures({where:"1=1",geometry:r.toMap(t),returnGeometry:!0,outFields:n||["*"]});case 4:c=e.sent,i(c.features&&c.features.length?c.features[0]:void 0);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){r.on("click",(function(e){f(e)}))};return Object(u.useEffect)((function(){r&&p()}),[r]),null},j=n(6),O=n.n(j),C=n(21).urlFns.parseQuery(),E=C.color1?[].concat(O()(C.color1.split(",").map((function(e){return+e}))),[255]):null,I=C.color2?[].concat(O()(C.color2.split(",").map((function(e){return+e}))),[255]):null,F=function(e){var t=e.data,n=e.nationalLevelData,r=e.showDeviation,c=e.color,i=e.referenceLineColor,s=e.visibleScale,l=e.mapView,p=Object(u.useRef)(),f=Object(u.useRef)(),y=Object(u.useState)(!1),v=m()(y,2),d=v[0],h=v[1],S=function(){var e=o()(a.a.mark((function e(){var t,n,r,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(b.loadModules)(["esri/layers/GraphicsLayer","esri/core/watchUtils"]);case 3:t=e.sent,n=m()(t,2),r=n[0],c=n[1],f.current=new r({minScale:s&&s.min,maxScale:s&&s.max,visible:!1}),l.map.add(f.current),c.whenTrue(l,"stationary",(function(){var e=l.scale<s.min&&l.scale>s.max;h(e)})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=o()(a.a.mark((function e(){var o,u,s,l,y,v,d,h,S,w,x;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E&&(c=E),I&&(i=I),o=f.current,u=n.features[0].PctUnemployed.path,s=n.frames.PctUnemployed,e.prev=5,e.next=8,Object(b.loadModules)(["esri/symbols/CIMSymbol","esri/Graphic","esri/geometry/Point"]);case 8:l=e.sent,y=m()(l,3),v=y[0],d=y[1],h=y[2],S=t.features,w=t.frames,x=r?w.PctUnemployedDeviation:w.PctUnemployed,function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=800,a=t+n<S.length?t+n:S.length,l=S.slice(t,a),m=l.map((function(e){var t=e.geometry,n=e.PctUnemployed,a=e.PctUnemployedDeviation,o={x:0,y:r?0:-.5},l=r?60:30,p=(r?a:n).path,m=new v({data:{type:"CIMSymbolReference",symbol:{type:"CIMPointSymbol",symbolLayers:[{type:"CIMVectorMarker",anchorPoint:o,anchorPointUnits:"Relative",enable:!0,scaleSymbolsProportionally:!1,respectFrame:!0,size:l,frame:x,markerGraphics:[{type:"CIMMarkerGraphic",geometry:{paths:[p]},symbol:{type:"CIMLineSymbol",symbolLayers:[{type:"CIMSolidStroke",width:1,color:c}]}}]},r?null:{type:"CIMVectorMarker",anchorPoint:o,anchorPointUnits:"Relative",enable:!0,scaleSymbolsProportionally:!1,respectFrame:!0,size:l,frame:s,markerGraphics:[{type:"CIMMarkerGraphic",geometry:{paths:[u]},symbol:{type:"CIMLineSymbol",symbolLayers:[{type:"CIMSolidStroke",width:1,color:i}]}}]},r?{type:"CIMVectorMarker",anchorPoint:o,anchorPointUnits:"Relative",enable:!0,scaleSymbolsProportionally:!1,respectFrame:!0,size:l,frame:x,markerGraphics:[{type:"CIMMarkerGraphic",geometry:{paths:[[[0,0],[x.xmax,0]]]},symbol:{type:"CIMLineSymbol",symbolLayers:[{type:"CIMSolidStroke",width:1,color:i}]}}]}:null]}}});return new d({geometry:new h({latitude:t.y,longitude:t.x}),symbol:m})}));o.addMany(m),t+n<S.length?p.current=setTimeout((function(){e(t+n)}),1):o.visible=!0}(0),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(5);case 22:case"end":return e.stop()}}),e,null,[[5,19]])})));return function(){return e.apply(this,arguments)}}();return Object(u.useEffect)((function(){l&&S()}),[l]),Object(u.useEffect)((function(){f.current&&t&&(f.current.removeAll(),clearTimeout(p.current),d&&w())}),[f,t,r]),Object(u.useEffect)((function(){t&&d&&!f.current.graphics.length&&(clearTimeout(p.current),w())}),[d]),null},D=n(7),L=n.n(D),U=function(e){var t=e.showDeviation,n=e.onChange;return i.a.createElement("div",{style:{position:"absolute",top:"1rem",right:"1rem",background:"#fff",padding:".5rem",cursor:"pointer",zIndex:1},onClick:n},i.a.createElement("nav",{className:"breadcrumbs modifier-class"},i.a.createElement("span",{className:L()("crumb",{"is-active":!t})},"Pct Unemployment"),i.a.createElement("span",{className:L()("crumb",{"is-active":t})},"Deviation")))},G=function(){return i.a.createElement(k,null)};o()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(h,null,i.a.createElement(G,null))),document.getElementById("root"));case 1:case"end":return e.stop()}}),e)})))()}});
//# sourceMappingURL=main.a954a8b6a2022ea59732.js.map