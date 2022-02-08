import { fs, path } from "@vuepress/utils";
import { injectConfig } from "./injectConfig";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { SassPaletteOptions } from "../shared";

const emptyFile = path.resolve(__dirname, "../../styles/empty.scss");

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
    generator = path.resolve(__dirname, "../../styles/empty.scss"),
    style = `.vuepress/styles/${id}-style.scss`,
  },
  app
) => {
  const userConfig = app.dir.source(config);
  const userPalette = app.dir.source(palette);
  const userStyle = app.dir.source(style);
  const getPath = (path: string): string =>
    fs.pathExistsSync(path) ? path : emptyFile;

  injectConfig(app, id);

  return {
    name: `vuepress-plugin-sass-palette?${id}`,

    alias: {
      [`@sass-palette/helper`]: path.resolve(
        __dirname,
        "../../styles/helper.scss"
      ),
      [`@sass-palette/${id}-config`]: app.dir.temp(
        `sass-palette/${id}-config.scss`
      ),
      [`@sass-palette/${id}-inject`]: app.dir.temp(
        `sass-palette/${id}-inject.scss`
      ),
      [`@sass-palette/${id}-palette`]: app.dir.temp(
        `sass-palette/${id}-palette.scss`
      ),
      [`@sass-palette/${id}-style`]: app.dir.temp(
        `sass-palette/${id}-style.scss`
      ),
    },

    onInitialized: (): Promise<string> => {
      return app.writeTemp(
        `sass-palette/load-${id}.js`,
        `
export default ()=>{
  import("@sass-palette/${id}-inject");
};
`
      );
    },

    onPrepared: () =>
      Promise.all([
        app.writeTemp(
          `sass-palette/${id}-config.scss`,
          `
@import "${getPath(defaultPalette)}";
@import "${getPath(defaultConfig)}";
@import "${getPath(userPalette)}";
@import "${getPath(userConfig)}";
@import "${getPath(generator)}";
`
        ),

        app.writeTemp(
          `sass-palette/${id}-inject.scss`,
          `
@use "sass:color";
@use "sass:list";
@use "sass:math";
@use "sass:map";
@use "sass:meta";

@use "@sass-palette/helper";
@use "@sass-palette/${id}-palette";

$variables: meta.module-variables("${id}-palette");

@each $name, $value in $variables {
  $key: helper.camel-to-kebab($name);

  @if meta.type-of($value) == number or meta.type-of($value) == string {
    :root {
      #{$key}: #{$value};
    }
  } @else if helper.color-islegal($value) {
    @if meta.global-variable-exists("darkSelector", $module: "${id}-config") {
      @include helper.inject-color($key, $value, $darkSelector: ${id}-config.$darkSelector);
    } @else {
      @include helper.inject-color($key, $value);
    }
  }
}
`
        ),

        app.writeTemp(
          `sass-palette/${id}-palette.scss`,
          `
@import "${getPath(defaultPalette)}";
@import "${getPath(userPalette)}";
@import "${getPath(generator)}";
`
        ),

        app.writeTemp(
          `sass-palette/${id}-style.scss`,
          `@forward "${getPath(userStyle)}";
`
        ),
      ]),

    clientAppEnhanceFiles: app.dir.temp(`sass-palette/load-${id}.js`),
  };
};

export const sassPalette = (
  options: SassPaletteOptions | false
): PluginConfig<SassPaletteOptions> => [sassPalettePlugin, options];
