import { useEventListener } from "@vueuse/core";
import { defineComponent, h, inject } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import { SearchIcon } from "./icons.js";
import { searchModalSymbol } from "../composables/setup.js";
import { searchProLocales } from "../define.js";
import { isFocusingTextControl, isKeyMatched } from "../utils/index.js";

import type { VNode } from "vue";

import "../styles/search-box.scss";

export default defineComponent({
  name: "SearchBox",

  setup() {
    const locale = useLocaleConfig(searchProLocales);
    const isActive = inject(searchModalSymbol)!;

    const onKeydown = (event: KeyboardEvent): void => {
      if (
        // not active
        !isActive.value &&
        // key matches
        isKeyMatched(event) &&
        // event does not come from the search box itself or
        // user isn't focusing (and thus perhaps typing in) a text control
        !isFocusingTextControl(event.target as EventTarget)
      ) {
        event.preventDefault();
        isActive.value = true;
      }
    };

    useEventListener("keydown", onKeydown);

    return (): (VNode | null)[] => [
      h(
        "button",
        {
          class: "search-pro-button",
          role: "search",
          "aria-label": locale.value.search,
          onClick: () => {
            isActive.value = true;
          },
        },
        h(SearchIcon)
      ),
    ];
  },
});
