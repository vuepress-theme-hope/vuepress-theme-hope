import { isArray, isLinkHttp } from "@vuepress/shared";
import { logger } from "../utils.js";

import type { FontIconAssets } from "../options/index.js";

export const FONT_AWESOME_PREFIX = "fas fa-";

export const ICON_FONT_PREFIX = "iconfont icon-";

const isFontAwesomeLink = (link: string): boolean =>
  /^(?:https:)?\/\/kit\.fontawesome\.com\//.test(link) ||
  link.includes("/@fortawesome/fontawesome-free/");

const isIconFontLink = (link: string): boolean =>
  /^(?:https:)?\/\/at\.alicdn\.com\/t\//.test(link);

export const isFrontAwesomeAssets = (assets: FontIconAssets): boolean =>
  isArray(assets)
    ? assets.every(isFontAwesomeLink)
    : assets === "fontawesome" ||
      assets === "fontawesome-with-brands" ||
      isFontAwesomeLink(assets);

export const isIconFontAssets = (assets: FontIconAssets): boolean =>
  isArray(assets)
    ? assets.every(isIconFontLink)
    : assets === "iconfont" || isIconFontLink(assets);

export const getIconInfo = (
  assets?: FontIconAssets,
  prefix?: string
): { type: "fontawesome" | "iconfont" | "custom"; prefix: string } => {
  if (assets) {
    if (isFrontAwesomeAssets(assets))
      return { type: "fontawesome", prefix: prefix ?? FONT_AWESOME_PREFIX };
    if (isIconFontAssets(assets))
      return { type: "iconfont", prefix: prefix ?? ICON_FONT_PREFIX };
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
  \`);`,
      },
    ];

  return (isArray(iconLink) ? iconLink : [iconLink])
    .map((item) => {
      const actualLink = isLinkHttp(item) ? item : `//${item}`;

      if (actualLink.endsWith(".css"))
        return {
          type: "style",
          content: `\
  useStyleTag(\`\\
  @import url("${actualLink}");
  \`);`,
        };

      if (actualLink.endsWith(".js"))
        return {
          type: "script",
          content: `\
useScriptTag(\`${actualLink}\`);
`,
        };

      logger.error(`Can not recognize icon link: "${item}"`);

      return null;
    })
    .filter((item): item is LinkInfo => item !== null);
};
