<template>
  <div class="normal-box-mod">
    <div class="normal-box-hd clearfix">
        <div class="normal-box-opt">
            <a href="javascript:;" class="mr-10">标准利润表</a>
            <router-link to="/analysis/list/1">重新导入</router-link>
        </div>
      <div class="normal-box-title">
        <div class="decorate-square"></div>
        <h2>资产分析</h2>
        </div>
    </div>
    <div class="normal-box-bd">
        <div class="chart-filter">
          <Form :label-width="100">
            <FormItem label="选择公司：">
            <CheckboxGroup v-model="filter.company.value" @on-change="reLoadChart">
                <Checkbox :key="item.value" :label="item.value" v-for="item in filter.company.list">{{item.label}}</Checkbox>
            </CheckboxGroup>
            </FormItem>
            <FormItem label="选择指标：">
              <RadioGroup v-model="filter.index.value" @on-change="reLoadChart">
                  <Radio :label="item" v-for="item in filter.index.list" :key="item"></Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="选择时间：">
              <RadioGroup v-model="filter.time.value" type="button" @on-change="reLoadChart">
                  <Radio v-for="item in filter.time.list" :key="item" :label="item"></Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
    </div>
    <div class="normal-box-bd">
      <div class="assets-line">
        <div class="echarts"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import echartsConfig from 'src/util/echarts'
  import * as tools from 'src/util/tools'
  import { ajax_get_company_selectbox } from "src/apis/company";
  import { ajaxPostAssetsIndex,ajaxPostAssetsData } from "src/apis/analysis";

  export default {
    data () {
      return {
        filter: {
          company: {
            value: [],
            list: []
          },
          index: {
            value: '',
            list: []
          },
          time: {
            value: '',
            list: []
          }
        },
        resource: []
      }
    },
    methods: {
      setChart(){
        const self = this;
        this.myChart = echarts.init(document.querySelector('.assets-line .echarts'));
        let convertResource = tools.convertResourceData(self.resource, self.filter.company.value, self.filter.index.value.split(','));
        let seriesData = tools.getLineChartSeriesData(convertResource, self.companyNames)
        let option = echartsConfig.lineChartOption({
          seriesData: seriesData
        })
        if (option && typeof option === "object") {
          this.myChart.setOption(option, true);
        }
        echartsConfig.resize(self.myChart)
        self.myChart.on('click', function (params) {
          console.log(params);
        });
      },
      reLoadChart(){
        this.getResourceData()
      },
      getResourceData(){
        const self = this;
        let data = {
          data:{
            indexNames: self.filter.index.value,
            companyIds: this.filter.company.value.join(','),
            type: self.dateType
          }
        }
        this.$Loading.start();
        ajaxPostAssetsData(data).then(rs => {
          if (rs.status == 'success') {
            self.$Loading.finish();
            self.resource = rs.data[0].data;
            self.setChart()
          }else{
            self.Message.error(rs.message)
            self.$Loading.error();
          }
        })
      },
      getTimeType: function(){        
        return ['年初余额','期末余额']
      }
    },
    computed: {
      dateType: function(){
        switch(this.filter.time.value){
          case '年初余额':
            return 1
            break;
          case '期末余额':
            return 2
            break;
        }
      },
      companyIds: function(){
        return this.filter.company.value.join(',')
      },
      companyNames: function(){
        const self = this;
        return tools.getCompanyName(self.companyIds, self.filter.company.list)
      }
    },
    created: function(){
      const self = this;
      Promise.all([ajax_get_company_selectbox(), ajaxPostAssetsIndex(), self.getTimeType()]).then(rs => {
        let companyData = echartsConfig.getCompanyList(rs[0])
        if (companyData.length) {
          self.filter.company.list = companyData;
          self.filter.company.value = [companyData[0].value];
        }

        let indexData = echartsConfig.getIndexList(rs[1])
        if (indexData.length) {
          self.filter.index.list = indexData;
          self.filter.index.value = indexData[0]
        }

        let timeData = rs[2]
        self.filter.time.list = timeData;
        self.filter.time.value = timeData[1]
      }).then(rs => {
        self.getResourceData()
      })
    }
  }
</script>
<style lang="less">
.assets-line{
  height: 500px;
  .echarts{
    width: 100%;
    height: 100%;
  }
}
  .chart-filter{
    .ivu-form{
      .ivu-form-item{
        margin-bottom: 12px;
      }
      .ivu-form-item-label{
        font-size: 14px;
        color: #c2c2c3;
      }
      .ivu-checkbox-wrapper{
        margin-right: 20px;
        font-size: 14px;
        color: #8d8d8e;
      }
      .ivu-radio-wrapper{
        font-size: 14px;
        color: #8d8d8e;
      }
    }
  }
</style>