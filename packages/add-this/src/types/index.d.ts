/** Add this 配置 */
export interface AddThisOptions {
  /**
   * Add This 的公开 ID
   *
   * Public ID for add this
   */
  pubid: string;
}

declare global {
  const PUB_ID: string;
}
