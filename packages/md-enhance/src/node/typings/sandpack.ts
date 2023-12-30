import type { SandpackProps } from "sandpack-vue3";

export interface SandpackData
  extends Required<Pick<SandpackProps, "files">>,
    Omit<SandpackProps, "files"> {
  /**
   * Title of sandpack
   *
   * 交互演示标题
   */
  title?: string;

  /**
   * hash key based on sandpack content
   *
   * 根据交互演示内容生成的 hash key
   */
  key: string;
}
