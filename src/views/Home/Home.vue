<template>
  <div class="home-main">
    <div class="home-header" :class="{ current: isBgc }">
      <i class="icon iconfont icon-fenlei" :class="{ active: isTop }"></i>
      <div class="xfshop">
        <span class="text1">小熊商城</span>
        <span class="text2">|</span>
        <div @click="clickHandle">
          <router-link to="/search?from=home">
            <span class="text3">山河无恙，人间皆安</span>
          </router-link>
        </div>
      </div>
      <div>
        <van-icon
          v-if="noShow"
          name="contact"
          :class="{ active: isTop }"
          @click="$router.push('/user')" />
        <span
          v-if="isShow"
          class="text4"
          :class="{ active: isTop }"
          @click="login"
          >登录</span
        >
      </div>
    </div>

    <!-- 轮播图 -->
    <Carousel :getDatalist="getDatalist"></Carousel>

    <!-- 功能菜单 -->
    <Menu></Menu>

    <!-- 新品上线，热门商品，最新推荐 -->
    <!-- 1.父传子 -->
    <!-- 2.插槽 -->
    <!-- 默认插槽，匿名插槽 -->
    <Goods :goodsList="newGoodses" title="新品上线">
      <template #title>
        <div>
          <h3 class="title">新品上线</h3>
        </div>
      </template>
      <!-- lalala xixixi hahaha -->

      <template #default="abc">
        <van-image
          width="2.5rem"
          height="2.5rem"
          :src="abc.row.goodsCoverImg" />
        <span>{{ abc.row.goodsName }}</span>
        <p>{{ '￥' + abc.row.sellingPrice }}</p>
      </template>
    </Goods>

    <Goods :goodsList="hotGoodses" title="热门商品">
      <!-- 具名插槽 -->
      <!-- slot="title"  表示向title中插入内容 -->
      <!-- <div slot="title">
        <h1>heiheihei</h1>
      </div> -->

      <!-- 简写 -->
      <!-- <template #title>
      <h1>heiheihei</h1>
    </template> -->

      <template #title>
        <div>
          <h3 class="title">热门商品</h3>
        </div>
      </template>

      <!-- 使用组件时，决定子组件的结构 -->
      <template #default="abc">
        <van-image
          width="2.5rem"
          height="2.5rem"
          :src="abc.row.goodsCoverImg" />
        <span>{{ abc.row.goodsName }}</span>
        <p>{{ '￥' + abc.row.sellingPrice }}</p>
      </template>
    </Goods>

    <Goods :goodsList="recommendGoodses" title="最新推荐">
      <template #title>
        <div>
          <h3 class="title">最新推荐</h3>
        </div>
      </template>

      <template #default="abc">
        <van-image
          width="2.5rem"
          height="2.5rem"
          :src="abc.row.goodsCoverImg" />
        <span>{{ abc.row.goodsName }}</span>
        <p>{{ '￥' + abc.row.sellingPrice }}</p>
      </template>
    </Goods>
  </div>
</template>

