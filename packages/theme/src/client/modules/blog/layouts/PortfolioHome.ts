import type { FunctionalComponent } from "vue";
import { h } from "vue";

import MarkdownContent from "@theme-hope/components/MarkdownContent";
import { DropTransition } from "@theme-hope/components/transitions/DropTransition";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import PortfolioHero from "@theme-hope/modules/blog/components/PortfolioHero";

const PortfolioHome: FunctionalComponent = () =>
  h(BlogWrapper, () => [
    h(PortfolioHero),
    h(
      "div",
      { class: "vp-page vp-portfolio" },
      h(DropTransition, { appear: true, delay: 0.24 }, () =>
        h(MarkdownContent),
      ),
    ),
  ]);

PortfolioHome.displayName = "PortfolioHome";

export default PortfolioHome;
