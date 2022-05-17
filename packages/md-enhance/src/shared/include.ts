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
}
