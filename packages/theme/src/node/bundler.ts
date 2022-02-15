import { addViteOptimizeDeps } from "@mr-hope/vuepress-shared";
import { handleWebpackOptions } from "./encrypt";

import { App } from "@vuepress/core";

export const updateBundlerOptions = (app: App): void => {
  addViteOptimizeDeps(app, [
    "@vueuse/core",
    "bcryptjs",
    "body-scroll-lock",
    "lodash.throttle",
  ]);

  if (app.env.isDev)
    addViteOptimizeDeps(app, [
      "@mr-hope/vuepress-shared/lib/client",
      "dayjs",
      "dayjs/plugin/localizedFormat",
      "dayjs/plugin/objectSupport",
      "dayjs/plugin/timezone",
      "dayjs/plugin/utc",
    ]);

  handleWebpackOptions(app);
};
