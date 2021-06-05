import { useBlogConfig, useTag } from "@mr-hope/vuepress-shared/client";
import { useRouteLocale } from "@vuepress/client";
import { computed, defineComponent, h, toRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TagIcon } from "./icons";
import { commentOptions, pageInfoI18n } from "../define";

import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "TagInfo",

  components: { TagIcon },

  props: {
    tags: { type: Array as PropType<string[]>, default: (): string[] => [] },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const routeLocale = useRouteLocale();

    const hint = computed(() => pageInfoI18n[routeLocale.value].tag);

    const items = props.tags.length ? toRef(props, "tags") : useTag();

    const clickable = computed(() => useBlogConfig().value !== false);

    const navigate = (tagName: string): void => {
      const path = `/tag/${tagName}/`;
      if (route.path !== path) void router.push(path);
    };

    return (): VNode | null =>
      items.value.length
        ? h(
            "span",
            commentOptions.hint !== false
              ? {
                  ariaLabel: hint.value,
                  "data-balloon-pos": "down",
                }
              : {},
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
                        clickable: clickable.value,
                      },
                      onClick: () => navigate(tag),
                    },
                    h(
                      "span",
                      { role: clickable.value ? "navigation" : "" },
                      tag
                    )
                  )
                )
              ),
            ]
          )
        : null;
  },
});
