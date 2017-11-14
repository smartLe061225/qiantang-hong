<template>
  <div>
      <Row>
          <Col span="8" v-for="(item, index) in data" :key="item.id">
            <div class="qt-push-mod" :title="item.title">
                <a href="javacript:;">
                <div class="qt-push-img">
                    <img :src="item.img" alt="">
                </div>
                <div class="qt-push-info" :class="bg_list[index]">
                    <div class="qt-push-title text-overflow">
                        {{item.title}}
                    </div>   
                    <div class="qt-push-detail clearfix">
                        <img :src="item.avator_path" alt="" class="fl">
                        <span class="mr-20">{{item.timepass}}</span>
                        <span>浏览量 {{item.pv}}</span>
                    </div>  
                </div>
                </a>
            </div>
          </Col>
      </Row>
  </div>
</template>
<script>
export default {
  name: 'qtPush',
  data(){
      return {
        bg_list: ['bg-purple', 'bg-cyan', 'bg-black']
      }
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
}
</script>
<style lang="less" scoped>
.qt-push-mod {
    width: 100%;
    height: 250px;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    .qt-push-img {
        text-align: center;
        position: relative;
        width: 100%;
        height: 250px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .qt-push-info {
        height: 85px;
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        .qt-push-title {
            margin:15px 10px;
            font-size: 14px;
            color: #fff;
        }
        .qt-push-detail {
            margin: 0 10px;
            font-size: 12px;
            color: #fff;
            img {
                width: 18px;
                height: 18px;
                border-radius: 9px;
            }
        }
        &.bg-purple {
            background: rgba(163,89,204, 0.8);
            filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#ccA359CC, endColorstr=#ccA359CC);
        }
        &.bg-cyan {
            background: rgba(88,189,204, 0.8);
            filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#cc58BDCC, endColorstr=#cc58BDCC);
        }
        &.bg-black {
            background: rgba(18,18,18, 0.8);
            filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#cc121212, endColorstr=#cc121212);
        }
    }
    &:hover {
        opacity: 0.8;
    }
}
</style>
