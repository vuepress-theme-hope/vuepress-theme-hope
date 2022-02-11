import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { defineComponent, h } from "vue";
import { CalendarIcon } from "./icons";
import { articleInfoLocales } from "../define";

import type { DateInfo } from "@mr-hope/vuepress-shared";
import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "DateInfo",

  props: {
    date: {
      type: Object as PropType<DateInfo | null>,
      default: null,
    },

    hint: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const pageInfoLocale = useLocaleConfig(articleInfoLocales);

    return (): VNode | null =>
      props.date
        ? h(
            "span",
            {
              class: "date-info",
              ariaLabel: pageInfoLocale.value.date,
              ...(props.hint !== false ? { "data-balloon-pos": "down" } : {}),
            },
            [
              h(CalendarIcon),
              h("span", props.date?.display),
              h("meta", {
                property: "datePublished",
                // ISO Format Date string
                content: props.date?.value?.toISOString() || "",
              }),
            ]
          )
        : null;
  },
});
