import { defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";
import SidebarLinks from "./SidebarLinks";
import { renderGroupHeader } from "../../composables";
import { isActiveItem } from "../../utils";

import type { PropType, VNode } from "vue";
import type { ResolvedSidebarGroupItem } from "../../../shared";

export default defineComponent({
  name: "SidebarGroup",

  props: {
    item: {
      type: Object as PropType<ResolvedSidebarGroupItem>,
      required: true,
    },
    open: { type: Boolean, required: true },
  },

  emits: ["toggle"],

  setup(props, { emit }) {
    const route = useRoute();
    const active = isActiveItem(route, props.item);

    return (): VNode[] => [
      h("section", { class: "sidebar-group" }, [
        props.item.link
          ? h(
              RouterLink,
              {
                to: props.item.link,
                class: {
                  "sidebar-heading": true,
                  clickable: true,
                  active,
                },
                onClick: () => emit("toggle"),
              },
              renderGroupHeader(props.item, props.open)
            )
          : h(
              "p",
              {
                to: props.item.link,
                class: {
                  "sidebar-heading": true,
                  clickable: props.item.collapsable,
                  active,
                },
                onClick: () => emit("toggle"),
              },
              renderGroupHeader(props.item, props.open)
            ),
        h(SidebarLinks, { items: props.item.children || [] }),
      ]),
    ];
  },
});
