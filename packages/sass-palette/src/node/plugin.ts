import { fs, path } from "@vuepress/utils";

import type { App, Plugin, PluginConfig } from "@vuepress/core";
import type { SassPaletteOptions } from "../shared";

const emptyFile = path.resolve(__dirname, "../../styles/empty.scss");

const writeLoadFile = (app: App, id: string): void => {
  const loadFilePath = app.dir.temp(`palette/load-${id}.js`);

  if (!fs.pathExistsSync(loadFilePath)) fs.createFileSync(loadFilePath);

  fs.writeFileSync(
    app.dir.temp(`palette/load-${id}.js`),
    `
export default ()=>{
  import("@${id}/palette");
};
`
  );
};

export const sassPalettePlugin: Plugin<SassPaletteOptions> = (
  {
    id = "hope",
    config = `.vuepress/styles/${id}-config.scss`,
    defaultConfig = path.resolve(__dirname, "../../styles/default/config.scss"),
    palette = `.vuepress/styles/${id}-palette.scss`,
    defaultPalette = path.resolve(
      __dirname,
      "../../styles/default/palette.scss"
    ),
    style = `.vuepress/styles/${id}-style.scss`,
  },
  app
) => {
  const userConfig = app.dir.source(config);
  const userPalette = app.dir.source(palette);
  const userStyle = app.dir.source(style);
  const getPath = (path: string): string =>
    fs.pathExistsSync(path) ? path : emptyFile;

  // we are using this file as clientAppEnhanceFile, so we must create and write it here
  writeLoadFile(app, id);

  return {
    name: `vuepress-plugin-sass-palette?${id}`,

    multiple: true,

    alias: {
      [`@${id}/palette`]: app.dir.temp(`palette/${id}-palette.scss`),
      [`@${id}/config`]: app.dir.temp(`palette/${id}-config.scss`),
      [`@${id}/helper`]: path.resolve(__dirname, "../../styles/helper.scss"),
      [`@${id}/style`]: app.dir.temp(`palette/${id}-style.scss`),
    },

    async onPrepared(): Promise<void> {
      await app.writeTemp(
        `palette/${id}-config.scss`,
        `
@import "${getPath(defaultPalette)}";
@import "${getPath(defaultConfig)}";
@import "${getPath(userPalette)}";
@import "${getPath(userConfig)}";
`
      );

      await app.writeTemp(
        `palette/${id}-palette.scss`,
        `
@use 'sass:color';
@use 'sass:list';
@use 'sass:math';
@use 'sass:map';
@use 'sass:meta';

@use '@${id}/helper';
@use '@${id}/config' as config;
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
    @include helper.inject-color($key, $value, $darkSelector: config.$darkSelector);
  }
}
`
      );

      await app.writeTemp(
        `palette/${id}-style.scss`,
        `@forward "${getPath(userStyle)}";
`
      );
    },

    clientAppEnhanceFiles: app.dir.temp(`palette/load-${id}.js`),
  };
};

export const sassPalette = (
  options: SassPaletteOptions | false
): PluginConfig<SassPaletteOptions> => [sassPalettePlugin, options];
