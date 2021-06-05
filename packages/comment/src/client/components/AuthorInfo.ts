import { useAuthor } from "@mr-hope/vuepress-shared/client";
import { useRouteLocale } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { AuthorIcon } from "./icons";
import { commentOptions, pageInfoI18n } from "../define";

import type { VNode } from "vue";

export default defineComponent({
  name: "AuthorInfo",

  components: { AuthorIcon },

  setup() {
    const routeLocale = useRouteLocale();

    const author = useAuthor(commentOptions.author);
    const text = computed(() => author.value.join(", "));
    const hint = computed(() => pageInfoI18n[routeLocale.value].author);

    return (): VNode | null =>
      author.value
        ? h(
            "span",
            {
              class: "author-info",
              ...(commentOptions.hint !== false
                ? {
                    ariaLabel: hint.value,
                    "data-balloon-pos": "down",
                  }
                : {}),
            },
            [h(AuthorIcon), h("span", text.value)]
          )
        : null;
  },
});
