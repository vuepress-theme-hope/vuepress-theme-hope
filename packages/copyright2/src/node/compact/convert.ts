import { deprecatedLogger } from "./utils.js";
import type { CopyrightOptions } from "../options.js";

/** @deprecated */
export const convertOptions = (
  options: CopyrightOptions & Record<string, unknown>,
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "triggerWords",
    newOption: "triggerLength",
  });
};
