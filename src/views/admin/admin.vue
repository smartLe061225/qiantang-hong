<template>
	<div class="main">
		<div class="sidebar-menu-con">
			<sidebar-menu></sidebar-menu>
		</div>
		<div class="main-header-con">
			<div class="main-header">
				<div class="current-company">
					<a class="logo" href="javascript:;" @click="go_to_home"><img src="../../assets/images/logo-admin.png" alt=""></a>
					<h1>{{enterprise_name}}</h1><span v-if="enterprise_type==2">集团总部</span>
					</div>
				<div class="header-avator-con">
					<!-- <div @click="showMessage" class="message-con">
			                        <Tooltip :content="messageCount > 0 ? '有' + messageCount + '条未读消息' : '无未读消息'" placement="bottom">
			                            <Badge :count="messageCount" dot>
			                                <Icon type="ios-bell" :size="22"></Icon>
			                            </Badge>
			                        </Tooltip>
			                    </div> -->
					<div class="user-dropdown-menu-con">
						<Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
							<Dropdown trigger="click" @on-click="handleClickUserDropdown">
								<a href="javascript:;" class="login-username">
									<span class="main-user-name">{{user.name}}</span>
									<Icon type="arrow-down-b"></Icon>
								</a>
								<DropdownMenu slot="list">
									<DropdownItem name="setting">个人中心</DropdownItem>
									<DropdownItem name="logout" divided>退出登录</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
						</Row>
					</div>
				</div>
			</div>
		</div>
		<div class="single-page-con">
			<div class="single-page">
				<router-view></router-view>
				<div class="hong-copyright">浙ICP备09083569号-4 Copyright 2016 Hangzhou Qiantang Big Data Trading Center Co., Ltd. Allrights Reserved.</div>
			</div>
		</div>
	</div>
</template>
<script>
import sidebarMenu from "@/components/sidebar_menu";
import store from "@/store/";
import {
  default_avator,
  default_images,
} from '../../util/user'

export default {
  components: {
    sidebarMenu
  },
  data() {
    return {
      // avatorPath: store.getters.user_img || default_avator()[0],
      // enterprise_type: store.getters.enterprise_type,
      // enterprise_name: store.getters.enterprise_name,
      // user: store.getters.user
    };
  },
  computed: {
    enterprise_type: function () {
      return store.getters.enterprise_type
    },
    enterprise_name: function () {
      return store.getters.enterprise_name
    },
    avatorPath: function () {
      return store.getters.user_img || default_avator()[0]
    },
    user: function () {
      return store.getters.user
    }
  },
  methods: {
    handleClickUserDropdown(name) {
      if (name === "setting") {
        this.$router.push({
          path: "/setting/info"
        });
      } else if (name === "logout") {
        this.$store.dispatch("store_logout");
        this.$router.push({
          path: "/login"
        });
      }
    },
    // 点击去首页
    go_to_home(){
      this.$router.push('/dashboard')
    }
  },
  watch: {
    $route(to) {
      // store.commit("SET_CURRENT_PATH", to.matched);
    }
  },
  created() {
    document.body.setAttribute("class", "");
  }
};
</script>
<style lang="less">
.fl {
  float: left;
}
.fr {
  float: right;
}
.fz-14 {
  font-size: 14px;
}
.p-25 {
  padding: 25px;
}
.m-25 {
  margin: 25px;
}
.mb-20 {
  margin-bottom: 20px;
}
.mr-10 {
  margin-right: 10px;
}
.mr-20 {
  margin-right: 20px;
}
.mt-65 {
  margin-top: 65px;
}
.color-dark {
  color: #000;
}
.fz-18 {
  font-size: 18px;
}
.no-footer-modal {
  .ivu-modal-footer {
    padding: 0;
    border-top: none;
  }
}
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ebeff4;
  .sidebar-menu-con {
    height: 100%;
    position: fixed;
    top: 64px;
    left: 0;
    z-index: 21;
    transition: width 0.3s;
    background: #495060;
    width: 180px;
  }
  .layout-text {
    display: inline-block;
    white-space: nowrap;
    position: absolute;
  }
  .main-hide-text .layout-text {
    display: none;
  }
  &-content-container {
    position: relative;
  }

  &-breadcrumb {
    padding: 8px 15px 0;
  }
  &-menu-left {
    background: #464c5b;
    height: 100%;
  }

  &-header-con {
    height: 64px;
    background: #3c5cf0;
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
    position: fixed;
    width: 100%;
    z-index: 11;
    background: -webkit-gradient(
      linear,
      0% 0%,
      100% 100%,
      from(#3c53f0),
      to(#3c8af0)
    );
    .navicon-con {
      margin: 6px;
      display: inline-block;
    }
    .current-company {
      float: left;
      height: 29px;
      line-height: 64px;
      border-left: 1px solid #3c53f0;
      padding-left: 20px;
      .logo {
        float: left;
        padding-top: 13px;
      }
      h1 {
        margin-left: 20px;
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        float: left;
        margin-right: 10px;
      }
      span {
        display: inline-block;
        height: 16px;
        font-size: 12px;
        line-height: 16px;
        border: 1px solid #6579f4;
        color: #8698fc;
        margin-left: 3px;
        position: relative;
        top: 2px;
      }
    }
    .header-avator-con {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 120px;
      .message-con {
        display: inline-block;
        width: 30px;
        padding: 18px 0;
        text-align: center;
        cursor: pointer;
        i {
          vertical-align: middle;
        }
      }
      .user-dropdown {
        &-menu-con {
          position: absolute;
          right: 0;
          top: 0;
          width: 150px;
          height: 100%;
          .main-user-name {
            display: inline-block;
            width: 80px;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: right;
          }
          .login-username {
            color: #fff;
          }
        }
        &-innercon {
          height: 100%;
          padding-right: 14px;
        }
      }
    }
  }
  .single-page-con {
    position: absolute;
    top: 64px;
    left: 180px;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: #ebeff4;
    z-index: 1;
    transition: left 0.3s;
    min-width: 1020px;
    .single-page {
      // margin: 24px;
    }
  }
  &-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
}
.hong-copyright {
  text-align: center;
  height: 44px;
  line-height: 44px;
  text-indent: 15px;
  background: #f1f3f7;
  color: #aaa;
  font-size: 12px;
  margin: 0 25px 25px;
}
.bread-crumb-bar {
  position: fixed;
  top: 64px;
  left: 181px;
  right: 0;
  z-index: 90;
  height: 46px;
  line-height: 46px;
  background: rgba(255, 255, 255, 0.9);
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr=#e5ffffff,
      endColorstr=#e5ffffff
    );
  padding-left: 25px;
}

