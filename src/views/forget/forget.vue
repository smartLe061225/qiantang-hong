<template>
  <div>
    <h1 class="logo-title"><img src="~assets/images/joinLogo.png" alt=""></h1>
    <div class="Join common-content">
      <h2 class="common-title">找回密码 / Retrieve password</h2>

      <div class="form" v-if="!isNext">
        <div class="form-items">
          <input class="input-text" type="text" placeholder="手机号">          
        </div>
        <div class="form-items">
          <input class="input-text input-code-text" type="text" placeholder="验证码">
          <button class="sms-button" type="button" :class="{'sms-button-active' : isPhone}" v-show="!computedTime">获取验证码</button>
          <button class="sms-button" type="button" v-show="computedTime">已发送({{computedTime}}s)</button>
        </div>
      </div>

      <div class="form" v-else>
        <div class="form-items">
          <input class="input-text" type="password" placeholder="密码">
        </div>
        <div class="form-items">
          <input class="input-text" type="password" placeholder="确认密码">
        </div>
      </div>

      <div style="height:26px;"></div>
      <button class="submit-button" type="button" :class="{'submit-button-active' : isAgree}" v-if="!isNext">下一步</button>
      <button class="submit-button" type="button" v-else>确定</button>
      <div class="text">已有账号 <router-link to="/login">返回登录</router-link></div>
    </div>
    <footer-inverse></footer-inverse>
  </div>
</template>

<script>
  import footerInverse from 'components/footer'
  export default {
    data(){
      return {
        isNext: false,
        isAgree: false,
        isPhone: false,
        computedTime: 0
      }
    },
    components: {
      footerInverse
    },
    methods: {
      checkAgree(){
        this.isAgree = this.isAgree ? false : true;
      }
    }
  }
</script>
<style lang="less">
@import url('~assets/less/login.less');
.Join{
  width: 492px;
  padding: 44px 82px;
}
</style>