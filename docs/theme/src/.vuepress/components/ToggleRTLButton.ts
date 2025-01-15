import type { VNode } from "vue";
import { defineComponent, h, ref, resolveComponent } from "vue";

import "./toggle-rtl-button.scss";

export default defineComponent({
  name: "ToggleRTLButton",

  setup() {
    const isRTL = ref(false);

    const toggleRTL = (): void => {
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
        h(resolveComponent("VPIcon"), {
          icon: `toggle-${isRTL.value ? "on" : "off"} 2xl`,
        }),
      );
  },
});
