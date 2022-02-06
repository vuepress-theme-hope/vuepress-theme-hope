import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { computed, defineComponent, h } from "vue";
import { WordIcon } from "./icons";
import { articleInfoLocales, readingTimeLocales } from "../define";

import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "ReadTimeInfo",

  props: {
    readingTime: {
      type: Object as PropType<ReadingTime | null>,
      default: () => null,
    },

    hint: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const pageInfoLocale = useLocaleConfig(articleInfoLocales);
    const readingTimeLocale = useLocaleConfig(readingTimeLocales);

    const words = computed(() => props.readingTime?.words.toString());
    const wordText = computed(() =>
      readingTimeLocale.value.word.replace("$word", words.value || "")
    );

    return (): VNode | null =>
      words.value
        ? h(
            "span",
            {
              class: "words-info",
              ariaLabel: pageInfoLocale.value.words,
              ...(props.hint !== false ? { "data-balloon-pos": "down" } : {}),
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
