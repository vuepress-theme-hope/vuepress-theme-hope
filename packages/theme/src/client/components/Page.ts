import { Content } from "@vuepress/client";
import { defineComponent, h, resolveComponent } from "vue";
import PageMeta from "./PageMeta.vue";
import PageNav from "./PageNav.vue";

import type { VNode } from "vue";

export default defineComponent({
  name: "Page",

  setup(_props, { slots }) {
    return (): VNode =>
      h("main", { class: "page" }, [
        slots.top?.(),
        h(resolveComponent("PageInfo")),
        h("div", { class: "theme-default-content" }, h(Content)),
        h(PageMeta),
        h(PageNav),
        h(resolveComponent("Comment")),
        slots.bottom?.(),
      ]);
  },
});
