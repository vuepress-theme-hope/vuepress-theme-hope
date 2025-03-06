import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import { EditIcon } from "@theme-hope/components/icons/index";
import { useThemeLocaleData } from "@theme-hope/composables/index";
import {
  useEditLink,
  useUpdateTime,
} from "@theme-hope/modules/info/composables/index";

import "../styles/page-meta.scss";

export default defineComponent({
  name: "PageMeta",

  setup() {
    const themeLocale = useThemeLocaleData();
    const editLink = useEditLink();
    const updateTime = useUpdateTime();

    return (): VNode => {
      const { metaLocales } = themeLocale.value;

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
          updateTime.value
            ? h("div", { class: "update-time" }, [
                h(
                  "span",
                  { class: "vp-meta-label" },
                  `${metaLocales.lastUpdated}: `,
                ),
                h(
                  "span",
                  { class: "vp-meta-info", "data-allow-mismatch": "text" },
                  updateTime.value,
                ),
              ])
            : [],
        ),
      ]);
    };
  },
});
