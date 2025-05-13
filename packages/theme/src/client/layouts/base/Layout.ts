import type { Slot, SlotContent } from "@vuepress/helper/client";
import { hasGlobalComponent } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";

import MainFadeInUpTransition from "@theme-hope/components/base/MainFadeInUpTransition";
import MainLayout from "@theme-hope/components/base/MainLayout";
import PageContent from "@theme-hope/components/base/PageContent";
import SkipLink from "@theme-hope/components/base/SkipLink";
import HomePage from "@theme-hope/components/home/HomePage";
import PortfolioHome from "@theme-hope/components/home/PortfolioHome";
import { useData } from "@theme-hope/composables/useData";
import type {
  HeroBackgroundSlotData,
  HeroInfoSlotData,
  HeroLogoSlotData,
  PortfolioAvatarSlotData,
  PortfolioBackgroundSlotData,
  PortfolioInfoSlotData,
  SidebarItemsSlotData,
  TocSlotData,
} from "@theme-hope/typings/slots";

import type { ThemeBasePageFrontmatter } from "../../../shared/index.js";

export default defineComponent({
  name: "Layout",

  slots: Object as SlotsType<{
    default?: Slot;

    // navbar
    navScreenTop?: Slot;
    navScreenBottom?: Slot;

    // sidebar
    sidebarItems?: Slot<SidebarItemsSlotData>;
    sidebarTop?: Slot;
    sidebarBottom?: Slot;

    // page
    pageTop?: Slot;
    pageBottom?: Slot;

    // content
    content?: Slot;
    contentBefore?: Slot;
    contentAfter?: Slot;

    // toc
    toc?: Slot<TocSlotData>;
    tocBefore?: Slot;
    tocAfter?: Slot;

    // home only
    heroInfo?: Slot<HeroInfoSlotData>;
    heroLogo?: Slot<HeroLogoSlotData>;
    heroBg?: Slot<HeroBackgroundSlotData>;
    heroBefore?: Slot;
    heroAfter?: Slot;

    // portfolio only
    portfolioInfo?: Slot<PortfolioInfoSlotData>;
    portfolioAvatar?: Slot<PortfolioAvatarSlotData>;
    portfolioBg?: Slot<PortfolioBackgroundSlotData>;
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
                      h(PageContent, { key: page.value.path }, slots),
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
