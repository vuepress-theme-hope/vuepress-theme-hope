import {
  addCustomElement,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
  addViteSsrNoExternal,
  noopModule,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  codeDemoDefaultSetting,
  flowchart,
  footnote,
  imageMark,
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
import { MATHML_TAGS } from "./utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { KatexOptions } from "katex";
import type { MarkdownEnhanceOptions } from "../shared";

export const mdEnhancePlugin: Plugin<MarkdownEnhanceOptions> = (
  options,
  app
) => {
  const getStatus = (key: keyof MarkdownEnhanceOptions, gfm = false): boolean =>
    key in options
      ? Boolean(options[key])
      : gfm && "gfm" in options
      ? Boolean(options.gfm)
      : options.enableAll || false;

  const alignEnable = getStatus("align");
  const chartEnable = getStatus("chart");
  const containerEnable = getStatus("container");
  const codegroupEnable = getStatus("codegroup");
  const demoEnable = getStatus("demo");
  const flowchartEnable = getStatus("flowchart");
  const footnoteEnable = getStatus("footnote", true);
  const imageMarkEnable = getStatus("imageMark", true);
  const tasklistEnable = getStatus("tasklist", true);
  const mermaidEnable = getStatus("mermaid");
  const presentationEnable = getStatus("presentation");
  const texEnable = getStatus("tex");

  const katexOptions: KatexOptions = {
    macros: {
      // support more symbols
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "\\liiiint": "\\int\\!\\!\\!\\iiint",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "\\iiiint": "\\int\\!\\!\\!\\!\\iiint",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "\\idotsint": "\\int\\!\\cdots\\!\\int",
    },
    ...(typeof options.tex === "object" ? options.tex : {}),
  };

  const revealPlugins =
    typeof options.presentation === "object" &&
    Array.isArray(options.presentation.plugins)
      ? options.presentation.plugins
      : [];

  useSassPalettePlugin(app, { id: "hope" });

  usePlugins(app, options);

  return {
    name: "vuepress-plugin-md-enhance",

    alias: {
      "@ChartJS": chartEnable
        ? path.resolve(__dirname, "../client/components/ChartJS.js")
        : noopModule,
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
      MARKDOWN_ENHANCE_IMAGE_MARK: imageMarkEnable,
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

    extendsMarkdown: (markdownIt): void => {
      if (getStatus("lazyLoad")) markdownIt.use(lazyLoad);
      if (imageMarkEnable) markdownIt.use(imageMark);
      if (getStatus("sup")) markdownIt.use(sup);
      if (getStatus("sub")) markdownIt.use(sub);
      if (footnoteEnable) markdownIt.use(footnote);
      if (flowchartEnable) markdownIt.use(flowchart);
      if (getStatus("mark")) markdownIt.use(mark);
      if (tasklistEnable)
        markdownIt.use(tasklist, [
          typeof options.tasklist === "object" ? options.tasklist : {},
        ]);
      if (mermaidEnable) markdownIt.use(mermaid);
      if (texEnable) markdownIt.use(katex, katexOptions);
      if (presentationEnable) markdownIt.use(presentation);
    },

    onInitialized: (app): void => {
      if (katexOptions.output !== "html") addCustomElement(app, MATHML_TAGS);

      addViteSsrNoExternal(app, [
        "@mr-hope/vuepress-shared",
        "vuepress-plugin-md-enhance",
      ]);
      addViteOptimizeDepsExclude(app, "vuepress-plugin-md-enhance");

      if (chartEnable) {
        addViteOptimizeDepsInclude(app, ["chart.js/auto"]);
        addViteSsrExternal(app, "chart.js");
      }

      if (flowchartEnable) {
        addViteOptimizeDepsInclude(app, ["flowchart.js", "lodash.debounce"]);
        addViteSsrExternal(app, "flowchart.js");
      }

      if (mermaidEnable) {
        addViteOptimizeDepsInclude(app, "mermaid");
        addViteSsrExternal(app, "mermaid");
      }

      if (presentationEnable) {
        addViteOptimizeDepsInclude(app, [
          "reveal.js/dist/reveal.esm.js",
          "reveal.js/plugin/markdown/markdown.esm.js",
          ...revealPlugins.map(
            (plugin) => `reveal.js/plugin/${plugin}/${plugin}.esm.js`
          ),
        ]);
        addViteSsrExternal(app, "reveal.js");
      }
    },

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    ...(demoEnable
      ? {
          clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),
        }
      : {}),
  };
};

export const mdEnhance = (
  options: MarkdownEnhanceOptions | false
): PluginConfig<MarkdownEnhanceOptions> => ["md-enhance", options];
