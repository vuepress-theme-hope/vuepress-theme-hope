import { entries } from "@vuepress/helper/client";
import type { FunctionalComponent, VNode } from "vue";
import { defineComponent, h, ref } from "vue";

import ArticlesInfo from "@theme-hope/components/blog/ArticlesInfo";
import CategoriesInfo from "@theme-hope/components/blog/CategoriesInfo";
import TagsInfo from "@theme-hope/components/blog/TagsInfo";
import TimelineList from "@theme-hope/components/blog/TimelineList";
import {
  ArticleIcon,
  CategoryIcon,
  TagIcon,
  TimelineIcon,
} from "@theme-hope/components/blog/icons";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useBlogLocaleData } from "@theme-hope/composables/blog/useBlogLocale";

import "../../styles/blog/info-list.scss";

type InfoType = "article" | "category" | "tag" | "timeline";

const buttons: Record<InfoType, FunctionalComponent> = {
  article: ArticleIcon,
  category: CategoryIcon,
  tag: TagIcon,
  timeline: TimelineIcon,
};

export default defineComponent({
  name: "InfoList",

  setup() {
    const blogLocale = useBlogLocaleData();

    const activeType = ref<InfoType>("article");

    return (): VNode =>
      h("div", { class: "vp-blog-infos" }, [
        h(
          "div",
          { class: "vp-blog-type-switcher" },
          (entries(buttons) as [InfoType, FunctionalComponent][]).map(
            ([key, Icon]) =>
              h(
                "button",
                {
                  type: "button",
                  class: "vp-blog-type-button",
                  onClick: () => {
                    activeType.value = key;
                  },
                },
                h(
                  "div",
                  {
                    class: [
                      "vp-blog-type-icon-wrapper",
                      { active: activeType.value === key },
                    ],
                    "aria-label": blogLocale.value[key],
                    "data-balloon-pos": "down",
                  },
                  h(Icon),
                ),
              ),
          ),
        ),

        h(DropTransition, () =>
          activeType.value === "article"
            ? h(ArticlesInfo)
            : activeType.value === "category"
              ? h(CategoriesInfo)
              : activeType.value === "tag"
                ? h(TagsInfo)
                : h(TimelineList),
        ),
      ]);
  },
});
