import { withBase } from "@vuepress/client";
import { type PropType, type VNode, defineComponent, h, toRef } from "vue";
import { RouterLink } from "vue-router";

import {
  SlideIcon,
  StickyIcon,
} from "@theme-hope/modules/blog/components/icons/index";
import { useArticleInfo } from "@theme-hope/modules/blog/composables/index";
import { LockIcon } from "@theme-hope/modules/encrypt/components/icons";
import PageInfo from "@theme-hope/modules/info/components/PageInfo";

import {
  type ArticleInfo,
  ArticleInfoType,
  PageType,
} from "../../../../shared/index.js";

import "../styles/article-item.scss";

export default defineComponent({
  name: "ArticleItem",

  props: {
    /**
     * Article information
     *
     * 文章信息
     */
    info: {
      type: Object as PropType<ArticleInfo>,
      required: true,
    },

    /**
     * Article path
     *
     * 文章路径
     */
    path: { type: String, required: true },
  },

  setup(props) {
    const info = toRef(props, "info");
    const { info: articleInfo, items } = useArticleInfo(props);

    return (): VNode => {
      const infoValue = info.value;

      return h(
        "div",
        { class: "article-item" },
        h(
          "article",
          {
            class: "article",
            vocab: "https://schema.org/",
            typeof: "Article",
          },
          [
            infoValue[ArticleInfoType.sticky] ? h(StickyIcon) : null,
            infoValue[ArticleInfoType.cover]
              ? [
                  h("img", {
                    class: "article-cover",
                    src: withBase(infoValue[ArticleInfoType.cover]!),
                  }),
                  h("meta", {
                    property: "image",
                    content: withBase(infoValue[ArticleInfoType.cover]),
                  }),
                ]
              : [],
            h(RouterLink, { to: props.path }, () => [
              h("header", { class: "title" }, [
                infoValue[ArticleInfoType.isEncrypted] ? h(LockIcon) : null,
                infoValue[ArticleInfoType.type] === PageType.slide
                  ? h(SlideIcon)
                  : null,
                h(
                  "span",
                  { property: "headline" },
                  infoValue[ArticleInfoType.title]
                ),
              ]),
            ]),
            infoValue[ArticleInfoType.excerpt]
              ? h("div", {
                  class: "article-excerpt",
                  innerHTML: infoValue[ArticleInfoType.excerpt],
                })
              : null,
            h("hr", { class: "hr" }),
            h(PageInfo, {
              info: articleInfo.value,
              ...(items.value ? { items: items.value } : {}),
            }),
          ]
        )
      );
    };
  },
});
