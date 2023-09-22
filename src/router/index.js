import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由

const routes = [
  // 重定向    
  { path: "/", redirect: "/home" },
  {
    // 首页
    path: "/home",
    // import函数实现懒加载，/* webpackChunkName:"home" */ 是魔法注释，分包起名字
    component: () => import(/* webpackChunkName:"home" */"../views/Home/Home.vue"),
    // 额外信息，是否显示底部导航栏
    meta: { isShowNav: true, til:"首页" },
  },
  {
    // 分类
    path: "/categary",
    // import函数实现懒加载，/* webpackChunkName:"categary" */ 是魔法注释，分包起名字
    component: () => import(/* webpackChunkName:"categary" */"../views/Categary/Categary.vue"),
    // 额外信息，是否显示底部导航栏
    meta: { isShowNav: true, til:"分类" }
  },
  {
    // 购物车
    path: "/cart",
    // import函数实现懒加载，/* webpackChunkName:"cart" */ 是魔法注释，分包起名字
    component: () => import(/* webpackChunkName:"cart" */"../views/Cart/Cart.vue"),
    // 额外信息，是否显示底部导航栏
    meta: { isShowNav: true, til:"购物车" }
  },
  {
    // 我的
    path: "/user",
    // import函数实现懒加载，/* webpackChunkName:"user" */ 是魔法注释，分包起名字
    component: () => import(/* webpackChunkName:"user" */"../views/User/User.vue"),
    // 额外信息，是否显示底部导航栏
    meta: { isShowNav: true, til:"我的" }
  },
  {
    // 登录
    path: "/login",
    // import函数实现懒加载，/* webpackChunkName:"login" */ 是魔法注释，分包起名字
    component: () => import(/* webpackChunkName:"login" */"../views/Login/Login.vue"),
    // 额外信息，是否显示底部导航栏，登录页面不显示
    meta: { isShowNav: false, til:"登录" }
  },
  {
    path: "/search",
    component: () => import(/* webpackChunkName:"search" */"../views/Search/Search.vue"),
    meta: { isShowNav: false }
  },
  {
    path: "/singleGoods/:id",
    component: () => import(/* webpackChunkName:"singleGoods" */"../views/singleGoods/singleGoods.vue"),
    meta: { isShowNav: false }
  },
  {
    path: "/address",
    component: () => import(/* webpackChunkName:"address" */"../views/Address/Address.vue"),
    meta: { isShowNav: false,til:"地址管理" }
  },
  {
    path: "/addressedit",
    component: () => import(/* webpackChunkName:"addressedit" */"../views/Address/AddressEdit.vue"),
    meta: { isShowNav: false }
  },
  {
    path: "/createorder",
    component: () => import(/* webpackChunkName:"createorder" */"../views/CreateOrder/CreateOrder.vue"),
    meta: { isShowNav: false }
  },
  {
    path: "/order",
    component: () => import(/* webpackChunkName:"order" */"../views/Order/Order.vue"),
    meta: {
      isShowNav: false,
      til:"订单页"
    }
  },
  {
    path: "/settle",
    component: () => import(/* webpackChunkName:"settle" */"../views/Settle/Settle.vue"),
    meta: {
      isShowNav: false,
    }
  },
  {
    path: "/account",
    component: () => import(/* webpackChunkName:"account" */"../views/Account/Account.vue"),
    meta: {
      isShowNav: false,
      til:"账号管理"
    }
  },
  {
    path: "/about",
    component: () => import(/* webpackChunkName:"settle" */"../views/About/About.vue"),
    meta: {
      isShowNav: false,
      til:"关于我们"
    }
  }
]

const router = new VueRouter({
  routes
})

// 配置全局路由导航卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.til || "小熊商城"
  next();
})

export default router
