<template>
  <transition name="fade" ref="playbox">
    <div class="MBox" v-show="showDetail">
      <div class="playbox">
        <div class="playHead">
          <div class="back" @click="this.$parent.playMusic">
            <i class="el-icon-back"></i>
          </div>
          <div class="r-title">{{ $store.state.playInfo.name }}</div>
          <div class="r-art">{{ $store.state.playInfo.art }}</div>
        </div>
        <div class="playInfo" @click="getGeci()">
          <div class="imgbox flex" v-show="AorB">
            <!-- <div class="lianyi" :class='cdCls'>
							<div :class='ddCls'><div class="mini"></div></div>
						</div> -->
            <!-- <div class="lianyi ly2" :class='cdCls'>
							<div :class='ddCls'><div class="mini m2"></div></div>
						</div>
						<div class="lianyi ly3" :class='cdCls'>
							<div :class='ddCls'><div class="mini m3"></div></div>
						</div> -->
            <div class="lianyi ly4" :class="cdCls">
              <div :class="ddCls"><div class="mini m4"></div></div>
            </div>
            <!-- :class="playIcon?'':'cs3pause'" -->
            <img
              :class="[playing ? 'onplay' : 'onplay pause']"
              :src="$store.state.playInfo.bgurl"
            />
          </div>
          <div class="geci" ref="geciBox" v-show="!AorB">
            <div class="geciBox">
              <p
                ref="lyricLine"
                class="text"
                :class="{ current: geciTime == item.time }"
                v-for="(item, index) in geci"
                :key="index"
              >
                {{ item.txt }}
              </p>
            </div>
          </div>
          <div class="play-box">
            <div class="left">
              <div class="info">
                <div class="size">{{ currentTime }}</div>
                <el-slider
                  v-model="timeVal"
                  :max="maxTime"
                  :change="changeCurrentTime(timeVal)"
                  class="JDT"
                ></el-slider>
                <div class="timeshow">{{ duration }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="miniCtrl">
          <i
            @click="toggleLike()"
            class="fa fa-heart-o BBbtn flex"
            v-if="!isLike"
          ></i>
          <i
            @click="toggleLike()"
            class="fa fa-heart BBbtn flex cRed"
            v-if="isLike"
          ></i>
          <i @click="openComment()" class="fa fa-commenting-o BBbtn flex"></i>
        </div>
        <div class="ctrlbox">
          <div class="loopBtn" @click="setPlay">
            <div class="ctrlB loop" v-if="playSet == 0"></div>
            <div class="ctrlB loop1" v-if="playSet == 1"></div>
            <div class="ctrlB random" v-if="playSet == 2"></div>
          </div>
          <div class="beforeBtn" @click="PreSong">
            <div class="ctrlB before"></div>
          </div>
          <div class="playBtn" @click="startPlayOrPause()">
            <div class="ctrlB play" v-if="!playIcon"></div>
            <div class="ctrlB stop" v-if="playIcon"></div>
          </div>
          <div class="nextBtn" @click="NextSong">
            <div class="ctrlB next"></div>
          </div>
          <div class="listBtn" @click="miniMusicList = !miniMusicList">
            <div class="ctrlB list"></div>
          </div>
        </div>
        <div class="video">
          <audio
            ref="audio"
            @pause="onPause"
            @play="onPlay"
            @timeupdate="onTimeupdate"
            @loadedmetadata="onLoadedmetadata"
            @ended="onEnded"
            @abort="onAbort"
            :src="$store.state.audio"
            id="myAudio"
            preload="metadata"
            controls
            autoplay
          ></audio>
        </div>
      </div>
      <div
        class="palymask"
        v-bind:style="{
          backgroundImage: 'url(' + $store.state.playInfo.bgurl + ')',
        }"
      ></div>
      <div class="blackmask" v-show="!AorB"></div>
      <comment ref="comment" v-show="$store.state.cPage"></comment>
      <transition name="Mask">
        <div
          class="Mask"
          @click="miniMusicList = !miniMusicList"
          v-show="miniMusicList"
        >
          <div class="miniMusicList">
            <div class="miniCtrl-m"></div>
            <div class="musicListBox">
              <div
                class="cellMusic"
                v-for="(item, index) of $store.state.songList"
                :key="index"
              >
                <div class="flex">
                  {{ item.name }}
                  <p class="art">{{ item.ar[0].name }}</p>
                </div>
                <i
                  class="delMusic flex el-icon-close"
                  @click.stop="delMusic(index)"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import BScroll from "@better-scroll/core";
