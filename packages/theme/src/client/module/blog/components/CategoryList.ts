import {
  capitalize,
  generateIndexfromHash,
} from "@mr-hope/vuepress-shared/lib/client";
import { defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { useCategoryMap } from "@theme-hope/module/blog/composables";

import type { VNode } from "vue";

import "../styles/category-list.scss";

export default defineComponent({
  name: "CategoryList",

  setup() {
    const route = useRoute();
    const categoryMap = useCategoryMap();

    return (): VNode =>
      h(
        "ul",
        { class: "category-list-wrapper" },
        Object.keys(categoryMap.value.map).map((category) => {
          const { path, items } = categoryMap.value.map[category];

          return h(
            "li",
            {
              class: [
                "category",
                // TODO: magic number 9 is tricky here
                `category${generateIndexfromHash(category, 9)}`,
                { active: path === route.path },
              ],
            },
            h(RouterLink, { to: path }, () => [
              capitalize(category),
              h("span", { class: "category-num" }, items.length),
            ])
          );
        })
      );
  },
});
