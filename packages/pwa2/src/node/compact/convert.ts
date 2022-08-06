import { deprecatedLogger } from "./utils";
import type { PWAOptions } from "../../shared";

/** @deprecated */
export const convertOptions = (
  options: PWAOptions & Record<string, unknown>
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
