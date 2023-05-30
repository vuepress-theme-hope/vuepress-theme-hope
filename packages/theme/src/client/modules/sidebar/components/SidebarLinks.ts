import { type PropType, type VNode, defineComponent, h, ref, watch } from "vue";
import { useRoute } from "vue-router";

import SidebarChild from "@theme-hope/modules/sidebar/components/SidebarChild";
import SidebarGroup from "@theme-hope/modules/sidebar/components/SidebarGroup";
import { isMatchedSidebarItem } from "@theme-hope/modules/sidebar/utils/index";

import { type ResolvedSidebarItem } from "../utils/index.js";

import "../styles/sidebar-links.scss";

export default defineComponent({
  name: "SidebarLinks",

  props: {
    /**
     * Sidebar links config
     *
     * 侧边栏链接配置
     */
    config: {
      type: Array as PropType<ResolvedSidebarItem[]>,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const openGroupIndex = ref(-1);

    const toggleGroup = (index: number): void => {
      openGroupIndex.value = index === openGroupIndex.value ? -1 : index;
    };

    watch(
      () => route.path,
      (): void => {
        const index = props.config.findIndex((item) =>
          isMatchedSidebarItem(route, item)
        );

        openGroupIndex.value = index;
      },
      { immediate: true, flush: "post" }
    );

    return (): VNode | null =>
      h(
        "ul",
        { class: "vp-sidebar-links" },
        props.config.map((config, index) =>
          h(
            "li",
            config.type === "group"
              ? h(SidebarGroup, {
                  config,
                  open: index === openGroupIndex.value,
                  onToggle: () => toggleGroup(index),
                })
              : h(SidebarChild, { config })
          )
        )
      );
  },
});
