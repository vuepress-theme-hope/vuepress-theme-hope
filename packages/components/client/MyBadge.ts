/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, Prop, Vue } from "vue-property-decorator";
import { ComponentOptions } from "vue";

// Functional Component Hack
interface FunctionalComponentOptions extends ComponentOptions<Vue> {
  functional?: boolean;
}

interface ElementOption {
  class: string[];
  style: Record<string, string>;
  "data-color"?: string;
}

@Component({
  name: "MyBadge",
  functional: true,
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

    return h("span", options, props.text || slots().default);
  },
} as FunctionalComponentOptions)
export default class MyBadge extends Vue {
  @Prop({ type: String, default: "tip" })
  private readonly type!: string;

  @Prop({ type: String, default: "" })
  private readonly text!: string;

  @Prop({ type: String, default: "top" })
  private readonly vertical!: string;

  @Prop({ type: String, default: "" })
  private readonly color!: string;
}
