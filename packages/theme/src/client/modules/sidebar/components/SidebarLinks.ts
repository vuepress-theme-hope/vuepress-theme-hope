import { defineComponent, h, ref, watch } from "vue";
import { useRoute } from "vue-router";

import SidebarChild from "@theme-hope/modules/sidebar/components/SidebarChild.js";
import SidebarGroup from "@theme-hope/modules/sidebar/components/SidebarGroup.js";
import { isMatchedSidebarItem } from "@theme-hope/modules/sidebar/utils/index.js";

import type { PropType, VNode } from "vue";
import type { ResolvedSidebarItem } from "../../../../shared/index.js";

import "../styles/sidebar-links.scss";

export default defineComponent({
  name: "SidebarLinks",

  props: {
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
      () => [route.path, props.config],
      (): void => {
        const index = props.config.findIndex((item) =>
          isMatchedSidebarItem(route, item)
        );

        openGroupIndex.value = index;
      },
      { immediate: true }
    );

    return (): VNode | null =>
      h(
        "ul",
        { class: "sidebar-links" },
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
