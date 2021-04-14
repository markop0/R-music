<template>
  <div id="app">
    <!-- <Phead></Phead>
    <app-tab></app-tab>
    <router-view @playSong="playSong" class="child-view"></router-view>
    <musicCtrl></musicCtrl> -->
    <!-- v-show="$store.state.pPage" -->
    <router-view></router-view>
  </div>
</template>

<script>
// import BScroll from "@better-scroll/core";
// import Phead from "./components/p-head";
// import AppTab from "./components/tab";
// import leftMenu from "@/components/search";
// import musicCtrl from "./components/musicCtrl";
// import play from '@/components/play'
export default {
  name: "App",
  // data() {
  //   return {
  //     songId: "",
  //     playSong: "",
  //     playInfo: "",
  //   };
  // },
  // created() {
  //   this.pFn.test();
  //   var ex = sessionStorage.getItem("playInfo");
  //   if (ex !== "undefined" && ex !== null) {
  //     this.playInfo = JSON.parse(sessionStorage.getItem("playInfo"));
  //   }
  //   sessionStorage.getItem("themeColor") == null
  //     ? (this.$store.state.zColor = "#ffb5b0")
  //     : (this.$store.state.zColor = sessionStorage.getItem("themeColor"));
  //   var lastPlay = JSON.parse(localStorage.getItem("lastPlay"));
  // },
  // // watch(){
  // //   playInfo(){

  // //   }
  // // },
  // components: {
  //   Phead: Phead,
  //   "app-tab": AppTab,
  //   leftMenu: leftMenu,
  //   musicCtrl: musicCtrl,
  //   // "play":play
  // },

  // watch: {
  //   $route(to, from) {
  //     const toDepth = to.path.split("/").length;
  //     const fromDepth = from.path.split("/").length;
  //     this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  //   },
  // },
  // methods: {
  //   // playMusic(){
  //   //   this.$store.commit('togglePlay')
  //   // },
  //   // playCtrl(){
  //   //   this.$refs.playPage.startPlayOrPause();
  //   // },
  //   // nextPlay(){
  //   //   this.$refs.playPage.NextSong();
  //   // }
  // },
};
</script>
<style>
body,
ol,
ul,
h1,
h2,
h3,
h4,
h5,
h6,
p,
th,
td,
dl,
dd,
form,
fieldset,
legend,
input,
textarea,
select {
  margin: 0;
  padding: 0;
}
body {
  font: 16px "宋体", "Arial Narrow", HELVETICA;
  background: #fff;
  -webkit-text-size-adjust: 100%;
}
a {
  color: #172c45;
  text-decoration: none;
}
a:hover {
  color: #cd0200;
  text-decoration: underline;
}
em {
  font-style: normal;
}
li {
  list-style: none;
}
img {
  border: 0;
  vertical-align: middle;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
p {
  word-wrap: break-word;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
input:focus {
  outline: none;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.back {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.child-view {
  background: #fff;
  width: 100vw;
  overflow: hidden;
  position: fixed;
}
.cl6 {
  width: 60%;
}
.cl3 {
  width: 30%;
}

/* .recommend-cont{width: 100%;height: 100%;} */

.el-slider__runway {
  margin: 6px 0;
}
</style>
