import { usePageLang } from "@vuepress/client";
import type { VNode } from "vue";
import { defineComponent, h, nextTick, onMounted, ref, watch } from "vue";
import { LoadingIcon } from "vuepress-shared/client";

import { useTwikooOptions } from "../helpers/index.js";

import "../styles/twikoo.scss";

export default defineComponent({
  name: "TwikooComment",

  props: {
    /**
     * The path of the comment
     */
    identifier: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const twikooOptions = useTwikooOptions();
    const lang = usePageLang();

    const loaded = ref(false);

    const enableTwikoo = Boolean(twikooOptions.envId);

    const initTwikoo = async (): Promise<void> => {
      const [{ init }] = await Promise.all([
        import(/* webpackChunkName: "twikoo" */ "twikoo"),
        new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, twikooOptions.delay || 800);
        }),
      ]);

      loaded.value = true;

      await nextTick();

      await init({
        lang: lang.value === "zh-CN" ? "zh-CN" : "en",
        path: props.identifier,
        ...twikooOptions,
        el: "#twikoo-comment",
      });
    };

    onMounted(() => {
      watch(
        () => props.identifier,
        () => initTwikoo(),
        { immediate: true },
      );
    });

    return (): VNode | null =>
      enableTwikoo
        ? h("div", { id: "comment", class: "twikoo-wrapper" }, [
            loaded.value ? null : h(LoadingIcon),
            h("div", { id: "twikoo-comment" }),
          ])
        : null;
  },
});
