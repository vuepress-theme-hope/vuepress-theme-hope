import { type App, createPage } from "@vuepress/core";

import { type RedirectLocaleOptions } from "./options.js";

export const ensureRootHomePage = async (
  app: App,
  localeOptions: Required<RedirectLocaleOptions>
): Promise<void> => {
  if (
    // homepage not exists
    app.pages.every(({ path }) => path !== "/")
  ) {
    const availableLocales = app.pages
      .filter(({ pathLocale, path }) => pathLocale === path)
      .map(({ pathLocale }) => pathLocale);

    app.pages.push(
      await createPage(app, {
        path: "/",
        frontmatter: { title: "Home" },
        // set markdown content
        content: `\
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const { languages } = window.navigator;
  const { hash, origin } = window.location;
  const anchor = hash.substr(1);

  const localeConfig = ${JSON.stringify(localeOptions.localeConfig)};
  const availableLocales = ${JSON.stringify(availableLocales)};
  const defaultLocale = availableLocales.pop();

  let localePath = null;

  // get matched locale
  findLanguage:
    for (const lang of languages)
      for (const [path, langs] of Object.entries(localeConfig))
        if (langs.includes(lang)) {
${
  localeOptions.localeFallback
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
  const defaultLink = defaultLocale? \`\${origin}\${defaultLocale}\${anchor?\`#\${anchor}\`:""}\`: null;

  // a locale homepage exists
  if (localePath && availableLocales.includes(localePath)) {
    location.href = \`\${origin}\${localePath}\${anchor?\`#\${anchor}\`:""}\`;
  }
  // we have a default page
  else if (defaultLink) {
    location.href = defaultLink;
  }
  // no homepage? WTF, just go to 404
  else {
    location.href = \`\${origin}/404.html\`;
  }
})
</script>
`,
      })
    );
  }
};
