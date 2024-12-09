import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import {
  RouteLink,
  resolveRoute,
  usePageData,
  useRouteLocale,
} from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import {
  useArticles,
  useStars,
} from "@theme-hope/modules/blog/composables/index";

import { PageInfo } from "../../../../shared/index.js";

import "../styles/article-type.scss";

declare const __VP_BLOG_TYPES__: { key: string; path: string }[];

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
        ...__VP_BLOG_TYPES__.map(({ key, path }) => {
          const routePath = path.replace(/^\//, localePath.value);

          return {
            text:
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              locale[key] ??
              resolveRoute(routePath).meta[PageInfo.title] ??
              key,
            path: routePath,
          };
        }),
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
            h(RouteLink, { to: type.path }, () => type.text),
          ),
        ),
      );
  },
});
