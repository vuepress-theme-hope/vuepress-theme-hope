import { isArray, isLinkHttp } from "@vuepress/shared";
import { logger } from "../utils.js";

const FONT_AWESOME_PREFIX = "fas fa-sm fa-fw fa-";

const ICON_FONT_PREFIX = "iconfont icon-";

const isFontAwesomeLink = (link: string): boolean =>
  /^(?:https:)?\/\/kit\.fontawesome\.com\//.test(link) ||
  link.includes("/@fortawesome/fontawesome-free/");

const isIconFontLink = (link: string): boolean =>
  /^(?:https:)?\/\/at\.alicdn\.com\/t\//.test(link);

export const getIconPrefix = (assets?: string | string[]): string => {
  if (Array.isArray(assets)) {
    if (assets.every(isFontAwesomeLink)) return FONT_AWESOME_PREFIX;
    if (assets.every(isIconFontLink)) return ICON_FONT_PREFIX;
  } else if (typeof assets === "string") {
    if (
      assets === "fontawesome" ||
      assets === "fontawesome-with-brands " ||
      isFontAwesomeLink(assets)
    )
      return FONT_AWESOME_PREFIX;

    if (
      assets === "iconfont" ||
      assets.match(/^(?:https:)?\/\/at\.alicdn\.com\/t\//)
    )
      return ICON_FONT_PREFIX;
  }

  return "";
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

export const getIconLink = (iconLink?: string[] | string): LinkInfo[] => {
  if (!iconLink) return [];

  if (iconLink === "fontawesome")
    return getFontAwesomeLink(["solid", "fontawesome"]);

  if (iconLink === "fontawesome-with-brands ")
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
