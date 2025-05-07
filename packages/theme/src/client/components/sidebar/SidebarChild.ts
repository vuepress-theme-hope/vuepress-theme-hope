import { isString } from "@vuepress/helper/client";
import type { PropType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";
import { useRoute } from "vuepress/client";

import AutoLink from "@theme-hope/components/base/AutoLink";
import type { SidebarLinkItem } from "@theme-hope/typings/sidebar";
import { isActiveItem } from "@theme-hope/utils/isActiveItem";

import type { AutoLinkOptions } from "../../../shared/index.js";

import "../../styles/sidebar/sidebar-child.scss";

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
            h(resolveComponent("VPIcon"), {
              icon: props.config.icon,
              sizing: "both",
            }),
            props.config.text,
          ]);
  },
});
