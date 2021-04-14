<template>
  <transition id="musicList" name="fade" v-show="showDetail">
    <div class="music-list" ref="Mbox" v-if="songList.length !== 0">
      <div class="ml-head" :class="{ headTop: isTop }">
        <div class="back" @click="musiclistToggle()">
          <i class="el-icon-back"></i>
        </div>
        <div class="songListTop">
          <div class="SLT-top">歌单</div>
          <div class="SLT-bot">{{ songList.description }}</div>
        </div>
        <div class="Tright-ctrl" @click="musiclistToggle()">
          <i class="el-icon-search"></i>
        </div>
        <div class="Tright-ctrl" @click="musiclistToggle()">
          <i class="el-icon-more"></i>
        </div>
      </div>
      <div class="gedan" ref="gedan">
        <div class="songList-box">
          <div class="songListInfo">
            <div
              class="SLB-maskBg"
              v-bind:style="{
                backgroundImage: 'url(' + songList.coverImgUrl + ')',
              }"
            ></div>
            <div class="songList-bg-box">
              <img class="songList-bg" :src="songList.coverImgUrl" />
              <div class="songList-bg-icon" style="top: 4px">
                <i class="fa fa-headphones"></i>
                {{ Math.round(songList.playCount / 10000) }}万
              </div>
              <i class="el-icon-info songList-bg-icon" style="bottom: 4px"></i>
            </div>
            <div class="songListName">
              <div class="SLN-top">{{ songList.name }}</div>
              <div class="SLN-bot" v-if="songList.creator">
                <img
                  :src="songList.creator.avatarUrl"
                  alt=""
                  v-if="songList.creator.avatarUrl"
                />
                <div>
                  {{ songList.creator.nickname
                  }}<i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="functionBtn">
            <div class="Tright-ctrl" @click="musiclistToggle()" v-if="ishide">
              <i class="fa fa-commenting-o"></i>
            </div>
            <div class="Tright-ctrl" @click="musiclistToggle()" v-if="ishide">
              <i class="el-icon-share"></i>
            </div>
            <div class="Tright-ctrl" @click="musiclistToggle()" v-if="ishide">
              <i class="el-icon-download"></i>
            </div>
            <div class="Tright-ctrl" @click="musiclistToggle()" v-if="ishide">
              <i class="el-icon-edit-outline"></i>
            </div>
          </div>
          <div class="song-list" :class="{ SLfixed: isfixed }">
            <div class="allPlay">
              <div @click="playAll(songList.tracks)">
                <i class="fa fa-play-circle-o"></i>播放全部
                <div class="c-hui">(共{{ songList.tracks.length }}首)</div>
              </div>
              <div class="collection">
                <i class="el-icon-plus"></i>收藏({{ songList.subscribedCount }})
              </div>
            </div>
            <div class="song-list-box">
              <div
                class="cell-song"
                v-for="(item, index) of songList.tracks"
                :key="index"
                :id="item.id"
                @click="
                  playSong(
                    item.id,
                    item.name,
                    item.artists[0].name,
                    item.album.blurPicUrl,
                    index
                  )
                "
              >
                <div class="songindex">{{ index + 1 }}</div>
                <div class="songInfo">
                  <div class="songName">{{ item.name }}</div>
                  <div class="songartist c-hui">{{ item.artists[0].name }}</div>
                </div>
                <div class="songindex"><i class="fa fa-ellipsis-v"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "@better-scroll/core";

