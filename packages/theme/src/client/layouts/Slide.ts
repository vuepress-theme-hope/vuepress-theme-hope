import { defineComponent, h } from "vue";
import SlidePage from "vuepress-plugin-md-enhance/client/SlidePage";
import type { VNode } from "vue";

export default defineComponent({
  name: "Slide",

  setup() {
    return (): VNode => h(SlidePage);
  },
});
