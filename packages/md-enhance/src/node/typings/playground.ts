import type { CompilerOptions } from "typescript";

export interface PlaygroundCodeConfig {
  /**
   * Code block extension
   *
   * @description It's based on filename, not code fence language
   *
   * 代码块扩展名
   *
   * @description 它基于文件名，而不是代码块语言
   */
  ext: string;

  /**
   * Code block content
   *
   * 代码块内容
   */
  content: string;
}

export interface PlaygroundData {
  /**
   * Title of Playground
   *
   * 交互演示标题
   */
  title?: string;

  /**
   * Import map file name
   *
   * Import map 文件名
   *
   * @default 'import-map.json'
   */
  importMap?: string;

  /**
   * Playground files info
   *
   * 交互演示文件信息
   */
  files: Record<
    /**
     * File name
     *
     * 文件名
     */
    string,
    /**
     * File detail
     *
     * 文件详情
     */
    PlaygroundCodeConfig
  >;

  /**
   * Playground settings
   *
   * @description It's parsed result of json content after setting directive
   *
   * 交互演示设置
   *
   * @description 它是设置指令后的 json 内容的解析结果
   */
  settings: Record<string, unknown>;

  /**
   * hash key based on playground content
   *
   * 根据交互演示内容生成的 hash key
   */
  key: string;
}

export interface PlaygroundOptions {
  /**
   * Playground container name
   *
   * 交互演示容器名
   */
  name: string;

  /**
   * Playground component name
   *
   * 交互演示组件名称
   *
   * @default 'Playground'
   */
  component?: string;

  /**
   * Props getter
   *
   * 属性获取器
   */
  propsGetter: (data: PlaygroundData) => Record<string, string>;
}

export interface TSPresetPlaygroundOptions extends CompilerOptions {
  /**
   * external playground service url
   *
   * 交互演示外部地址
   *
   * @default "https://www.typescriptlang.org/play"
   */
  service?: string;
}

export interface VuePresetPlaygroundOptions {
  /**
   * external playground service url
   *
   * 交互演示外部地址
   *
   * @default "https://sfc.vuejs.org/"
   */
  service?: string;

  /**
   * Whether to use dev version
   *
   * 是否启用开发版本
   *
   * @default false
   */
  dev?: boolean;

  /**
   * Whether to enable SSR
   *
   * 是否启用 SSR
   *
   * @default false
   */
  ssr?: boolean;
}
