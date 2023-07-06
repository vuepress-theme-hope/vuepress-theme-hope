import { usePageLang } from "@vuepress/client";
import type { VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref } from "vue";
import { LoadingIcon } from "vuepress-shared/client";

import type {
  GiscusInputPosition,
  GiscusMapping,
  GiscusRepo,
  GiscusTheme,
} from "../../shared/index.js";
import { useGiscusOptions } from "../helpers/index.js";

import "../styles/giscus.scss";

// Note: Should be updated with https://github.com/giscus/giscus/tree/main/locales
const SUPPORTED_LANGUAGES = [
  "ar",
  "de",
  "gsw",
  "en",
  "es",
  "fa",
  "fr",
  "id",
  "it",
  "ja",
  "ko",
  "nl",
  "pl",
  "pt",
  "ro",
  "ru",
  "th",
  "tr",
  "uk",
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

export default defineComponent({
  name: "GiscusComment",

  props: {
    /**
     * The path of the comment
     */
    identifier: {
      type: String,
      required: true,
    },

    /**
     * Whether the component is in darkmode
     *
     * 组件是否处于夜间模式
     */
    darkmode: Boolean,
  },

  setup(props) {
    const giscusOptions = useGiscusOptions();

    const enableGiscus = Boolean(
      giscusOptions.repo &&
        giscusOptions.repoId &&
        giscusOptions.category &&
        giscusOptions.categoryId,
    );

    const { repo, repoId, category, categoryId } = giscusOptions;

    const loaded = ref(false);

    const giscusLang = computed(() => {
      const lang = usePageLang().value as GiscusLang;

      if (SUPPORTED_LANGUAGES.includes(lang)) return lang;

      const shortCode = lang.split("-")[0] as GiscusLang;

      if (SUPPORTED_LANGUAGES.includes(shortCode)) return shortCode;

      return "en";
    });

    const config = computed(
      () =>
        <GiscusProps>{
          repo,
          repoId,
          category,
          categoryId,
          lang: giscusLang.value,
          theme: props.darkmode
            ? giscusOptions.darkTheme || "dark"
            : giscusOptions.lightTheme || "light",
          mapping: giscusOptions.mapping || "pathname",
          term: props.identifier,
          inputPosition: giscusOptions.inputPosition || "top",
          reactionsEnabled:
            giscusOptions.reactionsEnabled === false ? "0" : "1",
          strict: giscusOptions.strict === false ? "0" : "1",
          loading: giscusOptions.lazyLoading === false ? "eager" : "lazy",
          emitMetadata: "0",
        },
    );

    onMounted(async () => {
      await import(/* webpackChunkName: "giscus" */ "giscus");
      loaded.value = true;
    });

    return (): VNode | null =>
      enableGiscus
        ? h(
            "div",
            {
              id: "comment",
              class: [
                "giscus-wrapper",
                { "input-top": giscusOptions.inputPosition !== "bottom" },
              ],
            },
            loaded.value ? h("giscus-widget", config.value) : h(LoadingIcon),
          )
        : null;
  },
});
