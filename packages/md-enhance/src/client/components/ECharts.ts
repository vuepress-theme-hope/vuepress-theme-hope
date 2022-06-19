import { useDebounceFn, useEventListener } from "@vueuse/core";
import { defineComponent, h, onMounted, onBeforeUnmount, ref } from "vue";
import { LOADING_SVG } from "./icons";

import type { EChartsType, EChartsOption } from "echarts";
import type { PropType, VNode } from "vue";

import "../styles/echarts.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

const parseEChartsConfig = (
  config: string,
  type: "js" | "json"
): EChartsOption => {
  if (type === "json") return JSON.parse(config) as EChartsOption;

  const exports = {};
  const module = { exports };

  eval(config);

  return module.exports as EChartsOption;
};

export default defineComponent({
  name: "ECharts",

  props: {
    config: { type: String, required: true },
    id: { type: String, required: true },
    title: { type: String, default: "" },
    type: { type: String as PropType<"js" | "json">, default: "json" },
  },

  setup(props) {
    const echartsWrapper = ref<HTMLElement | null>(null);
    let chart: EChartsType;

    const loading = ref(true);

    onMounted(() => {
      void Promise.all([
        import(/* webpackChunkName: "echarts" */ "echarts"),
        // delay
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([echarts]) => {
        const options = parseEChartsConfig(
          decodeURIComponent(props.config),
          props.type
        );

        chart = echarts.init(echartsWrapper.value as HTMLElement);
        chart.showLoading();
        chart.setOption(options);
        chart.hideLoading();

        loading.value = false;
      });

      useEventListener(
        "resize",
        useDebounceFn(() => chart?.resize(), 100)
      );
    });

    onBeforeUnmount(() => {
      chart?.dispose();
    });

    return (): (VNode | null)[] => [
      props.title
        ? h("div", { class: "echarts-title" }, decodeURIComponent(props.title))
        : null,
      loading.value
        ? h("div", {
            class: "echarts-loading-wrapper",
            innerHTML: LOADING_SVG,
          })
        : null,
      h("div", {
        ref: echartsWrapper,
        class: "echarts-wrapper",
        id: props.id,
      }),
    ];
  },
});
