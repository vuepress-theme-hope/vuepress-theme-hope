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

    // FIXME: hide sass deprecation warning for mixed-decls
    css: {
      preprocessorOptions: {
        sass: {
          silenceDeprecations: ["mixed-decls"],
        },
        scss: {
          silenceDeprecations: ["mixed-decls"],
        },
      },
    },
  });
  addViteOptimizeDepsInclude(bundlerOptions, app, "@vueuse/core", true);
  addViteOptimizeDepsExclude(bundlerOptions, app, "@theme-hope");
  addViteSsrNoExternal(bundlerOptions, app, [
    "@vuepress/helper",
    "@vuepress/plugin-reading-time",
    "vuepress-shared",
  ]);

  // FIXME: hide sass deprecation warning for mixed-decls
  chainWebpack(bundlerOptions, app, (config) => {
    config.module
      .rule("scss")
      .use("sass-loader")
      .tap((options) => ({
        ...options,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sassOptions: {
          silenceDeprecations: ["mixed-decls"],
          ...options["sassOptions"],
        },
      }));
  });
};
