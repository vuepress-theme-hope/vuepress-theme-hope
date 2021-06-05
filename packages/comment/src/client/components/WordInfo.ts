import { usePageData, useRouteLocale } from "@vuepress/client";
import { computed, defineComponent, h, inject } from "vue";
import { WordIcon } from "./icons";
import { commentOptions, pageInfoI18n } from "../define";

import type {
  ReadingTime,
  ReadingTimeI18nConfig,
} from "@mr-hope/vuepress-plugin-reading-time";
import type { VNode } from "vue";

export default defineComponent({
  name: "ReadTimeInfo",

  components: { WordIcon },

  setup() {
    const page = usePageData<{ readingTime: ReadingTime }>();
    const routeLocale = useRouteLocale();

    const word =
      inject<Record<string, ReadingTimeI18nConfig>>("reading-time-i18n")?.[
        routeLocale.value
      ].word || "";

    const wordText = computed(() =>
      word.replace("$word", page.value.readingTime.words.toString())
    );

    const hint = computed(() => pageInfoI18n[routeLocale.value].words);

    return (): VNode | null =>
      wordText.value
        ? h(
            "span",
            {
              class: "words-info",
              ...(commentOptions.hint !== false
                ? {
                    ariaLabel: hint.value,
                    "data-balloon-pos": "down",
                  }
                : {}),
            },
            [h(WordIcon), h("span", wordText.value)]
          )
        : null;
  },
});
