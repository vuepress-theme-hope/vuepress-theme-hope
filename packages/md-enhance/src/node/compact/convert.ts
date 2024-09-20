import { isArray, isPlainObject } from "@vuepress/helper";
import { colors } from "vuepress/utils";
import { createConverter } from "vuepress-shared/node";

import type { MarkdownEnhancePluginOptions } from "../options.js";
import type { RevealJsPlugin } from "../typings/index.js";
import { logger } from "../utils.js";

/** @deprecated */
export const convertOptions = (
  options: MarkdownEnhancePluginOptions & Record<string, unknown>,
): void => {
  const { deprecatedLogger, droppedLogger } = createConverter("md-enhance");

  deprecatedLogger({
    options,
    old: "container",
    new: "hint",
  });
  deprecatedLogger({
    options,
    old: "codegroup",
    new: "codetabs",
  });
  deprecatedLogger({
    options,
    old: "mdImport",
    new: "include",
  });
  deprecatedLogger({
    options,
    old: "tex",
    new: "katex",
  });
  deprecatedLogger({
    options,
    old: "vpre",
    new: "vPre",
  });
  deprecatedLogger({
    options,
    old: "imageTitle",
    new: "figure",
  });
  deprecatedLogger({
    options,
    old: "revealjs",
    new: "revealJs",
  });
  droppedLogger({
    options,
    old: "enableAll",
    msg: "Please manually enable the features you need.",
  });
  droppedLogger({
    options,
    old: "lineNumbers",
    msg: "Please use the built-in lineNumbers option of vuepress instead!",
  });
  droppedLogger({
    options,
    old: "imageFix",
    msg: "This option is no longer needed.",
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

  if (options["presentation"]) {
    logger.error(
      `${colors.magenta(
        "presentation",
      )} is no longer supported, please use ${colors.magenta(
        "revealJs",
      )} instead.`,
    );

    if (isPlainObject(options["presentation"])) {
      if ("plugins" in options["presentation"])
        options.revealJs = {
          plugins: options["presentation"]["plugins"] as RevealJsPlugin[],
        };
      else options.revealJs = true;

      if ("revealConfig" in options["presentation"])
        logger.error(
          `Customizing revealJs with option ${colors.magenta(
            "presentation.revealConfig",
          )} is no longer supported, please import and use ${colors.magenta(
            "defineRevealJsConfig",
          )} from ${colors.magenta(
            "vuepress-plugin-md-enhance/client",
          )} instead.`,
        );
    } else if (isArray(options["presentation"])) {
      options.revealJs = {
        plugins: options["presentation"] as RevealJsPlugin[],
      };
    }

    delete options["presentation"];
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
