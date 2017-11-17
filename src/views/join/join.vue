<template>
  <div>
    <h1 class="logo-title"><img src="~assets/images/joinLogo.png" alt=""></h1>
    <div class="Join common-content">
      <h2 class="common-title">注册 / Register</h2>
      <div class="form">
        <div class="form-items">
          <input class="input-text" type="text" v-model.trim="value.username" v-validate="'required|string'" name="username" :placeholder="placeholder.username">
          <div v-show="errors.has('username')" class="tooltip-verify">{{ errors.first('username') }}</div>
        </div>
        <div class="form-items">
          <input class="input-text" type="password" v-model.trim="value.password" v-validate="'required|string'" name="password" :placeholder="placeholder.password">
          <div v-show="errors.has('password')" class="tooltip-verify">{{ errors.first('password') }}</div>
        </div>
        <div class="form-items">
          <input class="input-text" type="password" v-model.trim="value.cpassword" v-validate="'required|confirmed:password'" name="cpassword" :placeholder="placeholder.cpassword">
          <div v-show="errors.has('cpassword')" class="tooltip-verify">{{ errors.first('cpassword') }}</div>
        </div>
        <div class="form-items">
          <input class="input-text" type="text" v-model.trim="value.phone" v-validate="'required|phone'" name="phone" :placeholder="placeholder.phone">
          <div v-show="errors.has('phone')" class="tooltip-verify">{{ errors.first('phone') }}</div>
        </div>
        <div class="form-items">
          <input class="input-text input-code-text" type="text" v-model.trim="value.code" v-validate="'required|numeric'" name="code" :placeholder="placeholder.code">
          <button class="sms-button" type="button" @click.prevent="getSMSCode" :disabled="(value.phone && !errors.has('phone')) ? false : true" v-show="!computedTime">获取验证码</button>
          <button class="sms-button" disabled type="button" v-show="computedTime">已发送({{computedTime}}s)</button>
          <div v-show="errors.has('code')" class="tooltip-verify">{{ errors.first('code') }}</div>
        </div>
        <div class="text"><label  @click.prevent="checkAgree"><i class="ivu-icon" :class="{'ivu-icon-android-checkbox-outline-blank': !isAgree, 'ivu-icon-android-checkbox check': isAgree }"></i>同意《<router-link to="/">企业宏管理系统用户协议</router-link>》和《<router-link to="/">隐私声明</router-link>》</label></div>
        <button class="submit-button" type="button" :disabled="(isAgree && value.username && value.password && value.cpassword && value.phone && value.code && !errors.has('username') && !errors.has('password') && !errors.has('cpassword') && !errors.has('phone') && !errors.has('code')) ? false : true" @click.prevent="checkJoin">注册</button>
        <div class="text">已有账号 <router-link to="/login">马上登录</router-link></div>
      </div>
    </div>
    <footer-inverse></footer-inverse>
  </div>
</template>

<script>
  import footerInverse from 'components/footer'
  import { Join, joinSMS } from 'src/apis/user'

  export default {
    data(){
      return {
        isAgree: false,
        isPhone: false,
        computedTime: 0,
        value: {
          username: '',
          password: '',
          cpassword: '',
          phone: '',
          code: ''
        },
        placeholder: {
          username: '用户名',
          password: '密码',
          cpassword: '确认密码',
          phone: '手机号',
          code: '验证码'
        }
      }
    },
    components: {
      footerInverse
    },
    methods: {
      checkAgree(){
        this.isAgree = this.isAgree ? false : true;
      },
      getSMSCode(){
        let self = this;
        this.$validator.validate('phone').then((result) => {
          if (result) {
            self.computedTime = 60;
            self.timer = setInterval(() => {
                self.computedTime --;
                if (self.computedTime == 0) {
                    clearInterval(self.timer)
                }
            }, 1000)

            let data = {
              phone: self.value.phone
            }
            joinSMS(data).then(res => {
              if (res.status == 'error') {
                self.computedTime = 0;
                clearInterval(self.timer)
                self.$Message.error(res.message);
              }
            })
            return;
          }
        })
      },
      checkJoin(){
        let self = this;
        this.$validator.validateAll().then((result) => {
          if (result) {
            let data = {
              username: self.value.username,
              password: self.value.password,
              phone: self.value.phone,
              code: self.value.code
            }
            Join(data).then(res => {
              if (res.status == 'success') {
                self.$router.push('login')
              }else{
                self.$Message.error(res.message);
              }
            })
            return;
          }
        })
      }
    },
    created(){
      document.body.setAttribute("class","loginBg");
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
