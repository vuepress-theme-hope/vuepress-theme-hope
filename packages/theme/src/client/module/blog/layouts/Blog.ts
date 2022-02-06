import { usePageFrontmatter } from "@vuepress/client";
import { defineComponent, h } from "vue";

import BlogHome from "@theme-hope/module/blog/components/BlogHome";
import BlogInfo from "@theme-hope/module/blog/components/BlogInfo";
import BlogPage from "@theme-hope/module/blog/components/BlogPage";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import DropTransition from "@theme-hope/components/transitions/DropTransition.vue";

import type { VNode } from "vue";

import "../styles/blog/index.scss";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Blog",

  setup() {
    const frontmatter = usePageFrontmatter();

    return (): VNode =>
      h(
        CommonWrapper,
        { sidebar: false },
        {
          sidebarBottom: () => h(BlogInfo),
          default: () =>
            frontmatter.value.home
              ? h(BlogHome)
              : h(
                  "main",
                  { class: "page blog" },
                  h("div", { class: "blog-page-wrapper" }, [
                    h(BlogPage),
                    h(DropTransition, { delay: 0.16 }, () => h(BlogInfo)),
                  ])
                ),
        }
      );
  },
});
