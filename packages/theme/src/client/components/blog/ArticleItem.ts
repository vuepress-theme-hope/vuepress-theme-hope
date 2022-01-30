import { withBase } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent, toRef } from "vue";
import { useRouter } from "vue-router";
import { LockIcon, SlideIcon, StickyIcon } from "../icons";

import { useArticleInfo, usePathEncrypt } from "../../composables";

import type { PropType, VNode } from "vue";
import type { ArticleDetail } from "../../../shared";

import "../../styles/blog/article-item.scss";

export default defineComponent({
  name: "ArticleItem",

  props: {
    article: {
      type: Object as PropType<ArticleDetail>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const article = toRef(props, "article");
    const { getPathEncryptStatus } = usePathEncrypt();

    const isEncrypted = computed(() =>
      getPathEncryptStatus(article.value.path)
    );

    const articleInfo = useArticleInfo(article);

    return (): VNode =>
      h(
        "article",
        {
          class: "article",
          vocab: "https://schema.org/",
          typeof: "Article",
        },
        [
          article.value.sticky ? h(StickyIcon) : null,
          h(
            "header",
            {
              class: "title",
              onClick: () => router.push(article.value.path),
            },
            [
              isEncrypted.value ? h(LockIcon) : null,
              article.value.type === "slide" ? h(SlideIcon) : null,
              h("span", { property: "headline" }, article.value.title),
              article.value.cover
                ? h("meta", {
                    property: "image",
                    content: withBase(article.value.cover),
                  })
                : null,
            ]
          ),
          article.value.excerpt
            ? h("div", { class: "excerpt", innerHTML: article.value.excerpt })
            : null,
          h("hr", { class: "hr" }),
          h(resolveComponent("ArticleInfo"), articleInfo),
        ]
      );
  },
});
