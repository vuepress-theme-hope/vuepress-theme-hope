import type { Slot } from "@vuepress/helper/client";
import { RenderDefault, hasGlobalComponent } from "@vuepress/helper/client";
import type { ComponentOptions, SlotsType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";
import { withBase } from "vuepress/client";

import BreadCrumb from "@theme-hope/components/base/BreadCrumb";
import MarkdownContent from "@theme-hope/components/base/MarkdownContent";
import PageNav from "@theme-hope/components/base/PageNav";
import PageTitle from "@theme-hope/components/base/PageTitle";
import TOC from "@theme-hope/components/base/TOC";
import PageMeta from "@theme-hope/components/info/PageMeta";
import { useDarkMode } from "@theme-hope/composables/useDarkMode";
import { useData } from "@theme-hope/composables/useData";
import type { TocSlotData } from "@theme-hope/typings/slots";

import "../../styles/base/page-content.scss";

export default defineComponent({
  name: "PageContent",

  slots: Object as SlotsType<{
    pageTop?: Slot;
    pageBottom?: Slot;

    // content
    content?: Slot;
    contentBefore?: Slot;
    contentAfter?: Slot;

    // toc
    toc?: Slot<TocSlotData>;
    tocBefore?: Slot;
    tocAfter?: Slot;
  }>,

  setup(_props, { slots }) {
    const { frontmatter } = useData();
    const { isDarkMode } = useDarkMode();

    return (): VNode =>
      h(
        "main",
        { id: "main-content", class: "vp-page" },
        h(
          hasGlobalComponent("LocalEncrypt")
            ? (resolveComponent("LocalEncrypt") as ComponentOptions)
            : RenderDefault,
          () => [
            slots.pageTop?.(),
            frontmatter.value.cover
              ? h(
                  "div",
                  { class: "page-cover" },
                  h("img", {
                    src: withBase(frontmatter.value.cover),
                    alt: "",
                    "no-view": "",
                  }),
                )
              : null,
            h(BreadCrumb),
            h(PageTitle),
            h(TOC, {}, slots),
            slots.content?.() ?? h(MarkdownContent, {}, slots),
            h(PageMeta),
            h(PageNav),
            hasGlobalComponent("CommentService")
              ? h(resolveComponent("CommentService"), {
                  darkmode: isDarkMode.value,
                })
              : null,
            slots.pageBottom?.(),
          ],
        ),
      );
  },
});
