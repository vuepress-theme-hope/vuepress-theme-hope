import { usePageFrontmatter, usePageLang, withBase } from "@vuepress/client";
import { Waline } from "@waline/client/dist/component.mjs";
import { pageviewCount } from "@waline/client/dist/pageview.mjs";
import { computed, defineComponent, h, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useLocaleConfig } from "vuepress-shared/lib/client";

import type { VNode } from "vue";
import type {
  CommentPluginFrontmatter,
  WalineLocaleConfig,
  WalineOptions,
} from "../../shared/index.js";

import "@waline/client/dist/waline.css";
import "../styles/waline.scss";

declare const COMMENT_OPTIONS: WalineOptions;

declare const WALINE_META: boolean;
declare const WALINE_LOCALES: WalineLocaleConfig;

const walineOption = COMMENT_OPTIONS;
const walineLocales = WALINE_LOCALES;
const enableWaline = Boolean(walineOption.serverURL);

if (WALINE_META) import("@waline/client/dist/waline-meta.css");

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
        "//unpkg.com/@waline/emojis@1.1.0/weibo",
        "//unpkg.com/@waline/emojis@1.1.0/bilibili",
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
            }, walineOption.delay || 500);
        },
        { immediate: true }
      );
    });

    return (): VNode | null =>
      enableComment.value
        ? h(
            "div",
            { class: "waline-wrapper" },
            enableWaline ? h(Waline, walineProps.value) : []
          )
        : null;
  },
});
