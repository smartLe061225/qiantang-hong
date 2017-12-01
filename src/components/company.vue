<template>
  <div>
      <Row>
          <Col span="8" v-for="item in data" :key="item.id">
            <div class="member-mod">
                <div class="member-hd">
                    <div class="member-opt">
                    <router-link class="btn" to="/company/organization">
                        <Icon type="edit" color="#A6C6BF"></Icon>
                    </router-link>
                    </div>
                    <div class="member-face">
                        <img :src="item.companyImg || default_company" :alt="item.name">
                        <div class="name">{{item.name}}</div>
                    </div>
                </div>
                <div class="member-bd">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="count" style="color: #FFB042">部门</div>
                                    <div class="role">{{item.departNum}}</div>
                                </td>
                                <td>
                                    <div class="count" style="color: #F7326C">成员</div>
                                    <div class="role">{{item.memberNum}}</div>
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
import {
    default_images
} from '../util/user'
export default {
  name: 'company',
  data(){
      return {
        default_company: default_images().enterprise_logo
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
                margin-top: 12px;
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
