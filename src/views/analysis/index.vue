<template>
  <div>
    <bread-curm-bar></bread-curm-bar>
    <div class="m-25">
      <router-view></router-view>
    </div>
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
