import { defineComponent, h } from "vue";

import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper.js";
import BlogHome from "@theme-hope/modules/blog/components/BlogHome.js";

import type { VNode } from "vue";

export default defineComponent({
  name: "BlogHome",

  setup() {
    return (): VNode => h(BlogWrapper, () => h(BlogHome));
  },
});
