<template>
<div>
  <div class="Login common-content clearfix">
    <h1 class="logo">企业数据宏管理平台</h1>
    <div class="content">
      <h2 class="common-title">登录/Login</h2>
      <div class="form">
        <div class="form-items">
          <input class="input-text" type="text" placeholder="OA帐号">
        </div>
        <div class="form-items">
          <input class="input-text" type="password" placeholder="OA密码">
        </div>
        <div class="link clearfix">
          <router-link to="/join" class="float-left">快速注册</router-link>
          <router-link to="/forget" class="float-right">忘记密码？</router-link>
        </div>
        <button class="submit-button" type="button">登录</button>
        <div class="text"><label  @click="autoLogin"><i class="ivu-icon" :class="{'ivu-icon-android-checkbox-outline-blank': !isAutoLogin, 'ivu-icon-android-checkbox check': isAutoLogin }"></i>下次自动登录</label></div>
      </div>
    </div>
  </div>
  <footer-inverse></footer-inverse>
</div>
</template>

<script>
  import footerInverse from 'components/footer'
  export default {
    data(){
      return {
        isAutoLogin: false
      }
    },
    components: {
      footerInverse
    },
    methods: {
      autoLogin(){
        this.isAutoLogin = this.isAutoLogin ? false : true;
      }
    }
  }
</script>
<style lang="less">
@import url('~assets/less/login.less');

@top: 44px;

.Login{
  width: 926px;
  min-height: 240px;
  padding: @top 0;
  margin-top: 160px;
  &:before{
    position: absolute;
    top: @top;
    bottom: @top;
    left: 50%;
    content: "";
    width: 1px;
    background: @border-color;
    display: block;
  }
  &>.logo{
    width: 50%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    min-height: 150px;
    height: auto;
    background: url('~assets/images/loginLogo.png') center no-repeat;
    overflow: hidden;
    text-indent: -9999px;  
  }
  &>.content{
    width: 50%;
    float: right;
    padding: 0 72px; 
  }
}
</style>