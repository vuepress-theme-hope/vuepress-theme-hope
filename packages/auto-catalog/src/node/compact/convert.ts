import { colors } from "@vuepress/utils";

import { deprecatedLogger, droppedLogger } from "./utils.js";
import type { AutoCatalogOptions } from "../options.js";

/** @deprecated */
export const convertOptions = (
  options: AutoCatalogOptions & Record<string, unknown>
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "getTitle",
    newOption: "titleGetter",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "getIcon",
    newOption: "iconGetter",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "getOrder",
    newOption: "orderGetter",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "getIndex",
    newOption: "shouldIndex",
  });

  droppedLogger(
    options,
    "iconComponent",
    `please use ${colors.magenta(
      "defineAutoCatalogIconComponent"
    )} in client config file.`
  );
};
