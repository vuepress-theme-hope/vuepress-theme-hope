import type {
  ReadingTime,
  ReadingTimeLocale,
} from "@vuepress/plugin-reading-time/client";
import type { PropType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { TimerIcon } from "@theme-hope/components/info/icons";
import { useMetaLocale } from "@theme-hope/composables/info/useMetaLocale";
import { usePure } from "@theme-hope/composables/usePure";

export default defineComponent({
  name: "ReadingTimeInfo",

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

    const readingTimeMeta = computed(() => {
      if (!props.readingTime) return null;

      const { minutes } = props.readingTime;

      return minutes < 1 ? "PT1M" : `PT${Math.round(minutes)}M`;
    });

    return (): VNode | null =>
      props.readingTimeLocale?.time
        ? h(
            "span",
            {
              class: "page-reading-time-info",
              "aria-label": `${metaLocale.value.readingTime}${
                isPure.value ? "" : "⌛"
              }`,
              ...(isPure.value ? {} : { "data-balloon-pos": "up" }),
            },
            [
              h(TimerIcon),
              h("span", props.readingTimeLocale.time),
              h("meta", {
                property: "timeRequired",
                content: readingTimeMeta.value,
              }),
            ],
          )
        : null;
  },
});
