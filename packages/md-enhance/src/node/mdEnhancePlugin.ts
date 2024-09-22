import { align } from "@mdit/plugin-align";
import { attrs } from "@mdit/plugin-attrs";
import { footnote } from "@mdit/plugin-footnote";
import type { IncludeEnv } from "@mdit/plugin-include";
import { include } from "@mdit/plugin-include";
import { mark } from "@mdit/plugin-mark";
import { spoiler } from "@mdit/plugin-spoiler";
import { stylize } from "@mdit/plugin-stylize";
import { sub } from "@mdit/plugin-sub";
import { sup } from "@mdit/plugin-sup";
import { tasklist } from "@mdit/plugin-tasklist";
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
import type { MarkdownEnv } from "vuepress/markdown";
import { path } from "vuepress/utils";

import {
  convertOptions,
  legacyCard,
  legacyCodeDemo,
  legacyFlowchart,
  legacyInclude,
} from "./compact/index.js";
import {
  CODE_DEMO_DEFAULT_SETTING,
  chart,
  component,
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
  vPre,
  vueDemo,
  vuePlayground,
} from "./markdown-it/index.js";
import type { MarkdownEnhancePluginOptions } from "./options.js";
import { prepareConfigFile } from "./prepare/index.js";
import { PLUGIN_NAME, isInstalled, logger } from "./utils.js";

export const mdEnhancePlugin =
  (
    options: MarkdownEnhancePluginOptions = { gfm: true },
    legacy = true,
  ): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(
        options as MarkdownEnhancePluginOptions & Record<string, unknown>,
      );

    if (app.env.isDebug) logger.info("Options:", options);

    const source = app.dir.source();

    const getStatus = (
      key: keyof MarkdownEnhancePluginOptions,
      gfm = false,
      pkgs: string[] = [],
    ): boolean => {
      const enabled = Boolean(options?.[key] ?? (gfm && options.gfm) ?? false);
      const pkgInstalled = pkgs.every((pkg) =>
        isInstalled(pkg, Boolean(options[key])),
      );

      return enabled && pkgInstalled;
    };

    const status = {
      breaks: getStatus("breaks", true),
      chart: getStatus("chart", false, ["chart.js"]),
      echarts: getStatus("echarts", false, ["echarts"]),
      flowchart: getStatus("flowchart", false, ["flowchart.ts"]),
      footnote: getStatus("footnote", true),
      linkify: getStatus("linkify", true),
      mark: getStatus("mark"),
      markmap: getStatus("markmap", false, [
        "markmap-lib",
        "markmap-toolbar",
        "markmap-view",
      ]),
      mermaid: getStatus("mermaid", false, ["mermaid"]),
      obsidianImgSize: getStatus("obsidianImgSize"),
      tasklist: getStatus("tasklist", true),
      kotlinPlayground: getStatus("kotlinPlayground", false, [
        "kotlin-playground",
      ]),
      sandpack: getStatus("sandpack", false, ["sandpack-vue3"]),
      vuePlayground: getStatus("vuePlayground", false, ["@vue/repl"]),
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

        if (status.chart) {
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
        // Behavior
        if (status.breaks) md.options.breaks = true;
        if (status.linkify) md.options.linkify = true;

        // GFM syntax
        if (status.footnote) md.use(footnote);
        if (status.tasklist)
          md.use(tasklist, [
            isPlainObject(options.tasklist) ? options.tasklist : {},
          ]);
        if (options.attrs)
          md.use(attrs, isPlainObject(options.attrs) ? options.attrs : {});
        if (options.align) md.use(align);
        if (options.component) md.use(component);
        if (options.mark) md.use(mark);
        if (options.spoiler) md.use(spoiler);
        if (options.sup) md.use(sup);
        if (options.sub) md.use(sub);

        // TODO: Remove this in v2 stable
        // @ts-expect-error: card does not exist
        if (options.card && legacy) md.use(legacyCard);

        // Additional functions
        if (
          options.vPre ??
          // TODO: Remove this in v2 stable
          legacy
        )
          md.use(vPre);

        if (options.include) {
          md.use(include, {
            currentPath: (env: MarkdownEnv) => env.filePath,
            ...(isPlainObject(options.include) ? options.include : {}),
          });

          if (legacy)
            md.use(legacyInclude, {
              currentPath: (env: MarkdownEnv) => env.filePath,
            });
        }

        if (options.stylize)
          md.use(stylize, {
            config: options.stylize,
            localConfigGetter: (env: MarkdownEnv) =>
              env.frontmatter?.["stylize"] || null,
          });

        if (status.flowchart) {
          md.use(flowchart);
          // TODO: Remove this in v2 stable
          if (legacy) md.use(legacyFlowchart);
        }
        if (status.chart) md.use(chart);
        if (status.echarts) md.use(echarts);
        if (isArray(options.plantuml)) md.use(plantuml, options);
        else if (options.plantuml) md.use(plantuml);
        if (options.demo) {
          md.use(mdDemo);
          md.use(normalDemo);
          md.use(vueDemo);
          md.use(reactDemo);
          // TODO: Remove this in v2 stable
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

      extendsPage: (page): void => {
        const { markdownEnv, frontmatter, filePathRelative } = page;

        if (options.include) {
          const { includedFiles = [] } = markdownEnv as IncludeEnv;

          // mark included files as page deps
          page.deps.push(...includedFiles);

          // add included files as git deps
          ((frontmatter["gitInclude"] as string[]) ??= []).push(
            ...includedFiles.map((file) =>
              path.relative(
                path.resolve(source, filePathRelative, ".."),
                path.resolve(source, filePathRelative, file),
              ),
            ),
          );
        }
      },

      clientConfigFile: (app) =>
        prepareConfigFile(app, options, status, legacy),
    };
  };
