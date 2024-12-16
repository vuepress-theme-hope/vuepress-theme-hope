import {
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteOptimizeDepsNeedsInterop,
  addViteSsrExternal,
  addViteSsrNoExternal,
  chainWebpack,
  isArray,
  isPlainObject,
} from "@vuepress/helper";
import { useSassPalettePlugin } from "@vuepress/plugin-sass-palette";
import type { PluginFunction } from "vuepress/core";

import {
  chart,
  convertOptions,
  legacyCodeDemo,
  legacyFlowchart,
} from "./compact/index.js";
import {
  CODE_DEMO_DEFAULT_SETTING,
  chartjs,
  echarts,
  flowchart,
  getTSPlaygroundPreset,
  getUnoPlaygroundPreset,
  getVuePlaygroundPreset,
  kotlinPlayground,
  markmap,
  mdDemo,
  mermaid,
  normalDemo,
  plantuml,
  playground,
  reactDemo,
  sandpack,
  vueDemo,
  vuePlayground,
} from "./markdown-it/index.js";
import type { MarkdownEnhancePluginOptions } from "./options.js";
import { prepareConfigFile } from "./prepare/index.js";
import { PLUGIN_NAME, isInstalled, logger } from "./utils.js";

export const mdEnhancePlugin =
  (options: MarkdownEnhancePluginOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      convertOptions(
        options as MarkdownEnhancePluginOptions & Record<string, unknown>,
      );

    if (app.env.isDebug) logger.info("Options:", options);

    const getStatus = (
      key: keyof MarkdownEnhancePluginOptions,
      pkgs: string[] = [],
    ): boolean =>
      Boolean(options[key]) &&
      pkgs.every((pkg) => isInstalled(pkg, Boolean(options[key])));

    const status = {
      chartjs: getStatus("chartjs", ["chart.js"]),
      echarts: getStatus("echarts", ["echarts"]),
      flowchart: getStatus("flowchart", ["flowchart.ts"]),
      mark: getStatus("mark"),
      markmap: getStatus("markmap", [
        "markmap-lib",
        "markmap-toolbar",
        "markmap-view",
      ]),
      mermaid: getStatus("mermaid", ["mermaid"]),
      kotlinPlayground: getStatus("kotlinPlayground", ["kotlin-playground"]),
      sandpack: getStatus("sandpack", ["sandpack-vue3"]),
      vuePlayground: getStatus("vuePlayground", ["@vue/repl"]),
    };

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        MARKDOWN_ENHANCE_DELAY: options.delay ?? 800,
        CODE_DEMO_OPTIONS: {
          ...CODE_DEMO_DEFAULT_SETTING,
          ...(isPlainObject(options.demo) ? options.demo : {}),
        },
        VUE_PLAYGROUND_MONACO:
          isPlainObject(options.vuePlayground) &&
          options.vuePlayground.editor === "monaco",
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, [
          "@vuepress/helper",
          "fflate",
          "vuepress-shared",
        ]);

        if (status.chartjs) {
          addViteOptimizeDepsExclude(
            bundlerOptions,
            app,
            "chart.js/auto/auto.mjs",
          );
          addViteSsrExternal(bundlerOptions, app, "chart.js");
        }

        if (status.echarts) {
          addViteOptimizeDepsExclude(bundlerOptions, app, "echarts");
          addViteSsrExternal(bundlerOptions, app, "echarts");
        }

        if (status.flowchart) {
          addViteOptimizeDepsExclude(bundlerOptions, app, "flowchart.ts");
          addViteSsrExternal(bundlerOptions, app, "flowchart.ts");
        }

        if (status.markmap) {
          addViteOptimizeDepsInclude(bundlerOptions, app, [
            "markmap-lib",
            "markmap-toolbar",
            "markmap-view",
          ]);
          addViteSsrExternal(bundlerOptions, app, [
            "markmap-lib",
            "markmap-toolbar",
            "markmap-view",
          ]);
        }

        if (status.mermaid) {
          addViteOptimizeDepsExclude(
            bundlerOptions,
            app,
            "mermaid/dist/mermaid.esm.min.mjs",
          );
          addViteSsrExternal(bundlerOptions, app, "mermaid");
        }

        if (status.kotlinPlayground) {
          addViteOptimizeDepsInclude(bundlerOptions, app, "kotlin-playground");
          addViteOptimizeDepsNeedsInterop(
            bundlerOptions,
            app,
            "kotlin-playground",
          );
          addViteSsrExternal(bundlerOptions, app, "kotlin-playground");
        }

        if (status.sandpack) {
          addViteOptimizeDepsInclude(bundlerOptions, app, "sandpack-vue3");
          addViteSsrExternal(bundlerOptions, app, "sandpack-vue3");
        }

        if (status.vuePlayground) {
          addViteOptimizeDepsInclude(bundlerOptions, app, "@vue/repl");
          addViteSsrExternal(bundlerOptions, app, "@vue/repl");

          // Hide webpack warnings
          chainWebpack(bundlerOptions, app, (config) => {
            // TODO: Probably need to fix upstream
            config.resolve.set("conditionNames", [
              "browser",
              "import",
              "module",
            ]);
            config.module.set("exprContextCritical", false);
            config.module.set("unknownContextCritical", false);
          });
        }
      },

      extendsMarkdown: (md): void => {
        if (status.flowchart) {
          md.use(flowchart);
          // TODO: Remove this in v2 stable
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          if (legacy) md.use(legacyFlowchart);
        }
        if (status.chartjs) {
          md.use(chartjs);
          if (legacy) md.use(chart);
        }
        if (status.echarts) md.use(echarts);
        if (isArray(options.plantuml)) md.use(plantuml, options.plantuml);
        else if (options.plantuml) md.use(plantuml);
        if (options.demo) {
          md.use(mdDemo);
          md.use(normalDemo);
          md.use(vueDemo);
          md.use(reactDemo);
          // TODO: Remove this in v2 stable
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          if (legacy) md.use(legacyCodeDemo);
        }
        if (status.markmap) md.use(markmap);
        if (status.mermaid) md.use(mermaid);
        if (isPlainObject(options.playground)) {
          const { presets = [], config = {} } = options.playground;

          presets.forEach((preset) => {
            if (preset === "ts")
              md.use(playground, getTSPlaygroundPreset(config.ts ?? {}));
            else if (preset === "vue")
              md.use(playground, getVuePlaygroundPreset(config.vue ?? {}));
            else if (preset === "unocss")
              md.use(playground, getUnoPlaygroundPreset(config.unocss ?? {}));
            else if (isPlainObject(preset)) md.use(playground, preset);
          });
        }
        if (status.kotlinPlayground) md.use(kotlinPlayground);
        if (status.vuePlayground) md.use(vuePlayground);
        if (status.sandpack) md.use(sandpack);
      },

      clientConfigFile: (app) => prepareConfigFile(app, options, status),
    };
  };
