import { mergeViteConfig } from "./mergeViteConfig";

import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";

/**
 * Add modules to Vite `optimizeDeps` list
 */
export const addViteOptimizeDeps = (
  app: App,
  module: string | string[]
): void => {
  if (app.options.bundler.endsWith("vite")) {
    const bundlerConfig: ViteBundlerOptions = app.options.bundlerConfig;

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions as Record<string, unknown>,
      {
        optimizeDeps: {
          include: typeof module === "string" ? [module] : module,
        },
      }
    );
  }
};

/**
 * Add modules to Vite `ssr.noExtrnal` list
 */
export const addViteSsrNoExternal = (
  app: App,
  module: string | string[]
): void => {
  if (app.options.bundler.endsWith("vite")) {
    const bundlerConfig: ViteBundlerOptions = app.options.bundlerConfig;

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions as Record<string, unknown>,
      {
        ssr: {
          noExternal: typeof module === "string" ? [module] : module,
        },
      }
    );
  }
};
