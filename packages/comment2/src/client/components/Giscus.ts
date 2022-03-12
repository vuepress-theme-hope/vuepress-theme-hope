import { Giscus } from "@giscus/vue";
import { ClientOnly, usePageFrontmatter, usePageLang } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { enableGiscus, giscusOption } from "../define";

import type { GiscusProps } from "@giscus/vue";
import type { VNode } from "vue";
import type { CommentPluginFrontmatter } from "../../shared";

import "../styles/giscus.scss";

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
  "vi",
  "zh-CN",
  "zh-TW",
];

export default defineComponent({
  name: "GiscusComment",

  props: {
    darkmode: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();

    const giscusLang = computed(() => {
      const lang = usePageLang().value;

      if (SUPPORTED_LANGUAGES.includes(lang)) return lang;

      const shortCode = lang.split("-")[0];

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

    return (): VNode =>
      h(
        "div",
        {
          class: "giscus-wrapper",
          style: { display: enableComment.value ? "block" : "none" },
        },
        h(ClientOnly, () =>
          h(Giscus, {
            repo: giscusOption.repo as `${string}/${string}`,
            repoId: giscusOption.repoId,
            category: giscusOption.category,
            categoryId: giscusOption.categoryId,
            lang: giscusLang.value,
            theme: props.darkmode ? "dark" : "light",
            mapping: giscusOption.mapping || "pathname",
            inputPosition: giscusOption.inputPosition || "top",
            reactionsEnabled:
              giscusOption.reactionsEnabled !== false ? "1" : "0",
            emitMetadata: "0",
          } as GiscusProps)
        )
      );
  },
});
