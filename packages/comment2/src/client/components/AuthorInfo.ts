import { useAuthor, useLocaleConfig } from "@mr-hope/vuepress-shared/client";
import { defineComponent, h } from "vue";
import { AuthorIcon } from "./icons";
import { commentOptions, pageInfoI18n } from "../define";

import type { VNode } from "vue";

export default defineComponent({
  name: "AuthorInfo",

  setup() {
    const author = useAuthor(commentOptions.author);
    const pageInfoLocale = useLocaleConfig(pageInfoI18n);

    return (): VNode | null =>
      author.value.length
        ? h(
            "span",
            {
              class: "author-info",
              ...(commentOptions.hint !== false
                ? {
                    ariaLabel: pageInfoLocale.value.author,
                    "data-balloon-pos": "down",
                  }
                : {}),
            },
            [
              h(AuthorIcon),
              h("span", author.value.join(", ")),
              h("span", {
                property: "author",
                content: author.value.join(", "),
              }),
            ]
          )
        : null;
  },
});
