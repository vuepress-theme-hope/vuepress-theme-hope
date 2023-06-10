import type { ComponentGlobalOptions } from "./global.js";
import type { ComponentLocaleOptions } from "./locales.js";
import type { AvailableComponent } from "./name.js";
import type { RootComponentOptions } from "./root.js";

export interface ComponentOptions {
  /**
   * Components to be registered
   *
   * 需要被注册的组件
   *
   * @default []
   */
  components?: AvailableComponent[];

  /**
   * Global config for components
   *
   * 组件全局配置
   */
  componentOptions?: ComponentGlobalOptions;

  /**
   * Root config for components
   *
   * 根组件配置
   */
  rootComponents?: RootComponentOptions;

  /**
   * Component Locales
   *
   * 组件多语言
   */
  locales?: ComponentLocaleOptions;
}
