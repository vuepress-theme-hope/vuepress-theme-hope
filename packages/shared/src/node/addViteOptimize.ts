import { mergeConfig } from "vite";

import type { App } from "@vuepress/core";

export const addViteOptimizeDeps = (app: App, module: string): void => {
  if (app.options.bundler.endsWith("vite"))
    app.options.bundlerConfig.viteOptions = mergeConfig(
      app.options.bundlerConfig.viteOptions,
      { optimizeDeps: { include: [module] } }
    );
};
