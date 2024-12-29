import type { VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";
import { usePageData, usePageFrontmatter } from "vuepress/client";

import { usePageInfo, useThemeLocaleData } from "@theme-hope/composables/index";
import PageInfo from "@theme-hope/modules/info/components/PageInfo";

import type { ThemeNormalPageFrontmatter } from "../../shared/index.js";

import "../styles/page-title.scss";

export default defineComponent({
  name: "PageTitle",

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const themeLocale = useThemeLocaleData();
    const { info, items } = usePageInfo();

    return (): VNode =>
      h("div", { class: "vp-page-title" }, [
        h("h1", [
          themeLocale.value.titleIcon === false
            ? null
            : h(resolveComponent("VPIcon"), { icon: frontmatter.value.icon }),
          page.value.title,
        ]),
        h(PageInfo, {
          info: info.value,
          ...(items.value === null ? {} : { items: items.value }),
        }),
        h("hr"),
      ]);
  },
});
