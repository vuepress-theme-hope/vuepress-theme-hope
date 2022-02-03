import { mergeViteConfig } from "./vite";

import type { App } from "@vuepress/core";

/**
 * Add modules to Vite `optimizeDeps` list
 */
export const addViteOptimizeDeps = (
  app: App,
  module: string | string[]
): void => {
  if (app.options.bundler.endsWith("vite"))
    app.options.bundlerConfig.viteOptions = mergeViteConfig(
      app.options.bundlerConfig.viteOptions as Record<string, unknown>,
      {
        optimizeDeps: {
          include: typeof module === "string" ? [module] : module,
        },
      }
    );
};
