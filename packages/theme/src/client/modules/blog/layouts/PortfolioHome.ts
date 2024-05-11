import { defineComponent } from "vue";
import { h } from "vue";

import MarkdownContent from "@theme-hope/components/MarkdownContent";
import { DropTransition } from "@theme-hope/components/transitions/DropTransition";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import PortfolioHero from "@theme-hope/modules/blog/components/PortfolioHero";
import { usePageFrontmatter } from "vuepress/client";
import type { PortfolioHomeFrontmatter } from "../../../../shared/index.js";

export default defineComponent({
  name: "PortfolioHome",

  setup() {
    const frontmatter = usePageFrontmatter<PortfolioHomeFrontmatter>();

    return () => [
      h(BlogWrapper, () => [
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
