import type { Slot } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";

import MainLayout from "@theme-hope/components/base/MainLayout";
import SkipLink from "@theme-hope/components/base/SkipLink";
import BloggerInfo from "@theme-hope/components/blog/BloggerInfo";
import InfoList from "@theme-hope/components/blog/InfoList";
import { useWindowSize } from "@theme-hope/composables/useWindowSize";
import type {
  BloggerInfoSlotData,
  SidebarItemsSlotData,
} from "@theme-hope/typings/slots";

import "../../styles/blog/blog-main-layout.scss";

export default defineComponent({
  name: "BlogMainLayout",

  slots: Object as SlotsType<{
    default: Slot;

    // Nav Screen
    navScreenTop?: Slot;
    navScreenBottom?: Slot;

    // Sidebar
    sidebarItems?: Slot<SidebarItemsSlotData>;
    sidebarTop?: Slot;
    sidebarBottom?: Slot;

    bloggerInfo?: Slot<BloggerInfoSlotData>;
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
          navScreenBottom: () =>
            slots.navScreenBottom?.() ?? h(BloggerInfo, {}, slots),
          sidebarItems: (sidebarItems: SidebarItemsSlotData) =>
            slots.sidebarItems?.(sidebarItems) ??
            (isMobile.value ? h(InfoList) : null),
        },
      ),
    ];
  },
});
