<template>
<div id="app">
    <router-view v-slot="{Component}">  
    <keep-alive exclude="Detail">
      <component :is="Component"></component>
    </keep-alive>
    </router-view>
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
  <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabbar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
   MainTabBar
  }
}
</script>

<style>
  @import './assets/css/base.css';
</style>
