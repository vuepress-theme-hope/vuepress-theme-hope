export interface IncludeOptions {
  /**
   * handle include filePath
   *
   * 处理 include 文件路径
   *
   * @default (path) => path
   */
  getPath?: (path: string) => string;

  /**
   * Whether deep include files in included markdown files
   *
   * 是否深度导入包含的 markdown 文件
   *
   * @default false
   */
  deep?: boolean;

  /**
   * Whether resolve the image related path in the included markdown file
   *
   * 是否解析包含的 markdown 文件的里的相对图像路径
   *
   * @default true
   */
  resolveImagePath?: boolean;

  /**
   * Whether resolve the related file link path in the included markdown file
   *
   * 是否解析包含的 markdown 文件的里的文件相对路径
   *
   * @default true
   */
  resolveLinkPath?: boolean;
}
