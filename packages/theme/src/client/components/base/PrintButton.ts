import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import { PrintIcon } from "@theme-hope/components/info/icons";
import { useMetaLocale } from "@theme-hope/composables/info/useMetaLocale";
import { useTheme } from "@theme-hope/composables/useTheme";

import "../../styles/info/print-button.scss";

export default defineComponent({
  name: "PrintButton",

  setup() {
    const metaLocale = useMetaLocale();
    const theme = useTheme();

    return (): VNode | null =>
      theme.value.print === false
        ? null
        : h(
            "button",
            {
              type: "button",
              class: "print-button",
              title: metaLocale.value.print,
              onClick: () => {
                window.print();
              },
            },
            h(PrintIcon),
          );
  },
});
