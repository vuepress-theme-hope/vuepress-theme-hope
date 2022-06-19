import { usePageFrontmatter, usePageLang, withBase } from "@vuepress/client";
import { computed, defineComponent, h, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import type { VNode } from "vue";
import type { GiscusLang, GiscusMapping, GiscusProps } from "../utils";
import type { CommentPluginFrontmatter, GiscusOptions } from "../../shared";

import "../styles/giscus.scss";

declare const COMMENT_OPTIONS: GiscusOptions;

const giscusOption = COMMENT_OPTIONS;

const enableGiscus = Boolean(
  giscusOption.repo &&
    giscusOption.repoId &&
    giscusOption.category &&
    giscusOption.categoryId
);

const SUPPORTED_LANGUAGES: GiscusLang[] = [
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
  "vi",
  "zh-CN",
  "zh-TW",
];

export default defineComponent({
  name: "GiscusComment",

  props: {
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
      const pluginConfig = giscusOption.comment !== false;
      const pageConfig = frontmatter.value.comment;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // not disabled in anywhere
        (pluginConfig !== false && pageConfig !== false)
      );
    });

    const config = computed<GiscusProps>(() => ({
      repo: giscusOption.repo as `${string}/${string}`,
      repoId: giscusOption.repoId,
      category: giscusOption.category,
      categoryId: giscusOption.categoryId,
      lang: giscusLang.value,
      theme: props.darkmode ? "dark" : "light",
      mapping: (giscusOption.mapping || "specific") as GiscusMapping,
      term: withBase(route.path),
      inputPosition: giscusOption.inputPosition || "top",
      reactionsEnabled: giscusOption.reactionsEnabled !== false ? "1" : "0",
      emitMetadata: "0",
    }));

    onMounted(() => {
      void import("giscus").then(() => {
        loaded.value = true;
      });
    });

    return (): VNode =>
      h(
        "div",
        {
          class: [
            "giscus-wrapper",
            { "input-top": giscusOption.inputPosition !== "bottom" },
          ],
          style: {
            display: enableComment.value ? "block" : "none",
          },
        },
        loaded.value
          ? h("giscus-widget", config.value)
          : h("div", { style: "text-align:center" }, "Loading...")
      );
  },
});
