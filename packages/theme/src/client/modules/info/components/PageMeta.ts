import { hasGlobalComponent } from "@vuepress/helper/client";
import { useLastUpdated } from "@vuepress/plugin-git/client";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import { usePageFrontmatter } from "vuepress/client";

import AutoLink from "@theme-hope/components/AutoLink";
import { EditIcon } from "@theme-hope/components/icons/index";
import { useThemeLocaleData } from "@theme-hope/composables/index";
import { useEditLink } from "@theme-hope/modules/info/composables/index";

import type { ThemeNormalPageFrontmatter } from "../../../../shared/index.js";

import "../styles/page-meta.scss";

export default defineComponent({
  name: "PageMeta",

  setup() {
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const themeLocale = useThemeLocaleData();
    const editLink = useEditLink();
    const lastUpdated = useLastUpdated(
      () =>
        frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true,
    );

    return (): VNode => {
      const showChangelog =
        (frontmatter.value.changelog ?? themeLocale.value.changelog ?? true) &&
        hasGlobalComponent("GitChangelog");

      return h("footer", { class: "vp-page-meta" }, [
        editLink.value
          ? h(
              "div",
              { class: "vp-meta-item edit-link" },
              h(
                AutoLink,
                { class: "vp-meta-label", config: editLink.value },
                { before: () => h(EditIcon) },
              ),
            )
          : null,
        h(
          "div",
          { class: "vp-meta-item git-info" },
          !showChangelog && lastUpdated.value
            ? h("div", { class: "update-time" }, [
                h("span", { class: "vp-meta-label" }, lastUpdated.value.locale),
                h(
                  "time",
                  {
                    class: "vp-meta-info",
                    datetime: lastUpdated.value.iso,
                    "data-allow-mismatch": "",
                  },
                  lastUpdated.value.text,
                ),
              ])
            : [],
        ),
      ]);
    };
  },
});
