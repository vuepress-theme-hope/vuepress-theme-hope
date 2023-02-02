import { deprecatedLogger, droppedLogger } from "./utils.js";
import { type MarkdownEnhanceOptions } from "../options.js";

/** @deprecated */
export const convertOptions = (
  options: MarkdownEnhanceOptions & Record<string, unknown>
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
};
