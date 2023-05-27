import { usePageData, useRouteLocale } from "@vuepress/client";
import { type VNode, computed, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import {
  useArticles,
  useStars,
} from "@theme-hope/modules/blog/composables/index";

import "../styles/article-type.scss";

declare const BLOG_TYPE_INFO: { key: string; path: string }[];

export default defineComponent({
  name: "ArticleType",

  setup() {
    const page = usePageData();
    const localePath = useRouteLocale();
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const stars = useStars();

    const types = computed(() => {
      const locale = themeLocale.value.blogLocales;

      return [
        {
          text: locale.all,
          path: articles.value.path,
        },
        { text: locale.star, path: stars.value.path },
        ...BLOG_TYPE_INFO.map(({ key, path }) => ({
          text: locale[key],
          path: path.replace(/^\//, localePath.value),
        })),
      ];
    });

    return (): VNode =>
      h(
        "ul",
        { class: "vp-article-type-wrapper" },
        types.value.map((type) =>
          h(
            "li",
            {
              class: [
                "vp-article-type",
                { active: type.path === page.value.path },
              ],
            },
            h(RouterLink, { to: type.path }, () => type.text)
          )
        )
      );
  },
});
