---
title: FontIcon
head:
  - - "link"
    - rel: stylesheet
      href: //at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css
---

This component is used to display font icons.

You can use it in Markdown to add an icon.

<!-- more -->

## Demo

- Home icon: <FontIcon icon="home" />

- A big and green share icon: <FontIcon icon="share" color="#3eaf7c" size="32" />

```md
- Home icon: <FontIcon icon="home" />

- A big and green share icon: <FontIcon icon="share" color="#3eaf7c" size="32" />
```

## Props

### icon

- Type: `string`
- Required: Yes

Icon name

### color

- Type: `string`
- Default: `'inherit'`

Color used for icon.

### size

- Type: `number | string`
- Default: `Current font size`

Icon size.

## Global Settings

You can set icon assets url and icon prefix globally via `componentsOptions.fontIcon.assets` and `componentsOptions.fontIcon.prefix`.

### Setting Icon Assets

You should set icon related assets to `componentsOptions.fontIcon.assets`, where you can set one url or an array of urls of icon resources in format of css and js.

For example, you may use [iconfont.cn](https://www.iconfont.cn/?lang=en-us) and [fontawesome](https://fontawesome.com) to generate your own assets.

To keep it simple, we add built-in keywords `"iconfont"`, `"iconify"`, `"fontawesome"` and `"fontawesome-with-brand` support for you to get started easily.

::: danger

If you use this plugin for commercial project documentation, `iconfont` is **not recommended** as iconfont itself is a study/share platform for designers and developers.

Every icon is uploaded by users and you must get authorized from the author for commercial usage. Also, there could be chance where the uploader obeys usage term. And upload icons where its copyright is at 3rd party.

:::

### Setting Icon Prefix

`componentsOptions.fontIcon.prefix` is the icon prefix where you want to set,

Normally, there should be a common prefix for your icon class, for `iconfont` icon classes are `iconfont icon-<ICON-NAME>` and for fontawesome free icon classes are `fas fa-<icon-name>`. So when you are setting the above `assets` option with keywords or a single link generated from iconfont website, fontawesome kit or fontawesome CDN, the plugin recognize those and set prefix as `"iconfont icon-"` and `"fas fa-"` automatically for you.

In other cases where you use iconify or your own url, you can manually set this options yourself. After all writing `icon: apple` is always better than something like `icon: iconfont icon-apple`, `icon: mdi:icon-apple` or `icon: fa-solid fa-apple`.

## Browsing Icons

- Iconify: <https://icon-sets.iconify.design/>
- Iconfont: <https://www.iconfont.cn/?lang=en-us>
- Fontawesome: <https://fontawesome.com/icons>

::: details Featured Icons with iconfont keyword

<IconDisplay link="//at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css" />

:::

## Advanced

### Generating Your Own Iconfont Links

::: info Iconfont

[Iconfont](https://iconfont.cn) is a vector icon management and communication platform created by Alimama MUX.

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

### Using Fontawesome Kits

By default, we use jsdelivr CDN to load V6 version of fontawesome free icons. This should be enough for most open source projects.

Besides, you can purchase at [fontawesome.com](https://fontawesome.com) to use kits.

Fontawesome kits with pro features support pro icons, more icon styles and uploading your own icons.

::: note

For details, please follow [fontawesome document](https://fontawesome.com/).

- [Usage Instructions](https://fontawesome.com/docs/web/add-icons/how-to)
- [Icon List](https://fontawesome.com/icons)

:::

<script setup lang="ts">
import IconDisplay from "@IconDisplay";
</script>
