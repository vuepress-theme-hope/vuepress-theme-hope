import { OutboundLink, useRouteLocale } from "@vuepress/client";
import { defineComponent, h } from "vue";

import { componentI18n } from "../define";

import type { VNode } from "vue";

export default defineComponent({
  name: "OutboundLink",

  setup() {
    return (): VNode =>
      h(
        OutboundLink,
        h(
          "span",
          { class: "sr-only" },
          componentI18n[useRouteLocale().value].openInNewWindow
        )
      );
  },
});
