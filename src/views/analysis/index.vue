<template>
  <div>
    <div class="bread-crumb-bar">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">分析</BreadcrumbItem>
        <BreadcrumbItem>利润分析</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="m-25">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  }
}
</script>
