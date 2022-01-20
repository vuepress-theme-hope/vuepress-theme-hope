import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { usePageData } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { TimerIcon } from "./icons";
import { commentOptions, pageInfoLocales, readingTimeLocales } from "../define";

import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { VNode } from "vue";

export default defineComponent({
  name: "ReadingTimeInfo",

  setup() {
    const page = usePageData<{ readingTime: ReadingTime }>();
    const pageInfoLocale = useLocaleConfig(pageInfoLocales);
    const readingTimeLocale = useLocaleConfig(readingTimeLocales);

    const readingTime = computed(() =>
      page.value.readingTime.minutes < 1
        ? [readingTimeLocale.value.less1Minute, "PT1M"]
        : [
            readingTimeLocale.value.time.replace(
              "$time",
              Math.round(page.value.readingTime.minutes).toString()
            ),
            `PT${Math.round(page.value.readingTime.minutes)}M`,
          ]
    );

    return (): VNode | null =>
      h(
        "span",
        {
          class: "reading-time-info",
          ariaLabel: pageInfoLocale.value.readingTime,
          ...(commentOptions.hint !== false
            ? { "data-balloon-pos": "down" }
            : {}),
        },
        [
          h(TimerIcon),
          h("span", readingTime.value[0]),
          h("meta", {
            property: "timeRequired",
            content: readingTime.value[1],
          }),
        ]
      );
  },
});
