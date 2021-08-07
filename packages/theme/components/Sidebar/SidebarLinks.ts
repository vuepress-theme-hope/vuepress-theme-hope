import Vue from "vue";
import SidebarGroup from "@theme/components/Sidebar/SidebarGroup.vue";
import SidebarLink from "@theme/components/Sidebar/SidebarLink.vue";
import { isActive } from "@theme/utils/path";

import type { PageComputed } from "@mr-hope/vuepress-types";
import type { PropType } from "vue";
import type { Route } from "vue-router";
import type { SidebarHeaderItem, SidebarItem } from "@theme/utils/sidebar";

const descendantIsActive = (route: Route, item: SidebarItem): boolean => {
  if (item.type === "group")
    return item.children.some((child: SidebarHeaderItem | SidebarItem) => {
      if (child.type === "group") return descendantIsActive(route, child);

      return child.type === "page" && isActive(route, child.path);
    });

  return false;
};

const resolveOpenGroupIndex = (route: Route, items: SidebarItem[]): number => {
  for (let i = 0; i < items.length; i++)
    if (descendantIsActive(route, items[i])) return i;

  return -1;
};

export default Vue.extend({
  name: "SidebarLinks",

  components: { SidebarGroup, SidebarLink },

  props: {
    items: {
      type: Array as PropType<SidebarItem[]>,
      required: true,
    },
    depth: { type: Number, required: true },
  },

  data: () => ({
    openGroupIndex: 0,
  }),

  watch: {
    $route(): void {
      this.refreshIndex();
    },
  },

  created(): void {
    this.refreshIndex();
  },

  methods: {
    refreshIndex(): void {
      const index = resolveOpenGroupIndex(this.$route, this.items);

      if (index > -1) this.openGroupIndex = index;
    },

    toggleGroup(index: number): void {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
    },

    isActive(page: PageComputed): boolean {
      return isActive(this.$route, page.regularPath);
    },
  },
});
