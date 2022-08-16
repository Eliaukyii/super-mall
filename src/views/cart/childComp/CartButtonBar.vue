<template>
  <div class="button-bar">
    <div class="check-content">
      <cart-check-button
        class="check-button"
      />
      <span>全选</span>
    </div>
    <div class="price">
          合计：
      </div>
    <div class="calculate"
         @click="calcClick">
         结算：
         </div>
  </div>
</template>

<script>
import CartCheckButton from "./CartCheckButton";

export default {
  name: "CartButtonBar",
  components: {
    CartCheckButton,
  }
}

</script>

<style scoped>
.button-bar {
  display: flex;
  position: relative;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-right: 5px;
  width: 90px;
}
.price {
  margin-left: 10px;
  flex: 1;
}
.button-bar .calculate {
  /* float: right!important; 在flex中不起作用*/
  /* margin-left: 50px; */
  text-align: center;
  width: 90px;
  background-color: red;
  color: #fff;
}
.check-button {
  width: 20px;
}
</style>