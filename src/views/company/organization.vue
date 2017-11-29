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
                                <DropdownItem v-if="enterprise_type == 2" name="create_company">添加公司</DropdownItem>
                                <DropdownItem name="manager_department">管理部门</DropdownItem>
                                <DropdownItem name="create_department">添加部门</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button type="ghost" @click="goto_cert">修改资料</Button>
                    </div>
                    <img class="avator" src="https://img1.doubanio.com/icon/u2629298-7.jpg" :alt="create_name">
                    <strong class="name">{{create_name}}</strong>
                    <!-- <span class="is-leader">负责人</span> -->
                    <span class="is-certification">资料已认证</span>
                </div>
            </div>
        </div>
        <div class="organization-bd">
            <Row v-if="enterprise_type==2">
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
                        <div class="page-bar" v-if="member_list_data.length">
                          <Page :total="total_member_record" :current="current_page" :page-size="page_size" @on-change="change_member_page_data"></Page>
                        </div>                   
                    </div>
                </Col>
            </Row>

            <Row v-if="enterprise_type==1">
              <Col span="24">
                <div class="sub-company-department-list" style="background:#fff;">
                        <h3 class="title">部门</h3>
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
                        <div class="page-bar" v-if="member_list_data.length">
                          <Page :total="total_member_record" :current="current_page" :page-size="page_size" @on-change="change_member_page_data"></Page>
                        </div>                     
                    </div>

                   
              </Col>
            </Row>
        </div>
    </div>


    <!--管理公司-->
    <Modal class-name="no-footer-modal" v-model="modals.company.manager.is_show" :mask-closable="false" :title="modals.company.manager.title">
      <ul class="modal_company_list">
        <li v-for="(company, index) in company_list_data" :key="company.id" class="clearfix">
          {{company.name}}
          <span class="fr">
            <Button type="ghost" size="small" @click="show_update_company_modal(index)" class="mr-5">编辑</Button>
            <Button type="ghost" size="small" @click="confirm_del_company(index)">删除</Button>
          </span>
        </li>        
      </ul>
      <div slot="footer"></div>
    </Modal>


    <!--管理部门-->
    <Modal class-name="no-footer-modal" v-model="modals.department.manager.is_show" :mask-closable="false" :title="modals.department.manager.title">
      <div class="mb-20">
        <Select style="width:200px" v-model="modals.department.manager.data.companyid" @on-change="get_department_by_change_company">
            <Option :value="item.id" v-for="(item, index) in company_list_data" :key="item.id">{{ item.name }}</Option>
          </Select>
      </div>
      <ul class="modal_company_list">
        <li v-for="(department, index) in modals.department.manager.department_list_data" :key="department.id" class="clearfix">
          {{department.name}}
          <span class="fr">
            <Button type="ghost" size="small" @click="show_update_department_modal(index)" class="mr-5">编辑</Button>
            <Button type="ghost" size="small" @click="confirm_del_department(index)">删除</Button>
          </span>
        </li>        
      </ul>
      <div slot="footer"></div>
    </Modal>


    <!--添加公司-->
    <Modal v-model="modals.company.create.is_show" :loading="modals.company.create.loading" :mask-closable="false" :title="modals.company.create.title" @on-ok="post_create_company">
      <Form ref="create_company_form" :model="modals.company.create.data" :rules="modals.company.create.rules" :label-width="120">
        <FormItem label="公司名称" prop="name">
          <Input placeholder="请输入公司名称" v-model="modals.company.create.data.name" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="所在地区" prop="area">
          <Select style="width:100px" v-model="modals.company.create.data.province" @on-change="change_province">
            <Option :value="item.id" number v-for="(item, index) in province_data" :key="item.id">{{ item.areaName }}</Option>
          </Select>
          <Select style="width:100px" v-model="modals.company.create.data.city" @on-change="change_city">
            <Option :value="item.id" number v-for="(item, index) in city_data" :key="item.id">{{ item.areaName }}</Option>
          </Select>
          <Select style="width:100px" v-model="modals.company.create.data.area">
            <Option :value="item.id" number v-for="(item, index) in region_data" :key="item.id">{{ item.areaName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="详细地址" prop="department">
          <Input placeholder="请输入详细地址" v-model="modals.company.create.data.address" style="width:200px;"></Input>
        </FormItem>
      </Form>
    </Modal>


    <!--添加部门-->
    <Modal v-model="modals.department.create.is_show" :loading = "modals.department.create.loading" :mask-closable="false" :title="modals.department.create.title" @on-ok="post_create_department">
      <Form ref="create_department_form" :model="modals.department.create.data" :rules="modals.department.create.rules" :label-width="120">
        <FormItem label="所属公司" prop="companyid">
          <Select style="width:200px" v-model="modals.department.create.data.companyid">
            <Option :value="item.id" v-for="(item, index) in company_list_data" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="部门名称" prop="name">
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
  ajax_post_company,
  ajax_del_company
} from "../../apis/company";
import {
  ajax_post_department,
  ajax_get_deparment_by_company_id,
  ajax_del_department
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
      create_name: store.getters.enterprise_creater_name,
      enterprise_type: store.getters.enterprise_type,
      company_list_data: [],
      department_list_data: [],
      member_list_data: [],
      total_member_record: 0,
      province_data: [],
      city_data: [],
      region_data: [],
      current_company_id: null,
      page_size: 10,
      page_num: 1,
      current_page: 1,
      current_department_id: null,
      modals: {
        department: {
          create: {
            is_show: false,
            title: "新建部门",
            loading: true,
            data: {
              companyid: null,
              name: ""
            },
            rules: {
              name: [{ required: true, message: "部门名称不能为空", trigger: "blur" }],
              companyid: [
                {
                  required: true,
                  type: "number",
                  message: "所属公司不能为空",
                  trigger: "change"
                }
              ]
            }
          },
          manager: {
            is_show: false,
            title: "管理部门",
            department_list_data: [],
            data: {
              companyid: null
            }
          }
        },
        company: {
          manager: {
            is_show: false,
            title: "管理公司",
            data: {}
          },
          create: {
            is_show: false,
            loading: true,
            title: "新建公司",
            data: {
              province: null,
              city: null,
              area: null,
              address: "",
              name: "",
              enterpriseId: get_enterpri_id()
            },
            rules: {
              name: [{ required: true, message: "公司名称不能为空", trigger: "blur" }]
            }
          }
        }
      }
    };
  },
  methods: {
    // 组织管理
    handle_manager_organization(name) {
      if (name === "manager_company") {
        this.modals.company.manager.is_show = true;
      } else if (name === "create_company") {
        this.$refs["create_company_form"].resetFields();
        this.modals.company.create.title = "创建公司";
        this.modals.company.create.is_show = true;
        this.modals.company.create.data = {};
        this.modals.company.create.data.enterpriseId = get_enterpri_id();
        this.get_area_data("province");
      } else if (name === "manager_department") {
        this.modals.department.manager.is_show = true;
        this.modals.department.manager.data.companyid = this.company_list_data[0].id;
        this.get_department_by_change_company();
      } else if (name === "create_department") {
        this.$refs["create_department_form"].resetFields();
        this.modals.department.create.title = "创建部门";
        this.modals.department.create.is_show = true;
        this.modals.department.create.data = {};
      }
    },
    // 跳转到修改认证信息
    goto_cert(){
      this.$router.push({
        name: 'change_certification'
      })
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
          if (res.data.length == 0) {
            this.member_list_data = [];
            this.$Notice.info({
              title: "该公司下还未建立任何部门"
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
          name: ""
        }
      })
        .then(res => {
          this.member_list_data = res.data.data;
          this.total_member_record = res.data.totalNum;
          this.current_page = res.data.pageNum;
        })
        .catch(error => {
          Message.error(error);
        });
    },
    // 新增部门数据提交
    post_create_department() {
      this.$refs["create_department_form"].validate(valid => {
        if (valid) {
          ajax_post_department({
            companyId: this.modals.department.create.data.companyid,
            name: this.modals.department.create.data.name,
            id: this.modals.department.create.data.id || undefined
          }).then(res => {
            this.modals.department.create.is_show = false;
            this.modals.department.create.loading = false;
            if (res.status == 'success') {
              this.get_department_by_company_id(this.current_company_id);
            // 如果是修改，刷新部门数据
            if (this.modals.department.create.data.id) {
              this.get_department_by_change_company();
            }
            
            this.$Notice.success({
              title: "保存成功!"
            });
            } else {
              this.$Notice.error({
              title: res.message
            });
            }
            
          });
        } else {
          this.modals.department.create.loading = false;
          this.$nextTick(() => {
            this.modals.department.create.loading = true;
          });
        }
      });
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
      this.$refs["create_company_form"].validate(valid => {
        if (valid) {
          ajax_post_company(this.modals.company.create.data).then(res => {
            this.modals.company.create.loading = false;
            if (res.status == 'success'){
              this.get_company_select_box_data();
              this.modals.company.create.is_show = false;
              this.$Notice.success({
                title: "保存成功!"
              });
            } else {
              this.$Notice.error({
                title: res.message
              });
            }
          });
        } else {
          this.modals.company.create.loading = false;
          this.$nextTick(() => {
            this.modals.company.create.loading = true;
          });
        }
      });
    },
    // 切换公司
    change_company(index) {
      this.page_num = 1;
      this.current_company_id = this.company_list_data[index].id;
      this.get_department_by_company_id(this.current_company_id);
    },
    // 切换部门
    change_department(index) {
      this.page_num = 1;
      this.current_department_id = this.department_list_data[index].id;
      this.get_member_by_department_id();
    },
    // 显示编辑公司
    show_update_company_modal(index) {
      this.modals.company.create.title = "修改公司信息";
      this.modals.company.create.is_show = true;
      this.modals.company.create.data.province = parseInt(
        this.company_list_data[index].province
      );
      this.modals.company.create.data.city = parseInt(
        this.company_list_data[index].city
      );
      this.modals.company.create.data.area = parseInt(
        this.company_list_data[index].area
      );
      this.modals.company.create.data.name = this.company_list_data[index].name;
      this.modals.company.create.data.address = this.company_list_data[
        index
      ].address;
      this.modals.company.create.data.enterpriseId = get_enterpri_id();
      this.modals.company.create.data.id = this.company_list_data[index].id;
      this.get_area_data("province");
      this.get_area_data("city", parseInt(this.company_list_data[index].city));
      this.get_area_data(
        "region",
        parseInt(this.company_list_data[index].region)
      );
    },
    // 修改部门弹层，切换公司
    get_department_by_change_company() {
      ajax_get_deparment_by_company_id({
        id: this.modals.department.manager.data.companyid
      })
        .then(res => {
          this.modals.department.manager.department_list_data = res.data;
        })
        .catch(error => {
          Message.error(error);
        });
    },
    // 成员换页
    change_member_page_data(page){
      this.page_num = page;
      this.get_member_by_department_id();
    },
    // 显示管理部门
    show_update_department_modal(index) {
      this.modals.department.create.title = "修改部门信息";
      this.modals.department.create.is_show = true;
      this.modals.department.create.data = JSON.parse(
        JSON.stringify(
          this.modals.department.manager.department_list_data[index]
        )
      );
      this.modals.department.create.data.companyid = this.modals.department.manager.department_list_data[
        index
      ].companyId;
      this.modals.department.create.data.id = this.modals.department.manager.department_list_data[
        index
      ].id;
    },
    // 删除公司
    confirm_del_company(index) {
      const _company_name = JSON.parse(JSON.stringify(this.company_list_data))[
        index
      ].name;
      const _id = JSON.parse(JSON.stringify(this.company_list_data))[index].id;
      this.$Modal.confirm({
        title: "确认删除公司",
        content:
          "<p>您确认删除名称为 <strong>" +
          _company_name +
          "</strong> 的公司吗?</p><p>删除后将无法撤销，请谨慎操作！</p>",
        loading: true,
        onOk: () => {
          ajax_del_company({
            id: _id
          }).then(res => {
            this.$Modal.remove();
            this.$Notice.success({
              title: "删除成功"
            });
            this.get_company_select_box_data();
          });
        }
      });
    },
    // 删除部门
    confirm_del_department(index) {
      const _department_name = JSON.parse(
        JSON.stringify(this.modals.department.manager.department_list_data)
      )[index].name;
      const _id = JSON.parse(
        JSON.stringify(this.modals.department.manager.department_list_data)
      )[index].id;
      this.$Modal.confirm({
        title: "确认删除公司",
        content:
          "<p>您确认删除名称为 <strong>" +
          _department_name +
          "</strong> 的部门吗?</p><p>删除后将无法撤销，请谨慎操作！</p>",
        loading: true,
        onOk: () => {
          ajax_del_department({
            id: _id
          }).then(res => {
            this.$Modal.remove();
            this.$Notice.success({
              title: "删除成功"
            });
            this.get_department_by_company_id(this.current_company_id);
            this.get_department_by_change_company();
          });
        }
      });
    }
  },
  created() {
    this.get_company_select_box_data();
  }
};
</script>

<style lang="less">
.mr-5 {
  margin-right: 5px;
}
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
              strong {
                color: #fff;
              }
            }
          }
          &.cur {
            a {
              background-color: #4e7bfa;
              color: #fff;
              strong {
                color: #fff;
              }
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
.modal_company_list {
  background: #fcfcfc;
  border-top: 1px solid #e9e9e9;
  li {
    padding: 6px;
    border-bottom: 1px solid #e9e9e9;
    &:hover {
      background-color: #ebf7ff;
    }
  }
}
</style>