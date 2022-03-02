import { defineComponent, h, ref, watch } from "vue";
import { useRoute } from "vue-router";

import SidebarChild from "@theme-hope/module/sidebar/components/SidebarChild";
import SidebarGroup from "@theme-hope/module/sidebar/components/SidebarGroup";
import { isActiveSidebarItem } from "@theme-hope/module/sidebar/utils";

import type { PropType, VNode } from "vue";
import type { RouteLocationNormalized } from "vue-router";
import type { ResolvedSidebarItem } from "../../../../shared";

import "../styles/sidebar-links.scss";

const descendantIsActive = (
  route: RouteLocationNormalized,
  item: ResolvedSidebarItem
): boolean => {
  if (item.type === "group")
    return item.children.some((child) => {
      if (child.type === "group") return descendantIsActive(route, child);

      return child.type === "page" && isActiveSidebarItem(route, child, true);
    });

  return false;
};

const resolveOpenGroupIndex = (
  route: RouteLocationNormalized,
  items: ResolvedSidebarItem[]
): number => {
  for (let i = 0; i < items.length; i++)
    if (descendantIsActive(route, items[i])) return i;

  return -1;
};

export default defineComponent({
  name: "SidebarLinks",

  props: {
    config: {
      type: Array as PropType<ResolvedSidebarItem[]>,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const openGroupIndex = ref(0);

    const toggleGroup = (index: number): void => {
      openGroupIndex.value = index === openGroupIndex.value ? -1 : index;
    };

    watch(
      () => route.path,
      (): void => {
        const index = resolveOpenGroupIndex(route, props.config);

        if (index > -1) openGroupIndex.value = index;
      },
      { immediate: true }
    );

    return (): VNode | null =>
      h(
        "ul",
        { class: "sidebar-links" },
        props.config.map((config, index) =>
          h(
            "li",
            config.type === "group"
              ? h(SidebarGroup, {
                  config,
                  open: index === openGroupIndex.value,
                  onToggle: () => toggleGroup(index),
                })
              : h(SidebarChild, { config })
          )
        )
      );
  },
});
