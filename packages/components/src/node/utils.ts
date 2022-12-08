import { Logger } from "vuepress-shared/node";

export const logger = new Logger("vuepress-plugin-components");

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
