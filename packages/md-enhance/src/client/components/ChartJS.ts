import { LoadingIcon, decodeData, useDarkMode } from "@vuepress/helper/client";
import { watchImmediate } from "@vueuse/core";
import type { Chart, ChartConfiguration } from "chart.js";
import type { PropType, VNode } from "vue";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
} from "vue";

import "../styles/chartjs.scss";

const parseChartConfig = (
  config: string,
  type: "js" | "json",
): ChartConfiguration => {
  if (type === "json") return JSON.parse(config) as ChartConfiguration;

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const runner = new Function(
    `\
let config,__chart_js_config__;
{
${config}
__chart_js_config__=config;
}
return __chart_js_config__;\
`,
  ) as () => ChartConfiguration;

  return runner();
};

export default defineComponent({
  name: "ChartJS",

  props: {
    /**
     * Chart config
     *
     * 图表配置
     */
    config: {
      type: String,
      required: true,
    },

    /**
     * Chart id
     *
     * 图表 id
     */
    id: {
      type: String,
      required: true,
    },

    /**
     * Chart title
     *
     * 图表标题
     */
    title: String,

    /**
     * Chart config type
     *
     * 图表配置类型
     */
    type: {
      type: String as PropType<"js" | "json">,
      default: "json",
    },
  },

  setup(props) {
    const isDarkMode = useDarkMode();
    const chartElement = shallowRef<HTMLElement>();
    const chartCanvasElement = shallowRef<HTMLCanvasElement>();

    const loading = ref(true);

    const config = computed(() => decodeData(props.config));

    let chartjs: Chart | null;

    const renderChart = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return;

      const [{ default: ChartJs }] = await Promise.all([
        import(/* webpackChunkName: "chart" */ "chart.js/auto"),
      ]);

      ChartJs.defaults.borderColor = isDarkMode.value ? "#ccc" : "#36A2EB";
      ChartJs.defaults.color = isDarkMode.value ? "#fff" : "#000";
      ChartJs.defaults.maintainAspectRatio = false;

      const data = parseChartConfig(config.value, props.type);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ctx = chartCanvasElement.value!.getContext("2d")!;

      chartjs?.destroy();
      chartjs = new ChartJs(ctx, data);

      loading.value = false;
    };

    onMounted(() => {
      watchImmediate(isDarkMode, () => renderChart(), {
        flush: "post",
      });
    });

    onUnmounted(() => {
      chartjs?.destroy();
      chartjs = null;
    });

    return (): (VNode | null)[] => [
      props.title
        ? h("div", { class: "chartjs-title" }, decodeURIComponent(props.title))
        : null,
      loading.value
        ? h(LoadingIcon, { class: "chartjs-loading", height: 192 })
        : null,
      h(
        "div",
        {
          ref: chartElement,
          class: "chartjs-wrapper",
          id: props.id,
          style: {
            display: loading.value ? "none" : "block",
          },
        },
        h("canvas", {
          ref: chartCanvasElement,
          height: 400,
        }),
      ),
    ];
  },
});
