// 入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入重置样式
import "./assets/reset.css"

// 引入flexible 适配
import "./assets/flexible.js"

// 引入字体图标样式
import './assets/fonts/iconfont.css'

// 导入vant.js
import './utils/vant'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
