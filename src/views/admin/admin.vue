<template>
	<div class="main">
		<div class="sidebar-menu-con">
			<sidebar-menu></sidebar-menu>
		</div>
		<div class="main-header-con">
			<div class="main-header">
				<div class="current-company">
					<a class="logo"><img src="../../assets/images/logo-admin.png" alt=""></a>
					<h1>浙江华茂贸易集团有限公司</h1><span>集团总部</span>
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
									<span class="main-user-name">MADe</span>
									<Icon type="arrow-down-b"></Icon>
								</a>
								<DropdownMenu slot="list">
									<DropdownItem name="ownSpace">个人中心</DropdownItem>
									<DropdownItem name="loginout" divided>退出登录</DropdownItem>
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


	export default {
		components: {
			sidebarMenu
		},
		data(){
			return {
				avatorPath: 'https://p1.pstatp.com/thumb/249800157ac04c1b79ab'
			}
		},
		methods: {
			 handleClickUserDropdown(name) {
				if (name === "ownSpace") {
					
				} else if (name === "loginout") {
					this.$store.dispatch("Logout");
					this.$router.push({
						path: "/login"
					});
				}
			},
		},
		watch: {
			$route(to) {
				store.commit('set_current_path', to.matched);
			}
		},
	}
</script>
<style lang="less">
.fl {
	float: left;
}
.fr {
	float: right;
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
			background: -webkit-gradient(linear,0% 0%, 100% 100%, from(#3C53F0), to(#3C8AF0));
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
				}
				span {
					display: inline-block;
					height: 16px;
					line-height: 16px;
					border: 1px solid #6579f4;
					color: #8698fc;
					margin-left: 3px;
					position: relative;
					top:2px;
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
		height: 44px;
		line-height: 44px;
		text-indent: 15px;
		background: #f1f3f7;
		color: #aaa;
		font-size: 12px;
		margin:0 25px;
	}
	.bread-crumb-bar {
		height: 46px;
		line-height: 46px;
		background: #fff;
		padding-left: 25px;
	}
	.m-25 {margin: 25px;}
	.mr-10 {margin-right: 10px;}

	.normal-box-mod {
    margin-bottom: 20px;
    .normal-box-hd {
        height: 46px;
        line-height: 46px;
        padding: 0 20px;
        background: #F6F7FA;
        border-bottom: 1px solid #EBEEF3;
        .normal-box-opt {
            float: right;
            text-align: right;
            font-size: 12px;
        }
        .normal-box-title {
            .decorate-square {
                width: 3px;
                height: 18px;
                background-color: #A609F0;
                float: left;
                margin-top: 14px
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
</style>