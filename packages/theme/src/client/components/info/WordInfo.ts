import type {
  ReadingTime,
  ReadingTimeLocale,
} from "@vuepress/plugin-reading-time/client";
import type { PropType, VNode } from "vue";
import { defineComponent, h } from "vue";

import { WordIcon } from "@theme-hope/components/info/icons";
import { useMetaLocale } from "@theme-hope/composables/info/useMetaLocale";
import { usePure } from "@theme-hope/composables/usePure";

export default defineComponent({
  name: "ReadTimeInfo",

  inheritAttrs: false,

  props: {
    /**
     * Reading time information
     *
     * 阅读时间信息
     */
    readingTime: Object as PropType<ReadingTime | null>,

    /**
     * Reading time locale
     *
     * 阅读时间语言环境
     */
    readingTimeLocale: Object as PropType<ReadingTimeLocale | null>,
  },

  setup(props) {
    const metaLocale = useMetaLocale();
    const isPure = usePure();

    return (): VNode | null =>
      props.readingTimeLocale?.words
        ? h(
            "span",
            {
              class: "page-word-info",
              "aria-label": `${metaLocale.value.words}${
                isPure.value ? "" : "🔠"
              }`,
              ...(isPure.value ? {} : { "data-balloon-pos": "up" }),
            },
            [
              h(WordIcon),
              h("span", props.readingTimeLocale.words),
              h("meta", {
                property: "wordCount",
                content: props.readingTime?.words,
              }),
            ],
          )
        : null;
  },
});
