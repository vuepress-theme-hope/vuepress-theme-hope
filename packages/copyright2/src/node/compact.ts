import { createConverter } from "vuepress-shared/node";

import type { CopyrightOptions } from "./options.js";

/** @deprecated */
export const convertOptions = (
  options: CopyrightOptions & Record<string, unknown>,
): void => {
  const { deprecatedLogger } = createConverter("copy-code2");

  deprecatedLogger({
    options,
    old: "triggerWords",
    new: "triggerLength",
  });
  deprecatedLogger({
    options,
    old: "hostname",
    new: "canonical",
  });
};
