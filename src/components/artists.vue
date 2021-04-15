<template>
  <transition class='cellB' name="fade">
  	<div class="music-list" v-show="showDetail">
			<div class="ml-head" :class="{headTop:isTop}">
				<div class="back" @click="showToggle(1);"><i class="el-icon-back"></i></div>
				<div class="songListTop">
					<div class="SLT-top">歌手</div>
				</div>
				<div class="Tright-ctrl" @click="musiclistToggle()"><i class="el-icon-search"></i></div>
				<div class="Tright-ctrl" @click="musiclistToggle()"><i class="el-icon-more"></i></div>
			</div>
			<div class="geshou" ref="geshou">
				<div class="songList-box" >
					<div class="songListInfo" v-bind:style="{backgroundImage:'url('+artists.img1v1Url+')'}">
						<h3>{{artists.name}}</h3>
					</div>
					
					<div class="song-list" :class="{SLfixed:isfixed}">
						<div class="allPlay">
							<div><i class="fa fa-play-circle-o"></i>播放全部<div class="c-hui">(共{{songList.length}}首)</div></div>
							<div class="collection"><i class="el-icon-plus"></i>收藏</div>
						</div>
						<div class="song-list-box"> <!-- ,item.ar[0].name,item.album.blurPicUrl -->
							<div class="cell-song" v-for="(item,index) of songList" :key="index" @click="playSong(item.id,item.name,artists.name,item.al.picUrl,index)">
								<div class="songindex">{{index+1}}</div>
								<div class="songInfo">
									<div class="songName">{{item.name}}</div>
									<div class="songartist c-hui">{{item.al.name}}</div>
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
import BScroll from 'better-scroll'
export default {
	props:{
		pass:Number,
		xxx:''
	},
    mounted (){
			// this.getData();
			window.addEventListener('scroll', this.handleScroll)   //handleScroll
			
		},
		watch:{
			xxx(){
				console.log(this.xxx)
			}
		},
    data () {
      return {
				artistsId:0,
				songList:[],
				artists:'',
				isfixed:false,
				ishide:true,
				isTop:false,
				showDetail:false,
    	}
		},
    methods:{
    	getData:function(){
				var that = this
				this.$axios.get('/artists?id='+ this.pass)
				.then(re =>{
						this.songList=re.data.hotSongs
						that.$store.state.songList=re.data.hotSongs
						this.artists= re.data.artist
						this.btScroll()
				})
			},
			sollorder(){
				this.detailWrapper = new BScroll(this.$refs.geshou, {
					click:true//开启点击事件 默认为false
				})
				this.xxx = this.detailWrapper
				console.log(this.detailWrapper)
			},
    	handleScroll:function () {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				console.log(scrollTop)
				if(scrollTop>=210){
					this.isTop='headTop',
				 	this.isfixed=true
				}else{
					this.isTop=''
					this.isfixed=false
				}
      }
    }
}
</script>
<style scoped>
.cellB{top: 0;width: 100vw;height: 100vh;overflow: auto;}
.headTop{position: fixed;top: 0;background: #e14439;}
.music-list{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: #fff;z-index: 500;}
.ml-head{width: 100%;height: 44px;display: flex;align-items: center;position: fixed;top: 0;z-index: 800;color: #fff;}
.back{width: 44px;height: 44px;display: flex;align-items: center;justify-content: center;color: #fff;}
.song-list{background: #f2f3f4;width: 100vw;border-radius: 12px 12px 0 0 ;position: relative;top: -20px;}
.song-list-box,.allPlay{display: flex;border-bottom: 1px solid #e4e4e4;}
.allPlay{align-items: center;height: 44px;font-size: 15px;display: flex;justify-content: space-between;}
.allPlay>div:first-child {display: flex;}
.cell-song{width: 100%;height: 44px;display: flex;align-items: center;border-bottom: 1px solid #e4e4e4;}
.songindex,.allPlay i{width: 44px;}
.song-list-box{flex-wrap: wrap;}
.songList-box{z-index: 600;}
.songList-bg{width: 100px;height: 100px;border-radius: 4px;}
.songInfo{width: calc(100vw - 88px);}
.songartist{font-size: 12px;display: flex;}
.songName{font-size: 13px;display: flex;}
#Mbox{width: 100vw;height: 100%;overflow: hidden;}
.swiperBg{width: 100%;height: 100px;background: #e14439;position: absolute;border-top: 1px solid #e14439;}
.swiper-pagination-bullet-active {opacity: 1;background: #fd6c62;}
.Tright-ctrl{width: 44px;height: 44px;display: flex;align-items: center;justify-content: center;float: right;font-size: 18px;}
.songListInfo{display: flex;padding: 54px 18px 0;color: #fff;height: 224px;background-size: cover;background-position: 0 30%;}
.songListTop{width: calc(100vw - 132px);text-align: left;display: flex;flex-wrap: wrap;}
.SLT-top{width: 100%;height: 66.66%;}
.SLT-bot{width: 100%;height: 33.33%;font-size: 8px;overflow: hidden;text-overflow: ellipsis;height: 16px;white-space: nowrap;}
.songListName{padding: 10px 20px;width: calc(100% - 136px)}
.SLN-top{text-align: left; font-size: 16px;height: 46px;overflow: hidden;text-overflow: ellipsis;}
.SLN-bot{display: flex;align-items: center;margin: 8px 0;}
.SLN-bot>img{width: 28px;height: 28px;;border-radius: 50px;margin-right: 10px;}
.SLN-bot>div{font-size: 10px; }
.SLB-maskBg{content:'';position:absolute;top:0;left:0;width:100%;height:100vw;z-index:-1;background-size:cover;}
.functionBtn{color: #fff;display: flex;align-items: center;justify-content: space-around;height: 44px;}
.functionBtn div{width: 25%;}
.geshou{height: 100vh;}
</style>