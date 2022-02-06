import { computed, defineComponent, h } from "vue";
import { useRoute } from "vue-router";
import {
  useArticles,
  useEncryptedArticles,
  useNavigate,
  useSlides,
  useStars,
  useThemeLocaleData,
} from "../../composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "ArticleType",

  setup() {
    const themeLocale = useThemeLocaleData();
    const route = useRoute();
    const articles = useArticles();
    const encryptedArticles = useEncryptedArticles();
    const slides = useSlides();
    const stars = useStars();
    const navigate = useNavigate();

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
              role: "navigation",
              onClick: () => navigate(type.path),
            },
            h("span", type.text)
          )
        )
      );
  },
});
