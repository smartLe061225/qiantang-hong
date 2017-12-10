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

      
      if (first && (first.path == '/analysis/list/:id' || first.path == '/analysis/list')) {
        let url = window.location.href;
        let id = Number(url.substring(url.lastIndexOf('/')+1,url.length))
        switch(id){
          case 1:
            matched = [
              { name: "dashboard", path: "/dashboard", meta: { title: "首页" } },
              { name: "profits", path: "/analysis/profits", meta: { title: "利润分析" } },
              { name: "list", path: "", meta: { title: "导入列表" } }
            ];
            break;
          case 2:
            matched = [
              { name: "dashboard", path: "/dashboard", meta: { title: "首页" } },
              { name: "assets", path: "/analysis/assets", meta: { title: "资产分析" } },
              { name: "list", path: "", meta: { title: "导入列表" } }
            ];
            break;
          case 3:
            matched = [
              { name: "dashboard", path: "/dashboard", meta: { title: "首页" } },
              { name: "cash", path: "/analysis/cash", meta: { title: "现金分析" } },
              { name: "list", path: "", meta: { title: "导入列表" } }
            ];
            break;
          default:
            matched = [
              { name: "dashboard", path: "/dashboard", meta: { title: "首页" } },
              { name: "list", path: "/analysis/list", meta: { title: "数据管理" } }
            ];
        }
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