import { computed, defineComponent, h } from "vue";
import { useLocaleConfig } from "vuepress-shared/lib/client";

import { TimerIcon } from "@theme-hope/module/info/components/icons";
import { useMetaLocale } from "@theme-hope/module/info/composables";
import { readingTimeLocales } from "@theme-hope/module/info/utils";

import type { PropType, VNode } from "vue";
import type { ReadingTime } from "vuepress-plugin-reading-time2";

export default defineComponent({
  name: "ReadingTimeInfo",

  props: {
    readingTime: {
      type: Object as PropType<ReadingTime | null>,
      default: () => null,
    },

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
              class: "reading-time-info",
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
