import { ClientOnly, usePageLang } from "@vuepress/client";
import type { PropType, VNode } from "vue";
import { defineComponent, h } from "vue";

import { CalendarIcon } from "@theme-hope/modules/info/components/icons";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index";

export default defineComponent({
  name: "DateInfo",

  inheritAttrs: false,

  props: {
    /**
     * Date information
     *
     * 日期信息
     */
    date: {
      type: Object as PropType<Date | null>,
      default: null,
    },

    /**
     * Localized date text
     *
     * 本地化的日期文字
     */
    localizedDate: {
      type: String,
      default: "",
    },

    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
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
              class: "page-date-info",
              "aria-label": `${metaLocale.value.date}${props.pure ? "" : "📅"}`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
            },
            [
              h(CalendarIcon),
              h(
                "span",
                h(
                  ClientOnly,
                  () =>
                    props.localizedDate ||
                    props.date!.toLocaleDateString(lang.value),
                ),
              ),
              h("meta", {
                property: "datePublished",
                // ISO Format Date string
                content: props.date.toISOString() || "",
              }),
            ],
          )
        : null;
  },
});
