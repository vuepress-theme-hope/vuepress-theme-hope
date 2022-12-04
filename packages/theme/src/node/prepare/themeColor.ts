import type { App } from "@vuepress/core";
import type { ThemeData } from "../../shared/index.js";

export const prepareThemeColorScss = async (
  app: App,
  themeData: ThemeData
): Promise<void> => {
  await app.writeTemp(
    "theme-hope/theme-color.scss",
    `\
$picker: (${Object.entries(themeData.themeColor || {})
      .map(([color, value]) => `"${color}": ${value}`)
      .join(",")});
`
  );
};
