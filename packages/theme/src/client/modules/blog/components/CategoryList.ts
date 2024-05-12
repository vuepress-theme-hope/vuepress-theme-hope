import { entries } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import { RouteLink, usePageData } from "vuepress/client";
import { generateIndexFromHash } from "vuepress-shared/client";

import { useCategoryMap } from "@theme-hope/modules/blog/composables/index";
import cssVariables from "../../../styles/variables.module.scss?module";

import "../styles/category-list.scss";

console.log(cssVariables);

export default defineComponent({
  name: "CategoryList",

  setup() {
    const page = usePageData();
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
              {
                class: [
                  "vp-category",
                  `color${generateIndexFromHash(category, Number(cssVariables["colorNumber"]))}`,
                  { active: path === page.value.path },
                ],
              },
              h(RouteLink, { to: path }, () => [
                category,
                h("span", { class: "count" }, items.length),
              ]),
            ),
          ),
      );
  },
});
