import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addCustomElement,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
} from "vuepress-shared";

import { logger } from "./utils";

import { checkLinks, getCheckLinksStatus } from "./checkLink";
import { covertOptions, legacyCodeDemo, legacyCodeGroup } from "./compact";
import {
  CODE_DEMO_DEFAULT_SETTING,
  align,
  chart,
  codeTabs,
  echarts,
  flowchart,
  footnote,
  imageMark,
  include,
  katex,
  lazyLoad,
  mark,
  mermaid,
  normalDemo,
  presentation,
  reactDemo,
  stylize,
  sub,
  sup,
  tabs,
  tasklist,
  vPre,
  vueDemo,
} from "./markdown-it";
import { prepareConfigFile, prepareRevealPluginFile } from "./prepare";
import { usePlugins } from "./usePlugins";
import { MATHML_TAGS } from "./utils";

import type { PluginFunction } from "@vuepress/core";
import type { KatexOptions } from "katex";
import type { MarkdownEnhanceOptions } from "../shared";
import { legacyFlowchart } from "./compact/flowchart";

export const mdEnhancePlugin =
  (
    options: MarkdownEnhanceOptions = { gfm: true },
    legacy = false
  ): PluginFunction =>
  (app) => {
    // TODO: Remove it in v2 stable
    if (legacy)
      covertOptions(
        options as MarkdownEnhanceOptions & Record<string, unknown>
      );
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const getStatus = (
      key: keyof MarkdownEnhanceOptions,
      gfm = false
    ): boolean =>
      key in options
        ? Boolean(options[key])
        : gfm && "gfm" in options
        ? Boolean(options.gfm)
        : options.enableAll || false;

    const chartEnable = getStatus("chart");
    const echartsEnable = getStatus("echarts");
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
          ...CODE_DEMO_DEFAULT_SETTING,
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

      extendsBundlerOptions: (config: unknown, app): void => {
        if (katexOptions.output !== "html")
          addCustomElement({ app, config }, MATHML_TAGS);

        if (chartEnable) {
          addViteOptimizeDepsInclude({ app, config }, "chart.js/auto");
          addViteSsrExternal({ app, config }, "chart.js");
        }

        if (echartsEnable) {
          addViteOptimizeDepsInclude({ app, config }, "echarts");
          addViteSsrExternal({ app, config }, "echarts");
        }

        if (flowchartEnable) {
          addViteOptimizeDepsInclude({ app, config }, "flowchart.js");
          addViteSsrExternal({ app, config }, "flowchart.js");
        }

        if (mermaidEnable) {
          addViteOptimizeDepsInclude({ app, config }, "mermaid");
          addViteSsrExternal({ app, config }, "mermaid");
        }

        if (presentationEnable) {
          addViteOptimizeDepsExclude({ app, config }, [
            "reveal.js/dist/reveal.esm.js",
            "reveal.js/plugin/markdown/markdown.esm.js",
            ...revealPlugins.map(
              (plugin) => `reveal.js/plugin/${plugin}/${plugin}.esm.js`
            ),
          ]);
          addViteSsrExternal({ app, config }, "reveal.js");
        }
      },

      extendsMarkdown: (md): void => {
        if (getStatus("gfm")) md.options.linkify = true;

        if (getStatus("align")) md.use(align);
        if (getStatus("lazyLoad")) md.use(lazyLoad);
        if (imageMarkEnable)
          md.use(
            imageMark,
            typeof options.imageMark === "object" ? options.imageMark : {}
          );

        if (getStatus("codetabs")) {
          md.use(codeTabs);
          // TODO: Remove it in v2 stable
          if (legacy) md.use(legacyCodeGroup);
        }
        if (getStatus("tabs")) md.use(tabs);

        if (getStatus("sup")) md.use(sup);
        if (getStatus("sub")) md.use(sub);
        if (footnoteEnable) md.use(footnote);
        if (flowchartEnable) {
          md.use(flowchart);
          // TODO: Remove it in v2 stable
          md.use(legacyFlowchart);
        }
        if (getStatus("mark")) md.use(mark);
        if (tasklistEnable)
          md.use(tasklist, [
            typeof options.tasklist === "object" ? options.tasklist : {},
          ]);
        if (getStatus("include"))
          md.use(include, [
            typeof options.include === "function" ? options.include : undefined,
          ]);

        if (chartEnable) md.use(chart);
        if (echartsEnable) md.use(echarts);
        if (getStatus("demo")) {
          md.use(normalDemo);
          md.use(vueDemo);
          md.use(reactDemo);
          // TODO: Remove it in v2 stable
          if (legacy) md.use(legacyCodeDemo);
        }
        if (mermaidEnable) md.use(mermaid);
        if (texEnable) md.use(katex, katexOptions);
        if (presentationEnable) md.use(presentation);
        if (
          getStatus("vpre") ||
          // TODO: Remove it in v2 stable
          legacy
        )
          md.use(vPre);
        if (getStatus("stylize")) md.use(stylize, options.stylize);
      },

      extendsPage: (page, app): void => {
        // app already initailzed
        if (shouldCheckLinks && app.pages) {
          checkLinks(page, app);
        }
      },

      onInitialized: async (app): Promise<void> => {
        if (shouldCheckLinks)
          app.pages.forEach((page) => checkLinks(page, app));

        await prepareRevealPluginFile(app, revealPlugins);
      },

      clientConfigFile: (app) => prepareConfigFile(app, options, legacy),
    };
  };
