import { createConverter } from "vuepress-shared/node";

import type { BlogOptions } from "./options.js";

/** @deprecated */
export const convertOptions = (
  options: BlogOptions & Record<string, unknown>,
): void => {
  const { deprecatedLogger } = createConverter("blog2");

  deprecatedLogger({
    options,
    old: "customElements",
    new: "isCustomElement",
  });
};
