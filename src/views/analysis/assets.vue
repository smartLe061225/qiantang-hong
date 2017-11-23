<template>
  <div>
    <assets-bar></assets-bar>
    <assets-pie></assets-pie>
  </div>
</template>
<script>
  import assetsBar from 'components/echarts/assets-bar'
  import assetsPie from 'components/echarts/assets-pie'

  export default {
    components: {
      assetsBar,
      assetsPie
    }
  }
</script>

