---
title: Plugin Options
icon: config
---

## components

- Type: `AvailableComponent[]`
- Default: `[]`

Whether register articleInfo component

```ts
type AvailableComponent = "Badge";
```

## backToTop

- Type: `boolean`
- Default: `false`

Whether enabling backToTop button

## backToTopThreshold

- Type: `number`
- Default: `300`

BackToTop button threshold distance (in pixels)

## backToTopLocales

- Type: `BackToTopLocaleConfig`

  ```ts
  interface BackToTopLocaleData {
    /**
     * Back to top button label text
     */
    backToTop: string;
  }

  interface BackToTopLocaleConfig {
    [localePath: string]: BackToTopLocaleData;
  }
  ```

- Required: No

Locales config for BackToTop button.
