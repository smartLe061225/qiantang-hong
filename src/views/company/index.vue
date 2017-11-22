<template>
  <div>
    <bread-curm-bar></bread-curm-bar>
      <router-view></router-view>
  </div>
</template>
<script>
import breadCurmBar from '@/components/bread_curmb_bar'
export default {
  components: {
    breadCurmBar
  },
  data() {
    return {
      bread_crumb_data: null
    };
  }
};
</script>

