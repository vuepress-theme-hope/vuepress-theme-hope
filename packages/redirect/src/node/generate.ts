import { type App, type Page } from "@vuepress/core";
import {
  isArray,
  isFunction,
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/shared";
import { fs, path, withSpinner } from "@vuepress/utils";
import { entries, fromEntries, isAbsoluteUrl } from "vuepress-shared/node";

import { type RedirectOptions } from "./options.js";
import { type RedirectPluginFrontmatterOption } from "./typings/index.js";
import { getRedirectHTML } from "./utils.js";

export const generateHTML = async (
  app: App,
  options: RedirectOptions
): Promise<void> => {
  const {
    dir,
    options: { base },
    pages,
  } = app;

  const config = isFunction(options.config)
    ? options.config(app)
    : options.config || {};

  const redirectMap = fromEntries(
    (<Page<Record<string, never>, RedirectPluginFrontmatterOption>[]>pages)
      .map<[string, string][]>(({ frontmatter, path }) =>
        isArray(frontmatter.redirectFrom)
          ? frontmatter.redirectFrom.map((from) => [
              from.replace(/\/$/, "/index.html"),
              path,
            ])
          : frontmatter.redirectFrom
          ? [[frontmatter.redirectFrom.replace(/\/$/, "/index.html"), path]]
          : []
      )
      .flat()
  );

  const hostname = options.hostname
    ? isLinkHttp(options.hostname)
      ? removeEndingSlash(options.hostname)
      : `https://${removeEndingSlash(options.hostname)}`
    : "";

  await withSpinner("Generating redirect files")(() =>
    Promise.all(
      entries({ ...config, ...redirectMap }).map(([from, to]) => {
        const filePath = dir.dest(removeLeadingSlash(from));
        const redirectUrl = isAbsoluteUrl(to)
          ? `${hostname}${base}${removeLeadingSlash(to)}`
          : to;

        return fs
          .ensureDir(path.dirname(filePath))
          .then(() => fs.writeFile(filePath, getRedirectHTML(redirectUrl)));
      })
    )
  );
};
