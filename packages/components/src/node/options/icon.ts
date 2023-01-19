type Link = `//${string}` | `http://${string}` | `https://${string}`;

export type FontIconAssets =
  | "iconfont"
  | "fontawesome"
  | "fontawesome-with-brands"
  | Link
  | Link[];

export interface FontIconOptions {
  /**
   * Link of font icon asset
   *
   * 字体图标资源链接
   *
   * @description `"iconfont"` and `"fontawesome"` keywords are supported
   */
  assets?: FontIconAssets;

  /**
   * Class prefix of font icon
   *
   * 字体图标的 Class 前缀
   *
   * @default ""
   */
  prefix?: string;
}
