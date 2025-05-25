import { LoadingIcon, decodeData } from "@vuepress/helper/client";
import { useDebounceFn, useEventListener } from "@vueuse/core";
import type { Markmap } from "markmap-view";
import type { VNode } from "vue";
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

import "../styles/markmap.scss";

export default defineComponent({
  name: "MarkMap",

  props: {
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
     * Markmap content
     *
     * Markmap
     */
    content: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { content, id } = toRefs(props);
    const markupWrapper = shallowRef<HTMLElement>();
    const markmapSVG = shallowRef<SVGElement>();

    const loaded = ref(false);

    let markmap: Markmap | null = null;

    useEventListener(
      "resize",
      useDebounceFn(() => {
        void markmap?.fit();
      }, 100),
    );

    const destroyMarkmap = (): void => {
      markmap?.destroy();
      markmap = null;
    };

    const renderMarkmap = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return;

      const [{ Transformer }, { Markmap, deriveOptions }, { Toolbar }] =
        await Promise.all([
          import(/* webpackChunkName: "markmap" */ "markmap-lib"),
          import(/* webpackChunkName: "markmap" */ "markmap-view"),
          import(/* webpackChunkName: "markmap" */ "markmap-toolbar"),
        ]);

      const transformer = new Transformer();
      const { frontmatter, root } = transformer.transform(
        decodeData(props.content),
      );

      markmap = Markmap.create(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        markmapSVG.value!,
        deriveOptions({
          maxWidth: 240,
          ...frontmatter?.markmap,
        }),
      );

      const { el } = Toolbar.create(markmap);

      await markmap.setData(root);
      await markmap.fit();

      el.style.position = "absolute";
      el.style.bottom = "0.5rem";
      el.style.right = "0.5rem";

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      markupWrapper.value!.append(el);
    };

    onContentUpdated(async (reason) => {
      if (reason === "mounted") {
        await renderMarkmap();
        loaded.value = true;
      }
    });

    onMounted(() => {
      if (!__VUEPRESS_DEV__) return;

      // config must be changed if type is changed, so no need to watch it
      watch(
        [content, id],
        async () => {
          destroyMarkmap();
          await nextTick();
          await renderMarkmap();
        },
        { flush: "post" },
      );
    });

    onUnmounted(destroyMarkmap);

    return (): VNode =>
      h("div", { class: "markmap-wrapper", ref: markupWrapper }, [
        h("svg", {
          ref: markmapSVG,
          class: "markmap-svg",
          id: props.id,
        }),
        loaded.value
          ? null
          : h(LoadingIcon, { class: "markmap-loading", height: 360 }),
      ]);
  },
});
