(function(e){function t(t){for(var n,a,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)a=s[l],o[a]&&d.push(o[a][0]),o[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,a=1;a<r.length;a++){var s=r[a];0!==o[s]&&(n=!1)}n&&(i.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},a={app:0},o={app:0},i=[];function s(e){return c.p+"js/"+({editor:"editor"}[e]||e)+"."+{editor:"ef83f92a"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.e=function(e){var t=[],r={editor:1};a[e]?t.push(a[e]):0!==a[e]&&r[e]&&t.push(a[e]=new Promise(function(t,r){for(var n="css/"+({editor:"editor"}[e]||e)+"."+{editor:"4c6522d3"}[e]+".css",o=c.p+n,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var u=i[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===o))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===n||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");i.request=n,delete a[e],f.parentNode.removeChild(f),r(i)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)}).then(function(){a[e]=0}));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(e),u=function(t){l.onerror=l.onload=null,clearTimeout(d);var r=o[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+n+": "+a+")");i.type=n,i.request=a,r[1](i)}o[e]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"01ba":function(e,t,r){"use strict";var n=r("fc9a"),a=r.n(n);a.a},"2ade":function(e,t,r){"use strict";r("96cf");var n=r("1da1"),a=(r("cadf"),r("551c"),r("097d"),r("c0d6")),o="https://inlineweb.herokuapp.com/";t["a"]=function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,i=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=i.length>1&&void 0!==i[1]?i[1]:"GET",n=i.length>2?i[2]:void 0,e.next=4,fetch(o+t,{method:r,body:JSON.stringify(n),headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(a["a"].state.token)}});case 4:return e.next=6,e.sent.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},"2d10":function(e,t,r){"use strict";var n=r("5c8c"),a=r.n(n);a.a},"41cb":function(e,t,r){"use strict";r("cadf"),r("551c"),r("097d");var n=r("2b0e"),a=r("8c4f"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("section",{staticClass:"home"},[r("projects")],1)])},i=[],s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"wrapper"},[r("div",{staticClass:"projects"},e._l(e.projects.data,function(t,n){return r("project",{key:n,attrs:{title:t.title||"Untitled",img:"https://via.placeholder.com/390x250?text="+t.title,date:e._f("eurodate")(t.created_at),author:t.user.name,uuid:t.uuid}})}),1),r("paginate",{attrs:{"page-count":e.projects.last_page||0,"click-handler":e.getProjects,"page-range":4,"prev-text":"Prev","next-text":"Next","container-class":"paginate"}})],1)},c=[],u=(r("96cf"),r("1da1")),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("router-link",{staticClass:"project",attrs:{tag:"a",to:e.projectUrl}},[r("div",{staticClass:"text"},[r("div",{staticClass:"top"},[e._v(e._s(e._f("truncate")(e.title,34)))]),r("div",{staticClass:"bottom"},[e._v(e._s(e.author)+" • "),r("span",{staticClass:"date"},[e._v(e._s(e.date))])])]),r("div",{staticClass:"thumbnail-container"},[r("div",{staticClass:"thumbnail"},[r("iframe",{attrs:{src:"http://localhost:8000/p/"+e.uuid,frameborder:"0"}})])])])},d=[],f={name:"project",props:["img","title","date","author","uuid"],computed:{projectBg:function(){return{backgroundImage:"url('".concat(this.img,"')")}},projectUrl:function(){return"/editor/".concat(this.uuid)}}},p=f,m=(r("46bd"),r("2877")),v=Object(m["a"])(p,l,d,!1,null,"71ab9ddd",null);v.options.__file="ProjectPreview.vue";var h=v.exports,g=r("2ade"),b={name:"projects",props:["userid"],data:function(){return{projects:[]}},components:{project:h},methods:{getProjects:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(g["a"])("api/projects/?page=".concat(t));case 2:r=e.sent,this.projects=r;case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),getUserProjects:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(g["a"])("api/projects/user/".concat(this.userid,"?page=").concat(t));case 2:r=e.sent,this.$emit("total",r.total),this.projects=r;case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},mounted:function(){this.userid?this.getUserProjects(1):this.getProjects(1)}},_=b,w=(r("92b8"),Object(m["a"])(_,s,c,!1,null,"37f89b70",null));w.options.__file="Projects.vue";var j=w.exports,x={name:"home",components:{Projects:j}},y=x,C=(r("a5bd"),Object(m["a"])(y,o,i,!1,null,"a2df584c",null));C.options.__file="Home.vue";var k=C.exports,E=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("custom-form",{attrs:{inputs:e.inputs,button:"Log In",link:e.link},on:{submit:e.formSubmit}})],1)},O=[],L=(r("7f7f"),r("ac6a"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("form",{on:{submit:function(t){return t.preventDefault(),e.formSubmit(t)}}},[r("div",{staticClass:"form-item"},[e.formError?r("div",{staticClass:"error"},[e._v(e._s(e.formError))]):e._e()]),e._l(e.inputs,function(t){return r("div",{key:t.name,staticClass:"form-item"},[r("label",{class:{warning:e.errors.has(t.name)},attrs:{for:t.name}},[e._v("\n        "+e._s(e._f("capitalize")(t.placeholder||t.name))+"\n      ")]),"checkbox"===t.type?r("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"input.model"},{name:"validate",rawName:"v-validate",value:t.validation,expression:"input.validation"}],ref:t.name,refInFor:!0,class:{warning:e.errors.has(t.name)},attrs:{name:t.name,placeholder:e._f("capitalize")(t.placeholder||t.name),"data-vv-as":t.vvas,type:"checkbox"},domProps:{checked:Array.isArray(t.model)?e._i(t.model,null)>-1:t.model},on:{change:function(r){var n=t.model,a=r.target,o=!!a.checked;if(Array.isArray(n)){var i=null,s=e._i(n,i);a.checked?s<0&&e.$set(t,"model",n.concat([i])):s>-1&&e.$set(t,"model",n.slice(0,s).concat(n.slice(s+1)))}else e.$set(t,"model",o)}}}):"radio"===t.type?r("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"input.model"},{name:"validate",rawName:"v-validate",value:t.validation,expression:"input.validation"}],ref:t.name,refInFor:!0,class:{warning:e.errors.has(t.name)},attrs:{name:t.name,placeholder:e._f("capitalize")(t.placeholder||t.name),"data-vv-as":t.vvas,type:"radio"},domProps:{checked:e._q(t.model,null)},on:{change:function(r){e.$set(t,"model",null)}}}):r("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"input.model"},{name:"validate",rawName:"v-validate",value:t.validation,expression:"input.validation"}],ref:t.name,refInFor:!0,class:{warning:e.errors.has(t.name)},attrs:{name:t.name,placeholder:e._f("capitalize")(t.placeholder||t.name),"data-vv-as":t.vvas,type:t.type},domProps:{value:t.model},on:{input:function(r){r.target.composing||e.$set(t,"model",r.target.value)}}}),r("div",{staticClass:"error"},[e._v(e._s(e.errors.first(t.name)))])])}),r("div",{staticClass:"form-item with-margin"},[r("button",{attrs:{type:"submit",disabled:e.errors.all().length>0}},[e._v("\n        "+e._s(e.button)+"\n      ")]),e.link?r("a",{attrs:{href:"#"}},[e._v(e._s(e.link.text))]):e._e()])],2)])}),T=[],P=r("81f6"),S={name:"register",props:{inputs:Array,button:String,link:Object},data:function(){return{formError:""}},methods:{formSubmit:function(){var e=this;this.formError="",this.$validator.validateAll().then(function(t){t&&e.$emit("submit",e.inputs)})},setError:function(e){this.formError=e}},created:function(){P["a"].$on("form-error",this.setError)},beforeDestroy:function(){P["a"].$off("form-error",this.setError)}},A=S,R=(r("2d10"),Object(m["a"])(A,L,T,!1,null,"553cac02",null));R.options.__file="Form.vue";var M=R.exports,U={name:"login",components:{"custom-form":M},data:function(){return{inputs:[{name:"email",type:"text",validation:"required|email|min:3|max:15",model:""},{name:"password",type:"password",validation:"required|min:6|max:25",model:""}],link:{text:"Forgot password?"},error:"test"}},methods:{formSubmit:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:r={},t.forEach(function(e){r[e.name]=e.model,e.model=""}),this.$store.dispatch("login",{email:r.email,password:r.password});case 3:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}},N=U,I=Object(m["a"])(N,E,O,!1,null,null,null);I.options.__file="Login.vue";var Z=I.exports,q=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("custom-form",{attrs:{inputs:e.inputs,button:"Register"},on:{submit:e.formSubmit}})],1)},z=[],B={name:"register",components:{"custom-form":M},data:function(){return{inputs:[{name:"email",type:"email",validation:"required|email",model:""},{name:"login",type:"text",validation:"required|alpha_dash|min:3|max:15",model:""},{name:"password",type:"password",validation:"required|min:6|max:25",model:""},{name:"password2",placeholder:"Confirm password",type:"password",validation:"required|confirmed:password",vvas:"password",model:""}]}},methods:{formSubmit:function(e){var t={};e.forEach(function(e){t[e.name]=e.model,e.model=""}),this.$store.dispatch("register",{email:t.email,name:t.login,password:t.password})}}},H=B,F=Object(m["a"])(H,q,z,!1,null,null,null);F.options.__file="Register.vue";var D=F.exports,J=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[e.user?r("div",{staticClass:"user"},[r("div",{staticClass:"avatar",domProps:{innerHTML:e._s(e.avatar)}}),r("div",{staticClass:"text"},[r("div",{staticClass:"username"},[e._v("\n        "+e._s(e.user.name)+"\n      ")]),r("div",{staticClass:"created"},[e._v("\n        Registration date: "+e._s(e._f("eurodate")(this.user.created_at))+"\n      ")]),r("div",{staticClass:"projects"},[e._v("This user has "+e._s(e.total)+" project"+e._s(e.multipleLetter))])]),e.userId?e._e():r("a",{staticClass:"logout",on:{click:e.logout}},[e._v("Logout")])]):e._e(),r("projects",{attrs:{userid:e.user.id},on:{total:e.getTotal}})],1)},G=[],Y=r("5934"),K=r.n(Y),Q={name:"user",components:{Projects:j},data:function(){return{total:0}},computed:{user:function(){return this.$store.state.user},userId:function(){return this.$route.params.id},avatar:function(){return K.a.toSvg(this.user.name,200)},multipleLetter:function(){return this.total>1?"s":""}},mounted:function(){this.user||this.userId||this.route.push("/")},methods:{logout:function(){this.$store.dispatch("logout")},getTotal:function(e){this.total=e}}},V=Q,W=(r("5e3b"),Object(m["a"])(V,J,G,!1,null,"762c2f95",null));W.options.__file="User.vue";var X=W.exports,$=r("c0d6");n["a"].use(a["a"]);var ee=function(e,t,r){$["a"].state.user?r("/"):r()};t["a"]=new a["a"]({mode:"history",routes:[{path:"/",name:"home",component:k},{path:"/login",name:"login",component:Z,beforeEnter:ee},{path:"/register",name:"register",component:D,beforeEnter:ee},{path:"/user/:id?",name:"user",component:X},{path:"/editor/:id?",name:"editor",component:function(){return r.e("editor").then(r.bind(null,"49d7"))}}]})},"46bd":function(e,t,r){"use strict";var n=r("e931"),a=r.n(n);a.a},"4fe4":function(e,t,r){"use strict";var n=r("6262"),a=r.n(n);a.a},5265:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("28a5"),r("6b54"),r("cadf"),r("551c"),r("097d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("Header"),r("router-view"),r("Error")],1)},o=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("header",{attrs:{id:"header"}},[r("div",{staticClass:"left"},[r("router-link",{staticClass:"logo",attrs:{to:"/"}},[r("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"45",height:"45",viewBox:"0 0 200 200",preserveAspectRatio:"xMidYMid meet"}},[r("path",{attrs:{fill:"#2e8c84",d:"M100 16L100 58L79 58ZM142 58L100 58L100 37ZM100 184L100 142L121 142ZM58 142L100 142L100 163ZM58 58L58 100L37 100ZM184 100L142 100L142 79ZM142 142L142 100L163 100ZM16 100L58 100L58 121Z"}}),r("path",{attrs:{fill:"#59c7be",d:"M100 58L100 91L79 58ZM142 100L109 100L142 79ZM100 142L100 109L121 142ZM58 100L91 100L58 121Z"}})])]),e.notInEditor?e._e():r("div",{staticClass:"editorTitle"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.editorTitle,expression:"editorTitle"}],attrs:{type:"text"},domProps:{value:e.editorTitle},on:{keyup:function(t){e.editorChanges=!0},input:function(t){t.target.composing||(e.editorTitle=t.target.value)}}})])],1),r("div",{staticClass:"right"},[e.user?r("div",[e.notInEditor?r("router-link",{staticClass:"btn new",attrs:{to:"/editor"}},[e._v("\n        New Project\n      ")]):r("button",{directives:[{name:"show",rawName:"v-show",value:!e.editorAuthor||e.editorAuthor===e.user.name,expression:"!editorAuthor || editorAuthor === user.name"}],staticClass:"btn new",class:{focus:e.editorChanges},attrs:{to:"/editor"},on:{click:e.saveProject}},[e._v("\n        Save\n      ")]),r("router-link",{staticClass:"profile",attrs:{to:"/user"}},[r("span",{staticClass:"avatar",domProps:{innerHTML:e._s(e.avatar)}}),r("div",{staticClass:"text"},[e._v(e._s(e.user.name))])])],1):r("div",[r("router-link",{staticClass:"btn",attrs:{to:"/login"}},[e._v("Log In")]),r("router-link",{staticClass:"btn focus",attrs:{to:"/register"}},[e._v("Register")])],1)])])},s=[],c=(r("7f7f"),r("5934")),u=r.n(c),l=r("81f6"),d={data:function(){return{editorChanges:!1}},computed:{user:function(){return this.$store.state.user},avatar:function(){return u.a.toSvg(this.user.name,35)},route:function(){return this.$route.name},notInEditor:function(){return"editor"!==this.route},editorTitle:{get:function(){return this.$store.state.editorTitle},set:function(e){this.$store.commit("updateEditorTitle",e)}},editorAuthor:function(){return this.$store.state.editorAuthor}},methods:{writeEditorChanges:function(e){this.editorChanges=e},saveProject:function(){l["a"].$emit("save-project")}},mounted:function(){l["a"].$on("editor-new-change",this.writeEditorChanges)},beforeDestroy:function(){l["a"].$off("editor-new-change",this.writeEditorChanges)}},f=d,p=(r("4fe4"),r("2877")),m=Object(p["a"])(f,i,s,!1,null,"549c36d8",null);m.options.__file="Header.vue";var v=m.exports,h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.visible?r("div",{staticClass:"error-msg",class:e.color},[r("span",{staticClass:"brief"},[e._v(e._s(e.brief)+": ")]),r("span",{staticClass:"message"},[e._v(e._s(e.message))]),r("div",{staticClass:"close",on:{click:function(t){e.visible=!1}}})]):e._e()},g=[],b={name:"error",data:function(){return{visible:!1,brief:"",message:"",color:""}},created:function(){var e=this;l["a"].$on("error",function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Error",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Undefined error occurred";e.brief=t,e.message=r,e.visible=!0,e.color="red";var n=e;setTimeout(function(){n.visible=!1},7e3)}),l["a"].$on("success",function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Success",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Action is successfully completed";e.brief=t,e.message=r,e.visible=!0,e.color="green";var n=e;setTimeout(function(){n.visible=!1},7e3)})}},_=b,w=(r("01ba"),Object(p["a"])(_,h,g,!1,null,"bf5a0ee0",null));w.options.__file="Error.vue";var j=w.exports;r("b5bf");var x={components:{Header:v,Error:j},created:function(){this.$store.state.token&&this.$store.dispatch("getUser")}},y=x,C=(r("5c0b"),Object(p["a"])(y,a,o,!1,null,null,null));C.options.__file="App.vue";var k=C.exports,E=r("41cb"),O=r("c0d6"),L=r("ce04"),T=r.n(L),P=r("8832"),S=r.n(P),A=r("7bb1");n["a"].use(T.a),n["a"].component("paginate",S.a),n["a"].use(A["a"]),n["a"].filter("capitalize",function(e){return e?(e=e.toString(),e.charAt(0).toUpperCase()+e.slice(1)):""}),n["a"].filter("eurodate",function(e){return e?(e=e.toString(),e.split(" ")[0].split("-").reverse().join(".")):""}),n["a"].config.productionTip=!1,new n["a"]({router:E["a"],store:O["a"],render:function(e){return e(k)}}).$mount("#app")},"5c0b":function(e,t,r){"use strict";var n=r("5e27"),a=r.n(n);a.a},"5c8c":function(e,t,r){},"5e27":function(e,t,r){},"5e3b":function(e,t,r){"use strict";var n=r("fcd0"),a=r.n(n);a.a},6262:function(e,t,r){},"81f6":function(e,t,r){"use strict";r.d(t,"a",function(){return a});var n=r("2b0e"),a=new n["a"]},"92b8":function(e,t,r){"use strict";var n=r("5265"),a=r.n(n);a.a},a5bd:function(e,t,r){"use strict";var n=r("fef5"),a=r.n(n);a.a},c0d6:function(e,t,r){"use strict";r("ac6a"),r("8615"),r("7f7f"),r("96cf");var n=r("1da1"),a=(r("cadf"),r("551c"),r("097d"),r("2b0e")),o=r("2f62"),i=r("a768"),s=r.n(i),c=r("81f6"),u=r("41cb"),l=r("2ade");a["a"].use(o["a"]),t["a"]=new o["a"].Store({plugins:[s()({namespace:"v0.0.1",initialState:{token:""},expires:6048e5})],state:{},mutations:{setToken:function(e,t){e.token=t},setUser:function(e,t){e.user=t},removeUserData:function(e){e.token=null,e.user=null,u["a"].push("/")},updateEditorTitle:function(e,t){e.editorTitle=t},updateEditorAuthor:function(e,t){e.editorAuthor=t}},actions:{login:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,o,i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,a=t.dispatch,o=r.email,i=r.password,e.next=4,Object(l["a"])("api/auth/login","POST",{email:o,password:i});case 4:s=e.sent.access_token,s?(n("setToken",s),a("getUser"),u["a"].push("/")):c["a"].$emit("form-error","Incorrect username or password.");case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}(),register:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,o,i,s,d;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,a=t.dispatch,o=r.email,i=r.name,s=r.password,e.next=4,Object(l["a"])("api/auth/register","POST",{email:o,name:i,password:s});case 4:d=e.sent,d.token?(n("setToken",d.token),a("getUser"),u["a"].push("/")):c["a"].$emit("form-error",Object.values(d).join(" "));case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}(),getUser:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,Object(l["a"])("api/auth/me","POST");case 3:n=e.sent,"Unauthenticated."!==n.message?r("setUser",n):r("removeUserData");case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),logout:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,Object(l["a"])("api/auth/logout","POST");case 3:if(n=e.sent,"Successfully logged out"!==n.message){e.next=7;break}return e.next=7,r("removeUserData");case 7:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}})},e931:function(e,t,r){},fc9a:function(e,t,r){},fcd0:function(e,t,r){},fef5:function(e,t,r){}});
//# sourceMappingURL=app.eac2c3f5.js.map