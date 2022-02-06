import { withBase } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent, toRef } from "vue";
import { useRouter } from "vue-router";

import {
  LockIcon,
  SlideIcon,
  StickyIcon,
} from "@theme-hope/module/blog/components/icons";
import { useArticleInfo } from "@theme-hope/module/blog/composables";
import { usePathEncrypt } from "@theme-hope/module/encrypt/composables";

import type { PropType, VNode } from "vue";
import type { ArticleMeta } from "../../../../shared";

export default defineComponent({
  name: "ArticleItem",

  props: {
    path: { type: String, required: true },
    meta: {
      type: Object as PropType<ArticleMeta>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const meta = toRef(props, "meta");
    const { getPathEncryptStatus } = usePathEncrypt();

    const isEncrypted = computed(() => getPathEncryptStatus(props.path));

    const articleInfo = useArticleInfo(meta);

    return (): VNode =>
      h(
        "article",
        {
          class: "article",
          vocab: "https://schema.org/",
          typeof: "Article",
        },
        [
          meta.value.sticky ? h(StickyIcon) : null,
          h(
            "header",
            {
              class: "title",
              onClick: () => router.push(props.path),
            },
            [
              isEncrypted.value ? h(LockIcon) : null,
              meta.value.type === "slide" ? h(SlideIcon) : null,
              h("span", { property: "headline" }, meta.value.title),
              meta.value.cover
                ? h("meta", {
                    property: "image",
                    content: withBase(meta.value.cover),
                  })
                : null,
            ]
          ),
          meta.value.excerpt
            ? h("div", { class: "excerpt", innerHTML: meta.value.excerpt })
            : null,
          h("hr", { class: "hr" }),
          h(resolveComponent("ArticleInfo"), articleInfo),
        ]
      );
  },
});
