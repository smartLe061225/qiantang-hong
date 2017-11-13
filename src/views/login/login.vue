<template>
<div>
  <div class="Login clearfix">
    <div class="logo">企业数据宏管理平台</div>
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
        <button class="login-button" type="button">登录</button>
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
body{
  height: 100%;
  background: #2f445c url('~assets/images/loginBg.jpg') center top no-repeat;
  padding-top: 240px;
}

@placeholder-color: #56607c;
@border-color: #464f6a;
@text-color: #878d9a;

::-webkit-input-placeholder {color: @placeholder-color}
:-moz-placeholder,::-moz-placeholder {color: @placeholder-color}
:-ms-input-placeholder {color: @placeholder-color}

.Login{
  position: relative;
  width: 926px;
  min-height: 240px;
  padding: 44px 0;
  border: 1px solid @border-color;
  background: rgba(54, 65, 94, 0.2);
  border-radius: 10px;
  margin: 0 auto;
  &:before{
    position: absolute;
    top: 44px;
    bottom: 44px;
    left: 50%;
    content: "";
    width: 1px;
    background: @border-color;
    display: block;
  }
  &>div{
    width: 50%;
    &.logo{
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
    &.content{
      float: right;
      padding: 0 72px; 
    }
  }
  .common-title{
    color: #fff;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 16px;
  }

  .form-items{
    height: 56px;
    padding: 10px 0;
    margin-bottom: 16px;
    border-bottom: 1px solid @border-color;
    .input-text{
      background-color: transparent;
      height: 100%;
      color: #fff;
    }
  }

  .link{
    font-size: 12px;
    a{
      color: @text-color;
    }
    
    .to-join{
      float: left;
    }
    .to-forget{
      float: right;
    }
  }

  .login-button{
    width: 100%;
    height: 42px;
    font-size: 16px;
    line-height: 42px;
    border-radius: 21px;
    color: #fff;
    letter-spacing: 3px;
    text-shadow: 1px 1px 1px #08817a;
    background-color: #1385d2;
    background-image: -webkit-linear-gradient(left, #19ce72 0%, #0bb2b8 60%, #1385d2 100%);
    background-image: linear-gradient(to right, #19ce72 0%, #0bb2b8 60%, #1385d2 100%);
    cursor: pointer;
    margin: 32px auto;
  }

  .text{
    text-align: center;
    font-size: 12px;
    color: @text-color;
    display: block;
    label{
      cursor: pointer;
      i{
        font-family: Ionicons;
        margin-right: 8px;
        font-size: 14px;
        &.check{
          color: #fff;
        }
      }
    }
    
  }

}
</style>