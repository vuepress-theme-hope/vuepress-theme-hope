import Vue from "vue";
import type { VNodeChildren } from "vue";

interface ElementOption {
  class: string[];
  style: Record<string, string>;
  "data-color"?: string;
}

export default Vue.extend({
  name: "Badge",

  functional: true,

  props: {
    type: { type: String, default: "tip" },
    text: { type: String, default: "" },
    vertical: { type: String, default: "top" },
    color: { type: String, default: "" },
  },

  render(h, { props, slots }) {
    const options: ElementOption = {
      class: ["badge", props.type],
      style: { verticalAlign: props.vertical },
    };

    if (props.color) {
      options.class.push("diy");
      options.style.backgroundColor = props.color;
      options["data-color"] = props.color;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return h("span", options, props.text || (slots().default as VNodeChildren));
  },
});
