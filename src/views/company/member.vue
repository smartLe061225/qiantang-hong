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
        <div class="company-tabs">
          <a href="javascript:;" :class="{'cur': company.id == current_company_id}"
           @click="change_company(index)"
            v-for="(company, index) in company_list_data"
             :key="company.id">{{company.name}}</a>
        </div>
        <sub-department :c_id="current_company_id" :c_name="current_company_name"></sub-department>
      </div>
    </div>
    
  </div>
</template>
<script>
  import { Message } from "iview";
  import { ajax_get_company_selectbox } from "../../apis/company";
  import subDepartment from '../../components/member_manager/sub_department'
  import store from '../../store'

  export default {
    components: {
      subDepartment
    },
    data() {
      return {
        company_list_data: [], // 公司
        current_company_id: null,
        current_company_name: ''
      };
    },
    methods: {
      // 公司列表
      get_company_select_box_data() {
        const _this = this;
        this.$store.dispatch('store_get_companies').then( rs => {
            const data = rs;
            _this.company_list_data = data;
            _this.current_company_id = data[0].id;
            _this.current_company_name = data[0].name;
        }).catch(error => {
            Message.error(error);
          });
      },
      // change_company
      change_company(index){
        this.current_company_id = this.company_list_data[index].id;
        this.current_company_name = this.company_list_data[index].name;
      }
    },
    created() {
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

  

  .label-color-green {
    display: inline-block;
    background: #23983e;
    color: #fff;
    padding: 0 5px;
    font-size: 14px;
  }
  .company-tabs {
    padding-bottom: 15px;
    border-bottom: 1px solid #f2f2f2;
    a {
      display: inline-block;
      margin-right: 15px;
      color: #333;
      background: #fff;
      padding: 0 10px;
      height: 28px;
      line-height: 28px;
      left: 28px;
      &.cur,&:hover {
        background: #3C56F0;
        color: #fff;
      }
    }
  }
</style>