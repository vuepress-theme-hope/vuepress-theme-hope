import { Logger } from "vuepress-shared";

export const logger = new Logger("vuepress-plugin-components");

export const getIconPrefix = (iconAssetsLink = ""): string => {
  if (
    iconAssetsLink === "fontawesome" ||
    iconAssetsLink.match(/^(?:https:)?\/\/kit\.fontawesome\.com\//)
  )
    return "fas fa-";
  if (
    iconAssetsLink === "iconfont" ||
    iconAssetsLink.match(/^(?:https:)?\/\/at\.alicdn\.com\/t\//)
  )
    return "iconfont icon-";

  return "";
};
