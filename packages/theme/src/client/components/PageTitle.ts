import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { defineComponent, h, resolveComponent } from "vue";

import {
  useIconPrefix,
  usePageInfo,
  useThemeLocaleData,
} from "@theme-hope/composables";

import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { VNode } from "vue";

import "../styles/page-title.scss";

export default defineComponent({
  name: "PageTitle",

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<BasePageFrontMatter>();
    const pageInfoProps = usePageInfo();
    const themeLocale = useThemeLocaleData();
    const iconPrefix = useIconPrefix();

    return (): VNode =>
      h("div", { class: "page-title" }, [
        h("h1", [
          themeLocale.value.titleIcon !== false && frontmatter.value.icon
            ? h("i", {
                class: ["icon", `${iconPrefix.value}${frontmatter.value.icon}`],
              })
            : null,
          page.value.title,
        ]),
        h(resolveComponent("ArticleInfo"), { ...pageInfoProps }),
        h("hr"),
      ]);
  },
});
