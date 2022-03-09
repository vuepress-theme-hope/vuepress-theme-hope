import {
  generateIndexfromHash,
  useLocaleConfig,
} from "@mr-hope/vuepress-shared/lib/client";
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

    color: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
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
              ...(props.hint ? { "data-balloon-pos": "down" } : {}),
            },
            [
              h(TagIcon),
              h(
                "ul",
                { class: "tags-wrapper" },
                props.tag.map(({ name, path }) =>
                  h(
                    "li",
                    {
                      class: [
                        "tag",
                        {
                          // TODO: magic number 9 is tricky here
                          [`tag${generateIndexfromHash(name, 9)}`]: props.color,
                          clickable: path,
                        },
                      ],
                      role: path ? "navigation" : "",
                      onClick: () => navigate(path),
                    },
                    name
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
