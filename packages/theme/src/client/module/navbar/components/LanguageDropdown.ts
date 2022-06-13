import { defineComponent, h } from "vue";

import { I18nIcon } from "@theme-hope/module/navbar/components/icons";
import DropdownLink from "@theme-hope/module/navbar/components/DropdownLink";
import { useNavbarLanguageDropdown } from "@theme-hope/module/navbar/composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "LanguageDropdown",

  setup() {
    const dropdown = useNavbarLanguageDropdown();

    return (): VNode | null =>
      dropdown.value
        ? h(
            "div",
            { class: "nav-item" },
            h(
              DropdownLink,
              { class: "i18n-dropdown", config: dropdown.value },
              {
                title: () =>
                  h(I18nIcon, {
                    "aria-label": dropdown.value?.ariaLabel,
                    style: {
                      width: "1rem",
                      height: "1rem",
                      verticalAlign: "middle",
                    },
                  }),
              }
            )
          )
        : null;
  },
});
