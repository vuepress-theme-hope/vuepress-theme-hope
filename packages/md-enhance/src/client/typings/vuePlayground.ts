import type { SFCOptions } from "@vue/repl";

/**
 * Vue Playground options
 *
 * @description Vue playground is using [`@vue/repl`](https://github.com/vuejs/repl)
 *
 * Vue 交互演示配置
 *
 * @description Vue playground 使用 [`@vue/repl`](https://github.com/vuejs/repl)
 */
export interface VuePlaygroundOptions {
  /**
   * specify the version of vue
   *
   * 指定 vue 版本
   */
  vueVersion?: string;

  /**
   * specify default URL to import Vue runtime from in the sandbox
   *
   * 指定默认的 Vue 运行时
   *
   * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js"
   */
  defaultVueRuntimeURL?: string;

  /**
   * Specify default URL to import Vue Server Renderer from in the sandbox
   *
   * 指定默认的 Vue 服务端渲染器
   *
   * @default "https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js"
   */
  defaultVueServerRendererURL?: string;

  /**
   * Whether to enable repl's editor resizable
   *
   * 是否启用自动调整大小
   *
   * @default true
   */
  autoResize?: boolean;

  /**
   * Whether to show JS, CSS, SSR panel
   *
   * 是否显示 JS, CSS, SSR 面板
   *
   * @default false
   */
  showCompileOutput?: boolean;

  /**
   * Whether to show import map
   *
   * 是否显示 import map
   *
   * @default true
   */
  showImportMap?: boolean;

  /**
   * Whether to clear console
   *
   * 是否清空控制台
   *
   * @default false
   */
  clearConsole?: boolean;

  /**
   * Layout
   *
   * 布局
   *
   * @default "horizontal"
   */
  layout?: "horizontal" | "vertical";

  /**
   * Options to configure the `vue/compiler-sfc`
   *
   * `vue/compiler-sfc` 配置项
   */
  sfcOptions?: SFCOptions;

  /**
   * Whether to enable SSR
   *
   * 是否启用 SSR
   *
   * @default true
   */
  ssr?: boolean;
}
