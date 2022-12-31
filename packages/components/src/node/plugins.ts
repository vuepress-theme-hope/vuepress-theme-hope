import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  getBundlerName,
  getLocales,
  mergeViteConfig,
} from "vuepress-shared/node";

import { convertOptions } from "./convert/index.js";
import { backToTopLocales, catalogLocales } from "./locales.js";
import { prepareConfigFile } from "./prepare.js";
import { getIconPrefix, logger } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { RollupWarning } from "rollup";
import type { ComponentOptions } from "./options.js";

export const componentsPlugin =
  (options: ComponentOptions, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as ComponentOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-components",

      define: (): Record<string, unknown> => {
        const { assets, prefix } = options.componentOptions?.fontIcon || {};

        return {
          BACK_TO_TOP_LOCALES: getLocales({
            app,
            name: "backToTop",
            default: backToTopLocales,
            config: options.locales?.backToTop,
          }),
          CATALOG_LOCALES: getLocales({
            app,
            name: "catalog",
            default: catalogLocales,
            config: options.locales?.catalog,
          }),
          ICON_PREFIX:
            typeof prefix === "string" ? prefix : getIconPrefix(assets),
          PDFJS_URL: options.componentOptions?.pdf?.pdfjs || null,
        };
      },

      extendsBundlerOptions: (config: unknown, app): void => {
        if (getBundlerName(app) === "vite") {
          const bundlerConfig = <ViteBundlerOptions>config;

          const originalOnWarn =
            bundlerConfig.viteOptions?.build?.rollupOptions?.onwarn;

          bundlerConfig.viteOptions = mergeViteConfig(
            bundlerConfig.viteOptions || {},
            {
              build: {
                rollupOptions: {
                  onwarn(
                    warning: RollupWarning,
                    warn: (warning: RollupWarning) => void
                  ) {
                    if (
                      warning.message.includes(
                        'is imported from external module "@vueuse/core" but never used in '
                      ) ||
                      warning.message.includes(
                        'is imported from external module "vuepress-shared/client" but never used in '
                      )
                    )
                      return;

                    originalOnWarn?.(warning, warn);
                  },
                },
              },
            }
          );
        }
      },

      clientConfigFile: (app) => prepareConfigFile(app, options),
    };
  };
