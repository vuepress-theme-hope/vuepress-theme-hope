import { type MermaidConfig } from "mermaid";
import {
  type VNode,
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { LoadingIcon, atou } from "vuepress-shared/client";

import "../styles/mermaid.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;
declare const MERMAID_OPTIONS: MermaidConfig;

const getThemeVariables = (isDarkmode: boolean): Record<string, unknown> => {
  return {
    dark: isDarkmode,
    background: isDarkmode ? "#1e1e1e" : "#fff",

    primaryColor: isDarkmode ? "#389d70" : "#4abf8a",
    primaryBorderColor: isDarkmode ? "#389d70" : "#4abf8a",
    primaryTextColor: "#fff",

    secondaryColor: "#ffb500",
    secondaryBorderColor: isDarkmode ? "#fff" : "#000",
    secondaryTextColor: isDarkmode ? "#ddd" : "#333",

    tertiaryColor: isDarkmode ? "#282828" : "#efeef4",
    tertiaryBorderColor: isDarkmode ? "#bbb" : "#242424",
    tertiaryTextColor: isDarkmode ? "#ddd" : "#333",

    // note
    noteBkgColor: isDarkmode ? "#f6d365" : "#fff5ad",
    noteTextColor: "#242424",
    noteBorderColor: isDarkmode ? "#f6d365" : "#333",

    lineColor: isDarkmode ? "#d3d3d3" : "#333",
    textColor: isDarkmode ? "#fff" : "#242424",

    mainBkg: isDarkmode ? "#389d70" : "#4abf8a",
    errorBkgColor: "#eb4d5d",
    errorTextColor: "#fff",

    // flowchart
    nodeBorder: isDarkmode ? "#389d70" : "#4abf8a",
    nodeTextColor: isDarkmode ? "#fff" : "#242424",

    // sequence
    signalTextColor: isDarkmode ? "#9e9e9e" : "#242424",

    // class
    classText: "#fff",

    // state
    labelColor: "#fff",

    // colors
    fillType0: isDarkmode ? "#cf1322" : "#f1636e",
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
    /**
     * Mermaid id
     */
    id: { type: String, required: true },

    /**
     * Mermaid config
     *
     * Mermaid 配置
     */
    code: { type: String, required: true },
  },

  setup(props) {
    const mermaidElement = ref<HTMLElement>();

    const svgCode = ref("");
    const isDarkmode = ref(false);

    const code = computed(() => atou(props.code));

    const renderMermaid = async (): Promise<void> =>
      Promise.all([
        import(
          /* webpackChunkName: "mermaid" */ "mermaid/dist/mermaid.esm.min.mjs"
        ),
        import(
          /* webpackChunkName: "mermaid" */ "@mermaid-js/mermaid-mindmap/dist/mermaid-mindmap.esm.min.mjs"
        ),
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(async ([{ default: mermaid }, { default: mindmap }]) => {
        try {
          await mermaid.registerExternalDiagrams([mindmap]);
        } catch (err) {
          // mermaid does not provide a api to get registered diagrams
        }

        // generate a invisible container
        const container = document.createElement("div");

        container.style.position = "relative";
        container.style.top = "-9999px";

        const renderCallback = (code: string): void => {
          svgCode.value = code;
          document.body.removeChild(container);
        };
        const chartOptions = { useMaxWidth: false };

        mermaid.initialize({
          // @ts-ignore
          theme: "base",
          themeVariables: getThemeVariables(isDarkmode.value),
          flowchart: chartOptions,
          sequence: chartOptions,
          journey: chartOptions,
          gantt: chartOptions,
          er: chartOptions,
          pie: chartOptions,

          ...MERMAID_OPTIONS,
          startOnLoad: false,
        });

        // clear SVG Code
        svgCode.value = "";

        document.body.appendChild(container);

        // make sure dom is refreshed
        await nextTick();

        await mermaid.renderAsync(
          props.id,
          code.value,
          renderCallback,
          container
        );
      });

    onMounted(() => {
      const html = document.querySelector("html")!;

      const getDarkmodeStatus = (): boolean =>
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark";

      // FIXME: Should correct handle dark selector
      isDarkmode.value = getDarkmodeStatus();

      void renderMermaid();

      // watch darkmode change
      const observer = new MutationObserver(() => {
        isDarkmode.value = getDarkmodeStatus();
      });

      observer.observe(html, {
        attributeFilter: ["class", "data-theme"],
        attributes: true,
      });

      watch(isDarkmode, () => renderMermaid());

      onUnmounted(() => {
        observer.disconnect();
      });
    });

    return (): VNode =>
      h(
        "div",
        {
          ref: mermaidElement,
          class: "mermaid-wrapper",
        },
        svgCode.value
          ? // mermaid
            h("div", { class: "content", innerHTML: svgCode.value })
          : // loading
            h(LoadingIcon, { class: "mermaid-loading", height: 96 })
      );
  },
});
