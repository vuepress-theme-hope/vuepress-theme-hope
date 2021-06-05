import { useDate } from "@mr-hope/vuepress-shared/client";
import { usePageData, useRouteLocale } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { CalendarIcon } from "./icons";
import { commentOptions, pageInfoI18n } from "../define";

import type { VNode } from "vue";

export default defineComponent({
  name: "DateInfo",

  components: { CalendarIcon },

  setup() {
    const routeLocale = useRouteLocale();
    const page =
      usePageData<{
        git: { createTimeStamp: number | undefined };
      }>();

    const date = computed(() => {
      const { createTimeStamp } = page.value.git;

      return (
        useDate(
          { type: "date" },
          createTimeStamp ? new Date(createTimeStamp) : undefined
        ).value?.display || ""
      );
    });

    const hint = computed(() => pageInfoI18n[routeLocale.value].time);

    return (): VNode | null =>
      date.value
        ? h(
            "span",
            {
              class: "date-info",
              ...(commentOptions.hint !== false
                ? {
                    ariaLabel: hint.value,
                    "data-balloon-pos": "down",
                  }
                : {}),
            },
            [h(CalendarIcon), h("span", date.value)]
          )
        : null;
  },
});
