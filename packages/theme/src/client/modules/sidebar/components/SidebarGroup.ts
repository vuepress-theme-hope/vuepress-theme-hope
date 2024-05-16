import type { PropType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { useRoute } from "vuepress/client";

import AutoLink from "@theme-hope/components/AutoLink";
import HopeIcon from "@theme-hope/components/HopeIcon";
import SidebarLinks from "@theme-hope/modules/sidebar/components/SidebarLinks";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";

import type { ResolvedSidebarGroupItem } from "../utils/index.js";

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

  emits: ["toggle"],

  setup(props, { emit }) {
    const route = useRoute();
    const active = computed(() => isActiveSidebarItem(route, props.config));

    const exact = computed(() =>
      isActiveSidebarItem(route, props.config, true),
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

      return h("section", { class: "vp-sidebar-group" }, [
        h(
          collapsible ? "button" : "p",
          {
            class: [
              "vp-sidebar-header",
              {
                clickable: collapsible || link,
                exact: exact.value,
                active: active.value,
              },
            ],
            ...(collapsible
              ? {
                  type: "button",
                  onClick: () => emit("toggle"),
                  onKeydown: (event: KeyboardEvent): void => {
                    if (event.key === "Enter") emit("toggle");
                  },
                }
              : {}),
          },
          [
            // Icon
            h(HopeIcon, { icon }),
            // Title
            link
              ? h(AutoLink, {
                  class: "vp-sidebar-title no-external-link-icon",
                  config: { text, link },
                })
              : h("span", { class: "vp-sidebar-title" }, text),
            // Arrow
            collapsible
              ? h("span", { class: ["vp-arrow", props.open ? "down" : "end"] })
              : null,
          ],
        ),

        props.open || !collapsible
          ? h(SidebarLinks, { key: prefix, config: children })
          : null,
      ]);
    };
  },
});
