webpackJsonp([13],{"025N":function(s,t){},txEV:function(s,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("r+/8"),e={props:{pass:Number,xxx:""},mounted:function(){window.addEventListener("scroll",this.handleScroll)},watch:{xxx:function(){console.log(this.xxx)}},data:function(){return{artistsId:0,songList:[],artists:"",isfixed:!1,ishide:!0,isTop:!1,showDetail:!1}},methods:{getData:function(){var s=this,t=this;this.$axios.get("/artists?id="+this.pass).then(function(i){s.songList=i.data.hotSongs,t.$store.state.songList=i.data.hotSongs,s.artists=i.data.artist,s.btScroll()})},sollorder:function(){this.detailWrapper=new a.a(this.$refs.geshou,{click:!0}),this.xxx=this.detailWrapper,console.log(this.detailWrapper)},handleScroll:function(){var s=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;console.log(s),s>=210?(this.isTop="headTop",this.isfixed=!0):(this.isTop="",this.isfixed=!1)}}},l={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("transition",{staticClass:"cellB",attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:s.showDetail,expression:"showDetail"}],staticClass:"music-list"},[i("div",{staticClass:"ml-head",class:{headTop:s.isTop}},[i("div",{staticClass:"back",on:{click:function(t){return s.showToggle(1)}}},[i("i",{staticClass:"el-icon-back"})]),s._v(" "),i("div",{staticClass:"songListTop"},[i("div",{staticClass:"SLT-top"},[s._v("歌手")])]),s._v(" "),i("div",{staticClass:"Tright-ctrl",on:{click:function(t){return s.musiclistToggle()}}},[i("i",{staticClass:"el-icon-search"})]),s._v(" "),i("div",{staticClass:"Tright-ctrl",on:{click:function(t){return s.musiclistToggle()}}},[i("i",{staticClass:"el-icon-more"})])]),s._v(" "),i("div",{ref:"geshou",staticClass:"geshou"},[i("div",{staticClass:"songList-box"},[i("div",{staticClass:"songListInfo",style:{backgroundImage:"url("+s.artists.img1v1Url+")"}},[i("h3",[s._v(s._s(s.artists.name))])]),s._v(" "),i("div",{staticClass:"song-list",class:{SLfixed:s.isfixed}},[i("div",{staticClass:"allPlay"},[i("div",[i("i",{staticClass:"fa fa-play-circle-o"}),s._v("播放全部"),i("div",{staticClass:"c-hui"},[s._v("(共"+s._s(s.songList.length)+"首)")])]),s._v(" "),i("div",{staticClass:"collection"},[i("i",{staticClass:"el-icon-plus"}),s._v("收藏")])]),s._v(" "),i("div",{staticClass:"song-list-box"},s._l(s.songList,function(t,a){return i("div",{key:a,staticClass:"cell-song",on:{click:function(i){return s.playSong(t.id,t.name,s.artists.name,t.al.picUrl,a)}}},[i("div",{staticClass:"songindex"},[s._v(s._s(a+1))]),s._v(" "),i("div",{staticClass:"songInfo"},[i("div",{staticClass:"songName"},[s._v(s._s(t.name))]),s._v(" "),i("div",{staticClass:"songartist c-hui"},[s._v(s._s(t.al.name))])]),s._v(" "),i("div",{staticClass:"songindex"},[i("i",{staticClass:"fa fa-ellipsis-v"})])])}),0)])])])])])},staticRenderFns:[]};var o=i("VU/8")(e,l,!1,function(s){i("025N")},"data-v-19bbc5c2",null);t.default=o.exports}});
//# sourceMappingURL=13.3264b22cb5f03dcaf128.js.map