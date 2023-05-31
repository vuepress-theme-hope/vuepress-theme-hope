import { usePageFrontmatter } from "@vuepress/client";
import { isArray } from "@vuepress/shared";
import { type SlotsType, type VNode, computed, defineComponent, h } from "vue";

import FeaturePanel from "@theme-hope/components/FeaturePanel";
import HeroInfo from "@theme-hope/components/HeroInfo";
import HighlightPanel from "@theme-hope/components/HighlightPanel";
import MarkdownContent from "@theme-hope/components/MarkdownContent";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { usePure } from "@theme-hope/composables/index";

import {
  type ThemeProjectHomeFeatureOptions,
  type ThemeProjectHomeItemOption,
  type ThemeProjectHomePageFrontmatter,
} from "../../shared/index.js";

import "../styles/home-page.scss";

export default defineComponent({
  name: "HomePage",

  slots: Object as SlotsType<{
    top?: () => VNode | VNode[];
    center?: () => VNode | VNode[];
    bottom?: () => VNode | VNode[];
  }>,

  setup(_props, { slots }) {
    const pure = usePure();
    const frontmatter = usePageFrontmatter<ThemeProjectHomePageFrontmatter>();

    const features = computed(() => {
      const { features } = frontmatter.value;

      if (isArray(features))
        return features.some((item) => !("features" in item))
          ? [{ features: features as ThemeProjectHomeItemOption[] }]
          : (features as ThemeProjectHomeFeatureOptions[]);

      return null;
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
              : h(HighlightPanel, highlight)
          ) ||
            features.value?.map(({ header = "", features }, index) =>
              h(
                DropTransition,
                { appear: true, delay: 0.16 + index * 0.08 },
                () => h(FeaturePanel, { header, features })
              )
            ),
          slots.center?.(),
          h(
            DropTransition,
            {
              appear: true,
              delay: 0.16 + (features.value?.length || 0) * 0.08,
            },
            () => h(MarkdownContent)
          ),
          slots.bottom?.(),
        ]
      );
  },
});
