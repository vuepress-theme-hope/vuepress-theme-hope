import Vue from "vue";
import BloggerInfo from "@theme/components/Blog/BloggerInfo.vue";
import NavLinks from "@theme/components/Navbar/NavLinks.vue";
import SidebarLinks from "@theme/components/Sidebar/SidebarLinks.vue";

import type { PropType } from "vue";
import type { BlogOptions } from "@theme/types";
import type { SidebarItem } from "@theme/util/sidebar";

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
