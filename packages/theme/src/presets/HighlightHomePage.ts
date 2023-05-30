import { usePageFrontmatter } from "@vuepress/client";
import { type VNode, defineComponent, h } from "vue";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import SkipLink from "@theme-hope/components/SkipLink";

import { type HighlightSection } from "./HighLightSection.js";
import HighlightPanel from "./HighlightPanel.js";
import { type ThemeProjectHomePageFrontmatter } from "../shared/index.js";

import "./highlight-homepage.scss";

export default defineComponent({
  name: "HighlightHomePage",

  setup() {
    const frontmatter = usePageFrontmatter<
      ThemeProjectHomePageFrontmatter & { highlights?: HighlightSection[] }
    >();

    return (): VNode[] => [
      h(SkipLink),
      h(CommonWrapper, { containerClass: "vp-highlight-homepage" }, () =>
        h(
          HomePage,
          {},
          {
            center: () =>
              frontmatter.value.highlights
                ? h(HighlightPanel, { items: frontmatter.value.highlights })
                : null,
          }
        )
      ),
    ];
  },
});
