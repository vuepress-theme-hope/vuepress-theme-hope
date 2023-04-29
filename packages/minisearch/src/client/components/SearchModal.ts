import {
  layoutsSymbol,
  pageFrontmatterSymbol,
  pageHeadSymbol,
  pageHeadTitleSymbol,
  pageLangSymbol,
  pageLayoutSymbol,
  useLayouts,
  usePageFrontmatter,
  usePageHead,
  usePageHeadTitle,
  usePageLang,
  usePageLayout,
  useRouteLocale,
} from "@vuepress/client";
import {
  computedAsync,
  debouncedWatch,
  onKeyStroke,
  useEventListener,
  useLocalStorage,
  useScrollLock,
  useSessionStorage,
} from "@vueuse/core";
import Mark from "mark.js/src/vanilla.js";
import Minisearch, { type SearchResult } from "minisearch";
import {
  type ComponentOptions,
  type Ref,
  type VNode,
  createApp,
  defineComponent,
  h,
  markRaw,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useLocaleConfig } from "vuepress-shared/client";

// TODO: Add hmr
import { pagesComponents } from "@internal/pagesComponents";
import { searchIndex } from "@temp/minisearch/database";

import { enableQueryHistory, minisearchLocales } from "../define.js";

import "../styles/search-modal.scss";

interface IndexResult {
  title: string;
  titles: string[];
  text?: string;
}

const BACK_ICON =
  '<svg width="18" height="18" aria-hidden="true" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7 7-7-7 7-7"/></svg>';

const HEADING_REGEXP = /<h(\d*).*?>.*?<a.*? href="#(.*?)".*?>.*?<\/a><\/h\1>/gi;

const formMarkRegex = (terms: Set<string>): RegExp =>
  new RegExp(
    [...terms]
      .sort((a, b) => b.length - a.length)
      .map((term) => {
        return `(${term
          .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
          .replace(/-/g, "\\x2d")})`;
      })
      .join("|"),
    "gi"
  );

const getComponent = (id: string): ComponentOptions => {
  try {
    return pagesComponents[id];
  } catch (err) {
    console.error(err);

    return { render: () => null };
  }
};

