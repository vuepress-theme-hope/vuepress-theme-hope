import { type App } from "@vuepress/core";
import { isPlainObject } from "@vuepress/shared";
import { colors } from "@vuepress/utils";
import { entries, fromEntries, keys } from "vuepress-shared/node";

import { type RedirectLocaleOptions, type RedirectOptions } from "./options.js";
import { logger } from "./utils.js";

const AVAILABLE_FALLBACK = ["defaultLocale", "homepage", "404"] as const;

export const getLocaleOptions = (
  app: App,
  options: RedirectOptions
): Required<RedirectLocaleOptions> | null => {
  const { locales } = app.options;

  if (options.locale) {
    const localeOptions = isPlainObject(options.locale) ? options.locale : {};

    const config = isPlainObject(localeOptions.config)
      ? localeOptions.config
      : fromEntries(
          entries(locales)
            .filter(([key, { lang }]) => {
              if (key === "/") return false;

              if (!lang) {
                logger.error(
                  `Missing ${colors.magenta(
                    "lang"
                  )} option for locale "${key}", this locale will be ignored!`
                );

                return false;
              }

              return true;
            })
            .map(([key, { lang }]) => [key, [lang!]])
        );
    const defaultLocale = localeOptions.defaultLocale || keys(config).pop()!;

    return {
      config,
      defaultLocale,
      fallback: localeOptions.fallback ?? true,
      default:
        localeOptions.default &&
        AVAILABLE_FALLBACK.includes(localeOptions.default)
          ? localeOptions.default
          : "defaultLocale",
    };
  }

  return null;
};
