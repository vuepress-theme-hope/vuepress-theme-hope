import { colors } from "@vuepress/utils";
import { createConverter, isFunction } from "vuepress-shared/node";

import type { CopyrightOptions } from "./options.js";
import { logger } from "./utils.js";

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

  if (isFunction(options.author)) {
    logger.warn(
      `${colors.cyan(
        "author",
      )} no longer support function, please use ${colors.cyan("authorGetter")}`,
    );

    // @ts-expect-error
    options.authorGetter = options.author;
  }

  if (isFunction(options.license)) {
    logger.warn(
      `${colors.cyan(
        "license",
      )} no longer support function, please use ${colors.cyan(
        "licenseGetter",
      )}`,
    );

    // @ts-expect-error
    options.licenseGetter = options.license;
  }
};
