import { entries } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import { RouteLink, usePage } from "vuepress/client";
import { generateIndexFromHash } from "vuepress-shared/client";

import { useCategoryMap } from "@theme-hope/composables/blog/useCategoryMap";

import cssVariables from "../../styles/variables.module.scss";

import "../../styles/blog/category-list.scss";

export default defineComponent({
  name: "CategoryList",

  setup() {
    const page = usePage();
    const categoryMap = useCategoryMap();

    return (): VNode =>
      h(
        "ul",
        { class: "vp-category-list" },
        entries(categoryMap.value.map)
          // Sort from more to less
          .sort(([, a], [, b]) => b.items.length - a.items.length)
          .map(([category, { path, items }]) =>
            h(
              "li",
              { class: "vp-category-item" },
              h(
                RouteLink,
                {
                  class: [
                    "vp-category",
                    `color${generateIndexFromHash(category, Number(cssVariables.colorNumber))}`,
                    { active: path === page.value.path },
                  ],
                  to: path,
                },
                () => [
                  category,
                  h("span", { class: "vp-category-count" }, items.length),
                ],
              ),
            ),
          ),
      );
  },
});
