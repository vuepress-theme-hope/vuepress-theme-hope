import type {
  ReadingTime,
  ReadingTimeLocale,
} from "@vuepress/plugin-reading-time/client";
import type { PropType, VNode } from "vue";
import { defineComponent, h } from "vue";

import { WordIcon } from "@theme-hope/modules/info/components/icons";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index";

export default defineComponent({
  name: "ReadTimeInfo",

  inheritAttrs: false,

  props: {
    /**
     * Reading time information
     *
     * 阅读时间信息
     */
    readingTime: {
      type: Object as PropType<ReadingTime | null>,
      default: () => null,
    },

    /**
     * Reading time locale
     *
     * 阅读时间语言环境
     */
    readingTimeLocale: {
      type: Object as PropType<ReadingTimeLocale | null>,
      default: () => null,
    },

    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean,
  },

  setup(props) {
    const metaLocale = useMetaLocale();

    return (): VNode | null =>
      props.readingTimeLocale?.words
        ? h(
            "span",
            {
              class: "page-word-info",
              "aria-label": `${metaLocale.value.words}${
                props.pure ? "" : "🔠"
              }`,
              ...(props.pure ? {} : { "data-balloon-pos": "up" }),
            },
            [
              h(WordIcon),
              h("span", props.readingTimeLocale?.words),
              h("meta", {
                property: "wordCount",
                content: props.readingTime?.words,
              }),
            ],
          )
        : null;
  },
});
