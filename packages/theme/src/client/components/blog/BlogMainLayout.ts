import type { SlotContent } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";

import MainLayout from "@theme-hope/components/base/MainLayout";
import SkipLink from "@theme-hope/components/base/SkipLink";
import BloggerInfo from "@theme-hope/components/blog/BloggerInfo";
import InfoList from "@theme-hope/components/blog/InfoList";
import { useWindowSize } from "@theme-hope/composables/useWindowSize";
import type { SidebarSlotData } from "@theme-hope/typings/slots";

import "../../styles/blog/blog-main-layout.scss";

export default defineComponent({
  name: "BlogMainLayout",

  slots: Object as SlotsType<{
    default: () => VNode[] | VNode | null;

    // Nav Screen
    navScreenTop?: () => VNode[] | VNode | null;
    navScreenBottom?: () => VNode[] | VNode | null;

    // Sidebar
    sidebarItems?: (sidebarItem: SidebarSlotData) => VNode[] | VNode;
    sidebarTop?: () => VNode[] | VNode | null;
    sidebarBottom?: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const { isMobile } = useWindowSize();

    return (): VNode[] => [
      h(SkipLink),
      h(
        MainLayout,
        { noSidebar: true, noToc: true },
        {
          ...slots,
          navScreenBottom:
            slots.navScreenBottom ?? ((): VNode => h(BloggerInfo)),
          sidebarItems:
            slots.sidebarItems ??
            (isMobile.value ? (): SlotContent => h(InfoList) : null),
        },
      ),
    ];
  },
});
