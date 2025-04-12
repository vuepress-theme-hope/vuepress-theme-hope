import type { GetHeadersOptions } from "@vuepress/helper/client";
import {
  RenderDefault,
  hasGlobalComponent,
  isPlainObject,
} from "@vuepress/helper/client";
import type { ComponentOptions, SlotsType, VNode } from "vue";
import { computed, defineComponent, h, resolveComponent } from "vue";
import { usePageFrontmatter, withBase } from "vuepress/client";

import BreadCrumb from "@theme-hope/components/BreadCrumb";
import MarkdownContent from "@theme-hope/components/MarkdownContent";
import PageNav from "@theme-hope/components/PageNav";
import PageTitle from "@theme-hope/components/PageTitle";
import { useThemeLocaleData } from "@theme-hope/composables/index";
import PageMeta from "@theme-hope/modules/info/components/PageMeta";
import TOC from "@theme-hope/modules/info/components/TOC";
import { useDarkMode } from "@theme-hope/modules/outlook/composables/index";

import type { ThemeNormalPageFrontmatter } from "../../shared/index.js";

import "../styles/normal-page.scss";

const DEFAULT_TOC_OPTIONS: GetHeadersOptions = {
  selector: [
    ...Array.from({ length: 6 }).map((_, i) => `#markdown-content > h${i + 1}`),
    "[vp-content] > h2",
  ].join(", "),
  levels: "deep",
  ignore: [".vp-badge", ".vp-icon"],
};

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
    const { isDarkMode } = useDarkMode();
    const themeLocale = useThemeLocaleData();

    const tocOptions = computed(() => {
      const config = frontmatter.value.toc ?? themeLocale.value.toc;

      if (isPlainObject(config)) {
        return { ...DEFAULT_TOC_OPTIONS, ...config };
      }

      return (config ?? true) ? DEFAULT_TOC_OPTIONS : null;
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
            tocOptions.value
              ? h(
                  TOC,
                  { options: tocOptions.value },
                  {
                    before: slots.tocBefore,
                    after: slots.tocAfter,
                  },
                )
              : null,
            h(
              MarkdownContent,
              {},
              {
                before: slots.contentBefore,
                after: slots.contentAfter,
              },
            ),
            h(PageMeta),
            h(PageNav),
            hasGlobalComponent("CommentService")
              ? h(resolveComponent("CommentService"), {
                  darkmode: isDarkMode.value,
                })
              : null,
            slots.bottom?.(),
          ],
        ),
      );
  },
});
