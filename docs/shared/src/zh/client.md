---
title: 客户端
icon: fab fa-chrome
---

## Composables

::: note

这些函数只能在 setup 中调用

:::

### hasGlobalComponent

检查组件是否已全局注册。

::: note

该组件的本地导入不影响结果。

:::

```ts
export const hasGlobalComponent: (name: string) => boolean;
```

::: details 示例

```ts
// 如果你全局注册了 `<my-component>`
hasGlobalComponent("MyComponent"); // true
hasGlobalComponent("my-component"); // true

hasGlobalComponent("MyComponent2"); // false
```

:::

### useLocaleConfig

从语言环境设置中获取当前语言环境配置。

```ts
export const useLocaleConfig: <T extends LocaleData>(
  localesConfig: RequiredLocaleConfig<T>,
) => ComputedRef<T>;
```

::: details 示例

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

获得当前页面标题。

```ts
export type PageTitleRef = ComputedRef<string>;

export const usePageTitle: () => PageTitleRef;
```

## Utils

### 设备相关

可以通过函数名称轻松推断出功能。

ua 参数是 `navigator.userAgent`，因为它在 SSR 中不可用，所以你应该在 `onMounted` 生命周期中调用这些函数。

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

### 路由相关

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
