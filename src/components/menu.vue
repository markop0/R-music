<template>
  <transition id="menu" name="fade" class="wrapper">
    <div class="menu" v-show="showDetail">
      <div class="menuMask" @click="showToggle(1)"></div>
      <div class="leftMenu">
        <div class="" v-if="login">
          <p>登入后手机电脑多端同步，尽享海量高品质音乐</p>
          <el-button @click="Login(1)" size="mini" round>登入</el-button>
        </div>
        <div v-if="!login">
          <div
            class="us-head"
            v-bind:style="{
              backgroundImage: 'url(' + userInfo.backgroundUrl + ')'
            }"
          >
            <img class="avatar" :src="userInfo.avatarUrl" alt="" />
            <div class="us-ctrl">
              <div class="us-name">{{ userInfo.nickname }}</div>
              <div>{{ userInfo.name }}</div>
              <el-button size="mini" @click="Login(1)" round>登入</el-button>
            </div>
          </div>
          <div>
            <div
              class="cellMenu"
              v-for="(item, index) of menuList"
              :key="index"
            >
              <i class="fa" v-bind:class="[item.icon]"></i>
              {{ item.name }}
            </div>
          </div>
          <div class="colorShow">
            <div
              class="cellColor flex"
              v-for="(item, index) in cBox"
              @click="setColor(item)"
              :key="index"
              :style="{ background: item }"
            >
              <i class="fa fa-star" v-if="item == $store.state.zColor"></i>
            </div>
          </div>
          <div class="set-ctrl">
            <div class="cellMenu cl6"><i class="fa fa-moon-o"></i>夜间模式</div>
            <div class="cellMenu cl3"><i class="fa fa-cog"></i>设置</div>
            <div class="cellMenu cl3" @click="Exit()">
              <i class="fa fa-power-off"></i>退出
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
// v-show="showDetail"
<script>
import BScroll from "better-scroll";

export default {
  created() {
    this.getData();
  },
  data() {
    return {
      Menu: false,
      // mask:false,
      userInfo: [],
      login: "",
      menuList: [
        { name: "我的消息", icon: "fa-envelope-open-o" },
        { name: "会员中心", icon: "fa-android" },
        { name: "村村有票", icon: "fa-ticket" },
        { name: "商城", icon: "fa-shopping-cart" },
        { name: "game center", icon: "fa-gamepad" },
        { name: "我的好友", icon: "fa-user-o" },
        { name: "皮肤商城", icon: "fa-tint" },
        { name: "听歌识曲", icon: "fa-microphone" },
        { name: "主题设置", icon: "fa-paint-brush" }
      ],
      cBox: ["#ff3e34", "#ffb5b0", "#49c6ff", "#7cdfc7", "#f8e089", "#ffb13f"],
      showDetail: false
    };
  },
  methods: {
    closeMask: function() {
      // this.$router.go(-1);
      this.showToggle(1);
    },
    getData() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.userInfo = {}
      this.userInfo == null ? (this.login = true) : (this.login = false);
      this.btScroll();
    },
    Exit() {
      localStorage.clear();
      this.$router.go({ path: "hoom1" });
    },

    sollorder() {
      this.detailWrapper = new BScroll(this.$refs.wrapper, {
        click: true //开启点击事件 默认为false
      });
    },
    Login() {
      console.log("login");
      this.showToggle(1);
      this.$router.push({ path: "loging" });
    },
    setColor(e) {
      sessionStorage.setItem("themeColor", e);
      this.$store.state.zColor = e;
    }
  }
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
  transform: translate3d(0, 0, 100%);
}
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 900;
}
.menuMask {
  width: 100vw;
  height: 100vh;
  background: #000000;
  opacity: 0.4;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 910;
}
.leftMenu {
  position: fixed;
  top: 0;
  left: 0;
  width: 84vw;
  height: 100vh;
  background: #f2f3f4;
  z-index: 990;
}
.us-head {
  width: 100%;
  height: 162px;
  background-size: cover;
  background-position: 0 37%;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin: 40px 170px 10px 10px;
}
.us-name {
  font-size: 16px;
}
.us-ctrl {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}
.cellMenu {
  text-align: left;
  background: #fff;
  padding: 10px;
}
.cellMenu i {
  width: 20px;
  text-align: center;
}
.set-ctrl {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
}
.set-ctrl .cellMenu + .cellMenu {
  text-align: right;
}
.el-collapse-item__header {
  height: 40px !important;
  line-height: 40px;
}
.cellColor {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.cellColor i {
  color: #fff;
}
.colorShow {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  background: #fff;
}
</style>
