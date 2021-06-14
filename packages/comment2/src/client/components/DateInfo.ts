import { useDate, useLocaleConfig } from "@mr-hope/vuepress-shared/client";
import { usePageData } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { CalendarIcon } from "./icons";
import { commentOptions, pageInfoI18n } from "../define";

import type { GitData } from "@vuepress/plugin-git";
import type { VNode } from "vue";

export default defineComponent({
  name: "DateInfo",

  setup() {
    const page = usePageData<{
      git?: GitData;
    }>();

    const date = computed(() => {
      const { createdTime } = page.value.git || {};

      return useDate(
        { type: "date" },
        createdTime ? new Date(createdTime) : undefined
      ).value;
    });

    const pageInfoLocale = useLocaleConfig(pageInfoI18n);

    return (): VNode | null =>
      date.value
        ? h(
            "span",
            {
              class: "date-info",
              ...(commentOptions.hint !== false
                ? {
                    ariaLabel: pageInfoLocale.value.date,
                    "data-balloon-pos": "down",
                  }
                : {}),
            },
            [
              h(CalendarIcon),
              h("span", date.value?.display),
              h("meta", {
                property: "datePublished",
                // ISO Format Date string
                content: date.value?.value?.toISOString() || "",
              }),
            ]
          )
        : null;
  },
});
