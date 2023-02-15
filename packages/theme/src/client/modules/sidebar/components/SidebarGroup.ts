import { type PropType, type VNode, computed, defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";

import HopeIcon from "@theme-hope/components/HopeIcon";
import SidebarLinks from "@theme-hope/modules/sidebar/components/SidebarLinks";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";

import { type ResolvedSidebarGroupItem } from "../utils/index.js";

import "../styles/sidebar-group.scss";

export default defineComponent({
  name: "SidebarGroup",

  props: {
    /**
     * Sidebar group item config
     *
     * 侧边栏分组配置
     */
    config: {
      type: Object as PropType<ResolvedSidebarGroupItem>,
      required: true,
    },

    /**
     * Whether current group is open
     *
     * 当前分组是否展开
     */
    open: {
      type: Boolean,
      required: true,
    },
  },

  emits: {
    toggle: () => true,
  },

  setup(props, { emit }) {
    const route = useRoute();
    const active = computed(() => isActiveSidebarItem(route, props.config));

    const exact = computed(() =>
      isActiveSidebarItem(route, props.config, true)
    );

    return (): VNode => {
      const {
        collapsible,
        children = [],
        icon,
        prefix,
        link,
        text,
      } = props.config;

      return h("section", { class: "sidebar-group" }, [
        h(
          collapsible ? "button" : "p",
          {
            class: [
              "sidebar-heading",
              {
                clickable: collapsible || link,
                exact: exact.value,
                active: active.value,
              },
            ],
            ...(collapsible
              ? {
                  onClick: () => emit("toggle"),
                  onKeydown: (event: KeyboardEvent): void => {
                    if (event.key === "Enter") emit("toggle");
                  },
                }
              : {}),
          },
          [
            // icon
            h(HopeIcon, { icon }),
            // title
            link
              ? h(RouterLink, { to: link, class: "title" }, () => text)
              : h("span", { class: "title" }, text),
            // arrow
            collapsible
              ? h("span", { class: ["arrow", props.open ? "down" : "end"] })
              : null,
          ]
        ),

        props.open || !collapsible
          ? h(SidebarLinks, { key: prefix, config: children })
          : null,
      ]);
    };
  },
});
