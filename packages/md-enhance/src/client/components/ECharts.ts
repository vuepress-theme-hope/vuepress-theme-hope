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
  config: string,
  type: "js" | "json",
  myChart: EChartsType
): EchartsConfig => {
  if (type === "js") {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const runner = new Function(
      "myChart",
      `\
let width,height,option,__echarts_config__;
{
${config}
__echarts_config__={width,height,option};
}
return __echarts_config__;
`
    );

    return <EchartsConfig>runner(myChart);
  }

  return { option: <EChartsOption>JSON.parse(config) };
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
