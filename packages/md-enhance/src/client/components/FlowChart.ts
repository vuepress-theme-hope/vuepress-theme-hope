import { useDebounceFn, useEventListener } from "@vueuse/core";
import { atou } from "vuepress-shared/client";
import { computed, defineComponent, h, onMounted, ref } from "vue";
import { LoadingIcon } from "./icons.js";
import presets from "../flowchart-preset/index.js";

import type * as Flowchart from "flowchart.js";
import type { PropType, VNode } from "vue";

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
    let svg: Flowchart.Instance;
    const element = ref<HTMLDivElement>();

    const loading = ref(true);
    const scale = ref(1);

    const preset = computed<Record<string, unknown>>(() => {
      const preset = presets[props.preset];

      if (!preset) {
        console.warn(`[md-enhance:flowchart] Unknown preset: ${props.preset}`);

        return presets.vue;
      }

      return preset;
    });

    const getScale = (width: number): number =>
      width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;

    onMounted(() => {
      void Promise.all([
        import(
          /* webpackChunkName: "flowchart" */ "flowchart.js/src/flowchart.parse.js"
        ),
        // delay
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([{ default: parse }]) => {
        svg = parse(atou(props.code));

        // update scale
        scale.value = getScale(window.innerWidth);

        loading.value = false;

        // draw svg to #id
        svg.drawSVG(props.id, { ...preset.value, scale: scale.value });

        useEventListener(
          "resize",
          useDebounceFn(() => {
            const newScale = getScale(window.innerWidth);

            if (scale.value !== newScale) {
              scale.value = newScale;

              svg.drawSVG(props.id, { ...preset.value, scale: newScale });
            }
          }, 100)
        );
      });
    });

    return (): (VNode | null)[] => [
      loading.value
        ? h("div", { class: "flowchart-loading-wrapper" }, h(LoadingIcon))
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
