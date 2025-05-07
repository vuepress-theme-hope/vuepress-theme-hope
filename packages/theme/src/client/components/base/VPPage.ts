import type { GetHeadersOptions, HeaderItem } from "@vuepress/helper/client";
import {
  RenderDefault,
  hasGlobalComponent,
  isPlainObject,
} from "@vuepress/helper/client";
import type { ComponentOptions, SlotsType, VNode } from "vue";
import { computed, defineComponent, h, resolveComponent } from "vue";
import { withBase } from "vuepress/client";

import BreadCrumb from "@theme-hope/components/base/BreadCrumb";
import MarkdownContent from "@theme-hope/components/base/MarkdownContent";
import PageNav from "@theme-hope/components/base/PageNav";
import PageTitle from "@theme-hope/components/base/PageTitle";
import TOC from "@theme-hope/components/base/TOC";
import PageMeta from "@theme-hope/components/info/PageMeta";
import { useDarkMode } from "@theme-hope/composables/useDarkMode";
import { useData } from "@theme-hope/composables/useData";

import "../../styles/base/vp-page.scss";

const DEFAULT_TOC_OPTIONS: GetHeadersOptions = {
  selector: [
    ...Array.from({ length: 6 }).map((_, i) => `#markdown-content > h${i + 1}`),
    "[vp-content] > h2",
  ].join(", "),
  levels: "deep",
  ignore: [".vp-badge", ".vp-icon"],
};

export default defineComponent({
  name: "VPPage",

  slots: Object as SlotsType<{
    pageTop?: () => VNode[] | VNode | null;
    pageBottom?: () => VNode[] | VNode | null;

    // content
    content?: () => VNode[] | VNode | null;
    contentBefore?: () => VNode[] | VNode | null;
    contentAfter?: () => VNode[] | VNode | null;

    // toc
    toc?: (headers: HeaderItem[]) => VNode[] | VNode | null;
    tocBefore?: () => VNode[] | VNode | null;
    tocAfter?: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const { frontmatter, themeLocale } = useData();
    const { isDarkMode } = useDarkMode();

    const tocOptions = computed(() => {
      const config = frontmatter.value.toc ?? themeLocale.value.toc;

      return isPlainObject(config)
        ? { ...DEFAULT_TOC_OPTIONS, ...config }
        : (config ?? true)
          ? DEFAULT_TOC_OPTIONS
          : null;
    });

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
            tocOptions.value
              ? h(TOC, { options: tocOptions.value }, slots)
              : null,
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
