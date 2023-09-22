<template>
  <div class="main">
    <van-nav-bar
      :title="isEdit ? '编辑地址' : '新增地址'"
      left-arrow
      fixed
      @click-left="backFn"
    >
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      :address-info="info"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { getAddressDetail,addAddress,updateAddress,delAddress } from '../../api/index'
export default {
  name: "AddressEdit",
  components: {},
  data() {
    return {
      isEdit: false, //编辑地址还是新增地址
      areaList, //地区编码列表
      id: "", //点击编辑传递的id
      info: {}, //实现数据回显
    };
  },
  created() {
    // 点击编辑传递了一个id，拿到id
    this.id = this.$route.query.addressId;
    if (this.id) {
      // 如果id存在，就是点编辑进来的，置为true
      this.isEdit = true;
      this.getDetail();
    }
  },
  methods: {
    // 返回上一级
    backFn() {
      this.$router.back();
    },
    // 获取地址编码areaCode
    getAreaCode(area) {
      // 根据区或县获取地址编码
    //   console.log(this.areaList);
      // 遍历获取地址编码
      for (let k in this.areaList.county_list) {
        // 获取包含区地址area的地址编码k
        if (this.areaList.county_list[k].includes(area)) {
          return k;
        }
      }
    },
    // 根据id获取详情
    async getDetail() {
      let res = await getAddressDetail(this.id);
    //   console.log(res);

      // 把从后端回来的数据解构赋值
      let {
        addressId,
        cityName,
        defaultFlag,
        detailAddress,
        provinceName,
        regionName,
        userId,
        userName,
        userPhone,
      } = res.data;

      // 这里是数据回显需要的数据格式，把后端响应给我们的数据解构赋值，变成对应的格式
      this.info = {
        id: addressId,
        name: userName,
        tel: userPhone,
        province: provinceName,
        city: cityName,
        county: regionName,
        addressDetail: detailAddress,
        areaCode: this.getAreaCode(regionName),
        postalCode: 475400,
        isDefault: defaultFlag,
      };
    },
    // 保存，不管编辑还是新增都要走onSave
    onSave(obj) {
        // 这里的obj是我们编辑页面的数据
        // console.log(obj);
      let {
        addressDetail,
        areaCode,
        city,
        county,
        id,
        isDefault,
        name,
        postalCode,
        province,
        tel,
      } = obj;

      let option = {
        cityName: city,
        defaultFlag: isDefault ? 1 : 0,
        detailAddress: addressDetail,
        provinceName: province,
        regionName: county,
        userName: name,
        userPhone: tel,
        areaCode: areaCode,
        postalCode: postalCode,
      };

      if (this.id) {
        // 编辑
        updateAddress({
            // 点击保存，把id和编辑后的数据传递给后端，进行修改
          addressId:this.id,
          ...option,
        }).then(() => {
          this.$router.push("/address");
        });
      } else {
        // 新增
        addAddress({
          ...option,
        }).then(() => {
          this.$router.push("/address");
        });
      }
    },
    // 删除
    async onDelete() {
        let res = await delAddress(this.id)
        console.log(res);
        if(res.resultCode == 200){
            this.$router.push("/address")
        }
    },
  },
};
</script>

<style scoped lang="less">
.main {
  padding-top: 46px;
}
/deep/.van-switch--on{
  background-color: #1baeae;
}
/deep/.van-button--danger{
  background-color: #1baeae;
  border: #1baeae;
}
</style>