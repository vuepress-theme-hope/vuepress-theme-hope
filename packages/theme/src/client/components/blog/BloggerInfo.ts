import { getAuthor } from "@mr-hope/vuepress-shared/lib/client";
import { useSiteLocaleData, withBase } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import MediaLinks from "../medialinks";
import {
  useBlogOptions,
  useArticleList,
  useCategoryMap,
  useTimelineList,
  useTagMap,
  useThemeData,
  useThemeLocaleData,
} from "../../composables";
import { navigate } from "../../utils";

import type { VNode } from "vue";

export default defineComponent({
  name: "BloggerInfo",

  setup() {
    const blogOptions = useBlogOptions();
    const siteLocale = useSiteLocaleData();
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const articleList = useArticleList();
    const categoryList = useCategoryMap();
    const tagList = useTagMap();
    const timelineList = useTimelineList();

    const bloggerName = computed(
      () =>
        blogOptions.value.name ||
        getAuthor(themeData.value.author)[0]?.name ||
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
                    ariaLabel: locale.value.intro,
                    "data-balloon-pos": "down",
                    role: "navigation",
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    onClick: () => navigate(intro.value!),
                  }
                : {}),
            },
            [
              bloggerAvatar.value
                ? h("img", {
                    class: [
                      "avatar",
                      {
                        round: blogOptions.value.roundAvatar,
                        property: "image",
                        src: withBase(bloggerAvatar.value),
                        alt: "Blogger Avatar",
                      },
                    ],
                  })
                : null,
              bloggerName.value
                ? h(
                    "div",
                    { class: "name", property: "name" },
                    bloggerName.value
                  )
                : null,
              intro.value
                ? h("meta", { property: "url", content: withBase(intro.value) })
                : null,
            ]
          ),
          h("div", { class: "num-wrapper" }, [
            h("div", { onClick: () => navigate("/article/") }, [
              h("div", { class: "number" }, articleList.value.length),
              h("div", locale.value.article),
            ]),
            h("div", { onClick: () => navigate("/category/") }, [
              h(
                "div",
                { class: "number" },
                Object.keys(categoryList.value).length
              ),
              h("div", locale.value.category),
            ]),
            h("div", { onClick: () => navigate("/tag/") }, [
              h("div", { class: "number" }, Object.keys(tagList.value).length),
              h("div", locale.value.tag),
            ]),
            h("div", { onClick: () => navigate("/timeline/") }, [
              h("div", { class: "number" }, timelineList.value.length),
              h("div", locale.value.timeline),
            ]),
          ]),
          h(MediaLinks),
        ]
      );
  },
});
