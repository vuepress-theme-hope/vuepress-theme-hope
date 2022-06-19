import { defineComponent, h, onMounted, ref } from "vue";
import { LOADING_SVG } from "./icons";

import type { ChartConfiguration } from "chart.js";
import type { PropType, VNode } from "vue";

import "../styles/chart.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

const parseChartConfig = (
  config: string,
  type: "js" | "json"
): ChartConfiguration => {
  if (type === "json") return JSON.parse(config) as ChartConfiguration;

  const exports = {};
  const module = { exports };

  eval(config);

  return module.exports as ChartConfiguration;
};

export default defineComponent({
  name: "ChartJS",

  props: {
    config: { type: String, required: true },
    id: { type: String, required: true },
    title: { type: String, default: "" },
    type: { type: String as PropType<"js" | "json">, default: "json" },
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

        const data = parseChartConfig(
          decodeURIComponent(props.config),
          props.type
        );
        const ctx = chartCanvasElement.value?.getContext(
          "2d"
        ) as CanvasRenderingContext2D;

        new Chart(ctx, data);

        loading.value = false;
      });
    });

    return (): (VNode | null)[] => [
      props.title
        ? h("div", { class: "chart-title" }, decodeURIComponent(props.title))
        : null,
      loading.value
        ? h("div", {
            class: "chart-loading-wrapper",
            innerHTML: LOADING_SVG,
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
