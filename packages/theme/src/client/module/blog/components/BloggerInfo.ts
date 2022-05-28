import { useSiteLocaleData, withBase } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { getAuthor } from "vuepress-shared/lib/client";

import SocialMedia from "@theme-hope/module/blog/components/SocialMedia";
import { useNavigate, useThemeLocaleData } from "@theme-hope/composables";

import {
  useArticles,
  useBlogOptions,
  useCategoryMap,
  useTagMap,
  useTimelines,
} from "@theme-hope/module/blog/composables";

import type { VNode } from "vue";

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
        siteLocale.value.title
    );

    const bloggerAvatar = computed(
      () => blogOptions.value.avatar || themeLocale.value.logo
    );

    const locale = computed(() => themeLocale.value.blogLocales);

    const intro = computed(() => blogOptions.value.intro);

    return (): VNode =>
      h(
        "div",
        {
          class: "blogger-info",
          vocab: "https://schema.org/",
          typeof: "Person",
        },
        [
          h(
            "div",
            {
              class: "blogger",
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
                      "blogger-avatar",
                      {
                        round: blogOptions.value.roundAvatar,
                      },
                    ],
                    src: withBase(bloggerAvatar.value),
                    property: "image",
                    alt: "Blogger Avatar",
                  })
                : null,
              bloggerName.value
                ? h(
                    "div",
                    { class: "blogger-name", property: "name" },
                    bloggerName.value
                  )
                : null,
              blogOptions.value.description
                ? h("div", {
                    class: "blogger-description",
                    innerHTML: blogOptions.value.description,
                  })
                : null,
              intro.value
                ? h("meta", { property: "url", content: withBase(intro.value) })
                : null,
            ]
          ),
          h("div", { class: "num-wrapper" }, [
            h("div", { onClick: () => navigate(articles.value.path) }, [
              h("div", { class: "num" }, articles.value.items.length),
              h("div", locale.value.article),
            ]),
            h("div", { onClick: () => navigate(categoryMap.value.path) }, [
              h(
                "div",
                { class: "num" },
                Object.keys(categoryMap.value.map).length
              ),
              h("div", locale.value.category),
            ]),
            h("div", { onClick: () => navigate(tagMap.value.path) }, [
              h("div", { class: "num" }, Object.keys(tagMap.value.map).length),
              h("div", locale.value.tag),
            ]),
            h("div", { onClick: () => navigate(timelines.value.path) }, [
              h("div", { class: "num" }, timelines.value.items.length),
              h("div", locale.value.timeline),
            ]),
          ]),
          h(SocialMedia),
        ]
      );
  },
});
