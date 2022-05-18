import { path } from "@vuepress/utils";
import { watch } from "chokidar";

import { injectConfigModule } from "./inject";
import {
  prepareConfigFile,
  prepareInjectSass,
  prepareConfigSass,
  preparePaletteSass,
  prepareStyleSass,
} from "./prepare";
import { logger } from "./utils";

import type { PluginFunction } from "@vuepress/core";
import type { SassPaletteOptions } from "../shared";

export const sassPalettePlugin =
  (options: SassPaletteOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const {
      id = "hope",
      config = `.vuepress/styles/${id}-config.scss`,
      defaultConfig = path.resolve(
        __dirname,
        "../../styles/default/config.scss"
      ),
      palette = `.vuepress/styles/${id}-palette.scss`,
      defaultPalette = path.resolve(
        __dirname,
        "../../styles/default/palette.scss"
      ),
      generator = path.resolve(__dirname, "../../styles/empty.scss"),
      style = "",
    } = options;

    const userConfig = app.dir.source(config);
    const userPalette = app.dir.source(palette);
    const userStyle = style ? app.dir.source(style) : null;

    return {
      name: `vuepress-plugin-sass-palette`,

      multiple: true,

      id,

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

      extendsBundlerOptions: (config: unknown, app): void => {
        injectConfigModule(config, app, id);
      },

      onInitialized: (): Promise<void> => {
        return Promise.all([
          prepareInjectSass(app, id),

          prepareConfigSass(app, {
            id,
            defaultConfig,
            defaultPalette,
            generator,
            userConfig,
            userPalette,
          }),

          preparePaletteSass(app, {
            id,
            defaultPalette,
            generator,
            userPalette,
          }),

          prepareStyleSass(app, { id, userStyle }),
        ]).then(() => {
          if (app.env.isDebug) logger.info(`Style file for ${id} generated`);
        });
      },

      onWatched: (app, watchers): void => {
        const configWatcher = watch(userConfig, {
          cwd: app.dir.source(),
          ignoreInitial: true,
        });

        const updateConfig = (): Promise<void> =>
          prepareConfigSass(app, {
            id,
            defaultConfig,
            defaultPalette,
            generator,
            userConfig,
            userPalette,
          }).then(() => {
            if (app.env.isDebug) logger.info(`Style file for ${id} updated`);
          });

        configWatcher.on("add", () => {
          void updateConfig();
        });
        configWatcher.on("unlink", () => {
          void updateConfig();
        });

        watchers.push(configWatcher);

        const paletteWatcher = watch(userPalette, {
          cwd: app.dir.source(),
          ignoreInitial: true,
        });

        const updatePalette = (): Promise<void> =>
          Promise.all([
            prepareConfigSass(app, {
              id,
              defaultConfig,
              defaultPalette,
              generator,
              userConfig,
              userPalette,
            }),

            preparePaletteSass(app, {
              id,
              defaultPalette,
              generator,
              userPalette,
            }),
          ]).then(() => {
            if (app.env.isDebug) logger.info(`Style file for ${id} updated`);
          });

        paletteWatcher.on("add", () => {
          void updatePalette();
        });
        paletteWatcher.on("unlink", () => {
          void updatePalette();
        });

        watchers.push(paletteWatcher);

        if (userStyle) {
          const styleWatcher = watch(userStyle, {
            cwd: app.dir.source(),
            ignoreInitial: true,
          });

          const updateStyle = (): Promise<void> =>
            prepareStyleSass(app, { id, userStyle }).then(() => {
              if (app.env.isDebug) logger.info(`Style file for ${id} updated`);
            });

          styleWatcher.on("add", () => {
            void updateStyle();
          });
          styleWatcher.on("unlink", () => {
            void updateStyle();
          });
          watchers.push(styleWatcher);
        }
      },

      clientConfigFile: (app) => prepareConfigFile(app, id),
    };
  };
