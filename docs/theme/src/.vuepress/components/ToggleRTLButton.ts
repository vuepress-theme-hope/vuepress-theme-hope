import type { VNode } from "vue";
import { defineComponent, h, ref } from "vue";

import "./toggle-rtl-button.scss";

export default defineComponent({
  name: "ToggleRTLButton",

  setup() {
    const isRTL = ref(false);

    const toggleRTL = () => {
      const { documentElement } = document;

      if (isRTL.value) {
        documentElement.removeAttribute("dir");
        documentElement.style.removeProperty("direction");
      } else {
        documentElement.setAttribute("dir", "rtl");
        documentElement.style.setProperty("direction", "rtl");
      }

      isRTL.value = !isRTL.value;
    };

    return (): VNode =>
      h(
        "button",
        { type: "button", class: "toggle-rtl-button", onClick: toggleRTL },
        h("span", {
          key: isRTL.value ? "on" : "off",
          class: [`fas fa-fw fa-2xl fa-toggle-${isRTL.value ? "on" : "off"}`],
        }),
      );
  },
});
