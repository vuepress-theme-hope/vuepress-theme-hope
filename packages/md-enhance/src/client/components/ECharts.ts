import { LoadingIcon, decodeData, wait } from "@vuepress/helper/client";
import { useDebounceFn, useEventListener } from "@vueuse/core";
import type { EChartsOption, EChartsType } from "echarts";
import type { PropType, VNode } from "vue";
import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
} from "vue";

import { useEChartsConfig } from "../helpers/index.js";
import "../styles/echarts.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

interface EChartsConfig {
  width?: number;
  height?: number;
  option: EChartsOption;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const AsyncFunction = (async (): Promise<void> => {}).constructor;

const parseEChartsConfig = (
  config: string,
  type: "js" | "json",
  myChart: EChartsType,
): Promise<EChartsConfig> => {
  if (type === "js") {
    // eslint-disable-next-line
    const runner = AsyncFunction(
      "myChart",
      `\
let width,height,option,__echarts_config__;
{
${config}
__echarts_config__={width,height,option};
}
return __echarts_config__;
`,
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return runner(myChart) as Promise<EChartsConfig>;
  }

  return Promise.resolve({ option: JSON.parse(config) as EChartsOption });
};

export default defineComponent({
  name: "ECharts",

  props: {
    /**
     * ECharts config
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
    const echartsConfig = useEChartsConfig();

    const loading = ref(true);
    const echartsContainer = shallowRef<HTMLElement>();

    let chart: EChartsType;

    useEventListener(
      "resize",
      useDebounceFn(() => chart?.resize(), 100),
    );

    onMounted(() => {
      void Promise.all([
        import(/* webpackChunkName: "echarts" */ "echarts"),
        // Delay
        wait(MARKDOWN_ENHANCE_DELAY),
      ]).then(async ([echarts]) => {
        await echartsConfig.setup?.();

        chart = echarts.init(echartsContainer.value);

        const { option, ...size } = await parseEChartsConfig(
          decodeData(props.config),
          props.type,
          chart,
        );

        chart.resize(size);
        chart.setOption({ ...echartsConfig.option, ...option });

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
