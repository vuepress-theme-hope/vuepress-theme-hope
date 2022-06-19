import { usePageLang } from "@vuepress/client";
import { defineComponent, h } from "vue";

import { CalendarIcon } from "@theme-hope/module/info/components/icons";
import { useMetaLocale } from "@theme-hope/module/info/composables";

import type { PropType, VNode } from "vue";
import type { DateInfo } from "vuepress-shared";

export default defineComponent({
  name: "DateInfo",

  props: {
    date: {
      type: Object as PropType<DateInfo | null>,
      default: null,
    },

    localizedDate: {
      type: String,
      default: "",
    },

    pure: Boolean,
  },

  setup(props) {
    const lang = usePageLang();
    const metaLocale = useMetaLocale();

    return (): VNode | null =>
      props.date
        ? h(
            "span",
            {
              class: "date-info",
              "aria-label": `${metaLocale.value.date}${props.pure ? "" : "📅"}`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
            },
            [
              h(CalendarIcon),
              h(
                "span",
                props.localizedDate ||
                  props.date.value?.toLocaleDateString(lang.value)
              ),
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
