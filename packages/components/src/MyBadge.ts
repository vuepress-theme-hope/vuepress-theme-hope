import { defineComponent, h } from "@vue/composition-api";
import { VNode } from "vue";

interface ElementOption {
  class: string[];
  style: Record<string, string>;
  "data-color"?: string;
}

export default defineComponent({
  name: "MyBadge",
  props: {
    type: { type: String, default: "tip" },

    text: { type: String, default: "" },

    vertical: { type: String, default: "top" },

    color: { type: String, default: "" },
  },

  setup(props, { slots }) {
    const options: ElementOption = {
      class: ["badge", props.type],
      style: { verticalAlign: props.vertical },
    };

    if (props.color) {
      options.class.push("diy");
      // eslint-disable-next-line vue/no-setup-props-destructure
      options.style.backgroundColor = props.color;
      // eslint-disable-next-line vue/no-setup-props-destructure
      options["data-color"] = props.color;
    }

    return (): VNode => h("span", options, props.text || slots.default());
  },
});
