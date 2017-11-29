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
                <div class="face-box">
                    <img src="../../assets/images/avator/mrtx0.png" alt="">
                </div>
            </li>
            <li>
                姓名：{{userinfo.name}}
            </li>
            <li>
                手机：{{userinfo.mobilePhone}}
            </li>
            <li>
                邮箱：
            </li>
        </ul>
        <div>
            <Button @click="show_change_password_modal">修改密码</Button>
        </div>
      </div>
    </div>

    <!--修改密码信息-->
    <Modal ref="update_password_modal" v-model="modals.update_password.is_show" :loading="modals.update_password.loading"
    @on-ok="put_user_password"
     :mask-closable="false" :title="modals.update_password.title">
      <Form ref="change_password_form" :model="modals.update_password.data" :rules="modals.update_password.rules" :label-width="120">
        <FormItem label="新密码" prop="password">
          <Input placeholder="请输入新密码" v-model="modals.update_password.data.password" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="repassword">
          <Input placeholder="请输入确认密码" v-model="modals.update_password.data.repassword" style="width:200px;"></Input>
        </FormItem>
      </Form>
    </Modal>


  </div>
</template>
<script>
import {
  ajax_get_user_front_info,
  ajax_put_user_password
} from "../../apis/user";
import store from "../../store";
export default {
  name: "setting",
  data() {
    return {
      userinfo: store.getters.user,
      modals: {
        update_password: {
          is_show: false,
          title: "修改密码",
          loading: true,
          rules: {
            password: [{ required: true, message: "请输入密码", trigger: "blur" }],
            repassword: [
              { required: true, message: "请输入确认密码", trigger: "blur" },
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
  methods: {
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
                    title: '修改密码成功!',
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
