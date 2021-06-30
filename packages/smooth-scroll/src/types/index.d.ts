export interface SmoothScrollOptions {
  /**
   * Delay before scrolling to current haash
   *
   * @default 0
   */
  delay: number;
}

declare global {
  declare const SMOOTH_SCROLL_DELAY: number;
}
