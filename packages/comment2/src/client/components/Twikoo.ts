import { usePageData, usePageFrontmatter, usePageLang } from "@vuepress/client";
import {
  type VNode,
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import { LoadingIcon } from "vuepress-shared/client";

import {
  type CommentPluginFrontmatter,
  type TwikooOptions,
} from "../../shared/index.js";

import "../styles/twikoo.scss";

declare const COMMENT_OPTIONS: TwikooOptions;

const twikooOption = COMMENT_OPTIONS;
const enableTwikoo = Boolean(twikooOption.envId);

export default defineComponent({
  name: "TwikooComment",

  setup() {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const lang = usePageLang();
    const page = usePageData();

    const loaded = ref(false);

    const enableComment = computed(() => {
      if (!enableTwikoo) return false;
      const pluginConfig = twikooOption.comment !== false;
      const pageConfig = frontmatter.value.comment;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // not disabled in anywhere
        (pluginConfig !== false && pageConfig !== false)
      );
    });

    const initTwikoo = async (): Promise<void> => {
      if (enableComment.value) {
        const [{ init }] = await Promise.all([
          import(/* webpackChunkName: "twikoo" */ "twikoo"),
          new Promise<void>((resolve) => {
            setTimeout(() => {
              void nextTick().then(resolve);
            }, twikooOption.delay);
          }),
        ]);

        loaded.value = true;

        await init({
          lang: lang.value === "zh-CN" ? "zh-CN" : "en",
          ...twikooOption,
          el: "#twikoo-comment",
        });
      }
    };

    onMounted(() => {
      watch(
        () => [enableComment.value, page.value.path],
        () => initTwikoo(),
        { immediate: true }
      );
    });

    return (): VNode =>
      h(
        "div",
        {
          class: "twikoo-wrapper",
          id: "comment",
          style: { display: enableComment.value ? "block" : "none" },
        },
        loaded.value ? h("div", { id: "twikoo-comment" }) : h(LoadingIcon)
      );
  },
});
