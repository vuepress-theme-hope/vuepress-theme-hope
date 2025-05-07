import type { PropType, VNode } from "vue";
import { computed, defineComponent, h, ref, resolveComponent } from "vue";
import { useRoute } from "vuepress/client";

import AutoLink from "@theme-hope/components/base/AutoLink";
import SidebarLinks from "@theme-hope/components/sidebar/SidebarLinks";
import type { SidebarGroupItem } from "@theme-hope/typings/sidebar";
import { isActiveItem } from "@theme-hope/utils/isActiveItem";
import { isActiveSidebarItem } from "@theme-hope/utils/sidebar/isActiveSidebarItem";

import "../../styles/sidebar/sidebar-group.scss";

export default defineComponent({
  name: "SidebarGroup",

  props: {
    /**
     * Sidebar group item config
     *
     * 侧边栏分组配置
     */
    config: {
      type: Object as PropType<SidebarGroupItem>,
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

    const hasBeenToggled = ref(false);

    const active = computed(() => isActiveSidebarItem(route, props.config));

    const exact = computed(() => isActiveItem(route, props.config));

    const shouldOpen = computed(
      () => props.open || (props.config.expanded && !hasBeenToggled.value),
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
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                clickable: collapsible || link,
                exact: exact.value,
                active: active.value,
              },
            ],
            ...(collapsible
              ? {
                  type: "button",
                  onClick: (): void => {
                    hasBeenToggled.value = true;
                    emit("toggle");
                  },
                }
              : {}),
          },
          [
            // Icon
            h(resolveComponent("VPIcon"), { icon, sizing: "both" }),
            // Title
            link
              ? h(AutoLink, {
                  class: "vp-sidebar-title no-external-link-icon",
                  config: { text, link },
                })
              : h("span", { class: "vp-sidebar-title" }, text),
            // Arrow
            collapsible
              ? h("span", {
                  class: ["vp-arrow", shouldOpen.value ? "down" : "end"],
                })
              : null,
          ],
        ),

        shouldOpen.value || !collapsible
          ? h(SidebarLinks, { key: prefix, config: children })
          : null,
      ]);
    };
  },
});
