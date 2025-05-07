import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { RouteLink } from "vuepress/client";

import { ArticleIcon } from "@theme-hope/components/blog/icons";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useArticles } from "@theme-hope/composables/blog/useArticles";
import { useBlogLocaleData } from "@theme-hope/composables/blog/useBlogLocale";
import { useStars } from "@theme-hope/composables/blog/useStars";
import { useNavigate } from "@theme-hope/composables/useNavigate";

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
