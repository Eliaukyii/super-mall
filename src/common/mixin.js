import {debounce} from "./utils"

export const itemListenerMixin={
    data(){
        return{
             ItemImgListener:null
        }
    },
    mounted(){
        let newRefresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener=()=>{
            newRefresh()
    }
        this.$bus.on('itemImgLoad',this.itemImgListener)
    }
}

import BackTop from 'components/content/backTop/BackTop.vue'
import {BACK_POSITION} from 'common/const'

export const backTopMixin={
    components:{
        BackTop
    },
    data(){
        return{
            isShowBackTop:false
        }
    },
    methods: {
        backTop () {
          this.$refs.scroll.scrollTo(0,0,300)
        },
        listenShowBackTop(position){
            this.isShowBackTop = -position.y > BACK_POSITION
          }
      }
}