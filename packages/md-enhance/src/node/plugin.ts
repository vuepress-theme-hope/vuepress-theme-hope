import { align } from "@mdit/plugin-align";
import { attrs } from "@mdit/plugin-attrs";
import { figure } from "@mdit/plugin-figure";
import { footnote } from "@mdit/plugin-footnote";
import { imgLazyload } from "@mdit/plugin-img-lazyload";
import { imgMark } from "@mdit/plugin-img-mark";
import { imgSize, obsidianImageSize } from "@mdit/plugin-img-size";
import { include } from "@mdit/plugin-include";
import { katex } from "@mdit/plugin-katex";
import { mark } from "@mdit/plugin-mark";
import { createMathjaxInstance, mathjax } from "@mdit/plugin-mathjax";
import { stylize } from "@mdit/plugin-stylize";
import { sub } from "@mdit/plugin-sub";
import { sup } from "@mdit/plugin-sup";
import { tasklist } from "@mdit/plugin-tasklist";
import type { PluginFunction } from "@vuepress/core";
import type { MarkdownEnv } from "@vuepress/markdown";
import { colors } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  MATHML_TAGS,
  addCustomElement,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteOptimizeDepsNeedsInterop,
  addViteSsrExternal,
  addViteSsrNoExternal,
  chainWebpack,
  checkVersion,
  detectPackageManager,
  getBundlerName,
  getLocales,
  isPlainObject,
  noopModule,
} from "vuepress-shared/node";

import {
  convertOptions,
  legacyCard,
  legacyCodeDemo,
  legacyCodeGroup,
  legacyFlowchart,
  legacyHint,
  legacyInclude,
} from "./compact/index.js";
import { getLinksCheckStatus, linksCheck } from "./linksCheck.js";
import { markdownEnhanceLocales } from "./locales.js";
import {
  CODE_DEMO_DEFAULT_SETTING,
  alert,
  chart,
  codeTabs,
  component,
  echarts,
  flowchart,
  getTSPlaygroundPreset,
  getUnoPlaygroundPreset,
  getVuePlaygroundPreset,
  hint,
  kotlinPlayground,
  markmap,
  mdDemo,
  mermaid,
  normalDemo,
  playground,
  reactDemo,
  revealJs,
  tabs,
  vPre,
  vueDemo,
  vuePlayground,
} from "./markdown-it/index.js";
import type { MarkdownEnhanceOptions } from "./options.js";
import {
  prepareConfigFile,
  prepareMathjaxStyleFile,
  prepareRevealJsPluginFile,
  prepareRevealJsStyleFile,
} from "./prepare/index.js";
import type { KatexOptions } from "./typings/index.js";
import { PLUGIN_NAME, isInstalled, logger } from "./utils.js";

