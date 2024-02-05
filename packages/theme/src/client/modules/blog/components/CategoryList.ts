import { entries } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import { RouteLink, usePageData } from "vuepress/client";
import { generateIndexFromHash } from "vuepress-shared/client";

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
                  // TODO: magic number 9 is tricky here
                  `vp-category${generateIndexFromHash(category, 9)}`,
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
