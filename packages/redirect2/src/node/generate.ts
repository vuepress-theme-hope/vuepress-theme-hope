import { removeEndingSlash, removeLeadingSlash } from "@vuepress/shared";
import { fs, withSpinner } from "@vuepress/utils";
import { getRedirectHTML } from "../shared";

import type { App } from "@vuepress/core";
import type { RedirectOptions } from "../shared";

export const generateHTML = async (
  app: App,
  options: RedirectOptions
): Promise<void> => {
  const {
    dir,
    options: { base },
  } = app;

  const config =
    typeof options.config === "function"
      ? options.config(app)
      : options.config || {};

  const hostname = options.hostname ? removeEndingSlash(options.hostname) : "";

  await withSpinner("Generating redirect files")(() =>
    Promise.all(
      Object.entries(config).map(([from, to]) => {
        const redirectUrl = to.startsWith("/")
          ? `${hostname}${base}${removeLeadingSlash(to)}`
          : to;

        return fs.writeFile(
          dir.dest(removeLeadingSlash(from)),
          getRedirectHTML(redirectUrl)
        );
      })
    )
  );
};
