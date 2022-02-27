import { mergeViteConfig } from "./mergeViteConfig";

import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";

/**
 * Add modules to Vite `optimizeDeps.include` list
 */
export const addViteOptimizeDepsInclude = (
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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    bundlerConfig.viteOptions.optimizeDeps!.include = Array.from(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      new Set(bundlerConfig.viteOptions.optimizeDeps!.include)
    );
  }
};

/**
 * Add modules to Vite `optimizeDeps.exclude` list
 */
export const addViteOptimizeDepsExclude = (
  app: App,
  module: string | string[]
): void => {
  if (app.options.bundler.endsWith("vite")) {
    const bundlerConfig: ViteBundlerOptions = app.options.bundlerConfig;

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions as Record<string, unknown>,
      {
        optimizeDeps: {
          exclude: typeof module === "string" ? [module] : module,
        },
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    bundlerConfig.viteOptions.optimizeDeps!.exclude = Array.from(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      new Set(bundlerConfig.viteOptions.optimizeDeps!.exclude)
    );
  }
};

/**
 * Add modules to Vite `ssr.external` list
 */
export const addViteSsrExternal = (
  app: App,
  module: string | string[]
): void => {
  if (app.options.bundler.endsWith("vite")) {
    const bundlerConfig: ViteBundlerOptions = app.options.bundlerConfig;

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions as Record<string, unknown>,
      {
        ssr: {
          external: typeof module === "string" ? [module] : module,
        },
      }
    );
  }
};

/**
 * Add modules to Vite `ssr.noExternal` list
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
