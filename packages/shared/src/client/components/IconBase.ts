import { defineComponent, h } from "vue";
import type { VNode } from "vue";

/**
 * Icon Base Component
 */
export const IconBase = defineComponent({
  name: "IconBase",

  props: {
    name: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },

  setup:
    (props, { slots }) =>
    (): VNode =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          class: ["icon", `${props.name}-icon`],
          viewBox: "0 0 1024 1024",
          fill: props.color,
          "aria-label": `${props.name} icon`,
        },
        slots.default?.()
      ),
});
