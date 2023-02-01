import { usePageFrontmatter, usePageLang, withBase } from "@vuepress/client";
import { computed, defineComponent, h, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { LoadingIcon } from "vuepress-shared/client";

import type { VNode } from "vue";
import type {
  CommentPluginFrontmatter,
  GiscusInputPosition,
  GiscusMapping,
  GiscusOptions,
  GiscusRepo,
  GiscusTheme,
} from "../../shared/index.js";

import "../styles/giscus.scss";

declare const COMMENT_OPTIONS: GiscusOptions;

const SUPPORTED_LANGUAGES = [
  "de",
  "gsw",
  "en",
  "es",
  "fr",
  "id",
  "it",
  "ja",
  "ko",
  "pl",
  "ro",
  "ru",
  "tr",
  "vi",
  "zh-CN",
  "zh-TW",
] as const;

type BooleanString = "0" | "1";

export type GiscusLang = (typeof SUPPORTED_LANGUAGES)[number];

export type GiscusLoading = "lazy" | "eager";

export interface GiscusProps {
  id?: string | undefined;
  repo: GiscusRepo;
  repoId: string;
  category?: string | undefined;
  categoryId?: string | undefined;
  mapping: GiscusMapping;
  term?: string | undefined;
  theme?: GiscusTheme | undefined;
  reactionsEnabled?: BooleanString | undefined;
  strict?: BooleanString | undefined;
  emitMetadata?: BooleanString | undefined;
  inputPosition?: GiscusInputPosition | undefined;
  lang?: GiscusLang | undefined;
  loading?: GiscusLoading | undefined;
}

const giscusOptions = COMMENT_OPTIONS;
const enableGiscus = Boolean(
  giscusOptions.repo &&
    giscusOptions.repoId &&
    giscusOptions.category &&
    giscusOptions.categoryId
);

const { repo, repoId, category, categoryId } = giscusOptions;

export default defineComponent({
  name: "GiscusComment",

  props: {
    /**
     * Whether the component is in darkmode
     *
     * 组件是否处于夜间模式
     */
    darkmode: Boolean,
  },

  setup(props) {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const route = useRoute();
    const loaded = ref(false);

    const giscusLang = computed(() => {
      const lang = usePageLang().value as GiscusLang;

      if (SUPPORTED_LANGUAGES.includes(lang)) return lang;

      const shortCode = lang.split("-")[0] as GiscusLang;

      if (SUPPORTED_LANGUAGES.includes(shortCode)) return shortCode;

      return "en";
    });

    const enableComment = computed(() => {
      if (!enableGiscus) return false;
      const pluginConfig = giscusOptions.comment !== false;
      const pageConfig = frontmatter.value.comment;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // not disabled in anywhere
        (pluginConfig !== false && pageConfig !== false)
      );
    });

    const config = computed<GiscusProps>(() => ({
      repo,
      repoId,
      category,
      categoryId,
      lang: giscusLang.value,
      theme: props.darkmode
        ? giscusOptions.darkTheme || "dark"
        : giscusOptions.lightTheme || "light",
      mapping: giscusOptions.mapping || "pathname",
      term: withBase(route.path),
      inputPosition: giscusOptions.inputPosition || "top",
      reactionsEnabled: giscusOptions.reactionsEnabled === false ? "0" : "1",
      strict: giscusOptions.strict === false ? "0" : "1",
      loading: giscusOptions.lazyLoading === false ? "eager" : "lazy",
      emitMetadata: "0",
    }));

    onMounted(async () => {
      await import("giscus");
      loaded.value = true;
    });

    return (): VNode =>
      h(
        "div",
        {
          class: [
            "giscus-wrapper",
            { "input-top": giscusOptions.inputPosition !== "bottom" },
          ],
          id: "comment",
          style: {
            display: enableComment.value ? "block" : "none",
          },
        },
        loaded.value ? h("giscus-widget", config.value) : h(LoadingIcon)
      );
  },
});
