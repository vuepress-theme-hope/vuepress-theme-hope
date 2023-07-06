import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import ArticleType from "@theme-hope/modules/blog/components/ArticleType";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import CategoryList from "@theme-hope/modules/blog/components/CategoryList";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel";
import TagList from "@theme-hope/modules/blog/components/TagList";
import TimelineItems from "@theme-hope/modules/blog/components/TimelineItems";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Timeline",

  components: {
    ArticleType,
    CategoryList,
    TagList,
  },

  setup() {
    return (): VNode =>
      h(BlogWrapper, () =>
        h(
          "div",
          { class: "vp-page vp-blog" },
          h("div", { class: "blog-page-wrapper" }, [
            h("main", { id: "main-content", class: "vp-blog-main" }, [
              h(DropTransition, { appear: true, delay: 0.24 }, () =>
                h(TimelineItems),
              ),
            ]),
            h(DropTransition, { delay: 0.16 }, () =>
              h(InfoPanel, { key: "blog" }),
            ),
          ]),
        ),
      );
  },
});
