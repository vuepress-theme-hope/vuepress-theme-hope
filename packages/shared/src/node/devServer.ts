import { mergeConfig } from "vite";

import type { App } from "@vuepress/core";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";
import type { HandleFunction } from "connect";
import type { Application } from "express";
import type * as WebpackDevServer from "webpack-dev-server";
import type { Plugin } from "vite";
import type { IncomingMessage, ServerResponse } from "http";

export const useCustomDevServer = (
  app: App,
  path: string,
  getResponse: (request?: IncomingMessage) => Promise<unknown>,
  errMsg = "The server encounted an error"
): void => {
  // for vite
  if (app.env.isDev && app.options.bundler.endsWith("vite")) {
    const handler: HandleFunction = (
      request: IncomingMessage,
      response: ServerResponse
    ) =>
      getResponse(request)
        .then((data) => {
          response.statusCode = 200;
          response.end(data);
        })
        .catch(() => {
          response.statusCode = 500;
          response.end(errMsg);
        });

    const viteMockRequestPlugin: Plugin = {
      name: `${path}-mock`,
      configureServer: ({ middlewares }) => {
        middlewares.use(
          `${app.options.base.replace(/\/$/, "")}${path}`,
          handler
        );
      },
    };

    app.options.bundlerConfig.viteOptions = mergeConfig(
      app.options.bundlerConfig.viteOptions,
      { plugins: [viteMockRequestPlugin] }
    );
  }

  // for webpack
  if (app.env.isDev && app.options.bundler.endsWith("webpack")) {
    const beforeDevServer = (app.options.bundlerConfig as WebpackBundlerOptions)
      .beforeDevServer;

    app.options.bundlerConfig.beforeDevServer = (
      expressApp: Application,
      server: WebpackDevServer
    ): void => {
      expressApp.get(
        `${app.options.base.replace(/\/$/, "")}${path}`,
        (request, response) => {
          getResponse(request)
            .then((data) => response.status(200).send(data))
            .catch(() => response.status(500).send(errMsg));
        }
      );
      beforeDevServer?.(expressApp, server);
    };
  }
};
