import { usePageFrontmatter } from "@vuepress/client";
import { isArray } from "@vuepress/shared";
import { type SlotsType, type VNode, computed, defineComponent, h } from "vue";

import FeaturePanel from "@theme-hope/components/FeaturePanel";
import HeroInfo from "@theme-hope/components/HeroInfo";
import MarkdownContent from "@theme-hope/components/MarkdownContent";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { usePure } from "@theme-hope/composables/index";

import {
  type ThemeProjectHomeFeatureItemOptions,
  type ThemeProjectHomeFeatureOptions,
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
        return features.some((item) => !("items" in item))
          ? [{ items: features as ThemeProjectHomeFeatureItemOptions[] }]
          : (features as ThemeProjectHomeFeatureOptions[]);

      return [];
    });

    return (): VNode =>
      h(
        "main",
        {
          class: ["home project", { pure: pure.value }],
          id: "main-content",
          "aria-labelledby":
            frontmatter.value.heroText === null ? undefined : "main-title",
        },
        [
          slots.top?.(),
          h(HeroInfo),
          features.value.map(({ header = "", items }, index) =>
            h(
              DropTransition,
              { appear: true, delay: 0.16 + index * 0.08 },
              () => h(FeaturePanel, { header, items })
            )
          ),
          slots.center?.(),
          h(
            DropTransition,
            { appear: true, delay: 0.16 + features.value.length * 0.08 },
            () => h(MarkdownContent)
          ),
          slots.bottom?.(),
        ]
      );
  },
});
