<template>
  <div>
    <Form ref="create_cert_form" :model="certification.data" :rules="certification.rules" :label-width="120">
      <FormItem label="公司logo" prop="logo">
        <div class="logo-box">
          <div class="logo-default">
            <img src="../../assets/images/logo-default.png" alt="" v-if="certification.data.logo == null">
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
        <Select style="width:100px" v-model="certification.data.type" :disabled="type=='update'">
          <Option :value=2 number>集团</Option>
          <Option :value=1 number>公司</Option>
        </Select>
      </FormItem>
      <FormItem label="子公司名称" prop="branch" v-if="certification.data.type == 2">
        <Input placeholder="请输入子公司名称" v-model="certification.data.branch" :disabled="type=='update'" style="width:300px;"></Input>
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
                  :on-exceeded-size="handle_max_size" :show-upload-list="false" :on-success="handle_legalperson_success" style="display: inline-block;">
                  <Button type="primary" size="small" icon="ios-cloud-upload-outline">上传法人身份证</Button>
                </Upload>
                <Button type="error" icon="trash-a" size="small" v-if="certification.data.legalperson != null" @click="remove_legalperson">删除</Button>
              </div>
            </div>
          </li>
        </ul>
      </FormItem>
      <FormItem label="">
        <Button type="primary" size="large" :loading="posting" @click="post_enterprise">保存资料</Button>
        <Button type="ghost" size="large" v-if="type!='update'" @click="logout">退出</Button>
      </FormItem>
    </Form>

  </div>
