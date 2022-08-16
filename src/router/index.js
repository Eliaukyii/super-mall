import {createRouter,createWebHistory} from 'vue-router'

const Home=()=>import('../views/home/Home.vue')
const Category=()=>import('../views/category/Category.vue')
const Cart=()=>import('../views/cart/Cart.vue')
const Profile=()=>import('../views/profile/Profile.vue')
const Detail=()=>import('../views/detail/Detail.vue')


//安装插件
// Vue.use(Router)
const routerHistory=createWebHistory()

//创建路由对象
const router = createRouter({
    history:routerHistory,
    routes:[
    {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        component:Home
      },
      {
        path:'/category',
        component:Category
      },
      {
        path:'/cart',
        component:Cart
      },
      {
        path:'/profile',
        component:Profile
      },
      {
        path:'/detail/:iid',
        component:Detail
      }

]
})
export default router