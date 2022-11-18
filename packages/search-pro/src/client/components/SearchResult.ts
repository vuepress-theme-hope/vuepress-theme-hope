import { useRouteLocale } from "@vuepress/client";
import { useEventListener } from "@vueuse/core";
import { computed, defineComponent, h, onMounted, ref, toRef } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import { HeadingIcon, HeartIcon, HistoryIcon, TitleIcon } from "./icons.js";
import { useSearchHistory, useSearchResults } from "../composables/index.js";
import { searchProClientCustomFiledConfig } from "../define.js";

import type { VNode } from "vue";
import type { MatchedItem, Word } from "../utils/index.js";

import "../styles/search-result.scss";

export default defineComponent({
  name: "SearchResult",

  props: {
    query: {
      type: String,
      required: true,
    },
  },

  emits: ["close", "updateQuery"],

  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const routeLocale = useRouteLocale();
    const { history, addHistory } = useSearchHistory();

    const query = toRef(props, "query");
    const searchResults = useSearchResults(query);

    const activatedResultIndex = ref(0);
    const activatedResultContentIndex = ref(0);

    const hasResults = computed(() => searchResults.value.length > 0);
    const activatedResult = computed(
      () => searchResults.value[activatedResultIndex.value] || null
    );

    const activePreviousResult = (): void => {
      activatedResultIndex.value =
        activatedResultIndex.value > 0
          ? activatedResultIndex.value - 1
          : searchResults.value.length - 1;
      activatedResultContentIndex.value =
        activatedResult.value.contents.length - 1;
    };

    const activeNextResult = (): void => {
      activatedResultIndex.value =
        activatedResultIndex.value < searchResults.value.length - 1
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
      display.map((word) =>
        typeof word === "string" ? word : h(word[0], word[1])
      );

    const getDisplay = (matchedItem: MatchedItem): (VNode | string)[] => {
      if (matchedItem.type === "custom") {
        const formatterConfig =
          searchProClientCustomFiledConfig[matchedItem.name] || "$content";

        const [prefix, suffix = ""] =
          typeof formatterConfig === "object"
            ? formatterConfig[routeLocale.value].split("$content")
            : formatterConfig.split("$content");

        return getVNodes([prefix, ...matchedItem.display, suffix]);
      }

      return getVNodes(matchedItem.display);
    };

    onMounted(() => {
      useEventListener("keydown", (event: KeyboardEvent) => {
        if (!hasResults.value) return;

        if (event.key === "ArrowUp") activePreviousResultContent();
        else if (event.key === "ArrowDown") activeNextResultContent();
        else if (event.key === "Enter") {
          const path =
            activatedResult.value.contents[activatedResultContentIndex.value]
              .path;

          if (route.path !== path) {
            void router.push(path);
            addHistory(query.value);
            emit("updateQuery", "");
            emit("close");
          }
        }
      });
    });

    return (): VNode =>
      query.value === ""
        ? h(
            "ul",
            { class: "search-pro-result-list" },
            history.value.map((history) =>
              h(
                "li",
                { class: "search-pro-result-list-item" },
                h(
                  "div",
                  {
                    class: "search-pro-result-item",
                    onClick: () => {
                      emit("updateQuery", history);
                    },
                  },
                  [
                    h(HistoryIcon, { class: "search-pro-result-type" }),
                    h("div", { class: "search-pro-result-content" }, history),
                  ]
                )
              )
            )
          )
        : hasResults.value
        ? h(
            "ul",
            { class: "search-pro-result-list" },
            searchResults.value.map(({ title, contents }, index) => {
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
                  contents.map((item, contentIndex) =>
                    h(
                      RouterLink,
                      {
                        to: item.path,
                        class: [
                          "search-pro-result-item",
                          {
                            active:
                              isCurrentResultActive &&
                              activatedResultContentIndex.value ===
                                contentIndex,
                          },
                        ],
                        onClick: () => {
                          addHistory(query.value);
                          emit("updateQuery", "");
                          emit("close");
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
                          item.type === "content"
                            ? h("div", { class: "content-header" }, item.header)
                            : null,
                          h("div", getDisplay(item)),
                        ]),
                      ]
                    )
                  ),
                ]
              );
            })
          )
        : h("div", { class: "search-pro-result-list empty" }, "No results");
  },
});
