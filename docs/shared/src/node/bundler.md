---
title: Bundler Related
---

Bundler functions should be called at node side, you shall import them from `vuepress-shared/node` in node side code only.

All functions should be called in `extendsBundlerOptions` lifecycle hook.

We are omitting that in examples. the actual code should be like this:

```ts
// import functions you need
import { addCustomElement } from "vuepress-shared/node";

const plugin = {
  // ...
  extendsBundlerOptions: (app, config) => {
    // add them here
    addCustomElement({ app, config }, "my-custom-element");
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
interface CustomElementCommonOptions {
  app: App;
  config: unknown;
}
/**
 * Add tags as customElement
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
export const addCustomElement: (
  { app, config }: CustomElementCommonOptions,
  customElement: string[] | string | RegExp
) => void;
```

::: details Example

```ts
import { addCustomElement } from "vuepress-shared/node";

addCustomElement(app, "my-custom-element");
addCustomElement(app, [
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

export interface CustomServerCommonOptions {
  /**
   * VuePress Node App
   */
  app: App;
  /**
   * VuePress Bundler config
   */
  config: unknown;
}

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
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param path Path to be responded
 * @param response respond function
 * @param errMsg error msg
 */
export const useCustomDevServer: (
  { app, config }: CustomServerCommonOptions,
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
useCustomDevServer(
  { app, config },
  {
    path: "/api/",
    response: async () => getData(),
    errMsg: "Unexpected api error",
  }
);
```

:::

## Webpack Related

- chainWebpack

  Chain webpack config.

  ```ts
  export interface WebpackCommonOptions {
    /**
     * VuePress Node App
     */
    app: App;
    /**
     * VuePress Bundler config
     */
    config: unknown;
  }

  export const chainWebpack: (
    { app, config }: WebpackCommonOptions,
    chainWebpack: (
      config: WebpackChainConfig,
      isServer: boolean,
      isBuild: boolean
    ) => void
  ) => void;
  ```

  ::: details Example

  ```ts
  import { chainWebpack } from "vuepress-shared/node";

  chainWebpack({ app, config }, (config, isServer, isBuild) => {
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
export interface ViteCommonOptions {
  /**
   * VuePress Node App
   */
  app: App;
  /**
   * VuePress Bundler config
   */
  config: unknown;
}

/**
 * Add modules to Vite `optimizeDeps.include` list
 */
export const addViteOptimizeDepsInclude: (
  { app, config }: ViteCommonOptions,
  module: string | string[]
) => void;

/**
 * Add modules to Vite `optimizeDeps.exclude` list
 */
export const addViteOptimizeDepsExclude: (
  { app, config }: ViteCommonOptions,
  module: string | string[]
) => void;

/**
 * Add modules to Vite `ssr.external` list
 */
export const addViteSsrExternal: (
  { app, config }: ViteCommonOptions,
  module: string | string[]
) => void;

/**
 * Add modules to Vite `ssr.noExternal` list
 */
export const addViteSsrNoExternal: (
  { app, config }: ViteCommonOptions,
  module: string | string[]
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

addViteOptimizeDepsInclude({ app, config }, ["vue", "vue-router"]);
addViteOptimizeDepsExclude({ app, config }, "packageA");
addViteSsrNoExternal({ app, config }, ["vue", "vue-router"]);
addViteSsrExternal({ app, config }, "packageA");
```

:::

- mergeViteConfig

  A function for you to merge vite config without importing vite (your users may choose to use other bundler!)

  ```ts
  export const mergeViteConfig: (
    defaults: Record<string, any>,
    overrides: Record<string, any>
  ) => Record<string, any>;
  ```

  ::: details Example

  ```ts
  import { mergeViteConfig } from "vuepress-shared/node";

  config.viteOptions mergeViteConfig(config.viteOptions, {
    build: {
      charset: "utf8",
    },
  });
  ```

  :::
