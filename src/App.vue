<template>
  <div id="app">
    <!-- 一级路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <!-- v-if="isShowNav"  控制在哪个页面显示，在哪个页面不显示 -->
    <tablebar v-if="isShowNav"></tablebar>
  </div>
</template>

<script>
import Tablebar from './components/Tablebar.vue';
export default {
  components: {
    Tablebar,
  },
  data(){
    return{
      isShowNav:false,
    }
  },
  watch:{
    // 监听路由变化
    $route(val){
      // console.log(val);
      this.isShowNav = val.meta.isShowNav;
    }
  }
};
</script>

<style lang="less">
</style>
