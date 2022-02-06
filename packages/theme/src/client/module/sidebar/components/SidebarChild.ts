import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import {
  renderChildren,
  renderItem,
} from "@theme-hope/module/sidebar/composables";
import { isActiveLink } from "@theme-hope/utils";

import type { PropType, VNode } from "vue";
import type {
  ResolvedHopeThemeSidebarHeaderItem,
  ResolvedHopeThemeSidebarPageItem,
} from "../../../../shared";

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
          {
            heading: props.config.type === "heading",
            active: isActiveLink(route, props.config.link),
          },
        ],
        exact: true,
      }),
      renderChildren(props.config.children),
    ];
  },
});
