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
import pluginConfig from "./pluginConfig";

import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { MarkdownEnhanceOptions } from "../types";

export = (
  option: MarkdownEnhanceOptions,
  { themeConfig }: Context
): PluginOptionAPI => {
  const markdownOption =
    Object.keys(option).length === 0 ? themeConfig.mdEnhance || {} : option;

  return {
    name: "md-enhance",

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_OPTIONS: markdownOption,
      CODE_DEMO_OPTIONS: {
        ...codeDemoDefaultSetting,
        ...(typeof markdownOption.demo === "boolean"
          ? {}
          : markdownOption.demo),
      },
      REVEAL_PLUGINS:
        typeof markdownOption.presentation === "object" &&
        Array.isArray(markdownOption.presentation.plugins)
          ? markdownOption.presentation.plugins
          : [],
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

    plugins: pluginConfig(markdownOption, themeConfig),
  };
};
