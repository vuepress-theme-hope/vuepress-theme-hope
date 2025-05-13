import type { Slot } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useFrontmatter } from "vuepress/client";

import MarkdownContent from "@theme-hope/components/base/MarkdownContent";
import PortfolioHero from "@theme-hope/components/home/PortfolioHero";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import type {
  PortfolioAvatarSlotData,
  PortfolioBackgroundSlotData,
  PortfolioInfoSlotData,
} from "@theme-hope/typings/slots";

import type { ThemePortfolioFrontmatter } from "../../../shared/index.js";

import "../../styles/home/portfolio-home.scss";

export default defineComponent({
  name: "PortfolioHome",

  slots: Object as SlotsType<{
    portfolioInfo?: Slot<PortfolioInfoSlotData>;
    portfolioAvatar?: Slot<PortfolioAvatarSlotData>;
    portfolioBg?: Slot<PortfolioBackgroundSlotData>;

    // content
    content?: Slot;
    contentBefore?: Slot;
    contentAfter?: Slot;
  }>,

  setup(_props, { slots }) {
    const frontmatter = useFrontmatter<ThemePortfolioFrontmatter>();

    return (): VNode => {
      const content = frontmatter.value.content ?? "portfolio";

      return h(
        "main",
        {
          id: "main-content",
          class: "vp-page vp-portfolio-home",
          "aria-labelledby": "main-title",
        },
        [
          h(PortfolioHero, {}, slots),
          content === "none"
            ? null
            : (slots.content?.() ??
              h(
                "div",
                h(DropTransition, { appear: true, delay: 0.24 }, () =>
                  h(
                    MarkdownContent,
                    {
                      class: {
                        "vp-portfolio-content": content === "portfolio",
                      },
                    },
                    slots,
                  ),
                ),
              )),
        ],
      );
    };
  },
});
