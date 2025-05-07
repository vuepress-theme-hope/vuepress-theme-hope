import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import I18nIcon from "@theme-hope/components/navbar/I18nIcon";
import NavbarDropdown from "@theme-hope/components/navbar/NavbarDropdown";
import { useNavbarLanguageDropdown } from "@theme-hope/composables/navbar/useNavbarLanguageDropdown";

export default defineComponent({
  name: "LanguageDropdown",

  setup() {
    const dropdown = useNavbarLanguageDropdown();

    return (): VNode | null =>
      dropdown.value
        ? h(
            "div",
            { class: "vp-nav-item" },
            h(
              NavbarDropdown,
              { config: dropdown.value },
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
