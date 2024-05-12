import { defineComponent, h } from "vue";
import type { VNode } from "vue";

import MarkdownContent from "@theme-hope/components/MarkdownContent";
import { DropTransition } from "@theme-hope/components/transitions/DropTransition";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import PortfolioHero from "@theme-hope/components/PortfolioHero";
import { usePageFrontmatter } from "vuepress/client";
import type { PortfolioHomeFrontmatter } from "../../shared/index.js";

export default defineComponent({
  name: "PortfolioHome",

  setup() {
    const frontmatter = usePageFrontmatter<PortfolioHomeFrontmatter>();

    return (): VNode[] => [
      h(CommonWrapper, () => [
        h(PortfolioHero),
        frontmatter.value.content
          ? h(
              "div",
              { class: "vp-page vp-portfolio" },
              h(DropTransition, { appear: true, delay: 0.24 }, () =>
                h(MarkdownContent),
              ),
            )
          : null,
      ]),
    ];
  },
});
