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
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
          <Select style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否公司负责人" prop="companyLeaderFlag">
          <RadioGroup v-model="phone">
            <Radio label="1">
              <span>是</span>
            </Radio>
            <Radio label="0">
              <span>否</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="所属部门" prop="departid">
          <Select style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否部门负责人" prop="departLeaderFlag">
          <RadioGroup v-model="phone">
            <Radio label="1">
              <span>是</span>
            </Radio>
            <Radio label="0">
              <span>否</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="状态" prop="path">
          <RadioGroup v-model="phone">
            <Radio label="apple">
              <span>在职</span>
            </Radio>
            <Radio label="android">
              <span>离职</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>

import { ajax_post_member } from '../../apis/member'
import { ajax_get_company_selectbox } from '../../apis/company'

  export default {
    data() {
      return {
        cityList: [
          {
            value: "New York",
            label: "New York"
          },
          {
            value: "London",
            label: "London"
          },
          {
            value: "Sydney",
            label: "Sydney"
          },
          {
            value: "Ottawa",
            label: "Ottawa"
          },
          {
            value: "Paris",
            label: "Paris"
          },
          {
            value: "Canberra",
            label: "Canberra"
          }
        ],
        modals: {
          member: {
            is_show: false,
            rules: {},
            title: "新增成员",
            data: {
              "companyid": 0,
              "departLeaderFlag": 0,
              "companyLeaderFlag":0,
              "departid": 0,
              "email": "",
              "id": 0,
              "name": "",
              "phone": "",
              "status": 0,
            }
          }
        }
      };
    },
    methods: {
      show_create_new_member() {
        this.modals.member.is_show = true;
        ajax_get_company_selectbox()
        .then( (rs) => {
          console.log('ajax_get_company_all', rs)
        }).catch( (error) => {
          console.log('error', error)
        })
      },
      post_member_info() {
        
      },
      post_member() {

      }      
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
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=#99000000,
          endColorstr=#99000000);
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