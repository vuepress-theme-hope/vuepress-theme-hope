import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { RouteLink, resolveRoute } from "vuepress/client";

import { useArticles } from "@theme-hope/composables/blog/useArticles";
import { useBlogLocaleData } from "@theme-hope/composables/blog/useBlogLocale";
import { useStars } from "@theme-hope/composables/blog/useStars";
import { useData } from "@theme-hope/composables/useData";

import "../../styles/blog/article-type.scss";

declare const __VP_BLOG_TYPES__: { key: string; path: string }[];

export default defineComponent({
  name: "ArticleType",

  setup() {
    const { page, routeLocale } = useData();
    const articles = useArticles();
    const stars = useStars();
    const blogLocale = useBlogLocaleData();

    const types = computed(() => {
      return [
        {
          text: blogLocale.value.all,
          path: articles.value.path,
        },
        { text: blogLocale.value.star, path: stars.value.path },
        ...__VP_BLOG_TYPES__.map(({ key, path }) => {
          const routePath = path.replace(/^\//, routeLocale.value);

          return {
            text:
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              blogLocale.value[key] ??
              resolveRoute(routePath).meta.title ??
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
