import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { computed, defineComponent, h } from "vue";

import { WordIcon } from "@theme-hope/module/info/components/icons";
import { useMetaLocale } from "@theme-hope/module/info/composables";
import { readingTimeLocales } from "@theme-hope/module/info/utils";

import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "ReadTimeInfo",

  props: {
    readingTime: {
      type: Object as PropType<ReadingTime | null>,
      default: () => null,
    },

    pure: {
      type: Boolean,
      default: false,
    },
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
              ariaLabel: `${metaLocale.value.words}${props.pure ? "" : "🔠"}`,
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
