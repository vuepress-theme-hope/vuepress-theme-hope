import { defineComponent, h } from "vue";
import BlogInfoList from "./BlogInfoList";
import BloggerInfo from "./BloggerInfo";
import DropTransition from "../transitions/DropTransition.vue";

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
