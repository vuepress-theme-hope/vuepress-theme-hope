import { defineComponent, h } from "vue";
import SlidePage from "vuepress-plugin-md-enhance/lib/client/SlidePage";
import type { VNode } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Slide",

  setup() {
    return (): VNode => h(SlidePage);
  },
});
