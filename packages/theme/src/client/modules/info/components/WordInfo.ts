import { type PropType, type VNode, computed, defineComponent, h } from "vue";
import { type ReadingTime } from "vuepress-plugin-reading-time2";
import { useLocaleConfig } from "vuepress-shared/client";

import { WordIcon } from "@theme-hope/modules/info/components/icons";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index";
import { readingTimeLocales } from "@theme-hope/modules/info/utils/index";

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
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean,
  },

  setup(props) {
    const metaLocale = useMetaLocale();
    const readingTimeLocale = useLocaleConfig(readingTimeLocales);

    const words = computed(() => props.readingTime?.words.toString());

    const wordText = computed(() =>
      readingTimeLocale.value.word.replace("$word", words.value || "")
    );

    return (): VNode | null =>
      words.value
        ? h(
            "span",
            {
              class: "page-word-info",
              "aria-label": `${metaLocale.value.words}${
                props.pure ? "" : "🔠"
              }`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
            },
            [
              h(WordIcon),
              h("span", wordText.value),
              h("meta", {
                property: "wordCount",
                content: words.value,
              }),
            ]
          )
        : null;
  },
});
