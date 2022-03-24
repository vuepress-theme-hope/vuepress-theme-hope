import { mergeViteConfig } from "@mr-hope/vuepress-shared";

import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";
import type { LoaderContext } from "@vuepress/bundler-webpack/lib/types.webpack";

/**
 * Use 'additionalData' to make `${id}-config` availe in scss
 *
 * @param app VuePress Node App
 * @param path Path to be responsed
 * @param getResponse respond function
 * @param errMsg error msg
 */
export const injectConfigModule = (app: App, id: string): void => {
  const { bundler, bundlerConfig } = app.options;

  // for vite
  if (bundler.endsWith("vite")) {
    const viteBundlerConfig: ViteBundlerOptions = bundlerConfig;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const originalAdditionalData:
      | string
      | ((source: string, file: string) => string | Promise<string>)
      | undefined =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      viteBundlerConfig.viteOptions?.css?.preprocessorOptions?.scss
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
                if (typeof originalAdditionalData === "string")
                  return `@use "@sass-palette/${id}-config";\n${originalAdditionalData}${source}`;
                if (typeof originalAdditionalData === "function")
                  return `@use "@sass-palette/${id}-config";\n${await originalAdditionalData(
                    source,
                    file
                  )}`;

                return `@use "@sass-palette/${id}-config";\n${source}`;
              },
            },
          },
        },
      }
    );
  }

  // for webpack
  if (bundler.endsWith("webpack")) {
    const webpackBundlerConfig: WebpackBundlerOptions = app.options
      .bundlerConfig as WebpackBundlerOptions;

    if (!webpackBundlerConfig.scss) webpackBundlerConfig.scss = {};

    const { additionalData } = webpackBundlerConfig.scss;

    const additionalDataHandler = (
      content: string,
      loaderContext: LoaderContext
    ): string => {
      if (typeof additionalData === "string")
        return `@use "@sass-palette/${id}-config";\n${additionalData}${content}`;

      if (typeof additionalData === "function")
        return `@use "@sass-palette/${id}-config";\n${additionalData(
          content,
          loaderContext
        )}`;

      return `@use "@sass-palette/${id}-config";\n${content}`;
    };

    webpackBundlerConfig.scss.additionalData = additionalDataHandler;
  }
};
