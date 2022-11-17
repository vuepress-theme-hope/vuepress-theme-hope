import { defineComponent, h, ref } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import SearchModal from "./SearchModal.js";
import { SearchIcon } from "./icons.js";
import { searchProLocales } from "../utils/index.js";

import type { VNode } from "vue";

import "../styles/search-button.scss";

export default defineComponent({
  name: "SearchButton",

  setup() {
    const locale = useLocaleConfig(searchProLocales);
    const isActive = ref(false);

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
