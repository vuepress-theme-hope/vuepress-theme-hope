import { droppedLogger } from "./utils";
import type { SeoOptions } from "../../shared";

/** @deprecated */
export const convertOptions = (
  options: SeoOptions & Record<string, unknown>
): void => {
  droppedLogger(options, "seo", "", "ogp");
  droppedLogger(options, "customMeta", "", "customHead");
};
