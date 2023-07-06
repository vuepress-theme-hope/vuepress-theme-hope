---
title: Bundler Related
---

Bundler functions should be called at node side, you shall import them from `vuepress-shared/node` in node side code only.

All functions should be called in `extendsBundlerOptions` lifecycle hook.

We are omitting that in examples. The actual code should be like this:

```ts
// import functions you need
import { addCustomElement } from "vuepress-shared/node";

const plugin = {
  // ...
  extendsBundlerOptions: (bundlerOptions, app) => {
    // add them here
    addCustomElement(bundlerOptions, app, "my-custom-element");
  },
};

export default plugin;
```

## getBundlerName

Get current bundler name.

```ts
export const getBundlerName: (app: App) => string;
```

::: details Example

```ts
// @vuepress/bundler-vite
getBundleName(app) === "vite"; // true
// @vuepress/bundler-webpack
getBundleName(app) === "webpack"; // true
```

:::

## addCustomElement

Add a custom element declaration to the current bundler.

```ts
/**
 * Add tags as customElement
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
export const addCustomElement = (
  bundlerOptions: unknown,
  app: App,
  customElement: string[] | string | RegExp
) => void;
```

::: details Example

```ts
import { addCustomElement } from "vuepress-shared/node";

addCustomElement(bundlerConfig, app, "my-custom-element");
addCustomElement(bundlerOptions, app, [
  "custom-element1",
  "custom-element2",
  // all tags start with `math-`
  /^math-/,
]);
```

:::

## useCustomDevServer

Provides contents for specific path in dev server.

```ts
export interface CustomServerOptions {
  /**
   * Path to be responded
   */
  path: string;
  /**
   * Respond function
   */
  response: (request?: IncomingMessage) => Promise<string | Buffer>;

  /**
   * error msg
   */
  errMsg?: string;
}

/**
 * Handle specific path when running VuePress Dev Server
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 * @param path Path to be responded
 * @param response respond function
 * @param errMsg error msg
 */
export const useCustomDevServer: (
  bundlerOptions: unknown,
  app: App,
  {
    errMsg:"The server encountered an error",
    response: responseHandler,
    path,
  }: CustomServerOptions
) => void;
```

::: details Example

```ts
import { useCustomDevServer } from "vuepress-shared/node";

// handle `/api/` path
useCustomDevServer(bundlerOptions, app, {
  path: "/api/",
  response: async () => getData(),
  errMsg: "Unexpected api error",
});
```

:::

## Webpack Related

- addChainWebpack

  Chain webpack config.

  ```ts
  export const addChainWebpack: (
    bundlerOptions: unknown,
    app: App,
    chainWebpack: (
      config: WebpackChainConfig,
      isServer: boolean,
      isBuild: boolean,
    ) => void,
  ) => void;
  ```

  ::: details Example

  ```ts
  import { addChainWebpack } from "vuepress-shared/node";

  addChainWebpack(bundlerOptions, app, (config, isServer, isBuild) => {
    // do some customize here
  });
  ```

  :::

## Vite Related

- addViteOptimizeDepsInclude

  Add modules to Vite `optimizeDeps.include` list

- addViteOptimizeDepsExclude

  Add modules to Vite `optimizeDeps.exclude` list

- addViteSsrExternal

  Add modules to Vite `ssr.external` list

- addViteSsrNoExternal

  Add modules to Vite `ssr.noExternal` list

```ts
/**
 * Add modules to Vite `optimizeDeps.include` list
 */
export const addViteOptimizeDepsInclude: (
  bundlerOptions: unknown,
  app: App,
  module: string | string[],
) => void;

/**
 * Add modules to Vite `optimizeDeps.exclude` list
 */
export const addViteOptimizeDepsExclude: (
  bundlerOptions: unknown,
  app: App,
  module: string | string[],
) => void;

/**
 * Add modules to Vite `ssr.external` list
 */
export const addViteSsrExternal: (
  bundlerOptions: unknown,
  app: App,
  module: string | string[],
) => void;

/**
 * Add modules to Vite `ssr.noExternal` list
 */
export const addViteSsrNoExternal: (
  bundlerOptions: unknown,
  app: App,
  module: string | string[],
) => void;
```

::: details Examples

```ts
import {
  addViteOptimizeDepsInclude,
  addViteOptimizeDepsExclude,
  addViteSsrExternal,
  addViteSsrNoExternal,
} from "vuepress-shared/node";

addViteOptimizeDepsInclude(bundlerOptions, app, ["vue", "vue-router"]);
addViteOptimizeDepsExclude(bundlerOptions, app, "packageA");
addViteSsrNoExternal(bundlerOptions, app, ["vue", "vue-router"]);
addViteSsrExternal(bundlerOptions, app, "packageA");
```

:::

- addViteConfig

  A function for you to add vite config

  ```ts
  export const addViteConfig: (
    bundlerOptions: unknown,
    app: App,
    config: Record<string, unknown>,
  ) => void;
  ```

  ::: details Example

  ```ts
  import { addViteConfig } from "vuepress-shared/node";

  addViteConfig(bundlerOptions, app, {
    build: {
      charset: "utf8",
    },
  });
  ```

  :::

- mergeViteConfig

  A function for you to merge vite config without importing vite (your users may choose to use other bundler!)

  ```ts
  export const mergeViteConfig: (
    defaults: Record<string, any>,
    overrides: Record<string, any>,
  ) => Record<string, any>;
  ```

  ::: details Example

  ```ts
  import { mergeViteConfig } from "vuepress-shared/node";

  config.viteOptions = mergeViteConfig(config.viteOptions, {
    build: {
      charset: "utf8",
    },
  });
  ```

  :::
