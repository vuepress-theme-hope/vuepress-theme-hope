import { App } from "@vuepress/core";
import { HopeThemeConfig } from "../shared";

export const writeThemeColorScss = async (
  app: App,
  themeConfig: HopeThemeConfig
): Promise<void> => {
  const themeColorOptions = themeConfig.themeColor || {};

  let content = "$themeColorPicker: (";

  for (const color in themeColorOptions)
    content += `"${color}": ${themeColorOptions[color]},`;

  content += ");";

  await app.writeTemp("theme-hope/theme-color.scss", content);
};
