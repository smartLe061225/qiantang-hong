<template>
  <div class="m-25">
    <Row :gutter="28" class="mb-24">
      <Col span="6">
      <general-count :id-name="general_view_opt.total_profits_id" icon-class-name="bg-i-1" class-name="text-color-orange" :decimals=2 :end-val="general_view_data.total_profits"
         intro-text="企业总利润"></general-count>
      </Col>
      <Col span="6">
      <general-count :id-name="general_view_opt.total_cash_id" icon-class-name="bg-i-2" class-name="text-color-red" :decimals=2 :end-val="general_view_data.total_cash"
         intro-text="企业总现金"></general-count>

      </Col>
      <Col span="6">
      <general-count :id-name="general_view_opt.total_assets_id" icon-class-name="bg-i-3" class-name="text-color-blue" :decimals=2 :end-val="general_view_data.total_assets"
         intro-text="企业总资产"></general-count>

      </Col>
      <Col span="6">
      <general-count :id-name="general_view_opt.total_warning_budget_id" icon-class-name="bg-i-4" class-name="text-color-cyan" :decimals=2 :end-val="general_view_data.total_warning_budget"
        intro-text="企业预算预警"></general-count>
      </Col>
    </Row>
    <Row :gutter="28" class="mb-24">
      <Col>
      <div class="normal-block-mod">
        <div class="mormal-block-hd ivu-row">
          <div class="mbm-opt">
            <a class="ghost-green" href="javascript:;">详情</a>
          </div>
          <h2 class="mbm-title">多个公司收支变化趋势</h2>
        </div>
        <div class="mormal-block-bd"><bar></bar></div>
      </div>
      </Col>      
    </Row>
    <Row :gutter="28" class="mb-24">
      <Col span="12">
      <div class="normal-block-mod">
        <div class="mormal-block-hd ivu-row">
          <div class="mbm-opt">
            <a class="ghost-green" href="javascript:;">更多</a>
          </div>
          <h2 class="mbm-title">报表上传记录</h2>
        </div>
        <div class="mormal-block-bd">
          <upload-log :upload-log-data="upload_log_data"></upload-log>
        </div>
      </div>
      </Col>
      <Col span="12">
      <div class="normal-block-mod">
        <div class="mormal-block-hd ivu-row">
          <div class="mbm-opt">
            <router-link class="ghost-blue" to="/company/organization">管理</router-link>
          </div>
          <h2 class="mbm-title">组织架构</h2>
        </div>
        <div class="mormal-block-bd">
          <company :data="organizational_data"></company>
        </div>
      </div>
      </Col>
    </Row>
    <Row :gutter="28" class="mb-24">
      <Col span="12">
      <div class="normal-block-mod">
        <div class="mormal-block-hd ivu-row">
          <div class="mbm-opt">
            <a class="ghost-green mr-10" href="javascript:;">定制</a>
            <a class="ghost-green" href="javascript:;">更多</a>
          </div>
          <h2 class="mbm-title">钱塘推送</h2>
        </div>
        <div class="mormal-block-bd">
          <qt-push :data="qt_push_data"></qt-push>
        </div>
      </div>
      </Col>
      <Col span="12">
      <div class="normal-block-mod">
        <div class="mormal-block-hd ivu-row">
          <div class="mbm-opt">
            <a class="ghost-blue" href="javascript:;">更多</a>
          </div>
          <h2 class="mbm-title">数据服务</h2>
        </div>
        <div class="mormal-block-bd">
          <api-data :data="api_data_data"></api-data>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import generalCount from "@/components/general_count";
  import uploadLog from "@/components/upload_log";
  import qtPush from "@/components/qt_push";
  import apiData from "@/components/api_data";
  import company from "components/company";
  import Bar from "components/echarts/dashboard-bar";
  import { ajaxGetOrganizationalData,ajaxGetIndexCardData } from "src/apis/company"

  export default {
    name: "dashboard",
    components: {
      generalCount,
      uploadLog,
      qtPush,
      apiData,
      company,
      Bar
    },
    data() {
      return {
        general_view_data: {
          total_profits: 0,
          total_cash: 0,
          total_assets: 0,
          total_warning_budget: 0
        },
        general_view_opt: {
          total_profits_id: "total_profits_id",
          total_cash_id: "total_cash_id",
          total_assets_id: "total_assets_id",
          total_warning_budget_id: "total_warning_budget_id"
        },
        // 上传历史
        upload_log_data: [{
          file_name: "Q3季度2017年Q3季度财报.xls",
          upload_time: "2017/11/20 15:30",
          user_name: "福根儿",
          company_name: "华茂建设分公司",
          department: "财务部",
          avator_path: "https://img3.doubanio.com/icon/u120719501-15.jpg",
          id: 1201
        }, {
            file_name: "17年Q3季度财20报.xls",
            upload_time: "2017/11/20 15:30",
            user_name: "大黄牛",
            company_name: "华茂建设分公司",
            department: "财务部",
            avator_path: "https://img1.doubanio.com/icon/u3825598-137.jpg",
            id: 1202
          }, {
            file_name: "2017年Q3季度017年Q3季度财报.xls",
            upload_time: "2017/11/20 15:30",
            user_name: "胡弃暗",
            company_name: "华茂建设分公司",
            department: "财务部",
            avator_path: "https://img1.doubanio.com/icon/u2629298-7.jpg",
            id: 1203
          }],
          // 钱塘推送
          qt_push_data:[{
            title: "2017年Q3季度017年Q3季度财2017年Q3季度017年Q3季度财",
            img: "http://p3.pstatp.com/large/39a200023931d8829cf9",
            pv: "900",
            timepass: "18小时",
            avator_path: "https://img1.doubanio.com/icon/u2629298-7.jpg",
            id: 1203
          }, {
              title: "2017年Q3季度017年Q3季度财2017年Q3季度017年Q3季度财",
              img: "http://p3.pstatp.com/large/39a1000252adba97b994",
              pv: "900",
              timepass: "18小时",
              avator_path: "http://p3.pstatp.com/large/39a00003f2267df41266",
              id: 1203
            }, {
              title: "2017年Q3季度017年Q3季度财2017年Q3季度017年Q3季度财",
              img: "http://p9.pstatp.com/large/37f30003fa72f6d28b77",
              pv: "900",
              timepass: "18小时",
              avator_path: "https://img1.doubanio.com/icon/u2629298-7.jpg",
              id: 1203
            }],
          // 数据服务
        api_data_data: [{
          title: "2017年Q3季度017年Q3季度财2017年Q3季度017年Q3季度财",
          img: "http://p3.pstatp.com/large/39a200023931d8829cf9",
          download: "362",
          self_support: false,
          publisher: "末唐数据末唐数据",
          avator_path: "https://img1.doubanio.com/icon/u2629298-7.jpg",
          id: 1203
        }, {
            title: "2017年Q3季度017年Q3季度财2017年Q3季度017年Q3季度财",
            img: "http://p3.pstatp.com/large/39a200023931d8829cf9",
            download: "362",
            self_support: true,
            publisher: "钱塘",
            avator_path: "https://img1.doubanio.com/icon/u2629298-7.jpg",
            id: 1231
          }, {
            title: "2017年Q3季度017年Q3季度财2017年Q3季度017年Q3季度财",
            img: "http://p9.pstatp.com/large/37f30003fa72f6d28b77",
            download: "362",
            self_support: false,
            publisher: "末唐数据末唐数据末唐数据末唐数据末唐数据末唐数据",
            avator_path: "https://img1.doubanio.com/icon/u2629298-7.jpg",
            id: 1253
          }],
          // 成员管理
          organizational_data: []
      };
    },
    methods: {
      getIndexCardData(){
        const self = this;
        ajaxGetIndexCardData().then(rs => {
          if (rs.status == 'success') {
            let data = rs.data;
            self.general_view_data.total_profits = data.total1
            self.general_view_data.total_cash = data.total2
            self.general_view_data.total_assets = data.total3
            self.general_view_data.total_warning_budget = data.total4
          }else{
            self.$Message.error(rs.message)
          }
        })

      },
      getOrganizationalData(){
        const self = this;
        ajaxGetOrganizationalData().then(rs => {
          if (rs.status == 'success') {
            self.organizational_data = rs.data
          }else{
            self.$Message.error(rs.message)
          }
        })
      }
    },
    created: function(){
      this.getOrganizationalData()
      this.getIndexCardData()
    }
  };
