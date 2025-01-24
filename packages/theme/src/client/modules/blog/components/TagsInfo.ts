import { keys } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { DropTransition } from "@theme-hope/components/transitions/index";
import { useNavigate } from "@theme-hope/composables/index";
import TagList from "@theme-hope/modules/blog/components/TagList";
import { TagIcon } from "@theme-hope/modules/blog/components/icons";
import {
  useBlogLocaleData,
  useTagMap,
} from "@theme-hope/modules/blog/composables/index";

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
