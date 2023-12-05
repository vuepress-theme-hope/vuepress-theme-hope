---
title: Icon support
icon: icons
order: 3
category:
  - Interface
tag:
  - Icon
  - Interface
head:
  - - "link"
    - rel: stylesheet
      href: //at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css
---

The entire theme adds FontClass / Image format icon support in multiple places.

You can use iconfont, iconify and fontawesome to add icons to your project, and you can also use your own icon assets.

Also, png/svg format icon is supported. You can use full links or pathname to add icons.

We recommend you to use iconify or fontawesome.

<!-- more -->

## Browsing Icons

- Iconify: <https://icon-sets.iconify.design/>
- Iconfont: <https://www.iconfont.cn/?lang=en-us>
- Fontawesome: <https://fontawesome.com/icons>

::: details Featured Icons with iconfont keyword

<IconDisplay link="//at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css" />

:::

## Setting Icons

You can use icon in multiple places.

- Page: set `icon` in frontmatter

  This icon will be used in breadcrumb, page title, navbar generated item, sidebar generated item, page nav, etc.

- Navbar: set `icon` option in NavbarItemConfig

- Sidebar: set `icon` option in SidebarItemConfig

- HomePage: set `icon` option in feature item

## Adding Icons in Markdown

You can use `<HopeIcon />` component to add icon in markdown.

- `icon` prop accepts the same content as other `icon` options, i.e.: font class and image url
- `color` prop accepts a css color value, which will be used as the icon color (optional)
- `size` prop accepts a css size value, which will be used as the icon size (optional)

::: details Demo

- <HopeIcon icon="home" color="red" />
- <HopeIcon icon="//theme-hope-assets.vuejs.press/logo.svg" size="4rem" />

```md
- <HopeIcon icon="home" color="red" />
- <HopeIcon icon="//theme-hope-assets.vuejs.press/logo.svg" size="4rem" />
```

:::

## Global Settings

You can set icon assets url and icon prefix globally via `iconAssets` and `iconPrefix`.

### Setting Icon Assets

You should set icon related assets to `iconAssets`, where you can set:

- icon assets keywords
- icon resource in format of css and js
- array of above

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // keywords: "iconfont", "iconify", "fontawesome", "fontawesome-with-brands"
    iconAssets: "fontawesome",

    // an url you like
    iconAssets: "/base/my/font-icon/resource.js",

    // an array of above
    iconAssets: [
      "/base/my/font-icon/resource.js",
      "https://example/my/fonr-icon/resouce.css",
      "fontawesome",
    ],
  }),
});
```

@tab JS

```js {8}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // keywords: "iconfont", "iconify", "fontawesome", "fontawesome-with-brands"
    iconAssets: "fontawesome",

    // an url you like
    iconAssets: "/base/my/font-icon/resource.js",

    // an array of above
    iconAssets: [
      "/base/my/font-icon/resource.js",
      "https://example/my/fonr-icon/resouce.css",
      "fontawesome",
    ],
  }),
});
```

:::

For example, you may use [iconfont.cn](https://www.iconfont.cn/?lang=en-us) and [fontawesome](https://fontawesome.com) to generate your own assets.

To keep it simple, we add built-in keywords `"iconfont"`, `"iconify"`, `"fontawesome"` and `"fontawesome-with-brand` support for you to get started easily.

::: caution

If you use this plugin for commercial project documentation, `iconfont` is **not recommended** as iconfont itself is a study/share platform for designers and developers.

Every icon is uploaded by users, and you must get authorized from the author for commercial usage. Also, there could be chance where the uploader obeys usage term. And upload icons where its copyright is at 3rd party.

:::

### Setting Icon Prefix

`iconPrefix` is the icon prefix where you want to set,

Normally, there should be a common prefix for your icon class, for `iconfont` icon classes are `iconfont icon-<ICON-NAME>` and for fontawesome free icon classes are `fas fa-<icon-name>`. So when you are setting the above `assets` option with keywords or a single link generated from iconfont website, fontawesome kit or fontawesome CDN, the plugin recognize those and set prefix as `"iconfont icon-"` and `"fas fa-"` automatically for you.

In other cases where you use iconify or your own url, you can manually set this options yourself. After all writing `icon: apple` is always better than something like `icon: iconfont icon-apple`, `icon: mdi:icon-apple` or `icon: fa-solid fa-apple`.

## Advanced

### Using Fontawesome Kits

You can purchase at [fontawesome.com](https://fontawesome.com) to use kits or import brand icons.

Fontawesome kits with pro features support pro icons, more icon styles and uploading your own icons.

::: note

For details, please follow [fontawesome document](https://fontawesome.com/).

- [Usage Instructions](https://fontawesome.com/docs/web/add-icons/how-to)
- [Icon List](https://fontawesome.com/icons)

:::

### Generate your own iconfont assets

::: info Iconfont

[Iconfont](https://www.iconfont.cn/?lang=en-us) is a vector icon management and communication platform created by Alimama MUX.

The designer uploads the icon to the Iconfont platform, and the user can customize the download of icons in a variety of formats. Users can also convert the icon into a font.

:::

#### How to use

First, you need to create a new project to set and manage your website's icons:

1. Log in to Iconfont using GitHub or Weibo.
1. Find "Resources → My Projects" at the top of the website, and click the "New Project" icon in the upper right corner.
1. Set a recognizable project name
1. Fill in `FontClass/Symbol prefix` with `icon-` (you can also fill in according to your preference, but you need to set this value to `iconPrefix` in theme options with an extra `iconfont` prefix)
1. Font Family please keep `iconfont`

![New Project](./assets/iconfont-new.png)

#### Import Icon

1. Search freely through iconfont to find the icon you want to use, and click the "Add to Library" button on the icon

   ![Add to library](./assets/iconfont-add.png)

1. After searching for all the icons, click the "Add to Library" icon in the upper right corner, click "Add to Project" below and select the project you created then confirm.

#### Edit Icon

On the project page, you can edit the icons in the project, including adjustments with position, size, rotate, color, Unicode number and Font Class / Symbol.

![Edit icon](./assets/iconfont-edit.png)

#### Generate Icon Files

1. Please click the "Font Class" button above the project and click Generate.

   ![Add to library](./assets/iconfont-generate.png)

1. Set the css link to `iconAssets` in theme options.

#### Tips

::: tip

If you add a new icon in the future, please regenerate the new CSS address and set it to `iconAssets` in theme options.

:::

::: warning Conflicts with private character

Font Icon associate each icon with a character in unicode private character scope, the character used by iconfont is randomly.

Iconfont will try to solve conflicts by assigning a new character if a new icon's default character is already used in current project, however different projects may have conflicts.

So we do not recommend you to use multiple iconfont links as assets, if you ready want to do so, check the icons to ensure every former project icon is not covered by those in latter ones.

:::

<script setup lang="ts">
import IconDisplay from "@IconDisplay";
import HopeIcon from "@theme-hope/components/HopeIcon";
</script>
