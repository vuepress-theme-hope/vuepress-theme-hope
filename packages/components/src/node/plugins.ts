import { fs, path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  getDirContents,
  getLocales,
  mergeViteConfig,
  useCustomDevServer,
} from "vuepress-shared/node";

import { convertOptions } from "./convert/index.js";
import { backToTopLocales } from "./locales.js";
import { prepareConfigFile } from "./prepare.js";
import { PDFJS_DIR, getIconPrefix, logger } from "./utils.js";

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

    const enablePDF = options.components?.includes("PDF");

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
          ICON_PREFIX:
            typeof prefix === "string" ? prefix : getIconPrefix(assets),
        };
      },

      extendsBundlerOptions: (config: unknown, app): void => {
        const { bundler } = app.options;

        if (bundler.name.endsWith("vite")) {
          const bundlerConfig = <ViteBundlerOptions>config;

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
                      )
                    )
                      return;

                    warn(warning);
                  },
                },
              },
            }
          );
        }

        if (enablePDF)
          getDirContents(PDFJS_DIR).forEach((file) => {
            useCustomDevServer(
              { app, config },
              {
                path: `/assets/lib/pdfjs/${file}`,
                response: (_, response) => {
                  if (file.endsWith(".html"))
                    response.setHeader("Content-Type", "text/html");
                  else if (file.endsWith(".css"))
                    response.setHeader("Content-Type", "text/css");
                  else if (file.endsWith(".js"))
                    response.setHeader(
                      "Content-Type",
                      "application/javascript"
                    );
                  else if (file.endsWith(".svg"))
                    response.setHeader("Content-Type", "image/svg+xml");

                  return fs.readFile(path.resolve(PDFJS_DIR, file));
                },
              }
            );
          });
      },

      clientConfigFile: (app) => prepareConfigFile(app, options),

      onGenerated: async (app): Promise<void> => {
        if (enablePDF)
          await fs.copy(PDFJS_DIR, app.dir.dest("assets/lib/pdfjs"));
      },
    };
  };
