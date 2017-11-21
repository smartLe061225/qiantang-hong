<template>
  <div>
      <div class="normal-box-mod">
          <div class="normal-box-hd clearfix">
              <div class="normal-box-opt">
                  <a href="javascript:;" class="mr-10">标准利润表</a>
                  <a href="javascript:;" class="mr-10">重新导入</a>
                  <a href="javascript:;">导出</a>
              </div>
            <div class="normal-box-title">
              <div class="decorate-square"></div>
              <h2>利润分析</h2>
              </div>
          </div>
          <div class="normal-box-bd">
              <div class="chart-filter">
                <Select v-model="model10" multiple style="width:260px" placeholder="请选择公司">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="modelIndex" multiple style="width:260px" placeholder="请选择指标">
                  <Option v-for="item in indexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
  import { ajax_get_company_selectbox } from "src/apis/company";
  import { ajaxPostAnalysisPublicdata } from "src/apis/analysis";


  export default {
    data () {
      return {
        cityList: [],
        model10: [],
        indexList: [],
        modelIndex: []
      }
    },
    methods: {
      init(){
        this.get_company_select_box_data();
        this.getProfitsIndex()
      },
      get_company_select_box_data() {
        const self = this;
        ajax_get_company_selectbox().then(rs => {
          const data = rs.data;
          data.forEach(function(v) {
            self.cityList.push({'value':v.id,'label':v.name})
          })
        })
      },
      getProfitsIndex(){
        const self = this;
        let data = {
          "data":{
               "dataType":1
           }
        }
        ajaxPostAnalysisPublicdata(data).then(rs => {
          const result = rs.data.data;
          console.log(result)
          result.forEach(function(v){
            self.indexList.push({'value':v.id,'label':v.dataIndexName})
          })
        })
      }
    },
    created() {
      this.init()
    }
  }
</script>