.normal-box-mod {
  margin-bottom: 20px;
  .normal-box-hd {
    height: 46px;
    line-height: 46px;
    padding: 0 20px;
    background: #f6f7fa;
    border-bottom: 1px solid #ebeef3;
    .normal-box-opt {
      float: right;
      text-align: right;
      font-size: 12px;
    }
    .normal-box-title {
      .decorate-square {
        width: 3px;
        height: 18px;
        background-color: #a609f0;
        float: left;
        margin-top: 14px;
      }
      h2 {
        font-size: 18px;
        float: left;
        margin-left: 10px;
      }
    }
  }
  .normal-box-bd {
    padding: 20px;
    background: #fff;
  }
}
.clearfix:after {
  clear: both;
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
}
.member-department-bar {
  padding: 20px 0;
}
.c-avator-list {
  .avt-item {
    float: left;
    width: 64px;
    height: 64px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    .avt {
      width: 64px;
      height: 64px;
      border-radius: 32px;
      border: 3px solid #fff; 
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }
    &.cur {
      .avt {
        border-color: #2d8cf0;
      }
    }
  }
}
.department-list {
  a {
    margin-right: 10px;
    color: #666;
    &.cur {
      color: #2d8cf0;
    }
  }
}
.search-input-box {
  .ivu-icon-search {
    cursor: pointer;
  }
}
.btn-change-avator {
  margin-left: 15px;
  position: relative;
  top: -10px;
}
.form-face-img {
  width: 32px;
  height: 32px;
  border-radius: 16px;
}
.upload-avator-btn {
  height: 64px;
  width: 64px;
  border-radius: 32px; 
  border: 1px dashed #ccc;
  text-align: center;
  line-height: 64px;
  cursor: pointer;
  &:hover {
    border-color: #2d8cf0;
    background: #f5f5f5;
  }
}
.member-list {
  margin-left: -3%;
  .member-list-item {
    float: left;
    width: 30%;
    margin-left: 3%;
    margin-bottom: 20px;
    .member-mod {
      position: relative;
      border: 1px solid #ececec;
      padding: 18px;
      height: 140px;
      .member-item {
        .member-item-hd {
          float: right;
          padding-top: 25px;
          .face-box {
            width: 64px;
            height: 64px;
            border-radius: 32px;
            position: relative;
            overflow: hidden;
            img {
              max-width: 64px;
              max-height: 64px;
            }
            .account-suspend {
              position: absolute;
              width: 64px;
              height: 64px;
              left: 0;
              top: 0;
              z-index: 1;
              line-height: 64px;
              text-align: center;
              color: #fff;
              background: rgba(0, 0, 0, 0.6);
              filter: progid:DXImageTransform.Microsoft.gradient(
                  startColorstr=#99000000,
                  endColorstr=#99000000
                );
            }
          }
        }
        .member-item-bd {
          float: left;
          h3 {
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            a {
              color: #000;
            }
          }
          .sub-content {
            color: #999;
            height: 28px;
            line-height: 28px;
            .ivu-icon {
              position: relative;
              top: 3px;
              width: 20px;
              text-align: center;
            }
          }
        }
      }
      .opt-layer {
        position: absolute;
        display: none;
        width: 100px;
        text-align: center;
        height: 28px;
        line-height: 28px;
        color: #fff;
        background: rgba(0, 0, 0, 0.7);
        filter: progid:DXImageTransform.Microsoft.gradient(
            startColorstr=#b2000000,
            endColorstr=#b2000000
          );
        left: 50%;
        margin-left: -50px;
        font-size: 14px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        bottom: 10px;
        a {
          color: #fff;
          &:hover {
            color: #57a3f3;
          }
        }
      }
      .is-department-leader {
        display: block;
        height: 20px;
        width: 80px;
        text-align: center;
        color: #fff;
        background-color: #26a247;
        font-size: 12px;
        line-height: 20px;
        position: absolute;
        right: 0;
        top: 0;
      }
      .is-company-leader {
        display: block;
        height: 20px;
        width: 80px;
        text-align: center;
        color: #fff;
        background-color: #f5bb3a;
        font-size: 12px;
        line-height: 20px;
        position: absolute;
        left: 0;
        top: 0;
      }
      &:hover {
        border-color: #c7d0f7;
        .opt-layer {
          display: block;
        }
      }
    }
  }
}
</style>