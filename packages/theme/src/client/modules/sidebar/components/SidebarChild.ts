import { isString } from "@vuepress/helper/client";
import type { PropType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useRoute } from "vuepress/client";

import AutoLink from "@theme-hope/components/AutoLink";
import HopeIcon from "@theme-hope/components/HopeIcon";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";

import type { AutoLinkOptions as AutoLinkType } from "../../../../shared/index.js";
import type { ResolvedSidebarPageItem } from "../utils/index.js";

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
      type: Object as PropType<ResolvedSidebarPageItem>,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();

    return (): VNode =>
      isString(props.config.link)
        ? // If the item has link, render it as `<AutoLink>`
          h(AutoLink, {
            class: [
              "vp-sidebar-link",
              `vp-sidebar-page`,
              { active: isActiveSidebarItem(route, props.config, true) },
            ],
            exact: true,
            config: props.config as AutoLinkType,
          })
        : // If the item only has text, render it as `<p>`
          h("p", props, [
            h(HopeIcon, { icon: props.config.icon }),
            props.config.text,
          ]);
  },
});
