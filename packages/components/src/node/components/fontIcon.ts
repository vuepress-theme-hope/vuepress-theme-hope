import { isArray, isLinkHttp, isString } from "@vuepress/shared";
import { endsWith } from "vuepress-shared/node";

import { type FontIconAssets } from "../options/index.js";
import { logger } from "../utils.js";

export const FONT_AWESOME_PREFIX = "fas fa-";

export const ICON_FONT_PREFIX = "iconfont icon-";

const isIconifyLink = (link: string): boolean =>
  /^(?:https:)?\/\/kit\.fontawesome\.com\//.test(link) ||
  /\/iconify-icon(?:[@/]|$)/.test(link);

const isFontAwesomeLink = (link: string): boolean =>
  /^(?:https:)?\/\/kit\.fontawesome\.com\//.test(link) ||
  link.includes("/@fortawesome/fontawesome-free/");

const isIconFontLink = (link: string): boolean =>
  /^(?:https:)?\/\/at\.alicdn\.com\/t\//.test(link);

export const isFontAwesomeAssets = (assets: FontIconAssets): boolean =>
  isArray(assets)
    ? assets.every(isFontAwesomeLink)
    : assets === "fontawesome" ||
      assets === "fontawesome-with-brands" ||
      isFontAwesomeLink(assets);

export const isIconFontAssets = (assets: FontIconAssets): boolean =>
  isArray(assets)
    ? assets.every(isIconFontLink)
    : assets === "iconfont" || isIconFontLink(assets);

export const isIconifyAssets = (assets: FontIconAssets): boolean =>
  isString(assets) && (isIconifyLink(assets) || assets === "iconify");

export const getIconInfo = (
  assets?: FontIconAssets,
  prefix?: string
): {
  type: "iconfont" | "iconify" | "fontawesome" | "custom";
  prefix: string;
} => {
  if (assets) {
    if (isFontAwesomeAssets(assets))
      return { type: "fontawesome", prefix: prefix ?? FONT_AWESOME_PREFIX };
    if (isIconFontAssets(assets))
      return { type: "iconfont", prefix: prefix ?? ICON_FONT_PREFIX };
    if (isIconifyAssets(assets))
      return { type: "iconify", prefix: prefix ?? "" };
  }

  return { type: "custom", prefix: prefix ?? "" };
};

export interface LinkInfo {
  type: "style" | "script";
  content: string;
}

const getFontAwesomeLink = (links: string[]): LinkInfo[] =>
  links.map((item) => ({
    type: "script",
    content: `\
useScriptTag(
  \`//cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/${item}.min.js\`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);
`,
  }));

export const getIconLink = (iconLink?: FontIconAssets): LinkInfo[] => {
  if (!iconLink) return [];

  if (iconLink === "fontawesome")
    return getFontAwesomeLink(["solid", "fontawesome"]);

  if (iconLink === "fontawesome-with-brands")
    return getFontAwesomeLink(["brands", "solid", "fontawesome"]);

  if (iconLink === "iconfont")
    return [
      {
        type: "style",
        content: `\
  useStyleTag(\`\\
  @import url("//at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css");
  \`);\
`,
      },
    ];

  if (iconLink === "iconify")
    return [
      {
        type: "script",
        content: `\
useScriptTag(
  \`//cdn.jsdelivr.net/npm/iconify-icon@1\`
);\
`,
      },
    ];

  return (isArray(iconLink) ? iconLink : [iconLink])
    .map((item) => {
      const actualLink = isLinkHttp(item) ? item : `//${item}`;

      if (endsWith(actualLink, ".css"))
        return {
          type: "style",
          content: `\
useStyleTag(\`\\
@import url("${actualLink}");
\`);\
`,
        };

      if (endsWith(actualLink, ".js"))
        return {
          type: "script",
          content: `\
useScriptTag(\`${actualLink}\`);\
`,
        };

      logger.error(`Can not recognize icon link: "${item}"`);

      return null;
    })
    .filter((item): item is LinkInfo => item !== null);
};
