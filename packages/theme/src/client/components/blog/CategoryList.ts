import { capitalize } from "@mr-hope/vuepress-shared/lib/client";
import { defineComponent, h } from "vue";
import { useRoute } from "vue-router";
import { useCategoryMap, useNavigate } from "../../composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "CategoryList",

  setup() {
    const route = useRoute();
    const categoryMap = useCategoryMap();
    const navigate = useNavigate();

    return (): VNode =>
      h(
        "ul",
        { class: "category-list-wrapper" },
        Object.keys(categoryMap.value.map).map((category, index) => {
          const { path, items } = categoryMap.value.map[category];

          return h(
            "li",
            {
              class: [
                "category",
                `category${index % 9}`,
                { active: path === route.path },
              ],
              onClick: () => navigate(path),
            },
            [
              capitalize(category),
              h("span", { class: "category-num" }, items.length),
            ]
          );
        })
      );
  },
});
