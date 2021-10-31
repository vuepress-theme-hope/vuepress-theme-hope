import { defineComponent, h } from "vue";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import CommonWrapper from "@CommonWrapper";
import FadeSideY from "../components/transitions/FadeSlideY";
import ProjectHome from "../components/ProjectHome.vue";
import MainContent from "../components/MainContent";

import type { VNode } from "vue";
import type { HopeThemePageFrontmatter } from "../../shared";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<HopeThemePageFrontmatter>();

    return (): VNode =>
      h(
        CommonWrapper,
        {},
        {
          default: () =>
            frontmatter.value.home
              ? h(ProjectHome)
              : h(
                  FadeSideY,
                  {},
                  { default: () => h(MainContent, { key: page.value.path }) }
                ),
        }
      );
  },
});
