import { keys } from "@vuepress/helper/client";
import type { CSSProperties, VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import "../styles/font-icon.scss";

declare const FONT_ICON_TYPE: string;
declare const FONT_ICON_PREFIX: string;

const isIconify = FONT_ICON_TYPE === "iconify";
const isFontAwesome = FONT_ICON_TYPE === "fontawesome";

export default defineComponent({
  name: "FontIcon",

  props: {
    /**
     * Icon class
     *
     * 图标类名
     */
    icon: { type: String, default: "" },
    /**
     * Icon color
     *
     * 图标颜色
     */
    color: { type: String, default: "" },

    /**
     * Icon size
     *
     * 图标大小
     */
    size: {
      type: [String, Number],
      default: "",
    },

    /**
     * Icon vertical align
     *
     * 图标垂直对齐方式
     */
    verticalAlign: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const classNames = computed(() => {
      const classList = ["font-icon icon"];
      const iconClass = `${FONT_ICON_PREFIX}${props.icon}`;

      if (isFontAwesome) classList.push("fa-fw fa-sm");

      if (isFontAwesome)
        classList.push(props.icon.includes(" ") ? props.icon : iconClass);
      else if (!isIconify) classList.push(iconClass);

      return classList;
    });

    const style = computed(() => {
      const styleObject: CSSProperties = {};

      if (props.color) styleObject.color = props.color;

      if (props.size)
        styleObject.fontSize = Number.isNaN(Number(props.size))
          ? (props.size as string)
          : `${props.size}px`;
      if (props.verticalAlign) styleObject.verticalAlign = props.verticalAlign;

      return keys(styleObject).length ? styleObject : null;
    });

    return (): VNode | null =>
      props.icon
        ? h(isIconify ? "iconify-icon" : "span", {
            key: props.icon,
            class: classNames.value,
            style: style.value,
            ...(isIconify
              ? {
                  mode: "style",
                  inline: "",
                  icon: `${FONT_ICON_PREFIX}${props.icon}`,
                  width: "1em",
                  height: "1em",
                }
              : {}),
          })
        : null;
  },
});
