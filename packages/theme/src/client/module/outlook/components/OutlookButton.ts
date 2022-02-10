import { defineComponent, h, ref, watch } from "vue";
import { useRoute } from "vue-router";

import OutlookSettings from "@theme-hope/module/outlook/components/OutlookSettings";
import { OutlookIcon } from "@theme-hope/module/outlook/components/icons";

import type { VNode } from "vue";

import "../styles/outlook-button.scss";

export default defineComponent({
  name: "OutlookButton",

  setup() {
    const route = useRoute();
    const open = ref(false);

    watch(
      () => route.path,
      () => {
        open.value = false;
      }
    );

    return (): VNode =>
      h(
        "div",
        { class: "nav-item" },
        h(
          "button",
          {
            class: ["outlook-button", { open: open.value }],
            tabindex: "-1",
            ariaHidden: true,
          },
          [
            h(OutlookIcon),
            h("div", { class: "outlook-dropdown" }, h(OutlookSettings)),
          ]
        )
      );
  },
});
