import { defineComponent, h } from "vue";
import { useThemeData } from "@theme-hope/composables";

import type { VNode } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Icon",

  props: {
    icon: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const themeData = useThemeData();

    return (): VNode | null =>
      props.icon
        ? h("span", {
            class: ["icon", `${themeData.value.iconPrefix}${props.icon}`],
          })
        : null;
  },
});
