import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { defineComponent, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TagIcon } from "./icons";
import { articleInfoLocales } from "../define";

import type { PropType, VNode } from "vue";
import type { ArticleTag } from "../../shared";

import "../styles/tag.scss";

export default defineComponent({
  name: "TagInfo",

  props: {
    tag: {
      type: Array as PropType<ArticleTag[]>,
      default: () => [],
    },

    hint: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const pageInfoLocale = useLocaleConfig(articleInfoLocales);

    const navigate = (path = ""): void => {
      if (path && route.path !== path) void router.push(path);
    };

    return (): VNode | null =>
      props.tag.length
        ? h(
            "span",
            {
              ariaLabel: pageInfoLocale.value.tag,
              ...(props.hint !== false ? { "data-balloon-pos": "down" } : {}),
            },
            [
              h(TagIcon),
              h(
                "ul",
                { class: "tags-wrapper" },
                props.tag.map(({ name, path }, index) =>
                  h(
                    "li",
                    {
                      class: ["tag", `tag${index % 9}`, { clickable: path }],
                      onClick: () => navigate(path),
                    },
                    h("span", { role: path ? "navigation" : "" }, name)
                  )
                )
              ),
              h("meta", {
                property: "keywords",
                content: props.tag.map(({ name }) => name).join(","),
              }),
            ]
          )
        : null;
  },
});
