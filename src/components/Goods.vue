<template>
  <div>
    <!-- <slot></slot>
    <slot></slot> -->
    <slot name="title"></slot>
    
    <!-- <h3 class="title">{{ title }}</h3> -->
    <van-grid :column-num="2" :border="false">
        <van-grid-item v-for="item in goodsList" :key="item.goodsId" :to="'/singleGoods/' + item.goodsId">

          <!-- 作用域插槽 -->
          <slot :row="item">
          <!-- 插槽默认值 -->
            <van-image width="2.5rem" height="2.5rem" :src="abc.row.goodsCoverImg" />
            <span>{{ abc.row.goodsName }}</span>
            <p>{{ "￥" + abc.row.sellingPrice }}</p>
          </slot>

          <!-- <van-image width="2.5rem" height="2.5rem" :src="item.goodsCoverImg" />
          <span>{{ item.goodsName }}</span>
          <p>{{ "￥" + item.sellingPrice }}</p> -->
        </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "Goods",
  components: {
  },
  props: {
    goodsList:{
      type:Array,
      require:true,
    },
    title:{
      type:String
    }
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
.van-grid-item {
  width: 188px;
  height: 211px;
  font-size: 14px;
  color: #222333;
  text-align: center;
}
span {
  margin-top: 10px;
}
p {
  color: #1baeae;
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
</style>