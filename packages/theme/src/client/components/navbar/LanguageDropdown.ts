import { defineComponent, h } from "vue";
import DropdownLink from "./DropdownLink";
import { I18nIcon } from "../icons";
import { useNavbarLanguageDropdown } from "../../composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "LanguageDropdown",

  setup() {
    const dropdown = useNavbarLanguageDropdown();

    return (): VNode | null =>
      dropdown.value
        ? h(
            DropdownLink,
            { config: dropdown.value },
            {
              title: () =>
                h(I18nIcon, {
                  ariaLabel: dropdown.value?.ariaLabel,
                  style: {
                    width: "1rem",
                    height: "1rem",
                    verticalAlign: "middle",
                  },
                }),
            }
          )
        : null;
  },
});
