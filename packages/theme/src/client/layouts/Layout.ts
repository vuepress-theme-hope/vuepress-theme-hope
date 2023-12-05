import { usePageData, usePageFrontmatter } from "@vuepress/client";
import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h, resolveComponent } from "vue";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import SkipLink from "@theme-hope/components/SkipLink";
import FadeSlideY from "@theme-hope/components/transitions/FadeSlideY";
import {
  useThemeData,
  useThemeLocaleData,
  useWindowSize,
} from "@theme-hope/composables/index";

import type { ThemePageFrontmatter } from "../../shared/index.js";

declare const ENABLE_BLOG: boolean;

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
    const { isMobile } = useWindowSize();

    const sidebarDisplay = computed(() =>
      ENABLE_BLOG
        ? themeLocale.value.blog?.sidebarDisplay ||
          themeData.value.blog?.sidebarDisplay ||
          "mobile"
        : "none",
    );

    return (): VNode[] => [
      h(SkipLink),
      h(
        CommonWrapper,
        {},
        {
          default: () =>
            slots.default?.() ||
            (frontmatter.value.home
              ? h(HomePage)
              : h(FadeSlideY, () =>
                  h(
                    NormalPage,
                    { key: page.value.path },
                    {
                      top: () => slots.top?.(),
                      bottom: () => slots.bottom?.(),
                      contentBefore: () => slots.contentBefore?.(),
                      contentAfter: () => slots.contentAfter?.(),
                      tocBefore: () => slots.tocBefore?.(),
                      tocAfter: () => slots.tocAfter?.(),
                    },
                  ),
                )),
          ...(sidebarDisplay.value !== "none"
            ? { navScreenBottom: () => h(resolveComponent("BloggerInfo")) }
            : {}),
          ...(!isMobile.value && sidebarDisplay.value === "always"
            ? { sidebar: () => h(resolveComponent("BloggerInfo")) }
            : {}),
        },
      ),
    ];
  },
});
