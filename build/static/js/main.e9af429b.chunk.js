(this["webpackJsonpgoogle-bot-front"]=this["webpackJsonpgoogle-bot-front"]||[]).push([[0],{440:function(n,e,t){"use strict";t.r(e);var o=t(52),a=t(0),i=t(14),c=t.n(i),l=t(70),r=t(139),s=t(174),u=t.n(s),d=t(116),f=t.n(d),b=t(313);var p=function(){var n="http://localhost:5000",e=Object(a.useState)([{title:"ClassName",field:"name"},{title:"Url",field:"url"}]),t=Object(r.a)(e,2),i=t[0],c=(t[1],Object(a.useState)([])),s=Object(r.a)(c,2),d=s[0],p=s[1],j=Object(a.useState)([{title:"Day",field:"day",editable:"never"},{title:"9",field:"9",lookup:{none:"none"}},{title:"10",field:"10",lookup:{none:"none"}},{title:"11",field:"11",lookup:{none:"none"}},{title:"12",field:"12",lookup:{none:"none"}},{title:"14",field:"14",lookup:{none:"none"}},{title:"15",field:"15",lookup:{none:"none"}}]),m=Object(r.a)(j,2),O=m[0],g=m[1],y=Object(a.useState)([{day:"Mon",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},{day:"Tue",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},{day:"Wed",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},{day:"Thu",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},{day:"Fri",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"},{day:"Sat",9:"none",10:"none",11:"none",12:"none",14:"none",15:"none"}]),h=Object(r.a)(y,2),v=h[0],w=h[1];return Object(a.useEffect)((function(){var n={};d.forEach((function(e){n[e.url]=e.name})),n.none="none";for(var e=1;e<O.length;e++)O[e].lookup=n;g(Object(l.a)(O))}),[d]),Object(a.useEffect)((function(){f.a.get(n+"/data").then((function(n){p(n.data.classes),n.data.classes.length&&w(n.data.timeTable)}))}),[]),Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(b.a,{onClick:function(){f.a.post(n+"/data",{classData:d,tableData:v})},variant:"contained",color:"primary",style:{margin:"0 10px"},children:"save"}),Object(o.jsx)(b.a,{onClick:function(){f.a.post(n+"/join")},variant:"contained",color:"primary",style:{margin:"0 10px"},children:"join"}),Object(o.jsx)(b.a,{onClick:function(){f.a.post(n+"/leave")},variant:"contained",color:"primary",style:{margin:"0 10px"},children:"leave"}),Object(o.jsx)(b.a,{onClick:function(){f.a.post(n+"/attend")},variant:"contained",color:"primary",style:{margin:"0 10px"},children:"attend"}),Object(o.jsx)(u.a,{title:"Classes",columns:i,data:d,options:{paging:!0,pageSize:6,emptyRowsWhenPaging:!0,pageSizeOptions:[6,12,20,50]},editable:{onRowAdd:function(n){return new Promise((function(e,t){setTimeout((function(){p([].concat(Object(l.a)(d),[n])),e()}),1e3)}))},onRowUpdate:function(n,e){return new Promise((function(t,o){setTimeout((function(){var o=Object(l.a)(d);o[e.tableData.id]=n,p(Object(l.a)(o)),t()}),1e3)}))},onRowDelete:function(n){return new Promise((function(e,t){setTimeout((function(){var t=Object(l.a)(d),o=n.tableData.id;t.splice(o,1),p(Object(l.a)(t)),e()}),1e3)}))}}}),Object(o.jsx)(u.a,{title:"TimeTable",columns:O,data:v,options:{paging:!0,pageSize:6,emptyRowsWhenPaging:!0,pageSizeOptions:[6,12,20,50]},editable:{onRowAdd:function(n){return new Promise((function(e,t){setTimeout((function(){w([].concat(Object(l.a)(v),[n])),e()}),1e3)}))},onRowUpdate:function(n,e){return new Promise((function(t,o){setTimeout((function(){var o=Object(l.a)(v);o[e.tableData.id]=n,w(Object(l.a)(o)),t()}),1e3)}))}}})]})};c.a.render(Object(o.jsx)(p,{}),document.getElementById("root"))}},[[440,1,3]]]);
//# sourceMappingURL=main.e9af429b.chunk.js.map