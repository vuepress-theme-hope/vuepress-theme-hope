import { type PropType, type VNode, defineComponent } from "vue";
import { useRoute } from "vue-router";

import {
  renderChildren,
  renderItem,
} from "@theme-hope/modules/sidebar/composables/index";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";

import {
  type ResolvedSidebarHeaderItem,
  type ResolvedSidebarPageItem,
} from "../utils/index.js";

import "../styles/sidebar-child.scss";

export default defineComponent({
  name: "SidebarChild",

  props: {
    /**
     * Sidebar item config
     *
     * 侧边栏项目配置
     */
    config: {
      type: Object as PropType<
        ResolvedSidebarPageItem | ResolvedSidebarHeaderItem
        // eslint-disable-next-line vue/new-line-between-multi-line-property
      >,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();

    return (): (VNode | null)[] => [
      renderItem(props.config, {
        class: [
          "vp-sidebar-link",
          `vp-sidebar-${props.config.type}`,
          { active: isActiveSidebarItem(route, props.config, true) },
        ],
        exact: true,
      }),
      renderChildren(props.config.children),
    ];
  },
});
