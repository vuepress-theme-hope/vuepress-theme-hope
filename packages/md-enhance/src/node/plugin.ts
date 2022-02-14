import { addViteOptimizeDeps, noopModule } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  codeDemoDefaultSetting,
  flowchart,
  footnote,
  katex,
  lazyLoad,
  mark,
  mermaid,
  presentation,
  sub,
  sup,
  tasklist,
} from "./markdown-it";
import { usePlugins } from "./usePlugins";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { MarkdownEnhanceOptions } from "../shared";

export const mdEnhancePlugin: Plugin<MarkdownEnhanceOptions> = (
  options,
  app
) => {
  const alignEnable = options.enableAll || options.align || false;
  const containerEnable = options.enableAll || options.container || false;
  const codegroupEnable = options.enableAll || options.codegroup || false;
  const demoEnable = options.enableAll || options.demo || false;
  const flowchartEnable = options.enableAll || options.flowchart || false;
  const footnoteEnable = options.enableAll || options.footnote || false;
  const tasklistEnable = options.enableAll || options.tasklist || false;
  const mermaidEnable = options.enableAll || Boolean(options.mermaid) || false;
  const presentationEnable =
    options.enableAll || Boolean(options.presentation) || false;
  const texEnable = options.enableAll || Boolean(options.tex) || false;

  const revealPlugins =
    typeof options.presentation === "object" &&
    Array.isArray(options.presentation.plugins)
      ? options.presentation.plugins
      : [];

  if (app.env.isDev)
    addViteOptimizeDeps(app, "@mr-hope/vuepress-shared/lib/client");

  if (flowchartEnable) addViteOptimizeDeps(app, "flowchart.js");
  if (mermaidEnable) addViteOptimizeDeps(app, "mermaid");
  if (presentationEnable)
    addViteOptimizeDeps(app, [
      "reveal.js",
      "reveal.js",
      "reveal.js/plugin/markdown/markdown.esm.js",
      "reveal.js/plugin/highlight/highlight.esm.js",
      "reveal.js/plugin/math/math.esm.js",
      "reveal.js/plugin/search/search.esm.js",
      "reveal.js/plugin/notes/notes.esm.js",
      "reveal.js/plugin/zoom/zoom.esm.js",
    ]);

  useSassPalettePlugin(app, { id: "hope" });

  usePlugins(app, options);

  return {
    name: "vuepress-plugin-md-enhance",

    alias: {
      "@CodeGroup": codegroupEnable
        ? path.resolve(__dirname, "../client/components/CodeGroup.js")
        : noopModule,
      "@CodeGroupItem": codegroupEnable
        ? path.resolve(__dirname, "../client/components/CodeGroupItem.js")
        : noopModule,
      "@FlowChart": flowchartEnable
        ? path.resolve(__dirname, "../client/components/FlowChart.js")
        : noopModule,
      "@Mermaid": mermaidEnable
        ? path.resolve(__dirname, "../client/components/Mermaid.js")
        : noopModule,
      "@Presentation": presentationEnable
        ? path.resolve(__dirname, "../client/components/Presentation.js")
        : noopModule,
    },

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_ALIGN: alignEnable,
      MARKDOWN_ENHANCE_CONTAINER: containerEnable,
      MARKDOWN_ENHANCE_DELAY: options.delay || 500,
      MARKDOWN_ENHANCE_FOOTNOTE: footnoteEnable,
      MARKDOWN_ENHANCE_TASKLIST: tasklistEnable,
      MARKDOWN_ENHANCE_TEX: texEnable,
      CODE_DEMO_OPTIONS: {
        ...codeDemoDefaultSetting,
        ...(typeof options.demo === "object" ? options.demo : {}),
      },
      MERMAID_OPTIONS:
        typeof options.mermaid === "object" ? options.mermaid : {},
      REVEAL_CONFIG:
        typeof options.presentation === "object" &&
        typeof options.presentation.revealConfig === "object"
          ? options.presentation.revealConfig
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
      if (options.lazyLoad || options.enableAll) markdownIt.use(lazyLoad);

      if (options.sup || options.enableAll) markdownIt.use(sup);
      if (options.sub || options.enableAll) markdownIt.use(sub);
      if (footnoteEnable) markdownIt.use(footnote);
      if (flowchartEnable) markdownIt.use(flowchart);
      if (options.mark || options.enableAll) markdownIt.use(mark);
      if (tasklistEnable)
        markdownIt.use(tasklist, [
          typeof options.tasklist === "object" ? options.tasklist : {},
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
          ...(typeof options.tex === "object" ? options.tex : {}),
        });
      if (presentationEnable) markdownIt.use(presentation);
    },
  };
};

export const mdEnhance = (
  options: MarkdownEnhanceOptions | false
): PluginConfig<MarkdownEnhanceOptions> => ["md-enhance", options];
