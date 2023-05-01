import { useDebounceFn, useEventListener } from "@vueuse/core";
import { type Chart } from "flowchart.ts";
import {
  type PropType,
  type VNode,
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  shallowRef,
} from "vue";
import { LoadingIcon, atou } from "vuepress-shared/client";

import { flowchartPresets } from "../utils/index.js";

import "../styles/flowchart.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

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
    let flowchart: Chart | null = null;
    const element = shallowRef<HTMLDivElement>();

    const loading = ref(true);
    const scale = ref(1);

    const preset = computed<Record<string, unknown>>(() => {
      const preset = flowchartPresets[props.preset];

      if (!preset) {
        console.warn(`[md-enhance:flowchart] Unknown preset: ${props.preset}`);

        return flowchartPresets.vue;
      }

      return preset;
    });

    const getScale = (width: number): number =>
      width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;

    onMounted(() => {
      void Promise.all([
        import(/* webpackChunkName: "flowchart" */ "flowchart.ts"),
        // delay
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([{ parse }]) => {
        flowchart = parse(atou(props.code));

        // update scale
        scale.value = getScale(window.innerWidth);

        loading.value = false;

        // draw svg to #id
        flowchart.draw(props.id, { ...preset.value, scale: scale.value });
      });

      useEventListener(
        "resize",
        useDebounceFn(() => {
          if (flowchart) {
            const newScale = getScale(window.innerWidth);

            if (scale.value !== newScale) {
              scale.value = newScale;

              flowchart.draw(props.id, { ...preset.value, scale: newScale });
            }
          }
        }, 100)
      );
    });

    return (): (VNode | null)[] => [
      loading.value
        ? h(LoadingIcon, { class: "flowchart-loading", height: 192 })
        : null,
      h("div", {
        ref: element,
        class: ["flowchart-wrapper", props.preset],
        id: props.id,
        style: {
          display: loading.value ? "none" : "block",
        },
      }),
    ];
  },
});
