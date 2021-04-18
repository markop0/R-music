<template>
  <div class="comment" >
    <div class="playHead">
        <div class="back" @click="openComment()"><i class="el-icon-back"></i></div>
        <div class="r-title">评论</div>
    </div>
    <div class="xBox" ref="comment" 
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp">
      <div>
        <div class="commentHead">精彩评论</div>
        <div>
          <div class="cellComment" v-for="(item,index) of comments" :key="index">
            <div class="avatarBox"><img class="item1" :src="item.user.avatarUrl" alt=""></div>
            <div class="infoBox">
              <div class="cHead">
                <div class="cheadL">
                  <p class="item2">{{item.user.nickname}}</p>
                  <p class="item3">{{getLocalTime(item.time)}}</p>
                </div>
                <div class="item4 flex_cc"><p></p>11w<i class="fa fa-thumbs-o-up flex zan"></i></div>
              </div>
              <p class="item5">{{item.content}}</p>
              <a class="item6" href="">条回复></a>
            </div>
          </div>
          <div><i class="el-icon-loading"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  mounted (){
    this.getData()
  },
  data () {
    return {
      comments:[],
      pullUpLoad: true,
      pullDownRefresh: true,
      pullUpLoad: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
    }
  
  
  },
  watch: {
      
      pullDownRefreshObj: {
        handler(val) {
          const scroll = this.$refs.scroll.scroll
          if (val) {
            scroll.openPullDown()
          } else {
            scroll.closePullDown()
          }
        },
        deep: true
      },
      pullUpLoadObj: {
        handler(val) {
          const scroll = this.$refs.scroll.scroll
          if (val) {
            scroll.openPullUp()
          } else {
            scroll.closePullUp()
          }
        },
        deep: true
      },
      startY() {
        this.rebuildScroll()
      }
  },
  computed: {
      scrollbarObj: function () {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    
  methods:{
    getData(){
        var playId= this.$store.state.playInfo.id
        this.$axios.get('/comment/music?id='+playId+'&offset=20')
        .then(re=>{
            this.comments = re.data.comments
        })
        this.$nextTick(() => {
        //$refs绑定元素
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.comment, {
            click:true  , //开启点击事件 默认为false
            scrollY: true,
            pullUpLoad: {
              threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
            },
            pullDownRefresh: {
              threshold: 30, // 下拉距离超过30px触发pullingDown事件
              stop: 20 // 回弹停留在距离顶部20px的位置
            }
        })
        
        // console.log(this.scroll)
        }else if(!this.$refs.comment){
          return
        }
        else{
          this.scroll.refresh()
        }
        })
    },
    getLocalTime(timestamp) {
        var c = new Date(parseInt(timestamp)).toLocaleString().replace(/:\d{1,2}$/,'')
        return c
    },
    onPullingDown() {
      // 模拟更新数据
      console.log('pulling down and load data')
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items.unshift(this.$i18n.t('normalScrollListPage.newDataTxt') + +new Date())
        } else {
          // 如果没有新数据
          this.$refs.comment.forceUpdate()
        }
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        if (Math.random() > 0.5) {
          // 如果有新数据
          let newPage = []
          for (let i = 0; i < 10; i++) {
            newPage.push(this.$i18n.t('normalScrollListPage.previousTxt') + ++this.itemIndex + this.$i18n.t('normalScrollListPage.followingTxt'))
          }

          this.items = this.items.concat(newPage)
        } else {
          // 如果没有新数据
          this.$refs.comment.forceUpdate()
        }
      }, 1500)
    },
  }
}
</script>
<style scoped>
.xBox{overflow: hidden;height: calc(100vh - 44px);margin-top: 44px;}
.comment{width: 100vw;height: 100vh;position: fixed;top: 0;background: #fafafa;z-index: 1200;}
.playHead{color: black;display: flex;height: 44px;width: 100%;position: fixed;top: 0;background: #fff;}
.back{color: black;}
.r-title{height: 100%;display: flex;align-items: center;justify-content: center;}
.cellComment{
  display: flex;flex-wrap: wrap;
  width: 100%;min-height: 40px;max-height: 120px;padding-left: 10px;
}
.cellComment+.cellComment{margin-top: 8px;}
.avatarBox{width: 40px;height: 100%;}
.infoBox{width: calc(100% - 70px);height: 100%;margin: 0 10px;text-align: left;display: flex;flex-wrap: wrap;}
.cHead{width: 100%;display: flex;flex-wrap: wrap;}
.cheadL{width: calc(100% - 120px)}
.zan{width: 30px;height: 30px;}
.item1{width: 36px;height: 36px;background: #fffae8;
border-radius: 50%; 
}
.item2{}
.item3{font-size: 10PX;color: #888888;}

.item4{width: 120px;}
.item5{text-overflow: ellipsis;overflow: hidden;max-height: 61px;}
.item6{width: 100%;border-bottom: 1px solid #d6d6d6;
    padding-bottom: 8px;}
/* .item{grid-column: ;grid-row: ;} */
.commentHead{text-align: left;margin-left: 10px;font-weight: bold;font-size: 15px;}
/*  */

.ccxxx{margin-bottom: 36px;align-items: 12o;overflow:hidden;padding:32px;font-weight: 900;}

</style>