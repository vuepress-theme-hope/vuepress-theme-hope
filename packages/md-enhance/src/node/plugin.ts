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

    const enableChart = getStatus("chart", false, ["chart.js"]);
    const enableEcharts = getStatus("echarts", false, ["echarts"]);
    const enableFlowchart = getStatus("flowchart", false, ["flowchart.ts"]);
    const enableFootnote = getStatus("footnote", true);
    const enableImgMark = getStatus("imgMark", true);
    const enableInclude = getStatus("include");
    const enableTasklist = getStatus("tasklist", true);
    const enableMarkmap = getStatus("markmap", false, [
      "markmap-lib",
      "markmap-view",
    ]);
    const enableMermaid = getStatus("mermaid", false, ["mermaid"]);
    const enableRevealJs = getStatus("revealJs", false, ["reveal.js"]);
    const enableKatex = getStatus("katex", false, ["katex"]);
    const enableMathjax =
      !options.katex && getStatus("mathjax", true, ["mathjax-full"]);
    const enableVuePlayground = getStatus("vuePlayground", false, [
      "@vue/repl",
    ]);

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
            }. You should use ${colors.magenta(`\\text{${token.text}}`)}`,
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
    };

    const mathjaxInstance = enableMathjax
      ? createMathjaxInstance({
          mathFence: options.gfm ?? false,
          ...(isPlainObject(options.mathjax) ? options.mathjax : {}),
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
        "@mermaid": enableMermaid
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

        if (enableKatex && katexOptions.output !== "html") {
          addCustomElement(bundlerOptions, app, MATHML_TAGS);
        } else if (enableMathjax) {
          addCustomElement(bundlerOptions, app, /^mjx-/);
          if (mathjaxInstance?.documentOptions.enableAssistiveMml)
            addCustomElement(bundlerOptions, app, MATHML_TAGS);
        }
        if (enableChart) {
          addViteOptimizeDepsExclude(
            bundlerOptions,
            app,
            "chart.js/auto/auto.mjs",
          );
          addViteSsrExternal(bundlerOptions, app, "chart.js");
        }

        if (enableEcharts) {
          addViteOptimizeDepsExclude(bundlerOptions, app, "echarts");
          addViteSsrExternal(bundlerOptions, app, "echarts");
        }

        if (enableFlowchart) {
          addViteOptimizeDepsExclude(bundlerOptions, app, "flowchart.ts");
          addViteSsrExternal(bundlerOptions, app, "flowchart.ts");
        }

        if (enableMarkmap) {
          addViteOptimizeDepsInclude(bundlerOptions, app, [
            "markmap-lib",
            "markmap-view",
          ]);
          addViteSsrExternal(bundlerOptions, app, [
            "markmap-lib",
            "markmap-view",
          ]);
        }

        if (enableMermaid) {
          addViteOptimizeDepsInclude(bundlerOptions, app, "mermaid");
          addViteSsrExternal(bundlerOptions, app, "mermaid");
        }

        if (enableRevealJs) {
          addViteOptimizeDepsExclude(bundlerOptions, app, [
            "reveal.js/dist/reveal.esm.js",
            "reveal.js/plugin/markdown/markdown.esm.js",
            ...(revealJsOptions?.plugins || []).map(
              (plugin) => `reveal.js/plugin/${plugin}/${plugin}.esm.js`,
            ),
          ]);

          addViteSsrExternal(bundlerOptions, app, "reveal.js");
        }

        if (enableVuePlayground) {
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
        // syntax
        if (getStatus("alert", true)) md.use(alert, locales);
        if (getStatus("attrs"))
          md.use(attrs, isPlainObject(options.attrs) ? options.attrs : {});
        if (getStatus("align")) md.use(align);
        if (getStatus("breaks", true)) md.options.breaks = true;
        // TODO: Remove this in v2 stable
        // @ts-expect-error
        if (getStatus("card") && legacy) md.use(legacyCard);
        if (getStatus("imgLazyload")) md.use(imgLazyload);
        if (getStatus("figure")) md.use(figure);
        if (enableImgMark)
          md.use(
            imgMark,
            isPlainObject(options.imgMark) ? options.imgMark : {},
          );
        if (getStatus("hint")) {
          md.use(hint, locales);
          if (legacy) md.use(legacyHint, locales);
        }
        if (getStatus("imgSize")) md.use(imgSize);
        if (getStatus("linkify", true)) md.options.linkify = true;
        if (getStatus("obsidianImgSize")) md.use(obsidianImageSize);
        if (getStatus("sup")) md.use(sup);
        if (getStatus("sub")) md.use(sub);
        if (enableFootnote) md.use(footnote);
        if (getStatus("mark")) md.use(mark);
        if (enableTasklist)
          md.use(tasklist, [
            isPlainObject(options.tasklist) ? options.tasklist : {},
          ]);

        // additional functions
        if (
          getStatus("vPre") ||
          // TODO: Remove this in v2 stable
          legacy
        )
          md.use(vPre);
        if (enableKatex) {
          md.use(katex, katexOptions);
        } else if (enableMathjax) {
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

        if (enableInclude) {
          md.use(include, {
            currentPath: (env: MarkdownEnv) => env.filePath,
            ...(isPlainObject(options.include) ? options.include : {}),
          });
          if (legacy)
            md.use(legacyInclude, {
              currentPath: (env: MarkdownEnv) => env.filePath,
            });
        }

        if (getStatus("stylize"))
          md.use(stylize, {
            config: options.stylize,
            localConfigGetter: (env: MarkdownEnv) =>
              env.frontmatter?.["stylize"] || null,
          });

        // features
        if (getStatus("component")) md.use(component);
        if (getStatus("codetabs")) {
          md.use(codeTabs);
          // TODO: Remove this in v2 stable
          if (legacy) md.use(legacyCodeGroup);
        }
        if (getStatus("tabs")) md.use(tabs);
        if (enableFlowchart) {
          md.use(flowchart);
          // TODO: Remove this in v2 stable
          if (legacy) md.use(legacyFlowchart);
        }
        if (enableChart) md.use(chart);
        if (enableEcharts) md.use(echarts);
        if (getStatus("demo")) {
          md.use(mdDemo);
          md.use(normalDemo);
          md.use(vueDemo);
          md.use(reactDemo);
          // TODO: Remove this in v2 stable
          if (legacy) md.use(legacyCodeDemo);
        }
        if (enableMarkmap) md.use(markmap);
        if (enableMermaid) md.use(mermaid);
        if (enableRevealJs) md.use(revealJs);
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
        if (enableVuePlayground) md.use(vuePlayground);
      },

      extendsPage: (page, app): void => {
        if (enableLinksCheck && isAppInitialized)
          linksCheck(page, app, isIgnoreLink);

        if (enableInclude)
          page.deps.push(...(<string[]>page.markdownEnv["includedFiles"]));
      },

      onInitialized: (app): void => {
        isAppInitialized = true;
        if (enableLinksCheck)
          app.pages.forEach((page) => linksCheck(page, app, isIgnoreLink));
      },

      onPrepared: async (app): Promise<void> => {
        const promises = [];

        if (enableMathjax)
          promises.push(prepareMathjaxStyleFile(app, mathjaxInstance!));

        if (enableRevealJs)
          promises.push(
            prepareRevealJsPluginFile(app, revealJsOptions.plugins ?? []),
            prepareRevealJsStyleFile(app, revealJsOptions?.themes),
          );

        await Promise.all(promises);
      },

      clientConfigFile: (app) => prepareConfigFile(app, options, legacy),
    };
  };
