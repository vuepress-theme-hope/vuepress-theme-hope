import type { PropType, VNode } from "vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import {
  renderSidebarChildren,
  renderSidebarItem,
} from "@theme-hope/modules/sidebar/composables/index";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";

import type {
  ResolvedSidebarHeaderItem,
  ResolvedSidebarPageItem,
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
      renderSidebarItem(props.config, {
        class: [
          "vp-sidebar-link",
          `vp-sidebar-${props.config.type}`,
          { active: isActiveSidebarItem(route, props.config, true) },
        ],
        exact: true,
      }),
      renderSidebarChildren(props.config.children),
    ];
  },
});
