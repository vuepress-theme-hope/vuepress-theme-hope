import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { usePageFrontmatter, usePageLang, withBase } from "@vuepress/client";
import { computed, defineComponent, h, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { enableWaline, walineLocales, walineOption } from "../define";
import { Waline } from "@waline/client/dist/component";
import { pageviewCount } from "@waline/client/dist/pageview";

import type { VNode } from "vue";
import type { CommentPluginFrontmatter } from "../../shared";

import "@waline/client/dist/waline.css";
import "../styles/waline.scss";

export default defineComponent({
  name: "WalineComment",

  setup() {
    const route = useRoute();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const lang = usePageLang();
    const walineLocale = useLocaleConfig(walineLocales);

    let abort: () => void;

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
      const pluginConfig = walineOption.pageview !== false;
      const pageConfig = frontmatter.value.pageview;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // not disabled in anywhere
        (pluginConfig !== false && pageConfig !== false)
      );
    });

    const walineProps = computed(() => ({
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
      path: withBase(route.path),
    }));

    onMounted(() => {
      watch(
        () => route.path,
        () => {
          abort?.();

          if (enablePageViews.value)
            setTimeout(() => {
              abort = pageviewCount({
                serverURL: walineOption.serverURL,
                path: withBase(route.path),
              });
            });
        },
        { immediate: true }
      );
    });

    return (): VNode =>
      h(
        "div",
        {
          class: "waline-wrapper",
          style: { display: enableComment.value ? "block" : "none" },
        },
        enableWaline ? h(Waline, walineProps.value) : []
      );
  },
});
