import { getPath } from "./utils.js";

import type { App } from "@vuepress/core";

export const prepareConfigFile = (app: App, id: string): Promise<string> =>
  app.writeTemp(
    `sass-palette/load-${id}.js`,
    `\
import "@sass-palette/${id}-inject";
export default {};
`
  );

export const prepareInjectSass = (app: App, id: string): Promise<string> =>
  app.writeTemp(
    `sass-palette/${id}-inject.scss`,
    `\
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
    ? `
@debug "${id} palette variables: #{meta.inspect($variables)}";
@debug "${id} config variables: #{meta.inspect(meta.module-variables("${id}-config"))}";
`
    : ""
}

@each $name, $value in $variables {
  $key: helper.camel-to-kebab($name);

  @if meta.type-of($value) == number or meta.type-of($value) == string {
    :root {
      #{$key}: #{$value};
    }
  } @else if helper.color-is-legal($value) {
    @if meta.global-variable-exists("dark-selector", $module: "${id}-config") {
      @include helper.inject-color($key, $value, $dark-selector: ${id}-config.$dark-selector);
    } @else {
      @include helper.inject-color($key, $value);
    }
  }
}
`
  );

export interface PrepareConfigOptions {
  id: string;
  defaultConfig: string;
  defaultPalette: string;
  generator: string;
  userConfig: string;
  userPalette: string;
}

export const prepareConfigSass = (
  app: App,
  {
    id,
    defaultConfig,
    defaultPalette,
    generator,
    userConfig,
    userPalette,
  }: PrepareConfigOptions
): Promise<string> =>
  app.writeTemp(
    `sass-palette/${id}-config.scss`,
    `\
@import "file:///${getPath(defaultPalette)}";
@import "file:///${getPath(defaultConfig)}";
@import "file:///${getPath(userPalette)}";
@import "file:///${getPath(userConfig)}";
@import "file:///${getPath(generator)}";
`
  );

export interface PreparePaletteOptions {
  id: string;
  defaultPalette: string;
  generator: string;
  userPalette: string;
}

export const preparePaletteSass = (
  app: App,
  { id, defaultPalette, generator, userPalette }: PreparePaletteOptions
): Promise<string> =>
  app.writeTemp(
    `sass-palette/${id}-palette.scss`,
    `\
@import "file:///${getPath(defaultPalette)}";
@import "file:///${getPath(userPalette)}";
@import "file:///${getPath(generator)}";
`
  );

export interface PrepareStyleOptions {
  id: string;
  userStyle: string | null;
}

export const prepareStyleSass = (
  app: App,
  { id, userStyle }: PrepareStyleOptions
): Promise<string | null> =>
  userStyle
    ? app.writeTemp(
        `sass-palette/${id}-style.scss`,
        `\
@forward "file:///${getPath(userStyle)}";
`
      )
    : Promise.resolve(null);
