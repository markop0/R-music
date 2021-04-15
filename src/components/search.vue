<template>
  <transition id="search" name="fade" class="wrapper">
    <div class="search" v-show="showDetail">
      <header class="topctrl" :style="{ background: $store.state.zColor }">
        <div class="back" @click="showToggle(1)">
          <i class="fa fa-angle-left fa-2x"></i>
        </div>
        <input
          v-focus
          class="searchInput"
          v-model="searchWorld"
          placeholder="搜索歌曲、歌手"
          type="text"
        />
        <i
          class="el-icon-close back"
          @click="searchWorld = ''"
          v-if="searchWorld != ''"
        ></i>
      </header>

      <div class="resultsBox addTop" v-if="searchTip">
        <div class="HS-title">热门搜索</div>
        <div class="hotSearchBox">
          <div
            class="cellHS"
            v-for="(item, index) of hotList"
            :key="index"
            @click="searchWorld = item.first"
          >
            {{ item.first }}
          </div>
        </div>
      </div>
      <div class="resultsBox" v-if="searchTip">
        <div class="HS-title">搜索历史</div>
        <div class="hotSearchBox">
          <div
            class="cellHS"
            v-for="(item, index) of searchHistory"
            :key="index"
            @click="searchWorld = item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="scrollBox" ref="page" v-if="searchList.length >= 1">
        <div class="SearchResultsBox">
          <div
            class="SearchResults"
            v-for="(item, index) of searchList"
            :key="index"
            @click="
              playSong(
                item.id,
                item.name,
                item.artists[0].name,
                item.album.picId
              )
            "
          >
            <div class="searchName">{{ item.name }}</div>
            <div>{{ item.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "@better-scroll/core";

const debounce = (func, wait) => {
  let timeout = "";
  return (v) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(v);
    }, wait);
  };
};

export default {
  el: "#animated-number-demo",
  mounted() {
    console.log("search");
  },
  data() {
    return {
      hotList: [],
      searchWorld: "",
      searchList: [],
      showDetail: false,
      searchHistory: [],
      searchTip: true,
      number: 0,
      tweenedNumber: 0,
      dNumber: 0,
    };
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus();
      },
    },
  },
  computed: {
    animatedNumber: function () {
      return this.tweenedNumber.toFixed(0);
    },
  },
  watch: {
    searchWorld: function () {
      this.debounceSearch(this);
      this.searchWorld === "" ? (this.searchTip = true) : "";
    },
    number: (newValue) => {
      TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue });
    },
  },
  methods: {
    getData: function () {
      this.$axios.get("/search/hot").then((re) => {
        var sHistory = localStorage.getItem("searchHistory");
        sHistory == null ? "" : (this.searchHistory = sHistory.split(","));
        this.searchWorld = "";
        this.hotList = re.data.result.hots;
      });
    },
    sollorder() {
      this.detailWrapper = new BScroll(this.$refs.page, {
        click: true, //开启点击事件 默认为false
      });
    },
    debounceSearch: debounce(function (e) {
      if (e.searchWorld != "") {
        e.getHot();
      } else {
        e.searchList = [];
      }
    }, 1000),
    getHot: function () {
      this.$axios.get("/search?keywords=" + this.searchWorld).then((re) => {
        this.searchList = re.data.result.songs;
        this.searchTip = false;
        this.$nextTick(() => {
          //$refs绑定元素
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.page, {
              // click:true   //开启点击事件 默认为false
            });
          }
        });
      });
      if (this.searchHistory.includes(this.searchWorld)) {
        var i = this.searchHistory.indexOf(this.searchWorld);
        this.searchHistory.splice(i, 1);
      } else if (this.searchHistory.length >= 5) {
        this.searchHistory.pop();
      }
      this.searchHistory.reverse();
      this.searchHistory.push(this.searchWorld);
      this.searchHistory.reverse();
      localStorage.setItem("searchHistory", this.searchHistory);
    },
    toText: () => {
      //n nnn nn nn
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
  transform: translate3d(100%, 0, 0);
}
#search,
.search {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 50;
  background: #fff;
}
.topctrl {
  display: flex;
  top: 0;
  width: 100%;
  z-index: 100;
  position: fixed;
}
/* .resultsBox:first-child{
  margin-top: 44px;
} */
.searchInput {
  background: transparent;
  border: none;
  border-bottom: 1px solid #dddad3;
  color: #fff;
  border-radius: 0;
  width: calc(100% - 88px);
  height: 28px;
  margin: auto 0;
}
.searchInput::-webkit-input-placeholder {
  color: #fff;
}
.searchInput:focus {
  outline: none;
}
.HS-title {
  text-align: left;
  padding: 10px 0 8px 14px;
  font-size: 12px;
}
.hotSearchBox {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
}
.cellHS {
  border: 1px solid #f3f3f3;
  border-radius: 50px;
  margin: 4px;
  font-size: 12px;
  padding: 3px 10px;
  background: #f3f3f3;
}
.SearchResultsBox {
}
.SearchResults {
  border-bottom: 1px solid #e4e4e4;
  width: 100%;
  text-align: left;
  height: 40px;
  font-size: 10px;
  line-height: 20px;
  padding: 4px 10px;
}
.searchName {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
}
.scrollBox {
  width: 100vw;
  height: calc(100vh - 44px);
  margin-top: 44px;
  z-index: 80;
}
.addTop {
  margin-top: 44px;
}
</style>