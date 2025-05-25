import { LoadingIcon, decodeData } from "@vuepress/helper/client";
import { useDebounceFn, useEventListener } from "@vueuse/core";
import type { Chart } from "flowchart.ts";
import type { PropType, VNode } from "vue";
import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  toRefs,
  watch,
} from "vue";
import { onContentUpdated } from "vuepress/client";

import { flowchartPresets } from "../utils/index.js";

import "../styles/flowchart.scss";

export default defineComponent({
  name: "FlowChart",

  props: {
    /**
     * Flowchart code content
     *
     * 流程图代码内容
     */
    code: { type: String, required: true },

    /**
     * Flowchart id
     *
     * 流程图 id
     */
    id: { type: String, required: true },

    /**
     * Flowchart preset
     *
     * 流程图预设
     */
    preset: {
      type: String as PropType<"ant" | "pie" | "vue">,
      default: "vue",
    },
  },

  setup(props) {
    const { code, id, preset } = toRefs(props);
    const element = shallowRef<HTMLDivElement>();

    const loaded = ref(false);
    const scale = ref(1);

    let flowchart: Chart | null = null;

    const getScale = (width: number): number =>
      width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;

    useEventListener(
      "resize",
      useDebounceFn(() => {
        if (flowchart) {
          const newScale = getScale(window.innerWidth);

          if (scale.value !== newScale) {
            scale.value = newScale;

            flowchart.draw(props.id, {
              ...flowchartPresets[props.preset],
              scale: newScale,
            });
          }
        }
      }, 100),
    );

    const destroyFlowChart = (): void => {
      flowchart?.clean();
      flowchart = null;
    };

    const renderFlowChart = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return;

      const { parse } = await import(
        /* webpackChunkName: "flowchart" */ "flowchart.ts"
      );

      flowchart = parse(decodeData(code.value));

      // Update scale
      scale.value = getScale(window.innerWidth);

      loaded.value = true;

      // Draw svg to #id
      flowchart.draw(props.id, {
        ...flowchartPresets[props.preset],
        scale: scale.value,
      });
    };

    onContentUpdated(async (reason) => {
      if (reason === "mounted") await renderFlowChart();
    });

    onMounted(() => {
      if (!__VUEPRESS_DEV__) return;

      watch(
        [code, id, preset],
        async () => {
          destroyFlowChart();
          await nextTick();
          await renderFlowChart();
        },
        { flush: "post" },
      );
    });

    onUnmounted(destroyFlowChart);

    return (): (VNode | null)[] => [
      loaded.value
        ? null
        : h(LoadingIcon, { class: "flowchart-loading", height: 192 }),
      h("div", {
        ref: element,
        class: ["flowchart-wrapper", props.preset],
        id: props.id,
        style: {
          display: loaded.value ? "block" : "none",
        },
      }),
    ];
  },
});
