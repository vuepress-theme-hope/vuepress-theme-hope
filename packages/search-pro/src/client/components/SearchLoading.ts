import { type FunctionalComponent, h } from "vue";

import { LoadingIcon } from "./icons.js";

export const SearchLoading: FunctionalComponent<{ hint: string }> = ({
  hint,
}) =>
  h("div", { class: "search-pro-result-wrapper loading" }, [
    h(LoadingIcon),
    hint,
  ]);

SearchLoading.displayName = "SearchLoading";
