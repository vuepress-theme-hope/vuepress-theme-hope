import {
  LoadingIcon,
  decodeData,
  isFunction,
  useDarkMode,
} from "@vuepress/helper/client";
import { watchImmediate } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref, shallowRef } from "vue";

import { useMermaidOptions } from "../helpers/index.js";
import type { MermaidThemeVariables } from "../typings/index.js";
import { DOWNLOAD_ICON, PREVIEW_ICON, encodeSVG } from "../utils/index.js";

import "../styles/mermaid.scss";

const DEFAULT_CHART_OPTIONS = { useMaxWidth: false };

const getThemeVariables = (isDarkMode: boolean): MermaidThemeVariables => ({
  dark: isDarkMode,
  background: isDarkMode ? "#1e1e1e" : "#fff",

  primaryColor: isDarkMode ? "#389d70" : "#4abf8a",
  primaryBorderColor: isDarkMode ? "#389d70" : "#4abf8a",
  primaryTextColor: isDarkMode ? "#fff" : "#000",

  secondaryColor: "#ffb500",
  secondaryBorderColor: isDarkMode ? "#fff" : "#000",
  secondaryTextColor: isDarkMode ? "#ddd" : "#333",

  tertiaryColor: isDarkMode ? "#282828" : "#efeef4",
  tertiaryBorderColor: isDarkMode ? "#bbb" : "#242424",
  tertiaryTextColor: isDarkMode ? "#ddd" : "#333",

  // Note
  noteBkgColor: isDarkMode ? "#f6d365" : "#fff5ad",
  noteTextColor: "#242424",
  noteBorderColor: isDarkMode ? "#f6d365" : "#333",

  lineColor: isDarkMode ? "#d3d3d3" : "#333",
  textColor: isDarkMode ? "#fff" : "#242424",

  mainBkg: isDarkMode ? "#389d70" : "#4abf8a",
  errorBkgColor: "#eb4d5d",
  errorTextColor: "#fff",

  // Flowchart
  nodeBorder: isDarkMode ? "#389d70" : "#4abf8a",
  nodeTextColor: isDarkMode ? "#fff" : "#242424",

  // Sequence
  signalTextColor: isDarkMode ? "#9e9e9e" : "#242424",

  // Class
  classText: "#fff",

  // State
  labelColor: "#fff",

  attributeBackgroundColorEven: isDarkMode ? "#0d1117" : "#fff",
  attributeBackgroundColorOdd: isDarkMode ? "#161b22" : "#f8f8f8",

  // Colors
  fillType0: isDarkMode ? "#cf1322" : "#f1636e",
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
    id: {
      type: String,
      required: true,
    },

    /**
     * Mermaid config
     *
     * Mermaid 配置
     */
    code: {
      type: String,
      required: true,
    },

    /**
     * Mermaid title
     *
     * Mermaid 标题
     */
    title: String,
  },

  setup(props) {
    const isDarkMode = useDarkMode();
    const { themeVariables, ...mermaidOptions } = useMermaidOptions();
    const mermaidElement = shallowRef<HTMLElement>();

    const code = computed(() => decodeData(props.code));

    const svgCode = ref("");

    const renderMermaid = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return;

      const { default: mermaid } = await import(
        /* webpackChunkName: "mermaid" */ "mermaid/dist/mermaid.esm.min.mjs"
      );

      mermaid.initialize({
        theme: "base",
        themeVariables: {
          ...getThemeVariables(isDarkMode.value),
          ...(isFunction(themeVariables)
            ? themeVariables(isDarkMode.value)
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
      const dataURI = encodeSVG(svgCode.value);

      const a = document.createElement("a");

      a.setAttribute("href", dataURI);
      a.setAttribute(
        "download",
        `${props.title ? decodeData(props.title) : props.id}.svg`,
      );
      a.click();
    };

    onMounted(() => {
      watchImmediate(isDarkMode, renderMermaid, {
        flush: "post",
      });
    });

    return (): VNode[] => [
      h("div", { class: "mermaid-actions" }, [
        h("button", {
          class: "preview-button",
          title: "preview",
          innerHTML: PREVIEW_ICON,
          onClick: preview,
        }),
        h("button", {
          class: "download-button",
          title: "download",
          innerHTML: DOWNLOAD_ICON,
          onClick: download,
        }),
      ]),
      h(
        "div",
        {
          ref: mermaidElement,
          class: "mermaid-wrapper",
        },
        svgCode.value
          ? // Mermaid
            h("div", { class: "mermaid-content", innerHTML: svgCode.value })
          : // Loading
            h(LoadingIcon, { class: "mermaid-loading", height: 96 }),
      ),
    ];
  },
});