export const mdEnhancePlugin =
  (
    options: MarkdownEnhanceOptions = { gfm: true },
    legacy = true,
  ): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(
        options as MarkdownEnhanceOptions & Record<string, unknown>,
      );

    checkVersion(app, PLUGIN_NAME, "2.0.0-rc.0");

    if (app.env.isDebug) logger.info("Options:", options);

    const getStatus = (
      key: keyof MarkdownEnhanceOptions,
      gfm = false,
      pkgs: string[] = [],
    ): boolean => {
      const enabled =
        key in options ? Boolean(options[key]) : (gfm && options.gfm) || false;
      const pkgInstalled = pkgs.every((pkg) =>
        isInstalled(pkg, Boolean(options[key])),
      );

      return enabled && pkgInstalled;
    };

    const locales = getLocales({
      app,
      name: PLUGIN_NAME,
      default: markdownEnhanceLocales,
      config: options.locales,
    });

    const status = {
      alert: getStatus("alert", true),
      breaks: getStatus("breaks", true),
      chart: getStatus("chart", false, ["chart.js"]),
      echarts: getStatus("echarts", false, ["echarts"]),
      flowchart: getStatus("flowchart", false, ["flowchart.ts"]),
      footnote: getStatus("footnote", true),
      imgLazyload: getStatus("imgLazyload"),
      imgMark: getStatus("imgMark", true),
      linkify: getStatus("linkify", true),
      katex: getStatus("katex", false, ["katex"]),
      mathjax: !options.katex && getStatus("mathjax", true, ["mathjax-full"]),
      mark: getStatus("mark"),
      markmap: getStatus("markmap", false, [
        "markmap-lib",
        "markmap-toolbar",
        "markmap-view",
      ]),
      mermaid: getStatus("mermaid", false, ["mermaid"]),
      obsidianImgSize: getStatus("obsidianImgSize"),
      revealJs: getStatus("revealJs", false, ["reveal.js"]),
      tasklist: getStatus("tasklist", true),
      kotlinPlayground: getStatus("kotlinPlayground", false, [
        "kotlin-playground",
      ]),
      vuePlayground: getStatus("vuePlayground", false, ["@vue/repl"]),
    };

    const { enabled: enableLinksCheck, isIgnoreLink } = getLinksCheckStatus(
      app,
      options,
    );

    const katexOptions: KatexOptions<MarkdownEnv> = {
      mathFence: options.gfm ?? false,
      macros: {
        // support more symbols
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "\\liiiint": "\\int\\!\\!\\!\\iiint",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "\\iiiint": "\\int\\!\\!\\!\\!\\iiint",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "\\idotsint": "\\int\\!\\cdots\\!\\int",
      },
      logger: (errorCode, errorMsg, token, { filePathRelative }) => {
        // ignore this error
        if (errorCode === "newLineInDisplayMode") return;

        if (errorCode === "unicodeTextInMathMode")
          logger.warn(
            `Found unicode character ${token.text} inside tex${
              filePathRelative ? ` in ${colors.cyan(filePathRelative)}` : ""
            }. You should use ${colors.magenta(`\\text{${token.text}`)}`,
          );
        else
          logger.warn(
            `${errorMsg}.${
              filePathRelative
                ? `\nFound in ${colors.cyan(filePathRelative)}`
                : ""
            }`,
          );
      },
      ...(isPlainObject(options.katex) ? options.katex : {}),
      vPre: true,
    };

    const mathjaxInstance = status.mathjax
      ? createMathjaxInstance({
          mathFence: options.gfm ?? false,
          ...(isPlainObject(options.mathjax) ? options.mathjax : {}),
          vPre: true,
        })
      : null;

    const revealJsOptions = isPlainObject(options.revealJs)
      ? options.revealJs
      : {};

    useSassPalettePlugin(app, { id: "hope" });

    let isAppInitialized = false;

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        MARKDOWN_ENHANCE_DELAY: options.delay || 800,
        CODE_DEMO_OPTIONS: {
          ...CODE_DEMO_DEFAULT_SETTING,
          ...(isPlainObject(options.demo) ? options.demo : {}),
        },
      }),

      alias: (app): Record<string, string> => ({
        // we can not let vite force optimize deps with pnpm, so we use a full bundle in devServer here
        "@mermaid": status.mermaid
          ? app.env.isDev &&
            detectPackageManager() === "pnpm" &&
            getBundlerName(app) === "vite"
            ? "mermaid/dist/mermaid.esm.min.mjs"
            : "mermaid"
          : noopModule,
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, [
          "fflate",
          "vuepress-shared",
        ]);

        if (status.katex && katexOptions.output !== "html") {
          addCustomElement(bundlerOptions, app, MATHML_TAGS);
        } else if (status.mathjax) {
          addCustomElement(bundlerOptions, app, /^mjx-/);
          if (mathjaxInstance?.documentOptions.enableAssistiveMml)
            addCustomElement(bundlerOptions, app, MATHML_TAGS);
        }
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
          addViteOptimizeDepsInclude(bundlerOptions, app, "mermaid");
          addViteSsrExternal(bundlerOptions, app, "mermaid");
        }

        if (status.revealJs) {
          addViteOptimizeDepsExclude(bundlerOptions, app, [
            "reveal.js/dist/reveal.esm.js",
            "reveal.js/plugin/markdown/markdown.esm.js",
            ...(revealJsOptions?.plugins || []).map(
              (plugin) => `reveal.js/plugin/${plugin}/${plugin}.esm.js`,
            ),
          ]);

          addViteSsrExternal(bundlerOptions, app, "reveal.js");
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

        if (status.vuePlayground) {
          addViteOptimizeDepsInclude(bundlerOptions, app, "@vue/repl");
          addViteSsrExternal(bundlerOptions, app, "@vue/repl");

          // hide webpack warnings
          chainWebpack(bundlerOptions, app, (config) => {
            config.module.set("exprContextCritical", false);
            config.module.set("unknownContextCritical", false);
          });
        }
      },

      extendsMarkdown: (md): void => {
        // behavior
        if (status.breaks) md.options.breaks = true;
        if (status.linkify) md.options.linkify = true;

        // GFM syntax
        if (status.alert) md.use(alert, locales);
        if (status.footnote) md.use(footnote);
        if (status.tasklist)
          md.use(tasklist, [
            isPlainObject(options.tasklist) ? options.tasklist : {},
          ]);
        if (status.imgMark)
          md.use(
            imgMark,
            isPlainObject(options.imgMark) ? options.imgMark : {},
          );

        if (options.attrs)
          md.use(attrs, isPlainObject(options.attrs) ? options.attrs : {});
        if (options.align) md.use(align);
        if (options.component) md.use(component);
        if (options.figure) md.use(figure);
        if (options.hint) {
          md.use(hint, locales);
          if (legacy) md.use(legacyHint, locales);
        }
        if (options.imgLazyload) md.use(imgLazyload);
        if (options.imgSize) md.use(imgSize);
        if (options.mark) md.use(mark);
        if (options.obsidianImgSize) md.use(obsidianImageSize);
        if (options.sup) md.use(sup);
        if (options.sub) md.use(sub);

        // TODO: Remove this in v2 stable
        // @ts-expect-error
        if (options.card && legacy) md.use(legacyCard);

        // additional functions
        if (
          options.vPre ||
          // TODO: Remove this in v2 stable
          legacy
        )
          md.use(vPre);

        if (status.katex) {
          md.use(katex, katexOptions);
        } else if (status.mathjax) {
          md.use(mathjax, mathjaxInstance!);
          // reset after each render
          md.use((md) => {
            const originalRender = md.render.bind(md);

            md.render = (src: string, env: unknown): string => {
              const result = originalRender(src, env);

              mathjaxInstance!.reset();

              return result;
            };
          });
        }

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

        // features
        if (options.codetabs) {
          md.use(codeTabs);
          // TODO: Remove this in v2 stable
          if (legacy) md.use(legacyCodeGroup);
        }
        if (options.tabs) md.use(tabs);
        if (status.flowchart) {
          md.use(flowchart);
          // TODO: Remove this in v2 stable
          if (legacy) md.use(legacyFlowchart);
        }
        if (status.chart) md.use(chart);
        if (status.echarts) md.use(echarts);
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
        if (status.revealJs) md.use(revealJs);
        if (isPlainObject(options.playground)) {
          const { presets = [], config = {} } = options.playground;

          presets.forEach((preset) => {
            if (preset === "ts")
              md.use(playground, getTSPlaygroundPreset(config.ts || {}));
            else if (preset === "vue")
              md.use(playground, getVuePlaygroundPreset(config.vue || {}));
            else if (preset === "unocss")
              md.use(playground, getUnoPlaygroundPreset(config.unocss || {}));
            else if (isPlainObject(preset)) md.use(playground, preset);
          });
        }
        if (status.kotlinPlayground) md.use(kotlinPlayground);
        if (status.vuePlayground) md.use(vuePlayground);
      },

      extendsPage: (page, app): void => {
        if (enableLinksCheck && isAppInitialized)
          linksCheck(page, app, isIgnoreLink);

        if (options.include)
          page.deps.push(...(<string[]>page.markdownEnv["includedFiles"]));
      },

      onInitialized: (app): void => {
        isAppInitialized = true;
        if (enableLinksCheck)
          app.pages.forEach((page) => linksCheck(page, app, isIgnoreLink));
      },

      onPrepared: async (app): Promise<void> => {
        const promises = [];

        if (status.mathjax)
          promises.push(prepareMathjaxStyleFile(app, mathjaxInstance!));

        if (status.revealJs)
          promises.push(
            prepareRevealJsPluginFile(app, revealJsOptions.plugins ?? []),
            prepareRevealJsStyleFile(app, revealJsOptions?.themes),
          );

        await Promise.all(promises);
      },

      clientConfigFile: (app) =>
        prepareConfigFile(app, options, status, legacy),
    };
  };
