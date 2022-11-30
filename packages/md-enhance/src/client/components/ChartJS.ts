import { defineComponent, h, onMounted, ref } from "vue";
import { atou } from "vuepress-shared/client";
import { LoadingIcon } from "./icons.js";

import type { ChartConfiguration } from "chart.js";
import type { PropType, VNode } from "vue";

import "../styles/chart.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

const parseChartConfig = (
  config: string,
  type: "js" | "json"
): ChartConfiguration => {
  if (type === "json") return <ChartConfiguration>JSON.parse(config);

  const exports = {};
  const module = { exports };

  eval(config);

  return <ChartConfiguration>module.exports;
};

export default defineComponent({
  name: "ChartJS",

  props: {
    /**
     * Chart config
     *
     * 图表配置
     */
    config: { type: String, required: true },

    /**
     * Chart id
     *
     * 图表 id
     */
    id: { type: String, required: true },

    /**
     * Chart title
     *
     * 图表标题
     */
    title: { type: String, default: "" },

    /**
     * Chart config type
     *
     * 图表配置类型
     */
    type: { type: String as PropType<"js" | "json">, default: "json" },
  },

  setup(props) {
    const chartElement = ref<HTMLElement>();
    const chartCanvasElement = ref<HTMLCanvasElement>();

    const loading = ref(true);

    onMounted(() => {
      void Promise.all([
        import(/* webpackChunkName: "chart" */ "chart.js/auto"),
        // delay
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([{ default: Chart }]) => {
        Chart.defaults.maintainAspectRatio = false;

        const data = parseChartConfig(atou(props.config), props.type);
        const ctx = chartCanvasElement.value!.getContext("2d")!;

        new Chart(ctx, data);

        loading.value = false;
      });
    });

    return (): (VNode | null)[] => [
      props.title
        ? h("div", { class: "chart-title" }, decodeURIComponent(props.title))
        : null,
      loading.value
        ? h("div", { class: "chart-loading-wrapper" }, h(LoadingIcon))
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
