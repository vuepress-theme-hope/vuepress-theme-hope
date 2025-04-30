import { isArray } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { usePageFrontmatter } from "vuepress/client";

import FeaturePanel from "@theme-hope/components/FeaturePanel";
import HeroInfo from "@theme-hope/components/HeroInfo";
import HighlightPanel from "@theme-hope/components/HighlightPanel";
import MarkdownContent from "@theme-hope/components/MarkdownContent";
import { DropTransition } from "@theme-hope/components/transitions/index";

import type { ThemeProjectHomePageFrontmatter } from "../../shared/index.js";

import "../styles/home-page.scss";

export default defineComponent({
  name: "HomePage",

  slots: Object as SlotsType<{
    heroBefore?: () => VNode[] | VNode | null;
    heroAfter?: () => VNode[] | VNode | null;
    homeContent?: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter<ThemeProjectHomePageFrontmatter>();

    return (): VNode => {
      const { features, highlights } = frontmatter.value;

      return h(
        "main",
        {
          id: "main-content",
          class: "vp-page vp-project-home",
          "aria-labelledby":
            frontmatter.value.heroText === "" ? "" : "main-title",
        },
        [
          slots.heroBefore?.(),
          h(HeroInfo),
          slots.heroAfter?.(),
          isArray(highlights)
            ? highlights.map((highlight) =>
                "features" in highlight
                  ? h(FeaturePanel, highlight)
                  : h(HighlightPanel, highlight),
              )
            : isArray(features)
              ? h(DropTransition, { appear: true, delay: 0.24 }, () =>
                  h(FeaturePanel, { features }),
                )
              : null,
          slots.homeContent?.() ??
            h(DropTransition, { appear: true, delay: 0.32 }, () =>
              h(MarkdownContent),
            ),
        ],
      );
    };
  },
});
