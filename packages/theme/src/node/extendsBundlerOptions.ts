import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import {
  addViteConfig,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  chainWebpack,
  getBundlerName,
} from "@vuepress/helper";
import type { App } from "vuepress/core";

const VITE_DEFAULT_CONDITIONS = ["module", "browser", "development|production"];
const WEBPACK_DEFAULT_CONDITION_NAMES = ["browser", "import", "default"];

/**
 * @private
 */
export const extendsBundlerOptions = (
  bundlerOptions: unknown,
  app: App,
  custom = false,
): void => {
  addViteConfig(bundlerOptions, app, {
    build: {
      chunkSizeWarningLimit: 1024,
    },
  });

  if (custom) {
    const bundlerName = getBundlerName(app);

    if (bundlerName === "vite") {
      const defaultConditions =
        (((bundlerOptions as ViteBundlerOptions).viteOptions ??= {}).resolve ??=
          {}).conditions ?? VITE_DEFAULT_CONDITIONS;
      const defaultSSRConditions =
        ((((bundlerOptions as ViteBundlerOptions).viteOptions ??= {}).ssr ??=
          {}).resolve ??= {}).conditions ?? VITE_DEFAULT_CONDITIONS;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (bundlerOptions as ViteBundlerOptions).viteOptions!.resolve!.conditions =
        ["custom", ...defaultConditions];

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (
        bundlerOptions as ViteBundlerOptions
      ).viteOptions!.ssr!.resolve!.conditions = [
        "custom",
        ...defaultSSRConditions,
      ];
    }

    chainWebpack(bundlerOptions, app, (config) => {
      const conditionNames =
        (config.resolve.get("conditionNames") as string[] | undefined) ??
        WEBPACK_DEFAULT_CONDITION_NAMES;

      config.resolve.set("conditionNames", ["custom", ...conditionNames]);
    });
  }

  addViteOptimizeDepsInclude(bundlerOptions, app, "@vueuse/core", true);
  addViteOptimizeDepsExclude(bundlerOptions, app, "@theme-hope");
  addViteSsrNoExternal(bundlerOptions, app, [
    "@vuepress/helper",
    "vuepress-shared",
  ]);
};
