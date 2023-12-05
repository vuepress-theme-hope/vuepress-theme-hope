import type { App } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import {
  deepAssign,
  entries,
  fromEntries,
  isArray,
  isPlainObject,
  keys,
} from "vuepress-shared/node";

import type { RedirectOptions } from "./options.js";
import { logger } from "./utils/index.js";
import type { LocaleRedirectConfig } from "../shared/index.js";

const AVAILABLE_FALLBACK = ["defaultLocale", "homepage", "404"] as const;

export const getLocaleConfig = (
  app: App,
  options: RedirectOptions,
): LocaleRedirectConfig => {
  const { locales } = app.options;

  const localeConfig = deepAssign(
    fromEntries(
      entries(locales)
        .filter(([key, { lang }]) => {
          if (key === "/") return false;

          if (!lang) {
            logger.error(
              `Missing ${colors.magenta(
                "lang",
              )} option for locale "${key}", this locale will be ignored!`,
            );

            return false;
          }

          return true;
        })
        .map(([key, { lang }]) => [key, [lang!]]),
    ),
    isPlainObject(options.localeConfig)
      ? entries(options.localeConfig).map(([routePath, lang]) => [
          routePath,
          isArray(lang) ? lang : [lang],
        ])
      : {},
  );
  const defaultLocale = options.defaultLocale || keys(localeConfig).pop()!;

  return {
    autoLocale: options.autoLocale ?? false,
    switchLocale: options.switchLocale ?? false,
    localeConfig,
    defaultLocale,
    localeFallback: options.localeFallback ?? true,
    defaultBehavior:
      options.defaultBehavior &&
      AVAILABLE_FALLBACK.includes(options.defaultBehavior)
        ? options.defaultBehavior
        : "defaultLocale",
  };
};
