---
title: Guide
icon: creative
---

This plugin can automatically append copyright information when visitors copy content from your site, and can also prohibit site copying or selection.

<!-- more -->

## Usage

This plugin is disabled globally by default, you need to manually enable it by setting `copy: true` in page frontmatter . Of course, you can set `global: true` in the plugin options to make it globally enabled, and set `copy: false` in page frontmatter to disable it.

To avoid disturbing visitors, copyright information will be appended only when the length of content copied by the user is not less than `100`. If you want to change this trigger value, please set `triggerWords`, and this option supports being override via `copy.triggerWord` in page frontmatter.

## Disable Copy and Selection

- If you don’t want users to copy your entire site or specific page text, you can disable copying in plugin options or page frontmatter by setting `disableCopy`, the latter has higher priority.
- If you don’t want users to select your entire site or specific page text, you can disable selection in plugin options or page frontmatter by setting `disableSelection`, the latter has higher priority.

## Copyright Information

You can set author and license information via `author` and `license` in plugin options. If your site have different authors and license in different pages, you can pass in a function `(page: Page) => string` that takes the current page object as parameter and returns the corresponding information.

## Customize Copyright Text

You can set copyright information text of the plugin in different languages ​​through the `locales` option. For details, see [Config → locales](config.md#locales).
