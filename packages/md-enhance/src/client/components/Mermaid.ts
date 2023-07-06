import { useMutationObserver } from "@vueuse/core";
import type { VNode } from "vue";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  shallowRef,
  watch,
} from "vue";
import { LoadingIcon, atou, isFunction } from "vuepress-shared/client";

import type { MermaidThemeVariables } from "../helpers/index.js";
import { useMermaidOptions } from "../helpers/index.js";

import "../styles/mermaid.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

const DEFAULT_CHART_OPTIONS = { useMaxWidth: false };

const getThemeVariables = (isDarkmode: boolean): MermaidThemeVariables => ({
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
});

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
    const { themeVariables, ...mermaidOptions } = useMermaidOptions();
    const mermaidElement = shallowRef<HTMLElement>();

    const code = computed(() => atou(props.code));

    const svgCode = ref("");
    const isDarkmode = ref(false);

    const renderMermaid = async (): Promise<void> => {
      const [{ default: mermaid }] = await Promise.all([
        import(/* webpackChunkName: "mermaid" */ "@mermaid"),
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]);

      mermaid.initialize({
        // @ts-ignore
        theme: "base",
        themeVariables: {
          ...getThemeVariables(isDarkmode.value),
          ...(isFunction(themeVariables)
            ? themeVariables(isDarkmode.value)
            : themeVariables),
        },
        flowchart: DEFAULT_CHART_OPTIONS,
        sequence: DEFAULT_CHART_OPTIONS,
        journey: DEFAULT_CHART_OPTIONS,
        gantt: DEFAULT_CHART_OPTIONS,
        er: DEFAULT_CHART_OPTIONS,
        pie: DEFAULT_CHART_OPTIONS,
        ...mermaidOptions,
        startOnLoad: false,
      });

      // eslint-disable-next-line
      svgCode.value = (await mermaid.render(props.id, code.value)).svg;
    };

    const preview = (): void => {
      const { body } = document;
      const div = document.createElement("div");

      div.classList.add("mermaid-preview");

      div.innerHTML = svgCode.value;
      body.appendChild(div);

      div.addEventListener("click", () => {
        body.removeChild(div);
      });
    };

    const download = (): void => {
      const dataURI = `data:image/svg+xml;charset=utf8,${svgCode.value
        .replace(/<br>/g, "<br />")
        .replace(/%/g, "%25")
        .replace(/"/g, "%22")
        .replace(/'/g, "%27")
        .replace(/&/g, "%26")
        .replace(/#/g, "%23")
        .replace(/{/g, "%7B")
        .replace(/}/g, "%7D")
        .replace(/</g, "%3C")
        .replace(/>/g, "%3E")}`;

      const a = document.createElement("a");

      a.setAttribute("href", dataURI);
      a.setAttribute("download", `${props.id}.svg`);
      a.click();
    };

    onMounted(() => {
      const html = document.documentElement;

      const getDarkmodeStatus = (): boolean =>
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark";

      // FIXME: Should correct handle dark selector
      isDarkmode.value = getDarkmodeStatus();

      void renderMermaid();

      // watch darkmode change
      useMutationObserver(
        html,
        () => {
          isDarkmode.value = getDarkmodeStatus();
        },
        {
          attributeFilter: ["class", "data-theme"],
          attributes: true,
        },
      );

      watch(isDarkmode, () => renderMermaid());
    });

    return (): VNode[] => [
      h("div", { class: "mermaid-actions" }, [
        h("button", {
          class: "preview-button",
          onClick: () => preview(),
          title: "preview",
          innerHTML:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1316 1024" fill="currentColor"><path d="M658.286 0C415.89 0 0 297.106 0 512c0 214.82 415.89 512 658.286 512 242.322 0 658.285-294.839 658.285-512S900.608 0 658.286 0zm0 877.714c-161.573 0-512-221.769-512-365.714 0-144.018 350.427-365.714 512-365.714 161.572 0 512 217.16 512 365.714s-350.428 365.714-512 365.714z"/><path d="M658.286 292.571a219.429 219.429 0 1 0 0 438.858 219.429 219.429 0 0 0 0-438.858zm0 292.572a73.143 73.143 0 1 1 0-146.286 73.143 73.143 0 0 1 0 146.286z"/></svg>',
        }),
        h("button", {
          class: "download-button",
          onClick: () => download(),
          title: "download",
          innerHTML:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor"><path d="M828.976 894.125H190.189c-70.55 0-127.754-57.185-127.754-127.753V606.674c0-17.634 14.31-31.933 31.933-31.933h63.889c17.634 0 31.932 14.299 31.932 31.933v95.822c0 35.282 28.596 63.877 63.877 63.877h511.033c35.281 0 63.877-28.595 63.877-63.877v-95.822c0-17.634 14.298-31.933 31.943-31.933h63.878c17.635 0 31.933 14.299 31.933 31.933v159.7c0 70.566-57.191 127.751-127.754 127.751zM249.939 267.51c12.921-12.92 33.885-12.92 46.807 0l148.97 148.972V94.893c0-17.634 14.302-31.947 31.934-31.947h63.876c17.638 0 31.946 14.313 31.946 31.947v321.589l148.97-148.972c12.922-12.92 33.876-12.92 46.797 0l46.814 46.818c12.922 12.922 12.922 33.874 0 46.807L552.261 624.93c-1.14 1.138-21.664 13.684-42.315 13.693-20.877.01-41.88-12.542-43.021-13.693L203.122 361.135c-12.923-12.934-12.923-33.885 0-46.807l46.817-46.818z"/></svg>',
        }),
      ]),
      h(
        "div",
        {
          ref: mermaidElement,
          class: "mermaid-wrapper",
        },
        svgCode.value
          ? // mermaid
            h("div", { class: "mermaid-content", innerHTML: svgCode.value })
          : // loading
            h(LoadingIcon, { class: "mermaid-loading", height: 96 }),
      ),
    ];
  },
});
