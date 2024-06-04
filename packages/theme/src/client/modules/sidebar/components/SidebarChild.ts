import { isString } from "@vuepress/helper/client";
import type { PropType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useRoute } from "vuepress/client";

import AutoLink from "@theme-hope/components/AutoLink";
import HopeIcon from "@theme-hope/components/HopeIcon";
import { isActiveItem } from "@theme-hope/utils/index";

import type { AutoLinkOptions } from "../../../../shared/index.js";
import type { SidebarLinkItem } from "../utils/index.js";

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
      type: Object as PropType<SidebarLinkItem>,
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
              { active: isActiveItem(route, props.config) },
            ],
            config: {
              ...props.config,
              exact: true,
            } as AutoLinkOptions,
          })
        : // If the item only has text, render it as `<p>`
          h("p", props, [
            h(HopeIcon, { icon: props.config.icon }),
            props.config.text,
          ]);
  },
});
