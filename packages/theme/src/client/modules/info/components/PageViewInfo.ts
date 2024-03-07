import { isString } from "@vuepress/helper/client";
import { useMutationObserver } from "@vueuse/core";
import type { VNode } from "vue";
import { defineComponent, h, ref, shallowRef } from "vue";
import { useRoute } from "vuepress/client";

import { EyeIcon, FireIcon } from "@theme-hope/modules/info/components/icons";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index";

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

    const pageviewElement = shallowRef<HTMLSpanElement>();
    const pageViews = ref(0);

    useMutationObserver(
      pageviewElement,
      () => {
        const count = pageviewElement.value!.textContent;

        if (count && !isNaN(Number(count))) pageViews.value = Number(count);
      },
      { childList: true },
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
              ...(props.pure ? {} : { "data-balloon-pos": "up" }),
            },
            [
              h(pageViews.value < 1000 ? EyeIcon : FireIcon),
              h(
                "span",
                {
                  ref: pageviewElement,
                  id: "ArtalkPV",
                  class: "waline-pageview-count",
                  /** VisitorID */
                  "data-path": isString(props.pageview)
                    ? props.pageview
                    : route.path,
                },
                "...",
              ),
            ],
          )
        : null;
  },
});
