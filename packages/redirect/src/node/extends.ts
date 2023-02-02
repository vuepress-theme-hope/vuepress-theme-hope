import { type App, type Page } from "@vuepress/core";
import { isLinkHttp, removeEndingSlash } from "@vuepress/shared";
import { isAbsoluteUrl } from "vuepress-shared/node";

import { type RedirectOptions } from "./options.js";
import { type RedirectPluginFrontmatterOption } from "./typings/index.js";

export const handleRedirect = (
  { frontmatter }: Page<Record<string, never>, RedirectPluginFrontmatterOption>,
  app: App,
  options: RedirectOptions
): void => {
  const { base } = app.options;

  const { redirectTo } = frontmatter;

  if (redirectTo) {
    const redirectUrl = (
      options.hostname && isAbsoluteUrl(redirectTo)
        ? `${
            isLinkHttp(options.hostname)
              ? removeEndingSlash(options.hostname)
              : `https://${removeEndingSlash(options.hostname)}`
          }${base}${redirectTo}`
        : redirectTo
    )
      .replace(/\.md$/, ".html")
      .replace(/\/(README|index)\.html/, "/");

    // ensure head config
    if (!frontmatter.head) frontmatter.head = [];

    frontmatter.head.unshift([
      "script",
      {},
      `{
  const anchor=window.location.hash.substr(1);
  location.href=\`${redirectUrl}\${anchor?\`#\${anchor}\`:""}\`;
}`,
    ]);
  }
};
