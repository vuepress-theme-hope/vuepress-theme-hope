import { RenderDefault, hasGlobalComponent } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import PortfolioHome from "@theme-hope/components/PortfolioHome";
import SkipLink from "@theme-hope/components/SkipLink";
import { FadeInUpTransition } from "@theme-hope/components/transitions/index";
import { useData, usePure } from "@theme-hope/composables/index";

import type { ThemeBasePageFrontmatter } from "../../shared/index.js";

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

    // home only
    heroBefore?: () => VNode[] | VNode | null;
    heroAfter?: () => VNode[] | VNode | null;
    homeContent?: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const { frontmatter, page } = useData<ThemeBasePageFrontmatter>();
    const isPure = usePure();

    return (): VNode[] => [
      h(SkipLink),
      h(
        CommonWrapper,
        {},
        {
          default: () =>
            slots.default?.() ??
            (frontmatter.value.portfolio
              ? h(PortfolioHome)
              : frontmatter.value.home
                ? h(
                    HomePage,
                    {},
                    {
                      heroBefore: slots.heroBefore,
                      heroAfter: slots.heroAfter,
                      homeContent: slots.homeContent,
                    },
                  )
                : h(isPure.value ? RenderDefault : FadeInUpTransition, () =>
                    h(
                      NormalPage,
                      { key: page.value.path },
                      {
                        top: slots.top,
                        bottom: slots.bottom,
                        contentBefore: slots.contentBefore,
                        contentAfter: slots.contentAfter,
                        tocBefore: slots.tocBefore,
                        tocAfter: slots.tocAfter,
                      },
                    ),
                  )),

          navScreenBottom: hasGlobalComponent("BloggerInfo")
            ? (): VNode | VNode[] | null => h(resolveComponent("BloggerInfo"))
            : null,
        },
      ),
    ];
  },
});
