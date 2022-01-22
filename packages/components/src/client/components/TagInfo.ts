import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { useTag } from "@mr-hope/vuepress-shared/lib/client";
import { defineComponent, h, toRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TagIcon } from "./icons";
import { pageInfoLocales } from "../define";

import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "TagInfo",

  props: {
    tags: {
      type: Array as PropType<string[]>,
      default: (): string[] => [],
    },

    tagPath: { type: String, default: "" },

    hint: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const pageInfoLocale = useLocaleConfig(pageInfoLocales);

    const items = props.tags.length ? toRef(props, "tags") : useTag();

    const navigate = (tagName: string): void => {
      const path = props.tagPath.replace(/\$tag/g, decodeURI(tagName));

      if (path && route.path !== path) void router.push(path);
    };

    return (): VNode | null =>
      items.value.length
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
                items.value.map((tag, index) =>
                  h(
                    "li",
                    {
                      class: {
                        tag: true,
                        [`tag${index % 9}`]: true,
                        clickable: props.tagPath,
                      },
                      onClick: () => navigate(tag),
                    },
                    h("span", { role: props.tagPath ? "navigation" : "" }, tag)
                  )
                )
              ),
              h("meta", {
                property: "keywords",
                content: items.value.join(","),
              }),
            ]
          )
        : null;
  },
});
