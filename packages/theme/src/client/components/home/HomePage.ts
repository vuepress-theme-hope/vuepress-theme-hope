import type { Slot } from "@vuepress/helper/client";
import { isArray } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useFrontmatter } from "vuepress/client";

import MarkdownContent from "@theme-hope/components/base/MarkdownContent";
import FeatureSection from "@theme-hope/components/home/FeatureSection";
import HeroInfo from "@theme-hope/components/home/HeroInfo";
import HighlightPanel from "@theme-hope/components/home/HighlightSection";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import type {
  HeroBackgroundSlotData,
  HeroInfoSlotData,
  HeroLogoSlotData,
} from "@theme-hope/typings/slots";

import type { ThemeProjectHomePageFrontmatter } from "../../../shared/index.js";

import "../../styles/home/home-page.scss";

export default defineComponent({
  name: "HomePage",

  slots: Object as SlotsType<{
    heroInfo?: Slot<HeroInfoSlotData>;
    heroLogo?: Slot<HeroLogoSlotData>;
    heroBg?: Slot<HeroBackgroundSlotData>;
    heroBefore?: Slot;
    heroAfter?: Slot;

    // content
    content?: Slot;
    contentBefore?: Slot;
    contentAfter?: Slot;
  }>,

  setup(_props, { slots }) {
    const frontmatter = useFrontmatter<ThemeProjectHomePageFrontmatter>();

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
          h(HeroInfo, {}, slots),
          slots.heroAfter?.(),
          isArray(highlights)
            ? highlights.map((highlight) =>
                "features" in highlight
                  ? h(FeatureSection, highlight)
                  : h(HighlightPanel, highlight),
              )
            : isArray(features)
              ? h(DropTransition, { appear: true, delay: 0.24 }, () =>
                  h(FeatureSection, { features }),
                )
              : null,
          slots.content?.() ??
            h(DropTransition, { appear: true, delay: 0.32 }, () =>
              h(MarkdownContent, {}, slots),
            ),
        ],
      );
    };
  },
});
