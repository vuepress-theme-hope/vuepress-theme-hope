import type { PropType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { generateIndexFromHash } from "vuepress-shared/client";

import { useNavigate, usePure } from "@theme-hope/composables/index";
import { TagIcon } from "@theme-hope/modules/info/components/icons";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index";
import type { PageTag } from "@theme-hope/modules/info/utils/index";

import cssVariables from "../../../styles/variables.module.scss";

import "../styles/tag-info.scss";

export default defineComponent({
  name: "TagInfo",

  inheritAttrs: false,

  props: {
    /**
     * Tag information
     *
     * 标签信息
     */
    tag: {
      type: Array as PropType<PageTag[]>,
      default: () => [],
    },
  },

  setup(props) {
    const metaLocale = useMetaLocale();
    const navigate = useNavigate();
    const isPure = usePure();

    return (): VNode | null =>
      props.tag.length
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
                h(
                  "span",
                  {
                    class: [
                      "page-tag-item",
                      {
                        [`color${generateIndexFromHash(name, Number(cssVariables.colorNumber))}`]:
                          !isPure.value,
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
                property: "keywords",
                content: props.tag.map(({ name }) => name).join(","),
              }),
            ],
          )
        : null;
  },
});
