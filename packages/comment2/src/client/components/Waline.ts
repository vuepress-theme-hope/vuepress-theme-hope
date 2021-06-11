import { useThemePluginConfig } from "@mr-hope/vuepress-shared/client";
import {
  usePageFrontmatter,
  usePageLang,
  useRouteLocale,
} from "@vuepress/client";
import Waline from "@waline/client";
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
import { resolveEnablePageViews } from "../composables";
import { enableWaline, walineOption } from "../define";
import { walineI18n } from "../define";

import type { WalineInstance } from "@waline/client";
import type { VNode } from "vue";
import type { CommentPluginFrontmatter, WalineOptions } from "../../shared";
import "../styles/waline.scss";

export default defineComponent({
  name: "Waline",

  setup() {
    const lang = usePageLang();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const route = useRoute();
    const routeLocale = useRouteLocale();
    const themePluginConfig = useThemePluginConfig<WalineOptions>("comment");

    let timeout: NodeJS.Timeout | null = null;
    let waline: WalineInstance | null = null;

    const enableComment = computed(() => {
      if (!enableWaline) return false;
      const themeConfig = themePluginConfig.value.comment;
      const pluginConfig = walineOption.comment !== false;
      const pageConfig = frontmatter.value.comment;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // Enable in plugin and not disable in theme
        (Boolean(pluginConfig) && pageConfig !== false) ||
        // not disabled in anywhere
        (themeConfig !== false &&
          pluginConfig !== false &&
          pageConfig !== false)
      );
    });

    const enablePageViews = computed(() =>
      resolveEnablePageViews(frontmatter.value)
    );

    const initWaline = (): void => {
      waline = Waline({
        lang: lang.value === "zh-CN" ? "zh-CN" : "en",
        locale: {
          placeholder: walineI18n[routeLocale.value],
          ...(walineOption.locale || {}),
        },
        emoji: [
          "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo",
          "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili",
        ],
        dark: 'body[data-theme="dark"]',
        ...walineOption,
        el: "#waline-comment",
        visitor: enablePageViews.value,
      }) as WalineInstance;
    };

    onMounted(() => {
      if (enableWaline) timeout = setTimeout(() => initWaline(), 1000);
    });

    onBeforeUnmount(() => {
      if (timeout) clearTimeout(timeout);
      if (waline) waline.destroy();
    });

    watch(
      () => route.path,
      () =>
        // Refresh comment when navigating to a new page
        nextTick(() => {
          if (timeout) clearTimeout(timeout);

          if (enableWaline)
            timeout = setTimeout(() => {
              if (waline)
                waline.update({
                  lang: lang.value === "zh-CN" ? "zh-CN" : "en",
                  locale: {
                    placeholder: walineI18n[routeLocale.value],
                    ...(walineOption.locale || {}),
                  },
                });
              else initWaline();
            }, 1000);
        })
    );

    return (): VNode =>
      h("div", {
        class: "waline-wrapper",
        style: { display: enableComment.value ? "block" : "none" },
        innerHTML: '<div id="waline-comment" />',
      });
  },
});
