<template>
  <div class="m-25 mt-65">
    <div class="normal-box-mod">
      <div class="normal-box-hd clearfix">
        <div class="normal-box-title">
          <div class="decorate-square"></div>
          <h2>个人中心</h2>
        </div>
      </div>
      <div class="normal-box-bd">
        <ul class="user-info-list">
            <li>
                <div class="face-box clearfix">
                    <div class="fb-img">
                      <img :src="avator" alt="头像">
                    </div>
                    <div>
                      <Button type="ghost" class="radius-button" @click="show_change_avator_modal">
          更换头像</Button>
                    </div>
                </div>
            </li>
            <li>
                姓名：{{userinfo.name}}
            </li>
            <li>
                手机：{{userinfo.mobilePhone}}
            </li>
            <li>
                邮箱：{{userinfo.email}}
            </li>
        </ul>
        <div>
            <Button @click="show_change_password_modal">修改密码</Button>
            <Button @click="show_change_mail_modal">修改邮箱和手机</Button>
        </div>
      </div>
    </div>

    <!--修改密码信息-->
    <Modal ref="update_password_modal" v-model="modals.update_password.is_show" :loading="modals.update_password.loading"
    @on-ok="put_user_password"
     :mask-closable="false" :title="modals.update_password.title">
      <Form ref="change_password_form" :model="modals.update_password.data" :rules="modals.update_password.rules" :label-width="120">
        <FormItem label="新密码" prop="password">
          <Input placeholder="请输入新密码" type="password" v-model="modals.update_password.data.password" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="repassword">
          <Input placeholder="请输入确认密码" type="password" v-model="modals.update_password.data.repassword" style="width:200px;"></Input>
        </FormItem>
      </Form>
    </Modal>

    <!--选择头像-->
    <Modal v-model="modals.avator.is_show" :mask-closable="false" :loading="modals.avator.loading" :title="modals.avator.title" @on-ok="post_avator_to_server">
      <ul class="c-avator-list clearfix">
        <li v-for="(a, index) in modals.avator.avator_list" @click="select_avator(index)" class="avt-item" :key="a" :class="{cur: a==modals.avator.data.imgUrl}">
          <img class="avt" :src="a" alt="">
        </li>
        <li class="avt-item-btn">
          <Upload action="/api/user/upload/" :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handle_format_error"
              :on-exceeded-size="handle_max_size" :show-upload-list="false" :on-success="handle_avator_success" style="display: inline-block;">
              <div class="upload-avator-btn"><Icon type="ios-cloud-upload" size="large"></Icon></div>
     </Upload>
        </li>
      </ul>
    </Modal>

    <!--修改用户信息-->
    <Modal ref="update_baseinfo_modal" v-model="modals.baseinfo.is_show" :loading="modals.baseinfo.loading"
    @on-ok="put_baseinfo"
     :mask-closable="false" :title="modals.baseinfo.title">
      <Form ref="change_baseinfo_form" :model="modals.baseinfo.data" :rules="modals.baseinfo.rules" :label-width="120">
        <FormItem label="姓名" prop="name">
          <Input placeholder="请输入姓名" v-model="modals.baseinfo.data.name" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="手机" prop="mobilePhone">
          <Input placeholder="请输入新手机"  v-model="modals.baseinfo.data.mobilePhone" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input placeholder="请输入邮箱"  v-model="modals.baseinfo.data.email" style="width:200px;"></Input>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>
