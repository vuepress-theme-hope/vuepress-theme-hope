import { defineComponent, h } from "vue";
import NavLink from "./NavLink";
import { EditIcon } from "./icons";
import {
  useContributors,
  useEditNavLink,
  useThemeLocaleData,
  useUpdateTime,
} from "../composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "PageMeta",

  setup() {
    const themeLocale = useThemeLocaleData();
    const editNavLink = useEditNavLink();
    const updateTime = useUpdateTime();
    const contributors = useContributors();

    return (): VNode =>
      h("footer", { class: "page-meta" }, [
        editNavLink.value
          ? h(
              "div",
              { class: "meta-item edit-link" },
              h(
                NavLink,
                { class: "label", item: editNavLink.value },
                { before: () => h(EditIcon) }
              )
            )
          : null,
        updateTime.value
          ? h("div", { class: "meta-item update-time" }, [
              h(
                "span",
                { class: "label" },
                `${themeLocale.value.lastUpdatedText || "Last Update"}: `
              ),
              h("span", { class: "info" }, updateTime.value),
            ])
          : null,
        contributors.value && contributors.value.length
          ? h("div", { class: "meta-item contributors" }, [
              h(
                "span",
                { class: "label" },
                `${themeLocale.value.contributorsText || "Contributors"}: `
              ),
              contributors.value.map((contributor, index) => [
                h(
                  "span",
                  {
                    class: "contributor",
                    title: `email: ${contributor.email}`,
                  },
                  contributor.name
                ),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                index !== contributors.value!.length - 1 ? "," : "",
              ]),
            ])
          : null,
      ]);
  },
});
