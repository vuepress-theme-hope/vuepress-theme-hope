import { defineComponent, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import { generateIndexfromHash } from "vuepress-shared/lib/client";

import { CategoryIcon } from "@theme-hope/modules/info/components/icons.js";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index.js";

import type { PropType, VNode } from "vue";
import type { PageCategory } from "@theme-hope/modules/info/utils/index.js";

import "../styles/category.scss";

export default defineComponent({
  name: "CategoryInfo",

  inheritAttrs: false,

  props: {
    category: {
      type: Array as PropType<PageCategory[]>,
      required: true,
    },

    pure: Boolean,
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const metaLocale = useMetaLocale();

    const navigate = (path = ""): void => {
      if (path && route.path !== path) void router.push(path);
    };

    return (): VNode | null =>
      props.category.length
        ? h(
            "span",
            {
              class: "category-info",
              "aria-label": `${metaLocale.value.category}${
                props.pure ? "" : "🌈"
              }`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
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
                            !props.pure,
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
