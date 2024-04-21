import type { EChartsOption } from "echarts";
import type { App } from "vue";
import { inject } from "vue";

declare const __VUEPRESS_DEV__: boolean;

export interface EChartsConfig {
  /**
   * ECharts global options
   *
   * ECharts 全局选项
   */
  option?: EChartsOption;

  /**
   * ECharts setup function
   *
   * ECharts 初始化函数
   */
  setup?: () => Promise<void>;
}

let echartsConfig: EChartsConfig = {};

const echartsSymbol = Symbol(__VUEPRESS_DEV__ ? "echarts" : "");

export const defineEChartsConfig = (config: EChartsConfig): void => {
  echartsConfig = config;
};

/** @deprecated: use defineEChartsConfig instead */
export const defineEchartsConfig = defineEChartsConfig;

export const useEChartsConfig = (): EChartsConfig => inject(echartsSymbol)!;

export const injectEChartsConfig = (app: App): void => {
  app.provide(echartsSymbol, echartsConfig);
};
