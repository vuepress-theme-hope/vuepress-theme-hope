import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addCustomElement,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
  addViteSsrNoExternal,
  chainWebpack,
  deepAssign,
  getLocales,
  mergeViteConfig,
} from "vuepress-shared/node";

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
  imageLazyload,
  imageMark,
  imageSize,
  include,
  katex,
  mathjax,
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
  getVuePlaygroundPreset,
  getTSPlaygroundPreset,
  imageTitle,
} from "./markdown-it/index.js";
import { prepareConfigFile, prepareRevealPluginFile } from "./prepare.js";
import { MATHML_TAGS } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { RollupWarning } from "rollup";
import type { KatexOptions } from "katex";
import type { MarkdownEnhanceOptions } from "../shared/index.js";

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

    const getStatus = (
      key: keyof MarkdownEnhanceOptions,
      gfm = false
    ): boolean =>
      key in options
        ? Boolean(options[key])
        : (gfm && "gfm" in options && options.gfm) || false;

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
    const katexEnable = getStatus("katex");
    const mathjaxEnable = getStatus("mathjax");
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
      ...(typeof options.katex === "object" ? options.katex : {}),
    };

    const revealPlugins =
      typeof options.presentation === "object" &&
      Array.isArray(options.presentation.plugins)
        ? options.presentation.plugins
        : [];

    useSassPalettePlugin(app, { id: "hope" });

    let initialized = false;

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

      extendsBundlerOptions: (config: unknown, app): void => {
        const { bundler } = app.options;

        if (bundler.name.endsWith("vite")) {
          const bundlerConfig = <ViteBundlerOptions>config;

          bundlerConfig.viteOptions = mergeViteConfig(
            bundlerConfig.viteOptions || {},
            {
              build: {
                rollupOptions: {
                  onwarn(
                    warning: RollupWarning,
                    warn: (warning: RollupWarning) => void
                  ) {
                    if (warning.message.includes("Use of eval")) return;

                    warn(warning);
                  },
                },
              },
            }
          );
        }

        addViteSsrNoExternal({ app, config }, "vuepress-shared");

        if (katexEnable && katexOptions.output !== "html")
          addCustomElement({ app, config }, MATHML_TAGS);
        else if (mathjaxEnable) addCustomElement({ app, config }, /^mjx-/);

        if (chartEnable) {
          addViteOptimizeDepsExclude({ app, config }, "chart.js/auto/auto.mjs");
          addViteSsrExternal({ app, config }, "chart.js");
        }

        if (echartsEnable) {
          addViteOptimizeDepsExclude({ app, config }, "echarts");
          addViteSsrExternal({ app, config }, "echarts");
        }

        if (flowchartEnable) {
          addViteOptimizeDepsInclude(
            { app, config },
            "flowchart.js/src/flowchart.parse.js"
          );
          addViteSsrExternal({ app, config }, "flowchart.js");
        }

        if (mermaidEnable) {
          addViteOptimizeDepsExclude({ app, config }, "mermaid");
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

          // hide webpack warnings
          chainWebpack({ app, config }, (config) => {
            config.module.set("exprContextCritical", false);
            config.module.set("unknownContextCritical", false);
          });
        }
      },

      extendsMarkdown: (md): void => {
        // syntax
        if (getStatus("gfm")) md.options.linkify = true;
        if (getStatus("attrs"))
          md.use(attrs, typeof options.attrs === "object" ? options.attrs : {});
        if (getStatus("align")) md.use(align);
        if (getStatus("container")) md.use(hint, locales);
        if (getStatus("imageLazyload")) md.use(imageLazyload);
        if (getStatus("imageTitle")) md.use(imageTitle);
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

        // additional functions
        if (
          getStatus("vPre") ||
          // TODO: Remove it in v2 stable
          legacy
        )
          md.use(vPre);
        if (katexEnable) md.use(katex, katexOptions);
        else if (mathjaxEnable)
          md.use(
            mathjax,
            typeof options.mathjax === "object" ? options.mathjax : {}
          );

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
        if (typeof options.playground === "object") {
          const { presets = [], config = {} } = options.playground;

          presets.forEach((preset) => {
            if (preset === "ts")
              md.use(playground, getTSPlaygroundPreset(config.ts || {}));
            else if (preset === "vue")
              md.use(playground, getVuePlaygroundPreset(config.vue || {}));
            else if (typeof preset === "object") md.use(playground, preset);
          });
        }
        if (vuePlaygroundEnable) md.use(vuePlayground);
      },

      extendsPage: (page, app): void => {
        if (shouldCheckLinks && initialized) checkLinks(page, app);
      },

      onInitialized: async (app): Promise<void> => {
        initialized = true;
        if (shouldCheckLinks)
          app.pages.forEach((page) => checkLinks(page, app));

        await prepareRevealPluginFile(app, revealPlugins);
      },

      clientConfigFile: (app) => prepareConfigFile(app, options, legacy),
    };
  };
