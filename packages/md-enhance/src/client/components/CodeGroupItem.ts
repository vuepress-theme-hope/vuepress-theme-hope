import { defineComponent, h } from "vue";
import type { VNode } from "vue";

export default defineComponent({
  name: "CodeGroupItem",

  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props, { slots }) {
    return (): VNode =>
      h(
        "div",
        {
          class: ["code-group-item", { active: props.active }],
          ariaSelected: props.active,
        },
        slots.default?.()
      );
  },
});
