import { droppedLogger } from "./utils";
import type { SeoOptions } from "../../shared";

/** @deprecated */
export const covertOptions = (
  options: SeoOptions & Record<string, unknown>
): void => {
  droppedLogger(options, "seo", "", "ogp");
  droppedLogger(options, "customMeta", "", "customHead");
};
