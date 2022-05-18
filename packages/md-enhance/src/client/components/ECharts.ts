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
import type { VNode } from "vue";

import "../styles/echarts.scss";

import { useDebounceFn, useResizeObserver } from "@vueuse/core";

declare const MARKDOWN_ENHANCE_DELAY: number;

const parseEChartsConfig = (str: string): EChartsOption =>
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
  }) as EChartsOption;

export default defineComponent({
  name: "MdECharts",

  props: {
    title: { type: String, default: "" },
    config: { type: String, required: true },
    id: { type: String, required: true },
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
        const options = parseEChartsConfig(decodeURIComponent(props.config));

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
      props.title ? h("div", { class: "echarts-title" }, props.title) : null,
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
