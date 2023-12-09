import { useRouteLocale } from "@vuepress/client";
import { isPlainObject, isString } from "@vuepress/shared";
import { useEventListener } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref, toRef, watch } from "vue";
import { useRouter } from "vue-router";
import { VPLink, useLocaleConfig } from "vuepress-shared/client";

import { SearchLoading } from "./SearchLoading.js";
import { HeadingIcon, HeartIcon, HistoryIcon, TitleIcon } from "./icons.js";
import {
  useSearchQueryHistory,
  useSearchResult,
  useSearchResultHistory,
} from "../composables/index.js";
import {
  searchProClientCustomFiledConfig,
  searchProLocales,
} from "../define.js";
import type { MatchedItem, Word } from "../typings/index.js";
import { CLOSE_ICON } from "../utils/index.js";

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

    /**
     * Whether is focusing
     *
     * 是否被聚焦
     */
    isFocusing: Boolean,
  },

  emits: ["close", "updateQuery"],

  setup(props, { emit }) {
    const router = useRouter();
    const routeLocale = useRouteLocale();
    const locale = useLocaleConfig(searchProLocales);
    const {
      enabled: enableQueryHistory,
      addQueryHistory,
      queryHistory,
      removeQueryHistory,
    } = useSearchQueryHistory();
    const {
      enabled: enableResultHistory,
      resultHistory,
      addResultHistory,
      removeResultHistory,
    } = useSearchResultHistory();
    const enableHistory = enableQueryHistory || enableResultHistory;

    const query = toRef(props, "query");
    const { results, searching } = useSearchResult(query);

    const activatedHistoryStatus = ref({ isQuery: true, index: 0 });
    const activatedResultIndex = ref(0);
    const activatedResultContentIndex = ref(0);

    const hasHistory = computed(
      () =>
        enableHistory &&
        (queryHistory.value.length > 0 || resultHistory.value.length > 0),
    );
    const hasResults = computed(() => results.value.length > 0);
    const activatedResult = computed(
      () => results.value[activatedResultIndex.value] || null,
    );

    const getRealPath = (item: MatchedItem): string =>
      router.resolve({
        name: item.key,
        ...("anchor" in item ? { hash: `#${item.anchor}` } : {}),
      }).fullPath;

    const activePreviousHistory = (): void => {
      const { isQuery, index } = activatedHistoryStatus.value;

      if (index === 0)
        activatedHistoryStatus.value = {
          isQuery: !isQuery,
          index: isQuery
            ? resultHistory.value.length - 1
            : queryHistory.value.length - 1,
        };
      else
        activatedHistoryStatus.value = {
          isQuery,
          index: index - 1,
        };
    };

    const activeNextHistory = (): void => {
      const { isQuery, index } = activatedHistoryStatus.value;

      if (
        index ===
        (isQuery
          ? queryHistory.value.length - 1
          : resultHistory.value.length - 1)
      )
        activatedHistoryStatus.value = {
          isQuery: !isQuery,
          index: 0,
        };
      else
        activatedHistoryStatus.value = {
          isQuery,
          index: index + 1,
        };
    };

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
      if (matchedItem.type === "customField") {
        const formatterConfig =
          searchProClientCustomFiledConfig[matchedItem.index] || "$content";

        const [prefix, suffix = ""] = isPlainObject(formatterConfig)
          ? formatterConfig[routeLocale.value].split("$content")
          : formatterConfig.split("$content");

        return matchedItem.display.map((display) =>
          h("div", getVNodes([prefix, ...display, suffix])),
        );
      }

      return matchedItem.display.map((display) => h("div", getVNodes(display)));
    };

    const resetSearchResult = (): void => {
      activatedResultIndex.value = 0;
      activatedResultContentIndex.value = 0;
      emit("updateQuery", "");
      emit("close");
    };

    useEventListener("keydown", (event: KeyboardEvent) => {
      if (!props.isFocusing) return;

      if (hasResults.value) {
        if (event.key === "ArrowUp") {
          activePreviousResultContent();
        } else if (event.key === "ArrowDown") {
          activeNextResultContent();
        } else if (event.key === "Enter") {
          const item =
            activatedResult.value.contents[activatedResultContentIndex.value];

          const path = getRealPath(item);

          addQueryHistory(props.query);
          addResultHistory(item);
          void router.push(path);
          resetSearchResult();
        }
      } else if (enableResultHistory) {
        if (event.key === "ArrowUp") {
          activePreviousHistory();
        } else if (event.key === "ArrowDown") {
          activeNextHistory();
        } else if (event.key === "Enter") {
          const { index } = activatedHistoryStatus.value;

          if (activatedHistoryStatus.value.isQuery) {
            emit("updateQuery", queryHistory.value[index]);
            event.preventDefault();
          } else {
            void router.push(resultHistory.value[index].link);
            resetSearchResult();
          }
        }
      }
    });

    watch(
      [activatedResultIndex, activatedResultContentIndex],
      () => {
        document
          .querySelector(
            ".search-pro-result-list-item.active .search-pro-result-item.active",
          )
          ?.scrollIntoView(false);
      },
      { flush: "post" },
    );

    return (): VNode =>
      h(
        "div",
        {
          class: [
            "search-pro-result-wrapper",
            { empty: query.value ? !hasResults.value : !hasHistory.value },
          ],
          id: "search-pro-results",
        },
        query.value === ""
          ? enableHistory
            ? hasHistory.value
              ? [
                  enableQueryHistory
                    ? h(
                        "ul",
                        { class: "search-pro-result-list" },
                        h("li", { class: "search-pro-result-list-item" }, [
                          h(
                            "div",
                            { class: "search-pro-result-title" },
                            locale.value.queryHistory,
                          ),
                          queryHistory.value.map((item, historyIndex) =>
                            h(
                              "div",
                              {
                                class: [
                                  "search-pro-result-item",
                                  {
                                    active:
                                      activatedHistoryStatus.value.isQuery &&
                                      activatedHistoryStatus.value.index ===
                                        historyIndex,
                                  },
                                ],
                                onClick: () => {
                                  emit("updateQuery", item);
                                },
                              },
                              [
                                h(HistoryIcon, {
                                  class: "search-pro-result-type",
                                }),
                                h(
                                  "div",
                                  { class: "search-pro-result-content" },
                                  item,
                                ),
                                h("button", {
                                  class: "search-pro-remove-icon",
                                  innerHTML: CLOSE_ICON,
                                  onClick: (event: Event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    removeQueryHistory(historyIndex);
                                  },
                                }),
                              ],
                            ),
                          ),
                        ]),
                      )
                    : null,
                  enableResultHistory
                    ? h(
                        "ul",
                        { class: "search-pro-result-list" },
                        h("li", { class: "search-pro-result-list-item" }, [
                          h(
                            "div",
                            { class: "search-pro-result-title" },
                            locale.value.resultHistory,
                          ),

                          resultHistory.value.map((item, historyIndex) =>
                            h(
                              VPLink,
                              {
                                to: item.link,
                                class: [
                                  "search-pro-result-item",
                                  {
                                    active:
                                      !activatedHistoryStatus.value.isQuery &&
                                      activatedHistoryStatus.value.index ===
                                        historyIndex,
                                  },
                                ],
                                onClick: () => {
                                  resetSearchResult();
                                },
                              },
                              () => [
                                h(HistoryIcon, {
                                  class: "search-pro-result-type",
                                }),
                                h(
                                  "div",
                                  { class: "search-pro-result-content" },
                                  [
                                    item.header
                                      ? h(
                                          "div",
                                          { class: "content-header" },
                                          item.header,
                                        )
                                      : null,
                                    h(
                                      "div",
                                      item.display
                                        .map((display) => getVNodes(display))
                                        .flat(),
                                    ),
                                  ],
                                ),
                                h("button", {
                                  class: "search-pro-remove-icon",
                                  innerHTML: CLOSE_ICON,
                                  onClick: (event: Event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    removeResultHistory(historyIndex);
                                  },
                                }),
                              ],
                            ),
                          ),
                        ]),
                      )
                    : null,
                ]
              : locale.value.emptyHistory
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
                          title || locale.value.defaultTitle,
                        ),
                        contents.map((item, contentIndex) => {
                          const isCurrentContentActive =
                            isCurrentResultActive &&
                            activatedResultContentIndex.value === contentIndex;

                          return h(
                            VPLink,
                            {
                              to: getRealPath(item),
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
                              item.type === "text"
                                ? null
                                : h(
                                    item.type === "title"
                                      ? TitleIcon
                                      : item.type === "heading"
                                        ? HeadingIcon
                                        : HeartIcon,
                                    { class: "search-pro-result-type" },
                                  ),
                              h("div", { class: "search-pro-result-content" }, [
                                item.type === "text" && item.header
                                  ? h(
                                      "div",
                                      { class: "content-header" },
                                      item.header,
                                    )
                                  : null,
                                h("div", getDisplay(item)),
                              ]),
                            ],
                          );
                        }),
                      ],
                    );
                  }),
                )
              : locale.value.emptyResult,
      );
  },
});
