import { fs, path } from "@vuepress/utils";
import type { Plugin } from "@vuepress/core";

export interface PaletteConfig {
  config?: string;
  palette?: string;
  style?: string;
}

const emptyFile = path.resolve(__dirname, "../styles/empty.scss");

export const palettePlugin: Plugin<PaletteConfig> = (
  {
    config = ".vuepress/styles/hope-config.scss",
    palette = ".vuepress/styles/hope-palette.scss",
    style = ".vuepress/styles/hope-style.scss",
  },
  app
) => {
  const userConfig = app.dir.source(config);
  const userPalette = app.dir.source(palette);
  const userStyle = app.dir.source(style);

  return {
    name: "palette",

    alias: {
      "@user/config": fs.pathExistsSync(userConfig) ? userConfig : emptyFile,
      "@user/palette": fs.pathExistsSync(userPalette) ? userPalette : emptyFile,
      "@user/style": fs.pathExistsSync(userStyle) ? userStyle : emptyFile,
      "@hope/config": path.resolve(__dirname, "../styles/config.scss"),
      "@hope/palette": path.resolve(__dirname, "../styles/palette.scss"),
      "@hope/style": path.resolve(__dirname, "../styles/style.scss"),
    },
  };
};

export default palettePlugin;
