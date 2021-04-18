<template>
  <div>
    <Phead></Phead>
    <app-tab></app-tab>
    <router-view @playSong="playSong" class="child-view"></router-view>
    <musicCtrl></musicCtrl>
    <!-- v-show="$store.state.pPage" -->
  </div>
</template>
 
<script>
// import BScroll from "@better-scroll/core";
import Phead from "@/components/p-head";
import AppTab from "@/components/tab";
import leftMenu from "@/components/search";
import musicCtrl from "@/components/musicCtrl";
// import play from '@/components/play'
export default {
  data() {
    return {
      songId: "",
      playSong: "",
      playInfo: "",
    };
  },
  created() {
    this.pFn.test();
    var ex = sessionStorage.getItem("playInfo");
    if (ex !== "undefined" && ex !== null) {
      this.playInfo = JSON.parse(sessionStorage.getItem("playInfo"));
    }
    sessionStorage.getItem("themeColor") == null
      ? (this.$store.state.zColor = "#ff91b0")
      : (this.$store.state.zColor = sessionStorage.getItem("themeColor"));
    var lastPlay = JSON.parse(localStorage.getItem("lastPlay"));
  },
  // watch(){
  //   playInfo(){

  //   }
  // },
  components: {
    Phead: Phead,
    "app-tab": AppTab,
    leftMenu: leftMenu,
    musicCtrl: musicCtrl,
    // "play":play
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
  },
  methods: {
    // playMusic(){
    //   this.$store.commit('togglePlay')
    // },
    // playCtrl(){
    //   this.$refs.playPage.startPlayOrPause();
    // },
    // nextPlay(){
    //   this.$refs.playPage.NextSong();
    // }
  },
};
</script>
 
<style scoped >
</style>