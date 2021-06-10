import { h } from "vue";
import { useRoute } from "vue-router";
import NavLink from "../NavLink.vue";
import { isActiveItem } from "../../utils";

import type { FunctionalComponent, VNode } from "vue";
import type { ResolvedSidebarItem } from "../../../shared";

const renderItem = (
  item: ResolvedSidebarItem,
  props: VNode["props"]
): VNode => {
  // if the item has link, render it as `<NavLink>`
  if (item.link)
    return h(NavLink, {
      ...props,
      item,
    });

  // if the item only has text, render it as `<p>`
  return h("p", props, item.text);
};

const renderChildren = (
  item: ResolvedSidebarItem,
  depth: number
): VNode | null => {
  if (!item.children?.length) return null;

  return h(
    "ul",
    { class: { "sidebar-sub-headers": depth > 0 } },
    item.children.map((child) =>
      h(
        "li",
        h(SidebarChild, {
          item: child,
          depth: depth + 1,
        })
      )
    )
  );
};

export const SidebarChild: FunctionalComponent<{
  item: ResolvedSidebarItem;
  depth?: number;
}> = ({
  item,
  // group depth should start from 0
  // otherwise start from 1
  depth = item.isGroup ? 0 : 1,
}) => {
  const route = useRoute();
  const active = isActiveItem(route, item);

  if (item.isGroup) {
    return [
      h("section", { class: "sidebar-group" }, [
        renderItem(item, {
          class: {
            "sidebar-heading": true,
            active,
          },
        }),
        renderChildren(item, depth),
      ]),
    ];
  }

  return [
    renderItem(item, {
      class: { "sidebar-link": true, active },
    }),
    renderChildren(item, depth),
  ];
};

SidebarChild.displayName = "SidebarChild";

SidebarChild.props = {
  item: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
  },
};