<script>
import {
  ajax_get_user_front_info,
  ajax_put_user_password,
  ajax_put_user_avator,
  ajax_update_user
} from "../../apis/user";
import { default_avator } from "../../util/user";
import store from "../../store";
export default {
  name: "setting",
  data() {
    return {
      // userinfo: store.getters.user,
      modals: {
        avator: {
          is_show: false,
          loading: true,
          title: "选择头像",
          data: {
            imgUrl: default_avator()[0],
            custom_avator: null
          },
          avator_list: default_avator()
        },
        baseinfo: {
          is_show: false,
          loading: true,
          title: "修改用户信息",
          rules: {
            name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
            email: [
              { required: true, message: "请输入邮箱", trigger: "blur" },
              { type: "email", message: "邮箱格式不正确", trigger: "blur" }
            ],
            mobilePhone: [
              { required: true, message: "请输入手机号码", trigger: "blur" },
              { pattern: /^1[0-9]{10}$/, message: "手机号码格式不正确", trigger: "blur" }
            ]
          },
          data: {
            email: store.getters.user.email,
            name: store.getters.user.name,
            mobilePhone: store.getters.user.mobilePhone
          }
        },
        update_password: {
          is_show: false,
          title: "修改密码",
          loading: true,
          rules: {
            password: [{ required: true, message: "请输入密码", trigger: "blur" }],
            repassword: [
              { required: true, message: "请输入确认密码", trigger: "blur" },
              { validator: this.check_password, trigger: "blur" }
            ]
          },
          data: {
            password: null,
            repassword: null
          }
        }
      }
    };
  },
  computed: {
    userinfo: function() {
      return store.getters.user;
    },
    avator: function() {
      return store.getters.user_img || default_avator()[0];
    }
  },
  methods: {
    // 显示选择头像
    show_change_avator_modal() {
      this.modals.avator.is_show = true;
      this.modals.avator.data.avator_list = default_avator();
    },
    // 显示修改邮箱和密码
    show_change_mail_modal() {
      this.modals.baseinfo.is_show = true;
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
    handle_avator_success(res, file) {
      if (res.status === "success") {
        this.modals.avator.data.custom_avator = res.data.result;
        if (this.modals.avator.avator_list.length == default_avator().length) {
          this.modals.avator.avator_list.push(res.data.result);
        } else {
          this.modals.avator.avator_list[10] = res.data.result;
        }
      }
    },
    // 选中头像
    select_avator(index) {
      this.modals.avator.data.imgUrl = this.modals.avator.avator_list[index];
    },
    // 提交用户头像
    post_avator_to_server() {
      this.modals.avator.loading = false;
      this.modals.avator.data.custom_avator = undefined;
      this.modals.avator.data.avator_list = undefined;
      ajax_put_user_avator(this.modals.avator.data).then(res => {
        this.modals.avator.loading = true;
        if (res.status == "success") {
          this.modals.avator.is_show = false;
          this.$Notice.success({
            title: "更新用户头像成功."
          });
          this.$store.dispatch("store_get_baseinfo").then(res => {
            // this.$router.push("/company/information");
          });
        } else {
          this.$Notice.error({
            title: res.message
          });
        }
      });
    },
    // 提交基本信息
    put_baseinfo() {
      this.$refs["change_baseinfo_form"].validate(valid => {
        if (valid) {
          this.modals.baseinfo.loading = false;
          ajax_update_user(this.modals.baseinfo.data).then(res => {
            this.modals.baseinfo.loading = true;
            if (res.status == "success") {
              this.modals.baseinfo.is_show = false;
              this.$Notice.success({
                title: "更新用户信息成功."
              });
              this.$store.dispatch("store_get_baseinfo").then(res => {});
            } else {
              this.$Notice.error({
                title: res.message
              });
            }
          });
        } else {
          this.modals.baseinfo.loading = false;
          this.$nextTick(() => {
            this.modals.baseinfo.loading = true;
          });
        }
      });
    },
    // 判断密码是否相同
    check_password(rule, value, callback, source, options) {
      if (value != this.modals.update_password.data.password) {
        return callback(new Error("两次输入密码不相同"));
      } else {
        callback();
      }
    },
    // 修改信息
    show_change_info_modal() {},
    // 重置验证
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // 显示修改密码
    show_change_password_modal() {
      this.$refs["change_password_form"].resetFields();
      this.modals.update_password.is_show = true;
    },
    // 提交修改密码
    put_user_password() {
      const _this = this;
      this.$refs["change_password_form"].validate(valid => {
        if (valid) {
          ajax_put_user_password(this.modals.update_password.data).then(res => {
            this.modals.update_password.is_show = false;
            this.$Notice.success({
              title: "修改密码成功!"
            });
          });
        } else {
          this.modals.update_password.loading = false;
          this.$nextTick(() => {
            this.modals.update_password.loading = true;
          });
        }
      });
    },
    // 获取基本用户信息
    get_user_base_info() {}
  },
  created() {
    this.get_user_base_info();
  }
};
</script>
<style lang="less">
.user-info-list {
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
  li {
    margin-bottom: 10px;
  }
}
</style>
