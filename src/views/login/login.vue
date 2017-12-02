<template>
<div>
  <div class="Login common-content clearfix">
    <h1 class="logo">企业数据企知平台</h1>
    <div class="content">
      <h2 class="common-title">登录/Login</h2>
      <div class="form">
        <div class="form-items">
          <input class="input-text" type="text" @keyup.enter="checkLogin" v-model.trim="account" :placeholder="placeholder.account" v-validate="'required|string'" name="account">
          <div v-show="errors.has('account')" class="tooltip-verify">{{ errors.first('account') }}</div>
        </div>
        <div class="form-items">
          <input class="input-text" type="password" @keyup.enter="checkLogin" v-model.trim="password" :placeholder="placeholder.password" v-validate="'required|string'" name="password">
          <div v-show="errors.has('password')" class="tooltip-verify">{{ errors.first('password') }}</div>
        </div>
        <div class="link clearfix">
          <router-link to="/join" class="float-left">快速注册</router-link>
          <router-link to="/forget" class="float-right">忘记密码？</router-link>
        </div>
        <button class="submit-button" :disabled="(account && password && !errors.has('account') && !errors.has('password')) ? false : true" type="button" @click.prevent="checkLogin">登录</button>
        <div class="text"><label  @click="autoLogin"><i class="ivu-icon" :class="{'ivu-icon-android-checkbox-outline-blank': !isAutoLogin, 'ivu-icon-android-checkbox check': isAutoLogin }"></i>下次自动登录</label></div>
      </div>
    </div>
  </div>
  <footer-inverse></footer-inverse>
</div>
</template>

<script>
import footerInverse from "components/footer";
import { Login } from "src/apis/user";
import store from "../../store/";

export default {
  data() {
    return {
      account: "",
      password: "",
      isAutoLogin: false,
      placeholder: {
        account: "请输入帐号",
        password: "请输入密码"
      }
    };
  },
  components: {
    footerInverse
  },
  methods: {
    autoLogin() {
      this.isAutoLogin = this.isAutoLogin ? false : true;
    },
    checkLogin() {
      let self = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          let data = {
            username: self.account,
            password: self.password
          };
          this.$Spin.show({
            render: h => {
              return h("div", [
                h("Icon", {
                  class: "demo-spin-icon-load",
                  props: {
                    type: "load-c",
                    size: 18
                  }
                }),
                h("div", "请稍后")
              ]);
            }
          });
          this.$store.dispatch("store_login", data).then(res => {
            if (res.status === "success") {
              self.$store.dispatch("store_get_baseinfo").then(res => {
                self.$Spin.hide();
                if (res.hasEnterprise) {
                  if (res.checkUploadFile) {
                    self.$router.push("/dashboard");
                  } else {
                    self.$router.push("/init");
                  }
                } else {
                  self.$router.push("/rz");
                }
              });
            } else {
              self.$Spin.hide();
            }
          });
        }
      });
    }
  },
  created() {
    document.body.setAttribute("class", "loginBg");
  }
};
</script>
<style lang="less">
@import url("~assets/less/login.less");

@top: 44px;
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
.Login {
  width: 926px;
  min-height: 240px;
  padding: @top 0;
  margin-top: 160px;
  &:before {
    position: absolute;
    top: @top;
    bottom: @top;
    left: 50%;
    content: "";
    width: 1px;
    background: @border-color;
    display: block;
  }
  & > .logo {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    min-height: 150px;
    height: auto;
    background: url("~assets/images/loginLogo.png") center no-repeat;
    overflow: hidden;
    text-indent: -9999px;
  }
  & > .content {
    width: 50%;
    float: right;
    padding: 0 72px;
  }
}
</style>