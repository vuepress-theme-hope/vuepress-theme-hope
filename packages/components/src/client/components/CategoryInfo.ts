import {
  generateIndexfromHash,
  useLocaleConfig,
} from "@mr-hope/vuepress-shared/lib/client";
import { defineComponent, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CategoryIcon } from "./icons";
import { articleInfoLocales } from "../define";

import type { PropType, VNode } from "vue";
import type { ArticleCategory } from "../../shared";

import "../styles/category.scss";

export default defineComponent({
  name: "CategoryInfo",

  props: {
    category: {
      type: Array as PropType<ArticleCategory[]>,
      required: true,
    },

    hint: {
      type: Boolean,
      default: true,
    },

    color: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const pageInfoLocale = useLocaleConfig(articleInfoLocales);

    const navigate = (path = ""): void => {
      if (path && route.path !== path) void router.push(path);
    };

    return (): VNode | null =>
      props.category.length
        ? h(
            "span",
            {
              class: "category-info",
              ariaLabel: pageInfoLocale.value.category,
              ...(props.hint ? { "data-balloon-pos": "down" } : {}),
            },
            [
              h(CategoryIcon),
              h("ul", { class: "categories-wrapper" }, [
                ...props.category.map(({ name, path }) =>
                  h(
                    "li",
                    {
                      class: [
                        "category",
                        {
                          // TODO: magic number 9 is tricky here
                          [`category${generateIndexfromHash(name, 9)}`]:
                            props.color,
                          clickable: path,
                        },
                      ],
                      role: path ? "navigation" : "",
                      onClick: () => navigate(path),
                    },
                    name
                  )
                ),
                h("meta", {
                  property: "articleSection",
                  content: props.category.map(({ name }) => name).join(","),
                }),
              ]),
            ]
          )
        : null;
  },
});
