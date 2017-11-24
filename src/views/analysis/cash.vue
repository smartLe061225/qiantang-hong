<template>
  <div>
    <cash-bar></cash-bar>
    <cash-pie></cash-pie>
  </div>
</template>
<script>
  import cashBar from 'components/echarts/cash-bar'
  import cashPie from 'components/echarts/cash-pie'

  export default {
    components: {
      cashBar,
      cashPie
    }
  }
</script>

