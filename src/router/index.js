import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'
import Main from '@/views/Main'
import Order from '@/views/Order/index' //订单
import Unpaidorders from '@/views/Order/unpaidorders' //未支付订单列表 
//import OrderDelivery from '@views/Order/orderdelivery' //正在配送的订单
import Goods from '@/views/Goods/index'  //商品
import GoodAdd from '@/views/Goods/add'  //增加商品
import Users from '@/views/User/index'   //用户
import Tickets from '@/views/Tickets/index'  //水票
import Bucket from '@/views/Bucket/index'  //水桶
import Fan from '@/views/Fan/index'       //反馈
import Tgoods from '@/views/Tongji/tgoods' //单个统计
import Tongji from '@/views/Tongji/index'  //总统计
import Tuisong from '@/views/Tuisong/index' //推送
import Config from '@/views/Config/group'  //设置

Vue.use(Router)

export default new Router({
  routes: [
    //订单路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        { 
          path: '/order', 
          name: 'order', 
          component: Order
      },
        {
          path: '/order/unpaidorders',
          name: ' Unpaidorders',
          component: Unpaidorders
        }
     
      ]
    },
    //商品路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },{
          path: '/goods/add',
          name: 'goodsadd',
          component: GoodAdd
        }
      ]
    },
    //用户路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/users',
          name: 'user',
          component: Users
        }
      ]
    },
    //水票路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/tickets',
          name: 'tickets',
          component: Tickets
        }
      ]
    },
    //水桶路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/bucket',
          name: 'bucket',
          component: Bucket
        }
      ]
    },
    //反馈路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/fan',
          name: 'fan',
          component: Fan
        }
      ]
    },
    //单个统计路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/tgoods',
          name: 'tgoods',
          component: Tgoods
        }
      ]
    },
    //总统计路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/tongji',
          name: 'tongji',
          component: Tongji
        }
      ]
    },
    //推送路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/tuisong',
          name: 'tuisong',
          component: Tuisong
        }
      ]
    },
    //设置路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/config',
          name: 'config',
          component: Config
        }
      ]
    },


  ]
})

