import Vue from "vue";
import BlogHome from "@BlogHome";
import Common from "@theme/components/Common.vue";
import Home from "@theme/components/Home.vue";
import Page from "@theme/components/Page.vue";

export default Vue.extend({
  name: "Layout",

  components: {
    BlogHome,
    Common,
    Home,
    Page,
  },
});
