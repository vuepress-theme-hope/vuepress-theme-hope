import { getAuthor } from "@mr-hope/vuepress-shared";
import { useSiteLocaleData, withBase } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import MediaLinks from "../medialinks";
import {
  useArticleList,
  useBlogOptions,
  useThemeData,
  useThemeLocaleData,
} from "../../composables";
import { navigate } from "../../utils";

import type { VNode } from "vue";
import type {} from "../../../shared";

export default defineComponent({
  name: "BloggerInfo",

  setup() {
    const blogOptions = useBlogOptions();
    const siteLocale = useSiteLocaleData();
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const articleList = useArticleList();

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
            //     <div @click="navigate('/article/')">
            //       <div class="num">{{ articleNumber }}</div>
            //       <div>{{ locales.article }}</div>
            //     </div>
            //     <div @click="navigate('/category/')">
            //       <div class="num">{{ $category.list.length }}</div>
            //       <div>{{ locales.category }}</div>
            //     </div>
            //     <div @click="navigate('/tag/')">
            //       <div class="num">{{ $tag.list.length }}</div>
            //       <div>{{ locales.tag }}</div>
            //     </div>
            //     <div @click="navigate('/timeline/')">
            //       <div class="num">{{ $timelineItems.length }}</div>
            //       <div>{{ locales.timeline }}</div>
            //     </div>
            //   </div>
          ]),
          h(MediaLinks),
        ]
      );
  },
});
