webpackJsonp([1,8,10,11],{"7biW":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,n,i,o=s("cVr7"),r=this,c={el:"#animated-number-demo",mounted:function(){console.log("search")},data:function(){return{hotList:[],searchWorld:"",searchList:[],showDetail:!1,searchHistory:[],searchTip:!0,number:0,tweenedNumber:0,dNumber:0}},directives:{focus:{inserted:function(t){t.focus()}}},computed:{animatedNumber:function(){return this.tweenedNumber.toFixed(0)}},watch:{searchWorld:function(){this.debounceSearch(this),""===this.searchWorld&&(this.searchTip=!0)},number:function(t){TweenLite.to(r.$data,.5,{tweenedNumber:t})}},methods:{getData:function(){var t=this;this.$axios.get("/search/hot").then(function(e){var s=localStorage.getItem("searchHistory");null!=s&&(t.searchHistory=s.split(",")),t.searchWorld="",t.hotList=e.data.result.hots})},sollorder:function(){this.detailWrapper=new o.a(this.$refs.page,{click:!0})},debounceSearch:(a=function(t){""!=t.searchWorld?t.getHot():t.searchList=[]},n=1e3,i="",function(t){i&&clearTimeout(i),i=setTimeout(function(){a(t)},n)}),getHot:function(){var t=this;if(this.$axios.get("/search?keywords="+this.searchWorld).then(function(e){t.searchList=e.data.result.songs,t.searchTip=!1,t.$nextTick(function(){t.scroll||(t.scroll=new o.a(t.$refs.page,{}))})}),this.searchHistory.includes(this.searchWorld)){var e=this.searchHistory.indexOf(this.searchWorld);this.searchHistory.splice(e,1)}else this.searchHistory.length>=5&&this.searchHistory.pop();this.searchHistory.reverse(),this.searchHistory.push(this.searchWorld),this.searchHistory.reverse(),localStorage.setItem("searchHistory",this.searchHistory)},toText:function(){}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{staticClass:"wrapper",attrs:{id:"search",name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.showDetail,expression:"showDetail"}],staticClass:"search"},[s("header",{staticClass:"topctrl",style:{background:t.$store.state.zColor}},[s("div",{staticClass:"back",on:{click:function(e){return t.showToggle(1)}}},[s("i",{staticClass:"fa fa-angle-left fa-2x"})]),t._v(" "),s("input",{directives:[{name:"focus",rawName:"v-focus"},{name:"model",rawName:"v-model",value:t.searchWorld,expression:"searchWorld"}],staticClass:"searchInput",attrs:{placeholder:"搜索歌曲、歌手",type:"text"},domProps:{value:t.searchWorld},on:{input:function(e){e.target.composing||(t.searchWorld=e.target.value)}}}),t._v(" "),""!=t.searchWorld?s("i",{staticClass:"el-icon-close back",on:{click:function(e){t.searchWorld=""}}}):t._e()]),t._v(" "),t.searchTip?s("div",{staticClass:"resultsBox addTop"},[s("div",{staticClass:"HS-title"},[t._v("热门搜索")]),t._v(" "),s("div",{staticClass:"hotSearchBox"},t._l(t.hotList,function(e,a){return s("div",{key:a,staticClass:"cellHS",on:{click:function(s){t.searchWorld=e.first}}},[t._v("\n          "+t._s(e.first)+"\n        ")])}),0)]):t._e(),t._v(" "),t.searchTip?s("div",{staticClass:"resultsBox"},[s("div",{staticClass:"HS-title"},[t._v("搜索历史")]),t._v(" "),s("div",{staticClass:"hotSearchBox"},t._l(t.searchHistory,function(e,a){return s("div",{key:a,staticClass:"cellHS",on:{click:function(s){t.searchWorld=e}}},[t._v("\n          "+t._s(e)+"\n        ")])}),0)]):t._e(),t._v(" "),t.searchList.length>=1?s("div",{ref:"page",staticClass:"scrollBox"},[s("div",{staticClass:"SearchResultsBox"},t._l(t.searchList,function(e,a){return s("div",{key:a,staticClass:"SearchResults",on:{click:function(s){return t.playSong(e.id,e.name,e.artists[0].name,e.album.picId)}}},[s("div",{staticClass:"searchName"},[t._v(t._s(e.name))]),t._v(" "),s("div",[t._v(t._s(e.artists[0].name))])])}),0)]):t._e()])])},staticRenderFns:[]};var u=s("VU/8")(c,l,!1,function(t){s("Qbmq")},"data-v-25b42b00",null);e.default=u.exports},Dwlh:function(t,e){},"I/Im":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("zIkb"),n=s("7biW"),i={mounted:function(){},data:function(){return{add1:"",menuEvent:"",searchEvent:""}},components:{leftMenu:a.default,searchS:n.default},created:function(){void 0==sessionStorage.getItem("add1")?this.homeID="home1":this.add1=sessionStorage.getItem("add1")},methods:{topChange:function(t){if(sessionStorage.setItem("add1",t),this.add1=t,"home"==t){var e=sessionStorage.getItem("homeID");null==e&&(e=1),this.$router.push({path:"home"+e})}else this.$router.push({path:t})},geto:function(t){var e=this;"menu"==t?(this.menuEvent=t,this.$nextTick(function(){e.$refs.leftMenu.showToggle(0)})):"search"==t&&(this.searchEvent=t,this.$nextTick(function(){e.$refs.search.showToggle(0)}))}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"pHead",staticClass:"recommend_content",attrs:{id:"pHead"}},[s("div",{staticClass:"homeTabbar",style:{background:t.$store.state.zColor}},[s("div",{staticClass:"m-head"},[s("div",{staticClass:"m-h-btn",on:{click:function(e){return t.geto("menu")}}},[s("i",{staticClass:"fa fa-bars"})]),t._v(" "),s("div",{staticClass:"m-c-btn"},[s("div",{staticClass:"m-h-btn",class:["me"==t.add1?"add1Active":""],attrs:{id:"2"},on:{click:function(e){return t.topChange("me")}}},[s("i",{staticClass:"fa fa-music"})]),t._v(" "),s("div",{staticClass:"m-h-btn",class:["home"==t.add1?"add1Active":""],attrs:{id:"1"},on:{click:function(e){return t.topChange("home")}}},[s("i",{staticClass:"fa fa-star"})]),t._v(" "),s("div",{staticClass:"m-h-btn",class:["video"==t.add1?"add1Active":""],attrs:{id:"3"},on:{click:function(e){return t.topChange("video")}}},[s("i",{staticClass:"fa fa-video-camera"})])]),t._v(" "),s("div",{staticClass:"m-h-btn",on:{click:function(e){return t.geto("search")}}},[s("i",{staticClass:"fa fa-search"})])])]),t._v(" "),t.menuEvent?s("leftMenu",{ref:"leftMenu"}):t._e(),t._v(" "),t.searchEvent?s("searchS",{ref:"search"}):t._e()],1)},staticRenderFns:[]};var r=s("VU/8")(i,o,!1,function(t){s("Dwlh")},"data-v-3774bd48",null).exports,c={mounted:function(){},data:function(){return{homeID:"",ztColor:"#ffb5b0"}},created:function(){null==sessionStorage.getItem("homeID")?this.homeID=1:this.homeID=sessionStorage.getItem("homeID")},methods:{}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"m-ctrl",style:{background:t.$store.state.zColor}},[s("div",{class:[1==t.homeID?"m-ctrl-active":""],attrs:{id:"home1"},on:{click:function(e){return t.toggleTab(1)}}},[t._v("推荐")]),t._v(" "),s("div",{class:[2==t.homeID?"m-ctrl-active":""],attrs:{id:"home2"},on:{click:function(e){return t.toggleTab(2)}}},[t._v("排行")]),t._v(" "),s("div",{class:[3==t.homeID?"m-ctrl-active":""],attrs:{id:"home3"},on:{click:function(e){return t.toggleTab(3)}}},[t._v("歌手")])])])},staticRenderFns:[]};var u=s("VU/8")(c,l,!1,function(t){s("s69V")},"data-v-65861c68",null).exports,h=s("dLYC"),d={data:function(){return{songId:"",playSong:"",playInfo:""}},created:function(){this.pFn.test();var t=sessionStorage.getItem("playInfo");"undefined"!==t&&null!==t&&(this.playInfo=JSON.parse(sessionStorage.getItem("playInfo"))),null==sessionStorage.getItem("themeColor")?this.$store.state.zColor="#ff91b0":this.$store.state.zColor=sessionStorage.getItem("themeColor");JSON.parse(localStorage.getItem("lastPlay"))},components:{Phead:r,"app-tab":u,leftMenu:n.default,musicCtrl:h.default},watch:{$route:function(t,e){var s=t.path.split("/").length,a=e.path.split("/").length;this.transitionName=s<a?"slide-right":"slide-left"}},methods:{}},f={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Phead"),this._v(" "),e("app-tab"),this._v(" "),e("router-view",{staticClass:"child-view",on:{playSong:this.playSong}}),this._v(" "),e("musicCtrl")],1)},staticRenderFns:[]};var v=s("VU/8")(d,f,!1,function(t){s("aQxz")},"data-v-14f4e687",null);e.default=v.exports},Qbmq:function(t,e){},YUkC:function(t,e){},aQxz:function(t,e){},dLYC:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={mounted:function(){},data:function(){return{playEvent:!1}},components:{play:s("m0Mg").default},created:function(){},methods:{playMusic:function(t){console.log("playMusic"),this.playEvent=!this.playEvent},playCtrl:function(){this.$refs.playPage.startPlayOrPause()},nextPlay:function(){this.$refs.playPage.NextSong()}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.audio,expression:"$store.state.audio"}],ref:"playPage",staticClass:"bottomBox",on:{click:function(e){return t.playMusic()}}},[s("img",{staticClass:"BBbg",attrs:{src:t.$store.state.playInfo.bgurl,alt:""}}),t._v(" "),s("div",{staticClass:"BBinfo"},[s("div",[t._v(t._s(t.$store.state.playInfo.name))]),t._v(" "),s("p",[t._v(t._s(t.$store.state.playInfo.art))])]),t._v(" "),t.$store.state.playing?t._e():s("i",{staticClass:"fa fa-play BBbtn flex_cc",on:{click:function(e){return e.stopPropagation(),t.playCtrl()}}}),t._v(" "),t.$store.state.playing?s("i",{staticClass:"fa fa-pause BBbtn flex_cc",on:{click:function(e){return e.stopPropagation(),t.playCtrl(e)}}}):t._e(),t._v(" "),s("i",{staticClass:"fa fa-step-forward BBbtn flex_cc",on:{click:function(e){return e.stopPropagation(),t.nextPlay(e)}}})]),t._v(" "),s("play",{directives:[{name:"show",rawName:"v-show",value:t.playEvent,expression:"playEvent"}],ref:"playPage"})],1)},staticRenderFns:[]};var i=s("VU/8")(a,n,!1,function(t){s("pYBA")},"data-v-59d8bae1",null);e.default=i.exports},pYBA:function(t,e){},s69V:function(t,e){},zIkb:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("r+/8"),n={created:function(){this.getData()},data:function(){return{Menu:!1,userInfo:{nickname:"Avery",avatarUrl:"https://avatars.githubusercontent.com/u/25838726?v=4",backgroundUrl:"https://github.com/reedbf/R-music/raw/master/src/assets/img/menuBg.jpg"},login:"",menuList:[{name:"我的消息",icon:"fa-envelope-open-o"},{name:"会员中心",icon:"fa-android"},{name:"村村有票",icon:"fa-ticket"},{name:"商城",icon:"fa-shopping-cart"},{name:"game center",icon:"fa-gamepad"},{name:"我的好友",icon:"fa-user-o"},{name:"皮肤商城",icon:"fa-tint"},{name:"听歌识曲",icon:"fa-microphone"},{name:"主题设置",icon:"fa-paint-brush"}],cBox:["#ff3e34","#ff91b0","#109d58","#7cdfc7","#1678ff","#ff9700"],showDetail:!1}},methods:{closeMask:function(){this.showToggle(1)},getData:function(){this.userInfo=JSON.parse(localStorage.getItem("userInfo")),this.userInfo={},null==this.userInfo?this.login=!0:this.login=!1,this.btScroll()},Exit:function(){localStorage.clear(),this.$router.go({path:"hoom1"})},sollorder:function(){this.detailWrapper=new a.a(this.$refs.wrapper,{click:!0})},Login:function(){console.log("login"),this.showToggle(1),this.$router.push({path:"loging"})},setColor:function(t){sessionStorage.setItem("themeColor",t),this.$store.state.zColor=t}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{staticClass:"wrapper",attrs:{id:"menu",name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.showDetail,expression:"showDetail"}],staticClass:"menu"},[s("div",{staticClass:"menuMask",on:{click:function(e){return t.showToggle(1)}}}),t._v(" "),s("div",{staticClass:"leftMenu"},[t.login?s("div",{},[s("p",[t._v("登入后手机电脑多端同步，尽享海量高品质音乐")]),t._v(" "),s("el-button",{attrs:{size:"mini",round:""},on:{click:function(e){return t.Login(1)}}},[t._v("登入")])],1):t._e(),t._v(" "),t.login?t._e():s("div",[s("div",{staticClass:"us-head",style:{backgroundImage:"url("+t.userInfo.backgroundUrl+")"}},[s("img",{staticClass:"avatar",attrs:{src:t.userInfo.avatarUrl,alt:""}}),t._v(" "),s("div",{staticClass:"us-ctrl"},[s("div",{staticClass:"us-name"},[t._v(t._s(t.userInfo.nickname))]),t._v(" "),s("div",[t._v(t._s(t.userInfo.name))]),t._v(" "),s("el-button",{attrs:{size:"mini",round:""},on:{click:function(e){return t.Login(1)}}},[t._v("登入")])],1)]),t._v(" "),s("div",t._l(t.menuList,function(e,a){return s("div",{key:a,staticClass:"cellMenu"},[s("i",{staticClass:"fa",class:[e.icon]}),t._v("\n            "+t._s(e.name)+"\n          ")])}),0),t._v(" "),s("div",{staticClass:"colorShow"},t._l(t.cBox,function(e,a){return s("div",{key:a,staticClass:"cellColor flex_cc",style:{background:e},on:{click:function(s){return t.setColor(e)}}},[e==t.$store.state.zColor?s("i",{staticClass:"fa fa-star"}):t._e()])}),0),t._v(" "),s("div",{staticClass:"set-ctrl"},[s("div",{staticClass:"cellMenu cl6"},[s("i",{staticClass:"fa fa-moon-o"}),t._v("夜间模式")]),t._v(" "),s("div",{staticClass:"cellMenu cl3"},[s("i",{staticClass:"fa fa-cog"}),t._v("设置")]),t._v(" "),s("div",{staticClass:"cellMenu cl3",on:{click:function(e){return t.Exit()}}},[s("i",{staticClass:"fa fa-power-off"}),t._v("退出\n          ")])])])])])])},staticRenderFns:[]};var o=s("VU/8")(n,i,!1,function(t){s("YUkC")},"data-v-4551c58e",null);e.default=o.exports}});
//# sourceMappingURL=1.6042c2578e4b3b618314.js.map