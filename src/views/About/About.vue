<template>
  <div class="main">
    <van-nav-bar title="关于我们" left-arrow fixed @click-left="backFn">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <div class="introduce">
      <van-divider :style="{ color: 'rgb(27, 174, 174)', borderColor: 'rgb(27, 174, 174)', padding: '0 16px' }">
        简介
      </van-divider>
      <p class="circle" >
        小熊在线购物平台项目是一套电商系统，包括 Ajl-mall 商城系统及 Ajl-mall-admin 商城后台管理系统，基于 JavaScript、vue 及相关技术开发。 前台商城系统包含首页门户、商品分类、新品上线、首页轮播、商品推荐、商品搜索、商品展示、购物车、订单结算、订单流程、个人订单管理、会员中心、帮助中心等模块。
      </p>

      <van-divider :style="{ color: 'rgb(27, 174, 174)', borderColor: 'rgb(27, 174, 174)', padding: '0 16px' }">
        开源地址
      </van-divider>
      <p>
        gitee文档：<a target="_blank" href="https://gitee.com/fallen-leaves-mourn">https://gitee.com/fallen-leaves-mourn</a>
      </p>
      <p>
        前端 Vue 开源地址：<a target="_blank" href="https://github.com/newbee-ltd/newbee-mall-vue-app">https://github.com/newbee-ltd/newbee-mall-vue-app</a>
      </p>
      <p>
        线上预览地址：<a target="_blank" href="http://47.99.134.126:5000/">http://47.99.134.126:5000/</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  components: {},
  data() {
    return {};
  },
  methods: {
    // 返回上一级
    backFn() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="less">
.main {
  padding-top: 46px;
}

.introduce{
  padding: 0 20px 20px 20px;
}
.circle{
  line-height: 25px;
  text-indent: 1em;
}

p{
  font-size: 16px;
  color: #2c3e50;
  // 强制换行，英语单词不完整
  word-break:break-all;
  margin-bottom: 20px;
  line-height: 25px;
}
</style>