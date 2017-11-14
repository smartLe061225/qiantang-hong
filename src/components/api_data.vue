<template>
  <div>
      <Row>
          <Col span="8" v-for="(item, index) in data" :key="item.id">
             <div class="api-data-mod" :title="item.title">
                <div class="api-data-img">
                    <img :src="item.img" alt="">
                </div>
                <div class="api-data-info" :class="bg_list[index]">
                    <div class="mark" v-if="item.self_support">钱塘自营</div>
                    <div class="publisher text-overflow" v-if="!item.self_support"><img src="">{{item.publisher}}</div>
                    <div class="api-data-title">
                        {{item.title}}
                    </div>   
                    <div class="api-data-download">
                        下载 {{item.download}}
                    </div>
                    <div class="see-more">
                        <a href="">了解</a>
                    </div>
                </div>
            </div>
          </Col>
      </Row>
  </div>
</template>
<script>
export default {
  name: 'apiData',
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
.api-data-mod {
    width: 100%;
    height: 250px;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    .api-data-img {
        text-align: center;
        position: relative;
        width: 100%;
        height: 250px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .api-data-info {
        height: 250px;
        width: 110px;
        display: block;
        position: absolute;
        top:0;
        bottom: 0;
        right: 0;
        .mark {
            margin-top: 10px;
            margin-bottom: 25px;
            height: 24px;
            line-height: 24px;
            width: 55px;
            color: #fff;
            font-size: 12px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            background: #FF0000;
            text-align: center;
        }
        .publisher {
            margin: 10px 10px 25px 10px;
            height: 24px;
            line-height: 24px;
            color: #fff;
            font-size: 12px;
            text-align: center;
        }
        .api-data-title {
            line-height: 18px;
            height: 54px;
            margin-bottom: 20px;
            overflow: hidden;
            text-align: center;
            color: #fff;
        }
        .api-data-download {
            height: 40px;
            text-align: center;
            font-size: 12px;
            color: #ccc;
        }
        .see-more {
            a {
                display: block;
                margin: 0 auto;
                width: 80px;
                height: 30px;
                text-align: center;
                color: #fff;
                border-radius: 15px;
                background-color: #29ACEF;
                line-height: 30px;
                &:hover {
                    background-color: #166E88;
                }
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
