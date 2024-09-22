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
    old: "mdImport",
    new: "include",
  });
  deprecatedLogger({
    options,
    old: "vpre",
    new: "vPre",
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
    msg: "Please use the lineNumbers option in @vuepress/plugin-prismjs or @vuepress/plugin-shiki !",
  });
  droppedLogger({
    options,
    old: "container",
    msg: "Please use @vuepress/plugin-markdown-hint instead.",
  });
  droppedLogger({
    options,
    old: "alert",
    msg: "Please use @vuepress/plugin-markdown-hint instead.",
  });
  droppedLogger({
    options,
    old: "hint",
    msg: "Please use @vuepress/plugin-markdown-hint instead.",
  });
  droppedLogger({
    options,
    old: "imageTitle",
    msg: "Please use @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "figure",
    msg: "Please use @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imageMark",
    msg: "Please use @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imgMark",
    msg: "Please use @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imgSize",
    msg: "Please use @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imageSize",
    msg: "Please use @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "lazyload",
    msg: "Please use @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imageLazyload",
    msg: "Please use @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "imgLazyload",
    msg: "Please use @vuepress/plugin-markdown-image instead.",
  });
  droppedLogger({
    options,
    old: "obsidianImgSize",
    msg: "Please use @vuepress/plugin-markdown-image instead.",
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
    old: "codetabs",
    msg: "Please use @vuepress/plugin-markdown-tab instead.",
  });
  droppedLogger({
    options,
    old: "codegroup",
    msg: "Please use @vuepress/plugin-markdown-tab instead.",
  });
  droppedLogger({
    options,
    old: "tabs",
    msg: "Please use @vuepress/plugin-markdown-tab instead.",
  });

  if (options["card"])
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
