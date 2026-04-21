import type { SandpackOptions, SandpackPredefinedTemplate, SandpackSetup } from "sandpack-vue3";

/**
 * Sandpack config
 *
 * Sandpack is using [`sandpack-vue3`](https://github.com/jerrywu001/sandpack-vue3)
 *
 * Sandpack 交互演示配置
 *
 * Sandpack 使用 [`sandpack-vue3`](https://github.com/jerrywu001/sandpack-vue3)
 */
export interface SandpackConfig {
  /**
   * Specify the template
   *
   * 指定模板
   */
  template?: SandpackPredefinedTemplate;

  /**
   * Options to configure the sandpack
   *
   * Sandpack 配置项
   */
  options?: SandpackOptions;

  /**
   * Options to configure the customSetup
   *
   * Sandpack customSetup 配置项
   */
  customSetup?: SandpackSetup;
}
