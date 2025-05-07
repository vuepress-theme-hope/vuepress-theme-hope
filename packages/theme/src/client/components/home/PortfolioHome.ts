import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useFrontmatter } from "vuepress/client";

import MarkdownContent from "@theme-hope/components/base/MarkdownContent";
import type {
  PortfolioAvatar,
  PortfolioBackground,
  PortfolioInfo,
} from "@theme-hope/components/home/PortfolioHero";
import PortfolioHero from "@theme-hope/components/home/PortfolioHero";
import DropTransition from "@theme-hope/components/transitions/DropTransition";

import type { ThemePortfolioFrontmatter } from "../../../shared/index.js";

import "../../styles/home/portfolio-home.scss";

export default defineComponent({
  name: "PortfolioHome",

  slots: Object as SlotsType<{
    portfolioInfo?: (props: PortfolioInfo) => VNode[] | VNode | null;
    portfolioAvatar?: (props: PortfolioAvatar) => VNode[] | VNode | null;
    portfolioBg?: (props: PortfolioBackground) => VNode[] | VNode | null;

    // content
    content?: () => VNode[] | VNode | null;
    contentBefore?: () => VNode[] | VNode | null;
    contentAfter?: () => VNode[] | VNode | null;
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
