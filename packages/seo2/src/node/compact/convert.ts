import { droppedLogger } from "./utils.js";
import type { SeoOptions } from "../../shared/index.js";

/** @deprecated */
export const convertOptions = (
  options: SeoOptions & Record<string, unknown>
): void => {
  droppedLogger(options, "seo", "", "ogp");
  droppedLogger(options, "customMeta", "", "customHead");
};
