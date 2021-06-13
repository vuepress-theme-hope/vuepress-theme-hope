import { fs, path } from "@vuepress/utils";

import type { Plugin } from "@vuepress/core";
import type { PaletteOptions } from "./options";

const emptyFile = path.resolve(__dirname, "../styles/empty.scss");

export const palettePlugin: Plugin<PaletteOptions> = (
  {
    id = "hope",
    config = `.vuepress/styles/${id}-config.scss`,
    defaultConfig = path.resolve(__dirname, "../styles/default/config.scss"),
    palette = `.vuepress/styles/${id}-palette.scss`,
    defaultPalette = path.resolve(__dirname, "../styles/default/palette.scss"),
    style = `.vuepress/styles/${id}-style.scss`,
  },
  app
) => {
  const userConfig = app.dir.source(config);
  const userPalette = app.dir.source(palette);
  const userStyle = app.dir.source(style);
  const getPath = (path: string): string =>
    fs.pathExistsSync(path) ? path : emptyFile;

  return {
    name: `palette-${id}`,

    alias: {
      [`@${id}/palette`]: app.dir.temp(`styles/${id}-palette.scss`),
      [`@${id}/config`]: app.dir.temp(`styles/${id}-config.scss`),
      [`@${id}/helper`]: path.resolve(__dirname, "../styles/helper.scss"),
      [`@${id}/style`]: app.dir.temp(`styles/${id}-style.scss`),
    },

    async onPrepared(): Promise<void> {
      await app.writeTemp(
        `styles/${id}-config.scss`,
        `
@import "${getPath(defaultPalette)}";
@import "${getPath(defaultConfig)}";
@import "${getPath(userPalette)}";
@import "${getPath(userConfig)}";
`
      );

      await app.writeTemp(
        `styles/${id}-palette.scss`,
        `
@use 'sass:color';
@use 'sass:list';
@use 'sass:math';
@use 'sass:map';
@use 'sass:meta';

@use '@${id}/helper';
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

      await app.writeTemp(
        `styles/${id}-style.scss`,
        `@forward "${getPath(userStyle)}";
`
      );
    },
  };
};
