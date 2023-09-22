<template>
  <div class="main">
    <van-nav-bar title="我的订单" left-arrow fixed @click-left="backFn">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <van-tabs v-model="index">
      <van-tab v-for="item in tabs" :key="item.text" :title="item.text">
      </van-tab>
    </van-tabs>

    <van-list
      :immediate-check="false"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.orderId" @click="setttleHandle(item.orderNo)">
        <template #default>
          <van-row>
            <van-row>
              <van-col :span="20">订单时间：{{ item.createTime }}</van-col>
              <van-col :span="4">{{ item.orderStatusString }}</van-col>
            </van-row>
            <van-row
              v-for="v in item.newBeeMallOrderItemVOS"
              :key="v.goodsId"
              class="main-wrapper"
            >
              <van-col :span="6" class="img">
                <img
                  width="100px"
                  height="100px"
                  :src="v.goodsCoverImg"
                  alt=""
                />
              </van-col>

              <van-col :span="15" :offset="1" class="wrapper">
                <span class="vname">{{ v.goodsName }}</span>
                <p>全场包邮</p>
                <van-row>
                  <van-col :span="20" class="vprice">￥{{ v.sellingPrice }}</van-col>
                  <van-col :span="2" class="vcount">x{{ v.goodsCount }}</van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-cell>
    </van-list>

    <div class="settleList"></div>
  </div>
</template>

<script>
import { getOrderList } from "../../api/index";
export default {
  name: "Order",
  components: {},
  created() {
    this.onLoad();
  },
  data() {
    return {
      pageNumber: 1, //页码
      status: "", //商品状态
      index:0 ,//功能栏索引
      loading: false, //加载效果
      finished: false, //是否加载完毕
      list: [], //订单数据
      tabs: [
        {
          text: "全部",
          status: "",
        },
        {
          text: "待付款",
          status: "0",
        },
        {
          text: "待确认",
          status: "1",
        },

        {
          text: "代发货",
          status: "2",
        },
        {
          text: "已发货",
          status: "3",
        },
        {
          text: "交易完成",
          status: "4",
        },
      ],
    };
  },
  watch:{
    // 双向数据绑定索引，监听索引的变化
    index(val){
      // val就是索引，点谁拿到谁的索引
      // console.log(val);
      // 配合索引，点谁拿到谁的状态status
      // console.log(this.tabs[val].status)

      // 点击谁，将拿到的状态status，赋值给status
      this.status = this.tabs[val].status

      // 拿到了状态，发送ajax请求，更新数据
      // 在发送ajax请求之前，先把pageNumber置为1
      this.pageNumber = 1;

      // 把list清空，自动触发load事件
      this.list = [];

      // 切换新的tab之后，finished要置为false，因为之前可能把finfished置为了true
      this.finished = false;

      // 手动触发onload事件
      this.onLoad();
    },
  },
  methods: {
    // 返回上一级
    backFn() {
      this.$router.push('/cart');
    },
    // 触底加载
    onLoad() {
      setTimeout(()=>{
      // console.log("....")
      // this.finished = false;
      // this.pageNumber++整体是个旧值，当触底加载时，pageNumber是新值
      getOrderList(this.pageNumber++, this.status).then((data) => {
        // console.log(data);
        if (data.data.list.length == 0) {
          // 所有数据都加载完了
          this.finished = true;
        }
        this.list = this.list.concat(data.data.list);

        // 数据回来了，loading置为false
        this.loading = false;
      });
    },50)
    },
    // 点击订单
    setttleHandle(orderNo){
      // console.log(orderNo);
      // 把订单号传递过去，接下来会根据订单号调取订单详情
      this.$router.push('/settle?orderNo=' + orderNo)
    },
  },
};
</script>

<style scoped lang="less">
/deep/.van-tabs {
  position: fixed;
  top: 46px;
  right: 0;
  left: 0;
  z-index: 200;
}

.main {
  padding-top: 90px;
  background-color: #f9f9f9;
}

/deep/.van-cell{
  margin-bottom: 10px;
}

.main-wrapper{
  padding-bottom: 10px;
}
</style>