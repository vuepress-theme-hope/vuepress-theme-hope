import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import {
  renderChildren,
  renderItem,
} from "@theme-hope/modules/sidebar/composables";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils";

import type { PropType, VNode } from "vue";
import type {
  ResolvedHopeThemeSidebarHeaderItem,
  ResolvedHopeThemeSidebarPageItem,
} from "../../../../shared";

import "../styles/sidebar-child.scss";

export default defineComponent({
  name: "SidebarChild",

  props: {
    config: {
      type: Object as PropType<
        ResolvedHopeThemeSidebarPageItem | ResolvedHopeThemeSidebarHeaderItem
      >,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();

    return (): (VNode | null)[] => [
      renderItem(props.config, {
        class: [
          "sidebar-link",
          `sidebar-${props.config.type}`,
          { active: isActiveSidebarItem(route, props.config, true) },
        ],
        exact: true,
      }),
      renderChildren(props.config.children),
    ];
  },
});
