import {
  addCustomElement,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
} from "@mr-hope/vuepress-shared";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { logger } from "./utils";

import { checkLinks, getCheckLinksStatus } from "./checkLink";
import {
  CODE_DEMO_DEFAULT_SETTING,
  chart,
  codeTabs,
  container,
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

export const mdEnhancePlugin =
  (options: MarkdownEnhanceOptions): PluginFunction =>
  (app) => {
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
          addViteOptimizeDepsInclude({ app, config }, [
            "flowchart.js",
            "ts-debounce",
          ]);
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

      extendsMarkdown: (markdownIt): void => {
        if (getStatus("lazyLoad")) markdownIt.use(lazyLoad);
        if (imageMarkEnable)
          markdownIt.use(
            imageMark,
            typeof options.imageMark === "object" ? options.imageMark : {}
          );

        if (getStatus("codetabs")) markdownIt.use(codeTabs);
        if (getStatus("tabs")) markdownIt.use(tabs);

        if (getStatus("sup")) markdownIt.use(sup);
        if (getStatus("sub")) markdownIt.use(sub);
        if (footnoteEnable) markdownIt.use(footnote);
        if (flowchartEnable) markdownIt.use(flowchart);
        if (getStatus("mark")) markdownIt.use(mark);
        if (tasklistEnable)
          markdownIt.use(tasklist, [
            typeof options.tasklist === "object" ? options.tasklist : {},
          ]);
        if (getStatus("include"))
          markdownIt.use(include, [
            typeof options.include === "function" ? options.include : undefined,
          ]);
        if (getStatus("align")) {
          ["left", "center", "right", "justify"].forEach((name) =>
            markdownIt.use((md) =>
              container(md, {
                name,
                openRender: () => `<div class="align-${name}">`,
              })
            )
          );
        }
        if (chartEnable) markdownIt.use(chart);
        if (echartsEnable) markdownIt.use(echarts);
        if (getStatus("demo")) {
          markdownIt.use(normalDemo);
          markdownIt.use(vueDemo);
          markdownIt.use(reactDemo);
        }
        if (mermaidEnable) markdownIt.use(mermaid);
        if (texEnable) markdownIt.use(katex, katexOptions);
        if (presentationEnable) markdownIt.use(presentation);
        if (getStatus("vpre")) markdownIt.use(vPre);
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

      clientConfigFile: (app) => prepareConfigFile(app, options),
    };
  };
