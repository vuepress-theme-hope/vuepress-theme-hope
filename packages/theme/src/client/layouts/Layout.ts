import { defineComponent, h, resolveComponent } from "vue";
import { usePageData, usePageFrontmatter } from "@vuepress/client";

import { FadeSlideY } from "@theme-hope/components/transitions";
import SkipLink from "@theme-hope/components/SkipLink";
import { useMobile } from "@theme-hope/composables";
import { useBlogOptions } from "@theme-hope/module/blog/composables";

import type { ComponentOptions, VNode } from "vue";
import type { HopeThemePageFrontmatter } from "../../shared";

declare const ENABLE_BLOG: boolean;

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<HopeThemePageFrontmatter>();
    const blogOptions = useBlogOptions();
    const isMobile = useMobile();

    return (): VNode[] => [
      h(SkipLink),
      h(
        resolveComponent("CommonWrapper") as ComponentOptions,
        {},
        {
          default: () =>
            frontmatter.value.home
              ? h(resolveComponent("HomePage"))
              : h(FadeSlideY, () =>
                  h(resolveComponent("NormalPage"), { key: page.value.path })
                ),
          ...(ENABLE_BLOG && blogOptions.value.sidebarDisplay !== "none"
            ? { navScreenBottom: () => h(resolveComponent("BloggerInfo")) }
            : {}),
          ...(ENABLE_BLOG &&
          !isMobile.value &&
          blogOptions.value.sidebarDisplay == "always"
            ? { sidebar: () => h(resolveComponent("BloggerInfo")) }
            : {}),
        }
      ),
    ];
  },
});
