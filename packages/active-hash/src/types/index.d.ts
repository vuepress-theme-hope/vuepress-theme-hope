export interface ActiveHashOptions {
  /**
   * Selector for header anchors
   */
  headerSelector: string;
  /**
   * Selector for active anchors
   *
   * @default '.sidebar-link'
   */
  activeSelecter: string;
  /**
   * Selector for theme container
   *
   * @default '.theme-default-content'
   */
  containerSelecter: string;
  /**
   * Header offset in px
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
