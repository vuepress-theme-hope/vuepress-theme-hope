import { defineComponent, h } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import DropTransition from "../transitions/DropTransition.vue";
import HomeFeatures from "./HomeFeatures";
import MarkdownContent from "../MarkdownContent";
import ProjectHero from "./ProjectHero";

import type { VNode } from "vue";
import type { ProjectHomePageFrontmatter } from "../../../shared";

export default defineComponent({
  name: "ProjectHome",

  setup() {
    const frontmatter = usePageFrontmatter<ProjectHomePageFrontmatter>();

    return (): VNode =>
      h(
        "main",
        {
          class: "home",
          "aria-labelledby":
            frontmatter.value.heroText === null ? undefined : "main-title",
        },
        [
          h(ProjectHero),
          h(
            DropTransition,
            { delay: 0.16 },
            { default: () => h(HomeFeatures) }
          ),
          h(
            DropTransition,
            { delay: 0.24 },
            { default: () => h(MarkdownContent) }
          ),
        ]
      );
  },
});
