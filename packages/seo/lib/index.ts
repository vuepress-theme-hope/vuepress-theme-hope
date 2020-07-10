import {
  Context,
  PluginOptionAPI,
  ThemeConfig,
  Page,
} from "@mr-hope/vuepress-types";
import { PageSeoInfo, SeoOptions } from "../types";
import { SeoContent, ArticleSeoContent } from "../types/seo";

const getAddMeta = (meta: Record<string, string>[]) => (
  name: string,
  content: string,
  attribute = ["article:", "og:"].some((type) => name.startsWith(type))
    ? "property"
    : "name"
): void => {
  if (content) meta.push({ [attribute]: name, content });
};

const getLocales = ({ locales = {} }: ThemeConfig): string[] => {
  const langs: string[] = [];
  for (const path in locales)
    if (locales[path].lang) langs.push(locales[path].lang as string);

  return langs;
};

const defaultSeo = ({
  $page,
  $site,
  locale,
  path,
  themeConfig,
}: PageSeoInfo): SeoContent => {
  const {
    frontmatter: {
      author: pageAuthor,
      date,
      image,
      time = date as Date,
      tag,
      tags = tag as string[],
    },
    lastUpdatedTime,
  } = $page;
  const { author: themeAuthor, hostname = "" } = themeConfig;

  const type = ["article", "category", "tag", "timeline"].some((folder) =>
    $page.regularPath.startsWith(`/${folder}`)
  )
    ? "website"
    : "article";
  const author =
    pageAuthor === false ? "" : (pageAuthor as string) || themeAuthor || "";
  const modifiedTime =
    typeof lastUpdatedTime === "number"
      ? new Date(lastUpdatedTime).toISOString()
      : "";
  const articleTags: string[] = Array.isArray(tags)
    ? (tags as string[])
    : typeof tag === "string"
    ? [tag]
    : [];

  return {
    "og:url": `${hostname}${path}`,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "og:site_name": $site.title || "",
    "og:title": $page.title,
    "og:description": $page.frontmatter.description || "",
    "og:type": type,
    "og:image": image ? `${hostname}${image as string}` : "",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "og:updated_time": modifiedTime,
    // eslint-disable-next-line no-underscore-dangle
    "og:locale": $page._computed.$lang,
    "og:locale:alternate": locale,

    "twitter:card": "summary_large_image",
    "twitter:image:alt": $site.title || "",

    "article:author": author,
    "article:tag": articleTags,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "article:published_time": time ? new Date(time).toISOString() : "",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "article:modified_time": modifiedTime,
  };
};

const appendMeta = (
  add: (name: string, content: string, attribute?: string) => void,
  content: SeoContent,
  options: SeoOptions
): void => {
  // eslint-disable-next-line guard-for-in
  for (const property in content)
    switch (property) {
      case "article:tag":
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (content as ArticleSeoContent)["article:tag"]!.forEach((tag: string) =>
          add("article:tag", tag)
        );
        break;
      case "og:locale:alternate":
        content["og:locale:alternate"].forEach((locale: string) => {
          if (locale !== content["og:locale"])
            add("og:locale:alternate", locale);
        });
        break;
      default:
        // eslint-disable-next-line
        add(property, (content as any)[property]);
    }

  if (options.restrictions) add("og:restrictions:age", options.restrictions);
  add("twitter:creator", options.twitterID);
};

export = (options: SeoOptions, context: Context): PluginOptionAPI => ({
  name: "seo",

  extendPageData($page): void {
    const $site = context.getSiteData();
    const meta = $page.frontmatter.meta || [];
    const addMeta = getAddMeta(meta);

    // In Vuepress core, permalinks are built after enhancers.
    const pageClone = Object.assign(
      Object.create(Object.getPrototypeOf($page)) as Page,
      $page
    );
    pageClone.buildPermalink();

    const pageSeoInfo: PageSeoInfo = {
      $page,
      $site,
      themeConfig: $site.themeConfig || {},
      locale: getLocales($site.themeConfig),
      path: pageClone.path,
    };
    const metaContext: SeoContent = {
      ...defaultSeo(pageSeoInfo),
      ...(options.seo ? options.seo(pageSeoInfo) : {}),
    };

    appendMeta(addMeta, metaContext, options);
    if (options.customMeta) options.customMeta(meta, pageSeoInfo);

    $page.frontmatter.meta = meta;
  },

  plugins: ["@mr-hope/last-update", ["@vuepress/last-updated", false]],
});
