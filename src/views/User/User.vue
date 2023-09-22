<template>
  <div class="main">
    <van-nav-bar title="我的" left-arrow fixed @click-left="backFn">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <div class="userMsg">
      <div class="img">
        <van-image
          round
          fit="cover"
          width="2.2rem"
          height="2.2rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>

      <div class="msg">
        <p>
          昵称：<span>{{ user.nickName }}</span>
        </p>
        <p>
          登录名：<span>{{ user.loginName }}</span>
        </p>
        <p>
          个性签名：<span>{{ user.introduceSign }}</span>
        </p>
      </div>
    </div>

    <div class="selected">
      <van-cell title="我的订单" is-link to="/order" />
      <van-cell title="账号管理" is-link to="/account" />
      <van-cell title="地址管理" is-link to="/address" />
      <van-cell title="关于我们" is-link to="/about" />
    </div>
  </div>
</template>

<script>
import { userMsg } from "../../api/index";
export default {
  name: "User",
  components: {},
  data() {
    return {
      user: {},
    };
  },
  created() {
    userMsg().then((data) => {
      // console.log(data);
      if (data.resultCode == 200) {
        this.user = data.data;
      }
    });
  },
  methods: {
    // 返回上一级
    backFn() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="less">
.main {
  padding-top: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
}
.userMsg {
  width: 320px;
  height: 100px;
  display: flex;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
  background-color: #47c2c2;

  border-radius: 10px;
}
p {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.selected{
  width: 100%;
  margin-top: 15px;
}

</style>