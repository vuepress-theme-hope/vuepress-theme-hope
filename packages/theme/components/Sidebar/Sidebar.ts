import Vue from "vue";
import BlogInfo from "@BlogInfo";
import BloggerInfo from "@BloggerInfo";
import SidebarNavLinks from "@theme/components/Sidebar/SidebarNavLinks.vue";
import SidebarLinks from "@theme/components/Sidebar/SidebarLinks.vue";

import type { PropType } from "vue";
import type { BlogOptions } from "@theme/types";
import type { SidebarItem } from "@theme/utils/sidebar";

export default Vue.extend({
  name: "Sidebar",

  components: {
    BlogInfo,
    BloggerInfo,
    SidebarLinks,
    SidebarNavLinks,
  },

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
