export interface ActiveHashOptions {
  /**
   * Selector for header anchors
   *
   * 标题锚点的选择器
   *
   * @default ".header-anchor"
   */
  headerAnchorSelector: string;
  /**
   * Selector for active anchors
   *
   * 需要激活锚点的选择器
   *
   * @default ".sidebar-link"
   */
  activeLinkSelecter: string;
  /**
   * Selector for theme content container
   *
   * 主题内容容器的选择器
   *
   * @default ".theme-default-content"
   */
  containerSelecter: string;
  /**
   * Addtional offset for anchor position, used to make sure the anchor is aligned perfectly.
   *
   * 用于锚点位置额外的偏移，用于精准对其标题锚点
   *
   * @default 0
   */
  offset?: number;
}

declare global {
  declare const ACTIVE_HASH_ACTIVE_SELECTOR: string;
  declare const ACTIVE_HASH_CONTAINER_SELECTOR: string;
  declare const ACTIVE_HASH_HEADER_SELECTOR: string;
  declare const ACTIVE_HASH_OFFSET: number;
}
