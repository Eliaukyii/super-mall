<template>
<div id="home">
<nav-bar class="home-nav">
  <template v-slot:center>
    <span>购物街</span>
  </template>
  </nav-bar>
<tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick" 
                    ref="tabControl1" 
                    class="tab-control"
                    v-show="isTabFixed"/>
 <scroll 
      class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll" :pull-up-load="true" 
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick" 
                    ref="tabControl2"/>
      <good-list :goods="showGoods"/>
</scroll>
<back-top @click.native="backTop" v-show="isShowBackTop"/>
</div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import BackTop from 'components/content/backTop/BackTop'
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll.vue'

import {getHomeMultidata,getHomeGoods} from "network/home"
import {backTopMixin} from 'common/mixin'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop

  },
  mixins:[backTopMixin],
   data(){ 
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      isShowBackTop:false
   }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed(){
    console.log('home destroyed');
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    //1.保存Y值
    this.saveY=this.$refs.scroll.getScrollY()
    //2.取消全局事件的监听
    this.$bus.off('itemImgLoad',this.ItemImgListener)
  },
  created(){
    //请求多个数据
    this.getHomeMultidata()

    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },

  mounted(){
   
  },
  methods:{
    /*
    事件监听相关的方法
    */
  
   tabClick(index){
    switch(index){
      case 0:
        this.currentType='pop'
        break
      case 1:
        this.currentType='new'
        break
      case 2:
        this.currentType='sell'
        break
    }
    this.$refs.tabControl1.currentIndex=index;
    this.$refs.tabControl2.currentIndex=index;
   },
    backTop () {
        this.$refs.scroll.scrollTo(0,0)
      },
    contentScroll(position){
      //1.判断isShowBackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      //2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },

    swiperImageLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop; 
    },
    /*
    网络请求相关方法
    */

    getHomeMultidata(){
      getHomeMultidata().then(res => {
     console.log(res);
      //  this.result=res;
      this.banners = res.data.data.banner.list;
      this.recommends=res.data.data.recommend.list;
    })
  },
  getHomeGoods(type){
    const page=this.goods[type].page+1
    getHomeGoods(type,page).then(res=>{
      //console.log(res);
      this.goods[type].list.push(...res.data.data.list)
      this.goods[type].page += 1    
      // this.goods[type].list.concat(this.goods[type].list.push(res.data.data.list))
      
      //完成上拉加载更多
      this.$refs.scroll.finishPullUp()
    })
    }


  }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav{
    background-color:var(--color-tint);
    color: white;
    
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
} 

/* .content{
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
.content{
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index:9;
}
</style>
