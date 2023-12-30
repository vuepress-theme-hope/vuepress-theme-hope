---
title: PWA Plugin Config
icon: mobile-screen
order: 7
category:
  - Config
tag:
  - PWA
  - Plugin Config
  - Theme Config
---

## Intro

The theme can provide progressive web app support via `vuepress-plugin-pwa2`, and you need to **manually install the plugin** before using.

You can enable this feature by setting `plugins.pwa2` to `true` in theme options. This default behavior generate a PWA based on theme options.

## Plugin Options

`vuepress-theme-hope` passes `plugins.pwa` in theme options as plugin options to `vuepress-plugin-pwa2` plugin.

You can pass your own options with `plugins.pwa`, here are some common ones:

### manifest

- Type: `ManifestOption`
- Required: No

You can fill with an object which will be parsed to manifest.webmanifest.

::: tip

Some options have their fallback if you do not set them.

- name: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
- short_name: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
- description: `siteConfig.description` || `siteConfig.locales['/'].description` || `"A site built with vuepress"`
- lang: `siteConfig.locales['/'].lang` || `"en-US"`
- start_url: `context.base`
- scope: `context.base`

- display: `"standalone"`
- theme_color: `"#46bd87"`
- background_color: `"#ffffff"`
- orientation: `"portrait-primary"`
- prefer_related_applications: `false`

:::

::: info More

For docs of Manifest, please see [W3C Manifest](https://w3c.github.io/manifest/)

:::

### themeColor

- Type: `string`
- Default: `"#46bd87"`

Theme Color of the pwa.

### maxSize

- Type: `number`
- Default: `2048`

Max size allowed to be cached, with KB unit

::: warning

This option has the highest priority, and any files exceeding this value will be excluded.

So if you generate very large HTML or JS files, please consider increasing this value, otherwise your PWA may not work normally in offline mode.

:::

### cacheHTML

- Type: `boolean`
- Default: `false`

Whether cache HTML files besides home page and 404 page.

### cachePic

- Type: `boolean`
- Default: `false`

Whether cache pictures

### maxPicSize

- Type: `number`
- Default: `1024`

Max picture size allowed to be cached, with KB unit

### update

- Type: `"disabled" | "available" | "hint" | "force"`
- Default: `"available"`

Control logic when new content is found.

- `"disabled"`: Do nothing even when new service worker is available. After new service work succeeds installing and starts waiting, it will control page and provide new content in next visit.

- `"available"`: Only display update popup when the new service worker is available

- `"hint"`: Display a hint to let user choose to refresh immediately

  This is helpful when you want users to see new docs immediately.

  ::: note

  If users choose to refresh, the current service worker will be unregistered, and request will start coming to web. Later the new service worker will start installing and control current page after installed.

  :::

- `"force"`: unregister current service worker immediately then refresh to get new content

  ::: caution

  Though this ensures users are visiting the newest content, but this may affect visiting experiences.

  :::

::: warning

How docs are updated is controlled by a previous version, so the current option only effect next update from this version.

:::

### apple

Special settings for Apple

> If you don't want to make detailed settings, you can safely ignore it; if you don't want your site compatible with safari on apple, please set it to `false`.

#### apple.icon

- Type: `string`
- Required: No

Icon link used by Apple, the recommended size is 152×152.

#### apple.statusBarColor

- Type: `"black" | "white"`
- Default: `"black"`

Apple's status bar color

#### apple.maskIcon

- Type: `string`
- Required: No

Safari mask icon

### msTile

Special settings for Microsoft tiles

> If you don't want to make detailed settings, you can safely ignore it; if you don't want your site compatible with windows, please set it to `false`.

#### msTile.image

- Type: `string`
- Required: No

Tile icon

#### msTile.color

- Type: `string`
- Default value: `themeColor`

The tile color will automatically fall back to themeColor if you don't set it.

### appendBase

- Type: `boolean`
- Default: `false`

Whether append base to all absolute links in options.

::: info

Check <ProjectLink name="pwa2" path="/config/">pwa2 plugin documentation</ProjectLink> for all available options.

:::
