import { usePageFrontmatter } from "@vuepress/client";
import { defineComponent, h } from "vue";

import BlogHome from "@theme-hope/module/blog/components/BlogHome";
import BlogPage from "@theme-hope/module/blog/components/BlogPage";
import BloggerInfo from "@theme-hope/module/blog/components/BloggerInfo";
import InfoPanel from "@theme-hope/module/blog/components/InfoPanel";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import DropTransition from "@theme-hope/components/transitions/DropTransition.vue";
import SkipLink from "@theme-hope/components/SkipLink";

import type { VNode } from "vue";

import "../styles/layout.scss";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Blog",

  setup() {
    const frontmatter = usePageFrontmatter();

    return (): VNode[] => [
      h(SkipLink),
      h(
        CommonWrapper,
        { sidebar: false },
        {
          navScreenBottom: () => h(BloggerInfo),
          default: () =>
            frontmatter.value.home
              ? h(BlogHome)
              : h(
                  "main",
                  { class: "page blog", id: "main-content" },
                  h("div", { class: "blog-page-wrapper" }, [
                    h(BlogPage),
                    h(DropTransition, { delay: 0.16 }, () => h(InfoPanel)),
                  ])
                ),
        }
      ),
    ];
  },
});
