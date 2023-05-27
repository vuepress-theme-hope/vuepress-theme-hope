import {
  type FunctionalComponent,
  type VNode,
  computed,
  defineComponent,
  h,
  ref,
} from "vue";
import { RouterLink } from "vue-router";
import { keys } from "vuepress-shared/client";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useNavigate, useThemeLocaleData } from "@theme-hope/composables/index";
import CategoryList from "@theme-hope/modules/blog/components/CategoryList";
import TagList from "@theme-hope/modules/blog/components/TagList";
import TimelineList from "@theme-hope/modules/blog/components/TimelineList";
import {
  ArticleIcon,
  CategoryIcon,
  TagIcon,
  TimelineIcon,
} from "@theme-hope/modules/blog/components/icons/index";
import {
  useArticles,
  useCategoryMap,
  useStars,
  useTagMap,
} from "@theme-hope/modules/blog/composables/index";

import { ArticleInfoType } from "../../../../shared/index.js";

import "../styles/info-list.scss";

export default defineComponent({
  name: "InfoList",

  setup() {
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap = useCategoryMap();
    const categoryNumber = computed(() => keys(categoryMap.value.map).length);
    const stars = useStars();
    const tagMap = useTagMap();
    const tagNumber = computed(() => keys(tagMap.value.map).length);
    const navigate = useNavigate();

    const active = ref<"article" | "category" | "tag" | "timeline">("article");

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
      h("div", { class: "vp-blog-infos" }, [
        h(
          "div",
          { class: "vp-blog-type-switcher" },
          buttons.map(([key, icon]) =>
            h(
              "button",
              {
                type: "button",
                class: "vp-blog-type-button",
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

        h(DropTransition, () =>
          // article
          active.value === "article"
            ? h("div", { class: "vp-sticky-article-wrapper" }, [
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
                  { class: "vp-sticky-articles" },
                  stars.value.items.map(({ info, path }, index) =>
                    h(
                      DropTransition,
                      { appear: true, delay: 0.08 * (index + 1) },
                      () =>
                        h(
                          "li",
                          { class: "vp-sticky-article" },
                          h(
                            RouterLink,
                            { to: path },
                            () => info[ArticleInfoType.title]
                          )
                        )
                    )
                  )
                ),
              ])
            : active.value === "category"
            ? h("div", { class: "vp-category-wrapper" }, [
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
              ])
            : active.value === "tag"
            ? h("div", { class: "vp-tag-wrapper" }, [
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
              ])
            : h(DropTransition, () => h(TimelineList))
        ),
      ]);
  },
});
