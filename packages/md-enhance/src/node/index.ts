import { resolve } from "path";
import lineNumbers = require("@vuepress/markdown/lib/lineNumbers");

import { codeDemoDefaultSetting } from "./markdown-it/code-demo";
import decodeURL from "./markdown-it/decode-url";
import flowchart from "./markdown-it/flowchart";
import footnote from "./markdown-it/footnote";
import katex from "./markdown-it/katex";
import mark from "./markdown-it/mark";
import mermaid from "./markdown-it/mermaid";
import presentation from "./markdown-it/presentation";
import sub from "./markdown-it/sub";
import sup from "./markdown-it/sup";
import tasklist from "./markdown-it/tasklist";
import { pluginConfig } from "./pluginConfig";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { MarkdownEnhanceOptions } from "../types";

const mdEnhancePlugin: Plugin<MarkdownEnhanceOptions> = (option, context) => {
  const { themeConfig } = context;
  const markdownOption =
    Object.keys(option).length === 0 ? themeConfig.mdEnhance || {} : option;
  const alignEnable = markdownOption.enableAll || markdownOption.align || false;
  const demoEnable = markdownOption.enableAll || markdownOption.demo || false;
  const flowchartEnable =
    markdownOption.enableAll || markdownOption.flowchart || false;
  const footnoteEnable =
    markdownOption.enableAll || markdownOption.footnote || false;
  const tasklistEnable =
    markdownOption.enableAll || markdownOption.tasklist || false;
  const mermaidEnable =
    markdownOption.enableAll || Boolean(markdownOption.mermaid) || false;
  const presentationEnable =
    markdownOption.enableAll || Boolean(markdownOption.presentation) || false;
  const texEnable =
    markdownOption.enableAll || Boolean(markdownOption.tex) || false;

  const revealPlugins =
    typeof markdownOption.presentation === "object" &&
    Array.isArray(markdownOption.presentation.plugins)
      ? markdownOption.presentation.plugins
      : [];

  return {
    name: "md-enhance",

    alias: {
      "@FlowChart": flowchartEnable
        ? resolve(__dirname, "../client/FlowChart.vue")
        : "@mr-hope/vuepress-shared/lib/esm/noopModule",
      "@Mermaid": mermaidEnable
        ? resolve(__dirname, "../client/Mermaid.js")
        : "@mr-hope/vuepress-shared/lib/esm/noopModule",
      "@Presentation": presentationEnable
        ? resolve(__dirname, "../client/Presentation.vue")
        : "@mr-hope/vuepress-shared/lib/esm/noopModule",
    },

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_ALIGN: alignEnable,
      MARKDOWN_ENHANCE_FLOWCHART: flowchartEnable,
      MARKDOWN_ENHANCE_FOOTNOTE: footnoteEnable,
      MARKDOWN_ENHANCE_MERMAID: mermaidEnable,
      MARKDOWN_ENHANCE_PRESENTATION: presentationEnable,
      MARKDOWN_ENHANCE_TASKLIST: tasklistEnable,
      MARKDOWN_ENHANCE_TEX: texEnable,
      CODE_DEMO_OPTIONS: {
        ...codeDemoDefaultSetting,
        ...(typeof markdownOption.demo === "boolean"
          ? {}
          : markdownOption.demo),
      },
      MERMAID_OPTIONS:
        typeof markdownOption.mermaid === "object"
          ? markdownOption.mermaid
          : {},
      REVEAL_CONFIG:
        typeof markdownOption.presentation === "object" &&
        typeof markdownOption.presentation.revealConfig === "object"
          ? markdownOption.presentation.revealConfig
          : {},
      REVEAL_PLUGIN_HIGHLIGHT: revealPlugins.includes("highlight"),
      REVEAL_PLUGIN_MATH: revealPlugins.includes("math"),
      REVEAL_PLUGIN_NOTES: revealPlugins.includes("notes"),
      REVEAL_PLUGIN_SEARCH: revealPlugins.includes("search"),
      REVEAL_PLUGIN_ZOOM: revealPlugins.includes("zoom"),
    }),

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    ...(demoEnable
      ? {
          clientRootMixin: resolve(__dirname, "../client/clientRootMixin.js"),
        }
      : {}),

    chainMarkdown: (md): void => {
      if (markdownOption.imageFix !== false)
        md.plugin("decode-url").use(decodeURL);
      if (markdownOption.lineNumbers !== false)
        md.plugin("line-numbers").use(lineNumbers);
      if (markdownOption.sup || markdownOption.enableAll)
        md.plugin("sup").use(sup);
      if (markdownOption.sub || markdownOption.enableAll)
        md.plugin("sub").use(sub);
      if (footnoteEnable) md.plugin("footnote").use(footnote);
      if (flowchartEnable) md.plugin("flowchart").use(flowchart);
      if (markdownOption.mark || markdownOption.enableAll)
        md.plugin("mark").use(mark);
      if (tasklistEnable)
        md.plugin("tasklist").use(tasklist, [
          typeof markdownOption.tasklist === "object"
            ? markdownOption.tasklist
            : {},
        ]);
      if (mermaidEnable) md.plugin("mermaid").use(mermaid);
      if (texEnable)
        md.plugin("katex").use(katex, [
          {
            macros: {
              // support more symbols
              "\\liiiint": "\\int\\!\\!\\!\\iiint",
              "\\iiiint": "\\int\\!\\!\\!\\!\\iiint",
              "\\idotsint": "\\int\\!\\cdots\\!\\int",
            },
            ...(typeof markdownOption.tex === "object"
              ? markdownOption.tex
              : {}),
          },
        ]);
      if (presentationEnable) md.plugin("presentation").use(presentation);
    },

    plugins: pluginConfig(markdownOption, context),
  };
};

export = mdEnhancePlugin;
