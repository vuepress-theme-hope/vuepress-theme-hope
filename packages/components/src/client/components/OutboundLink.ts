import { useLocaleConfig } from "@mr-hope/vuepress-shared/client";
import { OutboundLink } from "@vuepress/client";
import { defineComponent, h } from "vue";

import { componentI18n } from "../define";

import type { VNode } from "vue";

export default defineComponent({
  name: "OutboundLink",

  setup() {
    const componentLocale = useLocaleConfig(componentI18n);

    return (): VNode =>
      h(OutboundLink, {
        default: () =>
          h(
            "span",
            { class: "sr-only" },
            componentLocale.value.openInNewWindow
          ),
      });
  },
});
