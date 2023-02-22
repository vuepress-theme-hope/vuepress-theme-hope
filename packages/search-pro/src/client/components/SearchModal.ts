import { useEventListener } from "@vueuse/core";
import {
  type VNode,
  defineAsyncComponent,
  defineComponent,
  h,
  inject,
  onMounted,
  ref,
  watch,
} from "vue";
import { checkIsMobile, useLocaleConfig } from "vuepress-shared/client";

import { SearchLoading } from "./SearchLoading.js";
import { CloseIcon, SearchIcon } from "./icons.js";
import { searchModalSymbol } from "../composables/setup.js";
import { searchProLocales } from "../define.js";

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
    const locale = useLocaleConfig(searchProLocales);
    const input = ref("");
    const isMobile = ref(false);
    const inputElement = ref<HTMLInputElement>();

    useEventListener("keydown", (event: KeyboardEvent) => {
      if (isActive.value && event.key === "Escape") isActive.value = false;
    });

    onMounted(() => {
      isMobile.value = checkIsMobile(navigator.userAgent);
      watch(isActive, (value) => {
        if (value) inputElement.value?.focus();
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
                    type: "text",
                    class: "search-pro-input",
                    id: "search-pro",
                    placeholder: locale.value.placeholder,
                    spellcheck: "false",
                    value: input.value,
                    onInput: ({ target }: InputEvent) => {
                      input.value = (<HTMLInputElement>target).value;
                    },
                  }),
                  input.value
                    ? h(
                        "button",
                        {
                          type: "reset",
                          class: "clear-button",
                          onClick: () => {
                            input.value = "";
                          },
                        },
                        h(CloseIcon)
                      )
                    : null,
                ]),
                h(
                  "button",
                  {
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
                      h("kbd", {
                        innerHTML:
                          '<svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>',
                      }),
                      locale.value.select,
                    ]),
                    h("span", { class: "search-pro-hint" }, [
                      h("kbd", {
                        innerHTML:
                          '<svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>',
                      }),
                      h("kbd", {
                        innerHTML:
                          '<svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>',
                      }),
                      locale.value.navigate,
                    ]),
                    h("span", { class: "search-pro-hint" }, [
                      h("kbd", {
                        innerHTML:
                          '<svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>',
                      }),
                      locale.value.exit,
                    ]),
                  ]),
            ]),
          ])
        : null;
  },
});
