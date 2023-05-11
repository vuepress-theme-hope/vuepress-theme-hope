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
import { type PluginFunction } from "@vuepress/core";
import { type MarkdownEnv } from "@vuepress/markdown";
import { colors } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  MATHML_TAGS,
  addChainWebpack,
  addCustomElement,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
  addViteSsrNoExternal,
  checkVersion,
  detectPackageManager,
  getBundlerName,
  getLocales,
  isArray,
  isPlainObject,
} from "vuepress-shared/node";

import {
  convertOptions,
  legacyCodeDemo,
  legacyCodeGroup,
  legacyFlowchart,
  legacyInclude,
} from "./compact/index.js";
import { getLinksCheckStatus, linksCheck } from "./linksCheck.js";
import { markdownEnhanceLocales } from "./locales.js";
import {
  CODE_DEMO_DEFAULT_SETTING,
  card,
  chart,
  codeTabs,
  echarts,
  flowchart,
  getTSPlaygroundPreset,
  getVuePlaygroundPreset,
  hint,
  mermaid,
  normalDemo,
  playground,
  presentation,
  reactDemo,
  tabs,
  vPre,
  vueDemo,
  vuePlayground,
} from "./markdown-it/index.js";
import { type MarkdownEnhanceOptions } from "./options.js";
import {
  prepareConfigFile,
  prepareMathjaxStyleFile,
  prepareRevealPluginFile,
} from "./prepare/index.js";
import { type KatexOptions } from "./typings/index.js";
import { PLUGIN_NAME, logger } from "./utils.js";

