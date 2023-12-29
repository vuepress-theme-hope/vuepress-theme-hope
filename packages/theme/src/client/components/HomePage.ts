import { usePageFrontmatter } from "@vuepress/client";
import { isArray } from "@vuepress/shared";
import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import FeaturePanel from "@theme-hope/components/FeaturePanel";
import HeroInfo from "@theme-hope/components/HeroInfo";
import HighlightPanel from "@theme-hope/components/HighlightPanel";
import MarkdownContent from "@theme-hope/components/MarkdownContent";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { usePure } from "@theme-hope/composables/index";

import type { ThemeProjectHomePageFrontmatter } from "../../shared/index.js";

import "../styles/home-page.scss";

export default defineComponent({
  name: "HomePage",

  slots: Object as SlotsType<{
    top?: () => VNode[] | VNode | null;
    center?: () => VNode[] | VNode | null;
    bottom?: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const pure = usePure();
    const frontmatter = usePageFrontmatter<ThemeProjectHomePageFrontmatter>();

    const features = computed(() => {
      const { features } = frontmatter.value;

      return isArray(features) ? features : null;
    });

    const highlights = computed(() => {
      const { highlights } = frontmatter.value;

      if (isArray(highlights)) return highlights;

      return null;
    });

    return (): VNode =>
      h(
        "main",
        {
          id: "main-content",
          class: ["vp-project-home ", { pure: pure.value }],
          "aria-labelledby":
            frontmatter.value.heroText === null ? "" : "main-title",
        },
        [
          slots.top?.(),
          h(HeroInfo),
          highlights.value?.map((highlight) =>
            "features" in highlight
              ? h(FeaturePanel, highlight)
              : h(HighlightPanel, highlight),
          ) ||
            (features.value
              ? h(DropTransition, { appear: true, delay: 0.24 }, () =>
                  h(FeaturePanel, { features: features.value! }),
                )
              : null),
          slots.center?.(),
          h(
            DropTransition,
            {
              appear: true,
              delay: 0.32,
            },
            () => h(MarkdownContent),
          ),
          slots.bottom?.(),
        ],
      );
  },
});
