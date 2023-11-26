import { createConverter } from "vuepress-shared/node";

import type { SeoOptions } from "./options.js";

/** @deprecated */
export const convertOptions = (
  options: SeoOptions & Record<string, unknown>,
): void => {
  const { droppedLogger } = createConverter("seo");

  droppedLogger({
    options,
    old: "seo",
    new: "ogp",
  });
  droppedLogger({
    options,
    old: "customMeta",
    new: "customHead",
  });
};
