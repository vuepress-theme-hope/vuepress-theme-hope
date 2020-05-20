import { Context, PluginOptionAPI, ThemeConfig } from "vuepress-types";
import { PageSeoInfo, SeoOptions } from "../types";
import { SeoContent } from "../types/seo";

/** 添加 Meta */
const getAddMeta = (meta: Record<string, string>[]) => (
  name: string,
  content: string,
  attribute = ["article:", "og:"].some((type) => name.startsWith(type))
    ? "property"
    : "name",
): void => {
  if (content) meta.push({ [attribute]: name, content });
};

/** 获取语言 */
const getLocales = ({ locale = {} }: ThemeConfig = {}): string[] => {
  const langs = [];
  for (const path in locale)
    if (locale[path].lang) langs.push(locale[path].lang);

  return langs;
};

// eslint-disable-next-line max-lines-per-function
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
      time = date,
      tag,
      tags = tag,
    },
    lastUpdatedTime,
  } = $page;
  const { author: themeAuthor, hostname = "" } = themeConfig;

  /** 页面类型 */
  const type = ["article", "category", "tag", "timeline"].some((folder) =>
    // 博客分类页面
    $page.regularPath.startsWith(`/${folder}`),
  )
    ? "website"
    : "article";
  /** 作者 */
  const author = pageAuthor === false ? "" : pageAuthor || themeAuthor || "";
  /** 更改时间 */
  const modifiedTime =
    typeof lastUpdatedTime === "number"
      ? new Date(lastUpdatedTime).toISOString()
      : "";
  /** 文章标签 */
  const articleTags: string[] = Array.isArray(tags)
    ? tags
    : typeof tag === "string"
    ? [tag]
    : [];

  return {
    "og:url": `${hostname}${path}`,
    "og:site_name": $site.title || "",
    "og:title": $page.title,
    "og:description": $page.frontmatter.description || "",
    "og:type": type,
    "og:image": image ? `${hostname}${image}` : "",
    "og:updated_time": modifiedTime,
    // eslint-disable-next-line no-underscore-dangle
    "og:locale": $page._computed.$lang,
    "og:locale:alternate": locale,

    "twitter:card": "summary_large_image",
    "twitter:image:alt": $site.title || "",

    "article:author": author,
    "article:tag": articleTags,
    "article:published_time": time ? new Date(time).toISOString() : "",
    "article:modified_time": modifiedTime,
  };
};

const appendMeta = (
  add: (name: string, content: string, attribute?: string) => void,
  content: SeoContent,
  options: SeoOptions,
): void => {
  // eslint-disable-next-line guard-for-in
  for (const property in content)
    switch (property) {
      case "article:tag":
        (content as any)["article:tag"].forEach((tag: string) =>
          add("article:tag", tag),
        );
        break;
      case "og:locale:alternate":
        content["og:locale:alternate"].forEach((locale: string) => {
          if (locale !== content["og:locale"])
            add("og:locale:alternate", locale);
        });
        break;
      default:
        add(property, (content as any)[property]);
    }

  if (options.restrictions) add("og:restrictions:age", options.restrictions);
  add("twitter:creator", options.twitterID);
};

export = (options: SeoOptions, context: Context): PluginOptionAPI => ({
  name: "seo",

  extendPageData($page): void {
    const $site = context.siteConfig;
    const meta = $page.frontmatter.meta || [];
    const addMeta = getAddMeta(meta);

    // In Vuepress core, permalinks are built after enhancers.
    const pageClone = Object.assign(
      Object.create(Object.getPrototypeOf($page)),
      $page,
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

  plugins: ["@mr-hope/last-update"],
});
