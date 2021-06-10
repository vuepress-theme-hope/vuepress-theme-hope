import { defineComponent, h } from "vue";
import DropdownLink from "./DropdownLink.vue";
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
            { item: dropdown.value },
            {
              title: () =>
                h(I18nIcon, {
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
