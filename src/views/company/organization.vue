<template>
<div class="p-25 mt-46 bg-organization">
    <div class="organization-mod">
        <div class="organization-hd clearfix">
            <div class="organization-logo">
                <img src="https://img1.doubanio.com/icon/u2629298-7.jpg" alt="">
            </div>
            <div class="organization-name-opt">
                <div class="organization-name clearfix">
                    <h1>{{page_title}}</h1><strong></strong>
                </div>
                <div class="organization-opt clearfix">
                    <div class="fr">
                        <Dropdown style="margin-left: 20px" @on-click="handle_manager_organization">
                            <a href="javascript:void(0)">
                                组织管理
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="manager_company">管理公司</DropdownItem>
                                <DropdownItem name="create_company">添加公司</DropdownItem>
                                <DropdownItem name="manager_department">管理部门</DropdownItem>
                                <DropdownItem name="create_department">添加部门</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button type="ghost">修改资料</Button>
                    </div>
                    <img class="avator" src="https://img1.doubanio.com/icon/u2629298-7.jpg" alt="露得清">
                    <strong class="name">露得清</strong>
                    <span class="is-leader">负责人</span>
                    <span class="is-certification">资料已认证</span>
                </div>
            </div>
        </div>
        <div class="organization-bd">
            <Row>
                <Col span="8">
                    <div class="sub-company">
                        <h3 class="title">我的分公司</h3>
                        <ul class="sub-company-list">
                            <li v-for="(company, index) in company_list_data" :key="company.id" :class="{cur: company.id == current_company_id}">
                                <a href="javascript:;" @click="change_company(index)">
                                    <img src="https://img1.doubanio.com/icon/u2629298-7.jpg" :alt="company.name">
                                    <strong>{{company.name}}</strong>
                                </a>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col span="16">
                    <div class="sub-company-department-list">
                        <h3 class="title">分公司部门</h3>
                        <div class="sub-company-department-nav-bar clearfix">
                            <a href="javascript:;" @click="change_department(index)" :class="{cur: department.id == current_department_id}" v-for="(department, index) in department_list_data" :key="department.id">{{department.name}}</a>    
                        </div>  
                        <div class="member-list">
                            <ul class="clearfix">
                                <li v-for="member in member_list_data" :key="member.id">
                                    <div class="ml-box">
                                    <img class="avator" src="https://img1.doubanio.com/icon/u2629298-7.jpg" alt="毛梦琪">
                                    <strong class="name">{{member.name}}</strong>
                                    <!-- <span class="dep">市场部</span>   -->
                                    <span class="is-leader" v-if="member.ifDepartLeader">负责人</span>
                                    </div>
                                </li>
                            </ul>
                        </div>                      
                    </div>
                </Col>
            </Row>
        </div>
    </div>


    <!--管理公司-->
    <!--添加公司-->
    <Modal v-model="modals.company.create.is_show" :mask-closable="false" :title="modals.company.create.title" @on-ok="post_create_company">
      <Form ref="create_company_form" :model="modals.company.create.data" :rules="modals.company.create.rules" :label-width="120">
        <FormItem label="公司名称" prop="company_name">
          <Input placeholder="请输入公司名称" v-model="modals.company.create.data.name" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="所在地区" prop="area">
          <Select style="width:100px" v-model="modals.company.create.data.province" @on-change="change_province">
            <Option :value="item.id" v-for="(item, index) in province_data" :key="item.id">{{ item.areaName }}</Option>
          </Select>
          <Select style="width:100px" v-model="modals.company.create.data.city" @on-change="change_city">
            <Option :value="item.id" v-for="(item, index) in city_data" :key="item.id">{{ item.areaName }}</Option>
          </Select>
          <Select style="width:100px" v-model="modals.company.create.data.area">
            <Option :value="item.id" v-for="(item, index) in region_data" :key="item.id">{{ item.areaName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="详细地址" prop="department">
          <Input placeholder="请输入详细地址" v-model="modals.company.create.data.address" style="width:200px;"></Input>
        </FormItem>
      </Form>
    </Modal>

    <!--管理部门-->
    <!--添加部门-->
    <Modal v-model="modals.department.create.is_show" :mask-closable="false" :title="modals.department.create.title" @on-ok="post_create_department">
      <Form ref="create_department_form" :model="modals.department.create.data" :rules="modals.department.create.rules" :label-width="120">
        <FormItem label="所属公司" prop="companyid">
          <Select style="width:200px" v-model="modals.department.create.data.companyid">
            <Option :value="item.id" v-for="(item, index) in company_list_data" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="部门名称" prop="department">
          <Input placeholder="请输入部门名称" v-model="modals.department.create.data.name" style="width:200px;"></Input>
        </FormItem>
      </Form>
    </Modal>



    </div>
</template>
<script>
import {
  ajax_get_company_all,
  ajax_get_company_selectbox,
  ajax_get_area,
  ajax_post_company
} from "../../apis/company";
import {
  ajax_post_department,
  ajax_get_deparment_by_company_id
} from "../../apis/department";
import {
  get_enterprise_creater_name,
  get_enterpri_id,
  get_has_enterprise
} from "../../util/user";
import { ajax_get_member_list } from "../../apis/member";
import { Message } from "iview";
import store from "../../store";

export default {
  data() {
    return {
      page_title: store.getters.enterprise_name,
      company_list_data: [],
      department_list_data: [],
      member_list_data: [],
      province_data: [],
      city_data: [],
      region_data: [],
      current_company_id: null,
      page_size: 10,
      page_num: 1,
      current_department_id: null,
      modals: {
        department: {
          create: {
            is_show: false,
            title: "新建部门",
            data: {
              companyid: null,
              name: ""
            },
            rules: {}
          }
        },
        company: {
          create: {
            is_show: false,
            title: "新建公司",
            data: {
              province: null,
              city: null,
              area: null,
              address: "",
              name: "",
              enterpriseId: get_enterpri_id()
            },
            rules: {}
          }
        }
      }
    };
  },
  methods: {
    // 组织管理
    handle_manager_organization(name) {
      if (name === "manager_company") {
      } else if (name === "create_company") {
        this.modals.company.create.is_show = true;
        this.get_area_data("province");
      } else if (name === "manager_department") {
      } else if (name === "create_department") {
        this.modals.department.create.is_show = true;
      }
    },
    // 公司列表
    get_company_select_box_data() {
      const _this = this;
      this.$store
        .dispatch("store_get_companies")
        .then(rs => {
          const data = rs;
          _this.company_list_data = data;
          _this.modals.department.create.data.companyid = data[0].id;
          _this.current_company_id = data[0].id;
          _this.get_department_by_company_id(data[0].id);
        })
        .catch(error => {
          Message.error(error);
        });
    },
    // 公司部门列表
    get_department_by_company_id(id) {
      const _this = this;
      ajax_get_deparment_by_company_id({
        id: id
      })
        .then(res => {
          this.department_list_data = res.data;
          if(res.data.length == 0) {
            this.member_list_data = [];
            this.$Notice.info({
                title: '该公司下还未建立任何部门',
            });
          } else {
            this.current_department_id = res.data[0].id;
            this.get_member_by_department_id();
          }
        })
        .catch(error => {
          Message.error(error);
        });
    },
    // 成员列表
    get_member_by_department_id() {
      const _this = this;
      ajax_get_member_list({
        pageSize: this.page_size,
        pageNum: this.page_num,
        data: {
          companyid: this.current_company_id,
          departid: this.current_department_id,
          name: ''
        }
      })
        .then(res => {
          this.member_list_data = res.data.data;
        })
        .catch(error => {
          console.log('error', error)
          Message.error(error);
        });
    },
    // 新增部门数据提交
    post_create_department() {
      ajax_post_department({
        companyId: this.modals.department.create.data.companyid,
        name: this.modals.department.create.data.name
      }).then(res => {});
    },
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
    // 改变省份
    change_province(p) {
      this.get_area_data("city", p);
    },
    change_city(p) {
      this.get_area_data("region", p);
    },
    // 提交新增公司数据
    post_create_company() {
      ajax_post_company(this.modals.company.create.data).then(res => {
        console.log("res", res);
      });
    },
    // 切换公司
    change_company(index){
      this.page_num = 1;
      this.current_company_id = this.company_list_data[index].id;
      this.get_department_by_company_id(this.current_company_id);
    },
    // 切换部门
    change_department(index){
      this.page_num = 1;
      this.current_department_id = this.department_list_data[index].id;
      this.get_member_by_department_id();
    }
  },
  created() {
    this.get_company_select_box_data();
  }
};
</script>

<style lang="less">
.mt-46 {
  margin-top: 46px;
}
.bg-organization {
  background: url(../../assets/images/bg-organization.jpg) top right no-repeat;
}
.organization-mod {
  .organization-hd {
    .organization-logo {
      box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.1);
      width: 260px;
      height: 160px;
      text-align: center;
      background-color: #fff;
      display: table-cell;
      vertical-align: middle;
      img {
      }
    }
    .organization-name-opt {
      margin-left: 290px;
      margin-top: -130px;
      .organization-name {
        margin-bottom: 20px;
        h1 {
          font-size: 26px;
          float: left;
          margin-right: 20px;
          color: #000;
        }
        strong {
        }
      }
      .organization-opt {
        margin-bottom: 20px;
        .avator {
          width: 32px;
          height: 32px;
          border-radius: 16px;
          margin-right: 10px;
        }
        .name {
          top: -10px;
          margin-right: 5px;
          position: relative;
        }
        .is-leader {
          top: -10px;
          margin-right: 10px;
          color: #999;
          position: relative;
        }
        .is-certification {
          top: -10px;
          color: #999;
          position: relative;
        }
        .ivu-dropdown {
          float: left;
          margin-right: 20px;
          .ivu-dropdown-rel {
            border: 1px solid #aebbdb;
            font-size: 14px;
            height: 28px;
            line-height: 28px;
            padding: 0 15px;
            border-radius: 14px;
            a {
              color: #aebbdb;
            }
            &:hover {
              border-color: #7899e9;
              a {
                color: #7899e9;
              }
            }
          }
        }
        .ivu-btn {
          border: 1px solid #aebbdb;
          font-size: 14px;
          height: 28px;
          line-height: 28px;
          padding: 0 15px;
          border-radius: 14px;
          color: #aebbdb;
          &:hover {
            border-color: #7899e9;
            color: #7899e9;
          }
        }
      }
    }
  }
  .organization-bd {
    background: #fff;
    .sub-company {
      padding-top: 35px;
      padding-left: 20px;
      .sub-company-list {
        border-top: 1px solid #f0f0f0;
        li {
          border-bottom: 1px solid #f0f0f0;
          a {
            padding-left: 10px;
            display: block;
            height: 66px;
            line-height: 66px;
            color: #333;
            img {
              width: 44px;
              height: 44px;
              border: 1px solid #dbdbdb;
              border-radius: 22px;
              vertical-align: middle;
              margin-right: 10px;
            }
            strong {
              color: #000;
              font-size: 14px;
            }
            &:hover {
              background-color: #4e7bfa;
              color: #fff;
            }
          }
          &.cur {
            a {
              background-color: #4e7bfa;
              color: #fff;
            }
          }
        }
      }
      .title {
        font-size: 14px;
        color: #b8c4e1;
        padding-bottom: 20px;
      }
    }
    .sub-company-department-list {
      padding: 35px 25px 35px 25px;
      background-color: #f7f7f7;
      .title {
        font-size: 14px;
        color: #b8c4e1;
        padding-bottom: 20px;
      }
      .sub-company-department-nav-bar {
        margin-bottom: 20px;
        a {
          display: inline-block;
          height: 38px;
          line-height: 38px;
          padding: 0 15px;
          color: #737c8e;
          margin-right: 8px;
          border-radius: 19px;
          &:hover,
          &.cur {
            background: #4e7bfa;
            color: #fff;
          }
        }
      }
      .member-list {
        margin-left: -2%;
        li {
          float: left;
          margin-bottom: 15px;
          width: 47%;
          margin-left: 2%;
          .ml-box {
            position: relative;
            height: 74px;
            line-height: 74px;
            background: #fff;
            border: 1px solid #ededed;
            padding: 0 15px;
            .avator {
              width: 44px;
              height: 44px;
              border: 1px solid #dbdbdb;
              border-radius: 22px;
              vertical-align: middle;
              margin-right: 10px;
            }
            .name {
              font-size: 18px;
              margin: 10px;
            }
            .dep {
              font-size: 14px;
              color: #c3c3c3;
            }
            .is-leader {
              position: absolute;
              right: 0;
              top: 0;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              background-color: #23983f;
              color: #fff;
              padding: 0 5px;
            }
            &:hover {
              border-color: #4e7bfa;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            }
          }
        }
      }
    }
  }
}
</style>