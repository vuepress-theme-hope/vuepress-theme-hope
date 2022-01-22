import {
  useCategory,
  useLocaleConfig,
} from "@mr-hope/vuepress-shared/lib/client";
import { defineComponent, h, toRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CategoryIcon } from "./icons";
import { pageInfoLocales } from "../define";

import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "CategoryInfo",

  props: {
    categories: {
      type: Array as PropType<string[]>,
      default: (): string[] => [],
    },

    categoryPath: {
      type: String,
      default: "",
    },

    hint: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const items = props.categories.length
      ? toRef(props, "categories")
      : useCategory();
    const pageInfoLocale = useLocaleConfig(pageInfoLocales);

    const navigate = (categoryName: string): void => {
      const path = props.categoryPath.replace(
        /\$category/g,
        decodeURI(categoryName)
      );

      if (path && route.path !== path) void router.push(path);
    };

    return (): VNode | null =>
      items.value.length
        ? h(
            "span",
            {
              class: "category-info",
              ariaLabel: pageInfoLocale.value.category,
              ...(props.hint !== false ? { "data-balloon-pos": "down" } : {}),
            },
            [
              h(CategoryIcon),
              h("ul", { class: "categories-wrapper" }, [
                ...items.value.map((category) =>
                  h(
                    "li",
                    {
                      class: {
                        category: true,
                        clickable: props.categoryPath,
                      },
                      onClick: () => navigate(category),
                    },
                    h(
                      "span",
                      { role: props.categoryPath ? "navigation" : "" },
                      category
                    )
                  )
                ),
                h("meta", {
                  property: "articleSection",
                  content: items.value.join(","),
                }),
              ]),
            ]
          )
        : null;
  },
});
