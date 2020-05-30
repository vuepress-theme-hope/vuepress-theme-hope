import { HopeHeadOptionConfig, HopeVuepressConfig } from "../types";
import { HeadItem } from "@mr-hope/vuepress-types";

/** meta 键名 */
let metaKeys: string[];
/** link 键名 */
let linkKeys: string[];
/** 头部选项 */
let head: HeadItem[];

/**
 * 设置头部选项
 *
 * @param type 类型
 * @param name 名称
 * @param content 内容
 */
const setHeadOption = (
  type: "meta" | "link",
  name: string,
  content?: string
): void => {
  if (type === "meta") {
    if (!metaKeys.includes(name) && content)
      head.push(["meta", { name, content }]);
  } else if (type === "link" && !linkKeys.includes(name) && content)
    head.push(["link", { rel: name, href: content }]);
};

/**
 * 设置 PWA
 *
 * @param headOption 头部构建选项
 */
const setPWA = (headOption: HopeHeadOptionConfig): void => {
  if (headOption.pwa) {
    setHeadOption("link", "manifest", headOption.pwa.manifest);
    setHeadOption("meta", "theme-color", headOption.pwa.themeColor);

    setHeadOption("meta", "apple-mobile-web-app-capable", "yes");
    setHeadOption(
      "meta",
      "apple-mobile-web-app-status-bar-style",
      headOption.pwa.appleStatusBarColor
    );
    setHeadOption("link", "apple-touch-icon", headOption.pwa.appleIcon);

    setHeadOption(
      "meta",
      "msapplication-TileImage",
      headOption.pwa.msTileImage
    );
    setHeadOption(
      "meta",
      "msapplication-TileColor",
      headOption.pwa.msTileColor
    );
  }
};

/**
 * 处理头部选项
 *
 * @param config 项目配置
 */
const resolveHead = (config: HopeVuepressConfig): void => {
  if (!config.head) config.head = [];

  const { headOption = {}, themeConfig } = config;
  const metaHash: Record<string, number> = {};
  const linkHash: Record<string, number> = {};

  ({ head } = config);

  // Generate Hash for Head
  head.forEach((item, index) => {
    if (item[0] === "meta") metaHash[item[1].name] = index;
    else if (item[0] === "link") linkHash[item[1].rel] = index;
  });

  metaKeys = Object.keys(metaHash);
  linkKeys = Object.keys(linkHash);

  // 生成网站图标
  setHeadOption("link", "icon", headOption.icon);

  // 生成作者
  setHeadOption("meta", "author", themeConfig.author);

  // 加强移动端体验
  setHeadOption(
    "meta",
    "viewport",
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
  );

  // PWA 相关
  setPWA(headOption);
};

export default resolveHead;
