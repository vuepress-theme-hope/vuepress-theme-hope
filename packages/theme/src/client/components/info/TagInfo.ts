import type { PropType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { generateIndexFromHash } from "vuepress-shared/client";
import { RouteLink } from "vuepress/client";

import { TagIcon } from "@theme-hope/components/info/icons";
import { useMetaLocale } from "@theme-hope/composables/info/useMetaLocale";
import { usePure } from "@theme-hope/composables/usePure";
import type { PageTag } from "@theme-hope/utils/info/typings";

import cssVariables from "../../styles/variables.module.scss";
import "../../styles/info/tag-info.scss";

export default defineComponent({
  name: "TagInfo",

  inheritAttrs: false,

  props: {
    /**
     * Tag information
     *
     * 标签信息
     */
    tag: Array as PropType<PageTag[]>,
  },

  setup(props) {
    const metaLocale = useMetaLocale();
    const isPure = usePure();

    return (): VNode | null =>
      props.tag?.length
        ? h(
            "span",
            {
              class: "page-tag-info",
              "aria-label": `${metaLocale.value.tag}${isPure.value ? "" : "🏷"}`,
              ...(isPure.value ? {} : { "data-balloon-pos": "up" }),
            },
            [
              h(TagIcon),

              props.tag.map(({ name, path }) =>
                path
                  ? h(
                      RouteLink,
                      {
                        class: [
                          "page-tag-item",
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
                          "page-tag-item",
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
                property: "keywords",
                content: props.tag.map(({ name }) => name).join(","),
              }),
            ],
          )
        : null;
  },
});
