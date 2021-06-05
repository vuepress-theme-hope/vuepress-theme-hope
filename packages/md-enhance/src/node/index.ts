import { path } from "@vuepress/utils";
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
import { resolvePlugin } from "./resolvePlugin";

import type { Plugin } from "@vuepress/core";
import type { MarkdownEnhanceOptions } from "../shared";

export {
  CodeDemoGlobalOptions,
  CodeDemoOptions,
  MarkdownEnhanceOptions,
  PresentationOptions,
  RevealPlugin,
} from "../shared";

const markdownEnhancePlugin: Plugin<MarkdownEnhanceOptions> = (option, app) => {
  const { themeConfig } = app.options;
  const markdownOption =
    Object.keys(option).length === 0
      ? (themeConfig.mdEnhance as MarkdownEnhanceOptions) || {}
      : option;

  const alignEnable = markdownOption.enableAll || markdownOption.align || false;
  const demoEnable = markdownOption.enableAll || markdownOption.demo || false;
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
      "@Mermaid": mermaidEnable
        ? path.resolve(__dirname, "../client/components/Mermaid")
        : "@mr-hope/vuepress-shared/lib/esm/noopModule",
      "@Presentation": presentationEnable
        ? path.resolve(__dirname, "../client/components/Presentation")
        : "@mr-hope/vuepress-shared/lib/esm/noopModule",
    },

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_ALIGN: alignEnable,
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

    ...(demoEnable
      ? {
          clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),
        }
      : {}),
    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    extendsMarkdown: (markdownIt): void => {
      if (markdownOption.sup || markdownOption.enableAll) markdownIt.use(sup);
      if (markdownOption.sub || markdownOption.enableAll) markdownIt.use(sub);
      if (footnoteEnable) markdownIt.use(footnote);
      if (markdownOption.mark || markdownOption.enableAll) markdownIt.use(mark);
      if (tasklistEnable)
        markdownIt.use(tasklist, [
          typeof markdownOption.tasklist === "object"
            ? markdownOption.tasklist
            : {},
        ]);
      if (mermaidEnable) markdownIt.use(mermaid);
      if (texEnable)
        markdownIt.use(katex, [
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
      if (presentationEnable) markdownIt.use(presentation);
    },

    plugins: resolvePlugin(markdownOption, app),
  };
};

export default markdownEnhancePlugin;
