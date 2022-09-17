import { withBase } from "@vuepress/client";
import { defineComponent, h, toRef, unref } from "vue";
import { RouterLink } from "vue-router";

import PageInfo from "@theme-hope/modules/info/components/PageInfo.js";
import {
  SlideIcon,
  StickyIcon,
} from "@theme-hope/modules/blog/components/icons/index.js";
import { useArticleInfo } from "@theme-hope/modules/blog/composables/index.js";
import { LockIcon } from "@theme-hope/modules/encrypt/components/icons.js";

import type { PropType, VNode } from "vue";
import type { ArticleInfo } from "../../../../shared/index.js";

import "../styles/article-item.scss";

export default defineComponent({
  name: "ArticleItem",

  props: {
    info: {
      type: Object as PropType<ArticleInfo>,
      required: true,
    },
    path: { type: String, required: true },
  },

  setup(props) {
    const info = toRef(props, "info");

    const { config, items } = useArticleInfo(info);

    return (): VNode =>
      h(
        "article",
        {
          class: "article",
          vocab: "https://schema.org/",
          typeof: "Article",
        },
        h(RouterLink, { to: props.path }, () => [
          info.value.sticky ? h(StickyIcon) : null,
          h("header", { class: "title" }, [
            info.value.isEncrypted ? h(LockIcon) : null,
            info.value.type === "slide" ? h(SlideIcon) : null,
            h("span", { property: "headline" }, info.value.title),
            info.value.cover
              ? h("meta", {
                  property: "image",
                  content: withBase(info.value.cover),
                })
              : null,
          ]),
          info.value.excerpt
            ? h("div", { class: "excerpt", innerHTML: info.value.excerpt })
            : null,
          h("hr", { class: "hr" }),
          h(PageInfo, {
            config: unref(config),
            ...(items.value ? { items: items.value } : {}),
          }),
        ])
      );
  },
});
