import type { App } from "@vuepress/core";
import type { HopeThemeConfig } from "../shared";

export const prepareThemeColorScss = async (
  app: App,
  themeConfig: HopeThemeConfig
): Promise<void> => {
  await app.writeTemp(
    "theme-hope/theme-color.scss",
    `$picker: (${Object.entries(themeConfig.themeColor || {})
      .map(([color, value]) => `"${color}": ${value}`)
      .join(",")});`
  );
};
