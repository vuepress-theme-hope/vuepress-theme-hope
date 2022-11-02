import {
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { atou } from "vuepress-shared/client";
import { LoadingIcon } from "./icons.js";

import type { MermaidConfig } from "mermaid";
import type { VNode } from "vue";

import "../styles/mermaid.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;
declare const MERMAID_OPTIONS: MermaidConfig;

const getThemeVariables = (isDarkMode: boolean): Record<string, unknown> => {
  return {
    dark: isDarkMode,
    background: isDarkMode ? "#1e1e1e" : "#fff",

    primaryColor: isDarkMode ? "#389d70" : "#4abf8a",
    primaryBorderColor: isDarkMode ? "#389d70" : "#4abf8a",
    primaryTextColor: "#fff",

    secondaryColor: "#ffb500",
    secondaryBorderColor: isDarkMode ? "#fff" : "#000",
    secondaryTextColor: isDarkMode ? "#ddd" : "#333",

    tertiaryColor: isDarkMode ? "#282828" : "#efeef4",
    tertiaryBorderColor: isDarkMode ? "#bbb" : "#242424",
    tertiaryTextColor: isDarkMode ? "#ddd" : "#333",

    // note
    noteBkgColor: isDarkMode ? "#f6d365" : "#fff5ad",
    noteTextColor: "#242424",
    noteBorderColor: isDarkMode ? "#f6d365" : "#333",

    lineColor: isDarkMode ? "#d3d3d3" : "#333",
    textColor: isDarkMode ? "#fff" : "#242424",

    mainBkg: isDarkMode ? "#389d70" : "#4abf8a",
    errorBkgColor: "#eb4d5d",
    errorTextColor: "#fff",

    // flowchart
    nodeBorder: isDarkMode ? "#389d70" : "#4abf8a",
    nodeTextColor: isDarkMode ? "#fff" : "#242424",

    // sequence
    signalTextColor: isDarkMode ? "#9e9e9e" : "#242424",

    // class
    classText: "#fff",

    // state
    labelColor: "#fff",

    // colors
    fillType0: isDarkMode ? "#cf1322" : "#f1636e",
    fillType1: "#f39c12",
    fillType2: "#2ecc71",
    fillType3: "#fa541c",
    fillType4: "#25a55b",
    fillType5: "#13c2c2",
    fillType6: "#096dd9",
    fillType7: "#aa6fe9",
  };
};

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Mermaid",

  props: {
    id: { type: String, required: true },
    code: { type: String, required: true },
  },

  setup(props) {
    const svgCode = ref("");
    const mermaidElement = ref<HTMLElement>();
    const isDarkmode = ref(false);
    let observer: MutationObserver | null = null;

    onMounted(() => {
      const html = document.querySelector("html")!;
      const code = atou(props.code);

      const getDarkmodeStatus = (): boolean =>
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark";

      // FIXME: Should correct handle dark selector
      isDarkmode.value = getDarkmodeStatus();

      void Promise.all([
        import(/* webpackChunkName: "mermaid" */ "mermaid"),
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([{ default: mermaid }]) => {
        const { initialize, renderAsync } = mermaid;

        const renderMermaid = (): void => {
          // generate a invisible container
          const container = document.createElement("div");

          container.style.position = "relative";
          container.style.top = "-9999px";

          const renderCallback = (code: string): void => {
            svgCode.value = code;
            document.body.removeChild(container);
          };

          initialize({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            theme: "base",
            themeVariables: getThemeVariables(isDarkmode.value),
            flowchart: { useMaxWidth: false },
            sequence: { useMaxWidth: false },
            journey: { useMaxWidth: false },
            gantt: { useMaxWidth: false },
            er: { useMaxWidth: false },
            pie: { useMaxWidth: false },

            ...MERMAID_OPTIONS,
            startOnLoad: false,
          });

          // clear SVG Code
          svgCode.value = "";

          document.body.appendChild(container);

          // make sure dom is refreshed
          void nextTick().then(() =>
            renderAsync(props.id, code, renderCallback, container)
          );
        };

        renderMermaid();

        // watch darkmode change
        observer = new MutationObserver(() => {
          isDarkmode.value = getDarkmodeStatus();
        });

        observer.observe(html, {
          attributeFilter: ["class", "data-theme"],
          attributes: true,
        });

        watch(isDarkmode, renderMermaid);
      });
    });

    onBeforeUnmount(() => {
      observer?.disconnect();
    });

    return (): VNode =>
      h(
        "div",
        {
          ref: mermaidElement,
          class: ["mermaid-wrapper", { loading: !svgCode.value }],
        },
        svgCode.value
          ? // mermaid
            h("div", { class: "content", innerHTML: svgCode.value })
          : // loading
            h(LoadingIcon)
      );
  },
});
