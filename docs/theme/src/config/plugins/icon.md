---
title: Icon Plugin Config
icon: icons
order: 2
category:
  - Config
tag:
  - Icon
  - Plugin Config
  - Theme Config
---

## Intro

The theme provides blog feature via `@vuepress/plugin-icon`. For instructions, please see [Icon Intro](../../guide/interface/icon.md).

This plugin can be disabled by setting `plugins.icon` to `false`.

## Options

::: fields
@`plugins.icon.assets` type=`IconAsset`

Icon assets to be used.

The following keywords are supported and you may use other CDN links or even your own:

- `iconify`: Iconify
- `fontawesome`: Font Awesome free icons only
- `fontawesome-with-brands`: Font Awesome free icons and brand icons

Its type is:

```ts
export type BuiltInIcon = "fontawesome-with-brands" | "fontawesome" | "iconify";

export type IconLink =
  `//${string}` | `/${string}` | `http://${string}` | `https://${string}`;

export type IconAsset = (BuiltInIcon | IconLink)[] | BuiltInIcon | IconLink;
```

@`plugins.icon.type` type=`IconType` default="Inferred from the assets"

Type of the icon, the plugin will try to infer the type from the assets, and fallbacks to `unknown`.

Notably, the plugin can recognize:

- iconfont css links
- fontawesome kits
- CDN links for fontawesome and iconify

Its type is:

```ts
export type IconType = "fontawesome" | "iconfont" | "iconify" | "unknown";
```

@`plugins.icon.prefix` type=string default="Inferred from the assets and type"

Prefix for the icon component. By default, the plugin will use:

- `iconfont icon-` for iconfont type
- `fas fa-` for fontawesome type
- empty string for all other types

@`plugins.icon.markdown` type=boolean default=`true`

Whether to enable icon syntax (`::icon::`) in markdown.

:::
