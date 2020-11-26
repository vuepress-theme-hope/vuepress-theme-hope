import Vue, { PropType } from "vue";
import { BlogOptions } from "@theme/types";
import BloggerInfo from "@theme/components/Blog/BloggerInfo.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import { SidebarItem } from "@theme/util/sidebar";
import SidebarLinks from "@theme/components/SidebarLinks.vue";

export default Vue.extend({
  name: "Sidebar",

  components: { BloggerInfo, SidebarLinks, NavLinks },

  props: {
    items: { type: Array as PropType<SidebarItem[]>, required: true },
  },

  computed: {
    blogConfig(): BlogOptions {
      return this.$themeConfig.blog || {};
    },

    sidebarDisplay(): "mobile" | "none" | "always" {
      return this.blogConfig.sidebarDisplay || "none";
    },
  },
});
