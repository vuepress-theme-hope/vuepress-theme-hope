import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { usePageFrontmatter, usePageLang } from "@vuepress/client";
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { enableWaline, walineLocales, walineOption } from "../define";

import type { WalineInstance } from "@waline/client";
import type { VNode } from "vue";
import type { CommentPluginFrontmatter } from "../../shared";

import "../styles/waline.scss";

export default defineComponent({
  name: "WalineComment",

  setup() {
    const route = useRoute();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const lang = usePageLang();
    const walineLocale = useLocaleConfig(walineLocales);

    let id: number;
    let waline: WalineInstance | null = null;

    const enableComment = computed(() => {
      if (!enableWaline) return false;
      const pluginConfig = walineOption.comment !== false;
      const pageConfig = frontmatter.value.comment;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // not disabled in anywhere
        (pluginConfig !== false && pageConfig !== false)
      );
    });

    const enablePageViews = computed(() => {
      if (!enableWaline) return false;
      const pluginConfig = walineOption.pageviews !== false;
      const pageConfig = frontmatter.value.pageview;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // not disabled in anywhere
        (pluginConfig !== false && pageConfig !== false)
      );
    });

    const updateWaline = (): void => {
      const timeID = (id = new Date().getTime());

      if (waline)
        setTimeout(() => {
          if (timeID === id)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            waline!.update({
              lang: lang.value === "zh-CN" ? "zh-CN" : "en",
              locale: {
                ...walineLocale.value,
                ...(walineOption.locale || {}),
              },
            });
        }, walineOption.delay);
      else
        void Promise.all([
          import("@waline/client"),
          new Promise<void>((resolve) => {
            setTimeout(resolve, walineOption.delay);
          }),
        ]).then(([{ default: Waline }]) => {
          if (timeID === id)
            waline = Waline({
              lang: lang.value === "zh-CN" ? "zh-CN" : "en",
              locale: {
                ...walineLocale.value,
                ...(walineOption.locale || {}),
              },
              emoji: [
                "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo",
                "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili",
              ],
              dark: "html.dark",
              ...walineOption,
              el: "#waline-comment",
              visitor: enablePageViews.value,
            }) as WalineInstance;
        });
    };

    onMounted(() => {
      if (enableWaline) updateWaline();
    });

    onBeforeUnmount(() => {
      if (waline) waline.destroy();
    });

    watch(
      () => route.path,
      () =>
        // Refresh comment when navigating to a new page
        nextTick().then(() => updateWaline())
    );

    return (): VNode =>
      h("div", {
        class: "waline-wrapper",
        style: { display: enableComment.value ? "block" : "none" },
        innerHTML: '<div id="waline-comment" />',
      });
  },
});
