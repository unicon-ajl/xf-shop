import Vue from 'vue'
import Vuex from 'vuex'

import { getCartList } from "../api/index"

Vue.use(Vuex)

// 集中状态管理
export default new Vuex.Store({
  state: {
    cartList:[],//购物车列表
  },
  getters: {
    cartNum(state){
      // 累加器
      return state.cartList.reduce((prev,next)=>{
        return prev + next.goodsCount
      },0)
    },
  },
  mutations: {
    // mutation是修改状态的唯一途径
    changeCartList(state,list){
      // 给每一个购物车数据添加一个checked
      list.map(item=>{
        item.checked = true;
      })
      state.cartList = list;
      // console.log(this.cartList);
    },
  },
  actions: {
    changeCartListAsync(context){
      getCartList().then(data=>{
        // commit一个mutation，mutation是修改状态的唯一途径
        context.commit("changeCartList",data.data)
      })
    }
  },
  modules: {
  }
})
