export interface NoticeLocaleOptions {
  /**
   * Notice title
   *
   * 通知标题
   */
  title: string;

  /**
   * Notice content
   *
   * 通知内容
   */
  content: string;

  /**
   * Notice footer
   *
   * 通知操作
   */
  actions: {
    /**
     * Action text
     *
     * 操作文字
     */
    text: string;
    /**
     * Action link
     *
     * 操作链接
     */
    link?: string;
    /**
     * Action type
     *
     * 操作类型
     *
     * @default 'default
     */
    type?: "primary" | "default";
  }[];
}

export interface NoticeOptions {
  /**
   * Notice locales Options
   *
   * Notice 多语言选项
   */
  locales: Record<string, NoticeLocaleOptions>;

  /**
   * Notice key
   *
   * @description Used to identify and store the notice status
   *
   * Notice 的 key
   *
   * @description 用于标识和存储 notice 的状态
   */
  key?: string;

  /**
   * Whether show notice only once or show it in every visit
   *
   * @description If `key` is not provided, this option will be ignored
   *
   * 是否只显示一次通知
   *
   * @description 如果没有提供 `key`，此选项将被忽略
   *
   * @default false
   */
  showOnce?: string;

  /**
   * Whether the notice shall be confirmed
   *
   * 通知是否需要确认
   *
   * @default false
   */
  confirm?: boolean;

  /**
   * Whether the notice should appear fullscreen
   *
   * 通知是否应该全屏显示
   *
   * @default false
   */
  fullscreen?: boolean;
}
