---
title: Icon support
icon: discover
category:
  - Interface
tag:
  - Icon
  - Interface
---

The entire theme adds FontClass format icon support in mutiple places.

You can use iconfont and fontawesome to add icons to your project.

- For china users, iconfont is recommended
- For overseas users, fontawesome is recommended

::: note

The prefix of the icon class is an empty string by default, you probably need to change it with `iconPrefix` options in themeConfig according to your choise.

:::

<!-- more -->

## Setting icons

After importing icons and setting `iconPrefix` as below, you can use icon in mutiple places.

- Page: set `icon` in frontmatter

  This icon will be used in breadcrumb, page title, navbar generated item, sidebar generated item, page nav, etc.

- Navbar: set `icon` option in NavbarItemConfig
- Sidebar: set `icon` option in SidebarItemConfig
- HomePage: set `icon` option in feature item

## Iconfont

[Iconfont](https://iconfont.cn) is a vector icon management and communication platform created by Alimama MUX.

The designer uploads the icon to the Iconfont platform, and the user can customize the download of icons in a variety of formats. Users can also convert the icon into a font.

### How to use

First, you need to create a new project to set and manage your website’s icons:

1. Log in to Iconfont using GitHub or Weibo.
1. Find "Resources → My Projects" at the top of the website, and click the "New Project" icon in the upper right corner.
1. Set a recognizable project name
1. Fill in `FontClass/Symbol prefix` with `icon-` (you can also fill in according to your preference, but you need to set this value to `themeConfig.iconPrefix` with an extra `iconfont` prefix)
1. Font Family please keep `iconfont`

![New Project](./assets/iconfont-new.png)

### Import icon

1. Search freely through iconfont to find the icon you want to use, and click the "Add to Library" button on the icon

   ![Add to library](./assets/iconfont-add.png)

1. After searching for all the icons, click the "Add to Library" icon in the upper right corner, click "Add to Project" below and select the project you created then confirm.

### Edit icon

On the project page, you can edit the icons in the project, including adjustments with position, size, rotate, color, Unicode number and Font Class / Symbol.

![Edit icon](./assets/iconfont-edit.png)

### Generate icon files

1. Please click the "Font Class" button above the project and click Generate.

   ![Add to library](./assets/iconfont-generate.png)

1. Add the link to `head` options in siteConfig to import it. E.g:

   ```js
   [
     "link",
     {
       rel: "stylesheet",
       href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
     },
   ];
   ```

::: tip

If you add a new icon in the future, please regenerate the new CSS address and overwrite the old CSS address in head option.

:::

## Fontawesome

This theme has built-in Fontawesome support.

### Import

You can add the following item in `head`:

```js
[
  "script",
  {
    src: "https://kit.fontawesome.com/ca37c296c5.js",
    crossorigin: "anonymous",
  },
];
```

::: note

Font-awesome current version is 6.0.0

:::

And you need set `themeConfig.iconPrefix` to `"fas fa-"`.

### Use

Please follow [fontawesome document](https://fontawesome.com/).

- [Usage Instructions](https://fontawesome.com/docs/web/add-icons/how-to)
- [Icon List](https://fontawesome.com/icons)

## Featured Icons

```html
<link rel="stylesheet" href="//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css" />
```

<IconDisplay link="//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css" />

<script setup lang="ts">
import IconDisplay from '@IconDisplay';
</script>
