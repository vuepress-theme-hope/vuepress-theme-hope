import { type App, type Page } from "@vuepress/core";
import { getDirname, path } from "@vuepress/utils";
import {
  Logger,
  ensureEndingSlash,
  entries,
  fromEntries,
  isAbsoluteUrl,
  isArray,
  isFunction,
  isLinkHttp,
  isPlainObject,
  removeEndingSlash,
} from "vuepress-shared/node";

import { type RedirectOptions } from "./options.js";
import { type RedirectPluginFrontmatterOption } from "./typings/index.js";
import { type LocaleRedirectConfig } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const PLUGIN_NAME = "vuepress-plugin-redirect";

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client")
);

export const logger = new Logger(PLUGIN_NAME);

export const normalizePath = (url: string): string =>
  url.replace(/\/$/, "/index.html").replace(/(?:\.(md|html))?$/, ".html");

export const handleRedirectTo = (
  app: App,
  { hostname }: RedirectOptions
): void => {
  const { base } = app.options;

  app.pages.forEach(({ frontmatter }) => {
    const { redirectTo } = <RedirectPluginFrontmatterOption>frontmatter;

    if (redirectTo) {
      const redirectUrl = normalizePath(
        isAbsoluteUrl(redirectTo)
          ? `${
              hostname
                ? isLinkHttp(hostname)
                  ? removeEndingSlash(hostname)
                  : `https://${removeEndingSlash(hostname)}`
                : ""
            }${base}${redirectTo}`
          : redirectTo
      )
        .replace(/\.md$/, ".html")
        .replace(/\/(README|index)\.html/, "/");

      (frontmatter.head ??= []).unshift([
        "script",
        {},
        `{\
const anchor = window.location.hash.substring(1);\
location.href=\`${redirectUrl}\${anchor? \`#\${anchor}\`: ""}\`;\
}`,
      ]);
    }
  });
};

export const getRedirectMap = (
  app: App,
  options: RedirectOptions
): Record<string, string> => {
  const config = isFunction(options.config)
    ? options.config(app)
    : isPlainObject(options.config)
    ? options.config
    : {};

  return {
    ...fromEntries(
      (<Page<Record<string, never>, RedirectPluginFrontmatterOption>[]>(
        app.pages
      ))
        .map<[string, string][]>(({ frontmatter, path }) =>
          isArray(frontmatter.redirectFrom)
            ? frontmatter.redirectFrom.map((from) => [
                normalizePath(from),
                path,
              ])
            : frontmatter.redirectFrom
            ? [[normalizePath(frontmatter.redirectFrom), path]]
            : []
        )
        .flat()
    ),
    ...fromEntries(
      entries(config).map(([from, to]) => [
        normalizePath(from),
        normalizePath(to),
      ])
    ),
  };
};

export const getLocaleRedirectHTML = (
  {
    localeConfig,
    defaultBehavior,
    defaultLocale,
    localeFallback,
  }: LocaleRedirectConfig,
  availableLocales: string[],
  base: string
): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <title>Redirecting...</title>
  <script>
    const { hash, origin, pathname } = window.location;
    const routePath = pathname.substring(${base.length});
    const { languages } = window.navigator;
    const anchor = hash.substring(1);

    const localeConfig = ${JSON.stringify(localeConfig)};
    const availableLocales = ${JSON.stringify(availableLocales)};
    const defaultLocale = ${
      availableLocales.includes(defaultLocale)
        ? JSON.stringify(defaultLocale)
        : "availableLocales.pop()"
    };
    const defaultBehavior = ${JSON.stringify(defaultBehavior)}

    let matchedLocalePath = null;

    // get matched locale
    findLanguage:
      for (const lang of languages)
        for (const [localePath, langs] of Object.entries(localeConfig))
          if (langs.includes(lang)) {
${
  localeFallback
    ? `\
            if (!availableLocales.includes(localePath))
              continue;
`
    : ``
}\
            matchedLocalePath = localePath;
            break findLanguage;
          }
    
    // default link
    const defaultLink = defaultLocale? \`\${origin}${removeEndingSlash(
      base
    )}\${defaultLocale}\${routePath}\${anchor? \`#\${anchor}\`: ""}\`: null;

    // a locale matches
    if (matchedLocalePath) {
      const localeLink = \`\${origin}${removeEndingSlash(
        base
      )}\${matchedLocalePath}\${routePath}\${anchor? \`#\${anchor}\`: ""}\`;

      if (availableLocales.includes(matchedLocalePath)) {
        location.href = localeLink;
      }
      // the page does not exist
      else {
        // locale homepage
        if (defaultBehavior === "homepage") {
          location.href = \`\${origin}${removeEndingSlash(
            base
          )}\${matchedLocalePath}\`;
        }
        // default locale page
        else if (defaultBehavior === "defaultLocale" && defaultLink) {
          location.href = defaultLink;
        }
        // as is to get a 404 page of that locale
        else {
          location.href = localeLink;
        }
      }
    }
    // we have a default page
    else if (defaultLink) {
      location.href = defaultLink;
    }
    else {
      location.href = \`\${origin}${removeEndingSlash(base)}/404.html\`;
    }
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
`;

export const getRedirectHTML = (redirectUrl: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=${redirectUrl}">
  <link rel="canonical" href="${redirectUrl}">
  <title>Redirecting...</title>
  <script>
    const anchor = window.location.hash.substring(1);
    location.href = \`${redirectUrl}\${anchor? \`#\${anchor}\`: ""}\`;
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
`;
