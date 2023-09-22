<template>
  <div class="bot_nav_box">
    <router-link to="/home" class="item_box">
      <div class="icon iconfont icon-shouye"></div>
      <div class="text">首页</div>
    </router-link>

    <router-link to="/categary" class="item_box">
      <div class="icon iconfont icon-grouping"></div>
      <div class="text">分类</div>
    </router-link>

    <router-link to="/cart" class="item_box">
      <div class="icon iconfont icon-gouwuche"></div>
      <div class="text">购物车</div>
      <van-icon v-show="$store.state.cartList.length" :badge="$store.state.cartList.length" class="badge-icon"/>
    </router-link>

    <router-link to="/user" class="item_box">
      <div class="icon iconfont icon-31wode"></div>
      <div class="text">我的</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Tablebar",
  components: {},
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
.bot_nav_box {
  position: relative;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  border: 1px solid #eee;
  width: 100%;
  height: 60px;
  .item_box {
    width: 20%;
    color: #000;
    &.router-link-exact-active {
      //  & 符号，它就被解析为父元素
      color: #1baeae;
    }
    .icon {
      font-size: 20px;
      margin-bottom: 5px;
    }
    .text {
      font-size: 16px;
    }
  }
}
.badge-icon{
  position: absolute;
  top: 10px;
  right: 130px;
}
</style>