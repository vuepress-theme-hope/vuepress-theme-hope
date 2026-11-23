import type { PropType, VNode } from "vue";
import { computed, defineComponent, h, ref, resolveComponent, useId } from "vue";
import { useRoute } from "vuepress/client";

import AutoLink from "@theme-hope/components/base/AutoLink";
// oxlint-disable-next-line import/no-cycle
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

  emits: {
    toggle: (open: boolean): boolean => typeof open === "boolean",
  },

  setup(props, { emit }) {
    const route = useRoute();

    const hasBeenToggled = ref(false);
    const contentId = `vp-sidebar-group-${useId()}`;

    const active = computed(() => isActiveSidebarItem(route, props.config));

    const exact = computed(() => isActiveItem(route, props.config));

    const shouldOpen = computed(() =>
      Boolean(props.open || (props.config.expanded && !hasBeenToggled.value)),
    );

    return (): VNode => {
      const { collapsible, children, icon, prefix, link, text } = props.config;

      const title = link
        ? h(AutoLink, {
            class: "vp-sidebar-title no-external-link-icon",
            config: { text, link },
          })
        : h("span", { class: "vp-sidebar-title" }, text);

      const iconNode = h(resolveComponent("VPIcon"), { icon, sizing: "both" });
      const arrowNode = h("span", {
        class: ["vp-arrow", shouldOpen.value ? "down" : "end"],
      });

      const headerClasses = [
        "vp-sidebar-header",
        {
          // The header itself is not interactive when it contains a link: only
          // the dedicated toggle button collapses the group.
          clickable: collapsible && !link,
          exact: exact.value,
          active: active.value,
        },
      ];

      const toggle = (): void => {
        // The group may be open because of the `expanded` option while `open`
        // is still false, so the next state must be computed from the rendered
        // state instead of the `open` prop.
        const nextOpen = !shouldOpen.value;

        hasBeenToggled.value = true;
        emit("toggle", nextOpen);
      };

      const toggleButton = h(
        "button",
        {
          type: "button",
          class: "vp-sidebar-toggle",
          "aria-label": text,
          "aria-expanded": shouldOpen.value,
          "aria-controls": contentId,
          onClick: toggle,
        },
        arrowNode,
      );

      return h("section", { class: "vp-sidebar-group" }, [
        collapsible && link
          ? h("div", { class: headerClasses }, [iconNode, title, toggleButton])
          : collapsible
            ? h(
                "button",
                {
                  type: "button",
                  class: headerClasses,
                  "aria-expanded": shouldOpen.value,
                  "aria-controls": contentId,
                  onClick: toggle,
                },
                [iconNode, title, arrowNode],
              )
            : h("p", { class: headerClasses }, [iconNode, title]),

        collapsible
          ? h(
              "div",
              { id: contentId, class: "vp-sidebar-group-content" },
              shouldOpen.value ? [h(SidebarLinks, { key: prefix, config: children ?? [] })] : [],
            )
          : h(SidebarLinks, { key: prefix, config: children ?? [] }),
      ]);
    };
  },
});
