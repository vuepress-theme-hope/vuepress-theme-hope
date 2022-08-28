import { usePageFrontmatter } from "@vuepress/client";
import { defineComponent, h, resolveComponent } from "vue";

import BlogHome from "@theme-hope/modules/blog/components/BlogHome.js";
import BlogPage from "@theme-hope/modules/blog/components/BlogPage.js";
import BloggerInfo from "@theme-hope/modules/blog/components/BloggerInfo.js";
import InfoList from "@theme-hope/modules/blog/components/InfoList.js";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel.js";
import DropTransition from "@theme-hope/components/transitions/DropTransition.js";
import SkipLink from "@theme-hope/components/SkipLink.js";
import { useMobile } from "@theme-hope/composables/index.js";

import type { ComponentOptions, VNode } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Blog",

  setup() {
    const frontmatter = usePageFrontmatter();
    const isMobile = useMobile();

    return (): VNode[] => [
      h(SkipLink),
      h(
        <ComponentOptions>resolveComponent("CommonWrapper"),
        { sidebar: false },
        {
          default: () =>
            frontmatter.value["home"]
              ? h(BlogHome)
              : h(
                  "main",
                  { class: "page blog", id: "main-content" },
                  h("div", { class: "blog-page-wrapper" }, [
                    h(BlogPage),
                    h(DropTransition, { delay: 0.16 }, () => h(InfoPanel)),
                  ])
                ),
          navScreenBottom: () => h(BloggerInfo),
          ...(isMobile.value ? { sidebar: () => h(InfoList) } : {}),
        }
      ),
    ];
  },
});
