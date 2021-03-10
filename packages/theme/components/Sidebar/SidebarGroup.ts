import Vue from "vue";
import DropdownTransition from "@theme/components/Navbar/DropdownTransition.vue";
import { isActive } from "@theme/util/path";

import type { PropType } from "vue";
import type { SidebarAutoItem, SidebarGroupItem } from "@theme/util/sidebar";

export default Vue.extend({
  name: "SidebarGroup",

  components: { DropdownTransition },

  props: {
    item: {
      type: Object as PropType<SidebarAutoItem | SidebarGroupItem>,
      required: true,
    },
    open: { type: Boolean },
    depth: { type: Number, required: true },
  },

  beforeCreate(): void {
    // eslint-disable-next-line
    this.$options.components!.SidebarLinks = require("@theme/components/Sidebar/SidebarLinks.vue").default;
  },

  methods: {
    getIcon(icon: string | undefined): string {
      const { iconPrefix } = this.$themeConfig;

      return this.$themeConfig.sidebarIcon !== false && icon
        ? `${iconPrefix === "" ? "" : iconPrefix || "icon-"}${icon}`
        : "";
    },

    isActive,
  },
});
