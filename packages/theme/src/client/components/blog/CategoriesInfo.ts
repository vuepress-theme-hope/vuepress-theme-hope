import { keys } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { RouteLink } from "vuepress/client";

import CategoryList from "@theme-hope/components/blog/CategoryList";
import { CategoryIcon } from "@theme-hope/components/blog/icons";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useBlogLocale } from "@theme-hope/composables/blog/useBlogLocale";
import { useCategoryMap } from "@theme-hope/composables/blog/useCategoryMap";

export default defineComponent({
  name: "CategoriesInfo",

  setup() {
    const blogLocale = useBlogLocale();
    const categoryMap = useCategoryMap();

    const categoryNumber = computed(() => keys(categoryMap.value.map).length);

    return (): VNode =>
      h("div", { class: "vp-category-wrapper" }, [
        categoryNumber.value
          ? [
              h(
                RouteLink,
                {
                  class: "title",
                  to: categoryMap.value.path,
                },
                [
                  h(CategoryIcon),
                  h("span", { class: "num" }, categoryNumber.value),
                  blogLocale.value.category,
                ],
              ),
              h("hr"),
              h(DropTransition, { delay: 0.04 }, () => h(CategoryList)),
            ]
          : h(
              "div",
              { class: "vp-category-empty" },
              blogLocale.value.empty.replace("$text", blogLocale.value.category),
            ),
      ]);
  },
});
