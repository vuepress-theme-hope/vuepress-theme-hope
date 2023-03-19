import { Logger } from "vuepress-shared/node";

import { RedirectLocaleOptions } from "./options.js";

export const PLUGIN_NAME = "vuepress-plugin-redirect";

export const logger = new Logger(PLUGIN_NAME);

export const getLocaleRedirectHTML = (
  {
    config,
    default: defaultBehavior,
    fallback,
  }: Required<RedirectLocaleOptions>,
  availableLocales: string[]
): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <title>Redirecting...</title>
  <script>
    const { hash, origin, pathname } = window.location;
    const { languages } = window.navigator;
    const anchor = hash.substr(1);

    const localeConfig = ${JSON.stringify(config)};
    const availableLocales = ${JSON.stringify(availableLocales)};
    const defaultLocale = availableLocales.pop();
    const defaultBehavior = ${JSON.stringify(defaultBehavior)}

    let localePath = null;

    // get matched locale
    findLanguage:
      for (const lang of languages)
        for (const [path, langs] of Object.entries(localeConfig))
          if (langs.includes(lang)) {
${
  fallback
    ? `\
            if (!availableLocales.includes(path))
              continue;
`
    : ``
}\
            localePath = path;
            break findLanguage;
          }
    
    // default link
    const defaultLink = defaultLocale? \`\${origin}\${defaultLocale}\${pathname.substring(1)}\${anchor?\`#\${anchor}\`:""}\`: null;

    // a locale matches
    if (localePath) {
      const localeLink = \`\${origin}\${localePath}\${pathname.substring(1)}\${anchor?\`#\${anchor}\`:""}\`;

      if (availableLocales.includes(localePath)) {
        location.href = localeLink;
      }
      // the page does not exist
      else {
        // locale homepage
        if (defaultBehavior === "homepage") {
          location.href = \`\${origin}\${localePath}\`;
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
      location.href = \`\${origin}/404.html\`;
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
    const anchor = window.location.hash.substr(1);
    location.href = \`${redirectUrl}\${anchor?\`#\${anchor}\`:""}\`;
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
`;
