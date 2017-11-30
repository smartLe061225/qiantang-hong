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
</style>