<script>
import Carousel from '../../components/Carousel.vue';
import Menu from '../../components/Menu.vue';
import Goods from '../../components/Goods.vue';
import { carousel } from '../../api/index';
export default {
  name: 'Home',
  components: {
    Carousel,
    Menu,
    Goods,
  },
  data() {
    return {
      isTop: false, //是否添加active这个类
      isBgc: false, //是否添加isBgc这个类
      newImgs: [
        'https://s1.ax1x.com/2023/05/07/p9dd579.jpg',
        'https://s1.ax1x.com/2023/05/07/p9ddWXF.jpg',
        'https://s1.ax1x.com/2023/05/07/p9ddokR.jpg',
        'https://s1.ax1x.com/2023/05/07/p9dd40J.jpg',
        'https://s1.ax1x.com/2023/05/07/p9ddhm4.jpg',
      ],
      hotImgs: [
        'https://s1.ax1x.com/2023/05/07/p9ddTt1.jpg',
        'https://s1.ax1x.com/2023/05/07/p9ddbp6.jpg',
        'https://s1.ax1x.com/2023/05/07/p9ddq1K.jpg',
        'https://s1.ax1x.com/2023/05/07/p9ddL6O.jpg',
      ],
      recomImgs: [
        'https://s1.ax1x.com/2023/05/07/p9ddOXD.jpg',
        'https://s1.ax1x.com/2023/05/07/p9dd7fx.jpg',
        'https://s1.ax1x.com/2023/05/07/p9ddjne.jpg',
        'https://s1.ax1x.com/2023/05/07/p9ddx7d.jpg',
        'https://s1.ax1x.com/2023/05/07/p9ddv0H.jpg',
        'https://s1.ax1x.com/2023/05/07/p9dwSAA.jpg',
        'https://s1.ax1x.com/2023/05/07/p9dwSAA.jpg',
        'https://s1.ax1x.com/2023/05/07/p9dwSAA.jpg',
        'https://s1.ax1x.com/2023/05/07/p9dwSAA.jpg',
        'https://s1.ax1x.com/2023/05/07/p9dwSAA.jpg',
      ],
      newGoodses: [], //新品上线数据
      hotGoodses: [], //热门商品数据
      recommendGoodses: [], //最新推荐数据
      isShow: true, //是否显示登录按钮
      noShow: false, //是否显示我的按钮
    };
  },
  async created() {
    // console.log(localStorage.getItem('xftoken'));
    if (localStorage.getItem('xftoken')) {
      // 有令牌，证明登录了，首页右上角显示我的，隐藏登录按钮
      this.isShow = false;
      this.noShow = true;
    } else {
      // 没有登录，隐藏右上角我的按钮，显示登录按钮
      this.noShow = false;
    }

    let res = await this.getDatalist();
    console.log(res);
    // 图片地址处理
    res.data.newGoodses.map((item, index) => {
      console.log(item, index);
      item.goodsCoverImg = this.newImgs[index];
    });
    this.newGoodses = res.data.newGoodses;

    res.data.hotGoodses.map((item, index) => {
      console.log(item, index);
      item.goodsCoverImg = this.hotImgs[index];
    });
    this.hotGoodses = res.data.hotGoodses;

    res.data.recommendGoodses.map((item, index) => {
      console.log(item, index);
      item.goodsCoverImg = this.recomImgs[index];
    });
    this.recommendGoodses = res.data.recommendGoodses;
  },
  methods: {
    // 发送ajax请求，获取数据
    async getDatalist() {
      return await carousel();
    },
    // 点击搜索框，跳转到搜索页面
    clickHandle() {
      console.log('......');
    },
    // 滚动条卷上去的高度
    changeTop() {
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      if (t > 50) {
        // 添加背景色
        this.isTop = true;
        this.isBgc = true;
      } else {
        // 移除背景色
        this.isTop = false;
        this.isBgc = false;
      }
    },
    // 点击登录按钮
    login() {
      this.$router.push('/login');
    },
  },
  mounted() {
    // 监听滚动条事件
    window.addEventListener('scroll', this.changeTop);
  },
  beforeDestroy() {
    // 解绑滚动条事件
    window.removeEventListener('scroll', this.changeTop);
  },
};
</script>

<style scoped lang="less">
.home-main {
  padding-bottom: 2000px;
}
.home-header {
  width: 100%;
  height: 50px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 200;

  font-size: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  color: #1baeae;
  .xfshop {
    width: 260px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.7);

    display: flex;
    justify-content: space-evenly;

    .text1 {
      font-size: 20px;
      font-weight: bold;
    }
    .text3 {
      margin-left: 3px;
      font-size: 14px;
      color: #666;
    }
    .text2 {
      color: #666;
      font-size: 18px;
    }
  }
}
.title {
  background-color: #f9f9f9;
  text-align: center;
  font-size: 16px;
  color: #1baeae;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.active {
  color: #fff;
}
.current {
  background-color: #1baeae;
}
</style>