</template>
<script>
  import {
    ajax_post_enterprise,
    ajax_get_area,
    ajax_get_enterprise_info
  } from "../../apis/company";
  import { get_enterpri_id } from "../../util/user";
  import store from "../../store/";
  export default {
    name: "certification",
    props: ["type"],
    data() {
      return {
        posting: false,
        uploadList: [],
        province_data: [],
        city_data: [],
        region_data: [],
        certification: {
          rules: {
            name: [{ required: true, message: "公司名称不能为空", trigger: "blur" }],
            toolcode: [
              { required: true, message: "电子邮件不能为空", trigger: "blur" },
              { type: "email", message: "电子邮件格式不正确", trigger: "blur" }
            ],
            city: [
              {
                required: true,
                message: "Please select the city",
                trigger: "change"
              }
            ],
            contacts: [{ required: true, message: "联系人不能为空", trigger: "blur" }],
            branch: [{ required: true, message: "子公司不能为空", trigger: "blur" }],
            phone: [{ required: true, message: "手机号码不能为空", trigger: "blur" },
            { pattern: /^1[0-9]{10}$/, message: "手机号码格式不正确", trigger: "blur" }
            ]
            // address: [{ required: true, message: "详细地址不能为空", trigger: "blur" }]
          },
          data: {
            logo: null,
            tool: "mail",
            businesslicense: null,
            legalperson: null,
            type: 1
          }
        }
      };
    },
    methods: {
      // 获取子地区信息
      get_area_data(type, pid) {
        switch (type) {
          case "province":
            ajax_get_area({
              type: "province"
            }).then(res => {
              this.province_data = res.data;
            });
            break;
          case "city":
            ajax_get_area({
              type: "city",
              pid: pid
            }).then(res => {
              this.city_data = res.data;
            });
            break;
          case "region":
            ajax_get_area({
              type: "region",
              pid: pid
            }).then(res => {
              this.region_data = res.data;
            });
            break;
        }
      },
      logout(){
        this.$store.dispatch("store_logout");
        this.$router.push({
          path: "/login"
        });
      },
      // 改变省份
      change_province(p) {
        this.get_area_data("city", p);
      },
      change_city(p) {
        this.get_area_data("region", p);
      },
      handle_format_error(file) {
        this.$Notice.warning({
          title: "上传格式错误",
          desc: "您上传的 " + file.name + " 文件格式错误，只能上传jpg，jpeg，png."
        });
      },
      handle_max_size(file) {
        this.$Notice.warning({
          title: "上传文件太大",
          desc: "您将上传的  " + file.name + " 文件大小超过2M，不能上传！"
        });
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: "Up to five pictures can be uploaded."
          });
        }
        return check;
      },
      handleSuccess(res, file) {
        if (res.status === "success") {
          this.certification.data.logo = res.data.result;
        }
      },
      handle_businesslicense_success(res, file) {
        if (res.status === "success") {
          this.certification.data.businesslicense = res.data.result;
        }
      },
      handle_legalperson_success(res, file) {
        if (res.status === "success") {
          this.certification.data.legalperson = res.data.result;
        }
      },
      remove_businesslicense() {
        this.certification.data.businesslicense = null;
      },
      remove_legalperson() {
        this.certification.data.legalperson = null;
      },
      // 添加认证
      post_enterprise() {
        this.$refs["create_cert_form"].validate(valid => {
          if (valid) {
            this.certification.data.businesslicense =
              this.certification.data.businesslicense || "";
            this.certification.data.legalperson =
              this.certification.data.legalperson || "";
            this.posting = true;  
            ajax_post_enterprise(this.certification.data).then(res => {
              this.posting = false;
              if (res.status === "success") {
                // this.modals.company.create.is_show = true;
                this.$Notice.success({
                  title: "提交认证信息成功"
                });
                // 修改认证
                if (this.type == "update") {
                  this.$store.dispatch("store_get_baseinfo").then(res => {
                    this.$router.push("/company/information");
                  });
                } else {
                  // 新建认证成功，刷新用户信息
                  this.$store.dispatch("store_get_baseinfo").then(res => {
                    if (res.hasEnterprise) {
                      this.$router.push("/dashboard");
                    } else {
                      this.$router.push("/rz");
                    }
                  });
                }
              } else {
                this.$Notice.error({
                  title: res.message
                });
              }
            });
          }
        });
      },
      // 提交新增公司数据
      post_create_company() {
        ajax_post_company(this.modals.company.create.data).then(res => {
          this.get_company_select_box_data();
        });
      },
      // 获取已有认证信息
      get_enterprise_data() {
        if (this.type == "update") {
          ajax_get_enterprise_info().then(res => {
            this.certification.data = res.data;
            this.certification.data.province = parseInt(res.data.province) || '';
            this.certification.data.city = parseInt(res.data.city) || '';
            this.certification.data.area = parseInt(res.data.area) || '';
          });
        }
      }
    },
    created() {
      document.body.setAttribute("class", "");
      this.get_area_data("province");
      this.get_enterprise_data();
    }
  };
</script>
<style lang="less" scoped>
  .license-upload-list {
    .license-upload-item {
      float: left;
      width: 400px;
      margin-right: 15px;
    }
  }

  .upload-businesslicense-box {
    width: 400px;
    height: 230px;
    background: #fafafa;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    position: relative;
    .init-upload {
      margin: 0 auto;
      width: 142px;
      padding-top: 40px;
      .icon-legalperson {
        width: 142px;
        height: 95px;
        background: url(../../assets/images/bg-upload-rz.png) no-repeat right center;
      }
      .icon-businesslicense {
        width: 142px;
        height: 95px;
        background: url(../../assets/images/bg-upload-rz.png) no-repeat left center;
      }
    }
    .uploaded-status {
      position: absolute;
      display: block;
      z-index: 2;
      width: 398px;
      height: 228px;
      left: 0;
      top: 0;
      img {
        width: 100%;
        height: 100%;
        max-width: 400px;
        max-height: 230px;
        border-radius: 5px;
      }
    }
    .upload-btn {
      text-align: center;
      position: absolute;
      display: block;
      bottom: 0;
      width: 400px;
      height: 60px;
      z-index: 3;
    }
  }

  .logo-box {
    border: 1px solid #e8e8e8;
    width: 298px;
    height: 150px;
    text-align: center;
    border-radius: 5px;
    .logo-default {
      padding-top: 10px;
      text-align: center;
      img {
        width: 78px;
        height: 78px;
      }
    }
  }
</style>