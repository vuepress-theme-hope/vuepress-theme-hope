import { removeEndingSlash, removeLeadingSlash } from "@vuepress/shared";
import { fs, withSpinner } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { RedirectOptions } from "../shared";

const getHTML = (redirectUrl: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=${redirectUrl}">
  <link rel="canonical" href="${redirectUrl}">
  <title>Redirecting...</title>
  <script>
    const anchor=window.location.hash.substr(1);
    location.href=\`${redirectUrl}\${anchor?\`#\${anchor}\`:""}\`;
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>`;

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
          getHTML(redirectUrl)
        );
      })
    )
  );
};
