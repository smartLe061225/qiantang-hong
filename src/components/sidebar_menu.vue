<template>
    <div>
        <Menu :active-name="active_name" :open-names="open_names" width="180px" :theme="sidebar_theme" @on-select="changeMenu">
            <Submenu name="analysis">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    我的宏管理
                </template>
                <MenuItem name="profits" key="profits">利润分析</MenuItem>
                <MenuItem name="assets" key="assets">资产分析</MenuItem>
                <MenuItem name="cash" key="cash">现金分析</MenuItem>
                <MenuItem name="warning" key="warning">预警分析</MenuItem>
            </Submenu>

            <Submenu name="company">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    企业管理
                </template>
                <MenuItem name="information" key="information">企业资料</MenuItem>
                <MenuItem name="manager" key="manager">公司管理</MenuItem>
                <MenuItem name="department" key="department">部门管理</MenuItem>
                <MenuItem name="group" key="group">成员管理</MenuItem>
                <MenuItem name="role" key="role">角色管理</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>
<script>
    export default {
        name: 'sidebarMenu',
        data() {
            return {
                sidebar_theme: 'dark',
                active_name: '',
                open_names: []
            }
        },
        methods: {
            changeMenu(active) {
                this.$router.push({
                    name: active
                });
            },
        },
        created() {
            this.active_name = this.$route.name;
            let relative_path_arr = this.$route.path.split('/');
            if (relative_path_arr.length > 1) {
                this.open_names = [relative_path_arr[1]]
            }
        }
    }
</script>