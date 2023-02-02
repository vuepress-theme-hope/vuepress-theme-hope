import { usePageFrontmatter, usePageLang, withBase } from "@vuepress/client";
import { pageviewCount } from "@waline/client/dist/pageview.mjs";
import {
  type VNode,
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  onMounted,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { LoadingIcon, useLocaleConfig } from "vuepress-shared/client";

import {
  type CommentPluginFrontmatter,
  type WalineLocaleConfig,
  type WalineOptions,
} from "../../shared/index.js";

import "@waline/client/dist/waline.css";
import "../styles/waline.scss";

declare const COMMENT_OPTIONS: WalineOptions;

declare const WALINE_META: boolean;
declare const WALINE_LOCALES: WalineLocaleConfig;

const walineOption = COMMENT_OPTIONS;
const walineLocales = WALINE_LOCALES;
const enableWaline = Boolean(walineOption.serverURL);

if (WALINE_META)
  import(
    /* webpackChunkName: "waline" */ "@waline/client/dist/waline-meta.css"
  );

export { pageviewCount };

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
      locale: walineLocale.value,
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
            }, walineOption.delay || 800);
        },
        { immediate: true }
      );
    });

    return (): VNode | null =>
      enableComment.value
        ? h(
            "div",
            { class: "waline-wrapper", id: "comment" },
            enableWaline
              ? h(
                  defineAsyncComponent({
                    loader: async () =>
                      (
                        await import(
                          /* webpackChunkName: "waline" */ "@waline/client/dist/component.mjs"
                        )
                      ).Waline,
                    loadingComponent: () => h(LoadingIcon),
                  }),
                  walineProps.value
                )
              : []
          )
        : null;
  },
});
