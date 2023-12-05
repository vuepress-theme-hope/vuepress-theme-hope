import type { App } from "@vuepress/core";
import {
  addViteConfig,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
} from "vuepress-shared/node";

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
  addViteOptimizeDepsInclude(bundlerOptions, app, "@vueuse/core");
  addViteOptimizeDepsExclude(bundlerOptions, app, "@theme-hope");
  addViteSsrNoExternal(bundlerOptions, app, [
    "vuepress-shared",
    "vuepress-plugin-reading-time2",
  ]);
};
