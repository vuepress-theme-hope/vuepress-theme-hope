import { computed, defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";

import DropdownTransition from "@theme-hope/components/transitions/DropTransition.vue";
import SidebarLinks from "@theme-hope/module/sidebar/components/SidebarLinks";
import { renderIcon } from "@theme-hope/module/sidebar/composables";
import { isActiveSidebarItem } from "@theme-hope/module/sidebar/utils";

import type { PropType, VNode } from "vue";
import type { ResolvedSidebarGroupItem } from "../../../../shared";

export default defineComponent({
  name: "SidebarGroup",

  props: {
    config: {
      type: Object as PropType<ResolvedSidebarGroupItem>,
      required: true,
    },
    open: { type: Boolean, required: true },
  },

  emits: ["toggle"],

  setup(props, { emit }) {
    const route = useRoute();
    const active = computed(() => isActiveSidebarItem(route, props.config));

    return (): VNode[] => {
      const { collapsable, children = [], icon, link, text } = props.config;

      return [
        h("section", { class: "sidebar-group" }, [
          h(
            "p",
            {
              class: [
                "sidebar-heading",
                {
                  clickable: collapsable || link,
                  active: active.value,
                },
              ],
              ...(collapsable
                ? {
                    tabindex: "0",
                    onClick: () => emit("toggle"),
                    onKeydown: (event: KeyboardEvent): void => {
                      if (event.key === "Enter") emit("toggle");
                    },
                  }
                : {}),
            },
            [
              // icon
              renderIcon(icon),
              // title
              link
                ? h(RouterLink, { to: link }, () =>
                    h("span", { class: "title" }, text)
                  )
                : h("span", { class: "title" }, text),
              // arrow
              collapsable
                ? h("span", { class: ["arrow", props.open ? "down" : "right"] })
                : null,
            ]
          ),
          h(DropdownTransition, () =>
            props.open || !collapsable
              ? h(SidebarLinks, { config: children })
              : null
          ),
        ]),
      ];
    };
  },
});
