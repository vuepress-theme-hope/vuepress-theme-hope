import { type App, createPage } from "@vuepress/core";
import { removeEndingSlash } from "vuepress-shared/node";

import { type LocaleRedirectConfig } from "../shared/index.js";

export const ensureRootHomePage = async (
  app: App,
  localeOptions: LocaleRedirectConfig
): Promise<void> => {
  const {
    options: { base },
    pages,
  } = app;

  if (
    // homepage not exists
    pages.every(({ path }) => path !== "/")
  ) {
    const availableLocales = pages
      .filter(({ pathLocale, path }) => pathLocale === path)
      .map(({ pathLocale }) => pathLocale);

    pages.push(
      await createPage(app, {
        path: "/",
        frontmatter: { title: "Home" },
        // set markdown content
        content: `\
Redirecting to the correct locale...

<script setup>
import { onMounted } from "vue";

if(!__VUEPRESS_DEV__)
  onMounted(() => {
    const { languages } = window.navigator;
    const { hash, origin } = window.location;
    const anchor = hash.substring(1);

    const localeConfig = ${JSON.stringify(localeOptions.localeConfig)};
    const availableLocales = ${JSON.stringify(availableLocales)};
    const defaultLocale = availableLocales.pop();

    let matchedLocalePath = null;

    // get matched locale
    findLanguage:
      for (const lang of languages)
        for (const [localePath, langs] of Object.entries(localeConfig))
          if (langs.includes(lang)) {
  ${
    localeOptions.localeFallback
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
    )}\${defaultLocale}\${anchor? \`#\${anchor}\`: ""}\`: null;

    // a locale homepage exists
    if (matchedLocalePath && availableLocales.includes(matchedLocalePath)) {
      location.href = \`\${origin}${removeEndingSlash(
        base
      )}\${matchedLocalePath}\${anchor? \`#\${anchor}\`: ""}\`;
    }
    // we have a default page
    else if (defaultLink) {
      location.href = defaultLink;
    }
    // no homepage? WTF, just go to 404
    else {
      location.href = \`\${origin}${removeEndingSlash(base)}/404.html\`;
    }
  })
</script>
`,
      })
    );
  }
};
