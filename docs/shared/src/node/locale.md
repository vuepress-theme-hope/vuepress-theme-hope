---
title: Locale Related
---

Locale related functions should be called at node side, you shall import them from `vuepress-shared/node` in node side code only.

The final locale should be passed in the client using `define` hook with only content in use.

## Config

### lang2PathConfig

- Type: `Record<string,string>`

A "lang code" to "locale path" map.

### supportedLangs

- Type: `string[]`

An array of languages that `vuepress-shared` knows it's locale path.

### path2langConfig

- Type: `Record<string,string>`

A "locale path" to "lang code" map.

## Functions

### path2Lang

```ts
export const path2Lang: (path?: string, debug?: boolean) => HopeLang;
```

Get language from path.

### lang2Path

```ts
export const lang2Path: (lang?: string, debug?: boolean) => string;
```

Get path from language

### getRootLang

```ts
export const lang2Path: (lang?: string, debug?: boolean) => string;
```

Get language of root directory

### getRootLangPath

```ts
export const getRootLangPath: (app: App) => string;
```

Get the inferred language path from root directory language

### getLocalePaths

```ts
export const getLocalePaths: (app: App) => string[];
```

Get locale paths

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
  options: GetLocalesOptions<T>,
) => RequiredLocaleConfig<T>;
```

Get final locale config for client.

::: tip

This is a useful utility function, and we recommend using this in every plugin which has client locale settings.

By using this, you can support as many locales as you like, while only pass necessary data to client.

E.g.:

With the following locales:

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

You can get:

```ts
// fr is dropped and `/` get locale of `/en/`
// user settings overrides default locale option
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
// };
```

:::
