import { path } from "@vuepress/utils";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { codeDemoDefaultSetting } from "./markdown-it/code-demo";
import {
  footnote,
  katex,
  mark,
  mermaid,
  presentation,
  sub,
  sup,
  tasklist,
} from "./markdown-it";
import { usePlugins } from "./usePlugins";

import type { Plugin } from "@vuepress/core";
import type { MarkdownEnhanceOptions } from "../shared";

export {
  CodeDemoOptions,
  MarkdownEnhanceOptions,
  PresentationOptions,
  RevealPlugin,
} from "../shared";

const markdownEnhancePlugin: Plugin<MarkdownEnhanceOptions> = (option, app) => {
  const { themeConfig } = app.options;
  const markdownOptions =
    Object.keys(option).length === 0
      ? (themeConfig.mdEnhance as MarkdownEnhanceOptions) || {}
      : option;

  const alignEnable =
    markdownOptions.enableAll || markdownOptions.align || false;
  const demoEnable = markdownOptions.enableAll || markdownOptions.demo || false;
  const footnoteEnable =
    markdownOptions.enableAll || markdownOptions.footnote || false;
  const tasklistEnable =
    markdownOptions.enableAll || markdownOptions.tasklist || false;
  const mermaidEnable =
    markdownOptions.enableAll || Boolean(markdownOptions.mermaid) || false;
  const presentationEnable =
    markdownOptions.enableAll || Boolean(markdownOptions.presentation) || false;
  const texEnable =
    markdownOptions.enableAll || Boolean(markdownOptions.tex) || false;

  const revealPlugins =
    typeof markdownOptions.presentation === "object" &&
    Array.isArray(markdownOptions.presentation.plugins)
      ? markdownOptions.presentation.plugins
      : [];

  usePalettePlugin(app, { id: "hope" });

  usePlugins(app, markdownOptions);

  return {
    name: "vuepress-plugin-md-enhance",

    alias: {
      "@Mermaid": mermaidEnable
        ? path.resolve(__dirname, "../client/components/Mermaid.js")
        : "@mr-hope/vuepress-shared/client/noopModule.js",
      "@Presentation": presentationEnable
        ? path.resolve(__dirname, "../client/components/Presentation.js")
        : "@mr-hope/vuepress-shared/client/noopModule.js",
    },

    define: (): Record<string, unknown> => ({
      MARKDOWN_DELAY: markdownOptions.delay || 500,
      MARKDOWN_ENHANCE_ALIGN: alignEnable,
      MARKDOWN_ENHANCE_FOOTNOTE: footnoteEnable,
      MARKDOWN_ENHANCE_MERMAID: mermaidEnable,
      MARKDOWN_ENHANCE_PRESENTATION: presentationEnable,
      MARKDOWN_ENHANCE_TASKLIST: tasklistEnable,
      MARKDOWN_ENHANCE_TEX: texEnable,
      CODE_DEMO_OPTIONS: {
        ...codeDemoDefaultSetting,
        ...(typeof markdownOptions.demo === "object"
          ? markdownOptions.demo
          : {}),
      },
      MERMAID_OPTIONS:
        typeof markdownOptions.mermaid === "object"
          ? markdownOptions.mermaid
          : {},
      REVEAL_CONFIG:
        typeof markdownOptions.presentation === "object" &&
        typeof markdownOptions.presentation.revealConfig === "object"
          ? markdownOptions.presentation.revealConfig
          : {},
      REVEAL_PLUGIN_HIGHLIGHT: revealPlugins.includes("highlight"),
      REVEAL_PLUGIN_MATH: revealPlugins.includes("math"),
      REVEAL_PLUGIN_NOTES: revealPlugins.includes("notes"),
      REVEAL_PLUGIN_SEARCH: revealPlugins.includes("search"),
      REVEAL_PLUGIN_ZOOM: revealPlugins.includes("zoom"),
    }),

    ...(demoEnable
      ? {
          clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),
        }
      : {}),
    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    extendsMarkdown: (markdownIt): void => {
      if (markdownOptions.sup || markdownOptions.enableAll) markdownIt.use(sup);
      if (markdownOptions.sub || markdownOptions.enableAll) markdownIt.use(sub);
      if (footnoteEnable) markdownIt.use(footnote);
      if (markdownOptions.mark || markdownOptions.enableAll)
        markdownIt.use(mark);
      if (tasklistEnable)
        markdownIt.use(tasklist, [
          typeof markdownOptions.tasklist === "object"
            ? markdownOptions.tasklist
            : {},
        ]);
      if (mermaidEnable) markdownIt.use(mermaid);
      if (texEnable)
        markdownIt.use(katex, {
          macros: {
            // support more symbols
            "\\liiiint": "\\int\\!\\!\\!\\iiint",
            "\\iiiint": "\\int\\!\\!\\!\\!\\iiint",
            "\\idotsint": "\\int\\!\\cdots\\!\\int",
          },
          ...(typeof markdownOptions.tex === "object"
            ? markdownOptions.tex
            : {}),
        });
      if (presentationEnable) markdownIt.use(presentation);
    },
  };
};

export default markdownEnhancePlugin;
