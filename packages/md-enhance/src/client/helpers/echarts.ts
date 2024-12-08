import type { EChartsOption } from "echarts";

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

export const defineEChartsConfig = (config: EChartsConfig): void => {
  echartsConfig = config;
};

/** @deprecated: use defineEChartsConfig instead */
export const defineEchartsConfig = defineEChartsConfig;

export const useEChartsConfig = (): EChartsConfig => echartsConfig;
