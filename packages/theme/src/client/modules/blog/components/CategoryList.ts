import { usePageData } from "@vuepress/client";
import { type VNode, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";
import { entries, generateIndexFromHash } from "vuepress-shared/client";

import { useCategoryMap } from "@theme-hope/modules/blog/composables/index";

import "../styles/category-list.scss";

export default defineComponent({
  name: "CategoryList",

  setup() {
    const page = usePageData();
    const categoryMap = useCategoryMap();

    return (): VNode =>
      h(
        "ul",
        { class: "category-list-wrapper" },
        entries(categoryMap.value.map).map(([category, { path, items }]) =>
          h(
            "li",
            {
              class: [
                "category",
                // TODO: magic number 9 is tricky here
                `category${generateIndexFromHash(category, 9)}`,
                { active: path === page.value.path },
              ],
            },
            h(RouterLink, { to: path }, () => [
              category,
              h("span", { class: "category-num" }, items.length),
            ])
          )
        )
      );
  },
});
