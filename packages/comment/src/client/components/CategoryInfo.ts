import { useCategory, useBlogConfig } from "@mr-hope/vuepress-shared/client";
import { useRouteLocale } from "@vuepress/client";
import { computed, defineComponent, h, toRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CategoryIcon } from "./icons";
import { commentOptions, pageInfoI18n } from "../define";

import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "CategoryInfo",

  components: { CategoryIcon },

  props: {
    categories: {
      type: Array as PropType<string[]>,
      default: (): string[] => [],
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const routeLocale = useRouteLocale();

    const items = props.categories.length
      ? toRef(props, "categories")
      : useCategory();
    const hint = computed(() => pageInfoI18n[routeLocale.value].category);
    const clickable = computed(() => useBlogConfig().value !== false);

    const navigate = (categoryName: string): void => {
      const path = `/category/${categoryName}/`;

      if (clickable.value && route.path !== path) void router.push(path);
    };

    return (): VNode | null =>
      items.value.length
        ? h(
            "span",
            {
              class: "category-info",
              ...(commentOptions.hint !== false
                ? {
                    ariaLabel: hint.value,
                    "data-balloon-pos": "down",
                  }
                : {}),
            },
            [
              h(CategoryIcon),
              h(
                "ul",
                { class: "categories-wrapper" },
                items.value.map((category) =>
                  h(
                    "li",
                    {
                      class: {
                        category: true,
                        clickable: clickable.value,
                      },
                      onClick: () => navigate(category),
                    },
                    h(
                      "span",
                      {
                        role: clickable.value ? "navigation" : "",
                      },
                      category
                    )
                  )
                )
              ),
            ]
          )
        : null;
  },
});
