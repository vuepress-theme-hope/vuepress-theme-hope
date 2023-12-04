import { createConverter } from "vuepress-shared/node";

import type { RedirectOptions } from "./options.js";

/** @deprecated */
export const convertOptions = (
  options: RedirectOptions & Record<string, unknown>,
): void => {
  const { deprecatedLogger } = createConverter("redirect");

  deprecatedLogger({
    options,
    old: "locale",
    new: "autoLocale",
  });
};
