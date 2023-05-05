import {
  usePageData,
  usePageFrontmatter,
  usePageLang,
  withBase,
} from "@vuepress/client";
import { pageviewCount } from "@waline/client/dist/pageview.mjs";
import {
  type VNode,
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  nextTick,
  onMounted,
  watch,
} from "vue";
import { LoadingIcon, useLocaleConfig } from "vuepress-shared/client";

import {
  type CommentPluginFrontmatter,
  type WalineLocaleConfig,
} from "../../shared/index.js";
import { useWalineOptions } from "../helpers/index.js";

import "@waline/client/dist/waline.css";
import "../styles/waline.scss";

declare const WALINE_META: boolean;
declare const WALINE_LOCALES: WalineLocaleConfig;

const walineLocales = WALINE_LOCALES;

if (WALINE_META)
  import(
    /* webpackChunkName: "waline" */ "@waline/client/dist/waline-meta.css"
  );

export { pageviewCount };

export default defineComponent({
  name: "WalineComment",

  setup() {
    const walineOptions = useWalineOptions();
    const page = usePageData();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const lang = usePageLang();
    const walineLocale = useLocaleConfig(walineLocales);

    let abort: () => void;
    const enableWaline = Boolean(walineOptions.serverURL);

    const enablePageViews = computed(() => {
      if (!enableWaline) return false;
      const pluginConfig = walineOptions.pageview !== false;
      const pageConfig = frontmatter.value.pageview;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // not disabled in anywhere
        (pluginConfig !== false && pageConfig !== false)
      );
    });

    const walineKey = computed(() => withBase(page.value.path));

    const walineProps = computed(() => ({
      lang: lang.value === "zh-CN" ? "zh-CN" : "en",
      locale: walineLocale.value,
      dark: "html.dark",
      ...walineOptions,
      path: walineKey.value,
    }));

    onMounted(() => {
      watch(
        walineKey,
        () => {
          abort?.();

          if (enablePageViews.value)
            void nextTick().then(() => {
              setTimeout(() => {
                abort = pageviewCount({
                  serverURL: walineOptions.serverURL,
                  path: walineKey.value,
                });
              }, walineOptions.delay || 800);
            });
        },
        { immediate: true }
      );
    });

    return (): VNode | null =>
      enableWaline
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
                    loadingComponent: LoadingIcon,
                  }),
                  walineProps.value
                )
              : []
          )
        : null;
  },
});
