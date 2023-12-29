import type { FunctionalComponent, VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";
import { VPLink, entries, keys } from "vuepress-shared/client";

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
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap = useCategoryMap();
    const categoryNumber = computed(() => keys(categoryMap.value.map).length);
    const stars = useStars();
    const tagMap = useTagMap();
    const tagNumber = computed(() => keys(tagMap.value.map).length);
    const navigate = useNavigate();

    const activeType = ref<InfoType>("article");

    const locale = computed(() => themeLocale.value.blogLocales);

    return (): VNode =>
      h("div", { class: "vp-blog-infos" }, [
        h(
          "div",
          { class: "vp-blog-type-switcher" },
          (<[InfoType, FunctionalComponent][]>entries(buttons)).map(
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
                      "icon-wrapper",
                      { active: activeType.value === key },
                    ],
                    "aria-label": locale.value[key],
                    "data-balloon-pos": "up",
                  },
                  h(Icon),
                ),
              ),
          ),
        ),

        h(DropTransition, () =>
          // star articles
          activeType.value === "article"
            ? h("div", { class: "vp-star-article-wrapper" }, [
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
                  ],
                ),
                h("hr"),
                stars.value.items.length
                  ? h(
                      "ul",
                      { class: "vp-star-articles" },
                      stars.value.items.map(({ info, path }, index) =>
                        h(
                          DropTransition,
                          { appear: true, delay: 0.08 * (index + 1) },
                          () =>
                            h(
                              "li",
                              { class: "vp-star-article" },
                              h(
                                VPLink,
                                { to: path },
                                () => info[ArticleInfoType.title],
                              ),
                            ),
                        ),
                      ),
                    )
                  : h(
                      "div",
                      { class: "vp-star-article-empty" },
                      locale.value.empty.replace("$text", locale.value.star),
                    ),
              ])
            : activeType.value === "category"
              ? h("div", { class: "vp-category-wrapper" }, [
                  categoryNumber.value
                    ? [
                        h(
                          "div",
                          {
                            class: "title",
                            onClick: () => navigate(categoryMap.value.path),
                          },
                          [
                            h(CategoryIcon),
                            h("span", { class: "num" }, categoryNumber.value),
                            locale.value.category,
                          ],
                        ),
                        h("hr"),
                        h(DropTransition, { delay: 0.04 }, () =>
                          h(CategoryList),
                        ),
                      ]
                    : h(
                        "div",
                        { class: "vp-category-empty" },
                        locale.value.empty.replace(
                          "$text",
                          locale.value.category,
                        ),
                      ),
                ])
              : activeType.value === "tag"
                ? h("div", { class: "vp-tag-wrapper" }, [
                    tagNumber.value
                      ? [
                          h(
                            "div",
                            {
                              class: "title",
                              onClick: () => navigate(tagMap.value.path),
                            },
                            [
                              h(TagIcon),
                              h("span", { class: "num" }, tagNumber.value),
                              locale.value.tag,
                            ],
                          ),
                          h("hr"),
                          h(DropTransition, { delay: 0.04 }, () => h(TagList)),
                        ]
                      : h(
                          "div",
                          { class: "vp-tag-empty" },
                          locale.value.empty.replace("$text", locale.value.tag),
                        ),
                  ])
                : h(DropTransition, () => h(TimelineList)),
        ),
      ]);
  },
});
