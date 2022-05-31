import { deprecatedLogger, droppedLogger } from "./utils";
import type { MarkdownEnhanceOptions } from "../../shared";

/** @deprecated */
export const covertOptions = (
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

  droppedLogger(options, "lineNumbers");
  droppedLogger(options, "imageFix");
};
