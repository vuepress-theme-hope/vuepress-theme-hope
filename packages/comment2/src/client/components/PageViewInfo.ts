import { useLocaleConfig } from "@mr-hope/vuepress-shared/client";
import { usePageFrontmatter, useSiteData } from "@vuepress/client";
import { computed, defineComponent, h, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { EyeIcon, FireIcon } from "./icons";
import { resolveEnablePageViews } from "../composables";
import { commentOptions, pageInfoI18n } from "../define";

import type { VNode } from "vue";
import type { CommentPluginFrontmatter } from "../../shared";

export default defineComponent({
  name: "PageViewInfo",

  setup() {
    const route = useRoute();
    const site = useSiteData();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const pageInfoLocale = useLocaleConfig(pageInfoI18n);

    const pageViews = ref(0);
    const enablePageViews = computed(() =>
      resolveEnablePageViews(frontmatter.value)
    );

    /** visitorID, use current path */
    const visitorID = computed(() => {
      const { base } = site.value;

      return `${base.slice(0, base.length - 1)}${route.path}`;
    });

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
              ...(commentOptions.hint !== false
                ? {
                    ariaLabel: pageInfoLocale.value.views,
                    "data-balloon-pos": "down",
                  }
                : {}),
            },
            [
              h(pageViews.value < 1000 ? EyeIcon : FireIcon),
              h(
                "span",
                {
                  class: "waline-visitor-count",
                  id: visitorID.value,
                },
                "..."
              ),
            ]
          )
        : null;
  },
});
