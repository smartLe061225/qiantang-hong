<template>
  <Menu active-name="1" width="180px" :theme="sidebar_theme">
        <MenuGroup  title="我的宏管理">
            <MenuItem name="1">
                <Icon type="document-text"></Icon>
                利润分析
            </MenuItem>
            <MenuItem name="2">
                <Icon type="chatbubbles"></Icon>
                资产分析
            </MenuItem>
            <MenuItem name="2">
                <Icon type="chatbubbles"></Icon>
                现金分析
            </MenuItem>
            <MenuItem name="2">
                <Icon type="chatbubbles"></Icon>
                预警分析
            </MenuItem>
        </MenuGroup>
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
  }
}
</script>

