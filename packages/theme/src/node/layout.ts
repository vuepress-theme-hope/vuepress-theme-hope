import { path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { HopeThemePluginsOptions } from "../shared";

export const getLayoutConfig = (
  app: App,
  plugins: HopeThemePluginsOptions
): Record<string, string> => {
  const layoutConfig: Record<string, string> = {
    Layout: path.resolve(__dirname, "../client/layouts/Layout.js"),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    404: path.resolve(__dirname, "../client/layouts/404.js"),
  };

  if (
    plugins.mdEnhance &&
    (plugins.mdEnhance.enableAll || plugins.mdEnhance.presentation)
  )
    layoutConfig["Slide"] = path.resolve(
      __dirname,
      "../client/layouts/Slide.js"
    );

  if (plugins.blog)
    layoutConfig["Blog"] = path.resolve(
      __dirname,
      "../client/module/blog/layouts/Blog.js"
    );

  if (app.env.isDebug) console.log("Theme layout config:", layoutConfig);

  return layoutConfig;
};
