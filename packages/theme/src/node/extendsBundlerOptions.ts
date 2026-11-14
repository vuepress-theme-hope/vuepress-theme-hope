import type { RspackBundlerOptions } from "@vuepress/bundler-rspack";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import {
  addViteConfig,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  chainWebpack,
  getBundlerName,
} from "@vuepress/helper";
import { addRspackSassPalette } from "vuepress-shared";
import type { App } from "vuepress/core";

const VITE_DEFAULT_CONDITIONS = ["module", "browser", "development|production"];
const BUNDLER_DEFAULT_CONDITION_NAMES = ["browser", "import", "default"];

type RspackChain = Parameters<NonNullable<RspackBundlerOptions["chainRspack"]>>[0];

const chainRspackConfig = (
  bundlerOptions: unknown,
  app: App,
  chain: (config: RspackChain, isServer: boolean, isBuild: boolean) => void,
): void => {
  if (getBundlerName(app) !== "rspack") return;

  const options = bundlerOptions as RspackBundlerOptions;
  const originalChainRspack = options.chainRspack;

  options.chainRspack = (config, isServer, isBuild): void => {
    originalChainRspack?.(config, isServer, isBuild);
    chain(config, isServer, isBuild);
  };
};

export const extendsBundlerOptions = (bundlerOptions: unknown, app: App, custom = false): void => {
  addRspackSassPalette(bundlerOptions, app);

  addViteConfig(bundlerOptions, app, {
    build: {
      chunkSizeWarningLimit: 1024,
    },
  });

  if (custom) {
    const bundlerName = getBundlerName(app);

    if (bundlerName === "vite") {
      const defaultConditions =
        (((bundlerOptions as ViteBundlerOptions).viteOptions ??= {}).resolve ??= {}).conditions ??
        VITE_DEFAULT_CONDITIONS;
      const defaultSSRConditions =
        ((((bundlerOptions as ViteBundlerOptions).viteOptions ??= {}).ssr ??= {}).resolve ??= {})
          .conditions ?? VITE_DEFAULT_CONDITIONS;

      // oxlint-disable-next-line typescript/no-non-null-assertion
      (bundlerOptions as ViteBundlerOptions).viteOptions!.resolve!.conditions = [
        "hope-custom",
        ...defaultConditions,
      ];

      // oxlint-disable-next-line typescript/no-non-null-assertion
      (bundlerOptions as ViteBundlerOptions).viteOptions!.ssr!.resolve!.conditions = [
        "hope-custom",
        ...defaultSSRConditions,
      ];
    }

    chainWebpack(bundlerOptions, app, (config) => {
      if (config.resolve.conditionNames.values().length > 0)
        config.resolve.conditionNames.prepend("hope-custom");
      else config.resolve.conditionNames.merge(["hope-custom", ...BUNDLER_DEFAULT_CONDITION_NAMES]);
    });

    chainRspackConfig(bundlerOptions, app, (config) => {
      if (config.resolve.conditionNames.values().length > 0)
        config.resolve.conditionNames.prepend("hope-custom");
      else config.resolve.conditionNames.merge(["hope-custom", ...BUNDLER_DEFAULT_CONDITION_NAMES]);
    });
  }

  addViteOptimizeDepsInclude(bundlerOptions, app, "@vueuse/core", true);
  addViteOptimizeDepsExclude(bundlerOptions, app, "@theme-hope");
  addViteSsrNoExternal(bundlerOptions, app, ["@vuepress/helper", "vuepress-shared"]);
};
