webpackJsonp([7],{"5wnf":function(t,e){},FIrY:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("mvHQ"),i=n.n(s),o={mounted:function(){},data:function(){return{userId:"",userPw:"",LoginMethod:""}},methods:{loging:function(){var t=this;/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]*\.)+[A-Za-z]{2,14}$/.test(this.userId)?this.LoginMethod="?email=":this.LoginMethod="/cellphone?phone=",this.$axios.get("/login"+this.LoginMethod+this.userId+"&password="+this.userPw).then(function(e){t.$router.go(-1),localStorage.setItem("userInfo",i()(e.data.profile))})}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"loging"}},[n("div",{staticClass:"back",on:{click:function(e){return t.$router.go(-1)}}},[n("i",{staticClass:"fa fa-angle-left fa-2x"})]),t._v(" "),n("div",{staticClass:"logingBox"},[n("div",{staticClass:"logingTitle"},[t._v("登入")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入账户"},model:{value:t.userId,callback:function(e){t.userId=e},expression:"userId"}}),t._v(" "),n("el-input",{attrs:{placeholder:"密码",type:"password"},model:{value:t.userPw,callback:function(e){t.userPw=e},expression:"userPw"}}),t._v(" "),n("el-button",{staticClass:"lBtn",attrs:{type:"danger",size:"small",round:""},on:{click:function(e){return t.loging()}}},[t._v("登入")])],1)])},staticRenderFns:[]};var r=n("VU/8")(o,a,!1,function(t){n("5wnf")},"data-v-6105ddb6",null);e.default=r.exports}});
//# sourceMappingURL=7.1cc0bdec8affc5548b9b.js.map