import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/shared";
import { fs, path, withSpinner } from "@vuepress/utils";
import { getRedirectHTML } from "../shared";

import type { App, Page } from "@vuepress/core";
import type {
  RedirectOptions,
  RedirectPluginFrontmatterOption,
} from "../shared";

export const generateHTML = async (
  app: App,
  options: RedirectOptions
): Promise<void> => {
  const {
    dir,
    options: { base },
    pages,
  } = app;

  const config =
    typeof options.config === "function"
      ? options.config(app)
      : options.config || {};

  const redirectMap = Object.fromEntries(
    (<Page<Record<string, never>, RedirectPluginFrontmatterOption>[]>pages)
      .map<[string, string][]>(({ frontmatter, path }) =>
        Array.isArray(frontmatter.redirectFrom)
          ? frontmatter.redirectFrom.map((from) => [from, path])
          : frontmatter.redirectFrom
          ? [[frontmatter.redirectFrom, path]]
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
      Object.entries({ ...config, ...redirectMap }).map(([from, to]) => {
        const filePath = dir.dest(removeLeadingSlash(from));
        const redirectUrl = to.startsWith("/")
          ? `${hostname}${base}${removeLeadingSlash(to)}`
          : to;

        return fs
          .ensureDir(path.dirname(filePath))
          .then(() => fs.writeFile(filePath, getRedirectHTML(redirectUrl)));
      })
    )
  );
};
