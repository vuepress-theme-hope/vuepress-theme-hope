import type { Slot } from "@vuepress/helper/client";
import { keys } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { RouteLink, withBase } from "vuepress/client";

import SocialMedias from "@theme-hope/components/blog/SocialMedias";
import { useArticles } from "@theme-hope/composables/blog/useArticles";
import { useBlogLocaleData } from "@theme-hope/composables/blog/useBlogLocale";
import { useBlogOptions } from "@theme-hope/composables/blog/useBlogOptions";
import { useCategoryMap } from "@theme-hope/composables/blog/useCategoryMap";
import { useTagMap } from "@theme-hope/composables/blog/useTagMap";
import { useTimeline } from "@theme-hope/composables/blog/useTimeline";
import { useData } from "@theme-hope/composables/useData";
import { useNavigate } from "@theme-hope/composables/useNavigate";
import type { BloggerInfoSlotData } from "@theme-hope/typings/slots";

import { getAuthor } from "../../../shared/index.js";

import "../../styles/blog/blogger-info.scss";

export default defineComponent({
  name: "BloggerInfo",

  slots: Object as SlotsType<{
    bloggerInfo?: Slot<BloggerInfoSlotData>;
  }>,

  setup(_props, { slots }) {
    const blogLocale = useBlogLocaleData();
    const blogOptions = useBlogOptions();
    const { siteLocale, themeLocale } = useData();
    const articles = useArticles();
    const categoryMap = useCategoryMap();
    const tagMap = useTagMap();
    const timelines = useTimeline();
    const navigate = useNavigate();

    const bloggerInfo = computed(() => ({
      name:
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        blogOptions.value.name ??
        getAuthor(themeLocale.value.author)[0]?.name ??
        siteLocale.value.title,
      avatar: blogOptions.value.avatar ?? themeLocale.value.logo ?? null,
      description: blogOptions.value.description ?? null,
    }));

    const intro = computed(() => blogOptions.value.intro);

    return (): VNode => {
      const { article, category, tag, timeline } = blogLocale.value;
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
        slots.bloggerInfo?.(bloggerInfo.value) ?? [
          h(
            "div",
            {
              class: "vp-blogger",
              ...(intro.value
                ? {
                    "aria-label": blogLocale.value.intro,
                    "data-balloon-pos": "down",
                    role: "link",
                    onClick: (): void => {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      navigate(intro.value!);
                    },
                  }
                : {}),
            },
            [
              bloggerInfo.value.avatar
                ? h("img", {
                    class: "vp-blogger-avatar",
                    src: withBase(bloggerInfo.value.avatar),
                    property: "image",
                    alt: "Blogger Avatar",
                    loading: "lazy",
                  })
                : null,
              bloggerInfo.value.name
                ? h(
                    "div",
                    { class: "vp-blogger-name", property: "name" },
                    bloggerInfo.value.name,
                  )
                : null,
              bloggerInfo.value.description
                ? h("div", {
                    class: "vp-blogger-description",
                    innerHTML: bloggerInfo.value.description,
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
              h(RouteLink, { class: "vp-blog-count", to: path }, () => [
                h("div", { class: "count" }, count),
                h("div", locale),
              ]),
            ),
          ),
          h(SocialMedias),
        ],
      );
    };
  },
});
