import { usePageFrontmatter, usePageLang } from "@vuepress/client";
import { computed, defineComponent, h, onMounted } from "vue";

import type { VNode } from "vue";
import type { CommentPluginFrontmatter, TwikooOptions } from "../../shared";

import "../styles/twikoo.scss";

declare const COMMENT_OPTIONS: TwikooOptions;

const twikooOption = COMMENT_OPTIONS;

const enableTwikoo = Boolean(twikooOption.envId);

export default defineComponent({
  name: "TwikooComment",

  setup() {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const lang = usePageLang();

    let id: number;

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

    const initTwikoo = (): void => {
      const timeID = (id = new Date().getTime());

      void Promise.all([
        import("twikoo"),
        new Promise<void>((resolve) => {
          setTimeout(resolve, twikooOption.delay);
        }),
      ]).then(([{ init }]) => {
        if (timeID === id)
          void init({
            lang: lang.value === "zh-CN" ? "zh-CN" : "en",
            ...twikooOption,
            el: "#twikoo-comment",
          });
      });
    };

    onMounted(() => {
      if (enableTwikoo) initTwikoo();
    });

    return (): VNode =>
      h(
        "div",
        {
          class: "twikoo-wrapper",
          style: { display: enableComment.value ? "block" : "none" },
        },
        h("div", { id: "twikoo-comment" })
      );
  },
});
