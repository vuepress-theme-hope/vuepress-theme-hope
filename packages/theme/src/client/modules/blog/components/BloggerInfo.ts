import { useSiteLocaleData, withBase } from "@vuepress/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { VPLink, getAuthor, keys } from "vuepress-shared/client";

import { useNavigate, useThemeLocaleData } from "@theme-hope/composables/index";
import SocialMedia from "@theme-hope/modules/blog/components/SocialMedia";
import {
  useArticles,
  useBlogOptions,
  useCategoryMap,
  useTagMap,
  useTimelines,
} from "@theme-hope/modules/blog/composables/index";

import "../styles/blogger-info.scss";

export default defineComponent({
  name: "BloggerInfo",

  setup() {
    const blogOptions = useBlogOptions();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap = useCategoryMap();
    const tagMap = useTagMap();
    const timelines = useTimelines();
    const navigate = useNavigate();

    const bloggerName = computed(
      () =>
        blogOptions.value.name ||
        getAuthor(themeLocale.value.author)[0]?.name ||
        siteLocale.value.title,
    );

    const bloggerAvatar = computed(
      () => blogOptions.value.avatar || themeLocale.value.logo,
    );

    const locale = computed(() => themeLocale.value.blogLocales);

    const intro = computed(() => blogOptions.value.intro);

    return (): VNode => {
      const { article, category, tag, timeline } = locale.value;
      const countItems: [string, number, string][] = [
        [articles.value.path, articles.value.items.length, article],
        [categoryMap.value.path, keys(categoryMap.value.map).length, category],
        [tagMap.value.path, keys(tagMap.value.map).length, tag],
        [timelines.value.path, timelines.value.items.length, timeline],
      ];

      return h(
        "div",
        {
          class: "vp-blogger-info",
          vocab: "https://schema.org/",
          typeof: "Person",
        },
        [
          h(
            "div",
            {
              class: "vp-blogger",
              ...(intro.value
                ? {
                    style: { cursor: "pointer" },
                    "aria-label": locale.value.intro,
                    "data-balloon-pos": "down",
                    role: "navigation",
                    onClick: () => navigate(intro.value!),
                  }
                : {}),
            },
            [
              bloggerAvatar.value
                ? h("img", {
                    class: [
                      "vp-blogger-avatar",
                      { round: blogOptions.value.roundAvatar },
                    ],
                    src: withBase(bloggerAvatar.value),
                    property: "image",
                    alt: "Blogger Avatar",
                  })
                : null,
              bloggerName.value
                ? h(
                    "div",
                    { class: "vp-blogger-name", property: "name" },
                    bloggerName.value,
                  )
                : null,
              blogOptions.value.description
                ? h("div", {
                    class: "vp-blogger-description",
                    innerHTML: blogOptions.value.description,
                  })
                : null,
              intro.value
                ? h("meta", { property: "url", content: withBase(intro.value) })
                : null,
            ],
          ),
          h(
            "div",
            { class: "vp-blog-counts" },
            countItems.map(([path, count, locale]) =>
              h(VPLink, { class: "vp-blog-count", to: path }, () => [
                h("div", { class: "count" }, count),
                h("div", locale),
              ]),
            ),
          ),
          h(SocialMedia),
        ],
      );
    };
  },
});
