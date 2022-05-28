import { mergeViteConfig } from "vuepress-shared";

import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";
import type { LoaderContext } from "@vuepress/bundler-webpack/lib/types.webpack";

/**
 * Use 'additionalData' to make `${id}-config` availe in scss
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param path Path to be responsed
 * @param getResponse respond function
 * @param errMsg error msg
 */
export const injectConfigModule = (
  config: unknown,
  app: App,
  id: string
): void => {
  const { bundler } = app.options;

  // for vite
  if (bundler.name.endsWith("vite")) {
    const viteBundlerConfig = config as ViteBundlerOptions;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const originalAdditionalData:
      | string
      | ((source: string, file: string) => string | Promise<string>)
      | undefined =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      viteBundlerConfig.viteOptions?.css?.preprocessorOptions?.["scss"]
        .additionalData;

    // eslint-disable-next-line
    viteBundlerConfig.viteOptions = mergeViteConfig(
      viteBundlerConfig.viteOptions as Record<string, unknown>,
      {
        css: {
          preprocessorOptions: {
            scss: {
              charset: false,
              additionalData: async (
                source: string,
                file: string
              ): Promise<string> => {
                const originalContent =
                  typeof originalAdditionalData === "string"
                    ? `${originalAdditionalData}${source}`
                    : typeof originalAdditionalData === "function"
                    ? await originalAdditionalData(source, file)
                    : source;

                return originalContent.match(
                  new RegExp(`@use\\s+["']@sass-palette\\/${id}-config["'];`)
                )
                  ? originalContent
                  : `@use "@sass-palette/${id}-config";\n${originalContent}`;
              },
            },
          },
        },
      }
    );
  }

  // for webpack
  if (bundler.name.endsWith("webpack")) {
    const webpackBundlerConfig = config as WebpackBundlerOptions;

    if (!webpackBundlerConfig.scss) webpackBundlerConfig.scss = {};

    const { additionalData } = webpackBundlerConfig.scss;

    const additionalDataHandler = (
      content: string,
      loaderContext: LoaderContext
    ): string => {
      const originalContent =
        typeof additionalData === "string"
          ? `${additionalData}${content}`
          : typeof additionalData === "function"
          ? additionalData(content, loaderContext)
          : content;

      return originalContent.match(
        new RegExp(`@use\\s+["']@sass-palette\\/${id}-config["'];`)
      )
        ? originalContent
        : `@use "@sass-palette/${id}-config";\n${originalContent}`;
    };

    webpackBundlerConfig.scss.additionalData = additionalDataHandler;
  }
};
