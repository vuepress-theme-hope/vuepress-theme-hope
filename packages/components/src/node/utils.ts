import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";
import { Logger } from "vuepress-shared/node";
export const logger = new Logger("vuepress-plugin-components");

const __dirname = getDirname(import.meta.url);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client")
);

export const getIconPrefix = (assets = ""): string => {
  if (
    assets === "fontawesome" ||
    assets.match(/^(?:https:)?\/\/kit\.fontawesome\.com\//)
  )
    return "fas fa-";
  if (
    assets === "iconfont" ||
    assets.match(/^(?:https:)?\/\/at\.alicdn\.com\/t\//)
  )
    return "iconfont icon-";

  return "";
};
