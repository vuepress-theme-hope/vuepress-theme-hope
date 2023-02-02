import { type VNode, defineComponent, h } from "vue";

import BlogHome from "@theme-hope/modules/blog/components/BlogHome";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";

export default defineComponent({
  name: "BlogHome",

  setup() {
    return (): VNode => h(BlogWrapper, () => h(BlogHome));
  },
});
