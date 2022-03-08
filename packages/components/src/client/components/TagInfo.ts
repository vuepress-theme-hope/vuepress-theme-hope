import {
  randomSortArray,
  useLocaleConfig,
} from "@mr-hope/vuepress-shared/lib/client";
import { defineComponent, h, onMounted, ref } from "vue";
import { TagIcon } from "./icons";
import Tag from "./Tag"
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
    const pageInfoLocale = useLocaleConfig(articleInfoLocales);

    const colorMap = ref(
      Array(9)
        .fill(null)
        .map((_, index) => index)
    );


    onMounted(() => {
      colorMap.value = randomSortArray(colorMap.value);
    });

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
                props.tag.map(({ name, path }, index) =>
                  h("li", 
                    {
                      class: "tag-item",
                    }, 
                    h(Tag, { name, path, color: props.color, colorIndex: index }))
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
