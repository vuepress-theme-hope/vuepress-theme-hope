import { path } from "@vuepress/utils";
import chokidar from "chokidar";

import { injectConfigModule } from "./inject";
import {
  prepareConfigFile,
  prepareInjectFile,
  prepareLoadFile,
  preparePaletteFile,
  prepareStyleFile,
} from "./generate";
import { logger } from "./utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { SassPaletteOptions } from "../shared";

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
    style = null,
  },
  app
) => {
  const userConfig = app.dir.source(config);
  const userPalette = app.dir.source(palette);
  const userStyle = style ? app.dir.source(style) : null;

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
      injectConfigModule(app, id);

      return Promise.all([
        prepareLoadFile(app, id),
        prepareInjectFile(app, id),

        prepareConfigFile(app, {
          id,
          defaultConfig,
          defaultPalette,
          generator,
          userConfig,
          userPalette,
        }),

        preparePaletteFile(app, {
          id,
          defaultPalette,
          generator,
          userPalette,
        }),

        prepareStyleFile(app, { id, userStyle }),
      ]).then(() => {
        if (app.env.isDebug) logger.info(`Style file for ${id} generated`);
      });
    },

    onWatched: (app, watchers): void => {
      const configWatcher = chokidar.watch(userConfig, {
        cwd: app.dir.source(),
        ignoreInitial: true,
      });

      const updateConfig = (): Promise<void> =>
        prepareConfigFile(app, {
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

      const paletteWatcher = chokidar.watch(userPalette, {
        cwd: app.dir.source(),
        ignoreInitial: true,
      });

      const updatePalette = (): Promise<void> =>
        Promise.all([
          prepareConfigFile(app, {
            id,
            defaultConfig,
            defaultPalette,
            generator,
            userConfig,
            userPalette,
          }),

          preparePaletteFile(app, {
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
        const styleWatcher = chokidar.watch(userStyle, {
          cwd: app.dir.source(),
          ignoreInitial: true,
        });

        const updateStyle = (): Promise<void> =>
          prepareStyleFile(app, { id, userStyle }).then(() => {
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

    clientAppEnhanceFiles: app.dir.temp(`sass-palette/load-${id}.js`),
  };
};

export const sassPalette = (
  options: SassPaletteOptions | false
): PluginConfig<SassPaletteOptions> => ["sass-palette", options];
