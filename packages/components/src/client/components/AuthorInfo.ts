import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { defineComponent, h } from "vue";
import { AuthorIcon } from "./icons";
import { articleInfoLocales } from "../define";

import type { AuthorInfo } from "@mr-hope/vuepress-shared";
import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "AuthorInfo",

  props: {
    author: {
      type: Array as PropType<AuthorInfo[]>,
      required: true,
    },

    hint: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const pageInfoLocale = useLocaleConfig(articleInfoLocales);

    return (): VNode | null =>
      props.author.length
        ? h(
            "span",
            {
              class: "author-info",
              ariaLabel: pageInfoLocale.value.author,
              ...(props.hint ? { "data-balloon-pos": "down" } : {}),
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
