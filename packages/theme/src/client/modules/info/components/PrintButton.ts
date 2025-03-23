import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import {
  useThemeData,
  useThemeLocaleData,
} from "@theme-hope/composables/index";
import { PrintIcon } from "@theme-hope/modules/info/components/icons";

import "../styles/print-button.scss";

export default defineComponent({
  name: "PrintButton",

  setup() {
    const theme = useThemeData();
    const themeLocale = useThemeLocaleData();

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
