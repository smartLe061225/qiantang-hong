<template>
    <div class="organization-mod">
        <div class="organization-hd clearfix">
            <div class="organization-logo">
                <img src="https://img1.doubanio.com/icon/u2629298-7.jpg" alt="">
            </div>
            <div class="organization-name-opt">
                <div class="organization-name clearfix">
                    <h1>浙江华贸贸易集团有限公司</h1><strong></strong>
                </div>
                <div class="organization-opt clearfix">
                    <div class="fr">
                        <Dropdown style="margin-left: 20px">
                            <a href="javascript:void(0)">
                                组织管理
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>管理公司</DropdownItem>
                                <DropdownItem>添加公司</DropdownItem>
                                <DropdownItem>管理部门</DropdownItem>
                                <DropdownItem>添加部门</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button type="ghost">修改资料</Button>
                    </div>
                    <img class="avator" src="https://img1.doubanio.com/icon/u2629298-7.jpg" alt="露得清">
                    <strong class="name">露得清</strong>
                    <span class="is-leader">负责人</span>
                    <span class="is-certification">资料已认证</span>
                </div>
            </div>
        </div>
        <div class="organization-bd">
            <Row>
                <Col span="8">
                    <div class="sub-company">
                        <h3 class="title">我的分公司</h3>
                        <ul class="sub-company-list">
                            <li>
                                <a href="javascript:;">
                                    <img src="https://img1.doubanio.com/icon/u2629298-7.jpg" alt="浙江华贸贸易集团有限公司">
                                    <strong>浙江华贸贸易集团有限公司</strong>
                                </a>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col span="16">
                    <div class="sub-company-department-list">
                        <h3 class="title">分公司部门</h3>
                        <div class="sub-company-department-nav-bar clearfix">
                            <a href="javascript:;" class="cur">市场部</a>    
                            <a href="javascript:;">策划部</a>    
                        </div>  
                        <div class="member-list">
                            <ul class="clearfix">
                                <li>
                                    <div class="ml-box">
                                    <img class="avator" src="https://img1.doubanio.com/icon/u2629298-7.jpg" alt="毛梦琪">
                                    <strong class="name">毛梦琪</strong>
                                    <span class="dep">市场部</span>  
                                    <span class="is-leader">负责人</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="ml-box">
                                    <img class="avator" src="https://img1.doubanio.com/icon/u2629298-7.jpg" alt="毛梦琪">
                                    <strong class="name">毛梦琪</strong>
                                    <span class="dep">市场部</span>  
                                    <span class="is-leader">负责人</span>
                                    </div>
                                </li>
                            </ul>
                        </div>                      
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<style lang="less">
.organization-mod{
    .organization-hd {
        .organization-logo {
            float: left;
            box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.1);
            width: 260px;
            height: 160px;
            text-align: center;
            background-color: #fff;
            display: table-cell;
            img {}
        }
        .organization-name-opt {
            float: left;
            margin-left: 80px;
            .organization-name {
                h1 {
                    font-size: 26px;
                    float: left;
                    margin-right: 20px;
                }
                strong {}
            }
            .organization-opt {
                .avator {}
                .name {}
                .is-leader {}
                .is-certification {}
            }
        }
    }
    .organization-bd {
        background: #fff;
        .sub-company {
            padding-top: 35px;
            padding-left: 20px;
            .sub-company-list {
                border-top: 1px solid #F0F0F0;
                li {
                    border-bottom: 1px solid #F0F0F0;
                    a {
                        padding-left: 10px;
                        display: block;
                        height: 66px;
                        line-height: 66px;
                        color: #333;
                        img {
                            width: 44px;
                            height: 44px;
                            border: 1px solid #DBDBDB;
                            border-radius: 22px;
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                        strong {
                            color: #000;
                            font-size: 14px;
                        }
                        &:hover {
                            background-color: #4E7BFA;
                            color: #fff;
                        }
                    }
                }
            }
            .title {
                font-size: 14px;
                color: #b8c4e1;
                padding-bottom: 20px;
            }
        }
        .sub-company-department-list {
            padding: 35px 25px 35px 25px;
            background-color: #F7F7F7;
            .title {
                font-size: 14px;
                color: #b8c4e1;
                padding-bottom: 20px;
            }
            .sub-company-department-nav-bar {
                margin-bottom: 20px;
                a {
                    display: inline-block;
                    height: 38px;
                    line-height: 38px;
                    padding: 0 15px;
                    color: #737c8e;
                    margin-right: 8px;
                    border-radius: 19px;
                    &:hover,&.cur {
                        background: #4E7BFA;
                        color: #fff;
                    }
                }
            }
            .member-list {
                margin-left: -2%;
                li {
                    float: left;
                    width: 47%;
                    margin-left: 2%;
                    .ml-box {
                        position: relative;
                    height: 74px;
                    line-height: 74px;
                    background: #fff;
                    border: 1px solid #EDEDED;
                    padding: 0 15px;
                    .avator {
                        width: 44px;
                        height: 44px;
                        border: 1px solid #DBDBDB;
                        border-radius: 22px;
                        vertical-align: middle;
                        margin-right: 10px;
                    }
                    .name {
                        font-size: 18px;
                        margin: 10px;
                    }
                    .dep {
                        font-size: 14px;
                        color: #C3C3C3;
                    }
                    .is-leader {
                        position: absolute;
                        right: 0;
                        top: 0;
                        height: 20px;
                        line-height: 20px;
                        font-size: 12px;
                        background-color: #23983F;
                        color: #fff;
                        padding: 0 5px;
                    }
                    &:hover {
                        border-color: #4E7BFA;
                        box-shadow: 0 0 5px rgba(0,0,0,0.1); 
                    }
                    }
                }
            }
        }
    }
}
</style>