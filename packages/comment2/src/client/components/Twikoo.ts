import { usePageData, usePageLang } from "@vuepress/client";
import {
  type VNode,
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
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
    const page = usePageData();

    const loaded = ref(false);

    const enableTwikoo = Boolean(twikooOptions.envId);

    const initTwikoo = async (): Promise<void> => {
      const [{ init }] = await Promise.all([
        import(/* webpackChunkName: "twikoo" */ "twikoo"),
        new Promise<void>((resolve) => {
          setTimeout(() => {
            void nextTick().then(resolve);
          }, twikooOptions.delay || 800);
        }),
      ]);

      loaded.value = true;

      await init({
        lang: lang.value === "zh-CN" ? "zh-CN" : "en",
        path: props.identifier,
        ...twikooOptions,
        el: "#twikoo-comment",
      });
    };

    onMounted(() => {
      watch(
        () => page.value.path,
        () => initTwikoo(),
        { immediate: true }
      );
    });

    return (): VNode | null =>
      enableTwikoo
        ? h(
            "div",
            { id: "comment", class: "twikoo-wrapper" },
            loaded.value ? h("div", { id: "twikoo-comment" }) : h(LoadingIcon)
          )
        : null;
  },
});
