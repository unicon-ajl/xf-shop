<template>
  <div class="main">
    <van-nav-bar title="购物车" left-arrow fixed @click-left="backFn">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <div v-if="this.list.length ? false : true" class="empty">
      <van-icon name="smile-o" />
      <p class="txt">购物车空空如也~</p>
      <Button @click="$router.push('/home')">前往首页</Button>
    </div>
    <div v-else>
      <van-swipe-cell v-for="item in list" :key="item.goodsId">
        <van-row type="flex" align="center">
          <van-col :span="3" class="col">
            <van-checkbox
              v-model="item.checked"
              checked-color="#1baeae"></van-checkbox>
          </van-col>
          <van-col :span="21">
            <van-card
              :price="item.sellingPrice"
              :desc="item.goodsName"
              class="goods-card"
              :thumb="item.goodsCoverImg">
              <template #footer>
                <van-stepper
                  v-model="item.goodsCount"
                  theme="round"
                  button-size="20"
                  disable-input
                  @plus="plusHandle(item)"
                  @minus="minusHandle(item)" />
              </template>
            </van-card>
          </van-col>
        </van-row>

        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="delHandle(item.cartItemId)" />
        </template>
      </van-swipe-cell>

      <van-submit-bar
        :price="totalMoney"
        button-text="提交订单"
        @submit="onSubmit">
        <van-checkbox v-model="checkAll" checked-color="#1baeae"
          >全选</van-checkbox
        >
        <!-- <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template> -->
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { deleteGoods } from '../../api/index';
import { changeNumber } from '../../api/index';
import CreateOrder from '../CreateOrder/CreateOrder.vue';
export default {
  name: 'Cart',
  components: { CreateOrder },
  created() {
    // 派发一个action，去仓库中拿购物车的数据
    this.$store.dispatch('changeCartListAsync');
    // console.log(this.$store.state.cartList);
  },
  data() {
    return {
      trueId: [], //被选中的商品id
      isEmpty: 'true', //是否显示购物车为空的页面
    };
  },
  computed: {
    // 购物车数据列表
    list() {
      return this.$store.state.cartList || [];
    },
    // 总金额
    totalMoney() {
      return this.list.reduce((prev, next) => {
        // 先判断是否被选中
        return (
          prev + (next.checked ? next.goodsCount * next.sellingPrice * 100 : 0)
        );
      }, 0);
    },
    // 全选
    checkAll: {
      get() {
        if (this.list.length) {
          return this.list.every((item) => item.checked);
        } else {
          // 当购物车中没有物品时，取消全选按钮
          return false;
        }
      },
      set(val) {
        // console.log(val);//val是全选按钮的值
        this.list.forEach((item) => (item.checked = val));
      },
    },
  },
  methods: {
    // 返回上一级
    backFn() {
      this.$router.back();
    },

    // 修改地址
    // onClickEditAddress() {},
    // 商品数量增加
    plusHandle(item) {
      // console.log(item.goodsCount+1)
      changeNumber(item.cartItemId, item.goodsCount + 1).then((data) => {
        // console.log(data);
        if (data.resultCode == 200) {
          this.$store.dispatch('changeCartListAsync');
        }
      });
    },
    // 商品数量减少
    minusHandle(item) {
      // console.log(item.goodsCount-1)
      changeNumber(item.cartItemId, item.goodsCount - 1).then((data) => {
        // console.log(data);
        if (data.resultCode == 200) {
          this.$store.dispatch('changeCartListAsync');
        }
      });
    },
    // 删除购物车商品
    async delHandle(id) {
      let res = await deleteGoods(id);
      // console.log(res)
      if (res.resultCode == 200) {
        Toast.success('删除成功');
      }
      // 派发一个action，去仓库中拿购物车的数据
      this.$store.dispatch('changeCartListAsync');
    },
    // 点击提交
    onSubmit() {
      if (this.list.length) {
        this.list.forEach(async (item) => {
          // 遍历出checked为true的商品，发送给后端
          // console.log(item);
          if (item.checked) {
            // console.log(item.cartItemId);
            // 放到一个空数组中
            this.trueId.push(item.cartItemId);
            // console.log(this.trueId);
          }
        });
        // query传参，把获取的id数组传递过去
        this.$router.push('/address?trueId=' + this.trueId);
      } else {
        Toast.fail('购物车空空如也~');
        this.$router.push('/address');
      }
    },
  },
};
</script>

<style scoped lang="less">
.main {
  padding-top: 46px;
  padding-bottom: 300px;
}
ul {
  width: 100%;
}
li {
  width: 100%;
  height: 105px;
  display: flex;
}
.checkbox {
  margin: 20px 15px 0;
}
.image {
  width: 105px;
  height: 100%;
}
img {
  width: 100%;
}
.text {
  width: 100%;
  margin-left: 15px;
  margin-top: 25px;
  color: #2c3e50;
  font-size: 14px;
  padding-right: 20px;
}
.Num {
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
  padding-right: 10px;
}
p {
  color: #f00;
  font-size: 16px;
}

// ==================
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}

.van-card__footer {
  margin-top: -20px;
}

.van-card__desc {
  padding-top: 30px;
}

.col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.van-card__price {
  color: #f00;
}

/deep/.van-submit-bar {
  margin-bottom: 60px;
}

.empty {
  width: 100%;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 50px;

  .txt {
    margin: 15px 0;
    color: #2c3e50;
  }
  Button {
    // box-sizing: border-box;
    width: 150px;
    background-color: #1baeae;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    padding: 5px;
  }
}
</style>
