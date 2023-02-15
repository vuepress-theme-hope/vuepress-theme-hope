export type ShareAction = "open" | "navigate" | "popup" | "qrcode";

// TODO: complete
export type BuiltInShareService =
  | "baidu"
  | "buffer"
  | "douban"
  | "evernote"
  | "facebook"
  | "flipboard"
  | "line"
  | "qq"
  | "qrcode"
  | "reddit"
  | "skype"
  | "telegram"
  | "twitter"
  | "whatsapp"
  | "weibo";

export type ShareServiceVariableName =
  | "title"
  | "description"
  | "url"
  | "excerpt"
  | "summary"
  | "tags"
  | "cover"
  | "image"
  | "twitterUserName";

export interface ShareServiceConfig {
  /**
   * Share link
   *
   * @description You can use `[` and `]` to wrap the variable name, and the variable will be replaced with the value of the page.:
   *
   * - `title` will be replaced with the title of the page
   * - `description` will be replaced with the description of the page
   * - `url` will be replaced with the url of the page
   * - `excerpt` will be replaced with the excerpt of the page
   * - `summary` will be replaced with the summary of the page
   * - `tags` will be replaced with the tags of the page
   * - `cover` will be replaced with the cover/banner of the page
   * - `image` will be replaced with the first image of the page
   */
  link: string;

  params?: Record<string, string>;

  /**
   * Action of share button
   *
   * @description
   * - `open` will open the link in a new tab
   * - `navigate` will navigate to the link
   * - `popup` will open a popup window
   * - `qrcode` will show a QR code with link
   *
   * @default "open"
   */
  action?: ShareAction;

  /**
   * Theme color of icon
   *
   * @default 'currentColor'
   */
  color?: string;

  /**
   * Plain icon shape
   */
  shape: string;

  /**
   * Colorful icon
   *
   * @default shape
   */
  icon?: string;
}

export interface ShareServiceOptions extends ShareServiceConfig {
  /**
   * Service name
   *
   * 服务名称
   */
  name: string;
}

export type ShareService = BuiltInShareService | ShareServiceOptions;
