import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { usePageData } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { WordIcon } from "./icons";
import { commentOptions, pageInfoLocales, readingTimeLocales } from "../define";

import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { VNode } from "vue";

export default defineComponent({
  name: "ReadTimeInfo",

  setup() {
    const page = usePageData<{ readingTime: ReadingTime }>();

    const pageInfoLocale = useLocaleConfig(pageInfoLocales);
    const readingTimeLocale = useLocaleConfig(readingTimeLocales);

    const words = computed(() => page.value.readingTime.words.toString());
    const wordText = computed(() =>
      readingTimeLocale.value.word.replace("$word", words.value)
    );

    return (): VNode | null =>
      wordText.value
        ? h(
            "span",
            {
              class: "words-info",
              ariaLabel: pageInfoLocale.value.words,
              ...(commentOptions.hint !== false
                ? { "data-balloon-pos": "down" }
                : {}),
            },
            [
              h(WordIcon),
              h("span", wordText.value),
              h("meta", {
                property: "wordCount",
                content: words.value,
              }),
            ]
          )
        : null;
  },
});
