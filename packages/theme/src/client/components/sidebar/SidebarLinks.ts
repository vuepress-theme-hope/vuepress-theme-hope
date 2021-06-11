import { defineComponent, h, ref, watch } from "vue";
import { isActiveLink } from "../../utils";
import SidebarChild from "./SidebarChild";
import SidebarGroup from "./SidebarGroup";

import type { PropType, VNode } from "vue";
import { RouteLocationNormalized, useRoute } from "vue-router";
import type { ResolvedSidebarItem } from "../../../shared";

const descendantIsActive = (
  route: RouteLocationNormalized,
  item: ResolvedSidebarItem
): boolean => {
  if (item.type === "group")
    return item.children.some((child) => {
      if (child.type === "group") return descendantIsActive(route, child);

      return child.type === "page" && isActiveLink(route, child.link);
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
    items: {
      type: Array as PropType<ResolvedSidebarItem[]>,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const openGroupIndex = ref(0);

    const refreshIndex = (): void => {
      const index = resolveOpenGroupIndex(route, props.items);

      if (index > -1) openGroupIndex.value = index;
    };

    const toggleGroup = (index: number): void => {
      openGroupIndex.value = index === openGroupIndex.value ? -1 : index;
    };

    watch(
      () => route.path,
      () => {
        refreshIndex();
      }
    );

    return (): VNode | null =>
      h(
        "ul",
        { class: "sidebar-links" },
        props.items.map((item, index) =>
          h(
            "li",
            item.type === "group"
              ? h(SidebarGroup, {
                  item,
                  open: index === openGroupIndex.value,
                  onToggle: () => toggleGroup(index),
                })
              : h(SidebarChild, { item })
          )
        )
      );
  },
});
