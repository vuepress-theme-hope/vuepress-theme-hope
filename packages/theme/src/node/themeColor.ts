import type { App } from "@vuepress/core";
import type { ThemeConfig } from "../shared/index.js";

export const prepareThemeColorScss = async (
  app: App,
  themeConfig: ThemeConfig
): Promise<void> => {
  await app.writeTemp(
    "theme-hope/theme-color.scss",
    `\
$picker: (${Object.entries(themeConfig.themeColor || {})
      .map(([color, value]) => `"${color}": ${value}`)
      .join(",")});
`
  );
};
