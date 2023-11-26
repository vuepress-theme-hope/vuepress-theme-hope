import { useDebounceFn, useEventListener } from "@vueuse/core";
import type { Markmap } from "markmap-view";
import type { VNode } from "vue";
import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
} from "vue";
import { LoadingIcon, atou } from "vuepress-shared/client";

import "../styles/markmap.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

export default defineComponent({
  name: "MarkMap",

  props: {
    /**
     * Chart id
     *
     * 图表 id
     */
    id: { type: String, required: true },

    /**
     * Markmap content
     *
     * Markmap
     */
    content: { type: String, required: true },
  },

  setup(props) {
    const loading = ref(true);
    const markupWrapper = shallowRef<HTMLElement>();
    const markmapSvg = shallowRef<SVGElement>();

    let markupMap: Markmap;

    useEventListener(
      "resize",
      useDebounceFn(() => {
        void markupMap.fit();
      }, 100),
    );

    onMounted(() => {
      void Promise.all([
        import(/* webpackChunkName: "markmap" */ "markmap-lib"),
        import(/* webpackChunkName: "markmap" */ "markmap-toolbar"),
        import(/* webpackChunkName: "markmap" */ "markmap-view"),
        // delay
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(async ([{ Transformer }, { Toolbar }, { Markmap }]) => {
        const transformer = new Transformer();
        const { root } = transformer.transform(atou(props.content));
        const markupMap = Markmap.create(markmapSvg.value!);
        const { el } = Toolbar.create(markupMap);

        markupMap.setData(root);
        await markupMap.fit();

        el.style.position = "absolute";
        el.style.bottom = "0.5rem";
        el.style.right = "0.5rem";

        markupWrapper.value!.append(el);
        loading.value = false;
      });
    });

    onUnmounted(() => {
      markupMap.destroy();
    });

    return (): VNode =>
      h("div", { class: "markmap-wrapper", ref: markupWrapper }, [
        h("svg", {
          ref: markmapSvg,
          class: "markmap-svg",
          id: props.id,
        }),
        loading.value
          ? h(LoadingIcon, { class: "markmap-loading", height: 360 })
          : null,
      ]);
  },
});
