import { withBase } from "@vuepress/client";
import { defineComponent, h, toRef, unref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import PageInfo from "@theme-hope/modules/info/components/PageInfo.js";
import {
  SlideIcon,
  StickyIcon,
} from "@theme-hope/modules/blog/components/icons/index.js";
import { useArticleInfo } from "@theme-hope/modules/blog/composables/index.js";
import { LockIcon } from "@theme-hope/modules/encrypt/components/icons.js";
import {
  COVER,
  EXCERPT,
  IS_ENCRYPTED,
  PageType,
  STICKY,
  TITLE,
  TYPE,
} from "../../../../shared/index.js";

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
    const router = useRouter();
    const { config, items } = useArticleInfo(props);
    const info = toRef(props, "info");

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
            onClick: () => {
              void router.push(props.path);
            },
          },
          [
            info.value[STICKY] ? h(StickyIcon) : null,
            h(RouterLink, { to: props.path }, () => [
              h("header", { class: "title" }, [
                info.value[IS_ENCRYPTED] ? h(LockIcon) : null,
                info.value[TYPE] === PageType.Slide ? h(SlideIcon) : null,
                h("span", { property: "headline" }, info.value[TITLE]),
                info.value[COVER]
                  ? h("meta", {
                      property: "image",
                      content: withBase(info.value[COVER]),
                    })
                  : null,
              ]),
            ]),
            info.value[EXCERPT]
              ? h("div", { class: "excerpt", innerHTML: info.value[EXCERPT] })
              : null,
            h("hr", { class: "hr" }),
            h(PageInfo, {
              config: unref(config),
              ...(items.value ? { items: items.value } : {}),
            }),
          ]
        )
      );
  },
});
