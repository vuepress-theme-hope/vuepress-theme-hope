import { defineComponent, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import { generateIndexFromHash } from "vuepress-shared/client";

import { CategoryIcon } from "@theme-hope/modules/info/components/icons.js";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index.js";

import type { PropType, VNode } from "vue";
import type { PageCategory } from "@theme-hope/modules/info/utils/index.js";

import "../styles/category.scss";

export default defineComponent({
  name: "CategoryInfo",

  inheritAttrs: false,

  props: {
    /**
     * Category information
     *
     * 分类信息
     */
    category: {
      type: Array as PropType<PageCategory[]>,
      required: true,
    },

    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean,
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const metaLocale = useMetaLocale();

    const navigate = (event: Event, path = ""): void => {
      if (path && route.path !== path) {
        event.preventDefault();
        void router.push(path);
      }
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

              ...props.category.map(({ name, path }) =>
                h(
                  "span",
                  {
                    class: [
                      "category-item",
                      {
                        // TODO: magic number 9 is tricky here
                        [`category${generateIndexFromHash(name, 9)}`]:
                          !props.pure,
                        clickable: path,
                      },
                    ],
                    role: path ? "navigation" : "",
                    onClick: (event: Event) => navigate(event, path),
                  },
                  name
                )
              ),
              h("meta", {
                property: "articleSection",
                content: props.category.map(({ name }) => name).join(","),
              }),
            ]
          )
        : null;
  },
});
