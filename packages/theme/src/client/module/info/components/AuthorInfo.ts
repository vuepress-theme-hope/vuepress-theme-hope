import { defineComponent, h } from "vue";

import { AuthorIcon } from "@theme-hope/module/info/components/icons";
import { useMetaLocale } from "@theme-hope/module/info/composables";

import type { PropType, VNode } from "vue";
import type { AuthorInfo } from "vuepress-shared";

export default defineComponent({
  name: "AuthorInfo",

  props: {
    author: {
      type: Array as PropType<AuthorInfo[]>,
      required: true,
    },

    pure: Boolean,
  },

  setup(props) {
    const metaLocale = useMetaLocale();

    return (): VNode | null =>
      props.author.length
        ? h(
            "span",
            {
              class: "author-info",
              "aria-label": `${metaLocale.value.author}${
                props.pure ? "" : "🖊"
              }`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
            },
            [
              h(AuthorIcon),
              h(
                "span",
                props.author.map((item) =>
                  item.url
                    ? h(
                        "a",
                        {
                          class: "author-item",
                          href: item.url,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                        item.name
                      )
                    : h("span", { class: "author-item" }, item.name)
                )
              ),
              h("span", {
                property: "author",
                content: props.author.map((item) => item.name).join(", "),
              }),
            ]
          )
        : null;
  },
});
