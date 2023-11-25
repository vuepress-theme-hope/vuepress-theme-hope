---
title: Copyright Plugin Config
icon: copyright
order: 4
category:
  - Config
tag:
  - Copyright
  - Plugin Config
  - Theme Config
---

## Intro

The `vuepress-plugin-copyright2` plugin can append copyright information when users copy content from your site. Also, you can disable site copy or selection with this plugin.

This plugin is disabled by default.

`vuepress-theme-hope` passes `plugins.copyright` in theme options as plugin options to `vuepress-plugin-copyright2` plugin.

## Plugin Options

### hostname

- Type: `string`
- Required: No

Deploy hostname

### author

- Type: `string | ((page: Page) => string)`
- Required: No

Author Information

### license

- Type: `string | ((page: Page) => string)`
- Required: No

License Information

### triggerLength

- Type: `number`
- Default: `100`

Min words triggering copyright append

### global

- Type: `boolean`
- Default: `false`

Whether enabled globally

### disableCopy

- Type: `boolean`
- Default: `false`

Disable copy

### disableSelection

- Type: `boolean`
- Default: `false`

Disable selection

### locales

- Type: `CopyrightLocaleConfig`

  ```ts
  interface CopyrightLocaleData {
    /**
     * Author text
     *
     * @description `:author` will be replaced by author
     */
    author: string;

    /**
     * License text
     *
     * @description `:license` will be replaced by current license
     */
    license: string;

    /**
     * Link text
     *
     * @description `:url` will be replaced by current page link
     */
    link: string;
  }

  interface CopyrightLocaleConfig {
    [localePath: string]: CopyrightLocaleData;
  }
  ```

- Required: No

Locale config for copyright plugin.
