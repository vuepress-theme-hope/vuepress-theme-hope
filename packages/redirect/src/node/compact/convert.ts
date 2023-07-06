import { deprecatedLogger } from "./utils.js";
import type { RedirectOptions } from "../options.js";

/** @deprecated */
export const convertOptions = (
  options: RedirectOptions & Record<string, unknown>,
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "locale",
    newOption: "autoLocale",
  });
};
