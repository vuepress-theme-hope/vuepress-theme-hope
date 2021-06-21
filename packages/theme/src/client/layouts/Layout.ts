import { defineComponent, h } from "vue";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import Common from "@Common";
import FadeSideY from "../components/transitions/FadeSlideY";
import Home from "../components/Home.vue";
import Page from "../components/Page";

import type { VNode } from "vue";
import type { HopeThemePageFrontmatter } from "../../shared";

export default defineComponent({
  name: "Layout",

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<HopeThemePageFrontmatter>();

    return (): VNode =>
      h(
        Common,
        {},
        {
          default: () =>
            frontmatter.value.home
              ? h(Home)
              : h(
                  FadeSideY,
                  {},
                  { default: () => h(Page, { key: page.value.path }) }
                ),
        }
      );
  },
});
