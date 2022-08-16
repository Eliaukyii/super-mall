import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import store from './store'

import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// createApp(App).mount('#app')

const app=createApp(App)
app.use(router)
app.mount('#app')
app.use(store)
app.use(VueLazyload)
app.config.globalProperties.$bus=new mitt()

//bus的函数emit和on是来源于mitt,而不是vue,不需要使用符号!!!

//创建事件总线
// app.config.globalProperties.$bus=createApp({})

//解决移动端300ms延迟
Fastclick.attach(document.body)