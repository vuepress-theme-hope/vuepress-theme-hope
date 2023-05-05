import { type ChartConfiguration } from "chart.js";
import {
  type PropType,
  type VNode,
  defineComponent,
  h,
  onMounted,
  ref,
  shallowRef,
} from "vue";
import { LoadingIcon, atou } from "vuepress-shared/client";

import "../styles/chart.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

const parseChartConfig = (
  config: string,
  type: "js" | "json"
): ChartConfiguration => {
  if (type === "json") return <ChartConfiguration>JSON.parse(config);

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const runner = new Function(
    `\
let config,__chart_js_config__;
{
${config}
__chart_js_config__=config;
}
return __chart_js_config__;\
`
  );

  return <ChartConfiguration>runner();
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
    title: {
      type: String,
      default: "",
    },

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
    const chartElement = shallowRef<HTMLElement>();
    const chartCanvasElement = shallowRef<HTMLCanvasElement>();

    const loading = ref(true);

    onMounted(async () => {
      const [{ default: Chart }] = await Promise.all([
        import(/* webpackChunkName: "chart" */ "chart.js/auto"),
        // delay
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]);

      Chart.defaults.maintainAspectRatio = false;

      const data = parseChartConfig(atou(props.config), props.type);
      const ctx = chartCanvasElement.value!.getContext("2d")!;

      new Chart(ctx, data);

      loading.value = false;
    });

    return (): (VNode | null)[] => [
      props.title
        ? h("div", { class: "chart-title" }, decodeURIComponent(props.title))
        : null,
      loading.value
        ? h(LoadingIcon, { class: "chart-loading", height: 192 })
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
