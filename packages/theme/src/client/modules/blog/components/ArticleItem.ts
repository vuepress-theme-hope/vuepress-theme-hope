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

    return (): VNode =>
      h(
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
            info.value[ArticleInfoType.sticky] ? h(StickyIcon) : null,
            h(RouterLink, { to: props.path }, () => [
              h("header", { class: "title" }, [
                info.value[ArticleInfoType.isEncrypted] ? h(LockIcon) : null,
                info.value[ArticleInfoType.type] === PageType.slide
                  ? h(SlideIcon)
                  : null,
                h(
                  "span",
                  { property: "headline" },
                  info.value[ArticleInfoType.title]
                ),
                info.value[ArticleInfoType.cover]
                  ? h("meta", {
                      property: "image",
                      content: withBase(info.value[ArticleInfoType.cover]!),
                    })
                  : null,
              ]),
            ]),
            info.value[ArticleInfoType.excerpt]
              ? h("div", {
                  class: "article-excerpt",
                  innerHTML: info.value[ArticleInfoType.excerpt],
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
  },
});
