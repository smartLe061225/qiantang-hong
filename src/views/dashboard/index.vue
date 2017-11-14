<template>
  <div>
    <Row :gutter="28" class="mb-24">
      <Col span="6">
      <general-count :id-name="general_view_opt.total_profits_id" class-name="text-color-orange" :decimals=2 :end-val="general_view_data.total_profits"
        :percent="general_view_data.profits_percent" intro-text="企业总利润"></general-count>
      </Col>
      <Col span="6">
      <general-count :id-name="general_view_opt.total_cash_id" class-name="text-color-red" :decimals=2 :end-val="general_view_data.total_cash"
        :percent="general_view_data.profits_percent" intro-text="企业总现金"></general-count>

      </Col>
      <Col span="6">
      <general-count :id-name="general_view_opt.total_assets_id" class-name="text-color-blue" :decimals=2 :end-val="general_view_data.total_assets"
        :percent="general_view_data.assets_percent" intro-text="企业总资产"></general-count>

      </Col>
      <Col span="6">
      <general-count :id-name="general_view_opt.total_warning_budget_id" class-name="text-color-cyan" :decimals=2 :end-val="general_view_data.total_warning_budget"
        intro-text="企业预算预警"></general-count>
      </Col>
    </Row>
    <Row :gutter="28" class="mb-24">
      <Col span="12">
      <div class="normal-block-mod">
        <div class="mormal-block-hd ivu-row">
          <div class="mbm-opt">
            <a class="ghost-green" href="javascript:;">详情</a>
          </div>
          <h2 class="mbm-title">集团资产变化曲线</h2>
        </div>
        <div class="mormal-block-bd"></div>
      </div>
      </Col>
      <Col span="12">
      <div class="normal-block-mod">
        <div class="mormal-block-hd ivu-row">
          <div class="mbm-opt">
            <a class="ghost-blue" href="javascript:;">详情</a>
          </div>
          <h2 class="mbm-title">集团资产结构占比</h2>
        </div>
        <div class="mormal-block-bd"></div>
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
        <div class="mormal-block-bd"></div>
      </div>
      </Col>
      <Col span="12">
      <div class="normal-block-mod">
        <div class="mormal-block-hd ivu-row">
          <div class="mbm-opt">
            <a class="ghost-blue" href="javascript:;">管理</a>
          </div>
          <h2 class="mbm-title">成员管理</h2>
        </div>
        <div class="mormal-block-bd"></div>
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
        <div class="mormal-block-bd"></div>
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
        <div class="mormal-block-bd"></div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import generalCount from "@/components/general_count";

  export default {
    name: "dashboard",
    components: {
      generalCount
    },
    data() {
      return {
        general_view_data: {
          total_profits: 498112919.3,
          profits_percent: 23,
          total_cash: 98343,
          cash_percent: 21,
          total_assets: 523411,
          assets_percent: 3,
          total_warning_budget: 8879
        },
        general_view_opt: {
          total_profits_id: "total_profits_id",
          total_cash_id: "total_cash_id",
          total_assets_id: "total_assets_id",
          total_warning_budget_id: "total_warning_budget_id"
        }
      };
    }
  };
</script>
<style lang="less">
  .general-view {
    background: #fff;
    padding: 35px 25px 30px 25px;
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