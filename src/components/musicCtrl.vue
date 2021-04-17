<template>
  <div>
    <!-- v-show="$store.state.audio" -->
    <div
      class="bottomBox"
      v-show="$store.state.audio"
      @click="playMusic()"
      ref="playPage"
    >
      <img class="BBbg" :src="$store.state.playInfo.bgurl" alt="" />
      <div class="BBinfo">
        <div>{{ $store.state.playInfo.name }}</div>
        <p>{{ $store.state.playInfo.art }}</p>
      </div>
      <i
        class="fa fa-play BBbtn flex"
        @click.stop="playCtrl()"
        v-if="!$store.state.playing"
      ></i>
      <i
        class="fa fa-pause BBbtn flex"
        @click.stop="playCtrl"
        v-if="$store.state.playing"
      ></i>
      <i class="fa fa-step-forward BBbtn flex" @click.stop="nextPlay"></i>
    </div>
    <play v-show="playEvent" ref="playPage"></play>
  </div>
</template>

<script>
import play from "@/components/play";

export default {
  mounted() {},
  data() {
    return {
      playEvent: false,
    };
  },
  components: {
    play: play,
  },
  created() {},
  methods: {
    playMusic(e) {
      console.log("playMusic");
      //   e == 1 ? "" : this.$store.commit("togglePlay");
      this.playEvent = !this.playEvent;
      // this.$refs.playPage.getSpaceData()
    },
    playCtrl() {
      this.$refs.playPage.startPlayOrPause();
    },
    nextPlay() {
      this.$refs.playPage.NextSong();
    },
  },
};
</script>

<style scoped>
.bottomBox {
  z-index: 800;
  width: 100vw;
  height: 52px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  border-top: 1px solid #cecece;
  display: flex;
  align-items: center;
}
.BBbg {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  padding: 5px 10px;
}
.BBinfo {
  width: calc(100% - 150px);
  height: auto;
  text-align: left;
  padding: 6px 10px;
}
.BBbtn {
  width: 50px;
  height: 50px;
}
.BBinfo p {
  font-size: 10px;
  color: #93a1a1;
}
</style>
