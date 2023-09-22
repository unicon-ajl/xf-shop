<template>
  <div class="main">
    <van-nav-bar title="订单详情" left-arrow fixed @click-left="backFn">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <div class="orderState">
      <van-row>
        <van-col class="text1">订单状态：</van-col>
        <van-col class="text2">{{ orderObj.orderStatusString }}</van-col>
      </van-row>
      <van-row>
        <van-col class="text1">订单编号：</van-col>
        <van-col class="text2">{{ orderNo }}</van-col>
      </van-row>
      <van-row>
        <van-col class="text1">下单时间：</van-col>
        <van-col class="text2">{{ orderObj.createTime }}</van-col>
      </van-row>
      <div
        v-if="
          this.orderObj.orderStatusString == '交易成功' ||
          this.orderObj.orderStatusString == '手动关闭'
            ? false
            : true
        "
      >
        <van-row class="btn">
          <van-Button color="#1baeae" @click="clickHandle">{{
            orderObj.payType != 0 ? "确认收货" : "去支付"
          }}</van-Button>
        </van-row>
        <van-row class="btn">
          <van-Button type="default" @click="cancelHandle">{{
            "取消订单"
          }}</van-Button>
        </van-row>
      </div>
    </div>

    <div class="middle">
      <van-row>
        <van-col class="text1">商品金额：</van-col>
        <van-col class="text2">￥ {{ orderObj.totalPrice }}</van-col>
      </van-row>
      <van-row>
        <van-col class="text1">配送方式：</van-col>
        <van-col class="text2">普通快递</van-col>
      </van-row>
    </div>

    <div class="footer">
      <van-card
        v-for="item in orderObj.newBeeMallOrderItemVOS"
        :key="item.goodsId"
        :num="item.goodsCount"
        :price="item.sellingPrice"
        :desc="item.goodsName"
        :thumb="item.goodsCoverImg"
      />
    </div>

    <van-popup
      v-model="isShow"
      @click-overlay="settleHandle"
      round
      position="bottom"
      :style="{ height: '25%' }"
    >
      <div class="paybtn">
        <van-button class="zfbbtn" type="info" block @click="zfbpayHandle"
          >支付宝支付</van-button
        >
        <van-button class="wxbtn" type="primary" block @click="vxpayHandle"
          >微信支付</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { settleDetail, dealSuccess, pay, cancelDeal } from "../../api/index";
import { Dialog, Toast } from "vant";
export default {
  name: "Settle",
  components: {},
  data() {
    return {
      orderNo: "", //订单号
      orderObj: {}, //订单详情数据
      isShow: false, //是否显示支付页面
      showPopover:false,//是否显示气泡弹出框
      actions:[{text:'购物车'},{text:'首页'}]//弹出框选项
    };
  },
  created() {
    // console.log(this.$route.query.orderNo)
    this.orderNo = this.$route.query.orderNo;
    settleDetail(this.orderNo).then((data) => {
      // console.log(data);
      this.orderObj = data.data;
      // console.log(this.orderObj);
    });
  },
  methods: {
    // 返回上一级
    backFn() {
      this.$router.back();
    },
    // 点击右上角图标
    onSelect(){
      this.showPopover = true
    },
    // 点击确认收货或去支付
    clickHandle() {
      if (this.orderObj.payType != 0) {
        Dialog.confirm({
          title: "是否确认收货？",
        })
          .then(() => {
            // 点击确认，销毁按钮
            // this.isEnsure = false;
            // 发送确认收货请求
            dealSuccess(this.orderNo).then((data) => {
              // console.log(data);
              if (data.resultCode == 200) {
                // 请求成功，重新发请求，更新数据
                settleDetail(this.orderNo).then((data) => {
                  // console.log(data);
                  this.orderObj = data.data;
                });
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.isShow = true;
      }
    },
    // 支付宝支付
    zfbpayHandle() {
      // 支付宝支付是1
      this.payType = 1;
      pay(this.orderNo, this.payType).then((data) => {
        if (data.resultCode == 200) {
          Toast.success("支付宝支付成功");
          this.isShow = false;
          // 请求成功，重新发请求，更新数据
          settleDetail(this.orderNo).then((data) => {
            console.log(data);
            this.orderObj = data.data;
          });
        }
      });
    },
    // 微信支付
    vxpayHandle() {
      // 微信支付是2
      this.payType = 2;
      pay(this.orderNo, this.payType).then((data) => {
        // console.log(data)
        if (data.resultCode == 200) {
          Toast.success("微信支付成功");
          this.isShow = false;
          // 请求成功，重新发请求，更新数据
          settleDetail(this.orderNo).then((data) => {
            // console.log(data);
            this.orderObj = data.data;
          });
        }
      });
    },
    // 点击遮罩层空白处
    settleHandle() {
      // 关闭遮罩层
      this.isShow = false;
    },
    // 点击取消订单
    cancelHandle() {
      Dialog.confirm({
        title: "确认取消订单？",
      })
        .then(() => {
          // on confirm
          cancelDeal(this.orderNo).then((data) => {
            // console.log(data);
            if (data.resultCode == 200) {
              // 取消订单成功，重新发请求，更新数据
              settleDetail(this.orderNo).then((data) => {
                // console.log(data);
                Toast.success("取消订单成功");
                this.orderObj = data.data;
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style scoped lang="less">
.main {
  box-sizing: border-box;
  padding-top: 46px;
  background-color: #f7f7f7;
  height: 100%;
}
.orderState {
  // height: 200px;
  background-color: #fff;
  padding: 10px;
}
/deep/.van-row {
  margin-top: 10px;
}
.text1 {
  color: #999;
  font-size: 15px;
}
.text2 {
  color: #2c3e50;
  font-size: 15px;
}
/deep/.van-button--default {
  width: 350px;
}
.middle {
  margin: 20px 0px;
  padding: 10px;
  background-color: #fff;
}
/deep/.van-card__desc {
  margin-top: 25px;
}
/deep/.van-card__bottom {
  margin-bottom: 15px;
}
/deep/.van-card {
  margin: 0px;
  background-color: #fff;
}

.paybtn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.zfbbtn {
  margin: 20px 0px;
}
/deep/.van-popover--light{
  width: 10px;
}
</style>