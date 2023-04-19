import { useDebounceFn, useEventListener } from "@vueuse/core";
import { type EChartsOption, type EChartsType } from "echarts";
import {
  type PropType,
  type VNode,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
} from "vue";
import { LoadingIcon, atou } from "vuepress-shared/client";

import "../styles/echarts.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

interface EchartsConfig {
  width?: number;
  height?: number;
  option: EChartsOption;
}

const parseEChartsConfig = (
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __echarts_config__: string,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __echarts_config_type__: "js" | "json",
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  myChart: EChartsType
): EchartsConfig => {
  if (__echarts_config_type__ === "js") {
    // provide globals
    const exports: Partial<EchartsConfig> = {};
    const module = { exports };

    // eslint-disable-next-line prefer-const
    let option: EChartsOption | undefined = undefined;
    // eslint-disable-next-line prefer-const
    let width: number | undefined = undefined;
    // eslint-disable-next-line prefer-const
    let height: number | undefined = undefined;

    eval(__echarts_config__);

    return <EchartsConfig>{
      option,
      width,
      height,
      // eslint-disable-next-line import/no-commonjs
      ...module.exports,
    };
  }

  return { option: <EChartsOption>JSON.parse(__echarts_config__) };
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
    const loading = ref(true);
    const echartsContainer = ref<HTMLElement>();

    let chart: EChartsType;

    useEventListener(
      "resize",
      useDebounceFn(() => chart?.resize(), 100)
    );

    onMounted(() => {
      void Promise.all([
        import(/* webpackChunkName: "echarts" */ "echarts"),
        // delay
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([echarts]) => {
        chart = echarts.init(echartsContainer.value!);

        const { option, ...size } = parseEChartsConfig(
          atou(props.config),
          props.type,
          chart
        );

        chart.resize(size);
        chart.setOption(option);

        loading.value = false;
      });
    });

    onUnmounted(() => {
      chart?.dispose();
    });

    return (): (VNode | null)[] => [
      props.title
        ? h("div", { class: "echarts-title" }, decodeURIComponent(props.title))
        : null,
      h("div", { class: "echarts-wrapper" }, [
        h("div", {
          ref: echartsContainer,
          class: "echarts-container",
          id: props.id,
        }),
        loading.value
          ? h(LoadingIcon, { class: "echarts-loading", height: 360 })
          : null,
      ]),
    ];
  },
});
