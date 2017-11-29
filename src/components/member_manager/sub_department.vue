<template>
  <div>
    <div class="member-department-bar clearfix">
      <div class="fr">
        <Input placeholder="请输入成员姓名" v-model="keywords" icon="search" class="radius-input search-input-box" @on-click="do_search" style="width: 200px;"></Input>
        <Button type="ghost" class="radius-button" @click="show_create_new_member_modal">
          <Icon type="plus-round"></Icon> 添加成员</Button>
      </div>
      <div class="department-list">
        <a href="javascript:;" :class="{'cur': department.id == current_department_id}" v-for="(department, index) in department_list_data" @click="change_department(index)" :key="department.id">{{department.name}}</a>
      </div>
    </div>
    <div class="member-list">
    <ul class="clearfix">
      <li class="member-list-item" v-for="(member, index) in member_list_data" :key="member.id">
        <div class="member-mod">
          <div class="is-department-leader" v-if="member.ifDepartLeader">负责人</div>
          <dl class="member-item clearfix">
            <dt class="member-item-hd">
              <div class="face-box">
                <!-- <img src="https://img1.doubanio.com/icon/u2629298-7.jpg" alt=""> -->
                <div class="account-suspend" v-if="member.status==0">已离职</div>
              </div>
            </dt>
            <dd class="member-item-bd">
              <h3>
                <a href="javascript:;">{{member.name}}</a>
              </h3>

              <div class="sub-content" v-if="member.phone.length"><Icon type="iphone" size=22></Icon> {{member.phone}}</div>
              <div class="sub-content" v-if="member.email.length"><Icon type="ios-email-outline" size=18></Icon> {{member.email}}</div>
            </dd>
          </dl>
          <div class="opt-layer">
            <a @click="confirm_del_member(index)" href="javascript:;">删除</a>
            <span>|</span>
            <a @click="show_update_member_modal(index)" href="javascript:;">编辑</a>
          </div>
        </div>
      </li>
    </ul>
    </div>
    <div v-if="member_list_data.length==0">
      <Alert show-icon>
        暂未添加成员
    </Alert>
    </div>
    <div class="page-bar" v-if="member_list_data.length">
      <Page :total="total_record" :page-size="page_size" @on-change="change_page_data"></Page>
    </div>

    <!--新增成员-->
    <Modal v-model="modals.member.is_show" :mask-closable="false" :loading="modals.member.loading" :title="modals.member.title" @on-ok="post_member">
      <Form ref="member_form" :model="modals.member.data" :rules="modals.member.rules" :label-width="120">
        <FormItem label="姓名" prop="name">
          <Input placeholder="请输入姓名" v-model="modals.member.data.name" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input placeholder="请输入邮箱" v-model="modals.member.data.email" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="phone">
          <Input placeholder="请输入手机号码" v-model="modals.member.data.phone" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="所属公司" prop="companyid">
          <Select style="width:200px" v-model="modals.member.data.companyid" @on-change="change_company_get_department">
            <Option :value="item.id" v-for="(item, index) in company_list_data" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否公司负责人" prop="companyLeaderFlag">
          <RadioGroup v-model="modals.member.data.companyLeaderFlag">
            <Radio label="1">
              <span>是</span>
            </Radio>
            <Radio label="0">
              <span>否</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="所属部门" prop="departid">
          <Select style="width:200px" v-model="modals.member.data.departid">
            <Option :value="department.id" v-for="(department, index) in modals.member.department_list_data" :key="department.id">{{ department.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否部门负责人" prop="departLeaderFlag">
          <RadioGroup v-model="modals.member.data.departLeaderFlag">
            <Radio label="1">
              <span>是</span>
            </Radio>
            <Radio label="0">
              <span>否</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="状态" prop="status">
          <RadioGroup v-model="modals.member.data.status">
            <Radio label="1">
              <span>在职</span>
            </Radio>
            <Radio label="0">
              <span>离职</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>


  </div>
</template>
<script>
import { Message } from "iview";
import {
  ajax_post_member,
  ajax_get_member_list,
  ajax_del_member
} from "../../apis/member";
import { ajax_get_company_selectbox } from "../../apis/company";
import { ajax_get_deparment_by_company_id } from "../../apis/department";
import store from "../../store/";

export default {
  name: "subDepartment",
  props: ["c_id", "c_ame", "page"],
  computed: {
    company_list_data() {
      return this.$store.getters.company_list_data;
    }
  },
  data() {
    return {
      department_list_data: [],
      department_select_list_data: [],
      current_department_id: null,
      member_list_data: [],
      page_num: this.page,
      page_size: 9,
      total_record: null,
      keywords: "",
      modals: {
        member: {
          is_show: false,
          loading: true,
          rules: {
            name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
            email: [{type:'email', message: "电子邮箱格式不准确", trigger: "blur" }]
          },
          title: "新增成员",
          company_list_data: [],
          department_list_data: [],
          data: {
            companyid: null,
            departLeaderFlag: 0,
            companyLeaderFlag: 0,
            departid: null,
            email: "",
            name: "",
            phone: "",
            status: 1
          }
        }
      }
    };
  },

  methods: {
    // 显示新建用户弹出层
    show_create_new_member_modal() {
      this.$refs['member_form'].resetFields();
      this.modals.member.title = '新建成员';
      this.modals.member.data.departLeaderFlag = 0;
      this.modals.member.data.companyLeaderFlag = 0;
      this.modals.member.data.email = "";
      this.modals.member.data.name = "";
      this.modals.member.data.phone = "";
      this.modals.member.data.id = undefined;
      this.modals.member.data.status = 1;
      this.modals.member.data.companyid = this.c_id;
      this.modals.member.data.departid = this.current_department_id;
      this.modals.member.is_show = true;
      this.get_department_select_list_data(this.c_id);
    },
    // 显示修改用户弹出层id
    show_update_member_modal(index) {
      this.$refs['member_form'].resetFields();
      this.modals.member.title = '编辑成员';
      this.modals.member.data.id = this.member_list_data[index].id;
      this.modals.member.data.departLeaderFlag = this.member_list_data[
        index
      ].departLeaderFlag;
      this.modals.member.data.companyLeaderFlag = this.member_list_data[
        index
      ].companyLeaderFlag;
      this.modals.member.data.email = this.member_list_data[index].email;
      this.modals.member.data.name = this.member_list_data[index].name;
      this.modals.member.data.phone = this.member_list_data[index].phone;
      this.modals.member.data.status = 1;
      this.modals.member.data.companyid = this.member_list_data[
        index
      ].companyid;
      this.modals.member.data.departid = this.member_list_data[index].departid;
      this.modals.member.is_show = true;
      this.get_department_select_list_data(
        this.member_list_data[index].companyid
      );
    },
    // 根据关键词搜索
    do_search() {
      this.page_num = 1;
      this.get_member_list_data();
    },
    // 改变部门
    change_department(index){
      this.page_num = 1;
      this.current_department_id = this.department_list_data[index].id;
      this.get_member_list_data();
    },
    // 改变公司获取对应部门
    change_company_get_department(id){
      const _this = this;
      ajax_get_deparment_by_company_id({
        id: id
      })
        .then(rs => {
          const data = rs.data;
          _this.modals.member.department_list_data = data;
          if (data.length){
            _this.modals.member.data.departid = data[0].id ? data[0].id : null;
          }
        })
        .catch(error => {
          Message.error(error);
        });
    },
    // 获取部门和成员列表数据
    get_department_list_data(id, index) {
      const _this = this;
      ajax_get_deparment_by_company_id({
        id: id
      })
        .then(rs => {
          const data = rs.data;
          _this.department_list_data = data;
          _this.current_department_id = data[index].id;
          // _this.current_department_name = data[index].name;
          // 更新成员数据
          this.get_member_list_data();
        })
        .catch(error => {
          Message.error(error);
        });
    },
    // 翻页
    change_page_data(page) {
      this.page_num = page;
      this.get_member_list_data();
    },
    // 获取部门下拉数据
    get_department_select_list_data(id, had_val) {
      const _this = this;
      ajax_get_deparment_by_company_id({
        id: id
      })
        .then(rs => {
          const data = rs.data;
          _this.modals.member.department_list_data = data;
          _this.modals.member.departid =
            had_val != false ? data[0].id : had_val;
        })
        .catch(error => {
          Message.error(error);
        });
    },
    // 获取成员列表
    get_member_list_data() {
      const _this = this;
      ajax_get_member_list({
        pageSize: this.page_size,
        pageNum: this.page_num,
        data: {
          companyid: this.c_id,
          departid: this.current_department_id,
          name: this.keywords
        }
      })
        .then(rs => {
          const data = rs.data;
          _this.member_list_data = data.data;
          _this.total_record = data.totalNum;
        })
        .catch(error => {
          Message.error(error);
        });
    },
    // 新建成员
    post_member() {
      this.$refs["member_form"].validate(valid => {
        if (valid) {
          // this.modals.member.data.companyid = this.c_id;
          // this.modals.member.data.departid = this.current_department_id;
          ajax_post_member(this.modals.member.data)
            .then(res => {
              this.modals.member.is_show = false;
              this.modals.member.loading = false;
              if (res.status == 'success') {
                this.$Notice.success({ title: "保存成功！" });
                this.get_member_list_data();
              } else {
                this.$Notice.error({ title: "保存失败！" });
                this.get_member_list_data();
              }
            })
            .catch(error => {
              this.$Notice.error({ title: "保存失败！" });
            });
        } else {
          this.modals.member.loading = false;
          this.$nextTick(() => {
            this.modals.member.loading = true;
          });
        }
      });
    },
    // 删除成员
    del_member(id) {
      ajax_del_member({ id: id })
        .then(res => {
          this.$Notice.success({ title: "删除成员成功！" });
          this.get_member_list_data();
        })
        .catch(error => {
          this.$Notice.error({ title: "删除成员失败！" });
        });
    },
    // 删除成员确认
    confirm_del_member(index) {
      const _name = this.member_list_data[index].name;
      const _id = this.member_list_data[index].id;
      this.$Modal.confirm({
        title: "删除成员确认",
        content:
          '<div class="fz-14"><p>确认删除姓名为 <strong>' +
          _name +
          "</strong> 的用户吗？</p><p>删除后将不能恢复，请谨慎操作！</p></div>",
        onOk: () => {
          this.del_member(_id);
        }
      });
    }
  },
  created() {
    if (this.c_id == null) return;
    this.get_department_list_data(this.c_id, 0);
  },
  watch: {
    c_id() {
      this.get_department_list_data(this.c_id, 0);
    }
  }
};
</script>
<style lang="less">
.member-department-bar {
  padding: 20px 0;
}
.department-list {
  a {
    margin-right: 10px;
    color: #666;
    &.cur {
      color: #2d8cf0;
    }
  }
}
.search-input-box {
  .ivu-icon-search {
    cursor: pointer;
  }
}
.member-list {
  margin-left: -3%;
  .member-list-item {
    float: left;
    width: 30%;
    margin-left: 3%;
    margin-bottom: 20px;
    .member-mod {
      position: relative;
      border: 1px solid #ececec;
      padding: 18px;
      height: 140px;
      .member-item {
        .member-item-hd {
          float: right;
          padding-top: 25px;
          .face-box {
            width: 64px;
            height: 64px;
            border-radius: 32px;
            position: relative;
            overflow: hidden;
            img {
              width: 64px;
              height: 64px;
            }
            .account-suspend {
              position: absolute;
              width: 64px;
              height: 64px;
              left: 0;
              top: 0;
              z-index: 1;
              line-height: 64px;
              text-align: center;
              color: #fff;
              background: rgba(0, 0, 0, 0.6);
              filter: progid:DXImageTransform.Microsoft.gradient(
                  startColorstr=#99000000,
                  endColorstr=#99000000
                );
            }
          }
        }
        .member-item-bd {
          float: left;
          h3 {
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            a {
              color: #000;
            }
          }
          .sub-content {
            color: #999;
            height: 28px;
            line-height: 28px;
          }
        }
      }
      .opt-layer {
        position: absolute;
        display: none;
        width: 100px;
        text-align: center;
        height: 28px;
        line-height: 28px;
        color: #fff;
        background: rgba(0, 0, 0, 0.7);
        filter: progid:DXImageTransform.Microsoft.gradient(
            startColorstr=#b2000000,
            endColorstr=#b2000000
          );
        left: 50%;
        margin-left: -50px;
        font-size: 14px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        bottom: 10px;
        a {
          color: #fff;
          &:hover {
            color: #57a3f3;
          }
        }
      }
      .is-department-leader {
        display: block;
        height: 20px;
        width: 60px;
        text-align: center;
        color: #fff;
        background-color: #26a247;
        line-height: 20px;
        position: absolute;
        right: 0;
        top: 0;
      }

      &:hover {
        border-color: #c7d0f7;
        .opt-layer {
          display: block;
        }
      }
    }
  }
}
</style>