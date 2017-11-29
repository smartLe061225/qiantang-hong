<template>
  <div>
    <div class="g-rz-header">
      <div class="wrap-950">
        <a class="rz-logo">
          <img src="../assets/images/logo-admin.png" alt="">
        </a>
      </div>
    </div>
    <div class="g-rz-body">
      <div class="wrap-950">
        <div class="rz-h clearfix">
          <h1>企业认证资料</h1>
          <span>/AUTHENTICATION DATA</span>
        </div>
        <certification></certification>
      </div>
    </div>

    <div class="g-rz-footer">
      <img src="../assets/images/logoIcon.svg" alt="杭州钱塘大数据交易中心有限公司">
      <p data-v-6c4d8baa="">杭州钱塘大数据交易中心有限公司 QIANTANG BIG DATA EXCHANGE CENTER CO., LTD.</p>
    </div>
  </div>
  </div>
</template>
<script>
  import { ajax_post_enterprise, ajax_get_area } from "../apis/company";
  import { get_enterpri_id } from "../util/user";
  import certification from '../components/certification/certification'
  import store from "../store/";
  export default {
    name: "outer_certification",
    components: {
      certification
    },
    data() {
      return {
      };
    },
    methods: {
      
    },
    created() {
      document.body.setAttribute("class", "");
    }
  };
</script>
<style lang="less">
  .g-rz-header {
    padding: 20px 0;
    background: #353f5a url(/static/img/loginBg.47e75eb.jpg) center top no-repeat;
  }

  .g-rz-body {
    padding: 30px 0;
  }

  .g-rz-footer {
    padding: 50px 0 50px 0;
    font-size: 14px;
    background: #353f5a url(/static/img/loginBg.47e75eb.jpg) center bottom no-repeat;
    text-align: center;
    img {
      width: 80px;
      height: 80px;
    }
  }

  .wrap-950 {
    width: 950px;
    margin: 0 auto;
  }

  .rz-h {
    margin-bottom: 20px;
    padding-left: 30px;
    h1 {
      font-size: 18px;
      color: #000;
      font-weight: 400;
      float: left;
      margin-right: 5px;
    }
    span {
      color: #999;
      float: left;
      position: relative;
      top: 6px;
    }
  }
</style>