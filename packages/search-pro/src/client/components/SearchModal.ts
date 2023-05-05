import { useSiteLocaleData } from "@vuepress/client";
import { useEventListener, useScrollLock } from "@vueuse/core";
import {
  type VNode,
  defineAsyncComponent,
  defineComponent,
  h,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from "vue";
import { useIsMobile, useLocaleConfig } from "vuepress-shared/client";

import { SearchLoading } from "./SearchLoading.js";
import { SearchIcon } from "./icons.js";
import {
  searchModalSymbol,
  useSearchQueryHistory,
} from "../composables/index.js";
import { searchProLocales } from "../define.js";
import { DOWN_KEY, ENTER_KEY, ESC_KEY, UP_KEY } from "../utils/index.js";

import "../styles/search-modal.scss";

const SearchResult = defineAsyncComponent({
  loader: () =>
    import(
      /* webpackChunkName: "search-pro-result" */ "vuepress-plugin-search-pro/result"
    ),
  loadingComponent: () => {
    const localeConfig = useLocaleConfig(searchProLocales);

    return h(SearchLoading, { hint: localeConfig.value.loading });
  },
});

export default defineComponent({
  name: "SearchModal",

  setup() {
    const isActive = inject(searchModalSymbol)!;
    const siteLocale = useSiteLocaleData();
    const isMobile = useIsMobile();
    const locale = useLocaleConfig(searchProLocales);
    const { enabled, queryHistory } = useSearchQueryHistory();

    const input = ref("");
    const inputElement = shallowRef<HTMLInputElement>();

    watch(isActive, (value) => {
      if (value)
        void nextTick().then(() => {
          inputElement.value?.focus();
        });
    });

    useEventListener("keydown", (event: KeyboardEvent) => {
      if (isActive.value && event.key === "Escape") isActive.value = false;
    });

    onMounted(() => {
      const isLocked = useScrollLock(document.body);

      watch(isActive, (value) => {
        isLocked.value = value;
      });

      onUnmounted(() => {
        isLocked.value = false;
      });
    });

    return (): VNode | null =>
      isActive.value
        ? h("div", { class: "search-pro-modal-wrapper" }, [
            h("div", {
              class: "background",
              onClick: () => {
                isActive.value = false;
                input.value = "";
              },
            }),
            h("div", { class: "search-pro-modal" }, [
              h("div", { class: "search-pro-box" }, [
                h("form", [
                  h(
                    "label",
                    { for: "search-pro", "aria-label": locale.value.search },
                    h(SearchIcon)
                  ),
                  h("input", {
                    ref: inputElement,
                    type: "search",
                    class: "search-pro-input",
                    id: "search-pro",
                    placeholder: locale.value.placeholder,
                    spellcheck: "false",
                    autocapitalize: "off",
                    autocorrect: "off",
                    autocomplete: enabled ? "on" : "off",
                    name: `${siteLocale.value.title}-search`,
                    list: "search-pro-dataset",
                    value: input.value,
                    "aria-controls": "search-pro-results",
                    onInput: ({ target }: InputEvent) => {
                      input.value = (<HTMLInputElement>target).value;
                    },
                  }),
                  h(
                    "dataset",
                    { id: "search-pro-dataset" },
                    queryHistory.value.map((item) =>
                      h("options", { value: item })
                    )
                  ),
                ]),
                h(
                  "button",
                  {
                    type: "button",
                    class: "close-button",
                    onClick: () => {
                      isActive.value = false;
                      input.value = "";
                    },
                  },
                  locale.value.cancel
                ),
              ]),

              h(SearchResult, {
                query: input.value,
                onClose: () => {
                  isActive.value = false;
                },
                onUpdateQuery: (query: string) => {
                  input.value = query;
                },
              }),

              // key hints should only appears in pc
              isMobile.value
                ? null
                : h("div", { class: "search-pro-hints" }, [
                    h("span", { class: "search-pro-hint" }, [
                      h("kbd", { innerHTML: ENTER_KEY }),
                      locale.value.select,
                    ]),
                    h("span", { class: "search-pro-hint" }, [
                      h("kbd", { innerHTML: UP_KEY }),
                      h("kbd", { innerHTML: DOWN_KEY }),
                      locale.value.navigate,
                    ]),
                    h("span", { class: "search-pro-hint" }, [
                      h("kbd", { innerHTML: ESC_KEY }),
                      locale.value.exit,
                    ]),
                  ]),
            ]),
          ])
        : null;
  },
});
