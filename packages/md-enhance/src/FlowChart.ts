import {
  PropType,
  defineComponent,
  markRaw,
  onBeforeUnmount,
  ref,
} from "@vue/composition-api";
import presets from "./presets";

import Loading from "@mr-hope/vuepress-shared-utils/icons/LoadingIcon.vue";

interface Parse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drawSVG: (id: string, options: any) => void;
}

let svg: Parse;

export default defineComponent({
  name: "FlowChart",

  components: { Loading },

  props: {
    id: { type: String, required: true },
    code: { type: String, required: true },
    preset: { type: String as PropType<"ant" | "vue">, default: "vue" },
  },

  setup(props) {
    const loading = ref(true);
    const scale = ref(1);

    const getScale = (width: number): number =>
      width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getPreset = (): Record<string, any> => {
      // TODO: Remove type cast in Vue3
      const preset = presets[props.preset as "vue" | "ant"];

      if (!preset) {
        console.warn(`[md-enhance:flowchart] Unknown preset: ${props.preset}`);
        return presets.vue;
      }

      return preset;
    };

    const $preset = markRaw(getPreset());

    const resize = (): void => {
      const currentScale = getScale(window.innerWidth);

      if (scale.value !== currentScale) {
        scale.value = currentScale;
        svg.drawSVG(props.id, { ...$preset, scale: currentScale });
      }
    };

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resize);
    });

    return { loading, scale, getScale, resize, $preset };
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

      svg = parse(this.code);
      this.scale = this.getScale(window.innerWidth);

      svg.drawSVG(this.id, { ...this.$preset, scale: this.scale });
      this.loading = false;

      window.addEventListener("resize", this.resize);
    });
  },
});
