<template>
  <div class="cart-list-item">
    <cart-check-button
        @click.native="checkClick"
        :is-checked="itemInfo.checked"
        ref="checkButtonRef">
    </cart-check-button>

    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>

    <div class="item-info" @click="infoClick(item)">
      <p class="item-title">{{itemInfo.title}}</p>
      <p class="item-desc">{{itemInfo.desc}}</p>
      <span class="item-price">￥{{itemInfo.price}}</span>
      <span class="item-count">x{{itemInfo.count}}</span>
    </div>
  </div>
</template>

<script>
import CartCheckButton from './CartCheckButton.vue'
export default {
  name: 'CartListItem',
  components:{
    CartCheckButton
  },
  props:{
    itemInfo:{
     type:Object,
     default(){
      return {}
    }
  }
  },
  methods: {
    checkClick(){
     this.itemInfo.checked = !this.itemInfo.checked
    },
     infoClick(itemInfo) {
      this.$router.push("/detail/" + itemInfo.iid);
    }
  },
  mounted () {

  }
}
</script>

<style scoped>

.cart-list-item {
  width: 100%;
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
  display: flex;
  padding: 0.4rem;
  padding-left: 0rem;
}

.item-img {
  width: 3.5rem;
  height: 100%;
}
.item-img img {
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
}

.item-info {
  position: relative;
  width: calc(100% - 3.5rem - 1.2rem - 0.4rem);
  margin-left: 0.4rem;
}
.item-info p {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-title {
  font-size: 0.8rem;
  padding-bottom: 0.5rem;
  font-weight: 600;
}
.item-desc {
  font-size: 0.4rem;
  color: gray;
}
.item-price {
  position: absolute;
  left: 0;
  bottom: 0.4rem;
  font-size: 0.75rem;
  color: orangered;
}
.item-count {
  position: absolute;
  right: 0.4rem;
  bottom: 0.4rem;
  font-size: 0.75rem;
}
</style>
