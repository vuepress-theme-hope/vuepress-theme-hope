import { logger } from "./utils.js";
import type { BlogOptions } from "./options.js";

/** @deprecated */
export const convertOptions = (
  options: BlogOptions & Record<string, unknown>
): void => {
  // v2 changes
  if ("customElement" in options) {
    logger.warn(`"customElement" is deprecated, please use "isCustomElement".`);

    options["isCustomElement"] = options["customElement"] as (
      tagName: string
    ) => boolean;
  }
};