</script>
<style lang="less">
  .text-overflow{overflow:hidden;text-overflow:ellipsis;display:block;white-space:nowrap}
  .general-view {
    background: #fff;
    padding: 35px 25px 30px 25px;
    position: relative;
    &-count {
      strong {
        font-size: 32px;
        font-weight: normal;
      }
      .unit {
        font-size: 18px;
        margin-right: 10px;
        margin-left: 3px;
      }
      .percent {
        font-size: 12px;
      }
    }
    &-name {
      font-size: 14px;
      color: #999;
    }
    .x-bg {
      position: absolute;
      display: block;
      width: 80px;
      height: 80px;
      top: 0;
      right: 0;
    }
  }
  .bg-i-1 {
    background: url(../../assets/images/icon-d-1.png) no-repeat;
  }
  .bg-i-2 {
    background: url(../../assets/images/icon-d-2.png) no-repeat;
  }
  .bg-i-3 {
    background: url(../../assets/images/icon-d-3.png) no-repeat;
  }
  .bg-i-4 {
    background: url(../../assets/images/icon-d-4.png) no-repeat;
  }
  .mb-24 {
    margin-bottom: 24px;
  }

  .mr-10 {
    margin-right: 10px;
  }

  .normal-block-mod {
    background: #fff;
    .mormal-block-hd {
      height: 48px;
      line-height: 48px;
      padding: 0 20px;
      border-bottom: 1px solid #ebeff4;
      .mbm-title {
        font-size: 14px;
        font-weight: normal;
        color: #000;
        float: left;
      }
      .mbm-opt {
        float: right;
      }
    }
    .mormal-block-bd {
      padding: 25px;
    }
  }

  .ghost-green {
    display: inline-block;
    color: #34984f;
    height: 22px;
    line-height: 22px;
    padding: 0 14px;
    border: 1px solid #34984f;
    border-radius: 11px;
    &:hover {
      background: #34984f;
      color: #fff;
    }
  }

  .ghost-blue {
    display: inline-block;
    color: #3183ff;
    height: 22px;
    line-height: 22px;
    padding: 0 14px;
    border: 1px solid #3183ff;
    border-radius: 11px;
    &:hover {
      background: #3183ff;
      color: #fff;
    }
  }

  .text-color-orange {
    color: #efbc11;
  }

  .text-color-green {
    color: #3a9748;
  }

  .text-color-red {
    color: #eb5f6a;
  }

  .text-color-blue {
    color: #5a91dc;
  }

  .text-color-cyan {
    color: #2fbfcd;
  }
</style>