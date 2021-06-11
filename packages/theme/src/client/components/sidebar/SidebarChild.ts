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
    item: {
      type: Object as PropType<
        ResolvedSidebarPageItem | ResolvedSidebarHeaderItem
      >,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();

    return (): (VNode | null)[] => [
      renderItem(props.item, {
        class: {
          "sidebar-link": true,
          heading: props.item.type === "heading",
          active: isActiveLink(route, props.item.link),
        },
        exact: true,
      }),
      renderChildren(props.item.children),
    ];
  },
});
