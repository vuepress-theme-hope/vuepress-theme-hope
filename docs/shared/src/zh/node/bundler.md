---
title: 打包器相关
---

打包器相关函数仅在 Node 端可用，你应该仅在 Node 侧代码中从 `vuepress-shared/node` 导入它们。

所有函数都应在 `extendsBundlerOptions` 生命周期挂钩中调用。

我们在示例中省略了它。 实际代码应该是这样的：

```ts
// 导入你需要的函数
import { addCustomElement } from "vuepress-shared/node";

const plugin = {
  // ...
  extendsBundlerOptions: (app, config) => {
    // 在此添加它们
    addCustomElement({ app, config }, "my-custom-element");
  },
};

export default plugin;
```

## getBundlerName

获取当前打包器的名称。

```ts
export const getBundlerName: (app: App) => string;
```

::: details 示例

```ts
// @vuepress/bundler-vite
getBundleName(app) === "vite"; // true
// @vuepress/bundler-webpack
getBundleName(app) === "webpack"; // true
```

:::

## addCustomElement

将自定义元素声明添加到当前的打包器。

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

::: details 示例

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

为开发服务器中的特定路径提供内容。

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

::: details 示例

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

## Webpack 相关

- chainWebpack

  链式修改 webpack 配置.

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

  ::: details 示例

  ```ts
  import { chainWebpack } from "vuepress-shared/node";

  chainWebpack({ app, config }, (config, isServer, isBuild) => {
    // do some customize here
  });
  ```

  :::

## Vite 相关

- addViteOptimizeDepsInclude

  向 Vite `optimizeDeps.include` 列表中添加模块

- addViteOptimizeDepsExclude

  向 Vite `optimizeDeps.exclude` 列表中添加模块

- addViteSsrExternal

  向 Vite `ssr.external` 列表中添加模块

- addViteSsrNoExternal

  向 Vite `ssr.noExternal` 列表中添加模块

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

::: details 示例

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

  无需导入 vite 即可合并 vite 配置的功能 (你的用户可能选择使用其他 b 打包器!)

  ```ts
  export const mergeViteConfig: (
    defaults: Record<string, any>,
    overrides: Record<string, any>
  ) => Record<string, any>;
  ```

  ::: details 示例

  ```ts
  import { mergeViteConfig } from "vuepress-shared/node";

  config.viteOptions mergeViteConfig(config.viteOptions, {
    build: {
      charset: "utf8",
    },
  });
  ```

  :::
