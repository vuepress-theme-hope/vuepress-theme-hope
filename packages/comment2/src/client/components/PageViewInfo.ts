import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { usePageFrontmatter, withBase } from "@vuepress/client";
import { computed, defineComponent, h, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { EyeIcon, FireIcon } from "./icons";
import { resolveEnablePageViews } from "../composables";
import { commentOptions, pageInfoLocales } from "../define";

import type { VNode } from "vue";
import type { CommentPluginFrontmatter } from "../../shared";

export default defineComponent({
  name: "PageViewInfo",

  setup() {
    const route = useRoute();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const pageInfoLocale = useLocaleConfig(pageInfoLocales);

    const pageViews = ref(0);
    const enablePageViews = computed(() =>
      resolveEnablePageViews(frontmatter.value)
    );

    // show fire icon depending on the views number
    const getCount = (): void => {
      const countElement = document.querySelector(".waline-visitor-count");

      if (countElement) {
        const count = countElement.textContent;

        if (count && !isNaN(Number(count))) pageViews.value = Number(count);
        else
          setTimeout(() => {
            getCount();
          }, 500);
      }
    };

    onMounted(() => {
      setTimeout(() => getCount(), 1500);
    });

    watch(
      () => route.path,
      (newValue: string, oldValue: string) => {
        if (newValue !== oldValue) setTimeout(() => getCount(), 500);
      }
    );

    return (): VNode | null =>
      enablePageViews.value
        ? h(
            "span",
            {
              class: "visitor-info",
              ariaLabel: pageInfoLocale.value.views,
              ...(commentOptions.hint !== false
                ? { "data-balloon-pos": "down" }
                : {}),
            },
            [
              h(pageViews.value < 1000 ? EyeIcon : FireIcon),
              h(
                "span",
                {
                  class: "waline-visitor-count",
                  /** visitorID, use current path */
                  id: withBase(route.path),
                },
                "..."
              ),
            ]
          )
        : null;
  },
});