import comment from "@/components/comment";
export default {
  name: "play",
  mounted() {
    // this.getData();
    this.yuanFX;
  },
  data() {
    return {
      currentTime: "00:00", // 音频当前播放时长
      duration: "00:00",
      maxTime: 0, // 音频最大播放秒数
      timeVal: 0, // 音频当前播放位置  秒
      nowclass: "",
      playIcon: true,
      musicInfo: { name: "", bgurl: "", audio: "" },
      showDetail: true,
      playing: false, // 该字段是音频是否处于播放状态的属性
      AorB: true,
      geci: "",
      audio: "",
      isLike: false,
      geciTime: "",
      playSet: 0,
      miniMusicList: false,
      xx1: 0,
      // isEnd:this.$refs.audio.ended
    };
  },
  components: {
    comment: comment,
  },
  watch: {
    // timeVal() {
    //   if (this.timeVal >= this.maxTime) {
    //     if (this.playSet == 0 || this.playSet == 2) {
    //       this.NextSong();
    //       this.timeVal = 0;
    //       console.log("下一首");
    //     } else if (this.playSet == 1) {
    //       this.timeVal = 0;
    //       console.log("循环播放");
    //       // this.$refs.audio.pause()
    //       // this.playIcon=false
    //     } else {
    //     }
    //   }
    // }
  },
  computed: {
    cdCls() {
      return this.playing ? "onplay" : "onplay pause";
    },
    ddCls() {
      return this.playing ? "dian" : "dian pause";
    },
  },
  methods: {
    setPlay() {
      switch (this.playSet) {
        case 0:
          this.playSet = 1;
          break;
        case 1:
          this.playSet = 2;
          let A = this.$store.state.songList;
          this.$store.state.songList = this.shuffle(A);
          break;
        case 2:
          this.playSet = 0;
          break;
      }
    },
    //数组打乱，随机播放改变歌单
    shuffle(array) {
      var m = array.length,
        t,
        i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      console.log("change" + array);
      return array;
    },
    dinX() {
      let x = Math.floor(Math.random() * 272) - 5;
      this.xx1 = x;
      return x;
    },
    yuanFX(x) {
      //(x-131)**2+(y+131)**2=136**2
      let y = Math.sqrt(Math.abs(136 ** 2 - (x - 131) ** 2)) - 131;
      // console.log(x+','+y)
      return y;
    },
    delMusic(e) {
      this.$store.state.songList.splice(e, 1);
    },
    getData() {
      console.log("get data");
      this.showDetail1 = !this.showDetail1;
      this.musicInfo = JSON.parse(sessionStorage.getItem("playInfo"));
      console.log(this.musicInfo);
      console.log("session" + sessionStorage.getItem("playInfo"));

      if (this.$store.state.playInfo.id !== "") {
        // 获取歌词
        this.$axios
          .get("/lyric?id=" + this.$store.state.playInfo.id)
          .then((re) => {
            console.log("歌词");
            var geci = [];
            if (re.data.lrc !== undefined) {
              var gc = re.data.lrc.lyric;
              var gcArr = gc.split("[");
              for (var i in gcArr) {
                var now = gcArr[i].split("]");
                var nt = now[0].split(":"); //nowTime

                var rowGC = { time: nt[0] * 60 + Number(nt[1]), txt: now[1] };
                geci.push(rowGC);
              }
              this.geci = geci;
            } else {
              this.geci = ["暂无歌词"];
            }

            this.$nextTick(() => {
              //$refs绑定元素
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.playbox);
              }
            });
          });
        // this.btScroll();
      }
    },
    toggleLike() {
      this.$axios
        .get(
          "/like?id=" + this.$store.state.playInfo.id + "&like=" + !this.isLike
        )
        .then((re) => {
          consloe.log(this.isLike);
          this.isLike = !this.isLike;
        });
    },
    getGeci() {
      this.AorB = !this.AorB;
    },
    sollorder() {
      this.detailWrapper = new BScroll(this.$refs.geciBox, {
        click: true, //开启点击事件 默认为false
      });
    },
    // 控制音频的播放与暂停
    startPlayOrPause() {
      this.playIcon ? this.pause() : this.play();

      this.playIcon = !this.playIcon;
    },

    offPlay() {
      this.showToggle();
    },
    // 播放音频
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      this.playing = true;
      this.$store.state.playing = true;
      console.log(111);
    },
    // 当音频暂停
    onPause() {
      this.playing = false;
      this.$store.state.playing = false;
    },
    PreSong() {
      // let nowPlayId=this.$store.state.playInfo.id
      let nextNum = this.$store.state.playInfo.index;
      let A = this.$store.state.songList;
      nextNum > 0 ? --nextNum : (nextNum = A.length - 1);
      var Artists, Bgurl;
      if (A[nextNum].artists == undefined) {
        Artists = this.$store.state.playInfo.art;
        Bgurl = A[nextNum].al.picUrl;
      } else {
        Artists = A[nextNum].ar[0].name;
        Bgurl = A[nextNum].album.picUrl;
      }
      var songInfo = {
        id: A[nextNum].id,
        name: A[nextNum].name,
        art: Artists,
        bgurl: Bgurl,
        index: nextNum,
      };
      this.$store.state.playInfo = songInfo;
      this.getMusicUrl();
    },
    NextSong() {
      // let nowPlayId=this.$store.state.playInfo.id
      let nextNum = this.$store.state.playInfo.index;
      let A = this.$store.state.songList;
      nextNum < A.length - 1 ? ++nextNum : (nextNum = 0);
      var Artists, Bgurl;
      if (A[nextNum].artists == undefined) {
        Artists = this.$store.state.playInfo.art;
        Bgurl = A[nextNum].al.picUrl;
      } else {
        Artists = A[nextNum].ar[0].name;
        Bgurl = A[nextNum].album.picUrl;
      }

      var songInfo = {
        id: A[nextNum].id,
        name: A[nextNum].name,
        art: Artists,
        bgurl: Bgurl,
        index: nextNum,
      };
      this.$store.state.playInfo = songInfo;
      this.getMusicUrl();
    },
    getMusicUrl() {
      // 获取歌曲链接
      this.$axios
        .get("/music/url?id=" + this.$store.state.playInfo.id)
        .then((re) => {
          re.data.code != 200
            ? ""
            : (this.$store.state.audio = re.data.data[0].url);
        });
      // this.getData();
    },
    onEnded() {
      console.log("播放结束");
      this.$refs.audio.pause();
    },
    onAbort() {
      console.log("onAbort");
    },
    //时间格式转换
    realFormatSecond(second) {
      var secondType = typeof second;
      if (secondType === "number" || secondType === "string") {
        second = parseInt(second);
        var hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        var mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        hours == 0 ? (hours = "") : (hours = hours + ":");
        return (
          hours + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
        );
      } else {
        return "0:00:00";
      }
    },
    // timeupdate事件大概每秒一次，更新音频流的当前播放时间
    onTimeupdate(res) {
      // console.log(res);
      this.timeVal = res.target.currentTime;
      this.currentTime = this.realFormatSecond(res.target.currentTime);
      Math.floor(this.timeVal);
      for (var i in this.geci) {
        if (this.timeVal /*当前播放的时间*/ <= this.geci[i].time) {
          //显示到页面
          this.geciTime = this.geci[i - 1].time;
          // this.scroll.scrollTo(0, -40*i, 300, ease['swipeBounce'])
          return;
        }
      }
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      // console.log(res)
      this.maxTime = parseInt(res.target.duration);
      this.duration = this.realFormatSecond(this.maxTime);
    },

    changeCurrentTime(e) {
      console.log(this.$refs.audio);
      // if(e!==this.$refs.audio.currentTime){
      //   this.pFn.debounce(this.setPlayPosition(e), 2000);
      //   console.log(e-this.$refs.audio.currentTime);
      // }
      
    },
    //音频节点跳转
    setPlayPosition(e) {
      if (this.$refs.audio) {
        this.$refs.audio.currentTime = e;
      }
    },
  },
};
export const ease = {
  // easeOutQuint
  swipe: {
    style: "cubic-bezier(0.23, 1, 0.32, 1)",
    fn: function (t) {
      return 1 + --t * t * t * t * t;
    },
  },
  // easeOutQuard
  swipeBounce: {
    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fn: function (t) {
      return t * (2 - t);
    },
  },
  // easeOutQuart
  bounce: {
    style: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    fn: function (t) {
      return 1 - --t * t * t * t;
    },
  },
};
</script>

