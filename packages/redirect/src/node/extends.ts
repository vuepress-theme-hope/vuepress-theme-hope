import { isLinkHttp, removeEndingSlash } from "@vuepress/shared";

import type { App, Page } from "@vuepress/core";
import type {
  RedirectOptions,
  RedirectPluginFrontmatterOption,
} from "../shared";

export const handleRedirect = (
  { frontmatter }: Page<Record<string, never>, RedirectPluginFrontmatterOption>,
  app: App,
  options: RedirectOptions
): void => {
  const { base } = app.options;

  const { redirectTo } = frontmatter;

  if (redirectTo) {
    const redirectUrl = (
      options.hostname && redirectTo.startsWith("/")
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
