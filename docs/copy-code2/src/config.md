---
title: Plugin Options
icon: config
---

## selector

- Type: `string | string[]`
- Default: `'.theme-default-content div[class*="language-"] pre'`

Code block selector

## duration

- Type: `number`
- Default: `2000`

Hint display time, setting it to `0` will disable the hint.

## showInMobile

- Type: `boolean`
- Default: `false`

Whether to display copy button on the mobile device

## delay

- Type: `number`
- Default: `500`

The delay of registering copy code buttons, in ms.

If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.

## pure

- Type: `false`
- Default: `false`

Whether generate a small simple button with pure style.

## locales

- Type: `CopyCodeLocaleConfig`

  ```ts
  interface CopyCodeLocaleData {
    /**
     * Copy button label text
     */
    copy: string;

    /**
     * Success message text after content is copied
     */
    hint: string;
  }

  interface CopyCodeLocaleConfig {
    [localePath: string]: CopyCodeLocaleData;
  }
  ```

- Required: No

Locales config for copy code plugin.
