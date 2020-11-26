import Vue from "vue";
import BlogInfo from "@BlogInfo";
import BlogHome from "@BlogHome";
import Common from "@theme/components/Common.vue";
import Home from "@theme/components/Home.vue";
import Page from "@theme/components/Page.vue";

export default Vue.extend({
  name: "Layout",

  components: { BlogInfo, BlogHome, Common, Home, Page },
});
