import { defineComponent, defineAsyncComponent, h, ref, onMounted } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import { SearchLoading } from "./SearchLoading.js";
import { SearchIcon } from "./icons.js";
import { searchProLocales } from "../utils/index.js";

import type { VNode } from "vue";

import "../styles/search-modal.scss";

const SearchResult = defineAsyncComponent({
  loader: () =>
    import(
      /* webpackChunkName: "search-pro-result" */ "vuepress-plugin-search-pro/result"
    ),
  loadingComponent: SearchLoading,
});

export default defineComponent({
  name: "SearchModal",

  emits: ["close"],

  setup(_props, { emit }) {
    const locale = useLocaleConfig(searchProLocales);
    const input = ref("");
    const inputElement = ref<HTMLInputElement>();

    onMounted(() => {
      inputElement.value?.focus();
    });

    return (): VNode =>
      h("div", { class: "search-pro-modal-wrapper" }, [
        h("div", { class: "background", onClick: () => emit("close") }),
        h("div", { class: "search-pro-modal" }, [
          h("div", { class: "search-box" }, [
            h(SearchIcon),
            h("input", {
              ref: inputElement,
              type: "text",
              class: "search-pro-input",
              placeholder: locale.value.placeholder,
              spellcheck: "false",
              value: input.value,
              onInput: ({ target }: InputEvent) => {
                input.value = (<HTMLInputElement>target).value;
              },
            }),
          ]),

          h(SearchResult, { query: input.value, onClose: () => emit("close") }),
        ]),
      ]);
  },
});
