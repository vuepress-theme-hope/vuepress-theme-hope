import { fs, path } from "@vuepress/utils";
import type { Plugin } from "@vuepress/core";

export interface PaletteConfig {
  config?: string;
  defaultConfig?: string;
  palette?: string;
  defaultPalette?: string;
  style?: string;
}

const emptyFile = path.resolve(__dirname, "../styles/empty.scss");

export const palettePlugin: Plugin<PaletteConfig> = (
  {
    config = ".vuepress/styles/hope-config.scss",
    defaultConfig = path.resolve(__dirname, "../styles/default/config.scss"),
    palette = ".vuepress/styles/hope-palette.scss",
    defaultPalette = path.resolve(__dirname, "../styles/default/palette.scss"),
    style = ".vuepress/styles/hope-style.scss",
  },
  app
) => {
  const userConfig = app.dir.source(config);
  const userPalette = app.dir.source(palette);
  const userStyle = app.dir.source(style);
  const getPath = (path: string): string =>
    fs.pathExistsSync(path) ? path : emptyFile;

  return {
    name: "@mr-hope/palette",

    alias: {
      "@hope/config": "@temp/hope/config.scss",
      "@hope/palette": "@temp/hope/palette.scss",
      "@hope/helper": path.resolve(__dirname, "../styles/helper.scss"),
      "@hope/style": getPath(userStyle),
    },

    async onPrepared(): Promise<void> {
      await app.writeTemp(
        "hope/config.scss",
        `
@import "${getPath(defaultPalette)}";
@import "${getPath(defaultConfig)}";
@import "${getPath(userPalette)}";
@import "${getPath(userConfig)}";
`
      );
      await app.writeTemp(
        "hope/palette.scss",
        `
@use 'sass:color';
@use 'sass:list';
@use 'sass:math';
@use 'sass:map';
@use 'sass:meta';

@use '@hope/helper';
@use '${getPath(defaultPalette)}' as defaultPalette;
@use '${getPath(palette)}' as palette;

$defaultVariables: meta.module-variables("defaultPalette");
$userVariables: meta.module-variables("palette");

$variables: map.deep-merge($defaultVariables, $userVariables);

@each $name, $value in $variables {
  $key: helper.camel-to-kebab($name);

  // simple length
  @if meta.type-of($value) == number or meta.type-of($value) == string {
    :root {
      #{$key}: #{$value};
    }
  } @else if helper.color-islegal($value) {
    @include helper.inject-color($key, $value, $darkSelector: "html.dark");
  }
}
`
      );
    },
  };
};

export default palettePlugin;
