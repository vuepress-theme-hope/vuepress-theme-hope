import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { computed, defineComponent, h } from "vue";
import { TimerIcon } from "./icons";
import { articleInfoLocales, readingTimeLocales } from "../define";

import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "ReadingTimeInfo",

  props: {
    readingTime: {
      type: Object as PropType<ReadingTime | null>,
      default: () => null,
    },

    hint: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const pageInfoLocale = useLocaleConfig(articleInfoLocales);
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
              class: "reading-time-info",
              ariaLabel: pageInfoLocale.value.readingTime,
              ...(props.hint !== false ? { "data-balloon-pos": "down" } : {}),
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
