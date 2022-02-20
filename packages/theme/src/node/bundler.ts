import {
  includeViteOptimizeDeps,
  addViteSsrNoExternal,
  excludeViteOptimizeDeps,
} from "@mr-hope/vuepress-shared";
import { handleWebpackOptions } from "./encrypt";

import { App } from "@vuepress/core";

export const updateBundlerOptions = (app: App): void => {
  includeViteOptimizeDeps(app, [
    "@vueuse/core",
    "bcryptjs",
    "body-scroll-lock",
    "lodash.throttle",
  ]);

  if (app.env.isDev)
    includeViteOptimizeDeps(app, [
      "@mr-hope/vuepress-shared/lib/client",
      "dayjs",
      "dayjs/plugin/localizedFormat",
      "dayjs/plugin/objectSupport",
      "dayjs/plugin/timezone",
      "dayjs/plugin/utc",
    ]);

  addViteSsrNoExternal(app, [
    "@mr-hope/vuepress-shared",
    "vuepress-theme-hope",
  ]);
  excludeViteOptimizeDeps(app, "vuepress-theme-hope");

  handleWebpackOptions(app);
};
