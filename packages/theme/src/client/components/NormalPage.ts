import { defineComponent, h, resolveComponent } from "vue";
import MarkdownContent from "./MarkdownContent";
import PageMeta from "./PageMeta";
import PageNav from "./PageNav";

import type { VNode } from "vue";

export default defineComponent({
  name: "NormalPage",

  setup(_props, { slots }) {
    return (): VNode =>
      h("main", { class: "page" }, [
        slots.top?.(),
        h(resolveComponent("PageInfo")),
        h(MarkdownContent),
        h(PageMeta),
        h(PageNav),
        h(resolveComponent("Comment")),
        slots.bottom?.(),
      ]);
  },
});
