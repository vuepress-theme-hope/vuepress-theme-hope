import { LoadingIcon, decodeData, wait } from "@vuepress/helper/client";
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

    let markupMap: Markmap | null = null;

    useEventListener(
      "resize",
      useDebounceFn(() => {
        void markupMap?.fit();
      }, 100),
    );

    onMounted(() => {
      void Promise.all([
        import(/* webpackChunkName: "markmap" */ "markmap-lib"),
        import(/* webpackChunkName: "markmap" */ "markmap-toolbar"),
        import(/* webpackChunkName: "markmap" */ "markmap-view"),
        wait(MARKDOWN_ENHANCE_DELAY),
      ]).then(
        async ([{ Transformer }, { Toolbar }, { Markmap, deriveOptions }]) => {
          const transformer = new Transformer();
          const { frontmatter, root } = transformer.transform(
            decodeData(props.content),
          );

          markupMap = Markmap.create(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            markmapSvg.value!,
            deriveOptions({
              maxWidth: 240,
              ...frontmatter?.markmap,
            }),
          );

          const { el } = Toolbar.create(markupMap);

          await markupMap.setData(root);
          await markupMap.fit();

          el.style.position = "absolute";
          el.style.bottom = "0.5rem";
          el.style.right = "0.5rem";

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          markupWrapper.value!.append(el);
          loading.value = false;
        },
      );
    });

    onUnmounted(() => {
      markupMap?.destroy();
      markupMap = null;
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
