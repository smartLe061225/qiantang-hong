<template>
  <div class="m-25 mt-65">
    <div class="normal-box-mod">
      <div class="normal-box-hd clearfix">
        <div class="normal-box-title">
          <div class="decorate-square"></div>
          <h2>修改认证信息</h2>
        </div>
      </div>
      <div class="normal-box-bd">
        <certification type="update"></certification>
      </div>
    </div>
    
  </div>
</template>
<script>
import certification from '../../components/certification/certification'
import store from '../../store/'
export default {
    components: {
        certification
    },
  data () {
      return {
      }
  }
}
</script>
