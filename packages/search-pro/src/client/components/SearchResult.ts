import { usePageData, useRouteLocale } from "@vuepress/client";
import { isPlainObject, isString } from "@vuepress/shared";
import { useEventListener } from "@vueuse/core";
import {
  type VNode,
  computed,
  defineComponent,
  h,
  ref,
  toRef,
  watch,
} from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useLocaleConfig } from "vuepress-shared/client";

import { SearchLoading } from "./SearchLoading.js";
import {
  CloseIcon,
  HeadingIcon,
  HeartIcon,
  HistoryIcon,
  TitleIcon,
} from "./icons.js";
import {
  useSearchQueryHistory,
  useSearchResultHistory,
  useWorkerSearch,
} from "../composables/index.js";
import {
  searchProClientCustomFiledConfig,
  searchProLocales,
} from "../define.js";
import { type MatchedItem, type Word } from "../utils/index.js";

import "../styles/search-result.scss";

export default defineComponent({
  name: "SearchResult",

  props: {
    /**
     * Query string
     *
     * 查询字符串
     */
    query: {
      type: String,
      required: true,
    },
  },

  emits: ["close", "updateQuery"],

  setup(props, { emit }) {
    const page = usePageData();
    const router = useRouter();
    const routeLocale = useRouteLocale();
    const locale = useLocaleConfig(searchProLocales);
    const { addQueryHistory } = useSearchQueryHistory();
    const { enabled, resultHistory, addResultHistory, removeResultHistory } =
      useSearchResultHistory();

    const query = toRef(props, "query");
    const { results, searching } = useWorkerSearch(query);

    const activatedResultIndex = ref(0);
    const activatedResultContentIndex = ref(0);

    const hasHistory = computed(() => resultHistory.value.length > 0);
    const hasResults = computed(() => results.value.length > 0);
    const activatedResult = computed(
      () => results.value[activatedResultIndex.value] || null
    );

    const activePreviousResult = (): void => {
      activatedResultIndex.value =
        activatedResultIndex.value > 0
          ? activatedResultIndex.value - 1
          : results.value.length - 1;
      activatedResultContentIndex.value =
        activatedResult.value.contents.length - 1;
    };

    const activeNextResult = (): void => {
      activatedResultIndex.value =
        activatedResultIndex.value < results.value.length - 1
          ? activatedResultIndex.value + 1
          : 0;
      activatedResultContentIndex.value = 0;
    };

    const activeNextResultContent = (): void => {
      if (
        activatedResultContentIndex.value <
        activatedResult.value.contents.length - 1
      )
        activatedResultContentIndex.value =
          activatedResultContentIndex.value + 1;
      else activeNextResult();
    };

    const activePreviousResultContent = (): void => {
      if (activatedResultContentIndex.value > 0)
        activatedResultContentIndex.value =
          activatedResultContentIndex.value - 1;
      else activePreviousResult();
    };

    const getVNodes = (display: Word[]): (VNode | string)[] =>
      display.map((word) => (isString(word) ? word : h(word[0], word[1])));

    const getDisplay = (matchedItem: MatchedItem): (VNode | string)[] => {
      if (matchedItem.type === "custom") {
        const formatterConfig =
          searchProClientCustomFiledConfig[matchedItem.index] || "$content";

        const [prefix, suffix = ""] = isPlainObject(formatterConfig)
          ? formatterConfig[routeLocale.value].split("$content")
          : formatterConfig.split("$content");

        return getVNodes([prefix, ...matchedItem.display, suffix]);
      }

      return getVNodes(matchedItem.display);
    };

    const resetSearchResult = (): void => {
      activatedResultIndex.value = 0;
      activatedResultContentIndex.value = 0;
      emit("updateQuery", "");
      emit("close");
    };

    useEventListener("keydown", (event: KeyboardEvent) => {
      if (!hasResults.value) return;

      if (event.key === "ArrowUp") {
        activePreviousResultContent();
      } else if (event.key === "ArrowDown") {
        activeNextResultContent();
      } else if (event.key === "Enter") {
        const item =
          activatedResult.value.contents[activatedResultContentIndex.value];

        if (page.value.path !== item.path) {
          addQueryHistory(props.query);
          addResultHistory(item);
          void router.push(item.path);
          resetSearchResult();
        }
      }
    });

    watch(
      [activatedResultIndex, activatedResultContentIndex],
      () => {
        document
          .querySelector(
            ".search-pro-result-list-item.active .search-pro-result-item.active"
          )
          ?.scrollIntoView(false);
      },
      { flush: "post" }
    );

    return (): VNode =>
      h(
        "div",
        {
          class: [
            "search-pro-result",
            {
              empty: query.value ? !hasResults.value : !hasHistory.value,
            },
          ],
          id: "search-pro-results",
        },
        query.value === ""
          ? hasHistory.value
            ? h(
                "ul",
                { class: "search-pro-result-list" },
                h("li", { class: "search-pro-result-list-item" }, [
                  h(
                    "div",
                    { class: "search-pro-result-title" },
                    locale.value.history
                  ),
                  resultHistory.value.map((item, historyIndex) =>
                    h(
                      RouterLink,
                      {
                        to: item.path,
                        class: [
                          "search-pro-result-item",
                          {
                            active:
                              activatedResultContentIndex.value ===
                              historyIndex,
                          },
                        ],
                        onClick: () => {
                          resetSearchResult();
                        },
                      },
                      () => [
                        h(HistoryIcon, { class: "search-pro-result-type" }),
                        h("div", { class: "search-pro-result-content" }, [
                          item.type === "content" && item.header
                            ? h("div", { class: "content-header" }, item.header)
                            : null,
                          h("div", getDisplay(item)),
                        ]),
                        h(
                          "button",
                          {
                            class: "search-pro-close-icon",
                            onClick: (event: Event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              removeResultHistory(historyIndex);
                            },
                          },
                          h(CloseIcon)
                        ),
                      ]
                    )
                  ),
                ])
              )
            : enabled
            ? locale.value.emptyHistory
            : locale.value.emptyResult
          : searching.value
          ? h(SearchLoading, { hint: locale.value.searching })
          : hasResults.value
          ? h(
              "ul",
              { class: "search-pro-result-list" },
              results.value.map(({ title, contents }, index) => {
                const isCurrentResultActive =
                  activatedResultIndex.value === index;

                return h(
                  "li",
                  {
                    class: [
                      "search-pro-result-list-item",
                      { active: isCurrentResultActive },
                    ],
                  },
                  [
                    h(
                      "div",
                      { class: "search-pro-result-title" },
                      title || "Documentation"
                    ),
                    contents.map((item, contentIndex) => {
                      const isCurrentContentActive =
                        isCurrentResultActive &&
                        activatedResultContentIndex.value === contentIndex;

                      return h(
                        RouterLink,
                        {
                          to: item.path,
                          class: [
                            "search-pro-result-item",
                            {
                              active: isCurrentContentActive,
                              "aria-selected": isCurrentContentActive,
                            },
                          ],
                          onClick: () => {
                            addQueryHistory(props.query);
                            addResultHistory(item);
                            resetSearchResult();
                          },
                        },
                        () => [
                          item.type === "content"
                            ? null
                            : h(
                                item.type === "title"
                                  ? TitleIcon
                                  : item.type === "heading"
                                  ? HeadingIcon
                                  : HeartIcon,
                                { class: "search-pro-result-type" }
                              ),
                          h("div", { class: "search-pro-result-content" }, [
                            item.type === "content" && item.header
                              ? h(
                                  "div",
                                  { class: "content-header" },
                                  item.header
                                )
                              : null,
                            h("div", getDisplay(item)),
                          ]),
                        ]
                      );
                    }),
                  ]
                );
              })
            )
          : locale.value.emptyResult
      );
  },
});
