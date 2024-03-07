import type { PropType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { usePageData, useRouter } from "vuepress/client";
import { generateIndexFromHash } from "vuepress-shared/client";

import { TagIcon } from "@theme-hope/modules/info/components/icons";
import { useMetaLocale } from "@theme-hope/modules/info/composables/index";
import type { PageTag } from "@theme-hope/modules/info/utils/index";

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

    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean,
  },

  setup(props) {
    const router = useRouter();
    const page = usePageData();
    const metaLocale = useMetaLocale();

    const navigate = (event: Event, path = ""): void => {
      if (path && page.value.path !== path) {
        event.preventDefault();
        void router.push(path);
      }
    };

    return (): VNode | null =>
      props.tag.length
        ? h(
            "span",
            {
              class: "page-tag-info",
              "aria-label": `${metaLocale.value.tag}${props.pure ? "" : "🏷"}`,
              ...(props.pure ? {} : { "data-balloon-pos": "up" }),
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
                        // TODO: magic number 9 is tricky here
                        [`tag${generateIndexFromHash(name, 9)}`]: !props.pure,
                        clickable: path,
                      },
                    ],
                    role: path ? "navigation" : "",
                    onClick: (event: Event) => navigate(event, path),
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
