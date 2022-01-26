import { computed, defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";
import SidebarLinks from "./SidebarLinks";
import DropdownTransition from "../transitions/DropTransition.vue";
import { renderGroupHeader } from "../../composables";
import { isActiveSidebarItem } from "../../utils";

import type { PropType, VNode } from "vue";
import type { ResolvedSidebarGroupItem } from "../../../shared";

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

    return (): VNode[] => [
      h("section", { class: "sidebar-group" }, [
        props.config.link
          ? h(
              RouterLink,
              {
                to: props.config.link,
                class: ["sidebar-heading clickable", { active: active.value }],
                onClick: () => emit("toggle"),
              },
              renderGroupHeader(props.config, props.open)
            )
          : h(
              "p",
              {
                to: props.config.link,
                class: [
                  "sidebar-heading",
                  {
                    clickable: props.config.collapsable,
                    active: active.value,
                  },
                ],
                onClick: () => emit("toggle"),
              },
              renderGroupHeader(props.config, props.open)
            ),
        h(DropdownTransition, () =>
          props.open || !props.config.collapsable
            ? h(SidebarLinks, { config: props.config.children || [] })
            : null
        ),
      ]),
    ];
  },
});
