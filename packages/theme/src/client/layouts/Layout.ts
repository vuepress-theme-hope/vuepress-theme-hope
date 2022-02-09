import { defineComponent, h } from "vue";
import { usePageData, usePageFrontmatter } from "@vuepress/client";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import ProjectHome from "@theme-hope/components/home/ProjectHome";
import FadeSideY from "@theme-hope/components/transitions/FadeSlideY";
import NormalPage from "@theme-hope/components/NormalPage";
import SkipLink from "@theme-hope/components/SkipLink";

import type { VNode } from "vue";
import type { HopeThemePageFrontmatter } from "../../shared";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<HopeThemePageFrontmatter>();

    return (): VNode[] => [
      h(SkipLink),
      h(CommonWrapper, {}, () =>
        frontmatter.value.home
          ? h(ProjectHome)
          : h(FadeSideY, {}, () => h(NormalPage, { key: page.value.path }))
      ),
    ];
  },
});
