<template>
  <div>
    <h1 class="logo-title"><img src="~assets/images/joinLogo.png" alt=""></h1>
    <div class="Join common-content">
      <h2 class="common-title">找回密码 / Retrieve password</h2>

      <div class="form" v-show="!isNext">
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
      </div>

      <div class="form" v-show="isNext">
        <div class="form-items">
          <input class="input-text" type="password" v-model.trim="value.password" v-validate="'required|string'" name="password" :placeholder="placeholder.password">
          <div v-show="errors.has('password')" class="tooltip-verify">{{ errors.first('password') }}</div>
        </div>
        <div class="form-items">
          <input class="input-text" type="password" v-model.trim="value.cpassword" v-validate="'required|confirmed:password'" name="cpassword" :placeholder="placeholder.cpassword">
          <div v-show="errors.has('cpassword')" class="tooltip-verify">{{ errors.first('cpassword') }}</div>
        </div>
      </div>

      <div style="height:26px;"></div>
      <button class="submit-button" type="button" :disabled="(value.phone && value.code && !errors.has('phone') && !errors.has('code')) ? false : true" @click.prevent="Next" v-show="!isNext">下一步</button>
      <button class="submit-button" type="button" :disabled="(value.phone && value.code && value.password && value.cpassword && !errors.has('phone') && !errors.has('code') && !errors.has('password') && !errors.has('cpassword')) ? false : true" @click.prevent="checkForget" v-show="isNext">确定</button>
      <div class="text"><button class="default-button" type="button" @click.prevent="Prev" v-show="isNext">上一步</button></div>
      <div class="text">已有账号 <router-link to="/login">返回登录</router-link></div>

      <div v-if="isOK" class="result-success" style="text-align:center;">
        <i class="ivu-icon ivu-icon-ios-checkmark-outline"></i>
        <p class="text">密码修改成功！</p>
        <router-link to="/login" class="submit-button">马上登录</router-link>
      </div>
    </div>
    <footer-inverse></footer-inverse>
  </div>
</template>

<script>
  import footerInverse from 'components/footer'
  import { forgetSMS, Forget } from 'src/service/getData'

  export default {
    data(){
      return {
        isNext: false,
        isOK: false,
        computedTime: 0,
        value: {
          password: '',
          cpassword: '',
          phone: '',
          code: ''
        },
        placeholder: {
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
            forgetSMS(data).then(res => {
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
      Next(){
        let self = this;
        this.$validator.validateAll(['phone','code']).then((result) => {
          if (result) {
            self.isNext = true;
            return;
          }
        })
      },
      Prev(){
        this.isNext = false;
      },
      checkForget(){
        let self = this;
        this.$validator.validateAll().then((result) => {
          if (result) {
            let data = {
              phone: self.value.phone,
              code: self.value.code,
              password: self.value.password
            }
            Forget(data).then(res => {
              if (res.status == 'success') {
                self.isOK = true;
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