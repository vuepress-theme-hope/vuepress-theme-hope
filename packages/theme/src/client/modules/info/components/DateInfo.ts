import type { PropType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { usePageLang } from "vuepress/client";

import { usePure } from "@theme-hope/composables/index";
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
    date: Object as PropType<Date | null>,
  },

  setup(props) {
    const lang = usePageLang();
    const metaLocale = useMetaLocale();
    const isPure = usePure();

    const formatter = computed(
      () =>
        new Intl.DateTimeFormat(lang.value, {
          dateStyle: "short",
        }),
    );
    const formattedDate = computed(() => {
      if (!props.date) return null;

      return formatter.value.format(props.date);
    });

    return (): VNode | null =>
      props.date
        ? h(
            "span",
            {
              class: "page-date-info",
              "aria-label": `${metaLocale.value.date}${isPure.value ? "" : "📅"}`,
              ...(isPure.value ? {} : { "data-balloon-pos": "up" }),
            },
            [
              h(CalendarIcon),
              h(
                "span",
                { "data-allow-mismatch": "text" },
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                formattedDate.value!,
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
