import { computed, defineComponent, h } from "vue";
import type { VNode } from "vue";

import "../styles/badge.scss";

interface ElementOption {
  class: string[];
  style: Record<string, string>;
  "data-color"?: string;
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Badge",

  props: {
    type: { type: String, default: "tip" },
    text: { type: String, default: "" },
    vertical: { type: String, default: "top" },
    color: { type: String, default: "" },
  },

  setup(props, { slots }) {
    const options = computed<ElementOption>(() => {
      const result: ElementOption = {
        class: ["badge", props.type],
        style: { verticalAlign: props.vertical },
      };

      if (props.color) {
        result.class.push("diy");
        result.style.backgroundColor = props.color;
        result["data-color"] = props.color;
      }

      return result;
    });

    return (): VNode =>
      h("span", options.value, props.text || slots.default?.());
  },
});
