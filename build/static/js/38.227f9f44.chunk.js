(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[38],{1478:function(e,a,t){"use strict";t.r(a);var n=t(7),c=t(1147),l=t(182),o=t(304),r=t(82),b=t(16),j=t(313),s=t(503),i=t(1203),m=t(704),d=t(1218),u=t(1),O=t.n(u),x=t(2);function p(){var e=O.a.useState("female"),a=Object(b.a)(e,2),t=a[0],n=a[1];return Object(x.jsxs)(j.a,{component:"fieldset",children:[Object(x.jsx)(s.a,{component:"legend",children:"labelPlacement"}),Object(x.jsxs)(i.a,{"aria-label":"position",name:"position",value:t,onChange:function(e){n(e.target.value)},row:!0,children:[Object(x.jsx)(m.a,{value:"top",label:"Top",labelPlacement:"top",control:Object(x.jsx)(d.a,{color:"primary"})}),Object(x.jsx)(m.a,{value:"start",label:"Start",labelPlacement:"start",control:Object(x.jsx)(d.a,{color:"primary"})}),Object(x.jsx)(m.a,{value:"bottom",label:"Bottom",labelPlacement:"bottom",control:Object(x.jsx)(d.a,{color:"primary"})}),Object(x.jsx)(m.a,{value:"end",label:"End",labelPlacement:"end",control:Object(x.jsx)(d.a,{color:"primary"})})]})]})}var h=Object(l.a)("div")((function(e){var a=e.theme;return{display:"flex","& .formControl":{marginRight:a.spacing(3),marginLeft:a.spacing(3)},"& .group":{margin:a.spacing(1,0)}}}));function v(){var e=O.a.useState("female"),a=Object(b.a)(e,2),t=a[0],n=a[1];return Object(x.jsx)(h,{children:Object(x.jsxs)(j.a,{component:"fieldset",className:"formControl",children:[Object(x.jsx)(s.a,{component:"legend",children:"Gender"}),Object(x.jsxs)(i.a,{value:t,name:"gender1",className:"group","aria-label":"Gender",onChange:function(e){n(e.target.value)},children:[Object(x.jsx)(m.a,{value:"female",control:Object(x.jsx)(d.a,{}),label:"Female"}),Object(x.jsx)(m.a,{value:"male",control:Object(x.jsx)(d.a,{}),label:"Male"}),Object(x.jsx)(m.a,{value:"other",control:Object(x.jsx)(d.a,{}),label:"Other"}),Object(x.jsx)(m.a,{value:"disabled",disabled:!0,control:Object(x.jsx)(d.a,{}),label:"(Disabled option)"})]})]})})}var g=t(1307),f=t.n(g),k=t(1306),P=t.n(k),C=t(303),S=t(79),B=Object(l.a)(d.a)((function(){return{color:S.a[400],"&$checked":{color:S.a[600]}}}));function w(){var e=O.a.useState("a"),a=Object(b.a)(e,2),t=a[0],n=a[1];function c(e){n(e.target.value)}return Object(x.jsxs)(C.a,{children:[Object(x.jsx)(d.a,{value:"a",onChange:c,name:"radio-button-demo",checked:"a"===t,inputProps:{"aria-label":"A"}}),Object(x.jsx)(d.a,{value:"b",onChange:c,name:"radio-button-demo",checked:"b"===t,inputProps:{"aria-label":"B"}}),Object(x.jsx)(B,{value:"c",color:"default",onChange:c,name:"radio-button-demo",checked:"c"===t,inputProps:{"aria-label":"C"}}),Object(x.jsx)(d.a,{value:"d",color:"default",onChange:c,name:"radio-button-demo",checked:"d"===t,inputProps:{"aria-label":"D"}}),Object(x.jsx)(d.a,{value:"e",color:"default",onChange:c,name:"radio-button-demo",checked:"e"===t,inputProps:{"aria-label":"E"},icon:Object(x.jsx)(P.a,{fontSize:"small"}),checkedIcon:Object(x.jsx)(f.a,{fontSize:"small"})})]})}var y=Object(l.a)("div")((function(e){var a,t=e.theme;return a={margin:"30px"},Object(n.a)(a,t.breakpoints.down("sm"),{margin:"16px"}),Object(n.a)(a,"& .breadcrumb",Object(n.a)({marginBottom:"30px"},t.breakpoints.down("sm"),{marginBottom:"16px"})),a}));a.default=function(){return Object(x.jsxs)(y,{children:[Object(x.jsx)(o.a,{className:"breadcrumb",children:Object(x.jsx)(r.a,{routeSegments:[{name:"Material",path:"/material"},{name:"Radio"}]})}),Object(x.jsxs)(c.a,{spacing:3,children:[Object(x.jsx)(r.m,{title:"Simple Radio Button",children:Object(x.jsx)(v,{})}),Object(x.jsx)(r.m,{title:"Standalone Radio Button",children:Object(x.jsx)(w,{})}),Object(x.jsx)(r.m,{title:"Label Placement",children:Object(x.jsx)(p,{})})]})]})}}}]);