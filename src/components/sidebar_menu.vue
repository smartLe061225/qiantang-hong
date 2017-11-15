<template>
  <Menu active-name="1" width="180px" :theme="sidebar_theme" @on-select="changeMenu">
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
      
        <MenuGroup title="企业管理">
            <MenuItem name="3">
                <Icon type="heart"></Icon>
                成员管理
            </MenuItem>
            <MenuItem name="4">
                <Icon type="heart-broken"></Icon>
                组织架构
            </MenuItem>
            <MenuItem name="4">
                <Icon type="heart-broken"></Icon>
                角色权限
            </MenuItem>
            <MenuItem name="4">
                <Icon type="heart-broken"></Icon>
                业务定制
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="系统设置">
            <MenuItem name="3">
                <Icon type="heart"></Icon>
                消息管理
            </MenuItem>
            <MenuItem name="4">
                <Icon type="heart-broken"></Icon>
                配置管理
            </MenuItem>
        </MenuGroup>
    </Menu>
</template>
<script>
export default {
  name: 'sidebarMenu',
  data(){
      return {
          sidebar_theme: 'dark'
      }
  },
  methods: {
      changeMenu(active) {
        this.$router.push({
          name: active
        });
    },
  }
}
</script>

