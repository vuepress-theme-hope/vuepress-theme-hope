import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, resolveComponent, h } from "vue";
import AuthorInfo from "./AuthorInfo";
import CategoryInfo from "./CategoryInfo";
import DateInfo from "./DateInfo";
import PageViewInfo from "./PageViewInfo";
import ReadingTimeInfo from "./ReadingTimeInfo";
import TagInfo from "./TagInfo";
import WordInfo from "./WordInfo";
import { pageInfoLocales } from "../define";

import type { PropType, VNode } from "vue";
import type { PageInfoFrontmatter, PageInfo } from "../../shared";

import "balloon-css/balloon.css";
import "../styles/pageinfo.scss";

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

  props: {
    titleIcon: {
      type: Boolean,
      default: true,
    },

    titleIconPrefix: {
      type: String,
      default: "",
    },

    items: {
      type: Array as PropType<PageInfo[]>,
      default: (): PageInfo[] => [
        "Author",
        "PageView",
        "Date",
        "Category",
        "Tag",
        "ReadingTime",
      ],
    },

    defaultAuthor: {
      type: String,
      default: "",
    },

    categoryPath: {
      type: String,
      default: "",
    },

    tagPath: {
      type: String,
      default: "",
    },

    hint: {
      type: Boolean,
      default: true,
    },

    visitor: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<PageInfoFrontmatter>();

    const pageInfoItems = computed<PageInfo[] | false>(() => {
      const pluginConfig = props.items;
      const pageConfig = frontmatter.value.pageInfo;

      return pageConfig === false
        ? false
        : Array.isArray(pageConfig)
        ? pageConfig
        : pluginConfig;
    });

    const isOriginal = computed(() => frontmatter.value.original);
    const pageInfoLocale = useLocaleConfig(pageInfoLocales);

    return (): VNode =>
      h("div", { class: "page-title" }, [
        h("h1", [
          props.titleIcon && frontmatter.value.icon
            ? h("i", {
                class: [
                  "iconfont",
                  `${props.titleIconPrefix || ""}${frontmatter.value.icon}`,
                ],
              })
            : null,
          page.value.title,
        ]),
        pageInfoItems.value
          ? h("div", { class: "page-info" }, [
              isOriginal.value
                ? h("span", { class: "origin" }, pageInfoLocale.value.origin)
                : null,
              ...pageInfoItems.value.map((item) =>
                h(resolveComponent(`${item}-info`), props)
              ),
            ])
          : null,
        h("hr"),
      ]);
  },
});
