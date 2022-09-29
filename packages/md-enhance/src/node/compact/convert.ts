import { deprecatedLogger, droppedLogger } from "./utils.js";
import type { MarkdownEnhanceOptions } from "../../shared/index.js";

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
    deprecatedOption: "mdImport",
    newOption: "include",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "tex",
    newOption: "katex",
  });

  droppedLogger(options, "enableAll");
  droppedLogger(options, "lineNumbers");
  droppedLogger(options, "imageFix");
};