export default {
  props: {
    song: Number,
  },
  created() {
    // this.getData();
    window.addEventListener("scroll", this.handleScroll);
  },
  destory() {
    console.log("destory");
  },
  data() {
    return {
      artistsId: 0,
      songList: [],
      isfixed: false,
      ishide: true,
      isTop: false,
      showDetail: false,
      songInfo: {},
    };
  },
  methods: {
    getData: function () {
      var that = this;
      if (this.song != undefined && this.song != null && this.song != "") {
        this.$axios.get("/playlist/detail?id=" + this.song).then((re) => {
          this.songList = re.data.playlist;
          that.$store.state.songList = re.data.playlist.tracks;
          // this.btScroll();
          // this.$nextTick(() => {
          // 	//$refs绑定元素
          // 	if(!this.scroll){
          // 		this.scroll = new BScroll(this.$refs.Mbox, {
          // 		click:true   //开启点击事件 默认为false
          // 	})
          // 	}
          // })
        });
      }
    },
    sollorder() {
      this.detailWrapper = new BScroll(this.$refs.gedan, {
        click: true, //开启点击事件 默认为false
      });
    },
    handleScroll: function () {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop)
      if (scrollTop >= 210) {
        (this.isTop = "headTop"), (this.isfixed = true);
      } else {
        this.isTop = "";
        this.isfixed = false;
      }
      //				scrollTop>=120?this.ishide=false:this.ishide=true
    },
    // 退出歌单
    musiclistToggle: function () {
      this.showToggle(1);
      // this.songList =[]
      // window.removeEventListener('scroll', this.handleScroll)
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
  transform: translate3d(0, 0, 0);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: all 0.4s ease;
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}
#musicList {
  position: fixed;
  top: 0;
  z-index: 300;
}
.music-list {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 500;
}
.ml-head {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 800;
  color: #fff;
}
.back {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.song-list {
  background: #fff;
  min-height: calc(100vh - 138px);
  width: 100vw;
  border-radius: 12px 12px 0 0;
  position: relative;
}
.song-list-box,
.allPlay {
  display: flex;
  border-bottom: 1px solid #e4e4e4;
}
.allPlay {
  align-items: center;
  height: 44px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
}
.allPlay > div:first-child {
  display: flex;
}
.cell-song {
  width: 100%;
  height: 44px;
  display: flex;
  padding: 4px 0;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
}
.songindex,
.allPlay i {
  width: 44px;
}
.song-list-box {
  flex-wrap: wrap;
}
.songList-box {
  z-index: 600;
}
.songList-bg {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
.songInfo {
  width: calc(100vw - 88px);
}
.songartist {
  font-size: 12px;
  display: flex;
}
.songName {
  font-size: 13px;
  display: flex;
  text-align: left;
}

#Mbox {
  height: 100vh;
  overflow: auto;
  top: 0;
}
.swiperBg {
  width: 100%;
  height: 100px;
  background: #fd6c62;
  position: absolute;
  border-top: 1px solid #e14439;
}
.swiper-pagination-bullet-active {
  opacity: 1;
  background: #fd6c62;
}
.Tright-ctrl {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  font-size: 18px;
}
.songListInfo {
  display: flex;
  padding: 54px 18px 0;
  color: #fff;
  height: 140px;
  background-size: cover;
  background-position: 0 30%;
}
.songListTop {
  width: calc(100vw - 132px);
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
.SLT-top {
  width: 100%;
  height: 66.66%;
}
.SLT-bot {
  width: 100%;
  height: 33.33%;
  font-size: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 16px;
  white-space: nowrap;
}
.songListName {
  padding: 10px 20px;
  width: calc(100% - 136px);
}
.SLN-top {
  text-align: left;
  font-size: 16px;
  height: 46px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.SLN-bot {
  display: flex;
  align-items: center;
  margin: 8px 0;
}
.SLN-bot > img {
  width: 28px;
  height: 28px;
  border-radius: 50px;
  margin-right: 10px;
}
.SLN-bot > div {
  font-size: 10px;
}
.SLB-maskBg {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vw;
  filter: blur(90px);
  z-index: -1;
  background-size: cover;
}
.functionBtn {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 44px;
}
.functionBtn div {
  width: 25%;
}
.SLfixed {
  top: 44px;
  height: calc(100vh - 44px);
  overflow: auto;
}
.headTop {
  position: fixed;
  top: 0;
}
.collection i {
  width: 17px !important;
}
.collection {
  height: 100%;
  line-height: 45px;
  color: #fff;
  background-image: linear-gradient(to right, #fe594a 0%, #fe594a 100%);
  border-radius: 0 12px 0 0;
  padding: 0 10px;
  font-size: 12px;
}
.songList-bg-box {
  position: relative;
  width: 100px;
  height: 100px;
}
.songList-bg-icon {
  position: absolute;
  right: 4px;
  font-size: 10px;
}

.gedan {
  height: 100vh;
}
</style>
