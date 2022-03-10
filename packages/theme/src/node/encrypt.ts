import { logger } from "./utils";
import { hashSync } from "bcryptjs";

import type {
  WebpackBundlerOptions,
  WebpackConfiguration,
} from "@vuepress/bundler-webpack";
import type { App } from "@vuepress/core";
import type { HopeThemeEncryptOptions } from "../shared";

export const handleCrytoForWebpack = (app: App): void => {
  const { bundler, bundlerConfig } = app.options;

  // for webpack
  if (bundler.endsWith("webpack")) {
    const webpackBundlerConfig: WebpackBundlerOptions =
      bundlerConfig as WebpackBundlerOptions;
    const { configureWebpack } = webpackBundlerConfig;

    webpackBundlerConfig.configureWebpack = (
      config: WebpackConfiguration,
      isServer: boolean,
      isBuild: boolean
    ): WebpackConfiguration | void => {
      if (!config.resolve) config.resolve = {};

      config.resolve.fallback = { crypto: false, ...config.resolve.fallback };

      const result = configureWebpack?.(config, isServer, isBuild);

      if (result) return result;
    };
  }
};

export const resolveEncrypt = (encrypt: HopeThemeEncryptOptions): void => {
  // handle global token
  if (encrypt.admin)
    if (typeof encrypt.admin === "string")
      encrypt.admin = hashSync(encrypt.admin);
    else if (Array.isArray(encrypt.admin))
      encrypt.admin = encrypt.admin
        .map((globalToken) => {
          if (typeof globalToken === "string") return hashSync(globalToken);

          logger.error(`You config "themeConfig.encrypt.global", but your config is invalid. 

          All password MUST be string. But we found one’s type is ${typeof globalToken}. Please fix it!`);

          return null;
        })
        .filter((item): item is string => item !== null);
    else {
      logger.error(
        `You are asking for global encryption but you provide invalid "global" config. 
        
        Please check "global" in your "themeConfig.encrypt" config. It can be string or string[], but you are providing ${typeof encrypt.admin}. Please fix it!`
      );

      delete encrypt.admin;
    }

  const tokenConfig = encrypt.config || {};

  Object.keys(tokenConfig).forEach((key) => {
    const token = tokenConfig[key];

    if (typeof token === "string") tokenConfig[key] = hashSync(token);
    else if (Array.isArray(token))
      tokenConfig[key] = token
        .map((configToken) => {
          const hash = hashSync(configToken);

          if (typeof configToken === "string") return hash;

          logger.error(`You config "themeConfig.encrypt.config", but your config is invalid. 
        
Key ${key}’s value MUST be string or string[]. But it’s type is ${typeof configToken}. Please fix it!`);

          return null;
        })
        .filter((item): item is string => item !== null);
    else {
      logger.error(
        `[You config "themeConfig.encrypt.config", but your config is invalid. 
        
        The value of key ${key} MUST be string or string[]. But not it’s ${typeof token}. Please fix it!`
      );

      delete tokenConfig[key];
    }
  });
};
