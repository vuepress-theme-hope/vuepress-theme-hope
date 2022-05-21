---
title: Plugin Options
icon: config
---

## components

- Type: `AvailableComponent[]`
- Default: `[]`

Whether register articleInfo component

```ts
type AvailableComponent = "Badge" | "CodePen" | "FontIcon" | "PDF";
```

## backToTop

- Type: `boolean | number`
- Default: `false`

Whether enabling backToTop button. When setting a number, it will be used as BackToTop button threshold distance (in pixels), default is 300.

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
