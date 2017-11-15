<template>
  <div class="bread-crumb-bar">
      <Breadcrumb separator=">">
        <BreadcrumbItem :href="item.path" v-for="item in bread_crumb_data" :key="item.name">{{item.meta.title}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
</template>
<script>
export default {
  name: "breadCrumbBar",
  data() {
    return {
      bread_crumb_data: null
    };
  },
  methods: {
    get_bread_crumb() {
      let matched = this.$route.matched.filter(item => {
          return item.meta.show_in_bread_curmb_bar == true
        });
      const first = matched[0];
      if (first && (first.name !== "dashboard" || first.path !== "/dashboard")) {
        matched = [
          { name: "dashboard", path: "/dashboard", meta: { title: "首页" } }
        ].concat(matched);
      }
      this.bread_crumb_data = matched;
    }
  },
  watch: {
    $route() {
      this.get_bread_crumb();
    }
  },
  created() {
    this.get_bread_crumb();
  }
};
</script>