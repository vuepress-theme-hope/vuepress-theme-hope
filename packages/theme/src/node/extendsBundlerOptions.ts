import {
  addViteConfig,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  chainWebpack,
} from "@vuepress/helper";
import type { App } from "vuepress/core";

/**
 * @private
 */
export const extendsBundlerOptions = (
  bundlerOptions: unknown,
  app: App,
): void => {
  addViteConfig(bundlerOptions, app, {
    build: {
      chunkSizeWarningLimit: 1024,
    },
  });
  addViteOptimizeDepsInclude(bundlerOptions, app, "@vueuse/core", true);
  addViteOptimizeDepsExclude(bundlerOptions, app, "@theme-hope");
  addViteSsrNoExternal(bundlerOptions, app, [
    "@vuepress/helper",
    "@vuepress/plugin-reading-time",
    "vuepress-shared",
  ]);
  chainWebpack(bundlerOptions, app, (config) => {
    config.module
      .rule("scss")
      .use("sass-loader")
      .tap((options) => ({
        api: "modern-compiler",
        ...options,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sassOptions: {
          silenceDeprecations: ["mixed-decls"],
          ...options["sassOptions"],
        },
      }));
  });
};
