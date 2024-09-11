import type { ShareService } from "../../shared/index.js";

export interface ShareOptions {
  /**
   * Service to be enabled
   *
   * 需要被启用的服务
   */
  services: ShareService[];

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
