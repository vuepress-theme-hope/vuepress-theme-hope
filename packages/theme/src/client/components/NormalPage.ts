import { hasGlobalComponent } from "@vuepress/helper/client";
import type { ComponentOptions, SlotsType, VNode } from "vue";
import { computed, defineComponent, h, resolveComponent } from "vue";
import { usePageFrontmatter, withBase } from "vuepress/client";
import { RenderDefault } from "vuepress-shared/client";

import BreadCrumb from "@theme-hope/components/BreadCrumb";
import MarkdownContent from "@theme-hope/components/MarkdownContent";
import PageNav from "@theme-hope/components/PageNav";
import PageTitle from "@theme-hope/components/PageTitle";
import { useThemeLocaleData } from "@theme-hope/composables/index";
import PageMeta from "@theme-hope/modules/info/components/PageMeta";
import TOC from "@theme-hope/modules/info/components/TOC";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";

import type { ThemeNormalPageFrontmatter } from "../../shared/index.js";

import "../styles/page.scss";

export default defineComponent({
  name: "NormalPage",

  slots: Object as SlotsType<{
    top?: () => VNode[] | VNode | null;
    bottom?: () => VNode[] | VNode | null;

    contentBefore?: () => VNode[] | VNode | null;
    contentAfter?: () => VNode[] | VNode | null;

    tocBefore?: () => VNode[] | VNode | null;
    tocAfter?: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const { isDarkmode } = useDarkmode();
    const themeLocale = useThemeLocaleData();

    const tocEnable = computed(
      () =>
        frontmatter.value.toc ||
        (frontmatter.value.toc !== false && themeLocale.value.toc !== false),
    );

    return (): VNode =>
      h(
        "main",
        { id: "main-content", class: "vp-page" },
        h(
          hasGlobalComponent("LocalEncrypt")
            ? <ComponentOptions>resolveComponent("LocalEncrypt")
            : RenderDefault,
          () => [
            slots.top?.(),
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
            tocEnable.value
              ? h(
                  TOC,
                  {
                    headerDepth:
                      frontmatter.value.headerDepth ??
                      themeLocale.value.headerDepth ??
                      2,
                  },
                  {
                    before: () => slots.tocBefore?.(),
                    after: () => slots.tocAfter?.(),
                  },
                )
              : null,
            slots.contentBefore?.(),
            h(MarkdownContent),
            slots.contentAfter?.(),
            h(PageMeta),
            h(PageNav),
            hasGlobalComponent("CommentService")
              ? h(resolveComponent("CommentService"), {
                  darkmode: isDarkmode.value,
                })
              : null,
            slots.bottom?.(),
          ],
        ),
      );
  },
});
