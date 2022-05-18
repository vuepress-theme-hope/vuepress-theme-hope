import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  markRaw,
} from "vue";
import { LOADING_SVG } from "./icons";

import { EChartsType } from "echarts";
import type { EChartsOption } from "echarts/types/dist/shared";
import type { PropType, VNode } from "vue";

import "../styles/echarts.scss";

import { useDebounceFn, useResizeObserver } from "@vueuse/core";

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
  name: "MdECharts",

  props: {
    config: { type: String, required: true },
    id: { type: String, required: true },
    title: { type: String, default: "" },
    type: { type: String as PropType<"js" | "json">, default: "json" },
  },

  setup(props) {
    const echartsWrapper = ref<HTMLElement | null>(null);
    const chart = ref<EChartsType | null>(null);

    const loading = ref(true);

    const resizeChart = useDebounceFn(() => {
      chart.value?.resize();
    }, 10);

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

        chart.value = markRaw(
          echarts.init(echartsWrapper.value as HTMLElement)
        );
        chart.value.showLoading();
        chart.value.setOption(options);
        chart.value.hideLoading();

        loading.value = false;
      });

      useResizeObserver(echartsWrapper, () => {
        resizeChart();
      });
    });

    onBeforeUnmount(() => {
      chart.value?.dispose();
    });

    return (): (VNode | null)[] => [
      props.title
        ? h("div", { class: "echarts-title" }, decodeURIComponent(props.title))
        : null,
      loading.value
        ? h("div", {
            class: ["echarts-loading-wrapper"],
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
