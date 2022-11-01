import { computed, defineComponent, h, ref } from "vue";

import CategoryList from "@theme-hope/modules/blog/components/CategoryList.js";
import DropTransition from "@theme-hope/components/transitions/DropTransition.js";
import TagList from "@theme-hope/modules/blog/components/TagList.js";
import TimelineList from "@theme-hope/modules/blog/components/TimelineList.js";
import {
  ArticleIcon,
  CategoryIcon,
  TagIcon,
  TimelineIcon,
} from "@theme-hope/modules/blog/components/icons/index.js";

import {
  useNavigate,
  useThemeLocaleData,
} from "@theme-hope/composables/index.js";
import {
  useArticles,
  useCategoryMap,
  useStars,
  useTagMap,
} from "@theme-hope/modules/blog/composables/index.js";
import { ArticleInfoType } from "../../../../shared/index.js";

import type { FunctionalComponent, VNode } from "vue";

import "../styles/info-list.scss";

export default defineComponent({
  name: "InfoList",

  setup() {
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap = useCategoryMap();
    const categoryNumber = computed(
      () => Object.keys(categoryMap.value.map).length
    );
    const stars = useStars();
    const tagMap = useTagMap();
    const tagNumber = computed(() => Object.keys(tagMap.value.map).length);
    const navigate = useNavigate();

    const active = ref("article");

    const locale = computed(() => themeLocale.value.blogLocales);

    const buttons: [
      "article" | "category" | "tag" | "timeline",
      FunctionalComponent
    ][] = [
      ["article", ArticleIcon],
      ["category", CategoryIcon],
      ["tag", TagIcon],
      ["timeline", TimelineIcon],
    ];

    return (): VNode =>
      h("div", { class: "blog-info-list" }, [
        h(
          "div",
          { class: "blog-type-wrapper" },
          buttons.map(([key, icon]) =>
            h(
              "button",
              {
                class: "blog-type-button",
                onClick: () => {
                  active.value = key;
                },
              },
              h(
                "div",
                {
                  class: ["icon-wrapper", { active: active.value === key }],
                  "aria-label": locale.value[key],
                  "data-balloon-pos": "up",
                },
                h(icon)
              )
            )
          )
        ),

        // article
        active.value === "article"
          ? h(DropTransition, () => [
              h("div", { class: "sticky-article-wrapper" }, [
                h(
                  "div",
                  {
                    class: "title",
                    onClick: () => navigate(articles.value.path),
                  },
                  [
                    h(ArticleIcon),
                    h("span", { class: "num" }, articles.value.items.length),
                    locale.value.article,
                  ]
                ),
                h("hr"),
                h(
                  "ul",
                  { class: "sticky-article-list" },
                  stars.value.items.map(({ info, path }, index) =>
                    h(
                      DropTransition,
                      { appear: true, delay: 0.08 * (index + 1) },
                      () =>
                        h(
                          "li",
                          {
                            class: "sticky-article",
                            onClick: () => navigate(path),
                          },
                          info[ArticleInfoType.title]
                        )
                    )
                  )
                ),
              ]),
            ])
          : null,

        // category
        active.value === "category"
          ? h(DropTransition, () => [
              h("div", { class: "category-wrapper" }, [
                categoryNumber.value
                  ? h(
                      "div",
                      {
                        class: "title",
                        onClick: () => navigate(categoryMap.value.path),
                      },
                      [
                        h(CategoryIcon),
                        h("span", { class: "num" }, categoryNumber.value),
                        locale.value.category,
                      ]
                    )
                  : null,
                h("hr"),
                h(DropTransition, { delay: 0.04 }, () => h(CategoryList)),
              ]),
            ])
          : null,

        // tag
        active.value === "tag"
          ? h(DropTransition, () => [
              h("div", { class: "tag-wrapper" }, [
                tagNumber.value
                  ? h(
                      "div",
                      {
                        class: "title",
                        onClick: () => navigate(tagMap.value.path),
                      },
                      [
                        h(TagIcon),
                        h("span", { class: "num" }, tagNumber.value),
                        locale.value.tag,
                      ]
                    )
                  : null,
                h("hr"),
                h(DropTransition, { delay: 0.04 }, () => h(TagList)),
              ]),
            ])
          : null,

        // timeline
        active.value === "timeline"
          ? h(DropTransition, () => h(TimelineList))
          : null,
      ]);
  },
});
