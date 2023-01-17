import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";
import { Logger } from "vuepress-shared/node";
export const logger = new Logger("vuepress-plugin-components");

const __dirname = getDirname(import.meta.url);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client")
);

const isFontAwesomeLink = (link: string): boolean =>
  /^(?:https:)?\/\/kit\.fontawesome\.com\//.test(link) ||
  link.includes("@fortawesome/fontawesome-free");

export const getIconPrefix = (assets?: string | string[]): string => {
  if (typeof assets === "string") {
    if (assets === "fontawesome" || isFontAwesomeLink(assets)) return "fas fa-";

    if (
      assets === "iconfont" ||
      assets.match(/^(?:https:)?\/\/at\.alicdn\.com\/t\//)
    )
      return "iconfont icon-";
  }

  return "";
};
