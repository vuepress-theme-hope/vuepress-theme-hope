import { resolve } from "path";
import lineNumbers = require("@vuepress/markdown/lib/lineNumbers");

import { codeDemoDefaultSetting } from "./markdown-it/code-demo";
import flowchart from "./markdown-it/flowchart";
import footnote from "./markdown-it/footnote";
import katex from "./markdown-it/katex";
import mark from "./markdown-it/mark";
import presentation from "./markdown-it/presentation";
import sub from "./markdown-it/sub";
import sup from "./markdown-it/sup";
import { pluginConfig } from "./pluginConfig";

import type { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { MarkdownEnhanceOptions } from "../types";

export = (
  option: MarkdownEnhanceOptions,
  context: Context
): PluginOptionAPI => {
  const { themeConfig } = context;
  const markdownOption =
    Object.keys(option).length === 0 ? themeConfig.mdEnhance || {} : option;

  const revealPlugins =
    typeof markdownOption.presentation === "object" &&
    Array.isArray(markdownOption.presentation.plugins)
      ? markdownOption.presentation.plugins
      : [];

  return {
    name: "md-enhance",

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_ALIGN:
        markdownOption.enableAll || markdownOption.align || false,
      MARKDOWN_ENHANCE_FLOWCHART:
        markdownOption.enableAll || markdownOption.flowchart || false,
      MARKDOWN_ENHANCE_FOOTNOTE:
        markdownOption.enableAll || markdownOption.footnote || false,
      MARKDOWN_ENHANCE_PRESENTATION:
        markdownOption.enableAll || markdownOption.presentation || false,
      MARKDOWN_ENHANCE_TEX:
        markdownOption.enableAll || markdownOption.tex || false,
      CODE_DEMO_OPTIONS: {
        ...codeDemoDefaultSetting,
        ...(typeof markdownOption.demo === "boolean"
          ? {}
          : markdownOption.demo),
      },
      REVEAL_PLUGIN_HIGHLIGHT: revealPlugins.includes("highlight"),
      REVEAL_PLUGIN_MATH: revealPlugins.includes("math"),
      REVEAL_PLUGIN_NOTES: revealPlugins.includes("notes"),
      REVEAL_PLUGIN_SEARCH: revealPlugins.includes("search"),
      REVEAL_PLUGIN_ZOOM: revealPlugins.includes("zoom"),
      REVEAL_CONFIG:
        typeof markdownOption.presentation === "object" &&
        typeof markdownOption.presentation.revealConfig === "object"
          ? markdownOption.presentation.revealConfig
          : {},
    }),

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    clientRootMixin: resolve(__dirname, "../client/clientRootMixin.js"),

    chainMarkdown: (md): void => {
      if (markdownOption.lineNumbers !== false)
        md.plugin("line-numbers").use(lineNumbers);
      if (markdownOption.sup || markdownOption.enableAll)
        md.plugin("sup").use(sup);
      if (markdownOption.sub || markdownOption.enableAll)
        md.plugin("sub").use(sub);
      if (markdownOption.footnote || markdownOption.enableAll)
        md.plugin("footnote").use(footnote);
      if (markdownOption.mark || markdownOption.enableAll)
        md.plugin("mark").use(mark);
      if (markdownOption.flowchart || markdownOption.enableAll)
        md.plugin("flowchart").use(flowchart);
      if (markdownOption.tex || markdownOption.enableAll)
        md.plugin("katex").use(katex, [
          {
            macros: {
              // support more symbols
              "\\liiiint": "\\int\\!\\!\\!\\iiint",
              "\\iiiint": "\\int\\!\\!\\!\\!\\iiint",
              "\\idotsint": "\\int\\!\\cdots\\!\\int",
            },
          },
        ]);
      if (markdownOption.presentation || markdownOption.enableAll)
        md.plugin("presentation").use(presentation);
    },

    plugins: pluginConfig(markdownOption, context),
  };
};
