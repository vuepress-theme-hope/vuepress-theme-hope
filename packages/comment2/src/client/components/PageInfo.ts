import {
  useIconPrefix,
  useLocaleConfig,
  useThemePluginConfig,
} from "@mr-hope/vuepress-shared/client";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, resolveComponent, h } from "vue";
import AuthorInfo from "./AuthorInfo";
import CategoryInfo from "./CategoryInfo";
import DateInfo from "./DateInfo";
import PageViewInfo from "./PageViewInfo";
import ReadingTimeInfo from "./ReadingTimeInfo";
import TagInfo from "./TagInfo";
import WordInfo from "./WordInfo";
import { commentOptions, pageInfoI18n } from "../define";

import type { VNode } from "vue";
import type {
  CommentOptions,
  CommentPluginFrontmatter,
  PageInfoType,
} from "../../shared";

import "balloon-css/balloon.css";

export default defineComponent({
  name: "PageInfo",

  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    PageViewInfo,
    ReadingTimeInfo,
    TagInfo,
    WordInfo,
  },

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const themePluginConfig = useThemePluginConfig<CommentOptions>("comment");
    const iconPrefix = useIconPrefix();

    const config = computed<PageInfoType[] | false>(() => {
      const themeConfig = themePluginConfig.value.pageInfo;
      const pluginConfig = commentOptions.pageInfo;
      const pageConfig = frontmatter.value.pageInfo;

      return pageConfig === false
        ? false
        : Array.isArray(pageConfig)
        ? pageConfig
        : pluginConfig === false
        ? false
        : Array.isArray(pluginConfig)
        ? pluginConfig
        : themeConfig === false
        ? false
        : Array.isArray(themeConfig)
        ? themeConfig
        : ["Author", "PageView", "Date", "Category", "Tag", "ReadingTime"];
    });

    const isOriginal = computed(() => frontmatter.value.original);
    const i18n = useLocaleConfig(pageInfoI18n);

    return (): VNode =>
      h("div", { class: "page-title" }, [
        h("h1", [
          frontmatter.value.icon
            ? h("i", {
                class: [
                  "iconfont",
                  `${iconPrefix.value}${frontmatter.value.icon}`,
                ],
              })
            : null,
          page.value.title,
        ]),
        config.value
          ? h("div", { class: "page-info" }, [
              isOriginal.value
                ? h("span", { class: "origin" }, i18n.value.origin)
                : null,
              config.value.map((item) => h(resolveComponent(`${item}-info`))),
            ])
          : null,
        h("hr"),
      ]);
  },
});
