import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { RouteLink } from "vuepress/client";

import { DropTransition } from "@theme-hope/components/transitions/index";
import { useNavigate } from "@theme-hope/composables/index";
import { ArticleIcon } from "@theme-hope/modules/blog/components/icons";
import {
  useArticles,
  useBlogLocaleData,
  useStars,
} from "@theme-hope/modules/blog/composables/index";

export default defineComponent({
  name: "ArticlesInfo",

  setup() {
    const articles = useArticles();
    const blogLocale = useBlogLocaleData();
    const stars = useStars();
    const navigate = useNavigate();

    const articleCount = computed(() => articles.value.items.length);
    const starredArticles = computed(() => stars.value.items);

    return (): VNode =>
      h(DropTransition, () =>
        h("div", { class: "vp-star-article-wrapper" }, [
          h(
            "div",
            {
              class: "title",
              onClick: () => {
                navigate(articles.value.path);
              },
            },
            [
              h(ArticleIcon),
              h("span", { class: "num" }, articleCount.value),
              blogLocale.value.article,
            ],
          ),
          h("hr"),
          starredArticles.value.length
            ? h(
                "ul",
                { class: "vp-star-articles" },
                starredArticles.value.map(({ info, path }, index) =>
                  h(
                    DropTransition,
                    { appear: true, delay: 0.08 * (index + 1) },
                    () =>
                      h(
                        "li",
                        { class: "vp-star-article" },
                        h(RouteLink, { to: path }, () => info.title),
                      ),
                  ),
                ),
              )
            : h(
                "div",
                { class: "vp-star-article-empty" },
                blogLocale.value.empty.replace("$text", blogLocale.value.star),
              ),
        ]),
      );
  },
});
