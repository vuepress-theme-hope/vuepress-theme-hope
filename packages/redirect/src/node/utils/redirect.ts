import {
  entries,
  fromEntries,
  isArray,
  isFunction,
  isLinkAbsolute,
  isLinkHttp,
  isPlainObject,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/helper/node";
import type { App, Page } from "vuepress/core";

import { normalizePath } from "./normalizePath.js";
import type { RedirectOptions } from "../options.js";
import type { RedirectPluginFrontmatterOption } from "../typings/index.js";

export const handleRedirectTo = (
  app: App,
  { hostname }: RedirectOptions,
): void => {
  const { base } = app.options;

  app.pages.forEach(({ frontmatter }) => {
    const { redirectTo } = <RedirectPluginFrontmatterOption>frontmatter;

    if (redirectTo) {
      const redirectUrl = normalizePath(
        isLinkAbsolute(redirectTo)
          ? `${
              hostname
                ? removeEndingSlash(
                    isLinkHttp(hostname) ? hostname : `https://${hostname}`,
                  )
                : ""
            }${base}${removeLeadingSlash(redirectTo)}`
          : redirectTo,
      );

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
  options: RedirectOptions,
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
              : [],
        )
        .flat(),
    ),
    ...fromEntries(
      entries(config).map(([from, to]) => [
        normalizePath(from),
        normalizePath(to),
      ]),
    ),
  };
};
