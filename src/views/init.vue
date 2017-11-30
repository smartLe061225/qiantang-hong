<template>
    <div class="m-25">
        <div class="init-body">
            <div class="wrap-950">
                <div class="init-hd clearfix">
                    <h1>企知系统使用引导</h1>
                </div>
                <ul class="init-list clearfix">
                    <li class="item">
                        <div class="i"><i class="s-1"></i></div>
                        <div class="n"><span>1</span></div>
                        <div class="b">下载标准数据模板</div>
                        <div class="s">现在请马上下载数据模板</div>      
                        <div class="btn"><a target="_blank" href="/api/reportrecord/downloadTemplate">下载</a></div>
                    </li>
                    <div class="arrow-box"></div>
                    <li class="item">
                        <div class="i"><i class="s-2"></i></div>
                        <div class="n"><span>2</span></div>
                        <div class="b">填写模板并上传</div>
                        <div class="s">请将填写好的数据模板上传</div>      
                        <div class="btn"><router-link :to="{name: 'list', params: {id: 1}}">上传文件</router-link></div>      
                    </li>
                    <div class="arrow-box"></div>
                    <li class="item">
                        <div class="i"><i class="s-3"></i></div>
                        <div class="n"><span>3</span></div>
                        <div class="b">生成可视化分析</div>
                        <div class="s">系统将自动分析并给出图表</div>      
                        <div class="btn"><a href="javascript:;" @click="reload_page">生成完成</a></div>      
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "init",
  data() {
    return {};
  },
  methods: {
    reload_page() {
      this.$store.dispatch("store_get_baseinfo").then(res => {
        if (res.checkUploadFile) {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/init");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.init-body {
  background: #fff;
  padding: 30px 0 120px;
  .init-hd {
    margin-bottom: 30px;
    h1 {
      font-size: 16px;
      text-align: center;
      color: #000;
    }
  }
}
.init-list {
  width: 750px;
  margin: 0 auto;
  .item {
    width: 220px;
    float: left;
    text-align: center;
    padding: 25px 20px;
    border: 1px solid #ccc;
    .i {
      margin-bottom: 10px;
      i {
        width: 68px;
        height: 68px;
        display: inline-block;
      }
      .s-1 {
        background: url(../assets/images/icon-init-1.png) no-repeat;
      }
      .s-2 {
        background: url(../assets/images/icon-init-2.png) no-repeat;
      }
      .s-3 {
        background: url(../assets/images/icon-init-3.png) no-repeat;
      }
    }
    .n {
      margin-bottom: 10px;
      span {
        display: inline-block;
        width: 26px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        background: #3c5bf0;
        border-radius: 13px;
      }
    }
    .b {
      color: #000;
      font-size: 14px;
    }
    .s {
      color: #666;
      margin-bottom: 30px;
    }
    .btn {
      a {
        display: block;
        height: 34px;
        line-height: 34px;
        color: #fff;
        background: #3c5bf0;
        &:hover {
          background: #e9edfe;
          color: #4565f2;
        }
      }
    }
  }
  .arrow-box {
    height: 275px;
    width: 40px;
    float: left;
    background: url(../assets/images/icon-arrow-right.png) center center
      no-repeat;
  }
}
</style>
