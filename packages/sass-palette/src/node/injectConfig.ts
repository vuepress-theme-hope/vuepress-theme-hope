import { mergeViteConfig } from "@mr-hope/vuepress-shared";

import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";
import type { LoaderContext } from "@vuepress/bundler-webpack/lib/types.webpack";

/**
 * Handle specific path when runing VuePress DevServe
 *
 * @param app VuePress Node App
 * @param path Path to be responsed
 * @param getResponse respond function
 * @param errMsg error msg
 */
export const injectConfig = (app: App, id: string): void => {
  const { bundler, bundlerConfig } = app.options;

  // for vite
  if (app.env.isDev && bundler.endsWith("vite")) {
    const viteBundlerConfig: ViteBundlerOptions = bundlerConfig;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const originalAddtionalData =
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
              addtionalData: `@use "@${id}/config";${
                typeof originalAddtionalData === "string"
                  ? originalAddtionalData
                  : ""
              }`,
            },
          },
        },
      }
    );
  }

  // for webpack
  if (app.env.isDev && bundler.endsWith("webpack")) {
    const webpackBundlerConfig: WebpackBundlerOptions = app.options
      .bundlerConfig as WebpackBundlerOptions;

    if (!webpackBundlerConfig.scss) webpackBundlerConfig.scss = {};

    const { additionalData } = webpackBundlerConfig.scss;

    const addtionalDataHandler = (
      content: string,
      loaderContext: LoaderContext
    ): string => {
      if (typeof additionalData === "string")
        return `@use "@${id}/config";\n${additionalData}`;

      if (typeof additionalData === "function")
        return `@use "@${id}/config";\n${additionalData(
          content,
          loaderContext
        )}`;

      return `@use "@${id}/config\n"`;
    };

    webpackBundlerConfig.scss.additionalData = addtionalDataHandler;
  }
};
