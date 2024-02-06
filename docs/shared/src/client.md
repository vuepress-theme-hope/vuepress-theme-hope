---
title: Client
icon: fab fa-chrome
---

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
