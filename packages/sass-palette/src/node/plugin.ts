import { fs, path } from "@vuepress/utils";
import { injectConfigModule } from "./inject";
import { logger } from "./utils";

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
    style,
  },
  app
) => {
  const userConfig = app.dir.source(config);
  const userPalette = app.dir.source(palette);
  const getPath = (path: string): string =>
    fs.pathExistsSync(path) ? path : emptyFile;

  injectConfigModule(app, id);

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
      ...(style
        ? {
            [`@sass-palette/${id}-style`]: app.dir.temp(
              `sass-palette/${id}-style.scss`
            ),
          }
        : {}),
    },

    onInitialized: (): Promise<void> => {
      const promises = [
        app.writeTemp(
          `sass-palette/load-${id}.js`,
          `import "@sass-palette/${id}-inject";export default ()=>{};`
        ),
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

${
  app.env.isDebug
    ? `@debug "${id} palette variables:";\n@debug $variables;\n@debug "${id} config variables:";\n@debug meta.module-variables("${id}-config");`
    : ""
}

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
      ];

      if (style) {
        const userStyle = app.dir.source(style);

        promises.push(
          app.writeTemp(
            `sass-palette/${id}-style.scss`,
            `@forward "${getPath(userStyle)}";
`
          )
        );
      }

      return Promise.all(promises).then(() => {
        if (app.env.isDebug) logger.info(`Style file for ${id} generated`);
      });
    },

    clientAppEnhanceFiles: app.dir.temp(`sass-palette/load-${id}.js`),
  };
};

export const sassPalette = (
  options: SassPaletteOptions | false
): PluginConfig<SassPaletteOptions> => ["sass-palette", options];
