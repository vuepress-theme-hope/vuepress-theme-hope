import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import { EditIcon } from "@theme-hope/components/icons";
import { useThemeLocaleData } from "@theme-hope/composables";
import {
  useContributors,
  useEditLink,
  useUpdateTime,
} from "@theme-hope/module/info/composables";

import type { VNode } from "vue";

import "../styles/page-meta.scss";

export default defineComponent({
  name: "PageMeta",

  setup() {
    const themeLocale = useThemeLocaleData();
    const editLink = useEditLink();
    const updateTime = useUpdateTime();
    const contributors = useContributors();

    return (): VNode => {
      const { metaLocales } = themeLocale.value;

      return h("footer", { class: "page-meta" }, [
        editLink.value
          ? h(
              "div",
              { class: "meta-item edit-link" },
              h(
                AutoLink,
                { class: "label", config: editLink.value },
                { before: () => h(EditIcon) }
              )
            )
          : null,
        updateTime.value
          ? h("div", { class: "meta-item update-time" }, [
              h("span", { class: "label" }, `${metaLocales.lastUpdated}: `),
              h("span", { class: "info" }, updateTime.value),
            ])
          : null,
        contributors.value && contributors.value.length
          ? h("div", { class: "meta-item contributors" }, [
              h("span", { class: "label" }, `${metaLocales.contributors}: `),
              contributors.value.map(({ email, name }, index) => [
                h(
                  "span",
                  { class: "contributor", title: `email: ${email}` },
                  name
                ),
                index !== contributors.value!.length - 1 ? "," : "",
              ]),
            ])
          : null,
      ]);
    };
  },
});
