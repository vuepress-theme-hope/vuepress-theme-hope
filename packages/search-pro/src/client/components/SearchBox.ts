import { useLocaleConfig } from "@vuepress/helper/client";
import { useEventListener } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h, inject, onMounted, ref } from "vue";
import { checkIsIOS, checkIsMacOS, checkIsiPad } from "vuepress-shared/client";

import { SearchIcon } from "./icons.js";
import { searchModalSymbol } from "../composables/index.js";
import { searchProHotKeys, searchProLocales } from "../define.js";
import { isFocusingTextControl, isKeyMatched } from "../utils/index.js";

import "../styles/search-box.scss";

const primaryKey = searchProHotKeys[0];

export default defineComponent({
  name: "SearchBox",

  setup() {
    const locale = useLocaleConfig(searchProLocales);
    const isActive = inject(searchModalSymbol)!;
    const isMacOS = ref(false);

    const controlKeys = computed(() =>
      primaryKey
        ? [
            (isMacOS.value
              ? ["⌃", "⇧", "⌥", "⌘"]
              : ["Ctrl", "Shift", "Alt", "Win"]
            ).filter(
              (_, index) =>
                primaryKey[(["ctrl", "shift", "alt", "meta"] as const)[index]],
            ),
            primaryKey.key.toUpperCase(),
          ]
        : null,
    );

    useEventListener("keydown", (event: KeyboardEvent): void => {
      if (
        // Not active
        !isActive.value &&
        // Key matches
        isKeyMatched(event) &&
        /*
         * Event does not come from the search box itself or
         * user isn't focusing (and thus perhaps typing in) a text control
         */
        !isFocusingTextControl(event.target as EventTarget)
      ) {
        event.preventDefault();
        isActive.value = true;
      }
    });

    onMounted(() => {
      const { userAgent } = navigator;

      isMacOS.value =
        checkIsMacOS(userAgent) ||
        checkIsIOS(userAgent) ||
        checkIsiPad(userAgent);
    });

    return (): (VNode | null)[] => [
      h(
        "button",
        {
          type: "button",
          class: "search-pro-button",
          "aria-label": locale.value.search,
          onClick: () => {
            isActive.value = true;
          },
        },
        [
          h(SearchIcon),
          h("div", { class: "search-pro-placeholder" }, locale.value.search),
          controlKeys.value
            ? h(
                "div",
                { class: "search-pro-key-hints" },
                controlKeys.value.map((key) =>
                  h("kbd", { class: "search-pro-key" }, key),
                ),
              )
            : null,
        ],
      ),
    ];
  },
});
