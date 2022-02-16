import { computed, defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { useThemeLocaleData } from "@theme-hope/composables";
import {
  useArticles,
  useEncryptedArticles,
  useSlides,
  useStars,
} from "@theme-hope/module/blog/composables";

import type { VNode } from "vue";

import "../styles/article-type.scss";

export default defineComponent({
  name: "ArticleType",

  setup() {
    const themeLocale = useThemeLocaleData();
    const route = useRoute();
    const articles = useArticles();
    const encryptedArticles = useEncryptedArticles();
    const slides = useSlides();
    const stars = useStars();

    const types = computed(() => {
      const locale = themeLocale.value.blogLocales;

      return [
        {
          text: locale.all,
          path: articles.value.path,
        },
        { text: locale.star, path: stars.value.path },
        { text: locale.slides, path: slides.value.path },
        { text: locale.encrypt, path: encryptedArticles.value.path },
      ];
    });

    return (): VNode =>
      h(
        "ul",
        { class: "article-type-wrapper" },
        types.value.map((type) =>
          h(
            "li",
            {
              class: ["article-type", { active: type.path === route.path }],
            },
            h(RouterLink, { to: type.path }, () => type.text)
          )
        )
      );
  },
});
