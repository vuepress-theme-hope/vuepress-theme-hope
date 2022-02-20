import { defineComponent, h } from "vue";

import { DropTransition } from "@theme-hope/components/transitions";
import BloggerInfo from "@theme-hope/module/blog/components/BloggerInfo";
import InfoList from "@theme-hope/module/blog/components/InfoList";

import type { VNode } from "vue";

import "../styles/info-panel.scss";

export default defineComponent({
  name: "InfoPanel",

  setup() {
    return (): VNode =>
      h("aside", { class: "blog-info-wrapper" }, [
        h(DropTransition, () => h(BloggerInfo)),
        h(DropTransition, { delay: 0.04 }, () => h(InfoList)),
      ]);
  },
});