<style scoped>
/*  */
.fade-enter-active,
.fade-leave-active,
.Mask-enter-active,
.Mask-leave-active {
  transition: all 0.2s ease;
  transform: translate3d(0, 0, 0);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: all 0.4s ease;
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}
audio {
  opacity: 0.1;
}
/* opacity: .2; */
.cRed {
  color: #ffb5b0;
}
.ctrlB {
  background: #ffb5b0;
  width: 48px;
  height: 48px;
}
.list {
  -webkit-mask-image: url(../assets/img/list.png);
}
.before {
  -webkit-mask-image: url(../assets/img/before.png);
}
.play {
  -webkit-mask-image: url(../assets/img/play.png);
}
.stop {
  -webkit-mask-image: url(../assets/img/stop.png);
}
.next {
  -webkit-mask-image: url(../assets/img/next.png);
}
.loop {
  -webkit-mask-image: url(../assets/img/loop.png);
}
.loop1 {
  -webkit-mask-image: url(../assets/img/loop1.png);
}
.random {
  -webkit-mask-image: url(../assets/img/random.png);
}
.playHead {
  display: flex;
  width: 100vw;
  height: 44px;
  color: #fff;
}
.playInfo {
  height: 132vw;
}
.palymask {
  z-index: 910;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  filter: blur(90px);
  background-size: cover;
  background-position: 50% 0;
}
.blackmask {
  background: rgba(0, 0, 0, 0.1);
  z-index: 911;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0%;
}
.MBox {
  background: #f2f3f4;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 900;
}
.playbox {
  background: rgba(0, 0, 0, 0.15);
  z-index: 999;
  position: fixed;
  width: 100%;
  top: 0;
  height: 100vh;
  margin: 0 auto;
}
.r-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  line-height: 44px;
  user-select: none;
}
.r-art {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.imgbox {
  width: 250px;
  height: 122vw;
  border-radius: 50%;
  margin: auto;
}
.imgbox img {
  background: #fffcf5;
  box-shadow: 0px 0px 0px 6px rgba(255, 255, 255, 0.36);
  display: block;
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
.zhuan {
  -webkit-transform: rotate(360deg);
  animation: rotation 25s linear infinite;
  -moz-animation: rotation 25s linear infinite;
  -webkit-animation: rotation 25s linear infinite;
  -o-animation: rotation 25s linear infinite;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.ctrlbox {
  height: auto;
  padding: 10px 10px 20px 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.listBtn {
  width: 40px;
  height: 40px;
}
.beforeBtn {
  width: 40px;
  height: 40px;
  margin-left: 6%;
}
.playBtn {
  width: 48px !important;
  height: 48px;
  margin: 1px 10%;
}
.nextBtn {
  width: 40px;
  height: 40px;
  background-size: 40px;
  margin-right: 6%;
}
.loopBtn {
  width: 40px;
  height: 40px;
}
/*.stopBtn{background-image:url(../img/stop.png);}*/
.ctrlbox div img {
  width: 40px;
  height: 40px;
}
.play-box .left {
  width: 100%;
}
.progresswrap {
  margin-top: 10px;
}
.play-box .left div.info {
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  color: #000;
  margin: 0 10px;
  z-index: 1;
  display: flex;
  align-content: center;
  justify-content: center;
}
.play-box .left div.info .size {
  width: 10%;
}
.play-box .left div.info .timeshow {
  width: 10%;
}
.info div {
  color: #fff;
}
.info slider,
.el-slider {
  width: 70%;
  margin: 4px auto;
}
.infobox {
  width: 100%;
  height: 300px;
}
.detail {
  height: 300px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #edfdff;
}
.infor-head {
  font-size: 18px;
  padding: 10px 0;
  font-weight: bold;
  user-select: none;
}
.infor-text {
  line-height: 26px;
  font-size: 16px;
  color: #505050;
}
.play-list {
  width: 48%;
  max-width: 207px;
  height: 100%;
  background-color: #fafbff;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  padding: 10px 5px;
  overflow-y: auto;
  transition: width 2s;
  -webkit-transition: width 2s;
}
.play-list:focus {
  width: 48%;
}
.list-box {
  display: flex;
  flex-wrap: wrap;
}
.play-list div .Song {
  width: 100%;
  border-top: 1px #bfbfbf solid;
  padding: 8px 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
}
.playing {
  color: orange;
  display: flex;
  align-content: space-around;
  justify-content: space-between;
}
.playing-gif {
  width: 10px;
  height: 10px;
  float: right;
  position: relative;
  margin: auto 0;
}
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.53);
  z-index: 800;
  position: fixed;
  top: 0;
}
.JDT .el-slider__runway {
  margin: 6px 0 !important;
}
.miniCtrl {
  height: 44px;
  padding: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.geci {
  width: 100%;
  height: 122vw;
  overflow: hidden;
}
.text {
  line-height: 40px;
  color: #c7c7c7;
  font-size: 14px;
}
.video {
  position: absolute;
  top: 50px;
  width: 100%;
}
.current {
  color: #fff;
}
.geciBox {
  z-index: 1010;
}

.cs3pause {
  animation-play-state: paused;
  -webkit-animation-play-state: paused; /* Safari 和 Chrome */
  border: 4px solid red;
}
.pause {
  animation-play-state: paused !important;
  -webkit-animation-play-state: paused !important; /* Safari 和 Chrome */
}

.onplay {
  animation: rotate 20s linear infinite;
}

.mini {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #e5efea;
  border-radius: 50%;
  top: -5px;
  left: 130px;
}
.m2 {
  top: 130px;
  left: 267px;
}
.m3 {
  top: 267px;
  left: 130px;
}
.m4 {
  top: 130px;
  left: -5px;
}

.dian {
  position: absolute;
  width: 270px;
  height: 270px;
  animation: dAnimation 4.6s;
  -webkit-animation: dAnimation 4.6s infinite linear;
  animation: rotate 18s linear infinite;
}
.lianyi {
  width: 270px;
  height: 270px;
  border: 2px solid #e5efea;
  border-radius: 50%;
  position: absolute;
  animation: myfirst 4.8s;
  -webkit-animation: myfirst 4.8s infinite linear;
}
.ly2 {
  width: 270px !important;
  height: 270px !important;
  animation-delay: 1.2s;
  -webkit-animation-delay: 1.2s; /* Safari 和 Chrome */
}
.ly3 {
  width: 270px !important;
  height: 270px !important;
  animation-delay: 2.4s;
  -webkit-animation-delay: 2.4s; /* Safari 和 Chrome */
}
.ly4 {
  width: 270px !important;
  height: 270px !important;
  animation-delay: 3.6s;
  -webkit-animation-delay: 3.6s; /* Safari 和 Chrome */
}

.miniMusicList {
  width: 100vw;
  height: 55vh;
  background: #fff;
  border-radius: 10px 10px 0 0;
  position: fixed;
  bottom: 0;
  margin: 0;
  padding: 0;
}
.Mask {
  position: fixed;
  background: rgba(0, 0, 0, 0.26);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
}
.cellMusic,
.miniCtrl-m {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 16px);
  height: 36px;
  line-height: 36px;
  padding: 0 3px 0 10px;
}
.art {
  margin-left: 10px;
}
.delMusic {
  width: 36px;
  height: 36px;
}

@keyframes myfirst {
  0% {
    -ms-transform: scale(1, 1); /* IE 9 */
    -webkit-transform: scale(1, 1); /* Safari */
    transform: scale(1, 1); /* 标准语法 */
    opacity: 1;
  }

  100% {
    -ms-transform: scale(1.5, 1.5); /* IE 9 */
    -webkit-transform: scale(1.5, 1.5); /* Safari */
    transform: scale(1.5, 1.5); /* 标准语法 */
    opacity: 0;
  }
}

@-webkit-keyframes myfirst {
  0% {
    -ms-transform: scale(1, 1); /* IE 9 */
    -webkit-transform: scale(1, 1); /* Safari */
    transform: scale(1, 1); /* 标准语法 */
    opacity: 1;
  }

  100% {
    -ms-transform: scale(1.5, 1.5); /* IE 9 */
    -webkit-transform: scale(1.5, 1.5); /* Safari */
    transform: scale(1.5, 1.5); /* 标准语法 */
    opacity: 0;
  }
}
@keyframes dAnimation {
  from {
    -webkit-transform-origin: 50% 1000%;
    transform-origin: 50% 1000%;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 1;
  }

  to {
    -webkit-transform-origin: 50% 1000%;
    transform-origin: 50% 1000%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
}

@-webkit-keyframes dAnimation {
  from {
    -webkit-transform-origin: 50% 1000%;
    transform-origin: 50% 1000%;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 1;
  }

  to {
    -webkit-transform-origin: 50% 1000%;
    transform-origin: 50% 1000%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
}
</style>
