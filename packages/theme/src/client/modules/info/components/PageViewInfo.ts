import { withBase } from "@vuepress/client";
import { isString } from "@vuepress/shared";
import { defineComponent, h, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { EyeIcon, FireIcon } from "@theme-hope/modules/info/components/icons";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index";

import type { VNode } from "vue";

export default defineComponent({
  name: "PageViewInfo",

  inheritAttrs: false,

  props: {
    /**
     * Whether show pageview and it's path
     *
     * 是否显示浏览量以及其路径
     */
    pageview: {
      type: [Boolean, String],
      default: false,
    },

    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean,
  },

  setup(props) {
    const route = useRoute();
    const metaLocale = useMetaLocale();

    const pageViews = ref(0);

    // show fire icon depending on the views number
    const getCount = (): void => {
      const countElement = document.querySelector(".waline-pageview-count");

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
      () => [route.path, route.query],
      () => {
        setTimeout(getCount, 500);
      }
    );

    return (): VNode | null =>
      props.pageview
        ? h(
            "span",
            {
              class: "page-pageview-info",
              "aria-label": `${metaLocale.value.views}${
                props.pure ? "" : "🔢"
              }`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
            },
            [
              h(pageViews.value < 1000 ? EyeIcon : FireIcon),
              h(
                "span",
                {
                  class: "waline-pageview-count",
                  /** visitorID */
                  "data-path": isString(props.pageview)
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
