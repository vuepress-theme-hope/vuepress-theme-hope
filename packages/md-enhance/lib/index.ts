import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { MarkdownEnhanceOption } from "../types";
import flowchart from "./markdown-it/flowchart";
import footnote from "./markdown-it/footnote";
import lineNumbers = require("@vuepress/markdown/lib/lineNumbers");
import katex from "./markdown-it/katex";
import mark from "./markdown-it/mark";
import pluginConfig from "./pluginConfig";
import { resolve } from "path";
import sub from "./markdown-it/sub";
import sup from "./markdown-it/sup";

export = (option: MarkdownEnhanceOption, context: Context): PluginOptionAPI => {
  const markdownOption =
    Object.keys(option).length === 0
      ? context.themeConfig.markdown || {}
      : option;

  const config: PluginOptionAPI = {
    name: "md-enhance",

    enhanceAppFiles: resolve(__dirname, "../src/enhanceAppFile.js"),
    chainMarkdown: (md) => {
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
    },
  };

  config.plugins = pluginConfig(markdownOption, context.themeConfig);

  return config;
};
