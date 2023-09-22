<!-- 分类页面 -->
<template>
  <div class="main">
    <van-row class="header">
      <van-col :span="3" class="left-arrow" @click="$router.back()">
        <i class="icon iconfont icon-fanhuijiantou"></i>
      </van-col>
      <van-col :span="21">
        <van-search
          disabled
          shape="round"
          placeholder="请输入关键词"
          @click="$router.push('/search')"
        ></van-search>
      </van-col>
    </van-row>

    <van-tree-select
      height="100%"
      :items="sidebars"
      :main-active-index.sync="activeKey"
      @click-nav="onChange"
    >
      <template #content >
        
        <div v-for="(value,index) in list" :key="value.categoryId">
          <div v-if="activeKey == index">
            <van-grid :column-num="3" v-for="item in list2" :key="item.categoryId" :border="false">
              <p>{{ item.categoryName }}</p>
              <van-grid-item v-for="val in item.thirdLevelCategoryVOS" :key="val.categoryId" icon="http://s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" :text="val.categoryName" :to="'/search?goodsCategoryId=' + val.categoryId"/>
            </van-grid>
          </div>
      </div>

      </template>
    </van-tree-select>
  </div>
</template>

<script>
import { category } from "../../api/index";
export default {
  name: "Categary",
  components: {},
  data() {
    return {
      activeKey: 0,
      title: "", //标题
      sidebars: [], //左侧导航栏数据

      list: [], //一级数组
      list2: [], //二级数组，一个页面中的三个类，
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 监听切换导航项时的事件
    onChange(val) {
      // val表示所选导航项的索引
      // console.log(val);
      this.activeKey = val;
      console.log(this.list2);

      // 当左侧导航项发生变化之后，先将list2清空，再去遍历新的数据，并将其塞进空的list2中
      this.list2 = [];
        this.list[this.activeKey].secondLevelCategoryVOS.forEach((item) => {
          // console.log(item);
          
          this.list2.push(item);
        });
    },
    // 获取数据
    getData() {
      // 发送请求，获取数据
      category().then((data) => {
        this.list = data.data;
        // console.log(this.list);
        // 获取左侧导航栏的数据
        this.list.map((item) => {
          item.text = item.categoryName;
          this.sidebars.push(item);
        });
        // console.log(this.sidebars);

        // 大类中三个主类的数据
        // console.log(this.activeKey);
        // console.log(this.list[this.activeKey].secondLevelCategoryVOS)

        // 当左侧导航项发生变化之后，先将list2清空，再去遍历新的数据，并将其塞进空的list2中
        this.list2 = [];
        this.list[this.activeKey].secondLevelCategoryVOS.forEach((item) => {
          // console.log(item);
          
          this.list2.push(item);
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
.main {
  padding-top: 55px;
  padding-bottom: 50px;
}
.header {
  width: 100%;
  // height: 46px;
  line-height: 46px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 200;
  background-color: #fff;
  border-bottom: 1px solid #999;
}
/deep/.left-arrow {
  padding-left: 30px;
  height: 100%;
}

/deep/.van-tree-select__nav {
  height: 560px;
}

/deep/.van-tree-select__nav-item {
  padding: 21px 12px;
}

.title {
  margin: 30px 10px;
  font-size: 17px;
  color: #2c3e50;
}

/deep/.van-tree-select__content {
  overflow-y: visible;
}
p{
  position: absolute;
  z-index: 200;

  margin-top: -20px;
  margin-left: 20px;
}

/deep/.van-grid{
  width: 250px;
  margin-left: 125px;
  padding-top: 60px;
}

/deep/.van-tree-select__nav{
  width: 125px;
  position: fixed;
  top: 46px;
  left: 0px;
  bottom: 0;

  z-index: 100;
}
</style>