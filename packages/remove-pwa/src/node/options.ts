export interface RemovePWAOptions {
  /**
   * Original service worker cache prefix
   *
   * 原始 service worker 缓存前缀
   *
   * @default "workbox"
   */
  cachePrefix?: string;

  /**
   * Original service worker location relative to dest folder
   *
   * 相对于 dest 文件夹的原始 service worker 位置
   *
   * @default "service-worker.js"
   */
  swLocation?: string;
}
