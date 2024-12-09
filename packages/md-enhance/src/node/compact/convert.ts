import { isPlainObject } from "@vuepress/helper";
import { colors } from "vuepress/utils";
import { createConverter } from "vuepress-shared/node";

import type { MarkdownEnhancePluginOptions } from "../options.js";
import { logger } from "../utils.js";

/** @deprecated */
export const convertOptions = (
  options: MarkdownEnhancePluginOptions & Record<string, unknown>,
): void => {
  const { deprecatedLogger, droppedLogger } = createConverter("md-enhance");

  deprecatedLogger({
    options,
    old: "chart",
    new: "chartjs",
  });

  droppedLogger({
    options,
    old: "enableAll",
    msg: "Please manually enable the features you need.",
  });
  droppedLogger({
    options,
    old: "imageFix",
    msg: "This option is no longer needed.",
  });
  droppedLogger({
    options,
    old: "lineNumbers",
    msg: "Please use lineNumbers option in @vuepress/plugin-prismjs or @vuepress/plugin-shiki !",
  });

  droppedLogger({
    options,
    old: "alert",
    msg: "Please use alert option in @vuepress/plugin-markdown-hint instead.",
  });
  droppedLogger({
    options,
    old: "container",
    msg: "Please use hint option in @vuepress/plugin-markdown-hint instead.",
  });
  droppedLogger({
    options,
    old: "hint",
    msg: "Please use hint option in @vuepress/plugin-markdown-hint instead.",
  });

  droppedLogger({
    options,
    old: "mdImport",
    msg: "Please use @vuepress/plugin-markdown-include instead.",
  });
  droppedLogger({
    options,
    old: "include",
    msg: "Please use @vuepress/plugin-markdown-include instead.",
  });

  droppedLogger({
    options,
    old: "imageTitle",
    msg: "Please use figure option in @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "figure",
    msg: "Please use figure option in @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imageMark",
    msg: "Please use mark option in @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imgMark",
    msg: "Please use mark option in @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imgSize",
    msg: "Please use size option in @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imageSize",
    msg: "Please use size option in @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "lazyload",
    msg: "Please use lazyload option in @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imageLazyload",
    msg: "Please use lazyload option in @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imgLazyload",
    msg: "Please use lazyload option in @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "obsidianImgSize",
    msg: "Please use obsidianSize option in @vuepress/plugin-markdown-image instead.",
  });

  droppedLogger({
    options,
    old: "linkCheck",
    msg: "Please use @vuepress/plugin-links-check instead.",
  });
  droppedLogger({
    options,
    old: "checkLinks",
    msg: "Please use @vuepress/plugin-links-check instead.",
  });

  droppedLogger({
    options,
    old: "tex",
    msg: "Please use @vuepress/plugin-markdown-math instead.",
  });
  droppedLogger({
    options,
    old: "katex",
    msg: "Please use @vuepress/plugin-markdown-math instead.",
  });
  droppedLogger({
    options,
    old: "mathjax",
    msg: "Please use @vuepress/plugin-markdown-math instead.",
  });

  droppedLogger({
    options,
    old: "revealjs",
    msg: "Please use @vuepress/plugin-revealjs instead.",
  });
  droppedLogger({
    options,
    old: "revealJs",
    msg: "Please use @vuepress/plugin-revealjs instead.",
  });
  droppedLogger({
    options,
    old: "presentation",
    msg: "Please use @vuepress/plugin-revealjs instead.",
  });

  droppedLogger({
    options,
    old: "codegroup",
    msg: "Please use codeTabs option in @vuepress/plugin-markdown-tab instead.",
  });
  droppedLogger({
    options,
    old: "codetabs",
    msg: "Please use codeTabs option in @vuepress/plugin-markdown-tab instead.",
  });
  droppedLogger({
    options,
    old: "tabs",
    msg: "Please use tabs option in @vuepress/plugin-markdown-tab instead.",
  });

  droppedLogger({
    options,
    old: "vpre",
    msg: "Please use vPre option in @vuepress/plugin-markdown-ext instead.",
  });
  droppedLogger({
    options,
    old: "vPre",
    msg: "Please use vPre option in @vuepress/plugin-markdown-ext instead.",
  });
  droppedLogger({
    options,
    old: "breaks",
    msg: "Please use breaks option in @vuepress/plugin-markdown-ext instead.",
  });
  droppedLogger({
    options,
    old: "linkify",
    msg: "Please use linkify option in @vuepress/plugin-markdown-ext instead.",
  });
  droppedLogger({
    options,
    old: "gfm",
    msg: "Please use gfm option in @vuepress/plugin-markdown-ext instead.",
  });
  droppedLogger({
    options,
    old: "footnote",
    msg: "Please use footnote option in @vuepress/plugin-markdown-ext instead.",
  });
  droppedLogger({
    options,
    old: "tasklist",
    msg: "Please use tasklist option in @vuepress/plugin-markdown-ext instead.",
  });
  droppedLogger({
    options,
    old: "component",
    msg: "Please use component option in @vuepress/plugin-markdown-ext instead.",
  });

  droppedLogger({
    options,
    old: "align",
    msg: "Please use align option in @vuepress/plugin-markdown-stylize instead.",
  });
  droppedLogger({
    options,
    old: "attrs",
    msg: "Please use attrs option in @vuepress/plugin-markdown-stylize instead.",
  });
  droppedLogger({
    options,
    old: "mark",
    msg: "Please use mark option in @vuepress/plugin-markdown-stylize instead.",
  });
  droppedLogger({
    options,
    old: "spoiler",
    msg: "Please use spoiler option in @vuepress/plugin-markdown-stylize instead.",
  });
  droppedLogger({
    options,
    old: "sub",
    msg: "Please use sub option in @vuepress/plugin-markdown-stylize instead.",
  });
  droppedLogger({
    options,
    old: "sup",
    msg: "Please use sup option in @vuepress/plugin-markdown-stylize instead.",
  });
  droppedLogger({
    options,
    old: "stylize",
    msg: "Please use custom option in @vuepress/plugin-markdown-stylize instead.",
  });

  if (options.card)
    logger.error(
      `${colors.magenta("card")} is deprecated, please import  ${colors.magenta(
        "VPCard",
      )} from "vuepress-plugin-components" and use it instead.`,
    );

  if (isPlainObject(options.mermaid)) {
    logger.error(
      `Customizing mermaid with option ${colors.magenta(
        "mermaid",
      )} is no longer supported, please import and use ${colors.magenta(
        "defineMermaidConfig",
      )} from ${colors.magenta("vuepress-plugin-md-enhance/client")} instead.`,
    );
    options.mermaid = true;
  }

  if (isPlainObject(options.vuePlayground)) {
    logger.error(
      `Customizing @vue/repl with option ${colors.magenta(
        "vuePlayground",
      )} is no longer supported, please import and use ${colors.magenta(
        "defineVuePlaygroundConfig",
      )} from ${colors.magenta("vuepress-plugin-md-enhance/client")} instead.`,
    );
    options.vuePlayground = true;
  }
};
