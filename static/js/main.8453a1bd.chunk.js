(this.webpackJsonpttr=this.webpackJsonpttr||[]).push([[0],{100:function(e,t,c){},101:function(e,t,c){},102:function(e,t,c){"use strict";c.r(t);var a=c(3),n=c.n(a),s=c(27),i=c.n(s),r=(c(81),c(12)),o=(c(82),c(83),c(58)),l=c.n(o),j=(c(84),c(4));var b=function(e){var t=e.active,c=e.text,a=e.Icon;return Object(j.jsxs)("div",{className:"sidebarOption ".concat(t&&"sidebarOption--active"),children:[Object(j.jsx)("h3",{children:Object(j.jsx)(a,{size:25})}),Object(j.jsx)("h2",{children:c})]})},u=c(62),d=c.n(u),O=c(63),x=c.n(O),m=c(64),p=c.n(m),f=c(118),h=c(46),v=c(65),g=c(47),N=c(61),S=c(35),y=(c.p,c(119)),k=c(37);var w=function(e){var t=e.name,c=e.avatar;return Object(j.jsxs)("div",{className:"sidebar",children:[Object(j.jsx)(l.a,{className:"sidebar__twitterIcon"}),Object(j.jsx)(b,{active:!0,Icon:N.a,text:"Home"}),Object(j.jsx)(b,{Icon:h.a,text:"  Explore"}),Object(j.jsx)(b,{Icon:g.b,text:"Notifications"}),Object(j.jsx)(b,{Icon:d.a,text:"Messages"}),Object(j.jsx)(b,{Icon:S.a,text:"Bookmarks"}),Object(j.jsx)(b,{Icon:x.a,text:"Lists"}),Object(j.jsx)(b,{Icon:p.a,text:"Profile"}),Object(j.jsx)(b,{Icon:v.a,text:"  More"}),Object(j.jsx)(f.a,{variant:"outlined",className:"sidebar__tweet",fullWidth:!0,children:"Tweet"}),Object(j.jsxs)("div",{className:"sidebar-bottom",children:[Object(j.jsx)(y.a,{src:c}),Object(j.jsxs)("h4",{children:[t,Object(j.jsx)("br",{})," ",Object(j.jsxs)("p1",{className:"sm",children:["@",t]})," "]}),Object(j.jsx)(S.c,{obClick:function(){},size:"20px"})]}),Object(j.jsx)("a",{href:"",onclick:"dummy(0);return false;",children:Object(j.jsx)(k.GoogleLogout,{render:function(e){return Object(j.jsx)("button",{className:"logout",onClick:e.onClick,disabled:e.disabled,children:"Log Out"})},clientId:"658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com",buttonText:"Logout",onLogoutSuccess:!0})})]})},I=(c(91),c(41)),T=c.n(I),z=c(53),C=(c(93),c(48)),L=c(66),_=c(67),B=c(33),E=(c(98),B.a.initializeApp({apiKey:"AIzaSyB23QiSgX9TVOyyy2wTATI_FoPe2UQzgbg",authDomain:"twitter-clone-69ba6.firebaseapp.com",projectId:"twitter-clone-69ba6",storageBucket:"twitter-clone-69ba6.appspot.com",messagingSenderId:"766075204483",appId:"1:766075204483:web:ee192ff2fecb3e9e5c7cb6",measurementId:"G-MN25RN4HQY"}).firestore()),F=B.a.storage(),R=(B.a.firestore.FieldValue.serverTimestamp,c(52)),A=c.n(R),D=c(74);function P(e){var t=e.avatar,c=e.name,n=Object(a.useRef)(),s=Object(a.useState)(""),i=Object(r.a)(s,2),o=i[0],l=i[1],b=Object(a.useState)(" "),u=Object(r.a)(b,2),d=u[0],O=u[1],x=Object(a.useState)(""),m=Object(r.a)(x,2),p=m[0],h=m[1],v=Object(a.useState)(""),N=Object(r.a)(v,2),k=(N[0],N[1]),w=Object(a.useState)(""),I=Object(r.a)(w,2),R=(I[0],I[1],Object(a.useState)(0)),A=Object(r.a)(R,2),P=(A[0],A[1]),G="@".concat(c),H=function(){var e=Object(z.a)(T.a.mark((function e(t){var c,a;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(c=t.target.files[0])){e.next=9;break}return a=new FileReader,e.next=5,O(c);case 5:a.onloadend=function(){h(a.result)},a.readAsDataURL(c),e.next=11;break;case 9:O(null),k("Please select an image file");case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=F.ref("images/".concat(d.name));return Object(j.jsx)("div",{className:"tweetbox",children:Object(j.jsxs)("form",{onSubmit:function(e){return e.preventDefault()},children:[Object(j.jsxs)("div",{className:"tweetboxInput",children:[Object(j.jsx)(y.a,{src:t,style:{height:"50px",width:"50px"}}),Object(j.jsx)(D.a,{className:"auto_height",value:o,onChange:function(e){return l(e.target.value)},placeholder:"What's happening?",minRows:3,maxRows:20})]}),Object(j.jsxs)("div",{className:"tweetbox-ico",children:[Object(j.jsxs)("label",{ref:n,htmlFor:"fileinput",children:["  ",Object(j.jsx)(S.b,{size:25,style:{cursor:"pointer"}})," "]}),Object(j.jsx)("input",{onChange:H,className:"tweetBox-imageInput",id:"fileinput",type:"file",style:{display:"none"}}),Object(j.jsx)(C.b,{size:25}),Object(j.jsx)(L.a,{size:25}),Object(j.jsx)(g.a,{size:25}),Object(j.jsx)(_.a,{size:25})]}),Object(j.jsx)("img",{src:p,style:{maxHeight:"350px"}}),Object(j.jsx)(f.a,{onClick:function(){M.put(d).on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;P(t)}),(function(e){k(e)}),Object(z.a)(T.a.mark((function e(){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:E.collection("posts").add({displayname:c,username:G,avatar:t,verification:!1,image:p,text:o,time:B.a.firestore.FieldValue.serverTimestamp(),like:""}),h(null),l("");case 3:case"end":return e.stop()}}),e)}))))},className:"tweetbox-button",children:" Tweet"})]})})}c(100),c.p,c.p;var G=c(70),H=c.n(G),M=c(71),W=c.n(M),V=c(72),Y=c.n(V),J=c(69);function K(e){var t=e.open,c=e.children,a=e.onClose;return t?i.a.createPortal(Object(j.jsxs)("div",{className:"comment-modal-close",children:[Object(j.jsx)("div",{className:" OVERLAY_STYLES"}),Object(j.jsxs)("div",{className:"MODAL_STYLES",children:[Object(j.jsx)(C.a,{onClick:a}),c]})]}),document.getElementById("root")):null}var Q=function(e){var t=e.text,c=e.postusername,a=e.user;return Object(j.jsxs)("div",{className:"combox",children:[Object(j.jsxs)("h5",{children:[" ",a," "]}),Object(j.jsx)("p",{children:c}),Object(j.jsx)("p",{children:t})]})},U=c(68),X=c.n(U),q=function(e){var t=e.name,c=e.postusername,n=(e.avatar,Object(a.useState)([])),s=Object(r.a)(n,2),i=s[0],o=s[1],l=Object(a.useState)([]),b=Object(r.a)(l,2),u=b[0],d=b[1];Object(a.useEffect)((function(){E.collection("comments").orderBy("time","asc").onSnapshot((function(e){return d(e.docs.map((function(e){return e.data()})))})),console.log(u)}),[]);var O=Object(a.useState)(!1),x=Object(r.a)(O,2),m=x[0],p=x[1];return Object(j.jsxs)("div",{children:[Object(j.jsx)(X.a,{fontSize:"small",onClick:function(){return p(!0)}}),Object(j.jsx)(K,{open:m,onClose:function(){return p(!1)},children:Object(j.jsxs)("form",{className:"comment-input",children:[Object(j.jsx)("input",{onChange:function(e){return o(e.target.value)},placeholder:"Tweet your reply",value:i,type:"text"}),Object(j.jsx)("button",{className:"btn",onClick:function(e){e.preventDefault(),E.collection("comments").add({text:i,username:t,poster:c}),alert("Replied to ".concat(c)),o(" "),d(" "),console.log(i)},children:" Reply "})]})}),u.forEach((function(e){return Object(j.jsx)(Q,{text:e.text,username:e.username,postusername:e.poster},e.text)}))]})};function Z(e){var t=e.displayname,c=e.username,n=e.verification,s=e.time,i=e.text,o=e.image,l=e.avatar,b=(e.like,e.name),u=e.avatarr,d=Object(a.useState)(0),O=Object(r.a)(d,2),x=O[0],m=O[1],p=Object(a.useState)(!1),f=Object(r.a)(p,2),h=f[0],v=f[1],g=Object(a.useState)(" "),N=Object(r.a)(g,2),S=(N[0],N[1]);return Object(j.jsxs)("div",{className:"post",children:[Object(j.jsx)("div",{className:"post-avatar",children:Object(j.jsx)(y.a,{src:l})}),Object(j.jsxs)("div",{className:"post-body",children:[Object(j.jsxs)("div",{className:"post-header",children:[Object(j.jsx)("div",{className:"post-header-text",children:Object(j.jsxs)("h3",{children:[" ",t," "," ",Object(j.jsxs)("span",{className:"post__headerSpecial",children:[n&&Object(j.jsx)(J.a,{className:"post__badge"}),c," ",A()(null===s||void 0===s?void 0:s.toDate()).startOf("minute").fromNow()]})]})}),Object(j.jsx)("div",{className:"post-header-description",children:Object(j.jsx)("p",{children:i})})]}),Object(j.jsx)("img",{src:o}),Object(j.jsxs)("div",{className:"post-footer",children:[Object(j.jsx)(q,{name:b,postusername:c}),Object(j.jsx)(H.a,{onClick:function(e){e.preventDefault(),E.collection("posts").add({displayname:b,username:c,avatar:u,image:o,verification:n,text:i,time:s,like:x}),S(" ")},fontSize:"small"}),Object(j.jsx)(W.a,{onClick:function(){v(!0),h?(m(x-1),v(!1)):m(x+1)},fontSize:"small"}),Object(j.jsx)(Y.a,{fontSize:"small"})]}),Object(j.jsx)("div",{className:"move",children:Object(j.jsxs)("p3",{children:[" ",x," "]})})]})]})}c.p,c.p;var $=function(e){var t=e.name,c=e.avatar,n=Object(a.useState)([]),s=Object(r.a)(n,2),i=s[0],o=s[1];return Object(a.useEffect)((function(){E.collection("posts").orderBy("time","desc").onSnapshot((function(e){return o(e.docs.map((function(e){return e.data()})))})),console.log(i)}),[]),Object(j.jsxs)("div",{className:"feed",children:[Object(j.jsx)("div",{className:"feed-header",children:Object(j.jsx)("h2",{children:"Home "})}),Object(j.jsx)(P,{avatar:c,name:t}),i.map((function(e){return Object(j.jsx)(Z,{displayname:e.displayname,username:e.username,verification:e.verification,text:e.text,avatar:e.avatar,image:e.image,time:e.time,like:e.like,name:t,avatarr:c},e.text)})),Object(j.jsx)(Q,{})]})},ee=(c(101),c(49)),te=function(){return Object(j.jsxs)("div",{className:"right",children:[Object(j.jsxs)("div",{className:"right-input",children:[Object(j.jsx)(h.b,{size:"20px",className:"right-search-icon"}),Object(j.jsx)("input",{type:"text",placeholder:"Search Twitter"})]}),Object(j.jsxs)("div",{className:"right-container",children:[Object(j.jsx)("h2",{children:"Trends for you"}),Object(j.jsx)(ee.a,{sourceType:"profile",screenName:"KAKA",options:{height:300}}),Object(j.jsx)(ee.a,{sourceType:"profile",screenName:"liverpoolfc",options:{height:300}}),Object(j.jsx)(ee.b,{tweetId:"1399698641535832068"})]})]})},ce=c.p+"static/media/tt.4882770d.png",ae=c(73);var ne=function(){var e=Object(a.useState)(""),t=Object(r.a)(e,2),c=t[0],n=t[1],s=Object(a.useState)(""),i=Object(r.a)(s,2),o=i[0],l=i[1],b=Object(a.useState)(""),u=Object(r.a)(b,2),d=u[0],O=u[1];function x(e){console.log(e),console.log(e.profileObj),l(e.profileObj.email),n(e.profileObj.name),O(e.profileObj.imageUrl)}return Object(a.useEffect)((function(){E.collection("users").doc().set({username:c,email:o,avatar:d})}),[]),Object(j.jsx)("div",{children:c?Object(j.jsxs)("div",{className:"app",children:[Object(j.jsx)(w,{name:c,avatar:d}),Object(j.jsx)($,{name:c,avatar:d}),Object(j.jsx)(te,{})]}):Object(j.jsxs)("div",{className:"left",children:[Object(j.jsx)("img",{src:ce}),Object(j.jsx)(ae.a,{color:"#00a2ff",size:"40px",className:"ttrico"}),Object(j.jsxs)("h1",{style:{float:"left",marginLeft:"-3%",minWidth:"35%",marginTop:"15%",fontSize:"60px"},children:["Happened Before!",Object(j.jsx)("span",{style:{float:"left",marginTop:"3%",marginLeft:"2%"},children:Object(j.jsx)("p2",{style:{fontSize:"30px"},children:" Join TanTwitter today."})})]}),Object(j.jsx)("div",{className:"login",children:Object(j.jsx)(k.GoogleLogin,{render:function(e){return Object(j.jsx)("button",{className:"loginbtn",onClick:e.onClick,disabled:e.disabled,children:Object(j.jsx)("p",{style:{fontSize:"20px",color:"white"},children:"Log In With Google"})})},clientId:"766075204483-lulb8u6h2g1v0h8kp0gsnirlntf170en.apps.googleusercontent.com",buttonText:"Login With Google",onSuccess:x,onFailure:x,cookiePolicy:"single_host_origin",isSignedIn:!0})})]})})},se=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,120)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,s=t.getLCP,i=t.getTTFB;c(e),a(e),n(e),s(e),i(e)}))};i.a.render(Object(j.jsx)(n.a.StrictMode,{children:Object(j.jsx)(ne,{})}),document.getElementById("root")),se()},81:function(e,t,c){},82:function(e,t,c){},83:function(e,t,c){},84:function(e,t,c){},91:function(e,t,c){},93:function(e,t,c){}},[[102,1,2]]]);
//# sourceMappingURL=main.8453a1bd.chunk.js.map