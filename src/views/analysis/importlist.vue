<template>
  <div class="normal-box-mod">
      <div class="normal-box-hd clearfix">
        <div class="normal-box-title">
          <div class="decorate-square"></div>
          <h2>导入记录</h2>
        </div>
      </div>
      <div class="normal-box-bd" style="font-size: 16px;">
        <Select v-model="company.id" class="radius-select" style="width:150px" placeholder="请选择公司" @on-change="searchRecord">
          <Option v-for="item in company.list" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="type.id" class="radius-select" style="width:120px" placeholder="请选择类型" @on-change="searchRecord">
          <Option v-for="item in type.list" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button class="radius-button">导入</Button>
      </div>
      <div class="normal-box-bd">
          <div class="chart-filter">
            <Table border :loading="loading" :columns="columns" :data="results"></Table>
            <div class="page-bar">
              <Page :total="totalRecord" :page-size="pageSize" @on-change="pager"></Page>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  import echartsConfig from 'src/util/echarts'  
  import { ajaxPostAnalysisReportRecord,ajaxPostAnalysisDelete } from "src/apis/analysis";

  export default {
    data () {
      return {
        totalRecord: null,
        pageSize: 10,
        pageNum: 1,
        loading: true,
        downloadHost: 'http://192.168.31.8:8762',
        company: {
          id: 1,
          list: []
        },
        type: {
          id: null,
          list: [{value: 1, label: '利润分析'},{value: 2, label: '资产分析'}, {value: 3, label: '现金分析'}]
        },
        columns: [
            {
                title: '导入时间',
                key: 'reporttime'
            },
            {
                title: '对应月份',
                key: 'month'
            },
            {
                title: '导入文件',
                key: 'filename'
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (h, params) => {
                  return h('div', {class: 'action-group'}, [
                    h('a', {
                      class: 'items download',
                      attrs: { download:'' , href: this.download(params.row.id, params.row.reporttime) }
                    }, [
                      h('Icon', { props: { type: 'arrow-down-a' } }),
                      h('span', '下载')
                    ]),

                    h('button', {
                      class: 'items import',
                      on: { 
                        click: () => { this.import(params.index) } 
                      }
                    }, [
                      h('Icon', { props: { type: 'ios-loop-strong' } }),
                      h('span', '重新导入')
                    ]),

                    h('button', {
                      class: 'items trash',
                      on: { 
                        click: () => { this.delete(params.row.id , params.index) } 
                      }
                    }, [
                      h('Icon', { props: { type: 'trash-a' } }),
                      h('span', '删除' )
                    ]),
                  ]);
                }
            }
        ],
        results: []
      }
    },
    methods:{
      download(id,time){       
        return this.downloadHost + '/api/' + this.actionType + '/downExcel?recordid=' + id + '&reportTime=' + time;
      },
      import(index){
        console.log(index)
      },
      delete(id,index){
        const self = this;
        this.$Modal.confirm({
            title: '操作提示',
            content: '<p style="font-size: 14px;">确定要删除吗？</p>',
            loading: true,
            onOk: () => {
              let data = {
                data: {
                  recordid: id
                }
              }
              ajaxPostAnalysisDelete(self.actionType, data).then(rs => {
                self.$Modal.remove();
                if (rs.status == 'success') {
                  self.$Message.success('操作成功！')
                  self.results.splice(index, 1);
                }else{
                  self.$Message.error(rs.message)
                }
              })
            }
        });        
      },
      searchRecord(){
        const self = this;
        this.getRecordData(self.type.id);
      },
      pager(page) {
        const self = this;
        this.pageNum = page;
        this.getRecordData(self.type.id);
      },
      getRecordData(type) {
        const self = this;
        let data = {
          pageNum: self.pageNum,
          pageSize: self.pageSize,
          data:{
            type: type,
            companyid: self.company.id
          }
        }
        ajaxPostAnalysisReportRecord(data).then(rs => {
          self.loading = false;
          let data = rs.data;
          self.totalRecord = data.totalNum
          let result = data.data;
          let resultData = [];
          if (result.length>0) {
            for (var i = 0; i < result.length; i++) {
              resultData.push({'reporttime': result[i].reportTime, 'month': result[i].createTime, 'filename': result[i].fileName, 'id': result[i].id})
            }
          }
          self.results = resultData;
        })
      }
    },
    created(){
      this.company.list = echartsConfig.getCompanyData()
      this.type.id = Number(this.$route.params.id);
    },
    watch:{
      $route(to){
        var reg=/list\/\d+/;
        if(reg.test(to.path)){
          let typeId = this.type.id = Number(this.$route.params.id) || 1;
          this.getRecordData(typeId);
        }
      }
    },
    computed:{
      actionType: function(){
        switch(this.type.id){
          case 1:
            return 'reportprofit'
            break;
          case 2:
            return 'reportassets'
            break;
          case 3:
            return 'reportcashflow'
            break;
        }
      }
    },
    mounted(){
      let typeId = this.type.id = Number(this.$route.params.id);
      this.getRecordData(typeId);      
    }
  }
</script>
<style lang="less">
  .page-bar{
    margin-top: 22px;
  }
  .radius-select{
    .ivu-select-selection{
      border-radius: 20px;
      padding-left: 6px;
    }
  }
  .action-group{
    font-size: 14px;
    white-space: nowrap;
    .items{
      background: transparent;
      cursor: pointer;
      color: #999;
      margin: 0 8px; 
      i{
        margin-right: 5px;
      }
      &.download:hover{
        color: #0081de;
      }
      &.import:hover{
        color: #3c5cf0;
      }
      &.trash:hover{
        color: #de0000;
      }
    }
  }
</style>