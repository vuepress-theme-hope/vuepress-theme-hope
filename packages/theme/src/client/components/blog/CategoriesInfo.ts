import { keys } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import CategoryList from "@theme-hope/components/blog/CategoryList";
import { CategoryIcon } from "@theme-hope/components/blog/icons";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useBlogLocaleData } from "@theme-hope/composables/blog/useBlogLocale";
import { useCategoryMap } from "@theme-hope/composables/blog/useCategoryMap";
import { useNavigate } from "@theme-hope/composables/useNavigate";

export default defineComponent({
  name: "CategoriesInfo",

  setup() {
    const blogLocale = useBlogLocaleData();
    const categoryMap = useCategoryMap();
    const navigate = useNavigate();

    const categoryNumber = computed(() => keys(categoryMap.value.map).length);

    return (): VNode =>
      h("div", { class: "vp-category-wrapper" }, [
        categoryNumber.value
          ? [
              h(
                "div",
                {
                  class: "title",
                  onClick: () => {
                    navigate(categoryMap.value.path);
                  },
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
              blogLocale.value.empty.replace(
                "$text",
                blogLocale.value.category,
              ),
            ),
      ]);
  },
});
