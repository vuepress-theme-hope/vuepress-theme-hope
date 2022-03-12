import {
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { LoadingIcon } from "./icons";

import type MermaidAPI from "mermaid/mermaidAPI";
import type { VNode } from "vue";

import "../styles/mermaid.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;
declare const MERMAID_OPTIONS: MermaidAPI.Config;

const getThemeVariables = (isDarkMode: boolean): Record<string, unknown> => {
  return {
    dark: isDarkMode,
    background: isDarkMode ? "#1e1e1e" : "#fff",

    primaryColor: isDarkMode ? "#389d70" : "#4abf8a",
    primaryBorderColor: isDarkMode ? "#389d70" : "#4abf8a",
    primaryTextColor: "#fff",

    secondaryColor: "#f39c12",
    secondaryBorderColor: isDarkMode ? "#fff" : "#000",
    secondaryTextColor: isDarkMode ? "#ddd" : "#333",

    tertiaryColor: isDarkMode ? "#22182d" : "#eeeaf3",
    tertiaryBorderColor: isDarkMode ? "#fff" : "#000",
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
  name: "MermaidChart",

  props: {
    id: { type: String, required: true },
  },

  setup(props) {
    const svgCode = ref("");
    const mermaidElement = ref<HTMLElement>();
    let observer: MutationObserver;

    onMounted(() => {
      const code = decodeURIComponent(mermaidElement.value?.dataset.code || "");

      void Promise.all([
        import(/* webpackChunkName: "mermaid" */ "mermaid"),
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([mermaid]) => {
        const { initialize, render } = mermaid.default;

        const renderMermaid = (isDarkMode: boolean): void => {
          // generate a unvisiable container
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
            themeVariables: getThemeVariables(isDarkMode),
            ...MERMAID_OPTIONS,
            startOnLoad: false,
          });

          // clear SVG Code
          svgCode.value = "";

          document.body.appendChild(container);

          // make sure dom is refreshed
          void nextTick(() => {
            render(props.id, code, renderCallback, container);
          });
        };

        const body = document.querySelector("body") as HTMLBodyElement;

        // FIXME: Should correct handle dark selector
        renderMermaid(body.classList.contains("theme-dark"));

        // watch theme change
        observer = new MutationObserver(() => {
          renderMermaid(body.classList.contains("theme-dark"));
        });

        observer.observe(body, {
          attributeFilter: ["class"],
          attributes: true,
        });
      });
    });

    onBeforeUnmount(() => {
      observer.disconnect();
    });

    return (): VNode =>
      h(
        "div",
        {
          ref: mermaidElement,
          class: ["md-enhance-mermaid", { loading: !svgCode.value }],
        },
        svgCode.value
          ? // mermaid
            h("div", { class: "content", innerHTML: svgCode.value })
          : // loading
            h(LoadingIcon)
      );
  },
});
