import { hasGlobalComponent } from "@vuepress/helper/client";
import { useContributors, useLastUpdated } from "@vuepress/plugin-git/client";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import { EditIcon } from "@theme-hope/components/icons/index";
import { useMetaInfo, useThemeLocaleData } from "@theme-hope/composables/index";
import { useEditLink } from "@theme-hope/modules/info/composables/index";

import "../styles/page-meta.scss";

export default defineComponent({
  name: "PageMeta",

  setup() {
    const themeLocale = useThemeLocaleData();
    const metaInfo = useMetaInfo();
    const contributors = useContributors();
    const editLink = useEditLink();
    const lastUpdated = useLastUpdated(metaInfo.lastUpdated);

    return (): VNode =>
      h("footer", { class: "vp-page-meta" }, [
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
        h("div", { class: "vp-meta-item git-info" }, [
          (!metaInfo.changelog.value || !hasGlobalComponent("GitChangelog")) &&
          lastUpdated.value
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
            : null,
          metaInfo.contributors.value &&
          metaInfo.contributors.value !== "as-content" &&
          contributors.value.length
            ? h("div", { class: "contributors" }, [
                h(
                  "span",
                  { class: "vp-meta-label" },
                  `${themeLocale.value.metaLocales.contributors}: `,
                ),
                contributors.value.map(
                  ({ email, name }, index, contributors) => [
                    h(
                      "span",
                      { class: "vp-meta-info", title: `email: ${email}` },
                      name,
                    ),
                    index !== contributors.length - 1 ? "," : "",
                  ],
                ),
              ])
            : null,
        ]),
      ]);
  },
});
