<template>
  <div id="detail">
   <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
   <scroll 
        class="content" 
        ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll">
   <detail-swiper :top-images="topImages"/>
   <detail-base-info :goods="goods"/>
   <detail-shop-info :shop="shop"/>
   <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
   <detail-param-info ref="params" :param-info="paramInfo"/>  
  <detail-comment-info ref="comment" :comment-info="commentInfo"/>
  <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
  <detail-bottom-bar @addCart="addToCart"/>
  <back-top @click.native="backTop" v-show="isShowBackTop"/>
  <!-- <toast :message="message" :show="show"/> -->

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
// import Toast from 'components/common/toast/Toast.vue'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

export default {
  name: 'Detail',
  components:{
   DetailNavBar,
   DetailSwiper,
   DetailBaseInfo,
   DetailShopInfo,
   DetailGoodsInfo,
   DetailParamInfo,
   DetailCommentInfo,
   DetailBottomBar,
   Scroll,
   GoodsList,
  //  Toast
  },
  mixins:[itemListenerMixin,backTopMixin],
    data() {
     return {
        iid:null,
        topImages: [],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        isShowBackTop:false,
        // message:'',
        // show:false
    }
  },
  created(){
    //1.保存传入的iid
     this.iid=this.$route.params.iid

     //2.根据iid请求详细数据
     getDetail(this.iid).then(res=>{
       console.log(res)
        //1.获取数据
        const data=res.data.result

        //2.取出轮播图的数据
        this.topImages=res.data.result.itemInfo.topImages

        //3.获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        
        //4.创建店铺信息的对象
        this.shop=new Shop(data.shopInfo)

        //5.保存商品的详情数据
        this.detailInfo=data.detailInfo

        //6.获取参数的信息
       this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //7.取出评论的信息
        if(data.rate.cRate!==0){
          this.commentInfo=data.rate.list[0]
        }      
     })
  
    //3.请求推荐数据
    getRecommend().then(res=>{
      this.recommends=res.data.data.list
      //  console.log(res);
    })

    //4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)

      this.getThemeTopY=debounce(()=>{
        if(this.$refs.params&&this.$refs.comment&&this.$refs.recommend)
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE);
        //console.log(this.themeTopYs);

      },100)

  
  },
  mounted () {
    
  },
  updated(){
   
  },
  destroyed(){
    this.$bus.off('itemImgLoad',this.itemImgListener)
  },
  methods: {
    // ...mapActions(['addCart']),
    imageLoad(){
     this.$refs.scroll.refresh()
     this.getThemeTopY()
    },
    titleClick(index){
     // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)

    },
   
    contentScroll(position){
      //获取y值
      const positionY=-position.y
      let length=this.themeTopYs.length
      for (let i = 0; i < length-1; i++) {
        if(this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&& positionY < this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(this.currentIndex);
        }
        
      }
      //是否显示回到顶部
        this.listenShowBackTop(position)
    },

    addToCart(){
      //1.获取购物车需要展示的信息
     const product={}
     product.image=this.topImages[0];
     product.title=this.goods.title;
     product.desc=this.goods.desc;
     product.newPrice = this.goods.realPrice
     product.iid=this.iid
   
    //2.将商品添加到购物车
     //this.$store.commit('addCart',product)
    // this.$store.dispatch('addCart',product).then(res=>{
    //   console.log(res);
    // })

    // this.addCart(product).then(res=>{
    //   // this.show=true;
    //   // this.message=res;

    //   // setTimeout(()=>{
    //   //   this.show=false;
    //   //   this.message=''
    //   // },1500)
    //   this.$toast.show(res,2000)
    //   console.log(this.$toast);
    //   this.$toast.show(res)
    // }
    //) 

    this.$store.dispatch('addCart',product)
  }
}
}


</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
}
.content{
  height: calc(100%-44px);
  background-color: #fff;
}
</style>