export const mdEnhancePlugin =
  (
    options: MarkdownEnhanceOptions = { gfm: true },
    legacy = true
  ): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(
        options as MarkdownEnhanceOptions & Record<string, unknown>
      );

    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.62");

    if (app.env.isDebug) logger.info("Options:", options);

    const getStatus = (
      key: keyof MarkdownEnhanceOptions,
      gfm = false
    ): boolean =>
      key in options
        ? Boolean(options[key])
        : (gfm && "gfm" in options && options.gfm) || false;

    const locales = getLocales({
      app,
      name: PLUGIN_NAME,
      default: markdownEnhanceLocales,
      config: options.locales,
    });

    const chartEnable = getStatus("chart");
    const echartsEnable = getStatus("echarts");
    const flowchartEnable = getStatus("flowchart");
    const footnoteEnable = getStatus("footnote", true);
    const imgMarkEnable = getStatus("imgMark", true);
    const includeEnable = getStatus("include");
    const tasklistEnable = getStatus("tasklist", true);
    const mermaidEnable = getStatus("mermaid");
    const presentationEnable = getStatus("presentation");
    const katexEnable = getStatus("katex");
    const mathjaxEnable = getStatus("mathjax");
    const vuePlaygroundEnable = getStatus("vuePlayground");

    const { enabled: linksCheckEnabled, isIgnoreLink } = getLinksCheckStatus(
      app,
      options
    );

    const katexOptions: KatexOptions<MarkdownEnv> = {
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
            }. You should use ${colors.magenta(`\\text{${token.text}}`)}`
          );
        else
          logger.warn(
            `${errorMsg}.${
              filePathRelative
                ? `\nFound in ${colors.cyan(filePathRelative)}`
                : ""
            }`
          );
      },
      ...(isPlainObject(options.katex) ? options.katex : {}),
    };

    const mathjaxInstance =
      options.mathjax === false
        ? null
        : createMathjaxInstance(
            isPlainObject(options.mathjax) ? options.mathjax : {}
          );

    const revealPlugins =
      isPlainObject(options.presentation) &&
      isArray(options.presentation.plugins)
        ? options.presentation.plugins
        : [];

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
        "@mermaid":
          app.env.isDev &&
          detectPackageManager() === "pnpm" &&
          getBundlerName(app) === "vite"
            ? "mermaid/dist/mermaid.esm.min.mjs"
            : "mermaid",
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, [
          "fflate",
          "vuepress-shared",
        ]);

        if (katexEnable && katexOptions.output !== "html") {
          addCustomElement(bundlerOptions, app, MATHML_TAGS);
        } else if (mathjaxEnable) {
          addCustomElement(bundlerOptions, app, /^mjx-/);
          if (mathjaxInstance?.documentOptions.enableAssistiveMml)
            addCustomElement(bundlerOptions, app, MATHML_TAGS);
        }
        if (chartEnable) {
          addViteOptimizeDepsExclude(
            bundlerOptions,
            app,
            "chart.js/auto/auto.mjs"
          );
          addViteSsrExternal(bundlerOptions, app, "chart.js");
        }

        if (echartsEnable) {
          addViteOptimizeDepsExclude(bundlerOptions, app, "echarts");
          addViteSsrExternal(bundlerOptions, app, "echarts");
        }

        if (flowchartEnable) {
          addViteOptimizeDepsExclude(bundlerOptions, app, "flowchart.ts");
          addViteSsrExternal(bundlerOptions, app, "flowchart.ts");
        }

        if (mermaidEnable) {
          addViteOptimizeDepsInclude(bundlerOptions, app, "mermaid");
          addViteSsrExternal(bundlerOptions, app, "mermaid");
        }

        if (presentationEnable) {
          addViteOptimizeDepsExclude(bundlerOptions, app, [
            "reveal.js/dist/reveal.esm.js",
            "reveal.js/plugin/markdown/markdown.esm.js",
            ...revealPlugins.map(
              (plugin) => `reveal.js/plugin/${plugin}/${plugin}.esm.js`
            ),
          ]);

          addViteSsrExternal(bundlerOptions, app, "reveal.js");
        }

        if (vuePlaygroundEnable) {
          addViteOptimizeDepsInclude(bundlerOptions, app, "@vue/repl");
          addViteSsrExternal(bundlerOptions, app, "@vue/repl");

          // hide webpack warnings
          addChainWebpack(bundlerOptions, app, (config) => {
            config.module.set("exprContextCritical", false);
            config.module.set("unknownContextCritical", false);
          });
        }
      },

      extendsMarkdown: (md): void => {
        // syntax
        if (getStatus("gfm")) md.options.linkify = true;
        if (getStatus("attrs"))
          md.use(attrs, isPlainObject(options.attrs) ? options.attrs : {});
        if (getStatus("align")) md.use(align);
        if (getStatus("container")) md.use(hint, locales);
        if (getStatus("imgLazyload")) md.use(imgLazyload);
        if (getStatus("figure")) md.use(figure);
        if (imgMarkEnable)
          md.use(
            imgMark,
            isPlainObject(options.imgMark) ? options.imgMark : {}
          );

        if (getStatus("imgSize")) md.use(imgSize);
        if (getStatus("obsidianImgSize")) md.use(obsidianImageSize);
        if (getStatus("sup")) md.use(sup);
        if (getStatus("sub")) md.use(sub);
        if (footnoteEnable) md.use(footnote);
        if (getStatus("mark")) md.use(mark);
        if (tasklistEnable)
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
        if (katexEnable) {
          md.use(katex, katexOptions);
        } else if (mathjaxEnable) {
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

        if (includeEnable) {
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
        if (getStatus("card")) md.use(card);
        if (getStatus("codetabs")) {
          md.use(codeTabs);
          // TODO: Remove this in v2 stable
          if (legacy) md.use(legacyCodeGroup);
        }
        if (getStatus("tabs")) md.use(tabs);
        if (flowchartEnable) {
          md.use(flowchart);
          // TODO: Remove this in v2 stable
          if (legacy) md.use(legacyFlowchart);
        }
        if (chartEnable) md.use(chart);
        if (echartsEnable) md.use(echarts);
        if (getStatus("demo")) {
          md.use(normalDemo);
          md.use(vueDemo);
          md.use(reactDemo);
          // TODO: Remove this in v2 stable
          if (legacy) md.use(legacyCodeDemo);
        }
        if (mermaidEnable) md.use(mermaid);
        if (presentationEnable) md.use(presentation);
        if (isPlainObject(options.playground)) {
          const { presets = [], config = {} } = options.playground;

          presets.forEach((preset) => {
            if (preset === "ts")
              md.use(playground, getTSPlaygroundPreset(config.ts || {}));
            else if (preset === "vue")
              md.use(playground, getVuePlaygroundPreset(config.vue || {}));
            else if (isPlainObject(preset)) md.use(playground, preset);
          });
        }
        if (vuePlaygroundEnable) md.use(vuePlayground);
      },

      extendsPage: (page, app): void => {
        if (linksCheckEnabled && isAppInitialized)
          linksCheck(page, app, isIgnoreLink);
        if (includeEnable)
          page.deps.push(...(<string[]>page.markdownEnv["includedFiles"]));
      },

      onInitialized: (app): void => {
        isAppInitialized = true;
        if (linksCheckEnabled)
          app.pages.forEach((page) => linksCheck(page, app, isIgnoreLink));
      },

      onPrepared: (app): Promise<void> =>
        Promise.all([
          mathjaxEnable
            ? prepareMathjaxStyleFile(app, mathjaxInstance!)
            : Promise.resolve(),
          prepareRevealPluginFile(app, revealPlugins),
        ]).then(() => void 0),

      clientConfigFile: (app) => prepareConfigFile(app, options, legacy),
    };
  };
