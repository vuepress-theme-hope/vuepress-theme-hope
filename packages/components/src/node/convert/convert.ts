import { deprecatedLogger } from "./utils.js";
import type { ComponentOptions } from "../options.js";

/** @deprecated */
export const convertOptions = (
  options: ComponentOptions & Record<string, unknown>
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "iconAssets",
    newOption: "componentOptions.fontIcon.assets",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "iconPrefix",
    newOption: "componentOptions.fontIcon.prefix",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "addThis",
    newOption: "rootComponents.addThis",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "backToTop",
    newOption: "rootComponents.backToTop",
  });

  deprecatedLogger({
    options,
    deprecatedOption: "notice",
    newOption: "rootComponents.notice",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "backToTopLocales",
    newOption: "locales.backToTop",
  });
};
