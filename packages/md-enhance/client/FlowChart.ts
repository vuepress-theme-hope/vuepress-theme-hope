import { Component, Prop, Vue } from "vue-property-decorator";
import Loading from "@mr-hope/vuepress-shared-utils/icons/LoadingIcon.vue";
import debounce from "lodash.debounce";
import presets from "./presets";
import * as Flowchart from "flowchart.js";

let svg: Flowchart.Instance;

@Component({ components: { Loading } })
export default class FlowChart extends Vue {
  @Prop({ type: String, required: true })
  private readonly id!: string;

  @Prop({ type: String, required: true })
  private readonly code!: string;

  @Prop({ type: String, default: "vue" })
  private readonly preset!: "ant" | "vue";

  private loading = true;

  private scale = 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private get $preset(): Record<string, any> {
    const preset = presets[this.preset];

    if (!preset) {
      console.warn(`[md-enhance:flowchart] Unknown preset: ${this.preset}`);
      return presets.vue;
    }

    return preset;
  }

  private get resize(): () => void {
    return debounce(() => {
      const scale = this.getScale(window.innerWidth);

      if (this.scale !== scale) {
        this.scale = scale;
        svg.drawSVG(this.id, { ...this.$preset, scale });
      }
    }, 100);
  }

  private mounted(): void {
    const delay = (): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, 500));

    this.$el.setAttribute("id", this.id);

    void Promise.all([
      import(/* webpackChunkName: "flowchart" */ "flowchart.js"),
      delay(),
    ]).then(([flowchart]) => {
      const { parse } = flowchart;

      svg = parse(this.code);
      this.scale = this.getScale(window.innerWidth);

      svg.drawSVG(this.id, { ...this.$preset, scale: this.scale });
      this.loading = false;

      window.addEventListener("resize", this.resize);
    });
  }

  private beforeDestory(): void {
    window.removeEventListener("resize", this.resize);
  }

  private getScale(width: number): number {
    return width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;
  }
}
