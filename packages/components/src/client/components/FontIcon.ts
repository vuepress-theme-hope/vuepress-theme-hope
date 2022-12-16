import { computed, defineComponent, h } from "vue";
import type { VNode } from "vue";

import "../styles/font-icon.scss";

declare const ICON_PREFIX: string;

export default defineComponent({
  name: "FontIcon",

  props: {
    /**
     * Icon class
     *
     * 图标类名
     */
    icon: String,

    /**
     * Icon color
     *
     * 图标颜色
     */
    color: String,

    /**
     * Icon size
     *
     * 图标大小
     */
    size: [String, Number],
  },

  setup(props) {
    const style = computed(() => {
      const styleObject: Record<string, string> = {};

      if (props.color) {
        styleObject["color"] = props.color;
      }

      if (props.size) {
        styleObject["font-size"] = Number.isNaN(Number(props.size))
          ? <string>props.size
          : `${props.size}px`;
      }

      return Object.keys(styleObject).length ? styleObject : null;
    });

    return (): VNode | null =>
      props.icon
        ? h("span", {
            class: ["font-icon icon", `${ICON_PREFIX}${props.icon}`],
            style: style.value,
          })
        : null;
  },
});
