import { type PropType, type VNode, computed, defineComponent, h } from "vue";
import { type ReadingTime } from "vuepress-plugin-reading-time2";
import { useLocaleConfig } from "vuepress-shared/client";

import { TimerIcon } from "@theme-hope/modules/info/components/icons";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index";
import { readingTimeLocales } from "@theme-hope/modules/info/utils/index";

export default defineComponent({
  name: "ReadingTimeInfo",

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

    const readingTime = computed(() => {
      if (!props.readingTime) return null;

      const { minutes } = props.readingTime;

      return minutes < 1
        ? { text: readingTimeLocale.value.less1Minute, time: "PT1M" }
        : {
            text: readingTimeLocale.value.time.replace(
              "$time",
              Math.round(minutes).toString()
            ),
            time: `PT${Math.round(minutes)}M`,
          };
    });

    return (): VNode | null =>
      readingTime.value
        ? h(
            "span",
            {
              class: "page-reading-time-info",
              "aria-label": `${metaLocale.value.readingTime}${
                props.pure ? "" : "⌛"
              }`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
            },
            [
              h(TimerIcon),
              h("span", readingTime.value.text),
              h("meta", {
                property: "timeRequired",
                content: readingTime.value.time,
              }),
            ]
          )
        : null;
  },
});
