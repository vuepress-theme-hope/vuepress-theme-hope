import { defineComponent, h } from "vue";

import DropTransition from "@theme-hope/components/transitions/DropTransition.vue";
import BlogInfoList from "@theme-hope/module/blog/components/BlogInfoList";
import BloggerInfo from "@theme-hope/module/blog/components/BloggerInfo";

import type { VNode } from "vue";

export default defineComponent({
  name: "BlogInfo",

  setup() {
    return (): VNode =>
      h("aside", { class: "blog-info-wrapper" }, [
        h(DropTransition, () => h(BloggerInfo)),
        h(DropTransition, { delay: 0.04 }, () => h(BlogInfoList)),
      ]);
  },
});
