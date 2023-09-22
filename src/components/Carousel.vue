<template>
  <div class="carousel-main">
    <van-swipe :autoplay="3000" style="height: 168px;" indicator-color="#1baeae">
      <van-swipe-item v-for="image in images" :key="image.carouselUrl">
        <img v-lazy="image.carouselUrl" :src="image.carouselUrl"/>
        <!-- v-lazy="image.carouselUrl"  懒加载 -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

export default {
  name: "Carousel",
  components: {},
  props:['getDatalist'],
  data() {
    return {
        images:[],//轮播图片
    };
  },
  async created(){
    // 发送ajax请求，获取轮播图数据
    let data = await this.getDatalist();
    this.images = data.data.carousels
    // console.log(data);
  },
  methods: {},
};
</script>

<style scoped lang="less">
img{
    width: 375px;
    height: 168px;
    
}
.van-swipe__track{
    position: relative;
}
/deep/.van-swipe__indicators{
    position: absolute;
    bottom: 15px;
}
</style>