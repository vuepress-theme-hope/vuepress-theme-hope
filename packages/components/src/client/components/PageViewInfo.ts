import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { withBase } from "@vuepress/client";
import { defineComponent, h, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { EyeIcon, FireIcon } from "./icons";
import { articleInfoLocales } from "../define";

import type { VNode } from "vue";

export default defineComponent({
  name: "PageViewInfo",

  props: {
    hint: {
      type: Boolean,
      default: true,
    },

    pageview: {
      type: [Boolean, String],
      default: false,
    },
  },

  setup(props) {
    const route = useRoute();
    const pageInfoLocale = useLocaleConfig(articleInfoLocales);

    const pageViews = ref(0);

    // show fire icon depending on the views number
    const getCount = (): void => {
      const countElement = document.querySelector(".waline-visitor-count");

      if (countElement) {
        const count = countElement.textContent;

        if (count && !isNaN(Number(count))) pageViews.value = Number(count);
        else setTimeout(getCount, 500);
      }
    };

    onMounted(() => {
      setTimeout(getCount, 1500);
    });

    watch(
      () => route.path,
      (newValue: string, oldValue: string) => {
        if (newValue !== oldValue) setTimeout(getCount, 500);
      }
    );

    return (): VNode | null =>
      props.pageview
        ? h(
            "span",
            {
              class: "visitor-info",
              ariaLabel: pageInfoLocale.value.views,
              ...(props.hint !== false ? { "data-balloon-pos": "down" } : {}),
            },
            [
              h(pageViews.value < 1000 ? EyeIcon : FireIcon),
              h(
                "span",
                {
                  class: "waline-visitor-count",
                  /** visitorID */
                  id:
                    typeof props.pageview === "string"
                      ? props.pageview
                      : withBase(route.path),
                },
                "..."
              ),
            ]
          )
        : null;
  },
});
