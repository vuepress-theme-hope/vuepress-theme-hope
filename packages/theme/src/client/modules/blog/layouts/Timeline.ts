import { defineComponent, h } from "vue";

import ArticleType from "@theme-hope/modules/blog/components/ArticleType.js";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper.js";
import CategoryList from "@theme-hope/modules/blog/components/CategoryList.js";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel.js";
import TagList from "@theme-hope/modules/blog/components/TagList.js";
import TimelineItems from "@theme-hope/modules/blog/components/TimelineItems.js";
import DropTransition from "@theme-hope/components/transitions/DropTransition.js";

import type { VNode } from "vue";

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
          { class: "page blog" },
          h("div", { class: "blog-page-wrapper" }, [
            h("main", { class: "blog-main", id: "main-content" }, [
              h(DropTransition, { appear: true, delay: 0.24 }, () =>
                h(TimelineItems)
              ),
            ]),
            h(DropTransition, { delay: 0.16 }, () => h(InfoPanel)),
          ])
        )
      );
  },
});
