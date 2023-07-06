import { droppedLogger } from "./utils.js";
import type { SeoOptions } from "../options.js";

/** @deprecated */
export const convertOptions = (
  options: SeoOptions & Record<string, unknown>,
): void => {
  droppedLogger(options, "seo", "", "ogp");
  droppedLogger(options, "customMeta", "", "customHead");
};
