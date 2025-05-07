import type { SlotContent } from "@vuepress/helper/client";
import type { Slot, SlotsType, VNode } from "vue";
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
    portfolioInfo?: (props: PortfolioInfoSlotData) => SlotContent;
    portfolioAvatar?: (props: PortfolioAvatarSlotData) => SlotContent;
    portfolioBg?: (props: PortfolioBackgroundSlotData) => SlotContent;

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
          h(
            PortfolioHero,
            {},
            {
              info: slots.portfolioInfo,
              avatar: slots.portfolioAvatar,
              bg: slots.portfolioBg,
            },
          ),
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
