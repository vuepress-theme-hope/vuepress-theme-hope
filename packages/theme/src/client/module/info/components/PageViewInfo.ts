import { withBase } from "@vuepress/client";
import { defineComponent, h, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";

import { EyeIcon, FireIcon } from "@theme-hope/module/info/components/icons";
import { useMetaLocale } from "@theme-hope/module/info/composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "PageViewInfo",

  props: {
    pageview: {
      type: [Boolean, String],
      default: false,
    },

    pure: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const route = useRoute();
    const metaLocale = useMetaLocale();

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
              ariaLabel: `${metaLocale.value.views}${props.pure ? "" : "🔢"}`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
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
