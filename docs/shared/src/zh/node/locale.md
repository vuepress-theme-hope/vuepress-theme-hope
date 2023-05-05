---
title: 语言环境相关
---

Locale 相关函数应该在 Node 端调用，你应该只在 Node 端代码中从 `vuepress-shared/node` 导入它们。

最终的语言环境应该使用 `define` 挂钩在客户端中传递，并且只包含正在使用的内容。

## 配置

### lang2PathConfig

- 类型: `Record<string,string>`

“语言代码”到“语言路径”的映射。

### supportedLangs

- 类型: `string[]`

`vuepress-shared` 已知语言路径的一组语言。

### path2langConfig

- 类型: `Record<string,string>`

“语言路径”到“语言代码”映射。

## 函数

### path2langConfig

```ts
export const path2Lang: (path?: string, debug?: boolean) => HopeLang;
```

从路径获取语言。

### lang2Path

```ts
export const lang2Path: (lang?: string, debug?: boolean) => string;
```

从语言获取路径

### getRootLang

```ts
export const lang2Path: (lang?: string, debug?: boolean) => string;
```

获取根目录的语言

### getRootLangPath

```ts
export const getRootLangPath: (app: App) => string;
```

从根目录语言获取推断语言路径

### getLocalePaths

```ts
export const getLocalePaths: (app: App) => string[];
```

获取语言环境路径

### getLocale

```ts
export interface GetLocalesOptions<T extends LocaleData> {
  /** VuePress Node app */
  app: App;
  /** Default locale config */
  default: RequiredLocaleConfig<T>;
  /** user locale config */
  config?: LocaleConfig<T> | undefined;
  /** plugin name */
  name?: string;
}

export const getLocales: <T extends LocaleData>(
  options: GetLocalesOptions<T>
) => RequiredLocaleConfig<T>;
```

获取客户端的最终语言环境配置。

::: tip 提示

这是一个有用的工具函数，我们建议每个具有客户端多语言设置的插件都使用它。

通过使用它，你可以支持尽可能多的语言环境，同时只将必要的数据传递给客户端。

例如:

使用以下语言环境:

```ts
export default {
  locales: {
    "/": {
      lang: "en-US",
    },
    "/zh/": {
      lang: "zh-CN",
    },
  },
};
```

你可以得到:

```ts
// fr 被删除并且 `/` 获取 `/en/` 的语言环境
// 用户设置覆盖默认区域设置选项
getLocales({
  app,
  default: {
    "/zh/": {
      a: "一",
      b: "二",
    },
    "/en/": {
      a: "one",
      b: "two",
    },
    "/fr/": {
      a: "un",
      b: "deux",
    },
  },
  config: {
    "/": {
      a: "One",
    },
    "/zh/": {
      a: "壹",
    },
  },
});
// {
//   "/": {
//     a: "One",
//     b: "two",
//   },

//   "/zh/": {
//     a: "壹",
//     b: "二",
//   },
// };;
```

:::
