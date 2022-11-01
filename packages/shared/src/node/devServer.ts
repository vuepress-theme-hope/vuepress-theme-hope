import { removeLeadingSlash } from "@vuepress/shared";
import { mergeViteConfig } from "./vite/index.js";

import type { IncomingMessage, ServerResponse } from "node:http";
import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type {
  WebpackBundlerOptions,
  WebpackDevServer,
} from "@vuepress/bundler-webpack";
import type { HandleFunction } from "connect";
import type { Plugin } from "vite";

/**
 * Handle specific path when running VuePress DevServe
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param path Path to be responded
 * @param getResponse respond function
 * @param errMsg error msg
 */
export const useCustomDevServer = (
  config: unknown,
  app: App,
  path: string,
  getResponse: (request?: IncomingMessage) => Promise<string | Buffer>,
  errMsg = "The server encountered an error"
): void => {
  const { base, bundler } = app.options;

  // for vite
  if (app.env.isDev && bundler.name.endsWith("vite")) {
    const viteBundlerConfig = <ViteBundlerOptions>config;
    const handler: HandleFunction = (
      request: IncomingMessage,
      response: ServerResponse
    ) => {
      getResponse(request)
        .then((data) => {
          response.statusCode = 200;
          response.end(data);
        })
        .catch(() => {
          response.statusCode = 500;
          response.end(errMsg);
        });
    };

    const viteMockRequestPlugin: Plugin = {
      name: `virtual:dev-server-mock/${path}`,
      configureServer: ({ middlewares }) => {
        middlewares.use(`${base}${removeLeadingSlash(path)}`, handler);
      },
    };

    viteBundlerConfig.viteOptions = mergeViteConfig(
      viteBundlerConfig.viteOptions || {},
      { plugins: [viteMockRequestPlugin] }
    );
  }

  // for webpack
  if (app.env.isDev && bundler.name.endsWith("webpack")) {
    const webpackBundlerConfig = <WebpackBundlerOptions>config;

    const { devServerSetupMiddlewares } = webpackBundlerConfig;

    webpackBundlerConfig.devServerSetupMiddlewares = (
      middlewares: WebpackDevServer.Middleware[],
      server: WebpackDevServer
    ): WebpackDevServer.Middleware[] => {
      server.app?.get(
        `${base}${removeLeadingSlash(path)}`,
        (request, response) => {
          getResponse(request)
            .then((data) => response.status(200).send(data))
            .catch(() => response.status(500).send(errMsg));
        }
      );

      return devServerSetupMiddlewares
        ? devServerSetupMiddlewares(middlewares, server)
        : middlewares;
    };
  }
};