export default defineComponent({
  name: "SearchModal",

  emits: ["close"],

  setup(_props, { emit }) {
    const layouts = useLayouts();
    const frontmatter = usePageFrontmatter();
    const head = usePageHead();
    const title = usePageHeadTitle();
    const lang = usePageLang();
    const routeLocale = useRouteLocale();
    const layout = usePageLayout();
    const locale = useLocaleConfig(minisearchLocales);

    const el = shallowRef<HTMLElement>();
    const resultsElement = shallowRef<HTMLElement>();

    const filterText = enableQueryHistory
      ? useSessionStorage("MINI_SEARCH_FILTER", "")
      : ref("");

    const showDetailedList = useLocalStorage(
      "MINI_SEARCH_DETAILED_LIST",
      false
    );

    /* Search */

    const searchIndexData = computedAsync(async () =>
      markRaw(
        Minisearch.loadJSON<IndexResult & { id: string }>(
          (await searchIndex.value[routeLocale.value]?.())?.default,
          {
            fields: ["title", "titles", "text"],
            storeFields: ["title", "titles"],
            searchOptions: {
              fuzzy: 0.2,
              prefix: true,
              boost: { title: 4, text: 2, titles: 1 },
            },
          }
        )
      )
    );

    const results: Ref<
      (Omit<SearchResult, "id"> & IndexResult & { id: string })[]
    > = shallowRef([]);

    const enableNoResults = ref(false);

    watch(filterText, () => {
      enableNoResults.value = false;
    });

    // eslint-disable-next-line @typescript-eslint/require-await
    const mark = computedAsync(async () => {
      if (!resultsElement.value) return;

      return markRaw(new Mark(resultsElement.value));
    }, null);

    debouncedWatch(
      () =>
        [
          searchIndexData.value,
          filterText.value,
          showDetailedList.value,
        ] as const,
      async (
        [index, filterTextValue, showDetailedListValue],
        _old,
        onCleanup
      ) => {
        let canceled = false;

        onCleanup(() => {
          canceled = true;
        });

        if (!index) return;

        // Search
        results.value = index
          .search(filterTextValue)
          .slice(0, 16) as (SearchResult & IndexResult)[];
        enableNoResults.value = true;

        // Highlighting
        const componentsData = showDetailedListValue
          ? results.value.map(({ id }) => ({
              id,
              component: getComponent(id),
            }))
          : [];

        if (canceled) return;

        const c = new Map<string, Map<string, string>>();

        for (const { id, component } of componentsData) {
          const app = createApp(component);

          // Silence warnings  about missing components
          app.config.warnHandler = (): void => {
            // do nothing
          };

          app.provide(layoutsSymbol, layouts);
          app.provide(pageFrontmatterSymbol, frontmatter);
          app.provide(pageHeadSymbol, head);
          app.provide(pageHeadTitleSymbol, title);
          app.provide(pageLangSymbol, lang);
          app.provide(pageLayoutSymbol, layout);

          const div = document.createElement("div");

          app.mount(div);

          const sections = div.innerHTML.split(HEADING_REGEXP);

          app.unmount();

          sections.shift();

          let map = c.get(id);

          if (!map) {
            map = new Map();
            c.set(id, map);
          }

          for (let i = 0; i < sections.length; i += 3) {
            const anchor = sections[i + 1];
            const html = sections[i + 2];

            map.set(anchor, html);
          }

          if (canceled) return;
        }

        const terms = new Set<string>();

        results.value = results.value.map((result) => {
          const [id, anchor] = result.id.split("#");
          const map = c.get(id);
          const text = map?.get(anchor) ?? "";

          for (const term in result["match"]) terms.add(term);

          return { ...result, text };
        });

        await nextTick();

        if (canceled) return;

        await new Promise((r) => {
          mark.value?.unmark({
            done: () => {
              mark.value?.markRegExp(formMarkRegex(terms), { done: r });
            },
          });
        });

        const excerpts: HTMLElement[] = Array.from(
          el.value?.querySelectorAll(".result .excerpt") ?? []
        );

        for (const excerpt of excerpts)
          excerpt
            .querySelector('mark[data-markjs="true"]')
            ?.scrollIntoView({ block: "center" });

        // FIXME: without this whole page scrolls to the bottom
        resultsElement.value?.firstElementChild?.scrollIntoView({
          block: "start",
        });
      },
      { debounce: 200, immediate: true }
    );

    /* Search input focus */

    const searchInput = ref<HTMLInputElement>();

    const focusSearchInput = (): void => {
      searchInput.value?.focus();
      searchInput.value?.select();
    };

    onMounted(() => {
      focusSearchInput();
    });

    const onSearchBarClick = ({ pointerType }: PointerEvent): void => {
      if (pointerType === "mouse") focusSearchInput();
    };

    /* Search keyboard selection */

    const selectedIndex = ref(0);
    const disableMouseOver = ref(false);

    const scrollToSelectedResult = (): Promise<void> =>
      nextTick().then(() => {
        const selectedElement = document.querySelector(".result.selected");

        selectedElement?.scrollIntoView({
          block: "nearest",
        });
      });

    watch(results, () => {
      selectedIndex.value = 0;
      void scrollToSelectedResult();
    });

    onKeyStroke("ArrowUp", (event) => {
      event.preventDefault();

      selectedIndex.value--;
      if (selectedIndex.value < 0)
        selectedIndex.value = results.value.length - 1;

      disableMouseOver.value = true;

      void scrollToSelectedResult();
    });

    onKeyStroke("ArrowDown", (event) => {
      event.preventDefault();
      selectedIndex.value++;

      if (selectedIndex.value >= results.value.length) selectedIndex.value = 0;

      disableMouseOver.value = true;
      void scrollToSelectedResult();
    });

    const router = useRouter();

    onKeyStroke("Enter", () => {
      const selectedPackage = results.value[selectedIndex.value];

      if (selectedPackage) {
        void router.push(selectedPackage.id);
        emit("close");
      }
    });

    onKeyStroke("Escape", () => {
      emit("close");
    });

    // Back
    useEventListener("popstate", (event) => {
      event.preventDefault();
      emit("close");
    });

    onMounted(() => {
      /** Lock body */
      const isLocked = useScrollLock(document.body);

      void nextTick().then(() => {
        isLocked.value = true;
      });

      onBeforeUnmount(() => {
        isLocked.value = false;
      });

      // Prevents going to previous site
      window.history.pushState(null, "", null);
    });

    return (): VNode =>
      h("div", { ref: el, class: "VPLocalSearchBox", "aria-modal": "true" }, [
        h("div", { class: "backdrop", onClick: () => emit("close") }),
        h("div", { class: "shell" }, [
          h("div", { class: "search-bar", onPointerUp: onSearchBarClick }, [
            h(
              "div",
              { class: "search-actions before" },
              h("button", {
                class: "back-button",
                title: locale.value.back,
                onClick: () => emit("close"),
                innerHTML: BACK_ICON,
              })
            ),
            h("input", { ref: searchInput, placeholder: placeholder.value }),
          ]),
        ]),
      ]);
  },
});
