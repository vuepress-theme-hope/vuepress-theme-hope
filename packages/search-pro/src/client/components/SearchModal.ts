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
  useArrayCycle,
  useSearchSuggestions,
} from "../composables/index.js";
import { enableAutoSuggestions, searchProLocales } from "../define.js";
import {
  CLOSE_ICON,
  DOWN_KEY_ICON,
  ENTER_KEY_ICON,
  ESC_KEY_ICON,
  UP_KEY_ICON,
} from "../utils/index.js";

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

    const input = ref("");
    const { suggestions } = useSearchSuggestions(input);
    const displaySuggestion = ref(false);

    const {
      index: activeSuggestionIndex,
      prev: activePreviousSuggestion,
      next: activeNextSuggestion,
    } = useArrayCycle(suggestions);

    const inputElement = shallowRef<HTMLInputElement>();

    const applySuggestion = (index = activeSuggestionIndex.value): void => {
      input.value = suggestions.value[index];
      displaySuggestion.value = false;
    };

    useEventListener("keydown", (event: KeyboardEvent) => {
      if (displaySuggestion.value) {
        if (event.key === "ArrowUp") activePreviousSuggestion();
        else if (event.key === "ArrowDown") activeNextSuggestion();
        else if (event.key === "Enter") applySuggestion();
        else if (event.key === "Escape") displaySuggestion.value = false;
      } else if (event.key === "Escape") {
        isActive.value = false;
      }
    });

    onMounted(() => {
      const isLocked = useScrollLock(document.body);

      watch(isActive, (value) => {
        isLocked.value = value;
        if (value)
          void nextTick().then(() => {
            inputElement.value?.focus();
          });
      });

      onUnmounted(() => {
        isLocked.value = false;
      });
    });

    return (): VNode | null =>
      isActive.value
        ? h("div", { class: "search-pro-modal-wrapper" }, [
            h("div", {
              class: "search-pro-mask",
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
                    autocomplete: "off",
                    autocorrect: "off",
                    name: `${siteLocale.value.title}-search`,
                    value: input.value,
                    "aria-controls": "search-pro-results",
                    onKeydown: (event: KeyboardEvent): void => {
                      const { key } = event;

                      if (suggestions.value.length)
                        if (key === "Tab") {
                          applySuggestion();
                          event.preventDefault();
                        } else if (key === "ArrowDown" || key === "ArrowUp") {
                          event.preventDefault();
                        }
                    },
                    onInput: ({ target }: InputEvent) => {
                      input.value = (<HTMLInputElement>target).value;
                      displaySuggestion.value = true;
                      activeSuggestionIndex.value = 0;
                    },
                  }),
                  input.value
                    ? h("button", {
                        type: "reset",
                        class: "clear-button",
                        innerHTML: CLOSE_ICON,
                        onClick: () => {
                          input.value = "";
                        },
                      })
                    : null,
                  enableAutoSuggestions &&
                  displaySuggestion.value &&
                  suggestions.value.length
                    ? h("div", { class: "search-pro-suggestions-wrapper" }, [
                        h("ul", { class: "search-pro-suggestions" }, [
                          suggestions.value.map((suggestion, index) =>
                            h(
                              "li",
                              {
                                class: [
                                  "search-pro-suggestion",
                                  {
                                    active:
                                      index === activeSuggestionIndex.value,
                                  },
                                ],
                                onClick: () => {
                                  applySuggestion(index);
                                },
                              },
                              suggestion
                            )
                          ),
                        ]),
                        h(
                          "button",
                          {
                            type: "button",
                            class: "search-pro-close-suggestion",
                            onClick: () => {
                              displaySuggestion.value = false;
                            },
                          },
                          [
                            h("kbd", "Tab"),
                            locale.value.autocomplete,
                            h("kbd", { innerHTML: ESC_KEY_ICON }),
                            locale.value.exit,
                          ]
                        ),
                      ])
                    : null,
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
                isFocusing: !displaySuggestion.value,
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
                      h("kbd", { innerHTML: ENTER_KEY_ICON }),
                      locale.value.select,
                    ]),
                    h("span", { class: "search-pro-hint" }, [
                      h("kbd", { innerHTML: UP_KEY_ICON }),
                      h("kbd", { innerHTML: DOWN_KEY_ICON }),
                      locale.value.navigate,
                    ]),
                    h("span", { class: "search-pro-hint" }, [
                      h("kbd", { innerHTML: ESC_KEY_ICON }),
                      locale.value.exit,
                    ]),
                  ]),
            ]),
          ])
        : null;
  },
});
