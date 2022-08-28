import { getDirname, path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addCustomElement,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
  deepAssign,
  getLocales,
} from "vuepress-shared";

import { logger } from "./utils.js";

import { checkLinks, getCheckLinksStatus } from "./checkLink.js";
import {
  convertOptions,
  legacyCodeDemo,
  legacyCodeGroup,
  legacyFlowchart,
} from "./compact/index.js";
import { markdownEnhanceLocales } from "./locales.js";
import {
  CODE_DEMO_DEFAULT_SETTING,
  DEFAULT_VUE_PLAYGROUND_OPTIONS,
  align,
  attrs,
  chart,
  codeTabs,
  echarts,
  flowchart,
  footnote,
  hint,
  imageMark,
  imageSize,
  include,
  katex,
  lazyLoad,
  mark,
  mermaid,
  normalDemo,
  playground,
  presentation,
  reactDemo,
  stylize,
  sub,
  sup,
  tabs,
  tasklist,
  vPre,
  vueDemo,
  vuePlayground,
} from "./markdown-it/index.js";
import { prepareConfigFile, prepareRevealPluginFile } from "./prepare.js";
import { MATHML_TAGS } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";
import type { KatexOptions } from "katex";
import type { MarkdownEnhanceOptions } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const mdEnhancePlugin =
  (
    options: MarkdownEnhanceOptions = { gfm: true },
    legacy = false
  ): PluginFunction =>
  (app) => {
    // TODO: Remove it in v2 stable
    if (legacy)
      convertOptions(
        options as MarkdownEnhanceOptions & Record<string, unknown>
      );
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    if (options.enableAll)
      logger.error(
        'Do not use "enableAll" option in production, this option is only built for demo!\nTo avoid including large chunks of some features, enable features you are using ONLY.'
      );

    const getStatus = (
      key: keyof MarkdownEnhanceOptions,
      gfm = false
    ): boolean =>
      key in options
        ? Boolean(options[key])
        : gfm && "gfm" in options
        ? Boolean(options.gfm)
        : options.enableAll || false;

    const locales = getLocales({
      app,
      name: "md-enhance",
      default: markdownEnhanceLocales,
      config: options.locales,
    });

    const chartEnable = getStatus("chart");
    const echartsEnable = getStatus("echarts");
    const flowchartEnable = getStatus("flowchart");
    const footnoteEnable = getStatus("footnote", true);
    const imageMarkEnable = getStatus("imageMark", true);
    const tasklistEnable = getStatus("tasklist", true);
    const mermaidEnable = getStatus("mermaid");
    const presentationEnable = getStatus("presentation");
    const texEnable = getStatus("tex");
    const vuePlaygroundEnable = getStatus("vuePlayground");

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
        VUE_PLAYGROUND_OPTIONS:
          typeof options.vuePlayground === "object"
            ? deepAssign(
                {},
                DEFAULT_VUE_PLAYGROUND_OPTIONS,
                options.vuePlayground
              )
            : DEFAULT_VUE_PLAYGROUND_OPTIONS,
      }),

      alias: {
        // FIXME:
        // this is a workaround for https://github.com/vitejs/vite/issues/7621
        // Remove this when issue is fixed
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "vuepress-plugin-md-enhance/SlidePage": path.resolve(
          __dirname,
          "../client/SlidePage.js"
        ),
      },

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
          addViteOptimizeDepsInclude(
            { app, config },
            "flowchart.js/src/flowchart.parse"
          );
          addViteSsrExternal(
            { app, config },
            "flowchart.js/src/flowchart.parse"
          );
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

        if (vuePlaygroundEnable) {
          addViteOptimizeDepsInclude({ app, config }, "@vue/repl");
          addViteSsrExternal({ app, config }, "@vue/repl");
        }
      },

      extendsMarkdown: (md): void => {
        // syntax
        if (getStatus("gfm")) md.options.linkify = true;
        if (getStatus("attrs"))
          md.use(attrs, typeof options.attrs === "object" ? options.attrs : {});
        if (getStatus("align")) md.use(align);
        if (getStatus("container")) md.use(hint, locales);
        if (getStatus("lazyLoad")) md.use(lazyLoad);
        if (imageMarkEnable)
          md.use(
            imageMark,
            typeof options.imageMark === "object" ? options.imageMark : {}
          );
        if (getStatus("imageSize")) md.use(imageSize);
        if (getStatus("sup")) md.use(sup);
        if (getStatus("sub")) md.use(sub);
        if (footnoteEnable) md.use(footnote);
        if (getStatus("mark")) md.use(mark);
        if (tasklistEnable)
          md.use(tasklist, [
            typeof options.tasklist === "object" ? options.tasklist : {},
          ]);

        // addtional functions
        if (
          getStatus("vpre") ||
          // TODO: Remove it in v2 stable
          legacy
        )
          md.use(vPre);
        if (texEnable) md.use(katex, katexOptions);
        if (getStatus("include"))
          md.use(
            include,
            typeof options.include === "object" ? options.include : {}
          );
        if (getStatus("stylize")) md.use(stylize, options.stylize);

        // features
        if (getStatus("codetabs")) {
          md.use(codeTabs);
          // TODO: Remove it in v2 stable
          if (legacy) md.use(legacyCodeGroup);
        }
        if (getStatus("tabs")) md.use(tabs);
        if (flowchartEnable) {
          md.use(flowchart);
          // TODO: Remove it in v2 stable
          if (legacy) md.use(legacyFlowchart);
        }
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
        if (presentationEnable) md.use(presentation);
        if (Array.isArray(options.playground))
          options.playground.forEach((item) => md.use(playground, item));
        else if (typeof options.playground === "object")
          md.use(playground, options.playground);
        if (vuePlaygroundEnable) md.use(vuePlayground);
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
