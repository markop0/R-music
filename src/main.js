// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

import './assets/Mtils.min.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'


// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.api1='/api'
Vue.use(ElementUI)
Vue.config.productionTip = false

import BScroll from '@better-scroll/core';

Vue.prototype.$BScroll = BScroll;

import './router/public.js'


import store from './store'//引入store
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 将 store 实例从根组件中‘注入’到每一个子组件中，子组件通过 `this.$store` 调用
  components: { App },
  template: '<App/>',
  
})
// *** 公共函数 ***
Vue.prototype.toggleTab = function (e){
  sessionStorage.setItem('homeID',e)
  this.homeID = e;
  this.$router.push({ path: 'home'+e }) ;
}
Vue.prototype.geto =function(e){
  this.$router.push({ path: e }) ;
  if(e=='menu'){
    this.showToggle(1);
  }
    // this.sonEvent = e
    // this.$nextTick(() => {
    // this.$refs.leftMenu.showToggle(0)
  // })
}
//页面切换
Vue.prototype.showToggle=function(e){
  console.log(this.showDetail+"   --!--")
  this.showDetail = !this.showDetail
  if (this.showDetail) {
      this.getData()
  }
  if(this.detailWrapper){
      this.detailWrapper.scrollTo(0,0)
      console.log(this.detailWrapper)
  }
},
Vue.prototype.showToggle1=function(e){
  console.log(this.showDetail1+"--->")
  // this.songId = ''
  // this.getData()
  this.showDetail1 = !this.showDetail1
  if (this.showDetail1) {
    this.getData()
  }
},
// 初始化better-scroll
Vue.prototype.btScroll=function(){
  this.$nextTick(() => {
    if(!this.detailWrapper){
      this.sollorder()
    }else{
      this.detailWrapper.refresh()
    }
  })
}
//打开歌单
Vue.prototype.openSongList=function(e){
  this.songList=[]
  // this.$router.push({
  //   path: `/home1/musicList`  //   /${e}
  // })
// jumpPage:function(e){
  // this.$router.push({path:'musicList',query:{id:e}});
  // this.$router.push({ path:'/home1/musicList'})
  this.songCont = e
    this.$nextTick(() => {
    this.$refs.mySong.showToggle(0)
  })
  
}
// 打开播放页
Vue.prototype.playSong=function(q,w,e,r,index){
  this.$store.commit('togglePlay')
  if(q!=undefined){
    var songInfo= {id:q,name:w,art:e,bgurl:r,index:index}
    this.$store.state.playInfo=songInfo
    // sessionStorage.setItem('playInfo',JSON.stringify(songInfo))
    // console.log(sessionStorage.getItem('playInfo'))
    // 获取歌曲链接
			this.$axios.get('http://120.79.162.149:3000/music/url?id='+ this.$store.state.playInfo.id)
      .then(re =>{
        // this.musicInfo.push({'audio':re.data.data[0].url})
        // this.audio = re.data.data[0].url
        re.data.code!=200 ?'':this.$store.state.audio=re.data.data[0].url
      })
      this.$axios.get('http://120.79.162.149:3000/song/detail?ids='+ this.$store.state.playInfo.id)
      .then(re =>{
        re.data.code!=200 ?'':this.$store.state.playInfo.bgurl=re.data.songs[0].al.picUrl
        
      })
      this.$nextTick(( ) => {
        console.log(this.$store.state.playInfo.toString())
        localStorage.setItem('lastPlay',this.$store.state.playInfo.toString())
      })
      // this.$refs.playbox.getData()
    
  }
  // this.$store.state.songInfo=songInfo
}
Vue.prototype.openComment=function(){
  this.$store.commit('toggleC')
  this.$refs.comment.getData()
}
Vue.prototype.playAll=function(e){
    let Num = e.length
}




Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

if(module.hot){
  // module.hot.accept('./number.js',()=>{
  //     document.body.removeChild(document.getElementById('number'));
  //     number();
  // })
}


// Vue.prototype.handleScroll= function (e) {
//   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
//   // console.log(scrollTop)
//   if(scrollTop>=210){
//     this.isTop='headTop',
//      this.isfixed=true
//   }else{
//     this.isTop=''
//     this.isfixed=false
//   }
// }