<template>
  <div class="m-25 mt-65">
    <div class="normal-box-mod">
      <div class="normal-box-hd clearfix">
        <div class="normal-box-title">
          <div class="decorate-square"></div>
          <h2>企业资料</h2>
        </div>
      </div>
      <div class="normal-box-bd">
        <ul class="rz-info-list">
          <li class="mb-20" v-if="company_data.toolcode">
            <div class="logo-box">
              <img :src="company_data.logo" alt="logo">
            </div>
          </li>
          <li class="clearfix">
            <h1 class="color-dark fz-18 fl">{{company_data.name}}</h1>
            <strong v-if="company_data.type == 2" class="c-type">集团企业</strong>
            <strong v-if="company_data.type == 1" class="c-type">公司</strong>
          </li>
          <li>
            {{company_data.provinceName}} {{company_data.cityName}} {{company_data.areaName}} {{company_data.address}}
          </li>
          <li>
            <span class="color-dark">{{company_data.contacts}}</span>
          </li>
          <li v-if="company_data.phone">
            手机：{{company_data.phone}}
          </li>
          <li v-if="company_data.toolcode">
            邮箱：{{company_data.toolcode}}
          </li>
          <li>
            <div class="zz-t">认证资质</div>
          </li>
          <li class="clearfix">
            <div class="fl mr-20" v-if="company_data.businesslicense">
              <div class="show-img">
                  <img :src="company_data.businesslicense" alt="营业执照">
                <span>营业执照</span>
              </div>
            </div>
            <div class="fl">
              <div class="show-img" v-if="company_data.legalperson">
                <img :src="company_data.legalperson" alt="">
                <span>法人身份证</span>
              </div>
            </div>
          </li>
        </ul>
        <div>
          <Button type="ghost" class="radius-input" @click="change_cert_info">修改资料</Button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { ajax_get_enterprise_info } from "../../apis/company";
  export default {
    name: "information",
    data() {
      return {
        company_data: {}
      };
    },
    methods: {
      get_enterprise_info() {
        ajax_get_enterprise_info().then(res => {
          this.company_data = res.data;
        });
      },
      change_cert_info() {
        this.$router.push('/company/change-certification')
      }
    },
    created() {
      this.get_enterprise_info();
    }
  };
</script>
<style lang="less" scoped>
  .rz-info-list {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
    li {
      padding-bottom: 10px;
    }
    .logo-box {
      width: 220px;
      height: 120px;
      text-align: center;
      display: table-cell;
      vertical-align: middle;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-bottom: 20px;
      img {
        max-width: 200px;
        max-height: 100px;
      }
    }
    .zz-t {
      font-size: 16px;
      padding: 15px 0;
    }
    .show-img {
      width: 250px;
      height: 250px;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      border: 1px solid #eee;
      border-radius: 4px;
      img {
        max-width: 250px;
        max-height: 250px;
      }
      span {
        position: relative;
        display: inline-block;
        z-index: 2;
        color: #fff;
        padding: 0 10px;
        border-radius: 6px;
        font-size: 12px; 
        background: rgba(0,0,0, 0.8);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#cc000000, endColorstr=#cc000000);
      }
    }
    .c-type {
      margin-left: 15px;
      position: relative;
      top: 2px;
    }
  }
</style>