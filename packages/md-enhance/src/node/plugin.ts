import {
  addCustomElement,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
  addViteSsrNoExternal,
} from "@mr-hope/vuepress-shared";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { checkLinks, getCheckLinksStatus } from "./checkLink";
import {
  codeDemoDefaultSetting,
  flowchart,
  footnote,
  imageMark,
  mdImport,
  katex,
  lazyLoad,
  mark,
  mermaid,
  presentation,
  sub,
  sup,
  tasklist,
} from "./markdown-it";
import { prepareAppEnhanceFile, prepareRevealPluginFile } from "./prepare";
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

  const chartEnable = getStatus("chart");
  const flowchartEnable = getStatus("flowchart");
  const footnoteEnable = getStatus("footnote", true);
  const imageMarkEnable = getStatus("imageMark", true);
  const tasklistEnable = getStatus("tasklist", true);
  const mermaidEnable = getStatus("mermaid");
  const presentationEnable = getStatus("presentation");
  const texEnable = getStatus("tex");

  const shouldCheckLinks = getCheckLinksStatus(app, options);

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

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_DELAY: options.delay || 500,
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
      if (getStatus("mdImport"))
        markdownIt.use(mdImport, [
          typeof options.mdImport === "function" ? options.mdImport : undefined,
        ]);
      if (mermaidEnable) markdownIt.use(mermaid);
      if (texEnable) markdownIt.use(katex, katexOptions);
      if (presentationEnable) markdownIt.use(presentation);
    },

    extendsPage: (page, app): void => {
      // app already initailzed
      if (shouldCheckLinks && app.pages) {
        checkLinks(page, app);
      }
    },

    onInitialized: async (app): Promise<void> => {
      if (shouldCheckLinks) app.pages.forEach((page) => checkLinks(page, app));

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

      await Promise.all([
        prepareAppEnhanceFile(app, options),
        prepareRevealPluginFile(app, revealPlugins),
      ]);
    },

    clientAppEnhanceFiles: app.dir.temp(`md-enhance/appEnhance.js`),
  };
};

export const mdEnhance = (
  options: MarkdownEnhanceOptions | false
): PluginConfig<MarkdownEnhanceOptions> => ["md-enhance", options];
