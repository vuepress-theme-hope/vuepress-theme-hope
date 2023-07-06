import { colors } from "@vuepress/utils";
import { isPlainObject } from "vuepress-shared/node";

import { deprecatedLogger, droppedLogger } from "./utils.js";
import type { LinksCheckStatus, MarkdownEnhanceOptions } from "../options.js";
import type { RevealPlugin } from "../typings/index.js";
import { logger } from "../utils.js";

/** @deprecated */
export const convertOptions = (
  options: MarkdownEnhanceOptions & Record<string, unknown>,
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "codegroup",
    newOption: "codetabs",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "lazyload",
    newOption: "imgLazyload",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "imageLazyload",
    newOption: "imgLazyload",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "imageMark",
    newOption: "imgMark",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "imageSize",
    newOption: "imgSize",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "mdImport",
    newOption: "include",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "tex",
    newOption: "katex",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "vpre",
    newOption: "vPre",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "imageTitle",
    newOption: "figure",
  });
  droppedLogger(options, "enableAll");
  droppedLogger(options, "lineNumbers");
  droppedLogger(options, "imageFix");

  if ("linkCheck" in options) {
    logger.warn(
      `${colors.magenta(
        "linkCheck",
      )} is deprecated, please use ${colors.magenta("checkLinks")} instead`,
    );

    options.checkLinks = {
      status:
        typeof options["linkCheck"] === "boolean"
          ? options["linkCheck"]
            ? "always"
            : "never"
          : (options["linkCheck"] as LinksCheckStatus),
    };
  }

  if (isPlainObject(options.presentation)) {
    if ("revealConfig" in options.presentation)
      logger.warn(
        `${colors.magenta(
          "presentation.revealConfig",
        )} is deprecated, please import ${colors.magenta(
          `defineRevealConfig`,
        )} from ${colors.cyan(`vuepress-plugin-md-enhance/client`)} instead.`,
      );

    if ("plugins" in options.presentation) {
      logger.warn(
        `${colors.magenta(
          "presentation.plugins",
        )} is deprecated, please use ${colors.magenta(`presentation`)} instead`,
      );

      options.presentation = <RevealPlugin[]>options.presentation.plugins;
    }
  }
};
