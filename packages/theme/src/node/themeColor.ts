import { App } from "@vuepress/core";
import { HopeThemeConfig } from "../shared";

export const writeThemeColorScss = async (
  app: App,
  themeConfig: HopeThemeConfig
): Promise<void> => {
  await app.writeTemp(
    "theme-hope/theme-color.scss",
    `$themeColorPicker: (${Object.entries(themeConfig.themeColor || {})
      .map(([color, value]) => `"${color}": ${value}`)
      .join(",")});`
  );
};
