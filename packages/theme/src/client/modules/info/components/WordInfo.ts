import { computed, defineComponent, h } from "vue";
import { useLocaleConfig } from "vuepress-shared/lib/client";

import { WordIcon } from "@theme-hope/modules/info/components/icons.js";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index.js";
import { readingTimeLocales } from "@theme-hope/modules/info/utils/index.js";

import type { PropType, VNode } from "vue";
import type { ReadingTime } from "vuepress-plugin-reading-time2";

export default defineComponent({
  name: "ReadTimeInfo",

  inheritAttrs: false,

  props: {
    readingTime: {
      type: Object as PropType<ReadingTime | null>,
      default: () => null,
    },

    pure: Boolean,
  },

  setup(props) {
    const metaLocale = useMetaLocale();
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
              "aria-label": `${metaLocale.value.words}${
                props.pure ? "" : "🔠"
              }`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
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
