---
title: Client
icon: fab fa-chrome
---

## Composables

::: note

These function can only be called inside setup.

:::

### hasGlobalComponent

Check whether a component is registered globally.

::: note

Local import of this component does not affect the result.

:::

```ts
export const hasGlobalComponent: (name: string) => boolean;
```

::: details Example

```ts
// if you globally register `<my-component>`
hasGlobalComponent("MyComponent"); // true
hasGlobalComponent("my-component"); // true

hasGlobalComponent("MyComponent2"); // false
```

:::

### useLocaleConfig

Get current locale config from locales settings.

```ts
export const useLocaleConfig: <T extends LocaleData>(
  localesConfig: RequiredLocaleConfig<T>,
) => ComputedRef<T>;
```

::: details Example

```ts
const localesCOnfig = {
  "/": "Title",
  "/zh/": "标题",
};

const locale = useLocaleConfig(localesConfig);

// under `/page`
locale.value; // 'Title'

// under `/zh/page`
locale.value; // '标题'
```

:::

### usePageTitle

Get title of current page.

```ts
export type PageTitleRef = ComputedRef<string>;

export const usePageTitle: () => PageTitleRef;
```

## Utils

### Device Related

Features can be easily inferred by function names.

The ua parameter is `navigator.userAgent`, as it's not available in SSR, so you are expected to call these functions in `onMounted` lifecycle.

```ts
export const checkIsMobile: (ua: string) => boolean;
export const checkIsChromeWebView: (ua: string) => boolean;
export const checkIsSafariMobile: (ua: string) => boolean;
export const checkIsSafari: (ua: string) => boolean;
export const checkIsiPhone: (ua: string) => boolean;
export const checkIsiPad: (ua: string) => boolean;
export const checkIsWindows: (ua: string) => boolean;
export const checkIsIOS: (ua: string) => boolean;
export const checkIsMacOS: (ua: string) => boolean;
```

### Router Related

```ts
/**
 * Whether the lick is active
 *
 * @param route Current route
 * @param link link path
 * @returns Whether the lick is active
 */
export const isActiveLink: (
  route: RouteLocationNormalizedLoaded,
  link?: string,
) => boolean;
```
