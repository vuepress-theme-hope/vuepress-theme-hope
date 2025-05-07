import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";

import MainLayout from "@theme-hope/components/base/MainLayout";
import SkipLink from "@theme-hope/components/base/SkipLink";
import BloggerInfo from "@theme-hope/components/blog/BloggerInfo";
import InfoList from "@theme-hope/components/blog/InfoList";
import { useWindowSize } from "@theme-hope/composables/useWindowSize";
import type { SidebarItem } from "@theme-hope/utils/sidebar/typings";

import "../../styles/blog/blog-main-layout.scss";

export default defineComponent({
  name: "BlogMainLayout",

  slots: Object as SlotsType<{
    default: () => VNode[] | VNode | null;

    // Nav Screen
    navScreenTop?: () => VNode[] | VNode | null;
    navScreenBottom?: () => VNode[] | VNode | null;

    // Sidebar
    sidebarItems?: (sidebarItem: SidebarItem[]) => VNode[] | VNode;
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
            (isMobile.value ? (): VNode | VNode[] | null => h(InfoList) : null),
        },
      ),
    ];
  },
});
