<template>
  <div class="main">
    <van-nav-bar title="账号管理" left-arrow fixed @click-left="backFn">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <van-field v-model="nickName" name="昵称" label="昵称" />
    <van-field v-model="introduceSign" name="个性签名" label="个性签名" />
    <van-field
      v-model="password"
      type="password"
      name="修改密码"
      label="修改密码"
    />

    <div class="btn">
      <button @click="saveHandle">保存</button>
      <button @click="exitHandle">退出登录</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { userMsg, setInfo,logout } from "../../api/index";
export default {
  name: "Account",
  components: {},
  created() {
    userMsg().then((data) => {
    //   console.log(data);
      this.nickName = data.data.nickName;
      this.introduceSign = data.data.introduceSign;
    });
  },
  data() {
    return {
      nickName: "", //昵称
      introduceSign: "", //个性签名
      password: "", //修改密码
    };
  },
  methods: {
    // 返回上一级
    backFn() {
      this.$router.back();
    },
    // 点击保存
    saveHandle() {
        // 调接口，修改用户信息
      setInfo({
        nickName: this.nickName,
        introduceSign: this.introduceSign,
        passwordMd5: this.password,
      }).then((data) => {
        // console.log(data);
        if(data.resultCode == 200){
            Toast.success("保存成功")
        }
      });
    },
    // 点击退出登录
    exitHandle() {
        logout().then((data)=>{
            // console.log(data);
            if(data.resultCode == 200){
                localStorage.clear();
                Toast.fail("未登录!")
                this.$router.push("/home");
            }
        })
    },
  },
};
</script>

<style scoped lang="less">
.main {
  padding-top: 46px;
}
.btn {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
}
button {
  width: 300px;
  margin-bottom: 15px;
  background-color: #1baeae;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
}
</style>