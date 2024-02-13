import type { ReplProps } from "@vue/repl";

/**
 * Vue Playground options
 *
 * @description Vue playground is using [`@vue/repl`](https://github.com/vuejs/repl)
 *
 * Vue 交互演示配置
 *
 * @description Vue playground 使用 [`@vue/repl`](https://github.com/vuejs/repl)
 */
export interface VuePlaygroundOptions
  extends Omit<ReplProps, "store" | "editor"> {
  /**
   * Specify default URL to import Vue runtime from in the sandbox
   *
   * 指定默认的 Vue 运行时
   *
   * @default "https://unpkg.com/vue/dist/runtime-dom.esm-browser.js"
   */
  vueUrl?: string;

  /**
   * Specify the version of vue
   *
   * 指定 vue 版本
   */
  vueVersion?: string;
}
