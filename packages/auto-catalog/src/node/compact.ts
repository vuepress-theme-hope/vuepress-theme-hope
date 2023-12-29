import { colors } from "@vuepress/utils";
import { createConverter } from "vuepress-shared/node";

import type { AutoCatalogOptions } from "./options.js";

/** @deprecated */
export const convertOptions = (
  options: AutoCatalogOptions & Record<string, unknown>,
): void => {
  const { deprecatedLogger, droppedLogger } = createConverter("auto-catalog");

  deprecatedLogger({
    options,
    old: "getTitle",
    new: "titleGetter",
  });
  deprecatedLogger({
    options,
    old: "getIcon",
    new: "iconGetter",
  });
  deprecatedLogger({
    options,
    old: "getOrder",
    new: "orderGetter",
  });
  deprecatedLogger({
    options,
    old: "getIndex",
    new: "shouldIndex",
  });

  droppedLogger({
    options,
    old: "iconComponent",
    msg: `please use ${colors.magenta(
      "defineAutoCatalogIconComponent",
    )} in client config file.`,
  });
};
