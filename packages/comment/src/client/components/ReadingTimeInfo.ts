import { usePageData, useRouteLocale } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { TimerIcon } from "./icons";
import { commentOptions, pageInfoI18n, readingTimeI18n } from "../define";

import type { ReadingTime } from "@mr-hope/vuepress-plugin-reading-time";
import type { VNode } from "vue";

export default defineComponent({
  name: "ReadingTimeInfo",

  components: { TimerIcon },

  setup() {
    const routeLocale = useRouteLocale();
    const page = usePageData<{ readingTime: ReadingTime }>();
    const { minute = "", time = "" } = readingTimeI18n[routeLocale.value] || {};

    const hint = computed(() => pageInfoI18n[routeLocale.value].readingTime);

    const readingTime = computed(() =>
      page.value.readingTime.minutes < 1
        ? minute
        : time.replace(
            "$time",
            Math.round(page.value.readingTime.minutes).toString()
          )
    );

    return (): VNode | null =>
      readingTime.value
        ? h(
            "span",
            {
              class: "reading-time-info",
              ...(commentOptions.hint !== false
                ? {
                    ariaLabel: hint.value,
                    "data-balloon-pos": "down",
                  }
                : {}),
            },
            [h(TimerIcon), h("span", readingTime.value)]
          )
        : null;
  },
});
