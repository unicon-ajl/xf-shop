<template>
  <div class="main">
    <van-nav-bar title="商品详情" left-arrow fixed @click-left="backFn">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <van-image width="100%" height="100%" :src="data.goodsCoverImg" />
    <p class="gname">{{ data.goodsName }}</p>
    <p class="gpost">免邮费 顺丰快递</p>
    <p class="gprice">{{ '￥' + data.sellingPrice }}</p>
    <van-row>
      <van-col span="6">概述</van-col>
      <van-col span="6">参数</van-col>
      <van-col span="6">安装服务</van-col>
      <van-col class="none" span="6">常见问题</van-col>
    </van-row>

    <div class="dataClass" v-html="data.goodsDetailContent"></div>

    <!-- 底部导航栏 -->
    <van-goods-action class="footer-icon">
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="$router.push('/cart')" />
      <van-icon
        v-show="$store.getters.cartNum > 0"
        :badge="$store.getters.cartNum"
        class="badge-icon" />

      <van-goods-action-button
        color="#0cb7b7"
        type="warning"
        text="加入购物车"
        @click="add" />
      <van-goods-action-button
        color="#0cb7b7"
        type="danger"
        text="立即购买"
        @click="$router.push('/cart')" />
    </van-goods-action>
  </div>
</template>

<script>
import { goodsDetail, addCart } from '@/api';
import { Toast } from 'vant';
export default {
  name: 'singleGoods',
  components: {},
  data() {
    return {
      data: {}, //数据源
      flag: true, //做判断，减少请求次数
    };
  },
  async created() {
    // 获取路由中的id，发送ajax请求，将id传递给接口
    let res = await goodsDetail(this.$route.params.id);
    // console.log(res);
    this.data = res.data;

    // 一进入详情页，就要派发一个action发送请求，去获取购物车数据
    this.$store.dispatch('changeCartListAsync');
  },
  methods: {
    // 返回上一级
    backFn() {
      this.$router.back();
    },
    // 点击加入购物车
    add() {
      if (!this.flag) {
        return;
      }
      // 减少发请求的次数
      this.flag = false;

      // 调接口，发请求
      addCart({
        // ?. 新的运算符，先打点去拿params，如果拿到了，再去拿id，如果没拿到params，后面就不执行了
        goodsId: this.$route?.params?.id,
        goodsCount: 1,
      })
        .then((data) => {
          // console.log(data);
          if (data.resultCode == 200) {
            this.flag = true;
            Toast.success('添加成功');

            // 派发一个action，在action中发送请求，并commit一个mutation，在mutation中修改状态
            this.$store.dispatch('changeCartListAsync');
          }
        })
        .catch((error) => {
          Toast.fail('请求超时');
        });
    },
  },
};
</script>

<style scoped lang="less">
.main {
  padding-top: 46px;
}
.gname {
  font-size: 18px;
  padding: 10px;
}

.gpost {
  font-size: 14px;
  padding-left: 10px;
  color: #999999;
}

.gprice {
  padding: 10px;
  font-size: 22px;
  color: #f63151;
}

.van-row {
  margin-top: 20px;
}
.van-col {
  font-size: 14px;
  text-align: center;
  border-right: 1px solid #9e9e9e;
}
.dataClass {
  /deep/ img {
    width: 100%;
  }
}
.none {
  border: none;
}
.footer-icon {
  position: fixed;
}
.badge-icon {
  position: absolute;
  left: 82px;
  top: 10px;
}
</style>
