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
}
