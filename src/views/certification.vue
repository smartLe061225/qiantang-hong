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
        <!-- <Form ref="create_cert_form" :model="certification.data" :rules="certification.rules" :label-width="120">
          <FormItem label="公司logo" prop="logo">
            <div class="logo-box">
              <div class="logo-default">
                <img src="../assets/images/logo-default.png" alt="" v-if="certification.data.logo == null">
                <img :src="certification.data.logo" alt="" v-if="certification.data.logo != null">
              </div>
              <Upload ref="upload-logo" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048"
                :on-format-error="handle_format_error" :on-exceeded-size="handle_max_size" :before-upload="handleBeforeUpload"
                action="/api/user/upload/" style="display: inline-block;">
                <Button type="primary" size="small" icon="ios-cloud-upload-outline">上传公司logo</Button>
              </Upload>
            </div>
          </FormItem>
          <FormItem label="企业名称" prop="name">
            <Input placeholder="请输入企业名称" v-model="certification.data.name" style="width:300px;"></Input>
          </FormItem>
          <FormItem label="企业类型" prop="type">
            <Select style="width:100px" v-model="certification.data.type">
              <Option :value=2 number>集团</Option>
              <Option :value=1 number>公司</Option>
            </Select>
          </FormItem>
          <FormItem label="所在地区" prop="area">
            <Select style="width:100px" v-model="certification.data.province" @on-change="change_province">
              <Option :value="item.id" number v-for="(item, index) in province_data" :key="item.id">{{ item.areaName }}</Option>
            </Select>
            <Select style="width:100px" v-model="certification.data.city" @on-change="change_city">
              <Option :value="item.id" number v-for="(item, index) in city_data" :key="item.id">{{ item.areaName }}</Option>
            </Select>
            <Select style="width:100px" v-model="certification.data.area">
              <Option :value="item.id" number v-for="(item, index) in region_data" :key="item.id">{{ item.areaName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="详细地址" prop="address">
            <Input placeholder="请输入详细地址" v-model="certification.data.address" style="width:300px;"></Input>
          </FormItem>
          <FormItem label="联系人" prop="contacts">
            <Input placeholder="请输入联系人" v-model="certification.data.contacts" style="width:300px;"></Input>
          </FormItem>
          <FormItem label="手机号码" prop="phone">
            <Input placeholder="请输入手机号码" v-model="certification.data.phone" style="width:300px;"></Input>
          </FormItem>
          <FormItem label="电子邮箱" prop="toolcode">
            <Input placeholder="请输入电子邮箱" v-model="certification.data.toolcode" style="width:300px;"></Input>
          </FormItem>
          <FormItem label="上传资质材料" prop="license">
            <ul class="license-upload-list clearfix">
              <li class="license-upload-item">
                <div class="upload-businesslicense-box">
                  <div class="init-upload">
                    <div class="icon-businesslicense"></div>
                  </div>
                  <div class="uploaded-status" v-if="certification.data.businesslicense != null">
                    <img :src="certification.data.businesslicense" alt="">
                  </div>
                  <div class="upload-btn">
                    <Upload action="/api/user/upload/" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handle_format_error"
                      :on-exceeded-size="handle_max_size" :show-upload-list="false" :on-success="handle_businesslicense_success"
                      style="display: inline-block;">
                      <Button type="primary" size="small" icon="ios-cloud-upload-outline">上传营业执照</Button>
                    </Upload>
                    <Button type="error" icon="trash-a" size="small" v-if="certification.data.businesslicense != null" @click="remove_businesslicense">删除</Button>
                  </div>
                </div>
              </li>
              <li class="license-upload-item">
                <div class="upload-businesslicense-box">
                  <div class="init-upload">
                    <div class="icon-legalperson"></div>
                  </div>
                  <div class="uploaded-status" v-if="certification.data.legalperson != null">
                    <img :src="certification.data.legalperson" alt="">
                  </div>
                  <div class="upload-btn">
                    <Upload action="/api/user/upload/" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handle_format_error"
                      :on-exceeded-size="handle_max_size" :show-upload-list="false" :on-success="handle_legalperson_success"
                      style="display: inline-block;">
                      <Button type="primary" size="small" icon="ios-cloud-upload-outline">上传法人身份证</Button>
                    </Upload>
                    <Button type="error" icon="trash-a" size="small" v-if="certification.data.legalperson != null" @click="remove_legalperson">删除</Button>
                  </div>
                </div>
              </li>
            </ul>
          </FormItem>
          <FormItem label="">
            <Button type="primary" size="large" @click="post_enterprise">保存资料</Button>
          </FormItem>
        </Form> -->

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
<style lang="less" scoped>
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