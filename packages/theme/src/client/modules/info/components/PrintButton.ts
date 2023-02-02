import { type VNode, defineComponent, h } from "vue";

import { useThemeData } from "@theme-hope/composables/index";
import { PrintIcon } from "@theme-hope/modules/info/components/icons";

import "../styles/print-button.scss";

export default defineComponent({
  name: "PrintButton",

  setup() {
    const themeData = useThemeData();

    return (): VNode | null =>
      themeData.value.print === false
        ? null
        : h(
            "button",
            {
              class: "print-button",
              title: "print",
              onClick: () => {
                window.print();
              },
            },
            h(PrintIcon)
          );
  },
});
