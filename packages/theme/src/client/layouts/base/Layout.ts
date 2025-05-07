import type { HeaderItem } from "@vuepress/helper/client";
import { hasGlobalComponent } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";

import MainFadeInUpTransition from "@theme-hope/components/base/MainFadeInUpTransition";
import MainLayout from "@theme-hope/components/base/MainLayout";
import SkipLink from "@theme-hope/components/base/SkipLink";
import VPPage from "@theme-hope/components/base/VPPage";
import type {
  HeroBackgroundData,
  HeroImageData,
  HeroInfoData,
} from "@theme-hope/components/home/HeroInfo";
import HomePage from "@theme-hope/components/home/HomePage";
import type {
  PortfolioAvatar,
  PortfolioBackground,
  PortfolioInfo,
} from "@theme-hope/components/home/PortfolioHero";
import PortfolioHome from "@theme-hope/components/home/PortfolioHome";
import { useData } from "@theme-hope/composables/useData";
import type { SidebarItem } from "@theme-hope/utils/sidebar/typings";

import type { ThemeBasePageFrontmatter } from "../../../shared/index.js";

export default defineComponent({
  name: "Layout",

  slots: Object as SlotsType<{
    default?: () => VNode | VNode[] | null;

    // page
    pageTop?: () => VNode[] | VNode | null;
    pageBottom?: () => VNode[] | VNode | null;

    // content
    content?: () => VNode[] | VNode | null;
    contentBefore?: () => VNode[] | VNode | null;
    contentAfter?: () => VNode[] | VNode | null;

    // navbar
    navScreenTop?: () => VNode | VNode[] | null;
    navScreenBottom?: () => VNode | VNode[] | null;

    // sidebar
    sidebarItems?: (sidebarItems: SidebarItem[]) => VNode | VNode[] | null;
    sidebarTop?: () => VNode | VNode[] | null;
    sidebarBottom?: () => VNode | VNode[] | null;

    // toc
    toc?: (headers: HeaderItem[]) => VNode[] | VNode | null;
    tocBefore?: () => VNode[] | VNode | null;
    tocAfter?: () => VNode[] | VNode | null;

    // home only
    heroInfo?: (props: HeroInfoData) => VNode[] | VNode | null;
    heroLogo?: (props: HeroImageData) => VNode[] | VNode | null;
    heroBg?: (props: HeroBackgroundData) => VNode[] | VNode | null;
    heroBefore?: () => VNode[] | VNode | null;
    heroAfter?: () => VNode[] | VNode | null;

    // portfolio only
    portfolioInfo?: (props: PortfolioInfo) => VNode[] | VNode | null;
    portfolioAvatar?: (props: PortfolioAvatar) => VNode[] | VNode | null;
    portfolioBg?: (props: PortfolioBackground) => VNode[] | VNode | null;
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
              ? (): VNode | VNode[] | null => h(resolveComponent("BloggerInfo"))
              : null),
        },
      ),
    ];
  },
});
