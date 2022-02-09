import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import debounce from "lodash.debounce";
import presets from "../flowchart-preset";

import type * as Flowchart from "flowchart.js";
import type { PropType, VNode } from "vue";

import "../styles/flowchart.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

export default defineComponent({
  name: "FlowChart",

  props: {
    code: { type: String, required: true },
    id: { type: String, required: true },
    preset: {
      type: String as PropType<"ant" | "pie" | "vue">,
      default: "vue",
    },
  },

  setup(props) {
    let svg: Flowchart.Instance;
    let resize: () => void;
    const element = ref<HTMLDivElement>();

    const loading = ref(true);
    const scale = ref(1);

    const preset = computed<Record<string, unknown>>(() => {
      const preset = presets[props.preset];

      if (!preset) {
        console.warn(`[md-enhance:flowchart] Unknown preset: ${props.preset}`);

        return presets.vue;
      }

      return preset;
    });

    const getScale = (width: number): number =>
      width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;

    onMounted(() => {
      element.value?.setAttribute("id", props.id);

      void Promise.all([
        import(/* webpackChunkName: "flowchart" */ "flowchart.js"),
        // delay
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([flowchart]) => {
        const { parse } = flowchart;

        svg = parse(decodeURIComponent(props.code));

        // update scale
        scale.value = getScale(window.innerWidth);

        loading.value = false;

        // draw svg to #id
        svg.drawSVG(props.id, { ...preset.value, scale: scale.value });

        resize = debounce(() => {
          const newScale = getScale(window.innerWidth);

          if (scale.value !== newScale) {
            scale.value = newScale;

            svg.drawSVG(props.id, { ...preset.value, scale: newScale });
          }
        }, 100);

        window.addEventListener("resize", resize);
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resize);
    });

    return (): (VNode | null)[] => [
      loading.value
        ? h("div", {
            class: ["flowchart-loading-wrapper"],
            innerHTML:
              '<svg xmlns="http://www.w3.org/2000/svg" class="loading-icon" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"/><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"/></circle><circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.3333333333333333s"/><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.3333333333333333s"/></circle><circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.6666666666666666s"/><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.6666666666666666s"/></circle></svg>',
          })
        : null,
      h("div", {
        ref: element,
        class: ["flowchart-wrapper", props.preset],
        style: {
          display: loading.value ? "none" : "block",
        },
      }),
    ];
  },
});
