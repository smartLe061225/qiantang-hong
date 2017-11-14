<template>
  <div>
      <Row>
          <Col span="8" v-for="item in data" :key="item.id">
            <div class="member-mod">
                <div class="member-hd">
                    <div class="member-opt">
                    <a href="javascript:;" class="btn">
                        <Icon type="edit" color="#A6C6BF"></Icon>
                    </a>
                    </div>
                    <div class="member-face">
                        <img :src="item.avator_path" :alt="item.name">
                        <div class="name">{{item.name}}</div>
                        <div class="department">{{item.department}} {{item.duty}}</div>
                    </div>
                </div>
                <div class="member-bd">
                    <table>
                        <tbody>
                            <tr>
                                <td v-for="(sub, index) in item.children" :key="sub.name">
                                    <div class="count" :style="{color: text_colors[index]}">{{sub.count}}</div>
                                    <div class="role">{{sub.name}}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </Col>
      </Row>
  </div>
</template>
<script>
export default {
  name: 'member',
  data(){
      return {
          text_colors: ['#FFB042', '#F7326C', '#4390F8', '#42B867', '#1CC7FF', '#EB4BEF']
      }
  },
  props: {
      data: {
          type: Array,
          default: () => {
              return []
          }
      }
  }
}
</script>
<style lang="less" scoped>
.member-mod {
    border: 1px solid #E7ECF1;
    .member-hd {
        border-bottom: 1px solid #E7ECF1;
        padding-bottom: 15px;
        .member-opt {
            position: relative;
            .btn {
                width: 20px;
                height: 20px;
                position: absolute;
                right: 10px;
                top:10px;
                background-color: #D0F7EF;
                display: none;
                text-align: center;
                line-height: 20px;
                &:hover {
                    opacity: 0.9;
                }
            }
        }
        .member-face {
            text-align: center;
            padding-top: 35px;
            img {
                width: 90px;
                height: 90px;
                border: 3px solid #EEF1F5;
                border-radius: 45px;
            }
            .name {
                margin-top: 30px;
                font-size: 16px;
                color: #000;
                margin-bottom: 15px;
            }
            .department {
                font-size: 12px;
                color: #999;
            }
        }
    }
    .member-bd {
        padding: 10px;
        table {
            width: 100%;
            td {
                text-align: center;
                .count {
                    font-size: 16px;
                }
                .role {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }
    &:hover {
        .member-opt {
            .btn {
                display: block;
            }
        }
    }
}
</style>
