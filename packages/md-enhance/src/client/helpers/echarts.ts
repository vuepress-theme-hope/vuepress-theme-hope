import type { EChartsOption } from "echarts";
import type { App } from "vue";
import { inject } from "vue";

declare const __VUEPRESS_DEV__: boolean;

export interface EchartsConfig {
  /**
   * Echarts global options
   *
   * Echarts 全局选项
   */
  option?: EChartsOption;

  /**
   * Echarts setup function
   *
   * Echarts 初始化函数
   */
  setup?: () => Promise<void>;
}

let echartsConfig: EchartsConfig = {};

const echartsSymbol = Symbol(__VUEPRESS_DEV__ ? "echarts" : "");

export const defineEchartsConfig = (config: EchartsConfig): void => {
  echartsConfig = config;
};

export const useEchartsConfig = (): EchartsConfig => inject(echartsSymbol)!;

export const injectEchartsConfig = (app: App): void => {
  app.provide(echartsSymbol, echartsConfig);
};
