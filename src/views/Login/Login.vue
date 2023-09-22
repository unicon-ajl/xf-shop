<template>
  <div class="login-main">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      :title="isLogin ? '登录' : '注册'"
      left-arrow
      @click-left="backfn"
      fixed
    >
      <!-- 插槽 -->
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <img src="../../assets/logo01.png" alt="" />

    <van-form @submit="onSubmit" class="login-form">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <!-- 验证码 -->
      <!-- :type="2"   1是常规验证码picture  2是运算验证码compute  -->
      <!-- :showButton="false"  隐藏验证确定按钮 -->
      <Verify
        :type="2"
        width="150px"
        fontSize="22px"
        height="45px"
        :showButton="false"
        @success="alertfn(1)"
        @error="alertfn(2)"
        class="verify"
        ref="veri"
      >
        <!-- alertfn(1)，验证通过传递1，验证失败传递2 -->
      </Verify>

      <p @click="isLogin = !isLogin">
        {{ isLogin ? "立即注册" : "已有登录账号" }}
      </p>

      <div style="margin: 16px">
        <van-button type="info" round size="large">
          {{ isLogin ? "登录" : "注册" }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, register } from "../../api/index";
import { Toast } from "vant";
import Verify from "vue2-verify";
export default {
  name: "Login",
  components: {
    Verify,
  },
  data() {
    return {
      isLogin: true, //是登录还是注册
      username: "", //用户名
      password: "", //密码
      flag: false, //记录验证码是否通过
    };
  },
  watch: {
    // 侦听isLogin的值是否变化
    isLogin() {
      // 变化了，将用户名和密码置为空，并刷新验证码
      this.username = "";
      this.password = "";
      this.$refs.veri.refresh();
    },
  },
  methods: {
    // 左上角返回箭头
    backfn() {
      // 去首页
      this.$router.push("/home");
    },

    // 验证成功或失败
    alertfn(val) {
      this.flag = val == 1 ? true : false;
    },

    // 点击提交
    onSubmit(values) {
      // 去验证是否验证码正确
      this.$refs.veri.checkCode();
      if (this.flag) {
        // 验证通过
        if (this.isLogin) {
          // 是登录的
          login(this.username, this.password).then((data) => {
            // 成功的结果
            // console.log(data);
            if (data.resultCode == 200) {
              // 登录成功，将令牌存储到localStorage
              localStorage.setItem("xftoken", data.data);

              // 从商品详情页被放到登录页，登录之后还要返回商品详情页
              // if (this.$route.query.needback == 1) {
              // 从商品详情页放到登录页的
              // this.$router.back();
              // } else {

              // 正常登录
              Toast.success("登录成功");
              // 跳转到home页面
              this.$router.replace("/home");
              // }
            }
          });
        } else {
          // 是注册的
          register(this.username, this.password).then((data) => {
            // console.log(data);
            if (data.resultCode == 200) {
              // 注册成功
              // console.log(data)

              Toast.success("注册成功");
              // 注册成功，跳到登录
              this.isLogin = true;
            }
          });
        }
      } else {
        // 验证失败，给出提示并刷新验证码
        Toast.fail("验证失败");
        this.$refs.veri.refresh();
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-main {
  padding-top: 46px;
  .login-form {
    p {
      font-size: 16px;
      margin: 10px 0 10px 35px;
      color: #328bfa;
    }
  }
}
img {
  width: 100%;
  box-sizing: border-box;
  padding: 30px 80px;
}
.verify {
  margin-top: 15px;
  /deep/.cerify-code-panel {
    // /deep/可以将别人组件中封装好的样式改变
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-left: -10px;
  }
  /deep/.verify-code-area {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 16px;
    margin-top: 0px;
    margin-bottom: 5px;
    .varify-input-code {
      width: 100px;
      height: 45px;
      margin-left: -15px;
      border: 1px solid#ccc;
      text-indent: 1em;
    }
    .verify-change-area {
      margin-right: -10px;
    }
  }
}
/deep/.van-cell {
  padding-left: 25px;
}
</style>