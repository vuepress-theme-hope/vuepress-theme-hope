import { useDebounceFn, useEventListener } from "@vueuse/core";
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";
import { atou } from "vuepress-shared/client";
import { LoadingIcon } from "./icons.js";

import type { EChartsOption, EChartsType } from "echarts";
import type { PropType, VNode } from "vue";

import "../styles/echarts.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

const parseEChartsConfig = (
  config: string,
  type: "js" | "json"
): EChartsOption => {
  if (type === "js") {
    const exports = {};
    const module = { exports };

    eval(config);

    return <EChartsOption>module.exports;
  }

  return <EChartsOption>JSON.parse(config);
};

export default defineComponent({
  name: "ECharts",

  props: {
    /**
     * echarts config
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
    const echartsWrapper = ref<HTMLElement>();
    let chart: EChartsType;

    const loading = ref(true);

    onMounted(() => {
      void Promise.all([
        import(/* webpackChunkName: "echarts" */ "echarts"),
        // delay
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([echarts]) => {
        const options = parseEChartsConfig(atou(props.config), props.type);

        chart = echarts.init(echartsWrapper.value!);
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
        ? h("div", { class: "echarts-loading-wrapper" }, h(LoadingIcon))
        : null,
      h("div", {
        ref: echartsWrapper,
        class: "echarts-wrapper",
        id: props.id,
      }),
    ];
  },
});
