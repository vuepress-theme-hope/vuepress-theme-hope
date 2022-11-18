import { useEventListener } from "@vueuse/core";
import { defineComponent, h, ref } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import SearchModal from "./SearchModal.js";
import { SearchIcon } from "./icons.js";
import {
  isFocusingTextControl,
  isKeyMatched,
  searchProLocales,
} from "../utils/index.js";

import type { VNode } from "vue";

import "../styles/search-pro.scss";

export default defineComponent({
  name: "SearchPro",

  setup() {
    const locale = useLocaleConfig(searchProLocales);
    const isActive = ref(false);

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
        "div",
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
      isActive.value
        ? h(SearchModal, {
            onClose: () => {
              isActive.value = false;
            },
          })
        : null,
    ];
  },
});
