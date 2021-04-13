import Vue from "vue";
import Loading from "./icons/LoadingIcon.vue";
import debounce from "lodash.debounce";
import presets from "./presets";
import * as Flowchart from "flowchart.js";

import type { PropType } from "vue";

let svg: Flowchart.Instance;

export default Vue.extend({
  name: "FlowChart",

  components: { Loading },

  props: {
    id: { type: String, required: true },
    preset: { type: String as PropType<"ant" | "vue">, default: "vue" },
  },

  data: () => ({
    loading: true,
    scale: 1,
  }),

  computed: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $preset(): Record<string, any> {
      const preset = presets[this.preset as "ant" | "vue"];

      if (!preset) {
        console.warn(`[md-enhance:flowchart] Unknown preset: ${this.preset}`);
        return presets.vue;
      }

      return preset;
    },

    resize(): () => void {
      return debounce(() => {
        const scale = this.getScale(window.innerWidth);

        if (this.scale !== scale) {
          this.scale = scale;
          svg.drawSVG(this.id, { ...this.$preset, scale });
        }
      }, 100);
    },
  },

  mounted(): void {
    const delay = (): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, 500));

    this.$el.setAttribute("id", this.id);

    void Promise.all([
      import(/* webpackChunkName: "flowchart" */ "flowchart.js"),
      delay(),
    ]).then(([flowchart]) => {
      const { parse } = flowchart;

      svg = parse(
        decodeURIComponent((this.$el as HTMLElement).dataset.code || "")
      );
      this.scale = this.getScale(window.innerWidth);

      svg.drawSVG(this.id, { ...this.$preset, scale: this.scale });
      this.loading = false;

      window.addEventListener("resize", this.resize);
    });
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy(): void {
    window.removeEventListener("resize", this.resize);
  },

  methods: {
    getScale(width: number): number {
      return width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;
    },
  },
});
