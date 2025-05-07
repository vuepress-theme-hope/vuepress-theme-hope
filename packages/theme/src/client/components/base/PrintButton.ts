import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import { PrintIcon } from "@theme-hope/components/info/icons";
import { useData } from "@theme-hope/composables/useData";

import "../../styles/info/print-button.scss";

export default defineComponent({
  name: "PrintButton",

  setup() {
    const { theme, themeLocale } = useData();

    return (): VNode | null =>
      theme.value.print === false
        ? null
        : h(
            "button",
            {
              type: "button",
              class: "print-button",
              title: themeLocale.value.metaLocales.print,
              onClick: () => {
                window.print();
              },
            },
            h(PrintIcon),
          );
  },
});
