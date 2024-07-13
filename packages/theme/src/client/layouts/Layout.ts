import { hasGlobalComponent } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h, resolveComponent } from "vue";
import { usePageData, usePageFrontmatter } from "vuepress/client";
import { RenderDefault } from "vuepress-shared/client";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import PortfolioHome from "@theme-hope/components/PortfolioHome";
import SkipLink from "@theme-hope/components/SkipLink";
import { FadeSlideY } from "@theme-hope/components/transitions/index";
import {
  usePure,
  useThemeData,
  useThemeLocaleData,
  useWindowSize,
} from "@theme-hope/composables/index";

import type { ThemePageFrontmatter } from "../../shared/index.js";

declare const __VP_BLOG__: boolean;

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",

  slots: Object as SlotsType<{
    default?: () => VNode | VNode[] | null;

    top?: () => VNode[] | VNode | null;
    bottom?: () => VNode[] | VNode | null;

    contentBefore?: () => VNode[] | VNode | null;
    contentAfter?: () => VNode[] | VNode | null;

    tocBefore?: () => VNode[] | VNode | null;
    tocAfter?: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const page = usePageData();
    const frontmatter = usePageFrontmatter<ThemePageFrontmatter>();
    const isPure = usePure();
    const { isMobile } = useWindowSize();

    const sidebarDisplay = computed(() =>
      __VP_BLOG__
        ? (themeLocale.value.blog?.sidebarDisplay ??
          themeData.value.blog?.sidebarDisplay ??
          "mobile")
        : "none",
    );

    return (): VNode[] => [
      h(SkipLink),
      h(
        CommonWrapper,
        {},
        {
          default: () =>
            slots.default?.() ??
            (frontmatter.value["portfolio"]
              ? h(PortfolioHome)
              : frontmatter.value.home
                ? h(HomePage)
                : h(isPure.value ? RenderDefault : FadeSlideY, () =>
                    h(
                      NormalPage,
                      { key: page.value.path },
                      {
                        top: slots.top
                          ? (): VNode | VNode[] | null => slots.top!()
                          : null,
                        bottom: slots.bottom
                          ? (): VNode | VNode[] | null => slots.bottom!()
                          : null,
                        contentBefore: slots.contentBefore
                          ? (): VNode | VNode[] | null => slots.contentBefore!()
                          : null,
                        contentAfter: slots.contentAfter
                          ? (): VNode | VNode[] | null => slots.contentAfter!()
                          : null,
                        tocBefore: slots.tocBefore
                          ? (): VNode | VNode[] | null => slots.tocBefore!()
                          : null,
                        tocAfter: slots.tocAfter
                          ? (): VNode | VNode[] | null => slots.tocAfter!()
                          : null,
                      },
                    ),
                  )),

          navScreenBottom:
            sidebarDisplay.value === "none" && hasGlobalComponent("BloggerInfo")
              ? (): VNode | VNode[] | null => h(resolveComponent("BloggerInfo"))
              : null,

          sidebar:
            !isMobile.value &&
            sidebarDisplay.value === "always" &&
            hasGlobalComponent("BloggerInfo")
              ? (): VNode | VNode[] | null => h(resolveComponent("BloggerInfo"))
              : null,
        },
      ),
    ];
  },
});
