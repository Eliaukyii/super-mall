<template>
<div class="cart">
  <!-- 导航 -->
  <nav-bar class="nav-bar">
      <template v-slot:center>
          <span>购物车({{cartLength}})</span>
      </template>
  </nav-bar>
  <!-- 商品列表 -->
  <cart-list/>
  <!-- 底部汇总 -->
  <cart-button-bar/>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComp/CartList.vue'
import CartButtonBar from './childComp/CartButtonBar.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components:{
   NavBar,
   CartList,
   CartButtonBar
  },
computed:{
    ...mapGetters([
       'cartLength',
       'cartList'
    ])
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color:#fff;
}
</style>
