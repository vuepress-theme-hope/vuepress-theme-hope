import { isArray, isPlainObject } from "@vuepress/shared";
import { colors } from "@vuepress/utils";

import { deprecatedLogger, droppedLogger } from "./utils.js";
import type { LinksCheckStatus, MarkdownEnhanceOptions } from "../options.js";
import type { RevealJsPlugin } from "../typings/index.js";
import { logger } from "../utils.js";

/** @deprecated */
export const convertOptions = (
  options: MarkdownEnhanceOptions & Record<string, unknown>,
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "container",
    newOption: "hint",
  });
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
  deprecatedLogger({
    options,
    deprecatedOption: "revealjs",
    newOption: "revealJs",
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

  if (options["card"])
    logger.error(
      `${colors.magenta("card")} is deprecated, please import  ${colors.magenta(
        "VPCard",
      )} from "vuepress-plugin-components" and use it instead.`,
    );

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
          plugins: <RevealJsPlugin[]>options["presentation"]["plugins"],
        };
    } else if (isArray(options["presentation"])) {
      options.revealJs = {
        plugins: <RevealJsPlugin[]>options["presentation"],
      };
    }
  }
};
