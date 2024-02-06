import type { ShareService } from "../../shared/index.js";

export interface ShareOptions {
  /**
   * Service to be enabled
   *
   * 需要被启用的服务
   */
  services: ShareService[];

  /**
   * Main content selector
   *
   * @description used to select page content
   *
   * 主要内容选择器
   *
   * @description 用于选择页面内容
   *
   * @default '.theme-default-content'
   */
  contentSelector?: string;

  /**
   * Your twitter twitter user name
   *
   * @description required when you are using twitter service
   *
   * 你的 twitter 用户名
   *
   * @description required when you are using twitter service
   */
  twitterUserName?: string;
}
