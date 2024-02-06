import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type {
  LoaderOptions,
  WebpackBundlerOptions,
} from "@vuepress/bundler-webpack";
import {
  getBundlerName,
  isFunction,
  isString,
  mergeViteConfig,
} from "@vuepress/helper";
import type { App } from "vuepress/core";

type LoaderContext =
  Exclude<LoaderOptions["additionalData"], string | undefined> extends (
    content: string,
    loaderContext: infer T,
  ) => string
    ? T
    : never;

/**
 * Use "additionalData" to make `${id}-config` available in scss
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param id Module id
 */
export const injectConfigModule = (
  config: unknown,
  app: App,
  id: string,
): void => {
  const bundlerName = getBundlerName(app);

  // For vite
  if (bundlerName === "vite") {
    const viteBundlerConfig = <ViteBundlerOptions>config;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const originalAdditionalData:
      | string
      | ((source: string, file: string) => string | Promise<string>)
      | undefined =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      viteBundlerConfig.viteOptions?.css?.preprocessorOptions?.["scss"]
        .additionalData; // eslint-disable-line @typescript-eslint/no-unsafe-member-access

    // eslint-disable-next-line
    viteBundlerConfig.viteOptions = mergeViteConfig(
      viteBundlerConfig.viteOptions || {},
      {
        css: {
          preprocessorOptions: {
            scss: {
              charset: false,
              additionalData: async (
                source: string,
                file: string,
              ): Promise<string> => {
                const originalContent = isString(originalAdditionalData)
                  ? `${originalAdditionalData}${source}`
                  : isFunction(originalAdditionalData)
                    ? await originalAdditionalData(source, file)
                    : source;

                return originalContent.match(
                  new RegExp(`@use\\s+["']@sass-palette\\/${id}-config["'];`),
                )
                  ? originalContent
                  : `@use "@sass-palette/${id}-config";\n${originalContent}`;
              },
            },
          },
        },
      },
    );
  }

  // For webpack
  else if (bundlerName === "webpack") {
    const webpackBundlerConfig = <WebpackBundlerOptions>config;

    if (!webpackBundlerConfig.scss) webpackBundlerConfig.scss = {};

    const { additionalData } = webpackBundlerConfig.scss;

    const additionalDataHandler = (
      content: string,
      loaderContext: LoaderContext,
    ): string => {
      const originalContent = isString(additionalData)
        ? `${additionalData}${content}`
        : isFunction(additionalData)
          ? additionalData(content, loaderContext)
          : content;

      return originalContent.match(
        new RegExp(`@use\\s+(["'])@sass-palette\\/${id}-config\\1;`),
      )
        ? originalContent
        : `@use "@sass-palette/${id}-config";\n${originalContent}`;
    };

    webpackBundlerConfig.scss.additionalData = additionalDataHandler;
  }
};
