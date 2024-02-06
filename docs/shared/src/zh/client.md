---
title: 客户端
icon: fab fa-chrome
---

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
