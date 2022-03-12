import { defineComponent, h, onMounted, ref } from "vue";
import { loadingSvgString } from "./icons";

import type { ChartConfiguration } from "chart.js";
import type { VNode } from "vue";

import "../styles/chart.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

const parseChartConfig = (str: string): ChartConfiguration =>
  JSON.parse(str, (_key, value) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (typeof value !== "string" || value.length < 8) return value;

    const prefix = value.substring(0, 8);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (prefix === "function") return eval(`(${value})`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (prefix === "_PxEgEr_") return eval(value.slice(8));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (prefix === "_NuFrRa_") return eval(value.slice(8));

    return value;
  }) as ChartConfiguration;

export default defineComponent({
  name: "ChartJS",

  props: {
    title: { type: String, default: "" },
    config: { type: String, required: true },
    id: { type: String, required: true },
  },

  setup(props) {
    const chartElement = ref<HTMLElement | null>(null);
    const chartCanvasElement = ref<HTMLCanvasElement | null>(null);

    const loading = ref(true);

    onMounted(() => {
      void Promise.all([
        import(/* webpackChunkName: "chart" */ "chart.js/auto"),
        // delay
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([{ default: Chart }]) => {
        Chart.defaults.maintainAspectRatio = false;

        const data = parseChartConfig(decodeURIComponent(props.config));
        const ctx = chartCanvasElement.value?.getContext(
          "2d"
        ) as CanvasRenderingContext2D;

        new Chart(ctx, data);

        loading.value = false;
      });
    });

    return (): (VNode | null)[] => [
      props.title ? h("div", { class: "chart-title" }, props.title) : null,
      loading.value
        ? h("div", {
            class: ["chart-loading-wrapper"],
            innerHTML: loadingSvgString,
          })
        : null,
      h(
        "div",
        {
          ref: chartElement,
          class: "chart-wrapper",
          id: props.id,
          style: {
            display: loading.value ? "none" : "block",
          },
        },
        h("canvas", {
          ref: chartCanvasElement,
          height: 400,
        })
      ),
    ];
  },
});
