import { type ViteBundlerOptions } from "@vuepress/bundler-vite";
import { type App } from "@vuepress/core";
import { type RollupWarning } from "rollup";
import { getBundlerName, mergeViteConfig } from "vuepress-shared/node";

export const extendsBundlerOptions = (config: unknown, app: App): void => {
  if (getBundlerName(app) === "vite") {
    const bundlerConfig = <ViteBundlerOptions>config;

    const originalOnWarn =
      bundlerConfig.viteOptions?.build?.rollupOptions?.onwarn;

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions || {},
      {
        build: {
          rollupOptions: {
            onwarn(
              warning: RollupWarning,
              warn: (warning: RollupWarning) => void
            ) {
              if (
                warning.message.includes(
                  'is imported from external module "@vueuse/core" but never used in '
                ) ||
                warning.message.includes(
                  'is imported from external module "vuepress-shared/client" but never used in '
                )
              )
                return;

              originalOnWarn?.(warning, warn);
            },
          },
        },
      }
    );
  }
};
