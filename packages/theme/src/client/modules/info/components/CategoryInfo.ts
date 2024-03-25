import type { PropType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { generateIndexFromHash } from "vuepress-shared/client";

import { useNavigate } from "@theme-hope/composables/index";
import { CategoryIcon } from "@theme-hope/modules/info/components/icons";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index";
import type { PageCategory } from "@theme-hope/modules/info/utils/index";

import "../styles/category-info.scss";

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
    const metaLocale = useMetaLocale();
    const navigate = useNavigate();

    return (): VNode | null =>
      props.category.length
        ? h(
            "span",
            {
              class: "page-category-info",
              "aria-label": `${metaLocale.value.category}${
                props.pure ? "" : "🌈"
              }`,
              ...(props.pure ? {} : { "data-balloon-pos": "up" }),
            },
            [
              h(CategoryIcon),

              props.category.map(({ name, path }) =>
                h(
                  "span",
                  {
                    class: [
                      "page-category-item",
                      {
                        // TODO: magic number 9 is tricky here
                        [`category${generateIndexFromHash(name, 9)}`]:
                          !props.pure,
                        clickable: path,
                      },
                    ],
                    role: path ? "navigation" : "",
                    onClick: () => {
                      if (path) navigate(path);
                    },
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
