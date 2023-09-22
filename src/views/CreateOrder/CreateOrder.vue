<template>
  <div class="main">
    <van-nav-bar title="生成订单" left-arrow fixed @click-left="backFn">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <van-contact-card type="edit" :name="name" :tel="tel" :address="address" @click="onEdit" />

    <van-card
      v-for="item in list"
      :key="item.goodsId"
      :num="item.goodsCount"
      :price="item.sellingPrice"
      :desc="item.goodsName"
      :thumb="item.goodsCoverImg"
    />

    <div class="footer">
      <van-row>
        <van-col :span="5" :offset="2">
          <span class="ttext">商品金额</span>
        </van-col>
        <van-col :span="5" :offset="10">
          <span class="tprice">￥ {{ totalMoney }}</span>
        </van-col>
      </van-row>

      <van-row class="order-footer">
        <van-Button type="primary" @click="orderHandle" color="#1baeae"
          >生成订单</van-Button
        >
      </van-row>
    </div>

    <van-popup
      v-model="isShow"
      @click-overlay="settleHandle"
      @click-close-icon="settleHandle"
      round
      closeable
      position="bottom"
      :style="{ height: '25%' }"
    >
      <div class="btn">
        <van-button type="info" block @click="zfbpayHandle"
          >支付宝支付</van-button
        >
        <van-button type="primary" block @click="vxpayHandle"
          >微信支付</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import {
  getAddressDetail,
  saveOrderList,
  getSettleList,
  pay,
} from "../../api/index";
export default {
  name: "CreateOrder",
  components: {},
  data() {
    return {
      id: "", //点击地址进入订单页传递的id
      name: "", //姓名
      tel: "", //电话
      address: "", //地址
      isShow: false, //是否显示支付方式
      addressId: "", //地址id
      cartItemIds: [], //订单商品id
      list: [], //被选中的商品订单
      orderNo: "", //订单号
      payType: "", //支付类型
    };
  },
  async created() {
    // 获取点击地址进入订单页的id
    this.id = this.$route.query.addressId;
    // console.log(this.id);
    // 发请求，获取地址信息
    let res = await getAddressDetail(this.id);
    // console.log(res);
    this.addressId = res.data.addressId;
    this.name = res.data.userName;
    this.tel = res.data.userPhone;
    this.address =
      res.data.provinceName +
      res.data.cityName +
      res.data.regionName +
      res.data.detailAddress;
  },
  mounted() {
    // 发送请求，获取被选中的商品订单
    if (this.$route.query.trueId) {
      getSettleList(this.$route.query.trueId).then((data) => {
        // console.log(data)
        this.list = data.data;
        // console.log(this.list);
      });
    } else {
      return;
    }
  },
  computed: {
    // 总金额
    totalMoney() {
      return this.list != null
        ? this.list.reduce((prev, next) => {
            // 先判断是否被选中
            return prev + next.goodsCount * next.sellingPrice;
          }, 0)
        : 0;
    },
  },
  methods: {
    // 返回上一级
    backFn() {
      this.$router.go(-2);
    },
    // 点击地址卡片
    onEdit() {
      this.$router.push("/address");
    },
    // 点击生成订单
    orderHandle() {
      this.isShow = true;
      // 保存订单
      this.saveOrder();
      // this.list != null ? this.list.forEach(item => {
      //   // console.log(this.list);
      //   this.cartItemIds.push(item.cartItemId);
      // }) : 0

      // saveOrderList({ addressId:this.addressId,cartItemIds:this.cartItemIds }).then((data)=>{
      //   // console.log(data);
      //   if(data.resultCode == 200){
      //     // 订单号
      //     this.orderNo = data.data
      //   }
      // })
    },

    // 支付宝支付
    zfbpayHandle() {
      // 支付宝支付是1
      this.payType = 1;
      pay(this.orderNo, this.payType).then((data) => {
        if (data.resultCode == 200) {
          Toast.success("支付宝支付成功");
        }
      });
      this.$router.push("/order");
    },
    // 微信支付
    vxpayHandle() {
      // 微信支付是2
      this.payType = 2;
      pay(this.orderNo, this.payType).then((data) => {
        // console.log(data)
        if (data.resultCode == 200) {
          Toast.success("微信支付成功");
        }
      });
      this.$router.push("/order");
      // console.log(".....")
    },
    // 点击遮罩层空白处或关闭按钮
    settleHandle() {
      // 保存订单
      this.saveOrder();
      this.$router.push("/order");
    },
    // 保存订单
    saveOrder() {
      this.list.forEach((item) => {
        // console.log(this.list);
        this.cartItemIds.push(item.cartItemId);
      });

      saveOrderList({
        addressId: this.addressId,
        cartItemIds: this.cartItemIds || [],
      }).then((data) => {
        // console.log(data);
        if (data.resultCode == 200) {
          // 订单号
          this.orderNo = data.data;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.main {
  padding-top: 46px;
  padding-bottom: 500px;
  background-color: #f9f9f9;
}
/deep/.van-card {
  margin: 0;
  background-color: #fff;
}
/deep/.van-card__desc {
  font-size: 12px;
  color: #2c3e50;
  margin-top: 30px;
}
/deep/.van-card__price {
  color: #f00;
}

.footer {
  width: 100%;
  height: 100px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  padding-top: 10px;
  box-sizing: border-box;
  border-top: 1px solid #eee;
}
.ttext {
  font-size: 14px;
  color: #2c3e50;
}
.tprice {
  font-size: 18px;
  color: #f00;
}
.order-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/.van-button {
  margin-top: 8px;
  width: 90%;
}

.btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
}
</style>