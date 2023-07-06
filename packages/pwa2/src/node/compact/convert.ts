import { deprecatedLogger } from "./utils.js";
import type { PWAOptions } from "../options.js";

/** @deprecated */
export const convertOptions = (
  options: PWAOptions & Record<string, unknown>,
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "cacheMaxSize",
    newOption: "maxSize",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "popupComponent",
    newOption: "updateComponent",
  });
};
