(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},19:function(e,t,a){e.exports=a(50)},46:function(e,t,a){},48:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(12),s=a(2),o=a.n(s),i=a(4),c=a(13),l=a(14),u=a(17),p=a(15),d=a(18),m=a(5),g=a.n(m),h=(a(46),function(e,t){localStorage.setItem("token",e),localStorage.setItem("expiry",t)}),v=function(){localStorage.removeItem("token"),localStorage.removeItem("expiry")},w=function(){var e=localStorage.getItem("expiry");return!!e&&+new Date(e)>+new Date},f=function(){return{Authorization:"Bearer ".concat(localStorage.getItem("token"))}},S=a(16),b=a.n(S),k=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",isRequesting:!1,isLoggedIn:!1,data:[],error:""},a.handleLogin=Object(i.a)(o.a.mark(function e(){var t,n,r,s,i,c,l;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.state,n=t.email,r=t.password,e.prev=1,a.setState({error:""}),a.setState({isRequesting:!0}),e.next=6,g.a.post("/api/users/login",{email:n,password:r});case 6:s=e.sent,i=s.data,c=i.token,l=i.expiry,h(c,l),a.setState({isLoggedIn:!0}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),a.setState({error:"Something went wrong"});case 15:return e.prev=15,a.setState({isRequesting:!1}),e.finish(15);case 18:case"end":return e.stop()}},e,this,[[1,12,15,18]])})),a.logout=function(){v(),a.setState({isLoggedIn:!1})},a.getTestData=Object(i.a)(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a.setState({error:""}),e.next=4,g.a.get("/api/items",{headers:f()});case 4:t=e.sent,a.setState({data:t.data}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),a.setState({error:"Something went wrong"});case 11:return e.prev=11,a.setState({isRequesting:!1}),e.finish(11);case 14:case"end":return e.stop()}},e,this,[[0,8,11,14]])})),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.setState({isLoggedIn:w()})}},{key:"render",value:function(){var e=this;return n.createElement("div",{className:"App"},n.createElement("header",{className:"App-header"},n.createElement("img",{src:b.a,className:"App-logo",alt:"logo"}),n.createElement("h1",{className:"App-title"},"Welcome to React")),n.createElement("div",{className:"App-error"},this.state.error),this.state.isLoggedIn?n.createElement("div",{className:"App-private"},n.createElement("div",null,"Server test data:",n.createElement("ul",null,this.state.data.map(function(e,t){return n.createElement("li",{key:t},"name: ",e.name," / value: ",e.value)}))),n.createElement("button",{disabled:this.state.isRequesting,onClick:this.getTestData},"Get test data"),n.createElement("button",{disabled:this.state.isRequesting,onClick:this.logout},"Log out")):n.createElement("div",{className:"App-login"},"(try the credentials: testuser@email.com / my-password)",n.createElement("input",{disabled:this.state.isRequesting,placeholder:"email",type:"text",onChange:function(t){return e.setState({email:t.target.value})}}),n.createElement("input",{disabled:this.state.isRequesting,placeholder:"password",type:"password",onChange:function(t){return e.setState({password:t.target.value})}}),n.createElement("button",{disabled:this.state.isRequesting,onClick:this.handleLogin},"Log in")))}}]),t}(n.Component);a(48),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.render(n.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[19,2,1]]]);
//# sourceMappingURL=main.be363888.chunk.js.map