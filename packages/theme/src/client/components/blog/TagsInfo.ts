import { keys } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import TagList from "@theme-hope/components/blog/TagList";
import { TagIcon } from "@theme-hope/components/blog/icons";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useBlogLocaleData } from "@theme-hope/composables/blog/useBlogLocale";
import { useTagMap } from "@theme-hope/composables/blog/useTagMap";
import { useNavigate } from "@theme-hope/composables/useNavigate";

export default defineComponent({
  name: "TagsInfo",

  setup() {
    const blogLocale = useBlogLocaleData();
    const tagMap = useTagMap();
    const navigate = useNavigate();

    const tagNumber = computed(() => keys(tagMap.value.map).length);

    return (): VNode =>
      h("div", { class: "vp-tag-wrapper" }, [
        tagNumber.value
          ? [
              h(
                "div",
                {
                  class: "title",
                  onClick: () => {
                    navigate(tagMap.value.path);
                  },
                },
                [
                  h(TagIcon),
                  h("span", { class: "num" }, tagNumber.value),
                  blogLocale.value.tag,
                ],
              ),
              h("hr"),
              h(DropTransition, { delay: 0.04 }, () => h(TagList)),
            ]
          : h(
              "div",
              { class: "vp-tag-empty" },
              blogLocale.value.empty.replace("$text", blogLocale.value.tag),
            ),
      ]);
  },
});
