import { useRouteLocale } from "@vuepress/client";
import { useEventListener } from "@vueuse/core";
import { computed, defineComponent, h, onMounted, ref, toRef } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import { HeadingIcon, HeartIcon, TitleIcon } from "./icons.js";
import { useSearchResults } from "../composables/index.js";
import { searchProClientCustomFiledConfig } from "../utils/index.js";

import type { VNode } from "vue";
import type { MatchedItem, Word } from "../utils/index.js";

import "../styles/search-result.scss";

// TODO: Add history search
export default defineComponent({
  name: "SearchResult",

  props: {
    query: {
      type: String,
      required: true,
    },
  },

  emits: ["close"],

  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const routeLocale = useRouteLocale();

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
            emit("close");
          }
        }
      });
    });

    return (): VNode =>
      hasResults.value
        ? h(
            "ul",
            { class: "result-list" },
            searchResults.value.map(({ title, contents }, index) => {
              const isCurrentResultActive =
                activatedResultIndex.value === index;

              return h(
                "li",
                {
                  class: ["result-item", { active: isCurrentResultActive }],
                },
                [
                  h("div", { class: "result-title" }, title || "Documentation"),
                  h(
                    "div",
                    { class: "result-wrapper" },
                    contents.map((item, contentIndex) =>
                      h(
                        RouterLink,
                        {
                          class: [
                            "result-content",
                            {
                              active:
                                isCurrentResultActive &&
                                activatedResultContentIndex.value ===
                                  contentIndex,
                            },
                          ],
                          to: item.path,
                          onClick: () => emit("close"),
                        },
                        () => [
                          item.type === "content"
                            ? null
                            : h(
                                "div",
                                { class: "type-icon" },
                                h(
                                  item.type === "title"
                                    ? TitleIcon
                                    : item.type === "heading"
                                    ? HeadingIcon
                                    : HeartIcon
                                )
                              ),
                          h("div", { class: "matched-content" }, [
                            item.type === "content"
                              ? h(
                                  "div",
                                  { class: "content-header" },
                                  item.header
                                )
                              : null,
                            h("div", getDisplay(item)),
                          ]),
                        ]
                      )
                    )
                  ),
                ]
              );
            })
          )
        : h("div", { class: "result-list empty" }, "No results");
  },
});
