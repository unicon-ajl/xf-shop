<template>
  <div class="main">
    <van-nav-bar title="地址管理" left-arrow fixed @click-left="backFn">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { getAddressList } from "../../api/index";
export default {
  name: "Address",
  components: {},
  data() {
    return {
      chosenAddressId: "",
      list: [], //地址列表
      trueId:[],
    };
  },
  watch: {
    chosenAddressId(val) {
      // console.log(val);
      // this.$router.push("/createorder?addressId=" + val);
      this.$router.push({path:"/createorder" ,query:{addressId:val,trueId:this.trueId}});
    },
  },
  created() {
    // 发请求，获取地址列表
    this.getData();
    this.trueId = this.$route.query.trueId
    // console.log(this.trueId);
  },
  methods: {
    // 获取地址列表
    async getData() {
      let res = await getAddressList();
      // console.log(res);
      // 需要对返回的数据进行加工处理，变成我们想要的数据格式
      this.list = res.data.map((item) => {
        return {
          id: item.addressId,
          name: item.userName,
          tel: item.userPhone,
          address:
            item.provinceName +
            item.cityName +
            item.regionName +
            item.detailAddress,
          isDefault: item.defaultFlag,
        };
      });
      // console.log(this.list);
    },
    // 返回上一级
    backFn() {
      this.$router.back();
    },
    // 新增地址
    onAdd() {
      this.$router.push("/addressedit");
    },
    // 编辑地址
    onEdit(item) {
      // 这里的item指的是我们所点击的这一个地址的数据
      // console.log(item);

      this.$router.push("/addressedit?addressId=" + item.id);
    },
  },
};
</script>

<style scoped lang="less">
.main {
  padding-top: 46px;
}
/deep/.van-button--danger {
  background-color: #1baeae;
  border: #1baeae;
}
/deep/.van-tag--danger{
  background-color: #1baeae;
}
</style>