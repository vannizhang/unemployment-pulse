!function(e){function t(t){for(var r,i,l=t[0],c=t[1],u=t[2],m=0,f=[];m<l.length;m++)i=l[m],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(s&&s(t);f.length;)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var c=n[l];0!==a[c]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={0:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var s=c;o.push([135,1]),n()}({135:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(4),i=n.n(o),l=(n(98),n(0)),c=n.n(l),u=n(43),s=n.n(u),m=n(2),f=n.n(m),d=n(12),p=n.n(d),h=(n(44),n(11)),v=n.n(h),b=(n(138),n(137));n(126);var y=n(127);Object(b.b)({fetch:y});var g="https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/BLS_Monthly_Unemployment_Current_14_Months/FeatureServer",x="fips, PctUnemployed_CurrentMonth, PctUnemployed_01Month, PctUnemployed_02Month, PctUnemployed_03Month, PctUnemployed_04Month, PctUnemployed_05Month, PctUnemployed_06Month, PctUnemployed_07Month, PctUnemployed_08Month, PctUnemployed_09Month, PctUnemployed_10Month, PctUnemployed_11Month, PctUnemployed_12Month, PctUnemployed_13Month, CurrentMonth, P13Month, LaborForce_CurrentMonth, Unemployed_CurrentMonth",E=("f=json&where=1=1&returnGeometry=false&returnCentroid=true&outSR=4326&outFields=".concat(x),function(){var e=i()(a.a.mark((function e(){var t,n,r,o,i,l,c,u,s,m,f,d,h,v,b,y,x,E,w;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,p.a.get("".concat(g,"/0/query"),{params:{where:"1=1",outFields:["CurrentMonth","P01Month","P02Month","P03Month","P04Month","P05Month","P06Month","P07Month","P08Month","P09Month","P10Month","P11Month","P12Month","P13Month"].join(","),returnGeometry:!1,f:"json"}});case 3:return n=e.sent,(r=n.data).features&&(o=r.features[0],i=o.attributes,l=i.CurrentMonth,c=i.P01Month,u=i.P02Month,s=i.P03Month,m=i.P04Month,f=i.P05Month,d=i.P06Month,h=i.P07Month,v=i.P08Month,b=i.P09Month,y=i.P10Month,x=i.P11Month,E=i.P12Month,w=i.P13Month,t=[l,c,u,s,m,f,d,h,v,b,y,x,E,w].reverse()),e.abrupt("return",t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),w=n(8),j=Object(l.createContext)(null),O=function(){var e=i()(a.a.mark((function e(t){var n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"./public",e.prev=1,e.next=4,p.a.get("".concat("./public","/").concat(t));case 4:return n=e.sent,r=n.data,e.abrupt("return",r);case 9:e.prev=9,e.t0=e.catch(1);case 12:return e.abrupt("return",null);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),M=function(e){var t=e.children,n=Object(l.useState)(),r=f()(n,2),o=r[0],u=r[1],s=function(){var e=i()(a.a.mark((function e(){var t,n,r,o,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O("unemployment-states-paths.json");case 3:return t=e.sent,e.next=6,O("unemployment-counties-paths.json");case 6:return n=e.sent,e.next=9,O("unemployment-national-paths.json");case 9:return r=e.sent,e.next=12,O("unemployment-data.json");case 12:return o=e.sent,e.next=15,E();case 15:i=e.sent,u({unemploymentDataPathsStates:t,unemploymentDataPathsCounties:n,unemploymentDataPathsUS:r,unemploymentDataByFIPS:o,months:i,isMobileDevice:w.miscFns.isMobileDevice()}),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(0);case 22:case"end":return e.stop()}}),e,null,[[0,19]])})));return function(){return e.apply(this,arguments)}}();return c.a.useEffect((function(){s()}),[]),c.a.createElement(j.Provider,{value:o},o?t:null)},S=n(6),P=w.urlFns.parseHash(),k=function(e){return"@"===e?L(P):P[e]||null},C=function(e){if(e){var t=e.lon,n=e.lat,r=e.zoom;w.urlFns.updateHashParam({key:"@",value:"".concat(t,",").concat(n,",").concat(r)})}},L=function(e){if(!e["@"])return null;var t=e["@"].split(",").map((function(e){return+e})),n=f()(t,3);return{lon:n[0],lat:n[1],zoom:n[2]}},F=function(e){w.urlFns.updateHashParam({key:"fips",value:e||""})},z=k("@"),U=function(e){var t=e.webmapId,n=e.children,r=c.a.useRef(),o=c.a.useState(null),l=f()(o,2),u=l[0],s=l[1],m=function(){var e=i()(a.a.mark((function e(){var n,o,i,l,c,u,m,d,p,h;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(S.loadModules)(["esri/views/MapView","esri/WebMap"]);case 3:n=e.sent,o=f()(n,2),i=o[0],l=o[1],u=(c=z||{}).lat,m=c.lon,d=c.zoom,p=m&&u?[m,u]:void 0,(h=new i({container:r.current,map:new l({portalItem:{id:t}}),center:p,zoom:d,padding:{top:60}})).when((function(){s(h)})),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=i()(a.a.mark((function e(){var t,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(S.loadModules)(["esri/core/watchUtils"]);case 3:t=e.sent,n=f()(t,1),n[0].whenTrue(u,"stationary",(function(){if(-1!==u.zoom){var e={lat:u.center&&u.center.latitude?+u.center.latitude.toFixed(3):0,lon:u.center&&u.center.longitude?+u.center.longitude.toFixed(3):0,zoom:u.zoom};C(e)}})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();return c.a.useEffect((function(){Object(S.loadCss)(),m()}),[]),c.a.useEffect((function(){u&&d()}),[u]),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"},ref:r}),u?c.a.Children.map(n,(function(e){return c.a.cloneElement(e,{mapView:u})})):null)},I={min:99999999,max:3e6},H={min:3e6,max:0},A=[255,155,10,255],D=[51,146,214,255],R="rgba(20,106,164,.5)",_=k("fips"),N=function(){var e=Object(l.useContext)(j),t=e.unemploymentDataPathsStates,n=e.unemploymentDataPathsCounties,r=e.unemploymentDataPathsUS,a=e.unemploymentDataByFIPS,o=Object(l.useState)(a[_]),i=f()(o,2),u=i[0],s=i[1],m=Object(l.useState)(!1),d=f()(m,2),p=d[0],h=d[1],v=Object(l.useState)(),b=f()(v,2),y=b[0],g=b[1];return Object(l.useEffect)((function(){if(y){var e=y?y.attributes.FIPS||y.attributes.STATE_FIPS:void 0;s(a[e]),F(e)}}),[y]),c.a.createElement(c.a.Fragment,null,c.a.createElement(Z,null,c.a.createElement(He,{showDeviation:p,onChange:h.bind(void 0,!p)})),c.a.createElement(U,{webmapId:"8054e038927a48419ee0dddb86006ad6"},c.a.createElement(Ue,{showDeviation:p,nationalLevelData:r,data:t,visibleScale:I,color:A,referenceLineColor:D}),c.a.createElement(Ue,{showDeviation:p,nationalLevelData:r,data:n,visibleScale:H,color:A,referenceLineColor:D}),c.a.createElement(ze,{key:"query-4-US-Counties",url:"https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Counties_Generalized/FeatureServer/0",outFields:["FIPS"],visibleScale:H,onSelect:g}),c.a.createElement(ze,{key:"query-4-US-States",url:"https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_States_Generalized/FeatureServer/0",outFields:["STATE_FIPS"],visibleScale:I,onSelect:g}),c.a.createElement(Fe,{queryResult:y})),c.a.createElement(Le,{data:u,close:function(){g(null),s(null),F()}}))},G=n(9),T=n.n(G),V=n(10),B=n(45),W=n.n(B),q={default:"font-size-0",small:"font-size--2",medium:"font-size-2",large:"font-size-4"},J=function(e){var t=e.color,n=void 0===t?"blue":t,r=e.size,a=void 0===r?"default":r,o=e.customFontSize,i=e.customLineHeight,l=e.children,u=W()("avenir-bold ".concat(o?"":q[a]),{"text-theme-color-orange":"orange"===n,"text-theme-color-blue":"blue"===n}),s=o||i?{fontSize:o||"default",lineHeight:i||"default"}:null;return c.a.createElement("span",{className:u,style:s},l)},Y=function(e){var t=e.value,n=e.title,r=e.subtitle;return c.a.createElement("div",{className:"trailer-quarter"},c.a.createElement("div",null,c.a.createElement(J,{color:"blue"},n)),c.a.createElement("div",{style:{display:"flex",alignItems:"flex-start"}},c.a.createElement(J,{color:"orange",size:"large",customLineHeight:"1"},t),r?c.a.createElement("div",{className:"margin-left-quarter"},c.a.createElement(J,{color:"orange",size:"small",customLineHeight:"1"},r)):null))};function X(){var e=T()(["\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    display: flex;\n    background: linear-gradient(\n        to bottom,\n        "," 0%,\n        "," 50%,\n        rgba(0, 0, 0, 0) 100%\n    );\n    z-index: 5;\n    box-sizing: border-box;\n    padding: 0.5rem 1rem;\n    justify-content: space-between;\n\n    svg {\n        fill: ",";\n        stroke: ",";\n    }\n"]);return X=function(){return e},e}var K=V.a.div(X(),"rgba(3, 26, 57, 0.9)","rgba(3, 26, 57, 0.9)","#136AA4","#136AA4"),Q=function(){return c.a.createElement("div",{style:{display:"flex",alignItems:"center"}},c.a.createElement("div",{className:"phone-hide"},c.a.createElement(J,{size:"large",color:"orange"},"UnemploymentPulse")),c.a.createElement("div",{className:"margin-left-1 margin-right-1 tablet-hide",style:{lineHeight:"1.2"}},c.a.createElement(J,{color:"blue",customLineHeight:"1"},"14-Month US State and County"),c.a.createElement("br",null),c.a.createElement(J,{color:"blue",customLineHeight:"1"},"Unemployment Trend Lines")),c.a.createElement("div",{className:"leader-quarter",style:{cursor:"pointer"}},c.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",height:"24",width:"24"},c.a.createElement("path",{d:"M12.5 7.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1zM13 18V9h-2v1h1v8h-1v1h3v-1zm9.8-5.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"}))))},Z=function(e){var t=e.children;return c.a.createElement(K,null,c.a.createElement(Q,null),t)};function $(){var e=T()(["\n    margin-right: 4rem;\n"]);return $=function(){return e},e}var ee=V.a.div($()),te=function(e){var t=e.data,n=Object(l.useMemo)((function(){return Math.floor((t.attributes.workforce-t.attributes.unemployed)/t.attributes.workforce*100)}),[t]);return c.a.createElement(ee,null,c.a.createElement("div",{className:"trailer-half"},c.a.createElement("div",null,c.a.createElement(J,{color:"orange",size:"large"},t.attributes.name)),c.a.createElement("div",{className:"avenir-bold font-size-0"},c.a.createElement(J,{color:"orange"},w.numberFns.numberWithCommas(t.attributes.population))," ",c.a.createElement(J,null,"Total population"))),c.a.createElement("div",{style:{display:"flex"}},c.a.createElement("div",{className:"padding-right-1",style:{borderRight:"1px solid ".concat(R)}},c.a.createElement(Y,{title:"Labor Force",value:w.numberFns.numberWithCommas(t.attributes.workforce)}),c.a.createElement(Y,{title:"Participation Rate",value:"".concat(n,"%")})),c.a.createElement("div",{className:"margin-left-1"},c.a.createElement(Y,{title:"Employed",value:w.numberFns.numberWithCommas(t.attributes.workforce-t.attributes.unemployed)}),c.a.createElement(Y,{title:"Unemployed",value:w.numberFns.numberWithCommas(t.attributes.unemployed)}))))};function ne(){var e=T()(["\n    border-right: 1px solid ",";\n    min-width: 85px;\n    padding-right: 0.75rem;\n    margin-right: 1rem;\n\n    @media (max-width: ","px) {\n        border-right: none;\n        width: 45%;\n        padding-right: 0.25rem;\n        margin-right: 0.25rem;\n    }\n"]);return ne=function(){return e},e}function re(){var e=T()(["\n    display: flex;\n\n    @media (max-width: ","px) {\n        flex-wrap: wrap;\n    }\n"]);return re=function(){return e},e}function ae(){var e=T()(["\n    line-height: 1.1;\n    margin-right: 2rem;\n\n    @media (max-width: ","px) {\n        margin-right: 0.75rem;\n    }\n"]);return ae=function(){return e},e}function oe(){var e=T()(["\n    margin-right: 4rem;\n    /* border-left: 1px solid ",";\n    border-right: 1px solid ","; */\n\n    @media (max-width: ","px) {\n        margin-right: unset;\n        margin: 1rem 0;\n        padding: 1rem 0;\n        border-top: 1px solid ",";\n        border-bottom: 1px solid ",";\n    }\n"]);return oe=function(){return e},e}var ie=V.a.div(oe(),R,R,767,R,R),le=V.a.div(ae(),767),ce=V.a.div(re(),767),ue=V.a.div(ne(),R,767),se=function(e,t){for(var n=e.PctUnemployed,r=n.length-2,a=n.length-13,o=0,i=0,l=0;l<n.length;l++)n[l]>n[i]&&(i=l),n[l]<n[o]&&(o=l);return[r,a,o,i].map((function(e){var r=n[e],a=t[e].split(" "),o=f()(a,2),i=o[0],l=o[1];return{month:"".concat(i.slice(0,3).toUpperCase()," '").concat(l.slice(2)),value:r}}))},me=function(e){return e<4?c.a.createElement(c.a.Fragment,null,c.a.createElement(J,{customLineHeight:"1"},"indicative of an"),c.a.createElement("br",null),c.a.createElement(J,{customLineHeight:"1"},"Economic Boom")):e<6?c.a.createElement(c.a.Fragment,null,c.a.createElement(J,{customLineHeight:"1"},"Healthy Levels"),c.a.createElement("br",null),c.a.createElement(J,{customLineHeight:"1"},"of Employment")):c.a.createElement(c.a.Fragment,null,c.a.createElement(J,{customLineHeight:"1"},"Recession Level"),c.a.createElement("br",null),c.a.createElement(J,{customLineHeight:"1"},"Unemployment"))},fe=function(e){var t=e.data,n=Object(l.useContext)(j),r=n.months,a=n.isMobileDevice,o=Object(l.useMemo)((function(){return se(t,r)}),[t]),i=f()(o,4),u=i[0],s=i[1],m=i[2],d=i[3];return c.a.createElement(ie,null,c.a.createElement("div",null,c.a.createElement(J,null,"Unemployment Rate")),c.a.createElement("div",{style:{display:"flex",marginBottom:a?"1rem":"unset"}},c.a.createElement(le,null,c.a.createElement("div",{style:{display:"flex"}},c.a.createElement(J,{color:"orange",customFontSize:a?"5rem":"7rem"},t.attributes.unemploymentRate),c.a.createElement("span",{className:"leader-half"},c.a.createElement(J,{color:"orange",customFontSize:a?"2rem":"4rem"},"%")))),c.a.createElement("div",{style:{maxWidth:170}},c.a.createElement("div",{style:{lineHeight:"1.2",marginTop:".75rem",marginBottom:".75rem"}},me(t.attributes.unemploymentRate)),c.a.createElement("div",{style:{lineHeight:"1.2"}},c.a.createElement(J,{customLineHeight:"1"},"Ranks #",w.numberFns.numberWithCommas(t.attributes.rank)),c.a.createElement("br",null),c.a.createElement(J,{customLineHeight:"1"},2===t.attributes.fips.length?"of 50 States and DC":"of 3,141 Counties")))),c.a.createElement(ce,null,c.a.createElement(ue,null,c.a.createElement(Y,{title:"Last Month",value:u.value.toString()})),c.a.createElement(ue,null,c.a.createElement(Y,{title:"Last Year",value:s.value.toString()})),c.a.createElement(ue,null,c.a.createElement(Y,{title:"14 Month HIGH",subtitle:d.month,value:d.value.toString()})),c.a.createElement(Y,{title:"14 Month LOW",subtitle:m.month,value:m.value.toString()})))},de=n(3),pe={top:15,right:15,bottom:25,left:30},he=function(e){var t=e.xScale,n=e.yScale,r=e.data,a=e.svgContainerData,o=e.color,i=Object(l.useRef)();return Object(l.useEffect)((function(){var e,l;a&&t&&n&&r&&(e=a.dimension.height,(l=Object(de.j)(i.current).selectAll("rect")).size()&&l.remove(),Object(de.j)(i.current).selectAll("rect").data(r).enter().append("rect").style("fill",o||"#FF8000").attr("x",(function(e){return t(e.key)})).attr("width",t.bandwidth()).attr("y",(function(e){return n(e.value)})).attr("height",(function(t){return e-n(t.value)})))}),[t,n,r]),c.a.createElement("g",{ref:i,className:"bar-group"})},ve=function(e){var t=e.xScale,n=e.yScale,r=e.data,a=e.svgContainerData,o=e.color,i=e.width,u=c.a.useRef(),s=Object(l.useMemo)((function(){return"bandwidth"in t?t.bandwidth()/2:0}),[t]),m=Object(l.useMemo)((function(){return Object(de.d)().curve(de.c).x((function(e){return"bandwidth"in t?t(e.key)+s:t(+e.key)})).y((function(e){return n(e.value)}))}),[t,n]),f=function(){var e=Object(de.j)(u.current).selectAll("path");e.size()&&e.remove().exit()};return Object(l.useEffect)((function(){a&&t&&n&&r&&(f(),Object(de.j)(u.current).append("path").data([r]).attr("d",m).style("fill","none").style("stroke",o||"#136AA4").style("stroke-width",i||2))}),[t,n,r]),c.a.createElement("g",{ref:u,className:"line-group"})},be=function(e){var t=e.xScale,n=e.xDomain,r=e.svgContainerData,a=e.onHover,o=Object(l.useRef)(),i=Object(l.useRef)(),u=function(e){i.current=e,s(),a(e)},s=function(){var e=Object(de.j)(o.current).select("line"),t=i.current?1:0,n=i.current?i.current.xPosition:0;e.attr("x1",n).attr("x2",n).style("opacity",t)},m=function(e){var a=r.dimension.width,o="bandwidth"in t?t.bandwidth()/2:0;if(e<o||e>a-o){var i=e<o?0:n.length-1,l=n[i];return{index4ItemOnHover:i,xPosition:"bandwidth"in t?t(l)+o:t(+l)}}for(var c=-1,u=0,s=0,m=n.length;s<m;s++){var f=n[s],d="bandwidth"in t?t(f)+o:t(+f),p=n[s+1]?s+1:s,h=n[p],v="bandwidth"in t?t(h)+o:t(+h);if(e>=d&&e<=v){var b=Math.abs(e-d),y=Math.abs(e-v);c=b<y?s:p,u=b<y?d:v;break}}return{index4ItemOnHover:c,xPosition:u}};return Object(l.useEffect)((function(){var e,t;r&&(e=r.dimension.height,(t=Object(de.j)(o.current)).selectAll("line").size()||t.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",e).style("opacity",0).attr("stroke-width",.5).attr("stroke","rgba(20,106,164,.5)").style("fill","none"),function(){var e=r.dimension,t=e.height,n=e.width,a=Object(de.j)(o.current);a.selectAll("rect").remove(),a.append("rect").attr("width",n).attr("height",t).attr("fill","rgba(0,0,0,0)").on("mouseleave",(function(){u(null)})).on("mousemove",(function(){var e=Object(de.f)(this)[0];u(m(e))}))}())}),[r]),c.a.createElement("g",{className:"pointer-event-overlay-group",ref:o})},ye=function(e){var t=e.margin,n=void 0===t?pe:t,r=e.resizable,a=e.dimensionOnChange,o=e.children,i=Object(l.useRef)(),u=Object(l.useRef)(),s=Object(l.useRef)(),m=Object(l.useRef)(),d=c.a.useState(),p=f()(d,2),h=p[0],v=p[1],b=function(){var e=Object(de.j)(u.current).node(),t=Object(de.j)(s.current).node(),r=i.current,o=r.offsetWidth-n.left-n.right,l=r.offsetHeight-n.top-n.bottom;m.current={height:l,width:o},a&&a(m.current),v({svg:e,rootGroup:t,margin:n,dimension:m.current})};return Object(l.useEffect)((function(){b()}),[]),Object(l.useLayoutEffect)((function(){return r&&window.addEventListener("resize",b),function(){window.removeEventListener("resize",b)}}),[]),c.a.createElement("div",{ref:i,style:{position:"relative",width:"100%",height:"100%"}},c.a.createElement("svg",{ref:u,style:{width:"100%",height:"100%"}},c.a.createElement("g",{ref:s,style:{transform:"translate(".concat(n.left,"px, ").concat(n.top,"px)")}},h?c.a.Children.map(o,(function(e){return c.a.cloneElement(e,{svgContainerData:h})})):null)))},ge=function(e){var t=e.dimension,n=e.pointerPosition,r=e.data4Bars,a=e.data4Line,o=e.margin,i=void 0===o?pe:o,u=c.a.useRef(),s=c.a.useState({top:0,left:0}),m=f()(s,2),d=m[0],p=m[1];return Object(l.useEffect)((function(){n&&function(){var e=u.current;if(e){var r=t.width,a=e.offsetWidth,o=-(e.offsetHeight-i.top),l=n.xPosition+i.left,c=l+a/2>=r+i.left?l-a:l-a/2;c=c>=i.left?c:i.left,p({top:o,left:c})}}()}),[n]),c.a.createElement("div",{ref:u,style:{display:n?"block":"none",position:"absolute",left:"".concat(d.left,"px"),top:"".concat(d.top,"px"),pointerEvents:"none",boxSizing:"border-box",boxShadow:"0 0 10px 2px ".concat("#rgba(0,0,0,.25)"),zIndex:5}},c.a.createElement(xe,{index4ItemOnHover:n?n.index4ItemOnHover:-1,barDataOnHover:n&&r?r[n.index4ItemOnHover]:void 0,lineDataOnHover:n&&a?a[n.index4ItemOnHover]:void 0}))},xe=function(e){e.index4ItemOnHover;var t=e.barDataOnHover,n=e.lineDataOnHover;return c.a.createElement("div",{className:"font-size--1 avenir-bold",style:{padding:".5rem",background:"rgba(3, 26, 57, 0.9)",color:"#fff"}},c.a.createElement("div",null,c.a.createElement("span",{className:"text-theme-color-orange"},"Local: ",t?t.value:"n/a","%"),c.a.createElement("br",null),c.a.createElement("span",{className:"text-theme-color-blue"},"National: ",n?n.value:"n/a","%")))},Ee=function(e){var t=e.scale,n=e.svgContainerData,r=e.tickValues,a=e.timeFormatSpecifier,o=Object(l.useContext)(j).months,i=a?Object(de.k)(a):null;return Object(l.useEffect)((function(){n&&function(){var e=n.rootGroup,a=n.dimension.height,l=null;l=Object(de.a)(t),r&&l.tickValues(r),i&&l.tickFormat((function(e){var t=new Date(+e);return i(t)})),l.tickFormat((function(e){var t=o[e].split(" "),n=f()(t,2),r=n[0],a=n[1],i=r.slice(0,3);return"Jan"===i?a:i}));var c=Object(de.j)(e).selectAll(".x.axis");if(c.size())c.attr("transform","translate(0,".concat(a,")")).call(l);else{Object(de.j)(e).append("g").attr("class","x axis").attr("transform","translate(0,".concat(a,")")).call(l);var u=Object(de.j)(e).select(".x.axis");u.selectAll(".domain, .tick line").attr("stroke","rgba(20,106,164,.5)"),u.selectAll(".tick text").style("fill","#136AA4")}}()}),[t,n]),null},we=function(e){var t=e.scale,n=e.svgContainerData;return Object(l.useEffect)((function(){n&&function(){var e=n.rootGroup,r=Object(de.b)(t).ticks(3).tickPadding(5),a=Object(de.j)(e).selectAll(".y.axis");if(a.size())a.call(r);else{Object(de.j)(e).append("g").attr("class","y axis").call(r);var o=Object(de.j)(e).select(".y.axis");o.selectAll(".domain, .tick line").attr("stroke","rgba(20,106,164,.5)"),o.selectAll(".tick text").style("fill","#136AA4")}}()}),[t,n]),null},je=function(e){var t=e.data4Bars,n=void 0===t?[]:t,r=e.data4Line,a=void 0===r?[]:r,o=e.barColor,i=e.lineColor,u=e.lineWidth,s=e.margin,m=e.timeFormatSpecifier,d=e.numOfTicksOnXAxisToHide,p=e.resizable,h=void 0===p||p,b=Object(l.useState)({height:0,width:0}),y=f()(b,2),g=y[0],x=y[1],E=Object(l.useState)(),w=f()(E,2),j=w[0],O=w[1],M=Object(l.useMemo)((function(){return n.length||a.length?(n&&n.length?v()(n):v()(a)).map((function(e){return"number"==typeof e.key?e.key.toString():e.key})):[]}),[n,a]),S=Object(l.useMemo)((function(){var e=g.width;if(n&&n.length)return Object(de.g)().paddingInner(.9).range([0,e]).domain(M);var t=+a[0].key,r=Object(de.e)(a,(function(e){return+e.key}));return m?Object(de.i)().range([0,e]).domain([t,r]):Object(de.h)().range([0,e]).domain([t,r])}),[g,M]),P=Object(l.useMemo)((function(){var e=g.height,t=n&&n.length?Object(de.e)(n,(function(e){return e.value})):0,r=a&&a.length?Object(de.e)(a,(function(e){return e.value})):void 0,o=Object(de.e)([t,r]);return Object(de.h)().range([e,0]).domain([0,o])}),[g,n,a]),k=Object(l.useMemo)((function(){if(d&&!(d<=1))return n.map((function(e){return e.key})).filter((function(e,t){return!(t%d)}))}),[n]);return c.a.createElement("div",{style:{position:"relative",width:"100%",height:"100%",boxSizing:"border-box"}},c.a.createElement(ye,{margin:s,resizable:h,dimensionOnChange:x},n&&n.length?c.a.createElement(he,{data:n,xScale:S,yScale:P,color:o}):c.a.createElement(c.a.Fragment,null),a&&a.length?c.a.createElement(ve,{data:a,xScale:S,yScale:P,color:i,width:u}):c.a.createElement(c.a.Fragment,null),c.a.createElement(Ee,{scale:S,timeFormatSpecifier:m,tickValues:k}),c.a.createElement(we,{scale:P}),c.a.createElement(be,{xDomain:M,xScale:S,onHover:O})),c.a.createElement(ge,{pointerPosition:j,dimension:g,data4Bars:n,data4Line:a,margin:s}))},Oe=function(e,t){return e.map((function(e,t){return{key:t,value:e}}))},Me=function(e){var t=e.data,n=Object(l.useContext)(j),r=n.unemploymentDataByFIPS,a=(n.months,Object(l.useMemo)((function(){var e=r[0].PctUnemployed;return Oe(e)}),[r])),o=Object(l.useMemo)((function(){var e=t.PctUnemployed;return Oe(e)}),[t]);return c.a.createElement("div",{style:{position:"relative",flexGrow:1}},c.a.createElement("div",{className:"text-right",style:{position:"absolute",top:".25rem",right:"1rem"}},c.a.createElement(J,{color:"orange",size:"small"},"Local Unemployment"),c.a.createElement("br",null),c.a.createElement(J,{color:"blue",size:"small"},"National Unemployment")),c.a.createElement(je,{data4Bars:o,data4Line:a}))};function Se(){var e=T()(["\n    position: absolute;\n    top: 0.5rem;\n    right: 0.5rem;\n    cursor: pointer;\n\n    svg {\n        stroke: ",";\n        fill: ",";\n    }\n"]);return Se=function(){return e},e}function Pe(){var e=T()(["\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 250px;\n    display: flex;\n    box-sizing: border-box;\n    background: linear-gradient(\n        to top,\n        "," 0%,\n        "," 80%,\n        rgba(0, 0, 0, 0) 100%\n    );\n    padding: 1rem 2rem;\n    /* box-shadow: 0 0 10px 2px #156aa4; */\n    z-index: 5;\n\n    @media (max-width: ","px) {\n        top: 0;\n        bottom: 0;\n        height: unset;\n        flex-direction: column;\n        overflow-y: auto;\n\n        background: ",";\n    }\n"]);return Pe=function(){return e},e}var ke=V.a.div(Pe(),"rgba(3, 26, 57, 0.9)","rgba(3, 26, 57, 0.9)",767,"rgba(3, 26, 57, 0.9)"),Ce=V.a.div(Se(),"#136AA4","#136AA4"),Le=function(e){var t=e.data,n=e.close;return t?c.a.createElement(ke,{className:"animate-fade-in"},c.a.createElement(te,{data:t}),c.a.createElement(fe,{data:t}),c.a.createElement(Me,{data:t}),c.a.createElement(Ce,{onClick:n},c.a.createElement("svg",{height:"32",width:"32",viewBox:"0 0 32 32",className:""},c.a.createElement("path",{d:"M23.985 8.722L16.707 16l7.278 7.278-.707.707L16 16.707l-7.278 7.278-.707-.707L15.293 16 8.015 8.722l.707-.707L16 15.293l7.278-7.278z"})))):null},Fe=function(e){var t=e.queryResult,n=e.mapView,r=Object(l.useState)(),o=f()(r,2),c=o[0],u=o[1],s=function(){var e=i()(a.a.mark((function e(){var t,r,o,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(S.loadModules)(["esri/layers/GraphicsLayer"]);case 3:t=e.sent,r=f()(t,1),o=r[0],i=new o({opacity:.2}),n.map.add(i,0),u(i),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),m=function(){var e=i()(a.a.mark((function e(){var n,r,o,i,l,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(S.loadModules)(["esri/Graphic","esri/geometry/Polygon","esri/symbols/SimpleFillSymbol"]);case 2:n=e.sent,r=f()(n,3),o=r[0],i=r[1],l=r[2],(u=new o({geometry:new i(t.geometry)})).symbol=new l({color:[33,117,160,255]}),c.add(u);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(l.useEffect)((function(){n&&s()}),[n]),Object(l.useEffect)((function(){c&&(c.removeAll(),t&&m())}),[t]),null},ze=function(e){var t=e.url,n=e.outFields,r=e.mapView,o=e.visibleScale,c=e.onSelect,u=Object(l.useRef)(),s=Object(l.useRef)(),m=function(){var e=i()(a.a.mark((function e(){var i,l,c,m;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(S.loadModules)(["esri/layers/FeatureLayer"]);case 3:i=e.sent,l=f()(i,1),c=l[0],m=new c({url:t,minScale:o&&o.min,maxScale:o&&o.max,visible:!0,popupEnabled:!1,outFields:n,opacity:0}),r.map.add(m),r.whenLayerView(m).then((function(e){u.current=m,s.current=e,p()})),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=i()(a.a.mark((function e(t){var o,i,l,m;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=t.event,i=t.where,!(r.scale<u.current.minScale&&r.scale>u.current.maxScale)){e.next=9;break}return i=i||"1=1",l=o?r.toMap(o):null,e.next=7,s.current.queryFeatures({where:i,geometry:l,returnGeometry:!0,outFields:n||["*"]});case 7:m=e.sent,c(m.features&&m.features.length?m.features[0]:void 0);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){r.on("click",(function(e){d({event:e})}))};return Object(l.useEffect)((function(){r&&m()}),[r]),null},Ue=function(e){var t=e.data,n=e.nationalLevelData,r=e.showDeviation,o=e.color,c=e.referenceLineColor,u=e.visibleScale,s=e.mapView,m=Object(l.useRef)(),d=Object(l.useRef)(),p=Object(l.useState)(!1),h=f()(p,2),v=h[0],b=h[1],y=function(){var e=i()(a.a.mark((function e(){var t,n,r,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(S.loadModules)(["esri/layers/GraphicsLayer","esri/core/watchUtils"]);case 3:t=e.sent,n=f()(t,2),r=n[0],o=n[1],d.current=new r({minScale:u&&u.min,maxScale:u&&u.max,visible:!1}),s.map.add(d.current),o.whenTrue(s,"stationary",(function(){var e=s.scale<u.min&&s.scale>u.max;b(e)})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=i()(a.a.mark((function e(){var i,l,u,s,p,h,v,b,y,g,x;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=d.current,l=n.features[0].PctUnemployed.path,u=n.frames.PctUnemployed,e.prev=3,e.next=6,Object(S.loadModules)(["esri/symbols/CIMSymbol","esri/Graphic","esri/geometry/Point"]);case 6:s=e.sent,p=f()(s,3),h=p[0],v=p[1],b=p[2],y=t.features,g=t.frames,x=r?g.PctUnemployedDeviation:g.PctUnemployed,function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=800,a=t+n<y.length?t+n:y.length,s=y.slice(t,a),f=s.map((function(e){var t=e.geometry,n=e.PctUnemployed,a=e.PctUnemployedDeviation,i={x:0,y:r?0:-.5},s=r?60:30,m=(r?a:n).path,f=new h({data:{type:"CIMSymbolReference",symbol:{type:"CIMPointSymbol",symbolLayers:[{type:"CIMVectorMarker",anchorPoint:i,anchorPointUnits:"Relative",enable:!0,scaleSymbolsProportionally:!1,respectFrame:!0,size:s,frame:x,markerGraphics:[{type:"CIMMarkerGraphic",geometry:{paths:[m]},symbol:{type:"CIMLineSymbol",symbolLayers:[{type:"CIMSolidStroke",width:1,color:o}]}}]},r?null:{type:"CIMVectorMarker",anchorPoint:i,anchorPointUnits:"Relative",enable:!0,scaleSymbolsProportionally:!1,respectFrame:!0,size:s,frame:u,markerGraphics:[{type:"CIMMarkerGraphic",geometry:{paths:[l]},symbol:{type:"CIMLineSymbol",symbolLayers:[{type:"CIMSolidStroke",width:1,color:c}]}}]},r?{type:"CIMVectorMarker",anchorPoint:i,anchorPointUnits:"Relative",enable:!0,scaleSymbolsProportionally:!1,respectFrame:!0,size:s,frame:x,markerGraphics:[{type:"CIMMarkerGraphic",geometry:{paths:[[[0,0],[x.xmax,0]]]},symbol:{type:"CIMLineSymbol",symbolLayers:[{type:"CIMSolidStroke",width:1,color:c}]}}]}:null]}}});return new v({geometry:new b({latitude:t.y,longitude:t.x}),symbol:f})}));i.addMany(f),t+n<y.length?m.current=setTimeout((function(){e(t+n)}),1):i.visible=!0}(0),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(3);case 20:case"end":return e.stop()}}),e,null,[[3,17]])})));return function(){return e.apply(this,arguments)}}();return Object(l.useEffect)((function(){s&&y()}),[s]),Object(l.useEffect)((function(){d.current&&t&&(d.current.removeAll(),clearTimeout(m.current),v&&g())}),[d,t,r]),Object(l.useEffect)((function(){t&&v&&!d.current.graphics.length&&(clearTimeout(m.current),g())}),[v]),null},Ie=function(e){var t=e.isActive,n=e.onClick,r=e.children,a=t?"#FF8000":"transparent";return c.a.createElement("div",{onClick:n,style:{borderBottom:"3px solid ".concat(a),margin:"0 .5rem",cursor:"pointer"}},r)},He=function(e){var t=e.showDeviation,n=e.onChange;return c.a.createElement("div",{style:{display:"flex",alignItems:"center"}},c.a.createElement(Ie,{isActive:!t,onClick:n},c.a.createElement(J,{color:"orange"},"Local Rate")," ",c.a.createElement(J,{color:"blue"},"& "," National Rate")),c.a.createElement(Ie,{isActive:t,onClick:n},c.a.createElement(J,{color:"orange"},"Local Difference")," ",c.a.createElement(J,{color:"blue"},"from National Rate")))},Ae=function(){return c.a.createElement(N,null)};i()(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(M,null,c.a.createElement(Ae,null))),document.getElementById("root"));case 1:case"end":return e.stop()}}),e)})))()},98:function(e,t,n){}});
//# sourceMappingURL=main.d1bd5592626b975a1113.js.map