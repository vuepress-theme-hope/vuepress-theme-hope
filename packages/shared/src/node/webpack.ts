import type { App } from "@vuepress/core";
import type {
  WebpackChainConfig,
  WebpackBundlerOptions,
} from "@vuepress/bundler-webpack";

export interface WebpackCommonOptions {
  app: App;
  config: unknown;
}

export const chainWebpack = (
  { app, config }: WebpackCommonOptions,
  chainWebpack: (
    config: WebpackChainConfig,
    isServer: boolean,
    isBuild: boolean
  ) => void
): void => {
  const { bundler } = app.options;

  if (bundler.name.endsWith("webpack")) {
    const bundlerConfig = <WebpackBundlerOptions>config;
    const { chainWebpack: originalChainWebpack } = bundlerConfig;

    bundlerConfig.chainWebpack = (config, isServer, isBuild): void => {
      originalChainWebpack?.(config, isServer, isBuild);
      chainWebpack(config, isServer, isBuild);
    };
  }
};
