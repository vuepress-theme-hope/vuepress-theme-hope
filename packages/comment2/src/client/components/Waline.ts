import { usePageFrontmatter, usePageLang } from "@vuepress/client";
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
    const walineOptions = useWalineOptions();
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

    const walineProps = computed(() => ({
      lang: lang.value === "zh-CN" ? "zh-CN" : "en",
      locale: walineLocale.value,
      dark: "html.dark",
      ...walineOptions,
      path: props.identifier,
    }));

    onMounted(() => {
      watch(
        () => props.identifier,
        () => {
          abort?.();

          if (enablePageViews.value)
            void nextTick().then(() => {
              setTimeout(() => {
                abort = pageviewCount({
                  serverURL: walineOptions.serverURL,
                  path: props.identifier,
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
