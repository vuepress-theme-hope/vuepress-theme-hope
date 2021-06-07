/**
 * 合法的媒体
 *
 * media you can choose
 */
export type MediaType =
  | "Baidu"
  | "Bitbucket"
  | "Dingding"
  | "Discord"
  | "Dribbble"
  | "Email"
  | "Evernote"
  | "Facebook"
  | "Flipboard"
  | "Gitee"
  | "Github"
  | "Gitlab"
  | "Gmail"
  | "Instagram"
  | "Lines"
  | "Linkedin"
  | "Pinterest"
  | "Pocket"
  | "QQ"
  | "Qzone"
  | "Reddit"
  | "Rss"
  | "Steam"
  | "Twitter"
  | "Wechat"
  | "Weibo"
  | "Whatsapp"
  | "Youtube"
  | "Zhihu";

export type MediaLinksConfig = Record<MediaType, string>;
