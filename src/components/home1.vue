<template>
  <div id="Mbox" class="wrapper">
    <div class="recommend_content" ref="Mbox">
      <div class="recommend-cont">
        <div class="hoom1box">
          <div
            class="swiperBg"
            :style="{ background: $store.state.zColor }"
          ></div>
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) of dataList" :key="index">
              <img class="lunbo" :src="item.imageUrl" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="homeNav">
          <dir class="navBtn flex" @click="geto('everydayDaily')">
            <img
              src="../assets/img/rt.png"
              :style="{ background: $store.state.zColor }"
              alt=""
            />
            <p class="nowDate">每日推荐</p>
          </dir>
          <dir class="navBtn flex" @click="geto('everydayDaily')">
            <img
              src="../assets/img/rt.png"
              :style="{ background: $store.state.zColor }"
              alt=""
            />
            <p class="nowDate">电台</p>
          </dir>
          <dir class="navBtn flex" @click="geto('everydayDaily')">
            <img
              src="../assets/img/rt.png"
              :style="{ background: $store.state.zColor }"
              alt=""
            />
            <p class="nowDate">私人FM</p>
          </dir>
          <dir class="navBtn flex" @click="geto('everydayDaily')">
            <img
              src="../assets/img/rt.png"
              :style="{ background: $store.state.zColor }"
              alt=""
            />
            <p class="nowDate">排行榜</p>
          </dir>
          <dir class="navBtn flex" @click="geto('everydayDaily')">
            <img
              src="../assets/img/rt.png"
              :style="{ background: $store.state.zColor }"
              alt=""
            />
            <p class="nowDate">{{ nowDate }}</p>
          </dir>
        </div>
        <div class="m-body">
          <a class="m-title" href=""
            >推荐歌单<i class="fa fa-angle-right fa-2x"></i
          ></a>
          <div
            class="cellMusic"
            v-for="(item, index) of recommendList"
            :key="index"
            @click="openSongList(item.id)"
            :id="item.id"
          >
            <img class="mImg" :src="item.picUrl" />
            <div class="mImg-bg-icon" style="top: 4px">
              <i class="fa fa-headphones"></i>
              {{ Math.round(item.playCount / 10000) }}万
            </div>
            <div class="mName">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <musicList
      @playSong="playSong"
      :key="songCont"
      :song="songCont"
      v-show="songCont"
      ref="mySong"
    ></musicList>
    <!-- :pass="songId" -->
  </div>
</template>

<script>
import Swiper from "swiper";
import BScroll from "@better-scroll/core";
import musicList from "@/components/musicList";

export default {
  created() {
    this.getData();
    var mySwiper = new Swiper(".swiper-container", {
      loop: true,
      // 如果需要分页器
      pagination: ".swiper-pagination",
    });
  },
  destory() {
    console.log("destory");
  },
  data() {
    return {
      dataList: [],
      recommendList: [],
      songList: [],
      menuList: ["每日推荐", "歌单", "排行榜", "电台", "私人FM"],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        },
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
      },
      songCont: "",
      playSong: "",
      nowDete: "",
    };
  },
  components: {
    musicList: musicList,
  },
  methods: {
    getData: function () {
      let D = new Date();
      this.nowDate = D.getDate();

      this.$axios.get("/banner?type=0").then((re) => {
        this.dataList = re.data.banners;
      });
      this.$axios.get("/personalized").then((re) => {
        this.recommendList = re.data.result;

        this.$nextTick(() => {
          //$refs绑定元素
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.Mbox, {
              click: true, //开启点击事件 默认为false
            });
          }
        });
      });
    },
  },
};
</script>

<style scoped>
/* ----------------------------------- */
.mImg-bg-icon {
  position: absolute;
  width: 88.8%;
  height: 30px;
  background-image: linear-gradient(to top, #ffffff00 0%, #000000 200%);
  margin: -4px 5.6%;
  color: #fff;
  text-align: right;
  font-size: 12px;
}
.m-ctrl div {
  font-size: 14px;
}
.m-body {
  display: flex;
  flex-wrap: wrap;
}
.m-title {
  width: 40%;
  margin-right: 60%;
  height: 36px;
  font-weight: bold;
  color: #2c3e50;
  text-align: left;
  margin-left: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
}
.m-title > i {
  margin-left: 10px;
}
.lunbo {
  width: 93vw;
  border-radius: 4px;
}
.cellMusic {
  width: 33.33vw;
  height: 43vw;
  position: relative;
}
.mImg {
  width: 88.8%;
  border-radius: 4px;
}
.mName {
  font-size: 12px;
  padding: 0 4px;
  height: 35px;
  overflow: hidden;
}

.hoom1box {
  position: relative;
  min-height: 130px;
}
.swiperBg {
  width: 100%;
  height: 100px;
  position: absolute;
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
  color: black;
  float: right;
  font-size: 18px;
}
.songListInfo {
  display: flex;
  padding: 54px 18px 0;
  color: #fff;
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

.recommend_content {
  width: 100%;
  height: calc(100% - 88px);
  overflow: hidden;
}
#Mbox {
  height: 100%;
}
.homeNav {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.navBtn {
  width: 14vw;
  height: 14vw;
  padding: 0;
  margin: 10px 0 20px 0;
  position: relative;
}
.navBtn > img {
  width: 60%;
  border-radius: 50%;
  box-shadow: 0 0 5px #fff;
  padding: 6px;
}
.nowDate {
  position: absolute;
  top: 56px;
  color: rgb(56, 56, 56);
  font-size: 12px;
}
.ccccc {
  margin: 0 0 4px 4px;
}
/* background-image: linear-gradient(120deg, #ff5a4c 0%, #ff1d11 100%); */
</style>
