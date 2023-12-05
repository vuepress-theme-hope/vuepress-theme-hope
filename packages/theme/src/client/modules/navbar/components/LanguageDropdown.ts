import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import DropdownLink from "@theme-hope/modules/navbar/components/DropdownLink";
import { I18nIcon } from "@theme-hope/modules/navbar/components/icons/index";
import { useNavbarLanguageDropdown } from "@theme-hope/modules/navbar/composables/index";

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
              },
            ),
          )
        : null;
  },
});
