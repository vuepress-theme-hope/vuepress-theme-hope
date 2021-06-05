import { fs } from "@vuepress/utils";
import type { Plugin } from "@vuepress/core";

export const palettePlugin: Plugin<never> = (_, app) => {
  const userPalette = app.dir.source(".vuepress/styles/hope-palette.scss");
  const userStyle = app.dir.source(".vuepress/styles/hope.scss");
  const tempPaletteFile = "styles/hope-palette.scss";
  const tempStyleFile = "styles/hope.scss";
  const importCode = (filePath: string): string => `@forward '${filePath}';\n`;

  return {
    name: "palette",

    alias: {
      "@mr-hope/vuepress-palette": app.dir.temp(tempPaletteFile),
      "@mr-hope/vuepress-style": app.dir.temp(tempStyleFile),
    },

    onPrepared: async (): Promise<void> => {
      let paletteContent = importCode(
        "@mr-hope/vuepress-plugin-palette/palette"
      );
      let styleContent = importCode("@mr-hope/vuepress-plugin-palette/styles");

      if (await fs.pathExists(userPalette)) {
        paletteContent += importCode(userPalette);
      }

      if (await fs.pathExists(userStyle)) {
        styleContent += importCode(userStyle);
      }

      await app.writeTemp(tempPaletteFile, paletteContent);
      await app.writeTemp(tempStyleFile, styleContent);
    },
  };
};

export default palettePlugin;
