import { SitemapStream, streamToPromise } from "sitemap";
import type { App } from "vuepress/core";
import { removeLeadingSlash } from "vuepress-shared/node";

import { getSitemapInfos } from "./getInfo.js";
import type { SitemapOptions } from "./options.js";

export const getSiteMap = async (
  app: App,
  options: SitemapOptions,
): Promise<[path: string, content: string]> => {
  const { extraUrls = [], xmlNameSpace: xmlns } = options;
  const hostname = options.hostname;
  const sitemapFilename = options.sitemapFilename
    ? removeLeadingSlash(options.sitemapFilename)
    : "sitemap.xml";
  const sitemapXSLFilename = options.sitemapXSLFilename
    ? removeLeadingSlash(options.sitemapXSLFilename)
    : "sitemap.xsl";

  const {
    options: { base },
  } = app;

  const sitemapInfos = getSitemapInfos(app, options);

  const sitemapStream = new SitemapStream({
    hostname,
    ...(xmlns ? { xmlns } : {}),
  });

  sitemapInfos.forEach(([path, info]) =>
    sitemapStream.write({
      url: `${base}${removeLeadingSlash(path)}`,
      ...info,
    }),
  );

  extraUrls.forEach((item) =>
    sitemapStream.write({ url: `${base}${removeLeadingSlash(item)}` }),
  );

  sitemapStream.end();

  return streamToPromise(sitemapStream).then((data) => [
    sitemapFilename,
    data.toString().replace(
      '<?xml version="1.0" encoding="UTF-8"?>',
      `\
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${base}${sitemapXSLFilename}"?>
`,
    ),
  ]);
};
