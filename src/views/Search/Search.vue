<template>
  <div class="search-all">
    <div class="search-header">
      <i class="icon iconfont icon-fanhuijiantou" @click="backfn"></i>
      <van-search
        v-model.trim="keyword"
        shape="round"
        placeholder="请输入关键词"
      ></van-search>
      <Button @click="searchHandle">搜索</Button>
    </div>

    <van-tabs type="card" color="#1baeae" @click="onclick">
      <van-tab title="推荐"></van-tab>
      <van-tab title="新品"></van-tab>
      <van-tab title="价格"></van-tab>
    </van-tabs>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onload"
      :immediate-check="false"
    >
      <van-card
        v-for="item in goodsList"
        :key="item.goodsId"
        :num="item.goodsCount"
        :price="item.sellingPrice"
        :desc="item.goodsIntro"
        :title="item.goodsName"
        :thumb="item.goodsCoverImg"
        :immediate-check="false"
        @click="clickHandle(item.goodsId)"
      />
    </van-list>
  </div>
</template>

<script>
import { Toast } from "vant";
import { search, categorySearch } from "../../api/index";
export default {
  name: "Search",
  components: {},
  data() {
    return {
      isSelected: false, //是否添加active这个类
      goodsList: [], //商品列表
      pageNumber: 1, //第一页
      keyword: "", //搜索框内容
      orderBy: "", //点击哪个页面
      loading: false, //加载效果
      finished: false, //加载完毕
    };
  },
  async mounted() {
    // 获取分类页面传递过来的分类商品id
    // console.log(this.$route.query.goodsCategoryId);
    // 分类跳转发请求

    this.categorySear();
  },
  methods: {
    // 分类搜索
    categorySear() {
      this.pageNumber = 1;
      if (this.$route.query.goodsCategoryId) {
        categorySearch(
          this.pageNumber,
          this.$route.query.goodsCategoryId,
          this.keyword,
          this.orderBy
        ).then((data) => {
          // console.log(data);
          this.goodsList = data.data.list;
        });
      } else {
        return;
      }
    },
    // 点击标签，获取标签的索引
    onclick(val) {
      // val是标签的索引
      // console.log(val);
      if (val == 1) {
        // 索引为1时，点击了 "新品"，将data中的orderBy置为 new
        // 将finished置为false，防止上次加载时将finished置为了true
        // 上面准备完毕，发送
        this.orderBy = "new";
        // 标签发生变化，重新发送请求，更新数据
        this.categorySear();

        this.finished = false;
        this.getGoodsList();
      } else if (val == 2) {
        // 索引为2时，点击了 "价格"，将data中的orderBy置为 price
        this.orderBy = "price";
        // 标签发生变化，重新发送请求，更新数据
        this.categorySear();

        this.finished = false;
        this.getGoodsList();
      } else if (val == 0) {
        // 索引为0时，点击了 "推荐"，将data中的orderBy置为空串 ""
        this.orderBy = "";
        // 标签发生变化，重新发送请求，更新数据
        this.categorySear();

        this.finished = false;
        this.getGoodsList();
      }
    },
    // 点击搜索按钮
    searchHandle() {
      // 每次点击搜索框时，先将页码置为1，然后再发送ajax请求，获取数据
      this.pageNumber = 1;
      this.getGoodsList();
    },

    // },
    // 发送ajax请求，获取商品信息
    async getGoodsList() {
      // 上面双向数据绑定的时候已经将首尾的空格去除了
      // 判断输入框中是否有内容
      if (this.keyword) {
        // 输入框中有内容，发送ajax请求，获取数据
        let res = await search(this.pageNumber, this.keyword, this.orderBy);
        // console.log(res);
        if (res.data.totalCount) {
          // 将返回的数据赋值给goodsList
          this.goodsList = res.data.list;
          // console.log(this.goodsList);
        }else{
          Toast.fail('非法的搜索参数')
        }
      } else {
        // 输入框中没有内容，将finished置为true，表示加载完毕
        this.finished = true;
        // 输入框中没有内容，将goodsList数组置为空并给出提示
        this.goodsList = [];
        Toast.fail("输入的内容不能为空！");
      }
    },
    // 点击后退
    backfn() {
      this.$router.back();
    },
    // 触底加载
    onload() {
      // 一触底，页码就要加1，finished也要置为false，防止上一次触底将finished置为true
      this.pageNumber++;
      this.finished = false;

      // 发请求，传参
      search(this.pageNumber, this.keyword, this.orderBy).then((data) => {
        // console.log(data);
        if (data.data.list.length == 0) {
          // 如果所有的数据都加载完毕，请求回来的list中就没有数据了，这时将finished置为true，表示加载完毕
          this.finished = true;
        }
        // 将这一次请求到的数据和上一次请求的数据拼接在一起，再赋值给goodsList数组去渲染页面
        this.goodsList = this.goodsList.concat(data.data.list);
      });

      // 本次请求结束，将loading置为false，为了可以继续触底加载
      this.loading = false;
    },
    // 点击商品，跳转到商品详情页
    clickHandle(id) {
      // 将商品的id传递到商品详情页singleGoods，以便于获取商品的详情信息
      this.$router.push("/singleGoods/" + id);
    },
  },
};
</script>

<style scoped lang="less">
.search-all {
  padding-top: 80px;
}
.search-header {
  position: fixed;
  z-index: 200;
  left: 0;
  top: 0;
  right: 0;

  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .van-search {
    width: 270px;
  }
  .icon-fanhuijiantou {
    width: 35px;
  }
  Button {
    border-radius: 8px;
    font-size: 16px;
    border: 1px solid #eee;
    background-color: #1baeae;
    padding: 8px;
    color: #fff;
  }
}
.van-row {
  height: 30px;
  font-size: 14px;
  text-align: center;
  color: #1baeae;
  align-items: center;
  .van-col {
    border: 1px solid #1baeae;
    height: 30px;
    line-height: 30px;
    margin-left: -1px;
  }
}
.active {
  color: #fff;
  background-color: #1baeae;
}

/deep/.van-tabs--card {
  position: fixed;
  left: 0;
  right: 0;
  top: 50px;
  z-index: 200;
}
/deep/.van-card__title {
  font-size: 15px;
  color: #333;
  margin: 10px 0px;
}
/deep/.van-card__price {
  font-size: 16px;
  color: #1baeae;
}
/deep/.van-card__price-currency {
  margin-right: 7px;
}
</style>