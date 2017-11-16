<template>
  <div>
    <div class="normal-box-mod">
      <div class="normal-box-hd clearfix">
        <div class="normal-box-title">
          <div class="decorate-square"></div>
          <h2>成员管理</h2>
        </div>
      </div>
      <div class="normal-box-bd">
        <div class="group-manager-bar clearfix">
          <div class="search-bar fr">
            <Input placeholder="请输入成员姓名" class="radius-input" style="width: 300px;">
            </Input>
            <Button icon="ios-search"></Button>
          </div>
          <div>
            <Select style="width:200px">
              <Option v-for="item in company_list_data" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select style="width:200px">
              <Option v-for="item in department_list_data_by_current_company" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Button type="ghost" @click="show_create_new_member">
              <Icon type="plus-round"></Icon> 添加成员</Button>
          </div>
        </div>
        <div class="group-manager-list">
          <Row getters="14">
            <Col>
            <dl class="group-item-mod clearfix">
              <dt class="group-item-hd">
                <div class="face-box">
                  <img src="https://img1.doubanio.com/icon/u2629298-7.jpg" alt="">
                  <div class="account-suspend">已停用</div>
                </div>
              </dt>
              <dd class="group-item-bd">
                <h3>
                  <a href="javascript:;">安德烈</a>
                </h3>
                <div>
                  <span class="fr">
                    <Button type="text">删除</Button>
                    <span>|</span>
                    <Button type="text">停用</Button>
                    <span>|</span>
                    <Button type="text">详情</Button>
                  </span>
                  <span class="mr-10 label-color-green">负责人</span>
                  <span>UI 财务</span>
                </div>
              </dd>
            </dl>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <!--新增成员-->
    <Modal v-model="modals.member.is_show" :title="modals.member.title" @on-ok="post_member">
      <Form ref="member_form" :model="modals.member.data" :rules="modals.member.rules" :label-width="120">
        <FormItem label="姓名" prop="name">
          <Input placeholder="请输入姓名" v-model="modals.member.data.name"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input placeholder="请输入邮箱" v-model="modals.member.data.email"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="phone">
          <Input placeholder="请输入手机号码" v-model="modals.member.data.phone"></Input>
        </FormItem>
        <FormItem label="所属公司" prop="companyid">
          <Select style="width:200px" v-model="modals.member.data.companyid">
            <Option v-for="item in modals.member.company_list_data" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
            <Option v-for="item in modals.member.department_list_data" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
import { Message } from 'iview';
import { ajax_post_member } from "../../apis/member";
import { ajax_get_company_selectbox } from "../../apis/company";
import { ajax_get_deparment_by_company_id } from "../../apis/department";

export default {
  data() {
    return {
      company_list_data: [], // 公司
      current_company_id: null,
      department_list_data_by_current_company: [],
      current_department_id: null,
      modals: {
        member: {
          is_show: false,
          rules: {},
          title: "新增成员",
          company_list_data: [],
          department_list_data: [],
          data: {
            companyid: 0,
            departLeaderFlag: 0,
            companyLeaderFlag: 0,
            departid: 0,
            email: "",
            id: 0,
            name: "",
            phone: "",
            status: 1
          }
        }
      }
    };
  },
  methods: {
    show_create_new_member() {
      this.modals.member.is_show = true;
    },
    post_member_info() {},
    post_member() {},
    // 公司下拉列表
    get_company_select_box_data() {
      const _this = this;
      ajax_get_company_selectbox()
        .then(rs => {
          const data = rs.data;
          _this.company_list_data = data;
          _this.current_company_id = data[0].id;
          _this.get_department_list_data(data[0].id);
        })
        .catch(error => {
          Message.error(error)
          console.log("error", error);
        });
    },
    // 获取部门
    get_department_list_data(id) {
      const _this = this;
      ajax_get_deparment_by_company_id({
        id: id
      })
        .then(rs => {
          const data = rs.data;
          _this.department_list_data_by_current_company = data;
          _this.current_department_id = data[0].id;
        })
        .catch(error => {
          Message.error(error)
          console.log("error", error);
        });
    }
  },
  created(){
    this.get_company_select_box_data();
  }
};
</script>

<style lang="less">
.group-manager-bar {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.group-item-mod {
  border: 1px solid #ececec;
  padding: 18px;

  .group-item-hd {
    float: left;
    margin-right: 15px;

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
  .group-item-bd {
    h3 {
      height: 40px;
      line-height: 40px;
      a {
        color: #000;
      }
    }
  }
  &:hover {
    border-color: #bfc8fa;
  }
}

.label-color-green {
  display: inline-block;
  background: #23983e;
  color: #fff;
  padding: 0 5px;
  font-size: 14px;
}
</style>