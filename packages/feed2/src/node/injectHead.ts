import { getFilename } from "./options";
import { resolveUrl } from "./utils";

import type { App, HeadConfig } from "@vuepress/core";
import type { ResolvedFeedOptionsMap } from "./options";

export const injectLinkstoHead = (
  app: App,
  options: ResolvedFeedOptionsMap
): void => {
  const { base } = app.options;
  const { siteData } = app;
  const localePaths = Object.keys(options);

  // there is only one language, so we append it to siteData
  if (localePaths.length === 1) {
    const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
      getFilename(options["/"]);
    const { atom, json, rss, hostname } = options["/"];

    const getHeadItem = (
      name: string,
      fileName: string,
      type: string
    ): HeadConfig => {
      return [
        "link",
        {
          rel: "alternate",
          type,
          href: resolveUrl(hostname, base, fileName),
          title: `${
            siteData.title || siteData.locales["/"]?.title || ""
          } ${name} Feed`,
        },
      ];
    };

    // ensure head exists
    if (!siteData.head) siteData.head = [];

    // add atom link
    if (atom)
      siteData.head.push(
        getHeadItem("Atom", atomOutputFilename, "application/atom+xml")
      );

    // add json link
    if (json)
      siteData.head.push(
        getHeadItem("JSON", jsonOutputFilename, "application/json")
      );

    // add rss link
    if (rss)
      siteData.head.push(
        getHeadItem("RSS", rssOutputFilename, "application/rss+xml")
      );
  }
  // there are multiple languages, so we should append to page
  else
    app.pages.forEach((page) => {
      const { pathLocale } = page;
      const localeOptions = options[pathLocale]!;

      if (localePaths.includes(pathLocale)) {
        const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
          getFilename(localeOptions, pathLocale);

        const getHeadItem = (
          name: string,
          fileName: string,
          type: string
        ): HeadConfig => {
          return [
            "link",
            {
              rel: "alternate",
              type,
              href: resolveUrl(localeOptions.hostname, base, fileName),
              title: `${
                siteData.locales[pathLocale]?.title ||
                siteData.title ||
                siteData.locales["/"]?.title ||
                ""
              } ${name} Feed`,
            },
          ];
        };

        // ensure head exists
        if (!page.frontmatter.head) page.frontmatter.head = [];

        // add atom link
        if (localeOptions.atom)
          page.frontmatter.head.push(
            getHeadItem("Atom", atomOutputFilename, "application/atom+xml")
          );

        // add json link
        if (localeOptions.json)
          page.frontmatter.head.push(
            getHeadItem("JSON", jsonOutputFilename, "application/json")
          );

        // add rss link
        if (localeOptions.rss)
          page.frontmatter.head.push(
            getHeadItem("RSS", rssOutputFilename, "application/rss+xml")
          );
      }
    });
};
