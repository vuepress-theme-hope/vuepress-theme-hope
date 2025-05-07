import type { HeaderItem, Slot, SlotContent } from "@vuepress/helper/client";
import { hasGlobalComponent } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";

import MainFadeInUpTransition from "@theme-hope/components/base/MainFadeInUpTransition";
import MainLayout from "@theme-hope/components/base/MainLayout";
import SkipLink from "@theme-hope/components/base/SkipLink";
import VPPage from "@theme-hope/components/base/VPPage";
import HomePage from "@theme-hope/components/home/HomePage";
import PortfolioHome from "@theme-hope/components/home/PortfolioHome";
import { useData } from "@theme-hope/composables/useData";
import type { SidebarItem } from "@theme-hope/typings/sidebar";
import type {
  HeroBackgroundSlotData,
  HeroImageSlotData,
  HeroInfoSlotData,
  PortfolioAvatarSlotData,
  PortfolioBackgroundSlotData,
  PortfolioInfoSlotData,
} from "@theme-hope/typings/slots";

import type { ThemeBasePageFrontmatter } from "../../../shared/index.js";

export default defineComponent({
  name: "Layout",

  slots: Object as SlotsType<{
    default?: Slot;

    // page
    pageTop?: Slot;
    pageBottom?: Slot;

    // content
    content?: Slot;
    contentBefore?: Slot;
    contentAfter?: Slot;

    // navbar
    navScreenTop?: Slot;
    navScreenBottom?: Slot;

    // sidebar
    sidebarItems?: (sidebarItems: SidebarItem[]) => SlotContent;
    sidebarTop?: Slot;
    sidebarBottom?: Slot;

    // toc
    toc?: (headers: HeaderItem[]) => SlotContent;
    tocBefore?: Slot;
    tocAfter?: Slot;

    // home only
    heroInfo?: (props: HeroInfoSlotData) => SlotContent;
    heroLogo?: (props: HeroImageSlotData) => SlotContent;
    heroBg?: (props: HeroBackgroundSlotData) => SlotContent;
    heroBefore?: Slot;
    heroAfter?: Slot;

    // portfolio only
    portfolioInfo?: (props: PortfolioInfoSlotData) => SlotContent;
    portfolioAvatar?: (props: PortfolioAvatarSlotData) => SlotContent;
    portfolioBg?: (props: PortfolioBackgroundSlotData) => SlotContent;
  }>,

  setup(_props, { slots }) {
    const { frontmatter, page } = useData<ThemeBasePageFrontmatter>();

    return (): VNode[] => [
      h(SkipLink),
      h(
        MainLayout,
        {},
        {
          ...slots,
          default:
            slots.default ??
            ((): VNode =>
              frontmatter.value.portfolio
                ? h(PortfolioHome, {}, slots)
                : frontmatter.value.home
                  ? h(HomePage, {}, slots)
                  : h(MainFadeInUpTransition, () =>
                      h(VPPage, { key: page.value.path }, slots),
                    )),

          navScreenBottom:
            slots.navScreenBottom ??
            (hasGlobalComponent("BloggerInfo")
              ? (): SlotContent => h(resolveComponent("BloggerInfo"))
              : null),
        },
      ),
    ];
  },
});
