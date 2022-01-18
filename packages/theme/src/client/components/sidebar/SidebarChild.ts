import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { renderChildren, renderItem } from "../../composables";
import { isActiveLink } from "../../utils";

import type { PropType, VNode } from "vue";
import type {
  ResolvedSidebarHeaderItem,
  ResolvedSidebarPageItem,
} from "../../../shared";

export default defineComponent({
  name: "SidebarChild",

  props: {
    config: {
      type: Object as PropType<
        ResolvedSidebarPageItem | ResolvedSidebarHeaderItem
      >,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();

    return (): (VNode | null)[] => [
      renderItem(props.config, {
        class: {
          "sidebar-link": true,
          heading: props.config.type === "heading",
          active: isActiveLink(route, props.config.link),
        },
        exact: true,
      }),
      renderChildren(props.config.children),
    ];
  },
});
