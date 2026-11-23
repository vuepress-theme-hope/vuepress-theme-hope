import type { PropType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { generateIndexFromHash } from "vuepress-shared/client";
import { RouteLink } from "vuepress/client";

import { CategoryIcon } from "@theme-hope/components/info/icons";
import { useMetaLocale } from "@theme-hope/composables/info/useMetaLocale";
import { usePure } from "@theme-hope/composables/usePure";
import type { PageCategory } from "@theme-hope/utils/info/typings";

import cssVariables from "../../styles/variables.module.scss";
import "../../styles/info/category-info.scss";

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
  },

  setup(props) {
    const metaLocale = useMetaLocale();
    const isPure = usePure();

    return (): VNode | null =>
      props.category.length > 0
        ? h(
            "span",
            {
              class: "page-category-info",
              "aria-label": `${metaLocale.value.category}${isPure.value ? "" : "🌈"}`,
              ...(isPure.value ? {} : { "data-balloon-pos": "up" }),
            },
            [
              h(CategoryIcon),

              props.category.map(({ name, path }) =>
                path
                  ? h(
                      RouteLink,
                      {
                        class: [
                          "page-category-item",
                          {
                            [`color${generateIndexFromHash(name, Number(cssVariables.colorNumber))}`]:
                              !isPure.value,
                            clickable: true,
                          },
                        ],
                        to: path,
                      },
                      () => name,
                    )
                  : h(
                      "span",
                      {
                        class: [
                          "page-category-item",
                          {
                            [`color${generateIndexFromHash(name, Number(cssVariables.colorNumber))}`]:
                              !isPure.value,
                          },
                        ],
                      },
                      name,
                    ),
              ),
              h("meta", {
                property: "articleSection",
                content: props.category.map(({ name }) => name).join(","),
              }),
            ],
          )
        : null;
  },
});
