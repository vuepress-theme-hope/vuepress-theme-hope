import { computed, defineComponent, h } from "vue";
import type { VNode } from "vue";

import MarkdownContent from "@theme-hope/components/MarkdownContent";
import { DropTransition } from "@theme-hope/components/transitions/DropTransition";
import PortfolioHero from "@theme-hope/components/PortfolioHero";
import { usePageFrontmatter } from "vuepress/client";
import type { PortfolioHomeFrontmatter } from "../../shared/index.js";

export default defineComponent({
  name: "PortfolioHome",

  setup() {
    const frontmatter = usePageFrontmatter<PortfolioHomeFrontmatter>();

    const content = computed(() => frontmatter.value.content ?? "portfolio");

    return (): VNode =>
      h(
        "main",
        {
          id: "main-content",
          class: [
            "vp-page vp-portfolio-home",
            { custom: content.value === "portfolio" },
          ],
          "aria-labelledby": "main-title",
        },
        [
          h(PortfolioHero),
          content.value === "none"
            ? null
            : h(
                "div",
                {},
                h(DropTransition, { appear: true, delay: 0.24 }, () =>
                  h(MarkdownContent),
                ),
              ),
        ],
      );
  },
});
